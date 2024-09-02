import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() value: number = 0;
  @Input() flipped: boolean = false;
  @Input() disabled: boolean = false;
  @Input() transform: string = '';

  getSymbol = (value: number) => {
    switch(value) {
      case 1: return 'A';
      default: return value;
    }
  }

  getPlacements = (value: number) => {
    switch(value) {
      case 0: return [{ x: 1, y: 3, size: 1, inverted: false }, { x: 10, y: 12, size: 1, inverted: true }];
      case 1: return [{ x: 1, y: 3, size: 1, inverted: false }, { x: 10, y: 12, size: 1, inverted: true }, { x: 4, y: 6, size: 4, inverted: false }];
      case 2: return [{ x: 1, y: 3, size: 1, inverted: false }, { x: 10, y: 12, size: 1, inverted: true }, { x: 5, y: 3, size: 2, inverted: false }, { x: 5, y: 11, size: 2, inverted: true }];
      case 3: return [{ x: 1, y: 3, size: 1, inverted: false }, { x: 10, y: 12, size: 1, inverted: true }, { x: 5, y: 3, size: 2, inverted: false }, { x: 5, y: 7, size: 2, inverted: false }, { x: 5, y: 11, size: 2, inverted: true }];
      case 5: return [{ x: 1, y: 3, size: 1, inverted: false }, { x: 10, y: 12, size: 1, inverted: true }, { x: 3, y: 3, size: 2, inverted: false }, { x: 7, y: 3, size: 2, inverted: false }, { x: 5, y: 7, size: 2, inverted: false }, { x: 3, y: 11, size: 2, inverted: true }, { x: 7, y: 11, size: 2, inverted: true }];
      case 8: return [{ x: 1, y: 3, size: 1, inverted: false }, { x: 10, y: 12, size: 1, inverted: true }, { x: 3, y: 3, size: 2, inverted: false }, { x: 7, y: 3, size: 2, inverted: false }, { x: 5, y: 5, size: 2, inverted: false }, { x: 3, y: 7, size: 2, inverted: false }, { x: 7, y: 7, size: 2, inverted: false }, { x: 5, y: 9, size: 2, inverted: true }, { x: 3, y: 11, size: 2, inverted: true }, { x: 7, y: 11, size: 2, inverted: true }];
      case 13: return [{ x: 1, y: 3, size: 1, inverted: false }, { x: 10, y: 12, size: 1, inverted: true }, { x: 3, y: 3, size: 2, inverted: false }, { x: 3, y: 5, size: 2, inverted: false }, { x: 3, y: 7, size: 2, inverted: false }, { x: 3, y: 9, size: 2, inverted: true }, { x: 3, y: 11, size: 2, inverted: true }, { x: 7, y: 3, size: 2, inverted: false }, { x: 7, y: 5, size: 2, inverted: false }, { x: 7, y: 7, size: 2, inverted: false }, { x: 7, y: 9, size: 2, inverted: true }, { x: 7, y: 11, size: 2, inverted: true }, { x: 5, y: 4, size: 2, inverted: false }, { x: 5, y: 7, size: 2, inverted: false }, { x: 5, y: 10, size: 2, inverted: true }];
      default: return [];
    }
  }
}
