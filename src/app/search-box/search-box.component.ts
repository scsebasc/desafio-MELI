import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  searchInput: string = '';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  async onClickSeach() {
    console.log(`Hola ${this.searchInput}`);
    await this.router.navigate(['items'], {
      queryParams: {
        search: this.searchInput
      }
    });
    location.reload()
  }

}
