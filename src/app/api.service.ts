import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {v4 as uuidv4} from 'uuid';
import {UserService} from "./user.service";
import {Observable} from "rxjs";
import {Room} from "./room";
import {environment} from "../environments/environment";

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

  public registerUser(roomId: string): Observable<string> {
    let userId = this.userService.getUser();
    return this.http.post(`${environment.backendUrl}/rooms/${roomId}/users/${userId}`, '', {responseType: 'text'});
  }

  public getRoom(roomId: string): Observable<Room> {
    return this.http.get<Room>(`${environment.backendUrl}/rooms/${roomId}`);
  }

  public reveal(roomId: string): Observable<string> {
    return this.http.post(`${environment.backendUrl}/rooms/${roomId}/reveal`, '', {responseType: 'text'});
  }

  public conceal(roomId: string): Observable<string> {
    return this.http.post(`${environment.backendUrl}/rooms/${roomId}/conceal`, '', {responseType: 'text'});
  }

  public submitCard(roomId: string, card: number): Observable<string> {
    let userId = this.userService.getUser();
    return this.http.put(`${environment.backendUrl}/rooms/${roomId}/users/${userId}`, `${card}`, {responseType: 'text'});
  }

  public reset(roomId: string): Observable<string> {
    return this.http.post(`${environment.backendUrl}/rooms/${roomId}/reset`, '', {responseType: 'text'});
  }
}
