import { Link } from 'react-router-dom';
import { GOALS, COLUMN_LABELS, COLUMN_ORDER } from '../lib/curriculum';

export default function BuildHubPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1>What do you want to make first?</h1>
      <p className="text-ink-600">
        Pick anything. You can come back and try others — the certificate unlocks once
        you've built <strong>at least one thing from each column</strong>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        {COLUMN_ORDER.map((col) => {
          const goals = GOALS.filter((g) => g.column === col);
          const meta = COLUMN_LABELS[col];
          return (
            <div key={col}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500 mt-0 mb-3">
                {meta.icon} {meta.label}
              </h2>
              <ul className="space-y-2">
                {goals.map((g) => (
                  <li key={g.id}>
                    <Link
                      to={`/build/${g.id}`}
                      className="card block hover:shadow-pop transition no-underline text-ink-800 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xl">{g.icon}</span>
                        <div className="flex-1">
                          <div className="font-semibold text-ink-900">{g.title}</div>
                          <p className="text-xs text-ink-500 mt-1">{g.blurb}</p>
                          <div className="text-xs text-ink-400 mt-2">~{g.estimatedMinutes} min</div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
