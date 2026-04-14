import { config } from 'dotenv';
config();

import '@/ai/flows/admin-product-description-generation-flow.ts';
import '@/ai/flows/admin-segmented-product-description-tailoring-flow.ts';
import '@/ai/flows/admin-essential-details-inclusion-flow.ts';