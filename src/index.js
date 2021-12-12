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

  // method invoked when the component shows up on the screen
  componentDidMount() {
    console.log("My component was rendered to the screen");
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
      return <div>Latitude: {this.state.lat}</div>;
    }

    return <div>Loading...</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
