/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  {
    id: 'welcome',
    icon: '/img/icon/info.svg',
    label: 'navBar.about',
    to: '/welcome'
  },
  {
    id: 'friends',
    icon: '/img/icon/friends.svg',
    label: 'navBar.friends',
    to: '/friends'
  },
  {
    id: 'feed',
    icon: '/img/icon/feed.svg',
    label: 'navBar.feed',
    to: '/feed'
  },
  {
    id: 'myRoutes',
    icon: '/img/icon/map.svg',
    label: 'navBar.myRoutes',
    to: '/my-routes'
  }

];

export const ProfileOptions = [
  {
    label: 'navBar.logOut',
    onClick: 'logOut',
    icon: 'lock'
  }
];
