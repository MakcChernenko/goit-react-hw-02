import css from "./Options.module.css";
import clsx from "clsx";

const Options = ({ updateFeedback, totalFeedback, resetFeedback }) => {
  return (
    <ul className={clsx(css.buttonList)}>
      <li>
        <button type="button" onClick={() => updateFeedback("good")}>
          good
        </button>
      </li>
      <li>
        <button type="button" onClick={() => updateFeedback("neutral")}>
          neutral
        </button>
      </li>
      <li>
        <button type="button" onClick={() => updateFeedback("bad")}>
          bad
        </button>
      </li>
      <li>
        {totalFeedback !== 0 && (
          <button type="button" onClick={resetFeedback}>
            reset
          </button>
        )}
      </li>
    </ul>
  );
};

export default Options;
