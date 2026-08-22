import Link from 'next/link';

const dictionaries = {
  fa: {
    badge: 'متن‌باز و رایگان برای همیشه',
    titleLine1: 'مجموعه ابزارهای EasifyAndroid.',
    titleLine2: 'قدرتمند، بهینه، سریع.',
    description: 'کتابخانه جامع کامپوننت‌ها و ابزارهای اندروید با تمرکز بر معماری کاتلین. فقط کپی کنید، پیست کنید و لذت ببرید.',
    startDocs: 'شروع مستندات',
    github: 'مشاهده در گیت‌هاب',
    rtl: true,
  },
  en: {
    badge: 'Open-source and free forever',
    titleLine1: 'EasifyAndroid Tools Suite.',
    titleLine2: 'Powerful, optimized, fast.',
    description: 'A comprehensive library of Android components and tools focused on Kotlin architecture. Just copy, paste, and enjoy.',
    startDocs: 'Start Reading Docs',
    github: 'View on GitHub',
    rtl: false,
  },
  de: {
    badge: 'Open-Source und für immer kostenlos',
    titleLine1: 'EasifyAndroid Werkzeug-Suite.',
    titleLine2: 'Leistungsstark, optimiert, schnell.',
    description: 'Eine umfassende Bibliothek von Android-Komponenten und Werkzeugen mit Fokus auf der Kotlin-Architektur. Einfach kopieren, einfügen und genießen.',
    startDocs: 'Dokumentation starten',
    github: 'Auf GitHub ansehen',
    rtl: false,
  },
};

export default async function HomePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as keyof typeof dictionaries || 'fa';
  const dict = dictionaries[lang] || dictionaries['fa'];

  return (
    <main className="flex flex-1 flex-col" dir={dict.rtl ? 'rtl' : 'ltr'}>
      <section className="relative w-full overflow-hidden px-6 py-20">
        <div aria-hidden="true" className="absolute inset-0 -z-10 [background-image:radial-gradient(var(--color-neutral-300)_1px,transparent_1px)] dark:[background-image:radial-gradient(var(--color-neutral-800)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)] [background-size:24px_24px]"></div>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <a target="_blank" rel="noreferrer" className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1 text-xs text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100" href="https://github.com/ahbandegan/Easify-Android">
            {dict.badge}
          </a>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl text-neutral-900 dark:text-white">
            {dict.titleLine1}
            <br/>
            {dict.titleLine2}
          </h1>
          <p className="mt-5 max-w-xl text-balance text-neutral-500 dark:text-neutral-400">
            {dict.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-black dark:bg-white px-4 text-sm font-medium text-white dark:text-black transition-colors hover:opacity-90" href={`/${params.lang}/docs`}>
              {dict.startDocs}
              {dict.rtl ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left size-4 mr-2" aria-hidden="true">
                  <path d="m12 19-7-7 7-7"></path>
                  <path d="M19 12H5"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right size-4 ml-2" aria-hidden="true">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              )}
            </Link>
            <a href="https://github.com/ahbandegan/Easify-Android" target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 px-4 text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">
              {dict.github}
            </a>
          </div>
          
        </div>
      </section>
    </main>
  );
}
