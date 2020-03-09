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
    id: 'addroute',
    icon: '/img/icon/addroute.png',
    label: 'Nueva Ruta',
    to: '/addroute'
  }
];

export const ProfileOptions = [
  {
    label: 'navBar.logOut',
    onClick: 'logOut',
    icon: 'lock'
  }
];
