import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { BlogPost } from '../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})

//
export class Tab2Page {
  // newPost: BlogPost;
  posts: BlogPost[] = [];
  createPostForm: FormGroup ;

  constructor(
    private apiService: ApiService, 
    private router: Router,
    private readonly loadingCtrl: LoadingController,
    private readonly alertCtrl: AlertController,
    formBuilder: FormBuilder,
  ) {
    // this.newPost = this.createEmptyPost();
    this.createPostForm = formBuilder.group({
      albumName: ['', Validators.required],
      artistName: ['', Validators.required],
      songDescription: ['', Validators.required],
      songName: ['', Validators.required],
    });
  }
  // generateUniqueId(): number {
  //   return Date.now();
  // }

  // createEmptyPost(): BlogPost {
  //   return {
  //     id: this.generateUniqueId(),
  //     title: '',
  //     content: '',
  //     category: '',
  //     img: '',
  //     snippet: '',
  //     date: new Date().toISOString(),
  //   };
  // }

  // createNewPost() {
  //   console.log('Creating post:', this.newPost); // Log the post to debug
  //   this.apiService.getData().subscribe(
  //     (posts) => {
  //       // Append the new post to the existing posts
  //       const updatedPosts = [...posts, this.newPost];

  //       // Send the updated posts array back to the API
  //       this.apiService.createPost(updatedPosts).subscribe(
  //         (response) => {
  //           console.log('Post created:', response);
  //           this.newPost = this.createEmptyPost(); // Reset the form after successful submission
  //           this.posts = updatedPosts; // Update the local posts array
  //           this.router.navigate(['/tabs/index']).then(() => {
  //             window.location.reload();
  //           }); // route to homepage
  //         },
  //         (error) => {
  //           console.error('Error creating post:', error);
  //         }
  //       );
  //     },
  //     (error) => {
  //       console.error('Error fetching posts:', error);
  //     }
  //   );
  // }

  async createPostFirestore() {
    const loading = await this.loadingCtrl.create();
  
    const postTitle = this.createPostForm.value.postTitle;
    const postContent = this.createPostForm.value.postContent;
    const postImg = this.createPostForm.value.postImg;
    const postSnippet = this.createPostForm.value.postSnippet;
  
    this.apiService
      .createPostFirestore( postTitle,
        postContent,
        postImg,
        postSnippet,)
      .then(
        () => {
          loading.dismiss().then(() => {
            this.router.navigateByUrl('');
          });
        },
        error => {
          loading.dismiss().then(() => {
            console.error(error);
          });
        }
      );
  
    return await loading.present();
  }
  
}
