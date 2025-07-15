import { defineComponent } from 'vue';
import { Card } from '../ui-vue/Card';

// TODO: 替换为 lucide-vue-next 图标组件
const FileText = () => <span style={{color: '#888'}}>📄</span>;

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export const ReadResultWidget = defineComponent({
  name: 'ReadResultWidget',
  props: {
    content: {
      type: String,
      required: true,
    },
    filePath: String,
  },
  setup(props) {
    // 可扩展：根据 filePath 判断高亮语言
    return () => (
      <Card class="p-2">
        <pre class="text-xs font-mono whitespace-pre-wrap">{props.content}</pre>
      </Card>
    );
  },
});

export const ReadWidget = defineComponent({
  name: 'ReadWidget',
  props: {
    filePath: {
      type: String,
      required: true,
    },
    result: Object,
  },
  setup(props) {
    return () => {
      if (props.result) {
        let resultContent = '';
        if (typeof props.result.content === 'string') {
          resultContent = props.result.content;
        } else if (props.result.content && typeof props.result.content === 'object') {
          if (props.result.content.text) {
            resultContent = props.result.content.text;
          } else if (Array.isArray(props.result.content)) {
            resultContent = props.result.content
              .map((c: any) => (typeof c === 'string' ? c : c.text || JSON.stringify(c)))
              .join('\n');
          } else {
            resultContent = JSON.stringify(props.result.content, null, 2);
          }
        }
        return (
          <div class="space-y-2">
            <div class="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <FileText />
              <span class="text-sm">File content:</span>
              <code class="text-sm font-mono bg-background px-2 py-0.5 rounded flex-1 truncate">{props.filePath}</code>
            </div>
            {resultContent && <ReadResultWidget content={resultContent} filePath={props.filePath} />}
          </div>
        );
      }
      return (
        <div class="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
          <FileText />
          <span class="text-sm">Reading file:</span>
          <code class="text-sm font-mono bg-background px-2 py-0.5 rounded flex-1 truncate">{props.filePath}</code>
          {!props.result && (
            <div class="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
              <div class="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
              <span>Loading...</span>
            </div>
          )}
        </div>
      );
    };
  },
});