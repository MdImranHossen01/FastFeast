"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import bg from "../../assets/ProfilePage/profile-cover.jpg";
import Swal from "sweetalert2";

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

  // Load profile from session
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

  // Detect user location using browser GPS
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
        setProfileData((prev) => ({ ...prev, location: locationName }));
      },
      () => Swal.fire("Error", "Failed to get location", "error")
    );
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Upload image to ImgBB
  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data?.data?.url;
  };

  // Handle update
  const handleSave = async () => {
    try {
      setUploading(true);
      let imageUrl = profileData.image;

      // Upload to ImgBB 
      if (selectedFile) {
        imageUrl = await uploadToImgBB(selectedFile);
      }

      // Update profile in your database
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
        // Update local state
        setProfileData((prev) => ({ ...prev, image: imageUrl }));

        // Update NextAuth session
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
      } else {
        Swal.fire("Error", result.message || "Update failed", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Server error", "error");
    } finally {
      setUploading(false);
    }
  };

  const stats = { reviews: 7, photos: 13, followers: 3 };

  return (
    <div className="px-[5%] sm:px-[12%] mx-auto min-h-screen">
      {/* Cover Photo */}
      <div
        className="relative h-48 sm:h-68 w-full bg-cover bg-center rounded-lg overflow-hidden mt-20"
        style={{ backgroundImage: `url(${bg.src})` }}
      >
        <div className="absolute bottom-8 left-8 flex items-center gap-4">
          {/* Profile Image */}
          <img
            src={
              profileData.image ||
              "https://cdn-icons-png.flaticon.com/512/747/747545.png"
            }
            alt={profileData.name || "User"}
            className="rounded-full border-4 border-white shadow-lg w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover"
          />

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-white drop-shadow-lg">
              {profileData.name || "Guest User"}
            </h2>
            {/* Show location */}
            {profileData.location && (
              <p className="text-white text-sm">{profileData.location}</p>
            )}
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="absolute top-4 right-4 sm:right-6 bg-gray-600 text-white px-3 py-1 text-sm sm:text-base cursor-pointer rounded shadow hover:bg-gray-700 transition"
        >
          Edit Profile
        </button>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap justify-center sm:justify-end gap-6 mt-3 text-gray-700 dark:text-gray-200">
        <div>
          <span className="font-bold">{stats.reviews}</span> Reviews
        </div>
        <div>
          <span className="font-bold">{stats.photos}</span> Photos
        </div>
        <div>
          <span className="font-bold">{stats.followers}</span> Followers
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col sm:flex-row gap-6 mt-6">
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-md shadow p-6 text-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Reviews
          </h2>
          <div className="flex flex-col items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
              alt="No Reviews"
              width={80}
              height={80}
              className="opacity-70"
            />
            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Nothing here yet
            </p>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box bg-white dark:bg-gray-800">
            <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200">
              Edit Profile
            </h3>

            {/* Profile Image view */}
            <div className="flex flex-col items-center mb-4">
              <img
                src={
                  previewImage ||
                  "https://cdn-icons-png.flaticon.com/512/747/747545.png"
                }
                alt="Preview"
                className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input file-input-bordered mt-3 w-full border border-gray-400"
              />
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  className="input w-full border border-gray-400 focus:border-orange-500 focus:outline-none mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={profileData.phone || ""}
                  onChange={handleChange}
                  className="input w-full border border-gray-400 focus:border-orange-500 focus:outline-none mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Location</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="location"
                    value={profileData.location || ""}
                    onChange={handleChange}
                    className="input w-full border border-gray-400 focus:border-orange-500 focus:outline-none mt-1"
                  />
                  <button
                    onClick={detectLocation}
                    type="button"
                    className="btn btn-sm mt-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                  >
                    Use GPS
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-action">
              <button
                onClick={handleSave}
                className="btn bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                disabled={uploading}
              >
                {uploading ? "Saving..." : "Save"}
              </button>
              <button onClick={() => setShowModal(false)} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
