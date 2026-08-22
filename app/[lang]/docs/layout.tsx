import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/app/source';
import { GithubInfo } from 'fumadocs-ui/components/github-info';
import ScrollToTop from '@/app/ScrollToTop';

import { i18n } from '@/lib/i18n';

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export default async function RootDocsLayout(props: { 
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { children } = props;
  const params = await props.params;
  return (
    <DocsLayout 
      tree={source.pageTree[params.lang]} 
      i18n={true}
      nav={{
        title: 'EasifyAndroid Docs',
      }}
      sidebar={{
        defaultOpenLevel: 1,
        footer: (
          <div key="github-footer" className="w-full p-2">
            <GithubInfo 
              owner="ahbandegan" 
              repo="Easify-Android" 
              className="w-full flex-col items-start bg-fd-card/50 border border-fd-border hover:bg-fd-accent transition-all p-3 rounded-xl shadow-sm"
            />
          </div>
        )
      }}
    >
      <ScrollToTop />
      {children}
    </DocsLayout>
  );
}
