import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { change_passwordUrl, profileUrl } from 'src/app/Constants/Constant';
import { RestclientService } from 'src/app/Services/restclient/restclient.service';
import { StorageserviceService } from 'src/app/Services/storageservice.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  pattern: any = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}";
  password: string = "";
  cpassword: string = "";
  olppasssword: string ="";
  data: any={
    password: '',
    cpassword: '',
    olppasssword: '',
    surName: '',
    midName: '',
    fname: ''
  }
  request:any = {
    jambNo: '',
    password: ''
  }
  constructor(private router: Router,
    private restClient: RestclientService,
    private storageService: StorageserviceService) { }

  ngOnInit(): void {
    this.fetchDetails();
    this.getParams();
    this.fetchUserProfile();
  }
  fetchDetails() {
    this.request = {
      jambNo: this.getParams(),
      password: this.getParams()
    }
  }
  async fetchUserProfile() {
    let request = {
      jambNo: this.getParams().jambNo
  
    }
      let resp = await this.restClient.funcPost(profileUrl.apiUrl, request)
      console.log(resp);
      this.data = {
        surName: resp?.surName,
        midName:resp?.midName,
        fname:resp?.fname,
      }
      return this.data
  
    }
  getParams() {
    return this.storageService.getData('studentData')
  }
  
  confirmPass(){
    if(this.cpassword == this.password){
      this.cpassword = this.password;
    }
    else{
      return;
    }
  }
  async setting(){
    let data = {
      jambNo:this.getParams(),
      currentPassword:this.olppasssword,
      newPassword:this.password,
      confirmPassword:this.cpassword
    }
  let resp = await this.restClient.funcPost(change_passwordUrl.apiUrl, data);
  // }
  if(resp.message != 'Password successfully changed' || resp.message !== 'Password successfully changed') {
    alert('failed, try again')
    return;
  }
  alert('Password Succefully Changed');
    this.storageService.setData('studentData', resp?.jambNo)
    this.storageService.setData('Token', resp.token )
    this.router.navigate(["/setting"]);
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
      
      this.setting();
    }
  }
  onLogout(e:Event){ 
    this.storageService.clearData("Token")
    this.storageService.clearData("bToken")
    this.storageService.clearData("studentData")
  } 
}
