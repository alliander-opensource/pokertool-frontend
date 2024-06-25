import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardComponent} from "../card/card.component";
import {ApiService} from "../api.service";

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
  @Output() cardChange = new EventEmitter<number>();

  values = [0, 1, 2, 3, 5, 8, 13, 21];

  protected readonly Math = Math;

  selectCard(card: number) {
    this.cardChange.emit(card);
  }
}
