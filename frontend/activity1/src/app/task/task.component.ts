import { Component } from '@angular/core';
import { MediatorService } from '../mediator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  private baseUrl: string = `https://vahinlal.pythonanywhere.com`;


  user1_id:number=0
  task_name: string = '';
  task_description: string = '';
  user1: number | null = null;
  status: number = 0;
  tasks: any[] = [];
  editingTaskId: number | null = null;
  currenttaskid="";

  allTasks: any[] = [];

  ngOnInit(): void {

    this.r.paramMap.subscribe(params => {
        const userIdParam = params.get('userId');
        this.user1 = userIdParam ? +userIdParam : null;

    });

}


addTask(){
  let bodyData={
    "user1":this.user1,
    "task_name":this.task_name,
    "task_description":this.task_description,
    "status":this.status
  };
  this.http.post(`${this.baseUrl}/tasks`,bodyData).subscribe(
    (res:any)=>{
      console.log(res,"success")
      alert("Task Added Succesfully")
      this.getTasks();


    }
  )

}
resetForm(form: any): void {
  this.task_name = '';
  this.task_description = '';
  this.status = 0;
  form.reset();
}




getTasks() {
  this.http.get(`${this.baseUrl}/tasks`)
    .subscribe((resultData: any) => {
      console.log(resultData);
      this.allTasks = resultData;
      this.tasks = resultData;
    });
}

showAllTasks() {
  this.tasks = this.allTasks;
}

showCompletedTasks() {
  this.tasks = this.allTasks.filter(task => task.status === 1);
}

showIncompleteTasks() {
  this.tasks = this.allTasks.filter(task => task.status === 0);
}



deleteTask(data: any)
{
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if(confirmDelete){
      this.http.delete(`${this.baseUrl}/tasks`+ "/"+ data.id).subscribe((resultData: any)=>
        {
            console.log(resultData);
            alert("Deleted")
            this.getTasks();
        });


    }


}
setUpdate(data:any){
  this.task_name = data.task_name;
  this.task_description = data.task_description;
  this.status = data.status;
  this.user1 = data.user1;
  this.currenttaskid =data.id;

}
UpdateRecords()
  {
    let bodyData =
    {
      "task_name" : this.task_name,
      "task_description" : this.task_description,
      "status" : this.status,
      "user1" : this.user1,
    };

    this.http.put(`${this.baseUrl}/tasks/`+ this.currenttaskid , bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.task_name = '';
        this.task_description = '';
        this.status  = 0;
        this.getTasks();
    });
  }





constructor(public m:MediatorService,public r:ActivatedRoute,public a:Router,public http:HttpClient){
  this.getTasks();
}
}
