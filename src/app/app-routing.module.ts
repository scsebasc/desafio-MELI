import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { DetailsComponent } from './details/details.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { AuthGuard } from 'src/utils/guard/auth.guard';

const routes: Routes = [
  { path: '', component: SearchBoxComponent},
  { path: 'items', component: ResultsComponent},
  { path: 'items/:id', component: DetailsComponent, canActivate: [AuthGuard]},
  { path: '',   redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
