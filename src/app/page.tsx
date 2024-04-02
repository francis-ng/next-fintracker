import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href='https://makerkit.dev/blog/tutorials/nextjs13' />
      <Link href='https://makerkit.dev/blog/tutorials/nextjs-server-actions' />
      <Link href='https://nextjs.org/learn/dashboard-app' />
      <Link href='https://javascript.plainenglish.io/complete-authentication-guide-using-next-auth-v5-in-next-js-14-70e7630ab1c2' />
    </main>
  );
}
