export class TreeNode {
  public constructor(public value: number, public left: TreeNode | null, public right: TreeNode | null) {}

  /**
   * 先序遍历：头、左、右
   */
  public static travelPreOrder(Node: TreeNode | null) {
    if (Node === null) {
      return;
    }

    console.log(Node);
    TreeNode.travelPreOrder(Node.left);
    TreeNode.travelPreOrder(Node.right);
  }

  /**
   * 迭代版本的先序遍历：头、左、右
   * 栈：
   * 弹出栈中 top，处理 top
   * top.right 压栈
   * top.left 压栈
   * 调整 left right 压栈顺序可得：头、右、左
   * 使用辅助栈逆序，即可得 左、右、头，实现后序遍历
   */
  public static travelPreOrderGeneration(Node: TreeNode | null) {
    if (Node === null) {
      return;
    }
    const stack = [Node];
    while (stack.length) {
      const top = stack.pop()!;
      console.log(top);

      top.right && stack.push(top.right);
      top.left && stack.push(top.left);
    }
  }

  /**
   * 中序遍历：左，头，右
   */
  public static travelInOrder(Node: TreeNode | null) {
    if (Node === null) {
      return;
    }

    TreeNode.travelPreOrder(Node.left);
    console.log(Node);
    TreeNode.travelPreOrder(Node.right);
  }

  /**
   * 迭代版本中序遍历：左，头，右
   * 栈
   * 1. 左子树一路进栈
   * 2. 出栈，打印，右节点进栈
   */
  public static travelInOrderGeneration(Node: TreeNode | null) {
    if (Node === null) {
      return;
    }

    const stack = [Node];
    let p1: TreeNode | null = Node;
    while (stack.length || p1) {
      if (p1 !== null) {
        stack.push(p1);
        p1 = p1.left;
        continue;
      }

      p1 = stack.pop()!;
      console.log(p1);
      p1 = p1.right;
    }
  }

  /**
   * 后序遍历：左、右、头
   */
  public static travelPosOrder(Node: TreeNode | null) {
    if (Node === null) {
      return;
    }

    TreeNode.travelPreOrder(Node.left);
    TreeNode.travelPreOrder(Node.right);
    console.log(Node);
  }
}

export function createFetch(limit: number) {
  const tasks: {
    resolve: Function;
    params: unknown[];
  }[] = [];
  let doingCount = 0;

  function start() {
    if (doingCount >= limit && tasks.length !== 0) {
      return;
    }

    const task = tasks.shift()!;
    asyncTask(task.params).then((value) => {
      doingCount--;
      start();
      task.resolve(value);
    });
  }

  return (...args: unknown[]) => {
    const resultPromise = new Promise((resolve) => {
      if (doingCount < limit) {
        doingCount++;
        asyncTask(args).then((value) => {
          doingCount--;
          start();
          resolve(value);
        });
        return;
      }

      tasks.push({
        resolve,
        params: args,
      });
    });
    return resultPromise;
  };
}

function asyncTask(params: unknown[]) {
  return new Promise((resolve) => {
    console.log('run task');
    setTimeout(() => {
      console.log('task finish');
      resolve(params);
    }, 1000);
  });
}
