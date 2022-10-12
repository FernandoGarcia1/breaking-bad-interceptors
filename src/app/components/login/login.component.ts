import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import StorageHelper from 'src/app/libs/helpers/storage.helpers';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginGroup!: FormGroup;
  public username: string='';
  public password: string='';
  constructor(public apiService: ApiService, private router: Router) { }

  
  ngOnInit(): void {
    this.createForm();
  }
  login(){       
    this.apiService.login(this.loginGroup.value.username, this.loginGroup.value.password).subscribe({
      next: (res) =>{                 
        StorageHelper.setItem('session', {
          username: this.loginGroup.value.username,
          token: res.token
        })        
        this.router.navigate(['search'])
      }
    }       
    );         
  }


  createForm(){
    this.loginGroup = new FormGroup({
      username: new FormControl(""),
      password: new FormControl(""),
  })
  }
  

}
