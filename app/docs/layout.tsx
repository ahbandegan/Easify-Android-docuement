import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/app/source';
import { GithubInfo } from 'fumadocs-ui/components/github-info';
import ScrollToTop from '@/app/ScrollToTop';

export default function RootDocsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout 
      tree={source.pageTree} 
      nav={{
        title: 'EasifyAndroid Docs',
      }}
      sidebar={{
        defaultOpenLevel: 1,
        footer: (
          <div key="github-footer" className="flex flex-1 justify-end items-center mr-2">
            <GithubInfo 
              owner="ahbandegan" 
              repo="Easify-Android" 
              className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
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
