import React, { useContext, useMemo } from 'react';
import Responsive from 'react-responsive';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import {
  APP_CONFIG_INITIALIZED,
  ensureConfig,
  mergeConfig,
  getConfig,
  subscribe,
} from '@edx/frontend-platform';

import PropTypes from 'prop-types';
import DesktopHeaderSlot from './plugin-slots/DesktopHeaderSlot';
import MobileHeaderSlot from './plugin-slots/MobileHeaderSlot';

import messages, { arMessages } from './Header.messages';

ensureConfig([
  'LMS_BASE_URL',
  'LOGOUT_URL',
  'LOGIN_URL',
  'SITE_NAME',
  'LOGO_URL',
  'MARKETING_SITE_BASE_URL',
  'ORDER_HISTORY_URL',
  'KKUX_INVOICES_URL',
], 'Header component');

subscribe(APP_CONFIG_INITIALIZED, () => {
  mergeConfig({
    AUTHN_MINIMAL_HEADER: !!process.env.AUTHN_MINIMAL_HEADER,
  }, 'Header additional config');
});

/**
 * Header component for the application.
 * Displays a header with the provided main menu, secondary menu, and user menu when the user is authenticated.
 * If any of the props (mainMenuItems, secondaryMenuItems, userMenuItems) are not provided, default
 * items are displayed.
 * For more details on how to use this component, please refer to this document:
 * https://github.com/openedx/frontend-component-header/blob/master/docs/using_custom_header.rst
 *
 * @param {list} mainMenuItems - The list of main menu items to display.
 * See the documentation for the structure of main menu item.
 * @param {list} secondaryMenuItems - The list of secondary menu items to display.
 * See the documentation for the structure of secondary menu item.
 * @param {list} userMenuItems - The list of user menu items to display.
 * See the documentation for the structure of user menu item.
 */
const Header = ({
  intl, mainMenuItems, secondaryMenuItems, userMenuItems,
}) => {
  const { authenticatedUser, config } = useContext(AppContext);
  const isArabic = useMemo(() => (
    intl.locale && intl.locale.startsWith('ar')
  ) || (
    typeof document !== 'undefined' && document.documentElement.dir === 'rtl'
  ), [intl.locale]);

  const ordersUrl = useMemo(() => {
    const raw = config.ORDER_HISTORY_URL || config.KKUX_INVOICES_URL;
    if (!raw) return raw;
    if (raw.startsWith('http')) return raw;
    return `${config.LMS_BASE_URL.replace(/\/+$/, '')}${raw}`;
  }, [config.ORDER_HISTORY_URL, config.KKUX_INVOICES_URL, config.LMS_BASE_URL]);

  const t = (msg, values) => {
    if (isArabic && arMessages[msg.id]) {
      let text = arMessages[msg.id];
      if (values) {
        Object.keys(values).forEach((key) => { text = text.replace(`{${key}}`, values[key]); });
      }
      return text;
    }
    return intl.formatMessage(msg, values);
  };

  const marketingBase = (config.MARKETING_SITE_BASE_URL || '').replace(/\/+$/, '');
  // KKUx: mirror the marketing-site convention of routing apps-domain URLs
  // (account, profile) by swapping the www. subdomain for apps. on the
  // marketing base URL. This matches the openEdXPath(_, isMFE=true) helper
  // in kkux-marketing-site/src/lib/paths.ts:96-105.
  const appsBase = marketingBase.replace(/^(https?:\/\/)www\./, '$1apps.');
  const isOnDashboard = typeof window !== 'undefined' && (
    window.location.pathname === '/dashboard'
    || window.location.pathname.startsWith('/dashboard/')
    || window.location.pathname === '/learner-dashboard'
    || window.location.pathname.startsWith('/learner-dashboard/')
  );

  const defaultMainMenu = [
    {
      type: 'item',
      href: `${config.LMS_BASE_URL}/dashboard`,
      content: t(messages['header.links.myPrograms']),
      isActive: isOnDashboard,
    },
    {
      type: 'item',
      href: `${marketingBase}/`,
      content: t(messages['header.links.home']),
    },
    {
      type: 'item',
      href: `${marketingBase}/programs`,
      content: t(messages['header.links.programs']),
    },
    {
      type: 'item',
      href: `${marketingBase}/diplomas`,
      content: t(messages['header.links.diplomas']),
    },
    {
      type: 'item',
      href: `${marketingBase}/about`,
      content: t(messages['header.links.about']),
    },
    {
      type: 'item',
      href: `${marketingBase}/contact-us`,
      content: t(messages['header.links.contact']),
    },
  ];
  const defaultUserMenu = authenticatedUser === null ? [] : [
    {
      heading: null,
      items: [
        {
          type: 'item',
          href: `${config.LMS_BASE_URL}/dashboard`,
          content: t(messages['header.user.menu.dashboard']),
        },
        ...(ordersUrl ? [{
          type: 'item',
          href: ordersUrl,
          content: t(messages['header.user.menu.order.history']),
        }] : []),
      ],
    },
    {
      heading: null,
      items: [
        {
          type: 'item',
          href: `${appsBase}/account/`,
          content: t(messages['header.user.menu.account.settings']),
        },
        {
          type: 'item',
          href: `${appsBase}/profile/u/${authenticatedUser.username}`,
          content: t(messages['header.user.menu.profile']),
        },
      ],
    },
    {
      heading: null,
      items: [
        {
          type: 'item',
          href: config.LOGOUT_URL,
          content: t(messages['header.user.menu.logout']),
          variant: 'destructive',
        },
      ],
    },
  ];

  // KKUx: always render the KKUx marketing-site-aligned navigation, regardless
  // of what mainMenuItems / secondaryMenuItems / userMenuItems the consumer
  // passes. KKUx header is a single component used across all MFEs and the
  // consumer-supplied menus (e.g. frontend-app-learner-dashboard's
  // LearnerDashboardMenu which renders Courses / Programs / Discover New)
  // are out of sync with the brand. The props stay on the public API for
  // backward-compatibility but are deliberately never forwarded.
  const mainMenu = defaultMainMenu;
  const secondaryMenu = [];
  const userMenu = authenticatedUser === null ? [] : defaultUserMenu;

  const loggedOutItems = [
    {
      type: 'item',
      href: config.LOGIN_URL,
      content: intl.formatMessage(messages['header.user.menu.login']),
    },
    {
      type: 'item',
      href: `${config.LMS_BASE_URL}/register`,
      content: intl.formatMessage(messages['header.user.menu.register']),
    },
  ];

  const props = {
    logo: config.LOGO_URL,
    logoAltText: config.SITE_NAME,
    logoDestination: config.MARKETING_SITE_BASE_URL || `${config.LMS_BASE_URL}/dashboard`,
    loggedIn: authenticatedUser !== null,
    // KKUx: prefer the JWT `name` claim (full display name) over the
    // opaque `username` so the user-menu trigger shows the learner's name.
    username: authenticatedUser !== null
      ? (authenticatedUser.name || authenticatedUser.username)
      : null,
    avatar: authenticatedUser !== null ? authenticatedUser.avatar : null,
    mainMenu: getConfig().AUTHN_MINIMAL_HEADER ? [] : mainMenu,
    secondaryMenu: getConfig().AUTHN_MINIMAL_HEADER ? [] : secondaryMenu,
    userMenu: getConfig().AUTHN_MINIMAL_HEADER ? [] : userMenu,
    loggedOutItems: getConfig().AUTHN_MINIMAL_HEADER ? [] : loggedOutItems,
  };

  return (
    <>
      <Responsive maxWidth={769}>
        <MobileHeaderSlot props={props} />
      </Responsive>
      <Responsive minWidth={769}>
        <DesktopHeaderSlot props={props} />
      </Responsive>
    </>
  );
};

Header.defaultProps = {
  mainMenuItems: null,
  secondaryMenuItems: null,
  userMenuItems: null,
};

Header.propTypes = {
  intl: intlShape.isRequired,
  mainMenuItems: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
  secondaryMenuItems: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
  userMenuItems: PropTypes.arrayOf(PropTypes.shape({
    heading: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf(['item', 'menu']),
      href: PropTypes.string,
      content: PropTypes.string,
      isActive: PropTypes.bool,
    })),
  })),
};

export default injectIntl(Header);
