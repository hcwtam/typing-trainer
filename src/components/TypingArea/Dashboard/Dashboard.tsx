import React, { ReactElement } from 'react';

import styled from 'styled-components';
import Gauge from './Gauge/Gauge';
import Stat from './Stat/Stat';
import Timer from './Timer/Timer';

interface Props {}

type WrapperProps = {
  width?: string;
  height?: string;
  padding?: string;
};

const Board = styled.div`
  width: 800px;
  height: 200px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  width: ${(props: WrapperProps) => (props.width ? props.width : 'auto')};
  height: ${(props: WrapperProps) => (props.height ? props.height : '200px')};
  padding: ${(props: WrapperProps) =>
    props.padding ? props.padding : '8px 15px'};
  margin-bottom: 20px;
  border-radius: 20px;
  box-shadow: 10px 10px 20px #292e47, -5px -5px 20px #505884;
`;

export default function Dashboard({}: Props): ReactElement {
  return (
    <Board>
      <Wrapper width="150px">
        <Timer />
      </Wrapper>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: 280,
          justifyContent: 'space-between'
        }}
      >
        <Wrapper width="130px" height="90px">
          <Stat title="Accuracy" stat="100" other="%" />
        </Wrapper>
        <Wrapper width="130px" height="90px">
          <Stat title="CPM" stat="247" />
        </Wrapper>
        <Wrapper width="130px" height="90px">
          <Stat title="Count" stat="10" />
        </Wrapper>
        <Wrapper width="130px" height="90px">
          <Stat title="Errors" stat="0" other="/368" />
        </Wrapper>
      </div>

      <Wrapper width="320px" padding="30px">
        <Gauge />
      </Wrapper>
    </Board>
  );
}
