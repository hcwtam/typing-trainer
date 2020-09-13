import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface Props {}

const Meter = styled.div`
  width: 250px;
  font-size: 3.5rem;
  font-weight: 600;
  margin: 5px auto 0;
`;

const Body = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 50%;
  background: #c5d1cf;
  position: relative;
  border-top-left-radius: 100% 200%;
  border-top-right-radius: 100% 200%;
  overflow: hidden;
`;

const Fill = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: inherit;
  height: 100%;
  background: #61dafb;
  transform-origin: center top;
  transform: rotate(150deg);
  transition: transform 0.2s ease-out;
`;

const Cover = styled.div`
  width: 85%;
  height: 170%;
  background: #393e5e;
  border-radius: 50%;
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 35%;
  box-sizing: border-box;
`;

export default function Gauge({}: Props): ReactElement {
  return (
    <Meter>
      <Body>
        <Fill />
        <Cover>
          10
          <span style={{ marginLeft: 3 }}>
            {' '}
            <h6>WPM</h6>
          </span>
        </Cover>
      </Body>
    </Meter>
  );
}
