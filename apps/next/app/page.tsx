import { Home } from "./homepage/homepage";

export const metadata = {
  title: "DelegateKit",
  description: "Frames simplified",
};

export default async function Page() {
  return (
    <main>
      <Home />
    </main>
  );
}
