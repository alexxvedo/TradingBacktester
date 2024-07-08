"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";

import { useAuth } from "@clerk/nextjs";
import SesionCard from "@/components/Sesiones/SesionCard";

import CreateSessionPopup from "@/components/Sesiones/CreateSesionPopup";

export default function Sesiones() {
  const { isLoaded, userId } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Agregar estado de carga
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [accountSize, setAccountSize] = useState("100000");
  const router = useRouter(); // Usar useRouter en un componente de cliente

  useEffect(() => {
    if (userId) fetchSessions();
  }, [userId]);

  if (!isLoaded || !userId) {
    return null;
  }

  const fetchSessions = async () => {
    try {
      const res = await fetch("/api/sessions");
      const data = await res.json();
      if (res.status === 401) {
        console.log(data.error);
        signOut(); // Cerrar sesión si no está autorizado
      }
      //console.log(data);
      setSessions(data);
      setIsLoading(false); // Cambiar estado de carga
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          accountSize,
        }),
      });

      if (res.ok) {
        const newSession = await res.json();
        setTitle("");
        setDescription("");
        setIsOpen(false);
        router.push(`/sesiones/${newSession.id}`); // Redirige a la nueva sesión
      } else {
        console.log(res);
        console.error("Failed to create session", res.error);
      }
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  const handleAccountSizeChange = (e) => {
    setAccountSize(e.target.value);
  };

  return (
    <main className="flex w-full h-full flex-col p-4">
      <div className="min-h-[5%] w-full flex justify-between items-center">
        <h2 className="text-2xl font-bold">Sesiones</h2>
        <Button onClick={() => setIsOpen(true)}>Nueva +</Button>
      </div>
      <hr className="my-4 w-full" />

      {isOpen && (
        <CreateSessionPopup onClose={() => setIsOpen(false)}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
            <h3 className="text-xl font-bold">Nueva Sesión</h3>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
              className="p-2 border rounded text-black"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
              className="p-2 border rounded text-black"
            />
            <select
              id="account_size"
              value={accountSize}
              onChange={handleAccountSizeChange}
              className="flex items-center justify-center w-full text-black"
            >
              <option className="flex items-center justify-center" value="5000">
                5000€
              </option>
              <option value="10000">10000€</option>
              <option value="20000">20000€</option>
              <option value="50000">50000€</option>
              <option value="100000">100000€</option>
              <option value="150000">150000€</option>
              <option value="200000">200000#</option>
            </select>
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                onClick={() => setIsOpen(false)}
                color="error"
              >
                Cancelar
              </Button>
              <Button type="submit">Agregar Sesión</Button>
            </div>
          </form>
        </CreateSessionPopup>
      )}
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="border-4 border-t-transparent border-grey-500 w-4 h-4 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="w-full h-full grid grid-cols-3 gap-4">
          {sessions.length > 0 ? (
            sessions.map((session, index) => (
              <SesionCard key={index} sesion={session} />
            ))
          ) : (
            <p>No sessions found</p>
          )}
        </div>
      )}
    </main>
  );
}
