// Small helper to insert HTML into a container and execute any <script> tags found.
export function insertHtmlAndRunScripts(container: HTMLElement | null, html: string) {
  if (!container) return;

  // Set the HTML
  container.innerHTML = html;

  // Find scripts and replace them with freshly created ones so they execute
  const scripts = Array.from(container.querySelectorAll('script'));

  for (const oldScript of scripts) {
    const newScript = document.createElement('script');

    // Copy attributes
    for (let i = 0; i < oldScript.attributes.length; i++) {
      const attr = oldScript.attributes[i];
      newScript.setAttribute(attr.name, attr.value);
    }

    // Inline script content
    if (oldScript.src) {
      newScript.src = oldScript.src;
    } else {
      newScript.text = oldScript.textContent || '';
    }

    // Replace the old script
    oldScript.parentNode?.replaceChild(newScript, oldScript);
  }
}
