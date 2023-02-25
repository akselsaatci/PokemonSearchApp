import React from "react";

export default function DataComponent({ item }: { item: any }) {
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
}
