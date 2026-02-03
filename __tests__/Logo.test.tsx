import { render } from '@testing-library/react'
import { Logo } from '@/components/Logo'

describe('Logo Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Logo />)
    const svg = container.querySelector('svg')
    expect(svg).not.toBeNull()
  })
})
