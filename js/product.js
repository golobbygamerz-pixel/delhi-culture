/* ============================================================
   PRODUCT DATA — all items grouped by collection
   Save your images in assets/ with matching filenames
   ============================================================ */

const products = [
  /* ============ DENIM (your photos 1–5) ============ */
  {
    id: 1,
    collection: "denim",
    name: "Distressed Wide-Leg Denim",
    tag: "New Drop",
    price: 3499,
    oldPrice: 4299,
    img: "assets/denim-1.jpg",       // ← your 1st photo (side stripe denim)
    sizes: ["28","30","32","34","36"],
    note: "Mid-wash, side stripe, heavy distressing"
  },
  {
    id: 2,
    collection: "denim",
    name: "Classic Straight Fit Jeans",
    tag: "Best Seller",
    price: 2999,
    oldPrice: null,
    img: "assets/denim-2.jpg",       // ← your 2nd photo (clean straight jeans)
    sizes: ["28","30","32","34","36","38"],
    note: "Clean wash, straight leg, everyday pair"
  },
  {
    id: 3,
    collection: "denim",
    name: "Vintage Grey Baggy Denim",
    tag: "Limited",
    price: 3799,
    oldPrice: 4599,
    img: "assets/denim-3.jpg",       // ← your 3rd photo (grey baggy)
    sizes: ["30","32","34","36"],
    note: "Stone-washed grey, relaxed baggy fit"
  },
  {
    id: 4,
    collection: "denim",
    name: "Jet Black Carpenter Pants",
    tag: "New Drop",
    price: 3299,
    oldPrice: null,
    img: "assets/denim-4.jpg",       // ← your 4th photo (black carpenter)
    sizes: ["28","30","32","34","36"],
    note: "Double-knee, workwear inspired, jet black"
  },
  {
    id: 5,
    collection: "denim",
    name: "Bleached Distressed Denim",
    tag: "Sale",
    price: 2799,
    oldPrice: 3499,
    img: "assets/denim-5.jpg",       // ← your 5th photo (bleached ripped)
    sizes: ["30","32","34","36"],
    note: "Bleached wash, rip details, wide leg"
  },

  /* ============ WAFFLE (placeholder until you send photos) ============ */
  {
    id: 6,
    collection: "waffle",
    name: "Waffle Knit Oversized Tee",
    tag: "New",
    price: 1899,
    oldPrice: 2399,
    img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
    sizes: ["S","M","L","XL"],
    note: "Heavy waffle texture, dropped shoulder"
  },
  {
    id: 7,
    collection: "waffle",
    name: "Waffle Henley Long Sleeve",
    tag: "Trending",
    price: 2299,
    oldPrice: null,
    img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    sizes: ["S","M","L","XL"],
    note: "Warm, breathable, winter staple"
  },
  {
    id: 8,
    collection: "waffle",
    name: "Waffle Zip Hoodie",
    tag: "Limited",
    price: 2999,
    oldPrice: 3499,
    img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    sizes: ["S","M","L","XL"],
    note: "Full zip, waffle fleece, unisex fit"
  },

  /* ============ BOXY SHIRTS ============ */
  {
    id: 9,
    collection: "boxy",
    name: "Boxy Oxford Shirt",
    tag: "Best Seller",
    price: 2499,
    oldPrice: null,
    img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    sizes: ["S","M","L","XL"],
    note: "Crisp oxford, dropped shoulders, boxy cut"
  },
  {
    id: 10,
    collection: "boxy",
    name: "Boxy Flannel Overshirt",
    tag: "New",
    price: 2799,
    oldPrice: 3299,
    img: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=800&q=80",
    sizes: ["S","M","L","XL"],
    note: "Brushed flannel, boxy fit, chest pockets"
  },
  {
    id: 11,
    collection: "boxy",
    name: "Boxy Linen Shirt — Sand",
    tag: "Summer",
    price: 2699,
    oldPrice: null,
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
    sizes: ["S","M","L","XL"],
    note: "100% linen, relaxed, breathable"
  },
  {
    id: 12,
    collection: "boxy",
    name: "Boxy Corduroy Shirt",
    tag: "Limited",
    price: 2899,
    oldPrice: 3399,
    img: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80",
    sizes: ["S","M","L","XL"],
    note: "8-wale corduroy, oversized, autumn pick"
  }
];

/* Parachute pants (your 6th photo) — added as a bonus hero product */
products.push({
  id: 13,
  collection: "denim",
  name: "Sage Green Parachute Pants",
  tag: "Trending",
  price: 2599,
  oldPrice: null,
  img: "assets/parachute-1.jpg",     // ← your 6th photo
  sizes: ["Free Size"],
  note: "Elastic waist, drawstring, ultra-baggy"
});