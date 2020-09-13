import React, { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';

interface Props {}

interface Data {
  text: string;
  author: string;
}

const Wrapper = styled.div`
  width: 800px;
  height: 280px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 10px 10px 20px #292e47, -5px -5px 20px #505884;
`;
const Input = styled.input`
  width: 100%;
  background: none;
  border: none;
  border-bottom: #61dafb 5px solid;
  caret-color: #bdf1ff;
  color: rgba(255, 255, 255, 0.8);
  font-size: 20px;
  font-family: inherit;
  font-weight: normal;
  margin: 5px auto 30px;
  padding: 5px 0;
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
    font-size: 20px;
  }
  &:focus {
    outline: none;
  }
`;

const NextQuote = styled.div`
  color: rgba(255, 255, 255, 0.3);
  font-size: 19px;
  span {
    padding-right: 20px;
    font-weight: bold;
  }
`;

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function shuffleArray(array: Data[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export default function TypingArea({}: Props): ReactElement {
  const [input, setInput] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [quotes, setquotes] = useState<Data[] | null>(null);
  const [shouldFetch, setShouldFetch] = useState<Boolean>(true);

  const { data, error } = useSWR(
    shouldFetch ? 'https://type.fit/api/quotes' : null,
    fetcher
  );

  useEffect(() => {
    if (data) {
      const shuffleData = [...data];
      shuffleArray(shuffleData);
      setquotes(shuffleData);
      setShouldFetch(false);
    }
  }, [input, index, data]);

  useEffect(() => {
    if (quotes) {
      if (quotes[index].text === input && index < quotes.length - 1) {
        setIndex(index + 1);
        setInput('');
      }
    }
  }, [input, index, quotes]);

  if (error) return <Wrapper>An error has occurred:{error.message}</Wrapper>;
  if (!quotes) return <Wrapper>Loading...</Wrapper>;

  const letterCheck = (el: string, i: number): { color?: string } => {
    let styles = {};
    if (input.length > i) {
      el === input[i]
        ? (styles = { color: '#61dafb' })
        : (styles = { color: '#fb6961' });
    }
    return styles;
  };

  let currentQuote: JSX.Element[] | null = null;
  let nextQuote: JSX.Element | null = null;

  if (quotes) {
    currentQuote = quotes[index].text
      .split('')
      .map((letter: string, i: number) => (
        <span style={letterCheck(letter, i)} key={i}>
          {letter}
        </span>
      ));

    nextQuote =
      index < quotes.length - 1 ? (
        <NextQuote>
          <span>NEXT</span>
          {quotes[index + 1].text}
        </NextQuote>
      ) : (
        <NextQuote>
          <span>END</span>
        </NextQuote>
      );
  }

  return (
    <Wrapper>
      <div>{currentQuote}</div>
      <Input
        placeholder="Type the sentence above"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        autoFocus
      />
      {nextQuote}
    </Wrapper>
  );
}
