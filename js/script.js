let introText1 = ' (height: ';
let introText2= ')';
let space = ' ';

let pokemonRepository = (function (){
  let pokemonList = [
    {name: 'Bulbasaur', type: ['grass', 'poison'], height: 2},
    {name: 'Charizard', type: ['fire', 'flying'], height: 5.07},
    {name: 'Jigglypuff', type: ['normal', 'fairy'], height: 1.08},
    {name: 'Stunky', type: ['poison', 'dark'], height: 1.04},
    {name: 'Slowpoke', type: ['water', 'psychic'], height: 3},
    {name: 'Onix', type: ['rock', 'ground'], height: 28},
    {name: 'Infernape', type: ['fire', 'fighting'], height: 3.11}
    ];
    function add (item) {
      pokemonList.push (item);
    }
    function getAll () {
      return pokemonList;
    }
    return {
      add: add,
      getAll: getAll
    };
})();

let newPokemonList = pokemonRepository.getAll();

newPokemonList.forEach((pokemon, i) => {
   document.write("<p>" + pokemon.name + ' (height: ' + newPokemonList[i].height + introText2 + space+ "</p>") ;
});


// let secondPokemonRepository = pokemonRepository.getAll();
// secondPokemonRepository.forEach((item, i) => {
//     document.write("<p>" + secondPokemonRepository[i].name + ' (height: ' + secondPokemonRepository[i].height + introText2 + space) + "</p>";
// });
