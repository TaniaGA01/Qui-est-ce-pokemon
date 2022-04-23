import { shallowMount } from "@vue/test-utils"
import pokemonOptions from "@/components/pokemonOptions"
import { pokemons } from '../mocks/pokemons.mock'

describe('pokemonOptions Component', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(pokemonOptions, {
            props: {
                pokemons
            }
        })
        
        console.log(pokemons)
    })
    
    test('Match avec snapshot', () => {

        console.log( wrapper.html() )

        expect( wrapper.html() ).toMatchSnapshot()

    })

    test('Afficher les 4 li', () => {
        
        const liTags = wrapper.findAll('li')

        expect(liTags.length).toBe(4)
        
        expect(liTags[0].text() ).toBe('bulbasaur')
        expect(liTags[1].text() ).toBe('ivysaur')
        expect(liTags[2].text() ).toBe('venusaur')
        expect(liTags[3].text() ).toBe('charmander')

    })

    test('Emitir "selection" avec les paramètres en cliquant ', () => {
        
        const [li1, li2, li3, li4] = wrapper.findAll('li')

        li1.trigger('click'); // un click manuel --> estimule pour l'expect
        li2.trigger('click'); // un click manuel --> estimule pour l'expect
        li3.trigger('click'); // un click manuel --> estimule pour l'expect
        li4.trigger('click'); // un click manuel --> estimule pour l'expect

        console.log(wrapper.emitted('selectPokemon')) // [[1]] corresponde au pokemon.id

        expect( wrapper.emitted('selectPokemon').length).toBe(4) // emitir 1 seule fois
        expect( wrapper.emitted('selectPokemon')[0]).toStrictEqual([1]) // [1] pokemon.id
        expect( wrapper.emitted('selectPokemon')[1]).toStrictEqual([2])
        expect( wrapper.emitted('selectPokemon')[2]).toStrictEqual([3])
        expect( wrapper.emitted('selectPokemon')[3]).toStrictEqual([4])

    })

})