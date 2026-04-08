import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AddMerchant() {
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [msg, setMsg] = useState("");

  async function add(e) {
    e.preventDefault();
    setMsg("");

    const s = slug.trim();
    const n = name.trim();
    if (!s || !n) return setMsg("slug ve name gerekli.");

    const { error } = await supabase.from("merchants").insert([{ slug: s, name: n, is_active: isActive }]);
    if (error) return setMsg(error.message);

    setSlug("");
    setName("");
    setIsActive(true);
    setMsg("Eklendi.");
  }

  return (
    <form onSubmit={add} style={{ display: "grid", gap: 10 }}>
      <div>
        <div>slug</div>
        <input value={slug} onChange={(e) => setSlug(e.target.value)} style={{ width: "100%", padding: 10 }} />
      </div>

      <div>
        <div>name</div>
        <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: 10 }} />
      </div>

      <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
        aktif
      </label>

      <button style={{ padding: 10 }}>Merchant Ekle</button>

      {msg && <div style={{ color: msg === "Eklendi." ? "green" : "crimson" }}>{msg}</div>}
    </form>
  );
}
