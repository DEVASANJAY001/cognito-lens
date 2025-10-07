/// <reference types="chrome" />
import { useState, useEffect } from "react";
import "./options.css";

// @ts-ignore - Chrome APIs available at runtime
/* global chrome */

const Options = () => {
  const [openaiKey, setOpenaiKey] = useState("");
  const [geminiKey, setGeminiKey] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  const [showKeys, setShowKeys] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const result = await chrome.storage.sync.get(["openaiKey", "geminiKey"]);
      setOpenaiKey(result.openaiKey || "");
      setGeminiKey(result.geminiKey || "");
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  const saveSettings = async () => {
    try {
      await chrome.storage.sync.set({
        openaiKey,
        geminiKey,
        isConfigured: !!(openaiKey || geminiKey)
      });
      
      setSaveStatus("✓ Settings saved successfully!");
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      setSaveStatus("✗ Error saving settings");
      console.error("Error saving settings:", error);
    }
  };

  const clearSettings = async () => {
    if (confirm("Are you sure you want to clear all API keys?")) {
      setOpenaiKey("");
      setGeminiKey("");
      await chrome.storage.sync.clear();
      setSaveStatus("✓ Settings cleared");
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };

  return (
    <div className="options-container">
      <div className="options-header">
        <div className="header-content">
          <div className="icon-large">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="12" fill="url(#gradient)" />
              <path
                d="M24 12L30 18L24 24L18 18L24 12Z"
                fill="white"
                opacity="0.9"
              />
              <path
                d="M24 24L30 30L24 36L18 30L24 24Z"
                fill="white"
                opacity="0.7"
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="48" y2="48">
                  <stop stopColor="#667eea" />
                  <stop offset="1" stopColor="#764ba2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="options-title">AI Browser Settings</h1>
          <p className="options-subtitle">
            Configure your API keys for AI-powered features
          </p>
        </div>
      </div>

      <div className="options-content">
        <div className="settings-section">
          <div className="section-header">
            <h2 className="section-title">API Configuration</h2>
            <div className="toggle-container">
              <input
                type="checkbox"
                id="show-keys"
                checked={showKeys}
                onChange={(e) => setShowKeys(e.target.checked)}
              />
              <label htmlFor="show-keys">Show keys</label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-text">OpenAI API Key</span>
              <span className="label-badge">Optional</span>
            </label>
            <input
              type={showKeys ? "text" : "password"}
              className="form-input"
              placeholder="sk-..."
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
            />
            <p className="form-help">
              Get your API key from{" "}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
              >
                OpenAI Platform
              </a>
            </p>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-text">Google Gemini API Key</span>
              <span className="label-badge">Optional</span>
            </label>
            <input
              type={showKeys ? "text" : "password"}
              className="form-input"
              placeholder="AIza..."
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
            />
            <p className="form-help">
              Get your API key from{" "}
              <a
                href="https://makersuite.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google AI Studio
              </a>
            </p>
          </div>

          {saveStatus && (
            <div className={`save-status ${saveStatus.includes("✓") ? "success" : "error"}`}>
              {saveStatus}
            </div>
          )}

          <div className="button-row">
            <button className="btn btn-primary" onClick={saveSettings}>
              💾 Save Settings
            </button>
            <button className="btn btn-secondary" onClick={clearSettings}>
              🗑️ Clear All
            </button>
          </div>
        </div>

        <div className="info-section">
          <h3 className="info-title">🔒 Privacy & Security</h3>
          <ul className="info-list">
            <li>API keys are stored locally in your browser</li>
            <li>Keys are synced across your Chrome devices (if signed in)</li>
            <li>No data is sent to external servers except AI providers</li>
            <li>You can clear all data at any time</li>
          </ul>
        </div>

        <div className="info-section">
          <h3 className="info-title">📚 Features</h3>
          <ul className="info-list">
            <li>Highlight web pages with visual effects</li>
            <li>Send custom alerts to active tabs</li>
            <li>AI-powered text analysis (with configured keys)</li>
            <li>Content script interaction capabilities</li>
          </ul>
        </div>
      </div>

      <div className="options-footer">
        <p className="footer-version">AI Browser Extension v1.0.0</p>
        <p className="footer-copyright">
          Built with React, TypeScript & Vite
        </p>
      </div>
    </div>
  );
};

export default Options;
