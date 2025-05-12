import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeEditorCheatSheet = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '3px', margin: '1rem 0', position: 'relative' }}>
      <div style={{ padding: '0.5rem 1rem',  backgroundColor: '#1e293b', color: '#fff', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
        {language.toUpperCase()}
        <CopyToClipboard text={code} onCopy={handleCopy}>
          <button style={{ float: 'right',  backgroundColor: '#1e293b', color: '#fff', border: 'none', cursor: 'pointer' }}>
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </CopyToClipboard>
      </div>
      <SyntaxHighlighter language={language}  style={dark}  customStyle={{
          // backgroundColor: '#1e293b',
          margin: 0,
          padding: '1rem',
          borderRadius: 0,
        }}>
        {code}
      </SyntaxHighlighter>
      {/* <div style={{
      backgroundColor: '#1e293b',
      borderRadius: '10px',
      padding: '1rem',
      marginTop: '1rem',
      overflow: 'auto'
    }}>
      <SyntaxHighlighter
        language="python"
        style={materialDark}
        customStyle={{
          backgroundColor: '#1e293b',
          margin: 0,
          padding: 0,
        }}
      >
        {code}
      </SyntaxHighlighter>
       <SyntaxHighlighter language={language}  style={dark}  customStyle={{
          backgroundColor: '#1e293b',
          margin: 0,
          padding: '1rem',
          borderRadius: 0,
        }}>
        {code}
      </SyntaxHighlighter>
      </div> */}
    </div>
  );
};

export default CodeEditorCheatSheet;
