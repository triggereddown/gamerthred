import React, { useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";


const ForgotPassword = () => {
  const { vs_code } = useParams();
const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
  e.preventDefault();

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  fetch("https://gamerthred.com/api/ResetPassword.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      vs_code: vs_code,
      new_password: newPassword,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 200) {
        alert("Password changed successfully!");
        navigate("/login");
      } else {
        alert(data.msg || "Failed to change password.");
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      alert("Something went wrong.");
    });
};


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#050D2B] via-[#0B132F] to-[#060A1B] flex items-center justify-center px-6 py-20 font-sans relative overflow-hidden">
      <div className="absolute -top-32 -right-20 w-[400px] h-[400px] bg-purple-700 opacity-25 blur-3xl rounded-full z-0"></div>

      <div className="bg-gray-900 bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-8 sm:p-12 w-full max-w-md z-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
          <span className="text-purple-500">Reset Password</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-gray-300 flex items-center mb-1">
              <Lock className="w-4 h-4 mr-2" />
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-300 flex items-center mb-1">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Re-enter new password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-fuchsia-600 transition-all py-3 rounded-full text-white font-semibold text-lg shadow-lg"
          >
            Change Password
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Back to{" "}
          <a href="/login" className="text-purple-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
