import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProfile, listProgress, isCertificateEligible, setModuleStatus, upsertProfile } from '../lib/progress';
import type { Profile } from '../lib/database.types';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 60, fontFamily: 'Helvetica' },
  border: { border: '2pt solid #ea580c', padding: 40, height: '100%' },
  title: { fontSize: 28, marginBottom: 16, textAlign: 'center', color: '#0f172a' },
  sub: { fontSize: 14, color: '#475569', textAlign: 'center', marginBottom: 32 },
  name: { fontSize: 36, fontWeight: 700, textAlign: 'center', marginVertical: 24, color: '#0f172a' },
  body: { fontSize: 12, color: '#334155', textAlign: 'center', marginTop: 12, lineHeight: 1.5 },
  footer: { marginTop: 40, fontSize: 10, color: '#94a3b8', textAlign: 'center' },
});

function Cert({ name, role, company, dateStr }: { name: string; role: string; company: string; dateStr: string }) {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.border}>
          <Text style={styles.title}>Certificate of Completion</Text>
          <Text style={styles.sub}>Learn Claude · For CXOs</Text>
          <Text style={styles.body}>This certifies that</Text>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.body}>
            {role}{company ? `, ${company}` : ''}, has completed the Claude Code & Cowork Foundation —
            installing, connecting, and shipping a first artifact across communications,
            presentations, numbers, and operations.
          </Text>
          <Text style={styles.footer}>Issued {dateStr}</Text>
        </View>
      </Page>
    </Document>
  );
}

export default function CertificatePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [eligible, setEligible] = useState(false);

  useEffect(() => {
    if (!user) return;
    void getProfile(user.id).then(setProfile);
    void listProgress(user.id).then((rows) => setEligible(isCertificateEligible(rows)));
  }, [user]);

  if (!profile) return <div className="text-center text-ink-500">Loading…</div>;

  if (!eligible) {
    return (
      <div className="max-w-2xl mx-auto card">
        <h1>Not quite yet</h1>
        <p>
          To unlock your certificate you need to finish the setup modules and build at least
          one thing from each column on the <Link to="/build">Build hub</Link>.
        </p>
        <p className="text-sm text-ink-500 mt-4">
          You'll be back here soon. We promise the certificate is a real PDF.
        </p>
      </div>
    );
  }

  const dateStr = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  const name = profile.full_name ?? 'Anonymous CXO';
  const role = profile.role ?? '';
  const company = profile.company ?? '';

  return (
    <div className="max-w-2xl mx-auto card text-center">
      <h1>🏆 You did it.</h1>
      <p className="text-ink-600">Your certificate is ready.</p>
      <div className="my-6 text-4xl font-bold text-ink-900">{name}</div>
      <p className="text-sm text-ink-500">{role}{company ? `, ${company}` : ''} · {dateStr}</p>

      <div className="mt-6">
        <PDFDownloadLink
          document={<Cert name={name} role={role} company={company} dateStr={dateStr} />}
          fileName={`learn-claude-certificate-${name.replace(/\s+/g, '-').toLowerCase()}.pdf`}
          className="btn-primary no-underline"
        >
          📄 Download PDF
        </PDFDownloadLink>
      </div>

      <button
        className="btn-secondary mt-4"
        onClick={async () => {
          if (!user) return;
          await setModuleStatus(user.id, 'ship.certificate', 'completed');
          await upsertProfile({ id: user.id, certificate_issued_at: new Date().toISOString() });
        }}
      >
        Mark as claimed
      </button>
    </div>
  );
}
