import { memo } from "react";
import { useEditorContext } from "../context/EditorContextProvider";
import { listToolbar } from "../constants";

const EditorToolbar_ = () => {
  const { onActionButton, customActionDatas } = useEditorContext();

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

      {customActionDatas?.map((action, key) => {
        return (
          <button
            key={key}
            onClick={(e) => {
              e?.preventDefault();

              if (typeof action?.customAction === "function") {
                action?.customAction();
              } else {
                onActionButton({ type: action?.name, e });
              }
            }}
          >
            {action?.toolbarText}
          </button>
        );
      })}
    </div>
  );
};

const EditorToolbar = memo(EditorToolbar_);

export default EditorToolbar;
