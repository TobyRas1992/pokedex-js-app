let pokemonRepository = (function () { //Creates an IIFE.
  let pokemonList = []; // empty array to push() pokemon from the API into.
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; // This is the API URL variable.

  function add(pokemon) {
    if ( //Next comes the conditionals.
      typeof pokemon === "object" && // Checks if 'pokemon' is an object and contains the key 'name'.
      "name" in pokemon
    ) {
      pokemonList.push(pokemon); // If pokemon matches the criteria, the object is pushed to the pokemonList array.
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() { // simple function that returns the value of pokemonList.
    return pokemonList;
  }
  function addListItem(pokemon) {
    // Starting off with some DOM manipulation through querySelectors.
    let pokemonList = document.querySelector(".pokemon-list"); //selects the pokemonList table.
    let listpokemon = document.createElement("li"); // Creates a 'li' element.
    let button = document.createElement("button"); // Creating the button
    button.innerText = pokemon.name; // Adds a text to the button from the pokemon.name.
    button.classList.add("button-class"); // Adds a class to the button.
    listpokemon.appendChild(button); // Appends the button to the listPokemon element.
    pokemonList.appendChild(listpokemon); // Appends the listpokemon to the pokemonList.
    button.addEventListener("click", function(event) { // adds an EventListener to the button that listens for a click.
      showDetails(pokemon); // we call the showDetails() function we created, which fetches the details for the clicked pokemon and logs them to the console.
    });
  }

  function loadList() { // this function is a promise function, specifically a 'fetch' function.
    // We fetch the API, make it a promise, and the result of it will be a response.
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json(); // We need to use the json property to parse the response body into JSON Data. This returns a promised object!
    }).then(function (json) { // NOW we get the actual JSON promise! If the promise within the response.json() is resolved, any data passed in the resolve function will be available in the next .then() block,
      hideLoadingMessage();
      json.results.forEach(function (item) { //then we run a foreach loop on results key from the json.
        let pokemon = { // We assign these two keys to the a variable.
          name: item.name,
          detailsUrl: item.url,
          type: item.type
        };
        add(pokemon); // Now, we add that variable to the pokemonList by calling the add() function we created.
        console.log(pokemon); // this logs all the pokemon to the console log when we execute the program.
      });
    }).catch(function (e) { // the catch block handles any erros that may occur if the promise is rejected.
      hideLoadingMessage();
      console.error(e);
    })
  }
//This function is an experiment to see if I can add the type to the pokemonList.
// function loadType(item) {
//   let typeOfPokemon = item.detailsUrl;
//   return fetch(url). then((response)=> {
//     return response.json();
//   }).then((details) =>{
//     item.pokemonType = details.types;
//   }).catch((e) => {
//     console.error(e);
//   });
// }
  function loadDetails(item) { // Like loadList, this is also a promise functionn (fetch).
    showLoadingMessage();
    let url = item.detailsUrl; // Creates variable wit the assigned value of item.detailsUrl -> detailsUrl comes from the pokemon parameter in the loadList() function above.
    return fetch(url)/* this fetches the detailsUrl for the pokemon from the API*/.then(function (response) {
      return response.json(); // Like in loadList(), we need to use the json property to parse the response body into JSON Data. This returns a promised object!
    }).then(function (details) {
      hideLoadingMessage()
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  function showDetails(item) { // allows us to log the deatails fetched via the loadDetails() function in the console.
    pokemonRepository.loadDetails(item).then(function () { // uses the loadDetails() function, then logs the result to the console.
      console.log(item);
    });
  }

  function showLoadingMessage() { // function that shows loading message.
    let loadingMessage = document. createElement("paragraph");
    loadingMessage = 'Loading. One moment!';
    listpokemon.appendChild(loadingMessage);
    pokemonList.appendChild(listpokemon);
  }

  function hideLoadingMessage() { //function that removes loadingmessage.
    let elementToRemove = document.querySelector('paragraph');
    elementToRemove.parentElement.removeChild(elementToRemove);
  }

  return { //eturns all the essential functions that we need to access outside of the IIFE to run the code.
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage
  };
})(); // end of all the promises - Huge chunk of connected code!

// Here, we actually execute all the functions and promises we just have created above.
pokemonRepository.loadList().then(function () {
  // Subsequently, the getAll() function is passed as a value.
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
