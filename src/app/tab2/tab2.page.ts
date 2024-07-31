import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { BlogPost } from '../api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})

//
export class Tab2Page {
  newPost: BlogPost;
  posts: BlogPost[] = [];

  constructor(private apiService: ApiService, private router: Router) {
    this.newPost = this.createEmptyPost();
  }
  generateUniqueId(): number {
    return Date.now();
  }

  createEmptyPost(): BlogPost {
    return {
      id: this.generateUniqueId(),
      title: '',
      content: '',
      category: '',
      img: '',
      snippet: '',
      date: new Date().toISOString(),
    };
  }

  createNewPost() {
    console.log('Creating post:', this.newPost); // Log the post to debug
    this.apiService.getData().subscribe(
      (posts) => {
        // Append the new post to the existing posts
        const updatedPosts = [...posts, this.newPost];

        // Send the updated posts array back to the API
        this.apiService.createPost(updatedPosts).subscribe(
          (response) => {
            console.log('Post created:', response);
            this.newPost = this.createEmptyPost(); // Reset the form after successful submission
            this.posts = updatedPosts; // Update the local posts array
            this.router.navigate(['/tabs/index']).then(() => {
              window.location.reload();
            }); // route to homepage
          },
          (error) => {
            console.error('Error creating post:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }
}
