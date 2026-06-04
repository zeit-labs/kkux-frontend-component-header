import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';

import AnonymousUserMenu from './AnonymousUserMenu';
import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';
import CourseInfoSlot from '../plugin-slots/CourseInfoSlot';
import { courseInfoDataShape } from './LearningHeaderCourseInfo';
import { messages, arMessages } from './messages';
import LearningHelpSlot from '../plugin-slots/LearningHelpSlot';

const LearningHeader = ({
  courseOrg, courseNumber, courseTitle, showUserDropdown,
}) => {
  const intl = useIntl();
  const { authenticatedUser } = useContext(AppContext);
  const isArabic = intl.locale && intl.locale.startsWith('ar')
    || (typeof document !== 'undefined' && document.documentElement.dir === 'rtl');

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
    <header className="kkux-header">
      <a className="sr-only sr-only-focusable" href="#main-content">
        {t(messages.skipNavLink)}
      </a>
      <div className="kkux-header__inner">
        {/* Logo — matches PlatformLogo size-18 (72px) from marketing site */}
        <a
          href={`${getConfig().LMS_BASE_URL}/dashboard`}
          className="kkux-header__logo"
        >
          <img src={getConfig().LOGO_URL} alt={getConfig().SITE_NAME} />
        </a>

        {/* Course title (desktop only) */}
        <div className="kkux-header__title">
          <CourseInfoSlot courseOrg={courseOrg} courseNumber={courseNumber} courseTitle={courseTitle} />
        </div>

        {/* Actions: help + user dropdown or login */}
        <div className="kkux-header__actions">
          {showUserDropdown && authenticatedUser && (
            <>
              <LearningHelpSlot />
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
