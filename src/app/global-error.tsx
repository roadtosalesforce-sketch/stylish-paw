"use client";

import {useEffect} from "react";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & {digest?: string};
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("Global storefront error", error.digest || "client");
  }, [error]);

  return (
    <html lang="pl">
      <body style={{margin: 0, background: "#f3f1eb", color: "#181914", fontFamily: "Arial, sans-serif"}}>
        <main style={{minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, textAlign: "center"}}>
          <div style={{maxWidth: 600}}>
            <p style={{fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase"}}>Furry Fairy Pets</p>
            <h1 style={{fontSize: 42, lineHeight: 1.1, margin: "18px 0"}}>Coś poszło nie tak</h1>
            <p style={{color: "#57534e", lineHeight: 1.7}}>Something went wrong. Please try loading the store again.</p>
            <button type="button" onClick={() => unstable_retry()} style={{marginTop: 22, border: 0, background: "#181914", color: "white", padding: "14px 26px", fontWeight: 700, cursor: "pointer"}}>Try again / Spróbuj ponownie</button>
          </div>
        </main>
      </body>
    </html>
  );
}
