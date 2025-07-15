import { defineComponent } from 'vue';
import { Card } from '../ui-vue/Card';

export const MCPWidget = defineComponent({
  name: 'MCPWidget',
  props: {
    toolName: String,
    input: Object,
    result: Object,
  },
  setup(props) {
    return () => (
      <Card class="p-2 mb-2">
        <div class="font-semibold text-sm mb-1">MCP Tool</div>
        <div class="text-xs mb-1">Tool: {props.toolName}</div>
        {props.input && <div class="text-xs mb-1">Input: {JSON.stringify(props.input)}</div>}
        {props.result && <div class="text-xs text-green-600">Result: {JSON.stringify(props.result)}</div>}
      </Card>
    );
  },
});