import { showError } from './error.js';

// Function to use in API to populate index
export function populatePage(data) {
  populateNavbar(data.navbar);
  populateHero(data.hero);
  populateBody(data.body);
}

function populateNavbar(navbar) {
  // If navbar has no data or the logo has no url, show ERROR
  if (navbar && navbar.logo.length > 0) {
    const headerElement = document.getElementById('navbar-section');
    headerElement.innerHTML = `
      <div class="wrapper">
        <div class="navbar__container">
          <a class="navbar__logo" href="#">
            <img id="navbar-logo" src="${navbar.logo}" alt="Logo">
          </a>
          <div class="navbar__menu" id="navbar-menu"></div>
          <a class="navbar__menu-toggle" id="menu-toggle">
            <span class="navbar__menu-toggle-bar navbar__menu-toggle-bar--top"></span>
            <span class="navbar__menu-toggle-bar navbar__menu-toggle-bar--middle"></span>
            <span class="navbar__menu-toggle-bar navbar__menu-toggle-bar--bottom"></span>
          </a>
        </div>
      </div>
    `;

    const menuData = Object.values(navbar.menu);
    // Populate the menu
    if (menuData.length > 0) {
      menuData.slice(0, 5).forEach(link => {
        const menuLinks = document.createElement("a");
        menuLinks.className = "navbar__menu-link";
        menuLinks.textContent = link;
        menuLinks.href = "#";
        document.getElementById("navbar-menu").appendChild(menuLinks);
      });
    // Remove the menu in case the API retrieves no links
    } else {
      document.getElementById("menu-toggle").remove();
    }
  } else {
    showError("Error loading the logo url");
  }
}

function populateHero(hero) {
  if (hero) {
    const { title, button_label, subtitle } = hero;

    // Check for first visit and assign it to localStorage
    const firstVisit = !localStorage.getItem("visited");
    localStorage.setItem("visited", "true");

    // Assign the first or second time accessing
    const titleText = firstVisit ? title.first_time_accessing : title.second_time_accessing;
    const buttonText = firstVisit ? button_label.first_time_accessing : button_label.second_time_accessing;

    const heroSection = document.getElementById("hero-section");

    // Check for title, button and subtitle, if there isn't, show error
    if (titleText && buttonText && subtitle) {
      heroSection.style.backgroundImage = `url(${hero.bg_image})`;
      heroSection.innerHTML = `
        <div class="wrapper">
          <div class="hero__container">
            <h1 class="hero__title" id="hero-title">${titleText}</h1>
            <p class="hero__subtitle" id="hero-subtitle">${subtitle}</p>
            <a class="button button--primary" id="hero-button" href="${hero.button_link}" target="_blank">${buttonText}</a>
          </div>
        </div>
      `;

      // Change button appaerance in case is not first visit
      if (!firstVisit) {
        document.getElementById("hero-button").classList.replace("button--primary", "button--secondary");
      }

      // Add shapes if exists
      Object.values(hero.shapes).forEach(shape => {
        if (shape.length > 0) {
          const img = document.createElement("img");
          img.src = shape;
          img.alt = "Shape";
          img.className = "hero__shapes";
          if (shape.includes("right")) {
            img.classList.add("hero__shapes--right");
          } else if (shape.includes("left")) {
            img.classList.add("hero__shapes--left");
          }
          heroSection.appendChild(img);
        }
      });
    } else {
      showError("Error loading hero info.");
    }
  }
}

function populateBody(body) {
  if (body) {
    const posts = Object.values(body.posts);
    const bodySection = document.getElementById("body-section");

    bodySection.innerHTML = `
      <div class="wrapper">
        <div class="body__container">
          <h2 class="body__title" id="body-title">${body.title}</h2>
          <div class="body__posts" id="body-posts"></div>
          <a class="button button--primary" id="body-button" href="${body.button_link}" target="_blank">${body.button_label}</a>
        </div>
      </div>
    `;

    const postsContainer = document.getElementById("body-posts");
    
    // Loop within the posts
    posts.forEach(post => {

      // Assign a class depending of the Type
      const classType = post.type.includes("Type A") ? "body__post-type--pink" : "body__post-type--green";
      const postDiv = document.createElement("div");
      postDiv.className = "body__post";
      postDiv.innerHTML = `
        <div class="body__post-image" style="background-image: url('${post.image}');">
          <div class="body__post-type ${classType}"><p>${post.type}</p></div>
        </div>
        <div class="body__post-content">
          <p class="body__post-date">${post.date}</p>
          <p class="body__post-title">${post.title}</p>
        </div>
      `;

      // Only add a post if the image is present
      if (post.image.length) {
        postsContainer.appendChild(postDiv);
      }
    });

    const postsCount = postsContainer.children.length;

    // Add a class to change layout depending of the number of posts, to better display all the elements
    if (postsCount % 4 === 1) {
      postsContainer.classList.add("body__posts--five");
    }

    if (postsCount % 3 === 1) {
      postsContainer.classList.add("body__posts--three");
    }

    // After the verfiication, if there are less than 2 post, show error
    if (postsCount < 2) {
      showError("Not enough posts, error in loading body post images.");
    }
  }
}
