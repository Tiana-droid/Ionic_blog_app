import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { BlogPost } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BlogUpdateComponentModule } from '../blog-update/blog-update.module';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.component.html',
  styleUrls: ['./tab3.component.scss'],
  imports: [CommonModule, IonicModule, RouterLink, RouterOutlet, FormsModule, BlogUpdateComponentModule],
  standalone: true
})
export class Tab3Component  implements OnInit {
  data: BlogPost[]  = [];
  posts: BlogPost[] = [];
  selectedPost: BlogPost | null = null;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getData().subscribe(
      response => {
        this.data = response
      },
      error => {
        this.errorMessage = error
        console.error('Error fetching data', error);
      }
    );
  }

  deletePost(id: number) {
    this.apiService.deletePost(id).subscribe(
      response => {
        console.log('Post deleted:', response);
        // Remove the post from the local data array
        this.data = this.data.filter(post => post.id !== id);
      },
      error => {
        console.error('Error deleting post:', error);
      }
    );
  }


  editPost(post: BlogPost | null) {
    if (post) {
      this.selectedPost = { ...post }; // Create a copy of the post to edit
    }
  }

  onUpdatePost(updatedPost: BlogPost) {
    console.log('updating this post', this.selectedPost); // Logs the selected post to debug
    this.apiService.getData().subscribe((post) => {
      // Append the new post to the existing posts
      const updatedPosts = [...post, this.selectedPost];

      // Send the updated posts array back to the API
      this.apiService.updatePost(updatedPost).subscribe(
        (response) => {
          console.log('Post updated:', response);
          // Update the local posts array
          const index = this.posts.findIndex(
            (post) => post.id === updatedPost.id
          );
          if (index !== -1) {
            this.posts[index] = updatedPost;
          }
          this.selectedPost = null; // Deselect the post after successful update
          window.location.reload();
        },
        (error) => {
          console.error('Error updating post:', error);
        }
      );
    });
  }
}