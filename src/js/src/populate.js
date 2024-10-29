export function populatePage(data) {
  populateNavbar(data.navbar);
  populateHero(data.hero);
  populateBody(data.body);
}

function populateNavbar(navbar) {
  if (navbar && navbar.logo.length > 0) {
    const navbarContainer = document.getElementById("navbar-menu");
    document.getElementById("navbar-logo").src = navbar.logo;
    const menuData = Object.values(navbar.menu);
    if (menuData.length > 0) {
      menuData.slice(0, 5).forEach(link => {
        const menuLinks = document.createElement("a");
        menuLinks.className = "navbar__menu-link";
        menuLinks.textContent = link;
        menuLinks.href = "#";
        navbarContainer.appendChild(menuLinks);
      });
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
    const firstVisit = !localStorage.getItem("visited");
    localStorage.setItem("visited", "true");
    const titleText = firstVisit ? title.first_time_accessing : title.second_time_accessing;
    const buttonText = firstVisit ? button_label.first_time_accessing : button_label.second_time_accessing;
    if (titleText && buttonText && subtitle) {
      document.getElementById("hero-section").style.backgroundImage = `url(${hero.bg_image})`;
      document.getElementById("hero-title").textContent = titleText;
      document.getElementById("hero-subtitle").textContent = subtitle;
      document.getElementById("hero-button").textContent = buttonText;
      document.getElementById("hero-button").href = hero.button_link;
      if (!firstVisit) {
        document.getElementById("hero-button").classList.replace("button--primary", "button--secondary");
      }
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
          document.getElementById("hero-section").appendChild(img);
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
    const postsContainer = document.getElementById("body-posts");
    document.getElementById("body-title").textContent = body.title;
    document.getElementById("body-button").textContent = body.button_label;
    document.getElementById("body-button").href = body.button_link;
    
    posts.forEach(post => {
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
      if (post.image.length) {
        postsContainer.appendChild(postDiv);
      }
    });

    const postsCount = postsContainer.children.length;

    if (postsCount % 4 === 1) {
      postsContainer.classList.add("body__posts--five");
    }

    if (postsCount % 3 === 1) {
      postsContainer.classList.add("body__posts--three");
    }
    
    if (postsCount < 2) {
      showError("Not enough posts, error in loading body post images.");
    }
  }
}
