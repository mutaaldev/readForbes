console.log('Read Forbes content script loaded');

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'removePaywall') {
    const result = removePaywall();
    sendResponse({success: true, count: result});
  }
  return true;
});

function removePaywall() {
  const paywallTargets = [
    '.halfway-hardwall-insertion-point',
    '.halfway-hardwall-insertion-point [data-testid="halfway-hardwall-root"]',
    '[data-testid="halfway-hardwall-root"]',
    '.halfway-hardwall-insertion-point ._WfyE',
    '[data-testid="halfway-hardwall-paywall-header-container"]',
    '[data-testid="halfway-hardwall-paywall-header-title"]',
    '[data-testid="halfway-hardwall-paywall-header-subtitle"]',
    '[data-testid="halfway-hardwall-sign-in-button"]',
    '[data-testid="offer-cards-container"]',
    '[data-testid="offer-card-1"]',
    '[data-testid="offer-card-2"]',
    '[data-testid="offer-card-3"]',
    '[data-testid="subscribe-button-1"]',
    '[data-testid="subscribe-button-2"]',
    '[data-testid="subscribe-button-3"]',
    '[data-testid="halfway-hardwall-paywall-footer-container"]',
    '[data-testid="subscription-disclaimer-text"]',
    '[data-testid="benefits-section"]',
    '[data-testid="footer-link"]',
    '._WfyE',
    '.EJDat',
    '.LE6RP',
    '.AkKV2',
    '.GfDyV',
    '.FirRh',
    '.bFYgn',
    '.Mjnfq',
    '.HDKtm',
    '.sy8vM',
    '.bcUBL',
    '.DmfuO',
    '.PBkb4',
    '.NWgQX',
    '.OsDqe',
    '.Y7F25',
    '.UF64_',
    '.KThMH',
    '.uVC3j',
    '.vM8Op',
    '.MwsMd',
    '.FywmL',
    '.tbOyT',
    '.kWtSK',
    '.nO_hY',
    '.QV2eb',
    '.qSETm'
  ];

  let removed = 0;

  paywallTargets.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.remove();
      removed++;
    });
  });

  document.querySelectorAll('.halfway-hardwall-insertion-point').forEach(el => {
    el.remove();
    removed++;
  });

  const overlays = document.querySelectorAll('[style*="position: fixed"][style*="z-index"]');
  overlays.forEach(el => {
    const style = window.getComputedStyle(el);
    if (style.position === 'fixed' && parseInt(style.zIndex) > 1000) {
      el.remove();
      removed++;
    }
  });

  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.height = '';
  document.documentElement.style.overflow = '';

  const scrollStyles = document.querySelectorAll('style');
  scrollStyles.forEach(style => {
    if (style.textContent.includes('overflow: hidden') || 
        style.textContent.includes('touch-action: none')) {
      style.remove();
    }
  });

  const hiddenElements = document.querySelectorAll('[style*="display: none"], [style*="visibility: hidden"]');
  hiddenElements.forEach(el => {
    if (el.closest('.halfway-hardwall-insertion-point') || 
        el.closest('[data-testid="halfway-hardwall-root"]')) {
      el.style.display = '';
      el.style.visibility = '';
    }
  });

  console.log(`Read Forbes: Removed ${removed} paywall elements`);
  return removed;
}