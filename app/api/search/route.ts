import { source } from '@/app/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const { staticGET: GET } = createFromSource(source);

// Next.js will export this route statically since we are in output: 'export' mode
export const dynamic = 'force-static';
export const revalidate = false;
