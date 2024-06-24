import {Component, EventEmitter, Output} from '@angular/core';
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
  @Output() cardSelected = new EventEmitter<number>();
  values = [0, 1, 2, 3, 5, 8, 13, 21];

  protected readonly Math = Math;
}
