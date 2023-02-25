import { SetStateAction, useCallback, useEffect, useState } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import SearchInput from "./components/SearchInput";
import DataComponent from "./components/DataComponent";

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
      })
      .catch((err) => {
        setError(err);
      });
  }, []);
  useEffect(() => {
    setLoading(true);
    setPokemonData([]);
    var newFilter = data.filter((item: any) =>
      item.name.includes(search.toLowerCase())
    );
    if (newFilter.length === 0) {
      setError("No Pokemon Found");
      setLoading(false);
    } else {
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
    }
  }, [search]);

  function handleSearch(e: { target: { value: SetStateAction<string> } }) {
    setSearch(e.target.value);
  }
  const debouncedChangeHandler = useCallback(debounce(handleSearch, 300), []);

  return (
    <div className="container mx-auto">
      <h1 className="font-bold text-3xl text-center text-secondary mt-10">
        Pokemon Search App
      </h1>
      <div className="text-center mt-8">
        <SearchInput debouncedChangeHandler={debouncedChangeHandler} />

        <ul className="mt-2">
          {error && error.message}
          {loading && <p>Loading...</p>}
          {dataPokemon &&
            search != "" &&
            dataPokemon?.map((item) => {
              return <DataComponent key={item.id} item={item} />;
            })}
        </ul>
      </div>
    </div>
  );
}

export default App;
