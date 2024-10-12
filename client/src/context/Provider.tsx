"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

export default function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
      >
        <QueryClientProvider client={queryClient}>
          <div>
            <Toaster />
          </div>

          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </>
  );
}
