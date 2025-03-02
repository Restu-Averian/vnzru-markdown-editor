import { memo } from "react";
import { useEditorContext } from "../context/EditorContextProvider";

const Editor_ = () => {
  const { textareaRef, onKeyDown } = useEditorContext();

  return <textarea onKeyDown={onKeyDown} ref={textareaRef} />;
};

const Editor = memo(Editor_);
export default Editor;
