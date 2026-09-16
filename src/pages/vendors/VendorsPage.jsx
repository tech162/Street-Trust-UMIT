import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Users } from "lucide-react";
import { BackButton } from "../../components/BackButton";
import { Status } from "../../components/Status";
import { vendors } from "../../data/mockData";

export function VendorsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(
    () =>
      vendors.filter(
        (v) =>
          (v.name + " " + v.id + " " + v.area + " " + v.category)
            .toLowerCase()
            .includes(q.toLowerCase()) && (status === "All" || v.status === status)
      ),
    [q, status]
  );

  return (
    <div className="page">
      <BackButton label="Dashboard" to="/dashboard" />
      <div className="page-heading">
        <div>
          <span className="eyebrow">VENDOR DIRECTORY</span>
          <h1>Vendors</h1>
          <p>Search, filter and manage your assigned food businesses.</p>
        </div>
        <button className="primary-btn">
          <Users size={17} /> Add vendor
        </button>
      </div>

      <section className="panel">
        <div className="toolbar">
          <div className="search-box">
            <Search size={17} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by vendor, ID, area or category..."
            />
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All</option>
            <option>Compliant</option>
            <option>Warning</option>
            <option>Non-Compliant</option>
          </select>
        </div>
        <div className="result-line">
          {filtered.length} vendors found <span>·</span> Updated just now
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Category</th>
                <th>Location</th>
                <th>Trust score</th>
                <th>Last inspection</th>
                <th>Compliance</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <tr key={v.id}>
                  <td>
                    <div className="table-vendor">
                      <div className="mini-avatar">{v.name[0]}</div>
                      <div>
                        <strong>{v.name}</strong>
                        <small>{v.id}</small>
                      </div>
                    </div>
                  </td>
                  <td>{v.category}</td>
                  <td>{v.area}</td>
                  <td>
                    <div className="score-bar-wrap">
                      <div className="score-num">
                        <strong className="score-text">{v.score}</strong>
                        <span className="outof">/100</span>
                      </div>
                      <div className="score-bar-track">
                        <div
                          className={`score-bar-fill ${v.score >= 85 ? "green" : v.score >= 70 ? "amber" : "red"}`}
                          style={{ width: `${v.score}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td>{v.last}</td>
                  <td><Status>{v.status}</Status></td>
                  <td>
                    <Link to={`/vendors/${v.id}`} className="ghost-btn">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
