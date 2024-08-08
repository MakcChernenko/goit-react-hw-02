import { useEffect, useState } from "react";
import css from "./App.module.css";
import clsx from "clsx";
import Feedback from "./components/Feedback/Feedback";
import Options from "./components/Options/Options";
import Description from "./components/Description/Description";
import Notification from "./components/Notification/Notification";

function App() {
  // тут логіка зміни і збереження у локальному хранилищі feedback-ка
  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = window.localStorage.getItem("feedback");
    if (savedFeedback !== null) {
      return JSON.parse(savedFeedback);
    } else {
      return {
        good: 0,
        neutral: 0,
        bad: 0,
      };
    }
  });
  const updateFeedback = (feedbackType) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1,
    }));
  };
  useEffect(() => {
    window.localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);
  // тут просто збираю загальну кількість кліків і через useEffect змушую елементи
  // залежні від totalFeedback змінюватися
  const [totalFeedback, setTotalFeedback] = useState(0);
  useEffect(() => {
    setTotalFeedback(feedback.good + feedback.neutral + feedback.bad);
  }, [feedback]);
  // тут вираховую відсоток позитивних відгуків і компонент із prop-ом statistick змінюється
  const [statistick, setStatistick] = useState(0);
  useEffect(() => {
    setStatistick(
      Math.round((feedback.good / (totalFeedback - feedback.neutral)) * 100)
    );
  }, [feedback, totalFeedback]);
  // тут обнуляю feedback, хоча можливо це можна б було зробити через useEffect
  const resetFeedback = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0,
    });
    window.localStorage.setItem("feedback", feedback);
  };

  return (
    <div className={clsx(css.app)}>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        resetFeedback={resetFeedback}
      />
      {totalFeedback !== 0 && (
        <Feedback
          good={feedback.good}
          neutral={feedback.neutral}
          bad={feedback.bad}
          resetFeedback={resetFeedback}
          total={totalFeedback}
          statistick={statistick}
        />
      )}
      {!totalFeedback && <Notification />}
    </div>
  );
}

export default App;
