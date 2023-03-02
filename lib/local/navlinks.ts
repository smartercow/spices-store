import type { IconName } from '@components/ui/hero-icon';
import type { CustomIconName } from '@components/ui/custom-icon';

export type NavLink = {
  href: string;
  linkName: string;
  iconName?: IconName;
  disabled?: boolean;
  fontAwesomeIcon?: string;
  customIcon?: CustomIconName;
  canBeHidden?: boolean;
};

export const navLinks: Readonly<NavLink[]> = [
  {
    href: '/',
    linkName: 'Hjem',
    fontAwesomeIcon: 'fa-house'
  },
  {
    href: '/produkter',
    linkName: 'Produkter',
    fontAwesomeIcon: 'fa-pepper-hot'
  },
  /*   {
    href: '/oekologi',
    linkName: 'Økologi',
    customIcon: 'EcologyIcon'
  }, */
  {
    href: '/tilbud',
    linkName: 'Tilbud',
    fontAwesomeIcon: 'fa-badge-percent',
    disabled: true
  },
  {
    href: '/retter',
    linkName: 'Retter',
    fontAwesomeIcon: 'fa-salad',
    disabled: true
  },
  {
    href: '/andet',
    linkName: 'Andet',
    fontAwesomeIcon: 'fa-mortar-pestle',
    disabled: true
  },
  {
    href: '/kontakt',
    linkName: 'Kontakt',
    fontAwesomeIcon: 'fa-circle-phone',
    disabled: true
  }
  /*   {
    href: '/omos',
    linkName: 'Om Os',
    iconName: 'EnvelopeIcon',
    disabled: true
  } */
];
