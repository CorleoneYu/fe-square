import { Player } from '@/for-sale/client/components/player/player';
import { CoinType, ForSaleStore, PlayerId } from '@/for-sale/client/components/store';
import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';

interface ICurrentPlayerProps {
  currentPlayerId: PlayerId;
}

const StyledCurrentPlayer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .left {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .right {
    .coins {
      display: flex;
      align-items: center;

      .coin {
        margin-right: 10px;
      }
    }
  }
`;

export const CurrentPlayer: React.FC<ICurrentPlayerProps> = (props) => {
  const { currentPlayerId } = props;
  const { playerMap } = useContext(ForSaleStore);
  const currentPlayer = useMemo(() => playerMap[currentPlayerId], [playerMap, currentPlayerId]);

  return (
    <StyledCurrentPlayer>
      <div className="left">
        <Player playerId={currentPlayerId} />
      </div>
      <div className="right">
        <div className="coins">
          <div className="gold-coin">{currentPlayer.coin[CoinType.gold]}</div>
          <div className="silver-coin">{currentPlayer.coin[CoinType.silver]}</div>
        </div>
        <div className="horses"></div>
      </div>
    </StyledCurrentPlayer>
  );
};
