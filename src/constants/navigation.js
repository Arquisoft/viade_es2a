/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  {
    id: 'feed',
    icon: 'img/icon/feed.svg',
    label: 'navBar.feed',
    to: '/feed'
  },
  {
    id: 'myRoutes',
    icon: 'img/icon/map.svg',
    label: 'navBar.myRoutes',
    to: '/my-routes'
  }
  /*{
    id: 'welcome',
    icon: 'img/icon/info.svg',
    label: 'navBar.about',
    to: '/welcome'
  }, */
];

export const ProfileOptions = [
  {
    label: 'navBar.logOut',
    onClick: 'logOut',
    icon: 'lock'
  }
];
