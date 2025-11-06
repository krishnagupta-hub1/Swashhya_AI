'use server';

/**
 * @fileOverview Flow for generating personalized wellness plans based on user's age, health conditions, and location.
 *
 * - generateWellnessPlan - A function that generates a personalized wellness plan.
 * - WellnessPlanInput - The input type for the generateWellnessPlan function.
 * - WellnessPlanOutput - The return type for the generateWellnessPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WellnessPlanInputSchema = z.object({
  age: z.number().describe('The age of the user.'),
  healthConditions: z.string().describe('The health conditions of the user.'),
  location: z.string().describe('The location of the user.'),
});
export type WellnessPlanInput = z.infer<typeof WellnessPlanInputSchema>;

const WellnessPlanOutputSchema = z.object({
  yogaPlan: z.string().describe('A personalized yoga plan based on the user input.'),
  ayurvedaRecommendations: z.string().describe('Ayurveda-based recommendations for the user.'),
  localHerbs: z.string().describe('Recommended local herbs based on the user location.'),
});
export type WellnessPlanOutput = z.infer<typeof WellnessPlanOutputSchema>;

export async function generateWellnessPlan(input: WellnessPlanInput): Promise<WellnessPlanOutput> {
  return generateWellnessPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'wellnessPlanPrompt',
  input: {schema: WellnessPlanInputSchema},
  output: {schema: WellnessPlanOutputSchema},
  prompt: `You are an expert in creating personalized wellness plans based on Yoga and Ayurveda.

  Based on the user's age, health conditions, and location, create a personalized wellness plan.

  Age: {{{age}}}
  Health Conditions: {{{healthConditions}}}
  Location: {{{location}}}

  Consider local herbs and dietary recommendations specific to the user's location.
  Provide specific yoga asanas, ayurvedic practices, and local herbs that would be beneficial for the user.
`,
});

const generateWellnessPlanFlow = ai.defineFlow(
  {
    name: 'generateWellnessPlanFlow',
    inputSchema: WellnessPlanInputSchema,
    outputSchema: WellnessPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
