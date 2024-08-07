const Feedback = ({ good, neutral, bad, total, statistick }) => {
  return (
    <ul>
      <li>good: {good}</li>
      <li>neutral: {neutral}</li>
      <li>bad: {bad}</li>
      <li>total: {total}</li>
      <li>positive: {statistick} %</li>
    </ul>
  );
};

export default Feedback;
