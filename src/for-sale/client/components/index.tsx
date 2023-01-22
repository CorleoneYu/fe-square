import { CardPiles } from '@/for-sale/client/components/card-piles';
import { DisplayedCards } from '@/for-sale/client/components/displayed-cards';
import { getBanknoteCards, getHouseCards, getInitPlayer } from '@/for-sale/client/components/init';
import { CurrentPlayer } from '@/for-sale/client/components/player/current-player';
import { OtherPlayers } from '@/for-sale/client/components/player/other-players';
import {
  CardId,
  ForSaleStore,
  ICardMap,
  IPlayer,
  IPlayerMap,
  Phase,
  PlayerId,
} from '@/for-sale/client/components/store';
import { sampleMultiple } from '@/for-sale/client/util/sample';
import React, { useState } from 'react';
import styled from 'styled-components';

const StyledForSale = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .header {
    height: 30vh;
  }

  .body {
    position: relative;
    height: 40vh;
  }

  .footer {
    height: 30vh;
  }
`;

const playerCount = 4;

export const ForSale: React.FC = () => {
  const [playerMap, setPlayerMap] = useState<IPlayerMap>(() => getInitPlayer(playerCount));
  const [playerIds, setPlayers] = useState<PlayerId[]>(() => Object.keys(playerMap));

  const [houseMap, setHouseMap] = useState<ICardMap>(() => getHouseCards(playerCount));
  const [houseIds, setHouses] = useState<CardId[]>(() => Object.keys(houseMap));

  const [banknoteMap, setBanknoteMap] = useState<ICardMap>(() => getBanknoteCards(playerCount));
  const [banknoteIds, setBanknotes] = useState<CardId[]>(() => Object.keys(banknoteMap));

  const [phase, setPhase] = useState<Phase>(Phase.buy);
  const [displayedCardIds] = useState<CardId[]>(() => sampleMultiple(houseIds, playerCount));

  const [currentPlayerId] = useState<PlayerId>(() => playerIds[0]);
  const [otherPlayerIds] = useState<PlayerId[]>(() => playerIds.filter((id) => id !== currentPlayerId));

  return (
    <ForSaleStore.Provider
      value={{
        playerMap,
        playerIds,
        banknoteMap,
        banknoteIds,
        houseMap,
        houseIds,
        phase,
        displayedCardIds,
      }}
    >
      <StyledForSale>
        <div className="header">
          {/* 牌堆 */}
          <CardPiles />
        </div>
        <div className="body">
          {/* 中间展示的牌 */}
          <DisplayedCards />
        </div>
        <div className="footer">
          {/* 当前玩家 */}
          <CurrentPlayer currentPlayerId={currentPlayerId} />
        </div>
        {/* 其他玩家 绝对定位 */}
        <OtherPlayers otherPlayerIds={otherPlayerIds} />
      </StyledForSale>
    </ForSaleStore.Provider>
  );
};
