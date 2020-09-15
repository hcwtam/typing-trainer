import React, { ReactElement, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';

interface Props {
  disabled: boolean;
  setStarted: () => void;
  setSessionData: (data: {
    total: number;
    mistakes: number;
    index: number;
  }) => void;
}

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

export default function TypingArea({
  disabled,
  setStarted,
  setSessionData
}: Props): ReactElement {
  const [input, setInput] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [quotes, setquotes] = useState<Data[] | null>(null);
  const [shouldFetch, setShouldFetch] = useState<Boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [accCount, setAccCount] = useState<number>(0);
  const [mistakesArray, setMistakesArray] = useState<boolean[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, error } = useSWR(
    shouldFetch ? 'https://type.fit/api/quotes' : null,
    fetcher
  );

  // initialise quotes
  useEffect(() => {
    if (data) {
      const shuffleData = [...data];
      shuffleArray(shuffleData);
      setquotes(shuffleData);
      setShouldFetch(false);
    }
  }, [input, index, data]);

  // Initialise states for checks
  useEffect(() => {
    if (accCount === 0 && quotes) setAccCount(quotes[0].text.length);
    if (!mistakesArray.length && quotes) {
      setMistakesArray(quotes[0].text.split('').map((_) => true));
    }
  }, [accCount, quotes, mistakesArray]);

  // Reach end of quote and proceed to next quote
  useEffect(() => {
    if (quotes) {
      if (quotes[index].text === input && index < quotes.length - 1) {
        const newIndex = index + 1;
        setIndex(newIndex);
        setInput('');
        setSessionData({ total, mistakes, index: newIndex });
        setAccCount((prev) => prev + quotes[newIndex].text.length);
        setMistakesArray(quotes[newIndex].text.split('').map((_) => true));
      }
    }
  }, [input, total, index, quotes, mistakes, setSessionData]);

  if (error) return <Wrapper>An error has occurred:{error.message}</Wrapper>;
  if (!quotes) return <Wrapper>Loading...</Wrapper>;

  const inputHandler = (value: string) => {
    setInput(value);
    if (input.length === 0 && index === 0) setStarted();
    const newTotal = updateTotal(value);
    const newMistakes = checkMistake(value);
    setSessionData({ total: newTotal, mistakes: newMistakes, index });
  };

  const updateTotal = (value: string) => {
    let newTotal = total;
    if (accCount > total && value.length <= quotes[index].text.length) {
      newTotal = accCount - quotes[index].text.length + value.length;
      if (newTotal > total) {
        setTotal(newTotal);
        return newTotal;
      }
    }
    return total;
  };

  const checkMistake = (value: string) => {
    const last = value.length - 1;
    const mismatch =
      mistakesArray[last] && value[last] !== quotes[index].text[last];
    let newMistakes = mistakes;
    if (mismatch) {
      newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      const newMistakesArray = mistakesArray;
      newMistakesArray[last] = false;
      setMistakesArray(newMistakesArray);
    }
    return newMistakes;
  };

  const colorizeLetter = (el: string, i: number): { color?: string } => {
    let styles = {};
    if (input.length > i) {
      el === input[i]
        ? (styles = { color: '#61dafb' })
        : (styles = { color: '#fb6961' });
    }
    return styles;
  };

  const focusInput = () => {
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
  };

  let currentQuote: JSX.Element[] | null = null;
  let nextQuote: JSX.Element | null = null;

  if (quotes) {
    currentQuote = quotes[index].text
      .split('')
      .map((letter: string, i: number) => (
        <span style={colorizeLetter(letter, i)} key={i}>
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
        type="text"
        disabled={disabled}
        placeholder="Type the sentence above"
        onChange={(e) => inputHandler(e.target.value)}
        value={input}
        autoFocus
        onBlur={focusInput}
        ref={inputRef}
      />
      {nextQuote}
    </Wrapper>
  );
}
