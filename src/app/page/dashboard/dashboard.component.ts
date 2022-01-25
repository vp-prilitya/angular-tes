import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  page = 0;
  size = 10;
  data: Array<any> = [];
  filterData = [];
  currentUser;

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.currentUser = this.apiService.currentUserValue;

    this.apiService.getDataPost().toPromise()
      .then((data) => {
        // this.data = data;
        data.forEach(element => {
          this.apiService.getComment(element.id)
            .subscribe(db => {
              element.totalComment = db.length;
            })
          this.data.push(element);
        });
      })
      .then(() => this.pageChanged({ pageIndex: this.page, pageSize: this.size }))
  }

  pageChanged(obj) {
    this.page = obj.pageIndex;
    this.size = obj.pageSize;

    let index = 0,
      startingIndex = obj.pageIndex * obj.pageSize,
      endingIndex = startingIndex + obj.pageSize;

    this.filterData = this.data.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });
  }

}
