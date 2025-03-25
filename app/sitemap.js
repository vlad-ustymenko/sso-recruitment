export const revalidation = 3600;

export default async function sitemap() {
  const baseUrl = "https://sofua.army";

  try {
    const res = await fetch(`${baseUrl}/api/vacancies`);

    if (!res.ok) {
      throw new Error("Не вдалося отримати вакансії");
    }

    const vacancies = await res.json();

    return [
      {
        url: baseUrl,
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly",
        priority: 1.0,
      },
      {
        url: `${baseUrl}/vacancies`,
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      ...vacancies.map((vacancy) => ({
        url: `${baseUrl}/vacancy/${vacancy.slug}`,
        lastModified: vacancy.updatedAt || new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.9,
      })),
    ];
  } catch (error) {
    console.error("Помилка при отриманні вакансій для sitemap:", error);
    return [];
  }
}
