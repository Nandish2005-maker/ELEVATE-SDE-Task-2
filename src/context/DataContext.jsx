import { createContext, useContext, useEffect, useState } from "react";
import { dummyApplications, dummyCertificates } from "../data/dummyData";

const DataContext = createContext(null);

// ---------- helpers ----------
const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const today = () => new Date().toISOString().slice(0, 10);

// Next ID like "APP-0006" / "CERT-0003" based on the highest existing number.
const nextId = (items, prefix) => {
  const max = items.reduce((m, i) => Math.max(m, parseInt(i.id.replace(/\D/g, ""), 10) || 0), 0);
  return `${prefix}-${String(max + 1).padStart(4, "0")}`;
};

// Lets users type "app-0001", "#APP-0001" or " APP-0001 " and still match.
const clean = (id) => id.trim().replace(/^#/, "").toUpperCase();

// ---------- provider ----------
export function DataProvider({ children }) {
  const [applications, setApplications] = useState(() => load("cv_applications", dummyApplications));
  const [certificates, setCertificates] = useState(() => load("cv_certificates", dummyCertificates));

  useEffect(() => localStorage.setItem("cv_applications", JSON.stringify(applications)), [applications]);
  useEffect(() => localStorage.setItem("cv_certificates", JSON.stringify(certificates)), [certificates]);

  // Citizen: submit a new request. Returns the new Application ID.
  const addApplication = (form) => {
    const id = `#${nextId(applications, "APP")}`;
    setApplications((prev) => [...prev, { ...form, id, status: "Pending", submittedOn: today() }]);
    return id;
  };

  // Admin: approve a pending application and create its certificate.
  const issueApplication = (id) => {
    const app = applications.find((a) => a.id === id);
    if (!app || app.status !== "Pending") return;
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status: "Approved" } : a)));
    setCertificates((prev) => [
      ...prev,
      {
        id: nextId(prev, "CERT"),
        applicationId: app.id,
        name: app.name,
        phone: app.phone,
        city: app.city,
        state: app.state,
        issuedOn: today(),
        status: "Valid",
      },
    ]);
  };

  const rejectApplication = (id) =>
    setApplications((prev) => prev.map((a) => (a.id === id && a.status === "Pending" ? { ...a, status: "Rejected" } : a)));

  const revokeCertificate = (id) =>
    setCertificates((prev) => prev.map((c) => (c.id === id && c.status === "Valid" ? { ...c, status: "Revoked" } : c)));

  // Lookups (return undefined when not found).
  const findApplication = (id) => applications.find((a) => clean(a.id) === clean(id));
  const findCertificate = (id) => certificates.find((c) => clean(c.id) === clean(id));

  const value = {
    applications, certificates,
    addApplication, issueApplication, rejectApplication, revokeCertificate,
    findApplication, findCertificate,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => useContext(DataContext);
