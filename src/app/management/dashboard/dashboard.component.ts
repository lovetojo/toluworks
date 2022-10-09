import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { profileUrl } from 'src/app/Constants/Constant';
import { AuthService } from 'src/app/Services/auth.service';
import { RestclientService } from 'src/app/Services/restclient/restclient.service';
import { StorageserviceService } from 'src/app/Services/storageservice.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  AuthService: any;

  constructor(private router: Router,
    private restClient: RestclientService,
    private storageService: StorageserviceService,
    private auth: AuthService) { }

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
      level: ''
    }
    
  request:any = {
    jambNo: ''
  }

  ngOnInit(): void {
    this.fetchUserProfile();
    this.getParams()

  }
  getParams(): any {
    return this.storageService.getData('studentData')
  }
  
  async fetchUserProfile() {
    let request = {
      jambNo: this.getParams().jambNo
  
    }
      let resp = await this.restClient.funcPost(profileUrl.apiUrl, request)
      this.data = {
        surName: resp?.surName,
        department: resp?.department,
        faculty:resp?.faculty,
        midName:resp?.midName,
        fname:resp?.fname,
      }
      return this.data
    }
  header_variable=false;
  @HostListener("document:scroll")
  scrollfunction(){
    if(document.body.scrollTop > 0 || document.documentElement.scrollTop >0){
      this.header_variable=true;
    }
    else{
      this.header_variable=false
    }
  }
  onLogout(e:Event){ 
    this.storageService.clearData("Token")
    this.storageService.clearData("bToken")
    this.storageService.clearData("studentData")
  }  
 
}
