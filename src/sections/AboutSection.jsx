import React from "react";

const AboutSection = () => (
  <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-5">
    <div className="mx-auto leading-relaxed space-y-3 text-left md:w-3/5">
      <div>
        <h1 className="text-3xl font-semibold mb-2 font-[Gloock]">
          Who I Am
        </h1>
      </div>

      <div className="ml-12 md:flex">
        <div className="leading-relaxed space-y-3 font-[Instrument_Sans]">
          <p>
            Liz Sesler-Beckman is a versatile pianist with an extensive
            background as a performer, music director, and educator. She has
            performed internationally in Japan, Europe, and the United States,
            collaborating with renowned musicians such as Tonight Show drummer
            Ed Shaughnessy, legendary bassist Milt Hinton, saxophonist Don
            Menza, drummer Alan Dawson, and bassist John Lockwood. She has also
            accompanied Irish tenor Anthony Kearns.
          </p>
          <p>
            Liz has been a member of several distinguished jazz groups,
            including the Stan Kenton Alumni Band and the Baltimore-based Jazz
            Caravan. She has also served as a clinician at Wellesley, Dickinson,
            and Allegheny Colleges, as well as in the Baltimore City Schools.
            Recently Liz has been collaborating in North West Pennsylvania with
            musicians including David VanAmburg, Kelly Armor, and Phil
            Papotnik.
          </p>
          <p>
            Liz was the Associate Director of Music at Second Presbyterian
            Church in Baltimore for over two decades. She also served as Chair
            of the Fine Arts department at Boys’ Latin School of Maryland. More
            recently, she directed numerous choral ensembles and musicals during
            her fifteen years of teaching at Gilman School, including six
            international tours with the Gilman Chorus.
          </p>
        </div>
      </div>
    </div>

    {/* RIGHT COLUMN (Image) */}
    <div className="hidden md:block">
      <img
        src="./headshot.jpg"
        alt="Pianist"
        height="4000"
        width="2667"
        className="max-w-84 object-cover md:ml-3 mx-auto my-auto"
      />
    </div>
  </div>
);

export default AboutSection;
