import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

export interface SeedProfile {
  id: string;
  name: string;
  age: number;
  photoUrl: string;
  bio: string;
  city: string;
  college: string;
  interests: string[];
  likedCurrentUser: boolean;
}

export const mockProfiles: SeedProfile[] = [
  {
    id: "prof_001",
    name: "Maya Lin",
    age: 22,
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    bio: "Architecture major obsessed with brutalist buildings, pour-over coffee, and 35mm film photography. Probably wandering an art gallery right now.",
    city: "New York",
    college: "Columbia University",
    interests: ["Architecture", "Film Photography", "Coffee", "Art Galleries"],
    likedCurrentUser: true,
  },
  {
    id: "prof_002",
    name: "Liam Chen",
    age: 24,
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    bio: "Finishing my CS master's. When not training neural nets, I'm boulder climbing or hunting down the best soup dumplings in Chinatown.",
    city: "San Francisco",
    college: "UC Berkeley",
    interests: ["Bouldering", "Dim Sum", "Machine Learning", "Indie Pop"],
    likedCurrentUser: false,
  },
  {
    id: "prof_003",
    name: "Sophia Rodriguez",
    age: 23,
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    bio: "Journalism grad student with a podcast about urban folklore. Let's debate playlist curation and whether pineapple belongs on pizza (it does).",
    city: "Boston",
    college: "Boston University",
    interests: ["Podcasts", "Journalism", "Vinyl Records", "Thrifting"],
    likedCurrentUser: true,
  },
  {
    id: "prof_004",
    name: "Marcus Taylor",
    age: 25,
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    bio: "Jazz saxophonist by night, high school physics teacher by day. Looking for someone to explore underground live music venues with.",
    city: "Chicago",
    college: "Northwestern University",
    interests: ["Jazz", "Physics", "Live Music", "Cycling"],
    likedCurrentUser: false,
  },
  {
    id: "prof_005",
    name: "Priya Patel",
    age: 21,
    photoUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    bio: "Pre-med student surviving on cold brew and optimism. Passionate about global health, classical Bharatanatyam dance, and dogs in sweaters.",
    city: "Austin",
    college: "UT Austin",
    interests: ["Medicine", "Dance", "Dogs", "Hiking"],
    likedCurrentUser: true,
  },
  {
    id: "prof_006",
    name: "Jordan Lee",
    age: 24,
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    bio: "Product designer into sustainable fashion and retro gaming. Always down for late-night ramen runs or a quick Mario Kart tournament.",
    city: "Seattle",
    college: "University of Washington",
    interests: ["UI/UX", "Retro Gaming", "Ramen", "Thrifting"],
    likedCurrentUser: false,
  },
  {
    id: "prof_007",
    name: "Elena Rostova",
    age: 22,
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    bio: "Comparative literature major. My apartment looks like a botanical garden crossed with an antiquarian bookstore. Tell me your favorite book.",
    city: "New York",
    college: "NYU",
    interests: ["Literature", "Houseplants", "Museums", "Baking"],
    likedCurrentUser: true,
  },
  {
    id: "prof_008",
    name: "Ethan Brooks",
    age: 26,
    photoUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
    bio: "Environmental scientist working on marine conservation. I spend weekends surfing the Pacific or attempting sourdough bread with varying success.",
    city: "Los Angeles",
    college: "UCLA",
    interests: ["Surfing", "Marine Biology", "Sourdough", "Ocean Conservation"],
    likedCurrentUser: false,
  },
  {
    id: "prof_009",
    name: "Zara Al-Mansoor",
    age: 23,
    photoUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
    bio: "Bioinformatics researcher with an unhealthy matcha obsession. In my downtime, I paint watercolors and practice competitive archery.",
    city: "Boston",
    college: "Harvard University",
    interests: ["Matcha", "Watercolor", "Archery", "Genomics"],
    likedCurrentUser: true,
  },
  {
    id: "prof_010",
    name: "Alex Rivera",
    age: 24,
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    bio: "Culinary arts student and aspiring pastry chef. I express affection exclusively through freshly baked cardamom buns and tiramisu.",
    city: "Chicago",
    college: "The Culinary Institute",
    interests: ["Baking", "Pastry", "Italian Cuisine", "Food Photography"],
    likedCurrentUser: false,
  },
  {
    id: "prof_011",
    name: "Chloe Martin",
    age: 21,
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    bio: "Film studies major directing my first short indie documentary. Let's talk A24 movies, Wes Anderson color palettes, and film scores.",
    city: "Los Angeles",
    college: "USC",
    interests: ["Cinematography", "A24", "Documentaries", "Screenwriting"],
    likedCurrentUser: true,
  },
  {
    id: "prof_012",
    name: "Daniel Kim",
    age: 25,
    photoUrl: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?auto=format&fit=crop&w=800&q=80",
    bio: "Hardware engineer working on aerospace avionics. Pilot license in training. Love stargazing, board game nights, and specialty filter coffee.",
    city: "Seattle",
    college: "University of Washington",
    interests: ["Aviation", "Board Games", "Astronomy", "Aerospace"],
    likedCurrentUser: false,
  },
  {
    id: "prof_013",
    name: "Olivia Bennett",
    age: 22,
    photoUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    bio: "Graphic designer and ceramicist. Half my clothes are permanently speckled with clay dust. Looking for a museum buddy and coffee partner.",
    city: "San Francisco",
    college: "California College of the Arts",
    interests: ["Ceramics", "Typography", "Art Exhibitions", "Espresso"],
    likedCurrentUser: true,
  },
  {
    id: "prof_014",
    name: "Noah Vance",
    age: 23,
    photoUrl: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=800&q=80",
    bio: "Economics senior, aspiring diplomat. Speaks four languages, loves street food, backpacking through national parks, and terrible puns.",
    city: "Washington DC",
    college: "Georgetown University",
    interests: ["Diplomacy", "Languages", "Backpacking", "National Parks"],
    likedCurrentUser: false,
  },
  {
    id: "prof_015",
    name: "Aaliyah Khan",
    age: 24,
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    bio: "Human rights law student. Passionate about criminal justice reform, poetry slams, and finding hidden rooftop gardens in the city.",
    city: "New York",
    college: "Columbia Law School",
    interests: ["Law", "Poetry", "Social Justice", "Rooftops"],
    likedCurrentUser: true,
  },
  {
    id: "prof_016",
    name: "Lucas Garcia",
    age: 25,
    photoUrl: "https://images.unsplash.com/photo-1480429370139-e0132c086e2a?auto=format&fit=crop&w=800&q=80",
    bio: "Landscape architect creating green spaces for concrete jungles. Big fan of indie rock, trail running, and spontaneous road trips.",
    city: "Austin",
    college: "UT Austin",
    interests: ["Trail Running", "Indie Rock", "Urbanism", "Camping"],
    likedCurrentUser: false,
  },
  {
    id: "prof_017",
    name: "Isabella Rossi",
    age: 21,
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    bio: "Violinist studying at Juilliard. Passionate about chamber music, thrift store jackets, and espresso martinis. Teach me something I don't know.",
    city: "New York",
    college: "The Juilliard School",
    interests: ["Classical Music", "Violin", "Thrifting", "Cocktails"],
    likedCurrentUser: true,
  },
  {
    id: "prof_018",
    name: "Samira Gomez",
    age: 23,
    photoUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80",
    bio: "Robotics master's student building autonomous drones. Also an amateur marathoner and lover of spicy street tacos.",
    city: "Boston",
    college: "MIT",
    interests: ["Robotics", "Marathons", "Drones", "Tacos"],
    likedCurrentUser: false,
  },
  {
    id: "prof_019",
    name: "Leo Tanaka",
    age: 26,
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    bio: "Venture analyst and amateur mixologist. Big into analog synthesizers, contemporary architecture, and bouldering V6s.",
    city: "San Francisco",
    college: "Stanford University",
    interests: ["Synthesizers", "Mixology", "Bouldering", "Startups"],
    likedCurrentUser: true,
  },
  {
    id: "prof_020",
    name: "Hannah Campbell",
    age: 22,
    photoUrl: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=800&q=80",
    bio: "Veterinary student with a golden retriever puppy who will definitely like you more than I do. Love hiking, paddleboarding, and farmers markets.",
    city: "Denver",
    college: "Colorado State University",
    interests: ["Animals", "Paddleboarding", "Farmers Markets", "Hiking"],
    likedCurrentUser: false,
  },
  {
    id: "prof_021",
    name: "David O'Connor",
    age: 25,
    photoUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80",
    bio: "Data journalist turning messy public datasets into compelling interactive stories. Avid cyclist and terrible karaoke singer.",
    city: "Chicago",
    college: "University of Chicago",
    interests: ["Data Visualization", "Cycling", "Karaoke", "Podcasts"],
    likedCurrentUser: false,
  },
  {
    id: "prof_022",
    name: "Grace Liu",
    age: 23,
    photoUrl: "https://images.unsplash.com/photo-1534751516642-a171edd2521d?auto=format&fit=crop&w=800&q=80",
    bio: "Astrophysics PhD student looking at gravitational waves. If we hang out, prepare for random space trivia and telescope nights.",
    city: "Pasadena",
    college: "Caltech",
    interests: ["Astrophysics", "Telescopes", "Sci-Fi", "Board Games"],
    likedCurrentUser: true,
  },
  {
    id: "prof_023",
    name: "Benjamin Hayes",
    age: 24,
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
    bio: "Urban planner working on bike highways and transit equity. Fan of community theater, indie video games, and brewing kombucha.",
    city: "Seattle",
    college: "University of Washington",
    interests: ["Urban Planning", "Cycling", "Theater", "Video Games"],
    likedCurrentUser: false,
  },
  {
    id: "prof_024",
    name: "Zoe Kravitz-Miller",
    age: 22,
    photoUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    bio: "Fashion design student experimenting with upcycled denim and zero-waste textiles. Let's go thrift store hunting this weekend.",
    city: "New York",
    college: "Parsons School of Design",
    interests: ["Fashion", "Upcycling", "Thrifting", "Sewing"],
    likedCurrentUser: true,
  },
  {
    id: "prof_025",
    name: "Julian Scott",
    age: 27,
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    bio: "History teacher and podcast host. Huge trivia nerd. Can explain the entire history of the Byzantine Empire in under ten minutes.",
    city: "Boston",
    college: "Harvard University",
    interests: ["History", "Trivia", "Podcasts", "Museums"],
    likedCurrentUser: false,
  },
  {
    id: "prof_026",
    name: "Natalie Chen",
    age: 21,
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    bio: "Cognitive science major researching human-AI interaction. Coffee snob, amateur rock climber, and lover of cozy rainy afternoons.",
    city: "San Francisco",
    college: "UC Berkeley",
    interests: ["Cognitive Science", "Bouldering", "Coffee", "Reading"],
    likedCurrentUser: true,
  },
  {
    id: "prof_027",
    name: "Caleb Miller",
    age: 25,
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    bio: "Brewer and fermentation enthusiast. Currently perfecting a sour beer recipe. Also play bass in a mildly loud post-punk band.",
    city: "Austin",
    college: "UT Austin",
    interests: ["Brewing", "Bass Guitar", "Live Music", "Fermentation"],
    likedCurrentUser: false,
  },
  {
    id: "prof_028",
    name: "Mia Morales",
    age: 23,
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    bio: "Environmental lawyer in training. Love farmer's markets, salsa dancing, and camping in the rain. Tell me your top 3 travel destinations.",
    city: "Miami",
    college: "University of Miami",
    interests: ["Salsa Dancing", "Environmental Law", "Camping", "Travel"],
    likedCurrentUser: true,
  },
  {
    id: "prof_029",
    name: "Tyler Reed",
    age: 24,
    photoUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
    bio: "Sports medicine resident and former college swimmer. Always up for beach volleyball, outdoor concerts, or exploring new brunch spots.",
    city: "San Diego",
    college: "UCSD",
    interests: ["Swimming", "Beach Volleyball", "Sports Medicine", "Live Music"],
    likedCurrentUser: false,
  },
  {
    id: "prof_030",
    name: "Ananya Sharma",
    age: 22,
    photoUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    bio: "Computer Science senior with a minor in French literature. Loves hackathons, croissants, and building silly side projects over the weekend.",
    city: "Toronto",
    college: "University of Toronto",
    interests: ["Coding", "French Literature", "Hackathons", "Croissants"],
    likedCurrentUser: true,
  },
  {
    id: "prof_031",
    name: "Kofi Mensah",
    age: 25,
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    bio: "Renewable energy consultant. Big fan of Afrobeats, Premier League football (Arsenal!), and experimenting with spicy West African recipes.",
    city: "Atlanta",
    college: "Georgia Tech",
    interests: ["Soccer", "Afrobeats", "Renewable Energy", "Cooking"],
    likedCurrentUser: false,
  },
  {
    id: "prof_032",
    name: "Freja Lindqvist",
    age: 23,
    photoUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    bio: "Exchange student studying Scandinavian literature & design. Enthusiast of cold plunges, sauna culture, and cinnamon buns.",
    city: "Chicago",
    college: "University of Chicago",
    interests: ["Design", "Cold Plunge", "Literature", "Sauna"],
    likedCurrentUser: true,
  },
];

async function main() {
  console.log("🌱 Starting idempotent database seed...");

  let createdCount = 0;
  let updatedCount = 0;

  for (const profile of mockProfiles) {
    const data = {
      name: profile.name,
      age: profile.age,
      photoUrl: profile.photoUrl,
      bio: profile.bio,
      city: profile.city,
      college: profile.college,
      interests: JSON.stringify(profile.interests),
      likedCurrentUser: profile.likedCurrentUser,
    };

    const existing = await prisma.profile.findUnique({
      where: { id: profile.id },
    });

    if (existing) {
      await prisma.profile.update({
        where: { id: profile.id },
        data,
      });
      updatedCount++;
    } else {
      await prisma.profile.create({
        data: {
          id: profile.id,
          ...data,
        },
      });
      createdCount++;
    }
  }

  const total = await prisma.profile.count();
  const likedCount = await prisma.profile.count({
    where: { likedCurrentUser: true },
  });

  console.log(`✅ Seed finished successfully!`);
  console.log(`   - Created: ${createdCount} profiles`);
  console.log(`   - Updated: ${updatedCount} profiles`);
  console.log(`   - Total profiles in database: ${total}`);
  console.log(`   - Profiles that liked current user (for mutual match testing): ${likedCount}`);
}

main()
  .catch((e) => {
    console.error("❌ Error during database seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
