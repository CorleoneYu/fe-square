interface ListNode {
  val: number;
  next: ListNode | null;
}

/**
 * link https://leetcode.cn/problems/linked-list-cycle/
 * 链表是否有环
 * 思路：快慢指针，追及问题
 * 1. 快指针走两步、慢指针走一步
 * 2. 如果快慢指针相遇，则表明有环，如果快指针走到 null 则表明无环
 * @param head 链表头节点
 */
export function hasCycle(head: ListNode | null): boolean {
  if (head === null) {
    return false;
  }

  let fast: ListNode | null = head;
  let slow: ListNode | null = head;
  while (fast.next !== null && fast.next.next !== null) {
    // 快慢指针，快走两步，慢走一步
    slow = slow?.next ?? null;
    fast = fast?.next.next;
    if (slow === fast) {
      // 快慢指针相遇，证明有环
      return true;
    }
  }
  return false;
}

/**
 * link https://leetcode.cn/problems/linked-list-cycle-ii/
 * 找到入环节点
 * 在判断有环无环的基础上，做拓展
 * 快慢指针相遇后，将慢指针挪回头指针，然后一起循环移动一步，当再次相遇时，是入环节点（证明可以去看 leet code）
 * @param head 链表头节点
 */
export function detectCycle(head: ListNode | null): ListNode | null {
  if (head === null) {
    return null;
  }

  let loopExist = false;
  let fast: ListNode | null = head;
  let slow: ListNode | null = head;
  while (fast.next !== null && fast.next.next !== null) {
    // 快慢指针，快走两步，慢走一步
    slow = slow?.next ?? null;
    fast = fast?.next.next;
    if (slow === fast) {
      // 快慢指针相遇，证明有环
      loopExist = true;
      break;
    }
  }

  if (loopExist) {
    slow = head;
    while (slow !== fast) {
      fast = fast?.next ?? null;
      slow = slow?.next ?? null;
    }
    return slow;
  }

  // 无环
  return null;
}

/**
 * link https://leetcode.cn/problems/intersection-of-two-linked-lists/
 * 找到开始相交的节点
 * 思路：
 * 1. 计算出长短链表的长度差 n
 * 2. 遍历长短链表，短链表从头开始，长链表从 n 开始，在遍历完成前，如果指针相同，则表明是开始相交的节点
 */
export function getIntersectionNode(headA: ListNode | null, headB: ListNode | null) {
  let p1: ListNode | null = headA;
  let p2: ListNode | null = headB;
  let count1 = 0;
  let count2 = 0;

  // 统计长度
  while (p1 !== null) {
    p1 = p1?.next ?? null;
    count1++;
  }
  while (p2 !== null) {
    p2 = p2?.next ?? null;
    count2++;
  }
  // 找出长度差
  // p1 指向长链表，p2 指向短链表
  let diff = 0;
  if (count1 > count2) {
    p1 = headA;
    p2 = headB;
    diff = count1 - count2;
  } else {
    p1 = headB;
    p2 = headA;
    diff = count2 - count1;
  }

  // p1 从 n 开始
  for (let i = 0; i < diff; i++) {
    p1 = p1?.next ?? null;
  }

  while (p1 !== null && p2 !== null) {
    // 遍历，相等，则是相交节点
    if (p1 === p2) {
      return p1;
    }

    p1 = p1?.next ?? null;
    p2 = p2?.next ?? null;
  }
  return null;
}

/**
 * link https://leetcode.cn/problems/fan-zhuan-lian-biao-lcof/
 * 翻转链表
 * 返回翻转后的头结点
 */
export function reverseList(head: ListNode | null): ListNode | null {
  let current = head;
  let prev = null;
  while (current !== null) {
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

/**
 * link https://leetcode.cn/problems/aMhZSa/
 * 判断是否回文链表
 * 要求：时间复杂 O(n) 空间复杂 O(1) 即不开辟数组
 * 思路：
 * 1. 快慢指针、找中点
 * 2. 然后翻转一半的链表，再对比
 * @param head
 */
export function isPalindrome(head: ListNode | null): boolean {
  let fast = head;
  let slow = head;
  while (fast && fast.next) {
    fast = fast.next.next ?? null;
    slow = slow?.next ?? null;
  }
  // 偶数情况下，slow 为中点
  let middle = slow;
  if (fast !== null) {
    // 奇数的情况下，中点不翻转
    middle = middle?.next ?? null;
  }

  // 翻转 middle 到 fast 的链表
  let reversed = reverseList(middle);
  let current = head;

  // 从两端往中间遍历，只要发现有一个不满足，则不是回环
  while (reversed && current) {
    if (current.val !== reversed.val) {
      return false;
    }
    current = current.next;
    reversed = reversed.next;
  }
  return true;
}
