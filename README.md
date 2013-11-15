# Foundry

```javascript
var Item = Foundry.create({
  properties: ['foo', 'bar', {
    name: 'qux',
    validators: [
      function (value) {
        return typeof value === 'string' && value.length > 5 || 'Value must be a string of 5 or more characters';
      }
    ]
  }]
});

var item = new Item({
  foo: 'hello',
  bar: 'world',
  qux: 'myValue'
});

item.foo();  // 'hello'
item.foo('goodbye');
item.foo();  // 'goodbye'
```
