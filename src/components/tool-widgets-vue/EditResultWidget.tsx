import { defineComponent } from 'vue';
import { Card } from '../ui-vue/Card';

export const EditResultWidget = defineComponent({
  name: 'EditResultWidget',
  props: {
    content: String,
  },
  setup(props) {
    return () => (
      <Card class="p-2 mb-2">
        <div class="font-semibold text-sm mb-1">Edit Result</div>
        <pre class="text-xs whitespace-pre-wrap">{props.content}</pre>
      </Card>
    );
  },
});