import { Component, Output, EventEmitter } from '@angular/core';
import { MovieService, Movie } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
  standalone:false
})
export class AddMovieComponent {
  @Output() movieAdded = new EventEmitter<void>();
  
  showForm = false;
  loading = false;
  error = '';
  
  movie: Movie = {
    title: '',
    genre: [],
    releaseYear: new Date().getFullYear(),
    plot: '',
    rating: 5,
    director: '',
    cast: [],
    posterUrl: ''
  };

  genreOptions = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Horror', 'Romance'];

  constructor(private movieService: MovieService) {}

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.error = '';
  }

  addMovie(): void {
    if (!this.movie.title || !this.movie.director) {
      this.error = 'Title and Director are required';
      return;
    }

    this.loading = true;
    this.movieService.createMovie(this.movie).subscribe(
      () => {
        this.resetForm();
        this.movieAdded.emit();
        this.loading = false;
      },
      error => {
        this.error = error.error.message || 'Failed to add movie';
        this.loading = false;
      }
    );
  }

  resetForm(): void {
    this.movie = {
      title: '',
      genre: [],
      releaseYear: new Date().getFullYear(),
      plot: '',
      rating: 5,
      director: '',
      cast: [],
      posterUrl: ''
    };
    this.showForm = false;
  }

  toggleGenre(genre: string): void {
    const index = this.movie.genre.indexOf(genre);
    if (index > -1) {
      this.movie.genre.splice(index, 1);
    } else {
      this.movie.genre.push(genre);
    }
  }
}