import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import { PackingList } from "./PackingList";
import Stats from "./Stats";

const initialItems = [
  { id: 1, description: "Passport", quantity: 1, packed: false },
  { id: 2, description: "Sunglasses", quantity: 1, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItem(newItem) {
    setItems((currentItems) => [...currentItems, newItem]);
  }

  function handleDeleteItem(id) {
    // console.log("Deleting item with id:", id);
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) {
      setItems([]);
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
