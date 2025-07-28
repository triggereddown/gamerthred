import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").slice(0, 4);
    if (!/^\d{4}$/.test(text)) return;

    const digits = text.split("");
    setOtp(digits);
    digits.forEach((digit, i) => {
      if (inputRefs.current[i]) inputRefs.current[i].value = digit;
    });
    inputRefs.current[3].focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 4) {
      alert("Please enter a valid 4-digit OTP.");
      return;
    }

    fetch("https://gamerthred.com/api/verify-otp.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp: otpCode }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          alert("✅ OTP Verified!");
          const token = data.data.jwt;
          localStorage.setItem("token", token);
          console.log(token);
          navigate("/profile");
        }else if(data.status === 201){
          navigate(`/changepassword/${data.reset_token}`)
        } else {
          alert("❌ " + data.msg);
        }
      })
      .catch((err) => {
        console.error("Verification error:", err);
        alert("Something went wrong. Try again.");
      });
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-[#050D2B] via-[#0B132F] to-[#060A1B] font-inter">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8 sm:p-10 text-center text-white">
        <h1 className="text-2xl font-bold mb-2">Email Verification</h1>
        <p className="text-sm text-purple-300 mb-6">
          Enter the 4-digit code sent to{" "}
          <span className="font-semibold text-white">{email}</span>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-3 mb-6">
            {otp.map((digit, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                inputMode="numeric"
                className="w-14 h-14 text-center text-2xl font-bold text-white bg-gray-800 border border-gray-600 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none"
                value={digit}
                onChange={(e) => handleInputChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onPaste={handlePaste}
                ref={(el) => (inputRefs.current[i] = el)}
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-fuchsia-600 text-white font-semibold py-3 rounded-full transition"
          >
            ✅ Verify OTP
          </button>
        </form>

        <p className="text-sm text-purple-300 mt-6">
          Didn't receive the code?{" "}
          <button
            type="button"
            onClick={() => alert("OTP resent!")}
            className="hover:underline text-purple-400"
          >
            Resend
          </button>
        </p>
      </div>
    </main>
  );
};

export default OtpVerification;
