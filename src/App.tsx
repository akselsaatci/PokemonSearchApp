import { SetStateAction, useCallback, useEffect, useState } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

function App() {
  const [dataPokemon, setPokemonData] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<any>("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    axios<any>({
      method: "GET",
      url: "https://pokeapi.co/api/v2/pokemon?limit=1279",
      responseType: "json",
    })
      .then((resp) => {
        setData(resp.data.results);
        console.log(data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);
  useEffect(() => {
    setLoading(true);
    setPokemonData([]);
    console.log(data);
    var newFilter = data.filter((item: any) =>
      item.name.includes(search.toLowerCase())
    );
    console.log(newFilter);
    var slicedArray = newFilter.slice(0, 5);
    slicedArray.forEach((element: any) => {
      axios<any>({
        method: "GET",
        url: element.url,
        responseType: "json",
      })
        .then((resp) => {
          var ourData = {
            name: resp.data.name,
            id: resp.data.id,
            sprites: resp.data.sprites.front_default,
          };
          setPokemonData((prevData) => [...prevData, ourData]);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
        });
    });
  }, [search]);
  
  function handleSearch(e: { target: { value: SetStateAction<string> } }) {
    setSearch(e.target.value);
  }
  const debouncedChangeHandler = useCallback(
    debounce(handleSearch, 300)
  , []);

  return (
    <div className="container mx-auto">
      <h1 className="font-bold text-3xl text-center text-secondary mt-10">
        Pokemon Search App
      </h1>
      <div className="text-center mt-8">
        <input
          type="text"
          className="w-1/4 h-10 border-secondary border-2 p-2 rounded no-underline"
          placeholder="Search"
          onChange={debouncedChangeHandler}
        />

        <ul className="mt-2">
          {error && error.message}
          {loading && <p>Loading...</p>}
          {dataPokemon &&
            search != "" &&
            dataPokemon?.map((item) => {
              return (
                <div className="bg-white w-1/4 h-20 my-0 mx-auto border-2 mb-1 py-1.5 rounded no-underline text-center flex">
                  <img src={item.sprites} />
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
