"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import bg from "../../assets/ProfilePage/profile-cover.jpg";
import {
  FaStar,
  FaHeart,
  FaShoppingBag,
  FaEdit,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

export default function ProfilePage() {
  const { data: session, update: updateSession } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    image: "",
    phone: "",
    location: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setProfileData({
        name: session.user.name || "",
        image: session.user.image || "",
        phone: session.user.phone || "",
        location: session.user.location || "",
      });
      setPreviewImage(session.user.image || "");
    }
  }, [session]);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      Swal.fire("Error", "Geolocation not supported!", "error");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await res.json();
        const locationName = data.display_name || `${latitude}, ${longitude}`;
        setProfileData((p) => ({ ...p, location: locationName }));
      },
      () => Swal.fire("Error", "Failed to get location", "error")
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data?.data?.url;
  };

  const handleSave = async () => {
    try {
      setUploading(true);
      let imageUrl = profileData.image;
      if (selectedFile) imageUrl = await uploadToImgBB(selectedFile);

      const res = await fetch("/api/updateProfile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session?.user?.email,
          name: profileData.name,
          phone: profileData.phone,
          location: profileData.location,
          image: imageUrl,
        }),
      });
      const result = await res.json();

      if (res.ok) {
        setProfileData((p) => ({ ...p, image: imageUrl }));
        await updateSession({
          user: {
            ...session.user,
            name: profileData.name,
            image: imageUrl,
            phone: profileData.phone,
            location: profileData.location,
          },
        });
        Swal.fire("Success", "Profile updated successfully!", "success");
        setShowModal(false);
      } else Swal.fire("Error", result.message || "Update failed", "error");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Server error", "error");
    } finally {
      setUploading(false);
    }
  };

  const stats = [
    { icon: <FaShoppingBag className="text-orange-600" />, label: "Orders", value: 24 },
    { icon: <FaStar className="text-orange-600" />, label: "Reviews", value: 7 },
    { icon: <FaHeart className="text-orange-600" />, label: "Favorites", value: 5 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-black py-20">
      {/* Header */}
      <div
        className="relative h-64 sm:h-80 bg-center bg-cover rounded-b-[3rem] shadow-xl overflow-hidden"
        style={{ backgroundImage: `url(${bg.src})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-orange-600/60 to-black/80"></div>
        <div className="absolute bottom-8 w-full flex flex-col items-center text-center text-white">
          <div className="relative">
            <img
              src={
                previewImage ||
                profileData.image ||
                "https://cdn-icons-png.flaticon.com/512/747/747545.png"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <button
              onClick={() => setShowModal(true)}
              className="absolute bottom-0 right-0 bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full shadow-md"
            >
              <FaEdit />
            </button>
          </div>
          <h2 className="mt-4 text-2xl font-bold">{profileData.name || "Guest User"}</h2>
          {profileData.location && (
            <p className="flex items-center justify-center gap-2 text-xs mt-1 text-gray-200">
              <FaMapMarkerAlt /> {profileData.location}
            </p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-3xl mx-auto flex justify-around mt-10 text-gray-800 dark:text-gray-200">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="text-3xl">{s.icon}</div>
            <span className="text-xl font-bold">{s.value}</span>
            <p className="text-sm text-gray-600 dark:text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto mt-10 grid sm:grid-cols-2 gap-6 px-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <FaStar className="text-orange-600" /> My Reviews
          </h3>
          <div className="flex flex-col items-center text-gray-500">
            <img
              src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
              alt="No Reviews"
              width={70}
              height={70}
              className="opacity-70"
            />
            <p className="mt-3 text-sm">You haven’t added any reviews yet.</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <FaHeart className="text-orange-600" /> Favorite Restaurants
          </h3>
          <div className="flex flex-col items-center text-gray-500">
            <img
              src="https://i.ibb.co.com/S73TWZvk/tray.png"
              alt="No Favorites"
              width={70}
              height={70}
              className="opacity-70"
            />
            <p className="mt-3 text-sm">No favorites added yet.</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-11/12 sm:w-96 shadow-lg">
            <h3 className="text-lg font-bold text-center mb-4 text-gray-800 dark:text-white">
              Edit Profile
            </h3>

            <div className="flex flex-col items-center mb-4">
              <img
                src={
                  previewImage ||
                  profileData.image ||
                  "https://cdn-icons-png.flaticon.com/512/747/747545.png"
                }
                alt="Preview"
                className="w-24 h-24 rounded-full border-2 border-orange-500 object-cover"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input file-input-bordered mt-3 w-full"
              />
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full focus:border-orange-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone
                </label>
                <div className="flex items-center gap-2">
                  <FaPhoneAlt className="text-orange-600" />
                  <input
                    type="text"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    className="input input-bordered w-full focus:border-orange-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Location
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleChange}
                    className="input input-bordered w-full focus:border-orange-600"
                  />
                  <button
                    onClick={detectLocation}
                    type="button"
                    className="btn bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    Use GPS
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowModal(false)} className="btn border-gray-400">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={uploading}
                className="btn bg-orange-600 hover:bg-orange-700 text-white"
              >
                {uploading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
