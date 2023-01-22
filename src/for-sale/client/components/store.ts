import React from 'react';

export type CardId = string;

export interface ICard {
  id: CardId;
  value: number;
  imageUrl: string;
}

export type PlayerId = string;

export enum CoinType {
  gold = 'gold',
  silver = 'silver',
}
export interface IPlayer {
  uid: PlayerId;
  name: string;
  avatarUrl: string;

  banknotes: CardId[];
  houses: CardId[];
  coin: {
    [CoinType.gold]: number;
    [CoinType.silver]: number;
  };
}

export type IPlayerMap = { [key: PlayerId]: IPlayer };

export type ICardMap = { [key: CardId]: ICard };

export enum Phase {
  // 买房子
  buy = 1,
  // 卖房子
  sell = 2,
}

export interface IForSaleStore {
  // 玩家
  playerMap: IPlayerMap;
  playerIds: PlayerId[];

  // 房产牌
  houseMap: ICardMap;
  houseIds: CardId[];

  // 钞票牌
  banknoteMap: ICardMap;
  banknoteIds: CardId[];

  phase: Phase;
  // 当前展示的牌
  displayedCardIds: CardId[];
}

export const ForSaleStore = React.createContext<IForSaleStore>({
  playerMap: {},
  playerIds: [],
  houseMap: {},
  houseIds: [],
  banknoteMap: {},
  banknoteIds: [],
  phase: Phase.buy,
  displayedCardIds: [],
});

export function getCardsByIds(ids: CardId[], cardMap: ICardMap): ICard[] {
  return ids.map((id) => cardMap[id]).filter((card) => !!card);
}

export function getPlayersByIds(ids: PlayerId[], playerMap: IPlayerMap): IPlayer[] {
  return ids.map((id) => playerMap[id]).filter((player) => !!player);
}
