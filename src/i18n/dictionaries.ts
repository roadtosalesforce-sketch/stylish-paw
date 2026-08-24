export const locales = ["en", "pl"] as const;

export type Locale = (typeof locales)[number];

export const dictionaries = {
  en: {
    meta: {
      title: "Furry Fairy Pets — Comfortable Style for Dogs & Cats",
      description: "Comfortable, expressive clothing and accessories for dogs and cats, with helpful sizing and a playful touch.",
    },
    common: {
      home: "Home", shop: "Shop", all: "All", dogs: "Dogs", cats: "Cats",
      categories: {all: "All", sweaters: "Sweaters", raincoats: "Raincoats", costumes: "Costumes", accessories: "Accessories", outerwear: "Outerwear"},
      badges: {New: "New", Bestseller: "Bestseller", Limited: "Limited", Sale: "Sale", Handmade: "Handmade", Seasonal: "Seasonal", Holiday: "Holiday"},
    },
    header: {
      announcement: "Designed for comfort, made for memorable moments",
      clothing: "Clothing", discover: "Discover", byPet: "By Pet", newArrivals: "New Arrivals", bestSellers: "Best Sellers", shopAll: "Shop All",
      giftsDogs: "Gifts for Dogs", giftsCats: "Gifts for Cats", essentials: "Everyday Essentials", celebration: "Celebration Looks", sizeFit: "Size & Fit",
      seasonalEdit: "Seasonal edit", rainyTitle: "Ready for rainy walks", exploreRainwear: "Explore rainwear", openMenu: "Open menu", language: "Language",
    },
    footer: {
      description: "Comfortable pet clothing with a playful point of view, created for everyday adventures and special moments.",
      shop: "Shop", help: "Help", about: "About", allProducts: "All Products", newArrivals: "New Arrivals", bestSellers: "Best Sellers",
      sizeGuide: "Size Guide", shippingReturns: "Shipping & Returns", faq: "FAQ", ourStory: "Our Story", careGuide: "Care Guide", contact: "Contact",
      stayClose: "Stay close", stayText: "New collections, fit tips and a little everyday magic.", copyright: "Made with a little magic for pets everywhere.",
    },
    hero: {
      eyebrow: "Thoughtful design · Comfortable fit", title: "Made to fit. Designed to delight.",
      text: "Comfortable clothing for dogs and cats, designed for everyday walks, celebrations and all the moments worth remembering.",
      primary: "Shop New Arrivals", secondary: "Find Your Pet's Size", imageAlt: "Happy dog wearing a cozy outfit", help: "Need help choosing?", guidance: "Simple size guidance",
    },
    trust: [
      ["Easy size guidance", "Measure with confidence"], ["Comfort first", "Thoughtful materials and fit"],
      ["Secure checkout", "Protected payment flow"], ["Clear support", "Helpful delivery and returns info"],
    ],
    home: {
      categoryTitle: "Shop by Category", categoryText: "Find the perfect outfit for every occasion", featuredTitle: "Featured Picks", featuredText: "Our most-loved styles this season",
      viewAll: "View all", viewAllProducts: "View all products", seasonal: "Seasonal collection", rainTitle: "Ready for rainy-day adventures", exploreRainwear: "Explore rainwear",
      fitEyebrow: "Find the right fit", fitTitle: "Comfort begins with the right measurements", viewSizeGuide: "View size guide", promise: "The Furry Fairy promise",
      storyTitle: "Style should never come at the cost of comfort.", storyText: "We focus on easy-to-understand sizing, thoughtful fits and pieces made for real life with pets—not just the photograph.",
      newsletterTitle: "Join the Furry Fairy Family", newsletterText: "New collections, fit tips and a little everyday magic.", subscribe: "Subscribe", emailPlaceholder: "your@email.com",
    },
    shop: {
      newArrivals: "New Arrivals", bestSellers: "Best Sellers", forDogs: "For Dogs", forCats: "For Cats", allProducts: "All Products", item: "item", items: "items",
      noProducts: "No products found", tryFilter: "Try a different category filter", colours: "colours", sizes: "sizes",
    },
    product: {
      for: "For", bothPets: "dogs & cats", comfortFit: "Comfort-led fit", secureCheckout: "Secure checkout", clearSupport: "Clear support",
      chooseSize: "Choose size", chooseColour: "Choose colour", quantity: "Quantity", added: "Added to cart ✓", add: "Add to Cart", buy: "Buy Now",
      fitCare: "Fit & care", fitCareText: "Check the size guide before ordering. Follow the care label supplied with the product to preserve its shape and colour.",
      shippingReturns: "Shipping & returns", shippingText: "InPost Parcel Locker delivery within Poland costs 17.99 zł and is free from 149 zł. Choose your locker in the cart; delivery usually takes 1–3 business days after dispatch.",
    },
    sizeGuide: {
      link: "Size guide & how to measure", eyebrow: "A better fit starts here", title: "Measure your pet", close: "Close size guide",
      steps: [["Neck", "Measure where the collar naturally sits."], ["Chest", "Measure the widest point behind the front legs."], ["Back", "Measure from the collar line to the base of the tail."]],
      note: "If your pet falls between sizes, choose the larger size for comfort. Product-specific measurements will appear here when entered in Sanity.",
    },
    cart: {
      title: "Shopping Cart", emptyTitle: "Your cart is empty", emptyText: "Looks like your pet's wardrobe needs some love!", startShopping: "Start Shopping", remove: "Remove", clear: "Clear cart",
      summary: "Order Summary", subtotal: "Subtotal", shipping: "Delivery", free: "Free", total: "Total", freeShipping: "Add {amount} more for free InPost delivery!",
      inpostEta: "Parcel locker delivery · usually 1–3 business days", selectedLocker: "Selected parcel locker", chooseLocker: "Choose on the InPost map", changeLocker: "Change parcel locker",
      lockerCode: "Your InPost parcel locker", lockerCodeAlternative: "Or enter the parcel locker code", lockerPlaceholder: "e.g. WAW01M", findLocker: "Find locker",
      lockerHint: "Open the official InPost map, choose a locker and enter its short code here.", lockerRequired: "Choose or enter a valid InPost parcel locker before checkout.",
      checkout: "Secure Checkout", opening: "Opening secure checkout…", powered: "Secure payment powered by Stripe", error: "Checkout could not be started.", cartLabel: "Shopping cart with {count} items",
    },
    checkout: {
      received: "Payment received", thanks: "Thank you for your order", text: "Stripe will email your payment confirmation. We'll prepare your pet's new look and contact you with shipping updates.",
      continue: "Continue shopping", home: "Back to home", activating: "Payments are being activated. Please try again shortly.", invalidRequest: "Invalid checkout request.", invalidCart: "Your cart is not valid.",
      changed: "A product in your cart has changed. Please refresh and try again.", failed: "Checkout could not be started. Please try again.", invalidLocker: "Choose a valid InPost parcel locker.", freeShipping: "Free shipping", standardShipping: "Standard shipping", inPostLocker: "InPost Parcel Locker 24/7", freeInPost: "Free InPost Parcel Locker delivery",
    },
    pages: {back: "← Back home"},
  },
  pl: {
    meta: {
      title: "Furry Fairy Pets — Wygodne ubrania dla psów i kotów",
      description: "Wygodne i pełne charakteru ubrania oraz akcesoria dla psów i kotów, z pomocnym doborem rozmiaru.",
    },
    common: {
      home: "Strona główna", shop: "Sklep", all: "Wszystkie", dogs: "Psy", cats: "Koty",
      categories: {all: "Wszystkie", sweaters: "Swetry", raincoats: "Kurtki przeciwdeszczowe", costumes: "Kostiumy", accessories: "Akcesoria", outerwear: "Odzież wierzchnia"},
      badges: {New: "Nowość", Bestseller: "Bestseller", Limited: "Limitowany", Sale: "Wyprzedaż", Handmade: "Ręcznie wykonany", Seasonal: "Sezonowy", Holiday: "Świąteczny"},
    },
    header: {
      announcement: "Zaprojektowane z myślą o komforcie i wyjątkowych chwilach",
      clothing: "Ubrania", discover: "Odkrywaj", byPet: "Dla pupila", newArrivals: "Nowości", bestSellers: "Bestsellery", shopAll: "Wszystkie produkty",
      giftsDogs: "Prezenty dla psów", giftsCats: "Prezenty dla kotów", essentials: "Na co dzień", celebration: "Na wyjątkowe okazje", sizeFit: "Rozmiar i dopasowanie",
      seasonalEdit: "Sezonowa kolekcja", rainyTitle: "Gotowi na deszczowe spacery", exploreRainwear: "Zobacz kurtki", openMenu: "Otwórz menu", language: "Język",
    },
    footer: {
      description: "Wygodne ubrania dla pupili z odrobiną fantazji — na codzienne przygody i wyjątkowe chwile.",
      shop: "Sklep", help: "Pomoc", about: "O nas", allProducts: "Wszystkie produkty", newArrivals: "Nowości", bestSellers: "Bestsellery",
      sizeGuide: "Tabela rozmiarów", shippingReturns: "Dostawa i zwroty", faq: "Najczęstsze pytania", ourStory: "Nasza historia", careGuide: "Pielęgnacja", contact: "Kontakt",
      stayClose: "Bądźmy w kontakcie", stayText: "Nowe kolekcje, wskazówki dotyczące rozmiaru i odrobina codziennej magii.", copyright: "Stworzone z odrobiną magii dla pupili na całym świecie.",
    },
    hero: {
      eyebrow: "Przemyślany design · Wygodne dopasowanie", title: "Idealne dopasowanie. Zachwycający styl.",
      text: "Wygodne ubrania dla psów i kotów — na codzienne spacery, świętowanie i wszystkie chwile warte zapamiętania.",
      primary: "Zobacz nowości", secondary: "Dobierz rozmiar pupila", imageAlt: "Szczęśliwy pies w wygodnym ubranku", help: "Potrzebujesz pomocy?", guidance: "Prosty dobór rozmiaru",
    },
    trust: [
      ["Łatwy dobór rozmiaru", "Mierz bez obaw"], ["Komfort przede wszystkim", "Przemyślane materiały i krój"],
      ["Bezpieczna płatność", "Chroniony proces płatności"], ["Jasne zasady", "Pomocne informacje o dostawie i zwrotach"],
    ],
    home: {
      categoryTitle: "Kupuj według kategorii", categoryText: "Znajdź idealny strój na każdą okazję", featuredTitle: "Polecane produkty", featuredText: "Najchętniej wybierane modele tego sezonu",
      viewAll: "Zobacz wszystkie", viewAllProducts: "Zobacz wszystkie produkty", seasonal: "Sezonowa kolekcja", rainTitle: "Gotowi na przygody w deszczowe dni", exploreRainwear: "Zobacz kurtki",
      fitEyebrow: "Znajdź właściwy rozmiar", fitTitle: "Komfort zaczyna się od dobrego pomiaru", viewSizeGuide: "Zobacz tabelę rozmiarów", promise: "Obietnica Furry Fairy",
      storyTitle: "Styl nigdy nie powinien oznaczać rezygnacji z wygody.", storyText: "Stawiamy na czytelne rozmiary, przemyślany krój i ubrania stworzone do prawdziwego życia z pupilem — nie tylko do zdjęć.",
      newsletterTitle: "Dołącz do rodziny Furry Fairy", newsletterText: "Nowe kolekcje, wskazówki dotyczące rozmiaru i odrobina codziennej magii.", subscribe: "Zapisz się", emailPlaceholder: "twój@email.com",
    },
    shop: {
      newArrivals: "Nowości", bestSellers: "Bestsellery", forDogs: "Dla psów", forCats: "Dla kotów", allProducts: "Wszystkie produkty", item: "produkt", items: "produktów",
      noProducts: "Nie znaleziono produktów", tryFilter: "Wybierz inną kategorię", colours: "kolory", sizes: "rozmiary",
    },
    product: {
      for: "Dla", bothPets: "psów i kotów", comfortFit: "Wygodny krój", secureCheckout: "Bezpieczna płatność", clearSupport: "Jasne zasady",
      chooseSize: "Wybierz rozmiar", chooseColour: "Wybierz kolor", quantity: "Ilość", added: "Dodano do koszyka ✓", add: "Dodaj do koszyka", buy: "Kup teraz",
      fitCare: "Dopasowanie i pielęgnacja", fitCareText: "Przed zamówieniem sprawdź tabelę rozmiarów. Postępuj zgodnie z instrukcją pielęgnacji dołączoną do produktu, aby zachować jego kształt i kolor.",
      shippingReturns: "Dostawa i zwroty", shippingText: "Dostawa InPost Paczkomat® 24/7 na terenie Polski kosztuje 17,99 zł i jest bezpłatna od 149 zł. Paczkomat wybierzesz w koszyku; dostawa zwykle trwa 1–3 dni robocze od nadania.",
    },
    sizeGuide: {
      link: "Tabela rozmiarów i sposób pomiaru", eyebrow: "Lepsze dopasowanie zaczyna się tutaj", title: "Zmierz swojego pupila", close: "Zamknij tabelę rozmiarów",
      steps: [["Szyja", "Zmierz obwód w miejscu, w którym naturalnie leży obroża."], ["Klatka piersiowa", "Zmierz najszersze miejsce za przednimi łapami."], ["Grzbiet", "Zmierz od linii obroży do nasady ogona."]],
      note: "Jeśli pupil jest pomiędzy rozmiarami, dla wygody wybierz większy. Szczegółowe wymiary produktu pojawią się tutaj po wpisaniu ich w Sanity.",
    },
    cart: {
      title: "Koszyk", emptyTitle: "Twój koszyk jest pusty", emptyText: "Wygląda na to, że garderoba Twojego pupila potrzebuje odrobiny miłości!", startShopping: "Rozpocznij zakupy", remove: "Usuń", clear: "Wyczyść koszyk",
      summary: "Podsumowanie zamówienia", subtotal: "Suma częściowa", shipping: "Dostawa", free: "Bezpłatna", total: "Razem", freeShipping: "Dodaj jeszcze {amount}, aby otrzymać darmową dostawę InPost!",
      inpostEta: "Dostawa do automatu · zwykle 1–3 dni robocze", selectedLocker: "Wybrany Paczkomat", chooseLocker: "Wybierz na mapie InPost", changeLocker: "Zmień Paczkomat",
      lockerCode: "Twój Paczkomat InPost", lockerCodeAlternative: "Lub wpisz kod Paczkomatu", lockerPlaceholder: "np. WAW01M", findLocker: "Znajdź punkt",
      lockerHint: "Otwórz oficjalną mapę InPost, wybierz Paczkomat i wpisz tutaj jego krótki kod.", lockerRequired: "Przed płatnością wybierz lub wpisz prawidłowy Paczkomat InPost.",
      checkout: "Bezpieczna płatność", opening: "Otwieranie bezpiecznej płatności…", powered: "Bezpieczne płatności obsługuje Stripe", error: "Nie udało się rozpocząć płatności.", cartLabel: "Koszyk: {count} produktów",
    },
    checkout: {
      received: "Płatność otrzymana", thanks: "Dziękujemy za zamówienie", text: "Stripe wyśle e-mail z potwierdzeniem płatności. Przygotujemy nowy strój Twojego pupila i skontaktujemy się z informacją o wysyłce.",
      continue: "Kontynuuj zakupy", home: "Wróć na stronę główną", activating: "Płatności są właśnie uruchamiane. Spróbuj ponownie za chwilę.", invalidRequest: "Nieprawidłowe żądanie płatności.", invalidCart: "Twój koszyk jest nieprawidłowy.",
      changed: "Produkt w koszyku uległ zmianie. Odśwież stronę i spróbuj ponownie.", failed: "Nie udało się rozpocząć płatności. Spróbuj ponownie.", invalidLocker: "Wybierz prawidłowy Paczkomat InPost.", freeShipping: "Darmowa dostawa", standardShipping: "Dostawa standardowa", inPostLocker: "InPost Paczkomat® 24/7", freeInPost: "Darmowa dostawa InPost Paczkomat® 24/7",
    },
    pages: {back: "← Wróć na stronę główną"},
  },
} as const;

export type Dictionary = (typeof dictionaries)["en"] | (typeof dictionaries)["pl"];

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "pl";
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
