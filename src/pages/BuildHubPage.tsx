import { Link } from 'react-router-dom';
import { GOALS, COLUMN_LABELS, COLUMN_ORDER } from '../lib/curriculum';

export default function BuildHubPage() {
  return (
    <div>
      <h1>What do you want to build first?</h1>
      <p className="text-ink-600">
        Pick the one that fits today. You can unlock more goals after you ship your first.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {COLUMN_ORDER.map((col) => {
          const goals = GOALS.filter((g) => g.column === col);
          const meta = COLUMN_LABELS[col];
          return (
            <div key={col}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500 mt-0 mb-3">
                {meta.icon} {meta.label}
              </h2>
              <ul className="space-y-2">
                {goals.map((g) => {
                  const card = (
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{g.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-ink-900">{g.title}</span>
                          {!g.unlocked && (
                            <span className="chip bg-ink-100 text-ink-500">Coming soon</span>
                          )}
                        </div>
                        <p className="text-xs text-ink-500 mt-1">{g.blurb}</p>
                        <div className="text-xs text-ink-400 mt-2">~{g.estimatedMinutes} min</div>
                      </div>
                    </div>
                  );
                  return (
                    <li key={g.id}>
                      {g.unlocked ? (
                        <Link
                          to={`/build/${g.id}`}
                          className="card block p-4 hover:shadow-pop transition no-underline text-ink-800"
                        >
                          {card}
                        </Link>
                      ) : (
                        <div className="card block p-4 opacity-50 cursor-not-allowed select-none">
                          {card}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
