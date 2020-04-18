let currentSlide = 0;

const openTab = tabName => {
  Array.from(document.getElementsByClassName("bioContainer"))
    .forEach(bio => bio.style.display = bio.id === tabName? "block": "none");
}
const closeTab = () => {
  Array.from(document.getElementsByClassName("bioContainer"))
    .forEach(bio => bio.style.display = "none");
}

const slideDivs = direction => {
    let newSlide = currentSlide + direction;
    currentSlide =  newSlide > 3? 0
                 :  newSlide < 0? 3
                 :  newSlide; 
    let slides = Array.from(document.getElementsByClassName("slide"));
    slides.forEach((slide, index) => {
        let children = Array.from(slide.children);
        children.forEach((child) => {
            slide.style.display = currentSlide === index? "block": "none"
            child.style.display = currentSlide === index? "block": "none"
        })
    });
}

const expandNav = () => { 
    let links = document.getElementById("links");
    links.style.display = links.style.display === "block"? "none": "block";
}