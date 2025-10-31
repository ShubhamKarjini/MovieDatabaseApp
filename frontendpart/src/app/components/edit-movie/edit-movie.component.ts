import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService, Movie } from '../../services/movie.service';

console.log('EditMovieComponent file loaded');

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss'],
  standalone:false
})
export class EditMovieComponent implements OnInit {
  movie: Movie | null = null;
  loading = false;
  error = '';
  genreOptions = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Horror', 'Romance'];
  movieId: string = '';

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('EditMovieComponent constructor called');
  }

  ngOnInit(): void {
    console.log('EditMovieComponent ngOnInit called');
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      console.log('Movie ID from route params:', this.movieId);
      if (this.movieId) {
        this.loadMovie();
      } else {
        this.error = 'No movie ID provided';
      }
    });
  }

  loadMovie(): void {
    this.loading = true;
    console.log('Loading movie with ID:', this.movieId);
    
    this.movieService.getMovieById(this.movieId).subscribe(
      (movie: Movie) => {
        console.log('Movie loaded:', movie);
        this.movie = movie;
        this.loading = false;
      },
      (error: any) => {
        console.error('Error loading movie:', error);
        this.error = 'Failed to load movie';
        this.loading = false;
      }
    );
  }

  updateMovie(): void {
    if (!this.movie || !this.movie.title || !this.movie.director) {
      this.error = 'Title and Director are required';
      return;
    }

    this.loading = true;
    this.movieService.updateMovie(this.movieId, this.movie).subscribe(
      () => {
        console.log('Movie updated');
        this.router.navigate(['/movies']);
      },
      (error: any) => {
        console.error('Error updating:', error);
        this.error = error.error.message || 'Failed to update movie';
        this.loading = false;
      }
    );
  }

  toggleGenre(genre: string): void {
    if (!this.movie) return;
    const index = this.movie.genre.indexOf(genre);
    if (index > -1) {
      this.movie.genre.splice(index, 1);
    } else {
      this.movie.genre.push(genre);
    }
  }

  cancel(): void {
    this.router.navigate(['/movies']);
  }
}