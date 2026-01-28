// Get current tab and check for SEO Repair Kit plugin
document.addEventListener('DOMContentLoaded', async () => {
  await checkPlugin();
  
  document.getElementById('refreshBtn').addEventListener('click', async () => {
    await checkPlugin();
  });
});

async function checkPlugin() {
  const statusIcon = document.getElementById('statusIcon');
  const statusText = document.getElementById('statusText');
  const statusMessage = document.getElementById('statusMessage');
  const details = document.getElementById('details');
  const pluginStatus = document.getElementById('pluginStatus');
  const detectionMethod = document.getElementById('detectionMethod');
  const pageUrl = document.getElementById('pageUrl');
  
  // Show checking state
  statusIcon.className = 'status-icon checking';
  statusIcon.textContent = '⟳';
  statusText.textContent = 'Checking...';
  statusMessage.textContent = 'Scanning the current page...';
  details.style.display = 'none';
  
  try {
    // Get the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab) {
      throw new Error('No active tab found');
    }
    
    pageUrl.textContent = tab.url || 'Unknown';
    
    // Inject content script to check for the plugin
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: detectSEORepairKit
    });
    
    const detection = results[0]?.result || { detected: false, method: 'None' };
    
    // Update UI based on detection result
    if (detection.detected) {
      statusIcon.className = 'status-icon detected';
      statusIcon.textContent = '✓';
      statusText.textContent = 'Plugin Detected!';
      statusMessage.textContent = 'SEO Repair Kit plugin is installed on this website.';
      pluginStatus.textContent = 'Installed';
      pluginStatus.style.color = '#10b981';
    } else {
      statusIcon.className = 'status-icon not-detected';
      statusIcon.textContent = '✗';
      statusText.textContent = 'Plugin Not Found';
      statusMessage.textContent = 'SEO Repair Kit plugin is not detected on this website.';
      pluginStatus.textContent = 'Not Installed';
      pluginStatus.style.color = '#ef4444';
    }
    
    detectionMethod.textContent = detection.method || 'Not detected';
    details.style.display = 'block';
    
  } catch (error) {
    console.error('Error checking plugin:', error);
    statusIcon.className = 'status-icon not-detected';
    statusIcon.textContent = '⚠';
    statusText.textContent = 'Error';
    statusMessage.textContent = 'Unable to check the page. Please try again.';
    details.style.display = 'block';
    pluginStatus.textContent = 'Error';
    detectionMethod.textContent = 'Failed to scan';
  }
}

// Function to detect SEO Repair Kit plugin
function detectSEORepairKit() {
  const detectionMethods = [];
  
  // Method 1: Check for SEO Repair Kit specific JavaScript objects
  if (window.SEORepairKit || window.seoRepairKit || window.SEORepair) {
    detectionMethods.push('JavaScript Object');
  }
  
  // Method 2: Check for SEO Repair Kit specific global variables
  if (window.__SEORepairKit__ || window.__seoRepairKit__) {
    detectionMethods.push('Global Variable');
  }
  
  // Method 3: Check for scripts with SEO Repair Kit in the name
  const scripts = Array.from(document.querySelectorAll('script[src]'));
  const seoScripts = scripts.filter(script => {
    const src = script.src.toLowerCase();
    return src.includes('seo') && (src.includes('repair') || src.includes('kit'));
  });
  
  if (seoScripts.length > 0) {
    detectionMethods.push('Script Tag');
  }
  
  // Method 4: Check for specific CSS classes or IDs
  const seoElements = document.querySelectorAll('[class*="seo-repair"], [id*="seo-repair"], [class*="seorepair"], [id*="seorepair"]');
  if (seoElements.length > 0) {
    detectionMethods.push('DOM Elements');
  }
  
  // Method 5: Check for meta tags or data attributes
  const metaTags = document.querySelectorAll('meta[name*="seo"], meta[property*="seo"], [data-seo-repair], [data-seorepair]');
  if (metaTags.length > 0) {
    detectionMethods.push('Meta Tags');
  }
  
  // Method 6: Check for specific function names in window object
  const windowKeys = Object.keys(window);
  const seoFunctions = windowKeys.filter(key => 
    key.toLowerCase().includes('seorepair') || 
    key.toLowerCase().includes('seo-repair')
  );
  
  if (seoFunctions.length > 0) {
    detectionMethods.push('Window Functions');
  }
  
  // Method 7: Check for localStorage or sessionStorage keys
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
  
  const detected = detectionMethods.length > 0;
  const method = detected ? detectionMethods.join(', ') : 'None';
  
  return {
    detected,
    method,
    details: {
      scriptsFound: seoScripts.length,
      elementsFound: seoElements.length,
      metaTagsFound: metaTags.length,
      functionsFound: seoFunctions.length
    }
  };
}
