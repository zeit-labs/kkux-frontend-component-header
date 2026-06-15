import React, { useCallback } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { LanguageIcon } from '../Icons';

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

    const csrf = document.querySelector('[name=csrfmiddlewaretoken]');
    const csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = 'csrfmiddlewaretoken';
    csrfInput.value = csrf ? csrf.value : '';

    const langInput = document.createElement('input');
    langInput.type = 'hidden';
    langInput.name = 'language';
    langInput.value = targetLang;

    form.appendChild(csrfInput);
    form.appendChild(langInput);
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
