

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { StorageserviceService } from '../storageservice.service';
// import { AesService } from '../aes/aes.service';
// import { LanguageService } from '../language/language.service';
// import { SpinnerService } from '../spinner/spinner.service';
// import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class RestclientService {

  constructor(
    // private spinner: SpinnerService,
    // private languageService: LanguageService,
    // private aesService: AesService,

    private router: Router,
    // private storageService: StorageserviceService
  ) { }

  async funcPost(link: string, data: any) {

    // console.log(link);
    data = JSON.stringify(data);
    console.log("Payload Calling: => " + data);

    // if (showloader)
    // {
    //   this.spinner.startSpinner();
    // }

    let myHeaders: any = {
      "Content-Type": "application/json",
      // "x-client-id ": "qdfsyrtiyjtyfdrrtyfhr5ui7ytjh",
      // "x-client-secret" : "ewrwut79u0ypoiufuyuiyutiogiuytuyr",
      // "x-source-code" : "TEST",
      // "strict-Transport-Security":"max-age=31536000", 
      // "cache-control": "no-store", 
      // "pragma": "no-cache",
      "Access-Control-Allow-Origin": "http://localhost:4200",
      // "Access-Control-Allow-Methods": "POST",
      // "Access-Control-Request-Headers" : "*",
      // "Access-Control-Allow-Headers" : "*", 
    };

    if (StorageserviceService.getBearerToken())
    {
      myHeaders["Authorization"] = StorageserviceService.getBearerToken();
      // console.log( myHeaders["Authorization"] + " ######### Token")
    } 
    let resp: any = { 
      responseCode: "99", 
      responseMessage: null,
      responseBody: null
    };

    await axios({
      method: "POST",
      url: link,
      data: data,
      headers: myHeaders,
      // withCredentials: true
    })

    .then(async (response: any) => {
      // if (showloader)
      // {
      //   this.spinner.stopSpinner();
      // }
      // console.log( JSON.stringify(myHeaders) + " ######### headers" ) 
      // console.log('hello'+ JSON.stringify(response));

      StorageserviceService.setBearerToken(response.data.token);

      // let decResp = await this.aesService.decrypt(response.data);
      // console.log(response.data.token + " ############" )
      
      let decResp = await response.data ? response.data : response;
      
      // console.log(decResp);

      try {
        resp = JSON.parse(decResp);
      } catch (error) {
        resp = decResp;
      }

    })
    .catch((error: any) => {
      // console.log('I am Here4', error);
      // if (showloader)
      // {
      //   this.spinner.stopSpinner();
      // }
      //console.log(link);
      //console.log(error);
      
      if (error == null) {
        return (resp.responseMessage = "NETWORK ERROR");
      }
      else
      {
        if (error.response && error.response.data)
        {
          if (error.response.data.status === 401) {
            resp.responseMessage = "Session TimeOut"
            this.router.navigate(["/login"]);
          } 
          else if (
              error.response.data.message == null ||
              error.response.data.message == "No message available"
            ) {
              resp.responseMessage = error.response.data.error;
            } else {
              resp.responseMessage = error.response.data.message;
            }
        }
        else
        {
          // console.log('I am Here3')
          resp.responseMessage = error.response;
        }
      }
      // console.log('I am Here2')      
      return resp;
    });
    // console.log('I am Here1')
    return resp;
  }

  
  async funcGet(link: string, showloader: boolean = true) {

    // if (showloader)
    // {
    //   this.spinner.startSpinner();
    // }

    // console.log(link);

    let myHeaders: any = {
      "content-Type": "application/json",
      // " x-client-id ": "qdfsyrtiyjtyfdrrtyfhr5ui7ytjh",
      // "x-client-secret" : "ewrwut79u0ypoiufuyuiyutiogiuytuyr",
      // "x-source-code" : "TEST"
      // "strict-Transport-Security": "max-age=31536000", 
      // "cache-control": "no-store", 
      // "pragma": "no-cache",
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Methods": "POST",
      // "Access-Control-Request-Headers" : "*",
      // "Access-Control-Allow-Headers" : "*",


    };

    if (StorageserviceService.getBearerToken())
    {
      myHeaders["Authorization"] = StorageserviceService.getBearerToken();
    }
    
    let resp: any = { 
      responseCode: "99", 
      responseMessage: null,
      responseBody: null
    };

    await axios({
      method: "GET",
      url: link,
      data: {},
      headers: myHeaders,
      // withCredentials: true
    })
    .then(async (response: any) => {
      // if (showloader)
      // {
      //   this.spinner.stopSpinner();
      // }
      //console.log(response);

      StorageserviceService.setBearerToken(response.data.token);

      // let decResp = await this.aesService.decrypt(response.data);
      let decResp = await response.data;

      //console.log(link);
      // console.log(decResp);

      try {
        resp = JSON.parse(decResp);
      } catch (error) {
        resp = decResp;
      }

    })
    .catch((error: any) => {

      // if (showloader)
      // {
      //   this.spinner.stopSpinner();
      // }
      //console.log(link);
      //console.log(error);
      
      if (error == null) {
        return (resp.responseMessage = "NETWORK ERROR");
      }
      else
      {
        if (error.response.data.status === 401) {
          resp.responseMessage =  "application.sessiontimeout"
          this.router.navigate(["/login"]);
        } 
        else if (
            error.response.data.message == null ||
            error.response.data.message == "No message available"
          ) {
            resp.responseMessage = error.response.data.error;
          } else {
            resp.responseMessage = error.response.data.message;
          }
      }
      
      return resp;
    });

    return resp;
  }

}