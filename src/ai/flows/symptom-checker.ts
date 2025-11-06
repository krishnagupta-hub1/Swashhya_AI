'use server';

/**
 * @fileOverview AI-powered symptom checker flow.
 *
 * - symptomChecker - A function that takes user-reported symptoms and returns a list of potential conditions with references to AYUSH ministry guidelines.
 * - SymptomCheckerInput - The input type for the symptomChecker function.
 * - SymptomCheckerOutput - The return type for the symptomChecker function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomCheckerInputSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).describe('The conversation history.'),
  language: z.string().optional().default('English').describe('The language for the response.'),
});
export type SymptomCheckerInput = z.infer<typeof SymptomCheckerInputSchema>;

const SymptomCheckerOutputSchema = z.object({
  potentialConditions: z
    .string()
    .describe(
      'A list of potential medical conditions based on the symptoms provided, cross-referenced with AYUSH ministry guidelines.'
    ),
});
export type SymptomCheckerOutput = z.infer<typeof SymptomCheckerOutputSchema>;

export async function symptomChecker(input: SymptomCheckerInput): Promise<SymptomCheckerOutput> {
  return symptomCheckerFlow(input);
}

const symptomCheckerPrompt = ai.definePrompt({
  name: 'symptomCheckerPrompt',
  input: {schema: SymptomCheckerInputSchema},
  output: {schema: SymptomCheckerOutputSchema},
  prompt: `You are an AI-powered symptom checker that provides a list of potential conditions based on user-reported symptoms. Cross-reference your suggestions with AYUSH ministry guidelines. Respond in the requested language: {{{language}}}.

  Conversation History:
  {{#each messages}}
  - {{role}}: {{{content}}}
  {{/each}}
  
  Based on the conversation history, provide a list of potential medical conditions. If there's not enough information, ask clarifying questions.
  `,
});

const symptomCheckerFlow = ai.defineFlow(
  {
    name: 'symptomCheckerFlow',
    inputSchema: SymptomCheckerInputSchema,
    outputSchema: SymptomCheckerOutputSchema,
  },
  async input => {
    const {output} = await symptomCheckerPrompt(input);
    return output!;
  }
);
