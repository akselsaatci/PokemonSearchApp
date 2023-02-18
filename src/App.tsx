import { SetStateAction, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [dataPokemon, setData] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    axios<any>({
      method: "GET",
      url: "https://pokeapi.co/api/v2/pokemon?limit=1279",
      responseType: "json",
    }).then((resp) => {
      setData(resp.data.results);
      console.log(resp.data.results.filter((item:any) =>item.name.includes("ant")).map((item:any) => item.name));
    });
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
        <div className="bg-white w-1/4 h-10 my-0 mx-auto border-2 py-1.5 rounded no-underline text-center">
          <p>Pikachu</p>
        </div>
        <ul className="mt-2">
          {dataPokemon &&
            dataPokemon?.filter((item:any) =>item.name.includes(search.toLowerCase())).map((item) => {
              return <li key={item.name} className="first-letter:capitalize"><a target="_blank" href={`https://pokemon.fandom.com/wiki/`+item.name}>{item.name}</a></li>;
            })}
        </ul>
      </div>
    </div>
  );
}

export default App;
