import UserRepoService from '@/services/UserRepoService.ts'
import runtime from './runtime.ts'

export const rxUser = runtime.fn((userId: string, ctx) =>
  UserRepoService.getUser(userId),
)
