import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>Home page</div>
      <Link href="/properties"> Go to properties</Link>
    </div>
  );
}
