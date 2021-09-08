import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      description: "",
      weatherArray: [],
      // tableDisplay: false,
    };
  }

  displayWeather = () => {
    // console.log("Hello");
    // console.log(typeof this.props.name);
    let cityName = this.props.name
    let weatherURL = `https://city-explorer-bd-server.herokuapp.com/weather?city_name=${cityName}`;

    axios.get(weatherURL).then((result) => {
      this.setState({
        weatherArray: result.data,
        // tableDisplay: true,
      });
    });
  };
  render() {
    // console.log(this.state.weatherArray);
    return (
      <>
      <Button variant="outline-info" type="button" onClick={this.displayWeather}>Weather Info.</Button>{' '}
        <h2>Weather Status of {this.props.name}</h2>
        <Table
          striped
          bordered
          hover
          variant="dark"
          show = {true}
          responsive="xl"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {this.state.weatherArray.map((item, i) => {
              return (
                <tr key={i}>
                  <td>Day {i + 1}</td>
                  <td>{item.date}</td>
                  <td>{item.description}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  }
}

export default Weather;
