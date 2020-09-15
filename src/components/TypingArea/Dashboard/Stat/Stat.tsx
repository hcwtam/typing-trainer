import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  stat: string | number;
  other?: string;
}

const Display = styled.div`
  margin: 8px auto;
  text-align: center;
  font-size: 32px;
  font-weight: 600;
`;

const Unit = styled.span`
  margin-left: 3px;
  color: #797c8d;
  font-size: 14px;
`;

export default function Stat({ title, stat, other }: Props): ReactElement {
  return (
    <>
      <h6>{title}</h6>
      <Display>
        {stat}
        {other ? <Unit>{other}</Unit> : null}
      </Display>
    </>
  );
}
