// Utility to execute inline scripts found in injected HTML
export function executeScripts(container) {
  if (!container) return;
  // Find script tags
  const scripts = Array.from(container.querySelectorAll('script'));

  scripts.forEach((oldScript) => {
    const newScript = document.createElement('script');
    // Copy attributes
    for (let i = 0; i < oldScript.attributes.length; i++) {
      const attr = oldScript.attributes[i];
      newScript.setAttribute(attr.name, attr.value);
    }
    newScript.text = oldScript.textContent;
    // Replace old script with new one so it executes
    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
}
// Small helper to insert HTML into a container and execute any embedded scripts
export function insertHtmlAndRunScripts(container, html) {
  if (!container) return;
  container.innerHTML = html;

  // Find any <script> tags and re-insert them so they execute
  const scripts = Array.from(container.querySelectorAll('script'));
  scripts.forEach((oldScript) => {
    const newScript = document.createElement('script');
    // copy attributes
    for (let i = 0; i < oldScript.attributes.length; i++) {
      const attr = oldScript.attributes[i];
      newScript.setAttribute(attr.name, attr.value);
    }

    newScript.text = oldScript.innerHTML;
    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
}
