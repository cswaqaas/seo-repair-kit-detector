// Content script to detect SEO Repair Kit plugin
// This runs on every page and can update the badge

(function() {
  'use strict';
  
  function detectSEORepairKit() {
    const detectionMethods = [];
    
    // Check for SEO Repair Kit specific JavaScript objects
    if (window.SEORepairKit || window.seoRepairKit || window.SEORepair) {
      detectionMethods.push('JavaScript Object');
    }
    
    // Check for SEO Repair Kit specific global variables
    if (window.__SEORepairKit__ || window.__seoRepairKit__) {
      detectionMethods.push('Global Variable');
    }
    
    // Check for scripts with SEO Repair Kit in the name
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const seoScripts = scripts.filter(script => {
      const src = script.src.toLowerCase();
      return src.includes('seo') && (src.includes('repair') || src.includes('kit'));
    });
    
    if (seoScripts.length > 0) {
      detectionMethods.push('Script Tag');
    }
    
    // Check for specific CSS classes or IDs
    const seoElements = document.querySelectorAll('[class*="seo-repair"], [id*="seo-repair"], [class*="seorepair"], [id*="seorepair"]');
    if (seoElements.length > 0) {
      detectionMethods.push('DOM Elements');
    }
    
    // Check for meta tags or data attributes
    const metaTags = document.querySelectorAll('meta[name*="seo"], meta[property*="seo"], [data-seo-repair], [data-seorepair]');
    if (metaTags.length > 0) {
      detectionMethods.push('Meta Tags');
    }
    
    // Check for specific function names in window object
    const windowKeys = Object.keys(window);
    const seoFunctions = windowKeys.filter(key => 
      key.toLowerCase().includes('seorepair') || 
      key.toLowerCase().includes('seo-repair')
    );
    
    if (seoFunctions.length > 0) {
      detectionMethods.push('Window Functions');
    }
    
    // Check for localStorage or sessionStorage keys
    try {
      const storageKeys = [...Object.keys(localStorage), ...Object.keys(sessionStorage)];
      const seoStorageKeys = storageKeys.filter(key => 
        key.toLowerCase().includes('seorepair') || 
        key.toLowerCase().includes('seo-repair')
      );
      
      if (seoStorageKeys.length > 0) {
        detectionMethods.push('Storage Keys');
      }
    } catch (e) {
      // Storage access might be blocked
    }
    
    return detectionMethods.length > 0;
  }
  
  // Wait for page to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      updateBadge();
    });
  } else {
    updateBadge();
  }
  
  // Also check after a delay to catch dynamically loaded content
  setTimeout(updateBadge, 2000);
  
  function updateBadge() {
    const detected = detectSEORepairKit();
    
    // Send message to background script to update badge
    chrome.runtime.sendMessage({
      type: 'plugin-detected',
      detected: detected,
      url: window.location.href
    }).catch(() => {
      // Ignore errors if background script is not available
    });
  }
})();
