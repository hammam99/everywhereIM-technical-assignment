import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private usersurl = 'http://localhost:80/api/user/';
  // private users: Observable<User[]>;
  private users: User[];

  getUsers(): Observable<User[]> {
    //  console.log('dddddded');
     return this.http.get<User[]>(this.usersurl);
    // console.log(this.users);
    // return this.users;
  }

  getUser(id: number): Observable<User[]> {
    return this.http.get<User[]>(this.usersurl);
  }
}
