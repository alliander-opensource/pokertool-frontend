import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {v4 as uuidv4} from "uuid";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  USER_COOKIE = 'user';

  constructor(private cookies: CookieService) {
  }

  public getUser(): string {
    let userId: string = this.cookies.get(this.USER_COOKIE)

    if (!userId) {
      userId = uuidv4();
      this.cookies.set(this.USER_COOKIE, userId);
    }

    return userId;
  }
}
