import { useEffect, useState } from "react"
import axios from "axios"
import { defaultTypeEs } from "../../../lib/utils"
import './Item.css'

function Item({ url }) {
    const [pokemon, setPokemon] = useState(null)

    useEffect(() => {
        axios.get(url)
            .then(({ data }) => {
                const types = data.types.map((t) => defaultTypeEs[t.type.name])
                // console.log(types)
                const id = `No. ${data.id.toString().padStart(3, '0')}`
                setPokemon({
                    id,
                    name: data.name,
                    image: data.sprites.other.dream_world.front_default,
                    types
                })
            })
    }, [url])

    if (!pokemon) {
        return (
            <div>
                <p>Cargando tarjeta...</p>
            </div>
        )
    }

    return (
        <div className="item">
            <img className="item__img" src={pokemon.image} alt={pokemon.name} />
            <span className="item__id">{pokemon.id}</span>
            <h2 className="item__name">{pokemon.name}</h2>
            <p className="item__types">
                {pokemon.types.map((t) => {
                    return (
                        <span key={t} className={`item__type type--${t.toLowerCase()}`}>{t}</span>
                    )
                })}
            </p>
        </div>
    )
}

export default Item