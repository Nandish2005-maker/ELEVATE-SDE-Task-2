// Reusable labelled input with an error message under it.
// For custom controls (radios, select) pass children and, if the control has an id, htmlFor.
export default function FormInput({ label, name, error, children, htmlFor, ...props }) {
  return (
    <div>
      <label htmlFor={children ? htmlFor : name} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      {children ?? (
        <input
          id={name}
          name={name}
          autoComplete="off"
          {...props}
          className={`w-full rounded border bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-brand/40 ${
            error ? "border-red-500" : "border-line"
          }`}
        />
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
