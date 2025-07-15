import { defineComponent } from 'vue';
import { Card } from '../ui-vue/Card';

export const EditWidget = defineComponent({
  name: 'EditWidget',
  props: {
    file_path: String,
    old_string: String,
    new_string: String,
    result: Object,
  },
  setup(props) {
    return () => (
      <Card class="p-2 mb-2">
        <div class="font-semibold text-sm mb-1">Edit File</div>
        <div class="text-xs mb-1">File: {props.file_path}</div>
        <div class="text-xs mb-1">Old: {props.old_string}</div>
        <div class="text-xs mb-1">New: {props.new_string}</div>
        {props.result && <div class="text-xs text-green-600">Result: {JSON.stringify(props.result)}</div>}
      </Card>
    );
  },
});