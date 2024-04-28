import { shallowMount, createLocalVue } from '@vue/test-utils';
import { localizeFilter } from '@/filters';
import InputRadio from '@/components/ui/InputRadio.vue';

const localVue = createLocalVue();
localVue.filter('localize', localizeFilter);

describe('InputRadio.vue', () => {
  it('should be checked', () => {
    const wrapper = shallowMount(InputRadio, {
      localVue,
      propsData: { checked: true },
    });

    const radio = wrapper.find('[data-testid="type-radio"]');
    expect(radio.element.checked).toBeTruthy();
  });

  it('should be unchecked', () => {
    const wrapper = shallowMount(InputRadio, {
      localVue,
      propsData: { checked: false },
    });

    const radio = wrapper.find('[data-testid="type-radio"]');
    expect(radio.element.checked).toBeFalsy();
  });

  it('emits change input event correctly', () => {
    const wrapper = shallowMount(InputRadio, {
      localVue,
      propsData: {
        value: 'income',
        checked: true,
      },
    });

    wrapper.find('[data-testid="type-radio"]').trigger('change');
    expect(wrapper.emitted('change')[0]).toEqual(['income']);
  });
});
