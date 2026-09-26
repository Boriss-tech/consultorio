
export default function FiltroPeriodo({ desde, hasta, onChange, onAplicar }) {
  return (
    <div className="flex flex-wrap items-end gap-3 rounded-xl bg-white border border-slate-200 p-4 shadow-sm">
      <div className="flex flex-col gap-1">
        <label htmlFor="filtro-desde" className="text-xs font-medium text-slate-500">
          Desde
        </label>
        <input
          id="filtro-desde"
          type="date"
          value={desde}
          onChange={(e) => onChange({ desde: e.target.value, hasta })}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-600"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="filtro-hasta" className="text-xs font-medium text-slate-500">
          Hasta
        </label>
        <input
          id="filtro-hasta"
          type="date"
          value={hasta}
          onChange={(e) => onChange({ desde, hasta: e.target.value })}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-600"
        />
      </div>
      <button
        type="button"
        onClick={onAplicar}
        className="rounded-lg bg-brand-600 px-4 py-1.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-brand-700 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
      >
        Aplicar
      </button>
    </div>
  )
}
