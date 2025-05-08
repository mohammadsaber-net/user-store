import { Component } from '@angular/core';
import { AppModule } from './app.module';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './head/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent,
    CommonModule,
    AppModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'user';
}
