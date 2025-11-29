import { Component } from '@angular/core';
import { FooterComponent } from '../footer.component/footer.component';
import { HeaderComponent } from '../header.component/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {

}
