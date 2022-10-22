import { asyncExecute, syncExecute } from '@/idle-scheduler';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

const HEIGHT = 100;

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
    box-sizing: border-box;
    margin-top: 20px;
    border: 1px solid black;
    overflow-y: auto;
    max-height: 650px;

    .item {
      box-sizing: border-box;
      border: 1px solid black;
      height: ${HEIGHT}px;
      background-color: #eee;
    }
  }
`;

const COUNT = 50;

const MAX_DISTANCE = COUNT * HEIGHT;

const STEP_DISTANCE = 10;

export const IdleSchedulerDemo: React.FC = () => {
  const [syncResult, setSyncResult] = useState(0);
  const [asyncResult, setAsyncResult] = useState(0);

  const asyncExe = useCallback(async () => {
    setAsyncResult(0);

    console.log('async exe');
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
    console.log('sync exe');
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

  const scrollDistance = useRef(0);
  const isDown = useRef(true);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current) {
      return;
    }

    const timer = setInterval(() => {
      if (scrollDistance.current >= MAX_DISTANCE) {
        isDown.current = false;
      } else if (scrollDistance.current <= 0) {
        isDown.current = true;
      }
      if (isDown.current) {
        scrollDistance.current += STEP_DISTANCE;
      } else {
        scrollDistance.current -= STEP_DISTANCE;
      }

      listRef.current?.scroll({
        top: scrollDistance.current,
      });
    }, 10);

    return () => {
      clearInterval(timer);
    }
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
      <div className="list" ref={listRef}>{list}</div>
    </StyledContainer>
  );
};
