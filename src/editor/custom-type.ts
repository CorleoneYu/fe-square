import { TagElement } from '@/editor/feature/tag/interface';
import { BaseEditor, Descendant } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';

export type CodeElement = {
    type: 'code';
    children: Descendant[];
};

export type CustomText = {
    text: string;
    bold?: boolean;
};

export type ParagraphElement = {
    type: 'paragraph';
    children: Descendant[];
};

export type CustomElement = CodeElement | TagElement | ParagraphElement;

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module 'slate' {
    interface CustomTypes {
        Editor: CustomEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}
