// src/Components/AboutPage/AboutPage.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const AboutPage = () => {
  const about = useSelector(state => state.about);

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{about.hero.title}</h1>
        <p className="text-lg md:text-2xl">{about.hero.subtitle}</p>
      </section>

      {/* Story Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <img
            src={about.story.image}
            alt="Fashion"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{about.story.title}</h2>
          <p className="text-gray-700">{about.story.text}</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-16  text-gray-800 ">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
          <div className="bg-pink-50 p-8 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-2">{about.mission.title}</h3>
            <p className="text-gray-700">{about.mission.text}</p>
          </div>
          <div className="bg-purple-50 p-8 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-2">{about.vision.title}</h3>
            <p className="text-gray-700">{about.vision.text}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{about.cta.title}</h2>
        <p className="mb-6">{about.cta.text}</p>
        <a
          href={about.cta.buttonLink}
          className="bg-white text-pink-500 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          {about.cta.buttonText}
        </a>
      </section>
    </div>
  );
};

export default AboutPage;
