import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const alarmSchema = z.object({
  mantraId: z.string().min(1),
  hour: z.number().int().min(0).max(23),
  minute: z.number().int().min(0).max(59),
  repeatDays: z.array(z.number().int().min(0).max(6)),
  enabled: z.boolean()
});

export const alarmPatchSchema = alarmSchema.partial().refine((obj) => Object.keys(obj).length > 0, {
  message: 'At least one field is required for update'
});

export const chantSchema = z.object({
  mantraId: z.string().min(1)
});
