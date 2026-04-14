'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Locale } from '@/types';
import { t as translate } from '@/lib/i18n';

interface LangContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LangContext = createContext<LangContextType>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => key,
  dir: 'ltr',
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ar');

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    document.body.style.fontFamily = newLocale === 'ar'
      ? "'SF Pro AR', 'SF Arabic', 'SF Pro Arabic', -apple-system, 'Geeza Pro', 'Helvetica Neue', system-ui, sans-serif"
      : "-apple-system, 'SF Pro Display', 'SF Pro Text', BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', system-ui, sans-serif";
  }, []);

  const t = useCallback((key: string) => translate(key, locale), [locale]);

  return (
    <LangContext.Provider value={{ locale, setLocale, t, dir: locale === 'ar' ? 'rtl' : 'ltr' }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
