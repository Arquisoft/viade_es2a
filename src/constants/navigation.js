/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  {
    id: 'welcome',
    icon: '/img/icon/apps.svg',
    label: 'navBar.welcome',
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
