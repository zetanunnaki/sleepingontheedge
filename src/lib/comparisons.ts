/**
 * Comparison data shared between /compare (index) and /compare/[slug] (detail).
 *
 * Each comparison has:
 *   - summary: short headline + 1-line answer for the index page
 *   - detail: structured head-to-head content for the detail page
 *
 * To add a new comparison, add an entry here and it will appear on both pages.
 */

export interface ComparisonSection {
  heading: string;
  body: string;
}

export interface ComparisonDetail {
  slug: string;
  productA: string;
  productB: string;
  /** Short headline shown on the index card and detail header */
  question: string;
  /** One-sentence answer shown on the index card */
  tagline: string;
  /** 1-2 paragraph intro for the detail page */
  intro: string;
  /** Roundup this comparison belongs to (for back-link) */
  roundupHref: string;
  roundupTitle: string;
  /** "Choose X if..." bullet lists */
  chooseA: string[];
  chooseB: string[];
  /** Winner by category */
  categories: Array<{
    category: string;
    winner: "A" | "B" | "tie";
    reason: string;
  }>;
  /** FAQ q/a pairs specific to this comparison */
  faqs: Array<{ q: string; a: string }>;
}

export const COMPARISONS: ComparisonDetail[] = [
  {
    slug: "hatch-vs-loftie",
    productA: "hatch-restore-2",
    productB: "loftie-clock",
    question: "Hatch Restore 2 vs. Loftie Clock",
    tagline:
      "Hatch is the all-in-one bedside platform. Loftie is the minimalist design-first pick. Choose routines or aesthetics.",
    intro:
      "Both the Hatch Restore 2 and the Loftie Clock are designed to solve the same problem — replacing your phone as a bedside alarm — but they approach it from opposite directions. The Hatch is a **maximalist platform**: sunrise light, sound machine, sleep stories, wind-down routines, smart home integration, all in one device. The Loftie is a **minimalist clock**: a gentle two-stage alarm, a library of sleep sounds, and an aesthetic that actually looks good on a nightstand. The right pick depends on whether you want one device that replaces five others, or one beautiful object that does less but does it elegantly.",
    roundupHref: "/best/best-minimalist-bedside-clocks",
    roundupTitle: "Best minimalist bedside clocks",
    chooseA: [
      "You want one device to replace sound machine + alarm + nightlight + sunrise lamp",
      "Programmable wind-down routines appeal to you",
      "You already use Alexa or Google Home and want integration",
      "You're fine with occasional app interaction for complex settings",
    ],
    chooseB: [
      "You want the nightstand to look minimalist and uncluttered",
      "You want minimal phone dependency day-to-day",
      "You specifically want a two-stage gentle alarm",
      "You already have a separate sound machine and don't need all-in-one",
    ],
    categories: [
      {
        category: "All-in-one features",
        winner: "A",
        reason:
          "Hatch replaces 3–4 separate devices with one unit. Loftie is focused on clock + alarm + basic sounds.",
      },
      {
        category: "Design aesthetic",
        winner: "B",
        reason:
          "Loftie is the more refined minimalist design. Hatch looks more like a functional device.",
      },
      {
        category: "Phone-free experience",
        winner: "B",
        reason:
          "Loftie can be used entirely without your phone after setup. Hatch benefits from the app for routine changes.",
      },
      {
        category: "Smart home integration",
        winner: "A",
        reason:
          "Hatch works with Alexa and Google Home. Loftie is more standalone.",
      },
      {
        category: "Alarm effectiveness for heavy sleepers",
        winner: "A",
        reason:
          "Hatch has brighter sunrise light, which matters for deep sleepers. Loftie's two-stage alarm is gentler but less bright.",
      },
      {
        category: "Price",
        winner: "tie",
        reason:
          "Both cost around $165–170. Similar price, different feature tradeoffs.",
      },
    ],
    faqs: [
      {
        q: "Which has better sleep sounds?",
        a: "The Hatch has a bigger built-in library with more variety. The Loftie has high-quality sounds but fewer options. Both have some content behind a subscription tier, but the free tiers are sufficient for most users.",
      },
      {
        q: "Does either work without Wi-Fi?",
        a: "Both need Wi-Fi for initial setup. After that, the Loftie runs mostly offline for day-to-day use; the Hatch benefits from Wi-Fi to sync routine changes but core alarm functions work without it.",
      },
      {
        q: "Which is better for couples on different schedules?",
        a: "Hatch, because you can program different routines and wake times more flexibly. Loftie has simpler alarm configuration.",
      },
    ],
  },
  {
    slug: "oura-vs-fitbit",
    productA: "oura-ring-gen-3",
    productB: "fitbit-charge-6",
    question: "Oura Ring Gen 3 vs. Fitbit Charge 6",
    tagline:
      "Oura is the premium ring with better accuracy. Fitbit is the no-subscription option at half the price. Choose data purity or total cost.",
    intro:
      "These are the two best-reviewed non-watch sleep trackers, and they're aimed at very different buyers. **Oura Ring Gen 3** is a premium ring with the best heart rate and HRV accuracy in consumer wearables, published validation studies against polysomnography, and a discreet form factor. **Fitbit Charge 6** is a wrist band with most of the same sleep metrics, 6+ day battery life, and — critically — no required subscription. Over 2 years of use, the total cost picture is very different: Oura ~$444 (device + subscription), Fitbit ~$160.",
    roundupHref: "/best/best-sleep-trackers",
    roundupTitle: "Best sleep trackers",
    chooseA: [
      "You want the most accurate sleep and heart rate data",
      "You prefer a ring form factor over a wristband",
      "You want published validation against polysomnography",
      "You're comfortable paying a subscription for advanced insights",
    ],
    chooseB: [
      "You specifically don't want a subscription",
      "You want 6+ days of battery life without nightly charging",
      "You're cost-conscious and don't want to pay ongoing fees",
      "You also want basic smartwatch features (notifications, payments)",
    ],
    categories: [
      {
        category: "Sleep tracking accuracy",
        winner: "A",
        reason:
          "Oura has published peer-reviewed validation studies. Finger-based heart rate is more accurate than wrist.",
      },
      {
        category: "Subscription model",
        winner: "B",
        reason:
          "Fitbit gives you sleep stages and core data free forever. Oura gates most features behind $6/month.",
      },
      {
        category: "Battery life",
        winner: "B",
        reason:
          "Fitbit 6–7 days vs. Oura 4–7 days. Marginal difference but Fitbit wins on consistency.",
      },
      {
        category: "Form factor",
        winner: "A",
        reason:
          "A ring is more discreet and comfortable for sleep than a wristband for most users.",
      },
      {
        category: "Additional features",
        winner: "B",
        reason:
          "Fitbit has notifications, Google Maps, Wallet. Oura is sleep/recovery-focused only.",
      },
      {
        category: "Total 2-year cost",
        winner: "B",
        reason:
          "Fitbit ~$160 total. Oura ~$300 + $144 subscription = $444. Fitbit is 2.8x cheaper.",
      },
    ],
    faqs: [
      {
        q: "Is Oura really worth 3x the total cost?",
        a: "For people who specifically want the most accurate sleep data and validated sleep stage classification, yes — Oura has better published accuracy. For trend tracking and habit-change monitoring, the Fitbit is more than sufficient and saves significant money.",
      },
      {
        q: "Does Fitbit track sleep stages without Premium?",
        a: "Yes. Light, deep, and REM sleep breakdowns are in the free tier. Premium unlocks additional 'sleep profile' insights and advanced coaching, but the core sleep data is free.",
      },
      {
        q: "Which is better for side sleepers?",
        a: "Oura slightly wins because a ring doesn't press against the pillow the way a wristband can. But the Fitbit Charge 6 is thin enough that most side sleepers don't find it uncomfortable.",
      },
    ],
  },
  {
    slug: "yogasleep-vs-lectrofan",
    productA: "yogasleep-dohm",
    productB: "lectrofan-evo",
    question: "Yogasleep Dohm vs. LectroFan EVO",
    tagline:
      "Dohm is a real fan (never loops). LectroFan is electronic with 22 sound options. Choose natural texture or variety.",
    intro:
      "Both lead aggregated sound machine reviews, but they represent two fundamentally different approaches to masking noise. The **Yogasleep Dohm** is a mechanical device: a real fan inside an acoustic housing that generates broadband white noise by physically moving air. Because there's no audio loop, the sound is genuinely continuous and never repeats. The **LectroFan EVO** is an electronic device that generates (not plays back) 22 different sounds — 10 fan-type, 10 nature, plus ocean and rain — with precise volume control and a sleep timer. Tinnitus sufferers and purists prefer the Dohm; variety-seekers and severe-noise maskers prefer the EVO.",
    roundupHref: "/best/best-sound-machines",
    roundupTitle: "Best sound machines",
    chooseA: [
      "You want a truly loop-free sound (critical for tinnitus and sensitive listeners)",
      "You value maximum durability (60+ year product line, 10+ year reviews common)",
      "You only need one sound and want simple operation",
      "You prefer natural airflow texture over electronic sound",
    ],
    chooseB: [
      "You need higher maximum volume for severe noise environments",
      "You want multiple sound options (white, pink, brown, nature sounds)",
      "You want precise volume control via dial",
      "You travel occasionally and want a timer option",
    ],
    categories: [
      {
        category: "Sound naturalness",
        winner: "A",
        reason:
          "Real fan moving air produces genuinely natural white noise. Electronic generation is close but not identical.",
      },
      {
        category: "Loop-free guarantee",
        winner: "A",
        reason:
          "Dohm is mechanical — there's physically no loop. EVO uses generated audio that avoids loops but is still electronic.",
      },
      {
        category: "Sound variety",
        winner: "B",
        reason:
          "LectroFan EVO has 22 sounds. Dohm has one (fan).",
      },
      {
        category: "Maximum volume",
        winner: "B",
        reason:
          "LectroFan EVO goes louder than the Dohm, which matters for masking heavy traffic or loud neighbors.",
      },
      {
        category: "Durability",
        winner: "A",
        reason:
          "Yogasleep has sold the Dohm for 60+ years. 10-year reviews are common. LectroFan is electronic and has a shorter expected lifespan.",
      },
      {
        category: "Price",
        winner: "tie",
        reason:
          "Both ~$50–60. Similar price, different value propositions.",
      },
    ],
    faqs: [
      {
        q: "Which is better for tinnitus?",
        a: "The Dohm. Tinnitus sufferers are uniquely sensitive to audio loops, and the Dohm is physically incapable of looping because the sound is generated by a real moving fan. Aggregated tinnitus reviews consistently rank the Dohm above electronic alternatives.",
      },
      {
        q: "Does the LectroFan's loop-free generation actually sound different from a real fan?",
        a: "Slightly. The EVO's generated sound is clean and consistent, but some long-term Dohm users describe the real-fan texture as warmer and more 'organic.' Most users can't tell the difference after the first week, but purists consistently prefer the Dohm.",
      },
      {
        q: "Can I use either for a baby nursery?",
        a: "Yes, at moderate volume (below 50 dB at the crib, per AAP guidelines) and with the machine positioned at least 7 feet from the baby. Both work for babies, though the EVO's variety makes it easier to find a sound that calms a specific baby.",
      },
    ],
  },
  {
    slug: "tempur-vs-coop",
    productA: "tempur-neck-pillow",
    productB: "coop-eden-pillow",
    question: "TEMPUR-Neck vs. Coop Eden",
    tagline:
      "TEMPUR-Neck is a structured contour pillow for chronic pain. Coop Eden is adjustable shredded foam that lets you dial in exact loft. Choose structured support or customization.",
    intro:
      "Both are top-rated pillows for side sleepers, but they solve neck pain via fundamentally different approaches. The **TEMPUR-Neck** is a contoured ergonomic pillow with a fixed raised neck ridge — it's structurally designed to hold the cervical spine in alignment. The **Coop Home Goods Eden** is an adjustable shredded memory foam pillow that lets you add or remove fill until the loft matches your exact body. For chronic pain sufferers who want prescribed structure, the TEMPUR wins. For anyone whose loft needs might change or who wants flexibility, the Coop wins.",
    roundupHref: "/best/best-pillows-neck-pain",
    roundupTitle: "Best pillows for neck pain",
    chooseA: [
      "You have chronic or severe cervical pain that needs structured support",
      "You've confirmed your ideal loft and want a pillow that holds it firmly",
      "You don't want to iterate or adjust — you want it right out of the box",
      "You're willing to trade heat retention for support",
    ],
    chooseB: [
      "You're not sure what loft you need and want to iterate",
      "You share the pillow or your body changes over time",
      "You sleep warm and need the breathability of shredded fill",
      "You want the flexibility to modify the pillow as your needs change",
    ],
    categories: [
      {
        category: "Structured support",
        winner: "A",
        reason:
          "TEMPUR-Neck's contour is designed specifically for cervical alignment. Coop is more flexible but less prescriptive.",
      },
      {
        category: "Adjustability",
        winner: "B",
        reason:
          "Coop ships with extra fill for custom loft. TEMPUR is fixed.",
      },
      {
        category: "Heat management",
        winner: "B",
        reason:
          "Shredded fill breathes. Solid memory foam traps heat.",
      },
      {
        category: "Break-in period",
        winner: "B",
        reason:
          "Coop is usable immediately after adjustment. TEMPUR foam takes 1–2 weeks to soften.",
      },
      {
        category: "Durability",
        winner: "tie",
        reason:
          "Both hold shape well over 3–5 years with proper care.",
      },
      {
        category: "Price",
        winner: "B",
        reason:
          "Coop is roughly 30–40% cheaper for comparable quality.",
      },
    ],
    faqs: [
      {
        q: "I have severe chronic neck pain — is TEMPUR worth it?",
        a: "For severe chronic pain specifically, yes. The structured ridge is the feature that most reviewers with serious cervical issues cite as essential. For moderate pain, the Coop's adjustability often solves the problem at lower cost.",
      },
      {
        q: "Which is better for side sleepers?",
        a: "Coop, for most side sleepers, because you can dial in the exact loft your shoulder width needs. TEMPUR is fixed at one size, which works for some body types and not others.",
      },
      {
        q: "Does either work for back sleepers?",
        a: "Yes, both. Adjust the Coop's fill lower for back sleeping. Use the TEMPUR's lower central zone for back position.",
      },
    ],
  },
  {
    slug: "zinus-vs-purple",
    productA: "zinus-memory-foam-mattress",
    productB: "purple-mattress",
    question: "Zinus Green Tea vs. Purple Mattress",
    tagline:
      "Zinus is the best budget memory foam mattress. Purple uses a unique hyper-elastic grid for different pressure relief. Choose budget or unique feel.",
    intro:
      "These two mattresses target opposite ends of the market but are both consistently top-rated for back pain. **Zinus Green Tea** is a traditional 3-layer memory foam mattress at roughly 1/4 the price of premium alternatives — it delivers solid medium-firm support for most sleepers without the premium branding markup. **Purple** uses a hyper-elastic polymer grid (not foam) that flexes under concentrated pressure points while staying firm under distributed pressure, which gives it an almost-unique feel: soft where it needs to be, firm where it needs to be. Both work for back pain; the choice comes down to budget and feel preference.",
    roundupHref: "/best/best-mattress-back-pain",
    roundupTitle: "Best mattresses for back pain",
    chooseA: [
      "Your budget is under $500",
      "You want traditional memory foam feel (sink-in, conforming)",
      "You're furnishing a guest room or temporary situation",
      "You want the most-reviewed option in its price range",
    ],
    chooseB: [
      "You have significant pressure point issues (hips, shoulders)",
      "You sleep hot — Purple's grid structure breathes better than foam",
      "You want a unique feel you can't get from foam alternatives",
      "Your budget is ~$1,500 and you want the premium category",
    ],
    categories: [
      {
        category: "Price",
        winner: "A",
        reason:
          "Zinus is ~$400 for a queen. Purple is ~$1,500 for a queen. Zinus is 4x cheaper.",
      },
      {
        category: "Pressure relief (hips, shoulders)",
        winner: "B",
        reason:
          "Purple's grid flexes specifically where weight concentrates. Memory foam conforms but doesn't localize the way the grid does.",
      },
      {
        category: "Cooling",
        winner: "B",
        reason:
          "Open grid structure allows air flow. Memory foam traps heat.",
      },
      {
        category: "Firmness for back pain",
        winner: "tie",
        reason:
          "Both land in the medium-firm zone that sleep research links to best back-pain outcomes.",
      },
      {
        category: "Lifespan",
        winner: "B",
        reason:
          "Purple's hyper-elastic polymer holds up 8–10+ years. Zinus is typically 5–7 years before noticeable compression.",
      },
      {
        category: "Setup simplicity",
        winner: "tie",
        reason:
          "Both ship compressed in a box and self-inflate. Equivalent setup experience.",
      },
    ],
    faqs: [
      {
        q: "Is Purple actually worth 4x the price?",
        a: "For severe hot sleepers and people with significant pressure point issues, yes — the grid structure solves problems foam can't. For typical sleepers with moderate back pain, the Zinus at 1/4 the price is the smarter starting point. Many buyers return Purple because they don't like the unique feel.",
      },
      {
        q: "Which is better for back pain specifically?",
        a: "Both work. Aggregated reviews from back pain sufferers show roughly equal satisfaction in their respective price categories. The decision comes down to feel preference and budget, not pain outcome.",
      },
      {
        q: "Will the Zinus last long enough to justify not buying Purple?",
        a: "For 5–7 years of comfortable sleep, yes. After that, you'll likely need replacement. Over 10 years, you'd buy two Zinus mattresses ($800 total) vs one Purple ($1,500). Budget still wins on total cost unless you really value the grid feel.",
      },
    ],
  },
  {
    slug: "bamboo-vs-cotton",
    productA: "bedsure-bamboo-sheets",
    productB: "brooklinen-luxe-sheets",
    question: "Bedsure Bamboo vs. Brooklinen Luxe",
    tagline:
      "Bamboo wicks moisture fastest for night sweats. Premium cotton dries fastest between episodes. Both are good picks for hot sleepers — different strengths.",
    intro:
      "This is the budget-vs-premium sheet decision most hot sleepers face. **Bedsure Bamboo** is a bamboo viscose blend at under $40 that delivers most of the wicking and cooling benefits of premium bamboo at a fraction of the price. **Brooklinen Luxe** is a 480-thread-count long-staple cotton sateen set at ~$170 — not technically a 'cooling sheet,' but premium cotton percale/sateen breathes better than people expect and has durability advantages bamboo can't match. For night sweats specifically, bamboo wicks moisture faster during the sweat event. For steady hot sleeping, premium cotton often feels cooler because it dries faster and doesn't retain moisture after the sweat ends.",
    roundupHref: "/best/best-cooling-sheets",
    roundupTitle: "Best cooling sheets",
    chooseA: [
      "Your budget is under $50",
      "You have night sweats and need fastest moisture wicking",
      "You want the silky smooth hand of bamboo viscose",
      "You want to try cooling sheets without major investment",
    ],
    chooseB: [
      "You have the budget for premium quality",
      "You prefer crisp cotton over silky bamboo",
      "You want 5+ years of use from a single sheet set",
      "You want premium customer service and returns",
    ],
    categories: [
      {
        category: "Price",
        winner: "A",
        reason:
          "Bedsure is ~$40. Brooklinen Luxe is ~$170. 4x price difference.",
      },
      {
        category: "Wicking speed during sweat episodes",
        winner: "A",
        reason:
          "Bamboo viscose pulls moisture off the skin faster than cotton.",
      },
      {
        category: "Drying speed after sweat episodes",
        winner: "B",
        reason:
          "Cotton releases moisture faster than bamboo. For severe night sweats, this matters more than wicking speed.",
      },
      {
        category: "Durability",
        winner: "B",
        reason:
          "Premium long-staple cotton lasts 5+ years. Budget bamboo blends typically 1–3 years before pilling.",
      },
      {
        category: "Hand feel",
        winner: "tie",
        reason:
          "Polarizing — silky bamboo vs. crisp cotton is personal preference.",
      },
      {
        category: "Long-term value",
        winner: "B",
        reason:
          "Per-year cost is similar (Brooklinen lasts 3–4x longer), but premium cotton feels better from year 2 onward as it softens.",
      },
    ],
    faqs: [
      {
        q: "Is bamboo actually cooler than cotton?",
        a: "For the wicking phase (during sweat), yes. For the drying phase (after sweat), premium cotton often wins. Which matters more depends on whether your hot sleeping is episodic (night sweats) or steady (just running warm).",
      },
      {
        q: "Is Brooklinen worth 4x the price?",
        a: "For people who value premium quality and plan to use sheets for 5+ years, yes — the per-year cost is comparable and the feel is meaningfully better from year 2 onward. For someone on a budget or buying for a guest room, Bedsure wins on value.",
      },
      {
        q: "Can I get both at a middle price point?",
        a: "Yes — there are 100% bamboo viscose sheet sets in the $80–120 range that combine bamboo's wicking with better durability than budget blends. But neither of the two products in this specific comparison is at that middle tier.",
      },
    ],
  },
];

export function getComparisonBySlug(slug: string): ComparisonDetail | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}

export function getAllComparisonSlugs(): string[] {
  return COMPARISONS.map((c) => c.slug);
}
