import { LeaderboardTable } from "@/components/LeaderboardTable";

export default function LeaderboardPage() {
  return (
    <div className="grid gap-6">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-black leading-tight text-cocoa">Leaderboard</h1>
        <p className="mt-4 text-lg font-semibold leading-8 text-cocoaSoft">Learners are ranked by XP from onchain health-literacy quest progress.</p>
      </div>
      <LeaderboardTable />
    </div>
  );
}
