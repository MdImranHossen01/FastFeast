"use client";

export default function SearchBar({ query, setQuery, tag, setTag, allTags }) {
  return (
    <section className="flex gap-4 mb-6 items-center">
      <input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input input-bordered w-full max-w-md bg-gray-100"
      />
      <select
        className="select select-bordered bg-gray-100"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      >
        {allTags.map((t, index) => (
          <option key={`${t}-${index}`} value={t}>
            {t}
          </option>
        ))}
      </select>
    </section>
  );
}
