'use server';
/**
 * @fileOverview An AI agent for tailoring product descriptions for specific customer segments.
 *
 * - tailorProductDescription - A function that tailors an existing product description.
 * - AdminSegmentedProductDescriptionTailoringInput - The input type for the tailorProductDescription function.
 * - AdminSegmentedProductDescriptionTailoringOutput - The return type for the tailorProductDescription function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AdminSegmentedProductDescriptionTailoringInputSchema = z.object({
  originalDescription: z.string().describe('The original, generic product description.'),
  customerSegment: z.string().describe('The target customer segment (e.g., "families", "students", "businesses").'),
  productName: z.string().describe('The name of the product.'),
  productCategory: z.string().describe('The category of the product (e.g., "fresh produce", "electronics", "apparel").'),
  additionalDetails: z.string().optional().describe('Any additional product details that might be relevant for tailoring.'),
});
export type AdminSegmentedProductDescriptionTailoringInput = z.infer<typeof AdminSegmentedProductDescriptionTailoringInputSchema>;

const AdminSegmentedProductDescriptionTailoringOutputSchema = z.object({
  tailoredDescription: z.string().describe('The AI-generated product description, tailored for the specific customer segment.'),
});
export type AdminSegmentedProductDescriptionTailoringOutput = z.infer<typeof AdminSegmentedProductDescriptionTailoringOutputSchema>;

export async function tailorProductDescription(input: AdminSegmentedProductDescriptionTailoringInput): Promise<AdminSegmentedProductDescriptionTailoringOutput> {
  return adminSegmentedProductDescriptionTailoringFlow(input);
}

const adminSegmentedProductDescriptionTailoringPrompt = ai.definePrompt({
  name: 'adminSegmentedProductDescriptionTailoringPrompt',
  input: { schema: AdminSegmentedProductDescriptionTailoringInputSchema },
  output: { schema: AdminSegmentedProductDescriptionTailoringOutputSchema },
  prompt: `You are an expert marketing copywriter specializing in e-commerce product descriptions.
Your task is to rewrite an existing product description to resonate specifically with a given customer segment.

Focus on highlighting aspects of the product that are most appealing and relevant to the '${'{{{customerSegment}}}'}' segment.

For example:
- For 'families', highlight health benefits, safety, ease of use, or value for money.
- For 'students', emphasize durability, affordability, portability, or features for learning.
- For 'businesses', focus on bulk options, efficiency, reliability, or cost-effectiveness.

Product Name: {{{productName}}}
Product Category: {{{productCategory}}}
Original Description: {{{originalDescription}}}

{{#if additionalDetails}}Additional Details: {{{additionalDetails}}}{{/if}}

Based on the above, provide a new, tailored product description for the '{{{customerSegment}}}' segment. Your output must be a JSON object with a single key 'tailoredDescription' containing the new description.`,
});

const adminSegmentedProductDescriptionTailoringFlow = ai.defineFlow(
  {
    name: 'adminSegmentedProductDescriptionTailoringFlow',
    inputSchema: AdminSegmentedProductDescriptionTailoringInputSchema,
    outputSchema: AdminSegmentedProductDescriptionTailoringOutputSchema,
  },
  async (input) => {
    const { output } = await adminSegmentedProductDescriptionTailoringPrompt(input);
    return output!;
  },
);
