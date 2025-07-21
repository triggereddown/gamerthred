import React from "react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div>
      <div className="min-h-screen w-full bg-gradient-to-br from-[#050D2B] via-[#0B132F] to-[#060A1B] flex items-center justify-center px-6 py-20 font-sans relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute -top-32 -left-20 w-[400px] h-[400px] bg-purple-700 opacity-20 blur-3xl rounded-full z-0"></div>
        <div className="absolute -bottom-32 -right-20 w-[400px] h-[400px] bg-purple-600 opacity-20 blur-3xl rounded-full z-0"></div>

        <div className="bg-gray-900 bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-8 sm:p-12 w-full max-w-4xl z-10 text-white overflow-y-auto max-h-[90vh]">
          <h1 className="text-3xl font-bold mb-4 text-purple-400 text-center">
            GamerThred: Privacy Policy
          </h1>
          <p className="text-sm text-gray-400 text-center mb-8">
            Last Updated: July 18, 2025
          </p>

          <div className="text-sm text-gray-300 space-y-6">
            <p>
              At GamerThred, we are committed to protecting your privacy. This
              Privacy Policy explains how GamerThred ("we," "us," or "our")
              collects, uses, processes, discloses, and protects your personal
              data when you use our website, mobile applications, and services
              (collectively, the "Platform").
            </p>
            <p>
              By accessing or using the GamerThred Platform, you consent to the
              collection, use, processing, and disclosure of your personal data
              as described in this Privacy Policy.
            </p>

            <h2 className="text-purple-300 font-semibold text-lg">
              1. Data Fiduciary
            </h2>
            <p>
              GamerThred is the Data Fiduciary responsible for the processing of
              your personal data under the Digital Personal Data Protection Act,
              2023 (DPDP Act).
            </p>

            <h2 className="text-purple-300 font-semibold text-lg">
              2. Personal Data We Collect
            </h2>
            <p>
              We collect various types of personal data to provide and improve
              our services.
            </p>
            <p className="font-semibold">
              2.1. Information You Provide Directly:
            </p>
            <ul className="list-disc list-inside">
              <li>
                Account Information: Name, email address, password, date of
                birth, mobile number.
              </li>
              <li>
                Profile Information: Gamer IDs/usernames from third-party games
                (e.g., BGMI ID, Valorant ID), profile picture (optional),
                preferred games.
              </li>
              <li>
                Communication Data: Support requests, feedback, inquiries.
              </li>
              <li>
                Reward Redemption Info: Bank details, UPI IDs (used securely for
                payouts).
              </li>
            </ul>

            <p className="font-semibold">
              2.2. Information We Collect Automatically (Usage Data):
            </p>
            <ul className="list-disc list-inside">
              <li>Device and browser info (IP address, type, OS).</li>
              <li>
                Interaction data: Pages visited, time spent, features used.
              </li>
              <li>
                Game data: Match results, scores, achievements via user uploads
                or API.
              </li>
              <li>Cookies and trackers (See Section 7).</li>
            </ul>

            <h2 className="text-purple-300 font-semibold text-lg">
              3. How We Collect Personal Data
            </h2>
            <ul className="list-disc list-inside">
              <li>During registration and profile setup.</li>
              <li>Via Task submission (e.g., screenshots/videos).</li>
              <li>Automatically while using the Platform.</li>
              <li>Via third parties (e.g., Google/Discord login).</li>
            </ul>

            <h2 className="text-purple-300 font-semibold text-lg">
              4. Purposes for Collecting and Processing
            </h2>
            <ul className="list-disc list-inside">
              <li>To provide and maintain accounts and services.</li>
              <li>To verify Tasks and reward submissions.</li>
              <li>To personalize recommendations and UI.</li>
              <li>For customer communication and updates.</li>
              <li>To detect fraud and ensure fairness.</li>
              <li>To comply with Indian laws and KYC obligations.</li>
            </ul>

            <h2 className="text-purple-300 font-semibold text-lg">
              5. Consent for Data Processing
            </h2>
            <p>
              By using GamerThred, you explicitly consent to your personal data
              being processed. You can withdraw consent at any time, subject to
              applicable legal restrictions.
            </p>

            <h2 className="text-purple-300 font-semibold text-lg">
              6. Sharing of Data
            </h2>
            <ul className="list-disc list-inside">
              <li>Service providers: Hosting, payments, analytics.</li>
              <li>
                Brands (only with user consent) for fulfilling partner rewards.
              </li>
              <li>Authorities: If required by law or for legal protection.</li>
              <li>Business transfers: During mergers or acquisitions.</li>
            </ul>

            <h2 className="text-purple-300 font-semibold text-lg">
              7. Cookies & Trackers
            </h2>
            <p>
              We use cookies and similar tools to enhance user experience. You
              can modify browser settings to control them, but some features may
              be limited.
            </p>

            <h2 className="text-purple-300 font-semibold text-lg">
              8. Security Measures
            </h2>
            <p>
              We use encryption, firewalls, and restricted access to secure your
              data. Despite efforts, no digital system is fully immune.
            </p>

            <h2 className="text-purple-300 font-semibold text-lg">
              9. Your Rights (DPDP Act)
            </h2>
            <ul className="list-disc list-inside">
              <li>Right to Access, Correct, and Delete your data.</li>
              <li>Right to Nominate and to Grievance Redressal.</li>
            </ul>

            <h2 className="text-purple-300 font-semibold text-lg">
              10. Updates to this Policy
            </h2>
            <p>
              This Privacy Policy may change. Significant changes will be
              notified via Platform alerts or email.
            </p>

            <h2 className="text-purple-300 font-semibold text-lg">
              11. Contact
            </h2>
            <p>
              If you have any questions or wish to exercise your rights:
              <br />
              Email: gamerthred1@gmail.com
            </p>

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

export default Privacy;
