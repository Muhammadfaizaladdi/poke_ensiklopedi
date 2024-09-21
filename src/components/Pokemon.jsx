import { useEffect, useState } from "react"

function Pokemon() {

    // Create State for pokemon list
    const [pokemonList, setPokemonList] = useState([])
    const [loading, setLoading] = useState(true)
    const [isDetail, setIsDetail] = useState(false)
    const [dataDetail, setDataDetail] = useState([])
    const [prevUrl, setPrevUrl] = useState('')
    const [nextUrl, setNextUrl] = useState('')
    const [apiUrl, setApiUrl] = useState('https://pokeapi.co/api/v2/pokemon/')
    
    // Gell All pokemon from API
    async function getAllPokemon(){
        const resData = await fetch(apiUrl)
        const jsonData = await resData.json()

        console.log(jsonData)
        setPrevUrl(jsonData.previous || '')
        setNextUrl(jsonData.next || '')

        let pokemonDetail = []
        // setPokemonList(jsonData.results);
        jsonData.results.map(async (item, index)=>{
            const restDataDetail = await fetch(item.url)
            const jsonDataDetail = await restDataDetail.json()
            pokemonDetail[index] = jsonDataDetail
            setPokemonList([...pokemonDetail])
        })

        console.log(pokemonList)
    }

    function pokemonDetail(){
        return(
            <div className="detail" onClick={() => setIsDetail(false)}>
                <div className="item">
                    <a href="">x</a>
                    <div className="image">
                        <img src={dataDetail.sprites.other.dream_world.front_default}/>
                        
                    </div>
                    <div className="title">{dataDetail.name}</div>
                    <div className="abilities">
                        {
                            dataDetail.abilities.map((item) => {
                                return(
                                    <span key={item.ability.name}>{item.ability.name}</span>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

    useEffect(() => {
        getAllPokemon();
        setLoading(false);
    }, [apiUrl])
    

    return (
    <div className="wrapper">
        <div className="content">
            {
                loading && (<div className="loading">Ngopi Dulu Gak Sih? </div>)
            };
            {
                isDetail && pokemonDetail()
            }
            <div className="grid">
                {
                    pokemonList.map((item) => {
                        return (
                            <div key={item.name} className="item" onClick={() => {setIsDetail(true); setDataDetail(item)}}>
                                <div className="image">
                                <img src={item.sprites.front_default} alt="" />
                                </div>

                                <div className="title">
                                    {item.name}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {
                prevUrl && (
                    <div className="pagination-left">
                        <button onClick={() => { setApiUrl(prevUrl) }}>&laquo;</button>
                    </div>
                )
            }

{
                nextUrl && (
                    <div className="pagination-right">
                        <button onClick={() => { setApiUrl(nextUrl) }}>&raquo;</button>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default Pokemon