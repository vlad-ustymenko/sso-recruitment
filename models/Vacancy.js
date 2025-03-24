import mongoose from "mongoose";

const VacancySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    subTitle: { type: String, required: true },
    description: { type: String, required: true },
    credo: { type: String, required: true },
    type: { type: String, required: true },
    rank: { type: String, required: true },
    responsibilities: { type: String, required: true },
    guarantees: { type: String, required: true },
    militaryUnit: { type: String, required: true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    bigImage: { type: String, required: true },
    smallImage: { type: String, required: true },
    iconImage: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { collection: "vacancies" }
);

const Vacancy =
  mongoose.models.Vacancy || mongoose.model("Vacancy", VacancySchema);

export default Vacancy;
