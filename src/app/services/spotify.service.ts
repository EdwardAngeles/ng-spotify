import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, delay, flatMap } from 'rxjs/operators';

const BASE_URL = 'https://api.spotify.com/v1';
const CLIENT_ID = '391a7c550b1949d1aea827ba51cb4b10';
const CLIENT_SECRET = '870120265e6e43d889273b279a5177a0';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(
    private http: HttpClient
  ) { }

  getNewReleases() {
    return this.generateHttpOptions().pipe(flatMap(httpOptions => {
      
      return this.http.get(`${BASE_URL}/browse/new-releases?limit=20`, httpOptions)
      .pipe(delay(1000), map(data => data['albums'].items));
      
    }));
  }

  getArtists(searchTerm: string) {
    return this.generateHttpOptions().pipe(flatMap(httpOptions => {
      
      return this.http.get(`${BASE_URL}/search?q=${ encodeURIComponent(searchTerm) }&type=artist&limit=15`, httpOptions)
      .pipe(delay(1000), map(data => data['artists'].items));
      
    }));
  }

  getArtist(id: string) {
    return this.generateHttpOptions().pipe(flatMap(httpOptions => {
      
      return this.http.get(`${BASE_URL}/artists/${id}`, httpOptions)
      .pipe(delay(1000));
      
    }))
  }
  
  getTopTracks(artistId: string) {
    return this.generateHttpOptions().pipe(flatMap(httpOptions => {
      
      return this.http.get(`${BASE_URL}/artists/${artistId}/top-tracks?country=us`, httpOptions)
      .pipe(delay(1000), map(data => data['tracks']));
      
    }));
  }
  
  generateHttpOptions() {
    return this.http.get(`https://spotify-get-token.herokuapp.com/spotify/${CLIENT_ID}/${CLIENT_SECRET}`).pipe(map((spotifyResp: any) => {
      
      return {headers: new HttpHeaders({'Authorization': `Bearer ${spotifyResp['access_token']}`})};
      
    }));
  }
  
}
