import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardComponent} from "../card/card.component";
import {ThrobberComponent} from "../throbber/throbber.component";
import {ButtonComponent} from "../button/button.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CardComponent,
    ThrobberComponent,
    ButtonComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() playedCards: number[] = [];
  @Input() revealed = false;
  @Input() host = true;
  @Input() numPlayers = 0;
  @Input() inputDisabled = false;

  @Output() revealButtonPressed = new EventEmitter<void>();
  @Output() resetButtonPressed = new EventEmitter<void>();

  protected readonly Array = Array;
}
