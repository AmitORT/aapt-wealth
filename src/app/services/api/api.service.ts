import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { AescryptoService } from '../cryptomanager/aescrypto.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService { 
  serverUrl = environment.ServerUrl;
  
  header = { 
    headers: new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', '*')
    .set('Access-Control-Allow-Headers', 'Content-Type')
  };
  

  constructor(private httpClient: HttpClient,private crypto:AescryptoService) { }
  
  public get(url: string,auth=false): Observable<any>{
    url = this.serverUrl + url;
     return this.httpClient.get<any>(url,this.header).pipe(
      catchError(this.handleError)
    );
  }
  
  public post(url: string, data: any,auth=false,fromdata:boolean=false): Observable<any>{
    url = this.serverUrl + url;
    if(auth){
      let token=this.crypto.Decrypt(localStorage.getItem("CustToken")).token;
      this.header.headers=this.header.headers.set("Authorization","Bearer "+token);
    }
    return this.httpClient.post<any>(url, data,this.header).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    if(error.status == 0){
      if(localStorage.getItem("SessionServerAlert")==null){
        localStorage.setItem("SessionServerAlert","1");
        alert("Server Down!! Please Try Again Later..");
          window.location.href = "/";
      }
    }
    else if (error.status!=200) {
      if(localStorage.getItem("SessionAlert")==null){
        localStorage.setItem("SessionAlert","1");
        alert("Session expired..! Please login again");
          window.location.href = "/";
      }
    }
    return throwError('Something bad happened; please try again later.');
  };
}
