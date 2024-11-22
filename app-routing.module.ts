import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvenementComponent } from './evenement/evenement.component';
import { CreateReservComponent } from './create-reserv/create-reserv.component';
import { CreateAvisComponent } from './create-avis/create-avis.component';

const routes: Routes = [
  {path:"liste",component:EvenementComponent},
  {path:"reserv/:id",component:CreateReservComponent},
  { path: "reserve/:id", component: CreateReservComponent},
  { path: "avis/:id", component: CreateAvisComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
