import "./scss/styles.scss";
import { routes } from "./js/routes";
import { PageList } from "./js/PageList";

const form = document.querySelector('form');
const searchBar = document.querySelector('input[type="search"]');

form.addEventListener('submit', function (event) {
	event.preventDefault();
	if (searchBar.value.length > 0) {
		PageList(searchBar.value);
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