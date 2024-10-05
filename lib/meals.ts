import { promises as fs } from "fs";
import path from "path";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

// MealType 인터페이스 정의 (이미 정의되어 있다고 가정)
import { MealType } from "@/components/meals/meals-grid";

// 데이터베이스 연결
const db = sql("meals.db");

export async function getMeals(): Promise<MealType[]> {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return db.prepare("SELECT * FROM meals").all() as MealType[];
}

export function getMeal(slug: string): MealType | undefined {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug) as
    | MealType
    | undefined;
}

export async function saveMeal(meal: Omit<MealType, "slug">): Promise<void> {
  const slug = slugify(meal.title, { lower: true });
  const sanitizedInstructions = xss(meal.instructions);

  let fileName = "";
  if (typeof meal.image === "string") {
    if (meal.image.startsWith("data:image")) {
      const [, base64Data] = meal.image.split(",");
      const extension = meal.image.split(";")[0].split("/")[1];
      fileName = `${slug}.${extension}`;

      const buffer = Buffer.from(base64Data, "base64");
      await fs.writeFile(path.join("public", "images", fileName), buffer);
    } else {
      fileName = meal.image;
    }
  } else if (meal.image instanceof ArrayBuffer) {
    const extension = "jpeg";
    fileName = `${slug}.${extension}`;

    await fs.writeFile(
      path.join("public", "images", fileName),
      Buffer.from(meal.image)
    );
  }

  const insertMeal = db.prepare(`
        INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

  insertMeal.run(
    meal.title,
    meal.summary,
    sanitizedInstructions,
    meal.creator,
    meal.creator_email,
    fileName,
    slug
  );

  console.log(`Meal saved with image: ${fileName}`);
}
