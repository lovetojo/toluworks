import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { loginUrl} from 'src/app/Constants/Constant';
import { RestclientService } from 'src/app/Services/restclient/restclient.service';
import { StorageserviceService } from 'src/app/Services/storageservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password: string = "";
  matricNum: any;
  constructor(private router: Router,
    private restClient: RestclientService,
    private storageService: StorageserviceService,
    ){}
  
  ngOnInit(){}

  async login(){
    let data = {
      jambNo:this.matricNum,
      password:this.password
    }

    let resp = await this.restClient.funcPost(loginUrl.apiUrl, data);
    console.log(resp);
    if(resp.message != 'Login Successful' || resp.message !== 'Login Successful') {
      alert('failed, try again')
      return;
    }  alert('Login successful');
    this.storageService.setData('studentData', resp)
    this.storageService.setData('Token', resp.token )
    this.router.navigate(["/biodata"]);
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
      
      this.login();
    }
  }
}
