"use client";
import React, { useEffect, useState } from "react";
import { User, user } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";

export default function AvatarComponent({ url, size, username, open }) {
  const [avatarUrl, setAvatarUrl] = useState(url);

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
