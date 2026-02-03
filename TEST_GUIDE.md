# Test Suite Configuration

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm test:watch
```

### Run tests with coverage report
```bash
npm test:coverage
```

## Test Structure

```
__tests__/
├── Logo.test.tsx       # Component unit tests
├── projects.test.ts    # Library function tests
└── ...
```

## CI/CD Pipeline

The GitHub Actions workflow runs:
1. **Lint** - ESLint (code quality)
2. **Tests** - Jest (unit & integration)
3. **TypeCheck** - TypeScript (type safety)
4. **Build** - Next.js build

All must pass before deployment to Vercel.

## Coverage Goals

- Statements: > 70%
- Branches: > 60%
- Functions: > 70%
- Lines: > 70%
