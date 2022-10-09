import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { profileUrl } from 'src/app/Constants/Constant';
import { RestclientService } from 'src/app/Services/restclient/restclient.service';
import { StorageserviceService } from 'src/app/Services/storageservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data: any ={
    email: '',
    surName: '',
    sex:'',
    department: '',
    faculty: '',
    dateOfBirth:'',
    midName: '',
    age: '',
    fname: '',
    picture: '',
    jambNo:''
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

 async fetchDetails() {
  let request = {
    jambNo: this.getParams().jambNo
  }
    let resp = await this.restClient.funcPost(profileUrl.apiUrl, request);

    console.log(JSON.stringify(resp))
    
    this.data = {
      email:resp?.email,
      surName: resp?.surName,
      sex:resp?.sex,
      department: resp?.department,
      faculty:resp?.faculty,
      dateOfBirth:resp?.dateOfBirth,
      midName:resp?.midName,
      age:resp?.age,
      fname:resp?.fname,
      jambNo:resp?.jambNo
    }
    return this.data
  }


  async profile(){
    this.router.navigate(["/dashboard"]);
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
      this.profile();
    }
  }
  onLogout(e:Event){ 
    this.storageService.clearData("Token")
    this.storageService.clearData("bToken")
    this.storageService.clearData("studentData")
  } 
}