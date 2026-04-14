'use server';
/**
 * @fileOverview An AI agent that identifies and suggests essential product details based on category and description.
 *
 * - adminEssentialDetailsInclusion - A function that handles the essential product details inclusion process.
 * - AdminEssentialDetailsInclusionInput - The input type for the adminEssentialDetailsInclusion function.
 * - AdminEssentialDetailsInclusionOutput - The return type for the adminEssentialDetailsInclusion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const AdminEssentialDetailsInclusionInputSchema = z.object({
  productCategory: z.string().describe('The category of the product (e.g., "electronics", "fresh produce", "apparel").'),
  productDescription: z.string().describe('A detailed description of the product.'),
});
export type AdminEssentialDetailsInclusionInput = z.infer<typeof AdminEssentialDetailsInclusionInputSchema>;

// Output Schema
const AdminEssentialDetailsInclusionOutputSchema = z.object({
  usageInstructions: z.string().optional().describe('Detailed steps on how to use the product. Leave empty if not applicable.'),
  careGuidelines: z.string().optional().describe('Instructions on how to maintain, clean, or store the product. Leave empty if not applicable.'),
  warrantyInformation: z.string().optional().describe('Details about the product\'s warranty, if any. Leave empty if not applicable.'),
  safetyWarnings: z.string().optional().describe('Important safety notices or warnings associated with the product. Leave empty if not applicable.'),
  assemblyInstructions: z.string().optional().describe('Step-by-step instructions for assembling the product. Leave empty if not applicable.'),
  notes: z.string().optional().describe('Any other relevant essential details not covered by other fields. Leave empty if not applicable.'),
});
export type AdminEssentialDetailsInclusionOutput = z.infer<typeof AdminEssentialDetailsInclusionOutputSchema>;

// Wrapper function
export async function adminEssentialDetailsInclusion(input: AdminEssentialDetailsInclusionInput): Promise<AdminEssentialDetailsInclusionOutput> {
  return adminEssentialDetailsInclusionFlow(input);
}

// Prompt definition
const prompt = ai.definePrompt({
  name: 'adminEssentialDetailsInclusionPrompt',
  input: { schema: AdminEssentialDetailsInclusionInputSchema },
  output: { schema: AdminEssentialDetailsInclusionOutputSchema },
  prompt: `You are a helpful product detail specialist for an e-commerce supermarket. Your task is to analyze product information and identify essential details that customers need to know.

Based on the provided product category and description, generate comprehensive and relevant details for the following categories: usage instructions, care guidelines, warranty information, safety warnings, assembly instructions, and any other relevant notes.

If a detail category is not applicable to the product, you MUST omit it from the output or provide an empty string for that field, following the JSON schema. Be concise yet thorough.

Product Category: {{{productCategory}}}
Product Description: {{{productDescription}}}
`,
});

// Flow definition
const adminEssentialDetailsInclusionFlow = ai.defineFlow(
  {
    name: 'adminEssentialDetailsInclusionFlow',
    inputSchema: AdminEssentialDetailsInclusionInputSchema,
    outputSchema: AdminEssentialDetailsInclusionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
