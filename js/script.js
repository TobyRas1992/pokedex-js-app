let pokemonRepository = (function () { //start of IIFE
  let pokemonList = []; // Creates empty array for pokemon
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; //api variable
  let modalContainer = document.querySelector('#modal-container'); //modal container variable

  function add(pokemon) { // add function - takes pokemon parameter and checks if it's correct, then pushes it.
    if (
      typeof pokemon === "object" && "name" in pokemon) {
        pokemonList.push(pokemon); 
      } else {
      console.log("pokemon is not correct");
      }
  }
  
  function getAll() { // returns the pokemon array. 
    return pokemonList;
  }

  // adds 
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name; 
    button.classList.add("button-class" && 'modal-activator');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function(event) {
      showModal(pokemon);
    });
  }

  function loadList() { 
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
          type: item.type
        };
        add(pokemon); 
        console.log(pokemon); 
      });
    }).catch(function (e) { 
      hideLoadingMessage();
      console.error(e);
    });
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      hideLoadingMessage()
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  // Function that will display the modal
  function showModal(item) {
    pokemonInfo = pokemonRepository.loadDetails();
    // modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close.';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = 'title'; 

    let contentElement = document.createElement('p');
    contentElement.innerText = 'Hey'

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  // Function that will hide the modal 
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

    // Escape key closes modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });
  // clicking modal closes it
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  function showLoadingMessage() {
    let loadingMessage = document.createElement('P');
    loadingMessage.innerText = 'Loading. One moment!';
    document.body.appendChild(loadingMessage);
  }

  function hideLoadingMessage() {
    let elementToRemove = document.querySelector('P');
    elementToRemove.parentElement.removeChild(elementToRemove);
  }

  return { 
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage
  };
})(); 

//picks the repository -> # -> gets the array (getAll) 
//-> foreach item: add to the visible list
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
