import React from 'react';
import PropTypes from 'prop-types';

import { getConfig } from '@edx/frontend-platform';
import { getLoginRedirectUrl } from '@edx/frontend-platform/auth';
import { Hyperlink, Button } from '@openedx/paragon';

import { messages, genericMessages } from './messages';

const AnonymousUserMenu = ({ t }) => {
  return (
    <div className="kkux-logged-out-items">
      <Hyperlink
        className="kkux-logged-out-link"
        destination={`${getConfig().LMS_BASE_URL}/register?next=${encodeURIComponent(global.location.href)}`}
      >
        {t(genericMessages.registerSentenceCase)}
      </Hyperlink>
      <Button
        variant="brand"
        size="sm"
        as="a"
        href={getLoginRedirectUrl(global.location.href)}
      >
        {t(genericMessages.signInSentenceCase)}
      </Button>
    </div>
  );
};

AnonymousUserMenu.propTypes = {
  t: PropTypes.func.isRequired,
};

export default AnonymousUserMenu;
