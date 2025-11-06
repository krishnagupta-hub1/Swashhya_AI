'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing mental health support by analyzing user input for sentiment and providing stress-relief tips.
 *
 * - mentalHealthSupport - A function that handles the mental health support process.
 * - MentalHealthSupportInput - The input type for the mentalHealthSupport function.
 * - MentalHealthSupportOutput - The return type for the mentalHealthSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MentalHealthSupportInputSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).describe('The conversation history.'),
  language: z.string().optional().default('English').describe('The language for the response.'),
});
export type MentalHealthSupportInput = z.infer<typeof MentalHealthSupportInputSchema>;

const MentalHealthSupportOutputSchema = z.object({
  sentiment: z.string().describe('The sentiment of the text input (positive, negative, or neutral).'),
  stressReliefTips: z.string().describe('Suggested stress relief tips based on the sentiment analysis and mood check-ins.'),
});
export type MentalHealthSupportOutput = z.infer<typeof MentalHealthSupportOutputSchema>;

export async function mentalHealthSupport(input: MentalHealthSupportInput): Promise<MentalHealthSupportOutput> {
  return mentalHealthSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mentalHealthSupportPrompt',
  input: {schema: MentalHealthSupportInputSchema},
  output: {schema: MentalHealthSupportOutputSchema},
  prompt: `You are an AI mental health assistant. Analyze the user's conversation history for sentiment and provide stress-relief tips. Respond in the requested language: {{{language}}}.

Conversation History:
{{#each messages}}
- {{role}}: {{{content}}}
{{/each}}

Sentiment analysis should be one of: 'positive', 'negative', or 'neutral' based on the last user message.

If the sentiment is negative, provide stress-relief tips. Consider the history of the conversation when providing tips.

Ensure the tips are relevant and helpful.
`,
});

const mentalHealthSupportFlow = ai.defineFlow(
  {
    name: 'mentalHealthSupportFlow',
    inputSchema: MentalHealthSupportInputSchema,
    outputSchema: MentalHealthSupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
