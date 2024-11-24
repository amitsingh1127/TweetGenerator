import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [mood, setMood] = useState("");
  const [tweet, setTweet] = useState("");
  const [loading, setLoading] = useState(false);

  const generateTweet = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/tweet-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, mood }),
      });

      const { tweet } = await response.json();
      setTweet(tweet);
    } catch (error) {
      console.error("Failed to generate tweet:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full space-y-6">
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mb-4">
          <img src="/logo/facebook.svg" alt="Facebook" className="w-6 h-6" />
          <img src="/logo/instagram.svg" alt="Instagram" className="w-6 h-6" />
          <img src="/logo/twitter.svg" alt="Twitter" className="w-6 h-6" />
          <img src="/logo/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
        </div>

        {/* Title and Subtitle */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          AI Tweet Generator
        </h1>
        <p className="text-center text-gray-600">
          Generate creative and engaging tweets on X instantly with AI
        </p>

        {/* Input for Topic */}
        <div className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="topic" className="text-gray-700 font-medium">
              Enter your post topic <span className="text-gray-500">(i)</span>
            </label>
            <input
              type="text"
              id="topic"
              placeholder="Digital Marketing, Social Media, Content Marketing, Branding"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>

          {/* Dropdown for Mood/Tone of Voice */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="mood" className="text-gray-700 font-medium">
              Tone of voice <span className="text-gray-500">(i)</span>
            </label>
            <select
              id="mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            >
              <option value="">Select Tone</option>
              <option value="Casual">Casual 😄</option>
              <option value="Formal">Formal 🧐</option>
              <option value="Happy">Happy 😃</option>
              <option value="Excited">Excited 🤩</option>
              <option value="Angry">Angry 😡</option>
              <option value="Sad">Sad ☹️</option>
              <option value="Inspirational">Inspirational 🌟</option>
            </select>
          </div>

          {/* Generate Tweet Button */}
          <button
            onClick={generateTweet}
            className={`w-full py-3 rounded-md text-white font-semibold ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate AI Tweet"}
          </button>

          {/* Generated Tweet Output */}
          <div className="space-y-2">
            <h2 className="text-gray-700 font-medium">Your generated tweet</h2>
            <div className="border border-gray-300 rounded-md p-4 bg-gray-50 text-gray-800 min-h-[100px]">
              {tweet || "Your tweet will appear here"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
