import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { deleteCourseUrl, profileUrl, registered_CoursesUrl, view_CoursesUrl } from 'src/app/Constants/Constant';
import { AuthService } from 'src/app/Services/auth.service';
import { RestclientService } from 'src/app/Services/restclient/restclient.service';
import { StorageserviceService } from 'src/app/Services/storageservice.service';

@Component({
  selector: 'app-veiwreg',
  templateUrl: './veiwreg.component.html',
  styleUrls: ['./veiwreg.component.css']
})
export class VeiwregComponent implements OnInit {

  courses: any;
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
    private storageService: StorageserviceService,
    private auth: AuthService) { }

    async ngOnInit(): Promise<void> {
    this.getAllRegisteredCourses();
    this.getParams();
    this.fetchUserProfile();
  }

  async deleteCourse( courseId: any){
    console.log(courseId);
    let request = {
      JambNo: this.getParams().jambNo,
      course_Id: courseId
    }
    let resp2 = await this.restClient.funcPost(deleteCourseUrl.apiUrl, request);

    console.log(resp2);

    if(resp2.message != "Course Deleted" ){
     alert("Course cannot be deleted")
      return;
    }
    alert(resp2.message);
    this.getAllRegisteredCourses();
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
  onLogout(e:Event){ 
    this.storageService.clearData("Token")
    this.storageService.clearData("bToken")
    this.storageService.clearData("studentData")
  } 

  async getAllRegisteredCourses(){
    let data = {
      regNo: this.getParams().jambNo
    }

    let resp = await this.restClient.funcPost(registered_CoursesUrl.apiUrl, data);


    if(resp == null){
      alert("i am here")
      return;
    }
    console.log(JSON.stringify(resp))
    this.courses = resp;
  }

  

  printReg() {
    let printContents : any;
    var elements = Array.from(document.getElementsByClassName('not-printable') as HTMLCollectionOf<HTMLElement>);
    elements.forEach((element) => {
     element.style.display = 'none'});
    printContents = document.getElementById('print-section');
    html2canvas(printContents).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 318;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("invoice.pdf"); // Generated PDF
    });
    elements.forEach((element) => {
      element.style.display = 'block'});
  }
}
