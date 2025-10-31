import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MovieService, Movie } from '../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  standalone:false
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies$: Observable<Movie[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;
  private destroy$ = new Subject<void>();
  selectedGenre = '';
  selectedYear = '';

  constructor(private movieService: MovieService,private router: Router) {
    this.movies$ = this.movieService.movies$;
    this.loading$ = this.movieService.loading$;
    this.error$ = this.movieService.error$;
  }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe();
  }

  onSearch(query: string): void {
    this.movieService.search(query);
  }

  onFilter(): void {
    this.movieService.getMovies({
      genre: this.selectedGenre,
      year: this.selectedYear
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  deleteMovie(id: string): void {
    if (confirm('Are you sure?')) {
      this.movieService.deleteMovie(id).pipe(takeUntil(this.destroy$)).subscribe();
    }
  }
  onMovieAdded(): void {
  this.movieService.getMovies().subscribe();
  }
  editMovie(id: string | undefined): void {
  if (!id) {
    console.error('No ID provided');
    return;
  }
  
  console.log('=== EDIT MOVIE ===');
  console.log('Current URL:', window.location.pathname);
  console.log('Navigating to: /movies/edit/' + id);
  
  this.router.navigate(['/movies/edit', id]).then(
    success => {
      console.log('Navigation successful:', success);
      console.log('New URL:', window.location.pathname);
    },
    error => {
      console.error('Navigation failed:', error);
    }
  );
}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}