import { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const Login = ({ setShowLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted", formData);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#050D2B] via-[#0B132F] to-[#060A1B] flex items-center justify-center px-6 py-20 font-sans relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-32 -right-20 w-[400px] h-[400px] bg-purple-700 opacity-25 blur-3xl rounded-full z-0"></div>

      <div className="bg-gray-900 bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-8 sm:p-12 w-full max-w-md z-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
          <span className="text-purple-500">Welcome Back</span> to GamerThred
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-fuchsia-600 transition-all py-3 rounded-full text-white font-semibold text-lg shadow-lg"
          >
            <LogIn className="inline w-5 h-5 mr-2" />
            Log In
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-400 mt-6 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-400 hover:underline">
            Sign Up
          </Link>
        </p>

        {/* Optional Close Button */}
        {setShowLogin && (
          <div className="text-center mt-4">
            <button
              onClick={() => setShowLogin(false)}
              className="text-xs text-gray-500 hover:underline"
            >
              Close Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
