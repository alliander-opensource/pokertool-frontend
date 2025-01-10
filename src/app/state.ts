export interface State {
  cards: CardState[],
  host: boolean,
  revealed: boolean,
}

export interface CardState {
  userId: string;
  value: number | null ;
}
