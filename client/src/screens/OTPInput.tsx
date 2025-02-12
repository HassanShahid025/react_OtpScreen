import { useState, useRef, useEffect } from "react";

export default function OTPInput() {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [timer, setTimer] = useState<number>(30);
  const [isResendVisible, setIsResendVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendVisible(true);
    }
  }, [timer]);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    if (pastedData.length === 6) {
      setOtp(pastedData.split(""));
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/otp/verifyOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: enteredOtp }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error: unknown) {
      console.error(error);
      setMessage("Error verifying OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setMessage("");
    setOtp(new Array(6).fill(""));
    setTimer(30);
    setIsResendVisible(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
      <div className="flex space-x-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-10 h-10 text-center text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={otp.includes("")}
        className={`mt-4 px-6 py-2 text-white rounded ${
          otp.includes("")
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
        }`}
      >
        {loading ? "Verifying..." : "Submit"}
      </button>
      {message && <p className="mt-4 text-sm font-medium">{message}</p>}
      {isResendVisible ? (
        <button
          onClick={handleResend}
          className="mt-4 text-blue-500 hover:underline"
        >
          Resend OTP
        </button>
      ) : (
        <p className="mt-4 text-gray-600">Resend OTP in {timer} seconds</p>
      )}
    </div>
  );
}
