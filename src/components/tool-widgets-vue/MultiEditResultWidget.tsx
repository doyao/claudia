import { defineComponent } from 'vue';
import { Card } from '../ui-vue/Card';

export const MultiEditResultWidget = defineComponent({
  name: 'MultiEditResultWidget',
  props: {
    content: String,
    edits: Array,
  },
  setup(props) {
    return () => (
      <Card class="p-2 mb-2">
        <div class="font-semibold text-sm mb-1">Multi Edit Result</div>
        <pre class="text-xs whitespace-pre-wrap">{props.content}</pre>
        {props.edits && Array.isArray(props.edits) && (
          <ul class="text-xs mt-1">
            {props.edits.map((edit: any, idx: number) => (
              <li key={idx}>Old: {edit.old_string} → New: {edit.new_string}</li>
            ))}
          </ul>
        )}
      </Card>
    );
  },
});