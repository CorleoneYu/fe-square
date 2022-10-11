export abstract class LinkedNode<T> {
  next: T | null = null;
  prev: T | null = null;

  abstract length(): number;
}

/**
 * 借鉴 parchment 的 linkedList
 * 双向，可以快速拿到兄弟节点 -> 可以快速插入一个节点
 */
export class LinkedList<T extends LinkedNode<T>> implements Iterable<T> {
  private head: T | null = null;
  private tail: T | null = null;
  private size = 0;

  public getHead() {
    return this.head;
  }

  public getTail() {
    return this.tail;
  }

  public getSize() {
    return this.size;
  }

  public isEmpty() {
    return this.size === 0;
  }

  public get(offset: number) {

  }


  /**
   * list 中是否包含 node
   * @param node 
   */
  public contains(node: T): boolean {
    for (const cur of this) {
      if (cur === node) {
        return true;
      }
    }
    return false;
  }

  public clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /**
   * 删除操作
   */
  public remove(node: T): void {
    if (!this.contains(node)) {
      return;
    }

    if (node.prev !== null) {
      node.prev.next = node.next;
    }
    if (node.next !== null) {
      node.next.prev = node.prev;
    }
    if (node === this.head) {
      this.head = node.next;
    }
    if (node === this.tail) {
      this.tail = node.prev;
    }

    this.size -= 1;
  }

  /**
   * 插入操作 - 插入到 refNode 前
   * @param node 
   * @param refNode 如果 refNode 为 null 则默认插入到末尾
   */
  public insertBefore(node: T, refNode: T | null = null): void {
    if (this.size === 0) {
      this.head = node;
      this.tail = node;
      node.prev = null;
      node.next = null;
      this.size += 1;
      return;
    }

    // 插入到末尾
    if (refNode === null) {
      this.tail!.next = node;
      node.prev = this.tail;
      node.next = null;
      this.tail = node;
      this.size += 1;
      return;
    }

    // 插入到 refNode 前
    node.next = refNode;
    node.prev = refNode.prev;
    if (refNode.prev) {
      refNode.prev.next = node;
    }

    refNode.prev = node;
    if (refNode === this.head) {
      this.head = node;
    }

    this.size += 1;
  }

  public unshift(node: T): void {
    this.insertBefore(node, this.head);
  }

  public push(node: T): void {
    this.insertBefore(node);
  }

  public reduce<M>(callback: (total: M, current: T) => M, value: M): M {
    for (const cur of this) {
      value = callback(value, cur);
    }
    return value;
  }

  /**
   * 遍历，在给定的范围内执行回调
   * @param index 开始位置
   * @param length 长度
   * @param callback 
   * @returns 
   */
  public forEachAt(index: number, length: number, callback: (child: T, offset: number, length: number) => void) {
    if (length <= 0) {
      return;
    }

    let cur = 0;
    let node;
    for (node of this) {
      const nodeLength = node.length();
      if (cur >= index + length) {
        break;
      }

      if (cur > index) {
        callback(node, 0, Math.min(index + length - cur, nodeLength));
      } else if (cur + nodeLength > index) {
        callback(node, index - cur, Math.min(length, cur + nodeLength - index));
      }

      cur += nodeLength;
    }
  }

  public *[Symbol.iterator](): Iterator<T> {
    let node = this.head;
    let next: T | null;
    while (node) {
      next = node.next;
      yield node;
      node = next;
    }
  }
}

