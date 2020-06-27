import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  @Input() items: any[] = [];
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
  goToArtist(item: any) {
    const artistId = item.type === 'artist' ? item.id : item.artists[0].id;
    this.router.navigate(['/artists', artistId]);
  }

}
