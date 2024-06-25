import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardComponent} from "../card/card.component";
import {Subject} from "rxjs";

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
  @Output() buttonPressed = new EventEmitter<void>();
  @Input() host = true;
  @Input() numPlayers = 0;

  protected readonly Array = Array;
}
