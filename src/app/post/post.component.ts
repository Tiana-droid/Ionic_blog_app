import { Component, OnInit } from '@angular/core';
import { ApiService, BlogPostFirestore } from '../api.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})

export class PostComponent  {
 postList: Observable<BlogPostFirestore[]> = this.apiService.getPosts();

  constructor(private apiService: ApiService) {}
}
