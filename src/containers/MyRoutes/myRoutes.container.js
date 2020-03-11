import React, { Component, useState } from 'react';
import data from '@solid/query-ldflex';
import { namedNode } from '@rdfjs/data-model';
import { MyRoutesPageContent } from './myRoutes.component';
import { successToaster, errorToaster } from '@utils';
import { wait } from 'react-testing-library';

/**
 * Container component for the My Routes Page, fetches routes from a POD
 */
export class MyRoutesContainer extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      routes: []
    };
  }

  componentDidMount() {
    const { webId } = this.props;
    if (webId) this.fetchRoutes();
  }

  componentDidUpdate(prevProps) {
    const { webId } = this.props;
    if (webId && webId !== prevProps.webId) this.fetchRoutes();
  }

  fetchRoutes = async () => {
    this.setState({ isLoading: true });

    const { webId } = this.props;

    const root = webId.replace("/profile/card#me", "");
    const FileClient = require("solid-file-client");
    const solidAuth = require("solid-auth-cli");
    const fileClient = new FileClient(solidAuth);
    const routesPath = `${root}/private/routes`;

    var folder = await fileClient.readFolder(routesPath);
    const output = [];

    Promise.all(folder.files.map(e => fileClient.readFile(e.url))).then(values => {
      var routes = values.map(v => { try { return JSON.parse(v) } catch (err) { return undefined } }).filter(x => x)
      this.setState({ routes: routes, isLoading: true });
    })
  }

  render() {
    const { routes } = this.state;

    return (
      <MyRoutesPageContent {... { routes }} />
    )
  }
}
