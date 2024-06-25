import {User} from "./user";

export interface Room {
  roomId: string,
  revealed: boolean,
  hostUserId: string,
  users: User[],
}
