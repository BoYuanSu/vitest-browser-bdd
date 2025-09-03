import { loadFeature, describeFeature } from '@amiceli/vitest-cucumber/browser'
import { page, userEvent } from '@vitest/browser/context'
import { render, cleanup, type RenderResult } from 'vitest-browser-vue'
import BaseButton from './BaseButton.vue'


const feature = await loadFeature('src/components/BaseButton/BaseButton.feature')

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

      page.screenshot({ save: true, path: './screenshots/default-button.png' })
    })

    When('I click the default button', async () => {
      page.screenshot({ save: true, path: './screenshots/default-button2.png' })
      console.log('🚀 ~ When I click the default button:', screen.baseElement)
      const button = await screen.getByRole('button', { name: 'test' })
      await user.click(button)

    })

    // Then('I should see the default button clicked state', async () => {
    //   const button = await screen.getByRole('button')
    //   // expect(button).toBeInTheDocument()
    // })
  })
})
