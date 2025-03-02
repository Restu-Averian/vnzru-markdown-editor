import { createContext, useContext, useState } from "react";

/** @type {import("react").Context<import("./types").EditorPreviewContextData>} */
const EditorPreviewContext = createContext({});

export const useEditorPreviewContext = () => useContext(EditorPreviewContext);

const EditorPreviewContextProvider = ({ children, updateWhen }) => {
  const [value, setValue] = useState("");

  return (
    <EditorPreviewContext.Provider value={{ value, setValue, updateWhen }}>
      {children}
    </EditorPreviewContext.Provider>
  );
};

export default EditorPreviewContextProvider;
