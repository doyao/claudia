import { defineComponent } from 'vue';
import { Card } from '../ui-vue/Card';

// TODO: 替换为 lucide-vue-next 图标组件
const Terminal = () => <span style={{color: 'green'}}>💻</span>;
const AlertCircle = () => <span style={{color: 'red'}}>⚠️</span>;

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export const CommandWidget = defineComponent({
  name: 'CommandWidget',
  props: {
    commandName: String,
    commandMessage: String,
    commandArgs: String,
  },
  setup(props) {
    return () => (
      <Card class="p-2 mb-2">
        <div class="flex items-center gap-2 mb-1">
          <Terminal />
          <span class="font-mono text-xs">{props.commandName}</span>
        </div>
        <div class="text-xs text-muted-foreground mb-1">{props.commandMessage}</div>
        {props.commandArgs && (
          <pre class="text-xs font-mono bg-muted/30 rounded p-1">{props.commandArgs}</pre>
        )}
      </Card>
    );
  },
});

export const CommandOutputWidget = defineComponent({
  name: 'CommandOutputWidget',
  props: {
    output: String,
    onLinkDetected: Function,
  },
  setup(props) {
    // 可扩展：检测链接并高亮
    return () => (
      <Card class="p-2 mb-2">
        <div class="flex items-center gap-2 mb-1">
          <Terminal />
          <span class="font-mono text-xs">Command Output</span>
        </div>
        <pre class="text-xs font-mono whitespace-pre-wrap">{props.output}</pre>
      </Card>
    );
  },
});