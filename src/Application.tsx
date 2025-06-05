import { Result, useRx } from '@effect-rx/rx-react'
import { useState } from 'react'
import { rxUser } from './rx/index.ts'

export default function Application() {
  const [user, getUserById] = useRx(rxUser)
  const [userId, setUserId] = useState(``)

  const ui = Result.match(user, {
    onInitial: () => <div data-testid="idle">Idling</div>,
    onFailure: ({ cause }) => (
      <div data-testid="error">{JSON.stringify(cause)}</div>
    ),
    onSuccess: (user) => (
      <div data-testid="success">
        id: {user.value.id}, name: {user.value.name}
      </div>
    ),
  })

  return (
    <>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button
        onClick={() => getUserById(userId)}
        data-testid="get-user"
        disabled={user.waiting}
      >
        Get User
      </button>
      {user.waiting ? <div data-testid="loading">Loading...</div> : ui}
    </>
  )
}
