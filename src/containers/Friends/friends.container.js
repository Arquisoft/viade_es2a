import React, { Component } from 'react';
// import data from '@solid/query-ldflex';
// import { namedNode } from '@rdfjs/data-model';
import { FriendsPageContent } from './friends.component';
// import { successToaster, errorToaster } from '@utils';

export class FriendsComponent extends Component<Props> {
    constructor(props) {
        super(props);
    
        this.state = {
          isLoading: false,
          hasFriends: false
        };
      }

      componentDidMount() {
        
      }
    
      componentDidUpdate(prevProps) {
        
      }

      render() {
        const { isLoading, hasFriends } = this.state;
        const { webId } = this.props;
        return (
          <FriendsPageContent {...{ isLoading, hasFriends, webId }} />
        );
      }
}