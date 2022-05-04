import { Descendant } from "slate";

export enum TagStyle {
    blue = 'blue',
    red = 'red',
    yellow = 'yellow',
    purple = 'purple',
    grey = 'grey',
    black = 'black',
}

export type TagElement = {
    style: TagStyle;
    title: string;
    type: 'tag';
    children: Descendant[];
};

export interface ITagStyleConfig {
    id: TagStyle;
    color: string;
    background: string;
}