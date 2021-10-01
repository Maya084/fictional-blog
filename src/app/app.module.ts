import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import { CommentsPostComponent } from './post/comments-post/comments-post.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [	
    AppComponent,
    ...routingComponents,
    CommentsPostComponent,
    ListUsersComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
