import { defineComponent } from 'vue';
import { Card } from '../ui-vue/Card';

export const WriteWidget = defineComponent({
  name: 'WriteWidget',
  props: {
    filePath: String,
    content: String,
    result: Object,
  },
  setup(props) {
    return () => (
      <Card class="p-2 mb-2">
        <div class="font-semibold text-sm mb-1">Write File</div>
        <div class="text-xs mb-1">File: {props.filePath}</div>
        <pre class="text-xs bg-muted/30 rounded p-1 mb-1">{props.content}</pre>
        {props.result && <div class="text-xs text-green-600">Result: {JSON.stringify(props.result)}</div>}
      </Card>
    );
  },
});