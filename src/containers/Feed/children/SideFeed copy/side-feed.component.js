import React, { Component } from 'react';
import { CenterContainer } from './node_modules/@util-components';
// import { NavBar } from "@components";
import { } from './side-feed.style';
import {
  LoadScript,
  GoogleMap,
  Polyline
} from '@react-google-maps/api'

type Props = {
  history: Object
};

class FeedRoute extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MapView
        region={this.state.region}
        onRegionChange={this.onRegionChange}
      />
    );
  }
}

export default FeedRoute;
