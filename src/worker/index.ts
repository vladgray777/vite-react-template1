import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));


const questions = [
  {
    "id": "Q1",
    "question": "What is the form of government of the United States?",
    "options": [
      "Republic",
      "Monarchy",
      "Constitution-based federal republic",
      "Representative democracy"
    ],
    "correctAnswers": ["Republic", "Constitution-based federal republic", "Representative democracy"]
  },
  {
    "id": "Q2",
    "question": "What is the supreme law of the land?",
    "options": [
      "(U.S.) Constitution",
      "The Bill of Rights",
      "The Declaration of Independence",
      "Federal laws"
    ],
    "correctAnswers": ["(U.S.) Constitution"]
  },
  {
    "id": "Q3",
    "question": "Name one thing the U.S. Constitution does.",
    "options": [
      "Forms the government",
      "Defines powers of government",
      "Protects the rights of the people",
      "Establishes the military"
    ],
    "correctAnswers": ["Forms the government", "Defines powers of government", "Defines the parts of government", "Protects the rights of the people"]
  },
  {
    "id": "Q4",
    "question": "The U.S. Constitution starts with the words 'We the People.' What does 'We the People' mean?",
    "options": [
      "Self-government",
      "Popular sovereignty",
      "Consent of the governed",
      "People should govern themselves"
    ],
    "correctAnswers": ["Self-government", "Popular sovereignty", "Consent of the governed", "People should govern themselves", "(Example of) social contract"]
  },
  {
    "id": "Q5",
    "question": "How are changes made to the U.S. Constitution?",
    "options": [
      "Amendments",
      "The amendment process",
      "By presidential decree",
      "By Supreme Court ruling"
    ],
    "correctAnswers": ["Amendments", "The amendment process"]
  },
  {
    "id": "Q6",
    "question": "What does the Bill of Rights protect?",
    "options": [
      "(The basic) rights of Americans",
      "(The basic) rights of people living in the United States",
      "Property rights",
      "State governments"
    ],
    "correctAnswers": ["(The basic) rights of Americans", "(The basic) rights of people living in the United States"]
  },
  {
    "id": "Q7",
    "question": "How many amendments does the U.S. Constitution have?",
    "options": [
      "27",
      "10",
      "50",
      "13"
    ],
    "correctAnswers": ["27"]
  },
  {
    "id": "Q8",
    "question": "Why is the Declaration of Independence important?",
    "options": [
      "It says America is free from British control.",
      "It says all people are created equal.",
      "It identifies inherent rights.",
      "It identifies individual freedoms."
    ],
    "correctAnswers": ["It says America is free from British control.", "It says all people are created equal.", "It identifies inherent rights.", "It identifies individual freedoms."]
  },
  {
    "id": "Q9",
    "question": "What founding document said the American colonies were free from Britain?",
    "options": [
      "Declaration of Independence",
      "U.S. Constitution",
      "Bill of Rights",
      "Articles of Confederation"
    ],
    "correctAnswers": ["Declaration of Independence"]
  },
  {
    "id": "Q10",
    "question": "Name two important ideas from the Declaration of Independence and the U.S. Constitution.",
    "options": [
      "Equality",
      "Liberty",
      "Social contract",
      "Natural rights"
    ],
    "correctAnswers": ["Equality", "Liberty", "Social contract", "Natural rights", "Limited government", "Self-government"]
  },
  {
    "id": "Q11",
    "question": "The words 'Life, Liberty, and the pursuit of Happiness' are in what founding document?",
    "options": [
      "Declaration of Independence",
      "U.S. Constitution",
      "Bill of Rights",
      "Federalist Papers"
    ],
    "correctAnswers": ["Declaration of Independence"]
  },
  {
    "id": "Q12",
    "question": "What is the economic system of the United States?",
    "options": [
      "Capitalism",
      "Free market economy",
      "Socialism",
      "Communism"
    ],
    "correctAnswers": ["Capitalism", "Free market economy"]
  },
  {
    "id": "Q13",
    "question": "What is the rule of law?",
    "options": [
      "Everyone must follow the law.",
      "Leaders must obey the law.",
      "Government must obey the law.",
      "No one is above the law."
    ],
    "correctAnswers": ["Everyone must follow the law.", "Leaders must obey the law.", "Government must obey the law.", "No one is above the law."]
  },
  {
    "id": "Q14",
    "question": "Many documents influenced the U.S. Constitution. Name one.",
    "options": [
      "Declaration of Independence",
      "Articles of Confederation",
      "Federalist Papers",
      "Mayflower Compact"
    ],
    "correctAnswers": ["Declaration of Independence", "Articles of Confederation", "Federalist Papers", "Anti-Federalist Papers", "Virginia Declaration of Rights", "Fundamental Orders of Connecticut", "Mayflower Compact", "Iroquois Great Law of Peace"]
  },
  {
    "id": "Q15",
    "question": "There are three branches of government. Why?",
    "options": [
      "So one part does not become too powerful",
      "Checks and balances",
      "Separation of powers",
      "To create more jobs"
    ],
    "correctAnswers": ["So one part does not become too powerful", "Checks and balances", "Separation of powers"]
  },
  {
    "id": "Q16",
    "question": "Name the three branches of government.",
    "options": [
      "Legislative, executive, and judicial",
      "Congress, president, and the courts",
      "Federal, state, and local",
      "Senate, House, and President"
    ],
    "correctAnswers": ["Legislative, executive, and judicial", "Congress, president, and the courts"]
  },
  {
    "id": "Q17",
    "question": "The President of the United States is in charge of which branch of government?",
    "options": [
      "Executive branch",
      "Legislative branch",
      "Judicial branch",
      "Military branch"
    ],
    "correctAnswers": ["Executive branch"]
  },
  {
    "id": "Q18",
    "question": "What part of the federal government writes laws?",
    "options": [
      "(U.S.) Congress",
      "(U.S. or national) legislature",
      "Legislative branch",
      "The President"
    ],
    "correctAnswers": ["(U.S.) Congress", "(U.S. or national) legislature", "Legislative branch"]
  },
  {
    "id": "Q19",
    "question": "What are the two parts of the U.S. Congress?",
    "options": [
      "Senate and House (of Representatives)",
      "Democrats and Republicans",
      "Executive and Legislative",
      "Upper and Lower chambers"
    ],
    "correctAnswers": ["Senate and House (of Representatives)"]
  },
  {
    "id": "Q20",
    "question": "Name one power of the U.S. Congress.",
    "options": [
      "Writes laws",
      "Declares war",
      "Makes the federal budget",
      "Appoints judges"
    ],
    "correctAnswers": ["Writes laws", "Declares war", "Makes the federal budget"]
  },
  {
    "id": "Q21",
    "question": "How many U.S. senators are there?",
    "options": [
      "One hundred (100)",
      "Fifty (50)",
      "Four hundred thirty-five (435)",
      "Two (2)"
    ],
    "correctAnswers": ["One hundred (100)"]
  },
  {
    "id": "Q22",
    "question": "How long is a term for a U.S. senator?",
    "options": [
      "Six (6) years",
      "Two (2) years",
      "Four (4) years",
      "Eight (8) years"
    ],
    "correctAnswers": ["Six (6) years"]
  },
  {
    "id": "Q23",
    "question": "Who is one of your state's U.S. senators now?",
    "options": [
      "Answers will vary",
      "Elizabeth Warren",
      "Ed Markey",
      "Bernie Sanders"
    ],
    "correctAnswers": ["Answers will vary"]
  },
  {
    "id": "Q24",
    "question": "How many voting members are in the House of Representatives?",
    "options": [
      "Four hundred thirty-five (435)",
      "One hundred (100)",
      "Fifty (50)",
      "Two hundred (200)"
    ],
    "correctAnswers": ["Four hundred thirty-five (435)"]
  },
  {
    "id": "Q25",
    "question": "How long is a term for a member of the House of Representatives?",
    "options": [
      "Two (2) years",
      "Four (4) years",
      "Six (6) years",
      "One (1) year"
    ],
    "correctAnswers": ["Two (2) years"]
  },
  {
    "id": "Q26",
    "question": "Why do U.S. representatives serve shorter terms than U.S. senators?",
    "options": [
      "To more closely follow public opinion",
      "To save money",
      "To limit their power",
      "To allow more elections"
    ],
    "correctAnswers": ["To more closely follow public opinion"]
  },
  {
    "id": "Q27",
    "question": "How many senators does each state have?",
    "options": [
      "Two (2)",
      "One (1)",
      "Four (4)",
      "It depends on population"
    ],
    "correctAnswers": ["Two (2)"]
  },
  {
    "id": "Q28",
    "question": "Why does each state have two senators?",
    "options": [
      "Equal representation (for small states)",
      "The Great Compromise (Connecticut Compromise)",
      "To balance power",
      "Constitutional requirement"
    ],
    "correctAnswers": ["Equal representation (for small states)", "The Great Compromise (Connecticut Compromise)"]
  },
  {
    "id": "Q29",
    "question": "Name your U.S. representative.",
    "options": [
      "Answers will vary",
      "Nancy Pelosi",
      "Kevin McCarthy",
      "Alexandria Ocasio-Cortez"
    ],
    "correctAnswers": ["Answers will vary"]
  },
  {
    "id": "Q30",
    "question": "What is the name of the Speaker of the House of Representatives now?",
    "options": [
      "Visit uscis.gov/citizenship/testupdates",
      "Mike Johnson",
      "Kevin McCarthy",
      "Nancy Pelosi"
    ],
    "correctAnswers": ["Visit uscis.gov/citizenship/testupdates"]
  },
  {
    "id": "Q31",
    "question": "Who does a U.S. senator represent?",
    "options": [
      "Citizens of their state",
      "People of their state",
      "All Americans",
      "Their political party"
    ],
    "correctAnswers": ["Citizens of their state", "People of their state"]
  },
  {
    "id": "Q32",
    "question": "Who elects U.S. senators?",
    "options": [
      "Citizens from their state",
      "The President",
      "The House of Representatives",
      "State governors"
    ],
    "correctAnswers": ["Citizens from their state"]
  },
  {
    "id": "Q33",
    "question": "Who does a member of the House of Representatives represent?",
    "options": [
      "Citizens in their (congressional) district",
      "People from their (congressional) district",
      "Everyone in their state",
      "All Americans"
    ],
    "correctAnswers": ["Citizens in their (congressional) district", "Citizens in their district", "People from their (congressional) district", "People in their district"]
  },
  {
    "id": "Q34",
    "question": "Who elects members of the House of Representatives?",
    "options": [
      "Citizens from their (congressional) district",
      "The Senate",
      "The President",
      "State legislatures"
    ],
    "correctAnswers": ["Citizens from their (congressional) district"]
  },
  {
    "id": "Q35",
    "question": "Some states have more representatives than other states. Why?",
    "options": [
      "(Because of) the state's population",
      "(Because) they have more people",
      "(Because) some states have more people",
      "Because they are larger"
    ],
    "correctAnswers": ["(Because of) the state's population", "(Because) they have more people", "(Because) some states have more people"]
  },
  {
    "id": "Q36",
    "question": "The President of the United States is elected for how many years?",
    "options": [
      "Four (4) years",
      "Two (2) years",
      "Six (6) years",
      "Eight (8) years"
    ],
    "correctAnswers": ["Four (4) years"]
  },
  {
    "id": "Q37",
    "question": "The President of the United States can serve only two terms. Why?",
    "options": [
      "(Because of) the 22nd Amendment",
      "To keep the president from becoming too powerful",
      "To allow new leadership",
      "Constitutional limit"
    ],
    "correctAnswers": ["(Because of) the 22nd Amendment", "To keep the president from becoming too powerful"]
  },
  {
    "id": "Q38",
    "question": "What is the name of the President of the United States now?",
    "options": [
      "Visit uscis.gov/citizenship/testupdates",
      "Donald Trump",
      "Joe Biden",
      "Barack Obama"
    ],
    "correctAnswers": ["Visit uscis.gov/citizenship/testupdates"]
  },
  {
    "id": "Q39",
    "question": "What is the name of the Vice President of the United States now?",
    "options": [
      "Visit uscis.gov/citizenship/testupdates",
      "JD Vance",
      "Kamala Harris",
      "Mike Pence"
    ],
    "correctAnswers": ["Visit uscis.gov/citizenship/testupdates"]
  },
  {
    "id": "Q40",
    "question": "If the president can no longer serve, who becomes president?",
    "options": [
      "The Vice President (of the United States)",
      "The Speaker of the House",
      "The Secretary of State",
      "The Chief Justice"
    ],
    "correctAnswers": ["The Vice President (of the United States)"]
  },
  {
    "id": "Q41",
    "question": "Name one power of the president.",
    "options": [
      "Signs bills into law",
      "Vetoes bills",
      "Enforces laws",
      "Commander in Chief (of the military)"
    ],
    "correctAnswers": ["Signs bills into law", "Vetoes bills", "Enforces laws", "Commander in Chief (of the military)", "Chief diplomat", "Appoints federal judges"]
  },
  {
    "id": "Q42",
    "question": "Who is Commander in Chief of the U.S. military?",
    "options": [
      "The President (of the United States)",
      "The Secretary of Defense",
      "The Chairman of the Joint Chiefs",
      "The Vice President"
    ],
    "correctAnswers": ["The President (of the United States)"]
  },
  {
    "id": "Q43",
    "question": "Who signs bills to become laws?",
    "options": [
      "The President (of the United States)",
      "The Speaker of the House",
      "The Chief Justice",
      "The Senate Majority Leader"
    ],
    "correctAnswers": ["The President (of the United States)"]
  },
  {
    "id": "Q44",
    "question": "Who vetoes bills?",
    "options": [
      "The President (of the United States)",
      "The Supreme Court",
      "The Senate",
      "The House of Representatives"
    ],
    "correctAnswers": ["The President (of the United States)"]
  },
  {
    "id": "Q45",
    "question": "Who appoints federal judges?",
    "options": [
      "The President (of the United States)",
      "The Senate",
      "The House of Representatives",
      "State governors"
    ],
    "correctAnswers": ["The President (of the United States)"]
  },
  {
    "id": "Q46",
    "question": "The executive branch has many parts. Name one.",
    "options": [
      "President",
      "Cabinet",
      "Federal departments and agencies",
      "Congress"
    ],
    "correctAnswers": ["President", "Cabinet", "Federal departments and agencies"]
  },
  {
    "id": "Q47",
    "question": "What does the President's Cabinet do?",
    "options": [
      "Advises the President (of the United States)",
      "Makes laws",
      "Interprets laws",
      "Approves treaties"
    ],
    "correctAnswers": ["Advises the President (of the United States)"]
  },
  {
    "id": "Q48",
    "question": "What are two Cabinet-level positions?",
    "options": [
      "Secretary of State",
      "Secretary of Defense",
      "Attorney General",
      "Secretary of the Treasury"
    ],
    "correctAnswers": ["Attorney General", "Secretary of Agriculture", "Secretary of Commerce", "Secretary of Education", "Secretary of Energy", "Secretary of Health and Human Services", "Secretary of Homeland Security", "Secretary of Housing and Urban Development", "Secretary of the Interior", "Secretary of Labor", "Secretary of State", "Secretary of Transportation", "Secretary of the Treasury", "Secretary of Veterans Affairs", "Secretary of Defense", "Vice President"]
  },
  {
    "id": "Q49",
    "question": "Why is the Electoral College important?",
    "options": [
      "It decides who is elected president.",
      "It provides a compromise between the popular election of the president and congressional selection.",
      "It gives small states more power",
      "It prevents fraud"
    ],
    "correctAnswers": ["It decides who is elected president.", "It provides a compromise between the popular election of the president and congressional selection."]
  },
  {
    "id": "Q50",
    "question": "What is one part of the judicial branch?",
    "options": [
      "Supreme Court",
      "Federal Courts",
      "Congress",
      "The Cabinet"
    ],
    "correctAnswers": ["Supreme Court", "Federal Courts"]
  },
  {
    "id": "Q51",
    "question": "What does the judicial branch do?",
    "options": [
      "Reviews laws",
      "Explains laws",
      "Resolves disputes (disagreements) about the law",
      "Decides if a law goes against the (U.S.) Constitution"
    ],
    "correctAnswers": ["Reviews laws", "Explains laws", "Resolves disputes (disagreements) about the law", "Decides if a law goes against the (U.S.) Constitution"]
  },
  {
    "id": "Q52",
    "question": "What is the highest court in the United States?",
    "options": [
      "Supreme Court",
      "Federal Court",
      "District Court",
      "Appeals Court"
    ],
    "correctAnswers": ["Supreme Court"]
  },
  {
    "id": "Q53",
    "question": "How many seats are on the Supreme Court?",
    "options": [
      "Nine (9)",
      "Seven (7)",
      "Twelve (12)",
      "Five (5)"
    ],
    "correctAnswers": ["Nine (9)"]
  },
  {
    "id": "Q54",
    "question": "How many Supreme Court justices are usually needed to decide a case?",
    "options": [
      "Five (5)",
      "Nine (9)",
      "Seven (7)",
      "Six (6)"
    ],
    "correctAnswers": ["Five (5)"]
  },
  {
    "id": "Q55",
    "question": "How long do Supreme Court justices serve?",
    "options": [
      "(For) life",
      "Lifetime appointment",
      "(Until) retirement",
      "Ten years"
    ],
    "correctAnswers": ["(For) life", "Lifetime appointment", "(Until) retirement"]
  },
  {
    "id": "Q56",
    "question": "Supreme Court justices serve for life. Why?",
    "options": [
      "To be independent (of politics)",
      "To limit outside (political) influence",
      "To ensure experience",
      "Constitutional requirement"
    ],
    "correctAnswers": ["To be independent (of politics)", "To limit outside (political) influence"]
  },
  {
    "id": "Q57",
    "question": "Who is the Chief Justice of the United States now?",
    "options": [
      "Visit uscis.gov/citizenship/testupdates",
      "John Roberts",
      "Clarence Thomas",
      "Brett Kavanaugh"
    ],
    "correctAnswers": ["Visit uscis.gov/citizenship/testupdates"]
  },
  {
    "id": "Q58",
    "question": "Name one power that is only for the federal government.",
    "options": [
      "Print paper money",
      "Mint coins",
      "Declare war",
      "Create an army"
    ],
    "correctAnswers": ["Print paper money", "Mint coins", "Declare war", "Create an army", "Make treaties", "Set foreign policy"]
  },
  {
    "id": "Q59",
    "question": "Name one power that is only for the states.",
    "options": [
      "Provide schooling and education",
      "Provide protection (police)",
      "Provide safety (fire departments)",
      "Give a driver's license"
    ],
    "correctAnswers": ["Provide schooling and education", "Provide protection (police)", "Provide safety (fire departments)", "Give a driver's license", "Approve zoning and land use"]
  },
  {
    "id": "Q60",
    "question": "What is the purpose of the 10th Amendment?",
    "options": [
      "(It states that the) powers not given to the federal government belong to the states or to the people.",
      "It protects freedom of speech",
      "It protects the right to bear arms",
      "It prevents illegal searches"
    ],
    "correctAnswers": ["(It states that the) powers not given to the federal government belong to the states or to the people."]
  },
  {
    "id": "Q61",
    "question": "Who is the governor of your state now?",
    "options": [
      "Answers will vary",
      "Maura Healey",
      "Ron DeSantis",
      "Gavin Newsom"
    ],
    "correctAnswers": ["Answers will vary"]
  },
  {
    "id": "Q62",
    "question": "What is the capital of your state?",
    "options": [
      "Answers will vary",
      "Boston",
      "Sacramento",
      "Austin"
    ],
    "correctAnswers": ["Answers will vary"]
  },
  {
    "id": "Q63",
    "question": "There are four amendments to the U.S. Constitution about who can vote. Describe one of them.",
    "options": [
      "Citizens eighteen (18) and older (can vote).",
      "You don't have to pay (a poll tax) to vote.",
      "Any citizen can vote. (Women and men can vote.)",
      "A male citizen of any race (can vote)."
    ],
    "correctAnswers": ["Citizens eighteen (18) and older (can vote).", "You don't have to pay (a poll tax) to vote.", "Any citizen can vote. (Women and men can vote.)", "A male citizen of any race (can vote)."]
  },
  {
    "id": "Q64",
    "question": "Who can vote in federal elections, run for federal office, and serve on a jury in the United States?",
    "options": [
      "Citizens",
      "Citizens of the United States",
      "U.S. citizens",
      "All residents"
    ],
    "correctAnswers": ["Citizens", "Citizens of the United States", "U.S. citizens"]
  },
  {
    "id": "Q65",
    "question": "What are three rights of everyone living in the United States?",
    "options": [
      "Freedom of expression",
      "Freedom of speech",
      "Freedom of assembly",
      "Freedom to petition the government"
    ],
    "correctAnswers": ["Freedom of expression", "Freedom of speech", "Freedom of assembly", "Freedom to petition the government", "Freedom of religion", "The right to bear arms"]
  },
  {
    "id": "Q66",
    "question": "What do we show loyalty to when we say the Pledge of Allegiance?",
    "options": [
      "The United States",
      "The flag",
      "The President",
      "The Constitution"
    ],
    "correctAnswers": ["The United States", "The flag"]
  },
  {
    "id": "Q67",
    "question": "Name two promises that new citizens make in the Oath of Allegiance.",
    "options": [
      "Give up loyalty to other countries",
      "Defend the (U.S.) Constitution",
      "Obey the laws of the United States",
      "Serve in the military (if needed)"
    ],
    "correctAnswers": ["Give up loyalty to other countries", "Defend the (U.S.) Constitution", "Obey the laws of the United States", "Serve in the military (if needed)", "Serve (help, do important work for) the nation (if needed)", "Be loyal to the United States"]
  },
  {
    "id": "Q68",
    "question": "How can people become United States citizens?",
    "options": [
      "Be born in the United States",
      "Naturalize",
      "Derive citizenship",
      "Marry a U.S. citizen"
    ],
    "correctAnswers": ["Be born in the United States, under the conditions set by the 14th Amendment", "Naturalize", "Derive citizenship (under conditions set by Congress)"]
  },
  {
    "id": "Q69",
    "question": "What are two examples of civic participation in the United States?",
    "options": [
      "Vote",
      "Run for office",
      "Join a political party",
      "Help with a campaign"
    ],
    "correctAnswers": ["Vote", "Run for office", "Join a political party", "Help with a campaign", "Join a civic group", "Join a community group", "Give an elected official your opinion (on an issue)", "Contact elected officials", "Support or oppose an issue or policy", "Write to a newspaper"]
  },
  {
    "id": "Q70",
    "question": "What is one way Americans can serve their country?",
    "options": [
      "Vote",
      "Pay taxes",
      "Obey the law",
      "Serve in the military"
    ],
    "correctAnswers": ["Vote", "Pay taxes", "Obey the law", "Serve in the military", "Run for office", "Work for local, state, or federal government"]
  },
  {
    "id": "Q71",
    "question": "Why is it important to pay federal taxes?",
    "options": [
      "Required by law",
      "All people pay to fund the federal government",
      "Required by the (U.S.) Constitution (16th Amendment)",
      "Civic duty"
    ],
    "correctAnswers": ["Required by law", "All people pay to fund the federal government", "Required by the (U.S.) Constitution (16th Amendment)", "Civic duty"]
  },
  {
    "id": "Q72",
    "question": "It is important for all men age 18 through 25 to register for the Selective Service. Name one reason why.",
    "options": [
      "Required by law",
      "Civic duty",
      "Makes the draft fair, if needed",
      "National security"
    ],
    "correctAnswers": ["Required by law", "Civic duty", "Makes the draft fair, if needed"]
  },
  {
    "id": "Q73",
    "question": "The colonists came to America for many reasons. Name one.",
    "options": [
      "Freedom",
      "Political liberty",
      "Religious freedom",
      "Economic opportunity"
    ],
    "correctAnswers": ["Freedom", "Political liberty", "Religious freedom", "Economic opportunity", "Escape persecution"]
  },
  {
    "id": "Q74",
    "question": "Who lived in America before the Europeans arrived?",
    "options": [
      "American Indians",
      "Native Americans",
      "Europeans",
      "Africans"
    ],
    "correctAnswers": ["American Indians", "Native Americans"]
  },
  {
    "id": "Q75",
    "question": "What group of people was taken and sold as slaves?",
    "options": [
      "Africans",
      "People from Africa",
      "Native Americans",
      "Europeans"
    ],
    "correctAnswers": ["Africans", "People from Africa"]
  },
  {
    "id": "Q76",
    "question": "What war did the Americans fight to win independence from Britain?",
    "options": [
      "American Revolution",
      "The (American) Revolutionary War",
      "War for (American) Independence",
      "The Civil War"
    ],
    "correctAnswers": ["American Revolution", "The (American) Revolutionary War", "War for (American) Independence"]
  },
  {
    "id": "Q77",
    "question": "Name one reason why the Americans declared independence from Britain.",
    "options": [
      "High taxes",
      "Taxation without representation",
      "British soldiers stayed in Americans' houses",
      "They did not have self-government"
    ],
    "correctAnswers": ["High taxes", "Taxation without representation", "British soldiers stayed in Americans' houses (boarding, quartering)", "They did not have self-government", "Boston Massacre", "Boston Tea Party (Tea Act)", "Stamp Act", "Sugar Act", "Townshend Acts", "Intolerable (Coercive) Acts"]
  },
  {
    "id": "Q78",
    "question": "Who wrote the Declaration of Independence?",
    "options": [
      "(Thomas) Jefferson",
      "George Washington",
      "Benjamin Franklin",
      "John Adams"
    ],
    "correctAnswers": ["(Thomas) Jefferson"]
  },
  {
    "id": "Q79",
    "question": "When was the Declaration of Independence adopted?",
    "options": [
      "July 4, 1776",
      "1776",
      "1787",
      "1791"
    ],
    "correctAnswers": ["July 4, 1776"]
  },
  {
    "id": "Q80",
    "question": "The American Revolution had many important events. Name one.",
    "options": [
      "(Battle of) Bunker Hill",
      "Declaration of Independence",
      "Washington Crossing the Delaware",
      "(Battle of) Yorktown"
    ],
    "correctAnswers": ["(Battle of) Bunker Hill", "Declaration of Independence", "Washington Crossing the Delaware (Battle of Trenton)", "(Battle of) Saratoga", "Valley Forge (Encampment)", "(Battle of) Yorktown (British surrender at Yorktown)"]
  },
  {
    "id": "Q81",
    "question": "There were 13 original states. Name five.",
    "options": [
      "New Hampshire",
      "Massachusetts",
      "Rhode Island",
      "Connecticut"
    ],
    "correctAnswers": ["New Hampshire", "Massachusetts", "Rhode Island", "Connecticut", "New York", "New Jersey", "Pennsylvania", "Delaware", "Maryland", "Virginia", "North Carolina", "South Carolina", "Georgia"]
  },
  {
    "id": "Q82",
    "question": "What founding document was written in 1787?",
    "options": [
      "(U.S.) Constitution",
      "Declaration of Independence",
      "Bill of Rights",
      "Articles of Confederation"
    ],
    "correctAnswers": ["(U.S.) Constitution"]
  },
  {
    "id": "Q83",
    "question": "The Federalist Papers supported the passage of the U.S. Constitution. Name one of the writers.",
    "options": [
      "(James) Madison",
      "(Alexander) Hamilton",
      "(John) Jay",
      "Publius"
    ],
    "correctAnswers": ["(James) Madison", "(Alexander) Hamilton", "(John) Jay", "Publius"]
  },
  {
    "id": "Q84",
    "question": "Why were the Federalist Papers important?",
    "options": [
      "They helped people understand the (U.S.) Constitution.",
      "They supported passing the (U.S.) Constitution.",
      "They explained the new government",
      "They promoted ratification"
    ],
    "correctAnswers": ["They helped people understand the (U.S.) Constitution.", "They supported passing the (U.S.) Constitution."]
  },
  {
    "id": "Q85",
    "question": "Benjamin Franklin is famous for many things. Name one.",
    "options": [
      "Founded the first free public libraries",
      "First Postmaster General of the United States",
      "Helped write the Declaration of Independence",
      "Inventor"
    ],
    "correctAnswers": ["Founded the first free public libraries", "First Postmaster General of the United States", "Helped write the Declaration of Independence", "Inventor", "U.S. diplomat"]
  },
  {
    "id": "Q86",
    "question": "George Washington is famous for many things. Name one.",
    "options": [
      "Father of Our Country",
      "First president of the United States",
      "General of the Continental Army",
      "President of the Constitutional Convention"
    ],
    "correctAnswers": ["Father of Our Country", "First president of the United States", "General of the Continental Army", "President of the Constitutional Convention"]
  },
  {
    "id": "Q87",
    "question": "Thomas Jefferson is famous for many things. Name one.",
    "options": [
      "Writer of the Declaration of Independence",
      "Third president of the United States",
      "Doubled the size of the United States",
      "First Secretary of State"
    ],
    "correctAnswers": ["Writer of the Declaration of Independence", "Third president of the United States", "Doubled the size of the United States (Louisiana Purchase)", "First Secretary of State", "Founded the University of Virginia", "Writer of the Virginia Statute on Religious Freedom"]
  },
  {
    "id": "Q88",
    "question": "James Madison is famous for many things. Name one.",
    "options": [
      "Father of the Constitution",
      "Fourth president of the United States",
      "President during the War of 1812",
      "One of the writers of the Federalist Papers"
    ],
    "correctAnswers": ["Father of the Constitution", "Fourth president of the United States", "President during the War of 1812", "One of the writers of the Federalist Papers"]
  },
  {
    "id": "Q89",
    "question": "Alexander Hamilton is famous for many things. Name one.",
    "options": [
      "First Secretary of the Treasury",
      "One of the writers of the Federalist Papers",
      "Helped establish the First Bank of the United States",
      "Aide to General George Washington"
    ],
    "correctAnswers": ["First Secretary of the Treasury", "One of the writers of the Federalist Papers", "Helped establish the First Bank of the United States", "Aide to General George Washington", "Member of the Continental Congress"]
  },
  {
    "id": "Q90",
    "question": "What territory did the United States buy from France in 1803?",
    "options": [
      "Louisiana Territory",
      "Louisiana",
      "Florida",
      "Alaska"
    ],
    "correctAnswers": ["Louisiana Territory", "Louisiana"]
  },
  {
    "id": "Q91",
    "question": "Name one war fought by the United States in the 1800s.",
    "options": [
      "War of 1812",
      "Mexican-American War",
      "Civil War",
      "Spanish-American War"
    ],
    "correctAnswers": ["War of 1812", "Mexican-American War", "Civil War", "Spanish-American War"]
  },
  {
    "id": "Q92",
    "question": "Name the U.S. war between the North and the South.",
    "options": [
      "The Civil War",
      "Revolutionary War",
      "War of 1812",
      "World War I"
    ],
    "correctAnswers": ["The Civil War"]
  },
  {
    "id": "Q93",
    "question": "The Civil War had many important events. Name one.",
    "options": [
      "(Battle of) Fort Sumter",
      "Emancipation Proclamation",
      "(Battle of) Gettysburg",
      "(Battle of) Vicksburg"
    ],
    "correctAnswers": ["(Battle of) Fort Sumter", "Emancipation Proclamation", "(Battle of) Vicksburg", "(Battle of) Gettysburg", "Sherman's March", "(Surrender at) Appomattox", "(Battle of) Antietam/Sharpsburg", "Lincoln was assassinated."]
  },
  {
    "id": "Q94",
    "question": "Abraham Lincoln is famous for many things. Name one.",
    "options": [
      "Freed the slaves (Emancipation Proclamation)",
      "Saved (or preserved) the Union",
      "Led the United States during the Civil War",
      "16th president of the United States"
    ],
    "correctAnswers": ["Freed the slaves (Emancipation Proclamation)", "Saved (or preserved) the Union", "Led the United States during the Civil War", "16th president of the United States", "Delivered the Gettysburg Address"]
  },
  {
    "id": "Q95",
    "question": "What did the Emancipation Proclamation do?",
    "options": [
      "Freed the slaves",
      "Freed slaves in the Confederacy",
      "Freed slaves in the Confederate states",
      "Freed slaves in most Southern states"
    ],
    "correctAnswers": ["Freed the slaves", "Freed slaves in the Confederacy", "Freed slaves in the Confederate states", "Freed slaves in most Southern states"]
  },
  {
    "id": "Q96",
    "question": "What U.S. war ended slavery?",
    "options": [
      "The Civil War",
      "Revolutionary War",
      "War of 1812",
      "World War I"
    ],
    "correctAnswers": ["The Civil War"]
  },
  {
    "id": "Q97",
    "question": "What amendment says all persons born or naturalized in the United States are U.S. citizens?",
    "options": [
      "14th Amendment",
      "13th Amendment",
      "15th Amendment",
      "16th Amendment"
    ],
    "correctAnswers": ["14th Amendment"]
  },
  {
    "id": "Q98",
    "question": "When did all men get the right to vote?",
    "options": [
      "After the Civil War",
      "During Reconstruction",
      "(With the) 15th Amendment",
      "1870"
    ],
    "correctAnswers": ["After the Civil War", "During Reconstruction", "(With the) 15th Amendment", "1870"]
  },
  {
    "id": "Q99",
    "question": "Name one leader of the women's rights movement in the 1800s.",
    "options": [
      "Susan B. Anthony",
      "Elizabeth Cady Stanton",
      "Sojourner Truth",
      "Harriet Tubman"
    ],
    "correctAnswers": ["Susan B. Anthony", "Elizabeth Cady Stanton", "Sojourner Truth", "Harriet Tubman", "Lucretia Mott", "Lucy Stone"]
  },
  {
    "id": "Q100",
    "question": "Name one war fought by the United States in the 1900s.",
    "options": [
      "World War I",
      "World War II",
      "Korean War",
      "Vietnam War"
    ],
    "correctAnswers": ["World War I", "World War II", "Korean War", "Vietnam War", "(Persian) Gulf War"]
  },
  {
    "id": "Q101",
    "question": "Why did the United States enter World War I?",
    "options": [
      "Because Germany attacked U.S. (civilian) ships",
      "To support the Allied Powers",
      "To oppose the Central Powers",
      "Pearl Harbor was attacked"
    ],
    "correctAnswers": ["Because Germany attacked U.S. (civilian) ships", "To support the Allied Powers (England, France, Italy, and Russia)", "To oppose the Central Powers (Germany, Austria-Hungary, the Ottoman Empire, and Bulgaria)"]
  },
  {
    "id": "Q102",
    "question": "When did all women get the right to vote?",
    "options": [
      "1920",
      "After World War I",
      "(With the) 19th Amendment",
      "1865"
    ],
    "correctAnswers": ["1920", "After World War I", "(With the) 19th Amendment"]
  },
  {
    "id": "Q103",
    "question": "What was the Great Depression?",
    "options": [
      "Longest economic recession in modern history",
      "A stock market crash",
      "A banking crisis",
      "An economic boom"
    ],
    "correctAnswers": ["Longest economic recession in modern history"]
  },
  {
    "id": "Q104",
    "question": "When did the Great Depression start?",
    "options": [
      "The Great Crash (1929)",
      "Stock market crash of 1929",
      "1920",
      "1939"
    ],
    "correctAnswers": ["The Great Crash (1929)", "Stock market crash of 1929"]
  },
  {
    "id": "Q105",
    "question": "Who was president during the Great Depression and World War II?",
    "options": [
      "(Franklin) Roosevelt",
      "Theodore Roosevelt",
      "Harry Truman",
      "Herbert Hoover"
    ],
    "correctAnswers": ["(Franklin) Roosevelt"]
  },
  {
    "id": "Q106",
    "question": "Why did the United States enter World War II?",
    "options": [
      "(Bombing of) Pearl Harbor",
      "Japanese attacked Pearl Harbor",
      "To support the Allied Powers",
      "To oppose the Axis Powers"
    ],
    "correctAnswers": ["(Bombing of) Pearl Harbor", "Japanese attacked Pearl Harbor", "To support the Allied Powers (England, France, and Russia)", "To oppose the Axis Powers (Germany, Italy, and Japan)"]
  },
  {
    "id": "Q107",
    "question": "Dwight Eisenhower is famous for many things. Name one.",
    "options": [
      "General during World War II",
      "President at the end of (during) the Korean War",
      "34th president of the United States",
      "Signed the Federal-Aid Highway Act"
    ],
    "correctAnswers": ["General during World War II", "President at the end of (during) the Korean War", "34th president of the United States", "Signed the Federal-Aid Highway Act of 1956 (Created the Interstate System)"]
  },
  {
    "id": "Q108",
    "question": "Who was the United States' main rival during the Cold War?",
    "options": [
      "Soviet Union",
      "USSR",
      "Russia",
      "China"
    ],
    "correctAnswers": ["Soviet Union", "USSR", "Russia"]
  },
  {
    "id": "Q109",
    "question": "During the Cold War, what was one main concern of the United States?",
    "options": [
      "Communism",
      "Nuclear war",
      "Terrorism",
      "Economic depression"
    ],
    "correctAnswers": ["Communism", "Nuclear war"]
  },
  {
    "id": "Q110",
    "question": "Why did the United States enter the Korean War?",
    "options": [
      "To stop the spread of communism",
      "To support South Korea",
      "To oppose North Korea",
      "To defend democracy"
    ],
    "correctAnswers": ["To stop the spread of communism"]
  },
  {
    "id": "Q111",
    "question": "Why did the United States enter the Vietnam War?",
    "options": [
      "To stop the spread of communism",
      "To support South Vietnam",
      "To oppose North Vietnam",
      "To defend democracy"
    ],
    "correctAnswers": ["To stop the spread of communism"]
  },
  {
    "id": "Q112",
    "question": "What did the civil rights movement do?",
    "options": [
      "Fought to end racial discrimination",
      "Protected voting rights",
      "Ended segregation",
      "Promoted equality"
    ],
    "correctAnswers": ["Fought to end racial discrimination"]
  },
  {
    "id": "Q113",
    "question": "Martin Luther King, Jr. is famous for many things. Name one.",
    "options": [
      "Fought for civil rights",
      "Worked for equality for all Americans",
      "Led peaceful protests",
      "Delivered the 'I Have a Dream' speech"
    ],
    "correctAnswers": ["Fought for civil rights", "Worked for equality for all Americans", "Worked to ensure that people would not be judged by the color of their skin, but by the content of their character"]
  },
  {
    "id": "Q114",
    "question": "Why did the United States enter the Persian Gulf War?",
    "options": [
      "To force the Iraqi military from Kuwait",
      "To protect oil supplies",
      "To support Kuwait",
      "To oppose Saddam Hussein"
    ],
    "correctAnswers": ["To force the Iraqi military from Kuwait"]
  },
  {
    "id": "Q115",
    "question": "What major event happened on September 11, 2001 in the United States?",
    "options": [
      "Terrorists attacked the United States",
      "Terrorists crashed planes into the World Trade Center",
      "Terrorists crashed a plane into the Pentagon",
      "Terrorists crashed a plane in Pennsylvania"
    ],
    "correctAnswers": ["Terrorists attacked the United States", "Terrorists took over two planes and crashed them into the World Trade Center in New York City", "Terrorists took over a plane and crashed into the Pentagon in Arlington, Virginia", "Terrorists took over a plane originally aimed at Washington, D.C., and crashed in a field in Pennsylvania"]
  },
  {
    "id": "Q116",
    "question": "Name one U.S. military conflict after the September 11, 2001 attacks.",
    "options": [
      "(Global) War on Terror",
      "War in Afghanistan",
      "War in Iraq",
      "Korean War"
    ],
    "correctAnswers": ["(Global) War on Terror", "War in Afghanistan", "War in Iraq"]
  },
  {
    "id": "Q117",
    "question": "Name one American Indian tribe in the United States.",
    "options": [
      "Cherokee",
      "Navajo",
      "Sioux",
      "Apache"
    ],
    "correctAnswers": ["Apache", "Blackfeet", "Cayuga", "Cherokee", "Cheyenne", "Chippewa", "Choctaw", "Creek", "Crow", "Hopi", "Huron", "Inupiat", "Lakota", "Mohawk", "Mohegan", "Navajo", "Oneida", "Onondaga", "Pueblo", "Seminole", "Seneca", "Shawnee", "Sioux", "Teton", "Tuscarora"]
  },
  {
    "id": "Q118",
    "question": "Name one example of an American innovation.",
    "options": [
      "Light bulb",
      "Automobile",
      "Airplane",
      "Assembly line"
    ],
    "correctAnswers": ["Light bulb", "Automobile (cars, internal combustion engine)", "Skyscrapers", "Airplane", "Assembly line", "Landing on the moon", "Integrated circuit (IC)"]
  },
  {
    "id": "Q119",
    "question": "What is the capital of the United States?",
    "options": [
      "Washington, D.C.",
      "New York City",
      "Philadelphia",
      "Boston"
    ],
    "correctAnswers": ["Washington, D.C."]
  },
  {
    "id": "Q120",
    "question": "Where is the Statue of Liberty?",
    "options": [
      "New York (Harbor)",
      "Liberty Island",
      "New Jersey, near New York City",
      "on the Hudson (River)"
    ],
    "correctAnswers": ["New York (Harbor)", "Liberty Island", "New Jersey, near New York City", "on the Hudson (River)"]
  },
  {
    "id": "Q121",
    "question": "Why does the flag have 13 stripes?",
    "options": [
      "(Because there were) 13 original colonies",
      "(Because the stripes) represent the original colonies",
      "For the 13 founding fathers",
      "For the 13 amendments"
    ],
    "correctAnswers": ["(Because there were) 13 original colonies", "(Because the stripes) represent the original colonies"]
  },
  {
    "id": "Q122",
    "question": "Why does the flag have 50 stars?",
    "options": [
      "(Because there is) one star for each state",
      "(Because) each star represents a state",
      "(Because there are) 50 states",
      "For the 50 territories"
    ],
    "correctAnswers": ["(Because there is) one star for each state", "(Because) each star represents a state", "(Because there are) 50 states"]
  },
  {
    "id": "Q123",
    "question": "What is the name of the national anthem?",
    "options": [
      "The Star-Spangled Banner",
      "America the Beautiful",
      "God Bless America",
      "My Country 'Tis of Thee"
    ],
    "correctAnswers": ["The Star-Spangled Banner"]
  },
  {
    "id": "Q124",
    "question": "The Nation's first motto was E Pluribus Unum. What does that mean?",
    "options": [
      "Out of many, one",
      "We all become one",
      "In God we trust",
      "United we stand"
    ],
    "correctAnswers": ["Out of many, one", "We all become one"]
  },
  {
    "id": "Q125",
    "question": "What is Independence Day?",
    "options": [
      "A holiday to celebrate U.S. independence (from Britain)",
      "The country's birthday",
      "July 4th",
      "Freedom Day"
    ],
    "correctAnswers": ["A holiday to celebrate U.S. independence (from Britain)", "The country's birthday"]
  },
  {
    "id": "Q126",
    "question": "Name three national U.S. holidays.",
    "options": [
      "New Year's Day",
      "Independence Day",
      "Thanksgiving Day",
      "Christmas Day"
    ],
    "correctAnswers": ["New Year's Day", "Martin Luther King, Jr. Day", "Presidents Day (Washington's Birthday)", "Memorial Day", "Juneteenth", "Independence Day", "Labor Day", "Columbus Day", "Veterans Day", "Thanksgiving Day", "Christmas Day"]
  },
  {
    "id": "Q127",
    "question": "What is Memorial Day?",
    "options": [
      "A holiday to honor soldiers who died in military service",
      "A day to remember veterans",
      "A day to celebrate independence",
      "A day to honor presidents"
    ],
    "correctAnswers": ["A holiday to honor soldiers who died in military service"]
  },
  {
    "id": "Q128",
    "question": "What is Veterans Day?",
    "options": [
      "A holiday to honor people in the (U.S.) military",
      "A holiday to honor people who have served (in the U.S. military)",
      "A day to remember fallen soldiers",
      "A day to celebrate independence"
    ],
    "correctAnswers": ["A holiday to honor people in the (U.S.) military", "A holiday to honor people who have served (in the U.S. military)"]
  }
]
app.get('/api/questions', (c) => c.json(questions)
);
// app.get("/api/test", (c) => c.json({ name: "KCD Software" }));
export default app;


