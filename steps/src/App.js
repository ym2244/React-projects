import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step > 1) {
      // don't change step manually like step = step - 1, because react is all about immutability and functional state updates.
      // react don't really mutate the old state, but created a new one, so react can diff the old and new state, so that it can and only update the parts that changed to optimize performance.
      // so, always tell react when and how you want to change the state by calling the state setter function, and react will take care of the rest behind the scenes, like re-render
      // on developer side, always treat state as immutable, and never mutate it directly.
      setStep((s) => s - 1);
    }
  }

  function handleNext() {
    if (step < messages.length) {
      // if the state is changed base on the curr state, we should use a callback function to get the current state, so that we can always get the latest state. Wait for the previous state to finish updating before updating the next state.
      setStep((s) => s + 1);
    }
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
