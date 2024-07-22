import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BlogUpdateComponent } from './blog-update.component';

@NgModule({
    imports: [ CommonModule, FormsModule, RouterLink, RouterOutlet, IonicModule ],
    declarations: [BlogUpdateComponent],
    exports: [BlogUpdateComponent]
})  

export class BlogUpdateComponentModule{}