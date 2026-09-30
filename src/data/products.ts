import { Product, ProductCategory } from '../types/jewelry';

import heroImg from '../assets/images/lume_hero_campaign_1790661421055.jpg';
import necklaceImg from '../assets/images/jewelry_necklace_pendant_1790660929519.jpg';
import artisanImg from '../assets/images/jewelry_artisan_craft_1790660955731.jpg';
import ringImg from '../assets/images/jewelry_gold_ring_1790660970940.jpg';

export { heroImg, necklaceImg, artisanImg, ringImg };

export const CATEGORIES: {
  slug: ProductCategory;
  title: string;
  tagline: string;
  count: number;
  image: string;
  description: string;
}[] = [
  {
    slug: 'necklaces',
    title: 'Necklaces',
    tagline: 'Luminescent collarbones & layered chains',
    count: 2,
    image: necklaceImg,
    description: 'Delicate chokers, sculpted baroque pearls, and textured pendants handcrafted for effortless layering from sunrise to evening.'
  },
  {
    slug: 'bracelets',
    title: 'Bracelets',
    tagline: 'Sculpted cuffs & woven chains',
    count: 2,
    image: 'https://images.unsplash.com/photo-1611591475152-4783113f60bc?auto=format&fit=crop&w=800&q=80',
    description: 'Hammered gold cuffs and fluid rope chains crafted to dance upon the wrist with quiet, luminous elegance.'
  },
  {
    slug: 'earrings',
    title: 'Earrings',
    tagline: 'Cascading drops & organic hoops',
    count: 2,
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
    description: 'Weightless waterdrop huggies and iridescent freshwater pearl drops shaped to capture and scatter natural daylight.'
  },
  {
    slug: 'rings',
    title: 'Rings',
    tagline: 'Molten textures & bezel solitaires',
    count: 2,
    image: ringImg,
    description: 'Tactile band rings sculpted in lost-wax casting, crowned with shimmering natural gemstones and molten gold contours.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Aura Baroque Pearl Choker',
    tagline: 'Organic freshwater pearl on handcrafted 18k gold wire',
    price: 185,
    category: 'necklaces',
    rating: 4.9,
    reviewCount: 38,
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    description: 'The Aura Choker marries the raw, unrepeatable geometry of hand-selected freshwater baroque pearls with a sculptural 18k gold vermeil chain. Every pearl is individually knotted on botanical silk cord and finished with a custom toggle clasp forged by hand in our studio.',
    story: 'Conceived along the Mediterranean shoreline, the Aura Choker celebrates natural asymmetry. No two pearls are ever twin sisters—each displays its own iridescent luster, subtle ripples, and organic silhouette.',
    materials: 'Ethically sourced AAA Freshwater Baroque Pearl, 18k Solid Gold Vermeil over 925 Recycled Sterling Silver, hypoallergenic nickel-free alloy.',
    sizingDetails: '15-inch collar chain with a 2.5-inch micro-link extension. Baroque pearl drop spans approximately 18–22mm in natural diameter.',
    colorOptions: ['Champagne Gold', 'Soft Rose Gold', 'Lustrous Silver'],
    galleryImages: [
      necklaceImg,
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'rev-101',
        author: 'Eleanor Vance',
        rating: 5,
        date: 'February 14, 2026',
        verified: true,
        title: 'Breathtaking luminosity in real life',
        comment: 'The baroque pearl has a subtle lavender-pink luster that pictures cannot do justice to. It feels weightless yet substantial on the collarbone. Wore it to my gallery opening and received endless compliments.'
      },
      {
        id: 'rev-102',
        author: 'Camille Delacroix',
        rating: 4.8,
        date: 'January 28, 2026',
        verified: true,
        title: 'My everyday signature piece',
        comment: 'The clasp is remarkably easy to fasten and the gold has not tarnished after weeks of daily wear. The packaging with the embossed linen box made unboxing feel like a personal ceremony.'
      }
    ]
  },
  {
    id: 2,
    name: 'Solstice Radiant Gold Bangle',
    tagline: 'Hammered contour cuff with celestial micro-grooves',
    price: 145,
    category: 'bracelets',
    rating: 4.8,
    reviewCount: 29,
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    description: 'Forged from solid recycled brass coated in a luxurious 3-micron layer of 18k champagne gold, the Solstice Bangle features hand-chiseled facets that mirror twilight reflections across the wrist.',
    story: 'Inspired by ancient Roman torcs and the golden hour sun filtering through atelier shutters. Each piece is heated and hammered by our master metalsmith for over four hours to attain its distinctive satin-lustre texture.',
    materials: 'Recycled Jewelry Brass core layered with 3.0-micron 18k Champagne Gold plating, anti-tarnish protective organic ceramic seal.',
    sizingDetails: 'Malleable oval profile (62mm x 54mm internal diameter). Gently squeeze or expand to accommodate wrist circumferences from 5.5 to 7.2 inches.',
    colorOptions: ['Champagne Gold', 'Warm Rose Gold', 'Sterling Silver'],
    galleryImages: [
      'https://images.unsplash.com/photo-1611591475152-4783113f60bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'rev-201',
        author: 'Sienna Sterling',
        rating: 5,
        date: 'March 2, 2026',
        verified: true,
        title: 'Subtle, understated luxury',
        comment: 'The hammered texture catches the candlelight during dinner so beautifully. It stacks perfectly with my vintage watch without scratching.'
      },
      {
        id: 'rev-202',
        author: 'Margot Lindqvist',
        rating: 4.6,
        date: 'February 19, 2026',
        verified: true,
        title: 'Incredible weight and finish',
        comment: 'I was worried it might feel flimsy, but it is wonderfully solid while still comfortably moldable to my small wrist.'
      }
    ]
  },
  {
    id: 3,
    name: 'Celeste Hammered Moonstone Ring',
    tagline: 'Iridescent blue-flash cabochon in a bezel cup',
    price: 120,
    category: 'rings',
    rating: 5.0,
    reviewCount: 42,
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    description: 'A genuine natural Rainbow Moonstone cabochon cradled within a hand-hammered 18k gold bezel. As light glances across the stone, it reveals mesmerizing adularescence that shifts between milky frost and deep azure blue.',
    story: 'Cut by hand in small artisan batches in Sri Lanka, our moonstones are chosen for their deep blue adularescent flash. The organic band is crafted to evoke gentle ocean waves.',
    materials: 'Natural Rainbow Moonstone (Grade AAA, 8mm round), 18k Solid Gold Vermeil over 925 Sterling Silver.',
    sizingDetails: 'Available in US standard ring sizes 5, 6, 7, 8, and 9. Band width measures 2.2mm at narrowest point for stacking ease.',
    colorOptions: ['Champagne Gold', 'Sterling Silver', 'Rose Gold'],
    galleryImages: [
      ringImg,
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'rev-301',
        author: 'Valerie Fontaine',
        rating: 5,
        date: 'March 10, 2026',
        verified: true,
        title: 'The blue flash is hypnotic',
        comment: 'I cannot stop staring at my hand under office lamps and sunlight. The craftsmanship is flawless and the bezel setting never catches on knit sweaters.'
      },
      {
        id: 'rev-302',
        author: 'Isla Beaumont',
        rating: 5,
        date: 'January 14, 2026',
        verified: true,
        title: 'A talisman of peace',
        comment: 'Lumé customer care helped me confirm my exact ring size before shipping. It arrived in three days and fits like a bespoke dream.'
      }
    ]
  },
  {
    id: 4,
    name: 'Elysian Waterdrop Huggie Earrings',
    tagline: 'Sculptural molten droplets on secure hinge clasps',
    price: 95,
    category: 'earrings',
    rating: 4.9,
    reviewCount: 51,
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    description: 'Gracefully tapering liquid gold silhouettes that gently hug the lobe. Engineered with a hidden click-close hinge mechanism for effortless all-day comfort without tugging or pinching.',
    story: 'Designed to mimic morning dew clinging to autumn rose stems. The hollowed inner core keeps them astonishingly featherweight while projecting rich, solid luxury volume.',
    materials: 'Electroformed 18k Champagne Gold Vermeil over Recycled Sterling Silver, titanium hypoallergenic earring posts.',
    sizingDetails: 'Outer diameter: 14mm. Drop length: 18mm. Total pair weight: only 3.8 grams for all-day featherweight comfort.',
    colorOptions: ['Champagne Gold', 'Polished Silver', 'Soft Rose Gold'],
    galleryImages: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'rev-401',
        author: 'Charlotte Chen',
        rating: 5,
        date: 'February 22, 2026',
        verified: true,
        title: 'I sleep in them without noticing',
        comment: 'As someone with extremely sensitive ears, finding gold huggies that do not irritate after 8 hours is rare. These have caused zero reaction and look so chic.'
      },
      {
        id: 'rev-402',
        author: 'Audrey Sinclair',
        rating: 4.8,
        date: 'February 5, 2026',
        verified: true,
        title: 'Modern and timeless all at once',
        comment: 'The droplet shape is so graceful. Elevates even a plain white t-shirt and blazer into an editorial look.'
      }
    ]
  },
  {
    id: 5,
    name: 'Seraphina Layered Coin Necklace',
    tagline: 'Ancient hammered medallion on double micro-curb chain',
    price: 160,
    category: 'necklaces',
    rating: 4.8,
    reviewCount: 24,
    isFeatured: false,
    isBestSeller: false,
    inStock: true,
    description: 'An evocative antique coin medallion bearing the embossed symbol of Sol and morning flora, suspended from two delicately offset gold chains that fall in effortless harmony.',
    story: 'Cast from a vintage heirloom seal discovered at a Parisian flea market, the Seraphina brings timeless mythology into modern everyday wardrobing.',
    materials: 'Solid Recycled Sterling Silver layered in 18k Yellow Gold (2.5 micron vermeil), diamond-cut cable chain.',
    sizingDetails: 'Inner chain: 16 inches. Outer medallion chain: 18 inches. Includes 2-inch extender to adjust tiering depth.',
    colorOptions: ['Champagne Gold', 'Antique Silver', 'Rose Gold'],
    galleryImages: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80',
      necklaceImg,
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'rev-501',
        author: 'Genevieve Roy',
        rating: 5,
        date: 'March 1, 2026',
        verified: true,
        title: 'The two chains never tangle!',
        comment: 'Usually layered necklaces twist into knots after an hour. Lumé included a clever double-clasp separator that keeps the strands perfectly aligned all day long.'
      },
      {
        id: 'rev-502',
        author: 'Nora Al-Mansoor',
        rating: 4.6,
        date: 'January 30, 2026',
        verified: true,
        title: 'Exquisite coin detail',
        comment: 'The relief on the medallion is soft and antique, not cheap or shiny. Truly feels like a museum heirloom.'
      }
    ]
  },
  {
    id: 6,
    name: 'Verona Twisted Rope Bracelet',
    tagline: 'Intertwined golden strands with custom bar closure',
    price: 115,
    category: 'bracelets',
    rating: 4.7,
    reviewCount: 18,
    isFeatured: false,
    isBestSeller: false,
    inStock: true,
    description: 'Twin strands of 18k gold wire manually braided by our atelier craftsmen into a fluid, tactile rope that glides effortlessly against the wrist.',
    story: 'Woven using age-old Venetian wire braiding techniques, Verona balances classical European elegance with a modern minimalist silhouette.',
    materials: '18k Champagne Gold Plated Brass, hand-burnished satin gloss finish.',
    sizingDetails: 'Chain length 6.75 inches plus 1.25 inch adjustable link chain. Lobster clasp with Lumé monogram charm tag.',
    colorOptions: ['Champagne Gold', 'Sterling Silver', 'Two-Tone Gold & Silver'],
    galleryImages: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611591475152-4783113f60bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'rev-601',
        author: 'Beatriz Morales',
        rating: 5,
        date: 'February 11, 2026',
        verified: true,
        title: 'Delicate yet surprisingly durable',
        comment: 'I wear this every single day to work. The braid catches the light in three dimensions. Gorgeous packaging too!'
      },
      {
        id: 'rev-602',
        author: 'Hannah Davies',
        rating: 4.4,
        date: 'January 18, 2026',
        verified: true,
        title: 'Lovely warm gold tone',
        comment: 'Not that garish yellow gold you see elsewhere. It has that refined Parisian champagne warmth.'
      }
    ]
  },
  {
    id: 7,
    name: 'Iris Freshwater Pearl Drop Earrings',
    tagline: 'Cascading baroque seed pearls on gold stem hoops',
    price: 130,
    category: 'earrings',
    rating: 4.9,
    reviewCount: 33,
    isFeatured: false,
    isBestSeller: false,
    inStock: true,
    description: 'Suspended like morning blossoms, three graduating natural seed pearls dangle from a slender 18k gold arc. Moves gracefully with every turn of the head.',
    story: 'Handcrafted pearl-by-pearl in our studio. We select only the highest luster pearls with creamy white hues and natural pink overtones.',
    materials: 'Natural Cultured Freshwater Seed Pearls (4mm, 6mm, 8mm), 18k Gold Plated Sterling Silver wire stems.',
    sizingDetails: 'Total earring drop length: 32mm. Ultra-lightweight at 2.4g per earring.',
    colorOptions: ['Champagne Gold', 'Sterling Silver'],
    galleryImages: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
      necklaceImg
    ],
    reviews: [
      {
        id: 'rev-701',
        author: 'Seraphine Dubois',
        rating: 5,
        date: 'March 8, 2026',
        verified: true,
        title: 'Wore these for my wedding ceremony',
        comment: 'They matched my ivory lace gown beyond perfection. The movement is so soft and poetical. Will treasure them forever.'
      },
      {
        id: 'rev-702',
        author: 'Amara Okafor',
        rating: 4.8,
        date: 'February 17, 2026',
        verified: true,
        title: 'Unbelievably lightweight and pretty',
        comment: 'They do not pull down on my earlobes at all. High grade pearls with great luster.'
      }
    ]
  },
  {
    id: 8,
    name: 'Ophelia Bezel Solitaire Signet Ring',
    tagline: 'Modern tapered signet set with a brilliant moissanite crystal',
    price: 155,
    category: 'rings',
    rating: 4.9,
    reviewCount: 27,
    isFeatured: false,
    isBestSeller: false,
    inStock: true,
    description: 'A contemporary reimagining of the classic signet ring. Features a soft pillowed face flush-set with a sparkling ethical moissanite, finished in our signature brushed champagne gold.',
    story: 'Ophelia symbolizes inner strength and quiet self-possession. Hand-carved in micro-crystalline jewelers wax before casting in recycled gold.',
    materials: 'Lab-Grown Conflict-Free Moissanite (VVS1 Clarity, D Color, 0.5ct equivalent), 18k Gold Vermeil over 925 Recycled Silver.',
    sizingDetails: 'Available in US ring sizes 5, 6, 7, 8, 9, 10. Front plate width: 9mm. Solid comfort-fit tapered shank.',
    colorOptions: ['Champagne Gold', 'Sterling Silver', 'Rose Gold'],
    galleryImages: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
      ringImg,
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'rev-801',
        author: 'Maya Lin',
        rating: 5,
        date: 'February 27, 2026',
        verified: true,
        title: 'Stunning everyday signet',
        comment: 'I wear this on my pinky finger and it is bold yet so refined. The satin brushed gold looks like 24k solid jewelry from an antique Parisian collection.'
      },
      {
        id: 'rev-802',
        author: 'Elena Rossi',
        rating: 4.8,
        date: 'January 22, 2026',
        verified: true,
        title: 'The moissanite sparkles endlessly',
        comment: 'Catches every sliver of light. The flush bezel setting means it never snags on silk blouses.'
      }
    ]
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote: "Lumé's baroque pearl choker has become my most treasured possession. The organic texture and weight of the gold are unmatched by any luxury house I have bought from.",
    author: "Genevieve L.",
    city: "Paris, France",
    itemPurchased: "Aura Baroque Pearl Choker",
    rating: 5
  },
  {
    id: 2,
    quote: "Knowing every single piece is handcrafted with recycled precious metals and ethical pearls makes wearing Lumé feel truly meaningful. The unboxing alone brought tears.",
    author: "Helena Rostova",
    city: "Stockholm, Sweden",
    itemPurchased: "Solstice Radiant Gold Bangle",
    rating: 5
  },
  {
    id: 3,
    quote: "The moonstone in my Celeste ring has a deep cerulean flash that shifts as I move my hands. Exceptional craftsmanship, heirloom quality, and remarkably prompt delivery.",
    author: "Claire Sterling",
    city: "New York, USA",
    itemPurchased: "Celeste Moonstone Ring",
    rating: 5
  }
];

export const CRAFT_STEPS = [
  {
    step: '01',
    title: 'Wax Carving & Sculptural Design',
    desc: 'Each jewel begins as a hand-sculpted wax master model, allowing organic textures, molten ripples, and soft human contours that CAD machines cannot replicate.'
  },
  {
    step: '02',
    title: 'Lost-Wax Casting in Recycled Gold',
    desc: 'We melt 100% recycled 18k solid gold and sterling silver, pouring the molten alloy into ceramic investment molds under controlled vacuum pressure.'
  },
  {
    step: '03',
    title: 'Individual Gem & Pearl Selection',
    desc: 'Every baroque pearl and gemstone is hand-examined for unique adularescence, luster, and structural purity. No artificial coatings or dyes are ever used.'
  },
  {
    step: '04',
    title: 'Bench Setting, Polishing & Finishing',
    desc: 'Our master goldsmiths hand-set every bezel and burnish the metal surfaces through five graduating grades of pumice and satin polish for a luminous heirloom glow.'
  }
];

export const FAQS = [
  {
    question: 'How long does shipping take and what are the delivery costs?',
    answer: 'We offer Free Express Insured Shipping on all orders over $150. Orders under $150 ship at a flat rate of $12. Because each piece is hand-finished in our studio, please allow 1–2 business days for crafting prior to dispatch. Standard transit is 2–4 business days within North America and Europe with tracked courier service.'
  },
  {
    question: 'What materials are used in Lumé jewelry?',
    answer: 'We use exclusively 18k Solid Gold Vermeil (a thick 2.5 to 3.0 micron layer of pure 18k gold over hypoallergenic 925 Recycled Sterling Silver), solid 18k gold, and ethically sourced natural gemstones and freshwater pearls. All alloys are 100% nickel-free and cadmium-free.'
  },
  {
    question: 'What is your return and exchange policy?',
    answer: 'We want you to adore your Lumé creation. We offer a 30-day trial period from the date of delivery. If you are not completely enchanted, return your unworn piece in its original gift packaging for a full refund or complimentary exchange. We provide pre-paid return labels for domestic shipments.'
  },
  {
    question: 'How do I care for and maintain my jewelry?',
    answer: 'To preserve the golden luster, gently wipe your jewelry with the micro-suede polishing cloth provided in every gift box. Avoid direct contact with harsh perfumes, chlorine pools, and abrasive chemicals. Store your piece in the velvet-lined Lumé pouch when not being worn.'
  },
  {
    question: 'How do I determine my correct ring size?',
    answer: 'We follow standard US ring sizing. If you are between sizes, we recommend sizing up for wider band rings. You can also contact our concierge for a complimentary reusable Lumé ring sizer mailed directly to your home.'
  }
];

export const INSTAGRAM_PHOTOS = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
    caption: 'Morning light dancing on the Aura Choker.'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
    caption: 'Celeste in candlelight. Hand-hammered perfection.'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    caption: 'Stacking Solstice and Verona on sunny afternoons.'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80',
    caption: 'Elysian droplets: light as air, rich as sunlight.'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
    caption: 'Inside our bench workshop: where raw gold becomes art.'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80',
    caption: 'Ophelia Signet resting on natural travertine.'
  }
];
