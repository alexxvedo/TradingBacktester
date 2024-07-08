"use client";
import React, { useEffect, useState } from "react";
import { User, user } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";

export default function AvatarComponent({ url, size, username, open }) {
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
        console.log(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) downloadImage(url);
  }, [url]);

  return (
    <div className="flex items-center">
      {open ? (
        <User
          name={username}
          avatarProps={{
            src: avatarUrl,
          }}
          size={size}
        />
      ) : (
        <Avatar src={avatarUrl} name={username} size={size} />
      )}
    </div>
  );
}
