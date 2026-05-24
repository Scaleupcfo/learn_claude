import { Link } from 'react-router-dom';
import { CONNECTORS } from '../lib/curriculum';
import { useTimeOnPage } from '../hooks/useTimeOnPage';
import CompleteButton from '../components/CompleteButton';

export default function SetupConnectorsPage() {
  useTimeOnPage('setup.connectors');

  return (
    <div className="max-w-5xl mx-auto">
      <h1>Wire your connectors</h1>
      <p className="text-ink-600">
        Connectors are how Claude reaches into your tools — your inbox, calendar, drive, design files.
        Tap one to see step-by-step setup. <strong>You only need the ones you'll actually use.</strong>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {CONNECTORS.map((c) => (
          <Link
            key={c.id}
            to={`/setup/connectors/${c.id}`}
            className="card hover:shadow-pop transition no-underline text-ink-800"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{c.icon}</div>
              <div className="flex-1">
                <h3 className="mt-0 mb-1">{c.name}</h3>
                <p className="text-xs text-ink-500">{c.why}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex justify-end">
        <CompleteButton
          moduleId="setup.connectors"
          label="✅ I've added the connectors I need"
          nextPath="/build"
        />
      </div>
    </div>
  );
}
