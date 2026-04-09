export default function Landing() {
  return (
    <div
  style={{
    minHeight: "100vh",
    background: "#f6f6f4",
    color: "#111",
    fontFamily: "system-ui, -apple-system, sans-serif",
    padding: "16px",
    boxSizing: "border-box"
  }}
>
  <div
    style={{
      maxWidth: 1100,
      margin: "0 auto",
      padding: "56px 24px 80px",
    }}
  >
        <div
          style={{
            display: "inline-block",
            padding: "8px 14px",
            borderRadius: 999,
            background: "#111",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 0.3,
          }}
        >
          QR Loyalty Demo
        </div>

        <div
          style={{
            marginTop: 28,
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: 28,
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 24,
              padding: 36,
              boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#666",
                letterSpacing: 0.2,
              }}
            >
              Kafeler için hızlı sadakat çözümü
            </div>

            <h1
              style={{
                marginTop: 14,
                fontSize: 48,
                lineHeight: 1.05,
                marginBottom: 0,
                fontWeight: 900,
                letterSpacing: -1.4,
              }}
            >
              Kart bastırmadan
              <br />
              QR ile müşteri bağlılığı
            </h1>

            <p
              style={{
                marginTop: 20,
                fontSize: 18,
                lineHeight: 1.6,
                color: "#444",
                maxWidth: 700,
              }}
            >
              Müşteri QR okutur, kasada onaylanır, puanı birikir. Üyelik yok,
              uygulama yok, gereksiz veri yok.
            </p>

            <div
              style={{
                marginTop: 26,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <a
                href="/qr-1?m=forshanti"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "14px 22px",
                  background: "#111",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 16,
                  minHeight: 48,
                  boxSizing: "border-box",
                }}
              >
                Demo’yu dene
              </a>

              <a
                href="https://wa.me/905301389731?text=QR%20sadakat%20sistemi%20hakkında%20bilgi%20almak%20istiyorum"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "14px 22px",
                  background: "#25D366",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 16,
                  minHeight: 48,
                  boxSizing: "border-box",
                }}
              >
                İşletmem için kur
              </a>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "14px 18px",
                  background: "#f1f1ee",
                  borderRadius: 12,
                  fontWeight: 600,
                  fontSize: 15,
                  color: "#333",
                  minHeight: 48,
                  boxSizing: "border-box",
                }}
              >
                Kişisel veri toplamaz
              </div>
            </div>

            <div
              style={{
                marginTop: 28,
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              {[
                "Üyelik yok",
                "Uygulama yok",
                "POS onaylı",
                "Günlük limitli",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    padding: "10px 14px",
                    background: "#fafaf8",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#333",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "#111",
              color: "#fff",
              borderRadius: 24,
              padding: 28,
              boxShadow: "0 10px 30px rgba(0,0,0,0.10)",
            }}
          >
            <div style={{ fontSize: 14, opacity: 0.7, fontWeight: 700 }}>
              Nasıl çalışır
            </div>

            <div style={{ marginTop: 24, display: "grid", gap: 18 }}>
              {[
                ["1", "Müşteri QR’ı okutur"],
                ["2", "Kasada doğrulama yapılır"],
                ["3", "Puan otomatik işlenir"],
                ["4", "Aynı gün ikinci basış engellenir"],
              ].map(([n, text]) => (
                <div
                  key={n}
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                    padding: 16,
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 16,
                  }}
                >
                  <div
                    style={{
                      minWidth: 34,
                      height: 34,
                      borderRadius: 999,
                      background: "#fff",
                      color: "#111",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                    }}
                  >
                    {n}
                  </div>
                  <div style={{ fontSize: 16, lineHeight: 1.5 }}>{text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 28,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 18,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 24,
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 800 }}>Hızlı kullanım</div>
            <p style={{ marginTop: 10, color: "#555", lineHeight: 1.6 }}>
              Müşteri tarafında üyelik akışı yok. QR okut, göster, puan işle.
            </p>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 24,
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 800 }}>Anonim yapı</div>
            <p style={{ marginTop: 10, color: "#555", lineHeight: 1.6 }}>
              İsim, telefon, e-posta toplamaz. Sistem cihaz bazlı anonim çalışır.
            </p>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 24,
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 800 }}>Kontrollü akış</div>
            <p style={{ marginTop: 10, color: "#555", lineHeight: 1.6 }}>
              Sadece tanımlı POS cihazı stamp basar. Aynı gün tekrar engellenir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}