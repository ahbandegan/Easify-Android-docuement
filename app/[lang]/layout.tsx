import '../globals.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { I18nProvider } from 'fumadocs-ui/contexts/i18n';
import { Vazirmatn } from 'next/font/google';
import { i18n } from '@/lib/i18n';

const vazirmatn = Vazirmatn({ subsets: ['arabic', 'latin'] });

export const metadata = {
  title: 'EasifyAndroid Documentation',
  description: 'کتابخانه جامع ابزارهای کمکی برای برنامه‌نویسان اندروید (کاتلین)',
};

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

const translations: Record<string, any> = {
  fa: {
    search: 'جستجو',
    searchNoResult: 'نتیجه‌ای یافت نشد',
    toc: 'محتویات صفحه',
    tocNoHeadings: 'عنوانی یافت نشد',
    lastUpdate: 'آخرین بروزرسانی',
    chooseLanguage: 'انتخاب زبان',
    nextPage: 'بعدی',
    previousPage: 'قبلی',
    chooseTheme: 'انتخاب پوسته',
  },
  en: {
    search: 'Search',
    searchNoResult: 'No results found',
    toc: 'On this page',
    tocNoHeadings: 'No headings',
    lastUpdate: 'Last updated',
    chooseLanguage: 'Choose language',
    nextPage: 'Next',
    previousPage: 'Previous',
    chooseTheme: 'Choose theme',
  },
  de: {
    search: 'Suchen',
    searchNoResult: 'Keine Ergebnisse gefunden',
    toc: 'Auf dieser Seite',
    tocNoHeadings: 'Keine Überschriften',
    lastUpdate: 'Zuletzt aktualisiert',
    chooseLanguage: 'Sprache wählen',
    nextPage: 'Nächste',
    previousPage: 'Vorherige',
    chooseTheme: 'Design wählen',
  }
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { children } = props;
  const params = await props.params;
  const dir = params.lang === 'fa' ? 'rtl' : 'ltr';
  return (
    <html lang={params.lang} dir={dir} className={`dark ${vazirmatn.className}`} style={{ colorScheme: 'dark' }} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <RootProvider 
          theme={{ enabled: false }}
          search={{ options: { type: 'static' } }}
        >
          <I18nProvider 
            locale={params.lang} 
            translations={translations[params.lang]}
            locales={[
              { name: 'فارسی', locale: 'fa' },
              { name: 'English', locale: 'en' },
              { name: 'Deutsch', locale: 'de' }
            ]}
          >
            {children}
          </I18nProvider>
        </RootProvider>
      </body>
    </html>
  );
}
