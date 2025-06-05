import UserRepoService from '@/services/UserRepoService'
import { Rx } from '@effect-rx/rx'

const runtime = Rx.runtime(UserRepoService.Default)

export type Runtime = typeof runtime

export default runtime
