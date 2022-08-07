import { asyncExecute, syncExecute } from '@/idle-scheduler';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  .button-group {
    display: flex;

    .button {
      margin-right: 10px;
      line-height: 24px;
      padding: 0 10px;
      background: #555;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .list {
    margin-top: 20px;
    border: 1px solid black;
    overflow-y: auto;
    max-height: 650px;
    padding: 10px;

    .item {
      margin-bottom: 20px;
      height: 100px;
      background-color: #eee;
    }
  }
`;

const COUNT = 50;

export const IdleSchedulerDemo: React.FC = () => {
  const [syncResult, setSyncResult] = useState(0);
  const [asyncResult, setAsyncResult] = useState(0);

  const asyncExe = useCallback(async () => {
    setAsyncResult(0);

    try {
      const result = await asyncExecute();
      if (!result) {
        return;
      }

      setAsyncResult(result);
    } catch (e) {
      console.error('asyncExe', e);
    }
  }, []);

  const syncExe = useCallback(() => {
    setSyncResult(0);
    setTimeout(() => {
      const result = syncExecute();
      setSyncResult(result);
    }, 0);
  }, []);

  const list = useMemo(() => {
    const list = [];
    for (let i = 1; i <= COUNT; i++) {
      list.push(
        <div key={i} className="item">
          index: {i}
        </div>,
      );
    }
    return list;
  }, []);

  return (
    <StyledContainer>
      <div>
        <div>sync result: {syncResult}</div>
        <div>async result: {asyncResult}</div>
      </div>
      <div className="button-group">
        <div className="button" onClick={asyncExe}>
          async exe
        </div>
        <div className="button" onClick={syncExe}>
          sync exe
        </div>
      </div>
      <div className="list">{list}</div>
    </StyledContainer>
  );
};
