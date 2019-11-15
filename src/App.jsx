import React from "react";
import Item from "./components/Item.jsx";
import Footer from "./components/Footer.jsx";
import Navigation from "./components/Navigation.jsx";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: 1, // 1: sort in descending order, 0: sort in descending order
      search: "", // serarch value in search bar
      totalBill: 0, // total amount of all selected items
      items: {}, // dictionary of items key is ites index and store of every items
      description: "",
      itemsCpy: []
    };
    this.priceCalculator = this.priceCalculator.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  httpGet(theUrl) {
    return new Promise((resolve, reject) => {
      let xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", theUrl, false);
      xmlHttp.send(null);
      resolve(JSON.parse(xmlHttp.responseText));
    });
  }
  componentDidMount() {
    const url =
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/smartQFood8bef5a2.json";
    this.httpGet(url).then(data => {
      this.items = data;
      let temp = {};
      this.items.forEach((items, index) => {
        this.items[index].index = index;
        temp[index] = items;
        temp[index].number = 0;
      });

      this.setState({ items: temp, itemsCpy: this.items.slice() });
    });
  }
  /**
   *
   * @param {*} event
   * @description
   * To handle user search
   */
  handleSearch(event) {
    let [itemsCpy, searchValue] = [[], event.target.value];
    itemsCpy = this.items.filter(items => {
      return (
        items.itemname
          .toLowerCase()
          .search((searchValue || "").toLowerCase()) >= 0
      );
    });

    if (!searchValue) {
      itemsCpy = this.items.slice();
    }

    this.setState({ search: event.target.value, itemsCpy });
  }

  priceCalculator(id, number) {
    let [temp, description] = [this.state.items, ""];

    let amount = 0;

    if (temp[id]) {
      temp[id].number += number;
    } else {
      temp[id] = this.items[id];
      temp[id].number = number;
    }
    for (let key in temp) {
      amount += temp[key].number * temp[key].price;
      if (temp[key].number) {
        description += temp[key].itemname + " x " + temp[key].number + ", ";
      }
    }
    description = description.replace(/(.*)(,)/, "$1");
    this.setState({ totalBill: amount, items: temp, description: description });
  }

  filterItems() {
    let sortDirection = !this.state.sort;
    let unsortedItemCpy = this.state.itemsCpy.slice();
    unsortedItemCpy = unsortedItemCpy.sort((item1, item2) => {
      if (sortDirection) {
        return item1.price - item2.price;
      }
      return item2.price - item1.price;
    });
    this.setState({ sort: sortDirection, itemsCpy: unsortedItemCpy });
  }

  render() {
    return (
      <div>
        <Navigation
          handleSearch={this.handleSearch}
          searchValue={this.state.searchValue}
          filter={this.filterItems.bind(this)}
        />
        <div
          className={
            "container " + (this.state.itemsCpy.length === 0 ? "hidden" : "")
          }
        >
          {this.state.itemsCpy.map((items, index) => {
            return (
              <Item
                key={index}
                id={items.index}
                itemname={items.itemname}
                count={
                  this.state.items[items.index]
                    ? this.state.items[items.index].number
                    : 0
                }
                price={items.price}
                availabletime={items.availabletime}
                onAddItem={this.priceCalculator}
              />
            );
          })}
        </div>
        <Footer
          totalBill={this.state.totalBill}
          description={this.state.description ? this.state.description : null}
        />
      </div>
    );
  }
}
