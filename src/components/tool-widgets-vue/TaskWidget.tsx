import { defineComponent } from 'vue';
import { Card } from '../ui-vue/Card';

export const TaskWidget = defineComponent({
  name: 'TaskWidget',
  props: {
    description: String,
    prompt: String,
    result: Object,
  },
  setup(props) {
    return () => (
      <Card class="p-2 mb-2">
        <div class="font-semibold text-sm mb-1">Task</div>
        {props.description && <div class="text-xs mb-1">{props.description}</div>}
        {props.prompt && <div class="text-xs text-muted-foreground mb-1">Prompt: {props.prompt}</div>}
        {props.result && <div class="text-xs text-green-600">Result: {JSON.stringify(props.result)}</div>}
      </Card>
    );
  },
});