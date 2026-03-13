
export type SubCategory = {
  name: string;
  items: string[];
};


export const industrySubcategories: Record<string, SubCategory[]> = {
  "Health Products,Drug and Medicine": [
    {
      "name": "Common Disease Medicines",
      "items": [
        "Pharmaceutical Medicine",
        "Pharmaceutical Tablets",
        "Pharmaceutical Syrup",
        "Pharmaceutical Drug",
        "Antihistamines"
      ]
    },
    {
      "name": "Nutraceuticals & Dietary Supplements",
      "items": [
        "Whey Protein Concentrate",
        "Milk Protein Concentrates",
        "Soybean Protein Concentrate",
        "Protein Supplement",
        "Protein Powder"
      ]
    },
    {
      "name": "Anti Infective Drugs & Medicines",
      "items": [
        "Antibacterial Drugs",
        "Penicillin G Injections",
        "Antibiotic Tablets & Capsules",
        "Antibiotic Injection",
        "Amoxicillin drugs"
      ]
    },
    {
      "name": "Pharma Ingredients & Raw Materials",
      "items": [
        "API (Active Pharmaceutical Ingredients)",
        "Streptomycin Sulfate API",
        "Anti Infective API",
        "Pharmaceutical Excipients",
        "API Intermediate"
      ]
    },
    {
      "name": "Cardiovascular Drugs & Medication",
      "items": [
        "Cardiac Drugs",
        "Diabetes Medicine",
        "Blood Pressure Medicine",
        "Anticoagulant and Antiplatelet Drugs",
        "Kidney Drugs"
      ]
    },
    {
      "name": "TB, Tumor & Cancer Drugs",
      "items": [
        "Anti Cancer Medicines",
        "Human Albumin Injection",
        "Anti Cancer Injection",
        "Ondansetron",
        "Ondansetron Tablet"
      ]
    },
    {
      "name": "Pain Relief Drugs & Pharmaceuticals",
      "items": [
        "Diclofenac Paracetamol and Chlorzoxazone Tablet",
        "Anti Inflammatory Drugs",
        "Antipyretic Medication",
        "Diclofenac",
        "Arthritic Drugs"
      ]
    },
    {
      "name": "Digestive System Drugs & Medicines",
      "items": [
        "Antacid Drugs",
        "Gastrointestinal Drugs",
        "Pantoprazole Drugs",
        "Rabeprazole Domperidone Capsule",
        "Anti Ulcer Drugs"
      ]
    },
    {
      "name": "Brain & Nervous System Drugs",
      "items": [
        "Antidepressant & Anti Anxiety Medicines",
        "Psychotherapeutic Agents",
        "Antimigraine Drug",
        "Neuropathy Medicine",
        "Immunomodulator Drugs"
      ]
    },
    {
      "name": "Animal Medicines & Health Care",
      "items": [
        "Veterinary Pharmaceuticals",
        "Veterinary Medicines",
        "Veterinary Instruments",
        "Veterinary Drugs",
        "Veterinary Injections"
      ]
    },
    {
      "name": "Sexual Wellness Products",
      "items": [
        "Female Hygiene Products & Test Kits",
        "Fertility Enhancer Drugs",
        "Contraceptives",
        "Pregnancy Test Kits",
        "Birth Control Pills"
      ]
    },
    {
      "name": "Respiratory System Drugs",
      "items": [
        "Anti Asthma Drug",
        "Levocetirizine HCl & Montelukast Sodium Tablet",
        "Asthma Inhaler",
        "Budesonide Inhaler & Nebulizer",
        "Beclomethasone Dipropionate Cream"
      ]
    },
    {
      "name": "Healthcare Products & Aids",
      "items": [
        "Health Drinks",
        "Glucose Powder",
        "Nebulizer Machine & Parts",
        "Massagers",
        "Steam Vaporizer"
      ]
    },
    {
      "name": "Immunization & Vaccination Drugs",
      "items": [
        "Vaccines",
        "Hepatitis B Vaccine",
        "Typhoid Vaccine",
        "Cholera Vaccine",
        "Diphtheria Antitoxin Injection"
      ]
    },
    {
      "name": "Homeopathic Medicines & Remedies",
      "items": [
        "Homeopathic Drugs",
        "Homeopathy Treatment",
        "Homoeopathic Syrup",
        "Homeopathic Drops",
        "Homeopathic Consultant"
      ]
    },
    {
      "name": "Ayurvedic,Herbal Products & Medicine",
      "items": [
        "Ayurvedic Medicine",
        "Natural Honey",
        "Honey & Sweeteners",
        "Ayurvedic Herbal Syrups & Tonics",
        "Ayurvedic Digestive Medicine"
      ]
    }
  ],
  "Hospital and Diagnosis Instrument": [
    {
      "name": "Surgical & ICU Equipments",
      "items": [
        "Medical Equipment & Accessories",
        "Pulse Oximeter, Glucometer & POCT Devices",
        "Biomedical Instruments",
        "ICU Equipments",
        "Operation Theater Equipments"
      ]
    },
    {
      "name": "Endoscopy & Laparoscopy instruments",
      "items": [
        "Absorbable Sutures",
        "Surgical Equipments",
        "Surgical Scissors",
        "Electrosurgical Unit",
        "Laparoscopic Instruments"
      ]
    },
    {
      "name": "Surgical Instruments & Accessories",
      "items": [
        "Surgical Accessories",
        "Surgical Instruments",
        "Catgut Suture",
        "Sutures",
        "Absorbable Sutures"
      ]
    },
    {
      "name": "Physiotherapy & Rehab Aids",
      "items": [
        "Rehabilitation Equipment",
        "Rehabilitation Belts",
        "Physiotherapy Equipment",
        "Heat Therapy Equipments",
        "Surgical Belts"
      ]
    },
    {
      "name": "Medical Laboratory Instruments",
      "items": [
        "Rapid Test Kit",
        "Blood Group Test Kit",
        "Syringes",
        "Pathology Lab Equipments",
        "Diagnostic Test Kit"
      ]
    },
    {
      "name": "Diagnostic Medical Imaging Equipment",
      "items": [
        "Electrodiagnostic Instruments",
        "Medical Imaging Machine & Accessories",
        "ECG Machine",
        "Diagnostic Imaging Accessories",
        "X Ray Centres"
      ]
    },
    {
      "name": "Dentist Tools, Equipment & Supplies",
      "items": [
        "Dental Instruments",
        "Dental Equipment",
        "Dental Implant Surgery Instrument",
        "Dental Chairs",
        "Dentures"
      ]
    },
    {
      "name": "Orthopedic Equipment & Supplies",
      "items": [
        "Orthotic Devices",
        "Orthopedic Instruments",
        "Orthopedic Surgical Instruments",
        "Orthopedic Implants",
        "Knee Braces"
      ]
    },
    {
      "name": "Face Mask & Medical PPE Kits",
      "items": [
        "Personal Protective Equipment",
        "Face Mask",
        "Disposable Gloves",
        "Surgical Mask",
        "N95 Mask"
      ]
    },
    {
      "name": "Infusion Syringes & Supplies",
      "items": [
        "Syringes",
        "Medical Tubes",
        "Disposable Syringe",
        "Insulin Syringe",
        "Catheter"
      ]
    },
    {
      "name": "Hospital and Medical Furniture",
      "items": [
        "Hospital Furniture",
        "Hospital Bed and Mattress",
        "Hospital Equipment",
        "Hospital Tables",
        "Hospital Chair"
      ]
    },
    {
      "name": "Eye Diagnosis & Surgery Instruments",
      "items": [
        "Eye Testing Machines",
        "Optical Components",
        "Ophthalmic Surgical Instruments",
        "Ophthalmic Equipment",
        "Optical Mirrors"
      ]
    },
    {
      "name": "Surgical & Medical Consumables",
      "items": [
        "Medical Supplies",
        "Surgical Disposables",
        "First Aid Boxes",
        "First Aid Kits",
        "Rubber Teat"
      ]
    },
    {
      "name": "Bandages & Dressing Disposables",
      "items": [
        "Cotton Bandage",
        "Bandages",
        "Cotton Wadding",
        "Adhesive Plaster",
        "Cotton Rolls"
      ]
    },
    {
      "name": "ENT Surgical Equipment & Supplies",
      "items": [
        "Laryngoscope Lamps",
        "Hearing Aids",
        "Laryngoscope",
        "ENT Instrument",
        "ENT Equipment"
      ]
    },
    {
      "name": "Wheel Chairs, Crutches and Walker",
      "items": [
        "Walking Aids",
        "Wooden Walking Stick",
        "Wheelchairs",
        "Crutches",
        "Walking Stick"
      ]
    },
    {
      "name": "Urological & Obstetrics Instruments",
      "items": [
        "Urology Equipment",
        "Gynaecological Equipment",
        "Urinary Catheter",
        "Gynecology Instrument",
        "Foley Catheter"
      ]
    },
    {
      "name": "Medical & Surgical Clothing",
      "items": [
        "Hospital Linen",
        "Hospital Uniforms",
        "Surgical Gown",
        "OT Linen",
        "Hospital Bed Sheet"
      ]
    },
    {
      "name": "Ayurvedic & Herbal Extracts",
      "items": [
        "Herbal Powder",
        "Herbal Extracts",
        "Green Tea Extract",
        "Black Tea Extract",
        "Moringa Leaves Powder"
      ]
    },
    {
      "name": "Pharmaceutical Machinery & Equipment",
      "items": [
        "Pharmaceutical Machines",
        "Pharmaceutical Processing Equipment",
        "Vibro Sifter",
        "Tablet Making Machines",
        "Double Cone Blender"
      ]
    }
  ],
  "Food & Beverages": [
    {
      "name": "Flavours & Aromatics",
      "items": [
        "Silica Sand",
        "Food Additive",
        "White Silica Sand",
        "Food Flavour",
        "Anti Caking Agents"
      ]
    },
    {
      "name": "Cereals & Food Grains",
      "items": [
        "Agro Products",
        "Rice",
        "Flours",
        "Brown Basmati Rice",
        "Food Grains"
      ]
    },
    {
      "name": "Cooking Spices and Masala",
      "items": [
        "Whole Spices",
        "Masala",
        "Turmeric Products",
        "Masala Powder",
        "Turmeric Powder"
      ]
    },
    {
      "name": "Milk & Dairy Products",
      "items": [
        "Dairy Products",
        "Milk",
        "Pure Ghee",
        "Cow Ghee",
        "Dairy Cream"
      ]
    },
    {
      "name": "Bakery & Confectionery Products",
      "items": [
        "Bakery Products",
        "Cake",
        "Pastry",
        "Confectionery Products",
        "Bread & Buns"
      ]
    },
    {
      "name": "Snacks and Namkeen",
      "items": [
        "Snack Foods",
        "Namkeen",
        "Chips",
        "Wafers",
        "Chocolate Snacks"
      ]
    },
    {
      "name": "Juices, Soups & Soft Drinks",
      "items": [
        "Carbonated Drinks",
        "Aerated Water",
        "Drinking Water",
        "Mineral Water Bottle",
        "Fruit Drinks"
      ]
    },
    {
      "name": "Ready to Eat & Instant Food Mixes",
      "items": [
        "Ready to Eat Food",
        "Corn Flakes",
        "Cereal Flake",
        "Breakfast Cereals",
        "Noodles Pasta & Instant Food"
      ]
    },
    {
      "name": "Fresh, Dried & Preserved Vegetables",
      "items": [
        "Fresh Vegetables",
        "Ginger",
        "Onion",
        "Root Vegetables",
        "Red Onion"
      ]
    },
    {
      "name": "Chocolates, Biscuits & Cookies",
      "items": [
        "Biscuit",
        "Chocolate",
        "Cadbury Chocolate",
        "Kitkat Chocolate",
        "Munch Chocolate"
      ]
    },
    {
      "name": "Fresh, Dried & Preserved Fruits",
      "items": [
        "Fresh Fruits",
        "Coconut",
        "Tropical Fruits",
        "Watermelon",
        "Avocado"
      ]
    },
    {
      "name": "Tea & Coffee",
      "items": [
        "Tea",
        "Coffee",
        "Black Tea",
        "Masala Tea",
        "Flavored Tea"
      ]
    },
    {
      "name": "Indian Sweets & Desserts",
      "items": [
        "Sweets",
        "Milk Sweets",
        "Gulab Jamun",
        "Rasgulla",
        "Laddu"
      ]
    },
    {
      "name": "Dry Fruits & Nuts",
      "items": [
        "Dry Fruits",
        "Edible Nuts",
        "Cashew Nuts",
        "Almond",
        "Dried Coconut"
      ]
    },
    {
      "name": "Edible Oil & Allied Products",
      "items": [
        "Cooking Oil",
        "Refined Oil",
        "Mustard Oil",
        "Soybean Refined Oil",
        "Soybean Oil"
      ]
    },
    {
      "name": "Pickles, Jams & Ketchups",
      "items": [
        "Sausage Casings",
        "Fruit Pastes",
        "Pickles",
        "Almond Butter",
        "Sauces"
      ]
    },
    {
      "name": "Marine Food Supplies",
      "items": [
        "Seafood",
        "Fresh Fish",
        "Fish",
        "Dry Fish",
        "Frozen Sea Foods"
      ]
    },
    {
      "name": "Meat & Poultry Food",
      "items": [
        "Sausage Casings",
        "Chicken",
        "Egg",
        "Meat Products",
        "Country Chicken"
      ]
    },
    {
      "name": "Organic Food Grains & Vegetables",
      "items": [
        "Organic Wheat",
        "Organic Food Grains",
        "Organic Corn",
        "Organic Mustard Oil",
        "Organic Spices"
      ]
    }
  ],
  "Industrial Plants & Machinery": [
    {
      "name": "Machines & Equipments",
      "items": [
        "Industrial Machinery",
        "Oil Filters",
        "Laundry Washing Machine",
        "Oil Filter Machine",
        "SPM Machine"
      ]
    },
    {
      "name": "Printing Machinery & Equipment",
      "items": [
        "Printing Machine",
        "Printing Machinery Spares",
        "Printing Squeegee",
        "Offset Printing Machines",
        "Printing Rollers"
      ]
    },
    {
      "name": "Conveyor Systems & Components",
      "items": [
        "Conveyors",
        "Conveyor Components",
        "Conveyor Belt",
        "Rollers",
        "Belt Conveyors"
      ]
    },
    {
      "name": "Apparel & Textile Machinery",
      "items": [
        "Auxiliary Machine",
        "Textile Machines",
        "Textile Machinery Spares",
        "Textile Processing Machines",
        "Ironing Machines"
      ]
    },
    {
      "name": "Material Handling Machines & Systems",
      "items": [
        "Material Handling Equipments",
        "Industrial Furniture",
        "Warehouse Stacker",
        "Straddle Carrier",
        "Pallet Machines"
      ]
    },
    {
      "name": "Pollution Control Devices & Machines",
      "items": [
        "Air Pollution Control Equipment",
        "Air Filters",
        "Dust Collector",
        "Air Purifier",
        "Hydrocyclone Sand Separator"
      ]
    },
    {
      "name": "Water Treatment & Purification Plant",
      "items": [
        "Reverse Osmosis Plants",
        "RO Machines",
        "Filter Media",
        "Industrial Reverse Osmosis Plant",
        "Water Treatment Plants"
      ]
    },
    {
      "name": "Milling & Grinding Tools",
      "items": [
        "Grinding Wheels",
        "Grinding Machines",
        "Milling Machines",
        "Grinding Stone",
        "Surface Grinding Machine"
      ]
    },
    {
      "name": "Welding Equipments & Machinery",
      "items": [
        "Welding Machine",
        "Welding Machine Parts",
        "Welding Accessories",
        "Arc Welding Machines",
        "Welding Flux"
      ]
    },
    {
      "name": "Industrial Furnaces & Ovens",
      "items": [
        "Industrial Furnaces",
        "Industrial Ovens",
        "Furnace Parts",
        "Chimney",
        "Conveyor Pizza Oven"
      ]
    },
    {
      "name": "CNC Machines & Lathe Machine",
      "items": [
        "CNC Machined Components",
        "CNC Machines",
        "Precision Machined Components",
        "Lathe Machine",
        "CNC Components"
      ]
    },
    {
      "name": "Drilling & Boring Equipment",
      "items": [
        "Electric Drill",
        "Boring Machine",
        "Bench Heavy Duty Drill",
        "Drilling Equipment",
        "Drill Bits"
      ]
    },
    {
      "name": "Hydraulic & Pneumatic Machines",
      "items": [
        "Hydraulic Machines",
        "Hydraulic Press",
        "Hydraulic Components",
        "Air Regulators",
        "Pneumatic Machines"
      ]
    },
    {
      "name": "Cutting Machines & Equipment",
      "items": [
        "Cutting Machine",
        "Metal Cutting Machines",
        "Cut Off Machine",
        "Paper Cutting Machine",
        "Laser Cutting Machines"
      ]
    },
    {
      "name": "Air Compressors, Accessories & Parts",
      "items": [
        "Air Compressor",
        "Compressor Spare Parts & Consumables",
        "Gas Compressors",
        "Air Dryers",
        "Screw Air Compressor"
      ]
    },
    {
      "name": "Food Grains & Nut Processing Machine",
      "items": [
        "Flour Mill",
        "Sorting Machinery",
        "Rice Mill",
        "Flour Mill Stone",
        "Rice Mill Machinery"
      ]
    },
    {
      "name": "Oxygen & Nitrogen Gas Plants",
      "items": [
        "Air Compressor",
        "Oxygen Cylinder",
        "Oxygen Concentrator",
        "Oxygen & Nitrogen Gas Plant",
        "Screw Air Compressor"
      ]
    },
    {
      "name": "Surface Coating & Paint Equipment",
      "items": [
        "Paint Brush",
        "Paint Applicators",
        "Paint Rollers",
        "Spray Painting Equipment",
        "Painting Roller Brushes"
      ]
    },
    {
      "name": "Bakery & Dairy Machinery",
      "items": [
        "Bakery Machinery",
        "Bakery Oven",
        "Dough Mixers",
        "Milk Processing Plant and Machines",
        "Pizza Oven"
      ]
    },
    {
      "name": "Cooling Tower, Heat Exchanger, Parts",
      "items": [
        "Heat Exchangers",
        "Demister Pad",
        "Cooling Towers",
        "Heat Exchanger Parts",
        "Shell and Tube Heat Exchanger"
      ]
    },
    {
      "name": "Sewing,Knitting & Embroidery Machine",
      "items": [
        "Sewing Machines",
        "Knitting Needles",
        "Industrial Sewing Machine",
        "Home Sewing Machine",
        "Sewing Machine Parts"
      ]
    },
    {
      "name": "Bending & Metalwork Machines",
      "items": [
        "Shearing Machines",
        "Bending Machine",
        "Sheet Metal Machinery",
        "Threading Machine",
        "Shaping Machine"
      ]
    },
    {
      "name": "Plastic Work & Processing Machines",
      "items": [
        "Plastic Processing Machinery",
        "Plastics Machinery",
        "Plastic Extrusion Machines",
        "Plastic Injection Moulding Machine",
        "Pipe Making Machinery"
      ]
    },
    {
      "name": "Fast Food & Beverages Machinery",
      "items": [
        "Snack Machine",
        "Food Warmers",
        "Noodle Machine",
        "Idli Maker",
        "Popcorn Machines"
      ]
    },
    {
      "name": "Chemical Plants & Machinery",
      "items": [
        "Industrial Distillation Plant",
        "Distillation Units",
        "Chemical Plant",
        "Diaphragm Pumps",
        "Chemical Pumps"
      ]
    },
    {
      "name": "Food Processing Plants & Machinery",
      "items": [
        "Food Processing Machine",
        "Food Mixer",
        "Food Grinder",
        "Sugarcane Juice Machine & Sugar Mill Machinery",
        "Wet Grinder"
      ]
    },
    {
      "name": "Wire Drawing & Cabling Machines",
      "items": [
        "Wire Machinery",
        "Coil Winders",
        "Wire Drawing Machines",
        "Winding Machines",
        "Fastener Making Machine"
      ]
    },
    {
      "name": "Paper Work & Making Machine",
      "items": [
        "Disposable Plate Making Machine",
        "Paper Machinery",
        "Paper Plate Making Machine",
        "Plate Making Machine",
        "Paper Cup Making Machine"
      ]
    },
    {
      "name": "Casting, Moulding & Forging Machines",
      "items": [
        "Molding Machines",
        "Injection Molding Machines",
        "Casting Machines",
        "Forging Machinery",
        "Die Casting Machines"
      ]
    },
    {
      "name": "Boilers & Boiler Parts",
      "items": [
        "Boiler",
        "Steam Boilers",
        "Boiler Accessories",
        "Industrial Boilers",
        "Boiler Fittings"
      ]
    },
    {
      "name": "Industrial Mixers & Homogenizers",
      "items": [
        "Industrial Mixers",
        "Powder Mixers",
        "Agitator",
        "Ribbon Blender",
        "Continuous Mixer"
      ]
    },
    {
      "name": "Chemical Reactors and Process Tanks",
      "items": [
        "Pressure Vessels",
        "Reaction Vessel",
        "Air Receiver",
        "Chemical Reactors",
        "Transport Tanks"
      ]
    },
    {
      "name": "Vending Machines & Dispensers",
      "items": [
        "Dispensers",
        "Water Dispensers",
        "Vending Machine",
        "Coffee Machine",
        "Drinking Water Pump"
      ]
    },
    {
      "name": "Pharmaceutical Machinery & Equipment",
      "items": [
        "Pharmaceutical Machines",
        "Pharmaceutical Processing Equipment",
        "Vibro Sifter",
        "Tablet Making Machines",
        "Double Cone Blender"
      ]
    },
    {
      "name": "Fruit & Vegetable Processing Machine",
      "items": [
        "Fruit Grading Machine",
        "Juice Extractor",
        "Vegetable Cutting Machine",
        "Fruit & Vegetable Processor",
        "Peeling Machine"
      ]
    },
    {
      "name": "Crusher, Shredder & Presses",
      "items": [
        "Power Press",
        "Pressing Machine",
        "Shredding Machine",
        "C Type Power Press Machine",
        "Mechanical Power Presses"
      ]
    },
    {
      "name": "Meat & Seafood Processing Equipments",
      "items": [
        "Poultry Equipment",
        "Egg Incubator",
        "Chick Brooder and Chick Guard",
        "Egg Grading Machine",
        "Meat Processing Equipment"
      ]
    },
    {
      "name": "Binding and Pressing Machines",
      "items": [
        "Binding Machines",
        "Printing Press",
        "Engraving Machines",
        "Laser Engraving Machines",
        "Heat Press Machine"
      ]
    },
    {
      "name": "Oil Mill & Oil Extraction Machinery",
      "items": [
        "Oil Extraction Machine",
        "Oil Production Plant",
        "Oil Expellers",
        "Mustard Oil Expeller",
        "Cold Press Oil Machine"
      ]
    },
    {
      "name": "Rubber Processing, Tyre Machinery",
      "items": [
        "Rubber Reclaim Plant & Machinery",
        "Rubber Moulding Machine",
        "Rubber Calender Machine",
        "Tyre Retreading Machine",
        "Rubber Machine Parts"
      ]
    },
    {
      "name": "Extraction Plants and Extruders",
      "items": [
        "Extraction Machinery",
        "Extruder Machine",
        "Hydro Machine",
        "Twin Screw Extruder",
        "Metal Refining Plant"
      ]
    },
    {
      "name": "Testing & Measuring Equipments",
      "items": [
        "Testing Equipment",
        "Water Testing Equipment",
        "Compression Testing Machine",
        "PH Meter",
        "Civil Engineering Test Equipment"
      ]
    },
    {
      "name": "Cranes, Forklift & Lifting Machines",
      "items": [
        "Crane",
        "Pulleys",
        "Crane Spare Parts",
        "Hoist",
        "Electric Forklift"
      ]
    },
    {
      "name": "VFD, PLC, HMI & Control Equipments",
      "items": [
        "Industrial Control Systems",
        "Industrial Automation Systems",
        "Industrial Control Panel",
        "PLC Control Panel",
        "Motor Drives"
      ]
    },
    {
      "name": "Heater, Thermostat & Heating Devices",
      "items": [
        "Water Heater & Geyser",
        "Heater & Heating Components",
        "Electric Water Heater",
        "Electric Geyser",
        "Industrial Heaters"
      ]
    },
    {
      "name": "Farming Tools, Equipment & Machines",
      "items": [
        "Agricultural Equipment",
        "Agricultural Implements",
        "Agricultural Tools",
        "Agricultural Machinery",
        "Agricultural Sprayers"
      ]
    },
    {
      "name": "Cleaning Machines & Equipments",
      "items": [
        "Vacuum Cleaner",
        "Home Vacuum Cleaner",
        "Blasting Machine",
        "Cleaning Machinery",
        "Pressure Washer"
      ]
    },
    {
      "name": "Repair & Maintenance Services",
      "items": [
        "Machinery Repairs",
        "Annual Maintenance Contract Services",
        "Plant Maintenance Services",
        "Industrial Repairing Service",
        "Maintenance Contractors"
      ]
    },
    {
      "name": "Excavator and Earth Moving Machinery",
      "items": [
        "Earthmoving Machinery",
        "Earth Movers",
        "Earthmoving Machinery Parts",
        "Earthmoving Equipment Rental",
        "JCB Spare Part"
      ]
    },
    {
      "name": "Elevators & Escalators",
      "items": [
        "Elevators",
        "Goods Lift",
        "Elevator Part",
        "Passenger Lifts",
        "Passenger Elevator"
      ]
    },
    {
      "name": "Freezers, Refrigerators & Chillers",
      "items": [
        "Under Counter Refrigerator",
        "Commercial Refrigerator",
        "Freezers",
        "Domestic Refrigerator",
        "Deep Freezer"
      ]
    },
    {
      "name": "Closing & Sealing Machines",
      "items": [
        "Seal Machines",
        "Pouch Sealing Machines",
        "Bag Sealer",
        "Bag Closing Machine",
        "Pasting Machine"
      ]
    },
    {
      "name": "Industrial Coolers, Blowers & Fans",
      "items": [
        "Blowers",
        "Air Ventilation System",
        "Industrial Fans",
        "Cooling Fans",
        "Industrial Air Cooler"
      ]
    },
    {
      "name": "Plant Design & Installation Services",
      "items": [
        "Installation Service",
        "Industrial Equipment Installation",
        "Plant & Equipment Erection Services",
        "Erection Commissioning Service",
        "Commissioning Services"
      ]
    },
    {
      "name": "Dryers & Evaporators",
      "items": [
        "Centrifugal Dryers",
        "Industrial Dryers",
        "Air Dryers",
        "Dryers",
        "Evaporator"
      ]
    },
    {
      "name": "Turnkey Consultants & Solutions",
      "items": [
        "Project Consultants",
        "Project Management",
        "Turnkey Solutions",
        "Turnkey Projects",
        "Market Research Service"
      ]
    },
    {
      "name": "Manufacturing & Assembling Services",
      "items": [
        "Machining Job Work",
        "CNC Machining Services",
        "CNC Turning JobWork Services",
        "Precision Machining Services",
        "VMC Machining Services"
      ]
    },
    {
      "name": "Used Machinery & Equipments",
      "items": [
        "Used Mini Offset Printing Machine",
        "Used Printing Machine",
        "Refurbished Medical Equipment",
        "Used Textile Machinery",
        "Refurbished MRI Scanner"
      ]
    },
    {
      "name": "Hydraulic Jacks, Lifts & Winches",
      "items": [
        "Industrial Jacks",
        "Hydraulic Jacks",
        "Scissor Lifts",
        "Hydraulic Lifts",
        "Winches"
      ]
    },
    {
      "name": "Bar, Neodymium & Permanent Magnets",
      "items": [
        "Magnet",
        "Magnetic Separators",
        "Magnetic Couplings",
        "Craft Magnets",
        "Magnetic Equipment"
      ]
    },
    {
      "name": "Product Engineering and Prototyping",
      "items": [
        "Product Designing",
        "Product Prototyping Services",
        "3D Product Design",
        "Product Engineering Service",
        "Mechanical Engineering Services"
      ]
    },
    {
      "name": "CAD CAM Design & Consultancy",
      "items": [
        "CNC Machining Services",
        "CAD Service",
        "CAD CAM Services",
        "3D Modeling Services",
        "AutoCAD Designing"
      ]
    },
    {
      "name": "Waste Management & Control Services",
      "items": [
        "Waste Management Services",
        "Water Treatment Services",
        "Wastewater Treatment Services",
        "Solid Waste Management",
        "ETP Operation Maintenance Services"
      ]
    },
    {
      "name": "Lubrication Systems and Equipment",
      "items": [
        "Lubricating Systems",
        "Grease Tools",
        "Grease Gun",
        "Lubrication Pumps",
        "Automatic Oil & Grease Lubricators"
      ]
    },
    {
      "name": "Packaging & Lamination Machinery",
      "items": [
        "Lamination Machines",
        "Adhesive Dispensing Equipment",
        "Paper Lamination Machine",
        "Adhesive Tape Making Machine",
        "Film Lamination Machine"
      ]
    },
    {
      "name": "Welding, Soldering & Brazing Service",
      "items": [
        "Welding Services",
        "Brazing Services",
        "Laser Welding Service",
        "Soldering Services",
        "PCB Soldering"
      ]
    }
  ],
  "Industrial Supplies": [
    {
      "name": "Pumps, Pumping Machines & Spares",
      "items": [
        "Submersible Pump",
        "Water Pumps",
        "Air Pumps",
        "Industrial Pumps",
        "Vacuum Pumps"
      ]
    },
    {
      "name": "Industrial & Engineering Goods",
      "items": [
        "Couplings",
        "Plastic Joint",
        "Plastic Coupling",
        "Pipe Couplings",
        "Metal Ladder"
      ]
    },
    {
      "name": "Oils, Grease & Lubricants",
      "items": [
        "Mineral Oils",
        "Automotive Oils",
        "Industrial Oils",
        "Engine Oil",
        "Waste Oils"
      ]
    },
    {
      "name": "Hoses & Hose Fittings",
      "items": [
        "Plastic Hose Pipe",
        "Hose Fittings & Parts",
        "Plastic Hose & Fittings",
        "Hose Pipes",
        "Rubber Hose Pipe"
      ]
    },
    {
      "name": "Storage Tanks, Drums & Containers",
      "items": [
        "Water Tanks",
        "Water Storage Tanks",
        "Plastic Water Tank",
        "Drums",
        "Metal Tank"
      ]
    },
    {
      "name": "Carts, Dollies & Trolleys",
      "items": [
        "Trolley",
        "Metal Trolley",
        "Stainless Steel Trolley",
        "Utility Trolley",
        "Material Handling Trolleys"
      ]
    },
    {
      "name": "Insulators & Insulation Materials",
      "items": [
        "Insulation Material",
        "Refractory Well Block",
        "Electrical Insulators",
        "Fibre Paper",
        "Electrical Insulation Materials"
      ]
    },
    {
      "name": "Rubber & Rubber Products",
      "items": [
        "Rubber Products",
        "Molded Rubber Products",
        "Rubber Tubes, Cords & Profiles",
        "Rubber Parts",
        "Rubber Sheets"
      ]
    },
    {
      "name": "Filters & Filtration Systems",
      "items": [
        "Filters",
        "Oil Filter Machine",
        "Air Filters",
        "Sand Filters",
        "Air Compressor Filter"
      ]
    },
    {
      "name": "Drilling Bits, Collets and Chucks",
      "items": [
        "Tapping Tools",
        "Drill Bits",
        "Drill Chucks",
        "Rock Drill Bits",
        "Lathe Chucks"
      ]
    },
    {
      "name": "Industrial Coolers, Blowers & Fans",
      "items": [
        "Blowers",
        "Air Ventilation System",
        "Industrial Fans",
        "Cooling Fans",
        "Industrial Air Cooler"
      ]
    },
    {
      "name": "Separators, Strainers & Purifiers",
      "items": [
        "Separator Equipments",
        "Sorting Machinery",
        "Demister Pad",
        "Oil Purifier",
        "Separating Machine"
      ]
    },
    {
      "name": "Stained, Etched & Laminated Glass",
      "items": [
        "Toughened Glass",
        "Designer Glass",
        "Glass Panel",
        "Decorative Glass",
        "Window Glass"
      ]
    },
    {
      "name": "Dryers & Evaporators",
      "items": [
        "Centrifugal Dryers",
        "Industrial Dryers",
        "Air Dryers",
        "Dryers",
        "Evaporator"
      ]
    },
    {
      "name": "Flanges & Flanged Fittings",
      "items": [
        "Flanges",
        "Steel Flanges",
        "Stainless Steel Flanges",
        "Mild Steel Flanges",
        "Pipe Flanges"
      ]
    },
    {
      "name": "Filter Assemblies and Spare Parts",
      "items": [
        "Cartridge Filters",
        "Filter Cartridges",
        "Filter Housings",
        "PP Filter Cartridge",
        "Filter Elements"
      ]
    },
    {
      "name": "Hydraulic Jacks, Lifts & Winches",
      "items": [
        "Industrial Jacks",
        "Hydraulic Jacks",
        "Scissor Lifts",
        "Hydraulic Lifts",
        "Winches"
      ]
    },
    {
      "name": "PVC, LDPE, HDPE & Plastic Sheets",
      "items": [
        "Plastic Sheets",
        "Floor Coverings",
        "Clear Plastic Sheet",
        "PVC Sheets",
        "Floor Protector"
      ]
    },
    {
      "name": "Bar, Neodymium & Permanent Magnets",
      "items": [
        "Magnet",
        "Magnetic Separators",
        "Magnetic Couplings",
        "Craft Magnets",
        "Magnetic Equipment"
      ]
    },
    {
      "name": "Wire Mesh & Gratings",
      "items": [
        "Wire Mesh",
        "Steel Mesh",
        "Metal Mesh",
        "Steel Gratings",
        "Welded Wire Mesh"
      ]
    },
    {
      "name": "Industrial Belts & V Belts",
      "items": [
        "Industrial Belts",
        "Conveyor Belt",
        "V Belts",
        "Timing Belts",
        "Roller Chains"
      ]
    },
    {
      "name": "Plastic, PVC & PP Products",
      "items": [
        "Plastic Molded Articles",
        "Molded Plastic Products",
        "Plastic Scrap",
        "Plastic Components",
        "Waste Plastic"
      ]
    },
    {
      "name": "Welding, Rods, Electrodes & Wires",
      "items": [
        "Welding Electrodes",
        "Welding Rods",
        "Welding Wires",
        "Brazing Paste",
        "Carbon Electrode"
      ]
    },
    {
      "name": "Fiber Glass Products",
      "items": [
        "Fiberglass Products",
        "FRP Sheet",
        "Fiberglass Sheet",
        "FRP Products",
        "Fiberglass Mesh"
      ]
    },
    {
      "name": "Engineering and Shipping Ropes",
      "items": [
        "Rope",
        "Fibre Rope",
        "Strand Rope",
        "Wire Ropes",
        "Twine"
      ]
    },
    {
      "name": "Industrial Racks & Storage System",
      "items": [
        "Warehouse Racks",
        "Industrial Storage Rack",
        "Slotted Angle Racks",
        "Pallet Racks",
        "Steel Racks"
      ]
    },
    {
      "name": "Industrial & Machine Brushes",
      "items": [
        "Industrial Brushes",
        "Wire Brush",
        "Abrasive Brushes",
        "Synthetic Brush",
        "Cup Brushes"
      ]
    },
    {
      "name": "Stamping Tools & Stamping Machine",
      "items": [
        "Stamping Parts",
        "Stamping Tools & Parts",
        "Rubber Stamps",
        "Round Stamp & Pre Ink Stamp",
        "Automotive & Electrical Stampings"
      ]
    },
    {
      "name": "Heavy & Light Duty Caster Wheels",
      "items": [
        "Caster Wheels",
        "Nylon, Plastic, PU, Rubber & Metal Wheel",
        "Trolley Wheels",
        "PU, Nylon, Rubber, Steel Casters",
        "PU Casters"
      ]
    },
    {
      "name": "Rust & Corrosion Protection Products",
      "items": [
        "Rust Preventive Oil",
        "Rust Preventives",
        "Anti Corrosion Products",
        "Rust Removers",
        "Anti Corrosion Coating"
      ]
    },
    {
      "name": "Enclosures & Cabinets",
      "items": [
        "Electronic Enclosures",
        "Electrical Box",
        "Junction Boxes",
        "Electrical Cabinets",
        "Switch Mounting Boxes"
      ]
    },
    {
      "name": "Lubrication Systems and Equipment",
      "items": [
        "Lubricating Systems",
        "Grease Tools",
        "Grease Gun",
        "Lubrication Pumps",
        "Automatic Oil & Grease Lubricators"
      ]
    },
    {
      "name": "3D Printer & Services",
      "items": [
        "3D CAD Designing",
        "3D Prototype Printing Services",
        "3D Printer",
        "2D Designing Service",
        "Rapid Prototyping"
      ]
    },
    {
      "name": "Disinfection Equipment & Machines",
      "items": [
        "Agricultural Sprayers",
        "Disinfectant Sprayers",
        "Fumigation Machine",
        "Battery Spray Pump",
        "Agricultural Power Sprayer"
      ]
    },
    {
      "name": "Plastic & Rubber Products",
      "items": [
        "Pet Preform",
        "Pet Bottle Preform",
        "Dioctyl Phthalate"
      ]
    },
    {
      "name": "Industrial Valves & Valve Fittings",
      "items": [
        "Industrial Valves",
        "Ball Valves",
        "Pressure Reducing Valve",
        "Safety & Pressure Relief Valves",
        "Check Valves"
      ]
    },
    {
      "name": "Industrial Air Conditioner & Devices",
      "items": [
        "Commercial Air Conditioner",
        "HVAC System",
        "Air Conditioner Parts",
        "Chillers",
        "Industrial Air Conditioning System"
      ]
    },
    {
      "name": "Metal Pipe & Plumbing Fittings",
      "items": [
        "Pipe Fittings",
        "Pipe Elbows",
        "Stainless Steel Elbow",
        "Pipe Tees",
        "Pipe Nipples"
      ]
    },
    {
      "name": "Batteries & Charge Storage Devices",
      "items": [
        "Batteries",
        "Inverter Battery",
        "Lithium Ion Battery",
        "Industrial Batteries",
        "Lithium Primary Battery"
      ]
    },
    {
      "name": "Electric Motors and Components",
      "items": [
        "Electric Motor",
        "Three Phase Electric Motor",
        "Single Phase Electric Motor",
        "AC Motor",
        "DC Motor"
      ]
    },
    {
      "name": "Drills, Grinders, Saws & Power Tools",
      "items": [
        "Power Tools",
        "Electric Drill",
        "Bench Heavy Duty Drill",
        "Electric Cutting Tools",
        "Heavy Drilling Machine"
      ]
    },
    {
      "name": "Electric Circuit Components & Spares",
      "items": [
        "Electronic Components",
        "Electronic Appliances Circuit Boards",
        "Semiconductor Device",
        "Plastic Electronic Components",
        "PCB Circuit"
      ]
    },
    {
      "name": "Gearbox, Axle, Sprocket & Gear Parts",
      "items": [
        "Couplings",
        "Plastic Coupling",
        "Pipe Couplings",
        "Automotive Gears",
        "Gearbox"
      ]
    },
    {
      "name": "Heater, Thermostat & Heating Devices",
      "items": [
        "Water Heater & Geyser",
        "Heater & Heating Components",
        "Electric Water Heater",
        "Electric Geyser",
        "Industrial Heaters"
      ]
    },
    {
      "name": "Industrial Uniforms & Safety Wear",
      "items": [
        "Working Bib Pant",
        "Industrial Clothing",
        "N95 Mask",
        "Industrial Gloves",
        "Industrial Safety Helmets"
      ]
    },
    {
      "name": "Adhesives, Glue and Sealants",
      "items": [
        "Adhesive Gum",
        "Fevicol Adhesive",
        "Caulking Compounds",
        "Wood Adhesive",
        "Acrylic Sealants"
      ]
    },
    {
      "name": "Industrial Pipe & Tube Fittings",
      "items": [
        "Steel Pipe Fittings",
        "Stainless Steel Pipe Fittings",
        "Tube Fittings",
        "Pipeline Accessories",
        "Industrial Coupling"
      ]
    },
    {
      "name": "Nails, Fasteners, Rivets & Shackles",
      "items": [
        "Fasteners",
        "Rivets",
        "Metal Fastener",
        "Anchor Fasteners",
        "Studs"
      ]
    },
    {
      "name": "Seals, Oil Seals & Industrial Seals",
      "items": [
        "Seals",
        "Oil Seals",
        "Rubber O Ring",
        "O-rings",
        "Rubber Seals"
      ]
    },
    {
      "name": "Steel & Stainless Steel Products",
      "items": [
        "Industrial Steel",
        "Industrial Stainless Steel Products",
        "Steel Ingots",
        "Stainless Steel",
        "Steel Products"
      ]
    },
    {
      "name": "Steel Pipes and Tubes",
      "items": [
        "Stainless Steel Pipes",
        "Steel Pipes",
        "MS Pipe",
        "Steel Tubes",
        "Galvanized Iron Pipes"
      ]
    },
    {
      "name": "Steel Bars, Rods, Plates & Sheets",
      "items": [
        "Hot Rolled Steel Angle Bar",
        "Hot Rolled Bars",
        "Steel Bars",
        "TMT Bars",
        "Steel Rods"
      ]
    },
    {
      "name": "Fire Fighting & Prevention Products",
      "items": [
        "Fire Fighting Equipments",
        "Fire Extinguishers",
        "Fire Alarm Systems",
        "Fire Alarms",
        "Dry Powder Fire Extinguisher"
      ]
    },
    {
      "name": "Chisels & Professional Hand Tools",
      "items": [
        "Hand Tools",
        "Wooden Tool Handles",
        "Drill Bits",
        "Tool Handles",
        "Professional Hand Tools"
      ]
    },
    {
      "name": "Ball Bearings and Bearing Assemblies",
      "items": [
        "Ball Bearings",
        "Bearings",
        "Roller Bearings",
        "Industrial Bearings",
        "Deep Groove Ball Bearings"
      ]
    },
    {
      "name": "Industrial & Metal Fabrication",
      "items": [
        "Fabrication Works",
        "Metal Fabrication",
        "Structural Fabrication",
        "Industrial Fabrication",
        "Fabrication Services"
      ]
    },
    {
      "name": "Electric Fittings & Components",
      "items": [
        "Electrical Equipments",
        "Electrical Components",
        "Electrodes",
        "Earthing Equipment",
        "Earthing Electrodes"
      ]
    },
    {
      "name": "Brackets, Holder & Hardware Fittings",
      "items": [
        "Metal Angles",
        "Hardware Accessories",
        "Aluminium Profiles",
        "Metal Fitting",
        "Iron Angle"
      ]
    },
    {
      "name": "PVC, FRP, HDPE & Other Plastic Pipes",
      "items": [
        "Agricultural Pipes",
        "PVC Pipes",
        "Industrial Plastic Pipes",
        "Plumbing Pipe",
        "Rubber Pipes"
      ]
    },
    {
      "name": "Elevators & Escalators",
      "items": [
        "Elevators",
        "Goods Lift",
        "Elevator Part",
        "Passenger Lifts",
        "Passenger Elevator"
      ]
    },
    {
      "name": "Material Testing Labs & Services",
      "items": [
        "Testing Services",
        "Electrical Testing Service",
        "Energy Monitoring Service",
        "Laboratory Testing Services",
        "Chemical Testing Services"
      ]
    },
    {
      "name": "Metal Finishing & Coating Services",
      "items": [
        "Coating Services",
        "Polishing Service",
        "Electroplating Services",
        "Powder Coating Services",
        "Blasting Job Works"
      ]
    },
    {
      "name": "Adhesive & Pressure Sensitive Tapes",
      "items": [
        "Tape",
        "Self Adhesive Tapes",
        "Stationery Tape",
        "Paper Tape",
        "Tissue Tapes"
      ]
    },
    {
      "name": "Moulds, Jigs and Casting Dies",
      "items": [
        "Casting Dies",
        "Press Dies",
        "Press Tools",
        "Jig Fixture",
        "Metal Die"
      ]
    },
    {
      "name": "Measurement Gauges & Gauge Fittings",
      "items": [
        "Pressure Gauge",
        "Level Gauge",
        "Thickness Gauge",
        "Height Gauge",
        "Stainless Steel Pressure Gauge"
      ]
    },
    {
      "name": "Freezers, Refrigerators & Chillers",
      "items": [
        "Under Counter Refrigerator",
        "Commercial Refrigerator",
        "Freezers",
        "Domestic Refrigerator",
        "Deep Freezer"
      ]
    },
    {
      "name": "PVC, CPVC, HDPE Water Pipe Fittings",
      "items": [
        "Plastic Fittings",
        "Plastic Pipe Fittings",
        "Plastic Joint",
        "PVC Pipe Fittings",
        "Lateral Cock"
      ]
    },
    {
      "name": "Sheet Metal & Turned Components",
      "items": [
        "Machine Parts",
        "Sheet Metals",
        "Machined Components",
        "Metal Machined Parts",
        "Sheet Metal Parts"
      ]
    },
    {
      "name": "Die Casting & Investment Castings",
      "items": [
        "Metal Castings",
        "Die Casting",
        "CI Castings",
        "Iron Castings",
        "Aluminium Die Casting"
      ]
    },
    {
      "name": "Lifting Hooks, Chains & Clamps",
      "items": [
        "Metal Chain",
        "Chain and Pulley Blocks",
        "Chain Pulley Block",
        "Steel Chains",
        "Lifting, Link and Drag Chains"
      ]
    },
    {
      "name": "Air Springs & Compression Springs",
      "items": [
        "Compression Springs",
        "Industrial Springs",
        "Metal Spring",
        "Coil Springs",
        "Extension Springs"
      ]
    },
    {
      "name": "Instrument Calibration & Adjustment",
      "items": [
        "Calibration Services",
        "Machine Testing Services",
        "Vibration Analysis Services",
        "Instrument Calibration Services",
        "NABL Accreditation"
      ]
    },
    {
      "name": "Rubber Gaskets and Gasket Material",
      "items": [
        "Gaskets",
        "Rubber Gaskets",
        "Grommet",
        "Silicone Rubber Gasket",
        "Industrial Gaskets"
      ]
    },
    {
      "name": "Aluminum, Brass, Bronze Pipes",
      "items": [
        "Metal Pipes",
        "Iron Tubes",
        "Iron Pipe",
        "Rounded Pipe",
        "Metal Tubes"
      ]
    },
    {
      "name": "Metal Scrap & Waste Materials",
      "items": [
        "Metal Scrap",
        "Ferrous Metal Scrap",
        "Cast Iron Scraps",
        "Iron Scrap",
        "Aluminium Scrap"
      ]
    },
    {
      "name": "Boilers & Boiler Parts",
      "items": [
        "Boiler",
        "Steam Boilers",
        "Boiler Accessories",
        "Industrial Boilers",
        "Boiler Fittings"
      ]
    },
    {
      "name": "Manufacturing & Assembling Services",
      "items": [
        "Machining Job Work",
        "CNC Machining Services",
        "CNC Turning JobWork Services",
        "Precision Machining Services",
        "VMC Machining Services"
      ]
    },
    {
      "name": "Electrical Conduits and Fittings",
      "items": [
        "PVC Conduit Pipes",
        "Conduit Pipes",
        "Cable Trays",
        "Cable Raceways",
        "Wire Pipe"
      ]
    },
    {
      "name": "Product Engineering and Prototyping",
      "items": [
        "Product Designing",
        "Product Prototyping Services",
        "3D Product Design",
        "Product Engineering Service",
        "Mechanical Engineering Services"
      ]
    },
    {
      "name": "Metal, Security & Safety Detectors",
      "items": [
        "Metal Detector",
        "Hand-held Metal Detector",
        "Door Frame Metal Detector",
        "Security Metal Baggage & Vehicle Scanner",
        "Fake Note Detector Machine"
      ]
    },
    {
      "name": "Forgings, Forging Parts & Supplies",
      "items": [
        "Forgings",
        "Forged Components",
        "Metal Forgings",
        "Forged Automotive Components",
        "Forged Ring"
      ]
    },
    {
      "name": "Auto Piston & Crankshaft Assemblies",
      "items": [
        "Piston",
        "Crankshafts and Crankshafts Parts",
        "Camshafts and Camshafts Parts",
        "Piston Components",
        "Cylinder Liner"
      ]
    },
    {
      "name": "Smoke & Gas Leak Detectors",
      "items": [
        "Smoke Detector",
        "Gas Leak Detector",
        "Gas Detector",
        "Gas Sensors",
        "Wireless Smoke Detector"
      ]
    },
    {
      "name": "Clutch, Clutch Parts and Accessories",
      "items": [
        "Two Wheeler Clutch Components",
        "Truck & Bus Clutch and Pressure Plate",
        "Two Wheeler Pressure Plates",
        "Commercial Vehicle Clutch Parts",
        "Clutch Components"
      ]
    },
    {
      "name": "Metal & Plastic Moulding Services",
      "items": [
        "Molding Services",
        "Plastic Molded Parts",
        "Injection Molding Job Works",
        "Plastic Injection Molding Services",
        "Plastic Molding Services"
      ]
    },
    {
      "name": "Welding, Soldering & Brazing Service",
      "items": [
        "Welding Services",
        "Brazing Services",
        "Laser Welding Service",
        "Soldering Services",
        "PCB Soldering"
      ]
    },
    {
      "name": "Pipe Elbows, Joints & Couplings",
      "items": [
        "Pipe Elbows",
        "Expansion Joints",
        "Metal Joints",
        "Bellow Expansion Joint",
        "Rubber Joints"
      ]
    }
  ],
  "Building & Construction": [
    {
      "name": "Metal Pipe & Plumbing Fittings",
      "items": [
        "Pipe Fittings",
        "Pipe Elbows",
        "Stainless Steel Elbow",
        "Pipe Tees",
        "Pipe Nipples"
      ]
    },
    {
      "name": "Building & Construction Machines",
      "items": [
        "Construction Machines",
        "Construction Equipment",
        "Concrete Mixers",
        "Construction Machinery Spare Parts",
        "Crushing Machines & Plants"
      ]
    },
    {
      "name": "Paints, Wall Putty & Varnishes",
      "items": [
        "Paints",
        "Emulsion Paints",
        "Enamel Paints",
        "Synthetic Enamel Paint",
        "Decorative Paints and coatings"
      ]
    },
    {
      "name": "Cranes, Forklift & Lifting Machines",
      "items": [
        "Crane",
        "Pulleys",
        "Crane Spare Parts",
        "Hoist",
        "Electric Forklift"
      ]
    },
    {
      "name": "Doors and Windows",
      "items": [
        "Door",
        "Window",
        "Metal Doors",
        "Wooden Door",
        "Metal Window"
      ]
    },
    {
      "name": "Wood, Plywood, Veneer & Laminates",
      "items": [
        "Plywoods",
        "Wood",
        "Laminate Sheets",
        "Wood Laminates",
        "Wall Panels"
      ]
    },
    {
      "name": "Adhesives, Glue and Sealants",
      "items": [
        "Adhesive Gum",
        "Fevicol Adhesive",
        "Caulking Compounds",
        "Wood Adhesive",
        "Acrylic Sealants"
      ]
    },
    {
      "name": "Industrial Pipe & Tube Fittings",
      "items": [
        "Steel Pipe Fittings",
        "Stainless Steel Pipe Fittings",
        "Tube Fittings",
        "Pipeline Accessories",
        "Industrial Coupling"
      ]
    },
    {
      "name": "Building  & Real Estate Developers",
      "items": [
        "Construction Service",
        "Commercial Construction Service",
        "Building Construction",
        "Residential Construction Projects",
        "Commercial Buildings Construction"
      ]
    },
    {
      "name": "Architectural & Civil Engineering",
      "items": [
        "Architectural Services",
        "Civil Engineering Service",
        "Architectural Designing Services",
        "Civil Works Service",
        "Waterproofing Service"
      ]
    },
    {
      "name": "Door & Window, Hinges & Fittings",
      "items": [
        "Door Hardware",
        "Automatic Door Closer",
        "Door & Window Hinges",
        "Door Closer",
        "Door Hinges"
      ]
    },
    {
      "name": "FRP Lining, PU & Powder Coatings",
      "items": [
        "Industrial Paints and Coatings",
        "Spray Paints",
        "Powder Coating",
        "Waterproof Paint",
        "Epoxy Paints and Coatings"
      ]
    },
    {
      "name": "Steel Pipes and Tubes",
      "items": [
        "Stainless Steel Pipes",
        "Steel Pipes",
        "MS Pipe",
        "Steel Tubes",
        "Galvanized Iron Pipes"
      ]
    },
    {
      "name": "Steel Bars, Rods, Plates & Sheets",
      "items": [
        "Hot Rolled Steel Angle Bar",
        "Hot Rolled Bars",
        "Steel Bars",
        "TMT Bars",
        "Steel Rods"
      ]
    },
    {
      "name": "Roofing and False ceiling",
      "items": [
        "Roofing Sheets",
        "False Ceiling",
        "Ceramic Roof Tile",
        "False Ceiling Designing",
        "Metal Roofing Sheet"
      ]
    },
    {
      "name": "Brackets, Holder & Hardware Fittings",
      "items": [
        "Metal Angles",
        "Hardware Accessories",
        "Aluminium Profiles",
        "Metal Fitting",
        "Iron Angle"
      ]
    },
    {
      "name": "PVC, FRP, HDPE & Other Plastic Pipes",
      "items": [
        "Agricultural Pipes",
        "PVC Pipes",
        "Industrial Plastic Pipes",
        "Plumbing Pipe",
        "Rubber Pipes"
      ]
    },
    {
      "name": "Wash Basins, Sanitaryware & Fittings",
      "items": [
        "Sanitary Ware",
        "Wash Basins",
        "Kitchen Sinks",
        "Plastic Sinks",
        "Toilet Seats"
      ]
    },
    {
      "name": "Excavator and Earth Moving Machinery",
      "items": [
        "Earthmoving Machinery",
        "Earth Movers",
        "Earthmoving Machinery Parts",
        "Earthmoving Equipment Rental",
        "JCB Spare Part"
      ]
    },
    {
      "name": "Building Panels & Cladding Materials",
      "items": [
        "Grills",
        "Wall Panels",
        "Concrete Jali",
        "Wall Partitions And Door Partitions",
        "Concrete Slabs"
      ]
    },
    {
      "name": "Elevators & Escalators",
      "items": [
        "Elevators",
        "Goods Lift",
        "Elevator Part",
        "Passenger Lifts",
        "Passenger Elevator"
      ]
    },
    {
      "name": "Gate, Grilles, Fences & Railings",
      "items": [
        "Cement Grill",
        "Grills",
        "Metal Gate",
        "Gates",
        "Metal Grill"
      ]
    },
    {
      "name": "Vitrified,Ceramic Floor & Wall Tiles",
      "items": [
        "Ceramic Tiles",
        "Ceramic Art Tiles",
        "Ceramic Wall Tiles",
        "Ceramic Floor Tiles",
        "Designer Tiles"
      ]
    },
    {
      "name": "PVC, CPVC, HDPE Water Pipe Fittings",
      "items": [
        "Plastic Fittings",
        "Plastic Pipe Fittings",
        "Plastic Joint",
        "PVC Pipe Fittings",
        "Lateral Cock"
      ]
    },
    {
      "name": "Faucets, Water Taps and Bib Cocks",
      "items": [
        "Faucets",
        "Water Tap",
        "Bathroom Showers",
        "Stainless Steel Tap",
        "Bathroom Fittings"
      ]
    },
    {
      "name": "Cement and Concrete",
      "items": [
        "Portland Cement",
        "Slag Cement",
        "Cement",
        "Calcium Aluminate Cement",
        "Roofing & Special Purpose Cements"
      ]
    },
    {
      "name": "Bricks & Construction Aggregates",
      "items": [
        "Building Materials",
        "River Sand",
        "Ceramic Brick",
        "Bricks",
        "Construction Sand"
      ]
    },
    {
      "name": "Prefabricated Houses & Structures",
      "items": [
        "House Construction Services",
        "Prefabricated Houses",
        "Prefabricated Structures",
        "Prefabricated Shed",
        "Industrial Sheds"
      ]
    },
    {
      "name": "Bathroom Accessories",
      "items": [
        "Bathroom Accessories",
        "Soap & Sanitizer Dispenser",
        "Soap Dishes",
        "Towel Holder",
        "Bathroom Rack"
      ]
    },
    {
      "name": "Lifting Hooks, Chains & Clamps",
      "items": [
        "Metal Chain",
        "Chain and Pulley Blocks",
        "Chain Pulley Block",
        "Steel Chains",
        "Lifting, Link and Drag Chains"
      ]
    },
    {
      "name": "Scaffolding Pipes and Fittings",
      "items": [
        "Scaffolding Accessories",
        "Scaffoldings",
        "Scaffolding Planks & Plates",
        "Base Plates",
        "Scaffolding Props & Spans"
      ]
    },
    {
      "name": "Vinyl, Plastic & Rubber Floor Tiles",
      "items": [
        "Floor Coverings",
        "PVC Floorings",
        "Epoxy Flooring",
        "Vinyl Floorings",
        "Sports Floorings"
      ]
    },
    {
      "name": "Door, Window Handles & Knockers",
      "items": [
        "Door Handles",
        "Door Pull Handle",
        "Wood Handles",
        "Cabinet Handles",
        "Stainless Steel Door Handles"
      ]
    },
    {
      "name": "Curtain and Drapery Hardware",
      "items": [
        "Curtain Fittings",
        "Designer Curtain",
        "Drape Curtain",
        "Window Curtains",
        "Curtain Brackets"
      ]
    },
    {
      "name": "Clamps and Clamping Equipment",
      "items": [
        "Clamps",
        "Metal Clamps",
        "Stainless Steel Clamps",
        "Hose Clamps",
        "Mild Steel Clamps"
      ]
    },
    {
      "name": "Aluminum, Brass, Bronze Pipes",
      "items": [
        "Metal Pipes",
        "Iron Tubes",
        "Iron Pipe",
        "Rounded Pipe",
        "Metal Tubes"
      ]
    },
    {
      "name": "Real Estate Agent & Property Dealers",
      "items": [
        "Real Estate Services",
        "Residential Property",
        "Residential Flats",
        "Property Dealers",
        "Commercial Property"
      ]
    },
    {
      "name": "Staircase, Balusters and Stair Parts",
      "items": [
        "Railing Fittings",
        "Stainless Steel Railings",
        "Steel Railings",
        "Stair Railings",
        "Glass Railing"
      ]
    },
    {
      "name": "Gazebos, Awnings, Canopies & Sheds",
      "items": [
        "Canopy Sheds",
        "Sheds and Tents",
        "Canopies",
        "Car Sheds",
        "Awnings"
      ]
    },
    {
      "name": "Hardware: Hooks & Mounts",
      "items": [
        "Hanging Hooks",
        "Wall Hooks",
        "Key Hooks",
        "Iron Hook",
        "Mounting Accessories"
      ]
    },
    {
      "name": "Beams, Purlins, Frames and Girders",
      "items": [
        "Steel Girder Bridge",
        "Building Beams & Girders",
        "Metal Channels",
        "Building Columns & Pillars",
        "Metal Beams"
      ]
    },
    {
      "name": "Door, Window Frame, Panel & Shutters",
      "items": [
        "Iron Rolling Shutter",
        "Wall Partitions And Door Partitions",
        "Rolling Shutters",
        "Door Frames",
        "Aluminium Partitions"
      ]
    },
    {
      "name": "Fountains & Water Features",
      "items": [
        "Water Fountain",
        "Garden Fountains",
        "Decorative Fountain",
        "Iron Bird Bath",
        "Fountain Waterfall"
      ]
    },
    {
      "name": "Sewerage and Drainage Products",
      "items": [
        "Manhole Covers",
        "Drainage Pipes & Pipe Fittings",
        "Drains and Gutters",
        "Cement Pipes",
        "RCC Pipes"
      ]
    },
    {
      "name": "Hardwood Flooring & Wooden Floor Tiles",
      "items": [
        "Wooden Flooring",
        "Wood Tiles",
        "Flooring Services",
        "Laminate Floorings",
        "Hardwood Flooring"
      ]
    },
    {
      "name": "Acoustic Window, Foam & Enclosures",
      "items": [
        "Acoustic Enclosures",
        "Sound Absorption Equipment",
        "Acoustical Panels",
        "Sound Proof Enclosures",
        "Soundproof Windows"
      ]
    },
    {
      "name": "Geotextile, Geogrids & Pond Liners",
      "items": [
        "Geosynthetics",
        "Geomembranes",
        "Geosynthetic Clay Liners",
        "Waterproof Membranes",
        "Geotextile Fabrics"
      ]
    },
    {
      "name": "Landscape Structure and Designing",
      "items": [
        "Landscaping Services",
        "Gardening Service",
        "Landscape Design",
        "Garden Landscaping Services",
        "Garden Maintenance"
      ]
    },
    {
      "name": "Shower Panels & Accessories",
      "items": [
        "Bathroom Showers",
        "Shower Enclosure & Cabins",
        "Shower Accessories",
        "Shower Heads",
        "Glass Shower Enclosure"
      ]
    },
    {
      "name": "Door Skins, Panels & Profile",
      "items": [
        "Plastic, PVC & UPVC Profiles",
        "Wooden Beading",
        "Door Skin & Laminates",
        "Door Skin",
        "Window Door Profile"
      ]
    },
    {
      "name": "Bath Tubs, Jacuzzi & Hot Tubs",
      "items": [
        "Ceramic Bathtub",
        "Bath Tubs",
        "Cast Iron Bathtub",
        "Steel Bathtub",
        "Jacuzzi Bathtub"
      ]
    },
    {
      "name": "Pipe Elbows, Joints & Couplings",
      "items": [
        "Pipe Elbows",
        "Expansion Joints",
        "Metal Joints",
        "Bellow Expansion Joint",
        "Rubber Joints"
      ]
    },
    {
      "name": "Nails, Fasteners, Rivets & Shackles",
      "items": [
        "Fasteners",
        "Rivets",
        "Metal Fastener",
        "Anchor Fasteners",
        "Studs"
      ]
    },
    {
      "name": "Granite, Marble, Sandstone & Others",
      "items": [
        "Marble",
        "Granite Stone",
        "Granite",
        "Travertine",
        "Limestone"
      ]
    },
    {
      "name": "Door Lock, Electronic Lock & Latches",
      "items": [
        "Door Lock",
        "Safety Padlocks",
        "Security Lock",
        "Padlock",
        "Anti Theft Lock"
      ]
    },
    {
      "name": "Industrial & Metal Fabrication",
      "items": [
        "Fabrication Works",
        "Metal Fabrication",
        "Structural Fabrication",
        "Industrial Fabrication",
        "Fabrication Services"
      ]
    },
    {
      "name": "Carts, Dollies & Trolleys",
      "items": [
        "Trolley",
        "Metal Trolley",
        "Stainless Steel Trolley",
        "Utility Trolley",
        "Material Handling Trolleys"
      ]
    },
    {
      "name": "Surface Coating & Paint Equipment",
      "items": [
        "Paint Brush",
        "Paint Applicators",
        "Paint Rollers",
        "Spray Painting Equipment",
        "Painting Roller Brushes"
      ]
    },
    {
      "name": "Stained, Etched & Laminated Glass",
      "items": [
        "Toughened Glass",
        "Designer Glass",
        "Glass Panel",
        "Decorative Glass",
        "Window Glass"
      ]
    },
    {
      "name": "Computer & Mobile Apps Development",
      "items": [
        "Mobile Application Development",
        "Customized Software Solution",
        "Application Development Service",
        "Android Application Development Services",
        "Application Software Packages"
      ]
    },
    {
      "name": "Wire Mesh & Gratings",
      "items": [
        "Wire Mesh",
        "Steel Mesh",
        "Metal Mesh",
        "Steel Gratings",
        "Welded Wire Mesh"
      ]
    },
    {
      "name": "Construction Equipment Rentals",
      "items": [
        "Construction Equipment Rental Service",
        "Earthmoving Equipment Rental",
        "Crane Rental",
        "Excavator Rental",
        "JCB Excavator Rental"
      ]
    },
    {
      "name": "Garments & Textiles Job Work",
      "items": [
        "Stitching Services",
        "Embroidery Job Work",
        "Garment Stitching Service",
        "Ladies Clothes Stitching Services",
        "Tailors"
      ]
    },
    {
      "name": "Cobbles, Pebbles & Pavings",
      "items": [
        "Pebble Stone",
        "Pebbles",
        "Paver",
        "Paver Blocks",
        "KERB Stones"
      ]
    },
    {
      "name": "Stone Tiles & Floorings",
      "items": [
        "Stone Tiles",
        "Mosaic Sandstone Tiles",
        "Natural Stone Tiles",
        "Marble Tiles",
        "Marble Floor Tiles"
      ]
    },
    {
      "name": "Building Survey & Soil Investigation",
      "items": [
        "Geotechnical Engineering",
        "Mapping Service",
        "Site Survey Services",
        "Geotechnical Investigation Services",
        "Layout Survey Services"
      ]
    },
    {
      "name": "Warehouses and Warehousing Agents",
      "items": [
        "Warehousing Services",
        "Cold Storage Services",
        "Cold Storage Rooms",
        "Goods Warehousing Service",
        "Procurement Services"
      ]
    }
  ],
  "Apparel & Garments": [
    {
      "name": "Ladies Dresses, Apparels & Clothings",
      "items": [
        "Ladies Kurti",
        "Ladies Wear",
        "Ladies Suits",
        "Women Clothes",
        "Designer Kurtis"
      ]
    },
    {
      "name": "Apparel Fabrics & Clothing Textiles",
      "items": [
        "Fabric",
        "Cotton Fabric",
        "Cotton Textile",
        "Woven Fabrics",
        "Cotton Woven Fabrics"
      ]
    },
    {
      "name": "Industrial Uniforms & Safety Wear",
      "items": [
        "Working Bib Pant",
        "Industrial Clothing",
        "N95 Mask",
        "Industrial Gloves",
        "Industrial Safety Helmets"
      ]
    },
    {
      "name": "Sarees, Lehenga and Salwar Suits",
      "items": [
        "Ladies Suits",
        "Designer Sarees",
        "Fancy Sarees",
        "Indian Sarees",
        "Ladies Salwar Suits"
      ]
    },
    {
      "name": "Men Shirts, Jeans & Clothing",
      "items": [
        "Men Wear",
        "Men T-Shirts",
        "Men Shirts",
        "Men Jeans",
        "Men Cotton Shirts"
      ]
    },
    {
      "name": "Kids Casual, Ethnic & Western Wear",
      "items": [
        "Kids Wear",
        "Boys Clothes",
        "Boys Underpant",
        "Kids Frock",
        "Kids T-Shirt"
      ]
    },
    {
      "name": "Winter Wear & Accessories",
      "items": [
        "Women Blazer",
        "Knitwear",
        "Blazers",
        "Men Blazer",
        "Men Knitted Wear"
      ]
    },
    {
      "name": "Party, Wedding, Western, Formal Wear",
      "items": [
        "Men Formal Wear",
        "Nightwear",
        "Men Formal Shirts",
        "Men Suits",
        "Bikini Panty"
      ]
    },
    {
      "name": "Cotton, Wool Textiles & Fabrics",
      "items": [
        "Cotton Fabric",
        "Cotton Textile",
        "Other Textile Fabrics",
        "Apparel & Clothing Fabric",
        "Printed Fabrics"
      ]
    },
    {
      "name": "Animal Clothing & Accessories",
      "items": [
        "Dog Accessories",
        "Leather Saddle",
        "Saddles",
        "Dog Muzzles",
        "Dog Collars"
      ]
    },
    {
      "name": "Commercial & Academic Uniforms",
      "items": [
        "School Uniforms",
        "Commercial Uniforms",
        "Corporate Uniform",
        "Girls School Shirt",
        "Girls School Uniform"
      ]
    },
    {
      "name": "Work Boots and Safety Shoes",
      "items": [
        "Safety Shoes",
        "Men Leather Boots",
        "Men Leather Shoes",
        "Ladies Leather Sandal",
        "Ladies Leather Footwear"
      ]
    },
    {
      "name": "Leggings, Jeggings, Socks & Stocking",
      "items": [
        "Leggings",
        "Pantyhose",
        "Ladies Tights",
        "Women Printed Leggings",
        "Designer Leggings"
      ]
    },
    {
      "name": "Garments & Textiles Job Work",
      "items": [
        "Stitching Services",
        "Embroidery Job Work",
        "Garment Stitching Service",
        "Ladies Clothes Stitching Services",
        "Tailors"
      ]
    },
    {
      "name": "Cotton, Khadi, Other Fabric Clothing",
      "items": [
        "Denim Clothing",
        "Men Jeans",
        "Denim Jeans",
        "Cotton Clothing",
        "Men Denim Jeans"
      ]
    },
    {
      "name": "Undergarments & Inner Wear",
      "items": [
        "Pantyhose",
        "Men Brief",
        "Men Vest",
        "Bikini Panty",
        "Men Underwear and Briefs"
      ]
    },
    {
      "name": "Embroidery Needles & Accessories",
      "items": [
        "Hand Knitting Needles",
        "Knitting Needles",
        "Sewing Needles",
        "Bobbin",
        "Sewing Machine Needle"
      ]
    },
    {
      "name": "Infant & Toddlers Clothing",
      "items": [
        "Baby & Infant Clothes",
        "Baby Garment",
        "Baby Garment Accessories",
        "Baby Frocks",
        "Babies Tights"
      ]
    },
    {
      "name": "Leather Jackets and Garments",
      "items": [
        "Leather Jackets",
        "Women Leather Clothing",
        "Men Leather Garments",
        "Leather Garments",
        "Leather Gloves"
      ]
    },
    {
      "name": "Embroidered Apparel & Garments",
      "items": [
        "Embroidered Clothing",
        "Embroidered Ladies Garment",
        "Embroidered Kurtis",
        "Embroidered Ladies Suit",
        "Cotton Embroidered Kurti"
      ]
    },
    {
      "name": "Unisex Clothing",
      "items": [
        "Men T-Shirts",
        "T Shirts",
        "Shirt",
        "Readymade Garments",
        "Ladies T-Shirts"
      ]
    },
    {
      "name": "Umbrellas and Raincoats",
      "items": [
        "Umbrella",
        "Raincoats & Rainsuits",
        "Garden Umbrella",
        "Promotional Umbrella",
        "Stick Umbrella"
      ]
    },
    {
      "name": "Embroidered Fabric & Textiles",
      "items": [
        "Embroidery Work & Embroidery Fabric",
        "Embroidery Job Work",
        "Embroidered Dress Material",
        "Hand Embroidered Motifs",
        "Hand Embroidery"
      ]
    },
    {
      "name": "Gloves & Mittens",
      "items": [
        "Hand Gloves",
        "Cotton Gloves",
        "Household Gloves",
        "Warm Glove",
        "Bath Mitts"
      ]
    },
    {
      "name": "Pashmina, Silk & Cashmere Shawls",
      "items": [
        "Shawl",
        "Woolen Shawls",
        "Silk Shawls",
        "Ladies Shawl",
        "Cotton Shawls"
      ]
    },
    {
      "name": "Printed & Patchwork Clothing",
      "items": [
        "Printed T Shirts",
        "Men Designer T-Shirt",
        "Printed Garment",
        "Men Custom T -Shirt",
        "Men Sublimation T-Shirt"
      ]
    },
    {
      "name": "Yarns & Threads",
      "items": [
        "Yarn",
        "Monofilament Yarn",
        "Natural Fiber Yarns",
        "Filament Yarn",
        "Threads"
      ]
    },
    {
      "name": "Sports Wear & Athletic Accessories",
      "items": [
        "Sports Apparel",
        "Tracksuits",
        "Ladies Tights",
        "Sports Pant",
        "Track Pant"
      ]
    },
    {
      "name": "Towels, Napkins & Handkerchieves",
      "items": [
        "Tissue Paper",
        "Toilet Paper Roll",
        "Tissue Paper Boxes",
        "Towels",
        "Napkins"
      ]
    },
    {
      "name": "Sewing Threads, Laces & Accessories",
      "items": [
        "Lace",
        "Fancy Laces",
        "Embroidered Laces",
        "Elastic Tapes",
        "Garment Laces"
      ]
    },
    {
      "name": "Cufflink, Buttons, Zippers & Buckles",
      "items": [
        "Garment Accessories",
        "Buttons",
        "Designer Cufflink",
        "Dress Studs",
        "Buckles"
      ]
    },
    {
      "name": "Motifs, Badges, Emblems & Lanyards",
      "items": [
        "Badges",
        "Lanyards",
        "Ribbons",
        "Logo Patches",
        "Hand Embroidered Motifs"
      ]
    },
    {
      "name": "Scarves, Shawls, Stoles, Bandanas",
      "items": [
        "Shawl",
        "Scarf",
        "Stoles",
        "Silk Shawls",
        "Fancy Stoles"
      ]
    },
    {
      "name": "Hats, Caps and Headwears",
      "items": [
        "Men Cap",
        "Caps",
        "Fashion Caps",
        "Cotton Caps",
        "Winter Cap"
      ]
    },
    {
      "name": "Neckties, Bow Ties & Tie Accessories",
      "items": [
        "Ties",
        "Men Tie",
        "Bow Ties",
        "Designer Necktie",
        "Necktie"
      ]
    },
    {
      "name": "Silk Apparel, Clothings & Fabrics",
      "items": [
        "Silk Sarees",
        "Silk Textile",
        "South Indian Silk Sarees",
        "Ladies Silk Suit",
        "Silk Garments"
      ]
    }
  ],
  "Consumer Electronics": [
    {
      "name": "Computer Hardware & Peripherals",
      "items": [
        "Computer Parts",
        "Computer Accessories",
        "Computer Input Devices",
        "Computer Mouse",
        "Computer Keyboard"
      ]
    },
    {
      "name": "Home Appliances & Kitchen Appliances",
      "items": [
        "Kitchen Appliance",
        "Home Appliances",
        "Washing Machine for Home",
        "Mixer Grinder",
        "Electric Irons"
      ]
    },
    {
      "name": "Indoor Lights & Lighting Accessories",
      "items": [
        "LED Lights",
        "LED Bulb",
        "Tube Light",
        "Panel Light",
        "LED Tube Light"
      ]
    },
    {
      "name": "Mobile Phone & Accessories",
      "items": [
        "Mobile Phone Accessories",
        "Mobile Phones",
        "Telephone Instruments",
        "Earphones",
        "Mobile Phone Charger"
      ]
    },
    {
      "name": "Domestic Fans, AC & Coolers",
      "items": [
        "Electric Fans",
        "Ceiling Fans",
        "Air Conditioner",
        "Air Coolers",
        "Table Fan"
      ]
    },
    {
      "name": "Decorative Light, Lamp & Lamp Shades",
      "items": [
        "Decorative Light",
        "Lamps",
        "Wall Light",
        "Table Lamps",
        "String Light"
      ]
    },
    {
      "name": "Office Automation Products & Devices",
      "items": [
        "Multifunction Printer",
        "Xerox Machines",
        "Printers for Home",
        "Projector",
        "Laser Printer"
      ]
    },
    {
      "name": "Street, Flood and Commercial Lights",
      "items": [
        "Street Lights",
        "LED Street Light",
        "Flood Lights",
        "Spot Lights",
        "Searchlight"
      ]
    },
    {
      "name": "Heater, Thermostat & Heating Devices",
      "items": [
        "Water Heater & Geyser",
        "Heater & Heating Components",
        "Electric Water Heater",
        "Electric Geyser",
        "Industrial Heaters"
      ]
    },
    {
      "name": "Speakers,Earphones and Accessories",
      "items": [
        "Earphones",
        "Speakers",
        "Headphone",
        "Loudspeaker",
        "Outdoor Speaker"
      ]
    },
    {
      "name": "Cleaning Machines & Equipments",
      "items": [
        "Vacuum Cleaner",
        "Home Vacuum Cleaner",
        "Blasting Machine",
        "Cleaning Machinery",
        "Pressure Washer"
      ]
    },
    {
      "name": "CCTV, Surveillance Systems and Parts",
      "items": [
        "CCTV Camera",
        "Electric Cable",
        "Dome Camera",
        "CCTV Installation Services",
        "Bullet Camera"
      ]
    },
    {
      "name": "Biometrics & Access Control Devices",
      "items": [
        "Magnetic Card Readers",
        "Access Control Systems",
        "Access Control Reader",
        "Card Readers",
        "Time Attendance Systems"
      ]
    },
    {
      "name": "Camera & Photography Equipments",
      "items": [
        "TV Camera",
        "Camera",
        "Compact Digital Camera",
        "Digital Camera",
        "Cinematographic Cameras"
      ]
    },
    {
      "name": "Freezers, Refrigerators & Chillers",
      "items": [
        "Under Counter Refrigerator",
        "Commercial Refrigerator",
        "Freezers",
        "Domestic Refrigerator",
        "Deep Freezer"
      ]
    },
    {
      "name": "Inverters, UPS and Converters",
      "items": [
        "Static Converters",
        "Inverters",
        "Electric Converters",
        "UPS",
        "Power Inverter"
      ]
    },
    {
      "name": "LED, LCD, Smart TV and Home Theatre",
      "items": [
        "TV",
        "LED TV",
        "Home Theater",
        "Color Television",
        "Smart TV"
      ]
    },
    {
      "name": "Light Bulb, Lamp & Lighting Fixtures",
      "items": [
        "Tube Light",
        "Light Bulb",
        "Light Fittings",
        "Lamp Holders",
        "Bulb Holder"
      ]
    },
    {
      "name": "Computer Hard Disk, RAM & Pen Drives",
      "items": [
        "Hard Disk Drive",
        "Solid State Drives",
        "Internal Hard Drive",
        "Pen Drive",
        "External Hard Drive"
      ]
    },
    {
      "name": "Headphones and Microphones",
      "items": [
        "Earphones",
        "Headphone",
        "Microphones",
        "Microphone Accessories",
        "Wired Earphone"
      ]
    },
    {
      "name": "Domestic RO Water Purifier & Filters",
      "items": [
        "Water Purifiers",
        "RO Water Purifiers",
        "RO UV Water Purifier",
        "Domestic RO Components",
        "Water Filters"
      ]
    },
    {
      "name": "Computer PCI Cards, Cables & Modules",
      "items": [
        "Motherboard",
        "Computer Cables",
        "USB Gadgets",
        "Computer Motherboard",
        "AV Cable"
      ]
    },
    {
      "name": "Adaptors, Plugs & Sockets",
      "items": [
        "Socket",
        "Electric Socket",
        "Extension Board",
        "Plugs",
        "Adapters"
      ]
    },
    {
      "name": "CD, DVD, MP3 & Audio Video Players",
      "items": [
        "Digital Video Recorder",
        "Video Recorder",
        "Media Player",
        "DVD Players",
        "Music Player"
      ]
    },
    {
      "name": "Computer Stationery Products",
      "items": [
        "Laptop Accessories and Parts",
        "USB Gadgets",
        "Mouse Pads",
        "Monitor Accessories",
        "Computer Stationery"
      ]
    },
    {
      "name": "Lantern, Chandeliers & Hanging Lamps",
      "items": [
        "Hanging Lamps",
        "Chandeliers",
        "Night Light",
        "Lantern",
        "Hanging Chandelier"
      ]
    },
    {
      "name": "Interior and Exterior Lighting",
      "items": [
        "Party Light",
        "Sealed Beam Lamps",
        "LED Track Light",
        "Foot Light",
        "Disco Lights"
      ]
    },
    {
      "name": "Hospital & Medical Lights",
      "items": [
        "UV Lamps",
        "Phototherapy Light",
        "Surgical Light",
        "Operation Theatre Lights",
        "LED OT Lights"
      ]
    },
    {
      "name": "Decorative and Party Lights",
      "items": [
        "Decorative Light",
        "String Light",
        "LED Light Strip",
        "Decorative Light Bulb",
        "Diwali Decorative Lights"
      ]
    },
    {
      "name": "Solar & Renewable Energy Products",
      "items": [
        "Solar Panels",
        "Solar Power Plants",
        "Solar Power Systems",
        "Solar Water Heater",
        "Solar Street Lights"
      ]
    },
    {
      "name": "Batteries & Charge Storage Devices",
      "items": [
        "Batteries",
        "Inverter Battery",
        "Lithium Ion Battery",
        "Industrial Batteries",
        "Lithium Primary Battery"
      ]
    },
    {
      "name": "Electrical & Electronic Test Devices",
      "items": [
        "Energy Meter",
        "Multimeter",
        "Digital Multimeter",
        "Electric Meters",
        "Panel Meters"
      ]
    },
    {
      "name": "Telecommunication Equipment & Parts",
      "items": [
        "Fiber Optic Cable",
        "Communication Systems and Equipment",
        "Voice Recorder",
        "LAN Cable",
        "Telecommunications Equipment"
      ]
    },
    {
      "name": "Automobile Electrical Components",
      "items": [
        "Automotive Battery",
        "Car Batteries",
        "Two Wheeler Battery",
        "Auto Electrical Products",
        "Amaron Automotive Batteries"
      ]
    },
    {
      "name": "Electrical & Electronic Goods Repair",
      "items": [
        "Home Appliances Repair & Maintenance",
        "Mobile Phone Repair Service",
        "Electronic Appliance Repair Service",
        "Air Conditioner Repair Services",
        "Industrial Appliances Repair & Maintenance"
      ]
    },
    {
      "name": "Industrial Coolers, Blowers & Fans",
      "items": [
        "Blowers",
        "Air Ventilation System",
        "Industrial Fans",
        "Cooling Fans",
        "Industrial Air Cooler"
      ]
    },
    {
      "name": "Instrument Calibration & Adjustment",
      "items": [
        "Calibration Services",
        "Machine Testing Services",
        "Vibration Analysis Services",
        "Instrument Calibration Services",
        "NABL Accreditation"
      ]
    },
    {
      "name": "Electrical & Signaling Contractors",
      "items": [
        "Electrical Contractor",
        "Electrical Work",
        "Electrical Wiring Services",
        "Electrical Installation",
        "Commercial Electrical Works"
      ]
    },
    {
      "name": "Laptops, PC, Mainframes & Computers",
      "items": [
        "Computer Systems",
        "Laptops",
        "Desktop Computer",
        "Dell Laptops",
        "Personal Computers"
      ]
    },
    {
      "name": "Safety Equipment & Systems",
      "items": [
        "Safety Equipment",
        "Safety Goggles",
        "PPE Kits",
        "Safety Net",
        "Industrial Safety Equipments"
      ]
    },
    {
      "name": "Antennas, Wifi & Communication Tower",
      "items": [
        "Transmission Line Tower",
        "Antenna",
        "Communication Towers",
        "Transmission Towers",
        "Dish Antenna"
      ]
    },
    {
      "name": "Calibrators & Monitoring Systems",
      "items": [
        "Digital Indicator",
        "Indicator Panels",
        "LED Indicator",
        "Digital Timer",
        "Temperature Indicators"
      ]
    },
    {
      "name": "Security & Inspection Devices",
      "items": [
        "Anti Theft Device",
        "Car Parking System",
        "Vehicle Security System",
        "Firewall Appliances",
        "Computer Security Device"
      ]
    },
    {
      "name": "Electrical & Electronic Goods Rental",
      "items": [
        "Machine Rental",
        "Electronic Equipment Rental",
        "Sound Systems Rental",
        "Electrical Equipment Rental",
        "Generator Rental Services"
      ]
    },
    {
      "name": "Electronic Safes & Security Systems",
      "items": [
        "Storage Lockers",
        "Security Safes",
        "Safety Locker",
        "Safe Deposit Locker",
        "Industrial Locker"
      ]
    }
  ],
  "Packaging Machines & Goods": [
    {
      "name": "Packaging Films & Foils",
      "items": [
        "Packaging Rolls",
        "Plastic Film",
        "Plastic Covers",
        "Packaging Materials",
        "PVC Film"
      ]
    },
    {
      "name": "Barcode, Stickers & Luggage Tags",
      "items": [
        "Stickers",
        "Textile Labels, Sticker and Tags",
        "Tags",
        "Printed Stickers",
        "Barcode"
      ]
    },
    {
      "name": "Adhesive & Pressure Sensitive Tapes",
      "items": [
        "Tape",
        "Self Adhesive Tapes",
        "Stationery Tape",
        "Paper Tape",
        "Tissue Tapes"
      ]
    },
    {
      "name": "Labels: Adhesive, Fabric & Metal",
      "items": [
        "Labels",
        "Textile Labels, Sticker and Tags",
        "Barcode",
        "Barcode Label",
        "Paper Labels"
      ]
    },
    {
      "name": "Crates, Trays and Pallets",
      "items": [
        "Industrial Pallet",
        "Wooden Pallets",
        "Wooden Crates",
        "Packaging Boards",
        "Corrugated Paper Board"
      ]
    },
    {
      "name": "Plastic Containers  & Bottles",
      "items": [
        "Plastic Bottles",
        "Bottle Caps",
        "Plastic Caps",
        "Plastic Containers",
        "PET Bottles"
      ]
    },
    {
      "name": "Closing & Sealing Machines",
      "items": [
        "Seal Machines",
        "Pouch Sealing Machines",
        "Bag Sealer",
        "Bag Closing Machine",
        "Pasting Machine"
      ]
    },
    {
      "name": "Packaging Caps & Seals",
      "items": [
        "Plastic Lids",
        "Bottle Caps",
        "Plastic Stoppers",
        "Plastic Caps",
        "Bottle Stoppers"
      ]
    },
    {
      "name": "Protective Packing Materials",
      "items": [
        "Protective Packaging",
        "Packaging Foam",
        "EPE Foam",
        "Air Bubble Roll",
        "Expanded Polyurethane Foam"
      ]
    },
    {
      "name": "Marking and Stamping Machines",
      "items": [
        "Laser Marking Machine",
        "Labelling Machines",
        "Coding Machine",
        "Laser Machine",
        "Batch Coding Machines"
      ]
    },
    {
      "name": "Form Fill & Seal Machines",
      "items": [
        "Packaging Machine",
        "Pouch Packaging Machines",
        "Automatic Pouch Packing Machines",
        "Liquid Packaging Machinery",
        "Pouch Packaging Machine Parts"
      ]
    },
    {
      "name": "Filling Machines & Plants",
      "items": [
        "Filling Machines",
        "Bottling Plant",
        "Liquid Filling Machine",
        "Mineral Water Plant",
        "Soft Drink Making Machinery"
      ]
    },
    {
      "name": "Packaging, Laminated & Zip Bags",
      "items": [
        "Plastic Bags",
        "Non Woven Bag",
        "Polythene Bags",
        "Plastic Carry Bag",
        "Packing Bag"
      ]
    },
    {
      "name": "Bulk Bags & Sacks",
      "items": [
        "Gunny Bags",
        "Polypropylene Woven Sacks",
        "Jute Gunny Bags",
        "HDPE Woven Sacks",
        "Agricultural Bags"
      ]
    },
    {
      "name": "Packaging Boxes",
      "items": [
        "Corrugated Packaging Boxes",
        "Paper Box",
        "Corrugated Box",
        "Printed Corrugated Boxes",
        "Carton Box"
      ]
    },
    {
      "name": "Food Packaging Materials & Supplies",
      "items": [
        "Confectionery Boxes",
        "Edible Packaging Boxes",
        "Sweet Boxes",
        "Cake Box",
        "Edible Packaging Materials"
      ]
    },
    {
      "name": "Wrapping & Strapping Machine",
      "items": [
        "Wrapping Machines",
        "Strapping Machines",
        "Shrink Wrapping Machine",
        "Strapping Tools",
        "Semi Automatic Strapping Machine"
      ]
    },
    {
      "name": "Packaging Pouches & Envelopes",
      "items": [
        "Food Packaging Bag",
        "Packaging Pouch",
        "Pillow Pouches",
        "Plastic Zip Bag",
        "Gusseted, Spout and Stand Up Pouch"
      ]
    },
    {
      "name": "Packaging & Lamination Machinery",
      "items": [
        "Lamination Machines",
        "Adhesive Dispensing Equipment",
        "Paper Lamination Machine",
        "Adhesive Tape Making Machine",
        "Film Lamination Machine"
      ]
    },
    {
      "name": "Packing Straps, Clips & Supplies",
      "items": [
        "Plastic Strip",
        "Box Straps",
        "Packing Accessories",
        "Strapping Rolls",
        "Packing Strap"
      ]
    },
    {
      "name": "Aluminium,Tin Can & Metal Containers",
      "items": [
        "Metal Containers",
        "Tin Containers",
        "Metal Boxes",
        "Aluminium Containers",
        "Steel Trunks"
      ]
    },
    {
      "name": "Product Packing & Labelling Services",
      "items": [
        "Packaging Solutions",
        "Goods Packaging Service",
        "Package Designing Services",
        "Food Packaging Solutions",
        "Private Labeling Services"
      ]
    }
  ],
  "Chemicals, Dyes & Solvents": [
    {
      "name": "Industrial Chemicals & Supplies",
      "items": [
        "Silica Sand",
        "White Silica Sand",
        "Construction Chemical",
        "Inorganic Salts",
        "Industrial Chemicals"
      ]
    },
    {
      "name": "Chemical Reagents & Catalysts",
      "items": [
        "Inorganic Salts",
        "Disinfectant Chemicals",
        "Sodium Chloride NaCl",
        "Organic Acid",
        "Laboratory Chemicals"
      ]
    },
    {
      "name": "Dyes & Color Additives",
      "items": [
        "Pigments",
        "Dye Chemicals",
        "Dye Additives",
        "Inorganic Pigment",
        "Color Pigment"
      ]
    },
    {
      "name": "Organic and Inorganic Solvents",
      "items": [
        "Alcohol Solvents",
        "Organic Chemicals",
        "Mineral Spirits",
        "Inorganic Acids",
        "Thinners"
      ]
    },
    {
      "name": "PET Granules & Plastic Raw Material",
      "items": [
        "Plastic Granules",
        "PolymethylMethacrylate",
        "PP Granules",
        "Thermoplastic Compound",
        "Polyethylene"
      ]
    },
    {
      "name": "Natural and Synthetic Resins",
      "items": [
        "Acrylic Polymers",
        "Resins",
        "Epoxy Resins",
        "Liquid Resins",
        "Synthetic Resins"
      ]
    },
    {
      "name": "Textile, Dyeing & Finishing Chemical",
      "items": [
        "Sizing Agent",
        "Textile Finishing Agent",
        "Textile Chemical",
        "Bleaching Powder",
        "Sizing Chemicals"
      ]
    },
    {
      "name": "Petroleum and Petrochemical Products",
      "items": [
        "Bitumen Oil",
        "Crude Oil",
        "Bitumen",
        "Fuel Oils",
        "Light Diesel Oil"
      ]
    },
    {
      "name": "Natural, Industrial & Medical Gases",
      "items": [
        "Industrial Gases",
        "Industrial Gas Cylinder",
        "Oxygen Cylinder",
        "Natural Gas",
        "Medical Oxygen Cylinder"
      ]
    },
    {
      "name": "Leather Chemicals",
      "items": [
        "Leather Chemical",
        "Fatliquors",
        "Tanning Agents",
        "Leather Tanning Chemical",
        "Leather Enzyme"
      ]
    },
    {
      "name": "Insecticides and Pesticides",
      "items": [
        "Insecticides",
        "Agricultural Pesticides",
        "Fungicides",
        "Organic Pesticides",
        "Herbicides"
      ]
    },
    {
      "name": "Fertilizers and Soil Additives",
      "items": [
        "Fertilizer",
        "Chemical Fertilizers",
        "NPK Fertilizer",
        "Organic Fertilizers and Manure",
        "Water Soluble Fertilizers"
      ]
    },
    {
      "name": "Hydraulic Jacks, Lifts & Winches",
      "items": [
        "Industrial Jacks",
        "Hydraulic Jacks",
        "Scissor Lifts",
        "Hydraulic Lifts",
        "Winches"
      ]
    }
  ],
  "Mechanical Parts & Spares": [
    {
      "name": "Industrial Valves & Valve Fittings",
      "items": [
        "Industrial Valves",
        "Ball Valves",
        "Pressure Reducing Valve",
        "Safety & Pressure Relief Valves",
        "Check Valves"
      ]
    },
    {
      "name": "Gearbox, Axle, Sprocket & Gear Parts",
      "items": [
        "Couplings",
        "Plastic Coupling",
        "Pipe Couplings",
        "Automotive Gears",
        "Gearbox"
      ]
    },
    {
      "name": "Nails, Fasteners, Rivets & Shackles",
      "items": [
        "Fasteners",
        "Rivets",
        "Metal Fastener",
        "Anchor Fasteners",
        "Studs"
      ]
    },
    {
      "name": "Seals, Oil Seals & Industrial Seals",
      "items": [
        "Seals",
        "Oil Seals",
        "Rubber O Ring",
        "O-rings",
        "Rubber Seals"
      ]
    },
    {
      "name": "Ball Bearings and Bearing Assemblies",
      "items": [
        "Ball Bearings",
        "Bearings",
        "Roller Bearings",
        "Industrial Bearings",
        "Deep Groove Ball Bearings"
      ]
    },
    {
      "name": "Die Casting Mould & Moulding Tools",
      "items": [
        "Moulds",
        "Industrial Molds",
        "Plastic Molds",
        "Molding Services",
        "Injection Moulds"
      ]
    },
    {
      "name": "Moulds, Jigs and Casting Dies",
      "items": [
        "Casting Dies",
        "Press Dies",
        "Press Tools",
        "Jig Fixture",
        "Metal Die"
      ]
    },
    {
      "name": "Alloy, Metal and High Strength Bolts",
      "items": [
        "Bolts",
        "Metal Bolts",
        "Iron Bolt",
        "Steel Bolt",
        "Stainless Steel Bolts"
      ]
    },
    {
      "name": "Sheet Metal & Turned Components",
      "items": [
        "Machine Parts",
        "Sheet Metals",
        "Machined Components",
        "Metal Machined Parts",
        "Sheet Metal Parts"
      ]
    },
    {
      "name": "Die Casting & Investment Castings",
      "items": [
        "Metal Castings",
        "Die Casting",
        "CI Castings",
        "Iron Castings",
        "Aluminium Die Casting"
      ]
    },
    {
      "name": "Alloy, Metal and Industrial Nuts",
      "items": [
        "Iron Nut",
        "Metal Nuts",
        "Steel Nuts",
        "MS Bolt Nut",
        "Hex Nuts"
      ]
    },
    {
      "name": "Alloy, Metal and Machine Screws",
      "items": [
        "Screws",
        "Iron Screw",
        "Steel Screws",
        "Metal Screws",
        "Coach Screws"
      ]
    },
    {
      "name": "Air Springs & Compression Springs",
      "items": [
        "Compression Springs",
        "Industrial Springs",
        "Metal Spring",
        "Coil Springs",
        "Extension Springs"
      ]
    },
    {
      "name": "Rubber Gaskets and Gasket Material",
      "items": [
        "Gaskets",
        "Rubber Gaskets",
        "Grommet",
        "Silicone Rubber Gasket",
        "Industrial Gaskets"
      ]
    },
    {
      "name": "Bushings & Bushing Parts",
      "items": [
        "Bushings",
        "Metal Bushes",
        "Industrial Bushes",
        "Automotive Bushings",
        "Steel Bushes"
      ]
    },
    {
      "name": "Nails & Pins",
      "items": [
        "Nails",
        "Industrial Pins",
        "Iron Nail",
        "Wire Nails",
        "Steel Nail"
      ]
    },
    {
      "name": "Alloy, Metal and Machine Washers",
      "items": [
        "Washer",
        "Metal Washers",
        "Lock Washers",
        "Stainless Steel Washers",
        "Spring Washer"
      ]
    },
    {
      "name": "Ball Bearing Assemblies & Components",
      "items": [
        "Bearing Parts",
        "Bearing Housing",
        "Metal And Non Metal Balls",
        "Steel Balls",
        "Iron Balls"
      ]
    },
    {
      "name": "Hydraulic & Pneumatic Cylinders",
      "items": [
        "Hydraulic Cylinders",
        "Power Packs",
        "Hydraulic Power Pack",
        "Pneumatic Cylinder",
        "Industrial Hydraulic Cylinders"
      ]
    },
    {
      "name": "Forgings, Forging Parts & Supplies",
      "items": [
        "Forgings",
        "Forged Components",
        "Metal Forgings",
        "Forged Automotive Components",
        "Forged Ring"
      ]
    },
    {
      "name": "Power Transmission Tools & Couplings",
      "items": [
        "Couplings",
        "Plastic Coupling",
        "Pipe Couplings",
        "Industrial Shafts",
        "Pulleys"
      ]
    },
    {
      "name": "Hydraulic & Pneumatic Machines",
      "items": [
        "Hydraulic Machines",
        "Hydraulic Press",
        "Hydraulic Components",
        "Air Regulators",
        "Pneumatic Machines"
      ]
    },
    {
      "name": "Manufacturing & Assembling Services",
      "items": [
        "Machining Job Work",
        "CNC Machining Services",
        "CNC Turning JobWork Services",
        "Precision Machining Services",
        "VMC Machining Services"
      ]
    },
    {
      "name": "CAD CAM Design & Consultancy",
      "items": [
        "CNC Machining Services",
        "CAD Service",
        "CAD CAM Services",
        "3D Modeling Services",
        "AutoCAD Designing"
      ]
    },
    {
      "name": "Clutch, Clutch Parts and Accessories",
      "items": [
        "Two Wheeler Clutch Components",
        "Truck & Bus Clutch and Pressure Plate",
        "Two Wheeler Pressure Plates",
        "Commercial Vehicle Clutch Parts",
        "Clutch Components"
      ]
    },
    {
      "name": "Metal & Plastic Moulding Services",
      "items": [
        "Molding Services",
        "Plastic Molded Parts",
        "Injection Molding Job Works",
        "Plastic Injection Molding Services",
        "Plastic Molding Services"
      ]
    },
    {
      "name": "Welding, Soldering & Brazing Service",
      "items": [
        "Welding Services",
        "Brazing Services",
        "Laser Welding Service",
        "Soldering Services",
        "PCB Soldering"
      ]
    }
  ],
  "Lab Instruments & Supplies": [
    {
      "name": "Testing & Measuring Equipments",
      "items": [
        "Testing Equipment",
        "Water Testing Equipment",
        "Compression Testing Machine",
        "PH Meter",
        "Civil Engineering Test Equipment"
      ]
    },
    {
      "name": "Laboratory & Lab Equipment",
      "items": [
        "Laboratory Equipment",
        "Laboratory Apparatus",
        "Science Laboratory Equipment",
        "Pathology Lab Equipments",
        "Laboratory Autoclave & Sterilizers"
      ]
    },
    {
      "name": "Measuring Equipments & Instruments",
      "items": [
        "Measurement Instrument",
        "Currency And POS Equipment",
        "Currency Counting Machines",
        "Cash Register Machine",
        "Water Meters"
      ]
    },
    {
      "name": "Weighing Scales & Measuring Tapes",
      "items": [
        "Weighing Scale",
        "Electronic Weighing Scales",
        "Weighing Machines",
        "Measuring Tapes",
        "Precision Balance"
      ]
    },
    {
      "name": "Analyzers & Analytical Instruments",
      "items": [
        "Elemental Analyzer",
        "IVDs & Analyzers",
        "Hematology Analyzers",
        "PH Meter",
        "Gas Analyzers"
      ]
    },
    {
      "name": "Thermometers & Flowmeters",
      "items": [
        "Thermometer",
        "Industrial and Medical Infrared Thermometer",
        "Flow Meter",
        "Infrared Thermometer",
        "Clinical Digital Thermometer"
      ]
    },
    {
      "name": "Plastic & Glass Labware",
      "items": [
        "Clear Plastic Tube",
        "Laboratory Glassware",
        "Glass Slab",
        "Laboratory Plasticware",
        "Plastic Flask"
      ]
    },
    {
      "name": "Measurement Gauges & Gauge Fittings",
      "items": [
        "Pressure Gauge",
        "Level Gauge",
        "Thickness Gauge",
        "Height Gauge",
        "Stainless Steel Pressure Gauge"
      ]
    },
    {
      "name": "Compass, Telescopes & Survey Tools",
      "items": [
        "Survey Instruments and Accessories",
        "Compass",
        "Magnifiers",
        "Total Station",
        "Binoculars"
      ]
    },
    {
      "name": "Scientific Instruments & Devices",
      "items": [
        "Scientific Instruments",
        "Voltmeter",
        "Laboratory Instruments",
        "Calipers",
        "Ammeter"
      ]
    },
    {
      "name": "Autoclaves, Sterilizers & Incubators",
      "items": [
        "UV Lamps",
        "UV Sterilizer and Lamps",
        "Laboratory Autoclave & Sterilizers",
        "Laboratory & Pharmaceutical Ovens",
        "Vertical Autoclave"
      ]
    },
    {
      "name": "Metallurgical & Lab Microscopes",
      "items": [
        "Glass Microsphere",
        "Microscope",
        "Microscope Components",
        "Laboratory Microscope",
        "Microtome"
      ]
    },
    {
      "name": "Calibrators & Monitoring Systems",
      "items": [
        "Digital Indicator",
        "Indicator Panels",
        "LED Indicator",
        "Digital Timer",
        "Temperature Indicators"
      ]
    },
    {
      "name": "Weather & Meteorological Equipments",
      "items": [
        "Weather Instruments",
        "Moisture Meter",
        "Temperature Humidity Meter",
        "Meteorology Instruments",
        "Digital Moisture Meter"
      ]
    },
    {
      "name": "Cleanroom Equipment & Supplies",
      "items": [
        "Clean Room Equipment",
        "Clean Room Fittings and Furniture",
        "Laminar Air Flow",
        "Biosafety Cabinets",
        "Pass Box"
      ]
    },
    {
      "name": "Electrical & Electronic Test Devices",
      "items": [
        "Energy Meter",
        "Multimeter",
        "Digital Multimeter",
        "Electric Meters",
        "Panel Meters"
      ]
    },
    {
      "name": "VFD, PLC, HMI & Control Equipments",
      "items": [
        "Industrial Control Systems",
        "Industrial Automation Systems",
        "Industrial Control Panel",
        "PLC Control Panel",
        "Motor Drives"
      ]
    },
    {
      "name": "Material Testing Labs & Services",
      "items": [
        "Testing Services",
        "Electrical Testing Service",
        "Energy Monitoring Service",
        "Laboratory Testing Services",
        "Chemical Testing Services"
      ]
    },
    {
      "name": "Instrument Calibration & Adjustment",
      "items": [
        "Calibration Services",
        "Machine Testing Services",
        "Vibration Analysis Services",
        "Instrument Calibration Services",
        "NABL Accreditation"
      ]
    },
    {
      "name": "Spoons, Table Knife and Cutlery",
      "items": [
        "Kitchen Accessories",
        "Spoon",
        "Cutlery",
        "Wooden Spoon",
        "Plastic Spoons"
      ]
    },
    {
      "name": "Research and Development (R&D) Work",
      "items": [
        "Product Development Research",
        "Technology Development Services",
        "R&D Consulting Services",
        "Custom Synthesis Service",
        "Industry Research"
      ]
    }
  ],
  "Furniture & Supplies": [
    {
      "name": "Living Room Furniture & Sofa Sets",
      "items": [
        "Living Room Furniture",
        "Sofa Set",
        "Furniture Sofa",
        "Wooden Sofa Set",
        "Chair"
      ]
    },
    {
      "name": "Office & Commercial Furniture",
      "items": [
        "Office Furniture",
        "Office Chairs",
        "Office Tables",
        "Study Table",
        "Wooden Office Furniture"
      ]
    },
    {
      "name": "Retail Display Stands and Fixtures",
      "items": [
        "Food & Bakery Display Counter",
        "Display Rack",
        "Display Stands",
        "Service Counter",
        "Supermarket Display Rack"
      ]
    },
    {
      "name": "Metal Furniture Suppliers",
      "items": [
        "Metal Furniture",
        "Steel Almirah",
        "Metal Wardrobe & Cupboard",
        "Steel Furniture",
        "Metal Chair"
      ]
    },
    {
      "name": "Kitchen & Dining Furniture",
      "items": [
        "Modular Kitchen",
        "Kitchen Furniture",
        "Wooden Dining Table",
        "Dining Table & Chair",
        "Wooden Dining Table & Chair"
      ]
    },
    {
      "name": "Wooden, Bamboo and Cane Furniture",
      "items": [
        "Wooden Furniture",
        "Wooden Cabinets & Wardrobes",
        "Wooden Bed",
        "Wooden Sofa Set",
        "Wooden Sofa & Sofa Bed"
      ]
    },
    {
      "name": "Bedroom Furniture & Bedroom Sets",
      "items": [
        "Beds",
        "Wooden Bed",
        "Almirah & Wardrobe",
        "Wooden Wardrobe",
        "Wooden Double Bed"
      ]
    },
    {
      "name": "Furniture Fittings & Hardware",
      "items": [
        "Furniture Parts",
        "Furniture Fittings",
        "Furniture Handles",
        "Bed Headboard",
        "Furniture Accessories"
      ]
    },
    {
      "name": "Home Furniture, Racks & Shelves",
      "items": [
        "Furniture",
        "Home Furniture",
        "Shoe Rack For Home",
        "Modular Furniture",
        "Book Racks"
      ]
    },
    {
      "name": "Plastic Furniture & Supplies",
      "items": [
        "Plastic Furniture",
        "Plastic Chairs & Chairs Set",
        "Plastic Seats",
        "Plastic Chairs",
        "Plastic Tables & Stools"
      ]
    },
    {
      "name": "Restaurant & Cafeteria Furniture",
      "items": [
        "Bar Furniture",
        "Hotel & Restaurant Furniture",
        "Cafeteria Chairs & Tables",
        "Bar Stool & Chair",
        "Outdoor Furniture"
      ]
    },
    {
      "name": "Outdoor and Garden Furniture",
      "items": [
        "Swings",
        "Outdoor Bench",
        "Outdoor Furniture",
        "Swing Chair",
        "Outdoor Swing"
      ]
    },
    {
      "name": "Furniture Making & Carpentry Service",
      "items": [
        "Carpentry Work",
        "Furniture Design Service",
        "Wood Works Services",
        "Furniture Maintenance Service",
        "Interior Wood Work"
      ]
    },
    {
      "name": "Brackets, Holder & Hardware Fittings",
      "items": [
        "Metal Angles",
        "Hardware Accessories",
        "Aluminium Profiles",
        "Metal Fitting",
        "Iron Angle"
      ]
    },
    {
      "name": "Door, Window Frame, Panel & Shutters",
      "items": [
        "Iron Rolling Shutter",
        "Wall Partitions And Door Partitions",
        "Rolling Shutters",
        "Door Frames",
        "Aluminium Partitions"
      ]
    },
    {
      "name": "Heavy & Light Duty Caster Wheels",
      "items": [
        "Caster Wheels",
        "Nylon, Plastic, PU, Rubber & Metal Wheel",
        "Trolley Wheels",
        "PU, Nylon, Rubber, Steel Casters",
        "PU Casters"
      ]
    }
  ],
  "Automobile, Parts & Spares": [
    {
      "name": "Automobile Fittings & Components",
      "items": [
        "Automotive Spare Parts",
        "Automotive Components",
        "Automotive Metal Parts",
        "Automotive Plastic Components",
        "Two Wheeler Parts"
      ]
    },
    {
      "name": "Automobile Interiors & Accessories",
      "items": [
        "Automotive Accessories",
        "Car Accessories",
        "Two Wheeler Accessories",
        "Seat Covers",
        "Car Interior Accessories"
      ]
    },
    {
      "name": "Automotive Repair Tools & Equipments",
      "items": [
        "Car Wash Accessories",
        "Tyre & Wheel Equipment",
        "Car Care Accessories",
        "3D Wheel Alignment Machine",
        "Car Duster"
      ]
    },
    {
      "name": "Automobile Electrical Components",
      "items": [
        "Automotive Battery",
        "Car Batteries",
        "Two Wheeler Battery",
        "Auto Electrical Products",
        "Amaron Automotive Batteries"
      ]
    },
    {
      "name": "Commercial Vehicles & Three Wheelers",
      "items": [
        "Intermediate and Light Commercial Vehicles",
        "Motor Vehicles",
        "Medium & Heavy Commercial Vehicles",
        "Trucks",
        "Fire Fighting Vehicles"
      ]
    },
    {
      "name": "Tyres & Tube",
      "items": [
        "Two Wheeler Tyres",
        "Pneumatic Tyre",
        "Bike Tyres",
        "Rubber Tyres",
        "Motorcycle Tyres"
      ]
    },
    {
      "name": "E Vehicles",
      "items": [
        "Electric Two Wheelers, Parts And Kits",
        "Electric Vehicle Battery",
        "Electric Motorcycle",
        "Exide Electric Vehicle Battery",
        "Electric Scooter"
      ]
    },
    {
      "name": "Automobile Body Coach Building",
      "items": [
        "Motorcycle Body Parts",
        "Tractor Body Parts & Covers",
        "Car Body Kit",
        "Automobile Bodies",
        "Car Headlight"
      ]
    },
    {
      "name": "Commercial Vehicle Spare Parts",
      "items": [
        "Truck Tyres",
        "Truck Parts",
        "Truck Brake Parts",
        "TATA Truck Spare Parts",
        "Truck Body Part"
      ]
    },
    {
      "name": "Automotive Lights and Lighting Parts",
      "items": [
        "Automotive Headlights",
        "Automotive Lights",
        "Indicator Lights",
        "Automotive Tail Lamps",
        "Car Headlight"
      ]
    },
    {
      "name": "Motorcycles and Cars",
      "items": [
        "Motor Cars",
        "Motorcycle",
        "Cars",
        "Electric Two Wheelers, Parts And Kits",
        "Electric Motorcycle"
      ]
    },
    {
      "name": "Automotive Engine & Engine Parts",
      "items": [
        "Tractor Engine Parts",
        "Engine Components",
        "Truck Engine Parts",
        "Automotive Engine",
        "Car Engine"
      ]
    },
    {
      "name": "Wheels, Rims & Accessories",
      "items": [
        "Rims & Wheels",
        "Tread Rubber",
        "Tyre Accessories",
        "Truck Tyre Flaps",
        "Alloy Wheels"
      ]
    },
    {
      "name": "Suspension System & Components",
      "items": [
        "Suspension Shock Absorber",
        "Leaf Springs",
        "Suspension Arm Assembly",
        "Suspension System",
        "Automotive Suspension Parts"
      ]
    },
    {
      "name": "Auto Piston & Crankshaft Assemblies",
      "items": [
        "Piston",
        "Crankshafts and Crankshafts Parts",
        "Camshafts and Camshafts Parts",
        "Piston Components",
        "Cylinder Liner"
      ]
    },
    {
      "name": "Brakes & Braking Systems",
      "items": [
        "Brake Parts",
        "Motorcycle Brake Parts",
        "Truck Brake Parts",
        "Motorcycle Brake Shoe",
        "Car & Bike Brake Liner"
      ]
    },
    {
      "name": "Steering Parts & Components",
      "items": [
        "Steering Parts",
        "Steering Linkage",
        "Steering Wheel",
        "Car Steering Wheel",
        "Steering Wheel Parts"
      ]
    },
    {
      "name": "Air Intakes, Exhaust Systems & Parts",
      "items": [
        "Automotive Air Filters",
        "Automobile Silencers",
        "Exhaust System and System Components",
        "Motorcycle Silencer",
        "Bullet Silencer"
      ]
    },
    {
      "name": "Clutch, Clutch Parts and Accessories",
      "items": [
        "Two Wheeler Clutch Components",
        "Truck & Bus Clutch and Pressure Plate",
        "Two Wheeler Pressure Plates",
        "Commercial Vehicle Clutch Parts",
        "Clutch Components"
      ]
    },
    {
      "name": "Fuel Injection System & Assemblies",
      "items": [
        "Fuel Filters",
        "Fuel Injectors and Components",
        "Commercial Vehicle Oil Filter",
        "Fuel System Components",
        "Diesel Filters"
      ]
    },
    {
      "name": "Radiators & Accessories",
      "items": [
        "Truck Radiator Parts",
        "Radiator Coolants",
        "Vehicle Radiators",
        "Car Radiator",
        "Truck Radiator"
      ]
    },
    {
      "name": "Batteries & Charge Storage Devices",
      "items": [
        "Batteries",
        "Inverter Battery",
        "Lithium Ion Battery",
        "Industrial Batteries",
        "Lithium Primary Battery"
      ]
    },
    {
      "name": "Oils, Grease & Lubricants",
      "items": [
        "Mineral Oils",
        "Automotive Oils",
        "Industrial Oils",
        "Engine Oil",
        "Waste Oils"
      ]
    },
    {
      "name": "Gearbox, Axle, Sprocket & Gear Parts",
      "items": [
        "Couplings",
        "Plastic Coupling",
        "Pipe Couplings",
        "Automotive Gears",
        "Gearbox"
      ]
    },
    {
      "name": "Seals, Oil Seals & Industrial Seals",
      "items": [
        "Seals",
        "Oil Seals",
        "Rubber O Ring",
        "O-rings",
        "Rubber Seals"
      ]
    },
    {
      "name": "Ball Bearings and Bearing Assemblies",
      "items": [
        "Ball Bearings",
        "Bearings",
        "Roller Bearings",
        "Industrial Bearings",
        "Deep Groove Ball Bearings"
      ]
    },
    {
      "name": "Tractor, Tractor Parts & Assemblies",
      "items": [
        "Tractor Spare Parts",
        "Tractor Attachments",
        "Tractor Bumper",
        "Tractor",
        "Rotavator"
      ]
    },
    {
      "name": "Air Springs & Compression Springs",
      "items": [
        "Compression Springs",
        "Industrial Springs",
        "Metal Spring",
        "Coil Springs",
        "Extension Springs"
      ]
    },
    {
      "name": "Rubber Gaskets and Gasket Material",
      "items": [
        "Gaskets",
        "Rubber Gaskets",
        "Grommet",
        "Silicone Rubber Gasket",
        "Industrial Gaskets"
      ]
    },
    {
      "name": "Automobile Repairing and Maintenance",
      "items": [
        "Four Wheeler Repair and Maintenance Services",
        "Automobile Repair Services",
        "Car Repair Services",
        "Bike Body Repair Services",
        "Car Washing Services"
      ]
    },
    {
      "name": "Lubrication Systems and Equipment",
      "items": [
        "Lubricating Systems",
        "Grease Tools",
        "Grease Gun",
        "Lubrication Pumps",
        "Automatic Oil & Grease Lubricators"
      ]
    },
    {
      "name": "Power Transmission Tools & Couplings",
      "items": [
        "Couplings",
        "Plastic Coupling",
        "Pipe Couplings",
        "Industrial Shafts",
        "Pulleys"
      ]
    }
  ],
  "Agriculture & Farming": [
    {
      "name": "Insecticides and Pesticides",
      "items": [
        "Insecticides",
        "Agricultural Pesticides",
        "Fungicides",
        "Organic Pesticides",
        "Herbicides"
      ]
    },
    {
      "name": "Fresh Flowers, Plants & Trees",
      "items": [
        "Flowering Plant",
        "Fruit Plants",
        "Garden Plant",
        "Natural Flowers",
        "Marigold Plant"
      ]
    },
    {
      "name": "Farming Tools, Equipment & Machines",
      "items": [
        "Agricultural Equipment",
        "Agricultural Implements",
        "Agricultural Tools",
        "Agricultural Machinery",
        "Agricultural Sprayers"
      ]
    },
    {
      "name": "Seeds and Plant Saplings",
      "items": [
        "Seeds",
        "Paddy Seeds",
        "Grain Seed",
        "Cumin Seeds",
        "Vegetable Seeds"
      ]
    },
    {
      "name": "Tractor, Tractor Parts & Assemblies",
      "items": [
        "Tractor Spare Parts",
        "Tractor Attachments",
        "Tractor Bumper",
        "Tractor",
        "Rotavator"
      ]
    },
    {
      "name": "Fertilizers and Soil Additives",
      "items": [
        "Fertilizer",
        "Chemical Fertilizers",
        "NPK Fertilizer",
        "Organic Fertilizers and Manure",
        "Water Soluble Fertilizers"
      ]
    },
    {
      "name": "Bird Food, Poultry & Animal Food",
      "items": [
        "Animal Feed",
        "Pet Food",
        "Meat Bone Meal",
        "Animals Fodder",
        "Cattle Feed"
      ]
    },
    {
      "name": "Irrigation and Harvesting Machines",
      "items": [
        "Agricultural Irrigation Systems",
        "Lateral Cock",
        "Cultivator",
        "Harvester",
        "Disc Plough"
      ]
    },
    {
      "name": "Coir and Agro Products",
      "items": [
        "Rice Husk",
        "Agro Waste",
        "Rice Husk Powder",
        "Dried Malt Extract",
        "Coffee Husk"
      ]
    },
    {
      "name": "Farming and Pet Animals",
      "items": [
        "Chicken",
        "Poultry Farm Chicks",
        "Country Chicken",
        "Hen",
        "Kadaknath Chicken"
      ]
    },
    {
      "name": "Flower Pots, Wall & Garden Planters",
      "items": [
        "Plant Pots",
        "Flower Pots",
        "Decorative Pot",
        "Planter",
        "Plant Holder"
      ]
    }
  ],
  "Housewares & Supplies": [
    {
      "name": "Cleaning Liquids & Wipes",
      "items": [
        "Floor Cleaner",
        "Cleaning Chemicals",
        "Kitchen Cleaners",
        "Pot Scourers",
        "Toilet Cleaners"
      ]
    },
    {
      "name": "Clocks and Watches",
      "items": [
        "Wrist Watch",
        "Decorative Clock",
        "Wall Clocks",
        "Smart Watch",
        "Decorative Wall Clock"
      ]
    },
    {
      "name": "Incense Sticks & Pooja Items",
      "items": [
        "Pooja Articles",
        "Incense Sticks",
        "Aromatic Incense Sticks",
        "Raw Incense Stick",
        "Floral Incense Sticks"
      ]
    },
    {
      "name": "Towels, Napkins & Handkerchieves",
      "items": [
        "Tissue Paper",
        "Toilet Paper Roll",
        "Tissue Paper Boxes",
        "Towels",
        "Napkins"
      ]
    },
    {
      "name": "Buckets, Mugs & Storage Bins",
      "items": [
        "Bucket and Mug",
        "Plastic Bathtub",
        "Storage Basket",
        "Dustbins",
        "Household Plastic Buckets"
      ]
    },
    {
      "name": "Musical Equipment & Accessories",
      "items": [
        "Music Instruments",
        "Percussion Instruments",
        "Wind Instruments",
        "Indian Musical Instruments",
        "Brass Musical Instruments"
      ]
    },
    {
      "name": "Pet Furniture & Products",
      "items": [
        "Pet Accessories",
        "Pet Cage",
        "Pet Furniture",
        "Pet Products",
        "Bird Cages"
      ]
    },
    {
      "name": "Keychains & Bottle Openers",
      "items": [
        "Keychains",
        "Key Hooks",
        "Key Rings",
        "Key Holders",
        "Keychain Ring"
      ]
    },
    {
      "name": "Brooms, Mops & Dusters",
      "items": [
        "Cleaning Dusters",
        "Cleaning Brushes",
        "Floor Broom",
        "Mop",
        "Vacuum Cleaner"
      ]
    },
    {
      "name": "Garden & Landscaping Products",
      "items": [
        "Garden Decor",
        "Decorative Pot",
        "Garden Lighting",
        "Garden Fountains",
        "Decorative Fountain"
      ]
    },
    {
      "name": "Photo Frames & Picture Frames",
      "items": [
        "Photo Frame",
        "Wooden Photo Frames",
        "Decorative Photo Frame",
        "Wooden Digital Photo Frame",
        "Designer Photo Frames"
      ]
    },
    {
      "name": "Flower Pots, Wall & Garden Planters",
      "items": [
        "Plant Pots",
        "Flower Pots",
        "Decorative Pot",
        "Planter",
        "Plant Holder"
      ]
    },
    {
      "name": "Mosquito & Insect Repellent",
      "items": [
        "Rodenticides",
        "Mosquito Repellent",
        "Mosquito Killer",
        "Mosquito Repellent Stick",
        "Fumigation Machine"
      ]
    },
    {
      "name": "Aqua Culture, Aquarium & Supplies",
      "items": [
        "Aquarium Fish",
        "Fish Aquarium",
        "Aquarium Accessories",
        "Aquarium Tank",
        "Live Tropical Fish"
      ]
    },
    {
      "name": "Hangers & Cloth Pegs",
      "items": [
        "Hangers",
        "Wall Hanger",
        "Garment Hangers",
        "Cloth Drying Stand",
        "Towel Hanger"
      ]
    },
    {
      "name": "Wall & Door Hangings",
      "items": [
        "Wall Hanging",
        "Wall Decor",
        "Iron Wall Hanging",
        "Decorative Wall Art",
        "Metal Wall Hanging"
      ]
    },
    {
      "name": "Coasters & Napkin Rings",
      "items": [
        "Coasters",
        "Tea Coaster",
        "Table Coasters",
        "Wooden Coasters",
        "Napkin Holders"
      ]
    },
    {
      "name": "Candle Stands & Candelabra",
      "items": [
        "Decorative Candle Holder",
        "Candle Holder",
        "Candle Stands",
        "T-Light Candle Holder",
        "Candle Holder Stand"
      ]
    },
    {
      "name": "Artificial & Decorative Candles",
      "items": [
        "Candle",
        "Garden Candle",
        "Scented Candles",
        "Wax Candles",
        "Tea Light Candle"
      ]
    },
    {
      "name": "Mosquito, Insect & Bugs Netting",
      "items": [
        "Mosquito Net",
        "Netting",
        "Shade Net",
        "Anti Bird Net",
        "Mosquito Mesh"
      ]
    },
    {
      "name": "Flower Pots & Vases",
      "items": [
        "Vases",
        "Flower Vase",
        "Decorative Vase",
        "Flower Stand",
        "Wooden Vase"
      ]
    },
    {
      "name": "Artificial Plants & Foliage",
      "items": [
        "Artificial Grass",
        "Artificial Flowers",
        "Artificial Grass Mat",
        "Artificial Turf",
        "Artificial Plants"
      ]
    },
    {
      "name": "Fireplace and Fireplace Accessories",
      "items": [
        "Fireplace",
        "Fireplace Accessories",
        "Marble Fireplace",
        "Fire Pit",
        "Iron Fireplace Tool"
      ]
    },
    {
      "name": "Dried Flower & Potpourri",
      "items": [
        "Dry Leaves",
        "Dried Flowers",
        "Dried Fenugreek Leaves",
        "Moringa Dried Leaves",
        "Dried Red Rose Petals"
      ]
    },
    {
      "name": "Home Appliances & Kitchen Appliances",
      "items": [
        "Kitchen Appliance",
        "Home Appliances",
        "Washing Machine for Home",
        "Mixer Grinder",
        "Electric Irons"
      ]
    },
    {
      "name": "Indoor Lights & Lighting Accessories",
      "items": [
        "LED Lights",
        "LED Bulb",
        "Tube Light",
        "Panel Light",
        "LED Tube Light"
      ]
    },
    {
      "name": "Batteries & Charge Storage Devices",
      "items": [
        "Batteries",
        "Inverter Battery",
        "Lithium Ion Battery",
        "Industrial Batteries",
        "Lithium Primary Battery"
      ]
    },
    {
      "name": "Domestic Fans, AC & Coolers",
      "items": [
        "Electric Fans",
        "Ceiling Fans",
        "Air Conditioner",
        "Air Coolers",
        "Table Fan"
      ]
    },
    {
      "name": "Decorative Light, Lamp & Lamp Shades",
      "items": [
        "Decorative Light",
        "Lamps",
        "Wall Light",
        "Table Lamps",
        "String Light"
      ]
    },
    {
      "name": "Heater, Thermostat & Heating Devices",
      "items": [
        "Water Heater & Geyser",
        "Heater & Heating Components",
        "Electric Water Heater",
        "Electric Geyser",
        "Industrial Heaters"
      ]
    },
    {
      "name": "Fresh Flowers, Plants & Trees",
      "items": [
        "Flowering Plant",
        "Fruit Plants",
        "Garden Plant",
        "Natural Flowers",
        "Marigold Plant"
      ]
    },
    {
      "name": "Door Lock, Electronic Lock & Latches",
      "items": [
        "Door Lock",
        "Safety Padlocks",
        "Security Lock",
        "Padlock",
        "Anti Theft Lock"
      ]
    },
    {
      "name": "Cleaning Machines & Equipments",
      "items": [
        "Vacuum Cleaner",
        "Home Vacuum Cleaner",
        "Blasting Machine",
        "Cleaning Machinery",
        "Pressure Washer"
      ]
    },
    {
      "name": "Brackets, Holder & Hardware Fittings",
      "items": [
        "Metal Angles",
        "Hardware Accessories",
        "Aluminium Profiles",
        "Metal Fitting",
        "Iron Angle"
      ]
    },
    {
      "name": "Gifts, Crafts & Artifacts",
      "items": [
        "Decorative Items",
        "Decorative Handicrafts",
        "Showpiece",
        "Iron Crafts",
        "Handicraft Items"
      ]
    },
    {
      "name": "Gardening and Horticulture Tools",
      "items": [
        "Lawn Roller",
        "Garden Equipment",
        "Shovels",
        "Garden Spades",
        "Digging Tools"
      ]
    },
    {
      "name": "Bed Linen & Bedspreads",
      "items": [
        "Bed Linen",
        "Bed Sheets",
        "Pillows",
        "Cotton Bed Sheet",
        "Double Bed Sheets"
      ]
    },
    {
      "name": "PU Foam, Coir & Jute Mattresses",
      "items": [
        "Bed Mattress",
        "Sleeping Mattress",
        "PU Foam",
        "Foam Sheet",
        "Foam Mattress"
      ]
    },
    {
      "name": "Carpets & Rugs",
      "items": [
        "Carpets",
        "Room Carpet",
        "Rugs",
        "Room Rug",
        "Designer Carpet"
      ]
    },
    {
      "name": "Cushion & Cushion Covers",
      "items": [
        "Pillows",
        "Cushions",
        "Cushion Covers",
        "Pillow Covers",
        "Decorative Pillows"
      ]
    },
    {
      "name": "Light Bulb, Lamp & Lighting Fixtures",
      "items": [
        "Tube Light",
        "Light Bulb",
        "Light Fittings",
        "Lamp Holders",
        "Bulb Holder"
      ]
    },
    {
      "name": "Door Mats & Bath Mats",
      "items": [
        "Floor Mats",
        "Door Mats",
        "Rubber Mats",
        "Bathroom Mats",
        "Rubber Floor Mats"
      ]
    },
    {
      "name": "Bamboo and Wooden Handicrafts",
      "items": [
        "Wood Crafts",
        "Wooden Handicraft",
        "Wooden Box",
        "Wooden Temples",
        "Wooden Articles"
      ]
    },
    {
      "name": "Drapes & Curtains",
      "items": [
        "Curtains",
        "Designer Curtain",
        "Drape Curtain",
        "Window Curtains",
        "Cotton Curtain"
      ]
    },
    {
      "name": "Domestic RO Water Purifier & Filters",
      "items": [
        "Water Purifiers",
        "RO Water Purifiers",
        "RO UV Water Purifier",
        "Domestic RO Components",
        "Water Filters"
      ]
    },
    {
      "name": "Wallpaper, Blinds And Accessories",
      "items": [
        "Wallpaper",
        "Blinds",
        "Designer Wallpaper",
        "Interior Venetian Blinds",
        "3D Wallpaper"
      ]
    },
    {
      "name": "Travel Bags & Backpacks",
      "items": [
        "Leather Suitcase",
        "Travel Bags",
        "Luggage Bags",
        "Suitcase",
        "Backpacks"
      ]
    },
    {
      "name": "Blankets & Quilts",
      "items": [
        "Blankets",
        "Quilts",
        "Woollen Blanket",
        "Polyester Blanket",
        "Bed Quilts"
      ]
    },
    {
      "name": "Lantern, Chandeliers & Hanging Lamps",
      "items": [
        "Hanging Lamps",
        "Chandeliers",
        "Night Light",
        "Lantern",
        "Hanging Chandelier"
      ]
    },
    {
      "name": "Stamps & Collectible Coins",
      "items": [
        "Antique Pieces",
        "Collectible Coin",
        "Antique Collectible",
        "Antique Gong",
        "Postage Stamps"
      ]
    },
    {
      "name": "Ceramic & Clay Decoratives",
      "items": [
        "Ceramic Tablewares",
        "Ceramic Crafts",
        "Ceramic Crockery",
        "Terracotta",
        "Terracotta Home Decor"
      ]
    },
    {
      "name": "Electronic Safes & Security Systems",
      "items": [
        "Storage Lockers",
        "Security Safes",
        "Safety Locker",
        "Safe Deposit Locker",
        "Industrial Locker"
      ]
    },
    {
      "name": "Christmas Gifts & Decoratives",
      "items": [
        "Christmas Decorations",
        "Christmas Hangings",
        "Christmas Ornaments",
        "Christmas Trees",
        "Christmas Stars"
      ]
    },
    {
      "name": "Jute Handicrafts & Jute Products",
      "items": [
        "Jute Bags",
        "Jute & Jute Products",
        "Jute Twine",
        "Jute Handicraft",
        "Hessian Cloth"
      ]
    }
  ],
  "Metals, Alloys & Minerals": [
    {
      "name": "Metal & Metal Made Products",
      "items": [
        "Iron Rods",
        "Metal Rods",
        "Iron Bar",
        "Silver Powders",
        "Gold Powders"
      ]
    },
    {
      "name": "Minerals and Ores",
      "items": [
        "Silica Sand",
        "White Silica Sand",
        "Industrial Minerals",
        "Limestone Lumps",
        "Base Metal Ores"
      ]
    },
    {
      "name": "Steel & Stainless Steel Products",
      "items": [
        "Industrial Steel",
        "Industrial Stainless Steel Products",
        "Steel Ingots",
        "Stainless Steel",
        "Steel Products"
      ]
    },
    {
      "name": "Coal, Carbon & Charcoal",
      "items": [
        "Coal",
        "Coal Briquettes",
        "Wood Charcoal",
        "Charcoal",
        "Steam Coal"
      ]
    },
    {
      "name": "Copper & Brass Products",
      "items": [
        "Brass Raw Material",
        "Copper Strips, Rod and Bars",
        "Copper",
        "Brass Parts",
        "Copper Rod"
      ]
    },
    {
      "name": "Iron & Copper Alloys",
      "items": [
        "Stainless Steel Alloys",
        "White Gold",
        "Alloys",
        "Precious Metal Alloys",
        "Metal Alloys"
      ]
    },
    {
      "name": "Metal Scrap & Waste Materials",
      "items": [
        "Metal Scrap",
        "Ferrous Metal Scrap",
        "Cast Iron Scraps",
        "Iron Scrap",
        "Aluminium Scrap"
      ]
    },
    {
      "name": "Ironware, Ironmongery & Iron Artware",
      "items": [
        "Iron Ingots",
        "Galvanized Iron Wire",
        "Iron Metal",
        "Iron Wire",
        "Iron Plates"
      ]
    },
    {
      "name": "Mica & Mica Products",
      "items": [
        "Mica Sheet",
        "Mica",
        "Natural Mica",
        "Mica Flakes",
        "Mica Scrap"
      ]
    },
    {
      "name": "Aluminium and Aluminium Products",
      "items": [
        "Aluminum Construction Material",
        "Aluminium Tool Parts",
        "Aluminum Slide Block",
        "Cast Aluminium Gutters",
        "Aluminum Sheaves"
      ]
    },
    {
      "name": "Steel Bars, Rods, Plates & Sheets",
      "items": [
        "Hot Rolled Steel Angle Bar",
        "Hot Rolled Bars",
        "Steel Bars",
        "TMT Bars",
        "Steel Rods"
      ]
    },
    {
      "name": "Metal Finishing & Coating Services",
      "items": [
        "Coating Services",
        "Polishing Service",
        "Electroplating Services",
        "Powder Coating Services",
        "Blasting Job Works"
      ]
    },
    {
      "name": "Cement and Concrete",
      "items": [
        "Portland Cement",
        "Slag Cement",
        "Cement",
        "Calcium Aluminate Cement",
        "Roofing & Special Purpose Cements"
      ]
    }
  ],
  "Hand & Machine Tools": [
    {
      "name": "Drills, Grinders, Saws & Power Tools",
      "items": [
        "Power Tools",
        "Electric Drill",
        "Bench Heavy Duty Drill",
        "Electric Cutting Tools",
        "Heavy Drilling Machine"
      ]
    },
    {
      "name": "Pliers, Screwdrivers & Hammers",
      "items": [
        "Hand Tools",
        "Plier",
        "Screwdriver & Screwdriver Set",
        "Hammers",
        "Drill Bits"
      ]
    },
    {
      "name": "Cutting Tools & Milling Cutter",
      "items": [
        "Carbide Cutting Tools",
        "Machine Tools",
        "Cutting Tools",
        "Turning Tool",
        "Threading Tools"
      ]
    },
    {
      "name": "Chisels & Professional Hand Tools",
      "items": [
        "Hand Tools",
        "Wooden Tool Handles",
        "Drill Bits",
        "Tool Handles",
        "Professional Hand Tools"
      ]
    },
    {
      "name": "Machine & Precision Tools",
      "items": [
        "Machine Tools",
        "Industrial Shafts",
        "Workholding Fixtures",
        "Punching Tools",
        "Press Tools"
      ]
    },
    {
      "name": "Abrasives & Grains",
      "items": [
        "Polishing Pads",
        "Abrasive Pads",
        "Abrasive Discs",
        "Abrasive Wheels",
        "Diamond Powder"
      ]
    },
    {
      "name": "Gardening and Horticulture Tools",
      "items": [
        "Lawn Roller",
        "Garden Equipment",
        "Shovels",
        "Garden Spades",
        "Digging Tools"
      ]
    },
    {
      "name": "Hydraulic & Pneumatic Tools",
      "items": [
        "Commercial Spray Guns",
        "Pneumatic Tools",
        "Hydraulic Tools",
        "Paint Spray Gun",
        "Impact Wrench"
      ]
    },
    {
      "name": "Saw Blades & Grinding Wheels",
      "items": [
        "Cutting & Saw Blades",
        "Grinding Wheels",
        "Cutting Wheels",
        "TCT Saw Blade",
        "Industrial Blades"
      ]
    },
    {
      "name": "Jewellery Making Tools & Machines",
      "items": [
        "Jewellery Making Tools",
        "Jewelry Making Machines",
        "Jewellery Weighing Machine",
        "Chain Hammering Machine",
        "Diamond Tools"
      ]
    },
    {
      "name": "Woodworking Tools & Machines",
      "items": [
        "Wood Working Machines",
        "Wood Cutting Blade",
        "Electric Planers & Wood Routers",
        "Wood Cutter",
        "CNC Wood Router"
      ]
    },
    {
      "name": "Buffing, Surface Finishing Machines",
      "items": [
        "Blasting Machine",
        "Polishing Service",
        "Finishing Machine",
        "Polishing Machine",
        "Broaching Machine"
      ]
    },
    {
      "name": "Shearing, Trimming & Metal Profiling",
      "items": [
        "Shearing Machines",
        "Slotting Machines",
        "Broaching Tool",
        "Diamond Segment",
        "Eccentric Slotter Machine"
      ]
    },
    {
      "name": "Saws, Chainsaws and Saw Blades",
      "items": [
        "Hand Saws",
        "Band Saw Machine",
        "Sawing Machines",
        "Hacksaw Frames",
        "Wood Saw"
      ]
    },
    {
      "name": "Electrical & Electronic Goods Repair",
      "items": [
        "Home Appliances Repair & Maintenance",
        "Mobile Phone Repair Service",
        "Electronic Appliance Repair Service",
        "Air Conditioner Repair Services",
        "Industrial Appliances Repair & Maintenance"
      ]
    },
    {
      "name": "CNC Machines & Lathe Machine",
      "items": [
        "CNC Machined Components",
        "CNC Machines",
        "Precision Machined Components",
        "Lathe Machine",
        "CNC Components"
      ]
    },
    {
      "name": "Marine Tools & Equipments",
      "items": [
        "Marine Equipments",
        "Marine Fittings",
        "Boat Propeller",
        "Boats",
        "Marine Engine"
      ]
    },
    {
      "name": "Sewing,Knitting & Embroidery Machine",
      "items": [
        "Sewing Machines",
        "Knitting Needles",
        "Industrial Sewing Machine",
        "Home Sewing Machine",
        "Sewing Machine Parts"
      ]
    }
  ],
  "Handicrafts & Decoratives": [
    {
      "name": "God & Goddess Statues",
      "items": [
        "God Idols",
        "Indian God Statues",
        "God Statues",
        "Ganesh Statue",
        "Marble God Statue"
      ]
    },
    {
      "name": "Gifts, Crafts & Artifacts",
      "items": [
        "Decorative Items",
        "Decorative Handicrafts",
        "Showpiece",
        "Iron Crafts",
        "Handicraft Items"
      ]
    },
    {
      "name": "Party Decorations & Supplies",
      "items": [
        "Decorative Diya",
        "Party Decoration",
        "Balloons",
        "Party Supplies",
        "Celebration Firework"
      ]
    },
    {
      "name": "Corporate & Business Gifts",
      "items": [
        "Corporate Gifts",
        "Advertising Novelties",
        "Printed Leaflet",
        "Advertising Brochure",
        "Video Brochure"
      ]
    },
    {
      "name": "Statues & Sculptures",
      "items": [
        "Animal Statues",
        "Metal Statue",
        "Marble Statue",
        "Wood Statue",
        "Decorative Statue"
      ]
    },
    {
      "name": "Abstract & Contemporary Paintings",
      "items": [
        "Paintings",
        "Canvas Painting",
        "Wall Painting Service",
        "Decorative Paintings",
        "Wall Painting"
      ]
    },
    {
      "name": "Bamboo and Wooden Handicrafts",
      "items": [
        "Wood Crafts",
        "Wooden Handicraft",
        "Wooden Box",
        "Wooden Temples",
        "Wooden Articles"
      ]
    },
    {
      "name": "Brass, Copper & Metal Handicrafts",
      "items": [
        "Metal Crafts",
        "Iron Crafts",
        "Brass Crafts",
        "Copper Utensils",
        "Aluminium Handicrafts"
      ]
    },
    {
      "name": "Greeting & Invitation Cards",
      "items": [
        "Correspondence Cards",
        "Greeting Cards",
        "Business Cards",
        "Visiting Cards",
        "Wedding Cards"
      ]
    },
    {
      "name": "Awards & Trophies",
      "items": [
        "Trophies",
        "Award Trophies",
        "Wooden Trophy",
        "Momentos",
        "Metal Trophies"
      ]
    },
    {
      "name": "Stamps & Collectible Coins",
      "items": [
        "Antique Pieces",
        "Collectible Coin",
        "Antique Collectible",
        "Antique Gong",
        "Postage Stamps"
      ]
    },
    {
      "name": "Ceramic & Clay Decoratives",
      "items": [
        "Ceramic Tablewares",
        "Ceramic Crafts",
        "Ceramic Crockery",
        "Terracotta",
        "Terracotta Home Decor"
      ]
    },
    {
      "name": "Christmas Gifts & Decoratives",
      "items": [
        "Christmas Decorations",
        "Christmas Hangings",
        "Christmas Ornaments",
        "Christmas Trees",
        "Christmas Stars"
      ]
    },
    {
      "name": "Bone and Shell Handicrafts",
      "items": [
        "Bone Crafts",
        "Horn Craft",
        "Animal Horn",
        "Bone Handicraft",
        "Bone Inlay Box"
      ]
    },
    {
      "name": "Flags & Related Accessories",
      "items": [
        "Advertising Banners",
        "Flex Banner",
        "Flag & Flag Accessories",
        "Promotional Flags",
        "Indian National Flag"
      ]
    },
    {
      "name": "Medieval Swords & Armours",
      "items": [
        "Medieval Helmets",
        "Mace Weapon",
        "Medieval Shield",
        "Medieval Armors",
        "Chain Mails"
      ]
    },
    {
      "name": "Jute Handicrafts & Jute Products",
      "items": [
        "Jute Bags",
        "Jute & Jute Products",
        "Jute Twine",
        "Jute Handicraft",
        "Hessian Cloth"
      ]
    },
    {
      "name": "Smoking Pipes, Chillums & Hookah",
      "items": [
        "Herb Grinders",
        "Metal Herb Grinder",
        "Wooden Herb Grinder",
        "Aluminium Herb Grinder",
        "Plastic Herb Grinder"
      ]
    },
    {
      "name": "Decorative Light, Lamp & Lamp Shades",
      "items": [
        "Decorative Light",
        "Lamps",
        "Wall Light",
        "Table Lamps",
        "String Light"
      ]
    },
    {
      "name": "Clocks and Watches",
      "items": [
        "Wrist Watch",
        "Decorative Clock",
        "Wall Clocks",
        "Smart Watch",
        "Decorative Wall Clock"
      ]
    },
    {
      "name": "Fresh Flowers, Plants & Trees",
      "items": [
        "Flowering Plant",
        "Fruit Plants",
        "Garden Plant",
        "Natural Flowers",
        "Marigold Plant"
      ]
    },
    {
      "name": "Glass, Gem Stone, Wood & Other Beads",
      "items": [
        "Beads",
        "Glass Beads",
        "Rudraksha Beads",
        "Silver Beads",
        "Pearl Beads"
      ]
    },
    {
      "name": "Fashion & Designer Bags",
      "items": [
        "Ladies Bags",
        "Handbags",
        "Ladies Hand Bags",
        "Designer Bag",
        "Ladies Fashion Bags"
      ]
    },
    {
      "name": "Mirrors and Glassware",
      "items": [
        "Glass Mirrors",
        "Glassware",
        "Glass Block",
        "Glass Plate",
        "Glass Craft"
      ]
    },
    {
      "name": "Keychains & Bottle Openers",
      "items": [
        "Keychains",
        "Key Hooks",
        "Key Rings",
        "Key Holders",
        "Keychain Ring"
      ]
    },
    {
      "name": "Garden & Landscaping Products",
      "items": [
        "Garden Decor",
        "Decorative Pot",
        "Garden Lighting",
        "Garden Fountains",
        "Decorative Fountain"
      ]
    },
    {
      "name": "Cotton, Jute & Canvas Bags",
      "items": [
        "Jute Bags",
        "Cotton Bags",
        "Jute Carry Bag",
        "Fancy Jute Bag",
        "Fabric Bag"
      ]
    },
    {
      "name": "Photo Frames & Picture Frames",
      "items": [
        "Photo Frame",
        "Wooden Photo Frames",
        "Decorative Photo Frame",
        "Wooden Digital Photo Frame",
        "Designer Photo Frames"
      ]
    },
    {
      "name": "Flower Pots, Wall & Garden Planters",
      "items": [
        "Plant Pots",
        "Flower Pots",
        "Decorative Pot",
        "Planter",
        "Plant Holder"
      ]
    },
    {
      "name": "Marble & Stone Artifacts",
      "items": [
        "Sandstone Article",
        "Stone Crafts",
        "Granite Monuments",
        "Stone Artifacts",
        "Marble Handicrafts"
      ]
    },
    {
      "name": "Aqua Culture, Aquarium & Supplies",
      "items": [
        "Aquarium Fish",
        "Fish Aquarium",
        "Aquarium Accessories",
        "Aquarium Tank",
        "Live Tropical Fish"
      ]
    },
    {
      "name": "Wall & Door Hangings",
      "items": [
        "Wall Hanging",
        "Wall Decor",
        "Iron Wall Hanging",
        "Decorative Wall Art",
        "Metal Wall Hanging"
      ]
    },
    {
      "name": "Candle Stands & Candelabra",
      "items": [
        "Decorative Candle Holder",
        "Candle Holder",
        "Candle Stands",
        "T-Light Candle Holder",
        "Candle Holder Stand"
      ]
    },
    {
      "name": "Lantern, Chandeliers & Hanging Lamps",
      "items": [
        "Hanging Lamps",
        "Chandeliers",
        "Night Light",
        "Lantern",
        "Hanging Chandelier"
      ]
    },
    {
      "name": "Artificial & Decorative Candles",
      "items": [
        "Candle",
        "Garden Candle",
        "Scented Candles",
        "Wax Candles",
        "Tea Light Candle"
      ]
    },
    {
      "name": "Flower Pots & Vases",
      "items": [
        "Vases",
        "Flower Vase",
        "Decorative Vase",
        "Flower Stand",
        "Wooden Vase"
      ]
    },
    {
      "name": "Artificial Plants & Foliage",
      "items": [
        "Artificial Grass",
        "Artificial Flowers",
        "Artificial Grass Mat",
        "Artificial Turf",
        "Artificial Plants"
      ]
    },
    {
      "name": "Painters & Painting Service Provider",
      "items": [
        "Art Designing Service",
        "Painting Conservation Work",
        "Art Gallery Services",
        "Art Glass Work",
        "Paper Cutting Work"
      ]
    }
  ],
  "Kitchen Utensils & Appliances": [
    {
      "name": "Cookware and Cooking Utensils",
      "items": [
        "Plastic Kitchenware",
        "Kitchenware",
        "Cookware",
        "Stainless Steel Pressure Cooker",
        "Pressure Cooker"
      ]
    },
    {
      "name": "Dinnerware and Serving Utensils",
      "items": [
        "Tableware",
        "Plastic Utensil",
        "Plastic Dinner Plate",
        "Dinner Plates",
        "Drinking Glasses"
      ]
    },
    {
      "name": "Food Storage Boxes & Containers",
      "items": [
        "Water Bottle",
        "Food Storage Containers",
        "Kitchen Containers",
        "Lunch Boxes",
        "Metal Water Bottles"
      ]
    },
    {
      "name": "Hotel & Commercial Cooking Equipment",
      "items": [
        "Commercial Kitchen Equipments",
        "Kitchen Equipment",
        "Canteen & Kitchen Appliances",
        "Catering Equipment",
        "Hand Juicer"
      ]
    },
    {
      "name": "Barware and Bar Accessories",
      "items": [
        "Bar Accessories",
        "Reusable Ice Cubes",
        "Wine Glasses",
        "Wine Accessories",
        "Ice Storage Box"
      ]
    },
    {
      "name": "Induction Cooktops, Hobs & Burners",
      "items": [
        "Gas Stoves",
        "Stainless Steel Gas Stove",
        "Cast Iron Stove",
        "Restaurant Gas Stove",
        "Single Burner Range"
      ]
    },
    {
      "name": "Spoons, Table Knife and Cutlery",
      "items": [
        "Kitchen Accessories",
        "Spoon",
        "Cutlery",
        "Wooden Spoon",
        "Plastic Spoons"
      ]
    },
    {
      "name": "Mirrors and Glassware",
      "items": [
        "Glass Mirrors",
        "Glassware",
        "Glass Block",
        "Glass Plate",
        "Glass Craft"
      ]
    },
    {
      "name": "Teapot, Coffee Mugs & Tea Sets",
      "items": [
        "Drinking Mug",
        "Fancy Cups",
        "Coffee Mugs",
        "Customizable Coffee Mug",
        "Tea Cups"
      ]
    },
    {
      "name": "Disposable Cutlery and Crockery",
      "items": [
        "Disposable Utensils",
        "Disposable Plate",
        "Paper Plate",
        "Paper Cups",
        "Disposable Bowl"
      ]
    },
    {
      "name": "Gas Cylinders and Accessories",
      "items": [
        "Gas Cylinder Accessories",
        "Commercial LPG Cylinders",
        "Gas Cylinders",
        "LPG Filter",
        "LPG Cylinder Accessories"
      ]
    },
    {
      "name": "Kitchen Cutters & Cutting Boards",
      "items": [
        "Kitchen Knives",
        "Kitchen Cutter",
        "Kitchen Chopper",
        "Vegetable Cutter",
        "Chopping Boards"
      ]
    },
    {
      "name": "Baking Tray, Pans and Bakeware",
      "items": [
        "Baking Tools",
        "Baking Utensils",
        "Pizza Maker",
        "Cake Base Boards",
        "Pizza Cutter"
      ]
    },
    {
      "name": "Silver Cutlery and Silver Products",
      "items": [
        "Silver Articles",
        "Silver Plated Idols",
        "Silver Utensils",
        "Silver Plate",
        "Silver Handicrafts"
      ]
    },
    {
      "name": "Barbecue & Outdoor Cooking Devices",
      "items": [
        "Barbecue Grill",
        "Shawarma Machine",
        "BBQ Accessories",
        "Meat Mincer",
        "Chicken Grill Machine"
      ]
    },
    {
      "name": "Stainless Steel Utensils & Cookware",
      "items": [
        "Stainless Steel Pressure Cooker",
        "Steel Cooking Utensils",
        "Stainless Steel Kitchen Utensils",
        "Stainless Steel Kitchenware",
        "Stainless Steel Pans"
      ]
    },
    {
      "name": "Kitchenware & Cookware",
      "items": [
        "Kitchenware",
        "Electric Blender",
        "Modular Kitchen Basket",
        "Partition Basket",
        "Stainless Steel Sansi"
      ]
    }
  ],
  "Textiles, Yarn & Fabrics": [
    {
      "name": "Yarns & Threads",
      "items": [
        "Yarn",
        "Monofilament Yarn",
        "Natural Fiber Yarns",
        "Filament Yarn",
        "Threads"
      ]
    },
    {
      "name": "Industrial Fabrics and Textiles",
      "items": [
        "Industrial Fabric",
        "Filament Fabric",
        "Narrow Woven Fabrics",
        "Non Woven Fabric",
        "Cotton Canvas Fabric"
      ]
    },
    {
      "name": "Sewing Threads, Laces & Accessories",
      "items": [
        "Lace",
        "Fancy Laces",
        "Embroidered Laces",
        "Elastic Tapes",
        "Garment Laces"
      ]
    },
    {
      "name": "Tents, Tarpaulins & PE Covers",
      "items": [
        "Tents",
        "Tarpaulins",
        "Wedding and Event Tents",
        "Canvas Sheet",
        "HDPE Tarpaulin"
      ]
    },
    {
      "name": "Garment & Textile Industrial Tools",
      "items": [
        "Loom Spare Parts",
        "Textile Equipment Parts",
        "Rapier Weaving Loom",
        "Ironing Board Table",
        "Rapier Loom"
      ]
    },
    {
      "name": "Home Decor Fabric",
      "items": [
        "Home Decor & Furnishing Fabrics",
        "Home Furnishings Accessories",
        "Home Textile Fabrics",
        "Furniture Covers",
        "Sofa Covers"
      ]
    },
    {
      "name": "Reflective Products & Holograms",
      "items": [
        "Hologram Paper Labels",
        "Holograms",
        "Hologram Labels",
        "Floor Marking Tape",
        "Reflective Accessories"
      ]
    },
    {
      "name": "Silk Apparel, Clothings & Fabrics",
      "items": [
        "Silk Sarees",
        "Silk Textile",
        "South Indian Silk Sarees",
        "Ladies Silk Suit",
        "Silk Garments"
      ]
    },
    {
      "name": "Ladies Dresses, Apparels & Clothings",
      "items": [
        "Ladies Kurti",
        "Ladies Wear",
        "Ladies Suits",
        "Women Clothes",
        "Designer Kurtis"
      ]
    },
    {
      "name": "Apparel Fabrics & Clothing Textiles",
      "items": [
        "Fabric",
        "Cotton Fabric",
        "Cotton Textile",
        "Woven Fabrics",
        "Cotton Woven Fabrics"
      ]
    },
    {
      "name": "Hand Sanitizers & Personal Hygiene",
      "items": [
        "Medicated Soap",
        "Bath Soaps",
        "Handmade Soaps",
        "Organic Soap",
        "Hand Sanitizer & Disinfectant"
      ]
    },
    {
      "name": "Sarees, Lehenga and Salwar Suits",
      "items": [
        "Ladies Suits",
        "Designer Sarees",
        "Fancy Sarees",
        "Indian Sarees",
        "Ladies Salwar Suits"
      ]
    },
    {
      "name": "Men Shirts, Jeans & Clothing",
      "items": [
        "Men Wear",
        "Men T-Shirts",
        "Men Shirts",
        "Men Jeans",
        "Men Cotton Shirts"
      ]
    },
    {
      "name": "Kids Casual, Ethnic & Western Wear",
      "items": [
        "Kids Wear",
        "Boys Clothes",
        "Boys Underpant",
        "Kids Frock",
        "Kids T-Shirt"
      ]
    },
    {
      "name": "Towels, Napkins & Handkerchieves",
      "items": [
        "Tissue Paper",
        "Toilet Paper Roll",
        "Tissue Paper Boxes",
        "Towels",
        "Napkins"
      ]
    },
    {
      "name": "Winter Wear & Accessories",
      "items": [
        "Women Blazer",
        "Knitwear",
        "Blazers",
        "Men Blazer",
        "Men Knitted Wear"
      ]
    },
    {
      "name": "Cufflink, Buttons, Zippers & Buckles",
      "items": [
        "Garment Accessories",
        "Buttons",
        "Designer Cufflink",
        "Dress Studs",
        "Buckles"
      ]
    },
    {
      "name": "Motifs, Badges, Emblems & Lanyards",
      "items": [
        "Badges",
        "Lanyards",
        "Ribbons",
        "Logo Patches",
        "Hand Embroidered Motifs"
      ]
    },
    {
      "name": "Carpets & Rugs",
      "items": [
        "Carpets",
        "Room Carpet",
        "Rugs",
        "Room Rug",
        "Designer Carpet"
      ]
    },
    {
      "name": "Textile, Dyeing & Finishing Chemical",
      "items": [
        "Sizing Agent",
        "Textile Finishing Agent",
        "Textile Chemical",
        "Bleaching Powder",
        "Sizing Chemicals"
      ]
    },
    {
      "name": "Wallpaper, Blinds And Accessories",
      "items": [
        "Wallpaper",
        "Blinds",
        "Designer Wallpaper",
        "Interior Venetian Blinds",
        "3D Wallpaper"
      ]
    },
    {
      "name": "Leggings, Jeggings, Socks & Stocking",
      "items": [
        "Leggings",
        "Pantyhose",
        "Ladies Tights",
        "Women Printed Leggings",
        "Designer Leggings"
      ]
    },
    {
      "name": "Garments & Textiles Job Work",
      "items": [
        "Stitching Services",
        "Embroidery Job Work",
        "Garment Stitching Service",
        "Ladies Clothes Stitching Services",
        "Tailors"
      ]
    },
    {
      "name": "Embroidery Needles & Accessories",
      "items": [
        "Hand Knitting Needles",
        "Knitting Needles",
        "Sewing Needles",
        "Bobbin",
        "Sewing Machine Needle"
      ]
    },
    {
      "name": "Mosquito, Insect & Bugs Netting",
      "items": [
        "Mosquito Net",
        "Netting",
        "Shade Net",
        "Anti Bird Net",
        "Mosquito Mesh"
      ]
    },
    {
      "name": "Embroidered Apparel & Garments",
      "items": [
        "Embroidered Clothing",
        "Embroidered Ladies Garment",
        "Embroidered Kurtis",
        "Embroidered Ladies Suit",
        "Cotton Embroidered Kurti"
      ]
    },
    {
      "name": "Umbrellas and Raincoats",
      "items": [
        "Umbrella",
        "Raincoats & Rainsuits",
        "Garden Umbrella",
        "Promotional Umbrella",
        "Stick Umbrella"
      ]
    },
    {
      "name": "Embroidered Fabric & Textiles",
      "items": [
        "Embroidery Work & Embroidery Fabric",
        "Embroidery Job Work",
        "Embroidered Dress Material",
        "Hand Embroidered Motifs",
        "Hand Embroidery"
      ]
    },
    {
      "name": "Jute Handicrafts & Jute Products",
      "items": [
        "Jute Bags",
        "Jute & Jute Products",
        "Jute Twine",
        "Jute Handicraft",
        "Hessian Cloth"
      ]
    }
  ],
  "Books & Stationery": [
    {
      "name": "Office Stationery & Calculator",
      "items": [
        "Desk Accessories",
        "Office Stationery",
        "Attendance Register",
        "Staplers",
        "Scissors"
      ]
    },
    {
      "name": "Printing Inks & Other Supplies",
      "items": [
        "Cartridge",
        "Printing Ink",
        "Toner Cartridges",
        "Printer Consumables",
        "Paper Printing Ink"
      ]
    },
    {
      "name": "Pen, Pencil & Writing Supplies",
      "items": [
        "School Stationery",
        "Pens",
        "Ball Pen",
        "Pencils",
        "Fountain Pens"
      ]
    },
    {
      "name": "Files, Folders & Notebooks",
      "items": [
        "Notebook",
        "Letter Pad",
        "Paper Envelopes",
        "Diaries",
        "Writing Pad"
      ]
    },
    {
      "name": "Presentation Boards & Accessories",
      "items": [
        "Projector",
        "Interactive Board",
        "Black & White Board Accessories",
        "Writing Board",
        "Dustless chalk"
      ]
    },
    {
      "name": "Reference Books & Study Material",
      "items": [
        "Account Books",
        "Reference Books",
        "General Books",
        "Magazines",
        "Competition Books"
      ]
    },
    {
      "name": "Crayon, Painting Brush & Craft Tools",
      "items": [
        "Drawing Inks",
        "Drawing Instruments",
        "Art Materials",
        "Kraft Paperboard",
        "Crayon & Poster Color"
      ]
    },
    {
      "name": "Kids Fiction & Entertainment Books",
      "items": [
        "School Book",
        "Children Books",
        "Drawing Book",
        "Coloring Book",
        "Computer Books"
      ]
    },
    {
      "name": "Science & Technology Books",
      "items": [
        "Engineering Book",
        "Medical books",
        "Mathematical Books",
        "Physics Books",
        "Technology Books"
      ]
    },
    {
      "name": "Culture & Religion Related Books",
      "items": [
        "Religious Books",
        "Islamic Books",
        "Devotional Books",
        "Astrology Books",
        "Bhagavad Gita Book"
      ]
    },
    {
      "name": "Management & Educational Books",
      "items": [
        "Printed Book",
        "Educational Books",
        "Psychology Books",
        "Sociology Books",
        "Geography Books"
      ]
    },
    {
      "name": "Social Science & Literature Books",
      "items": [
        "History Books",
        "Law Books",
        "Novel Books",
        "Political Science Books",
        "Biography Books"
      ]
    },
    {
      "name": "Printing & Binding Services",
      "items": [
        "Stationery & Book Printing",
        "Advertising Printing Service",
        "Digital Printing Service",
        "Printing Services",
        "Corporate Printing"
      ]
    },
    {
      "name": "Paper & Paper Made Products",
      "items": [
        "Printing Paper",
        "Raw Paper Material",
        "A4 Size Paper",
        "Kraft Paper",
        "Printed Paper Sheets"
      ]
    },
    {
      "name": "Paper Bags, Gifts & Paper Products",
      "items": [
        "Paperboard",
        "Paper Bags",
        "Paper Box",
        "Paper Carry Bags",
        "Paper Card"
      ]
    },
    {
      "name": "Greeting & Invitation Cards",
      "items": [
        "Correspondence Cards",
        "Greeting Cards",
        "Business Cards",
        "Visiting Cards",
        "Wedding Cards"
      ]
    },
    {
      "name": "Copywriting & Content Development",
      "items": [
        "Content Writing Service",
        "Content Development Service",
        "Research Development Services",
        "Article Writing Service",
        "Ad Copywriting Service"
      ]
    },
    {
      "name": "Newspaper & Magazine Publishers",
      "items": [
        "Publishing House",
        "Book Publisher",
        "Daily News Services",
        "Newspaper Publishing",
        "Magazine Design Services"
      ]
    }
  ],
  "Cosmetics & Personal Care": [
    {
      "name": "Cosmetics, Hair & Beauty Products",
      "items": [
        "Cosmetics",
        "Beauty Cosmetics",
        "Hair Care Products",
        "Sunscreen Lotion",
        "Sun Protection Cream"
      ]
    },
    {
      "name": "Hand Sanitizers & Personal Hygiene",
      "items": [
        "Medicated Soap",
        "Bath Soaps",
        "Handmade Soaps",
        "Organic Soap",
        "Hand Sanitizer & Disinfectant"
      ]
    },
    {
      "name": "Salon, Spa Kits & Equipments",
      "items": [
        "Salon Equipment",
        "Shaving Accessories",
        "Makeup Accessories",
        "Shaving Cream",
        "Hair Dryer"
      ]
    },
    {
      "name": "Essential  & Aromatic Oils",
      "items": [
        "Essential Oils",
        "Carrier Oil",
        "Jojoba Oil",
        "Linseed Oil",
        "Herb Oil"
      ]
    },
    {
      "name": "Child and Baby Care Products",
      "items": [
        "Diapering Products",
        "Diaper",
        "Baby Care Products",
        "Baby Diapers",
        "Adult Diapers"
      ]
    },
    {
      "name": "Cosmetic Raw Materials",
      "items": [
        "Cosmetic Oils & Butters",
        "Cosmetic Additives",
        "Soda Ash",
        "Detergent Raw Material",
        "Surfactants & Cleansing Agents"
      ]
    },
    {
      "name": "Massage Equipments & Spa Devices",
      "items": [
        "Massage Equipment",
        "Massagers",
        "Massage Apparatus",
        "Foot and Calf Massager",
        "Therapeutic Massager"
      ]
    },
    {
      "name": "Perfume and Fragrances",
      "items": [
        "Perfumes",
        "Fragrance Perfume",
        "Body Deodorants",
        "Body Spray",
        "Resinoids"
      ]
    },
    {
      "name": "Soaps, Detergent Powder & Cakes",
      "items": [
        "Detergent",
        "Detergent Powder",
        "Dishwashing Detergents",
        "Detergent Cake",
        "Dishwash Liquid"
      ]
    },
    {
      "name": "Ayurvedic, Herbal Oils and Cosmetics",
      "items": [
        "Herbal Skin Care Cosmetics",
        "Herbal Soaps",
        "Herbal Hair Oil",
        "Herbal Shampoo",
        "Herbal Cosmetics"
      ]
    },
    {
      "name": "Fitness Clubs and Beauty Parlours",
      "items": [
        "Beauty Services",
        "Hair Cutting",
        "Bridal Make Up Services",
        "Health Club Services",
        "Fitness Club"
      ]
    },
    {
      "name": "Bindi & Body Beautification Products",
      "items": [
        "Hair Clips",
        "Hair Bands & Hair Tie",
        "Hair Accessories",
        "Liquid Sindoor",
        "Bindi"
      ]
    },
    {
      "name": "Natural & Herbal Henna",
      "items": [
        "Henna Powder",
        "Henna Mehandi",
        "Mehandi Cone",
        "Henna",
        "Black Henna Powder"
      ]
    }
  ],
  "Home Textile & Furnishing": [
    {
      "name": "Bed Linen & Bedspreads",
      "items": [
        "Bed Linen",
        "Bed Sheets",
        "Pillows",
        "Cotton Bed Sheet",
        "Double Bed Sheets"
      ]
    },
    {
      "name": "PU Foam, Coir & Jute Mattresses",
      "items": [
        "Bed Mattress",
        "Sleeping Mattress",
        "PU Foam",
        "Foam Sheet",
        "Foam Mattress"
      ]
    },
    {
      "name": "Carpets & Rugs",
      "items": [
        "Carpets",
        "Room Carpet",
        "Rugs",
        "Room Rug",
        "Designer Carpet"
      ]
    },
    {
      "name": "Cushion & Cushion Covers",
      "items": [
        "Pillows",
        "Cushions",
        "Cushion Covers",
        "Pillow Covers",
        "Decorative Pillows"
      ]
    },
    {
      "name": "Door Mats & Bath Mats",
      "items": [
        "Floor Mats",
        "Door Mats",
        "Rubber Mats",
        "Bathroom Mats",
        "Rubber Floor Mats"
      ]
    },
    {
      "name": "Drapes & Curtains",
      "items": [
        "Curtains",
        "Designer Curtain",
        "Drape Curtain",
        "Window Curtains",
        "Cotton Curtain"
      ]
    },
    {
      "name": "Wallpaper, Blinds And Accessories",
      "items": [
        "Wallpaper",
        "Blinds",
        "Designer Wallpaper",
        "Interior Venetian Blinds",
        "3D Wallpaper"
      ]
    },
    {
      "name": "Blankets & Quilts",
      "items": [
        "Blankets",
        "Quilts",
        "Woollen Blanket",
        "Polyester Blanket",
        "Bed Quilts"
      ]
    },
    {
      "name": "Tablecloths, Table Linen & Placemats",
      "items": [
        "Handmade Paper Trays",
        "Tablecloth",
        "Table Covers",
        "Table Mats",
        "Table Runners"
      ]
    },
    {
      "name": "Kitchen Towels and Kitchen Textiles",
      "items": [
        "Table Linen",
        "Kitchen Linens",
        "Kitchen Apron",
        "Dishcloths",
        "Kitchen Towel"
      ]
    },
    {
      "name": "Bath Linen Manufacturers",
      "items": [
        "Men Bathrobe",
        "Bathrobes",
        "Bath Towel",
        "Ladies Bathrobe",
        "Cotton Bathrobe"
      ]
    },
    {
      "name": "Towels, Napkins & Handkerchieves",
      "items": [
        "Tissue Paper",
        "Toilet Paper Roll",
        "Tissue Paper Boxes",
        "Towels",
        "Napkins"
      ]
    },
    {
      "name": "Home Decor Fabric",
      "items": [
        "Home Decor & Furnishing Fabrics",
        "Home Furnishings Accessories",
        "Home Textile Fabrics",
        "Furniture Covers",
        "Sofa Covers"
      ]
    }
  ],
  "Engineering Services": [
    {
      "name": "Industrial & Metal Fabrication",
      "items": [
        "Fabrication Works",
        "Metal Fabrication",
        "Structural Fabrication",
        "Industrial Fabrication",
        "Fabrication Services"
      ]
    },
    {
      "name": "Metal Finishing & Coating Services",
      "items": [
        "Coating Services",
        "Polishing Service",
        "Electroplating Services",
        "Powder Coating Services",
        "Blasting Job Works"
      ]
    },
    {
      "name": "Plant Design & Installation Services",
      "items": [
        "Installation Service",
        "Industrial Equipment Installation",
        "Plant & Equipment Erection Services",
        "Erection Commissioning Service",
        "Commissioning Services"
      ]
    },
    {
      "name": "Electrical & Signaling Contractors",
      "items": [
        "Electrical Contractor",
        "Electrical Work",
        "Electrical Wiring Services",
        "Electrical Installation",
        "Commercial Electrical Works"
      ]
    },
    {
      "name": "Material Cutting Services",
      "items": [
        "Cutting Services",
        "Laser Cutting Services",
        "CNC Cutting Service",
        "CNC Laser Cutting Services",
        "Steel Cutting Services"
      ]
    },
    {
      "name": "Manufacturing & Assembling Services",
      "items": [
        "Machining Job Work",
        "CNC Machining Services",
        "CNC Turning JobWork Services",
        "Precision Machining Services",
        "VMC Machining Services"
      ]
    },
    {
      "name": "Product Engineering and Prototyping",
      "items": [
        "Product Designing",
        "Product Prototyping Services",
        "3D Product Design",
        "Product Engineering Service",
        "Mechanical Engineering Services"
      ]
    },
    {
      "name": "Agricultural & Farm Consultants",
      "items": [
        "Farm Management Service",
        "Agro Farming Services",
        "Poultry Farming",
        "Agriculture Production Services",
        "Agricultural Consultants"
      ]
    },
    {
      "name": "Waste Management & Control Services",
      "items": [
        "Waste Management Services",
        "Water Treatment Services",
        "Wastewater Treatment Services",
        "Solid Waste Management",
        "ETP Operation Maintenance Services"
      ]
    },
    {
      "name": "Dyeing & Printing",
      "items": [
        "Fabric Printing",
        "T-Shirt Printing Services",
        "Garment Printing",
        "Fabric Dyeing Services",
        "Digital Fabric Printing"
      ]
    },
    {
      "name": "Door & Window Fabrication Services",
      "items": [
        "Window & Railing Fabrication Services",
        "Designer Glass Works",
        "Grills Fabrication Works",
        "Roofing Solutions",
        "Gate Fabrication Services"
      ]
    },
    {
      "name": "Building Survey & Soil Investigation",
      "items": [
        "Geotechnical Engineering",
        "Mapping Service",
        "Site Survey Services",
        "Geotechnical Investigation Services",
        "Layout Survey Services"
      ]
    },
    {
      "name": "Product Packing & Labelling Services",
      "items": [
        "Packaging Solutions",
        "Goods Packaging Service",
        "Package Designing Services",
        "Food Packaging Solutions",
        "Private Labeling Services"
      ]
    },
    {
      "name": "Drilling, Boring & Mining Services",
      "items": [
        "Borewell Drilling Service",
        "Drilling Job Work",
        "Boring Services",
        "Core Drilling Services",
        "Mineral Exploration Services"
      ]
    },
    {
      "name": "Metal & Plastic Moulding Services",
      "items": [
        "Molding Services",
        "Plastic Molded Parts",
        "Injection Molding Job Works",
        "Plastic Injection Molding Services",
        "Plastic Molding Services"
      ]
    },
    {
      "name": "Welding, Soldering & Brazing Service",
      "items": [
        "Welding Services",
        "Brazing Services",
        "Laser Welding Service",
        "Soldering Services",
        "PCB Soldering"
      ]
    },
    {
      "name": "Metal Refining and Recycling",
      "items": [
        "Metal Refining",
        "Gold Refining",
        "Precious Metal Refiners",
        "Precious Metal Recovery",
        "Silver Refining"
      ]
    },
    {
      "name": "Machines & Equipments",
      "items": [
        "Industrial Machinery",
        "Oil Filters",
        "Laundry Washing Machine",
        "Oil Filter Machine",
        "SPM Machine"
      ]
    },
    {
      "name": "Cranes, Forklift & Lifting Machines",
      "items": [
        "Crane",
        "Pulleys",
        "Crane Spare Parts",
        "Hoist",
        "Electric Forklift"
      ]
    },
    {
      "name": "Material Handling Machines & Systems",
      "items": [
        "Material Handling Equipments",
        "Industrial Furniture",
        "Warehouse Stacker",
        "Straddle Carrier",
        "Pallet Machines"
      ]
    },
    {
      "name": "Pollution Control Devices & Machines",
      "items": [
        "Air Pollution Control Equipment",
        "Air Filters",
        "Dust Collector",
        "Air Purifier",
        "Hydrocyclone Sand Separator"
      ]
    },
    {
      "name": "Printing & Binding Services",
      "items": [
        "Stationery & Book Printing",
        "Advertising Printing Service",
        "Digital Printing Service",
        "Printing Services",
        "Corporate Printing"
      ]
    },
    {
      "name": "Water Treatment & Purification Plant",
      "items": [
        "Reverse Osmosis Plants",
        "RO Machines",
        "Filter Media",
        "Industrial Reverse Osmosis Plant",
        "Water Treatment Plants"
      ]
    },
    {
      "name": "Welding Equipments & Machinery",
      "items": [
        "Welding Machine",
        "Welding Machine Parts",
        "Welding Accessories",
        "Arc Welding Machines",
        "Welding Flux"
      ]
    },
    {
      "name": "Architectural & Civil Engineering",
      "items": [
        "Architectural Services",
        "Civil Engineering Service",
        "Architectural Designing Services",
        "Civil Works Service",
        "Waterproofing Service"
      ]
    },
    {
      "name": "Industrial Furnaces & Ovens",
      "items": [
        "Industrial Furnaces",
        "Industrial Ovens",
        "Furnace Parts",
        "Chimney",
        "Conveyor Pizza Oven"
      ]
    },
    {
      "name": "CNC Machines & Lathe Machine",
      "items": [
        "CNC Machined Components",
        "CNC Machines",
        "Precision Machined Components",
        "Lathe Machine",
        "CNC Components"
      ]
    },
    {
      "name": "Drilling & Boring Equipment",
      "items": [
        "Electric Drill",
        "Boring Machine",
        "Bench Heavy Duty Drill",
        "Drilling Equipment",
        "Drill Bits"
      ]
    },
    {
      "name": "Excavator and Earth Moving Machinery",
      "items": [
        "Earthmoving Machinery",
        "Earth Movers",
        "Earthmoving Machinery Parts",
        "Earthmoving Equipment Rental",
        "JCB Spare Part"
      ]
    },
    {
      "name": "Oxygen & Nitrogen Gas Plants",
      "items": [
        "Air Compressor",
        "Oxygen Cylinder",
        "Oxygen Concentrator",
        "Oxygen & Nitrogen Gas Plant",
        "Screw Air Compressor"
      ]
    },
    {
      "name": "Cooling Tower, Heat Exchanger, Parts",
      "items": [
        "Heat Exchangers",
        "Demister Pad",
        "Cooling Towers",
        "Heat Exchanger Parts",
        "Shell and Tube Heat Exchanger"
      ]
    },
    {
      "name": "Process Control Systems & Equipments",
      "items": [
        "Process Controllers",
        "Temperature Controller",
        "Level Controllers",
        "Water Level Controller",
        "Digital Temperature Controller"
      ]
    },
    {
      "name": "Chemical Plants & Machinery",
      "items": [
        "Industrial Distillation Plant",
        "Distillation Units",
        "Chemical Plant",
        "Diaphragm Pumps",
        "Chemical Pumps"
      ]
    },
    {
      "name": "Air Springs & Compression Springs",
      "items": [
        "Compression Springs",
        "Industrial Springs",
        "Metal Spring",
        "Coil Springs",
        "Extension Springs"
      ]
    },
    {
      "name": "Casting, Moulding & Forging Machines",
      "items": [
        "Molding Machines",
        "Injection Molding Machines",
        "Casting Machines",
        "Forging Machinery",
        "Die Casting Machines"
      ]
    },
    {
      "name": "Dryers & Evaporators",
      "items": [
        "Centrifugal Dryers",
        "Industrial Dryers",
        "Air Dryers",
        "Dryers",
        "Evaporator"
      ]
    },
    {
      "name": "Industrial Mixers & Homogenizers",
      "items": [
        "Industrial Mixers",
        "Powder Mixers",
        "Agitator",
        "Ribbon Blender",
        "Continuous Mixer"
      ]
    },
    {
      "name": "Hydraulic Jacks, Lifts & Winches",
      "items": [
        "Industrial Jacks",
        "Hydraulic Jacks",
        "Scissor Lifts",
        "Hydraulic Lifts",
        "Winches"
      ]
    },
    {
      "name": "Buffing, Surface Finishing Machines",
      "items": [
        "Blasting Machine",
        "Polishing Service",
        "Finishing Machine",
        "Polishing Machine",
        "Broaching Machine"
      ]
    },
    {
      "name": "Automotive Engine & Engine Parts",
      "items": [
        "Tractor Engine Parts",
        "Engine Components",
        "Truck Engine Parts",
        "Automotive Engine",
        "Car Engine"
      ]
    },
    {
      "name": "Garments & Textiles Job Work",
      "items": [
        "Stitching Services",
        "Embroidery Job Work",
        "Garment Stitching Service",
        "Ladies Clothes Stitching Services",
        "Tailors"
      ]
    },
    {
      "name": "CAD CAM Design & Consultancy",
      "items": [
        "CNC Machining Services",
        "CAD Service",
        "CAD CAM Services",
        "3D Modeling Services",
        "AutoCAD Designing"
      ]
    },
    {
      "name": "Industrial Racks & Storage System",
      "items": [
        "Warehouse Racks",
        "Industrial Storage Rack",
        "Slotted Angle Racks",
        "Pallet Racks",
        "Steel Racks"
      ]
    },
    {
      "name": "Aeronautical Instrument & Components",
      "items": [
        "Aerospace Equipment",
        "Aircraft Parts",
        "Aeronautical Instruments",
        "Aircraft",
        "Airport Equipment"
      ]
    },
    {
      "name": "Lubrication Systems and Equipment",
      "items": [
        "Lubricating Systems",
        "Grease Tools",
        "Grease Gun",
        "Lubrication Pumps",
        "Automatic Oil & Grease Lubricators"
      ]
    },
    {
      "name": "Steering Parts & Components",
      "items": [
        "Steering Parts",
        "Steering Linkage",
        "Steering Wheel",
        "Car Steering Wheel",
        "Steering Wheel Parts"
      ]
    },
    {
      "name": "Power Transmission Tools & Couplings",
      "items": [
        "Couplings",
        "Plastic Coupling",
        "Pipe Couplings",
        "Industrial Shafts",
        "Pulleys"
      ]
    },
    {
      "name": "Oil Mill & Oil Extraction Machinery",
      "items": [
        "Oil Extraction Machine",
        "Oil Production Plant",
        "Oil Expellers",
        "Mustard Oil Expeller",
        "Cold Press Oil Machine"
      ]
    },
    {
      "name": "Extraction Plants and Extruders",
      "items": [
        "Extraction Machinery",
        "Extruder Machine",
        "Hydro Machine",
        "Twin Screw Extruder",
        "Metal Refining Plant"
      ]
    }
  ],
  "Gems, Jewelry & Astrology": [
    {
      "name": "Costume & Fashion Jewelry",
      "items": [
        "Fancy Jewelry",
        "Fashion Accessories",
        "Fashion Jewelry",
        "Imitation Jewelry",
        "Platinum Jewelry"
      ]
    },
    {
      "name": "Precious Stones and Gemstones",
      "items": [
        "Gemstone",
        "Semi Precious Stones",
        "Black Stone",
        "Precious Stone",
        "Imitation Pearl"
      ]
    },
    {
      "name": "Glass, Gem Stone, Wood & Other Beads",
      "items": [
        "Beads",
        "Glass Beads",
        "Rudraksha Beads",
        "Silver Beads",
        "Pearl Beads"
      ]
    },
    {
      "name": "Bangles, Bracelets & Anklets",
      "items": [
        "Bangles",
        "Fashion Bangles",
        "Designer Bangles",
        "Bracelet",
        "Fancy Bracelet"
      ]
    },
    {
      "name": "Artificial, Stone and Metal Earrings",
      "items": [
        "Fashion Earrings",
        "Ladies Earring",
        "Earring Set",
        "Imitation Earring",
        "Artificial Earring"
      ]
    },
    {
      "name": "Precious Stones & Gemstone Jewelry",
      "items": [
        "Gemstone Jewelry",
        "Studded Jewellery",
        "Semi Precious Stone Jewelry",
        "Semi Precious Stone Ring",
        "Precious Ring & Semi Precious Ring"
      ]
    },
    {
      "name": "Artificial and Metal Necklaces",
      "items": [
        "Necklace",
        "Necklace Sets",
        "Gold Plated Necklace Set",
        "Fashion Necklace",
        "Pearl Necklace Set"
      ]
    },
    {
      "name": "Diamonds & Diamond Jewels",
      "items": [
        "Diamond Jewelry",
        "Diamond Studded Gold Jewelry",
        "Diamond Studded Jewelry",
        "Diamond",
        "Diamond Solitaire Ring"
      ]
    },
    {
      "name": "Silver Jewelry & Ornaments",
      "items": [
        "Silver Jewelry",
        "Silver",
        "Silver Plated Jewellery",
        "Silver Beaded Jewelry",
        "Silver Bracelets"
      ]
    },
    {
      "name": "Gold & Gold Jewellery",
      "items": [
        "Gold Jewelry",
        "Gold Necklace",
        "Gold Earrings",
        "Gold Bangles",
        "Gold Necklace Set"
      ]
    },
    {
      "name": "Astrology and Numerology Services",
      "items": [
        "Astrology Services",
        "Vastu Consultancy",
        "Horoscope Prediction Services",
        "Vedic Astrology",
        "Vastu Shastra"
      ]
    },
    {
      "name": "Jewellery Making Tools & Machines",
      "items": [
        "Jewellery Making Tools",
        "Jewelry Making Machines",
        "Jewellery Weighing Machine",
        "Chain Hammering Machine",
        "Diamond Tools"
      ]
    }
  ],
  "Computer & IT Solutions": [
    {
      "name": "Computer Software & Mobile Apps",
      "items": [
        "Air Ticket Booking",
        "Mobile Recharge Services",
        "Application Software Packages",
        "Accounting & Billing Software",
        "Web Application Software"
      ]
    },
    {
      "name": "Router, Cables & Networking Devices",
      "items": [
        "Networking Devices and Equipment",
        "Network Router",
        "WiFi Router",
        "Coaxial Cables",
        "Network Switch"
      ]
    },
    {
      "name": "Software Development & IT Consultant",
      "items": [
        "Software Development Services",
        "Customized Software Solution",
        "Software Consulting Service",
        "Computer Software Designing Services",
        "ERP Solutions"
      ]
    },
    {
      "name": "Laptops, PC, Mainframes & Computers",
      "items": [
        "Computer Systems",
        "Laptops",
        "Desktop Computer",
        "Dell Laptops",
        "Personal Computers"
      ]
    },
    {
      "name": "Graphic Design & Animation Services",
      "items": [
        "Graphic Design Services",
        "Designing Services",
        "Brochure Designing Service",
        "Creative Designing Services",
        "Design Services"
      ]
    },
    {
      "name": "Data Entry & Data Processing Service",
      "items": [
        "Database Management",
        "Data Digitization",
        "Data Processing",
        "Online Form Filling Services",
        "Data Entry Work"
      ]
    },
    {
      "name": "Computer & Mobile Apps Development",
      "items": [
        "Mobile Application Development",
        "Customized Software Solution",
        "Application Development Service",
        "Android Application Development Services",
        "Application Software Packages"
      ]
    },
    {
      "name": "CAD CAM Design & Consultancy",
      "items": [
        "CNC Machining Services",
        "CAD Service",
        "CAD CAM Services",
        "3D Modeling Services",
        "AutoCAD Designing"
      ]
    },
    {
      "name": "Computer Hardware & Peripherals",
      "items": [
        "Computer Parts",
        "Computer Accessories",
        "Computer Input Devices",
        "Computer Mouse",
        "Computer Keyboard"
      ]
    },
    {
      "name": "Office Automation Products & Devices",
      "items": [
        "Multifunction Printer",
        "Xerox Machines",
        "Printers for Home",
        "Projector",
        "Laser Printer"
      ]
    },
    {
      "name": "Electrical & Electronic Connectors",
      "items": [
        "Electronic Connectors",
        "Fiber Optic Connectors",
        "Audio & Video Connectors",
        "Cable Connectors",
        "Cable Lugs"
      ]
    },
    {
      "name": "Diodes & Electronic Active Devices",
      "items": [
        "Rectifiers",
        "Light Emitting Diode",
        "Integrated Circuits",
        "Semiconductor Device",
        "Transistors"
      ]
    },
    {
      "name": "Computer and Networking Solutions",
      "items": [
        "Networking Solutions",
        "Internet Solutions",
        "Broadband Internet Solutions",
        "Wireless Internet Service Provider",
        "IT Infrastructure Solution"
      ]
    },
    {
      "name": "Web Development & Marketing Services",
      "items": [
        "Website Development Services",
        "Website Designing Services",
        "Web Service",
        "Ecommerce Solutions",
        "E Commerce Website Design"
      ]
    },
    {
      "name": "Computer Hard Disk, RAM & Pen Drives",
      "items": [
        "Hard Disk Drive",
        "Solid State Drives",
        "Internal Hard Drive",
        "Pen Drive",
        "External Hard Drive"
      ]
    },
    {
      "name": "Computer Hardware & Network Support",
      "items": [
        "Computer Repairing Services",
        "Computer Repair & Maintenance Services",
        "Laptop Repairing Services",
        "Printer Repairing Services",
        "Computer Hardware Services"
      ]
    },
    {
      "name": "Computer, IT & Software Training",
      "items": [
        "Computer Education",
        "Computer Language Training Services",
        "Computer Training",
        "Java Training Services",
        "Software Training"
      ]
    },
    {
      "name": "Computer PCI Cards, Cables & Modules",
      "items": [
        "Motherboard",
        "Computer Cables",
        "USB Gadgets",
        "Computer Motherboard",
        "AV Cable"
      ]
    },
    {
      "name": "Computer Stationery Products",
      "items": [
        "Laptop Accessories and Parts",
        "USB Gadgets",
        "Mouse Pads",
        "Monitor Accessories",
        "Computer Stationery"
      ]
    },
    {
      "name": "Online Education & Coaching Services",
      "items": [
        "Online Education Consultancy Services",
        "E-Learning Solution",
        "Web Designing Course",
        "Entrance Coaching Institutes",
        "Digital Classroom Solution"
      ]
    },
    {
      "name": "Tele Conferencing & VoIP Services",
      "items": [
        "Communication Service",
        "DTH Recharge Services",
        "Video Conferencing Services",
        "Fax Services",
        "Radio Broadcasting Station"
      ]
    }
  ],
  "Fashion Accessories & Gear": [
    {
      "name": "Men, Women & Kids Footwear",
      "items": [
        "Women Footwear",
        "Shoes",
        "Sports Shoes",
        "Flat Slipper",
        "Rubber Footwear"
      ]
    },
    {
      "name": "Cufflink, Buttons, Zippers & Buckles",
      "items": [
        "Garment Accessories",
        "Buttons",
        "Designer Cufflink",
        "Dress Studs",
        "Buckles"
      ]
    },
    {
      "name": "Motifs, Badges, Emblems & Lanyards",
      "items": [
        "Badges",
        "Lanyards",
        "Ribbons",
        "Logo Patches",
        "Hand Embroidered Motifs"
      ]
    },
    {
      "name": "Footwear Laces, Insole & Accessories",
      "items": [
        "Shoe Cream",
        "Shoe Care Products",
        "Footwear Accessories",
        "Shoe Polish",
        "Leather Polishes"
      ]
    },
    {
      "name": "Scarves, Shawls, Stoles, Bandanas",
      "items": [
        "Shawl",
        "Scarf",
        "Stoles",
        "Silk Shawls",
        "Fancy Stoles"
      ]
    },
    {
      "name": "Eyewear, Sunglasses & Accessories",
      "items": [
        "Leather Eyeglass Case",
        "Eyewear",
        "Spectacle Cases and Pouches",
        "Sun Glasses",
        "Safety Goggles"
      ]
    },
    {
      "name": "Hats, Caps and Headwears",
      "items": [
        "Men Cap",
        "Caps",
        "Fashion Caps",
        "Cotton Caps",
        "Winter Cap"
      ]
    },
    {
      "name": "Disposable & Other Optical Lenses",
      "items": [
        "Lenses",
        "Optical Glass Lens",
        "Contact Lenses",
        "Disposable Contact Lens",
        "Colored Contact Lenses"
      ]
    },
    {
      "name": "Neckties, Bow Ties & Tie Accessories",
      "items": [
        "Ties",
        "Men Tie",
        "Bow Ties",
        "Designer Necktie",
        "Necktie"
      ]
    },
    {
      "name": "Costume & Fashion Jewelry",
      "items": [
        "Fancy Jewelry",
        "Fashion Accessories",
        "Fashion Jewelry",
        "Imitation Jewelry",
        "Platinum Jewelry"
      ]
    },
    {
      "name": "Fashion & Leather Belts",
      "items": [
        "Belts",
        "Leather Belt",
        "Men Leather Belt",
        "Fashion Belts",
        "Men Belt"
      ]
    }
  ],
  "Herbal & Ayurvedic Product": [
    {
      "name": "Ayurvedic,Herbal Products & Medicine",
      "items": [
        "Ayurvedic Medicine",
        "Natural Honey",
        "Honey & Sweeteners",
        "Ayurvedic Herbal Syrups & Tonics",
        "Ayurvedic Digestive Medicine"
      ]
    },
    {
      "name": "Ayurvedic & Herbal Extracts",
      "items": [
        "Herbal Powder",
        "Herbal Extracts",
        "Green Tea Extract",
        "Black Tea Extract",
        "Moringa Leaves Powder"
      ]
    },
    {
      "name": "Ayurvedic & Medicinal Herbs",
      "items": [
        "Herbs,Sticks and Roots",
        "Ginger Root",
        "Medicinal Roots",
        "Medicinal Plant",
        "Herb Leaves"
      ]
    },
    {
      "name": "Ayurvedic & Herbal Health Supplement",
      "items": [
        "Herbal Juice",
        "Aloe Vera Juice",
        "Herbal Supplements",
        "Amla Juice",
        "Noni Juice"
      ]
    },
    {
      "name": "Essential  & Aromatic Oils",
      "items": [
        "Essential Oils",
        "Carrier Oil",
        "Jojoba Oil",
        "Linseed Oil",
        "Herb Oil"
      ]
    },
    {
      "name": "Ayurvedic, Herbal Oils and Cosmetics",
      "items": [
        "Herbal Skin Care Cosmetics",
        "Herbal Soaps",
        "Herbal Hair Oil",
        "Herbal Shampoo",
        "Herbal Cosmetics"
      ]
    },
    {
      "name": "Natural & Herbal Henna",
      "items": [
        "Henna Powder",
        "Henna Mehandi",
        "Mehandi Cone",
        "Henna",
        "Black Henna Powder"
      ]
    }
  ],
  "Security, Safety System & Service": [
    {
      "name": "Door Lock, Electronic Lock & Latches",
      "items": [
        "Door Lock",
        "Safety Padlocks",
        "Security Lock",
        "Padlock",
        "Anti Theft Lock"
      ]
    },
    {
      "name": "Fire Fighting & Prevention Products",
      "items": [
        "Fire Fighting Equipments",
        "Fire Extinguishers",
        "Fire Alarm Systems",
        "Fire Alarms",
        "Dry Powder Fire Extinguisher"
      ]
    },
    {
      "name": "Road Barriers & Safety",
      "items": [
        "Road Safety Products",
        "Road Barriers",
        "Traffic Cones",
        "Road Signs",
        "Traffic Safety Equipment"
      ]
    },
    {
      "name": "Safety Equipment & Systems",
      "items": [
        "Safety Equipment",
        "Safety Goggles",
        "PPE Kits",
        "Safety Net",
        "Industrial Safety Equipments"
      ]
    },
    {
      "name": "Security Alarms, Detectors & Devices",
      "items": [
        "Electronic Siren",
        "Video Door Phone",
        "Security Alarm Systems",
        "Burglar Alarm Systems",
        "Door Phone"
      ]
    },
    {
      "name": "Intelligence and Spying Devices",
      "items": [
        "Spy Camera",
        "Robotic Systems",
        "Personal Tracker",
        "Robot Machine",
        "Drones"
      ]
    },
    {
      "name": "Residential & Commercial Security",
      "items": [
        "Security Service",
        "Security Guards",
        "Commercial Security Service",
        "Residence Security Services",
        "Personal Security Guard Services"
      ]
    },
    {
      "name": "Military Clothing & Tactical Gears",
      "items": [
        "Men Cargo Pant",
        "Military Uniform Accessories",
        "Army Uniform",
        "Survival Kit",
        "Police Uniforms"
      ]
    },
    {
      "name": "Security & Inspection Devices",
      "items": [
        "Anti Theft Device",
        "Car Parking System",
        "Vehicle Security System",
        "Firewall Appliances",
        "Computer Security Device"
      ]
    },
    {
      "name": "Metal, Security & Safety Detectors",
      "items": [
        "Metal Detector",
        "Hand-held Metal Detector",
        "Door Frame Metal Detector",
        "Security Metal Baggage & Vehicle Scanner",
        "Fake Note Detector Machine"
      ]
    },
    {
      "name": "Smoke & Gas Leak Detectors",
      "items": [
        "Smoke Detector",
        "Gas Leak Detector",
        "Gas Detector",
        "Gas Sensors",
        "Wireless Smoke Detector"
      ]
    },
    {
      "name": "Electronic Safes & Security Systems",
      "items": [
        "Storage Lockers",
        "Security Safes",
        "Safety Locker",
        "Safe Deposit Locker",
        "Industrial Locker"
      ]
    },
    {
      "name": "CCTV, Surveillance Systems and Parts",
      "items": [
        "CCTV Camera",
        "Electric Cable",
        "Dome Camera",
        "CCTV Installation Services",
        "Bullet Camera"
      ]
    },
    {
      "name": "Biometrics & Access Control Devices",
      "items": [
        "Magnetic Card Readers",
        "Access Control Systems",
        "Access Control Reader",
        "Card Readers",
        "Time Attendance Systems"
      ]
    },
    {
      "name": "Gate, Grilles, Fences & Railings",
      "items": [
        "Cement Grill",
        "Grills",
        "Metal Gate",
        "Gates",
        "Metal Grill"
      ]
    }
  ],
  "Sports Goods, Toys & Games": [
    {
      "name": "Sports Wear & Athletic Accessories",
      "items": [
        "Sports Apparel",
        "Tracksuits",
        "Ladies Tights",
        "Sports Pant",
        "Track Pant"
      ]
    },
    {
      "name": "Team Sports Goods & Supplies",
      "items": [
        "Pitch Roller",
        "Cricket Bat",
        "Cricket Training & Ground Equipment",
        "Wooden Cricket Bat",
        "Cricket Ball"
      ]
    },
    {
      "name": "Kids Play & Educational Toys",
      "items": [
        "Kids Toys",
        "Baby Toys",
        "Plastic Toy",
        "Toys Accessories",
        "Learning and Educational Toy"
      ]
    },
    {
      "name": "Exercise Bikes & Fitness Equipments",
      "items": [
        "Gym Equipment",
        "Cardio Machines",
        "Fitness Equipment",
        "Exercise Treadmill",
        "Exercise Bike"
      ]
    },
    {
      "name": "Amusement Park Games & Equipment",
      "items": [
        "Outdoor Playground Equipment",
        "Outdoor Game",
        "Playground Slide",
        "Indoor Playground",
        "Multi Play Station"
      ]
    },
    {
      "name": "Swimming Pool & Water Sport Goods",
      "items": [
        "Bleaching Powder",
        "Sodium Hypochlorite",
        "Swimming Pool Accessories",
        "Swimming Pool Chemicals",
        "Swimming Pools"
      ]
    },
    {
      "name": "Dumbbell, Weight Plate & Accessories",
      "items": [
        "Gym Accessories",
        "Fitness and Exercise Accessories",
        "Yoga Accessories",
        "Yoga Mat",
        "Dumbbells"
      ]
    },
    {
      "name": "Puzzles, Board & Educational Games",
      "items": [
        "Board Game & Accessories",
        "Wooden Puzzle",
        "Dummy Currency Notes",
        "Puzzle",
        "Carrom Equipment"
      ]
    },
    {
      "name": "Sports Shoes, Footwear & Accessories",
      "items": [
        "Sports Shoes",
        "Men Sport Shoes",
        "Basketball Shoes",
        "Tennis Shoes",
        "Gym Shoes"
      ]
    },
    {
      "name": "Soft Toy, Action Figures & Dolls",
      "items": [
        "Baby Dolls",
        "Doll",
        "Soft Toy",
        "Teddy Bears",
        "Wooden Doll"
      ]
    },
    {
      "name": "Kids Ride on and Remote Control Cars",
      "items": [
        "Toy Car",
        "Children Tricycle",
        "Toy Vehicles",
        "Toy Scooter",
        "Free Wheel Toy"
      ]
    },
    {
      "name": "Camping, Fishing & Hunting Goods",
      "items": [
        "Fishing Nets",
        "Fishing Equipment & Accessories",
        "Camping Tents",
        "Nylon Fishing Nets",
        "Fishing Rods"
      ]
    },
    {
      "name": "Video Games, Consoles & VR Headsets",
      "items": [
        "PC Gaming & Accessories",
        "Video Games",
        "Video Game Console",
        "TV Video Game Console",
        "Video Game Controller"
      ]
    },
    {
      "name": "Table Sports & Gaming Accessories",
      "items": [
        "Board Game & Accessories",
        "Carrom Equipment",
        "Carrom Board",
        "Table Tennis Equipment & Accessories",
        "Billiard Table"
      ]
    },
    {
      "name": "Adventure Sporting & Trekking Goods",
      "items": [
        "Skates Equipment",
        "Trekking Bag",
        "Skate Shoes",
        "Trekking Equipments",
        "Roller Skates"
      ]
    },
    {
      "name": "Sports Training Aids & Equipments",
      "items": [
        "Sport Goods",
        "Sports Accessories",
        "Sports Equipment",
        "Sports Water Bottle",
        "Sports Nets"
      ]
    },
    {
      "name": "Boxing and Martial Arts Goods",
      "items": [
        "Knee Pads",
        "Boxing Equipment & Accessories",
        "Head Guards",
        "Martial Arts Guards Gloves & Gear",
        "Boxing Glove"
      ]
    },
    {
      "name": "Racquet Sporting Goods & Supplies",
      "items": [
        "Badminton Equipment",
        "Badminton Rackets",
        "Tennis Accessories",
        "Badminton Shuttlecock",
        "Tennis Balls"
      ]
    },
    {
      "name": "Track & Field Equipment",
      "items": [
        "Athletics Equipment",
        "Field Accessories",
        "Marker Cone",
        "Shot Puts",
        "Track Hurdles"
      ]
    },
    {
      "name": "Target Sports Goods & Supplies",
      "items": [
        "Golf Equipment & Accessories",
        "Darts Game",
        "Golf Head Cover",
        "Golf Accessories",
        "Dart Board"
      ]
    },
    {
      "name": "Gymnastics & Aerobics",
      "items": [
        "Gymnastics Equipment",
        "Kite and Accessories",
        "Kites",
        "Kite String",
        "Paper Kite"
      ]
    },
    {
      "name": "Snow Sports Goods & Gears",
      "items": [
        "Ski Wear",
        "Snowboarding Equipment",
        "Ski Jackets",
        "Ice Hockey Sticks",
        "Ice Hockey Equipment"
      ]
    },
    {
      "name": "Sports Bags, Duffel Bags & Kit Bags",
      "items": [
        "Sports Bags",
        "Duffle Bag",
        "Gym Bags",
        "Casual Duffle Bag",
        "Leather Duffle Bag"
      ]
    }
  ],
  "Telecom Equipment & Goods": [
    {
      "name": "Audio Mixer, Recorder & Transmitter",
      "items": [
        "Loudspeaker",
        "Microphone Stands",
        "Voice Recording Device",
        "Microphones",
        "Voice Recorder"
      ]
    },
    {
      "name": "Telecommunication Equipment & Parts",
      "items": [
        "Fiber Optic Cable",
        "Communication Systems and Equipment",
        "Voice Recorder",
        "LAN Cable",
        "Telecommunications Equipment"
      ]
    },
    {
      "name": "Electrical & Electronic Connectors",
      "items": [
        "Electronic Connectors",
        "Fiber Optic Connectors",
        "Audio & Video Connectors",
        "Cable Connectors",
        "Cable Lugs"
      ]
    },
    {
      "name": "Antennas, Wifi & Communication Tower",
      "items": [
        "Transmission Line Tower",
        "Antenna",
        "Communication Towers",
        "Transmission Towers",
        "Dish Antenna"
      ]
    },
    {
      "name": "Router, Cables & Networking Devices",
      "items": [
        "Networking Devices and Equipment",
        "Network Router",
        "WiFi Router",
        "Coaxial Cables",
        "Network Switch"
      ]
    },
    {
      "name": "Telecom Services, Engg & Maintenance",
      "items": [
        "Mobile Recharge Services",
        "Online Payment Solution",
        "Electricity Bill Payment Service",
        "Telecom Engineering Services",
        "Utility Bill Payments"
      ]
    }
  ],
  "Paper & Paper Products": [
    {
      "name": "Paper & Paper Made Products",
      "items": [
        "Printing Paper",
        "Raw Paper Material",
        "A4 Size Paper",
        "Kraft Paper",
        "Printed Paper Sheets"
      ]
    },
    {
      "name": "Paper Bags, Gifts & Paper Products",
      "items": [
        "Paperboard",
        "Paper Bags",
        "Paper Box",
        "Paper Carry Bags",
        "Paper Card"
      ]
    },
    {
      "name": "Printing & Binding Services",
      "items": [
        "Stationery & Book Printing",
        "Advertising Printing Service",
        "Digital Printing Service",
        "Printing Services",
        "Corporate Printing"
      ]
    },
    {
      "name": "Office Stationery & Calculator",
      "items": [
        "Desk Accessories",
        "Office Stationery",
        "Attendance Register",
        "Staplers",
        "Scissors"
      ]
    },
    {
      "name": "Barcode, Stickers & Luggage Tags",
      "items": [
        "Stickers",
        "Textile Labels, Sticker and Tags",
        "Tags",
        "Printed Stickers",
        "Barcode"
      ]
    },
    {
      "name": "Greeting & Invitation Cards",
      "items": [
        "Correspondence Cards",
        "Greeting Cards",
        "Business Cards",
        "Visiting Cards",
        "Wedding Cards"
      ]
    }
  ],
  "Bags, Belts & Wallets": [
    {
      "name": "Carry Bags and Multiutility Bags & Pouches",
      "items": [
        "School Bags",
        "Shopping Bags",
        "Bags",
        "Non Woven Bag",
        "Kids School Bag"
      ]
    },
    {
      "name": "Fashion & Designer Bags",
      "items": [
        "Ladies Bags",
        "Handbags",
        "Ladies Hand Bags",
        "Designer Bag",
        "Ladies Fashion Bags"
      ]
    },
    {
      "name": "Cotton, Jute & Canvas Bags",
      "items": [
        "Jute Bags",
        "Cotton Bags",
        "Jute Carry Bag",
        "Fancy Jute Bag",
        "Fabric Bag"
      ]
    },
    {
      "name": "Travel Bags & Backpacks",
      "items": [
        "Leather Suitcase",
        "Travel Bags",
        "Luggage Bags",
        "Suitcase",
        "Backpacks"
      ]
    },
    {
      "name": "Leather Bags & Handbags",
      "items": [
        "Leather Bags",
        "Leather Satchel",
        "Leather Eyeglass Case",
        "Digital Camera Leather Case",
        "Leather Cases"
      ]
    },
    {
      "name": "Wallets & Purses",
      "items": [
        "Wallet",
        "Purse",
        "Ladies Purse",
        "Leather Wallet",
        "Men Leather Wallet"
      ]
    },
    {
      "name": "Fashion & Leather Belts",
      "items": [
        "Belts",
        "Leather Belt",
        "Men Leather Belt",
        "Fashion Belts",
        "Men Belt"
      ]
    },
    {
      "name": "Briefcase, Portfolio & Laptop Bags",
      "items": [
        "Leather Briefcase",
        "Laptop Bag",
        "Briefcases",
        "Business Bags",
        "Office Bags"
      ]
    },
    {
      "name": "Sports Bags, Duffel Bags & Kit Bags",
      "items": [
        "Sports Bags",
        "Duffle Bag",
        "Gym Bags",
        "Casual Duffle Bag",
        "Leather Duffle Bag"
      ]
    },
    {
      "name": "Child and Baby Care Products",
      "items": [
        "Diapering Products",
        "Diaper",
        "Baby Care Products",
        "Baby Diapers",
        "Adult Diapers"
      ]
    },
    {
      "name": "Packaging, Laminated & Zip Bags",
      "items": [
        "Plastic Bags",
        "Non Woven Bag",
        "Polythene Bags",
        "Plastic Carry Bag",
        "Packing Bag"
      ]
    }
  ],
  "Marble, Granite & Stones": [
    {
      "name": "Granite, Marble, Sandstone & Others",
      "items": [
        "Marble",
        "Granite Stone",
        "Granite",
        "Travertine",
        "Limestone"
      ]
    },
    {
      "name": "Marble & Stone Artifacts",
      "items": [
        "Sandstone Article",
        "Stone Crafts",
        "Granite Monuments",
        "Stone Artifacts",
        "Marble Handicrafts"
      ]
    },
    {
      "name": "Cobbles, Pebbles & Pavings",
      "items": [
        "Pebble Stone",
        "Pebbles",
        "Paver",
        "Paver Blocks",
        "KERB Stones"
      ]
    },
    {
      "name": "Stone Tiles & Floorings",
      "items": [
        "Stone Tiles",
        "Mosaic Sandstone Tiles",
        "Natural Stone Tiles",
        "Marble Tiles",
        "Marble Floor Tiles"
      ]
    },
    {
      "name": "Statues & Sculptures",
      "items": [
        "Animal Statues",
        "Metal Statue",
        "Marble Statue",
        "Wood Statue",
        "Decorative Statue"
      ]
    }
  ],
  "Event Planner & Organizer": [
    {
      "name": "Corporate Events & Party Organizers",
      "items": [
        "Wedding-Event Management Service",
        "Party Organizers",
        "Birthday Party Event Services",
        "Event Management Services",
        "Wedding Planners"
      ]
    },
    {
      "name": "Trade Show & Exhibition Equipment",
      "items": [
        "Roll Up Standee",
        "Banner Stand",
        "Exhibition Stalls",
        "Sun Boards",
        "Acrylic Boxes"
      ]
    },
    {
      "name": "Event Planners & Organizers",
      "items": [
        "Event Organizers",
        "Corporate Event Management",
        "Event Decoration",
        "Light Decoration Service",
        "Conference Organizers"
      ]
    },
    {
      "name": "Food & Catering Services",
      "items": [
        "Catering Services",
        "Restaurants Booking Services",
        "Meal Services",
        "Wedding Catering Services",
        "Party Catering Service"
      ]
    },
    {
      "name": "Photographers & Videographers",
      "items": [
        "Photography Services",
        "Wedding Photographers",
        "Video Services",
        "Videography Services",
        "Event Photography"
      ]
    }
  ],
  "IT & Telecom Services": [
    {
      "name": "IT, Networking & Automation Solution",
      "items": [
        "IT Solutions",
        "Database Management",
        "IT Consultancy",
        "Automation Solutions",
        "Industrial Automation Service"
      ]
    },
    {
      "name": "Computer and Networking Solutions",
      "items": [
        "Networking Solutions",
        "Internet Solutions",
        "Broadband Internet Solutions",
        "Wireless Internet Service Provider",
        "IT Infrastructure Solution"
      ]
    },
    {
      "name": "Web Development & Marketing Services",
      "items": [
        "Website Development Services",
        "Website Designing Services",
        "Web Service",
        "Ecommerce Solutions",
        "E Commerce Website Design"
      ]
    },
    {
      "name": "Computer Hardware & Network Support",
      "items": [
        "Computer Repairing Services",
        "Computer Repair & Maintenance Services",
        "Laptop Repairing Services",
        "Printer Repairing Services",
        "Computer Hardware Services"
      ]
    },
    {
      "name": "Telecom Services, Engg & Maintenance",
      "items": [
        "Mobile Recharge Services",
        "Online Payment Solution",
        "Electricity Bill Payment Service",
        "Telecom Engineering Services",
        "Utility Bill Payments"
      ]
    },
    {
      "name": "Tele Conferencing & VoIP Services",
      "items": [
        "Communication Service",
        "DTH Recharge Services",
        "Video Conferencing Services",
        "Fax Services",
        "Radio Broadcasting Station"
      ]
    },
    {
      "name": "Computer Hardware & Peripherals",
      "items": [
        "Computer Parts",
        "Computer Accessories",
        "Computer Input Devices",
        "Computer Mouse",
        "Computer Keyboard"
      ]
    },
    {
      "name": "Computer Software & Mobile Apps",
      "items": [
        "Air Ticket Booking",
        "Mobile Recharge Services",
        "Application Software Packages",
        "Accounting & Billing Software",
        "Web Application Software"
      ]
    },
    {
      "name": "Router, Cables & Networking Devices",
      "items": [
        "Networking Devices and Equipment",
        "Network Router",
        "WiFi Router",
        "Coaxial Cables",
        "Network Switch"
      ]
    },
    {
      "name": "Telecommunication Equipment & Parts",
      "items": [
        "Fiber Optic Cable",
        "Communication Systems and Equipment",
        "Voice Recorder",
        "LAN Cable",
        "Telecommunications Equipment"
      ]
    },
    {
      "name": "Laptops, PC, Mainframes & Computers",
      "items": [
        "Computer Systems",
        "Laptops",
        "Desktop Computer",
        "Dell Laptops",
        "Personal Computers"
      ]
    },
    {
      "name": "Graphic Design & Animation Services",
      "items": [
        "Graphic Design Services",
        "Designing Services",
        "Brochure Designing Service",
        "Creative Designing Services",
        "Design Services"
      ]
    },
    {
      "name": "Computer Hard Disk, RAM & Pen Drives",
      "items": [
        "Hard Disk Drive",
        "Solid State Drives",
        "Internal Hard Drive",
        "Pen Drive",
        "External Hard Drive"
      ]
    },
    {
      "name": "Computer Stationery Products",
      "items": [
        "Laptop Accessories and Parts",
        "USB Gadgets",
        "Mouse Pads",
        "Monitor Accessories",
        "Computer Stationery"
      ]
    }
  ],
  "Product Rental & Leasing": [
    {
      "name": "Electrical & Electronic Goods Repair",
      "items": [
        "Home Appliances Repair & Maintenance",
        "Mobile Phone Repair Service",
        "Electronic Appliance Repair Service",
        "Air Conditioner Repair Services",
        "Industrial Appliances Repair & Maintenance"
      ]
    },
    {
      "name": "Repair & Maintenance Services",
      "items": [
        "Machinery Repairs",
        "Annual Maintenance Contract Services",
        "Plant Maintenance Services",
        "Industrial Repairing Service",
        "Maintenance Contractors"
      ]
    },
    {
      "name": "Construction Equipment Rentals",
      "items": [
        "Construction Equipment Rental Service",
        "Earthmoving Equipment Rental",
        "Crane Rental",
        "Excavator Rental",
        "JCB Excavator Rental"
      ]
    },
    {
      "name": "Automobile Repairing and Maintenance",
      "items": [
        "Four Wheeler Repair and Maintenance Services",
        "Automobile Repair Services",
        "Car Repair Services",
        "Bike Body Repair Services",
        "Car Washing Services"
      ]
    },
    {
      "name": "Electrical & Electronic Goods Rental",
      "items": [
        "Machine Rental",
        "Electronic Equipment Rental",
        "Sound Systems Rental",
        "Electrical Equipment Rental",
        "Generator Rental Services"
      ]
    },
    {
      "name": "Testing & Measuring Equipments",
      "items": [
        "Testing Equipment",
        "Water Testing Equipment",
        "Compression Testing Machine",
        "PH Meter",
        "Civil Engineering Test Equipment"
      ]
    },
    {
      "name": "Machines & Equipments",
      "items": [
        "Industrial Machinery",
        "Oil Filters",
        "Laundry Washing Machine",
        "Oil Filter Machine",
        "SPM Machine"
      ]
    },
    {
      "name": "Building & Construction Machines",
      "items": [
        "Construction Machines",
        "Construction Equipment",
        "Concrete Mixers",
        "Construction Machinery Spare Parts",
        "Crushing Machines & Plants"
      ]
    },
    {
      "name": "Cranes, Forklift & Lifting Machines",
      "items": [
        "Crane",
        "Pulleys",
        "Crane Spare Parts",
        "Hoist",
        "Electric Forklift"
      ]
    },
    {
      "name": "Printing Machinery & Equipment",
      "items": [
        "Printing Machine",
        "Printing Machinery Spares",
        "Printing Squeegee",
        "Offset Printing Machines",
        "Printing Rollers"
      ]
    },
    {
      "name": "Pollution Control Devices & Machines",
      "items": [
        "Air Pollution Control Equipment",
        "Air Filters",
        "Dust Collector",
        "Air Purifier",
        "Hydrocyclone Sand Separator"
      ]
    },
    {
      "name": "Water Treatment & Purification Plant",
      "items": [
        "Reverse Osmosis Plants",
        "RO Machines",
        "Filter Media",
        "Industrial Reverse Osmosis Plant",
        "Water Treatment Plants"
      ]
    },
    {
      "name": "Automotive Repair Tools & Equipments",
      "items": [
        "Car Wash Accessories",
        "Tyre & Wheel Equipment",
        "Car Care Accessories",
        "3D Wheel Alignment Machine",
        "Car Duster"
      ]
    },
    {
      "name": "Generators, Turbines & Power Plants",
      "items": [
        "Generator",
        "Electric Power Generator",
        "Industrial Engines",
        "Diesel Engine Generator Set",
        "Diesel Generator"
      ]
    },
    {
      "name": "Drilling & Boring Equipment",
      "items": [
        "Electric Drill",
        "Boring Machine",
        "Bench Heavy Duty Drill",
        "Drilling Equipment",
        "Drill Bits"
      ]
    },
    {
      "name": "Commercial Vehicles & Three Wheelers",
      "items": [
        "Intermediate and Light Commercial Vehicles",
        "Motor Vehicles",
        "Medium & Heavy Commercial Vehicles",
        "Trucks",
        "Fire Fighting Vehicles"
      ]
    },
    {
      "name": "Diagnostic Medical Imaging Equipment",
      "items": [
        "Electrodiagnostic Instruments",
        "Medical Imaging Machine & Accessories",
        "ECG Machine",
        "Diagnostic Imaging Accessories",
        "X Ray Centres"
      ]
    },
    {
      "name": "Excavator and Earth Moving Machinery",
      "items": [
        "Earthmoving Machinery",
        "Earth Movers",
        "Earthmoving Machinery Parts",
        "Earthmoving Equipment Rental",
        "JCB Spare Part"
      ]
    },
    {
      "name": "Orthopedic Equipment & Supplies",
      "items": [
        "Orthotic Devices",
        "Orthopedic Instruments",
        "Orthopedic Surgical Instruments",
        "Orthopedic Implants",
        "Knee Braces"
      ]
    },
    {
      "name": "Oxygen & Nitrogen Gas Plants",
      "items": [
        "Air Compressor",
        "Oxygen Cylinder",
        "Oxygen Concentrator",
        "Oxygen & Nitrogen Gas Plant",
        "Screw Air Compressor"
      ]
    },
    {
      "name": "Musical Equipment & Accessories",
      "items": [
        "Music Instruments",
        "Percussion Instruments",
        "Wind Instruments",
        "Indian Musical Instruments",
        "Brass Musical Instruments"
      ]
    },
    {
      "name": "Scaffolding Pipes and Fittings",
      "items": [
        "Scaffolding Accessories",
        "Scaffoldings",
        "Scaffolding Planks & Plates",
        "Base Plates",
        "Scaffolding Props & Spans"
      ]
    },
    {
      "name": "Scientific Instruments & Devices",
      "items": [
        "Scientific Instruments",
        "Voltmeter",
        "Laboratory Instruments",
        "Calipers",
        "Ammeter"
      ]
    },
    {
      "name": "Commercial Vehicle Spare Parts",
      "items": [
        "Truck Tyres",
        "Truck Parts",
        "Truck Brake Parts",
        "TATA Truck Spare Parts",
        "Truck Body Part"
      ]
    },
    {
      "name": "Hydraulic Jacks, Lifts & Winches",
      "items": [
        "Industrial Jacks",
        "Hydraulic Jacks",
        "Scissor Lifts",
        "Hydraulic Lifts",
        "Winches"
      ]
    },
    {
      "name": "Pharmaceutical Machinery & Equipment",
      "items": [
        "Pharmaceutical Machines",
        "Pharmaceutical Processing Equipment",
        "Vibro Sifter",
        "Tablet Making Machines",
        "Double Cone Blender"
      ]
    },
    {
      "name": "Cleanroom Equipment & Supplies",
      "items": [
        "Clean Room Equipment",
        "Clean Room Fittings and Furniture",
        "Laminar Air Flow",
        "Biosafety Cabinets",
        "Pass Box"
      ]
    },
    {
      "name": "Gymnastics & Aerobics",
      "items": [
        "Gymnastics Equipment",
        "Kite and Accessories",
        "Kites",
        "Kite String",
        "Paper Kite"
      ]
    }
  ],
  "Transportation & Logistics": [
    {
      "name": "Forwarding & Custom Clearing",
      "items": [
        "Clearing & Forwarding Services",
        "Freight Forwarding Services",
        "Cargo Transportation Services",
        "Air Cargo Service",
        "International Courier Services"
      ]
    },
    {
      "name": "Transport Agents & Bulk Carriers",
      "items": [
        "Transportation Services",
        "Goods Transport Services",
        "Full Truck Load Transport Service",
        "Courier Service",
        "Parcel Delivery Services"
      ]
    },
    {
      "name": "Warehouses and Warehousing Agents",
      "items": [
        "Warehousing Services",
        "Cold Storage Services",
        "Cold Storage Rooms",
        "Goods Warehousing Service",
        "Procurement Services"
      ]
    },
    {
      "name": "Packers & Movers",
      "items": [
        "Domestic Relocation Service",
        "Car Transportation",
        "Packers and Movers",
        "Household Goods Moving Services",
        "Loading Unloading Services"
      ]
    }
  ],
  "Business & Audit Services": [
    {
      "name": "Business Planning and Management",
      "items": [
        "Business Consultant",
        "Business Solution",
        "Management Consultancy",
        "Management Service",
        "Business Management Consultancy"
      ]
    },
    {
      "name": "Turnkey Consultants & Solutions",
      "items": [
        "Project Consultants",
        "Project Management",
        "Turnkey Solutions",
        "Turnkey Projects",
        "Market Research Service"
      ]
    },
    {
      "name": "ISO & Quality Management Consultants",
      "items": [
        "Certification Services",
        "ISO Certification Consultancy",
        "ISO Certification Services",
        "Quality Assurance Service",
        "ISO 9001"
      ]
    },
    {
      "name": "Environment Protection & Auditing",
      "items": [
        "Energy Management Service",
        "Environmental Consultants",
        "Energy Conservation",
        "EHS Audit",
        "Environment Protection Services"
      ]
    },
    {
      "name": "Marketing Services & Consultants",
      "items": [
        "Marketing Services",
        "Sales Support Services",
        "After Sales Service",
        "Sales Consultancy",
        "Lead Generation Service"
      ]
    },
    {
      "name": "Copyright & Trademark",
      "items": [
        "Patent Registration Services",
        "Company Registration",
        "Digital Signature Services",
        "Trademarks Services",
        "Trademark Registration"
      ]
    },
    {
      "name": "EXIM Trade & Licensing Services",
      "items": [
        "Trade Consultation Service",
        "Licensing Services",
        "Export Consultants",
        "Export Import Code Number Services",
        "FSSAI Registration Service"
      ]
    },
    {
      "name": "Market Research Advisors & Agencies",
      "items": [
        "Market Research Service",
        "Research Development Services",
        "Survey Report Services",
        "Customized Project Reports",
        "Consumer Service"
      ]
    },
    {
      "name": "Internet Marketing & Promotion",
      "items": [
        "Digital Marketing Services",
        "SEO Services",
        "Social Media Marketing",
        "Google Adwords",
        "Email Marketing"
      ]
    },
    {
      "name": "Internal Audit & Management Audit",
      "items": [
        "Internal Auditing",
        "Internal Management Audit",
        "Audit Assurance Services",
        "Management Auditing",
        "Financial Auditing Service"
      ]
    },
    {
      "name": "Graphic Design & Animation Services",
      "items": [
        "Graphic Design Services",
        "Designing Services",
        "Brochure Designing Service",
        "Creative Designing Services",
        "Design Services"
      ]
    }
  ],
  "Financial & Legal Services": [
    {
      "name": "Corporate Finance & Leasing Advisors",
      "items": [
        "Financial Service",
        "Finance Consultant",
        "Financial Engineering Services",
        "Financial Planning",
        "Investment Service"
      ]
    },
    {
      "name": "Insurance Agents and Services",
      "items": [
        "Insurance Service",
        "Life Insurance",
        "General Insurance",
        "Health Insurance",
        "Car Insurance Services"
      ]
    },
    {
      "name": "Business Auditing & Valuation",
      "items": [
        "Auditing Services",
        "Money Transfer Services",
        "Foreign Exchange",
        "Statutory Auditing Services",
        "Online Money Transfer Services"
      ]
    },
    {
      "name": "Tax Planners, Agents & Consultants",
      "items": [
        "Tax Consultancy Service",
        "GST & PAN Registrations",
        "Taxation Service",
        "PAN Card Services",
        "Income Tax Consultant"
      ]
    },
    {
      "name": "Home, Auto & Other Loan Services",
      "items": [
        "Personal Loan",
        "Business Loan",
        "Home Loan",
        "Asset Backed Loan",
        "Credit Cards"
      ]
    },
    {
      "name": "CA, CS & Cost Accounting Services",
      "items": [
        "Accounting Services",
        "Chartered Accountant",
        "Financial Accounting",
        "Bookkeeping Services",
        "Accounts Consulting Services"
      ]
    },
    {
      "name": "Legal Advisors & Consultants",
      "items": [
        "Legal Consultants",
        "Corporate Law Services",
        "Law Consultancy Service",
        "Criminal Law Attorneys",
        "Civil Lawyers Services"
      ]
    },
    {
      "name": "Stock Trading/Money Market",
      "items": [
        "Commodities Trading Service",
        "Stock Brokers",
        "Share Trading Services",
        "Demat Account Services",
        "Stock Management"
      ]
    },
    {
      "name": "Company Law & Labour Law Consultants",
      "items": [
        "Statutory Compliance Services",
        "Corporate Law Services",
        "Law Consultancy Service",
        "Compliance Service",
        "Company Incorporation Services"
      ]
    },
    {
      "name": "Banks and Banking Services",
      "items": [
        "Banking Service",
        "Credit Cards",
        "Fixed Deposit",
        "Credit Card Processing Services",
        "Mobile Banking Services"
      ]
    },
    {
      "name": "Legal Drafting & Litigation Services",
      "items": [
        "Legal Drafting Services",
        "Legal Documentation Services",
        "Dispute Resolution Service",
        "Intellectual Property Right Services",
        "Litigation Support Services"
      ]
    },
    {
      "name": "Actuarial & Risk Management",
      "items": [
        "Risk Management Services",
        "Risk Assessment Service",
        "Risk Analysis Services",
        "Risk Management Consultant Services",
        "Risk Advisory Service"
      ]
    }
  ],
  "Education & Training": [
    {
      "name": "Vocational Education and Training",
      "items": [
        "Vocational Training",
        "Dance Schools",
        "Sports Training Services",
        "Music Schools",
        "Motor Driving School"
      ]
    },
    {
      "name": "Corporate and Soft Skills Training",
      "items": [
        "Corporate Training",
        "Personality Development",
        "Communication Skills Training",
        "Skill Development Services",
        "Customer Service Training"
      ]
    },
    {
      "name": "Computer, IT & Software Training",
      "items": [
        "Computer Education",
        "Computer Language Training Services",
        "Computer Training",
        "Java Training Services",
        "Software Training"
      ]
    },
    {
      "name": "Graduation & High Education Programs",
      "items": [
        "Engineering Education Services",
        "Electrical Engineering Courses",
        "Medical Courses",
        "Mechanical Engineering Course",
        "Civil Engineer Courses"
      ]
    },
    {
      "name": "Short Term Diploma & Course Provider",
      "items": [
        "Certificate Courses",
        "Diploma Courses",
        "Language Training Services",
        "Short Term Courses",
        "Information Technology Diploma"
      ]
    },
    {
      "name": "Career Guidance & Admission Services",
      "items": [
        "Educational Services",
        "Educational Consultants",
        "Training Institutes",
        "Primary School Education",
        "Quality Education Services"
      ]
    },
    {
      "name": "Online Education & Coaching Services",
      "items": [
        "Online Education Consultancy Services",
        "E-Learning Solution",
        "Web Designing Course",
        "Entrance Coaching Institutes",
        "Career Guidance Centre"
      ]
    },
    {
      "name": "Coaching Classes & Tuition Centers",
      "items": [
        "Coaching Classes",
        "English Speaking Course",
        "Mathematics Coaching Service",
        "Home Tutor",
        "Bank Exam Training"
      ]
    },
    {
      "name": "Primary & Secondary Schools",
      "items": [
        "Primary School Education",
        "Playschool",
        "Nursery Schools",
        "Kindergarten",
        "Secondary Schools"
      ]
    },
    {
      "name": "Presentation Boards & Accessories",
      "items": [
        "Projector",
        "Interactive Board",
        "Black & White Board Accessories",
        "Writing Board",
        "Dustless chalk"
      ]
    },
    {
      "name": "Kids Fiction & Entertainment Books",
      "items": [
        "School Book",
        "Children Books",
        "Drawing Book",
        "Coloring Book",
        "Computer Books"
      ]
    },
    {
      "name": "Science & Technology Books",
      "items": [
        "Engineering Book",
        "Medical books",
        "Mathematical Books",
        "Physics Books",
        "Technology Books"
      ]
    },
    {
      "name": "Culture & Religion Related Books",
      "items": [
        "Religious Books",
        "Islamic Books",
        "Devotional Books",
        "Astrology Books",
        "Bhagavad Gita Book"
      ]
    },
    {
      "name": "Management & Educational Books",
      "items": [
        "Printed Book",
        "Educational Books",
        "Psychology Books",
        "Sociology Books",
        "Geography Books"
      ]
    },
    {
      "name": "Social Science & Literature Books",
      "items": [
        "History Books",
        "Law Books",
        "Novel Books",
        "Political Science Books",
        "Biography Books"
      ]
    }
  ],
  "Travel, Tourism & Hotels": [
    {
      "name": "Air Taxi, Bus Rentals & Services",
      "items": [
        "Vehicle Rental",
        "Car Rental",
        "Cab Services",
        "Bus Rental",
        "Luxury Car Rental"
      ]
    },
    {
      "name": "Tour Operators and Travel Agents",
      "items": [
        "Tour Packages",
        "Air Ticket Booking",
        "Domestic Tour",
        "Railway Ticketing",
        "Ticket Booking Service"
      ]
    },
    {
      "name": "Hotel Booking & Reservation Services",
      "items": [
        "Hotel Bookings",
        "Air-conditioned Deluxe Rooms",
        "Accommodation Services",
        "Hotels Accommodation Service",
        "Hospitality Services"
      ]
    },
    {
      "name": "Adventure & Trekking Tours",
      "items": [
        "Wildlife Tours",
        "Adventure Tours",
        "Trekking Tour Services",
        "River Rafting Tour",
        "Safari Tour Packages"
      ]
    },
    {
      "name": "Camping, Fishing & Hunting Goods",
      "items": [
        "Fishing Nets",
        "Fishing Equipment & Accessories",
        "Camping Tents",
        "Nylon Fishing Nets",
        "Fishing Rods"
      ]
    }
  ],
  "Call Center & BPO Services": [
    {
      "name": "Call Centre & Customer Care Services",
      "items": [
        "Technical Support Service",
        "Technology Support Services",
        "Customer Care BPO Services",
        "Call Centers",
        "Help Desk Services"
      ]
    },
    {
      "name": "BPO Operations and Services",
      "items": [
        "BPO Services",
        "Business Support Service",
        "IT Outsourcing Services",
        "Outsourcing Service",
        "KPO Service"
      ]
    },
    {
      "name": "Branding & Advertising Agencies",
      "items": [
        "Advertising Service",
        "Brand Promotion",
        "Promotional Activity Services",
        "Logo Design",
        "Outdoor Advertising"
      ]
    },
    {
      "name": "HR & Manpower Recruitment Solutions",
      "items": [
        "Recruitment Service",
        "Manpower Service",
        "Job Consultation Service",
        "Recruitment Consultancy",
        "Manpower Solution"
      ]
    }
  ],
  "Bicycle, Rickshaw & Spares": [
    {
      "name": "Bicycle Spare Parts",
      "items": [
        "Bicycles Parts",
        "Bicycle Wheel Parts",
        "Bicycle Accessories",
        "Bicycle cranks",
        "Cycle Seats"
      ]
    },
    {
      "name": "Kids, Racing Bicycles and Rickshaws",
      "items": [
        "Kids Bicycles",
        "Bicycle",
        "Kids Bikes",
        "Racing Bicycle",
        "Hybrid Bicycles"
      ]
    },
    {
      "name": "Oils, Grease & Lubricants",
      "items": [
        "Mineral Oils",
        "Automotive Oils",
        "Industrial Oils",
        "Engine Oil",
        "Waste Oils"
      ]
    },
    {
      "name": "Nails, Fasteners, Rivets & Shackles",
      "items": [
        "Fasteners",
        "Rivets",
        "Metal Fastener",
        "Anchor Fasteners",
        "Studs"
      ]
    },
    {
      "name": "Ball Bearings and Bearing Assemblies",
      "items": [
        "Ball Bearings",
        "Bearings",
        "Roller Bearings",
        "Industrial Bearings",
        "Deep Groove Ball Bearings"
      ]
    },
    {
      "name": "Tyres & Tube",
      "items": [
        "Two Wheeler Tyres",
        "Pneumatic Tyre",
        "Bike Tyres",
        "Rubber Tyres",
        "Motorcycle Tyres"
      ]
    },
    {
      "name": "Air Springs & Compression Springs",
      "items": [
        "Compression Springs",
        "Industrial Springs",
        "Metal Spring",
        "Coil Springs",
        "Extension Springs"
      ]
    },
    {
      "name": "Suspension System & Components",
      "items": [
        "Suspension Shock Absorber",
        "Leaf Springs",
        "Suspension Arm Assembly",
        "Suspension System",
        "Automotive Suspension Parts"
      ]
    },
    {
      "name": "Brakes & Braking Systems",
      "items": [
        "Brake Parts",
        "Motorcycle Brake Parts",
        "Truck Brake Parts",
        "Motorcycle Brake Shoe",
        "Car & Bike Brake Liner"
      ]
    }
  ],
  "R&D and Testing Labs": [
    {
      "name": "Material Testing Labs & Services",
      "items": [
        "Testing Services",
        "Electrical Testing Service",
        "Energy Monitoring Service",
        "Laboratory Testing Services",
        "Chemical Testing Services"
      ]
    },
    {
      "name": "Instrument Calibration & Adjustment",
      "items": [
        "Calibration Services",
        "Machine Testing Services",
        "Vibration Analysis Services",
        "Instrument Calibration Services",
        "NABL Accreditation"
      ]
    },
    {
      "name": "Inspection & Quality Check Services",
      "items": [
        "Quality Inspection Service",
        "Survey Solution",
        "Quality Management Consultancy",
        "Geotechnical Engineering",
        "Inspection Service"
      ]
    },
    {
      "name": "Research and Development (R&D) Work",
      "items": [
        "Product Development Research",
        "Technology Development Services",
        "R&D Consulting Services",
        "Custom Synthesis Service",
        "Industry Research"
      ]
    },
    {
      "name": "Testing & Measuring Equipments",
      "items": [
        "Testing Equipment",
        "Water Testing Equipment",
        "Compression Testing Machine",
        "PH Meter",
        "Civil Engineering Test Equipment"
      ]
    },
    {
      "name": "Laboratory & Lab Equipment",
      "items": [
        "Laboratory Equipment",
        "Laboratory Apparatus",
        "Science Laboratory Equipment",
        "Pathology Lab Equipments",
        "Laboratory Autoclave & Sterilizers"
      ]
    },
    {
      "name": "Measuring Equipments & Instruments",
      "items": [
        "Measurement Instrument",
        "Currency And POS Equipment",
        "Currency Counting Machines",
        "Cash Registers",
        "Water Meters"
      ]
    },
    {
      "name": "Weighing Scales & Measuring Tapes",
      "items": [
        "Weighing Scale",
        "Electronic Weighing Scales",
        "Weighing Machines",
        "Measuring Tapes",
        "Precision Balance"
      ]
    },
    {
      "name": "Analyzers & Analytical Instruments",
      "items": [
        "Elemental Analyzer",
        "IVDs & Analyzers",
        "Hematology Analyzers",
        "PH Meter",
        "Gas Analyzers"
      ]
    },
    {
      "name": "Diagnostic Medical Imaging Equipment",
      "items": [
        "Electrodiagnostic Instruments",
        "Medical Imaging Machine & Accessories",
        "ECG Machine",
        "Diagnostic Imaging Accessories",
        "X Ray Centres"
      ]
    },
    {
      "name": "Plastic & Glass Labware",
      "items": [
        "Clear Plastic Tube",
        "Laboratory Glassware",
        "Glass Slab",
        "Laboratory Plasticware",
        "Plastic Flask"
      ]
    },
    {
      "name": "Scientific Instruments & Devices",
      "items": [
        "Scientific Instruments",
        "Voltmeter",
        "Laboratory Instruments",
        "Calipers",
        "Ammeter"
      ]
    },
    {
      "name": "Chemical Reactors and Process Tanks",
      "items": [
        "Pressure Vessels",
        "Reaction Vessel",
        "Air Receiver",
        "Chemical Reactors",
        "Transport Tanks"
      ]
    },
    {
      "name": "Optical, Laser Instruments & Devices",
      "items": [
        "Laser Beam Expander",
        "Optical Instruments",
        "Optical Machine",
        "Optical Prisms",
        "Laser Instruments"
      ]
    },
    {
      "name": "Metallurgical & Lab Microscopes",
      "items": [
        "Glass Microsphere",
        "Microscope",
        "Microscope Components",
        "Laboratory Microscope",
        "Microtome"
      ]
    },
    {
      "name": "Cleanroom Equipment & Supplies",
      "items": [
        "Clean Room Equipment",
        "Clean Room Fittings and Furniture",
        "Laminar Air Flow",
        "Biosafety Cabinets",
        "Pass Box"
      ]
    }
  ],
  "Architecture & Interiors": [
    {
      "name": "Interior Designing & Decoration",
      "items": [
        "Interior Designers",
        "Modular Kitchen",
        "Interior Decorators",
        "Residential Interior Designers",
        "Commercial Interior Designer"
      ]
    },
    {
      "name": "Building and Flooring Services",
      "items": [
        "Flooring Services",
        "Building Repair Services",
        "Tiles Work",
        "Tile Flooring Services",
        "Swimming Pool Design Repair & Construction Service"
      ]
    },
    {
      "name": "Doors and Windows",
      "items": [
        "Door",
        "Window",
        "Metal Doors",
        "Wooden Door",
        "Metal Window"
      ]
    },
    {
      "name": "Building  & Real Estate Developers",
      "items": [
        "Construction Service",
        "Commercial Construction Service",
        "Building Construction",
        "Residential Construction Projects",
        "Commercial Buildings Construction"
      ]
    },
    {
      "name": "Granite, Marble, Sandstone & Others",
      "items": [
        "Marble",
        "Granite Stone",
        "Granite",
        "Travertine",
        "Limestone"
      ]
    },
    {
      "name": "Roofing and False ceiling",
      "items": [
        "Roofing Sheets",
        "False Ceiling",
        "Ceramic Roof Tile",
        "False Ceiling Designing",
        "Metal Roofing Sheet"
      ]
    },
    {
      "name": "Wash Basins, Sanitaryware & Fittings",
      "items": [
        "Sanitary Ware",
        "Wash Basins",
        "Kitchen Sinks",
        "Plastic Sinks",
        "Toilet Seats"
      ]
    },
    {
      "name": "Building Panels & Cladding Materials",
      "items": [
        "Grills",
        "Wall Panels",
        "Concrete Jali",
        "Wall Partitions And Door Partitions",
        "Concrete Slabs"
      ]
    },
    {
      "name": "Elevators & Escalators",
      "items": [
        "Elevators",
        "Goods Lift",
        "Elevator Part",
        "Passenger Lifts",
        "Passenger Elevator"
      ]
    },
    {
      "name": "Gate, Grilles, Fences & Railings",
      "items": [
        "Cement Grill",
        "Grills",
        "Metal Gate",
        "Gates",
        "Metal Grill"
      ]
    },
    {
      "name": "Vitrified,Ceramic Floor & Wall Tiles",
      "items": [
        "Ceramic Tiles",
        "Ceramic Art Tiles",
        "Ceramic Wall Tiles",
        "Ceramic Floor Tiles",
        "Designer Tiles"
      ]
    },
    {
      "name": "Cement and Concrete",
      "items": [
        "Portland Cement",
        "Slag Cement",
        "Cement",
        "Calcium Aluminate Cement",
        "Roofing & Special Purpose Cements"
      ]
    },
    {
      "name": "Bricks & Construction Aggregates",
      "items": [
        "Building Materials",
        "River Sand",
        "Ceramic Brick",
        "Bricks",
        "Construction Sand"
      ]
    },
    {
      "name": "Statues & Sculptures",
      "items": [
        "Animal Statues",
        "Metal Statue",
        "Marble Statue",
        "Wood Statue",
        "Decorative Statue"
      ]
    },
    {
      "name": "Bathroom Accessories",
      "items": [
        "Bathroom Accessories",
        "Soap & Sanitizer Dispenser",
        "Soap Dishes",
        "Towel Holder",
        "Bathroom Rack"
      ]
    },
    {
      "name": "Scaffolding Pipes and Fittings",
      "items": [
        "Scaffolding Accessories",
        "Scaffoldings",
        "Scaffolding Planks & Plates",
        "Base Plates",
        "Scaffolding Props & Spans"
      ]
    },
    {
      "name": "Vinyl, Plastic & Rubber Floor Tiles",
      "items": [
        "Floor Coverings",
        "PVC Floorings",
        "Epoxy Flooring",
        "Vinyl Floorings",
        "Sports Floorings"
      ]
    },
    {
      "name": "Garden & Landscaping Products",
      "items": [
        "Garden Decor",
        "Decorative Pot",
        "Garden Lighting",
        "Garden Fountains",
        "Decorative Fountain"
      ]
    },
    {
      "name": "Staircase, Balusters and Stair Parts",
      "items": [
        "Railing Fittings",
        "Stainless Steel Railings",
        "Steel Railings",
        "Stair Railings",
        "Glass Railing"
      ]
    },
    {
      "name": "Drapes & Curtains",
      "items": [
        "Curtains",
        "Designer Curtain",
        "Drape Curtain",
        "Window Curtains",
        "Cotton Curtain"
      ]
    },
    {
      "name": "Brass, Copper & Metal Handicrafts",
      "items": [
        "Metal Crafts",
        "Iron Crafts",
        "Brass Crafts",
        "Copper Utensils",
        "Aluminium Handicrafts"
      ]
    },
    {
      "name": "Gazebos, Awnings, Canopies & Sheds",
      "items": [
        "Canopy Sheds",
        "Sheds and Tents",
        "Canopies",
        "Car Sheds",
        "Awnings"
      ]
    },
    {
      "name": "Beams, Purlins, Frames and Girders",
      "items": [
        "Steel Girder Bridge",
        "Building Beams & Girders",
        "Metal Channels",
        "Building Columns & Pillars",
        "Metal Beams"
      ]
    },
    {
      "name": "Marble & Stone Artifacts",
      "items": [
        "Sandstone Article",
        "Stone Crafts",
        "Granite Monuments",
        "Stone Artifacts",
        "Marble Handicrafts"
      ]
    },
    {
      "name": "Door, Window Frame, Panel & Shutters",
      "items": [
        "Iron Rolling Shutter",
        "Wall Partitions And Door Partitions",
        "Rolling Shutters",
        "Door Frames",
        "Aluminium Partitions"
      ]
    },
    {
      "name": "Hardwood Flooring & Wooden Floor Tiles",
      "items": [
        "Wooden Flooring",
        "Wood Tiles",
        "Flooring Services",
        "Laminate Floorings",
        "Hardwood Flooring"
      ]
    },
    {
      "name": "Cobbles, Pebbles & Pavings",
      "items": [
        "Pebble Stone",
        "Pebbles",
        "Paver",
        "Paver Blocks",
        "KERB Stones"
      ]
    },
    {
      "name": "Stone Tiles & Floorings",
      "items": [
        "Stone Tiles",
        "Mosaic Sandstone Tiles",
        "Natural Stone Tiles",
        "Marble Tiles",
        "Marble Floor Tiles"
      ]
    },
    {
      "name": "Shower Panels & Accessories",
      "items": [
        "Bathroom Showers",
        "Shower Enclosure & Cabins",
        "Shower Accessories",
        "Shower Heads",
        "Glass Shower Enclosure"
      ]
    },
    {
      "name": "Door Skins, Panels & Profile",
      "items": [
        "Plastic, PVC & UPVC Profiles",
        "Wooden Beading",
        "Door Skin & Laminates",
        "Door Skin",
        "Window Door Profile"
      ]
    }
  ],
  "HR Planning & Recruitment": [
    {
      "name": "HR & Manpower Recruitment Solutions",
      "items": [
        "Recruitment Service",
        "Manpower Service",
        "Job Consultation Service",
        "Recruitment Consultancy",
        "Manpower Solution"
      ]
    },
    {
      "name": "Contract Employment & Staffing Firms",
      "items": [
        "Manpower Service",
        "Plumbing Contractors",
        "Contract Labour Supplier Services",
        "Labour Contractors",
        "Staffing Service"
      ]
    },
    {
      "name": "HR Consulting & Advisory",
      "items": [
        "Placement Service",
        "HR Consultancy Services",
        "HR Solutions",
        "Human Resource Management",
        "Placement Consultants"
      ]
    },
    {
      "name": "HR & Payroll Outsourcing Services",
      "items": [
        "Payroll Services",
        "HR Outsourcing",
        "Recruitment Outsourcing Services",
        "Manpower Outsourcing",
        "Administrative Support Service"
      ]
    },
    {
      "name": "Corporate and Soft Skills Training",
      "items": [
        "Corporate Training",
        "Personality Development",
        "Skill Development Services",
        "Communication Skills Training",
        "Customer Service Training"
      ]
    }
  ],
  "Rail, Shipping & Aviation": [
    {
      "name": "Marine Tools & Equipments",
      "items": [
        "Marine Equipments",
        "Marine Fittings",
        "Boat Propeller",
        "Boats",
        "Marine Engine"
      ]
    },
    {
      "name": "Railway, Railroad & Train Components",
      "items": [
        "Railway Parts",
        "Railway Track Parts",
        "Dip Lorry",
        "Tamping Machines",
        "Railway Tracks"
      ]
    },
    {
      "name": "Aeronautical Instrument & Components",
      "items": [
        "Aerospace Equipment",
        "Aircraft Parts",
        "Aeronautical Instruments",
        "Aircraft",
        "Airport Equipment"
      ]
    },
    {
      "name": "Nails, Fasteners, Rivets & Shackles",
      "items": [
        "Fasteners",
        "Rivets",
        "Metal Fastener",
        "Anchor Fasteners",
        "Studs"
      ]
    },
    {
      "name": "Ball Bearings and Bearing Assemblies",
      "items": [
        "Ball Bearings",
        "Bearings",
        "Roller Bearings",
        "Industrial Bearings",
        "Deep Groove Ball Bearings"
      ]
    },
    {
      "name": "Storage Tanks, Drums & Containers",
      "items": [
        "Water Tanks",
        "Water Storage Tanks",
        "Plastic Water Tank",
        "Drums",
        "Metal Tank"
      ]
    },
    {
      "name": "Engineering and Shipping Ropes",
      "items": [
        "Rope",
        "Fibre Rope",
        "Strand Rope",
        "Wire Ropes",
        "Twine"
      ]
    },
    {
      "name": "Brakes & Braking Systems",
      "items": [
        "Brake Parts",
        "Motorcycle Brake Parts",
        "Truck Brake Parts",
        "Motorcycle Brake Shoe",
        "Car & Bike Brake Liner"
      ]
    },
    {
      "name": "Power Transmission Tools & Couplings",
      "items": [
        "Couplings",
        "Plastic Coupling",
        "Pipe Couplings",
        "Industrial Shafts",
        "Pulleys"
      ]
    }
  ],
  "Facility Management": [
    {
      "name": "Housekeeping and Cleaning Services",
      "items": [
        "Cleaning Services",
        "Home Cleaning Service",
        "Housekeeping Service",
        "Commercial Cleaning Services",
        "Laundry Service"
      ]
    },
    {
      "name": "Termite & Pest Control Services",
      "items": [
        "Pest Control Services",
        "Pest Management",
        "Cockroaches Pest Control Services",
        "Household Pest Control",
        "Insect Control"
      ]
    },
    {
      "name": "Residential & Commercial Security",
      "items": [
        "Security Service",
        "Security Guards",
        "Commercial Security Service",
        "Residence Security Services",
        "Personal Security Guard Services"
      ]
    },
    {
      "name": "Disinfection Equipment & Machines",
      "items": [
        "Agricultural Sprayers",
        "Disinfectant Sprayers",
        "Fumigation Machine",
        "Battery Spray Pump",
        "Agricultural Power Sprayer"
      ]
    },
    {
      "name": "Packers & Movers",
      "items": [
        "Domestic Relocation Service",
        "Car Transportation",
        "Packers and Movers",
        "Household Goods Moving Services",
        "Loading Unloading Services"
      ]
    }
  ],
  "Leather Products": [
    {
      "name": "Raw and Processed Leather",
      "items": [
        "Animal Leather",
        "Finished Leather",
        "Buffalo Leather",
        "Faux Leather",
        "Buffalo Split Leather"
      ]
    },
    {
      "name": "Leather Goods & Accessories",
      "items": [
        "Leather Footwear",
        "Leather Accessories",
        "Leather Harness",
        "Leather Keychain",
        "Finished Leather Goods"
      ]
    },
    {
      "name": "Men, Women & Kids Footwear",
      "items": [
        "Women Footwear",
        "Shoes",
        "Sports Shoes",
        "Flat Slipper",
        "Rubber Footwear"
      ]
    },
    {
      "name": "Animal Clothing & Accessories",
      "items": [
        "Dog Accessories",
        "Leather Saddle",
        "Saddles",
        "Dog Muzzles",
        "Dog Collars"
      ]
    },
    {
      "name": "Wallets & Purses",
      "items": [
        "Wallet",
        "Purse",
        "Ladies Purse",
        "Leather Wallet",
        "Men Leather Wallet"
      ]
    },
    {
      "name": "Fashion & Leather Belts",
      "items": [
        "Belts",
        "Leather Belt",
        "Men Leather Belt",
        "Fashion Belts",
        "Men Belt"
      ]
    },
    {
      "name": "Leather Jackets and Garments",
      "items": [
        "Leather Jackets",
        "Women Leather Clothing",
        "Men Leather Garments",
        "Leather Garments",
        "Leather Gloves"
      ]
    },
    {
      "name": "Briefcase, Portfolio & Laptop Bags",
      "items": [
        "Leather Briefcase",
        "Laptop Bag",
        "Briefcases",
        "Business Bags",
        "Office Bags"
      ]
    }
  ],
  "Contractors & Freelancers": [
    {
      "name": "Detective & Investigation Agencies",
      "items": [
        "Investigation Services",
        "Divorce Case Investigation",
        "Private Detective Agency",
        "Matrimonial Investigation",
        "Personal Detective Services"
      ]
    },
    {
      "name": "Language Translators & Interpreter",
      "items": [
        "Language Translation Service",
        "Language Interpretation Services",
        "Medical Transcription Services",
        "Transcription Services",
        "Localization Service"
      ]
    },
    {
      "name": "Charity & Non Profit Organizations",
      "items": [
        "Welfare Organization Services",
        "Social Services",
        "Day Care Center",
        "Charitable Trust",
        "Day Care Services"
      ]
    },
    {
      "name": "Painters & Painting Service Provider",
      "items": [
        "Art Designing Service",
        "Painting Conservation Work",
        "Art Gallery Services",
        "Art Glass Work",
        "Paper Cutting Work"
      ]
    },
    {
      "name": "Transport Agents & Bulk Carriers",
      "items": [
        "Transportation Services",
        "Goods Transport Services",
        "Full Truck Load Transport Service",
        "Courier Service",
        "Parcel Delivery Services"
      ]
    },
    {
      "name": "Photographers & Videographers",
      "items": [
        "Photography Services",
        "Wedding Photographers",
        "Video Services",
        "Videography Services",
        "Event Photography"
      ]
    },
    {
      "name": "Product Packing & Labelling Services",
      "items": [
        "Packaging Solutions",
        "Goods Packaging Service",
        "Package Designing Services",
        "Food Packaging Solutions",
        "Private Labeling Services"
      ]
    },
    {
      "name": "Furniture Making & Carpentry Service",
      "items": [
        "Carpentry Work",
        "Furniture Design Service",
        "Wood Works Services",
        "Furniture Maintenance Service",
        "Interior Wood Work"
      ]
    }
  ],
  "Electronics Components": [
    {
      "name": "Electric Circuit Components & Spares",
      "items": [
        "Electronic Components",
        "Electronic Appliances Circuit Boards",
        "Semiconductor Device",
        "Plastic Electronic Components",
        "PCB Circuit"
      ]
    },
    {
      "name": "VFD, PLC, HMI & Control Equipments",
      "items": [
        "Industrial Control Systems",
        "Industrial Automation Systems",
        "Industrial Control Panel",
        "PLC Control Panel",
        "Motor Drives"
      ]
    },
    {
      "name": "Sensors & Transducers",
      "items": [
        "Sensors",
        "Temperature Sensor",
        "Proximity Sensor",
        "Level Sensors",
        "Motion Sensor"
      ]
    },
    {
      "name": "Resistors & Other Passive Devices",
      "items": [
        "Power Inductor",
        "Capacitor",
        "Power Capacitors",
        "Resistors",
        "Variable Capacitors"
      ]
    },
    {
      "name": "Diodes & Electronic Active Devices",
      "items": [
        "Rectifiers",
        "Light Emitting Diode",
        "Integrated Circuits",
        "Semiconductor Device",
        "Transistors"
      ]
    },
    {
      "name": "Process Control Systems & Equipments",
      "items": [
        "Process Controllers",
        "Temperature Controller",
        "Level Controllers",
        "Water Level Controller",
        "Digital Temperature Controller"
      ]
    },
    {
      "name": "Optical, Laser Instruments & Devices",
      "items": [
        "Laser Beam Expander",
        "Optical Instruments",
        "Optical Machine",
        "Optical Prisms",
        "Laser Instruments"
      ]
    },
    {
      "name": "GPS and Navigation Devices",
      "items": [
        "Car & Vehicle GPS Devices",
        "Vehicle GPS System",
        "GPS Tracking System",
        "GPS Tracking Device",
        "GPS Navigation System and Parts"
      ]
    },
    {
      "name": "PCB Modules and Circuit Boards",
      "items": [
        "PC Board",
        "LED PCB",
        "Bare PCB",
        "PCB Assembly Line Components",
        "Single PCB"
      ]
    },
    {
      "name": "Voltage & Power Stabilizers",
      "items": [
        "Voltage Stabilizers",
        "Voltage Controllers",
        "Stabilizers",
        "Servo Voltage Stabilizer",
        "Air Conditioner Voltage Stabilizer"
      ]
    },
    {
      "name": "Soldering Machines and Accesories",
      "items": [
        "Silver Chain Soldering Powder",
        "Soldering Accessories",
        "Soldering Pastes",
        "Soldering Equipment",
        "Soldering Machines"
      ]
    },
    {
      "name": "Electrical and Electronic Gadgets",
      "items": [
        "Harmonic Filters",
        "Line Load Reactors",
        "Electronic Scanners",
        "Active Harmonic Filter",
        "Harmonic Filter Reactor"
      ]
    },
    {
      "name": "Electrical & Electronic Connectors",
      "items": [
        "Electronic Connectors",
        "Fiber Optic Connectors",
        "Audio & Video Connectors",
        "Cable Connectors",
        "Cable Lugs"
      ]
    },
    {
      "name": "Electric Fittings & Components",
      "items": [
        "Electrical Equipments",
        "Electrical Components",
        "Electrodes",
        "Earthing Equipment",
        "Earthing Electrodes"
      ]
    },
    {
      "name": "Relays and Contactors",
      "items": [
        "Relays",
        "Power Contactors",
        "Power Relays",
        "Industrial Relay",
        "Auxiliary Contactor"
      ]
    }
  ],
  "Electrical Equipment": [
    {
      "name": "Industrial Air Conditioner & Devices",
      "items": [
        "Commercial Air Conditioner",
        "HVAC System",
        "Air Conditioner Parts",
        "Chillers",
        "Industrial Air Conditioning System"
      ]
    },
    {
      "name": "Solar & Renewable Energy Products",
      "items": [
        "Solar Panels",
        "Solar Power Plants",
        "Solar Power Systems",
        "Solar Water Heater",
        "Solar Street Lights"
      ]
    },
    {
      "name": "Batteries & Charge Storage Devices",
      "items": [
        "Batteries",
        "Inverter Battery",
        "Lithium Ion Battery",
        "Industrial Batteries",
        "Lithium Primary Battery"
      ]
    },
    {
      "name": "Electrical & Electronic Test Devices",
      "items": [
        "Energy Meter",
        "Multimeter",
        "Digital Multimeter",
        "Electric Meters",
        "Panel Meters"
      ]
    },
    {
      "name": "Electric Motors and Components",
      "items": [
        "Electric Motor",
        "Three Phase Electric Motor",
        "Single Phase Electric Motor",
        "AC Motor",
        "DC Motor"
      ]
    },
    {
      "name": "Switches & Switch Boxes",
      "items": [
        "Electrical Switches",
        "Electrical Switch Board",
        "Switchboards",
        "Modular Switches",
        "Electronic Switch"
      ]
    },
    {
      "name": "Fuses, Circuit Breakers & Components",
      "items": [
        "Circuit Breakers",
        "Switch Fuse Unit",
        "Distribution Box",
        "MCB",
        "Electrical Fuse"
      ]
    },
    {
      "name": "Electrical Panels & Distribution Box",
      "items": [
        "Electric Control Panel",
        "Electrical Panels",
        "PLC Control Panel",
        "Distribution Box",
        "Electrical Box"
      ]
    },
    {
      "name": "Generators, Turbines & Power Plants",
      "items": [
        "Generator",
        "Electric Power Generator",
        "Industrial Engines",
        "Diesel Engine Generator Set",
        "Diesel Generator"
      ]
    },
    {
      "name": "Transformers & Transformer Parts",
      "items": [
        "Transformers",
        "Electrical Transformer",
        "Electrical Power Transformer",
        "Transformer Parts",
        "Power Transformers"
      ]
    },
    {
      "name": "Electric Fittings & Components",
      "items": [
        "Electrical Equipments",
        "Electrical Components",
        "Electrodes",
        "Earthing Equipment",
        "Earthing Electrodes"
      ]
    },
    {
      "name": "Electrical Cables & Wires",
      "items": [
        "Wires",
        "Electric Cable",
        "Electric Wire",
        "Electric House Wire",
        "Insulated Cables"
      ]
    },
    {
      "name": "Cables & Wiring Components",
      "items": [
        "Electrical Insulators",
        "Cable Accessories",
        "Cable Gland and Accessories",
        "Cable Connectors",
        "Wire Accessories"
      ]
    },
    {
      "name": "Metal and Alloy Wires",
      "items": [
        "Metal Wire",
        "Copper Wires",
        "Insulated Conductors",
        "Steel Wire",
        "Electrical Conductors"
      ]
    },
    {
      "name": "Relays and Contactors",
      "items": [
        "Relays",
        "Power Contactors",
        "Power Relays",
        "Industrial Relay",
        "Auxiliary Contactor"
      ]
    },
    {
      "name": "Electrical Conduits and Fittings",
      "items": [
        "PVC Conduit Pipes",
        "Conduit Pipes",
        "Cable Trays",
        "Cable Raceways",
        "Wire Pipe"
      ]
    },
    {
      "name": "LED Display Board & Light Boxes",
      "items": [
        "LED Name Plate",
        "Electronic Display Board",
        "LED Displays",
        "LED Display Board",
        "Display Boards"
      ]
    }
  ],
  "Hospital,Clinic and Consultation": [
    {
      "name": "Medical Surgery & Treatment Centres",
      "items": [
        "Therapeutic Service",
        "Prophylactic Treatment Services",
        "Dental Treatment Services",
        "Fever Treatment Services",
        "Root Canal Treatment"
      ]
    },
    {
      "name": "Medical Consultants & Clinics",
      "items": [
        "Medical Consultancy Services",
        "Blood Banks",
        "Medical Test Services",
        "Blood Testing",
        "Complete Health Check-Up"
      ]
    },
    {
      "name": "Pharma & Bioanalytical Services",
      "items": [
        "Pharmaceutical Third Party Manufacturing",
        "Pharma Franchise",
        "Pharmaceutical Contract Manufacturing Services",
        "Allopathic PCD Pharma Franchise",
        "PCD Pharma Franchise"
      ]
    },
    {
      "name": "Herbal & Ayurvedic Medical Services",
      "items": [
        "Natural Therapy Services",
        "Alternative Medical Services",
        "Acupuncture Therapy",
        "Panchakarma Treatment Services",
        "Diabetes Ayurvedic Treatment"
      ]
    },
    {
      "name": "Diagnostic Imaging & Pathology Labs",
      "items": [
        "X Ray Centres",
        "Ultrasound Test Centre",
        "CT Scan Centres",
        "Genetic Testing",
        "Dental X Ray Test Centre"
      ]
    }
  ]
}

const keys = Object.keys(industrySubcategories);

console.log(keys);