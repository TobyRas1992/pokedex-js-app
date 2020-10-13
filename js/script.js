let pokemonRepository = (function () { //start of IIFE
  let pokemonList = []; // Creates empty array for pokemon
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; //api variable - this is simply the list with names and pokemon URLs. 
  let modalContainer = document.querySelector('#modal-container'); 
  
  function showLoadingMessage() {
    let loadingMessage = document.createElement('P');
    loadingMessage.innerText = 'Loading. One moment!';
    document.body.appendChild(loadingMessage);
  }

  function hideLoadingMessage() {
    let elementToRemove = document.querySelector('P');
    elementToRemove.parentElement.removeChild(elementToRemove);
  }

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
  
  function showDetails (pokemon) {
    loadDetails(pokemon).then(function () {
      loadDetailsToModal(pokemon);
    });
  }
  
  // Loads pokemon data from API. Fires after loadDetails(). 
  function loadList() { 
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) { //fetches the list of Pokemon from the external API.
      return response.json(); //This returns a promise object! You can't access the internal properties yet.
    }).then(function (json) { // The actual JSON response. 
      hideLoadingMessage();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name, // The pokemon name
          detailsUrl: item.url // link to their URL. 
        };
        add(pokemon); 
        console.log(pokemon); 
      });
    }).catch(function (e) { 
      hideLoadingMessage();
      console.error(e);
    });
  }

  // creates the list + button + eventListener for modal
  function addListItem(pokemon) {
    pokemonRepository.loadDetails(pokemon).then (()=>{
      let pokemonButtonList = document.querySelector("#list-group");
      let pokemonListItem = document.createElement("li");
      pokemonListItem.classList.add('list-group-item');
      let pokemonButton = document.createElement("button");
      pokemonButton.classList.add('btn');
      pokemonButton.classList.add('btn-light');
      pokemonButton.setAttribute('type', 'button');
      pokemonButton.setAttribute('data-toggle', 'modal');
      pokemonButton.setAttribute('data-target', '#exampleModalCenter');
      pokemonButton.innerText = pokemon.name; 
      pokemonListItem.appendChild(pokemonButton);
      pokemonButtonList.appendChild(pokemonListItem);
      pokemonButton.addEventListener("click", (event) => {
        showDetails(pokemon);
    });
    });
  }

  // Loads additional details from individual pokemon URL from API
  function loadDetails(item) { 
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) { 
      return response.json();
    }).then(function (details) { // Now we add the details to the pokemon item. 
      hideLoadingMessage()
      item.imageUrl = details.sprites.front_default;
      item.types = details.types.map(function (object){
        return object.type.name;
      });
      item.height = details.height;
      item.weight = details.weight;
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  // Function that will display the modal
  function loadDetailsToModal(item) {
    
    let modalTitle = document.querySelector('#exampleModalCenterTitle');
    modalTitle.innerText(item.name);
    let modalBody = document.querySelector('.modal-body');
    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + (item.height /10) + ' m';
    let weightElement = document.createElement('p');
    weightElement.innerText = 'Weight: ' + (item.weight / 10) + ' kg';
    let typesElement = document.createElement('p');
        if (item.types.length === 1) {
            typesElement.innerText = 'Type: ' + item.types;
          } else {
            typesElement.innerText = 'Types: ' + item.types.join(', ');
          }
    let imageElement = document.createElement('img');
    imageElement.setAttribute('src', item.imageUrl);
    
    modalBody.appendChild(heightElement);
    modalBody.appendChild(weightElement);
    modalBody.appendChild(typesElement);
    modalBody.appendChild(imageElement);


  //   modalContainer.innerHTML = '';

  //   let modal = document.createElement('div');
  //   modal.classList.add('modal');

  //   let modalGrid = document.createElement('div');
  //   modalGrid.classList.add('grid');
    
  //   let closeButtonElement = document.createElement('button');
  //   closeButtonElement.classList.add('modal-close');
  //   closeButtonElement.innerText = 'Close.';
  //   closeButtonElement.addEventListener('click', hideModal);

  //   let nameElement = document.createElement('h2');
  //   nameElement.classList.add('modal-title');
  //   nameElement.innerText = item.name;

  //   let heightElement = document.createElement('p');
  //   heightElement.classList.add('grid','grid-item','modal-content');
  //   heightElement.innerText = 'Height: ' + (item.height / 10) + ' m';

  //   let weightElement = document.createElement('p');
  //   weightElement.classList.add('grid','grid-item','modal-content');
  //   weightElement.innerText = 'Weight: ' + (item.weight / 10) + ' kg';

  //   let typesElement = document.createElement('p');
  //   typesElement.classList.add('grid','grid-item','modal-content');
  //     if (item.types.length === 1) {
  //         typesElement.innerText = 'Type: ' + item.types;
  //       } else {
  //         typesElement.innerText = 'Types: ' + item.types.join(', ');
  //       }

  //   let imageElement = document.createElement('img');
  //   imageElement.classList.add('grid','grid-item','modal-image');
  //   imageElement.setAttribute('src', item.imageUrl);

  //   modalContainer.appendChild(modal);
  //   modal.appendChild(closeButtonElement);
  //   modal.appendChild(nameElement);
  //   modal.appendChild(modalGrid);
  //   modalGrid.appendChild(heightElement);
  //   modalGrid.appendChild(weightElement);
  //   modalGrid.appendChild(typesElement);
  //   modalGrid.appendChild(imageElement);
  //   modalContainer.classList.add('is-visible'); // Toggles modal on. 

  //   function hideModal() {
  //     modalContainer.classList.remove('is-visible');
  //   }
  //   window.addEventListener('keydown', (e) => {
  //     if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
  //       hideModal();
  //     }
  //   });
  
  //   modalContainer.addEventListener('click', (e) => {
  //     let target = e.target;
  //     if (target === modalContainer) {
  //       hideModal();
  //     }
  //   });
  }

  return { 
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})(); 

//picks the repository -> # -> gets the array (getAll) 
//-> foreach item: add to the visible list
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});