// Study resources library.
// track: "foundation" (low level / aptitude) | "upsc" (high level) | "both"
// type: "Website" | "Government" | "News" | "Book" | "Tip"
// Entries without a url are books / study tips.

export const resourceCategories = [
  "All",
  "Polity",
  "History",
  "Geography",
  "Economy",
  "Environment",
  "Science & Tech",
  "CSAT & Aptitude",
  "Current Affairs",
  "Strategy",
];

export const resources = [
  /* ---------------- UPSC: official & government ---------------- */
  { id: "r1", title: "UPSC Official Website", type: "Government", track: "upsc", category: "Strategy", url: "https://upsc.gov.in", description: "Official notifications, exam syllabus, calendar and previous year question papers. Start here." },
  { id: "r2", title: "NCERT Textbooks", type: "Government", track: "both", category: "Strategy", url: "https://ncert.nic.in/textbook.php", description: "Free NCERT textbooks (Class 6-12). The base for History, Geography, Polity, Economy and Science." },
  { id: "r3", title: "PIB - Press Information Bureau", type: "Government", track: "upsc", category: "Current Affairs", url: "https://pib.gov.in", description: "Official government press releases on schemes, policies and international relations." },
  { id: "r4", title: "PRS Legislative Research", type: "Website", track: "upsc", category: "Polity", url: "https://prsindia.org", description: "Bill summaries, Parliament session analysis and policy briefs, ideal for Polity and Governance." },
  { id: "r5", title: "India Code (Constitution & Acts)", type: "Government", track: "upsc", category: "Polity", url: "https://www.indiacode.nic.in", description: "Official repository of Central and State Acts, including the Constitution of India." },
  { id: "r6", title: "Union Budget & Economic Survey", type: "Government", track: "upsc", category: "Economy", url: "https://www.indiabudget.gov.in", description: "Budget documents and the Economic Survey. Essential for Economy in Prelims and Mains." },
  { id: "r7", title: "Reserve Bank of India", type: "Government", track: "upsc", category: "Economy", url: "https://www.rbi.org.in", description: "Monetary policy statements, reports and educational material on banking and finance." },
  { id: "r8", title: "NITI Aayog", type: "Government", track: "upsc", category: "Economy", url: "https://www.niti.gov.in", description: "Policy reports, SDG India Index and flagship initiatives." },
  { id: "r9", title: "Publications Division (Yojana / Kurukshetra)", type: "Government", track: "upsc", category: "Current Affairs", url: "https://www.publicationsdivision.nic.in", description: "Home of Yojana and Kurukshetra magazines, recommended for Mains and Essay." },
  { id: "r10", title: "Sansad TV", type: "Government", track: "upsc", category: "Polity", url: "https://sansadtv.nic.in", description: "Parliamentary proceedings and discussion programmes on governance and policy." },
  { id: "r11", title: "ISRO", type: "Government", track: "upsc", category: "Science & Tech", url: "https://www.isro.gov.in", description: "Missions, launch vehicles and satellite programmes, directly relevant to Science & Tech." },
  { id: "r12", title: "Ministry of Environment, Forest & Climate Change", type: "Government", track: "upsc", category: "Environment", url: "https://moef.gov.in", description: "Environmental laws, protected area information and climate policy." },

  /* ---------------- UPSC: news & websites ---------------- */
  { id: "r13", title: "The Hindu", type: "News", track: "upsc", category: "Current Affairs", url: "https://www.thehindu.com", description: "Daily newspaper widely used for editorials, national and international affairs." },
  { id: "r14", title: "The Indian Express - Explained", type: "News", track: "upsc", category: "Current Affairs", url: "https://indianexpress.com", description: "Explained section breaks down complex issues, useful for Mains answer enrichment." },
  { id: "r15", title: "Down To Earth", type: "News", track: "upsc", category: "Environment", url: "https://www.downtoearth.org.in", description: "Environment, climate and sustainability news and analysis." },

  /* ---------------- UPSC: books ---------------- */
  { id: "r16", title: "Indian Polity - M. Laxmikanth", type: "Book", track: "upsc", category: "Polity", description: "The standard reference for the Constitution, institutions and governance." },
  { id: "r17", title: "A Brief History of Modern India - Rajiv Ahir (Spectrum)", type: "Book", track: "upsc", category: "History", description: "Concise coverage of modern Indian history from 1757 to Independence." },
  { id: "r18", title: "India's Struggle for Independence - Bipan Chandra", type: "Book", track: "upsc", category: "History", description: "In-depth account of the freedom movement." },
  { id: "r19", title: "India's Ancient Past - R. S. Sharma", type: "Book", track: "upsc", category: "History", description: "Ancient India from the Indus Valley to the early medieval period." },
  { id: "r20", title: "Certificate Physical and Human Geography - G. C. Leong", type: "Book", track: "upsc", category: "Geography", description: "Core concepts of physical geography." },
  { id: "r21", title: "Indian Economy - Ramesh Singh", type: "Book", track: "upsc", category: "Economy", description: "Popular standard text covering basic and Indian economy concepts." },
  { id: "r22", title: "Environment - Shankar IAS Academy", type: "Book", track: "upsc", category: "Environment", description: "Concise reference on ecology, biodiversity, conventions and policies." },
  { id: "r23", title: "Indian Art and Culture - Nitin Singhania", type: "Book", track: "upsc", category: "History", description: "Architecture, painting, music, dance and literature for Prelims and Mains." },

  /* ---------------- UPSC: strategy tips ---------------- */
  { id: "r24", title: "Solve previous year papers early", type: "Tip", track: "upsc", category: "Strategy", description: "Solve at least the last 10 years of Prelims papers to understand the question style, then build your notes around it." },
  { id: "r25", title: "Revise at least three times", type: "Tip", track: "upsc", category: "Strategy", description: "Keep a short, single set of notes per subject and revise it multiple times rather than reading many sources once." },
  { id: "r26", title: "Daily newspaper routine", type: "Tip", track: "upsc", category: "Current Affairs", description: "Spend 60-90 minutes daily. Note only topics linked to the syllabus, and link each one to a static topic." },
  { id: "r27", title: "Start answer writing early", type: "Tip", track: "upsc", category: "Strategy", description: "Practise writing 150-250 word answers within time limits. Structure: intro, body with headings, brief conclusion." },
  { id: "r28", title: "Learn the elimination technique", type: "Tip", track: "upsc", category: "Strategy", description: "In statement-based questions, find one statement you are sure is wrong or right to eliminate options quickly." },

  /* ---------------- Foundation / Aptitude ---------------- */
  { id: "r29", title: "Khan Academy - Math", type: "Website", track: "foundation", category: "CSAT & Aptitude", url: "https://www.khanacademy.org/math", description: "Free video lessons and exercises to strengthen arithmetic, percentages, ratios and algebra." },
  { id: "r30", title: "IndiaBIX Aptitude", type: "Website", track: "foundation", category: "CSAT & Aptitude", url: "https://www.indiabix.com", description: "Topic-wise aptitude questions with explanations for practice." },
  { id: "r31", title: "Math Is Fun", type: "Website", track: "foundation", category: "CSAT & Aptitude", url: "https://www.mathsisfun.com", description: "Simple explanations of mathematical concepts in plain language." },
  { id: "r32", title: "GeeksforGeeks", type: "Website", track: "foundation", category: "CSAT & Aptitude", url: "https://www.geeksforgeeks.org", description: "Aptitude, logical reasoning and quantitative practice articles." },
  { id: "r33", title: "Quantitative Aptitude - R. S. Aggarwal", type: "Book", track: "foundation", category: "CSAT & Aptitude", description: "Large practice-oriented book covering all common aptitude topics." },
  { id: "r34", title: "Quantitative Aptitude - Arun Sharma", type: "Book", track: "foundation", category: "CSAT & Aptitude", description: "Graded questions that move from basic to difficult." },
  { id: "r35", title: "Memorise key tables and fractions", type: "Tip", track: "foundation", category: "CSAT & Aptitude", description: "Learn tables to 20, squares to 30, cubes to 15 and fraction-percent equivalents (1/8 = 12.5%, 1/7 = 14.28%) for faster calculation." },
  { id: "r36", title: "Practise with a timer", type: "Tip", track: "foundation", category: "CSAT & Aptitude", description: "Give yourself a fixed time per question, then compare it with your actual time in the practice mode of this app." },

  /* ---------------- CSAT for UPSC ---------------- */
  { id: "r37", title: "CSAT is qualifying: aim for 33%+ safely", type: "Tip", track: "upsc", category: "CSAT & Aptitude", description: "CSAT (Paper II) only needs 33% to qualify, but marks are not counted for ranking. Practise regularly so it never blocks your result." },
  { id: "r38", title: "Practise comprehension daily", type: "Tip", track: "upsc", category: "CSAT & Aptitude", description: "Read 2-3 passages a day and attempt questions. Answer from the passage only, not from outside knowledge." },
];
