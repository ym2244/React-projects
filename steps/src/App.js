import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <div>
      <Steps />
      <StepMessage step={1}>
        <span>pass in content</span>
      </StepMessage>
      <StepMessage step={2}>
        <span>pass in content</span>
      </StepMessage>
    </div>
  );
}

function Steps() {
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

          <StepMessage step={step}>
            <span>{messages[step - 1]}</span>
          </StepMessage>

          <div className="buttons">
            {/* content between opening and closing tags of the component are passed as children prop -- this allows as to pass JSX into children components */}
            <Button textcolor="#fff" bgcolor="#7950f2" onClick={handlePrevious}>
              <span>◀️Previous</span>
            </Button>
            <Button textcolor="#fff" bgcolor="#7950f2" onClick={handleNext}>
              <span>Next▶️</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>Step {step}</h3>
      {children}
    </div>
  );
}

function Button({ textcolor, bgcolor, onClick, children }) {
  // children is a special prop keyword
  return (
    <button
      style={{ backgroundColor: bgcolor, color: textcolor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
