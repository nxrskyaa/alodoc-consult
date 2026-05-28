import { PassportCard } from "@/components/PassportCard";

export default function PassportPage() {
  return (
    <div className="grid gap-6">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-black leading-tight text-cocoa sm:text-5xl">Health Literacy Passport</h1>
        <p className="mt-4 text-lg font-semibold leading-8 text-cocoaSoft">Build your public learning identity without collecting private medical data.</p>
      </div>
      <PassportCard />
    </div>
  );
}
