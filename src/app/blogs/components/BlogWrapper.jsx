"use client";

import { useState } from "react";

import Banner from "./Banner";
import BlogContent from "./BlogContent";

export default function BlogWrapper({ blogs }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");

  const filtered = blogs.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <Banner blogs={blogs}
      query={query}
      setQuery={setQuery}
      tag={tag}
      setTag={setTag}/>

      <BlogContent blogs={blogs}
            query={query}
            tag={tag}/>
    </div>
  );
}
