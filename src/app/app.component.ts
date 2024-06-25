import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {HandComponent} from "./hand/hand.component";
import {TableComponent} from "./table/table.component";
import {ApiService} from "./api.service";
import {State} from "./state";
import {debounceTime, filter, forkJoin, interval, map, merge, mergeMap, Observable, Subject, tap} from "rxjs";
import {UserService} from "./user.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HandComponent, TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  state: State = {
    playedCards: [],
    numPlayers: 0,
    host: false,
    revealed: false,
  };

  roomId!: string;

  constructor(private api: ApiService, private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.queryParamMap.pipe(debounceTime(100)).subscribe(
      params => {
        const roomId = params.get('room');
        if (roomId !== null) {
          this.roomId = roomId;
          console.log(`joining room ${this.roomId}`);
          return this.api.registerUser(this.roomId)
            .subscribe({next: _ => this.startUpdateCycle(), error: _ => this.startUpdateCycle()});
        } else {
          console.log('not in a room, creating one');
          return this.api.createRoom()
            .subscribe(roomId => {
              console.log('redirecting to room');
              this.router.navigate(['/'], {queryParams: {room: roomId}}).then(r => console.log(r));
            });
        }
      }
    );
  }

  startUpdateCycle() {
    interval(1000).subscribe(_ => this.updateState())
  }

  updateState() {
    this.api.getRoom(this.roomId!!)
      .subscribe(
        room => {
          // @ts-ignore
          this.state.playedCards = room.users.map(user => this.responseToCard(user.card)).filter(value => value !== null);
          this.state.numPlayers = room.users.length;
          this.state.host = room.hostUserId === this.userService.getUser();
          this.state.revealed = room.revealed;
        }
      );
  }

  responseToCard(card: string): number | null {
    if (card === '') {
      return null;
    } else {
      return +card;
    }
  }

  playCard(card: number) {
    this.api.submitCard(this.roomId, card).subscribe(_ => this.updateState());
  }

  revealConceal() {
    this.state.revealed = !this.state.revealed;
    if (this.state.revealed) {
      this.api.reveal(this.roomId!!).subscribe(_ => this.updateState());
    } else {
      this.api.conceal(this.roomId!!).subscribe(_ => this.updateState());
    }
  }
}
