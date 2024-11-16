import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenResponse } from './token-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 
  constructor(private http: HttpClient) { }   

  signIn(email: string, pwd: string): Observable<TokenResponse> {    
    return this.http.post<TokenResponse>(environment.baseUrl + '/auth/signIn',
        { Email: email, Password: pwd });
  }

  isTokenValid(): Observable<string> {
    return this.http.get<any>(environment.baseUrl + '/auth/tokenvalid');
  }

  //getForecasts() {
  //  this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
  //    (result) => {
  //      this.forecasts = result;
  //    },
  //    (error) => {
  //      console.error(error);
  //    }
  //  );
  //}

}


