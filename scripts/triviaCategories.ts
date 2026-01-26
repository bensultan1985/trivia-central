/**
 * Trivia category tree structure
 * Each leaf node represents a specific trivia topic
 */

export const specialQuestions = [
  "smallest",
  "largest",
  "oldest",
  "tallest",
  "most",
  "first",
  "longest",
  "highest",
  "youngest",
  "fastest",
];

export const triviaCategories = {
  geography: {
    water: {
      oceans: [
        "Atlantic Ocean",
        "Pacific Ocean",
        "Indian Ocean",
        "Arctic Ocean",
        "Southern Ocean",
      ],
      seas: [
        "Dead Sea",
        "Red Sea",
        "Mediterranean Sea",
        "Caribbean Sea",
        "Black Sea",
      ],
      // Note: Caspian Sea is included in lakes due to being landlocked
      rivers: [
        "Amazon River",
        "Nile River",
        "Mississippi River",
        "Yangtze River",
        "Danube River",
      ],
      lakes: [
        "Lake Superior",
        "Lake Victoria",
        "Great Salt Lake",
        "Caspian Sea",
        "Lake Baikal",
      ],
    },
    continents: {
      "North America": {
        countries: [
          // North America (mainland)
          "Canada",
          "United States",
          "Mexico",

          // Central America
          "Belize",
          "Costa Rica",
          "El Salvador",
          "Guatemala",
          "Honduras",
          "Nicaragua",
          "Panama",

          // Caribbean
          "Antigua and Barbuda",
          "Bahamas",
          "Barbados",
          "Cuba",
          "Dominica",
          "Dominican Republic",
          "Grenada",
          "Haiti",
          "Jamaica",
          "Saint Kitts and Nevis",
          "Saint Lucia",
          "Saint Vincent and the Grenadines",
          "Trinidad and Tobago",
        ],
        states: [
          "Alabama",
          "Alaska",
          "Arizona",
          "Arkansas",
          "California",
          "Colorado",
          "Connecticut",
          "Delaware",
          "Florida",
          "Georgia",
          "Hawaii",
          "Idaho",
          "Illinois",
          "Indiana",
          "Iowa",
          "Kansas",
          "Kentucky",
          "Louisiana",
          "Maine",
          "Maryland",
          "Massachusetts",
          "Michigan",
          "Minnesota",
          "Mississippi",
          "Missouri",
          "Montana",
          "Nebraska",
          "Nevada",
          "New Hampshire",
          "New Jersey",
          "New Mexico",
          "New York",
          "North Carolina",
          "North Dakota",
          "Ohio",
          "Oklahoma",
          "Oregon",
          "Pennsylvania",
          "Rhode Island",
          "South Carolina",
          "South Dakota",
          "Tennessee",
          "Texas",
          "Utah",
          "Vermont",
          "Virginia",
          "Washington",
          "West Virginia",
          "Wisconsin",
          "Wyoming",
        ],
        cities: [
          // Alabama
          "Birmingham",
          "Mobile",

          // Alaska
          "Anchorage",
          "Fairbanks",

          // Arizona
          "Phoenix",
          "Tucson",

          // Arkansas
          "Little Rock",
          "Fayetteville",

          // California
          "Los Angeles",
          "San Francisco",
          "San Diego",
          "San Jose",

          // Colorado
          "Denver",
          "Colorado Springs",

          // Connecticut
          "Hartford",
          "New Haven",

          // Delaware
          "Wilmington",
          "Dover",

          // Florida
          "Miami",
          "Orlando",
          "Tampa",
          "Jacksonville",

          // Georgia
          "Atlanta",
          "Savannah",

          // Hawaii
          "Honolulu",
          "Hilo",

          // Idaho
          "Boise",
          "Idaho Falls",

          // Illinois
          "Chicago",
          "Springfield",

          // Indiana
          "Indianapolis",
          "Fort Wayne",

          // Iowa
          "Des Moines",
          "Cedar Rapids",

          // Kansas
          "Wichita",
          "Kansas City",

          // Kentucky
          "Louisville",
          "Lexington",

          // Louisiana
          "New Orleans",
          "Baton Rouge",

          // Maine
          "Portland",
          "Bangor",

          // Maryland
          "Baltimore",
          "Annapolis",

          // Massachusetts
          "Boston",
          "Worcester",

          // Michigan
          "Detroit",
          "Grand Rapids",

          // Minnesota
          "Minneapolis",
          "St. Paul",

          // Mississippi
          "Jackson",
          "Gulfport",

          // Missouri
          "St. Louis",
          "Kansas City",

          // Montana
          "Billings",
          "Missoula",

          // Nebraska
          "Omaha",
          "Lincoln",

          // Nevada
          "Las Vegas",
          "Reno",

          // New Hampshire
          "Manchester",
          "Concord",

          // New Jersey
          "Newark",
          "Jersey City",

          // New Mexico
          "Albuquerque",
          "Santa Fe",

          // New York
          "New York City",
          "Buffalo",
          "Rochester",
          "Albany",

          // North Carolina
          "Charlotte",
          "Raleigh",

          // North Dakota
          "Fargo",
          "Bismarck",

          // Ohio
          "Columbus",
          "Cleveland",
          "Cincinnati",

          // Oklahoma
          "Oklahoma City",
          "Tulsa",

          // Oregon
          "Portland",
          "Eugene",

          // Pennsylvania
          "Philadelphia",
          "Pittsburgh",

          // Rhode Island
          "Providence",
          "Warwick",

          // South Carolina
          "Charleston",
          "Columbia",

          // South Dakota
          "Sioux Falls",
          "Rapid City",

          // Tennessee
          "Nashville",
          "Memphis",

          // Texas
          "Houston",
          "Dallas",
          "Austin",
          "San Antonio",

          // Utah
          "Salt Lake City",
          "Provo",

          // Vermont
          "Burlington",
          "Montpelier",

          // Virginia
          "Richmond",
          "Virginia Beach",

          // Washington
          "Seattle",
          "Spokane",

          // West Virginia
          "Charleston",
          "Morgantown",

          // Wisconsin
          "Milwaukee",
          "Madison",

          // Wyoming
          "Cheyenne",
          "Casper",
        ],
        landmarks: [
          // United States
          "Grand Canyon",
          "Yellowstone National Park",
          "Yosemite National Park",
          "Statue of Liberty",
          "Mount Rushmore",
          "Niagara Falls",
          "Great Smoky Mountains",
          "Everglades National Park",
          "Golden Gate Bridge",
          "Death Valley",
          "Bryce Canyon",
          "Zion National Park",
          "Monument Valley",
          "Arches National Park",
          "Rocky Mountains",
          "New Orleans French Quarter",
          "Alcatraz Island",
          "Hawaiʻi Volcanoes National Park",
          "Denali National Park",
          "Glacier National Park",
          "**",

          // Canada
          "Banff National Park",
          "Lake Louise",
          "Jasper National Park",
          "Niagara Falls (Canada)",
          "Canadian Rockies",
          "Old Quebec City",
          "CN Tower",
          "Gros Morne National Park",
          "Vancouver Stanley Park",
          "Haida Gwaii",

          // Mexico
          "Chichén Itzá",
          "Teotihuacán",
          "Mayan Ruins of Tulum",
          "Monte Albán",
          "Palenque",
          "Copper Canyon",
          "Mexico City Historic Center",
          "Frida Kahlo Museum",
          "Sian Ka’an Biosphere Reserve",
          "Isla Mujeres",

          // Central America
          "Mayan Ruins of Tikal (Guatemala)",
          "Lake Atitlán (Guatemala)",
          "Copán Ruins (Honduras)",
          "Arenal Volcano (Costa Rica)",
          "Monteverde Cloud Forest (Costa Rica)",
          "Panama Canal",
          "Bocas del Toro Archipelago (Panama)",
          "Granada Colonial City (Nicaragua)",
          "Masaya Volcano (Nicaragua)",
          "Tortuguero National Park (Costa Rica)",

          // Caribbean
          "Havana Old Town (Cuba)",
          "Viñales Valley (Cuba)",
          "El Yunque National Forest (Puerto Rico)",
          "Old San Juan (Puerto Rico)",
          "Pico Duarte (Dominican Republic)",
          "Citadelle Laferrière (Haiti)",
          "Blue Mountains (Jamaica)",
          "Dunn’s River Falls (Jamaica)",
          "Pitons of Saint Lucia",
          "Brimstone Hill Fortress (St. Kitts)",
          "Baths of Virgin Gorda (BVI)",
          "Great Blue Hole (Belize)",
          "Tulum Cenotes (Mexico)",
          "Santo Domingo Colonial Zone",
          "Tequila Agave Landscape (Mexico)",

          // Arctic / Geographic Regions
          "Arctic Circle (North America)",
          "Kalaallit Nunaat / Greenland Ice Sheet",
          "Baffin Island",
          "Hudson Bay",
          "Appalachian Mountains",
        ],
      },
      "South America": {
        countries: [
          "Argentina",
          "Bolivia",
          "Brazil",
          "Chile",
          "Colombia",
          "Ecuador",
          "Guyana",
          "Paraguay",
          "Peru",
          "Suriname",
          "Uruguay",
          "Venezuela",
        ],
        cities: [
          // Argentina
          "Buenos Aires",
          "Córdoba",

          // Bolivia
          "La Paz",
          "Santa Cruz de la Sierra",

          // Brazil
          "São Paulo",
          "Rio de Janeiro",

          // Chile
          "Santiago",
          "Valparaíso",

          // Colombia
          "Bogotá",
          "Medellín",
          "Cali",

          // Ecuador
          "Quito",
          "Guayaquil",

          // Guyana
          "Georgetown",
          "Linden",

          // Paraguay
          "Asunción",
          "Ciudad del Este",

          // Peru
          "Lima",
          "Arequipa",

          // Suriname
          "Paramaribo",
          "Nieuw Nickerie",

          // Uruguay
          "Montevideo",
          "Punta del Este",

          // Venezuela
          "Caracas",
          "Maracaibo",
        ],
        landmarks: [
          "Machu Picchu (Peru)",
          "Amazon Rainforest",
          "Christ the Redeemer (Brazil)",
          "Iguazu Falls (Argentina/Brazil)",
          "Galápagos Islands (Ecuador)",
          "Patagonia (Argentina/Chile)",
          "Easter Island / Rapa Nui (Chile)",
          "Atacama Desert (Chile)",
          "Lake Titicaca (Peru/Bolivia)",
          "Angel Falls (Venezuela)",
          "Salar de Uyuni (Bolivia)",
          "Torres del Paine National Park (Chile)",
          "Nazca Lines (Peru)",
          "Cartagena Old Town (Colombia)",
          "Buenos Aires Historic Districts (Argentina)",
          "Pantanal Wetlands (Brazil)",
          "Colca Canyon (Peru)",
          "Mount Aconcagua (Argentina)",
          "Fernando de Noronha Archipelago (Brazil)",
          "Valparaíso Historic Quarter (Chile)",
        ],
      },
      Europe: {
        countries: [
          "Albania",
          "Andorra",
          "Austria",
          "Belarus",
          "Belgium",
          "Bosnia and Herzegovina",
          "Bulgaria",
          "Croatia",
          "Cyprus",
          "Czech Republic",
          "Denmark",
          "Estonia",
          "Finland",
          "France",
          "Germany",
          "Greece",
          "Hungary",
          "Iceland",
          "Ireland",
          "Italy",
          "Kosovo",
          "Latvia",
          "Liechtenstein",
          "Lithuania",
          "Luxembourg",
          "Malta",
          "Moldova",
          "Monaco",
          "Montenegro",
          "Netherlands",
          "North Macedonia",
          "Norway",
          "Poland",
          "Portugal",
          "Romania",
          "Russia",
          "San Marino",
          "Serbia",
          "Slovakia",
          "Slovenia",
          "Spain",
          "Sweden",
          "Switzerland",
          "Ukraine",
          "United Kingdom",
        ],
        cities: [
          // Albania
          "Tirana",
          "Durrës",

          // Andorra
          "Andorra la Vella",
          "Escaldes-Engordany",

          // Austria
          "Vienna",
          "Salzburg",
          "Graz",

          // Belarus
          "Minsk",
          "Gomel",
          "Brest",

          // Belgium
          "Brussels",
          "Antwerp",
          "Ghent",

          // Bosnia and Herzegovina
          "Sarajevo",
          "Mostar",
          "Banja Luka",

          // Bulgaria
          "Sofia",
          "Plovdiv",
          "Varna",

          // Croatia
          "Zagreb",
          "Split",
          "Dubrovnik",

          // Cyprus
          "Nicosia",
          "Limassol",
          "Larnaca",

          // Czech Republic
          "Prague",
          "Brno",
          "Ostrava",

          // Denmark
          "Copenhagen",
          "Aarhus",
          "Odense",

          // Estonia
          "Tallinn",
          "Tartu",

          // Finland
          "Helsinki",
          "Tampere",
          "Turku",

          // France
          "Paris",
          "Marseille",
          "Lyon",
          "Nice",

          // Germany
          "Berlin",
          "Munich",
          "Hamburg",
          "Cologne",

          // Greece
          "Athens",
          "Thessaloniki",
          "Heraklion",

          // Hungary
          "Budapest",
          "Debrecen",
          "Szeged",

          // Iceland
          "Reykjavík",
          "Akureyri",

          // Ireland
          "Dublin",
          "Cork",
          "Galway",

          // Italy
          "Rome",
          "Milan",
          "Florence",
          "Venice",

          // Kosovo
          "Pristina",
          "Prizren",

          // Latvia
          "Riga",
          "Daugavpils",

          // Liechtenstein
          "Vaduz",
          "Schaan",

          // Lithuania
          "Vilnius",
          "Kaunas",
          "Klaipėda",

          // Luxembourg
          "Luxembourg City",
          "Esch-sur-Alzette",

          // Malta
          "Valletta",
          "Sliema",
          "Mdina",

          // Moldova
          "Chișinău",
          "Bălți",

          // Monaco
          "Monaco",
          "Monte Carlo",

          // Montenegro
          "Podgorica",
          "Kotor",
          "Budva",

          // Netherlands
          "Amsterdam",
          "Rotterdam",
          "The Hague",
          "Utrecht",

          // North Macedonia
          "Skopje",
          "Ohrid",

          // Norway
          "Oslo",
          "Bergen",
          "Trondheim",

          // Poland
          "Warsaw",
          "Kraków",
          "Gdańsk",
          "Wrocław",

          // Portugal
          "Lisbon",
          "Porto",
          "Braga",

          // Romania
          "Bucharest",
          "Cluj-Napoca",
          "Timișoara",

          // Russia (European cities)
          "Moscow",
          "Saint Petersburg",
          "Kazan",

          // San Marino
          "San Marino",
          "Serravalle",

          // Serbia
          "Belgrade",
          "Novi Sad",
          "Niš",

          // Slovakia
          "Bratislava",
          "Košice",

          // Slovenia
          "Ljubljana",
          "Maribor",
          "Koper",

          // Spain
          "Madrid",
          "Barcelona",
          "Seville",
          "Valencia",

          // Sweden
          "Stockholm",
          "Gothenburg",
          "Malmö",

          // Switzerland
          "Zurich",
          "Geneva",
          "Bern",
          "Basel",

          // Ukraine
          "Kyiv",
          "Lviv",
          "Odesa",
          "Kharkiv",

          // United Kingdom
          "London",
          "Edinburgh",
          "Manchester",
          "Cardiff",

          // Vatican City
          "Vatican City",
        ],
        landmarks: [
          // Western Europe
          "Eiffel Tower (France)",
          "Louvre Museum (France)",
          "Mont Saint-Michel (France)",
          "Palace of Versailles (France)",
          "Stonehenge (England)",
          "Tower of London (England)",
          "Westminster Abbey (England)",
          "Big Ben & Houses of Parliament (England)",
          "Edinburgh Castle (Scotland)",
          "Giant’s Causeway (Northern Ireland)",
          "Cliffs of Moher (Ireland)",
          "Trinity College & Book of Kells (Ireland)",
          "Bruges Historic Center (Belgium)",
          "Anne Frank House (Netherlands)",
          "Windmills of Kinderdijk (Netherlands)",
          "Grand Place (Belgium)",

          // Southern Europe
          "Colosseum (Italy)",
          "Roman Forum (Italy)",
          "Pantheon (Italy)",
          "Vatican City & St. Peter’s Basilica",
          "Leaning Tower of Pisa (Italy)",
          "Venice Canals (Italy)",
          "Pompeii (Italy)",
          "Acropolis of Athens (Greece)",
          "Parthenon (Greece)",
          "Meteora Monasteries (Greece)",
          "Alhambra (Spain)",
          "Sagrada Família (Spain)",
          "Park Güell (Spain)",
          "Historic Center of Seville (Spain)",
          "Mezquita of Córdoba (Spain)",
          "Dubrovnik Old Town (Croatia)",
          "Plitvice Lakes National Park (Croatia)",

          // Central Europe
          "Neuschwanstein Castle (Germany)",
          "Brandenburg Gate (Germany)",
          "Cologne Cathedral (Germany)",
          "Prague Castle (Czech Republic)",
          "Charles Bridge (Czech Republic)",
          "Old Town Square, Prague (Czech Republic)",
          "Schönbrunn Palace (Austria)",
          "Hallstatt Village (Austria)",
          "Buda Castle (Hungary)",
          "Chain Bridge (Hungary)",
          "Wawel Castle (Poland)",
          "Auschwitz-Birkenau Memorial (Poland)",

          // Northern Europe
          "Norwegian Fjords",
          "Geirangerfjord (Norway)",
          "Preikestolen (Norway)",
          "Ice Hotel, Jukkasjärvi (Sweden)",
          "Gamla Stan, Stockholm (Sweden)",
          "Tivoli Gardens (Denmark)",
          "Nyhavn Harbor (Denmark)",
          "Helsinki Cathedral (Finland)",
          "Suomenlinna Fortress (Finland)",

          // Eastern Europe & Balkans
          "Kremlin & Red Square (Russia)",
          "St. Basil’s Cathedral (Russia)",
          "Hermitage Museum (Russia)",
          "Transfăgărășan Highway (Romania)",
          "Bran Castle (Romania)",
          "Rila Monastery (Bulgaria)",
          "Kotor Old Town (Montenegro)",
          "Bay of Kotor (Montenegro)",
          "Lake Bled (Slovenia)",
          "Ljubljana Old Town (Slovenia)",

          // Geographic Regions
          "Alps Mountain Range",
          "Pyrenees",
          "Carpathian Mountains",
          "Black Forest (Germany)",
          "Loch Ness (Scotland)",
          "Danube River",
          "Rhine River",
          "Mediterranean Coast",
          "Baltic Sea Coast",
        ],
      },
      Asia: {
        countries: [
          "Afghanistan",
          "Armenia",
          "Azerbaijan",
          "Bahrain",
          "Bangladesh",
          "Bhutan",
          "Brunei",
          "Cambodia",
          "China",
          "Cyprus",
          "Georgia",
          "India",
          "Indonesia",
          "Iran",
          "Iraq",
          "Israel",
          "Japan",
          "Jordan",
          "Kazakhstan",
          "Kuwait",
          "Kyrgyzstan",
          "Laos",
          "Lebanon",
          "Malaysia",
          "Maldives",
          "Mongolia",
          "Myanmar",
          "Nepal",
          "North Korea",
          "Oman",
          "Pakistan",
          "Philippines",
          "Qatar",
          "Saudi Arabia",
          "Singapore",
          "South Korea",
          "Sri Lanka",
          "Syria",
          "Tajikistan",
          "Thailand",
          "Timor-Leste",
          "Turkey",
          "Turkmenistan",
          "United Arab Emirates",
          "Uzbekistan",
          "Vietnam",
          "Yemen",
        ],
        cities: [
          // Afghanistan
          "Kabul",
          "Herat",

          // Armenia
          "Yerevan",
          "Gyumri",

          // Azerbaijan
          "Baku",
          "Ganja",

          // Bahrain
          "Manama",
          "Muharraq",

          // Bangladesh
          "Dhaka",
          "Chittagong",

          // Bhutan
          "Thimphu",
          "Paro",

          // Brunei
          "Bandar Seri Begawan",
          "Kuala Belait",

          // Cambodia
          "Phnom Penh",
          "Siem Reap",

          // China
          "Beijing",
          "Shanghai",

          // Cyprus
          "Nicosia",
          "Limassol",

          // Georgia
          "Tbilisi",
          "Batumi",

          // India
          "New Delhi",
          "Mumbai",

          // Indonesia
          "Jakarta",
          "Surabaya",

          // Iran
          "Tehran",
          "Isfahan",

          // Iraq
          "Baghdad",
          "Basra",

          // Israel
          "Jerusalem",
          "Tel Aviv",

          // Japan
          "Tokyo",
          "Osaka",

          // Jordan
          "Amman",
          "Aqaba",

          // Kazakhstan
          "Astana",
          "Almaty",

          // Kuwait
          "Kuwait City",
          "Al Ahmadi",

          // Kyrgyzstan
          "Bishkek",
          "Osh",

          // Laos
          "Vientiane",
          "Luang Prabang",

          // Lebanon
          "Beirut",
          "Tripoli",

          // Malaysia
          "Kuala Lumpur",
          "Penang",

          // Maldives
          "Malé",
          "Addu City",

          // Mongolia
          "Ulaanbaatar",
          "Darkhan",

          // Myanmar
          "Yangon",
          "Mandalay",

          // Nepal
          "Kathmandu",
          "Pokhara",

          // North Korea
          "Pyongyang",
          "Hamhung",

          // Oman
          "Muscat",
          "Salalah",

          // Pakistan
          "Islamabad",
          "Karachi",

          // Philippines
          "Manila",
          "Cebu City",

          // Qatar
          "Doha",
          "Al Wakrah",

          // Saudi Arabia
          "Riyadh",
          "Jeddah",

          // Singapore
          "Singapore",
          "Jurong",

          // South Korea
          "Seoul",
          "Busan",

          // Sri Lanka
          "Colombo",
          "Kandy",

          // Syria
          "Damascus",
          "Aleppo",

          // Tajikistan
          "Dushanbe",
          "Khujand",

          // Thailand
          "Bangkok",
          "Chiang Mai",

          // Timor-Leste
          "Dili",
          "Baucau",

          // Turkey
          "Istanbul",
          "Ankara",

          // Turkmenistan
          "Ashgabat",
          "Türkmenabat",

          // United Arab Emirates
          "Dubai",
          "Abu Dhabi",

          // Uzbekistan
          "Tashkent",
          "Samarkand",

          // Vietnam
          "Hanoi",
          "Ho Chi Minh City",

          // Yemen
          "Sana'a",
          "Aden",
        ],
        landmarks: [
          // East Asia
          "Great Wall of China", // 1
          "Forbidden City (China)", // 2
          "Terracotta Army (China)", // 3
          "Mount Everest (Nepal/China)", // 4
          "Potala Palace (Tibet)", // 5
          "Mount Fuji (Japan)", // 6
          "Tokyo Metropolitan Area (Japan)", // 7
          "Hiroshima Peace Memorial", // 8
          "Gyeongbokgung Palace (South Korea)", // 9
          "Jeju Island (South Korea)", // 10

          // Southeast Asia
          "Angkor Wat (Cambodia)", // 11
          "Ha Long Bay (Vietnam)", // 12
          "Borobudur (Indonesia)", // 13
          "Prambanan (Indonesia)", // 14
          "Komodo National Park (Indonesia)", // 15
          "Bagan Temples (Myanmar)", // 16
          "Ayutthaya Historical Park (Thailand)", // 17
          "Grand Palace (Thailand)", // 18
          "Phi Phi Islands (Thailand)", // 19
          "Petronas Twin Towers (Malaysia)", // 20
          "Mount Kinabalu (Malaysia)", // 21
          "Singapore Marina Bay", // 22
          "Chocolate Hills (Philippines)", // 23
          "Mayon Volcano (Philippines)", // 24
          "Plain of Jars (Laos)", // 25

          // South Asia
          "Taj Mahal (India)", // 26
          "Varanasi Ghats (India)", // 27
          "Jaipur City Palace (India)", // 28
          "Ellora & Ajanta Caves (India)", // 29
          "Golden Temple (India)", // 30
          "Kaziranga National Park (India)", // 31
          "Sigiriya Rock Fortress (Sri Lanka)", // 32
          "Adam’s Peak (Sri Lanka)", // 33
          "Kathmandu Valley (Nepal)", // 34
          "Paro Taktsang / Tiger’s Nest (Bhutan)", // 35
          "Sundarbans Mangrove Forest", // 36
          "Mohenjo-daro (Pakistan)", // 37
          "Badshahi Mosque (Pakistan)", // 38

          // Central Asia
          "Registan Square (Uzbekistan)", // 39
          "Samarkand Historic Center", // 40
          "Bukhara Old City (Uzbekistan)", // 41
          "Tian Shan Mountains", // 42
          "Issyk-Kul Lake (Kyrgyzstan)", // 43
          "Pamir Mountains (Tajikistan)", // 44
          "Darvaza Gas Crater (Turkmenistan)", // 45
          "Altai Mountains (Mongolia)", // 46
          "Gobi Desert", // 47
          "Orkhon Valley (Mongolia)", // 48

          // Western Asia / Middle East
          "Petra (Jordan)", // 49
          "Wadi Rum (Jordan)", // 50
          "Dead Sea", // 51
          "Jerusalem Old City", // 52
          "Dome of the Rock", // 53
          "Masada (Israel)", // 54
          "Persepolis (Iran)", // 55
          "Naqsh-e Jahan Square (Iran)", // 56
          "Mount Damavand (Iran)", // 57
          "Göbekli Tepe (Turkey)", // 58
          "Hagia Sophia (Turkey)", // 59
          "Cappadocia (Turkey)", // 60
          "Mount Ararat (Turkey)", // 61
          "Mecca (Saudi Arabia)", // 62
          "Medina (Saudi Arabia)", // 63
          "Al-Ula / Hegra (Saudi Arabia)", // 64
          "Burj Khalifa (UAE)", // 65
          "Palm Jumeirah (UAE)", // 66
          "Muscat Old Town (Oman)", // 67
          "Baalbek Ruins (Lebanon)", // 68
          "Cedars of God (Lebanon)", // 69
          "Umayyad Mosque (Syria)", // 70

          // Caucasus
          "Mount Ararat Region", // 71
          "Tbilisi Old Town (Georgia)", // 72
          "Gergeti Trinity Church (Georgia)", // 73
          "Gobustan Rock Art (Azerbaijan)", // 74
          "Lake Sevan (Armenia)", // 75

          // Major Geographic Regions
          "Himalayan Mountain Range", // 76
          "Indus River Valley", // 77
          "Yangtze River", // 78
          "Yellow River (Huang He)", // 79
          "Mekong River", // 80
          "Tigris–Euphrates River Basin", // 81
          "Aral Sea", // 82
          "Caspian Sea Coast", // 83
          "Red Sea Coast", // 84
          "Andaman Sea", // 85

          // Iconic Cities / Cultural Centers
          "Hong Kong Skyline", // 86
          "Shanghai Bund", // 87
          "Kyoto Historic Districts", // 88
          "Seoul Historic Core", // 89
          "Bangkok Old City", // 90
          "Hanoi Old Quarter", // 91
          "Tehran Grand Bazaar", // 92
          "Istanbul Bosphorus", // 93
          "Jerash Ruins (Jordan)", // 94
          "Luxor-Style Nabataean Tombs (Saudi Arabia)", // 95
          "Sapa Rice Terraces (Vietnam)", // 96
          "Banaue Rice Terraces (Philippines)", // 97
          "Mount Sinai (Egypt/Asia)", // 98
          "Socotra Archipelago (Yemen)", // 99
          "Rub' al Khali (Empty Quarter)", // 100
        ],
      },
      Africa: {
        countries: [
          "Algeria",
          "Angola",
          "Benin",
          "Botswana",
          "Burkina Faso",
          "Burundi",
          "Cabo Verde",
          "Cameroon",
          "Central African Republic",
          "Chad",
          "Comoros",
          "Congo",
          "Democratic Republic of the Congo",
          "Djibouti",
          "Egypt",
          "Equatorial Guinea",
          "Eritrea",
          "Eswatini",
          "Ethiopia",
          "Gabon",
          "Gambia",
          "Ghana",
          "Guinea",
          "Guinea-Bissau",
          "Ivory Coast",
          "Kenya",
          "Lesotho",
          "Liberia",
          "Libya",
          "Madagascar",
          "Malawi",
          "Mali",
          "Mauritania",
          "Mauritius",
          "Morocco",
          "Mozambique",
          "Namibia",
          "Niger",
          "Nigeria",
          "Rwanda",
          "Sao Tome and Principe",
          "Senegal",
          "Seychelles",
          "Sierra Leone",
          "Somalia",
          "South Africa",
          "South Sudan",
          "Sudan",
          "Tanzania",
          "Togo",
          "Tunisia",
          "Uganda",
          "Zambia",
          "Zimbabwe",
        ],
        cities: [
          // Algeria
          "Algiers",

          // Angola
          "Luanda",

          // Benin
          "Porto-Novo",

          // Botswana
          "Gaborone",

          // Burkina Faso
          "Ouagadougou",

          // Burundi
          "Gitega",

          // Cabo Verde
          "Praia",

          // Cameroon
          "Yaoundé",

          // Central African Republic
          "Bangui",

          // Chad
          "N'Djamena",

          // Comoros
          "Moroni",

          // Congo (Republic of the)
          "Brazzaville",

          // Democratic Republic of the Congo
          "Kinshasa",

          // Djibouti
          "Djibouti City",

          // Egypt
          "Cairo",
          "Alexandria",

          // Equatorial Guinea
          "Malabo",

          // Eritrea
          "Asmara",

          // Eswatini
          "Mbabane",

          // Ethiopia
          "Addis Ababa",

          // Gabon
          "Libreville",

          // Gambia
          "Banjul",

          // Ghana
          "Accra",
          "Kumasi",

          // Guinea
          "Conakry",

          // Guinea-Bissau
          "Bissau",

          // Ivory Coast
          "Abidjan",

          // Kenya
          "Nairobi",
          "Mombasa",

          // Lesotho
          "Maseru",

          // Liberia
          "Monrovia",

          // Libya
          "Tripoli",
          "Benghazi",

          // Madagascar
          "Antananarivo",

          // Malawi
          "Lilongwe",

          // Mali
          "Bamako",

          // Mauritania
          "Nouakchott",

          // Mauritius
          "Port Louis",

          // Morocco
          "Rabat",
          "Casablanca",

          // Mozambique
          "Maputo",

          // Namibia
          "Windhoek",

          // Niger
          "Niamey",

          // Nigeria
          "Lagos",

          // Rwanda
          "Kigali",

          // Sao Tome and Principe
          "São Tomé",

          // Senegal
          "Dakar",

          // Seychelles
          "Victoria",

          // Sierra Leone
          "Freetown",

          // Somalia
          "Mogadishu",

          // South Africa
          "Johannesburg",
          "Cape Town",

          // South Sudan
          "Juba",

          // Sudan
          "Khartoum",

          // Tanzania
          "Dar es Salaam",

          // Togo
          "Lomé",

          // Tunisia
          "Tunis",

          // Uganda
          "Kampala",

          // Zambia
          "Lusaka",

          // Zimbabwe
          "Harare",
        ],
        landmarks: [
          // North Africa
          "Pyramids of Giza (Egypt)", // 1
          "Great Sphinx of Giza (Egypt)", // 2
          "Valley of the Kings (Egypt)", // 3
          "Karnak Temple Complex (Egypt)", // 4
          "Abu Simbel Temples (Egypt)", // 5
          "Nile River", // 6
          "Sahara Desert", // 7
          "Atlas Mountains", // 8
          "Mount Sinai (Egypt)", // 9
          "Wadi El Hitan – Valley of the Whales (Egypt)", // 10
          "Siwa Oasis (Egypt)", // 11
          "Carthage Ruins (Tunisia)", // 12
          "Amphitheatre of El Djem (Tunisia)", // 13
          "Medina of Tunis (Tunisia)", // 14
          "Great Mosque of Kairouan (Tunisia)", // 15
          "Casbah of Algiers (Algeria)", // 16
          "Tassili n’Ajjer (Algeria)", // 17
          "Hoggar Mountains (Algeria)", // 18
          "Djemila Roman Ruins (Algeria)", // 19
          "Volubilis (Morocco)", // 20
          "Aït Benhaddou (Morocco)", // 21
          "Fes el Bali Medina (Morocco)", // 22
          "Marrakech Medina (Morocco)", // 23
          "Chefchaouen (Morocco)", // 24
          "Mount Toubkal (Morocco)", // 25

          // West Africa
          "Timbuktu (Mali)", // 26
          "Great Mosque of Djenné (Mali)", // 27
          "Dogon Country (Mali)", // 28
          "Bandiagara Escarpment (Mali)", // 29
          "Gorée Island (Senegal)", // 30
          "Saloum Delta (Senegal)", // 31
          "Niokolo-Koba National Park (Senegal)", // 32
          "Djoudj National Bird Sanctuary (Senegal)", // 33
          "Cape Coast Castle (Ghana)", // 34
          "Elmina Castle (Ghana)", // 35
          "Kakum National Park (Ghana)", // 36
          "Mount Nimba (Guinea/Ivory Coast)", // 37
          "Taï National Park (Ivory Coast)", // 38
          "Comoé National Park (Ivory Coast)", // 39
          "Pendjari National Park (Benin)", // 40
          "W National Park (Benin/Niger/Burkina Faso)", // 41

          // Central Africa
          "Virunga National Park (DRC)", // 42
          "Mount Nyiragongo (DRC)", // 43
          "Lake Kivu (Rwanda/DRC)", // 44
          "Bwindi Impenetrable Forest (Uganda)", // 45
          "Rwenzori Mountains (Uganda)", // 46
          "Kasubi Tombs (Uganda)", // 47
          "Mount Elgon (Uganda/Kenya)", // 48
          "Dja Faunal Reserve (Cameroon)", // 49
          "Mount Cameroon", // 50

          // East Africa
          "Mount Kilimanjaro (Tanzania)", // 51
          "Serengeti National Park (Tanzania)", // 52
          "Ngorongoro Crater (Tanzania)", // 53
          "Maasai Mara (Kenya)", // 54
          "Lake Victoria", // 55
          "Mount Kenya", // 56
          "Great Rift Valley", // 57
          "Victoria Falls (Zambia/Zimbabwe)", // 58
          "Lake Malawi", // 59
          "Mount Mulanje (Malawi)", // 60
          "Murchison Falls National Park (Uganda)", // 61
          "Queen Elizabeth National Park (Uganda)", // 62
          "Lalibela Rock-Hewn Churches (Ethiopia)", // 63
          "Simien Mountains (Ethiopia)", // 64
          "Axum Obelisks (Ethiopia)", // 65
          "Blue Nile Falls (Ethiopia)", // 66
          "Danakil Depression (Ethiopia)", // 67
          "Harar Jugol (Ethiopia)", // 68

          // Southern Africa
          "Okavango Delta (Botswana)", // 69
          "Namib Desert (Namibia)", // 70
          "Sossusvlei (Namibia)", // 71
          "Fish River Canyon (Namibia)", // 72
          "Skeleton Coast (Namibia)", // 73
          "Etosha National Park (Namibia)", // 74
          "Spitzkoppe (Namibia)", // 75
          "Table Mountain (South Africa)", // 76
          "Cape of Good Hope (South Africa)", // 77
          "Kruger National Park (South Africa)", // 78
          "Robben Island (South Africa)", // 79
          "Drakensberg Mountains (South Africa)", // 80
          "Blyde River Canyon (South Africa)", // 81
          "iSimangaliso Wetland Park (South Africa)", // 82
          "Cradle of Humankind (South Africa)", // 83
          "Great Zimbabwe Ruins (Zimbabwe)", // 84
          "Matobo Hills (Zimbabwe)", // 85

          // Saharan & Coastal Wonders
          "Richat Structure – Eye of the Sahara (Mauritania)", // 86
          "Banc d’Arguin National Park (Mauritania)", // 87
          "Ténéré Desert (Niger)", // 88
          "Aïr Mountains (Niger)", // 89
          "Sahara Erg Chebbi Dunes (Morocco)", // 90
          "Acacus Mountains (Libya)", // 91
          "Leptis Magna (Libya)", // 92
          "Sabratha Ruins (Libya)", // 93
          "Red Sea Coral Reefs (Egypt/Sudan)", // 94
          "Blue Hole of Dahab (Egypt)", // 95

          // Islands & Indian Ocean
          "Stone Town, Zanzibar (Tanzania)", // 96
          "Kilwa Kisiwani (Tanzania)", // 97
          "Mount Ras Dashen (Ethiopia)", // 98
          "Lake Chad", // 99
          "Lake Turkana (Kenya)", // 100
        ],
      },
      Australia: {
        countries: [
          "Australia",
          "New Zealand",

          // Melanesia
          "Papua New Guinea",
          "Solomon Islands",
          "Vanuatu",
          "Fiji",

          // Polynesia
          "Samoa",
          "Tonga",
          "Tuvalu",

          // Micronesia
          "Kiribati",
          "Nauru",
          "Palau",
          "Micronesia",
          "Marshall Islands",

          // Sometimes grouped with Oceania
          "Timor-Leste",
        ],
        cities: [
          // Australia
          "Sydney",
          "Melbourne",

          // New Zealand
          "Auckland",
          "Wellington",

          // Papua New Guinea
          "Port Moresby",

          // Solomon Islands
          "Honiara",

          // Vanuatu
          "Port Vila",

          // Fiji
          "Suva",
          "Nadi",

          // Samoa
          "Apia",

          // Tonga
          "Nukuʻalofa",

          // Tuvalu
          "Funafuti",

          // Kiribati
          "South Tarawa",

          // Nauru
          "Yaren",

          // Palau
          "Ngerulmud",

          // Micronesia (Federated States of)
          "Palikir",

          // Marshall Islands
          "Majuro",

          // Timor-Leste
          "Dili",
        ],
        landmarks: [
          // Australia
          "Great Barrier Reef",
          "Sydney Opera House",
          "Uluru / Ayers Rock",
          "Kakadu National Park",
          "Daintree Rainforest",
          "Blue Mountains",
          "Great Ocean Road",
          "Twelve Apostles",
          "Fraser Island (K'gari)",
          "Tasmanian Wilderness",
          "Cradle Mountain–Lake St Clair",
          "Kings Canyon",
          "Shark Bay",
          "Ningaloo Reef",
          "Purnululu (Bungle Bungle Range)",
          "Flinders Ranges",
          "Coober Pedy",
          "Barossa Valley",
          "Bondi Beach",
          "Byron Bay",

          // New Zealand
          "Milford Sound / Piopiotahi",
          "Fiordland National Park",
          "Mount Cook / Aoraki",
          "Tongariro National Park",
          "Rotorua Geothermal Area",
          "Lake Taupō",
          "Waitomo Glowworm Caves",
          "Abel Tasman National Park",
          "Fox Glacier",
          "Franz Josef Glacier",
          "Bay of Islands",
          "Wellington Harbor",
          "Hobbiton Movie Set",
          "Kaikōura Coast",

          // Papua New Guinea
          "Kokoda Track",
          "Sepik River",
          "Mount Wilhelm",
          "Tari Basin",

          // Solomon Islands
          "Marovo Lagoon",
          "Guadalcanal WWII Sites",

          // Vanuatu
          "Mount Yasur Volcano",
          "Champagne Beach",

          // Fiji
          "Mamanuca Islands",
          "Yasawa Islands",
          "Coral Coast",

          // Samoa
          "To Sua Ocean Trench",
          "Lalomanu Beach",

          // Tonga
          "Haʻamonga ʻa Maui Trilithon",
          "Vavaʻu Islands",

          // Tuvalu
          "Funafuti Conservation Area",

          // Kiribati
          "Christmas Island (Kiritimati)",
          "Phoenix Islands Protected Area",

          // Nauru
          "Buada Lagoon",

          // Palau
          "Rock Islands Southern Lagoon",
          "Jellyfish Lake",

          // Micronesia (FSM)
          "Nan Madol Ruins",
          "Chuuk Lagoon WWII Wrecks",

          // Marshall Islands
          "Bikini Atoll",
          "Majuro Lagoon",

          // Timor-Leste
          "Atauro Island",
          "Cristo Rei of Dili",

          // Polynesia & Remote Oceanic Geography
          "Pacific Ring of Fire (Oceania)",
          "Coral Sea",
          "Tasman Sea",
          "Great Dividing Range",
          "Southern Alps (New Zealand)",
          "Outback (Australian Interior)",
          "Polynesian Triangle",
          "Micronesian Atolls",
          "Melanesian Archipelago",
        ],
      },
      Antarctica: {
        landmarks: ["Research stations", "Ice shelves", "South Pole"],
      },
    },
    mountains: [
      "Mount Everest",
      "K2",
      "Mount Kilimanjaro",
      "Mount McKinley",
      "Mont Blanc",
    ],
    deserts: [
      "Sahara Desert",
      "Gobi Desert",
      "Mojave Desert",
      "Atacama Desert",
      "Arabian Desert",
    ],
  },

  sports: {
    "team-sports": {
      football: ["NFL teams", "Super Bowl", "Famous players", "Records"],
      basketball: ["NBA teams", "Famous players", "Championships", "Records"],
      baseball: ["MLB teams", "World Series", "Famous players", "Records"],
      soccer: ["World Cup", "Premier League", "La Liga", "Famous players"],
      hockey: ["NHL teams", "Stanley Cup", "Famous players", "Records"],
      other: ["cricket", "rugby", "volleyball", "**"],
    },
    "individual-sports": {
      tennis: ["Grand Slam tournaments", "Famous players", "Records"],
      golf: ["Major tournaments", "Famous players", "Courses"],
      boxing: ["Weight classes", "Famous boxers", "Historic fights"],
      "track-and-field": ["Olympic events", "World records", "Famous athletes"],
      swimming: ["Olympic events", "World records", "Famous swimmers"],
      equestrian: ["**"],
    },
    olympics: [
      "Summer Olympics",
      "Winter Olympics",
      "Olympic records",
      "Host cities",
    ],
    wrestling: [
      "WWE",
      "Famous wrestlers",
      "Championships",
      "Events",
      "attitude era",
      "**",
    ],
    motorsports: ["Formula 1", "NASCAR", "MotoGP", "Famous drivers/riders"],
    fitness: ["workout equipment", "nutrition", "routines", "**"],
  },
  media: {
    movies: {
      genres: [
        "Action",
        "Comedy",
        "Drama",
        "Science Fiction",
        "Horror",
        "Romance",
      ],
      "classic-films": [
        "Casablanca",
        "Gone with the Wind",
        "The Godfather",
        "Citizen Kane",
      ],
      "modern-films": [
        "The Shawshank Redemption",
        "Inception",
        "The Dark Knight",
        "Pulp Fiction",
      ],
      directors: [
        "Steven Spielberg",
        "Martin Scorsese",
        "Alfred Hitchcock",
        "Christopher Nolan",
      ],
      actors: [
        // Classic Hollywood
        "Marlon Brando",
        "Humphrey Bogart",
        "James Dean",
        "Cary Grant",
        "Clark Gable",
        "Gregory Peck",
        "Spencer Tracy",
        "Charlton Heston",
        "Paul Newman",
        "Robert Mitchum",
        "John Wayne",
        "Sidney Poitier",
        "Audrey Hepburn",
        "Marilyn Monroe",
        "Elizabeth Taylor",
        "Grace Kelly",
        "Ingrid Bergman",
        "Bette Davis",
        "Katharine Hepburn",
        "Vivien Leigh",

        // Late 20th Century Icons
        "Robert De Niro",
        "Al Pacino",
        "Jack Nicholson",
        "Dustin Hoffman",
        "Gene Hackman",
        "Clint Eastwood",
        "Harrison Ford",
        "Michael Douglas",
        "Tom Selleck",
        "Sylvester Stallone",
        "Arnold Schwarzenegger",
        "Bruce Willis",
        "Mel Gibson",
        "Kevin Costner",
        "Sean Connery",
        "Anthony Hopkins",
        "Michael Caine",
        "Patrick Stewart",
        "Ian McKellen",
        "Denzel Washington",

        // Modern Hollywood (1990s–2010s)
        "Tom Hanks",
        "Leonardo DiCaprio",
        "Brad Pitt",
        "Johnny Depp",
        "George Clooney",
        "Matt Damon",
        "Will Smith",
        "Ben Affleck",
        "Christian Bale",
        "Joaquin Phoenix",
        "Robert Downey Jr.",
        "Mark Wahlberg",
        "Keanu Reeves",
        "Hugh Jackman",
        "Ryan Gosling",
        "Ryan Reynolds",
        "Chris Hemsworth",
        "Chris Evans",
        "Chris Pratt",
        "Daniel Craig",

        // Actresses (Modern & Contemporary)
        "Meryl Streep",
        "Julia Roberts",
        "Nicole Kidman",
        "Cate Blanchett",
        "Charlize Theron",
        "Angelina Jolie",
        "Scarlett Johansson",
        "Natalie Portman",
        "Anne Hathaway",
        "Jennifer Lawrence",

        // International & Global Icons
        "Jackie Chan",
        "Bruce Lee",
        "Jet Li",
        "Donnie Yen",
        "Toshiro Mifune",
        "Amitabh Bachchan",
        "Shah Rukh Khan",
        "Irrfan Khan",
        "Jean Reno",
        "Antonio Banderas",
      ],

      awards: ["Academy Awards", "Golden Globes", "Cannes Film Festival"],
      eras: {
        "1890s-1920s": [""],
        "1930s-1950s": [""],
        "1960s-1970s": [""],
        "1980s-1990s": [""],
        "2000s-present": [""],
      },
    },
    television: {
      "classic-shows": [
        "I Love Lucy",
        "The Twilight Zone",
        "M*A*S*H",
        "Cheers",
        "The Andy Griffith Show",
      ],
      "modern-shows": [
        "Breaking Bad",
        "Game of Thrones",
        "The Sopranos",
        "Friends",
        "The Office",
      ],
      "game-shows": [
        "Jeopardy!",
        "Wheel of Fortune",
        "Who Wants to Be a Millionaire",
        "The Price is Right",
      ],
      unscripted: ["reality shows", "documentaries", "**"],
      "talk-shows": [
        "The Tonight Show",
        "Late Show",
        "Late Night",
        "Late Late Show",
        "Tomorrow Show",
        "Ellen DeGeneres Show",
        "daytime talk shows",
        "news programs",
        "**",
      ],
      sitcoms: [
        "Seinfeld",
        "Friends",
        "The Big Bang Theory",
        "How I Met Your Mother",
      ],
      awards: ["Emmy Awards", "Golden Globes"],
      eras: {
        "1950s-1960s": [""],
        "1970s-1980s": [""],
        "1990s-2000s": [""],
        "2010s-present": [""],
      },
      misc: [
        "streaming services",
        "networks",
        "TV executives",
        "tv producers",
        "news broadcasters",
        "channels",
        "channel historys",
        "**",
      ],
    },
    music: {
      genres: [
        "Rock",
        "Pop",
        "Jazz",
        "Classical",
        "Country",
        "Hip Hop",
        "Electronic",
        "**",
      ],
      "classic-artists": [
        "The Beatles",
        "Elvis Presley",
        "Michael Jackson",
        "Madonna",
        "Bob Dylan",
      ],
      "modern-artists": [
        "Taylor Swift",
        "Beyoncé",
        "Drake",
        "Ed Sheeran",
        "Adele",
      ],
      eras: {
        "baroque-classical": [
          "bach",
          "handel",
          "vivaldi",
          "mozart",
          "beethoven",
          "**",
        ],
        "romantic-period": [
          "chopin",
          "liszt",
          "tchaikovsky",
          "brahms",
          "wagner",
          "**",
        ],
        "early-20th-century": ["debussy", "stravinsky", "**"],
        "1920s-1940s": [
          "jazz",
          "blues",
          "big band",
          "swing",
          "classical",
          "**",
        ],
        "1950s-1960s": [
          "rock and roll",
          "motown",
          "folk music revival",
          "pop",
          "country",
          "**",
        ],
        "1970s-1980s": [
          "disco",
          "punk rock",
          "new wave",
          "heavy metal",
          "rock",
          "classic rock",
          "pop",
          "country",
          "**",
        ],
        "1990s-2000s": [
          "grunge",
          "hip hop",
          "pop punk",
          "boy bands",
          "divas",
          "nu-metal",
          "emo",
          "indie rock",
          "pop",
          "rock",
          "country",
          "**",
        ],
        "2010s-2020s": [
          "trap music",
          "EDM",
          "k-pop",
          "hip hop",
          "rock",
          "pop",
          "country",
          "**",
        ],
      },

      instruments: [
        "Piano",
        "Guitar",
        "Drums",
        "Violin",
        "Saxophone",
        "orchestral",
        "**",
      ],
      awards: [
        "Grammy Awards",
        "MTV Video Music Awards",
        "American Music Awards",
        "CMT Music Awards",
      ],
      misc: [
        "music festivals",
        "record labels",
        "music executives",
        "music producers",
        "one-hit wonders",
        "tragedies",
        "charts",
        "**",
      ],
      comedians: [
        // Classic & Early Legends
        "Buster Keaton",
        "Groucho Marx",
        "Lucille Ball",
        "Bob Hope",
        "Lenny Bruce",
        "Richard Pryor",
        "George Carlin",
        "Mel Brooks",
        "Woody Allen",

        // Stand-Up Icons
        "Eddie Murphy",
        "Chris Rock",
        "Jerry Seinfeld",
        "Bill Hicks",
        "Robin Williams",
        "Steve Martin",
        "Dave Chappelle",
        "Louis C.K.",
        "Kevin Hart",
        "Amy Schumer",

        // Film & TV Comedy Stars
        "Jim Carrey",
        "Adam Sandler",
        "Ben Stiller",
        "Will Ferrell",
        "Mike Myers",
        "Dan Aykroyd",
        "Chevy Chase",
        "Bill Murray",
        "Ellen DeGeneres",
        "Tina Fey",

        // Sketch / Ensemble / Modern Era
        "Norm Macdonald",
        "Seth Rogen",
        "Kristen Wiig",
        "Amy Poehler",
        "Conan O'Brien",
        "Stephen Colbert",
        "John Cleese",
        "Ricky Gervais",
        "Rowan Atkinson",
        "Bo Burnham",
        // Stand-Up Legends & Influencers
        "Joan Rivers",
        "Don Rickles",
        "Rodney Dangerfield",
        "Sam Kinison",
        "Bernie Mac",
        "Patrice O'Neal",
        "Mitch Hedberg",
        "Norman Lear",
        "Steven Wright",
        "Gallagher",

        // Film & TV Comedy Icons
        "Peter Sellers",
        "Gene Wilder",
        "John Candy",
        "John Belushi",
        "Gilda Radner",
        "Chris Farley",
        "Martin Short",
        "Steve Carell",
        "Jason Sudeikis",
        "Paul Rudd",

        // British & International Comedy
        "Eric Idle",
        "Michael Palin",
        "Terry Jones",
        "Sacha Baron Cohen",
        "Billy Connolly",
        "Graham Norton",
        "Peter Kay",
        "Russell Brand",
        "Jimmy Carr",
        "Noel Fielding",

        // Modern & Alternative Comedy
        "Sarah Silverman",
        "Ali Wong",
        "Hasan Minhaj",
        "Trevor Noah",
        "Pete Davidson",
        "John Mulaney",
        "Hannibal Buress",
        "Jerrod Carmichael",
        "Tiffany Haddish",
        "Aziz Ansari",
      ],
    },
    "video-games": {
      "classic-games": [
        "Super Mario Bros.",
        "Pac-Man",
        "The Legend of Zelda",
        "Tetris",
        "Pokemon",
      ],
      "modern-games": [
        "Minecraft",
        "Fortnite",
        "Grand Theft Auto V",
        "The Witcher 3",
        "**",
      ],
      consoles: [
        "PlayStation",
        "Xbox",
        "Nintendo Switch",
        "Nintendo",
        "Steam",
        "**",
      ],
    },
    theater: {
      plays: [
        "Hamlet",
        "Macbeth",
        "A Midsummer Night's Dream",
        "Death of a Salesman",
        "The Glass Menagerie",
        "**",
      ],
      musicals: [
        "The Phantom of the Opera",
        "Les Misérables",
        "Hamilton",
        "Wicked",
        "The Lion King",
        "**",
      ],
      playwrights: [
        "William Shakespeare",
        "Arthur Miller",
        "Tennessee Williams",
        "Lorraine Hansberry",
        "August Wilson",
        "**",
      ],
      theaters: [
        "Broadway",
        "West End",
        "Globe Theatre",
        "Sydney Opera House",
        "**",
      ],
      awards: ["Tony Awards", "**"],
    },
    misc: {
      photography: ["famous photographers", "iconic photos", "**"],
      podcasts: ["podcasters", "popular podcasts", "**"],
    },
  },

  history: {
    "ancient-history": {
      civilizations: [
        "Ancient Egypt",
        "Ancient Greece",
        "Roman Empire",
        "Mesopotamia",
        "Ancient China",
      ],
      "historical-figures": [
        "Hammurabi",
        "Imhotep",
        "Akhenaten",
        "Ramesses II",
        "Moses",
        "Confucius",
        "Laozi",
        "Siddhartha Gautama (the Buddha)",
        "Ashoka the Great",
        "Cyrus the Great",
        "Darius I",
        "Pericles",
        "Socrates",
        "Alexander the Great",
        "Augustus Caesar",
      ],
      events: [
        "Founding of Sumerian city-states",
        "Invention of cuneiform writing",
        "Code of Hammurabi",
        "Rise of the Akkadian Empire",
        "Fall of Babylon to the Hittites",

        // Ancient Egypt
        "Unification of Upper and Lower Egypt",
        "Construction of the Great Pyramids of Giza",
        "Development of hieroglyphic writing",
        "Amarna Religious Reforms under Akhenaten",
        "Egyptian New Kingdom expansion",

        // Indus Valley
        "Rise of the Indus Valley Civilization",
        "Urban planning of Mohenjo-daro and Harappa",

        // Ancient China
        "Founding of the Xia Dynasty (traditional)",
        "Shang Dynasty bronze metallurgy",
        "Mandate of Heaven concept",
        "Zhou Dynasty feudal system",
        "Compilation of early Chinese classics",

        // Mediterranean World
        "Minoan Civilization flourishes on Crete",
        "Mycenaean Civilization rise",
        "Trojan War (traditional date)",
        "Greek Dark Age",
        "First Olympic Games",

        // Classical Greece
        "Development of Greek democracy in Athens",
        "Persian Wars",
        "Golden Age of Athens",
        "Peloponnesian War",
        "Death of Alexander the Great",

        // Roman World
        "Founding of Rome (traditional date)",
        "Roman Republic established",
        "Punic Wars",
        "Julius Caesar assassinated",
        "Establishment of the Roman Empire",
        "Pax Romana",

        // Religion & Philosophy
        "Life of the Buddha",
        "Composition of the Upanishads",
        "Teachings of Confucius",
        "Hebrew monotheism develops",
        "Life of Jesus Christ",

        // Late Antiquity
        "Spread of Christianity",
        "Fall of the Western Roman Empire",
      ],
    },
    "modern-history": {
      wars: [
        "American Revolutionary War",
        "French Revolutionary Wars",
        "Napoleonic Wars",
        "American Civil War",
        "Franco-Prussian War",
        "World War I",
        "World War II",
        "Korean War",
        "Vietnam War",
        "Arab–Israeli Wars",
        "Iran–Iraq War",
        "Soviet–Afghan War",
        "Yugoslav Wars",
        "Gulf War",
        "Afghanistan War",
        "Russia–Ukraine War",
      ],
      "historical-figures": [
        // Early Modern Era
        "Martin Luther",
        "Elizabeth I of England",
        "Napoleon Bonaparte",
        "George Washington",
        "Thomas Jefferson",

        // Political & Revolutionary Leaders
        "Abraham Lincoln",
        "Karl Marx",
        "Vladimir Lenin",
        "Mao Zedong",
        "Mustafa Kemal Atatürk",
        "Mahatma Gandhi",
        "Nelson Mandela",
        "Winston Churchill",
        "Franklin D. Roosevelt",
        "Joseph Stalin",

        // Science & Technology
        "Isaac Newton",
        "Galileo Galilei",
        "Charles Darwin",
        "Albert Einstein",
        "Nikola Tesla",
        "Marie Curie",
        "Alan Turing",

        // Economics & Industry
        "Adam Smith",
        "John Maynard Keynes",
        "Henry Ford",

        // Exploration & Empire
        "Christopher Columbus",
        "James Cook",

        // Culture, Philosophy & Thought
        "John Locke",
        "Jean-Jacques Rousseau",
        "Sigmund Freud",
        "Friedrich Nietzsche",

        // Global Religious Influence
        "Joseph Smith",
        "Pope John Paul II",

        // Late 20th / 21st Century
        "Mikhail Gorbachev",
        "Margaret Thatcher",
        "Deng Xiaoping",
      ],
      events: [
        "The Enlightenment",

        // Political & Social Change
        "The Declaration of Independence of the United States",
        "The Abolition of the Transatlantic Slave Trade",
        "The Unification of Italy (1861)",
        "The Unification of Germany (1871)",

        // Industrial & Economic Shifts
        "The Industrial Revolution",
        "The Great Depression (1929)",

        // Science & Technology
        "Invention of the Printing Press",
        "First Human Moon Landing (1969)",
        // Political & Ideological Shifts
        "The Establishment of the United Nations (1945)",
        "The Cold War begins",
        "The Fall of the Berlin Wall (1989)",
        "The Collapse of the Soviet Union (1991)",

        // Civil Rights & Society
        "The Civil Rights Movement in the United States",
        "End of Apartheid in South Africa",

        // Globalization & Recent History
        "The Formation of the European Union",
      ],
    },
    "us-history": {
      figures: ["presidents", "movement leaders", "famous public servants"],
      events: ["Louisiana Purchase"],
      civics: [
        "constitution",
        "bill of rights",
        "branches of government",
        "**",
      ],
      law: ["federal laws", "state laws"],
      politics: [
        "political parties",
        "elections",
        "landmark legislation",
        "supreme court history",
        "**",
      ],
    },
    mythology: {
      greek: ["gods", "heroes", "**"],
      roman: ["gods", "heroes", "**"],
      norse: ["gods", "heroes", "**"],
      egyptian: ["gods", "heroes", "**"],
      hindu: ["gods", "heroes", "**"],
    },
  },

  science: {
    physics: ["laws", "famous physicists", "**"],
    chemistry: [
      "Periodic table",
      "Chemical reactions",
      "Elements",
      "Compounds",
      "**",
    ],
    biology: [
      "Human anatomy",
      "Ecology",
      "Cells",
      "Genetics",
      "Evolution",
      "**",
    ],
    astronomy: [
      "Planets",
      "Stars",
      "Galaxies",
      "Black holes",
      "Solar system",
      "Star constellations",
    ],
    "famous-scientists": [
      "Albert Einstein",
      "Isaac Newton",
      "Marie Curie",
      "Charles Darwin",
      "Stephen Hawking",
      "**",
    ],
    medicine: {
      "medical-conditions": ["diseases", "disorders", "**"],
      "medical-procedures": ["surgeries", "therapies", "**"],
      "famous-medical-figures": [
        "Hippocrates",
        "Florence Nightingale",
        "Louis Pasteur",
        "Alexander Fleming",
        "**",
      ],
      "medical-devices": ["MRI", "X-ray", "stethoscope", "**"],
      pharmaceuticals: ["medicines", "**"],
    },
    metrics: {
      units: ["**"],
      measurements: ["length", "mass", "time", "**"],
    },
    math: {
      "math-concepts": ["algebra", "geometry", "calculus", "**"],
    },
    "earth-science": {
      geology: ["rocks", "minerals", "earthquakes", "**"],
      oceanography: ["currents", "**"],
      meteorology: ["weather", "atmosphere", "storms", "**"],
    },
  },
  humanities: {
    psychology: {
      "psychological-theories": ["cognitive", "behavioral", "**"],
      "famous-psychologists": [
        "Sigmund Freud",
        "Carl Jung",
        "B.F. Skinner",
        "Jean Piaget",
        "**",
      ],
      "mental-health": ["disorders", "therapies", "**"],
    },
    philosophy: {
      "philosophical-branches": ["ethics", "metaphysics", "epistemology", "**"],
      "famous-philosophers": [
        "Socrates",
        "Plato",
        "Aristotle",
        "Immanuel Kant",
        "Friedrich Nietzsche",
        "**",
      ],
      "philosophical-movements": [
        "existentialism",
        "utilitarianism",
        "stoicism",
        "**",
      ],
    },
  },
  technology: {
    inventions: ["**"],
    inventors: ["**"],
    "tech-companies": ["**"],
  },
  products: {
    brands: ["**"],
    gadgets: ["**"],
    toys: ["**"],
    household: ["**"],
    industrial: ["**"],
    "apps-and-software": ["**"],
  },
  literature: {
    "classic-literature": {
      authors: [
        "William Shakespeare",
        "Charles Dickens",
        "Jane Austen",
        "Mark Twain",
        "**",
      ],
      works: [
        "Romeo and Juliet",
        "Pride and Prejudice",
        "To Kill a Mockingbird",
        "1984",
        "**",
      ],
    },
    comics: {
      eras: ["Golden Age", "Silver Age", "Bronze Age", "Modern Age", "**"],
      publishers: ["Marvel", "DC", "Image", "Dark Horse", "**"],
      "newspaper-funnies": ["Peanuts", "Calvin and Hobbes", "Garfield", "**"],
      "famous-creators": [
        "Stan Lee",
        "Jack Kirby",
        "Bob Kane",
        "Will Eisner",
        "Gary Larson",
        "Charles Schulz",
        "**",
      ],
    },
    magazines: ["Time", "National Geographic", "Vogue", "Mad Magazine", "**"],
    "modern-literature": {
      authors: [
        "J.K. Rowling",
        "Stephen King",
        "Dan Brown",
        "John Grisham",
        "**",
      ],
      works: [
        "Harry Potter series",
        "The Da Vinci Code",
        "The Hunger Games",
        "**",
      ],
    },
    poetry: ["Famous poets", "Poetry styles", "Notable poems"],
    awards: ["Nobel Prize in Literature", "Pulitzer Prize"],
  },
  art: {
    "art-movements": [
      "Renaissance",
      "Baroque",
      "Impressionism",
      "Cubism",
      "Surrealism",
    ],
    "famous-artists": [
      "Leonardo da Vinci",
      "Vincent van Gogh",
      "Pablo Picasso",
      "Claude Monet",
      "Frida Kahlo",
      "Salvador Dalí",
      "Andy Warhol",
      "Michelangelo",
      "Rembrandt",
      "**",
    ],
    "art-forms": ["Painting", "Sculpture", "Photography", "Digital Art"],
    museums: ["Louvre", "Metropolitan Museum of Art", "Tate Modern", "Uffizi"],
    dance: [
      "Ballet",
      "Hip Hop",
      "Contemporary",
      "Salsa",
      "Tap Dance",
      "Square Dance",
      "**",
    ],
    performance: ["Theater", "Opera", "Circus Arts", "**"],
  },
  language: ["vocabulary", "idiom", "sayings"],
  "food-and-drink": {
    "world-cuisines": [
      "Italian",
      "French",
      "Chinese",
      "Japanese",
      "Mexican",
      "Indian",
    ],
    "food chains": [
      "McDonald's",
      "Burger King",
      "Starbucks",
      "Subway",
      "KFC",
      "defunct chains",
      "**",
    ],
    recipes: ["entrees", "desserts", "soups", "**"],
    "grocery-products": ["cereal", "**"],
    beverages: ["Coffee", "Tea", "Wine", "Beer", "Cocktails"],
    "famous-chefs": [
      "Gordon Ramsay",
      "Julia Child",
      "Anthony Bourdain",
      "Wolfgang Puck",
    ],
  },
  "pop-culture": {
    celebrities: [
      "Movie stars",
      "Musicians",
      "TV personalities",
      "Social media influencers",
      "Magicians",
      "**",
    ],
    trends: [
      "Fashion trends",
      "Viral moments",
      "Internet memes",
      "fads",
      "dance trends",
    ],
    events: ["dog shows", "conventions", "festivals", "**"],
  },
  finance: [
    "stock market",
    "cryptocurrency",
    "currency",
    "US mint",
    "history",
    "terms",
    "**",
  ],
  nature: {
    animals: ["mammals", "birds", "reptiles", "amphibians", "insects", "**"],
    plants: ["flowers", "trees", "herbs", "fungi", "**"],
    climate: [
      "weather phenomena",
      "clouds",
      "climate zones",
      "natural disasters",
      "**",
    ],
  },
  skills: {
    hobbies: [
      "painting",
      "knitting",
      "gardening",
      "juggling",
      "photography",
      "camping",
      "skateboarding",
      "surfing",
      "yoga",
      "hunting",
      "makeup artistry",
      "martial arts",
      "**",
    ],
    languages: ["Spanish", "French", "Mandarin", "German", "**"],
    games: ["chess", "poker", "board games", "**"],
  },
  collectibles: {
    "trading-cards": ["sports cards", "pokemon cards", "**"],
    stamps: ["historical stamps", "rare stamps", "**"],
    coins: ["ancient coins", "rare coins", "**"],
    antiques: ["furniture", "jewelry", "**"],
    "arms and armor": ["swords", "firearms", "**"],
  },
  transportation: {
    vehicles: ["cars", "motorcycles", "trucks", "bicycles", "**"],
    aircraft: ["airplanes", "helicopters", "**"],
    ships: ["sailboats", "cruise ships", "submarines", "**"],
  },
  places: [
    "mall",
    "zoo",
    "park",
    "beach",
    "restaurant",
    "circus",
    "theme park",
    "amusement park",
    "higher education institutions",
  ],
};

/**
 * Get all leaf categories from the tree
 * A leaf is any array or terminal string value
 */
export function getLeafCategories(
  obj: any = triviaCategories,
  path: string[] = [],
): Array<{ path: string; items: string[] }> {
  const leaves: Array<{ path: string; items: string[] }> = [];

  for (const key in obj) {
    const value = obj[key];
    const currentPath = [...path, key];

    if (Array.isArray(value)) {
      // This is a leaf node
      leaves.push({
        path: currentPath.join("/"),
        items: value,
      });
    } else if (typeof value === "object" && value !== null) {
      // Recurse into nested object
      leaves.push(...getLeafCategories(value, currentPath));
    }
  }

  return leaves;
}

/**
 * Get a random leaf category from the tree
 */
export function getRandomLeafCategory(): { path: string; item: string } {
  const leaves = getLeafCategories(triviaCategories);
  const randomLeaf = leaves[Math.floor(Math.random() * leaves.length)];
  const randomItem =
    randomLeaf.items[Math.floor(Math.random() * randomLeaf.items.length)];

  return {
    path: randomLeaf.path,
    item: randomItem,
  };
}
