import { defineComponent, ref } from 'vue';
import { Card } from '../ui-vue/Card';

// TODO: 替换为 lucide-vue-next 图标组件
const FolderOpen = () => <span style={{color: 'blue'}}>📂</span>;
const Folder = () => <span style={{color: 'blue'}}>📁</span>;
const FileText = () => <span style={{color: '#888'}}>📄</span>;
const FileCode = () => <span style={{color: 'orange'}}>📝</span>;
const Terminal = () => <span style={{color: 'green'}}>💻</span>;
const ChevronRight = (props: { rotated?: boolean }) => <span style={{display:'inline-block',transform:props.rotated?'rotate(90deg)':'none'}}>▶️</span>;

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export const LSResultWidget = defineComponent({
  name: 'LSResultWidget',
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    // 解析目录树
    const parseDirectoryTree = (rawContent: string) => {
      const lines = rawContent.split('\n');
      const entries: Array<{
        path: string;
        name: string;
        type: 'file' | 'directory';
        level: number;
      }> = [];
      let currentPath: string[] = [];
      for (const line of lines) {
        if (line.startsWith('NOTE:')) break;
        if (!line.trim()) continue;
        const indent = line.match(/^(\s*)/)?.[1] || '';
        const level = Math.floor(indent.length / 2);
        const entryMatch = line.match(/^\s*-\s+(.+?)(\/$)?$/);
        if (!entryMatch) continue;
        const fullName = entryMatch[1];
        const isDirectory = line.trim().endsWith('/');
        const name = fullName;
        currentPath = currentPath.slice(0, level);
        currentPath.push(name);
        entries.push({
          path: currentPath.join('/'),
          name,
          type: isDirectory ? 'directory' : 'file',
          level,
        });
      }
      return entries;
    };
    const entries = parseDirectoryTree(props.content);
    const expandedDirs = ref(new Set<string>());
    const toggleDirectory = (path: string) => {
      if (expandedDirs.value.has(path)) {
        expandedDirs.value.delete(path);
      } else {
        expandedDirs.value.add(path);
      }
      // 触发响应式
      expandedDirs.value = new Set(expandedDirs.value);
    };
    const getChildren = (parentPath: string, parentLevel: number) => {
      return entries.filter(e => {
        if (e.level !== parentLevel + 1) return false;
        const parentParts = parentPath.split('/').filter(Boolean);
        const entryParts = e.path.split('/').filter(Boolean);
        if (entryParts.length !== parentParts.length + 1) return false;
        for (let i = 0; i < parentParts.length; i++) {
          if (parentParts[i] !== entryParts[i]) return false;
        }
        return true;
      });
    };
    const renderEntry = (entry: typeof entries[0], isRoot = false) => {
      const hasChildren = entry.type === 'directory' &&
        entries.some(e => e.path.startsWith(entry.path + '/') && e.level === entry.level + 1);
      const isExpanded = expandedDirs.value.has(entry.path) || isRoot;
      const getIcon = () => {
        if (entry.type === 'directory') {
          return isExpanded ? <FolderOpen /> : <Folder />;
        }
        const ext = entry.name.split('.').pop()?.toLowerCase();
        switch (ext) {
          case 'rs': return <FileCode />;
          case 'toml':
          case 'yaml':
          case 'yml':
          case 'json': return <FileText />;
          case 'md': return <FileText />;
          case 'js':
          case 'jsx':
          case 'ts':
          case 'tsx': return <FileCode />;
          case 'py': return <FileCode />;
          case 'go': return <FileCode />;
          case 'sh':
          case 'bash': return <Terminal />;
          default: return <FileText />;
        }
      };
      return (
        <div key={entry.path}>
          <div
            class={cn('flex items-center gap-2 py-1 px-2 rounded hover:bg-muted/50 transition-colors cursor-pointer', !isRoot && 'ml-4')}
            onClick={() => entry.type === 'directory' && hasChildren && toggleDirectory(entry.path)}
          >
            {entry.type === 'directory' && hasChildren ? (
              <ChevronRight rotated={isExpanded} />
            ) : (
              <span style={{width:'1em',display:'inline-block'}}></span>
            )}
            {getIcon()}
            <span class="text-sm font-mono">{entry.name}</span>
          </div>
          {entry.type === 'directory' && hasChildren && isExpanded && (
            <div class="ml-2">
              {getChildren(entry.path, entry.level).map(child => renderEntry(child))}
            </div>
          )}
        </div>
      );
    };
    const rootEntries = entries.filter(e => e.level === 0);
    return () => (
      <div class="rounded-lg border bg-muted/20 p-3">
        <div class="space-y-1">
          {rootEntries.map(entry => renderEntry(entry, true))}
        </div>
      </div>
    );
  },
});

export const LSWidget = defineComponent({
  name: 'LSWidget',
  props: {
    path: {
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
              <FolderOpen />
              <span class="text-sm">Directory contents for:</span>
              <code class="text-sm font-mono bg-background px-2 py-0.5 rounded">{props.path}</code>
            </div>
            {resultContent && <LSResultWidget content={resultContent} />}
          </div>
        );
      }
      return (
        <div class="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
          <FolderOpen />
          <span class="text-sm">Listing directory:</span>
          <code class="text-sm font-mono bg-background px-2 py-0.5 rounded">{props.path}</code>
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