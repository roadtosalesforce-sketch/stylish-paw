import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {PortableText} from "next-sanity";
import {getDictionary} from "@/i18n/dictionaries";
import {getLocale} from "@/i18n/server";
import {getBlogPost} from "@/sanity/lib/content";

type Props = {params: Promise<{slug: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const locale = await getLocale();
  const post = await getBlogPost(slug, locale);
  return post ? {title: post.seoTitle || post.title, description: post.seoDescription || post.excerpt, alternates: {canonical: `/blog/${slug}`}} : {};
}

export default async function BlogPostPage({params}: Props) {
  const {slug} = await params;
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const post = await getBlogPost(slug, locale);
  if (!post) notFound();

  return (
    <article className="pb-20">
      <header className="mx-auto max-w-4xl px-4 pb-10 pt-16 sm:px-6"><Link href="/blog" className="text-sm font-semibold text-coral">{dict.blog.back}</Link><time className="mt-10 block text-xs font-semibold uppercase tracking-[.18em] text-stone-400" dateTime={post.publishedAt}>{new Intl.DateTimeFormat(locale === "pl" ? "pl-PL" : "en-GB", {dateStyle: "long"}).format(new Date(post.publishedAt))}</time><h1 className="mt-4 font-display text-4xl font-medium leading-tight text-charcoal sm:text-6xl">{post.title}</h1>{post.excerpt && <p className="mt-6 max-w-3xl text-xl leading-relaxed text-stone-600">{post.excerpt}</p>}</header>
      {post.coverImage && <div className="relative mx-auto aspect-[16/8] max-w-6xl overflow-hidden bg-stone-100"><Image src={post.coverImage} alt={post.coverImageAlt || post.title} fill sizes="100vw" className="object-cover" priority /></div>}
      {post.body?.length ? <div className="mx-auto mt-12 max-w-3xl space-y-6 px-4 text-lg leading-relaxed text-stone-700 sm:px-6"><PortableText value={post.body} components={{block: {h2: ({children}) => <h2 className="pt-6 font-display text-3xl font-medium text-charcoal">{children}</h2>, h3: ({children}) => <h3 className="pt-4 font-display text-2xl font-medium text-charcoal">{children}</h3>, normal: ({children}) => <p>{children}</p>}, list: {bullet: ({children}) => <ul className="list-disc space-y-2 pl-6">{children}</ul>, number: ({children}) => <ol className="list-decimal space-y-2 pl-6">{children}</ol>}, types: {image: ({value}) => {const image = value as {url?: string; alt?: string}; return image.url ? <Image src={image.url} alt={image.alt || ""} width={1200} height={900} className="my-9 h-auto w-full" /> : null;}}}} /></div> : null}
    </article>
  );
}
