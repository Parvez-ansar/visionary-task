import React, { useEffect, useRef, useState } from "react";

const Answer = ({ message = "", shouldType = true, onMessageRendered }) => {
  const [typedMessage, setTypedMessage] = useState(message);
  const typedOnceRef = useRef("");

  useEffect(() => {
    let currentIndex = 0;

    const timer = setInterval(() => {
      currentIndex += 1;
      setTypedMessage(message.slice(0, currentIndex));

      if (currentIndex >= message.length) {
        clearInterval(timer);

        typedOnceRef.current = message;
        onMessageRendered();
      }
    }, 25);

    return () => {
      clearInterval(timer);
    };
  }, [message, shouldType, onMessageRendered]);

  const visibleMessage = shouldType ? typedMessage : message;

  return <div className="answer">{visibleMessage}</div>;
};

export default Answer;
