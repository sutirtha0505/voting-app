import { createRootRoute, Outlet } from '@tanstack/react-router';
import * as pino from "pino";
import { ThemeProvider } from "@/components/theme-provider";
import { MidnightMeshProvider } from "@/modules/midnight/wallet-widget/contexts/wallet";

import { MainLayout } from "@/layouts/layout";

export const logger = pino.pino({
  level: "trace",
});

import { BrowserVotingProvider } from "@/modules/midnight/voting-sdk/contexts/BrowserVotingProvider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <MidnightMeshProvider logger={logger}>
        <BrowserVotingProvider>
          <MainLayout>
            <Outlet />
          </MainLayout>          
        </BrowserVotingProvider>
      </MidnightMeshProvider>
    </ThemeProvider>
  );
}
