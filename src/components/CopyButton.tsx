import { useState } from 'react';

interface Props {
  text: string;
  label?: string;
  className?: string;
}

export default function CopyButton({ text, label = 'Copy', className = '' }: Props) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };
  return (
    <button onClick={copy} className={`btn-secondary text-xs ${className}`} type="button">
      {copied ? '✓ Copied' : `📋 ${label}`}
    </button>
  );
}
