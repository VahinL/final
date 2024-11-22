from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser 
from django.http.response import JsonResponse 
from .serializers import registerserializer,TaskSerializer

from .models import User,Task
from rest_framework.response import Response
from django.contrib.auth import authenticate,logout,login


# @csrf_exempt
@api_view(['POST']) 
def register(request):
    print(request.data)
    serializer1 = registerserializer(data=request.data)
    print(serializer1)
    if serializer1.is_valid():
        serializer1.save()
        return Response({"status":1,"values":serializer1.data})
    return Response("failed")
    

@api_view(['POST'])
def login_page(request):
    username = request.data.get('username')
    password = request.data.get('password')
    print(username)
    print(password)
    user = User.objects.get(username=username, password=password)
    print(user)
    if user is not None:
        user_data= registerserializer(user).data
        print(user_data)
        return Response({"status": 1, "values":user_data,"message": "Login successful"})
    else:
        return Response({"status": 0, "values":user_data, "message": "Login failed"})


@api_view(['GET', 'POST'])
def task_page(request):
    if request.method == 'GET':
        tasks = Task.objects.all()  # Get all tasks
        serializer = TaskSerializer(tasks, many=True)
        return Response({"status": 1, "tasks": serializer.data})

    elif request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Save task without user reference
            return Response({"status": 1, "values": serializer.data})
        return Response({"status": 0, "message": "Task creation failed", "errors": serializer.errors})


@api_view(['GET', 'PUT', 'DELETE'])
def task_detail(request, pk):
    try:
        task = Task.objects.get(pk=pk)
        print("pk",pk)

    except Task.DoesNotExist:
        return Response({"status": 0, "message": "Task not found"}, status=404)

    if request.method == 'GET':
        serializer = TaskSerializer(task)
        print(task)
        print(serializer.data)
        return Response({"status": 1, "task": serializer.data})

    elif request.method == 'PUT':
        print("put method")
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": 1, "values": serializer.data})
        return Response({"status": 0, "message": "Task update failed", "errors": serializer.errors})

    elif request.method == 'DELETE':
        task.delete()
        return Response({"status": 1, "message": "Task deleted successfully"})




@csrf_exempt
def taskapi(request,id=0):
    if request.method=='GET':
        student = Task.objects.all()
        student_serializer=TaskSerializer(student,many=True)
        return JsonResponse(student_serializer.data,safe=False)
    elif request.method=='POST':
        student_data=JSONParser().parse(request)
        student_serializer=TaskSerializer(data=student_data)
        if student_serializer.is_valid():
            student_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        student_data=JSONParser().parse(request)
        student=Task.objects.get(id=id)
        student_serializer=TaskSerializer(student,data=student_data)
        if student_serializer.is_valid():
            student_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        student=Task.objects.get(id=id)
        student.delete()
        return JsonResponse("Deleted Successfully",safe=False)