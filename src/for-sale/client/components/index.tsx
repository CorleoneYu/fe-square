import { CardPiles } from '@/for-sale/client/components/card-piles';
import { DisplayedCards } from '@/for-sale/client/components/displayed-cards';
import { getBanknoteCards, getHouseCards, getInitPlayer } from '@/for-sale/client/components/init';
import { OtherPlayers } from '@/for-sale/client/components/player/other-players';
import { Player } from '@/for-sale/client/components/player/player';
import { CardId, ForSaleStore, ICardMap, IPlayerMap, Phase } from '@/for-sale/client/components/store';
import { sampleMultiple } from '@/for-sale/client/util/sample';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';

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

    .current-player {
      position: absolute;
      left: 45%;
    }
  }
`;

const playerCount = 4;

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export const ForSale: React.FC = () => {
  // 玩家牌
  const [playerMap, setPlayerMap] = useState<IPlayerMap>(() => getInitPlayer(playerCount));
  const playerIds = Object.keys(playerMap);
  const currentPlayerId = playerIds[0];
  const otherPlayerIds = playerIds.filter((id) => id !== currentPlayerId);
  // 当前行动玩家
  const [actionPlayerId, setActionPlayerId] = useState(currentPlayerId);

  // 房屋牌
  const [houseMap, setHouseMap] = useState<ICardMap>(() => getHouseCards(playerCount));
  const houseIds = Object.keys(houseMap);
  const [displayedCardIds] = useState<CardId[]>(() => sampleMultiple(houseIds, playerCount));

  // 银行牌
  const [banknoteMap, setBanknoteMap] = useState<ICardMap>(() => getBanknoteCards(playerCount));
  const [banknoteIds, setBanknotes] = useState<CardId[]>(() => Object.keys(banknoteMap));

  // 阶段
  const [phase] = useState<Phase>(Phase.buy);

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
          <div className="current-player">
            <Player playerId={currentPlayerId} />
          </div>
        </div>
        {/* 其他玩家 绝对定位 */}
        <OtherPlayers otherPlayerIds={otherPlayerIds} />
        <Dialog open={true} hideBackdrop={true} PaperComponent={PaperComponent}>
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            游戏控制器
          </DialogTitle>
          <DialogContent dividers={true}>
            <div>
              <span>阶段控制</span>
            </div>
            <div>
              <span>当前行动玩家: {actionPlayerId}</span>
              <span>当前行动</span>
            </div>
          </DialogContent>
        </Dialog>
      </StyledForSale>
    </ForSaleStore.Provider>
  );
};
