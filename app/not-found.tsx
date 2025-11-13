import type { Metadata } from "next";
import NotFoundClient from "./NotFount.client";

export const metadata: Metadata = {
  title: "404 - Page not found",
  description:
    "Sorry, the page you are looking for doesn't exist. It may have been removed or never existed.",
  openGraph: {
    title: "404 - Page not found",
    description:
      "This page doesn't exist or has been deleted. Go back to the homepage.",
    url: "https://vercel.com/eddniks-projects/08-zustand/404",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Page not found",
      },
    ],
  },
};

function NotFound() {
  return (
    <>
      <NotFoundClient />
    </>
  );
}

export default NotFound;
