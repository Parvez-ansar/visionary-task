import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Answer from "./Answer";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(messages);
  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:3000/questions");
      console.log(response.data, "response");
      setQuestions(response.data);
    })();
  }, []);
  const handleMessageRendered = useCallback(() => {
    setLoading(false);
  }, []);

  console.log(loading, "loading");

  return (
    <div className="wrapper">
      <div className="chat-wrapper">
        {messages.map((message, index) => {
          const isLatest = index === messages.length - 1;
          return (
            <div key={`${message.id}-${index}`}>
              <div className="question">{message.question}</div>
              <Answer
                message={message.answer}
                shouldType={isLatest}
                onMessageRendered={isLatest ? handleMessageRendered : undefined}
              />
            </div>
          );
        })}
      </div>
      <div className="question-options">
        <select
          disabled={loading}
          onChange={(e) => {
            setLoading(true);
            setMessages((prevMessages) => [
              ...prevMessages,
              questions.find(
                (question) => question.id == parseInt(e.target.value),
              ),
            ]);
          }}>
          {questions.map((question) => (
            <option
              key={question.id}
              value={question.id}
              className="question-option">
              {question.question}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default App;
