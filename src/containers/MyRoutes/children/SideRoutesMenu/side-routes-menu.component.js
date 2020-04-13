import React from 'react';

import {
  SideMenuHeader,
  CollapseButton
} from './side-routes-menu.style';

import {
  SidePanelHolder,
  SideElementContainer
} from '@containers/Feed/children/FeedSidePanel/feed-side-panel.style';

import { useTranslation } from 'react-i18next';
import { RouteCard } from '@components';

const SideRoutesMenu = ({ routes, collapsed, setCollapsed }) => {
  const { t } = useTranslation();

  return <SidePanelHolder {...{ collapsed, minWidth: '18em', maxWidth: '22em' }}>
    <SideMenuHeader>
      {t("feed.sideFeed.recentRoutes")}
      {!collapsed && <CollapseButton onClick={() => setCollapsed(true)}>⇢</CollapseButton>}
    </SideMenuHeader>

    <SideElementContainer>
      {routes.map(route => <RouteCard key={route.id} {... { route }} />)}
    </SideElementContainer>
  </SidePanelHolder>
}

export default SideRoutesMenu;
