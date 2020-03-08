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
    id: 'feed',
    icon: '/img/icon/feed.svg',
    label: 'navBar.feed',
    to: '/feed'
  }
];

export const ProfileOptions = [
  {
    label: 'navBar.logOut',
    onClick: 'logOut',
    icon: 'lock'
  }
];
