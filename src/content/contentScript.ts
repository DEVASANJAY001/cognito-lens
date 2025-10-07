// Content Script - Runs on all web pages
/// <reference types="chrome" />

// @ts-ignore - Chrome APIs available at runtime
/* global chrome */

console.log("🎨 AI Browser - Content script injected successfully!");

// Listen for messages from background or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("📨 Content script received message:", message);
  
  if (message.action === "highlight") {
    highlightPage(message.color);
    sendResponse({ success: true });
  }
  
  if (message.action === "getSelectedText") {
    const selectedText = window.getSelection()?.toString() || "";
    sendResponse({ text: selectedText });
  }
  
  if (message.action === "showAlert") {
    showCustomAlert(message.text);
    sendResponse({ success: true });
  }
  
  return true;
});

// Highlight page with colored border
function highlightPage(color: string) {
  const existingBorder = document.getElementById("ai-browser-border");
  if (existingBorder) {
    existingBorder.remove();
  }
  
  const border = document.createElement("div");
  border.id = "ai-browser-border";
  border.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 5px solid ${color};
    pointer-events: none;
    z-index: 999999;
    animation: borderPulse 2s ease-in-out;
  `;
  
  const style = document.createElement("style");
  style.textContent = `
    @keyframes borderPulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(border);
  
  setTimeout(() => {
    border.remove();
    style.remove();
  }, 2000);
}

// Show custom alert on page
function showCustomAlert(text: string) {
  const alert = document.createElement("div");
  alert.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    z-index: 999999;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 14px;
    font-weight: 500;
    max-width: 300px;
    animation: slideIn 0.3s ease-out;
  `;
  
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
  
  alert.textContent = text;
  document.body.appendChild(alert);
  
  setTimeout(() => {
    alert.style.animation = "slideIn 0.3s ease-out reverse";
    setTimeout(() => {
      alert.remove();
      style.remove();
    }, 300);
  }, 3000);
}

// Example: Detect text selection
document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection()?.toString();
  if (selectedText && selectedText.length > 0) {
    console.log("✨ Text selected:", selectedText);
  }
});
