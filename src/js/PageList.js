import { API } from "./api";

const PageList = (argument = "") => {
  const preparePage = () => {
    const cleanedArgument = argument.replace(/\s+/g, "-");

    const displayResults = (articles) => {
      const resultsContentFirst = articles.slice(0, 9).map(
        (article) =>
          `<article class="cardGame col-4">
        <a href="#game/${article.id}">
          <img class="cardGameImg" src="${article.background_image}"></a>
            <h3 class="mt-2">${article.name}</h3>
      </article>`
      );
      const resultsContainerFirst = document.querySelector(".page-list .articlesFirst");
      resultsContainerFirst.innerHTML = resultsContentFirst.join("\n");

      const resultsContent = articles.slice(9, 18).map(
        (article) =>
          `<article class="cardGame col-4">
        <a href="#game/${article.id}">
          <img class="cardGameImg" src="${article.background_image}"></a>
            <h3 class="mt-2">${article.name}</h3>
      </article>`
      );
      const resultsContainer = document.querySelector(".page-list .articlesSecond");
      resultsContainer.innerHTML = resultsContent.join("\n");
    };

    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results);
        });
    };

    fetchList(`https://api.rawg.io/api/games?key=${API}`, cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <select class="platformSelect mb-4 mt-2">
          <option selected>Platform : any</option>
          <option>PlayStation</option>
          <option>XBox</option>
          <option>Switch</option>
          <option>PC</option>
          <option>Linux</option>
          <option>Mobile</option>
        </select>
        <div class="articlesFirst row">...loading</div>
        <div class="showMore">
        <div class="nextBtn" id="nextBtn">Show more</div>
        </div>
        <div class="articlesSecond row hidden" id="articlesSecond"></div>
      </section>
    `;

    const nextBtn = document.getElementById('nextBtn')

    nextBtn.addEventListener('click', function() {
      document.getElementById('articlesSecond').classList.remove("hidden");
      document.getElementsByClassName('showMore')[0].classList.remove("showMore");
      nextBtn.style.display = "none";
    })

    preparePage();
  };

  render();
};

export { PageList };
