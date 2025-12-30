"use client";

import { useState } from 'react';
import {
    Briefcase, ArrowRight, DollarSign, Sprout, Hammer, CheckCircle2,
    Factory, Recycle, Bird, Camera, Fish, Flower, Droplet,
    Megaphone, Users, MapPin, Store, Sun, BatteryCharging,
    PaintBucket, Leaf, Wheat, Tractor, Flame, Cog, ShoppingCart, Star, Phone
} from 'lucide-react';
import styles from '../page.module.css';

interface BusinessIdea {
    id: string;
    title: string;
    description: string;
    investment: string;
    profit: string;
    icon: any;
    steps: string[];
    marketingStrategies: string[];
    targetCustomers: string[];
    salesLocations: string[];
    requiredSupplies: string[];
}

interface Shop {
    id: string;
    name: string;
    distance: string;
    rating: number;
    address: string;
    phone: string;
    inventory: string[];
    type: 'General' | 'Machinery' | 'Livestock' | 'Nursery';
}

const mockShops: Shop[] = [
    {
        id: 's1',
        name: 'Kisan Seva Kendra',
        distance: '2.5 km',
        rating: 4.5,
        address: 'Main Market, Near Bus Stand',
        phone: '+91 98765 43210',
        inventory: ['Fertilizers', 'Seeds', 'Pesticides', 'Sprayers', 'Drip Irrigation Kits', 'Polybags', 'Shade Nets'],
        type: 'General'
    },
    {
        id: 's2',
        name: 'Laxmi Feeds & Pharma',
        distance: '4.0 km',
        rating: 4.8,
        address: 'Industrial Area, Plot 45',
        phone: '+91 99887 76655',
        inventory: ['Poultry Feed', 'Cattle Feed', 'Fish Feed', 'Mineral Mixtures', 'Vaccines', 'Calcium Supplements'],
        type: 'Livestock'
    },
    {
        id: 's3',
        name: 'Agro Tech Solutions',
        distance: '12 km',
        rating: 4.2,
        address: 'Highway Rd, Opp. Petrol Pump',
        phone: '+91 88776 65544',
        inventory: ['Milking Machines', 'Chaff Cutters', 'Oil Press Machines', 'Solar Dryers', 'Brush Cutters'],
        type: 'Machinery'
    },
    {
        id: 's4',
        name: 'Green Leaf Nursery',
        distance: '6.5 km',
        rating: 4.6,
        address: 'Village Road, Green Valley',
        phone: '+91 77665 54433',
        inventory: ['Fruit Grafts', 'Flower Saplings', 'Bamboo Saplings', 'Medicinal Plants', 'Vegetable Seedlings'],
        type: 'Nursery'
    },
    {
        id: 's5',
        name: 'Modern Farm Works',
        distance: '8.0 km',
        rating: 4.3,
        address: 'New Grain Market',
        phone: '+91 66554 43322',
        inventory: ['Tractors', 'Rotavators', 'Drone Sprayers', 'Spare Parts', 'Lubricants'],
        type: 'Machinery'
    }
];

const businessIdeas: BusinessIdea[] = [
    {
        id: 'mushroom',
        title: 'Mushroom Farming',
        description: 'High-yield indoor farming requiring less space. Ideal for year-round income.',
        investment: '₹50,000 - ₹2 Lakhs',
        profit: '₹20,000 - ₹40,000 / month',
        icon: Sprout,
        steps: [
            'Setup a dark, cool, and well-ventilated room or shed (10x10ft is sufficient).',
            'Procure quality spawn (seeds) and substrate (wheat straw or sawdust).',
            'Sterilize the substrate by boiling or chemical treatment to prevent mold.',
            'Maintain humidity (80-90%) and temperature (20-25°C) using sprayers.',
            'Harvesting typically begins within 20-30 days of spawning.'
        ],
        marketingStrategies: [
            'Brand it as "Fresh", "Chemical-free", or "Protein-rich".',
            'Offer small sample packs to local vegetable vendors initially.',
            'Create "Ready-to-eat" mushroom pickle or dry mushroom powder for extra value.'
        ],
        targetCustomers: [
            'Local Chinese and fast-food stalls (High daily demand).',
            'Hotels, Restaurants, and Caterers.',
            'Health-conscious urban residents.'
        ],
        salesLocations: [
            'Local vegetable mandis (early morning).',
            'Supermarkets (requires packaging).',
            'Direct delivery to housing societies.'
        ],
        requiredSupplies: ['Seeds', 'Sprayers', 'Polybags', 'Straw']
    },
    {
        id: 'beekeeping',
        title: 'Beekeeping (Apiculture)',
        description: 'Sustainable honey production that also boosts crop yields through pollination.',
        investment: '₹1.5 Lakhs (for 10 boxes)',
        profit: '₹50,000 - ₹1L / year',
        icon: Recycle,
        steps: [
            'Complete a basic training course (KVK or agricultural university).',
            'Purchase wooden bee boxes and bee colonies (typically Apis mellifera).',
            'Place boxes near flowering fields (Mustard, Sunflower, Litchi orchards).',
            'Migrate boxes seasonally to follow flowering patterns.',
            'Extract honey carefully during peak flowering seasons.'
        ],
        marketingStrategies: [
            'Sell as "Raw, Unprocessed Honey" (premium price over commercial brands).',
            'Sell honeycomb chunks as a gourmet product.',
            'Market beeswax for cosmetic making.'
        ],
        targetCustomers: [
            'Ayurvedic medicine users.',
            'Parents looking for healthy sugar alternatives.',
            'Local bakeries and cosmetic makers.'
        ],
        salesLocations: [
            'Farmers markets.',
            'Organic stores.',
            'Online via social media (Instagram/Facebook).'
        ],
        requiredSupplies: ['Bee Boxes', 'Honey Extractor', 'Protective Gear']
    },
    {
        id: 'hydroponics',
        title: 'Hydroponics Farming',
        description: 'Soil-less, water-based farming for high-value exotic vegetables.',
        investment: '₹5 Lakhs - ₹10 Lakhs',
        profit: '₹1 Lakh - ₹2 Lakhs / month',
        icon: Droplet,
        steps: [
            'Set up a polyhouse or climate-controlled greenhouse.',
            'Install NFT (Nutrient Film Technique) PVC pipes and pumps.',
            'Use inert media like Cocopeat or Clay pellets.',
            'Monitor pH and EC (Electrical Conductivity) of water daily.',
            'Grow exotic crops: Lettuce, Cherry Tomatoes, Bell Peppers.'
        ],
        marketingStrategies: [
            'Market as "Pesticide-Free" and "Residue-Free".',
            'Supply "Salad Mix Boxes" on subscription basis.',
            'Target gourmet chefs who need specific ingredients.'
        ],
        targetCustomers: [
            'Five-star hotels and fine-dine restaurants.',
            'Premium supermarkets (Nature\'s Basket, etc.).',
            'Health cafes.'
        ],
        salesLocations: [
            'Direct B2B contracts with hotels.',
            'Premium online grocery apps.',
            'Upscale organic farmers markets.'
        ],
        requiredSupplies: ['Drip Irrigation Kits', 'Seeds', 'Nutrients']
    },
    {
        id: 'dairy-processing',
        title: 'Dairy Value Addition',
        description: 'Process surplus milk into Ghee, Paneer, Curd, or Khoa for higher margins.',
        investment: '₹2 Lakhs - ₹5 Lakhs',
        profit: '20% - 40% margin',
        icon: Factory,
        steps: [
            'Obtain FSSAI registration and local trade license.',
            'Set up a hygienic processing unit (Cream separator, Deep freezer, Boiler).',
            'Source fresh milk from own farm or reliable neighbors.',
            'Process milk immediately to maintain freshness.',
            'Package in food-grade containers with proper labeling.'
        ],
        marketingStrategies: [
            'Highlight "Farm Fresh" and "No Preservatives".',
            'Provide home delivery subscriptions for Paneer/Curd.',
            'Use glass jars for Ghee to signal premium quality.'
        ],
        targetCustomers: [
            'Sweet shops (Halwais).',
            'Urban households seeking pure dairy.',
            'Gym goers (Paneer for protein).'
        ],
        salesLocations: [
            'Sweet shops and bakeries.',
            'Kirana stores.',
            'Door-to-door morning delivery network.'
        ],
        requiredSupplies: ['Cream Separator', 'Cattle Feed', 'Calcium Supplements']
    },
    {
        id: 'medicinal-plants',
        title: 'Medicinal Plant Cultivation',
        description: 'Grow high-demand herbs like Ashwagandha, Aloe Vera, or Tulsi.',
        investment: '₹50,000 - ₹1 Lakh/acre',
        profit: '₹1 Lakh - ₹1.5 Lakhs/acre',
        icon: Leaf,
        steps: [
            'Test soil suitability for specific herbs (sandy loam is often good).',
            'Secure buy-back agreement with pharmaceutical companies if possible.',
            'Plant seeds/saplings before monsoon (Ashwagandha/Tulsi).',
            'Minimal pesticide use required as these are hardy plants.',
            'Harvest roots or leaves, dry them in shade, and pack.'
        ],
        marketingStrategies: [
            'Contract farming is the safest bet.',
            'Process into powder or juice (e.g., Aloe Vera Juice) for retail.',
            'Sell dried roots to wholesale ayurvedic mandis.'
        ],
        targetCustomers: [
            'Ayurvedic pharma companies (Patanjali, Dabur, etc.).',
            'Local herbal practitioners (Vaidyas).',
            'Cosmetic manufacturers.'
        ],
        salesLocations: [
            'Regional Herbal Mandis (Neemuch, Amritsar).',
            'Direct supply to processing factories.',
            'Online herbal marketplaces.'
        ],
        requiredSupplies: ['Medicinal Plants', 'Drip Irrigation Kits', 'Seeds']
    },
    {
        id: 'vermicompost',
        title: 'Organic Vermicompost',
        description: 'Turn farm waste and cow dung into "Black Gold" organic fertilizer.',
        investment: '₹10,000 - ₹50,000',
        profit: '₹8 - ₹12 / kg',
        icon: Recycle,
        steps: [
            'Construct concrete or HDPE vermibeds in a shaded area.',
            'Collect organic waste (cow dung, crop residues, dry leaves).',
            'Introduce earthworms (Eisenia fetida species are best).',
            'Maintain moisture by sprinkling water daily.',
            'Harvest compost after 60-90 days when it becomes dark and granular.'
        ],
        marketingStrategies: [
            'Educate farmers about soil health improvements.',
            'Sell in 1kg, 5kg, and 50kg bags to suit different buyers.',
            'Offer "Earthworms" as a separate product for starters.'
        ],
        targetCustomers: [
            'Organic farmers and polyhouse owners.',
            'Home gardeners and nurseries.',
            'Landscaping contractors.'
        ],
        salesLocations: [
            'Local Nurseries.',
            'Seed and fertilizer shops.',
            'Exhibitions and Kisan Molas.'
        ],
        requiredSupplies: ['Shade Nets', 'Sprayers']
    },
    {
        id: 'floriculture',
        title: 'Floriculture (Flower Farming)',
        description: 'Grow Marigold, Rose, or Gerbera for festivals and weddings.',
        investment: '₹20,000 - ₹1 Lakh',
        profit: '₹20,000 - ₹50,000 / season',
        icon: Flower,
        steps: [
            'Prepare raised beds and install drip irrigation.',
            'Choose variety based on season (Marigold for Dussehra/Diwali).',
            'Plant spacing is crucial for flower size.',
            'Pinch apical buds to encourage side branching (more flowers).',
            'Harvest early morning while dew is still fresh.'
        ],
        marketingStrategies: [
            'Pre-booking orders for wedding seasons.',
            'Tie-ups with temples and event decorators.',
            'Sell garlands instead of loose flowers for value addition.'
        ],
        targetCustomers: [
            'Event management companies.',
            'Temple trusts.',
            'Perfume industries (for specific fragrant varieties).'
        ],
        salesLocations: [
            'City flower markets (early morning auction).',
            'Outside temples.',
            'Direct to decorators.'
        ],
        requiredSupplies: ['Flower Saplings', 'Seeds', 'Drip Irrigation Kits', 'Fertilizers']
    },
    {
        id: 'poultry',
        title: 'Poultry (Kadaknath/Desi)',
        description: 'Rearing birds for premium meat/eggs. Kadaknath fetches high prices.',
        investment: '₹1 Lakh - ₹3 Lakhs',
        profit: '₹500 - ₹800 / bird (Kadaknath)',
        icon: Bird,
        steps: [
            'Build a secure shed with proper ventilation to protect from predators.',
            'Choose breed: Kadaknath (premium meat), Kroiler (fast growth), or Layers (eggs).',
            'Source day-old chicks from government hatcheries.',
            'Follow strict vaccination schedule (Newcastle disease, etc.).',
            'Feed low-cost home-mixed feed (corn, bajra, greens) to reduce cost.'
        ],
        marketingStrategies: [
            'Promote health benefits (Kadaknath has lower cholesterol).',
            'Sell eggs as "Desi/Free-range" for double the market rate.',
            'Partner with local gyms/dieticians.'
        ],
        targetCustomers: [
            'Health-conscious meat eaters.',
            'Luxury hotels and restaurants.',
            'Local meat shops.'
        ],
        salesLocations: [
            'Direct to consumer (Pre-orders).',
            'Premium butchers.',
            'Weekly village markets.'
        ],
        requiredSupplies: ['Poultry Feed', 'Vaccines', 'Mineral Mixtures']
    },
    {
        id: 'quail',
        title: 'Quail (Bater) Farming',
        description: 'Requires very little space, fast growth (ready in 5 weeks), and tasty meat.',
        investment: '₹50,000',
        profit: '₹15,000 - ₹20,000 / month',
        icon: Bird,
        steps: [
            'Setup multi-tier cage system to save space.',
            'Procure Day-old chicks (require high temperature brooding initially).',
            'Feed high-protein starter feed.',
            'Birds are ready for meat in 5-6 weeks; start laying eggs in 7 weeks.',
            'Maintain hygiene to prevent smell.'
        ],
        marketingStrategies: [
            'Market as a "Delicacy" meat.',
            'Sell pickled quail eggs.',
            'Supply ready-to-cook dressed meat.'
        ],
        targetCustomers: [
            'Dhabas on highways.',
            'Gourmet meat lovers.',
            'Local bars and restaurants.'
        ],
        salesLocations: [
            'Direct supply to Restaurants.',
            'Weekly markets.',
            'Online meat delivery startups.'
        ],
        requiredSupplies: ['Poultry Feed', 'Vaccines']
    },
    {
        id: 'agro-tourism',
        title: 'Agro-Tourism',
        description: 'Invite urban families to experience village life, food, and farming.',
        investment: '₹5 Lakhs+ (Infrastructure)',
        profit: '₹1000 - ₹2000 per visitor',
        icon: Camera,
        steps: [
            'Designate a scenic, clean part of the farm for visitors.',
            'Build eco-friendly stay facilities (mud huts, tents, bamboo cottages).',
            'Plan activities: Bullock cart rides, fruit picking, tractor rides, pottery.',
            'Hire local women to cook authentic village-style firewood meals.',
            'Register with tourism department if required.'
        ],
        marketingStrategies: [
            'Social Media reels showing "Peaceful Village Life".',
            'Invite travel bloggers/vloggers for free stays initially.',
            'Package deals for schools and corporate team outings.'
        ],
        targetCustomers: [
            'Urban families looking for weekend getaways.',
            'Schools (Educational trips).',
            'IT companies (Team bonding).'
        ],
        salesLocations: [
            'Online Booking platforms (Airbnb, MakeMyTrip).',
            'Social Media (Instagram/Facebook).',
            'Tie-ups with city travel agents.'
        ],
        requiredSupplies: ['Construction Materials', 'Food Ingredients']
    },
    {
        id: 'drone-rental',
        title: 'Agri-Drone Rental Service',
        description: 'Rent drones for spraying fertilizers/pesticides. High demand tech.',
        investment: '₹6 Lakhs - ₹10 Lakhs',
        profit: '₹500 - ₹800 per acre sprayed',
        icon: Cog,
        steps: [
            'Obtain Remote Pilot Certificate (RPC) from DGCA approved institute.',
            'Purchase an agriculture spray drone (10L capacity is standard).',
            'Map local farms that need spraying services.',
            'Transport drone to field, mix chemicals, and execute automated spray.',
            'Maintenance of batteries and nozzles is key.'
        ],
        marketingStrategies: [
            'Demo the speed and safety (no exposure to poison) to farmers.',
            'Offer group discounts for adjacent farms.',
            'Partner with pesticide shops for referrals.'
        ],
        targetCustomers: [
            'Large landholders (Sugarcane, Cotton, Maize).',
            'Orchard owners (Mango, Orange) where manual spray is hard.',
            'FPO (Farmer Producer Organizations).'
        ],
        salesLocations: [
            'Village squares (Chaupal) demos.',
            'WhatsApp groups.',
            'Input shops.'
        ],
        requiredSupplies: ['Drone Sprayers', 'Pesticides', 'Spare Parts']
    },
    {
        id: 'goat-farming',
        title: 'Goat Farming',
        description: 'Low start-up cost "ATM of the Poor". High demand for meat.',
        investment: '₹1 Lakh - ₹2.5 Lakhs',
        profit: '30% - 50% ROI',
        icon: Users,
        steps: [
            'Construct an elevated wooden shed (prevents diseases).',
            'Select breeds suitable for your climate (Osmanabadi, Barbari, Sirohi).',
            'Start with 10 females and 1 male (10+1 unit).',
            'Grow green fodder (Lucerne, Subabul) to reduce feed cost.',
            'Regular deworming and vaccination are critical.'
        ],
        marketingStrategies: [
            'Target festival seasons (Eid/Bakrid) for premium pricing.',
            'Sell milk as a health booster (Dengue recovery).',
            'Focus on selling breeding stock which fetches higher prices.'
        ],
        targetCustomers: [
            'Local butchers.',
            'Livestock traders.',
            'Farmers starting new units.'
        ],
        salesLocations: [
            'Local livestock markets (weekly).',
            'Direct farm gate sales.',
            'Online goat marketplaces.'
        ],
        requiredSupplies: ['Cattle Feed', 'Vaccines', 'Chaff Cutters']
    },
    {
        id: 'nursery',
        title: 'Organic Nursery',
        description: 'Prepare and sell vegetable seedlings, fruit grafts, and flower saplings.',
        investment: '₹20,000 - ₹50,000',
        profit: '₹30,000 / month (Seasonal)',
        icon: Flower,
        steps: [
            'Set up a small shade net house (50% shade).',
            'Prepare raised beds or use protrays with cocopeat.',
            'Sow high-yield hybrid or exotic seeds (Broccoli, Cherry Tomato).',
            'Harden the plants before selling (expose to sunlight gradually).',
            'Maintain strict watering schedule.'
        ],
        marketingStrategies: [
            'Bundle "Kitchen Garden Kits" (Seeds + Pot + Soil).',
            'Guarantee germination or replacement to build trust.',
            'offer free advice on planting with every purchase.'
        ],
        targetCustomers: [
            'Commercial vegetable farmers.',
            'Home gardeners.',
            'Government plantation drives.'
        ],
        salesLocations: [
            'Roadside display near farm.',
            'Agro-service centers.',
            'WhatsApp groups of local farmer associations.'
        ],
        requiredSupplies: ['Seeds', 'Polybags', 'Coco peat']
    },
    {
        id: 'fish-farming',
        title: 'Fish Farming (Biofloc/Pond)',
        description: 'Utilize farm ponds or tanks for fish production. Biofloc needs less water.',
        investment: '₹1.5 Lakhs (Biofloc tank)',
        profit: '₹40,000 - ₹60,000 per tank/cycle',
        icon: Fish,
        steps: [
            'Excavate pond or setup tarpaulin Biofloc tanks.',
            'Sample water and soil quality (pH, Ammonia levels).',
            'Stock fingerlings (Rohu, Katla, Tilapia, Pangasius).',
            'Feed floating pellets and maintain aeration (oxygen pumps).',
            'Harvest after 6-8 months when fish reach 1kg size.'
        ],
        marketingStrategies: [
            'Sell "Live Fish" at the farm gate (freshness guarantee).',
            'Supply to local hotels on contract.',
            'Scale up to "Fish Pickle" if surplus exists.'
        ],
        targetCustomers: [
            'Local fish markets.',
            'Consumers who prefer fresh over iced fish.',
            'Hotels and Dhabas.'
        ],
        salesLocations: [
            'Wholesale fish markets.',
            'Direct retail at farm on Sundays.',
            'Door-to-door in mobile van.'
        ],
        requiredSupplies: ['Fish Feed', 'Aerators', 'Tarpaulin Tanks']
    },
    {
        id: 'bamboo',
        title: 'Bamboo Cultivation',
        description: 'Green Gold. Fast growing, used in construction/furniture. Low maintenance.',
        investment: '₹1 Lakh - ₹1.5 Lakhs/acre',
        profit: '₹4 Lakhs - ₹5 Lakhs/acre (after 3-4 yrs)',
        icon: Leaf,
        steps: [
            'Select high-biomass species like Bambusa balcooa (Beema Bamboo).',
            'Plant spacing 10x4ft or 8x4ft.',
            'Need drip irrigation for first 2 years for best growth.',
            'No need for replanting (grows from clumps for 40+ years).',
            'Harvest poles every year after maturity.'
        ],
        marketingStrategies: [
            'Contract farming with Paper Mills or Biomass Energy plants.',
            'Sell to furniture makers.',
            'Explore "Bamboo Charcoal" production.'
        ],
        targetCustomers: [
            'Paper and Pulp industry.',
            'Ethanol plants.',
            'Construction/Scaffolding market.'
        ],
        salesLocations: [
            'Factory gates.',
            'Timber depots.',
            'Direct contract.'
        ],
        requiredSupplies: ['Bamboo Saplings', 'Drip Irrigation Kits', 'Fertilizers']
    },
    {
        id: 'cold-pressed-oil',
        title: 'Cold Pressed Oil Unit',
        description: 'Extract premium oil from Groundnut, Mustard, or Sesame without heat.',
        investment: '₹3 Lakhs - ₹5 Lakhs',
        profit: '₹50 - ₹100 profit per liter',
        icon: Droplet,
        steps: [
            'Purchase a wood-pressed (Ghani) machine.',
            'Procure high-quality seeds (Groundnut/Sesame) - dry them well.',
            'Extract oil at slow speed to maintain nutrients.',
            'Let oil settle for 2-3 days (sedimentation) - Do not filter chemically.',
            'Bottle in glass or food-grade tins.'
        ],
        marketingStrategies: [
            'Educate customers on Heart Health (Cholesterol free).',
            'Show live extraction to customers to prove purity.',
            'Offer "Bring your own can" discounts.'
        ],
        targetCustomers: [
            'Health-conscious families.',
            'Heart patients.',
            'Premium grocery stores.'
        ],
        salesLocations: [
            'Setup shop near walking parks (morning walkers).',
            'Organic stores.',
            'Exhibitions.'
        ],
        requiredSupplies: ['Oil Press Machines', 'Seeds']
    },
    {
        id: 'dehydrated-food',
        title: 'Solar Dehydration Unit',
        description: 'Preserve surplus vegetables (Tomato, Onion, Okra) by drying.',
        investment: '₹1 Lakh - ₹2 Lakhs (Dryer)',
        profit: '30% - 50% Margin',
        icon: Sun,
        steps: [
            'Buy or build a solar conduction dryer.',
            'Wash, slice, and blanch (boil briefly) produce.',
            'Place in dryer trays (takes 4-8 hours).',
            'Pack in vacuum-sealed moisture-proof bags.',
            'Store in cool, dry place.'
        ],
        marketingStrategies: [
            'Sell "Sun-Dried Tomatoes" as gourmet ingredient.',
            'Make onion flakes/powder for instant cooking.',
            'Create "Dried Fruit Snacks" (Mango/Banana leather).'
        ],
        targetCustomers: [
            'Instant food manufacturers (masala companies).',
            'Campers/Hikers.',
            'Hotels (soup powders).'
        ],
        salesLocations: [
            'B2B supply to food factories.',
            'Online retail.',
            'Exports (high demand).'
        ],
        requiredSupplies: ['Solar Dryers', 'Packaging Material']
    },
    {
        id: 'sheep-farming',
        title: 'Sheep Farming',
        description: 'Grazing-based livestock rearing, primarily for meat and wool.',
        investment: '₹1.5 Lakhs - ₹2 Lakhs',
        profit: '30% - 40% ROI',
        icon: Users,
        steps: [
            'Secure grazing land or arrange stall-feeding.',
            'Buy breeds like Deccani, Nellore, or Bannur.',
            'Shearing of wool twice a year (summer/winter).',
            'Regular hoof trimming and dipping.',
            'Sell lambs at 6-8 months age.'
        ],
        marketingStrategies: [
            'Sell wool to blanket industries.',
            'Sell manure (very high nitrogen) to vineyards.',
            'Direct supply to large slaughterhouses.'
        ],
        targetCustomers: [
            'Textile industry (low grade wool).',
            'Meat market.',
            'Organic grape farmers (manure).'
        ],
        salesLocations: [
            'Livestock mandi.',
            'Wool auctions.',
            'Direct farm sales.'
        ],
        requiredSupplies: ['Cattle Feed', 'Vaccines', 'Shearing Scissors']
    },
    {
        id: 'saffron',
        title: 'Indoor Saffron Farming',
        description: 'Grow "Red Gold" indoors using aeroponics. Highest value crop globally.',
        investment: '₹10 Lakhs - ₹15 Lakhs',
        profit: '₹3 Lakhs - ₹5 Lakhs / crop cycle',
        icon: Flower,
        steps: [
            'Setup a climate-controlled room (15°C - 20°C).',
            'Install aeroponic vertical racks.',
            'Procure high-quality Saffron corms (bulbs) from Kashmir.',
            'Darkness is required during the vegetative phase.',
            'Harvest stigmas carefully before sunrise.'
        ],
        marketingStrategies: [
            'Certify as "Premium Grade A" saffron.',
            'Package in 1g luxury glass vials.',
            'Export to Middle East or Europe.'
        ],
        targetCustomers: [
            'Sweet manufacturers.',
            'Pregnant women (traditional usage).',
            'Luxury restaurants.'
        ],
        salesLocations: [
            'Online luxury stores.',
            'Direct export.',
            'High-end spice markets.'
        ],
        requiredSupplies: ['Aeropath Systems', 'Cooling Units', 'Corms']
    },
    {
        id: 'pearl',
        title: 'Freshwater Pearl Farming',
        description: 'Cultivate designer pearls in fresh water ponds or tanks.',
        investment: '₹4 Lakhs - ₹6 Lakhs',
        profit: '50% - 70% ROI',
        icon: Star,
        steps: [
            'Construct a pond (10x10ft) or use tanks.',
            'Buy surgical grade mussels and nucleus beads.',
            'Perform "Surgery" to insert nucleus into mussels.',
            'Place mussels in nylon bags and hang in water.',
            'Harvest takes 12-18 months depending on pearl size.'
        ],
        marketingStrategies: [
            'Partner with local jewellers.',
            'Design custom jewelry directly.',
            'Focus on "Designer Pearls" (shapes/icons).'
        ],
        targetCustomers: [
            'Jewellery showrooms.',
            'Fashion designers.',
            'Spirituality shops (Astrology pearls).'
        ],
        salesLocations: [
            'Jewellery markets (Hyderabad, Jaipur).',
            'Online customized jewelry stores.',
            'Exhibitions.'
        ],
        requiredSupplies: ['Mussels', 'Nucleus Beads', 'Nets']
    },
    {
        id: 'spirulina',
        title: 'Spirulina Cultivation',
        description: 'Grow superfood algae. High protein, used in supplements.',
        investment: '₹5 Lakhs - ₹8 Lakhs',
        profit: '₹1 Lakh / month',
        icon: Leaf,
        steps: [
            'Construct concrete shallow tanks or ponds.',
            'Maintain high pH (alkaline) water.',
            'Add Spirulina culture starter.',
            'Agitate water regularly to ensure sunlight exposure.',
            'Filter and dry the biomass daily.'
        ],
        marketingStrategies: [
            'Sell as "Organic Protein Powder".',
            'Supply to tablet manufacturers.',
            'Mix in energy bars.'
        ],
        targetCustomers: [
            'Pharma companies (Supplements).',
            'Health food brands.',
            'Cosmetic companies (Face packs).'
        ],
        salesLocations: [
            'B2B Wholesale.',
            'Contract manufacturing.',
            'Online health stores.'
        ],
        requiredSupplies: ['Spirulina Culture', 'Filters', 'Dryers']
    },
    {
        id: 'tofu',
        title: 'Soya Milk & Tofu Unit',
        description: 'Healthy alternative to dairy. Value addition for Soybean farmers.',
        investment: '₹3 Lakhs - ₹5 Lakhs',
        profit: '₹20 - ₹40 per kg',
        icon: Factory,
        steps: [
            'Soak good quality soybeans overnight.',
            'Grind to extract milk.',
            'Boil milk (Soya milk is ready).',
            'Coagulate with citric acid to make Tofu (Paneer).',
            'Press and vacuum pack.'
        ],
        marketingStrategies: [
            'Pitch as "Lactose-Free" dairy alternative.',
            'Offer flavored soya milk (Chocolate/Strawberry) for kids.',
            'High protein diet marketing.'
        ],
        targetCustomers: [
            'Vegans and Lactose-intolerant people.',
            'Gym goers.',
            'Asian restaurants.'
        ],
        salesLocations: [
            'Supermarkets.',
            'Gym canteens.',
            'Tiffin services.'
        ],
        requiredSupplies: ['Soya Grinder', 'Boiler', 'Soybeans']
    },
    {
        id: 'biogas',
        title: 'Commercial Biogas Bottling',
        description: 'Convert cattle dung into CBG (Compressed Biogas) for replacing LPG.',
        investment: '₹15 Lakhs - ₹25 Lakhs',
        profit: 'High (Government subsidies available)',
        icon: Flame,
        steps: [
            'Setup large digester tanks.',
            'Feed cow dung and organic waste daily.',
            'Purify gas (Remove H2S and CO2).',
            'Compress gas into cylinders.',
            'Sell organic manure (slurry) as byproduct.'
        ],
        marketingStrategies: [
            'Cheaper than commercial LPG.',
            'Green fuel certification.',
            'Eco-friendly branding.'
        ],
        targetCustomers: [
            'Hotels and Canteens (Commercial cooking).',
            'Automobiles (if CNG grade).',
            'Industrial boilers.'
        ],
        salesLocations: [
            'Direct B2B contracts.',
            'Industrial zones.',
            'Government procurement.'
        ],
        requiredSupplies: ['Digester Tanks', 'Compressors', 'Cylinders']
    }
];

export default function FarmBusinessIdeas() {
    const [selectedIdea, setSelectedIdea] = useState<BusinessIdea | null>(null);

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <Briefcase size={32} className="text-primary" />
                <h2 className={styles.cardTitle}>Farm Business Advisory</h2>
            </div>

            {!selectedIdea ? (
                <>
                    <p style={{ marginBottom: '1.5rem', color: 'var(--muted-foreground)' }}>
                        Turn your farm into a profit center. Explore these curated high-margin business models.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {businessIdeas.map((idea) => (
                            <div
                                key={idea.id}
                                onClick={() => setSelectedIdea(idea)}
                                style={{
                                    border: '1px solid var(--border)',
                                    borderRadius: '1rem',
                                    padding: '1.5rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                                    e.currentTarget.style.borderColor = 'var(--primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.borderColor = 'var(--border)';
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem', color: 'var(--primary)' }}>
                                        <idea.icon size={28} />
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{idea.title}</h3>
                                </div>
                                <p style={{ color: 'var(--muted-foreground)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6', flexGrow: 1 }}>
                                    {idea.description}
                                </p>
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--foreground)' }}>
                                    <div style={{ background: 'var(--background)', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                                        💰 Investment: <strong>{idea.investment.split('-')[0]}..</strong>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600 }}>View Full Plan</span>
                                    <ArrowRight size={18} color="var(--primary)" />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                    <button
                        onClick={() => setSelectedIdea(null)}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--muted-foreground)',
                            fontSize: '0.95rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '1.5rem'
                        }}
                    >
                        <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} /> Back to Ideas
                    </button>

                    <div style={{
                        background: 'rgba(16, 185, 129, 0.05)',
                        border: '1px solid var(--primary)',
                        borderRadius: '1rem',
                        padding: '2rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{ padding: '1rem', background: 'var(--primary)', borderRadius: '0.75rem', color: 'white' }}>
                                <selectedIdea.icon size={36} />
                            </div>
                            <div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.25rem' }}>{selectedIdea.title}</h2>
                                <p style={{ color: 'var(--muted-foreground)' }}>Comprehensive Business Blueprint</p>
                            </div>
                        </div>

                        {/* Investment & Profit Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                            <div style={{ background: 'var(--card)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--border)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                                    <DollarSign size={24} />
                                    <h4 style={{ fontWeight: 600 }}>Estimated Investment</h4>
                                </div>
                                <p style={{ fontSize: '1.4rem', fontWeight: 700 }}>{selectedIdea.investment}</p>
                            </div>
                            <div style={{ background: 'var(--card)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--border)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                                    <CheckCircle2 size={24} />
                                    <h4 style={{ fontWeight: 600 }}>Potential Profit</h4>
                                </div>
                                <p style={{ fontSize: '1.4rem', fontWeight: 700 }}>{selectedIdea.profit}</p>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                            {/* Implementation Steps */}
                            <div style={{ gridColumn: 'span 2' }}>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Hammer size={24} className="text-primary" /> Execution Steps
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                                    {selectedIdea.steps.map((step, index) => (
                                        <div key={index} style={{ display: 'flex', gap: '1rem', padding: '1.25rem', background: 'var(--background)', borderRadius: '0.75rem', border: '1px solid var(--border)' }}>
                                            <div style={{
                                                minWidth: '2rem',
                                                height: '2rem',
                                                background: 'var(--primary)',
                                                color: 'white',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 'bold',
                                                fontSize: '0.9rem',
                                                flexShrink: 0
                                            }}>
                                                {index + 1}
                                            </div>
                                            <p style={{ lineHeight: '1.6', fontSize: '1.05rem' }}>{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Marketing, Customers, Locations Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>

                            {/* Marketing */}
                            <div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#eab308' }}>
                                    <Megaphone size={20} /> Marketing Strategy
                                </h3>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {selectedIdea.marketingStrategies.map((item, i) => (
                                        <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'start', fontSize: '0.95rem' }}>
                                            <span style={{ color: '#eab308', marginTop: '0.25rem' }}>•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Target Customers */}
                            <div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#3b82f6' }}>
                                    <Users size={20} /> Who to Sell To?
                                </h3>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {selectedIdea.targetCustomers.map((item, i) => (
                                        <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'start', fontSize: '0.95rem' }}>
                                            <span style={{ color: '#3b82f6', marginTop: '0.25rem' }}>•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Sales Locations */}
                            <div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ec4899' }}>
                                    <Store size={20} /> Sales Locations
                                </h3>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {selectedIdea.salesLocations.map((item, i) => (
                                        <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'start', fontSize: '0.95rem' }}>
                                            <span style={{ color: '#ec4899', marginTop: '0.25rem' }}>•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Nearby Suppliers Section - NEW */}
                        <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <ShoppingCart size={24} className="text-primary" /> Sourcing Material
                                    </h3>
                                    <p style={{ color: 'var(--muted-foreground)', marginTop: '0.25rem' }}>
                                        Find sellers for <strong>{selectedIdea.requiredSupplies.join(", ")}</strong>
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        const query = `${selectedIdea.requiredSupplies[0]} and ${selectedIdea.requiredSupplies[1] || 'farming materials'} dealers near me`;
                                        window.open(`https://www.google.com/maps/search/${encodeURIComponent(query)}`, '_blank');
                                    }}
                                    style={{
                                        background: '#ea4335',
                                        color: 'white',
                                        border: 'none',
                                        padding: '0.75rem 1.25rem',
                                        borderRadius: '0.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        boxShadow: '0 4px 6px rgba(234, 67, 53, 0.2)'
                                    }}
                                >
                                    <MapPin size={18} /> Find Live on Google Maps
                                </button>
                            </div>

                            <p style={{ marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}>Featured Partners (Demo Data)</p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
                                {mockShops.map((shop) => (
                                    <div key={shop.id} style={{
                                        padding: '1.25rem',
                                        border: '1px solid var(--border)',
                                        borderRadius: '0.75rem',
                                        background: 'var(--card)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.75rem'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                            <div>
                                                <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{shop.name}</h4>
                                                <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                                                    <MapPin size={14} /> {shop.distance} • {shop.address}
                                                </p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: '#ecfdf5', color: '#059669', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                                {shop.rating} <Star size={12} fill="#059669" />
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            {shop.inventory.map(item => {
                                                const isRelevant = selectedIdea.requiredSupplies.includes(item);
                                                return (
                                                    <span key={item} style={{
                                                        fontSize: '0.8rem',
                                                        padding: '0.25rem 0.6rem',
                                                        borderRadius: '99px',
                                                        background: isRelevant ? 'var(--primary)' : 'var(--background)',
                                                        color: isRelevant ? 'white' : 'var(--muted-foreground)',
                                                        border: isRelevant ? 'none' : '1px solid var(--border)'
                                                    }}>
                                                        {item}
                                                    </span>
                                                )
                                            })}
                                        </div>

                                        <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', gap: '1rem' }}>
                                            <button style={{
                                                flex: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem',
                                                padding: '0.6rem',
                                                borderRadius: '0.5rem',
                                                background: 'var(--primary)',
                                                color: 'white',
                                                border: 'none',
                                                cursor: 'pointer',
                                                fontWeight: 500
                                            }}>
                                                <Phone size={16} /> Call Shop
                                            </button>
                                            <button
                                                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + ' ' + shop.address)}`, '_blank')}
                                                style={{
                                                    flex: 1,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '0.5rem',
                                                    padding: '0.6rem',
                                                    borderRadius: '0.5rem',
                                                    background: 'transparent',
                                                    color: 'var(--primary)',
                                                    border: '1px solid var(--primary)',
                                                    cursor: 'pointer',
                                                    fontWeight: 500
                                                }}
                                            >
                                                Get Directions
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginTop: '3rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)', borderRadius: '0.5rem', color: 'var(--muted-foreground)', fontSize: '0.9rem', textAlign: 'center' }}>
                            Prices and profits are estimates based on market averages. Start small and scale up as you gain experience.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
