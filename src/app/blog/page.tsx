import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {BookOpen} from "lucide-react";
import {getDictionary} from "@/i18n/dictionaries";
import {getLocale} from "@/i18n/server";
import {getBlogPosts} from "@/sanity/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  return {title: dict.blog.title, description: dict.blog.intro, alternates: {canonical: "/blog"}};
}

export default async function BlogPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const posts = await getBlogPosts(locale);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[.2em] text-coral">{dict.blog.eyebrow}</p><h1 className="mt-4 font-display text-4xl font-medium text-charcoal sm:text-6xl">{dict.blog.title}</h1><p className="mt-5 text-lg leading-relaxed text-stone-600">{dict.blog.intro}</p></header>
      {posts.length ? (
        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => <article key={post.slug} className="group overflow-hidden border-b border-stone-200 bg-white pb-5">
            {post.coverImage && <Link href={`/blog/${post.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-stone-100"><Image src={post.coverImage} alt={post.coverImageAlt || post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" /></Link>}
            <div className="pt-6"><time className="text-xs font-semibold uppercase tracking-wider text-stone-400" dateTime={post.publishedAt}>{new Intl.DateTimeFormat(locale === "pl" ? "pl-PL" : "en-GB", {dateStyle: "medium"}).format(new Date(post.publishedAt))}</time><h2 className="mt-3 font-display text-2xl font-medium text-charcoal"><Link href={`/blog/${post.slug}`} className="hover:text-coral">{post.title}</Link></h2>{post.excerpt && <p className="mt-3 leading-relaxed text-stone-600">{post.excerpt}</p>}<Link href={`/blog/${post.slug}`} className="mt-5 inline-block font-semibold text-coral">{dict.blog.read} →</Link></div>
          </article>)}
        </div>
      ) : (
        <div className="mt-12 border-y border-stone-300 bg-[#f7f5ef] px-6 py-16 text-center"><BookOpen className="mx-auto h-10 w-10 text-coral" /><h2 className="mt-5 font-display text-2xl font-medium text-charcoal">{dict.blog.emptyTitle}</h2><p className="mx-auto mt-3 max-w-lg text-stone-600">{dict.blog.emptyText}</p></div>
      )}
    </div>
  );
}
