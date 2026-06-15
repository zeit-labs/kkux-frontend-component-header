import React, { useCallback } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import { LanguageIcon } from '../Icons';

function getCsrfToken() {
  if (typeof document === 'undefined') return '';
  const fromDom = document.querySelector('[name=csrfmiddlewaretoken]');
  if (fromDom) return fromDom.value;
  const match = document.cookie.split('; ').find(c => c.startsWith('csrftoken='));
  return match ? decodeURIComponent(match.split('=')[1]) : '';
}

const LanguageSwitcher = () => {
  const intl = useIntl();
  const config = getConfig();
  const isArabic = intl.locale && intl.locale.startsWith('ar')
    || (typeof document !== 'undefined' && document.documentElement.dir === 'rtl');

  const handleSwitch = useCallback(() => {
    const targetLang = isArabic ? 'en' : 'ar';
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `${config.LMS_BASE_URL}/i18n/setlang/`;
    form.style.display = 'none';

    const csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = 'csrfmiddlewaretoken';
    csrfInput.value = getCsrfToken();

    const langInput = document.createElement('input');
    langInput.type = 'hidden';
    langInput.name = 'language';
    langInput.value = targetLang;

    // Redirect back to LMS /dashboard which proxies to learner-dashboard MFE
    const nextInput = document.createElement('input');
    nextInput.type = 'hidden';
    nextInput.name = 'next';
    nextInput.value = '/dashboard';

    form.appendChild(csrfInput);
    form.appendChild(langInput);
    form.appendChild(nextInput);
    document.body.appendChild(form);
    form.submit();
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
