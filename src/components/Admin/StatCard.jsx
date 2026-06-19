// components/admin/StatCard.jsx

export default function StatCard({ icon, label, value, accent = false }) {
  return (
    <div
      className={`
        rounded-2xl p-6 flex items-center gap-5 shadow-sm border transition-shadow duration-200 hover:shadow-md
        ${
          accent
            ? "bg-[#1e3a5f] border-[#2a4f7a] text-white"
            : "bg-white border-[#ddeef8] text-[#1e3a5f]"
        }
      `}
    >
      <div
        className={`
          w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xl
          ${accent ? "bg-white/15" : "bg-[#e8f4fd]"}
        `}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p
          className={`text-sm font-medium mb-0.5 truncate ${accent ? "text-blue-200" : "text-[#64748b]"}`}
        >
          {label}
        </p>
        <p
          className={`text-3xl font-bold leading-none ${accent ? "text-white" : "text-[#1e3a5f]"}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
