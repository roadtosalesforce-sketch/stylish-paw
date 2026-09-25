export const locales = ["en", "pl"] as const;

export type Locale = (typeof locales)[number];

export const dictionaries = {
  en: {
    meta: {
      title: "Furry Fairy Pets — Premium Pet Essentials",
      description: "Thoughtfully selected essentials for dogs and cats that make everyday life easier, cleaner, calmer and more enjoyable.",
    },
    common: {
      home: "Home", shop: "Shop", all: "All", dogs: "Dogs", cats: "Cats",
      categories: {all: "All", clothing: "Clothing", "collars-leashes": "Collars & Leashes", essentials: "Essentials", walk: "Walk", play: "Play", eat: "Eat", care: "Care", rest: "Rest", wear: "Wear", sweaters: "Sweaters", raincoats: "Raincoats", costumes: "Costumes", accessories: "Accessories", outerwear: "Outerwear"},
      badges: {New: "New", Bestseller: "Bestseller", Limited: "Limited", Sale: "Sale", Handmade: "Handmade", Seasonal: "Seasonal", Holiday: "Holiday"},
    },
    header: {
      announcement: "Less, but better · Free InPost delivery from 149 PLN",
      clothing: "Clothing", discover: "Discover", byPet: "By Pet", newArrivals: "New Arrivals", bestSellers: "Best Sellers", shopAll: "Shop All",
      giftsDogs: "Gifts for Dogs", giftsCats: "Gifts for Cats", essentials: "Everyday Essentials", celebration: "Celebration Looks", sizeFit: "Size & Fit",
      seasonalEdit: "Seasonal Essentials", rainyTitle: "Useful picks for the season", exploreRainwear: "Explore essentials", blog: "Blog", aboutUs: "About Us", openMenu: "Open menu", language: "Language", currency: "Currency", signIn: "Sign in", signInRegister: "Sign in / Register", myAccount: "My account",
    },
    footer: {
      description: "Premium pet essentials, carefully selected to make life with dogs and cats easier, cleaner and calmer.",
      shop: "Shop", help: "Help", about: "About", allProducts: "All Products", newArrivals: "New Arrivals", bestSellers: "Best Sellers",
      sizeGuide: "Size Guide", shippingReturns: "Shipping & Returns", faq: "FAQ", ourStory: "Our Story", careGuide: "Care Guide", contact: "Contact",
      stayClose: "Stay close", stayText: "Useful ideas, selected essentials and a little everyday magic.", copyright: "Less, but better — for life with pets.",
    },
    hero: {
      eyebrow: "Premium Pet Essentials", title: "Less, but better.",
      text: "Thoughtfully selected products that make life with pets easier, cleaner, calmer and more enjoyable.",
      primary: "Shop Best Sellers", secondary: "Explore Essentials", imageAlt: "A happy pet enjoying an easier everyday routine", help: "Need help choosing?", guidance: "Simple product guidance",
      carouselLabel: "Featured collections", previousSlide: "Previous slide", nextSlide: "Next slide", pauseSlides: "Pause slides", playSlides: "Play slides", goToSlide: "Go to slide",
      fallbackSlides: [
        {eyebrow: "Premium Pet Essentials", title: "Less, but better.", text: "Useful, well-designed essentials selected to solve real everyday problems.", imageAlt: "Happy dog enjoying an outdoor walk", primaryLabel: "Shop Best Sellers", primaryLink: "/shop?category=bestsellers", secondaryLabel: "Explore Essentials", secondaryLink: "/shop"},
        {eyebrow: "Comfort in every season", title: "Made to move with them.", text: "Comfort-led clothing for everyday walks, changing weather and memorable moments.", imageAlt: "Dog ready for an outdoor adventure", primaryLabel: "Explore Clothing", primaryLink: "/categories/clothing", secondaryLabel: "View Size & Fit", secondaryLink: "/pages/size-guide"},
        {eyebrow: "Walk beautifully", title: "Everyday essentials with personality.", text: "Collars, leashes and coordinated details for safer, happier walks.", imageAlt: "Dog enjoying a walk", primaryLabel: "Collars & Leashes", primaryLink: "/categories/collars-leashes", secondaryLabel: "Explore Essentials", secondaryLink: "/categories/essentials"},
      ],
    },
    trust: [
      ["Curated, not crowded", "Only useful essentials"], ["Everyday ease", "Designed around real routines"],
      ["Secure checkout", "Protected Stripe payment"], ["Clear support", "Helpful delivery and returns"],
    ],
    home: {
      categoryTitle: "Shop by Category", categoryText: "Three simple collections, each with a clear purpose", featuredTitle: "Best Sellers", featuredText: "The products pet parents choose again and again",
      viewAll: "View all", viewAllProducts: "View all products", seasonal: "Seasonal collection", rainTitle: "Ready for rainy-day adventures", exploreRainwear: "Explore rainwear",
      fitEyebrow: "Find the right fit", fitTitle: "Comfort begins with the right measurements", viewSizeGuide: "View size guide", promise: "The Furry Fairy promise",
      storyTitle: "Pet products should solve problems, not create clutter.", storyText: "We choose fewer, better essentials: well-designed, functional and beautiful products that make everyday life with pets easier, cleaner and calmer.",
      newsletterTitle: "Join the Family & Start Earning Points", newsletterText: "Create an account, collect Furry Fairy Points when you shop and follow your progress toward rewards.", subscribe: "Create account", emailPlaceholder: "your@email.com",
      philosophyEyebrow: "Why Furry Fairy Pets", philosophyTitle: "We make everyday life with pets feel easier.", philosophyText: "Fewer, better choices—selected for comfort, usefulness and the moments you share together.", shopBestsellers: "Shop Best Sellers", browseCollections: "Browse the essentials", collectionsTitle: "Shop by Category", collectionsText: "Three simple collections, each with a clear purpose.", bestsellerProof: "Selected for comfort, usefulness and lasting quality — because practical things can look beautiful too.", whyTitle: "Less, but better", whyItems: [["Useful by design", "Every product must solve a real everyday problem."], ["Calm choices", "Clear categories and honest information make choosing easier."], ["Made for real life", "Comfort, care and easy routines come before trends."]], instagramEyebrow: "From our community", instagramTitle: "Follow the everyday magic", instagramText: "See new arrivals, real-life inspiration and moments shared by the Furry Fairy family.", visitInstagram: "Visit Instagram", rewardsEyebrow: "Furry Fairy Club", rewardsTitle: "Join the Family & Start Earning Points", rewardsText: "Create an account today. Your purchases can earn points and bring you closer to member rewards.", createAccount: "Create account",
    },
    shop: {
      newArrivals: "New Arrivals", bestSellers: "Best Sellers", forDogs: "For Dogs", forCats: "For Cats", allProducts: "All Products", item: "item", items: "items",
      noProducts: "No styles match these filters yet", tryFilter: "Clear the filters or explore the full collection", colours: "colours", sizes: "sizes", viewProduct: "View product",
      filterByPet: "Filter by pet", filterByCategory: "Filter by category", allPets: "All pets", clearFilters: "View all products", quickAdd: "Quick add", quickViewTitle: "Choose options", closeQuickView: "Close quick view",
      specialFits: "Special Fits", filterByFit: "Filter by special fit", allFits: "All fits", fitDachshund: "Dachshund", fitSighthound: "Sighthound", fitBulldog: "Bulldog", fitSmallDog: "Small dogs", fitLargeDog: "Large dogs", fitPuppy: "Puppies",
    },
    product: {
      for: "For", bothPets: "dogs & cats", comfortFit: "Comfort-led fit", secureCheckout: "Secure checkout", clearSupport: "Clear support",
      chooseSize: "Choose size", chooseColour: "Choose colour", quantity: "Quantity", added: "Added to cart ✓", add: "Add to Cart", buy: "Buy Now",
      outOfStock: "Out of stock", onlyLeft: "Only {count} left",
      fitCare: "Fit & care", fitCareText: "Check the size guide before ordering. Follow the care label supplied with the product to preserve its shape and colour.",
      shippingReturns: "Shipping & returns", shippingText: "InPost Parcel Locker delivery within Poland costs 17.99 zł and is free from 149 zł. Choose your locker in the cart; delivery usually takes 1–3 business days after dispatch.",
      inpostTitle: "InPost delivery", inpostText: "1–3 business days after dispatch · free from 149 zł", guestTitle: "No account needed", guestText: "Checkout quickly as a guest", returnsTitle: "Clear purchase terms", returnsLink: "Delivery & returns",
      reviewEyebrow: "Loved by pets and their people", reviewTitle: "How it looks in real life", verifiedReview: "Approved customer review",
      material: "Material", care: "Care instructions", fitNotes: "Fit notes", specialFit: "Special fit", relatedEyebrow: "Complete the routine", relatedTitle: "You may also like",
    },
    sizeGuide: {
      link: "Size guide & how to measure", eyebrow: "A better fit starts here", title: "Measure your pet", close: "Close size guide",
      steps: [["Neck", "Measure where the collar naturally sits."], ["Chest", "Measure the widest point behind the front legs."], ["Back", "Measure from the collar line to the base of the tail."]],
      note: "If your pet falls between sizes, choose the larger size for comfort. Product-specific measurements will appear here when entered in Sanity.",
      finderTitle: "Find your pet's size", finderText: "Chest measurement is the most important. Weight helps us check the result.", breed: "Breed", chooseBreed: "Choose breed", breeds: ["French Bulldog", "Toy Poodle", "British Shorthair", "Shih Tzu", "Dachshund", "Mixed / Other"], weight: "Weight (kg)", chest: "Chest (cm)", recommendation: "Suggested size", checkMeasurements: "Check the full table before ordering.", noMatch: "These measurements fall between our listed sizes. Choose the larger size or contact us before ordering.", measurementsPending: "Product-specific measurements have not been entered in Sanity yet.", size: "Size", neck: "Neck", chestShort: "Chest", back: "Back", weightShort: "Weight",
    },
    cart: {
      title: "Shopping Cart", emptyTitle: "Your cart is empty", emptyText: "Looks like your pet's wardrobe needs some love!", startShopping: "Start Shopping", remove: "Remove", clear: "Clear cart",
      summary: "Order Summary", subtotal: "Subtotal", shipping: "Delivery", free: "Free", total: "Total", freeShipping: "Add {amount} more for free InPost delivery!",
      inpostEta: "Parcel locker delivery · usually 1–3 business days", selectedLocker: "Selected parcel locker", chooseLocker: "Choose on the InPost map", changeLocker: "Change parcel locker",
      lockerCode: "Your InPost parcel locker", lockerCodeAlternative: "Or enter the parcel locker code", lockerPlaceholder: "e.g. WAW01M", findLocker: "Find locker",
      lockerHint: "Open the official InPost map, choose a locker and enter its short code here.", lockerRequired: "Choose or enter a valid InPost parcel locker before checkout.",
      checkout: "Secure Checkout", opening: "Opening secure checkout…", powered: "Secure payment powered by Stripe", error: "Checkout could not be started.", cartLabel: "Shopping cart with {count} items",
      guestCheckout: "No account required", stripeProtection: "Encrypted checkout powered by Stripe", deliveryReturns: "Review delivery and returns",
    },
    checkout: {
      received: "Payment received", thanks: "Thank you for your order", text: "Stripe will email your payment confirmation. We'll prepare your pet's new look and contact you with shipping updates.",
      continue: "Continue shopping", home: "Back to home", activating: "Payments are being activated. Please try again shortly.", invalidRequest: "Invalid checkout request.", invalidCart: "Your cart is not valid.",
      changed: "A product in your cart has changed. Please refresh and try again.", failed: "Checkout could not be started. Please try again.", invalidLocker: "Choose a valid InPost parcel locker.", freeShipping: "Free shipping", standardShipping: "Standard shipping", inPostLocker: "InPost Parcel Locker 24/7", freeInPost: "Free InPost Parcel Locker delivery",
    },
    pages: {back: "← Back home"},
    blog: {eyebrow: "Furry Fairy Journal", title: "Helpful ideas for life with pets", intro: "Practical guides, thoughtful inspiration and stories from the Furry Fairy world.", emptyTitle: "The first stories are on their way", emptyText: "Blog posts can now be written and published directly from Sanity.", read: "Read article", back: "← Back to the blog"},
  },
  pl: {
    meta: {
      title: "Furry Fairy Pets — Premium Pet Essentials",
      description: "Starannie wybrane akcesoria dla psów i kotów, które ułatwiają codzienne życie, pomagają zachować czystość i wprowadzają więcej spokoju.",
    },
    common: {
      home: "Strona główna", shop: "Sklep", all: "Wszystkie", dogs: "Psy", cats: "Koty",
      categories: {all: "Wszystkie", clothing: "Ubrania", "collars-leashes": "Obroże i smycze", essentials: "Essentials", walk: "Spacer", play: "Zabawa", eat: "Jedzenie", care: "Pielęgnacja", rest: "Odpoczynek", wear: "Ubrania", sweaters: "Swetry", raincoats: "Kurtki przeciwdeszczowe", costumes: "Kostiumy", accessories: "Akcesoria", outerwear: "Odzież wierzchnia"},
      badges: {New: "Nowość", Bestseller: "Bestseller", Limited: "Limitowany", Sale: "Wyprzedaż", Handmade: "Ręcznie wykonany", Seasonal: "Sezonowy", Holiday: "Świąteczny"},
    },
    header: {
      announcement: "Mniej, ale lepiej · Darmowa dostawa InPost od 149 PLN",
      clothing: "Ubrania", discover: "Odkrywaj", byPet: "Dla pupila", newArrivals: "Nowości", bestSellers: "Bestsellery", shopAll: "Wszystkie produkty",
      giftsDogs: "Prezenty dla psów", giftsCats: "Prezenty dla kotów", essentials: "Na co dzień", celebration: "Na wyjątkowe okazje", sizeFit: "Rozmiar i dopasowanie",
      seasonalEdit: "Sezonowe essentials", rainyTitle: "Przydatne wybory na ten sezon", exploreRainwear: "Odkryj essentials", blog: "Blog", aboutUs: "O nas", openMenu: "Otwórz menu", language: "Język", currency: "Waluta", signIn: "Zaloguj się", signInRegister: "Logowanie / Rejestracja", myAccount: "Moje konto",
    },
    footer: {
      description: "Premium Pet Essentials — starannie wybrane produkty, które ułatwiają, porządkują i uspokajają codzienne życie z pupilem.",
      shop: "Sklep", help: "Pomoc", about: "O nas", allProducts: "Wszystkie produkty", newArrivals: "Nowości", bestSellers: "Bestsellery",
      sizeGuide: "Tabela rozmiarów", shippingReturns: "Dostawa i zwroty", faq: "Najczęstsze pytania", ourStory: "Nasza historia", careGuide: "Pielęgnacja", contact: "Kontakt",
      stayClose: "Bądźmy w kontakcie", stayText: "Praktyczne wskazówki, wybrane produkty i odrobina codziennej magii.", copyright: "Mniej, ale lepiej — dla życia z pupilem.",
    },
    hero: {
      eyebrow: "Premium Pet Essentials", title: "Mniej, ale lepiej.",
      text: "Starannie wybrane produkty, które ułatwiają życie z pupilem, pomagają zachować czystość i wprowadzają więcej spokoju.",
      primary: "Zobacz bestsellery", secondary: "Odkryj essentials", imageAlt: "Szczęśliwy pupil podczas spokojnej codziennej rutyny", help: "Potrzebujesz pomocy?", guidance: "Prosty wybór produktu",
      carouselLabel: "Polecane kolekcje", previousSlide: "Poprzedni slajd", nextSlide: "Następny slajd", pauseSlides: "Zatrzymaj slajdy", playSlides: "Wznów slajdy", goToSlide: "Przejdź do slajdu",
      fallbackSlides: [
        {eyebrow: "Premium Pet Essentials", title: "Mniej, ale lepiej.", text: "Funkcjonalne i piękne produkty wybrane do rozwiązywania prawdziwych, codziennych problemów.", imageAlt: "Szczęśliwy pies na spacerze", primaryLabel: "Zobacz bestsellery", primaryLink: "/shop?category=bestsellers", secondaryLabel: "Odkryj essentials", secondaryLink: "/shop"},
        {eyebrow: "Wygoda na każdą porę", title: "Stworzone, by dotrzymać im kroku.", text: "Wygodne ubrania na codzienne spacery, zmienną pogodę i chwile warte zapamiętania.", imageAlt: "Pies gotowy na przygodę na świeżym powietrzu", primaryLabel: "Odkryj ubrania", primaryLink: "/categories/clothing", secondaryLabel: "Rozmiar i dopasowanie", secondaryLink: "/pages/size-guide"},
        {eyebrow: "Piękne spacery", title: "Codzienne akcesoria z charakterem.", text: "Obroże, smycze i dopasowane detale na bezpieczniejsze, przyjemniejsze spacery.", imageAlt: "Pies podczas spaceru", primaryLabel: "Obroże i smycze", primaryLink: "/categories/collars-leashes", secondaryLabel: "Odkryj essentials", secondaryLink: "/categories/essentials"},
      ],
    },
    trust: [
      ["Wybrane, nie przeładowane", "Tylko przydatne essentials"], ["Łatwiejsza codzienność", "Dla prawdziwych rytuałów"],
      ["Bezpieczna płatność", "Chroniona płatność Stripe"], ["Jasne zasady", "Pomocna dostawa i zwroty"],
    ],
    home: {
      categoryTitle: "Kupuj według kategorii", categoryText: "Trzy proste kolekcje, każda z jasnym przeznaczeniem", featuredTitle: "Bestsellery", featuredText: "Produkty najchętniej wybierane przez opiekunów",
      viewAll: "Zobacz wszystkie", viewAllProducts: "Zobacz wszystkie produkty", seasonal: "Sezonowa kolekcja", rainTitle: "Gotowi na przygody w deszczowe dni", exploreRainwear: "Zobacz kurtki",
      fitEyebrow: "Znajdź właściwy rozmiar", fitTitle: "Komfort zaczyna się od dobrego pomiaru", viewSizeGuide: "Zobacz tabelę rozmiarów", promise: "Obietnica Furry Fairy",
      storyTitle: "Produkty dla pupili powinny rozwiązywać problemy, a nie tworzyć bałagan.", storyText: "Wybieramy mniej, ale lepiej: funkcjonalne, dobrze zaprojektowane i piękne produkty, które ułatwiają codzienne życie z pupilem.",
      newsletterTitle: "Dołącz do rodziny i zacznij zbierać punkty", newsletterText: "Utwórz konto, zbieraj Furry Fairy Points podczas zakupów i obserwuj postęp w drodze do nagród.", subscribe: "Utwórz konto", emailPlaceholder: "twój@email.com",
      philosophyEyebrow: "Dlaczego Furry Fairy Pets", philosophyTitle: "Ułatwiamy codzienne życie z pupilem.", philosophyText: "Mniej, ale lepiej — wybory stworzone z myślą o wygodzie, funkcji i wspólnych chwilach.", shopBestsellers: "Zobacz bestsellery", browseCollections: "Odkryj essentials", collectionsTitle: "Kupuj według kategorii", collectionsText: "Trzy proste kolekcje, każda z jasnym przeznaczeniem.", bestsellerProof: "Wybrane z myślą o wygodzie, funkcjonalności i jakości — bo praktyczne rzeczy też mogą wyglądać pięknie.", whyTitle: "Mniej, ale lepiej", whyItems: [["Funkcja w każdym detalu", "Każdy produkt musi rozwiązywać realny, codzienny problem."], ["Spokojny wybór", "Czytelne kategorie i uczciwe informacje ułatwiają decyzję."], ["Do prawdziwego życia", "Komfort, pielęgnacja i łatwe rytuały są ważniejsze niż chwilowe trendy."]], instagramEyebrow: "Od naszej społeczności", instagramTitle: "Obserwuj codzienną magię", instagramText: "Zobacz nowości, inspiracje z prawdziwego życia i chwile udostępniane przez rodzinę Furry Fairy.", visitInstagram: "Odwiedź Instagram", rewardsEyebrow: "Furry Fairy Club", rewardsTitle: "Dołącz do rodziny i zacznij zbierać punkty", rewardsText: "Utwórz konto już dziś. Zakupy mogą dawać punkty i przybliżać Cię do nagród klubowych.", createAccount: "Utwórz konto",
    },
    shop: {
      newArrivals: "Nowości", bestSellers: "Bestsellery", forDogs: "Dla psów", forCats: "Dla kotów", allProducts: "Wszystkie produkty", item: "produkt", items: "produktów",
      noProducts: "Nie mamy jeszcze modeli pasujących do tych filtrów", tryFilter: "Wyczyść filtry lub zobacz całą kolekcję", colours: "kolory", sizes: "rozmiary", viewProduct: "Zobacz produkt",
      filterByPet: "Filtruj według pupila", filterByCategory: "Filtruj według kategorii", allPets: "Wszystkie pupile", clearFilters: "Zobacz wszystkie produkty", quickAdd: "Szybki wybór", quickViewTitle: "Wybierz opcje", closeQuickView: "Zamknij szybki podgląd",
      specialFits: "Specjalne kroje", filterByFit: "Filtruj według kroju", allFits: "Wszystkie kroje", fitDachshund: "Jamnik", fitSighthound: "Chart", fitBulldog: "Buldog", fitSmallDog: "Małe psy", fitLargeDog: "Duże psy", fitPuppy: "Szczenięta",
    },
    product: {
      for: "Dla", bothPets: "psów i kotów", comfortFit: "Wygodny krój", secureCheckout: "Bezpieczna płatność", clearSupport: "Jasne zasady",
      chooseSize: "Wybierz rozmiar", chooseColour: "Wybierz kolor", quantity: "Ilość", added: "Dodano do koszyka ✓", add: "Dodaj do koszyka", buy: "Kup teraz",
      outOfStock: "Brak w magazynie", onlyLeft: "Pozostało tylko: {count}",
      fitCare: "Dopasowanie i pielęgnacja", fitCareText: "Przed zamówieniem sprawdź tabelę rozmiarów. Postępuj zgodnie z instrukcją pielęgnacji dołączoną do produktu, aby zachować jego kształt i kolor.",
      shippingReturns: "Dostawa i zwroty", shippingText: "Dostawa InPost Paczkomat® 24/7 na terenie Polski kosztuje 17,99 zł i jest bezpłatna od 149 zł. Paczkomat wybierzesz w koszyku; dostawa zwykle trwa 1–3 dni robocze od nadania.",
      inpostTitle: "Dostawa InPost", inpostText: "1–3 dni robocze od nadania · bezpłatnie od 149 zł", guestTitle: "Bez zakładania konta", guestText: "Szybkie zakupy jako gość", returnsTitle: "Jasne zasady zakupu", returnsLink: "Dostawa i zwroty",
      reviewEyebrow: "Pokochane przez pupile i ich opiekunów", reviewTitle: "Jak wygląda na naszych pupilach", verifiedReview: "Zatwierdzona opinia klienta",
      material: "Materiał", care: "Instrukcja pielęgnacji", fitNotes: "Informacje o dopasowaniu", specialFit: "Specjalny krój", relatedEyebrow: "Uzupełnij codzienny zestaw", relatedTitle: "Może Ci się również spodobać",
    },
    sizeGuide: {
      link: "Tabela rozmiarów i sposób pomiaru", eyebrow: "Lepsze dopasowanie zaczyna się tutaj", title: "Zmierz swojego pupila", close: "Zamknij tabelę rozmiarów",
      steps: [["Szyja", "Zmierz obwód w miejscu, w którym naturalnie leży obroża."], ["Klatka piersiowa", "Zmierz najszersze miejsce za przednimi łapami."], ["Grzbiet", "Zmierz od linii obroży do nasady ogona."]],
      note: "Jeśli pupil jest pomiędzy rozmiarami, dla wygody wybierz większy. Szczegółowe wymiary produktu pojawią się tutaj po wpisaniu ich w Sanity.",
      finderTitle: "Dobierz rozmiar pupila", finderText: "Najważniejszy jest obwód klatki piersiowej. Waga pomaga sprawdzić wynik.", breed: "Rasa", chooseBreed: "Wybierz rasę", breeds: ["Buldog francuski", "Pudel toy", "Kot brytyjski krótkowłosy", "Shih Tzu", "Jamnik", "Mieszaniec / inna"], weight: "Waga (kg)", chest: "Klatka piersiowa (cm)", recommendation: "Sugerowany rozmiar", checkMeasurements: "Przed zamówieniem sprawdź pełną tabelę.", noMatch: "Te wymiary wypadają pomiędzy podanymi rozmiarami. Wybierz większy lub skontaktuj się z nami przed zamówieniem.", measurementsPending: "Wymiary tego produktu nie zostały jeszcze wpisane w Sanity.", size: "Rozmiar", neck: "Szyja", chestShort: "Klatka", back: "Grzbiet", weightShort: "Waga",
    },
    cart: {
      title: "Koszyk", emptyTitle: "Twój koszyk jest pusty", emptyText: "Wygląda na to, że garderoba Twojego pupila potrzebuje odrobiny miłości!", startShopping: "Rozpocznij zakupy", remove: "Usuń", clear: "Wyczyść koszyk",
      summary: "Podsumowanie zamówienia", subtotal: "Suma częściowa", shipping: "Dostawa", free: "Bezpłatna", total: "Razem", freeShipping: "Dodaj jeszcze {amount}, aby otrzymać darmową dostawę InPost!",
      inpostEta: "Dostawa do automatu · zwykle 1–3 dni robocze", selectedLocker: "Wybrany Paczkomat", chooseLocker: "Wybierz na mapie InPost", changeLocker: "Zmień Paczkomat",
      lockerCode: "Twój Paczkomat InPost", lockerCodeAlternative: "Lub wpisz kod Paczkomatu", lockerPlaceholder: "np. WAW01M", findLocker: "Znajdź punkt",
      lockerHint: "Otwórz oficjalną mapę InPost, wybierz Paczkomat i wpisz tutaj jego krótki kod.", lockerRequired: "Przed płatnością wybierz lub wpisz prawidłowy Paczkomat InPost.",
      checkout: "Bezpieczna płatność", opening: "Otwieranie bezpiecznej płatności…", powered: "Bezpieczne płatności obsługuje Stripe", error: "Nie udało się rozpocząć płatności.", cartLabel: "Koszyk: {count} produktów",
      guestCheckout: "Konto nie jest wymagane", stripeProtection: "Szyfrowana płatność obsługiwana przez Stripe", deliveryReturns: "Sprawdź dostawę i zwroty",
    },
    checkout: {
      received: "Płatność otrzymana", thanks: "Dziękujemy za zamówienie", text: "Stripe wyśle e-mail z potwierdzeniem płatności. Przygotujemy nowy strój Twojego pupila i skontaktujemy się z informacją o wysyłce.",
      continue: "Kontynuuj zakupy", home: "Wróć na stronę główną", activating: "Płatności są właśnie uruchamiane. Spróbuj ponownie za chwilę.", invalidRequest: "Nieprawidłowe żądanie płatności.", invalidCart: "Twój koszyk jest nieprawidłowy.",
      changed: "Produkt w koszyku uległ zmianie. Odśwież stronę i spróbuj ponownie.", failed: "Nie udało się rozpocząć płatności. Spróbuj ponownie.", invalidLocker: "Wybierz prawidłowy Paczkomat InPost.", freeShipping: "Darmowa dostawa", standardShipping: "Dostawa standardowa", inPostLocker: "InPost Paczkomat® 24/7", freeInPost: "Darmowa dostawa InPost Paczkomat® 24/7",
    },
    pages: {back: "← Wróć na stronę główną"},
    blog: {eyebrow: "Dziennik Furry Fairy", title: "Pomocne pomysły na życie z pupilem", intro: "Praktyczne poradniki, przemyślane inspiracje i historie ze świata Furry Fairy.", emptyTitle: "Pierwsze historie są już w drodze", emptyText: "Wpisy blogowe można teraz tworzyć i publikować bezpośrednio w Sanity.", read: "Czytaj artykuł", back: "← Wróć do bloga"},
  },
} as const;

export type Dictionary = (typeof dictionaries)["en"] | (typeof dictionaries)["pl"];

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "pl";
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
