import rxRuntime from '@/rx/runtime.ts'
import { Rx } from '@effect-rx/rx'
import { RegistryProvider } from '@effect-rx/rx-react'
import { render as r } from '@testing-library/react'
import type { Layer } from 'effect'
import type React from 'react'
import { type Mock, beforeEach, describe, vi } from 'vitest'

export const describeMock = (
  name: string,
  fn: (
    mock: <L extends Layer.Layer.Any, R extends { layer: L }>(
      fn: () => R,
    ) => {
      [key in Exclude<keyof R, 'layer'> | 'render']: key extends keyof R
        ? R[key]
        : typeof r
    },
  ) => void,
) => {
  describe(name, () => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    let values: any = {}
    let mock = new Proxy(
      {},
      {
        get(_, prop) {
          if (!values[prop]) {
            throw new Error(`Mock not found for ${String(prop)}`)
          }

          return values[prop]
        },
      },
    )

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const mockRuntime = (fn: any) => {
      beforeEach(() => {
        const { layer, ...mocks } = fn()
        const initialValues = Rx.initialValue(rxRuntime.layer, layer)
        values = mocks
        const render = (node: React.ReactNode) =>
          r(
            <RegistryProvider initialValues={[initialValues]}>
              {node}
            </RegistryProvider>,
          )

        values.render = render
      })

      return mock
    }

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    fn(mockRuntime as any)
  })
}
