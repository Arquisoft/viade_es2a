import React, { Component } from 'react';
import { RouteMapPageContent } from '../Feed/feed.component';

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

    Promise.all(folder.files.map(e => fileClient.readFile(e.url))).then(values => {
      var routes = values.map(v => { try { return JSON.parse(v) } catch (err) { return undefined } }).filter(x => x)
      this.setState({ routes: routes, isLoading: true });
    })
  }

  render() {
    const { routes } = this.state;

    return (
      <RouteMapPageContent {... { routes }} />
    )
  }
}
