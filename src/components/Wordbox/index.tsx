import { useState } from 'react';
import './style.css';

export interface WordboxProps {
  word: string;
}

export const Wordbox: React.FC<WordboxProps> = ({ word }) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);  
  
  return (
    <div className="wordbox">{lettersLeft}</div>
  );
};

export default Wordbox;
