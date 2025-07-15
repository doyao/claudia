import { defineComponent } from 'vue';
import { Card } from '../ui-vue/Card';

export const WebSearchWidget = defineComponent({
  name: 'WebSearchWidget',
  props: {
    query: String,
    result: Object,
  },
  setup(props) {
    return () => (
      <Card class="p-2 mb-2">
        <div class="font-semibold text-sm mb-1">Web Search</div>
        <div class="text-xs mb-1">Query: {props.query}</div>
        {props.result && <div class="text-xs text-green-600">Result: {JSON.stringify(props.result)}</div>}
      </Card>
    );
  },
});