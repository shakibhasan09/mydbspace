import "@web/assets/css/tailwind.css";

import { createRouter, RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "@web/providers/theme";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Import the generated route tree
import { routeTree } from "@web/routeTree.gen";

const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
