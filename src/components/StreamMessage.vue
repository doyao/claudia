<script lang="tsx">
import { defineComponent, ref, watch } from 'vue';
import type { PropType } from 'vue';
import MarkdownIt from 'vue3-markdown-it';
import 'highlight.js/styles/github.css';
import hljs from 'highlight.js';
import markdownItGfm from 'markdown-it-gfm';
import {
  TodoWidget,
  LSWidget,
  ReadWidget,
  CommandWidget,
  CommandOutputWidget,
  SummaryWidget,
  ThinkingWidget,
  TaskWidget,
  SystemInitializedWidget,
  EditWidget,
  MultiEditWidget,
  MCPWidget,
  TodoReadWidget,
  GlobWidget,
  BashWidget,
  WriteWidget,
  GrepWidget,
  EditResultWidget,
  MultiEditResultWidget,
  SystemReminderWidget,
  WebSearchWidget,
  WebFetchWidget,
} from './tool-widgets-vue/WidgetIndex';
import { Card, CardContent } from './ui-vue/Card';

export interface ClaudeStreamMessage {
  type: 'system' | 'assistant' | 'user' | 'result';
  subtype?: string;
  message?: {
    content?: any[];
    usage?: {
      input_tokens: number;
      output_tokens: number;
    };
  };
  usage?: {
    input_tokens: number;
    output_tokens: number;
  };
  [key: string]: any;
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

function renderMarkdown(text: string) {
  return (
    <MarkdownIt
      source={text}
      options={{
        highlight: (str: string, lang: string) => {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return `<pre class='hljs'><code>${hljs.highlight(str, { language: lang }).value}</code></pre>`;
            } catch (__) {}
          }
          return `<pre class='hljs'><code>${MarkdownIt.utils.escapeHtml(str)}</code></pre>`;
        },
        html: false,
        linkify: true,
        typographer: true,
      }}
      plugins={[markdownItGfm]}
      class="prose prose-sm max-w-none"
    />
  );
}

export default defineComponent({
  name: 'StreamMessage',
  props: {
    message: {
      type: Object as PropType<ClaudeStreamMessage>,
      required: true,
    },
    className: String,
    streamMessages: {
      type: Array as PropType<ClaudeStreamMessage[]>,
      required: true,
    },
    onLinkDetected: Function as PropType<(url: string) => void>,
  },
  setup(props) {
    // 工具结果映射
    const toolResults = ref(new Map<string, any>());
    watch(() => props.streamMessages, (newMsgs) => {
      const results = new Map<string, any>();
      newMsgs.forEach(msg => {
        if (msg.type === 'user' && msg.message?.content && Array.isArray(msg.message.content)) {
          msg.message.content.forEach((content: any) => {
            if (content.type === 'tool_result' && content.tool_use_id) {
              results.set(content.tool_use_id, content);
            }
          });
        }
      });
      toolResults.value = results;
    }, { immediate: true });
    const getToolResult = (toolId?: string) => {
      if (!toolId) return null;
      return toolResults.value.get(toolId) || null;
    };
    // 渲染主逻辑
    return () => {
      const message = props.message;
      if (message.isMeta && !message.leafUuid && !message.summary) return null;
      if (message.leafUuid && message.summary && (message as any).type === 'summary') {
        return <SummaryWidget summary={message.summary} leafUuid={message.leafUuid} />;
      }
      if (message.type === 'system' && message.subtype === 'init') {
        return <SystemInitializedWidget sessionId={message.session_id} model={message.model} cwd={message.cwd} tools={message.tools} />;
      }
      if (message.type === 'assistant' && message.message) {
        const msg = message.message;
        let renderedSomething = false;
        const renderedCard = (
          <Card class={cn('border-primary/20 bg-primary/5', props.className)}>
            <CardContent class="p-4">
              <div class="flex items-start gap-3">
                <span style={{color:'#888'}}>🤖</span>
                <div class="flex-1 space-y-2 min-w-0">
                  {msg.content && Array.isArray(msg.content) && msg.content.map((content: any, idx: number) => {
                    // 文本内容
                    if (content.type === 'text') {
                      const textContent = typeof content.text === 'string' ? content.text : (content.text?.text || JSON.stringify(content.text || content));
                      renderedSomething = true;
                      return <div key={idx}>{renderMarkdown(textContent)}</div>;
                    }
                    // 思考内容
                    if (content.type === 'thinking') {
                      renderedSomething = true;
                      return <ThinkingWidget key={idx} thinking={content.thinking || ''} signature={content.signature} />;
                    }
                    // 工具调用
                    if (content.type === 'tool_use') {
                      const toolName = content.name?.toLowerCase();
                      const input = content.input;
                      const toolId = content.id;
                      const toolResult = getToolResult(toolId);
                      if (toolName === 'task' && input) {
                        renderedSomething = true;
                        return <TaskWidget key={idx} description={input.description} prompt={input.prompt} result={toolResult} />;
                      }
                      if (toolName === 'edit' && input?.file_path) {
                        renderedSomething = true;
                        return <EditWidget key={idx} {...input} result={toolResult} />;
                      }
                      if (toolName === 'multiedit' && input?.file_path && input?.edits) {
                        renderedSomething = true;
                        return <MultiEditWidget key={idx} {...input} result={toolResult} />;
                      }
                      if (content.name?.startsWith('mcp__')) {
                        renderedSomething = true;
                        return <MCPWidget key={idx} toolName={content.name} input={input} result={toolResult} />;
                      }
                      if (toolName === 'todowrite' && input?.todos) {
                        renderedSomething = true;
                        return <TodoWidget key={idx} todos={input.todos} result={toolResult} />;
                      }
                      if (toolName === 'todoread') {
                        renderedSomething = true;
                        return <TodoReadWidget key={idx} todos={input?.todos} result={toolResult} />;
                      }
                      if (toolName === 'ls' && input?.path) {
                        renderedSomething = true;
                        return <LSWidget key={idx} path={input.path} result={toolResult} />;
                      }
                      if (toolName === 'read' && input?.file_path) {
                        renderedSomething = true;
                        return <ReadWidget key={idx} filePath={input.file_path} result={toolResult} />;
                      }
                      if (toolName === 'glob' && input?.pattern) {
                        renderedSomething = true;
                        return <GlobWidget key={idx} pattern={input.pattern} result={toolResult} />;
                      }
                      if (toolName === 'bash' && input?.command) {
                        renderedSomething = true;
                        return <BashWidget key={idx} command={input.command} description={input.description} result={toolResult} />;
                      }
                      if (toolName === 'write' && input?.file_path && input?.content) {
                        renderedSomething = true;
                        return <WriteWidget key={idx} filePath={input.file_path} content={input.content} result={toolResult} />;
                      }
                      if (toolName === 'grep' && input?.pattern) {
                        renderedSomething = true;
                        return <GrepWidget key={idx} pattern={input.pattern} include={input.include} path={input.path} exclude={input.exclude} result={toolResult} />;
                      }
                      if (toolName === 'websearch' && input?.query) {
                        renderedSomething = true;
                        return <WebSearchWidget key={idx} query={input.query} result={toolResult} />;
                      }
                      if (toolName === 'webfetch' && input?.url) {
                        renderedSomething = true;
                        return <WebFetchWidget key={idx} url={input.url} prompt={input.prompt} result={toolResult} />;
                      }
                      // 其他工具类型可继续补充
                      return null;
                    }
                    return null;
                  })}
                  {msg.usage && (
                    <div class="text-xs text-muted-foreground mt-2">
                      Tokens: {msg.usage.input_tokens} in, {msg.usage.output_tokens} out
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
        if (!renderedSomething) return null;
        return renderedCard;
      }
      if (message.type === 'user') {
        if (message.isMeta) return null;
        const msg = message.message || message;
        let renderedSomething = false;
        const renderedCard = (
          <Card class={cn('border-muted-foreground/20 bg-muted/20', props.className)}>
            <CardContent class="p-4">
              <div class="flex items-start gap-3">
                <span style={{color:'#888'}}>🧑</span>
                <div class="flex-1 space-y-2 min-w-0">
                  {(typeof msg.content === 'string' || (msg.content && !Array.isArray(msg.content))) && (() => {
                    const contentStr = typeof msg.content === 'string' ? msg.content : String(msg.content);
                    if (contentStr.trim() === '') return null;
                    renderedSomething = true;
                    return <div class="text-sm">{contentStr}</div>;
                  })()}
                  {Array.isArray(msg.content) && msg.content.map((content: any, idx: number) => {
                    if (content.type === 'tool_result') {
                      // 省略重复渲染逻辑
                      return null;
                    }
                    if (content.type === 'text') {
                      const textContent = typeof content.text === 'string' ? content.text : (content.text?.text || JSON.stringify(content.text));
                      renderedSomething = true;
                      return <div key={idx} class="text-sm">{textContent}</div>;
                    }
                    return null;
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        );
        if (!renderedSomething) return null;
        return renderedCard;
      }
      if (message.type === 'result') {
        const isError = message.is_error || message.subtype?.includes('error');
        return (
          <Card class={cn(isError ? 'border-destructive/20 bg-destructive/5' : 'border-green-500/20 bg-green-500/5', props.className)}>
            <CardContent class="p-4">
              <div class="flex items-start gap-3">
                <span style={{color: isError ? 'red' : 'green'}}>{isError ? '❌' : '✅'}</span>
                <div class="flex-1 space-y-2">
                  <h4 class="font-semibold text-sm">{isError ? 'Execution Failed' : 'Execution Complete'}</h4>
                  {message.result && <div class="prose prose-sm max-w-none">{message.result}</div>}
                  {message.error && <div class="text-sm text-destructive">{message.error}</div>}
                  <div class="text-xs text-muted-foreground space-y-1 mt-2">
                    {(message.cost_usd !== undefined || message.total_cost_usd !== undefined) && (
                      <div>Cost: ${((message.cost_usd || message.total_cost_usd)!).toFixed(4)} USD</div>
                    )}
                    {message.duration_ms !== undefined && (
                      <div>Duration: {(message.duration_ms / 1000).toFixed(2)}s</div>
                    )}
                    {message.num_turns !== undefined && (
                      <div>Turns: {message.num_turns}</div>
                    )}
                    {message.usage && (
                      <div>
                        Total tokens: {message.usage.input_tokens + message.usage.output_tokens} ({message.usage.input_tokens} in, {message.usage.output_tokens} out)
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      }
      return null;
    };
  },
});
</script>