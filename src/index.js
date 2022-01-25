import "./scss/styles.scss";
import { routes } from "./js/routes.js";

let pageArgument;

const setRoute = () => {
  const path = window.location.hash.substring(1).split('/');
  pageArgument = path[1] || '';

  const pageContent = document.getElementById('pageContent');
  routes[path[0]](pageArgument);
  return true;
};

window.addEventListener('hashchange', () => setRoute());
window.addEventListener('DOMContentLoaded', () => setRoute());