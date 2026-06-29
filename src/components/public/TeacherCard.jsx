export default function TeacherCard({ teacher }) {
  return (
    <div className="bg-white rounded-2xl border border-[#ddeef8] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Photo */}
      <div className="h-48 w-full bg-[#f0f7ff] flex items-center justify-center overflow-hidden">
        {teacher.photo ? (
          <img
            src={teacher.photo}
            alt={teacher.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-5xl font-bold text-[#b8d4ed]">
            {teacher.name.charAt(0)}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="text-base font-bold text-[#1e3a5f]">{teacher.name}</p>
        <p className="text-sm text-[#06b6d4] font-medium mt-0.5">
          {teacher.position}
        </p>
        {teacher.bio && (
          <p className="text-sm text-[#64748b] mt-3 line-clamp-3">
            {teacher.bio}
          </p>
        )}
      </div>
    </div>
  );
}
