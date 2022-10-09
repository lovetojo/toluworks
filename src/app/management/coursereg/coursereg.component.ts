import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { profileUrl, register_CoursesUrl, view_CoursesUrl } from 'src/app/Constants/Constant';
import { RestclientService } from 'src/app/Services/restclient/restclient.service';
import { StorageserviceService } from 'src/app/Services/storageservice.service';

@Component({
  selector: 'app-coursereg',
  templateUrl: './coursereg.component.html',
  styleUrls: ['./coursereg.component.css']
})
export class CourseregComponent implements OnInit {
  courses: any;
  isChecked: boolean = false;
  data: any ={
    surName: '',
    midName: '',
    fname: '',
    department: '',
    jambNo: ''
  }
  request:any = {
    jambNo: ''
  }
  constructor(private router: Router,
    private restClient: RestclientService,
    private storageService: StorageserviceService,) { }
    
  async ngOnInit(): Promise<void> {
    this.getAllCourses();
    this.getParams();
    this.fetchUserProfile();
  }

  async getAllCourses(){
    let data = {
      department_name: this.getParams().department.toUpperCase()
    }

    let resp = await this.restClient.funcPost(view_CoursesUrl.apiUrl, data);

    if(resp == null){
      alert("i am here")
      return;
    }
    console.log(JSON.stringify(resp))
    this.courses = resp;

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
        department: resp?.department,
        jambNo:resp?.jambNo
      }
      return this.data
  
    }

  
  getParams() : any {
    return this.storageService.getData('studentData')
  }
  
  async toggleSelection(event: any) {
    this.isChecked = event.target.checked;
  }

 async registerCourse(courseId: any) {
  let request = {
    jambNo: this.getParams().jambNo,
    courses: [courseId]
  }

  console.log(request);
  
    let resp = await this.restClient.funcPost(register_CoursesUrl.apiUrl, request);

    console.log(JSON.stringify(resp));

    if(resp[0].resp_code != "00"){
      alert(resp[0].resp_msg)
      return;
    }
    alert(resp[0].resp_msg);
    // if(resp[0].resp_code !== "00"){
      
    // }
  }

  onLogout(e:Event){ 
    this.storageService.clearData("Token")
    this.storageService.clearData("bToken")
    this.storageService.clearData("studentData")
  }
}
