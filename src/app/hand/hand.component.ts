import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardComponent} from "../card/card.component";

@Component({
  selector: 'app-hand',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './hand.component.html',
  styleUrl: './hand.component.scss'
})
export class HandComponent {
  @Input() disabled = false;
  @Input() hidden = false;

  @Output() cardChange = new EventEmitter<number>();

  values = [0, 1, 2, 3, 5, 8, 13];

  protected readonly Math = Math;

  selectCard(card: number) {
    if(!this.disabled) {
      this.cardChange.emit(card);
    }
  }
}
