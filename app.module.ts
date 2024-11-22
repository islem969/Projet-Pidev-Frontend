import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { EvenementComponent } from './evenement/evenement.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateReservComponent } from './create-reserv/create-reserv.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAvisComponent } from './create-avis/create-avis.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    EvenementComponent,
    CreateReservComponent,
    CreateAvisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
