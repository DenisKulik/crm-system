import { shallowMount } from '@vue/test-utils';

import Vue from 'vue';
import { localizeFilter } from '@/filters';
import InputRadio from '@/components/ui/InputRadio.vue';

Vue.filter('localize', localizeFilter);

describe('InputRadio.vue', () => {
  it('should be checked', () => {
    const wrapper = shallowMount(InputRadio, {
      propsData: { checked: true },
    });

    const radio = wrapper.find('[data-testid="type-radio"]');
    expect(radio.element.checked).toBeTruthy();
  });

  it('should be unchecked', () => {
    const wrapper = shallowMount(InputRadio, {
      propsData: { checked: false },
    });

    const radio = wrapper.find('[data-testid="type-radio"]');
    expect(radio.element.checked).toBeFalsy();
  });

  it('emits change input event correctly', () => {
    const wrapper = shallowMount(InputRadio, {
      propsData: {
        value: 'income',
        checked: true,
      },
    });

    wrapper.find('[data-testid="type-radio"]').trigger('change');
    expect(wrapper.emitted('change')[0]).toEqual(['income']);
  });
});
