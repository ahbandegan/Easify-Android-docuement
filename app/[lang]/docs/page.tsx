import { source } from '@/app/source';
import type { Metadata } from 'next';
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { i18n } from '@/lib/i18n';

export default async function Page(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const page = source.getPage([], params.lang);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents }} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateMetadata(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const page = source.getPage([], params.lang);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  } satisfies Metadata;
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
