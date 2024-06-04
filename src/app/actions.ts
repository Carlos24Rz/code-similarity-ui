"use server";
import { revalidatePath } from "next/cache";

export async function reloadHomeworkList() {
  revalidatePath('dashboard');
}

export async function reloadSubmissionList(homeworkUrl: string) {
  revalidatePath(homeworkUrl);
}
