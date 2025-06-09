import React, { useState } from 'react';
import "./App.css"


type GitHubUser = {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
};


const App: React.FC = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [error, setError] = useState("");
   const [loading, setLoading] = useState(false); // 👈 loading state


  const fetchGitHubUser = async () => {

    if (!username) return;
    setLoading(true); // Start loading

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error("User not found");
      const data: GitHubUser = await response.json();
      setUserData(data);
      setError("");
      console.log(data)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setUserData(null);
      setError("GitHub user not found");
    }finally {
    setLoading(false); // ✅ This must always run
  }
  };




  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center px-4 text-white">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center font-mono ">
        Welcome to <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">DevRadar</span>

      </h1>
      <p className="text-md md:text-xl mb-8 text-gray-300 text-center max-w-xl font-mono">
        Instantly search and explore GitHub developer profiles by username.
      </p>
      <div className="flex max-md:flex-col justify-center gap-3.5 w-full max-w-md">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username..."
          className="flex-grow px-4 py-3 rounded-l-xl text-[#b7a3a3]  border border-blue-300 focus:outline-none"
        />
         <button
          onClick={fetchGitHubUser}
          disabled={loading}
          className={`${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          } text-white px-6 rounded-r-lg transition font-mono border border-blue-300`}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {userData && (
        <div className="bg-[#e7e6e6] p-6 rounded shadow text-center w-full max-w-md mt-5">
          <img
            src={userData.avatar_url}
            alt={userData.login}
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl text-black font-semibold font-mono">{userData.name}</h2>
          <p className="text-gray-600 font-mono">@{userData.login}</p>
          <p className="mt-2 font-mono text-gray-600">{userData.bio}</p>
          <div className="flex sm:justify-between max-sm:flex-wrap max-sm:gap-5 max-sm:justify-center mt-4 text-sm text-gray-700 font-mono">
            <span>Repos: {userData.public_repos}</span>
            <span>Followers: {userData.followers}</span>
            <span>Following: {userData.following}</span>
          </div>
          <a
            href={userData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-blue-600 hover:underline font-semibold font-mono"
          >
            View GitHub Profile →
          </a>
        </div>
      )}
    </div>
  );
};

export default App;
