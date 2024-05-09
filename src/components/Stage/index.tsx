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

const Stage = () => {
  const [words, setWords] = useState<string[]>([
    generateWord(6) || "jahoda",
    generateWord(6) || "hruška",
    generateWord(6) || "jablko",
  ]);
  const [errors, setErrors] = useState<number>(0);

  const errorIncrement = () => setErrors((n) => n + 1);
  const finishWord = () => {
    const newWord = generateWord(6);
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
      <div className="stage__mistakes">Chyb: {errors}</div>
      <div className="stage__words">
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
    </div>
  );
};

export default Stage;
