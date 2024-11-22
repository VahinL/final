import { Component } from '@angular/core';
import { MediatorService } from '../mediator.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  data={id:0,first_name:"",last_name:"",email:"",username:"",password:"",phone_number:"",gender:""}
  ngOnInit(): void {
    this.a.queryParams.subscribe(
      (res:any)=>{
        console.log(res,"here")
        this.data['id']=res['id']
        this.data['first_name']=res['first_name']
        this.data['last_name']=res['last_name']
        this.data['email']=res['email']
        this.data['username']=res['username']
        this.data['password']=res['password']
        this.data['phone_number']=res['phone_number']
        this.data['gender']=res['gender']

        console.log(this.data)
      }
    )
  }
  changeLang(){}
  constructor(public m:MediatorService,public a:ActivatedRoute,public r:Router,private translate:TranslateService){}
}
