import { Alert, Box, Typography } from "@mui/material";

export const parseHtml = (html) => {
  if (!html) {
    return <br />;
  }
  const nodes = new DOMParser().parseFromString(html, "text/html").body
    .childNodes;
  return Array.from(nodes).map((node, index) => {
    if (node.nodeName === "#text") {
      return node.textContent;
    } else if (node.nodeName === "A") {
      return (
        <a key={index} href={node.href} target="_blank" rel="noreferrer">
          {node.textContent}
        </a>
      );
    } else if (node.nodeName === "U") {
      return <u key={index}>{node.textContent}</u>;
    } else if (node.nodeName === "B") {
      return <b key={index}>{node.textContent}</b>;
    } else if (node.nodeName === "BR") {
      return <br />;
    }else if (node.nodeName === "UL") {
      return <ul style={{marginTop: '5px'}}>
        {Array.from(node.childNodes).map(childNode => <li>
          {childNode.textContent}
        </li>)}
      </ul>
    }
    return node.textContent;
  });
};

export const parseContent = (content) => {
  return content.map((data) => parseHtml(data));
};

export const parseString = (element) => {
  return element === "" ? (
    <br />
  ) : (
    <Typography>{parseHtml(element)}</Typography>
  );
};

export const parseAlertElement = (element) => {
  return (
    <Alert
      severity={element.severity}
      icon={element.icon}
      variant="outlined"
      sx={{ width: "100%", fontSize: "0.8571428571428571rem" }}
    >
      {parseContent(element.content)}
    </Alert>
  );
};

export const parseOL = (element) => {
  return (
    <>
      <Typography variant="h5" style={{ fontWeight: "bold" }}>
        {element.title}
      </Typography>
      <ol style={{ marginBottom: 0 }}>
        {element.content.map((item, index) => (
          <li key={index}>
            <Typography>{parseHtml(item)}</Typography>
          </li>
        ))}
      </ol>
    </>
  );
};

export const parseHeading = (element) => {
  return (
    <Typography variant="h5" mb="5px" fontWeight={600}>
      {element.title}
    </Typography>
  );
};

export const parseUnderlinedHeading = (element) => {
  return (
    <Typography
      variant="h6"
      mb="5px"
      marginTop={1}
      sx={{ textDecoration: "underline" }}
    >
      {element.title}
    </Typography>
  );
};

export const parseBold = (element) => {
  return (
    <Typography fontWeight={600}>
      {element.content.map((item) => parseHtml(item))}
    </Typography>
  );
};

export const parseGuidelines = (guidelines) => {
  return guidelines.map((section, index) => {
    const elements = section.elements.reduce((elements, element, index) => {
      if (typeof element === "string") {
        elements.push(parseString(element));
      } else if (element.type === "alert") {
        elements.push(parseAlertElement(element));
      } else if (element.type === "ol") {
        elements.push(parseOL(element));
      } else if (element.type === "heading") {
        elements.push(parseHeading(element));
      } else if (element.type === "underlined-heading") {
        elements.push(parseUnderlinedHeading(element));
      } else if (element.type === "bold") {
        elements.push(parseBold(element));
      }
      return elements;
    }, []);

    return <Box marginTop={2}>{elements}</Box>;
  });
};
