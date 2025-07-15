import { defineComponent } from 'vue';

export const ThinkingWidget = defineComponent({
  name: 'ThinkingWidget',
  props: {
    thinking: {
      type: String,
      required: true,
    },
    signature: String,
  },
  setup(props) {
    return () => (
      <div class="p-2 bg-muted/30 rounded mb-2">
        <div class="font-semibold text-xs text-blue-500 mb-1">Thinking...</div>
        <div class="text-xs whitespace-pre-wrap">{props.thinking}</div>
        {props.signature && (
          <div class="text-xs text-muted-foreground mt-1">Signature: {props.signature}</div>
        )}
      </div>
    );
  },
});