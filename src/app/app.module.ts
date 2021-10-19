import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommentsPostComponent } from './post/comments-post/comments-post.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ExamplesAngularComponent } from './examples-material/examples-angular.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavoritePostComponent } from './list-posts/favorite-post/favorite-post.component';
import { PaginationComponent } from './pagination/pagination.component';

import { BlogInfoComponent } from './blog-info/blog-info.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    ...routingComponents,
    CommentsPostComponent,
    ListUsersComponent,
    ExamplesAngularComponent,
    FavoritePostComponent,
    PaginationComponent,
    BlogInfoComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
