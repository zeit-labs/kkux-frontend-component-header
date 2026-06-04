import React from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { Dropdown } from '@openedx/paragon';

import LearningUserMenuSlot from '../plugin-slots/LearningUserMenuSlot';
import { messages } from './messages';

const AuthenticatedUserDropdown = ({ t, username }) => {
  const dropdownItems = [
    { message: t(messages.dashboard), href: `${getConfig().LMS_BASE_URL}/dashboard` },
    { message: t(messages.profile), href: `${getConfig().ACCOUNT_PROFILE_URL}/u/${username}` },
    { message: t(messages.account), href: getConfig().ACCOUNT_SETTINGS_URL },
    ...(getConfig().ORDER_HISTORY_URL ? [{ message: t(messages.orderHistory), href: getConfig().ORDER_HISTORY_URL }] : []),
    { message: t(messages.signOut), href: getConfig().LOGOUT_URL },
  ];

  return (
    <Dropdown className="kkux-user-dropdown">
      <Dropdown.Toggle variant="outline-primary">
        {/* User avatar icon (matches marketing site UserIcon) */}
        <svg className="kkux-user-dropdown__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="8" r="4" fill="currentColor" />
          <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
        <span className="kkux-user-dropdown__name">{username}</span>
        {/* Chevron down (matches marketing site ChevronDown) */}
        <svg className="kkux-user-dropdown__chevron" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Dropdown.Toggle>
      <Dropdown.Menu className="kkux-user-dropdown__menu">
        <div className="kkux-user-dropdown__label">{t(messages.dashboard)}</div>
        <LearningUserMenuSlot items={dropdownItems} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

AuthenticatedUserDropdown.propTypes = {
  t: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default AuthenticatedUserDropdown;
