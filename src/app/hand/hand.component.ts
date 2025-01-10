import {Component, input, output} from '@angular/core';
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
  disabled = input(false);
  hidden = input(false);

  cardChange = output<number>()

  values = [0, 1, 2, 3, 5, 8, 13];

  selectCard(card: number) {
    if(!this.disabled()) {
      this.cardChange.emit(card);
    }
  }
}
