import { useNavigate } from "react-router-dom";

const actions = [
  { label: "Request Certificate", to: "/request", primary: true },
  { label: "Track Application", to: "/track" },
  { label: "Verify Certificate", to: "/verify" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center py-16 text-center">
      <h1 className="text-5xl font-bold tracking-tight text-brand">CredVault</h1>
      <p className="mt-3 text-lg text-muted">Certificate Issuing &amp; Verification Platform</p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        {actions.map((a) => (
          <button
            key={a.to}
            onClick={() => navigate(a.to)}
            className={`rounded px-6 py-3 font-medium transition-colors ${
              a.primary
                ? "bg-brand text-white hover:bg-brand-dark"
                : "border border-brand text-brand hover:bg-brand hover:text-white"
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>
    </section>
  );
}
