import { ForSaleStore, PlayerId } from '@/for-sale/client/components/store';
import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';

interface IPlayerProps {
  playerId: PlayerId;
}

const StyledPlayer = styled.div`
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

export const Player: React.FC<IPlayerProps> = (props) => {
  const { playerId } = props;
  const { playerMap } = useContext(ForSaleStore);
  const player = useMemo(() => playerMap[playerId], [playerId, playerMap]);

  return (
    <StyledPlayer>
      <div
        className="avatar"
        style={{
          backgroundImage: `url(${player.avatarUrl})`,
        }}
      />
      <div className="name">{player.name}</div>
    </StyledPlayer>
  );
};
