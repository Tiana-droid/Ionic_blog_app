import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { BlogPost } from '../api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})

export class PostComponent  implements OnInit {

 data: BlogPost[] = [];
 errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getData().subscribe(
      response => {
        this.data = response;
        console.log(response)
      },
      error => {
        this.errorMessage = error
        console.error('Error fetching data', error);
      }
    );
  }

}
