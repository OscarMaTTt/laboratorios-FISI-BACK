import z from 'zod'

const computerSchema = z.object({
  title: z.string({
    invalid_type_error: 'Computer title must be a string',
    required_error: 'Computer title is required.'
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
      required_error: 'Computer genre is required.',
      invalid_type_error: 'Computer genre must be an array of enum Genre'
    }
  )
})

export function validateComputer (input) {
  return computerSchema.safeParse(input)
}

export function validatePartialComputer (input) {
  return computerSchema.partial().safeParse(input)
}
