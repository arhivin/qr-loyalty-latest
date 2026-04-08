import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

import MerchantList from "../components/MerchantList";
import PosList from "../components/PosList";
import AddMerchant from "../components/AddMerchant";
import AddPos from "../components/AddPos";

function AdminLogin({ onDone }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function signIn(e) {
    e.preventDefault();
    setErr("");

    // Supabase v2: signInWithPassword
    if (supabase?.auth?.signInWithPassword) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return setErr(error.message);
      onDone?.(data?.session || null);
      return;
    }

    // Supabase v1 fallback: signIn
    if (supabase?.auth?.signIn) {
      const { session, error } = await supabase.auth.signIn({ email, password });
      if (error) return setErr(error.message);
      onDone?.(session || null);
      return;
    }

    setErr("Supabase auth fonksiyonları bulunamadı (supabase-js sürümü uyumsuz olabilir).");
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 16, border: "1px solid #ddd", borderRadius: 10 }}>
      <h2>Admin Giriş</h2>
      <form onSubmit={signIn}>
        <div style={{ marginBottom: 10 }}>
          <div>Email</div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: 10 }} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <div>Şifre</div>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: 10 }} />
        </div>
        {err && <div style={{ color: "crimson", marginBottom: 10 }}>{err}</div>}
        <button style={{ width: "100%", padding: 10 }}>Giriş</button>
      </form>
    </div>
  );
}

export default function Admin() {
  const [session, setSession] = useState(null);
  const [fatal, setFatal] = useState("");

  useEffect(() => {
    let unsub = null;

    (async () => {
      try {
        if (!supabase?.auth?.getSession) {
          // v1: session() fonksiyonu
          if (supabase?.auth?.session) setSession(supabase.auth.session());
        } else {
          const { data } = await supabase.auth.getSession();
          setSession(data?.session || null);
        }

        if (supabase?.auth?.onAuthStateChange) {
          const res = supabase.auth.onAuthStateChange((_event, newSession) => setSession(newSession || null));

          // v2: { data: { subscription } }
          if (res?.data?.subscription?.unsubscribe) unsub = () => res.data.subscription.unsubscribe();
          // bazı sürümler: direkt subscription
          else if (res?.unsubscribe) unsub = () => res.unsubscribe();
        }
      } catch (e) {
        setFatal(e?.message || String(e));
      }
    })();

    return () => {
      try {
        if (unsub) unsub();
      } catch {}
    };
  }, []);

  async function signOut() {
    try {
      if (supabase?.auth?.signOut) await supabase.auth.signOut();
      setSession(null);
    } catch (e) {
      setFatal(e?.message || String(e));
    }
  }

  if (fatal) {
    return (
      <div style={{ maxWidth: 900, margin: "20px auto", padding: 16 }}>
        <h2>Admin Hata</h2>
        <pre style={{ whiteSpace: "pre-wrap", background: "#111", color: "#fff", padding: 12, borderRadius: 8 }}>
          {fatal}
        </pre>
      </div>
    );
  }

  if (!session) return <AdminLogin onDone={setSession} />;

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2>Admin Panel</h2>
        <button onClick={signOut}>Çıkış</button>
      </div>

      <div style={{ display: "grid", gap: 16 }}>
        <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 10 }}>
          <h3>Merchant Ekle</h3>
          <AddMerchant />
        </div>

        <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 10 }}>
          <h3>Merchant List</h3>
          <MerchantList />
        </div>

        <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 10 }}>
          <h3>POS Ekle</h3>
          <AddPos />
        </div>

        <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 10 }}>
          <h3>POS List</h3>
          <PosList />
        </div>
      </div>
    </div>
  );
}
