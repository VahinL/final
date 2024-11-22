import { Component } from '@angular/core';
import { MediatorService } from '../mediator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login(data:any){
    console.log(data)
    this.m.savelogin(data).subscribe(
      
      (res:any)=>{
        console.log(res,"here")
        if (res['status']==1){
          alert("success")
          this.r.navigate(['view'],{queryParams:res['values']})
        }
        else if (res["status"]==2){
          alert('failed')
        }
        else{
        alert("already exists")
      }
      }
    )
  }
  constructor(public m:MediatorService,public r:Router){}
}
