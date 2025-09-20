// VolunteerCorner.jsx
import React from "react";

const VolunteerCorner = () => {
  return (
    <section
      id="volunteercorner"
      className="min-h-screen bg-heroBG px-6 md:px-16 py-16 flex flex-col justify-center"
    >
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-white">
        Volunteer Corner
      </h1>

      {/* Subtitle */}
      <h2 className="mt-4 text-lg md:text-xl font-semibold text-white">
        Powering Change, One Action at a Time!
      </h2>

      {/* Paragraph */}
      <p className="mt-6 text-base md:text-lg leading-relaxed text-white max-w-5xl">
        At Greenpeace, we recognize that real change is driven by the collective
        power of dedicated individuals. Our volunteers—environmental champions
        from diverse backgrounds—are the backbone of our campaigns, relentlessly
        working towards a greener, more just world. Whether advocating for climate
        energy, Biodiversity, or promoting Social & Economic justice, their
        commitment and passion fuel the momentum for impactful change. This
        platform is a tribute to their resilience, showcasing their transformative
        journeys and contributions. Here, we celebrate their achievements, share
        their challenges, and inspire others to take action. Together, we are not
        just imagining a better future—we are creating it.
      </p>
    </section>
  );
};

export default VolunteerCorner;
