import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardComponent} from "../card/card.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() playedCards: number[] = [];
  @Input() revealed = false;
  @Output() revealButtonPressed = new EventEmitter<void>();
  @Output() resetButtonPressed = new EventEmitter<void>();
  @Input() host = true;
  @Input() numPlayers = 0;

  protected readonly Array = Array;
}
