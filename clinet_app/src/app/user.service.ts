import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { share } from 'rxjs/operators';
import { User } from './user';
import { Storage } from '@ionic/storage';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = 'http://localhost:80/api';
  private users: User[];
  private user_id: number;
  private _storage: Storage;

  constructor(private http: HttpClient, private router: Router, private storage: Storage) {
    // this.init();
  }

  init() {
    console.log('init user service');
    this.router.events.subscribe(async (ev: RouterEvent) => {
      if (ev instanceof NavigationEnd && ev.url.includes('/app/tabs')) {
        console.log('tabs');
        if (!this.user_id) {
          await this.importStoredUserId();
        }
      }
    });
  }

  async importStoredUserId(): Promise<number> {
    if (!this._storage) {
      const storage = await this.storage.create();
      this._storage = storage;
    }
    this.user_id = await this._storage.get('user_id');
    if (!this.user_id)
      this.router.navigate(['/signup']);
    return this.user_id;
  }

  getUserId() {
    return (this.user_id) ? this.user_id : this.importStoredUserId();
  }

  setUserId(id: number) {
    console.log('setting', id);
    this._storage.set('user_id', id);
    this.user_id = id;
  }

  fetchUsers(): Observable<User[]> {
     return this.http.get<User[]>(this.api + '/user').pipe(share());
  }

  signup() {
    return this.http.get(this.api + '/user/signup');
  }

  async deleteUser() {
    if (!this._storage)
      await this.importStoredUserId();
    this.http.delete(this.api + '/user/' + this.user_id).subscribe( x => console.log(x));
    await this._storage?.remove('user_id');
  }

  getUsers(): User[] {
    console.log(this.users);
    return this.users;
  }
  
  async getColors(): Promise<any> {
    if (this.user_id || (await this.importStoredUserId()))
      return this.http.get<string[]>(this.api + '/user/' + this.user_id + '/colors');
    return Promise.reject(new Error('No stored id'));
  }
}
