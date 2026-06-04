import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { Icon } from '@openedx/paragon';
import { Menu } from '@openedx/paragon';

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

  const logoUrl = getConfig().LOGO_URL;
  const siteName = getConfig().SITE_NAME;

  return (
    <header className="kkux-learning-header">
      <a className="sr-only sr-only-focusable" href="#main-content">
        {t(messages.skipNavLink)}
      </a>
      <div className="kkux-learning-header__inner">
        <a href={`${getConfig().LMS_BASE_URL}/dashboard`} className="kkux-learning-header__logo">
          <img src={logoUrl} alt={siteName} />
        </a>
        <div className="kkux-learning-header__title">
          <CourseInfoSlot courseOrg={courseOrg} courseNumber={courseNumber} courseTitle={courseTitle} />
        </div>
        <div className="kkux-learning-header__actions">
          {showUserDropdown && authenticatedUser && (
            <>
              <LearningHelpSlot />
              <AuthenticatedUserDropdown username={authenticatedUser.username} t={t} />
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
