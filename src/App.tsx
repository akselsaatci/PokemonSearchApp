import { SetStateAction, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [dataPokemon, setData] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [error ,setError] = useState<any>("");
  useEffect(() => {
    axios<any>({
      method: "GET",
      url: "https://pokeapi.co/api/v2/pokemon?limit=1279",
      responseType: "json",
    }).then((resp) => {
      setData(resp.data.results.map((item:any,index:any)=>{item.index = index;return item}));
    }).catch((err) =>{setError(err)});
  }, []);

  function handleSearch(e: { target: { value: SetStateAction<string> } }) {
    setSearch(e.target.value);
  }

  return (
    <div className="container">
      <h1 className="font-bold text-3xl text-center text-secondary mt-10">
        Pokemon Search App
      </h1>
      <div className="text-center mt-8">
        <input
          type="text"
          className="w-1/4 h-10 border-secondary border-2 p-2 rounded no-underline"
          placeholder="Search"
          onChange={handleSearch}
          value={search}
        />

        <ul className="mt-2">
          {error && error.message}
          {dataPokemon && 
            dataPokemon
              ?.filter((item: any) => item.name.includes(search.toLowerCase()))
              .map((item) => {
                return (
                  <div className="bg-white w-1/4 h-20 my-0 mx-auto border-2 mb-1 py-1.5 rounded no-underline text-center flex">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.index +1}.png`} />
                      <a
                        target="_blank"
                        className="first-letter:capitalize"
                        href={`https://pokemon.fandom.com/wiki/` + item.name}
                      >
                        {item.name}
                      </a>
                  </div>
                );
              })}
        </ul>
      </div>
    </div>
  );
}

export default App;
