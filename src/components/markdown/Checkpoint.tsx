import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { listChecklist, setChecklistItem } from '../../lib/progress';

interface Props {
  id: string;
  children?: React.ReactNode;
}

export default function Checkpoint({ id, children }: Props) {
  const { user } = useAuth();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!user) return;
    void listChecklist(user.id).then((rows) => {
      const row = rows.find((r) => r.item_id === id);
      if (row) setChecked(row.checked);
    });
  }, [user, id]);

  const toggle = () => {
    const next = !checked;
    setChecked(next);
    if (user) void setChecklistItem(user.id, id, next);
  };

  return (
    <label className="flex items-start gap-3 p-3 my-3 border border-ink-200 rounded-lg bg-white not-prose cursor-pointer hover:border-ink-300">
      <input
        type="checkbox"
        checked={checked}
        onChange={toggle}
        className="mt-1 h-4 w-4 accent-brand-600"
      />
      <span className={`text-sm ${checked ? 'text-ink-400 line-through' : 'text-ink-800'}`}>
        {children}
      </span>
    </label>
  );
}
