import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Upload_PictureUrl } from '../Constants/Constant';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  // baseApiUrl = Upload_PictureUrl.apiUrl

  constructor(private http: HttpClient) { }

  // upload(file:any): Observable<any> {
  //   const formData = new FormData();
  //   formData.append("file", file, file.name);
  //   return this.http.post(this.baseApiUrl, formData)

  // }
}
