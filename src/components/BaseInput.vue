<template>
  <label class="Input">
    <p class="Input-label">
      {{ label }}
    </p>
    <input
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :minlength="minlength"
      :maxlength="maxlength"
      :disabled="disabled"
      :readonly="readonly"
      class="Input-field"
      @input="onInput"
    >
  </label>
</template>

<script lang="ts">
import Vue from 'vue';

const types = ['text', 'number', 'search', 'email', 'date', 'password'];

export default Vue.extend({
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
      type: [String, Number],
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
});
</script>

<style scoped>
.Input {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.Input-label {
  margin-bottom: var(--space-2x);
}

.Input-field {
  padding: var(--space-4x);
  transition: background-color 300ms ease-in-out, border-color 300ms ease-in-out;
  border-top: 1px solid var(--color-gray);
  border-left: 1px solid var(--color-gray);
  border-width: 0 0 1px 0;
  background-color: white;
  color: var(--color-black);
  will-change: background-color, border-color;
}

input[readonly] {
  background-color: beige;
}
</style>
