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

  const onKeyDown = (e) => {
    const code = e?.code;
    const isCtrl = e?.ctrlKey;
    const isShift = e?.shiftKey;

    const isBold = code === "KeyB" && isCtrl;

    const isItalic = code === "KeyI" && isCtrl;

    const isUnderlined = code === "KeyU" && isCtrl;

    const isQuote = code === "KeyQ" && isCtrl;

    const isLink = code === "KeyL" && isCtrl;

    const isCode = code === "KeyJ" && isCtrl;

    const isStrikeThrough = code === "KeyX" && isCtrl && isShift;

    const isUnorderedList = code === "KeyU" && isCtrl && isShift;

    const isInsertImage = code === "KeyK" && isCtrl;

    const { selectionStart, selectedText } = onGetTextData();

    if (isBold) {
      onFormat({ format: "**" });
    } else if (isItalic) {
      onFormat({ format: "_" });
    } else if (isStrikeThrough) {
      onFormat({ format: "~~" });
    } else if (isQuote) {
      onFormat({
        format: selectionStart === 0 ? "> " : "\n> ",

        formatSuffix: "\n",
      });
    } else if (isLink) {
      e.preventDefault();

      onFormat({
        format: "[",
        formatSuffix: "](url)",
      });
    } else if (isInsertImage) {
      e.preventDefault();

      onFormat({
        format: selectedText ? "![" : "![image",

        formatSuffix: "](url)",
      });
    } else if (isCode) {
      e.preventDefault();

      onFormat({ format: "`" });
    } else if (isUnorderedList) {
      e.preventDefault();

      onFormat({
        format: selectionStart === 0 ? "- " : "\n- ",

        formatSuffix: selectedText ? "\n" : "",

        allowSuffixEmpty: true,
      });
    } else if (isUnderlined) {
      e.preventDefault();

      onFormat({ format: "<ins>", formatSuffix: "</ins>" });
    }
  };

  return (
    <EditorContext.Provider
      value={{
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
