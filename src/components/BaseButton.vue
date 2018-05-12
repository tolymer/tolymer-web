<template>
  <button
    :type="type"
    :kind="kind"
    :class="[k]"
    class="Button"
    @click="onClick">
    <span
      class="Button-icon">
      <slot name="icon"/>
    </span>
    <slot />
  </button>
</template>

<script>
const types = ['button', 'submit'];
const kinds = ['normal', 'primary', 'bordered'];

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

<style scoped>
.Button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: var(--space-4x);
  border-radius: var(--radius-base);
  box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.1);
  transition: background-color 300ms ease-in-out, box-shadow 300ms ease-in-out;
  will-change: background-color, box-shadow;
}

.Button.-normal {
  border: 1px solid white;
  background-color: white;
  color: var(--color-black);
  box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.1);
}

.Button.-normal:hover {
  background-color: var(--color-light-gray);
}

.Button.-normal:active {
  background-color: var(--color-light-gray);
  box-shadow: 0 0 0 transparent;
}

.Button.-normal:focus {
  outline: 0;
  background-color: var(--color-light-gray);
  box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.1), 0px 0px 0px 2px var(--color-green);
}

.Button.-primary {
  border: 1px solid var(--color-green);
  background-color: var(--color-green);
  color: var(--color-black);
}

.Button.-bordered {
  border: 1px solid currentColor;
  background-color: transparent;
  color: var(--color-black);
}

.Button-icon {
  margin-right: var(--space-2x);
}
</style>
