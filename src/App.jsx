import { useEffect, useState } from "react";
import css from "./App.module.css";
import clsx from "clsx";
import Feedback from "./components/Feedback/Feedback";
import Options from "./components/Options/Options";
import Description from "./components/Description/Description";
import Notification from "./components/Notification/Notification";

function App() {
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
  const [statistick, setStatistick] = useState(0);
  useEffect(() => {
    setStatistick(
      Math.round((feedback.good / (feedback.good + feedback.bad)) * 100)
    );
  }, [statistick, feedback]);
  const resetFeedback = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0,
    });
    window.localStorage.removeItem("feedback");
  };

  const updateFeedback = (feedbackType) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1,
    }));
  };

  useEffect(() => {
    window.localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);
  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

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
      {totalFeedback === 0 && <Notification />}
    </div>
  );
}

export default App;
