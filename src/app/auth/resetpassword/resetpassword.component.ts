import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { resetPasswordUrl } from 'src/app/Constants/Constant';
import { RestclientService } from 'src/app/Services/restclient/restclient.service';
import { StorageserviceService } from 'src/app/Services/storageservice.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  pattern: any = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}";
  password: string = "";
  cpassword: string = "";
  matricNum: any;

  data: any={
    password: '',
    cpassword: ''
  }
  request:any = {
    jambNo: ''
  }
    
  constructor(private router: Router,
    private restClient: RestclientService,
    private storageService: StorageserviceService) { }

  ngOnInit(): void {
    this.fetchDetails();
    this.getParams()
  }

  getParams(): any {
    return this.storageService.getData('studentData')
  }

  fetchDetails() {
  this.request = {
    jambNo: this.getParams()
  }}
  confirmPass(){
    if(this.cpassword == this.password){
      this.cpassword = this.password;
    }
    else{
      return;
    }
  }
  async resetpassword(){
    let data = {
      jambNo: this.matricNum,
      newPassword:this.password,
      confirmPassword:this.cpassword
    }
  let resp = await this.restClient.funcPost(resetPasswordUrl.apiUrl, data);
  // }
  if(resp.message != 'Password successfully Reset' || resp.message !== 'Password successfully Reset') {
    alert('failed, try again')
    return;
  }
  alert('Password Succefully Changed');
    this.storageService.setData('studentData', resp?.jambNo)
    // this.storageService.setData('Token', resp.token )
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
      this.resetpassword();
    }
  }
}
