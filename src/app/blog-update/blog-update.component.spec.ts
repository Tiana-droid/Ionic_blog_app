import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BlogUpdateComponent } from './blog-update.component';

describe('BlogUpdateComponent', () => {
  let component: BlogUpdateComponent;
  let fixture: ComponentFixture<BlogUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BlogUpdateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
