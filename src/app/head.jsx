// src/app/(home)/head.jsx
export default function Head() {
  return (
    <>
      {/* Videos */}
      <link rel="preload" href="/video1.mp4" as="video" type="video/mp4" />
      <link rel="preload" href="/video2.mp4" as="video" type="video/mp4" />
      <link rel="preload" href="/video3.mp4" as="video" type="video/mp4" />

      {/* Posters */}
      <link rel="preload" href="/video1-poster.jpg" as="image" type="image/jpeg" />
      <link rel="preload" href="/video2-poster.jpg" as="image" type="image/jpeg" />
      <link rel="preload" href="/video3-poster.jpg" as="image" type="image/jpeg" />
    </>
  );
}
