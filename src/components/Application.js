import React, { Component } from "react";
import uniqueId from "lodash/uniqueId";
import CountDown from "./CountDown";
import NewItem from "./NewItem";
import Items from "./Items";

import "./Application.css";

const defaultState = [
  { value: "Pants", id: uniqueId(), packed: false },
  { value: "Jacket", id: uniqueId(), packed: false },
  { value: "iPhone Charger", id: uniqueId(), packed: false },
  { value: "MacBook", id: uniqueId(), packed: false },
  { value: "Sleeping Pills", id: uniqueId(), packed: true },
  { value: "Underwear", id: uniqueId(), packed: false },
  { value: "Hat", id: uniqueId(), packed: false },
  { value: "T-Shirts", id: uniqueId(), packed: false },
  { value: "Belt", id: uniqueId(), packed: false },
  { value: "Passport", id: uniqueId(), packed: true },
  { value: "Sandwich", id: uniqueId(), packed: true }
];

class Application extends Component {
  state = {
    items: defaultState
  };

  // How are we going to manipulate the state?
  // Ideally, users are going to want to add, remove,
  // and check off items, right?

  onItemAdded = value => {
    const item = { value, id: uniqueId(), packed: false };
    this.setState(({ items }) => ({
      items: [...items, item]
    }));
  };
  onRemove = id => {
    this.setState(({ items }) => ({
      items: items.filter(x => x.id !== id)
    }));
  };
  onCheckOff = id => {
    this.setState(state => {
      const { items } = state;
      const itemIndex = items.findIndex(x => x.id === id);
      if (itemIndex > 0) {
        const newItems = [...items];
        const item = newItems[itemIndex];
        newItems.splice(
          itemIndex,
          1,
          Object.assign({}, item, { packed: !item.packed })
        );
        return { items: newItems };
      } else {
        return state;
      }
    });
  };
  render() {
    const { items } = this.state;

    const unpacked = items.filter(x => !x.packed);
    const packed = items.filter(x => x.packed);
    return (
      <div className="Application">
        <NewItem onSubmit={this.onItemAdded} />
        <CountDown />
        <Items
          onCheckOff={this.onCheckOff}
          onRemove={this.onRemove}
          title="Unpacked Items"
          items={unpacked}
        />
        <Items
          onCheckOff={this.onCheckOff}
          onRemove={this.onRemove}
          title="Packed Items"
          items={packed}
        />
        <button className="button full-width">Mark All As Unpacked</button>
      </div>
    );
  }
}

export default Application;
