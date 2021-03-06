import React from "react";
import GoogleMapReact from "google-map-react";
import Badge from "@material-ui/core/Badge";
class MapClient extends React.Component {
  state = { lat: 59.955413, lng: 30.337844 };

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 15
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "400px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAwmajWKOtOXtUzdYziIfoH6spwlCT-W9A" }}
          center={this.state}
          zoom={this.props.zoom}
        >
          <Badge
            lat={this.state.lat}
            lng={this.state.lng}
            badgeContent="Here"
            color={"secondary"}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapClient;
