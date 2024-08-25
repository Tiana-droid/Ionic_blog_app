import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})

//
export class Tab2Page {
  createPostForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private readonly loadingCtrl: LoadingController,
    private readonly alertCtrl: AlertController,
    formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {
    this.createPostForm = formBuilder.group({
      postTitle: ['', Validators.required],
      postContent: ['', Validators.required],
      postCategory: ['', Validators.required],
      postImg: ['', Validators.required],
      postSnippet: ['', Validators.required],
    });
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async createNewPost() {
    const loading = await this.loadingCtrl.create();

    const postTitle = this.createPostForm.value.postTitle;
    const postContent = this.createPostForm.value.postContent;
    const postCategory = this.createPostForm.value.postCategory;
    let postImg = this.createPostForm.value.postImg;
    const postSnippet = this.createPostForm.value.postSnippet;

    // Show loading spinner
    await loading.present();
    if (this.selectedFile) {
      // Upload the image and wait for the URL
      this.apiService.uploadImage(this.selectedFile).subscribe(
        (url) => {
          postImg = url; // Assign the image URL

          // Now call createNewPost once the image URL is ready
          this.apiService
            .createNewPost(
              postTitle,
              postContent,
              postCategory,
              postImg,
              postSnippet
            )
            .then(
              () => {
                loading.dismiss().then(() => {
                  this.router.navigateByUrl(''); // Navigate after the post is created
                });
              },
              (error) => {
                loading.dismiss().then(() => {
                  console.error(error); // Handle error
                });
              }
            );
        },
        (error) => {
          loading.dismiss().then(() => {
            console.error('Image upload failed', error);
          });
        }
      );
    } else {
      // If no image is selected, just create the post directly
      this.apiService
        .createNewPost(
          postTitle,
          postContent,
          postCategory,
          postImg,
          postSnippet
        )
        .then(
          () => {
            loading.dismiss().then(() => {
              this.router.navigateByUrl(''); // Navigate after the post is created
            });
          },
          (error) => {
            loading.dismiss().then(() => {
              console.error(error); // Handle error
            });
          }
        );
    }
    // this.apiService
    //     .createNewPost(postTitle, postContent, postCategory, postImg, postSnippet)
    //     .then(
    //       () => {
    //         loading.dismiss().then(() => {
    //           this.router.navigateByUrl(''); // Navigate after the post is created
    //         });
    //       },
    //       (error) => {
    //         loading.dismiss().then(() => {
    //           console.error(error); // Handle error
    //         });
    //       }
    //     );
  }
}
