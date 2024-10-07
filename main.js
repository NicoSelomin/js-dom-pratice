//Fonction pour créer nos éléments html avec des paramètres
function createAndStyleElement(tag, className, content = "") {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content) element.innerHTML = content;

  return element;
}

//Fonction pour le compteur
function setupCounter(element) {
  let counter = 0;
  const setCounter = (count) => {
    counter = count;
    element.innerHTML = `<button>${count}</button>`;
  };
  element.addEventListener("click", () => setCounter(counter + 1));
  setCounter(0);
}

//function pricipale pour la créaton de la page
function createPage() {
  const app = document.getElementById("app");
  const nav = document.createElement("nav");
  const homeLink = createAndStyleElement("a", "", "Accueil");
  const aboutLink = createAndStyleElement("a", "", "A propos");
  const fetchDataLink = createAndStyleElement("a", "", "Fetch");
  const networksLink = createAndStyleElement("a", "", "Reseaux");

  nav.appendChild(homeLink);
  nav.appendChild(aboutLink);
  nav.appendChild(fetchDataLink);
  nav.appendChild(networksLink);

  const subMenu = createAndStyleElement(
    "div",
    "sub-menu",
    `
    <p>
      <a href="https://twitter.com" target="_blank">Twitter</a> |
      <a href="https://facebook.com" target="_blank">Facebook</a> |
      <a href="https://linkedin.com" target="_blank">LinkedIn</a>
    </p>
    `
  );

  nav.appendChild(subMenu);

  const mainContent = createAndStyleElement("div", "main-content");
  const homeSection = createAndStyleElement(
    "div",
    "section active",
    `
      <h2> Bienvenue sur Javascript DOM </h2>
      <p> Cliquez sur le bouton pour augmenter le compteur  </p>
      <div id="counter" class="counter"></div>
    `
  );
  const aboutSection = createAndStyleElement(
    "div",
    "section",
    `Cette page a été créé avec JavaScript.`
  );
  const dataSection = createAndStyleElement("div", "section data-container");

  mainContent.appendChild(homeSection);
  mainContent.appendChild(aboutSection);
  mainContent.appendChild(dataSection);

  const footer = createAndStyleElement(
    "footer",
    "",
    `
    <p>&copy; 2024 JavaScript DOM. Tous droits réservés.</p>
    <p>
      <a href="https://twitter.com" target="_blank">Twitter</a> |
      <a href="https://facebook.com" target="_blank">Facebook</a> |
      <a href="https://linkedin.com" target="_blank">LinkedIn</a>
    </p>
  `
  );

  app.appendChild(nav);
  app.appendChild(mainContent);
  app.appendChild(footer);

  homeLink.addEventListener("click", () => {
    showSection(homeSection);
    closeSubMenu();
  });

  aboutLink.addEventListener("click", () => {
    showSection(aboutSection);
    closeSubMenu();
  });

  fetchDataLink.addEventListener("click", () => {
    showSection(dataSection);
    fetchData();
    closeSubMenu();
  });

  networksLink.addEventListener("click", (event) => {
    event.stopPropagation();
    subMenu.classList.toggle("active");
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target)) {
      subMenu.classList.remove("active");
    }
  });

  function closeSubMenu() {
    const subMenu = document.querySelector(".sub-menu");
    if (subMenu.classList.contains("active")) {
      subMenu.classList.remove("active");
    }
  }

  const counterElement = document.getElementById("counter");
  setupCounter(counterElement);
}
//function pour afficher les sections
function showSection(section) {
  document
    .querySelectorAll(".section")
    .forEach((sec) => sec.classList.remove("active"));
  section.classList.add("active");
}
//Récuperation des données sur un serveur distant
async function fetchData() {
  const dataContainer = document.querySelector(".data-container");
  dataContainer.innerHTML = "";
  const loadingElement = createAndStyleElement("div", "loading", "Loading...");
  dataContainer.appendChild(loadingElement);

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    setTimeout(() => {
      dataContainer.removeChild(loadingElement);
      data.slice(0, 5).forEach((item) => {
        const dataTitle = createAndStyleElement("h2", "", item.title);
        const dataBody = createAndStyleElement("p", "", item.body);

        dataContainer.appendChild(dataTitle);
        dataContainer.appendChild(dataBody);
      });
    }, 1000);
  } catch (error) {
    dataContainer.removeChild(loadingElement);
    dataContainer.textContent = "Failed to fetch data";
  }
}

createPage();
