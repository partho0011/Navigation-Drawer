
let container = document.getElementById("container");
let nav = document.getElementById("nav-container");
let cover = document.getElementById("cover");
let menu = document.getElementById("menu");
let lists = document.getElementById("items").children;
let toast = document.getElementById("toast");


let startX = 0;
let endX = 0;
let moveX = 0;
let lastOpacity = 0;
let interval = 0;


[...lists].map((item) => {
    item.addEventListener("click", (ev) => {
        clickHighlight(ev);
    });
})

menu.addEventListener("click", () => {
  openDrawer();
})

cover.addEventListener("click", (ev) => {
  nav.style.transition = ".5s all ease";
  nav.style.left = "-280px";
  cover.style.opacity = "0";
  interval = setTimeout(() => {
    cover.style.display = "none";
  }, 500)
})

container.addEventListener("touchstart", (ev) => {
  startX = Math.floor(ev.touches[0].clientX);
  
  if (startX <= 10) {
    clearTimeout(interval);
    cover.style.display = "block";
  }
})

container.addEventListener("touchmove", (ev) => {
  moveX = Math.floor(ev.touches[0].clientX);
  if (startX <= 10) {
    if (moveX <= 280) {
      if (!isOpened()) {
        nav.style.transition = "none";
        nav.style.left = `${moveX - 280}px`;
        lastOpacity = Math.floor(moveX / 40);
        cover.style.opacity = `.${lastOpacity}`;
      }
    }
  }
})

container.addEventListener("touchend", (ev) => {
  endX = Math.floor(ev.changedTouches[0].clientX);
  
  if (isOpened()) {
    if (ev.target.id === "cover") {
      closeDrawer();
      clearTimeout(interval);
      return;
    }
  }
  
  if (ev.target.classList.contains("li-cover")) {
    clickHighlight(ev);
    return;
  }
  
  if (getPosition() + 280 < 70)
  {
    nav.style.transition = ".5s all ease";
    nav.style.left = "-280px";
    if (startX <= 10) {
      cover.style.opacity = "0";
    }
  } else {
    nav.style.transition = ".5s all ease";
    nav.style.left = "0px";
    if (startX <= 10) {
      if (endX <= 280) {
        cover.style.opacity = `.62`;
      } else {
        cover.style.opacity = `.${lastOpacity}`;
      }
    }
  }
})

function getPosition() {
  return parseInt(String(getComputedStyle(nav).left).replace("px", ""));
}

function isOpened() {
  if (getPosition() >= 0) {
    return true;
  }else{
    return false;
  }
}

function openDrawer() {
  nav.style.transition = ".5s all ease";
  nav.style.left = "0px";
  cover.style.display = "block";
  setTimeout(() => {
    cover.style.transition = ".5s";
    cover.style.opacity = "0.62";
  }, 50)
}

function closeDrawer(){
  cover.click();
}

function showToast(text) 
{
  toast.style.display = "block";
  setTimeout(() => {
    toast.classList.add("show");
    toast.textContent = text;
    clearTimeout(this);
  }, 100);
  
  setTimeout(() => {
    toast.classList.remove("show");
    clearTimeout(this);
  }, 2000)
}

function clickHighlight(ev)
{
  closeDrawer();
  showToast("Click: " + ev.target.nextElementSibling.children[1].textContent);
  ev.target.style.backgroundColor = "rgba(20, 20, 20, 0.1)";

      [...lists].filter(item => item.children[0].id !== ev.target.id).map((item) => {
    item.children[0].style.backgroundColor = "transparent";
  })
}