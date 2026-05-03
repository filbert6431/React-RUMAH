import { useState } from 'react';
import DataKarakter from './KarakterUser.json';

export default function ListKarakterUser() {
  const [dataForm, setDataForm] = useState({
    searchTerm: '',
    selectedtrait: '',
    selectedkelebihan: '',
    selectedkelemahan: '',
  });

  const _searchTerm = dataForm.searchTerm.toLowerCase();
  const _selectedtrait = dataForm.selectedtrait.toLowerCase();
  const _selectedkelebihan = dataForm.selectedkelebihan.toLowerCase();
  const _selectedkelemahan = dataForm.selectedkelemahan.toLowerCase();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };


  const alltrait = [...new Set(DataKarakter.flatMap((f) => f.trait))];
  const allkelebihan = [...new Set(DataKarakter.flatMap((f) => f.Kelebihan))];
  const allkelemahan = [...new Set(DataKarakter.flatMap((f) => f.Kelemahan))];


  const filteredFrameworks = DataKarakter.filter((framework) => {


    const matchesSearch =
      framework.nama.toLowerCase().includes(_searchTerm) ||
      framework.ras.toLowerCase().includes(_searchTerm) ||
      framework.kelas.toLowerCase().includes(_searchTerm) ||
      framework.Guild.toLowerCase().includes(_searchTerm) ||
      framework.kelamin.toLowerCase().includes(_searchTerm) ||
      framework.trait.some((trait) => trait.toLowerCase().includes(_searchTerm)) ||
      framework.Kelebihan.some((kelebihan) => kelebihan.toLowerCase().includes(_searchTerm)) ||
      framework.Kelemahan.some((kelemahan) => kelemahan.toLowerCase().includes(_searchTerm));

    const matchestrait = _selectedtrait
      ? framework.trait.some((t) => t.toLowerCase().includes(_selectedtrait))
      : true;

    const matcheskelebihan = _selectedkelebihan
      ? framework.Kelebihan.some((k) => k.toLowerCase().includes(_selectedkelebihan))
      : true;

    const matcheskelemahan = _selectedkelemahan
      ? framework.Kelemahan.some((k) => k.toLowerCase().includes(_selectedkelemahan))
      : true;

    return matchesSearch && matchestrait && matcheskelebihan && matcheskelemahan;

  });

  return (
    <div className="dashboard-shell">
      <style>{`
        /* ---------- FANTASY ADMIN DASHBOARD - ROW & COLUMN STYLES ---------- */
        :root {
          --fantasy-bg-start: #064e3b;
          --fantasy-bg-mid: #0f766e;
          --fantasy-bg-end: #1e3a8a;
          --panel-bg: rgba(255, 255, 255, 0.92);
          --border-glow: rgba(52, 211, 153, 0.4);
          --accent-green: #059669;
          --accent-cyan: #0891b2;
          --text-dark: #0f172a;
          --text-muted: #334155;
          --table-header-bg: linear-gradient(135deg, #065f46, #0369a1);
        }

        .dashboard-shell {
          min-height: 100vh;
          background: linear-gradient(145deg, var(--fantasy-bg-start), var(--fantasy-bg-mid), var(--fantasy-bg-end));
          padding: 2rem 1.5rem;
          font-family: 'Segoe UI', 'Inter', system-ui, -apple-system, 'Georgia', serif;
          position: relative;
        }

        /* header and filters (unchanged from your original) */
        .dashboard-header {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2rem;
          background: var(--panel-bg);
          backdrop-filter: blur(8px);
          border-radius: 2rem;
          padding: 1rem 2rem;
          border: 1px solid var(--border-glow);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }
        .dashboard-subtitle {
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-size: 12px;
          color: var(--accent-green);
          margin-bottom: 12px;
        }
        .dashboard-header h1 {
          font-size: 2.2rem;
          margin: 0;
          background: linear-gradient(135deg, #a7f3d0, #67e8f9);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }
        .dashboard-description {
          max-width: 560px;
          color: var(--text-muted);
          line-height: 1.6;
        }
        .dashboard-stats {
          display: flex;
          gap: 16px;
        }
        .dashboard-stat-card {
          min-width: 140px;
          padding: 16px 20px;
          border-radius: 24px;
          background: white;
          border: 1px solid var(--border-glow);
        }
        .dashboard-stat-primary {
          background: linear-gradient(135deg, #cffafe 0%, #bae6fd 100%);
        }
        .dashboard-stat-secondary {
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
        }
        .dashboard-stat-card span {
          display: block;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .dashboard-stat-card strong {
          font-size: 1.8rem;
          color: #0f172a;
        }

        /* filter panel */
        .dashboard-panel {
          margin-bottom: 2rem;
          background: var(--panel-bg);
          backdrop-filter: blur(8px);
          border-radius: 1.5rem;
          padding: 1.2rem 1.8rem;
          border: 1px solid var(--border-glow);
        }
        .dashboard-panel-grid {
          display: grid;
          grid-template-columns: minmax(280px, 1fr) minmax(240px, 320px);
          gap: 24px;
        }
        .dashboard-filter-card, .dashboard-summary-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 20px;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
        }
        .dashboard-filter-card h2, .dashboard-summary-card h2 {
          margin: 0 0 12px;
          color: #0f172a;
        }
        .dashboard-filter-help {
          margin: 0 0 18px;
          color: var(--text-muted);
        }
        .dashboard-input, .dashboard-select {
          width: 100%;
          padding: 12px 14px;
          margin-bottom: 14px;
          border-radius: 16px;
          border: 1px solid rgba(15, 23, 42, 0.1);
          background: #f8fafc;
          font-size: 0.95rem;
        }
        .dashboard-summary-item {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid rgba(15, 23, 42, 0.06);
        }
        .dashboard-summary-item:last-child {
          border-bottom: none;
        }

        /* ---------- ROW & COLUMN TABLE (no cards) ---------- */
        .dashboard-table-card {
          background: var(--panel-bg);
          border-radius: 1.5rem;
          overflow-x: auto;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border-glow);
        }
        .dashboard-table-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding: 1rem 1.5rem;
          background: transparent;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .dashboard-table-title {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--accent-green);
          margin-bottom: 0.25rem;
        }
        .dashboard-table-header h2 {
          margin: 0;
          font-size: 1.4rem;
          color: #0f172a;
        }
        .dashboard-table-summary {
          display: flex;
          gap: 1rem;
          color: var(--text-muted);
        }

        /* Grid container: each row is a grid, columns defined by data roles */
        .data-grid {
          padding: 0 0.5rem 0.5rem 0.5rem;
        }
        .data-header, .data-row {
          display: grid;
          gap: 0.75rem;
          padding: 0.9rem 1.2rem;
          align-items: center;
        }
        .data-header {
          background: var(--table-header-bg);
          color: white;
          font-weight: bold;
          border-radius: 1rem;
          margin-bottom: 0.5rem;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .data-row {
          border-bottom: 1px solid #e2e8f0;
          transition: background 0.15s;
        }
        .data-row:hover {
          background: #ecfdf5;
        }

        /* default column layout (9 columns for large screens) */
        .data-header, .data-row {
          grid-template-columns: 60px minmax(100px, 1fr) minmax(80px, 1fr) minmax(90px, 1fr) minmax(80px, 1fr) minmax(100px, 1fr) minmax(150px, 2fr) minmax(150px, 2fr) minmax(150px, 2fr);
        }

        .col-image img {
          width: 48px;
          height: 48px;
          object-fit: cover;
          border-radius: 50%;
          border: 2px solid #10b981;
          background: #f0fdf4;
        }
        .col-name { font-weight: 600; color: var(--text-dark); }
        .col-ras, .col-kelas, .col-kelamin, .col-guild { color: var(--text-muted); }
        .col-trait, .col-kelebihan, .col-kelemahan {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .badge {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          border-radius: 2rem;
          font-size: 0.7rem;
          font-weight: 500;
          white-space: nowrap;
        }
        .badge-trait { background: #dbeafe; color: #1e40af; }
        .badge-kelebihan { background: #dcfce7; color: #166534; }
        .badge-kelemahan { background: #fee2e2; color: #991b1b; }

        /* ----- RESPONSIVE COLUMN HIDING ----- */
        @media (max-width: 640px) {
          .data-header, .data-row {
            grid-template-columns: 60px 1fr 1fr !important;
          }
          .col-kelas, .col-kelamin, .col-guild, .col-trait, .col-kelebihan, .col-kelemahan {
            display: none;
          }
          .data-header .col-kelas, .data-header .col-kelamin, .data-header .col-guild,
          .data-header .col-trait, .data-header .col-kelebihan, .data-header .col-kelemahan {
            display: none;
          }
        }

        @media (min-width: 641px) and (max-width: 900px) {
          .data-header, .data-row {
            grid-template-columns: 60px 1fr 1fr 1fr 1fr !important;
          }
          .col-kelamin, .col-trait, .col-kelebihan, .col-kelemahan {
            display: none;
          }
          .data-header .col-kelamin, .data-header .col-trait,
          .data-header .col-kelebihan, .data-header .col-kelemahan {
            display: none;
          }
        }

        @media (min-width: 901px) and (max-width: 1200px) {
          .data-header, .data-row {
            grid-template-columns: 60px 1fr 1fr 1fr 1fr 1.5fr 1.5fr !important;
          }
          .col-kelebihan, .col-kelemahan {
            display: none;
          }
          .data-header .col-kelebihan, .data-header .col-kelemahan {
            display: none;
          }
        }

        @media (min-width: 1201px) {
          .data-header, .data-row {
            grid-template-columns: 60px minmax(100px, 1fr) minmax(80px, 1fr) minmax(90px, 1fr) minmax(80px, 1fr) minmax(100px, 1fr) minmax(150px, 2fr) minmax(150px, 2fr) minmax(150px, 2fr);
          }
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #475569;
        }
        .reset-button {
          background: var(--accent-green);
          border: none;
          padding: 0.5rem 1.2rem;
          border-radius: 2rem;
          color: white;
          cursor: pointer;
          margin-top: 1rem;
        }
      `}</style>

      {/* Header & Stats (your original design) */}
      <header className="dashboard-header">
        <div>
          <p className="dashboard-subtitle">Admin Dashboard</p>
          <h1>Character Management</h1>
          <p className="dashboard-description">
            Cari dan filter karakter berdasarkan trait, kelebihan, dan kelemahan.
          </p>
        </div>
        <div className="dashboard-stats">
          <div className="dashboard-stat-card dashboard-stat-primary">
            <span>Total Characters</span>
            <strong>{DataKarakter.length}</strong>
          </div>
          <div className="dashboard-stat-card dashboard-stat-secondary">
            <span>Showing</span>
            <strong>{filteredFrameworks.length}</strong>
          </div>
        </div>
      </header>

      {/* Filter Panel (unchanged) */}
      <section className="dashboard-panel">
        <div className="dashboard-panel-grid">
          <div className="dashboard-filter-card">
            <h2>Quick Filters</h2>
            <p className="dashboard-filter-help">Gunakan filter untuk menemukan karakter yang cocok.</p>

            <input
              type="search"
              name="searchTerm"
              value={dataForm.searchTerm}
              placeholder="Search by name, guild, class..."
              className="dashboard-input"
              onChange={handleChange}
            />
            <select
              name="selectedtrait"
              value={dataForm.selectedtrait}
              onChange={handleChange}
              className="dashboard-select"
            >
              <option value="">All traits</option>
              {alltrait.map((trait, index) => (
                <option key={index} value={trait}>
                  {trait}
                </option>
              ))}
            </select>


            <select
              name="selectedkelebihan"
              value={dataForm.selectedkelebihan}
              onChange={handleChange}
              className="dashboard-select"
            >
              <option value="">All kelebihan</option>
              {allkelebihan.map((kelebihan, index) => (
                <option key={index} value={kelebihan}>
                  {kelebihan}
                </option>
              ))}
            </select>


            <select
              name="selectedkelemahan"
              value={dataForm.selectedkelemahan}
              onChange={handleChange}
              className="dashboard-select"
            >
              <option value="">All kelemahan</option>
              {allkelemahan.map((kelemahan, index) => (
                <option key={index} value={kelemahan}>
                  {kelemahan}
                </option>
              ))}
            </select>

          </div>

          <div className="dashboard-summary-card">
            <h2>Filter Summary</h2>
            <div className="dashboard-summary-item">
              <span>Search term</span>
              <strong>{dataForm.searchTerm || 'None'}</strong>
            </div>
            <div className="dashboard-summary-item">
              <span>Selected trait</span>
              <strong>{dataForm.selectedtrait || 'None'}</strong>
            </div>
            <div className="dashboard-summary-item">
              <span>Selected kelebihan</span>
              <strong>{dataForm.selectedkelebihan || 'None'}</strong>
            </div>
            <div className="dashboard-summary-item">
              <span>Selected kelemahan</span>
              <strong>{dataForm.selectedkelemahan || 'None'}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ROW & COLUMN TABLE (replaces your old table) */}
      <section className="dashboard-table-card">
        <div className="dashboard-table-header">
          <div>
            <p className="dashboard-table-title">Character List</p>
            <h2>{filteredFrameworks.length} rows found</h2>
          </div>
          <div className="dashboard-table-summary">
            <span>{DataKarakter.length} total characters</span>
            <span>{filteredFrameworks.length} filtered</span>
          </div>
        </div>

        <div className="data-grid">
          {/* Header row – defines column names */}
          <div className="data-header">
            <div className="col-image">Potret</div>
            <div className="col-name">Nama</div>
            <div className="col-ras">Ras</div>
            <div className="col-kelas">Kelas</div>
            <div className="col-kelamin">Kelamin</div>
            <div className="col-guild">Guild</div>
            <div className="col-trait">Sifat (Trait)</div>
            <div className="col-kelebihan">Kelebihan</div>
            <div className="col-kelemahan">Kelemahan</div>
          </div>

          {/* Data rows – one row per character */}
          {filteredFrameworks.length === 0 ? (
            <div className="empty-state">
              <p>✨ Tidak ada karakter yang cocok dengan filter ✨</p>
              <button
                className="reset-button"
                onClick={() => setDataForm({ searchTerm: '', selectedtrait: '', selectedkelebihan: '', selectedkelemahan: '' })}
              >
                Reset semua filter
              </button>
            </div>
          ) : (
            filteredFrameworks.map((karakter) => (
              <div key={karakter.user_id} className="data-row">
                <div className="col-image">
                  <img src={karakter.image} alt={karakter.nama} />
                </div>
                <div className="col-name">{karakter.nama}</div>
                <div className="col-ras">{karakter.ras}</div>
                <div className="col-kelas">{karakter.kelas}</div>
                <div className="col-kelamin">{karakter.kelamin}</div>
                <div className="col-guild">{karakter.Guild}</div>
                <div className="col-trait">
                  {karakter.trait.map((t, idx) => (
                    <span key={idx} className="badge badge-trait">{t}</span>
                  ))}
                </div>
                <div className="col-kelebihan">
                  {karakter.Kelebihan.map((k, idx) => (
                    <span key={idx} className="badge badge-kelebihan">{k}</span>
                  ))}
                </div>
                <div className="col-kelemahan">
                  {karakter.Kelemahan.map((k, idx) => (
                    <span key={idx} className="badge badge-kelemahan">{k}</span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}