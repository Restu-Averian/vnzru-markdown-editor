import { forwardRef, memo } from "react";
import Editor from "./components/Editor";
import EditorContextProvider from "./context/EditorContextProvider";
import EditorToolbar from "./components/EditorToolbar";
import EditorPreview from "./components/EditorPreview";
import EditorPreviewContextProvider from "./context/EditorPreviewContextProvider";

const VNZRU_MarkdownEditor_ = (
  {
    customActions = [],
    updateWhen = {
      type: "direct",
    },
    ...props
  },
  ref
) => {
  /** example custom actions */

  // const dataCustomAction = [
  //   {
  //     toolbarText: "B C",
  //     name: "bold",
  //     shortcut: (e) => {
  //       const code = e?.code;
  //       const isCtrl = e?.ctrlKey;

  //       return code === "KeyM" && isCtrl;
  //     },
  //     format: "**",
  //   },
  // ];
  return (
    <EditorContextProvider textareaRefOut={ref} customActions={customActions}>
      <EditorToolbar />

      <EditorPreviewContextProvider updateWhen={updateWhen}>
        <Editor {...props} />

        <EditorPreview />
      </EditorPreviewContextProvider>
    </EditorContextProvider>
  );
};

const VNZRU_MarkdownEditor = memo(forwardRef(VNZRU_MarkdownEditor_));
export default VNZRU_MarkdownEditor;
