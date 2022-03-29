import pokemonApi from '@/api/pokemonApi'

// 1. Creamos el arreglo de los Pokemones
const getPokemons = () => {

    const pokemonsArr = Array.from( Array(650) )
    return pokemonsArr.map( (_ , index) => index + 1 )

}

// funcion principal
const getPokemonsOptions = async() => {

    // 2. ordenamos de manera aleatoria el arreglo del punto 1
    const mixedPokemons = getPokemons().sort( () => Math.random() - 0.5 ) //el 0.5 mezcla bien los elementos del array

    const pokemons = await getPokemonsNames( mixedPokemons.splice(0,4) ) // captura los 4 primeros elementos 'Pokemons' del punto 1
    return pokemons

}

// 3. Recuperamos los nombres

const getPokemonsNames = async( [a,b,c,d] = []) =>{

    //Se declara un arreglo de promesas
    const promiseArr = [
        pokemonApi.get(`/${ a }`),
        pokemonApi.get(`/${ b }`),
        pokemonApi.get(`/${ c }`),
        pokemonApi.get(`/${ d }`),
    ]

    // luego, mediante otro arreglo se da el valor a cada elemento del arreglo 
    const [ p1, p2, p3, p4] = await Promise.all( promiseArr )
    return[
        {name: p1.data.name, id: p1.data.id},
        {name: p2.data.name, id: p2.data.id},
        {name: p3.data.name, id: p3.data.id},
        {name: p4.data.name, id: p4.data.id},
    ]
}

export default getPokemonsOptions