import { forwardRef, memo } from "react";
import Editor from "./components/Editor";
import EditorContextProvider from "./context/EditorContextProvider";

const VNZRU_MarkdownEditor_ = ({ ...props }, ref) => {
  return (
    <EditorContextProvider textareaRefOut={ref}>
      <Editor />
    </EditorContextProvider>
  );
};

const VNZRU_MarkdownEditor = memo(forwardRef(VNZRU_MarkdownEditor_));
export default VNZRU_MarkdownEditor;
