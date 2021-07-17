import { Component, Input } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // @Input() user: User;
  private users: User[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    // this.users.forEach(x => console.log(x));
    // if (this.users.length == 0)
    //   console.log('fff');
    // this.getUsers();
    // console.log('ff');
    this.userService.getUsers()
    .subscribe((data: User[]) => {
      // console.log('dddddded');
      this.users = data;
    },
    err => {
      console.log(err);
    })
  }

  getUsers() {
    this.userService.getUsers()
    .subscribe((data: any) => {
      console.log('dddddded');
      this.users = data;
    },
    err => {
      console.log(err);
    })
  }

}
