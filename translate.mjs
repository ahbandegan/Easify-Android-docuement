import fs from 'fs';
import path from 'path';
import { translate } from 'bing-translate-api';

const docsDir = path.join(process.cwd(), 'content', 'docs');

async function translateText(text, targetLang) {
  try {
    const res = await translate(text, null, targetLang);
    return res.translation;
  } catch (err) {
    console.error(`Translation error for ${targetLang}:`, err);
    return text; // Fallback to original text on error
  }
}

async function processFile(filename) {
  if (!filename.endsWith('.fa.mdx')) return;
  const filePath = path.join(docsDir, filename);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Skip files that were already translated manually (index, easify-android, easify-biometric)
  if (['index.fa.mdx', 'easify-android.fa.mdx', 'easify-biometric.fa.mdx'].includes(filename)) {
    return;
  }

  console.log(`Processing ${filename}...`);

  // Extract frontmatter
  let textToTranslate = content;
  const blocks = [];

  // Match Frontmatter
  textToTranslate = textToTranslate.replace(/^---\n([\s\S]*?)\n---/m, (match) => {
    blocks.push(match); // We will manually translate frontmatter later if needed, but for script just preserve it
    return `[[[BLOCK_${blocks.length - 1}]]]`;
  });

  // Match Code Blocks
  textToTranslate = textToTranslate.replace(/```[\s\S]*?```/g, (match) => {
    blocks.push(match);
    return `[[[BLOCK_${blocks.length - 1}]]]`;
  });

  // Match Inline Code
  textToTranslate = textToTranslate.replace(/`[^`\n]+`/g, (match) => {
    blocks.push(match);
    return `[[[BLOCK_${blocks.length - 1}]]]`;
  });

  // Split into chunks if too long (simple split by double newline)
  const chunks = textToTranslate.split('\n\n');
  
  const translateChunks = async (lang) => {
    const translatedChunks = [];
    
    let currentBatch = [];
    let currentBatchLength = 0;
    
    // Function to translate and flush current batch
    const flushBatch = async () => {
      if (currentBatch.length === 0) return;
      
      const batchText = currentBatch.join('\n\n');
      
      // If batch is just blocks, don't translate
      if (/^(\s*\[\[\[BLOCK_\d+\]\]\]\s*)+$/.test(batchText)) {
        translatedChunks.push(batchText);
      } else {
        const t = await translateText(batchText, lang);
        translatedChunks.push(t);
        console.log(`Translated batch to ${lang} (${batchText.length} chars). Sleeping 2s...`);
        await new Promise(r => setTimeout(r, 2000));
      }
      
      currentBatch = [];
      currentBatchLength = 0;
    };

    for (let chunk of chunks) {
      if (chunk.trim() === '') {
        currentBatch.push(chunk);
        continue;
      }
      
      if (currentBatchLength + chunk.length > 800) {
        await flushBatch();
      }
      
      currentBatch.push(chunk);
      currentBatchLength += chunk.length;
    }
    
    await flushBatch();

    return translatedChunks.join('\n\n');
  };

  const enText = await translateChunks('en');
  const deText = await translateChunks('de');

  // Re-insert blocks
  const reinsert = (text) => {
    return text.replace(/\[\[\[BLOCK_(\d+)\]\]\]/g, (match, p1) => {
      const idx = parseInt(p1, 10);
      return blocks[idx];
    });
  };

  const finalEn = reinsert(enText);
  const finalDe = reinsert(deText);

  fs.writeFileSync(path.join(docsDir, filename.replace('.fa.mdx', '.en.mdx')), finalEn);
  fs.writeFileSync(path.join(docsDir, filename.replace('.fa.mdx', '.de.mdx')), finalDe);
  console.log(`Finished ${filename}`);
}

async function run() {
  const files = fs.readdirSync(docsDir);
  for (const file of files) {
    await processFile(file);
  }
  console.log('All translations completed!');
}

run();
