
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { xcode } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy } from 'lucide-react';

interface CodeBlockProps {
  language: string;
  value: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopyCode}
        className="absolute right-2 top-2 p-2 rounded-lg opacity-0 group-hover:opacity-100 
                   transition-all duration-300 
                   bg-gray-700 text-white 
                   hover:bg-gray-600 
                   dark:bg-muted/50 dark:hover:bg-muted 
                   border border-transparent 
                   shadow-sm"
        aria-label="Copy code"
      >
        <Copy className="h-4 w-4" />
      </button>
      <SyntaxHighlighter
        language={language}
        style={xcode}
        PreTag="div"
      >
        {value.replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
};
