import { createContext, useContext, useMemo, useRef } from "react";
import { toLowerCase } from "../helpers";
import { listToolbar } from "../constants";

const EditorContext = createContext({});

export const useEditorContext = () => useContext(EditorContext);

const EditorContextProvider = ({
  children,
  textareaRefOut,
  customActions = [],
}) => {
  const initTextareaRef = useRef(null);

  const textareaRef = textareaRefOut || initTextareaRef;

  const customActionDatas = useMemo(() => {
    return customActions?.map((custom, idx) => {
      const hasInDefault = listToolbar?.find(
        (defaultToolbar) =>
          toLowerCase(custom?.name) === toLowerCase(defaultToolbar?.type)
      );

      if (hasInDefault) {
        return {
          ...custom,
          name: `${custom?.name}_${idx + 1}`,
        };
      }

      return custom;
    });
  }, [customActions]);

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

    customActionDatas?.forEach((action) => {
      if (toLowerCase(type) === toLowerCase(action?.name)) {
        onFormat({
          format: action?.format,
          formatSuffix: action?.formatSuffix,
          allowSuffixEmpty: action?.allowSuffixEmpty,
        });
      }
    });

    switch (type) {
      case "bold":
        onFormat({ format: "**" });
        break;
      case "italic":
        onFormat({ format: "_" });
        break;
      case "strike-through":
        onFormat({ format: "~~" });
        break;
      case "quote":
        onFormat({
          format: selectionStart === 0 ? "> " : "\n> ",

          formatSuffix: "\n",
        });
        break;
      case "link":
        onFormat({
          format: "[",
          formatSuffix: "](url)",
        });
        break;
      case "insert-image":
        onFormat({
          format: selectedText ? "![" : "![image",

          formatSuffix: "](url)",
        });

        break;
      case "code":
        onFormat({ format: "`" });

        break;
      case "unordered-list":
        onFormat({
          format: selectionStart === 0 ? "- " : "\n- ",

          formatSuffix: selectedText ? "\n" : "",

          allowSuffixEmpty: true,
        });

        break;
      case "underlined":
        onFormat({ format: "<ins>", formatSuffix: "</ins>" });

        break;
      default:
        const typeAlsoNotCustom = customActionDatas?.find(
          (action) => toLowerCase(type) !== toLowerCase(action?.name)
        );

        if (typeAlsoNotCustom) {
          console.warn("no action hit");
        }

        break;
    }
  };

  const onKeyDown = (e) => {
    const code = e?.code;
    const isCtrl = e?.ctrlKey;
    const isShift = e?.shiftKey;

    const customKeyMaps = {};

    customActionDatas?.forEach((action) => {
      customKeyMaps[action?.name] = action?.shortcut(e);
    });

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
      ...customKeyMaps,
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
        customActionDatas,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorContextProvider;
