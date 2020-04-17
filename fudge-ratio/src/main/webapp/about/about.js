function openTab(tabName) {
  let i, x;
  x = document.getElementsByClassName("bioContainer");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
}