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
        <svg className="kkux-user-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor" />
        </svg>
        <span className="d-none d-md-inline kkux-username">{username}</span>
        <span className="kkux-chevron" aria-hidden="true">&#9662;</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu-right">
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
