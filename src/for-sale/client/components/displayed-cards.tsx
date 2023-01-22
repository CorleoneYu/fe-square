import { Card } from '@/for-sale/client/components/card';
import { ForSaleStore, getCardsByIds, Phase } from '@/for-sale/client/components/store';
import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';

const StyledDisplayedCards = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .list {
    display: flex;
    flex-direction: row;

    .card {
      margin-right: 5px;
    }
  }
`;

export const DisplayedCards: React.FC = (_props) => {
  const { displayedCardIds, phase, houseMap, banknoteMap } = useContext(ForSaleStore);
  const displayedCards = useMemo(() => {
    const cardMap = phase === Phase.buy ? houseMap : banknoteMap;
    const cards = getCardsByIds(displayedCardIds, cardMap);
    return cards;
  }, []);

  return (
    <StyledDisplayedCards>
      <div className="list">
        {displayedCards.map((card) => (
          <Card className="card" size="normal" key={card.id} imageUrl={card.imageUrl} />
        ))}
      </div>
    </StyledDisplayedCards>
  );
};
