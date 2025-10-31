import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, tap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

export interface Movie {
  _id?: string;
  title: string;
  genre: string[];
  releaseYear: number;
  plot: string;
  rating: number;
  director: string;
  cast: string[];
  posterUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:3000/api/movies';
  private moviesSubject = new BehaviorSubject<Movie[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new Subject<string>();
  private searchSubject = new Subject<string>();

  public movies$ = this.moviesSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {
    this.initializeSearch();
  }

  private initializeSearch(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(search => this.getMovies({ search }))
    ).subscribe(
      movies => this.moviesSubject.next(movies),
      error => this.errorSubject.next(error)
    );
  }

  getMovies(filters: any = {}): Observable<Movie[]> {
    this.loadingSubject.next(true);
    let query = '';
    if (filters.search) query += `search=${filters.search}`;
    if (filters.genre) query += `&genre=${filters.genre}`;
    if (filters.year) query += `&year=${filters.year}`;

    return this.http.get<Movie[]>(`${this.apiUrl}?${query}`).pipe(
      tap(movies => {
        this.moviesSubject.next(movies);
        this.loadingSubject.next(false);
      }),
      catchError(error => {
        this.errorSubject.next('Error loading movies');
        this.loadingSubject.next(false);
        throw error;
      })
    );
  }

  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }

  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie).pipe(
      tap(newMovie => {
        const current = this.moviesSubject.value;
        this.moviesSubject.next([newMovie, ...current]);
      })
    );
  }

  updateMovie(id: string, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/${id}`, movie).pipe(
      tap(updatedMovie => {
        const current = this.moviesSubject.value.map(m => 
          m._id === id ? updatedMovie : m
        );
        this.moviesSubject.next(current);
      })
    );
  }

  deleteMovie(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const current = this.moviesSubject.value.filter(m => m._id !== id);
        this.moviesSubject.next(current);
      })
    );
  }

  search(query: string): void {
    this.searchSubject.next(query);
  }
}