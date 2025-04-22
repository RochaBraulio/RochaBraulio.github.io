
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Copy } from 'lucide-react';
import { vsCodeLightTheme, vsCodeDarkTheme } from '@/utils/syntaxHighlightThemes';

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
                   bg-gray-200 dark:bg-muted/50 
                   hover:bg-gray-300 dark:hover:bg-muted 
                   border border-gray-300 dark:border-transparent 
                   text-gray-700 dark:text-white"
        aria-label="Copy code"
      >
        <Copy className="h-4 w-4" />
      </button>
      <SyntaxHighlighter
        language={language}
        style={document.documentElement.classList.contains('dark') ? vsCodeDarkTheme : vsCodeLightTheme}
        PreTag="div"
      >
        {value.replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
};
