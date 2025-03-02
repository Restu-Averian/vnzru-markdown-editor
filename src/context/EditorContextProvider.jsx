import { createContext, useContext, useRef } from "react";

const EditorContext = createContext({});

export const useEditorContext = () => useContext(EditorContext);

const EditorContextProvider = ({ children, textareaRefOut }) => {
  const initTextareaRef = useRef(null);

  const textareaRef = textareaRefOut || initTextareaRef;

  const onGetTextData = () => {
    if (!textareaRef?.current) return;

    const { selectionStart, selectionEnd, value } = textareaRef?.current;

    const beforeSelected = value?.substring(0, selectionStart);
    const selectedText = value?.substring(selectionStart, selectionEnd);
    const afterSelected = value?.substring(selectionEnd);

    return {
      beforeSelected,
      selectedText,
      afterSelected,
      selectionStart,
      selectionEnd,
      value,
    };
  };

  const onFormat = ({ format, formatSuffix, allowSuffixEmpty = false }) => {
    if (!textareaRef?.current) return;

    textareaRef?.current?.focus();

    const { selectedText, beforeSelected, afterSelected } = onGetTextData();

    const formatEnd = allowSuffixEmpty ? formatSuffix : formatSuffix || format;

    const formatSelected = `${format}${selectedText}${formatEnd}`;

    const newValue = `${beforeSelected}${formatSelected}${afterSelected}`;

    if (typeof document?.execCommand === "function") {
      document?.execCommand("insertText", false, formatSelected);
    } else {
      textareaRef.current.value = newValue;
    }
  };

  const onActionButton = ({ type, e }) => {
    const { selectionStart, selectedText } = onGetTextData();

    e.preventDefault();

    switch (type) {
      case "bold":
        return onFormat({ format: "**" });
      case "italic":
        return onFormat({ format: "_" });
      case "strike-through":
        return onFormat({ format: "~~" });
      case "quote":
        return onFormat({
          format: selectionStart === 0 ? "> " : "\n> ",

          formatSuffix: "\n",
        });
      case "link":
        return onFormat({
          format: "[",
          formatSuffix: "](url)",
        });
      case "insert-image":
        return onFormat({
          format: selectedText ? "![" : "![image",

          formatSuffix: "](url)",
        });
      case "code":
        return onFormat({ format: "`" });
      case "unordered-list":
        return onFormat({
          format: selectionStart === 0 ? "- " : "\n- ",

          formatSuffix: selectedText ? "\n" : "",

          allowSuffixEmpty: true,
        });
      case "underlined":
        return onFormat({ format: "<ins>", formatSuffix: "</ins>" });
      default:
        return console.warn("no action hit");
    }
  };

  const onKeyDown = (e) => {
    const code = e?.code;
    const isCtrl = e?.ctrlKey;
    const isShift = e?.shiftKey;

    const keyMaps = {
      bold: code === "KeyB" && isCtrl,
      italic: code === "KeyI" && isCtrl,
      underlined: code === "KeyU" && isCtrl,
      quote: code === "KeyQ" && isCtrl,
      link: code === "KeyL" && isCtrl,
      code: code === "KeyJ" && isCtrl,
      "strike-trhough": code === "KeyX" && isCtrl && isShift,
      "unordered-list": code === "KeyU" && isCtrl && isShift,
      "insert-image": code === "KeyK" && isCtrl,
    };

    Object.entries(keyMaps)?.forEach(([key, isActionHit]) => {
      if (isActionHit) {
        onActionButton({ type: key, e });
      }
    });
  };

  return (
    <EditorContext.Provider
      value={{
        onActionButton,
        onFormat,
        onGetTextData,
        onKeyDown,
        textareaRef,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorContextProvider;
