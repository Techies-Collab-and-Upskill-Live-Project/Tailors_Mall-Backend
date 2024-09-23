export interface IJob {
  title: string
  category: string
  jobType: 'full-time' | 'one-off'
  description: string
  requiredSkills: string[]
  qualification: "beginner" | "intermediate" | "expert"
  files: string[]
  budget: IBudget
  timeLine: string
}

interface IBudget {
  fixedPrice: string
  priceRange: {
    min: number
    max: number
  }
}