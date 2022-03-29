<template>
  <div class="options-container">
    <ul>
      <li 
      v-for="pokemon in pokemons" 
      :key="pokemon.id"
      @click="$emit('selectPokemon', pokemon.id)"><!-- dos argumentos : 1. Nombre del evento (argumento obligatorio) 2. Data (opcional). El valor 1 se envía al padre, el valor dos se envía como argumento a la funcion donde el evento 1 funciona-->
      {{ pokemon.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    pokemons:{ // viene de pokemonPage.vue
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  display: contents;
}
li {
  font-size: 1rem;
  background-color: #c75164;
  padding: 5px 10px;
  border-radius: 100px;
  font-weight: bolder;
  color: rgb(255, 255, 255);
  cursor: pointer;
  width: 250px;
  text-transform: uppercase;
  display: grid;
  align-items: center;
  -webkit-box-shadow: 0px 0px 6px 0px rgb(0, 0, 0, 0.3); 
  box-shadow: 0px 0px 6px 0px rgb(0, 0, 0, 0.3);
  transition: 0.2s;
}
li:hover {
  background-color: #962437;
  transform: scale(1.05);
  -webkit-box-shadow: 0px 0px 20px 0px rgb(0, 0, 0, 0.3); 
  box-shadow: 0px 0px 20px 0px rgb(0, 0, 0, 0.3);
}
.options-container {
  margin-top: 25px;
  display: flex;
  justify-content: center;
}
@media (max-width: 991px) {
    ul {
      display: grid;
    }
    li {
      margin-top: 2rem;
      width: auto;
      display: initial;
    }
    .options-container{
        display: initial;
    }
 }
</style>
