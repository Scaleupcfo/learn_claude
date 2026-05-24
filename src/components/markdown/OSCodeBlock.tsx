import { useOS } from '../../hooks/useOS';
import type { OS } from '../../hooks/useOS';
import CopyButton from '../CopyButton';

interface Block {
  os: OS;
  language: string;
  code: string;
}

interface Props {
  blocks: Block[];
}

export default function OSCodeBlock({ blocks }: Props) {
  const [os, setOS] = useOS();
  const active = blocks.find((b) => b.os === os) ?? blocks[0];
  return (
    <div className="my-4 not-prose">
      <div className="flex items-center gap-1 mb-1">
        {blocks.map((b) => (
          <button
            key={b.os}
            onClick={() => setOS(b.os)}
            className={`text-xs px-2 py-1 rounded-md ${
              b.os === os ? 'bg-ink-900 text-white' : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
            }`}
          >
            {b.os === 'mac' ? '🍎 macOS' : b.os === 'windows' ? '🪟 Windows' : '🐧 Linux'}
          </button>
        ))}
        <div className="ml-auto">
          <CopyButton text={active.code} />
        </div>
      </div>
      <pre className="bg-ink-900 text-ink-100 rounded-lg p-3 overflow-x-auto text-sm font-mono">
        <code>{active.code}</code>
      </pre>
    </div>
  );
}
