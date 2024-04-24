import { shallowMount } from '@vue/test-utils';
import BaseSwitcher from '@/components/ui/BaseSwitcher.vue';

describe('BaseSwitcher.vue', () => {
  it('should be unchecked', () => {
    const wrapper = shallowMount(BaseSwitcher);
    const checkbox = wrapper.find('[data-testid="base-switcher"]');
    expect(checkbox.element.checked).toBeFalsy();
  });

  it('should be checked', () => {
    const wrapper = shallowMount(BaseSwitcher, {
      propsData: {
        value: true,
      },
    });
    const checkbox = wrapper.find('[data-testid="base-switcher"]');
    expect(checkbox.element.checked).toBeTruthy();
  });

  it('should render titles correctly', () => {
    const wrapper = shallowMount(BaseSwitcher, {
      propsData: {
        titleLeft: 'Left Title',
        titleRight: 'Right Title',
      },
    });

    const labels = wrapper.findAll('label');
    expect(labels.at(0).text()).toContain('Left Title');
    expect(labels.at(0).text()).toContain('Right Title');
  });

  it('emits input event on change correctly', () => {
    const wrapper = shallowMount(BaseSwitcher);
    const checkbox = wrapper.find('[data-testid="base-switcher"]');
    checkbox.trigger('change');
    expect(wrapper.emitted('input')).toBeTruthy();
  });
});
