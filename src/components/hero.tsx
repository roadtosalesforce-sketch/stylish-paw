"use client";

import Link from "next/link";
import {ArrowRight, ChevronLeft, ChevronRight, Pause, Play} from "lucide-react";
import {useEffect, useMemo, useState} from "react";
import type {Dictionary} from "@/i18n/dictionaries";
import type {HeroSlide, HomepageContent} from "@/sanity/lib/content";

type HeroProps = {
  content?: HomepageContent["hero"];
  slides?: HeroSlide[];
  dict: Dictionary;
};

const fallbackImages = [
  "https://images.unsplash.com/photo-1650454027983-e2b8fe55b30b?auto=format&fit=crop&w=1800&q=88",
  "https://images.unsplash.com/photo-1675613714850-fd2cba4c6deb?auto=format&fit=crop&w=1800&q=88",
  "https://images.unsplash.com/photo-1527149535940-240e6deec1fe?auto=format&fit=crop&w=1800&q=88",
];

export function Hero({content, slides, dict}: HeroProps) {
  const items = useMemo<HeroSlide[]>(() => {
    const publishedSlides = slides?.filter((slide) => slide.active !== false && slide.image);
    if (publishedSlides?.length) return publishedSlides;

    return dict.hero.fallbackSlides.map((slide, index) => ({
      _key: `fallback-${index}`,
      eyebrow: index === 0 ? content?.eyebrow || dict.hero.eyebrow : slide.eyebrow,
      title: index === 0 ? content?.title || dict.hero.title : slide.title,
      text: index === 0 ? content?.text || dict.hero.text : slide.text,
      image: index === 0 ? content?.image || fallbackImages[index] : fallbackImages[index],
      imageAlt: slide.imageAlt,
      primaryLabel: index === 0 ? content?.primaryLabel || dict.hero.primary : slide.primaryLabel,
      primaryLink: index === 0 ? content?.primaryLink || "/shop?category=new" : slide.primaryLink,
      secondaryLabel: index === 0 ? content?.secondaryLabel || dict.hero.secondary : slide.secondaryLabel,
      secondaryLink: index === 0 ? content?.secondaryLink || "/pages/size-guide" : slide.secondaryLink,
      showText: true,
      textPosition: index === 1 ? "right" : "left",
    }));
  }, [content, dict, slides]);

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const multipleSlides = items.length > 1;

  useEffect(() => {
    if (!multipleSlides || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setCurrent((index) => (index + 1) % items.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [items.length, multipleSlides, paused]);

  function selectSlide(index: number) {
    setCurrent((index + items.length) % items.length);
  }

  return (
    <section
      className="group relative isolate h-[66svh] min-h-[520px] max-h-[760px] overflow-hidden bg-stone-100"
      aria-roledescription="carousel"
      aria-label={dict.hero.carouselLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {!items.some((slide) => slide.showText === true && slide.title) && (
        <h1 className="sr-only">{dict.meta.title}</h1>
      )}
      {items.map((slide, index) => {
        const active = index === current;
        const showText = slide.showText === true && Boolean(slide.title);
        const alignRight = slide.textPosition === "right";

        return (
          <article
            key={slide._key}
            className={`absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none ${active ? "z-10 opacity-100" : "opacity-0"}`}
            aria-hidden={!active}
          >
            <picture>
              {slide.mobileImage && <source media="(max-width: 639px)" srcSet={slide.mobileImage} />}
              <img
                src={slide.image}
                alt={slide.imageAlt || dict.hero.imageAlt}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </picture>

            {showText && (
              <div className="relative mx-auto flex h-full max-w-7xl items-end px-5 pb-16 pt-16 sm:px-8 lg:px-12">
                  <div className={`max-w-xl bg-[#f5f1e7]/95 p-7 text-charcoal shadow-sm sm:p-9 ${alignRight ? "ml-auto" : ""}`}>
                    {slide.eyebrow && (
                      <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-sage-dark">{slide.eyebrow}</p>
                    )}
                    <h1 className="text-4xl font-medium uppercase leading-[1.04] tracking-[.055em] sm:text-6xl">{slide.title}</h1>
                    {slide.text && <p className="mt-5 max-w-lg text-base leading-relaxed text-stone-700 sm:text-lg">{slide.text}</p>}
                    <div className="mt-7 flex flex-wrap gap-3">
                      {slide.primaryLabel && slide.primaryLink && (
                        <Link href={slide.primaryLink} tabIndex={active ? 0 : -1} className="inline-flex items-center bg-charcoal px-7 py-3.5 text-xs font-semibold uppercase tracking-[.12em] text-white transition hover:bg-coral-dark">
                          {slide.primaryLabel} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      )}
                      {slide.secondaryLabel && slide.secondaryLink && (
                        <Link href={slide.secondaryLink} tabIndex={active ? 0 : -1} className="inline-flex items-center border border-charcoal/40 bg-transparent px-7 py-3.5 text-xs font-semibold uppercase tracking-[.12em] text-charcoal transition hover:border-charcoal">
                          {slide.secondaryLabel}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
            )}
          </article>
        );
      })}

      {multipleSlides && (
        <>
          <button
            type="button"
            onClick={() => selectSlide(current - 1)}
            className="absolute left-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-black/20 text-white opacity-90 backdrop-blur-md transition hover:bg-white hover:text-charcoal sm:left-6"
            aria-label={dict.hero.previousSlide}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => selectSlide(current + 1)}
            className="absolute right-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-black/20 text-white opacity-90 backdrop-blur-md transition hover:bg-white hover:text-charcoal sm:right-6"
            aria-label={dict.hero.nextSlide}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute inset-x-0 bottom-5 z-20 flex items-center justify-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-black/25 px-3 py-2 backdrop-blur-md">
              {items.map((slide, index) => (
                <button
                  key={slide._key}
                  type="button"
                  onClick={() => selectSlide(index)}
                  className={`h-1.5 rounded-full transition-all ${index === current ? "w-8 bg-white" : "w-3 bg-white/50 hover:bg-white/80"}`}
                  aria-label={`${dict.hero.goToSlide} ${index + 1}`}
                  aria-current={index === current ? "true" : undefined}
                />
              ))}
              <button
                type="button"
                onClick={() => setPaused((value) => !value)}
                className="ml-1 grid h-6 w-6 place-items-center rounded-full text-white/85 transition hover:bg-white/15 hover:text-white"
                aria-label={paused ? dict.hero.playSlides : dict.hero.pauseSlides}
              >
                {paused ? <Play className="h-3 w-3 fill-current" /> : <Pause className="h-3 w-3 fill-current" />}
              </button>
            </div>
          </div>
        </>
      )}

      <p className="sr-only" aria-live="polite">
        {current + 1} / {items.length}: {items[current]?.title || items[current]?.imageAlt}
      </p>
    </section>
  );
}
