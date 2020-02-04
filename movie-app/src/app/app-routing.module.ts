import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchMoviesComponent } from './search-movies/search-movies.component';
import { MovieComponent } from './containers/movie/movie.component';


const routes: Routes = [
  { path: 'movies/:id', component: MovieComponent },
  { path: 'movies', component: SearchMoviesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
