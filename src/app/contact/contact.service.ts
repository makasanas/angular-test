import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  sendMail(data: Object) {
    return this.http.post('https://test.secureprivacy.ai/api/email', data).pipe(map((response: any) => response));
  }
}
