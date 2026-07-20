import { useEffect, useState } from "react";

// ============================================================
// EDIT THIS: set your dev password here
// ============================================================
const ACCESS_PASSWORD = "chapati2026";
// ============================================================

const STORAGE_KEY = "cs_access_granted";

export function AccessGate({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<"checking" | "locked" | "denied" | "granted">("checking");
  const [input, setInput] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    setStatus(saved === ACCESS_PASSWORD ? "granted" : "locked");
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === ACCESS_PASSWORD) {
      window.localStorage.setItem(STORAGE_KEY, ACCESS_PASSWORD);
      setStatus("granted");
    } else {
      setStatus("denied");
    }
  }

  if (status === "checking") return null;
  if (status === "granted") return <>{children}</>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-warm">
        <h1 className="font-display text-3xl text-gradient-warm">
          {status === "denied" ? "Access Denied" : "Private Preview"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {status === "denied"
            ? "That password isn't correct. Please contact the site owner for access."
            : "This site is under development. Enter the access password to continue."}
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Access password"
            className="w-full rounded-full border border-border bg-background px-5 py-2.5 text-sm focus:border-primary focus:outline-none"
            autoFocus
          />
          <button
            type="submit"
            className="w-full rounded-full bg-gradient-warm px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-warm"
          >
            Enter site
          </button>
        </form>
      </div>
    </div>
  );
}
