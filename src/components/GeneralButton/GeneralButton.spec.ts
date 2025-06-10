import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import GeneralButton from './GeneralButton.vue'

describe('GeneralButton.vue', () => {
  test('renders with default props', () => {
    const wrapper = mount(GeneralButton, {
      slots: {
        default: 'Test Button'
      }
    })

    expect(wrapper.text()).toContain('Test Button')

    expect(wrapper.classes()).toContain('button')
    expect(wrapper.classes()).toContain('variant--primary')
    expect(wrapper.classes()).toContain('color--red')
    expect(wrapper.classes()).toContain('size--md')
    expect(wrapper.classes()).toContain('theme--light')
  })

  test('renders with custom props', () => {
    const wrapper = mount(GeneralButton, {
      props: {
        variant: 'secondary',
        color: 'green',
        size: 'sm',
        theme: 'dark'
      }
    })

    expect(wrapper.classes()).toContain('variant--secondary')
    expect(wrapper.classes()).toContain('color--green')
    expect(wrapper.classes()).toContain('size--sm')
    expect(wrapper.classes()).toContain('theme--dark')
  })

  test('is clickable by default', async () => {
    const wrapper = mount(GeneralButton)

    await wrapper.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
