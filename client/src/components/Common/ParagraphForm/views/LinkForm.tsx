import { cx, css } from "@emotion/css";
import React from "react";
import { useParagraphForm } from "../../../../contexts/ParagraphForm";
import TextField from "../../TextField";

interface ILinkForm {
  active: boolean;
  handleSubmit: (value: string) => void;
}

const LinkForm: React.FC<ILinkForm> = ({ active, handleSubmit }) => {
  const { savedSelection } = useParagraphForm();

  const ref = React.useRef<HTMLDivElement | null>(null);

  const [formValue, setFormValue] = React.useState("");

  React.useEffect(() => {
    const el = ref.current;

    if (!el) return;

    if (!active) {
      el.removeAttribute("style");
      return;
    }

    console.log("savedSelection", savedSelection);

    const domSelection = window.getSelection();
    if (domSelection || savedSelection?.domRange) {
      let range = domSelection?.getRangeAt(0);
      if (savedSelection?.domRange) range = savedSelection.domRange;
      if (range) {
        const rect = range.getBoundingClientRect();
        el.style.opacity = "1";
        el.style.top = `${
          rect.bottom + window.pageYOffset - el.offsetHeight
        }px`;
        el.style.left = `${
          rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
        }px`;
      } else console.warn("Unable to find range");
    }
  });

  return (
    <div
      ref={ref}
      className={cx(
        css`
          padding: 8px 7px 6px;
          position: absolute;
          z-index: 1;
          top: -10000px;
          left: -10000px;
          margin-top: -6px;
          opacity: 0;
          background-color: #222;
          border-radius: 4px;
          transition: opacity 0.76s;
          width: 10vw;
          & > * {
            display: inline-block;
          }
          & > * + * {
            margin-left: 15px;
          }
        `
      )}
    >
      <form
        id="link-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formValue);
        }}
      >
        <TextField
          onChange={(e) => setFormValue(e.target.value)}
          value={formValue}
          color="white"
        />
      </form>
    </div>
  );
};

export default LinkForm;
