from rest_framework import serializers
from .models import User,Task

class registerserializer(serializers.ModelSerializer): 
    class Meta: 
        model = User 
        fields =("id","first_name","last_name","username","password","phone_number","gender","email")


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'task_name', 'task_description', 'status','user1']