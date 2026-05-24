export type GoalColumn = 'communications' | 'presentations' | 'numbers' | 'operations';

export interface Connector {
  id: string;
  name: string;
  category: 'google' | 'microsoft' | 'design' | 'docs' | 'comms' | 'pm' | 'dev' | 'crm' | 'automation';
  why: string;
  icon: string; // emoji for simplicity
}

export interface Goal {
  id: string;
  title: string;
  column: GoalColumn;
  icon: string;
  blurb: string;
  estimatedMinutes: number;
  requiresConnectors?: string[];
  /** If false, the goal is shown in the Build hub but greyed out as "Coming soon". */
  unlocked?: boolean;
}

export interface Module {
  id: string;
  title: string;
  estimatedMinutes: number;
  required: boolean;
  group: 'setup' | 'build' | 'ship';
}

export const CONNECTORS: Connector[] = [
  { id: 'gmail',       name: 'Gmail',                  category: 'google',     icon: '📧', why: 'Draft, triage, and reply to email at exec volume.' },
  { id: 'gcal',        name: 'Google Calendar',        category: 'google',     icon: '📅', why: 'Meeting prep, scheduling, agenda generation.' },
  { id: 'gdrive',      name: 'Google Drive',           category: 'google',     icon: '🗂️', why: 'Pull source docs into prompts without copy-paste.' },
  { id: 'gdocs',       name: 'Google Docs',            category: 'google',     icon: '📄', why: 'Generate and edit memos, SOPs, and policies.' },
  { id: 'gsheets',     name: 'Google Sheets',          category: 'google',     icon: '📊', why: 'Financial models, data analysis, formula help.' },
  { id: 'gslides',     name: 'Google Slides',          category: 'google',     icon: '🎞️', why: 'Generate board decks and pitch decks.' },
  { id: 'ms365',       name: 'Microsoft 365',          category: 'microsoft',  icon: '🏢', why: 'Outlook / Word / Excel / PowerPoint for Office-first execs.' },
  { id: 'figma',       name: 'Figma',                  category: 'design',     icon: '🎨', why: 'Generate UI mockups, design reviews, redlines on screens.' },
  { id: 'canva',       name: 'Canva',                  category: 'design',     icon: '🖼️', why: 'Quick graphics, social posts, one-pagers without a designer.' },
  { id: 'notion',      name: 'Notion',                 category: 'docs',       icon: '📓', why: 'Wiki, OKRs, project pages, meeting notes.' },
  { id: 'slack',       name: 'Slack',                  category: 'comms',      icon: '💬', why: 'Summarize channels, draft announcements, follow-up tracking.' },
  { id: 'linear',      name: 'Linear',                 category: 'pm',         icon: '📌', why: 'Status digests, sprint summaries, ticket triage.' },
  { id: 'jira',        name: 'Jira',                   category: 'pm',         icon: '🧩', why: 'Same as Linear for Atlassian-shop CXOs.' },
  { id: 'github',      name: 'GitHub',                 category: 'dev',        icon: '🐙', why: 'For technically curious CXOs — track engineering velocity.' },
  { id: 'salesforce',  name: 'Salesforce',             category: 'crm',        icon: '☁️', why: 'Pipeline summaries, account briefs, customer health.' },
  { id: 'hubspot',     name: 'HubSpot',                category: 'crm',        icon: '🧲', why: 'Pipeline + marketing automation snapshots.' },
  { id: 'zapier',      name: 'Zapier / Make',          category: 'automation', icon: '⚡', why: 'Automation glue between everything above.' },
];

export const GOALS: Goal[] = [
  // Communications & Documents
  { id: 'functional-spec-doc', column: 'communications', icon: '📐', title: 'Functional Spec doc (SAP style)',  blurb: 'Five-step prompt that produces a clean SAP-style functional specification.', estimatedMinutes: 20, unlocked: true },
  { id: 'document',         column: 'communications', icon: '📄', title: 'A polished document',                blurb: 'Memo, SOP, or policy — clear and on-brand.',                       estimatedMinutes: 15 },
  { id: 'investor-update',  column: 'communications', icon: '💼', title: 'An investor update',                 blurb: 'Monthly or quarterly shareholder letter from your notes.',         estimatedMinutes: 15 },
  { id: 'press-release',    column: 'communications', icon: '📰', title: 'A press release',                    blurb: 'External announcement with quote and boilerplate.',                estimatedMinutes: 12 },
  { id: 'board-preread',    column: 'communications', icon: '📑', title: 'A board pre-read',                   blurb: 'Executive summary that respects board time.',                      estimatedMinutes: 15 },
  { id: 'bulk-email',       column: 'communications', icon: '📧', title: 'Bulk email drafting',                blurb: 'Personalized replies and outbound at exec volume.',                estimatedMinutes: 12, requiresConnectors: ['gmail'] },
  { id: 'meeting-prep',     column: 'communications', icon: '🗓️', title: 'Meeting prep & follow-ups',          blurb: 'Pre-read brief + follow-up notes from your calendar.',             estimatedMinutes: 12, requiresConnectors: ['gcal', 'gdrive'] },
  // Presentations & Visuals
  { id: 'board-deck',       column: 'presentations',  icon: '📊', title: 'A board deck',                       blurb: 'Slides from notes and data — board-meeting ready.',                estimatedMinutes: 20, requiresConnectors: ['gslides'] },
  { id: 'pitch-deck',       column: 'presentations',  icon: '🚀', title: 'A pitch deck',                       blurb: 'Fundraising deck with the story arc investors expect.',            estimatedMinutes: 20 },
  { id: 'one-pager-canva',  column: 'presentations',  icon: '🖼️', title: 'A one-pager (Canva)',                blurb: 'Sales collateral or summary one-pager — designer-quality.',        estimatedMinutes: 15, requiresConnectors: ['canva'] },
  { id: 'figma-mockup',     column: 'presentations',  icon: '🎨', title: 'A UI mockup via Figma',              blurb: 'Generate frames, review designs, request edits — via Figma MCP.',  estimatedMinutes: 20, requiresConnectors: ['figma'] },
  { id: 'process-diagram',  column: 'presentations',  icon: '🧭', title: 'A process diagram',                  blurb: 'Org chart or workflow as a Mermaid diagram → image.',              estimatedMinutes: 10 },
  // Numbers & Analysis
  { id: 'financial-model',  column: 'numbers',        icon: '💰', title: 'A financial model',                  blurb: 'xlsx with formulas and scenario toggles.',                         estimatedMinutes: 20, requiresConnectors: ['gsheets'] },
  { id: 'budget-vs-actuals',column: 'numbers',        icon: '📉', title: 'Budget vs actuals',                  blurb: 'Variance analysis from CSV / xlsx with commentary.',               estimatedMinutes: 15 },
  { id: 'market-scan',      column: 'numbers',        icon: '🔭', title: 'A market / competitor scan',         blurb: 'Concise synthesis from public sources.',                           estimatedMinutes: 15 },
  { id: 'pricing-analysis', column: 'numbers',        icon: '🏷️', title: 'A pricing analysis',                 blurb: 'Compare options, surface trade-offs, recommend.',                  estimatedMinutes: 15 },
  { id: 'kpi-dashboard',    column: 'numbers',        icon: '📈', title: 'A KPI dashboard',                    blurb: 'Sheet with the 5 numbers you actually look at.',                   estimatedMinutes: 20, requiresConnectors: ['gsheets'] },
  // Operations & Decisions
  { id: 'contract-review',  column: 'operations',     icon: '⚖️', title: 'A contract review',                  blurb: 'Redlines and risk summary in plain English.',                      estimatedMinutes: 15 },
  { id: 'sop',              column: 'operations',     icon: '⚙️', title: 'An SOP / process doc',               blurb: 'Repeatable process written down once, well.',                      estimatedMinutes: 12 },
  { id: 'hiring-kit',       column: 'operations',     icon: '🧑‍💼', title: 'A hiring kit',                       blurb: 'JD + screening rubric + interview questions.',                     estimatedMinutes: 15 },
  { id: 'perf-review',      column: 'operations',     icon: '🪞', title: 'A performance review',               blurb: 'Draft from your notes — honest and useful.',                       estimatedMinutes: 12 },
  { id: 'okrs',             column: 'operations',     icon: '🎯', title: 'OKRs / goal-setting',                blurb: 'Crisp objectives + measurable key results.',                       estimatedMinutes: 12 },
  { id: 'webpage',          column: 'operations',     icon: '🌐', title: 'A simple web page',                  blurb: 'Landing page or internal info page.',                              estimatedMinutes: 20 },
  { id: 'webapp',           column: 'operations',     icon: '🔧', title: 'A small web app',                    blurb: 'Internal dashboard, form, or lookup tool.',                        estimatedMinutes: 30 },
];

export const MODULES: Module[] = [
  { id: 'welcome',           title: 'Welcome',                      estimatedMinutes: 3,  required: true,  group: 'setup' },
  { id: 'setup.install',     title: 'Install Claude Code',          estimatedMinutes: 15, required: true,  group: 'setup' },
  { id: 'setup.connectors',  title: 'Wire your connectors',         estimatedMinutes: 20, required: true,  group: 'setup' },
  ...GOALS.map<Module>((g) => ({
    id: `build.${g.id}`,
    title: g.title,
    estimatedMinutes: g.estimatedMinutes,
    required: false,
    group: 'build' as const,
  })),
  { id: 'ship.certificate',  title: 'Claim your certificate',       estimatedMinutes: 2,  required: true,  group: 'ship' },
];

export const COLUMN_LABELS: Record<GoalColumn, { label: string; icon: string }> = {
  communications: { label: 'Communications & Documents', icon: '📝' },
  presentations:  { label: 'Presentations & Visuals',    icon: '📊' },
  numbers:        { label: 'Numbers & Analysis',         icon: '💰' },
  operations:     { label: 'Operations & Decisions',     icon: '⚖️' },
};

export const COLUMN_ORDER: GoalColumn[] = ['communications', 'presentations', 'numbers', 'operations'];

export function getGoal(id: string): Goal | undefined {
  return GOALS.find((g) => g.id === id);
}

export function getConnector(id: string): Connector | undefined {
  return CONNECTORS.find((c) => c.id === id);
}

export function getModule(id: string): Module | undefined {
  return MODULES.find((m) => m.id === id);
}

export function goalModuleId(goalId: string): string {
  return `build.${goalId}`;
}
