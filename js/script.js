import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.12.1/+esm'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjg0MWYwMzczMTQ0NThjNWQzMDhhZmZlYTQyZDg5NiIsInN1YiI6IjY2NmQyMWM4YzkyNjg4ZDhmYmNlNTBlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QAbY3Gl_FQrX6X26zjrmlXhf1w0FBQ3YiJBh5FSrr10'
  }
};

fetch('https://api.themoviedb.org/3/configuration', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));


window.addEventListener('load', () => {
  Promise.all([
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-USS&page=1', options),
    fetch('https://api.themoviedb.org/3/tv/popular?language=pt-BRS&page=1', options)
  ])
  .then(async ([moviesResponse, seriesResponse]) => {

    const moviesData = await moviesResponse.json();
    const seriesData = await seriesResponse.json();

    const combinedResults = [...moviesData.results, ...seriesData.results];

    combinedResults.sort(() => Math.random() - 0.5);

    listarFilmesSeries(combinedResults);
    console.log(combinedResults)
  })
  .catch(err => console.error(err));
});


let btnPesquisa = document.querySelector('#btnPesquisar');
btnPesquisa.addEventListener('click', event => {
  event.preventDefault();

  let valorInput = document.querySelector('#valorPesquisa');

  if (valorInput.value != '') {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${valorInput.value}&include_adult=false&language=pt-BR&page=1`, options)
      .then(response => response.json())
      .then(response => {
        if (response.results && response.results.length > 0) {
          listarFilmesSeries(response.results);
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Esse filme não consta no banco de dados!',
            icon: 'error',
            confirmButtonText: 'Fechar'
          });
        }
      })
      .catch(err => console.error(err));

    valorInput.value = '';
  } else {
    Swal.fire({
      title: 'Error!',
      text: 'Insira um titulo de pesquisa!',
      icon: 'error',
      confirmButtonText: 'Fechar'
    });

    return;
  }
});

function listarFilmesSeries(json) {
  var urlImg = 'https://image.tmdb.org/t/p/w500';

  let lista = document.querySelector('.lista');
  lista.innerHTML = '';

  json.forEach(item => {
    criarListaDeFilmesSeries(item.title || item.original_name, urlImg + item.poster_path, item.id);
  });
}

function criarListaDeFilmesSeries(title, poster, idMovie) {
  let lista = document.querySelector('.lista');
  let card = document.createElement('div');

  card.id = idMovie;
  card.classList.add('card');

  card.innerHTML = `<img src="${poster}" alt=""><p class="d-inline-block text-truncate">${title}</p>`;

  lista.append(card);
}
