<template>
  <div class="wrapper">
    <div class="title-block">
      <p v-if="success" class="score succes-message">{{ success }}</p>
      <p v-else class="score succes-message">0</p>
      <h1>Qui est ce pokémon ?</h1>
      <p v-if="error" class="score error-message">{{ error }}</p> 
      <p v-else class="score error-message">0</p> 
    </div> 

    <template v-if="!pokemon">
      <div class="primary-block">
      <h2>En attente ...</h2>
      </div>
    </template>
    
    <template v-else>
      <div class="big">
        <div class="primary-block">
        <PokemonImage 
        :pokemon-id='pokemon.id'  
        :show-pokemon='showPokemon' />

        <PokemonOptions 
        :pokemons='pokemonArr'
        @select-pokemon='checkAnswer'
        :class="disabled" />
      </div>
      <div v-if="showPokemon === true" class="fade-in secondary-block">
        <h2 class="alertMessage" :class="laClase">{{ message }}</h2>
        <div class="btnBlock">
          <button @click="restart" class="restart-btn">Reinitialiser</button>
          <button @click="newPokemon" class="new-pokemon-btn">Lancer Pokemon</button>
        </div>
      </div>
      </div>
    </template>
  </div>
</template>

<script>
import PokemonImage from '@/components/pokemonImage.vue'
import PokemonOptions from '@/components/pokemonOptions.vue'
import getPokemonsOptions from '@/helpers/getPokemonsOptions'// esto es una promesa


export default {
  components:{ PokemonImage, PokemonOptions,},
  data(){
    return{
      pokemonArr:[],
      pokemon: null,
      showPokemon:false,
      showAnswer: false,
      message: false,
      laClase:``,
      disabled:``,
      scoreSuccess:[],
      scoreError:[],
      success:``,
      error:``
    }
  },
  methods:{

    async mixPokemonsArray(){//esta funcion es una promesa porque 'getPokemonsOptions' es una promesa
      this.pokemonArr = await getPokemonsOptions()
      const randomInt = Math.floor( Math.random() * 4 )// creamos el random para los 4 elementoss
      this.pokemon = this.pokemonArr[ randomInt ]// aplicamos el random
    },

    checkAnswer( selectId ){// pokemonID Aca se recibe el argumento 2 del emit de pokemonOptions.vue
      this.showPokemon = true

      if (selectId === this.pokemon.id) {
        this.success = this.scoreSuccess.push(1)
        this.laClase = `succes-message`
        this.disabled = `disabled`
        this.message = `Correct ! c'est ${ this.pokemon.name } !`
      }else{
        this.error = this.scoreError.push(1)
        this.laClase = `error-message`
        this.disabled = `disabled`
        this.message = `Oops, c'est ${ this.pokemon.name } !`
      }
      
    },

    newPokemon(){
      this.pokemonArr = [],
      this.pokemon = null,
      this.showPokemon = false,
      this.showAnswer = false,
      this.disabled = ``
      this.mixPokemonsArray()
    },

    restart(){
      this.newPokemon(),
      this.scoreSuccess = [],
      this.scoreError = [],
      this.error = ``
      this.success = ``
      this.disabled = ``
    }
    
  },
  mounted(){// ver en el pdf que esto hace parte de los Hooks. El mounted es para los metodos de una sola vez
    this.mixPokemonsArray()
  }
}
</script>
<style scoped>
  .title-block{
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
  }
  h1 {
    border: 3px solid rgb(255, 230, 0);
    margin: 0;
    width: fit-content;
    background-color: #2e5b6e;
    padding: 10px 30px;
    border-radius: 10px 10px 0 0;
    color: white;
    font-weight: 600;
    font-size: 2rem;
    -webkit-box-shadow: 5px 5px 10px 0px rgb(0, 0, 0, 0.5); 
    box-shadow: 5px 5px 10px 0px rgb(0, 0, 0, 0.5);
  }
  .wrapper {
    display: inline-grid;
    margin-top: 20px;
}
  .primary-block {
    width: 38rem;
    padding: 40px 50px 40px 50px;
    background-color: #e3ddd3;
    margin-top: -3px;
    border-radius: 40px;
    border: 4mm ridge rgb(209 186 141);
    -webkit-box-shadow: 5px 5px 20px 5px rgb(0, 0, 0, 0.5); 
    box-shadow: 5px 5px 20px 5px rgb(0, 0, 0, 0.5);
  }
  .secondary-block{
    padding: 0 50px 30px 50px;
    background-color: #ffffff;
    margin-top: 10px;
    border-radius: 40px;
    border: 4mm ridge rgb(209 186 141);
    -webkit-box-shadow: 5px 5px 20px 5px rgb(0, 0, 0, 0.5); 
    box-shadow: 5px 5px 20px 5px rgb(0, 0, 0, 0.5);
  }
  .score{
    width: fit-content;
    font-size: 1.5rem;
    margin: 0;
    border-radius: 5px;
    border: 3mm ridge rgb(209 186 141);
    -webkit-box-shadow: 5px 5px 20px 5px rgb(0, 0, 0, 0.2); 
    box-shadow: 5px 5px 20px 5px rgb(0, 0, 0, 0.2);
  }
  .alertMessage{
    width: fit-content;
    margin: -60px auto 30px auto;
    font-size: 1.5rem;
    border-radius: 5px;
    border: 3mm ridge rgb(209 186 141);
    -webkit-box-shadow: 5px 5px 20px 5px rgb(0, 0, 0, 0.2); 
    box-shadow: 5px 5px 20px 5px rgb(0, 0, 0, 0.2);
  }
  .error-message{
    background-color: red;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    padding: 5px 20px;
  }
  .succes-message{
    background-color:green;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    padding: 5px 20px;
  }
  .new-pokemon-btn{
    border: none;
    padding: 10px 20px;
    border-radius: 100px;
    text-transform: uppercase;
    background-color: #75b049;
    color: white;
    font-weight: bolder;
    font-size: 1rem;
    -webkit-box-shadow: 0px 0px 6px 0px rgb(0, 0, 0, 0.3); 
    box-shadow: 0px 0px 6px 0px rgb(0, 0, 0, 0.3);
    transition: 0.2s;
  }
  .restart-btn{
    border: none;
    padding: 10px 20px;
    border-radius: 100px;
    text-transform: uppercase;
    background-color: #2e5b6e;
    color: white;
    font-weight: bolder;
    font-size: 1rem;
    -webkit-box-shadow: 0px 0px 6px 0px rgb(0, 0, 0, 0.3); 
    box-shadow: 0px 0px 6px 0px rgb(0, 0, 0, 0.3);
    transition: 0.2s;
  }
  .restart-btn:hover, .new-pokemon-btn:hover {
    cursor: pointer;
    background-color: #962437;
    transform: scale(1.05);
    -webkit-box-shadow: 0px 0px 20px 0px rgb(0, 0, 0, 0.3); 
    box-shadow: 0px 0px 20px 0px rgb(0, 0, 0, 0.3);
  }
  .disabled{
    display: none;
  }
  .btnBlock{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @media (max-width: 991px) {
    .primary-block, .secondary-block{
      width: auto;
      padding: 0;
    }
    .wrapper{
        display:auto ;
    }
    .btnBlock {
      display: inline-grid;
      padding-bottom: 50px;
    }
    .new-pokemon-btn{
      margin-top: 40px;
    }
  }
</style>
