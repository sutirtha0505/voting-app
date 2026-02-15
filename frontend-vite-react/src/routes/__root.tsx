import { createRootRoute, Outlet } from '@tanstack/react-router';
import * as pino from "pino";
import { ThemeProvider } from "@/components/theme-provider";
import { MidnightMeshProvider } from "@/modules/midnight/wallet-widget/contexts/wallet";
import { BrowserOrganDonorProvider } from "@/modules/midnight/organ-donor-sdk/contexts/BrowserOrganDonorProvider";
import { MainLayout } from "@/layouts/layout";

export const logger = pino.pino({
  level: "trace",
});

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <MidnightMeshProvider logger={logger}>
        <BrowserOrganDonorProvider>
          <MainLayout>
            <Outlet />
          </MainLayout>          
        </BrowserOrganDonorProvider>
      </MidnightMeshProvider>
    </ThemeProvider>
  );
}
