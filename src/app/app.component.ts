import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {HandComponent} from "./hand/hand.component";
import {ApiService} from "./api.service";
import {CardState, State} from "./state";
import {debounceTime} from "rxjs";
import {UserService} from "./user.service";
import {ThrobberComponent} from "./throbber/throbber.component";
import {ButtonComponent} from "./button/button.component";
import {CardComponent} from "./card/card.component";
import {User} from "./user";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HandComponent, ThrobberComponent, ButtonComponent, CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  // TODO use signal for state
  state: State = {
    cards: [],
    host: false,
    revealed: false,
  };

  spectating = signal(false);
  /// Indicates that the client sent a state-altering request to the server and is currently waiting for the state to update.
  synchronizing = signal(false);
  /// Indicates that the client hasn't received state from the server yet.
  connecting = signal(true);

  roomId!: string;

  constructor(protected userService: UserService,
              private api: ApiService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.queryParamMap.pipe(debounceTime(100)).subscribe(
      params => {
        const roomId = params.get('room');
        if (roomId !== null) {
          this.roomId = roomId;
          console.log(`joining room ${this.roomId}`);
          return this.api.submitCard(this.roomId)
            .subscribe({
              next: _ => this.startUpdateCycle(),
              error: err => {
                // If the room was not found go to start page to create a new one
                if (err.status == 404) {
                  console.warn(`room was not found: ${this.roomId}`);
                  this.router.navigate(['/']);
                }
              }
            });
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
    this.api.getRoom(this.roomId!!)
      .subscribe({
        next:
          room => {
            this.state.cards = room.users.map(user => this.responseToCard(user))
            this.state.host = room.hostUserId === this.userService.getUser();
            this.state.revealed = room.revealed;
            this.connecting.set(false);
          },
        error: _ => this.connecting.set(true),
        complete: () => this.connecting.set(true),
      });
  }

  responseToCard(user: User): CardState {
    if (user.card === '') {
      return {userId: user.userId, value: null};
    } else {
      return {userId: user.userId, value: +user.card};
    }
  }

  playCard(card: number) {
    this.synchronizing.set(true);
    this.api.submitCard(this.roomId, card)
      .subscribe(() => this.synchronizing.set(false));
  }

  revealConceal() {
    this.synchronizing.set(true);
    if (this.state.revealed) {
      this.api.conceal(this.roomId!!)
        .subscribe(() => this.synchronizing.set(false));
    } else {
      this.api.reveal(this.roomId!!)
        .subscribe(() => this.synchronizing.set(false));
    }
  }

  reset() {
    this.synchronizing.set(true);
    this.api.reset(this.roomId)
      .subscribe(() => this.synchronizing.set(false));
  }

  join() {
    this.api.submitCard(this.roomId)
      .subscribe(() => this.spectating.set(false))
  }

  spectate() {
    this.api.deleteCard(this.roomId)
      .subscribe(() => this.spectating.set(true))
  }

  protected readonly Array = Array;
}
