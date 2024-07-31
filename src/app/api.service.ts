import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  category: string;
  img: string;
  snippet: string;
  date: string;
  blog?: [];
  record?: any;
}

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  private apiUrl = 'https://api.jsonbin.io/v3/b/66894697acd3cb34a8622eaa';
  private masterKey = '$2a$10$pDhQBUZl.OMivCMn.RKLuulS5BNFGF.6uaezDfHXowa5Re//4uffS';

  constructor(private http: HttpClient) { }

  getData(): Observable<BlogPost[]> {
    return this.http.get<{ record: { blog: BlogPost[] } }>(`${this.apiUrl}/latest`).pipe( map(response => response.record.blog),
      catchError(error => {
        console.error('Error fetching data', error);
        return throwError(() => new Error(error));
      })
    );
  }

  getPostById(id: number): Observable<BlogPost | null> {
    return this.http.get<{ record: { blog: BlogPost[] } }>(`${this.apiUrl}/latest`).pipe(
      map(response => response.record.blog.find((post: BlogPost) => post.id === id) ?? null),
      catchError(this.handleError)
    );
  }


  createPost(data: BlogPost[]): Observable<BlogPost> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.masterKey}`);
    const payload = {  blog: data  }; // Wrap the post in the correct structure
    return this.http.put<BlogPost>(this.apiUrl, payload, { headers });
  }


  updatePosts(posts: BlogPost[]): Observable<any> {
    return this.http.put(`${this.apiUrl}`,  { blog: posts })}
  

  deletePost(id: number): Observable<any> {
    return this.getData().pipe(
      map(posts => {
        // Filter out the post with the specific ID
        const updatedPosts = posts.filter(post => post.id !== id);
        // Return the updated posts array
        return updatedPosts;
      }),
      switchMap(updatedPosts => {
        // Send the updated posts array back to the API
        return this.updatePosts(updatedPosts);
      }),
      catchError(error => {
        console.error('Error deleting post', error);
        return throwError(() => new Error(error));
      })
    );
  }

  updatePost(updatedPost: BlogPost): Observable<any> {
    const url = `${this.apiUrl}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.masterKey}`
    });

    return this.getData().pipe(
      switchMap(posts => {
        const updatedPosts = posts.map(post =>
          post.id === updatedPost.id ? updatedPost : post
        );
        return this.http.put(url, { blog: updatedPosts }, { headers }).pipe(
          catchError(error => {
            console.error('Error updating post', error);
            return throwError(() => new Error(error));
          })
        );
      })
    );
  }
  

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
