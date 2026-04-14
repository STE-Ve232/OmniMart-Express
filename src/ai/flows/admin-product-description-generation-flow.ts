'use server';
/**
 * @fileOverview A Genkit flow for generating product descriptions for an e-commerce platform.
 *
 * - generateProductDescription - A function that generates a detailed product description.
 * - AdminProductDescriptionGenerationInput - The input type for the generateProductDescription function.
 * - AdminProductDescriptionGenerationOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdminProductDescriptionGenerationInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  category: z.string().describe('The category the product belongs to (e.g., "Fresh Fruits", "Smartphones", "Office Supplies").'),
  keyFeatures: z.array(z.string()).describe('A list of key features or selling points of the product.'),
  targetAudience: z.string().optional().describe('Optional: The specific customer segment this description should appeal to (e.g., "busy parents", "university students", "small businesses").'),
});
export type AdminProductDescriptionGenerationInput = z.infer<typeof AdminProductDescriptionGenerationInputSchema>;

const AdminProductDescriptionGenerationOutputSchema = z.object({
  description: z.string().describe('The generated rich, detailed, and engaging product description.'),
  keywords: z.array(z.string()).describe('A list of SEO-friendly keywords relevant to the product.'),
});
export type AdminProductDescriptionGenerationOutput = z.infer<typeof AdminProductDescriptionGenerationOutputSchema>;

const generateProductDescriptionPrompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: AdminProductDescriptionGenerationInputSchema},
  output: {schema: AdminProductDescriptionGenerationOutputSchema},
  prompt: `You are a skilled e-commerce copywriter for 'OmniMart Express', a one-stop supermarket that sells everything from fresh produce to electronics. Your task is to generate a rich, detailed, and engaging product description, along with a list of SEO-friendly keywords, based on the provided product details.

Craft a description that is persuasive, highlights benefits, and provides all necessary information for a customer to make an informed purchase. The tone should be modern, friendly, and professional.

Product Name: {{{productName}}}
Category: {{{category}}}
Key Features:{{#each keyFeatures}}
- {{{this}}}{{/each}}

{{#if targetAudience}}
Tailor the description to appeal specifically to the following audience: {{{targetAudience}}}.
{{/if}}

Focus on explaining how the features translate into benefits for the customer.

Description:`,
});

const adminProductDescriptionGenerationFlow = ai.defineFlow(
  {
    name: 'adminProductDescriptionGenerationFlow',
    inputSchema: AdminProductDescriptionGenerationInputSchema,
    outputSchema: AdminProductDescriptionGenerationOutputSchema,
  },
  async (input) => {
    const {output} = await generateProductDescriptionPrompt(input);
    return output!;
  }
);

export async function generateProductDescription(
  input: AdminProductDescriptionGenerationInput
): Promise<AdminProductDescriptionGenerationOutput> {
  return adminProductDescriptionGenerationFlow(input);
}
