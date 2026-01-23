/**
 * Trivia category tree structure
 * Each leaf node represents a specific trivia topic
 * 'topic-extremes' categories focus on superlatives (biggest, smallest, tallest, etc.)
 */

export const triviaCategories = {
  geography: {
    water: {
      oceans: ['Atlantic Ocean', 'Pacific Ocean', 'Indian Ocean', 'Arctic Ocean', 'Southern Ocean'],
      seas: ['Dead Sea', 'Red Sea', 'Mediterranean Sea', 'Caribbean Sea', 'Black Sea', 'Caspian Sea'],
      rivers: ['Amazon River', 'Nile River', 'Mississippi River', 'Yangtze River', 'Danube River'],
      lakes: ['Lake Superior', 'Lake Victoria', 'Great Salt Lake', 'Caspian Sea', 'Lake Baikal'],
      'topic-extremes': [
        'Deepest ocean',
        'Largest ocean',
        'Smallest ocean',
        'Saltiest sea',
        'Longest river',
        'Largest lake'
      ]
    },
    continents: {
      'North America': {
        countries: ['United States', 'Canada', 'Mexico', 'Guatemala', 'Cuba'],
        states: ['California', 'Texas', 'Florida', 'New York', 'Alaska', 'Hawaii', 'Arizona'],
        cities: ['New York City', 'Los Angeles', 'Chicago', 'Toronto', 'Mexico City'],
        'topic-extremes': ['Largest state', 'Smallest state', 'Most populous city', 'Highest point']
      },
      'South America': {
        countries: ['Brazil', 'Argentina', 'Colombia', 'Peru', 'Chile', 'Venezuela'],
        cities: ['São Paulo', 'Buenos Aires', 'Rio de Janeiro', 'Lima', 'Bogotá'],
        landmarks: ['Amazon Rainforest', 'Andes Mountains', 'Machu Picchu', 'Iguazu Falls'],
        'topic-extremes': ['Longest mountain range', 'Largest rainforest', 'Highest waterfall']
      },
      Europe: {
        countries: ['France', 'Germany', 'Italy', 'Spain', 'United Kingdom', 'Greece', 'Poland'],
        cities: ['London', 'Paris', 'Rome', 'Berlin', 'Madrid', 'Athens'],
        landmarks: ['Eiffel Tower', 'Colosseum', 'Big Ben', 'Acropolis', 'Brandenburg Gate'],
        'topic-extremes': ['Smallest country', 'Most visited city', 'Oldest university']
      },
      Asia: {
        countries: ['China', 'India', 'Japan', 'South Korea', 'Thailand', 'Indonesia', 'Vietnam'],
        cities: ['Tokyo', 'Beijing', 'Mumbai', 'Bangkok', 'Seoul', 'Singapore'],
        landmarks: ['Great Wall of China', 'Taj Mahal', 'Mount Everest', 'Angkor Wat'],
        'topic-extremes': ['Highest mountain', 'Most populous country', 'Largest desert']
      },
      Africa: {
        countries: ['Egypt', 'South Africa', 'Nigeria', 'Kenya', 'Morocco', 'Ethiopia'],
        cities: ['Cairo', 'Lagos', 'Johannesburg', 'Nairobi', 'Casablanca'],
        landmarks: ['Pyramids of Giza', 'Mount Kilimanjaro', 'Victoria Falls', 'Sahara Desert'],
        'topic-extremes': ['Largest desert', 'Longest river', 'Tallest mountain in Africa']
      },
      Australia: {
        cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
        landmarks: ['Great Barrier Reef', 'Uluru', 'Sydney Opera House', 'Twelve Apostles'],
        'topic-extremes': ['Largest coral reef', 'Most venomous creatures']
      },
      Antarctica: ['Research stations', 'Ice shelves', 'Wildlife', 'topic-extremes']
    },
    mountains: ['Mount Everest', 'K2', 'Mount Kilimanjaro', 'Mount McKinley', 'Mont Blanc'],
    deserts: ['Sahara Desert', 'Gobi Desert', 'Mojave Desert', 'Atacama Desert', 'Arabian Desert'],
    'topic-extremes': [
      'Tallest mountain',
      'Largest desert',
      'Deepest canyon',
      'Highest waterfall',
      'Largest island'
    ]
  },

  sports: {
    'team-sports': {
      football: ['NFL teams', 'Super Bowl', 'Famous players', 'Records', 'topic-extremes'],
      basketball: ['NBA teams', 'Famous players', 'Championships', 'Records', 'topic-extremes'],
      baseball: ['MLB teams', 'World Series', 'Famous players', 'Records', 'topic-extremes'],
      soccer: ['World Cup', 'Premier League', 'La Liga', 'Famous players', 'topic-extremes'],
      hockey: ['NHL teams', 'Stanley Cup', 'Famous players', 'Records', 'topic-extremes']
    },
    'individual-sports': {
      tennis: ['Grand Slam tournaments', 'Famous players', 'Records', 'topic-extremes'],
      golf: ['Major tournaments', 'Famous players', 'Courses', 'topic-extremes'],
      boxing: ['Weight classes', 'Famous boxers', 'Historic fights', 'topic-extremes'],
      'track-and-field': ['Olympic events', 'World records', 'Famous athletes', 'topic-extremes'],
      swimming: ['Olympic events', 'World records', 'Famous swimmers', 'topic-extremes']
    },
    olympics: ['Summer Olympics', 'Winter Olympics', 'Olympic records', 'Host cities', 'topic-extremes'],
    'topic-extremes': [
      'Longest winning streak',
      'Most championships',
      'Highest scoring game',
      'Fastest record',
      'Most expensive athlete'
    ]
  },

  media: {
    movies: {
      genres: ['Action', 'Comedy', 'Drama', 'Science Fiction', 'Horror', 'Romance'],
      'classic-films': ['Casablanca', 'Gone with the Wind', 'The Godfather', 'Citizen Kane'],
      'modern-films': ['The Shawshank Redemption', 'Inception', 'The Dark Knight', 'Pulp Fiction'],
      directors: ['Steven Spielberg', 'Martin Scorsese', 'Alfred Hitchcock', 'Christopher Nolan'],
      actors: ['Marlon Brando', 'Meryl Streep', 'Tom Hanks', 'Leonardo DiCaprio'],
      awards: ['Academy Awards', 'Golden Globes', 'Cannes Film Festival'],
      'topic-extremes': [
        'Highest grossing film',
        'Most Oscars won',
        'Longest film',
        'Most expensive film'
      ]
    },
    television: {
      'classic-shows': ['I Love Lucy', 'The Twilight Zone', 'M*A*S*H', 'Cheers', 'The Andy Griffith Show'],
      'modern-shows': ['Breaking Bad', 'Game of Thrones', 'The Sopranos', 'Friends', 'The Office'],
      'game-shows': ['Jeopardy!', 'Wheel of Fortune', 'Who Wants to Be a Millionaire', 'The Price is Right'],
      'sitcoms': ['Seinfeld', 'Friends', 'The Big Bang Theory', 'How I Met Your Mother'],
      awards: ['Emmy Awards', 'Golden Globes'],
      'topic-extremes': ['Longest running show', 'Most Emmy wins', 'Highest rated episode']
    },
    music: {
      genres: ['Rock', 'Pop', 'Jazz', 'Classical', 'Country', 'Hip Hop', 'Electronic'],
      'classic-artists': ['The Beatles', 'Elvis Presley', 'Michael Jackson', 'Madonna', 'Bob Dylan'],
      'modern-artists': ['Taylor Swift', 'Beyoncé', 'Drake', 'Ed Sheeran', 'Adele'],
      instruments: ['Piano', 'Guitar', 'Drums', 'Violin', 'Saxophone'],
      awards: ['Grammy Awards', 'MTV Video Music Awards', 'American Music Awards'],
      'topic-extremes': [
        'Best-selling album',
        'Most Grammy wins',
        'Longest charting song',
        'Highest paid musician'
      ]
    },
    'video-games': {
      'classic-games': ['Super Mario Bros.', 'Pac-Man', 'The Legend of Zelda', 'Tetris'],
      'modern-games': ['Minecraft', 'Fortnite', 'Grand Theft Auto V', 'The Witcher 3'],
      consoles: ['PlayStation', 'Xbox', 'Nintendo Switch', 'Steam'],
      'topic-extremes': ['Best-selling game', 'Highest rated game', 'Most expensive game']
    }
  },

  history: {
    'ancient-history': {
      civilizations: ['Ancient Egypt', 'Ancient Greece', 'Roman Empire', 'Mesopotamia', 'Ancient China'],
      'historical-figures': ['Julius Caesar', 'Cleopatra', 'Alexander the Great', 'Socrates'],
      events: ['Battle of Thermopylae', 'Fall of Rome', 'Construction of Pyramids'],
      'topic-extremes': ['Oldest civilization', 'Longest lasting empire', 'Largest ancient structure']
    },
    'modern-history': {
      wars: ['World War I', 'World War II', 'Vietnam War', 'Korean War', 'Gulf War'],
      'historical-figures': ['Winston Churchill', 'Franklin D. Roosevelt', 'Martin Luther King Jr.'],
      events: ['Moon landing', 'Fall of Berlin Wall', 'September 11 attacks'],
      'topic-extremes': ['Deadliest war', 'Longest war', 'Shortest war']
    },
    'us-history': {
      presidents: ['George Washington', 'Abraham Lincoln', 'Theodore Roosevelt', 'John F. Kennedy'],
      events: ['American Revolution', 'Civil War', 'Declaration of Independence'],
      'topic-extremes': ['Youngest president', 'Oldest president', 'Longest serving president']
    }
  },

  science: {
    physics: ['Laws of motion', 'Gravity', 'Quantum mechanics', 'Relativity', 'Energy'],
    chemistry: ['Periodic table', 'Chemical reactions', 'Elements', 'Compounds', 'Acids and bases'],
    biology: ['Evolution', 'Genetics', 'Human anatomy', 'Ecology', 'Cells'],
    astronomy: ['Planets', 'Stars', 'Galaxies', 'Black holes', 'Solar system'],
    'famous-scientists': [
      'Albert Einstein',
      'Isaac Newton',
      'Marie Curie',
      'Charles Darwin',
      'Stephen Hawking'
    ],
    'topic-extremes': [
      'Fastest speed',
      'Heaviest element',
      'Largest star',
      'Smallest particle',
      'Oldest fossil'
    ]
  },

  literature: {
    'classic-literature': {
      authors: ['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'Mark Twain'],
      works: ['Romeo and Juliet', 'Pride and Prejudice', 'To Kill a Mockingbird', '1984'],
      'topic-extremes': ['Longest novel', 'Best-selling book', 'Most translated work']
    },
    'modern-literature': {
      authors: ['J.K. Rowling', 'Stephen King', 'Dan Brown', 'John Grisham'],
      works: ['Harry Potter series', 'The Da Vinci Code', 'The Hunger Games'],
      'topic-extremes': ['Best-selling series', 'Most movie adaptations']
    },
    poetry: ['Famous poets', 'Poetry styles', 'Epic poems'],
    awards: ['Nobel Prize in Literature', 'Pulitzer Prize', 'Man Booker Prize']
  },

  'food-and-drink': {
    'world-cuisines': ['Italian', 'French', 'Chinese', 'Japanese', 'Mexican', 'Indian'],
    beverages: ['Coffee', 'Tea', 'Wine', 'Beer', 'Cocktails'],
    'famous-chefs': ['Gordon Ramsay', 'Julia Child', 'Anthony Bourdain', 'Wolfgang Puck'],
    'topic-extremes': [
      'Spiciest pepper',
      'Most expensive dish',
      'Oldest restaurant',
      'Largest pizza'
    ]
  },

  'pop-culture': {
    celebrities: ['Movie stars', 'Musicians', 'TV personalities', 'Social media influencers'],
    trends: ['Fashion trends', 'Viral moments', 'Internet memes'],
    'topic-extremes': ['Most followed person', 'Most expensive outfit', 'Highest paid celebrity']
  }
};

/**
 * Get all leaf categories from the tree
 * A leaf is any array or terminal string value
 */
export function getLeafCategories(
  obj: any = triviaCategories,
  path: string[] = []
): Array<{ path: string; items: string[] }> {
  const leaves: Array<{ path: string; items: string[] }> = [];

  for (const key in obj) {
    const value = obj[key];
    const currentPath = [...path, key];

    if (Array.isArray(value)) {
      // This is a leaf node
      leaves.push({
        path: currentPath.join('/'),
        items: value
      });
    } else if (typeof value === 'object' && value !== null) {
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
  const randomItem = randomLeaf.items[Math.floor(Math.random() * randomLeaf.items.length)];

  return {
    path: randomLeaf.path,
    item: randomItem
  };
}
