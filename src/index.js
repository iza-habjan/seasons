import React from "react";
import ReactDOM from "react-dom";

import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

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

  // helper method for additional logic, when there are multiple return statements inside of render method
  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <Spinner message="Please accept location request..." />;
  }

  // React says we have to define render!
  // it gets called any time the component is updated
  render() {
    return <div className="border white">{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
