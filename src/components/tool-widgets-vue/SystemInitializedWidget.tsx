import { defineComponent } from 'vue';
import { Card } from '../ui-vue/Card';

export const SystemInitializedWidget = defineComponent({
  name: 'SystemInitializedWidget',
  props: {
    sessionId: String,
    model: String,
    cwd: String,
    tools: {
      type: Array as () => string[],
      default: () => [],
    },
  },
  setup(props) {
    return () => (
      <Card class="p-2 mb-2">
        <div class="font-semibold text-sm mb-1">System Initialized</div>
        {props.sessionId && <div class="text-xs">Session ID: {props.sessionId}</div>}
        {props.model && <div class="text-xs">Model: {props.model}</div>}
        {props.cwd && <div class="text-xs">CWD: {props.cwd}</div>}
        {props.tools.length > 0 && (
          <div class="text-xs mt-1">Tools: {props.tools.join(', ')}</div>
        )}
      </Card>
    );
  },
});