import React from "react";
import { TalksBreadcrumb } from "~/components/TalksBreadcrumb";
import { Outlet } from "@remix-run/react";

export default function Talks() {
  return (
    <div>
      <TalksBreadcrumb />
      <Outlet />
    </div>
  );
}
