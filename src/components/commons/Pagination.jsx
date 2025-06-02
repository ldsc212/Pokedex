import './Pagination.css'
import { SiPokemon } from "react-icons/si";

function Pagination({ page, totalPages, prev, next }) {
    return (
        <div className='pagination'>
            <div className='pagination__container' >
                <p className='pagination__info'>{page} of {totalPages}</p>
                <div className='pagination__btns'>
                    <button className='pagination__btn' onClick={prev} disabled={page === 1}>Anterior</button>
                    <SiPokemon style={{ fontSize: "4em", margin: "0 1em", verticalAlign: "middle" }} />
                    <button className='pagination__btn' onClick={next} disabled={page === totalPages}>Siguiente</button>
                </div>
            </div>
        </div>
    )
}
export default Pagination