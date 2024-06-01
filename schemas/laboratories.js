import z from 'zod'

const laboratorySchema = z.object({
  title: z.string({
    invalid_type_error: 'Laboratory title must be a string',
    required_error: 'Laboratory title is required.'
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
      required_error: 'Laboratory genre is required.',
      invalid_type_error: 'Laboratory genre must be an array of enum Genre'
    }
  )
})

export function validateLaboratory (input) {
  return laboratorySchema.safeParse(input)
}

export function validatePartialLaboratory (input) {
  return laboratorySchema.partial().safeParse(input)
}
