import React, { useCallback } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { LanguageIcon } from '../Icons';

function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.split('; ').find(c => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
}

const LanguageSwitcher = () => {
  const intl = useIntl();
  const config = getConfig();
  const isArabic = intl.locale && intl.locale.startsWith('ar')
    || (typeof document !== 'undefined' && document.documentElement.dir === 'rtl');

  const handleSwitch = useCallback(async () => {
    const targetLang = isArabic ? 'en' : 'ar';
    const username = getCookie('edx-user-info') ? JSON.parse(decodeURIComponent(getCookie('edx-user-info')))?.username : null;

    try {
      // 1. Save preference via API (Account MFE approach)
      await getAuthenticatedHttpClient().patch(
        `${config.LMS_BASE_URL}/api/user/v1/preferences/${username}`,
        { 'pref-lang': targetLang },
        { headers: { 'Content-Type': 'application/merge-patch+json' } },
      );

      // 2. Notify LMS to set language cookie
      const formData = new FormData();
      formData.append('language', targetLang);
      await getAuthenticatedHttpClient().post(
        `${config.LMS_BASE_URL}/i18n/setlang/`,
        formData,
      );
    } catch (e) {
      // Fall through to reload anyway
    }

    // 3. Reload page with new language
    window.location.reload();
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
