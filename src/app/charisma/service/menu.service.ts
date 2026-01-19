import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

import {Menu} from "../api/menu";
import {accountUser} from "../api/accountUser";

@Injectable({
  providedIn: 'root'
})
export class MenusService {
  private baseURL = "http://localhost:9090/api/v1/getAllMenus";

  constructor(private httpClient: HttpClient) { }

  public getAllMenuList(): Observable<Menu[]>{
    return this.httpClient.get<Menu[]>(`${this.baseURL}`).pipe(
      tap(data=>console.log(JSON.stringify(data))),
      catchError(this.handlerError)
    );
  }

  handlerError(err:HttpErrorResponse){
    let errorMessage=''
    if(err.error instanceof ErrorEvent){
     errorMessage='Create errro' + err.error.message;
    }
    else{
      errorMessage='systemError';
    }
    return throwError(errorMessage)
  }

}
