import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { Tab1PageModule } from './tab1/tab1.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'; 
import { getStorage, provideStorage, Storage } from '@angular/fire/storage';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
   Tab1PageModule, HttpClientModule, FormsModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({"projectId":"ionic-blog-app","appId":"1:428893778714:web:3b365c5e0a1c03dc7932a3","storageBucket":"ionic-blog-app.appspot.com","apiKey":"AIzaSyBNN2LLkkqQClXD3pnQAfs1QAT4cu0jSD4","authDomain":"ionic-blog-app.firebaseapp.com","messagingSenderId":"428893778714","measurementId":"G-TVPVBTPPTQ"})),
     provideFirestore(() => getFirestore()), 
     provideStorage(() => getStorage() as Storage)
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
