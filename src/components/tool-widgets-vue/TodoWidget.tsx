import { defineComponent } from 'vue';
import { Badge } from '../ui-vue/Badge';

// TODO: 替换为 lucide-vue-next 图标组件
const CheckCircle2 = () => <span style={{color: 'green'}}>✔️</span>;
const Clock = () => <span style={{color: 'blue'}}>🕒</span>;
const Circle = () => <span style={{color: 'gray'}}>●</span>;
const FileEdit = () => <span style={{color: '#888'}}>📝</span>;

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export const TodoWidget = defineComponent({
  name: 'TodoWidget',
  props: {
    todos: {
      type: Array as () => any[],
      required: true,
    },
    result: Object,
  },
  setup(props) {
    const statusIcons: Record<string, any> = {
      completed: <CheckCircle2 />,
      in_progress: <Clock />,
      pending: <Circle />,
    };
    const priorityColors: Record<string, string> = {
      high: 'bg-red-500/10 text-red-500 border-red-500/20',
      medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      low: 'bg-green-500/10 text-green-500 border-green-500/20',
    };
    return () => (
      <div class="space-y-2">
        <div class="flex items-center gap-2 mb-3">
          <FileEdit />
          <span class="text-sm font-medium">Todo List</span>
        </div>
        <div class="space-y-2">
          {props.todos.map((todo, idx) => (
            <div
              key={todo.id || idx}
              class={cn(
                'flex items-start gap-3 p-3 rounded-lg border bg-card/50',
                todo.status === 'completed' && 'opacity-60'
              )}
            >
              <div class="mt-0.5">
                {statusIcons[todo.status] || statusIcons.pending}
              </div>
              <div class="flex-1 space-y-1">
                <p class={cn('text-sm', todo.status === 'completed' && 'line-through')}>
                  {todo.content}
                </p>
                {todo.priority && (
                  <Badge
                    variant="outline"
                    class={cn('text-xs', priorityColors[todo.priority])}
                  >
                    {todo.priority}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
});