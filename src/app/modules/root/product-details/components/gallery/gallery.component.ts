import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { TagModule } from 'primeng/tag';

@Component({
  standalone: true,
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  imports: [CommonModule, ImageModule, TagModule],
})
export class GalleryComponent {
  @Input() images: string[] = [];
  @Input() productName: string = '';
  @Input() isOrganic: boolean = false;

  selectedImageIndex: number = 0;

  get selectedImage(): string {
    return this.images[this.selectedImageIndex] || 'assets/placeholder.svg';
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }
}
