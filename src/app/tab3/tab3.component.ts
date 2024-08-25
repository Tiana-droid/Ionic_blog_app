import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet, RouterLink, Router } from '@angular/router';
import { ApiService, BlogPostFirestore } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { BlogUpdateComponentModule } from '../blog-update/blog-update.module';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.component.html',
  styleUrls: ['./tab3.component.scss'],
  imports: [CommonModule, IonicModule, RouterLink, RouterOutlet, FormsModule, BlogUpdateComponentModule],
  standalone: true
})
export class Tab3Component  {
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService, private alertController: AlertController,
    private router: Router) {}

  postList: Observable<BlogPostFirestore[]> = this.apiService.getPosts();

  async deletePost(postId: string, postTitle: string): Promise<void> {
    const alert = await this.alertController.create({
      message: `Are you sure you want to delete ${postTitle}?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.apiService.deletePost(postId).then(() => {
              this.router.navigateByUrl('/tabs/admin-page');
            });
          },
        },
      ],
    });
  
    await alert.present();
  }
  


}