"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { MealType } from "@/components/meals/meals-grid";

function isInvalidText(text: string | undefined) {
  return !text || text.trim() === "";
}

export async function shareMeal(preState: any, formData: FormData) {
  const meal: Partial<MealType> = {
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    image: formData.get("image") as File | string, // File 또는 string으로 처리
    creator: formData.get("name") as string,
    creator_email: formData.get("email") as string,
  };

  // Check if all required fields are present
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    !meal.image ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email?.includes("@")
  ) {
    throw new Error("Missing required fields");
  }

  if (meal.image instanceof File) {
    const imageSizeInMB = meal.image.size / (1024 * 1024); // 파일 크기 MB 단위로 변환
    if (imageSizeInMB > 5) {
      // 예시로 5MB 이상이면 에러 처리
      throw new Error("Image size exceeds the 5MB limit.");
    }
  }

  await saveMeal(meal as MealType);
  redirect("/meals");
}
