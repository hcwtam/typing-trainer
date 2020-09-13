import React, { ReactElement } from 'react';

interface Props {
  title: string;
  stat: string;
  other?: string;
}

export default function Stat({ title, stat, other }: Props): ReactElement {
  return (
    <>
      <h6>{title}</h6>
      <div
        style={{
          margin: '8px auto',
          textAlign: 'center',
          fontSize: 32,
          fontWeight: 600
        }}
      >
        {stat}
        {other ? (
          <span style={{ marginLeft: 3, color: '#797c8d', fontSize: 14 }}>
            {other}
          </span>
        ) : null}
      </div>
    </>
  );
}
