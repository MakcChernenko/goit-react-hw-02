const Feedback = ({ good, neutral, bad, total }) => {
  return (
    <ul>
      <li>good: {good}</li>
      <li>neutral: {neutral}</li>
      <li>bad: {bad}</li>
      <li>total: {total}</li>
      <li>positive: {Math.round((good / (total - neutral)) * 100)} %</li>
    </ul>
  );
};

export default Feedback;
