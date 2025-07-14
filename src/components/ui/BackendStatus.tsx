"use client";

import React, { useEffect, useState } from "react";
import { env } from "@/config/env";

interface BackendStatusProps {
  className?: string;
}

export default function BackendStatus({ className = "" }: BackendStatusProps) {
  const [status, setStatus] = useState<"checking" | "online" | "offline">("checking");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        setStatus("checking");
        setError(null);

        // Usar el proxy GraphQL para evitar problemas de CORS
        const graphqlUrl = typeof window !== 'undefined' ? '/api/graphql' : env.GRAPHQL_URL;
        
        const response = await fetch(graphqlUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `{ __typename }`,
          }),
        });

        if (response.ok) {
          setStatus("online");
        } else {
          setStatus("offline");
          setError(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        setStatus("offline");
        setError(error instanceof Error ? error.message : "Error de conexión");
      }
    };

    checkBackendStatus();
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case "online":
        return "text-green-500";
      case "offline":
        return "text-red-500";
      default:
        return "text-yellow-500";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "online":
        return "Backend Conectado";
      case "offline":
        return "Backend Desconectado";
      default:
        return "Verificando...";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "online":
        return "🟢";
      case "offline":
        return "🔴";
      default:
        return "🟡";
    }
  };

  return (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      <span className={getStatusColor()}>
        {getStatusIcon()} {getStatusText()}
      </span>
      {error && status === "offline" && (
        <span className="text-xs text-gray-400">({error})</span>
      )}
    </div>
  );
} 