import { Component, Input, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private colors: string[];
  constructor(private userService: UserService, private router: Router) {}

async ngOnInit() {
    this.userService.getColors().then(x => {
      x.subscribe(
        (data: string[]) => {
          this.colors = data;
        },
        err => {
          console.log(err);
        }
      );
    },
    err => {
      console.log(err);
    });
  }
}
