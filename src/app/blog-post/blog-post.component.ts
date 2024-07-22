import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { BlogPost } from '../api.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
  imports: [IonicModule, CommonModule],
  standalone: true,
})
export class BlogPostComponent implements OnInit {
  post: BlogPost | null = null;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.apiService.getPostById(+postId).subscribe(
        response => {
          this.post = response;
        },
        error => {
          this.errorMessage = error;
          console.error('There was an error fetching the post!', error);
        }
      );
    }
  }
}