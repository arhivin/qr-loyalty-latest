import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

function getOrCreateLS(key, prefix) {
  let v = localStorage.getItem(key);
  if (!v) {
    v =
      prefix +
      "-" +
      (crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()) + "-" + Math.random());
    localStorage.setItem(key, v);
  }
  return v;
}

export default function Qr2() {
  const [sp] = useSearchParams();

  const merchant = (sp.get("m") || "").trim();
  const customerDeviceId = (sp.get("d") || "").trim();

  // POS cihaz id (localStorage)
  const thisPosDeviceId = useMemo(() => getOrCreateLS("pos_device_id", "pos"), []);

  const [merchantOk, setMerchantOk] = useState(false);
  const [posOk, setPosOk] = useState(false);
  const [busy, setBusy] = useState(false);

  // Merchant kontrol
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!merchant) {
        setMerchantOk(false);
        return;
      }
      const { data, error } = await supabase
        .from("merchants")
        .select("slug,is_active")
        .eq("slug", merchant)
        .maybeSingle();

      if (cancelled) return;
      if (error || !data) return setMerchantOk(false);
      setMerchantOk(!!data.is_active);
    })();
    return () => {
      cancelled = true;
    };
  }, [merchant]);

  // POS kontrol
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!merchantOk) {
        setPosOk(false);
        return;
      }
      const { data, error } = await supabase
        .from("merchant_pos_devices")
        .select("pos_device_id,is_active")
        .eq("merchant_slug", merchant)
        .eq("pos_device_id", thisPosDeviceId)
        .maybeSingle();

      if (cancelled) return;
      if (error || !data) return setPosOk(false);
      setPosOk(!!data.is_active);
    })();
    return () => {
      cancelled = true;
    };
  }, [merchantOk, merchant, thisPosDeviceId]);

  async function addStamp() {
    try {
      if (!merchantOk || !posOk) return;
      if (!merchant || !customerDeviceId) return;

      setBusy(true);

      const { data, error } = await supabase.rpc("increment_stamp", {
        p_merchant_slug: merchant,
        p_device_id: customerDeviceId,
        p_pos_device_id: thisPosDeviceId,
      });

      if (error) {
        alert("RPC ERROR: " + error.message);
        return;
      }

      alert("OK total=" + String(data ?? ""));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>QR-2 (POS)</h1>

      <div style={{ marginTop: 12, lineHeight: 1.8 }}>
        <div>merchant={merchant || "-"}</div>
        <div>customer_device_id={customerDeviceId || "-"}</div>
        <div>this_pos_device_id={thisPosDeviceId}</div>
        <div style={{ marginTop: 8 }}>{merchantOk ? "Merchant OK" : "Merchant YOK"}</div>
        <div>{posOk ? "POS OK" : "POS YOK"}</div>
      </div>

      <button
        onClick={addStamp}
        disabled={!merchantOk || !posOk || !customerDeviceId || busy}
        style={{ marginTop: 16, padding: "10px 14px" }}
      >
        {busy ? "..." : "Stamp ekle"}
      </button>

      {!customerDeviceId && (
        <div style={{ marginTop: 10, color: "crimson" }}>
          QR okutulmadı: URL’de d parametresi yok.
        </div>
      )}
    </div>
  );
}
