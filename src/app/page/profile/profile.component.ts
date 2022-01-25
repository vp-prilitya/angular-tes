import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {

    this.apiService.getProfile(this.apiService.currentUserValue.id).toPromise()
      .then((data) => {
        this.profile = data;
      })
  }

}
