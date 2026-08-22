import './globals.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Vazirmatn } from 'next/font/google';

const vazirmatn = Vazirmatn({ subsets: ['arabic', 'latin'] });

export const metadata = {
  title: 'EasifyAndroid Documentation',
  description: 'کتابخانه جامع ابزارهای کمکی برای برنامه‌نویسان اندروید (کاتلین)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
