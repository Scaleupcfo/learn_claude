import { Link, useParams } from 'react-router-dom';
import { getGoal, goalModuleId, getConnector } from '../lib/curriculum';
import { useTimeOnPage } from '../hooks/useTimeOnPage';
import { loadMarkdown } from '../lib/content';
import MarkdownRenderer from '../components/markdown/MarkdownRenderer';
import CompleteButton from '../components/CompleteButton';

export default function GoalPage() {
  const { goalId = '' } = useParams();
  const goal = getGoal(goalId);
  useTimeOnPage(goal ? goalModuleId(goal.id) : null);
  const md = loadMarkdown(`build/${goalId}`) ?? `# ${goal?.title ?? goalId}\n\n_Lesson coming soon._`;

  if (!goal) {
    return (
      <div className="max-w-2xl mx-auto">
        <p>Unknown goal. <Link to="/build">← Back</Link></p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/build" className="text-sm text-ink-500">← All goals</Link>
      <div className="flex items-start gap-3 mt-2">
        <span className="text-3xl">{goal.icon}</span>
        <div className="flex-1">
          <h1 className="mb-1">{goal.title}</h1>
          <p className="text-ink-600">{goal.blurb}</p>
          <p className="text-xs text-ink-400 mt-1">~{goal.estimatedMinutes} min</p>
        </div>
      </div>

      {goal.requiresConnectors && goal.requiresConnectors.length > 0 && (
        <div className="mt-4 card border-brand-200 bg-brand-50/40">
          <strong className="text-sm">Before you start —</strong> you'll need these connectors wired:{' '}
          {goal.requiresConnectors.map((cid, i) => {
            const c = getConnector(cid);
            return (
              <span key={cid}>
                {i > 0 ? ', ' : ' '}
                <Link to={`/setup/connectors/${cid}`} className="font-medium">
                  {c?.icon} {c?.name ?? cid}
                </Link>
              </span>
            );
          })}.
        </div>
      )}

      <hr className="my-6 border-ink-100" />
      <MarkdownRenderer source={md} />

      <div className="mt-8 border-t border-ink-100 pt-4 flex justify-end gap-2 items-start">
        <Link to="/build" className="btn-secondary no-underline">Try another goal</Link>
        <CompleteButton
          moduleId={goalModuleId(goal.id)}
          label="✅ I built this"
          nextPath="/build"
        />
      </div>
    </div>
  );
}
