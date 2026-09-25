import {getCliClient} from "sanity/cli";

const client = getCliClient({apiVersion: "2026-08-13"});
const dryRun = process.argv.includes("--dry-run");

type CategorySeed = {
  _id: string;
  _type: "category";
  title: string;
  slug: {_type: "slug"; current: string};
  [key: string]: unknown;
};

const categories: CategorySeed[] = [
  {
    _id: "category-clothing",
    _type: "category",
    title: "Clothing",
    titlePl: "Ubrania",
    slug: {_type: "slug", current: "clothing"},
    eyebrow: "Comfort in every season",
    eyebrowPl: "Wygoda na każdą porę",
    heroTitle: "Clothing made for real life with pets",
    heroTitlePl: "Ubrania stworzone do prawdziwego życia z pupilem",
    heroText: "Thoughtful layers and playful pieces selected for comfort, movement and everyday adventures.",
    heroTextPl: "Przemyślane warstwy i pełne charakteru modele wybrane z myślą o wygodzie, ruchu i codziennych przygodach.",
    storyTitle: "Comfort comes first",
    storyTitlePl: "Komfort jest najważniejszy",
    storyText: "Clear sizing and practical details help every piece feel as good as it looks.",
    storyTextPl: "Czytelne rozmiary i praktyczne detale sprawiają, że każdy model wygląda dobrze i pozostaje wygodny.",
    seoTitle: "Pet Clothing",
    seoTitlePl: "Ubrania dla zwierząt",
    seoDescription: "Comfort-led clothing for dogs and cats from Furry Fairy Pets.",
    seoDescriptionPl: "Wygodne ubrania dla psów i kotów od Furry Fairy Pets.",
    sortOrder: 10,
  },
  {
    _id: "category-collars-leashes",
    _type: "category",
    title: "Collars & Leashes",
    titlePl: "Obroże i smycze",
    slug: {_type: "slug", current: "collars-leashes"},
    eyebrow: "Walk beautifully",
    eyebrowPl: "Piękne spacery",
    heroTitle: "Everyday walk essentials with personality",
    heroTitlePl: "Codzienne akcesoria spacerowe z charakterem",
    heroText: "Decorative collars, reliable leashes and coordinated details for safer, happier walks.",
    heroTextPl: "Dekoracyjne obroże, solidne smycze i dopasowane dodatki na bezpieczniejsze, przyjemniejsze spacery.",
    storyTitle: "Designed for the daily walk",
    storyTitlePl: "Na każdy spacer",
    storyText: "Useful hardware, comfortable materials and expressive design belong together.",
    storyTextPl: "Praktyczne zapięcia, wygodne materiały i wyrazisty design mogą iść w parze.",
    seoTitle: "Pet Collars & Leashes",
    seoTitlePl: "Obroże i smycze",
    seoDescription: "Shop collars and leashes selected for comfort, function and style.",
    seoDescriptionPl: "Obroże i smycze wybrane z myślą o wygodzie, funkcji i stylu.",
    sortOrder: 20,
  },
  {
    _id: "category-essentials",
    _type: "category",
    title: "Essentials",
    titlePl: "Essentials",
    slug: {_type: "slug", current: "essentials"},
    eyebrow: "Less, but better",
    eyebrowPl: "Mniej, ale lepiej",
    heroTitle: "Useful essentials for calmer daily routines",
    heroTitlePl: "Przydatne essentials dla spokojniejszej codzienności",
    heroText: "Toys, feeding accessories and carefully chosen products that make life with pets easier, cleaner and more enjoyable.",
    heroTextPl: "Zabawki, akcesoria do karmienia i starannie wybrane produkty, które ułatwiają i porządkują życie z pupilem.",
    storyTitle: "Only what earns its place",
    storyTitlePl: "Tylko to, co naprawdę potrzebne",
    storyText: "Every essential should solve a real problem without adding unnecessary clutter.",
    storyTextPl: "Każdy produkt powinien rozwiązywać realny problem, nie tworząc zbędnego bałaganu.",
    seoTitle: "Pet Essentials",
    seoTitlePl: "Essentials dla zwierząt",
    seoDescription: "Useful toys, feeding accessories and everyday pet essentials.",
    seoDescriptionPl: "Przydatne zabawki, akcesoria do karmienia i produkty codziennego użytku.",
    sortOrder: 30,
  },
];

const legacyCategoryMap: Record<string, string> = {
  accessories: "category-collars-leashes",
  collars: "category-collars-leashes",
  leashes: "category-collars-leashes",
  costumes: "category-clothing",
  outerwear: "category-clothing",
  raincoats: "category-clothing",
  sweaters: "category-clothing",
  clothing: "category-clothing",
  "collars-leashes": "category-collars-leashes",
  essentials: "category-essentials",
  care: "category-essentials",
  eat: "category-essentials",
  play: "category-essentials",
  rest: "category-essentials",
};

async function main() {
  const products = await client.fetch<Array<{_id: string; categorySlug?: string}>>(
    '*[_type == "product"]{_id, "categorySlug": category->slug.current}',
  );
  const reassignments = products.flatMap((product) => {
    const categoryId = product.categorySlug ? legacyCategoryMap[product.categorySlug] : undefined;
    return categoryId && product.categorySlug !== categories.find((category) => category._id === categoryId)?.slug.current
      ? [{...product, categoryId}]
      : [];
  });

  if (dryRun) {
    console.log(JSON.stringify({categories: categories.map(({_id, title}) => ({_id, title})), reassignments}, null, 2));
    return;
  }

  for (const category of categories) await client.createOrReplace(category);
  for (const product of reassignments) {
    await client.patch(product._id).set({category: {_type: "reference", _ref: product.categoryId}}).commit();
  }

  await client.patch("siteSettings").set({
  announcement: "Less, but better · Free InPost delivery from 149 PLN",
  announcementPl: "Mniej, ale lepiej · Darmowa dostawa InPost od 149 PLN",
  defaultSeoTitle: "Furry Fairy Pets | Thoughtful Pet Essentials",
  defaultSeoTitlePl: "Furry Fairy Pets | Przemyślane essentials",
  defaultSeoDescription: "Thoughtful clothing, walk accessories and useful essentials for happier everyday life with pets.",
  defaultSeoDescriptionPl: "Przemyślane ubrania, akcesoria spacerowe i essentials na szczęśliwszą codzienność z pupilem.",
  footerColumns: [
    {_key: "footer-shop", _type: "object", title: "Shop", links: [
      {_key: "footer-clothing", _type: "object", label: "Clothing", href: "/categories/clothing"},
      {_key: "footer-walk", _type: "object", label: "Collars & Leashes", href: "/categories/collars-leashes"},
      {_key: "footer-essentials", _type: "object", label: "Essentials", href: "/categories/essentials"},
    ]},
    {_key: "footer-help", _type: "object", title: "Help", links: [
      {_key: "footer-size", _type: "object", label: "Size & Fit", href: "/pages/size-guide"},
      {_key: "footer-shipping", _type: "object", label: "Shipping & Returns", href: "/pages/shipping-returns"},
      {_key: "footer-faq", _type: "object", label: "FAQ", href: "/pages/faq"},
    ]},
  ],
  footerColumnsPl: [
    {_key: "footer-shop-pl", _type: "object", title: "Sklep", links: [
      {_key: "footer-clothing-pl", _type: "object", label: "Ubrania", href: "/categories/clothing"},
      {_key: "footer-walk-pl", _type: "object", label: "Obroże i smycze", href: "/categories/collars-leashes"},
      {_key: "footer-essentials-pl", _type: "object", label: "Essentials", href: "/categories/essentials"},
    ]},
    {_key: "footer-help-pl", _type: "object", title: "Pomoc", links: [
      {_key: "footer-size-pl", _type: "object", label: "Rozmiar i dopasowanie", href: "/pages/size-guide"},
      {_key: "footer-shipping-pl", _type: "object", label: "Dostawa i zwroty", href: "/pages/shipping-returns"},
      {_key: "footer-faq-pl", _type: "object", label: "Najczęstsze pytania", href: "/pages/faq"},
    ]},
  ],
  }).setIfMissing({
  eurRate: 0.23,
  loyaltyEnabled: true,
  pointsPerPln: 1,
  welcomePoints: 50,
  rewardThreshold: 500,
  rewardLabel: "A club reward becomes available after 500 points.",
  rewardLabelPl: "Nagroda klubowa staje się dostępna po zebraniu 500 punktów.",
  }).commit();

  await client.patch("homepage").set({
  hero: {eyebrow: "Thoughtful pet essentials", title: "Less, but better.", text: "Useful, well-designed essentials selected for comfort, function and happier everyday routines.", primaryLabel: "Shop Best Sellers", primaryLink: "/shop?category=bestsellers", secondaryLabel: "Explore Essentials", secondaryLink: "/categories/essentials"},
  heroPl: {eyebrow: "Przemyślane essentials dla pupili", title: "Mniej, ale lepiej.", text: "Funkcjonalne, dobrze zaprojektowane produkty wybrane z myślą o wygodzie i łatwiejszej codzienności.", primaryLabel: "Zobacz bestsellery", primaryLink: "/shop?category=bestsellers", secondaryLabel: "Odkryj essentials", secondaryLink: "/categories/essentials"},
  rewards: {eyebrow: "Furry Fairy Club", title: "Join the family and start collecting points", text: "Create an account for welcome points, then earn more on paid purchases and move closer to club rewards.", buttonLabel: "Create account"},
  rewardsPl: {eyebrow: "Furry Fairy Club", title: "Dołącz do rodziny i zacznij zbierać punkty", text: "Utwórz konto, odbierz punkty powitalne, a następnie zdobywaj kolejne za opłacone zakupy.", buttonLabel: "Utwórz konto"},
  }).setIfMissing({
  philosophy: {eyebrow: "Why Furry Fairy Pets", title: "We make everyday life with pets feel easier.", text: "Less, but better — thoughtful choices made for comfort, function and the moments you share."},
  philosophyPl: {eyebrow: "Dlaczego Furry Fairy Pets", title: "Ułatwiamy codzienne życie z pupilem.", text: "Mniej, ale lepiej — wybory stworzone z myślą o wygodzie, funkcji i wspólnych chwilach."},
  promise: {eyebrow: "The Furry Fairy promise", title: "Pet products should solve problems, not create clutter.", text: "We choose less, but better: functional, well-designed and beautiful products that make everyday life with your pet easier."},
  promisePl: {eyebrow: "Obietnica Furry Fairy", title: "Produkty dla pupili powinny rozwiązywać problemy, a nie tworzyć bałagan.", text: "Wybieramy mniej, ale lepiej: funkcjonalne, dobrze zaprojektowane i piękne produkty, które ułatwiają codzienne życie z pupilem."},
  instagram: {eyebrow: "From our community", title: "Follow the everyday magic", text: "Discover new arrivals, real-life inspiration and moments shared by the Furry Fairy family.", profileLabel: "Visit Instagram"},
  instagramPl: {eyebrow: "Od naszej społeczności", title: "Obserwuj codzienną magię", text: "Zobacz nowości, inspiracje z prawdziwego życia i chwile udostępniane przez rodzinę Furry Fairy.", profileLabel: "Odwiedź Instagram"},
  }).commit();

  console.log(JSON.stringify({createdOrUpdatedCategories: categories.length, reassignedProducts: reassignments.length}, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
