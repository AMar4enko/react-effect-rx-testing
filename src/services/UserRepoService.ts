import { Db } from '@/infrastructure/Db'
import { Effect } from 'effect'
import { TaggedError } from 'effect/Data'

export class UserNotFoundError extends TaggedError(`UserNotFoundError`) {}

export default class UserRepoService extends Effect.Service<UserRepoService>()(
  `UserRepoService`,
  {
    accessors: true,
    dependencies: [Db.Default],
    effect: Effect.gen(function* () {
      const db = yield* Db
      const getUser = (id: string) =>
        db.query(id).pipe(
          Effect.flatMap(Effect.fromNullable),
          Effect.catchTag(`NoSuchElementException`, () =>
            Effect.fail(new UserNotFoundError()),
          ),
        )

      return {
        getUser,
      }
    }),
  },
) {}
