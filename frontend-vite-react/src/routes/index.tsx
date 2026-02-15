import { deactivateDonor } from "@/modules/midnight/organ-donor-sdk/api";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = deactivateDonor(deactivateDonor)({
  beforeLoad: () => {
    throw redirect({
      to: "/voting",
    });
  },
});
