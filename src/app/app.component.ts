import { CommonModule, NgStyle } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { FooterComponent } from './shared/layouts/footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  screenHeight:any;
  screenWidth:any;
  footerMAxHeight!:number;

  title = 'Angular17App';

  constructor(){
    this.getScreenSize(event);
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event:any){
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.footerMAxHeight = this.screenHeight -160;
  }
}
