/* eslint-disable react/react-in-jsx-scope */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import Header from '../components/Header.vue';
import IconMahjong from '../components/IconMahjong.vue';

storiesOf('BaseButton', module).add('Inventory', () => ({
  components: { BaseButton },
  template: `
    <div>
      <BaseButton @click="action">ボタン</BaseButton>
      <BaseButton 
        kind="bordered" 
        @click="action">ボタン</BaseButton>
    </div>
    `,
  methods: { action: action('clicked') }
}));

storiesOf('BaseInput', module).add('Inventory', () => ({
  components: { BaseInput },
  template: `
    <div>
      <BaseInput
        v-model="name"
        label="ログインID"/>
    </div>
    `
}));

storiesOf('Header', module).add('Inventory', () => ({
  components: { Header },
  template: `
    <div>
      <Header title="ログイン" />
    </div>
    `
}));

