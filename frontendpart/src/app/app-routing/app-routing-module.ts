import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component/login.component';
import { MovieListComponent } from '../components/movie-list.component/movie-list.component';
import { EditMovieComponent } from '../components/edit-movie/edit-movie.component';
import { AuthGuard } from '../guards/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'movies', component: MovieListComponent, canActivate: [AuthGuard] },
  { path: 'movies/edit/:id', component: EditMovieComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/movies' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }