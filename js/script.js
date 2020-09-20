let introText1 = ' (height: ';
let introText2= ')';
let space = ' ';

let pokemonRepository = (function (){
  let repository = [
    {name: 'Bulbasaur', type: ['grass', 'poison'], height: 2},
    {name: 'Charizard', type: ['fire', 'flying'], height: 5.07},
    {name: 'Jigglypuff', type: ['normal', 'fairy'], height: 1.08},
    {name: 'Stunky', type: ['poison', 'dark'], height: 1.04},
    {name: 'Slowpoke', type: ['water', 'psychic'], height: 3},
    {name: 'Onix', type: ['rock', 'ground'], height: 28},
    {name: 'Infernape', type: ['fire', 'fighting'], height: 3.11}
    ];
    function add (pokemon) {
      if ( typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon) {
        console.log(typeof pokemon);
        repository.push (pokemon);
      } else {
        console.log('Invalid data type.');
      }
    }
    function getAll () {
      return repository;
    }
    function addListItem(pokemon) {
      let pokemonList  = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button'); //creation of my button element.
      button.innerText = pokemon.name;
      button.classList.add('pokemon-button');
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);
      buttonEvent();
    }
    function buttonEvent(button, pokemon){
      button.addEventListener('click',() => showDetails(pokemon));//my event handeler for the button, which shows extra details on the pokemon.
    }
    function showDetails (pokemon){
      console.log(pokemon.name, pokemon.type, pokemon.height);
    }
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem
    };
})();

pokemonRepository.add({ name: "Pikachu", height: 0.3, types: ["electric"] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
