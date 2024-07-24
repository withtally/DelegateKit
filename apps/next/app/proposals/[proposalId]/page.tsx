import Frame from "./Frame";

export default async function Page(req: { params: { proposalId: string } }) {
  const { proposalId } = req.params;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center flex-1 px-4 sm:px-20 text-center">
        <div className="p-8">
          <Frame proposalId={proposalId} />
        </div>
      </main>
    </div>
  );
}
