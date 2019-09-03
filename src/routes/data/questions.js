export default [
  {
    question: `What's the output?`,
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
      origin: 'https://github.com/lydiahallie/javascript-questions#1-whats-the-output',
    },
    status: 0,
    selected: undefined,
  },
  {
    question: `What's the output?`,
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
  {
    question: `What's the output?`,
    code: `
      const shape = {
        radius: 10,
        diameter() {
          return this.radius * 2;
        },
        perimeter: () => 2 * Math.PI * this.radius
      };
      
      console.log(shape.diameter());
      console.log(shape.perimeter());
    `,
    selections: [
      {
        des: '<code>20</code> and <code>62.83185307179586</code>',
        correct: 0,
      },
      {
        des: '<code>20</code> and <code>NaN</code>',
        correct: 1,
      },
      {
        des: '<code>20</code> and <code>63</code>',
        correct: 0,
      },
      {
        des: '<code>NaN</code> and <code>63</code>',
        correct: 0,
      },
    ],
    explanation: {
      html: `
        <p>Note that the value of <code>diameter</code> is a regular function, whereas the value of <code>perimeter</code> is an arrow function.</p>
        <p>With arrow functions, the <code>this</code> keyword refers to its current surrounding scope, unlike regular functions! This means that when we call <code>perimeter</code>, it doesn't refer to the shape object, but to its surrounding scope (window for example).</p>
        <p>There is no value <code>radius</code> on that object, which returns <code>undefined</code>.</p>
      `,
      origin: 'https://github.com/lydiahallie/javascript-questions#3-whats-the-output',
    },
    status: 0,
    selected: undefined,
  },
  {
    question: `What's the output?`,
    code: `
      for (var i = 0; i < 3; i++) {
        setTimeout(() => console.log(i), 1);
      }
      
      for (let i = 0; i < 3; i++) {
        setTimeout(() => console.log(i), 1);
      }
    `,
    selections: [
      {
        des: '<code>0 1 2</code> & <code>0 1 2</code>',
        correct: 0,
      },
      {
        des: '<code>0 1 2</code> & <code>3 3 3</code>',
        correct: 0,
      },
      {
        des: '<code>3 3 3</code> & <code>0 1 2</code>',
        correct: 1,
      },
      {
        des: '<code>3 3 3</code> & <code>0 1 2</code>',
        correct: 1,
      },
    ],
    explanation: {
      html: `
        <p>Because of the event queue in JavaScript, the <code>setTimeout</code> callback function is called <em>after</em> the loop has been executed. Since the variable <code>i</code> in the first loop was declared using the <code>var</code> keyword, this value was global. During the loop, we incremented the value of <code>i</code> by <code>1</code> each time, using the unary operator <code>++</code>. By the time the <code>setTimeout</code> callback function was invoked, <code>i</code> was equal to <code>3</code> in the first example.</p>
        <p>In the second loop, the variable <code>i</code> was declared using the <code>let</code> keyword: variables declared with the <code>let</code> (and <code>const</code>) keyword are block-scoped (a block is anything between <code>{ }</code>). During each iteration, <code>i</code> will have a new value, and each value is scoped inside the loop.</p>
      `,
      origin: 'https://github.com/lydiahallie/javascript-questions#2-whats-the-output',
    },
    status: 0,
    selected: undefined,
  },
  {
    question: `What's the output?`,
    code: `
      class Example extends React.Component {
        constructor() {
          super();
          this.state = {
            val: 0
          };
        }
        
        componentDidMount() {
          this.setState({val: this.state.val + 1});
          console.log(this.state.val);    // first log
      
          this.setState({val: this.state.val + 1});
          console.log(this.state.val);    // second log
      
          setTimeout(() => {
            this.setState({val: this.state.val + 1});
            console.log(this.state.val);  // third log
      
            this.setState({val: this.state.val + 1});
            console.log(this.state.val);  // fourth log
          }, 0);
        }
      
        render() {
          return null;
        }
      };
    `,
    selections: [
      {
        des: '0 0 2 2',
        correct: 0,
      },
      {
        des: '1 1 2 2',
        correct: 0,
      },
      {
        des: '0 1 2 3',
        correct: 0,
      },
      {
        des: '0 0 2 3',
        correct: 1,
      },
    ],
    explanation: {
      html: `
        <p>1. 第一次和第二次都是在 react 自身生命周期内，触发时 isBatchingUpdates 为 true，所以并不会直接执行更新 state，而是加入了 dirtyComponents，所以打印时获取的都是更新前的状态 0。</p>
        <p>2. 两次 setState 时，获取到 this.state.val 都是 0，所以执行时都是将 0 设置成 1，在 react 内部会被合并掉，只执行一次。设置完成后 state.val 值为 1。</p>
        <p>3. setTimeout 中的代码，触发时 isBatchingUpdates 为 false，所以能够直接进行更新，所以连着输出 2，3。</p>
      `,
      origin: 'https://github.com/Advanced-Frontend/Daily-Interview-Question/blob/master/datum/summary.md#%E7%AC%AC-19-%E9%A2%98react-setstate-%E7%AC%94%E8%AF%95%E9%A2%98%E4%B8%8B%E9%9D%A2%E7%9A%84%E4%BB%A3%E7%A0%81%E8%BE%93%E5%87%BA%E4%BB%80%E4%B9%88',
    },
    status: 0,
    selected: undefined,
  },
  {
    question: `What's the output?`,
    code: `
      var a = 10;
      function foo() {
        console.log(a); // ??
        var a = 20;
      }
      
      function boo() {
        console.log(a); // ??
        let a = 20;
      }
      foo();
      boo();
    `,
    selections: [
      {
        des: '10 & 20',
        correct: 0,
      },
      {
        des: '10 & 10',
        correct: 0,
      },
      {
        des: 'undefined & 20',
        correct: 0,
      },
      {
        des: 'undefined & ReferenceError',
        correct: 1,
      },
    ],
    explanation: {
      html: `
        <p>The variables declared with var keywords are <a href="https://developer.mozilla.org/en-US/docs/Glossary/Hoisting" rel="noopener noreferrer">hoisted</a> in JavaScript and are assigned a value of <em>undefined</em> in the memory. But initialization happens exactly where you typed them in your code. Also, <em>var-declared</em> variables are <a href="http://2ality.com/2011/02/javascript-variable-scoping-and-its.html" rel="noopener noreferrer">function-scoped</a>, whereas <em>let</em> and <strong>const</strong> have block-scoped. So, this is how the process will look like:</p>
        <pre><code>
        var a = 10; // global scope
        function foo() {
        // Declaration of var a will be hoisted to the top of function.
        // Something like: var a;

        console.log(a); // prints undefined

        // actual initialisation of value 20 only happens here
          var a = 20; // local scope
        }
        </code></pre>
        <p><em>let</em> and <em>const</em> allows you to declare variables that are limited in scope to the block, statement, or expression on which it is used. Unlike <em>var</em>, these variables are not hoisted and have a so-called <a href="http://exploringjs.com/es6/ch_variables.html#sec_temporal-dead-zone">temporal dead zone</a> (TDZ). Trying to access these variables in <em>TDZ</em> will throw a <em>ReferenceError</em> because they can only be accessed until execution reaches the declaration. Read more about <a href="http://2ality.com/2015/02/es6-scoping.html">lexical scoping</a> and <a href="http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/">Execution Context &amp; Stack</a> in JavaScript.</p>
        <pre><code>
        var a = 10; // global scope
        function foo() { // enter new scope, TDZ starts

        // Uninitialised binding for 'a' is created
            console.log(a); // ReferenceError

        // TDZ ends, 'a' is initialised with value of 20 here only
            let a = 20;
        }
        </code></pre>
        <script src="https://gist.github.com/singhArmani/b03765a95a488289c2ca890171a56e1d.js"></script>
      `,
      origin: 'https://dev.to/aman_singh/so-you-think-you-know-javascript-5c26',
    },
    status: 0,
    selected: undefined,
  },
  {
    question: `What's the output?`,
    code: `
      async function async1() {
        console.log('1');
        await async2();
        console.log('2');
      }

      async function async2() {
        console.log('3');
      }

      console.log('4');

      setTimeout(function() {
        console.log('5');
      }, 0);

      async1();

      new Promise(function(resolve) {
        console.log('6');
        resolve();
      }).then(function() {
        console.log('7');
      });

      console.log('8');
    `,
    selections: [
      {
        des: '4 1 3 6 8 2 7 5',
        correct: 1,
      },
      {
        des: '4 1 3 2 6 7 8 5',
        correct: 0,
      },
      {
        des: '4 1 3 2 5 6 7 8',
        correct: 0,
      },
      {
        des: '4 5 1 3 2 6 7 8',
        correct: 0,
      },
    ],
    explanation: {
      html: `
        <iframe width="560" height="315" src="https://www.youtube.com/embed/8aGhZQkoFbQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      `,
      origin: 'https://juejin.im/post/5cbc0a9cf265da03b11f3505',
    },
    keywords: 'Event Loop',
    status: 0,
    selected: undefined,
  },
];