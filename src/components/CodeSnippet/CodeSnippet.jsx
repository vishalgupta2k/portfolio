import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './CodeSnippet.styles.css';

const codeLines = [
    { indent: 0, tokens: [{ type: 'keyword', text: 'const' }, { type: 'var', text: ' vishal' }, { type: 'op', text: ' = ' }, { type: 'bracket', text: '{' }] },
    { indent: 1, tokens: [{ type: 'key', text: 'role' }, { type: 'op', text: ': ' }, { type: 'string', text: '"Software Engineer"' }, { type: 'op', text: ',' }] },
    { indent: 1, tokens: [{ type: 'key', text: 'stack' }, { type: 'op', text: ': ' }, { type: 'bracket', text: '[' }, { type: 'string', text: '"React"' }, { type: 'op', text: ', ' }, { type: 'string', text: '"Node"' }, { type: 'op', text: ', ' }, { type: 'string', text: '"Python"' }, { type: 'bracket', text: ']' }, { type: 'op', text: ',' }] },
    { indent: 1, tokens: [{ type: 'key', text: 'passion' }, { type: 'op', text: ': ' }, { type: 'string', text: '"Building cool stuff"' }, { type: 'op', text: ',' }] },
    { indent: 1, tokens: [{ type: 'key', text: 'openToWork' }, { type: 'op', text: ': ' }, { type: 'bool', text: 'true' }] },
    { indent: 0, tokens: [{ type: 'bracket', text: '};' }] },
    { indent: 0, tokens: [] },
    { indent: 0, tokens: [{ type: 'keyword', text: 'export default' }, { type: 'var', text: ' vishal' }, { type: 'op', text: ';' }] },
];

const tokenColors = {
    keyword: '#c678dd',
    var: '#e06c75',
    op: '#abb2bf',
    bracket: '#d19a66',
    key: '#61afef',
    string: '#98c379',
    bool: '#d19a66',
};

export default function CodeSnippet() {
    const [visibleLines, setVisibleLines] = useState(0);

    useEffect(() => {
        if (visibleLines < codeLines.length) {
            const timer = setTimeout(() => setVisibleLines(v => v + 1), 300);
            return () => clearTimeout(timer);
        }
    }, [visibleLines]);

    return (
        <div className="code-snippet-container">
            <div className="code-window">
                {/* Window chrome */}
                <div className="code-chrome">
                    <div className="chrome-dots">
                        <span className="dot red" />
                        <span className="dot yellow" />
                        <span className="dot green" />
                    </div>
                    <span className="chrome-title">vishal.js</span>
                </div>

                {/* Code area */}
                <div className="code-body">
                    {codeLines.map((line, i) => (
                        <motion.div
                            key={i}
                            className="code-line"
                            initial={{ opacity: 0, x: -10 }}
                            animate={i < visibleLines ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.3 }}
                        >
                            <span className="line-number">{i + 1}</span>
                            <span className="line-content" style={{ paddingLeft: line.indent * 24 }}>
                                {line.tokens.map((token, ti) => (
                                    <span key={ti} style={{ color: tokenColors[token.type] }}>{token.text}</span>
                                ))}
                                {i === visibleLines - 1 && <span className="code-cursor">|</span>}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

            
        </div>
    );
}
