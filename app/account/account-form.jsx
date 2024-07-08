"use client";
import { useCallback, useEffect, useState } from "react";
import AvatarComponent from "./avatarComponent";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function AccountForm({ user }) {
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [avatar_url, setAvatarUrl] = useState("");

  return (
    <div className="flex flex-col min-w-[20%] min-h-full justify-center gap-8 items-center p-12 bg-zinc-900 rounded-2xl">
      <div className="form-widget flex flex-col gap-8 items-center justify-center w-full ">
        <AvatarComponent
          uid={user?.id}
          url={avatar_url}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url);
            updateProfile({ fullname, username, avatar_url });
          }}
        />
        <div>
          <Input
            id="email"
            label="Email"
            name="email"
            type="email"
            value={user?.email}
            disabled
          />
        </div>
        <div>
          <Input
            label="Full Name"
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>
        <div>
          <Input
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="min-w-full flex ">
        <Button
          color="secondary"
          onClick={() => updateProfile({ fullname, username, avatar_url })}
          disabled={loading}
          className="min-w-full"
        >
          {loading ? "Loading ..." : "Update"}
        </Button>
      </div>

      <div className="min-w-full flex ">
        <Link href="/sesiones" className="min-w-full">
          <Button className="min-w-full" color="success">
            Ir a sesiones
          </Button>
        </Link>
      </div>
    </div>
  );
}
