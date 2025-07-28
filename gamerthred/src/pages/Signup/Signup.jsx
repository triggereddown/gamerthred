import { useState, useEffect } from "react"; // ✅ FIXED
import { Mail, Lock, UserPlus } from "lucide-react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";



const Signup = () => {
  const navigate = useNavigate();
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp && decoded.exp < currentTime) {
        localStorage.clear();
      } else {
        navigate("/profile");
      }
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.clear();
    }
  }
}, [navigate]);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [agreedTOS, setAgreedTOS] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email.endsWith("@gmail.com")) {
      alert("Please use a Gmail address for registration.");
      return;
    }

    if (!agreedTOS || !agreedPrivacy) {
      alert("Please agree to both Terms & Conditions and Privacy Policy.");
      return;
    }
    fetch("https://gamerthred.com/api/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          alert("✅ Registration successful!");
          navigate(`/verify-otp/${formData.email}`);
        } else {
          alert("❌ " + data.msg);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Something went wrong. Please try again.");
      });
    console.log("Form submitted", formData);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#050D2B] via-[#0B132F] to-[#060A1B] flex items-center justify-center px-6 py-20 font-sans relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-32 -right-20 w-[400px] h-[400px] bg-purple-700 opacity-25 blur-3xl rounded-full z-0"></div>

      <div className="bg-gray-900 bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-8 sm:p-12 w-full max-w-md z-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
          <span className="text-purple-500">Join</span> GamerThred
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div>
            <label className="text-sm font-semibold text-gray-300 flex items-center mb-1">
              <UserPlus className="w-4 h-4 mr-2" />
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Your Gamer Tag"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="text-sm font-semibold text-gray-300 flex items-center mb-1">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="text-sm font-semibold text-gray-300 flex items-center mb-1">
              <Lock className="w-4 h-4 mr-2" />
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Create a strong password"
            />
          </div>

          {/* Terms and Privacy Agreement */}
          <div className="text-sm text-center text-purple-400 flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2">
              <input
                type="checkbox"
                checked={agreedTOS}
                onChange={() => setAgreedTOS(!agreedTOS)}
                className="accent-purple-500"
              />
              <Link to="/tos" className="hover:underline hover:text-purple-300">
                I agree to the Terms & Conditions
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2">
              <input
                type="checkbox"
                checked={agreedPrivacy}
                onChange={() => setAgreedPrivacy(!agreedPrivacy)}
                className="accent-purple-500"
              />
              <Link
                to="/privacy"
                className="hover:underline hover:text-purple-300"
              >
                I agree to the Privacy Policy
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!agreedTOS || !agreedPrivacy}
            className={`w-full transition-all py-3 rounded-full text-white font-semibold text-lg shadow-lg ${
              agreedTOS && agreedPrivacy
                ? "bg-purple-600 hover:bg-fuchsia-600"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            ⚡ Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
