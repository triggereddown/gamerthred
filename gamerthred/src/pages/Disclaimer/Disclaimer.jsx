import React from "react";
import { Link } from "react-router-dom"; // Don't forget to import Link if you want a "Back to Home"

const Disclaimer = () => {
  return (
    <div>
      {/* This entire div sets up the full-screen background and centers the content box */}
      <div className="min-h-screen w-full bg-gradient-to-br from-[#050D2B] via-[#0B132F] to-[#060A1B] flex items-center justify-center px-6 py-20 font-sans relative overflow-hidden">
        {/* Background Glows (same as Privacy and Tos pages) */}
        <div className="absolute -top-32 -left-20 w-[400px] h-[400px] bg-purple-700 opacity-20 blur-3xl rounded-full z-0"></div>
        <div className="absolute -bottom-32 -right-20 w-[400px] h-[400px] bg-purple-600 opacity-20 blur-3xl rounded-full z-0"></div>

        {/* The main content box with backdrop blur and scroll */}
        <div className="bg-gray-900 bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-8 sm:p-12 w-full max-w-4xl z-10 text-white overflow-y-auto max-h-[90vh]">
          {/* Title Section */}
          <h1 className="text-3xl font-bold mb-4 text-purple-400 text-center">
            GamerThred: Disclaimer
          </h1>
          <p className="text-sm text-gray-400 text-center mb-8">
            Last Updated: July 18, 2025
          </p>

          {/* Content Body */}
          <div className="text-sm text-gray-300 space-y-6">
            <section>
              <h2 className="text-purple-300 font-semibold text-lg">
                1. No Warranties
              </h2>
              <p>
                The Platform and its services are provided on an "as is" and "as
                available" basis, without any warranties of any kind, either
                express or implied. GamerThred makes no representations or
                warranties of any kind, express or implied, as to the operation
                of the Platform or the information, content, materials, or
                products included on the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-purple-300 font-semibold text-lg">
                2. No Guarantee of Earnings or Rewards
              </h2>
              <p>
                GamerThred does not guarantee any specific amount of XP,
                rewards, or financial gain from using the Platform. Your ability
                to earn rewards depends solely on your skill, effort, successful
                completion of tasks, and adherence to our Terms of Service.
                Reward availability is subject to change without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-purple-300 font-semibold text-lg">
                3. Skill-Based Gaming
              </h2>
              <p>
                GamerThred's tasks are designed to be skill-based, meaning
                success depends predominantly on the user's knowledge, training,
                attention, and experience. We are not a gambling platform. Users
                are responsible for understanding and complying with all
                applicable laws in their respective jurisdictions regarding
                online gaming and rewards.
              </p>
            </section>

            <section>
              <h2 className="text-purple-300 font-semibold text-lg">
                4. Third-Party Games
              </h2>
              <p>
                GamerThred is not affiliated with, endorsed by, or sponsored by
                any third-party game developers or publishers whose games are
                featured on our Platform. All game names, logos, and
                intellectual property remain the property of their respective
                owners. GamerThred is not responsible for any changes, issues,
                or policies related to these third-party games.
              </p>
            </section>

            <section>
              <h2 className="text-purple-300 font-semibold text-lg">
                5. Accuracy of Information
              </h2>
              <p>
                While we strive to provide accurate and up-to-date information,
                GamerThred does not warrant the completeness, reliability, or
                accuracy of any information on the Platform, including task
                descriptions, reward values, or leaderboard data.
              </p>
            </section>

            <section>
              <h2 className="text-purple-300 font-semibold text-lg">
                6. Limitation of Liability
              </h2>
              <p>
                GamerThred shall not be liable for any direct, indirect,
                incidental, consequential, or punitive damages, or any loss of
                profits or revenues, whether incurred directly or indirectly, or
                any loss of data, use, goodwill, or other intangible losses,
                resulting from (a) your access to or use of or inability to
                access or use the Platform; (b) any conduct or content of any
                third party on the Platform; or (c) unauthorized access, use, or
                alteration of your transmissions or content.
              </p>
            </section>

            <section>
              <h2 className="text-purple-300 font-semibold text-lg">
                7. External Links
              </h2>
              <p>
                The Platform may contain links to external websites or resources
                that are not provided or maintained by GamerThred. We do not
                guarantee the accuracy, relevance, timeliness, or completeness
                of any information on these external websites.
              </p>
            </section>

            <section>
              <h2 className="text-purple-300 font-semibold text-lg">
                8. Changes to Platform
              </h2>
              <p>
                GamerThred reserves the right to modify, suspend, or discontinue
                any aspect of the Platform or its services at any time without
                prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-purple-300 font-semibold text-lg">
                9. No Legal or Financial Advice
              </h2>
              <p>
                The content on this Platform is not intended to be and should
                not be construed as legal, financial, or professional advice.
                Always consult with a qualified professional for specific advice
                tailored to your situation.
              </p>
            </section>

            <section>
              <h2 className="text-purple-300 font-semibold text-lg">
                10. Acceptance
              </h2>
              <p>
                By using the GamerThred Platform, you acknowledge and agree to
                this Disclaimer.
              </p>
            </section>

            {/* Back to Home Link (Optional, but good for consistency) */}
            <div className="text-center mt-6">
              <Link
                to="/"
                className="text-purple-400 hover:text-purple-300 hover:underline transition"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
