import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { BlogPost } from '../api.service';

@Component({
  selector: 'app-blog-update',
  templateUrl: './blog-update.component.html',
  styleUrls: ['./blog-update.component.scss'],
})
export class BlogUpdateComponent {
  @Input() post: BlogPost | null = null;
  @Output() updatePostEvent = new EventEmitter<BlogPost>();

  updatePost() {
    if (this.post) {
      this.updatePostEvent.emit(this.post);
    }
  }
  posts: BlogPost[] = [];

  constructor(private apiService: ApiService) {}
}
