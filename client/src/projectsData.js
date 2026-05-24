export const projectsData = [
  {
    _id: "azure-palm-villa",
    name: "Azure Palm Villa",
    description: "High-end oceanfront luxury estate featuring stunning architecture and custom design.",
    longDescription: "Spanning over 8,500 square feet, the Azure Palm Villa is the epitome of beachfront luxury. Located on a private stretch of coastal property, it features floor-to-ceiling glass panels that slide open to connect the interior living space seamlessly with a massive oceanfront infinity pool deck. Designed with organic materials, premium teak wood, and smart systems, it represents modern coastal living at its finest.",
    price: "$4,850,000",
    location: "Ocean Drive, Palm Beach",
    status: "Completed",
    type: "Villa",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
    ],
    features: {
      size: "8,500 sq ft",
      bedrooms: 5,
      bathrooms: 6,
      floors: 2,
      year: 2024
    },
    amenities: [
      "Private Beach Access",
      "Infinity Edge Pool",
      "Smart Home Automation",
      "Home Cinema room",
      "Private Teak Jetty",
      "Wellness Spa & Gym",
      "24/7 Monitored Security"
    ],
    brochureUrl: "/brochures/azure-palm-villa.pdf",
    virtualTourUrl: "/virtual-tours/azure-palm",
    featured: true,
    coordinates: {
      lat: 26.7056,
      lng: -80.0364
    }
  },
  {
    _id: "meridian-tower",
    name: "The Meridian Tower",
    description: "A futuristic commercial skyscraper with sustainable LEED Gold workspaces.",
    longDescription: "Rising 45 floors above the central business district, The Meridian Tower features double-glazed low-E glass facade panels and a state-of-the-art climate control system. It offers customizable corporate office floors, private terraces, high-speed automated elevators, and shared executive zones. Perfect for global headquarters seeking prestigious representation and sustainable efficiency.",
    price: "$18,500,000+",
    location: "Financial District, Tech Corridor",
    status: "Upcoming",
    type: "Commercial",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80"
    ],
    features: {
      size: "180,000 sq ft",
      bedrooms: 0,
      bathrooms: 24,
      floors: 45,
      year: 2028
    },
    amenities: [
      "Sky Lounge & Restaurant",
      "Helipad Access",
      "High-speed Smart Elevators",
      "Automated Valet Parking",
      "LEED Gold Certification",
      "Executive Boardrooms",
      "Fibre Optic Backbone"
    ],
    brochureUrl: "/brochures/meridian-tower.pdf",
    virtualTourUrl: "/virtual-tours/meridian-tower",
    featured: true,
    coordinates: {
      lat: 13.0475,
      lng: 80.209
    }
  },
  {
    _id: "villa-serenita",
    name: "Villa Serenita",
    description: "A serene, contemporary private villa estate nested in forest highlands.",
    longDescription: "Villa Serenita is a sanctuary of peace. Tucked in the pristine highlands, this home is built using natural local granite and reinforced sustainable woods. It features a stunning floating living room deck, zero-edge swimming pool facing the valleys, custom interior design from Paris designers, and a private natural waterfall garden walk.",
    price: "$3,200,000",
    location: "Highland Estates, Eco Valley",
    status: "Upcoming",
    type: "Villa",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"
    ],
    features: {
      size: "6,200 sq ft",
      bedrooms: 4,
      bathrooms: 4.5,
      floors: 2,
      year: 2027
    },
    amenities: [
      "Zero Edge Valley Pool",
      "Custom Granite Architecture",
      "Teakwood Sun Deck",
      "Private Wine Cellar",
      "Yoga & Meditation Deck",
      "Rainwater Harvesting System",
      "Integrated Smart Home System"
    ],
    brochureUrl: "/brochures/villa-serenita.pdf",
    virtualTourUrl: "/virtual-tours/villa-serenita",
    featured: true,
    coordinates: {
      lat: 12.9716,
      lng: 79.1589
    }
  },
  {
    _id: "crescent-business-hub",
    name: "Crescent Business Hub",
    description: "A state-of-the-art office complex built with futuristic architectural styling.",
    longDescription: "The Crescent Business Hub is designed for the modern entrepreneur. Comprising of co-working areas, customizable team rooms, and open double-height lobbies, it is optimized for high-interaction networking. Integrated solar facades cover 40% of its power demands, providing high efficiency alongside visual grandeur.",
    price: "$9,750,000",
    location: "Gateway Circle, Cyberpark",
    status: "Upcoming",
    type: "Commercial",
    images: [
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
    ],
    features: {
      size: "75,000 sq ft",
      bedrooms: 0,
      bathrooms: 12,
      floors: 8,
      year: 2027
    },
    amenities: [
      "Solar Glass Power Facade",
      "Double-height Premium Lobby",
      "Co-working Open Space",
      "Rooftop Garden Terraces",
      "Biometric Access Controls",
      "Supercharged EV stations",
      "On-site Luxury Gym"
    ],
    brochureUrl: "/brochures/crescent-hub.pdf",
    virtualTourUrl: "/virtual-tours/crescent-hub",
    featured: false,
    coordinates: {
      lat: 13.0827,
      lng: 80.2707
    }
  },
  {
    _id: "aura-smart-condos",
    name: "Aura Smart Condos",
    description: "Voice-automated smart residences with customizable spatial layouts.",
    longDescription: "Aura Smart Condos integrate technology at every level. Standard units come with voice-controlled dimming mirrors, electrochromic privacy glass, and automated floor planners. High-efficiency heat exchangers and integrated indoor green walls ensure that air is pure, setting new benchmarks for smart luxury living.",
    price: "$1,650,000",
    location: "Metro Avenue, Downtown",
    status: "Ongoing",
    type: "Smart Home",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
    ],
    features: {
      size: "2,400 sq ft",
      bedrooms: 3,
      bathrooms: 3,
      floors: 1,
      year: 2026
    },
    amenities: [
      "AI Home Automation Hub",
      "Electrochromic Glass Walls",
      "Automated Valet Parking",
      "Rooftop Community Pool",
      "Gym & Pilates Room",
      "Direct Metro Skywalk",
      "24/7 Virtual Concierge"
    ],
    brochureUrl: "/brochures/aura-condos.pdf",
    virtualTourUrl: "/virtual-tours/aura-condos",
    featured: false,
    coordinates: {
      lat: 13.06,
      lng: 80.25
    }
  },
  {
    _id: "lumina-penthouse",
    name: "Lumina Penthouse",
    description: "Premium double-height penthouse design highlighting sustainable luxury interiors.",
    longDescription: "The Lumina Penthouse features high ceiling heights and open architectural concepts. Built as part of our interior showcase projects, the design merges custom brushed brass, marble tiling, and custom LED installations. High efficiency smart kitchen cabinets and carbon-filtered ventilation round out this bespoke penthouse.",
    price: "$2,950,000",
    location: "Skyline Towers, Heights",
    status: "Ongoing",
    type: "Interior",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
    ],
    features: {
      size: "4,500 sq ft",
      bedrooms: 4,
      bathrooms: 4,
      floors: 2,
      year: 2025
    },
    amenities: [
      "Double Height Glass Panel",
      "Italian White Marble Flooring",
      "Bespoke Smart Kitchen",
      "Rooftop Jacuzzi Deck",
      "Voice Automated Blinds",
      "Carbon Filter Clean Air",
      "Private Elevators"
    ],
    brochureUrl: "/brochures/lumina-penthouse.pdf",
    virtualTourUrl: "/virtual-tours/lumina-penthouse",
    featured: false,
    coordinates: {
      lat: 13.03,
      lng: 80.22
    }
  }
];
