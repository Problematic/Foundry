# Foundry

## API Reference

### Foundry

#### Foundry.create(options)
Returns a Constructor object. Any properties defined under ***options.properties*** will have a getter/setter method created on the Constructor prototype.

```javascript
var Item = Foundry.create({
  properties: ['name', 'price', 'qty']
});
```

In addition to string property names, an object literal may be passed that defines a name, as well as validators and transformers:

```javascript
var Item = Foundry.create({
  properties: ['name', {
    name: 'price',
    validators: [
      function (value) {
        return typeof value === 'number' || 'Price must be a number';
      }
    ]
  }, 'qty']
});
```

Validators and transformers will be used to validate and manipulate set values.

### Constructor

#### constructor(*properties*)
Returns an instance object with getter/setter methods for properties defined in the `Foundry.create` call.

If a ***properties*** object is passed, they will be set as default values.

```javascript
var item = new Item({
  name: 'My Awesome Item',
  price: 30.0,
  qty: 50
});
```

#### Constructor.ValidatorError
Thrown when a validator fails (returns a string) on property set

### Constructor Instance

#### instance.__validators
An object containing arrays of validator functions by property name. These are referenced on the manipulator method.

#### instance.__transformers
An object containing arrays of transformer functions by property name. These are referenced on the manipulator method.

#### instance.\<manipulator\>
A getter/setter object created based on properties provided to `Foundry.create`.

```javascript
var item = new Item({
  name: 'My Awesome Item'
});
item.name();  // 'My Awesome Item'
item.name('Other Awesome Item');  // sets value of name to 'Other Awesome Item'
```

#### instance.\<manipulator\>.hash
A timestamp (default `null`) of the last time the value changed. This is provided as a fast alternative for AngularJS $watch functions, where observing changes on complex objects can be expensive.

```javascript
var item = new Item({});
item.name.hash;  // null (default value)
item.name('a name');
item.name.hash; // 1384545009541
```

#### instance.\<manipulator\>.hashFn
A custom hash function for this manipulator defaults to timestamp.

#### instance.\<manipulator\>.validators
An array of validator functions. This is sugar for `item.__validators[property]`.

#### instance.\<manipulator\>.transformers
An array of transformer functions. This is sugar for `item.__transformers[property]`.
