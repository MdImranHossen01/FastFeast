"use client";

export default function SearchBar({ query, setQuery, tag, setTag, allTags }) {
  return (
    <div
      data-aos="fade-down"
      className="bg-black/30 backdrop-blur-md rounded-2xl shadow-lg"
    >
      <div className="flex flex-col md:flex-row gap-4 py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-600/70 to-orange-400/70 lg:my-8 items-center z-20">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-lg text-white placeholder:text-white/70 outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
        />

        {/* Tag Select */}
        <select
          className="px-2 py-2 bg-white/10 border border-white/20 rounded-xl text-lg text-white outline-none focus:ring-2 focus:ring-orange-300 hover:bg-orange-600/60 transition-all duration-200 cursor-pointer"
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
