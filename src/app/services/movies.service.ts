import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {ResMovie} from "../quiz/quiz.component";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
export interface Response {
  page: number;
  total_pages: number;
  total_results: number;
  results: [{
    adult: boolean;
    backdrop_path: string;
    genre_ids: string[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: false
    vote_average: number;
    vote_count: number;
  }]
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  moviesUrl: string = 'https://api.themoviedb.org/3/movie/popular?api_key=9482b1b28d5b25b5a0783f24e9806e1d';
  token: string =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDgyYjFiMjhkNWIyNWI1YTA3ODNmMjRlOTgwNmUxZCIsInN1YiI6IjVlMmM5YTY5ZTYxZTZkMDAxODFkYWE5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TS1Z5-1umMdLC9natSjsWN5bZCRVzZnx9lp9GR2FKq0'

  constructor(private http: HttpClient) {
  }

  fetchMovies() {
    return this.http.get(this.moviesUrl, httpOptions
    ).pipe(map((res:Response) => {
      console.log(res.results);
        return res.results;
      }),
    );
  }
  fetchMovieById(movieId: number) {
    let movieUrl: string = `https://api.themoviedb.org/3/movie/${movieId}?api_key=9482b1b28d5b25b5a0783f24e9806e1d`;
    return this.http.get(movieUrl, httpOptions
    ).pipe(map(res => {
        return res;
      }),
    );
  }
}

