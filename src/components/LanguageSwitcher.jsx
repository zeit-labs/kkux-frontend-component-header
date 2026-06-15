import React, { useCallback } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { LanguageIcon } from '../Icons';

const LanguageSwitcher = () => {
  const intl = useIntl();
  const config = getConfig();
  const isArabic = intl.locale && intl.locale.startsWith('ar')
    || (typeof document !== 'undefined' && document.documentElement.dir === 'rtl');

  const handleSwitch = useCallback(async () => {
    const targetLang = isArabic ? 'en' : 'ar';

    try {
      // Use authenticated client — same approach as Account MFE
      await getAuthenticatedHttpClient().patch(
        `${config.LMS_BASE_URL}/api/user/v1/preferences/admin`,
        { 'pref-lang': targetLang },
        { headers: { 'Content-Type': 'application/merge-patch+json' } },
      );

      const formData = new FormData();
      formData.append('language', targetLang);
      await getAuthenticatedHttpClient().post(
        `${config.LMS_BASE_URL}/i18n/setlang/`,
        formData,
      );
    } finally {
      window.location.reload();
    }
  }, [isArabic, config.LMS_BASE_URL]);

  return (
    <button
      type="button"
      className="kkux-language-switcher"
      onClick={handleSwitch}
      aria-label={isArabic ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      <LanguageIcon />
    </button>
  );
};

export default LanguageSwitcher;
