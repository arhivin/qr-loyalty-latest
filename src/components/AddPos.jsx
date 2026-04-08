import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AddPos() {
  const [merchantSlug, setMerchantSlug] = useState("");
  const [posDeviceId, setPosDeviceId] = useState("");
  const [label, setLabel] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [msg, setMsg] = useState("");

  async function add(e) {
    e.preventDefault();
    setMsg("");

    const m = merchantSlug.trim();
    const p = posDeviceId.trim();
    const l = label.trim();

    if (!m || !p) return setMsg("merchant_slug ve pos_device_id gerekli.");

    const { error } = await supabase
      .from("merchant_pos_devices")
      .insert([{ merchant_slug: m, pos_device_id: p, label: l || null, is_active: isActive }]);

    if (error) return setMsg(error.message);

    setMerchantSlug("");
    setPosDeviceId("");
    setLabel("");
    setIsActive(true);
    setMsg("Eklendi.");
  }

  return (
    <form onSubmit={add} style={{ display: "grid", gap: 10 }}>
      <div>
        <div>merchant_slug</div>
        <input value={merchantSlug} onChange={(e) => setMerchantSlug(e.target.value)} style={{ width: "100%", padding: 10 }} />
      </div>

      <div>
        <div>pos_device_id</div>
        <input value={posDeviceId} onChange={(e) => setPosDeviceId(e.target.value)} style={{ width: "100%", padding: 10 }} />
      </div>

      <div>
        <div>label (opsiyonel)</div>
        <input value={label} onChange={(e) => setLabel(e.target.value)} style={{ width: "100%", padding: 10 }} />
      </div>

      <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
        aktif
      </label>

      <button style={{ padding: 10 }}>POS Ekle</button>

      {msg && <div style={{ color: msg === "Eklendi." ? "green" : "crimson" }}>{msg}</div>}
    </form>
  );
}
