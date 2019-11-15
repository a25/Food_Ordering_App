import React from "react";
class Item extends React.Component {
  constructor(props) {
    super(props);
    let availabletime = props.availabletime.split(",");
    let [morning, evening] = [
      availabletime[0].split("-"),
      availabletime[1].split("-")
    ];
    [this.morningStart, this.morningEnd] = [
      this.convertTime(morning[0]),
      this.convertTime(morning[1])
    ];

    [this.eveningStart, this.eveningEnd] = [
      this.convertTime(evening[0]),
      this.convertTime(evening[1])
    ];
    // console.log(this.props.onAddItem(0,1))
    this.isOrderDisabled = this.isItemAvailable();
    setInterval(() => {
      this.isOrderDisabled = this.isItemAvailable();
    }, 60000);
  }

  convertTime(data) {
    let temp = data.split(":");
    let hr = temp[0];
    let min = temp[1];
    return parseInt(hr) * 60 + parseInt(min);
  }

  isItemAvailable() {
    let d = new Date();
    let currentMTime = d.getHours() * 60 + d.getMinutes();
    if (
      (currentMTime > this.morningStart && currentMTime < this.morningEnd) ||
      (currentMTime > this.eveningStart && currentMTime < this.eveningEnd)
    ) {
      return false;
    }

    return true;
  }

  render() {
    return (
      <div className="card">
        <div className="description">{this.props.itemname}</div>
        <div className="amount">{this.props.price}$</div>
        <div className={"add-item " + (this.props.count ? "hidden" : "")}>
          <button
            onClick={() => {
              this.props.onAddItem(this.props.id, 1);
            }}
            disabled={this.isOrderDisabled}
          >
            Add Item
          </button>
        </div>
        <div className={"add-item1 " + (!this.props.count ? "hidden" : "")}>
          <button
            className="inc-item"
            onClick={() => {
              this.props.onAddItem(this.props.id, 1);
            }}
            disabled={this.isOrderDisabled}
          >
            +
          </button>
          <div className="count-display">{this.props.count}</div>
          <button
            className="dec-item"
            onClick={() => {
              this.props.onAddItem(this.props.id, -1);
            }}
            disabled={this.isOrderDisabled}
          >
            -
          </button>
        </div>
      </div>
    );
  }
}

export default Item;
