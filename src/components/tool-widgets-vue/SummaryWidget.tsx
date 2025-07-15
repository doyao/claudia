import { defineComponent } from 'vue';
import { Card } from '../ui-vue/Card';

export const SummaryWidget = defineComponent({
  name: 'SummaryWidget',
  props: {
    summary: {
      type: String,
      required: true,
    },
    leafUuid: String,
  },
  setup(props) {
    return () => (
      <Card class="p-2 mb-2">
        <div class="font-semibold text-sm mb-1">Summary</div>
        <div class="text-xs whitespace-pre-wrap">{props.summary}</div>
        {props.leafUuid && (
          <div class="text-xs text-muted-foreground mt-1">Leaf UUID: {props.leafUuid}</div>
        )}
      </Card>
    );
  },
});