import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
 
  public signupForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router:Router) { }

  ngOnInit(): void {
      this.signupForm = this.formBuilder.group({
        name:[''],
        email:[''],
        mobile:[''],
        pwd:[''],
        repwd:[''],

      })
  }
    signUp(){
         this.http.post<any>("http://localhost:3000/sign-up",this.signupForm.value)
         .subscribe(res=>{
          alert("Signup successfull :)");
          this.signupForm.reset();
          this.router.navigate(['login']);
         },err=>{
          alert("Something went wrong :(");
         })
    }
}
