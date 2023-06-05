import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from 'src/utils/interfaces/items';
import { ItemsService } from 'src/utils/services/items.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  itemDetail!: Item;
  breadcrumb: string = ''

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private itemsService: ItemsService ) {
  }

  ngOnInit(): void {

    this.activatedRoute.url.subscribe((data) => {
      this.breadcrumb = sessionStorage.getItem('breadcrumb') as string
      this.getDetailItem(data[1].path)
    })
  }

  private getDetailItem(itemId: string) {
    this.itemsService.itemDetails(itemId).subscribe((data) => {
      this.itemDetail = data.payload.item
    })
  }

}
