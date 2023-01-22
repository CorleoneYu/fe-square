import { CoinType } from '@/for-sale/client/components/store';
import React from 'react';
import styled from 'styled-components';

interface ICoinProps {
  type: CoinType;
}

const StyledCoin = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const Coin: React.FC<ICoinProps> = (props) => {
  const { type } = props;
  return (
    <StyledCoin
      className="coin"
      style={{
        backgroundColor: type === CoinType.gold ? 'gold' : 'silver',
      }}
    />
  );
};
