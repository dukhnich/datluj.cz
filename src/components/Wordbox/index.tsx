import { useState, useEffect } from "react";
import "./style.css";

export interface WordboxProps {
  word: string;
  isActive?: boolean;
  onError?: (letter: string) => void;
  onFinish?: () => void;
}

export const Wordbox: React.FC<WordboxProps> = ({
  word,
  isActive,
  onError,
  onFinish,
}) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);
  const [isError, setIsError] = useState<boolean>(false);
  useEffect(() => {
    if (!(isActive && lettersLeft.length)) {
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCorrect = e.key.toLowerCase() === lettersLeft[0].toLowerCase();
      if (isCorrect) {
        if (lettersLeft.length === 1 && onFinish) {
          onFinish();
          return;
        }
        setLettersLeft(lettersLeft.slice(1, lettersLeft.length));
      } else if (onError) {
        onError(e.key.toLowerCase());
      }
      setIsError(!isCorrect);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lettersLeft, isActive]);

  return (
    <div
      className={`wordbox${isError ? " wordbox--mistake" : ""}${
        isActive ? " wordbox--active" : ""
      }`}
    >
      {lettersLeft}
    </div>
  );
};

export default Wordbox;
