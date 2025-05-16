import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { getSession, signOut } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Authentifizierungsprüfung (wird auf dem Server ausgeführt)
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login", // eigene Login-Seite
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
}

export default function Home({ user }) {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/FitnessTrackerLogo.png"
          alt="Logo"
          width={300}
          height={100}
          priority
        />

        <p className="text-sm">Willkommen, {user.name}</p>

        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Check in: Mach den Check in und erstelle einen neuen Eintrag für heute
          </li>
          <li className="mb-2 tracking-[-.01em]">
            Daten: Schau dir deine Daten in einer Tabelle an und lösche Einträge
          </li>
          <li className="mb-2 tracking-[-.01em]">
            Dashboard: Schau dir deinen Fortschritt in einem Diagramm an
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/Check_in"
          >
            <Image
              className="dark:invert"
              src="/Waage.png"
              alt="Waage"
              width={20}
              height={20}
            />
            Check in
          </a>

          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/daten"
          >
            <Image
              className="dark:invert"
              src="/Daten.png"
              alt="Daten"
              width={20}
              height={20}
            />
            Daten
          </a>

          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/dashboard"
          >
            <Image
              className="dark:invert"
              src="/Dashboard.png"
              alt="Trend"
              width={20}
              height={20}
            />
            Dashboard
          </a>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-8 text-sm underline hover:text-red-500"
        >
          Logout
        </button>
      </main>
    </div>
  );
}
