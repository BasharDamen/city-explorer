import React from "react";
import axios from "axios";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showWeather: false,
      date: "",
      description: "",
      showError: false,
    };
  }

  displayWeather = async () => {
    const weatherURL = `https://city-explorer-bd-server.herokuapp.com/weather?lat=${this.props.lat}&lon=${this.props.lon}&searchQuery=${this.props.name}`;

    try {
      const result = await axios.get(weatherURL);
      this.setState({
        date: result.data.map((item) => {
          return item.date;
        }),
        description: result.data.map((item) => {
          return item.description;
        }),
        showWeather: true,
      });
    } catch (error) {
      this.setState({
        showError: true,
      });
    }
  };

  render() {
    return (
      <>
        <Button variant="secondary" onClick={this.displayWeather}>
          Weather
        </Button>{" "}
        {this.state.showWeather && (
          <div>
            <Toast show={this.state.showWeather} onClose={() =>{this.setState({showWeather:false})}}>
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">{this.props.name}</strong>
                <small>{this.state.date[0]}</small>
              </Toast.Header>
              <Toast.Body>{this.state.description[0]}</Toast.Body>
            </Toast>
            <Toast show={this.state.showWeather} onClose={() =>{this.setState({showWeather:false})}}>
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">{this.props.name}</strong>
                <small>{this.state.date[1]}</small>
              </Toast.Header>
              <Toast.Body>{this.state.description[1]}</Toast.Body>
            </Toast>
            <Toast show={this.state.showWeather} onClose={() =>{this.setState({showWeather:false})}}>
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">{this.props.name}</strong>
                <small>{this.state.date[2]}</small>
              </Toast.Header>
              <Toast.Body>{this.state.description[2]}</Toast.Body>
            </Toast>
          </div>
        )}
        {this.state.showError && (
          <Alert
            variant="danger"
            onClose={() => {
              this.setState({ showError: false });
            }}
            dismissible
          >
            <Alert.Heading>
              Sorry! We Don't Have Information About {this.props.name}
            </Alert.Heading>
          </Alert>
        )}
      </>
    );
  }
}

export default Weather;
