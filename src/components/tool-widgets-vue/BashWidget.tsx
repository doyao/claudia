import { defineComponent } from 'vue';
import { Card } from '../ui-vue/Card';

export const BashWidget = defineComponent({
  name: 'BashWidget',
  props: {
    command: String,
    description: String,
    result: Object,
  },
  setup(props) {
    return () => (
      <Card class="p-2 mb-2">
        <div class="font-semibold text-sm mb-1">Bash Command</div>
        <div class="text-xs mb-1">Command: {props.command}</div>
        {props.description && <div class="text-xs text-muted-foreground mb-1">{props.description}</div>}
        {props.result && <div class="text-xs text-green-600">Result: {JSON.stringify(props.result)}</div>}
      </Card>
    );
  },
});