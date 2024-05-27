import { ICard, ICardMap, IPlayer, IPlayerMap, CoinType } from '@/for-sale/client/components/store';
import { cardUrls } from '@/for-sale/client/images';

export function getInitPlayer(count: number): IPlayerMap {
  const playerMap: IPlayerMap = {};
  for (let i = 1; i <= count; i++) {
    const uid = `player-${i}`;
    const player: IPlayer = {
      uid,
      name: uid,
      avatarUrl: cardUrls[`player${i}.png`],
      banknotes: [],
      houses: [],
      // 根据人数调整
      coin: {
        [CoinType.gold]: 2,
        [CoinType.silver]: 14,
      },
    };
    playerMap[uid] = player;
  }
  return playerMap;
}

export function getHouseCards(_playerCount: number): ICardMap {
  const cardMap: ICardMap = {};
  const houseCount = 30;
  for (let i = 0; i < houseCount; i++) {
    const cardId = `$house-card-${i}`;
    const urlKey = 'card' + (i <= 8 ? '0' : '') + (i + 1) + '.png';
    const card: ICard = {
      id: cardId,
      value: Math.ceil(i),
      imageUrl: cardUrls[urlKey],
    };
    cardMap[cardId] = card;
  }
  // TODO: 根据玩家人数，随机去除
  return cardMap;
}

export function getBanknoteCards(_playerCount: number): ICardMap {
  const cardMap: ICardMap = {};
  const banknoteCount = 30;
  for (let i = 0; i < banknoteCount; i++) {
    const cardId = `$money-card-${i}`;
    // TODO 银行卡牌背景
    const urlKey = 'card' + (i <= 8 ? '0' : '') + (i + 1) + '.png';
    const card: ICard = {
      id: cardId,
      value: Math.ceil(i),
      imageUrl: cardUrls[urlKey],
    };
    cardMap[cardId] = card;
  }

  // TODO: 根据玩家人数，随机去除
  return cardMap;
}
