import React, { useMemo } from 'react';
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
import LanguageSwitcher from '../components/LanguageSwitcher';

import messages, { arMessages } from '../Header.messages';

const MobileHeader = ({
  mainMenu, secondaryMenu, userMenu, loggedOutItems,
  logo, logoAltText, logoDestination,
  username, loggedIn, stickyOnMobile,
}) => {
  const intl = useIntl();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [userExpanded, setUserExpanded] = React.useState(false);

  const isArabic = useMemo(() => (
    intl.locale && intl.locale.startsWith('ar')
  ) || (
    typeof document !== 'undefined' && document.documentElement.dir === 'rtl'
  ), [intl.locale]);

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
            {/* Close button at top-right (matches marketing site SheetClose) */}
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

            {/* Brand X icon (matches SheetHeader > SheetTitle > KKUxXIcon size-8) */}
            <div className="kkux-mobile-drawer__brand">
              <a href={`${getConfig().LMS_BASE_URL}/dashboard`} aria-label="KKUx">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 80 54" width="32" height="32" aria-hidden="true">
                  <path d="M42.8545 20.34L46.01 24.3C48.0738 24.92 50.2253 25.23 52.4325 25.23C65.1182 25.23 75.8277 14.58 79.1904 0.0199986V0H54.4405C54.4405 0 54.4405 -1.44914e-06 54.4405 0.0199986C52.5919 8.39 48.4244 15.54 42.8545 20.33V20.34Z" fill="url(#kkux-mobile-x-grad1)" />
                  <path d="M0 53.4895H24.7578C26.6065 45.1095 30.774 37.9395 36.3439 33.1695L33.1884 29.1995C31.1245 28.5795 28.9651 28.2695 26.7659 28.2695C14.0722 28.2695 3.36266 38.9195 0 53.4895Z" fill="url(#kkux-mobile-x-grad2)" />
                  <path d="M9.94434 0.0195312L33.1881 29.1895L36.3436 33.1595C36.3436 33.1595 36.3436 33.1595 36.3596 33.1395L52.5673 53.4795H69.2611L67.771 51.6095L45.9933 24.2895L42.8379 20.3295C42.8379 20.3295 42.8219 20.3295 42.8219 20.3495L26.6381 0.0195312H9.94434Z" fill="currentColor" />
                  <defs>
                    <linearGradient id="kkux-mobile-x-grad1" x1="44.5438" y1="22.28" x2="79.0291" y2="5.72351" gradientUnits="userSpaceOnUse">
                      <stop stopColor="currentColor" stopOpacity="0" />
                      <stop offset="0.46" stopColor="currentColor" />
                      <stop offset="1" stopColor="currentColor" />
                    </linearGradient>
                    <linearGradient id="kkux-mobile-x-grad2" x1="10.1836" y1="47.9995" x2="37.4221" y2="38.1996" gradientUnits="userSpaceOnUse">
                      <stop stopColor="currentColor" />
                      <stop offset="0.54" stopColor="currentColor" />
                      <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </a>
            </div>

            {/* Actions row: language switcher + user toggle side by side (matches marketing site NavbarActions) */}
            {(loggedIn || loggedOutItems.length > 0) && (
              <div className="kkux-mobile-drawer__actions">
                <LanguageSwitcher />
                {loggedIn ? (
                  <button
                    type="button"
                    className="kkux-mobile-drawer__user-toggle"
                    onClick={() => setUserExpanded(!userExpanded)}
                    aria-expanded={userExpanded}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="8" r="4" fill="currentColor" />
                      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                    <span className="kkux-mobile-drawer__username">{username}</span>
                    <svg
                      className={`kkux-mobile-drawer__chevron${userExpanded ? ' kkux-mobile-drawer__chevron--open' : ''}`}
                      width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"
                    >
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ) : (
                  <div className="kkux-mobile-drawer__logged-out">
                    <MobileLoggedOutItemsSlot items={loggedOutItems} />
                  </div>
                )}
              </div>
            )}

            {/* Collapsible user menu (below actions row) */}
            {loggedIn && (
              <div className="kkux-mobile-drawer__user">
                <div className={`kkux-mobile-drawer__user-menu${userExpanded ? ' kkux-mobile-drawer__user-menu--open' : ''}`}>
                  <MobileUserMenuSlot menu={userMenu} />
                </div>
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
