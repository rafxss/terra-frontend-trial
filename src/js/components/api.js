const urlParams = new URLSearchParams(window.location.search);
const urlApi = urlParams.get('api') === 'v2' ? "https://www.api.rafaferrera.com/terra.php" : "https://tf-frontend.netlify.app/trial";

const storageKey = urlParams.get('api') === 'v2' ? 'apiData2' : 'apiData';

let postCount = null;

const loaderImage = document.querySelector('#loader img');
setTimeout(() => {
  loaderImage.style.opacity = 1; 
}, 100);

const loader = document.getElementById('loader');

// Verifica los parámetros de la URL para establecer postCount
if (urlParams.get('api') === 'v2' && urlParams.get('post_count')) {
  postCount = parseInt(urlParams.get('post_count'), 10);

  if (isNaN(postCount) || postCount <= 1) {
    postCount = 5;
  } else if (postCount > 10) {
    postCount = 10;
  }
}

let data = ""

if (urlParams.get('refresh') === 'true') {
  data = null;
} else {
  data = localStorage.getItem(storageKey) ? JSON.parse(localStorage.getItem(storageKey)) : null;
}

if (data) {
  populatePage(data);
  setTimeout(() => {
    fadeOut(loader, 300);
  }, 1000);
} else {
  fetch(urlApi, {
    method: "GET",
    headers: {
      ...(postCount && { "X-Post-Count": postCount })
    }
  })
    .then(response => {
      if (!response.ok) {
        showError();
        setTimeout(() => {
          fadeOut(loader, 300);
        }, 1000);
        throw new Error('Error API response');
      }
      return response.json();
    })
    .then(apiData => {
      if (apiData) {
        localStorage.setItem(storageKey, JSON.stringify(apiData));
        populatePage(apiData);
      }
      setTimeout(() => {
        fadeOut(loader, 300);
      }, 1000);
    })
    .catch(error => {
     showError();
      console.error('Error:', error);
      setTimeout(() => {
        fadeOut(loader, 300);
      }, 1000);
    });
}

function populatePage(data) {
  // Navbar
  if (data.navbar) {

    //Check if the navbar logo exists
    if (data.navbar.logo.length > 0) {
      const navbarContainer = document.getElementById("navbar-menu");
      document.getElementById("navbar-logo").src = data.navbar.logo;

      const menuData = Object.values(data.navbar.menu);

      if (menuData.length > 0) {
        //Only loads the 5 first elements (In case there are more than 5 elements)
        menuData.slice(0, 5).forEach(link => {
          const menuLinks = document.createElement("a");
          menuLinks.className = "navbar__menu-link";
          menuLinks.textContent = link;
          menuLinks.href = "#";
      
          navbarContainer.appendChild(menuLinks);
        });
      } else {
        //If no elements are found, the mobile menu icon is removed
        document.getElementById("menu-toggle").remove();
      }
      
    //If no navbar logo exists, show error page
    } else {
      showError("Error loading the logo url")
    }
  }

  // Hero
  if (data.hero) {
    const { title, button_label, subtitle } = data.hero;

    const firstVisit = !localStorage.getItem("visited");
    localStorage.setItem("visited", "true");

    const titleText = firstVisit ? title.first_time_accessing : title.second_time_accessing;
    const buttonText = firstVisit ? button_label.first_time_accessing : button_label.second_time_accessing;

    if (titleText && buttonText && subtitle) {
      document.getElementById("hero-section").style.backgroundImage = `url(${data.hero.bg_image})`;
      document.getElementById("hero-title").textContent = titleText;
      document.getElementById("hero-subtitle").textContent = subtitle;
      document.getElementById("hero-button").textContent = buttonText;
      document.getElementById("hero-button").href = data.hero.button_link;

      if (!firstVisit) {
        document.getElementById("hero-button").classList.replace("button--primary", "button--secondary");
      }

      Object.values(data.hero.shapes).forEach(shape => {
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

  // Body
  if(data.body) {
    const posts = Object.values(data.body.posts);
    const postsContainer = document.getElementById("body-posts");

    document.getElementById("body-title").textContent = data.body.title;
    document.getElementById("body-button").textContent = data.body.button_label;
    document.getElementById("body-button").href = data.body.button_link;
  
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
      showError("Not enough posts, error in loading body post images.")
    }
  }
}

function fadeOut(element, duration) {
  element.style.opacity = 1;
  let start = performance.now();

  function animate() {
    let elapsed = performance.now() - start;
    let progress = Math.min(elapsed / duration, 1);
    
    element.style.opacity = 1 - progress;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      element.style.display = 'none';
    }
  }

  requestAnimationFrame(animate);
}

function showError(error = "") {
  document.getElementById('error-message').style.display = "flex";
  document.body.style.overflow = "hidden";
  console.log(error)
}