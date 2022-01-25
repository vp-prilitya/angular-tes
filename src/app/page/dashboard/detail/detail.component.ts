import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  data = {
    tittle: '',
    body: ''
  };
  comment: Array<any> = [];
  showComment: boolean = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.apiService.getPostById(parseInt(this.route.snapshot.paramMap.get('id'))).toPromise()
      .then(data => {
        this.data = data;
      })
      .then(() => this.getComment())
  }

  getComment() {
    this.apiService.getComment(parseInt(this.route.snapshot.paramMap.get('id'))).toPromise()
      .then(dataC => {
        this.comment = dataC
      })
  }

  commentCheck(value: boolean) {
    this.showComment = value;
  }

}
