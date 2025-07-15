import { defineComponent } from 'vue';

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

const buttonVariants = (variant?: string, size?: string) => {
  const base =
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50';
  const variants: Record<string, string> = {
    default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90',
    outline: 'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  };
  const sizes: Record<string, string> = {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 rounded-md px-3 text-xs',
    lg: 'h-10 rounded-md px-8',
    icon: 'h-9 w-9',
  };
  return cn(base, variants[variant || 'default'], sizes[size || 'default']);
};

export const Button = defineComponent({
  name: 'Button',
  props: {
    variant: {
      type: String,
      default: 'default',
    },
    size: {
      type: String,
      default: 'default',
    },
    class: String,
    disabled: Boolean,
    type: {
      type: String,
      default: 'button',
    },
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    return () => (
      <button
        class={cn(buttonVariants(props.variant, props.size), props.class)}
        disabled={props.disabled}
        type={props.type as any}
        onClick={e => emit('click', e)}
      >
        {slots.default?.()}
      </button>
    );
  },
});