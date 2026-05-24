import { useTimeOnPage } from '../hooks/useTimeOnPage';
import { loadMarkdown } from '../lib/content';
import MarkdownRenderer from '../components/markdown/MarkdownRenderer';
import CompleteButton from '../components/CompleteButton';

export default function SetupInstallPage() {
  useTimeOnPage('setup.install');
  const md = loadMarkdown('modules/setup-install') ?? '# Install\n\n_Content coming soon._';

  return (
    <div className="max-w-3xl mx-auto">
      <MarkdownRenderer source={md} />
      <div className="mt-8 border-t border-ink-100 pt-4 flex justify-end">
        <CompleteButton
          moduleId="setup.install"
          label="✅ I've installed Claude Code"
          nextPath="/setup/connectors"
        />
      </div>
    </div>
  );
}
