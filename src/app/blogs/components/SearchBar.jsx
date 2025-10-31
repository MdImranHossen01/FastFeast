"use client";

export default function SearchBar({ query, setQuery, tag, setTag, allTags }) {
  return (
    <div
      data-aos="fade-down"
      className="w-full max-w-3xl mx-auto bg-black/30 backdrop-blur-md rounded-xl shadow-lg"
    >
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-orange-600/70 to-orange-400/70 items-stretch sm:items-center">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder:text-white/70 outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
        />

        {/* Tag Select */}
        <select
          className="w-full sm:w-auto px-3 py-2 sm:py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm sm:text-base text-white outline-none focus:ring-2 focus:ring-orange-300 hover:bg-orange-600/60 transition-all duration-200 cursor-pointer"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          {allTags.map((t, index) => (
            <option
              key={`${t}-${index}`}
              value={t}
              className="bg-gray-900 text-white"
            >
              {t}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
