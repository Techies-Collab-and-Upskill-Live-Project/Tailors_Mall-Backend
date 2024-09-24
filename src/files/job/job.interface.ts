export interface IJob {
  _id: any
  clientId: any
  title: string
  category: string
  jobType: 'full-time' | 'one-off'
  description: string
  requiredSkills: string[]
  qualification: "beginner" | "intermediate" | "expert"
  files: string[]
  budget: IBudget
  timeLine: string
  isDelete: boolean
}

interface IBudget {
  fixedPrice: string
  priceRange: {
    min: number
    max: number
  }
}