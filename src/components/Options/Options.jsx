import css from "./Options.module.css";
import clsx from "clsx";

const Options = ({ updateFeedback }) => {
  return (
    <ul className={clsx(css, css.buttonList)}>
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
    </ul>
  );
};

export default Options;
