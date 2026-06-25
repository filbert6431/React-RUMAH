import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import MembershipHeader from "../../components/MembershipHeader";
import MembershipLayout from "../../components/MembershipLayout";


import customersData from "../../Data/Customers.json";

export default function MemberShipDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);

  useEffect(() => {
    const found = customersData.find(
      (c) => String(c.ID_Customer) === id || String(c.ID_Customer) === `CUST${id}` || String((c.ID_Customer || "")).includes(id)
    );
    if (found) {
      // normalize to membership-shaped object expected by the layout
      const normalized = {
        customer_id: found.ID_Customer,
        name: found.Nama_Lengkap || found.name,
        level_membership: found.level_membership || found.level || found.membershipLevel,
        tanggal_daftar: found.tanggal_daftar || found.joinDate,
        points: found.points ?? 0,
      };
      // setState async to avoid sync update warning
      queueMicrotask(() => setMember(normalized));
    } else {
      queueMicrotask(() => setMember(null));
    }
  }, [id]);

  if (!member) return <div className="text-white p-10">Data member tidak ditemukan...</div>;

  const memberId = member.customer_id;
  const level = member.level_membership || member.level;
  const joinDate = member.tanggal_daftar || member.joinDate;
  const status = member.status_member || "Aktif";

  return (
    <MembershipLayout>
      <BackButton onClick={() => navigate("/Membership")} />
      <MembershipHeader name={member.name} id={memberId} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h3 className="text-white/40 text-xs uppercase mb-2">Status Loyalitas</h3>
          <p className="text-2xl font-black">{level}</p>
          <div className="mt-4">
            <p className="text-xs text-white/40">Total Poin Saat Ini</p>
            <p className="text-3xl font-black text-dash-accent">{member.points.toLocaleString()} PTS</p>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h3 className="text-white/40 text-xs uppercase mb-2">Informasi Akun</h3>
          <p className="text-lg font-medium">Bergabung Sejak:</p>
          <p className="text-white/60">{joinDate}</p>
          
          <div className="mt-4">
            <p className="text-lg font-medium">Status Akun:</p>
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
              {status}
            </span>
          </div>
        </div>
      </div>
    </MembershipLayout>
  );
}
