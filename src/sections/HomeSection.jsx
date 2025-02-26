import React from "react";

const HomeSection = () => (
  <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-10 my-auto">
    {/* LEFT COLUMN: Large image */}
    <div className="w-full md:w-1/2">
      <img
        src="./header.jpg"
        alt="Pianist"
        className="w-full h-auto object-cover"
      />
    </div>
    <div className="w-full md:w-1/2 text-left">
      <h1 className="text-3xl font-semibold my-3 font-[Gloock]">
        Bringing Music to Life
      </h1>
      <h2 className="text-xl font-semibold my-3 font-[Gloock] italic">
        The Artistry of Liz Sesler-Beckman
      </h2>
      <p className="my-2 leading-relaxed font-[Instrument_Sans]">
        I am an experienced jazz and classical pianist and accompanist. Whether
        you’re looking for music to elevate a special occasion or lessons to
        grow your skills, I’m here to help.
      </p>
      <p className="my-2 leading-relaxed font-[Instrument_Sans]">
        If you are interested in hiring me to play for your event or to inquire
        about lessons, please contact:{" "}
        <a className="text-blue-500" href="mailto:lizseslerbeckman@gmail.com">
          lizseslerbeckman@gmail.com
        </a>
      </p>
    </div>
  </div>
);

export default HomeSection;
