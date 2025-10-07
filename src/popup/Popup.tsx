/// <reference types="chrome" />
import { useState, useEffect } from "react";
import "./popup.css";

// @ts-ignore - Chrome APIs available at runtime
/* global chrome */

const Popup = () => {
  const [status, setStatus] = useState("Ready");
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    checkConfiguration();
  }, []);

  const checkConfiguration = async () => {
    try {
      const result = await chrome.storage.sync.get(["openaiKey", "geminiKey"]);
      const configured = !!(result.openaiKey || result.geminiKey);
      setIsConfigured(configured);
    } catch (error) {
      console.error("Error checking configuration:", error);
    }
  };

  const handleOpenSidebar = async () => {
    setStatus("Opening AI Chat...");
    
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (tab.id) {
        await chrome.tabs.sendMessage(tab.id, {
          action: "toggleSidebar"
        });
        
        setStatus("✓ AI Chat opened!");
        setTimeout(() => setStatus("Ready"), 2000);
      }
    } catch (error) {
      setStatus("Error: Could not open sidebar");
      console.error(error);
    }
  };

  const handleHighlightPage = async (color: string) => {
    setStatus(`Highlighting with ${color}...`);
    
    try {
      const response = await chrome.runtime.sendMessage({
        action: "highlightPage",
        color: color
      });
      
      if (response?.success) {
        setStatus(`✓ Page highlighted!`);
        setTimeout(() => setStatus("Ready"), 2000);
      }
    } catch (error) {
      setStatus("Error: Could not highlight page");
      console.error(error);
    }
  };

  const handleShowAlert = async () => {
    setStatus("Sending alert...");
    
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (tab.id) {
        await chrome.tabs.sendMessage(tab.id, {
          action: "showAlert",
          text: "Hello from AI Browser Extension! 👋"
        });
        
        setStatus("✓ Alert sent!");
        setTimeout(() => setStatus("Ready"), 2000);
      }
    } catch (error) {
      setStatus("Error: Could not send alert");
      console.error(error);
    }
  };

  const openOptions = () => {
    chrome.runtime.openOptionsPage();
  };

  return (
    <div className="popup-container">
      <div className="popup-header">
        <div className="icon-wrapper">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="url(#gradient)" />
            <path
              d="M16 8L20 12L16 16L12 12L16 8Z"
              fill="white"
              opacity="0.9"
            />
            <path
              d="M16 16L20 20L16 24L12 20L16 16Z"
              fill="white"
              opacity="0.7"
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32">
                <stop stopColor="#667eea" />
                <stop offset="1" stopColor="#764ba2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 className="popup-title">AI Browser</h1>
      </div>

      <div className="status-bar">
        <span className="status-dot"></span>
        <span className="status-text">{status}</span>
      </div>

      {!isConfigured && (
        <div className="warning-banner">
          ⚠️ API keys not configured
        </div>
      )}

      <div className="popup-content">
        <p className="popup-description">
          AI-powered browser assistant with content interaction capabilities
        </p>

        <div className="button-group">
          <button
            className="action-button primary"
            onClick={handleOpenSidebar}
          >
            <span className="button-icon">💬</span>
            Open AI Chat
          </button>

          <button
            className="action-button secondary"
            onClick={() => handleHighlightPage("#4A90E2")}
          >
            <span className="button-icon">✨</span>
            Highlight Page
          </button>

          <button
            className="action-button secondary"
            onClick={handleShowAlert}
          >
            <span className="button-icon">🎨</span>
            Show Alert
          </button>
        </div>

        <button className="settings-button" onClick={openOptions}>
          <span className="button-icon">⚙️</span>
          Configure API Keys
        </button>
      </div>

      <div className="popup-footer">
        <span className="footer-text">v1.0.0</span>
      </div>
    </div>
  );
};

export default Popup;
