import { PollHeader } from "../components/polls/PollHeader";

export default function PollsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PollHeader />
      {children}
    </div>
  );
}
