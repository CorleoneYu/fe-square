/**
 * setp 3: Concurrent Mode
 */

let count = 0;

async function workLoop(deadline) {
  console.log('workLoop');
  let shouldYield = false;
  while (!shouldYield) {
    await performUnitOfWork();
    shouldYield = deadline.timeRemaining() < 1;
    console.log('shouldYield', shouldYield);
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

async function performUnitOfWork() {
  await sleep(20);
  console.log(count++);
}

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
