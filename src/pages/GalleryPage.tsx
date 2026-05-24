import samples from '../../content/gallery/samples.json';
import { Link } from 'react-router-dom';

interface Sample {
  title: string;
  goalId: string;
  blurb: string;
  emoji?: string;
}

export default function GalleryPage() {
  const items = samples as Sample[];
  return (
    <div className="max-w-5xl mx-auto">
      <h1>Sample outputs</h1>
      <p className="text-ink-600">
        Real things CXOs have built with Claude. Pick one that looks like what you want,
        then jump into the matching goal.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {items.map((s) => (
          <Link
            key={s.title}
            to={`/build/${s.goalId}`}
            className="card hover:shadow-pop transition no-underline text-ink-800"
          >
            <div className="text-3xl">{s.emoji ?? '🧩'}</div>
            <h3 className="mt-2 mb-1">{s.title}</h3>
            <p className="text-sm text-ink-500">{s.blurb}</p>
            <div className="text-xs text-brand-600 mt-3">Build this →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
