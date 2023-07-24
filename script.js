// Left and Right Arrow Code
const leftMenu = document.querySelector(".leftMenuContainer");
const rightMenu = document.querySelector(".rightMenuContainer");

const leftArrowBtn = document.querySelector("#leftBtn");
const rightArrowBtn = document.querySelector("#rightBtn");

leftArrowBtn.addEventListener("click", function () {
  leftMenu.classList.toggle("active");
    document.addEventListener("click", function (e) {
      if (
        !e.composedPath().includes(leftArrowBtn) &&
        !e.composedPath().includes(leftMenu)
      ) {
        leftMenu.classList.remove("active");
      }
    });
  });

  rightArrowBtn.addEventListener("click", function () {
    rightMenu.classList.toggle("active");
    document.addEventListener("click", function (e) {
      if (
        !e.composedPath().includes(rightArrowBtn) &&
        !e.composedPath().includes(rightMenu)
      ) {
        rightMenu.classList.remove("active");
      }
    });
  });


  

