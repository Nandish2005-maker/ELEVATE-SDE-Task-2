import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useData } from "../context/DataContext";
import { STATES } from "../data/states";

const EMPTY = { name: "", phone: "", gender: "", city: "", state: "" };

function validate(f) {
  const e = {};
  if (!f.name.trim()) e.name = "Enter your name";
  if (!f.phone.trim()) e.phone = "Enter your phone number";
  else if (!/^\d{10}$/.test(f.phone)) e.phone = "Phone number must be 10 digits";
  if (!f.gender) e.gender = "Select a gender";
  if (!f.city.trim()) e.city = "Enter your city";
  if (!f.state) e.state = "Select a state";
  return e;
}

export default function Request() {
  const { addApplication } = useData();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submittedId, setSubmittedId] = useState(null);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "phone") value = value.replace(/\D/g, "").slice(0, 10); // digits only
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined })); // clear that field's error
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmittedId(addApplication({ ...form, name: form.name.trim(), city: form.city.trim() }));
    setForm(EMPTY);
  };

  if (submittedId) {
    return (
      <section className="mx-auto max-w-md rounded-lg border border-line bg-white p-8 text-center">
        <h1 className="text-2xl font-semibold">Request Certificate</h1>
        <p className="mt-6 font-medium text-green-700">Application submitted successfully!</p>
        <p className="mt-2">
          Application ID: <span className="font-bold">{submittedId}</span>
        </p>
        <p className="mt-2 text-sm text-muted">Save this ID to track your application.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => navigate("/track")} className="rounded bg-brand px-4 py-2 text-white hover:bg-brand-dark">
            Track Application
          </button>
          <button onClick={() => setSubmittedId(null)} className="rounded border border-line px-4 py-2 hover:bg-surface">
            Submit another
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-md">
      <h1 className="mb-6 text-2xl font-semibold">Request Certificate</h1>
      <form onSubmit={handleSubmit} noValidate className="space-y-4 rounded-lg border border-line bg-white p-6">
        <FormInput label="Name" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Full name" />

        <FormInput label="Phone" name="phone" type="tel" inputMode="numeric" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="10-digit number" />

        <FormInput label="Gender" name="gender" error={errors.gender}>
          <div className="flex gap-5">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g} className="flex items-center gap-2">
                <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={handleChange} className="accent-brand" />
                {g}
              </label>
            ))}
          </div>
        </FormInput>

        <FormInput label="City" name="city" value={form.city} onChange={handleChange} error={errors.city} placeholder="City" />

        <FormInput label="State" name="state" error={errors.state}>
          <select
            id="state"
            name="state"
            value={form.state}
            onChange={handleChange}
            className={`w-full rounded border bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-brand/40 ${errors.state ? "border-red-500" : "border-line"}`}
          >
            <option value="">Select state</option>
            {STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </FormInput>

        <button type="submit" className="w-full rounded bg-brand py-2.5 font-medium text-white hover:bg-brand-dark">
          Submit
        </button>
      </form>
    </section>
  );
}
