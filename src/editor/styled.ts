import styled from 'styled-components';

export const StyledEditor = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    padding: 16px;
    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 4px 24px 2px rgba(0, 0, 0, 0.16),
        0px 32px 64px 2px rgba(0, 0, 0, 0.16);
    border-radius: 4px;

    .editor-title {
        font-size: 12px;
        line-height: 16px;
        color: rgba(0, 0, 0, 0.64);
    }

    .header {
        box-sizing: border-box;
        margin: 8px 0;
        padding: 8px;
        border: 1px solid #1e6fff;
        border-radius: 4px;
        height: 72px;
        max-height: 72px;
        overflow-y: auto;
        width: 500px;
        font-size: 14px;
        line-height: 24px;

        p {
            margin: 0;
        }
    }

    .body {
        display: flex;
        position: relative;
        width: 500px;
        background: #f9fafb;
        border: 1px solid rgba(0, 0, 0, 0.08);
        box-sizing: border-box;
        border-radius: 4px;

        .sidebar {
            width: 190px;
            max-height: 600px;
            overflow-y: auto;
            border-right: 1px solid rgba(0, 0, 0, 0.08);

            .group {
                .group-header {
                    line-height: 16px;
                    margin-top: 12px;
                    margin-bottom: 8px;
                    padding: 0 8px;
                    color: rgba(0, 0, 0, 0.4);
                    font-size: 12px;
                }

                .suggestion-list {
                    cursor: pointer;

                    .suggestion {
                        display: flex;
                        justify-content: space-between;
                        height: 30px;
                        line-height: 30px;
                        padding: 0 8px;

                        .title {
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            color: rgba(0, 0, 0, 0.8);
                            font-size: 12px;
                        }

                        .tip {
                            flex-shrink: 0;
                            color: rgba(0, 0, 0, 0.4);
                            font-size: 10px;
                        }
                    }

                    .suggestion.active {
                        background: rgba(51, 77, 102, 0.06);
                    }
                }
            }
        }

        .detail {
            flex-grow: 1;
            overflow-y: auto;
        }
    }
`;
