import { loadMarkdown } from '../lib/content';
import MarkdownRenderer from '../components/markdown/MarkdownRenderer';

export default function HelpPage() {
  const md = loadMarkdown('troubleshooting/common-fixes') ?? '# Troubleshooting\n\n_Coming soon._';
  return (
    <div className="max-w-3xl mx-auto">
      <MarkdownRenderer source={md} />
    </div>
  );
}
