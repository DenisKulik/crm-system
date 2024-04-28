import { createLocalVue, shallowMount } from '@vue/test-utils';
import BaseButtonSubmit from '@/components/ui/BaseButtonSubmit.vue';
import { localizeFilter } from '@/filters';

const localVue = createLocalVue();
localVue.filter('localize', localizeFilter);

describe('BaseButtonSubmit.vue', () => {
  it('renders button with title correctly', () => {
    const wrapper = shallowMount(BaseButtonSubmit, {
      localVue,
      propsData: {
        titleKey: 'Create',
      },
    });

    const button = wrapper.find('button');
    expect(button.text()).toContain('Создать');
    expect(button.attributes('type')).toBe('submit');
  });
});
