import { useEffect, useState } from "react";
import css from "./App.module.css";
import clsx from "clsx";
import Feedback from "./components/Feedback/Feedback";
import Options from "./components/Options/Options";
import Description from "./components/Description/Description";
import Notification from "./components/Notification/Notification";

// ===============Велике дякую тому хто це перевіряв!====
// ======================================================
function App() {
  // коректне повернення фідбека, всі залежні елементи будуть змінюватися відповідно.
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
  // логіка реакції на зміну фідбека, думаю в один useEffect можна більше одного ефекту прописати
  useEffect(() => {
    window.localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);
  // функція зміни стану при кліці, або іншій події
  const updateFeedback = (feedbackType) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1,
    }));
  };
  // просто дані у змінних для використання у дочірніх компонентах
  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100);
  // просто обнуляю фідбек а верхній useEffect обновить локальний сховок.
  const resetFeedback = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  return (
    <div className={clsx(css.app)}>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        resetFeedback={resetFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          good={feedback.good}
          neutral={feedback.neutral}
          bad={feedback.bad}
          resetFeedback={resetFeedback}
          total={totalFeedback}
          statistick={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}

export default App;
