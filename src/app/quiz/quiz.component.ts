import {Component, OnInit} from '@angular/core';
import {MoviesService} from '../services/movies.service';
import { FormBuilder, FormGroup } from '@angular/forms';
export interface ResMovie {
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
}
export interface QuizMovie {
  id: number;
  title: string;
  options: Date[];
  answer: string;
  horizontalImage: string;
  verticalImage: string;
}

@Component({
  selector: 'app-questions',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit {
  movies: QuizMovie[] = [];
  i: number = 0;
  movie: any = this.movies[this.i];
  totalQuestions: number = this.movies.length;
  answer: string;
  score: number = 0;
  toggleBool: boolean = true;
  event: any;
  percentage: number;
  message: string;

  fieldOptions = ['Field 1', 'Field 2', 'Field 3', 'Field 4', 'Field 5'];
  form: FormGroup;

  constructor(private moviesService: MoviesService, private fb: FormBuilder) {
    this.form = this.fb.group({
      selectedField: [''],
    });
  }

  ngOnInit() {
    this.getMovies();
  }

  // https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg
  getMovies():void {
    this.moviesService.fetchMovies()
      .subscribe((data:ResMovie[]) => {
        console.log(data);
          let simpleMovie: QuizMovie;
          data.forEach((movie:ResMovie) => {
            simpleMovie = {
              id: movie.id,
              title: movie.original_title,
              answer: movie.release_date,
              options: [],
              horizontalImage: 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path,
              verticalImage: 'https://image.tmdb.org/t/p/w500' + movie.poster_path
            }
            for (let i:number = 0; i < 3; i++) {
              const start: Date = new Date(2010, 0, 1)
              const end: Date = new Date()
              const randomDate:Date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
              simpleMovie.options.push(randomDate);
            }
            simpleMovie.options.splice((simpleMovie.options.length + 1) * Math.random() | 0, 0, new Date(simpleMovie.answer))
            this.movies.push(simpleMovie);
          });
          this.movie = this.movies[this.i];
          console.log(this.movies.length);
          this.totalQuestions = this.movies.length;
        },
        (error: any):void => {
          console.log('Error:', error);
        });
  }

  onSelecting(event):void {
    this.answer = event.value;
    this.event = event;
    this.toggleBool = !event.checked;
  }

  onNext():void {
    if (this.answer === this.movie.answer) {
      ++this.score;
    }
    ++this.i;
    this.movie = this.movies[this.i];
    console.log(this.i,  this.movies.length);
   if ( this.movies.length === this.i) {
     console.log('hello');
   }
    this.percentage = Math.floor(this.score / this.movies.length * 100);
    if (this.score > 10) {
      this.message = 'Congratulations'
    } else {
      this.message = 'Try again'
    }
    this.toggleBool = true;
    this.event.checked = false;
  }
  getMovieById(movieId: number) {
    this.moviesService.fetchMovieById(movieId)
      .subscribe(data => {
          console.log('data');
        },
        (error: any): void => {
          console.log('Error:', error);
        });
  }
}

