import { defineComponent } from 'vue';
import { Card } from '../ui-vue/Card';

export const GlobWidget = defineComponent({
  name: 'GlobWidget',
  props: {
    pattern: String,
    result: Object,
  },
  setup(props) {
    return () => (
      <Card class="p-2 mb-2">
        <div class="font-semibold text-sm mb-1">Glob Pattern</div>
        <div class="text-xs mb-1">Pattern: {props.pattern}</div>
        {props.result && <div class="text-xs text-green-600">Result: {JSON.stringify(props.result)}</div>}
      </Card>
    );
  },
});