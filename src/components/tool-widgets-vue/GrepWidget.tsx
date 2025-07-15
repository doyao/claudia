import { defineComponent } from 'vue';
import { Card } from '../ui-vue/Card';

export const GrepWidget = defineComponent({
  name: 'GrepWidget',
  props: {
    pattern: String,
    include: String,
    path: String,
    exclude: String,
    result: Object,
  },
  setup(props) {
    return () => (
      <Card class="p-2 mb-2">
        <div class="font-semibold text-sm mb-1">Grep</div>
        <div class="text-xs mb-1">Pattern: {props.pattern}</div>
        {props.include && <div class="text-xs">Include: {props.include}</div>}
        {props.path && <div class="text-xs">Path: {props.path}</div>}
        {props.exclude && <div class="text-xs">Exclude: {props.exclude}</div>}
        {props.result && <div class="text-xs text-green-600">Result: {JSON.stringify(props.result)}</div>}
      </Card>
    );
  },
});