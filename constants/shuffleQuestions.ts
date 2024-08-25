import diseases from "@/utils/diseases";

export const shuffleQuestions = () => {
  const allSymptoms = diseases.flatMap(disease => disease.symptoms);
  return allSymptoms.sort(() => 0.5 - Math.random());
};
