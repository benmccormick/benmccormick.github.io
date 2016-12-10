
# Object Helpers

1. Intro

2. Cloning and Merging Objects

_.assign / extend
_.assignIn
_.assignInWith
_.assignWith
_.defaults
_.defaultsDeep
_.merge
_.mergeWith
_.clone
_.cloneDeep
_.cloneDeepWith
_.cloneWith
_.mixin

-------------------------- 1

3. Set & Get - Objects

_.get
_.set
_.setWith
_.unset
_.update
_.updateWith
_.result
_.invoke

# Iterating Everything

4. Iterating

_.each → forEach
_.eachRight → forEachRight
_.forEach
_.forEachRight
_.forIn
_.forInRight
_.forOwn
_.forOwnRight

------------------------ 2

5. Reducing
_.reduce
_.reduceRight
_.transform
_.keyBy
_.countBy

6. Mapping


_.flatMap
_.flatMapDeep
_.flatMapDepth
_.map
_.invokeMap




------------------------- 3

# Transforming Data

8. Restructuring Methods - Array

_.concat
_.join
_.fromPairs
_.flatten
_.flattenDeep
_.flattenDepth
_.zip
_.zipObject
_.zipObjectDeep
_.zipWith
_.chunk
_.unzip
_.unzipWith

9. Reordering - Collection

_.groupBy
_.shuffle
_.sortBy
_.orderBy

-------------------------- 4

10. Transforming - Strings

_.parseInt
_.template
_.words
_.truncate
_.split
_.repeat
_.replace

# Functional Helpers

11. Call Transformation - Functions

_.ary
_.unary
_.bind
_.bindKey
_.curry
_.curryRight
_.flip
_.overArgs
_.rearg
_.partial
_.partialRight
_.rest
_.spread
_.wrap

--------------------- 5

12. Call Control - Functions

_.debounce
_.defer
_.delay
_.memoize
_.throttle
_.after
_.before
_.once

13. Function Builders - Util

_.cond
_.conforms
_.flow
_.flowRight
_.iteratee
_.matches
_.matchesProperty
_.method
_.methodOf
_.over
_.overEvery
_.overSome
_.property
_.propertyOf


------------------------- 6

~~ Maybe a discussion of lodash-fp somewhere in here? ~~

# Creating Data

14. Array Builders - Util

_.range
_.rangeRight
_.times

15. Stubbing _.identity

_.constant
_.noop
_.stubArray
_.stubFalse
_.stubObject
_.stubString
_.stubTrue
_.nthArg- Util


------------------------ 7


16. Midway Summary

# Filtering and Comparison

17. Filter Methods - Array + Collection

_.compact
_.pull
_.pullAll
_.pullAllBy
_.pullAllWith
_.pullAt
_.remove
_.uniq
_.uniqBy
_.uniqWith
_.sortedUniq
_.sortedUniqBy
_.without
_.partition
_.reject
_.filter

18. Filtering - Objects

_.omit
_.omitBy
_.pick
_.pickBy

19. Comparison

_.isEqual
_.isEqualWith
_.isEmpty
_.eq
_.gt
_.gte
_.lt
_.lteon - Util


# Day to Day Helpers

20. Whitespace - Strings

_.pad
_.padEnd
_.padStart
_.trim
_.trimEnd
_.trimStart

21. Type checking - Util
_.isArguments
_.isArray
_.isArrayBuffer
_.isArrayLike
_.isArrayLikeObject
_.isBoolean
_.isBuffer
_.isDate
_.isElement
_.isError
_.isFinite
_.isFunction
_.isInteger
_.isLength
_.isMap
_.isMatch
_.isMatchWith
_.isNaN
_.isNative
_.isNil
_.isNull
_.isNumber
_.isObject
_.isObjectLike
_.isPlainObject
_.isRegExp
_.isSafeInteger
_.isSet
_.isString
_.isSymbol
_.isTypedArray
_.isUndefined
_.isWeakMap
_.isWeakSet

22. Casting
_.castArray
_.toArray
_.toFinite
_.toInteger
_.toLength
_.toNumber
_.toPlainObject
_.toSafeInteger
_.toString

# Working with Strings

23. Casing - String

_.camelCase
_.capitalize
_.kebabCase
_.lowerCase
_.lowerFirst
_.snakeCase
_.startCase
_.toLower
_.toUpper
_.upperCase
_.upperFirst

24. Escaping - Strings

_.deburr
_.escape
_.unescape
_.escapeRegExp

25. String Grab Bag

_.endsWith
_.startsWith

# Array Helpers

26. Slicing Arrays

_.drop
_.dropRight
_.dropRightWhile
_.dropWhile
_.slice
_.take
_.takeRight
_.takeRightWhile
_.takeWhile
_.tail
_.initial

27. Set Methods

_.difference
_.differenceBy
_.differenceWith
_.intersection
_.intersectionBy
_.intersectionWith
_.union
_.unionBy
_.unionWith
_.xor
_.xorBy
_.xorWith

28. Lookup Methods - Array

_.head
_.first → head
_.nth
_.last
_.findIndex
_.findLastIndex
_.indexOf
_.lastIndexOf
_.sortedIndex
_.sortedIndexBy
_.sortedIndexOf
_.sortedLastIndex
_.sortedLastIndexBy
_.sortedLastIndexOf


# Grab Bag Week 1

29. Math + Number

_.add
_.ceil
_.divide
_.floor
_.max
_.maxBy
_.mean
_.meanBy
_.min
_.minBy
_.multiply
_.round
_.subtract
_.sum
_.sumBy
_.clamp
_.inRange
_.random

30. Util + Date + Function Grab bag

_.attempt
_.noConflict
_.runInContext
_.toPath
_.uniqueId
_.now
_.negate

31. Object Grab Bag

_.at
_.findKey
_.findLastKey
_.has
_.hasIn
_.create
_.bindAll


# Grab Bag Week 2


32. Chaining

_
_.chain
_.tap
_.thru
_.prototype[Symbol.iterator]
_.prototype.at
_.prototype.chain
_.prototype.commit
_.prototype.next
_.prototype.plant
_.prototype.reverse
_.prototype.toJSON → value
_.prototype.value
_.prototype.valueOf → value
_.mixin (again)

33. Collection + Array Grab bag

_.some
_.every
_.includes
_.find
_.findLast
_.sample
_.sampleSize
_.size
_.fill
_.reverse

34. Object Transforms

_.mapKeys
_.mapValues
_.invert
_.invertBy

35. Object Descriptors

_.values
_.valuesIn
_.entries → toPairs
_.entriesIn → toPairsIn
_.toPairs
_.toPairsIn
_.keys
_.keysIn
_.functions
_.functionsIn



36. Wrap-up
