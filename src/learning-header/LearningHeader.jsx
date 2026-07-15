import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import Responsive from 'react-responsive';

import AnonymousUserMenu from './AnonymousUserMenu';
import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';
import CourseInfoSlot from '../plugin-slots/CourseInfoSlot';
import { courseInfoDataShape } from './LearningHeaderCourseInfo';
import { messages, arMessages } from './messages';
import MobileHeader from '../mobile-header/MobileHeader';
import LanguageSwitcher from '../components/LanguageSwitcher';
import headerMessages from '../Header.messages';

const LearningHeader = ({
  courseOrg, courseNumber, courseTitle, showUserDropdown,
}) => {
  const intl = useIntl();
  const { authenticatedUser } = useContext(AppContext);
  const isArabic = useMemo(() => (
    intl.locale && intl.locale.startsWith('ar')
  ) || (
    typeof document !== 'undefined' && document.documentElement.dir === 'rtl'
  ), [intl.locale]);

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

  // KKUx: mirror the marketing-site convention of routing apps-domain URLs
  // (account, profile) by swapping the www. subdomain prefix for apps. on
  // the marketing base URL. Matches openEdXPath(_, isMFE=true) in
  // kkux-marketing-site/src/lib/paths.ts:96-105.
  const marketingBase = (getConfig().MARKETING_SITE_BASE_URL || '').replace(/\/+$/, '');
  const appsBase = marketingBase.replace(/^(https?:\/\/)www\./, '$1apps.');

  // 3 groups / 5 items / 2 separators — matches kkux-marketing-site
  // src/components/nav/user-section.tsx structure. The mobile menu
  // (MobileHeader → DesktopHeaderSlot → DesktopHeader →
  // DesktopUserMenuSlot → DesktopHeaderUserMenu) renders separators
  // between consecutive groups automatically.
  const username = authenticatedUser ? (authenticatedUser.name || authenticatedUser.username) : null;
  const userMenu = !authenticatedUser ? [] : [
    {
      heading: null,
      items: [
        { type: 'item', href: `${getConfig().LMS_BASE_URL}/dashboard`, content: t(messages.myCourses) },
        ...(getConfig().ORDER_HISTORY_URL || getConfig().KKUX_INVOICES_URL ? [{
          type: 'item',
          href: (() => {
            const raw = getConfig().ORDER_HISTORY_URL || getConfig().KKUX_INVOICES_URL;
            return raw.startsWith('http') ? raw : `${getConfig().LMS_BASE_URL.replace(/\/+$/, '')}${raw}`;
          })(),
          content: t(messages.orders),
        }] : []),
      ],
    },
    {
      heading: null,
      items: [
        { type: 'item', href: `${appsBase}/account/`, content: t(messages.dashboard) },
        { type: 'item', href: `${appsBase}/profile/u/${username}`, content: t(messages.profile) },
      ],
    },
    {
      heading: null,
      items: [
        { type: 'item', href: getConfig().LOGOUT_URL, content: t(messages.logout), variant: 'destructive' },
      ],
    },
  ];

  return (
    <>
      <Responsive maxWidth={768}>
        <MobileHeader
          logo={getConfig().LOGO_URL}
          logoAltText={getConfig().SITE_NAME}
          logoDestination={getConfig().MARKETING_SITE_BASE_URL || `${getConfig().LMS_BASE_URL}/dashboard`}
          loggedIn={!!authenticatedUser}
          username={username}
          mainMenu={[]}
          userMenu={userMenu}
          loggedOutItems={!authenticatedUser ? [
            { type: 'item', href: getConfig().LOGIN_URL, content: t(headerMessages['header.user.menu.login']) },
          ] : []}
        />
      </Responsive>
      <Responsive minWidth={769}>
        <header className="kkux-header">
          <a className="sr-only sr-only-focusable" href="#main-content">
            {t(messages.skipNavLink)}
          </a>
          <div className="kkux-header__inner">
            {/* Logo — matches PlatformLogo size-18 (72px) from marketing site */}
            <a
              href={getConfig().MARKETING_SITE_BASE_URL || `${getConfig().LMS_BASE_URL}/dashboard`}
              className="kkux-header__logo"
            >
              <img src={getConfig().LOGO_URL} alt={getConfig().SITE_NAME} />
            </a>

            {/* Course title (desktop only) */}
            <div className="kkux-header__title">
              <CourseInfoSlot courseOrg={courseOrg} courseNumber={courseNumber} courseTitle={courseTitle} />
            </div>

            {/* Actions: language switcher + user dropdown or login */}
            <div className="kkux-header__actions">
              <LanguageSwitcher />
              {showUserDropdown && authenticatedUser && (
                <>
                  <AuthenticatedUserDropdown
                    t={t}
                  />
                </>
              )}
              {showUserDropdown && !authenticatedUser && (
                <AnonymousUserMenu t={t} />
              )}
            </div>
          </div>
        </header>
      </Responsive>
    </>
  );
};

LearningHeader.propTypes = {
  courseOrg: courseInfoDataShape.courseOrg,
  courseNumber: courseInfoDataShape.courseNumber,
  courseTitle: courseInfoDataShape.courseTitle,
  showUserDropdown: PropTypes.bool,
};

LearningHeader.defaultProps = {
  courseOrg: null,
  courseNumber: null,
  courseTitle: null,
  showUserDropdown: true,
};

export default LearningHeader;
