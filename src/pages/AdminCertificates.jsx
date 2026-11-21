import StatusBadge from "../components/StatusBadge";
import { useData } from "../context/DataContext";
import { formatDate } from "../utils/formatDate";

const COLUMNS = ["Certificate ID", "Name", "Phone", "City", "State", "Issued On", "Status", "Action"];

export default function AdminCertificates() {
  const { certificates, revokeCertificate } = useData();

  const handleRevoke = (cert) => {
    // Revoking can't be undone in this prototype, so ask first.
    if (window.confirm(`Revoke certificate ${cert.id} issued to ${cert.name}?`)) {
      revokeCertificate(cert.id);
    }
  };

  return (
    <section>
      <h1 className="mb-6 text-2xl font-semibold">Certificates</h1>

      {certificates.length === 0 ? (
        <p className="rounded-lg border border-line bg-white p-6 text-muted">
          No certificates issued yet. Issue one from the Applications page.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-line bg-white">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="border-b border-line bg-surface text-muted">
              <tr>
                {COLUMNS.map((c) => (
                  <th key={c} className="px-4 py-3 font-medium">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {certificates.map((c) => (
                <tr key={c.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 font-medium">{c.id}</td>
                  <td className="px-4 py-3">{c.name}</td>
                  <td className="px-4 py-3">{c.phone}</td>
                  <td className="px-4 py-3">{c.city}</td>
                  <td className="px-4 py-3">{c.state}</td>
                  <td className="px-4 py-3">{formatDate(c.issuedOn)}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-3">
                    {c.status === "Valid" ? (
                      <button onClick={() => handleRevoke(c)} className="rounded border border-red-300 px-3 py-1 text-red-700 hover:bg-red-50">
                        Revoke
                      </button>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
