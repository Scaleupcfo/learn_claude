import type * as React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Term from './Term';
import PromptSkeleton from './PromptSkeleton';
import Checkpoint from './Checkpoint';
import OSCodeBlock from './OSCodeBlock';
import type { OS } from '../../hooks/useOS';
import CopyButton from '../CopyButton';

// Allow inline HTML-like custom tags by hijacking specific element renderers.
// Our markdown content uses these conventions:
//
//   <Term>MCP</Term>
//   <PromptSkeleton fields="audience, tone" template="..."/>
//   <Checkpoint id="install.ran">Claude Code opened successfully</Checkpoint>
//   <OSBlock>
//     ```bash mac
//     brew install …
//     ```
//     ```powershell windows
//     winget install …
//     ```
//   </OSBlock>
//
// react-markdown with `remark-gfm` does NOT pass through arbitrary HTML by
// default; we use the `rehype-raw` plugin via a thin custom transform —
// simplest approach is to pre-parse our custom tags from the markdown string
// before passing to react-markdown.

function preprocess(md: string): {
  text: string;
  components: Record<string, () => React.JSX.Element>;
} {
  const components: Record<string, () => React.JSX.Element> = {};
  let counter = 0;

  // Replace <PromptSkeleton .../> and <PromptSkeleton ...>...</PromptSkeleton>
  // with a placeholder code block that we then transform in a custom renderer.
  // For simplicity in v1 we use a lightweight token system: we wrap custom
  // components in special fenced code blocks ```ll-<name>``` with JSON payload.

  // PromptSkeleton self-closing
  md = md.replace(/<PromptSkeleton([^>]*?)\/>/g, (_m, attrs: string) => {
    const id = `ll-${counter++}`;
    const props = parseAttrs(attrs);
    components[id] = () => <PromptSkeleton template={props.template ?? ''} fields={props.fields} />;
    return `\n\n%%COMPONENT:${id}%%\n\n`;
  });

  // PromptSkeleton with body as template
  md = md.replace(/<PromptSkeleton([^>]*?)>([\s\S]*?)<\/PromptSkeleton>/g, (_m, attrs: string, body: string) => {
    const id = `ll-${counter++}`;
    const props = parseAttrs(attrs);
    components[id] = () => <PromptSkeleton template={body.trim()} fields={props.fields} />;
    return `\n\n%%COMPONENT:${id}%%\n\n`;
  });

  // Checkpoint
  md = md.replace(/<Checkpoint([^>]*?)>([\s\S]*?)<\/Checkpoint>/g, (_m, attrs: string, body: string) => {
    const id = `ll-${counter++}`;
    const props = parseAttrs(attrs);
    components[id] = () => <Checkpoint id={props.id ?? `unknown-${counter}`}>{body.trim()}</Checkpoint>;
    return `\n\n%%COMPONENT:${id}%%\n\n`;
  });

  // Term
  md = md.replace(/<Term>([\s\S]*?)<\/Term>/g, (_m, body: string) => {
    const id = `ll-${counter++}`;
    components[id] = () => <Term>{body.trim()}</Term>;
    return `%%COMPONENT:${id}%%`;
  });

  // OSBlock: wraps multiple ```lang os``` fenced blocks.
  md = md.replace(/<OSBlock>([\s\S]*?)<\/OSBlock>/g, (_m, body: string) => {
    const blocks: { os: OS; language: string; code: string }[] = [];
    const re = /```(\w+)\s+(mac|windows|linux)\n([\s\S]*?)```/g;
    let match: RegExpExecArray | null;
    while ((match = re.exec(body)) !== null) {
      blocks.push({ language: match[1], os: match[2] as OS, code: match[3].replace(/\n$/, '') });
    }
    const id = `ll-${counter++}`;
    components[id] = () => <OSCodeBlock blocks={blocks} />;
    return `\n\n%%COMPONENT:${id}%%\n\n`;
  });

  return { text: md, components };
}

function parseAttrs(s: string): Record<string, string> {
  const out: Record<string, string> = {};
  const re = /(\w+)="([^"]*)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s)) !== null) {
    out[m[1]] = m[2];
  }
  return out;
}

export default function MarkdownRenderer({ source }: { source: string }) {
  const { text, components } = preprocess(source);

  const md: Components = {
    p({ children }) {
      // If a paragraph is just a component token, render the component instead.
      const str = childrenToString(children);
      const tok = str.match(/^%%COMPONENT:(ll-\d+)%%$/);
      if (tok && components[tok[1]]) {
        const Comp = components[tok[1]];
        return <Comp />;
      }
      return <p>{replaceInlineTokens(children, components)}</p>;
    },
    code({ children, className, ...rest }) {
      // Inline code or fenced code
      const isBlock = (rest as { node?: { tagName?: string } }).node?.tagName === 'code';
      const lang = (className || '').replace(/^language-/, '');
      const text = String(children).replace(/\n$/, '');
      if (!className) {
        return <code>{children}</code>;
      }
      void isBlock;
      return (
        <div className="not-prose my-3">
          <div className="flex justify-end -mb-1">
            <CopyButton text={text} />
          </div>
          <pre className="bg-ink-900 text-ink-100 rounded-lg p-3 overflow-x-auto text-sm font-mono">
            <code className={`language-${lang}`}>{text}</code>
          </pre>
        </div>
      );
    },
    a({ href, children }) {
      const isExternal = href?.startsWith('http');
      return (
        <a href={href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noreferrer' : undefined}>
          {children}
        </a>
      );
    },
  };

  return (
    <div className="prose-cxo">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={md}>
        {text}
      </ReactMarkdown>
    </div>
  );
}

function childrenToString(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(childrenToString).join('');
  if (children && typeof children === 'object' && 'props' in (children as object)) {
    const props = (children as { props?: { children?: React.ReactNode } }).props;
    return childrenToString(props?.children);
  }
  return '';
}

function replaceInlineTokens(
  children: React.ReactNode,
  components: Record<string, () => React.JSX.Element>,
): React.ReactNode {
  if (typeof children === 'string') {
    const parts: React.ReactNode[] = [];
    const re = /%%COMPONENT:(ll-\d+)%%/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(children)) !== null) {
      if (m.index > last) parts.push(children.slice(last, m.index));
      const Comp = components[m[1]];
      parts.push(Comp ? <Comp key={m[1]} /> : m[0]);
      last = m.index + m[0].length;
    }
    if (last < children.length) parts.push(children.slice(last));
    return parts.length ? parts : children;
  }
  if (Array.isArray(children)) {
    return children.map((c, i) => (
      <span key={i}>{replaceInlineTokens(c, components)}</span>
    ));
  }
  return children;
}
