import { Home } from "./homepage/homepage";

export const metadata = {
  title: "DelegateKit",
  description: "Frames simplified",
};

export default async function Page() {
  return (
    // <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-20 text-center">
    <main>
      <Home />
    </main>
  );
}
