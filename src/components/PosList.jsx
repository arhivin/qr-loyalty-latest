import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function PosList() {
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      setErr("");
      const { data, error } = await supabase
        .from("merchant_pos_devices")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) return setErr(error.message);
      setRows(data || []);
    })();
  }, []);

  return (
    <div>
      {err && <div style={{ color: "crimson", marginBottom: 10 }}>{err}</div>}
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {rows.map((p) => (
          <li key={`${p.merchant_slug}:${p.pos_device_id}`}>
            <b>{p.merchant_slug}</b> — {p.pos_device_id} {p.label ? `(${p.label})` : ""} {p.is_active ? "" : "(pasif)"}
          </li>
        ))}
      </ul>
    </div>
  );
}
