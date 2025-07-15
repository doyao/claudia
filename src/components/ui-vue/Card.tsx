import { defineComponent } from 'vue';

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export const Card = defineComponent({
  name: 'Card',
  props: {
    class: String,
  },
  setup(props, { slots }) {
    return () => (
      <div
        class={cn('rounded-lg border shadow-xs', props.class)}
        style={{
          borderColor: 'var(--color-border)',
          backgroundColor: 'var(--color-card)',
          color: 'var(--color-card-foreground)',
        }}
      >
        {slots.default?.()}
      </div>
    );
  },
});

export const CardHeader = defineComponent({
  name: 'CardHeader',
  props: {
    class: String,
  },
  setup(props, { slots }) {
    return () => (
      <div class={cn('flex flex-col space-y-1.5 p-6', props.class)}>{slots.default?.()}</div>
    );
  },
});

export const CardTitle = defineComponent({
  name: 'CardTitle',
  props: {
    class: String,
  },
  setup(props, { slots }) {
    return () => (
      <h3 class={cn('font-semibold leading-none tracking-tight', props.class)}>{slots.default?.()}</h3>
    );
  },
});

export const CardDescription = defineComponent({
  name: 'CardDescription',
  props: {
    class: String,
  },
  setup(props, { slots }) {
    return () => (
      <p class={cn('text-sm text-muted-foreground', props.class)}>{slots.default?.()}</p>
    );
  },
});

export const CardContent = defineComponent({
  name: 'CardContent',
  props: {
    class: String,
  },
  setup(props, { slots }) {
    return () => (
      <div class={cn('p-6 pt-0', props.class)}>{slots.default?.()}</div>
    );
  },
});

export const CardFooter = defineComponent({
  name: 'CardFooter',
  props: {
    class: String,
  },
  setup(props, { slots }) {
    return () => (
      <div class={cn('flex items-center p-6 pt-0', props.class)}>{slots.default?.()}</div>
    );
  },
});