import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { throwError } from 'rxjs';

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

  putData(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/data/${id}`, data);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/data/${id}`);
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


export class IdGeneratorService {
  private currentId: number;

  constructor() {
    this.currentId = 0; // Start the counter from 0
  }

  generateUniqueId(): number {
    this.currentId += 1;
    return this.currentId;
  }
}