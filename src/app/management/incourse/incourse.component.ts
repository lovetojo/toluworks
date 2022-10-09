import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { RestclientService } from 'src/app/Services/restclient/restclient.service';
import { StorageserviceService } from 'src/app/Services/storageservice.service';

@Component({
  selector: 'app-incourse',
  templateUrl: './incourse.component.html',
  styleUrls: ['./incourse.component.css']
})
export class IncourseComponent implements OnInit {

  constructor(private router: Router,
    private restClient: RestclientService,
    private storageService: StorageserviceService,
    private auth: AuthService) { }

  ngOnInit(): void {
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
