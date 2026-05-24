// Markdown content loader. Uses Vite's import.meta.glob to bundle all
// /content/**/*.md files as raw strings at build time.

const files = import.meta.glob('../../content/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function normalize(rel: string): string {
  // Keys look like "../../content/modules/welcome.md"
  // Normalize to "modules/welcome" (strip prefix and extension)
  return rel.replace(/^.*content\//, '').replace(/\.md$/, '');
}

const byKey: Record<string, string> = {};
for (const [path, raw] of Object.entries(files)) {
  byKey[normalize(path)] = raw;
}

export function loadMarkdown(key: string): string | null {
  return byKey[key] ?? null;
}

export function listKeys(prefix?: string): string[] {
  const all = Object.keys(byKey);
  return prefix ? all.filter((k) => k.startsWith(prefix)) : all;
}
