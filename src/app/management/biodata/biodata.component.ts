import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, Subscriber } from 'rxjs';
import { biodataUrl, Display_Profile_PictureUrl, Upload_PictureUrl } from 'src/app/Constants/Constant';
import { AuthService } from 'src/app/Services/auth.service';
import { FileUploadService } from 'src/app/Services/file-upload.service';
import { RestclientService } from 'src/app/Services/restclient/restclient.service';
import { StorageserviceService } from 'src/app/Services/storageservice.service';

@Component({
  selector: 'app-biodata',
  templateUrl: './biodata.component.html',
  styleUrls: ['./biodata.component.css']
})
export class BiodataComponent implements OnInit {
    emailRegex: any = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$';
    address: any;
    age: any;
    dateOfBirth:any;
    department:any;
    email:any;
    fName:any;
    jambNo:any;
    lga:any;
    faculty:any;
    mStatus:any;
    midName:any;
    nationality:any;
    occName:any;
    parAdd:any;
    parEmail:any;
    phoneNo:any;
    parName:any;
    parNo:any;
    religion:any;
    sex:any;
    stOfOrg:any;
    surName:any;
    picture: any;
    sizeMatch: boolean = false;
    docType!: string;
    docSize!: number;
    docName!: string;
    fileExtension!: string;
    docIndex!: number;
    selectedDoc: any;
    base64Output: any;
    title = 'imgtobase64';
    myimage!: Observable<any>;
    base64code!: any

    request:any = {
      jambNo: ''
    }
    data: any={
      jambNo: ''
    }
  constructor(private router: Router,
              private restClient: RestclientService,
              private storageService: StorageserviceService,
              private auth: AuthService,
              // private fileuploadservice: FileUploadService
              ) { }

  ngOnInit(): void {
    // console.log("token", this.storageService.getData('Token'))
    this.fetchDetails();
    this.getParams()
  }
  fetchDetails() {
    this.request = {
      jambNo: this.getParams()
    }
  }
  getParams() {
    return this.storageService.getData('studentData')
  }
  async biodata(){
    let data = {
      address:this.address,
      age:this.age,
      dateOfBirth: "20-12-1998",
      department:this.department,
      email:this.email,
      fName:this.fName,
      jambNo:this.jambNo,
      lga:this.lga,
      faculty:this.faculty,
      mStatus:this.mStatus,
      midName:this.midName,
      nationality:this.nationality,
      occName:this.occName,
      parAdd:this.parAdd,
      parEmail:this.parEmail,
      phoneNo:this.phoneNo,
      parName:this.parName,
      parNO:this.parNo,
      religion:this.religion,
      sex:this.sex,
      stOfOrg:this.stOfOrg,
      surName:this.surName,
      // picture:this.base64code
    }
      console.log(data)
    let resp = await this.restClient.funcPost(biodataUrl.apiUrl, data);
    alert(JSON.stringify(resp));
    if(resp.message != 'Thank you') {
      alert('failed, try again')
      return;
    }
    alert('biodata successful');
    
    this.router.navigate(["/profile"]);
    // console.log('Hi')
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
      this.biodata();
    }
  }

  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);
    this.convertToBase64(file)
  };
 
  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
 
    observable.subscribe((d) => {
      console.log(d)
      this.myimage = d
      this.base64code = d
    })
  }
 
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
 
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }
    onLogout(e:Event){ 
      this.storageService.clearData("Token")
      this.storageService.clearData("bToken")
      this.storageService.clearData("studentData")
    } 
    

  checkDocSize(size: number, event: any): boolean{
    const maxSize = 5;
    const docSizeInMB = size / (1024 * 1024);

    if(docSizeInMB > maxSize){
      console.log('File is to large');
      this.sizeMatch = true;
      setTimeout(() =>{
        this.sizeMatch = false;
      }, 5000);
      event.target.value = '';
      return false;
    }
    return true;
  }

  checkDocType(selectedDocType: string, event: any):boolean{
    const allowed_doc_types = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'application/pdf'
    ];

    if (allowed_doc_types.includes(selectedDocType)){
      return true;
    }
    this.sizeMatch = true;
    setTimeout(() => {
      this.sizeMatch = false;
    },5000);
    event.target.value = '';
    return false;
  }
  
}
