import React, { useState } from "react";
import { Link2 } from "lucide-react"; // Icon

const MissionDetails = () => {
  const missions = [
    {
      id: 1,
      title: "Zebion 1K Drive (Follower Milestone)",
      description:
        "Follow zebion_official on Instagram and invite 3 friends to follow too. Submit a screenshot of your friends following to earn exclusive rewards.",
      link: "https://www.instagram.com/zebion_official/",
      action: "Follow zebion_official and invite 3 friends.",
      condition: "3 friends must follow Zebion and provide screenshot proof.",
      unlock:
        "Player becomes eligible for exclusive rewards only after this step.",
      goal: "Help Zebion reach 1,000–1,500+ organic followers.",
      pts: 20,
    },
    {
      id: 2,
      title: "Zebion Review Round (Brand Trust & SEO Boost)",
      description:
        "Search 'Zebion Infotech Pvt Ltd' on Google, leave a 5-star review, and submit a screenshot to earn in-game rewards.",
      link: "https://www.google.com/search?q=Zebion+Infotech+Pvt+Ltd",
      action: "Search on Google and leave a 5-star review.",
      condition: "Review must be 5 stars (description optional).",
      proof: "Submit screenshot of the review.",
      outcome: "Boost Zebion’s online reputation.",
      pts: 15,
    },
    {
      id: 3,
      title: "Product Integration on GamerThred Site",
      description:
        "Integrate Zebion product Flipkart links like Zebion Ninja Combo on the GamerThred homepage, shop tab, or post-game reward pages.",
      link: "https://dl.flipkart.com/s/bY4!h0NNNN",
      action: "Add Flipkart product links of Zebion to GamerThred site.",
      placement: "Homepage, shop tab, or post-game reward page.",
      product: "Zebion Ninja Combo",
      proof: "Screenshot of product integration on the site.",
      pts: 25,
    },
    {
      id: 4,
      title: "GT Special 1: Follow on Instagram",
      description:
        "Follow GamerThred on Instagram to stay updated and earn rewards.",
      link: "https://www.instagram.com/gamerthred/",
      action: "Follow GamerThred Instagram account.",
      proof: "Submit screenshot of following the account.",
      pts: 10,
    },
    {
      id: 5,
      title: "GT Special 2: Join the Discord",
      description:
        "Join the GamerThred Discord community and be part of exclusive game drops and events.",
      link: "https://discord.gg/YOUR_INVITE_CODE",
      action: "Join GamerThred Discord server.",
      proof: "Submit screenshot of membership.",
      pts: 10,
    },
    {
      id: 6,
      title: "Purchase & Submit Screenshot",
      description:
        "Buy any Zebion product from Flipkart or Amazon and submit the purchase screenshot to unlock top-tier rewards.",
      link: "https://dl.flipkart.com/s/bY4!h0NNNN",
      action: "Purchase Zebion product from Flipkart or Amazon.",
      proof: "Submit purchase confirmation screenshot.",
      reward: "Top-tier reward eligibility upon verification.",
      pts: 50,
    },
  ];

  const [images, setImages] = useState({});

  const handleImageChange = (e, id) => {
    const file = e.target.files[0];
    setImages((prev) => ({ ...prev, [id]: file }));
  };

  const handleSubmit = (id, title) => {
    const image = images[id];
    if (!image) {
      alert("Please upload an image before submitting.");
      return;
    }

    console.log(`Mission Submitted: ${title}`);
    console.log("Uploaded Image File:", image);

    alert(`Mission submitted: ${title}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050D2B] via-[#0B132F] to-[#060A1B] text-white py-10 px-4 md:px-12 font-sans">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center text-white">
        🧩 Mission Details
      </h1>

      <div className="space-y-8 max-w-4xl mx-auto">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className="flex flex-col gap-4 bg-white bg-opacity-5 backdrop-blur-md rounded-xl p-6 border border-purple-700 hover:border-purple-500 transition-all"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <h2 className="text-xl font-semibold text-purple-300 mb-2">
                  {mission.title}
                </h2>

                <p className="text-sm text-gray-300 mb-3">
                  {mission.description}
                </p>

                <div className="flex items-center gap-2 mt-1 text-yellow-400 text-xs font-bold">
                  🎯 {mission.pts} GTC
                </div>
              </div>

              {mission.link && (
                <div className="shrink-0">
                  <a
                    href={mission.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-200"
                    title="Go to mission link"
                  >
                    <Link2 size={24} />
                  </a>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, mission.id)}
                className="w-full sm:w-auto text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-500"
              />

              <button
                onClick={() => handleSubmit(mission.id, mission.title)}
                className="w-full sm:w-auto px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-bold shadow-lg hover:from-yellow-500 hover:to-yellow-700 transition"
              >
                Submit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionDetails;
