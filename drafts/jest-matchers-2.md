### Contains Matchers
expect.arrayContaining(array)
expect.objectContaining(object)
.toContain(item)
.toContainEqual(item)

### Async Matchers
.resolves
.rejects

### Snapshot Matchers
.toMatchSnapshot(optionalString)
.toThrowErrorMatchingSnapshot()

### Function Matchers
.toHaveBeenCalled()
.toHaveBeenCalledTimes(number)
.toHaveBeenCalledWith(arg1, arg2, ...)
.toHaveBeenLastCalledWith(arg1, arg2, ...)

### Meta Matchers
expect.assertions(number)
expect.hasAssertions()


### Customization Methods
expect.addSnapshotSerializer(serializer)
expect.extend(matchers)

### wildcards
any
anything
stringMatching(regexp)
expect.stringContaining(string)
