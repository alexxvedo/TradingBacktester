"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";

export default function AvatarComponent({ url, size, username, open }) {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState(url);

  useEffect(() => {
    async function downloadImage(path) {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);
        if (error) {
          throw error;
        }
        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  return (
    <div className="flex items-center">
      {avatarUrl ? (
        open ? (
          <User
            name={username}
            avatarProps={{
              src: avatarUrl,
            }}
            size={size}
          />
        ) : (
          <div>
            <Avatar isBordered color="default" src={avatarUrl} isFocusable />
          </div>
        )
      ) : (
        <User />
      )}
    </div>
  );
}
