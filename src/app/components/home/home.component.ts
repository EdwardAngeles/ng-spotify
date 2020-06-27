import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loading: boolean = true;
  newReleases: any[] = [];
  
  constructor(
    private spotify: SpotifyService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.spotify.getNewReleases().subscribe((data: any) => {
      this.newReleases = data;
      this.loading = false;
      
      console.log('new releases:', this.newReleases);
    });
  }

}
