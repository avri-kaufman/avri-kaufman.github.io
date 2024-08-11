document.addEventListener("DOMContentLoaded", (event) => {
  const menuBtn = document.querySelector(".menu-btn");
  const menuContainer = document.querySelector(".menu-container");
  const menuLinks = document.querySelectorAll(".menu-links a");

  menuBtn.addEventListener("click", function () {
    if (
      menuContainer.style.display === "none" ||
      !menuContainer.style.display
    ) {
      menuContainer.style.display = "block";
    } else {
      menuContainer.style.display = "none";
    }
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      menuContainer.style.display = "none";
    });
  });
});
