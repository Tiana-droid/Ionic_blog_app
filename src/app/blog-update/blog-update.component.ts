import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { BlogPost } from '../api.service';

@Component({
  selector: 'app-blog-update',
  templateUrl: './blog-update.component.html',
  styleUrls: ['./blog-update.component.scss'],
  // imports: [IonicModule, FormsModule, CommonModule,],
  // standalone: true,
})
export class BlogUpdateComponent   {
  @Input() post: BlogPost | null = null;
  @Output() updatePostEvent = new EventEmitter<BlogPost>();

  updatePost() {
    if (this.post) {
      this.updatePostEvent.emit(this.post);
    }
  }
  posts: BlogPost[] = [];
  selectedPost: BlogPost | null = null;
  
  constructor( private apiService: ApiService) { 

  }
  // updateExistingPost() {
  //   if (this.selectedPost) {
  //     this.apiService.updatePost(this.selectedPost).subscribe(
  //       response => {
  //         console.log('Post updated:', response);
  //         // Update the local posts array
  //         const index = this.posts.findIndex(post => post.id === this.selectedPost!.id);
  //         if (index !== -1) {
  //           this.posts[index] = this.selectedPost!;
  //         }
  //         this.selectedPost = null; // Deselect the post after successful update
  //       },
  //       error => {
  //         console.error('Error updating post:', error);
  //       }
  //     );
  //   }
  // }

  editPost(post: BlogPost | null) {
    if (post) {
      this.selectedPost = { ...post }; // Create a copy of the post to edit
    }
  }

  onUpdatePost(updatedPost: BlogPost) {
    this.apiService.updatePost(updatedPost).subscribe(
      response => {
        console.log('Post updated:', response);
        // Update the local posts array
        const index = this.posts.findIndex(post => post.id === updatedPost.id);
        if (index !== -1) {
          this.posts[index] = updatedPost;
        }
        this.selectedPost = null; // Deselect the post after successful update
      },
      error => {
        console.error('Error updating post:', error);
      }
    );
  }

}
