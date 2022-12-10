import { useEffect, useState } from "react";
import "./App.css";

const getRandomColor = () => {
  const digits = [
    ...[...Array(10)].map((_, i) => `${i}`),
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  const color = [...Array(6)]
    .map(() => digits[Math.floor(Math.random() * digits.length)])
    .join("");

  return `#${color}`;
};

enum Result {
  Correct,
  Wrong,
}

function App() {
  const [color, setColor] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<Result | undefined>(undefined);

  const generateColors = () => {
    const actualColor = getRandomColor();
    setColor(actualColor);
    setAnswers(
      [actualColor, getRandomColor(), getRandomColor()].sort(
        () => Math.random() - 0.5
      )
    );
  };

  useEffect(() => {
    generateColors();
  }, []);

  const handleAnswerClicked = (answer: string) => () => {
    if (answer === color) {
      setResult(Result.Correct);
      generateColors();
    } else {
      setResult(Result.Wrong);
    }
  };

  return (
    <div className="App">
      <div className="col">
        <div className="guess-me" style={{ background: color }}></div>

        {answers.map((answer) => (
          <button key={answer}>{answer}</button>
        ))}

        {result === Result.Correct && <div className="correct">Correct!</div>}
        {result === Result.Wrong && <div className="wrong">Wrong Answer</div>}
      </div>
    </div>
  );
}

export default App;
