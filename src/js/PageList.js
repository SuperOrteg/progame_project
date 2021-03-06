import { API } from "./api";
import dayjs from "dayjs";
import { platformsIcons } from "./others/icons";

const PageList = (argument = "") => {
  const preparePage = () => {
    const cleanedArgument = argument.replace(/\s+/g, "-");

    const displayResults = (articles) => {
      const resultsContentFirst = articles.slice(0, 9).map(
        (article) =>
          `<article class="cardGame col-4 mb-3">
        <a href="#game/${article.id}">
        <div class="img__wrap">
          <img class="cardGameImg" src="${article.background_image}">
          <div class="img__description">
          <p>${dayjs(article.released).format("MMM DD, YYYY")}</p>
          <p>${article.rating}/5 - ${article.ratings_count} votes</p>
          <p class="tag">${article.tags
            .slice(0, 9)
            .map((tag) => tag.name)
            .join(", ")}</p>
          </div></a>
        </div>
            <h3 class="mt-3 mb-2">${article.name}</h3>
            <div>
            ${platformsIcons(article.platforms)}
            </div>
      </article>`
      );
      const resultsContainerFirst = document.querySelector(
        ".page-list .articlesFirst"
      );
      resultsContainerFirst.innerHTML = resultsContentFirst.join("\n");

      const resultsContent = articles.slice(9, 18).map(
        (article) =>
          `<article class="cardGame col-4">
        <a href="#game/${article.id}">
        <div class="img__wrap">
          <img class="cardGameImg" src="${article.background_image}">
          <div class="img__description">
          <p>${dayjs(article.released).format("MMM DD, YYYY")}</p>
          <p>${article.rating}/5 - ${article.ratings_count} votes</p>
          <p class="tag">${article.tags
            .slice(0, 9)
            .map((tag) => tag.name)
            .join(", ")}</p>
          </div></a>
        </div>
            <h3 class="mt-2">${article.name}</h3>
            <div>
            ${platformsIcons(article.platforms)}
            </div>
      </article>`
      );
      const resultsContainer = document.querySelector(
        ".page-list .articlesSecond"
      );
      resultsContainer.innerHTML = resultsContent.join("\n");
    };

    const returnStudios = (list) => {
      let studios = list.map((pub) => `${pub.name}`);
      return studios.join(", ");
    };

    const fetchStudios = (argument) => {
      fetch(`https://api.rawg.io/api/games/${argument}?key=${API}`)
        .then((response) => response.json())
        .then((responseData) => {
          returnStudios(responseData.publishers);
        });
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
      <section class="home container">
        <h1>Welcome,</h1>
        <p class="text-white mt-3">The Hyper Progame is the world???s premier event for computer and video games and related products. At The Hyper Progame, the video game industry???s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best, brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies, groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure to the entire video game industry, all under one roof. This text seems familiar.</p>
        <div class="articles"></div>
      </section>
      <section class="page-list container">
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

    const nextBtn = document.getElementById("nextBtn");

    nextBtn.addEventListener("click", function () {
      document.getElementById("articlesSecond").classList.remove("hidden");
      document
        .getElementsByClassName("showMore")[0]
        .classList.remove("showMore");
      nextBtn.style.display = "none";
    });

    preparePage();
  };

  render();
};

export { PageList };
