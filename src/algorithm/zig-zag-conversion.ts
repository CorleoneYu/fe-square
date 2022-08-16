/**
 * link https://leetcode-cn.com/problems/zigzag-conversion/?utm_source=LCUS&utm_medium=ip_redirect&utm_campaign=transfer2china
 */
export function convert(text: string, numRows: number) {
  if (numRows === 1) {
    return text;
  }

  let y = 0;
  let isAdd = true;

  // 生成 rows
  const rows = initRows(numRows);
  for (let i = 0; i < text.length; i++) {
    rows[y] += text[i];

    if (isAdd) {
      y++;
    } else {
      y--;
    }

    if (y === numRows) {
      isAdd = false;
      y = numRows - 2;
    } else if (y === -1) {
      isAdd = true;
      y = 1;
    }
  }

  // 输出
  let result = ''
  for (let i = 0; i < rows.length; i++) {
    result += rows[i];
  }

  return result;
}

function initRows(count: number) {
  const rows: string[] = [];
  for (let i = 0; i < count; i++) {
    rows[i] = ''
  }
  return rows;
}

function main() {
  // PAHNAPLSIIGYIR
  convert('PAYPALISHIRING', 3);

  // PINALSIGYAHRPI
  convert('PAYPALISHIRING', 4);

  // A
  convert('A', 1);
}

main()
