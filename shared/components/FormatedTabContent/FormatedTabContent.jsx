import styles from "./FormatedTabContent.module.css";

export default function FormattedText({
  content,
  className,
  paddingContent,
  tab,
  activeTab,
}) {
  const formatText = (input) => {
    return input.split("&").map((paragraph, index) => {
      if (paragraph.includes("*")) {
        const parts = paragraph.split("*").map((part) => part.trim());
        const title = parts[0];
        const listItems = parts.slice(1);

        return (
          <div key={index}>
            {title && <p className={styles.paragraph}>{title}</p>}
            <ul className={styles.list}>
              {listItems.map((line, i) => (
                <li key={i} className={styles.listItem}>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        );
      }

      const paragraphWithBreaks = paragraph.split("&&").map((line, i) => (
        <span key={i}>
          {line}
          {i === paragraph.split("&&").length - 1 && <br />}
        </span>
      ));

      return (
        <p key={index} className={styles.paragraph}>
          {paragraphWithBreaks}
        </p>
      );
    });
  };

  return (
    <div
      className={className}
      style={{
        paddingLeft: `${paddingContent}px`,
        paddingRight: `${paddingContent * 0.4}px`,
        marginBottom: activeTab === tab ? "28px" : "0",
      }}
    >
      {formatText(content)}
    </div>
  );
}
