webpackJsonp([95813538912177],{722:function(n,a){n.exports={data:{markdownRemark:{html:'<p>As a way of keeping my math skills sharp, I’ve recently started to work through the <a href="https://projecteuler.net/">Project Euler</a> set of computational math problems.  They ask you not to post your work publicly, so I won’t be posting about any of my specific solutions, but I did think it would be fun to share about a helper method I’ve been using.</p>\n<p>For several of the Project Euler problems I’ve worked on, I needed to be able to generate a list of prime numbers.  To do that, I borrowed a Python implementation of the Sieve Of Erathosthenes from <a href="https://stackoverflow.com/a/568618/1424361">this StackOverflow answer</a>.  Since I haven’t had much reason to use generators in JavaScript yet, I thought it would be fun to translate that algorithm to JavaScript and share that here.</p>\n<h3>Sieve of Eratosthenes</h3>\n<p>The Sieve of Erathosthenes is a very old<sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup> simple algorithm for identifying prime numbers.  In its normal implementation it is a useful way of finding small primes up to a certain number.  Beginning at 2, the algorithm iterates upward.  For the current number, if the number has not been marked, we identify it as a prime, and then mark all multiples of that number up to our target number.  So to find all primes up to 12, we would</p>\n<ul>\n<li>start at 2, note <strong>2</strong> as prime, and mark 4, 6, 8, 10 and 12 as non-prime</li>\n<li>move to 3, note <strong>3</strong> as prime, and mark 6, 9, 12 as non-prime</li>\n<li>move to 4, see that it is marked, and skip it</li>\n<li>move to 5, note <strong>5</strong> as prime and mark 10 as non-prime</li>\n<li>move to 6, see that it is marked and skip it</li>\n<li>move to 7 , note <strong>7</strong> as prime</li>\n<li>see that 8-10 are marked and skip them</li>\n<li>move to 11, note <strong>11</strong> as prime</li>\n<li>move to 12, see that it is marked and skip it</li>\n</ul>\n<p>You can see it graphically with this visualization from <a href="https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes">Wikipedia</a>:</p>\n<p><img src="/sieve-animation-6420e3488e509dce176a1e957ea07ff5.gif" alt="sieve animation, shows the numbers being marked visually"></p>\n<h3>Python Implementation</h3>\n<p>The Python implementation that I used makes some modifications to the classic version of the algorithm that lets it generate an indefinite number of primes while being memory efficient</p>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">gen_primes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n    <span class="token triple-quoted-string string">""" Generate an infinite sequence of prime numbers."""</span>\n    marked_not_prime <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n    value_to_check <span class="token operator">=</span> <span class="token number">2</span>\n    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>\n        <span class="token keyword">if</span> value_to_check <span class="token operator">not</span> <span class="token keyword">in</span> marked_not_prime<span class="token punctuation">:</span>\n            <span class="token keyword">yield</span> value_to_check\n            marked_not_prime<span class="token punctuation">[</span>value_to_check <span class="token operator">*</span> value_to_check<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>value_to_check<span class="token punctuation">]</span>\n        <span class="token keyword">else</span><span class="token punctuation">:</span>\n            <span class="token keyword">for</span> prime <span class="token keyword">in</span> marked_not_prime<span class="token punctuation">[</span>value_to_check<span class="token punctuation">]</span><span class="token punctuation">:</span>\n                marked_not_prime<span class="token punctuation">.</span>setdefault<span class="token punctuation">(</span>prime <span class="token operator">+</span> value_to_check<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span>append<span class="token punctuation">(</span>prime<span class="token punctuation">)</span>\n            <span class="token keyword">del</span> marked_not_prime<span class="token punctuation">[</span>value_to_check<span class="token punctuation">]</span>\n        value_to_check <span class="token operator">+=</span> <span class="token number">1</span>\n</code></pre>\n      </div>\n<p>This version of the algorithm keeps a running set of the relevant matches, and keeps only the ones it needs.  We can translate it more or less directly to JavaScript like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">generatePrimes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> markedNotPrime <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token keyword">let</span> valueToCheck <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>\n    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>valueToCheck <span class="token keyword">in</span> markedNotPrime<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">yield</span> valueToCheck\n            markedNotPrime<span class="token punctuation">[</span>valueToCheck<span class="token operator">**</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>valueToCheck<span class="token punctuation">]</span>\n        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n            <span class="token keyword">let</span> primes <span class="token operator">=</span>markedNotPrime<span class="token punctuation">[</span>valueToCheck<span class="token punctuation">]</span><span class="token punctuation">;</span>\n            primes<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>prime<span class="token operator">=></span> <span class="token punctuation">{</span>\n                <span class="token keyword">let</span> nextMultipleOfPrime <span class="token operator">=</span> prime <span class="token operator">+</span> valueToCheck<span class="token punctuation">;</span>\n                <span class="token keyword">if</span> <span class="token punctuation">(</span>nextMultipleOfPrime <span class="token keyword">in</span> markedNotPrime<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                    markedNotPrime<span class="token punctuation">[</span>nextMultipleOfPrime<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>prime<span class="token punctuation">)</span><span class="token punctuation">;</span>\n                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n                    markedNotPrime<span class="token punctuation">[</span>nextMultipleOfPrime<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>prime<span class="token punctuation">]</span><span class="token punctuation">;</span>\n                <span class="token punctuation">}</span>\n            <span class="token punctuation">}</span><span class="token punctuation">)</span>\n            <span class="token keyword">delete</span> markedNotPrime<span class="token punctuation">[</span>valueToCheck<span class="token punctuation">]</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        valueToCheck <span class="token operator">+=</span> <span class="token number">1</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Let’s break down what this is doing.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">generatePrimes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">//...</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p><code>generatePrimes</code> is a JavaScript <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator">generator</a>.  Generators “generate” a series of values in a “just in time” fashion; they only calculate the next value when it is needed, making them an efficient solution for working with large or infinite series.  You specify a generator function by adding the <code>*</code> to the function declaration.  Generators then use the <code>yield</code> keyword rather than <code>return</code> to return their values, and can <code>yield</code> multiple times. After a generator yields, it pauses execution until it is asked for another value.  For our <code>generatePrimes</code> function, we are operating inside an infinite loop and will yield continuously without stopping<sup id="fnref-2"><a href="#fn-2" class="footnote-ref">2</a></sup>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">const</span> markedNotPrime <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> valueToCheck <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>\n<span class="token keyword">while</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">//...</span>\n    valueToCheck <span class="token operator">+=</span> <span class="token number">1</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>We’re using a plain object to keep track of our marked numbers, and using <code>valueToCheck</code> to keep track of where we are in iterating through numbers. As noted, we will iterate it forever if the generator continues to be called.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>valueToCheck <span class="token keyword">in</span> markedNotPrime<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">yield</span> valueToCheck\n    markedNotPrime<span class="token punctuation">[</span>valueToCheck<span class="token operator">**</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>valueToCheck<span class="token punctuation">]</span>\n<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n  <span class="token comment">//...</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>As in the original algorithm, if we get to a number that isn’t marked, we know that it is a prime.  So we <code>yield</code> it, which pauses execution.  If the generator is queried again, when we resume execution we mark the prime squared as not-prime, and we do that by assigning it an array with the current prime value in it.  Using arrays for markers will make more sense in a moment. For now its worth noting that we only need to mark prime-squared as non-prime since every multiple below that is the current prime multiplied by a number less than it, which means it will already be covered, as we will see below.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>valueToCheck <span class="token keyword">in</span> markedNotPrime<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">//...</span>\n<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> primes <span class="token operator">=</span> markedNotPrime<span class="token punctuation">[</span>valueToCheck<span class="token punctuation">]</span><span class="token punctuation">;</span>\n    primes<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>prime <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token keyword">let</span> nextMultipleOfPrime <span class="token operator">=</span> prime <span class="token operator">+</span> valueToCheck<span class="token punctuation">;</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>nextMultipleOfPrime <span class="token keyword">in</span> markedNotPrime<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            markedNotPrime<span class="token punctuation">[</span>nextMultipleOfPrime<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>prime<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n            markedNotPrime<span class="token punctuation">[</span>nextMultipleOfPrime<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>prime<span class="token punctuation">]</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token keyword">delete</span> markedNotPrime<span class="token punctuation">[</span>valueToCheck<span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Here’s the clever part of this implementation.  When we hit a number that is marked as not-prime, instead of just skipping it and moving on, we use some logic to keep our list of marked values small and memory efficient. This is also what allows us to get an infinite list of primes instead of settling for those under a particular value.  What we want to do is keep a list of all the primes that are factors of each marked number.  Then when we hit a number that is marked, we mark the next multiple for each prime (<code>valueToCheck + prime</code>), and remove the current value from the object.  That keeps checks fairly cheap by eliminating the number of marked numbers, and allows us to only add values to the marked list as we need them.</p>\n<p>We can then use this code to get the 1,000,001st prime like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">let</span> gen <span class="token operator">=</span> <span class="token function">generatePrimes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span> <span class="token number">1000000</span><span class="token punctuation">;</span> i <span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    gen<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>gen<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>That executed on my laptop in ~20seconds, approximately the same as the python implementation in python2, a little slower than running it under python3.  I was curious whether using a <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map">Map</a> for our marked prime list would speed things up:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">generatePrimes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> markedNotPrimeMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">let</span> valueToCheck <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>\n    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>markedNotPrimeMap<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>valueToCheck<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">yield</span> valueToCheck\n            markedNotPrimeMap<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">(</span>valueToCheck<span class="token operator">**</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>valueToCheck<span class="token punctuation">]</span><span class="token punctuation">)</span>\n        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n            <span class="token keyword">let</span> primes <span class="token operator">=</span>markedNotPrimeMap<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span>valueToCheck<span class="token punctuation">)</span>\n            primes<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>prime<span class="token operator">=></span> <span class="token punctuation">{</span>\n                <span class="token keyword">let</span> nextMultipleOfPrime <span class="token operator">=</span> prime <span class="token operator">+</span> valueToCheck<span class="token punctuation">;</span>\n                <span class="token keyword">if</span> <span class="token punctuation">(</span>markedNotPrimeMap<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>nextMultipleOfPrime<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                    markedNotPrimeMap<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span>nextMultipleOfPrime<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>prime<span class="token punctuation">)</span><span class="token punctuation">;</span>\n                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n                    markedNotPrimeMap<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">(</span>nextMultipleOfPrime<span class="token punctuation">,</span> <span class="token punctuation">[</span>prime<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n                <span class="token punctuation">}</span>\n            <span class="token punctuation">}</span><span class="token punctuation">)</span>\n            markedNotPrimeMap<span class="token punctuation">.</span><span class="token keyword">delete</span><span class="token punctuation">(</span>valueToCheck<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        valueToCheck <span class="token operator">+=</span> <span class="token number">1</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>This version of the code runs about 25% faster, in 15 seconds on my machine. Not bad.</p>\n<h3>More Resources</h3>\n<ul>\n<li>You can dig in more on the Sieve of Erosthenes on <a href="https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes">Wikipedia</a></li>\n<li>Check out <a href="https://projecteuler.net/">Project Euler</a> for some fun computational math problems.</li>\n</ul>\n<div class="footnotes">\n<hr>\n<ol>\n<li id="fn-1">\n<p>There are references as old as ~100 AD</p>\n<a href="#fnref-1" class="footnote-backref">↩</a>\n</li>\n<li id="fn-2">\n<p>At least until we hit system boundaries for memory/number size/etc.</p>\n<a href="#fnref-2" class="footnote-backref">↩</a>\n</li>\n</ol>\n</div>',frontmatter:{title:"Implementing The Sieve Of Eratosthenes in JavaScript",keywords:"javascript prime numbers sieve of eratosthenes",category:"javascript",date:"2017/11/28",path:"/2017/11/28/sieveoferatosthenes/",layout:"post",hideFooter:null},fields:{slug:"/2017/11/28/sieveoferatosthenes/"}}},pathContext:{slug:"/2017/11/28/sieveoferatosthenes/",relatedPosts:[{path:"/2017/07/19/ten-things-javascript/",data:{title:"Ten Things A Serious JavaScript Developer Should Learn",path:"/2017/07/19/ten-things-javascript/",description:"Some of the important things to pick up in the JS world",date:"2017-07-19T04:00:00+00:00"}},{path:"/2017/07/24/my-favorite-interview-question/",data:{title:"My Favorite Interview Question",path:"/2017/07/24/my-favorite-interview-question/",description:"How does the Internet work anyway?",date:"2017-07-24T11:45:00+00:00"}},{path:"/2017/07/10/how-to-follow-the-javascript-roadmap/",data:{title:"How to follow the JavaScript roadmap",path:"/2017/07/10/how-to-follow-the-javascript-roadmap/",description:"Keeping up with the language's progress",date:"2017-07-10T12:00:00+00:00"}}]}}}});
//# sourceMappingURL=path---2017-11-28-sieveoferatosthenes-ccd407d9f10cbf0bb15a.js.map