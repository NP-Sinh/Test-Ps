import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
   galleryItems = [
    { id: 1, title: 'Hình ảnh 1', likes: '1.2k' },
    { id: 2, title: 'Hình ảnh 2', likes: '2.5k' },
    { id: 3, title: 'Hình ảnh 3', likes: '980' },
    { id: 4, title: 'Hình ảnh 4', likes: '3.1k' },
    { id: 5, title: 'Hình ảnh 5', likes: '1.8k' },
    { id: 6, title: 'Hình ảnh 6', likes: '2.2k' }
  ];
}
