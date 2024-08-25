import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, BlogPostFirestore } from '../api.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-update',
  templateUrl: './blog-update.component.html',
  styleUrls: ['./blog-update.component.scss']
})
export class BlogUpdateComponent implements OnInit {
  post: BlogPostFirestore | null = null;
  errorMessage: string = '';
  selectedPost: BlogPostFirestore | null = null;


  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router,) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('postId');
    if (postId) {
      // Call a service to fetch the post by postId
      this.apiService.getPostDetail(postId).subscribe(
        (post: BlogPostFirestore) => {
          this.post = post;
          this.selectedPost = { ...post }; // Prepare for editing
        },
        (error) => {
          this.errorMessage = 'Failed to load post';
          console.error('Error loading post:', error);
        }
      );
    }
  }


  // Function to update the post
  updatePost() {
    if (this.selectedPost && this.selectedPost.id) {
      this.apiService.updatePost(this.selectedPost.id, this.selectedPost).subscribe(
        () => {
          console.log('Post updated successfully');
          this.router.navigateByUrl('/tabs/admin-page');
          
        },
        (error) => {
          console.error('Error updating post', error);
        }
      );
    } else {
      console.error('No post selected for update or post ID is missing');
    }
  }
}


