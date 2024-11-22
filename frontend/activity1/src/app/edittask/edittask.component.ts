import { Component } from '@angular/core';
import { MediatorService } from '../mediator.service';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css']
})
export class EdittaskComponent {
  taskid:any;
  obj={id:0,task_name:"",task_description:"",status:"",user1:0}
  ngOnInit():void{
    this.taskid=this.m.taskid;
    this.m.getbyid(this.taskid).subscribe(
      (res:any)=>{
        console.log("res",res);
        if (res && res.task) {
          this.obj.id = res.task.id;
          this.obj.task_name = res.task.task_name;
          this.obj.task_description = res.task.task_description;
          this.obj.status = res.task.status;
          this.obj.user1 = res.task.user1;
          console.log("user id is here",this.obj.user1)
          
          console.log("Task data loaded:", this.obj);
        }
        else {
          console.error("Unexpected response structure:", res);
        }
      },
      (error) => {
        console.error("Error fetching task:", error);
      }

        
      
    )
  
  }
  updatedata(data:any){
    console.log("data is loaded here",data)
    this.m.update(data).subscribe(
      (res:any)=>{
        console.log(res)
        if(res['status']==1){
          alert("success")
          // this.r.navigate(['viewall'])
        }
        else if(res['status']==2){
          alert("failed")
        }
        else{
          alert("varaible not set")
        }
      }
    )
  }

  
  constructor(public m:MediatorService){}
  
}
