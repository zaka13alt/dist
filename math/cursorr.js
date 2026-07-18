// cursorlock.js // Windows 11 style custom cursor with standard tracking
(() => {
  // Inject global CSS rule to hide the native cursor everywhere
  const style = document.createElement("style");
  style.innerHTML = `
    html, body, *, iframe {
      cursor: none !important;
    }
  `;
  document.head.appendChild(style);

  // Create custom Windows 11 cursor
  const cursor = document.createElement("div");
  cursor.style.position = "fixed";
  cursor.style.width = "24px";
  cursor.style.height = "24px";
  cursor.style.pointerEvents = "none"; // Ensures clicks pass directly through it
  cursor.style.zIndex = "999999";
  cursor.style.transform = "translate(-2px, -2px)";

  // Windows 11-inspired cursor design
  cursor.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19">
  <!-- Soft drop shadow for Windows 11 aesthetic -->
  <filter id="shadow" x="-20%" y="-20%" width="150%" height="150%">
    <feDropShadow dx="1" dy="2" stdDeviation="1" flood-color="#000000" flood-opacity="0.3"/>
  </filter>
  
  <!-- Main white outline -->
  <path d="M1,1 L1,16 L5,13 L8.5,18 L11,16.5 L7.5,11.5 L13,11.5 Z" 
        fill="#FFFFFF" />
        
  <!-- Purple inner body -->
  <path d="M2,2 L2,14 L5.5,11.5 L8.5,16 L9.5,15.5 L6.5,11 L12,11 Z" 
        fill="#9b5de5" filter="url(#shadow)" />
</svg>

  `;
  document.body.appendChild(cursor);

  // Seamlessly follow the real mouse coordinates
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  // Hide the custom cursor if the real mouse leaves the browser window
  document.addEventListener("mouseleave", () => {
    cursor.style.display = "none";
  });

  document.addEventListener("mouseenter", () => {
    cursor.style.display = "block";
  });
})();
