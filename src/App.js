import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./App.css";
import Weather from "./Components/weather";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lon: "",
      displayName: "",
      displayMap: false,
      displayError: false,
      zoomDeg: 18,
    };
  }

  renderLocation = async (event) => {
    event.preventDefault();
    let place = event.target.location.value;
    let myKey = "pk.8ef314117e8a9349088d0a3afa79e734";
    let URL = `https://eu1.locationiq.com/v1/search.php?key=${myKey}&q=${place}&format=json`;

    try {
      let searchResult = await axios.get(URL);
      this.setState({
        displayMap: true,
        lat: searchResult.data[0].lat,
        lon: searchResult.data[0].lon,
        displayName: searchResult.data[0].display_name,
      });
    } catch (error) {
      this.setState({
        displayError: true,
      });
    }
  };

  handleZooming = (event) => {
    if (event.target.name === "zoomOut") {
      this.setState({
        zoomDeg: this.state.zoomDeg - 3,
      });
    } else if (event.target.name === "zoomIn") {
      this.setState({
        zoomDeg: this.state.zoomDeg + 3,
      });
    }
  };

  render() {
    return (
      <>
        <header>
          <h1>City Explore</h1>
        </header>
        <Form onSubmit={this.renderLocation}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Amman"
              name="location"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Explore!
          </Button>
        </Form>

        <p> Loacation Name: {this.state.displayName}</p>
        <p>Lat: {this.state.lat}</p>
        <p>Lon: {this.state.lon}</p>

        <Col xs={6} md={4}>
          {this.state.displayMap && (
            <Image
              src={`https://maps.locationiq.com/v3/staticmap?key=pk.8ef314117e8a9349088d0a3afa79e734&center=${this.state.lat},${this.state.lon}&zoom=${this.state.zoomDeg}`}
              roundedCircle
            />
          )}
          {this.state.displayMap && (
            <ButtonGroup className="mb-2" onClick={this.handleZooming}>
              <Button type="click" name="zoomOut">
                -
              </Button>
              <Button type="click" name="zoomIn">
                +
              </Button>
            </ButtonGroup>
          )}
        </Col>
        {this.state.displayMap && (
          <Weather
            name={this.state.displayName}
            lat={this.state.lat}
            lon={this.state.lon}
          />
        )}

        {this.state.displayError && (
          <Alert show={this.state.displayError} variant="success">
            <Alert.Heading>Unable to geocode!</Alert.Heading>
            <p>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
              eget lacinia odio sem nec elit. Cras mattis consectetur purus sit
              amet fermentum.
            </p>
          </Alert>
        )}

        <footer>&copy;Bashar Aldamen</footer>
      </>
    );
  }
}

export default App;

// &zoom=<zoom>&size=<width>x<height>&format=<format>&maptype=<MapType>&markers=icon:<icon>|<latitude>,<longitude>&markers=icon:<icon>|<latitude>,<longitude>
