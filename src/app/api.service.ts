import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { catchError, switchMap, filter} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Firestore, addDoc, collection, collectionData, CollectionReference, doc, docData, setDoc, deleteDoc} from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';



export interface BlogPostFirestore {
  id?: string;
  postTitle: string,
  postContent: string,
   postCategory: string,
   postImg: string,
   postSnippet: string
}

@Injectable({
  providedIn: 'root'
})


export class ApiService {
  private postsCollection: CollectionReference<BlogPostFirestore>;

  constructor(private readonly firestore: Firestore, 
    private storage: Storage
  ) { 
    this.postsCollection = collection(this.firestore, 'postList') as CollectionReference<BlogPostFirestore>;
  }

  createNewPost(
    postTitle: string,
    postContent: string,
    postCategory: string,
    postImg: string,
    postSnippet: string
  ): Promise<void> {
    const newId = doc(this.postsCollection).id;
    return addDoc(this.postsCollection, {
      id: newId,
      postTitle,
      postContent,
      postCategory,
      postImg,
      postSnippet,
    }).then((docRef) => {
      console.log('Post created with ID:', docRef.id);
    }).catch(error => {
      console.error('Error creating post:', error);
      throw error;
    });
  }

  getPosts(): Observable<BlogPostFirestore[]> {
    return collectionData<BlogPostFirestore>(this.postsCollection, {
      idField: 'id'
    });
  }

  getPostDetail(postId: string): Observable<BlogPostFirestore> {
    const postRef = doc(this.postsCollection, `/${postId}`);
    return docData<BlogPostFirestore>(postRef, {
      idField: 'id'
    }).pipe(
      filter((post :any): post is BlogPostFirestore => post !== undefined) // Filter out undefined values
    );
  }

  updatePost(postId: string, updatedPost: BlogPostFirestore): Observable<void> {
    const postRef = doc(this.postsCollection, `/${postId}`);
    
    return from (setDoc(postRef, updatedPost)).pipe(
      catchError(error => {
        console.error('Error updating post:', error);
        return throwError(() => new Error('Failed to update post'));
      })
    );
  }


deletePost(postId: string): Promise<void> {
  const songDocRef = doc(this.postsCollection, `/${postId}`);
  return deleteDoc(songDocRef);
}

uploadImage(file: File): Observable<string> {
  const filePath = `images/${file.name}`;
  const imageRef = ref(this.storage, filePath);
  return from(uploadBytes(imageRef, file)).pipe(
    switchMap(() => getDownloadURL(imageRef)),
    catchError(error => {
      console.error('Error uploading image:', error);
      return throwError(() => new Error(error));
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
