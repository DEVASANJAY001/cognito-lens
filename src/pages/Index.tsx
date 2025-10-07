const Index = () => {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      padding: "2rem"
    }}>
      <div style={{ textAlign: "center", maxWidth: "800px" }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "700",
          color: "white",
          marginBottom: "1.5rem",
          textShadow: "0 4px 12px rgba(0,0,0,0.3)"
        }}>
          AI Browser Extension
        </h1>
        <p style={{
          fontSize: "1.25rem",
          color: "rgba(255,255,255,0.9)",
          marginBottom: "2rem",
          lineHeight: "1.8"
        }}>
          A complete Chrome Extension built with React, TypeScript, and Vite. <br />
          Configured for Manifest V3 with popup, options, background, and content scripts.
        </p>
        <div style={{
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          padding: "2rem",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.2)"
        }}>
          <h2 style={{ color: "white", fontSize: "1.5rem", marginBottom: "1rem" }}>
            🚀 Getting Started
          </h2>
          <ol style={{
            textAlign: "left",
            color: "rgba(255,255,255,0.9)",
            fontSize: "1rem",
            lineHeight: "1.8",
            paddingLeft: "1.5rem"
          }}>
            <li>Run <code style={{ background: "rgba(0,0,0,0.2)", padding: "0.25rem 0.5rem", borderRadius: "4px" }}>npm install</code></li>
            <li>Run <code style={{ background: "rgba(0,0,0,0.2)", padding: "0.25rem 0.5rem", borderRadius: "4px" }}>npm run build</code></li>
            <li>Open Chrome and go to <code style={{ background: "rgba(0,0,0,0.2)", padding: "0.25rem 0.5rem", borderRadius: "4px" }}>chrome://extensions/</code></li>
            <li>Enable "Developer mode"</li>
            <li>Click "Load unpacked" and select the <code style={{ background: "rgba(0,0,0,0.2)", padding: "0.25rem 0.5rem", borderRadius: "4px" }}>dist</code> folder</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Index;
