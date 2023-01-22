import React from 'react';
import styled from 'styled-components';

interface ICardProps {
  size: 'small' | 'normal';
  text?: string | number;
  imageUrl?: string;
  className?: string;
  style?: React.CSSProperties;
}

const StyledCard = styled.div`
  border-radius: 5px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Card: React.FC<ICardProps> = (props) => {
  const { size, style, imageUrl, text, className } = props;
  return (
    <StyledCard
      className={className}
      style={{
        width: size === 'small' ? '60px' : '80px',
        height: size === 'small' ? '75px' : '120px',
        backgroundImage: `url(${imageUrl})`,
        ...style,
      }}
    >
      {text}
    </StyledCard>
  );
};
