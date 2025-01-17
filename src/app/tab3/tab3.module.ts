import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Tab3Component } from './tab3.component';
import { NgIconsModule } from '@ng-icons/core';
import { BlogUpdateComponentModule } from '../blog-update/blog-update.module';


@NgModule({
    imports: [ CommonModule, FormsModule, RouterLink, RouterOutlet, IonicModule,
       BlogUpdateComponentModule
      ],
    // declarations: [Tab3Component],
    // exports: [Tab3Component]
  })  
  export class Tab3ComponentModule{}