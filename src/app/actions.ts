"use server";

import {
    symptomChecker,
    type SymptomCheckerInput,
} from "@/ai/flows/symptom-checker";
import {
    generateWellnessPlan,
    type WellnessPlanInput,
} from "@/ai/flows/personalized-wellness-plans";
import {
    mentalHealthSupport,
    type MentalHealthSupportInput,
} from "@/ai/flows/mental-health-support";

export async function getSymptomAnalysis(input: SymptomCheckerInput) {
    try {
        const result = await symptomChecker(input);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: "An error occurred while analyzing symptoms.",
        };
    }
}

export async function getWellnessPlan(input: WellnessPlanInput) {
    try {
        const result = await generateWellnessPlan(input);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: "An error occurred while generating the wellness plan.",
        };
    }
}

export async function getMentalHealthSupport(input: MentalHealthSupportInput) {
    try {
        const result = await mentalHealthSupport(input);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: "An error occurred while providing mental health support.",
        };
    }
}
