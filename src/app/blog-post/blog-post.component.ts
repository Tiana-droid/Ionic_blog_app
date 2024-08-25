import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, BlogPostFirestore } from '../api.service';
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
  post: BlogPostFirestore | undefined ;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('postId');
  
    if (postId !== null) {
      // Since postId might be null, check if it's not null before calling the service
      this.apiService.getPostDetail(postId).subscribe({
        next: (post) => {
          if (post) {
            this.post = post;
          } else {
            this.errorMessage = 'Post not found';
          }
        },
        error: (error) => {
          this.errorMessage = 'Error fetching post';
          console.error('Error fetching post details:', error);
        }
      });
    } else {
      this.errorMessage = 'Invalid post ID';
    }
  }
  
}