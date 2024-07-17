import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { PostComponent } from './post.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, RouterLink, RouterOutlet],
  declarations: [PostComponent],
  exports: [PostComponent]
})  
export class PostComponentModule{}