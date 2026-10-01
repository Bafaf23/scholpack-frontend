import Link from "next/link";

export default function Profile({ user }) {
  const fullName = `${user?.name} ${user?.last_name}`;
  return (
    <div className="flex items-center gap-2 cursor-default">
      {/* avatar */}
      <Link href="/dashboard/profile">
        <div className="w-10 h-10 p-2 rounded-full overflow-hidden flex items-center justify-center bg-cyan-600">
          <span className="text-xl font-bold text-white">
            {user?.name.charAt(0)}
          </span>
        </div>
      </Link>

      <div className="flex flex-col tracking-wide">
        <Link href="/dashboard/profile">
          <span className="md:text-md text-md font-medium text-zinc-90 tracking-tight dark:text-zinc-300">
            {fullName}
          </span>
        </Link>

        <p className="text-xs text-slate-500 dark:text-zinc-400">
          {user?.role}
        </p>
      </div>
    </div>
  );
}
