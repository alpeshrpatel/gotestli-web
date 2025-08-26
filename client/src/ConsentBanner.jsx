import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie_consent_v1"; // bump version if you change categories

function updateConsent({ analytics, ads }) {
  // Map toggles to Consent Mode values
  const consent = {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: ads ? "granted" : "denied",
    ad_user_data: ads ? "granted" : "denied",
    ad_personalization: ads ? "granted" : "denied",
  };

  // Update Consent Mode (via gtag/dataLayer)
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({ event: "consent_update_init" });
    window.gtag?.("consent", "update", consent);
    window.dataLayer.push({ event: "consent_updated" });
  }
}

export default function ConsentBanner() {
  const [show, setShow] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [ads, setAds] = useState(false); // default preference in UI (user can change)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setShow(true); // no decision yet
      } else {
        // If user decided before, apply it again on load
        const parsed = JSON.parse(saved);
        updateConsent(parsed);
        setShow(false);
      }
    } catch (e) {
      setShow(true);
    }
  }, []);

  const acceptAll = () => {
    const choice = { analytics: true, ads: true };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
    updateConsent(choice);
    setShow(false);
  };

  const rejectAll = () => {
    const choice = { analytics: false, ads: false };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
    updateConsent(choice);
    setShow(false);
  };

  const savePreferences = () => {
    const choice = { analytics, ads };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
    updateConsent(choice);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div style={styles.backdrop} role="dialog" aria-modal="true" aria-label="Cookie consent">
      <div style={styles.box}>
        <h3 style={{ margin: "0 0 8px" }}>We use cookies</h3>
        <p style={{ margin: "0 0 12px", lineHeight: 1.4 }}>
          We use cookies to analyze traffic and improve your experience. You can accept all cookies,
          reject non-essential cookies, or choose your preferences.
        </p>

        <details style={styles.details}>
          <summary style={styles.summary}>Customize</summary>
          <div style={{ marginTop: 8 }}>
            <label style={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
              />
              <span style={{ marginLeft: 8, fontWeight: 600 }}>Analytics</span>
              <span style={styles.hint}> (helps us understand usage)</span>
            </label>

            <label style={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={ads}
                onChange={(e) => setAds(e.target.checked)}
              />
              <span style={{ marginLeft: 8, fontWeight: 600 }}>Advertising</span>
              <span style={styles.hint}> (personalized ads & measurement)</span>
            </label>
          </div>
        </details>

        <div style={styles.actions}>
          <button onClick={rejectAll} style={styles.btnGhost}>Reject all</button>
          <button onClick={savePreferences} style={styles.btnOutline}>Save preferences</button>
          <button onClick={acceptAll} style={styles.btnPrimary}>Accept all</button>
        </div>

        <p style={styles.footer}>
          Read our <a href="/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}

const styles = {
  backdrop: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,.45)",
    display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 9999,
  },
  box: {
    width: "min(720px, 96%)", background: "#fff", color: "#111", borderRadius: 12,
    padding: 16, margin: 12, boxShadow: "0 10px 30px rgba(0,0,0,.2)"
  },
  details: { background: "#f7f7f7", padding: "8px 10px", borderRadius: 8, marginBottom: 10 },
  summary: { cursor: "pointer", fontWeight: 600, outline: "none" },
  checkboxRow: { display: "flex", alignItems: "center", margin: "6px 0" },
  hint: { marginLeft: 6, color: "#666", fontSize: 13 },
  actions: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 10, flexWrap: "wrap" },
  btnPrimary: { background: "#111", color: "#fff", border: "none", padding: "8px 14px", borderRadius: 8, cursor: "pointer" },
  btnOutline: { background: "transparent", color: "#111", border: "1px solid #111", padding: "8px 14px", borderRadius: 8, cursor: "pointer" },
  btnGhost: { background: "transparent", color: "#111", border: "none", padding: "8px 14px", borderRadius: 8, cursor: "pointer", opacity: 0.8 },
  footer: { fontSize: 12, color: "#666", marginTop: 8 }
};
