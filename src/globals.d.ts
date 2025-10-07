/// <reference types="chrome" />

// Global type declarations for Chrome Extension APIs
declare namespace chrome {
  export const runtime: typeof chrome.runtime;
  export const storage: typeof chrome.storage;
  export const tabs: typeof chrome.tabs;
}
