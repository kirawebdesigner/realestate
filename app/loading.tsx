export default function Loading() {
  return (
    <div className="container-site animate-pulse py-16" aria-label="Loading page">
      <div className="h-4 w-36 rounded bg-[var(--stone)]" />
      <div className="mt-6 h-24 max-w-3xl rounded bg-[var(--stone)]" />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {[1, 2, 3].map((item) => <div key={item}><div className="aspect-[4/3] rounded-[var(--radius-media)] bg-[var(--stone)]" /><div className="mt-4 h-5 w-2/3 rounded bg-[var(--stone)]" /></div>)}
      </div>
    </div>
  );
}
