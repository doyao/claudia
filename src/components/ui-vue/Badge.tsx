import { defineComponent } from 'vue';

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

const badgeVariants = (variant?: string) => {
  const base =
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors';
  const variants: Record<string, string> = {
    default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
    outline: 'text-foreground',
  };
  return cn(base, variants[variant || 'default']);
};

export const Badge = defineComponent({
  name: 'Badge',
  props: {
    variant: {
      type: String,
      default: 'default',
    },
    class: String,
  },
  setup(props, { slots }) {
    return () => (
      <div class={cn(badgeVariants(props.variant), props.class)}>{slots.default?.()}</div>
    );
  },
});