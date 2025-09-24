export const uploadToImgBB = async (file) => {
  const imgData = new FormData();
  imgData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    { method: "POST", body: imgData }
  );

  const data = await res.json();
  if (data.success) {
    return data.data.url; // ✅ hosted URL
  } else {
    throw new Error("Image upload failed");
  }
};
