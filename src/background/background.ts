// Background Service Worker for AI Browser Extension
/// <reference types="chrome" />

// @ts-ignore - Chrome APIs available at runtime
/* global chrome */

console.log("🚀 AI Browser Extension - Background script loaded");

// Listen for extension installation
chrome.runtime.onInstalled.addListener((details) => {
  console.log("✅ Extension installed:", details.reason);
  
  if (details.reason === "install") {
    console.log("🎉 First time installation!");
    // Initialize default settings
    chrome.storage.sync.set({
      openaiKey: "",
      geminiKey: "",
      isConfigured: false
    });
  }
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("📬 Message received in background:", message);
  
  if (message.action === "highlightPage") {
    // Send message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "highlight",
          color: message.color || "yellow"
        });
      }
    });
    sendResponse({ success: true });
  }
  
  if (message.action === "getConfig") {
    chrome.storage.sync.get(["openaiKey", "geminiKey"], (items) => {
      sendResponse({ config: items });
    });
    return true; // Keep channel open for async response
  }
  
  if (message.action === "analyzeText") {
    // This is where you'd call AI APIs
    console.log("🤖 AI Analysis requested:", message.text);
    sendResponse({ 
      result: "AI analysis would happen here with configured API keys",
      text: message.text 
    });
  }
  
  return true;
});

// Keep service worker alive
chrome.runtime.onConnect.addListener((port) => {
  console.log("🔌 Port connected:", port.name);
});
