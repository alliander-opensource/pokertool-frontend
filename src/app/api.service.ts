import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {v4 as uuidv4} from 'uuid';
import {UserService} from "./user.service";
import {Observable} from "rxjs";
import {Room} from "./room";
import {environment} from "../environments/environment";
import {webSocket} from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private userService: UserService) {
  }

  public createRoom(): Observable<string> {
    let roomId = uuidv4();
    let userId = this.userService.getUser();
    return this.http.post(`${environment.backendUrl}/rooms/${roomId}`, userId, {responseType: 'text'});
  }

  public getRoom(roomId: string): Observable<Room> {
    return webSocket<Room>(`${environment.backendUrl}/rooms/${roomId}/ws`).asObservable()
  }

  public reveal(roomId: string): Observable<string> {
    return this.http.post(`${environment.backendUrl}/rooms/${roomId}/reveal`, '', {responseType: 'text'});
  }

  public conceal(roomId: string): Observable<string> {
    return this.http.post(`${environment.backendUrl}/rooms/${roomId}/conceal`, '', {responseType: 'text'});
  }

  public submitCard(roomId: string, card?: number): Observable<string> {
    let userId = this.userService.getUser();
    return this.http.post(`${environment.backendUrl}/rooms/${roomId}/users/${userId}`, card == undefined ? null : `${card}`, {responseType: 'text'});
  }

  public deleteCard(roomId: string): Observable<void> {
    let userId = this.userService.getUser();
    return this.http.delete<void>(`${environment.backendUrl}/rooms/${roomId}/users/${userId}`);
  }

  public reset(roomId: string): Observable<string> {
    return this.http.post(`${environment.backendUrl}/rooms/${roomId}/reset`, '', {responseType: 'text'});
  }
}
