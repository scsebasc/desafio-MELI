import { Component, OnInit } from '@angular/core';
import { Item } from 'src/utils/interfaces/items';
import { ItemsService } from 'src/utils/services/items.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  search: string = '';
  itemsList: Array<Item> = [];
  breadcrumb: string = ''

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private itemsService: ItemsService ) {

   }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.search = params['search'];
    });
    this.getItems()
  }

  private getItems() {
    this.itemsService.searchItems(this.search).subscribe((res) => {
      console.log(res);
      this.itemsList = res.payload.items.slice(0, 4)

      for (const category of res.payload.categories) {
        this.breadcrumb += ` > ${category}`
      }
      console.log(this.breadcrumb);
      sessionStorage.setItem('breadcrumb', this.breadcrumb);
    })
  }

  goToDetail(itemId: string) {
    console.log(itemId);
    this.router.navigate([itemId], {
      relativeTo: this.activatedRoute
    });
  }

}
