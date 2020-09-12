let pokemonList = [
  {name: 'Bulbasaur', type: ['grass', 'poison'], height: 2},
  {name: 'Charizard', type: ['fire', 'flying'], height: 5.07},
  {name: 'Jigglypuff', type: ['normal', 'fairy'], height: 1.08},
  {name: 'Stunky', type: ['poison', 'dark'], height: 1.04},
  {name: 'Slowpoke', type: ['water', 'psychic'], height: 3},
  {name: 'Onix', type: ['rock', 'ground'], height: 28},
  {name: 'Infernape', type: ['fire', 'fighting'], height: 3.11}
];

for (i=0; pokemonList.length; i++){
  if (pokemonList[i].height > 20) {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') - Wow, that\'s a big Pokemon!');
  } else {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')');
  }
}
