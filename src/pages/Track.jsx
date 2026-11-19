import { useState } from "react";
import FormInput from "../components/FormInput";
import StatusBadge from "../components/StatusBadge";
import { useData } from "../context/DataContext";
import { formatDate } from "../utils/formatDate";

export default function Track() {
  const { findApplication } = useData();
  const [id, setId] = useState("");
  const [inputError, setInputError] = useState("");
  const [result, setResult] = useState(null); // null = nothing searched yet, "notfound" = no match

  const handleChange = (e) => {
    setId(e.target.value);
    setInputError("");
    setResult(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id.trim()) {
      setInputError("Enter an Application ID");
      return;
    }
    setResult(findApplication(id) ?? "notfound");
  };

  return (
    <section className="mx-auto max-w-md">
      <h1 className="mb-6 text-2xl font-semibold">Track Application</h1>

      <form onSubmit={handleSubmit} noValidate className="space-y-4 rounded-lg border border-line bg-white p-6">
        <FormInput
          label="Application ID"
          name="applicationId"
          value={id}
          onChange={handleChange}
          error={inputError}
          placeholder="e.g. #APP-0001"
        />
        <button type="submit" className="w-full rounded bg-brand py-2.5 font-medium text-white hover:bg-brand-dark">
          Track
        </button>
      </form>

      {result === "notfound" && (
        <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-800">
          No application found with this ID. Check the ID and try again.
        </div>
      )}

      {result && result !== "notfound" && (
        <dl className="mt-6 space-y-3 rounded-lg border border-line bg-white p-6">
          <Row label="Application ID" value={result.id} />
          <Row label="Name" value={result.name} />
          <Row label="Status" value={<StatusBadge status={result.status} />} />
          <Row label="Submission Date" value={formatDate(result.submittedOn)} />
        </dl>
      )}
    </section>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
