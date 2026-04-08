import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import QRCode from "qrcode";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function getDeviceId() {
  let id = localStorage.getItem("device_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("device_id", id);
  }
  return id;
}

export default function Qr1() {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const merchant = params.get("m") || "kahveci";
  const deviceId = useMemo(() => getDeviceId(), []);

  const [count, setCount] = useState(null);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [merchantOk, setMerchantOk] = useState(null); // null=kontrol, true/false
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let alive = true;

    (async () => {
      setMerchantOk(null);
      setMsg("");

      const { data, error } = await supabase
        .from("merchants")
        .select("slug")
        .eq("slug", merchant)
        .eq("is_active", true)
        .maybeSingle();

      if (!alive) return;

      if (error) {
        setMerchantOk(false);
        setMsg("MERCHANT CHECK ERROR: " + error.message);
        return;
      }

      const ok = !!data?.slug;
      setMerchantOk(ok);
      if (!ok) setMsg("MERCHANT BULUNAMADI / PASİF.");
    })();

    return () => {
      alive = false;
    };
  }, [merchant]);

  useEffect(() => {
    if (merchantOk !== true) return;

    (async () => {
      const { data } = await supabase
        .from("device_stamps")
        .select("stamp_count")
        .eq("merchant_slug", merchant)
        .eq("device_id", deviceId)
        .maybeSingle();

      setCount(data?.stamp_count ?? 0);
    })();
  }, [merchant, deviceId, merchantOk]);

  useEffect(() => {
    if (merchantOk !== true) {
      setQrDataUrl("");
      return;
    }

    (async () => {
      const url =
        `${window.location.origin}/qr-2?m=${encodeURIComponent(merchant)}` +
        `&d=${encodeURIComponent(deviceId)}`;

      const dataUrl = await QRCode.toDataURL(url, { margin: 1, width: 260 });
      setQrDataUrl(dataUrl);
    })();
  }, [merchant, deviceId, merchantOk]);

  return (
    <div style={{ padding: 40, fontFamily: "system-ui" }}>
      <div style={{ fontSize: 22, fontWeight: 800 }}>{merchant}</div>

      <div style={{ marginTop: 10, fontSize: 12, opacity: 0.9 }}>
        {merchantOk === null ? "Merchant kontrol..." : merchantOk ? "Merchant OK" : "Merchant yok"}
      </div>

      {msg ? (
        <div style={{ marginTop: 10, fontSize: 12, opacity: 0.85 }}>{msg}</div>
      ) : null}

      <div style={{ marginTop: 10, fontSize: 48, fontWeight: 900 }}>
        {merchantOk !== true ? "-" : count === null ? "..." : count}
      </div>

      <div style={{ marginTop: 18, fontSize: 14, opacity: 0.8 }}>Kasaya göster</div>

      {merchantOk === true ? (
        qrDataUrl ? (
          <img src={qrDataUrl} alt="qr" style={{ marginTop: 10, width: 260, height: 260 }} />
        ) : (
          <div style={{ marginTop: 10 }}>QR hazırlanıyor…</div>
        )
      ) : (
        <div style={{ marginTop: 10, fontSize: 12, opacity: 0.85 }}>
          QR üretimi kapalı.
        </div>
      )}
    </div>
  );
}
