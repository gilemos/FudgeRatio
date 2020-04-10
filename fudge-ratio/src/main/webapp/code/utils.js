const get = id => document.getElementById(id);

const createFromText = text => document.createRange().createContextualFragment(text);
const parent = document.getElementById("content");

export { get, parent, createFromText };
