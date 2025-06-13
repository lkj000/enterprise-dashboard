import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText(''); // Clear the displayed text when the text prop changes
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index === text.length-1) {
        clearInterval(interval);
      }
    }, speed);

    return () => {
      clearInterval(interval);
      return undefined;
    };
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

export default TypingEffect;