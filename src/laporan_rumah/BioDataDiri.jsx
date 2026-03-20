export default function BioDataDiri() {
    return (
        /* Tambahkan class wrapper di sini */
        <div className="biodata-wrapper">
            <FotoProfil />
            
            <section>
                <h2>Identitas</h2>
                <p><strong>Nama Lengkap:</strong> Filbert Anggriawan</p>
                <p><strong>NIM:</strong> 2457301056</p>
                <p><strong>Jurusan:</strong> Teknik Informatika</p>
                <p><strong>Fakultas:</strong> Teknik dan Ilmu Komputer</p>
            </section>
            
            <hr />
            <Pendidikan />
            <hr />
            <Usia />
            <hr />
            
            <KTM 
                nama="Filbert Anggriawan" 
                nim="2457301056"
                tanggal="19 Maret 2026"
            />
            
            <hr />
            <Hobi />
            <hr />
            <Status />
        </div>
    );
}

function Pendidikan() {
    return (
        <section>
            <h2>Pendidikan</h2>
            <p>SMA Santa Maria (2021 - 2024)</p>
            <p>Politeknik Caltex Riau (Sekarang)</p>
        </section>
    );
}

function Usia() {
    const tahunLahir = 2006;
    const umur = new Date().getFullYear() - tahunLahir;
    return (
        <section>
            <p>Tahun lahir: {tahunLahir}</p>
            <p>Umur: {umur} tahun</p>
        </section>
    );
}

function FotoProfil() {
    return (
        <div className="profile-img-container">
            <img src="images/foto_bapak.jpg" alt="Foto Profil" />
        </div>
    );
}

function KTM (props) {
    return (
        <div className="ktm-card">
            <p style={{fontSize: '0.6rem', letterSpacing: '2px'}}>STUDENT CARD</p>
            <h3>{props.nama}</h3>
            <p>{props.nim}</p>
            <div className="ktm-footer">

                <span>PCR - RIAU</span>
                <span>{props.tanggal}</span>
            </div>
        </div>
    );
}

function Hobi() {
    return (
        <section>
            <h2>Hobi</h2>
            <ul> 
                 <li>Membaca</li>
                 <li>Berimajinasi</li>
                 <li>Menulis</li>
            </ul>
        </section>
    );
}

function Status() {
    return (
        <div style={{color: '#059669', fontWeight: 'bold'}}>
            <p>● Masih Hidup & Sehat</p>
        </div>
    );
}