// In your frame.js file, modify the loadContent function:

function loadContent(page) {
  const contentArea = document.getElementById("content-area");

  // Use fetch to get the content from other pages
  fetch(page)
    .then((response) => response.text())
    .then((html) => {
      // Create a temporary element to parse the HTML
      const temp = document.createElement("div");
      temp.innerHTML = html;

      // Extract just the main content from the fetched page
      const mainContent = temp.querySelector("main");

      if (mainContent) {
        // Update our content area with just the main content
        contentArea.innerHTML = mainContent.innerHTML;
      } else {
        // If main tag not found, try to find the content another way
        const section = temp.querySelector("section");
        if (section) {
          contentArea.innerHTML = section.outerHTML;
        } else {
          contentArea.innerHTML =
            "<p>Contenido no encontrado en la pagina.</p>";
        }
      }

      // Update URL without refreshing page
      history.pushState({ page: page }, "", page);

      // Run typing animation if needed
      setupTypingAnimation();

      // Important: Update the page title if needed
      const titleElement = temp.querySelector("title");
      if (titleElement) {
        document.title = titleElement.textContent;
      }
    })
    .catch((error) => {
      console.error("Error cargando pagina:", error);
      contentArea.innerHTML =
        "<p>Error cargando contenido. Por favor intentalo otra vez.</p>";
    });

  // Prevent the default link behavior
  return false;
}
