import { loadFeatureFromText, describeFeature } from '@amiceli/vitest-cucumber'
import { page, userEvent } from '@vitest/browser/context'
import { render, type RenderResult } from 'vitest-browser-vue/pure'
import BaseButton from './BaseButton.vue'

import rawFeature from '@/components/BaseButton/BaseButton.feature?raw'


// pat https://github.com/amiceli/vitest-cucumber/issues/258
// const feature = await loadFeature('./BaseButton.feature')
const feature = loadFeatureFromText(rawFeature)

describeFeature(feature, ({ Scenario }) => {
  // Write your tests here
  let screen: RenderResult<any>
  const user = userEvent.setup()

  Scenario('Default Button', async ({ Given, When, Then }) => {
    const mockClick = vi.fn()
    Given('I am on the button page', async () => {
      screen = render(BaseButton, {
        slots: {
          default: 'test'
        },
        props: {
          onClick: mockClick
        }
      })
      const button = await screen.getByRole('button', { name: 'test' })
      await user.click(button)
      expect(mockClick).toHaveBeenCalledTimes(1)
      console.log('🚀 ~ Given I am on the button page:', screen.baseElement)

      await page.screenshot({ save: true, path: './screenshots/default-button.png' })
    })

    When('I click the default button', async () => {
      await page.screenshot({ save: true, path: './screenshots/default-button2.png' })
      console.log('🚀 ~ When I click the default button:', screen.baseElement)
      const button = screen.getByRole('button', { name: 'test' })
      await user.click(button)

    })

    // Then('I should see the default button clicked state', async () => {
    //   const button = await screen.getByRole('button')
    //   // expect(button).toBeInTheDocument()
    // })
  })
})
