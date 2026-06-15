import React, { useCallback } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { LanguageIcon } from '../Icons';

function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.split('; ').find(c => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
}

function getCsrfToken() {
  const fromDom = document.querySelector('[name=csrfmiddlewaretoken]');
  if (fromDom) return fromDom.value;
  return getCookie('csrftoken') || '';
}

const LanguageSwitcher = () => {
  const intl = useIntl();
  const isArabic = intl.locale && intl.locale.startsWith('ar')
    || (typeof document !== 'undefined' && document.documentElement.dir === 'rtl');

  const handleSwitch = useCallback(() => {
    const targetLang = isArabic ? 'en' : 'ar';
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/i18n/setlang/';
    form.style.display = 'none';

    const csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = 'csrfmiddlewaretoken';
    csrfInput.value = getCsrfToken();

    const langInput = document.createElement('input');
    langInput.type = 'hidden';
    langInput.name = 'language';
    langInput.value = targetLang;

    const nextInput = document.createElement('input');
    nextInput.type = 'hidden';
    nextInput.name = 'next';
    nextInput.value = window.location.pathname + window.location.search;

    form.appendChild(csrfInput);
    form.appendChild(langInput);
    form.appendChild(nextInput);
    document.body.appendChild(form);
    form.submit();
  }, [isArabic]);

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
