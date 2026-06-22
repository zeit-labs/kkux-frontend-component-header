import React from 'react';
import PropTypes from 'prop-types';

import { getConfig } from '@edx/frontend-platform';
import { getLoginRedirectUrl } from '@edx/frontend-platform/auth';
import { Hyperlink, Button } from '@openedx/paragon';

import { messages, genericMessages } from './messages';

const AnonymousUserMenu = ({ t }) => {
  return (
    <div className="kkux-logged-out">
      {/* Register link — ghost text (matches marketing site: "Start your learning journey" + chevron) */}
      <Hyperlink
        className="kkux-logged-out__link"
        destination={`${getConfig().LMS_BASE_URL}/register?next=${encodeURIComponent(global.location.href)}`}
      >
        {t(genericMessages.registerSentenceCase)}
      </Hyperlink>
      {/* Sign In button — brand variant (pillar-500 green, matches marketing site primary button) */}
      <Button
        variant="brand"
        size="sm"
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
