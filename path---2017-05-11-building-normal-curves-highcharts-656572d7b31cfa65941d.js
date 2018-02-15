webpackJsonp([0xc8d670b8890a],{707:function(n,a){n.exports={data:{markdownRemark:{html:'<p>This week I got to have a little fun remembering some High School math, and using one of my favorite libraries: <a href="https://www.highcharts.com/">Highcharts</a>.  Highcharts is a commercial JavaScript data-viz library, and it makes most standard charts and graphs a breeze to implement.  I was using it to plot a normal distribution in order to display a 95% confidence interval.  It’s a pretty straightforward problem, but its a nice example of a practical use of Highcharts, and comes with a little stats math that many of us may have learned and forgotten.</p>\n<h3>The Problem</h3>\n<p>The goal was to display a <a href="https://en.wikipedia.org/wiki/Normal_distribution">normal distribution</a> to represent a 95% confidence interval, given the upper and lower bounds of the confidence interval.  A normal distribution is the classic bell curve, where the area under any section of the graph represents the probability that the true value of the measure being tracked is within that range.  These curves are usually represented something like this:</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/confidence-interval-3c13198254a7cdabc416bd2aa060cb7b-4c4f6.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 499px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 66.73346693386773%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAAsSAAALEgHS3X78AAABx0lEQVQoz42Sy07CQBSGeRA3xhhBNF4I6CO4cmFc+BS6cesLuDHGK4zaYIqJJt4XKqAoFQKO9cKl1Bhtg6lg1VbAS6C0OG0jUayJJ5PJ3zP/N2fOSU0Vo1AUdd+9oHfPKPWzYhym3ylZQyn2rmViB62La6aa/A+s7sOrR81YxOo+GVwOVGRJ+U9lvcLNHWef8Xbi0IbDjlkfzaQNi9fCZc0x5Y82ugiHBzpwiMTYXqR69CesaMeF3Esv5mt1R21YyIaF23CyZ96LklWDMVzW2t2IXFrAcfv4dsPQaNMI6HQdml3BldB51WAA67cW398GFv0tbmhbINqmfR0ggETrIuzDvB+FfE3nppohO/3RZkB0eU7tOHQskXZNdHugZY6Y9IZV2/fKsixLklQqlbhMJsPe9Ds366YPrXOEBRBmF2EGQTMgrCBYD8J9zq1bmsryfLFYRAgCTaIoMgxD0zRFpYSnp30ytgYTm2idJpePydVIDIkNmFiHyQMy/sg/pFIpZGZZVhCEb8+WZe4+e0XFT8IhPcM/ZO85Tte5XD4RjwUCBz8GpnwFgp9FMZ1m0ROkstrasyDw/KP2byv5wivLMslkQtFGq8cnZS6ksmo1Lv8AAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Normal Distribution image"\n        title=""\n        src="/static/confidence-interval-3c13198254a7cdabc416bd2aa060cb7b-4c4f6.png"\n        srcset="/static/confidence-interval-3c13198254a7cdabc416bd2aa060cb7b-73dd7.png 143w,\n/static/confidence-interval-3c13198254a7cdabc416bd2aa060cb7b-17358.png 285w,\n/static/confidence-interval-3c13198254a7cdabc416bd2aa060cb7b-4c4f6.png 499w"\n        sizes="(max-width: 499px) 100vw, 499px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>The x axis of the curve represents the range of values, while the y axis is a function of x that shows the relative probability for different areas.  Data sets that are normally distributed conform to the above bell curve and the <a href="https://en.wikipedia.org/wiki/68%E2%80%9395%E2%80%9399.7_rule">68-95-99.7 rule</a>. There’s a 68% chance that the true value is within 1 standard deviation of the middle of the curve (the mean), a 95% chance that the true value is within 2 standard deviations, and a 99.7% chance that the true value is within 3 standard deviations.</p>\n<h3>Step 1: Generating a Dataset</h3>\n<p>Highcharts operates by plotting a set of data points, not by handling equations directly.  So our first step is computing a set of data points to plot.  We can find the equation for calculating a normal distribution’s probability density on <a href="https://en.wikipedia.org/wiki/Normal_distribution">Wikipedia</a>.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/equation-6a389461177782c04eacef4eb7226e50-6eea4.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 510px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 38.82352941176471%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAYAAAD5nd/tAAAACXBIWXMAAAsSAAALEgHS3X78AAABDUlEQVQoz51Ra4+DIBD0//+6+3JtmrTqgaL06gM0ggjOwTb90Euae0wyYQns7O5sxoTCqVS4cI2ynlFUI0RdQQiBqqpQRxZFgaIs0XUd9n1HwuP8jmxZDJzzWIwlui3GywLvPYZhIFHnHN1DCD8LStlSopQS0zRBjSMOhyN1k4S11k8JSegV4yuyeZ4peMBEke52o67+iqSZNU0Txww0kts2+ACicxusNTDmznVdn2jX+L56KmzsPaYORRQ8M4Wc98hZh7dTh/dzD/nZo20EGONgHwypcFpQ8rRtW/BGo6g1WVU1Cixy3wMyzuMW+YBjPsYPE0ox4dob/AfJx0ypEddbqjCjV/ZX5r9eCvAFxfBsjxWhI3oAAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Normal Distribution equation"\n        title=""\n        src="/static/equation-6a389461177782c04eacef4eb7226e50-6eea4.png"\n        srcset="/static/equation-6a389461177782c04eacef4eb7226e50-dab4a.png 143w,\n/static/equation-6a389461177782c04eacef4eb7226e50-e69c1.png 285w,\n/static/equation-6a389461177782c04eacef4eb7226e50-6eea4.png 510w"\n        sizes="(max-width: 510px) 100vw, 510px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>Yep, we get to play with an equation that has both π and e in it.  I hope this feels sufficiently like a high school math class now.  But we can actually choose to drop the left side of the equation.  It is the <a href="https://en.wikipedia.org/wiki/Normalizing_constant">normalization constant</a> for the equation: it ensures that the total area under the curve equals 1, but doesn’t change the shape of the curve.  Since we’re simply displaying the shape of the graph and care primarily about showing the range along the x axis, we can ignore it and instead use this function:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">normalY</span> <span class="token operator">=</span> <span class="token punctuation">(</span>x<span class="token punctuation">,</span> mean<span class="token punctuation">,</span> stdDev<span class="token punctuation">)</span> <span class="token operator">=></span> Math<span class="token punctuation">.</span><span class="token function">exp</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">0.5</span><span class="token punctuation">)</span> <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span><span class="token punctuation">(</span>x <span class="token operator">-</span> mean<span class="token punctuation">)</span> <span class="token operator">/</span> stdDev<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>That’s a good start, but right now we only have an upper and lower bound value for a 95% confidence interval.  So before we can apply the equation, we need to find a mean, a standard deviation, and a set of x values to run the formula against.  The mean and standard deviation are fairly straightforward, and we can use lodash to generate a set of points.  For the sake of this example, we’ll plan on generating 100 points ranging from +/- 5 standard deviations from the mean, which should allow us to see all meaningful parts of the distribution, and still have a bit of padding.  </p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">getMean</span> <span class="token operator">=</span> <span class="token punctuation">(</span>lowerBound<span class="token punctuation">,</span> upperBound<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>upperBound <span class="token operator">+</span> lowerBound<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>\n\n<span class="token comment">// distance between mean and each bound of a 95% confidence interval</span>\n<span class="token comment">// is 2 stdDeviation, so distance between the bounds is 4</span>\n<span class="token keyword">const</span> <span class="token function-variable function">getStdDeviation</span> <span class="token operator">=</span> <span class="token punctuation">(</span>lowerBound<span class="token punctuation">,</span> upperBound<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>upperBound <span class="token operator">-</span> lowerBound<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">4</span><span class="token punctuation">;</span>\n\n\n<span class="token keyword">const</span> <span class="token function-variable function">generatePoints</span> <span class="token operator">=</span> <span class="token punctuation">(</span>lowerBound<span class="token punctuation">,</span> upperBound<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">let</span> stdDev <span class="token operator">=</span> <span class="token function">getStdDeviation</span><span class="token punctuation">(</span>lowerBound<span class="token punctuation">,</span> upperBound<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">let</span> min <span class="token operator">=</span> lowerBound <span class="token operator">-</span> <span class="token number">2</span> <span class="token operator">*</span> stdDev<span class="token punctuation">;</span>\n  <span class="token keyword">let</span> max <span class="token operator">=</span> upperBound <span class="token operator">+</span> <span class="token number">2</span> <span class="token operator">*</span> stdDev<span class="token punctuation">;</span>\n  <span class="token keyword">let</span> unit <span class="token operator">=</span> max <span class="token operator">-</span> min <span class="token operator">/</span> <span class="token number">100</span><span class="token punctuation">;</span>\n  <span class="token keyword">return</span> _<span class="token punctuation">.</span><span class="token function">range</span><span class="token punctuation">(</span>min<span class="token punctuation">,</span> max<span class="token punctuation">,</span> unit<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Now that we have the x axis locations for the points, we can generate a whole data series.  </p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">let</span> mean <span class="token operator">=</span> <span class="token function">getMean</span><span class="token punctuation">(</span>lowerBound<span class="token punctuation">,</span> upperBound<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> stdDev <span class="token operator">=</span> <span class="token function">getStdDeviation</span><span class="token punctuation">(</span>lowerBound<span class="token punctuation">,</span> upperBound<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> points <span class="token operator">=</span> <span class="token function">generatePoints</span><span class="token punctuation">(</span>lowerBound<span class="token punctuation">,</span> upperBound<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n\n<span class="token keyword">let</span> seriesData <span class="token operator">=</span> points<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>x <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span> x<span class="token punctuation">,</span> y<span class="token punctuation">:</span> <span class="token function">normalY</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> mean<span class="token punctuation">,</span> stdDev<span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<h3>Step 2: Creating the Chart</h3>\n<p>Now we have what we need to generate a chart!  Given the data, It’s easy to make a simple normal distribution curve with highcharts.  All we need to do is create a <code>&#x3C;div id="container"></code> element and then run this JavaScript:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code>Highcharts<span class="token punctuation">.</span><span class="token function">chart</span><span class="token punctuation">(</span><span class="token string">\'container\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    chart<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        type<span class="token punctuation">:</span> <span class="token string">\'area\'</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    series<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>\n        data<span class="token punctuation">:</span> seriesData<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Which produces the following graph:</p>\n<iframe width="100%" height="400" src="//jsfiddle.net/ben336/8bgm1m18/embedded/result,js/"\nallowfullscreen="allowfullscreen" frameborder="0"></iframe>\n<p>Thats a good start, but contains a lot of “stuff” that Highcharts provides by default that we don’t necessarily want for our normal distribution illustration.  Let’s cut the title, legend, y-axis, and tooltips/mouse action.  To do that we need a bit more configuration:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code>Highcharts<span class="token punctuation">.</span><span class="token function">chart</span><span class="token punctuation">(</span><span class="token string">\'container\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    chart<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        type<span class="token punctuation">:</span> <span class="token string">\'area\'</span><span class="token punctuation">,</span>\n        height<span class="token punctuation">:</span> <span class="token number">300</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    title<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        text<span class="token punctuation">:</span> <span class="token string">\'\'</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    yAxis<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      labels<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        enabled<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>   \n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      gridLineWidth<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>\n      title<span class="token punctuation">:</span> <span class="token string">\'\'</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    tooltip<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n       enabled<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    legend<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      enabled<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    series<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>\n        data<span class="token punctuation">:</span> seriesData<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    plotOptions<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      area<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        enableMouseTracking<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<iframe width="100%" height="400" src="//jsfiddle.net/ben336/w7165m2u/embedded/result,js/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>\n<p>This is pretty great, but we still want to show our confidence interval like the wikipedia image at the top.  Ideally we’d only be filling in the areas within the 95% curve.  Thats pretty easy to do with Highcharts.  We can use <em>zones</em>, Highcharts way of applying different styles to different sections of the chart.  We want our zones to apply to the x axis, and we’ll define 3 zones: 0 to the lower bound, lower bound to the upper bound, and everything else.  In Highcharts that looks like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token punctuation">{</span>\n  plotOptions<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    area<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      zones<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>\n        <span class="token comment">//fillColor gets the inside of the graph, color would change the lines</span>\n        fillColor<span class="token punctuation">:</span> <span class="token string">\'white\'</span><span class="token punctuation">,</span>\n        <span class="token comment">// everything below this value has this style applied to it</span>\n        value<span class="token punctuation">:</span> lowerBound<span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span>\n        value<span class="token punctuation">:</span> upperBound<span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span>\n        fillColor<span class="token punctuation">:</span> <span class="token string">\'white\'</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">]</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>We also want to show a 95% label on the graph like the image at the start.  There are multiple ways to do that in Highcharts, but for this simple case we’ll just abuse the title attribute and move it down into the middle of the chart:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token punctuation">{</span>\n    title<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        text<span class="token punctuation">:</span> <span class="token string">\'95%\'</span><span class="token punctuation">,</span>\n        y<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<iframe width="100%" height="400" src="//jsfiddle.net/ben336/81kb997x/embedded/result,js/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>\n<p>And with that we’ve taken our original inputs and produced a dynamic illustration of a confidence interval that matches the image we started with.  </p>\n<h3>More Resources</h3>\n<ul>\n<li>\n<p>Highcharts has great <a href="http://api.highcharts.com/highcharts/">documentation</a> and you can see more <a href="https://www.highcharts.com/demo">demos</a> on their site, both for Highcharts and their stock and map chart variants.  Note that Highcharts is not free for commercial use.  I’ve found that it is well worth the money though for any team that is going to be doing many data visualizations, especially if its using relatively standard forms of data visualizations on variable data.  </p>\n</li>\n<li>\n<p>If you need more freeform visualizations, <a href="https://d3js.org/">d3</a> is a great place to look.  Here’s an example of D3 being used to draw a similar chart: <a href="http://bl.ocks.org/phil-pedruco/88cb8a51cdce45f13c7e">http://bl.ocks.org/phil-pedruco/88cb8a51cdce45f13c7e</a>  It’s more involved than the Highcharts example, but allows for more flexibility as a result.  And unlike Highcharts, its free to use for anything.  </p>\n</li>\n</ul>',frontmatter:{title:"Building Normal Distribution Charts Using Highcharts",keywords:"normal curve bell highcharts javascript",category:"frameworks",date:"2017-05-12T02:30:00+00:00",path:"/2017/05/11/building-normal-curves-highcharts/",layout:"post",hideFooter:null},fields:{slug:"/2017/05/11/building-normal-curves-highcharts/"}}},pathContext:{slug:"/2017/05/11/building-normal-curves-highcharts/",relatedPosts:[{path:"/2016/09/19/testing-with-jest-snapshots-first-impressions/",data:{title:"Testing with Jest Snapshots: First Impressions",path:"/2016/09/19/testing-with-jest-snapshots-first-impressions/",description:"First impression of testing UI components using Jest snapshots",date:"2016-09-19T12:41:00+00:00"}},{path:"/2016/05/02/digging-into-react-choosing-component-styles",data:{title:"Digging Into React: Choosing Component Styles",path:"/2016/05/02/digging-into-react-choosing-component-styles",description:"An examination of the various styles for defining React components",date:"2016-05-02T02:32:36+00:00"}},{path:"/2017/01/09/mobx-first-impressions/",data:{title:"MobX: First Impressions",path:"/2017/01/09/mobx-first-impressions/",description:"First impression of managing data with MobX",date:"2017-01-09T13:30:00+00:00"}}]}}}});
//# sourceMappingURL=path---2017-05-11-building-normal-curves-highcharts-656572d7b31cfa65941d.js.map