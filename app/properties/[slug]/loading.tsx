export default function PropertyLoading() {
  return (
    <div className="container-site animate-pulse py-8" aria-label="Loading property">
      <div className="grid gap-3 md:grid-cols-12 md:grid-rows-2">
        <div className="min-h-[620px] rounded-[var(--radius-media)] bg-[var(--stone)] md:col-span-8 md:row-span-2" />
        <div className="min-h-72 rounded-[var(--radius-media)] bg-[var(--stone)] md:col-span-4" />
        <div className="min-h-72 rounded-[var(--radius-media)] bg-[var(--stone)] md:col-span-4" />
      </div>
      <div className="mt-10 h-20 max-w-3xl rounded bg-[var(--stone)]" />
    </div>
  );
}
