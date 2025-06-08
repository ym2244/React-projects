import React from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 1, packed: false },
];

export default function App() {
  const [items, setItems] = React.useState(initialItems);

  function handleAddItem(newItem) {
    setItems((currentItems) => [...currentItems, newItem]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList items={items} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>💖 Far Away 🏞️</h1>;
}

function Form({ onAddItem }) {
  const [count, setCount] = React.useState(1);
  const [description, setDescription] = React.useState("");

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

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have 0 items on your list, and you already packed 0 (0%).</em>
    </footer>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}
