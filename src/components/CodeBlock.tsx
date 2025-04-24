
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { vsCodeDarkTheme } from '@/utils/syntaxHighlightThemes';
import { Copy } from 'lucide-react';

interface CodeBlockProps {
  language: string;
  value: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  const [copied, setCopied] = React.useState(false);
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6 rounded-md overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900">
        <span className="text-xs text-gray-200">
          {language !== 'text' ? language : ''}
        </span>
        <button
          onClick={handleCopyCode}
          className="p-2 rounded-lg 
                   transition-all duration-300 
                   text-gray-400 hover:text-white 
                   hover:bg-gray-700 
                   dark:hover:bg-gray-800"
          aria-label="Copy code"
        >
          <Copy className="h-4 w-4" />
          {copied && <span className="absolute right-12 top-3 text-xs bg-black/70 px-2 py-1 rounded">Copied!</span>}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          fontSize: '0.9rem',
          backgroundColor: '#1E1E1E',
          borderRadius: '0 0 0.375rem 0.375rem',
        }}
        showLineNumbers={language !== 'text' && value.split('\n').length > 1}
      >
        {value.replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
};

