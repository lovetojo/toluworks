import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { RestclientService } from 'src/app/Services/restclient/restclient.service';
import { StorageserviceService } from 'src/app/Services/storageservice.service';

@Component({
  selector: 'app-printreg',
  templateUrl: './printreg.component.html',
  styleUrls: ['./printreg.component.css']
})
export class PrintregComponent implements OnInit {

  constructor(private router: Router,
    private restClient: RestclientService,
    private storageService: StorageserviceService,
    private auth: AuthService) { }

  ngOnInit(): void {
  }
  onLogout(e:Event){ 
    this.storageService.clearData("Token")
    this.storageService.clearData("bToken")
    this.storageService.clearData("studentData")
  } 
}
