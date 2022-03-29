<template>
  <div class="pokemon-container">
    <img v-if="!showPokemon" 
      class="hidden-pokemon fade-in" 
      :src="imgSrc"
      alt="pokemon">
    <img
      v-else
      class="show fade-in"
      :src="imgSrc"
      alt="pokemon">
  </div>
  
</template>

<script>


export default {
  props :{
    pokemonId : {
      type : Number,
      require : true
    },
    showPokemon :{// en el componente se debe escribir show-pokemon
      type : Boolean,
      require : true,
      default : false
    }
  },
  computed:{
    imgSrc(){
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ this.pokemonId }.svg`
    }
  }
}
</script>

<style scoped> /* scoped cuando solo se quiere el css para el componente */
/* Pokemon Picture */
img {
    height: 300px;
    user-select: none;/* Evita que se pueda arrastrar la imagen */
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
}
.hidden-pokemon, .shadow {
    transition: 3s;
    filter: brightness(0);
}
@media (max-width: 991px) {
  img {
    height: auto;
    width: 85%;
  }
}

</style>
