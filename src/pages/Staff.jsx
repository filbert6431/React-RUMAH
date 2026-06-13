import { FaSearch, FaFilter, FaUserTie } from "react-icons/fa";
import { useEffect, useState } from "react";
import { staffAPI } from "../Services/Staff";
import StaffTable from "../components/StaffTable";

export default function Staff() {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedRole: "",
    nama_lengkap: "",
    email: "",
    password: "",
    no_telp: "",
    gender: "",
    role: "Admin",
    status: "Aktif",
    foto_url: "https://i.pravatar.cc/300?img=50",
  });
  const [editId, setEditId] = useState(null);

  const loadStaff = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await staffAPI.fetchStaff();
      setStaffList(data);
    } catch (err) {
      setError(err.message || "Gagal memuat data staff.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const resetForm = () => {
    setEditId(null);
    setDataForm({
      searchTerm: "",
      selectedRole: "",
      nama_lengkap: "",
      email: "",
      password: "",
      no_telp: "",
      gender: "",
      role: "Admin",
      status: "Aktif",
      foto_url: "https://i.pravatar.cc/300?img=50",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        nama_lengkap: dataForm.nama_lengkap,
        email: dataForm.email,
        password: dataForm.password,
        no_telp: dataForm.no_telp,
        gender: dataForm.gender,
        role: dataForm.role,
        status: dataForm.status,
        foto_url: dataForm.foto_url,
      };

      if (editId) {
        await staffAPI.updateStaff(editId, payload);
        setSuccess("Data staff berhasil diperbarui.");
      } else {
        await staffAPI.createStaff(payload);
        setSuccess("Staff baru berhasil ditambahkan.");
      }

      resetForm();
      await loadStaff();
    } catch (err) {
      setError(err.message || "Gagal menyimpan data staff.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (staff) => {
    setEditId(staff.staff_id);
    setDataForm({
      ...dataForm,
      nama_lengkap: staff.nama_lengkap || "",
      email: staff.email || "",
      password: staff.password || "",
      no_telp: staff.no_telp || "",
      gender: staff.gender || "",
      role: staff.role || "Admin",
      status: staff.status || "Aktif",
      foto_url: staff.foto_url || "https://i.pravatar.cc/300?img=50",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus staff ini?")) return;
    setLoading(true);
    setError("");

    try {
      await staffAPI.deleteStaff(id);
      setSuccess("Staff berhasil dihapus.");
      await loadStaff();
    } catch (err) {
      setError(err.message || "Gagal menghapus staff.");
    } finally {
      setLoading(false);
    }
  };

  const allRoles = [...new Set(staffList.map((item) => item.role))];

  const _searchTerm = dataForm.searchTerm.toLowerCase();

  const filteredStaff = staffList.filter((member) => {
    const matchesSearch =
      member.nama_lengkap?.toLowerCase().includes(_searchTerm) ||
      String(member.staff_id).includes(_searchTerm) ||
      member.role?.toLowerCase().includes(_searchTerm) ||
      member.status?.toLowerCase().includes(_searchTerm);

    const matchesRole = dataForm.selectedRole ? member.role === dataForm.selectedRole : true;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="h-full space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-dash-accent/10 rounded-lg">
              <FaUserTie className="text-dash-accent" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">Tim Staff</h1>
          </div>
          <p className="text-white/40 text-sm font-medium">Kelola staf dengan menambah, mengubah, dan menghapus data staf.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex items-center bg-black/40 border border-white/5 rounded-2xl px-5 py-3.5 focus-within:ring-2 focus-within:ring-dash-accent/50 transition-all shadow-2xl">
            <FaSearch className="text-white/20 mr-3" />
            <input
              type="text"
              name="searchTerm"
              placeholder="Cari nama, ID, role..."
              className="bg-transparent outline-none text-sm text-white placeholder-white/20 w-48 md:w-64"
              value={dataForm.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <select
              name="selectedRole"
              value={dataForm.selectedRole}
              onChange={handleChange}
              className="appearance-none bg-black/40 border border-white/5 text-white/70 rounded-2xl py-3 pl-6 pr-12 text-sm font-bold outline-none focus:ring-2 focus:ring-dash-accent/50 transition-all cursor-pointer shadow-2xl"
            >
              <option value="">Semua Role</option>
              {allRoles.map((role) => (
                <option key={role} value={role} className="bg-[#2D2825]">
                  {role}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
              <FaFilter size={12} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="bg-[#2D2825]/60 backdrop-blur-xl rounded-[40px] p-8 border border-white/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
            <h2 className="text-3xl font-black text-white mb-6">{editId ? "Edit Staff" : "Tambah Staff Baru"}</h2>

            {error && <div className="mb-6 rounded-3xl bg-red-500/10 border border-red-500/20 p-4 text-red-100">{error}</div>}
            {success && <div className="mb-6 rounded-3xl bg-green-500/10 border border-green-500/20 p-4 text-green-100">{success}</div>}

            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm text-white/70">
                  Nama Lengkap
                  <input
                    name="nama_lengkap"
                    value={dataForm.nama_lengkap}
                    onChange={handleChange}
                    required
                    className="w-full rounded-3xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none focus:border-dash-accent/50 focus:ring-dash-accent/10"
                  />
                </label>
                <label className="space-y-2 text-sm text-white/70">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={dataForm.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-3xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none focus:border-dash-accent/50 focus:ring-dash-accent/10"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm text-white/70">
                  Password
                  <input
                    type="password"
                    name="password"
                    value={dataForm.password}
                    onChange={handleChange}
                    required={!editId}
                    className="w-full rounded-3xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none focus:border-dash-accent/50 focus:ring-dash-accent/10"
                  />
                </label>
                <label className="space-y-2 text-sm text-white/70">
                  Nomor Telepon
                  <input
                    name="no_telp"
                    value={dataForm.no_telp}
                    onChange={handleChange}
                    required
                    className="w-full rounded-3xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none focus:border-dash-accent/50 focus:ring-dash-accent/10"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <label className="space-y-2 text-sm text-white/70">
                  Gender
                  <select
                    name="gender"
                    value={dataForm.gender}
                    onChange={handleChange}
                    required
                    className="w-full rounded-3xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none focus:border-dash-accent/50 focus:ring-dash-accent/10"
                  >
                    <option value="">Pilih Gender</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </label>
                <label className="space-y-2 text-sm text-white/70">
                  Role
                  <select
                    name="role"
                    value={dataForm.role}
                    onChange={handleChange}
                    className="w-full rounded-3xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none focus:border-dash-accent/50 focus:ring-dash-accent/10"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Barista">Barista</option>
                    <option value="Waiter">Waiter</option>
                    <option value="Supplier">Supplier</option>
                  </select>
                </label>
                <label className="space-y-2 text-sm text-white/70">
                  Status
                  <select
                    name="status"
                    value={dataForm.status}
                    onChange={handleChange}
                    className="w-full rounded-3xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none focus:border-dash-accent/50 focus:ring-dash-accent/10"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Cuti">Cuti</option>
                    <option value="Resign">Resign</option>
                  </select>
                </label>
              </div>

              <label className="space-y-2 text-sm text-white/70">
                Foto URL
                <input
                  name="foto_url"
                  value={dataForm.foto_url}
                  onChange={handleChange}
                  className="w-full rounded-3xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none focus:border-dash-accent/50 focus:ring-dash-accent/10"
                />
              </label>

              <div className="flex flex-wrap gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-3xl bg-dash-accent px-8 py-4 text-black font-black uppercase tracking-[0.2em] hover:bg-dash-accent/90 transition"
                >
                  {editId ? "Update Staff" : "Tambah Staff"}
                </button>
                {editId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-3xl border border-white/10 px-8 py-4 text-white font-black uppercase tracking-[0.2em] hover:bg-white/5 transition"
                  >
                    Batal Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div>
          <div className="bg-[#2D2825]/60 backdrop-blur-xl rounded-[40px] border border-white/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden">
            <StaffTable filteredStaff={filteredStaff} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center px-4">
        <p className="text-[#8E837C] text-xs font-bold uppercase tracking-[0.2em]">
          Showing <span className="text-white">{filteredStaff.length}</span> of {staffList.length} Total Staff
        </p>
        <div className="flex gap-2">
          <div className={`w-2 h-2 rounded-full ${filteredStaff.length > 0 ? 'bg-dash-accent animate-pulse' : 'bg-white/10'}`}></div>
          <div className="w-2 h-2 rounded-full bg-white/10"></div>
          <div className="w-2 h-2 rounded-full bg-white/10"></div>
        </div>
      </div>
    </div>
  );
}
