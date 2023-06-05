import { Component } from '@angular/core';
import { AccessService } from 'src/utils/services/access.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-meli';

  constructor(private accessService: AccessService){}

  ngOnInit(): void {
    this.accessService.getAccess().subscribe((res) => {
      console.log('Access success');
    });
  }
}
