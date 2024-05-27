import { CoinType, ForSaleStore, PlayerId } from '@/for-sale/client/components/store';
import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';

interface IPlayerProps {
  playerId: PlayerId;
}

const StyledPlayer = styled.div`
  .play-info {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
`;

export const Player: React.FC<IPlayerProps> = (props) => {
  const { playerId } = props;
  const { playerMap } = useContext(ForSaleStore);
  const player = playerMap[playerId];

  return (
    <StyledPlayer>
      <div className="play-info">
        <div
          className="avatar"
          style={{
            backgroundImage: `url(${player.avatarUrl})`,
          }}
        />
        <div className="name">{player.name}</div>
      </div>
      <div className="right coins">
        <div className="gold-coin">gold: {player.coin[CoinType.gold]}</div>
        <div className="silver-coin">sliver: {player.coin[CoinType.silver]}</div>
      </div>
    </StyledPlayer>
  );
};
