<template>
  <label class="Label">
    <div>
      {{ label }}
    </div>
    <input
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :minlength="minlength"
      :maxlength="maxlength"
      :disabled="disabled"
      :readonly="readonly"
      class="Input"
      @input="onInput">
  </label>
</template>

<script>
const types = ['text', 'search', 'email', 'date', 'password'];

export default {
  props: {
    type: {
      type: String,
      default: 'text',
      validator: t => types.indexOf(t) !== -1
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: null
    },
    minlength: {
      type: Number,
      default: null
    },
    maxlength: {
      type: Number,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value);
    }
  }
};
</script>

<style>
.Label {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
}

.Input {
  padding: calc(var(--space-base) * 2);
  color: var(--color-black);
  border: solid 1px var(--color-white);
  background-color: var(--color-white);
}
</style>
