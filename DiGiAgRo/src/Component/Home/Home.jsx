import React from 'react'
import FlashCard from './FlashCard';
import Hero from './Hero';
import About from './About';
export default function Home() {
  return (
    <div className="bg-gray-50">

      <Hero />
      <About />

      {/* 🔥 Flash Cards Section */}
      <section className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Explore Tools
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">

          <FlashCard
            title="Weather"
            desc="Check real-time weather & forecast"
            color="bg-blue-100"
            icon="🌤"
            link="/Weather"
          />

          <FlashCard
            title="Crop AI"
            desc="Get crop recommendations"
            color="bg-green-100"
            icon="🌱"
            link="/Cropai"
          />

          <FlashCard
            title="Calculator"
            desc="Fertilizer & resource calculator"
            color="bg-yellow-100"
            icon="🧮"
            link="/Calculator"
          />

          <FlashCard
            title="Knowledge"
            desc="Learn smart farming techniques"
            color="bg-purple-100"
            icon="📚"
            link="/Knowledgehub"
          />

        </div>
      </section>
    </div>
  );
}
