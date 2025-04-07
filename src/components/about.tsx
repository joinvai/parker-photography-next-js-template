import React from 'react'

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <h1 className="text-2xl mb-2">THIS IS</h1>
      <h2 className="text-6xl mb-8 font-heading">SIRE DESIGN</h2>
      
      <p className="max-w-3xl mb-8 text-lg">
        Sire Design's projects are based on strong design concepts and great attention to detail. With a design approach rooted in modernist principles of design and architecture, Sire Design takes an analytical approach to interiors while having an open-minded view of innovation.
      </p>

      <button type="button" className="border border-black px-8 py-3 font-heading transition-all hover:italic">
        READ ABOUT US
      </button>
    </div>
  )
}
