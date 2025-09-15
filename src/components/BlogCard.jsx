import React from 'react'

export default function BlogCard({post}) {
  return (
    <article className="card bg-base-100 shadow-md border">
      <figure className="h-40 overflow-hidden">
        <img src={post.cover} alt={post.title} className="w-full h-full object-cover" />
      </figure>
      <div className="card-body">
        <h3 className="card-title text-lg">{post.title}</h3>
        <p className="text-sm text-gray-600">{post.excerpt}</p>
        <div className="flex items-center gap-2 mt-2">
          {post.tags.map(tag => (
            <span key={tag} className="badge badge-outline">{tag}</span>
          ))}
        </div>
        <div className="card-actions justify-between items-center mt-4">
          <div className="text-xs text-gray-500">{post.author} · {post.date}</div>
          <Link href={`/blog/${post.slug}`}>
            <a className="btn btn-sm btn-primary">Read</a>
          </Link>
        </div>
      </div>
    </article>
  )
}
