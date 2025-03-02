import { memo } from "react";
import { useEditorContext } from "../context/EditorContextProvider";
import { listToolbar } from "../constants";

const EditorToolbar_ = () => {
  const { onActionButton } = useEditorContext();

  console.log("ls : ", listToolbar);

  return (
    <div>
      {listToolbar?.map((toolbar, key) => {
        return (
          <button
            key={key}
            onClick={(e) => {
              onActionButton({ type: toolbar?.type, e });
            }}
          >
            {toolbar?.text}
          </button>
        );
      })}
    </div>
  );
};

const EditorToolbar = memo(EditorToolbar_);

export default EditorToolbar;
