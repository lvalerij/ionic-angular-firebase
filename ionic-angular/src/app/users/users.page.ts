import { Component, OnInit } from "@angular/core";
import { User } from "./user.module";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-users",
  templateUrl: "./users.page.html",
  styleUrls: ["./users.page.scss"],
})
export class UsersPage implements OnInit {
  users: User[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http
      .get<User[]>(
        "https://us-central1-ionic-angular-firebase-d0ed4.cloudfunctions.net/listAllUsers"
      )
      .subscribe((data) => {
        data.map((user) => this.users.push(user));
      });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl("/auth");
  }
}
