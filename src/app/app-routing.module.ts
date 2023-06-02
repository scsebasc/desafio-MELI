import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { DetailsComponent } from './details/details.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { AuthGuard } from 'src/utils/guard/auth.guard';

const routes: Routes = [
  { path: 'search', component: SearchBoxComponent},
  { path: 'results', component: ResultsComponent},
  { path: 'detail', component: DetailsComponent, canActivate: [AuthGuard]},
  { path: '',   redirectTo: '/search', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
