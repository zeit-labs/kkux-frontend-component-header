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

  return (
    <>
      <Responsive maxWidth={768}>
        <MobileHeader
          logo={getConfig().LOGO_URL}
          logoAltText={getConfig().SITE_NAME}
          logoDestination={getConfig().MARKETING_SITE_BASE_URL || `${getConfig().LMS_BASE_URL}/dashboard`}
          loggedIn={!!authenticatedUser}
          username={authenticatedUser?.username}
          mainMenu={[]}
          userMenu={authenticatedUser ? [{
            heading: authenticatedUser.username,
            items: [
              { type: 'item', href: `${getConfig().LMS_BASE_URL}/dashboard`, content: t(messages.myCourses) },
              { type: 'item', href: getConfig().LOGOUT_URL, content: t(messages.logout), variant: 'destructive' },
            ],
          }] : []}
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
                    username={authenticatedUser.username}
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
