import { defineComponent } from 'vue';
import { Card } from '../ui-vue/Card';

export const MultiEditWidget = defineComponent({
  name: 'MultiEditWidget',
  props: {
    file_path: String,
    edits: Array,
    result: Object,
  },
  setup(props) {
    return () => (
      <Card class="p-2 mb-2">
        <div class="font-semibold text-sm mb-1">Multi Edit</div>
        <div class="text-xs mb-1">File: {props.file_path}</div>
        {props.edits && Array.isArray(props.edits) && (
          <ul class="text-xs mb-1">
            {props.edits.map((edit: any, idx: number) => (
              <li key={idx}>Old: {edit.old_string} → New: {edit.new_string}</li>
            ))}
          </ul>
        )}
        {props.result && <div class="text-xs text-green-600">Result: {JSON.stringify(props.result)}</div>}
      </Card>
    );
  },
});