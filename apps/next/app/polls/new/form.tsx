"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useOptimistic, useRef, useState, useTransition } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../../components/Button";
import PlusIcon from "./PlusIcon";
import { redirectToPolls, savePoll, votePoll } from "./actions";
import { Poll } from "./types";

type PollState = {
  newPoll: Poll;
  updatedPoll?: Poll;
  pending: boolean;
  voted?: boolean;
};

export function PollCreateForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, mutate] = useOptimistic(
    { pending: false },
    function createReducer(_, newPoll: PollState) {
      if (newPoll.newPoll) {
        return {
          pending: newPoll.pending,
        };
      } else {
        return {
          pending: newPoll.pending,
        };
      }
    },
  );

  const pollStub = {
    id: uuidv4(),
    created_at: new Date().getTime(),
    title: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    votes1: 0,
    votes2: 0,
    votes3: 0,
    votes4: 0,
  };
  const saveWithNewPoll = savePoll.bind(null, pollStub);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <div className="mx-8 w-full">
        <form
          className="relative my-8"
          ref={formRef}
          action={saveWithNewPoll}
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const newPoll = {
              ...pollStub,
              title: formData.get("title") as string,
              option1: formData.get("option1") as string,
              option2: formData.get("option2") as string,
              option3: formData.get("option3") as string,
              option4: formData.get("option4") as string,
              votes1: 0,
              votes2: 0,
              votes3: 0,
              votes4: 0,
            };

            formRef.current?.reset();
            startTransition(async () => {
              mutate({
                newPoll,
                pending: true,
              });

              await savePoll(newPoll, formData);
            });
          }}
        >
          <input
            aria-label="Poll Title"
            className="pl-3 pr-28 py-3 mt-1 text-lg block w-full border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
            maxLength={150}
            placeholder="Poll Title"
            required
            type="text"
            name="title"
          />
          <input
            aria-label="Option 1"
            className="pl-3 pr-28 py-3 mt-1 text-lg block w-full border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
            maxLength={150}
            placeholder="Option 1"
            required
            type="text"
            name="option1"
          />
          <input
            aria-label="Option 2"
            className="pl-3 pr-28 py-3 mt-1 text-lg block w-full border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
            maxLength={150}
            placeholder="Option 2"
            required
            type="text"
            name="option2"
          />
          <input
            aria-label="Option 3"
            className="pl-3 pr-28 py-3 mt-1 text-lg block w-full border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
            maxLength={150}
            placeholder="Option 3 (optional)"
            type="text"
            name="option3"
          />
          <input
            aria-label="Option 4"
            className="pl-3 pr-28 py-3 mt-1 text-lg block w-full border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300 mb-4"
            maxLength={150}
            placeholder="Option 4 (optional)"
            type="text"
            name="option4"
          />
          <Button
            type="submit"
            disabled={state.pending}
            customClasses={[
              "w-full",
              "flex",
              "justify-center",
              "items-center",
              "gap-2",
            ]}
          >
            <PlusIcon />
            Create Poll
          </Button>
        </form>
      </div>
      <div className="w-full"></div>
    </>
  );
}

function PollOptions({
  poll,
  onChange,
}: {
  poll: Poll;
  onChange: (index: number) => void;
}) {
  return (
    <div className="mb-4 text-left">
      {[poll.option1, poll.option2, poll.option3, poll.option4]
        .filter((e) => e !== "")
        .map((option, index) => (
          <label key={index} className="block">
            <input
              type="radio"
              name="poll"
              value={option}
              onChange={() => onChange(index + 1)}
              className="mr-2"
            />
            {option}
          </label>
        ))}
    </div>
  );
}

function PollResults({ poll }: { poll: Poll }) {
  return (
    <div className="mb-4">
      <img
        src={`/api/polls/image?id=${poll.id}&results=true&date=${Date.now()}`}
        alt="poll results"
      />
    </div>
  );
}

export function PollVoteForm({
  poll,
  viewResults,
}: {
  poll: Poll;
  viewResults?: boolean;
}) {
  const [selectedOption, setSelectedOption] = useState(-1);
  const router = useRouter();
  const searchParams = useSearchParams();
  viewResults = true; // Only allow voting via the api
  const formRef = useRef<HTMLFormElement>(null);
  const voteOnPoll = votePoll.bind(null, poll);
  const [isPending, startTransition] = useTransition();
  const [state, mutate] = useOptimistic(
    { showResults: viewResults },
    function createReducer({ showResults }, pollState: PollState) {
      if (pollState.voted || viewResults) {
        return {
          showResults: true,
        };
      } else {
        return {
          showResults: false,
        };
      }
    },
  );

  const handleVote = (index: number) => {
    setSelectedOption(index);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 m-4">
      <div className="font-bold text-xl mb-2">{poll.title}</div>
      <form
        className="relative my-8"
        ref={formRef}
        action={() => voteOnPoll(selectedOption)}
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const newPoll = {
            ...poll,
          };

          // @ts-ignore
          newPoll[`votes${selectedOption}`] += 1;

          formRef.current?.reset();
          startTransition(async () => {
            mutate({
              newPoll,
              pending: false,
              voted: true,
            });

            await redirectToPolls();
            // await votePoll(newPoll, selectedOption);
          });
        }}
      >
        {state.showResults ? (
          <PollResults poll={poll} />
        ) : (
          <PollOptions poll={poll} onChange={handleVote} />
        )}
        {state.showResults ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Back
          </button>
        ) : (
          <button
            className={
              "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" +
              (selectedOption < 1 ? " cursor-not-allowed" : "")
            }
            type="submit"
            disabled={selectedOption < 1}
          >
            Vote
          </button>
        )}
      </form>
    </div>
  );
}
