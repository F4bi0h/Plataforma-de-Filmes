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

  let btnPesquisa = document.querySelector('#btnPesquisar');
btnPesquisa.addEventListener('click', event => {
  event.preventDefault();

  let valorInput = document.querySelector('#valorPesquisa');
  console.log(valorInput.value);

  if(valorInput.value != '') {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${valorInput.value}&include_adult=false&language=pt-BR&page=1`, options)
    .then(response => response.json())
    .then(response => {
      if (response.results && response.results.length > 0) {
        listarFilmesSeries(response.results);
      } else {
        alert('Esse filme não consta!');
      }
    })
    .catch(err => console.error(err));

    valorInput.value = '';
  } else {
    alert('Por favor, insira um termo de pesquisa.');
    return;
  }
});

function listarFilmesSeries(json) {
  var urlImg = 'https://image.tmdb.org/t/p/w500';

  let lista = document.querySelector('.lista');
  lista.innerHTML = '';

  json.forEach(item => {
    criarListaDeFilmesSeries(item.title, urlImg + item.poster_path, item.id);
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
