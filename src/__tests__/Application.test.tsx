import Application from '@/Application.tsx'
import UserRepoService, { UserNotFoundError } from '@/services/UserRepoService'
import { Substitute } from '@fluffy-spoon/substitute'
import { within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { describeMock } from '@tests/utils.tsx'
import { Effect, Layer } from 'effect'
import { describe, expect, test } from 'vitest'

describeMock(`Application component`, (mock) => {
  let mocks = mock(() => {
    const userRepo = Substitute.for<UserRepoService>()

    const test = Layer.succeed(UserRepoService, userRepo)

    return {
      layer: test,
      userRepo,
    }
  })

  test(`happy path`, async () => {
    const { render, userRepo } = mocks
    userRepo.getUser(`1`).returns(Effect.succeed({ id: 1, name: `Test user` }))

    const el = render(<Application />)

    await el.findAllByTestId(`idle`)

    await userEvent.type(el.getByRole(`textbox`), `1`)

    await userEvent.click(el.getByTestId(`get-user`))

    const success = await el.findByTestId(`success`)

    await within(success).findByText(/name: Test user/)
  })

  test(`not found`, async () => {
    const { render, userRepo } = mocks
    userRepo.getUser(`1`).returns(Effect.fail(new UserNotFoundError()))

    const el = render(<Application />)

    await el.findAllByTestId(`idle`)

    await userEvent.type(el.getByRole(`textbox`), `1`)

    await userEvent.click(el.getByTestId(`get-user`))

    const success = await el.findByTestId(`error`)
  })

  test(`waiting`, async () => {
    const { render, userRepo } = mocks
    userRepo.getUser(`1`).returns(Effect.never)

    const el = render(<Application />)

    await el.findAllByTestId(`idle`)

    await userEvent.type(el.getByRole(`textbox`), `1`)

    const button = el.getByTestId(`get-user`)

    await userEvent.click(button)

    expect(button.hasAttribute(`disabled`)).toBe(true)

    await el.findByTestId(`loading`)
  })
})
