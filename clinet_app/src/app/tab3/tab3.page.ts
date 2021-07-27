import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {}

  async delete() {
    await this.userService.deleteUser();
    this.router.navigate(["/signup"], {relativeTo: this.route});
  }
}
