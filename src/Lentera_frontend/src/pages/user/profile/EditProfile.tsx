import React, { useState } from "react";
import { Lentera_backend } from "../../../../../declarations/Lentera_backend";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth-context";

const EditProfile: React.FC = () => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await Lentera_backend.updateUserProfile(
        username,
        avatarPreview ? [avatarPreview] : []
      );
      if ("ok" in result) {
        await refreshUser();
        navigate("/profile");
      } else {
        setError(result.err);
      }
    } catch (err) {
      console.error(err);
      setError("Unexpected error occurred image to big");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFFFD] px-4 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-90 h-90 opacity-30">
          <img
            src="/assets/flower.svg"
            alt="Decorative flower"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] opacity-30">
          <img
            src="/assets/flower.svg"
            alt="Decorative flower"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-[#f2fff9] p-8 rounded-xl shadow-lg w-full max-w-lg space-y-6 items-center justify-center border-2 border-[#70D3B5]"
      >
        <h1 className="text-center font-montserrat font-bold text-3xl text-[#65C3A6]">
          This is your first time login
        </h1>
        <h3 className="text-center font-montserrat font-medium text-xl text-[#7fd1b7]">
          Edit your profile below !
        </h3>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div className="space-y-2">
          <label
            htmlFor="username"
            className="block text-sm font-montserrat font-medium text-[#32c093] "
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="input your username here"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded bg-[#d5f5eb] text-black border border-[#70D3B5] focus:bg-teal-50 
        focus:border-teal-500  focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-100 "
            required
          />
        </div>

        <div className="space-y-2">
          <p className="block text-sm font-montserrat font-medium text-[#32c093] pb-3">
            Avatar Image (optional)
          </p>

          <input
            id="avatarUrl"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />

          <label
            htmlFor="avatarUrl"
            className="py-1 px-4 bg-white border-2 border-[#70D3B5]
                        text-[#63C2A5] 
                        rounded-lg 
                        font-medium 
                        font-montserrat
                        text-lg
                        hover:bg-teal-50 
                        hover:border-teal-500 
                        hover:text-teal-500
                        active:bg-teal-100
                        transition-all duration-200"
          >
            Choose File
          </label>

          {avatarFile?.name && (
            <p className="mt-1 text-sm font-montserrat font-medium text-[#32c093]">
              {avatarFile.name}
            </p>
          )}

          {avatarPreview && (
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="w-24 h-24 object-cover rounded-full mt-2"
            />
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className=" py-2 px-4 bg-white 
                        border-2 border-[#70D3B5]
                        text-[#63C2A5] 
                        rounded-full 
                        font-medium 
                        font-montserrat
                        text-lg
                        hover:bg-teal-50 
                        hover:border-teal-500 
                        hover:text-teal-500
                        hover:scale-105
                        active:bg-teal-100
                        transition-all duration-200 "
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
