// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    window.onscroll = function () {
        const top = window.scrollY;
        if (top >= 100) {
            header.classList.add("navbarDark");
        } else {
            header.classList.remove("navbarDark");
        }
    };
}

// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-item");
    const menuToggle = document.getElementById("navbarSupportedContent");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            new bootstrap.Collapse(menuToggle).toggle();
        });
    });
}

// Function to dynamically create HTML elements from the JSON file
function createSkillsFromJSON() {
    const container = document.querySelector("#skills .container");
    let row = document.createElement("div");
    row.classList.add("row");

    // Load the JSON file
    fetch("data/skills.json")
        .then((response) => response.json())
        .then((data) => {
            // Iterate through the JSON data and create HTML elements
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");
                card.innerHTML = `
                    <div class="card skillsText">
                        <div class="card-body">
                            <img src="./images/${item.image}" alt="${item.alt}"/>
                            <h3 class="card-title mt-3">${item.title}</h3>
                            <p class="card-text mt-3">${item.text}</p>
                        </div>
                    </div>
                `;

                // Append the card to the current row
                row.appendChild(card);

                // If the index is a multiple of 3 or it's the last element, create a new row
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        });
}
// Function to dynamically create HTML elements from the JSON file
function createPortfolioFromJSON() {
    const carouselInner = document.getElementById("portfolio-carousel-inner");
    if (!carouselInner) return;

    // Load the JSON file
    fetch("data/portfolio.json")
        .then(response => response.json())
        .then(data => {
            data.forEach((item, index) => {
                const slide = document.createElement("div");
                slide.classList.add("carousel-item");
                if (index === 0) slide.classList.add("active");

                slide.innerHTML = `
                     <div class="portfolio-slide image-hover">
    
    <img 
      src="images/${item.image}" 
      alt="${item.alt}" 
      class="portfolio-image"
    />

    <div class="portfolio-overlay">
      <h3 class="portfolio-title">${item.title}</h3>
      <p class="portfolio-tech">Technos : ${item.tech || "Tests, QA, Web"}</p>
      <p class="portfolio-desc">${item.text}</p>

      <a href="${item.link}" class="btn-custom" target="_blank" rel="noopener">
        Voir le projet
      </a>
    </div>

  </div>
`;

                carouselInner.appendChild(slide);
            });
        });
}



// Call the functions to execute the code
handleNavbarScroll();
handleNavbarCollapse();
createSkillsFromJSON();
createPortfolioFromJSON();
