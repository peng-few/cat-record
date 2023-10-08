import { z } from "zod";

export const zToNumber = z.number().or(z.string()).pipe(z.coerce.number());