import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private users: User[];
  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    // Getting users data after navigating to this page.
    this.router.events.subscribe((ev: RouterEvent) => {
      if (ev instanceof NavigationEnd && ev.url == '/app/tabs/tab2') {
        this.userService.fetchUsers()
          .subscribe((data: User[]) => {
            this.users = data;
          },
            err => {
              console.log(err);
          });
      }
    });
  }

  toggleDropdown(ev) {
    const e = (ev.target as Element);
    if (e.getAttribute('name') === "chevron-up-outline") {
      e.setAttribute('name', 'chevron-down-outline');
      e.parentElement.parentElement.querySelector('.colors-list').classList.remove('ion-hide');
      e.parentElement.querySelector('.shuffle-btn')?.classList.remove('ion-hide');
    } else {
      e.setAttribute('name', 'chevron-up-outline');
      e.parentElement.parentElement.querySelector('.colors-list').classList.add('ion-hide');
      e.parentElement.querySelector('.shuffle-btn')?.classList.add('ion-hide');
    }
  }

  async shuffleColors(id) {
    let i = this.users.findIndex(x => x.id == id);
    this.users[i].colors = this.shuffleArray(this.users[i].colors);
  }

  // Shuffle an array using the Fisher-Yart algorithm.
  shuffleArray(array: any[]) {
    // the array needs to be cloned to avoid triggering angular hooks.
    let arr = array.map(obj => obj);
    let tmp, j;
    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i));
      tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

}
