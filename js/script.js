let pokemonList = [
  {name: 'Bulbasaur', type: ['grass', 'poison'], height: 2},
  {name: 'Charizard', type: ['fire', 'flying'], height: 5.07},
  {name: 'Jigglypuff', type: ['normal', 'fairy'], height: 1.08},
  {name: 'Stunky', type: ['poison', 'dark'], height: 1.04},
  {name: 'Slowpoke', type: ['water', 'psychic'], height: 3},
  {name: 'Onix', type: ['rock', 'ground'], height: 28},
  {name: 'Infernape', type: ['fire', 'fighting'], height: 3.11}
];
let introText1 = ' (height: ';
let introText2= ')';
let specialText = ') - Wow, that\'s a big Pokemon!'
let space = ' '

for (i=0; i < pokemonList.length; i++){
  if (pokemonList[i].height > 20) {
    document.write(pokemonList[i].name + introText1 + pokemonList[i].height + specialText + space);
  } else {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + introText2 + space);
  }
}
