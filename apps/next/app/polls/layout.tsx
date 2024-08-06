import dynamic from "next/dynamic";

const PollHeaderNoSSR = dynamic(
  () => import("../components/polls/PollHeader"),
  { ssr: false },
);
export default function PollsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PollHeaderNoSSR />
      {children}
    </div>
  );
}
