import React from "react";
import ReactDOM from "react-dom";

import SeasonDisplay from "./SeasonDisplay";

class App extends React.Component {
  state = { lat: null, errorMessage: "" };

  // method invoked when the component shows up on the screen
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      // any other time state needs to be changed or set, this.setState is called!
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ errorMessage: err.message })
    );
  }

  // render method gets called when component updates, JSX is returned, shown on the screen and...
  // ...after the componentDidUpdate method is invoked
  componentDidUpdate() {
    console.log("My component was just updated - it rerandered");
  }

  // React says we have to define render!
  // it gets called any time the component is updated
  render() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <div>Loading...</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
