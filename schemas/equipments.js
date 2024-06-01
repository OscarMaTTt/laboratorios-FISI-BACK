import z from 'zod'

const equipmentSchema = z.object({
  title: z.string({
    invalid_type_error: 'Equipment title must be a string',
    required_error: 'Equipment title is required.'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
    {
      required_error: 'Equipment genre is required.',
      invalid_type_error: 'Equipment genre must be an array of enum Genre'
    }
  )
})

export function validateEquipment (input) {
  return equipmentSchema.safeParse(input)
}

export function validatePartialEquipment (input) {
  return equipmentSchema.partial().safeParse(input)
}
