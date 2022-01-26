import "./scss/styles.scss";
import { routes } from "./js/routes.js";

let pageArgument;

const searchBar = document.querySelector('input[type="search"]');

searchBar.addEventListener('search', function (event) {
	event.preventDefault();
	if (searchBar.value.length > 0) {
		var queryParams = "/#search/"
		let newUrl = queryParams.concat(searchBar.value);
		window.location.href = newUrl
	};
});

const callRoute = () => {
  const { hash } = window.location;
  const pathParts = hash.substring(1).split('/');

  const pageName = pathParts[0];
  const pageArgument = pathParts[1] || '';
  const pageFunction = routes[pageName];

  if (pageFunction !== undefined) {
    pageFunction(pageArgument);
  }
};

window.addEventListener('hashchange', () => callRoute());
window.addEventListener('DOMContentLoaded', () => callRoute());