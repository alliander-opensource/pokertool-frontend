import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HandComponent} from "./hand/hand.component";
import {TableComponent} from "./table/table.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HandComponent, TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // Server state
  playedCards: number[] = [3, 5, 2];
  revealed = false;
  host = true;
  numPlayers = 10;

  // UI state
  myIndex: number | null = null;

  playCard(value: number) {
    if (this.myIndex !== null) {
      this.playedCards.splice(this.myIndex, 1);
    }
    this.myIndex = this.playedCards.length;
    this.playedCards.push(value);
  }
}
