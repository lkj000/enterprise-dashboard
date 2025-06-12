import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import CodeBox from "./CodeBox";  // Assuming CodeBox is imported from the correct path
import ReactMarkdown from "react-markdown"; // Import ReactMarkdown
import MermaidBox from "./MermaidBox";

// Utility to split text into parts, with regex for specific tags
const splitTextWithTags = (text) => {
  const regex = /(```[\s\S]*?```)|(<CodeBox\s+[^>]*code=["'](.+?)["']\s*><\/CodeBox>|<a.*?>.*?<\/a>)|(\n\s*\n)/gsi;
  // const regex = /(\n\s*\n)/gsi;
  const parts = [];
  let lastIndex = 0;

  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'tag', content: text.substring(lastIndex, match.index) });
    }
    parts.push({ type: 'tag', content: match[0] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push({ type: 'tag', content: text.substring(lastIndex) });
  }

  return parts;
};

// Custom rendering for code blocks using ReactMarkdown 
const renderMarkdown = (content, loading) => {
  const getCodeString = (language, children) => {
    const codeString = `\`\`\`${language}\n${String(children).replace(/\n$/, '')}\n\`\`\``;
    return codeString;
  };

  return (
    <ReactMarkdown
      children={content}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : '';
          const codeString = getCodeString(language, children);
          if (match) {
            if (language === 'mermaid') {
              return <MermaidBox code={codeString} loading={loading} />;
            } else {
              return <CodeBox code={codeString} />;
            }
          } else {
            return (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          }
        },
        a: ({ href, children, ...props }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
          </a>
        )
      }}
    />
  );
};

// Component for displaying a typing effect
const TypingEffect = ({ text, speed, containerRef, setSendDisable, children, alreadyMarkdown }) => {
  const [displayedText, setDisplayedText] = useState("  "); // State for the displayed text
  const [currentIndex, setCurrentIndex] = useState(0); // State for the current index of the parts array
  const [isComplete, setIsComplete] = useState(false); // State to track if the typing effect is complete
  const [partTypedLength, setPartTypedLength] = useState(0);
  const [loading, setLoading] = useState(true); // State to track the length of the typed part
  const [parts, setParts] = useState([]); // State for storing the split parts of the text
  const [dynamicSpeed, setDynamicSpeed] = useState(speed); // State for dynamic speed adjustment
  text = "  " + text; // Add initial spaces to the text

  // Split the text into parts with tags using regex
  useEffect(() => {
    const _parts = splitTextWithTags(text);
    setParts([..._parts]);
  }, [text]);

  // Perform the typing effect
  useEffect(() => {
    setSendDisable(true); // Disable sending while typing
    const interval = setInterval(() => {
      const startTime = performance.now();
      if (currentIndex < parts.length) {
        const part = parts[currentIndex];
        const partContent = part.content;
        const isBatchType = part.type === 'tag';
        if (isBatchType) {
          setDisplayedText((prev) => prev + partContent); // Append the tag content to the displayed text
        } else {
          setDisplayedText((prev) => prev + partContent[partTypedLength]); // Append the next character of the text to the displayed text
          setPartTypedLength((prev) => prev + 1); // Increment the length of the typed part
        }
        if (partTypedLength === partContent.length - 1 || isBatchType) {
          setCurrentIndex((prev) => prev + 1); // Move to the next part
          setPartTypedLength(0); // Reset the length of the typed part
        }
      } else {
        clearInterval(interval); // Stop the typing effect
        setSendDisable(false); // Enable sending after typing is complete
        setIsComplete(true);
        setLoading(false); // Set the typing effect as complete
      }
      const endTime = performance.now();
      const elapsedTime = endTime - startTime;
      setDynamicSpeed(Math.max(speed, elapsedTime * 2)); // Adjust the speed dynamically
    }, dynamicSpeed);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [parts, speed, setSendDisable, partTypedLength, currentIndex, dynamicSpeed]);

  // Scroll to the bottom of the container when the displayed text changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [containerRef, displayedText]);

  // Transform the CodeBox tag into a CodeBox component
  const transform = (node) => {
    if (node.type === 'tag' && (node.name === 'CodeBox' || node.name === 'codebox')) {
      const { code } = node.attribs;
      return <CodeBox code={code} />;
    }
    if (node.type === 'tag' && node.name.match(/[A-Za-z]+\.[A-Za-z]+/)) {
      // Convert the unknown tag (e.g., <Platform.Devops>) to its text content
      return <span>{`<${node.name}>`}</span>;
    }
    return undefined; // Return undefined for regular HTML tags to let them be parsed normally  
  };

  return (
    <div>
      {!alreadyMarkdown && renderMarkdown(displayedText, loading)}
      {alreadyMarkdown && parse(displayedText, { replace: transform })}
      {isComplete && children}
    </div>
  );
};

export default TypingEffect;