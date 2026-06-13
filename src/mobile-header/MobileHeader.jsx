import React from 'react';
import PropTypes, { bool } from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';

import LogoSlot from '../plugin-slots/LogoSlot';
import MobileLoggedOutItemsSlot from '../plugin-slots/MobileLoggedOutItemsSlot';
import { mobileHeaderLoggedOutItemsDataShape } from './MobileLoggedOutItems';
import MobileMainMenuSlot from '../plugin-slots/MobileMainMenuSlot';
import { mobileHeaderMainMenuDataShape } from './MobileHeaderMainMenu';
import MobileUserMenuSlot from '../plugin-slots/MobileUserMenuSlot';
import { mobileHeaderUserMenuDataShape } from './MobileHeaderUserMenu';

import messages, { arMessages } from '../Header.messages';

const MobileHeader = ({
  mainMenu, secondaryMenu, userMenu, loggedOutItems,
  logo, logoAltText, logoDestination,
  username, loggedIn, stickyOnMobile,
}) => {
  const intl = useIntl();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const isArabic = intl.locale && intl.locale.startsWith('ar')
    || (typeof document !== 'undefined' && document.documentElement.dir === 'rtl');

  const t = (msg, values) => {
    if (isArabic && arMessages[msg.id]) {
      let text = arMessages[msg.id];
      if (values) { Object.keys(values).forEach((k) => { text = text.replace(`{${k}}`, values[k]); }); }
      return text;
    }
    return intl.formatMessage(msg, values);
  };

  const combinedMenu = [...mainMenu, ...secondaryMenu];
  const showDrawer = combinedMenu.length > 0 || userMenu.length > 0 || loggedOutItems.length > 0;

  return (
    <>
      {/* ---- Top bar: logo left, hamburger right (matches marketing site) ---- */}
      <header
        aria-label={t(messages['header.label.main.header'])}
        className={`kkux-mobile-header${stickyOnMobile ? ' kkux-mobile-header--sticky' : ''}`}
      >
        <a className="sr-only sr-only-focusable" href="#main">
          {t(messages['header.label.skip.nav'])}
        </a>

        <LogoSlot src={logo} alt={logoAltText} href={logoDestination} />

        {showDrawer && (
          <button
            type="button"
            className="kkux-mobile-header__hamburger"
            aria-label={t(messages['header.label.main.menu'])}
            onClick={() => setDrawerOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </header>

      {/* ---- Overlay + Drawer (matches marketing site Sheet + SheetOverlay) ---- */}
      {showDrawer && (
        <div className={`kkux-mobile-drawer${drawerOpen ? ' kkux-mobile-drawer--open' : ''}`}>
          {/* Overlay: fixed inset-0 bg-black/10 backdrop-blur */}
          <div
            className="kkux-mobile-drawer__overlay"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer: w-3/4 sm:max-w-sm, slides from right (LTR) or left (RTL) */}
          <div className="kkux-mobile-drawer__sheet" role="dialog" aria-modal="true">
            {/* Close button: X icon, top-right corner */}
            <button
              type="button"
              className="kkux-mobile-drawer__close"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* User section (top of drawer) */}
            {(userMenu.length > 0 || loggedOutItems.length > 0) && (
              <div className="kkux-mobile-drawer__user">
                {loggedIn && username && (
                  <div className="kkux-mobile-drawer__user-info">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="8" r="4" fill="#007359" />
                      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="#007359" strokeWidth="2" fill="none" />
                    </svg>
                    <span className="kkux-mobile-drawer__username">{username}</span>
                  </div>
                )}
                {loggedIn ? (
                  <MobileUserMenuSlot menu={userMenu} />
                ) : (
                  <MobileLoggedOutItemsSlot items={loggedOutItems} />
                )}
              </div>
            )}

            {/* Nav links */}
            {combinedMenu.length > 0 && (
              <nav className="kkux-mobile-drawer__nav" aria-label={t(messages['header.label.main.nav'])}>
                <MobileMainMenuSlot menu={combinedMenu} />
              </nav>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export const mobileHeaderDataShape = {
  mainMenu: mobileHeaderMainMenuDataShape,
  secondaryMenu: mobileHeaderMainMenuDataShape,
  userMenu: mobileHeaderUserMenuDataShape,
  loggedOutItems: mobileHeaderLoggedOutItemsDataShape,
  logo: PropTypes.string,
  logoAltText: PropTypes.string,
  logoDestination: PropTypes.string,
  username: PropTypes.string,
  loggedIn: bool,
  stickyOnMobile: bool,
};

MobileHeader.propTypes = mobileHeaderDataShape;

MobileHeader.defaultProps = {
  mainMenu: [], secondaryMenu: [], userMenu: [], loggedOutItems: [],
  logo: null, logoAltText: null, logoDestination: null,
  username: null, loggedIn: false, stickyOnMobile: true,
};

export default MobileHeader;
