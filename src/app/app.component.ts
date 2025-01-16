import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {HandComponent} from "./hand/hand.component";
import {ApiService} from "./api.service";
import {CardState} from "./state";
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
  cards = signal<CardState[]>([]);
  host = signal(false);
  revealed = signal(false);
  spectating = signal(false);
  /// Indicates that the client sent a state-altering request to the server and is currently waiting for the state to update.
  synchronizing = signal(false);
  /// Indicates that the client hasn't received state from the server yet.
  connecting = signal(true);
  unknownRoom = signal(false);
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
        if (roomId === null) {
          this.unknownRoom.set(true)
          this.connecting.set(false)
          return;
        }

        this.roomId = roomId;
        console.log(`joining room ${this.roomId}`);
        this.api.getRoom(this.roomId).subscribe({
          next: _ => {
            this.api.submitCard(this.roomId).subscribe()
            this.startUpdateCycle()
          },
          error: _ => this.router.navigate(['/']).then()
        })
      }
    );
  }

  startUpdateCycle() {
    this.api.openRoomSocket(this.roomId!!, this.userService.getUser())
      .subscribe({
        next:
          room => {
            this.cards.set(room.users.map(user => this.responseToCard(user)))
            this.host.set(room.hostUserId === this.userService.getUser())
            this.revealed.set(room.revealed)
            this.connecting.set(false)
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
    if (this.revealed()) {
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

  createRoom() {
    this.connecting.set(true)
    console.log('creating room');
    return this.api.createRoom()
      .subscribe(roomId => {
        this.unknownRoom.set(false);
        console.log('redirecting to room');
        this.router.navigate(['/'], {queryParams: {room: roomId}}).then();
      });
  }
}
