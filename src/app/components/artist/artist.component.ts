import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  artist: any = {};
  topTracks: any[] = [];
  
  isLoading: boolean = true;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    
    this.activatedRoute.params.subscribe((params => {
      const artistId: string = params['id'];
      if (!artistId) return;
      
      this.fetchArtist(artistId);
      this.fetchTopTracks(artistId);
    }));
  }
  
  fetchArtist(id: string) {
    this.spotifyService.getArtist(id).subscribe(artist => {
      this.artist = artist;
      this.isLoading = false;
    });
  }
  
  fetchTopTracks(id: string) {
    this.spotifyService.getTopTracks(id).subscribe(topTracks => {
      this.topTracks = topTracks;
      console.log('topTracks:', this.topTracks);
    });
  }

}
