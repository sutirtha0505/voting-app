import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

import { BrowserOrganDonorProvider } from "@/modules/midnight/organ-donor-sdk/contexts/BrowserOrganDonorProvider";
import { OrganDonorApp } from "@/components/OrganDonorApp";

function App() {
  return (
    <BrowserOrganDonorProvider>
      <OrganDonorApp />
    </BrowserOrganDonorProvider>
  );
}

export default App;
