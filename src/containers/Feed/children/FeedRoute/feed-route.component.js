import React, { Component } from 'react';
import { CenterContainer } from '@util-components';
// import { NavBar } from "@components";
import { FeedRouteCard } from './feed-route.style';

type Props = {
  history: Object
};

class FeedRoute extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FeedRouteCard>
        
      </FeedRouteCard>
    );
  }
}

export default FeedRoute;
