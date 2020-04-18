import React, { Component } from 'react';
import data from '@solid/query-ldflex';
import { namedNode } from '@rdfjs/data-model';
import { WelcomePageContent } from './welcome.component';
import { successToaster, errorToaster } from '@utils';

import { userService } from '@services';

const defaultProfilePhoto = 'img/icon/empty-profile.svg';

/**
 * Container component for the Welcome Page, containing example of how to fetch data from a POD
 */
export class WelcomeComponent extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      image: defaultProfilePhoto,
      isLoading: false,
      hasImage: false
    };
  }

  componentDidMount() {
    const { webId } = this.props;
    if (webId) this.getProfileData();
  }

  componentDidUpdate(prevProps) {
    const { webId } = this.props;
    if (webId && webId !== prevProps.webId) this.getProfileData();
  }

  getProfileData = async () => {
    this.setState({ isLoading: true });
    const { webId } = this.props;

    const { name, image, hasImage } = await userService.getProfile(webId);

    this.setState({ name, image, isLoading: false, hasImage });
  };

  updatePhoto = async (uri: String, message, title = '') => {
    const { hasImage } = this.state;
    try {
      const { user } = data;
      if (hasImage) await user.vcard_hasPhoto.set(namedNode(uri));
      else await user.vcard_hasPhoto.add(namedNode(uri));
      successToaster(message, title);
    } catch (error) {
      errorToaster(error.message, 'Error');
    }
  };

  render() {
    const { name, image, isLoading } = this.state;
    const { webId } = this.props;
    return (
      <WelcomePageContent {...{ name, image, isLoading, webId, updatePhoto: this.updatePhoto }} />
    );
  }
}
