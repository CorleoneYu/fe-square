import { DeltaBasedEditor } from '@/delta-based-editor';
import React, { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';

const StyledEditorDemo = styled.div`
  .button-group {
    display: flex;
    font-size: 12px;

    .button {
      cursor: pointer;
      margin-right: 8px;
      line-height: 28px;
      height: 28px;
      padding: 0 16px;
      background: rgba(51,77,102,.08);
    }
  }

  .editor {
    height: 200px;
    border: 1px solid black;

    p {
      margin: 0;
      padding: 0;
    }
  }
`;

const buttons = [
  {
    id: 'undo',
  },
  {
    id: 'redo'
  },
  {
    id: 'bold',
  },
]
export const RichTextEditor: React.FC = () => {
  const editorDomRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<DeltaBasedEditor | null>(null);

  useEffect(() => {
    if (!editorDomRef.current) {
      return;
    }

    const editor = new DeltaBasedEditor({
      id: 'rich-text-editor-demo',
      inputContainer: editorDomRef.current,
    });
    (window as any).editor = editor
    editorRef.current = editor;
  }, []);

  const renderButtons = useMemo(() => <div className='button-group'>
    {buttons.map(button => <div key={button.id} className='button' id={button.id}>{button.id}</div>)}
  </div>, []);

  const renderEditor = useMemo(() => <div>
    <p>Editor</p>
    <div className='editor' ref={editorDomRef} />
  </div>, []);

  return <StyledEditorDemo>
    {renderButtons}
    {renderEditor}
  </StyledEditorDemo>
}