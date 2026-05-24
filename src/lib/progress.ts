import { supabase } from './supabase';
import type { ModuleProgressRow, ModuleStatus, Profile, ChecklistItemRow } from './database.types';
import { MODULES, GOALS, COLUMN_ORDER, goalModuleId } from './curriculum';

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
  if (error) {
    // eslint-disable-next-line no-console
    console.error('getProfile', error);
    return null;
  }
  return data;
}

export async function upsertProfile(p: Partial<Profile> & { id: string }) {
  const { error } = await supabase.from('profiles').upsert(p, { onConflict: 'id' });
  if (error) throw error;
}

export async function listProgress(userId: string): Promise<ModuleProgressRow[]> {
  const { data, error } = await supabase
    .from('module_progress')
    .select('*')
    .eq('user_id', userId);
  if (error) {
    // eslint-disable-next-line no-console
    console.error('listProgress', error);
    return [];
  }
  return data ?? [];
}

export async function setModuleStatus(
  userId: string,
  moduleId: string,
  status: ModuleStatus,
) {
  const now = new Date().toISOString();
  const patch: Partial<ModuleProgressRow> = { status };
  if (status === 'in_progress') patch.started_at = now;
  if (status === 'completed') patch.completed_at = now;
  const { error } = await supabase
    .from('module_progress')
    .upsert({ user_id: userId, module_id: moduleId, ...patch }, { onConflict: 'user_id,module_id' });
  if (error) throw error;
}

export async function addModuleTime(userId: string, moduleId: string, deltaSec: number) {
  if (deltaSec <= 0) return;
  // Read-modify-write — simpler than RPC for v1
  const { data: row } = await supabase
    .from('module_progress')
    .select('time_seconds, status')
    .eq('user_id', userId)
    .eq('module_id', moduleId)
    .maybeSingle();
  const currentSec = row?.time_seconds ?? 0;
  const status: ModuleStatus = row?.status === 'completed' ? 'completed' : 'in_progress';
  await supabase
    .from('module_progress')
    .upsert(
      {
        user_id: userId,
        module_id: moduleId,
        time_seconds: currentSec + deltaSec,
        status,
        started_at: row ? undefined : new Date().toISOString(),
      },
      { onConflict: 'user_id,module_id' },
    );

  // Also bump profile total
  const { data: prof } = await supabase
    .from('profiles')
    .select('total_time_seconds')
    .eq('id', userId)
    .maybeSingle();
  const newTotal = (prof?.total_time_seconds ?? 0) + deltaSec;
  await supabase.from('profiles').update({ total_time_seconds: newTotal }).eq('id', userId);
}

export async function listChecklist(userId: string): Promise<ChecklistItemRow[]> {
  const { data, error } = await supabase
    .from('checklist_items')
    .select('*')
    .eq('user_id', userId);
  if (error) return [];
  return data ?? [];
}

export async function setChecklistItem(userId: string, itemId: string, checked: boolean) {
  await supabase
    .from('checklist_items')
    .upsert({ user_id: userId, item_id: itemId, checked }, { onConflict: 'user_id,item_id' });
}

export function isCertificateEligible(progress: ModuleProgressRow[]): boolean {
  const completedIds = new Set(progress.filter((p) => p.status === 'completed').map((p) => p.module_id));
  // All required setup modules
  const requiredOk = MODULES.filter((m) => m.required && m.id !== 'ship.certificate').every((m) =>
    completedIds.has(m.id),
  );
  if (!requiredOk) return false;
  // At least one goal per column
  return COLUMN_ORDER.every((col) =>
    GOALS.filter((g) => g.column === col).some((g) => completedIds.has(goalModuleId(g.id))),
  );
}

export function moduleStatusMap(progress: ModuleProgressRow[]): Map<string, ModuleStatus> {
  const m = new Map<string, ModuleStatus>();
  for (const p of progress) m.set(p.module_id, p.status);
  return m;
}
