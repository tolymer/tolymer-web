<template>
  <button
    :type="type"
    :kind="kind"
    :class="[k]"
    class="Button"
    @click="onClick">
    <slot />
  </button>
</template>

<script>
const types = ['button', 'submit'];
const kinds = ['normal', 'bordered'];

export default {
  props: {
    type: {
      type: String,
      default: 'button',
      validator: t => types.indexOf(t) !== -1
    },
    kind: {
      type: String,
      default: 'normal',
      validator: k => kinds.indexOf(k) !== -1
    }
  },
  computed: {
    k() {
      return `-${this.kind}`;
    }
  },
  methods: {
    onClick(e) {
      this.$emit('click', e);
    }
  }
};
</script>

<style>
.Button {
  width: 100%;
  max-width: 320px;
  padding: calc(var(--space-base) * 2);
  border-radius: var(--radius-base);
}

.Button.-normal {
  color: var(--color-black);
  border: solid 1px var(--color-gray);
  background-color: var(--color-gray);
}

.Button.-bordered {
  color: var(--color-black);
  border: solid 1px currentColor;
  background-color: var(--color-light-gray);
}
</style>
