import parse from 'html-react-parser';
import { Alert } from '@mui/material';

const parseContent = (content) => {
  return content.map((htmlString, index) => (
    <div key={index}>
      {parse(htmlString)}
    </div>
  ));
};

const parseAlertElement = (element) => {
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

export const parseAllContents = (item) => {
  if (item.type === "alert") {
    return parseAlertElement(item);
  } else if (item.type === "content") {
    return parseContent(item.content);
  }
};