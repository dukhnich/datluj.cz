import { useState } from "react";
import Wordbox from "../Wordbox";
import wordList from "../../word-list";
import "./style.css";

const levelsCount = wordList.length;
const minLength = wordList[0][0].length;
const wordsInLevel = 3;

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
  const [level, setLevel] = useState(0);
  const [levelProgress, setLevelProgress] = useState(0);
  const [words, setWords] = useState<string[]>([
    generateWord(level + minLength) || "jahoda",
    generateWord(level + minLength) || "hruška",
    generateWord(level + minLength) || "jablko",
  ]);
  const [errors, setErrors] = useState<errorLetter[]>(
    abeceda.map((l) => ({ letter: l, errors: 0 }))
  );
  const [results, setResults] = useState<string[]>([]);

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
  const filteredErrors = errors
    .filter((l) => Boolean(l.errors))
    .sort((a, b) => b.errors - a.errors);
  const errorsCount = filteredErrors.reduce(
    (n, letter) => n + letter.errors,
    0
  );
  const finishWord = () => {
    let length = level === levelsCount ? undefined : level + minLength;
    if (length && levelProgress + words.length >= wordsInLevel) {
      length += 1;
    }
    const newWord = generateWord(length);
    if (words.length) {
      setResults((r) => [...r, words[0]]);
      if (levelProgress + 1 < wordsInLevel) {
        setLevelProgress((oldN) => oldN + 1);
      } else if (level < levelsCount) {
        setLevel((oldN) => oldN + 1);
        setLevelProgress(0);
      }
    }
    setWords((oldWords) => {
      if (!oldWords.length) {
        return newWord ? [newWord] : [];
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
        <h2 className="title title--results">Sklizeň: {results.length}</h2>
        <div className="mistakes__list">
          {results.map((r) => (
            <p key={r}>{r}</p>
          ))}
        </div>
      </div>
      <main className="main container">
        <header className="header">
          <h1 className="title title--main">Datlování</h1>
          <p className="level">
            Úroveň {level + 1}
            <span className="level__progress">
              {levelProgress} / {wordsInLevel}
            </span>
          </p>
        </header>
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
          {filteredErrors.map((error) => (
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
