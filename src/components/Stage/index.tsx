import { useState } from "react";
import Wordbox from "../Wordbox";
import wordList from "../../word-list";
import "./style.css";

const generateWord = (size: number | undefined) => {
  const sizeIndex =
    size === undefined ? Math.floor(Math.random() * wordList.length) : size - 3;

  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }

  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};

const abeceda = [
  "a",
  "á",
  "b",
  "c",
  "č",
  "d",
  "ď",
  "e",
  "é",
  "ě",
  "f",
  "g",
  "h",
  "i",
  "í",
  "j",
  "k",
  "l",
  "m",
  "n",
  "ň",
  "o",
  "ó",
  "p",
  "q",
  "r",
  "ř",
  "s",
  "š",
  "t",
  "ť",
  "u",
  "ú",
  "ů",
  "v",
  "w",
  "x",
  "y",
  "ý",
  "z",
  "ž",
];

interface errorLetter {
  letter: string;
  errors: number;
}

const Stage = () => {
  const [words, setWords] = useState<string[]>([
    generateWord(6) || "jahoda",
    generateWord(6) || "hruška",
    generateWord(6) || "jablko",
  ]);
  const [errors, setErrors] = useState<errorLetter[]>(
    abeceda.map((l) => ({ letter: l, errors: 0 }))
  );
  const [results, setResults] = useState<number>(0);

  const errorIncrement = (letter: string) => {
    const index = abeceda.indexOf(letter);
    if (index === -1) {
      return;
    }
    setErrors((oldErrors) => [
      ...oldErrors.slice(0, index),
      { letter: oldErrors[index].letter, errors: oldErrors[index].errors + 1 },
      ...oldErrors.slice(index + 1, oldErrors.length),
    ]);
  };
  const errorsCount = errors.reduce((n, letter) => n + letter.errors, 0);
  const finishWord = () => {
    const newWord = generateWord(6);
    setResults(results + 1);
    setWords((oldWords) => {
      if (!oldWords.length) {
        return [];
      }
      return [
        ...oldWords.slice(1, oldWords.length),
        ...(newWord ? [newWord] : []),
      ];
    });
  };

  return (
    <div className="stage">
      <div className="results">
        <h2 className="title title--results">Sklizeň: {results}</h2>
      </div>
      <main className="main container">
        <h1 className="title title--main">Datlování</h1>
        <div className="words">
          {words.map((word, i) => (
            <Wordbox
              word={word}
              key={word}
              isActive={i === 0}
              onError={errorIncrement}
              onFinish={finishWord}
            />
          ))}
        </div>
      </main>
      <div className="mistakes">
        <h2 className="title title--errors">Chyb: {errorsCount}</h2>
        <div className="mistakes__list">
          {[...errors]
            .sort((a, b) => b.errors - a.errors)
            .map((error) => (
              <p key={error.letter}>
                {error.letter}: <span>{error.errors}</span>
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Stage;
