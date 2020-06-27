import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { debounceTime, takeWhile } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  search$ = new Subject<string>();
  
  loading: boolean;
  artists: any[] = [];
  
  isActive: boolean = true;
  
  constructor(
    private spotify: SpotifyService
  ) { }

  ngOnInit(): void {
    this.search$.pipe(debounceTime(800), takeWhile(() => this.isActive))
    .subscribe(term => this.search(term));
  }
  
  search(term: string) {
    this.spotify.getArtists(term).subscribe((data: any) => {
      this.artists = data;
      this.loading = false;
      console.log('artist', this.artists);
    });
  }
  
  onType(term: string) {
    if (!term.trim()) return this.artists = [];
    
    this.loading = true;
    this.search$.next(term.trim());
  }
  
  ngOnDestroy() {
    this.isActive = false;
  }

}
