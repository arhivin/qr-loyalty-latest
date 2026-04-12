export default function Landing() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f6f4",
        color: "#111",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "16px",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "24px 12px 40px",
        }}
      >
        {/* ÜST BADGE */}
        <div
          style={{
            display: "inline-block",
            padding: "8px 14px",
            borderRadius: 999,
            background: "#111",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          QR Loyalty Demo
        </div>

        {/* HERO CARD */}
        <div
          style={{
            marginTop: 20,
            background: "#fff",
            borderRadius: 24,
            padding: 24,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div style={{ color: "#666", fontSize: 14 }}>
            Kafeler için hızlı sadakat çözümü
          </div>

          <h1
            style={{
              fontSize: 34,
              lineHeight: 1.1,
              marginTop: 10,
              marginBottom: 12,
            }}
          >
            Kart bastırmadan
            <br />
            QR ile müşteri bağlılığı
          </h1>

          <p
            style={{
              fontSize: 16,
              lineHeight: 1.5,
              color: "#444",
            }}
          >
            Müşteri QR okutur, kasada onaylanır, puanı birikir.
            Üyelik yok, uygulama yok, gereksiz veri yok.
          </p>

          <div
            style={{
              marginTop: 18,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <button
              style={{
                padding: "14px",
                borderRadius: 12,
                background: "#111",
                color: "#fff",
                border: "none",
                fontSize: 16,
              }}
            >
              Demo’yu dene
            </button>

            <button
              style={{
                padding: "14px",
                borderRadius: 12,
                background: "#22c55e",
                color: "#fff",
                border: "none",
                fontSize: 16,
              }}
            >
              İşletmem için kur
            </button>
          </div>
        </div>

        {/* NASIL ÇALIŞIR */}
        <div
          style={{
            marginTop: 24,
            background: "#111",
            borderRadius: 24,
            padding: 20,
            color: "#fff",
          }}
        >
          <div style={{ marginBottom: 12, color: "#aaa" }}>
            Nasıl çalışır
          </div>

          {[
            "Müşteri QR’ı okutur",
            "Kasada doğrulama yapılır",
            "Puan otomatik işlenir",
            "Aynı gün ikinci basış engellenir",
          ].map((text, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "#222",
                padding: "14px",
                borderRadius: 14,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "#fff",
                  color: "#111",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </div>
              <div>{text}</div>
            </div>
          ))}
        </div>

        {/* ALT KARTLAR */}
        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 18,
            }}
          >
            <b>Hızlı kullanım</b>
            <p style={{ marginTop: 6, color: "#555" }}>
              Müşteri tarafında üyelik akışı yok. QR okut, göster, puan işle.
            </p>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 18,
            }}
          >
            <b>Anonim yapı</b>
            <p style={{ marginTop: 6, color: "#555" }}>
              İsim, telefon, e-posta toplamaz. Sistem cihaz bazlı anonim çalışır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}