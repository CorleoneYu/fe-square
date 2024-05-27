import { Player } from '@/for-sale/client/components/player/player';
import { ForSaleStore, getPlayersByIds, IPlayer, PlayerId } from '@/for-sale/client/components/store';
import React, { useCallback, useContext, useMemo } from 'react';
import styled from 'styled-components';

interface IOtherPlayersProps {
  otherPlayerIds: PlayerId[];
}

const StyledOtherPlayers = styled.div`
  .player {
    :not(:first-child) {
      margin-top: 40px;
    }
  }

  .left-players {
    position: absolute;
    left: 16px;
    top: 120px;
  }

  .right-players {
    position: absolute;
    right: 16px;
    top: 120px;
  }
`;

export const OtherPlayers: React.FC<IOtherPlayersProps> = (props) => {
  const { otherPlayerIds } = props;
  const { playerMap } = useContext(ForSaleStore);
  const players = useMemo(() => getPlayersByIds(otherPlayerIds, playerMap), [otherPlayerIds, playerMap]);
  const leftCount = useMemo(() => Math.floor(otherPlayerIds.length / 2), [otherPlayerIds.length]);
  const leftPlayers = useMemo(() => players.slice(0, leftCount), [players, leftCount]);
  const rightPlayers = useMemo(() => players.slice(leftCount, players.length), [leftCount, players]);

  return (
    <StyledOtherPlayers>
      <div className="left-players">
        {leftPlayers.map((player) => (
          <div className="player" key={player.uid}>
            <Player playerId={player.uid} />
          </div>
        ))}
      </div>
      <div className="right-players">
        {rightPlayers.map((player) => (
          <div className="player" key={player.uid}>
            <Player playerId={player.uid} />
          </div>
        ))}
      </div>
    </StyledOtherPlayers>
  );
};
