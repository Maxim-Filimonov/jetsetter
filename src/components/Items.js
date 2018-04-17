import React, { Component } from "react";
import Item from "./Item";
import Filter from "./Filter";

class Items extends Component {
  state = {
    filter: ""
  };

  updateSearchTerm = searchTerm => {
    this.setState({
      filter: searchTerm
    });
  };

  render() {
    const { title, items, onRemove, onCheckOff } = this.props;
    const { filter } = this.state;
    return (
      <section className="Items">
        <h2>
          {title} ({items.length})
        </h2>
        <Filter searchTerm={filter} onChange={this.updateSearchTerm} />
        {items
          .filter(item =>
            item.value.toLowerCase().includes(filter.toLowerCase())
          )
          .map(item => (
            <Item
              key={item.id}
              onCheckOff={() => onCheckOff(item.id)}
              onRemove={() => onRemove(item.id)}
              item={item}
            />
          ))}
      </section>
    );
  }
}

export default Items;
