'use server';

/**
 * @fileOverview A hydrogen-based lifeform generator flow.
 *
 * - generateLifeform - A function that generates a lifeform based on given parameters.
 * - GenerateLifeformInput - The input type for the generateLifeform function.
 * - GenerateLifeformOutput - The return type for the generateLifeform function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateLifeformInputSchema = z.object({
  environmentalConditions: z
    .string()
    .describe(
      'Description of the environmental conditions (temperature, pressure, radiation levels).'
    ),
  desiredTraits: z
    .string()
    .describe('Desired traits for the lifeform (e.g., size, color, behavior).'),
});
export type GenerateLifeformInput = z.infer<typeof GenerateLifeformInputSchema>;

const GenerateLifeformOutputSchema = z.object({
  lifeformName: z.string().describe('The name of the generated lifeform.'),
  characteristics: z.string().describe('The characteristics of the lifeform.'),
  potentialEnvironment:
    z.string().describe('The potential environment for the lifeform.'),
  basicMetabolism: z.string().describe('The basic metabolism of the lifeform.'),
  cycleOfLife: z.string().describe('The cycle of life of the lifeform.'),
  food: z.string().describe('The food of the lifeform.'),
  conditionsForUnlimitedLife: z
    .string()
    .describe('The conditions for unlimited life of the lifeform.'),
});
export type GenerateLifeformOutput = z.infer<typeof GenerateLifeformOutputSchema>;

export async function generateLifeform(
  input: GenerateLifeformInput
): Promise<GenerateLifeformOutput> {
  return generateLifeformFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLifeformPrompt',
  input: {
    schema: z.object({
      environmentalConditions: z
        .string()
        .describe(
          'Description of the environmental conditions (temperature, pressure, radiation levels).'
        ),
      desiredTraits: z
        .string()
        .describe('Desired traits for the lifeform (e.g., size, color, behavior).'),
    }),
  },
  output: {
    schema: z.object({
      lifeformName: z.string().describe('The name of the generated lifeform.'),
      characteristics: z.string().describe('The characteristics of the lifeform.'),
      potentialEnvironment:
        z.string().describe('The potential environment for the lifeform.'),
      basicMetabolism: z.string().describe('The basic metabolism of the lifeform.'),
      cycleOfLife: z.string().describe('The cycle of life of the lifeform.'),
      food: z.string().describe('The food of the lifeform.'),
      conditionsForUnlimitedLife: z
        .string()
        .describe('The conditions for unlimited life of the lifeform.'),
    }),
  },
  prompt: `You are a creative biologist specializing in theoretical lifeforms. Generate a unique lifeform concept based on hydrogen as the primary element, without relying on existing biological knowledge. Use a custom algorithm to evolve new lifeforms, considering the properties of hydrogen and user inputs.

Environmental Conditions: {{{environmentalConditions}}}
Desired Traits: {{{desiredTraits}}}

Output the lifeform name, characteristics, potential environment, basic metabolism, cycle of life, food, and conditions for unlimited life in a structured format.
`,
});

const generateLifeformFlow = ai.defineFlow<
  typeof GenerateLifeformInputSchema,
  typeof GenerateLifeformOutputSchema
>(
  {
    name: 'generateLifeformFlow',
    inputSchema: GenerateLifeformInputSchema,
    outputSchema: GenerateLifeformOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
