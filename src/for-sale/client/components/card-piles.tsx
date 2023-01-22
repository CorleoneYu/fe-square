import React, { useMemo } from 'react';
import styled from 'styled-components';
import houseUrl from '@/for-sale/client/images/house_back.png';
import banknote from '@/for-sale/client/images/money_back.png';
import { Card } from '@/for-sale/client/components/card';

interface ICardPilesProps {}

const StyledCardPiles = styled.div`
  display: flex;
  justify-content: center;

  .card-pile {
    margin-right: 80px;
  }
`;

export const CardPiles: React.FC<ICardPilesProps> = () => {
  return (
    <StyledCardPiles>
      <div className="card-pile">
        {/* 房产牌堆 */}
        {30}
        <Card className="card" size="small" imageUrl={houseUrl} />
      </div>
      <div className="card-pile">
        {/* 钞票牌堆 */}
        {30}
        <Card className="card" size="small" imageUrl={banknote} />
      </div>
    </StyledCardPiles>
  );
};
