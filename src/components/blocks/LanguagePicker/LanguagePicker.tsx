import React, { useEffect, useId, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { AvailableLanguages, useUi } from '~/assets/translation';
import { setLanguage } from '~/store/settings/slice';
import { useAppDispatch } from '~/store/hooks';

import './languagePicker.scss';

const TranslateIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="currentColor"
      d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="currentColor"
      d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
    />
  </svg>
);

export const LanguagePicker = () => {
  const dispatch = useAppDispatch();
  const { lang, ui } = useUi();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (code: string) => {
    if (code !== lang) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set('lang', code);
      setSearchParams(nextParams, { replace: true });
      dispatch(setLanguage(code));
    }

    setIsOpen(false);
  };

  return (
    <div className="language-picker">
      <button
        type="button"
        className="language-picker__button"
        aria-label={ui.language.title}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
      >
        <TranslateIcon />
      </button>

      {isOpen ? (
        <div className="language-picker__modal">
          <button
            type="button"
            className="language-picker__backdrop"
            aria-label={ui.language.close}
            onClick={() => setIsOpen(false)}
          />
          <div
            className="language-picker__sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <div className="language-picker__header">
              <h2 id={titleId}>{ui.language.title}</h2>
              <button
                type="button"
                className="language-picker__close"
                aria-label={ui.language.close}
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>
            <ul className="language-picker__list">
              {AvailableLanguages.map(language => {
                const selected = language.code === lang;

                return (
                  <li key={language.code}>
                    <button
                      type="button"
                      className={
                        selected
                          ? 'language-picker__option language-picker__option--selected'
                          : 'language-picker__option'
                      }
                      onClick={() => handleSelect(language.code)}
                    >
                      <span>{language.name}</span>
                      {selected ? <CheckIcon /> : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LanguagePicker;
