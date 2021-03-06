describe('Foundry', function () {
    describe('factory method', function () {
        it('should return a constructor function', function () {
            expect(Foundry.create).toBeDefined();

            var C = Foundry.create({
                properties: ['foo', 'bar']
            });
            expect(typeof C).toBe('function');

            var c = new C({});
            expect(c instanceof C).toBe(true);
        });

        it('should take complex property options', function () {
            var C = Foundry.create({
                properties: [
                    {
                        name: 'foo'
                    }
                ]
            });

            var c = new C({
                foo: 'hello'
            });
            expect(c.foo()).toBe('hello');
        });
    });

    describe('constructor function prototype', function () {
        it('should have getter/setter methods for properties', function () {
            var C = Foundry.create({
                properties: ['foo', 'bar']
            });

            var c = new C({
                foo: 'hello',
                bar: 'world'
            });

            expect(c.foo).toBeDefined();
            expect(c.foo.hash).toBe(null);
            expect(c.foo()).toBe('hello');

            c.foo('goodbye');
            expect(c.foo()).toBe('goodbye');
            expect(c.foo.hash).not.toBe(null);
        });
    });

    describe('instantiated object', function () {
        describe('getter/setter methods', function () {
            it('should make transformer, validator, and hash information available', function () {
                var C = Foundry.create({
                    properties: [
                        {
                            name: 'foo',
                            validators: [function (value) {
                                return value !== undefined;
                            }],
                            transformers: [function (value) {
                                return value.toString();
                            }]
                        }
                    ]
                });

                var c = new C({});

                expect(c.foo).toBeDefined();
                expect(c.foo.hash).toBeDefined();
                expect(c.foo.validators).toBeDefined();
                expect(c.foo.validators.length).toBe(1);
                expect(c.foo.transformers).toBeDefined();
                expect(c.foo.transformers.length).toBe(1);
            });

            it('should reference transformers and validators from instance object', function () {
                var C = Foundry.create({
                    properties: [
                        {
                            name: 'foo',
                            validators: [function (value) {
                                return value;
                            }]
                        }
                    ]
                });

                var c = new C({});

                expect(c.foo.validators.length).toBe(1);
                expect(c.foo.validators[0]).toBe(c.__validators.foo[0]);

                c.__validators.foo.pop();
                expect(c.foo.validators.length).toBe(0);
            });
        });

        it('should honor validators', function () {
            var C = Foundry.create({
                properties: [
                    {
                        name: 'foo'
                    },
                    {
                        name: 'bar',
                        validators: [function (value) {
                            return typeof value === 'number' ? true : "Value '" + value + "' is not a number";
                        }]
                    }
                ]
            });

            var c = new C({});

            expect(function () {
                c.bar('woo!');
            }).toThrow(new C.ValidationError("Value 'woo!' is not a number"));

            c.bar(5);
            expect(c.bar()).toBe(5);
        });

        it('should use transformers to manipulate setter values', function () {
            var C = Foundry.create({
                properties: [
                    {
                        name: 'foo',
                        transformers: [function (value) {
                            return value * 2;
                        }]
                    }
                ]
            });

            var c = new C({});

            c.foo(5);
            expect(c.foo()).toBe(10);
        });

        it('should honor hash functions provided', function () {
            var C = Foundry.create({
                properties: [
                    {
                        name: 'foo',
                        hashFn: function(value){
                            return value * 2;
                        }
                    }
                ]
            });

            var c = new C({});
            c.foo(5);
            expect(c.foo.hash).toBe(10);
        });
    });
});
