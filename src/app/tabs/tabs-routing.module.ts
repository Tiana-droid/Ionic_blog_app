import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { BlogPostComponent } from '../blog-post/blog-post.component';
import { Tab3Component } from '../tab3/tab3.component';
import { BlogUpdateComponent } from '../blog-update/blog-update.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'index',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'postings',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  { path: 'post/:postId', component: BlogPostComponent },
  { path: 'tabs/admin-page', component: Tab3Component },
  { path: 'post-update/:postId', component: BlogUpdateComponent },
  
  {
    path: '',
    redirectTo: '/tabs/index',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
