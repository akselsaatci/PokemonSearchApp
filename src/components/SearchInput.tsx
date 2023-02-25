import React from 'react'

export default function SearchInput({debouncedChangeHandler}: {debouncedChangeHandler: any}) {
  return (
    <input
          type="text"
          className="w-1/4 h-10 border-secondary border-2 p-2 rounded no-underline"
          placeholder="Search"
          onChange={debouncedChangeHandler}
        />
  )
}
