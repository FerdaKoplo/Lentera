import { useEffect, useState } from "react";
import { Lentera_backend } from "../../../declarations/Lentera_backend";
import type { User } from "../../../declarations/Lentera_backend/Lentera_backend.did";

export const useProfile = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const result = await Lentera_backend.getCurrentUser();
        const user =
          Array.isArray(result) && result.length > 0 ? result[0] : null;

        if (user) {
          setProfile(user);
        } else {
          setProfile(null);
          setError("Profile not found");
        }
      } catch (err) {
        console.error("Error fetching profile", err);
        setError("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
};
