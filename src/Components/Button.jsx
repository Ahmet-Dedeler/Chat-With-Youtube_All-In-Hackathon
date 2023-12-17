import * as React from 'react'

export function TrailingIconButtons({onClick } ) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="inline-flex ite ms-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"

    >
      Submit →
    </button>
  )
}
