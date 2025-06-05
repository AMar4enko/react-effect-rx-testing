# Testing react+effect-rx using react-testing-library

Brief example of testing react + effect-rx application using react-testing-library.

## Files

- `src/services/UserRepoService.ts` - repo service for fetching user by id from the DB
- `src/infrastructure/Db.ts` - a-la live database layer
- `src/rx/index.ts` - reactive function, fetching user via UserRepoService
- `src/rx/runtime.ts` - Live layer and Rx runtime to enable Rx access to UserRepoService
- `src/Application.tsx` - the application component
- `tests/utils.tsx` - utility test function `describeMock` to make providing service mocks less verbose
- `src/__tests__/Application.test.tsx` - tests for Application component

## Running
`bun i`

Run the app via `bun dev`  
Run tests via `bun run test`