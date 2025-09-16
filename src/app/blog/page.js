"use client"
import { useState } from 'react';
import { posts } from '../data/posts';
import BlogCard from '@/components/BlogCard';

 const metadata = {
  title: 'Blog - FastFeast',
  description: 'Food delivery related articles, tips and news'
};

export default function BlogPage() {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('All');

  const allTags = ['All', ...new Set(posts.flatMap(p => p.tags))];

  const filtered = posts.filter(p => {
    const matchTag = tag === 'All' ? true : p.tags.includes(tag);
    const matchQuery = query.trim() === '' ? true : (
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(query.toLowerCase())
    );
    return matchTag && matchQuery;
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Blog</h1>
        <p className="text-gray-600">Latest tips, rider guides and food ordering news.</p>
      </header>

      <section className="flex gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />

        <select className="select select-bordered" value={tag} onChange={e => setTag(e.target.value)}>
          {allTags?.map((t,index) => <option key={`${t} - ${index}`} value={t}>{t}</option>)}
        </select>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="text-gray-500">No posts found.</div>
        ) : (
          filtered.map(p => <BlogCard key={p.id} post={p} />)
        )}
      </section>
    </main>
  );
}
