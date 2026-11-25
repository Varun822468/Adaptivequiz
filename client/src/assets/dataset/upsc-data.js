// UPSC-level question bank (High Level Preparation)
// Same structure as quiz-data.js: { very_easy, easy, moderate, difficult } -> array of questions
// Compact row format: [question, [options], correctIndex, explanation]

const LEVELS = ["very_easy", "easy", "moderate", "difficult"];

const build = (prefix, data) =>
  Object.fromEntries(
    LEVELS.map((level) => [
      level,
      (data[level] || []).map(([question, options, correct, explanation], i) => ({
        id: `${prefix}-${level}-${i + 1}`,
        question,
        options,
        correct,
        explanation,
        subject: prefix,
      })),
    ])
  );

/* ------------------------------ POLITY ------------------------------ */
export const upscPolityQuestions = build("polity", {
  very_easy: [
    ["Who is known as the Father of the Indian Constitution?", ["Mahatma Gandhi", "B. R. Ambedkar", "Jawaharlal Nehru", "Sardar Patel"], 1, "Dr. B. R. Ambedkar chaired the Drafting Committee of the Constituent Assembly."],
    ["The Constitution of India came into force on:", ["15 August 1947", "26 November 1949", "26 January 1950", "2 October 1950"], 2, "It was adopted on 26 November 1949 and came into effect on 26 January 1950 (Republic Day)."],
    ["Fundamental Rights are contained in which Part of the Constitution?", ["Part II", "Part III", "Part IV", "Part V"], 1, "Part III (Articles 12-35) contains the Fundamental Rights."],
    ["The idea of Directive Principles of State Policy was borrowed from the Constitution of:", ["USA", "Ireland", "Canada", "Australia"], 1, "DPSP were inspired by the Irish Constitution."],
    ["The minimum age to be elected as the President of India is:", ["25 years", "30 years", "35 years", "40 years"], 2, "Article 58 requires a candidate to have completed 35 years of age."],
    ["Who is the ex-officio Chairman of the Rajya Sabha?", ["President", "Vice-President", "Prime Minister", "Speaker"], 1, "Under Article 89, the Vice-President is the ex-officio Chairman of the Rajya Sabha."],
  ],
  easy: [
    ["Article 21 of the Constitution deals with:", ["Right to equality", "Protection of life and personal liberty", "Freedom of speech", "Right to constitutional remedies"], 1, "Article 21: No person shall be deprived of life or personal liberty except by procedure established by law."],
    ["Which Article abolishes untouchability?", ["Article 14", "Article 15", "Article 17", "Article 19"], 2, "Article 17 abolishes untouchability and forbids its practice in any form."],
    ["Which Schedule of the Constitution contains the list of recognised languages?", ["Sixth", "Seventh", "Eighth", "Ninth"], 2, "The Eighth Schedule lists the official languages recognised by the Constitution."],
    ["The words 'Socialist' and 'Secular' were added to the Preamble by which Amendment?", ["24th", "42nd", "44th", "61st"], 1, "The 42nd Amendment Act, 1976 added 'Socialist', 'Secular' and 'Integrity'."],
    ["A Money Bill can be introduced only in:", ["Rajya Sabha", "Lok Sabha", "Either House", "Joint sitting"], 1, "Under Article 110 and 117, a Money Bill can be introduced only in the Lok Sabha."],
    ["Which writ is issued to secure the release of a person who is unlawfully detained?", ["Mandamus", "Habeas Corpus", "Certiorari", "Quo Warranto"], 1, "Habeas Corpus literally means 'to have the body' and tests the legality of detention."],
  ],
  moderate: [
    ["The 73rd Constitutional Amendment Act relates to:", ["Municipalities", "Panchayati Raj", "Anti-defection", "Right to Education"], 1, "The 73rd Amendment (1992) gave constitutional status to Panchayati Raj (Part IX, Eleventh Schedule)."],
    ["The anti-defection law is contained in which Schedule?", ["Eighth", "Ninth", "Tenth", "Eleventh"], 2, "The Tenth Schedule was added by the 52nd Amendment Act, 1985."],
    ["Which of the following is NOT a Fundamental Right at present?", ["Right to Freedom of Religion", "Right to Property", "Cultural and Educational Rights", "Right against Exploitation"], 1, "The Right to Property was removed from Part III by the 44th Amendment (1978); it is now a legal right under Article 300A."],
    ["Dr. Ambedkar described which Article as the 'heart and soul' of the Constitution?", ["Article 14", "Article 19", "Article 21", "Article 32"], 3, "Article 32 (Right to Constitutional Remedies) lets citizens move the Supreme Court for enforcement of Fundamental Rights."],
    ["President's Rule in a State on failure of constitutional machinery is imposed under:", ["Article 352", "Article 356", "Article 360", "Article 370"], 1, "Article 356 deals with failure of constitutional machinery in States; 352 is National Emergency; 360 is Financial Emergency."],
    ["The Finance Commission is constituted under which Article?", ["Article 148", "Article 280", "Article 324", "Article 315"], 1, "Article 280 provides for a Finance Commission every five years."],
  ],
  difficult: [
    ["Consider the following statements about the Preamble:\n1. The Supreme Court in Kesavananda Bharati held it to be a part of the Constitution.\n2. The Preamble has been amended more than once.\n3. The Preamble is a source of power for the legislature.\nWhich of the statements is/are correct?", ["1 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"], 0, "The Preamble has been amended only once (42nd Amendment) and is neither a source of power nor a prohibition on the legislature."],
    ["The doctrine of the 'basic structure' of the Constitution was first propounded in:", ["Golaknath case (1967)", "Kesavananda Bharati case (1973)", "Minerva Mills case (1980)", "S. R. Bommai case (1994)"], 1, "Kesavananda Bharati v. State of Kerala (1973) held that Parliament cannot alter the basic structure."],
    ["Under the 44th Amendment, rights under which Articles cannot be suspended during a National Emergency?", ["Articles 14 and 15", "Articles 19 and 20", "Articles 20 and 21", "Articles 21 and 22"], 2, "Rights under Articles 20 and 21 cannot be suspended even during a National Emergency."],
    ["Consider the following statements about the Rajya Sabha:\n1. Its maximum strength is 250.\n2. It is subject to dissolution by the President.\n3. Representatives of States are elected by elected members of State Legislative Assemblies through proportional representation by single transferable vote.\nWhich of the statements is/are correct?", ["1 only", "1 and 3 only", "2 and 3 only", "1, 2 and 3"], 1, "Rajya Sabha has a maximum of 250 members (238 + 12 nominated) and is a permanent House, not subject to dissolution."],
    ["The 'Doctrine of Pith and Substance' is related to:", ["Distribution of legislative powers between the Centre and States", "Judicial review", "Separation of powers", "Fundamental Duties"], 0, "It is used to determine under which List (Union/State/Concurrent) a law falls when it overlaps."],
    ["Consider the following about the Governor of a State:\n1. He is appointed by the President.\n2. He holds office during the pleasure of the President.\n3. He can be removed through impeachment by the State Legislature.\nWhich of the statements is/are correct?", ["1 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"], 1, "The Governor is appointed by and holds office during the pleasure of the President; there is no impeachment process."],
  ],
});

/* ------------------------------ HISTORY ------------------------------ */
export const upscHistoryQuestions = build("history", {
  very_easy: [
    ["Who founded the Maurya Empire?", ["Ashoka", "Chandragupta Maurya", "Bindusara", "Harshavardhana"], 1, "Chandragupta Maurya founded the empire around 321 BCE with the help of Chanakya."],
    ["The Battle of Plassey was fought in:", ["1757", "1764", "1857", "1761"], 0, "The Battle of Plassey (1757) laid the foundation of British rule in India."],
    ["Who gave the slogan 'Do or Die' during the Quit India Movement?", ["Subhas Chandra Bose", "Mahatma Gandhi", "Jawaharlal Nehru", "Bal Gangadhar Tilak"], 1, "Gandhi gave the call 'Do or Die' in his Quit India speech of 8 August 1942."],
    ["Mohenjo-daro of the Indus Valley Civilisation is located in present-day:", ["India", "Pakistan", "Afghanistan", "Bangladesh"], 1, "Mohenjo-daro is in Sindh province, Pakistan."],
    ["'The Discovery of India' was written by:", ["Jawaharlal Nehru", "Mahatma Gandhi", "Rabindranath Tagore", "S. Radhakrishnan"], 0, "Nehru wrote it in Ahmednagar Fort prison (1944)."],
    ["The Jallianwala Bagh massacre took place in:", ["1857", "1919", "1930", "1942"], 1, "On 13 April 1919 General Dyer ordered firing on a gathering at Amritsar."],
  ],
  easy: [
    ["The Indian National Congress was founded in 1885 with the help of:", ["A. O. Hume", "Dadabhai Naoroji", "B. G. Tilak", "G. K. Gokhale"], 0, "A. O. Hume, a retired British civil servant, helped found it; W. C. Bonnerjee was the first President."],
    ["Most Ashokan Rock Edicts in India were written in which script?", ["Brahmi", "Kharosthi", "Devanagari", "Tamil-Brahmi"], 0, "Brahmi was used for most edicts; Kharosthi in the north-west."],
    ["Fatehpur Sikri was built by:", ["Babur", "Akbar", "Shah Jahan", "Humayun"], 1, "Akbar built Fatehpur Sikri as his capital in the 1570s."],
    ["The Permanent Settlement of Bengal (1793) was introduced by:", ["Warren Hastings", "Lord Cornwallis", "Lord Wellesley", "Lord Dalhousie"], 1, "Cornwallis introduced it, fixing land revenue with zamindars permanently."],
    ["The Subsidiary Alliance system was introduced by:", ["Lord Wellesley", "Lord Cornwallis", "Lord Dalhousie", "Lord Bentinck"], 0, "Wellesley (1798-1805) used it to bring Indian states under British control."],
    ["The Non-Cooperation Movement was launched in:", ["1919", "1920", "1922", "1930"], 1, "Launched in 1920 and withdrawn after the Chauri Chaura incident in 1922."],
  ],
  moderate: [
    ["The Doctrine of Lapse is associated with:", ["Lord Wellesley", "Lord Dalhousie", "Lord Canning", "Lord Curzon"], 1, "Dalhousie annexed states like Satara, Jhansi and Nagpur using this policy."],
    ["The Poona Pact (1932) was signed between:", ["Gandhi and Jinnah", "Gandhi and Ambedkar", "Nehru and Patel", "Tilak and Gokhale"], 1, "It replaced separate electorates for the Depressed Classes with reserved seats in joint electorates."],
    ["Who wrote the Akbarnama?", ["Abul Fazl", "Abdul Qadir Badauni", "Faizi", "Todar Mal"], 0, "Abul Fazl was Akbar's court historian and author of Akbarnama and Ain-i-Akbari."],
    ["The Third Battle of Panipat (1761) was fought between:", ["Marathas and Ahmad Shah Abdali", "Mughals and Marathas", "British and Marathas", "Sikhs and Afghans"], 0, "The Marathas were defeated by Ahmad Shah Abdali's forces."],
    ["The Chinese traveller Fa-Hien visited India during the reign of:", ["Samudragupta", "Chandragupta II", "Skandagupta", "Kumaragupta"], 1, "Fa-Hien visited during Chandragupta II (Vikramaditya)."],
    ["Which of the following was NOT a member of the Cabinet Mission (1946)?", ["Pethick-Lawrence", "Stafford Cripps", "A. V. Alexander", "Lord Mountbatten"], 3, "The Mission had Pethick-Lawrence, Stafford Cripps and A. V. Alexander."],
  ],
  difficult: [
    ["Consider the Mahalwari system:\n1. It was introduced in the North-Western Provinces and Punjab.\n2. Revenue was settled with the village community (mahal).\n3. It was introduced by Lord Cornwallis.\nWhich of the statements is/are correct?", ["1 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"], 1, "Mahalwari came in 1833 under Bentinck; Cornwallis introduced the Permanent Settlement."],
    ["The Satya Shodhak Samaj (1873) was founded by:", ["Raja Ram Mohan Roy", "Jyotiba Phule", "M. G. Ranade", "Swami Vivekananda"], 1, "Jyotiba Phule founded it to promote social equality and attack caste oppression."],
    ["Which of the following was introduced by the Government of India Act, 1935?", ["Dyarchy in the provinces", "Provincial autonomy", "Abolition of separate electorates", "Direct elections to Rajya Sabha"], 1, "The 1935 Act abolished provincial dyarchy and granted provincial autonomy."],
    ["The Uttaramerur inscriptions of the Chola period provide details about:", ["Temple architecture", "Local self-government and election process", "Maritime trade", "Land survey"], 1, "They describe village assembly (sabha) rules, qualifications and election by lot."],
    ["Under the Ryotwari settlement, revenue was settled directly with:", ["Zamindars", "Village communities", "Individual cultivators", "Moneylenders"], 2, "Introduced in Madras and Bombay by Thomas Munro and others."],
    ["Consider the Lucknow Pact (1916):\n1. It was between the Congress and the Muslim League.\n2. The Congress accepted separate electorates for Muslims.\n3. It was reached at the Lucknow session presided over by A. C. Majumdar.\nWhich of the statements is/are correct?", ["1 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"], 3, "All three are correct; the pact marked Congress-League unity in the Home Rule era."],
  ],
});

/* ------------------------------ GEOGRAPHY ------------------------------ */
export const upscGeographyQuestions = build("geography", {
  very_easy: [
    ["Which is the longest river flowing mainly within India?", ["Ganga", "Godavari", "Brahmaputra", "Yamuna"], 0, "The Ganga (about 2,525 km) is the longest river mainly in India."],
    ["Which is the highest peak located entirely within India?", ["Mount Everest", "Kanchenjunga", "Nanda Devi", "K2"], 1, "Kanchenjunga (8,586 m) is the highest peak in India."],
    ["The Tropic of Cancer passes through how many Indian States?", ["6", "8", "10", "12"], 1, "Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram."],
    ["Which is the largest Indian State by area?", ["Rajasthan", "Madhya Pradesh", "Maharashtra", "Uttar Pradesh"], 0, "Rajasthan covers about 3.42 lakh sq km."],
    ["The Western Ghats are also known as:", ["Sahyadri", "Nilgiri", "Satpura", "Aravalli"], 0, "The Western Ghats are called the Sahyadri in Maharashtra."],
    ["Which is the largest ocean in the world?", ["Atlantic", "Indian", "Pacific", "Arctic"], 2, "The Pacific covers about one-third of Earth's surface."],
  ],
  easy: [
    ["Which river is known as the 'Sorrow of Bihar'?", ["Gandak", "Kosi", "Son", "Ghaghara"], 1, "The Kosi frequently floods and changes course."],
    ["Chilika Lake is located in:", ["Odisha", "Andhra Pradesh", "Tamil Nadu", "West Bengal"], 0, "It is a brackish water lagoon in Odisha and a Ramsar site."],
    ["Black soil (regur) is most suited for:", ["Wheat", "Cotton", "Tea", "Jute"], 1, "Black soil is rich in clay and retains moisture, ideal for cotton."],
    ["Which winds bring most of India's annual rainfall?", ["North-east monsoon", "South-west monsoon", "Westerlies", "Trade winds"], 1, "The south-west monsoon (June-September) brings about 75% of rainfall."],
    ["Western Disturbances bring winter rainfall mainly to:", ["South India", "North-West India", "North-East India", "East coast"], 1, "They benefit rabi crops like wheat in north-west India."],
    ["The strait separating India and Sri Lanka is the:", ["Palk Strait", "Strait of Malacca", "Strait of Hormuz", "Bering Strait"], 0, "Palk Strait lies between Tamil Nadu and Sri Lanka."],
  ],
  moderate: [
    ["Which of the following peninsular rivers flows westward through a rift valley?", ["Godavari", "Narmada", "Mahanadi", "Krishna"], 1, "The Narmada flows west into the Arabian Sea through a rift valley."],
    ["Loktak Lake, the largest freshwater lake in North-East India, is in:", ["Assam", "Manipur", "Meghalaya", "Tripura"], 1, "Loktak is in Manipur and famous for its floating phumdis."],
    ["Which of the following is a cold ocean current?", ["Gulf Stream", "Kuroshio", "Labrador Current", "North Atlantic Drift"], 2, "The Labrador Current carries cold Arctic water south."],
    ["The Bab-el-Mandeb strait connects:", ["Red Sea and Gulf of Aden", "Persian Gulf and Arabian Sea", "Mediterranean and Black Sea", "Atlantic and Pacific"], 0, "It lies between Yemen and Djibouti/Eritrea."],
    ["Laterite soils are formed mainly under conditions of:", ["Low rainfall and cold climate", "Heavy rainfall with alternate wet and dry seasons", "Glacial deposition", "River deposition"], 1, "Intense leaching removes silica leaving iron and aluminium-rich soil."],
    ["Which Indian State has the longest coastline?", ["Gujarat", "Andhra Pradesh", "Tamil Nadu", "Maharashtra"], 0, "Gujarat has about 1,600 km of coastline."],
  ],
  difficult: [
    ["Which pair of rivers forms estuaries rather than deltas?", ["Krishna and Godavari", "Narmada and Tapti", "Mahanadi and Kaveri", "Ganga and Brahmaputra"], 1, "West-flowing Narmada and Tapti form estuaries because they flow through rift valleys with steep gradients."],
    ["Due to the Coriolis force, moving air in the Northern Hemisphere is deflected towards the:", ["Left", "Right", "Equator", "Pole"], 1, "In the Northern Hemisphere deflection is to the right; in the Southern, to the left."],
    ["Which pass lies on the Manali-Leh highway?", ["Nathu La", "Baralacha La", "Shipki La", "Banihal"], 1, "Baralacha La is in Himachal Pradesh on the Manali-Leh route."],
    ["Consider the following:\n1. The Western Ghats are more continuous than the Eastern Ghats.\n2. The Western Ghats have a higher average elevation than the Eastern Ghats.\n3. Anamudi is the highest peak of the Eastern Ghats.\nWhich of the statements is/are correct?", ["1 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"], 1, "Anamudi (2,695 m) is in the Western Ghats, not the Eastern Ghats."],
    ["The tallest peak in peninsular India is:", ["Doddabetta", "Anamudi", "Mahendragiri", "Mount Abu"], 1, "Anamudi in the Anamalai Hills, Kerala."],
    ["Which of the following regions does NOT have a Mediterranean climate?", ["California", "Central Chile", "South-West Australia", "Eastern China"], 3, "Mediterranean climate occurs on western margins of continents between about 30-45 degrees latitude."],
  ],
});

/* ------------------------------ ECONOMY ------------------------------ */
export const upscEconomyQuestions = build("economy", {
  very_easy: [
    ["The headquarters of the Reserve Bank of India is in:", ["Mumbai", "Delhi", "Kolkata", "Chennai"], 0, "RBI is headquartered in Mumbai."],
    ["GDP stands for:", ["Gross Domestic Product", "General Development Plan", "Gross Departmental Product", "Government Domestic Policy"], 0, "GDP is the total value of final goods and services produced within a country."],
    ["The Union Budget is presented in Parliament by the:", ["President", "Finance Minister", "Prime Minister", "RBI Governor"], 1, "The Union Finance Minister presents it (Article 112)."],
    ["Currency notes of Rs 2 and above are issued by:", ["Finance Ministry", "Reserve Bank of India", "State Bank of India", "NITI Aayog"], 1, "RBI issues notes; the Government issues Re 1 note and coins."],
    ["Which of the following is an indirect tax?", ["Income tax", "Corporation tax", "GST", "Wealth tax"], 2, "GST is levied on goods and services and passed on to consumers."],
    ["The Planning Commission was replaced in 2015 by:", ["Finance Commission", "NITI Aayog", "Economic Advisory Council", "National Development Council"], 1, "NITI Aayog was set up on 1 January 2015."],
  ],
  easy: [
    ["The repo rate is the rate at which:", ["Commercial banks lend to RBI", "RBI lends short-term to commercial banks", "Banks lend to customers", "RBI lends to the government"], 1, "Repo is the policy rate at which RBI provides short-term liquidity to banks."],
    ["India's monetary policy inflation targeting uses which index?", ["WPI", "CPI (Combined)", "GDP deflator", "IIP"], 1, "RBI targets CPI inflation of 4% with a +/-2% band."],
    ["Fiscal deficit is the excess of total expenditure over:", ["Revenue receipts", "Total receipts excluding borrowings", "Capital receipts", "Tax revenue"], 1, "Fiscal deficit equals total expenditure minus total non-debt receipts."],
    ["Which sector contributes the largest share of India's GVA?", ["Primary", "Secondary", "Services", "Mining"], 2, "The services sector accounts for over half of GVA."],
    ["GST came into effect in India on:", ["1 April 2016", "1 July 2017", "1 January 2018", "1 April 2017"], 1, "The 101st Constitutional Amendment enabled GST from 1 July 2017."],
    ["The Green Revolution in India mainly increased the production of:", ["Pulses", "Wheat and rice", "Oilseeds", "Milk"], 1, "HYV seeds, irrigation and fertilisers boosted wheat and rice."],
  ],
  moderate: [
    ["Which of the following is included in M1 money supply?", ["Time deposits with banks", "Currency with the public", "Post office savings deposits", "Fixed deposits"], 1, "M1 = currency with public + demand deposits + other deposits with RBI."],
    ["The Cash Reserve Ratio (CRR) refers to:", ["Share of NDTL banks keep as cash with RBI", "Share of NDTL invested in government securities", "Interest paid by RBI", "Gold reserves of RBI"], 0, "CRR is the percentage of Net Demand and Time Liabilities kept with RBI in cash."],
    ["The FRBM Act, 2003 primarily aims at:", ["Fiscal discipline and deficit reduction", "Privatisation of PSUs", "Bank recapitalisation", "Boosting foreign trade"], 0, "FRBM sets targets for reducing fiscal deficit and ensuring fiscal prudence."],
    ["Minimum Support Prices (MSP) are announced on the recommendation of:", ["NABARD", "Commission for Agricultural Costs and Prices (CACP)", "NITI Aayog", "FCI"], 1, "CACP recommends MSP for notified crops."],
    ["Which is part of the capital account of India's Balance of Payments?", ["Merchandise exports", "Foreign direct investment", "Private remittances", "Interest income"], 1, "FDI, portfolio investment and external borrowings fall under the capital/financial account."],
    ["Disguised unemployment is most commonly found in:", ["Industry", "Agriculture", "IT sector", "Banking"], 1, "Surplus labour in agriculture adds nothing to output."],
  ],
  difficult: [
    ["Which of the following are quantitative instruments of monetary policy?\n1. CRR\n2. SLR\n3. Open Market Operations\n4. Moral suasion", ["1, 2 and 3 only", "1 and 4 only", "2, 3 and 4 only", "1, 2, 3 and 4"], 0, "Moral suasion is a qualitative tool."],
    ["In 2022, the Standing Deposit Facility (SDF) replaced which as the floor of the LAF corridor?", ["Fixed-rate reverse repo", "Marginal Standing Facility", "Bank rate", "CRR"], 0, "The SDF became the floor of the liquidity adjustment corridor."],
    ["The Laffer Curve depicts the relationship between:", ["Inflation and unemployment", "Tax rates and tax revenue", "Income and consumption", "Interest rates and investment"], 1, "It suggests revenue may fall if tax rates become excessively high."],
    ["A Gini coefficient of 0 indicates:", ["Perfect inequality", "Perfect equality", "High poverty", "Zero growth"], 1, "0 means everyone has the same income; 1 means perfect inequality."],
    ["Stagflation refers to a situation of:", ["High growth and low inflation", "Stagnant growth, high unemployment and high inflation", "Falling prices", "Fixed exchange rates"], 1, "It combines economic stagnation with high inflation."],
    ["India's Wholesale Price Index (WPI) does NOT include:", ["Primary articles", "Fuel and power", "Manufactured products", "Services"], 3, "WPI covers goods only, not services."],
  ],
});

/* ------------------------------ ENVIRONMENT ------------------------------ */
export const upscEnvironmentQuestions = build("environment", {
  very_easy: [
    ["World Environment Day is celebrated on:", ["5 June", "22 April", "16 September", "21 March"], 0, "5 June is World Environment Day (22 April is Earth Day)."],
    ["Which group of chemicals is mainly responsible for ozone layer depletion?", ["CO2", "CFCs", "Methane", "Nitrous oxide"], 1, "Chlorofluorocarbons release chlorine that destroys ozone."],
    ["Project Tiger was launched in:", ["1970", "1973", "1980", "1992"], 1, "Launched in 1973 with Jim Corbett National Park among the first reserves."],
    ["The world's largest mangrove forest, Sundarbans, is located in:", ["Gujarat", "West Bengal and Bangladesh", "Tamil Nadu", "Odisha"], 1, "It lies in the Ganga-Brahmaputra delta."],
    ["India's national aquatic animal is the:", ["Gangetic dolphin", "Olive ridley turtle", "Whale shark", "Saltwater crocodile"], 0, "The Gangetic river dolphin was declared national aquatic animal in 2009."],
    ["The ozone layer is found in which layer of the atmosphere?", ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere"], 1, "The ozone layer lies in the stratosphere."],
  ],
  easy: [
    ["The Ramsar Convention relates to:", ["Wetlands", "Deserts", "Forests", "Glaciers"], 0, "It is a treaty (1971) for conservation of wetlands."],
    ["The Montreal Protocol (1987) concerns:", ["Ozone-depleting substances", "Greenhouse gases", "Biodiversity", "Hazardous waste"], 0, "It phases out substances that deplete the ozone layer."],
    ["Which of the following is a Biosphere Reserve?", ["Nilgiri", "Corbett", "Ranthambore", "Gir"], 0, "Nilgiri was the first biosphere reserve in India (1986)."],
    ["The Wildlife (Protection) Act was enacted in:", ["1972", "1980", "1986", "1992"], 0, "The Wildlife (Protection) Act, 1972."],
    ["Which of the following is NOT a biodiversity hotspot in India?", ["Himalaya", "Indo-Burma", "Western Ghats and Sri Lanka", "Deccan Plateau"], 3, "India's hotspots: Himalaya, Indo-Burma, Western Ghats-Sri Lanka and Sundaland (Nicobar)."],
    ["Acid rain is mainly caused by:", ["CO and CH4", "SO2 and NOx", "CO2 and O3", "CFCs"], 1, "Sulphur and nitrogen oxides form acids in the atmosphere."],
  ],
  moderate: [
    ["The Paris Agreement (2015) aims to limit global warming to well below:", ["1 degree C", "2 degrees C above pre-industrial levels", "3 degrees C", "4 degrees C"], 1, "It aims to hold warming well below 2 degrees C and pursue 1.5 degrees C."],
    ["Trade in endangered species is regulated by:", ["CBD", "CITES", "Ramsar Convention", "Bonn Convention"], 1, "CITES regulates international trade in endangered wild fauna and flora."],
    ["Eutrophication is caused by:", ["Excess heavy metals", "Nutrient enrichment (nitrates, phosphates)", "Oil spills", "Thermal pollution"], 1, "Nutrient enrichment causes algal blooms and oxygen depletion."],
    ["Which body was set up under the Biological Diversity Act, 2002 at the national level?", ["National Biodiversity Authority", "National Green Tribunal", "National Tiger Conservation Authority", "Central Pollution Control Board"], 0, "NBA is headquartered in Chennai."],
    ["The National Green Tribunal was established in:", ["2005", "2010", "2013", "2016"], 1, "NGT was established under the NGT Act, 2010."],
    ["Which of the following is NOT a greenhouse gas?", ["Methane", "Nitrous oxide", "Argon", "Water vapour"], 2, "Argon is a noble gas and does not trap heat."],
  ],
  difficult: [
    ["The Montreux Record is a register of:", ["Ramsar sites facing adverse ecological change", "World Heritage Sites in danger", "Species threatened with extinction", "Biosphere reserves at risk"], 0, "It lists Ramsar wetlands where ecological character has changed or is likely to change."],
    ["Which is the correct order of IUCN threatened categories from highest to lowest risk?", ["Vulnerable, Endangered, Critically Endangered", "Critically Endangered, Endangered, Vulnerable", "Endangered, Critically Endangered, Vulnerable", "Critically Endangered, Vulnerable, Endangered"], 1, "CR > EN > VU."],
    ["Which of the following is an ex-situ conservation method?", ["National park", "Botanical garden", "Biosphere reserve", "Sacred grove"], 1, "Ex-situ conservation is outside natural habitat (zoos, botanical gardens, gene banks)."],
    ["'Blue carbon' refers to carbon captured by:", ["Coastal and marine ecosystems such as mangroves and seagrasses", "Deep ocean fossil fuels", "Atmospheric aerosols", "Polar ice"], 0, "Mangroves, seagrass meadows and salt marshes store large amounts of carbon."],
    ["Biomagnification refers to:", ["Increase in concentration of a toxic substance at successive trophic levels", "Increase in population", "Growth of algae", "Decrease in temperature"], 0, "Persistent pollutants like DDT concentrate higher up the food chain."],
    ["A 'keystone species' is one that:", ["Has a disproportionately large effect on its ecosystem relative to its abundance", "Is the most abundant species", "Is the largest predator", "Is invasive"], 0, "Removal of a keystone species causes major ecosystem changes."],
  ],
});

/* ------------------------------ SCIENCE & TECH ------------------------------ */
export const upscScienceTechQuestions = build("scitech", {
  very_easy: [
    ["ISRO is headquartered in:", ["Bengaluru", "Hyderabad", "Thiruvananthapuram", "Sriharikota"], 0, "ISRO headquarters is in Bengaluru."],
    ["Chandrayaan-3 landed near the Moon's south polar region in:", ["2019", "2021", "2023", "2024"], 2, "Chandrayaan-3 landed on 23 August 2023."],
    ["Which vitamin is synthesised in the skin by sunlight?", ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"], 3, "Sunlight triggers vitamin D synthesis in skin."],
    ["The speed of light in vacuum is approximately:", ["3 x 10^6 m/s", "3 x 10^8 m/s", "3 x 10^10 m/s", "3 x 10^5 m/s"], 1, "It is about 3 x 10^8 m/s."],
    ["The hardest naturally occurring substance is:", ["Diamond", "Graphite", "Quartz", "Steel"], 0, "Diamond ranks 10 on the Mohs scale."],
    ["The largest organ of the human body is the:", ["Liver", "Skin", "Heart", "Lungs"], 1, "The skin is the largest organ."],
  ],
  easy: [
    ["India's first satellite was:", ["Aryabhata", "Bhaskara", "INSAT-1A", "Rohini"], 0, "Aryabhata was launched in 1975."],
    ["The DNA double helix structure was proposed by:", ["Watson and Crick", "Mendel", "Darwin", "Pasteur"], 0, "Watson and Crick proposed it in 1953."],
    ["The SI unit of frequency is:", ["Hertz", "Watt", "Pascal", "Joule"], 0, "Hertz (cycles per second)."],
    ["The pH of pure water at 25 degrees C is:", ["0", "7", "14", "1"], 1, "Pure water is neutral with pH 7."],
    ["Which gas is known as laughing gas?", ["Nitrous oxide", "Carbon monoxide", "Nitrogen dioxide", "Sulphur dioxide"], 0, "N2O is used as a mild anaesthetic."],
    ["Vaccination works mainly by:", ["Killing bacteria directly", "Stimulating the immune response", "Providing antibiotics", "Supplying vitamins"], 1, "Vaccines train the immune system to recognise pathogens."],
  ],
  moderate: [
    ["CRISPR-Cas9 is a technology used for:", ["Genome editing", "Cloning mammals", "Protein sequencing", "Drug delivery only"], 0, "It allows precise editing of DNA sequences."],
    ["NavIC is India's:", ["Regional navigation satellite system", "Earth observation system", "Weather satellite series", "Communication satellite"], 0, "NavIC (Navigation with Indian Constellation) covers India and about 1,500 km around."],
    ["mRNA vaccines work by:", ["Delivering instructions for cells to make an antigen protein", "Injecting weakened virus", "Injecting dead bacteria", "Providing antibodies directly"], 0, "Cells make the viral spike protein which triggers immunity."],
    ["Blockchain technology is based on:", ["Distributed ledger", "Central server", "Analog storage", "Quantum computing"], 0, "Blocks of records are linked cryptographically across many nodes."],
    ["Which of the following diseases is caused by a virus?", ["Tuberculosis", "Malaria", "Dengue", "Cholera"], 2, "Dengue is caused by a flavivirus; TB and cholera by bacteria; malaria by Plasmodium."],
    ["Green hydrogen is produced by:", ["Electrolysis of water using renewable electricity", "Steam reforming of natural gas", "Coal gasification", "Nuclear fission"], 0, "Green hydrogen has no carbon emissions in production."],
  ],
  difficult: [
    ["India's three-stage nuclear power programme was conceived by:", ["Vikram Sarabhai", "Homi J. Bhabha", "A. P. J. Abdul Kalam", "Raja Ramanna"], 1, "Homi Bhabha formulated the programme to use India's thorium reserves."],
    ["The third stage of India's nuclear programme primarily envisages use of:", ["Natural uranium", "Plutonium", "Thorium-Uranium-233 cycle", "Heavy water only"], 2, "Stage 3 uses thorium to breed U-233."],
    ["Consider the following about geostationary satellites:\n1. They orbit about 36,000 km above the equator.\n2. Their orbital period equals Earth's rotation period.\n3. Polar satellites are geostationary.\nWhich of the statements is/are correct?", ["1 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"], 1, "Polar satellites are not geostationary."],
    ["Bt cotton contains a gene from:", ["Bacillus thuringiensis", "Bacillus subtilis", "E. coli", "Agrobacterium"], 0, "The Bt gene produces a protein toxic to certain bollworms."],
    ["The basic unit of quantum information is the:", ["Bit", "Qubit", "Byte", "Photon"], 1, "A qubit can exist in superposition of 0 and 1."],
    ["Aditya-L1 is positioned at:", ["Sun-Earth Lagrange point L1", "Moon's orbit", "Mars orbit", "Geostationary orbit"], 0, "L1 allows continuous observation of the Sun."],
  ],
});

/* ------------------------------ CSAT ------------------------------ */
export const upscCsatQuestions = build("csat", {
  very_easy: [
    ["Find the next number: 2, 4, 8, 16, ?", ["24", "30", "32", "36"], 2, "Each term is multiplied by 2."],
    ["A is taller than B and B is taller than C. Who is the shortest?", ["A", "B", "C", "Cannot say"], 2, "A > B > C so C is the shortest."],
    ["What is the average of 10, 20 and 30?", ["15", "20", "25", "30"], 1, "(10 + 20 + 30)/3 = 20."],
    ["Odd one out: 2, 3, 5, 9, 11", ["2", "3", "9", "11"], 2, "9 is not a prime number."],
    ["A 100 m long train crosses a pole in 10 seconds. Its speed is:", ["10 km/h", "20 km/h", "36 km/h", "40 km/h"], 2, "Speed = 100/10 = 10 m/s = 36 km/h."],
    ["If today is Monday, what day will it be after 10 days?", ["Wednesday", "Thursday", "Friday", "Saturday"], 1, "10 mod 7 = 3, so Monday + 3 = Thursday."],
  ],
  easy: [
    ["Find the next number: 3, 6, 11, 18, 27, ?", ["36", "38", "40", "42"], 1, "Differences 3, 5, 7, 9, so the next difference is 11: 27 + 11 = 38."],
    ["Two numbers are in the ratio 3:5 and their sum is 64. The larger number is:", ["32", "36", "40", "45"], 2, "64 x 5/8 = 40."],
    ["A can do a work in 10 days and B in 15 days. Together they finish in:", ["5 days", "6 days", "7.5 days", "8 days"], 1, "1/10 + 1/15 = 1/6."],
    ["Pointing to a man, a woman says, 'His mother is the only daughter of my mother.' How is the woman related to the man?", ["Mother", "Aunt", "Sister", "Grandmother"], 0, "The only daughter of the woman's mother is the woman herself, so she is his mother."],
    ["All cats are animals. All animals are mortal. Conclusion: All cats are mortal.", ["Definitely true", "Definitely false", "Cannot be determined", "Partly true"], 0, "This follows from a valid syllogism."],
    ["A person walks 3 km north and then 4 km east. How far is he from the starting point?", ["4 km", "5 km", "6 km", "7 km"], 1, "sqrt(3^2 + 4^2) = 5."],
  ],
  moderate: [
    ["The simple interest on Rs 5,000 at 8% per annum for 3 years is:", ["Rs 1,000", "Rs 1,200", "Rs 1,500", "Rs 1,800"], 1, "5000 x 8 x 3 / 100 = 1200."],
    ["A shopkeeper sells an article at 20% profit. If the cost price is Rs 250, the selling price is:", ["Rs 275", "Rs 300", "Rs 310", "Rs 325"], 1, "250 x 1.2 = 300."],
    ["Two fair coins are tossed. The probability of getting at least one head is:", ["1/4", "1/2", "3/4", "1"], 2, "1 - P(no head) = 1 - 1/4 = 3/4."],
    ["The number of distinct arrangements of the letters of 'LEVEL' is:", ["30", "60", "120", "15"], 0, "5!/(2! x 2!) = 30."],
    ["The sum of three consecutive integers is 72. The largest is:", ["24", "25", "26", "27"], 1, "The integers are 23, 24, 25."],
    ["The angle between the hands of a clock at 3:30 is:", ["60 degrees", "75 degrees", "90 degrees", "105 degrees"], 1, "Hour hand at 105 degrees, minute hand at 180 degrees: difference 75 degrees."],
  ],
  difficult: [
    ["A boat's speed in still water is 12 km/h and the stream's speed is 4 km/h. It travels 24 km downstream and returns. Total time taken is:", ["4 hours", "4.5 hours", "5 hours", "5.5 hours"], 1, "24/16 + 24/8 = 1.5 + 3 = 4.5 hours."],
    ["The compound interest on Rs 10,000 at 10% per annum for 2 years is:", ["Rs 2,000", "Rs 2,100", "Rs 2,200", "Rs 2,400"], 1, "10000 x (1.1^2 - 1) = 2100."],
    ["A 40 L mixture has milk and water in the ratio 3:1. How much water must be added to make the ratio 3:2?", ["5 L", "10 L", "15 L", "20 L"], 1, "Milk 30 L, water 10 L. Need water = 20 L so add 10 L."],
    ["In a class of 60, 35 like tea, 30 like coffee and 10 like neither. How many like both?", ["10", "15", "20", "25"], 1, "At least one: 50. Both = 35 + 30 - 50 = 15."],
    ["The average of 5 numbers is 20. If one number is removed, the average becomes 18. The removed number is:", ["24", "26", "28", "30"], 2, "Total 100 - 72 = 28."],
    ["Statements: 1. All bureaucrats are officers. 2. Some officers are writers.\nConclusions: I. Some bureaucrats are writers. II. Some writers are officers.", ["Only I follows", "Only II follows", "Both follow", "Neither follows"], 1, "II is the converse of statement 2. I does not follow."],
  ],
});

/* ------------------------------ MIXED POOL ------------------------------ */
export const upscSubjectBanks = {
  polity: upscPolityQuestions,
  history: upscHistoryQuestions,
  geography: upscGeographyQuestions,
  economy: upscEconomyQuestions,
  environment: upscEnvironmentQuestions,
  scitech: upscScienceTechQuestions,
  csat: upscCsatQuestions,
};

// All subjects merged per difficulty level (for full UPSC mock / mixed practice)
export const upscMixedQuestions = Object.fromEntries(
  LEVELS.map((level) => [
    level,
    Object.values(upscSubjectBanks).flatMap((bank) => bank[level]),
  ])
);

// Flat list of every UPSC question (used by the Daily Challenge)
export const upscAllQuestionsFlat = Object.values(upscSubjectBanks).flatMap(
  (bank) => LEVELS.flatMap((level) => bank[level].map((q) => ({ ...q, difficulty: level })))
);
