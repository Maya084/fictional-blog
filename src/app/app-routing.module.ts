import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamplesAngularComponent } from './examples-material/examples-angular.component';
import { ListPostsComponent } from './list-posts/list-posts.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { PostComponent } from './post/post.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: 'posts', component: ListPostsComponent},
  {path: 'posts/:postID', component: PostComponent},
  {path: 'users', component:  ListUsersComponent},
  {path: 'users/:userID', component: UserComponent},
  {path: 'material', component: ExamplesAngularComponent}, 
  {path: '**', redirectTo: 'posts', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  ListPostsComponent, 
  PostComponent, 
  UserComponent
];
