import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';

import { Menu, MenuTrigger, MenuContent } from '../Menu';
import LogoSlot from '../plugin-slots/LogoSlot';
import DesktopLoggedOutItemsSlot from '../plugin-slots/DesktopLoggedOutItemsSlot';
import { desktopLoggedOutItemsDataShape } from './DesktopLoggedOutItems';
import DesktopMainMenuSlot from '../plugin-slots/DesktopMainMenuSlot';
import { desktopHeaderMainOrSecondaryMenuDataShape } from './DesktopHeaderMainOrSecondaryMenu';
import DesktopSecondaryMenuSlot from '../plugin-slots/DesktopSecondaryMenuSlot';
import DesktopUserMenuSlot from '../plugin-slots/DesktopUserMenuSlot';
import { desktopUserMenuDataShape } from './DesktopHeaderUserMenu';

import messages, { arMessages } from '../Header.messages';

const DesktopHeader = (props) => {
  const {
    mainMenu, secondaryMenu, userMenu, loggedOutItems,
    logo, logoAltText, logoDestination,
    username, loggedIn,
  } = props;
  const intl = useIntl();
  const isArabic = intl.locale && intl.locale.startsWith('ar')
    || (typeof document !== 'undefined' && document.documentElement.dir === 'rtl');

  const t = (msg, values) => {
    if (isArabic && arMessages[msg.id]) {
      let text = arMessages[msg.id];
      if (values) Object.keys(values).forEach((k) => { text = text.replace(`{${k}}`, values[k]); });
      return text;
    }
    return intl.formatMessage(msg, values);
  };

  return (
    <header className="kkux-header">
      <a className="sr-only sr-only-focusable" href="#main">{t(messages['header.label.skip.nav'])}</a>
      <div className="kkux-header__inner">
        {/* Logo: size-18 = 72px, matches marketing site PlatformLogo */}
        <div className="kkux-header__logo">
          <LogoSlot src={logo} alt={logoAltText} href={logoDestination} />
        </div>

        {/* Main nav: matches marketing site NavigationMenu + ghost Button size="xl" */}
        <nav aria-label={t(messages['header.label.main.nav'])} className="kkux-header__nav-main">
          <DesktopMainMenuSlot menu={mainMenu} />
        </nav>

        {/* Right section: matches NavbarActions flex items-center gap-2 */}
        <div className="kkux-header__actions">
          {loggedIn ? (
            <>
              {/* Secondary menu */}
              <DesktopSecondaryMenuSlot menu={secondaryMenu} />

              {/* User trigger: matches Button variant="ghost" — NO border, just hover bg */}
              <Menu className="">
                <MenuTrigger
                  tag="button"
                  aria-label={t(messages['header.label.account.menu.for'], { username })}
                  className="kkux-header__user-btn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="8" r="4" fill="currentColor" />
                    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                  <span className="kkux-header__user-name">{username}</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </MenuTrigger>
                <MenuContent className="kkux-header__dropdown">
                  <DesktopUserMenuSlot menu={userMenu} />
                </MenuContent>
              </Menu>
            </>
          ) : (
            <DesktopLoggedOutItemsSlot items={loggedOutItems} />
          )}
        </div>
      </div>
    </header>
  );
};

DesktopHeader.propTypes = {
  mainMenu: desktopHeaderMainOrSecondaryMenuDataShape,
  secondaryMenu: desktopHeaderMainOrSecondaryMenuDataShape,
  userMenu: desktopUserMenuDataShape,
  loggedOutItems: desktopLoggedOutItemsDataShape,
  logo: PropTypes.string,
  logoAltText: PropTypes.string,
  logoDestination: PropTypes.string,
  username: PropTypes.string,
  loggedIn: PropTypes.bool,
};

DesktopHeader.defaultProps = {
  mainMenu: [], secondaryMenu: [], userMenu: [], loggedOutItems: [],
  logo: null, logoAltText: null, logoDestination: null,
  username: null, loggedIn: false,
};

export default DesktopHeader;
export const desktopHeaderDataShape = DesktopHeader.propTypes;
