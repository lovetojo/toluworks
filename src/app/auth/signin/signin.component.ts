import { Component, OnInit } from '@angular/core';
// import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { registerUrl } from 'src/app/Constants/Constant';
import { RestclientService } from 'src/app/Services/restclient/restclient.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  pattern: any = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}";
  emailRegex: any = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$';
  password: string = "";
  cpassword: string = "";
  matricNum: any;
  department: any;
  level: any;
  email: any;

  constructor(private router: Router,
              private restClient: RestclientService){}
  
  ngOnInit(){}
  confirmPass(){
    if(this.cpassword == this.password){
      this.cpassword = this.password;
    }
    else{
      return;
    }
  }

  async register(){
    let data = {
        department:this.department,
        level:this.level,
        jambNo: this.matricNum,
        email:this.email,
        password:this.password,
        confirmPassword:this.cpassword
    }

    let resp = await this.restClient.funcPost(registerUrl.apiUrl, data);
    console.log(resp)
    if(resp.message != 'Thank you for registering' || resp.message !== 'Thank you for registering') {
      alert('failed, try again')
      return;
    }
    alert('sign up successful');
    this.router.navigate(["/login"]);

  }

  async validate(e: Event){
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    form.classList.add('was-validated');

    if (form.checkValidity() == true)
    {
      this.register();
    }
  }
  

}
