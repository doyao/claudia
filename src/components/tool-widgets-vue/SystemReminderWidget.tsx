import { defineComponent } from 'vue';
import { Card } from '../ui-vue/Card';

export const SystemReminderWidget = defineComponent({
  name: 'SystemReminderWidget',
  props: {
    message: String,
  },
  setup(props) {
    return () => (
      <Card class="p-2 mb-2 bg-yellow-100">
        <div class="font-semibold text-sm mb-1">System Reminder</div>
        <div class="text-xs">{props.message}</div>
      </Card>
    );
  },
});