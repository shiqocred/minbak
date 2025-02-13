import { Navbar } from "@/components/navbar";
import { HomeClient } from "./client";

export default function Home() {
  return (
    <div className="w-screen h-full bg-gray-50 dark:bg-gray-900 relative">
      <Navbar />
      <HomeClient />
    </div>
  );
}
