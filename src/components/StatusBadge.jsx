const STYLES = {
  Approved: "bg-green-100 text-green-800",
  Valid: "bg-green-100 text-green-800",
  Pending: "bg-amber-100 text-amber-800",
  Rejected: "bg-red-100 text-red-800",
  Revoked: "bg-red-100 text-red-800",
  "Not Found": "bg-gray-200 text-gray-700",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-block rounded-full px-3 py-0.5 text-sm font-medium ${STYLES[status] ?? "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
}
