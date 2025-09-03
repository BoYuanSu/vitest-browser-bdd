import { render } from 'vitest-browser-vue'
import App from '../App.vue'

describe('app', () => {
  it('render', () => {
    const screen = render(App)
  })
})
