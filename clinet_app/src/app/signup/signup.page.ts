import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  private user_id: number;
  private buttenPressed: boolean; 

  constructor(private userService: UserService,  private router: Router, private route: ActivatedRoute) {

  }

  async ngOnInit() {
    await this.checkUser();
  }

  async checkUser() {
    this.user_id = await this.userService.importStoredUserId();
    if (this.user_id) {
      this.buttenPressed = false;
      this.router.navigate(['/app/tabs/tab1'], { relativeTo: this.route });
    }
  }

  signup() {
    if (this.buttenPressed)
      return;
    this.buttenPressed = true;
    this.userService.signup().subscribe((x: number) => {
      this.userService.setUserId(x);
      // Nvaigating and toggling buttonPressed
      this.checkUser();
    });
  }

}
