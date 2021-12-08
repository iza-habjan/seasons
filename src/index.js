import React from "react";
import ReactDOM from "react-dom";

// import SeasonDisplay from "./SeasonDisplay";

class App extends React.Component {
  // specific to JavaScript
  constructor(props) {
    super(props);

    // THIS IS THE ONLY DIRECT ASSIGMENT TO this.state
    this.state = { lat: null, errorMessage: "" };

    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        // any other time state needs to be changed or set, this.setState is called!
        this.setState({ lat: position.coords.latitude });
      },
      (err) => {
        this.setState({ errorMessage: err.message });
      }
    );
  }

  // React says we have to define render!
  render() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <div>Latitude: {this.state.lat}</div>;
    }

    return <div>Loading...</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
