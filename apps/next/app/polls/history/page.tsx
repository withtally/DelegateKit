import { Poll } from "@/app/polls/new/types";
import { kv } from "@vercel/kv";
import dynamic from "next/dynamic";
const AllMyPollsNoSSR = dynamic(() => import("./AllMyPolls"), { ssr: false });

async function getPolls() {
  try {
    const pollIds = await kv.zrange("polls_by_date", 0, 9999, {
      // byScore: true,
      rev: true,
      count: 100,
      offset: 0,
    });

    if (!pollIds.length) {
      return [];
    }

    const multi = kv.multi();
    pollIds.forEach((id) => {
      multi.hgetall(`poll:${id}`);
    });

    const items: Poll[] = await multi.exec();
    return items.map((item) => {
      return { ...item };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Page() {
  const polls = await getPolls();

  return (
    <div className="flex flex-col items-center justify-center min-h-80 py-2">
      <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-lg sm:text-2xl font-bold mb-2">
          Created Polls ({polls.length})
        </h1>
        <AllMyPollsNoSSR polls={polls} />
      </main>
    </div>
  );
}
