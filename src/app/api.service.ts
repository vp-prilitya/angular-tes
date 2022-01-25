import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = environment.api_URL;

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.get<any>(this.url + 'users', { observe: 'response' })
      .pipe(map(user => {
        let db: number = user.body.map(e => { return e.username; }).indexOf(username);

        if (db >= 0) {
          const token = {
            id: user.body[db].id,
            name: user.body[db].name
          }
          localStorage.setItem('currentUser', JSON.stringify(token));
          this.currentUserSubject.next(token);
          return "success";
        } else {
          return "error";
        }

      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getDataPost() {
    return this.http.get<any>(this.url + 'posts');
  }

  getComment(id: number) {
    return this.http.get<any>(this.url + 'posts/' + id + '/comments');
  }

  getPostById(id: number) {
    return this.http.get<any>(this.url + 'posts/' + id);
  }

  getProfile(id: number) {
    return this.http.get<any>(this.url + 'users/' + id);
  }



}
