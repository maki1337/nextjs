export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard(.*)",
    "/properties/add",
    "/profile",
    "/properties/saved",
    "/messages",
  ],
};
