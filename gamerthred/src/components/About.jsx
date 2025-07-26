import React from "react";
import { assets } from "../assets/assets"; // Ensure this is correctly pointing to your assets file

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050D2B] via-[#0B132F] to-[#060A1B] text-white px-4 py-16 md:px-24 font-sans">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12">
        About GamerThred
      </h1>

      <div className="flex flex-col md:flex-row gap-8 overflow-x-auto md:overflow-visible pb-4">
        {/* Card 1: About GamerThred */}
        <div className="min-w-[300px] md:flex-1 bg-white bg-opacity-10 p-6 rounded-2xl shadow-lg backdrop-blur-md transition hover:scale-[1.01] duration-300 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">
              About GamerThred
            </h2>
            <p className="text-2xl text-gray-200 leading-relaxed mb-4">
              Welcome to{" "}
              <span className="font-bold text-purple-300">GamerThred</span>,
              where gamers earn rewards for playing their favorite games! We
              believe every player should be rewarded. Our platform lets you
              complete fun, game-specific missions to earn cool stuff like
              T-shirts and gaming gear.
            </p>
          </div>
          <img
            src={assets.firstgold}
            alt="decor"
            className="w-full mt-4 rounded-xl object-cover"
          />
        </div>

        {/* Card 2: What We Do */}
        <div className="min-w-[300px] md:flex-1 bg-white bg-opacity-10 p-6 rounded-2xl shadow-lg backdrop-blur-md transition hover:scale-[1.01] duration-300 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">
              What We Do
            </h2>
            <p className=" text-gray-200 leading-relaxed mb-4 text-2xl">
              With one affordable monthly subscription, you can unlock missions
              in our platform. Hit goals like reaching Diamond rank or
              completing quests, and claim awesome rewards. The more you play,
              the more you earn!
            </p>
          </div>
          <img
            src={assets.firstblue}
            alt="decor"
            className="w-full mt-4 rounded-xl object-cover"
          />
        </div>

        {/* Card 3: Why GamerThred + Goal */}
        <div className="min-w-[300px] md:flex-1 bg-white bg-opacity-10 p-6 rounded-2xl shadow-lg backdrop-blur-md transition hover:scale-[1.01] duration-300 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">
              Why GamerThred?
            </h2>
            <ul className="list-disc text-base text-gray-200 pl-5 space-y-2 mb-6">
              <li>
                <strong>For All Gamers:</strong> Casual or pro, everyone gets
                rewarded.
              </li>
              <li>
                <strong>Easy & Fun:</strong> Just play, complete missions, and
                grab your rewards.
              </li>
              <li>
                <strong>Real Prizes:</strong> Get gaming gear, apparel, and
                more.
              </li>
              <li>
                <strong>Community Vibes:</strong> Join gamers who share your
                passion.
              </li>
            </ul>
            <h3 className="text-xl font-semibold mb-2 text-purple-400">
              Our Goal
            </h3>
            <p className="text-base text-gray-200 leading-relaxed">
              We want every gamer to feel valued. GamerThred turns your in-game
              wins into real-world rewards.
            </p>
            <img
              src={assets.thirdgold}
              alt="decor"
              className="w-full mt-4 rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
