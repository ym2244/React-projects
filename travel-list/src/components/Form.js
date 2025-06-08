import { useState } from "react";

export default function Form({ onAddItem }) {
  const [count, setCount] = useState(1);
  const [description, setDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!description) {
      // if description is empty, do nothing
      return;
    }

    const newItem = {
      id: Date.now(),
      description,
      quantity: count,
      packed: false,
    };
    // console.log("New item added:", newItem);

    onAddItem(newItem);
    setDescription("");
    setCount(1);
  }

  return (
    // not handleSubmit()
    // same as (event) => handleSubmit(event)
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={count} onChange={(e) => setCount(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
