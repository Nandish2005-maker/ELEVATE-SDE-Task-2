import { NavLink, Link } from "react-router-dom";

const links = [
  { to: "/request", label: "Request" },
  { to: "/track", label: "Track" },
  { to: "/verify", label: "Verify" },
  { to: "/admin/login", label: "Admin" },
];

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `rounded px-3 py-1.5 text-sm font-medium transition-colors ${
      isActive ? "bg-brand text-white" : "text-muted hover:text-ink"
    }`;

  return (
    <header className="border-b border-line bg-white">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <Link to="/" className="text-lg font-bold text-brand">
          CredVault
        </Link>
        <div className="flex gap-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
