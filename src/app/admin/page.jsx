import StatCard from "@/components/admin/StatCard";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/Admin/LogoutButton";
// ---------------------------------------------------------------------------
// Mock data — replace with real API calls when integration is requested
// ---------------------------------------------------------------------------

const stats = {
  posts: 24,
  teachers: 18,
  events: 7,
  gallery: 142,
};

const recentPosts = [
  {
    id: "1",
    title: "Selamat Datang Tahun Ajaran Baru 2024/2025",
    author: "Admin Sekolah",
    publishedAt: "2024-07-15",
    slug: "selamat-datang-tahun-ajaran-baru",
  },
  {
    id: "2",
    title: "Pengumuman Jadwal Ujian Tengah Semester",
    author: "Tata Usaha",
    publishedAt: "2024-07-12",
    slug: "jadwal-ujian-tengah-semester",
  },
  {
    id: "3",
    title: "Hasil Seleksi Olimpiade Sains Tingkat Kabupaten",
    author: "Admin Sekolah",
    publishedAt: "2024-07-09",
    slug: "hasil-seleksi-olimpiade-sains",
  },
  {
    id: "4",
    title: "Pendaftaran Ekstrakurikuler Semester Ganjil Dibuka",
    author: "Wakasek Kesiswaan",
    publishedAt: "2024-07-05",
    slug: "pendaftaran-ekstrakurikuler-ganjil",
  },
];

const upcomingEvents = [
  {
    id: "1",
    title: "Masa Orientasi Peserta Didik Baru",
    date: "2024-07-22",
  },
  {
    id: "2",
    title: "Upacara Peringatan Hari Kemerdekaan",
    date: "2024-08-17",
  },
  {
    id: "3",
    title: "Pameran Karya Siswa & Expo Sekolah",
    date: "2024-08-24",
  },
  {
    id: "4",
    title: "Rapat Komite Sekolah Triwulan III",
    date: "2024-09-03",
  },
];

const quickActions = [
  {
    label: "Buat Postingan",
    description: "Tulis berita atau pengumuman baru",
    href: "/admin/posts/new",
    icon: "✏️",
    color: "bg-[#e8f4fd] text-[#1e3a5f] hover:bg-[#d4ecf9]",
  },
  {
    label: "Tambah Guru",
    description: "Daftarkan guru atau staf baru",
    href: "/admin/teachers/new",
    icon: "👤",
    color: "bg-[#ecfdf5] text-[#065f46] hover:bg-[#d1fae5]",
  },
  {
    label: "Tambah Acara",
    description: "Jadwalkan kegiatan sekolah",
    href: "/admin/events/new",
    icon: "📅",
    color: "bg-[#fef9ec] text-[#78350f] hover:bg-[#fef3c7]",
  },
  {
    label: "Upload Foto",
    description: "Tambahkan foto ke galeri sekolah",
    href: "/admin/gallery/upload",
    icon: "🖼️",
    color: "bg-[#f5f3ff] text-[#4c1d95] hover:bg-[#ede9fe]",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatEventDate(dateStr) {
  const d = new Date(dateStr);
  return {
    day: d.toLocaleDateString("id-ID", { day: "2-digit" }),
    month: d.toLocaleDateString("id-ID", { month: "short" }),
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export const metadata = {
  title: "Dashboard — SchoolCMS Admin",
};

export default async function AdminDashboardPage() {
  // Check authentication - this is now inside the async function
  const session = await getServerSession(authOptions);
  const user = session?.user ?? null;

  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }
  return (
    <div className="min-h-screen bg-[#f0f7ff]">
      {/* ------------------------------------------------------------------ */}
      {/* Sidebar */}
      {/* ------------------------------------------------------------------ */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-[#1e3a5f] flex flex-col z-30 hidden lg:flex">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#06b6d4] flex items-center justify-center text-white font-bold text-base flex-shrink-0">
              S
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">
                SchoolCMS
              </p>
              <p className="text-blue-300 text-xs">Panel Admin</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {[
            { label: "Dashboard", href: "/admin", icon: "⊞", active: true },
            { label: "Postingan", href: "/admin/posts", icon: "✏️" },
            { label: "Guru & Staf", href: "/admin/teachers", icon: "👥" },
            { label: "Acara", href: "/admin/events", icon: "📅" },
            { label: "Galeri", href: "/admin/gallery", icon: "🖼️" },
            { label: "Pengaturan", href: "/admin/settings", icon: "⚙️" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150
                ${
                  item.active
                    ? "bg-[#06b6d4] text-white"
                    : "text-blue-200 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="px-4 py-5 border-t border-white/10">
          <div className="flex items-center justify-between gap-3 px-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#06b6d4]/30 flex items-center justify-center text-blue-200 text-xs font-bold flex-shrink-0">
                {user?.name ? user.name.charAt(0).toUpperCase() : "AD"}
              </div>
              <div className="min-w-0">
                <p className="text-white text-xs font-semibold truncate">
                  {user?.name || "Administrator"}
                </p>
                <p className="text-blue-400 text-xs truncate">
                  {user?.email || "admin@sekolah.sch.id"}
                </p>
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* ------------------------------------------------------------------ */}
      {/* Main content */}
      {/* ------------------------------------------------------------------ */}
      <main className="lg:pl-64">
        {/* Top bar (mobile) */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-[#ddeef8] px-4 py-3 flex items-center justify-between lg:hidden">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#1e3a5f] flex items-center justify-center text-white font-bold text-xs">
              S
            </div>
            <span className="font-bold text-[#1e3a5f] text-sm">SchoolCMS</span>
          </div>
          <button
            aria-label="Buka menu navigasi"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[#64748b] hover:bg-[#e8f4fd] transition-colors"
          >
            ☰
          </button>
        </header>

        <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          {/* -------------------------------------------------------------- */}
          {/* Welcome */}
          {/* -------------------------------------------------------------- */}
          <section>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <p className="text-[#64748b] text-sm font-medium mb-1">
                  {new Date().toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#1e3a5f] leading-tight">
                  Selamat datang kembali, {user?.name || "Admin"} 👋
                </h1>
                <p className="text-[#64748b] mt-1 text-sm sm:text-base">
                  Kelola konten sekolah Anda dari satu tempat.
                </p>
              </div>
              <Link
                href="/admin/posts/new"
                className="inline-flex items-center gap-2 bg-[#1e3a5f] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#16304f] transition-colors duration-150 self-start sm:self-auto flex-shrink-0"
              >
                <span>✏️</span>
                Buat Postingan
              </Link>
            </div>
          </section>

          {/* -------------------------------------------------------------- */}
          {/* Stats */}
          {/* -------------------------------------------------------------- */}
          <section aria-label="Statistik konten">
            <h2 className="text-xs font-semibold text-[#64748b] uppercase tracking-widest mb-4">
              Ringkasan Konten
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon="📰"
                label="Total Postingan"
                value={stats.posts}
                accent
              />
              <StatCard icon="👨‍🏫" label="Total Guru" value={stats.teachers} />
              <StatCard icon="📅" label="Total Acara" value={stats.events} />
              <StatCard icon="🖼️" label="Foto Galeri" value={stats.gallery} />
            </div>
          </section>

          {/* -------------------------------------------------------------- */}
          {/* Recent Posts + Upcoming Events */}
          {/* -------------------------------------------------------------- */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            {/* Recent Posts */}
            <section
              className="xl:col-span-3 bg-white rounded-2xl border border-[#ddeef8] shadow-sm overflow-hidden"
              aria-label="Postingan terbaru"
            >
              <div className="px-6 py-5 border-b border-[#f0f7ff] flex items-center justify-between">
                <h2 className="font-bold text-[#1e3a5f] text-base">
                  Postingan Terbaru
                </h2>
                <Link
                  href="/admin/posts"
                  className="text-xs font-semibold text-[#06b6d4] hover:text-[#0891b2] transition-colors"
                >
                  Lihat semua →
                </Link>
              </div>
              <div className="divide-y divide-[#f0f7ff]">
                {recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="px-6 py-4 hover:bg-[#f8fbff] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="text-sm font-semibold text-[#1e3a5f] hover:text-[#06b6d4] transition-colors line-clamp-2 leading-snug"
                        >
                          {post.title}
                        </Link>
                        <p className="text-xs text-[#94a3b8] mt-1.5">
                          oleh{" "}
                          <span className="text-[#64748b] font-medium">
                            {post.author}
                          </span>
                        </p>
                      </div>
                      <time
                        dateTime={post.publishedAt}
                        className="text-xs text-[#94a3b8] flex-shrink-0 mt-0.5 text-right whitespace-nowrap"
                      >
                        {formatDate(post.publishedAt)}
                      </time>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Upcoming Events */}
            <section
              className="xl:col-span-2 bg-white rounded-2xl border border-[#ddeef8] shadow-sm overflow-hidden"
              aria-label="Acara mendatang"
            >
              <div className="px-6 py-5 border-b border-[#f0f7ff] flex items-center justify-between">
                <h2 className="font-bold text-[#1e3a5f] text-base">
                  Acara Mendatang
                </h2>
                <Link
                  href="/admin/events"
                  className="text-xs font-semibold text-[#06b6d4] hover:text-[#0891b2] transition-colors"
                >
                  Lihat semua →
                </Link>
              </div>
              <div className="divide-y divide-[#f0f7ff]">
                {upcomingEvents.map((event) => {
                  const { day, month } = formatEventDate(event.date);
                  return (
                    <div
                      key={event.id}
                      className="px-6 py-4 flex items-center gap-4 hover:bg-[#f8fbff] transition-colors"
                    >
                      <div className="w-11 h-11 rounded-xl bg-[#e8f4fd] flex flex-col items-center justify-center flex-shrink-0">
                        <span className="text-[#1e3a5f] font-bold text-sm leading-none">
                          {day}
                        </span>
                        <span className="text-[#06b6d4] font-semibold text-[10px] uppercase tracking-wide leading-none mt-0.5">
                          {month}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-[#1e3a5f] leading-snug line-clamp-2 min-w-0">
                        {event.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* Quick Actions */}
          {/* -------------------------------------------------------------- */}
          <section aria-label="Aksi cepat">
            <h2 className="text-xs font-semibold text-[#64748b] uppercase tracking-widest mb-4">
              Aksi Cepat
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={`
                    group rounded-2xl p-5 border border-transparent transition-all duration-150 hover:shadow-md hover:-translate-y-0.5
                    ${action.color}
                  `}
                >
                  <span className="text-2xl block mb-3">{action.icon}</span>
                  <p className="font-bold text-sm leading-snug">
                    {action.label}
                  </p>
                  <p className="text-xs mt-1 opacity-70 leading-snug">
                    {action.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
