import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediatorService {

  private baseUrl: string = `https://vahinlal.pythonanywhere.com`;

  save(params:any){
    console.log(params,"its here")

    return this.h.post(`${this.baseUrl}/reg`,params)

  }
  savelogin(params:any){
    console.log(params,"its here")

    return this.h.post(`${this.baseUrl}/log`,params)

  }


taskid:any=""
setid(data:any){
  this.taskid=data;

}
getbyid(params:any){
  console.log("getby id is ",params)
  // return this.h.get(`http://127.0.0.1:8000/tasks/${params}/`);
  return this.h.post(`${this.baseUrl}/tasks`,params)


}

update(task: any): Observable<any> {
  console.log("dat can here ",task)
  console.log("..",task.id,"........")
  console.log("..",task.task_name,"........")
  console.log("..",task.task_description,"........")
  console.log("..",task.user1_id,"........")
  console.log("..",task.status,"........")
    return this.h.put(`${this.baseUrl}/tasks/${task.id}/`, {
    task_name: task.task_name,
    task_description: task.task_description,
    status: task.status,
    user1_id: task.user1_id // Include user1_id if necessary for the update
  });
}

  constructor(public h:HttpClient) { }
}
