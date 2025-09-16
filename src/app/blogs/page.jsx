"use client"

import BlogCard from '../../components/BlogCard';
import { FaHome } from 'react-icons/fa'
import { useState } from 'react';





const posts = [
  {
    id: 1,
    title: "5 Best Street Foods in Dhaka",
    excerpt: "Discover the most delicious and affordable street foods you must try in Dhaka.",
    content: "Full blog content here...",
    image: "https://images.squarespace-cdn.com/content/v1/5e484ab628c78d6f7e602d73/1610144234425-DN8GBNLSDK7E6P85LKDG/Street-food-in-Dhaka-Chop.jpg",
  },
  {
    id: 2,
    title: "Why Online Food Delivery is Growing in Bangladesh",
    excerpt: "Food delivery apps are changing the way we eat. Here’s why the trend is booming.",
    content: "Full blog content here...",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF5dAftS0ZCk8PRW3cMOodh5w_v_UZ0lpvlw&s",
  },
  {
  id: 3,
  title: "Top 7 Biriyani Places in Dhaka You Can’t Miss",
  excerpt: "From old Dhaka to Banani, here are the best biriyani spots loved by locals.",
  content: "Full blog content here...",
  image: "https://media-cdn.tripadvisor.com/media/photo-s/12/2e/0d/18/biryani.jpg",
},
{
  id: 4,
  title: "Healthy Eating Tips for Busy Professionals",
  excerpt: "Quick, healthy, and affordable meals you can order online while working.",
  content: "Full blog content here...",
  image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
},
{
  id: 5,
  title: "Best Midnight Food Delivery Services in Dhaka",
  excerpt: "Hungry at midnight? Here are the top food delivery apps that stay open late.",
  content: "Full blog content here...",
  image: "https://images.unsplash.com/photo-1604909053294-5e015ff3e0db",
},
{
  id: 6,
  title: "Top 10 Cafes in Dhaka for Students",
  excerpt: "Looking for budget-friendly cafes with Wi-Fi and cozy vibes? Here’s the list.",
  content: "Full blog content here...",
  image: "https://images.unsplash.com/photo-1527168027773-0cc890c1dbd0",
},
{
  id: 7,
  title: "How to Save Money on Food Delivery",
  excerpt: "Tips and tricks to get discounts, promo codes, and free delivery offers.",
  content: "Full blog content here...",
  image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
},
{
  id: 8,
  title: "Best Burgers in Dhaka You Must Try",
  excerpt: "From local favorites to international brands, these burgers are worth it.",
  content: "Full blog content here...",
  image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
},
{
  id: 9,
  title: "Vegan and Vegetarian Restaurants in Dhaka",
  excerpt: "Plant-based food lovers will enjoy these healthy and tasty options.",
  content: "Full blog content here...",
  image: "https://images.unsplash.com/photo-1543353071-10c8ba85a904",
},
{
  id: 10,
  title: "Food Delivery Safety Tips During Rainy Season",
  excerpt: "How to make sure your food stays safe and hygienic during heavy rains.",
  content: "Full blog content here...",
  image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
},
{
  id: 11,
  title: "Traditional Bangladeshi Desserts You Can Order Online",
  excerpt: "From mishti d-oi to chomchom, discover where to order authentic sweets.",
  content: "Full blog content here...",
  image: "https://images.unsplash.com/photo-1625944192516-3ffba5d5bb8e",
},
{
  id: 12,
  title: "The Rise of Cloud Kitchens in Bangladesh",
  excerpt: "Ghost kitchens are changing the food industry – here’s what you need to know.",
  content: "Full blog content here...",
  image: "https://images.unsplash.com/photo-1586201375761-83865001e17d",
}

];
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
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-yellow-400">{metadata.title}</h1>
          <p className="text-gray-600">{metadata.description} Latest tips, rider guides and food ordering news.</p>
        </div>
        <button className="btn btn-primary flex justify-center" >
      <FaHome style={{ marginRight: '8px' }} className='' /> {/* The icon */}
      Back to Home
    </button>
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
