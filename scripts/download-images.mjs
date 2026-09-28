import fs from "fs";
import path from "path";
import https from "https";

const IMAGES = [
  // --- HERO & ABOUT ---
  {
    path: "public/images/hero/hero-living.jpg",
    url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
    author: "Spacejoy",
    handle: "@spacejoy",
    title: "Editorial Living Room with Custom Walnut & Linen",
  },
  {
    path: "public/images/hero/about-craft.jpg",
    url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    author: "Phillip Goldsberry",
    handle: "@phillipgoldsberry",
    title: "Handcrafted Teak Armchair Texture",
  },
  {
    path: "public/images/hero/about-detail.jpg",
    url: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80",
    author: "Nathan Fertig",
    handle: "@nathanfertig",
    title: "Warm Minimalist Interior & Joinery",
  },
  {
    path: "public/images/hero/workshop-artisan.jpg",
    url: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80",
    author: "Barn Images",
    handle: "@barnimages",
    title: "Master Woodworking & Joinery Studio",
  },

  // --- ROOMS (Bento Grid) ---
  {
    path: "public/images/rooms/living-room.jpg",
    url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    author: "Collov Home Design",
    handle: "@collovhome",
    title: "Warm Japandi Living Room",
  },
  {
    path: "public/images/rooms/bedroom.jpg",
    url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80",
    author: "Kam-Idris",
    handle: "@kamidris",
    title: "Zen Minimalist Master Bedroom",
  },
  {
    path: "public/images/rooms/dining.jpg",
    url: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80",
    author: "Spacejoy",
    handle: "@spacejoy",
    title: "Warm Oak Dining with Sculptural Chairs",
  },
  {
    path: "public/images/rooms/workspace.jpg",
    url: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1000&q=80",
    author: "Grovemade",
    handle: "@grovemade",
    title: "Ergonomic Walnut Executive Studio",
  },
  {
    path: "public/images/rooms/kids.jpg",
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
    author: "Becca Tapert",
    handle: "@beccatapert",
    title: "Playful Organic Kids Suite",
  },
  {
    path: "public/images/rooms/outdoor.jpg",
    url: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=1000&q=80",
    author: "Christian Mackie",
    handle: "@christianmackie",
    title: "Veranda Teak Lounge & Courtyard",
  },

  // --- PRODUCTS (24 products: primary + hover image) ---
  // 1. Haveli Velvet 3-Seater
  {
    path: "public/images/products/haveli-velvet-1.jpg",
    url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80",
    author: "Martin Péchy",
    handle: "@martinpechy",
    title: "Haveli Velvet Sofa Olive Front",
  },
  {
    path: "public/images/products/haveli-velvet-2.jpg",
    url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80",
    author: "Sven Brandsma",
    handle: "@svenbrandsma",
    title: "Haveli Velvet Sofa Angle Detail",
  },

  // 2. Kiran Modular Sectional
  {
    path: "public/images/products/kiran-l-shape-1.jpg",
    url: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=900&q=80",
    author: "Minh Pham",
    handle: "@minhphamdesign",
    title: "Kiran Modular Sectional Cream",
  },
  {
    path: "public/images/products/kiran-l-shape-2.jpg",
    url: "https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=900&q=80",
    author: "Daniil Silantev",
    handle: "@silantev",
    title: "Kiran Modular Sectional Fabric Close-up",
  },

  // 3. Nila Curved Boucle Loveseat
  {
    path: "public/images/products/nila-loveseat-1.jpg",
    url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
    author: "Phillip Goldsberry",
    handle: "@phillipgoldsberry",
    title: "Nila Curved Loveseat Butter Yellow",
  },
  {
    path: "public/images/products/nila-loveseat-2.jpg",
    url: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=900&q=80",
    author: "Spacejoy",
    handle: "@spacejoy",
    title: "Nila Loveseat Silhouette",
  },

  // 4. Raga Leather Lounge Chair
  {
    path: "public/images/products/raga-recliner-1.jpg",
    url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=80",
    author: "Devon Janse van Rensburg",
    handle: "@devon_jvr",
    title: "Raga Cognac Leather Lounge Armchair",
  },
  {
    path: "public/images/products/raga-recliner-2.jpg",
    url: "https://images.unsplash.com/photo-1580481077190-7361346d1809?auto=format&fit=crop&w=900&q=80",
    author: "Curology",
    handle: "@curology",
    title: "Raga Leather Stitch Detail",
  },

  // 5. Aranya Platform Bed
  {
    path: "public/images/products/aranya-bed-1.jpg",
    url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    author: "Christopher Jolly",
    handle: "@christopherjolly",
    title: "Aranya Low-Profile Oak Platform Bed",
  },
  {
    path: "public/images/products/aranya-bed-2.jpg",
    url: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=900&q=80",
    author: "Christian Mackie",
    handle: "@christianmackie",
    title: "Aranya Headboard Joinery Detail",
  },

  // 6. Veda Upholstered King
  {
    path: "public/images/products/veda-king-1.jpg",
    url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
    author: "Kam-Idris",
    handle: "@kamidris",
    title: "Veda Fluted Linen King Bed",
  },
  {
    path: "public/images/products/veda-king-2.jpg",
    url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=80",
    author: "Sidekix Media",
    handle: "@sidekix",
    title: "Veda Bed Linens and Nightstand",
  },

  // 7. Lotus Hydraulic Storage Bed
  {
    path: "public/images/products/lotus-bed-1.jpg",
    url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80",
    author: "Spacejoy",
    handle: "@spacejoy",
    title: "Lotus Teak Storage Bed",
  },
  {
    path: "public/images/products/lotus-bed-2.jpg",
    url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    author: "Christopher Jolly",
    handle: "@christopherjolly",
    title: "Lotus Bed Underframe Detail",
  },

  // 8. Nimbus Daybed
  {
    path: "public/images/products/nimbus-daybed-1.jpg",
    url: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?auto=format&fit=crop&w=900&q=80",
    author: "Spacejoy",
    handle: "@spacejoy",
    title: "Nimbus Cane & Teak Daybed",
  },
  {
    path: "public/images/products/nimbus-daybed-2.jpg",
    url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
    author: "Phillip Goldsberry",
    handle: "@phillipgoldsberry",
    title: "Nimbus Daybed Cushion Weave",
  },

  // 9. Chakra Sculptural Dining Table
  {
    path: "public/images/products/chakra-dining-1.jpg",
    url: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=900&q=80",
    author: "Spacejoy",
    handle: "@spacejoy",
    title: "Chakra Fluted Pedestal Round Table",
  },
  {
    path: "public/images/products/chakra-dining-2.jpg",
    url: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=900&q=80",
    author: "Dan Gold",
    handle: "@danielcgold",
    title: "Chakra Table Top Grain & Place Setting",
  },

  // 10. Mati Solid Wood Bench Table
  {
    path: "public/images/products/mati-bench-1.jpg",
    url: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=900&q=80",
    author: "Jean-Philippe Delberghe",
    handle: "@jdelberghe",
    title: "Mati Live Edge Acacia Dining Table",
  },
  {
    path: "public/images/products/mati-bench-2.jpg",
    url: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=900&q=80",
    author: "Spacejoy",
    handle: "@spacejoy",
    title: "Mati Bench Seating Detail",
  },

  // 11. Indigo Extendable Dining Table
  {
    path: "public/images/products/indigo-table-1.jpg",
    url: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=900&q=80",
    author: "Breather",
    handle: "@breather",
    title: "Indigo Minimalist Extendable Dining Table",
  },
  {
    path: "public/images/products/indigo-table-2.jpg",
    url: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=900&q=80",
    author: "Jean-Philippe Delberghe",
    handle: "@jdelberghe",
    title: "Indigo Table Extension Mechanism",
  },

  // 12. Terra Terrazzo High Bar Table
  {
    path: "public/images/products/terra-bar-1.jpg",
    url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
    author: "Sidekix Media",
    handle: "@sidekix",
    title: "Terra Cast Terrazzo Counter Table",
  },
  {
    path: "public/images/products/terra-bar-2.jpg",
    url: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=900&q=80",
    author: "Dan Gold",
    handle: "@danielcgold",
    title: "Terra Brass Footrest Detail",
  },

  // 13. Surya Accent Armchair
  {
    path: "public/images/products/surya-chair-1.jpg",
    url: "https://images.unsplash.com/photo-1580481077190-7361346d1809?auto=format&fit=crop&w=900&q=80",
    author: "Curology",
    handle: "@curology",
    title: "Surya Terracotta Velvet Accent Chair",
  },
  {
    path: "public/images/products/surya-chair-2.jpg",
    url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=80",
    author: "Devon Janse van Rensburg",
    handle: "@devon_jvr",
    title: "Surya Chair Sculpted Arm",
  },

  // 14. Dew Swivel Ergonomic Chair
  {
    path: "public/images/products/dew-swivel-1.jpg",
    url: "https://images.unsplash.com/photo-1589384267710-7a25bc20c567?auto=format&fit=crop&w=900&q=80",
    author: "Huseyin Sivri",
    handle: "@hsivri",
    title: "Dew Leather Executive Swivel",
  },
  {
    path: "public/images/products/dew-swivel-2.jpg",
    url: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=900&q=80",
    author: "Grovemade",
    handle: "@grovemade",
    title: "Dew Swivel Base & Castors",
  },

  // 15. Bliss Bentwood Rocking Chair
  {
    path: "public/images/products/bliss-rocker-1.jpg",
    url: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=900&q=80",
    author: "Andy Art",
    handle: "@andyart",
    title: "Bliss Architectural Rocking Chair",
  },
  {
    path: "public/images/products/bliss-rocker-2.jpg",
    url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
    author: "Phillip Goldsberry",
    handle: "@phillipgoldsberry",
    title: "Bliss Rocker Curve Details",
  },

  // 16. Yuga Barrel Tub Chair
  {
    path: "public/images/products/yuga-barrel-1.jpg",
    url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
    author: "Phillip Goldsberry",
    handle: "@phillipgoldsberry",
    title: "Yuga Boucle Barrel Armchair",
  },
  {
    path: "public/images/products/yuga-barrel-2.jpg",
    url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80",
    author: "Martin Péchy",
    handle: "@martinpechy",
    title: "Yuga Chair Back Profile",
  },

  // 17. Atlas Architectural Bookshelf
  {
    path: "public/images/products/atlas-bookshelf-1.jpg",
    url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80",
    author: "Alisa Anton",
    handle: "@alisaanton",
    title: "Atlas Open Grid Teak Bookshelf",
  },
  {
    path: "public/images/products/atlas-bookshelf-2.jpg",
    url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    author: "Christopher Jolly",
    handle: "@christopherjolly",
    title: "Atlas Bookshelf Shelving Geometry",
  },

  // 18. Koshi Fluted Media Console
  {
    path: "public/images/products/koshi-credenza-1.jpg",
    url: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=900&q=80",
    author: "Nathan Fertig",
    handle: "@nathanfertig",
    title: "Koshi Low-Profile Media Credenza",
  },
  {
    path: "public/images/products/koshi-credenza-2.jpg",
    url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
    author: "Collov Home Design",
    handle: "@collovhome",
    title: "Koshi Tambour Slats Detail",
  },

  // 19. Hira Cane 3-Door Wardrobe
  {
    path: "public/images/products/hira-wardrobe-1.jpg",
    url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=80",
    author: "Spacejoy",
    handle: "@spacejoy",
    title: "Hira Natural Rattan Wardrobe",
  },
  {
    path: "public/images/products/hira-wardrobe-2.jpg",
    url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    author: "Christopher Jolly",
    handle: "@christopherjolly",
    title: "Hira Interior Hanging Rods & Drawers",
  },

  // 20. Prism Fluted Nightstand Pair
  {
    path: "public/images/products/prism-tables-1.jpg",
    url: "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&w=900&q=80",
    author: "Francesca Tosolini",
    handle: "@francescatosolini",
    title: "Prism Brass & Travertine Side Table",
  },
  {
    path: "public/images/products/prism-tables-2.jpg",
    url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
    author: "Phillip Goldsberry",
    handle: "@phillipgoldsberry",
    title: "Prism Stone Edge Veining",
  },

  // 21. Agni Sculptural Ceramic Pendant
  {
    path: "public/images/products/agni-pendant-1.jpg",
    url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    author: "Federico Giampieri",
    handle: "@federicogiampieri",
    title: "Agni Hand-thrown Terracotta Pendant",
  },
  {
    path: "public/images/products/agni-pendant-2.jpg",
    url: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80",
    author: "Jarek Ceborski",
    handle: "@jarekceborski",
    title: "Agni Warm Amber Light Pool",
  },

  // 22. Soma Brass Arch Floor Lamp
  {
    path: "public/images/products/soma-lamp-1.jpg",
    url: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80",
    author: "Jarek Ceborski",
    handle: "@jarekceborski",
    title: "Soma Spun Brass Arc Floor Lamp",
  },
  {
    path: "public/images/products/soma-lamp-2.jpg",
    url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    author: "Federico Giampieri",
    handle: "@federicogiampieri",
    title: "Soma Marble Counterweight Base",
  },

  // 23. Luna Glass Sphere Cluster
  {
    path: "public/images/products/luna-cluster-1.jpg",
    url: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=900&q=80",
    author: "Valeriia Bugaiova",
    handle: "@valeriia_bugaiova",
    title: "Luna Frosted Orb Chandelier",
  },
  {
    path: "public/images/products/luna-cluster-2.jpg",
    url: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80",
    author: "Jarek Ceborski",
    handle: "@jarekceborski",
    title: "Luna Glow in Dark Setting",
  },

  // 24. Diya Ribbed Ceramic Table Lamp
  {
    path: "public/images/products/diya-lamp-1.jpg",
    url: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=900&q=80",
    author: "Christian Mackie",
    handle: "@christianmackie",
    title: "Diya Glazed Terracotta Table Lamp",
  },
  {
    path: "public/images/products/diya-lamp-2.jpg",
    url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    author: "Federico Giampieri",
    handle: "@federicogiampieri",
    title: "Diya Linen Drum Shade Texture",
  },

  // --- PORTFOLIO PROJECTS (6 projects: main + before + after) ---
  // Project 1: The Swarnamukhi Villa (Srikalahasthi)
  {
    path: "public/images/portfolio/project-1-main.jpg",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    author: "R Architecture",
    handle: "@rarchitecture",
    title: "The Swarnamukhi Villa Living & Courtyard",
  },
  {
    path: "public/images/portfolio/project-1-before.jpg",
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    author: "Becca Tapert",
    handle: "@beccatapert",
    title: "Swarnamukhi Villa Bare Shell Before Transformation",
  },
  {
    path: "public/images/portfolio/project-1-after.jpg",
    url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    author: "Collov Home Design",
    handle: "@collovhome",
    title: "Swarnamukhi Villa Custom Millwork Finished",
  },

  // Project 2: Tirupati Foothills Penthouse
  {
    path: "public/images/portfolio/project-2-main.jpg",
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    author: "R Architecture",
    handle: "@rarchitecture",
    title: "Foothills Penthouse Minimalist Lounge",
  },
  {
    path: "public/images/portfolio/project-2-before.jpg",
    url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    author: "Sidekix Media",
    handle: "@sidekix",
    title: "Foothills Penthouse Raw Space",
  },
  {
    path: "public/images/portfolio/project-2-after.jpg",
    url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    author: "Spacejoy",
    handle: "@spacejoy",
    title: "Foothills Penthouse Italian Marble & Walnut",
  },

  // Project 3: Srikalahasthi Heritage Courtyard Home
  {
    path: "public/images/portfolio/project-3-main.jpg",
    url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    author: "Spacejoy",
    handle: "@spacejoy",
    title: "Heritage Courtyard Modernized Verandah",
  },

  // Project 4: Rayalaseema Executive Duplex
  {
    path: "public/images/portfolio/project-4-main.jpg",
    url: "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1200&q=80",
    author: "Spacejoy",
    handle: "@spacejoy",
    title: "Executive Duplex Custom Acoustic Wall & Lounge",
  },

  // Project 5: Sri Krishna Modular Kitchen & Pantry
  {
    path: "public/images/portfolio/project-5-main.jpg",
    url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    author: "Jason Leung",
    handle: "@ninjason",
    title: "Fluted Quartz Island & Matte Charcoal Kitchen",
  },

  // Project 6: Prakasam Studio Loft
  {
    path: "public/images/portfolio/project-6-main.jpg",
    url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
    author: "Sidekix Media",
    handle: "@sidekix",
    title: "Prakasam Compact Modular Studio",
  },

  // --- MATERIAL SWATCHES ---
  {
    path: "public/images/materials/walnut.jpg",
    url: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=500&q=80",
    author: "Klara Kulikova",
    handle: "@klarakulikova",
    title: "American Dark Walnut Grain",
  },
  {
    path: "public/images/materials/teak.jpg",
    url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=500&q=80",
    author: "Clay Banks",
    handle: "@claybanks",
    title: "Burma Golden Teak Wood",
  },
  {
    path: "public/images/materials/linen.jpg",
    url: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=500&q=80",
    author: "Kelly Sikkema",
    handle: "@kellysikkema",
    title: "Natural Belgian Raw Linen",
  },
  {
    path: "public/images/materials/velvet.jpg",
    url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=500&q=80",
    author: "Tamanna Rumee",
    handle: "@tamannarumee",
    title: "Deep Terracotta Royal Velvet",
  },
  {
    path: "public/images/materials/leather.jpg",
    url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80",
    author: "Maksym Kaharlytskyi",
    handle: "@kaggregate",
    title: "Full Grain Cognac Leather",
  },
  {
    path: "public/images/materials/brass.jpg",
    url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=500&q=80",
    author: "Mick Haupt",
    handle: "@rocinante_11",
    title: "Brushed Antique Champagne Brass",
  },

  // --- SOCIAL GRID (6 curated photos) ---
  {
    path: "public/images/social/social-1.jpg",
    url: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=600&q=80",
    author: "Spacejoy",
    handle: "@spacejoy",
    title: "Morning Sun on Sculpted Table",
  },
  {
    path: "public/images/social/social-2.jpg",
    url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
    author: "Phillip Goldsberry",
    handle: "@phillipgoldsberry",
    title: "Styling the Nila Lounge",
  },
  {
    path: "public/images/social/social-3.jpg",
    url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80",
    author: "Spacejoy",
    handle: "@spacejoy",
    title: "Teak Dining in Tirupati Villa",
  },
  {
    path: "public/images/social/social-4.jpg",
    url: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80",
    author: "Nathan Fertig",
    handle: "@nathanfertig",
    title: "Hand-sanded Credenza Details",
  },
  {
    path: "public/images/social/social-5.jpg",
    url: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?auto=format&fit=crop&w=600&q=80",
    author: "Spacejoy",
    handle: "@spacejoy",
    title: "Modern Cane Weaving Workshop",
  },
  {
    path: "public/images/social/social-6.jpg",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    author: "R Architecture",
    handle: "@rarchitecture",
    title: "Client Reveal Day in Srikalahasthi",
  },
];

function download(item) {
  return new Promise((resolve) => {
    const fullPath = path.resolve(item.path);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (fs.existsSync(fullPath) && fs.statSync(fullPath).size > 1000) {
      // already downloaded
      resolve({ ...item, status: "skipped" });
      return;
    }

    const file = fs.createWriteStream(fullPath);
    const request = https.get(item.url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // handle redirect
        https.get(response.headers.location, (redirectRes) => {
          redirectRes.pipe(file);
          file.on("finish", () => {
            file.close();
            resolve({ ...item, status: "ok" });
          });
        }).on("error", (err) => {
          file.close();
          resolve({ ...item, status: "error", error: err.message });
        });
        return;
      }

      if (response.statusCode !== 200) {
        file.close();
        resolve({ ...item, status: "failed", code: response.statusCode });
        return;
      }

      response.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve({ ...item, status: "ok" });
      });
    });

    request.on("error", (err) => {
      file.close();
      resolve({ ...item, status: "error", error: err.message });
    });
  });
}

async function main() {
  console.log(`Starting download of ${IMAGES.length} curated interior & furniture assets...`);
  const concurrency = 6;
  let index = 0;
  const results = [];

  async function worker() {
    while (index < IMAGES.length) {
      const current = IMAGES[index++];
      console.log(`[${index}/${IMAGES.length}] Downloading ${current.path}...`);
      const res = await download(current);
      results.push(res);
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);

  // Generate CREDITS.md
  let creditsMarkdown = `# Image Credits & Licences — GYP SIGNATURES

All photography used on GYP SIGNATURES is licensed under the free, permissive Unsplash License (free for commercial and non-commercial use, no permission needed).

| Image Asset | Description | Photographer | Profile |
|---|---|---|---|
`;

  for (const item of IMAGES) {
    creditsMarkdown += `| \`${item.path.replace("public/", "/")}\` | ${item.title} | ${item.author} | [${item.handle}](https://unsplash.com/${item.handle}) |\n`;
  }

  creditsMarkdown += `\n*Crafted with genuine passion for architectural interiors and artisan woodworking.*`;

  fs.writeFileSync("CREDITS.md", creditsMarkdown);
  console.log(`Finished! Downloaded assets and generated CREDITS.md.`);
}

main();
