import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {PortableText} from "next-sanity";
import {getDictionary} from "@/i18n/dictionaries";
import {getLocale} from "@/i18n/server";
import {getContentPage} from "@/sanity/lib/content";

type Props = {params: Promise<{slug: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const locale = await getLocale();
  const page = await getContentPage(slug, locale);
  return page
    ? {title: page.seoTitle || page.title, description: page.seoDescription || page.intro}
    : {};
}

export default async function ContentPage({params}: Props) {
  const {slug} = await params;
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const page = await getContentPage(slug, locale);
  if (!page) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <Link href="/" className="text-sm font-bold text-coral">{dict.pages.back}</Link>
      {page.eyebrow ? (
        <p className="mt-12 text-xs font-bold uppercase tracking-[.18em] text-sage">
          {page.eyebrow}
        </p>
      ) : null}
      <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{page.title}</h1>
      {page.intro ? (
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-stone-600">{page.intro}</p>
      ) : null}
      {page.body?.length ? (
        <div className="mt-12 space-y-6 text-lg leading-relaxed text-stone-700">
          <PortableText
            value={page.body}
            components={{
              block: {
                h2: ({children}) => <h2 className="pt-4 font-display text-3xl font-bold text-charcoal">{children}</h2>,
                h3: ({children}) => <h3 className="pt-3 font-display text-2xl font-bold text-charcoal">{children}</h3>,
                normal: ({children}) => <p>{children}</p>,
              },
              list: {
                bullet: ({children}) => <ul className="list-disc space-y-2 pl-6">{children}</ul>,
                number: ({children}) => <ol className="list-decimal space-y-2 pl-6">{children}</ol>,
              },
              types: {
                infoBox: ({value}) => {
                  const info = value as {title?: string; text?: string};
                  return (
                    <aside className="rounded-2xl bg-[#eef3ec] p-6 ring-1 ring-sage/20">
                      <h3 className="font-display text-xl font-bold text-charcoal">{info.title}</h3>
                      <p className="mt-2 text-base text-stone-700">{info.text}</p>
                    </aside>
                  );
                },
                image: ({value}) => {
                  const image = value as {url?: string; alt?: string};
                  return image.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image.url} alt={image.alt || ""} className="my-8 w-full rounded-3xl" />
                  ) : null;
                },
              },
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
