import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function MerchantList() {
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      setErr("");
      const { data, error } = await supabase.from("merchants").select("*").order("created_at", { ascending: false });
      if (error) return setErr(error.message);
      setRows(data || []);
    })();
  }, []);

  return (
    <div>
      {err && <div style={{ color: "crimson", marginBottom: 10 }}>{err}</div>}
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {rows.map((m) => (
          <li key={m.slug}>
            <b>{m.slug}</b> — {m.name} {m.is_active ? "" : "(pasif)"}
          </li>
        ))}
      </ul>
    </div>
  );
}
