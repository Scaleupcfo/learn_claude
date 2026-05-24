import { Link, useParams } from 'react-router-dom';
import { getConnector } from '../lib/curriculum';
import { loadMarkdown } from '../lib/content';
import MarkdownRenderer from '../components/markdown/MarkdownRenderer';

export default function ConnectorDetailPage() {
  const { id = '' } = useParams();
  const connector = getConnector(id);
  const md = loadMarkdown(`connectors/${id}`) ?? `# ${connector?.name ?? id}\n\n_Setup notes coming soon._`;

  if (!connector) {
    return (
      <div className="max-w-2xl mx-auto">
        <p>Unknown connector. <Link to="/setup/connectors">← Back</Link></p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/setup/connectors" className="text-sm text-ink-500">← All connectors</Link>
      <h1 className="mt-2">{connector.icon} {connector.name}</h1>
      <p className="text-ink-600">{connector.why}</p>
      <hr className="my-6 border-ink-100" />
      <MarkdownRenderer source={md} />
    </div>
  );
}
