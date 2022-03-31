import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderServiceService {

  constructor(private http: HttpClient) { }

  fileUpload(file: FormData) {
    return this.http.post('http://localhost:8000/api/upload', file);
  }
}
