---
title: "Prime Generation Revisited"
date: "2018/07/15"
layout: "post"
path: "/2018/07/15/prime-generation-revisited/"
description: "Implementing The Sieve Of Eratosthenes in Go"
keywords: ""
category: "computer-science"
topics: ['Math', 'Go']
key: "prime-generation-revisited"
readNext: "sieveoferatosthenes,evil-js,code-golf-array-holes"
---

I've been wanting to try learning a new programming language again for a while, and this weekend decided to play around with [Go](https://golang.org/) for the first time in a while.  Go is a statically typed, compiled language useful for systems programming, which makes it a nice complement to my 2 primary languages, JavaScript and Python.  To help myself learn, I decided to revisit the [Sieve of Eratosthenes problem](https://benmccormick.org/2017/11/28/sieveoferatosthenes/) that I wrote about last year.  I already had implementations in Python and JavaScript, and thought it would be interesting to see how the code and performance compared.

As a refresher, the Sieve of Eratosthenes is a method for generating prime numbers by iterating through numbers and marking all multiples of primes we encounter as not prime.  The original algorithm is useful for finding small primes up to a limit, but will eventually consume infinite memory for computers or infinite time for humans.  I used a modified algorithm in my JavaScript implementation that only marks numbers as they become relevant, you can read more details about the problem in [the original post](https://benmccormick.org/2017/11/28/sieveoferatosthenes/) but using the JavaScript implementation to generate the 1 millionth prime looks like this:

```javascript
function* generatePrimes() {
    const markedNotPrimeMap = new Map();
    let valueToCheck = 2;
    while(true) {
        if (!(markedNotPrimeMap.has(valueToCheck))) {
            yield valueToCheck
            markedNotPrimeMap.set(valueToCheck**2, [valueToCheck])
        } else {
            let primes =markedNotPrimeMap.get(valueToCheck)
            primes.forEach(prime=> {
                let nextMultipleOfPrime = prime + valueToCheck;
                if (markedNotPrimeMap.has(nextMultipleOfPrime)) {
                    markedNotPrimeMap.get(nextMultipleOfPrime).push(prime);
                } else {
                    markedNotPrimeMap.set(nextMultipleOfPrime, [prime]);
                }
            })
            markedNotPrimeMap.delete(valueToCheck);
        }
        valueToCheck += 1
    }
}
let counter = 0;
for (let p of generatePrimes()) {
    counter += 1;
    if (counter >= 1000000) {
        console.log(p);
        break;
    }
}
```

That executes in ~10.5 seconds on my Macbook Pro, and the similar Python implementation averages about 23 seconds.  I was curious how fast a Go solution would execute, since it is known for being fast.

I put a Go version together like this:


```go
package main

import "fmt"
import "strconv"

func generate_primes() chan int {
    c := make(chan int)
    var marked_not_prime_map = map[int][]int{}
    go func() {
        for value_to_check := 2; ; value_to_check++ {
            var primes, in_map = marked_not_prime_map[value_to_check]
            if !in_map {
                c <- value_to_check
                var values []int
                marked_not_prime_map[value_to_check*value_to_check] = append(values, value_to_check)
            } else {
                for _, prime := range primes {
                    var next_multiple_of_prime int = prime + value_to_check
                    var next_multiples, next_in_map = marked_not_prime_map[next_multiple_of_prime]
                    if next_in_map {
                        marked_not_prime_map[next_multiple_of_prime] = append(next_multiples, prime)
                    } else {
                        var values []int
                        marked_not_prime_map[next_multiple_of_prime] = append(values, prime)
                    }
                }
                delete(marked_not_prime_map, value_to_check)
            }
        }
    }()

    return c
}

func main() {
    c := generate_primes()
    var counter int = 1
    for true {
        var p int = <-c
        if counter >= 1000000 {
            fmt.Println(strconv.Itoa(p))
            break
        }
        counter++
    }
}
```

The Go version is about 50% longer than the JavaScript version due to boilerplate but is more or less a direct 1 to 1 translation of the JavaScript code.  In Go, generators are created using channels and goroutines.  Goroutines are special functions that can run concurrently to the main thread in Go, and channels are a mechanism for passing data from them, that block the goroutine until the message is received.  So a goroutine that will pass multiple messages through to a channel is essentially equivalent to a Python or JavaScript generator using `yield`.  Beyond that, most of the syntax difference is around the ceremony required for using slices in Go , and checking whether an item exists in a map.  Slices are Go's version of a dynamic length array/list, they require an `append` function which returns a new slice to add a value.  Go doesn't have a `has` method or equivalent on it's map types.  Instead when you attempt to access a value from a map, the map returns 2 values: the received value or the "zero value" of the map's type and a boolean saying whether the access was successful.  So you have code like this:

```go
commits := map[string]int{
    "example": 100,
}
var val, has_val = commits["example"]  // val == 100, has_val == true
var val2, has_val2 = commits["example2"]  // val == 0, has_val == false
```

So does all of this ceremony buy us any performance?  Only a minimal amount in this case.  After timing each script several time the Python code averaged out to 23 seconds, the JavaScript averaged 10.5 seconds, and the Go version averaged 9.5 seconds.  It's the fastest, but only by minimal amounts over the JavaScript.  A good reminder that the algorithm will generally matter more than the programming language for many things, and also that large companies have optimized the heck out of JavaScript in recent years to the point where it's pretty competitive on single threaded performance for many tasks.



