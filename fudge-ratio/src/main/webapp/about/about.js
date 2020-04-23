let currentSlide = 0;

const openTab = tabName => {
  const elements = Array.from(document.getElementsByClassName("bioContainer"));
  elements.forEach(bio => (bio.style.height = bio.id === tabName ? "50vh" : "0"));
  elements.forEach(bio => (bio.style.padding = bio.id === tabName ? "2vh 3vw" : "0"));
};

const closeTab = () => openTab("IMPOSSIBLE_NAME");

const slideDivs = direction => {
  let newSlide = currentSlide + direction;
  currentSlide = newSlide > 3 ? 0 : newSlide < 0 ? 3 : newSlide;
  let slides = Array.from(document.getElementsByClassName("slide"));
  slides.forEach((slide, index) => {
    let children = Array.from(slide.children);
    children.forEach(child => {
      slide.style.display = currentSlide === index ? "block" : "none";
      child.style.display = currentSlide === index ? "block" : "none";
    });
  });
};

const expandNav = () => {
  let links = document.getElementById("links");
  links.style.display = links.style.display === "block" ? "none" : "block";
};

closeTab();
