export default function FormattedText({ content }) {
  const formatText = (input) => {
    return input.split("&").map((paragraph, index) => {
      if (paragraph.includes("*")) {
        return (
          <ul key={paragraph + index}>
            {paragraph.split("*").map((line, i) => {
              return <li key={i}>{line}</li>;
            })}
          </ul>
        );
      }

      const paragraphWithBreaks = paragraph.split("&&").map((line, i) => (
        <span key={line + i}>
          {line}
          {i === paragraph.split("&&").length - 1 && <br />}
        </span>
      ));

      return <p key={index}>{paragraphWithBreaks}</p>;
    });
  };

  return <div>{formatText(content)}</div>;
}
