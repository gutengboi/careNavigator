const diseases = [
  {
    name: "Cholera",
    symptoms: ["watery stool", "loss of consciousness"],
    cause: "Bacterial infection due to contaminated food or water.",
    prevention: "Ensure proper sanitation and clean drinking water.",
    treatment: "Oral rehydration salts (ORS) and antibiotics.",
  },
  {
    name: "Tuberculosis",
    symptoms: ["bloody sputum", "persistent cough", "weight loss"],
    cause: "Bacterial infection caused by Mycobacterium tuberculosis.",
    prevention:
      "Vaccination and avoiding close contact with infected individuals.",
    treatment: "Antibiotics for several months.",
  },
  {
    name: "Malaria",
    symptoms: [
      "Fever",
      "Chills",
      " General feeling of discomfort",
      "Headache",
      "Nausea and vomiting ",
      "Diarrhea",
      " Muscle or joint pain ",
      "Fatigue",
      "Cough"
    ],
    cause:
      "Mosquito Bite: The parasite enters the bloodstream when an infected mosquito bites a person, eventually making its way to the liver, where it matures and multiplies.",
    prevention:
      " Eliminate standing water where mosquitoes breed, and use indoor insecticides to reduce mosquito populations",
    treatment:
      "Antimalarial Medication, Artemisinin-based Combination Therapies (ACTs), Primaquine",
  },
  {
    name: "Measles",
    symptoms: [
      "Fever",
      "Dry cough ",
      " Runny nose",
      "Sore throat",
      "Inflamed eyes (conjunctivitis)",
      " Tiny white spots with bluish-white centers on a red background found inside the mouth on the inner lining of the cheek — also called Koplik's spots ",
      " A skin rash made up of large, flat blotches that often flow into one another",
    ],
    cause:
      "Measles Virus (Rubeola): Measles is caused by the measles virus, a highly contagious virus that spreads through respiratory droplets when an infected person coughs or sneezes.",
    prevention:
      "Frequent hand washing, using tissues or elbows to cover coughs and sneezes, and avoiding close contact with infected individuals can help reduce transmission",
    treatment: "Ensuring adequate rest and fluid intake. ",
  },
  {
    name: "Meningococcal disease",
    symptoms: [
      "fever",
      "headache",
      "neck stiffness ",
      "light sensitivity",
      "nausea and vomiting, or loss of appetite",
      "drowsiness and confusion",
      "leg pain or other muscle or joint aches and pains",
    ],
    cause:
      "Meningococcal disease is caused by bacteria. It’s contagious between people and is transmitted through mucus.",
    prevention:
      "Vaccination and avoiding close contact with infected individuals.",
    treatment: "Get vaccinated and take Antibiotics",
  },
  {
    name: "COVID-19",
    symptoms: [
      "Fever or chills ",
      "Cough",
      "Shortness of breath or difficulty breathing",
      "Sore throat",
      "Congestion or runny nose ",
      "New loss of taste or smell",
      "Fatigue",
      "Muscle or body aches",
      "Headache",
      "Nausea or vomiting ",
      "Diarrhea",
    ],
    cause:
      "infection with the severe acute respiratory syndrome coronavirus 2, also called SARS-CoV-2.",
    prevention:
      "Wash your hands for at least 20 seconds — especially before eating and preparing food, after using the bathroom, after wiping your nose, and after coming in contact with someone who has a cold.",
    treatment: "Antiviral medications and vaccines",
  },
  {
    name: "Lassa fever",
    symptoms: [
      "Fever",
      "Tiredness (fatigue)",
      "Cough",
      "Sore throat",
      "Headache",
      "Chest, neck or stomach pain",
      "Difficulty breathing",
      "Severe vomiting or diarrhea",
      "Bleeding from your mouth, nose, eyes or other mucous membranes",
      "Seizures",
      "Confusion",
    ],
    cause:
      "Lassa virus (LASV) causes Lassa fever. It’s carried by Mastomys (or “multimammate”) rats, which live in countries in West Africa. Lassa virus can damage your blood vessels and lower your blood’s ability to clot, causing uncontrolled bleeding",
    prevention:
      "Avoid contact with rodents, especially in areas where Lassa fever is common. Keep living spaces clean and sanitary, with food in closed containers to discourage attracting rats and other pests.",
    treatment:
      "Ribavirin, a broad spectrum antiviral active against RNA viruses and particularly used to treat hepatitis C",
  },
  {
    name: "Yellow fever",
    symptoms: [
      "Fever",
      "Headache",
      "Body ache",
      "Tiredness (fatigue)",
      "Nausea and vomiting",
      "Very high fever ",
      "Jaundice (your skin and the whites of your eyes turn yellow)",
      "Hemorrhage (bleeding)",
      "Shock",
      "Liver failure",
      "Kidney failure",
    ],
    cause:
      "Yellow fever is caused by a virus that’s spread by certain kinds of mosquitoes.",
    prevention:
      "Consider using a bed net if the lodging doesn’t have air conditioning or screens on the windows.",
    treatment:
      "There is no specific anti-viral drug for yellow fever. [visit a near by Hospital]",
  },
  {
    name: "Typhoid fever",
    symptoms: [
      "Headache",
      "Chills",
      "Loss of appetite",
      "Stomach (abdominal) pain",
      "“Rose spots” rash, or faint pink spots, usually on your chest or stomach",
      "Cough",
      "Muscle aches",
      "Nausea, vomiting",
      "Diarrhea or constipation",
    ],
    cause:
      "Typhoid fever is caused by the bacterium S. Typhi. It lives in the gut (intestines) of infected people and can contaminate food and water",
    prevention:
      "The best way to reduce your risk of typhoid fever is to get vaccinated if you live in or are traveling to an area where it’s common. Hand washing and safe food handling are also important for limiting the spread of typhoid.",
    treatment:
      "Antibiotic therapy is the only effective treatment for typhoid fever.",
  },
  {
    name: "Bird Flu",
    symptoms: [
      "Fever",
      "Fatigue",
      "Cough",
      "Muscle aches",
      "Sore throat",
      "Nausea and vomiting",
      "Diarrhea",
      " Stuffy or runny nose",
      " Shortness of breath (dyspnea)",
      "Pink eye (conjunctivitis)",
    ],
    cause:
      "A type of influenza A virus, often H5N1 in humans, causes bird flu. The virus can infect your upper respiratory tract and lungs and even spread to other parts of your body, like your brain.",
    prevention:
      "Wash your hands frequently when handling birds, wild animals and livestock or after being in areas where they live. This includes visiting petting zoos, farms or areas with water features that geese or ducks frequent.",
    treatment:
      "Antiviral medicine such as oseltamivir (Tamiflu) or zanamivir (Relenza)",
  },
  // Add more diseases here...
];

export default diseases;
