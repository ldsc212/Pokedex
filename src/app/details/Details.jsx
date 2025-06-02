import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import axios from 'axios'
import './Details.css'
import { defaultTypeEs } from '../../lib/utils'
import { CgPokemon } from "react-icons/cg";
import { SiPokemon } from "react-icons/si";

function Details() {
    const { name } = useParams()
    const [pokemon, setPokemon] = useState(null)

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(({ data }) => {
                const types = data.types.map((t) => defaultTypeEs[t.type.name] || t.type.name)

                const height = data.height / 10
                const weight = data.weight / 10

                const ps = data.stats[0].base_stat
                const attack = data.stats[1].base_stat
                const defense = data.stats[2].base_stat
                const specialAttack = data.stats[3].base_stat
                const specialDefense = data.stats[4].base_stat
                const speed = data.stats[5].base_stat

                const moves = Promise.all(data.moves.map(async (m) => {
                    const { data } = await axios.get(m.move.url)
                    return data.names.find((n) => n.language.name === 'es')?.name
                }))

                setPokemon({
                    ...data,
                    types,
                    height,
                    weight,
                    stats: {
                        ps,
                        attack,
                        defense,
                        specialAttack,
                        specialDefense,
                        speed
                    },
                    moves
                })
            })
    }, [name])

    if (!pokemon) {
        return <div>Cargando...</div>
    }

    return (
        <div className='details'>
            <div className='details__container'>
                <div className='details__header'>
                    <Link to='/pokedex' className='details__back'>
                        <SiPokemon style={{ fontSize: "6.5em" }} />
                    </Link>
                    <h2 className="details__name">
                        <span style={{ display: "block", textAlign: "center" }}>
                            <CgPokemon style={{ fontSize: "1.2em", marginBottom: "0.2em", marginLeft: "0.7em", color: "#FFD600" }} />
                        </span>
                        {pokemon.name}
                    </h2>
                    <p className='details__id'>{`No. ${pokemon.id.toString().padStart(3, '0')}`}</p>
                </div>

                <div className='details__content'>
                    <div className='details__image'>
                        <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
                    </div>



                    <h3>Stats</h3>
                    <ul>
                        <li>PS: {pokemon.stats.ps}</li>
                        <li>Ataque: {pokemon.stats.attack}</li>
                        <li>Defensa: {pokemon.stats.defense}</li>
                        <li>Ataque Especial: {pokemon.stats.specialAttack}</li>
                        <li>Defensa Especial: {pokemon.stats.specialDefense}</li>
                        <li>Velocidad: {pokemon.stats.speed}</li>
                    </ul>

                    <h3>Altura</h3>
                    <p>{pokemon.height}m</p>

                    <h3>Peso</h3>
                    <p>{pokemon.weight}Kg</p>

                    <h3>Tipo</h3>
                    <p>{pokemon.types.map((t) => (
                        <span key={t}>{t}</span>
                    ))}</p>
                </div>
            </div>
        </div>
    )
}
export default Details