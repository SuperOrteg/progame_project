const Home = (argument = '') => {
  const render = () => {
    pageContent.innerHTML = `
      <section class="home">
        <div class="articles">Welcome to Progame</div>
      </section>
    `;

  };

  render();
};

export { Home };