import { shallowMount } from "@vue/test-utils"
import PokemonPicture from "@/components/pokemonImage"

describe('PokemonPicture component', () => {

    test('Match with Snapshot', () => {

        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 1,
                showPokemon: false
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
        
    })

    test('Afficher image cachée et le pokemon 100', () => {

        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 100,
                showPokemon: false
            }
        })

        const [img1, img2] = wrapper.findAll('img')

        expect( img1.exists() ).toBeTruthy()
        expect(img2).toBe(undefined)
        
        //pour s'assurer que l'image a la bonne classe :
        expect(img1.classes('hidden-pokemon')).toBeTruthy()
        
        // capturer l'image 100
        expect(img1.attributes('src')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg')

        
    })
    
    test('Afficher Pokemon si showPokemon = true', () => {
        
        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 100,
                showPokemon: true
            }
        })

        const img1 = wrapper.find('img')

        expect( img1.exists() ).toBeTruthy()
        
        //pour s'assurer que l'image a la bonne classe :
        expect( img1.classes('hidden-pokemon')).toBeFalsy()
        expect(img1.classes('fade-in')).toBeTruthy()
        

    })
})