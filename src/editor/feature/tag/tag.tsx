import React from 'react';
import { TagElement } from '@/editor/feature/tag/interface';
import { Editor, Transforms, Element } from 'slate';
import { RenderElementProps, useFocused, useSelected } from 'slate-react';
import { TAG_STYLE_LIST } from '@/editor/feature/tag/constant';
import styled from 'styled-components';

const StyledTag = styled.span`
    box-sizing: border-box;
    border: 1px solid;
    height: 24px;
    padding: 0 8px;
    display: inline-block;
    font-size: 10px;
    background: #eee;
    margin: 0 2px;
    border-radius: 12px;
`;

export const withTags = (editor: Editor) => {
    const { isInline, isVoid } = editor;

    editor.isInline = (element: Element) => {
        return element.type === 'tag' ? true : isInline(element);
    };

    editor.isVoid = (element: Element) => {
        return element.type === 'tag' ? true : isVoid(element);
    };
    return editor;
};

export const insertTag = (editor: Editor, tagTitle: string) => {
    const tag: TagElement = {
        type: 'tag',
        style: getStyle(),
        children: [{ text: '' }],
        title: tagTitle,
    };
    Transforms.insertNodes(editor, tag);
    Transforms.move(editor);
};

export const Tag = (props: RenderElementProps) => {
    const { attributes, element, children } = props;
    const selected = useSelected();
    const focused = useFocused();
    const tag = element as TagElement;

    return (
        <StyledTag
            {...attributes}
            contentEditable={false}
            style={{
                borderColor: selected && focused ? 'blue' : 'transparent',
                color: tag.style,
            }}
        >
            {tag.title}
            {children}
        </StyledTag>
    );
};

function getStyle() {
    return TAG_STYLE_LIST[Math.floor(Math.random() * TAG_STYLE_LIST.length)];
}
