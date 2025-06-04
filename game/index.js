var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

// node_modules/reflect-metadata/Reflect.js
var require_Reflect = __commonJS({
  "node_modules/reflect-metadata/Reflect.js"() {
    var Reflect2;
    (function(Reflect3) {
      (function(factory) {
        var root = typeof globalThis === "object" ? globalThis : typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : sloppyModeThis();
        var exporter = makeExporter(Reflect3);
        if (typeof root.Reflect !== "undefined") {
          exporter = makeExporter(root.Reflect, exporter);
        }
        factory(exporter, root);
        if (typeof root.Reflect === "undefined") {
          root.Reflect = Reflect3;
        }
        function makeExporter(target, previous) {
          return function(key, value) {
            Object.defineProperty(target, key, { configurable: true, writable: true, value });
            if (previous)
              previous(key, value);
          };
        }
        function functionThis() {
          try {
            return Function("return this;")();
          } catch (_2) {
          }
        }
        function indirectEvalThis() {
          try {
            return (void 0, eval)("(function() { return this; })()");
          } catch (_2) {
          }
        }
        function sloppyModeThis() {
          return functionThis() || indirectEvalThis();
        }
      })(function(exporter, root) {
        var hasOwn = Object.prototype.hasOwnProperty;
        var supportsSymbol = typeof Symbol === "function";
        var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
        var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
        var supportsCreate = typeof Object.create === "function";
        var supportsProto = { __proto__: [] } instanceof Array;
        var downLevel = !supportsCreate && !supportsProto;
        var HashMap = {
          // create an object in dictionary mode (a.k.a. "slow" mode in v8)
          create: supportsCreate ? function() {
            return MakeDictionary(/* @__PURE__ */ Object.create(null));
          } : supportsProto ? function() {
            return MakeDictionary({ __proto__: null });
          } : function() {
            return MakeDictionary({});
          },
          has: downLevel ? function(map, key) {
            return hasOwn.call(map, key);
          } : function(map, key) {
            return key in map;
          },
          get: downLevel ? function(map, key) {
            return hasOwn.call(map, key) ? map[key] : void 0;
          } : function(map, key) {
            return map[key];
          }
        };
        var functionPrototype = Object.getPrototypeOf(Function);
        var _Map = typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
        var _Set = typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
        var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
        var registrySymbol = supportsSymbol ? Symbol.for("@reflect-metadata:registry") : void 0;
        var metadataRegistry = GetOrCreateMetadataRegistry();
        var metadataProvider = CreateMetadataProvider(metadataRegistry);
        function decorate(decorators, target, propertyKey, attributes) {
          if (!IsUndefined(propertyKey)) {
            if (!IsArray(decorators))
              throw new TypeError();
            if (!IsObject(target))
              throw new TypeError();
            if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
              throw new TypeError();
            if (IsNull(attributes))
              attributes = void 0;
            propertyKey = ToPropertyKey(propertyKey);
            return DecorateProperty(decorators, target, propertyKey, attributes);
          } else {
            if (!IsArray(decorators))
              throw new TypeError();
            if (!IsConstructor(target))
              throw new TypeError();
            return DecorateConstructor(decorators, target);
          }
        }
        exporter("decorate", decorate);
        function metadata(metadataKey, metadataValue) {
          function decorator(target, propertyKey) {
            if (!IsObject(target))
              throw new TypeError();
            if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
              throw new TypeError();
            OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
          }
          return decorator;
        }
        exporter("metadata", metadata);
        function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        exporter("defineMetadata", defineMetadata);
        function hasMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasMetadata", hasMetadata);
        function hasOwnMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasOwnMetadata", hasOwnMetadata);
        function getMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        exporter("getMetadata", getMetadata);
        function getOwnMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("getOwnMetadata", getOwnMetadata);
        function getMetadataKeys(target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryMetadataKeys(target, propertyKey);
        }
        exporter("getMetadataKeys", getMetadataKeys);
        function getOwnMetadataKeys(target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryOwnMetadataKeys(target, propertyKey);
        }
        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
        function deleteMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          var provider = GetMetadataProvider(
            target,
            propertyKey,
            /*Create*/
            false
          );
          if (IsUndefined(provider))
            return false;
          return provider.OrdinaryDeleteMetadata(metadataKey, target, propertyKey);
        }
        exporter("deleteMetadata", deleteMetadata);
        function DecorateConstructor(decorators, target) {
          for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
              if (!IsConstructor(decorated))
                throw new TypeError();
              target = decorated;
            }
          }
          return target;
        }
        function DecorateProperty(decorators, target, propertyKey, descriptor) {
          for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target, propertyKey, descriptor);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
              if (!IsObject(decorated))
                throw new TypeError();
              descriptor = decorated;
            }
          }
          return descriptor;
        }
        function OrdinaryHasMetadata(MetadataKey, O3, P3) {
          var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O3, P3);
          if (hasOwn2)
            return true;
          var parent = OrdinaryGetPrototypeOf(O3);
          if (!IsNull(parent))
            return OrdinaryHasMetadata(MetadataKey, parent, P3);
          return false;
        }
        function OrdinaryHasOwnMetadata(MetadataKey, O3, P3) {
          var provider = GetMetadataProvider(
            O3,
            P3,
            /*Create*/
            false
          );
          if (IsUndefined(provider))
            return false;
          return ToBoolean(provider.OrdinaryHasOwnMetadata(MetadataKey, O3, P3));
        }
        function OrdinaryGetMetadata(MetadataKey, O3, P3) {
          var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O3, P3);
          if (hasOwn2)
            return OrdinaryGetOwnMetadata(MetadataKey, O3, P3);
          var parent = OrdinaryGetPrototypeOf(O3);
          if (!IsNull(parent))
            return OrdinaryGetMetadata(MetadataKey, parent, P3);
          return void 0;
        }
        function OrdinaryGetOwnMetadata(MetadataKey, O3, P3) {
          var provider = GetMetadataProvider(
            O3,
            P3,
            /*Create*/
            false
          );
          if (IsUndefined(provider))
            return;
          return provider.OrdinaryGetOwnMetadata(MetadataKey, O3, P3);
        }
        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O3, P3) {
          var provider = GetMetadataProvider(
            O3,
            P3,
            /*Create*/
            true
          );
          provider.OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O3, P3);
        }
        function OrdinaryMetadataKeys(O3, P3) {
          var ownKeys = OrdinaryOwnMetadataKeys(O3, P3);
          var parent = OrdinaryGetPrototypeOf(O3);
          if (parent === null)
            return ownKeys;
          var parentKeys = OrdinaryMetadataKeys(parent, P3);
          if (parentKeys.length <= 0)
            return ownKeys;
          if (ownKeys.length <= 0)
            return parentKeys;
          var set = new _Set();
          var keys = [];
          for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
            var key = ownKeys_1[_i];
            var hasKey = set.has(key);
            if (!hasKey) {
              set.add(key);
              keys.push(key);
            }
          }
          for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
            var key = parentKeys_1[_a];
            var hasKey = set.has(key);
            if (!hasKey) {
              set.add(key);
              keys.push(key);
            }
          }
          return keys;
        }
        function OrdinaryOwnMetadataKeys(O3, P3) {
          var provider = GetMetadataProvider(
            O3,
            P3,
            /*create*/
            false
          );
          if (!provider) {
            return [];
          }
          return provider.OrdinaryOwnMetadataKeys(O3, P3);
        }
        function Type(x3) {
          if (x3 === null)
            return 1;
          switch (typeof x3) {
            case "undefined":
              return 0;
            case "boolean":
              return 2;
            case "string":
              return 3;
            case "symbol":
              return 4;
            case "number":
              return 5;
            case "object":
              return x3 === null ? 1 : 6;
            default:
              return 6;
          }
        }
        function IsUndefined(x3) {
          return x3 === void 0;
        }
        function IsNull(x3) {
          return x3 === null;
        }
        function IsSymbol(x3) {
          return typeof x3 === "symbol";
        }
        function IsObject(x3) {
          return typeof x3 === "object" ? x3 !== null : typeof x3 === "function";
        }
        function ToPrimitive(input, PreferredType) {
          switch (Type(input)) {
            case 0:
              return input;
            case 1:
              return input;
            case 2:
              return input;
            case 3:
              return input;
            case 4:
              return input;
            case 5:
              return input;
          }
          var hint = PreferredType === 3 ? "string" : PreferredType === 5 ? "number" : "default";
          var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
          if (exoticToPrim !== void 0) {
            var result = exoticToPrim.call(input, hint);
            if (IsObject(result))
              throw new TypeError();
            return result;
          }
          return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
        }
        function OrdinaryToPrimitive(O3, hint) {
          if (hint === "string") {
            var toString_1 = O3.toString;
            if (IsCallable(toString_1)) {
              var result = toString_1.call(O3);
              if (!IsObject(result))
                return result;
            }
            var valueOf = O3.valueOf;
            if (IsCallable(valueOf)) {
              var result = valueOf.call(O3);
              if (!IsObject(result))
                return result;
            }
          } else {
            var valueOf = O3.valueOf;
            if (IsCallable(valueOf)) {
              var result = valueOf.call(O3);
              if (!IsObject(result))
                return result;
            }
            var toString_2 = O3.toString;
            if (IsCallable(toString_2)) {
              var result = toString_2.call(O3);
              if (!IsObject(result))
                return result;
            }
          }
          throw new TypeError();
        }
        function ToBoolean(argument) {
          return !!argument;
        }
        function ToString(argument) {
          return "" + argument;
        }
        function ToPropertyKey(argument) {
          var key = ToPrimitive(
            argument,
            3
            /* String */
          );
          if (IsSymbol(key))
            return key;
          return ToString(key);
        }
        function IsArray(argument) {
          return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
        }
        function IsCallable(argument) {
          return typeof argument === "function";
        }
        function IsConstructor(argument) {
          return typeof argument === "function";
        }
        function IsPropertyKey(argument) {
          switch (Type(argument)) {
            case 3:
              return true;
            case 4:
              return true;
            default:
              return false;
          }
        }
        function SameValueZero(x3, y2) {
          return x3 === y2 || x3 !== x3 && y2 !== y2;
        }
        function GetMethod(V3, P3) {
          var func = V3[P3];
          if (func === void 0 || func === null)
            return void 0;
          if (!IsCallable(func))
            throw new TypeError();
          return func;
        }
        function GetIterator(obj) {
          var method = GetMethod(obj, iteratorSymbol);
          if (!IsCallable(method))
            throw new TypeError();
          var iterator = method.call(obj);
          if (!IsObject(iterator))
            throw new TypeError();
          return iterator;
        }
        function IteratorValue(iterResult) {
          return iterResult.value;
        }
        function IteratorStep(iterator) {
          var result = iterator.next();
          return result.done ? false : result;
        }
        function IteratorClose(iterator) {
          var f2 = iterator["return"];
          if (f2)
            f2.call(iterator);
        }
        function OrdinaryGetPrototypeOf(O3) {
          var proto = Object.getPrototypeOf(O3);
          if (typeof O3 !== "function" || O3 === functionPrototype)
            return proto;
          if (proto !== functionPrototype)
            return proto;
          var prototype = O3.prototype;
          var prototypeProto = prototype && Object.getPrototypeOf(prototype);
          if (prototypeProto == null || prototypeProto === Object.prototype)
            return proto;
          var constructor = prototypeProto.constructor;
          if (typeof constructor !== "function")
            return proto;
          if (constructor === O3)
            return proto;
          return constructor;
        }
        function CreateMetadataRegistry() {
          var fallback;
          if (!IsUndefined(registrySymbol) && typeof root.Reflect !== "undefined" && !(registrySymbol in root.Reflect) && typeof root.Reflect.defineMetadata === "function") {
            fallback = CreateFallbackProvider(root.Reflect);
          }
          var first;
          var second;
          var rest;
          var targetProviderMap = new _WeakMap();
          var registry = {
            registerProvider,
            getProvider,
            setProvider
          };
          return registry;
          function registerProvider(provider) {
            if (!Object.isExtensible(registry)) {
              throw new Error("Cannot add provider to a frozen registry.");
            }
            switch (true) {
              case fallback === provider:
                break;
              case IsUndefined(first):
                first = provider;
                break;
              case first === provider:
                break;
              case IsUndefined(second):
                second = provider;
                break;
              case second === provider:
                break;
              default:
                if (rest === void 0)
                  rest = new _Set();
                rest.add(provider);
                break;
            }
          }
          function getProviderNoCache(O3, P3) {
            if (!IsUndefined(first)) {
              if (first.isProviderFor(O3, P3))
                return first;
              if (!IsUndefined(second)) {
                if (second.isProviderFor(O3, P3))
                  return first;
                if (!IsUndefined(rest)) {
                  var iterator = GetIterator(rest);
                  while (true) {
                    var next = IteratorStep(iterator);
                    if (!next) {
                      return void 0;
                    }
                    var provider = IteratorValue(next);
                    if (provider.isProviderFor(O3, P3)) {
                      IteratorClose(iterator);
                      return provider;
                    }
                  }
                }
              }
            }
            if (!IsUndefined(fallback) && fallback.isProviderFor(O3, P3)) {
              return fallback;
            }
            return void 0;
          }
          function getProvider(O3, P3) {
            var providerMap = targetProviderMap.get(O3);
            var provider;
            if (!IsUndefined(providerMap)) {
              provider = providerMap.get(P3);
            }
            if (!IsUndefined(provider)) {
              return provider;
            }
            provider = getProviderNoCache(O3, P3);
            if (!IsUndefined(provider)) {
              if (IsUndefined(providerMap)) {
                providerMap = new _Map();
                targetProviderMap.set(O3, providerMap);
              }
              providerMap.set(P3, provider);
            }
            return provider;
          }
          function hasProvider(provider) {
            if (IsUndefined(provider))
              throw new TypeError();
            return first === provider || second === provider || !IsUndefined(rest) && rest.has(provider);
          }
          function setProvider(O3, P3, provider) {
            if (!hasProvider(provider)) {
              throw new Error("Metadata provider not registered.");
            }
            var existingProvider = getProvider(O3, P3);
            if (existingProvider !== provider) {
              if (!IsUndefined(existingProvider)) {
                return false;
              }
              var providerMap = targetProviderMap.get(O3);
              if (IsUndefined(providerMap)) {
                providerMap = new _Map();
                targetProviderMap.set(O3, providerMap);
              }
              providerMap.set(P3, provider);
            }
            return true;
          }
        }
        function GetOrCreateMetadataRegistry() {
          var metadataRegistry2;
          if (!IsUndefined(registrySymbol) && IsObject(root.Reflect) && Object.isExtensible(root.Reflect)) {
            metadataRegistry2 = root.Reflect[registrySymbol];
          }
          if (IsUndefined(metadataRegistry2)) {
            metadataRegistry2 = CreateMetadataRegistry();
          }
          if (!IsUndefined(registrySymbol) && IsObject(root.Reflect) && Object.isExtensible(root.Reflect)) {
            Object.defineProperty(root.Reflect, registrySymbol, {
              enumerable: false,
              configurable: false,
              writable: false,
              value: metadataRegistry2
            });
          }
          return metadataRegistry2;
        }
        function CreateMetadataProvider(registry) {
          var metadata2 = new _WeakMap();
          var provider = {
            isProviderFor: function(O3, P3) {
              var targetMetadata = metadata2.get(O3);
              if (IsUndefined(targetMetadata))
                return false;
              return targetMetadata.has(P3);
            },
            OrdinaryDefineOwnMetadata: OrdinaryDefineOwnMetadata2,
            OrdinaryHasOwnMetadata: OrdinaryHasOwnMetadata2,
            OrdinaryGetOwnMetadata: OrdinaryGetOwnMetadata2,
            OrdinaryOwnMetadataKeys: OrdinaryOwnMetadataKeys2,
            OrdinaryDeleteMetadata
          };
          metadataRegistry.registerProvider(provider);
          return provider;
          function GetOrCreateMetadataMap(O3, P3, Create) {
            var targetMetadata = metadata2.get(O3);
            var createdTargetMetadata = false;
            if (IsUndefined(targetMetadata)) {
              if (!Create)
                return void 0;
              targetMetadata = new _Map();
              metadata2.set(O3, targetMetadata);
              createdTargetMetadata = true;
            }
            var metadataMap = targetMetadata.get(P3);
            if (IsUndefined(metadataMap)) {
              if (!Create)
                return void 0;
              metadataMap = new _Map();
              targetMetadata.set(P3, metadataMap);
              if (!registry.setProvider(O3, P3, provider)) {
                targetMetadata.delete(P3);
                if (createdTargetMetadata) {
                  metadata2.delete(O3);
                }
                throw new Error("Wrong provider for target.");
              }
            }
            return metadataMap;
          }
          function OrdinaryHasOwnMetadata2(MetadataKey, O3, P3) {
            var metadataMap = GetOrCreateMetadataMap(
              O3,
              P3,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return false;
            return ToBoolean(metadataMap.has(MetadataKey));
          }
          function OrdinaryGetOwnMetadata2(MetadataKey, O3, P3) {
            var metadataMap = GetOrCreateMetadataMap(
              O3,
              P3,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return void 0;
            return metadataMap.get(MetadataKey);
          }
          function OrdinaryDefineOwnMetadata2(MetadataKey, MetadataValue, O3, P3) {
            var metadataMap = GetOrCreateMetadataMap(
              O3,
              P3,
              /*Create*/
              true
            );
            metadataMap.set(MetadataKey, MetadataValue);
          }
          function OrdinaryOwnMetadataKeys2(O3, P3) {
            var keys = [];
            var metadataMap = GetOrCreateMetadataMap(
              O3,
              P3,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return keys;
            var keysObj = metadataMap.keys();
            var iterator = GetIterator(keysObj);
            var k3 = 0;
            while (true) {
              var next = IteratorStep(iterator);
              if (!next) {
                keys.length = k3;
                return keys;
              }
              var nextValue = IteratorValue(next);
              try {
                keys[k3] = nextValue;
              } catch (e2) {
                try {
                  IteratorClose(iterator);
                } finally {
                  throw e2;
                }
              }
              k3++;
            }
          }
          function OrdinaryDeleteMetadata(MetadataKey, O3, P3) {
            var metadataMap = GetOrCreateMetadataMap(
              O3,
              P3,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return false;
            if (!metadataMap.delete(MetadataKey))
              return false;
            if (metadataMap.size === 0) {
              var targetMetadata = metadata2.get(O3);
              if (!IsUndefined(targetMetadata)) {
                targetMetadata.delete(P3);
                if (targetMetadata.size === 0) {
                  metadata2.delete(targetMetadata);
                }
              }
            }
            return true;
          }
        }
        function CreateFallbackProvider(reflect) {
          var defineMetadata2 = reflect.defineMetadata, hasOwnMetadata2 = reflect.hasOwnMetadata, getOwnMetadata2 = reflect.getOwnMetadata, getOwnMetadataKeys2 = reflect.getOwnMetadataKeys, deleteMetadata2 = reflect.deleteMetadata;
          var metadataOwner = new _WeakMap();
          var provider = {
            isProviderFor: function(O3, P3) {
              var metadataPropertySet = metadataOwner.get(O3);
              if (!IsUndefined(metadataPropertySet) && metadataPropertySet.has(P3)) {
                return true;
              }
              if (getOwnMetadataKeys2(O3, P3).length) {
                if (IsUndefined(metadataPropertySet)) {
                  metadataPropertySet = new _Set();
                  metadataOwner.set(O3, metadataPropertySet);
                }
                metadataPropertySet.add(P3);
                return true;
              }
              return false;
            },
            OrdinaryDefineOwnMetadata: defineMetadata2,
            OrdinaryHasOwnMetadata: hasOwnMetadata2,
            OrdinaryGetOwnMetadata: getOwnMetadata2,
            OrdinaryOwnMetadataKeys: getOwnMetadataKeys2,
            OrdinaryDeleteMetadata: deleteMetadata2
          };
          return provider;
        }
        function GetMetadataProvider(O3, P3, Create) {
          var registeredProvider = metadataRegistry.getProvider(O3, P3);
          if (!IsUndefined(registeredProvider)) {
            return registeredProvider;
          }
          if (Create) {
            if (metadataRegistry.setProvider(O3, P3, metadataProvider)) {
              return metadataProvider;
            }
            throw new Error("Illegal state.");
          }
          return void 0;
        }
        function CreateMapPolyfill() {
          var cacheSentinel = {};
          var arraySentinel = [];
          var MapIterator = (
            /** @class */
            function() {
              function MapIterator2(keys, values, selector) {
                this._index = 0;
                this._keys = keys;
                this._values = values;
                this._selector = selector;
              }
              MapIterator2.prototype["@@iterator"] = function() {
                return this;
              };
              MapIterator2.prototype[iteratorSymbol] = function() {
                return this;
              };
              MapIterator2.prototype.next = function() {
                var index = this._index;
                if (index >= 0 && index < this._keys.length) {
                  var result = this._selector(this._keys[index], this._values[index]);
                  if (index + 1 >= this._keys.length) {
                    this._index = -1;
                    this._keys = arraySentinel;
                    this._values = arraySentinel;
                  } else {
                    this._index++;
                  }
                  return { value: result, done: false };
                }
                return { value: void 0, done: true };
              };
              MapIterator2.prototype.throw = function(error) {
                if (this._index >= 0) {
                  this._index = -1;
                  this._keys = arraySentinel;
                  this._values = arraySentinel;
                }
                throw error;
              };
              MapIterator2.prototype.return = function(value) {
                if (this._index >= 0) {
                  this._index = -1;
                  this._keys = arraySentinel;
                  this._values = arraySentinel;
                }
                return { value, done: true };
              };
              return MapIterator2;
            }()
          );
          var Map2 = (
            /** @class */
            function() {
              function Map3() {
                this._keys = [];
                this._values = [];
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              }
              Object.defineProperty(Map3.prototype, "size", {
                get: function() {
                  return this._keys.length;
                },
                enumerable: true,
                configurable: true
              });
              Map3.prototype.has = function(key) {
                return this._find(
                  key,
                  /*insert*/
                  false
                ) >= 0;
              };
              Map3.prototype.get = function(key) {
                var index = this._find(
                  key,
                  /*insert*/
                  false
                );
                return index >= 0 ? this._values[index] : void 0;
              };
              Map3.prototype.set = function(key, value) {
                var index = this._find(
                  key,
                  /*insert*/
                  true
                );
                this._values[index] = value;
                return this;
              };
              Map3.prototype.delete = function(key) {
                var index = this._find(
                  key,
                  /*insert*/
                  false
                );
                if (index >= 0) {
                  var size = this._keys.length;
                  for (var i = index + 1; i < size; i++) {
                    this._keys[i - 1] = this._keys[i];
                    this._values[i - 1] = this._values[i];
                  }
                  this._keys.length--;
                  this._values.length--;
                  if (SameValueZero(key, this._cacheKey)) {
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                  }
                  return true;
                }
                return false;
              };
              Map3.prototype.clear = function() {
                this._keys.length = 0;
                this._values.length = 0;
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              };
              Map3.prototype.keys = function() {
                return new MapIterator(this._keys, this._values, getKey);
              };
              Map3.prototype.values = function() {
                return new MapIterator(this._keys, this._values, getValue);
              };
              Map3.prototype.entries = function() {
                return new MapIterator(this._keys, this._values, getEntry);
              };
              Map3.prototype["@@iterator"] = function() {
                return this.entries();
              };
              Map3.prototype[iteratorSymbol] = function() {
                return this.entries();
              };
              Map3.prototype._find = function(key, insert) {
                if (!SameValueZero(this._cacheKey, key)) {
                  this._cacheIndex = -1;
                  for (var i = 0; i < this._keys.length; i++) {
                    if (SameValueZero(this._keys[i], key)) {
                      this._cacheIndex = i;
                      break;
                    }
                  }
                }
                if (this._cacheIndex < 0 && insert) {
                  this._cacheIndex = this._keys.length;
                  this._keys.push(key);
                  this._values.push(void 0);
                }
                return this._cacheIndex;
              };
              return Map3;
            }()
          );
          return Map2;
          function getKey(key, _2) {
            return key;
          }
          function getValue(_2, value) {
            return value;
          }
          function getEntry(key, value) {
            return [key, value];
          }
        }
        function CreateSetPolyfill() {
          var Set2 = (
            /** @class */
            function() {
              function Set3() {
                this._map = new _Map();
              }
              Object.defineProperty(Set3.prototype, "size", {
                get: function() {
                  return this._map.size;
                },
                enumerable: true,
                configurable: true
              });
              Set3.prototype.has = function(value) {
                return this._map.has(value);
              };
              Set3.prototype.add = function(value) {
                return this._map.set(value, value), this;
              };
              Set3.prototype.delete = function(value) {
                return this._map.delete(value);
              };
              Set3.prototype.clear = function() {
                this._map.clear();
              };
              Set3.prototype.keys = function() {
                return this._map.keys();
              };
              Set3.prototype.values = function() {
                return this._map.keys();
              };
              Set3.prototype.entries = function() {
                return this._map.entries();
              };
              Set3.prototype["@@iterator"] = function() {
                return this.keys();
              };
              Set3.prototype[iteratorSymbol] = function() {
                return this.keys();
              };
              return Set3;
            }()
          );
          return Set2;
        }
        function CreateWeakMapPolyfill() {
          var UUID_SIZE = 16;
          var keys = HashMap.create();
          var rootKey = CreateUniqueKey();
          return (
            /** @class */
            function() {
              function WeakMap2() {
                this._key = CreateUniqueKey();
              }
              WeakMap2.prototype.has = function(target) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  false
                );
                return table !== void 0 ? HashMap.has(table, this._key) : false;
              };
              WeakMap2.prototype.get = function(target) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  false
                );
                return table !== void 0 ? HashMap.get(table, this._key) : void 0;
              };
              WeakMap2.prototype.set = function(target, value) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  true
                );
                table[this._key] = value;
                return this;
              };
              WeakMap2.prototype.delete = function(target) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  false
                );
                return table !== void 0 ? delete table[this._key] : false;
              };
              WeakMap2.prototype.clear = function() {
                this._key = CreateUniqueKey();
              };
              return WeakMap2;
            }()
          );
          function CreateUniqueKey() {
            var key;
            do
              key = "@@WeakMap@@" + CreateUUID();
            while (HashMap.has(keys, key));
            keys[key] = true;
            return key;
          }
          function GetOrCreateWeakMapTable(target, create) {
            if (!hasOwn.call(target, rootKey)) {
              if (!create)
                return void 0;
              Object.defineProperty(target, rootKey, { value: HashMap.create() });
            }
            return target[rootKey];
          }
          function FillRandomBytes(buffer, size) {
            for (var i = 0; i < size; ++i)
              buffer[i] = Math.random() * 255 | 0;
            return buffer;
          }
          function GenRandomBytes(size) {
            if (typeof Uint8Array === "function") {
              var array = new Uint8Array(size);
              if (typeof crypto !== "undefined") {
                crypto.getRandomValues(array);
              } else if (typeof msCrypto !== "undefined") {
                msCrypto.getRandomValues(array);
              } else {
                FillRandomBytes(array, size);
              }
              return array;
            }
            return FillRandomBytes(new Array(size), size);
          }
          function CreateUUID() {
            var data = GenRandomBytes(UUID_SIZE);
            data[6] = data[6] & 79 | 64;
            data[8] = data[8] & 191 | 128;
            var result = "";
            for (var offset = 0; offset < UUID_SIZE; ++offset) {
              var byte = data[offset];
              if (offset === 4 || offset === 6 || offset === 8)
                result += "-";
              if (byte < 16)
                result += "0";
              result += byte.toString(16).toLowerCase();
            }
            return result;
          }
        }
        function MakeDictionary(obj) {
          obj.__ = void 0;
          delete obj.__;
          return obj;
        }
      });
    })(Reflect2 || (Reflect2 = {}));
  }
});

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports, module) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter2() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter2.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l2 = handlers.length, ee2 = new Array(l2); i < l2; i++) {
        ee2[i] = handlers[i].fn;
      }
      return ee2;
    };
    EventEmitter2.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j3;
        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j3 = 1, args = new Array(len - 1); j3 < len; j3++) {
                args[j3 - 1] = arguments[j3];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter2.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter2.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
    EventEmitter2.prefixed = prefix;
    EventEmitter2.EventEmitter = EventEmitter2;
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter2;
    }
  }
});

// node_modules/inversify/lib/esm/index.js
var import_reflect_metadata2 = __toESM(require_Reflect(), 1);

// node_modules/@inversifyjs/common/lib/esm/index.js
function e(e2) {
  return ("object" == typeof e2 && null !== e2 || "function" == typeof e2) && "function" == typeof e2.then;
}
function t(e2) {
  switch (typeof e2) {
    case "string":
    case "symbol":
      return e2.toString();
    case "function":
      return e2.name;
    default:
      throw new Error(`Unexpected ${typeof e2} service id type`);
  }
}
var n = Symbol.for("@inversifyjs/common/islazyServiceIdentifier");
var r = class {
  [n];
  #e;
  constructor(e2) {
    this.#e = e2, this[n] = true;
  }
  static is(e2) {
    return "object" == typeof e2 && null !== e2 && true === e2[n];
  }
  unwrap() {
    return this.#e();
  }
};

// node_modules/@inversifyjs/container/lib/esm/index.js
var import_reflect_metadata = __toESM(require_Reflect(), 1);

// node_modules/@inversifyjs/reflect-metadata-utils/lib/esm/index.js
function t2(t4, e2) {
  return Reflect.getOwnMetadata(e2, t4);
}
function n2(t4, e2, n3) {
  Reflect.defineMetadata(e2, n3, t4);
}
function a(e2, n3, a2, f2) {
  const c2 = f2(t2(e2, n3) ?? a2());
  Reflect.defineMetadata(n3, c2, e2);
}

// node_modules/@inversifyjs/core/lib/esm/index.js
var s = "@inversifyjs/container/bindingId";
function c() {
  const i = t2(Object, s) ?? 0;
  return i === Number.MAX_SAFE_INTEGER ? n2(Object, s, Number.MIN_SAFE_INTEGER) : a(Object, s, () => i, (e2) => e2 + 1), i;
}
var u = { Request: "Request", Singleton: "Singleton", Transient: "Transient" };
var d = { ConstantValue: "ConstantValue", DynamicValue: "DynamicValue", Factory: "Factory", Instance: "Instance", Provider: "Provider", ResolvedValue: "ResolvedValue", ServiceRedirection: "ServiceRedirection" };
function* l(...e2) {
  for (const t4 of e2) yield* t4;
}
var p = class _p {
  #e;
  #t;
  #n;
  constructor(e2) {
    this.#e = /* @__PURE__ */ new Map(), this.#t = {};
    for (const t4 of Reflect.ownKeys(e2)) this.#t[t4] = /* @__PURE__ */ new Map();
    this.#n = e2;
  }
  add(e2, t4) {
    this.#i(e2).push(t4);
    for (const n3 of Reflect.ownKeys(t4)) this.#o(n3, t4[n3]).push(e2);
  }
  clone() {
    const e2 = Reflect.ownKeys(this.#n), t4 = new _p(this.#n);
    this.#r(this.#e, t4.#e);
    for (const n3 of e2) this.#r(this.#t[n3], t4.#t[n3]);
    return t4;
  }
  get(e2, t4) {
    return this.#t[e2].get(t4);
  }
  getAllKeys(e2) {
    return this.#t[e2].keys();
  }
  removeByRelation(e2, t4) {
    const n3 = this.get(e2, t4);
    if (void 0 === n3) return;
    const i = new Set(n3);
    for (const n4 of i) {
      const i2 = this.#e.get(n4);
      if (void 0 === i2) throw new Error("Expecting model relation, none found");
      for (const o of i2) o[e2] === t4 && this.#a(n4, o);
      this.#e.delete(n4);
    }
  }
  #i(e2) {
    let t4 = this.#e.get(e2);
    return void 0 === t4 && (t4 = [], this.#e.set(e2, t4)), t4;
  }
  #o(e2, t4) {
    let n3 = this.#t[e2].get(t4);
    return void 0 === n3 && (n3 = [], this.#t[e2].set(t4, n3)), n3;
  }
  #r(e2, t4) {
    for (const [n3, i] of e2) t4.set(n3, [...i]);
  }
  #a(e2, t4) {
    for (const n3 of Reflect.ownKeys(t4)) this.#s(e2, n3, t4[n3]);
  }
  #s(e2, t4, n3) {
    const i = this.#t[t4].get(n3);
    if (void 0 !== i) {
      const o = i.indexOf(e2);
      -1 !== o && i.splice(o, 1), 0 === i.length && this.#t[t4].delete(n3);
    }
  }
};
var f;
var g;
var m;
!function(e2) {
  e2.moduleId = "moduleId", e2.serviceId = "serviceId";
}(f || (f = {}));
var h = class _h {
  #c;
  #u;
  constructor(e2, t4) {
    this.#c = t4 ?? new p({ moduleId: { isOptional: true }, serviceId: { isOptional: false } }), this.#u = e2;
  }
  static build(e2) {
    return new _h(e2);
  }
  add(e2, t4) {
    this.#c.add(e2, t4);
  }
  clone() {
    return new _h(this.#u, this.#c.clone());
  }
  get(e2) {
    const t4 = [], n3 = this.#c.get(f.serviceId, e2);
    void 0 !== n3 && t4.push(n3);
    const i = this.#u?.get(e2);
    if (void 0 !== i && t4.push(i), 0 !== t4.length) return l(...t4);
  }
  removeAllByModuleId(e2) {
    this.#c.removeByRelation(f.moduleId, e2);
  }
  removeAllByServiceId(e2) {
    this.#c.removeByRelation(f.serviceId, e2);
  }
};
!function(e2) {
  e2.id = "id", e2.moduleId = "moduleId", e2.serviceId = "serviceId";
}(g || (g = {}));
var v = class _v {
  #d;
  #u;
  constructor(e2, t4) {
    this.#d = t4 ?? new p({ id: { isOptional: false }, moduleId: { isOptional: true }, serviceId: { isOptional: false } }), this.#u = e2;
  }
  static build(e2) {
    return new _v(e2);
  }
  clone() {
    return new _v(this.#u, this.#d.clone());
  }
  get(e2) {
    return this.getNonParentBindings(e2) ?? this.#u?.get(e2);
  }
  getById(e2) {
    return this.#d.get(g.id, e2) ?? this.#u?.getById(e2);
  }
  getByModuleId(e2) {
    return this.#d.get(g.moduleId, e2) ?? this.#u?.getByModuleId(e2);
  }
  getNonParentBindings(e2) {
    return this.#d.get(g.serviceId, e2);
  }
  getNonParentBoundServices() {
    return this.#d.getAllKeys(g.serviceId);
  }
  removeById(e2) {
    this.#d.removeByRelation(g.id, e2);
  }
  removeAllByModuleId(e2) {
    this.#d.removeByRelation(g.moduleId, e2);
  }
  removeAllByServiceId(e2) {
    this.#d.removeByRelation(g.serviceId, e2);
  }
  set(e2) {
    const t4 = { [g.id]: e2.id, [g.serviceId]: e2.serviceIdentifier };
    void 0 !== e2.moduleId && (t4[g.moduleId] = e2.moduleId), this.#d.add(e2, t4);
  }
};
!function(e2) {
  e2.moduleId = "moduleId", e2.serviceId = "serviceId";
}(m || (m = {}));
var y = class _y {
  #l;
  #u;
  constructor(e2, t4) {
    this.#l = t4 ?? new p({ moduleId: { isOptional: true }, serviceId: { isOptional: false } }), this.#u = e2;
  }
  static build(e2) {
    return new _y(e2);
  }
  add(e2, t4) {
    this.#l.add(e2, t4);
  }
  clone() {
    return new _y(this.#u, this.#l.clone());
  }
  get(e2) {
    const t4 = [], n3 = this.#l.get(m.serviceId, e2);
    void 0 !== n3 && t4.push(n3);
    const i = this.#u?.get(e2);
    if (void 0 !== i && t4.push(i), 0 !== t4.length) return l(...t4);
  }
  removeAllByModuleId(e2) {
    this.#l.removeByRelation(m.moduleId, e2);
  }
  removeAllByServiceId(e2) {
    this.#l.removeByRelation(m.serviceId, e2);
  }
};
var I = "@inversifyjs/core/classMetadataReflectKey";
function w() {
  return { constructorArguments: [], lifecycle: { postConstructMethodName: void 0, preDestroyMethodName: void 0 }, properties: /* @__PURE__ */ new Map(), scope: void 0 };
}
var b = "@inversifyjs/core/pendingClassMetadataCountReflectKey";
var j = Symbol.for("@inversifyjs/core/InversifyCoreError");
var T = class _T extends Error {
  [j];
  kind;
  constructor(e2, t4, n3) {
    super(t4, n3), this[j] = true, this.kind = e2;
  }
  static is(e2) {
    return "object" == typeof e2 && null !== e2 && true === e2[j];
  }
  static isErrorOfKind(e2, t4) {
    return _T.is(e2) && e2.kind === t4;
  }
};
var S;
var A;
var C;
function $(t4) {
  const n3 = t2(t4, I) ?? w();
  if (!function(t5) {
    const n4 = t2(t5, b);
    return void 0 !== n4 && 0 !== n4;
  }(t4)) return function(e2, t5) {
    const n4 = [];
    if (t5.length < e2.length) throw new T(S.missingInjectionDecorator, `Found unexpected missing metadata on type "${e2.name}". "${e2.name}" constructor requires at least ${e2.length.toString()} arguments, found ${t5.length.toString()} instead.
Are you using @inject, @multiInject or @unmanaged decorators in every non optional constructor argument?

If you're using typescript and want to rely on auto injection, set "emitDecoratorMetadata" compiler option to true`);
    for (let e3 = 0; e3 < t5.length; ++e3) void 0 === t5[e3] && n4.push(e3);
    if (n4.length > 0) throw new T(S.missingInjectionDecorator, `Found unexpected missing metadata on type "${e2.name}" at constructor indexes "${n4.join('", "')}".

Are you using @inject, @multiInject or @unmanaged decorators at those indexes?

If you're using typescript and want to rely on auto injection, set "emitDecoratorMetadata" compiler option to true`);
  }(t4, n3.constructorArguments), n3;
  !function(e2, t5) {
    const n4 = [];
    for (let i = 0; i < t5.constructorArguments.length; ++i) {
      const o = t5.constructorArguments[i];
      void 0 !== o && o.kind !== A.unknown || n4.push(`  - Missing or incomplete metadata for type "${e2.name}" at constructor argument with index ${i.toString()}.
Every constructor parameter must be decorated either with @inject, @multiInject or @unmanaged decorator.`);
    }
    for (const [i, o] of t5.properties) o.kind === A.unknown && n4.push(`  - Missing or incomplete metadata for type "${e2.name}" at property "${i.toString()}".
This property must be decorated either with @inject or @multiInject decorator.`);
    if (0 === n4.length) throw new T(S.unknown, `Unexpected class metadata for type "${e2.name}" with uncompletion traces.
This might be caused by one of the following reasons:

1. A third party library is targeting inversify reflection metadata.
2. A bug is causing the issue. Consider submiting an issue to fix it.`);
    throw new T(S.missingInjectionDecorator, `Invalid class metadata at type ${e2.name}:

${n4.join("\n\n")}`);
  }(t4, n3);
}
function x() {
  return 0;
}
function R(e2) {
  return (t4) => {
    void 0 !== t4 && t4.kind === A.unknown && a(e2, b, x, (e3) => e3 - 1);
  };
}
function B(e2, t4) {
  return (...n3) => (i) => {
    if (void 0 === i) return e2(...n3);
    if (i.kind === C.unmanaged) throw new T(S.injectionDecoratorConflict, "Unexpected injection found. Multiple @inject, @multiInject or @unmanaged decorators found");
    return t4(i, ...n3);
  };
}
function k(e2) {
  if (e2.kind !== A.unknown && true !== e2.isFromTypescriptParamType) throw new T(S.injectionDecoratorConflict, "Unexpected injection found. Multiple @inject, @multiInject or @unmanaged decorators found");
}
!function(e2) {
  e2[e2.injectionDecoratorConflict = 0] = "injectionDecoratorConflict", e2[e2.missingInjectionDecorator = 1] = "missingInjectionDecorator", e2[e2.planning = 2] = "planning", e2[e2.resolution = 3] = "resolution", e2[e2.unknown = 4] = "unknown";
}(S || (S = {})), function(e2) {
  e2[e2.unknown = 32] = "unknown";
}(A || (A = {})), function(e2) {
  e2[e2.multipleInjection = 0] = "multipleInjection", e2[e2.singleInjection = 1] = "singleInjection", e2[e2.unmanaged = 2] = "unmanaged";
}(C || (C = {}));
var P = B(function(e2, t4) {
  return { kind: e2, name: void 0, optional: false, tags: /* @__PURE__ */ new Map(), value: t4 };
}, function(e2, t4, n3) {
  return k(e2), { ...e2, kind: t4, value: n3 };
});
function D(e2, t4) {
  return (n3) => {
    const i = n3.properties.get(t4);
    return n3.properties.set(t4, e2(i)), n3;
  };
}
var F;
function O(e2, t4, n3, i) {
  if (T.isErrorOfKind(i, S.injectionDecoratorConflict)) {
    const o = function(e3, t5, n4) {
      if (void 0 === n4) {
        if (void 0 === t5) throw new T(S.unknown, "Unexpected undefined property and index values");
        return { kind: F.property, property: t5, targetClass: e3.constructor };
      }
      return "number" == typeof n4 ? { index: n4, kind: F.parameter, targetClass: e3 } : { kind: F.method, method: t5, targetClass: e3 };
    }(e2, t4, n3);
    throw new T(S.injectionDecoratorConflict, `Unexpected injection error.

Cause:

${i.message}

Details

${function(e3) {
      switch (e3.kind) {
        case F.method:
          return `[class: "${e3.targetClass.name}", method: "${e3.method.toString()}"]`;
        case F.parameter:
          return `[class: "${e3.targetClass.name}", index: "${e3.index.toString()}"]`;
        case F.property:
          return `[class: "${e3.targetClass.name}", property: "${e3.property.toString()}"]`;
      }
    }(o)}`, { cause: i });
  }
  throw i;
}
function V(e2, t4) {
  return (i, o, r2) => {
    try {
      void 0 === r2 ? function(e3, t5) {
        const i2 = E(e3, t5);
        return (e4, t6) => {
          a(e4.constructor, I, w, D(i2(e4), t6));
        };
      }(e2, t4)(i, o) : "number" == typeof r2 ? function(e3, t5) {
        const i2 = E(e3, t5);
        return (e4, t6, o2) => {
          if (!/* @__PURE__ */ function(e5, t7) {
            return "function" == typeof e5 && void 0 === t7;
          }(e4, t6)) throw new T(S.injectionDecoratorConflict, `Found an @inject decorator in a non constructor parameter.
Found @inject decorator at method "${t6?.toString() ?? ""}" at class "${e4.constructor.name}"`);
          a(e4, I, w, /* @__PURE__ */ function(e5, t7) {
            return (n3) => {
              const i3 = n3.constructorArguments[t7];
              return n3.constructorArguments[t7] = e5(i3), n3;
            };
          }(i2(e4), o2));
        };
      }(e2, t4)(i, o, r2) : function(e3, t5) {
        const i2 = E(e3, t5);
        return (e4, t6, o2) => {
          if (!function(e5) {
            return void 0 !== e5.set;
          }(o2)) throw new T(S.injectionDecoratorConflict, `Found an @inject decorator in a non setter property method.
Found @inject decorator at method "${t6.toString()}" at class "${e4.constructor.name}"`);
          a(e4.constructor, I, w, D(i2(e4), t6));
        };
      }(e2, t4)(i, o, r2);
    } catch (e3) {
      O(i, o, r2, e3);
    }
  };
}
function E(e2, t4) {
  return (n3) => {
    const i = t4(n3);
    return (t5) => (i(t5), e2(t5));
  };
}
function N(e2) {
  return V(P(C.singleInjection, e2), R);
}
!function(e2) {
  e2[e2.method = 0] = "method", e2[e2.parameter = 1] = "parameter", e2[e2.property = 2] = "property";
}(F || (F = {}));
var U = "@inversifyjs/core/classIsInjectableFlagReflectKey";
var K = [Array, BigInt, Boolean, Function, Number, Object, String];
function q(t4) {
  const i = t2(t4, "design:paramtypes");
  void 0 !== i && a(t4, I, w, /* @__PURE__ */ function(e2) {
    return (t5) => (e2.forEach((e3, n3) => {
      var i2;
      void 0 !== t5.constructorArguments[n3] || (i2 = e3, K.includes(i2)) || (t5.constructorArguments[n3] = function(e4) {
        return { isFromTypescriptParamType: true, kind: C.singleInjection, name: void 0, optional: false, tags: /* @__PURE__ */ new Map(), value: e4 };
      }(e3));
    }), t5);
  }(i));
}
function z(i) {
  return (o) => {
    !function(n3) {
      if (void 0 !== t2(n3, U)) throw new T(S.injectionDecoratorConflict, `Cannot apply @injectable decorator multiple times at class "${n3.name}"`);
      n2(n3, U, true);
    }(o), q(o), void 0 !== i && a(o, I, w, (e2) => ({ ...e2, scope: i }));
  };
}
function ie() {
  return { kind: C.unmanaged };
}
var oe = B(ie, function(e2) {
  if (k(e2), function(e3) {
    return void 0 !== e3.name || e3.optional || e3.tags.size > 0;
  }(e2)) throw new T(S.injectionDecoratorConflict, "Unexpected injection found. Found @unmanaged injection with additional @named, @optional, @tagged or @targetName injections");
  return ie();
});
var ae;
!function(e2) {
  e2[e2.multipleInjection = 0] = "multipleInjection", e2[e2.singleInjection = 1] = "singleInjection";
}(ae || (ae = {}));
var se = class _se {
  #p;
  constructor(e2) {
    this.#p = e2;
  }
  get name() {
    return this.#p.elem.name;
  }
  get serviceIdentifier() {
    return this.#p.elem.serviceIdentifier;
  }
  get tags() {
    return this.#p.elem.tags;
  }
  getAncestor() {
    if (void 0 !== this.#p.previous) return new _se(this.#p.previous);
  }
};
var ce = class _ce {
  last;
  constructor(e2) {
    this.last = e2;
  }
  concat(e2) {
    return new _ce({ elem: e2, previous: this.last });
  }
  [Symbol.iterator]() {
    let e2 = this.last;
    return { next: () => {
      if (void 0 === e2) return { done: true, value: void 0 };
      const t4 = e2.elem;
      return e2 = e2.previous, { done: false, value: t4 };
    } };
  }
};
function ue(e2, t4, n3) {
  const i = n3?.customServiceIdentifier ?? t4.serviceIdentifier, o = [...e2.getBindings(i) ?? []].filter((e3) => e3.isSatisfiedBy(t4));
  if (0 === o.length && void 0 !== e2.autobindOptions && "function" == typeof i) {
    const t5 = function(e3, t6) {
      const n4 = $(t6), i2 = n4.scope ?? e3.scope;
      return { cache: { isRight: false, value: void 0 }, id: c(), implementationType: t6, isSatisfiedBy: () => true, moduleId: void 0, onActivation: void 0, onDeactivation: void 0, scope: i2, serviceIdentifier: t6, type: d.Instance };
    }(e2.autobindOptions, i);
    e2.setBinding(t5), o.push(t5);
  }
  return o;
}
function de(e2) {
  return void 0 !== e2.redirections;
}
function le(e2, t4, n3, i) {
  let r2, a2;
  de(n3) ? (r2 = n3.binding.targetServiceIdentifier, a2 = n3.binding.serviceIdentifier) : (r2 = n3.serviceIdentifier, a2 = n3.parent?.binding.serviceIdentifier), Array.isArray(e2) ? function(e3, t5, n4, i2, r3) {
    if (0 !== e3.length) {
      const t6 = `Ambiguous bindings found for service: "${t(n4)}".

Registered bindings:

${e3.map((e4) => function(e5) {
        switch (e5.type) {
          case d.Instance:
            return `[ type: "${e5.type}", serviceIdentifier: "${t(e5.serviceIdentifier)}", scope: "${e5.scope}", implementationType: "${e5.implementationType.name}" ]`;
          case d.ServiceRedirection:
            return `[ type: "${e5.type}", serviceIdentifier: "${t(e5.serviceIdentifier)}", redirection: "${t(e5.targetServiceIdentifier)}" ]`;
          default:
            return `[ type: "${e5.type}", serviceIdentifier: "${t(e5.serviceIdentifier)}", scope: "${e5.scope}" ]`;
        }
      }(e4.binding)).join("\n")}

Trying to resolve bindings for "${fe(n4, i2)}".

${ge(r3)}`;
      throw new T(S.planning, t6);
    }
    t5 || pe(n4, i2, r3);
  }(e2, t4, r2, a2, i) : function(e3, t5, n4, i2, o) {
    if (void 0 !== e3 || t5) return;
    pe(n4, i2, o);
  }(e2, t4, r2, a2, i);
}
function pe(e2, t4, n3) {
  const i = `No bindings found for service: "${t(e2)}".

Trying to resolve bindings for "${fe(e2, t4)}".

${ge(n3)}`;
  throw new T(S.planning, i);
}
function fe(e2, t4) {
  return void 0 === t4 ? `${t(e2)} (Root service)` : t(t4);
}
function ge(e2) {
  const t4 = 0 === e2.tags.size ? "" : `
- tags:
  - ${[...e2.tags.keys()].map((e3) => e3.toString()).join("\n  - ")}`;
  return `Binding constraints:
- service identifier: ${t(e2.serviceIdentifier)}
- name: ${e2.name?.toString() ?? "-"}${t4}`;
}
function me(e2, t4, n3) {
  if (1 !== e2.redirections.length) le(e2.redirections, t4, e2, n3);
  else {
    const [i] = e2.redirections;
    de(i) && me(i, t4, n3);
  }
}
function he(e2, t4, n3) {
  if (Array.isArray(e2.bindings) && 1 === e2.bindings.length) {
    const [i] = e2.bindings;
    de(i) && me(i, t4, n3);
  } else le(e2.bindings, t4, e2, n3);
}
function ve(e2, t4) {
  if (function(e3) {
    return e3 instanceof Error && (e3 instanceof RangeError && /stack space|call stack|too much recursion/i.test(e3.message) || "InternalError" === e3.name && /too much recursion/.test(e3.message));
  }(t4)) {
    const n3 = function(e3) {
      const t5 = [...e3];
      if (0 === t5.length) return "(No dependency trace)";
      return t5.map(t).join(" -> ");
    }(function(e3) {
      const t5 = /* @__PURE__ */ new Set();
      for (const n4 of e3.servicesBranch) {
        if (t5.has(n4)) return [...t5, n4];
        t5.add(n4);
      }
      return [...t5];
    }(e2));
    throw new T(S.planning, `Circular dependency found: ${n3}`, { cause: t4 });
  }
  throw t4;
}
function ye(e2) {
  try {
    const t4 = /* @__PURE__ */ new Map();
    void 0 !== e2.rootConstraints.tag && t4.set(e2.rootConstraints.tag.key, e2.rootConstraints.tag.value);
    const n3 = new ce({ elem: { name: e2.rootConstraints.name, serviceIdentifier: e2.rootConstraints.serviceIdentifier, tags: t4 }, previous: void 0 }), i = new se(n3.last), o = ue(e2, i), r2 = [], a2 = { bindings: r2, parent: void 0, serviceIdentifier: e2.rootConstraints.serviceIdentifier };
    if (r2.push(...je(e2, n3, o, a2)), !e2.rootConstraints.isMultiple) {
      he(a2, e2.rootConstraints.isOptional ?? false, i);
      const [t5] = r2;
      a2.bindings = t5;
    }
    return { tree: { root: a2 } };
  } catch (t4) {
    ve(e2, t4);
  }
}
function Me(e2, t4, n3, i) {
  const o = { binding: t4, classMetadata: e2.getClassMetadata(t4.implementationType), constructorParams: [], parent: i, propertyParams: /* @__PURE__ */ new Map() };
  return Se({ autobindOptions: e2.autobindOptions, getBindings: e2.getBindings, getClassMetadata: e2.getClassMetadata, node: o, servicesBranch: e2.servicesBranch, setBinding: e2.setBinding }, n3);
}
function Ie(e2, t4, n3) {
  if (n3.kind === C.unmanaged) return;
  const i = r.is(n3.value) ? n3.value.unwrap() : n3.value, o = t4.concat({ name: n3.name, serviceIdentifier: i, tags: n3.tags }), a2 = new se(o.last), s2 = ue(e2, a2), c2 = [], u2 = { bindings: c2, parent: e2.node, serviceIdentifier: i };
  if (c2.push(...je(e2, o, s2, u2)), n3.kind === C.singleInjection) {
    he(u2, n3.optional, a2);
    const [e3] = c2;
    u2.bindings = e3;
  }
  return u2;
}
function we(e2, t4, n3) {
  const i = r.is(n3.value) ? n3.value.unwrap() : n3.value, o = t4.concat({ name: n3.name, serviceIdentifier: i, tags: n3.tags }), a2 = new se(o.last), s2 = ue(e2, a2), c2 = [], u2 = { bindings: c2, parent: e2.node, serviceIdentifier: i };
  if (c2.push(...je(e2, o, s2, u2)), n3.kind === ae.singleInjection) {
    he(u2, n3.optional, a2);
    const [e3] = c2;
    u2.bindings = e3;
  }
  return u2;
}
function be(e2, t4, n3, i) {
  const o = { binding: t4, params: [], parent: i };
  return Se({ autobindOptions: e2.autobindOptions, getBindings: e2.getBindings, getClassMetadata: e2.getClassMetadata, node: o, servicesBranch: e2.servicesBranch, setBinding: e2.setBinding }, n3);
}
function je(e2, t4, n3, i) {
  const o = de(i) ? i.binding.targetServiceIdentifier : i.serviceIdentifier;
  e2.servicesBranch.push(o);
  const r2 = [];
  for (const o2 of n3) switch (o2.type) {
    case d.Instance:
      r2.push(Me(e2, o2, t4, i));
      break;
    case d.ResolvedValue:
      r2.push(be(e2, o2, t4, i));
      break;
    case d.ServiceRedirection: {
      const n4 = Te(e2, t4, o2, i);
      r2.push(n4);
      break;
    }
    default:
      r2.push({ binding: o2, parent: i });
  }
  return e2.servicesBranch.pop(), r2;
}
function Te(e2, t4, n3, i) {
  const o = { binding: n3, parent: i, redirections: [] }, r2 = ue(e2, new se(t4.last), { customServiceIdentifier: n3.targetServiceIdentifier });
  return o.redirections.push(...je(e2, t4, r2, o)), o;
}
function Se(e2, t4) {
  return e2.node.binding.type === d.Instance ? function(e3, t5, n3) {
    const i = t5.classMetadata;
    for (const [o, r2] of i.constructorArguments.entries()) t5.constructorParams[o] = Ie(e3, n3, r2);
    for (const [o, r2] of i.properties) {
      const i2 = Ie(e3, n3, r2);
      void 0 !== i2 && t5.propertyParams.set(o, i2);
    }
    return e3.node;
  }(e2, e2.node, t4) : function(e3, t5, n3) {
    const i = t5.binding.metadata;
    for (const [o, r2] of i.arguments.entries()) t5.params[o] = we(e3, n3, r2);
    return e3.node;
  }(e2, e2.node, t4);
}
var Ae;
!function(e2) {
  e2[e2.singleMandatory = 0] = "singleMandatory", e2[e2.singleOptional = 1] = "singleOptional", e2[e2.multipleMandatory = 2] = "multipleMandatory", e2[e2.multipleOptional = 3] = "multipleOptional", e2[e2.length = 4] = "length";
}(Ae || (Ae = {}));
var Ce = class {
  #f;
  #g;
  #m;
  #h;
  #v;
  constructor() {
    this.#f = this.#y(), this.#g = this.#y(), this.#h = this.#y(), this.#m = this.#y(), this.#v = [];
  }
  clearCache() {
    for (const e2 of this.#M()) e2.clear();
    for (const e2 of this.#v) e2.clearCache();
  }
  get(e2) {
    return void 0 === e2.name ? void 0 === e2.tag ? this.#I(this.#f, e2).get(e2.serviceIdentifier) : this.#I(this.#m, e2).get(e2.serviceIdentifier)?.get(e2.tag.key)?.get(e2.tag.value) : void 0 === e2.tag ? this.#I(this.#g, e2).get(e2.serviceIdentifier)?.get(e2.name) : this.#I(this.#h, e2).get(e2.serviceIdentifier)?.get(e2.name)?.get(e2.tag.key)?.get(e2.tag.value);
  }
  set(e2, t4) {
    void 0 === e2.name ? void 0 === e2.tag ? this.#I(this.#f, e2).set(e2.serviceIdentifier, t4) : this.#w(this.#w(this.#I(this.#m, e2), e2.serviceIdentifier), e2.tag.key).set(e2.tag.value, t4) : void 0 === e2.tag ? this.#w(this.#I(this.#g, e2), e2.serviceIdentifier).set(e2.name, t4) : this.#w(this.#w(this.#w(this.#I(this.#h, e2), e2.serviceIdentifier), e2.name), e2.tag.key).set(e2.tag.value, t4);
  }
  subscribe(e2) {
    this.#v.push(e2);
  }
  #y() {
    const e2 = new Array(Ae.length);
    for (let t4 = 0; t4 < e2.length; ++t4) e2[t4] = /* @__PURE__ */ new Map();
    return e2;
  }
  #w(e2, t4) {
    let n3 = e2.get(t4);
    return void 0 === n3 && (n3 = /* @__PURE__ */ new Map(), e2.set(t4, n3)), n3;
  }
  #I(e2, t4) {
    return e2[this.#b(t4)];
  }
  #M() {
    return [...this.#f, ...this.#g, ...this.#h, ...this.#m];
  }
  #b(e2) {
    return e2.isMultiple ? true === e2.optional ? Ae.multipleOptional : Ae.multipleMandatory : true === e2.optional ? Ae.singleOptional : Ae.singleMandatory;
  }
};
function $e(e2, t4) {
  return e(t4) ? (e2.cache = { isRight: true, value: t4 }, t4.then((t5) => xe(e2, t5))) : xe(e2, t4);
}
function xe(e2, t4) {
  return e2.cache = { isRight: true, value: t4 }, t4;
}
function Re(e2, t4, n3) {
  const i = e2.getActivations(t4);
  return void 0 === i ? n3 : e(n3) ? Be(e2, n3, i[Symbol.iterator]()) : function(e3, t5, n4) {
    let i2 = t5, o = n4.next();
    for (; true !== o.done; ) {
      const t6 = o.value(e3.context, i2);
      if (e(t6)) return Be(e3, t6, n4);
      i2 = t6, o = n4.next();
    }
    return i2;
  }(e2, n3, i[Symbol.iterator]());
}
async function Be(e2, t4, n3) {
  let i = await t4, o = n3.next();
  for (; true !== o.done; ) i = await o.value(e2.context, i), o = n3.next();
  return i;
}
function ke(e2, t4, n3) {
  let i = n3;
  if (void 0 !== t4.onActivation) {
    const n4 = t4.onActivation;
    i = e(i) ? i.then((t5) => n4(e2.context, t5)) : n4(e2.context, i);
  }
  return Re(e2, t4.serviceIdentifier, i);
}
function Pe(e2) {
  return (t4, n3) => {
    if (n3.cache.isRight) return n3.cache.value;
    return $e(n3, ke(t4, n3, e2(t4, n3)));
  };
}
var De = Pe(function(e2, t4) {
  return t4.value;
});
function Fe(e2) {
  return e2;
}
function Oe(e2, t4) {
  return (n3, i) => {
    const o = e2(i);
    switch (o.scope) {
      case u.Singleton:
        if (o.cache.isRight) return o.cache.value;
        return $e(o, ke(n3, o, t4(n3, i)));
      case u.Request: {
        if (n3.requestScopeCache.has(o.id)) return n3.requestScopeCache.get(o.id);
        const e3 = ke(n3, o, t4(n3, i));
        return n3.requestScopeCache.set(o.id, e3), e3;
      }
      case u.Transient:
        return ke(n3, o, t4(n3, i));
    }
  };
}
var Ve = ((e2) => Oe(Fe, e2))(function(e2, t4) {
  return t4.value(e2.context);
});
var Ee = Pe(function(e2, t4) {
  return t4.factory(e2.context);
});
function Ne(e2, t4, n3) {
  const i = function(e3, t5, n4) {
    if (void 0 === n4) return;
    if (!(n4 in e3)) throw new T(S.resolution, `Expecting a "${n4.toString()}" property when resolving "${t5.implementationType.name}" class @postConstruct decorated method, none found.`);
    if ("function" != typeof e3[n4]) throw new T(S.resolution, `Expecting a "${n4.toString()}" method when resolving "${t5.implementationType.name}" class @postConstruct decorated method, a non function property was found instead.`);
    {
      let i2;
      try {
        i2 = e3[n4]();
      } catch (e4) {
        throw new T(S.resolution, `Unexpected error found when calling "${n4.toString()}" @postConstruct decorated method on class "${t5.implementationType.name}"`, { cause: e4 });
      }
      if (e(i2)) return async function(e4, t6, n5) {
        try {
          await n5;
        } catch (n6) {
          throw new T(S.resolution, `Unexpected error found when calling "${t6.toString()}" @postConstruct decorated method on class "${e4.implementationType.name}"`, { cause: n6 });
        }
      }(t5, n4, i2);
    }
  }(e2, t4, n3);
  return e(i) ? i.then(() => e2) : e2;
}
function Ue(e2) {
  return (t4, n3, i) => {
    const o = new i.binding.implementationType(...t4), r2 = e2(n3, o, i);
    return e(r2) ? r2.then(() => Ne(o, i.binding, i.classMetadata.lifecycle.postConstructMethodName)) : Ne(o, i.binding, i.classMetadata.lifecycle.postConstructMethodName);
  };
}
var Ke = Pe(function(e2, t4) {
  return t4.provider(e2.context);
});
function qe(e2) {
  return e2.binding;
}
function ze(e2) {
  return e2.binding;
}
var Ge = /* @__PURE__ */ function(e2) {
  return (t4, n3, i) => {
    const o = [];
    for (const [r2, s2] of i.propertyParams) {
      const c2 = i.classMetadata.properties.get(r2);
      if (void 0 === c2) throw new T(S.resolution, `Expecting metadata at property "${r2.toString()}", none found`);
      c2.kind !== C.unmanaged && void 0 !== s2.bindings && (n3[r2] = e2(t4, s2), e(n3[r2]) && o.push((async () => {
        n3[r2] = await n3[r2];
      })()));
    }
    if (o.length > 0) return Promise.all(o).then(() => {
    });
  };
}(Ye);
var _e = /* @__PURE__ */ function(e2) {
  return function t4(n3, i) {
    const o = [];
    for (const r2 of i.redirections) de(r2) ? o.push(...t4(n3, r2)) : o.push(e2(n3, r2));
    return o;
  };
}(We);
var Xe = /* @__PURE__ */ function(e2, t4, n3) {
  return (i, o) => {
    const r2 = e2(i, o);
    return e(r2) ? t4(r2, i, o) : n3(r2, i, o);
  };
}(/* @__PURE__ */ function(e2) {
  return (t4, n3) => {
    const i = [];
    for (const o of n3.constructorParams) void 0 === o ? i.push(void 0) : i.push(e2(t4, o));
    return i.some(e) ? Promise.all(i) : i;
  };
}(Ye), /* @__PURE__ */ function(e2) {
  return async (t4, n3, i) => {
    const o = await t4;
    return e2(o, n3, i);
  };
}(Ue(Ge)), Ue(Ge));
var He = /* @__PURE__ */ function(e2) {
  return (t4, n3) => {
    const i = e2(t4, n3);
    return e(i) ? i.then((e3) => n3.binding.factory(...e3)) : n3.binding.factory(...i);
  };
}(/* @__PURE__ */ function(e2) {
  return (t4, n3) => {
    const i = [];
    for (const o of n3.params) i.push(e2(t4, o));
    return i.some(e) ? Promise.all(i) : i;
  };
}(Ye));
var Je = ((e2) => Oe(qe, e2))(Xe);
var Le = ((e2) => Oe(ze, e2))(He);
function Qe(e2) {
  return Ye(e2, e2.planResult.tree.root);
}
function We(e2, t4) {
  switch (t4.binding.type) {
    case d.ConstantValue:
      return De(e2, t4.binding);
    case d.DynamicValue:
      return Ve(e2, t4.binding);
    case d.Factory:
      return Ee(e2, t4.binding);
    case d.Instance:
      return Je(e2, t4);
    case d.Provider:
      return Ke(e2, t4.binding);
    case d.ResolvedValue:
      return Le(e2, t4);
  }
}
function Ye(e2, t4) {
  if (void 0 !== t4.bindings) return Array.isArray(t4.bindings) ? function(e3, t5) {
    const n3 = [];
    for (const i of t5) de(i) ? n3.push(..._e(e3, i)) : n3.push(We(e3, i));
    if (n3.some(e)) return Promise.all(n3);
    return n3;
  }(e2, t4.bindings) : function(e3, t5) {
    if (de(t5)) {
      const n3 = _e(e3, t5);
      if (1 === n3.length) return n3[0];
      throw new T(S.resolution, "Unexpected multiple resolved values on single injection");
    }
    return We(e3, t5);
  }(e2, t4.bindings);
}
function Ze(e2) {
  return void 0 !== e2.scope;
}
function et(e2, t4) {
  if (void 0 !== e2.lifecycle.preDestroyMethodName && "function" == typeof t4[e2.lifecycle.preDestroyMethodName]) return t4[e2.lifecycle.preDestroyMethodName]();
}
function tt(e2, t4, n3) {
  const i = e2.getDeactivations(t4);
  if (void 0 !== i) return e(n3) ? nt(n3, i[Symbol.iterator]()) : function(e3, t5) {
    let n4 = t5.next();
    for (; true !== n4.done; ) {
      const i2 = n4.value(e3);
      if (e(i2)) return nt(e3, t5);
      n4 = t5.next();
    }
  }(n3, i[Symbol.iterator]());
}
async function nt(e2, t4) {
  const n3 = await e2;
  let i = t4.next();
  for (; true !== i.done; ) await i.value(n3), i = t4.next();
}
function it(e2, t4) {
  const n3 = function(e3, t5) {
    if (t5.type === d.Instance) {
      const n4 = e3.getClassMetadata(t5.implementationType), i = t5.cache.value;
      return e(i) ? i.then((e4) => et(n4, e4)) : et(n4, i);
    }
  }(e2, t4);
  return void 0 === n3 ? ot(e2, t4) : n3.then(() => ot(e2, t4));
}
function ot(e2, t4) {
  const n3 = t4.cache;
  return e(n3.value) ? n3.value.then((n4) => rt(e2, t4, n4)) : rt(e2, t4, n3.value);
}
function rt(e2, t4, n3) {
  let i;
  if (void 0 !== t4.onDeactivation) {
    i = (0, t4.onDeactivation)(n3);
  }
  return void 0 === i ? tt(e2, t4.serviceIdentifier, n3) : i.then(() => tt(e2, t4.serviceIdentifier, n3));
}
function at(e2, t4) {
  if (void 0 === t4) return;
  const n3 = function(e3) {
    const t5 = [];
    for (const n4 of e3) Ze(n4) && n4.scope === u.Singleton && n4.cache.isRight && t5.push(n4);
    return t5;
  }(t4), i = [];
  for (const t5 of n3) {
    const n4 = it(e2, t5);
    void 0 !== n4 && i.push(n4);
  }
  return i.length > 0 ? Promise.all(i).then(() => {
  }) : void 0;
}
function st(e2, t4) {
  const n3 = e2.getBindingsFromModule(t4);
  return at(e2, n3);
}
function ct(e2, t4) {
  const n3 = e2.getBindings(t4);
  return at(e2, n3);
}

// node_modules/@inversifyjs/container/lib/esm/index.js
var I2 = Symbol.for("@inversifyjs/container/bindingIdentifier");
function A2(i) {
  return "object" == typeof i && null !== i && true === i[I2];
}
var P2 = class {
  static always = (i) => true;
};
function B2(i) {
  return { [I2]: true, id: i.id };
}
function C2(i) {
  return (e2) => {
    for (let n3 = e2.getAncestor(); void 0 !== n3; n3 = n3.getAncestor()) if (i(n3)) return true;
    return false;
  };
}
function R2(i) {
  return (e2) => e2.name === i;
}
function M(i) {
  return (e2) => e2.serviceIdentifier === i;
}
function x2(i, e2) {
  return (n3) => n3.tags.has(i) && n3.tags.get(i) === e2;
}
function O2(i) {
  return void 0 === i.name && 0 === i.tags.size;
}
function N2(i) {
  const e2 = C2(i);
  return (i2) => !e2(i2);
}
function U2(i) {
  return (e2) => {
    const n3 = e2.getAncestor();
    return void 0 === n3 || !i(n3);
  };
}
function F2(i) {
  return (e2) => {
    const n3 = e2.getAncestor();
    return void 0 !== n3 && i(n3);
  };
}
var k2 = class {
  #n;
  constructor(i) {
    this.#n = i;
  }
  getIdentifier() {
    return B2(this.#n);
  }
  inRequestScope() {
    return this.#n.scope = u.Request, new V2(this.#n);
  }
  inSingletonScope() {
    return this.#n.scope = u.Singleton, new V2(this.#n);
  }
  inTransientScope() {
    return this.#n.scope = u.Transient, new V2(this.#n);
  }
};
var D2 = class {
  #t;
  #s;
  #r;
  #a;
  constructor(i, e2, n3, t4) {
    this.#t = i, this.#s = e2, this.#r = n3, this.#a = t4;
  }
  to(i) {
    const e2 = $(i), n3 = { cache: { isRight: false, value: void 0 }, id: c(), implementationType: i, isSatisfiedBy: P2.always, moduleId: this.#s, onActivation: void 0, onDeactivation: void 0, scope: e2.scope ?? this.#r, serviceIdentifier: this.#a, type: d.Instance };
    return this.#t(n3), new E2(n3);
  }
  toSelf() {
    if ("function" != typeof this.#a) throw new Error('"toSelf" function can only be applied when a newable function is used as service identifier');
    return this.to(this.#a);
  }
  toConstantValue(i) {
    const e2 = { cache: { isRight: false, value: void 0 }, id: c(), isSatisfiedBy: P2.always, moduleId: this.#s, onActivation: void 0, onDeactivation: void 0, scope: u.Singleton, serviceIdentifier: this.#a, type: d.ConstantValue, value: i };
    return this.#t(e2), new V2(e2);
  }
  toDynamicValue(i) {
    const e2 = { cache: { isRight: false, value: void 0 }, id: c(), isSatisfiedBy: P2.always, moduleId: this.#s, onActivation: void 0, onDeactivation: void 0, scope: this.#r, serviceIdentifier: this.#a, type: d.DynamicValue, value: i };
    return this.#t(e2), new E2(e2);
  }
  toResolvedValue(i, e2) {
    const n3 = { cache: { isRight: false, value: void 0 }, factory: i, id: c(), isSatisfiedBy: P2.always, metadata: this.#o(e2), moduleId: this.#s, onActivation: void 0, onDeactivation: void 0, scope: this.#r, serviceIdentifier: this.#a, type: d.ResolvedValue };
    return this.#t(n3), new E2(n3);
  }
  toFactory(i) {
    const e2 = { cache: { isRight: false, value: void 0 }, factory: i, id: c(), isSatisfiedBy: P2.always, moduleId: this.#s, onActivation: void 0, onDeactivation: void 0, scope: u.Singleton, serviceIdentifier: this.#a, type: d.Factory };
    return this.#t(e2), new V2(e2);
  }
  toProvider(i) {
    const e2 = { cache: { isRight: false, value: void 0 }, id: c(), isSatisfiedBy: P2.always, moduleId: this.#s, onActivation: void 0, onDeactivation: void 0, provider: i, scope: u.Singleton, serviceIdentifier: this.#a, type: d.Provider };
    return this.#t(e2), new V2(e2);
  }
  toService(i) {
    const e2 = { id: c(), isSatisfiedBy: P2.always, moduleId: this.#s, serviceIdentifier: this.#a, targetServiceIdentifier: i, type: d.ServiceRedirection };
    this.#t(e2);
  }
  #o(i) {
    return { arguments: (i ?? []).map((i2) => function(i3) {
      return "object" == typeof i3 && !r.is(i3);
    }(i2) ? { kind: true === i2.isMultiple ? ae.multipleInjection : ae.singleInjection, name: i2.name, optional: i2.optional ?? false, tags: new Map((i2.tags ?? []).map((i3) => [i3.key, i3.value])), value: i2.serviceIdentifier } : { kind: ae.singleInjection, name: void 0, optional: false, tags: /* @__PURE__ */ new Map(), value: i2 }) };
  }
};
var j2 = class {
  #n;
  constructor(i) {
    this.#n = i;
  }
  getIdentifier() {
    return B2(this.#n);
  }
  onActivation(i) {
    return this.#n.onActivation = i, new T2(this.#n);
  }
  onDeactivation(i) {
    return this.#n.onDeactivation = i, new T2(this.#n);
  }
};
var T2 = class {
  #n;
  constructor(i) {
    this.#n = i;
  }
  getIdentifier() {
    return B2(this.#n);
  }
  when(i) {
    return this.#n.isSatisfiedBy = i, new j2(this.#n);
  }
  whenAnyAncestor(i) {
    return this.when(C2(i));
  }
  whenAnyAncestorIs(i) {
    return this.when(C2(M(i)));
  }
  whenAnyAncestorNamed(i) {
    return this.when(function(i2) {
      return C2(R2(i2));
    }(i));
  }
  whenAnyAncestorTagged(i, e2) {
    return this.when(function(i2, e3) {
      return C2(x2(i2, e3));
    }(i, e2));
  }
  whenDefault() {
    return this.when(O2);
  }
  whenNamed(i) {
    return this.when(R2(i));
  }
  whenNoParent(i) {
    return this.when(U2(i));
  }
  whenNoParentIs(i) {
    return this.when(U2(M(i)));
  }
  whenNoParentNamed(i) {
    return this.when(function(i2) {
      return U2(R2(i2));
    }(i));
  }
  whenNoParentTagged(i, e2) {
    return this.when(function(i2, e3) {
      return U2(x2(i2, e3));
    }(i, e2));
  }
  whenParent(i) {
    return this.when(F2(i));
  }
  whenParentIs(i) {
    return this.when(F2(M(i)));
  }
  whenParentNamed(i) {
    return this.when(function(i2) {
      return F2(R2(i2));
    }(i));
  }
  whenParentTagged(i, e2) {
    return this.when(function(i2, e3) {
      return F2(x2(i2, e3));
    }(i, e2));
  }
  whenTagged(i, e2) {
    return this.when(x2(i, e2));
  }
  whenNoAncestor(i) {
    return this.when(N2(i));
  }
  whenNoAncestorIs(i) {
    return this.when(N2(M(i)));
  }
  whenNoAncestorNamed(i) {
    return this.when(function(i2) {
      return N2(R2(i2));
    }(i));
  }
  whenNoAncestorTagged(i, e2) {
    return this.when(function(i2, e3) {
      return N2(x2(i2, e3));
    }(i, e2));
  }
};
var V2 = class extends T2 {
  #d;
  constructor(i) {
    super(i), this.#d = new j2(i);
  }
  onActivation(i) {
    return this.#d.onActivation(i);
  }
  onDeactivation(i) {
    return this.#d.onDeactivation(i);
  }
};
var E2 = class extends V2 {
  #c;
  constructor(i) {
    super(i), this.#c = new k2(i);
  }
  inRequestScope() {
    return this.#c.inRequestScope();
  }
  inSingletonScope() {
    return this.#c.inSingletonScope();
  }
  inTransientScope() {
    return this.#c.inTransientScope();
  }
};
var q2 = Symbol.for("@inversifyjs/container/InversifyContainerError");
var G = class _G extends Error {
  [q2];
  kind;
  constructor(i, e2, n3) {
    super(e2, n3), this[q2] = true, this.kind = i;
  }
  static is(i) {
    return "object" == typeof i && null !== i && true === i[q2];
  }
  static isErrorOfKind(i, e2) {
    return _G.is(i) && i.kind === e2;
  }
};
var $2;
!function(i) {
  i[i.invalidOperation = 0] = "invalidOperation";
}($2 || ($2 = {}));
var _ = u.Transient;
var L = class {
  #l;
  #u;
  #h;
  #v;
  #g;
  #b;
  #f;
  #S;
  #p;
  #y;
  #m;
  constructor(i) {
    this.#h = this.#w(), this.#g = (i2) => this.#l.get(i2), this.#S = new Ce(), this.#p = this.#I(), void 0 === i?.parent ? (this.#l = h.build(void 0), this.#u = v.build(void 0), this.#v = y.build(void 0)) : (this.#l = h.build(i.parent.#l), this.#u = v.build(i.parent.#u), this.#v = y.build(i.parent.#v), i.parent.#S.subscribe(this.#S)), this.#b = this.#u.get.bind(this.#u), this.#y = this.#A.bind(this), this.#f = { autobind: i?.autobind ?? false, defaultScope: i?.defaultScope ?? _ }, this.#m = [];
  }
  bind(i) {
    return new D2((i2) => {
      this.#A(i2);
    }, void 0, this.#f.defaultScope, i);
  }
  get(i, e2) {
    const n3 = this.#P(false, i, e2), t4 = this.#B(n3);
    if (e(t4)) throw new G($2.invalidOperation, `Unexpected asyncronous service when resolving service "${t(i)}"`);
    return t4;
  }
  getAll(i, e2) {
    const n3 = this.#P(true, i, e2), t4 = this.#B(n3);
    if (e(t4)) throw new G($2.invalidOperation, `Unexpected asyncronous service when resolving service "${t(i)}"`);
    return t4;
  }
  async getAllAsync(i, e2) {
    const n3 = this.#P(true, i, e2);
    return this.#B(n3);
  }
  async getAsync(i, e2) {
    const n3 = this.#P(false, i, e2);
    return this.#B(n3);
  }
  isBound(i, e2) {
    const n3 = this.#u.get(i);
    return this.#C(i, n3, e2);
  }
  isCurrentBound(i, e2) {
    const n3 = this.#u.getNonParentBindings(i);
    return this.#C(i, n3, e2);
  }
  async load(...i) {
    await Promise.all(this.#e(...i));
  }
  loadSync(...i) {
    const e2 = this.#e(...i);
    for (const i2 of e2) if (void 0 !== i2) throw new G($2.invalidOperation, "Unexpected asyncronous module load. Consider using Container.load() instead.");
  }
  onActivation(i, e2) {
    this.#l.add(e2, { serviceId: i });
  }
  onDeactivation(i, e2) {
    this.#v.add(e2, { serviceId: i });
  }
  restore() {
    const i = this.#m.pop();
    if (void 0 === i) throw new G($2.invalidOperation, "No snapshot available to restore");
    this.#l = i.activationService, this.#u = i.bindingService, this.#v = i.deactivationService, this.#R();
  }
  async rebind(i) {
    return await this.unbind(i), this.bind(i);
  }
  rebindSync(i) {
    return this.unbindSync(i), this.bind(i);
  }
  snapshot() {
    this.#m.push({ activationService: this.#l.clone(), bindingService: this.#u.clone(), deactivationService: this.#v.clone() });
  }
  async unbind(i) {
    await this.#M(i);
  }
  async unbindAll() {
    const i = [...this.#u.getNonParentBoundServices()];
    await Promise.all(i.map(async (i2) => ct(this.#h, i2)));
    for (const e2 of i) this.#l.removeAllByServiceId(e2), this.#u.removeAllByServiceId(e2), this.#v.removeAllByServiceId(e2);
    this.#S.clearCache();
  }
  unbindSync(i) {
    void 0 !== this.#M(i) && this.#x(i);
  }
  async unload(...i) {
    await Promise.all(this.#O(...i)), this.#N(i);
  }
  unloadSync(...i) {
    const e2 = this.#O(...i);
    for (const i2 of e2) if (void 0 !== i2) throw new G($2.invalidOperation, "Unexpected asyncronous module unload. Consider using Container.unload() instead.");
    this.#N(i);
  }
  #U(i) {
    return { bind: (e2) => new D2((i2) => {
      this.#A(i2);
    }, i, this.#f.defaultScope, e2), isBound: this.isBound.bind(this), onActivation: (e2, n3) => {
      this.#l.add(n3, { moduleId: i, serviceId: e2 });
    }, onDeactivation: (e2, n3) => {
      this.#v.add(n3, { moduleId: i, serviceId: e2 });
    }, rebind: this.rebind.bind(this), rebindSync: this.rebindSync.bind(this), unbind: this.unbind.bind(this), unbindSync: this.unbindSync.bind(this) };
  }
  #w() {
    return { getBindings: (i) => this.#u.get(i), getBindingsFromModule: (i) => this.#u.getByModuleId(i), getClassMetadata: $, getDeactivations: (i) => this.#v.get(i) };
  }
  #F(i, e2, n3) {
    return { isMultiple: i, name: n3?.name, optional: n3?.optional, serviceIdentifier: e2, tag: n3?.tag };
  }
  #k(i, e2, n3) {
    const t4 = { autobindOptions: n3?.autobind ?? this.#f.autobind ? { scope: this.#f.defaultScope } : void 0, getBindings: this.#b, getClassMetadata: $, rootConstraints: { isMultiple: e2, serviceIdentifier: i }, servicesBranch: [], setBinding: this.#y };
    return this.#D(t4, n3), t4;
  }
  #P(i, e2, n3) {
    const t4 = this.#F(i, e2, n3), s2 = this.#S.get(t4);
    if (void 0 !== s2) return s2;
    const r2 = ye(this.#k(e2, i, n3));
    return this.#S.set(t4, r2), r2;
  }
  #I() {
    return { get: this.get.bind(this), getAll: this.getAll.bind(this), getAllAsync: this.getAllAsync.bind(this), getAsync: this.getAsync.bind(this) };
  }
  #B(i) {
    return Qe({ context: this.#p, getActivations: this.#g, planResult: i, requestScopeCache: /* @__PURE__ */ new Map() });
  }
  #D(i, e2) {
    void 0 !== e2 && (void 0 !== e2.name && (i.rootConstraints.name = e2.name), true === e2.optional && (i.rootConstraints.isOptional = true), void 0 !== e2.tag && (i.rootConstraints.tag = { key: e2.tag.key, value: e2.tag.value }));
  }
  #C(i, e2, n3) {
    if (void 0 === e2) return false;
    const t4 = { getAncestor: () => {
    }, name: n3?.name, serviceIdentifier: i, tags: /* @__PURE__ */ new Map() };
    void 0 !== n3?.tag && t4.tags.set(n3.tag.key, n3.tag.value);
    for (const i2 of e2) if (i2.isSatisfiedBy(t4)) return true;
    return false;
  }
  #e(...i) {
    return i.map((i2) => i2.load(this.#U(i2.id)));
  }
  #O(...i) {
    return i.map((i2) => st(this.#h, i2.id));
  }
  #R() {
    this.#S.clearCache(), this.#g = (i) => this.#l.get(i), this.#b = this.#u.get.bind(this.#u), this.#p = this.#I(), this.#y = this.#A.bind(this);
  }
  #A(i) {
    this.#u.set(i), this.#S.clearCache();
  }
  #x(i) {
    let e2;
    if (A2(i)) {
      const t4 = this.#u.getById(i.id), s2 = (n3 = t4, function(i2) {
        if (void 0 === i2) return;
        const e3 = i2.next();
        return true !== e3.done ? e3.value : void 0;
      }(n3?.[Symbol.iterator]()))?.serviceIdentifier;
      e2 = void 0 === s2 ? "Unexpected asyncronous deactivation when unbinding binding identifier. Consider using Container.unbind() instead." : `Unexpected asyncronous deactivation when unbinding "${t(s2)}" binding. Consider using Container.unbind() instead.`;
    } else e2 = `Unexpected asyncronous deactivation when unbinding "${t(i)}" service. Consider using Container.unbind() instead.`;
    var n3;
    throw new G($2.invalidOperation, e2);
  }
  #M(i) {
    return A2(i) ? this.#j(i) : this.#T(i);
  }
  #j(i) {
    const e2 = this.#u.getById(i.id), n3 = at(this.#h, e2);
    if (void 0 !== n3) return n3.then(() => {
      this.#V(i);
    });
    this.#V(i);
  }
  #V(i) {
    this.#u.removeById(i.id), this.#S.clearCache();
  }
  #N(i) {
    for (const e2 of i) this.#l.removeAllByModuleId(e2.id), this.#u.removeAllByModuleId(e2.id), this.#v.removeAllByModuleId(e2.id);
    this.#S.clearCache();
  }
  #T(i) {
    const e2 = ct(this.#h, i);
    if (void 0 !== e2) return e2.then(() => {
      this.#E(i);
    });
    this.#E(i);
  }
  #E(i) {
    this.#l.removeAllByServiceId(i), this.#u.removeAllByServiceId(i), this.#v.removeAllByServiceId(i), this.#S.clearCache();
  }
};

// node_modules/eventemitter3/index.mjs
var import_index = __toESM(require_eventemitter3(), 1);
var eventemitter3_default = import_index.default;

// src/core/engine.ts
var Engine = class extends eventemitter3_default {
  maxTick = 10;
  tick = 0;
  interval;
  constructor() {
    super();
    this.interval = setInterval(() => {
      this.emit("tickBefore", this.tick);
      this.tick = this.tick == this.maxTick ? 0 : this.tick + 1;
      this.emit("tickAfter", this.tick);
    }, 500);
  }
  getTick() {
    return this.tick;
  }
  end() {
    clearInterval(this.interval);
  }
};
Engine = __decorateClass([
  z("Singleton")
], Engine);
function clone(instance) {
  const copy = new instance.constructor();
  Object.assign(copy, instance);
  return copy;
}

// src/entities/inventory.ts
var Inventory = class {
  /**
   * @param slots limit slots (MAX LIMIT: 4000)
   */
  constructor(slots) {
    this.slots = slots;
    for (let i = 0; i <= Math.min(slots, 4e3); i++) {
      this.items.push(null);
    }
  }
  items = [];
  getItems() {
    return this.items;
  }
  setItem(index, item) {
    this.items[Math.min(index, this.slots)] = item;
  }
  /**
   *
   * @param from index slot
   * @param to index slot
   */
  changePlace(from, to) {
    const fromIndex = Math.min(from, this.slots);
    const toIndex = Math.min(to, this.slots);
    if (fromIndex === toIndex) return;
    const fromSlotItem = this.items[fromIndex];
    const toSlotItem = this.items[toIndex];
    if (fromSlotItem?.material == toSlotItem?.material) {
      this.changePlaceItemStack(fromIndex, toIndex, fromSlotItem.count);
    } else {
      this.items[fromIndex] = toSlotItem;
      this.items[toIndex] = fromSlotItem;
    }
  }
  changePlaceItemStack(from, to, count) {
    const fromIndex = Math.min(from, this.slots);
    const toIndex = Math.min(to, this.slots);
    if (fromIndex === toIndex) return;
    const fromSlotItem = this.items[fromIndex];
    const toSlotItem = this.items[toIndex];
    if (fromSlotItem != null && toSlotItem != null && fromSlotItem.material != toSlotItem.material) {
      return;
    }
    if (fromSlotItem instanceof ItemStack) {
      let outItem = toSlotItem;
      fromSlotItem.count -= count;
      if (fromSlotItem.count == 0) {
        this.setItem(fromIndex, null);
      }
      if (outItem instanceof Item && outItem.material == fromSlotItem.material) {
        outItem.count += count;
      } else {
        outItem = clone(fromSlotItem);
        outItem.count = count;
      }
      this.setItem(toIndex, outItem);
    }
  }
};

// src/entities/item.ts
var ItemStack = class {
  _count = 1;
  maxStack = 16;
  set count(value) {
    this._count = Math.min(value, this.maxStack);
  }
  get count() {
    return this._count;
  }
};
var Item = class extends ItemStack {
  material = "AIR" /* AIR */;
  description = "No description";
};
var ItemTool = class extends Item {
  maxStack = 1;
  durability = 1;
};
var ItemIronOre = class extends Item {
  material = "IRON_ORE" /* IRON_ORE */;
};
var ItemIronPieces = class extends Item {
  material = "IRON_PIECES" /* IRON_PIECES */;
  maxStack = 120;
};
var ItemMetalOre = class extends Item {
  material = "METAL_ORE" /* METAL_ORE */;
};
var ItemCopperOre = class extends Item {
  material = "COPPER_ORE" /* COPPER_ORE */;
};
var ItemCopperPieces = class extends Item {
  material = "COPPER_PIECES" /* COPPER_PIECES */;
};
var ItemGoldPieces = class extends Item {
  material = "GOLD_PIECES" /* GOLD_PIECES */;
};
var ItemGoldOre = class extends Item {
  material = "GOLD_ORE" /* GOLD_ORE */;
};
var ItemIronPickaxe = class extends ItemTool {
  material = "IRON_PICKAXE" /* IRON_PICKAXE */;
};
var ItemCrusherMachine = class extends ItemTool {
  material = "CRUSHER_MACHINE" /* CRUSHER_MACHINE */;
  allowedMaterials = [
    "METAL_ORE" /* METAL_ORE */,
    "GOLD_ORE" /* GOLD_ORE */,
    "IRON_ORE" /* IRON_ORE */,
    "COPPER_ORE" /* COPPER_ORE */
  ];
};
var ItemFence = class extends ItemTool {
  material = "FENCE" /* FENCE */;
};
var ItemAir = class extends ItemTool {
};
var ItemFactory = class _ItemFactory {
  static create(material) {
    switch (material) {
      case "AIR" /* AIR */:
        return new ItemAir();
      case "CRUSHER_MACHINE" /* CRUSHER_MACHINE */:
        return new ItemCrusherMachine();
      case "GOLD_ORE" /* GOLD_ORE */:
        return new ItemGoldOre();
      case "GOLD_PIECES" /* GOLD_PIECES */:
        return new ItemGoldPieces();
      case "COPPER_PIECES" /* COPPER_PIECES */:
        return new ItemCopperPieces();
      case "COPPER_ORE" /* COPPER_ORE */:
        return new ItemCopperOre();
      case "METAL_ORE" /* METAL_ORE */:
        return new ItemMetalOre();
      case "IRON_PICKAXE" /* IRON_PICKAXE */:
        return new ItemIronPickaxe();
      case "IRON_ORE" /* IRON_ORE */:
        return new ItemIronOre();
      case "IRON_PIECES" /* IRON_PIECES */:
        return new ItemIronPieces();
      case "FENCE" /* FENCE */:
        return new ItemFence();
    }
  }
  static createWithCount(material, count = 1) {
    const temp = _ItemFactory.create(material);
    temp.count = count;
    return temp;
  }
};

// src/entities/player.ts
var Player = class {
  inventory;
  _selectedSlot = null;
  constructor() {
    this.inventory = new Inventory(23);
    this.inventory.setItem(0, ItemFactory.create("IRON_PICKAXE" /* IRON_PICKAXE */));
  }
  set selectedSlot(index) {
    this._selectedSlot = Math.min(index, this.inventory.slots);
  }
  get selectedSlot() {
    return this._selectedSlot;
  }
};
Player = __decorateClass([
  z("Singleton")
], Player);

// src/game/game.ts
var container = new L({
  autobind: true
});
var createImage = (uri) => {
  return () => {
    const image = new Image();
    image.src = uri;
    image.width = 40;
    image.width = 40;
    image.classList.add("pixel-art");
    return image;
  };
};
var SPRITES = {
  ["IRON_PICKAXE" /* IRON_PICKAXE */]: createImage("sprites/iron_pickaxe.png"),
  ["METAL_ORE" /* METAL_ORE */]: createImage("sprites/metal_ore.png"),
  ["COPPER_ORE" /* COPPER_ORE */]: createImage("sprites/copper_ore.png"),
  ["GOLD_ORE" /* GOLD_ORE */]: createImage("sprites/gold_ore.png"),
  ["IRON_ORE" /* IRON_ORE */]: createImage("sprites/iron_ore.png"),
  ["COPPER_PIECES" /* COPPER_PIECES */]: createImage("sprites/copper_pieces.png"),
  ["GOLD_PIECES" /* GOLD_PIECES */]: createImage("sprites/gold_pieces.png"),
  ["IRON_PIECES" /* IRON_PIECES */]: createImage("sprites/iron_pieces.png"),
  ["AIR" /* AIR */]: createImage("sprites/air.png"),
  ["CRUSHER_MACHINE" /* CRUSHER_MACHINE */]: createImage("sprites/crusher_machine.png"),
  ["FENCE" /* FENCE */]: createImage("sprites/animated/fence/fence_item.png")
  // Tiles
};
function getSprite(sprite) {
  return SPRITES[sprite]();
}

// src/game/map/tile.ts
var TileSet = {
  [0 /* GRASS */]: createImage("sprites/tiles/grass_tile.png")(),
  [1 /* STONE */]: createImage("sprites/tiles/stone_tile.png")()
};

// src/game/map/game_map.ts
var TileMap = class {
  tiles = [
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  constructor() {
  }
  render(ctx2) {
    let x3 = 0, y2 = 0;
    for (let i = 0; i < this.tiles.length; i++) {
      x3 = 0;
      for (let j3 = 0; j3 < this.tiles[i].length; j3++) {
        const tile = TileSet[this.tiles[i][j3]];
        ctx2.drawImage(tile, x3, y2, 64, 64);
        x3 += 64;
      }
      y2 += 64;
    }
  }
};

// src/game/ui/inventory.ts
var UIInventory = class {
  constructor(player) {
    this.player = player;
    this.elements = this.renderInventory();
    this.slots = this.elements.map((e2) => {
      return new UIInventorySlot(e2);
    });
    document.addEventListener("DOMContentLoaded", () => {
      this.render();
    });
  }
  elements;
  slots;
  renderInventory() {
    const inventoryHTML = getElement(DIV_INVENTORY_ID);
    inventoryHTML.innerHTML = this.player.inventory.getItems().map((_i, index) => {
      return `<div class="slot" data-index="${index}"></div>`;
    }).join("");
    const elements = Array.from(document.getElementsByClassName("slot"));
    return elements.filter((e2) => e2 instanceof HTMLDivElement).filter((e2) => e2.hasAttribute("data-index"));
  }
  render() {
    this.slots.forEach((slot) => {
      slot.render(true);
    });
  }
};
UIInventory = __decorateClass([
  z("Singleton"),
  __decorateParam(0, N(Player))
], UIInventory);

// src/game/ui/inventory_slot.ts
var NAME_ATTR_COUNT = "data-count";
var UIInventorySlot = class {
  constructor(ref) {
    this.ref = ref;
    this.index = Number(ref.getAttribute("data-index"));
    this.player = container.get(Player);
    ref.addEventListener("click", (ev) => this.click(ev));
    ref.addEventListener("dragstart", (ev) => this.dragStart(ev));
    ref.addEventListener("dragover", (ev) => this.dragOver(ev));
    ref.addEventListener("dragleave", (ev) => this.dragLeave(ev));
    ref.addEventListener("drop", (ev) => this.drop(ev));
  }
  index;
  draggable = false;
  player;
  click(ev) {
    ev.preventDefault();
    if (this.player.selectedSlot == this.index) return;
    let slot;
    if (this.player.selectedSlot != null) {
      slot = container.get(UIInventory).slots.find((slot2) => slot2.index == this.player.selectedSlot);
    }
    this.player.selectedSlot = this.index;
    container.get(UISelectedItem).render();
    this.render();
    slot?.render();
  }
  dragStart(ev) {
    if (ev instanceof DragEvent) {
      const item = this.player.inventory.getItems()[this.index];
      if (item) {
        const previewSprite = getSprite(item.material);
        previewSprite.width = 40;
        previewSprite.height = 40;
        ev.dataTransfer?.setDragImage(previewSprite, 10, 10);
      }
      ev.dataTransfer?.setData(
        "application/json",
        JSON.stringify({
          index: this.index
        })
      );
    }
  }
  dragOver(ev) {
    ev.preventDefault();
    ev.target.classList.remove("slot-drag-over");
  }
  dragLeave(ev) {
    ev.preventDefault();
    ev.target.classList.remove("slot-drag-over");
  }
  drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer?.getData("application/json");
    if (data != null) {
      const resultData = JSON.parse(data);
      const toIndex = Number(
        ev.target.getAttribute("data-index")
      );
      if (ev.shiftKey) {
        this.player.inventory.changePlaceItemStack(
          resultData.index,
          toIndex,
          1
        );
      } else if (ev.ctrlKey) {
        const itemCount = this.player.inventory.getItems()[resultData.index]?.count;
        if (itemCount != void 0) {
          let count = Math.floor(itemCount / 2);
          if (count == 0) {
            count = 1;
          }
          this.player.inventory.changePlaceItemStack(
            resultData.index,
            toIndex,
            count
          );
        }
      } else {
        this.player.inventory.changePlace(resultData.index, toIndex);
      }
      const slot = container.get(UIInventory).slots.find((s2) => s2.index == resultData.index);
      container.get(UISelectedItem).render();
      slot?.render(true);
      this.render(true);
    }
    ev.target.classList.remove("slot-drag-over");
  }
  get item() {
    return this.player.inventory.getItems()[this.index];
  }
  render(updateSprite = false) {
    if (this.player.selectedSlot == this.index) {
      this.ref.classList.add("slot-selected");
    } else {
      this.ref.classList.remove("slot-selected");
    }
    this.draggable = this.item != null;
    this.ref.draggable = this.draggable;
    if (this.item && this.item.count > 1) {
      this.ref.classList.add("count");
      this.ref.setAttribute(NAME_ATTR_COUNT, this.item.count.toString());
    } else {
      this.ref.classList.remove("count");
      this.ref.removeAttribute(NAME_ATTR_COUNT);
    }
    if (updateSprite) {
      this.ref.innerHTML = "";
      if (this.item) {
        this.ref.appendChild(getSprite(this.item.material));
      }
    }
  }
};

// src/game/ui/selected_item.ts
var UISelectedItem = class {
  constructor(player) {
    this.player = player;
    this.ref = getElement(DIV_SELECTED_ITEM_ID);
  }
  ref;
  render() {
    const { selectedSlot, inventory } = this.player;
    this.ref.innerHTML = "";
    if (selectedSlot == null) return;
    const item = inventory.getItems()[selectedSlot];
    if (item != null) {
      const image = getSprite(item.material);
      image.width = 64;
      image.height = 64;
      this.ref.appendChild(image);
    }
  }
};
UISelectedItem = __decorateClass([
  z("Singleton"),
  __decorateParam(0, N(Player))
], UISelectedItem);

// src/game/ui/ui.ts
var DIV_INVENTORY_ID = "inventory";
var DIV_SELECTED_ITEM_ID = "selected-item-place";
function getElement(id) {
  return document.getElementById(id);
}

// src/game/collisions.ts
var Collider = class {
  points = [];
};
var RectCollider = class extends Collider {
  points = [
    // X
    [0, 1],
    // Y
    [1, 0]
  ];
  constructor(points) {
    super();
    this.points = points;
  }
  isInside(pos) {
    if (
      // X
      this.points[0][0] < pos[0] && pos[0] < this.points[0][1] && // Y
      this.points[1][0] < pos[1] && pos[1] < this.points[1][1]
    ) {
      return true;
    }
    return false;
  }
  isColliderInside(points) {
    if (
      // Checking if one of the points inside of collider
      // For X
      (this.points[0][0] < points[0][0] && points[0][0] < this.points[0][1] || this.points[0][0] < points[0][1] && points[0][1] < this.points[0][1]) && (this.points[1][0] < points[0][0] && points[0][0] < this.points[1][1] || this.points[1][0] < points[0][1] && points[0][1] < this.points[1][1])
    ) {
      return true;
    }
    return false;
  }
};
var COLLIDERS = [
  new RectCollider([
    [64 * 2, 64 + 64 * 2],
    [64 * 2, 64 + 64 * 2]
  ])
];

// src/game/player.ts
var PlayerController = class {
  // TODO: Classes
  points = [
    // X
    [0, 64],
    // Y
    [1, 64]
  ];
  sprite;
  canvasPlayer;
  ctx;
  WIDTH = 64;
  HEIGHT = 64;
  velocity = [0, 0];
  COFF = 0.2;
  speed = 0.6;
  // Map Coordinates
  x = 0;
  y = 0;
  coords = [0, 0];
  right = false;
  left = false;
  down = false;
  up = false;
  constructor() {
    this.sprite = createImage("sprites/player.png")();
    this.sprite.width = 64;
    this.sprite.height = 16;
    this.canvasPlayer = document.createElement("canvas");
    this.ctx = this.canvasPlayer.getContext("2d");
    this.canvasPlayer.width = 16;
    this.canvasPlayer.height = 16;
    this.sprite.onload = () => {
      this.canvasPlayer.getContext("2d").drawImage(this.sprite, 0, 0);
    };
    window.addEventListener("keypress", (ev) => {
      switch (ev.code) {
        case "KeyW":
          this.up = true;
          break;
        case "KeyD":
          this.right = true;
          break;
        case "KeyS":
          this.down = true;
          break;
        case "KeyA":
          this.left = true;
          break;
      }
    });
    window.addEventListener("keyup", (ev) => {
      switch (ev.code) {
        case "KeyW":
          this.up = false;
          break;
        case "KeyD":
          this.right = false;
          break;
        case "KeyS":
          this.down = false;
          break;
        case "KeyA":
          this.left = false;
          break;
      }
    });
  }
  // TOP 0
  // RIGHT 16
  // DOWN 16*2
  // LEFT 16*3
  // TOP-RIGHT 16*4
  // DOWN-RIGHT 16*5
  // DOWN-LEFT 16*6
  // TOP-LEFT 16*7
  updateSprite(direction) {
    if (direction[0] > 0 && direction[1] == 0) {
      this.draw(16);
    } else if (direction[0] < 0 && direction[1] == 0) {
      this.draw(16 * 3);
    } else if (direction[1] > 0 && direction[0] == 0) {
      this.draw(16 * 2);
    } else if (direction[1] < 0 && direction[0] == 0) {
      this.draw(0);
    } else if (direction[1] < 0 && direction[0] > 0) {
      this.draw(16 * 4);
    } else if (direction[1] > 0 && direction[0] > 0) {
      this.draw(16 * 5);
    } else if (direction[1] > 0 && direction[0] < 0) {
      this.draw(16 * 6);
    } else if (direction[1] < 0 && direction[0] < 0) {
      this.draw(16 * 7);
    }
  }
  // Render
  updateMove(_ctx) {
    const direction = this.move();
    this.updateSprite(direction);
    if (direction[0] != 0 || direction[1] != 0) {
      const v2 = this.addVelocity(direction);
      for (const collider of COLLIDERS) {
        if (collider.isColliderInside(this.points)) {
          console.log("Collision");
          this.coords[0] -= v2[0] + 2;
          this.coords[1] -= v2[1] + 2;
          this.velocity[0] = 0;
          this.velocity[1] = 0;
        }
      }
    }
    if (this.velocity[0] != 0 || this.velocity[1] != 0) {
      this.subVelocity();
    }
    this.coords[0] += this.velocity[0];
    this.coords[1] += this.velocity[1];
    this.points[0][0] = this.coords[0] + this.WIDTH;
    this.points[1][0] = this.coords[1] + this.HEIGHT;
  }
  addVelocity(direction) {
    const v2 = this.normalize(direction);
    v2[0] *= this.speed;
    v2[1] *= this.speed;
    this.velocity[0] += v2[0];
    this.velocity[1] += v2[1];
    return v2;
  }
  subVelocity() {
    if (Math.abs(this.velocity[0]) < 5e-6) {
      this.velocity[0] = 0;
    }
    if (Math.abs(this.velocity[1]) < 5e-6) {
      this.velocity[1] = 0;
    }
    this.velocity[0] -= this.velocity[0] * this.COFF;
    this.velocity[1] -= this.velocity[1] * this.COFF;
  }
  normalize(direction) {
    const v2 = Math.abs(
      Math.sqrt(Math.pow(direction[0], 2) + Math.pow(direction[1], 2))
    );
    return [direction[0] / v2, direction[1] / v2];
  }
  move() {
    const direction = [0, 0];
    if (this.up) {
      direction[1]--;
    }
    if (this.down) {
      direction[1]++;
    }
    if (this.right) {
      direction[0]++;
    }
    if (this.left) {
      direction[0]--;
    }
    return direction;
  }
  draw(offset = 0) {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(this.sprite, -offset, 0);
  }
};

// src/game/canvas.ts
function canvasInit(width, height) {
  const canvas2 = document.getElementById("game_canvas");
  canvas2.width = width;
  canvas2.height = height;
  const ctx2 = canvas2.getContext("2d");
  return [canvas2, ctx2];
}
function drawBackground(ctx2, canvas2) {
  ctx2.fillStyle = "#070707";
  ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
}

// src/game/index.ts
var [canvas, ctx] = canvasInit(800, 450);
ctx.imageSmoothingEnabled = false;
var Game = class {
  constructor(player, uiInventory) {
    this.player = player;
    this.uiInventory = uiInventory;
    this.playerController = new PlayerController();
    this.playerController.draw();
    this.renderBind = this.render.bind(this);
    this.tileMap = new TileMap();
  }
  lastTimeStamp = 0;
  frames = 0;
  diagnosticFps = 0;
  accumulatedTime = 0;
  playerController;
  renderBind;
  tileMap;
  render(timestamp) {
    const delta = timestamp - this.lastTimeStamp;
    this.lastTimeStamp = timestamp;
    this.accumulatedTime += delta;
    this.frames++;
    if (this.accumulatedTime >= 1e3) {
      this.diagnosticFps = this.frames;
      this.frames = 0;
      this.accumulatedTime = 0;
    }
    drawBackground(ctx, canvas);
    this.tileMap.render(ctx);
    ctx.drawImage(
      this.playerController.canvasPlayer,
      this.playerController.coords[0],
      this.playerController.coords[1],
      this.playerController.WIDTH,
      this.playerController.HEIGHT
    );
    ctx.save();
    ctx.strokeStyle = "red";
    for (const collider of COLLIDERS) {
      if (collider instanceof RectCollider && collider.points.length === 2) {
        const [x0, x1] = collider.points[0];
        const [y0, y1] = collider.points[1];
        ctx.beginPath();
        ctx.rect(x0, y0, x1 - x0, y1 - y0);
        ctx.stroke();
      } else if (collider.points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(collider.points[0][0], collider.points[0][1]);
        for (let i = 1; i < collider.points.length; i++) {
          ctx.lineTo(collider.points[i][0], collider.points[i][1]);
        }
        ctx.closePath();
        ctx.stroke();
      }
    }
    ctx.restore();
    this.playerController.updateMove(ctx);
    ctx.fillStyle = "#fff";
    ctx.font = "32px serif";
    ctx.fillText(this.diagnosticFps + " FPS", 20, 50, 150);
    ctx.font = "16px serif";
    ctx.fillText(this.playerController.velocity + " Velocity", 20, 80);
    requestAnimationFrame(this.renderBind);
  }
  start() {
    requestAnimationFrame(this.renderBind);
  }
};
Game = __decorateClass([
  z("Singleton"),
  __decorateParam(0, N(Player)),
  __decorateParam(1, N(UIInventory))
], Game);
container.bind(Game);
var game = container.get(Game);
game.start();
/*! Bundled license information:

reflect-metadata/Reflect.js:
  (*! *****************************************************************************
  Copyright (C) Microsoft. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0
  
  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.
  
  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** *)
*/
