import { defineComponent, ref } from 'vue';
import { Card } from '../ui-vue/Card';

export const TodoReadWidget = defineComponent({
  name: 'TodoReadWidget',
  props: {
    todos: Array,
    result: Object,
  },
  setup(props) {
    const expanded = ref(false);
    return () => (
      <Card class="p-2 mb-2">
        <div class="font-semibold text-sm mb-1">Todo Read</div>
        <button class="text-xs underline mb-1" onClick={() => (expanded.value = !expanded.value)}>
          {expanded.value ? '收起' : '展开'} Todos
        </button>
        {expanded.value && props.todos && Array.isArray(props.todos) && (
          <ul class="text-xs mb-1">
            {props.todos.map((todo: any, idx: number) => (
              <li key={idx}>{todo.content} [{todo.status}]</li>
            ))}
          </ul>
        )}
        {props.result && <div class="text-xs text-green-600">Result: {JSON.stringify(props.result)}</div>}
      </Card>
    );
  },
});