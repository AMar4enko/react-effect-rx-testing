import { Effect } from 'effect'

export class Db extends Effect.Service<Db>()(`Db`, {
  sync: () => {
    const query = (...args: unknown[]) => {
      return Effect.succeed({ id: +String(args[0]), name: `John` }).pipe(
        Effect.delay(300 + 1000 * Math.random()),
      )
    }
    return {
      query,
    }
  },
}) {}
