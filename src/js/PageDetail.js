import { API } from "./api";
import dayjs from "dayjs";
import Play from "../images/play.svg";

const PageDetail = (argument) => {
  const preparePage = () => {
    const cleanedArgument = argument.replace(/\s+/g, "-");

    const returnPlatf = (list) => {
      let platforms = list.map((pub) => `${pub.platform.name}`);
      return platforms.join(", ");
    };

    const returnGenre = (list) => {
      let genres = list.map((pub) => `${pub.name}`);
      return genres.join(", ");
    };

    const returnLinks = (list) => {
      let links = list.map((store) => {
        return `<a class="storeLinks" href="https://${store.store.domain}">${store.store.name}</a>`
      });
      return links.join('</br>')
    };

    const returnScreen = (list) => {
      let screen = list.map((scrn) => {
        return `<div class="screen col-6 my-4">
        <img class="screenImg" src="${scrn.image}" >
        </div>`
      });
      return screen.join('\n');
      console.log(screen);
    };

    const displayScreen = (gameData) => {
      const screenDOM = document.querySelector("#screen");
      screenDOM.innerHTML = returnScreen(gameData.results);
    };

    const displayVideo = (gameData) => {
      const trailerDOM = document.querySelector("#trailer");
      const videoDOM = document.querySelector("video source");
      if (gameData.results[0].data.max) {
        trailerDOM.classList.toggle('hidden');
        videoDOM.src = gameData.results[0].data.max;
      };
    };

    const fetchScreen = (url, argument) => {
      fetch(`${url}/${argument}/screenshots?key=${API}`)
        .then((response) => response.json())
        .then((responseData) => {
          displayScreen(responseData);
        });
    };

    const fetchVideo = (url, argument) => {
      fetch(`${url}/${argument}/movies?key=${API}`)
        .then((response) => response.json())
        .then((responseData) => {
          displayVideo(responseData);
        });
    };

    const displayGame = (gameData) => {
      const articleDOM = document.querySelector(".page-detail .article");
      articleDOM.querySelector("h1.title").innerHTML = gameData.name;
      articleDOM.querySelector("div.background").style.backgroundImage = `url('${gameData.background_image}')`;
      articleDOM.querySelector("#websiteBtn").href = gameData.website;
      articleDOM.querySelector("span.rating").innerHTML = `${gameData.rating}/5 - ${gameData.ratings_count} votes`;
      articleDOM.querySelector("#description").innerHTML = gameData.description;
      articleDOM.querySelector("#release").innerHTML = `${dayjs(gameData.released).format("YYYY/MM/DD")}`;
      articleDOM.querySelector("#dev").innerHTML = gameData.developers[0].name;
      articleDOM.querySelector("#platf").innerHTML = returnPlatf(gameData.platforms);
      articleDOM.querySelector("#publish").innerHTML = gameData.publishers[0].name;
      articleDOM.querySelector("#genre").innerHTML = returnGenre(gameData.genres);
      articleDOM.querySelector("#tags").innerHTML = returnGenre(gameData.tags);
      articleDOM.querySelector("#links").innerHTML = returnLinks(gameData.stores);

      fetchScreen("https://api.rawg.io/api/games", cleanedArgument);
      fetchVideo("https://api.rawg.io/api/games", cleanedArgument);
    };

    const fetchGame = (url, argument) => {
      fetch(`${url}/${argument}?key=${API}`)
        .then((response) => response.json())
        .then((responseData) => {
          displayGame(responseData);
        });
    };

    fetchGame("https://api.rawg.io/api/games", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
        <div class="article">
          <div class="background">
          <a id="websiteBtn" href="">Check Website <img class="play" src="${Play}"></a>
          </div>
          <div class="container">
            <div class="titleGroup">
              <h1 class="title"></h1>
              <span class="rating"></span>
            </div>

            <div id="description"></div>
            
            <div class="row mt-1">
              <div class="col-3">
                <p class="info fw-bold">Release date<br></p>
                <span id="release"></span>
              </div>
              <div class="col-3">
                <p class="info fw-bold">Developer<br></p>
                <span id="dev"></span>
              </div>
              <div class="col-3">
                <p class="info fw-bold">Platforms<br></p>
                <span id="platf"></span>
              </div>
              <div class="col-3">
                <p class="info fw-bold">Publisher<br></p>
                <span id="publish"></span>
              </div>
            </div>

            <div class="row mt-4 mb-4">
              <div class="col-6">
                <p class="info fw-bold">Genre<br></p>
                <span id="genre"></span>
              </div>
              <div class="col-6">
                <p class="info fw-bold">Tags<br></p>
                <span id="tags"></span>
              </div>
            </div>

            <div class="buy mb-3">
              <h2>BUY</h2>
              <div id="links"></div>
            </div>

            <div class="trailer mb-3 hidden" id="trailer">
              <h2>TRAILER</h2>
              <video controls class="mt-4">
                <source src="" type="video/mp4">
              </video>
            </div>

            <div class="mb-3">
              <h2>SCREENSHOTS</h2>
              <div class="screenshots row mt-3" id="screen">
            </div>
          </div>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};

export { PageDetail };
