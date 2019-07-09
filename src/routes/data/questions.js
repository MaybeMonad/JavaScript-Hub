export default [
  {
    code: `
      function sayHi() {
        console.log(name);
        console.log(age);
        var name = "Lydia";
        let age = 21;
      }

      sayHi();
    `,
    selections: [
      {
        des: 'Lydia & undefined',
        correct: 0,
      },
      {
        des: 'Lydia & ReferenceError',
        correct: 0,
      },
      {
        des: 'ReferenceError & 21',
        correct: 0,
      },
      {
        des: 'undefined & ReferenceError',
        correct: 1,
      },
    ],
    explanation: {
      html: `
        <p>Within the function, we first declare the <b>name</b> variable with the <b>var</b> keyword. This means that the variable gets hoisted (memory space is set up during the creation phase) with the default value of <b>undefined</b>, until we actually get to the line where we define the variable. We haven't defined the variable yet on the line where we try to log the <b>name</b> variable, so it still holds the value of <b>undefined</b>.</p>
        <p>Variables with the <b>let</b> keyword (and <b>const</b>) are hoisted, but unlike <b>var</b>, don't get initialized. They are not accessible before the line we declare (initialize) them. This is called the "temporal dead zone". When we try to access the variables before they are declared, JavaScript throws a <b>ReferenceError</b>.</p>
      `,
      origin: 'https://github.com/lydiahallie/javascript-questions',
    },
    status: 0,
    selected: undefined,
  },
  {
    code: `['1', '7', '11'].map(parseInt);`,
    selections: [
      {
        des: '[1, 7, 11]',
        correct: 0,
      },
      {
        des: '[NaN, NaN, NaN]',
        correct: 0,
      },
      {
        des: '[1, NaN, 3]',
        correct: 1,
      },
      {
        des: '[1, NaN, 4]',
        correct: 0,
      },
    ],
    explanation: {
      html: `
        <p><code>[1, 2, 3, 4, 5].map(console.log);</code> is equivalent to <code>[1, 2, 3, 4, 5].map((val, index, array) => console.log(val, index, array));</code></p>
        <p>ParseInt takes two arguments: <b>string</b> and <b>radix</b>. If the radix provided is falsy, then by default, radix is set to 10. Since 0 is falsy, the radix is set to the default value 10. parseInt() only takes two arguments, so the third argument ['1', '7', '11'] is ignored. The string '1' in radix 10 refers to the number 1.</p>
        <p><code>['1', '7', '11'].map(parseInt);</code> doesn’t work as intended because map passes three arguments into <code>parseInt()</code> on each iteration. The second argument <code>index</code> is passed into parseInt as a <code>radix</code> parameter. So, each string in the array is parsed using a different radix. '7' is parsed as radix 1, which is NaN, '11' is parsed as radix 2, which is 3. '1' is parsed as the default radix 10, because its index 0 is falsy.</p>
      `,
      origin: 'https://medium.com/dailyjs/parseint-mystery-7c4368ef7b21',
    },
    status: 0,
    selected: undefined,
  },
];