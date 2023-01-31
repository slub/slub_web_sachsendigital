(self["webpackChunkslub_web_sachsendigital"] = self["webpackChunkslub_web_sachsendigital"] || []).push([["SxndPlayerVendor"],{

/***/ "./node_modules/@formatjs/fast-memoize/lib/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@formatjs/fast-memoize/lib/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ memoize),
/* harmony export */   "strategies": () => (/* binding */ strategies)
/* harmony export */ });
//
// Main
//
function memoize(fn, options) {
    var cache = options && options.cache ? options.cache : cacheDefault;
    var serializer = options && options.serializer ? options.serializer : serializerDefault;
    var strategy = options && options.strategy ? options.strategy : strategyDefault;
    return strategy(fn, {
        cache: cache,
        serializer: serializer,
    });
}
//
// Strategy
//
function isPrimitive(value) {
    return (value == null || typeof value === 'number' || typeof value === 'boolean'); // || typeof value === "string" 'unsafe' primitive for our needs
}
function monadic(fn, cache, serializer, arg) {
    var cacheKey = isPrimitive(arg) ? arg : serializer(arg);
    var computedValue = cache.get(cacheKey);
    if (typeof computedValue === 'undefined') {
        computedValue = fn.call(this, arg);
        cache.set(cacheKey, computedValue);
    }
    return computedValue;
}
function variadic(fn, cache, serializer) {
    var args = Array.prototype.slice.call(arguments, 3);
    var cacheKey = serializer(args);
    var computedValue = cache.get(cacheKey);
    if (typeof computedValue === 'undefined') {
        computedValue = fn.apply(this, args);
        cache.set(cacheKey, computedValue);
    }
    return computedValue;
}
function assemble(fn, context, strategy, cache, serialize) {
    return strategy.bind(context, fn, cache, serialize);
}
function strategyDefault(fn, options) {
    var strategy = fn.length === 1 ? monadic : variadic;
    return assemble(fn, this, strategy, options.cache.create(), options.serializer);
}
function strategyVariadic(fn, options) {
    return assemble(fn, this, variadic, options.cache.create(), options.serializer);
}
function strategyMonadic(fn, options) {
    return assemble(fn, this, monadic, options.cache.create(), options.serializer);
}
//
// Serializer
//
var serializerDefault = function () {
    return JSON.stringify(arguments);
};
//
// Cache
//
function ObjectWithoutPrototypeCache() {
    this.cache = Object.create(null);
}
ObjectWithoutPrototypeCache.prototype.get = function (key) {
    return this.cache[key];
};
ObjectWithoutPrototypeCache.prototype.set = function (key, value) {
    this.cache[key] = value;
};
var cacheDefault = {
    create: function create() {
        // @ts-ignore
        return new ObjectWithoutPrototypeCache();
    },
};
var strategies = {
    variadic: strategyVariadic,
    monadic: strategyMonadic,
};


/***/ }),

/***/ "./node_modules/@formatjs/icu-messageformat-parser/lib/error.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@formatjs/icu-messageformat-parser/lib/error.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorKind": () => (/* binding */ ErrorKind)
/* harmony export */ });
var ErrorKind;
(function (ErrorKind) {
    /** Argument is unclosed (e.g. `{0`) */
    ErrorKind[ErrorKind["EXPECT_ARGUMENT_CLOSING_BRACE"] = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE";
    /** Argument is empty (e.g. `{}`). */
    ErrorKind[ErrorKind["EMPTY_ARGUMENT"] = 2] = "EMPTY_ARGUMENT";
    /** Argument is malformed (e.g. `{foo!}``) */
    ErrorKind[ErrorKind["MALFORMED_ARGUMENT"] = 3] = "MALFORMED_ARGUMENT";
    /** Expect an argument type (e.g. `{foo,}`) */
    ErrorKind[ErrorKind["EXPECT_ARGUMENT_TYPE"] = 4] = "EXPECT_ARGUMENT_TYPE";
    /** Unsupported argument type (e.g. `{foo,foo}`) */
    ErrorKind[ErrorKind["INVALID_ARGUMENT_TYPE"] = 5] = "INVALID_ARGUMENT_TYPE";
    /** Expect an argument style (e.g. `{foo, number, }`) */
    ErrorKind[ErrorKind["EXPECT_ARGUMENT_STYLE"] = 6] = "EXPECT_ARGUMENT_STYLE";
    /** The number skeleton is invalid. */
    ErrorKind[ErrorKind["INVALID_NUMBER_SKELETON"] = 7] = "INVALID_NUMBER_SKELETON";
    /** The date time skeleton is invalid. */
    ErrorKind[ErrorKind["INVALID_DATE_TIME_SKELETON"] = 8] = "INVALID_DATE_TIME_SKELETON";
    /** Exepct a number skeleton following the `::` (e.g. `{foo, number, ::}`) */
    ErrorKind[ErrorKind["EXPECT_NUMBER_SKELETON"] = 9] = "EXPECT_NUMBER_SKELETON";
    /** Exepct a date time skeleton following the `::` (e.g. `{foo, date, ::}`) */
    ErrorKind[ErrorKind["EXPECT_DATE_TIME_SKELETON"] = 10] = "EXPECT_DATE_TIME_SKELETON";
    /** Unmatched apostrophes in the argument style (e.g. `{foo, number, 'test`) */
    ErrorKind[ErrorKind["UNCLOSED_QUOTE_IN_ARGUMENT_STYLE"] = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE";
    /** Missing select argument options (e.g. `{foo, select}`) */
    ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_OPTIONS"] = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS";
    /** Expecting an offset value in `plural` or `selectordinal` argument (e.g `{foo, plural, offset}`) */
    ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE"] = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE";
    /** Offset value in `plural` or `selectordinal` is invalid (e.g. `{foo, plural, offset: x}`) */
    ErrorKind[ErrorKind["INVALID_PLURAL_ARGUMENT_OFFSET_VALUE"] = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE";
    /** Expecting a selector in `select` argument (e.g `{foo, select}`) */
    ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_SELECTOR"] = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR";
    /** Expecting a selector in `plural` or `selectordinal` argument (e.g `{foo, plural}`) */
    ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_SELECTOR"] = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR";
    /** Expecting a message fragment after the `select` selector (e.g. `{foo, select, apple}`) */
    ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT"] = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT";
    /**
     * Expecting a message fragment after the `plural` or `selectordinal` selector
     * (e.g. `{foo, plural, one}`)
     */
    ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT"] = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT";
    /** Selector in `plural` or `selectordinal` is malformed (e.g. `{foo, plural, =x {#}}`) */
    ErrorKind[ErrorKind["INVALID_PLURAL_ARGUMENT_SELECTOR"] = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR";
    /**
     * Duplicate selectors in `plural` or `selectordinal` argument.
     * (e.g. {foo, plural, one {#} one {#}})
     */
    ErrorKind[ErrorKind["DUPLICATE_PLURAL_ARGUMENT_SELECTOR"] = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR";
    /** Duplicate selectors in `select` argument.
     * (e.g. {foo, select, apple {apple} apple {apple}})
     */
    ErrorKind[ErrorKind["DUPLICATE_SELECT_ARGUMENT_SELECTOR"] = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR";
    /** Plural or select argument option must have `other` clause. */
    ErrorKind[ErrorKind["MISSING_OTHER_CLAUSE"] = 22] = "MISSING_OTHER_CLAUSE";
    /** The tag is malformed. (e.g. `<bold!>foo</bold!>) */
    ErrorKind[ErrorKind["INVALID_TAG"] = 23] = "INVALID_TAG";
    /** The tag name is invalid. (e.g. `<123>foo</123>`) */
    ErrorKind[ErrorKind["INVALID_TAG_NAME"] = 25] = "INVALID_TAG_NAME";
    /** The closing tag does not match the opening tag. (e.g. `<bold>foo</italic>`) */
    ErrorKind[ErrorKind["UNMATCHED_CLOSING_TAG"] = 26] = "UNMATCHED_CLOSING_TAG";
    /** The opening tag has unmatched closing tag. (e.g. `<bold>foo`) */
    ErrorKind[ErrorKind["UNCLOSED_TAG"] = 27] = "UNCLOSED_TAG";
})(ErrorKind || (ErrorKind = {}));


/***/ }),

/***/ "./node_modules/@formatjs/icu-messageformat-parser/lib/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@formatjs/icu-messageformat-parser/lib/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "SKELETON_TYPE": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.SKELETON_TYPE),
/* harmony export */   "TYPE": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.TYPE),
/* harmony export */   "createLiteralElement": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.createLiteralElement),
/* harmony export */   "createNumberElement": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.createNumberElement),
/* harmony export */   "isArgumentElement": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.isArgumentElement),
/* harmony export */   "isDateElement": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.isDateElement),
/* harmony export */   "isDateTimeSkeleton": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.isDateTimeSkeleton),
/* harmony export */   "isLiteralElement": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.isLiteralElement),
/* harmony export */   "isNumberElement": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.isNumberElement),
/* harmony export */   "isNumberSkeleton": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.isNumberSkeleton),
/* harmony export */   "isPluralElement": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.isPluralElement),
/* harmony export */   "isPoundElement": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.isPoundElement),
/* harmony export */   "isSelectElement": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.isSelectElement),
/* harmony export */   "isTagElement": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.isTagElement),
/* harmony export */   "isTimeElement": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.isTimeElement)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error */ "./node_modules/@formatjs/icu-messageformat-parser/lib/error.js");
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parser */ "./node_modules/@formatjs/icu-messageformat-parser/lib/parser.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./node_modules/@formatjs/icu-messageformat-parser/lib/types.js");




function pruneLocation(els) {
    els.forEach(function (el) {
        delete el.location;
        if ((0,_types__WEBPACK_IMPORTED_MODULE_2__.isSelectElement)(el) || (0,_types__WEBPACK_IMPORTED_MODULE_2__.isPluralElement)(el)) {
            for (var k in el.options) {
                delete el.options[k].location;
                pruneLocation(el.options[k].value);
            }
        }
        else if ((0,_types__WEBPACK_IMPORTED_MODULE_2__.isNumberElement)(el) && (0,_types__WEBPACK_IMPORTED_MODULE_2__.isNumberSkeleton)(el.style)) {
            delete el.style.location;
        }
        else if (((0,_types__WEBPACK_IMPORTED_MODULE_2__.isDateElement)(el) || (0,_types__WEBPACK_IMPORTED_MODULE_2__.isTimeElement)(el)) &&
            (0,_types__WEBPACK_IMPORTED_MODULE_2__.isDateTimeSkeleton)(el.style)) {
            delete el.style.location;
        }
        else if ((0,_types__WEBPACK_IMPORTED_MODULE_2__.isTagElement)(el)) {
            pruneLocation(el.children);
        }
    });
}
function parse(message, opts) {
    if (opts === void 0) { opts = {}; }
    opts = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({ shouldParseSkeletons: true, requiresOtherClause: true }, opts);
    var result = new _parser__WEBPACK_IMPORTED_MODULE_1__.Parser(message, opts).parse();
    if (result.err) {
        var error = SyntaxError(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind[result.err.kind]);
        // @ts-expect-error Assign to error object
        error.location = result.err.location;
        // @ts-expect-error Assign to error object
        error.originalMessage = result.err.message;
        throw error;
    }
    if (!(opts === null || opts === void 0 ? void 0 : opts.captureLocation)) {
        pruneLocation(result.val);
    }
    return result.val;
}



/***/ }),

/***/ "./node_modules/@formatjs/icu-messageformat-parser/lib/parser.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@formatjs/icu-messageformat-parser/lib/parser.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Parser": () => (/* binding */ Parser)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error */ "./node_modules/@formatjs/icu-messageformat-parser/lib/error.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./node_modules/@formatjs/icu-messageformat-parser/lib/types.js");
/* harmony import */ var _regex_generated__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./regex.generated */ "./node_modules/@formatjs/icu-messageformat-parser/lib/regex.generated.js");
/* harmony import */ var _formatjs_icu_skeleton_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @formatjs/icu-skeleton-parser */ "./node_modules/@formatjs/icu-skeleton-parser/lib/index.js");
var _a;





var SPACE_SEPARATOR_START_REGEX = new RegExp("^" + _regex_generated__WEBPACK_IMPORTED_MODULE_2__.SPACE_SEPARATOR_REGEX.source + "*");
var SPACE_SEPARATOR_END_REGEX = new RegExp(_regex_generated__WEBPACK_IMPORTED_MODULE_2__.SPACE_SEPARATOR_REGEX.source + "*$");
function createLocation(start, end) {
    return { start: start, end: end };
}
// #region Ponyfills
// Consolidate these variables up top for easier toggling during debugging
var hasNativeStartsWith = !!String.prototype.startsWith;
var hasNativeFromCodePoint = !!String.fromCodePoint;
var hasNativeFromEntries = !!Object.fromEntries;
var hasNativeCodePointAt = !!String.prototype.codePointAt;
var hasTrimStart = !!String.prototype.trimStart;
var hasTrimEnd = !!String.prototype.trimEnd;
var hasNativeIsSafeInteger = !!Number.isSafeInteger;
var isSafeInteger = hasNativeIsSafeInteger
    ? Number.isSafeInteger
    : function (n) {
        return (typeof n === 'number' &&
            isFinite(n) &&
            Math.floor(n) === n &&
            Math.abs(n) <= 0x1fffffffffffff);
    };
// IE11 does not support y and u.
var REGEX_SUPPORTS_U_AND_Y = true;
try {
    var re = RE('([^\\p{White_Space}\\p{Pattern_Syntax}]*)', 'yu');
    /**
     * legacy Edge or Xbox One browser
     * Unicode flag support: supported
     * Pattern_Syntax support: not supported
     * See https://github.com/formatjs/formatjs/issues/2822
     */
    REGEX_SUPPORTS_U_AND_Y = ((_a = re.exec('a')) === null || _a === void 0 ? void 0 : _a[0]) === 'a';
}
catch (_) {
    REGEX_SUPPORTS_U_AND_Y = false;
}
var startsWith = hasNativeStartsWith
    ? // Native
        function startsWith(s, search, position) {
            return s.startsWith(search, position);
        }
    : // For IE11
        function startsWith(s, search, position) {
            return s.slice(position, position + search.length) === search;
        };
var fromCodePoint = hasNativeFromCodePoint
    ? String.fromCodePoint
    : // IE11
        function fromCodePoint() {
            var codePoints = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                codePoints[_i] = arguments[_i];
            }
            var elements = '';
            var length = codePoints.length;
            var i = 0;
            var code;
            while (length > i) {
                code = codePoints[i++];
                if (code > 0x10ffff)
                    throw RangeError(code + ' is not a valid code point');
                elements +=
                    code < 0x10000
                        ? String.fromCharCode(code)
                        : String.fromCharCode(((code -= 0x10000) >> 10) + 0xd800, (code % 0x400) + 0xdc00);
            }
            return elements;
        };
var fromEntries = 
// native
hasNativeFromEntries
    ? Object.fromEntries
    : // Ponyfill
        function fromEntries(entries) {
            var obj = {};
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var _a = entries_1[_i], k = _a[0], v = _a[1];
                obj[k] = v;
            }
            return obj;
        };
var codePointAt = hasNativeCodePointAt
    ? // Native
        function codePointAt(s, index) {
            return s.codePointAt(index);
        }
    : // IE 11
        function codePointAt(s, index) {
            var size = s.length;
            if (index < 0 || index >= size) {
                return undefined;
            }
            var first = s.charCodeAt(index);
            var second;
            return first < 0xd800 ||
                first > 0xdbff ||
                index + 1 === size ||
                (second = s.charCodeAt(index + 1)) < 0xdc00 ||
                second > 0xdfff
                ? first
                : ((first - 0xd800) << 10) + (second - 0xdc00) + 0x10000;
        };
var trimStart = hasTrimStart
    ? // Native
        function trimStart(s) {
            return s.trimStart();
        }
    : // Ponyfill
        function trimStart(s) {
            return s.replace(SPACE_SEPARATOR_START_REGEX, '');
        };
var trimEnd = hasTrimEnd
    ? // Native
        function trimEnd(s) {
            return s.trimEnd();
        }
    : // Ponyfill
        function trimEnd(s) {
            return s.replace(SPACE_SEPARATOR_END_REGEX, '');
        };
// Prevent minifier to translate new RegExp to literal form that might cause syntax error on IE11.
function RE(s, flag) {
    return new RegExp(s, flag);
}
// #endregion
var matchIdentifierAtIndex;
if (REGEX_SUPPORTS_U_AND_Y) {
    // Native
    var IDENTIFIER_PREFIX_RE_1 = RE('([^\\p{White_Space}\\p{Pattern_Syntax}]*)', 'yu');
    matchIdentifierAtIndex = function matchIdentifierAtIndex(s, index) {
        var _a;
        IDENTIFIER_PREFIX_RE_1.lastIndex = index;
        var match = IDENTIFIER_PREFIX_RE_1.exec(s);
        return (_a = match[1]) !== null && _a !== void 0 ? _a : '';
    };
}
else {
    // IE11
    matchIdentifierAtIndex = function matchIdentifierAtIndex(s, index) {
        var match = [];
        while (true) {
            var c = codePointAt(s, index);
            if (c === undefined || _isWhiteSpace(c) || _isPatternSyntax(c)) {
                break;
            }
            match.push(c);
            index += c >= 0x10000 ? 2 : 1;
        }
        return fromCodePoint.apply(void 0, match);
    };
}
var Parser = /** @class */ (function () {
    function Parser(message, options) {
        if (options === void 0) { options = {}; }
        this.message = message;
        this.position = { offset: 0, line: 1, column: 1 };
        this.ignoreTag = !!options.ignoreTag;
        this.requiresOtherClause = !!options.requiresOtherClause;
        this.shouldParseSkeletons = !!options.shouldParseSkeletons;
    }
    Parser.prototype.parse = function () {
        if (this.offset() !== 0) {
            throw Error('parser can only be used once');
        }
        return this.parseMessage(0, '', false);
    };
    Parser.prototype.parseMessage = function (nestingLevel, parentArgType, expectingCloseTag) {
        var elements = [];
        while (!this.isEOF()) {
            var char = this.char();
            if (char === 123 /* `{` */) {
                var result = this.parseArgument(nestingLevel, expectingCloseTag);
                if (result.err) {
                    return result;
                }
                elements.push(result.val);
            }
            else if (char === 125 /* `}` */ && nestingLevel > 0) {
                break;
            }
            else if (char === 35 /* `#` */ &&
                (parentArgType === 'plural' || parentArgType === 'selectordinal')) {
                var position = this.clonePosition();
                this.bump();
                elements.push({
                    type: _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.pound,
                    location: createLocation(position, this.clonePosition()),
                });
            }
            else if (char === 60 /* `<` */ &&
                !this.ignoreTag &&
                this.peek() === 47 // char code for '/'
            ) {
                if (expectingCloseTag) {
                    break;
                }
                else {
                    return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(this.clonePosition(), this.clonePosition()));
                }
            }
            else if (char === 60 /* `<` */ &&
                !this.ignoreTag &&
                _isAlpha(this.peek() || 0)) {
                var result = this.parseTag(nestingLevel, parentArgType);
                if (result.err) {
                    return result;
                }
                elements.push(result.val);
            }
            else {
                var result = this.parseLiteral(nestingLevel, parentArgType);
                if (result.err) {
                    return result;
                }
                elements.push(result.val);
            }
        }
        return { val: elements, err: null };
    };
    /**
     * A tag name must start with an ASCII lower/upper case letter. The grammar is based on the
     * [custom element name][] except that a dash is NOT always mandatory and uppercase letters
     * are accepted:
     *
     * ```
     * tag ::= "<" tagName (whitespace)* "/>" | "<" tagName (whitespace)* ">" message "</" tagName (whitespace)* ">"
     * tagName ::= [a-z] (PENChar)*
     * PENChar ::=
     *     "-" | "." | [0-9] | "_" | [a-z] | [A-Z] | #xB7 | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x37D] |
     *     [#x37F-#x1FFF] | [#x200C-#x200D] | [#x203F-#x2040] | [#x2070-#x218F] | [#x2C00-#x2FEF] |
     *     [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
     * ```
     *
     * [custom element name]: https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
     * NOTE: We're a bit more lax here since HTML technically does not allow uppercase HTML element but we do
     * since other tag-based engines like React allow it
     */
    Parser.prototype.parseTag = function (nestingLevel, parentArgType) {
        var startPosition = this.clonePosition();
        this.bump(); // `<`
        var tagName = this.parseTagName();
        this.bumpSpace();
        if (this.bumpIf('/>')) {
            // Self closing tag
            return {
                val: {
                    type: _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.literal,
                    value: "<" + tagName + "/>",
                    location: createLocation(startPosition, this.clonePosition()),
                },
                err: null,
            };
        }
        else if (this.bumpIf('>')) {
            var childrenResult = this.parseMessage(nestingLevel + 1, parentArgType, true);
            if (childrenResult.err) {
                return childrenResult;
            }
            var children = childrenResult.val;
            // Expecting a close tag
            var endTagStartPosition = this.clonePosition();
            if (this.bumpIf('</')) {
                if (this.isEOF() || !_isAlpha(this.char())) {
                    return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
                }
                var closingTagNameStartPosition = this.clonePosition();
                var closingTagName = this.parseTagName();
                if (tagName !== closingTagName) {
                    return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(closingTagNameStartPosition, this.clonePosition()));
                }
                this.bumpSpace();
                if (!this.bumpIf('>')) {
                    return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
                }
                return {
                    val: {
                        type: _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.tag,
                        value: tagName,
                        children: children,
                        location: createLocation(startPosition, this.clonePosition()),
                    },
                    err: null,
                };
            }
            else {
                return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.UNCLOSED_TAG, createLocation(startPosition, this.clonePosition()));
            }
        }
        else {
            return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.INVALID_TAG, createLocation(startPosition, this.clonePosition()));
        }
    };
    /**
     * This method assumes that the caller has peeked ahead for the first tag character.
     */
    Parser.prototype.parseTagName = function () {
        var startOffset = this.offset();
        this.bump(); // the first tag name character
        while (!this.isEOF() && _isPotentialElementNameChar(this.char())) {
            this.bump();
        }
        return this.message.slice(startOffset, this.offset());
    };
    Parser.prototype.parseLiteral = function (nestingLevel, parentArgType) {
        var start = this.clonePosition();
        var value = '';
        while (true) {
            var parseQuoteResult = this.tryParseQuote(parentArgType);
            if (parseQuoteResult) {
                value += parseQuoteResult;
                continue;
            }
            var parseUnquotedResult = this.tryParseUnquoted(nestingLevel, parentArgType);
            if (parseUnquotedResult) {
                value += parseUnquotedResult;
                continue;
            }
            var parseLeftAngleResult = this.tryParseLeftAngleBracket();
            if (parseLeftAngleResult) {
                value += parseLeftAngleResult;
                continue;
            }
            break;
        }
        var location = createLocation(start, this.clonePosition());
        return {
            val: { type: _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.literal, value: value, location: location },
            err: null,
        };
    };
    Parser.prototype.tryParseLeftAngleBracket = function () {
        if (!this.isEOF() &&
            this.char() === 60 /* `<` */ &&
            (this.ignoreTag ||
                // If at the opening tag or closing tag position, bail.
                !_isAlphaOrSlash(this.peek() || 0))) {
            this.bump(); // `<`
            return '<';
        }
        return null;
    };
    /**
     * Starting with ICU 4.8, an ASCII apostrophe only starts quoted text if it immediately precedes
     * a character that requires quoting (that is, "only where needed"), and works the same in
     * nested messages as on the top level of the pattern. The new behavior is otherwise compatible.
     */
    Parser.prototype.tryParseQuote = function (parentArgType) {
        if (this.isEOF() || this.char() !== 39 /* `'` */) {
            return null;
        }
        // Parse escaped char following the apostrophe, or early return if there is no escaped char.
        // Check if is valid escaped character
        switch (this.peek()) {
            case 39 /* `'` */:
                // double quote, should return as a single quote.
                this.bump();
                this.bump();
                return "'";
            // '{', '<', '>', '}'
            case 123:
            case 60:
            case 62:
            case 125:
                break;
            case 35: // '#'
                if (parentArgType === 'plural' || parentArgType === 'selectordinal') {
                    break;
                }
                return null;
            default:
                return null;
        }
        this.bump(); // apostrophe
        var codePoints = [this.char()]; // escaped char
        this.bump();
        // read chars until the optional closing apostrophe is found
        while (!this.isEOF()) {
            var ch = this.char();
            if (ch === 39 /* `'` */) {
                if (this.peek() === 39 /* `'` */) {
                    codePoints.push(39);
                    // Bump one more time because we need to skip 2 characters.
                    this.bump();
                }
                else {
                    // Optional closing apostrophe.
                    this.bump();
                    break;
                }
            }
            else {
                codePoints.push(ch);
            }
            this.bump();
        }
        return fromCodePoint.apply(void 0, codePoints);
    };
    Parser.prototype.tryParseUnquoted = function (nestingLevel, parentArgType) {
        if (this.isEOF()) {
            return null;
        }
        var ch = this.char();
        if (ch === 60 /* `<` */ ||
            ch === 123 /* `{` */ ||
            (ch === 35 /* `#` */ &&
                (parentArgType === 'plural' || parentArgType === 'selectordinal')) ||
            (ch === 125 /* `}` */ && nestingLevel > 0)) {
            return null;
        }
        else {
            this.bump();
            return fromCodePoint(ch);
        }
    };
    Parser.prototype.parseArgument = function (nestingLevel, expectingCloseTag) {
        var openingBracePosition = this.clonePosition();
        this.bump(); // `{`
        this.bumpSpace();
        if (this.isEOF()) {
            return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        if (this.char() === 125 /* `}` */) {
            this.bump();
            return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EMPTY_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
        // argument name
        var value = this.parseIdentifierIfPossible().value;
        if (!value) {
            return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
        this.bumpSpace();
        if (this.isEOF()) {
            return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        switch (this.char()) {
            // Simple argument: `{name}`
            case 125 /* `}` */: {
                this.bump(); // `}`
                return {
                    val: {
                        type: _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.argument,
                        // value does not include the opening and closing braces.
                        value: value,
                        location: createLocation(openingBracePosition, this.clonePosition()),
                    },
                    err: null,
                };
            }
            // Argument with options: `{name, format, ...}`
            case 44 /* `,` */: {
                this.bump(); // `,`
                this.bumpSpace();
                if (this.isEOF()) {
                    return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
                }
                return this.parseArgumentOptions(nestingLevel, expectingCloseTag, value, openingBracePosition);
            }
            default:
                return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
    };
    /**
     * Advance the parser until the end of the identifier, if it is currently on
     * an identifier character. Return an empty string otherwise.
     */
    Parser.prototype.parseIdentifierIfPossible = function () {
        var startingPosition = this.clonePosition();
        var startOffset = this.offset();
        var value = matchIdentifierAtIndex(this.message, startOffset);
        var endOffset = startOffset + value.length;
        this.bumpTo(endOffset);
        var endPosition = this.clonePosition();
        var location = createLocation(startingPosition, endPosition);
        return { value: value, location: location };
    };
    Parser.prototype.parseArgumentOptions = function (nestingLevel, expectingCloseTag, value, openingBracePosition) {
        var _a;
        // Parse this range:
        // {name, type, style}
        //        ^---^
        var typeStartPosition = this.clonePosition();
        var argType = this.parseIdentifierIfPossible().value;
        var typeEndPosition = this.clonePosition();
        switch (argType) {
            case '':
                // Expecting a style string number, date, time, plural, selectordinal, or select.
                return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
            case 'number':
            case 'date':
            case 'time': {
                // Parse this range:
                // {name, number, style}
                //              ^-------^
                this.bumpSpace();
                var styleAndLocation = null;
                if (this.bumpIf(',')) {
                    this.bumpSpace();
                    var styleStartPosition = this.clonePosition();
                    var result = this.parseSimpleArgStyleIfPossible();
                    if (result.err) {
                        return result;
                    }
                    var style = trimEnd(result.val);
                    if (style.length === 0) {
                        return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_ARGUMENT_STYLE, createLocation(this.clonePosition(), this.clonePosition()));
                    }
                    var styleLocation = createLocation(styleStartPosition, this.clonePosition());
                    styleAndLocation = { style: style, styleLocation: styleLocation };
                }
                var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
                if (argCloseResult.err) {
                    return argCloseResult;
                }
                var location_1 = createLocation(openingBracePosition, this.clonePosition());
                // Extract style or skeleton
                if (styleAndLocation && startsWith(styleAndLocation === null || styleAndLocation === void 0 ? void 0 : styleAndLocation.style, '::', 0)) {
                    // Skeleton starts with `::`.
                    var skeleton = trimStart(styleAndLocation.style.slice(2));
                    if (argType === 'number') {
                        var result = this.parseNumberSkeletonFromString(skeleton, styleAndLocation.styleLocation);
                        if (result.err) {
                            return result;
                        }
                        return {
                            val: { type: _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.number, value: value, location: location_1, style: result.val },
                            err: null,
                        };
                    }
                    else {
                        if (skeleton.length === 0) {
                            return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_DATE_TIME_SKELETON, location_1);
                        }
                        var style = {
                            type: _types__WEBPACK_IMPORTED_MODULE_1__.SKELETON_TYPE.dateTime,
                            pattern: skeleton,
                            location: styleAndLocation.styleLocation,
                            parsedOptions: this.shouldParseSkeletons
                                ? (0,_formatjs_icu_skeleton_parser__WEBPACK_IMPORTED_MODULE_3__.parseDateTimeSkeleton)(skeleton)
                                : {},
                        };
                        var type = argType === 'date' ? _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.date : _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.time;
                        return {
                            val: { type: type, value: value, location: location_1, style: style },
                            err: null,
                        };
                    }
                }
                // Regular style or no style.
                return {
                    val: {
                        type: argType === 'number'
                            ? _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.number
                            : argType === 'date'
                                ? _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.date
                                : _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.time,
                        value: value,
                        location: location_1,
                        style: (_a = styleAndLocation === null || styleAndLocation === void 0 ? void 0 : styleAndLocation.style) !== null && _a !== void 0 ? _a : null,
                    },
                    err: null,
                };
            }
            case 'plural':
            case 'selectordinal':
            case 'select': {
                // Parse this range:
                // {name, plural, options}
                //              ^---------^
                var typeEndPosition_1 = this.clonePosition();
                this.bumpSpace();
                if (!this.bumpIf(',')) {
                    return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_SELECT_ARGUMENT_OPTIONS, createLocation(typeEndPosition_1, (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({}, typeEndPosition_1)));
                }
                this.bumpSpace();
                // Parse offset:
                // {name, plural, offset:1, options}
                //                ^-----^
                //
                // or the first option:
                //
                // {name, plural, one {...} other {...}}
                //                ^--^
                var identifierAndLocation = this.parseIdentifierIfPossible();
                var pluralOffset = 0;
                if (argType !== 'select' && identifierAndLocation.value === 'offset') {
                    if (!this.bumpIf(':')) {
                        return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, createLocation(this.clonePosition(), this.clonePosition()));
                    }
                    this.bumpSpace();
                    var result = this.tryParseDecimalInteger(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, _error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
                    if (result.err) {
                        return result;
                    }
                    // Parse another identifier for option parsing
                    this.bumpSpace();
                    identifierAndLocation = this.parseIdentifierIfPossible();
                    pluralOffset = result.val;
                }
                var optionsResult = this.tryParsePluralOrSelectOptions(nestingLevel, argType, expectingCloseTag, identifierAndLocation);
                if (optionsResult.err) {
                    return optionsResult;
                }
                var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
                if (argCloseResult.err) {
                    return argCloseResult;
                }
                var location_2 = createLocation(openingBracePosition, this.clonePosition());
                if (argType === 'select') {
                    return {
                        val: {
                            type: _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.select,
                            value: value,
                            options: fromEntries(optionsResult.val),
                            location: location_2,
                        },
                        err: null,
                    };
                }
                else {
                    return {
                        val: {
                            type: _types__WEBPACK_IMPORTED_MODULE_1__.TYPE.plural,
                            value: value,
                            options: fromEntries(optionsResult.val),
                            offset: pluralOffset,
                            pluralType: argType === 'plural' ? 'cardinal' : 'ordinal',
                            location: location_2,
                        },
                        err: null,
                    };
                }
            }
            default:
                return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.INVALID_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
        }
    };
    Parser.prototype.tryParseArgumentClose = function (openingBracePosition) {
        // Parse: {value, number, ::currency/GBP }
        //
        if (this.isEOF() || this.char() !== 125 /* `}` */) {
            return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        this.bump(); // `}`
        return { val: true, err: null };
    };
    /**
     * See: https://github.com/unicode-org/icu/blob/af7ed1f6d2298013dc303628438ec4abe1f16479/icu4c/source/common/messagepattern.cpp#L659
     */
    Parser.prototype.parseSimpleArgStyleIfPossible = function () {
        var nestedBraces = 0;
        var startPosition = this.clonePosition();
        while (!this.isEOF()) {
            var ch = this.char();
            switch (ch) {
                case 39 /* `'` */: {
                    // Treat apostrophe as quoting but include it in the style part.
                    // Find the end of the quoted literal text.
                    this.bump();
                    var apostrophePosition = this.clonePosition();
                    if (!this.bumpUntil("'")) {
                        return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, createLocation(apostrophePosition, this.clonePosition()));
                    }
                    this.bump();
                    break;
                }
                case 123 /* `{` */: {
                    nestedBraces += 1;
                    this.bump();
                    break;
                }
                case 125 /* `}` */: {
                    if (nestedBraces > 0) {
                        nestedBraces -= 1;
                    }
                    else {
                        return {
                            val: this.message.slice(startPosition.offset, this.offset()),
                            err: null,
                        };
                    }
                    break;
                }
                default:
                    this.bump();
                    break;
            }
        }
        return {
            val: this.message.slice(startPosition.offset, this.offset()),
            err: null,
        };
    };
    Parser.prototype.parseNumberSkeletonFromString = function (skeleton, location) {
        var tokens = [];
        try {
            tokens = (0,_formatjs_icu_skeleton_parser__WEBPACK_IMPORTED_MODULE_3__.parseNumberSkeletonFromString)(skeleton);
        }
        catch (e) {
            return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.INVALID_NUMBER_SKELETON, location);
        }
        return {
            val: {
                type: _types__WEBPACK_IMPORTED_MODULE_1__.SKELETON_TYPE.number,
                tokens: tokens,
                location: location,
                parsedOptions: this.shouldParseSkeletons
                    ? (0,_formatjs_icu_skeleton_parser__WEBPACK_IMPORTED_MODULE_3__.parseNumberSkeleton)(tokens)
                    : {},
            },
            err: null,
        };
    };
    /**
     * @param nesting_level The current nesting level of messages.
     *     This can be positive when parsing message fragment in select or plural argument options.
     * @param parent_arg_type The parent argument's type.
     * @param parsed_first_identifier If provided, this is the first identifier-like selector of
     *     the argument. It is a by-product of a previous parsing attempt.
     * @param expecting_close_tag If true, this message is directly or indirectly nested inside
     *     between a pair of opening and closing tags. The nested message will not parse beyond
     *     the closing tag boundary.
     */
    Parser.prototype.tryParsePluralOrSelectOptions = function (nestingLevel, parentArgType, expectCloseTag, parsedFirstIdentifier) {
        var _a;
        var hasOtherClause = false;
        var options = [];
        var parsedSelectors = new Set();
        var selector = parsedFirstIdentifier.value, selectorLocation = parsedFirstIdentifier.location;
        // Parse:
        // one {one apple}
        // ^--^
        while (true) {
            if (selector.length === 0) {
                var startPosition = this.clonePosition();
                if (parentArgType !== 'select' && this.bumpIf('=')) {
                    // Try parse `={number}` selector
                    var result = this.tryParseDecimalInteger(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, _error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.INVALID_PLURAL_ARGUMENT_SELECTOR);
                    if (result.err) {
                        return result;
                    }
                    selectorLocation = createLocation(startPosition, this.clonePosition());
                    selector = this.message.slice(startPosition.offset, this.offset());
                }
                else {
                    break;
                }
            }
            // Duplicate selector clauses
            if (parsedSelectors.has(selector)) {
                return this.error(parentArgType === 'select'
                    ? _error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.DUPLICATE_SELECT_ARGUMENT_SELECTOR
                    : _error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, selectorLocation);
            }
            if (selector === 'other') {
                hasOtherClause = true;
            }
            // Parse:
            // one {one apple}
            //     ^----------^
            this.bumpSpace();
            var openingBracePosition = this.clonePosition();
            if (!this.bumpIf('{')) {
                return this.error(parentArgType === 'select'
                    ? _error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT
                    : _error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, createLocation(this.clonePosition(), this.clonePosition()));
            }
            var fragmentResult = this.parseMessage(nestingLevel + 1, parentArgType, expectCloseTag);
            if (fragmentResult.err) {
                return fragmentResult;
            }
            var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
            if (argCloseResult.err) {
                return argCloseResult;
            }
            options.push([
                selector,
                {
                    value: fragmentResult.val,
                    location: createLocation(openingBracePosition, this.clonePosition()),
                },
            ]);
            // Keep track of the existing selectors
            parsedSelectors.add(selector);
            // Prep next selector clause.
            this.bumpSpace();
            (_a = this.parseIdentifierIfPossible(), selector = _a.value, selectorLocation = _a.location);
        }
        if (options.length === 0) {
            return this.error(parentArgType === 'select'
                ? _error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR
                : _error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, createLocation(this.clonePosition(), this.clonePosition()));
        }
        if (this.requiresOtherClause && !hasOtherClause) {
            return this.error(_error__WEBPACK_IMPORTED_MODULE_0__.ErrorKind.MISSING_OTHER_CLAUSE, createLocation(this.clonePosition(), this.clonePosition()));
        }
        return { val: options, err: null };
    };
    Parser.prototype.tryParseDecimalInteger = function (expectNumberError, invalidNumberError) {
        var sign = 1;
        var startingPosition = this.clonePosition();
        if (this.bumpIf('+')) {
        }
        else if (this.bumpIf('-')) {
            sign = -1;
        }
        var hasDigits = false;
        var decimal = 0;
        while (!this.isEOF()) {
            var ch = this.char();
            if (ch >= 48 /* `0` */ && ch <= 57 /* `9` */) {
                hasDigits = true;
                decimal = decimal * 10 + (ch - 48);
                this.bump();
            }
            else {
                break;
            }
        }
        var location = createLocation(startingPosition, this.clonePosition());
        if (!hasDigits) {
            return this.error(expectNumberError, location);
        }
        decimal *= sign;
        if (!isSafeInteger(decimal)) {
            return this.error(invalidNumberError, location);
        }
        return { val: decimal, err: null };
    };
    Parser.prototype.offset = function () {
        return this.position.offset;
    };
    Parser.prototype.isEOF = function () {
        return this.offset() === this.message.length;
    };
    Parser.prototype.clonePosition = function () {
        // This is much faster than `Object.assign` or spread.
        return {
            offset: this.position.offset,
            line: this.position.line,
            column: this.position.column,
        };
    };
    /**
     * Return the code point at the current position of the parser.
     * Throws if the index is out of bound.
     */
    Parser.prototype.char = function () {
        var offset = this.position.offset;
        if (offset >= this.message.length) {
            throw Error('out of bound');
        }
        var code = codePointAt(this.message, offset);
        if (code === undefined) {
            throw Error("Offset " + offset + " is at invalid UTF-16 code unit boundary");
        }
        return code;
    };
    Parser.prototype.error = function (kind, location) {
        return {
            val: null,
            err: {
                kind: kind,
                message: this.message,
                location: location,
            },
        };
    };
    /** Bump the parser to the next UTF-16 code unit. */
    Parser.prototype.bump = function () {
        if (this.isEOF()) {
            return;
        }
        var code = this.char();
        if (code === 10 /* '\n' */) {
            this.position.line += 1;
            this.position.column = 1;
            this.position.offset += 1;
        }
        else {
            this.position.column += 1;
            // 0 ~ 0x10000 -> unicode BMP, otherwise skip the surrogate pair.
            this.position.offset += code < 0x10000 ? 1 : 2;
        }
    };
    /**
     * If the substring starting at the current position of the parser has
     * the given prefix, then bump the parser to the character immediately
     * following the prefix and return true. Otherwise, don't bump the parser
     * and return false.
     */
    Parser.prototype.bumpIf = function (prefix) {
        if (startsWith(this.message, prefix, this.offset())) {
            for (var i = 0; i < prefix.length; i++) {
                this.bump();
            }
            return true;
        }
        return false;
    };
    /**
     * Bump the parser until the pattern character is found and return `true`.
     * Otherwise bump to the end of the file and return `false`.
     */
    Parser.prototype.bumpUntil = function (pattern) {
        var currentOffset = this.offset();
        var index = this.message.indexOf(pattern, currentOffset);
        if (index >= 0) {
            this.bumpTo(index);
            return true;
        }
        else {
            this.bumpTo(this.message.length);
            return false;
        }
    };
    /**
     * Bump the parser to the target offset.
     * If target offset is beyond the end of the input, bump the parser to the end of the input.
     */
    Parser.prototype.bumpTo = function (targetOffset) {
        if (this.offset() > targetOffset) {
            throw Error("targetOffset " + targetOffset + " must be greater than or equal to the current offset " + this.offset());
        }
        targetOffset = Math.min(targetOffset, this.message.length);
        while (true) {
            var offset = this.offset();
            if (offset === targetOffset) {
                break;
            }
            if (offset > targetOffset) {
                throw Error("targetOffset " + targetOffset + " is at invalid UTF-16 code unit boundary");
            }
            this.bump();
            if (this.isEOF()) {
                break;
            }
        }
    };
    /** advance the parser through all whitespace to the next non-whitespace code unit. */
    Parser.prototype.bumpSpace = function () {
        while (!this.isEOF() && _isWhiteSpace(this.char())) {
            this.bump();
        }
    };
    /**
     * Peek at the *next* Unicode codepoint in the input without advancing the parser.
     * If the input has been exhausted, then this returns null.
     */
    Parser.prototype.peek = function () {
        if (this.isEOF()) {
            return null;
        }
        var code = this.char();
        var offset = this.offset();
        var nextCode = this.message.charCodeAt(offset + (code >= 0x10000 ? 2 : 1));
        return nextCode !== null && nextCode !== void 0 ? nextCode : null;
    };
    return Parser;
}());

/**
 * This check if codepoint is alphabet (lower & uppercase)
 * @param codepoint
 * @returns
 */
function _isAlpha(codepoint) {
    return ((codepoint >= 97 && codepoint <= 122) ||
        (codepoint >= 65 && codepoint <= 90));
}
function _isAlphaOrSlash(codepoint) {
    return _isAlpha(codepoint) || codepoint === 47; /* '/' */
}
/** See `parseTag` function docs. */
function _isPotentialElementNameChar(c) {
    return (c === 45 /* '-' */ ||
        c === 46 /* '.' */ ||
        (c >= 48 && c <= 57) /* 0..9 */ ||
        c === 95 /* '_' */ ||
        (c >= 97 && c <= 122) /** a..z */ ||
        (c >= 65 && c <= 90) /* A..Z */ ||
        c == 0xb7 ||
        (c >= 0xc0 && c <= 0xd6) ||
        (c >= 0xd8 && c <= 0xf6) ||
        (c >= 0xf8 && c <= 0x37d) ||
        (c >= 0x37f && c <= 0x1fff) ||
        (c >= 0x200c && c <= 0x200d) ||
        (c >= 0x203f && c <= 0x2040) ||
        (c >= 0x2070 && c <= 0x218f) ||
        (c >= 0x2c00 && c <= 0x2fef) ||
        (c >= 0x3001 && c <= 0xd7ff) ||
        (c >= 0xf900 && c <= 0xfdcf) ||
        (c >= 0xfdf0 && c <= 0xfffd) ||
        (c >= 0x10000 && c <= 0xeffff));
}
/**
 * Code point equivalent of regex `\p{White_Space}`.
 * From: https://www.unicode.org/Public/UCD/latest/ucd/PropList.txt
 */
function _isWhiteSpace(c) {
    return ((c >= 0x0009 && c <= 0x000d) ||
        c === 0x0020 ||
        c === 0x0085 ||
        (c >= 0x200e && c <= 0x200f) ||
        c === 0x2028 ||
        c === 0x2029);
}
/**
 * Code point equivalent of regex `\p{Pattern_Syntax}`.
 * See https://www.unicode.org/Public/UCD/latest/ucd/PropList.txt
 */
function _isPatternSyntax(c) {
    return ((c >= 0x0021 && c <= 0x0023) ||
        c === 0x0024 ||
        (c >= 0x0025 && c <= 0x0027) ||
        c === 0x0028 ||
        c === 0x0029 ||
        c === 0x002a ||
        c === 0x002b ||
        c === 0x002c ||
        c === 0x002d ||
        (c >= 0x002e && c <= 0x002f) ||
        (c >= 0x003a && c <= 0x003b) ||
        (c >= 0x003c && c <= 0x003e) ||
        (c >= 0x003f && c <= 0x0040) ||
        c === 0x005b ||
        c === 0x005c ||
        c === 0x005d ||
        c === 0x005e ||
        c === 0x0060 ||
        c === 0x007b ||
        c === 0x007c ||
        c === 0x007d ||
        c === 0x007e ||
        c === 0x00a1 ||
        (c >= 0x00a2 && c <= 0x00a5) ||
        c === 0x00a6 ||
        c === 0x00a7 ||
        c === 0x00a9 ||
        c === 0x00ab ||
        c === 0x00ac ||
        c === 0x00ae ||
        c === 0x00b0 ||
        c === 0x00b1 ||
        c === 0x00b6 ||
        c === 0x00bb ||
        c === 0x00bf ||
        c === 0x00d7 ||
        c === 0x00f7 ||
        (c >= 0x2010 && c <= 0x2015) ||
        (c >= 0x2016 && c <= 0x2017) ||
        c === 0x2018 ||
        c === 0x2019 ||
        c === 0x201a ||
        (c >= 0x201b && c <= 0x201c) ||
        c === 0x201d ||
        c === 0x201e ||
        c === 0x201f ||
        (c >= 0x2020 && c <= 0x2027) ||
        (c >= 0x2030 && c <= 0x2038) ||
        c === 0x2039 ||
        c === 0x203a ||
        (c >= 0x203b && c <= 0x203e) ||
        (c >= 0x2041 && c <= 0x2043) ||
        c === 0x2044 ||
        c === 0x2045 ||
        c === 0x2046 ||
        (c >= 0x2047 && c <= 0x2051) ||
        c === 0x2052 ||
        c === 0x2053 ||
        (c >= 0x2055 && c <= 0x205e) ||
        (c >= 0x2190 && c <= 0x2194) ||
        (c >= 0x2195 && c <= 0x2199) ||
        (c >= 0x219a && c <= 0x219b) ||
        (c >= 0x219c && c <= 0x219f) ||
        c === 0x21a0 ||
        (c >= 0x21a1 && c <= 0x21a2) ||
        c === 0x21a3 ||
        (c >= 0x21a4 && c <= 0x21a5) ||
        c === 0x21a6 ||
        (c >= 0x21a7 && c <= 0x21ad) ||
        c === 0x21ae ||
        (c >= 0x21af && c <= 0x21cd) ||
        (c >= 0x21ce && c <= 0x21cf) ||
        (c >= 0x21d0 && c <= 0x21d1) ||
        c === 0x21d2 ||
        c === 0x21d3 ||
        c === 0x21d4 ||
        (c >= 0x21d5 && c <= 0x21f3) ||
        (c >= 0x21f4 && c <= 0x22ff) ||
        (c >= 0x2300 && c <= 0x2307) ||
        c === 0x2308 ||
        c === 0x2309 ||
        c === 0x230a ||
        c === 0x230b ||
        (c >= 0x230c && c <= 0x231f) ||
        (c >= 0x2320 && c <= 0x2321) ||
        (c >= 0x2322 && c <= 0x2328) ||
        c === 0x2329 ||
        c === 0x232a ||
        (c >= 0x232b && c <= 0x237b) ||
        c === 0x237c ||
        (c >= 0x237d && c <= 0x239a) ||
        (c >= 0x239b && c <= 0x23b3) ||
        (c >= 0x23b4 && c <= 0x23db) ||
        (c >= 0x23dc && c <= 0x23e1) ||
        (c >= 0x23e2 && c <= 0x2426) ||
        (c >= 0x2427 && c <= 0x243f) ||
        (c >= 0x2440 && c <= 0x244a) ||
        (c >= 0x244b && c <= 0x245f) ||
        (c >= 0x2500 && c <= 0x25b6) ||
        c === 0x25b7 ||
        (c >= 0x25b8 && c <= 0x25c0) ||
        c === 0x25c1 ||
        (c >= 0x25c2 && c <= 0x25f7) ||
        (c >= 0x25f8 && c <= 0x25ff) ||
        (c >= 0x2600 && c <= 0x266e) ||
        c === 0x266f ||
        (c >= 0x2670 && c <= 0x2767) ||
        c === 0x2768 ||
        c === 0x2769 ||
        c === 0x276a ||
        c === 0x276b ||
        c === 0x276c ||
        c === 0x276d ||
        c === 0x276e ||
        c === 0x276f ||
        c === 0x2770 ||
        c === 0x2771 ||
        c === 0x2772 ||
        c === 0x2773 ||
        c === 0x2774 ||
        c === 0x2775 ||
        (c >= 0x2794 && c <= 0x27bf) ||
        (c >= 0x27c0 && c <= 0x27c4) ||
        c === 0x27c5 ||
        c === 0x27c6 ||
        (c >= 0x27c7 && c <= 0x27e5) ||
        c === 0x27e6 ||
        c === 0x27e7 ||
        c === 0x27e8 ||
        c === 0x27e9 ||
        c === 0x27ea ||
        c === 0x27eb ||
        c === 0x27ec ||
        c === 0x27ed ||
        c === 0x27ee ||
        c === 0x27ef ||
        (c >= 0x27f0 && c <= 0x27ff) ||
        (c >= 0x2800 && c <= 0x28ff) ||
        (c >= 0x2900 && c <= 0x2982) ||
        c === 0x2983 ||
        c === 0x2984 ||
        c === 0x2985 ||
        c === 0x2986 ||
        c === 0x2987 ||
        c === 0x2988 ||
        c === 0x2989 ||
        c === 0x298a ||
        c === 0x298b ||
        c === 0x298c ||
        c === 0x298d ||
        c === 0x298e ||
        c === 0x298f ||
        c === 0x2990 ||
        c === 0x2991 ||
        c === 0x2992 ||
        c === 0x2993 ||
        c === 0x2994 ||
        c === 0x2995 ||
        c === 0x2996 ||
        c === 0x2997 ||
        c === 0x2998 ||
        (c >= 0x2999 && c <= 0x29d7) ||
        c === 0x29d8 ||
        c === 0x29d9 ||
        c === 0x29da ||
        c === 0x29db ||
        (c >= 0x29dc && c <= 0x29fb) ||
        c === 0x29fc ||
        c === 0x29fd ||
        (c >= 0x29fe && c <= 0x2aff) ||
        (c >= 0x2b00 && c <= 0x2b2f) ||
        (c >= 0x2b30 && c <= 0x2b44) ||
        (c >= 0x2b45 && c <= 0x2b46) ||
        (c >= 0x2b47 && c <= 0x2b4c) ||
        (c >= 0x2b4d && c <= 0x2b73) ||
        (c >= 0x2b74 && c <= 0x2b75) ||
        (c >= 0x2b76 && c <= 0x2b95) ||
        c === 0x2b96 ||
        (c >= 0x2b97 && c <= 0x2bff) ||
        (c >= 0x2e00 && c <= 0x2e01) ||
        c === 0x2e02 ||
        c === 0x2e03 ||
        c === 0x2e04 ||
        c === 0x2e05 ||
        (c >= 0x2e06 && c <= 0x2e08) ||
        c === 0x2e09 ||
        c === 0x2e0a ||
        c === 0x2e0b ||
        c === 0x2e0c ||
        c === 0x2e0d ||
        (c >= 0x2e0e && c <= 0x2e16) ||
        c === 0x2e17 ||
        (c >= 0x2e18 && c <= 0x2e19) ||
        c === 0x2e1a ||
        c === 0x2e1b ||
        c === 0x2e1c ||
        c === 0x2e1d ||
        (c >= 0x2e1e && c <= 0x2e1f) ||
        c === 0x2e20 ||
        c === 0x2e21 ||
        c === 0x2e22 ||
        c === 0x2e23 ||
        c === 0x2e24 ||
        c === 0x2e25 ||
        c === 0x2e26 ||
        c === 0x2e27 ||
        c === 0x2e28 ||
        c === 0x2e29 ||
        (c >= 0x2e2a && c <= 0x2e2e) ||
        c === 0x2e2f ||
        (c >= 0x2e30 && c <= 0x2e39) ||
        (c >= 0x2e3a && c <= 0x2e3b) ||
        (c >= 0x2e3c && c <= 0x2e3f) ||
        c === 0x2e40 ||
        c === 0x2e41 ||
        c === 0x2e42 ||
        (c >= 0x2e43 && c <= 0x2e4f) ||
        (c >= 0x2e50 && c <= 0x2e51) ||
        c === 0x2e52 ||
        (c >= 0x2e53 && c <= 0x2e7f) ||
        (c >= 0x3001 && c <= 0x3003) ||
        c === 0x3008 ||
        c === 0x3009 ||
        c === 0x300a ||
        c === 0x300b ||
        c === 0x300c ||
        c === 0x300d ||
        c === 0x300e ||
        c === 0x300f ||
        c === 0x3010 ||
        c === 0x3011 ||
        (c >= 0x3012 && c <= 0x3013) ||
        c === 0x3014 ||
        c === 0x3015 ||
        c === 0x3016 ||
        c === 0x3017 ||
        c === 0x3018 ||
        c === 0x3019 ||
        c === 0x301a ||
        c === 0x301b ||
        c === 0x301c ||
        c === 0x301d ||
        (c >= 0x301e && c <= 0x301f) ||
        c === 0x3020 ||
        c === 0x3030 ||
        c === 0xfd3e ||
        c === 0xfd3f ||
        (c >= 0xfe45 && c <= 0xfe46));
}


/***/ }),

/***/ "./node_modules/@formatjs/icu-messageformat-parser/lib/regex.generated.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@formatjs/icu-messageformat-parser/lib/regex.generated.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SPACE_SEPARATOR_REGEX": () => (/* binding */ SPACE_SEPARATOR_REGEX),
/* harmony export */   "WHITE_SPACE_REGEX": () => (/* binding */ WHITE_SPACE_REGEX)
/* harmony export */ });
// @generated from regex-gen.ts
var SPACE_SEPARATOR_REGEX = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;
var WHITE_SPACE_REGEX = /[\t-\r \x85\u200E\u200F\u2028\u2029]/;


/***/ }),

/***/ "./node_modules/@formatjs/icu-messageformat-parser/lib/types.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@formatjs/icu-messageformat-parser/lib/types.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TYPE": () => (/* binding */ TYPE),
/* harmony export */   "SKELETON_TYPE": () => (/* binding */ SKELETON_TYPE),
/* harmony export */   "isLiteralElement": () => (/* binding */ isLiteralElement),
/* harmony export */   "isArgumentElement": () => (/* binding */ isArgumentElement),
/* harmony export */   "isNumberElement": () => (/* binding */ isNumberElement),
/* harmony export */   "isDateElement": () => (/* binding */ isDateElement),
/* harmony export */   "isTimeElement": () => (/* binding */ isTimeElement),
/* harmony export */   "isSelectElement": () => (/* binding */ isSelectElement),
/* harmony export */   "isPluralElement": () => (/* binding */ isPluralElement),
/* harmony export */   "isPoundElement": () => (/* binding */ isPoundElement),
/* harmony export */   "isTagElement": () => (/* binding */ isTagElement),
/* harmony export */   "isNumberSkeleton": () => (/* binding */ isNumberSkeleton),
/* harmony export */   "isDateTimeSkeleton": () => (/* binding */ isDateTimeSkeleton),
/* harmony export */   "createLiteralElement": () => (/* binding */ createLiteralElement),
/* harmony export */   "createNumberElement": () => (/* binding */ createNumberElement)
/* harmony export */ });
var TYPE;
(function (TYPE) {
    /**
     * Raw text
     */
    TYPE[TYPE["literal"] = 0] = "literal";
    /**
     * Variable w/o any format, e.g `var` in `this is a {var}`
     */
    TYPE[TYPE["argument"] = 1] = "argument";
    /**
     * Variable w/ number format
     */
    TYPE[TYPE["number"] = 2] = "number";
    /**
     * Variable w/ date format
     */
    TYPE[TYPE["date"] = 3] = "date";
    /**
     * Variable w/ time format
     */
    TYPE[TYPE["time"] = 4] = "time";
    /**
     * Variable w/ select format
     */
    TYPE[TYPE["select"] = 5] = "select";
    /**
     * Variable w/ plural format
     */
    TYPE[TYPE["plural"] = 6] = "plural";
    /**
     * Only possible within plural argument.
     * This is the `#` symbol that will be substituted with the count.
     */
    TYPE[TYPE["pound"] = 7] = "pound";
    /**
     * XML-like tag
     */
    TYPE[TYPE["tag"] = 8] = "tag";
})(TYPE || (TYPE = {}));
var SKELETON_TYPE;
(function (SKELETON_TYPE) {
    SKELETON_TYPE[SKELETON_TYPE["number"] = 0] = "number";
    SKELETON_TYPE[SKELETON_TYPE["dateTime"] = 1] = "dateTime";
})(SKELETON_TYPE || (SKELETON_TYPE = {}));
/**
 * Type Guards
 */
function isLiteralElement(el) {
    return el.type === TYPE.literal;
}
function isArgumentElement(el) {
    return el.type === TYPE.argument;
}
function isNumberElement(el) {
    return el.type === TYPE.number;
}
function isDateElement(el) {
    return el.type === TYPE.date;
}
function isTimeElement(el) {
    return el.type === TYPE.time;
}
function isSelectElement(el) {
    return el.type === TYPE.select;
}
function isPluralElement(el) {
    return el.type === TYPE.plural;
}
function isPoundElement(el) {
    return el.type === TYPE.pound;
}
function isTagElement(el) {
    return el.type === TYPE.tag;
}
function isNumberSkeleton(el) {
    return !!(el && typeof el === 'object' && el.type === SKELETON_TYPE.number);
}
function isDateTimeSkeleton(el) {
    return !!(el && typeof el === 'object' && el.type === SKELETON_TYPE.dateTime);
}
function createLiteralElement(value) {
    return {
        type: TYPE.literal,
        value: value,
    };
}
function createNumberElement(value, style) {
    return {
        type: TYPE.number,
        value: value,
        style: style,
    };
}


/***/ }),

/***/ "./node_modules/@formatjs/icu-skeleton-parser/lib/date-time.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@formatjs/icu-skeleton-parser/lib/date-time.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseDateTimeSkeleton": () => (/* binding */ parseDateTimeSkeleton)
/* harmony export */ });
/**
 * https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * Credit: https://github.com/caridy/intl-datetimeformat-pattern/blob/master/index.js
 * with some tweaks
 */
var DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
/**
 * Parse Date time skeleton into Intl.DateTimeFormatOptions
 * Ref: https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * @public
 * @param skeleton skeleton string
 */
function parseDateTimeSkeleton(skeleton) {
    var result = {};
    skeleton.replace(DATE_TIME_REGEX, function (match) {
        var len = match.length;
        switch (match[0]) {
            // Era
            case 'G':
                result.era = len === 4 ? 'long' : len === 5 ? 'narrow' : 'short';
                break;
            // Year
            case 'y':
                result.year = len === 2 ? '2-digit' : 'numeric';
                break;
            case 'Y':
            case 'u':
            case 'U':
            case 'r':
                throw new RangeError('`Y/u/U/r` (year) patterns are not supported, use `y` instead');
            // Quarter
            case 'q':
            case 'Q':
                throw new RangeError('`q/Q` (quarter) patterns are not supported');
            // Month
            case 'M':
            case 'L':
                result.month = ['numeric', '2-digit', 'short', 'long', 'narrow'][len - 1];
                break;
            // Week
            case 'w':
            case 'W':
                throw new RangeError('`w/W` (week) patterns are not supported');
            case 'd':
                result.day = ['numeric', '2-digit'][len - 1];
                break;
            case 'D':
            case 'F':
            case 'g':
                throw new RangeError('`D/F/g` (day) patterns are not supported, use `d` instead');
            // Weekday
            case 'E':
                result.weekday = len === 4 ? 'short' : len === 5 ? 'narrow' : 'short';
                break;
            case 'e':
                if (len < 4) {
                    throw new RangeError('`e..eee` (weekday) patterns are not supported');
                }
                result.weekday = ['short', 'long', 'narrow', 'short'][len - 4];
                break;
            case 'c':
                if (len < 4) {
                    throw new RangeError('`c..ccc` (weekday) patterns are not supported');
                }
                result.weekday = ['short', 'long', 'narrow', 'short'][len - 4];
                break;
            // Period
            case 'a': // AM, PM
                result.hour12 = true;
                break;
            case 'b': // am, pm, noon, midnight
            case 'B': // flexible day periods
                throw new RangeError('`b/B` (period) patterns are not supported, use `a` instead');
            // Hour
            case 'h':
                result.hourCycle = 'h12';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'H':
                result.hourCycle = 'h23';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'K':
                result.hourCycle = 'h11';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'k':
                result.hourCycle = 'h24';
                result.hour = ['numeric', '2-digit'][len - 1];
                break;
            case 'j':
            case 'J':
            case 'C':
                throw new RangeError('`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead');
            // Minute
            case 'm':
                result.minute = ['numeric', '2-digit'][len - 1];
                break;
            // Second
            case 's':
                result.second = ['numeric', '2-digit'][len - 1];
                break;
            case 'S':
            case 'A':
                throw new RangeError('`S/A` (second) patterns are not supported, use `s` instead');
            // Zone
            case 'z': // 1..3, 4: specific non-location format
                result.timeZoneName = len < 4 ? 'short' : 'long';
                break;
            case 'Z': // 1..3, 4, 5: The ISO8601 varios formats
            case 'O': // 1, 4: miliseconds in day short, long
            case 'v': // 1, 4: generic non-location format
            case 'V': // 1, 2, 3, 4: time zone ID or city
            case 'X': // 1, 2, 3, 4: The ISO8601 varios formats
            case 'x': // 1, 2, 3, 4: The ISO8601 varios formats
                throw new RangeError('`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead');
        }
        return '';
    });
    return result;
}


/***/ }),

/***/ "./node_modules/@formatjs/icu-skeleton-parser/lib/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@formatjs/icu-skeleton-parser/lib/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseDateTimeSkeleton": () => (/* reexport safe */ _date_time__WEBPACK_IMPORTED_MODULE_0__.parseDateTimeSkeleton),
/* harmony export */   "parseNumberSkeleton": () => (/* reexport safe */ _number__WEBPACK_IMPORTED_MODULE_1__.parseNumberSkeleton),
/* harmony export */   "parseNumberSkeletonFromString": () => (/* reexport safe */ _number__WEBPACK_IMPORTED_MODULE_1__.parseNumberSkeletonFromString)
/* harmony export */ });
/* harmony import */ var _date_time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date-time */ "./node_modules/@formatjs/icu-skeleton-parser/lib/date-time.js");
/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./number */ "./node_modules/@formatjs/icu-skeleton-parser/lib/number.js");




/***/ }),

/***/ "./node_modules/@formatjs/icu-skeleton-parser/lib/number.js":
/*!******************************************************************!*\
  !*** ./node_modules/@formatjs/icu-skeleton-parser/lib/number.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseNumberSkeletonFromString": () => (/* binding */ parseNumberSkeletonFromString),
/* harmony export */   "parseNumberSkeleton": () => (/* binding */ parseNumberSkeleton)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _regex_generated__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.generated */ "./node_modules/@formatjs/icu-skeleton-parser/lib/regex.generated.js");


function parseNumberSkeletonFromString(skeleton) {
    if (skeleton.length === 0) {
        throw new Error('Number skeleton cannot be empty');
    }
    // Parse the skeleton
    var stringTokens = skeleton
        .split(_regex_generated__WEBPACK_IMPORTED_MODULE_0__.WHITE_SPACE_REGEX)
        .filter(function (x) { return x.length > 0; });
    var tokens = [];
    for (var _i = 0, stringTokens_1 = stringTokens; _i < stringTokens_1.length; _i++) {
        var stringToken = stringTokens_1[_i];
        var stemAndOptions = stringToken.split('/');
        if (stemAndOptions.length === 0) {
            throw new Error('Invalid number skeleton');
        }
        var stem = stemAndOptions[0], options = stemAndOptions.slice(1);
        for (var _a = 0, options_1 = options; _a < options_1.length; _a++) {
            var option = options_1[_a];
            if (option.length === 0) {
                throw new Error('Invalid number skeleton');
            }
        }
        tokens.push({ stem: stem, options: options });
    }
    return tokens;
}
function icuUnitToEcma(unit) {
    return unit.replace(/^(.*?)-/, '');
}
var FRACTION_PRECISION_REGEX = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g;
var SIGNIFICANT_PRECISION_REGEX = /^(@+)?(\+|#+)?[rs]?$/g;
var INTEGER_WIDTH_REGEX = /(\*)(0+)|(#+)(0+)|(0+)/g;
var CONCISE_INTEGER_WIDTH_REGEX = /^(0+)$/;
function parseSignificantPrecision(str) {
    var result = {};
    if (str[str.length - 1] === 'r') {
        result.roundingPriority = 'morePrecision';
    }
    else if (str[str.length - 1] === 's') {
        result.roundingPriority = 'lessPrecision';
    }
    str.replace(SIGNIFICANT_PRECISION_REGEX, function (_, g1, g2) {
        // @@@ case
        if (typeof g2 !== 'string') {
            result.minimumSignificantDigits = g1.length;
            result.maximumSignificantDigits = g1.length;
        }
        // @@@+ case
        else if (g2 === '+') {
            result.minimumSignificantDigits = g1.length;
        }
        // .### case
        else if (g1[0] === '#') {
            result.maximumSignificantDigits = g1.length;
        }
        // .@@## or .@@@ case
        else {
            result.minimumSignificantDigits = g1.length;
            result.maximumSignificantDigits =
                g1.length + (typeof g2 === 'string' ? g2.length : 0);
        }
        return '';
    });
    return result;
}
function parseSign(str) {
    switch (str) {
        case 'sign-auto':
            return {
                signDisplay: 'auto',
            };
        case 'sign-accounting':
        case '()':
            return {
                currencySign: 'accounting',
            };
        case 'sign-always':
        case '+!':
            return {
                signDisplay: 'always',
            };
        case 'sign-accounting-always':
        case '()!':
            return {
                signDisplay: 'always',
                currencySign: 'accounting',
            };
        case 'sign-except-zero':
        case '+?':
            return {
                signDisplay: 'exceptZero',
            };
        case 'sign-accounting-except-zero':
        case '()?':
            return {
                signDisplay: 'exceptZero',
                currencySign: 'accounting',
            };
        case 'sign-never':
        case '+_':
            return {
                signDisplay: 'never',
            };
    }
}
function parseConciseScientificAndEngineeringStem(stem) {
    // Engineering
    var result;
    if (stem[0] === 'E' && stem[1] === 'E') {
        result = {
            notation: 'engineering',
        };
        stem = stem.slice(2);
    }
    else if (stem[0] === 'E') {
        result = {
            notation: 'scientific',
        };
        stem = stem.slice(1);
    }
    if (result) {
        var signDisplay = stem.slice(0, 2);
        if (signDisplay === '+!') {
            result.signDisplay = 'always';
            stem = stem.slice(2);
        }
        else if (signDisplay === '+?') {
            result.signDisplay = 'exceptZero';
            stem = stem.slice(2);
        }
        if (!CONCISE_INTEGER_WIDTH_REGEX.test(stem)) {
            throw new Error('Malformed concise eng/scientific notation');
        }
        result.minimumIntegerDigits = stem.length;
    }
    return result;
}
function parseNotationOptions(opt) {
    var result = {};
    var signOpts = parseSign(opt);
    if (signOpts) {
        return signOpts;
    }
    return result;
}
/**
 * https://github.com/unicode-org/icu/blob/master/docs/userguide/format_parse/numbers/skeletons.md#skeleton-stems-and-options
 */
function parseNumberSkeleton(tokens) {
    var result = {};
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        switch (token.stem) {
            case 'percent':
            case '%':
                result.style = 'percent';
                continue;
            case '%x100':
                result.style = 'percent';
                result.scale = 100;
                continue;
            case 'currency':
                result.style = 'currency';
                result.currency = token.options[0];
                continue;
            case 'group-off':
            case ',_':
                result.useGrouping = false;
                continue;
            case 'precision-integer':
            case '.':
                result.maximumFractionDigits = 0;
                continue;
            case 'measure-unit':
            case 'unit':
                result.style = 'unit';
                result.unit = icuUnitToEcma(token.options[0]);
                continue;
            case 'compact-short':
            case 'K':
                result.notation = 'compact';
                result.compactDisplay = 'short';
                continue;
            case 'compact-long':
            case 'KK':
                result.notation = 'compact';
                result.compactDisplay = 'long';
                continue;
            case 'scientific':
                result = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, result), { notation: 'scientific' }), token.options.reduce(function (all, opt) { return ((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, all), parseNotationOptions(opt))); }, {}));
                continue;
            case 'engineering':
                result = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, result), { notation: 'engineering' }), token.options.reduce(function (all, opt) { return ((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, all), parseNotationOptions(opt))); }, {}));
                continue;
            case 'notation-simple':
                result.notation = 'standard';
                continue;
            // https://github.com/unicode-org/icu/blob/master/icu4c/source/i18n/unicode/unumberformatter.h
            case 'unit-width-narrow':
                result.currencyDisplay = 'narrowSymbol';
                result.unitDisplay = 'narrow';
                continue;
            case 'unit-width-short':
                result.currencyDisplay = 'code';
                result.unitDisplay = 'short';
                continue;
            case 'unit-width-full-name':
                result.currencyDisplay = 'name';
                result.unitDisplay = 'long';
                continue;
            case 'unit-width-iso-code':
                result.currencyDisplay = 'symbol';
                continue;
            case 'scale':
                result.scale = parseFloat(token.options[0]);
                continue;
            // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#integer-width
            case 'integer-width':
                if (token.options.length > 1) {
                    throw new RangeError('integer-width stems only accept a single optional option');
                }
                token.options[0].replace(INTEGER_WIDTH_REGEX, function (_, g1, g2, g3, g4, g5) {
                    if (g1) {
                        result.minimumIntegerDigits = g2.length;
                    }
                    else if (g3 && g4) {
                        throw new Error('We currently do not support maximum integer digits');
                    }
                    else if (g5) {
                        throw new Error('We currently do not support exact integer digits');
                    }
                    return '';
                });
                continue;
        }
        // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#integer-width
        if (CONCISE_INTEGER_WIDTH_REGEX.test(token.stem)) {
            result.minimumIntegerDigits = token.stem.length;
            continue;
        }
        if (FRACTION_PRECISION_REGEX.test(token.stem)) {
            // Precision
            // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#fraction-precision
            // precision-integer case
            if (token.options.length > 1) {
                throw new RangeError('Fraction-precision stems only accept a single optional option');
            }
            token.stem.replace(FRACTION_PRECISION_REGEX, function (_, g1, g2, g3, g4, g5) {
                // .000* case (before ICU67 it was .000+)
                if (g2 === '*') {
                    result.minimumFractionDigits = g1.length;
                }
                // .### case
                else if (g3 && g3[0] === '#') {
                    result.maximumFractionDigits = g3.length;
                }
                // .00## case
                else if (g4 && g5) {
                    result.minimumFractionDigits = g4.length;
                    result.maximumFractionDigits = g4.length + g5.length;
                }
                else {
                    result.minimumFractionDigits = g1.length;
                    result.maximumFractionDigits = g1.length;
                }
                return '';
            });
            var opt = token.options[0];
            // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#trailing-zero-display
            if (opt === 'w') {
                result = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, result), { trailingZeroDisplay: 'stripIfInteger' });
            }
            else if (opt) {
                result = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, result), parseSignificantPrecision(opt));
            }
            continue;
        }
        // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#significant-digits-precision
        if (SIGNIFICANT_PRECISION_REGEX.test(token.stem)) {
            result = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, result), parseSignificantPrecision(token.stem));
            continue;
        }
        var signOpts = parseSign(token.stem);
        if (signOpts) {
            result = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, result), signOpts);
        }
        var conciseScientificAndEngineeringOpts = parseConciseScientificAndEngineeringStem(token.stem);
        if (conciseScientificAndEngineeringOpts) {
            result = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, result), conciseScientificAndEngineeringOpts);
        }
    }
    return result;
}


/***/ }),

/***/ "./node_modules/@formatjs/icu-skeleton-parser/lib/regex.generated.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@formatjs/icu-skeleton-parser/lib/regex.generated.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WHITE_SPACE_REGEX": () => (/* binding */ WHITE_SPACE_REGEX)
/* harmony export */ });
// @generated from regex-gen.ts
var WHITE_SPACE_REGEX = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;


/***/ }),

/***/ "./node_modules/abortcontroller-polyfill/dist/polyfill-patch-fetch.js":
/*!****************************************************************************!*\
  !*** ./node_modules/abortcontroller-polyfill/dist/polyfill-patch-fetch.js ***!
  \****************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (factory) {
   true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) :
  0;
}((function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  var Emitter = /*#__PURE__*/function () {
    function Emitter() {
      _classCallCheck(this, Emitter);

      Object.defineProperty(this, 'listeners', {
        value: {},
        writable: true,
        configurable: true
      });
    }

    _createClass(Emitter, [{
      key: "addEventListener",
      value: function addEventListener(type, callback, options) {
        if (!(type in this.listeners)) {
          this.listeners[type] = [];
        }

        this.listeners[type].push({
          callback: callback,
          options: options
        });
      }
    }, {
      key: "removeEventListener",
      value: function removeEventListener(type, callback) {
        if (!(type in this.listeners)) {
          return;
        }

        var stack = this.listeners[type];

        for (var i = 0, l = stack.length; i < l; i++) {
          if (stack[i].callback === callback) {
            stack.splice(i, 1);
            return;
          }
        }
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(event) {
        if (!(event.type in this.listeners)) {
          return;
        }

        var stack = this.listeners[event.type];
        var stackToCall = stack.slice();

        for (var i = 0, l = stackToCall.length; i < l; i++) {
          var listener = stackToCall[i];

          try {
            listener.callback.call(this, event);
          } catch (e) {
            Promise.resolve().then(function () {
              throw e;
            });
          }

          if (listener.options && listener.options.once) {
            this.removeEventListener(event.type, listener.callback);
          }
        }

        return !event.defaultPrevented;
      }
    }]);

    return Emitter;
  }();

  var AbortSignal = /*#__PURE__*/function (_Emitter) {
    _inherits(AbortSignal, _Emitter);

    var _super = _createSuper(AbortSignal);

    function AbortSignal() {
      var _this;

      _classCallCheck(this, AbortSignal);

      _this = _super.call(this); // Some versions of babel does not transpile super() correctly for IE <= 10, if the parent
      // constructor has failed to run, then "this.listeners" will still be undefined and then we call
      // the parent constructor directly instead as a workaround. For general details, see babel bug:
      // https://github.com/babel/babel/issues/3041
      // This hack was added as a fix for the issue described here:
      // https://github.com/Financial-Times/polyfill-library/pull/59#issuecomment-477558042

      if (!_this.listeners) {
        Emitter.call(_assertThisInitialized(_this));
      } // Compared to assignment, Object.defineProperty makes properties non-enumerable by default and
      // we want Object.keys(new AbortController().signal) to be [] for compat with the native impl


      Object.defineProperty(_assertThisInitialized(_this), 'aborted', {
        value: false,
        writable: true,
        configurable: true
      });
      Object.defineProperty(_assertThisInitialized(_this), 'onabort', {
        value: null,
        writable: true,
        configurable: true
      });
      return _this;
    }

    _createClass(AbortSignal, [{
      key: "toString",
      value: function toString() {
        return '[object AbortSignal]';
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(event) {
        if (event.type === 'abort') {
          this.aborted = true;

          if (typeof this.onabort === 'function') {
            this.onabort.call(this, event);
          }
        }

        _get(_getPrototypeOf(AbortSignal.prototype), "dispatchEvent", this).call(this, event);
      }
    }]);

    return AbortSignal;
  }(Emitter);
  var AbortController = /*#__PURE__*/function () {
    function AbortController() {
      _classCallCheck(this, AbortController);

      // Compared to assignment, Object.defineProperty makes properties non-enumerable by default and
      // we want Object.keys(new AbortController()) to be [] for compat with the native impl
      Object.defineProperty(this, 'signal', {
        value: new AbortSignal(),
        writable: true,
        configurable: true
      });
    }

    _createClass(AbortController, [{
      key: "abort",
      value: function abort() {
        var event;

        try {
          event = new Event('abort');
        } catch (e) {
          if (typeof document !== 'undefined') {
            if (!document.createEvent) {
              // For Internet Explorer 8:
              event = document.createEventObject();
              event.type = 'abort';
            } else {
              // For Internet Explorer 11:
              event = document.createEvent('Event');
              event.initEvent('abort', false, false);
            }
          } else {
            // Fallback where document isn't available:
            event = {
              type: 'abort',
              bubbles: false,
              cancelable: false
            };
          }
        }

        this.signal.dispatchEvent(event);
      }
    }, {
      key: "toString",
      value: function toString() {
        return '[object AbortController]';
      }
    }]);

    return AbortController;
  }();

  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    // These are necessary to make sure that we get correct output for:
    // Object.prototype.toString.call(new AbortController())
    AbortController.prototype[Symbol.toStringTag] = 'AbortController';
    AbortSignal.prototype[Symbol.toStringTag] = 'AbortSignal';
  }

  function polyfillNeeded(self) {
    if (self.__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL) {
      console.log('__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL=true is set, will force install polyfill');
      return true;
    } // Note that the "unfetch" minimal fetch polyfill defines fetch() without
    // defining window.Request, and this polyfill need to work on top of unfetch
    // so the below feature detection needs the !self.AbortController part.
    // The Request.prototype check is also needed because Safari versions 11.1.2
    // up to and including 12.1.x has a window.AbortController present but still
    // does NOT correctly implement abortable fetch:
    // https://bugs.webkit.org/show_bug.cgi?id=174980#c2


    return typeof self.Request === 'function' && !self.Request.prototype.hasOwnProperty('signal') || !self.AbortController;
  }

  /**
   * Note: the "fetch.Request" default value is available for fetch imported from
   * the "node-fetch" package and not in browsers. This is OK since browsers
   * will be importing umd-polyfill.js from that path "self" is passed the
   * decorator so the default value will not be used (because browsers that define
   * fetch also has Request). One quirky setup where self.fetch exists but
   * self.Request does not is when the "unfetch" minimal fetch polyfill is used
   * on top of IE11; for this case the browser will try to use the fetch.Request
   * default value which in turn will be undefined but then then "if (Request)"
   * will ensure that you get a patched fetch but still no Request (as expected).
   * @param {fetch, Request = fetch.Request}
   * @returns {fetch: abortableFetch, Request: AbortableRequest}
   */

  function abortableFetchDecorator(patchTargets) {
    if ('function' === typeof patchTargets) {
      patchTargets = {
        fetch: patchTargets
      };
    }

    var _patchTargets = patchTargets,
        fetch = _patchTargets.fetch,
        _patchTargets$Request = _patchTargets.Request,
        NativeRequest = _patchTargets$Request === void 0 ? fetch.Request : _patchTargets$Request,
        NativeAbortController = _patchTargets.AbortController,
        _patchTargets$__FORCE = _patchTargets.__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL,
        __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL = _patchTargets$__FORCE === void 0 ? false : _patchTargets$__FORCE;

    if (!polyfillNeeded({
      fetch: fetch,
      Request: NativeRequest,
      AbortController: NativeAbortController,
      __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL: __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL
    })) {
      return {
        fetch: fetch,
        Request: Request
      };
    }

    var Request = NativeRequest; // Note that the "unfetch" minimal fetch polyfill defines fetch() without
    // defining window.Request, and this polyfill need to work on top of unfetch
    // hence we only patch it if it's available. Also we don't patch it if signal
    // is already available on the Request prototype because in this case support
    // is present and the patching below can cause a crash since it assigns to
    // request.signal which is technically a read-only property. This latter error
    // happens when you run the main5.js node-fetch example in the repo
    // "abortcontroller-polyfill-examples". The exact error is:
    //   request.signal = init.signal;
    //   ^
    // TypeError: Cannot set property signal of #<Request> which has only a getter

    if (Request && !Request.prototype.hasOwnProperty('signal') || __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL) {
      Request = function Request(input, init) {
        var signal;

        if (init && init.signal) {
          signal = init.signal; // Never pass init.signal to the native Request implementation when the polyfill has
          // been installed because if we're running on top of a browser with a
          // working native AbortController (i.e. the polyfill was installed due to
          // __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL being set), then passing our
          // fake AbortSignal to the native fetch will trigger:
          // TypeError: Failed to construct 'Request': member signal is not of type AbortSignal.

          delete init.signal;
        }

        var request = new NativeRequest(input, init);

        if (signal) {
          Object.defineProperty(request, 'signal', {
            writable: false,
            enumerable: false,
            configurable: true,
            value: signal
          });
        }

        return request;
      };

      Request.prototype = NativeRequest.prototype;
    }

    var realFetch = fetch;

    var abortableFetch = function abortableFetch(input, init) {
      var signal = Request && Request.prototype.isPrototypeOf(input) ? input.signal : init ? init.signal : undefined;

      if (signal) {
        var abortError;

        try {
          abortError = new DOMException('Aborted', 'AbortError');
        } catch (err) {
          // IE 11 does not support calling the DOMException constructor, use a
          // regular error object on it instead.
          abortError = new Error('Aborted');
          abortError.name = 'AbortError';
        } // Return early if already aborted, thus avoiding making an HTTP request


        if (signal.aborted) {
          return Promise.reject(abortError);
        } // Turn an event into a promise, reject it once `abort` is dispatched


        var cancellation = new Promise(function (_, reject) {
          signal.addEventListener('abort', function () {
            return reject(abortError);
          }, {
            once: true
          });
        });

        if (init && init.signal) {
          // Never pass .signal to the native implementation when the polyfill has
          // been installed because if we're running on top of a browser with a
          // working native AbortController (i.e. the polyfill was installed due to
          // __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL being set), then passing our
          // fake AbortSignal to the native fetch will trigger:
          // TypeError: Failed to execute 'fetch' on 'Window': member signal is not of type AbortSignal.
          delete init.signal;
        } // Return the fastest promise (don't need to wait for request to finish)


        return Promise.race([cancellation, realFetch(input, init)]);
      }

      return realFetch(input, init);
    };

    return {
      fetch: abortableFetch,
      Request: Request
    };
  }

  (function (self) {

    if (!polyfillNeeded(self)) {
      return;
    }

    if (!self.fetch) {
      console.warn('fetch() is not available, cannot install abortcontroller-polyfill');
      return;
    }

    var _abortableFetch = abortableFetchDecorator(self),
        fetch = _abortableFetch.fetch,
        Request = _abortableFetch.Request;

    self.fetch = fetch;
    self.Request = Request;
    Object.defineProperty(self, 'AbortController', {
      writable: true,
      enumerable: false,
      configurable: true,
      value: AbortController
    });
    Object.defineProperty(self, 'AbortSignal', {
      writable: true,
      enumerable: false,
      configurable: true,
      value: AbortSignal
    });
  })(typeof self !== 'undefined' ? self : __webpack_require__.g);

})));


/***/ }),

/***/ "./node_modules/dijkstrajs/dijkstra.js":
/*!*********************************************!*\
  !*** ./node_modules/dijkstrajs/dijkstra.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";


/******************************************************************************
 * Created 2008-08-19.
 *
 * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
 *
 * Copyright (C) 2008
 *   Wyatt Baldwin <self@wyattbaldwin.com>
 *   All rights reserved
 *
 * Licensed under the MIT license.
 *
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *****************************************************************************/
var dijkstra = {
  single_source_shortest_paths: function(graph, s, d) {
    // Predecessor map for each node that has been encountered.
    // node ID => predecessor node ID
    var predecessors = {};

    // Costs of shortest paths from s to all nodes encountered.
    // node ID => cost
    var costs = {};
    costs[s] = 0;

    // Costs of shortest paths from s to all nodes encountered; differs from
    // `costs` in that it provides easy access to the node that currently has
    // the known shortest path from s.
    // XXX: Do we actually need both `costs` and `open`?
    var open = dijkstra.PriorityQueue.make();
    open.push(s, 0);

    var closest,
        u, v,
        cost_of_s_to_u,
        adjacent_nodes,
        cost_of_e,
        cost_of_s_to_u_plus_cost_of_e,
        cost_of_s_to_v,
        first_visit;
    while (!open.empty()) {
      // In the nodes remaining in graph that have a known cost from s,
      // find the node, u, that currently has the shortest path from s.
      closest = open.pop();
      u = closest.value;
      cost_of_s_to_u = closest.cost;

      // Get nodes adjacent to u...
      adjacent_nodes = graph[u] || {};

      // ...and explore the edges that connect u to those nodes, updating
      // the cost of the shortest paths to any or all of those nodes as
      // necessary. v is the node across the current edge from u.
      for (v in adjacent_nodes) {
        if (adjacent_nodes.hasOwnProperty(v)) {
          // Get the cost of the edge running from u to v.
          cost_of_e = adjacent_nodes[v];

          // Cost of s to u plus the cost of u to v across e--this is *a*
          // cost from s to v that may or may not be less than the current
          // known cost to v.
          cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;

          // If we haven't visited v yet OR if the current known cost from s to
          // v is greater than the new cost we just found (cost of s to u plus
          // cost of u to v across e), update v's cost in the cost list and
          // update v's predecessor in the predecessor list (it's now u).
          cost_of_s_to_v = costs[v];
          first_visit = (typeof costs[v] === 'undefined');
          if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
            costs[v] = cost_of_s_to_u_plus_cost_of_e;
            open.push(v, cost_of_s_to_u_plus_cost_of_e);
            predecessors[v] = u;
          }
        }
      }
    }

    if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
      var msg = ['Could not find a path from ', s, ' to ', d, '.'].join('');
      throw new Error(msg);
    }

    return predecessors;
  },

  extract_shortest_path_from_predecessor_list: function(predecessors, d) {
    var nodes = [];
    var u = d;
    var predecessor;
    while (u) {
      nodes.push(u);
      predecessor = predecessors[u];
      u = predecessors[u];
    }
    nodes.reverse();
    return nodes;
  },

  find_path: function(graph, s, d) {
    var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
    return dijkstra.extract_shortest_path_from_predecessor_list(
      predecessors, d);
  },

  /**
   * A very naive priority queue implementation.
   */
  PriorityQueue: {
    make: function (opts) {
      var T = dijkstra.PriorityQueue,
          t = {},
          key;
      opts = opts || {};
      for (key in T) {
        if (T.hasOwnProperty(key)) {
          t[key] = T[key];
        }
      }
      t.queue = [];
      t.sorter = opts.sorter || T.default_sorter;
      return t;
    },

    default_sorter: function (a, b) {
      return a.cost - b.cost;
    },

    /**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */
    push: function (value, cost) {
      var item = {value: value, cost: cost};
      this.queue.push(item);
      this.queue.sort(this.sorter);
    },

    /**
     * Return the highest priority element in the queue.
     */
    pop: function () {
      return this.queue.shift();
    },

    empty: function () {
      return this.queue.length === 0;
    }
  }
};


// node.js module exports
if (true) {
  module.exports = dijkstra;
}


/***/ }),

/***/ "./node_modules/encode-utf8/index.js":
/*!*******************************************!*\
  !*** ./node_modules/encode-utf8/index.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


module.exports = function encodeUtf8 (input) {
  var result = []
  var size = input.length

  for (var index = 0; index < size; index++) {
    var point = input.charCodeAt(index)

    if (point >= 0xD800 && point <= 0xDBFF && size > index + 1) {
      var second = input.charCodeAt(index + 1)

      if (second >= 0xDC00 && second <= 0xDFFF) {
        // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        point = (point - 0xD800) * 0x400 + second - 0xDC00 + 0x10000
        index += 1
      }
    }

    // US-ASCII
    if (point < 0x80) {
      result.push(point)
      continue
    }

    // 2-byte UTF-8
    if (point < 0x800) {
      result.push((point >> 6) | 192)
      result.push((point & 63) | 128)
      continue
    }

    // 3-byte UTF-8
    if (point < 0xD800 || (point >= 0xE000 && point < 0x10000)) {
      result.push((point >> 12) | 224)
      result.push(((point >> 6) & 63) | 128)
      result.push((point & 63) | 128)
      continue
    }

    // 4-byte UTF-8
    if (point >= 0x10000 && point <= 0x10FFFF) {
      result.push((point >> 18) | 240)
      result.push(((point >> 12) & 63) | 128)
      result.push(((point >> 6) & 63) | 128)
      result.push((point & 63) | 128)
      continue
    }

    // Invalid character
    result.push(0xEF, 0xBF, 0xBD)
  }

  return new Uint8Array(result).buffer
}


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./node_modules/intl-messageformat/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/intl-messageformat/lib/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PART_TYPE": () => (/* reexport safe */ _src_formatters__WEBPACK_IMPORTED_MODULE_0__.PART_TYPE),
/* harmony export */   "formatToParts": () => (/* reexport safe */ _src_formatters__WEBPACK_IMPORTED_MODULE_0__.formatToParts),
/* harmony export */   "isFormatXMLElementFn": () => (/* reexport safe */ _src_formatters__WEBPACK_IMPORTED_MODULE_0__.isFormatXMLElementFn),
/* harmony export */   "IntlMessageFormat": () => (/* reexport safe */ _src_core__WEBPACK_IMPORTED_MODULE_1__.IntlMessageFormat),
/* harmony export */   "ErrorCode": () => (/* reexport safe */ _src_error__WEBPACK_IMPORTED_MODULE_2__.ErrorCode),
/* harmony export */   "FormatError": () => (/* reexport safe */ _src_error__WEBPACK_IMPORTED_MODULE_2__.FormatError),
/* harmony export */   "InvalidValueError": () => (/* reexport safe */ _src_error__WEBPACK_IMPORTED_MODULE_2__.InvalidValueError),
/* harmony export */   "InvalidValueTypeError": () => (/* reexport safe */ _src_error__WEBPACK_IMPORTED_MODULE_2__.InvalidValueTypeError),
/* harmony export */   "MissingValueError": () => (/* reexport safe */ _src_error__WEBPACK_IMPORTED_MODULE_2__.MissingValueError)
/* harmony export */ });
/* harmony import */ var _src_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/core */ "./node_modules/intl-messageformat/lib/src/core.js");
/* harmony import */ var _src_formatters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/formatters */ "./node_modules/intl-messageformat/lib/src/formatters.js");
/* harmony import */ var _src_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/error */ "./node_modules/intl-messageformat/lib/src/error.js");
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/




/* harmony default export */ __webpack_exports__["default"] = (_src_core__WEBPACK_IMPORTED_MODULE_1__.IntlMessageFormat);


/***/ }),

/***/ "./node_modules/intl-messageformat/lib/src/core.js":
/*!*********************************************************!*\
  !*** ./node_modules/intl-messageformat/lib/src/core.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IntlMessageFormat": () => (/* binding */ IntlMessageFormat)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @formatjs/icu-messageformat-parser */ "./node_modules/@formatjs/icu-messageformat-parser/lib/index.js");
/* harmony import */ var _formatjs_fast_memoize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @formatjs/fast-memoize */ "./node_modules/@formatjs/fast-memoize/lib/index.js");
/* harmony import */ var _formatters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./formatters */ "./node_modules/intl-messageformat/lib/src/formatters.js");
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/




// -- MessageFormat --------------------------------------------------------
function mergeConfig(c1, c2) {
    if (!c2) {
        return c1;
    }
    return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, (c1 || {})), (c2 || {})), Object.keys(c1).reduce(function (all, k) {
        all[k] = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, c1[k]), (c2[k] || {}));
        return all;
    }, {}));
}
function mergeConfigs(defaultConfig, configs) {
    if (!configs) {
        return defaultConfig;
    }
    return Object.keys(defaultConfig).reduce(function (all, k) {
        all[k] = mergeConfig(defaultConfig[k], configs[k]);
        return all;
    }, (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, defaultConfig));
}
function createFastMemoizeCache(store) {
    return {
        create: function () {
            return {
                get: function (key) {
                    return store[key];
                },
                set: function (key, value) {
                    store[key] = value;
                },
            };
        },
    };
}
function createDefaultFormatters(cache) {
    if (cache === void 0) { cache = {
        number: {},
        dateTime: {},
        pluralRules: {},
    }; }
    return {
        getNumberFormat: (0,_formatjs_fast_memoize__WEBPACK_IMPORTED_MODULE_1__["default"])(function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new ((_a = Intl.NumberFormat).bind.apply(_a, (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__spreadArray)([void 0], args, false)))();
        }, {
            cache: createFastMemoizeCache(cache.number),
            strategy: _formatjs_fast_memoize__WEBPACK_IMPORTED_MODULE_1__.strategies.variadic,
        }),
        getDateTimeFormat: (0,_formatjs_fast_memoize__WEBPACK_IMPORTED_MODULE_1__["default"])(function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new ((_a = Intl.DateTimeFormat).bind.apply(_a, (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__spreadArray)([void 0], args, false)))();
        }, {
            cache: createFastMemoizeCache(cache.dateTime),
            strategy: _formatjs_fast_memoize__WEBPACK_IMPORTED_MODULE_1__.strategies.variadic,
        }),
        getPluralRules: (0,_formatjs_fast_memoize__WEBPACK_IMPORTED_MODULE_1__["default"])(function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new ((_a = Intl.PluralRules).bind.apply(_a, (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__spreadArray)([void 0], args, false)))();
        }, {
            cache: createFastMemoizeCache(cache.pluralRules),
            strategy: _formatjs_fast_memoize__WEBPACK_IMPORTED_MODULE_1__.strategies.variadic,
        }),
    };
}
var IntlMessageFormat = /** @class */ (function () {
    function IntlMessageFormat(message, locales, overrideFormats, opts) {
        var _this = this;
        if (locales === void 0) { locales = IntlMessageFormat.defaultLocale; }
        this.formatterCache = {
            number: {},
            dateTime: {},
            pluralRules: {},
        };
        this.format = function (values) {
            var parts = _this.formatToParts(values);
            // Hot path for straight simple msg translations
            if (parts.length === 1) {
                return parts[0].value;
            }
            var result = parts.reduce(function (all, part) {
                if (!all.length ||
                    part.type !== _formatters__WEBPACK_IMPORTED_MODULE_3__.PART_TYPE.literal ||
                    typeof all[all.length - 1] !== 'string') {
                    all.push(part.value);
                }
                else {
                    all[all.length - 1] += part.value;
                }
                return all;
            }, []);
            if (result.length <= 1) {
                return result[0] || '';
            }
            return result;
        };
        this.formatToParts = function (values) {
            return (0,_formatters__WEBPACK_IMPORTED_MODULE_3__.formatToParts)(_this.ast, _this.locales, _this.formatters, _this.formats, values, undefined, _this.message);
        };
        this.resolvedOptions = function () { return ({
            locale: Intl.NumberFormat.supportedLocalesOf(_this.locales)[0],
        }); };
        this.getAst = function () { return _this.ast; };
        if (typeof message === 'string') {
            this.message = message;
            if (!IntlMessageFormat.__parse) {
                throw new TypeError('IntlMessageFormat.__parse must be set to process `message` of type `string`');
            }
            // Parse string messages into an AST.
            this.ast = IntlMessageFormat.__parse(message, {
                ignoreTag: opts === null || opts === void 0 ? void 0 : opts.ignoreTag,
            });
        }
        else {
            this.ast = message;
        }
        if (!Array.isArray(this.ast)) {
            throw new TypeError('A message must be provided as a String or AST.');
        }
        // Creates a new object with the specified `formats` merged with the default
        // formats.
        this.formats = mergeConfigs(IntlMessageFormat.formats, overrideFormats);
        // Defined first because it's used to build the format pattern.
        this.locales = locales;
        this.formatters =
            (opts && opts.formatters) || createDefaultFormatters(this.formatterCache);
    }
    Object.defineProperty(IntlMessageFormat, "defaultLocale", {
        get: function () {
            if (!IntlMessageFormat.memoizedDefaultLocale) {
                IntlMessageFormat.memoizedDefaultLocale =
                    new Intl.NumberFormat().resolvedOptions().locale;
            }
            return IntlMessageFormat.memoizedDefaultLocale;
        },
        enumerable: false,
        configurable: true
    });
    IntlMessageFormat.memoizedDefaultLocale = null;
    IntlMessageFormat.__parse = _formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.parse;
    // Default format options used as the prototype of the `formats` provided to the
    // constructor. These are used when constructing the internal Intl.NumberFormat
    // and Intl.DateTimeFormat instances.
    IntlMessageFormat.formats = {
        number: {
            integer: {
                maximumFractionDigits: 0,
            },
            currency: {
                style: 'currency',
            },
            percent: {
                style: 'percent',
            },
        },
        date: {
            short: {
                month: 'numeric',
                day: 'numeric',
                year: '2-digit',
            },
            medium: {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            },
            long: {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            },
            full: {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            },
        },
        time: {
            short: {
                hour: 'numeric',
                minute: 'numeric',
            },
            medium: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            },
            long: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short',
            },
            full: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short',
            },
        },
    };
    return IntlMessageFormat;
}());



/***/ }),

/***/ "./node_modules/intl-messageformat/lib/src/error.js":
/*!**********************************************************!*\
  !*** ./node_modules/intl-messageformat/lib/src/error.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorCode": () => (/* binding */ ErrorCode),
/* harmony export */   "FormatError": () => (/* binding */ FormatError),
/* harmony export */   "InvalidValueError": () => (/* binding */ InvalidValueError),
/* harmony export */   "InvalidValueTypeError": () => (/* binding */ InvalidValueTypeError),
/* harmony export */   "MissingValueError": () => (/* binding */ MissingValueError)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var ErrorCode;
(function (ErrorCode) {
    // When we have a placeholder but no value to format
    ErrorCode["MISSING_VALUE"] = "MISSING_VALUE";
    // When value supplied is invalid
    ErrorCode["INVALID_VALUE"] = "INVALID_VALUE";
    // When we need specific Intl API but it's not available
    ErrorCode["MISSING_INTL_API"] = "MISSING_INTL_API";
})(ErrorCode || (ErrorCode = {}));
var FormatError = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(FormatError, _super);
    function FormatError(msg, code, originalMessage) {
        var _this = _super.call(this, msg) || this;
        _this.code = code;
        _this.originalMessage = originalMessage;
        return _this;
    }
    FormatError.prototype.toString = function () {
        return "[formatjs Error: " + this.code + "] " + this.message;
    };
    return FormatError;
}(Error));

var InvalidValueError = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(InvalidValueError, _super);
    function InvalidValueError(variableId, value, options, originalMessage) {
        return _super.call(this, "Invalid values for \"" + variableId + "\": \"" + value + "\". Options are \"" + Object.keys(options).join('", "') + "\"", ErrorCode.INVALID_VALUE, originalMessage) || this;
    }
    return InvalidValueError;
}(FormatError));

var InvalidValueTypeError = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(InvalidValueTypeError, _super);
    function InvalidValueTypeError(value, type, originalMessage) {
        return _super.call(this, "Value for \"" + value + "\" must be of type " + type, ErrorCode.INVALID_VALUE, originalMessage) || this;
    }
    return InvalidValueTypeError;
}(FormatError));

var MissingValueError = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(MissingValueError, _super);
    function MissingValueError(variableId, originalMessage) {
        return _super.call(this, "The intl string context variable \"" + variableId + "\" was not provided to the string \"" + originalMessage + "\"", ErrorCode.MISSING_VALUE, originalMessage) || this;
    }
    return MissingValueError;
}(FormatError));



/***/ }),

/***/ "./node_modules/intl-messageformat/lib/src/formatters.js":
/*!***************************************************************!*\
  !*** ./node_modules/intl-messageformat/lib/src/formatters.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PART_TYPE": () => (/* binding */ PART_TYPE),
/* harmony export */   "isFormatXMLElementFn": () => (/* binding */ isFormatXMLElementFn),
/* harmony export */   "formatToParts": () => (/* binding */ formatToParts)
/* harmony export */ });
/* harmony import */ var _formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @formatjs/icu-messageformat-parser */ "./node_modules/@formatjs/icu-messageformat-parser/lib/index.js");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error */ "./node_modules/intl-messageformat/lib/src/error.js");


var PART_TYPE;
(function (PART_TYPE) {
    PART_TYPE[PART_TYPE["literal"] = 0] = "literal";
    PART_TYPE[PART_TYPE["object"] = 1] = "object";
})(PART_TYPE || (PART_TYPE = {}));
function mergeLiteral(parts) {
    if (parts.length < 2) {
        return parts;
    }
    return parts.reduce(function (all, part) {
        var lastPart = all[all.length - 1];
        if (!lastPart ||
            lastPart.type !== PART_TYPE.literal ||
            part.type !== PART_TYPE.literal) {
            all.push(part);
        }
        else {
            lastPart.value += part.value;
        }
        return all;
    }, []);
}
function isFormatXMLElementFn(el) {
    return typeof el === 'function';
}
// TODO(skeleton): add skeleton support
function formatToParts(els, locales, formatters, formats, values, currentPluralValue, 
// For debugging
originalMessage) {
    // Hot path for straight simple msg translations
    if (els.length === 1 && (0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isLiteralElement)(els[0])) {
        return [
            {
                type: PART_TYPE.literal,
                value: els[0].value,
            },
        ];
    }
    var result = [];
    for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
        var el = els_1[_i];
        // Exit early for string parts.
        if ((0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isLiteralElement)(el)) {
            result.push({
                type: PART_TYPE.literal,
                value: el.value,
            });
            continue;
        }
        // TODO: should this part be literal type?
        // Replace `#` in plural rules with the actual numeric value.
        if ((0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isPoundElement)(el)) {
            if (typeof currentPluralValue === 'number') {
                result.push({
                    type: PART_TYPE.literal,
                    value: formatters.getNumberFormat(locales).format(currentPluralValue),
                });
            }
            continue;
        }
        var varName = el.value;
        // Enforce that all required values are provided by the caller.
        if (!(values && varName in values)) {
            throw new _error__WEBPACK_IMPORTED_MODULE_1__.MissingValueError(varName, originalMessage);
        }
        var value = values[varName];
        if ((0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isArgumentElement)(el)) {
            if (!value || typeof value === 'string' || typeof value === 'number') {
                value =
                    typeof value === 'string' || typeof value === 'number'
                        ? String(value)
                        : '';
            }
            result.push({
                type: typeof value === 'string' ? PART_TYPE.literal : PART_TYPE.object,
                value: value,
            });
            continue;
        }
        // Recursively format plural and select parts' option — which can be a
        // nested pattern structure. The choosing of the option to use is
        // abstracted-by and delegated-to the part helper object.
        if ((0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isDateElement)(el)) {
            var style = typeof el.style === 'string'
                ? formats.date[el.style]
                : (0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isDateTimeSkeleton)(el.style)
                    ? el.style.parsedOptions
                    : undefined;
            result.push({
                type: PART_TYPE.literal,
                value: formatters
                    .getDateTimeFormat(locales, style)
                    .format(value),
            });
            continue;
        }
        if ((0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isTimeElement)(el)) {
            var style = typeof el.style === 'string'
                ? formats.time[el.style]
                : (0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isDateTimeSkeleton)(el.style)
                    ? el.style.parsedOptions
                    : undefined;
            result.push({
                type: PART_TYPE.literal,
                value: formatters
                    .getDateTimeFormat(locales, style)
                    .format(value),
            });
            continue;
        }
        if ((0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isNumberElement)(el)) {
            var style = typeof el.style === 'string'
                ? formats.number[el.style]
                : (0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isNumberSkeleton)(el.style)
                    ? el.style.parsedOptions
                    : undefined;
            if (style && style.scale) {
                value =
                    value *
                        (style.scale || 1);
            }
            result.push({
                type: PART_TYPE.literal,
                value: formatters
                    .getNumberFormat(locales, style)
                    .format(value),
            });
            continue;
        }
        if ((0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isTagElement)(el)) {
            var children = el.children, value_1 = el.value;
            var formatFn = values[value_1];
            if (!isFormatXMLElementFn(formatFn)) {
                throw new _error__WEBPACK_IMPORTED_MODULE_1__.InvalidValueTypeError(value_1, 'function', originalMessage);
            }
            var parts = formatToParts(children, locales, formatters, formats, values, currentPluralValue);
            var chunks = formatFn(parts.map(function (p) { return p.value; }));
            if (!Array.isArray(chunks)) {
                chunks = [chunks];
            }
            result.push.apply(result, chunks.map(function (c) {
                return {
                    type: typeof c === 'string' ? PART_TYPE.literal : PART_TYPE.object,
                    value: c,
                };
            }));
        }
        if ((0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isSelectElement)(el)) {
            var opt = el.options[value] || el.options.other;
            if (!opt) {
                throw new _error__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
            }
            result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values));
            continue;
        }
        if ((0,_formatjs_icu_messageformat_parser__WEBPACK_IMPORTED_MODULE_0__.isPluralElement)(el)) {
            var opt = el.options["=" + value];
            if (!opt) {
                if (!Intl.PluralRules) {
                    throw new _error__WEBPACK_IMPORTED_MODULE_1__.FormatError("Intl.PluralRules is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-pluralrules\"\n", _error__WEBPACK_IMPORTED_MODULE_1__.ErrorCode.MISSING_INTL_API, originalMessage);
                }
                var rule = formatters
                    .getPluralRules(locales, { type: el.pluralType })
                    .select(value - (el.offset || 0));
                opt = el.options[rule] || el.options.other;
            }
            if (!opt) {
                throw new _error__WEBPACK_IMPORTED_MODULE_1__.InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
            }
            result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values, value - (el.offset || 0)));
            continue;
        }
    }
    return mergeLiteral(result);
}


/***/ }),

/***/ "./node_modules/shaka-player/ui/controls.less":
/*!****************************************************!*\
  !*** ./node_modules/shaka-player/ui/controls.less ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/piexifjs/piexif.js":
/*!*****************************************!*\
  !*** ./node_modules/piexifjs/piexif.js ***!
  \*****************************************/
/***/ ((module, exports) => {

/* piexifjs

The MIT License (MIT)

Copyright (c) 2014, 2015 hMatoba(https://github.com/hMatoba)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

(function () {
    "use strict";
    var that = {};
    that.version = "1.0.4";

    that.remove = function (jpeg) {
        var b64 = false;
        if (jpeg.slice(0, 2) == "\xff\xd8") {
        } else if (jpeg.slice(0, 23) == "data:image/jpeg;base64," || jpeg.slice(0, 22) == "data:image/jpg;base64,") {
            jpeg = atob(jpeg.split(",")[1]);
            b64 = true;
        } else {
            throw new Error("Given data is not jpeg.");
        }
        
        var segments = splitIntoSegments(jpeg);
        var newSegments = segments.filter(function(seg){
          return  !(seg.slice(0, 2) == "\xff\xe1" &&
                   seg.slice(4, 10) == "Exif\x00\x00"); 
        });
        
        var new_data = newSegments.join("");
        if (b64) {
            new_data = "data:image/jpeg;base64," + btoa(new_data);
        }

        return new_data;
    };


    that.insert = function (exif, jpeg) {
        var b64 = false;
        if (exif.slice(0, 6) != "\x45\x78\x69\x66\x00\x00") {
            throw new Error("Given data is not exif.");
        }
        if (jpeg.slice(0, 2) == "\xff\xd8") {
        } else if (jpeg.slice(0, 23) == "data:image/jpeg;base64," || jpeg.slice(0, 22) == "data:image/jpg;base64,") {
            jpeg = atob(jpeg.split(",")[1]);
            b64 = true;
        } else {
            throw new Error("Given data is not jpeg.");
        }

        var exifStr = "\xff\xe1" + pack(">H", [exif.length + 2]) + exif;
        var segments = splitIntoSegments(jpeg);
        var new_data = mergeSegments(segments, exifStr);
        if (b64) {
            new_data = "data:image/jpeg;base64," + btoa(new_data);
        }

        return new_data;
    };


    that.load = function (data) {
        var input_data;
        if (typeof (data) == "string") {
            if (data.slice(0, 2) == "\xff\xd8") {
                input_data = data;
            } else if (data.slice(0, 23) == "data:image/jpeg;base64," || data.slice(0, 22) == "data:image/jpg;base64,") {
                input_data = atob(data.split(",")[1]);
            } else if (data.slice(0, 4) == "Exif") {
                input_data = data.slice(6);
            } else {
                throw new Error("'load' gots invalid file data.");
            }
        } else {
            throw new Error("'load' gots invalid type argument.");
        }

        var exifDict = {};
        var exif_dict = {
            "0th": {},
            "Exif": {},
            "GPS": {},
            "Interop": {},
            "1st": {},
            "thumbnail": null
        };
        var exifReader = new ExifReader(input_data);
        if (exifReader.tiftag === null) {
            return exif_dict;
        }

        if (exifReader.tiftag.slice(0, 2) == "\x49\x49") {
            exifReader.endian_mark = "<";
        } else {
            exifReader.endian_mark = ">";
        }

        var pointer = unpack(exifReader.endian_mark + "L",
            exifReader.tiftag.slice(4, 8))[0];
        exif_dict["0th"] = exifReader.get_ifd(pointer, "0th");

        var first_ifd_pointer = exif_dict["0th"]["first_ifd_pointer"];
        delete exif_dict["0th"]["first_ifd_pointer"];

        if (34665 in exif_dict["0th"]) {
            pointer = exif_dict["0th"][34665];
            exif_dict["Exif"] = exifReader.get_ifd(pointer, "Exif");
        }
        if (34853 in exif_dict["0th"]) {
            pointer = exif_dict["0th"][34853];
            exif_dict["GPS"] = exifReader.get_ifd(pointer, "GPS");
        }
        if (40965 in exif_dict["Exif"]) {
            pointer = exif_dict["Exif"][40965];
            exif_dict["Interop"] = exifReader.get_ifd(pointer, "Interop");
        }
        if (first_ifd_pointer != "\x00\x00\x00\x00") {
            pointer = unpack(exifReader.endian_mark + "L",
                first_ifd_pointer)[0];
            exif_dict["1st"] = exifReader.get_ifd(pointer, "1st");
            if ((513 in exif_dict["1st"]) && (514 in exif_dict["1st"])) {
                var end = exif_dict["1st"][513] + exif_dict["1st"][514];
                var thumb = exifReader.tiftag.slice(exif_dict["1st"][513], end);
                exif_dict["thumbnail"] = thumb;
            }
        }

        return exif_dict;
    };


    that.dump = function (exif_dict_original) {
        var TIFF_HEADER_LENGTH = 8;

        var exif_dict = copy(exif_dict_original);
        var header = "Exif\x00\x00\x4d\x4d\x00\x2a\x00\x00\x00\x08";
        var exif_is = false;
        var gps_is = false;
        var interop_is = false;
        var first_is = false;

        var zeroth_ifd,
            exif_ifd,
            interop_ifd,
            gps_ifd,
            first_ifd;
        
        if ("0th" in exif_dict) {
            zeroth_ifd = exif_dict["0th"];
        } else {
            zeroth_ifd = {};
        }
        
        if ((("Exif" in exif_dict) && (Object.keys(exif_dict["Exif"]).length)) ||
            (("Interop" in exif_dict) && (Object.keys(exif_dict["Interop"]).length))) {
            zeroth_ifd[34665] = 1;
            exif_is = true;
            exif_ifd = exif_dict["Exif"];
            if (("Interop" in exif_dict) && Object.keys(exif_dict["Interop"]).length) {
                exif_ifd[40965] = 1;
                interop_is = true;
                interop_ifd = exif_dict["Interop"];
            } else if (Object.keys(exif_ifd).indexOf(that.ExifIFD.InteroperabilityTag.toString()) > -1) {
                delete exif_ifd[40965];
            }
        } else if (Object.keys(zeroth_ifd).indexOf(that.ImageIFD.ExifTag.toString()) > -1) {
            delete zeroth_ifd[34665];
        }

        if (("GPS" in exif_dict) && (Object.keys(exif_dict["GPS"]).length)) {
            zeroth_ifd[that.ImageIFD.GPSTag] = 1;
            gps_is = true;
            gps_ifd = exif_dict["GPS"];
        } else if (Object.keys(zeroth_ifd).indexOf(that.ImageIFD.GPSTag.toString()) > -1) {
            delete zeroth_ifd[that.ImageIFD.GPSTag];
        }
        
        if (("1st" in exif_dict) &&
            ("thumbnail" in exif_dict) &&
            (exif_dict["thumbnail"] != null)) {
            first_is = true;
            exif_dict["1st"][513] = 1;
            exif_dict["1st"][514] = 1;
            first_ifd = exif_dict["1st"];
        }
        
        var zeroth_set = _dict_to_bytes(zeroth_ifd, "0th", 0);
        var zeroth_length = (zeroth_set[0].length + exif_is * 12 + gps_is * 12 + 4 +
            zeroth_set[1].length);

        var exif_set,
            exif_bytes = "",
            exif_length = 0,
            gps_set,
            gps_bytes = "",
            gps_length = 0,
            interop_set,
            interop_bytes = "",
            interop_length = 0,
            first_set,
            first_bytes = "",
            thumbnail;
        if (exif_is) {
            exif_set = _dict_to_bytes(exif_ifd, "Exif", zeroth_length);
            exif_length = exif_set[0].length + interop_is * 12 + exif_set[1].length;
        }
        if (gps_is) {
            gps_set = _dict_to_bytes(gps_ifd, "GPS", zeroth_length + exif_length);
            gps_bytes = gps_set.join("");
            gps_length = gps_bytes.length;
        }
        if (interop_is) {
            var offset = zeroth_length + exif_length + gps_length;
            interop_set = _dict_to_bytes(interop_ifd, "Interop", offset);
            interop_bytes = interop_set.join("");
            interop_length = interop_bytes.length;
        }
        if (first_is) {
            var offset = zeroth_length + exif_length + gps_length + interop_length;
            first_set = _dict_to_bytes(first_ifd, "1st", offset);
            thumbnail = _get_thumbnail(exif_dict["thumbnail"]);
            if (thumbnail.length > 64000) {
                throw new Error("Given thumbnail is too large. max 64kB");
            }
        }

        var exif_pointer = "",
            gps_pointer = "",
            interop_pointer = "",
            first_ifd_pointer = "\x00\x00\x00\x00";
        if (exif_is) {
            var pointer_value = TIFF_HEADER_LENGTH + zeroth_length;
            var pointer_str = pack(">L", [pointer_value]);
            var key = 34665;
            var key_str = pack(">H", [key]);
            var type_str = pack(">H", [TYPES["Long"]]);
            var length_str = pack(">L", [1]);
            exif_pointer = key_str + type_str + length_str + pointer_str;
        }
        if (gps_is) {
            var pointer_value = TIFF_HEADER_LENGTH + zeroth_length + exif_length;
            var pointer_str = pack(">L", [pointer_value]);
            var key = 34853;
            var key_str = pack(">H", [key]);
            var type_str = pack(">H", [TYPES["Long"]]);
            var length_str = pack(">L", [1]);
            gps_pointer = key_str + type_str + length_str + pointer_str;
        }
        if (interop_is) {
            var pointer_value = (TIFF_HEADER_LENGTH +
                zeroth_length + exif_length + gps_length);
            var pointer_str = pack(">L", [pointer_value]);
            var key = 40965;
            var key_str = pack(">H", [key]);
            var type_str = pack(">H", [TYPES["Long"]]);
            var length_str = pack(">L", [1]);
            interop_pointer = key_str + type_str + length_str + pointer_str;
        }
        if (first_is) {
            var pointer_value = (TIFF_HEADER_LENGTH + zeroth_length +
                exif_length + gps_length + interop_length);
            first_ifd_pointer = pack(">L", [pointer_value]);
            var thumbnail_pointer = (pointer_value + first_set[0].length + 24 +
                4 + first_set[1].length);
            var thumbnail_p_bytes = ("\x02\x01\x00\x04\x00\x00\x00\x01" +
                pack(">L", [thumbnail_pointer]));
            var thumbnail_length_bytes = ("\x02\x02\x00\x04\x00\x00\x00\x01" +
                pack(">L", [thumbnail.length]));
            first_bytes = (first_set[0] + thumbnail_p_bytes +
                thumbnail_length_bytes + "\x00\x00\x00\x00" +
                first_set[1] + thumbnail);
        }

        var zeroth_bytes = (zeroth_set[0] + exif_pointer + gps_pointer +
            first_ifd_pointer + zeroth_set[1]);
        if (exif_is) {
            exif_bytes = exif_set[0] + interop_pointer + exif_set[1];
        }

        return (header + zeroth_bytes + exif_bytes + gps_bytes +
            interop_bytes + first_bytes);
    };


    function copy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }


    function _get_thumbnail(jpeg) {
        var segments = splitIntoSegments(jpeg);
        while (("\xff\xe0" <= segments[1].slice(0, 2)) && (segments[1].slice(0, 2) <= "\xff\xef")) {
            segments = [segments[0]].concat(segments.slice(2));
        }
        return segments.join("");
    }


    function _pack_byte(array) {
        return pack(">" + nStr("B", array.length), array);
    }


    function _pack_short(array) {
        return pack(">" + nStr("H", array.length), array);
    }


    function _pack_long(array) {
        return pack(">" + nStr("L", array.length), array);
    }


    function _value_to_bytes(raw_value, value_type, offset) {
        var four_bytes_over = "";
        var value_str = "";
        var length,
            new_value,
            num,
            den;

        if (value_type == "Byte") {
            length = raw_value.length;
            if (length <= 4) {
                value_str = (_pack_byte(raw_value) +
                    nStr("\x00", 4 - length));
            } else {
                value_str = pack(">L", [offset]);
                four_bytes_over = _pack_byte(raw_value);
            }
        } else if (value_type == "Short") {
            length = raw_value.length;
            if (length <= 2) {
                value_str = (_pack_short(raw_value) +
                    nStr("\x00\x00", 2 - length));
            } else {
                value_str = pack(">L", [offset]);
                four_bytes_over = _pack_short(raw_value);
            }
        } else if (value_type == "Long") {
            length = raw_value.length;
            if (length <= 1) {
                value_str = _pack_long(raw_value);
            } else {
                value_str = pack(">L", [offset]);
                four_bytes_over = _pack_long(raw_value);
            }
        } else if (value_type == "Ascii") {
            new_value = raw_value + "\x00";
            length = new_value.length;
            if (length > 4) {
                value_str = pack(">L", [offset]);
                four_bytes_over = new_value;
            } else {
                value_str = new_value + nStr("\x00", 4 - length);
            }
        } else if (value_type == "Rational") {
            if (typeof (raw_value[0]) == "number") {
                length = 1;
                num = raw_value[0];
                den = raw_value[1];
                new_value = pack(">L", [num]) + pack(">L", [den]);
            } else {
                length = raw_value.length;
                new_value = "";
                for (var n = 0; n < length; n++) {
                    num = raw_value[n][0];
                    den = raw_value[n][1];
                    new_value += (pack(">L", [num]) +
                        pack(">L", [den]));
                }
            }
            value_str = pack(">L", [offset]);
            four_bytes_over = new_value;
        } else if (value_type == "SRational") {
            if (typeof (raw_value[0]) == "number") {
                length = 1;
                num = raw_value[0];
                den = raw_value[1];
                new_value = pack(">l", [num]) + pack(">l", [den]);
            } else {
                length = raw_value.length;
                new_value = "";
                for (var n = 0; n < length; n++) {
                    num = raw_value[n][0];
                    den = raw_value[n][1];
                    new_value += (pack(">l", [num]) +
                        pack(">l", [den]));
                }
            }
            value_str = pack(">L", [offset]);
            four_bytes_over = new_value;
        } else if (value_type == "Undefined") {
            length = raw_value.length;
            if (length > 4) {
                value_str = pack(">L", [offset]);
                four_bytes_over = raw_value;
            } else {
                value_str = raw_value + nStr("\x00", 4 - length);
            }
        }

        var length_str = pack(">L", [length]);

        return [length_str, value_str, four_bytes_over];
    }

    function _dict_to_bytes(ifd_dict, ifd, ifd_offset) {
        var TIFF_HEADER_LENGTH = 8;
        var tag_count = Object.keys(ifd_dict).length;
        var entry_header = pack(">H", [tag_count]);
        var entries_length;
        if (["0th", "1st"].indexOf(ifd) > -1) {
            entries_length = 2 + tag_count * 12 + 4;
        } else {
            entries_length = 2 + tag_count * 12;
        }
        var entries = "";
        var values = "";
        var key;

        for (var key in ifd_dict) {
            if (typeof (key) == "string") {
                key = parseInt(key);
            }
            if ((ifd == "0th") && ([34665, 34853].indexOf(key) > -1)) {
                continue;
            } else if ((ifd == "Exif") && (key == 40965)) {
                continue;
            } else if ((ifd == "1st") && ([513, 514].indexOf(key) > -1)) {
                continue;
            }

            var raw_value = ifd_dict[key];
            var key_str = pack(">H", [key]);
            var value_type = TAGS[ifd][key]["type"];
            var type_str = pack(">H", [TYPES[value_type]]);

            if (typeof (raw_value) == "number") {
                raw_value = [raw_value];
            }
            var offset = TIFF_HEADER_LENGTH + entries_length + ifd_offset + values.length;
            var b = _value_to_bytes(raw_value, value_type, offset);
            var length_str = b[0];
            var value_str = b[1];
            var four_bytes_over = b[2];

            entries += key_str + type_str + length_str + value_str;
            values += four_bytes_over;
        }

        return [entry_header + entries, values];
    }



    function ExifReader(data) {
        var segments,
            app1;
        if (data.slice(0, 2) == "\xff\xd8") { // JPEG
            segments = splitIntoSegments(data);
            app1 = getExifSeg(segments);
            if (app1) {
                this.tiftag = app1.slice(10);
            } else {
                this.tiftag = null;
            }
        } else if (["\x49\x49", "\x4d\x4d"].indexOf(data.slice(0, 2)) > -1) { // TIFF
            this.tiftag = data;
        } else if (data.slice(0, 4) == "Exif") { // Exif
            this.tiftag = data.slice(6);
        } else {
            throw new Error("Given file is neither JPEG nor TIFF.");
        }
    }

    ExifReader.prototype = {
        get_ifd: function (pointer, ifd_name) {
            var ifd_dict = {};
            var tag_count = unpack(this.endian_mark + "H",
                this.tiftag.slice(pointer, pointer + 2))[0];
            var offset = pointer + 2;
            var t;
            if (["0th", "1st"].indexOf(ifd_name) > -1) {
                t = "Image";
            } else {
                t = ifd_name;
            }

            for (var x = 0; x < tag_count; x++) {
                pointer = offset + 12 * x;
                var tag = unpack(this.endian_mark + "H",
                    this.tiftag.slice(pointer, pointer + 2))[0];
                var value_type = unpack(this.endian_mark + "H",
                    this.tiftag.slice(pointer + 2, pointer + 4))[0];
                var value_num = unpack(this.endian_mark + "L",
                    this.tiftag.slice(pointer + 4, pointer + 8))[0];
                var value = this.tiftag.slice(pointer + 8, pointer + 12);

                var v_set = [value_type, value_num, value];
                if (tag in TAGS[t]) {
                    ifd_dict[tag] = this.convert_value(v_set);
                }
            }

            if (ifd_name == "0th") {
                pointer = offset + 12 * tag_count;
                ifd_dict["first_ifd_pointer"] = this.tiftag.slice(pointer, pointer + 4);
            }

            return ifd_dict;
        },

        convert_value: function (val) {
            var data = null;
            var t = val[0];
            var length = val[1];
            var value = val[2];
            var pointer;

            if (t == 1) { // BYTE
                if (length > 4) {
                    pointer = unpack(this.endian_mark + "L", value)[0];
                    data = unpack(this.endian_mark + nStr("B", length),
                        this.tiftag.slice(pointer, pointer + length));
                } else {
                    data = unpack(this.endian_mark + nStr("B", length), value.slice(0, length));
                }
            } else if (t == 2) { // ASCII
                if (length > 4) {
                    pointer = unpack(this.endian_mark + "L", value)[0];
                    data = this.tiftag.slice(pointer, pointer + length - 1);
                } else {
                    data = value.slice(0, length - 1);
                }
            } else if (t == 3) { // SHORT
                if (length > 2) {
                    pointer = unpack(this.endian_mark + "L", value)[0];
                    data = unpack(this.endian_mark + nStr("H", length),
                        this.tiftag.slice(pointer, pointer + length * 2));
                } else {
                    data = unpack(this.endian_mark + nStr("H", length),
                        value.slice(0, length * 2));
                }
            } else if (t == 4) { // LONG
                if (length > 1) {
                    pointer = unpack(this.endian_mark + "L", value)[0];
                    data = unpack(this.endian_mark + nStr("L", length),
                        this.tiftag.slice(pointer, pointer + length * 4));
                } else {
                    data = unpack(this.endian_mark + nStr("L", length),
                        value);
                }
            } else if (t == 5) { // RATIONAL
                pointer = unpack(this.endian_mark + "L", value)[0];
                if (length > 1) {
                    data = [];
                    for (var x = 0; x < length; x++) {
                        data.push([unpack(this.endian_mark + "L",
                                this.tiftag.slice(pointer + x * 8, pointer + 4 + x * 8))[0],
                                   unpack(this.endian_mark + "L",
                                this.tiftag.slice(pointer + 4 + x * 8, pointer + 8 + x * 8))[0]
                                   ]);
                    }
                } else {
                    data = [unpack(this.endian_mark + "L",
                            this.tiftag.slice(pointer, pointer + 4))[0],
                            unpack(this.endian_mark + "L",
                            this.tiftag.slice(pointer + 4, pointer + 8))[0]
                            ];
                }
            } else if (t == 7) { // UNDEFINED BYTES
                if (length > 4) {
                    pointer = unpack(this.endian_mark + "L", value)[0];
                    data = this.tiftag.slice(pointer, pointer + length);
                } else {
                    data = value.slice(0, length);
                }
            } else if (t == 9) { // SLONG
                if (length > 1) {
                    pointer = unpack(this.endian_mark + "L", value)[0];
                    data = unpack(this.endian_mark + nStr("l", length),
                        this.tiftag.slice(pointer, pointer + length * 4));
                } else {
                    data = unpack(this.endian_mark + nStr("l", length),
                        value);
                }
            } else if (t == 10) { // SRATIONAL
                pointer = unpack(this.endian_mark + "L", value)[0];
                if (length > 1) {
                    data = [];
                    for (var x = 0; x < length; x++) {
                        data.push([unpack(this.endian_mark + "l",
                                this.tiftag.slice(pointer + x * 8, pointer + 4 + x * 8))[0],
                                   unpack(this.endian_mark + "l",
                                this.tiftag.slice(pointer + 4 + x * 8, pointer + 8 + x * 8))[0]
                                  ]);
                    }
                } else {
                    data = [unpack(this.endian_mark + "l",
                            this.tiftag.slice(pointer, pointer + 4))[0],
                            unpack(this.endian_mark + "l",
                            this.tiftag.slice(pointer + 4, pointer + 8))[0]
                           ];
                }
            } else {
                throw new Error("Exif might be wrong. Got incorrect value " +
                    "type to decode. type:" + t);
            }

            if ((data instanceof Array) && (data.length == 1)) {
                return data[0];
            } else {
                return data;
            }
        },
    };


    if (typeof window !== "undefined" && typeof window.btoa === "function") {
        var btoa = window.btoa;
    }
    if (typeof btoa === "undefined") {
        var btoa = function (input) {        var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

            while (i < input.length) {

                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                keyStr.charAt(enc3) + keyStr.charAt(enc4);

            }

            return output;
        };
    }
    
    
    if (typeof window !== "undefined" && typeof window.atob === "function") {
        var atob = window.atob;
    }
    if (typeof atob === "undefined") {
        var atob = function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length) {

                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

            }

            return output;
        };
    }


    function getImageSize(imageArray) {
        var segments = slice2Segments(imageArray);
        var seg,
            width,
            height,
            SOF = [192, 193, 194, 195, 197, 198, 199, 201, 202, 203, 205, 206, 207];

        for (var x = 0; x < segments.length; x++) {
            seg = segments[x];
            if (SOF.indexOf(seg[1]) >= 0) {
                height = seg[5] * 256 + seg[6];
                width = seg[7] * 256 + seg[8];
                break;
            }
        }
        return [width, height];
    }


    function pack(mark, array) {
        if (!(array instanceof Array)) {
            throw new Error("'pack' error. Got invalid type argument.");
        }
        if ((mark.length - 1) != array.length) {
            throw new Error("'pack' error. " + (mark.length - 1) + " marks, " + array.length + " elements.");
        }

        var littleEndian;
        if (mark[0] == "<") {
            littleEndian = true;
        } else if (mark[0] == ">") {
            littleEndian = false;
        } else {
            throw new Error("");
        }
        var packed = "";
        var p = 1;
        var val = null;
        var c = null;
        var valStr = null;

        while (c = mark[p]) {
            if (c.toLowerCase() == "b") {
                val = array[p - 1];
                if ((c == "b") && (val < 0)) {
                    val += 0x100;
                }
                if ((val > 0xff) || (val < 0)) {
                    throw new Error("'pack' error.");
                } else {
                    valStr = String.fromCharCode(val);
                }
            } else if (c == "H") {
                val = array[p - 1];
                if ((val > 0xffff) || (val < 0)) {
                    throw new Error("'pack' error.");
                } else {
                    valStr = String.fromCharCode(Math.floor((val % 0x10000) / 0x100)) +
                        String.fromCharCode(val % 0x100);
                    if (littleEndian) {
                        valStr = valStr.split("").reverse().join("");
                    }
                }
            } else if (c.toLowerCase() == "l") {
                val = array[p - 1];
                if ((c == "l") && (val < 0)) {
                    val += 0x100000000;
                }
                if ((val > 0xffffffff) || (val < 0)) {
                    throw new Error("'pack' error.");
                } else {
                    valStr = String.fromCharCode(Math.floor(val / 0x1000000)) +
                        String.fromCharCode(Math.floor((val % 0x1000000) / 0x10000)) +
                        String.fromCharCode(Math.floor((val % 0x10000) / 0x100)) +
                        String.fromCharCode(val % 0x100);
                    if (littleEndian) {
                        valStr = valStr.split("").reverse().join("");
                    }
                }
            } else {
                throw new Error("'pack' error.");
            }

            packed += valStr;
            p += 1;
        }

        return packed;
    }

    function unpack(mark, str) {
        if (typeof (str) != "string") {
            throw new Error("'unpack' error. Got invalid type argument.");
        }
        var l = 0;
        for (var markPointer = 1; markPointer < mark.length; markPointer++) {
            if (mark[markPointer].toLowerCase() == "b") {
                l += 1;
            } else if (mark[markPointer].toLowerCase() == "h") {
                l += 2;
            } else if (mark[markPointer].toLowerCase() == "l") {
                l += 4;
            } else {
                throw new Error("'unpack' error. Got invalid mark.");
            }
        }

        if (l != str.length) {
            throw new Error("'unpack' error. Mismatch between symbol and string length. " + l + ":" + str.length);
        }

        var littleEndian;
        if (mark[0] == "<") {
            littleEndian = true;
        } else if (mark[0] == ">") {
            littleEndian = false;
        } else {
            throw new Error("'unpack' error.");
        }
        var unpacked = [];
        var strPointer = 0;
        var p = 1;
        var val = null;
        var c = null;
        var length = null;
        var sliced = "";

        while (c = mark[p]) {
            if (c.toLowerCase() == "b") {
                length = 1;
                sliced = str.slice(strPointer, strPointer + length);
                val = sliced.charCodeAt(0);
                if ((c == "b") && (val >= 0x80)) {
                    val -= 0x100;
                }
            } else if (c == "H") {
                length = 2;
                sliced = str.slice(strPointer, strPointer + length);
                if (littleEndian) {
                    sliced = sliced.split("").reverse().join("");
                }
                val = sliced.charCodeAt(0) * 0x100 +
                    sliced.charCodeAt(1);
            } else if (c.toLowerCase() == "l") {
                length = 4;
                sliced = str.slice(strPointer, strPointer + length);
                if (littleEndian) {
                    sliced = sliced.split("").reverse().join("");
                }
                val = sliced.charCodeAt(0) * 0x1000000 +
                    sliced.charCodeAt(1) * 0x10000 +
                    sliced.charCodeAt(2) * 0x100 +
                    sliced.charCodeAt(3);
                if ((c == "l") && (val >= 0x80000000)) {
                    val -= 0x100000000;
                }
            } else {
                throw new Error("'unpack' error. " + c);
            }

            unpacked.push(val);
            strPointer += length;
            p += 1;
        }

        return unpacked;
    }

    function nStr(ch, num) {
        var str = "";
        for (var i = 0; i < num; i++) {
            str += ch;
        }
        return str;
    }

    function splitIntoSegments(data) {
        if (data.slice(0, 2) != "\xff\xd8") {
            throw new Error("Given data isn't JPEG.");
        }

        var head = 2;
        var segments = ["\xff\xd8"];
        while (true) {
            if (data.slice(head, head + 2) == "\xff\xda") {
                segments.push(data.slice(head));
                break;
            } else {
                var length = unpack(">H", data.slice(head + 2, head + 4))[0];
                var endPoint = head + length + 2;
                segments.push(data.slice(head, endPoint));
                head = endPoint;
            }

            if (head >= data.length) {
                throw new Error("Wrong JPEG data.");
            }
        }
        return segments;
    }


    function getExifSeg(segments) {
        var seg;
        for (var i = 0; i < segments.length; i++) {
            seg = segments[i];
            if (seg.slice(0, 2) == "\xff\xe1" &&
                   seg.slice(4, 10) == "Exif\x00\x00") {
                return seg;
            }
        }
        return null;
    }


    function mergeSegments(segments, exif) {
        var hasExifSegment = false;
        var additionalAPP1ExifSegments = [];

        segments.forEach(function(segment, i) {
            // Replace first occurence of APP1:Exif segment
            if (segment.slice(0, 2) == "\xff\xe1" &&
                segment.slice(4, 10) == "Exif\x00\x00"
            ) {
                if (!hasExifSegment) {
                    segments[i] = exif;
                    hasExifSegment = true;
                } else {
                    additionalAPP1ExifSegments.unshift(i);
                }
            }
        });

        // Remove additional occurences of APP1:Exif segment
        additionalAPP1ExifSegments.forEach(function(segmentIndex) {
            segments.splice(segmentIndex, 1);
        });

        if (!hasExifSegment && exif) {
            segments = [segments[0], exif].concat(segments.slice(1));
        }

        return segments.join("");
    }


    function toHex(str) {
        var hexStr = "";
        for (var i = 0; i < str.length; i++) {
            var h = str.charCodeAt(i);
            var hex = ((h < 10) ? "0" : "") + h.toString(16);
            hexStr += hex + " ";
        }
        return hexStr;
    }


    var TYPES = {
        "Byte": 1,
        "Ascii": 2,
        "Short": 3,
        "Long": 4,
        "Rational": 5,
        "Undefined": 7,
        "SLong": 9,
        "SRational": 10
    };


    var TAGS = {
        'Image': {
            11: {
                'name': 'ProcessingSoftware',
                'type': 'Ascii'
            },
            254: {
                'name': 'NewSubfileType',
                'type': 'Long'
            },
            255: {
                'name': 'SubfileType',
                'type': 'Short'
            },
            256: {
                'name': 'ImageWidth',
                'type': 'Long'
            },
            257: {
                'name': 'ImageLength',
                'type': 'Long'
            },
            258: {
                'name': 'BitsPerSample',
                'type': 'Short'
            },
            259: {
                'name': 'Compression',
                'type': 'Short'
            },
            262: {
                'name': 'PhotometricInterpretation',
                'type': 'Short'
            },
            263: {
                'name': 'Threshholding',
                'type': 'Short'
            },
            264: {
                'name': 'CellWidth',
                'type': 'Short'
            },
            265: {
                'name': 'CellLength',
                'type': 'Short'
            },
            266: {
                'name': 'FillOrder',
                'type': 'Short'
            },
            269: {
                'name': 'DocumentName',
                'type': 'Ascii'
            },
            270: {
                'name': 'ImageDescription',
                'type': 'Ascii'
            },
            271: {
                'name': 'Make',
                'type': 'Ascii'
            },
            272: {
                'name': 'Model',
                'type': 'Ascii'
            },
            273: {
                'name': 'StripOffsets',
                'type': 'Long'
            },
            274: {
                'name': 'Orientation',
                'type': 'Short'
            },
            277: {
                'name': 'SamplesPerPixel',
                'type': 'Short'
            },
            278: {
                'name': 'RowsPerStrip',
                'type': 'Long'
            },
            279: {
                'name': 'StripByteCounts',
                'type': 'Long'
            },
            282: {
                'name': 'XResolution',
                'type': 'Rational'
            },
            283: {
                'name': 'YResolution',
                'type': 'Rational'
            },
            284: {
                'name': 'PlanarConfiguration',
                'type': 'Short'
            },
            290: {
                'name': 'GrayResponseUnit',
                'type': 'Short'
            },
            291: {
                'name': 'GrayResponseCurve',
                'type': 'Short'
            },
            292: {
                'name': 'T4Options',
                'type': 'Long'
            },
            293: {
                'name': 'T6Options',
                'type': 'Long'
            },
            296: {
                'name': 'ResolutionUnit',
                'type': 'Short'
            },
            301: {
                'name': 'TransferFunction',
                'type': 'Short'
            },
            305: {
                'name': 'Software',
                'type': 'Ascii'
            },
            306: {
                'name': 'DateTime',
                'type': 'Ascii'
            },
            315: {
                'name': 'Artist',
                'type': 'Ascii'
            },
            316: {
                'name': 'HostComputer',
                'type': 'Ascii'
            },
            317: {
                'name': 'Predictor',
                'type': 'Short'
            },
            318: {
                'name': 'WhitePoint',
                'type': 'Rational'
            },
            319: {
                'name': 'PrimaryChromaticities',
                'type': 'Rational'
            },
            320: {
                'name': 'ColorMap',
                'type': 'Short'
            },
            321: {
                'name': 'HalftoneHints',
                'type': 'Short'
            },
            322: {
                'name': 'TileWidth',
                'type': 'Short'
            },
            323: {
                'name': 'TileLength',
                'type': 'Short'
            },
            324: {
                'name': 'TileOffsets',
                'type': 'Short'
            },
            325: {
                'name': 'TileByteCounts',
                'type': 'Short'
            },
            330: {
                'name': 'SubIFDs',
                'type': 'Long'
            },
            332: {
                'name': 'InkSet',
                'type': 'Short'
            },
            333: {
                'name': 'InkNames',
                'type': 'Ascii'
            },
            334: {
                'name': 'NumberOfInks',
                'type': 'Short'
            },
            336: {
                'name': 'DotRange',
                'type': 'Byte'
            },
            337: {
                'name': 'TargetPrinter',
                'type': 'Ascii'
            },
            338: {
                'name': 'ExtraSamples',
                'type': 'Short'
            },
            339: {
                'name': 'SampleFormat',
                'type': 'Short'
            },
            340: {
                'name': 'SMinSampleValue',
                'type': 'Short'
            },
            341: {
                'name': 'SMaxSampleValue',
                'type': 'Short'
            },
            342: {
                'name': 'TransferRange',
                'type': 'Short'
            },
            343: {
                'name': 'ClipPath',
                'type': 'Byte'
            },
            344: {
                'name': 'XClipPathUnits',
                'type': 'Long'
            },
            345: {
                'name': 'YClipPathUnits',
                'type': 'Long'
            },
            346: {
                'name': 'Indexed',
                'type': 'Short'
            },
            347: {
                'name': 'JPEGTables',
                'type': 'Undefined'
            },
            351: {
                'name': 'OPIProxy',
                'type': 'Short'
            },
            512: {
                'name': 'JPEGProc',
                'type': 'Long'
            },
            513: {
                'name': 'JPEGInterchangeFormat',
                'type': 'Long'
            },
            514: {
                'name': 'JPEGInterchangeFormatLength',
                'type': 'Long'
            },
            515: {
                'name': 'JPEGRestartInterval',
                'type': 'Short'
            },
            517: {
                'name': 'JPEGLosslessPredictors',
                'type': 'Short'
            },
            518: {
                'name': 'JPEGPointTransforms',
                'type': 'Short'
            },
            519: {
                'name': 'JPEGQTables',
                'type': 'Long'
            },
            520: {
                'name': 'JPEGDCTables',
                'type': 'Long'
            },
            521: {
                'name': 'JPEGACTables',
                'type': 'Long'
            },
            529: {
                'name': 'YCbCrCoefficients',
                'type': 'Rational'
            },
            530: {
                'name': 'YCbCrSubSampling',
                'type': 'Short'
            },
            531: {
                'name': 'YCbCrPositioning',
                'type': 'Short'
            },
            532: {
                'name': 'ReferenceBlackWhite',
                'type': 'Rational'
            },
            700: {
                'name': 'XMLPacket',
                'type': 'Byte'
            },
            18246: {
                'name': 'Rating',
                'type': 'Short'
            },
            18249: {
                'name': 'RatingPercent',
                'type': 'Short'
            },
            32781: {
                'name': 'ImageID',
                'type': 'Ascii'
            },
            33421: {
                'name': 'CFARepeatPatternDim',
                'type': 'Short'
            },
            33422: {
                'name': 'CFAPattern',
                'type': 'Byte'
            },
            33423: {
                'name': 'BatteryLevel',
                'type': 'Rational'
            },
            33432: {
                'name': 'Copyright',
                'type': 'Ascii'
            },
            33434: {
                'name': 'ExposureTime',
                'type': 'Rational'
            },
            34377: {
                'name': 'ImageResources',
                'type': 'Byte'
            },
            34665: {
                'name': 'ExifTag',
                'type': 'Long'
            },
            34675: {
                'name': 'InterColorProfile',
                'type': 'Undefined'
            },
            34853: {
                'name': 'GPSTag',
                'type': 'Long'
            },
            34857: {
                'name': 'Interlace',
                'type': 'Short'
            },
            34858: {
                'name': 'TimeZoneOffset',
                'type': 'Long'
            },
            34859: {
                'name': 'SelfTimerMode',
                'type': 'Short'
            },
            37387: {
                'name': 'FlashEnergy',
                'type': 'Rational'
            },
            37388: {
                'name': 'SpatialFrequencyResponse',
                'type': 'Undefined'
            },
            37389: {
                'name': 'Noise',
                'type': 'Undefined'
            },
            37390: {
                'name': 'FocalPlaneXResolution',
                'type': 'Rational'
            },
            37391: {
                'name': 'FocalPlaneYResolution',
                'type': 'Rational'
            },
            37392: {
                'name': 'FocalPlaneResolutionUnit',
                'type': 'Short'
            },
            37393: {
                'name': 'ImageNumber',
                'type': 'Long'
            },
            37394: {
                'name': 'SecurityClassification',
                'type': 'Ascii'
            },
            37395: {
                'name': 'ImageHistory',
                'type': 'Ascii'
            },
            37397: {
                'name': 'ExposureIndex',
                'type': 'Rational'
            },
            37398: {
                'name': 'TIFFEPStandardID',
                'type': 'Byte'
            },
            37399: {
                'name': 'SensingMethod',
                'type': 'Short'
            },
            40091: {
                'name': 'XPTitle',
                'type': 'Byte'
            },
            40092: {
                'name': 'XPComment',
                'type': 'Byte'
            },
            40093: {
                'name': 'XPAuthor',
                'type': 'Byte'
            },
            40094: {
                'name': 'XPKeywords',
                'type': 'Byte'
            },
            40095: {
                'name': 'XPSubject',
                'type': 'Byte'
            },
            50341: {
                'name': 'PrintImageMatching',
                'type': 'Undefined'
            },
            50706: {
                'name': 'DNGVersion',
                'type': 'Byte'
            },
            50707: {
                'name': 'DNGBackwardVersion',
                'type': 'Byte'
            },
            50708: {
                'name': 'UniqueCameraModel',
                'type': 'Ascii'
            },
            50709: {
                'name': 'LocalizedCameraModel',
                'type': 'Byte'
            },
            50710: {
                'name': 'CFAPlaneColor',
                'type': 'Byte'
            },
            50711: {
                'name': 'CFALayout',
                'type': 'Short'
            },
            50712: {
                'name': 'LinearizationTable',
                'type': 'Short'
            },
            50713: {
                'name': 'BlackLevelRepeatDim',
                'type': 'Short'
            },
            50714: {
                'name': 'BlackLevel',
                'type': 'Rational'
            },
            50715: {
                'name': 'BlackLevelDeltaH',
                'type': 'SRational'
            },
            50716: {
                'name': 'BlackLevelDeltaV',
                'type': 'SRational'
            },
            50717: {
                'name': 'WhiteLevel',
                'type': 'Short'
            },
            50718: {
                'name': 'DefaultScale',
                'type': 'Rational'
            },
            50719: {
                'name': 'DefaultCropOrigin',
                'type': 'Short'
            },
            50720: {
                'name': 'DefaultCropSize',
                'type': 'Short'
            },
            50721: {
                'name': 'ColorMatrix1',
                'type': 'SRational'
            },
            50722: {
                'name': 'ColorMatrix2',
                'type': 'SRational'
            },
            50723: {
                'name': 'CameraCalibration1',
                'type': 'SRational'
            },
            50724: {
                'name': 'CameraCalibration2',
                'type': 'SRational'
            },
            50725: {
                'name': 'ReductionMatrix1',
                'type': 'SRational'
            },
            50726: {
                'name': 'ReductionMatrix2',
                'type': 'SRational'
            },
            50727: {
                'name': 'AnalogBalance',
                'type': 'Rational'
            },
            50728: {
                'name': 'AsShotNeutral',
                'type': 'Short'
            },
            50729: {
                'name': 'AsShotWhiteXY',
                'type': 'Rational'
            },
            50730: {
                'name': 'BaselineExposure',
                'type': 'SRational'
            },
            50731: {
                'name': 'BaselineNoise',
                'type': 'Rational'
            },
            50732: {
                'name': 'BaselineSharpness',
                'type': 'Rational'
            },
            50733: {
                'name': 'BayerGreenSplit',
                'type': 'Long'
            },
            50734: {
                'name': 'LinearResponseLimit',
                'type': 'Rational'
            },
            50735: {
                'name': 'CameraSerialNumber',
                'type': 'Ascii'
            },
            50736: {
                'name': 'LensInfo',
                'type': 'Rational'
            },
            50737: {
                'name': 'ChromaBlurRadius',
                'type': 'Rational'
            },
            50738: {
                'name': 'AntiAliasStrength',
                'type': 'Rational'
            },
            50739: {
                'name': 'ShadowScale',
                'type': 'SRational'
            },
            50740: {
                'name': 'DNGPrivateData',
                'type': 'Byte'
            },
            50741: {
                'name': 'MakerNoteSafety',
                'type': 'Short'
            },
            50778: {
                'name': 'CalibrationIlluminant1',
                'type': 'Short'
            },
            50779: {
                'name': 'CalibrationIlluminant2',
                'type': 'Short'
            },
            50780: {
                'name': 'BestQualityScale',
                'type': 'Rational'
            },
            50781: {
                'name': 'RawDataUniqueID',
                'type': 'Byte'
            },
            50827: {
                'name': 'OriginalRawFileName',
                'type': 'Byte'
            },
            50828: {
                'name': 'OriginalRawFileData',
                'type': 'Undefined'
            },
            50829: {
                'name': 'ActiveArea',
                'type': 'Short'
            },
            50830: {
                'name': 'MaskedAreas',
                'type': 'Short'
            },
            50831: {
                'name': 'AsShotICCProfile',
                'type': 'Undefined'
            },
            50832: {
                'name': 'AsShotPreProfileMatrix',
                'type': 'SRational'
            },
            50833: {
                'name': 'CurrentICCProfile',
                'type': 'Undefined'
            },
            50834: {
                'name': 'CurrentPreProfileMatrix',
                'type': 'SRational'
            },
            50879: {
                'name': 'ColorimetricReference',
                'type': 'Short'
            },
            50931: {
                'name': 'CameraCalibrationSignature',
                'type': 'Byte'
            },
            50932: {
                'name': 'ProfileCalibrationSignature',
                'type': 'Byte'
            },
            50934: {
                'name': 'AsShotProfileName',
                'type': 'Byte'
            },
            50935: {
                'name': 'NoiseReductionApplied',
                'type': 'Rational'
            },
            50936: {
                'name': 'ProfileName',
                'type': 'Byte'
            },
            50937: {
                'name': 'ProfileHueSatMapDims',
                'type': 'Long'
            },
            50938: {
                'name': 'ProfileHueSatMapData1',
                'type': 'Float'
            },
            50939: {
                'name': 'ProfileHueSatMapData2',
                'type': 'Float'
            },
            50940: {
                'name': 'ProfileToneCurve',
                'type': 'Float'
            },
            50941: {
                'name': 'ProfileEmbedPolicy',
                'type': 'Long'
            },
            50942: {
                'name': 'ProfileCopyright',
                'type': 'Byte'
            },
            50964: {
                'name': 'ForwardMatrix1',
                'type': 'SRational'
            },
            50965: {
                'name': 'ForwardMatrix2',
                'type': 'SRational'
            },
            50966: {
                'name': 'PreviewApplicationName',
                'type': 'Byte'
            },
            50967: {
                'name': 'PreviewApplicationVersion',
                'type': 'Byte'
            },
            50968: {
                'name': 'PreviewSettingsName',
                'type': 'Byte'
            },
            50969: {
                'name': 'PreviewSettingsDigest',
                'type': 'Byte'
            },
            50970: {
                'name': 'PreviewColorSpace',
                'type': 'Long'
            },
            50971: {
                'name': 'PreviewDateTime',
                'type': 'Ascii'
            },
            50972: {
                'name': 'RawImageDigest',
                'type': 'Undefined'
            },
            50973: {
                'name': 'OriginalRawFileDigest',
                'type': 'Undefined'
            },
            50974: {
                'name': 'SubTileBlockSize',
                'type': 'Long'
            },
            50975: {
                'name': 'RowInterleaveFactor',
                'type': 'Long'
            },
            50981: {
                'name': 'ProfileLookTableDims',
                'type': 'Long'
            },
            50982: {
                'name': 'ProfileLookTableData',
                'type': 'Float'
            },
            51008: {
                'name': 'OpcodeList1',
                'type': 'Undefined'
            },
            51009: {
                'name': 'OpcodeList2',
                'type': 'Undefined'
            },
            51022: {
                'name': 'OpcodeList3',
                'type': 'Undefined'
            }
        },
        'Exif': {
            33434: {
                'name': 'ExposureTime',
                'type': 'Rational'
            },
            33437: {
                'name': 'FNumber',
                'type': 'Rational'
            },
            34850: {
                'name': 'ExposureProgram',
                'type': 'Short'
            },
            34852: {
                'name': 'SpectralSensitivity',
                'type': 'Ascii'
            },
            34855: {
                'name': 'ISOSpeedRatings',
                'type': 'Short'
            },
            34856: {
                'name': 'OECF',
                'type': 'Undefined'
            },
            34864: {
                'name': 'SensitivityType',
                'type': 'Short'
            },
            34865: {
                'name': 'StandardOutputSensitivity',
                'type': 'Long'
            },
            34866: {
                'name': 'RecommendedExposureIndex',
                'type': 'Long'
            },
            34867: {
                'name': 'ISOSpeed',
                'type': 'Long'
            },
            34868: {
                'name': 'ISOSpeedLatitudeyyy',
                'type': 'Long'
            },
            34869: {
                'name': 'ISOSpeedLatitudezzz',
                'type': 'Long'
            },
            36864: {
                'name': 'ExifVersion',
                'type': 'Undefined'
            },
            36867: {
                'name': 'DateTimeOriginal',
                'type': 'Ascii'
            },
            36868: {
                'name': 'DateTimeDigitized',
                'type': 'Ascii'
            },
            37121: {
                'name': 'ComponentsConfiguration',
                'type': 'Undefined'
            },
            37122: {
                'name': 'CompressedBitsPerPixel',
                'type': 'Rational'
            },
            37377: {
                'name': 'ShutterSpeedValue',
                'type': 'SRational'
            },
            37378: {
                'name': 'ApertureValue',
                'type': 'Rational'
            },
            37379: {
                'name': 'BrightnessValue',
                'type': 'SRational'
            },
            37380: {
                'name': 'ExposureBiasValue',
                'type': 'SRational'
            },
            37381: {
                'name': 'MaxApertureValue',
                'type': 'Rational'
            },
            37382: {
                'name': 'SubjectDistance',
                'type': 'Rational'
            },
            37383: {
                'name': 'MeteringMode',
                'type': 'Short'
            },
            37384: {
                'name': 'LightSource',
                'type': 'Short'
            },
            37385: {
                'name': 'Flash',
                'type': 'Short'
            },
            37386: {
                'name': 'FocalLength',
                'type': 'Rational'
            },
            37396: {
                'name': 'SubjectArea',
                'type': 'Short'
            },
            37500: {
                'name': 'MakerNote',
                'type': 'Undefined'
            },
            37510: {
                'name': 'UserComment',
                'type': 'Ascii'
            },
            37520: {
                'name': 'SubSecTime',
                'type': 'Ascii'
            },
            37521: {
                'name': 'SubSecTimeOriginal',
                'type': 'Ascii'
            },
            37522: {
                'name': 'SubSecTimeDigitized',
                'type': 'Ascii'
            },
            40960: {
                'name': 'FlashpixVersion',
                'type': 'Undefined'
            },
            40961: {
                'name': 'ColorSpace',
                'type': 'Short'
            },
            40962: {
                'name': 'PixelXDimension',
                'type': 'Long'
            },
            40963: {
                'name': 'PixelYDimension',
                'type': 'Long'
            },
            40964: {
                'name': 'RelatedSoundFile',
                'type': 'Ascii'
            },
            40965: {
                'name': 'InteroperabilityTag',
                'type': 'Long'
            },
            41483: {
                'name': 'FlashEnergy',
                'type': 'Rational'
            },
            41484: {
                'name': 'SpatialFrequencyResponse',
                'type': 'Undefined'
            },
            41486: {
                'name': 'FocalPlaneXResolution',
                'type': 'Rational'
            },
            41487: {
                'name': 'FocalPlaneYResolution',
                'type': 'Rational'
            },
            41488: {
                'name': 'FocalPlaneResolutionUnit',
                'type': 'Short'
            },
            41492: {
                'name': 'SubjectLocation',
                'type': 'Short'
            },
            41493: {
                'name': 'ExposureIndex',
                'type': 'Rational'
            },
            41495: {
                'name': 'SensingMethod',
                'type': 'Short'
            },
            41728: {
                'name': 'FileSource',
                'type': 'Undefined'
            },
            41729: {
                'name': 'SceneType',
                'type': 'Undefined'
            },
            41730: {
                'name': 'CFAPattern',
                'type': 'Undefined'
            },
            41985: {
                'name': 'CustomRendered',
                'type': 'Short'
            },
            41986: {
                'name': 'ExposureMode',
                'type': 'Short'
            },
            41987: {
                'name': 'WhiteBalance',
                'type': 'Short'
            },
            41988: {
                'name': 'DigitalZoomRatio',
                'type': 'Rational'
            },
            41989: {
                'name': 'FocalLengthIn35mmFilm',
                'type': 'Short'
            },
            41990: {
                'name': 'SceneCaptureType',
                'type': 'Short'
            },
            41991: {
                'name': 'GainControl',
                'type': 'Short'
            },
            41992: {
                'name': 'Contrast',
                'type': 'Short'
            },
            41993: {
                'name': 'Saturation',
                'type': 'Short'
            },
            41994: {
                'name': 'Sharpness',
                'type': 'Short'
            },
            41995: {
                'name': 'DeviceSettingDescription',
                'type': 'Undefined'
            },
            41996: {
                'name': 'SubjectDistanceRange',
                'type': 'Short'
            },
            42016: {
                'name': 'ImageUniqueID',
                'type': 'Ascii'
            },
            42032: {
                'name': 'CameraOwnerName',
                'type': 'Ascii'
            },
            42033: {
                'name': 'BodySerialNumber',
                'type': 'Ascii'
            },
            42034: {
                'name': 'LensSpecification',
                'type': 'Rational'
            },
            42035: {
                'name': 'LensMake',
                'type': 'Ascii'
            },
            42036: {
                'name': 'LensModel',
                'type': 'Ascii'
            },
            42037: {
                'name': 'LensSerialNumber',
                'type': 'Ascii'
            },
            42240: {
                'name': 'Gamma',
                'type': 'Rational'
            }
        },
        'GPS': {
            0: {
                'name': 'GPSVersionID',
                'type': 'Byte'
            },
            1: {
                'name': 'GPSLatitudeRef',
                'type': 'Ascii'
            },
            2: {
                'name': 'GPSLatitude',
                'type': 'Rational'
            },
            3: {
                'name': 'GPSLongitudeRef',
                'type': 'Ascii'
            },
            4: {
                'name': 'GPSLongitude',
                'type': 'Rational'
            },
            5: {
                'name': 'GPSAltitudeRef',
                'type': 'Byte'
            },
            6: {
                'name': 'GPSAltitude',
                'type': 'Rational'
            },
            7: {
                'name': 'GPSTimeStamp',
                'type': 'Rational'
            },
            8: {
                'name': 'GPSSatellites',
                'type': 'Ascii'
            },
            9: {
                'name': 'GPSStatus',
                'type': 'Ascii'
            },
            10: {
                'name': 'GPSMeasureMode',
                'type': 'Ascii'
            },
            11: {
                'name': 'GPSDOP',
                'type': 'Rational'
            },
            12: {
                'name': 'GPSSpeedRef',
                'type': 'Ascii'
            },
            13: {
                'name': 'GPSSpeed',
                'type': 'Rational'
            },
            14: {
                'name': 'GPSTrackRef',
                'type': 'Ascii'
            },
            15: {
                'name': 'GPSTrack',
                'type': 'Rational'
            },
            16: {
                'name': 'GPSImgDirectionRef',
                'type': 'Ascii'
            },
            17: {
                'name': 'GPSImgDirection',
                'type': 'Rational'
            },
            18: {
                'name': 'GPSMapDatum',
                'type': 'Ascii'
            },
            19: {
                'name': 'GPSDestLatitudeRef',
                'type': 'Ascii'
            },
            20: {
                'name': 'GPSDestLatitude',
                'type': 'Rational'
            },
            21: {
                'name': 'GPSDestLongitudeRef',
                'type': 'Ascii'
            },
            22: {
                'name': 'GPSDestLongitude',
                'type': 'Rational'
            },
            23: {
                'name': 'GPSDestBearingRef',
                'type': 'Ascii'
            },
            24: {
                'name': 'GPSDestBearing',
                'type': 'Rational'
            },
            25: {
                'name': 'GPSDestDistanceRef',
                'type': 'Ascii'
            },
            26: {
                'name': 'GPSDestDistance',
                'type': 'Rational'
            },
            27: {
                'name': 'GPSProcessingMethod',
                'type': 'Undefined'
            },
            28: {
                'name': 'GPSAreaInformation',
                'type': 'Undefined'
            },
            29: {
                'name': 'GPSDateStamp',
                'type': 'Ascii'
            },
            30: {
                'name': 'GPSDifferential',
                'type': 'Short'
            },
            31: {
                'name': 'GPSHPositioningError',
                'type': 'Rational'
            }
        },
        'Interop': {
            1: {
                'name': 'InteroperabilityIndex',
                'type': 'Ascii'
            }
        },
    };
    TAGS["0th"] = TAGS["Image"];
    TAGS["1st"] = TAGS["Image"];
    that.TAGS = TAGS;

    
    that.ImageIFD = {
        ProcessingSoftware:11,
        NewSubfileType:254,
        SubfileType:255,
        ImageWidth:256,
        ImageLength:257,
        BitsPerSample:258,
        Compression:259,
        PhotometricInterpretation:262,
        Threshholding:263,
        CellWidth:264,
        CellLength:265,
        FillOrder:266,
        DocumentName:269,
        ImageDescription:270,
        Make:271,
        Model:272,
        StripOffsets:273,
        Orientation:274,
        SamplesPerPixel:277,
        RowsPerStrip:278,
        StripByteCounts:279,
        XResolution:282,
        YResolution:283,
        PlanarConfiguration:284,
        GrayResponseUnit:290,
        GrayResponseCurve:291,
        T4Options:292,
        T6Options:293,
        ResolutionUnit:296,
        TransferFunction:301,
        Software:305,
        DateTime:306,
        Artist:315,
        HostComputer:316,
        Predictor:317,
        WhitePoint:318,
        PrimaryChromaticities:319,
        ColorMap:320,
        HalftoneHints:321,
        TileWidth:322,
        TileLength:323,
        TileOffsets:324,
        TileByteCounts:325,
        SubIFDs:330,
        InkSet:332,
        InkNames:333,
        NumberOfInks:334,
        DotRange:336,
        TargetPrinter:337,
        ExtraSamples:338,
        SampleFormat:339,
        SMinSampleValue:340,
        SMaxSampleValue:341,
        TransferRange:342,
        ClipPath:343,
        XClipPathUnits:344,
        YClipPathUnits:345,
        Indexed:346,
        JPEGTables:347,
        OPIProxy:351,
        JPEGProc:512,
        JPEGInterchangeFormat:513,
        JPEGInterchangeFormatLength:514,
        JPEGRestartInterval:515,
        JPEGLosslessPredictors:517,
        JPEGPointTransforms:518,
        JPEGQTables:519,
        JPEGDCTables:520,
        JPEGACTables:521,
        YCbCrCoefficients:529,
        YCbCrSubSampling:530,
        YCbCrPositioning:531,
        ReferenceBlackWhite:532,
        XMLPacket:700,
        Rating:18246,
        RatingPercent:18249,
        ImageID:32781,
        CFARepeatPatternDim:33421,
        CFAPattern:33422,
        BatteryLevel:33423,
        Copyright:33432,
        ExposureTime:33434,
        ImageResources:34377,
        ExifTag:34665,
        InterColorProfile:34675,
        GPSTag:34853,
        Interlace:34857,
        TimeZoneOffset:34858,
        SelfTimerMode:34859,
        FlashEnergy:37387,
        SpatialFrequencyResponse:37388,
        Noise:37389,
        FocalPlaneXResolution:37390,
        FocalPlaneYResolution:37391,
        FocalPlaneResolutionUnit:37392,
        ImageNumber:37393,
        SecurityClassification:37394,
        ImageHistory:37395,
        ExposureIndex:37397,
        TIFFEPStandardID:37398,
        SensingMethod:37399,
        XPTitle:40091,
        XPComment:40092,
        XPAuthor:40093,
        XPKeywords:40094,
        XPSubject:40095,
        PrintImageMatching:50341,
        DNGVersion:50706,
        DNGBackwardVersion:50707,
        UniqueCameraModel:50708,
        LocalizedCameraModel:50709,
        CFAPlaneColor:50710,
        CFALayout:50711,
        LinearizationTable:50712,
        BlackLevelRepeatDim:50713,
        BlackLevel:50714,
        BlackLevelDeltaH:50715,
        BlackLevelDeltaV:50716,
        WhiteLevel:50717,
        DefaultScale:50718,
        DefaultCropOrigin:50719,
        DefaultCropSize:50720,
        ColorMatrix1:50721,
        ColorMatrix2:50722,
        CameraCalibration1:50723,
        CameraCalibration2:50724,
        ReductionMatrix1:50725,
        ReductionMatrix2:50726,
        AnalogBalance:50727,
        AsShotNeutral:50728,
        AsShotWhiteXY:50729,
        BaselineExposure:50730,
        BaselineNoise:50731,
        BaselineSharpness:50732,
        BayerGreenSplit:50733,
        LinearResponseLimit:50734,
        CameraSerialNumber:50735,
        LensInfo:50736,
        ChromaBlurRadius:50737,
        AntiAliasStrength:50738,
        ShadowScale:50739,
        DNGPrivateData:50740,
        MakerNoteSafety:50741,
        CalibrationIlluminant1:50778,
        CalibrationIlluminant2:50779,
        BestQualityScale:50780,
        RawDataUniqueID:50781,
        OriginalRawFileName:50827,
        OriginalRawFileData:50828,
        ActiveArea:50829,
        MaskedAreas:50830,
        AsShotICCProfile:50831,
        AsShotPreProfileMatrix:50832,
        CurrentICCProfile:50833,
        CurrentPreProfileMatrix:50834,
        ColorimetricReference:50879,
        CameraCalibrationSignature:50931,
        ProfileCalibrationSignature:50932,
        AsShotProfileName:50934,
        NoiseReductionApplied:50935,
        ProfileName:50936,
        ProfileHueSatMapDims:50937,
        ProfileHueSatMapData1:50938,
        ProfileHueSatMapData2:50939,
        ProfileToneCurve:50940,
        ProfileEmbedPolicy:50941,
        ProfileCopyright:50942,
        ForwardMatrix1:50964,
        ForwardMatrix2:50965,
        PreviewApplicationName:50966,
        PreviewApplicationVersion:50967,
        PreviewSettingsName:50968,
        PreviewSettingsDigest:50969,
        PreviewColorSpace:50970,
        PreviewDateTime:50971,
        RawImageDigest:50972,
        OriginalRawFileDigest:50973,
        SubTileBlockSize:50974,
        RowInterleaveFactor:50975,
        ProfileLookTableDims:50981,
        ProfileLookTableData:50982,
        OpcodeList1:51008,
        OpcodeList2:51009,
        OpcodeList3:51022,
        NoiseProfile:51041,
    };

    
    that.ExifIFD = {
        ExposureTime:33434,
        FNumber:33437,
        ExposureProgram:34850,
        SpectralSensitivity:34852,
        ISOSpeedRatings:34855,
        OECF:34856,
        SensitivityType:34864,
        StandardOutputSensitivity:34865,
        RecommendedExposureIndex:34866,
        ISOSpeed:34867,
        ISOSpeedLatitudeyyy:34868,
        ISOSpeedLatitudezzz:34869,
        ExifVersion:36864,
        DateTimeOriginal:36867,
        DateTimeDigitized:36868,
        ComponentsConfiguration:37121,
        CompressedBitsPerPixel:37122,
        ShutterSpeedValue:37377,
        ApertureValue:37378,
        BrightnessValue:37379,
        ExposureBiasValue:37380,
        MaxApertureValue:37381,
        SubjectDistance:37382,
        MeteringMode:37383,
        LightSource:37384,
        Flash:37385,
        FocalLength:37386,
        SubjectArea:37396,
        MakerNote:37500,
        UserComment:37510,
        SubSecTime:37520,
        SubSecTimeOriginal:37521,
        SubSecTimeDigitized:37522,
        FlashpixVersion:40960,
        ColorSpace:40961,
        PixelXDimension:40962,
        PixelYDimension:40963,
        RelatedSoundFile:40964,
        InteroperabilityTag:40965,
        FlashEnergy:41483,
        SpatialFrequencyResponse:41484,
        FocalPlaneXResolution:41486,
        FocalPlaneYResolution:41487,
        FocalPlaneResolutionUnit:41488,
        SubjectLocation:41492,
        ExposureIndex:41493,
        SensingMethod:41495,
        FileSource:41728,
        SceneType:41729,
        CFAPattern:41730,
        CustomRendered:41985,
        ExposureMode:41986,
        WhiteBalance:41987,
        DigitalZoomRatio:41988,
        FocalLengthIn35mmFilm:41989,
        SceneCaptureType:41990,
        GainControl:41991,
        Contrast:41992,
        Saturation:41993,
        Sharpness:41994,
        DeviceSettingDescription:41995,
        SubjectDistanceRange:41996,
        ImageUniqueID:42016,
        CameraOwnerName:42032,
        BodySerialNumber:42033,
        LensSpecification:42034,
        LensMake:42035,
        LensModel:42036,
        LensSerialNumber:42037,
        Gamma:42240,
    };


    that.GPSIFD = {
        GPSVersionID:0,
        GPSLatitudeRef:1,
        GPSLatitude:2,
        GPSLongitudeRef:3,
        GPSLongitude:4,
        GPSAltitudeRef:5,
        GPSAltitude:6,
        GPSTimeStamp:7,
        GPSSatellites:8,
        GPSStatus:9,
        GPSMeasureMode:10,
        GPSDOP:11,
        GPSSpeedRef:12,
        GPSSpeed:13,
        GPSTrackRef:14,
        GPSTrack:15,
        GPSImgDirectionRef:16,
        GPSImgDirection:17,
        GPSMapDatum:18,
        GPSDestLatitudeRef:19,
        GPSDestLatitude:20,
        GPSDestLongitudeRef:21,
        GPSDestLongitude:22,
        GPSDestBearingRef:23,
        GPSDestBearing:24,
        GPSDestDistanceRef:25,
        GPSDestDistance:26,
        GPSProcessingMethod:27,
        GPSAreaInformation:28,
        GPSDateStamp:29,
        GPSDifferential:30,
        GPSHPositioningError:31,
    };


    that.InteropIFD = {
        InteroperabilityIndex:1,
    };

    that.GPSHelper = {
        degToDmsRational:function (degFloat) {
            var degAbs = Math.abs(degFloat);
            var minFloat = degAbs % 1 * 60;
            var secFloat = minFloat % 1 * 60;
            var deg = Math.floor(degAbs);
            var min = Math.floor(minFloat);
            var sec = Math.round(secFloat * 100);

            return [[deg, 1], [min, 1], [sec, 100]];
        },

        dmsRationalToDeg:function (dmsArray, ref) {
            var sign = (ref === 'S' || ref === 'W') ? -1.0 : 1.0;
            var deg = dmsArray[0][0] / dmsArray[0][1] +
                      dmsArray[1][0] / dmsArray[1][1] / 60.0 +
                      dmsArray[2][0] / dmsArray[2][1] / 3600.0;

            return deg * sign;
        }
    };
    
    
    if (true) {
        if ( true && module.exports) {
            exports = module.exports = that;
        }
        exports.piexif = that;
    } else {}

})();


/***/ }),

/***/ "./node_modules/qrcode/lib/browser.js":
/*!********************************************!*\
  !*** ./node_modules/qrcode/lib/browser.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


const canPromise = __webpack_require__(/*! ./can-promise */ "./node_modules/qrcode/lib/can-promise.js")

const QRCode = __webpack_require__(/*! ./core/qrcode */ "./node_modules/qrcode/lib/core/qrcode.js")
const CanvasRenderer = __webpack_require__(/*! ./renderer/canvas */ "./node_modules/qrcode/lib/renderer/canvas.js")
const SvgRenderer = __webpack_require__(/*! ./renderer/svg-tag.js */ "./node_modules/qrcode/lib/renderer/svg-tag.js")

function renderCanvas (renderFunc, canvas, text, opts, cb) {
  const args = [].slice.call(arguments, 1)
  const argsNum = args.length
  const isLastArgCb = typeof args[argsNum - 1] === 'function'

  if (!isLastArgCb && !canPromise()) {
    throw new Error('Callback required as last argument')
  }

  if (isLastArgCb) {
    if (argsNum < 2) {
      throw new Error('Too few arguments provided')
    }

    if (argsNum === 2) {
      cb = text
      text = canvas
      canvas = opts = undefined
    } else if (argsNum === 3) {
      if (canvas.getContext && typeof cb === 'undefined') {
        cb = opts
        opts = undefined
      } else {
        cb = opts
        opts = text
        text = canvas
        canvas = undefined
      }
    }
  } else {
    if (argsNum < 1) {
      throw new Error('Too few arguments provided')
    }

    if (argsNum === 1) {
      text = canvas
      canvas = opts = undefined
    } else if (argsNum === 2 && !canvas.getContext) {
      opts = text
      text = canvas
      canvas = undefined
    }

    return new Promise(function (resolve, reject) {
      try {
        const data = QRCode.create(text, opts)
        resolve(renderFunc(data, canvas, opts))
      } catch (e) {
        reject(e)
      }
    })
  }

  try {
    const data = QRCode.create(text, opts)
    cb(null, renderFunc(data, canvas, opts))
  } catch (e) {
    cb(e)
  }
}

exports.create = QRCode.create
exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render)
exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL)

// only svg for now.
exports.toString = renderCanvas.bind(null, function (data, _, opts) {
  return SvgRenderer.render(data, opts)
})


/***/ }),

/***/ "./node_modules/qrcode/lib/can-promise.js":
/*!************************************************!*\
  !*** ./node_modules/qrcode/lib/can-promise.js ***!
  \************************************************/
/***/ ((module) => {

// can-promise has a crash in some versions of react native that dont have
// standard global objects
// https://github.com/soldair/node-qrcode/issues/157

module.exports = function () {
  return typeof Promise === 'function' && Promise.prototype && Promise.prototype.then
}


/***/ }),

/***/ "./node_modules/qrcode/lib/core/alignment-pattern.js":
/*!***********************************************************!*\
  !*** ./node_modules/qrcode/lib/core/alignment-pattern.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * Alignment pattern are fixed reference pattern in defined positions
 * in a matrix symbology, which enables the decode software to re-synchronise
 * the coordinate mapping of the image modules in the event of moderate amounts
 * of distortion of the image.
 *
 * Alignment patterns are present only in QR Code symbols of version 2 or larger
 * and their number depends on the symbol version.
 */

const getSymbolSize = __webpack_require__(/*! ./utils */ "./node_modules/qrcode/lib/core/utils.js").getSymbolSize

/**
 * Calculate the row/column coordinates of the center module of each alignment pattern
 * for the specified QR Code version.
 *
 * The alignment patterns are positioned symmetrically on either side of the diagonal
 * running from the top left corner of the symbol to the bottom right corner.
 *
 * Since positions are simmetrical only half of the coordinates are returned.
 * Each item of the array will represent in turn the x and y coordinate.
 * @see {@link getPositions}
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinate
 */
exports.getRowColCoords = function getRowColCoords (version) {
  if (version === 1) return []

  const posCount = Math.floor(version / 7) + 2
  const size = getSymbolSize(version)
  const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2
  const positions = [size - 7] // Last coord is always (size - 7)

  for (let i = 1; i < posCount - 1; i++) {
    positions[i] = positions[i - 1] - intervals
  }

  positions.push(6) // First coord is always 6

  return positions.reverse()
}

/**
 * Returns an array containing the positions of each alignment pattern.
 * Each array's element represent the center point of the pattern as (x, y) coordinates
 *
 * Coordinates are calculated expanding the row/column coordinates returned by {@link getRowColCoords}
 * and filtering out the items that overlaps with finder pattern
 *
 * @example
 * For a Version 7 symbol {@link getRowColCoords} returns values 6, 22 and 38.
 * The alignment patterns, therefore, are to be centered on (row, column)
 * positions (6,22), (22,6), (22,22), (22,38), (38,22), (38,38).
 * Note that the coordinates (6,6), (6,38), (38,6) are occupied by finder patterns
 * and are not therefore used for alignment patterns.
 *
 * let pos = getPositions(7)
 * // [[6,22], [22,6], [22,22], [22,38], [38,22], [38,38]]
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */
exports.getPositions = function getPositions (version) {
  const coords = []
  const pos = exports.getRowColCoords(version)
  const posLength = pos.length

  for (let i = 0; i < posLength; i++) {
    for (let j = 0; j < posLength; j++) {
      // Skip if position is occupied by finder patterns
      if ((i === 0 && j === 0) || // top-left
          (i === 0 && j === posLength - 1) || // bottom-left
          (i === posLength - 1 && j === 0)) { // top-right
        continue
      }

      coords.push([pos[i], pos[j]])
    }
  }

  return coords
}


/***/ }),

/***/ "./node_modules/qrcode/lib/core/alphanumeric-data.js":
/*!***********************************************************!*\
  !*** ./node_modules/qrcode/lib/core/alphanumeric-data.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Mode = __webpack_require__(/*! ./mode */ "./node_modules/qrcode/lib/core/mode.js")

/**
 * Array of characters available in alphanumeric mode
 *
 * As per QR Code specification, to each character
 * is assigned a value from 0 to 44 which in this case coincides
 * with the array index
 *
 * @type {Array}
 */
const ALPHA_NUM_CHARS = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  ' ', '$', '%', '*', '+', '-', '.', '/', ':'
]

function AlphanumericData (data) {
  this.mode = Mode.ALPHANUMERIC
  this.data = data
}

AlphanumericData.getBitsLength = function getBitsLength (length) {
  return 11 * Math.floor(length / 2) + 6 * (length % 2)
}

AlphanumericData.prototype.getLength = function getLength () {
  return this.data.length
}

AlphanumericData.prototype.getBitsLength = function getBitsLength () {
  return AlphanumericData.getBitsLength(this.data.length)
}

AlphanumericData.prototype.write = function write (bitBuffer) {
  let i

  // Input data characters are divided into groups of two characters
  // and encoded as 11-bit binary codes.
  for (i = 0; i + 2 <= this.data.length; i += 2) {
    // The character value of the first character is multiplied by 45
    let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45

    // The character value of the second digit is added to the product
    value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1])

    // The sum is then stored as 11-bit binary number
    bitBuffer.put(value, 11)
  }

  // If the number of input data characters is not a multiple of two,
  // the character value of the final character is encoded as a 6-bit binary number.
  if (this.data.length % 2) {
    bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6)
  }
}

module.exports = AlphanumericData


/***/ }),

/***/ "./node_modules/qrcode/lib/core/bit-buffer.js":
/*!****************************************************!*\
  !*** ./node_modules/qrcode/lib/core/bit-buffer.js ***!
  \****************************************************/
/***/ ((module) => {

function BitBuffer () {
  this.buffer = []
  this.length = 0
}

BitBuffer.prototype = {

  get: function (index) {
    const bufIndex = Math.floor(index / 8)
    return ((this.buffer[bufIndex] >>> (7 - index % 8)) & 1) === 1
  },

  put: function (num, length) {
    for (let i = 0; i < length; i++) {
      this.putBit(((num >>> (length - i - 1)) & 1) === 1)
    }
  },

  getLengthInBits: function () {
    return this.length
  },

  putBit: function (bit) {
    const bufIndex = Math.floor(this.length / 8)
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0)
    }

    if (bit) {
      this.buffer[bufIndex] |= (0x80 >>> (this.length % 8))
    }

    this.length++
  }
}

module.exports = BitBuffer


/***/ }),

/***/ "./node_modules/qrcode/lib/core/bit-matrix.js":
/*!****************************************************!*\
  !*** ./node_modules/qrcode/lib/core/bit-matrix.js ***!
  \****************************************************/
/***/ ((module) => {

/**
 * Helper class to handle QR Code symbol modules
 *
 * @param {Number} size Symbol size
 */
function BitMatrix (size) {
  if (!size || size < 1) {
    throw new Error('BitMatrix size must be defined and greater than 0')
  }

  this.size = size
  this.data = new Uint8Array(size * size)
  this.reservedBit = new Uint8Array(size * size)
}

/**
 * Set bit value at specified location
 * If reserved flag is set, this bit will be ignored during masking process
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 * @param {Boolean} reserved
 */
BitMatrix.prototype.set = function (row, col, value, reserved) {
  const index = row * this.size + col
  this.data[index] = value
  if (reserved) this.reservedBit[index] = true
}

/**
 * Returns bit value at specified location
 *
 * @param  {Number}  row
 * @param  {Number}  col
 * @return {Boolean}
 */
BitMatrix.prototype.get = function (row, col) {
  return this.data[row * this.size + col]
}

/**
 * Applies xor operator at specified location
 * (used during masking process)
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 */
BitMatrix.prototype.xor = function (row, col, value) {
  this.data[row * this.size + col] ^= value
}

/**
 * Check if bit at specified location is reserved
 *
 * @param {Number}   row
 * @param {Number}   col
 * @return {Boolean}
 */
BitMatrix.prototype.isReserved = function (row, col) {
  return this.reservedBit[row * this.size + col]
}

module.exports = BitMatrix


/***/ }),

/***/ "./node_modules/qrcode/lib/core/byte-data.js":
/*!***************************************************!*\
  !*** ./node_modules/qrcode/lib/core/byte-data.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const encodeUtf8 = __webpack_require__(/*! encode-utf8 */ "./node_modules/encode-utf8/index.js")
const Mode = __webpack_require__(/*! ./mode */ "./node_modules/qrcode/lib/core/mode.js")

function ByteData (data) {
  this.mode = Mode.BYTE
  this.data = new Uint8Array(encodeUtf8(data))
}

ByteData.getBitsLength = function getBitsLength (length) {
  return length * 8
}

ByteData.prototype.getLength = function getLength () {
  return this.data.length
}

ByteData.prototype.getBitsLength = function getBitsLength () {
  return ByteData.getBitsLength(this.data.length)
}

ByteData.prototype.write = function (bitBuffer) {
  for (let i = 0, l = this.data.length; i < l; i++) {
    bitBuffer.put(this.data[i], 8)
  }
}

module.exports = ByteData


/***/ }),

/***/ "./node_modules/qrcode/lib/core/error-correction-code.js":
/*!***************************************************************!*\
  !*** ./node_modules/qrcode/lib/core/error-correction-code.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const ECLevel = __webpack_require__(/*! ./error-correction-level */ "./node_modules/qrcode/lib/core/error-correction-level.js")

const EC_BLOCKS_TABLE = [
// L  M  Q  H
  1, 1, 1, 1,
  1, 1, 1, 1,
  1, 1, 2, 2,
  1, 2, 2, 4,
  1, 2, 4, 4,
  2, 4, 4, 4,
  2, 4, 6, 5,
  2, 4, 6, 6,
  2, 5, 8, 8,
  4, 5, 8, 8,
  4, 5, 8, 11,
  4, 8, 10, 11,
  4, 9, 12, 16,
  4, 9, 16, 16,
  6, 10, 12, 18,
  6, 10, 17, 16,
  6, 11, 16, 19,
  6, 13, 18, 21,
  7, 14, 21, 25,
  8, 16, 20, 25,
  8, 17, 23, 25,
  9, 17, 23, 34,
  9, 18, 25, 30,
  10, 20, 27, 32,
  12, 21, 29, 35,
  12, 23, 34, 37,
  12, 25, 34, 40,
  13, 26, 35, 42,
  14, 28, 38, 45,
  15, 29, 40, 48,
  16, 31, 43, 51,
  17, 33, 45, 54,
  18, 35, 48, 57,
  19, 37, 51, 60,
  19, 38, 53, 63,
  20, 40, 56, 66,
  21, 43, 59, 70,
  22, 45, 62, 74,
  24, 47, 65, 77,
  25, 49, 68, 81
]

const EC_CODEWORDS_TABLE = [
// L  M  Q  H
  7, 10, 13, 17,
  10, 16, 22, 28,
  15, 26, 36, 44,
  20, 36, 52, 64,
  26, 48, 72, 88,
  36, 64, 96, 112,
  40, 72, 108, 130,
  48, 88, 132, 156,
  60, 110, 160, 192,
  72, 130, 192, 224,
  80, 150, 224, 264,
  96, 176, 260, 308,
  104, 198, 288, 352,
  120, 216, 320, 384,
  132, 240, 360, 432,
  144, 280, 408, 480,
  168, 308, 448, 532,
  180, 338, 504, 588,
  196, 364, 546, 650,
  224, 416, 600, 700,
  224, 442, 644, 750,
  252, 476, 690, 816,
  270, 504, 750, 900,
  300, 560, 810, 960,
  312, 588, 870, 1050,
  336, 644, 952, 1110,
  360, 700, 1020, 1200,
  390, 728, 1050, 1260,
  420, 784, 1140, 1350,
  450, 812, 1200, 1440,
  480, 868, 1290, 1530,
  510, 924, 1350, 1620,
  540, 980, 1440, 1710,
  570, 1036, 1530, 1800,
  570, 1064, 1590, 1890,
  600, 1120, 1680, 1980,
  630, 1204, 1770, 2100,
  660, 1260, 1860, 2220,
  720, 1316, 1950, 2310,
  750, 1372, 2040, 2430
]

/**
 * Returns the number of error correction block that the QR Code should contain
 * for the specified version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction blocks
 */
exports.getBlocksCount = function getBlocksCount (version, errorCorrectionLevel) {
  switch (errorCorrectionLevel) {
    case ECLevel.L:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 0]
    case ECLevel.M:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 1]
    case ECLevel.Q:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 2]
    case ECLevel.H:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 3]
    default:
      return undefined
  }
}

/**
 * Returns the number of error correction codewords to use for the specified
 * version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction codewords
 */
exports.getTotalCodewordsCount = function getTotalCodewordsCount (version, errorCorrectionLevel) {
  switch (errorCorrectionLevel) {
    case ECLevel.L:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0]
    case ECLevel.M:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1]
    case ECLevel.Q:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2]
    case ECLevel.H:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3]
    default:
      return undefined
  }
}


/***/ }),

/***/ "./node_modules/qrcode/lib/core/error-correction-level.js":
/*!****************************************************************!*\
  !*** ./node_modules/qrcode/lib/core/error-correction-level.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.L = { bit: 1 }
exports.M = { bit: 0 }
exports.Q = { bit: 3 }
exports.H = { bit: 2 }

function fromString (string) {
  if (typeof string !== 'string') {
    throw new Error('Param is not a string')
  }

  const lcStr = string.toLowerCase()

  switch (lcStr) {
    case 'l':
    case 'low':
      return exports.L

    case 'm':
    case 'medium':
      return exports.M

    case 'q':
    case 'quartile':
      return exports.Q

    case 'h':
    case 'high':
      return exports.H

    default:
      throw new Error('Unknown EC Level: ' + string)
  }
}

exports.isValid = function isValid (level) {
  return level && typeof level.bit !== 'undefined' &&
    level.bit >= 0 && level.bit < 4
}

exports.from = function from (value, defaultValue) {
  if (exports.isValid(value)) {
    return value
  }

  try {
    return fromString(value)
  } catch (e) {
    return defaultValue
  }
}


/***/ }),

/***/ "./node_modules/qrcode/lib/core/finder-pattern.js":
/*!********************************************************!*\
  !*** ./node_modules/qrcode/lib/core/finder-pattern.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const getSymbolSize = __webpack_require__(/*! ./utils */ "./node_modules/qrcode/lib/core/utils.js").getSymbolSize
const FINDER_PATTERN_SIZE = 7

/**
 * Returns an array containing the positions of each finder pattern.
 * Each array's element represent the top-left point of the pattern as (x, y) coordinates
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */
exports.getPositions = function getPositions (version) {
  const size = getSymbolSize(version)

  return [
    // top-left
    [0, 0],
    // top-right
    [size - FINDER_PATTERN_SIZE, 0],
    // bottom-left
    [0, size - FINDER_PATTERN_SIZE]
  ]
}


/***/ }),

/***/ "./node_modules/qrcode/lib/core/format-info.js":
/*!*****************************************************!*\
  !*** ./node_modules/qrcode/lib/core/format-info.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const Utils = __webpack_require__(/*! ./utils */ "./node_modules/qrcode/lib/core/utils.js")

const G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0)
const G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1)
const G15_BCH = Utils.getBCHDigit(G15)

/**
 * Returns format information with relative error correction bits
 *
 * The format information is a 15-bit sequence containing 5 data bits,
 * with 10 error correction bits calculated using the (15, 5) BCH code.
 *
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Number} mask                 Mask pattern
 * @return {Number}                      Encoded format information bits
 */
exports.getEncodedBits = function getEncodedBits (errorCorrectionLevel, mask) {
  const data = ((errorCorrectionLevel.bit << 3) | mask)
  let d = data << 10

  while (Utils.getBCHDigit(d) - G15_BCH >= 0) {
    d ^= (G15 << (Utils.getBCHDigit(d) - G15_BCH))
  }

  // xor final data with mask pattern in order to ensure that
  // no combination of Error Correction Level and data mask pattern
  // will result in an all-zero data string
  return ((data << 10) | d) ^ G15_MASK
}


/***/ }),

/***/ "./node_modules/qrcode/lib/core/galois-field.js":
/*!******************************************************!*\
  !*** ./node_modules/qrcode/lib/core/galois-field.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

const EXP_TABLE = new Uint8Array(512)
const LOG_TABLE = new Uint8Array(256)
/**
 * Precompute the log and anti-log tables for faster computation later
 *
 * For each possible value in the galois field 2^8, we will pre-compute
 * the logarithm and anti-logarithm (exponential) of this value
 *
 * ref {@link https://en.wikiversity.org/wiki/Reed%E2%80%93Solomon_codes_for_coders#Introduction_to_mathematical_fields}
 */
;(function initTables () {
  let x = 1
  for (let i = 0; i < 255; i++) {
    EXP_TABLE[i] = x
    LOG_TABLE[x] = i

    x <<= 1 // multiply by 2

    // The QR code specification says to use byte-wise modulo 100011101 arithmetic.
    // This means that when a number is 256 or larger, it should be XORed with 0x11D.
    if (x & 0x100) { // similar to x >= 256, but a lot faster (because 0x100 == 256)
      x ^= 0x11D
    }
  }

  // Optimization: double the size of the anti-log table so that we don't need to mod 255 to
  // stay inside the bounds (because we will mainly use this table for the multiplication of
  // two GF numbers, no more).
  // @see {@link mul}
  for (let i = 255; i < 512; i++) {
    EXP_TABLE[i] = EXP_TABLE[i - 255]
  }
}())

/**
 * Returns log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */
exports.log = function log (n) {
  if (n < 1) throw new Error('log(' + n + ')')
  return LOG_TABLE[n]
}

/**
 * Returns anti-log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */
exports.exp = function exp (n) {
  return EXP_TABLE[n]
}

/**
 * Multiplies two number inside Galois Field
 *
 * @param  {Number} x
 * @param  {Number} y
 * @return {Number}
 */
exports.mul = function mul (x, y) {
  if (x === 0 || y === 0) return 0

  // should be EXP_TABLE[(LOG_TABLE[x] + LOG_TABLE[y]) % 255] if EXP_TABLE wasn't oversized
  // @see {@link initTables}
  return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]]
}


/***/ }),

/***/ "./node_modules/qrcode/lib/core/kanji-data.js":
/*!****************************************************!*\
  !*** ./node_modules/qrcode/lib/core/kanji-data.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Mode = __webpack_require__(/*! ./mode */ "./node_modules/qrcode/lib/core/mode.js")
const Utils = __webpack_require__(/*! ./utils */ "./node_modules/qrcode/lib/core/utils.js")

function KanjiData (data) {
  this.mode = Mode.KANJI
  this.data = data
}

KanjiData.getBitsLength = function getBitsLength (length) {
  return length * 13
}

KanjiData.prototype.getLength = function getLength () {
  return this.data.length
}

KanjiData.prototype.getBitsLength = function getBitsLength () {
  return KanjiData.getBitsLength(this.data.length)
}

KanjiData.prototype.write = function (bitBuffer) {
  let i

  // In the Shift JIS system, Kanji characters are represented by a two byte combination.
  // These byte values are shifted from the JIS X 0208 values.
  // JIS X 0208 gives details of the shift coded representation.
  for (i = 0; i < this.data.length; i++) {
    let value = Utils.toSJIS(this.data[i])

    // For characters with Shift JIS values from 0x8140 to 0x9FFC:
    if (value >= 0x8140 && value <= 0x9FFC) {
      // Subtract 0x8140 from Shift JIS value
      value -= 0x8140

    // For characters with Shift JIS values from 0xE040 to 0xEBBF
    } else if (value >= 0xE040 && value <= 0xEBBF) {
      // Subtract 0xC140 from Shift JIS value
      value -= 0xC140
    } else {
      throw new Error(
        'Invalid SJIS character: ' + this.data[i] + '\n' +
        'Make sure your charset is UTF-8')
    }

    // Multiply most significant byte of result by 0xC0
    // and add least significant byte to product
    value = (((value >>> 8) & 0xff) * 0xC0) + (value & 0xff)

    // Convert result to a 13-bit binary string
    bitBuffer.put(value, 13)
  }
}

module.exports = KanjiData


/***/ }),

/***/ "./node_modules/qrcode/lib/core/mask-pattern.js":
/*!******************************************************!*\
  !*** ./node_modules/qrcode/lib/core/mask-pattern.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

/**
 * Data mask pattern reference
 * @type {Object}
 */
exports.Patterns = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
}

/**
 * Weighted penalty scores for the undesirable features
 * @type {Object}
 */
const PenaltyScores = {
  N1: 3,
  N2: 3,
  N3: 40,
  N4: 10
}

/**
 * Check if mask pattern value is valid
 *
 * @param  {Number}  mask    Mask pattern
 * @return {Boolean}         true if valid, false otherwise
 */
exports.isValid = function isValid (mask) {
  return mask != null && mask !== '' && !isNaN(mask) && mask >= 0 && mask <= 7
}

/**
 * Returns mask pattern from a value.
 * If value is not valid, returns undefined
 *
 * @param  {Number|String} value        Mask pattern value
 * @return {Number}                     Valid mask pattern or undefined
 */
exports.from = function from (value) {
  return exports.isValid(value) ? parseInt(value, 10) : undefined
}

/**
* Find adjacent modules in row/column with the same color
* and assign a penalty value.
*
* Points: N1 + i
* i is the amount by which the number of adjacent modules of the same color exceeds 5
*/
exports.getPenaltyN1 = function getPenaltyN1 (data) {
  const size = data.size
  let points = 0
  let sameCountCol = 0
  let sameCountRow = 0
  let lastCol = null
  let lastRow = null

  for (let row = 0; row < size; row++) {
    sameCountCol = sameCountRow = 0
    lastCol = lastRow = null

    for (let col = 0; col < size; col++) {
      let module = data.get(row, col)
      if (module === lastCol) {
        sameCountCol++
      } else {
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5)
        lastCol = module
        sameCountCol = 1
      }

      module = data.get(col, row)
      if (module === lastRow) {
        sameCountRow++
      } else {
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5)
        lastRow = module
        sameCountRow = 1
      }
    }

    if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5)
    if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5)
  }

  return points
}

/**
 * Find 2x2 blocks with the same color and assign a penalty value
 *
 * Points: N2 * (m - 1) * (n - 1)
 */
exports.getPenaltyN2 = function getPenaltyN2 (data) {
  const size = data.size
  let points = 0

  for (let row = 0; row < size - 1; row++) {
    for (let col = 0; col < size - 1; col++) {
      const last = data.get(row, col) +
        data.get(row, col + 1) +
        data.get(row + 1, col) +
        data.get(row + 1, col + 1)

      if (last === 4 || last === 0) points++
    }
  }

  return points * PenaltyScores.N2
}

/**
 * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
 * preceded or followed by light area 4 modules wide
 *
 * Points: N3 * number of pattern found
 */
exports.getPenaltyN3 = function getPenaltyN3 (data) {
  const size = data.size
  let points = 0
  let bitsCol = 0
  let bitsRow = 0

  for (let row = 0; row < size; row++) {
    bitsCol = bitsRow = 0
    for (let col = 0; col < size; col++) {
      bitsCol = ((bitsCol << 1) & 0x7FF) | data.get(row, col)
      if (col >= 10 && (bitsCol === 0x5D0 || bitsCol === 0x05D)) points++

      bitsRow = ((bitsRow << 1) & 0x7FF) | data.get(col, row)
      if (col >= 10 && (bitsRow === 0x5D0 || bitsRow === 0x05D)) points++
    }
  }

  return points * PenaltyScores.N3
}

/**
 * Calculate proportion of dark modules in entire symbol
 *
 * Points: N4 * k
 *
 * k is the rating of the deviation of the proportion of dark modules
 * in the symbol from 50% in steps of 5%
 */
exports.getPenaltyN4 = function getPenaltyN4 (data) {
  let darkCount = 0
  const modulesCount = data.data.length

  for (let i = 0; i < modulesCount; i++) darkCount += data.data[i]

  const k = Math.abs(Math.ceil((darkCount * 100 / modulesCount) / 5) - 10)

  return k * PenaltyScores.N4
}

/**
 * Return mask value at given position
 *
 * @param  {Number} maskPattern Pattern reference value
 * @param  {Number} i           Row
 * @param  {Number} j           Column
 * @return {Boolean}            Mask value
 */
function getMaskAt (maskPattern, i, j) {
  switch (maskPattern) {
    case exports.Patterns.PATTERN000: return (i + j) % 2 === 0
    case exports.Patterns.PATTERN001: return i % 2 === 0
    case exports.Patterns.PATTERN010: return j % 3 === 0
    case exports.Patterns.PATTERN011: return (i + j) % 3 === 0
    case exports.Patterns.PATTERN100: return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0
    case exports.Patterns.PATTERN101: return (i * j) % 2 + (i * j) % 3 === 0
    case exports.Patterns.PATTERN110: return ((i * j) % 2 + (i * j) % 3) % 2 === 0
    case exports.Patterns.PATTERN111: return ((i * j) % 3 + (i + j) % 2) % 2 === 0

    default: throw new Error('bad maskPattern:' + maskPattern)
  }
}

/**
 * Apply a mask pattern to a BitMatrix
 *
 * @param  {Number}    pattern Pattern reference number
 * @param  {BitMatrix} data    BitMatrix data
 */
exports.applyMask = function applyMask (pattern, data) {
  const size = data.size

  for (let col = 0; col < size; col++) {
    for (let row = 0; row < size; row++) {
      if (data.isReserved(row, col)) continue
      data.xor(row, col, getMaskAt(pattern, row, col))
    }
  }
}

/**
 * Returns the best mask pattern for data
 *
 * @param  {BitMatrix} data
 * @return {Number} Mask pattern reference number
 */
exports.getBestMask = function getBestMask (data, setupFormatFunc) {
  const numPatterns = Object.keys(exports.Patterns).length
  let bestPattern = 0
  let lowerPenalty = Infinity

  for (let p = 0; p < numPatterns; p++) {
    setupFormatFunc(p)
    exports.applyMask(p, data)

    // Calculate penalty
    const penalty =
      exports.getPenaltyN1(data) +
      exports.getPenaltyN2(data) +
      exports.getPenaltyN3(data) +
      exports.getPenaltyN4(data)

    // Undo previously applied mask
    exports.applyMask(p, data)

    if (penalty < lowerPenalty) {
      lowerPenalty = penalty
      bestPattern = p
    }
  }

  return bestPattern
}


/***/ }),

/***/ "./node_modules/qrcode/lib/core/mode.js":
/*!**********************************************!*\
  !*** ./node_modules/qrcode/lib/core/mode.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const VersionCheck = __webpack_require__(/*! ./version-check */ "./node_modules/qrcode/lib/core/version-check.js")
const Regex = __webpack_require__(/*! ./regex */ "./node_modules/qrcode/lib/core/regex.js")

/**
 * Numeric mode encodes data from the decimal digit set (0 - 9)
 * (byte values 30HEX to 39HEX).
 * Normally, 3 data characters are represented by 10 bits.
 *
 * @type {Object}
 */
exports.NUMERIC = {
  id: 'Numeric',
  bit: 1 << 0,
  ccBits: [10, 12, 14]
}

/**
 * Alphanumeric mode encodes data from a set of 45 characters,
 * i.e. 10 numeric digits (0 - 9),
 *      26 alphabetic characters (A - Z),
 *   and 9 symbols (SP, $, %, *, +, -, ., /, :).
 * Normally, two input characters are represented by 11 bits.
 *
 * @type {Object}
 */
exports.ALPHANUMERIC = {
  id: 'Alphanumeric',
  bit: 1 << 1,
  ccBits: [9, 11, 13]
}

/**
 * In byte mode, data is encoded at 8 bits per character.
 *
 * @type {Object}
 */
exports.BYTE = {
  id: 'Byte',
  bit: 1 << 2,
  ccBits: [8, 16, 16]
}

/**
 * The Kanji mode efficiently encodes Kanji characters in accordance with
 * the Shift JIS system based on JIS X 0208.
 * The Shift JIS values are shifted from the JIS X 0208 values.
 * JIS X 0208 gives details of the shift coded representation.
 * Each two-byte character value is compacted to a 13-bit binary codeword.
 *
 * @type {Object}
 */
exports.KANJI = {
  id: 'Kanji',
  bit: 1 << 3,
  ccBits: [8, 10, 12]
}

/**
 * Mixed mode will contain a sequences of data in a combination of any of
 * the modes described above
 *
 * @type {Object}
 */
exports.MIXED = {
  bit: -1
}

/**
 * Returns the number of bits needed to store the data length
 * according to QR Code specifications.
 *
 * @param  {Mode}   mode    Data mode
 * @param  {Number} version QR Code version
 * @return {Number}         Number of bits
 */
exports.getCharCountIndicator = function getCharCountIndicator (mode, version) {
  if (!mode.ccBits) throw new Error('Invalid mode: ' + mode)

  if (!VersionCheck.isValid(version)) {
    throw new Error('Invalid version: ' + version)
  }

  if (version >= 1 && version < 10) return mode.ccBits[0]
  else if (version < 27) return mode.ccBits[1]
  return mode.ccBits[2]
}

/**
 * Returns the most efficient mode to store the specified data
 *
 * @param  {String} dataStr Input data string
 * @return {Mode}           Best mode
 */
exports.getBestModeForData = function getBestModeForData (dataStr) {
  if (Regex.testNumeric(dataStr)) return exports.NUMERIC
  else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC
  else if (Regex.testKanji(dataStr)) return exports.KANJI
  else return exports.BYTE
}

/**
 * Return mode name as string
 *
 * @param {Mode} mode Mode object
 * @returns {String}  Mode name
 */
exports.toString = function toString (mode) {
  if (mode && mode.id) return mode.id
  throw new Error('Invalid mode')
}

/**
 * Check if input param is a valid mode object
 *
 * @param   {Mode}    mode Mode object
 * @returns {Boolean} True if valid mode, false otherwise
 */
exports.isValid = function isValid (mode) {
  return mode && mode.bit && mode.ccBits
}

/**
 * Get mode object from its name
 *
 * @param   {String} string Mode name
 * @returns {Mode}          Mode object
 */
function fromString (string) {
  if (typeof string !== 'string') {
    throw new Error('Param is not a string')
  }

  const lcStr = string.toLowerCase()

  switch (lcStr) {
    case 'numeric':
      return exports.NUMERIC
    case 'alphanumeric':
      return exports.ALPHANUMERIC
    case 'kanji':
      return exports.KANJI
    case 'byte':
      return exports.BYTE
    default:
      throw new Error('Unknown mode: ' + string)
  }
}

/**
 * Returns mode from a value.
 * If value is not a valid mode, returns defaultValue
 *
 * @param  {Mode|String} value        Encoding mode
 * @param  {Mode}        defaultValue Fallback value
 * @return {Mode}                     Encoding mode
 */
exports.from = function from (value, defaultValue) {
  if (exports.isValid(value)) {
    return value
  }

  try {
    return fromString(value)
  } catch (e) {
    return defaultValue
  }
}


/***/ }),

/***/ "./node_modules/qrcode/lib/core/numeric-data.js":
/*!******************************************************!*\
  !*** ./node_modules/qrcode/lib/core/numeric-data.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Mode = __webpack_require__(/*! ./mode */ "./node_modules/qrcode/lib/core/mode.js")

function NumericData (data) {
  this.mode = Mode.NUMERIC
  this.data = data.toString()
}

NumericData.getBitsLength = function getBitsLength (length) {
  return 10 * Math.floor(length / 3) + ((length % 3) ? ((length % 3) * 3 + 1) : 0)
}

NumericData.prototype.getLength = function getLength () {
  return this.data.length
}

NumericData.prototype.getBitsLength = function getBitsLength () {
  return NumericData.getBitsLength(this.data.length)
}

NumericData.prototype.write = function write (bitBuffer) {
  let i, group, value

  // The input data string is divided into groups of three digits,
  // and each group is converted to its 10-bit binary equivalent.
  for (i = 0; i + 3 <= this.data.length; i += 3) {
    group = this.data.substr(i, 3)
    value = parseInt(group, 10)

    bitBuffer.put(value, 10)
  }

  // If the number of input digits is not an exact multiple of three,
  // the final one or two digits are converted to 4 or 7 bits respectively.
  const remainingNum = this.data.length - i
  if (remainingNum > 0) {
    group = this.data.substr(i)
    value = parseInt(group, 10)

    bitBuffer.put(value, remainingNum * 3 + 1)
  }
}

module.exports = NumericData


/***/ }),

/***/ "./node_modules/qrcode/lib/core/polynomial.js":
/*!****************************************************!*\
  !*** ./node_modules/qrcode/lib/core/polynomial.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const GF = __webpack_require__(/*! ./galois-field */ "./node_modules/qrcode/lib/core/galois-field.js")

/**
 * Multiplies two polynomials inside Galois Field
 *
 * @param  {Uint8Array} p1 Polynomial
 * @param  {Uint8Array} p2 Polynomial
 * @return {Uint8Array}    Product of p1 and p2
 */
exports.mul = function mul (p1, p2) {
  const coeff = new Uint8Array(p1.length + p2.length - 1)

  for (let i = 0; i < p1.length; i++) {
    for (let j = 0; j < p2.length; j++) {
      coeff[i + j] ^= GF.mul(p1[i], p2[j])
    }
  }

  return coeff
}

/**
 * Calculate the remainder of polynomials division
 *
 * @param  {Uint8Array} divident Polynomial
 * @param  {Uint8Array} divisor  Polynomial
 * @return {Uint8Array}          Remainder
 */
exports.mod = function mod (divident, divisor) {
  let result = new Uint8Array(divident)

  while ((result.length - divisor.length) >= 0) {
    const coeff = result[0]

    for (let i = 0; i < divisor.length; i++) {
      result[i] ^= GF.mul(divisor[i], coeff)
    }

    // remove all zeros from buffer head
    let offset = 0
    while (offset < result.length && result[offset] === 0) offset++
    result = result.slice(offset)
  }

  return result
}

/**
 * Generate an irreducible generator polynomial of specified degree
 * (used by Reed-Solomon encoder)
 *
 * @param  {Number} degree Degree of the generator polynomial
 * @return {Uint8Array}    Buffer containing polynomial coefficients
 */
exports.generateECPolynomial = function generateECPolynomial (degree) {
  let poly = new Uint8Array([1])
  for (let i = 0; i < degree; i++) {
    poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]))
  }

  return poly
}


/***/ }),

/***/ "./node_modules/qrcode/lib/core/qrcode.js":
/*!************************************************!*\
  !*** ./node_modules/qrcode/lib/core/qrcode.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const Utils = __webpack_require__(/*! ./utils */ "./node_modules/qrcode/lib/core/utils.js")
const ECLevel = __webpack_require__(/*! ./error-correction-level */ "./node_modules/qrcode/lib/core/error-correction-level.js")
const BitBuffer = __webpack_require__(/*! ./bit-buffer */ "./node_modules/qrcode/lib/core/bit-buffer.js")
const BitMatrix = __webpack_require__(/*! ./bit-matrix */ "./node_modules/qrcode/lib/core/bit-matrix.js")
const AlignmentPattern = __webpack_require__(/*! ./alignment-pattern */ "./node_modules/qrcode/lib/core/alignment-pattern.js")
const FinderPattern = __webpack_require__(/*! ./finder-pattern */ "./node_modules/qrcode/lib/core/finder-pattern.js")
const MaskPattern = __webpack_require__(/*! ./mask-pattern */ "./node_modules/qrcode/lib/core/mask-pattern.js")
const ECCode = __webpack_require__(/*! ./error-correction-code */ "./node_modules/qrcode/lib/core/error-correction-code.js")
const ReedSolomonEncoder = __webpack_require__(/*! ./reed-solomon-encoder */ "./node_modules/qrcode/lib/core/reed-solomon-encoder.js")
const Version = __webpack_require__(/*! ./version */ "./node_modules/qrcode/lib/core/version.js")
const FormatInfo = __webpack_require__(/*! ./format-info */ "./node_modules/qrcode/lib/core/format-info.js")
const Mode = __webpack_require__(/*! ./mode */ "./node_modules/qrcode/lib/core/mode.js")
const Segments = __webpack_require__(/*! ./segments */ "./node_modules/qrcode/lib/core/segments.js")

/**
 * QRCode for JavaScript
 *
 * modified by Ryan Day for nodejs support
 * Copyright (c) 2011 Ryan Day
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
*/

/**
 * Add finder patterns bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupFinderPattern (matrix, version) {
  const size = matrix.size
  const pos = FinderPattern.getPositions(version)

  for (let i = 0; i < pos.length; i++) {
    const row = pos[i][0]
    const col = pos[i][1]

    for (let r = -1; r <= 7; r++) {
      if (row + r <= -1 || size <= row + r) continue

      for (let c = -1; c <= 7; c++) {
        if (col + c <= -1 || size <= col + c) continue

        if ((r >= 0 && r <= 6 && (c === 0 || c === 6)) ||
          (c >= 0 && c <= 6 && (r === 0 || r === 6)) ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
          matrix.set(row + r, col + c, true, true)
        } else {
          matrix.set(row + r, col + c, false, true)
        }
      }
    }
  }
}

/**
 * Add timing pattern bits to matrix
 *
 * Note: this function must be called before {@link setupAlignmentPattern}
 *
 * @param  {BitMatrix} matrix Modules matrix
 */
function setupTimingPattern (matrix) {
  const size = matrix.size

  for (let r = 8; r < size - 8; r++) {
    const value = r % 2 === 0
    matrix.set(r, 6, value, true)
    matrix.set(6, r, value, true)
  }
}

/**
 * Add alignment patterns bits to matrix
 *
 * Note: this function must be called after {@link setupTimingPattern}
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupAlignmentPattern (matrix, version) {
  const pos = AlignmentPattern.getPositions(version)

  for (let i = 0; i < pos.length; i++) {
    const row = pos[i][0]
    const col = pos[i][1]

    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        if (r === -2 || r === 2 || c === -2 || c === 2 ||
          (r === 0 && c === 0)) {
          matrix.set(row + r, col + c, true, true)
        } else {
          matrix.set(row + r, col + c, false, true)
        }
      }
    }
  }
}

/**
 * Add version info bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupVersionInfo (matrix, version) {
  const size = matrix.size
  const bits = Version.getEncodedBits(version)
  let row, col, mod

  for (let i = 0; i < 18; i++) {
    row = Math.floor(i / 3)
    col = i % 3 + size - 8 - 3
    mod = ((bits >> i) & 1) === 1

    matrix.set(row, col, mod, true)
    matrix.set(col, row, mod, true)
  }
}

/**
 * Add format info bits to matrix
 *
 * @param  {BitMatrix} matrix               Modules matrix
 * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
 * @param  {Number}    maskPattern          Mask pattern reference value
 */
function setupFormatInfo (matrix, errorCorrectionLevel, maskPattern) {
  const size = matrix.size
  const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern)
  let i, mod

  for (i = 0; i < 15; i++) {
    mod = ((bits >> i) & 1) === 1

    // vertical
    if (i < 6) {
      matrix.set(i, 8, mod, true)
    } else if (i < 8) {
      matrix.set(i + 1, 8, mod, true)
    } else {
      matrix.set(size - 15 + i, 8, mod, true)
    }

    // horizontal
    if (i < 8) {
      matrix.set(8, size - i - 1, mod, true)
    } else if (i < 9) {
      matrix.set(8, 15 - i - 1 + 1, mod, true)
    } else {
      matrix.set(8, 15 - i - 1, mod, true)
    }
  }

  // fixed module
  matrix.set(size - 8, 8, 1, true)
}

/**
 * Add encoded data bits to matrix
 *
 * @param  {BitMatrix}  matrix Modules matrix
 * @param  {Uint8Array} data   Data codewords
 */
function setupData (matrix, data) {
  const size = matrix.size
  let inc = -1
  let row = size - 1
  let bitIndex = 7
  let byteIndex = 0

  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6) col--

    while (true) {
      for (let c = 0; c < 2; c++) {
        if (!matrix.isReserved(row, col - c)) {
          let dark = false

          if (byteIndex < data.length) {
            dark = (((data[byteIndex] >>> bitIndex) & 1) === 1)
          }

          matrix.set(row, col - c, dark)
          bitIndex--

          if (bitIndex === -1) {
            byteIndex++
            bitIndex = 7
          }
        }
      }

      row += inc

      if (row < 0 || size <= row) {
        row -= inc
        inc = -inc
        break
      }
    }
  }
}

/**
 * Create encoded codewords from data input
 *
 * @param  {Number}   version              QR Code version
 * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
 * @param  {ByteData} data                 Data input
 * @return {Uint8Array}                    Buffer containing encoded codewords
 */
function createData (version, errorCorrectionLevel, segments) {
  // Prepare data buffer
  const buffer = new BitBuffer()

  segments.forEach(function (data) {
    // prefix data with mode indicator (4 bits)
    buffer.put(data.mode.bit, 4)

    // Prefix data with character count indicator.
    // The character count indicator is a string of bits that represents the
    // number of characters that are being encoded.
    // The character count indicator must be placed after the mode indicator
    // and must be a certain number of bits long, depending on the QR version
    // and data mode
    // @see {@link Mode.getCharCountIndicator}.
    buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version))

    // add binary data sequence to buffer
    data.write(buffer)
  })

  // Calculate required number of bits
  const totalCodewords = Utils.getSymbolTotalCodewords(version)
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel)
  const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8

  // Add a terminator.
  // If the bit string is shorter than the total number of required bits,
  // a terminator of up to four 0s must be added to the right side of the string.
  // If the bit string is more than four bits shorter than the required number of bits,
  // add four 0s to the end.
  if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
    buffer.put(0, 4)
  }

  // If the bit string is fewer than four bits shorter, add only the number of 0s that
  // are needed to reach the required number of bits.

  // After adding the terminator, if the number of bits in the string is not a multiple of 8,
  // pad the string on the right with 0s to make the string's length a multiple of 8.
  while (buffer.getLengthInBits() % 8 !== 0) {
    buffer.putBit(0)
  }

  // Add pad bytes if the string is still shorter than the total number of required bits.
  // Extend the buffer to fill the data capacity of the symbol corresponding to
  // the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
  // and 00010001 (0x11) alternately.
  const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8
  for (let i = 0; i < remainingByte; i++) {
    buffer.put(i % 2 ? 0x11 : 0xEC, 8)
  }

  return createCodewords(buffer, version, errorCorrectionLevel)
}

/**
 * Encode input data with Reed-Solomon and return codewords with
 * relative error correction bits
 *
 * @param  {BitBuffer} bitBuffer            Data to encode
 * @param  {Number}    version              QR Code version
 * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
 * @return {Uint8Array}                     Buffer containing encoded codewords
 */
function createCodewords (bitBuffer, version, errorCorrectionLevel) {
  // Total codewords for this QR code version (Data + Error correction)
  const totalCodewords = Utils.getSymbolTotalCodewords(version)

  // Total number of error correction codewords
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel)

  // Total number of data codewords
  const dataTotalCodewords = totalCodewords - ecTotalCodewords

  // Total number of blocks
  const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel)

  // Calculate how many blocks each group should contain
  const blocksInGroup2 = totalCodewords % ecTotalBlocks
  const blocksInGroup1 = ecTotalBlocks - blocksInGroup2

  const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks)

  const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks)
  const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1

  // Number of EC codewords is the same for both groups
  const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1

  // Initialize a Reed-Solomon encoder with a generator polynomial of degree ecCount
  const rs = new ReedSolomonEncoder(ecCount)

  let offset = 0
  const dcData = new Array(ecTotalBlocks)
  const ecData = new Array(ecTotalBlocks)
  let maxDataSize = 0
  const buffer = new Uint8Array(bitBuffer.buffer)

  // Divide the buffer into the required number of blocks
  for (let b = 0; b < ecTotalBlocks; b++) {
    const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2

    // extract a block of data from buffer
    dcData[b] = buffer.slice(offset, offset + dataSize)

    // Calculate EC codewords for this data block
    ecData[b] = rs.encode(dcData[b])

    offset += dataSize
    maxDataSize = Math.max(maxDataSize, dataSize)
  }

  // Create final data
  // Interleave the data and error correction codewords from each block
  const data = new Uint8Array(totalCodewords)
  let index = 0
  let i, r

  // Add data codewords
  for (i = 0; i < maxDataSize; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      if (i < dcData[r].length) {
        data[index++] = dcData[r][i]
      }
    }
  }

  // Apped EC codewords
  for (i = 0; i < ecCount; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      data[index++] = ecData[r][i]
    }
  }

  return data
}

/**
 * Build QR Code symbol
 *
 * @param  {String} data                 Input string
 * @param  {Number} version              QR Code version
 * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
 * @param  {MaskPattern} maskPattern     Mask pattern
 * @return {Object}                      Object containing symbol data
 */
function createSymbol (data, version, errorCorrectionLevel, maskPattern) {
  let segments

  if (Array.isArray(data)) {
    segments = Segments.fromArray(data)
  } else if (typeof data === 'string') {
    let estimatedVersion = version

    if (!estimatedVersion) {
      const rawSegments = Segments.rawSplit(data)

      // Estimate best version that can contain raw splitted segments
      estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel)
    }

    // Build optimized segments
    // If estimated version is undefined, try with the highest version
    segments = Segments.fromString(data, estimatedVersion || 40)
  } else {
    throw new Error('Invalid data')
  }

  // Get the min version that can contain data
  const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel)

  // If no version is found, data cannot be stored
  if (!bestVersion) {
    throw new Error('The amount of data is too big to be stored in a QR Code')
  }

  // If not specified, use min version as default
  if (!version) {
    version = bestVersion

  // Check if the specified version can contain the data
  } else if (version < bestVersion) {
    throw new Error('\n' +
      'The chosen QR Code version cannot contain this amount of data.\n' +
      'Minimum version required to store current data is: ' + bestVersion + '.\n'
    )
  }

  const dataBits = createData(version, errorCorrectionLevel, segments)

  // Allocate matrix buffer
  const moduleCount = Utils.getSymbolSize(version)
  const modules = new BitMatrix(moduleCount)

  // Add function modules
  setupFinderPattern(modules, version)
  setupTimingPattern(modules)
  setupAlignmentPattern(modules, version)

  // Add temporary dummy bits for format info just to set them as reserved.
  // This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
  // since the masking operation must be performed only on the encoding region.
  // These blocks will be replaced with correct values later in code.
  setupFormatInfo(modules, errorCorrectionLevel, 0)

  if (version >= 7) {
    setupVersionInfo(modules, version)
  }

  // Add data codewords
  setupData(modules, dataBits)

  if (isNaN(maskPattern)) {
    // Find best mask pattern
    maskPattern = MaskPattern.getBestMask(modules,
      setupFormatInfo.bind(null, modules, errorCorrectionLevel))
  }

  // Apply mask pattern
  MaskPattern.applyMask(maskPattern, modules)

  // Replace format info bits with correct values
  setupFormatInfo(modules, errorCorrectionLevel, maskPattern)

  return {
    modules: modules,
    version: version,
    errorCorrectionLevel: errorCorrectionLevel,
    maskPattern: maskPattern,
    segments: segments
  }
}

/**
 * QR Code
 *
 * @param {String | Array} data                 Input data
 * @param {Object} options                      Optional configurations
 * @param {Number} options.version              QR Code version
 * @param {String} options.errorCorrectionLevel Error correction level
 * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
 */
exports.create = function create (data, options) {
  if (typeof data === 'undefined' || data === '') {
    throw new Error('No input text')
  }

  let errorCorrectionLevel = ECLevel.M
  let version
  let mask

  if (typeof options !== 'undefined') {
    // Use higher error correction level as default
    errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M)
    version = Version.from(options.version)
    mask = MaskPattern.from(options.maskPattern)

    if (options.toSJISFunc) {
      Utils.setToSJISFunction(options.toSJISFunc)
    }
  }

  return createSymbol(data, version, errorCorrectionLevel, mask)
}


/***/ }),

/***/ "./node_modules/qrcode/lib/core/reed-solomon-encoder.js":
/*!**************************************************************!*\
  !*** ./node_modules/qrcode/lib/core/reed-solomon-encoder.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Polynomial = __webpack_require__(/*! ./polynomial */ "./node_modules/qrcode/lib/core/polynomial.js")

function ReedSolomonEncoder (degree) {
  this.genPoly = undefined
  this.degree = degree

  if (this.degree) this.initialize(this.degree)
}

/**
 * Initialize the encoder.
 * The input param should correspond to the number of error correction codewords.
 *
 * @param  {Number} degree
 */
ReedSolomonEncoder.prototype.initialize = function initialize (degree) {
  // create an irreducible generator polynomial
  this.degree = degree
  this.genPoly = Polynomial.generateECPolynomial(this.degree)
}

/**
 * Encodes a chunk of data
 *
 * @param  {Uint8Array} data Buffer containing input data
 * @return {Uint8Array}      Buffer containing encoded data
 */
ReedSolomonEncoder.prototype.encode = function encode (data) {
  if (!this.genPoly) {
    throw new Error('Encoder not initialized')
  }

  // Calculate EC for this data block
  // extends data size to data+genPoly size
  const paddedData = new Uint8Array(data.length + this.degree)
  paddedData.set(data)

  // The error correction codewords are the remainder after dividing the data codewords
  // by a generator polynomial
  const remainder = Polynomial.mod(paddedData, this.genPoly)

  // return EC data blocks (last n byte, where n is the degree of genPoly)
  // If coefficients number in remainder are less than genPoly degree,
  // pad with 0s to the left to reach the needed number of coefficients
  const start = this.degree - remainder.length
  if (start > 0) {
    const buff = new Uint8Array(this.degree)
    buff.set(remainder, start)

    return buff
  }

  return remainder
}

module.exports = ReedSolomonEncoder


/***/ }),

/***/ "./node_modules/qrcode/lib/core/regex.js":
/*!***********************************************!*\
  !*** ./node_modules/qrcode/lib/core/regex.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {

const numeric = '[0-9]+'
const alphanumeric = '[A-Z $%*+\\-./:]+'
let kanji = '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|' +
  '[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|' +
  '[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|' +
  '[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+'
kanji = kanji.replace(/u/g, '\\u')

const byte = '(?:(?![A-Z0-9 $%*+\\-./:]|' + kanji + ')(?:.|[\r\n]))+'

exports.KANJI = new RegExp(kanji, 'g')
exports.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g')
exports.BYTE = new RegExp(byte, 'g')
exports.NUMERIC = new RegExp(numeric, 'g')
exports.ALPHANUMERIC = new RegExp(alphanumeric, 'g')

const TEST_KANJI = new RegExp('^' + kanji + '$')
const TEST_NUMERIC = new RegExp('^' + numeric + '$')
const TEST_ALPHANUMERIC = new RegExp('^[A-Z0-9 $%*+\\-./:]+$')

exports.testKanji = function testKanji (str) {
  return TEST_KANJI.test(str)
}

exports.testNumeric = function testNumeric (str) {
  return TEST_NUMERIC.test(str)
}

exports.testAlphanumeric = function testAlphanumeric (str) {
  return TEST_ALPHANUMERIC.test(str)
}


/***/ }),

/***/ "./node_modules/qrcode/lib/core/segments.js":
/*!**************************************************!*\
  !*** ./node_modules/qrcode/lib/core/segments.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const Mode = __webpack_require__(/*! ./mode */ "./node_modules/qrcode/lib/core/mode.js")
const NumericData = __webpack_require__(/*! ./numeric-data */ "./node_modules/qrcode/lib/core/numeric-data.js")
const AlphanumericData = __webpack_require__(/*! ./alphanumeric-data */ "./node_modules/qrcode/lib/core/alphanumeric-data.js")
const ByteData = __webpack_require__(/*! ./byte-data */ "./node_modules/qrcode/lib/core/byte-data.js")
const KanjiData = __webpack_require__(/*! ./kanji-data */ "./node_modules/qrcode/lib/core/kanji-data.js")
const Regex = __webpack_require__(/*! ./regex */ "./node_modules/qrcode/lib/core/regex.js")
const Utils = __webpack_require__(/*! ./utils */ "./node_modules/qrcode/lib/core/utils.js")
const dijkstra = __webpack_require__(/*! dijkstrajs */ "./node_modules/dijkstrajs/dijkstra.js")

/**
 * Returns UTF8 byte length
 *
 * @param  {String} str Input string
 * @return {Number}     Number of byte
 */
function getStringByteLength (str) {
  return unescape(encodeURIComponent(str)).length
}

/**
 * Get a list of segments of the specified mode
 * from a string
 *
 * @param  {Mode}   mode Segment mode
 * @param  {String} str  String to process
 * @return {Array}       Array of object with segments data
 */
function getSegments (regex, mode, str) {
  const segments = []
  let result

  while ((result = regex.exec(str)) !== null) {
    segments.push({
      data: result[0],
      index: result.index,
      mode: mode,
      length: result[0].length
    })
  }

  return segments
}

/**
 * Extracts a series of segments with the appropriate
 * modes from a string
 *
 * @param  {String} dataStr Input string
 * @return {Array}          Array of object with segments data
 */
function getSegmentsFromString (dataStr) {
  const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr)
  const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr)
  let byteSegs
  let kanjiSegs

  if (Utils.isKanjiModeEnabled()) {
    byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr)
    kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr)
  } else {
    byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr)
    kanjiSegs = []
  }

  const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs)

  return segs
    .sort(function (s1, s2) {
      return s1.index - s2.index
    })
    .map(function (obj) {
      return {
        data: obj.data,
        mode: obj.mode,
        length: obj.length
      }
    })
}

/**
 * Returns how many bits are needed to encode a string of
 * specified length with the specified mode
 *
 * @param  {Number} length String length
 * @param  {Mode} mode     Segment mode
 * @return {Number}        Bit length
 */
function getSegmentBitsLength (length, mode) {
  switch (mode) {
    case Mode.NUMERIC:
      return NumericData.getBitsLength(length)
    case Mode.ALPHANUMERIC:
      return AlphanumericData.getBitsLength(length)
    case Mode.KANJI:
      return KanjiData.getBitsLength(length)
    case Mode.BYTE:
      return ByteData.getBitsLength(length)
  }
}

/**
 * Merges adjacent segments which have the same mode
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */
function mergeSegments (segs) {
  return segs.reduce(function (acc, curr) {
    const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null
    if (prevSeg && prevSeg.mode === curr.mode) {
      acc[acc.length - 1].data += curr.data
      return acc
    }

    acc.push(curr)
    return acc
  }, [])
}

/**
 * Generates a list of all possible nodes combination which
 * will be used to build a segments graph.
 *
 * Nodes are divided by groups. Each group will contain a list of all the modes
 * in which is possible to encode the given text.
 *
 * For example the text '12345' can be encoded as Numeric, Alphanumeric or Byte.
 * The group for '12345' will contain then 3 objects, one for each
 * possible encoding mode.
 *
 * Each node represents a possible segment.
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */
function buildNodes (segs) {
  const nodes = []
  for (let i = 0; i < segs.length; i++) {
    const seg = segs[i]

    switch (seg.mode) {
      case Mode.NUMERIC:
        nodes.push([seg,
          { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
          { data: seg.data, mode: Mode.BYTE, length: seg.length }
        ])
        break
      case Mode.ALPHANUMERIC:
        nodes.push([seg,
          { data: seg.data, mode: Mode.BYTE, length: seg.length }
        ])
        break
      case Mode.KANJI:
        nodes.push([seg,
          { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
        ])
        break
      case Mode.BYTE:
        nodes.push([
          { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
        ])
    }
  }

  return nodes
}

/**
 * Builds a graph from a list of nodes.
 * All segments in each node group will be connected with all the segments of
 * the next group and so on.
 *
 * At each connection will be assigned a weight depending on the
 * segment's byte length.
 *
 * @param  {Array} nodes    Array of object with segments data
 * @param  {Number} version QR Code version
 * @return {Object}         Graph of all possible segments
 */
function buildGraph (nodes, version) {
  const table = {}
  const graph = { start: {} }
  let prevNodeIds = ['start']

  for (let i = 0; i < nodes.length; i++) {
    const nodeGroup = nodes[i]
    const currentNodeIds = []

    for (let j = 0; j < nodeGroup.length; j++) {
      const node = nodeGroup[j]
      const key = '' + i + j

      currentNodeIds.push(key)
      table[key] = { node: node, lastCount: 0 }
      graph[key] = {}

      for (let n = 0; n < prevNodeIds.length; n++) {
        const prevNodeId = prevNodeIds[n]

        if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
          graph[prevNodeId][key] =
            getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) -
            getSegmentBitsLength(table[prevNodeId].lastCount, node.mode)

          table[prevNodeId].lastCount += node.length
        } else {
          if (table[prevNodeId]) table[prevNodeId].lastCount = node.length

          graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) +
            4 + Mode.getCharCountIndicator(node.mode, version) // switch cost
        }
      }
    }

    prevNodeIds = currentNodeIds
  }

  for (let n = 0; n < prevNodeIds.length; n++) {
    graph[prevNodeIds[n]].end = 0
  }

  return { map: graph, table: table }
}

/**
 * Builds a segment from a specified data and mode.
 * If a mode is not specified, the more suitable will be used.
 *
 * @param  {String} data             Input data
 * @param  {Mode | String} modesHint Data mode
 * @return {Segment}                 Segment
 */
function buildSingleSegment (data, modesHint) {
  let mode
  const bestMode = Mode.getBestModeForData(data)

  mode = Mode.from(modesHint, bestMode)

  // Make sure data can be encoded
  if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
    throw new Error('"' + data + '"' +
      ' cannot be encoded with mode ' + Mode.toString(mode) +
      '.\n Suggested mode is: ' + Mode.toString(bestMode))
  }

  // Use Mode.BYTE if Kanji support is disabled
  if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
    mode = Mode.BYTE
  }

  switch (mode) {
    case Mode.NUMERIC:
      return new NumericData(data)

    case Mode.ALPHANUMERIC:
      return new AlphanumericData(data)

    case Mode.KANJI:
      return new KanjiData(data)

    case Mode.BYTE:
      return new ByteData(data)
  }
}

/**
 * Builds a list of segments from an array.
 * Array can contain Strings or Objects with segment's info.
 *
 * For each item which is a string, will be generated a segment with the given
 * string and the more appropriate encoding mode.
 *
 * For each item which is an object, will be generated a segment with the given
 * data and mode.
 * Objects must contain at least the property "data".
 * If property "mode" is not present, the more suitable mode will be used.
 *
 * @param  {Array} array Array of objects with segments data
 * @return {Array}       Array of Segments
 */
exports.fromArray = function fromArray (array) {
  return array.reduce(function (acc, seg) {
    if (typeof seg === 'string') {
      acc.push(buildSingleSegment(seg, null))
    } else if (seg.data) {
      acc.push(buildSingleSegment(seg.data, seg.mode))
    }

    return acc
  }, [])
}

/**
 * Builds an optimized sequence of segments from a string,
 * which will produce the shortest possible bitstream.
 *
 * @param  {String} data    Input string
 * @param  {Number} version QR Code version
 * @return {Array}          Array of segments
 */
exports.fromString = function fromString (data, version) {
  const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled())

  const nodes = buildNodes(segs)
  const graph = buildGraph(nodes, version)
  const path = dijkstra.find_path(graph.map, 'start', 'end')

  const optimizedSegs = []
  for (let i = 1; i < path.length - 1; i++) {
    optimizedSegs.push(graph.table[path[i]].node)
  }

  return exports.fromArray(mergeSegments(optimizedSegs))
}

/**
 * Splits a string in various segments with the modes which
 * best represent their content.
 * The produced segments are far from being optimized.
 * The output of this function is only used to estimate a QR Code version
 * which may contain the data.
 *
 * @param  {string} data Input string
 * @return {Array}       Array of segments
 */
exports.rawSplit = function rawSplit (data) {
  return exports.fromArray(
    getSegmentsFromString(data, Utils.isKanjiModeEnabled())
  )
}


/***/ }),

/***/ "./node_modules/qrcode/lib/core/utils.js":
/*!***********************************************!*\
  !*** ./node_modules/qrcode/lib/core/utils.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {

let toSJISFunction
const CODEWORDS_COUNT = [
  0, // Not used
  26, 44, 70, 100, 134, 172, 196, 242, 292, 346,
  404, 466, 532, 581, 655, 733, 815, 901, 991, 1085,
  1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185,
  2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706
]

/**
 * Returns the QR Code size for the specified version
 *
 * @param  {Number} version QR Code version
 * @return {Number}         size of QR code
 */
exports.getSymbolSize = function getSymbolSize (version) {
  if (!version) throw new Error('"version" cannot be null or undefined')
  if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40')
  return version * 4 + 17
}

/**
 * Returns the total number of codewords used to store data and EC information.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Data length in bits
 */
exports.getSymbolTotalCodewords = function getSymbolTotalCodewords (version) {
  return CODEWORDS_COUNT[version]
}

/**
 * Encode data with Bose-Chaudhuri-Hocquenghem
 *
 * @param  {Number} data Value to encode
 * @return {Number}      Encoded value
 */
exports.getBCHDigit = function (data) {
  let digit = 0

  while (data !== 0) {
    digit++
    data >>>= 1
  }

  return digit
}

exports.setToSJISFunction = function setToSJISFunction (f) {
  if (typeof f !== 'function') {
    throw new Error('"toSJISFunc" is not a valid function.')
  }

  toSJISFunction = f
}

exports.isKanjiModeEnabled = function () {
  return typeof toSJISFunction !== 'undefined'
}

exports.toSJIS = function toSJIS (kanji) {
  return toSJISFunction(kanji)
}


/***/ }),

/***/ "./node_modules/qrcode/lib/core/version-check.js":
/*!*******************************************************!*\
  !*** ./node_modules/qrcode/lib/core/version-check.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

/**
 * Check if QR Code version is valid
 *
 * @param  {Number}  version QR Code version
 * @return {Boolean}         true if valid version, false otherwise
 */
exports.isValid = function isValid (version) {
  return !isNaN(version) && version >= 1 && version <= 40
}


/***/ }),

/***/ "./node_modules/qrcode/lib/core/version.js":
/*!*************************************************!*\
  !*** ./node_modules/qrcode/lib/core/version.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const Utils = __webpack_require__(/*! ./utils */ "./node_modules/qrcode/lib/core/utils.js")
const ECCode = __webpack_require__(/*! ./error-correction-code */ "./node_modules/qrcode/lib/core/error-correction-code.js")
const ECLevel = __webpack_require__(/*! ./error-correction-level */ "./node_modules/qrcode/lib/core/error-correction-level.js")
const Mode = __webpack_require__(/*! ./mode */ "./node_modules/qrcode/lib/core/mode.js")
const VersionCheck = __webpack_require__(/*! ./version-check */ "./node_modules/qrcode/lib/core/version-check.js")

// Generator polynomial used to encode version information
const G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0)
const G18_BCH = Utils.getBCHDigit(G18)

function getBestVersionForDataLength (mode, length, errorCorrectionLevel) {
  for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
      return currentVersion
    }
  }

  return undefined
}

function getReservedBitsCount (mode, version) {
  // Character count indicator + mode indicator bits
  return Mode.getCharCountIndicator(mode, version) + 4
}

function getTotalBitsFromDataArray (segments, version) {
  let totalBits = 0

  segments.forEach(function (data) {
    const reservedBits = getReservedBitsCount(data.mode, version)
    totalBits += reservedBits + data.getBitsLength()
  })

  return totalBits
}

function getBestVersionForMixedData (segments, errorCorrectionLevel) {
  for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
    const length = getTotalBitsFromDataArray(segments, currentVersion)
    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
      return currentVersion
    }
  }

  return undefined
}

/**
 * Returns version number from a value.
 * If value is not a valid version, returns defaultValue
 *
 * @param  {Number|String} value        QR Code version
 * @param  {Number}        defaultValue Fallback value
 * @return {Number}                     QR Code version number
 */
exports.from = function from (value, defaultValue) {
  if (VersionCheck.isValid(value)) {
    return parseInt(value, 10)
  }

  return defaultValue
}

/**
 * Returns how much data can be stored with the specified QR code version
 * and error correction level
 *
 * @param  {Number} version              QR Code version (1-40)
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Mode}   mode                 Data mode
 * @return {Number}                      Quantity of storable data
 */
exports.getCapacity = function getCapacity (version, errorCorrectionLevel, mode) {
  if (!VersionCheck.isValid(version)) {
    throw new Error('Invalid QR Code version')
  }

  // Use Byte mode as default
  if (typeof mode === 'undefined') mode = Mode.BYTE

  // Total codewords for this QR code version (Data + Error correction)
  const totalCodewords = Utils.getSymbolTotalCodewords(version)

  // Total number of error correction codewords
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel)

  // Total number of data codewords
  const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8

  if (mode === Mode.MIXED) return dataTotalCodewordsBits

  const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version)

  // Return max number of storable codewords
  switch (mode) {
    case Mode.NUMERIC:
      return Math.floor((usableBits / 10) * 3)

    case Mode.ALPHANUMERIC:
      return Math.floor((usableBits / 11) * 2)

    case Mode.KANJI:
      return Math.floor(usableBits / 13)

    case Mode.BYTE:
    default:
      return Math.floor(usableBits / 8)
  }
}

/**
 * Returns the minimum version needed to contain the amount of data
 *
 * @param  {Segment} data                    Segment of data
 * @param  {Number} [errorCorrectionLevel=H] Error correction level
 * @param  {Mode} mode                       Data mode
 * @return {Number}                          QR Code version
 */
exports.getBestVersionForData = function getBestVersionForData (data, errorCorrectionLevel) {
  let seg

  const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M)

  if (Array.isArray(data)) {
    if (data.length > 1) {
      return getBestVersionForMixedData(data, ecl)
    }

    if (data.length === 0) {
      return 1
    }

    seg = data[0]
  } else {
    seg = data
  }

  return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl)
}

/**
 * Returns version information with relative error correction bits
 *
 * The version information is included in QR Code symbols of version 7 or larger.
 * It consists of an 18-bit sequence containing 6 data bits,
 * with 12 error correction bits calculated using the (18, 6) Golay code.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Encoded version info bits
 */
exports.getEncodedBits = function getEncodedBits (version) {
  if (!VersionCheck.isValid(version) || version < 7) {
    throw new Error('Invalid QR Code version')
  }

  let d = version << 12

  while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
    d ^= (G18 << (Utils.getBCHDigit(d) - G18_BCH))
  }

  return (version << 12) | d
}


/***/ }),

/***/ "./node_modules/qrcode/lib/renderer/canvas.js":
/*!****************************************************!*\
  !*** ./node_modules/qrcode/lib/renderer/canvas.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const Utils = __webpack_require__(/*! ./utils */ "./node_modules/qrcode/lib/renderer/utils.js")

function clearCanvas (ctx, canvas, size) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (!canvas.style) canvas.style = {}
  canvas.height = size
  canvas.width = size
  canvas.style.height = size + 'px'
  canvas.style.width = size + 'px'
}

function getCanvasElement () {
  try {
    return document.createElement('canvas')
  } catch (e) {
    throw new Error('You need to specify a canvas element')
  }
}

exports.render = function render (qrData, canvas, options) {
  let opts = options
  let canvasEl = canvas

  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
    opts = canvas
    canvas = undefined
  }

  if (!canvas) {
    canvasEl = getCanvasElement()
  }

  opts = Utils.getOptions(opts)
  const size = Utils.getImageWidth(qrData.modules.size, opts)

  const ctx = canvasEl.getContext('2d')
  const image = ctx.createImageData(size, size)
  Utils.qrToImageData(image.data, qrData, opts)

  clearCanvas(ctx, canvasEl, size)
  ctx.putImageData(image, 0, 0)

  return canvasEl
}

exports.renderToDataURL = function renderToDataURL (qrData, canvas, options) {
  let opts = options

  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
    opts = canvas
    canvas = undefined
  }

  if (!opts) opts = {}

  const canvasEl = exports.render(qrData, canvas, opts)

  const type = opts.type || 'image/png'
  const rendererOpts = opts.rendererOpts || {}

  return canvasEl.toDataURL(type, rendererOpts.quality)
}


/***/ }),

/***/ "./node_modules/qrcode/lib/renderer/svg-tag.js":
/*!*****************************************************!*\
  !*** ./node_modules/qrcode/lib/renderer/svg-tag.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const Utils = __webpack_require__(/*! ./utils */ "./node_modules/qrcode/lib/renderer/utils.js")

function getColorAttrib (color, attrib) {
  const alpha = color.a / 255
  const str = attrib + '="' + color.hex + '"'

  return alpha < 1
    ? str + ' ' + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"'
    : str
}

function svgCmd (cmd, x, y) {
  let str = cmd + x
  if (typeof y !== 'undefined') str += ' ' + y

  return str
}

function qrToPath (data, size, margin) {
  let path = ''
  let moveBy = 0
  let newRow = false
  let lineLength = 0

  for (let i = 0; i < data.length; i++) {
    const col = Math.floor(i % size)
    const row = Math.floor(i / size)

    if (!col && !newRow) newRow = true

    if (data[i]) {
      lineLength++

      if (!(i > 0 && col > 0 && data[i - 1])) {
        path += newRow
          ? svgCmd('M', col + margin, 0.5 + row + margin)
          : svgCmd('m', moveBy, 0)

        moveBy = 0
        newRow = false
      }

      if (!(col + 1 < size && data[i + 1])) {
        path += svgCmd('h', lineLength)
        lineLength = 0
      }
    } else {
      moveBy++
    }
  }

  return path
}

exports.render = function render (qrData, options, cb) {
  const opts = Utils.getOptions(options)
  const size = qrData.modules.size
  const data = qrData.modules.data
  const qrcodesize = size + opts.margin * 2

  const bg = !opts.color.light.a
    ? ''
    : '<path ' + getColorAttrib(opts.color.light, 'fill') +
      ' d="M0 0h' + qrcodesize + 'v' + qrcodesize + 'H0z"/>'

  const path =
    '<path ' + getColorAttrib(opts.color.dark, 'stroke') +
    ' d="' + qrToPath(data, size, opts.margin) + '"/>'

  const viewBox = 'viewBox="' + '0 0 ' + qrcodesize + ' ' + qrcodesize + '"'

  const width = !opts.width ? '' : 'width="' + opts.width + '" height="' + opts.width + '" '

  const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + '</svg>\n'

  if (typeof cb === 'function') {
    cb(null, svgTag)
  }

  return svgTag
}


/***/ }),

/***/ "./node_modules/qrcode/lib/renderer/utils.js":
/*!***************************************************!*\
  !*** ./node_modules/qrcode/lib/renderer/utils.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

function hex2rgba (hex) {
  if (typeof hex === 'number') {
    hex = hex.toString()
  }

  if (typeof hex !== 'string') {
    throw new Error('Color should be defined as hex string')
  }

  let hexCode = hex.slice().replace('#', '').split('')
  if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
    throw new Error('Invalid hex color: ' + hex)
  }

  // Convert from short to long form (fff -> ffffff)
  if (hexCode.length === 3 || hexCode.length === 4) {
    hexCode = Array.prototype.concat.apply([], hexCode.map(function (c) {
      return [c, c]
    }))
  }

  // Add default alpha value
  if (hexCode.length === 6) hexCode.push('F', 'F')

  const hexValue = parseInt(hexCode.join(''), 16)

  return {
    r: (hexValue >> 24) & 255,
    g: (hexValue >> 16) & 255,
    b: (hexValue >> 8) & 255,
    a: hexValue & 255,
    hex: '#' + hexCode.slice(0, 6).join('')
  }
}

exports.getOptions = function getOptions (options) {
  if (!options) options = {}
  if (!options.color) options.color = {}

  const margin = typeof options.margin === 'undefined' ||
    options.margin === null ||
    options.margin < 0
    ? 4
    : options.margin

  const width = options.width && options.width >= 21 ? options.width : undefined
  const scale = options.scale || 4

  return {
    width: width,
    scale: width ? 4 : scale,
    margin: margin,
    color: {
      dark: hex2rgba(options.color.dark || '#000000ff'),
      light: hex2rgba(options.color.light || '#ffffffff')
    },
    type: options.type,
    rendererOpts: options.rendererOpts || {}
  }
}

exports.getScale = function getScale (qrSize, opts) {
  return opts.width && opts.width >= qrSize + opts.margin * 2
    ? opts.width / (qrSize + opts.margin * 2)
    : opts.scale
}

exports.getImageWidth = function getImageWidth (qrSize, opts) {
  const scale = exports.getScale(qrSize, opts)
  return Math.floor((qrSize + opts.margin * 2) * scale)
}

exports.qrToImageData = function qrToImageData (imgData, qr, opts) {
  const size = qr.modules.size
  const data = qr.modules.data
  const scale = exports.getScale(size, opts)
  const symbolSize = Math.floor((size + opts.margin * 2) * scale)
  const scaledMargin = opts.margin * scale
  const palette = [opts.color.light, opts.color.dark]

  for (let i = 0; i < symbolSize; i++) {
    for (let j = 0; j < symbolSize; j++) {
      let posDst = (i * symbolSize + j) * 4
      let pxColor = opts.color.light

      if (i >= scaledMargin && j >= scaledMargin &&
        i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
        const iSrc = Math.floor((i - scaledMargin) / scale)
        const jSrc = Math.floor((j - scaledMargin) / scale)
        pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0]
      }

      imgData[posDst++] = pxColor.r
      imgData[posDst++] = pxColor.g
      imgData[posDst++] = pxColor.b
      imgData[posDst] = pxColor.a
    }
  }
}


/***/ }),

/***/ "./node_modules/shaka-player/dist/shaka-player.ui.js":
/*!***********************************************************!*\
  !*** ./node_modules/shaka-player/dist/shaka-player.ui.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
 @license
 Shaka Player
 Copyright 2016 Google LLC
 SPDX-License-Identifier: Apache-2.0
*/
(function(){var innerGlobal=typeof window!="undefined"?window:__webpack_require__.g;var exportTo={};(function(window,global,module){/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var q;function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}var ba="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};
function ca(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");}var da=ca(this);function fa(a,b){if(b)a:{for(var c=da,d=a.split("."),e=0;e<d.length-1;e++){var f=d[e];if(!(f in c))break a;c=c[f]}d=d[d.length-1];e=c[d];f=b(e);f!=e&&null!=f&&ba(c,d,{configurable:!0,writable:!0,value:f})}}
fa("Symbol",function(a){function b(f){if(this instanceof b)throw new TypeError("Symbol is not a constructor");return new c(d+(f||"")+"_"+e++,f)}function c(f,g){this.g=f;ba(this,"description",{configurable:!0,writable:!0,value:g})}if(a)return a;c.prototype.toString=function(){return this.g};var d="jscomp_symbol_"+(1E9*Math.random()>>>0)+"_",e=0;return b});
fa("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),c=0;c<b.length;c++){var d=da[b[c]];"function"===typeof d&&"function"!=typeof d.prototype[a]&&ba(d.prototype,a,{configurable:!0,writable:!0,value:function(){return ha(aa(this))}})}return a});function ha(a){a={next:a};a[Symbol.iterator]=function(){return this};return a}
function r(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:aa(a)}}function ja(a){if(!(a instanceof Array)){a=r(a);for(var b,c=[];!(b=a.next()).done;)c.push(b.value);a=c}return a}var la="function"==typeof Object.create?Object.create:function(a){function b(){}b.prototype=a;return new b},ma;
if("function"==typeof Object.setPrototypeOf)ma=Object.setPrototypeOf;else{var na;a:{var oa={a:!0},pa={};try{pa.__proto__=oa;na=pa.a;break a}catch(a){}na=!1}ma=na?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var qa=ma;
function u(a,b){a.prototype=la(b.prototype);a.prototype.constructor=a;if(qa)qa(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.Wi=b.prototype}function ra(){this.B=!1;this.l=null;this.h=void 0;this.g=1;this.j=this.s=0;this.G=this.i=null}function sa(a){if(a.B)throw new TypeError("Generator is already running");a.B=!0}ra.prototype.C=function(a){this.h=a};
function ua(a,b){a.i={ef:b,qf:!0};a.g=a.s||a.j}ra.prototype["return"]=function(a){this.i={"return":a};this.g=this.j};function z(a,b,c){a.g=c;return{value:b}}ra.prototype.D=function(a){this.g=a};function A(a){a.g=0}function E(a,b,c){a.s=b;void 0!=c&&(a.j=c)}function va(a){a.s=0;a.j=2}function wa(a,b,c){a.g=b;a.s=c||0}function H(a,b){a.s=b||0;var c=a.i.ef;a.i=null;return c}function xa(a){a.G=[a.i];a.s=0;a.j=0}
function ya(a,b){var c=a.G.splice(0)[0];(c=a.i=a.i||c)?c.qf?a.g=a.s||a.j:void 0!=c.D&&a.j<c.D?(a.g=c.D,a.i=null):a.g=a.j:a.g=b}function za(a){this.g=new ra;this.h=a}function Aa(a,b){sa(a.g);var c=a.g.l;if(c)return Ba(a,"return"in c?c["return"]:function(d){return{value:d,done:!0}},b,a.g["return"]);a.g["return"](b);return Ca(a)}
function Ba(a,b,c,d){try{var e=b.call(a.g.l,c);if(!(e instanceof Object))throw new TypeError("Iterator result "+e+" is not an object");if(!e.done)return a.g.B=!1,e;var f=e.value}catch(g){return a.g.l=null,ua(a.g,g),Ca(a)}a.g.l=null;d.call(a.g,f);return Ca(a)}
function Ca(a){for(;a.g.g;)try{var b=a.h(a.g);if(b)return a.g.B=!1,{value:b.value,done:!1}}catch(c){a.g.h=void 0,ua(a.g,c)}a.g.B=!1;if(a.g.i){b=a.g.i;a.g.i=null;if(b.qf)throw b.ef;return{value:b["return"],done:!0}}return{value:void 0,done:!0}}
function Da(a){this.next=function(b){sa(a.g);a.g.l?b=Ba(a,a.g.l.next,b,a.g.C):(a.g.C(b),b=Ca(a));return b};this["throw"]=function(b){sa(a.g);a.g.l?b=Ba(a,a.g.l["throw"],b,a.g.C):(ua(a.g,b),b=Ca(a));return b};this["return"]=function(b){return Aa(a,b)};this[Symbol.iterator]=function(){return this}}function Fa(a,b){var c=new Da(new za(b));qa&&a.prototype&&qa(c,a.prototype);return c}
function Ga(a){function b(d){return a.next(d)}function c(d){return a["throw"](d)}return new Promise(function(d,e){function f(g){g.done?d(g.value):Promise.resolve(g.value).then(b,c).then(f,e)}f(a.next())})}function L(a){return Ga(new Da(new za(a)))}
fa("Promise",function(a){function b(g){this.h=0;this.i=void 0;this.g=[];this.B=!1;var h=this.j();try{g(h.resolve,h.reject)}catch(k){h.reject(k)}}function c(){this.g=null}function d(g){return g instanceof b?g:new b(function(h){h(g)})}if(a)return a;c.prototype.h=function(g){if(null==this.g){this.g=[];var h=this;this.i(function(){h.l()})}this.g.push(g)};var e=da.setTimeout;c.prototype.i=function(g){e(g,0)};c.prototype.l=function(){for(;this.g&&this.g.length;){var g=this.g;this.g=[];for(var h=0;h<g.length;++h){var k=
g[h];g[h]=null;try{k()}catch(l){this.j(l)}}}this.g=null};c.prototype.j=function(g){this.i(function(){throw g;})};b.prototype.j=function(){function g(l){return function(m){k||(k=!0,l.call(h,m))}}var h=this,k=!1;return{resolve:g(this.L),reject:g(this.l)}};b.prototype.L=function(g){if(g===this)this.l(new TypeError("A Promise cannot resolve to itself"));else if(g instanceof b)this.P(g);else{a:switch(typeof g){case "object":var h=null!=g;break a;case "function":h=!0;break a;default:h=!1}h?this.J(g):this.s(g)}};
b.prototype.J=function(g){var h=void 0;try{h=g.then}catch(k){this.l(k);return}"function"==typeof h?this.S(h,g):this.s(g)};b.prototype.l=function(g){this.C(2,g)};b.prototype.s=function(g){this.C(1,g)};b.prototype.C=function(g,h){if(0!=this.h)throw Error("Cannot settle("+g+", "+h+"): Promise already settled in state"+this.h);this.h=g;this.i=h;2===this.h&&this.M();this.G()};b.prototype.M=function(){var g=this;e(function(){if(g.I()){var h=da.console;"undefined"!==typeof h&&h.error(g.i)}},1)};b.prototype.I=
function(){if(this.B)return!1;var g=da.CustomEvent,h=da.Event,k=da.dispatchEvent;if("undefined"===typeof k)return!0;"function"===typeof g?g=new g("unhandledrejection",{cancelable:!0}):"function"===typeof h?g=new h("unhandledrejection",{cancelable:!0}):(g=da.document.createEvent("CustomEvent"),g.initCustomEvent("unhandledrejection",!1,!0,g));g.promise=this;g.reason=this.i;return k(g)};b.prototype.G=function(){if(null!=this.g){for(var g=0;g<this.g.length;++g)f.h(this.g[g]);this.g=null}};var f=new c;
b.prototype.P=function(g){var h=this.j();g.ld(h.resolve,h.reject)};b.prototype.S=function(g,h){var k=this.j();try{g.call(h,k.resolve,k.reject)}catch(l){k.reject(l)}};b.prototype.then=function(g,h){function k(p,t){return"function"==typeof p?function(v){try{l(p(v))}catch(w){m(w)}}:t}var l,m,n=new b(function(p,t){l=p;m=t});this.ld(k(g,l),k(h,m));return n};b.prototype["catch"]=function(g){return this.then(void 0,g)};b.prototype.ld=function(g,h){function k(){switch(l.h){case 1:g(l.i);break;case 2:h(l.i);
break;default:throw Error("Unexpected state: "+l.h);}}var l=this;null==this.g?f.h(k):this.g.push(k);this.B=!0};b.resolve=d;b.reject=function(g){return new b(function(h,k){k(g)})};b.race=function(g){return new b(function(h,k){for(var l=r(g),m=l.next();!m.done;m=l.next())d(m.value).ld(h,k)})};b.all=function(g){var h=r(g),k=h.next();return k.done?d([]):new b(function(l,m){function n(v){return function(w){p[v]=w;t--;0==t&&l(p)}}var p=[],t=0;do p.push(void 0),t++,d(k.value).ld(n(p.length-1),m),k=h.next();
while(!k.done)})};return b});function Ha(a,b){return Object.prototype.hasOwnProperty.call(a,b)}
fa("WeakMap",function(a){function b(k){this.g=(h+=Math.random()+1).toString();if(k){k=r(k);for(var l;!(l=k.next()).done;)l=l.value,this.set(l[0],l[1])}}function c(){}function d(k){var l=typeof k;return"object"===l&&null!==k||"function"===l}function e(k){if(!Ha(k,g)){var l=new c;ba(k,g,{value:l})}}function f(k){var l=Object[k];l&&(Object[k]=function(m){if(m instanceof c)return m;Object.isExtensible(m)&&e(m);return l(m)})}if(function(){if(!a||!Object.seal)return!1;try{var k=Object.seal({}),l=Object.seal({}),
m=new a([[k,2],[l,3]]);if(2!=m.get(k)||3!=m.get(l))return!1;m["delete"](k);m.set(l,4);return!m.has(k)&&4==m.get(l)}catch(n){return!1}}())return a;var g="$jscomp_hidden_"+Math.random();f("freeze");f("preventExtensions");f("seal");var h=0;b.prototype.set=function(k,l){if(!d(k))throw Error("Invalid WeakMap key");e(k);if(!Ha(k,g))throw Error("WeakMap key fail: "+k);k[g][this.g]=l;return this};b.prototype.get=function(k){return d(k)&&Ha(k,g)?k[g][this.g]:void 0};b.prototype.has=function(k){return d(k)&&
Ha(k,g)&&Ha(k[g],this.g)};b.prototype["delete"]=function(k){return d(k)&&Ha(k,g)&&Ha(k[g],this.g)?delete k[g][this.g]:!1};return b});
fa("Map",function(a){function b(){var h={};return h.wb=h.next=h.head=h}function c(h,k){var l=h.g;return ha(function(){if(l){for(;l.head!=h.g;)l=l.wb;for(;l.next!=l.head;)return l=l.next,{done:!1,value:k(l)};l=null}return{done:!0,value:void 0}})}function d(h,k){var l=k&&typeof k;"object"==l||"function"==l?f.has(k)?l=f.get(k):(l=""+ ++g,f.set(k,l)):l="p_"+k;var m=h.h[l];if(m&&Ha(h.h,l))for(var n=0;n<m.length;n++){var p=m[n];if(k!==k&&p.key!==p.key||k===p.key)return{id:l,list:m,index:n,Ea:p}}return{id:l,
list:m,index:-1,Ea:void 0}}function e(h){this.h={};this.g=b();this.size=0;if(h){h=r(h);for(var k;!(k=h.next()).done;)k=k.value,this.set(k[0],k[1])}}if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var h=Object.seal({x:4}),k=new a(r([[h,"s"]]));if("s"!=k.get(h)||1!=k.size||k.get({x:4})||k.set({x:4},"t")!=k||2!=k.size)return!1;var l=k.entries(),m=l.next();if(m.done||m.value[0]!=h||"s"!=m.value[1])return!1;m=l.next();return m.done||4!=m.value[0].x||
"t"!=m.value[1]||!l.next().done?!1:!0}catch(n){return!1}}())return a;var f=new WeakMap;e.prototype.set=function(h,k){h=0===h?0:h;var l=d(this,h);l.list||(l.list=this.h[l.id]=[]);l.Ea?l.Ea.value=k:(l.Ea={next:this.g,wb:this.g.wb,head:this.g,key:h,value:k},l.list.push(l.Ea),this.g.wb.next=l.Ea,this.g.wb=l.Ea,this.size++);return this};e.prototype["delete"]=function(h){h=d(this,h);return h.Ea&&h.list?(h.list.splice(h.index,1),h.list.length||delete this.h[h.id],h.Ea.wb.next=h.Ea.next,h.Ea.next.wb=h.Ea.wb,
h.Ea.head=null,this.size--,!0):!1};e.prototype.clear=function(){this.h={};this.g=this.g.wb=b();this.size=0};e.prototype.has=function(h){return!!d(this,h).Ea};e.prototype.get=function(h){return(h=d(this,h).Ea)&&h.value};e.prototype.entries=function(){return c(this,function(h){return[h.key,h.value]})};e.prototype.keys=function(){return c(this,function(h){return h.key})};e.prototype.values=function(){return c(this,function(h){return h.value})};e.prototype.forEach=function(h,k){for(var l=this.entries(),
m;!(m=l.next()).done;)m=m.value,h.call(k,m[1],m[0],this)};e.prototype[Symbol.iterator]=e.prototype.entries;var g=0;return e});function Ja(a,b){a instanceof String&&(a+="");var c=0,d=!1,e={next:function(){if(!d&&c<a.length){var f=c++;return{value:b(f,a[f]),done:!1}}d=!0;return{done:!0,value:void 0}}};e[Symbol.iterator]=function(){return e};return e}fa("Array.prototype.keys",function(a){return a?a:function(){return Ja(this,function(b){return b})}});
fa("Set",function(a){function b(c){this.g=new Map;if(c){c=r(c);for(var d;!(d=c.next()).done;)this.add(d.value)}this.size=this.g.size}if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var c=Object.seal({x:4}),d=new a(r([c]));if(!d.has(c)||1!=d.size||d.add(c)!=d||1!=d.size||d.add({x:4})!=d||2!=d.size)return!1;var e=d.entries(),f=e.next();if(f.done||f.value[0]!=c||f.value[1]!=c)return!1;f=e.next();return f.done||f.value[0]==c||4!=f.value[0].x||
f.value[1]!=f.value[0]?!1:e.next().done}catch(g){return!1}}())return a;b.prototype.add=function(c){c=0===c?0:c;this.g.set(c,c);this.size=this.g.size;return this};b.prototype["delete"]=function(c){c=this.g["delete"](c);this.size=this.g.size;return c};b.prototype.clear=function(){this.g.clear();this.size=0};b.prototype.has=function(c){return this.g.has(c)};b.prototype.entries=function(){return this.g.entries()};b.prototype.values=function(){return this.g.values()};b.prototype.keys=b.prototype.values;
b.prototype[Symbol.iterator]=b.prototype.values;b.prototype.forEach=function(c,d){var e=this;this.g.forEach(function(f){return c.call(d,f,f,e)})};return b});fa("Array.from",function(a){return a?a:function(b,c,d){c=null!=c?c:function(h){return h};var e=[],f="undefined"!=typeof Symbol&&Symbol.iterator&&b[Symbol.iterator];if("function"==typeof f){b=f.call(b);for(var g=0;!(f=b.next()).done;)e.push(c.call(d,f.value,g++))}else for(f=b.length,g=0;g<f;g++)e.push(c.call(d,b[g],g));return e}});
function La(a,b,c){a instanceof String&&(a=String(a));for(var d=a.length,e=0;e<d;e++){var f=a[e];if(b.call(c,f,e,a))return{wa:e,v:f}}return{wa:-1,v:void 0}}fa("Array.prototype.findIndex",function(a){return a?a:function(b,c){return La(this,b,c).wa}});fa("Object.is",function(a){return a?a:function(b,c){return b===c?0!==b||1/b===1/c:b!==b&&c!==c}});
fa("Array.prototype.includes",function(a){return a?a:function(b,c){var d=this;d instanceof String&&(d=String(d));var e=d.length,f=c||0;for(0>f&&(f=Math.max(f+e,0));f<e;f++){var g=d[f];if(g===b||Object.is(g,b))return!0}return!1}});function Ma(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""}
fa("String.prototype.includes",function(a){return a?a:function(b,c){return-1!==Ma(this,b,"includes").indexOf(b,c||0)}});fa("Array.prototype.find",function(a){return a?a:function(b,c){return La(this,b,c).v}});fa("String.prototype.startsWith",function(a){return a?a:function(b,c){for(var d=Ma(this,b,"startsWith"),e=d.length,f=b.length,g=Math.max(0,Math.min(c|0,d.length)),h=0;h<f&&g<e;)if(d[g++]!=b[h++])return!1;return h>=f}});
var Na="function"==typeof Object.assign?Object.assign:function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(d)for(var e in d)Ha(d,e)&&(a[e]=d[e])}return a};fa("Object.assign",function(a){return a||Na});fa("Array.prototype.values",function(a){return a?a:function(){return Ja(this,function(b,c){return c})}});
fa("Promise.prototype.finally",function(a){return a?a:function(b){return this.then(function(c){return Promise.resolve(b()).then(function(){return c})},function(c){return Promise.resolve(b()).then(function(){throw c;})})}});fa("Array.prototype.entries",function(a){return a?a:function(){return Ja(this,function(b,c){return[b,c]})}});
fa("String.prototype.repeat",function(a){return a?a:function(b){var c=Ma(this,null,"repeat");if(0>b||1342177279<b)throw new RangeError("Invalid count value");b|=0;for(var d="";b;)if(b&1&&(d+=c),b>>>=1)c+=c;return d}});fa("Number.isNaN",function(a){return a?a:function(b){return"number"===typeof b&&isNaN(b)}});fa("Object.values",function(a){return a?a:function(b){var c=[],d;for(d in b)Ha(b,d)&&c.push(b[d]);return c}});fa("Math.log2",function(a){return a?a:function(b){return Math.log(b)/Math.LN2}});
fa("Object.entries",function(a){return a?a:function(b){var c=[],d;for(d in b)Ha(b,d)&&c.push([d,b[d]]);return c}});var Oa=this||self;function N(a,b){var c=a.split("."),d=Oa;c[0]in d||"undefined"==typeof d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d[e]&&d[e]!==Object.prototype[e]?d=d[e]:d=d[e]={}:d[e]=b};/*
 @license
 Shaka Player
 Copyright 2016 Google LLC
 SPDX-License-Identifier: Apache-2.0
*/
function O(a,b){if(b)if(b instanceof Map)for(var c=r(b.keys()),d=c.next();!d.done;d=c.next())d=d.value,Object.defineProperty(this,d,{value:b.get(d),writable:!0,enumerable:!0});else for(c in b)Object.defineProperty(this,c,{value:b[c],writable:!0,enumerable:!0});this.defaultPrevented=this.cancelable=this.bubbles=!1;this.timeStamp=window.performance&&window.performance.now?window.performance.now():Date.now();this.type=a;this.isTrusted=!1;this.target=this.currentTarget=null;this.g=!1}
function Pa(a){var b=new O(a.type),c;for(c in a)Object.defineProperty(b,c,{value:a[c],writable:!0,enumerable:!0});return b}O.prototype.preventDefault=function(){this.cancelable&&(this.defaultPrevented=!0)};O.prototype.stopImmediatePropagation=function(){this.g=!0};O.prototype.stopPropagation=function(){};N("shaka.util.FakeEvent",O);function Ra(){}function Sa(){}function Ta(){}function Ua(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];Va.has(a)||(Va.add(a),Ta.apply(Ra,ja(c)))}function Wa(){}function Xa(){}function Ya(){}function Za(){}var Va=new Set;
if(window.console&&window.console.log.bind){var $a={},ab=($a[1]=console.error.bind(console),$a[2]=console.warn.bind(console),$a[3]=console.info.bind(console),$a[4]=console.log.bind(console),$a[5]=console.debug.bind(console),$a[6]=console.debug.bind(console),$a);Ta=ab[2];Sa=ab[1]};function bb(){this.g={}}q=bb.prototype;q.push=function(a,b){this.g.hasOwnProperty(a)?this.g[a].push(b):this.g[a]=[b]};q.get=function(a){return(a=this.g[a])?a.slice():null};q.remove=function(a,b){a in this.g&&(this.g[a]=this.g[a].filter(function(c){return c!=b}),0==this.g[a].length&&delete this.g[a])};function cb(a,b){for(var c in a.g)b(c,a.g[c])}q.size=function(){return Object.keys(this.g).length};q.keys=function(){return Object.keys(this.g)};function db(){this.ea=new bb;this.hd=this}db.prototype.addEventListener=function(a,b){this.ea&&this.ea.push(a,b)};db.prototype.removeEventListener=function(a,b){this.ea&&this.ea.remove(a,b)};db.prototype.dispatchEvent=function(a){if(!this.ea)return!0;var b=this.ea.get(a.type)||[],c=this.ea.get("All");c&&(b=b.concat(c));b=r(b);for(c=b.next();!c.done;c=b.next()){c=c.value;a.target=this.hd;a.currentTarget=this.hd;try{c.handleEvent?c.handleEvent(a):c.call(this,a)}catch(d){}if(a.g)break}return a.defaultPrevented};
db.prototype.release=function(){this.ea=null};function fb(a,b){for(var c=[],d=r(a),e=d.next();!e.done;e=d.next())c.push(b(e.value));return c}function gb(a,b){for(var c=r(a),d=c.next();!d.done;d=c.next())if(!b(d.value))return!1;return!0}function hb(a,b){for(var c=r(a),d=c.next();!d.done;d=c.next())if(b(d.value))return!0;return!1}function jb(a,b){for(var c=[],d=r(a),e=d.next();!e.done;e=d.next())e=e.value,b(e)&&c.push(e);return c}
var lb=function kb(a){var c;return Fa(kb,function(d){1==d.g&&(c=0);if(3!=d.g)return c<a?z(d,c,3):d.D(0);c++;return d.D(2)})},nb=function mb(a){var c,d,e,f,g,h;return Fa(mb,function(k){1==k.g&&(c=-1,e=d=void 0,f=r(a),g=f.next());if(5!=k.g){if(g.done)return-1==c?k.D(0):z(k,{wa:c,Yg:d,item:e,next:void 0},0);h=g.value;return 0<=c?z(k,{wa:c,item:e,Yg:d,next:h},5):k.D(5)}c++;d=e;e=h;g=f.next();return k.D(2)})};/*
 @license
 Copyright 2008 The Closure Library Authors
 SPDX-License-Identifier: Apache-2.0
*/
var pb=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;/*
 @license
 Copyright 2006 The Closure Library Authors
 SPDX-License-Identifier: Apache-2.0
*/
function qb(a){var b;a instanceof qb?(rb(this,a.ab),this.$b=a.$b,this.eb=a.eb,sb(this,a.vc),this.Sa=a.Sa,tb(this,a.g.clone()),this.Pb=a.Pb):a&&(b=String(a).match(pb))?(rb(this,b[1]||"",!0),this.$b=ub(b[2]||""),this.eb=ub(b[3]||"",!0),sb(this,b[4]),this.Sa=ub(b[5]||"",!0),tb(this,b[6]||"",!0),this.Pb=ub(b[7]||"")):this.g=new vb(null)}q=qb.prototype;q.ab="";q.$b="";q.eb="";q.vc=null;q.Sa="";q.Pb="";
q.toString=function(){var a=[],b=this.ab;b&&a.push(wb(b,xb,!0),":");if(b=this.eb){a.push("//");var c=this.$b;c&&a.push(wb(c,xb,!0),"@");a.push(encodeURIComponent(b).replace(/%25([0-9a-fA-F]{2})/g,"%$1"));b=this.vc;null!=b&&a.push(":",String(b))}if(b=this.Sa)this.eb&&"/"!=b.charAt(0)&&a.push("/"),a.push(wb(b,"/"==b.charAt(0)?yb:zb,!0));(b=this.g.toString())&&a.push("?",b);(b=this.Pb)&&a.push("#",wb(b,Ab));return a.join("")};
q.resolve=function(a){var b=this.clone();"data"===b.ab&&(b=new qb);var c=!!a.ab;c?rb(b,a.ab):c=!!a.$b;c?b.$b=a.$b:c=!!a.eb;c?b.eb=a.eb:c=null!=a.vc;var d=a.Sa;if(c)sb(b,a.vc);else if(c=!!a.Sa){if("/"!=d.charAt(0))if(this.eb&&!this.Sa)d="/"+d;else{var e=b.Sa.lastIndexOf("/");-1!=e&&(d=b.Sa.substr(0,e+1)+d)}if(".."==d||"."==d)d="";else if(-1!=d.indexOf("./")||-1!=d.indexOf("/.")){e=0==d.lastIndexOf("/",0);d=d.split("/");for(var f=[],g=0;g<d.length;){var h=d[g++];"."==h?e&&g==d.length&&f.push(""):".."==
h?((1<f.length||1==f.length&&""!=f[0])&&f.pop(),e&&g==d.length&&f.push("")):(f.push(h),e=!0)}d=f.join("/")}}c?b.Sa=d:c=""!==a.g.toString();c?tb(b,a.g.clone()):c=!!a.Pb;c&&(b.Pb=a.Pb);return b};q.clone=function(){return new qb(this)};function rb(a,b,c){a.ab=c?ub(b,!0):b;a.ab&&(a.ab=a.ab.replace(/:$/,""))}function sb(a,b){if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.vc=b}else a.vc=null}function tb(a,b,c){b instanceof vb?a.g=b:(c||(b=wb(b,Bb)),a.g=new vb(b))}
function ub(a,b){return a?b?decodeURI(a):decodeURIComponent(a):""}function wb(a,b,c){return null!=a?(a=encodeURI(a).replace(b,Cb),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Cb(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var xb=/[#\/\?@]/g,zb=/[#\?:]/g,yb=/[#\?]/g,Bb=/[#\?@]/g,Ab=/#/g;function vb(a){this.g=a||null}
function Db(a){if(!a.Ja&&(a.Ja={},a.nd=0,a.g))for(var b=a.g.split("&"),c=0;c<b.length;c++){var d=b[c].indexOf("="),e=null;if(0<=d){var f=b[c].substring(0,d);e=b[c].substring(d+1)}else f=b[c];f=decodeURIComponent(f.replace(/\+/g," "));e=e||"";a.add(f,decodeURIComponent(e.replace(/\+/g," ")))}}q=vb.prototype;q.Ja=null;q.nd=null;q.add=function(a,b){Db(this);this.g=null;var c=this.Ja.hasOwnProperty(a)&&this.Ja[a];c||(this.Ja[a]=c=[]);c.push(b);this.nd++;return this};
q.set=function(a,b){Db(this);this.g=null;this.Ja.hasOwnProperty(a)?this.Ja[a]=[b]:this.add(a,b);return this};q.toString=function(){if(this.g)return this.g;if(!this.Ja)return"";var a=[],b;for(b in this.Ja)for(var c=encodeURIComponent(b),d=this.Ja[b],e=0;e<d.length;e++){var f=c;""!==d[e]&&(f+="="+encodeURIComponent(d[e]));a.push(f)}return this.g=a.join("&")};q.clone=function(){var a=new vb;a.g=this.g;if(this.Ja){var b={},c;for(c in this.Ja)b[c]=this.Ja[c].concat();a.Ja=b;a.nd=this.nd}return a};function P(a,b,c,d){for(var e=[],f=3;f<arguments.length;++f)e[f-3]=arguments[f];this.severity=a;this.category=b;this.code=c;this.data=e;this.handled=!1}P.prototype.toString=function(){return"shaka.util.Error "+JSON.stringify(this,null,"  ")};N("shaka.util.Error",P);P.Severity={RECOVERABLE:1,CRITICAL:2};P.Category={NETWORK:1,TEXT:2,MEDIA:3,MANIFEST:4,STREAMING:5,DRM:6,PLAYER:7,CAST:8,STORAGE:9,ADS:10};
P.Code={UNSUPPORTED_SCHEME:1E3,BAD_HTTP_STATUS:1001,HTTP_ERROR:1002,TIMEOUT:1003,MALFORMED_DATA_URI:1004,REQUEST_FILTER_ERROR:1006,RESPONSE_FILTER_ERROR:1007,MALFORMED_TEST_URI:1008,UNEXPECTED_TEST_REQUEST:1009,ATTEMPTS_EXHAUSTED:1010,INVALID_TEXT_HEADER:2E3,INVALID_TEXT_CUE:2001,UNABLE_TO_DETECT_ENCODING:2003,BAD_ENCODING:2004,INVALID_XML:2005,INVALID_MP4_TTML:2007,INVALID_MP4_VTT:2008,UNABLE_TO_EXTRACT_CUE_START_TIME:2009,INVALID_MP4_CEA:2010,TEXT_COULD_NOT_GUESS_MIME_TYPE:2011,CANNOT_ADD_EXTERNAL_TEXT_TO_SRC_EQUALS:2012,
TEXT_ONLY_WEBVTT_SRC_EQUALS:2013,MISSING_TEXT_PLUGIN:2014,BUFFER_READ_OUT_OF_BOUNDS:3E3,JS_INTEGER_OVERFLOW:3001,EBML_OVERFLOW:3002,EBML_BAD_FLOATING_POINT_SIZE:3003,MP4_SIDX_WRONG_BOX_TYPE:3004,MP4_SIDX_INVALID_TIMESCALE:3005,MP4_SIDX_TYPE_NOT_SUPPORTED:3006,WEBM_CUES_ELEMENT_MISSING:3007,WEBM_EBML_HEADER_ELEMENT_MISSING:3008,WEBM_SEGMENT_ELEMENT_MISSING:3009,WEBM_INFO_ELEMENT_MISSING:3010,WEBM_DURATION_ELEMENT_MISSING:3011,WEBM_CUE_TRACK_POSITIONS_ELEMENT_MISSING:3012,WEBM_CUE_TIME_ELEMENT_MISSING:3013,
MEDIA_SOURCE_OPERATION_FAILED:3014,MEDIA_SOURCE_OPERATION_THREW:3015,VIDEO_ERROR:3016,QUOTA_EXCEEDED_ERROR:3017,TRANSMUXING_FAILED:3018,CONTENT_TRANSFORMATION_FAILED:3019,UNABLE_TO_GUESS_MANIFEST_TYPE:4E3,DASH_INVALID_XML:4001,DASH_NO_SEGMENT_INFO:4002,DASH_EMPTY_ADAPTATION_SET:4003,DASH_EMPTY_PERIOD:4004,DASH_WEBM_MISSING_INIT:4005,DASH_UNSUPPORTED_CONTAINER:4006,DASH_PSSH_BAD_ENCODING:4007,DASH_NO_COMMON_KEY_SYSTEM:4008,DASH_MULTIPLE_KEY_IDS_NOT_SUPPORTED:4009,DASH_CONFLICTING_KEY_IDS:4010,RESTRICTIONS_CANNOT_BE_MET:4012,
HLS_PLAYLIST_HEADER_MISSING:4015,INVALID_HLS_TAG:4016,HLS_INVALID_PLAYLIST_HIERARCHY:4017,DASH_DUPLICATE_REPRESENTATION_ID:4018,HLS_MULTIPLE_MEDIA_INIT_SECTIONS_FOUND:4020,HLS_MASTER_PLAYLIST_NOT_PROVIDED:4022,HLS_REQUIRED_ATTRIBUTE_MISSING:4023,HLS_REQUIRED_TAG_MISSING:4024,HLS_COULD_NOT_GUESS_CODECS:4025,HLS_KEYFORMATS_NOT_SUPPORTED:4026,DASH_UNSUPPORTED_XLINK_ACTUATE:4027,DASH_XLINK_DEPTH_LIMIT:4028,HLS_COULD_NOT_PARSE_SEGMENT_START_TIME:4030,CONTENT_UNSUPPORTED_BY_BROWSER:4032,CANNOT_ADD_EXTERNAL_TEXT_TO_LIVE_STREAM:4033,
HLS_AES_128_ENCRYPTION_NOT_SUPPORTED:4034,HLS_INTERNAL_SKIP_STREAM:4035,NO_VARIANTS:4036,PERIOD_FLATTENING_FAILED:4037,INCONSISTENT_DRM_ACROSS_PERIODS:4038,HLS_VARIABLE_NOT_FOUND:4039,STREAMING_ENGINE_STARTUP_INVALID_STATE:5006,NO_RECOGNIZED_KEY_SYSTEMS:6E3,REQUESTED_KEY_SYSTEM_CONFIG_UNAVAILABLE:6001,FAILED_TO_CREATE_CDM:6002,FAILED_TO_ATTACH_TO_VIDEO:6003,INVALID_SERVER_CERTIFICATE:6004,FAILED_TO_CREATE_SESSION:6005,FAILED_TO_GENERATE_LICENSE_REQUEST:6006,LICENSE_REQUEST_FAILED:6007,LICENSE_RESPONSE_REJECTED:6008,
ENCRYPTED_CONTENT_WITHOUT_DRM_INFO:6010,NO_LICENSE_SERVER_GIVEN:6012,OFFLINE_SESSION_REMOVED:6013,EXPIRED:6014,SERVER_CERTIFICATE_REQUIRED:6015,INIT_DATA_TRANSFORM_ERROR:6016,SERVER_CERTIFICATE_REQUEST_FAILED:6017,LOAD_INTERRUPTED:7E3,OPERATION_ABORTED:7001,NO_VIDEO_ELEMENT:7002,OBJECT_DESTROYED:7003,CONTENT_NOT_LOADED:7004,CAST_API_UNAVAILABLE:8E3,NO_CAST_RECEIVERS:8001,ALREADY_CASTING:8002,UNEXPECTED_CAST_ERROR:8003,CAST_CANCELED_BY_USER:8004,CAST_CONNECTION_TIMED_OUT:8005,CAST_RECEIVER_APP_UNAVAILABLE:8006,
STORAGE_NOT_SUPPORTED:9E3,INDEXED_DB_ERROR:9001,DEPRECATED_OPERATION_ABORTED:9002,REQUESTED_ITEM_NOT_FOUND:9003,MALFORMED_OFFLINE_URI:9004,CANNOT_STORE_LIVE_OFFLINE:9005,NO_INIT_DATA_FOR_OFFLINE:9007,LOCAL_PLAYER_INSTANCE_REQUIRED:9008,NEW_KEY_OPERATION_NOT_SUPPORTED:9011,KEY_NOT_FOUND:9012,MISSING_STORAGE_CELL:9013,STORAGE_LIMIT_REACHED:9014,DOWNLOAD_SIZE_CALLBACK_ERROR:9015,MODIFY_OPERATION_NOT_SUPPORTED:9016,CS_IMA_SDK_MISSING:1E4,CS_AD_MANAGER_NOT_INITIALIZED:10001,SS_IMA_SDK_MISSING:10002,SS_AD_MANAGER_NOT_INITIALIZED:10003,
CURRENT_DAI_REQUEST_NOT_FINISHED:10004};function Eb(a,b){this.g=a;this.h=b}Eb.prototype.toString=function(){return"v"+this.g+"."+this.h};function Fb(a,b){var c=new Eb(4,0),d=Gb,e=d.g,f=c.h-e.h;(0<(c.g-e.g||f)?d.i:d.h)(d.g,c,a,b)}function Hb(a,b,c,d){Ta([c,"has been deprecated and will be removed in",b,". We are currently at version",a,". Additional information:",d].join(" "))}function Ib(a,b,c,d){Sa([c,"has been deprecated and has been removed in",b,". We are now at version",a,". Additional information:",d].join(""))}var Gb=null;function Jb(a,b){return a.concat(b)}function Kb(){}function Lb(a){return null!=a}function Mb(a){var b=Object.create(a.prototype||Object.prototype);try{var c=a.call(b);c||(Fb("Factories requiring new","Factories should be plain functions"),c=b)}catch(d){Fb("Factories requiring new","Factories should be plain functions"),c=new a}return c};function Nb(a,b){if(0==b.length)return a;var c=b.map(function(d){return new qb(d)});return a.map(function(d){return new qb(d)}).map(function(d){return c.map(function(e){return d.resolve(e)})}).reduce(Jb,[]).map(function(d){return d.toString()})}function Ob(a,b){return{keySystem:a,licenseServerUri:"",distinctiveIdentifierRequired:!1,persistentStateRequired:!1,audioRobustness:"",videoRobustness:"",serverCertificate:null,serverCertificateUri:"",sessionType:"",initData:b||[],keyIds:new Set}}
function Pb(a,b){if(1==b.length)return b[0];var c=Qb(a,b);if(null!=c)return c;throw new P(2,4,4025,b);}function Qb(a,b){for(var c=r(Rb[a]),d=c.next();!d.done;d=c.next()){d=d.value;for(var e=r(b),f=e.next();!f.done;f=e.next())if(f=f.value,d.test(f.trim()))return f.trim()}return a==Sb?"":null}var Sb="text",Tb={mb:"video",Nb:"audio",ua:Sb,Gc:"image",Ah:"application"},Rb={audio:[/^vorbis$/,/^opus$/,/^flac$/,/^mp4a/,/^[ae]c-3$/],video:[/^avc/,/^hev/,/^hvc/,/^vp0?[89]/,/^av1$/],text:[/^vtt$/,/^wvtt/,/^stpp/]};function Ub(){}function Vb(a,b){a=Wb(a);b=Wb(b);return a.split("-")[0]==b.split("-")[0]}function Xb(a,b){a=Wb(a);b=Wb(b);var c=a.split("-"),d=b.split("-");return c[0]==d[0]&&1==c.length&&2==d.length}function Yb(a,b){a=Wb(a);b=Wb(b);var c=a.split("-"),d=b.split("-");return 2==c.length&&2==d.length&&c[0]==d[0]}function Wb(a){var b=a.split("-");a=b[0]||"";b=b[1]||"";a=a.toLowerCase();a=Zb.get(a)||a;return(b=b.toUpperCase())?a+"-"+b:a}function $b(a,b){var c=ac(a),d=ac(b);return a!=c&&b!=d&&c==d}
function bc(a,b){a=Wb(a);b=Wb(b);return b==a?4:Xb(b,a)?3:Yb(b,a)?2:Xb(a,b)?1:0}function ac(a){var b=a.indexOf("-");a=0<=b?a.substring(0,b):a;a=a.toLowerCase();return a=Zb.get(a)||a}function cc(a){return a.language?Wb(a.language):a.audio&&a.audio.language?Wb(a.audio.language):a.video&&a.video.language?Wb(a.video.language):"und"}
function dc(a,b){for(var c=Wb(a),d=new Set,e=r(b),f=e.next();!f.done;f=e.next())d.add(Wb(f.value));e=r(d);for(f=e.next();!f.done;f=e.next())if(f=f.value,f==c)return f;e=r(d);for(f=e.next();!f.done;f=e.next())if(f=f.value,Xb(f,c))return f;e=r(d);for(f=e.next();!f.done;f=e.next())if(f=f.value,Yb(f,c))return f;d=r(d);for(f=d.next();!f.done;f=d.next())if(f=f.value,Xb(c,f))return f;return null}N("shaka.util.LanguageUtils",Ub);Ub.findClosestLocale=dc;Ub.getLocaleForVariant=cc;
Ub.getLocaleForText=function(a){return Wb(a.language||"und")};Ub.getBase=ac;Ub.relatedness=bc;Ub.areSiblings=$b;Ub.normalize=Wb;Ub.isSiblingOf=Yb;Ub.isParentOf=Xb;Ub.areLanguageCompatible=Vb;Ub.areLocaleCompatible=function(a,b){a=Wb(a);b=Wb(b);return a==b};
var Zb=new Map([["aar","aa"],["abk","ab"],["afr","af"],["aka","ak"],["alb","sq"],["amh","am"],["ara","ar"],["arg","an"],["arm","hy"],["asm","as"],["ava","av"],["ave","ae"],["aym","ay"],["aze","az"],["bak","ba"],["bam","bm"],["baq","eu"],["bel","be"],["ben","bn"],["bih","bh"],["bis","bi"],["bod","bo"],["bos","bs"],["bre","br"],["bul","bg"],["bur","my"],["cat","ca"],["ces","cs"],["cha","ch"],["che","ce"],["chi","zh"],["chu","cu"],["chv","cv"],["cor","kw"],["cos","co"],["cre","cr"],["cym","cy"],["cze",
"cs"],["dan","da"],["deu","de"],["div","dv"],["dut","nl"],["dzo","dz"],["ell","el"],["eng","en"],["epo","eo"],["est","et"],["eus","eu"],["ewe","ee"],["fao","fo"],["fas","fa"],["fij","fj"],["fin","fi"],["fra","fr"],["fre","fr"],["fry","fy"],["ful","ff"],["geo","ka"],["ger","de"],["gla","gd"],["gle","ga"],["glg","gl"],["glv","gv"],["gre","el"],["grn","gn"],["guj","gu"],["hat","ht"],["hau","ha"],["heb","he"],["her","hz"],["hin","hi"],["hmo","ho"],["hrv","hr"],["hun","hu"],["hye","hy"],["ibo","ig"],["ice",
"is"],["ido","io"],["iii","ii"],["iku","iu"],["ile","ie"],["ina","ia"],["ind","id"],["ipk","ik"],["isl","is"],["ita","it"],["jav","jv"],["jpn","ja"],["kal","kl"],["kan","kn"],["kas","ks"],["kat","ka"],["kau","kr"],["kaz","kk"],["khm","km"],["kik","ki"],["kin","rw"],["kir","ky"],["kom","kv"],["kon","kg"],["kor","ko"],["kua","kj"],["kur","ku"],["lao","lo"],["lat","la"],["lav","lv"],["lim","li"],["lin","ln"],["lit","lt"],["ltz","lb"],["lub","lu"],["lug","lg"],["mac","mk"],["mah","mh"],["mal","ml"],["mao",
"mi"],["mar","mr"],["may","ms"],["mkd","mk"],["mlg","mg"],["mlt","mt"],["mon","mn"],["mri","mi"],["msa","ms"],["mya","my"],["nau","na"],["nav","nv"],["nbl","nr"],["nde","nd"],["ndo","ng"],["nep","ne"],["nld","nl"],["nno","nn"],["nob","nb"],["nor","no"],["nya","ny"],["oci","oc"],["oji","oj"],["ori","or"],["orm","om"],["oss","os"],["pan","pa"],["per","fa"],["pli","pi"],["pol","pl"],["por","pt"],["pus","ps"],["que","qu"],["roh","rm"],["ron","ro"],["rum","ro"],["run","rn"],["rus","ru"],["sag","sg"],["san",
"sa"],["sin","si"],["slk","sk"],["slo","sk"],["slv","sl"],["sme","se"],["smo","sm"],["sna","sn"],["snd","sd"],["som","so"],["sot","st"],["spa","es"],["sqi","sq"],["srd","sc"],["srp","sr"],["ssw","ss"],["sun","su"],["swa","sw"],["swe","sv"],["tah","ty"],["tam","ta"],["tat","tt"],["tel","te"],["tgk","tg"],["tgl","tl"],["tha","th"],["tib","bo"],["tir","ti"],["ton","to"],["tsn","tn"],["tso","ts"],["tuk","tk"],["tur","tr"],["twi","tw"],["uig","ug"],["ukr","uk"],["urd","ur"],["uzb","uz"],["ven","ve"],["vie",
"vi"],["vol","vo"],["wel","cy"],["wln","wa"],["wol","wo"],["xho","xh"],["yid","yi"],["yor","yo"],["zha","za"],["zho","zh"],["zul","zu"]]);function ec(a){db.call(this);this.j=Wb(a);this.i=new Map;this.g=new Set;this.h=new Map}u(ec,db);q=ec.prototype;q.release=function(){db.prototype.release.call(this)};
q.We=function(a){var b=this;this.g.clear();a=r(a);for(var c=a.next();!c.done;c=a.next())this.g.add(Wb(c.value));fc(this);a=jb(this.g,function(d){return!b.h.has(d)});a.length&&this.dispatchEvent(new O("unknown-locales",(new Map).set("locales",a)));a=jb(this.g,function(d){return b.h.has(d)});a=(new Map).set("locales",a.length?a:[this.j]);this.dispatchEvent(new O("locale-changed",a))};
q.ma=function(a,b,c){a=Wb(a);void 0===c&&(c=gc);var d=this.h.get(a)||new Map;b.forEach(function(e,f){d.has(f)&&c!=gc||d.set(f,e)});this.h.set(a,d);fc(this);this.dispatchEvent(new O("locale-updated"));return this};q.hh=function(a){for(var b=r(a.keys()),c=b.next();!c.done;c=b.next())c=c.value,a.set(c,this.resolve(c))};q.resolve=function(a){var b=this.i.get(a);if(b)return b;a=(new Map).set("locales",Array.from(this.g)).set("missing",a);this.dispatchEvent(new O("unknown-localization",a));return""};
function fc(a){for(var b=a.h,c=a.j,d=a.g,e=new Set,f={},g=r(d),h=g.next();!h.done;f={ec:f.ec},h=g.next()){f.ec=h.value;e.add(f.ec);e.add(ac(f.ec));h=jb(b.keys(),function(l){return function(m){return $b(m,l.ec)}}(f));h.sort();var k=r(h);for(h=k.next();!h.done;h=k.next())e.add(h.value);h=jb(b.keys(),function(l){return function(m){return ac(m)==l.ec}}(f));h.sort();k=r(h);for(h=k.next();!h.done;h=k.next())e.add(h.value)}e.add(c);c=[];e=r(e);for(h=e.next();!h.done;h=e.next())(h=b.get(h.value))&&c.push(h);
c.reverse();a.i.clear();b=r(c);for(h=b.next();!h.done;h=b.next())h.value.forEach(function(l,m){a.i.set(m,l)});b=a.i.keys();e=new Set;c=r(a.g);for(h=c.next();!h.done;h=c.next())h=a.h.get(h.value)||new Map,hc(h,b,e);0<e.size&&(d=(new Map).set("locales",Array.from(d)).set("missing",Array.from(e)),a.dispatchEvent(new O("missing-localizations",d)))}function hc(a,b,c){b=r(b);for(var d=b.next();!d.done;d=b.next())d=d.value,a.get(d)||c.add(d)}N("shaka.ui.Localization",ec);ec.prototype.resolve=ec.prototype.resolve;
ec.prototype.resolveDictionary=ec.prototype.hh;ec.prototype.insert=ec.prototype.ma;ec.prototype.changeLocale=ec.prototype.We;ec.prototype.release=ec.prototype.release;var gc=1;ec.ConflictResolution={USE_OLD:0,USE_NEW:gc};ec.UNKNOWN_LOCALES="unknown-locales";ec.UNKNOWN_LOCALIZATION="unknown-localization";ec.MISSING_LOCALIZATIONS="missing-localizations";ec.LOCALE_CHANGED="locale-changed";ec.LOCALE_UPDATED="locale-updated";var ic={ci:"MUTE",Qi:"VOLUME",Xh:"LOOP",ti:"RESOLUTION",Di:"STATISTICS",xh:"AD_TIME",Ni:"UNMUTE",Lh:"ENTER_LOOP_MODE",Uh:"FULL_SCREEN",Oi:"UNRECOGNIZED_LANGUAGE",Fh:"CAPTIONS",ai:"MORE_SETTINGS",Bi:"SKIP_TO_LIVE",Mi:"UNDETERMINED_LANGUAGE",ni:"PAUSE",Mh:"ENTER_PICTURE_IN_PICTURE",si:"REPLAY",Oh:"EXIT_FULL_SCREEN",Wh:"LANGUAGE",ii:"OFF",BACK:"BACK",pi:"PLAY",Nf:"SUBTITLE_FORCED",AD_PROGRESS:"AD_PROGRESS",gi:"NOT_APPLICABLE",wh:"AD_DURATION",oi:"PICTURE_IN_PICTURE",Ai:"SKIP_AD",Ph:"EXIT_LOOP_MODE",
Se:"LIVE",wi:"REWIND",ri:"PLAYBACK_RATE",Gh:"CAST",zi:"SEEK",ji:"ON",Bh:"AUTO_QUALITY",bi:"MULTIPLE_LANGUAGES",yh:"AIRPLAY",Qh:"EXIT_PICTURE_IN_PICTURE",Th:"FAST_FORWARD"};function jc(a){this.g=Math.exp(Math.log(.5)/a);this.i=this.h=0}function kc(a,b,c){var d=Math.pow(a.g,b);c=c*(1-d)+d*a.h;isNaN(c)||(a.h=c,a.i+=b)}function lc(a){return a.h/(1-Math.pow(a.g,a.i))};function mc(){this.h=new jc(2);this.j=new jc(5);this.g=0;this.i=128E3;this.l=16E3}mc.prototype.configure=function(a){this.i=a.minTotalBytes;this.l=a.minBytes;this.h.g=Math.exp(Math.log(.5)/a.fastHalfLife);this.j.g=Math.exp(Math.log(.5)/a.slowHalfLife)};mc.prototype.getBandwidthEstimate=function(a){return this.g<this.i?a:Math.min(lc(this.h),lc(this.j))};function nc(a,b){return"number"===typeof a&&"number"===typeof b&&isNaN(a)&&isNaN(b)?!0:a===b}function oc(a,b){var c=a.indexOf(b);-1<c&&a.splice(c,1)}function pc(a,b,c){c||(c=nc);if(a.length!=b.length)return!1;b=b.slice();var d={};a=r(a);for(var e=a.next();!e.done;d={Ld:d.Ld},e=a.next()){d.Ld=e.value;e=b.findIndex(function(f){return function(g){return c(f.Ld,g)}}(d));if(-1==e)return!1;b[e]=b[b.length-1];b.pop()}return 0==b.length}
function qc(a,b,c){c||(c=nc);if(a.length!=b.length)return!1;for(var d=0;d<a.length;d++)if(!c(a[d],b[d]))return!1;return!0};function rc(a,b,c){this.startTime=a;this.direction=sc;this.endTime=b;this.payload=c;this.region=new tc;this.position=null;this.positionAlign=uc;this.size=0;this.textAlign=vc;this.writingMode=wc;this.lineInterpretation=xc;this.line=null;this.lineHeight="";this.lineAlign=yc;this.displayAlign=zc;this.fontSize=this.textStrokeWidth=this.textStrokeColor=this.border=this.backgroundImage=this.backgroundColor=this.color="";this.fontWeight=Ac;this.fontStyle=Bc;this.linePadding=this.letterSpacing=this.fontFamily=
"";this.opacity=1;this.textDecoration=[];this.wrapLine=!0;this.id="";this.nestedCues=[];this.spacer=this.lineBreak=this.isContainer=!1;this.cellResolution={columns:32,rows:15}}rc.prototype.clone=function(){var a=new rc(0,0,""),b;for(b in this)a[b]=this[b],a[b]&&a[b].constructor==Array&&(a[b]=a[b].slice());return a};
function Cc(a,b){if(a.startTime!=b.startTime||a.endTime!=b.endTime||a.payload!=b.payload)return!1;for(var c in a)if("startTime"!=c&&"endTime"!=c&&"payload"!=c)if("nestedCues"==c){if(!qc(a.nestedCues,b.nestedCues,Cc))return!1}else if("region"==c||"cellResolution"==c)for(var d in a[c]){if(a[c][d]!=b[c][d])return!1}else if(Array.isArray(a[c])){if(!qc(a[c],b[c]))return!1}else if(a[c]!=b[c])return!1;return!0}N("shaka.text.Cue",rc);var uc="auto";
rc.positionAlign={LEFT:"line-left",RIGHT:"line-right",CENTER:"center",AUTO:uc};var vc="center",Dc={LEFT:"left",RIGHT:"right",CENTER:vc,START:"start",END:"end"};rc.textAlign=Dc;var zc="after",Ec={BEFORE:"before",CENTER:"center",AFTER:zc};rc.displayAlign=Ec;var sc="ltr";rc.direction={HORIZONTAL_LEFT_TO_RIGHT:sc,HORIZONTAL_RIGHT_TO_LEFT:"rtl"};var wc="horizontal-tb";rc.writingMode={HORIZONTAL_TOP_TO_BOTTOM:wc,VERTICAL_LEFT_TO_RIGHT:"vertical-lr",VERTICAL_RIGHT_TO_LEFT:"vertical-rl"};var xc=0;
rc.lineInterpretation={LINE_NUMBER:xc,PERCENTAGE:1};var yc="start",Fc={CENTER:"center",START:yc,END:"end"};rc.lineAlign=Fc;var Gc={white:"#FFF",lime:"#0F0",cyan:"#0FF",red:"#F00",yellow:"#FF0",magenta:"#F0F",blue:"#00F",black:"#000"};rc.defaultTextColor=Gc;var Hc={bg_white:"#FFF",bg_lime:"#0F0",bg_cyan:"#0FF",bg_red:"#F00",bg_yellow:"#FF0",bg_magenta:"#F0F",bg_blue:"#00F",bg_black:"#000"};rc.defaultTextBackgroundColor=Hc;var Ac=400;rc.fontWeight={NORMAL:Ac,BOLD:700};
var Bc="normal",Ic={NORMAL:Bc,ITALIC:"italic",OBLIQUE:"oblique"};rc.fontStyle=Ic;rc.textDecoration={UNDERLINE:"underline",LINE_THROUGH:"lineThrough",OVERLINE:"overline"};function tc(){this.id="";this.regionAnchorY=this.regionAnchorX=this.viewportAnchorY=this.viewportAnchorX=0;this.height=this.width=100;this.viewportAnchorUnits=this.widthUnits=this.heightUnits=Jc;this.scroll=Kc}N("shaka.text.CueRegion",tc);var Jc=1;tc.units={PX:0,PERCENTAGE:Jc,LINES:2};var Kc="";tc.scrollMode={NONE:Kc,UP:"up"};function Lc(){}function Mc(a,b){if(!a&&!b)return!0;if(!a||!b||a.byteLength!=b.byteLength)return!1;if(Nc(a)==Nc(b)&&(a.byteOffset||0)==(b.byteOffset||0))return!0;for(var c=Oc(a),d=Oc(b),e=r(lb(a.byteLength)),f=e.next();!f.done;f=e.next())if(f=f.value,c[f]!=d[f])return!1;return!0}function Nc(a){return a instanceof ArrayBuffer?a:a.buffer}function Pc(a){return a instanceof ArrayBuffer?a:0==a.byteOffset&&a.byteLength==a.buffer.byteLength?a.buffer:(new Uint8Array(a)).buffer}
function Oc(a,b,c){c=void 0===c?Infinity:c;return Qc(a,void 0===b?0:b,c,Uint8Array)}function Rc(a,b,c){c=void 0===c?Infinity:c;return Qc(a,void 0===b?0:b,c,DataView)}function Qc(a,b,c,d){var e=(a.byteOffset||0)+a.byteLength;b=Math.max(0,Math.min((a.byteOffset||0)+b,e));return new d(Nc(a),b,Math.min(b+Math.max(c,0),e)-b)}N("shaka.util.BufferUtils",Lc);Lc.toDataView=Rc;Lc.toUint8=Oc;Lc.toArrayBuffer=Pc;Lc.equal=Mc;function Sc(){}N("shaka.dependencies",Sc);Sc.has=function(a){return Tc.has(a)};Sc.add=function(a,b){if(!Vc[a])throw Error(a+" is not supported");Tc.set(a,function(){return b})};var Vc={muxjs:"muxjs"};Sc.Allowed=Vc;var Tc=new Map([["muxjs",function(){return window.muxjs}]]);function Wc(){var a,b,c=new Promise(function(d,e){a=d;b=e});c.resolve=a;c.reject=b;return c}Wc.prototype.resolve=function(){};Wc.prototype.reject=function(){};function Xc(a){this.h=a;this.g=void 0}Xc.prototype.value=function(){void 0==this.g&&(this.g=this.h());return this.g};function Yc(){}function Zc(a){if(!a)return"";a=Oc(a);239==a[0]&&187==a[1]&&191==a[2]&&(a=a.subarray(3));a=(new TextDecoder).decode(a);a.includes("\ufffd")&&Sa('Decoded string contains an "unknown character" codepoint.  That probably means the UTF8 encoding was incorrect!');return a}
function $c(a,b,c){if(!a)return"";if(!c&&0!=a.byteLength%2)throw new P(2,2,2004);var d=Math.floor(a.byteLength/2);c=new Uint16Array(d);a=Rc(a);d=r(lb(d));for(var e=d.next();!e.done;e=d.next())e=e.value,c[e]=a.getUint16(2*e,b);return ad.value()(c)}
function bd(a){function b(d){return c.byteLength<=d||32<=c[d]&&126>=c[d]}if(!a)return"";var c=Oc(a);if(239==c[0]&&187==c[1]&&191==c[2])return Zc(c);if(254==c[0]&&255==c[1])return $c(c.subarray(2),!1);if(255==c[0]&&254==c[1])return $c(c.subarray(2),!0);if(0==c[0]&&0==c[2])return $c(a,!1);if(0==c[1]&&0==c[3])return $c(a,!0);if(b(0)&&b(1)&&b(2)&&b(3))return Zc(a);throw new P(2,2,2003);}function cd(a){var b=new TextEncoder;return Pc(b.encode(a))}
function dd(a,b){for(var c=new ArrayBuffer(2*a.length),d=new DataView(c),e=r(nb(a)),f=e.next();!f.done;f=e.next())f=f.value,d.setUint16(2*f.wa,f.item.charCodeAt(0),b);return c}N("shaka.util.StringUtils",Yc);Yc.resetFromCharCode=function(){ad.g=void 0};Yc.toUTF16=dd;Yc.toUTF8=cd;Yc.fromBytesAutoDetect=bd;Yc.fromUTF16=$c;Yc.fromUTF8=Zc;
var ad=new Xc(function(){function a(c){try{var d=new Uint8Array(c);return 0<String.fromCharCode.apply(null,d).length}catch(e){return!1}}for(var b={Bb:65536};0<b.Bb;b={Bb:b.Bb},b.Bb/=2)if(a(b.Bb))return function(c){return function(d){for(var e="",f=0;f<d.length;f+=c.Bb)e+=String.fromCharCode.apply(null,d.subarray(f,f+c.Bb));return e}}(b);return null});function ed(){}function fd(a){a=Oc(a);a=ad.value()(a);return btoa(a)}function gd(a,b){b=void 0==b?!0:b;var c=fd(a).replace(/\+/g,"-").replace(/\//g,"_");return b?c:c.replace(/[=]*$/,"")}function hd(a){var b=window.atob(a.replace(/-/g,"+").replace(/_/g,"/"));a=new Uint8Array(b.length);b=r(nb(b));for(var c=b.next();!c.done;c=b.next())c=c.value,a[c.wa]=c.item.charCodeAt(0);return a}
function id(a){var b=a.length/2,c=new Uint8Array(b);b=r(lb(b));for(var d=b.next();!d.done;d=b.next())d=d.value,c[d]=window.parseInt(a.substr(2*d,2),16);return c}function jd(a){var b=Oc(a);a="";b=r(b);for(var c=b.next();!c.done;c=b.next())c=c.value,c=c.toString(16),1==c.length&&(c="0"+c),a+=c;return a}
function kd(a){for(var b=[],c=0;c<arguments.length;++c)b[c]=arguments[c];var d=0,e=r(b);for(c=e.next();!c.done;c=e.next())d+=c.value.byteLength;d=new Uint8Array(d);e=0;b=r(b);for(c=b.next();!c.done;c=b.next())c=c.value,d.set(Oc(c),e),e+=c.byteLength;return d}N("shaka.util.Uint8ArrayUtils",ed);ed.concat=kd;ed.toHex=jd;ed.fromHex=id;ed.fromBase64=hd;ed.toBase64=gd;ed.toStandardBase64=fd;
ed.equal=function(a,b){Fb("shaka.util.Uint8ArrayUtils.equal","Please use shaka.util.BufferUtils.equal instead.");return Mc(a,b)};function ld(){var a=this;this.B=Tc.get("muxjs")();this.g=new this.B.mp4.Transmuxer({keepOriginalTimestamps:!0});this.h=null;this.s=[];this.j=[];this.i=[];this.l=!1;this.g.on("data",function(b){a.j=b.captions;a.i=b.metadata;a.s.push(kd(b.initSegment,b.data))});this.g.on("done",function(){var b={data:kd.apply(ed,ja(a.s)),captions:a.j,metadata:a.i};a.h.resolve(b);a.l=!1})}ld.prototype.destroy=function(){this.g.dispose();this.g=null;return Promise.resolve()};
function md(a,b){if(!Tc.get("muxjs")()||!nd(a))return!1;if(b)return MediaSource.isTypeSupported(od(b,a));var c=od("audio",a),d=od("video",a);return MediaSource.isTypeSupported(c)||MediaSource.isTypeSupported(d)}function nd(a){return"mp2t"==a.toLowerCase().split(";")[0].split("/")[1]}
function od(a,b){var c=b.replace(/mp2t/i,"mp4");"audio"==a&&(c=c.replace("video","audio"));var d=/avc1\.(66|77|100)\.(\d+)/.exec(c);if(d){var e="avc1.",f=d[1],g=Number(d[2]);e=("66"==f?e+"4200":"77"==f?e+"4d00":e+"6400")+(g>>4).toString(16);e+=(g&15).toString(16);c=c.replace(d[0],e)}return c}function pd(a,b){a.l=!0;a.h=new Wc;a.s=[];a.j=[];a.i=[];var c=Oc(b);a.g.push(c);a.g.flush();a.l&&a.h.reject(new P(2,3,3018));return a.h};function qd(a,b){var c=a;b&&(c+='; codecs="'+b+'"');return c}function rd(a,b,c){a=qd(a,b);return Tc.get("muxjs")()&&nd(a)?od(c,a):a}function sd(a){a=a.split(".");var b=a[0];a.pop();return b}function td(a){a=a.split(/ *; */);a.shift();return(a=a.find(function(b){return b.startsWith("codecs=")}))?a.split("=")[1].replace(/^"|"$/g,""):""}(new Map).set("codecs","codecs").set("frameRate","framerate").set("bandwidth","bitrate").set("width","width").set("height","height").set("channelsCount","channels");function ud(a){this.C=null;this.i=a;this.j=this.G=0;this.l=Infinity;this.h=this.g=null;this.B="";this.s=new Map}function vd(a){return wd[a]||"application/cea-608"==a||"application/cea-708"==a?!0:!1}ud.prototype.destroy=function(){this.i=this.C=null;this.s.clear();return Promise.resolve()};
function xd(a,b,c,d){var e,f,g;return L(function(h){if(1==h.g)return z(h,Promise.resolve(),2);if(!a.C||!a.i)return h["return"]();if(null==c||null==d)return a.C.parseInit(Oc(b)),h["return"]();e={periodStart:a.G,segmentStart:c,segmentEnd:d};f=a.C.parseMedia(Oc(b),e);g=f.filter(function(k){return k.startTime>=a.j&&k.startTime<a.l});a.i.append(g);null==a.g&&(a.g=Math.max(c,a.j));a.h=Math.min(d,a.l);A(h)})}
ud.prototype.remove=function(a,b){var c=this;return L(function(d){if(1==d.g)return z(d,Promise.resolve(),2);!c.i||!c.i.remove(a,b)||null==c.g||b<=c.g||a>=c.h||(a<=c.g&&b>=c.h?c.g=c.h=null:a<=c.g&&b<c.h?c.g=b:a>c.g&&b>=c.h&&(c.h=a));A(d)})};function yd(a,b,c){a.j=b;a.l=c}function zd(a,b,c){a.B=b;if(b=a.s.get(b))for(var d=r(b.keys()),e=d.next();!e.done;e=d.next())(e=b.get(e.value).filter(function(f){return f.endTime<=c}))&&a.i.append(e)}
function Ad(a){var b=[];a=r(a);for(var c=a.next();!c.done;c=a.next())c=c.value,b.push({stream:c.stream,cue:new rc(c.startTime,c.endTime,c.text)});return b}function Bd(a,b,c){b.startTime+=c;b.endTime+=c;b=r(b.nestedCues);for(var d=b.next();!d.done;d=b.next())Bd(a,d.value,c)}
function Cd(a,b,c,d,e){var f=c+" "+d,g=new Map;b=r(b);for(var h=b.next();!h.done;h=b.next()){var k=h.value;h=k.stream;k=k.cue;g.has(h)||g.set(h,new Map);g.get(h).has(f)||g.get(h).set(f,[]);Bd(a,k,e);k.startTime>=a.j&&k.startTime<a.l&&(g.get(h).get(f).push(k),h==a.B&&a.i.append([k]))}e=r(g.keys());for(f=e.next();!f.done;f=e.next())for(f=f.value,a.s.has(f)||a.s.set(f,new Map),b=r(g.get(f).keys()),h=b.next();!h.done;h=b.next())h=h.value,k=g.get(f).get(h),a.s.get(f).set(h,k);a.g=null==a.g?Math.max(c,
a.j):Math.min(a.g,Math.max(c,a.j));a.h=Math.max(a.h,Math.min(d,a.l))}N("shaka.text.TextEngine",ud);ud.prototype.destroy=ud.prototype.destroy;ud.findParser=function(a){return wd[a]};ud.unregisterParser=function(a){delete wd[a]};ud.registerParser=function(a,b){wd[a]=b};var wd={};function Dd(a){this.h=a;this.g=null}Dd.prototype.U=function(a){var b=this;this.stop();var c=!0,d=null;this.g=function(){window.clearTimeout(d);c=!1};d=window.setTimeout(function(){c&&b.h()},1E3*a);return this};Dd.prototype.stop=function(){this.g&&(this.g(),this.g=null)};function Q(a){this.h=a;this.g=null}Q.prototype.Ga=function(){this.stop();this.h();return this};Q.prototype.U=function(a){var b=this;this.stop();this.g=(new Dd(function(){b.h()})).U(a);return this};Q.prototype.na=function(a){var b=this;this.stop();this.g=(new Dd(function(){b.g.U(a);b.h()})).U(a);return this};Q.prototype.stop=function(){this.g&&(this.g.stop(),this.g=null)};N("shaka.util.Timer",Q);Q.prototype.stop=Q.prototype.stop;Q.prototype.tickEvery=Q.prototype.na;Q.prototype.tickAfter=Q.prototype.U;
Q.prototype.tickNow=Q.prototype.Ga;function Ed(){return window.MediaSource&&MediaSource.isTypeSupported?!0:!1}function Fd(a){return""!=Gd().canPlayType(a)}function Hd(){return Id("Tizen")}function Jd(){return Id("CrKey")}function Kd(){return!!navigator.vendor&&navigator.vendor.includes("Apple")&&!Hd()}function Ld(){if(!Kd())return null;var a=navigator.userAgent.match(/Version\/(\d+)/);return a?parseInt(a[1],10):(a=navigator.userAgent.match(/OS (\d+)(?:_\d+)?/))?parseInt(a[1],10):null}
function Id(a){return(navigator.userAgent||"").includes(a)}function Gd(){if(Md)return Md;Nd||(Nd=new Q(function(){Md=null}));(Md=document.getElementsByTagName("video")[0]||document.getElementsByTagName("audio")[0])||(Md=document.createElement("video"));Nd.U(1);return Md}var Nd=null,Md=null;function Od(a,b,c,d,e){var f=a.variants;if(b.length||c.length)f=Pd(f,b,c);f=Qd(f,d);b=Rd(f);b=Sd(b);var g=Td(b,e);a.variants=a.variants.filter(function(h){return Ud(h)==g?!0:!1})}function Rd(a){var b=new bb;a=r(a);for(var c=a.next();!c.done;c=a.next()){c=c.value;var d=Ud(c);b.push(d,c)}return b}
function Sd(a){var b=0,c=new Map,d=a.size();cb(a,function(e,f){for(var g=r(f),h=g.next();!h.done;h=g.next()){h=h.value;var k=h.video;if(k&&k.width&&k.height){k=k.width*k.height*(k.frameRate||1);c.has(k)||c.set(k,new bb);var l=c.get(k);l.push(e,h);l.size()===d&&(b=Math.max(b,k))}}});return b?c.get(b):a}
function Pd(a,b,c){var d={};b=r(b);for(var e=b.next();!e.done;d={Wd:d.Wd},e=b.next())if(d.Wd=e.value,e=a.filter(function(f){return function(g){return g.video&&g.video.codecs.startsWith(f.Wd)}}(d)),e.length){a=e;break}d={};c=r(c);for(b=c.next();!b.done;d={Id:d.Id},b=c.next())if(d.Id=b.value,b=a.filter(function(f){return function(g){return g.audio&&g.audio.codecs.startsWith(f.Id)}}(d)),b.length){a=b;break}return a}
function Td(a,b){for(var c=r(b),d=c.next();!d.done;d=c.next())if(d=d.value,d==Vd||d==Wd){if(a=Xd(a,d),1==a.size())return a.keys()[0]}else if(d==Yd)break;return Zd(a)}function Xd(a,b){var c=0,d=new bb;cb(a,function(e,f){for(var g=0,h=0,k=r(f),l=k.next();!l.done;l=k.next())l=l.value,l.decodingInfos.length&&(g+=l.decodingInfos[0][b]?1:0,h++);g/=h;g>c?(d.g={},d.push(e,f),c=g):g==c&&d.push(e,f)});return d}
function Zd(a){var b="",c=Infinity;cb(a,function(d,e){for(var f=0,g=0,h=r(e),k=h.next();!k.done;k=h.next())f+=k.value.bandwidth||0,++g;f/=g;f<c&&(b=d,c=f)});return b}function Ud(a){var b="";a.video&&(b=sd(a.video.codecs));var c="";a.audio&&(c=sd(a.audio.codecs));return b+"-"+c}function $d(a,b,c){a.variants=a.variants.filter(function(d){return ae(d,b,c)})}
function ae(a,b,c){function d(f,g,h){return f>=g&&f<=h}var e=a.video;return e&&e.width&&e.height&&(!d(e.width,b.minWidth,Math.min(b.maxWidth,c.width))||!d(e.height,b.minHeight,Math.min(b.maxHeight,c.height))||!d(e.width*e.height,b.minPixels,b.maxPixels))||a&&a.video&&a.video.frameRate&&!d(a.video.frameRate,b.minFrameRate,b.maxFrameRate)||!d(a.bandwidth,b.minBandwidth,b.maxBandwidth)?!1:!0}
function be(a,b){return L(function(c){if(1==c.g)return z(c,ce(b,0<b.offlineSessionIds.length),2);de(a,b);ee(b);fe(b);A(c)})}
function ce(a,b){return L(function(c){if(1==c.g)return z(c,ge(a.variants,b,!1),2);a.variants=a.variants.filter(function(d){var e=d.video;if(e){var f=he(e.codecs);if(e.codecs.includes(",")){var g=e.codecs.split(",");f=Pb("video",g);g=Pb("audio",g);g=rd(e.mimeType,g,"audio");if(!MediaSource.isTypeSupported(g))return!1}f=rd(e.mimeType,f,"video");if(!MediaSource.isTypeSupported(f))return!1}if(f=d.audio)if(g=ie(f.codecs),f=rd(f.mimeType,g,"audio"),!MediaSource.isTypeSupported(f))return!1;if(Id("Xbox One")&&
e&&(e.width&&1920<e.width||e.height&&1080<e.height)&&e.codecs.includes("avc1."))return Xa(je(d)),!1;(e=d.decodingInfos.some(function(h){return h.supported}))||Xa(je(d));return e});A(c)})}
function ge(a,b,c){var d,e,f,g,h,k,l,m,n,p,t;return L(function(v){if(d=a.some(function(w){return w.decodingInfos.length}))return v["return"]();e=navigator.mediaCapabilities;f=[];g=function(w,y){var x;return L(function(D){if(1==D.g)return E(D,2),z(D,e.decodingInfo(y),4);if(2!=D.g)return x=D.h,w.decodingInfos.push(x),wa(D,0);H(D);JSON.stringify(y);A(D)})};h=r(a);for(k=h.next();!k.done;k=h.next())for(l=k.value,m=ke(l,b,c),n=r(m),p=n.next();!p.done;p=n.next())t=p.value,f.push(g(l,t));return z(v,Promise.all(f),
0)})}
function ke(a,b,c){var d=a.audio,e=a.video;c={type:c?"file":"media-source"};if(e){var f=e.codecs;if(e.codecs.includes(",")){var g=e.codecs.split(",");f=Pb("video",g);f=he(f);g=Pb("audio",g);g=rd(e.mimeType,g,"audio");c.audio={contentType:g,channels:2,bitrate:a.bandwidth||1,samplerate:1,spatialRendering:!1}}f=he(f);f=rd(e.mimeType,f,"video");c.video={contentType:f,width:e.width||1,height:e.height||1,bitrate:e.bandwidth||a.bandwidth||1,framerate:e.frameRate||1};if(e.hdr)switch(e.hdr){case "SDR":c.video.transferFunction="srgb";
break;case "PQ":c.video.transferFunction="pq";break;case "HLG":c.video.transferFunction="hlg"}}d&&(f=ie(d.codecs),f=rd(d.mimeType,f,"audio"),c.audio={contentType:f,channels:d.channelsCount||2,bitrate:d.bandwidth||a.bandwidth||1,samplerate:d.audioSamplingRate||1,spatialRendering:d.spatialAudio});g=(a.video?a.video.drmInfos:[]).concat(a.audio?a.audio.drmInfos:[]);if(!g.length)return[c];a=[];f=new Map;g=r(g);for(var h=g.next();!h.done;h=g.next()){var k=h.value;f.get(k.keySystem)||f.set(k.keySystem,[]);
f.get(k.keySystem).push(k)}g=b?"required":"optional";b=b?["persistent-license"]:["temporary"];k=r(f.keys());for(var l=k.next();!l.done;l=k.next()){var m=l.value;l=Object.assign({},c);var n=f.get(m);m={keySystem:m,initDataType:"cenc",persistentState:g,distinctiveIdentifier:"optional",sessionTypes:b};n=r(n);for(h=n.next();!h.done;h=n.next()){h=h.value;if(h.initData&&h.initData.length){for(var p=new Set,t=r(h.initData),v=t.next();!v.done;v=t.next())p.add(v.value.initDataType);m.initDataType=h.initData[0].initDataType}h.distinctiveIdentifierRequired&&
(m.distinctiveIdentifier="required");h.persistentStateRequired&&(m.persistentState="required");h.sessionType&&(m.sessionTypes=[h.sessionType]);d&&(m.audio?m.audio.robustness=m.audio.robustness||h.audioRobustness:m.audio={robustness:h.audioRobustness});e&&(m.video?m.video.robustness=m.video.robustness||h.videoRobustness:m.video={robustness:h.videoRobustness})}l.keySystemConfiguration=m;a.push(l)}return a}function ie(a){return Hd()?"ac-3"==a.toLowerCase()?"ec-3":a:a}
function he(a){return"vp9"==a?"vp09.00.10.08":a}function de(a,b){b.variants=b.variants.filter(function(c){var d=c.audio;c=c.video;return d&&a&&a.audio&&!le(d,a.audio)||c&&a&&a.video&&!le(c,a.video)?!1:!0})}function ee(a){a.textStreams=a.textStreams.filter(function(b){return vd(qd(b.mimeType,b.codecs))})}function fe(a){a.imageStreams=a.imageStreams.filter(function(b){var c=["image/svg+xml","image/png","image/jpeg"];(Id("Web0S")||Hd()||Jd())&&c.push("image/webp");return c.includes(b.mimeType)})}
function le(a,b){return a.mimeType!=b.mimeType||a.codecs.split(".")[0]!=b.codecs.split(".")[0]?!1:!0}
function me(a){var b=a.audio,c=a.video,d=b?b.codecs:null,e=c?c.codecs:null,f=[];e&&f.push(e);d&&f.push(d);var g=[];c&&g.push(c.mimeType);b&&g.push(b.mimeType);g=g[0]||null;var h=[];b&&h.push(b.kind);c&&h.push(c.kind);h=h[0]||null;var k=new Set;if(b)for(var l=r(b.roles),m=l.next();!m.done;m=l.next())k.add(m.value);if(c)for(l=r(c.roles),m=l.next();!m.done;m=l.next())k.add(m.value);a={id:a.id,active:!1,type:"variant",bandwidth:a.bandwidth,language:a.language,label:null,kind:h,width:null,height:null,
frameRate:null,pixelAspectRatio:null,hdr:null,mimeType:g,codecs:f.join(", "),audioCodec:d,videoCodec:e,primary:a.primary,roles:Array.from(k),audioRoles:null,forced:!1,videoId:null,audioId:null,channelsCount:null,audioSamplingRate:null,spatialAudio:!1,tilesLayout:null,audioBandwidth:null,videoBandwidth:null,originalVideoId:null,originalAudioId:null,originalTextId:null,originalImageId:null};c&&(a.videoId=c.id,a.originalVideoId=c.originalId,a.width=c.width||null,a.height=c.height||null,a.frameRate=c.frameRate||
null,a.pixelAspectRatio=c.pixelAspectRatio||null,a.videoBandwidth=c.bandwidth||null);b&&(a.audioId=b.id,a.originalAudioId=b.originalId,a.channelsCount=b.channelsCount,a.audioSamplingRate=b.audioSamplingRate,a.audioBandwidth=b.bandwidth||null,a.label=b.label,a.audioRoles=b.roles);return a}
function ne(a){return{id:a.id,active:!1,type:Sb,bandwidth:0,language:a.language,label:a.label,kind:a.kind||null,width:null,height:null,frameRate:null,pixelAspectRatio:null,hdr:null,mimeType:a.mimeType,codecs:a.codecs||null,audioCodec:null,videoCodec:null,primary:a.primary,roles:a.roles,audioRoles:null,forced:a.forced,videoId:null,audioId:null,channelsCount:null,audioSamplingRate:null,spatialAudio:!1,tilesLayout:null,audioBandwidth:null,videoBandwidth:null,originalVideoId:null,originalAudioId:null,
originalTextId:a.originalId,originalImageId:null}}
function oe(a){var b=a.width||null,c=a.height||null,d=null;a.segmentIndex&&(d=a.segmentIndex.get(0));var e=a.tilesLayout;d&&(e=d.tilesLayout||e);e&&null!=b&&(b/=Number(e.split("x")[0]));e&&null!=c&&(c/=Number(e.split("x")[1]));return{id:a.id,active:!1,type:"image",bandwidth:a.bandwidth||0,language:"",label:null,kind:null,width:b,height:c,frameRate:null,pixelAspectRatio:null,hdr:null,mimeType:a.mimeType,codecs:null,audioCodec:null,videoCodec:null,primary:!1,roles:[],audioRoles:null,forced:!1,videoId:null,
audioId:null,channelsCount:null,audioSamplingRate:null,spatialAudio:!1,tilesLayout:e||null,audioBandwidth:null,videoBandwidth:null,originalVideoId:null,originalAudioId:null,originalTextId:null,originalImageId:a.originalId}}function pe(a){a.__shaka_id||(a.__shaka_id=qe++);return a.__shaka_id}
function re(a){var b=se(a);b.active="disabled"!=a.mode;b.type="text";b.originalTextId=a.id;"captions"==a.kind&&(b.mimeType="application/cea-608");a.kind&&(b.roles=[a.kind]);"forced"==a.kind&&(b.forced=!0);return b}function te(a){var b=se(a);b.active=a.enabled;b.type="variant";b.originalAudioId=a.id;"main"==a.kind&&(b.primary=!0);a.kind&&(b.roles=[a.kind],b.audioRoles=[a.kind],b.label=a.label);return b}
function se(a){return{id:pe(a),active:!1,type:"",bandwidth:0,language:Wb(a.language),label:a.label,kind:a.kind,width:null,height:null,frameRate:null,pixelAspectRatio:null,hdr:null,mimeType:null,codecs:null,audioCodec:null,videoCodec:null,primary:!1,roles:[],forced:!1,audioRoles:null,videoId:null,audioId:null,channelsCount:null,audioSamplingRate:null,spatialAudio:!1,tilesLayout:null,audioBandwidth:null,videoBandwidth:null,originalVideoId:null,originalAudioId:null,originalTextId:null,originalImageId:null}}
function ue(a){return a.allowedByApplication&&a.allowedByKeySystem}function ve(a){return a.filter(function(b){return ue(b)})}
function Qd(a,b){var c=a.filter(function(g){return g.audio&&g.audio.channelsCount}),d=new Map;c=r(c);for(var e=c.next();!e.done;e=c.next()){e=e.value;var f=e.audio.channelsCount;d.has(f)||d.set(f,[]);d.get(f).push(e)}c=Array.from(d.keys());if(0==c.length)return a;e=c.filter(function(g){return g<=b});return e.length?d.get(Math.max.apply(Math,ja(e))):d.get(Math.min.apply(Math,ja(c)))}
function we(a,b,c,d){var e=a,f=a.filter(function(k){return k.primary});f.length&&(e=f);var g=e.length?e[0].language:"";e=e.filter(function(k){return k.language==g});if(b){var h=dc(Wb(b),a.map(function(k){return k.language}));h&&(e=a.filter(function(k){return Wb(k.language)==h}))}e=e.filter(function(k){return k.forced==d});if(c){if(a=xe(e,c),a.length)return a}else if(a=e.filter(function(k){return 0==k.roles.length}),a.length)return a;a=e.map(function(k){return k.roles}).reduce(Jb,[]);return a.length?
xe(e,a[0]):e}function xe(a,b){return a.filter(function(c){return c.roles.includes(b)})}function je(a){var b=[];a.audio&&b.push(ye(a.audio));a.video&&b.push(ye(a.video));return b.join(", ")}
function ye(a){return"audio"==a.type?"type=audio codecs="+a.codecs+" bandwidth="+a.bandwidth+" channelsCount="+a.channelsCount+" audioSamplingRate="+a.audioSamplingRate:"video"==a.type?"type=video codecs="+a.codecs+" bandwidth="+a.bandwidth+" frameRate="+a.frameRate+" width="+a.width+" height="+a.height:"unexpected stream type"}var qe=0,Vd="smooth",Wd="powerEfficient",Yd="bandwidth";function ze(){var a=this;this.j=null;this.h=!1;this.g=new mc;navigator.connection&&navigator.connection.addEventListener("change",function(){if(a.m.useNetworkInformation&&a.h){a.g=new mc;a.m&&a.g.configure(a.m.advanced);var b=a.chooseVariant();b&&a.j(b)}});this.i=[];this.s=1;this.B=!1;this.m=this.l=null}q=ze.prototype;q.stop=function(){this.j=null;this.h=!1;this.i=[];this.s=1;this.l=null};q.init=function(a){this.j=a};
q.chooseVariant=function(){var a=Ae(this.m.restrictions,this.i),b=this.g.getBandwidthEstimate(Be(this));this.i.length&&!a.length&&(a=Ae(null,this.i),a=[a[0]]);var c=a[0]||null;a=r(nb(a));for(var d=a.next();!d.done;d=a.next()){var e=d.value;d=e.item;var f=isNaN(this.s)?1:Math.abs(this.s);e=f*(e.next||{bandwidth:Infinity}).bandwidth/this.m.bandwidthUpgradeTarget;b>=f*d.bandwidth/this.m.bandwidthDowngradeTarget&&b<=e&&(c=d)}this.l=Date.now();return c};q.enable=function(){this.h=!0};
q.disable=function(){this.h=!1};q.segmentDownloaded=function(a,b){var c=this.g;if(!(b<c.l)){var d=8E3*b/a,e=a/1E3;c.g+=b;kc(c.h,e,d);kc(c.j,e,d)}if(null!=this.l&&this.h)a:{if(!this.B){c=this.g;if(!(c.g>=c.i))break a;this.B=!0}else if(Date.now()-this.l<1E3*this.m.switchInterval)break a;c=this.chooseVariant();this.g.getBandwidthEstimate(Be(this));c&&this.j(c)}};q.getBandwidthEstimate=function(){return this.g.getBandwidthEstimate(this.m.defaultBandwidthEstimate)};q.setVariants=function(a){this.i=a};
q.playbackRateChanged=function(a){this.s=a};q.configure=function(a){this.m=a;this.g&&this.m&&this.g.configure(this.m.advanced)};function Be(a){var b=a.m.defaultBandwidthEstimate;navigator.connection&&navigator.connection.downlink&&a.m.useNetworkInformation&&(b=1E6*navigator.connection.downlink);return b}function Ae(a,b){a&&(b=b.filter(function(c){return ae(c,a,{width:Infinity,height:Infinity})}));return b.sort(function(c,d){return c.bandwidth-d.bandwidth})}N("shaka.abr.SimpleAbrManager",ze);
ze.prototype.configure=ze.prototype.configure;ze.prototype.playbackRateChanged=ze.prototype.playbackRateChanged;ze.prototype.setVariants=ze.prototype.setVariants;ze.prototype.getBandwidthEstimate=ze.prototype.getBandwidthEstimate;ze.prototype.segmentDownloaded=ze.prototype.segmentDownloaded;ze.prototype.disable=ze.prototype.disable;ze.prototype.enable=ze.prototype.enable;ze.prototype.chooseVariant=ze.prototype.chooseVariant;ze.prototype.init=ze.prototype.init;ze.prototype.stop=ze.prototype.stop;function Ce(a,b){this.h=a;this.g=new Set([a]);b=b||[];for(var c=r(b),d=c.next();!d.done;d=c.next())this.add(d.value)}Ce.prototype.add=function(a){return De(this.h,a)?(this.g.add(a),!0):!1};
function De(a,b){var c;if(!(c=!!a.audio!=!!b.audio||!!a.video!=!!b.video||a.language!=b.language)&&(c=a.audio&&b.audio)){c=a.audio;var d=b.audio;c=!((!(!c.channelsCount||!d.channelsCount||2<c.channelsCount||2<d.channelsCount)||c.channelsCount==d.channelsCount)&&Ee(c,d)&&Ge(c.roles,d.roles))}!c&&(c=a.video&&b.video)&&(c=a.video,d=b.video,c=!(Ee(c,d)&&Ge(c.roles,d.roles)));return c?!1:!0}Ce.prototype.values=function(){return this.g.values()};
function Ee(a,b){if(a.mimeType!=b.mimeType)return!1;var c=a.codecs.split(",").map(function(g){return sd(g)}),d=b.codecs.split(",").map(function(g){return sd(g)});if(c.length!=d.length)return!1;c.sort();d.sort();for(var e=r(lb(c.length)),f=e.next();!f.done;f=e.next())if(f=f.value,c[f]!=d[f])return!1;return!0}
function Ge(a,b){var c=new Set(a),d=new Set(b);c["delete"]("main");d["delete"]("main");if(c.size!=d.size)return!1;c=r(c);for(var e=c.next();!e.done;e=c.next())if(!d.has(e.value))return!1;return!0};function He(a){this.g=a;this.h=new Ie(a.language,"",a.audio&&a.audio.channelsCount?a.audio.channelsCount:0,"")}He.prototype.create=function(a){var b=this,c=a.filter(function(d){return De(b.g,d)});return c.length?new Ce(c[0],c):this.h.create(a)};function Ie(a,b,c,d){this.i=a;this.j=b;this.g=c;this.h=void 0===d?"":d}
Ie.prototype.create=function(a){var b=[];b=Je(a,this.i);var c=a.filter(function(d){return d.primary});b=b.length?b:c.length?c:a;a=Ke(b,this.j);a.length&&(b=a);this.g&&(a=Qd(b,this.g),a.length&&(b=a));this.h&&(a=Le(b,this.h),a.length&&(b=a));a=new Ce(b[0]);b=r(b);for(c=b.next();!c.done;c=b.next())c=c.value,De(a.h,c)&&a.add(c);return a};function Je(a,b){var c=Wb(b),d=dc(c,a.map(function(e){return cc(e)}));return d?a.filter(function(e){return d==cc(e)}):[]}
function Ke(a,b){return a.filter(function(c){return c.audio?b?c.audio.roles.includes(b):0==c.audio.roles.length:!1})}function Le(a,b){return a.filter(function(c){return c.audio?c.audio.label.toLowerCase()==b.toLowerCase():!1})};function Me(){this.g=Ne;this.h=(new Map).set(Ne,2).set(Oe,1)}function Pe(a,b,c){a.h.set(Ne,c).set(Oe,b)}var Oe=0,Ne=1;function Qe(a,b){var c=Re();this.l=null==a.maxAttempts?c.maxAttempts:a.maxAttempts;this.j=null==a.baseDelay?c.baseDelay:a.baseDelay;this.B=null==a.fuzzFactor?c.fuzzFactor:a.fuzzFactor;this.s=null==a.backoffFactor?c.backoffFactor:a.backoffFactor;this.g=0;this.h=this.j;if(this.i=void 0===b?!1:b)this.g=1}
function Se(a){var b,c;return L(function(d){if(1==d.g){if(a.g>=a.l)if(a.i)a.g=1,a.h=a.j;else throw new P(2,7,1010);b=a.g;a.g++;if(0==b)return d["return"]();c=a.h*(1+(2*Math.random()-1)*a.B);return z(d,new Promise(function(e){(new Q(e)).U(c/1E3)}),2)}a.h*=a.s;A(d)})}function Re(){return{maxAttempts:2,baseDelay:1E3,backoffFactor:2,fuzzFactor:.5,timeout:3E4,stallTimeout:5E3,connectionTimeout:1E4}};function Te(a,b){this.promise=a;this.i=b;this.g=!1}function Ue(a){return new Te(Promise.reject(a),function(){return Promise.resolve()})}function Ve(){var a=Promise.reject(new P(2,7,7001));a["catch"](function(){});return new Te(a,function(){return Promise.resolve()})}function We(a){return new Te(Promise.resolve(a),function(){return Promise.resolve()})}function Xe(a){return new Te(a,function(){return a["catch"](function(){})})}Te.prototype.abort=function(){this.g=!0;return this.i()};
function Ye(a){return new Te(Promise.all(a.map(function(b){return b.promise})),function(){return Promise.all(a.map(function(b){return b.abort()}))})}Te.prototype["finally"]=function(a){this.promise.then(function(){return a(!0)},function(){return a(!1)});return this};
Te.prototype.va=function(a,b){function c(h){return function(k){if(e.g&&h)f.reject(g);else{var l=h?a:b;l?d=Ze(l,k,f):(h?f.resolve:f.reject)(k)}}}function d(){f.reject(g);return e.abort()}var e=this,f=new Wc,g=new P(2,7,7001);this.promise.then(c(!0),c(!1));return new Te(f,function(){return d()})};
function Ze(a,b,c){try{var d=a(b);if(d&&d.promise&&d.abort)return c.resolve(d.promise),function(){return d.abort()};c.resolve(d);return function(){return Promise.resolve(d).then(function(){},function(){})}}catch(e){return c.reject(e),function(){return Promise.resolve()}}}N("shaka.util.AbortableOperation",Te);Te.prototype.chain=Te.prototype.va;Te.prototype["finally"]=Te.prototype["finally"];Te.all=Ye;Te.prototype.abort=Te.prototype.abort;Te.notAbortable=Xe;Te.completed=We;Te.aborted=Ve;Te.failed=Ue;function $e(a){function b(d){switch(typeof d){case "undefined":case "boolean":case "number":case "string":case "symbol":case "function":return d;default:if(!d||d.buffer&&d.buffer.constructor==ArrayBuffer)return d;if(c.has(d))return null;var e=d.constructor==Array;if(d.constructor!=Object&&!e)return null;c.add(d);var f=e?[]:{},g;for(g in d)f[g]=b(d[g]);e&&(f.length=d.length);return f}}var c=new Set;return b(a)}function af(a){var b={},c;for(c in a)b[c]=a[c];return b};function bf(){this.g=[]}function cf(a,b){a.g.push(b["finally"](function(){oc(a.g,b)}))}bf.prototype.destroy=function(){for(var a=[],b=r(this.g),c=b.next();!c.done;c=b.next())c=c.value,c.promise["catch"](function(){}),a.push(c.abort());this.g=[];return Promise.all(a)};function df(a,b,c){db.call(this);this.i=!1;this.s=new bf;this.g=new Set;this.h=new Set;this.l=a||null;this.j=b||null;this.C=c||null;this.B=!1}u(df,db);q=df.prototype;q.Ee=function(a){this.B=a};function ef(a,b,c,d){c=c||ff;var e=gf[a];if(!e||c>=e.priority)gf[a]={priority:c,Xg:b,Zg:void 0===d?!1:d}}q.$g=function(a){this.g.add(a)};q.qh=function(a){this.g["delete"](a)};q.Vf=function(){this.g.clear()};q.ah=function(a){this.h.add(a)};q.rh=function(a){this.h["delete"](a)};q.Wf=function(){this.h.clear()};
function hf(a,b,c){return{uris:a,method:"GET",body:null,headers:{},allowCrossSiteCredentials:!1,retryParameters:b,licenseRequestType:null,sessionId:null,streamDataCallback:void 0===c?null:c}}q.destroy=function(){this.i=!0;this.g.clear();this.h.clear();db.prototype.release.call(this);return this.s.destroy()};
q.request=function(a,b){var c=this,d=new jf;if(this.i){var e=Promise.reject(new P(2,7,7001));e["catch"](function(){});return new kf(e,function(){return Promise.resolve()},d)}b.method=b.method||"GET";b.headers=b.headers||{};b.retryParameters=b.retryParameters?$e(b.retryParameters):Re();b.uris=$e(b.uris);e=lf(this,a,b);var f=e.va(function(){return mf(c,a,b,new Qe(b.retryParameters,!1),0,null,d)}),g=f.va(function(n){return nf(c,a,n)}),h=Date.now(),k=0;e.promise.then(function(){k=Date.now()-h},function(){});
var l=0;f.promise.then(function(){l=Date.now()},function(){});var m=g.va(function(n){var p=Date.now()-l,t=n.response;t.timeMs+=k;t.timeMs+=p;n.Kg||!c.l||t.fromCache||a!=of||c.l(t.timeMs,t.data.byteLength);return t},function(n){n&&(n.severity=2);throw n;});e=new kf(m.promise,function(){return m.abort()},d);cf(this.s,e);return e};
function lf(a,b,c){var d=We(void 0),e={};a=r(a.g);for(var f=a.next();!f.done;e={Rd:e.Rd},f=a.next())e.Rd=f.value,d=d.va(function(g){return function(){c.body&&(c.body=Pc(c.body));return g.Rd(b,c)}}(e));return d.va(void 0,function(g){if(g instanceof P&&7001==g.code)throw g;throw new P(2,1,1006,g);})}
function mf(a,b,c,d,e,f,g){a.B&&(c.uris[e]=c.uris[e].replace("http://","https://"));var h=new qb(c.uris[e]),k=h.ab,l=!1;k||(k=location.protocol,k=k.slice(0,-1),rb(h,k),c.uris[e]=h.toString());k=k.toLowerCase();var m=(k=gf[k])?k.Xg:null;if(!m)return Ue(new P(2,1,1E3,h));var n=k.Zg,p=null,t=null,v=!1,w=!1,y;return Xe(Se(d)).va(function(){if(a.i)return Ve();y=Date.now();var x=m(c.uris[e],c,b,function(B,F,G){p&&p.stop();t&&t.U(C/1E3);a.l&&b==of&&(a.l(B,F),l=!0,g.g=G)},function(B){a.j&&a.j(B,c,b);w=!0});
if(!n)return x;var D=c.retryParameters.connectionTimeout;D&&(p=new Q(function(){v=!0;x.abort()}),p.U(D/1E3));var C=c.retryParameters.stallTimeout;C&&(t=new Q(function(){v=!0;x.abort()}));return x}).va(function(x){p&&p.stop();t&&t.stop();void 0==x.timeMs&&(x.timeMs=Date.now()-y);var D={response:x,Kg:l};!w&&a.j&&a.j(x.headers,c,b);return D},function(x){p&&p.stop();t&&t.stop();if(a.C){var D=null,C=0;x instanceof P&&(D=x,1001==x.code&&(C=x.data[1]));a.C(c,D,C,v)}if(a.i)return Ve();v&&(x=new P(1,1,1003,
c.uris[e],b));if(x instanceof P){if(7001==x.code)throw x;if(1010==x.code)throw f;if(1==x.severity)return D=(new Map).set("error",x),D=new O("retry",D),a.dispatchEvent(D),e=(e+1)%c.uris.length,mf(a,b,c,d,e,x,g)}throw x;})}
function nf(a,b,c){var d=We(void 0),e={};a=r(a.h);for(var f=a.next();!f.done;e={Sd:e.Sd},f=a.next())e.Sd=f.value,d=d.va(function(g){return function(){var h=c.response;h.data&&(h.data=Pc(h.data));return g.Sd(b,h)}}(e));return d.va(function(){return c},function(g){var h=2;if(g instanceof P){if(7001==g.code)throw g;h=g.severity}throw new P(h,1,1007,g);})}N("shaka.net.NetworkingEngine",df);df.prototype.request=df.prototype.request;df.prototype.destroy=df.prototype.destroy;df.makeRequest=hf;
df.defaultRetryParameters=function(){return Re()};df.prototype.clearAllResponseFilters=df.prototype.Wf;df.prototype.unregisterResponseFilter=df.prototype.rh;df.prototype.registerResponseFilter=df.prototype.ah;df.prototype.clearAllRequestFilters=df.prototype.Vf;df.prototype.unregisterRequestFilter=df.prototype.qh;df.prototype.registerRequestFilter=df.prototype.$g;df.unregisterScheme=function(a){delete gf[a]};df.registerScheme=ef;df.prototype.setForceHTTPS=df.prototype.Ee;function jf(){this.g=0}
df.NumBytesRemainingClass=jf;function kf(a,b,c){Te.call(this,a,b);this.h=c}u(kf,Te);df.PendingRequest=kf;var of=1;df.RequestType={MANIFEST:0,SEGMENT:of,LICENSE:2,APP:3,TIMING:4,SERVER_CERTIFICATE:5};var ff=3;df.PluginPriority={FALLBACK:1,PREFERRED:2,APPLICATION:ff};var gf={};function pf(a){this.g=!1;this.h=new Wc;this.i=a}pf.prototype.destroy=function(){var a=this;if(this.g)return this.h;this.g=!0;return this.i().then(function(){a.h.resolve()},function(){a.h.resolve()})};function qf(a,b){if(a.g){if(b instanceof P&&7003==b.code)throw b;throw new P(2,7,7003,b);}};function rf(){this.g=new bb}q=rf.prototype;q.release=function(){this.Yb();this.g=null};q.o=function(a,b,c,d){this.g&&(a=new sf(a,b,c,d),this.g.push(b,a))};q.Qa=function(a,b,c,d){function e(g){f.Ta(a,b,e);c(g)}var f=this;this.o(a,b,e,d)};q.Ta=function(a,b,c){if(this.g){var d=this.g.get(b)||[];d=r(d);for(var e=d.next();!e.done;e=d.next())e=e.value,e.target!=a||c!=e.listener&&c||(e.Ta(),this.g.remove(b,e))}};
q.Yb=function(){if(this.g){var a=this.g,b=[],c;for(c in a.g)b.push.apply(b,ja(a.g[c]));a=r(b);for(b=a.next();!b.done;b=a.next())b.value.Ta();this.g.g={}}};N("shaka.util.EventManager",rf);rf.prototype.removeAll=rf.prototype.Yb;rf.prototype.unlisten=rf.prototype.Ta;rf.prototype.listenOnce=rf.prototype.Qa;rf.prototype.listen=rf.prototype.o;rf.prototype.release=rf.prototype.release;function sf(a,b,c,d){this.target=a;this.type=b;this.listener=c;this.g=tf(a,d);this.target.addEventListener(b,c,this.g)}
sf.prototype.Ta=function(){this.target.removeEventListener(this.type,this.listener,this.g);this.listener=this.target=null;this.g=!1};function tf(a,b){if(void 0==b)return!1;if("boolean"==typeof b)return b;var c=new Set(["passive","capture"]);Object.keys(b).filter(function(d){return!c.has(d)});return uf(a)?b:b.capture||!1}
function uf(a){var b=vf;if(void 0==b){b=!1;try{var c={},d={get:function(){b=!0;return!1}};Object.defineProperty(c,"passive",d);Object.defineProperty(c,"capture",d);d=function(){};a.addEventListener("test",d,c);a.removeEventListener("test",d,c)}catch(e){b=!1}vf=b}return b||!1}var vf=void 0;function wf(){}function xf(a){a=bd(a);return(new qb(a)).eb}function yf(a,b,c){function d(h){Rc(f).setUint32(g,h.byteLength,!0);g+=4;f.set(Oc(h),g);g+=h.byteLength}if(!c||!c.byteLength)throw new P(2,6,6015);var e;"string"==typeof b?e=dd(b,!0):e=b;a=bd(a);a=dd(a,!0);var f=new Uint8Array(12+a.byteLength+e.byteLength+c.byteLength),g=0;d(a);d(e);d(c);return f}N("shaka.util.FairPlayUtils",wf);wf.initDataTransform=yf;wf.defaultGetContentId=xf;function zf(a){for(var b=new Map,c=r(Object.keys(a)),d=c.next();!d.done;d=c.next())d=d.value,b.set(d,a[d]);return b}function Af(a){var b={};a.forEach(function(c,d){b[d]=c});return b}function Bf(a,b){if(a||b){if(a&&!b||b&&!a)return!1}else return!0;if(a.size!=b.size)return!1;for(var c=r(a),d=c.next();!d.done;d=c.next()){var e=r(d.value);d=e.next().value;e=e.next().value;if(!b.has(d))return!1;d=b.get(d);if(d!=e||void 0==d)return!1}return!0};function Cf(a,b){var c=this;b=void 0===b?1:b;this.F=a;this.G=new Set;this.g=this.s=null;this.ia=this.ea=!1;this.I=0;this.i=null;this.h=new rf;this.j=new Map;this.C=[];this.B=new Wc;this.m=null;this.l=function(d){c.B.reject(d);a.onError(d)};this.ka=new Map;this.$=new Map;this.P=new Q(function(){return Df(c)});this.L=!1;this.J=[];this.M=!1;this.ha=(new Q(function(){Ef(c)})).na(b);this.B["catch"](function(){});this.N=new pf(function(){return Ff(c)});this.S=!1}q=Cf.prototype;q.destroy=function(){return this.N.destroy()};
function Ff(a){return L(function(b){switch(b.g){case 1:return a.h.release(),a.h=null,a.B.reject(),a.ha.stop(),a.ha=null,a.P.stop(),a.P=null,z(b,Gf(a),2);case 2:if(!a.g){b.D(3);break}E(b,4);return z(b,a.g.setMediaKeys(null),6);case 6:wa(b,5);break;case 4:H(b);case 5:a.g=null;case 3:a.i=null,a.G.clear(),a.s=null,a.C=[],a.m=null,a.l=function(){},a.F=null,a.S=!1,A(b)}})}q.configure=function(a){this.m=a};function Hf(a,b,c){a.ia=!0;a.C=[];a.L=c;return If(a,b)}
function Jf(a,b,c){a.C=c;a.L=0<c.length;return If(a,b)}function Kf(a,b,c,d,e,f){var g=new Map;e={audioCapabilities:e,videoCapabilities:f,distinctiveIdentifier:"optional",persistentState:"required",sessionTypes:["persistent-license"],label:b};e.drmInfos=[{keySystem:b,licenseServerUri:c,distinctiveIdentifierRequired:!1,persistentStateRequired:!0,audioRobustness:"",videoRobustness:"",serverCertificate:d,serverCertificateUri:"",initData:null,keyIds:null}];g.set(b,e);return Lf(a,g,[])}
function If(a,b){var c,d,e,f,g,h,k,l,m,n,p,t,v,w;return L(function(y){if(1==y.g){if(c=Mf(a))for(d=r(b),e=d.next();!e.done;e=d.next())f=e.value,f.video&&(f.video.drmInfos=[c]),f.audio&&(f.audio.drmInfos=[c]);g=b.some(function(x){return x.video&&x.video.drmInfos.length||x.audio&&x.audio.drmInfos.length?!0:!1});g||(h=zf(a.m.servers),Nf(b,h));k=r(b);for(e=k.next();!e.done;e=k.next())for(l=e.value,m=Of(l),n=r(m),p=n.next();!p.done;p=n.next())t=p.value,Pf(t,zf(a.m.servers),zf(a.m.advanced||{}));return z(y,
ge(b,a.L,a.S),2)}v=g||Object.keys(a.m.servers).length;if(!v)return a.ea=!0,y["return"](Promise.resolve());w=Lf(a,void 0,b);return y["return"](g?w:w["catch"](function(){}))})}
q.Hc=function(a){var b=this,c,d;return L(function(e){if(1==e.g){if(!b.s)return b.h.Qa(a,"encrypted",function(){b.l(new P(2,6,6010))}),e["return"]();b.g=a;b.h.Qa(b.g,"play",function(){for(var f=r(b.J),g=f.next();!g.done;g=f.next())Qf(b,g.value);b.M=!0;b.J=[]});"webkitCurrentPlaybackTargetIsWireless"in b.g&&b.h.o(b.g,"webkitcurrentplaybacktargetiswirelesschanged",function(){return Gf(b)});c=b.g.setMediaKeys(b.s);c=c["catch"](function(f){return Promise.reject(new P(2,6,6003,f.message))});return z(e,
c,2)}qf(b.N);Rf(b);b.i.initData.length||b.C.length||(d=function(f){return Sf(b,f.initDataType,Oc(f.initData))},b.h.o(b.g,"encrypted",d));A(e)})};
function Tf(a){var b,c,d,e,f;return L(function(g){switch(g.g){case 1:if(!a.s||!a.i)return g["return"]();if(!a.i.serverCertificateUri||a.i.serverCertificate&&a.i.serverCertificate.length){g.D(2);break}b=hf([a.i.serverCertificateUri],a.m.retryParameters);E(g,3);c=a.F.Wb.request(5,b);return z(g,c.promise,5);case 5:d=g.h;a.i.serverCertificate=Oc(d.data);wa(g,4);break;case 3:throw e=H(g),new P(2,6,6017,e);case 4:if(a.N.g)return g["return"]();case 2:if(!a.i.serverCertificate||!a.i.serverCertificate.length)return g["return"]();
E(g,6);return z(g,a.s.setServerCertificate(a.i.serverCertificate),8);case 8:wa(g,0);break;case 6:throw f=H(g),new P(2,6,6004,f.message);}})}function Uf(a,b){var c,d,e;return L(function(f){if(1==f.g)return z(f,Vf(a,b),2);if(3!=f.g){c=f.h;if(!c)return f["return"]();d=[];if(e=a.j.get(c))e.jb=new Wc,d.push(e.jb);d.push(c.remove());return z(f,Promise.all(d),3)}a.j["delete"](c);A(f)})}
function Rf(a){for(var b=(a.i?a.i.initData:[])||[],c=r(b),d=c.next();!d.done;d=c.next())d=d.value,Sf(a,d.initDataType,d.initData);c=r(a.C);for(d=c.next();!d.done;d=c.next())Vf(a,d.value);b.length||a.C.length||a.B.resolve();return a.B}function Sf(a,b,c){var d=a.j.values();d=r(d);for(var e=d.next();!e.done;e=d.next())if(Mc(c,e.value.initData)&&!Id("Tizen 2"))return;Wf(a,b,c,a.i.sessionType)}function Xf(a){return a?!!a.match(/^com\.(microsoft|chromecast)\.playready/):!1}
function Yf(a){a=a.j.keys();a=fb(a,function(b){return b.sessionId});return Array.from(a)}q.Lc=function(){var a=Infinity,b=this.j.keys();b=r(b);for(var c=b.next();!c.done;c=b.next())c=c.value,isNaN(c.expiration)||(a=Math.min(a,c.expiration));return a};q.qd=function(){return Af(this.$)};
function Lf(a,b,c){var d,e,f,g,h,k,l,m,n,p,t,v,w;return L(function(y){switch(y.g){case 1:d=new Map;if(c.length){e=Zf(a,c,d);y.D(2);break}return z(y,$f(a,b),3);case 3:e=y.h;case 2:f=e;if(!f)throw new P(2,6,6001);qf(a.N);E(y,4);a.G.clear();g=f.getConfiguration();h=g.audioCapabilities||[];k=g.videoCapabilities||[];l=r(h);for(m=l.next();!m.done;m=l.next())n=m.value,a.G.add(n.contentType.toLowerCase());p=r(k);for(m=p.next();!m.done;m=p.next())t=m.value,a.G.add(t.contentType.toLowerCase());if(c.length){var x=
f.keySystem;var D=d.get(f.keySystem);var C=[],B=[],F=[],G=[],I=new Set;ag(D,C,F,B,G,I);var K=a.L?"persistent-license":"temporary";x={keySystem:x,licenseServerUri:C[0],distinctiveIdentifierRequired:D[0].distinctiveIdentifierRequired,persistentStateRequired:D[0].persistentStateRequired,sessionType:D[0].sessionType||K,audioRobustness:D[0].audioRobustness||"",videoRobustness:D[0].videoRobustness||"",serverCertificate:F[0],serverCertificateUri:B[0],initData:G,keyIds:I};D=r(D);for(C=D.next();!C.done;C=
D.next())C=C.value,C.distinctiveIdentifierRequired&&(x.distinctiveIdentifierRequired=C.distinctiveIdentifierRequired),C.persistentStateRequired&&(x.persistentStateRequired=C.persistentStateRequired);D=x}else D=f.keySystem,x=b.get(f.keySystem),C=[],B=[],F=[],G=[],I=new Set,ag(x.drmInfos,C,F,B,G,I),D={keySystem:D,licenseServerUri:C[0],distinctiveIdentifierRequired:"required"==x.distinctiveIdentifier,persistentStateRequired:"required"==x.persistentState,sessionType:x.sessionTypes[0]||"temporary",audioRobustness:(x.audioCapabilities?
x.audioCapabilities[0].robustness:"")||"",videoRobustness:(x.videoCapabilities?x.videoCapabilities[0].robustness:"")||"",serverCertificate:F[0],serverCertificateUri:B[0],initData:G,keyIds:I};a.i=D;if(!a.i.licenseServerUri)throw new P(2,6,6012,a.i.keySystem);return z(y,f.createMediaKeys(),6);case 6:return v=y.h,qf(a.N),a.s=v,a.ea=!0,z(y,Tf(a),7);case 7:qf(a.N);wa(y,0);break;case 4:w=H(y);qf(a.N,w);a.i=null;a.G.clear();if(w instanceof P)throw w;throw new P(2,6,6002,w.message);}})}
function Zf(a,b,c){for(var d=r(b),e=d.next();!e.done;e=d.next()){var f=r(Of(e.value));for(e=f.next();!e.done;e=f.next())e=e.value,c.has(e.keySystem)||c.set(e.keySystem,[]),c.get(e.keySystem).push(e)}if(1==c.size&&c.has(""))throw new P(2,6,6E3);d={};a=r(a.m.preferredKeySystems);for(e=a.next();!e.done;d={Pd:d.Pd},e=a.next())for(d.Pd=e.value,f=r(b),e=f.next();!e.done;e=f.next())if(e=e.value.decodingInfos.find(function(l){return function(m){return m.supported&&null!=m.keySystemAccess&&m.keySystemAccess.keySystem==
l.Pd}}(d)))return e.keySystemAccess;a=r([!0,!1]);for(e=a.next();!e.done;e=a.next())for(d=e.value,f=r(b),e=f.next();!e.done;e=f.next()){var g=r(e.value.decodingInfos);for(e=g.next();!e.done;e=g.next()){var h=e.value;if(h.supported&&h.keySystemAccess){e=c.get(h.keySystemAccess.keySystem);var k=r(e);for(e=k.next();!e.done;e=k.next())if(!!e.value.licenseServerUri==d)return h.keySystemAccess}}}return null}
function $f(a,b){var c,d,e,f,g,h,k,l,m,n,p,t,v,w,y;return L(function(x){switch(x.g){case 1:if(1==b.size&&b.has(""))throw new P(2,6,6E3);d=r(b.values());for(e=d.next();!e.done;e=d.next())f=e.value,0==f.audioCapabilities.length&&delete f.audioCapabilities,0==f.videoCapabilities.length&&delete f.videoCapabilities;g=r(a.m.preferredKeySystems);h=g.next();case 2:if(h.done){x.D(4);break}k=h.value;if(!b.has(k)){x.D(3);break}l=b.get(k);E(x,6);return z(x,navigator.requestMediaKeySystemAccess(k,[l]),8);case 8:return c=
x.h,x["return"](c);case 6:H(x);case 7:qf(a.N);case 3:h=g.next();x.D(2);break;case 4:m=r([!0,!1]),n=m.next();case 9:if(n.done){x.D(11);break}p=n.value;t=r(b.keys());h=t.next();case 12:if(h.done){n=m.next();x.D(9);break}v=h.value;w=b.get(v);y=w.drmInfos.some(function(D){return!!D.licenseServerUri});if(y!=p){x.D(13);break}E(x,15);return z(x,navigator.requestMediaKeySystemAccess(v,[w]),17);case 17:return c=x.h,x["return"](c);case 15:H(x);case 16:qf(a.N);case 13:h=t.next();x.D(12);break;case 11:return x["return"](c)}})}
function Mf(a){a=zf(a.m.clearKeys);if(0==a.size)return null;var b=[],c=[];a.forEach(function(e,f){var g=id(f),h=id(e);g={kty:"oct",kid:gd(g,!1),k:gd(h,!1)};b.push(g);c.push(g.kid)});a=JSON.stringify({keys:b});var d=JSON.stringify({kids:c});d=[{initData:Oc(cd(d)),initDataType:"keyids"}];return{keySystem:"org.w3.clearkey",licenseServerUri:"data:application/json;base64,"+window.btoa(a),distinctiveIdentifierRequired:!1,persistentStateRequired:!1,audioRobustness:"",videoRobustness:"",serverCertificate:null,
serverCertificateUri:"",sessionType:"",initData:d,keyIds:new Set(c)}}
function Vf(a,b){var c,d,e,f,g;return L(function(h){switch(h.g){case 1:try{c=a.s.createSession("persistent-license")}catch(k){return d=new P(2,6,6005,k.message),a.l(d),h["return"](Promise.reject(d))}a.h.o(c,"message",function(k){a.g&&a.m.delayLicenseRequestUntilPlayed&&a.g.paused&&!a.M?a.J.push(k):Qf(a,k)});a.h.o(c,"keystatuseschange",function(k){return bg(a,k)});e={initData:null,loaded:!1,pe:Infinity,jb:null,type:"persistent-license"};a.j.set(c,e);E(h,2);return z(h,c.load(b),4);case 4:f=h.h;qf(a.N);
if(!f)return a.j["delete"](c),a.l(new P(2,6,6013)),h["return"](Promise.resolve());e.loaded=!0;cg(a)&&a.B.resolve();return h["return"](c);case 2:g=H(h),qf(a.N,g),a.j["delete"](c),a.l(new P(2,6,6005,g.message));case 3:return h["return"](Promise.resolve())}})}
function Wf(a,b,c,d){try{var e=a.s.createSession(d)}catch(f){a.l(new P(2,6,6005,f.message));return}a.h.o(e,"message",function(f){a.g&&a.m.delayLicenseRequestUntilPlayed&&a.g.paused&&!a.M?a.J.push(f):Qf(a,f)});a.h.o(e,"keystatuseschange",function(f){return bg(a,f)});a.j.set(e,{initData:c,loaded:!1,pe:Infinity,jb:null,type:d});try{c=a.m.initDataTransform(c,b,a.i)}catch(f){b=f;f instanceof P||(b=new P(2,6,6016,f));a.l(b);return}a.m.logLicenseExchange&&gd(c);e.generateRequest(b,c)["catch"](function(f){if(!a.N.g){a.j["delete"](e);
var g=f.errorCode;if(g&&g.systemCode){var h=g.systemCode;0>h&&(h+=Math.pow(2,32));h="0x"+h.toString(16)}a.l(new P(2,6,6006,f.message,f,h))}})}function dg(a,b,c){"skd"==b&&(b=c.serverCertificate,c=xf(a),a=yf(a,c,b));return a}
function Qf(a,b){var c,d,e,f,g,h,k,l,m,n,p,t,v,w;L(function(y){switch(y.g){case 1:return c=b.target,a.m.logLicenseExchange&&gd(b.message),d=a.j.get(c),e=a.i.licenseServerUri,f=a.m.advanced[a.i.keySystem],"individualization-request"==b.messageType&&f&&f.individualizationServer&&(e=f.individualizationServer),g=hf([e],a.m.retryParameters),g.body=b.message,g.method="POST",g.licenseRequestType=b.messageType,g.sessionId=c.sessionId,Xf(a.i.keySystem)&&eg(g),h=Date.now(),E(y,2),l=a.F.Wb.request(2,g),z(y,
l.promise,4);case 4:k=y.h;wa(y,3);break;case 2:return m=H(y),n=new P(2,6,6007,m),a.l(n),d&&d.jb&&d.jb.reject(n),y["return"]();case 3:if(a.N.g)return y["return"]();a.I+=(Date.now()-h)/1E3;a.m.logLicenseExchange&&gd(k.data);E(y,5);return z(y,c.update(k.data),7);case 7:wa(y,6);break;case 5:return p=H(y),t=new P(2,6,6008,p.message),a.l(t),d&&d.jb&&d.jb.reject(t),y["return"]();case 6:v=new O("drmsessionupdate"),a.F.onEvent(v),d&&(d.jb&&d.jb.resolve(),w=new Q(function(){d.loaded=!0;cg(a)&&a.B.resolve()}),
w.U(fg)),A(y)}})}function eg(a){var b=$c(a.body,!0,!0);if(b.includes("PlayReadyKeyMessage")){b=(new DOMParser).parseFromString(b,"application/xml");for(var c=r(b.getElementsByTagName("HttpHeader")),d=c.next();!d.done;d=c.next())d=d.value,a.headers[d.getElementsByTagName("name")[0].textContent]=d.getElementsByTagName("value")[0].textContent;a.body=hd(b.getElementsByTagName("Challenge")[0].textContent)}else a.headers["Content-Type"]="text/xml; charset=utf-8"}
function bg(a,b){var c=b.target,d=a.j.get(c),e=!1;c.keyStatuses.forEach(function(g,h){if("string"==typeof h){var k=h;h=g;g=k}if(Xf(a.i.keySystem)&&16==h.byteLength&&navigator.userAgent.match(/Edge?\//)){k=Rc(h);var l=k.getUint32(0,!0),m=k.getUint16(4,!0),n=k.getUint16(6,!0);k.setUint32(0,l,!1);k.setUint16(4,m,!1);k.setUint16(6,n,!1)}"status-pending"!=g&&(d.loaded=!0);"expired"==g&&(e=!0);k=jd(h);a.ka.set(k,g)});var f=c.expiration-Date.now();(0>f||e&&1E3>f)&&d&&!d.jb&&(a.j["delete"](c),c.close()["catch"](function(){}));
cg(a)&&(a.B.resolve(),a.P.U(gg))}function Df(a){var b=a.ka,c=a.$;c.clear();b.forEach(function(d,e){return c.set(e,d)});b=Array.from(c.values());b.length&&b.every(function(d){return"expired"==d})&&a.l(new P(2,6,6014));a.F.wd(Af(c))}
function ig(){var a,b,c,d,e,f,g,h;return L(function(k){return 1==k.g?(a="org.w3.clearkey com.widevine.alpha com.microsoft.playready com.microsoft.playready.recommendation com.apple.fps.3_0 com.apple.fps.2_0 com.apple.fps.1_0 com.apple.fps com.adobe.primetime".split(" "),b=[{contentType:'video/mp4; codecs="avc1.42E01E"'},{contentType:'video/webm; codecs="vp8"'}],c={initDataTypes:["cenc"],videoCapabilities:b},d={videoCapabilities:b,persistentState:"required",sessionTypes:["persistent-license"]},e=[d,
c],f=new Map,g=function(l){var m,n,p;return L(function(t){switch(t.g){case 1:return E(t,2),z(t,navigator.requestMediaKeySystemAccess(l,e),4);case 4:return m=t.h,p=(n=m.getConfiguration().sessionTypes)?n.includes("persistent-license"):!1,Id("Tizen 3")&&(p=!1),f.set(l,{persistentState:p}),z(t,m.createMediaKeys(),5);case 5:wa(t,0);break;case 2:H(t),f.set(l,null),A(t)}})},h=a.map(function(l){return g(l)}),z(k,Promise.all(h),2)):k["return"](Af(f))})}
function jg(a){var b;return L(function(c){if(1==c.g)return b=new Promise(function(d,e){(new Q(e)).U(kg)}),E(c,2),z(c,Promise.race([Promise.all([a.close(),a.closed]),b]),4);if(2!=c.g)return wa(c,0);H(c);A(c)})}
function Gf(a){var b;return L(function(c){b=Array.from(a.j.entries());a.j.clear();return z(c,Promise.all(b.map(function(d){d=r(d);var e=d.next().value,f=d.next().value;return L(function(g){if(1==g.g)return E(g,2),a.ia||a.C.includes(e.sessionId)||"persistent-license"!==f.type?z(g,jg(e),5):z(g,e.remove(),5);if(2!=g.g)return wa(g,0);H(g);A(g)})})),0)})}
function lg(a,b){if(!a.length)return b;if(!b.length)return a;for(var c=[],d=r(a),e=d.next();!e.done;e=d.next()){e=e.value;for(var f={},g=r(b),h=g.next();!h.done;f={Za:f.Za},h=g.next())if(h=h.value,e.keySystem==h.keySystem){f.Za=[];f.Za=f.Za.concat(e.initData||[]);f.Za=f.Za.concat(h.initData||[]);f.Za=f.Za.filter(function(k){return function(l,m){return void 0===l.keyId||m===k.Za.findIndex(function(n){return n.keyId===l.keyId})}}(f));g=e.keyIds&&h.keyIds?new Set([].concat(ja(e.keyIds),ja(h.keyIds))):
e.keyIds||h.keyIds;c.push({keySystem:e.keySystem,licenseServerUri:e.licenseServerUri||h.licenseServerUri,distinctiveIdentifierRequired:e.distinctiveIdentifierRequired||h.distinctiveIdentifierRequired,persistentStateRequired:e.persistentStateRequired||h.persistentStateRequired,videoRobustness:e.videoRobustness||h.videoRobustness,audioRobustness:e.audioRobustness||h.audioRobustness,serverCertificate:e.serverCertificate||h.serverCertificate,serverCertificateUri:e.serverCertificateUri||h.serverCertificateUri,
initData:f.Za,keyIds:g});break}}return c}function Of(a){return(a.video?a.video.drmInfos:[]).concat(a.audio?a.audio.drmInfos:[])}function Ef(a){a.j.forEach(function(b,c){var d=b.pe,e=c.expiration;isNaN(e)&&(e=Infinity);e!=d&&(a.F.onExpirationUpdated(c.sessionId,e),b.pe=e)})}function cg(a){a=a.j.values();return gb(a,function(b){return b.loaded})}
function Nf(a,b){var c=[];b.forEach(function(f,g){c.push({keySystem:g,licenseServerUri:f,distinctiveIdentifierRequired:!1,persistentStateRequired:!1,audioRobustness:"",videoRobustness:"",serverCertificate:null,serverCertificateUri:"",initData:[],keyIds:new Set})});for(var d=r(a),e=d.next();!e.done;e=d.next())e=e.value,e.video&&(e.video.drmInfos=c),e.audio&&(e.audio.drmInfos=c)}
function ag(a,b,c,d,e,f){var g={};a=r(a);for(var h=a.next();!h.done;g={La:g.La},h=a.next()){g.La=h.value;b.includes(g.La.licenseServerUri)||b.push(g.La.licenseServerUri);d.includes(g.La.serverCertificateUri)||d.push(g.La.serverCertificateUri);g.La.serverCertificate&&(c.some(function(m){return function(n){return Mc(n,m.La.serverCertificate)}}(g))||c.push(g.La.serverCertificate));if(g.La.initData){h={};for(var k=r(g.La.initData),l=k.next();!l.done;h={dd:h.dd},l=k.next())h.dd=l.value,e.some(function(m){return function(n){var p=
m.dd;return n.keyId&&n.keyId==p.keyId?!0:n.initDataType==p.initDataType&&Mc(n.initData,p.initData)}}(h))||e.push(h.dd)}if(g.La.keyIds)for(h=r(g.La.keyIds),k=h.next();!k.done;k=h.next())f.add(k.value)}}
function Pf(a,b,c){if(a.keySystem&&("org.w3.clearkey"!=a.keySystem||!a.licenseServerUri)){b.size&&(b=b.get(a.keySystem)||"",a.licenseServerUri=b);a.keyIds||(a.keyIds=new Set);if(c=c.get(a.keySystem))a.distinctiveIdentifierRequired||(a.distinctiveIdentifierRequired=c.distinctiveIdentifierRequired),a.persistentStateRequired||(a.persistentStateRequired=c.persistentStateRequired),a.videoRobustness||(a.videoRobustness=c.videoRobustness),a.audioRobustness||(a.audioRobustness=c.audioRobustness),a.serverCertificate||
(a.serverCertificate=c.serverCertificate),c.sessionType&&(a.sessionType=c.sessionType),a.serverCertificateUri||(a.serverCertificateUri=c.serverCertificateUri);window.cast&&window.cast.__platform__&&"com.microsoft.playready"==a.keySystem&&(a.keySystem="com.chromecast.playready")}}var kg=1,fg=5,gg=.5,mg=new Xc(function(){return Pc(new Uint8Array([0]))});function ng(){}function og(a,b,c,d){var e,f,g,h;return L(function(k){if(1==k.g){if(d&&(e=pg[d.toLowerCase()]))return k["return"](e);if(f=qg(a))if(g=rg[f])return k["return"](g);return d?k.D(2):z(k,sg(a,b,c),3)}if(2!=k.g&&(d=k.h)&&(h=pg[d]))return k["return"](h);throw new P(2,4,4E3,a);})}
function sg(a,b,c){var d,e,f;return L(function(g){if(1==g.g)return d=hf([a],c),d.method="HEAD",z(g,b.request(0,d).promise,2);e=g.h;f=e.headers["content-type"];return g["return"](f?f.toLowerCase().split(";").shift():"")})}function qg(a){a=(new qb(a)).Sa.split("/").pop().split(".");return 1==a.length?"":a.pop().toLowerCase()}N("shaka.media.ManifestParser",ng);ng.unregisterParserByMime=function(a){delete pg[a]};ng.registerParserByMime=function(a,b){pg[a]=b};
ng.registerParserByExtension=function(a,b){rg[a]=b};var pg={},rg={};function tg(a,b){this.X=Rc(a);this.h=b==ug;this.g=0}q=tg.prototype;q.Ia=function(){return this.g<this.X.byteLength};q.qa=function(){return this.g};q.og=function(){return this.X.byteLength};q.ra=function(){try{var a=this.X.getUint8(this.g);this.g+=1;return a}catch(b){throw vg();}};q.wc=function(){try{var a=this.X.getUint16(this.g,this.h);this.g+=2;return a}catch(b){throw vg();}};q.T=function(){try{var a=this.X.getUint32(this.g,this.h);this.g+=4;return a}catch(b){throw vg();}};
q.wf=function(){try{var a=this.X.getInt32(this.g,this.h);this.g+=4;return a}catch(b){throw vg();}};q.xc=function(){try{if(this.h){var a=this.X.getUint32(this.g,!0);var b=this.X.getUint32(this.g+4,!0)}else b=this.X.getUint32(this.g,!1),a=this.X.getUint32(this.g+4,!1)}catch(c){throw vg();}if(2097151<b)throw new P(2,3,3001);this.g+=8;return b*Math.pow(2,32)+a};q.Lb=function(a){if(this.g+a>this.X.byteLength)throw vg();var b=Oc(this.X,this.g,a);this.g+=a;return b};
q.skip=function(a){if(this.g+a>this.X.byteLength)throw vg();this.g+=a};q.yf=function(a){if(this.g<a)throw vg();this.g-=a};q.seek=function(a){if(0>a||a>this.X.byteLength)throw vg();this.g=a};q.Wc=function(){for(var a=this.g;this.Ia()&&0!=this.X.getUint8(this.g);)this.g+=1;a=Oc(this.X,a,this.g-a);this.g+=1;return Zc(a)};function vg(){return new P(2,3,3E3)}N("shaka.util.DataViewReader",tg);tg.prototype.readTerminatedString=tg.prototype.Wc;tg.prototype.seek=tg.prototype.seek;tg.prototype.rewind=tg.prototype.yf;
tg.prototype.skip=tg.prototype.skip;tg.prototype.readBytes=tg.prototype.Lb;tg.prototype.readUint64=tg.prototype.xc;tg.prototype.readInt32=tg.prototype.wf;tg.prototype.readUint32=tg.prototype.T;tg.prototype.readUint16=tg.prototype.wc;tg.prototype.readUint8=tg.prototype.ra;tg.prototype.getLength=tg.prototype.og;tg.prototype.getPosition=tg.prototype.qa;tg.prototype.hasMoreData=tg.prototype.Ia;var ug=1;tg.Endianness={BIG_ENDIAN:0,LITTLE_ENDIAN:ug};function wg(){this.i=[];this.h=[];this.g=!1}q=wg.prototype;q.box=function(a,b){var c=xg(a);this.i[c]=yg;this.h[c]=b;return this};q.Z=function(a,b){var c=xg(a);this.i[c]=zg;this.h[c]=b;return this};q.stop=function(){this.g=!0};q.parse=function(a,b,c){a=new tg(a,0);for(this.g=!1;a.Ia()&&!this.g;)this.yd(0,a,b,c)};
q.yd=function(a,b,c,d){var e=b.qa();if(d&&e+8>b.X.byteLength)this.g=!0;else{var f=b.T(),g=b.T(),h=!1;switch(f){case 0:f=b.X.byteLength-e;break;case 1:if(d&&b.qa()+8>b.X.byteLength){this.g=!0;return}f=b.xc();h=!0}var k=this.h[g];if(k){var l=null,m=null;if(this.i[g]==zg){if(d&&b.qa()+4>b.X.byteLength){this.g=!0;return}m=b.T();l=m>>>24;m&=16777215}g=e+f;c&&g>b.X.byteLength&&(g=b.X.byteLength);d&&g>b.X.byteLength?this.g=!0:(d=g-b.qa(),b=0<d?b.Lb(d):new Uint8Array(0),b=new tg(b,0),k({parser:this,partialOkay:c||
!1,version:l,flags:m,reader:b,size:f,start:e+a,has64BitSize:h}))}else b.skip(Math.min(e+f-b.qa(),b.X.byteLength-b.qa()))}};function Ag(a){for(var b=Bg(a);a.reader.Ia()&&!a.parser.g;)a.parser.yd(a.start+b,a.reader,a.partialOkay)}function Cg(a){var b=Bg(a),c=a.reader.T();c=r(lb(c));for(var d=c.next();!d.done&&(a.parser.yd(a.start+b,a.reader,a.partialOkay),!a.parser.g);d=c.next());}function Dg(a){return function(b){a(b.reader.Lb(b.reader.X.byteLength-b.reader.qa()))}}
function xg(a){var b=0;a=r(a);for(var c=a.next();!c.done;c=a.next())b=b<<8|c.value.charCodeAt(0);return b}function Eg(a){return String.fromCharCode(a>>24&255,a>>16&255,a>>8&255,a&255)}function Bg(a){return 8+(a.has64BitSize?8:0)+(null!=a.flags?4:0)}N("shaka.util.Mp4Parser",wg);wg.headerSize=Bg;wg.typeToString=Eg;wg.allData=Dg;wg.sampleDescription=Cg;wg.children=Ag;wg.prototype.parseNext=wg.prototype.yd;wg.prototype.parse=wg.prototype.parse;wg.prototype.stop=wg.prototype.stop;
wg.prototype.fullBox=wg.prototype.Z;wg.prototype.box=wg.prototype.box;var yg=0,zg=1;function Fg(a){function b(){d=!0}function c(l){f.push(l);Ag(l)}a=Oc(a);var d=!1,e,f=[],g=[];(new wg).box("moov",c).box("trak",c).box("mdia",c).box("minf",c).box("stbl",c).Z("stsd",function(l){e=l;f.push(l);Cg(l)}).Z("encv",b).Z("enca",b).Z("avc1",function(l){g.push({box:l,Sc:1701733238})}).Z("avc3",function(l){g.push({box:l,Sc:1701733238})}).Z("ac-3",function(l){g.push({box:l,Sc:1701733217})}).Z("ec-3",function(l){g.push({box:l,Sc:1701733217})}).Z("mp4a",function(l){g.push({box:l,Sc:1701733217})}).parse(a);
if(d)return a;if(0==g.length||!e)throw Za(jd(a)),new P(2,3,3019);g.reverse();for(var h=r(g),k=h.next();!k.done;k=h.next())k=k.value,a=Gg(a,e,k.box,f,k.Sc);return a}
function Gg(a,b,c,d,e){var f=Hg.value(),g=a.subarray(c.start,c.start+c.size),h=Rc(g),k=new Uint8Array(c.size+f.byteLength);k.set(g,0);g=Rc(k);g.setUint32(4,e);k.set(f,c.size);e=h.getUint32(4);g.setUint32(c.size+16,e);Ig(k,0,k.byteLength);e=new Uint8Array(a.byteLength+k.byteLength);c=Id("Xbox One")?c.start:c.start+c.size;f=a.subarray(c);e.set(a.subarray(0,c));e.set(k,c);e.set(f,c+k.byteLength);a=r(d);for(d=a.next();!d.done;d=a.next())d=d.value,Ig(e,d.start,d.size+k.byteLength);k=Rc(e,b.start);b=Bg(b);
a=k.getUint32(b);k.setUint32(b,a+1);return e}function Ig(a,b,c){a=Rc(a,b);b=a.getUint32(0);0!=b&&(1==b?(a.setUint32(8,c>>32),a.setUint32(12,c&4294967295)):a.setUint32(0,c))}var Hg=new Xc(function(){return new Uint8Array([0,0,0,80,115,105,110,102,0,0,0,12,102,114,109,97,0,0,0,0,0,0,0,20,115,99,104,109,0,0,0,0,99,101,110,99,0,1,0,0,0,0,0,40,115,99,104,105,0,0,0,32,116,101,110,99,0,0,0,0,0,0,1,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])});function Jg(a,b,c,d,e){if(d>=e)return null;for(var f=-1,g=-1,h=0;h<c.length;h++)if(c[h].some(function(B){return null!=B&&""!=B.g.trim()})){f=h;break}for(h=c.length-1;0<=h;h--)if(c[h].some(function(B){return null!=B&&""!=B.g.trim()})){g=h;break}if(-1===f||-1===g)return null;for(var k=h=!1,l="white",m="black",n=Kg(d,e,h,k,l,m);f<=g;f++){for(var p=c[f],t=-1,v=-1,w=0;w<p.length;w++)if(null!=p[w]&&""!==p[w].g.trim()){t=w;break}for(w=p.length-1;0<=w;w--)if(null!=p[w]&&""!==p[w].g.trim()){v=w;break}if(-1===
t||-1===v)p=Lg(d,e),a.nestedCues.push(p);else{for(;t<=v;t++)if(w=p[t]){var y=w.l,x=w.i,D=w.j,C=w.h;if(y!=h||x!=k||D!=l||C!=m)n.payload&&a.nestedCues.push(n),n=Kg(d,e,y,x,D,C),h=y,k=x,l=D,m=C;n.payload+=w.g}else n.payload+=" ";n.payload&&a.nestedCues.push(n);f!==g&&(n=Lg(d,e),a.nestedCues.push(n));n=Kg(d,e,h,k,l,m)}}return a.nestedCues.length?{cue:a,stream:b}:null}
function Kg(a,b,c,d,e,f){a=new rc(a,b,"");c&&a.textDecoration.push("underline");d&&(a.fontStyle="italic");a.color=e;a.backgroundColor=f;return a}function Lg(a,b){var c=new rc(a,b,"");c.lineBreak=!0;return c}function Mg(a,b,c,d,e){this.g=a;this.l=b;this.i=c;this.h=d;this.j=e};function Ng(a,b){this.i=[];this.g=1;this.h=0;this.G=a;this.C=b;this.j=this.s=!1;this.l="white";this.B="black";Og(this)}function Pg(a,b,c){return Jg(new rc(b,c,""),"CC"+(a.G<<1|a.C+1),a.i,b,c)}function Og(a){Qg(a,0,15);a.g=1}function Rg(a,b,c){if(!(32>c||127<c)){var d="";switch(b){case Sg:d=Tg.has(c)?Tg.get(c):String.fromCharCode(c);break;case Ug:d=Vg.get(c);break;case Wg:a.i[a.g].pop();d=Xg.get(c);break;case Yg:a.i[a.g].pop(),d=Zg.get(c)}d&&a.i[a.g].push(new Mg(d,a.s,a.j,a.B,a.l))}}
function $g(a,b,c,d){if(b>=c)for(--d;0<=d;d--)a.i[b+d]=a.i[c+d].map(function(f){return f});else for(var e=0;e<d;e++)a.i[b+e]=a.i[c+e].map(function(f){return f})}function Qg(a,b,c){for(var d=0;d<=c;d++)a.i[b+d]=[]}
var Sg=0,Ug=1,Wg=2,Yg=3,Tg=new Map([[39,"\u2019"],[42,"\u00e1"],[92,"\u00e9"],[92,"\u00e9"],[94,"\u00ed"],[95,"\u00f3"],[96,"\u00fa"],[123,"\u00e7"],[124,"\u00f7"],[125,"\u00d1"],[126,"\u00f1"],[127,"\u2588"]]),Vg=new Map([[48,"\u00ae"],[49,"\u00b0"],[50,"\u00bd"],[51,"\u00bf"],[52,"\u2122"],[53,"\u00a2"],[54,"\u00a3"],[55,"\u266a"],[56,"\u00e0"],[57,"\u2800"],[58,"\u00e8"],[59,"\u00e2"],[60,"\u00ea"],[61,"\u00ee"],[62,"\u00f4"],[63,"\u00fb"]]),Xg=new Map([[32,"\u00c1"],[33,"\u00c9"],[34,"\u00d3"],
[35,"\u00da"],[36,"\u00dc"],[37,"\u00fc"],[38,"\u2018"],[39,"\u00a1"],[40,"*"],[41,"'"],[42,"\u2500"],[43,"\u00a9"],[44,"\u2120"],[45,"\u00b7"],[46,"\u201c"],[47,"\u201d"],[48,"\u00c0"],[49,"\u00c2"],[50,"\u00c7"],[51,"\u00c8"],[52,"\u00ca"],[53,"\u00cb"],[54,"\u00eb"],[55,"\u00ce"],[56,"\u00cf"],[57,"\u00ef"],[58,"\u00d4"],[59,"\u00d9"],[60,"\u00f9"],[61,"\u00db"],[62,"\u00ab"],[63,"\u00bb"]]),Zg=new Map([[32,"\u00c3"],[33,"\u00e3"],[34,"\u00cd"],[35,"\u00cc"],[36,"\u00ec"],[37,"\u00d2"],[38,"\u00f2"],
[39,"\u00d5"],[40,"\u00f5"],[41,"{"],[42,"}"],[43,"\\"],[44,"^"],[45,"_"],[46,"|"],[47,"~"],[48,"\u00c4"],[49,"\u00e4"],[50,"\u00d6"],[51,"\u00f6"],[52,"\u00df"],[53,"\u00a5"],[54,"\u00a4"],[55,"\u2502"],[56,"\u00c5"],[57,"\u00e5"],[58,"\u00d8"],[59,"\u00f8"],[60,"\u250c"],[61,"\u2510"],[62,"\u2514"],[63,"\u2518"]]);function ah(a,b){this.h=bh;this.B=new Ng(a,b);this.i=new Ng(a,b);this.l=new Ng(a,b);this.g=this.i;this.j=0;this.s=null}function ch(a,b,c){a.g=a.i;var d=a.g,e=null;a.h!==dh&&a.h!==eh&&(e=Pg(d,a.j,c),c=a.i,c.g=0<c.h?c.h:0,Qg(c,0,15),c=a.l,c.g=0<c.h?c.h:0,Qg(c,0,15),d.g=15);a.h=dh;d.h=b;return e}function fh(a){a.h=gh;a.g=a.l;a.g.h=0}function hh(a){Ua("Cea608DataChannel","CEA-608 text mode entered, but is unsupported");a.g=a.B;a.h=eh}
var bh=0,gh=1,dh=3,eh=4,ih="black green blue cyan red yellow magenta black".split(" "),jh="white green blue cyan red yellow magenta white_italics".split(" ");function kh(){this.l=!1;this.I=this.L=0;this.J=lh;this.i=[];this.g=this.h=this.j=0;this.G=this.B=!1;this.C="white";this.s="black";mh(this)}function mh(a){a.i=[];for(var b=0;15>b;b++)a.i.push(nh())}function nh(){for(var a=[],b=0;42>b;b++)a.push(null);return a}function oh(a,b){ph(a)&&(a.i[a.h][a.g]=new Mg(b,a.G,a.B,a.s,a.C),a.g++)}function ph(a){var b=a.g<a.I&&0<=a.g;return a.h<a.L&&0<=a.h&&b}kh.prototype.isVisible=function(){return this.l};
function qh(a,b,c){var d=new rc(a.j,b,"");d.textAlign=a.J===rh?"left":a.J===sh?"right":vc;if(c=Jg(d,"svc"+c,a.i,a.j,b))a.j=b;return c}var rh=0,sh=1,lh=2;function th(){this.i=[];this.h=null;this.g=0}function uh(a,b){3===b.type?(a.g=2*(b.value&63)-1,a.h=[]):a.h&&(0<a.g&&(a.h.push(b),a.g--),0===a.g&&(a.i.push(new vh(a.h)),a.h=null,a.g=0))}function vh(a){this.g=0;this.h=a}vh.prototype.Ia=function(){return this.g<this.h.length};vh.prototype.qa=function(){return this.g};function wh(a){if(!a.Ia())throw new P(2,2,3E3);return a.h[a.g++]}vh.prototype.skip=function(a){if(this.g+a>this.h.length)throw new P(2,2,3E3);this.g+=a};function xh(a){this.i=a;this.h=[null,null,null,null,null,null,null,null];this.g=null}
function yh(a,b,c,d){if(128<=c&&135>=c)d=c&7,a.h[d]&&(a.g=a.h[d]);else{if(136===c){c=wh(b).value;b=null;c=r(zh(a,c));for(var e=c.next();!e.done;e=c.next())e=a.h[e.value],e.isVisible()&&(b=qh(e,d,a.i)),mh(e);return b}if(137===c)for(b=wh(b).value,b=r(zh(a,b)),c=b.next();!c.done;c=b.next())c=a.h[c.value],c.isVisible()||(c.j=d),c.l=!0;else{if(138===c){c=wh(b).value;b=null;c=r(zh(a,c));for(e=c.next();!e.done;e=c.next())e=a.h[e.value],e.isVisible()&&(b=qh(e,d,a.i)),e.l=!1;return b}if(139===c){c=wh(b).value;
b=null;c=r(zh(a,c));for(e=c.next();!e.done;e=c.next())e=a.h[e.value],e.isVisible()?b=qh(e,d,a.i):e.j=d,e.l=!e.l;return b}if(140===c)return b=wh(b).value,Ah(a,b,d);if(143===c)return d=Ah(a,255,d),Bh(a),d;if(144===c)b.skip(1),d=wh(b).value,a.g&&(a.g.B=0<(d&128),a.g.G=0<(d&64));else if(145===c)d=wh(b).value,c=wh(b).value,b.skip(1),a.g&&(b=Ch((c&48)>>4,(c&12)>>2,c&3),a.g.C=Ch((d&48)>>4,(d&12)>>2,d&3),a.g.s=b);else if(146===c)d=wh(b).value,b=wh(b).value,a.g&&(a=a.g,a.h=d&15,a.g=b&63);else if(151===c)b.skip(1),
b.skip(1),d=wh(b).value,b.skip(1),a.g&&(a.g.J=d&3);else if(152<=c&&159>=c){c=(c&15)-8;e=null!==a.h[c];if(!e){var f=new kh;f.j=d;a.h[c]=f}d=wh(b).value;wh(b);wh(b);f=wh(b).value;var g=wh(b).value;b=wh(b).value;e&&0===(b&7)||(b=a.h[c],b.h=0,b.g=0,b.G=!1,b.B=!1,b.C="white",b.s="black");b=a.h[c];b.l=0<(d&32);b.L=(f&15)+1;b.I=(g&63)+1;a.g=a.h[c]}}}return null}
var zh=function Dh(a,b){var d,e;return Fa(Dh,function(f){1==f.g&&(d=0);if(5!=f.g)return 8>d?(e=1===(b&1))&&a.h[d]?z(f,d,5):f.D(5):f.D(0);b>>=1;d++;return f.D(2)})};function Ah(a,b,c){var d=null;b=r(zh(a,b));for(var e=b.next();!e.done;e=b.next()){e=e.value;var f=a.h[e];f.isVisible()&&(d=qh(f,c,a.i));a.h[e]=null}return d}function Bh(a){a.g=null;a.h=[null,null,null,null,null,null,null,null]}function Ch(a,b,c){var d={0:0,1:0,2:1,3:1};a=d[a];b=d[b];c=d[c];return Eh[a<<2|b<<1|c]}
var Fh=new Map([[32," "],[33,"\u00a0"],[37,"\u2026"],[42,"\u0160"],[44,"\u0152"],[48,"\u2588"],[49,"\u2018"],[50,"\u2019"],[51,"\u201c"],[52,"\u201d"],[53,"\u2022"],[57,"\u2122"],[58,"\u0161"],[60,"\u0153"],[61,"\u2120"],[63,"\u0178"],[118,"\u215b"],[119,"\u215c"],[120,"\u215d"],[121,"\u215e"],[122,"\u2502"],[123,"\u2510"],[124,"\u2514"],[125,"\u2500"],[126,"\u2518"],[127,"\u250c"]]),Eh="black blue green cyan red magenta yellow white".split(" ");function Gh(){this.h=[];this.g=[];this.i=new th;this.l=0;this.C=new Map([["CC1",new ah(0,0)],["CC2",new ah(0,1)],["CC3",new ah(1,0)],["CC4",new ah(1,1)]]);this.B=this.s=0;this.j=new Map;Hh(this)}function Hh(a){a.s=0;a.B=0;a=r(a.C.values());for(var b=a.next();!b.done;b=a.next())b=b.value,b.h=2,b.g=b.i,b.s=null,Og(b.i),Og(b.l),Og(b.B)}
function Ih(a){function b(f,g){return f.pts-g.pts||f.order-g.order}var c=[];a.h.sort(b);a.g.sort(b);for(var d=r(a.h),e=d.next();!e.done;e=d.next())(e=Jh(a,e.value))&&c.push(e);d=r(a.g);for(e=d.next();!e.done;e=d.next())uh(a.i,e.value);d=r(a.i.i);for(e=d.next();!e.done;e=d.next())e=Kh(a,e.value),c.push.apply(c,ja(e));a.i.i=[];a.h=[];a.g=[];return c}
function Jh(a,b){var c=b.type;if(16===(b.Wa&112)){var d=b.Wa>>3&1;0===c?a.s=d:a.B=d}c=a.C.get("CC"+(c<<1|(c?a.B:a.s)+1));if(255===b.Wa&&255===b.rb||!b.Wa&&!b.rb||!Lh(b.Wa)||!Lh(b.rb))return 45<=++a.l&&Hh(a),null;a.l=0;b.Wa&=127;b.rb&=127;if(!b.Wa&&!b.rb)return null;d=null;if(16===(b.Wa&112))a:{var e=b.Wa;d=b.rb;if(c.s===(e<<8|d))c.s=null;else if(c.s=e<<8|d,16===(e&240)&&64===(d&192)){e=[11,11,1,2,3,4,12,13,14,15,5,6,7,8,9,10][(e&7)<<1|d>>5&1];var f=(d&30)>>1,g="white",h=!1;7>f?g=jh[f]:7===f&&(h=!0);
d=1===(d&1);if(c.h!==eh){f=c.g;if(c.h===dh&&e!==f.g){var k=1+e-f.h;$g(f,k,1+f.g-f.h,f.h);Qg(f,0,k-1);Qg(f,e+1,15-e)}f.g=e;c.g.s=d;c.g.j=h;c.g.l=g;c.g.B="black"}}else if(17===(e&247)&&32===(d&240))c.g.s=!1,c.g.j=!1,c.g.l="white",Rg(c.g,Sg,32),g=!1,e=jh[(d&14)>>1],"white_italics"===e&&(e="white",g=!0),c.g.s=1===(d&1),c.g.j=g,c.g.l=e;else if(16===(e&247)&&32===(d&240)||23===(e&247)&&45===(d&255))g="black",0===(e&7)&&(g=ih[(d&14)>>1]),c.g.B=g;else if(17===(e&247)&&48===(d&240))Rg(c.g,Ug,d);else if(18===
(e&246)&&32===(d&224))Rg(c.g,e&1?Yg:Wg,d);else if(20===(e&246)&&32===(d&240)){d=b.pts;e=null;switch(b.rb){case 32:fh(c);break;case 33:c=c.g;c.i[c.g].pop();break;case 37:e=ch(c,2,d);break;case 38:e=ch(c,3,d);break;case 39:e=ch(c,4,d);break;case 40:Rg(c.g,Sg,32);break;case 41:c.h=2;c.g=c.i;c.g.h=0;c.j=d;break;case 42:Og(c.B);hh(c);break;case 43:hh(c);break;case 44:e=c.i;g=null;c.h!==eh&&(g=Pg(e,c.j,d));Qg(e,0,15);e=g;break;case 45:e=c.g;c.h!==dh?e=null:(g=Pg(e,c.j,d),h=e.g-e.h+1,$g(e,h-1,h,e.h),Qg(e,
0,h-1),Qg(e,e.g,15-e.g),c.j=d,e=g);break;case 46:Qg(c.l,0,15);break;case 47:e=null,c.h!==eh&&(e=Pg(c.i,c.j,d)),g=c.l,c.l=c.i,c.i=g,fh(c),c.j=d}d=e;break a}d=null}else e=b.rb,Rg(c.g,Sg,b.Wa),Rg(c.g,Sg,e);return d}
function Kh(a,b){var c=[];try{for(;b.Ia();){var d=wh(b).value,e=(d&224)>>5,f=d&31;7===e&&0!=f&&(e=wh(b).value&63);if(0!=e){a.j.has(e)||a.j.set(e,new xh(e));for(var g=a.j.get(e),h=b.qa();b.qa()-h<f;){e=b;var k=wh(e),l=k.value,m=k.pts;if(16===l){var n=wh(e);l=l<<16|n.value}if(0<=l&&31>=l){var p=m;if(g.g){var t=g.g;e=null;switch(l){case 8:!ph(t)||0>=t.g&&0>=t.h||(0>=t.g?(t.g=t.I-1,t.h--):t.g--,t.i[t.h][t.g]=null);break;case 13:t.isVisible()&&(e=qh(t,p,g.i));if(t.h+1>=t.L){p=t;for(var v=0,w=1;15>w;w++,
v++)p.i[v]=p.i[w];for(w=0;1>w;w++,v++)p.i[v]=nh()}else t.h++;t.g=0;break;case 14:t.isVisible()&&(e=qh(t,p,g.i));t.i[t.h]=nh();t.g=0;break;case 12:t.isVisible()&&(e=qh(t,p,g.i)),mh(t),p=t,p.h=0,p.g=0}var y=e}else y=null}else if(128<=l&&159>=l)y=yh(g,e,l,m);else{if(4096<=l&&4127>=l)p=l&255,8<=p&&15>=p?e.skip(1):16<=p&&23>=p?e.skip(2):24<=p&&31>=p&&e.skip(3);else if(4224<=l&&4255>=l)p=l&255,128<=p&&135>=p?e.skip(4):136<=p&&143>=p&&e.skip(5);else if(32<=l&&127>=l)e=l,g.g&&(127===e?oh(g.g,"\u266a"):oh(g.g,
String.fromCharCode(e)));else if(160<=l&&255>=l)g.g&&oh(g.g,String.fromCharCode(l));else if(4128<=l&&4223>=l){if(e=l&255,g.g)if(Fh.has(e)){var x=Fh.get(e);oh(g.g,x)}else oh(g.g,"_")}else 4256<=l&&4351>=l&&g.g&&(160!=(l&255)?oh(g.g,"_"):oh(g.g,"[CC]"));y=null}(e=y)&&c.push(e)}}}}catch(D){if(D instanceof P&&3E3===D.code)Ua("CEA708_INVALID_DATA","Buffer read out of bounds / invalid CEA-708 Data.");else throw D;}return c}function Lh(a){for(var b=0;a;)b^=a&1,a>>=1;return 1===b};function Mh(){}var Oh=function Nh(a,b){var d,e,f,g;return Fa(Nh,function(h){if(1==h.g){for(var k=b,l=0,m=0;m<k.length;)2==l&&3==k[m]?(l=0,k=[].concat(ja(k)),k.splice(m,1),k=new Uint8Array(k)):0==k[m]?l++:l=0,m++;d=k;e=0}if(4!=h.g){if(!(e<d.length))return h.D(0);for(f=0;255==d[e];)f+=255,e++;f+=d[e++];for(g=0;255==d[e];)g+=255,e++;g+=d[e++];return 4!=f?h.D(4):z(h,d.subarray(e,e+g),4)}e+=g;return h.D(2)})};function Ph(a,b){var c=null,d=null,e=a.T();b&1&&a.skip(8);b&2&&a.skip(4);b&8&&(c=a.T());b&16&&(d=a.T());return{trackId:e,cf:c,Yf:d}}function Qh(a,b){return{Xd:1==b?a.xc():a.T()}}function Rh(a,b){1==b?(a.skip(8),a.skip(8)):(a.skip(4),a.skip(4));return{timescale:a.T()}}
function Sh(a,b,c){var d=a.T(),e=[];c&1&&a.skip(4);c&4&&a.skip(4);for(var f=r(lb(d)),g=f.next();!g.done;g=f.next())g={ye:null,sampleSize:null,Cd:null},c&256&&(g.ye=a.T()),c&512&&(g.sampleSize=a.T()),c&1024&&a.skip(4),c&2048&&(g.Cd=0==b?a.T():a.wf()),e.push(g);return{Vi:d,zf:e}};function Th(){this.j=new Mh;this.i=new Map;this.h=this.g=0}
Th.prototype.init=function(a){var b=this,c=[],d=[];(new wg).box("moov",Ag).box("mvex",Ag).Z("trex",function(e){var f=e.reader;f.skip(4);f.skip(4);e=f.T();f=f.T();b.g=e;b.h=f}).box("trak",Ag).Z("tkhd",function(e){var f=e.reader;1==e.version?(f.skip(8),f.skip(8)):(f.skip(4),f.skip(4));e=f.T();c.push(e)}).box("mdia",Ag).Z("mdhd",function(e){e=Rh(e.reader,e.version);d.push(e.timescale)}).parse(a,!0);if(!c.length||!d.length||c.length!=d.length)throw new P(2,2,2010);c.forEach(function(e,f){b.i.set(e,d[f])})};
Th.prototype.parse=function(a){var b=this,c=[],d=this.g,e=this.h,f=[],g=null,h=9E4;(new wg).box("moof",Ag).box("traf",Ag).Z("trun",function(k){f=Sh(k.reader,k.version,k.flags).zf}).Z("tfhd",function(k){k=Ph(k.reader,k.flags);d=k.cf||b.g;e=k.Yf||b.h;k=k.trackId;b.i.has(k)&&(h=b.i.get(k))}).Z("tfdt",function(k){g=Qh(k.reader,k.version).Xd}).box("mdat",function(k){if(null===g)throw new P(2,2,2010);k=k.reader;var l=g,m=h,n=d,p=e,t=f,v=0,w=p;for(t.length&&(w=t[0].sampleSize||p);k.Ia();){var y=k.T();if(6==
(k.ra()&31)){var x=0;t.length>v&&(x=t[v].Cd||0);x=(l+x)/m;for(var D=r(Oh(b.j,k.Lb(y-1))),C=D.next();!C.done;C=D.next())c.push({Wg:C.value,pts:x})}else k.skip(y-1);w-=y+4;0==w&&(l=t.length>v?l+(t[v].ye||n):l+n,v++,w=t.length>v?t[v].sampleSize||p:p)}}).parse(a,!1);return c};function Uh(){this.h=new Th;this.g=new Gh}Uh.prototype.init=function(a){this.h.init(a)};
function Vh(a,b){var c=a.h.parse(b);c=r(c);for(var d=c.next();!d.done;d=c.next()){var e=d.value,f=Oc(e.Wg);if(0<f.length&&(d=a.g,e=e.pts,f=new tg(f,0),181===f.ra()&&49===f.wc()&&1195456820===f.T()&&3===f.ra())){var g=f.ra();if(0!==(g&64)){g&=31;f.skip(1);for(var h=0;h<g;h++){var k=f.ra(),l=(k&4)>>2,m=f.ra(),n=f.ra();l&&(k&=3,0===k||1===k?d.h.push({pts:e,type:k,Wa:m,rb:n,order:d.h.length}):(d.g.push({pts:e,type:k,value:m,order:d.g.length}),d.g.push({pts:e,type:2,value:n,order:d.g.length})))}}}}return Ih(a.g)}
;function Wh(a){return!a||1==a.length&&1E-6>a.end(0)-a.start(0)?null:a.length?a.end(a.length-1):null}function Xh(a,b,c){c=void 0===c?0:c;return!a||!a.length||1==a.length&&1E-6>a.end(0)-a.start(0)||b>a.end(a.length-1)?!1:b+c>=a.start(0)}function Yh(a,b){if(!a||!a.length||1==a.length&&1E-6>a.end(0)-a.start(0))return 0;for(var c=0,d=r(Zh(a)),e=d.next();!e.done;e=d.next()){var f=e.value;e=f.start;f=f.end;f>b&&(c+=f-Math.max(e,b))}return c}
function $h(a,b,c){if(!a||!a.length||1==a.length&&1E-6>a.end(0)-a.start(0))return null;a=Zh(a).findIndex(function(d,e,f){return d.start>b&&(0==e||f[e-1].end-b<=c)});return 0<=a?a:null}function Zh(a){if(!a)return[];for(var b=[],c=r(lb(a.length)),d=c.next();!d.done;d=c.next())d=d.value,b.push({start:a.start(d),end:a.end(d)});return b};function ai(a,b,c,d){var e=this;this.g=a;this.s=c;this.j={};this.L={};this.i=null;this.M=d||function(){};this.l={};this.h=new rf;this.C={};this.G=b;this.I=new Wc;this.B=bi(this,this.I);this.N=new pf(function(){return ci(e)});this.J=""}function bi(a,b){var c=new MediaSource;a.h.Qa(c,"sourceopen",function(){URL.revokeObjectURL(a.J);b.resolve()});a.J=di(c);a.g.src=a.J;return c}q=ai.prototype;q.destroy=function(){return this.N.destroy()};
function ci(a){var b,c,d,e,f,g,h,k;return L(function(l){if(1==l.g){b=[];for(c in a.l)for(d=a.l[c],e=d[0],a.l[c]=d.slice(0,1),e&&b.push(e.p["catch"](Kb)),f=r(d.slice(1)),g=f.next();!g.done;g=f.next())h=g.value,h.p.reject(new P(2,7,7003,void 0));a.i&&b.push(a.i.destroy());a.s&&b.push(a.s.destroy());for(k in a.C)b.push(a.C[k].destroy());return z(l,Promise.all(b),2)}a.h&&(a.h.release(),a.h=null);a.g&&(a.g.removeAttribute("src"),a.g.load(),a.g=null);a.B=null;a.i=null;a.s=null;a.j={};a.C={};a.G=null;a.l=
{};A(l)})}
q.init=function(a,b){var c=this,d,e,f,g,h,k,l;return L(function(m){if(1==m.g)return d=Tb,z(m,c.I,2);e={};f=r(a.keys());for(g=f.next();!g.done;e={Oa:e.Oa},g=f.next())e.Oa=g.value,h=a.get(e.Oa),k=qd(h.mimeType,h.codecs),e.Oa==d.ua?ei(c,k):(!b&&MediaSource.isTypeSupported(k)||!md(k,e.Oa)||(c.C[e.Oa]=new ld,k=od(e.Oa,k)),l=c.B.addSourceBuffer(k),c.h.o(l,"error",function(n){return function(){c.l[n.Oa][0].p.reject(new P(2,3,3014,c.g.error?c.g.error.code:0))}}(e)),c.h.o(l,"updateend",function(n){return function(){return fi(c,n.Oa)}}(e)),
c.j[e.Oa]=l,c.L[e.Oa]=k,c.l[e.Oa]=[]);A(m)})};function ei(a,b){a.i||(a.i=new ud(a.s));"application/cea-608"!=b&&"application/cea-708"!=b&&(a.i.C=Mb(wd[b]))}function gi(a){return a.B?"ended"==a.B.readyState:!0}function hi(a,b){if(b==Sb)var c=a.i.g;else c=ii(a,b),c=!c||1==c.length&&1E-6>c.end(0)-c.start(0)?null:1==c.length&&0>c.start(0)?0:c.length?c.start(0):null;return c}function ji(a,b){return b==Sb?a.i.h:Wh(ii(a,b))}
function ki(a,b,c){if(b==Sb)return a=a.i,null==a.h||a.h<c?0:a.h-Math.max(c,a.g);a=ii(a,b);return Yh(a,c)}q.Ib=function(){var a={total:Zh(this.g.buffered),audio:Zh(ii(this,"audio")),video:Zh(ii(this,"video")),text:[]};if(this.i){var b=this.i.g,c=this.i.h;null!=b&&null!=c&&a.text.push({start:b,end:c})}return a};function ii(a,b){try{return a.j[b].buffered}catch(c){return null}}
function li(a,b,c,d,e,f){var g,h,k,l,m,n,p,t;return L(function(v){if(1==v.g){g=Tb;if(b==g.ua)return z(v,xd(a.i,c,d,e),0);if(a.C[b])return z(v,pd(a.C[b],c),10);if(f)return a.i||ei(a,"text/vtt"),null==d&&null==e?a.G.init(c):(h=Vh(a.G,c),h.length&&(k=a.j[g.mb].timestampOffset,Cd(a.i,h,d,e,k))),c=mi(a,c,d,b),z(v,ni(a,b,function(){a.j[b].appendBuffer(c)}),0);c=mi(a,c,d,b);return z(v,ni(a,b,function(){a.j[b].appendBuffer(c)}),0)}l=v.h;a.i||ei(a,"text/vtt");l.metadata&&(m=a.j[b].timestampOffset,a.M(l.metadata,
m,e));l.captions&&l.captions.length&&(n=a.j[g.mb].timestampOffset,p=Ad(l.captions),Cd(a.i,p,d,e,n));t=l.data;t=mi(a,t,d,b);return z(v,ni(a,b,function(){a.j[b].appendBuffer(t)}),0)})}function oi(a,b){var c=ji(a,"video")||0;zd(a.i,b,c)}function pi(a){a.i&&zd(a.i,"",0)}q.remove=function(a,b,c){var d=this,e;return L(function(f){e=Tb;return a==e.ua?z(f,d.i.remove(b,c),0):z(f,ni(d,a,function(){c<=b?fi(d,a):d.j[a].remove(b,c)}),0)})};
function qi(a,b){var c;return L(function(d){c=Tb;return b==c.ua?a.i?z(d,a.i.remove(0,Infinity),0):d["return"]():z(d,ni(a,b,function(){var e=a.B.duration;0>=e?fi(a,b):a.j[b].remove(0,e)}),0)})}q.flush=function(a){var b=this,c;return L(function(d){c=Tb;return a==c.ua?d["return"]():z(d,ni(b,a,function(){b.g.currentTime-=.001;fi(b,a)}),0)})};
function ri(a,b,c,d,e){var f;return L(function(g){f=Tb;return b==f.ua?(a.i.G=c,yd(a.i,d,e),g["return"]()):z(g,Promise.all([ni(a,b,function(){var h=a.j[b].appendWindowStart,k=a.j[b].appendWindowEnd;a.j[b].abort();a.j[b].appendWindowStart=h;a.j[b].appendWindowEnd=k;fi(a,b)}),ni(a,b,function(){var h=c;0>h&&(h+=.001);a.j[b].timestampOffset=h;fi(a,b)}),ni(a,b,function(){a.j[b].appendWindowStart=0;a.j[b].appendWindowEnd=e;a.j[b].appendWindowStart=d;fi(a,b)})]),0)})}
q.endOfStream=function(a){var b=this;return L(function(c){return z(c,si(b,function(){gi(b)||(a?b.B.endOfStream(a):b.B.endOfStream())}),0)})};q.ib=function(a){var b=this;return L(function(c){return z(c,si(b,function(){b.B.duration=a}),0)})};q.getDuration=function(){return this.B.duration};function fi(a,b){var c=a.l[b][0];c&&(c.p.resolve(),ti(a,b))}function ni(a,b,c){qf(a.N);c={start:c,p:new Wc};a.l[b].push(c);1==a.l[b].length&&ui(a,b);return c.p}
function si(a,b){var c,d,e,f,g,h;return L(function(k){switch(k.g){case 1:qf(a.N);c=[];d={};for(e in a.j)d.Dc=new Wc,f={start:function(l){return function(){return l.Dc.resolve()}}(d),p:d.Dc},a.l[e].push(f),c.push(d.Dc),1==a.l[e].length&&f.start(),d={Dc:d.Dc};E(k,2);return z(k,Promise.all(c),4);case 4:wa(k,3);break;case 2:throw g=H(k),g;case 3:try{b()}catch(l){throw new P(2,3,3015,l);}finally{for(h in a.j)ti(a,h)}A(k)}})}function ti(a,b){a.l[b].shift();ui(a,b)}
function ui(a,b){var c=a.l[b][0];if(c)try{c.start()}catch(d){"QuotaExceededError"==d.name?c.p.reject(new P(2,3,3017,b)):c.p.reject(new P(2,3,3015,d)),ti(a,b)}}function mi(a,b,c,d){var e=a.g.mediaKeys;null==c&&e&&(Hd()||Id("Xbox One"))&&"mp4"==a.L[d].split(";")[0].split("/")[1]&&(b=Fg(b));return b}var di=window.URL.createObjectURL;function vi(a,b,c,d){this.Ma=a;this.Ka=b;this.Da=c;this.ge=void 0===d?null:d}vi.prototype.Oc=function(){return this.Ka};vi.prototype.Kc=function(){return this.Da};function wi(a,b){return a&&b?a.Oc()==b.Oc()&&a.Kc()==b.Kc()&&qc(a.Ma(),b.Ma()):a==b}N("shaka.media.InitSegmentReference",vi);vi.prototype.getEndByte=vi.prototype.Kc;vi.prototype.getStartByte=vi.prototype.Oc;
function xi(a,b,c,d,e,f,g,h,k,l,m,n){l=void 0===l?[]:l;this.startTime=a;this.l=this.endTime=b;this.j=c;this.Ka=d;this.Da=e;this.g=f;this.timestampOffset=g;this.appendWindowStart=h;this.appendWindowEnd=k;this.h=l;this.tilesLayout=void 0===m?"":m;this.i=void 0===n?null:n}q=xi.prototype;q.Ma=function(){return this.j()};q.Bg=function(){return this.startTime};q.mg=function(){return this.endTime};q.Oc=function(){return this.Ka};q.Kc=function(){return this.Da};q.Hg=function(){return this.tilesLayout};
q.Gg=function(){return this.i};N("shaka.media.SegmentReference",xi);xi.prototype.getTileDuration=xi.prototype.Gg;xi.prototype.getTilesLayout=xi.prototype.Hg;xi.prototype.getEndByte=xi.prototype.Kc;xi.prototype.getStartByte=xi.prototype.Oc;xi.prototype.getEndTime=xi.prototype.mg;xi.prototype.getStartTime=xi.prototype.Bg;xi.prototype.getUris=xi.prototype.Ma;function R(a,b,c){this.j=a;this.zd=b;this.s=this.l=Infinity;this.g=1;this.h=this.i=null;this.B=0;this.C=!0;this.G=0;this.I=void 0===c?!0:c;this.J=0}q=R.prototype;q.getDuration=function(){return this.l};q.vg=function(){return this.g};q.ib=function(a){this.l=a};q.zg=function(){return this.j};q.Cf=function(a){this.B=a};q.Zc=function(a){this.C=a};q.Ie=function(a){this.s=a};q.nh=function(a){this.zd=a};q.lg=function(){return this.zd};
q.tc=function(a){if(0!=a.length){var b=a[a.length-1].endTime;this.me(a[0].startTime);this.g=a.reduce(function(c,d){return Math.max(c,d.endTime-d.startTime)},this.g);this.h=Math.max(this.h,b);null!=this.j&&this.I&&(this.j=(Date.now()+this.B)/1E3-this.h-this.g)}};q.me=function(a){this.i=null==this.i?a:Math.min(this.i,a)};q.le=function(a){this.g=Math.max(this.g,a)};q.offset=function(a){null!=this.i&&(this.i+=a);null!=this.h&&(this.h+=a)};q.W=function(){return Infinity==this.l&&!this.C};
q.Tb=function(){return Infinity!=this.l&&!this.C};q.ub=function(){return Math.max(this.G,this.Qb()-this.s)};q.Ff=function(a){this.G=a};q.Qb=function(){return this.W()||this.Tb()?Math.min(Math.max(0,(Date.now()+this.B)/1E3-this.g-this.j)+this.J,this.l):this.h||this.l};q.Nc=function(a){var b=Math.max(this.i,this.G);return Infinity==this.s?Math.ceil(1E3*b)/1E3:Math.max(b,Math.min(this.Qb()-this.s+a,this.sb()))};q.mc=function(){return this.Nc(0)};
q.sb=function(){return Math.max(0,this.Qb()-(this.W()||this.Tb()?this.zd:0))};q.Kf=function(){return null==this.j||null!=this.h&&this.I?!1:!0};q.Bf=function(a){this.J=a};N("shaka.media.PresentationTimeline",R);R.prototype.setAvailabilityTimeOffset=R.prototype.Bf;R.prototype.usingPresentationStartTime=R.prototype.Kf;R.prototype.getSeekRangeEnd=R.prototype.sb;R.prototype.getSeekRangeStart=R.prototype.mc;R.prototype.getSafeSeekRangeStart=R.prototype.Nc;R.prototype.getSegmentAvailabilityEnd=R.prototype.Qb;
R.prototype.setUserSeekStart=R.prototype.Ff;R.prototype.getSegmentAvailabilityStart=R.prototype.ub;R.prototype.isInProgress=R.prototype.Tb;R.prototype.isLive=R.prototype.W;R.prototype.offset=R.prototype.offset;R.prototype.notifyMaxSegmentDuration=R.prototype.le;R.prototype.notifyMinSegmentStartTime=R.prototype.me;R.prototype.notifySegments=R.prototype.tc;R.prototype.getDelay=R.prototype.lg;R.prototype.setDelay=R.prototype.nh;R.prototype.setSegmentAvailabilityDuration=R.prototype.Ie;
R.prototype.setStatic=R.prototype.Zc;R.prototype.setClockOffset=R.prototype.Cf;R.prototype.getPresentationStartTime=R.prototype.zg;R.prototype.setDuration=R.prototype.ib;R.prototype.getMaxSegmentDuration=R.prototype.vg;R.prototype.getDuration=R.prototype.getDuration;function yi(a,b){this.j=a;this.s=zi(a);this.g=a.g.currentTime;this.l=Date.now()/1E3;this.h=!1;this.B=b;this.i=function(){}}yi.prototype.release=function(){this.j=null;this.i=function(){}};function Ai(a,b){a.i=b}function Bi(a){this.g=a}function zi(a){if(a.g.paused||0==a.g.playbackRate||0==a.g.buffered.length)var b=!1;else a:{b=a.g.currentTime;a=r(Zh(a.g.buffered));for(var c=a.next();!c.done;c=a.next())if(c=c.value,!(b<c.start-.1||b>c.end-.5)){b=!0;break a}b=!1}return b};function Ci(a,b,c,d,e){var f=this;this.g=a;this.G=b;this.m=c;this.C=e;this.h=new rf;this.B=!1;this.I=a.readyState;this.j=!1;this.i=d;this.s=!1;this.h.o(a,"waiting",function(){return Di(f)});this.l=(new Q(function(){Di(f)})).na(.25)}Ci.prototype.release=function(){this.h&&(this.h.release(),this.h=null);null!=this.l&&(this.l.stop(),this.l=null);this.i&&(this.i.release(),this.i=null);this.g=this.G=this.C=null};Ci.prototype.qe=function(){this.s=!0;Di(this)};
function Di(a){if(0!=a.g.readyState){if(a.g.seeking){if(!a.B)return}else a.B=!1;if(!a.g.paused||0==a.g.currentTime&&(a.g.autoplay||0!=a.g.currentTime)){a.g.readyState!=a.I&&(a.j=!1,a.I=a.g.readyState);var b;if(!(b=!a.i)){b=a.i;var c=b.j,d=zi(c),e=c.g.currentTime,f=Date.now()/1E3;if(b.g!=e||b.s!=d)b.l=f,b.g=e,b.s=d,b.h=!1;e=f-b.l;if(d=e>=b.B&&d&&!b.h)b.i(b.g,e),b.h=!0,b.g=c.g.currentTime;b=!d}if(b){e=a.m.smallGapLimit;var g=a.g.currentTime;b=a.g.buffered;c=$h(b,g,a.m.gapDetectionThreshold);if(!(null==
c||0==c&&!a.s||(d=b.start(c),d>=a.G.sb()))){var h=d-g;e=h<=e;f=!1;.001>h||(e||a.j||(a.j=!0,g=(new Map).set("currentTime",g).set("gapSize",h),g=new O("largegap",g),g.cancelable=!0,a.C(g),a.m.jumpLargeGaps&&!g.defaultPrevented&&(f=!0)),!e&&!f)||(0!=c&&b.end(c-1),a.g.currentTime=d)}}}}};function Ei(a,b,c,d){b==HTMLMediaElement.HAVE_NOTHING||a.readyState>=b?d():(b=Fi.value().get(b),c.Qa(a,b,d))}var Fi=new Xc(function(){return new Map([[HTMLMediaElement.HAVE_METADATA,"loadedmetadata"],[HTMLMediaElement.HAVE_CURRENT_DATA,"loadeddata"],[HTMLMediaElement.HAVE_FUTURE_DATA,"canplay"],[HTMLMediaElement.HAVE_ENOUGH_DATA,"canplaythrough"]])});function Gi(a,b,c){var d=this;this.g=a;this.l=b;this.j=c;this.s=!1;this.h=new rf;this.i=new Hi(a);Ei(this.g,HTMLMediaElement.HAVE_METADATA,this.h,function(){Ii(d,d.j)})}Gi.prototype.release=function(){this.h&&(this.h.release(),this.h=null);null!=this.i&&(this.i.release(),this.i=null);this.l=function(){};this.g=null};function Ji(a){return a.s?a.g.currentTime:a.j}function Ki(a,b){0<a.g.readyState?Li(a.i,b):Ei(a.g,HTMLMediaElement.HAVE_METADATA,a.h,function(){Ii(a,a.j)})}
function Ii(a,b){.001>Math.abs(a.g.currentTime-b)?Mi(a):(a.h.Qa(a.g,"seeking",function(){Mi(a)}),Li(a.i,0==a.g.currentTime?b:a.g.currentTime))}function Mi(a){a.s=!0;a.h.o(a.g,"seeking",function(){return a.l()})}function Hi(a){var b=this;this.h=a;this.s=10;this.l=this.j=this.i=0;this.g=new Q(function(){0>=b.i?b.g.stop():b.h.currentTime!=b.j?b.g.stop():(b.h.currentTime=b.l,b.i--)})}Hi.prototype.release=function(){this.g&&(this.g.stop(),this.g=null);this.h=null};
function Li(a,b){a.j=a.h.currentTime;a.l=b;a.i=a.s;a.h.currentTime=b;a.g.na(.1)};function Ni(a){function b(){null==c.i||0==c.i?c.j=!0:(c.h.Qa(c.g,"seeking",function(){c.j=!0}),c.g.currentTime=Math.max(0,c.g.currentTime+c.i))}var c=this;this.g=a;this.j=!1;this.i=null;this.h=new rf;Ei(this.g,HTMLMediaElement.HAVE_CURRENT_DATA,this.h,function(){b()})}Ni.prototype.release=function(){this.h&&(this.h.release(),this.h=null);this.g=null};Ni.prototype.s=function(a){this.i=this.j?this.i:a};Ni.prototype.l=function(){return(this.j?this.g.currentTime:this.i)||0};Ni.prototype.I=function(){};
function Oi(a,b,c,d,e,f){var g=this;this.i=a;this.g=b.presentationTimeline;this.J=b.minBufferTime||0;this.m=c;this.G=e;this.C=null;this.j=new Ci(a,b.presentationTimeline,c,Pi(a,c),f);this.h=new Gi(a,function(){a:{var h=g.j;h.B=!0;h.s=!1;h.j=!1;var k=Ji(g.h);h=Qi(g,k);if(.001<Math.abs(h-k)&&(k=Date.now()/1E3,!g.C||g.C<k-1)){g.C=k;Ki(g.h,h);h=void 0;break a}g.G();h=void 0}return h},Ri(this,d));this.B=(new Q(function(){if(0!=g.i.readyState&&!g.i.paused){var h=Ji(g.h),k=g.g.mc(),l=g.g.sb();3>l-k&&(k=
l-3);h<k&&(h=Qi(g,h),g.i.currentTime=h)}})).na(.25)}Oi.prototype.release=function(){this.h&&(this.h.release(),this.h=null);this.j&&(this.j.release(),this.j=null);this.B&&(this.B.stop(),this.B=null);this.i=this.h=this.g=this.m=null;this.G=function(){}};Oi.prototype.s=function(a){Ki(this.h,a)};Oi.prototype.l=function(){var a=Ji(this.h);return 0<this.i.readyState&&!this.i.paused?Si(this,a):a};
function Ri(a,b){null==b?b=Infinity>a.g.getDuration()?a.g.mc():a.g.sb():0>b&&(b=a.g.sb()+b);return Ti(a,Si(a,b))}Oi.prototype.I=function(){this.j.qe()};function Ti(a,b){var c=a.g.getDuration();return b>=c?c-a.m.durationBackoff:b}function Qi(a,b){var c=Math.max(a.J,a.m.rebufferingGoal),d=a.m.safeSeekOffset,e=a.g.mc(),f=a.g.sb(),g=a.g.getDuration();3>f-e&&(e=f-3);var h=a.g.Nc(c),k=a.g.Nc(d);c=a.g.Nc(c+d);return b>=g?Ti(a,b):b>f?f:b<e?Xh(a.i.buffered,k)?k:c:b>=h||Xh(a.i.buffered,b)?b:c}
function Si(a,b){var c=a.g.mc();if(b<c)return c;c=a.g.sb();return b>c?c:b}function Pi(a,b){if(!b.stallEnabled)return null;var c=b.stallSkip,d=new yi(new Bi(a),b.stallThreshold);Ai(d,function(){c?a.currentTime+=c:(a.pause(),a.play())});return d};function Ui(a){this.R=a;this.g=null;this.h=0;this.i=!1}q=Ui.prototype;q.destroy=function(){Fb("shaka.media.SegmentIndex","Please use release() instead of destroy().");this.release();return Promise.resolve()};q.release=function(){this.i||(this.R=[],this.g&&this.g.stop(),this.g=null)};q.Qg=function(){this.i=!0};
q.find=function(a){for(var b=this.R.length-1,c=b;0<=c;--c){var d=this.R[c],e=c<b?this.R[c+1].startTime:d.endTime;if(a>=d.startTime&&a<e)return c+this.h}return this.R.length&&a<this.R[0].startTime?this.h:null};q.get=function(a){if(0==this.R.length)return null;a-=this.h;return 0>a||a>=this.R.length?null:this.R[a]};q.offset=function(a){if(!this.i)for(var b=r(this.R),c=b.next();!c.done;c=b.next())c=c.value,c.startTime+=a,c.endTime+=a,c.timestampOffset+=a};
q.rc=function(a){!this.i&&a.length&&(this.R=this.R.filter(function(b){return b.startTime<a[0].startTime}),this.R.push.apply(this.R,ja(a)))};q.sc=function(a,b){var c=this;a=a.filter(function(d){return d.endTime>b&&(0==c.R.length||d.endTime>c.R[0].startTime)});this.rc(a);this.Ob(b)};q.Ob=function(a){if(!this.i){var b=this.R.length;this.R=this.R.filter(function(c){return c.endTime>a});this.h+=b-this.R.length}};
q.Hb=function(a,b,c){c=void 0===c?!1:c;if(!this.i){for(;this.R.length;)if(this.R[this.R.length-1].startTime>=b)this.R.pop();else break;for(;this.R.length;)if(this.R[0].endTime<=a)this.R.shift(),c||this.h++;else break;0!=this.R.length&&(a=this.R[this.R.length-1],this.R[this.R.length-1]=new xi(a.startTime,b,a.j,a.Ka,a.Da,a.g,a.timestampOffset,a.appendWindowStart,a.appendWindowEnd,a.h,a.tilesLayout,a.i))}};
q.Ed=function(a,b){var c=this;this.i||(this.g&&this.g.stop(),this.g=new Q(function(){var d=b();d?c.R.push.apply(c.R,ja(d)):(c.g.stop(),c.g=null)}),this.g.na(a))};Ui.prototype[Symbol.iterator]=function(){return this.kc(0)};Ui.prototype.kc=function(a){var b=this.find(a);if(null==b)return null;b--;var c=this.get(b+1),d=-1;if(c&&0<c.h.length)for(var e=c.h.length-1;0<=e;--e){var f=c.h[e];if(a>=f.startTime&&a<f.endTime){b++;d=e-1;break}}return new Vi(this,b,d)};
function Wi(a,b,c){return new Ui([new xi(a,a+b,function(){return c},0,null,null,a,a,a+b)])}N("shaka.media.SegmentIndex",Ui);Ui.forSingleSegment=Wi;Ui.prototype.getIteratorForTime=Ui.prototype.kc;Ui.prototype.updateEvery=Ui.prototype.Ed;Ui.prototype.fit=Ui.prototype.Hb;Ui.prototype.evict=Ui.prototype.Ob;Ui.prototype.mergeAndEvict=Ui.prototype.sc;Ui.prototype.merge=Ui.prototype.rc;Ui.prototype.offset=Ui.prototype.offset;Ui.prototype.get=Ui.prototype.get;Ui.prototype.find=Ui.prototype.find;
Ui.prototype.markImmutable=Ui.prototype.Qg;Ui.prototype.release=Ui.prototype.release;Ui.prototype.destroy=Ui.prototype.destroy;function Vi(a,b,c){this.i=a;this.h=b;this.g=c}Vi.prototype.seek=function(a){Fb("shaka.media.SegmentIterator","Please use SegmentIndex.getIteratorForTime instead of seek().");(a=this.i.kc(a))?(this.h=a.h,this.g=a.g):(this.h=Number.MAX_VALUE,this.g=0);return this.next().value};
Vi.prototype.current=function(){var a=this.i.get(this.h);a&&0<a.h.length&&a.Ma().length&&this.g>=a.h.length&&(this.h++,this.g=0,a=this.i.get(this.h));return a&&0<a.h.length?a.h[this.g]:a};Vi.prototype.next=function(){var a=this.i.get(this.h);a&&0<a.h.length?(this.g++,a.Ma().length&&this.g==a.h.length&&(this.h++,this.g=0)):(this.h++,this.g=0);a=this.current();return{value:a,done:!a}};N("shaka.media.SegmentIterator",Vi);Vi.prototype.next=Vi.prototype.next;Vi.prototype.current=Vi.prototype.current;
Vi.prototype.seek=Vi.prototype.seek;function Xi(){Ui.call(this,[]);this.j=[]}u(Xi,Ui);q=Xi.prototype;q.clone=function(){var a=new Xi;a.j=this.j.slice();return a};q.release=function(){for(var a=r(this.j),b=a.next();!b.done;b=a.next())b.value.release();this.j=[]};q.find=function(a){for(var b=0,c=r(this.j),d=c.next();!d.done;d=c.next()){d=d.value;var e=d.find(a);if(null!=e)return e+b;b+=d.h+d.R.length}return null};
q.get=function(a){for(var b=0,c=r(this.j),d=c.next();!d.done;d=c.next()){d=d.value;var e=d.get(a-b);if(e)return e;b+=d.h+d.R.length}return null};q.offset=function(){};q.rc=function(){};q.Ob=function(){};q.sc=function(){};q.Hb=function(){};q.Ed=function(){};N("shaka.media.MetaSegmentIndex",Xi);Xi.prototype.updateEvery=Xi.prototype.Ed;Xi.prototype.fit=Xi.prototype.Hb;Xi.prototype.mergeAndEvict=Xi.prototype.sc;Xi.prototype.evict=Xi.prototype.Ob;Xi.prototype.merge=Xi.prototype.rc;
Xi.prototype.offset=Xi.prototype.offset;Xi.prototype.get=Xi.prototype.get;Xi.prototype.find=Xi.prototype.find;Xi.prototype.release=Xi.prototype.release;function Yi(a){var b=this;this.g=a;this.j=!1;this.i=this.g.sd();this.h=new Q(function(){b.g.uf(.25*b.i)})}Yi.prototype.release=function(){this.h&&(this.h.stop(),this.h=null);this.g=null};Yi.prototype.set=function(a){this.i=a;aj(this)};Yi.prototype.pd=function(){return this.g.pd()};function aj(a){a.h.stop();var b=a.j?0:a.i;if(0<=b)try{a.g.sd()!=b&&a.g.Ge(b);return}catch(c){}a.h.na(.25);0!=a.g.sd()&&a.g.Ge(0)};function bj(a){var b=this;this.h=a;this.g=new Set;this.i=(new Q(function(){cj(b,!1)})).na(.25)}bj.prototype.release=function(){this.i.stop();for(var a=r(this.g),b=a.next();!b.done;b=a.next())b.value.release();this.g.clear()};function cj(a,b){for(var c=r(a.g),d=c.next();!d.done;d=c.next())d.value.j(a.h.currentTime,b)};function dj(a){db.call(this);this.g=new Map;this.h=a}u(dj,db);dj.prototype.release=function(){this.g.clear();db.prototype.release.call(this)};function ej(a,b){var c=a.g.get(b);c||(c={Vc:[],$e:null,contentType:b},a.g.set(b,c));return c}function fj(a,b,c){var d=ej(a,b.contentType);gj(a,d);a={ge:b,position:c};d=d.Vc;b=d.findIndex(function(e){return e.position>=c});0<=b?d.splice(b,d[b].position==c?1:0,a):d.push(a)}
dj.prototype.j=function(a){for(var b=r(this.g.values()),c=b.next();!c.done;c=b.next()){c=c.value;a:{var d=c.Vc;for(var e=d.length-1;0<=e;e--){var f=d[e];if(f.position<=a){d=f.ge;break a}}d=null}if(e=d)e=c.$e,e=!(e===d||e&&d&&e.bandwidth==d.bandwidth&&e.audioSamplingRate==d.audioSamplingRate&&e.codecs==d.codecs&&e.contentType==d.contentType&&e.frameRate==d.frameRate&&e.height==d.height&&e.mimeType==d.mimeType&&e.channelsCount==d.channelsCount&&e.pixelAspectRatio==d.pixelAspectRatio&&e.width==d.width);
if(e)a:{e=a;f=d.contentType;if((f=this.h()[f])&&0<f.length){var g=f[f.length-1].end;if(e>=f[0].start&&e<g){e=!0;break a}}e=!1}e&&(c.$e=d,JSON.stringify(d),c=new O("qualitychange",new Map([["quality",d],["position",a]])),this.dispatchEvent(c))}};function gj(a,b){var c=a.h()[b.contentType];if(c&&0<c.length){var d=c[0].start,e=c[c.length-1].end,f=b.Vc;b.Vc=f.filter(function(g,h){return g.position<=d&&h+1<f.length&&f[h+1].position<=d||g.position>=e?!1:!0})}else b.Vc=[]};function hj(a){db.call(this);var b=this;this.g=new Set;this.i=a;this.h=(new Q(function(){for(var c=b.i(),d=r(b.g),e=d.next();!e.done;e=d.next())e=e.value,e.endTime<c.start&&(b.g["delete"](e),e=new O("regionremove",new Map([["region",e]])),b.dispatchEvent(e))})).na(2)}u(hj,db);hj.prototype.release=function(){this.g.clear();this.h.stop();db.prototype.release.call(this)};function ij(a){db.call(this);var b=this;this.i=a;this.g=new Map;this.l=[{cc:null,bc:jj,Sb:function(c,d){return kj(b,"enter",c,d)}},{cc:lj,bc:jj,Sb:function(c,d){return kj(b,"enter",c,d)}},{cc:mj,bc:jj,Sb:function(c,d){return kj(b,"enter",c,d)}},{cc:jj,bc:lj,Sb:function(c,d){return kj(b,"exit",c,d)}},{cc:jj,bc:mj,Sb:function(c,d){return kj(b,"exit",c,d)}},{cc:lj,bc:mj,Sb:function(c,d){return kj(b,"skip",c,d)}},{cc:mj,bc:lj,Sb:function(c,d){return kj(b,"skip",c,d)}}];this.h=new rf;this.h.o(this.i,"regionremove",
function(c){b.g["delete"](c.region)})}u(ij,db);ij.prototype.release=function(){this.i=null;this.g.clear();this.h.release();this.h=null;db.prototype.release.call(this)};ij.prototype.j=function(a,b){for(var c=r(this.i.g),d=c.next();!d.done;d=c.next()){d=d.value;var e=this.g.get(d),f=a<d.startTime?lj:a>d.endTime?mj:jj;this.g.set(d,f);for(var g=r(this.l),h=g.next();!h.done;h=g.next())h=h.value,h.cc==e&&h.bc==f&&h.Sb(d,b)}};
function kj(a,b,c,d){b=new O(b,new Map([["region",c],["seeking",d]]));a.dispatchEvent(b)}var lj=1,jj=2,mj=3;function nj(a,b,c,d,e){a=hf(a,d,e);if(0!=b||null!=c)a.headers.Range=c?"bytes="+b+"-"+c:"bytes="+b+"-";return a};function oj(a,b){var c=this;this.F=b;this.H=a;this.m=null;this.l=1;this.i=this.h=null;this.g=new Map;this.s=!1;this.B=null;this.j=!1;this.N=new pf(function(){return pj(c)})}oj.prototype.destroy=function(){return this.N.destroy()};function pj(a){var b,c,d,e;return L(function(f){if(1==f.g){b=[];c=r(a.g.values());for(d=c.next();!d.done;d=c.next())e=d.value,qj(e),b.push(rj(e));return z(f,Promise.all(b),2)}a.g.clear();a.F=null;a.H=null;a.m=null;A(f)})}
oj.prototype.configure=function(a){this.m=a;this.B=new Qe({maxAttempts:Math.max(a.retryParameters.maxAttempts,2),baseDelay:a.retryParameters.baseDelay,backoffFactor:a.retryParameters.backoffFactor,fuzzFactor:a.retryParameters.fuzzFactor,timeout:0,stallTimeout:0,connectionTimeout:0},!0)};oj.prototype.start=function(){var a=this;return L(function(b){if(1==b.g)return z(b,sj(a),2);qf(a.N);a.s=!0;A(b)})};
function tj(a,b){var c,d,e,f,g,h;L(function(k){switch(k.g){case 1:return c=Tb,E(k,2),z(k,qi(a.F.Y,c.ua),4);case 4:wa(k,3);break;case 2:if(d=H(k),a.F)a.F.onError(d);case 3:e=qd(b.mimeType,b.codecs);ei(a.F.Y,e);f=a.F.Y.s;if(g=f.isTextVisible()||a.m.alwaysStreamText)h=uj(b),a.g.set(c.ua,h),vj(a,h,0);A(k)}})}function wj(a){var b=a.g.get(Sb);b&&(qj(b),rj(b)["catch"](function(){}),a.g["delete"](Sb));a.i=null}
function xj(a,b){var c=a.g.get("video");if(c){var d=c.stream;if(d)if(b){var e=d.trickModeVideo;e&&!c.Zb&&(yj(a,e,!1,0,!1),c.Zb=d)}else if(d=c.Zb)c.Zb=null,yj(a,d,!0,0,!1)}}function zj(a,b,c,d,e){c=void 0===c?!1:c;d=void 0===d?0:d;e=void 0===e?!1:e;a.h=b;a.s&&(b.video&&yj(a,b.video,c,d,e),b.audio&&yj(a,b.audio,c,d,e))}function Aj(a,b){a.i=b;a.s&&yj(a,b,!0,0,!1)}
function yj(a,b,c,d,e){var f=a.g.get(b.type);f||b.type!=Sb?f&&(f.Zb&&(b.trickModeVideo?(f.Zb=b,b=b.trickModeVideo):f.Zb=null),f.stream!=b||e)&&(b.type==Sb&&ei(a.F.Y,qd(b.mimeType,b.codecs)),f.stream.closeSegmentIndex&&f.stream.closeSegmentIndex(),f.stream=b,f.za=null,c&&(f.Ic?f.Hd=!0:f.hb?(f.ac=!0,f.md=d,f.Hd=!0):(qj(f),Bj(a,f,!0,d)["catch"](function(g){if(a.F)a.F.onError(g)}))),Cj(a,f)["catch"](function(g){if(a.F)a.F.onError(g)})):tj(a,b)}
function Cj(a,b){var c,d;return L(function(e){if(1==e.g){if(!b.Ra)return e["return"]();c=b.stream;d=b.Ra;return c.segmentIndex?e.D(2):z(e,c.createSegmentIndex(),2)}if(b.Ra!=d||b.stream!=c)return e["return"]();var f=a.F.rd();var g=ji(a.F.Y,b.type),h=b.stream.segmentIndex.find(b.Xa?b.Xa.endTime:f),k=null==h?null:b.stream.segmentIndex.get(h);h=k?k.Da?k.Da-k.Ka:null:null;k&&!h&&(h=(k.endTime-k.startTime)*(b.stream.bandwidth||0)/8);h?((k=k.g)&&(h+=(k.Da?k.Da-k.Ka:null)||0),k=a.F.getBandwidthEstimate(),
f=8*h/k<(g||0)-f-Math.max(a.H.minBufferTime||0,a.m.rebufferingGoal)||b.Ra.h.g>h?!0:!1):f=!1;f&&b.Ra.abort();A(e)})}function Dj(a,b){b.Ic||b.ac||(b.hb?(b.ac=!0,b.md=0):null==hi(a.F.Y,b.type)?null==b.kb&&vj(a,b,0):(qj(b),Bj(a,b,!1,0)["catch"](function(c){if(a.F)a.F.onError(c)})))}
function sj(a){var b,c,d,e,f,g,h,k,l,m;return L(function(n){if(1==n.g){b=Tb;if(!a.h)throw new P(2,5,5006);c=new Map;d=new Set;a.h.audio&&(c.set(b.Nb,a.h.audio),d.add(a.h.audio));a.h.video&&(c.set(b.mb,a.h.video),d.add(a.h.video));a.i&&(c.set(b.ua,a.i),d.add(a.i));e=a.F.Y;f=a.m.forceTransmuxTS;return z(n,e.init(c,f),2)}qf(a.N);var p=a.H.presentationTimeline.getDuration();Infinity>p?a.F.Y.ib(p):a.F.Y.ib(Math.pow(2,32));g=r(c.keys());for(h=g.next();!h.done;h=g.next())k=h.value,l=c.get(k),a.g.has(k)||
(m=uj(l),a.g.set(k,m),vj(a,m,0));A(n)})}function uj(a){return{stream:a,type:a.type,za:null,Xa:null,td:null,ee:null,ce:null,be:null,Zb:null,endOfStream:!1,hb:!1,kb:null,ac:!1,md:0,Hd:!1,Ic:!1,ve:!1,Pc:!1,Ra:null}}
oj.prototype.Tc=function(a){var b=this,c,d,e,f,g;return L(function(h){switch(h.g){case 1:qf(b.N);if(a.hb||null==a.kb||a.Ic)return h["return"]();a.kb=null;if(!a.ac){h.D(2);break}return z(h,Bj(b,a,a.Hd,a.md),3);case 3:return h["return"]();case 2:if(a.stream.segmentIndex){h.D(4);break}c=a.stream;return z(h,a.stream.createSegmentIndex(),5);case 5:if(c!=a.stream)return c.closeSegmentIndex&&c.closeSegmentIndex(),null==a.kb&&vj(b,a,0),h["return"]();case 4:E(h,6);d=Ej(b,a);null!=d&&(vj(b,a,d),a.Pc=!1);wa(h,
7);break;case 6:return e=H(h),z(h,Fj(b,e),8);case 8:return h["return"]();case 7:f=Array.from(b.g.values());if(!b.s||!f.every(function(k){return k.endOfStream})){h.D(0);break}return z(h,b.F.Y.endOfStream(),10);case 10:qf(b.N),g=b.F.Y.getDuration(),0!=g&&g<b.H.presentationTimeline.getDuration()&&b.H.presentationTimeline.ib(g),A(h)}})};
function Ej(a,b){if(Gj(b))return oi(a.F.Y,b.stream.originalId||""),null;b.type==Sb&&pi(a.F.Y);var c=a.F.rd(),d=b.Xa?b.Xa.endTime:c,e=ki(a.F.Y,b.type,c),f=Math.max(a.H.minBufferTime||0,a.m.rebufferingGoal,a.m.bufferingGoal)*a.l;if(1E-6>a.H.presentationTimeline.getDuration()-d)return b.endOfStream=!0,"video"==b.type&&(c=a.g.get(Sb))&&Gj(c)&&(c.endOfStream=!0),null;b.endOfStream=!1;if(e>=f)return a.m.updateIntervalSeconds/2;e=ji(a.F.Y,b.type);e=Hj(a,b,c,e);if(!e)return a.m.updateIntervalSeconds;f=Infinity;
var g=Array.from(a.g.values());g=r(g);for(var h=g.next();!h.done;h=g.next())h=h.value,Gj(h)||h.za&&!h.za.current()||(f=Math.min(f,h.Xa?h.Xa.endTime:c));if(d>=f+a.H.presentationTimeline.g)return a.m.updateIntervalSeconds;Ij(a,b,c,e)["catch"](function(){});return null}
function Hj(a,b,c,d){if(b.za)return b.za.current();if(b.Xa||d)return b.za=b.stream.segmentIndex.kc(b.Xa?b.Xa.endTime:d),b.za&&b.za.next().value;a=a.m.inaccurateManifestTolerance;d=Math.max(c-a,0);var e=null;a&&(b.za=b.stream.segmentIndex.kc(d),e=b.za&&b.za.next().value);e||(b.za=b.stream.segmentIndex.kc(c),e=b.za&&b.za.next().value);return e}
function Ij(a,b,c,d){var e,f,g,h,k,l,m,n,p,t,v,w;return L(function(y){switch(y.g){case 1:return e=Tb,f=b.stream,g=b.za,b.hb=!0,E(y,2),z(y,Jj(a,b,d),4);case 4:qf(a.N);if(a.j)return y["return"]();h="video/mp4"==f.mimeType||"audio/mp4"==f.mimeType;k=window.ReadableStream;if(a.m.lowLatencyMode&&k&&h)return n=new Uint8Array(0),p=function(x){var D,C,B;return L(function(F){qf(a.N);if(a.j)return F["return"]();n=Kj(n,x);D=!1;C=0;(new wg).box("mdat",function(G){C=G.size+G.start;D=!0}).parse(n,!1,!0);if(!D)return F.D(0);
B=n.subarray(0,C);n=n.subarray(C);return z(F,Lj(a,b,c,f,d,B),0)})},z(y,Mj(a,b,d,p),6);l=Mj(a,b,d);return z(y,l,7);case 7:return m=y.h,qf(a.N),a.j?y["return"]():b.ac?(b.hb=!1,vj(a,b,0),y["return"]()):z(y,Lj(a,b,c,f,d,m),6);case 6:qf(a.N);if(a.j)return y["return"]();b.Xa=d;g.next();b.hb=!1;b.ve=!1;t=a.F.Y.Ib();v=t[b.type];Ya(JSON.stringify(v));b.ac||a.F.qe();vj(a,b,0);wa(y,0);break;case 2:w=H(y);qf(a.N,w);if(a.j)return y["return"]();b.hb=!1;if(7001==w.code)b.hb=!1,b.kb=null,vj(a,b,0),y.D(0);else if(b.type==
e.ua&&a.m.ignoreTextStreamFailures)a.g["delete"](e.ua),y.D(0);else if(3017==w.code)Nj(a,b,w),y.D(0);else if(1001==w.code&&w.data&&404==w.data[1])b.hb=!1,b.kb=null,vj(a,b,1),y.D(0);else return b.Pc=!0,w.severity=2,z(y,Fj(a,w),0)}})}function Kj(a,b){var c=new Uint8Array(a.length+b.length);c.set(a);c.set(b,a.length);return c}
function Nj(a,b,c){if(!Array.from(a.g.values()).some(function(e){return e!=b&&e.ve})){var d=Math.round(100*a.l);if(20<d)a.l-=.2;else if(4<d)a.l-=.04;else{b.Pc=!0;a.j=!0;a.F.onError(c);return}b.ve=!0}vj(a,b,4)}
function Jj(a,b,c){var d,e,f,g,h,k,l;return L(function(m){d=[];e=Math.max(0,c.appendWindowStart-.1);f=c.appendWindowEnd+.01;g=c.timestampOffset;if(g!=b.ee||e!=b.ce||f!=b.be)h=function(){var n;return L(function(p){if(1==p.g)return E(p,2),b.ce=e,b.be=f,b.ee=g,z(p,ri(a.F.Y,b.type,g,e,f),4);if(2!=p.g)return wa(p,0);n=H(p);b.ce=null;b.be=null;b.ee=null;throw n;})},d.push(h());!wi(c.g,b.td)&&(b.td=c.g)&&(k=Mj(a,b,c.g),l=function(){var n,p,t;return L(function(v){switch(v.g){case 1:return E(v,2),z(v,k,4);
case 4:return n=v.h,qf(a.N),p=b.stream.closedCaptions&&0<b.stream.closedCaptions.size,z(v,li(a.F.Y,b.type,n,null,null,p),5);case 5:wa(v,0);break;case 2:throw t=H(v),b.td=null,t;}})},a.F.Ug(c.startTime,c.g),d.push(l()));return z(m,Promise.all(d),0)})}
function Lj(a,b,c,d,e,f){var g;return L(function(h){if(1==h.g)return g=d.closedCaptions&&0<d.closedCaptions.size,(null!=d.emsgSchemeIdUris&&0<d.emsgSchemeIdUris.length||a.m.dispatchAllEmsgBoxes)&&(new wg).Z("emsg",function(k){var l=d.emsgSchemeIdUris;if(0===k.version){var m=k.reader.Wc();var n=k.reader.Wc();var p=k.reader.T();var t=k.reader.T();var v=k.reader.T();var w=k.reader.T();var y=e.startTime+t/p}else p=k.reader.T(),y=k.reader.xc()/p+e.timestampOffset,t=y-e.startTime,v=k.reader.T(),w=k.reader.T(),
m=k.reader.Wc(),n=k.reader.Wc();k=k.reader.Lb(k.reader.X.byteLength-k.reader.qa());if(l&&l.includes(m)||a.m.dispatchAllEmsgBoxes)"urn:mpeg:dash:event:2012"==m?a.F.Vg():(l=(new Map).set("detail",{startTime:y,endTime:y+v/p,schemeIdUri:m,value:n,timescale:p,presentationTimeDelta:t,eventDuration:v,id:w,messageData:k}),l=new O(Oj,l),a.F.onEvent(l))}).parse(f),z(h,Pj(a,b,c),2);if(3!=h.g)return qf(a.N),z(h,li(a.F.Y,b.type,f,e.startTime,e.endTime,g),3);qf(a.N);A(h)})}
function Pj(a,b,c){var d,e,f,g;return L(function(h){if(1==h.g){d=Math.max(a.m.bufferBehind,a.H.presentationTimeline.g);e=hi(a.F.Y,b.type);if(null==e)return h["return"]();f=c-e;g=f-d;return.01>=g?h["return"]():z(h,a.F.Y.remove(b.type,e,e+g),2)}qf(a.N);A(h)})}function Gj(a){return a&&a.type==Sb&&("application/cea-608"==a.stream.mimeType||"application/cea-708"==a.stream.mimeType)}
function Mj(a,b,c,d){var e,f,g,h,k;return L(function(l){if(1==l.g)return e=of,f=nj(c.Ma(),c.Ka,c.Da,a.m.retryParameters,d),g=b.stream,a.F.modifySegmentRequest(f,{type:g.type,init:c instanceof vi,duration:c.endTime-c.startTime,mimeType:g.mimeType,codecs:g.codecs,bandwidth:g.bandwidth}),h=a.F.Wb.request(e,f),b.Ra=h,z(l,h.promise,2);k=l.h;b.Ra=null;return l["return"](k.data)})}
function Bj(a,b,c,d){var e,f;return L(function(g){if(1==g.g)return b.ac=!1,b.Hd=!1,b.md=0,b.Ic=!0,b.Xa=null,b.td=null,b.za=null,d?(e=a.F.rd(),f=a.F.Y.getDuration(),z(g,a.F.Y.remove(b.type,e+d,f),3)):z(g,qi(a.F.Y,b.type),4);if(3!=g.g)return qf(a.N),c?z(g,a.F.Y.flush(b.type),3):g.D(3);qf(a.N);b.Ic=!1;b.endOfStream=!1;vj(a,b,0);A(g)})}
function vj(a,b,c){var d=b.type;if(d!=Sb||a.g.has(d))b.kb=(new Dd(function(){var e;return L(function(f){if(1==f.g)return E(f,2),z(f,a.Tc(b),4);if(2!=f.g)return wa(f,0);e=H(f);if(a.F)a.F.onError(e);A(f)})})).U(c)}function qj(a){null!=a.kb&&(a.kb.stop(),a.kb=null)}function rj(a){return L(function(b){return a.Ra?z(b,a.Ra.abort(),0):b.D(0)})}function Fj(a,b){return L(function(c){if(1==c.g)return z(c,Se(a.B),2);qf(a.N);a.F.onError(b);b.handled||a.m.failureCallback(b);A(c)})};function Qj(a,b){var c=Rj(),d=this;this.j=b;this.i=a;this.l=c;this.B=null;this.s=[];this.h=this.g=null;this.C=Promise.resolve().then(function(){return Sj(d)});this.N=new pf(function(){return Tj(d)})}Qj.prototype.destroy=function(){return this.N.destroy()};function Tj(a){var b,c,d;return L(function(e){if(1==e.g)return a.h&&a.h.abort(),Uj(a),z(e,a.C,2);a.g&&a.g.gb.Xb();b=r(a.s);for(c=b.next();!c.done;c=b.next())d=c.value,d.gb.Xb();a.g=null;a.s=[];a.j=null;A(e)})}
function Vj(a,b){var c={uc:function(){},vd:function(){},Xb:function(){},onError:function(){},xd:function(){},Ui:function(){}};a.s.push({create:b,gb:c});a.h&&a.h.abort();Uj(a);return c}
function Sj(a){return L(function(b){if(a.N.g)b=b.D(0);else{if(0==a.s.length||a.g&&!a.g.Rb)var c=!1;else{a.g&&(a.g.gb.Xb(),a.g=null);c=a.s.shift();var d=c.create(a.l);d?(c.gb.uc(),a.g={node:d.node,payload:d.payload,Rb:d.Rb,gb:c.gb}):c.gb.xd();c=!0}c?c=Promise.resolve():a.g?c=Wj(a):(a.j.Tg(a.i),a.B=new Wc,c=a.B);b=z(b,c,1)}return b})}
function Wj(a){var b,c;return L(function(d){switch(d.g){case 1:return a.i=a.j.xg(a.i,a.l,a.g.node,a.g.payload),E(d,2),a.h=a.j.$f(a.i,a.l,a.g.payload),z(d,a.h.promise,4);case 4:a.h=null;a.i==a.g.node&&(a.g.gb.vd(),a.g=null);wa(d,0);break;case 2:b=H(d);if(7001==b.code)a.g.gb.Xb();else a.g.gb.onError(b);a.g=null;a.h=null;c=a;return z(d,a.j.handleError(a.l,b),5);case 5:c.i=d.h,A(d)}})}function Uj(a){a.B&&(a.B.resolve(),a.B=null)};function Xj(a){this.g=null;for(var b=r(Array.from(a.textTracks)),c=b.next();!c.done;c=b.next())c=c.value,c.mode="disabled","Shaka Player TextTrack"==c.label&&(this.g=c);this.g||(this.g=a.addTextTrack("subtitles","Shaka Player TextTrack"));this.g.mode="hidden"}q=Xj.prototype;q.remove=function(a,b){if(!this.g)return!1;Yj(this.g,function(c){return c.startTime<b&&c.endTime>a});return!0};
q.append=function(a){function b(g){var h=[],k=700<=g.fontWeight,l="italic"==g.fontStyle,m=g.textDecoration.includes("underline");k&&h.push("b");l&&h.push("i");m&&h.push("u");k=h.reduce(function(n,p){return n+"<"+p+">"},"");h=h.reduceRight(function(n,p){return n+"</"+p+">"},"");return g.lineBreak||g.spacer?(g.spacer&&Fb("shaka.extern.Cue","Please use lineBreak instead of spacer."),"\n"):g.nestedCues.length?g.nestedCues.map(b).join(""):k+g.payload+h}var c=a.map(function(g){if(g.nestedCues.length){var h=
g.clone();h.nestedCues=[];h.payload=b(g);return h}return g}),d=[];a=this.g.cues?Array.from(this.g.cues):[];var e={};c=r(c);for(var f=c.next();!f.done;e={dc:e.dc},f=c.next())e.dc=f.value,a.some(function(g){return function(h){return h.startTime==g.dc.startTime&&h.endTime==g.dc.endTime&&h.text==g.dc.payload?!0:!1}}(e))||(f=Zj(e.dc))&&d.push(f);a=d.slice().sort(function(g,h){return g.startTime!=h.startTime?g.startTime-h.startTime:g.endTime!=h.endTime?g.endTime-h.startTime:"line"in VTTCue.prototype?d.indexOf(h)-
d.indexOf(g):d.indexOf(g)-d.indexOf(h)});a=r(a);for(e=a.next();!e.done;e=a.next())this.g.addCue(e.value)};q.destroy=function(){this.g&&(Yj(this.g,function(){return!0}),this.g.mode="disabled");this.g=null;return Promise.resolve()};q.isTextVisible=function(){return"showing"==this.g.mode};q.setTextVisibility=function(a){this.g.mode=a?"showing":"hidden"};
function Zj(a){if(a.startTime>=a.endTime)return null;var b=new VTTCue(a.startTime,a.endTime,a.payload);b.lineAlign=a.lineAlign;b.positionAlign=a.positionAlign;a.size&&(b.size=a.size);try{b.align=a.textAlign}catch(c){}"center"==a.textAlign&&"center"!=b.align&&(b.align="middle");"vertical-lr"==a.writingMode?b.vertical="lr":"vertical-rl"==a.writingMode&&(b.vertical="rl");1==a.lineInterpretation&&(b.snapToLines=!1);null!=a.line&&(b.line=a.line);null!=a.position&&(b.position=a.position);return b}
function Yj(a,b){var c=a.mode;a.mode="showing"==c?"showing":"hidden";for(var d=r(Array.from(a.cues)),e=d.next();!e.done;e=d.next())(e=e.value)&&b(e)&&a.removeCue(e);a.mode=c}N("shaka.text.SimpleTextDisplayer",Xj);Xj.prototype.setTextVisibility=Xj.prototype.setTextVisibility;Xj.prototype.isTextVisible=Xj.prototype.isTextVisible;Xj.prototype.destroy=Xj.prototype.destroy;Xj.prototype.append=Xj.prototype.append;Xj.prototype.remove=Xj.prototype.remove;function ak(){}function S(a){return document.createElement(a)}function bk(){return document.createElement("button")}function ck(a){for(;a.firstChild;)a.removeChild(a.firstChild)}N("shaka.util.Dom",ak);ak.removeAllChildren=ck;function dk(a,b){var c=this;this.s=!1;this.l=[];this.g=a;this.C=b;this.i=S("div");this.i.classList.add("shaka-text-container");this.i.style.textAlign="center";this.i.style.display="flex";this.i.style.flexDirection="column";this.i.style.alignItems="center";this.i.style.justifyContent="flex-end";this.C.appendChild(this.i);this.G=(new Q(function(){ek(c)})).na(.25);this.j=new Map;this.h=new rf;this.h.o(document,"fullscreenchange",function(){ek(c,!0)});this.B=null;"ResizeObserver"in window&&(this.B=new ResizeObserver(function(){ek(c,
!0)}),this.B.observe(this.i))}q=dk.prototype;q.append=function(a){var b=[].concat(ja(this.l)),c={};a=r(a);for(var d=a.next();!d.done;c={$c:c.$c},d=a.next())c.$c=d.value,b.some(function(e){return function(f){return Cc(f,e.$c)}}(c))||this.l.push(c.$c);ek(this)};q.destroy=function(){this.C.removeChild(this.i);this.i=null;this.s=!1;this.l=[];this.G&&this.G.stop();this.j.clear();this.h&&(this.h.release(),this.h=null);this.B&&(this.B.disconnect(),this.B=null)};
q.remove=function(a,b){if(!this.i)return!1;var c=this.l.length;this.l=this.l.filter(function(d){return d.startTime<a||d.endTime>=b});ek(this,c>this.l.length);return!0};q.isTextVisible=function(){return this.s};q.setTextVisibility=function(a){this.s=a};
function fk(a,b,c,d,e){var f=!1,g=[],h=[];b=r(b);for(var k=b.next();!k.done;k=b.next()){k=k.value;e.push(k);var l=a.j.get(k),m=k.startTime<=d&&k.endTime>d,n=l?l.Mf:null;l&&(g.push(l.Ze),m||(f=!0,a.j["delete"](k),l=null));m&&(h.push(k),l||(gk(a,k,e),l=a.j.get(k),n=l.Mf,f=!0));0<k.nestedCues.length&&n&&fk(a,k.nestedCues,n,d,e);e.pop()}if(f){d=r(g);for(e=d.next();!e.done;e=d.next())c.removeChild(e.value);h.sort(function(p,t){return p.startTime!=t.startTime?p.startTime-t.startTime:p.endTime-t.endTime});
h=r(h);for(k=h.next();!k.done;k=h.next())d=a.j.get(k.value),c.appendChild(d.Ze)}}function ek(a,b){if(a.i){var c=a.g.currentTime;(!a.s||(void 0===b?0:b))&&0<a.j.size&&(ck(a.i),a.j.clear());if(a.s){for(var d=new Map,e=r(a.j.keys()),f=e.next();!f.done;f=e.next())f=f.value,d.set(f,a.j.get(f));fk(a,a.l,a.i,c,[])}}}
function gk(a,b,c){var d=1<c.length,e=d?"span":"div";if(b.lineBreak||b.spacer)b.spacer&&Fb("shaka.extern.Cue","Please use lineBreak instead of spacer."),e="br";d=!d&&0<b.nestedCues.length;var f=S(e);"br"!=e&&hk(a,f,b,c,d);c=f;d&&(c=S("span"),c.classList.add("shaka-text-wrapper"),c.style.backgroundColor=b.backgroundColor,f.appendChild(c));a.j.set(b,{Ze:f,Mf:c})}
function hk(a,b,c,d,e){var f=b.style,g=0==c.nestedCues.length,h=1<d.length;f.whiteSpace="pre-wrap";var k=c.payload.replace(/\s+$/g,function(m){return"\u00a0".repeat(m.length)});f.webkitTextStrokeColor=c.textStrokeColor;f.webkitTextStrokeWidth=c.textStrokeWidth;f.color=c.color;f.direction=c.direction;f.opacity=c.opacity;f.paddingLeft=ik(c.linePadding,c,a.C);f.paddingRight=ik(c.linePadding,c,a.C);if(c.backgroundImage)f.backgroundImage="url('"+c.backgroundImage+"')",f.backgroundRepeat="no-repeat",f.backgroundSize=
"contain",f.backgroundPosition="center";else{if(c.nestedCues.length)var l=b;else l=S("span"),b.appendChild(l);c.border&&(l.style.border=c.border);e||((b=jk(d,function(m){return m.backgroundColor}))?l.style.backgroundColor=b:k&&(l.style.backgroundColor="rgba(0, 0, 0, 0.8)"));k&&(l.textContent=k)}h&&!d[d.length-1].isContainer?f.display="inline":(f.display="flex",f.flexDirection="column",f.alignItems="center",f.justifyContent="before"==c.displayAlign?"flex-start":"center"==c.displayAlign?"center":"flex-end");
g||(f.margin="0");f.fontFamily=c.fontFamily;f.fontWeight=c.fontWeight.toString();f.fontStyle=c.fontStyle;f.letterSpacing=c.letterSpacing;f.fontSize=ik(c.fontSize,c,a.C);c.line?1==c.lineInterpretation&&(f.position="absolute",f.left="0",f.top="0",c.writingMode==wc?(f.width="100%",c.lineAlign==yc?f.top=c.line+"%":"end"==c.lineAlign&&(f.bottom=c.line+"%")):"vertical-lr"==c.writingMode?(f.height="100%",c.lineAlign==yc?f.left=c.line+"%":"end"==c.lineAlign&&(f.right=c.line+"%")):(f.height="100%",c.lineAlign==
yc?f.right=c.line+"%":"end"==c.lineAlign&&(f.left=c.line+"%"))):c.region&&c.region.id&&(a=c.region.widthUnits==Jc?"%":"px",d=c.region.viewportAnchorUnits==Jc?"%":"px",f.height=c.region.height+(c.region.heightUnits==Jc?"%":"px"),f.width=c.region.width+a,f.position="absolute",f.top=c.region.viewportAnchorY+d,f.left=c.region.viewportAnchorX+d);f.lineHeight=c.lineHeight;c.position&&(c.writingMode==wc?f.paddingLeft=c.position:f.paddingTop=c.position);"line-left"==c.positionAlign?f.cssFloat="left":"line-right"==
c.positionAlign&&(f.cssFloat="right");f.textAlign=c.textAlign;f.textDecoration=c.textDecoration.join(" ");f.writingMode=c.writingMode;"writingMode"in document.documentElement.style&&f.writingMode==c.writingMode||(f.webkitWritingMode=c.writingMode);c.size&&(c.writingMode==wc?f.width=c.size+"%":f.height=c.size+"%")}
function ik(a,b,c){var d=(d=(new RegExp(/(\d*\.?\d+)([a-z]+|%+)/)).exec(a))?{value:Number(d[1]),ph:d[2]}:null;if(!d)return a;var e=d.value;switch(d.ph){case "%":return e/100*c.clientHeight/b.cellResolution.rows+"px";case "c":return c.clientHeight*e/b.cellResolution.rows+"px";default:return a}}function jk(a,b){for(var c=a.length-1;0<=c;c--){var d=b(a[c]);if(d||0===d)return d}return null}N("shaka.text.UITextDisplayer",dk);dk.prototype.setTextVisibility=dk.prototype.setTextVisibility;
dk.prototype.isTextVisible=dk.prototype.isTextVisible;dk.prototype.remove=dk.prototype.remove;dk.prototype.destroy=dk.prototype.destroy;dk.prototype.append=dk.prototype.append;function kk(a,b){function c(h){for(var k=h,l=r(b),m=l.next();!m.done;m=l.next())m=m.value,m.end&&m.start<h&&(k+=m.end-m.start);h=Math.floor(k/3600);l=Math.floor(k/60%60);m=Math.floor(k%60);k=Math.floor(1E3*k%1E3);return(10>h?"0":"")+h+":"+(10>l?"0":"")+l+":"+(10>m?"0":"")+m+"."+(100>k?10>k?"00":"0":"")+k}function d(h){var k=[],l=700<=h.fontWeight,m="italic"==h.fontStyle,n=h.textDecoration.includes("underline");l&&k.push("b");m&&k.push("i");n&&k.push("u");l=k.reduce(function(p,t){return p+"<"+t+">"},
"");k=k.reduceRight(function(p,t){return p+"</"+t+">"},"");return h.lineBreak||h.spacer?(h.spacer&&Fb("shaka.text.Cue","Please use lineBreak instead of spacer."),"\n"):h.nestedCues.length?h.nestedCues.map(d).join(""):l+h.payload+k}var e=a.map(function(h){if(h.nestedCues.length){var k=h.clone();k.nestedCues=[];k.payload=d(h);return k}return h}),f="WEBVTT\n\n";e=r(e);for(var g=e.next();!g.done;g=e.next())g=g.value,f+=c(g.startTime)+" --\x3e "+c(g.endTime)+function(h){var k=[];switch(h.textAlign){case "left":k.push("align:left");
break;case "right":k.push("align:right");break;case vc:k.push("align:middle");break;case "start":k.push("align:start");break;case "end":k.push("align:end")}switch(h.writingMode){case "vertical-lr":k.push("vertical:lr");break;case "vertical-rl":k.push("vertical:rl")}return k.length?" "+k.join(" "):""}(g)+"\n",f+=g.payload+"\n\n";return f}N("shaka.text.WebVttGenerator",function(){});function lk(a,b){this.F=a;this.m=b;this.h="";this.l=void 0;this.g=!1;this.j=!0;this.i=!1}function mk(a,b,c){try{if(a.m.enabled){var d={d:1E3*c.duration,st:a.F.W()?nk:ok};d.ot=pk(c);var e=d.ot===qk||d.ot===rk||d.ot===sk||d.ot===tk;e&&(d.bl=uk(a,c.type));c.bandwidth&&(d.br=c.bandwidth/1E3);e&&d.ot!==tk&&(d.tb=vk(a,d.ot)/1E3);wk(a,b,d)}}catch(f){Ua("CMCD_SEGMENT_ERROR","Could not generate segment CMCD data.",f)}}
function xk(a,b,c){try{if(!a.m.enabled)return b;var d=yk(a);a:{switch(c){case "video/webm":case "video/mp4":var e=sk;break a;case "application/x-mpegurl":e=zk;break a}e=void 0}d.ot=e;d.su=!0;var f=Ak(d);return Bk(b,f)}catch(g){return Ua("CMCD_SRC_ERROR","Could not generate src CMCD data.",g),b}}function Ck(a,b){try{if(!a.m.enabled)return b;var c=yk(a);c.ot=Dk;c.su=!0;var d=Ak(c);return Bk(b,d)}catch(e){return Ua("CMCD_TEXT_TRACK_ERROR","Could not generate text track CMCD data.",e),b}}
function yk(a){a.h||(a.h=a.m.sessionId||window.crypto.randomUUID());return{v:1,sf:a.l,sid:a.h,cid:a.m.contentId,mtp:a.F.getBandwidthEstimate()/1E3}}function wk(a,b,c){c=void 0===c?{}:c;var d=void 0===d?a.m.useHeaders:d;if(a.m.enabled){Object.assign(c,yk(a));c.pr=a.F.Jb();var e=c.ot===qk||c.ot===sk;a.i&&e&&(c.bs=!0,c.su=!0,a.i=!1);null==c.su&&(c.su=a.j);if(d)a=Ek(c),Object.keys(a).length&&Object.assign(b.headers,a);else{var f=Ak(c);f&&(b.uris=b.uris.map(function(g){return Bk(g,f)}))}}}
function pk(a){var b=a.type;if(a.init)return Fk;if("video"==b)return a.codecs.includes(",")?sk:qk;if("audio"==b)return rk;if("text"==b)return"application/mp4"===a.mimeType?tk:Dk}function uk(a,b){var c=a.F.Ib()[b];if(!c.length)return NaN;var d=a.F.kg();return(c=c.find(function(e){return e.start<=d&&e.end>=d}))?1E3*(c.end-d):NaN}
function vk(a,b){var c=a.F.fb();if(!c.length)return NaN;var d=c[0];c=r(c);for(var e=c.next();!e.done;e=c.next())e=e.value,"variant"===e.type&&e.bandwidth>d.bandwidth&&(d=e);switch(b){case qk:return d.videoBandwidth||NaN;case rk:return d.audioBandwidth||NaN;default:return d.bandwidth}}
function Ak(a){function b(n){return 100*c(n/100)}function c(n){return Math.round(n)}function d(n){return!Number.isNaN(n)&&null!=n&&""!==n&&!1!==n}var e=[],f={br:c,d:c,bl:b,dl:b,mtp:b,nor:function(n){return encodeURIComponent(n)},rtp:b,tb:c},g=Object.keys(a||{}).sort();g=r(g);for(var h=g.next();!h.done;h=g.next()){h=h.value;var k=a[h];if(d(k)&&("v"!==h||1!==k)&&("pr"!=h||1!==k)){var l=f[h];l&&(k=l(k));l=typeof k;var m=void 0;m="string"===l&&"ot"!==h&&"sf"!==h&&"st"!==h?h+"="+JSON.stringify(k):"boolean"===
l?h:"symbol"===l?h+"="+k.description:h+"="+k;e.push(m)}}return e.join(",")}function Ek(a){var b=Object.keys(a),c={},d=["Object","Request","Session","Status"],e=[{},{},{},{}],f={br:0,d:0,ot:0,tb:0,bl:1,dl:1,mtp:1,nor:1,nrr:1,su:1,cid:2,pr:2,sf:2,sid:2,st:2,v:2,bs:3,rtp:3};b=r(b);for(var g=b.next();!g.done;g=b.next())g=g.value,e[null!=f[g]?f[g]:1][g]=a[g];for(a=0;a<e.length;a++)(f=Ak(e[a]))&&(c["CMCD-"+d[a]]=f);return c}
function Bk(a,b){if(!b||a.includes("offline:"))return a;var c=new qb(a);c.g.set("CMCD",b);return c.toString()}var zk="m",rk="a",qk="v",sk="av",Fk="i",Dk="c",tk="tt",ok="v",nk="l";N("shaka.util.CmcdManager.StreamingFormat",{Hh:"d",Vh:"h",Ci:"s",ki:"o"});function Gk(){}
function Hk(a,b,c,d,e){var f=e in d,g=!0,h;for(h in b){var k=e+"."+h,l=f?d[e]:c[h];f||h in c?void 0===b[h]?void 0===l||f?delete a[h]:a[h]=$e(l):l.constructor==Object&&b[h]&&b[h].constructor==Object?(a[h]||(a[h]=$e(l)),k=Hk(a[h],b[h],l,d,k),g=g&&k):typeof b[h]!=typeof l||null==b[h]||"function"!=typeof b[h]&&b[h].constructor!=l.constructor?(Sa("Invalid config, wrong type for "+k),g=!1):("function"==typeof c[h]&&c[h].length!=b[h].length&&Ta("Unexpected number of arguments for "+k),a[h]=b[h]):(Sa("Invalid config, unrecognized key "+
k),g=!1)}return g}function Ik(a,b){for(var c={},d=c,e=0,f=0;;){e=a.indexOf(".",e);if(0>e)break;if(0==e||"\\"!=a[e-1])f=a.substring(f,e).replace(/\\\./g,"."),d[f]={},d=d[f],f=e+1;e+=1}d[a.substring(f).replace(/\\\./g,".")]=b;return c}N("shaka.util.ConfigUtils",Gk);Gk.convertToConfigObject=Ik;Gk.mergeConfigObjects=Hk;function Jk(){}
function Kk(){var a=Infinity;navigator.connection&&navigator.connection.saveData&&(a=360);var b={retryParameters:Re(),servers:{},clearKeys:{},advanced:{},delayLicenseRequestUntilPlayed:!1,initDataTransform:dg,logLicenseExchange:!1,updateExpirationTime:1,preferredKeySystems:[]},c={retryParameters:Re(),availabilityWindowOverride:NaN,disableAudio:!1,disableVideo:!1,disableText:!1,disableThumbnails:!1,defaultPresentationDelay:0,dash:{clockSyncUri:"",ignoreDrmInfo:!1,disableXlinkProcessing:!1,xlinkFailGracefully:!1,
ignoreMinBufferTime:!1,autoCorrectDrift:!0,initialSegmentLimit:1E3,ignoreSuggestedPresentationDelay:!1,ignoreEmptyAdaptationSet:!1,ignoreMaxSegmentDuration:!1,keySystemsByURI:{"urn:uuid:1077efec-c0b2-4d02-ace3-3c1e52e2fb4b":"org.w3.clearkey","urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed":"com.widevine.alpha","urn:uuid:9a04f079-9840-4286-ab92-e65be0885f95":"com.microsoft.playready","urn:uuid:79f0049a-4098-8642-ab92-e65be0885f95":"com.microsoft.playready","urn:uuid:f239e769-efa3-4850-9c16-a903c6932efb":"com.adobe.primetime"},
manifestPreprocessor:function(g){return g}},hls:{ignoreTextStreamFailures:!1,ignoreImageStreamFailures:!1,useFullSegmentsForStartTime:!1,defaultAudioCodec:"mp4a.40.2",defaultVideoCodec:"avc1.42E01E"}},d={retryParameters:Re(),failureCallback:function(g){return[g]},rebufferingGoal:2,bufferingGoal:10,bufferBehind:30,ignoreTextStreamFailures:!1,alwaysStreamText:!1,startAtSegmentBoundary:!1,gapDetectionThreshold:.1,smallGapLimit:.5,jumpLargeGaps:!1,durationBackoff:1,forceTransmuxTS:!1,safeSeekOffset:5,
stallEnabled:!0,stallThreshold:1,stallSkip:.1,useNativeHlsOnSafari:!0,inaccurateManifestTolerance:2,lowLatencyMode:!1,autoLowLatencyMode:!1,forceHTTPS:!1,preferNativeHls:!1,updateIntervalSeconds:1,dispatchAllEmsgBoxes:!1,observeQualityChanges:!1};if(navigator.userAgent.match(/Edge\//)||Hd()||Jd())d.gapDetectionThreshold=.5;if(Id("Web0S")||Hd()||Jd())d.stallSkip=0;var e={trackSelectionCallback:function(g){return L(function(h){return h["return"](g)})},downloadSizeCallback:function(g){var h;return L(function(k){if(1==
k.g)return navigator.storage&&navigator.storage.estimate?z(k,navigator.storage.estimate(),3):k["return"](!0);h=k.h;return k["return"](h.usage+g<.95*h.quota)})},progressCallback:function(g,h){return[g,h]},usePersistentLicense:!0},f={drm:b,manifest:c,streaming:d,offline:e,abrFactory:function(){return new ze},abr:{enabled:!0,useNetworkInformation:!0,defaultBandwidthEstimate:1E6,switchInterval:8,bandwidthUpgradeTarget:.85,bandwidthDowngradeTarget:.95,restrictions:{minWidth:0,maxWidth:Infinity,minHeight:0,
maxHeight:a,minPixels:0,maxPixels:Infinity,minFrameRate:0,maxFrameRate:Infinity,minBandwidth:0,maxBandwidth:Infinity},advanced:{minTotalBytes:128E3,minBytes:16E3,fastHalfLife:2,slowHalfLife:5}},preferredAudioLanguage:"",preferredTextLanguage:"",preferredVariantRole:"",preferredTextRole:"",preferredAudioChannelCount:2,preferredVideoCodecs:[],preferredAudioCodecs:[],preferForcedSubs:!1,preferredDecodingAttributes:[],restrictions:{minWidth:0,maxWidth:Infinity,minHeight:0,maxHeight:Infinity,minPixels:0,
maxPixels:Infinity,minFrameRate:0,maxFrameRate:Infinity,minBandwidth:0,maxBandwidth:Infinity},playRangeStart:0,playRangeEnd:Infinity,textDisplayFactory:function(){return null},cmcd:{enabled:!1,sessionId:"",contentId:"",useHeaders:!1}};e.trackSelectionCallback=function(g){return L(function(h){return h["return"](Lk(g,f.preferredAudioLanguage))})};return f}
function Mk(a,b,c){var d={".drm.servers":"",".drm.clearKeys":"",".drm.advanced":{distinctiveIdentifierRequired:!1,persistentStateRequired:!1,videoRobustness:"",audioRobustness:"",sessionType:"",serverCertificate:new Uint8Array(0),serverCertificateUri:"",individualizationServer:""}};return Hk(a,b,c||Kk(),d,"")}
function Lk(a,b){var c=a.filter(function(h){return"variant"==h.type}),d=[],e=dc(b,c.map(function(h){return h.language}));e&&(d=c.filter(function(h){return Wb(h.language)==e}));0==d.length&&(d=c.filter(function(h){return h.primary}));0==d.length&&(c.map(function(h){return h.language}),d=c);var f=d.filter(function(h){return h.height&&480>=h.height});f.length&&(f.sort(function(h,k){return k.height-h.height}),d=f.filter(function(h){return h.height==f[0].height}));c=[];if(d.length){var g=Math.floor(d.length/
2);d.sort(function(h,k){return h.bandwidth-k.bandwidth});c.push(d[g])}d=r(a);for(g=d.next();!g.done;g=d.next())g=g.value,g.type!=Sb&&"image"!=g.type||c.push(g);return c}N("shaka.util.PlayerConfiguration",Jk);Jk.mergeConfigObjects=Mk;function Nk(){this.g=null;this.h=[]}function Ok(a,b){if(null==a.g)a.g={timestamp:Date.now()/1E3,state:b,duration:0};else{var c=Date.now()/1E3;a.g.duration=c-a.g.timestamp;a.g.state!=b&&(a.h.push(a.g),a.g={timestamp:c,state:b,duration:0})}}function Pk(a,b){var c=0;a.g&&a.g.state==b&&(c+=a.g.duration);for(var d=r(a.h),e=d.next();!e.done;e=d.next())e=e.value,c+=e.state==b?e.duration:0;return c}
function Qk(a){function b(f){return{timestamp:f.timestamp,state:f.state,duration:f.duration}}for(var c=[],d=r(a.h),e=d.next();!e.done;e=d.next())c.push(b(e.value));a.g&&c.push(b(a.g));return c};function Rk(){this.i=this.h=null;this.g=[]}function Sk(a,b,c){a.i!=b&&(a.i=b,a.g.push({timestamp:Date.now()/1E3,id:b.id,type:"text",fromAdaptation:c,bandwidth:null}))};function Tk(){this.B=this.C=this.L=this.I=this.s=this.j=this.J=this.l=this.i=this.M=this.P=this.S=this.G=this.ea=NaN;this.g=new Nk;this.h=new Rk};function T(a,b){db.call(this);var c=this;this.l=Uk;this.Db=this.g=null;this.ha=!1;this.h=new rf;this.nc=this.B=this.bb=this.H=this.Eb=this.C=this.i=this.ia=this.P=this.Gb=this.L=this.zb=this.J=this.Ca=this.I=this.M=this.s=this.V=null;this.se=1E9;this.m=Vk(this);this.oe={width:Infinity,height:Infinity};this.j=null;this.sa=new Ie(this.m.preferredAudioLanguage,this.m.preferredVariantRole,this.m.preferredAudioChannelCount);this.Aa=this.m.preferredTextLanguage;this.ob=this.m.preferredTextRole;this.cb=
this.m.preferForcedSubs;this.Zd=[];this.pb=null;b&&b(this);this.V=Wk(this);this.V.Ee(this.m.streaming.forceHTTPS);this.G=null;Xk&&(this.G=Mb(Xk));this.h.o(window,"online",function(){c.we()});this.Pa={name:"detach"};this.qb={name:"attach"};this.$={name:"unload"};this.ue={name:"manifest-parser"};this.ke={name:"manifest"};this.Ba={name:"media-source"};this.ae={name:"drm-engine"};this.S={name:"load"};this.xe={name:"src-equals-drm-engine"};this.Ua={name:"src-equals"};var d=new Map;d.set(this.qb,function(e,
f){return Xe(Yk(c,e,f))});d.set(this.Pa,function(e){e.K&&(c.h.Ta(e.K,"error"),e.K=null);c.G&&c.G.release();c.g=null;e=Promise.resolve();return Xe(e)});d.set(this.$,function(e){return Xe(Zk(c,e))});d.set(this.Ba,function(e){e=$k(c,e);return Xe(e)});d.set(this.ue,function(e,f){var g=al(c,e,f);return Xe(g)});d.set(this.ke,function(e){return bl(c,e)});d.set(this.ae,function(e){e=cl(c,e);return Xe(e)});d.set(this.S,function(e,f){return Xe(dl(c,e,f))});d.set(this.xe,function(e,f){var g=el(c,e,f);return Xe(g)});
d.set(this.Ua,function(e,f){return fl(c,e,f)});this.ka=new Qj(this.Pa,{xg:function(e,f,g,h){var k=null;e==c.Pa&&(k=g==c.Pa?c.Pa:c.qb);e==c.qb&&(k=g==c.Pa||f.K!=h.K?c.Pa:g==c.qb?c.qb:g==c.Ba||g==c.S?c.Ba:g==c.Ua?c.xe:null);e==c.Ba&&(k=g==c.S&&f.K==h.K?c.ue:c.$);e==c.ue&&(k=gl(c.S,c.ke,c.$,g,f,h));e==c.ke&&(k=gl(c.S,c.ae,c.$,g,f,h));e==c.ae&&(k=gl(c.S,c.S,c.$,g,f,h));e==c.xe&&(k=g==c.Ua&&f.K==h.K?c.Ua:c.$);if(e==c.S||e==c.Ua)k=c.$;e==c.$&&(k=h.K&&f.K==h.K?c.qb:c.Pa);return k},$f:function(e,f,g){c.dispatchEvent(hl(il,
(new Map).set("state",e.name)));return d.get(e)(f,g)},handleError:function(e){return L(function(f){return 1==f.g?z(f,Zk(c,e),2):f["return"](e.K?c.qb:c.Pa)})},Tg:function(e){c.dispatchEvent(hl(jl,(new Map).set("state",e.name)))}});a&&this.Hc(a,!0)}u(T,db);function hl(a,b){return new O(a,b)}q=T.prototype;
q.destroy=function(){var a=this,b;return L(function(c){switch(c.g){case 1:if(a.l==kl)return c["return"]();a.l=kl;b=Vj(a.ka,function(){return{node:a.Pa,payload:Rj(),Rb:!1}});return z(c,new Promise(function(d){b.uc=function(){};b.vd=function(){d()};b.Xb=function(){d()};b.onError=function(){d()};b.xd=function(){d()}}),2);case 2:return z(c,a.ka.destroy(),3);case 3:a.h&&(a.h.release(),a.h=null);a.nc=null;a.B=null;a.m=null;a.j=null;a.Db=null;a.P=null;if(!a.V){c.D(4);break}return z(c,a.V.destroy(),5);case 5:a.V=
null;case 4:db.prototype.release.call(a),A(c)}})};
function ll(){window.Promise||Ta("A Promise implementation or polyfill is required");window.TextDecoder&&window.TextEncoder||Ta("A TextDecoder/TextEncoder implementation or polyfill is required");if(!(window.Promise&&window.Uint8Array&&window.TextDecoder&&window.TextEncoder&&Array.prototype.forEach)||Id("Trident/"))return!1;var a=Ld();return a&&12>a||!(window.MediaKeys&&window.navigator&&window.navigator.requestMediaKeySystemAccess&&window.MediaKeySystemAccess&&window.MediaKeySystemAccess.prototype.getConfiguration)?
!1:Ed()?!0:Fd("application/x-mpegurl")}q.Hc=function(a,b){b=void 0===b?!0:b;if(this.l==kl)return Promise.reject(ml());var c=Rj();c.K=a;Ed()||(b=!1);var d=b?this.Ba:this.qb,e=Vj(this.ka,function(){return{node:d,payload:c,Rb:!1}});e.uc=function(){};return nl(e)};q.detach=function(){var a=this;if(this.l==kl)return Promise.reject(ml());var b=Vj(this.ka,function(){return{node:a.Pa,payload:Rj(),Rb:!1}});b.uc=function(){};return nl(b)};
q.Qe=function(a){var b=this;a=void 0===a?!0:a;if(this.l==kl)return Promise.reject(ml());Ed()||(a=!1);var c=Rj(),d=Vj(this.ka,function(e){var f=e.K&&a?b.Ba:e.K?b.qb:b.Pa;c.K=e.K;return{node:f,payload:c,Rb:!1}});d.uc=function(){};return nl(d)};q.vh=function(a){this.pb=a};
q.load=function(a,b,c){var d=this;this.pb=null;if(this.l==kl)return Promise.reject(ml());this.dispatchEvent(hl(ol));var e=Rj();e.uri=a;e.Le=Date.now()/1E3;c&&(e.mimeType=c);void 0!==b&&(e.startTime=b);var f=pl(this,e)?this.Ua:this.S,g=Vj(this.ka,function(h){if(null==h.K)return null;e.K=h.K;return{node:f,payload:e,Rb:!0}});this.j=new Tk;this.P=ql(this);g.uc=function(){};return new Promise(function(h,k){g.xd=function(){return k(new P(2,7,7002))};g.vd=function(){h();d.dispatchEvent(hl(rl))};g.Xb=function(){return k(ml())};
g.onError=function(l){return k(l)}})};function pl(a,b){if(!Ed())return!0;var c=b.mimeType,d=b.uri||"";c||(c=qg(d),c=sl[c]);if(c){if(""==(b.K||Gd()).canPlayType(c))return!1;if(!Ed()||!(c in pg||qg(d)in rg)||a.m.streaming.preferNativeHls)return!0;if(Kd())return a.m.streaming.useNativeHlsOnSafari}return!1}function Yk(a,b,c){null==b.K&&(b.K=c.K,a.h.o(b.K,"error",function(){var d=tl(a);d&&ul(a,d)}));a.g=b.K;return Promise.resolve()}
function Zk(a,b){var c,d,e,f,g,h,k,l,m;return L(function(n){switch(n.g){case 1:return a.l!=kl&&(a.l=Uk),c=a.Zd.map(function(p){return p()}),a.Zd=[],z(n,Promise.all(c),2);case 2:a.dispatchEvent(hl(vl));b.mimeType=null;b.startTime=null;b.uri=null;b.K&&(a.h.Ta(b.K,"loadedmetadata"),a.h.Ta(b.K,"playing"),a.h.Ta(b.K,"pause"),a.h.Ta(b.K,"ended"),a.h.Ta(b.K,"ratechange"));a.Ca&&(a.Ca.release(),a.Ca=null);a.zb&&(a.zb.stop(),a.zb=null);if(!a.C){n.D(3);break}return z(n,a.C.stop(),4);case 4:a.C=null,a.Eb=null;
case 3:if(!a.B){n.D(5);break}return z(n,a.B.stop(),5);case 5:if(!a.i){n.D(7);break}return z(n,a.i.destroy(),8);case 8:a.i=null;case 7:a.J&&(a.J.release(),a.J=null);a.I&&(a.I.release(),a.I=null);if(!a.M){n.D(9);break}return z(n,a.M.destroy(),10);case 10:a.M=null;case 9:if(a.G)a.G.onAssetUnload();if(!b.K||!b.K.src){n.D(11);break}return z(n,new Promise(function(p){return(new Q(p)).U(.1)}),12);case 12:for(b.K.removeAttribute("src"),b.K.load();b.K.lastChild;)b.K.removeChild(b.K.firstChild);case 11:if(!a.s){n.D(13);
break}return z(n,a.s.destroy(),14);case 14:a.s=null;case 13:a.bb=null;a.L=null;if(a.H){d=r(a.H.variants);for(e=d.next();!e.done;e=d.next())for(f=e.value,g=r([f.audio,f.video]),h=g.next();!h.done;h=g.next())(k=h.value)&&k.segmentIndex&&k.segmentIndex.release();l=r(a.H.textStreams);for(h=l.next();!h.done;h=l.next())m=h.value,m.segmentIndex&&m.segmentIndex.release()}a.H=null;a.j=new Tk;a.fe=null;wl(a);A(n)}})}
function $k(a,b){var c,d,e,f;return L(function(g){if(1==g.g)return c=new Uh,d=a.m.textDisplayFactory,e=Mb(d),a.fe=d,f=xl(b.K,c,e,function(h,k,l){h=r(h);for(var m=h.next();!m.done;m=h.next())if(m=m.value,m.data&&m.cueTime&&m.frames){for(var n=m.cueTime+k,p=l,t=r(m.frames),v=t.next();!v.done;v=t.next())yl(a,n,p,"ID3",v.value);if(a.G)a.G.onHlsTimedMetadata(m,n)}}),z(g,f.I,2);a.M=f;A(g)})}
function al(a,b,c){var d,e,f,g;return L(function(h){if(1==h.g)return b.mimeType=c.mimeType,b.uri=c.uri,d=b.uri,e=a.V,a.bb=d,f=a,z(h,og(d,e,a.m.manifest.retryParameters,b.mimeType),2);f.Eb=h.h;a.C=Mb(a.Eb);g=$e(a.m.manifest);c.K&&"AUDIO"===c.K.nodeName&&(g.disableVideo=!0);a.C.configure(g);A(h)})}
function bl(a,b){var c=b.uri,d=a.V;a.Gb=new hj(function(){return a.Na()});a.Gb.addEventListener("regionadd",function(g){g=g.region;zl(a,Al,g);if(a.G)a.G.onDashTimedMetadata(g)});a.ia=null;a.m.streaming.observeQualityChanges&&(a.ia=new dj(function(){return a.Ib()}),a.ia.addEventListener("qualitychange",function(g){var h=g.quality;g=g.position;h=(new Map).set("mediaQuality",{bandwidth:h.bandwidth,audioSamplingRate:h.audioSamplingRate,codecs:h.codecs,contentType:h.contentType,frameRate:h.frameRate,height:h.height,
mimeType:h.mimeType,channelsCount:h.channelsCount,pixelAspectRatio:h.pixelAspectRatio,width:h.width}).set("position",g);a.dispatchEvent(hl(Bl,h))}));var e={networkingEngine:d,modifyManifestRequest:function(g,h){var k=a.P;try{k.m.enabled&&(k.l=h.format,wk(k,g,{ot:zk,su:!k.g}))}catch(l){Ua("CMCD_MANIFEST_ERROR","Could not generate manifest CMCD data.",l)}},modifySegmentRequest:function(g,h){mk(a.P,g,h)},filter:function(g){return Cl(a,g)},makeTextStreamsForClosedCaptions:function(g){return Dl(a,g)},
onTimelineRegionAdded:function(g){var h=a.Gb;a:{var k=r(h.g);for(var l=k.next();!l.done;l=k.next())if(l=l.value,l.schemeIdUri==g.schemeIdUri&&l.id==g.id&&l.startTime==g.startTime&&l.endTime==g.endTime){k=l;break a}k=null}null==k&&(h.g.add(g),g=new O("regionadd",new Map([["region",g]])),h.dispatchEvent(g))},onEvent:function(g){return a.dispatchEvent(g)},onError:function(g){return ul(a,g)},isLowLatencyMode:function(){return a.m.streaming.lowLatencyMode},isAutoLowLatencyMode:function(){return a.m.streaming.autoLowLatencyMode},
enableLowLatencyMode:function(){a.configure("streaming.lowLatencyMode",!0)}},f=Date.now()/1E3;return new Te(function(){var g,h,k,l;return L(function(m){if(1==m.g)return g=a,z(m,a.C.start(c,e),2);g.H=m.h;h=hl(El);a.dispatchEvent(h);if(0==a.H.variants.length)throw new P(2,4,4036);Fl(a.H);k=Date.now()/1E3;l=k-f;a.j.J=l;A(m)})}(),function(){return a.C.stop()})}
function cl(a,b){var c,d;return L(function(e){return 1==e.g?(c=Date.now()/1E3,d=!0,a.s=Gl(a,{Wb:a.V,onError:function(f){ul(a,f)},wd:function(f){Hl(a,f)},onExpirationUpdated:function(f,g){Il(a,f,g)},onEvent:function(f){a.dispatchEvent(f);f.type==Jl&&d&&(d=!1,a.j.j=Date.now()/1E3-c)}}),a.s.configure(a.m.drm),z(e,Jf(a.s,a.H.variants,a.H.offlineSessionIds),2)):3!=e.g?z(e,a.s.Hc(b.K),3):z(e,Cl(a,a.H),0)})}
function dl(a,b,c){var d,e,f,g,h,k,l,m,n,p,t,v;return L(function(w){switch(w.g){case 1:b.startTime=c.startTime;null!=a.pb&&(b.startTime=a.pb,a.pb=null);d=b.K;e=b.uri;a.bb=e;a.J=new Yi({sd:function(){return b.K.playbackRate},pd:function(){return b.K.defaultPlaybackRate},Ge:function(y){b.K.playbackRate=y},uf:function(y){b.K.currentTime+=y}});f=function(){return Kl(a)};g=function(){return Ll(a)};a.h.o(d,"playing",f);a.h.o(d,"pause",f);a.h.o(d,"ended",f);a.h.o(d,"ratechange",g);h=a.m.abrFactory;a.B&&
a.nc==h||(a.nc=h,a.B=Mb(h),"function"!=typeof a.B.playbackRateChanged&&(Fb("AbrManager","Please use an AbrManager with playbackRateChanged function."),a.B.playbackRateChanged=function(){}),a.B.configure(a.m.abr));a.sa=new Ie(a.m.preferredAudioLanguage,a.m.preferredVariantRole,a.m.preferredAudioChannelCount);a.Aa=a.m.preferredTextLanguage;a.ob=a.m.preferredTextRole;a.cb=a.m.preferForcedSubs;Ml(a.H.presentationTimeline,a.m.playRangeStart,a.m.playRangeEnd);a.B.init(function(y,x,D){a.i&&y!=a.i.h&&Nl(a,
y,!0,void 0===x?!1:x,void 0===D?0:D)});a.I=Ol(a,b.startTime);a.Ca=Pl(a);k=Math.max(a.H.minBufferTime,a.m.streaming.rebufferingGoal);Ql(a,k);Od(a.H,a.m.preferredVideoCodecs,a.m.preferredAudioCodecs,a.m.preferredAudioChannelCount,a.m.preferredDecodingAttributes);a.i=Rl(a);a.i.configure(a.m.streaming);a.l=Sl;a.dispatchEvent(hl(Tl));l=null;if(m=a.fb().find(function(y){return y.active})){w.D(2);break}l=Ul(a)?a.B.chooseVariant():null;Nl(a,l,!0,!1,0);if(!a.m.streaming.startAtSegmentBoundary){w.D(3);break}n=
a.I.l();return z(w,Vl(l,n),4);case 4:p=w.h,a.I.s(p);case 3:Wl(a,null,me(l));case 2:return t=a.vb().find(function(y){return y.active}),t||((v=we(a.H.textStreams,a.Aa,a.ob,a.cb)[0]||null)&&Sk(a.j.h,v,!0),l&&(v?(l.audio&&Xl(a,l.audio,v)&&(a.ha=!0),a.ha&&a.M.s.setTextVisibility(!0),Yl(a)):a.ha=!1),v&&(a.m.streaming.alwaysStreamText||a.Vb())&&Aj(a.i,v)),z(w,a.i.start(),5);case 5:a.m.abr.enabled&&(a.B.enable(),Zl(a)),de(a.i?a.i.h:null,a.H),$l(a.H),am(a),Ul(a),a.H.variants.some(function(y){return y.primary}),
a.h.Qa(d,"loadedmetadata",function(){a.j.l=Date.now()/1E3-c.Le}),A(w)}})}
function el(a,b,c){var d,e,f,g,h,k,l;return L(function(m){return 1==m.g?(d=Tb,e=Date.now()/1E3,f=!0,a.s=Gl(a,{Wb:a.V,onError:function(n){ul(a,n)},wd:function(n){Hl(a,n)},onExpirationUpdated:function(n,p){Il(a,n,p)},onEvent:function(n){a.dispatchEvent(n);n.type==Jl&&f&&(f=!1,a.j.j=Date.now()/1E3-e)}}),a.s.configure(a.m.drm),g=c.uri||"",h=qg(g),k=sl[h],"application/x-mpegurl"==k&&Kd()&&(k="application/vnd.apple.mpegurl"),k||(k="video/mp4"),l={id:0,language:"und",primary:!1,audio:null,video:{id:0,originalId:null,
createSegmentIndex:function(){return Promise.resolve()},segmentIndex:null,mimeType:c.mimeType?c.mimeType.split(";")[0]:k,codecs:c.mimeType?td(c.mimeType):"",encrypted:!0,drmInfos:[],keyIds:new Set,language:"und",label:null,type:d.mb,primary:!1,trickModeVideo:null,emsgSchemeIdUris:null,roles:[],forced:!1,channelsCount:null,audioSamplingRate:null,spatialAudio:!1,closedCaptions:null},bandwidth:100,allowedByApplication:!0,allowedByKeySystem:!0,decodingInfos:[]},a.s.S=!0,z(m,Jf(a.s,[l],[]),2)):z(m,a.s.Hc(b.K),
0)})}
function fl(a,b,c){function d(){return Kl(a)}b.uri=c.uri;b.startTime=c.startTime;a.bb=b.uri;a.I=new Ni(b.K);null!=b.startTime&&a.I.s(b.startTime);a.J=new Yi({sd:function(){return b.K.playbackRate},pd:function(){return b.K.defaultPlaybackRate},Ge:function(h){b.K.playbackRate=h},uf:function(h){b.K.currentTime+=h}});Ql(a,a.m.streaming.rebufferingGoal);a.h.o(b.K,"playing",d);a.h.o(b.K,"pause",d);a.h.o(b.K,"ended",d);a.h.o(b.K,"ratechange",function(){return Ll(a)});"none"!=a.g.preload&&a.h.Qa(a.g,"loadedmetadata",
function(){a.j.l=Date.now()/1E3-c.Le});a.g.audioTracks&&(a.h.o(a.g.audioTracks,"addtrack",function(){return am(a)}),a.h.o(a.g.audioTracks,"removetrack",function(){return am(a)}),a.h.o(a.g.audioTracks,"change",function(){return am(a)}));a.g.textTracks&&(a.h.o(a.g.textTracks,"addtrack",function(h){if(h.track)switch(h=h.track,h.kind){case "metadata":bm(a,h);break;case "chapters":cm(a,h);break;default:am(a)}}),a.h.o(a.g.textTracks,"removetrack",function(){return am(a)}),a.h.o(a.g.textTracks,"change",
function(){return am(a)}));var e=qg(b.uri);b.K.src=xk(a.P,b.uri,sl[e]);(Hd()||Id("Web0S"))&&b.K.load();a.l=dm;a.dispatchEvent(hl(Tl));var f=new Wc;Ei(a.g,HTMLMediaElement.HAVE_METADATA,a.h,function(){f.resolve()});var g=!1;a.Zd.push(function(){g=!0});Ei(a.g,HTMLMediaElement.HAVE_CURRENT_DATA,a.h,function(){var h;return L(function(k){if(1==k.g){if(g)return k["return"]();em(a);h=fm(a);return h.find(function(l){return"disabled"!=l.mode})?k.D(2):z(k,new Promise(function(l){a.h.Qa(a.g.textTracks,"change",
l);(new Q(l)).U(1)}),2)}if(g)return k["return"]();gm(a);A(k)})});a.g.error?f.reject(tl(a)):"none"==a.g.preload&&(Ta('With <video preload="none">, the browser will not load anything until play() is called. We are unable to measure load latency in a meaningful way, and we cannot provide track info yet. Please do not use preload="none" with Shaka Player.'),f.resolve());a.h.Qa(a.g,"error",function(){f.reject(tl(a))});return new Te(f,function(){f.reject(new P(2,7,7001));return Promise.resolve()})}
function em(a){var b=a.m.preferredAudioLanguage;if(""!=b){a.Dd(b);var c=a.m.preferredVariantRole;""!=c&&a.Dd(b,c)}}function gm(a){var b=a.m.preferredTextLanguage,c=a.m.preferForcedSubs;if(""!=b){a.ze(b,"",c);var d=a.m.preferredTextRole;""!=d&&a.ze(b,d,c)}}
function bm(a,b){"metadata"==b.kind&&(b.mode="hidden",a.h.o(b,"cuechange",function(){if(b.activeCues)for(var c=r(b.activeCues),d=c.next();!d.done;d=c.next())if(d=d.value,yl(a,d.startTime,d.endTime,d.type,d.value),a.G)a.G.onCueMetadataChange(d.value)}),(new Q(function(){var c=hm(a);c=r(c);for(var d=c.next();!d.done;d=c.next())d.value.mode="hidden"})).Ga().U(.5))}function yl(a,b,c,d,e){b=(new Map).set("startTime",b).set("endTime",c).set("metadataType",d).set("payload",e);a.dispatchEvent(hl(im,b))}
function cm(a,b){b&&"chapters"==b.kind&&(b.mode="hidden",(new Q(function(){var c=jm(a);c=r(c);for(var d=c.next();!d.done;d=c.next())d.value.mode="hidden"})).Ga().U(.5))}function Fl(a){function b(c){return c.video&&c.audio||c.video&&c.video.codecs.includes(",")}a.variants.some(b)&&(a.variants=a.variants.filter(b))}function Gl(a,b){return new Cf(b,a.m.drm.updateExpirationTime)}
function Wk(a){return new df(function(b,c){a.B&&a.B.segmentDownloaded(b,c)},function(b,c,d){b=(new Map).set("headers",b).set("request",c).set("requestType",d);a.dispatchEvent(hl(km,b))},function(b,c,d,e){b=(new Map).set("request",b).set("error",c).set("httpResponseCode",d).set("aborted",e);a.dispatchEvent(hl(lm,b))})}
function Ol(a,b){return new Oi(a.g,a.H,a.m.streaming,b,function(){a.Ca&&cj(a.Ca,!0);if(a.i)for(var c=a.i,d=c.F.rd(),e=c.m.smallGapLimit,f=r(c.g.keys()),g=f.next();!g.done;g=f.next()){g=g.value;var h=c.g.get(g);h.za=null;var k=c.F.Y;g==Sb?(k=k.i,k=null==k.g||null==k.h?!1:d>=k.g&&d<k.h):(k=ii(k,g),k=Xh(k,d,e));if(!k&&((null!=ji(c.F.Y,g)||h.hb)&&Dj(c,h),h.Ra&&(h.Ra.abort(),h.Ra=null),g===Sb))for(g=c.F.Y.G.g,g.l=0,g.h=[],g.g=[],h=g.i,h.i=[],h.h=[],h.g=0,Hh(g),g=r(g.j.values()),h=g.next();!h.done;h=g.next())Bh(h.value)}a.L&&
mm(a)},function(c){return a.dispatchEvent(c)})}function Pl(a){var b=new ij(a.Gb);b.addEventListener("enter",function(d){zl(a,nm,d.region)});b.addEventListener("exit",function(d){zl(a,om,d.region)});b.addEventListener("skip",function(d){var e=d.region;d.seeking||(zl(a,nm,e),zl(a,om,e))});var c=new bj(a.g);c.g.add(b);a.ia&&c.g.add(a.ia);return c}function Ql(a,b){a.L=new Me;a.L.g=Oe;Pe(a.L,b,Math.min(.5,b/2));wl(a);a.zb=(new Q(function(){mm(a)})).na(.25)}
function mm(a){switch(a.l){case dm:if(a.g.ended)var b=!0;else{var c=Wh(a.g.buffered);b=null!=c&&c>=a.g.duration-1}break;case Sl:a:if(a.g.ended||gi(a.M))b=!0;else{if(a.H.presentationTimeline.W()){c=a.H.presentationTimeline.Qb();var d=Wh(a.g.buffered);if(null!=d&&d>=c){b=!0;break a}}b=!1}break;default:b=!1}d=Yh(a.g.buffered,a.g.currentTime);c=a.L;var e=b,f=c.h.get(c.g);b=c.g;d=e||d>=f?Ne:Oe;c.g=d;b!=d&&wl(a)}function xl(a,b,c,d){return new ai(a,b,c,d)}
function ql(a){return new lk({getBandwidthEstimate:function(){return a.B?a.B.getBandwidthEstimate():NaN},Ib:function(){return a.Ib()},kg:function(){return a.g?a.g.currentTime:0},fb:function(){return a.fb()},Jb:function(){return a.Jb()},W:function(){return a.W()}},a.m.cmcd)}
function Rl(a){return new oj(a.H,{rd:function(){return a.I.l()},getBandwidthEstimate:function(){return a.B.getBandwidthEstimate()},modifySegmentRequest:function(b,c){mk(a.P,b,c)},Y:a.M,Wb:a.V,onError:function(b){return ul(a,b)},onEvent:function(b){return a.dispatchEvent(b)},Vg:function(){a.C&&a.C.update&&a.C.update()},qe:function(){a.I&&a.I.I();mm(a)},Ug:function(b,c){var d=c.ge;d&&a.ia&&fj(a.ia,d,b)}})}
q.configure=function(a,b){2==arguments.length&&"string"==typeof a&&(a=Ik(a,b));a.manifest&&a.manifest.dash&&"defaultPresentationDelay"in a.manifest.dash&&(Fb("manifest.dash.defaultPresentationDelay configuration","Please Use manifest.defaultPresentationDelay instead."),a.manifest.defaultPresentationDelay=a.manifest.dash.defaultPresentationDelay,delete a.manifest.dash.defaultPresentationDelay);a.streaming&&a.streaming.lowLatencyMode&&(void 0==a.streaming.inaccurateManifestTolerance&&(a.streaming.inaccurateManifestTolerance=
0),void 0==a.streaming.rebufferingGoal&&(a.streaming.rebufferingGoal=.01));var c=Mk(this.m,a,Vk(this));pm(this);return c};
function pm(a){if(a.C){var b=$e(a.m.manifest);a.g&&"AUDIO"===a.g.nodeName&&(b.disableVideo=!0);a.C.configure(b)}a.s&&a.s.configure(a.m.drm);if(a.i){a.i.configure(a.m.streaming);try{qm(a,a.H)}catch(f){ul(a,f)}a.B&&Ul(a);b=a.i.h;!b||b.allowedByApplication&&b.allowedByKeySystem||rm(a)}a.V&&a.V.Ee(a.m.streaming.forceHTTPS);if(a.M&&(b=a.m.textDisplayFactory,a.fe!=b)){var c=Mb(b),d=a.M,e=d.s;d.s=c;e&&(c.setTextVisibility(e.isTextVisible()),e.destroy());d.i&&(d.i.i=c);a.fe=b;a.i&&(b=a.i,(c=b.g.get(Sb))&&
yj(b,c.stream,!0,0,!0))}a.B&&(a.B.configure(a.m.abr),a.m.abr.enabled?a.B.enable():a.B.disable(),Zl(a));a.L&&(b=a.m.streaming.rebufferingGoal,a.H&&(b=Math.max(b,a.H.minBufferTime)),Pe(a.L,b,Math.min(.5,b/2)));a.H&&Ml(a.H.presentationTimeline,a.m.playRangeStart,a.m.playRangeEnd)}q.getConfiguration=function(){var a=Vk(this);Mk(a,this.m,Vk(this));return a};
q.dg=function(){if(this.g){var a=this.g.buffered.length;a=a?this.g.buffered.end(a-1):0;var b=this.getConfiguration().streaming.bufferingGoal;b=Math.min(this.g.currentTime+b,this.Na().end);if(a>=b)return 1;if(!(a<=this.g.currentTime)&&a<b)return(a-this.g.currentTime)/(b-this.g.currentTime)}return 0};q.gh=function(){for(var a in this.m)delete this.m[a];Mk(this.m,Vk(this),Vk(this));pm(this)};q.kf=function(){return this.l};q.wg=function(){return this.g};q.Mc=function(){return this.V};q.Yd=function(){return this.bb};
q.od=function(){return this.G?this.G:null};q.W=function(){return this.H?this.H.presentationTimeline.W():this.g&&this.g.src?Infinity==this.g.duration:!1};q.Tb=function(){return this.H?this.H.presentationTimeline.Tb():!1};q.pf=function(){if(this.H){var a=this.H.variants;return a.length?!a[0].video:!1}return this.g&&this.g.src?this.g.videoTracks?0==this.g.videoTracks.length:0==this.g.videoHeight:!1};
q.Na=function(){if(this.H){var a=this.H.presentationTimeline;return{start:a.mc(),end:a.sb()}}return this.g&&this.g.src&&(a=this.g.seekable,a.length)?{start:a.start(0),end:a.end(a.length-1)}:{start:0,end:0}};q.Jg=function(){this.W()&&(this.g.currentTime=this.Na().end)};q.keySystem=function(){var a=this.drmInfo();return a?a.keySystem:""};q.drmInfo=function(){return this.s?this.s.i:null};q.Lc=function(){return this.s?this.s.Lc():Infinity};q.qd=function(){return this.s?this.s.qd():{}};
q.Rc=function(){return this.L?this.L.g==Oe:!1};q.Jb=function(){return this.g?this.J?this.J.i:1:0};q.Pe=function(a){0==a?Ta("A trick play rate of 0 is unsupported!"):(this.g.paused&&this.g.play(),this.J.set(a),this.l==Sl&&(this.B.playbackRateChanged(a),xj(this.i,1<Math.abs(a))))};q.Ue=function(){var a=this.J.pd();this.l==dm&&this.J.set(a);this.l==Sl&&(this.J.set(a),this.B.playbackRateChanged(a),xj(this.i,!1))};
q.fb=function(){if(this.H){for(var a=this.i?this.i.h:null,b=[],c=0,d=r(this.H.variants),e=d.next();!e.done;e=d.next())if(e=e.value,ue(e)){var f=me(e);f.active=e==a;f.active||1==c||null==a||e.video!=a.video||e.audio!=a.audio||(f.active=!0);f.active&&c++;b.push(f)}return b}return this.g&&this.g.audioTracks?Array.from(this.g.audioTracks).map(function(g){return te(g)}):[]};
q.vb=function(){if(this.H){for(var a=this.i?this.i.i:null,b=[],c=r(this.H.textStreams),d=c.next();!d.done;d=c.next()){d=d.value;var e=ne(d);e.active=d==a;b.push(e)}return b}return this.g&&this.g.src&&this.g.textTracks?fm(this).map(function(f){return re(f)}):[]};q.ng=function(){return this.H?this.H.imageStreams.map(function(a){return oe(a)}):[]};
q.Fg=function(a,b){var c=this,d,e,f,g,h,k,l,m,n,p,t,v,w,y,x,D,C,B;return L(function(F){if(1==F.g)return c.H?(d=c.H.imageStreams.find(function(G){return G.id==a}))?d.segmentIndex?F.D(3):z(F,d.createSegmentIndex(),3):F["return"](null):F.D(2);if(2!=F.g){e=d.segmentIndex.find(b);if(null==e)return F["return"](null);f=d.segmentIndex.get(e);g=f.tilesLayout||d.tilesLayout;h=/(\d+)x(\d+)/.exec(g);if(!h)return F["return"](null);k=d.width||0;l=d.height||0;m=parseInt(h[1],10);n=parseInt(h[2],10);p=k/m;t=l/n;
v=m*n;w=f.l-f.startTime;y=f.i||w/v;x=f.startTime;C=D=0;1<v&&(B=Math.floor((b-f.startTime)/y),x=f.startTime+B*y,D=B%m*p,C=Math.floor(B/m)*t);return F["return"]({imageHeight:l,imageWidth:k,height:t,positionX:D,positionY:C,startTime:x,duration:y,uris:f.Ma(),width:p})}return F["return"](null)})};
q.Ae=function(a){if(this.H&&this.i){var b=this.H.textStreams.find(function(d){return d.id==a.id});b&&b!=this.i.i&&(Sk(this.j.h,b,!1),Aj(this.i,b),sm(this),this.Aa=b.language)}else if(this.g&&this.g.src&&this.g.textTracks){b=fm(this);b=r(b);for(var c=b.next();!c.done;c=b.next())c=c.value,pe(c)==a.id?c.mode=this.ha?"showing":"hidden":c.mode="disabled";sm(this)}};
q.Be=function(a,b,c){b=void 0===b?!1:b;c=void 0===c?0:c;if(this.H&&this.i){this.m.abr.enabled&&Ta("Changing tracks while abr manager is enabled will likely result in the selected track being overriden. Consider disabling abr before calling selectVariantTrack().");var d=this.H.variants.find(function(e){return e.id==a.id});d&&ue(d)&&(Nl(this,d,!1,b,c),this.sa=new He(d),Ul(this))}else if(this.g&&this.g.audioTracks)for(b=Array.from(this.g.audioTracks),b=r(b),c=b.next();!c.done;c=b.next())if(c=c.value,
pe(c)==a.id){tm(this,c);break}};q.cg=function(){return um(this.fb())};q.Eg=function(){return um(this.vb())};q.ag=function(){return Array.from(vm(this.fb()))};q.Dg=function(){return Array.from(vm(this.vb()))};
q.Dd=function(a,b){if(this.H&&this.I){this.sa=new Ie(a,b||"",0,"");var c=function(k,l){return k.video||l.video?k.video&&l.video?Math.abs((k.video.height||0)-(l.video.height||0))+Math.abs((k.video.width||0)-(l.video.width||0)):Infinity:0},d=this.i.h,e=this.sa.create(this.H.variants),f=null;e=r(e.values());for(var g=e.next();!g.done;g=e.next())if(g=g.value,!f||c(f,d)>c(g,d))f=g;f?(c=me(f),this.Be(c,!0)):rm(this)}else if(this.g&&this.g.audioTracks){e=Array.from(this.g.audioTracks);c=Wb(a);f=d=null;e=
r(e);for(g=e.next();!g.done;g=e.next()){g=g.value;var h=te(g);Wb(h.language)==c&&(d=g,b?h.roles.includes(b)&&(f=g):0==h.roles.length&&(f=g))}f?tm(this,f):d&&tm(this,d)}};
q.ze=function(a,b,c){c=void 0===c?!1:c;if(this.H&&this.I){if(this.Aa=a,this.ob=b||"",this.cb=c,(a=we(this.H.textStreams,this.Aa,this.ob,this.cb)[0]||null)&&a!=this.i.i&&(Sk(this.j.h,a,!1),this.m.streaming.alwaysStreamText||this.Vb()))Aj(this.i,a),sm(this)}else{var d=Wb(a);(a=this.vb().find(function(e){return Wb(e.language)==d&&(!b||e.roles.includes(b))&&e.forced==c}))&&this.Ae(a)}};
q.ih=function(a){if(this.H&&this.I){for(var b=null,c=r(this.H.variants),d=c.next();!d.done;d=c.next())if(d=d.value,d.audio.label==a){b=d;break}null!=b&&(this.sa=new Ie(b.language,"",0,a),rm(this))}};q.Vb=function(){var a=this.ha;return this.M?this.M.s.isTextVisible():this.g&&this.g.src&&this.g.textTracks?fm(this).some(function(b){return"showing"==b.mode}):a};q.hf=function(){return this.g&&this.g.src&&this.g.textTracks?jm(this).map(function(a){return re(a)}):[]};
q.fg=function(a){var b=Wb(a),c=jm(this).filter(function(f){return Wb(f.language)==b});if(!c||!c.length)return[];a=[];c=r(c);for(var d=c.next();!d.done;d=c.next())if((d=d.value)&&d.cues){d=r(d.cues);for(var e=d.next();!e.done;e=d.next())e=e.value,a.push({title:e.text,startTime:e.startTime,endTime:e.endTime})}return a};function fm(a){return Array.from(a.g.textTracks).filter(function(b){return"metadata"!=b.kind&&"chapters"!=b.kind&&"Shaka Player TextTrack"!=b.label})}
function hm(a){return Array.from(a.g.textTracks).filter(function(b){return"metadata"==b.kind})}function jm(a){return Array.from(a.g.textTracks).filter(function(b){return"chapters"==b.kind})}
q.Je=function(a){a=!!a;if(this.ha!=a){this.ha=a;if(this.l==Sl)this.M.s.setTextVisibility(a),this.m.streaming.alwaysStreamText||(a?this.i.i||(a=we(this.H.textStreams,this.Aa,this.ob,this.cb),0<a.length&&(Aj(this.i,a[0]),sm(this))):wj(this.i));else if(this.g&&this.g.src&&this.g.textTracks){var b=fm(this);b=r(b);for(var c=b.next();!c.done;c=b.next())c=c.value,"disabled"!=c.mode&&(c.mode=a?"showing":"hidden")}Yl(this)}};
q.yg=function(){if(!this.W())return null;var a=this.ka.l,b=0;if(this.I)b=this.I.l();else if(a){if(null==a.startTime)return new Date;b=a.startTime}return this.H?new Date(1E3*(this.H.presentationTimeline.j+b)):this.g&&this.g.getStartDate?(a=this.g.getStartDate(),isNaN(a.getTime())?null:new Date(a.getTime()+1E3*b)):null};
q.lf=function(){if(!this.W())return null;if(this.H)return new Date(1E3*this.H.presentationTimeline.j);if(this.g&&this.g.getStartDate){var a=this.g.getStartDate();return isNaN(a.getTime())?null:a}return null};q.Ib=function(){if(this.l==Sl)return this.M.Ib();var a={total:[],audio:[],video:[],text:[]};this.l==dm&&(a.total=Zh(this.g.buffered));return a};
q.getStats=function(){if(this.l!=Sl&&this.l!=dm)return{width:NaN,height:NaN,streamBandwidth:NaN,decodedFrames:NaN,droppedFrames:NaN,corruptedFrames:NaN,estimatedBandwidth:NaN,completionPercent:NaN,loadLatency:NaN,manifestTimeSeconds:NaN,drmTimeSeconds:NaN,playTime:NaN,pauseTime:NaN,bufferingTime:NaN,licenseTime:NaN,liveLatency:NaN,maxSegmentDuration:NaN,switchHistory:[],stateHistory:[]};Kl(this);var a=this.g,b=a.currentTime/a.duration;if(!isNaN(b)){var c=this.j;b=Math.round(100*b);c.i=isNaN(c.i)?
b:Math.max(c.i,b)}a.getVideoPlaybackQuality&&(a=a.getVideoPlaybackQuality(),c=this.j,b=Number(a.totalVideoFrames),c.S=Number(a.droppedVideoFrames),c.P=b,this.j.M=Number(a.corruptedVideoFrames));this.s?(a=this.s,a=a.I?a.I:NaN):a=NaN;this.j.s=a;if(this.l==Sl){if(a=this.i.h)this.j.C=(this.J?this.J.i:1)*a.bandwidth;a&&a.video&&(c=this.j,b=a.video.height||NaN,c.ea=a.video.width||NaN,c.G=b);this.W()&&(a=this.lf().valueOf()+1E3*this.Na().end,this.j.I=(Date.now()-a)/1E3);this.H&&this.H.presentationTimeline&&
(this.j.L=this.H.presentationTimeline.g);a=this.B.getBandwidthEstimate();this.j.B=a}var d=this.j;a=d.ea;c=d.G;b=d.C;var e=d.P,f=d.S,g=d.M,h=d.B,k=d.i,l=d.l,m=d.J,n=d.j,p=Pk(d.g,"playing"),t=Pk(d.g,"paused"),v=Pk(d.g,"buffering"),w=d.s,y=d.I,x=d.L,D=Qk(d.g),C=[];d=r(d.h.g);for(var B=d.next();!B.done;B=d.next())B=B.value,C.push({timestamp:B.timestamp,id:B.id,type:B.type,fromAdaptation:B.fromAdaptation,bandwidth:B.bandwidth});return{width:a,height:c,streamBandwidth:b,decodedFrames:e,droppedFrames:f,
corruptedFrames:g,estimatedBandwidth:h,completionPercent:k,loadLatency:l,manifestTimeSeconds:m,drmTimeSeconds:n,playTime:p,pauseTime:t,bufferingTime:v,licenseTime:w,liveLatency:y,maxSegmentDuration:x,stateHistory:D,switchHistory:C}};
q.addTextTrack=function(a,b,c,d,e,f,g){g=void 0===g?!1:g;Fb("addTextTrack","Please use an addTextTrackAsync.");if(this.l!=Sl&&this.l!=dm)throw new P(1,7,7004);if(!d){var h=qg(a);d=wm[h];if(!d)throw new P(1,2,2011,h);}if(this.l==dm){if("text/vtt"!=d)throw new P(1,2,2013,d);g&&(c="forced");d=document.createElement("track");d.src=Ck(this.P,a);d.label=f||"";d.kind=c;d.srclang=b;this.g.getAttribute("crossorigin")||this.g.setAttribute("crossorigin","anonymous");this.g.appendChild(d);if(a=this.vb().find(function(k){return k.language==
b&&k.label==(f||"")&&k.kind==c}))return am(this),a;throw new P(1,2,2012);}h=this.H.presentationTimeline.getDuration();if(Infinity==h)throw new P(1,4,4033);a={id:this.se++,originalId:null,createSegmentIndex:function(){return Promise.resolve()},segmentIndex:Wi(0,h,[a]),mimeType:d||"",codecs:e||"",kind:c,encrypted:!1,drmInfos:[],keyIds:new Set,language:b,label:f||null,type:Sb,primary:!1,trickModeVideo:null,emsgSchemeIdUris:null,roles:[],forced:!!g,channelsCount:null,audioSamplingRate:null,spatialAudio:!1,
closedCaptions:null};if(!vd(qd(a.mimeType,a.codecs)))throw new P(2,2,2014,d);this.H.textStreams.push(a);am(this);return ne(a)};
q.Rf=function(a,b,c,d,e,f,g){g=void 0===g?!1:g;var h=this,k,l,m,n,p,t,v,w,y,x,D;return L(function(C){switch(C.g){case 1:if(h.l!=Sl&&h.l!=dm)throw new P(1,7,7004);if(d){C.D(2);break}return z(C,xm(h,a),3);case 3:d=C.h;case 2:k=[];if(h.G)try{k=h.G.getServerSideCuePoints()}catch(B){}if(h.l!=dm){C.D(4);break}g&&(c="forced");return z(C,ym(h,a,b,c,d,f||"",k),5);case 5:l=h.vb();if(m=l.find(function(B){return B.language==b&&B.label==(f||"")&&B.kind==c}))return am(h),C["return"](m);throw new P(1,2,2012);case 4:n=
Tb;p=h.H.presentationTimeline.getDuration();if(Infinity==p)throw new P(1,4,4033);if(!k.length){C.D(6);break}return z(C,zm(h,a,h.V,h.m.streaming.retryParameters),7);case 7:t=C.h,v=Am(h,t,d,k),w=new Blob([v],{type:"text/vtt"}),a=di(w),d="text/vtt";case 6:y={id:h.se++,originalId:null,createSegmentIndex:function(){return Promise.resolve()},segmentIndex:Wi(0,p,[a]),mimeType:d||"",codecs:e||"",kind:c,encrypted:!1,drmInfos:[],keyIds:new Set,language:b,label:f||null,type:n.ua,primary:!1,trickModeVideo:null,
emsgSchemeIdUris:null,roles:[],forced:!!g,channelsCount:null,audioSamplingRate:null,spatialAudio:!1,closedCaptions:null};x=qd(y.mimeType,y.codecs);D=vd(x);if(!D)throw new P(2,2,2014,d);h.H.textStreams.push(y);am(h);return C["return"](ne(y))}})};
q.Qf=function(a,b,c){var d=this,e,f,g,h,k,l,m;return L(function(n){switch(n.g){case 1:if(d.l!=Sl&&d.l!=dm)throw new P(1,7,7004);if(c){n.D(2);break}return z(n,xm(d,a),3);case 3:c=n.h;case 2:e=[];if(d.G)try{e=d.G.getServerSideCuePoints()}catch(p){}return z(n,ym(d,a,b,"chapters",c,"",e),4);case 4:f=d.hf();if(g=f.find(function(p){return p.language==b})){h=jm(d);k=r(h);for(l=k.next();!l.done;l=k.next())m=l.value,cm(d,m);return n["return"](g)}throw new P(1,2,2012);}})};
function xm(a,b){var c,d;return L(function(e){switch(e.g){case 1:c=qg(b);if(d=wm[c])return e["return"](d);E(e,2);return z(e,sg(b,a.V,a.m.streaming.retryParameters),4);case 4:d=e.h;wa(e,3);break;case 2:H(e);case 3:if(d)return e["return"](d);throw new P(1,2,2011,c);}})}
function ym(a,b,c,d,e,f,g){var h,k,l,m;return L(function(n){if(1==n.g)return"text/vtt"!=e||g.length?z(n,zm(a,b,a.V,a.m.streaming.retryParameters),3):n.D(2);2!=n.g&&(h=n.h,k=Am(a,h,e,g),l=new Blob([k],{type:"text/vtt"}),b=di(l),e="text/vtt");m=document.createElement("track");m.src=Ck(a.P,b);m.label=f;m.kind=d;m.srclang=c;a.g.getAttribute("crossorigin")||a.g.setAttribute("crossorigin","anonymous");a.g.appendChild(m);A(n)})}
function zm(a,b,c,d){var e,f,g;return L(function(h){if(1==h.g){e=of;f=hf([b],d);f.method="GET";var k=a.P;try{k.m.enabled&&wk(k,f,{ot:Dk,su:!0})}catch(l){Ua("CMCD_TEXT_ERROR","Could not generate text CMCD data.",l)}return z(h,c.request(e,f).promise,2)}g=h.h;return h["return"](g.data)})}function Am(a,b,c,d){var e=wd[c];if(e)return c=e(),a={periodStart:0,segmentStart:0,segmentEnd:a.g.duration},b=Oc(b),b=c.parseMedia(b,a),kk(b,d);throw new P(2,2,2014,c);}
q.Fe=function(a,b){this.oe.width=a;this.oe.height=b};q.we=function(){if(this.l==Sl){var a=this.i;if(a.N.g)a=!1;else if(a.j)a=!1;else{for(var b=r(a.g.values()),c=b.next();!c.done;c=b.next())c=c.value,c.Pc&&(c.Pc=!1,vj(a,c,.1));a=!0}}else a=!1;return a};q.sg=function(){Ta("Shaka Player's internal Manifest structure is NOT covered by semantic versioning compatibility guarantees.  It may change at any time!  Please consider filing a feature request for whatever you use getManifest() for.");return this.H};
q.ug=function(){return this.Eb};function Vk(a){var b=Kk();b.streaming.failureCallback=function(c){var d=[1001,1002,1003];a.W()&&d.includes(c.code)&&(c.severity=1,a.we())};b.textDisplayFactory=function(){return a.Db?new dk(a.g,a.Db):new Xj(a.g)};return b}q.Ke=function(a){this.Db=a};
function Dl(a,b){for(var c=new Set,d=r(b.textStreams),e=d.next();!e.done;e=d.next())e=e.value,"application/cea-608"!=e.mimeType&&"application/cea-708"!=e.mimeType||c.add(e.originalId);d=r(b.variants);for(e=d.next();!e.done;e=d.next())if((e=e.value.video)&&e.closedCaptions)for(var f=r(e.closedCaptions.keys()),g=f.next();!g.done;g=f.next())if(g=g.value,!c.has(g)){var h=g.startsWith("CC")?"application/cea-608":"application/cea-708",k=new Xi;h={id:a.se++,originalId:g,createSegmentIndex:function(){return Promise.resolve()},
segmentIndex:k,mimeType:h,codecs:"",kind:"caption",encrypted:!1,drmInfos:[],keyIds:new Set,language:e.closedCaptions.get(g),label:null,type:Sb,primary:!1,trickModeVideo:null,emsgSchemeIdUris:null,roles:e.roles,forced:!1,channelsCount:null,audioSamplingRate:null,spatialAudio:!1,closedCaptions:null};b.textStreams.push(h);c.add(g)}}function Cl(a,b){return L(function(c){if(1==c.g)return z(c,Bm(a,b),2);qm(a,b);A(c)})}
function Bm(a,b){var c;return L(function(d){if(1==d.g)return c=a.i?a.i.h:null,z(d,be(c,b),2);$l(b);A(d)})}
function qm(a,b){if(a.l!=kl){for(var c=a.m.restrictions,d=a.oe,e=!1,f=r(b.variants),g=f.next();!g.done;g=f.next()){g=g.value;var h=g.allowedByApplication;g.allowedByApplication=ae(g,c,d);h!=g.allowedByApplication&&(e=!0)}e&&a.i&&am(a);if((c=a.s?a.s.i:null)&&a.s.s)for(d=r(b.variants),e=d.next();!e.done;e=d.next())for(e=e.value,e=r((e.video?e.video.drmInfos:[]).concat(e.audio?e.audio.drmInfos:[])),f=e.next();!f.done;f=e.next())if(f=f.value,f.keySystem==c.keySystem)for(f=r(f.initData||[]),g=f.next();!g.done;g=
f.next())g=g.value,Sf(a.s,g.initDataType,g.initData);Cm(a,b)}}
function Vl(a,b){var c,d,e,f,g;return L(function(h){if(1==h.g)return c=a.audio,d=a.video,e=function(k,l){var m,n;return L(function(p){if(1==p.g)return k?z(p,k.createSegmentIndex(),2):p["return"](null);m=k.segmentIndex[Symbol.iterator]().seek(l);if(!m)return p["return"](null);n=m.startTime;return p["return"](n)})},z(h,e(c,b),2);if(3!=h.g)return f=h.h,z(h,e(d,b),3);g=h.h;return null!=g&&null!=f?h["return"](Math.max(g,f)):null!=g?h["return"](g):null!=f?h["return"](f):h["return"](b)})}
function wl(a){var b=a.Rc();if(a.j&&a.L&&a.I){var c=a.J;c.j=b;aj(c);a.P&&(c=a.P,b||c.g||(c.g=!0),c.g&&b&&(c.i=!0),c.j=b);Kl(a)}b=(new Map).set("buffering",b);a.dispatchEvent(hl(Dm,b))}function Ll(a){var b=a.g.playbackRate;0!=b&&(a.J&&a.J.set(b),b=hl(Em),a.dispatchEvent(b))}function Kl(a){if(a.j&&a.L){var b=a.j.g;a.L.g==Oe?Ok(b,"buffering"):a.g.paused?Ok(b,"paused"):a.g.ended?Ok(b,"ended"):Ok(b,"playing")}}
function Ul(a){try{Cm(a,a.H)}catch(c){return ul(a,c),!1}var b=a.H.variants.filter(function(c){return ue(c)});b=a.sa.create(b);a.B.setVariants(Array.from(b.values()));return!0}function rm(a){var b;(b=Ul(a)?a.B.chooseVariant():null)&&Nl(a,b,!0,!0,0)}
function Nl(a,b,c,d,e){var f=a.i.h;if(b==f)d&&zj(a.i,b,d,e,!0);else{var g=a.j.h;g.h!=b&&(g.h=b,g.g.push({timestamp:Date.now()/1E3,id:b.id,type:"variant",fromAdaptation:c,bandwidth:b.bandwidth}));zj(a.i,b,d,e);d=null;f&&(d=me(f));b=me(b);c?Wl(a,d,b):Fm(a,d,b)}}function tm(a,b){var c=Array.from(a.g.audioTracks).find(function(e){return e.enabled});b.enabled=!0;b.id!==c.id&&(c.enabled=!1);c=te(c);var d=te(b);Fm(a,c,d)}
function Xl(a,b,c){a=Wb(a.m.preferredTextLanguage);b=Wb(b.language);c=Wb(c.language);return Vb(c,a)&&!Vb(b,c)}function Wl(a,b,c){b=(new Map).set("oldTrack",b).set("newTrack",c);b=hl(Gm,b);Hm(a,b)}function am(a){var b=hl(Im);Hm(a,b)}function Fm(a,b,c){b=(new Map).set("oldTrack",b).set("newTrack",c);b=hl(Jm,b);Hm(a,b)}function sm(a){var b=hl(Km);Hm(a,b)}function Yl(a){var b=hl(Lm);Hm(a,b)}function Zl(a){var b=(new Map).set("newStatus",a.m.abr.enabled);Hm(a,hl(Mm,b))}
function ul(a,b){if(a.l!=kl){var c=hl(Nm,(new Map).set("detail",b));a.dispatchEvent(c);c.defaultPrevented&&(b.handled=!0)}}function zl(a,b,c){c=(new Map).set("detail",{schemeIdUri:c.schemeIdUri,value:c.value,startTime:c.startTime,endTime:c.endTime,id:c.id,eventElement:c.eventElement});a.dispatchEvent(hl(b,c))}
function tl(a){if(!a.g.error)return null;var b=a.g.error.code;if(1==b)return null;var c=a.g.error.msExtendedCode;c&&(0>c&&(c+=Math.pow(2,32)),c=c.toString(16));return new P(2,3,3016,b,c,a.g.error.message)}
function Hl(a,b){if(a.i){var c=Object.keys(b),d=1==c.length&&"00"==c[0],e=!1;if(c.length){c=r(a.H.variants);for(var f=c.next();!f.done;f=c.next()){f=f.value;var g=[];f.audio&&g.push(f.audio);f.video&&g.push(f.video);g=r(g);for(var h=g.next();!h.done;h=g.next()){var k=h.value;h=f.allowedByKeySystem;if(k.keyIds.size){f.allowedByKeySystem=!0;k=r(k.keyIds);for(var l=k.next();!l.done;l=k.next())l=l.value,l=b[d?"00":l],f.allowedByKeySystem=f.allowedByKeySystem&&!!l&&!Om.includes(l)}h!=f.allowedByKeySystem&&
(e=!0)}}}e&&Ul(a);(d=a.i.h)&&!d.allowedByKeySystem&&rm(a);e&&am(a)}}function Il(a,b,c){if(a.C&&a.C.onExpirationUpdated)a.C.onExpirationUpdated(b,c);b=hl(Pm);a.dispatchEvent(b)}function Ml(a,b,c){0<b&&(a.W()||a.Ff(b));b=a.getDuration();c<b&&(a.W()||a.ib(c))}
function Cm(a,b){var c=a.s?a.s.qd():{},d=Object.keys(c);d=d.length&&"00"==d[0];for(var e=!1,f=!1,g=new Set,h=new Set,k=r(b.variants),l=k.next();!l.done;l=k.next()){l=l.value;var m=[];l.audio&&m.push(l.audio);l.video&&m.push(l.video);m=r(m);for(var n=m.next();!n.done;n=m.next())if(n=n.value,n.keyIds.size){n=r(n.keyIds);for(var p=n.next();!p.done;p=n.next()){p=p.value;var t=c[d?"00":p];t?Om.includes(t)&&h.add(t):g.add(p)}}l.allowedByApplication?l.allowedByKeySystem&&(e=!0):f=!0}if(!e)throw c={hasAppRestrictions:f,
missingKeys:Array.from(g),restrictedKeyStatuses:Array.from(h)},new P(2,4,4012,c);}function $l(a){if(!a.variants.some(ue))throw new P(2,4,4032);}function Hm(a,b){L(function(c){if(1==c.g)return z(c,Promise.resolve(),2);a.l!=kl&&a.dispatchEvent(b);A(c)})}function vm(a){var b=new Set;a=r(a);for(var c=a.next();!c.done;c=a.next())c=c.value,c.language?b.add(Wb(c.language)):b.add("und");return b}
function um(a){var b=new Map,c=new Map;a=r(a);for(var d=a.next();!d.done;d=a.next()){d=d.value;var e="und",f=[];d.language&&(e=Wb(d.language));"variant"==d.type?f=d.audioRoles:f=d.roles;f&&f.length||(f=[""]);b.has(e)||b.set(e,new Set);f=r(f);for(var g=f.next();!g.done;g=f.next())g=g.value,b.get(e).add(g),d.label&&(c.has(e)||c.set(e,new Map),c.get(e).set(g,d.label))}var h=[];b.forEach(function(k,l){for(var m=r(k),n=m.next();!n.done;n=m.next()){n=n.value;var p=null;c.has(l)&&c.get(l).has(n)&&(p=c.get(l).get(n));
h.push({language:l,role:n,label:p})}});return h}function ml(){return new P(2,7,7E3)}function gl(a,b,c,d,e,f){return d==a&&e.K==f.K&&e.uri==f.uri&&e.mimeType==f.mimeType?b:c}function Rj(){return{K:null,mimeType:null,startTime:null,Le:NaN,uri:null}}function nl(a){return new Promise(function(b,c){a.Xb=function(){return c(ml())};a.vd=function(){return b()};a.onError=function(d){return c(d)};a.xd=function(){return c(ml())}})}N("shaka.Player",T);T.prototype.setVideoContainer=T.prototype.Ke;
T.prototype.getManifestParserFactory=T.prototype.ug;T.prototype.getManifest=T.prototype.sg;T.prototype.retryStreaming=T.prototype.we;T.prototype.setMaxHardwareResolution=T.prototype.Fe;T.prototype.addChaptersTrack=T.prototype.Qf;T.prototype.addTextTrackAsync=T.prototype.Rf;T.prototype.addTextTrack=T.prototype.addTextTrack;T.prototype.getStats=T.prototype.getStats;T.prototype.getBufferedInfo=T.prototype.Ib;T.prototype.getPresentationStartTimeAsDate=T.prototype.lf;
T.prototype.getPlayheadTimeAsDate=T.prototype.yg;T.prototype.setTextTrackVisibility=T.prototype.Je;T.prototype.getChapters=T.prototype.fg;T.prototype.getChaptersTracks=T.prototype.hf;T.prototype.isTextTrackVisible=T.prototype.Vb;T.prototype.selectVariantsByLabel=T.prototype.ih;T.prototype.selectTextLanguage=T.prototype.ze;T.prototype.selectAudioLanguage=T.prototype.Dd;T.prototype.getTextLanguages=T.prototype.Dg;T.prototype.getAudioLanguages=T.prototype.ag;T.prototype.getTextLanguagesAndRoles=T.prototype.Eg;
T.prototype.getAudioLanguagesAndRoles=T.prototype.cg;T.prototype.selectVariantTrack=T.prototype.Be;T.prototype.selectTextTrack=T.prototype.Ae;T.prototype.getThumbnails=T.prototype.Fg;T.prototype.getImageTracks=T.prototype.ng;T.prototype.getTextTracks=T.prototype.vb;T.prototype.getVariantTracks=T.prototype.fb;T.prototype.cancelTrickPlay=T.prototype.Ue;T.prototype.trickPlay=T.prototype.Pe;T.prototype.getPlaybackRate=T.prototype.Jb;T.prototype.isBuffering=T.prototype.Rc;T.prototype.getKeyStatuses=T.prototype.qd;
T.prototype.getExpiration=T.prototype.Lc;T.prototype.drmInfo=T.prototype.drmInfo;T.prototype.keySystem=T.prototype.keySystem;T.prototype.goToLive=T.prototype.Jg;T.prototype.seekRange=T.prototype.Na;T.prototype.isAudioOnly=T.prototype.pf;T.prototype.isInProgress=T.prototype.Tb;T.prototype.isLive=T.prototype.W;T.prototype.getAdManager=T.prototype.od;T.prototype.getAssetUri=T.prototype.Yd;T.prototype.getNetworkingEngine=T.prototype.Mc;T.prototype.getMediaElement=T.prototype.wg;
T.prototype.getLoadMode=T.prototype.kf;T.prototype.resetConfiguration=T.prototype.gh;T.prototype.getBufferFullness=T.prototype.dg;T.prototype.getConfiguration=T.prototype.getConfiguration;T.prototype.configure=T.prototype.configure;T.prototype.load=T.prototype.load;T.prototype.updateStartTime=T.prototype.vh;T.prototype.unload=T.prototype.Qe;T.prototype.detach=T.prototype.detach;T.prototype.attach=T.prototype.Hc;
T.probeSupport=function(a){a=void 0===a?!0:a;var b,c,d,e,f,g;return L(function(h){if(1==h.g)return b={},a?z(h,ig(),3):h.D(2);2!=h.g&&(b=h.h);var k={};if(Ed()){for(var l in pg)k[l]=!0;for(var m in rg)k[m]=!0}l={mpd:"application/dash+xml",m3u8:"application/x-mpegurl",ism:"application/vnd.ms-sstr+xml"};m=r(["application/dash+xml","application/x-mpegurl","application/vnd.apple.mpegurl","application/vnd.ms-sstr+xml"]);for(var n=m.next();!n.done;n=m.next())n=n.value,k[n]=Ed()?!!pg[n]:Fd(n);for(var p in l)k[p]=
Ed()?!!rg[p]:Fd(l[p]);c=k;k={};p=r('video/mp4; codecs="avc1.42E01E",video/mp4; codecs="avc3.42E01E",video/mp4; codecs="hev1.1.6.L93.90",video/mp4; codecs="hvc1.1.6.L93.90",video/mp4; codecs="hev1.2.4.L153.B0"; eotf="smpte2084",video/mp4; codecs="hvc1.2.4.L153.B0"; eotf="smpte2084",video/mp4; codecs="vp9",video/mp4; codecs="vp09.00.10.08",video/mp4; codecs="av01.0.01M.08",audio/mp4; codecs="mp4a.40.2",audio/mp4; codecs="ac-3",audio/mp4; codecs="ec-3",audio/mp4; codecs="opus",audio/mp4; codecs="flac",video/webm; codecs="vp8",video/webm; codecs="vp9",video/webm; codecs="vp09.00.10.08",audio/webm; codecs="vorbis",audio/webm; codecs="opus",video/mp2t; codecs="avc1.42E01E",video/mp2t; codecs="avc3.42E01E",video/mp2t; codecs="hvc1.1.6.L93.90",video/mp2t; codecs="mp4a.40.2",video/mp2t; codecs="ac-3",video/mp2t; codecs="ec-3",text/vtt,application/mp4; codecs="wvtt",application/ttml+xml,application/mp4; codecs="stpp"'.split(","));
for(l=p.next();!l.done;l=p.next())l=l.value,k[l]=Ed()?vd(l)?!0:MediaSource.isTypeSupported(l)||md(l):Fd(l),m=l.split(";")[0],k[m]=k[m]||k[l];d=k;e={manifest:c,media:d,drm:b};f=Qm;for(g in f)e[g]=f[g]();return h["return"](e)})};T.isBrowserSupported=ll;T.setAdManagerFactory=function(a){Xk=a};T.registerSupportPlugin=function(a,b){Qm[a]=b};T.prototype.destroy=T.prototype.destroy;
var Mm="abrstatuschanged",Gm="adaptation",Dm="buffering",lm="downloadfailed",km="downloadheadersreceived",Jl="drmsessionupdate",Oj="emsg",Nm="error",Pm="expirationupdated",rl="loaded",ol="loading",El="manifestparsed",Bl="mediaqualitychanged",im="metadata",il="onstatechange",jl="onstateidle",Em="ratechange",Tl="streaming",Km="textchanged",Lm="texttrackvisibility",Al="timelineregionadded",nm="timelineregionenter",om="timelineregionexit",Im="trackschanged",vl="unloading",Jm="variantchanged",Rm={Ch:Mm,
Dh:Gm,Eh:Dm,Ih:lm,Jh:km,Kh:Jl,Rh:Oj,Error:Nm,Sh:Pm,Yh:"largegap",Zh:rl,$h:ol,di:El,ei:Bl,Metadata:im,li:il,mi:jl,xi:Em,Ei:"sessiondata",Fi:Tl,Gi:Km,Hi:Lm,Ii:Al,Ji:nm,Ki:om,Li:Im,Pi:vl,Ri:Jm},kl=0,Uk=1,Sl=2,dm=3;T.LoadMode={DESTROYED:kl,NOT_LOADED:Uk,MEDIA_SOURCE:Sl,SRC_EQUALS:dm};T.version="v3.3.2";var Sm=["3","3"];Gb=new function(a){this.g=a;this.i=Hb;this.h=Ib}(new Eb(Number(Sm[0]),Number(Sm[1])));
var Om=["output-restricted","internal-error"],Qm={},Xk=null,sl={mp4:"video/mp4",m4v:"video/mp4",m4a:"audio/mp4",webm:"video/webm",weba:"audio/webm",mkv:"video/webm",ts:"video/mp2t",ogv:"video/ogg",ogg:"audio/ogg",mpg:"video/mpeg",mpeg:"video/mpeg",m3u8:"application/x-mpegurl",mpd:"application/dash+xml",mp3:"audio/mpeg",aac:"audio/aac",flac:"audio/flac",wav:"audio/wav"},wm={sbv:"text/x-subviewer",srt:"text/srt",vtt:"text/vtt",webvtt:"text/vtt",ttml:"application/ttml+xml",lrc:"application/x-subtitle-lrc",
ssa:"text/x-ssa",ass:"text/x-ssa"};function Tm(){this.h=[];this.j=this.i=this.g=0};function Um(a,b){var c=this;this.i=a;this.g=b;this.j=!1;this.l=this.g.getVolume();this.h=new rf;this.h.o(this.g,google.ima.AdEvent.Type.PAUSED,function(){c.j=!0});this.h.o(this.g,google.ima.AdEvent.Type.RESUMED,function(){c.j=!1})}q=Um.prototype;q.getDuration=function(){return this.i.getDuration()};q.getMinSuggestedDuration=function(){return this.i.getMinSuggestedDuration()};q.getRemainingTime=function(){return this.g.getRemainingTime()};q.isPaused=function(){return this.j};
q.isSkippable=function(){return 0<=this.i.getSkipTimeOffset()};q.getTimeUntilSkippable=function(){var a=this.i.getSkipTimeOffset();a=this.getRemainingTime()-a;return Math.max(a,0)};q.canSkipNow=function(){return this.g.getAdSkippableState()};q.skip=function(){return this.g.skip()};q.pause=function(){return this.g.pause()};q.play=function(){return this.g.resume()};q.getVolume=function(){return this.g.getVolume()};q.setVolume=function(a){return this.g.setVolume(a)};q.isMuted=function(){return 0==this.g.getVolume()};
q.isLinear=function(){return this.i.isLinear()};q.resize=function(a,b){this.g.resize(a,b,document.fullscreenElement?google.ima.ViewMode.FULLSCREEN:google.ima.ViewMode.NORMAL)};q.setMuted=function(a){a?(this.l=this.getVolume(),this.setVolume(0)):this.setVolume(this.l)};q.getSequenceLength=function(){var a=this.i.getAdPodInfo();return null==a?1:a.getTotalAds()};q.getPositionInSequence=function(){var a=this.i.getAdPodInfo();return null==a?1:a.getAdPosition()};q.release=function(){this.g=this.i=null};
N("shaka.ads.ClientSideAd",Um);Um.prototype.release=Um.prototype.release;Um.prototype.getPositionInSequence=Um.prototype.getPositionInSequence;Um.prototype.getSequenceLength=Um.prototype.getSequenceLength;Um.prototype.setMuted=Um.prototype.setMuted;Um.prototype.resize=Um.prototype.resize;Um.prototype.isLinear=Um.prototype.isLinear;Um.prototype.isMuted=Um.prototype.isMuted;Um.prototype.setVolume=Um.prototype.setVolume;Um.prototype.getVolume=Um.prototype.getVolume;Um.prototype.play=Um.prototype.play;
Um.prototype.pause=Um.prototype.pause;Um.prototype.skip=Um.prototype.skip;Um.prototype.canSkipNow=Um.prototype.canSkipNow;Um.prototype.getTimeUntilSkippable=Um.prototype.getTimeUntilSkippable;Um.prototype.isSkippable=Um.prototype.isSkippable;Um.prototype.isPaused=Um.prototype.isPaused;Um.prototype.getRemainingTime=Um.prototype.getRemainingTime;Um.prototype.getMinSuggestedDuration=Um.prototype.getMinSuggestedDuration;Um.prototype.getDuration=Um.prototype.getDuration;function Vm(a,b,c,d){var e=this;this.B=a;this.g=b;this.C=null;this.G=NaN;this.j=d;this.s=null;this.h=new rf;google.ima.settings.setLocale(c);a=new google.ima.AdDisplayContainer(this.B,this.g);a.initialize();this.l=new google.ima.AdsLoader(a);this.l.getSettings().setPlayerType("shaka-player");this.l.getSettings().setPlayerVersion("v3.3.2");this.i=null;this.h.Qa(this.l,google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,function(f){Wm(e,f)});this.h.o(this.l,google.ima.AdErrorEvent.Type.AD_ERROR,
function(f){Xm(e,f)});this.g.onended=function(){e.l.contentComplete()}}Vm.prototype.stop=function(){this.i&&this.i.stop();this.B&&ck(this.B)};Vm.prototype.release=function(){this.stop();this.C&&this.C.disconnect();this.h&&this.h.release();this.i&&this.i.destroy();this.l.destroy()};function Xm(a,b){b.getError();Ym(a,null);a.j(new O("ad-cue-points-changed",(new Map).set("cuepoints",[])))}
function Wm(a,b){a.j(new O("ads-loaded",(new Map).set("loadTime",Date.now()/1E3-a.G)));a.i=b.getAdsManager(a.g);a.j(new O("ima-ad-manager-loaded",(new Map).set("imaAdManager",a.i)));var c=a.i.getCuePoints();if(c.length){var d=[];c=r(c);for(var e=c.next();!e.done;e=c.next())d.push({start:e.value,end:null});a.j(new O("ad-cue-points-changed",(new Map).set("cuepoints",d)))}Zm(a);try{a.i.init(a.g.offsetWidth,a.g.offsetHeight,document.fullscreenElement?google.ima.ViewMode.FULLSCREEN:google.ima.ViewMode.NORMAL),
a.h.o(a.g,"loadeddata",function(){a.i.resize(a.g.offsetWidth,a.g.offsetHeight,document.fullscreenElement?google.ima.ViewMode.FULLSCREEN:google.ima.ViewMode.NORMAL)}),"ResizeObserver"in window&&(a.C=new ResizeObserver(function(){a.i.resize(a.g.offsetWidth,a.g.offsetHeight,document.fullscreenElement?google.ima.ViewMode.FULLSCREEN:google.ima.ViewMode.NORMAL)}),a.C.observe(a.g)),a.i.start()}catch(f){Ym(a,null)}}
function Zm(a){function b(c,d){var e=(new Map).set("originalEvent",c);a.j(new O(d,e))}a.h.o(a.i,google.ima.AdErrorEvent.Type.AD_ERROR,function(c){Xm(a,c)});a.h.o(a.i,google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,function(c){$m(a,c)});a.h.o(a.i,google.ima.AdEvent.Type.STARTED,function(c){$m(a,c)});a.h.o(a.i,google.ima.AdEvent.Type.FIRST_QUARTILE,function(c){b(c,"ad-first-quartile")});a.h.o(a.i,google.ima.AdEvent.Type.MIDPOINT,function(c){b(c,"ad-midpoint")});a.h.o(a.i,google.ima.AdEvent.Type.THIRD_QUARTILE,
function(c){b(c,"ad-third-quartile")});a.h.o(a.i,google.ima.AdEvent.Type.COMPLETE,function(c){b(c,"ad-complete")});a.h.o(a.i,google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,function(c){Ym(a,c)});a.h.o(a.i,google.ima.AdEvent.Type.ALL_ADS_COMPLETED,function(c){Ym(a,c)});a.h.o(a.i,google.ima.AdEvent.Type.SKIPPED,function(c){b(c,"ad-skipped")});a.h.o(a.i,google.ima.AdEvent.Type.VOLUME_CHANGED,function(c){b(c,"ad-volume-changed")});a.h.o(a.i,google.ima.AdEvent.Type.VOLUME_MUTED,function(c){b(c,"ad-muted")});
a.h.o(a.i,google.ima.AdEvent.Type.PAUSED,function(c){a.s.j=!0;b(c,"ad-paused")});a.h.o(a.i,google.ima.AdEvent.Type.RESUMED,function(c){a.s.j=!1;b(c,"ad-resumed")});a.h.o(a.i,google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED,function(c){b(c,"ad-skip-state-changed")});a.h.o(a.i,google.ima.AdEvent.Type.CLICK,function(c){b(c,"ad-clicked")});a.h.o(a.i,google.ima.AdEvent.Type.AD_PROGRESS,function(c){b(c,"ad-progress")});a.h.o(a.i,google.ima.AdEvent.Type.AD_BUFFERING,function(c){b(c,"ad-buffering")});a.h.o(a.i,
google.ima.AdEvent.Type.IMPRESSION,function(c){b(c,"ad-impression")});a.h.o(a.i,google.ima.AdEvent.Type.DURATION_CHANGE,function(c){b(c,"ad-duration-changed")});a.h.o(a.i,google.ima.AdEvent.Type.USER_CLOSE,function(c){b(c,"ad-closed")});a.h.o(a.i,google.ima.AdEvent.Type.LOADED,function(c){b(c,"ad-loaded")});a.h.o(a.i,google.ima.AdEvent.Type.ALL_ADS_COMPLETED,function(c){b(c,"all-ads-completed")});a.h.o(a.i,google.ima.AdEvent.Type.LINEAR_CHANGED,function(c){b(c,"ad-linear-changed")});a.h.o(a.i,google.ima.AdEvent.Type.AD_METADATA,
function(c){b(c,"ad-metadata")});a.h.o(a.i,google.ima.AdEvent.Type.LOG,function(c){b(c,"ad-recoverable-error")});a.h.o(a.i,google.ima.AdEvent.Type.AD_BREAK_READY,function(c){b(c,"ad-break-ready")});a.h.o(a.i,google.ima.AdEvent.Type.INTERACTION,function(c){b(c,"ad-interaction")})}function $m(a,b){var c=b.getAd();a.s=new Um(c,a.i);c=(new Map).set("ad",a.s).set("sdkAdObject",c).set("originalEvent",b);a.j(new O("ad-started",c));a.s.isLinear()&&(a.B.setAttribute("ad-active","true"),a.g.pause())}
function Ym(a,b){a.j(new O("ad-stopped",(new Map).set("originalEvent",b)));a.s.isLinear()&&(a.B.removeAttribute("ad-active"),a.g.play())};function an(a,b){this.i=a;this.h=null;this.g=b}q=an.prototype;q.getDuration=function(){return this.h?this.h.duration:-1};q.getMinSuggestedDuration=function(){return this.getDuration()};q.getRemainingTime=function(){return this.h?this.h.duration-this.h.currentTime:-1};q.isPaused=function(){return this.g.paused};q.isSkippable=function(){return this.i.isSkippable()};q.getTimeUntilSkippable=function(){var a=this.i.getSkipTimeOffset();a=this.getRemainingTime()-a;return Math.max(a,0)};
q.canSkipNow=function(){return 0==this.getTimeUntilSkippable()};q.skip=function(){this.g.currentTime+=this.getRemainingTime()};q.pause=function(){return this.g.pause()};q.play=function(){return this.g.play()};q.getVolume=function(){return this.g.volume};q.setVolume=function(a){this.g.volume=a};q.isMuted=function(){return this.g.muted};q.isLinear=function(){return!0};q.resize=function(){};q.setMuted=function(a){this.g.muted=a};
q.getSequenceLength=function(){var a=this.i.getAdPodInfo();return null==a?1:a.getTotalAds()};q.getPositionInSequence=function(){var a=this.i.getAdPodInfo();return null==a?1:a.getAdPosition()};q.release=function(){this.g=this.h=this.i=null};N("shaka.ads.ServerSideAd",an);an.prototype.release=an.prototype.release;an.prototype.getPositionInSequence=an.prototype.getPositionInSequence;an.prototype.getSequenceLength=an.prototype.getSequenceLength;an.prototype.setMuted=an.prototype.setMuted;
an.prototype.resize=an.prototype.resize;an.prototype.isLinear=an.prototype.isLinear;an.prototype.isMuted=an.prototype.isMuted;an.prototype.setVolume=an.prototype.setVolume;an.prototype.getVolume=an.prototype.getVolume;an.prototype.play=an.prototype.play;an.prototype.pause=an.prototype.pause;an.prototype.skip=an.prototype.skip;an.prototype.canSkipNow=an.prototype.canSkipNow;an.prototype.getTimeUntilSkippable=an.prototype.getTimeUntilSkippable;an.prototype.isSkippable=an.prototype.isSkippable;
an.prototype.isPaused=an.prototype.isPaused;an.prototype.getRemainingTime=an.prototype.getRemainingTime;an.prototype.getMinSuggestedDuration=an.prototype.getMinSuggestedDuration;an.prototype.getDuration=an.prototype.getDuration;function bn(a,b,c,d){var e=this;this.C=a;this.g=b;this.l=null;this.M=NaN;this.j=d;this.L=!1;this.G=this.s=this.B=null;this.I="";this.J=[];this.h=new rf;a=new google.ima.dai.api.UiSettings;a.setLocale(c);this.i=new google.ima.dai.api.StreamManager(this.g,this.C,a);this.j(new O("ima-stream-manager-loaded",(new Map).set("imaStreamManager",this.i)));this.h.o(this.i,google.ima.dai.api.StreamEvent.Type.LOADED,function(f){cn(e,f)});this.h.o(this.i,google.ima.dai.api.StreamEvent.Type.ERROR,function(){e.I.length?
e.l.resolve(e.I):e.l.reject("IMA Stream request returned an error and there was no backup asset uri provided.");e.l=null});this.h.o(this.i,google.ima.dai.api.StreamEvent.Type.AD_BREAK_STARTED,function(){});this.h.o(this.i,google.ima.dai.api.StreamEvent.Type.STARTED,function(f){f=f.getAd();e.s=new an(f,e.g);e.G&&(e.s.h=e.G);e.j(new O("ad-started",(new Map).set("ad",e.s)));e.C.setAttribute("ad-active","true")});this.h.o(this.i,google.ima.dai.api.StreamEvent.Type.AD_BREAK_ENDED,function(){e.C.removeAttribute("ad-active");
var f=e.g.currentTime;e.B&&e.B>f&&(e.g.currentTime=e.B,e.B=null)});this.h.o(this.i,google.ima.dai.api.StreamEvent.Type.AD_PROGRESS,function(f){e.G=f.getStreamData().adProgressData;e.s&&(e.s.h=e.G)});this.h.o(this.i,google.ima.dai.api.StreamEvent.Type.FIRST_QUARTILE,function(){e.j(new O("ad-first-quartile"))});this.h.o(this.i,google.ima.dai.api.StreamEvent.Type.MIDPOINT,function(){e.j(new O("ad-midpoint"))});this.h.o(this.i,google.ima.dai.api.StreamEvent.Type.THIRD_QUARTILE,function(){e.j(new O("ad-third-quartile"))});
this.h.o(this.i,google.ima.dai.api.StreamEvent.Type.COMPLETE,function(){e.j(new O("ad-complete"));e.j(new O("ad-stopped"));e.C.removeAttribute("ad-active");e.s=null});this.h.o(this.i,google.ima.dai.api.StreamEvent.Type.SKIPPED,function(){e.j(new O("ad-skipped"));e.j(new O("ad-stopped"))});this.h.o(this.i,google.ima.dai.api.StreamEvent.Type.CUEPOINTS_CHANGED,function(f){var g=f.getStreamData();f=[];g=r(g.cuepoints);for(var h=g.next();!h.done;h=g.next())h=h.value,f.push({start:h.start,end:h.end});e.J=
f;e.j(new O("ad-cue-points-changed",(new Map).set("cuepoints",f)))})}bn.prototype.stop=function(){this.I="";this.B=null;this.J=[]};bn.prototype.release=function(){this.stop();this.h&&this.h.release()};bn.prototype.onCueMetadataChange=function(a){if(a.key&&a.data){var b={};b[a.key]=a.data;this.i.onTimedMetadata(b)}};
function cn(a,b){a.j(new O("ads-loaded",(new Map).set("loadTime",Date.now()/1E3-a.M)));var c=b.getStreamData().url;a.l.resolve(c);a.l=null;a.L||a.h.o(a.g,"seeked",function(){var d=a.g.currentTime;if(0!=d){a.i.streamTimeForContentTime(d);var e=a.i.previousCuePointForStreamTime(d);e&&!e.played&&(a.B=d,a.g.currentTime=e.start)}})};function V(){db.call(this);this.g=this.h=null;this.j=new Tm;this.i=navigator.language}u(V,db);q=V.prototype;q.setLocale=function(a){this.i=a};q.initClientSide=function(a,b){var c=this;if(!window.google||!google.ima||!google.ima.AdsLoader)throw new P(2,10,1E4);this.h&&this.h.release();this.h=new Vm(a,b,this.i,function(d){if(d&&d.type)switch(d.type){case "ads-loaded":c.j.h.push(d.loadTime);break;case "ad-started":c.j.g++;break;case "ad-complete":c.j.i++;break;case "ad-skipped":c.j.j++}c.dispatchEvent(d)})};
q.release=function(){this.h&&(this.h.release(),this.h=null);this.g&&(this.g.release(),this.g=null);db.prototype.release.call(this)};q.onAssetUnload=function(){this.h&&this.h.stop();this.g&&this.g.stop();this.dispatchEvent(new O("ad-stopped"));this.j=new Tm};q.requestClientSideAds=function(a){if(!this.h)throw new P(1,10,10001);var b=this.h;b.G=Date.now()/1E3;b.l.requestAds(a)};
q.initServerSide=function(a,b){var c=this;if(!window.google||!google.ima||!google.ima.dai)throw new P(2,10,10002);this.g&&this.g.release();this.g=new bn(a,b,this.i,function(d){if(d&&d.type)switch(d.type){case "ads-loaded":c.j.h.push(d.loadTime);break;case "ad-started":c.j.g++;break;case "ad-complete":c.j.i++;break;case "ad-skipped":c.j.j++}c.dispatchEvent(d)})};
q.requestServerSideStream=function(a,b){b=void 0===b?"":b;if(!this.g)throw new P(1,10,10003);a.adTagParameters||(a.adTagParameters={});var c=a.adTagParameters;(c.mpt||c.mpv)&&Ta('You have attempted to set "mpt" and/or "mpv" parameters of the ad tag. Please note that those parameters are used for Shaka adoption tracking and will be overriden.');a.adTagParameters.mpt="shaka-player";a.adTagParameters.mpv="v3.3.2";c=this.g;var d=b;c.l?c=Promise.reject(new P(1,10,10004)):(a instanceof google.ima.dai.api.LiveStreamRequest&&
(c.L=!0),c.l=new Wc,c.i.requestStream(a),c.I=d||"",c.M=Date.now()/1E3,c=c.l);return c};q.replaceServerSideAdTagParameters=function(a){if(!this.g)throw new P(1,10,10003);(a.mpt||a.mpv)&&Ta('You have attempted to set "mpt" and/or "mpv" parameters of the ad tag. Please note that those parameters are used for Shaka adoption tracking and will be overriden.');a.mpt="Shaka Player";a.mpv="v3.3.2";this.g.i.replaceAdTagParameters(a)};q.getServerSideCuePoints=function(){if(!this.g)throw new P(1,10,10003);return this.g.J};
q.getStats=function(){var a=this.j;return{loadTimes:a.h,started:a.g,playedCompletely:a.i,skipped:a.j}};q.onDashTimedMetadata=function(a){if(this.g&&"urn:google:dai:2018"==a.schemeIdUri){var b=a.schemeIdUri,c=a.eventElement?a.eventElement.getAttribute("messageData"):null;this.g.i.processMetadata(b,c,a.startTime)}};q.onHlsTimedMetadata=function(a,b){this.g&&this.g.i.processMetadata("ID3",a.data,b)};q.onCueMetadataChange=function(a){if(this.g)this.g.onCueMetadataChange(a)};N("shaka.ads.AdManager",V);
V.prototype.onCueMetadataChange=V.prototype.onCueMetadataChange;V.prototype.onHlsTimedMetadata=V.prototype.onHlsTimedMetadata;V.prototype.onDashTimedMetadata=V.prototype.onDashTimedMetadata;V.prototype.getStats=V.prototype.getStats;V.prototype.getServerSideCuePoints=V.prototype.getServerSideCuePoints;V.prototype.replaceServerSideAdTagParameters=V.prototype.replaceServerSideAdTagParameters;V.prototype.requestServerSideStream=V.prototype.requestServerSideStream;V.prototype.initServerSide=V.prototype.initServerSide;
V.prototype.requestClientSideAds=V.prototype.requestClientSideAds;V.prototype.onAssetUnload=V.prototype.onAssetUnload;V.prototype.release=V.prototype.release;V.prototype.initClientSide=V.prototype.initClientSide;V.prototype.setLocale=V.prototype.setLocale;V.ADS_LOADED="ads-loaded";V.AD_STARTED="ad-started";V.AD_FIRST_QUARTILE="ad-first-quartile";V.AD_MIDPOINT="ad-midpoint";V.AD_THIRD_QUARTILE="ad-third-quartile";V.AD_COMPLETE="ad-complete";V.AD_STOPPED="ad-stopped";V.AD_SKIPPED="ad-skipped";
V.AD_VOLUME_CHANGED="ad-volume-changed";V.AD_MUTED="ad-muted";V.AD_PAUSED="ad-paused";V.AD_RESUMED="ad-resumed";V.AD_SKIP_STATE_CHANGED="ad-skip-state-changed";V.CUEPOINTS_CHANGED="ad-cue-points-changed";V.IMA_AD_MANAGER_LOADED="ima-ad-manager-loaded";V.IMA_STREAM_MANAGER_LOADED="ima-stream-manager-loaded";V.AD_CLICKED="ad-clicked";V.AD_PROGRESS="ad-progress";V.AD_BUFFERING="ad-buffering";V.AD_IMPRESSION="ad-impression";V.AD_DURATION_CHANGED="ad-duration-changed";V.AD_CLOSED="ad-closed";
V.AD_LOADED="ad-loaded";V.ALL_ADS_COMPLETED="all-ads-completed";V.AD_LINEAR_CHANGED="ad-linear-changed";V.AD_METADATA="ad-metadata";V.AD_RECOVERABLE_ERROR="ad-recoverable-error";V.AD_BREAK_READY="ad-break-ready";V.AD_INTERACTION="ad-interaction";Xk=function(){return new V};function dn(a){return JSON.stringify(a,function(b,c){if("function"!=typeof c){if(c instanceof Event||c instanceof O){var d={};for(f in c){var e=c[f];e&&"object"==typeof e?"detail"==f&&(d[f]=e):f in Event||(d[f]=e)}return d}if(c instanceof Error){var f=new Set(["name","message","stack"]);for(d in c)f.add(d);e=r(Object.getOwnPropertyNames(c));for(d=e.next();!d.done;d=e.next())f.add(d.value);e={};f=r(f);for(d=f.next();!d.done;d=f.next())d=d.value,e[d]=c[d];f={__type__:"Error",contents:e}}else if(c instanceof
TimeRanges)for(f={__type__:"TimeRanges",length:c.length,start:[],end:[]},d=r(Zh(c)),e=d.next();!e.done;e=d.next()){e=e.value;var g=e.end;f.start.push(e.start);f.end.push(g)}else f=c instanceof Uint8Array?{__type__:"Uint8Array",entries:Array.from(c)}:"number"==typeof c?isNaN(c)?"NaN":isFinite(c)?c:0>c?"-Infinity":"Infinity":c;return f}})}
function en(a){return JSON.parse(a,function(b,c){if("NaN"==c)var d=NaN;else if("-Infinity"==c)d=-Infinity;else if("Infinity"==c)d=Infinity;else if(c&&"object"==typeof c&&"TimeRanges"==c.__type__)d=fn(c);else if(c&&"object"==typeof c&&"Uint8Array"==c.__type__)d=new Uint8Array(c.entries);else if(c&&"object"==typeof c&&"Error"==c.__type__){d=c.contents;var e=Error(d.message),f;for(f in d)e[f]=d[f];d=e}else d=c;return d})}
function fn(a){return{length:a.length,start:function(b){return a.start[b]},end:function(b){return a.end[b]}}}
var gn="ended play playing pause pausing ratechange seeked seeking timeupdate volumechange".split(" "),hn="buffered currentTime duration ended loop muted paused playbackRate seeking videoHeight videoWidth volume".split(" "),jn=["loop","playbackRate"],kn=["pause","play"],ln={getAssetUri:2,getAudioLanguages:4,getAudioLanguagesAndRoles:4,getBufferFullness:1,getBufferedInfo:2,getConfiguration:4,getExpiration:2,getKeyStatuses:2,getPlaybackRate:2,getTextLanguages:4,getTextLanguagesAndRoles:4,getTextTracks:2,
getStats:5,getVariantTracks:2,getImageTracks:2,getThumbnails:2,isAudioOnly:10,isBuffering:1,isInProgress:1,isLive:10,isTextTrackVisible:1,keySystem:10,seekRange:1,getLoadMode:10},mn={getPlayheadTimeAsDate:1,getPresentationStartTimeAsDate:20},nn=[["getConfiguration","configure"]],on=[["isTextTrackVisible","setTextTrackVisibility"]],pn="addChaptersTrack addTextTrack addTextTrackAsync cancelTrickPlay configure getChapters getChaptersTracks resetConfiguration retryStreaming selectAudioLanguage selectTextLanguage selectTextTrack selectVariantTrack selectVariantsByLabel setTextTrackVisibility trickPlay updateStartTime goToLive".split(" "),
qn=["attach","detach","load","unload"];function rn(a,b,c,d,e,f){var g=this;this.M=a;this.j=new Q(b);this.$=c;this.G=!1;this.C=d;this.L=e;this.S=f;this.h=this.s=!1;this.ea="";this.B=null;this.I=function(){return sn(g)};this.J=function(h,k){var l=en(k);switch(l.type){case "event":var m=l.targetName;l=Pa(l.event);g.C(m,l);break;case "update":m=l.update;for(var n in m){l=g.g[n]||{};for(var p in m[n])l[p]=m[n][p]}g.G&&(g.$(),g.G=!1);break;case "asyncComplete":if(n=l.id,l=l.error,p=g.i[n],delete g.i[n],p)if(l){n=new P(l.severity,l.category,
l.code);for(m in l)n[m]=l[m];p.reject(n)}else p.resolve()}};this.g={video:{},player:{}};this.P=0;this.i={};this.l=null;tn.add(this)}q=rn.prototype;q.destroy=function(){tn["delete"](this);un(this);vn&&wn(this);this.j&&(this.j.stop(),this.j=null);this.L=this.C=null;this.h=this.s=!1;this.J=this.I=this.l=this.i=this.g=this.B=null;return Promise.resolve()};q.xa=function(){return this.h};q.Bd=function(){return this.ea};
q.init=function(){if(this.M.length)if(window.chrome&&chrome.cast&&chrome.cast.isAvailable){this.s=!0;this.j.Ga();var a=new chrome.cast.SessionRequest(this.M);a=new chrome.cast.ApiConfig(a,function(b){for(var c=r(tn),d=c.next();!d.done;d=c.next())xn(d.value,b)},function(b){for(var c=r(tn),d=c.next();!d.done;d=c.next())d=d.value,yn="available"==b,d.j.Ga()},"origin_scoped");chrome.cast.initialize(a,function(){},function(){});yn&&this.j.U(zn);(a=vn)&&a.status!=chrome.cast.SessionStatus.STOPPED?xn(this,
a):vn=null}else window.__onGCastApiAvailable||(window.__onGCastApiAvailable=An),window.__onGCastApiAvailable!=An&&Ta("A global Cast SDK hook is already installed! Shaka Player will be unable to receive a notification when the Cast SDK is ready.")};q.Ce=function(a){this.B=a;this.h&&Bn(this,{type:"appData",appData:this.B})};
q.cast=function(a){var b=this;return L(function(c){if(!b.s)throw new P(1,8,8E3);if(!yn)throw new P(1,8,8001);if(b.h)throw new P(1,8,8002);b.l=new Wc;chrome.cast.requestSession(function(d){return Cn(b,a,d)},function(d){return Dn(b,d)});return z(c,b.l,0)})};function En(a){if(a.h){var b=a.S();chrome.cast.requestSession(function(c){return Cn(a,b,c)},function(c){return Dn(a,c)})}}q.ic=function(){if(this.h){un(this);if(vn){wn(this);try{vn.stop(function(){},function(){})}catch(a){}vn=null}sn(this)}};
q.get=function(a,b){var c=this;if("video"==a){if(kn.includes(b))return function(d){for(var e=[],f=0;f<arguments.length;++f)e[f]=arguments[f];return c.xf.apply(c,[a,b].concat(ja(e)))}}else if("player"==a){if(mn[b]&&!this.get("player","isLive")())return function(){};if(pn.includes(b))return function(d){for(var e=[],f=0;f<arguments.length;++f)e[f]=arguments[f];return c.xf.apply(c,[a,b].concat(ja(e)))};if(qn.includes(b))return function(d){for(var e=[],f=0;f<arguments.length;++f)e[f]=arguments[f];return c.dh.apply(c,
[a,b].concat(ja(e)))};if(ln[b])return function(){return c.g[a][b]}}return this.g[a][b]};q.set=function(a,b,c){this.g[a][b]=c;Bn(this,{type:"set",targetName:a,property:b,value:c})};function Cn(a,b,c){vn=c;c.addUpdateListener(a.I);c.addMessageListener("urn:x-cast:com.google.shaka.v2",a.J);sn(a);Bn(a,{type:"init",initState:b,appData:a.B});a.l.resolve()}
function Dn(a,b){var c=8003;switch(b.code){case "cancel":c=8004;break;case "timeout":c=8005;break;case "receiver_unavailable":c=8006}a.l.reject(new P(2,8,c,b))}q.xf=function(a,b,c){for(var d=[],e=2;e<arguments.length;++e)d[e-2]=arguments[e];Bn(this,{type:"call",targetName:a,methodName:b,args:d})};q.dh=function(a,b,c){for(var d=[],e=2;e<arguments.length;++e)d[e-2]=arguments[e];e=new Wc;var f=this.P.toString();this.P++;this.i[f]=e;try{Bn(this,{type:"asyncCall",targetName:a,methodName:b,args:d,id:f})}catch(g){e.reject(g)}return e};
function xn(a,b){var c=a.S();a.l=new Wc;a.G=!0;Cn(a,c,b)}function wn(a){var b=vn;b.removeUpdateListener(a.I);b.removeMessageListener("urn:x-cast:com.google.shaka.v2",a.J)}function sn(a){var b=vn?"connected"==vn.status:!1;if(a.h&&!b){a.L();for(var c in a.g)a.g[c]={};un(a)}a.h=b;a.ea=b?vn.receiver.friendlyName:"";a.j.Ga()}function un(a){for(var b in a.i){var c=a.i[b];delete a.i[b];c.reject(new P(1,7,7E3))}}
function Bn(a,b){var c=dn(b),d=vn;try{d.sendMessage("urn:x-cast:com.google.shaka.v2",c,function(){},Wa)}catch(e){throw c=new P(2,8,8005,e),d=new O("error",(new Map).set("detail",c)),a.C("player",d),a.ic(),c;}}var zn=.02,yn=!1,vn=null,tn=new Set;function An(a){if(a){a=r(tn);for(var b=a.next();!b.done;b=a.next())b.value.init()}};function Fn(a,b,c){db.call(this);var d=this;this.j=a;this.i=b;this.h=this.B=this.l=this.C=this.s=null;this.I=c;this.G=new Map;this.g=new rn(c,function(){return Gn(d)},function(){return Hn(d)},function(e,f){return In(d,e,f)},function(){return Jn(d)},function(){return Kn(d)});Ln(this)}u(Fn,db);q=Fn.prototype;
q.destroy=function(a){a&&this.g.ic();this.h&&(this.h.release(),this.h=null);a=[];this.i&&(a.push(this.i.destroy()),this.i=null);this.g&&(a.push(this.g.destroy()),this.g=null);this.C=this.s=this.j=null;db.prototype.release.call(this);return Promise.all(a)};q.Kb=function(){return this.s};q.lc=function(){return this.C};q.Te=function(){return this.g.s&&yn};q.xa=function(){return this.g.xa()};q.Bd=function(){return this.g.Bd()};
q.cast=function(){var a=this,b;return L(function(c){return 1==c.g?(b=Kn(a),z(c,a.g.cast(b),2)):a.i?z(c,a.i.Qe(),0):c["return"]()})};q.Ce=function(a){this.g.Ce(a)};q.Hf=function(){En(this.g)};q.ic=function(){this.g.ic()};
q.Xe=function(a){var b=this;return L(function(c){if(1==c.g){if(a==b.I)return c["return"]();b.I=a;b.g.ic();return z(c,b.g.destroy(),2)}b.g=null;b.g=new rn(a,function(){return Gn(b)},function(){return Hn(b)},function(d,e){return In(b,d,e)},function(){return Jn(b)},function(){return Kn(b)});b.g.init();A(c)})};
function Ln(a){a.g.init();a.h=new rf;for(var b=r(gn),c=b.next();!c.done;c=b.next())a.h.o(a.j,c.value,function(f){a.g.xa()||(f=Pa(f),a.l.dispatchEvent(f))});for(var d in Rm)a.h.o(a.i,Rm[d],function(f){a.g.xa()||a.B.dispatchEvent(f)});a.s={};b={};for(var e in a.j)b.zc=e,Object.defineProperty(a.s,b.zc,{configurable:!1,enumerable:!0,get:function(f){return function(){return Mn(a,f.zc)}}(b),set:function(f){return function(g){var h=f.zc;a.g.xa()?a.g.set("video",h,g):a.j[h]=g}}(b)}),b={zc:b.zc};a.C={};Nn(a,
function(f){Object.defineProperty(a.C,f,{configurable:!1,enumerable:!0,get:function(){return On(a,f)}})});Pn(a);a.l=new db;a.l.hd=a.s;a.B=new db;a.B.hd=a.C}function Pn(a){var b=new Map;Nn(a,function(c,d){if(b.has(d)){var e=b.get(d);c.length<e.length?a.G.set(c,e):a.G.set(e,c)}else b.set(d,c)})}
function Nn(a,b){function c(l){return"constructor"==l||"function"!=typeof d[l]?!1:!e.has(l)}var d=a.i,e=new Set;for(f in d)c(f)&&(e.add(f),b(f,d[f]));var f=Object.getPrototypeOf(d);for(var g=Object.getPrototypeOf({});f&&f!=g;){for(var h=r(Object.getOwnPropertyNames(f)),k=h.next();!k.done;k=h.next())k=k.value,c(k)&&(e.add(k),b(k,d[k]));f=Object.getPrototypeOf(f)}}
function Kn(a){var b={video:{},player:{},playerAfterLoad:{},manifest:a.i.Yd(),startTime:null};a.j.pause();for(var c=r(jn),d=c.next();!d.done;d=c.next())d=d.value,b.video[d]=a.j[d];a.j.ended||(b.startTime=a.j.currentTime);c=r(nn);for(d=c.next();!d.done;d=c.next()){var e=d.value;d=e[1];e=a.i[e[0]]();b.player[d]=e}c=r(on);for(d=c.next();!d.done;d=c.next())e=d.value,d=e[1],e=a.i[e[0]](),b.playerAfterLoad[d]=e;return b}function Gn(a){var b=new O("caststatuschanged");a.dispatchEvent(b)}
function Hn(a){var b=new O(a.s.paused?"pause":"play");a.l.dispatchEvent(b)}
function Jn(a){for(var b=r(nn),c=b.next();!c.done;c=b.next()){var d=c.value;c=d[1];d=a.g.get("player",d[0])();a.i[c](d)}var e=a.g.get("player","getAssetUri")();c=a.g.get("video","ended");b=Promise.resolve();var f=a.j.autoplay;d=null;c||(d=a.g.get("video","currentTime"));e&&(a.j.autoplay=!1,b=a.i.load(e,d));var g={};c=r(jn);for(d=c.next();!d.done;d=c.next())d=d.value,g[d]=a.g.get("video",d);b.then(function(){if(a.j){for(var h=r(jn),k=h.next();!k.done;k=h.next())k=k.value,a.j[k]=g[k];h=r(on);for(k=
h.next();!k.done;k=h.next()){var l=k.value;k=l[1];l=a.g.get("player",l[0])();a.i[k](l)}a.j.autoplay=f;e&&a.j.play()}},function(h){h=(new Map).set("detail",h);h=new O(Nm,h);a.i.dispatchEvent(h)})}
function Mn(a,b){if("addEventListener"==b)return function(d,e,f){return a.l.addEventListener(d,e,f)};if("removeEventListener"==b)return function(d,e,f){return a.l.removeEventListener(d,e,f)};if(a.g.xa()&&0==Object.keys(a.g.g.video).length){var c=a.j[b];if("function"!=typeof c)return c}return a.g.xa()?a.g.get("video",b):(c=a.j[b],"function"==typeof c&&(c=c.bind(a.j)),c)}
function On(a,b){a.G.has(b)&&(b=a.G.get(b));if("addEventListener"==b)return function(c,d,e){return a.B.addEventListener(c,d,e)};if("removeEventListener"==b)return function(c,d,e){return a.B.removeEventListener(c,d,e)};if("getMediaElement"==b)return function(){return a.s};if("getSharedConfiguration"==b)return a.g.get("player","getConfiguration");if("getNetworkingEngine"==b)return function(){return a.i.Mc()};if("getDrmEngine"==b)return function(){return a.i.s};if("getAdManager"==b)return function(){return a.i.od()};
if("setVideoContainer"==b)return function(c){return a.i.Ke(c)};if(a.g.xa()){if("getManifest"==b||"drmInfo"==b)return function(){Ta(b+"() does not work while casting!");return null};if("attach"==b||"detach"==b)return function(){Ta(b+"() does not work while casting!");return Promise.resolve()}}return a.g.xa()&&0==Object.keys(a.g.g.video).length&&ln[b]||!a.g.xa()?a.i[b].bind(a.i):a.g.get("player",b)}function In(a,b,c){a.g.xa()&&("video"==b?a.l.dispatchEvent(c):"player"==b&&a.B.dispatchEvent(c))}
N("shaka.cast.CastProxy",Fn);Fn.prototype.changeReceiverId=Fn.prototype.Xe;Fn.prototype.forceDisconnect=Fn.prototype.ic;Fn.prototype.suggestDisconnect=Fn.prototype.Hf;Fn.prototype.setAppData=Fn.prototype.Ce;Fn.prototype.cast=Fn.prototype.cast;Fn.prototype.receiverName=Fn.prototype.Bd;Fn.prototype.isCasting=Fn.prototype.xa;Fn.prototype.canCast=Fn.prototype.Te;Fn.prototype.getPlayer=Fn.prototype.lc;Fn.prototype.getVideo=Fn.prototype.Kb;Fn.prototype.destroy=Fn.prototype.destroy;function Qn(a,b,c,d){db.call(this);var e=this;this.g=a;this.i=b;this.h=new rf;this.P={video:a,player:b};this.J=c||function(){};this.S=d||function(f){return f};this.j=null;this.L=!1;this.B=!0;this.s=0;this.I=!1;this.G=!0;this.C=this.l=null;this.M=new Q(function(){Rn(e)});Sn(this)}u(Qn,db);q=Qn.prototype;q.isConnected=function(){return this.L};q.Mg=function(){return this.B};q.lh=function(a){this.j=a};q.Xf=function(){this.j=null};
q.mh=function(a){this.j||(this.j={metadataType:cast.receiver.media.MetadataType.GENERIC});this.j.title=a};q.kh=function(a){this.j||(this.j={metadataType:cast.receiver.media.MetadataType.GENERIC});this.j.images=[{url:a}]};q.jh=function(a){this.j||(this.j={});this.j.artist=a;this.j.metadataType=cast.receiver.media.MetadataType.MUSIC_TRACK};
q.destroy=function(){var a=this,b,c;return L(function(d){if(1==d.g)return a.h&&(a.h.release(),a.h=null),b=[],a.i&&(b.push(a.i.destroy()),a.i=null),a.M&&(a.M.stop(),a.M=null),a.g=null,a.P=null,a.J=null,a.L=!1,a.B=!0,a.l=null,a.C=null,db.prototype.release.call(a),z(d,Promise.all(b),2);c=cast.receiver.CastReceiverManager.getInstance();c.stop();A(d)})};
function Sn(a){var b=cast.receiver.CastReceiverManager.getInstance();b.onSenderConnected=function(){return Tn(a)};b.onSenderDisconnected=function(){return Tn(a)};b.onSystemVolumeChanged=function(){var e=cast.receiver.CastReceiverManager.getInstance().getSystemVolume();e&&Un(a,{type:"update",update:{video:{volume:e.level,muted:e.muted}}},a.l);Un(a,{type:"event",targetName:"video",event:{type:"volumechange"}},a.l)};a.C=b.getCastMessageBus("urn:x-cast:com.google.cast.media");a.C.onMessage=function(e){return Vn(a,
e)};a.l=b.getCastMessageBus("urn:x-cast:com.google.shaka.v2");a.l.onMessage=function(e){return Wn(a,e)};b.start();b=r(gn);for(var c=b.next();!c.done;c=b.next())a.h.o(a.g,c.value,function(e){return Xn(a,"video",e)});for(var d in Rm)a.h.o(a.i,Rm[d],function(e){return Xn(a,"player",e)});cast.__platform__&&cast.__platform__.canDisplayType('video/mp4; codecs="avc1.640028"; width=3840; height=2160')?a.i.Fe(3840,2160):a.i.Fe(1920,1080);a.h.o(a.g,"loadeddata",function(){a.I=!0});a.h.o(a.i,"loading",function(){a.B=
!1;Yn(a)});a.h.o(a.g,"playing",function(){a.B=!1;Yn(a)});a.h.o(a.g,"pause",function(){Yn(a)});a.h.o(a.i,"unloading",function(){a.B=!0;Yn(a)});a.h.o(a.g,"ended",function(){(new Q(function(){a.g&&a.g.ended&&(a.B=!0,Yn(a))})).U(Zn)})}function Tn(a){a.s=0;a.G=!0;a.L=0!=cast.receiver.CastReceiverManager.getInstance().getSenders().length;Yn(a)}
function Yn(a){var b;L(function(c){if(1==c.g)return z(c,Promise.resolve(),2);if(!a.i)return c["return"]();b=new O("caststatuschanged");a.dispatchEvent(b);$n(a)||ao(a);A(c)})}
function bo(a,b,c){var d,e,f,g,h,k,l,m,n,p,t;L(function(v){switch(v.g){case 1:for(d in b.player)e=b.player[d],a.i[d](e);a.J(c);f=a.g.autoplay;return b.manifest?(a.g.autoplay=!1,E(v,5),z(v,a.i.load(b.manifest,b.startTime),7)):z(v,Promise.resolve(),3);case 7:wa(v,3);break;case 5:return g=H(v),h=Nm,k=(new Map).set("detail",g),l=new O(h,k),a.i&&a.i.dispatchEvent(l),v["return"]();case 3:if(!a.i)return v["return"]();for(m in b.video)n=b.video[m],a.g[m]=n;for(p in b.playerAfterLoad)t=b.playerAfterLoad[p],
a.i[p](t);a.g.autoplay=f;b.manifest&&(a.g.play(),ao(a));A(v)}})}function Xn(a,b,c){a.i&&(Rn(a),Un(a,{type:"event",targetName:b,event:c},a.l))}
function Rn(a){a.M.U(co);for(var b={video:{},player:{}},c=r(hn),d=c.next();!d.done;d=c.next())d=d.value,b.video[d]=a.g[d];if(a.i.W())for(var e in mn)0==a.s%mn[e]&&(b.player[e]=a.i[e]());for(var f in ln)0==a.s%ln[f]&&(b.player[f]=a.i[f]());if(c=cast.receiver.CastReceiverManager.getInstance().getSystemVolume())b.video.volume=c.level,b.video.muted=c.muted;a.I&&(a.s+=1);Un(a,{type:"update",update:b},a.l);$n(a)}function $n(a){return a.G&&(a.g.duration||a.i.W())?(eo(a),a.G=!1,!0):!1}
function eo(a,b){var c={contentId:a.i.Yd(),streamType:a.i.W()?"LIVE":"BUFFERED",contentType:""};a.i.W()||(c.duration=a.g.duration);a.j&&(c.metadata=a.j);ao(a,void 0===b?0:b,c)}
function Wn(a,b){var c=en(b.data);switch(c.type){case "init":a.s=0;a.I=!1;a.G=!0;bo(a,c.initState,c.appData);Rn(a);break;case "appData":a.J(c.appData);break;case "set":var d=c.targetName,e=c.property;c=c.value;if("video"==d){var f=cast.receiver.CastReceiverManager.getInstance();if("volume"==e){f.setSystemVolumeLevel(c);break}else if("muted"==e){f.setSystemVolumeMuted(c);break}}a.P[d][e]=c;break;case "call":d=a.P[c.targetName];d[c.methodName].apply(d,c.args);break;case "asyncCall":d=c.targetName;e=
c.methodName;"player"==d&&"load"==e&&(a.s=0,a.I=!1);var g=c.id,h=b.senderId;f=a.P[d];c=f[e].apply(f,c.args);"player"==d&&"load"==e&&(c=c.then(function(){a.G=!0}));c.then(function(){return fo(a,h,g,null)},function(k){return fo(a,h,g,k)})}}
function Vn(a,b){var c=en(b.data);switch(c.type){case "PLAY":a.g.play();ao(a);break;case "PAUSE":a.g.pause();ao(a);break;case "SEEK":var d=c.currentTime,e=c.resumeState;null!=d&&(a.g.currentTime=Number(d));e&&"PLAYBACK_START"==e?(a.g.play(),ao(a)):e&&"PLAYBACK_PAUSE"==e&&(a.g.pause(),ao(a));break;case "STOP":a.i.Qe().then(function(){a.i&&ao(a)});break;case "GET_STATUS":eo(a,Number(c.requestId));break;case "VOLUME":e=c.volume;d=e.level;e=e.muted;var f=a.g.volume,g=a.g.muted;null!=d&&(a.g.volume=Number(d));
null!=e&&(a.g.muted=e);f==a.g.volume&&g==a.g.muted||ao(a);break;case "LOAD":a.s=0;a.I=!1;a.G=!1;d=c.media;e=c.currentTime;f=a.S(d.contentId);g=c.autoplay||!0;a.J(d.customData);g&&(a.g.autoplay=!0);a.i.load(f,e).then(function(){a.i&&eo(a)})["catch"](function(h){var k="LOAD_FAILED";7==h.category&&7E3==h.code&&(k="LOAD_CANCELLED");Un(a,{requestId:Number(c.requestId),type:k},a.C)});break;default:Un(a,{requestId:Number(c.requestId),type:"INVALID_REQUEST",reason:"INVALID_COMMAND"},a.C)}}
function fo(a,b,c,d){a.i&&Un(a,{type:"asyncComplete",id:c,error:d},a.l,b)}function Un(a,b,c,d){a.L&&(a=dn(b),d?c.getCastChannel(d).send(a):c.broadcast(a))}function ao(a,b,c){c=void 0===c?null:c;var d={mediaSessionId:0,playbackRate:a.g.playbackRate,playerState:a.B?go:a.i.Rc()?ho:a.g.paused?io:jo,currentTime:a.g.currentTime,supportedMediaCommands:63,volume:{level:a.g.volume,muted:a.g.muted}};c&&(d.media=c);Un(a,{requestId:void 0===b?0:b,type:"MEDIA_STATUS",status:[d]},a.C)}
N("shaka.cast.CastReceiver",Qn);Qn.prototype.destroy=Qn.prototype.destroy;Qn.prototype.setContentArtist=Qn.prototype.jh;Qn.prototype.setContentImage=Qn.prototype.kh;Qn.prototype.setContentTitle=Qn.prototype.mh;Qn.prototype.clearContentMetadata=Qn.prototype.Xf;Qn.prototype.setContentMetadata=Qn.prototype.lh;Qn.prototype.isIdle=Qn.prototype.Mg;Qn.prototype.isConnected=Qn.prototype.isConnected;var co=.5,Zn=5,go="IDLE",jo="PLAYING",ho="BUFFERING",io="PAUSED";function ko(a){var b=this;this.g=[];this.h=[];this.data=[];(new wg).box("moov",Ag).Z("pssh",function(c){if(!(1<c.version)){var d=Oc(c.reader.X,-12,c.size);b.data.push(d);b.g.push(jd(c.reader.Lb(16)));if(0<c.version){d=c.reader.T();d=r(lb(d));for(var e=d.next();!e.done;e=d.next())e=jd(c.reader.Lb(16)),b.h.push(e)}}}).parse(a)}
function lo(a,b){var c=a.length,d=b.length+16+c,e=new Uint8Array(d),f=Rc(e),g=0;f.setUint32(g,d);g+=4;f.setUint32(g,1886614376);g+=4;f.setUint32(g,0);g+=4;e.set(b,g);g+=b.length;f.setUint32(g,c);e.set(a,g+4);return e}function mo(a){if(!a)return a;var b=new ko(a);if(1>=b.data.length)return a;a=[];var c={};b=r(b.data);for(var d=b.next();!d.done;c={cd:c.cd},d=b.next())c.cd=d.value,a.some(function(e){return function(f){return Mc(f,e.cd)}}(c))||a.push(c.cd);return kd.apply(ed,ja(a))};function no(a,b){var c=oo(a,b);return 1!=c.length?null:c[0]}function po(a,b,c){a=qo(a,b,c);return 1!=a.length?null:a[0]}function oo(a,b){return Array.from(a.childNodes).filter(function(c){return c instanceof Element&&c.tagName==b})}function ro(a){return Array.from(a.childNodes).filter(function(b){return b instanceof Element})}function qo(a,b,c){return Array.from(a.childNodes).filter(function(d){return d instanceof Element&&d.localName==c&&d.namespaceURI==b})}
function so(a,b,c){return a.hasAttributeNS(b,c)?a.getAttributeNS(b,c):null}function to(a,b,c){b=r(b);for(var d=b.next();!d.done;d=b.next())if(d=d.value,a.hasAttributeNS(d,c))return a.getAttributeNS(d,c);return null}function uo(a){return Array.from(a.childNodes).every(vo)?a.textContent.trim():null}function vo(a){return a.nodeType==Node.TEXT_NODE||a.nodeType==Node.CDATA_SECTION_NODE}function wo(a,b,c,d){d=void 0===d?null:d;var e=null;a=a.getAttribute(b);null!=a&&(e=c(a));return null==e?d:e}
function xo(a){if(!a)return null;/^\d+-\d+-\d+T\d+:\d+:\d+(\.\d+)?$/.test(a)&&(a+="Z");a=Date.parse(a);return isNaN(a)?null:Math.floor(a/1E3)}function yo(a){if(!a)return null;a=/^P(?:([0-9]*)Y)?(?:([0-9]*)M)?(?:([0-9]*)D)?(?:T(?:([0-9]*)H)?(?:([0-9]*)M)?(?:([0-9.]*)S)?)?$/.exec(a);if(!a)return null;a=31536E3*Number(a[1]||null)+2592E3*Number(a[2]||null)+86400*Number(a[3]||null)+3600*Number(a[4]||null)+60*Number(a[5]||null)+Number(a[6]||null);return isFinite(a)?a:null}
function zo(a){var b=/([0-9]+)-([0-9]+)/.exec(a);if(!b)return null;a=Number(b[1]);if(!isFinite(a))return null;b=Number(b[2]);return isFinite(b)?{start:a,end:b}:null}function Ao(a){a=Number(a);return 0===a%1?a:null}function Bo(a){a=Number(a);return 0===a%1&&0<a?a:null}function Co(a){a=Number(a);return 0===a%1&&0<=a?a:null}function Do(a){a=Number(a);return isNaN(a)?null:a}function Eo(a){var b;a=(b=a.match(/^(\d+)\/(\d+)$/))?Number(b[1])/Number(b[2]):Number(a);return isNaN(a)?null:a}
function Fo(a,b){var c=new DOMParser,d=null;try{d=c.parseFromString(a,"text/xml")}catch(e){return null}c=d.documentElement;return!c||c.getElementsByTagName("parsererror").length||d.documentElement.tagName!=b?null:c}function Go(a,b){try{var c=Zc(a);return Fo(c,b)}catch(d){return null}};function Ho(a,b,c){var d=Io(a),e=null;a=[];var f=[],g=new Set(d.map(function(h){return h.keyId}));g["delete"](null);if(1<g.size)throw new P(2,4,4010);b||(f=d.filter(function(h){return"urn:mpeg:dash:mp4protection:2011"==h.Af?(e=h.init||e,!1):!0}),f.length&&(a=Jo(e,f,c),0==a.length&&(a=[Ob("",e)])));if(d.length&&(b||!f.length))for(a=[],b=r(Object.values(c)),c=b.next();!c.done;c=b.next())c=c.value,"org.w3.clearkey"!=c&&a.push(Ob(c,e));if(g=Array.from(g)[0]||null)for(b=r(a),c=b.next();!c.done;c=b.next())for(c=
r(c.value.initData),d=c.next();!d.done;d=c.next())d.value.keyId=g;return{bf:g,Si:e,drmInfos:a,gf:!0}}function Ko(a,b,c,d){var e=Ho(a,c,d);if(b.gf){a=1==b.drmInfos.length&&!b.drmInfos[0].keySystem;c=0==e.drmInfos.length;if(0==b.drmInfos.length||a&&!c)b.drmInfos=e.drmInfos;b.gf=!1}else if(0<e.drmInfos.length&&(b.drmInfos=b.drmInfos.filter(function(f){return e.drmInfos.some(function(g){return g.keySystem==f.keySystem})}),0==b.drmInfos.length))throw new P(2,4,4008);return e.bf||b.bf}
function Lo(a){var b=0,c=Rc(a),d=c.getUint32(b,!0);if(d!=a.byteLength)return[];a:{a=b+6;for(b=[];a<c.byteLength-1;){d=c.getUint16(a,!0);a+=2;var e=c.getUint16(a,!0);a+=2;if(0!=(e&1)||e+a>c.byteLength){c=[];break a}var f=Oc(c,a,e);b.push({type:d,value:f});a+=e}c=b}return c}
function Mo(a){a=r(a.getElementsByTagName("DATA"));for(var b=a.next();!b.done;b=a.next()){b=r(b.value.childNodes);for(var c=b.next();!c.done;c=b.next())if(c=c.value,c instanceof Element&&"LA_URL"==c.tagName)return c.textContent}return""}function No(a){a=po(a.node,"urn:microsoft:playready","pro");if(!a)return"";a=hd(a.textContent);a=Lo(a).filter(function(b){return b.type===Oo})[0];if(!a)return"";a=$c(a.value,!0);return(a=Fo(a,"WRMHEADER"))?Mo(a):""}
function Jo(a,b,c){var d=[];b=r(b);for(var e=b.next();!e.done;e=b.next()){e=e.value;var f=c[e.Af];if(f){var g;if(g=po(e.node,"urn:microsoft:playready","pro")){g=hd(g.textContent);var h=new Uint8Array([154,4,240,121,152,64,66,134,171,146,230,91,224,136,95,149]);g=[{initData:lo(g,h),initDataType:"cenc",keyId:e.keyId}]}else g=null;g=Ob(f,e.init||a||g);if(f=Po.get(f))g.licenseServerUri=f(e);d.push(g)}}return d}
function Io(a){var b=[];a=r(a);for(var c=a.next();!c.done;c=a.next())(c=Qo(c.value))&&b.push(c);return b}
function Qo(a){var b=a.getAttribute("schemeIdUri"),c=so(a,"urn:mpeg:cenc:2013","default_KID"),d=qo(a,"urn:mpeg:cenc:2013","pssh").map(uo);if(!b)return null;b=b.toLowerCase();if(c&&(c=c.replace(/-/g,"").toLowerCase(),c.includes(" ")))throw new P(2,4,4009);var e=[];try{e=d.map(function(f){return{initDataType:"cenc",initData:hd(f),keyId:null}})}catch(f){throw new P(2,4,4007);}return{node:a,Af:b,keyId:c,init:0<e.length?e:null}}
var Oo=1,Po=(new Map).set("com.widevine.alpha",function(a){return(a=po(a.node,"urn:microsoft","laurl"))?a.getAttribute("licenseUrl")||"":""}).set("com.microsoft.playready",No).set("com.microsoft.playready.recommendation",No).set("com.microsoft.playready.software",No).set("com.microsoft.playready.hardware",No);function Ro(a,b,c,d,e){var f={RepresentationID:b,Number:c,Bandwidth:d,Time:e};return a.replace(/\$(RepresentationID|Number|Bandwidth|Time)?(?:%0([0-9]+)([diouxX]))?\$/g,function(g,h,k,l){if("$$"==g)return"$";var m=f[h];if(null==m)return g;"RepresentationID"==h&&k&&(k=void 0);"Time"==h&&(m=Math.round(m));switch(l){case void 0:case "d":case "i":case "u":g=m.toString();break;case "o":g=m.toString(8);break;case "x":g=m.toString(16);break;case "X":g=m.toString(16).toUpperCase();break;default:g=m.toString()}k=
window.parseInt(k,10)||1;return Array(Math.max(0,k-g.length)+1).join("0")+g})}
function So(a,b){var c=To(a,b,"timescale"),d=1;c&&(d=Bo(c)||1);var e=To(a,b,"duration");c=Bo(e||"");"image"==a.O.contentType&&(c=Do(e||""));c&&(c/=d);var f=To(a,b,"startNumber");e=Number(To(a,b,"presentationTimeOffset"))||0;var g=Co(f||"");if(null==f||null==g)g=1;var h=Uo(a,b,"SegmentTimeline");f=null;if(h){f=d;var k=a.ba.duration||Infinity,l=oo(h,"S");h=[];var m=-e;l=r(nb(l));for(var n=l.next();!n.done;n=l.next()){n=n.value;var p=n.item,t=n.next,v=wo(p,"t",Co);n=wo(p,"d",Co);var w=wo(p,"r",Ao);null!=
v&&(v-=e);if(!n)break;p=null!=v?v:m;v=w||0;if(0>v)if(t){t=wo(t,"t",Co);if(null==t)break;else if(p>=t)break;v=Math.ceil((t-p)/n)-1}else{if(Infinity==k)break;else if(p/f>=k)break;v=Math.ceil((k*f-p)/n)-1}0<h.length&&p!=m&&(h[h.length-1].end=p/f);t=r(lb(v+1));for(v=t.next();!v.done;v=t.next())m=p+n,h.push({start:p/f,end:m/f,sh:p}),p=m}f=h}return{timescale:d,Fa:c,yc:g,xb:e/d||0,Re:e,timeline:f}}
function To(a,b,c){return[b(a.O),b(a.Ha),b(a.ya)].filter(Lb).map(function(d){return d.getAttribute(c)}).reduce(function(d,e){return d||e})}function Uo(a,b,c){return[b(a.O),b(a.Ha),b(a.ya)].filter(Lb).map(function(d){return no(d,c)}).reduce(function(d,e){return d||e})}
function Vo(a,b,c,d,e,f){for(var g=so(a,"http://www.w3.org/1999/xlink","href"),h=so(a,"http://www.w3.org/1999/xlink","actuate")||"onRequest",k=r(Array.from(a.attributes)),l=k.next();!l.done;l=k.next())l=l.value,"http://www.w3.org/1999/xlink"==l.namespaceURI&&a.removeAttributeNS(l.namespaceURI,l.localName);if(5<=f)return Ue(new P(2,4,4028));if("onLoad"!=h)return Ue(new P(2,4,4027));var m=Nb([d],[g]);return e.request(0,hf(m,b)).va(function(n){n=Go(n.data,a.tagName);if(!n)return Ue(new P(2,4,4001,g));
for(;a.childNodes.length;)a.removeChild(a.childNodes[0]);for(;n.childNodes.length;){var p=n.childNodes[0];n.removeChild(p);a.appendChild(p)}n=r(Array.from(n.attributes));for(p=n.next();!p.done;p=n.next())a.setAttributeNode(p.value.cloneNode(!1));return Wo(a,b,c,m[0],e,f+1)})}
function Wo(a,b,c,d,e,f){f=void 0===f?0:f;if(so(a,"http://www.w3.org/1999/xlink","href")){var g=Vo(a,b,c,d,e,f);c&&(g=g.va(void 0,function(){return Wo(a,b,c,d,e,f)}));return g}g=[];for(var h=r(Array.from(a.childNodes)),k=h.next();!k.done;k=h.next())k=k.value,k instanceof Element&&("urn:mpeg:dash:resolve-to-zero:2013"==so(k,"http://www.w3.org/1999/xlink","href")?a.removeChild(k):"SegmentTimeline"!=k.tagName&&g.push(Wo(k,b,c,d,e,f)));return Ye(g).va(function(){return a})};function Xo(a,b,c,d,e,f,g){var h,k=(new wg).Z("sidx",function(l){h=Yo(b,d,e,f,g,c,l)});a&&k.parse(a);if(h)return h;throw new P(2,3,3004);}
function Yo(a,b,c,d,e,f,g){var h=[];g.reader.skip(4);var k=g.reader.T();if(0==k)throw new P(2,3,3005);if(0==g.version){var l=g.reader.T();var m=g.reader.T()}else l=g.reader.xc(),m=g.reader.xc();g.reader.skip(2);var n=g.reader.wc();a=a+g.size+m;n=r(lb(n));for(m=n.next();!m.done;m=n.next()){var p=g.reader.T();m=(p&2147483648)>>>31;p&=2147483647;var t=g.reader.T();g.reader.skip(4);if(1==m)throw new P(2,3,3006);h.push(new xi(l/k+c,(l+t)/k+c,function(){return f},a,a+p-1,b,c,d,e));l+=t;a+=p}g.parser.stop();
return h};function Zo(a){this.h=Rc(a);this.g=new tg(this.h,0)}Zo.prototype.Ia=function(){return this.g.Ia()};
function $o(a){var b=ap(a);if(7<b.length)throw new P(2,3,3002);var c=0;b=r(b);for(var d=b.next();!d.done;d=b.next())c=256*c+d.value;b=ap(a);a:{d=r(bp);for(var e=d.next();!e.done;e=d.next())if(Mc(b,new Uint8Array(e.value))){d=!0;break a}d=!1}if(d)b=a.h.byteLength-a.g.qa();else{if(8==b.length&&b[1]&224)throw new P(2,3,3001);d=0;e=r(nb(b));for(var f=e.next();!f.done;f=e.next()){f=f.value;var g=f.item;d=0==f.wa?g&(1<<8-b.length)-1:256*d+g}b=d}b=a.g.qa()+b<=a.h.byteLength?b:a.h.byteLength-a.g.qa();d=Rc(a.h,
a.g.qa(),b);a.g.skip(b);return new cp(c,d)}function ap(a){var b=a.g.qa(),c=a.g.ra();if(0==c)throw new P(2,3,3002);c=8-Math.floor(Math.log2(c));a.g.skip(c-1);return Oc(a.h,b,c)}var bp=[[255],[127,255],[63,255,255],[31,255,255,255],[15,255,255,255,255],[7,255,255,255,255,255],[3,255,255,255,255,255,255],[1,255,255,255,255,255,255,255]];function cp(a,b){this.id=a;this.g=b}
function dp(a){if(8<a.g.byteLength)throw new P(2,3,3002);if(8==a.g.byteLength&&a.g.getUint8(0)&224)throw new P(2,3,3001);for(var b=0,c=r(lb(a.g.byteLength)),d=c.next();!d.done;d=c.next())d=a.g.getUint8(d.value),b=256*b+d;return b};function ep(a,b,c,d,e,f,g,h,k){function l(){return e}var m=[];a=new Zo(a.g);for(var n=null,p=null;a.Ia();){var t=$o(a);if(187==t.id){var v=fp(t);v&&(t=c*v.uh,v=b+v.bh,null!=n&&m.push(new xi(n+g,t+g,l,p,v-1,f,g,h,k)),n=t,p=v)}}null!=n&&m.push(new xi(n+g,d+g,l,p,null,f,g,h,k));return m}
function fp(a){var b=new Zo(a.g);a=$o(b);if(179!=a.id)throw new P(2,3,3013);a=dp(a);b=$o(b);if(183!=b.id)throw new P(2,3,3012);b=new Zo(b.g);for(var c=0;b.Ia();){var d=$o(b);if(241==d.id){c=dp(d);break}}return{uh:a,bh:c}};function gp(a,b){var c=Uo(a,b,"Initialization");if(!c)return null;var d=a.O.Va,e=c.getAttribute("sourceURL");e&&(d=Nb(a.O.Va,[e]));e=0;var f=null;if(c=wo(c,"range",zo))e=c.start,f=c.end;return new vi(function(){return d},e,f,hp(a))}
function ip(a,b){var c=Number(To(a,jp,"presentationTimeOffset"))||0,d=To(a,jp,"timescale"),e=1;d&&(e=Bo(d)||1);var f=c/e||0,g=gp(a,jp);kp(a,g);var h=af(a);return{jc:function(){var k=Uo(h,jp,"RepresentationIndex"),l=h.O.Va;k&&(k=k.getAttribute("sourceURL"))&&(l=Nb(h.O.Va,[k]));k=lp(h);return mp(h,b,g,l,k.start,k.end,f)}}}
function mp(a,b,c,d,e,f,g){var h,k,l,m,n,p,t,v,w,y,x,D,C,B,F;return L(function(G){if(1==G.g)return h=a.presentationTimeline,k=!a.Fb||!a.ba.rf,l=a.ba.start,m=a.ba.duration,n=a.O.mimeType.split("/")[1],p=b,t=null,v=[p(d,e,f),"webm"==n?p(c.Ma(),c.Ka,c.Da):null],p=null,z(G,Promise.all(v),2);w=G.h;y=w[0];x=w[1]||null;D=null;C=l-g;B=l;F=m?l+m:Infinity;if("mp4"==n)var I=Xo(y,e,d,c,C,B,F);else{I=new Zo(x);if(440786851!=$o(I).id)throw new P(2,3,3008);var K=$o(I);if(408125543!=K.id)throw new P(2,3,3009);I=
K.g.byteOffset;K=new Zo(K.g);for(var J=null;K.Ia();){var M=$o(K);if(357149030==M.id){J=M;break}}if(!J)throw new P(2,3,3010);J=new Zo(J.g);M=1E6;for(K=null;J.Ia();){var U=$o(J);if(2807729==U.id)M=dp(U);else if(17545==U.id)if(4==U.g.byteLength)K=U.g.getFloat32(0);else if(8==U.g.byteLength)K=U.g.getFloat64(0);else throw new P(2,3,3003);}if(null==K)throw new P(2,3,3011);J=M/1E9;K*=J;M=$o(new Zo(y));if(475249515!=M.id)throw new P(2,3,3007);I=ep(M,I,J,K,d,c,C,B,F)}D=I;h.tc(D);t=new Ui(D);k&&t.Hb(B,F,!0);
return G["return"](t)})}function jp(a){return a.Xc}function lp(a){var b=Uo(a,jp,"RepresentationIndex");a=To(a,jp,"indexRange");a=zo(a||"");b&&(a=wo(b,"range",zo,a));return a}function kp(a,b){np(a,b);if(!lp(a))throw new P(2,4,4002);}function np(a,b){var c=a.O.mimeType.split("/")[1];if(a.O.contentType!=Sb&&"mp4"!=c&&"webm"!=c)throw new P(2,4,4006);if("webm"==c&&!b)throw new P(2,4,4005);}
function hp(a){var b=a.O;return{bandwidth:a.bandwidth,audioSamplingRate:b.audioSamplingRate,codecs:b.codecs,contentType:b.contentType,frameRate:b.frameRate||null,height:b.height||null,mimeType:b.mimeType,channelsCount:b.ud,pixelAspectRatio:b.pixelAspectRatio||null,width:b.width||null}};function op(a,b){var c=gp(a,pp),d=qp(a);if(!d.Fa&&!d.timeline&&1<d.qc.length)throw new P(2,4,4002);if(!d.Fa&&!a.ba.duration&&!d.timeline&&1==d.qc.length)throw new P(2,4,4002);if(d.timeline&&0==d.timeline.length)throw new P(2,4,4002);var e=null,f=null;a.ya.id&&a.O.id&&(f=b[a.ya.id+","+a.O.id])&&(e=f.segmentIndex);var g=zp(a.ba.start,a.ba.duration,a.O.Va,d,c);c=!e;e?e.sc(g,a.presentationTimeline.ub()):e=new Ui(g);a.presentationTimeline.tc(g);a.Fb&&a.ba.rf||e.Hb(a.ba.start,a.ba.duration?a.ba.start+a.ba.duration:
Infinity,c);f&&(f.segmentIndex=e);return{jc:function(){e&&0!=e.R.length||e.rc(g);return Promise.resolve(e)}}}function pp(a){return a.Mb}function qp(a){var b=Ap(a);a=So(a,pp);var c=a.yc;0==c&&(c=1);var d=0;a.Fa?d=a.Fa*(c-1):a.timeline&&0<a.timeline.length&&(d=a.timeline[0].start);return{Fa:a.Fa,startTime:d,yc:c,xb:a.xb,timeline:a.timeline,qc:b}}
function zp(a,b,c,d,e){var f=d.qc.length;d.timeline&&d.timeline.length!=d.qc.length&&(f=Math.min(d.timeline.length,d.qc.length));var g=a-d.xb,h=b?a+b:Infinity,k=[],l=d.startTime,m={};f=r(lb(f));for(var n=f.next();!n.done;m={Nd:m.Nd},n=f.next()){n=n.value;var p=d.qc[n];m.Nd=Nb(c,[p.Sg]);var t=void 0;t=null!=d.Fa?l+d.Fa:d.timeline?d.timeline[n].end:l+b;k.push(new xi(a+l,a+t,function(v){return function(){return v.Nd}}(m),p.start,p.end,e,g,a,h));l=t}return k}
function Ap(a){return[a.O.Mb,a.Ha.Mb,a.ya.Mb].filter(Lb).map(function(b){return oo(b,"SegmentURL")}).reduce(function(b,c){return 0<b.length?b:c}).map(function(b){b.getAttribute("indexRange")&&!a.nf&&(a.nf=!0);var c=b.getAttribute("media");b=wo(b,"mediaRange",zo,{start:0,end:null});return{Sg:c,start:b.start,end:b.end}})};function Bp(a,b,c,d,e,f){var g=Cp(a),h=Dp(a);Ep(h);var k=af(a);if(h.Qc)return np(a,g),{jc:function(){var t=Ro(h.Qc,k.O.id,null,k.bandwidth||null,null);t=Nb(k.O.Va,[t]);return mp(k,b,g,t,0,null,h.xb)}};if(h.Fa)return d||(a.presentationTimeline.le(h.Fa),a.presentationTimeline.me(a.ba.start)),{jc:function(){return Fp(k,h,e,g,f)}};var l=null;d=d=null;a.ya.id&&a.O.id&&(d=a.ya.id+","+a.O.id,d=c[d])&&(l=d.segmentIndex);var m=Gp(k,h,g);c=a.ba.start;var n=a.ba.duration?a.ba.start+a.ba.duration:Infinity,p=
Infinity!=n;l?(p&&(new Ui(m)).Hb(c,n,!0),l.sc(m,a.presentationTimeline.ub())):l=new Ui(m);a.presentationTimeline.tc(m);p&&l.Hb(c,n);d&&a.Fb&&(d.segmentIndex=l);return{jc:function(){l&&0!=l.R.length||l.rc(m);return Promise.resolve(l)}}}function Hp(a){return a.Yc}function Dp(a){var b=So(a,Hp),c=To(a,Hp,"media");a=To(a,Hp,"index");return{Fa:b.Fa,timescale:b.timescale,yc:b.yc,xb:b.xb,Re:b.Re,timeline:b.timeline,je:c,Qc:a}}
function Ep(a){var b=a.Qc?1:0;b+=a.timeline?1:0;b+=a.Fa?1:0;if(0==b)throw new P(2,4,4002);1!=b&&(a.Qc&&(a.timeline=null),a.Fa=null);if(!a.Qc&&!a.je)throw new P(2,4,4002);}
function Fp(a,b,c,d,e){function f(J){var M=(J-t)*p,U=M+b.xb,Y=M+l;M=Y+p;var ka=Math.min(M,h());Y=new xi(Y,ka,function(){var ea=Ro(w,x,J,y,U*v);return Nb(D,[ea])},0,null,d,C,l,h());Y.l=M;return Y}function g(){var J=[Math.max(k.ub(),l),Math.min(k.Qb(),h())].map(function(M){return M-l});return[Math.ceil(J[0]/p),Math.ceil(J[1]/p)-1].map(function(M){return M+t})}function h(){var J=null!=m&&e[m]||n;return J?l+J:Infinity}var k=a.presentationTimeline,l=a.ba.start,m=a.ya.id,n=a.ba.duration,p=b.Fa,t=b.yc,v=
b.timescale,w=b.je,y=a.bandwidth||null,x=a.O.id,D=a.O.Va,C=l-b.xb,B=g();a=a.Fb?Math.max(B[0],B[1]-c+1):B[0];B=B[1];c=[];for(var F=a;F<=B;++F){var G=f(F);c.push(G)}var I=new Ui(c);c=k.Qb()<h();F=k.W();if(c||F){var K=Math.max(a,B+1);I.Ed(p,function(){var J=k.ub();I.Ob(J);var M=r(g());M.next();M=M.next().value;for(var U=[];K<=M;){var Y=f(K);U.push(Y);K++}return J>h()&&!U.length?null:U})}return Promise.resolve(I)}
function Gp(a,b,c){var d=a.ba.start,e=a.ba.duration,f=d-b.xb;e=e?d+e:Infinity;for(var g=[],h={},k=r(nb(b.timeline)),l=k.next();!l.done;h={Md:h.Md,Qd:h.Qd,Td:h.Td,Jd:h.Jd,Vd:h.Vd,Kd:h.Kd},l=k.next()){l=l.value;var m=l.item,n=m.start,p=m.sh;m=m.end;h.Td=l.wa+b.yc;h.Vd=p+b.Re;h.Qd=a.O.id;h.Jd=a.bandwidth||null;h.Md=b.je;h.Kd=a.O.Va;g.push(new xi(d+n,d+m,function(t){return function(){var v=Ro(t.Md,t.Qd,t.Td,t.Jd||null,t.Vd);return Nb(t.Kd,[v]).map(function(w){return w.toString()})}}(h),0,null,c,f,d,e))}return g}
function Cp(a){var b=To(a,Hp,"initialization");if(!b)return null;var c=a.O.id,d=a.bandwidth||null,e=a.O.Va;return new vi(function(){var f=Ro(b,c,null,d,null);return Nb(e,[f])},0,null,hp(a))};function Ip(){this.l=[];this.g=[];this.h=[];this.j=[];this.i=[];this.s=new Set}Ip.prototype.release=function(){for(var a=r(this.g.concat(this.h,this.j,this.i)),b=a.next();!b.done;b=a.next())b=b.value,b.segmentIndex&&b.segmentIndex.release();this.g=[];this.h=[];this.j=[];this.i=[];this.l=[]};
function Jp(a,b,c){var d,e,f,g,h,k,l,m,n,p,t,v,w,y,x,D,C,B,F,G,I,K,J,M,U,Y,ka,ea,ia,Ea,Qa,Ia,ta,ib;return L(function(eb){switch(eb.g){case 1:d=Tb;Kp(b);Lp(b);Mp(b);Np(b);if(!c&&1==b.length){e=b[0];a.g=e.kd;a.h=e.Gd;a.j=e.textStreams;a.i=e.imageStreams;eb.D(2);break}f=-1;g=r(nb(b));for(h=g.next();!h.done;h=g.next())l=k=h.value,m=l.wa,n=l.item,a.s.has(n.id)||(a.s.add(n.id),-1==f&&(f=m));if(-1==f)return eb["return"]();p=b.map(function(Ka){return Ka.kd});t=b.map(function(Ka){return Ka.Gd});v=b.map(function(Ka){return Ka.textStreams});
w=b.map(function(Ka){return Ka.imageStreams});y=r(v);for(x=y.next();!x.done;x=y.next())D=x.value,D.push(Op(d.ua));C=r(w);for(B=C.next();!B.done;B=C.next())F=B.value,F.push(Op(d.Gc));return z(eb,Pp(a.g,p,f,Qp,Rp),3);case 3:return z(eb,Pp(a.h,t,f,Qp,Rp),4);case 4:return z(eb,Pp(a.j,v,f,Qp,Rp),5);case 5:return z(eb,Pp(a.i,w,f,Qp,Rp),2);case 2:G=0;I=[];if(a.h.length&&a.g.length)for(ka=r(a.g),ea=ka.next();!ea.done;ea=ka.next())for(ia=ea.value,Ea=r(a.h),Qa=Ea.next();!Qa.done;Qa=Ea.next())Ia=Qa.value,ta=
lg(ia.drmInfos,Ia.drmInfos),ia.drmInfos.length&&Ia.drmInfos.length&&!ta.length||(ib=G++,I.push({id:ib,language:ia.language,primary:ia.primary,audio:ia,video:Ia,bandwidth:(ia.bandwidth||0)+(Ia.bandwidth||0),drmInfos:ta,allowedByApplication:!0,allowedByKeySystem:!0,decodingInfos:[]}));else for(K=a.h.concat(a.g),J=r(K),M=J.next();!M.done;M=J.next())U=M.value,Y=G++,I.push({id:Y,language:U.language,primary:U.primary,audio:U.type==d.Nb?U:null,video:U.type==d.mb?U:null,bandwidth:U.bandwidth||0,drmInfos:U.drmInfos,
allowedByApplication:!0,allowedByKeySystem:!0,decodingInfos:[]});a.l=I;A(eb)}})}
function Kp(a){a=r(a);for(var b=a.next();!b.done;b=a.next()){b=b.value;for(var c=[],d=r(b.kd),e=d.next();!e.done;e=d.next()){e=e.value;for(var f=!1,g=r(c),h=g.next();!h.done;h=g.next())h=h.value,e.id!=h.id&&e.channelsCount==h.channelsCount&&e.language==h.language&&e.bandwidth==h.bandwidth&&e.label==h.label&&e.codecs==h.codecs&&e.mimeType==h.mimeType&&pc(e.roles,h.roles)&&e.audioSamplingRate==h.audioSamplingRate&&e.primary==h.primary&&(f=!0);f||c.push(e)}b.kd=c}}
function Mp(a){a=r(a);for(var b=a.next();!b.done;b=a.next()){b=b.value;for(var c=[],d=r(b.textStreams),e=d.next();!e.done;e=d.next()){e=e.value;for(var f=!1,g=r(c),h=g.next();!h.done;h=g.next())h=h.value,e.id!=h.id&&e.language==h.language&&e.label==h.label&&e.codecs==h.codecs&&e.mimeType==h.mimeType&&pc(e.roles,h.roles)&&(f=!0);f||c.push(e)}b.textStreams=c}}
function Lp(a){a=r(a);for(var b=a.next();!b.done;b=a.next()){b=b.value;for(var c=[],d=r(b.Gd),e=d.next();!e.done;e=d.next()){e=e.value;for(var f=!1,g=r(c),h=g.next();!h.done;h=g.next())h=h.value,e.id!=h.id&&e.width==h.width&&e.frameRate==h.frameRate&&e.codecs==h.codecs&&e.mimeType==h.mimeType&&e.label==h.label&&pc(e.roles,h.roles)&&Bf(e.closedCaptions,h.closedCaptions)&&e.bandwidth==h.bandwidth&&(f=!0);f||c.push(e)}b.Gd=c}}
function Np(a){a=r(a);for(var b=a.next();!b.done;b=a.next()){b=b.value;for(var c=[],d=r(b.imageStreams),e=d.next();!e.done;e=d.next()){e=e.value;for(var f=!1,g=r(c),h=g.next();!h.done;h=g.next())h=h.value,e.id!=h.id&&e.width==h.width&&e.codecs==h.codecs&&e.mimeType==h.mimeType&&(f=!0);f||c.push(e)}b.imageStreams=c}}
function Sp(a){var b,c,d,e,f,g,h,k,l,m,n,p,t,v,w,y,x,D,C,B,F,G,I,K,J,M,U;return L(function(Y){switch(Y.g){case 1:b=Tb;if(1==a.length)return Y["return"](a[0]);c=a.map(function(ka){return ka.filter(function(ea){return ea.type==b.Nb})});d=a.map(function(ka){return ka.filter(function(ea){return ea.type==b.mb})});e=a.map(function(ka){return ka.filter(function(ea){return ea.type==b.ua})});f=a.map(function(ka){return ka.filter(function(ea){return ea.type==b.Gc})});g=r(e);for(h=g.next();!h.done;h=g.next())k=
h.value,k.push(Tp(b.ua));l=r(f);for(m=l.next();!m.done;m=l.next())n=m.value,n.push(Tp(b.Gc));return z(Y,Pp([],c,0,Up,Vp),2);case 2:return p=Y.h,z(Y,Pp([],d,0,Up,Vp),3);case 3:return t=Y.h,z(Y,Pp([],e,0,Up,Vp),4);case 4:return v=Y.h,z(Y,Pp([],f,0,Up,Vp),5);case 5:w=Y.h;y=0;if(t.length&&p.length)for(F=r(p),G=F.next();!G.done;G=F.next())for(I=G.value,K=r(t),J=K.next();!J.done;J=K.next())M=J.value,U=y++,M.variantIds.push(U),I.variantIds.push(U);else for(x=t.concat(p),D=r(x),C=D.next();!C.done;C=D.next())B=
C.value,B.variantIds=[y++];return Y["return"](t.concat(p).concat(v).concat(w))}})}
function Pp(a,b,c,d,e){var f,g,h,k,l,m,n,p,t,v,w,y,x,D,C,B,F,G,I,K,J,M,U,Y,ka,ea;return L(function(ia){switch(ia.g){case 1:f=Tb;g=[];h=r(nb(b));for(k=h.next();!k.done;k=h.next())m=l=k.value,n=m.wa,p=m.item,n>=c?g.push(new Set(p)):g.push(new Set);t=r(a);v=t.next();case 2:if(v.done){ia.D(4);break}w=v.value;return z(ia,Wp(w,b,c,e,g),5);case 5:y=ia.h;if(!y)throw new P(2,4,4037);v=t.next();ia.D(2);break;case 4:x=r(g);for(D=x.next();!D.done;D=x.next())for(C=D.value,B=r(C),F=B.next();!F.done;F=B.next())G=
F.value,(I=Xp(G,b,d,e,g))&&a.push(I);K=r(g);for(D=K.next();!D.done;D=K.next())for(J=D.value,M={},U=r(J),F=U.next();!F.done;M={Cb:M.Cb},F=U.next())if(M.Cb=F.value,Y=M.Cb.type==f.ua&&!M.Cb.language,ka=M.Cb.type==f.Gc&&!M.Cb.tilesLayout,!Y&&!ka&&(ea=a.some(function(Ea){return function(Qa){return Qa.mimeType==Ea.Cb.mimeType&&sd(Qa.codecs)==sd(Ea.Cb.codecs)}}(M))))throw new P(2,4,4037);return ia["return"](a)}})}
function Wp(a,b,c,d,e){return L(function(f){if(1==f.g)return Yp(b,a),a.matchedStreams?a.segmentIndex?z(f,Zp(a,c),2):f.D(2):f["return"](!1);$p(a,c,d,e);return f["return"](!0)})}
function Zp(a,b){var c,d,e,f,g,h,k,l,m,n,p;return L(function(t){if(1==t.g){c=[];d=a.matchedStreams;e=r(d);for(f=e.next();!f.done;f=e.next())g=f.value,c.push(g.createSegmentIndex()),g.trickModeVideo&&!g.trickModeVideo.segmentIndex&&c.push(g.trickModeVideo.createSegmentIndex());return z(t,Promise.all(c),2)}if(a.segmentIndex instanceof Xi)for(h=r(nb(d)),k=h.next();!k.done;k=h.next())m=l=k.value,n=m.wa,p=m.item,p.segmentIndex&&n>=b&&a.segmentIndex.j.push(p.segmentIndex);A(t)})}
function Xp(a,b,c,d,e){var f=c(a);Yp(b,f);f.createSegmentIndex&&(f.createSegmentIndex=function(){return L(function(g){if(f.segmentIndex)return g.D(0);f.segmentIndex=new Xi;return z(g,Zp(f,0),0)})});if(!f.matchedStreams)return null;$p(f,0,d,e);return f}function $p(a,b,c,d){for(var e=r(nb(a.matchedStreams)),f=e.next();!f.done;f=e.next()){var g=f.value;f=g.wa;g=g.item;if(f>=b){c(a,g);var h=!0;"audio"==a.type&&0==bc(a.language,g.language)&&(h=!1);h&&d[f]["delete"](g)}}}
function Qp(a){var b=Object.assign({},a);b.originalId=null;b.createSegmentIndex=function(){return Promise.resolve()};b.closeSegmentIndex=function(){b.segmentIndex&&(b.segmentIndex.release(),b.segmentIndex=null);if(b.matchedStreams)for(var c=r(b.matchedStreams),d=c.next();!d.done;d=c.next())d=d.value,d.segmentIndex&&(d.segmentIndex.release(),d.segmentIndex=null)};b.segmentIndex=null;b.emsgSchemeIdUris=[];b.keyIds=new Set;b.closedCaptions=null;b.trickModeVideo=null;return b}
function Up(a){a=Object.assign({},a);a.keyIds=new Set;a.segments=[];a.variantIds=[];a.closedCaptions=null;return a}
function Rp(a,b){a.roles=Array.from(new Set(a.roles.concat(b.roles)));b.emsgSchemeIdUris&&(a.emsgSchemeIdUris=Array.from(new Set(a.emsgSchemeIdUris.concat(b.emsgSchemeIdUris))));a.keyIds=function(f,g){return new Set([].concat(ja(f),ja(g)))}(a.keyIds,b.keyIds);null==a.originalId?a.originalId=b.originalId:a.originalId+=","+(b.originalId||"");var c=lg(a.drmInfos,b.drmInfos);if(b.drmInfos.length&&a.drmInfos.length&&!c.length)throw new P(2,4,4038);a.drmInfos=c;a.encrypted=a.encrypted||b.encrypted;if(b.closedCaptions){a.closedCaptions||
(a.closedCaptions=new Map);c=r(b.closedCaptions);for(var d=c.next();!d.done;d=c.next()){var e=r(d.value);d=e.next().value;e=e.next().value;a.closedCaptions.set(d,e)}}b.trickModeVideo?(a.trickModeVideo||(a.trickModeVideo=Qp(b.trickModeVideo),a.trickModeVideo.createSegmentIndex=function(){a.trickModeVideo.segmentIndex=a.segmentIndex.clone();return Promise.resolve()}),Rp(a.trickModeVideo,b.trickModeVideo)):a.trickModeVideo&&Rp(a.trickModeVideo,b)}
function Vp(a,b){a.roles=Array.from(new Set(a.roles.concat(b.roles)));var c=b.keyIds;c=new Set([].concat(ja(a.keyIds),ja(c)));a.keyIds=c;a.encrypted=a.encrypted&&b.encrypted;a.segments.push.apply(a.segments,ja(b.segments));if(b.closedCaptions){a.closedCaptions||(a.closedCaptions=new Map);c=r(b.closedCaptions);for(var d=c.next();!d.done;d=c.next()){var e=r(d.value);d=e.next().value;e=e.next().value;a.closedCaptions.set(d,e)}}}
function Yp(a,b){for(var c=[],d=r(a),e=d.next();!e.done;e=d.next()){var f=b,g={audio:aq,video:aq,text:bq,image:cq}[f.type],h={audio:dq,video:eq,text:fq,image:gq}[f.type],k=null;e=r(e.value);for(var l=e.next();!l.done;l=e.next())l=l.value,!g(f,l)||k&&!h(f,k,l)||(k=l);f=k;if(!f)return;c.push(f)}b.matchedStreams=c}function aq(a,b){var c;if(!(c=b.mimeType!=a.mimeType||sd(b.codecs)!=sd(a.codecs))&&(c=a.drmInfos)){c=a.drmInfos;var d=b.drmInfos;c=!(c.length&&d.length?0<lg(c,d).length:1)}return c?!1:!0}
function bq(a,b){return a.language?b.language?0==bc(a.language,b.language)||b.kind!=a.kind?!1:!0:!0:!1}function cq(a){return a.tilesLayout?!0:!1}
function dq(a,b,c){if(a.id==c.id)return!0;var d=bc(a.language,b.language),e=bc(a.language,c.language);if(e>d)return!0;if(e<d)return!1;if(!b.primary&&c.primary)return!0;if(b.primary&&!c.primary)return!1;if(a.roles.length)return d=b.roles.filter(function(f){return a.roles.includes(f)}),e=c.roles.filter(function(f){return a.roles.includes(f)}),e.length>d.length?!0:e.length<d.length?!1:c.roles.length<b.roles.length;if(!c.roles.length&&b.roles.length)return!0;if(c.roles.length&&!b.roles.length)return!1;
d=hq(a.channelsCount,b.channelsCount,c.channelsCount);if(d==iq)return!0;if(d==jq)return!1;d=hq(a.audioSamplingRate,b.audioSamplingRate,c.audioSamplingRate);return d==iq?!0:d==jq?!1:a.bandwidth&&kq(a.bandwidth,b.bandwidth,c.bandwidth)==iq?!0:!1}
function eq(a,b,c){if(a.id==c.id)return!0;var d=hq(a.width*a.height,b.width*b.height,c.width*c.height);if(d==iq)return!0;if(d==jq)return!1;if(a.frameRate){d=hq(a.frameRate,b.frameRate,c.frameRate);if(d==iq)return!0;if(d==jq)return!1}return a.bandwidth&&kq(a.bandwidth,b.bandwidth,c.bandwidth)==iq?!0:!1}
function fq(a,b,c){if(a.id==c.id)return!0;var d=bc(a.language,b.language),e=bc(a.language,c.language);if(e>d)return!0;if(e<d)return!1;if(!b.primary&&c.primary)return!0;if(b.primary&&!c.primary)return!1;if(a.roles.length){d=b.roles.filter(function(f){return a.roles.includes(f)});e=c.roles.filter(function(f){return a.roles.includes(f)});if(e.length>d.length)return!0;if(e.length<d.length)return!1}else{if(!c.roles.length&&b.roles.length)return!0;if(c.roles.length&&!b.roles.length)return!1}return c.mimeType!=
a.mimeType||c.codecs!=a.codecs||b.mimeType==a.mimeType&&b.codecs==a.codecs?!1:!0}function gq(a,b,c){return a.id==c.id?!0:hq(a.width*a.height,b.width*b.height,c.width*c.height)==iq?!0:!1}function Tp(a){return{id:0,originalId:"",primary:!1,type:a,mimeType:"",codecs:"",language:"",label:null,width:null,height:null,encrypted:!1,keyIds:new Set,segments:[],variantIds:[],roles:[],forced:!1,channelsCount:null,audioSamplingRate:null,spatialAudio:!1,closedCaptions:null}}
function Op(a){return{id:0,originalId:"",createSegmentIndex:function(){return Promise.resolve()},segmentIndex:new Ui([]),mimeType:"",codecs:"",encrypted:!1,drmInfos:[],keyIds:new Set,language:"",label:null,type:a,primary:!1,trickModeVideo:null,emsgSchemeIdUris:null,roles:[],forced:!1,channelsCount:null,audioSamplingRate:null,spatialAudio:!1,closedCaptions:null}}
function hq(a,b,c){if(b==a&&a!=c)return jq;if(c==a&&a!=b)return iq;if(b>a){if(c<=a||c-a<b-a)return iq;if(c-a>b-a)return jq}else{if(c>a)return jq;if(a-c<a-b)return iq;if(a-c>a-b)return jq}return lq}function kq(a,b,c){b=Math.abs(a-b);a=Math.abs(a-c);return a<b?iq:b<a?jq:lq}var iq=1,lq=0,jq=-1;function mq(){var a=this;this.F=this.m=null;this.h=[];this.H=null;this.G=1;this.yb={};this.L={};this.g=new Ip;this.C=0;this.I=new jc(5);this.B=new Q(function(){a.Tc()});this.i=new bf;this.j=null;this.J=[];this.l=Infinity;this.s=!1}q=mq.prototype;q.configure=function(a){this.m=a};q.start=function(a,b){var c=this,d;return L(function(e){if(1==e.g)return c.s=b.isLowLatencyMode(),c.h=[a],c.F=b,z(e,nq(c),2);d=e.h;c.F&&oq(c,d);if(!c.F)throw new P(2,7,7001);return e["return"](c.H)})};
q.stop=function(){for(var a=r(Object.values(this.yb)),b=a.next();!b.done;b=a.next())b=b.value,b.segmentIndex&&b.segmentIndex.release();this.g&&this.g.release();this.m=this.F=null;this.h=[];this.H=null;this.yb={};this.g=null;null!=this.B&&(this.B.stop(),this.B=null);return this.i.destroy()};q.update=function(){var a=this,b;return L(function(c){if(1==c.g)return E(c,2),z(c,nq(a),4);if(2!=c.g)return wa(c,0);b=H(c);if(!a.F||!b)return c["return"]();a.F.onError(b);A(c)})};q.onExpirationUpdated=function(){};
function nq(a){var b,c,d,e,f,g,h;return L(function(k){if(1==k.g)return b=hf(a.h,a.m.retryParameters),c=a.F.networkingEngine,a.F.modifyManifestRequest(b,{format:"d"}),d=Date.now(),e=c.request(0,b),cf(a.i,e),z(k,e.promise,2);if(3!=k.g){f=k.h;if(!a.F)return k["return"](0);f.uri&&!a.h.includes(f.uri)&&a.h.unshift(f.uri);return z(k,pq(a,f.data,f.uri),3)}g=Date.now();h=(g-d)/1E3;kc(a.I,1,h);return k["return"](h)})}
function pq(a,b,c){var d,e,f,g,h;return L(function(k){if(1==k.g){d=Go(b,"MPD");if(!d)throw new P(2,4,4001,c);if(e=a.m.dash.disableXlinkProcessing)return k["return"](qq(a,d,c));f=a.m.dash.xlinkFailGracefully;g=Wo(d,a.m.retryParameters,f,c,a.F.networkingEngine);cf(a.i,g);return z(k,g.promise,2)}h=k.h;return k["return"](qq(a,h,c))})}
function qq(a,b,c){var d,e,f,g,h,k,l,m,n,p,t,v,w,y,x,D,C,B,F,G,I,K,J,M,U,Y,ka,ea,ia,Ea,Qa,Ia;return L(function(ta){switch(ta.g){case 1:(d=a.m.dash.manifestPreprocessor)&&d(b);e=[c];f=oo(b,"Location").map(uo).filter(Lb);0<f.length&&(g=Nb(e,f),e=a.h=g);h=oo(b,"BaseURL");k=h.map(uo);l=Nb(e,k);m=0;h&&h.length&&(m=wo(h[0],"availabilityTimeOffset",Do)||0);n=a.m.dash.ignoreMinBufferTime;p=0;n||(p=wo(b,"minBufferTime",yo)||0);a.C=wo(b,"minimumUpdatePeriod",yo,-1);t=wo(b,"availabilityStartTime",xo);v=wo(b,
"timeShiftBufferDepth",yo);w=a.m.dash.ignoreSuggestedPresentationDelay;y=null;w||(y=wo(b,"suggestedPresentationDelay",yo));x=a.m.dash.ignoreMaxSegmentDuration;D=null;x||(D=wo(b,"maxSegmentDuration",yo));C=b.getAttribute("type")||"static";if(a.H)for(B=a.H.presentationTimeline,F=r(Object.values(a.yb)),G=F.next();!G.done;G=F.next())I=G.value,I.segmentIndex&&I.segmentIndex.Ob(B.ub());else K=a.m.defaultPresentationDelay||1.5*p,J=null!=y?y:K,B=new R(t,J,a.m.dash.autoCorrectDrift);B.Zc("static"==C);(M=B.W())&&
!isNaN(a.m.availabilityWindowOverride)&&(v=a.m.availabilityWindowOverride);null==v&&(v=Infinity);B.Ie(v);U=b.getAttribute("profiles")||"";Y={Fb:"static"!=C,presentationTimeline:B,ya:null,ba:null,Ha:null,O:null,bandwidth:0,nf:!1,hc:m,profiles:U.split(",")};ka=rq(a,Y,l,b);ea=ka.duration;ia=ka.periods;"static"!=C&&ka.df||B.ib(ea||Infinity);a.l&&!a.s&&(Ea=a.F.isAutoLowLatencyMode())&&(a.F.enableLowLatencyMode(),a.s=a.F.isLowLatencyMode());a.s?B.Bf(a.l):a.l&&Ta("Low-latency DASH live stream detected, but low-latency streaming mode is not enabled in Shaka Player. Set streaming.lowLatencyMode configuration to true, and see https://bit.ly/3clctcj for details.");
B.le(D||1);return z(ta,Jp(a.g,ia,Y.Fb),2);case 2:if(a.H){a.H.variants=a.g.l;a.H.textStreams=a.g.j.slice();a.H.imageStreams=a.g.i;a.F.filter(a.H);ta.D(3);break}a.H={presentationTimeline:B,variants:a.g.l,textStreams:a.g.j.slice(),imageStreams:a.g.i,offlineSessionIds:[],minBufferTime:p||0};if(!B.Kf()){ta.D(3);break}Qa=oo(b,"UTCTiming");return z(ta,sq(a,l,Qa),5);case 5:Ia=ta.h;if(!a.F)return ta["return"]();B.Cf(Ia);case 3:a.F.makeTextStreamsForClosedCaptions(a.H),A(ta)}})}
function rq(a,b,c,d){var e=wo(d,"mediaPresentationDuration",yo),f=[],g=0;d=oo(d,"Period");for(var h=r(nb(d)),k=h.next();!k.done;k=h.next()){var l=k.value;k=l.wa;var m=l.item,n=l.next;l=wo(m,"start",yo,g);var p=m.id,t=wo(m,"duration",yo),v=null;if(n){var w=wo(n,"start",yo);null!=w&&(v=w-l)}else null!=e&&(v=e-l);null==v&&(v=t);if(!(null!==a.j&&null!==p&&null!==l&&l<a.j)||a.J.includes(p)||k+1==d.length){null!==l&&(null===a.j||l>a.j)&&(a.j=l);g=tq(a,b,c,{start:l,duration:v,node:m,rf:null==v||!n});f.push(g);
b.ya.id&&v&&(a.L[b.ya.id]=v);if(null==v){g=null;break}g=l+v}}a.J=f.map(function(y){return y.id});return null!=e?{periods:f,duration:e,df:!1}:{periods:f,duration:g,df:!0}}
function tq(a,b,c,d){b.ya=uq(d.node,null,c);b.ba=d;b.ya.hc=b.hc;b.ya.id||(b.ya.id="__shaka_period_"+d.start);var e=oo(d.node,"EventStream");c=b.presentationTimeline.ub();e=r(e);for(var f=e.next();!f.done;f=e.next())vq(a,d.start,d.duration,f.value,c);c=oo(d.node,"AdaptationSet").map(function(m){return wq(a,b,m)}).filter(Lb);if(b.Fb){d=[];e=r(c);for(f=e.next();!f.done;f=e.next()){f=r(f.value.fh);for(var g=f.next();!g.done;g=f.next())d.push(g.value)}if(d.length!=(new Set(d)).size)throw new P(2,4,4018);
}d=c.filter(function(m){return!m.Oe});c=c.filter(function(m){return m.Oe});c=r(c);for(e=c.next();!e.done;e=c.next()){e=e.value;f=e.Oe.split(" ");g=r(d);for(var h=g.next();!h.done;h=g.next()){var k=h.value;if(f.includes(k.id)){h={};k=r(k.streams);for(var l=k.next();!l.done;h={gd:h.gd},l=k.next())h.gd=l.value,h.gd.trickModeVideo=e.streams.find(function(m){return function(n){return sd(m.gd.codecs)==sd(n.codecs)}}(h))}}}e=a.m.disableAudio?[]:xq(d,"audio");g=a.m.disableVideo?[]:xq(d,"video");f=a.m.disableText?
[]:xq(d,Sb);c=a.m.disableThumbnails?[]:xq(d,"image");if(!g.length&&!e.length)throw new P(2,4,4004);d=[];e=r(e);for(h=e.next();!h.done;h=e.next())d.push.apply(d,ja(h.value.streams));e=[];g=r(g);for(h=g.next();!h.done;h=g.next())e.push.apply(e,ja(h.value.streams));g=[];f=r(f);for(h=f.next();!h.done;h=f.next())g.push.apply(g,ja(h.value.streams));f=[];c=r(c);for(h=c.next();!h.done;h=c.next())f.push.apply(f,ja(h.value.streams));return{id:b.ya.id,kd:d,Gd:e,textStreams:g,imageStreams:f}}
function xq(a,b){return a.filter(function(c){return c.contentType==b})}
function wq(a,b,c){function d(G){switch(G){case 1:case 6:case 13:case 14:case 15:return"SDR";case 16:return"PQ";case 18:return"HLG"}}b.Ha=uq(c,b.ya,null);var e=!1,f=oo(c,"Role"),g=f.map(function(G){return G.getAttribute("value")}).filter(Lb),h=void 0,k=b.Ha.contentType==Sb;k&&(h="subtitle");f=r(f);for(var l=f.next();!l.done;l=f.next()){l=l.value;var m=l.getAttribute("schemeIdUri");if(null==m||"urn:mpeg:dash:role:2011"==m)switch(l=l.getAttribute("value"),l){case "main":e=!0;break;case "caption":case "subtitle":h=
l}}var n;m=oo(c,"EssentialProperty");f=null;l=!1;m=r(m);for(var p=m.next();!p.done;p=m.next()){p=p.value;var t=p.getAttribute("schemeIdUri");"http://dashif.org/guidelines/trickmode"==t?f=p.getAttribute("value"):"urn:mpeg:mpegB:cicp:TransferCharacteristics"==t?n=d(parseInt(p.getAttribute("value"),10)):l=!0}m=oo(c,"SupplementalProperty");m=r(m);for(p=m.next();!p.done;p=m.next())p=p.value,"urn:mpeg:mpegB:cicp:TransferCharacteristics"==p.getAttribute("schemeIdUri")&&(n=d(parseInt(p.getAttribute("value"),
10)));m=oo(c,"Accessibility");var v=new Map;m=r(m);for(p=m.next();!p.done;p=m.next())if(t=p.value,p=t.getAttribute("schemeIdUri"),t=t.getAttribute("value"),"urn:scte:dash:cc:cea-608:2015"==p)if(p=1,null!=t){t=t.split(";");for(var w=r(t),y=w.next();!y.done;y=w.next()){var x=y.value,D=y=void 0;x.includes("=")?(x=x.split("="),y=x[0].startsWith("CC")?x[0]:"CC"+x[0],D=x[1]||"und"):(y="CC"+p,2==t.length?p+=2:p++,D=x);v.set(y,Wb(D))}}else v.set("CC1","und");else if("urn:scte:dash:cc:cea-708:2015"==p)if(p=
1,null!=t)for(t=r(t.split(";")),y=t.next();!y.done;y=t.next())y=y.value,x=w=void 0,y.includes("=")?(y=y.split("="),w="svc"+y[0],x=y[1].split(",")[0].split(":").pop()):(w="svc"+p,p++,x=y),v.set(w,Wb(x));else v.set("svc1","und");else"urn:mpeg:dash:role:2011"==p&&null!=t&&(g.push(t),"captions"==t&&(h="caption"));if(l)return null;l=oo(c,"ContentProtection");var C=Ho(l,a.m.dash.ignoreDrmInfo,a.m.dash.keySystemsByURI),B=Wb(c.getAttribute("lang")||"und"),F=c.getAttribute("label");(l=oo(c,"Label"))&&l.length&&
(l=l[0],l.textContent&&(F=l.textContent));l=oo(c,"Representation");c=l.map(function(G){if(G=yq(a,b,C,h,B,F,e,g,v,G))G.hdr=G.hdr||n;return G}).filter(function(G){return!!G});if(0==c.length){f="image"==b.Ha.contentType;if(a.m.dash.ignoreEmptyAdaptationSet||k||f)return null;throw new P(2,4,4003);}if(!b.Ha.contentType||"application"==b.Ha.contentType)for(b.Ha.contentType=zq(c[0].mimeType,c[0].codecs),k=r(c),m=k.next();!m.done;m=k.next())m.value.type=b.Ha.contentType;k=r(c);for(m=k.next();!m.done;m=k.next())for(m=
m.value,p=r(C.drmInfos),t=p.next();!t.done;t=p.next())t=t.value,t.keyIds=t.keyIds&&m.keyIds?new Set([].concat(ja(t.keyIds),ja(m.keyIds))):t.keyIds||m.keyIds;k=l.map(function(G){return G.getAttribute("id")}).filter(Lb);return{id:b.Ha.id||"__fake__"+a.G++,contentType:b.Ha.contentType,language:B,Ti:e,streams:c,drmInfos:C.drmInfos,Oe:f,fh:k}}
function yq(a,b,c,d,e,f,g,h,k,l){b.O=uq(l,b.Ha,null);a.l=Math.min(a.l,b.O.hc);if(!Aq(b.O))return null;var m=b.ba.start;b.bandwidth=wo(l,"bandwidth",Bo)||0;var n=b.O.contentType,p=n==Sb||"application"==n;n="image"==n;try{var t=function(I,K,J){return Bq(a,I,K,J)};if(b.O.Xc)var v=ip(b,t);else if(b.O.Mb)v=op(b,a.yb);else if(b.O.Yc)v=Bp(b,t,a.yb,!!a.H,a.m.dash.initialSegmentLimit,a.L);else{var w=b.O.Va,y=b.ba.duration||0;v={jc:function(){return Promise.resolve(Wi(m,y,w))}}}}catch(I){if((p||n)&&4002==I.code)return null;
throw I;}t=oo(l,"ContentProtection");t=Ko(t,c,a.m.dash.ignoreDrmInfo,a.m.dash.keySystemsByURI);t=new Set(t?[t]:[]);var x=!1;oo(l,"SupplementalProperty").some(function(I){return"tag:dolby.com,2018:dash:EC3_ExtensionType:2018"==I.getAttribute("schemeIdUri")&&"JOC"==I.getAttribute("value")})&&(b.O.mimeType="audio/eac3-joc",x=!0);var D=!1;p&&(D=h.includes("forced_subtitle")||h.includes("forced-subtitle"));var C;if(n&&((l=oo(l,"EssentialProperty").find(function(I){return["http://dashif.org/thumbnail_tile",
"http://dashif.org/guidelines/thumbnail_tile"].includes(I.getAttribute("schemeIdUri"))}))&&(C=l.getAttribute("value")),!C))return null;var B;l=b.O.codecs;b.profiles.includes("http://dashif.org/guidelines/dash-if-uhd#hevc-hdr-pq10")&&(l.includes("hvc1.2.4.L153.B0")||l.includes("hev1.2.4.L153.B0"))&&(B="PQ");var F=b.O.id?b.ya.id+","+b.O.id:"",G={id:a.G++,originalId:b.O.id,createSegmentIndex:function(){var I,K,J;return L(function(M){if(1==M.g){K=(I=F&&b.Fb&&a.yb[F])?a.yb[F]:G;if(K.segmentIndex)return M.D(0);
J=K;return z(M,v.jc(),3)}J.segmentIndex=M.h;A(M)})},closeSegmentIndex:function(){G.segmentIndex&&(G.segmentIndex.release(),G.segmentIndex=null)},segmentIndex:null,mimeType:b.O.mimeType,codecs:b.O.codecs,frameRate:b.O.frameRate,pixelAspectRatio:b.O.pixelAspectRatio,bandwidth:b.bandwidth,width:b.O.width,height:b.O.height,kind:d,encrypted:0<c.drmInfos.length,drmInfos:c.drmInfos,keyIds:t,language:e,label:f,type:b.Ha.contentType,primary:g,trickModeVideo:null,emsgSchemeIdUris:b.O.emsgSchemeIdUris,roles:h,
forced:D,channelsCount:b.O.ud,audioSamplingRate:b.O.audioSamplingRate,spatialAudio:x,closedCaptions:k,hdr:B,tilesLayout:C,matchedStreams:[]};F&&b.Fb&&!a.yb[F]&&(a.yb[F]=G);return G}q.Tc=function(){var a=this,b,c;return L(function(d){switch(d.g){case 1:return b=0,E(d,2),z(d,nq(a),4);case 4:b=d.h;wa(d,3);break;case 2:c=H(d),a.F&&(c.severity=1,a.F.onError(c));case 3:if(!a.F)return d["return"]();oq(a,b);A(d)}})};function oq(a,b){0>a.C||a.B.U(Math.max(3,a.C-b,lc(a.I)))}
function uq(a,b,c){b=b||{contentType:"",mimeType:"",codecs:"",emsgSchemeIdUris:[],frameRate:void 0,pixelAspectRatio:void 0,ud:null,audioSamplingRate:null,hc:0};c=c||b.Va;var d=oo(a,"BaseURL"),e=d.map(uo),f=a.getAttribute("contentType")||b.contentType,g=a.getAttribute("mimeType")||b.mimeType,h=a.getAttribute("codecs")||b.codecs,k=wo(a,"frameRate",Eo)||b.frameRate,l=a.getAttribute("sar")||b.pixelAspectRatio,m=oo(a,"InbandEventStream"),n=b.emsgSchemeIdUris.slice();m=r(m);for(var p=m.next();!p.done;p=
m.next())p=p.value.getAttribute("schemeIdUri"),n.includes(p)||n.push(p);m=oo(a,"AudioChannelConfiguration");m=Cq(m)||b.ud;p=wo(a,"audioSamplingRate",Co)||b.audioSamplingRate;f||(f=zq(g,h));var t=no(a,"SegmentBase"),v=no(a,"SegmentTemplate"),w=t?wo(t,"availabilityTimeOffset",Do)||0:0,y=v?wo(v,"availabilityTimeOffset",Do)||0:0;d=d&&d.length?wo(d[0],"availabilityTimeOffset",Do)||0:0;d=b.hc+d+w+y;return{Va:Nb(c,e),Xc:t||b.Xc,Mb:no(a,"SegmentList")||b.Mb,Yc:v||b.Yc,width:wo(a,"width",Co)||b.width,height:wo(a,
"height",Co)||b.height,contentType:f,mimeType:g,codecs:h,frameRate:k,pixelAspectRatio:l,emsgSchemeIdUris:n,id:a.getAttribute("id"),ud:m,audioSamplingRate:p,hc:d}}
function Cq(a){a=r(a);for(var b=a.next();!b.done;b=a.next()){var c=b.value;if(b=c.getAttribute("schemeIdUri"))if(c=c.getAttribute("value"))switch(b){case "urn:mpeg:dash:outputChannelPositionList:2012":return c.trim().split(/ +/).length;case "urn:mpeg:dash:23003:3:audio_channel_configuration:2011":case "urn:dts:dash:audio_channel_configuration:2012":b=parseInt(c,10);if(!b)continue;return b;case "tag:dolby.com,2014:dash:audio_channel_configuration:2011":case "urn:dolby:dash:audio_channel_configuration:2011":b=
parseInt(c,16);if(!b)continue;for(a=0;b;)b&1&&++a,b>>=1;return a;case "urn:mpeg:mpegB:cicp:ChannelConfiguration":if(b=[0,1,2,3,4,5,6,8,2,3,4,7,8,24,8,12,10,12,14,12,14],(c=parseInt(c,10))&&0<c&&c<b.length)return b[c]}}return null}function Aq(a){var b=a.Xc?1:0;b+=a.Mb?1:0;b+=a.Yc?1:0;if(0==b)return a.contentType==Sb||"application"==a.contentType?!0:!1;1!=b&&(a.Xc&&(a.Mb=null),a.Yc=null);return!0}
function Dq(a,b,c,d){var e,f,g,h,k,l;return L(function(m){if(1==m.g)return e=Nb(b,[c]),f=hf(e,a.m.retryParameters),f.method=d,g=a.F.networkingEngine.request(4,f),cf(a.i,g),z(m,g.promise,2);h=m.h;if("HEAD"==d){if(!h.headers||!h.headers.date)return m["return"](0);k=h.headers.date}else k=Zc(h.data);l=Date.parse(k);return isNaN(l)?m["return"](0):m["return"](l-Date.now())})}
function sq(a,b,c){var d,e,f,g,h,k,l,m;return L(function(n){switch(n.g){case 1:d=c.map(function(p){return{scheme:p.getAttribute("schemeIdUri"),value:p.getAttribute("value")}}),e=a.m.dash.clockSyncUri,!d.length&&e&&d.push({scheme:"urn:mpeg:dash:utc:http-head:2014",value:e}),f=r(d),g=f.next();case 2:if(g.done){n.D(4);break}h=g.value;E(n,5);k=h.scheme;l=h.value;switch(k){case "urn:mpeg:dash:utc:http-head:2014":case "urn:mpeg:dash:utc:http-head:2012":return n.D(7);case "urn:mpeg:dash:utc:http-xsdate:2014":case "urn:mpeg:dash:utc:http-iso:2014":case "urn:mpeg:dash:utc:http-xsdate:2012":case "urn:mpeg:dash:utc:http-iso:2012":return n.D(8);
case "urn:mpeg:dash:utc:direct:2014":case "urn:mpeg:dash:utc:direct:2012":return m=Date.parse(l),n["return"](isNaN(m)?0:m-Date.now());case "urn:mpeg:dash:utc:http-ntp:2014":case "urn:mpeg:dash:utc:ntp:2014":case "urn:mpeg:dash:utc:sntp:2014":Ta("NTP UTCTiming scheme is not supported");break;default:Ta("Unrecognized scheme in UTCTiming element",k)}n.D(9);break;case 7:return z(n,Dq(a,b,l,"HEAD"),10);case 10:return n["return"](n.h);case 8:return z(n,Dq(a,b,l,"GET"),11);case 11:return n["return"](n.h);
case 9:wa(n,3);break;case 5:H(n);case 3:g=f.next();n.D(2);break;case 4:return Ta("A UTCTiming element should always be given in live manifests! This content may not play on clients with bad clocks!"),n["return"](0)}})}
function vq(a,b,c,d,e){var f=d.getAttribute("schemeIdUri")||"",g=d.getAttribute("value")||"",h=wo(d,"timescale",Co)||1;d=r(oo(d,"Event"));for(var k=d.next();!k.done;k=d.next()){k=k.value;var l=wo(k,"presentationTime",Co)||0,m=wo(k,"duration",Co)||0;l=l/h+b;m=l+m/h;null!=c&&(l=Math.min(l,b+c),m=Math.min(m,b+c));m<e||(k={schemeIdUri:f,value:g,startTime:l,endTime:m,id:k.getAttribute("id")||"",eventElement:k},a.F.onTimelineRegionAdded(k))}}
function Bq(a,b,c,d){var e,f,g,h,k;return L(function(l){if(1==l.g)return e=of,f=nj(b,c,d,a.m.retryParameters),g=a.F.networkingEngine,h=g.request(e,f),cf(a.i,h),z(l,h.promise,2);k=l.h;return l["return"](k.data)})}function zq(a,b){return vd(qd(a,b))?Sb:a.split("/")[0]}N("shaka.dash.DashParser",mq);rg.mpd=function(){return new mq};pg["application/dash+xml"]=function(){return new mq};pg["video/vnd.mpeg.dash.mpd"]=function(){return new mq};function Eq(a,b,c,d){this.g=a;this.type=b;this.aa=c;this.segments=d||null}function Fq(a,b,c,d){this.id=a;this.name=b;this.g=c;this.value=void 0===d?null:d}Fq.prototype.toString=function(){function a(d){return d.name+"="+(isNaN(Number(d.value))?'"'+d.value+'"':d.value)}var b="#"+this.name,c=this.g?this.g.map(a):[];this.value&&c.unshift(this.value);0<c.length&&(b+=":"+c.join(","));return b};
Fq.prototype.getAttribute=function(a){var b=this.g.filter(function(c){return c.name==a});return b.length?b[0]:null};function Gq(a,b,c){return(a=a.getAttribute(b))?a.value:c||null}function Hq(a,b){var c=a.getAttribute(b);if(!c)throw new P(2,4,4023,b);return c.value}function Iq(a,b,c){c=void 0===c?[]:c;this.aa=b;this.g=a;this.h=c}function Jq(a,b){this.name=a;this.value=b};function Kq(a,b){return a.filter(function(c){return c.name==b})}function Lq(a,b){return a.filter(function(c){return Hq(c,"TYPE")==b})}function Mq(a,b){var c=Kq(a,b);return c.length?c[0]:null}function Nq(a,b,c){c=void 0===c?0:c;return(a=Mq(a,b))?Number(a.value):c};function Oq(a){this.h=a;this.g=0}function Pq(a){Qq(a,/[ \t]+/gm)}function Qq(a,b){b.lastIndex=a.g;var c=b.exec(a.h);c=null==c?null:{position:c.index,length:c[0].length,results:c};if(a.g==a.h.length||null==c||c.position!=a.g)return null;a.g+=c.length;return c.results}function Rq(a){return a.g==a.h.length?null:(a=Qq(a,/[^ \t\n]*/gm))?a[0]:null};function Sq(){this.g=0}
function Tq(a,b,c){b=Zc(b);b=b.replace(/\r\n|\r(?=[^\n]|$)/gm,"\n").trim();var d=b.split(/\n+/m);if(!/^#EXTM3U($|[ \t\n])/m.test(d[0]))throw new P(2,4,4015);b=0;for(var e=!0,f=r(d),g=f.next();!g.done;g=f.next())if(g=g.value,/^#(?!EXT)/m.test(g)||e)e=!1;else if(g=Uq(a.g++,g),--a.g,Vq.includes(g.name)){b=1;break}else"EXT-X-STREAM-INF"==g.name&&(e=!0);f=[];e=!0;g=r(nb(d));for(var h=g.next();!h.done;h=g.next()){var k=h.value;h=k.wa;var l=k.item;k=k.next;if(/^#(?!EXT)/m.test(l)||e)e=!1;else{l=Uq(a.g++,
l);if(Wq.includes(l.name)){if(1!=b)throw new P(2,4,4017);k=d.splice(h,d.length-h);d=c;e=[];g=[];h=[];l=null;k=r(k);for(var m=k.next();!m.done;m=k.next())m=m.value,/^(#EXT)/.test(m)?(m=Uq(a.g++,m),Vq.includes(m.name)?f.push(m):"EXT-X-MAP"==m.name?l=m:"EXT-X-PART"==m.name?h.push(m):"EXT-X-PRELOAD-HINT"==m.name?"PART"==Gq(m,"TYPE")?h.push(m):"MAP"==Gq(m,"TYPE")&&(m.name="EXT-X-MAP",l=m):g.push(m)):/^#(?!EXT)/m.test(m)||(m=Nb([d],[m.trim()])[0],l&&g.push(l),e.push(new Iq(m,g,h)),g=[],h=[]);h.length&&
(l&&g.push(l),e.push(new Iq("",g,h)));return new Eq(c,b,f,e)}f.push(l);"EXT-X-STREAM-INF"==l.name&&(l.g.push(new Jq("URI",k)),e=!0)}}return new Eq(c,b,f)}function Uq(a,b){var c=b.match(/^#(EXT[^:]*)(?::(.*))?$/);if(!c)throw new P(2,4,4016,b);var d=c[1],e=c[2];c=[];var f;if(e){e=new Oq(e);var g;(g=Qq(e,/^([^,=]+)(?:,|$)/g))&&(f=g[1]);for(var h=/([^=]+)=(?:"([^"]*)"|([^",]*))(?:,|$)/g;g=Qq(e,h);)c.push(new Jq(g[1],g[2]||g[3])),Pq(e)}return new Fq(a,d,c,f)}
var Vq="EXT-X-TARGETDURATION EXT-X-MEDIA-SEQUENCE EXT-X-DISCONTINUITY-SEQUENCE EXT-X-PLAYLIST-TYPE EXT-X-I-FRAMES-ONLY EXT-X-ENDLIST EXT-X-SERVER-CONTROL EXT-X-SKIP".split(" "),Wq="EXTINF EXT-X-BYTERANGE EXT-X-DISCONTINUITY EXT-X-PROGRAM-DATE-TIME EXT-X-KEY EXT-X-DATERANGE EXT-X-MAP".split(" ");function Xq(){}function Yq(a){try{var b=Zq(a);return We({uri:a,vf:a,data:b.data,headers:{"content-type":b.contentType}})}catch(c){return Ue(c)}}function Zq(a){var b=a.split(":");if(2>b.length||"data"!=b[0])throw new P(2,1,1004,a);b=b.slice(1).join(":").split(",");if(2>b.length)throw new P(2,1,1004,a);var c=b[0];a=window.decodeURIComponent(b.slice(1).join(","));b=c.split(";");c=b[0];var d=!1;1<b.length&&"base64"==b[b.length-1]&&(d=!0,b.pop());var e;d?e=hd(a):e=cd(a);return{data:e,contentType:c}}
N("shaka.net.DataUriPlugin",Xq);Xq.parse=Yq;ef("data",Yq);function $q(){var a=this;this.m=this.F=null;this.Aa=1;this.l=new Map;this.B=new Map;this.sa=new Set;this.g=new Map;this.h=null;this.M="";this.$=new Sq;this.ka=0;this.C=new Q(function(){a.Tc()});this.j=ar;this.H=null;this.ia=0;this.I=Infinity;this.ea=this.Ca=0;this.G=new bf;this.S=[];this.L=new Map;this.Ba=!1;this.s=new Map;this.P=null;this.ha=new Map;this.J=new Map;this.i=!1}q=$q.prototype;q.configure=function(a){this.m=a};
q.start=function(a,b){var c=this,d,e;return L(function(f){if(1==f.g)return c.F=b,c.i=b.isLowLatencyMode(),z(f,br(c,a),2);if(3!=f.g)return d=f.h,c.M=d.uri,z(f,cr(c,d.data),3);e=c.ka;0<e&&c.C.U(e);return f["return"](c.H)})};q.stop=function(){this.C&&(this.C.stop(),this.C=null);var a=[];this.G&&(a.push(this.G.destroy()),this.G=null);this.m=this.F=null;this.sa.clear();this.H=null;this.g.clear();this.B.clear();this.s.clear();this.l.clear();return Promise.all(a)};
q.update=function(){var a=this,b,c,d;return L(function(e){if(1==e.g){if(a.j==ar)return e["return"]();b=[];a.P=null;c=Array.from(a.g.values());return c.length?z(e,dr(a,c[0]),2):e.D(2)}for(d=1;d<c.length;d++)b.push(dr(a,c[d]));return z(e,Promise.all(b),0)})};
function dr(a,b){var c,d,e,f,g,h,k,l,m,n,p,t,v;return L(function(w){if(1==w.g)return c=er,d=b.Pf,e=new qb(d),a.i&&b.Uf&&tb(e,new vb("_HLS_skip=YES")),z(w,br(a,e.toString()),2);if(3!=w.g){f=w.h;g=Tq(a.$,f.data,f.uri);if(1!=g.type)throw new P(2,4,4017);h=Kq(g.aa,"EXT-X-DEFINE");k=fr(a,h);l=b.stream;return z(w,gr(a,b.Fd,g,l.type,l.mimeType,b.ie,k,b.Zf,l.codecs,l.bandwidth),3)}m=w.h;l.segmentIndex.sc(m,a.h.ub());m.length&&(n=Nq(g.aa,"EXT-X-MEDIA-SEQUENCE",0),p=b.ie.get(n),l.segmentIndex.Ob(p));t=m[m.length-
1];if(v=Mq(g.aa,"EXT-X-ENDLIST"))hr(a,c.Of),a.h.ib(t.endTime);A(w)})}q.onExpirationUpdated=function(){};
function cr(a,b){var c,d,e,f,g,h,k,l,m,n,p,t,v,w,y,x,D,C,B,F,G,I,K,J,M,U,Y,ka,ea,ia,Ea,Qa,Ia,ta,ib,eb;return L(function(Ka){switch(Ka.g){case 1:c=Tq(a.$,b,a.M);if(0!=c.type)throw new P(2,4,4022);d=Kq(c.aa,"EXT-X-DEFINE");ir(a,d);e=Kq(c.aa,"EXT-X-MEDIA");f=Kq(c.aa,"EXT-X-STREAM-INF");g=Kq(c.aa,"EXT-X-IMAGE-STREAM-INF");jr(a,f);h=Kq(c.aa,"EXT-X-SESSION-DATA");k=r(h);for(l=k.next();!l.done;l=k.next())if(m=l.value,n=Gq(m,"DATA-ID"),p=Gq(m,"URI"),t=Gq(m,"LANGUAGE"),v=Gq(m,"VALUE"),w=(new Map).set("id",
n),p&&w.set("uri",Nb([a.M],[p])[0]),t&&w.set("language",t),v&&w.set("value",v),y=new O("sessiondata",w),a.F)a.F.onEvent(y);return z(Ka,kr(a,e),2);case 2:return lr(a,e),z(Ka,mr(a,f),3);case 3:return x=Ka.h,z(Ka,nr(a,e),4);case 4:return D=Ka.h,z(Ka,or(a,g),5);case 5:C=Ka.h;if(!a.F)throw new P(2,7,7001);if(a.Ba&&0==x.length)throw new P(2,4,4034);F=B=Infinity;G=r(a.g.values());for(I=G.next();!I.done;I=G.next())K=I.value,B=Math.min(B,K.tf),"text"!=K.stream.type&&(F=Math.min(F,K.Rg-K.tf));a.j!=ar?(a.h=
new R(0,a.m.defaultPresentationDelay?a.m.defaultPresentationDelay:a.ea?a.ea:3*a.ia),a.h.Zc(!1)):(a.h=new R(null,0),a.h.Zc(!0));pr(a);if(a.j!=ar)a.ka=a.I,J=er,a.j==J.Se&&(M=a.h.zd,isNaN(a.m.availabilityWindowOverride)||(M=a.m.availabilityWindowOverride),a.h.Ie(M));else for(a.h.ib(F),a.h.offset(-B),U=r(a.g.values()),I=U.next();!I.done;I=U.next())Y=I.value,Y.stream.segmentIndex.offset(-B),Y.stream.segmentIndex.Hb(0,F);a.S=[];ka=[];ea=r(x);for(ia=ea.next();!ia.done;ia=ea.next())for(Ea=ia.value,Qa=r([Ea.video,
Ea.audio]),Ia=Qa.next();!Ia.done;Ia=Qa.next())(ta=Ia.value)&&ka.push(ta);return z(Ka,Promise.all(ka.map(function(Uc){return L(function(Fe){return z(Fe,Uc.createSegmentIndex(),0)})})),6);case 6:ib=r(ka);for(Ia=ib.next();!Ia.done;Ia=ib.next())eb=Ia.value,a.S.push(eb.segmentIndex.R);pr(a);a.H={presentationTimeline:a.h,variants:x,textStreams:D,imageStreams:C,offlineSessionIds:[],minBufferTime:0};a.F.makeTextStreamsForClosedCaptions(a.H);A(Ka)}})}
function ir(a,b){for(var c=r(b),d=c.next();!d.done;d=c.next()){var e=d.value;d=Gq(e,"NAME");e=Gq(e,"VALUE");d&&e&&(a.l.has(d)||a.l.set(d,e))}}function fr(a,b){for(var c=new Map,d=r(b),e=d.next();!e.done;e=d.next()){var f=e.value;e=Gq(f,"NAME");var g=Gq(f,"VALUE");f=Gq(f,"IMPORT");e&&g&&c.set(e,g);f&&(e=a.l.get(f))&&c.set(f,e)}return c}
function jr(a,b){for(var c=r(b),d=c.next();!d.done;d=c.next()){var e=d.value,f=Gq(e,"AUDIO");d=Gq(e,"VIDEO");var g=Gq(e,"SUBTITLES");e=qr(a,e);if(g){var h=Qb(Sb,e);a.s.set(g,h);oc(e,h)}f&&(g=Pb("audio",e),a.s.set(f,g));d&&(f=Pb("video",e),a.s.set(d,f))}}
function nr(a,b){var c,d,e,f,g,h,k,l,m,n,p,t;return L(function(v){if(1==v.g)return c=Lq(b,"SUBTITLES"),d=c.map(function(w){var y,x,D;return L(function(C){if(1==C.g){if(y=a.m.disableText)return C["return"](null);E(C,2);return z(C,rr(a,w),4)}if(2!=C.g)return x=C.h,C["return"](x.stream);D=H(C);if(a.m.hls.ignoreTextStreamFailures)return C["return"](null);throw D;})}),z(v,Promise.all(d),2);e=v.h;f=r(c);for(g=f.next();!g.done;g=f.next())if(h=g.value,k=Hq(h,"GROUP-ID"),l=a.s.get(k))if(m=a.B.get(k))for(n=
r(m),p=n.next();!p.done;p=n.next())t=p.value,t.stream.codecs=l;return v["return"](e.filter(function(w){return w}))})}
function or(a,b){var c,d;return L(function(e){if(1==e.g)return c=b.map(function(f){var g,h,k;return L(function(l){if(1==l.g){if(g=a.m.disableThumbnails)return l["return"](null);E(l,2);return z(l,sr(a,f),4)}if(2!=l.g)return h=l.h,l["return"](h.stream);k=H(l);if(a.m.hls.ignoreImageStreamFailures)return l["return"](null);throw k;})}),z(e,Promise.all(c),2);d=e.h;return e["return"](d.filter(function(f){return f}))})}
function kr(a,b){var c;return L(function(d){if(1==d.g)return b=b.filter(function(e){var f=Gq(e,"URI")||"";return"SUBTITLES"!=Gq(e,"TYPE")&&""!=f}),b.length?z(d,rr(a,b[0]),2):d.D(2);c=b.slice(1).map(function(e){return rr(a,e)});return z(d,Promise.all(c),0)})}
function mr(a,b){var c,d,e;return L(function(f){if(1==f.g)return c=b.map(function(g){var h,k,l,m,n,p,t,v;return L(function(w){if(1==w.g)return h=Gq(g,"FRAME-RATE"),k=Number(Gq(g,"AVERAGE-BANDWIDTH"))||Number(Hq(g,"BANDWIDTH")),l=Gq(g,"RESOLUTION"),m=r(l?l.split("x"):[null,null]),n=m.next().value,p=m.next().value,t=Gq(g,"VIDEO-RANGE"),z(w,tr(a,g,k),2);if(v=w.h){for(var y=w["return"],x=v.audio,D=v.video,C=r(D),B=C.next();!B.done;B=C.next())if(B=B.value.stream)B.width=Number(n)||void 0,B.height=Number(p)||
void 0,B.frameRate=Number(h)||void 0,B.hdr=t||void 0;C=a.m.disableAudio;if(!x.length||C)x=[null];C=a.m.disableVideo;if(!D.length||C)D=[null];C=[];x=r(x);for(B=x.next();!B.done;B=x.next()){B=B.value;for(var F=r(D),G=F.next();!G.done;G=F.next()){var I=G.value;G=B?B.stream:null;var K=I?I.stream:null,J=B?B.stream.drmInfos:null,M=I?I.stream.drmInfos:null;I=(I?I.Fd:"")+" - "+(B?B.Fd:"");G&&K&&J.length&&M.length&&!(0<lg(J,M).length)||a.sa.has(I)||(G={id:a.Aa++,language:G?G.language:"und",primary:!!G&&G.primary||
!!K&&K.primary,audio:G,video:K,bandwidth:k,allowedByApplication:!0,allowedByKeySystem:!0,decodingInfos:[]},C.push(G),a.sa.add(I))}}w=y.call(w,C)}else w=w["return"]([]);return w})}),z(f,Promise.all(c),2);d=f.h;e=d.reduce(Jb,[]);e=e.filter(function(g){return null!=g});return f["return"](e)})}
function tr(a,b,c){var d,e,f,g,h,k,l,m,n,p,t,v,w,y;return L(function(x){if(1==x.g)return d=Tb,e=qr(a,b),f=Gq(b,"AUDIO"),g=Gq(b,"VIDEO"),k=(h=f||g)&&a.B.has(h)?a.B.get(h):[],l={audio:f?k:[],video:g?k:[]},n=!1,p=Hq(b,"URI"),t=l.audio.find(function(D){return D&&D.Fd==p}),v=Qb(d.mb,e),(w=Qb(d.Nb,e))&&!v?m=d.Nb:!k.length&&w&&v?(m=d.mb,e=[[v,w].join()]):l.audio.length&&t?(m=d.Nb,n=!0):m=l.video.length?d.Nb:d.mb,n?x.D(2):z(x,ur(a,b,e,m,c),3);2!=x.g&&(y=x.h);if(y)l[y.stream.type]=[y];else if(null===y)return x["return"](null);
vr(l);return x["return"](l)})}function qr(a,b){var c=[];a.m.disableVideo||c.push(a.m.hls.defaultVideoCodec);a.m.disableAudio||c.push(a.m.hls.defaultAudioCodec);var d=Gq(b,"CODECS",c.join(",")).split(/\s*,\s*/);c=new Set;var e=[];d=r(d);for(var f=d.next();!f.done;f=d.next()){f=f.value;var g=sd(f);c.has(g)||(e.push(f),c.add(g))}return e}function wr(a){a=Gq(a,"LANGUAGE")||"und";return Wb(a)}
function vr(a){a=r(a.audio.concat(a.video));for(var b=a.next();!b.done;b=a.next())if(b=b.value){var c=b.stream.codecs.split(",");c=c.filter(function(d){return"mp4a.40.34"!=d});b.stream.codecs=c.join(",")}}function lr(a,b){var c=Lq(b,"CLOSED-CAPTIONS");c=r(c);for(var d=c.next();!d.done;d=c.next()){var e=d.value;d=wr(e);var f=Hq(e,"GROUP-ID");e=Hq(e,"INSTREAM-ID");a.L.get(f)||a.L.set(f,new Map);a.L.get(f).set(e,d)}}
function rr(a,b){var c,d,e,f,g,h,k,l,m,n,p,t,v,w;return L(function(y){if(1==y.g){c=Hq(b,"GROUP-ID");d="";var x=Hq(b,"TYPE").toLowerCase();"subtitles"==x&&(x=Sb);e=x;e!=Sb&&c&&a.s.has(c)&&(d=a.s.get(c));f=xr(Hq(b,"URI"),a.l);if(a.g.has(f))return y["return"](a.g.get(f));g=wr(b);h=Gq(b,"NAME");k=Gq(b,"DEFAULT");l="YES"==k;"audio"==e?x=(x=Gq(b,"CHANNELS"))?parseInt(x.split("/")[0],10):null:x=null;m=x;"audio"==e?x=(x=Gq(b,"CHANNELS"))?x.includes("/JOC"):!1:x=!1;n=x;p=Gq(b,"CHARACTERISTICS");t=Gq(b,"FORCED");
v="YES"==t;return z(y,yr(a,f,d,e,g,l,h,m,null,p,v,n),2)}w=y.h;a.B.has(c)?a.B.get(c).push(w):a.B.set(c,[w]);if(null==w)return y["return"](null);if(a.g.has(f))return y["return"](a.g.get(f));a.g.set(f,w);return y["return"](w)})}
function sr(a,b){var c,d,e,f,g,h,k,l,m,n;return L(function(p){if(1==p.g){c=xr(Hq(b,"URI"),a.l);d=Gq(b,"CODECS","jpeg")||"";if(a.g.has(c))return p["return"](a.g.get(c));e=wr(b);f=Gq(b,"NAME");g=Gq(b,"CHARACTERISTICS");return z(p,yr(a,c,d,"image",e,!1,f,null,null,g,!1,!1),2)}h=p.h;if(null==h)return p["return"](null);if(a.g.has(c))return p["return"](a.g.get(c));if(k=Gq(b,"RESOLUTION"))if(l=h.stream.segmentIndex.get(0),m=l.tilesLayout)h.stream.width=Number(k.split("x")[0])*Number(m.split("x")[0]),h.stream.height=
Number(k.split("x")[1])*Number(m.split("x")[1]);if(n=Gq(b,"BANDWIDTH"))h.stream.bandwidth=Number(n);a.g.set(c,h);return p["return"](h)})}
function ur(a,b,c,d,e){var f,g,h,k;return L(function(l){if(1==l.g){f=xr(Hq(b,"URI"),a.l);if(a.g.has(f))return l["return"](a.g.get(f));var m=Gq(b,"CLOSED-CAPTIONS");g="video"==d&&m&&"NONE"!=m?a.L.get(m):null;h=Pb(d,c);return z(l,yr(a,f,h,d,"und",!1,null,null,g,null,!1,!1,e),2)}k=l.h;if(null==k)return l["return"](null);if(a.g.has(f))return l["return"](a.g.get(f));a.g.set(f,k);return l["return"](k)})}
function yr(a,b,c,d,e,f,g,h,k,l,m,n,p){var t,v,w,y,x,D,C,B,F,G,I,K,J,M,U,Y,ka,ea,ia,Ea,Qa,Ia,ta,ib,eb,Ka,Uc,Fe,rp,sp,tp,up,Zi,$i,hg,vp,wp,xp,yp;return L(function(ob){switch(ob.g){case 1:return t=Nb([a.M],[b])[0],z(ob,br(a,t),2);case 2:v=ob.h;t=v.uri;w=Tq(a.$,v.data,t);if(1!=w.type)throw new P(2,4,4017);y=[];if(w.segments)for(x=r(w.segments),D=x.next();!D.done;D=x.next())C=D.value,B=Kq(C.aa,"EXT-X-KEY"),y.push.apply(y,ja(B));F=!1;G=[];I=new Set;K=r(y);for(J=K.next();!J.done;J=K.next())if(M=J.value,
U=Hq(M,"METHOD"),"NONE"!=U){F=!0;if("AES-128"==U)return a.Ba=!0,ob["return"](null);Y=Hq(M,"KEYFORMAT");if(ea=(ka=zr[Y])?ka(M):null){if(ea.keyIds)for(ia=r(ea.keyIds),Ea=ia.next();!Ea.done;Ea=ia.next())Qa=Ea.value,I.add(Qa);G.push(ea)}}if(F&&!G.length)throw new P(2,4,4026);Ia=Kq(w.aa,"EXT-X-DEFINE");ta=fr(a,Ia);Ar(a,w);return z(ob,Br(a,d,c,w,ta),3);case 3:return ib=ob.h,Cr.includes(ib)&&(c=""),eb=new Map,Ka=new Map,E(ob,4),z(ob,gr(a,b,w,d,ib,eb,ta,Ka,c,p),6);case 6:Uc=ob.h;wa(ob,5);break;case 4:Fe=
H(ob);if(4035==Fe.code)return Ta("Skipping unsupported HLS stream",ib,b),ob["return"](null);throw Fe;case 5:rp=Uc[0].startTime;sp=Uc[Uc.length-1].endTime;tp=new Ui(Uc);up=d==Sb?"subtitle":void 0;Zi=[];if(l)for($i=r(l.split(",")),hg=$i.next();!hg.done;hg=$i.next())vp=hg.value,Zi.push(vp);xp=(wp=Mq(w.aa,"EXT-X-SERVER-CONTROL"))?null!=wp.getAttribute("CAN-SKIP-UNTIL"):!1;yp={id:a.Aa++,originalId:g,createSegmentIndex:function(){return Promise.resolve()},segmentIndex:tp,mimeType:ib,codecs:c,kind:up,encrypted:F,
drmInfos:G,keyIds:I,language:e,label:g,type:d,primary:f,trickModeVideo:null,emsgSchemeIdUris:null,frameRate:void 0,pixelAspectRatio:void 0,width:void 0,height:void 0,bandwidth:void 0,roles:Zi,forced:m,channelsCount:h,audioSamplingRate:null,spatialAudio:n,closedCaptions:k,hdr:void 0,tilesLayout:void 0};return ob["return"]({stream:yp,Fd:b,Pf:t,tf:rp,Rg:sp,ie:eb,Zf:Ka,Uf:xp})}})}
function Ar(a,b){var c=Mq(b.aa,"EXT-X-PLAYLIST-TYPE"),d=Mq(b.aa,"EXT-X-ENDLIST");d=c&&"VOD"==c.value||d;c=c&&"EVENT"==c.value&&!d;c=!d&&!c;if(d)hr(a,ar);else{c?hr(a,Dr):hr(a,Er);d=Mq(b.aa,"EXT-X-TARGETDURATION");if(!d)throw new P(2,4,4024,"EXT-X-TARGETDURATION");d=Number(d.value);c=Mq(b.aa,"EXT-X-PART-INF");a.i&&c?(a.Ca=Number(Hq(c,"PART-TARGET")),a.I=Math.min(a.Ca,a.I),c=Mq(b.aa,"EXT-X-SERVER-CONTROL"),a.ea=c?Number(Hq(c,"PART-HOLD-BACK")):0):a.I=Math.min(d,a.I);a.ia=Math.max(d,a.ia)}}
function Fr(a,b,c,d){c=Mq(c,"EXT-X-MAP");if(!c)return null;var e=Hq(c,"URI");d=xr(Nb([b],[e])[0],d);b=[d,Gq(c,"BYTERANGE","")].join("-");a.ha.has(b)||(c=Gr(d,c),a.ha.set(b,c));return a.ha.get(b)}function Gr(a,b){var c=0,d=null,e=Gq(b,"BYTERANGE");e&&(c=e.split("@"),d=Number(c[0]),c=Number(c[1]),d=c+d-1);return new vi(function(){return[a]},c,d)}
function Hr(a,b,c,d,e,f,g,h,k){var l=d.aa,m=xr(d.g,g),n=Mq(l,"EXTINF"),p=g=0,t=null,v=[];if(a.i&&d.h.length){a={};d=r(nb(d.h));for(var w=d.next();!w.done;a={Od:a.Od},w=d.next()){w=w.value;var y=w.wa;w=w.item;var x=0==y?c:v[v.length-1];y=0==y?e:x.endTime;var D=Number(Gq(w,"DURATION"));D=y+D;var C=0,B=null;"EXT-X-PRELOAD-HINT"==w.name?C=(x=Gq(w,"BYTERANGE-START"))?Number(x):0:(C=Gq(w,"BYTERANGE"),x=r(Ir(x,C)),C=x.next().value,B=x.next().value);w=Gq(w,"URI");a.Od=Nb([h],[w])[0];v.push(new xi(y,D,function(F){return function(){return[F.Od]}}(a),
C,B,b,f,0,Infinity))}}else if(!n)throw new P(2,4,4024,"EXTINF");n?g=e+Number(n.value.split(",")[0]):g=v[v.length-1].endTime;(h=Mq(l,"EXT-X-BYTERANGE"))?(t=r(Ir(c,h.value)),p=t.next().value,t=t.next().value):v.length&&(p=v[0].Ka,t=v[v.length-1].Da);c="";h=null;"image"==k&&(c="1x1",k=Mq(l,"EXT-X-TILES"))&&(c=Hq(k,"LAYOUT"),(k=Gq(k,"DURATION"))&&(h=Number(k)));return new xi(e,g,function(){return m.length?[m]:[]},p,t,b,f,0,Infinity,v,c,h)}
function Ir(a,b){var c=0,d=null;b&&(c=b.split("@"),d=Number(c[0]),c=c[1]?Number(c[1]):a.Da+1,d=c+d-1);return[c,d]}function pr(a){if(a.h){for(var b=r(a.S),c=b.next();!c.done;c=b.next())a.h.tc(c.value);a.S=[]}}
function gr(a,b,c,d,e,f,g,h,k,l){var m,n,p,t,v,w,y,x,D,C,B,F,G,I,K,J,M,U,Y,ka,ea,ia,Ea,Qa,Ia;return L(function(ta){switch(ta.g){case 1:m=c.segments;p=Nq(c.aa,"EXT-X-MEDIA-SEQUENCE",0);v=(t=Mq(c.aa,"EXT-X-SKIP"))?Number(Gq(t,"SKIPPED-SEGMENTS")):0;w=p+v;if(a.j!=ar&&f.has(w)){y=f.get(w);ta.D(2);break}if(null!=a.P){ta.D(3);break}n=Fr(a,c.g,m[0].aa,g);x=a;return z(ta,Jr(a,b,n,e,w,!1,m[0],g,d,k,l),4);case 4:x.P=ta.h;case 3:y=a.P;case 2:D=m[0].g;Xa(D.split("/").pop());C=Nq(c.aa,"EXT-X-DISCONTINUITY-SEQUENCE");
if(a.i&&(h.has(C)||h.set(C,w),v))for(;h.has(C+1)&&h.get(C+1)<w;)C++;B=a.J.get(C)||0;F=[];G=function(ib){return nb(ib)};I=r(G(m));K=I.next();case 5:if(K.done){ta.D(7);break}M=J=K.value;U=M.wa;Y=M.item;ka=F[F.length-1];ea=0==U?y:ka.endTime;w=p+v+U;f.set(w,ea);n=Fr(a,c.g,Y.aa,g);ia=Mq(Y.aa,"EXT-X-DISCONTINUITY");if(!ia){ta.D(8);break}C++;h.set(C,w);return z(ta,Kr(a,C,b,n,e,w,Y,g,ea,d,k,l),9);case 9:B=ta.h;case 8:!a.i&&(Ea=a.F.isAutoLowLatencyMode())&&(a.F.enableLowLatencyMode(),a.i=a.F.isLowLatencyMode());
Qa=Mq(Y.aa,"EXTINF");a.i||Qa?(Ia=Hr(a,n,ka,Y,ea,B,g,c.g,d),F.push(Ia)):a.i||Ta("Low-latency HLS live stream detected, but low-latency streaming mode is not enabled in Shaka Player. Set streaming.lowLatencyMode configuration to true, and see https://bit.ly/3clctcj for details.");K=I.next();ta.D(5);break;case 7:return ta["return"](F)}})}
function Kr(a,b,c,d,e,f,g,h,k,l,m,n){var p,t;return L(function(v){if(1==v.g)return p=0,a.J.has(b)?(p=a.J.get(b),v.D(2)):z(v,Jr(a,c,d,e,f,!0,g,h,l,m,n),3);2!=v.g&&(t=v.h,p=k-t,a.J.set(b,p));return v["return"](p)})}
function Lr(a,b,c,d,e,f){var g,h,k,l,m,n;return L(function(p){switch(p.g){case 1:g=of;h=nj(b.Ma(),b.Ka,b.Da,a.m.retryParameters);a.F.modifySegmentRequest(h,{type:c,init:b instanceof vi,duration:b.endTime-b.startTime,mimeType:d,codecs:e,bandwidth:f});if(a.m.hls.useFullSegmentsForStartTime)return p["return"](Mr(a,h,g));k=nj(b.Ma(),b.Ka,b.Ka+2048-1,a.m.retryParameters);a.F.modifySegmentRequest(k,{type:c,init:b instanceof vi,duration:b.endTime-b.startTime,mimeType:d,codecs:e,bandwidth:f});E(p,2);return z(p,
Mr(a,k,g),4);case 4:return l=p.h,p["return"](l);case 2:m=H(p);if(7001==m.code)throw m;Ta("Unable to fetch the starting part of HLS segment! Falling back to a full segment request, which is expensive!  Your server should support Range requests and CORS preflights.",k.uris[0]);return z(p,Mr(a,h,g),5);case 5:return n=p.h,p["return"](n)}})}
function Jr(a,b,c,d,e,f,g,h,k,l,m){var n,p,t,v,w,y,x,D;return L(function(C){switch(C.g){case 1:n=Hr(a,c,null,g,0,0,h,"",k);if(a.H&&!f&&(p=a.g.get(b),t=p.ie.get(e),void 0!=t))return C["return"](t);d=d.toLowerCase();if(Cr.includes(d))throw Ta("Raw formats are not yet supported.  Skipping "+d),new P(1,4,4035);if("video/webm"==d)throw Ta("WebM in HLS is not yet supported.  Skipping."),new P(1,4,4035);if("video/mp4"!=d&&"audio/mp4"!=d){C.D(2);break}v=[Lr(a,n,k,d,l,m)];c&&v.push(Lr(a,c,k,d,l,m));return z(C,
Promise.all(v),3);case 3:return w=C.h,y=w[0],x=w[1]||w[0],C["return"](Nr(b,y.uri,y.data,x.data));case 2:if("video/mp2t"!=d){C.D(4);break}return z(C,Lr(a,n,k,d,l,m),5);case 5:return D=C.h,C["return"](Or(b,D.uri,D.data));case 4:throw new P(2,4,4030,b);}})}
function Nr(a,b,c,d){var e=0;(new wg).box("moov",Ag).box("trak",Ag).box("mdia",Ag).Z("mdhd",function(h){e=Rh(h.reader,h.version).timescale;h.parser.stop()}).parse(d,!0);if(!e)throw new P(2,4,4030,a,b);var f=0,g=!1;(new wg).box("moof",Ag).box("traf",Ag).Z("tfdt",function(h){f=Qh(h.reader,h.version).Xd/e;g=!0;h.parser.stop()}).parse(c,!0);if(!g)throw new P(2,4,4030,a,b);return f}
function Or(a,b,c){function d(){f.seek(g+188);h=f.ra();71!=h&&(f.seek(g+192),h=f.ra());71!=h&&(f.seek(g+204),h=f.ra());71!=h&&e();f.yf(1)}function e(){throw new P(2,4,4030,a,b);}var f=new tg(c,0),g=0,h=0;for(c=Math.min(f.X.byteLength-188,940);;){g=f.qa();h=f.ra();if(71!=h){if(0<c){--c;continue}e()}c=0;var k=f.wc();if(8191==(k&8191))d();else if(k&16384)if(k=(f.ra()&48)>>4,0!=k&&2!=k||e(),3==k&&(k=f.ra(),f.skip(k)),1!=f.T()>>8)d();else{f.skip(3);c=f.ra()>>6;0!=c&&1!=c||e();0==f.ra()&&e();c=f.ra();k=
f.wc();var l=f.wc();return(1073741824*((c&14)>>1)+((k&65534)<<14|(l&65534)>>1))/9E4}else d()}}function xr(a,b){var c=String(a).replace(/%7B/g,"{").replace(/%7D/g,"}"),d=c.match(/{\$\w*}/g);if(d){d=r(d);for(var e=d.next();!e.done;e=d.next()){e=e.value;var f=e.slice(2,e.length-1),g=b.get(f);if(g)c=c.replace(e,g);else throw new P(2,4,4039,f);}}return c}
function Br(a,b,c,d,e){var f,g,h,k,l,m,n,p,t,v,w;return L(function(y){if(1==y.g){f=Tb;g=of;h=xr(d.segments[0].g,e);k=new qb(h);l=k.Sa.split(".").pop();m=Pr[b];if(n=m[l])return y["return"](n);if(b==f.ua)return c&&"vtt"!=c&&"wvtt"!=c?y["return"]("application/mp4"):y["return"]("text/vtt");if(b==f.Gc&&(!c||"jpeg"==c))return y["return"]("image/jpeg");p=hf([h],a.m.retryParameters);p.method="HEAD";return z(y,Mr(a,p,g),2)}t=y.h;v=t.headers["content-type"];return v?y["return"](v.split(";")[0]):(w=m.mp4,y["return"](w))})}
function br(a,b){var c=hf([b],a.m.retryParameters);a.F.modifyManifestRequest(c,{format:"h"});return Mr(a,c,0)}q.Tc=function(){var a=this,b,c;return L(function(d){if(1==d.g){if(!a.F)return d["return"]();E(d,2);return z(d,a.update(),4)}if(2!=d.g)return b=a.ka,a.C.U(b),wa(d,0);c=H(d);if(!a.F)return d["return"]();c.severity=1;a.F.onError(c);a.C.U(.1);A(d)})};function hr(a,b){a.j=b;a.h&&a.h.Zc(a.j==ar);a.j!=ar||a.C.stop()}
function Mr(a,b,c){if(!a.G)throw new P(2,7,7001);b=a.F.networkingEngine.request(c,b);cf(a.G,b);return b.promise}N("shaka.hls.HlsParser",$q);
var Cr=["audio/aac","audio/ac3","audio/ec3","audio/mpeg"],Pr={audio:{mp4:"audio/mp4",mp4a:"audio/mp4",m4s:"audio/mp4",m4i:"audio/mp4",m4a:"audio/mp4",m4f:"audio/mp4",cmfa:"audio/mp4",ts:"video/mp2t",aac:"audio/aac",ac3:"audio/ac3",ec3:"audio/ec3",mp3:"audio/mpeg"},video:{mp4:"video/mp4",mp4v:"video/mp4",m4s:"video/mp4",m4i:"video/mp4",m4v:"video/mp4",m4f:"video/mp4",cmfv:"video/mp4",ts:"video/mp2t"},text:{mp4:"application/mp4",m4s:"application/mp4",m4i:"application/mp4",m4f:"application/mp4",cmft:"application/mp4",
vtt:"text/vtt",ttml:"application/ttml+xml"},image:{jpg:"image/jpeg",png:"image/png",svg:"image/svg+xml",webp:"image/webp",avif:"image/avif"}},zr={"urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed":function(a){var b=Hq(a,"METHOD");if(!["SAMPLE-AES","SAMPLE-AES-CTR"].includes(b))return null;b=Hq(a,"URI");b=Zq(b);b=Oc(b.data);b=Ob("com.widevine.alpha",[{initDataType:"cenc",initData:b}]);if(a=Gq(a,"KEYID"))b.keyIds=new Set([a.toLowerCase().substr(2)]);return b},"com.microsoft.playready":function(a){var b=
Hq(a,"METHOD");if(!["SAMPLE-AES","SAMPLE-AES-CTR"].includes(b))return null;a=Hq(a,"URI");a=Zq(a);a=Oc(a.data);b=new Uint8Array([154,4,240,121,152,64,66,134,171,146,230,91,224,136,95,149]);a=lo(a,b);return Ob("com.microsoft.playready",[{initDataType:"cenc",initData:a}])}},ar="VOD",Er="EVENT",Dr="LIVE",er={Of:ar,Nh:Er,Se:Dr};rg.m3u8=function(){return new $q};pg["application/x-mpegurl"]=function(){return new $q};pg["application/vnd.apple.mpegurl"]=function(){return new $q};function Qr(a,b,c,d,e,f){if(200<=c&&299>=c&&202!=c)return{uri:e||d,vf:d,data:b,status:c,headers:a,fromCache:!!a["x-shaka-from-cache"]};e=null;try{e=bd(b)}catch(g){}throw new P(401==c||403==c?2:1,1,1001,d,c,e,a,f);};function Rr(){}function Sr(a,b,c,d,e){var f=new Tr;zf(b.headers).forEach(function(l,m){f.append(m,l)});var g=new Ur,h={Ve:!1,If:!1};a=Vr(a,c,{body:b.body||void 0,headers:f,method:b.method,signal:g.signal,credentials:b.allowCrossSiteCredentials?"include":void 0},h,d,e,b.streamDataCallback);a=new Te(a,function(){h.Ve=!0;g.abort();return Promise.resolve()});if(b=b.retryParameters.timeout){var k=new Q(function(){h.If=!0;g.abort()});k.U(b/1E3);a["finally"](function(){k.stop()})}return a}
function Vr(a,b,c,d,e,f,g){var h,k,l,m,n,p,t,v,w,y,x,D,C;return L(function(B){switch(B.g){case 1:return h=Wr,k=Xr,p=n=0,t=Date.now(),E(B,2),z(B,h(a,c),4);case 4:return l=B.h,f(Yr(l.headers)),v=l.clone().body.getReader(),y=(w=l.headers.get("Content-Length"))?parseInt(w,10):0,x=function(F){function G(){var I,K;return L(function(J){switch(J.g){case 1:return E(J,2),z(J,v.read(),4);case 4:I=J.h;wa(J,3);break;case 2:return H(J),J["return"]();case 3:if(I.done){J.D(5);break}n+=I.value.byteLength;if(!g){J.D(5);
break}return z(J,g(I.value),5);case 5:K=Date.now();if(100<K-t||I.done)e(K-t,n-p,y-n),p=n,t=K;I.done?F.close():(F.enqueue(I.value),G());A(J)}})}G()},new k({start:x}),z(B,l.arrayBuffer(),5);case 5:m=B.h;wa(B,3);break;case 2:D=H(B);if(d.Ve)throw new P(1,1,7001,a,b);if(d.If)throw new P(1,1,1003,a,b);throw new P(1,1,1002,a,D,b);case 3:return C=Yr(l.headers),B["return"](Qr(C,m,l.status,a,l.url,b))}})}function Yr(a){var b={};a.forEach(function(c,d){b[d.trim()]=c});return b}
function Zr(){if(window.ReadableStream)try{new ReadableStream({})}catch(a){return!1}else return!1;return!(!window.fetch||!window.AbortController)}N("shaka.net.HttpFetchPlugin",Rr);Rr.isSupported=Zr;Rr.parse=Sr;var Wr=window.fetch,Ur=window.AbortController,Xr=window.ReadableStream,Tr=window.Headers;Zr()&&(ef("http",Sr,2,!0),ef("https",Sr,2,!0),ef("blob",Sr,2,!0));function $r(){}
function as(a,b,c,d,e){var f=new bs,g=Date.now(),h=0,k=new Promise(function(l,m){f.open(b.method,a,!0);f.responseType="arraybuffer";f.timeout=b.retryParameters.timeout;f.withCredentials=b.allowCrossSiteCredentials;f.onabort=function(){m(new P(1,1,7001,a,c))};var n=!1;f.onreadystatechange=function(){if(2==f.readyState&&!n){var t=cs(f);e(t);n=!0}};f.onload=function(){var t=cs(f),v=f.response;try{var w=Qr(t,v,f.status,a,f.responseURL,c);l(w)}catch(y){m(y)}};f.onerror=function(t){m(new P(1,1,1002,a,t,
c))};f.ontimeout=function(){m(new P(1,1,1003,a,c))};f.onprogress=function(t){var v=Date.now();if(100<v-g||t.lengthComputable&&t.loaded==t.total)d(v-g,t.loaded-h,t.total-t.loaded),h=t.loaded,g=v};for(var p in b.headers)f.setRequestHeader(p.toLowerCase(),b.headers[p]);f.send(b.body)});return new Te(k,function(){f.abort();return Promise.resolve()})}
function cs(a){var b=a.getAllResponseHeaders().trim().split("\r\n");a={};b=r(b);for(var c=b.next();!c.done;c=b.next())c=c.value.split(": "),a[c[0].toLowerCase()]=c.slice(1).join(": ");return a}N("shaka.net.HttpXHRPlugin",$r);$r.parse=as;var bs=window.XMLHttpRequest;ef("http",as,1,!0);ef("https",as,1,!0);ef("blob",as,1,!0);function ds(a,b,c,d){this.g=a;this.i=b;this.groupId=c;this.h=d}function es(a){return a.Ma().map(function(b){return"{"+encodeURI(b)+"}"}).join("")+":"+a.Ka+":"+a.Da}function fs(a,b){return nj(a.g.Ma(),a.g.Ka,a.g.Da,b.streaming.retryParameters)};function gs(){this.h=this.j=this.i=0;this.g=new Map;this.l=0}function hs(a,b){a.i+=b;var c=a.l;a.l++;a.g.set(c,b);return c}gs.prototype.close=function(a,b){if(this.g.has(a)){var c=this.g.get(a);this.g["delete"](a);this.j+=c;this.h+=b}};function is(a){var b=this;this.V=a;this.g=new Map;this.N=new pf(function(){return js(b)["catch"](function(){})});this.h=[];this.Lf=function(){};this.Jf=function(){};this.fc=new gs}is.prototype.destroy=function(){return this.N.destroy()};function ks(a,b,c){a.Lf=b;a.Jf=c}function js(a){var b=a.h.map(function(c){return c()});a.h=[];return Promise.all(b)}
function ls(a,b,c,d,e,f){qf(a.N);var g=(a.g.get(b)||Promise.resolve()).then(function(){var h,k,l,m,n,p,t;return L(function(v){if(1==v.g)return z(v,ms(a,c),2);h=v.h;if(a.N.g)throw new P(2,9,7001);if(e)for(m in k=Oc(h),l=new ko(k),l.data)n=Number(m),p=l.data[n],t=l.g[n],a.Jf(p,t);a.fc.close(d,h.byteLength);var w=a.fc;a.Lf(0==w.i?0:w.j/w.i,a.fc.h);return v["return"](f(h))})});a.g.set(b,g)}
function ns(a,b,c){qf(a.N);var d=(a.g.get(b)||Promise.resolve()).then(function(){return L(function(e){return z(e,c(),0)})});a.g.set(b,d)}function os(a){return L(function(b){return 1==b.g?z(b,Promise.all(a.g.values()),2):b["return"](a.fc.h)})}function ms(a,b){var c,d,e,f;return L(function(g){if(1==g.g)return c=of,d=a.V.request(c,b),e=function(){return d.abort()},a.h.push(e),z(g,d.promise,2);f=g.h;oc(a.h,e);return g["return"](f.data)})};function ps(a,b){var c=this;this.i=a;this.h=a.objectStore(b);this.g=new Wc;a.onabort=function(d){d.preventDefault();c.g.reject()};a.onerror=function(d){d.preventDefault();c.g.reject()};a.oncomplete=function(){c.g.resolve()}}ps.prototype.abort=function(){var a=this;return L(function(b){if(1==b.g){try{a.i.abort()}catch(c){}E(b,2);return z(b,a.g,4)}if(2!=b.g)return wa(b,0);H(b);A(b)})};
function qs(a,b){return new Promise(function(c,d){var e=a.h.openCursor();e.onerror=d;e.onsuccess=function(){var f;return L(function(g){if(1==g.g){if(null==e.result)return c(),g["return"]();f=e.result;return z(g,b(f.key,f.value,f),2)}f["continue"]();A(g)})}})}ps.prototype.store=function(){return this.h};ps.prototype.promise=function(){return this.g};function rs(a){this.h=a;this.g=[]}rs.prototype.destroy=function(){return Promise.all(this.g.map(function(a){return a.abort()}))};function ss(a,b){return ts(a,b,"readwrite")}function ts(a,b,c){c=a.h.transaction([b],c);var d=new ps(c,b);a.g.push(d);d.promise().then(function(){oc(a.g,d)},function(){oc(a.g,d)});return d};function us(a,b,c){this.h=new rs(a);this.i=b;this.g=c}q=us.prototype;q.destroy=function(){return this.h.destroy()};q.hasFixedKeySpace=function(){return!0};q.addSegments=function(){return vs(this.i)};q.removeSegments=function(a,b){return ws(this,this.i,a,b)};q.getSegments=function(a){var b=this,c;return L(function(d){if(1==d.g)return z(d,xs(b,b.i,a),2);c=d.h;return d["return"](c.map(function(e){return b.Ye(e)}))})};q.addManifests=function(){return vs(this.g)};
q.updateManifest=function(){return Promise.reject(new P(2,9,9016,"Cannot modify values in "+this.g))};function ys(a,b,c){a=ss(a.h,a.g);var d=a.store();d.get(b).onsuccess=function(){d.put(c,b)};return a.promise()}q.updateManifestExpiration=function(a,b){var c=ss(this.h,this.g),d=c.store();d.get(a).onsuccess=function(e){if(e=e.target.result)e.expiration=b,d.put(e,a)};return c.promise()};q.removeManifests=function(a,b){return ws(this,this.g,a,b)};
q.getManifests=function(a){var b=this,c;return L(function(d){if(1==d.g)return z(d,xs(b,b.g,a),2);c=d.h;return d["return"](Promise.all(c.map(function(e){return b.Jc(e)})))})};q.getAllManifests=function(){var a=this,b,c;return L(function(d){return 1==d.g?(b=ts(a.h,a.g,"readonly"),c=new Map,z(d,qs(b,function(e,f){var g;return L(function(h){if(1==h.g)return z(h,a.Jc(f),2);g=h.h;c.set(e,g);A(h)})}),2)):3!=d.g?z(d,b.promise(),3):d["return"](c)})};q.Ye=function(a){return a};q.Jc=function(a){return Promise.resolve(a)};
function vs(a){return Promise.reject(new P(2,9,9011,"Cannot add new value to "+a))}q.add=function(a,b){var c=this,d,e,f,g,h,k,l;return L(function(m){if(1==m.g){d=ss(c.h,a);e=d.store();f=[];g={};h=r(b);for(k=h.next();!k.done;g={fd:g.fd},k=h.next())l=k.value,g.fd=e.add(l),g.fd.onsuccess=function(n){return function(){f.push(n.fd.result)}}(g);return z(m,d.promise(),2)}return m["return"](f)})};
function ws(a,b,c,d){a=ss(a.h,b);b=a.store();var e={};c=r(c);for(var f=c.next();!f.done;e={ed:e.ed},f=c.next())e.ed=f.value,b["delete"](e.ed).onsuccess=function(g){return function(){return d(g.ed)}}(e);return a.promise()}
function xs(a,b,c){var d,e,f,g,h,k,l;return L(function(m){if(1==m.g){d=ts(a.h,b,"readonly");e=d.store();f={};g=[];h={};k=r(c);for(l=k.next();!l.done;h={Ec:h.Ec,Ac:h.Ac},l=k.next())h.Ac=l.value,h.Ec=e.get(h.Ac),h.Ec.onsuccess=function(n){return function(){void 0==n.Ec.result&&g.push(n.Ac);f[n.Ac]=n.Ec.result}}(h);return z(m,d.promise(),2)}if(g.length)throw new P(2,9,9012,"Could not find values for "+g);return m["return"](c.map(function(n){return f[n]}))})};function zs(a){this.g=new rs(a)}zs.prototype.destroy=function(){return this.g.destroy()};zs.prototype.getAll=function(){var a=this,b,c;return L(function(d){return 1==d.g?(b=ts(a.g,"session-ids","readonly"),c=[],z(d,qs(b,function(e,f){c.push(f)}),2)):3!=d.g?z(d,b.promise(),3):d["return"](c)})};zs.prototype.add=function(a){var b=ss(this.g,"session-ids"),c=b.store();a=r(a);for(var d=a.next();!d.done;d=a.next())c.add(d.value);return b.promise()};
zs.prototype.remove=function(a){var b=this,c;return L(function(d){return 1==d.g?(c=ss(b.g,"session-ids"),z(d,qs(c,function(e,f,g){a.includes(f.sessionId)&&g["delete"]()}),2)):z(d,c.promise(),0)})};function As(){this.g=new Map}As.prototype.destroy=function(){for(var a=[],b=r(this.g.values()),c=b.next();!c.done;c=b.next())a.push(c.value.destroy());this.g.clear();return Promise.all(a)};As.prototype.init=function(){var a=this;Bs.forEach(function(e,f){var g=e();g&&a.g.set(f,g)});for(var b=[],c=r(this.g.values()),d=c.next();!d.done;d=c.next())b.push(d.value.init());return Promise.all(b)};
function Cs(a){var b=null;a.g.forEach(function(c,d){c.getCells().forEach(function(e,f){e.hasFixedKeySpace()||b||(b={path:{Ya:d,oa:f},oa:e})})});if(b)return b;throw new P(2,9,9013,"Could not find a cell that supports add-operations");}function Ds(a,b){a.g.forEach(function(c,d){c.getCells().forEach(function(e,f){b({Ya:d,oa:f},e)})})}
function Es(a,b,c){a=a.g.get(b);if(!a)throw new P(2,9,9013,"Could not find mechanism with name "+b);b=a.getCells().get(c);if(!b)throw new P(2,9,9013,"Could not find cell with name "+c);return b}function Fs(a,b){a.g.forEach(function(c){b(c.getEmeSessionCell())})}function Gs(a){var b=Array.from(a.g.keys());if(!b.length)throw new P(2,9,9E3,"No supported storage mechanisms found");return a.g.get(b[0]).getEmeSessionCell()}
function Hs(a){var b,c,d;return L(function(e){return 1==e.g?(b=Array.from(a.g.values()),c=0<b.length,c||(d=Bs,d.forEach(function(f){(f=f())&&b.push(f)})),z(e,Promise.all(b.map(function(f){return f.erase()})),2)):c?e.D(0):z(e,Promise.all(b.map(function(f){return f.destroy()})),0)})}function Is(a,b){Bs.set(a,b)}N("shaka.offline.StorageMuxer",As);As.unregister=function(a){Bs["delete"](a)};As.register=Is;As.prototype.destroy=As.prototype.destroy;var Bs=new Map;function Js(){us.apply(this,arguments)}u(Js,us);Js.prototype.updateManifestExpiration=function(a,b){var c=this,d,e,f;return L(function(g){d=ss(c.h,c.g);e=d.store();f=new Wc;e.get(a).onsuccess=function(h){(h=h.target.result)?(h.expiration=b,e.put(h),f.resolve()):f.reject(new P(2,9,9012,"Could not find values for "+a))};return z(g,Promise.all([d.promise(),f]),0)})};
Js.prototype.Jc=function(a){var b,c,d,e,f,g;return L(function(h){if(1==h.g){b=[];for(c=0;c<a.periods.length;++c)d=c==a.periods.length-1?a.duration:a.periods[c+1].startTime,e=d-a.periods[c].startTime,f=Ks(a.periods[c],e),b.push(f);return z(h,Sp(b),2)}g=h.h;return h["return"]({creationTime:0,originalManifestUri:a.originalManifestUri,duration:a.duration,size:a.size,expiration:null==a.expiration?Infinity:a.expiration,streams:g,sessionIds:a.sessionIds,drmInfo:a.drmInfo,appMetadata:a.appMetadata})})};
function Ks(a,b){Ls(a);for(var c=r(a.streams),d=c.next();!d.done;d=c.next());return a.streams.map(function(e){return Ms(e,a.startTime,b)})}
function Ms(a,b,c){var d=a.initSegmentUri?Ns(a.initSegmentUri):null,e=b+a.presentationTimeOffset,f=b+c;return{id:a.id,originalId:null,primary:a.primary,type:a.contentType,mimeType:a.mimeType,codecs:a.codecs,frameRate:a.frameRate,pixelAspectRatio:void 0,hdr:void 0,kind:a.kind,language:a.language,label:a.label,width:a.width,height:a.height,initSegmentKey:d,encrypted:a.encrypted,keyIds:new Set([a.keyId]),segments:a.segments.map(function(g){var h=Ns(g.uri);return{startTime:b+g.startTime,endTime:b+g.endTime,
dataKey:h,initSegmentKey:d,appendWindowStart:b,appendWindowEnd:f,timestampOffset:e,tilesLayout:""}}),variantIds:a.variantIds,roles:[],forced:!1,audioSamplingRate:null,channelsCount:null,spatialAudio:!1,closedCaptions:null,tilesLayout:void 0}}Js.prototype.Ye=function(a){return{data:a.data}};function Ns(a){var b;if((b=/^offline:[0-9]+\/[0-9]+\/([0-9]+)$/.exec(a))||(b=/^offline:segment\/([0-9]+)$/.exec(a)))return Number(b[1]);throw new P(2,9,9004,"Could not parse uri "+a);}
function Ls(a){var b=a.streams.filter(function(h){return"audio"==h.contentType});a=a.streams.filter(function(h){return"video"==h.contentType});if(!b.every(function(h){return h.variantIds})||!a.every(function(h){return h.variantIds})){for(var c=r(b),d=c.next();!d.done;d=c.next())d.value.variantIds=[];c=r(a);for(d=c.next();!d.done;d=c.next())d.value.variantIds=[];c=0;if(a.length&&!b.length){var e=c++,f=r(a);for(d=f.next();!d.done;d=f.next())d.value.variantIds.push(e)}if(!a.length&&b.length)for(e=c++,
f=r(b),d=f.next();!d.done;d=f.next())d.value.variantIds.push(e);if(a.length&&b.length)for(b=r(b),d=b.next();!d.done;d=b.next())for(d=d.value,e=r(a),f=e.next();!f.done;f=e.next()){f=f.value;var g=c++;d.variantIds.push(g);f.variantIds.push(g)}}};function Os(){us.apply(this,arguments)}u(Os,us);
Os.prototype.Jc=function(a){var b,c,d,e,f,g;return L(function(h){if(1==h.g){b=[];for(c=0;c<a.periods.length;++c){d=c==a.periods.length-1?a.duration:a.periods[c+1].startTime;e=d-a.periods[c].startTime;for(var k=a.periods[c],l=[],m=r(k.streams),n=m.next();!n.done;n=m.next())n=n.value,0!=n.variantIds.length&&l.push(Ps(n,k.startTime,k.startTime+e));f=l;b.push(f)}return z(h,Sp(b),2)}g=h.h;return h["return"]({appMetadata:a.appMetadata,creationTime:0,drmInfo:a.drmInfo,duration:a.duration,expiration:null==
a.expiration?Infinity:a.expiration,originalManifestUri:a.originalManifestUri,sessionIds:a.sessionIds,size:a.size,streams:g})})};
function Ps(a,b,c){return{id:a.id,originalId:a.originalId,primary:a.primary,type:a.contentType,mimeType:a.mimeType,codecs:a.codecs,frameRate:a.frameRate,pixelAspectRatio:a.pixelAspectRatio,hdr:void 0,kind:a.kind,language:a.language,label:a.label,width:a.width,height:a.height,encrypted:a.encrypted,keyIds:new Set([a.keyId]),segments:a.segments.map(function(d){return{startTime:b+d.startTime,endTime:b+d.endTime,initSegmentKey:a.initSegmentKey,appendWindowStart:b,appendWindowEnd:c,timestampOffset:b-a.presentationTimeOffset,
dataKey:d.dataKey,tilesLayout:""}}),variantIds:a.variantIds,roles:[],forced:!1,audioSamplingRate:null,channelsCount:null,spatialAudio:!1,closedCaptions:null,tilesLayout:void 0}};function Qs(){us.apply(this,arguments)}u(Qs,us);q=Qs.prototype;q.hasFixedKeySpace=function(){return!1};q.addSegments=function(a){return this.add(this.i,a)};q.addManifests=function(a){return this.add(this.g,a)};q.updateManifest=function(a,b){return ys(this,a,b)};q.Jc=function(a){null==a.expiration&&(a.expiration=Infinity);return Promise.resolve(a)};function Rs(){this.s=this.j=this.i=this.h=this.g=this.l=null}q=Rs.prototype;
q.init=function(){var a=this,b=new Wc,c=window.indexedDB.open("shaka_offline_db",5);c.onsuccess=function(){var d=c.result;a.l=d;var e=d.objectStoreNames;e=e.contains("manifest")&&e.contains("segment")?new Js(d,"segment","manifest"):null;a.g=e;e=d.objectStoreNames;e=e.contains("manifest-v2")&&e.contains("segment-v2")?new Os(d,"segment-v2","manifest-v2"):null;a.h=e;e=d.objectStoreNames;e=e.contains("manifest-v3")&&e.contains("segment-v3")?new Os(d,"segment-v3","manifest-v3"):null;a.i=e;e=d.objectStoreNames;
e=e.contains("manifest-v5")&&e.contains("segment-v5")?new Qs(d,"segment-v5","manifest-v5"):null;a.j=e;d=d.objectStoreNames.contains("session-ids")?new zs(d):null;a.s=d;b.resolve()};c.onupgradeneeded=function(){for(var d=c.result,e=r(["segment-v5","manifest-v5","session-ids"]),f=e.next();!f.done;f=e.next())f=f.value,d.objectStoreNames.contains(f)||d.createObjectStore(f,{autoIncrement:!0})};c.onerror=function(d){b.reject(new P(2,9,9001,c.error));d.preventDefault()};return b};
q.destroy=function(){var a=this;return L(function(b){switch(b.g){case 1:if(!a.g){b.D(2);break}return z(b,a.g.destroy(),2);case 2:if(!a.h){b.D(4);break}return z(b,a.h.destroy(),4);case 4:if(!a.i){b.D(6);break}return z(b,a.i.destroy(),6);case 6:if(!a.j){b.D(8);break}return z(b,a.j.destroy(),8);case 8:if(!a.s){b.D(10);break}return z(b,a.s.destroy(),10);case 10:a.l&&a.l.close(),A(b)}})};
q.getCells=function(){var a=new Map;this.g&&a.set("v1",this.g);this.h&&a.set("v2",this.h);this.i&&a.set("v3",this.i);this.j&&a.set("v5",this.j);return a};q.getEmeSessionCell=function(){return this.s};
q.erase=function(){var a=this;return L(function(b){switch(b.g){case 1:if(!a.g){b.D(2);break}return z(b,a.g.destroy(),2);case 2:if(!a.h){b.D(4);break}return z(b,a.h.destroy(),4);case 4:if(!a.i){b.D(6);break}return z(b,a.i.destroy(),6);case 6:if(!a.j){b.D(8);break}return z(b,a.j.destroy(),8);case 8:return a.l&&a.l.close(),z(b,Ss(),10);case 10:return a.l=null,a.g=null,a.h=null,a.i=null,a.j=null,z(b,a.init(),0)}})};
function Ss(){var a=new Wc,b=window.indexedDB.deleteDatabase("shaka_offline_db");b.onblocked=function(){};b.onsuccess=function(){a.resolve()};b.onerror=function(c){a.reject(new P(2,9,9001,b.error));c.preventDefault()};return a}Is("idb",function(){return Jd()||!window.indexedDB?null:new Rs});function Ts(a,b,c,d){this.g=a;this.i=b;this.h=c;this.l=d;this.j=["offline:",a,"/",b,"/",c,"/",d].join("")}Ts.prototype.Ya=function(){return this.i};Ts.prototype.oa=function(){return this.h};Ts.prototype.key=function(){return this.l};Ts.prototype.toString=function(){return this.j};
function Us(a){a=/^offline:([a-z]+)\/([^/]+)\/([^/]+)\/([0-9]+)$/.exec(a);if(null==a)return null;var b=a[1];if("manifest"!=b&&"segment"!=b)return null;var c=a[2];if(!c)return null;var d=a[3];return d&&null!=b?new Ts(b,c,d,Number(a[4])):null};function Vs(a,b){this.h=a;this.g=b}
function Ws(a,b){var c=new R(null,0);c.ib(b.duration);var d=b.streams.filter(function(l){return"audio"==l.type}),e=b.streams.filter(function(l){return"video"==l.type});d=Xs(a,d,e,c);e=b.streams.filter(function(l){return l.type==Sb}).map(function(l){return Ys(a,l,c)});var f=b.streams.filter(function(l){return"image"==l.type}).map(function(l){return Ys(a,l,c)}),g=b.drmInfo?[b.drmInfo]:[];if(b.drmInfo)for(var h=r(d.values()),k=h.next();!k.done;k=h.next())k=k.value,k.audio&&k.audio.encrypted&&(k.audio.drmInfos=
g),k.video&&k.video.encrypted&&(k.video.drmInfos=g);return{presentationTimeline:c,minBufferTime:2,offlineSessionIds:b.sessionIds,variants:Array.from(d.values()),textStreams:e,imageStreams:f}}
function Xs(a,b,c,d){for(var e=new Set,f=r(b),g=f.next();!g.done;g=f.next()){var h=r(g.value.variantIds);for(g=h.next();!g.done;g=h.next())e.add(g.value)}f=r(c);for(g=f.next();!g.done;g=f.next())for(h=r(g.value.variantIds),g=h.next();!g.done;g=h.next())e.add(g.value);f=new Map;e=r(e);for(g=e.next();!g.done;g=e.next())g=g.value,f.set(g,{id:g,language:"",primary:!1,audio:null,video:null,bandwidth:0,allowedByApplication:!0,allowedByKeySystem:!0,decodingInfos:[]});b=r(b);for(e=b.next();!e.done;e=b.next())for(e=
e.value,g=Ys(a,e,d),h=r(e.variantIds),e=h.next();!e.done;e=h.next())e=f.get(e.value),e.language=g.language,e.primary=e.primary||g.primary,e.audio=g;c=r(c);for(b=c.next();!b.done;b=c.next())for(e=b.value,b=Ys(a,e,d),g=r(e.variantIds),e=g.next();!e.done;e=g.next())e=f.get(e.value),e.primary=e.primary||b.primary,e.video=b;return f}
function Ys(a,b,c){var d=b.segments.map(function(e){return Zs(a,e)});c.tc(d);return{id:b.id,originalId:b.originalId,createSegmentIndex:function(){return Promise.resolve()},segmentIndex:new Ui(d),mimeType:b.mimeType,codecs:b.codecs,width:b.width||void 0,height:b.height||void 0,frameRate:b.frameRate,pixelAspectRatio:b.pixelAspectRatio,hdr:b.hdr,kind:b.kind,encrypted:b.encrypted,drmInfos:[],keyIds:b.keyIds,language:b.language,label:b.label,type:b.type,primary:b.primary,trickModeVideo:null,emsgSchemeIdUris:null,
roles:b.roles,forced:b.forced,channelsCount:b.channelsCount,audioSamplingRate:b.audioSamplingRate,spatialAudio:b.spatialAudio,closedCaptions:b.closedCaptions,tilesLayout:b.tilesLayout}}function Zs(a,b){var c=new Ts("segment",a.h,a.g,b.dataKey);return new xi(b.startTime,b.endTime,function(){return[c.toString()]},0,null,null!=b.initSegmentKey?$s(a,b.initSegmentKey):null,b.timestampOffset,b.appendWindowStart,b.appendWindowEnd,[],b.tilesLayout||"")}
function $s(a,b){var c=new Ts("segment",a.h,a.g,b);return new vi(function(){return[c.toString()]},0,null)};function at(){this.g=null}q=at.prototype;q.configure=function(){};
q.start=function(a,b){var c=this,d,e,f,g,h,k,l;return L(function(m){switch(m.g){case 1:d=Us(a);c.g=d;if(null==d||"manifest"!=d.g)throw new P(2,1,9004,a);e=new As;va(m);return z(m,e.init(),4);case 4:return z(m,Es(e,d.Ya(),d.oa()),5);case 5:return f=m.h,z(m,f.getManifests([d.key()]),6);case 6:return g=m.h,h=g[0],k=new Vs(d.Ya(),d.oa()),l=Ws(k,h),b.makeTextStreamsForClosedCaptions(l),m["return"](l);case 2:return xa(m),z(m,e.destroy(),7);case 7:ya(m,0)}})};q.stop=function(){return Promise.resolve()};
q.update=function(){};q.onExpirationUpdated=function(a,b){var c=this,d,e,f,g,h,k,l;return L(function(m){switch(m.g){case 1:return d=c.g,e=new As,E(m,2,3),z(m,e.init(),5);case 5:return z(m,Es(e,d.Ya(),d.oa()),6);case 6:return f=m.h,z(m,f.getManifests([d.key()]),7);case 7:g=m.h;h=g[0];k=h.sessionIds.includes(a);l=void 0==h.expiration||h.expiration>b;if(!k||!l){m.D(3);break}return z(m,f.updateManifestExpiration(d.key(),b),3);case 3:return xa(m),z(m,e.destroy(),10);case 10:ya(m,0);break;case 2:H(m),m.D(3)}})};
pg["application/x-offline-manifest"]=function(){return new at};function bt(){}function ct(a){var b=Us(a);b&&"manifest"==b.g?(a={uri:a,vf:a,data:new ArrayBuffer(0),headers:{"content-type":"application/x-offline-manifest"}},a=We(a)):a=b&&"segment"==b.g?dt(b.key(),b):Ue(new P(2,1,9004,a));return a}
function dt(a,b){var c=new As;return We(void 0).va(function(){return c.init()}).va(function(){return Es(c,b.Ya(),b.oa())}).va(function(d){return d.getSegments([b.key()])}).va(function(d){return{uri:b,data:d[0].data,headers:{}}})["finally"](function(){return c.destroy()})}N("shaka.offline.OfflineScheme",bt);bt.plugin=ct;ef("offline",ct);function et(a,b,c){var d,e,f,g,h,k;return L(function(l){switch(l.g){case 1:d=[];for(var m=[],n=r(c),p=n.next();!p.done;p=n.next()){p=p.value;for(var t=!1,v=r(m),w=v.next();!w.done;w=v.next())if(w=w.value,ft(w.info,p)){w.sessionIds.push(p.sessionId);t=!0;break}t||m.push({info:p,sessionIds:[p.sessionId]})}e=r(m);f=e.next();case 2:if(f.done){l.D(4);break}g=f.value;h=gt(a,b,g);return z(l,h,5);case 5:k=l.h;d=d.concat(k);f=e.next();l.D(2);break;case 4:return l["return"](d)}})}
function gt(a,b,c){var d,e;return L(function(f){switch(f.g){case 1:return d=new Cf({Wb:b,onError:function(){},wd:function(){},onExpirationUpdated:function(){},onEvent:function(){}}),E(f,2),d.configure(a),z(f,Kf(d,c.info.keySystem,c.info.licenseUri,c.info.serverCertificate,c.info.audioCapabilities,c.info.videoCapabilities),4);case 4:wa(f,3);break;case 2:return H(f),z(f,d.destroy(),5);case 5:return f["return"]([]);case 3:return E(f,6),z(f,Tf(d),8);case 8:wa(f,7);break;case 6:return H(f),z(f,d.destroy(),
9);case 9:return f["return"]([]);case 7:return e=[],z(f,Promise.all(c.sessionIds.map(function(g){return L(function(h){if(1==h.g)return E(h,2),z(h,Uf(d,g),4);if(2!=h.g)return e.push(g),wa(h,0);H(h);A(h)})})),10);case 10:return z(f,d.destroy(),11);case 11:return f["return"](e)}})}
function ft(a,b){function c(d,e){return d.robustness==e.robustness&&d.contentType==e.contentType}return a.keySystem==b.keySystem&&a.licenseUri==b.licenseUri&&pc(a.audioCapabilities,b.audioCapabilities,c)&&pc(a.videoCapabilities,b.videoCapabilities,c)};function ht(a,b,c){var d=b.presentationTimeline.getDuration();b=it(b);return{offlineUri:null,originalManifestUri:a,duration:d,size:0,expiration:Infinity,tracks:b,appMetadata:c,isIncomplete:!1}}function jt(a,b){var c=Ws(new Vs(a.Ya(),a.oa()),b),d=b.appMetadata||{};c=it(c);return{offlineUri:a.toString(),originalManifestUri:b.originalManifestUri,duration:b.duration,size:b.size,expiration:b.expiration,tracks:c,appMetadata:d,isIncomplete:b.isIncomplete||!1}}
function it(a){var b=[],c=ve(a.variants);c=r(c);for(var d=c.next();!d.done;d=c.next())b.push(me(d.value));a=r(a.textStreams);for(c=a.next();!c.done;c=a.next())b.push(ne(c.value));return b};function kt(){this.g={}}function lt(a,b){var c=b.audio,d=b.video;c&&!d&&(a.g[c.id]=c.bandwidth||b.bandwidth);!c&&d&&(a.g[d.id]=d.bandwidth||b.bandwidth);if(c&&d){var e=c.bandwidth||393216,f=d.bandwidth||b.bandwidth-e;0>=f&&(f=b.bandwidth);a.g[c.id]=e;a.g[d.id]=f}}function mt(a,b){a.g[b.id]=b.bandwidth||2048}function nt(a,b){var c=a.g[b];null==c&&(c=0);return c};function ot(){this.h=[];this.g=this.i=0}function pt(){var a=qt,b;return L(function(c){return 1==c.g?(b=++a.i,a.g?z(c,new Promise(function(d){a.h.push(function(){a.g=b;d()})}),2):(a.g=b,c.D(2))):c["return"](b)})}ot.prototype.release=function(a){a==this.g&&(this.g=0,0<this.h.length&&this.h.shift()())};function rt(a){var b=this;if(a&&a.constructor!=T)throw new P(2,9,9008);this.V=this.m=null;a?(this.m=a.m,this.V=a.Mc()):(this.m=Kk(),this.V=new df);this.Uc=[];this.re=[];var c=!a;this.N=new pf(function(){var d,e,f,g,h;return L(function(k){switch(k.g){case 1:return z(k,Promise.all(b.re.map(function(l){return js(l)})),2);case 2:d=function(){};e=[];f=r(b.Uc);for(g=f.next();!g.done;g=f.next())h=g.value,e.push(h.then(d,d));return z(k,Promise.all(e),3);case 3:if(!c){k.D(4);break}return z(k,b.V.destroy(),
4);case 4:b.m=null,b.V=null,A(k)}})})}function st(){if(Ed())a:{var a=r(Bs.values());for(var b=a.next();!b.done;b=a.next())if(b=b.value,b=b()){b.destroy();a=!0;break a}a=!1}else a=!1;return a}q=rt.prototype;q.destroy=function(){return this.N.destroy()};
q.configure=function(a,b){2==arguments.length&&"string"==typeof a&&(a=Ik(a,b));a.manifest&&a.manifest.dash&&"defaultPresentationDelay"in a.manifest.dash&&(Fb("manifest.dash.defaultPresentationDelay configuration","Please Use manifest.defaultPresentationDelay instead."),a.manifest.defaultPresentationDelay=a.manifest.dash.defaultPresentationDelay,delete a.manifest.dash.defaultPresentationDelay);return Mk(this.m,a)};q.getConfiguration=function(){var a=Kk();Mk(a,this.m,Kk());return a};q.Mc=function(){return this.V};
q.store=function(a,b,c){var d=this,e=this.getConfiguration(),f=new is(this.V);this.re.push(f);b=tt(this,a,b||{},function(){var h;return L(function(k){if(1==k.g)return z(k,og(a,d.V,e.manifest.retryParameters,c||null),2);h=k.h;return k["return"](Mb(h))})},e,f);var g=new Te(b,function(){return js(f)});g["finally"](function(){oc(d.re,f)});g.then=function(h){Fb("shaka.offline.Storage.store.then","Storage operations now return a shaka.util.AbortableOperation, rather than a promise.  Please update to conform to this new API; you can use the |chain| method instead.");
return g.promise.then(h)};return ut(this,g)};q.Cg=function(){Fb("shaka.offline.Storage.getStoreInProgress","Multiple concurrent downloads are now supported.");return!1};
function tt(a,b,c,d,e,f){var g,h,k,l,m,n,p,t,v,w,y,x,D,C;return L(function(B){switch(B.g){case 1:return vt(),h=g=null,k=new As,n=m=l=null,E(B,2,3),z(B,d(),5);case 5:return g=B.h,z(B,wt(a,b,g,e),6);case 6:p=B.h;xt(a);t=!p.presentationTimeline.W()&&!p.presentationTimeline.Tb();if(!t)throw new P(2,9,9005,b);return z(B,yt(a,p,function(F){n=n||F},e),7);case 7:h=B.h;xt(a);if(n)throw n;return z(B,zt(p,e),8);case 8:return z(B,k.init(),9);case 9:return xt(a),z(B,Cs(k),10);case 10:return l=B.h,xt(a),v=At(h,
p,b,c,e,f),w=v.Pg,y=v.Me,z(B,l.oa.addManifests([w]),11);case 11:x=B.h;xt(a);m=x[0];xt(a);if(n)throw n;return z(B,Bt(a,y,m,w,f,e,l.oa,p,h),12);case 12:return xt(a),D=new Ts("manifest",l.path.Ya,l.path.oa,m),B["return"](jt(D,w));case 3:return xa(B),z(B,k.destroy(),13);case 13:if(!g){B.D(14);break}return z(B,g.stop(),14);case 14:if(!h){B.D(16);break}return z(B,h.destroy(),16);case 16:ya(B,0);break;case 2:C=H(B);if(null==m){B.D(18);break}return z(B,Ct(m),18);case 18:throw n||C;}})}
function Bt(a,b,c,d,e,f,g,h,k){var l,m;return L(function(n){switch(n.g){case 1:l=function(p,t){var v,w,y,x,D,C,B,F;return L(function(G){if(1==G.g){v=function(){xt(a)};w={};y=r(p);for(x=y.next();!x.done;w={bd:w.bd,Ab:w.Ab},x=y.next())w.Ab=x.value,w.bd=void 0,D=fs(w.Ab,f),C=w.Ab.i,B=w.Ab.h,F=function(I){return function(K){I.bd=K;return Promise.resolve()}}(w),ls(e,w.Ab.groupId,D,C,B,F),ns(e,w.Ab.groupId,function(I){return function(){var K;return L(function(J){if(1==J.g)return K=I.Ab.g,z(J,Dt(c,K,{data:I.bd},
v),2);d=J.h||d;A(J)})}}(w));return z(G,os(e),2)}if(!t)return G.D(0);xt(a);Et(h,d,k,f);return z(G,g.updateManifest(c,d),0)})};m=!1;if(!Ft(h)||!m||Gt(h)){n.D(2);break}return z(n,l(b.filter(function(p){return p.h}),!0),3);case 3:xt(a),b=b.filter(function(p){return!p.h});case 2:if(m){n.D(0);break}return z(n,l(b,!1),5);case 5:xt(a),A(n)}})}
function Ct(a){var b,c,d,e;return L(function(f){switch(f.g){case 1:return b=new As,z(f,b.init(),2);case 2:return z(f,Cs(b),3);case 3:return c=f.h,d=new Ts("manifest",c.path.Ya,c.path.oa,a),z(f,b.destroy(),4);case 4:return e=new rt,z(f,e.remove(d.toString()),0)}})}
function Dt(a,b,c,d){var e,f,g,h,k,l,m,n,p,t,v,w,y,x,D,C,B;return L(function(F){switch(F.g){case 1:return e=new As,f=es(b),g=!1,m=0,E(F,2,3),z(F,e.init(),5);case 5:return z(F,Cs(e),6);case 6:return k=F.h,z(F,k.oa.addSegments([c]),7);case 7:return n=F.h,h=n[0],d(),z(F,pt(),8);case 8:return m=F.h,d(),z(F,k.oa.getManifests([a]),9);case 9:p=F.h;d();l=p[0];t=!0;v=r(l.streams);for(w=v.next();!w.done;w=v.next())for(y=w.value,x=r(y.segments),D=x.next();!D.done;D=x.next())C=D.value,C.pendingSegmentRefId==
f&&(C.dataKey=h,C.pendingSegmentRefId=void 0),C.pendingInitSegmentRefId==f&&(C.initSegmentKey=h,C.pendingInitSegmentRefId=void 0),C.pendingSegmentRefId&&(t=!1),C.pendingInitSegmentRefId&&(t=!1);l.size+=c.data.byteLength;t&&(l.isIncomplete=!1);return z(F,k.oa.updateManifest(a,l),10);case 10:g=!0,d();case 3:return xa(F),z(F,e.destroy(),11);case 11:qt.release(m);ya(F,4);break;case 2:return B=H(F),z(F,Ct(a),12);case 12:if(!k||g||!h){F.D(13);break}return z(F,k.oa.removeSegments([h],function(){}),13);case 13:throw B;
case 4:return F["return"](l)}})}
function zt(a,b){var c,d,e,f,g,h,k,l,m,n,p,t,v,w,y,x,D,C,B,F,G,I,K,J,M,U,Y,ka,ea;return L(function(ia){switch(ia.g){case 1:return c={width:Infinity,height:Infinity},$d(a,b.restrictions,c),z(ia,ce(a,b.offline.usePersistentLicense),2);case 2:d=[];e=b.preferredAudioChannelCount;f=b.preferredDecodingAttributes;g=b.preferredVideoCodecs;h=b.preferredAudioCodecs;Od(a,g,h,e,f);k=r(a.variants);for(l=k.next();!l.done;l=k.next())m=l.value,d.push(me(m));n=r(a.textStreams);for(p=n.next();!p.done;p=n.next())t=
p.value,d.push(ne(t));v=r(a.imageStreams);for(w=v.next();!w.done;w=v.next())y=w.value,d.push(oe(y));return z(ia,b.offline.trackSelectionCallback(d),3);case 3:x=ia.h;D=a.presentationTimeline.getDuration();C=0;B=r(x);for(F=B.next();!F.done;F=B.next())G=F.value,I=G.bandwidth*D/8,C+=I;E(ia,4);return z(ia,b.offline.downloadSizeCallback(C),6);case 6:K=ia.h;if(!K)throw new P(2,9,9014);wa(ia,5);break;case 4:J=H(ia);if(J instanceof P)throw J;throw new P(2,9,9015);case 5:M=new Set;U=new Set;Y=new Set;ka=r(x);
for(F=ka.next();!F.done;F=ka.next())ea=F.value,"variant"==ea.type&&M.add(ea.id),"text"==ea.type&&U.add(ea.id),"image"==ea.type&&Y.add(ea.id);a.variants=a.variants.filter(function(Ea){return M.has(Ea.id)});a.textStreams=a.textStreams.filter(function(Ea){return U.has(Ea.id)});a.imageStreams=a.imageStreams.filter(function(Ea){return Y.has(Ea.id)});Ht(a);A(ia)}})}
function At(a,b,c,d,e,f){var g=ht(c,b,d),h=e.offline.progressCallback;ks(f,function(t,v){g.size=v;h(g,t)},function(t,v){k&&e.offline.usePersistentLicense&&l==v&&Sf(a,"cenc",t)});var k=Ft(b)&&!Gt(b),l=null;k&&(l=It.get(a.i.keySystem));for(var m=new kt,n=r(b.textStreams),p=n.next();!p.done;p=n.next())m.g[p.value.id]=52;n=r(b.imageStreams);for(p=n.next();!p.done;p=n.next())mt(m,p.value);p=r(b.variants);for(n=p.next();!n.done;n=p.next())lt(m,n.value);m=Jt(f,m,b);f=m.streams;m=m.Me;p=a.i;n=e.offline.usePersistentLicense;
p&&n&&(p.initData=[]);return{Pg:{creationTime:Date.now(),originalManifestUri:c,duration:b.presentationTimeline.getDuration(),size:0,expiration:a.Lc(),streams:f,sessionIds:n?Yf(a):[],drmInfo:p,appMetadata:d,isIncomplete:!0},Me:m}}function Ft(a){return a.variants.some(function(b){var c=b.audio&&b.audio.encrypted;return b.video&&b.video.encrypted||c})}
function Gt(a){return a.variants.some(function(b){return(b.video?b.video.drmInfos:[]).concat(b.audio?b.audio.drmInfos:[]).some(function(c){return c.initData&&c.initData.length})})}function Et(a,b,c,d){b.expiration=c.Lc();c=Yf(c);b.sessionIds=d.offline.usePersistentLicense?c:[];if(Ft(a)&&d.offline.usePersistentLicense&&!c.length)throw new P(2,9,9007);}q.remove=function(a){return Kt(this,Lt(this,a))};
function Lt(a,b){var c,d,e,f,g,h;return L(function(k){switch(k.g){case 1:vt();c=Us(b);if(null==c||"manifest"!=c.g)throw new P(2,9,9004,b);d=c;e=new As;va(k);return z(k,e.init(),4);case 4:return z(k,Es(e,d.Ya(),d.oa()),5);case 5:return f=k.h,z(k,f.getManifests([d.key()]),6);case 6:return g=k.h,h=g[0],z(k,Promise.all([Mt(a,h,e),Nt(f,d,h)]),2);case 2:return xa(k),z(k,e.destroy(),8);case 8:ya(k,0)}})}
function Ot(a,b){for(var c=[],d=r(a.streams),e=d.next();!e.done;e=d.next())e=e.value,b&&"video"==e.type?c.push({contentType:qd(e.mimeType,e.codecs),robustness:a.drmInfo.videoRobustness}):b||"audio"!=e.type||c.push({contentType:qd(e.mimeType,e.codecs),robustness:a.drmInfo.audioRobustness});return c}function Mt(a,b,c){return L(function(d){return z(d,Pt(a.V,a.m.drm,c,b),0)})}
function Nt(a,b,c){function d(){}var e=Qt(c);jt(b,c);return Promise.all([a.removeSegments(e,d),a.removeManifests([b.key()],d)])}q.eh=function(){return Kt(this,Rt(this))};
function Rt(a){var b,c,d,e,f,g,h,k,l,m;return L(function(n){switch(n.g){case 1:return vt(),b=a.V,c=a.m.drm,d=new As,e=!1,va(n),z(n,d.init(),4);case 4:f=[],Fs(d,function(p){return f.push(p)}),g=r(f),h=g.next();case 5:if(h.done){n.D(2);break}k=h.value;return z(n,k.getAll(),8);case 8:return l=n.h,z(n,et(c,b,l),9);case 9:return m=n.h,z(n,k.remove(m),10);case 10:m.length!=l.length&&(e=!0);h=g.next();n.D(5);break;case 2:return xa(n),z(n,d.destroy(),11);case 11:ya(n,3);break;case 3:return n["return"](!e)}})}
q.list=function(){return Kt(this,St())};function St(){var a,b,c;return L(function(d){switch(d.g){case 1:return vt(),a=[],b=new As,va(d),z(d,b.init(),4);case 4:return c=Promise.resolve(),Ds(b,function(e,f){c=c.then(function(){var g;return L(function(h){if(1==h.g)return z(h,f.getAllManifests(),2);g=h.h;g.forEach(function(k,l){var m=jt(new Ts("manifest",e.Ya,e.oa,l),k);a.push(m)});A(h)})})}),z(d,c,2);case 2:return xa(d),z(d,b.destroy(),6);case 6:ya(d,3);break;case 3:return d["return"](a)}})}
function wt(a,b,c,d){var e,f,g,h,k;return L(function(l){if(1==l.g)return e=null,f=a.V,g={networkingEngine:f,modifyManifestRequest:function(){},modifySegmentRequest:function(){},filter:function(){return Promise.resolve()},makeTextStreamsForClosedCaptions:function(){},onTimelineRegionAdded:function(){},onEvent:function(){},onError:function(m){e=m},isLowLatencyMode:function(){return!1},isAutoLowLatencyMode:function(){return!1},enableLowLatencyMode:function(){}},c.configure(d.manifest),xt(a),z(l,c.start(b,
g),2);if(3!=l.g)return h=l.h,xt(a),k=Tt(h),z(l,Promise.all(fb(k,function(m){return m.createSegmentIndex()})),3);xt(a);if(e)throw e;return l["return"](h)})}function yt(a,b,c,d){var e;return L(function(f){switch(f.g){case 1:return e=new Cf({Wb:a.V,onError:c,wd:function(){},onExpirationUpdated:function(){},onEvent:function(){}}),e.configure(d.drm),z(f,Hf(e,b.variants,d.offline.usePersistentLicense),2);case 2:return z(f,Tf(e),3);case 3:return z(f,Rf(e),4);case 4:return f["return"](e)}})}
function Jt(a,b,c){var d=new Map,e=Tt(c),f=new Map;e=r(e);for(var g=e.next();!g.done;g=e.next()){g=g.value;var h=Ut(a,b,c,g,d);f.set(g.id,h)}a=r(c.variants);for(b=a.next();!b.done;b=a.next())b=b.value,b.audio&&f.get(b.audio.id).variantIds.push(b.id),b.video&&f.get(b.video.id).variantIds.push(b.id);return{streams:Array.from(f.values()),Me:Array.from(d.values())}}
function Ut(a,b,c,d,e){var f={id:d.id,originalId:d.originalId,primary:d.primary,type:d.type,mimeType:d.mimeType,codecs:d.codecs,frameRate:d.frameRate,pixelAspectRatio:d.pixelAspectRatio,hdr:d.hdr,kind:d.kind,language:d.language,label:d.label,width:d.width||null,height:d.height||null,encrypted:d.encrypted,keyIds:d.keyIds,segments:[],variantIds:[],roles:d.roles,forced:d.forced,channelsCount:d.channelsCount,audioSamplingRate:d.audioSamplingRate,spatialAudio:d.spatialAudio,closedCaptions:d.closedCaptions,
tilesLayout:d.tilesLayout};Vt(d,c.presentationTimeline.ub(),function(g){var h=es(g),k=void 0;if(!e.has(h)){var l=g.endTime-g.startTime;l=nt(b,d.id)*l;l=hs(a.fc,l);e.set(h,new ds(g,l,d.id,!1))}g.g&&(k=es(g.g),e.has(k)||(l=.5*nt(b,d.id),l=hs(a.fc,l),e.set(k,new ds(g.g,l,d.id,!0))));f.segments.push({pendingInitSegmentRefId:k,initSegmentKey:k?0:null,startTime:g.startTime,endTime:g.endTime,appendWindowStart:g.appendWindowStart,appendWindowEnd:g.appendWindowEnd,timestampOffset:g.timestampOffset,tilesLayout:g.tilesLayout,
pendingSegmentRefId:h,dataKey:0})});return f}function Vt(a,b,c){b=a.segmentIndex.find(b);if(null!=b)for(var d=a.segmentIndex.get(b);d;)c(d),d=a.segmentIndex.get(++b)}function xt(a){if(a.N.g)throw new P(2,9,7001);}function vt(){if(!st())throw new P(2,9,9E3);}function Kt(a,b){return L(function(c){if(1==c.g)return a.Uc.push(b),va(c),z(c,b,4);if(2!=c.g)return c["return"](c.h);xa(c);oc(a.Uc,b);return ya(c,0)})}function ut(a,b){var c=b.promise;a.Uc.push(c);return b["finally"](function(){oc(a.Uc,c)})}
function Qt(a){var b=new Set;a=r(a.streams);for(var c=a.next();!c.done;c=a.next()){c=r(c.value.segments);for(var d=c.next();!d.done;d=c.next())d=d.value,null!=d.initSegmentKey&&b.add(d.initSegmentKey),b.add(d.dataKey)}return Array.from(b)}
function Pt(a,b,c,d){var e,f,g;return L(function(h){if(1==h.g){if(!d.drmInfo)return h["return"]();e=Gs(c);f=d.sessionIds.map(function(k){return{sessionId:k,keySystem:d.drmInfo.keySystem,licenseUri:d.drmInfo.licenseServerUri,serverCertificate:d.drmInfo.serverCertificate,audioCapabilities:Ot(d,!1),videoCapabilities:Ot(d,!0)}});return z(h,et(b,a,f),2)}return 3!=h.g?(g=h.h,z(h,e.remove(g),3)):z(h,e.add(f.filter(function(k){return!g.includes(k.sessionId)})),0)})}
function Tt(a){for(var b=new Set,c=r(a.textStreams),d=c.next();!d.done;d=c.next())b.add(d.value);c=r(a.imageStreams);for(d=c.next();!d.done;d=c.next())b.add(d.value);a=r(a.variants);for(c=a.next();!c.done;c=a.next())c=c.value,c.audio&&b.add(c.audio),c.video&&b.add(c.video);return b}
function Ht(a){a.variants.map(function(f){return f.video});var b=new Set(a.variants.map(function(f){return f.audio}));a=a.textStreams;for(var c=r(b),d=c.next();!d.done;d=c.next()){d=r(b);for(var e=d.next();!e.done;e=d.next());}b=r(a);for(c=b.next();!c.done;c=b.next())for(c=r(a),d=c.next();!d.done;d=c.next());}N("shaka.offline.Storage",rt);rt.deleteAll=function(){var a;return L(function(b){return 1==b.g?(a=new As,va(b),z(b,Hs(a),2)):5!=b.g?(xa(b),z(b,a.destroy(),5)):ya(b,0)})};rt.prototype.list=rt.prototype.list;
rt.prototype.removeEmeSessions=rt.prototype.eh;rt.prototype.remove=rt.prototype.remove;rt.prototype.getStoreInProgress=rt.prototype.Cg;rt.prototype.store=rt.prototype.store;rt.prototype.getNetworkingEngine=rt.prototype.Mc;rt.prototype.getConfiguration=rt.prototype.getConfiguration;rt.prototype.configure=rt.prototype.configure;rt.prototype.destroy=rt.prototype.destroy;rt.support=st;
var qt=new ot,It=(new Map).set("org.w3.clearkey","1077efecc0b24d02ace33c1e52e2fb4b").set("com.widevine.alpha","edef8ba979d64acea3c827dcd51d21ed").set("com.microsoft.playready","9a04f07998404286ab92e65be0885f95").set("com.microsoft.playready.recommendation","9a04f07998404286ab92e65be0885f95").set("com.microsoft.playready.software","9a04f07998404286ab92e65be0885f95").set("com.microsoft.playready.hardware","9a04f07998404286ab92e65be0885f95").set("com.adobe.primetime","f239e769efa348509c16a903c6932efb");
Qm.offline=st;function Wt(){}function Xt(){for(var a=r(Yt),b=a.next();!b.done;b=a.next()){b=b.value;try{b.Tf()}catch(c){Ta("Error installing polyfill!",c)}}}function Zt(a,b){for(var c={priority:b||0,Tf:a},d=r(nb(Yt)),e=d.next();!e.done;e=d.next()){e=e.value;var f=e.wa;if(e.item.priority<c.priority){Yt.splice(f,0,c);return}}Yt.push(c)}N("shaka.polyfill",Wt);Wt.register=Zt;Wt.installAll=Xt;var Yt=[];function $t(){}function au(){if(!Object.getOwnPropertyDescriptor(Element.prototype,"ariaHidden"))for(var a=r(["ariaHidden","ariaLabel","ariaPressed","ariaSelected"]),b=a.next();!b.done;b=a.next())bu(b.value)}function bu(a){var b="aria-"+a.toLowerCase().replace(/^aria/,"");Object.defineProperty(Element.prototype,a,{get:function(){return this.getAttribute(b)},set:function(c){null==c||void 0==c?this.removeAttribute(b):this.setAttribute(b,c)}})}Wt.Aria=$t;$t.install=au;Zt(au);function cu(){}function du(){eu()}Wt.EncryptionScheme=cu;cu.install=du;Zt(du,-2);function fu(){}
function gu(){if(window.Document){var a=Element.prototype;a.requestFullscreen=a.requestFullscreen||a.mozRequestFullScreen||a.msRequestFullscreen||a.webkitRequestFullscreen;a=Document.prototype;a.exitFullscreen=a.exitFullscreen||a.mozCancelFullScreen||a.msExitFullscreen||a.webkitCancelFullScreen;"fullscreenElement"in document||(Object.defineProperty(document,"fullscreenElement",{get:function(){return document.mozFullScreenElement||document.msFullscreenElement||document.webkitCurrentFullScreenElement||document.webkitFullscreenElement}}),
Object.defineProperty(document,"fullscreenEnabled",{get:function(){return document.mozFullScreenEnabled||document.msFullscreenEnabled||document.webkitFullscreenEnabled}}));document.addEventListener("webkitfullscreenchange",hu);document.addEventListener("webkitfullscreenerror",hu);document.addEventListener("mozfullscreenchange",hu);document.addEventListener("mozfullscreenerror",hu);document.addEventListener("MSFullscreenChange",hu);document.addEventListener("MSFullscreenError",hu)}}
function hu(a){var b=a.type.replace(/^(webkit|moz|MS)/,"").toLowerCase(),c=document.createEvent("Event");c.initEvent(b,a.bubbles,a.cancelable);a.target.dispatchEvent(c)}Wt.Fullscreen=fu;fu.install=gu;Zt(gu);function iu(){}function ju(){}Wt.MathRound=iu;iu.install=ju;Zt(ju);function ku(){}function lu(){if(Jd()||Kd()||Id("PlayStation 5")||!navigator.mediaCapabilities)navigator.mediaCapabilities||(navigator.mediaCapabilities={}),mu=navigator.mediaCapabilities,navigator.mediaCapabilities.decodingInfo=nu}
function nu(a){var b,c,d,e,f,g,h,k,l,m,n,p,t,v,w,y;return L(function(x){switch(x.g){case 1:b={supported:!1,powerEfficient:!0,smooth:!0,keySystemAccess:null,configuration:a};if(!a)return x["return"](b);if("media-source"==a.type){if(!Ed()||a.video&&(c=a.video.contentType,d=MediaSource.isTypeSupported(c),!d)||a.audio&&(e=a.audio.contentType,f=MediaSource.isTypeSupported(e),!f))return x["return"](b)}else if("file"==a.type){if(a.video&&(g=a.video.contentType,h=Fd(g),!h)||a.audio&&(k=a.audio.contentType,
l=Fd(k),!l))return x["return"](b)}else return x["return"](b);if(!a.keySystemConfiguration)return b.supported=!0,x["return"](Promise.resolve(b));m=a.keySystemConfiguration;n=[];p=[];m.audio&&(t={robustness:m.audio.robustness||"",contentType:a.audio.contentType},n.push(t));m.video&&(v={robustness:m.video.robustness||"",contentType:a.video.contentType},p.push(v));w={initDataTypes:[m.initDataType],distinctiveIdentifier:m.distinctiveIdentifier,persistentState:m.persistentState,sessionTypes:m.sessionTypes};
n.length&&(w.audioCapabilities=n);p.length&&(w.videoCapabilities=p);E(x,3);return z(x,navigator.requestMediaKeySystemAccess(m.keySystem,[w]),5);case 5:y=x.h;wa(x,4);break;case 3:H(x);case 4:y&&(b.supported=!0,b.keySystemAccess=y);case 2:return x["return"](b)}})}Wt.MediaCapabilities=ku;ku.install=lu;var mu=null;ku.originalMcap=mu;Zt(lu,-1);function ou(){}function pu(){var a=Ld();window.MediaSource&&(window.cast&&cast.__platform__&&cast.__platform__.canDisplayType?qu():a?(ru(),12>=a?(su(),tu()):su()):(Id("Tizen 2")||Id("Tizen 3")||Id("Tizen 4"))&&uu());window.MediaSource&&MediaSource.isTypeSupported('video/webm; codecs="vp9"')&&!MediaSource.isTypeSupported('video/webm; codecs="vp09.00.10.08"')&&vu()}
function su(){var a=MediaSource.prototype.addSourceBuffer;MediaSource.prototype.addSourceBuffer=function(b){for(var c=[],d=0;d<arguments.length;++d)c[d]=arguments[d];c=a.apply(this,c);c.abort=function(){};return c}}function tu(){var a=SourceBuffer.prototype.remove;SourceBuffer.prototype.remove=function(b,c){return a.call(this,b,c-.001)}}function ru(){var a=MediaSource.isTypeSupported;MediaSource.isTypeSupported=function(b){return"mp2t"==b.split(/ *; */)[0].split("/")[1].toLowerCase()?!1:a(b)}}
function uu(){var a=MediaSource.isTypeSupported;MediaSource.isTypeSupported=function(b){return"opus"!=sd(b)&&a(b)}}function qu(){var a=MediaSource.isTypeSupported;MediaSource.isTypeSupported=function(b){var c=b.split(/ *; */);c.shift();return c.some(function(d){return d.startsWith("codecs=")})?cast.__platform__.canDisplayType(b):a(b)}}
function vu(){var a=MediaSource.isTypeSupported;Id("Web0S")||(MediaSource.isTypeSupported=function(b){var c=b.split(/ *; */),d=c.findIndex(function(g){return g.startsWith("codecs=")});if(0>d)return a(b);var e=c[d].replace("codecs=","").replace(/"/g,"").split(/\s*,\s*/),f=e.findIndex(function(g){return g.startsWith("vp09")});0<=f&&(e[f]="vp9",c[d]='codecs="'+e.join(",")+'"',b=c.join("; "));return a(b)})}Wt.MediaSource=ou;ou.install=pu;Zt(pu);function wu(){}function xu(){screen.orientation||void 0!=window.orientation&&yu()}function yu(){function a(){switch(window.orientation){case -90:b.type="landscape-secondary";b.angle=270;break;case 0:b.type="portrait-primary";b.angle=0;break;case 90:b.type="landscape-primary";b.angle=90;break;case 180:b.type="portrait-secondary",b.angle=180}}var b=new zu;screen.orientation=b;a();window.addEventListener("orientationchange",function(){a();var c=new O("change");b.dispatchEvent(c)})}Wt.Orientation=wu;
wu.install=xu;function zu(){db.call(this);this.type="";this.angle=0}u(zu,db);
zu.prototype.lock=function(a){function b(d){return screen.lockOrientation?screen.lockOrientation(d):screen.mozLockOrientation?screen.mozLockOrientation(d):screen.msLockOrientation?screen.msLockOrientation(d):!1}var c=!1;switch(a){case "natural":c=b("default");break;case "any":c=!0;this.unlock();break;default:c=b(a)}if(c)return Promise.resolve();a=Error("screen.orientation.lock() is not available on this device");a.name="NotSupportedError";a.code=DOMException.NOT_SUPPORTED_ERR;return Promise.reject(a)};
zu.prototype.unlock=function(){screen.unlockOrientation?screen.unlockOrientation():screen.mozUnlockOrientation?screen.mozUnlockOrientation():screen.msUnlockOrientation&&screen.msUnlockOrientation()};Zt(xu);function Au(){}function Bu(){window.HTMLVideoElement&&window.WebKitMediaKeys&&(delete HTMLMediaElement.prototype.mediaKeys,HTMLMediaElement.prototype.mediaKeys=null,HTMLMediaElement.prototype.setMediaKeys=Cu,window.MediaKeys=Du,window.MediaKeySystemAccess=Eu,navigator.requestMediaKeySystemAccess=Fu)}function Fu(a,b){try{var c=new Eu(a,b);return Promise.resolve(c)}catch(d){return Promise.reject(d)}}
function Cu(a){var b=this.mediaKeys;b&&b!=a&&Gu(b,null);delete this.mediaKeys;return(this.mediaKeys=a)?Gu(a,this):Promise.resolve()}function Hu(a){a=Oc(a.initData);if(Rc(a).getUint32(0,!0)+4!=a.byteLength)throw new RangeError("Malformed FairPlay init data");a=$c(a.subarray(4),!0);a=cd(a);var b=new Event("encrypted");b.initDataType="skd";b.initData=Pc(a);this.dispatchEvent(b)}Wt.PatchedMediaKeysApple=Au;Au.install=Bu;
function Eu(a,b){this.keySystem=a;if(a.startsWith("com.apple.fps"))for(var c=r(b),d=c.next();!d.done;d=c.next()){var e=d.value;if("required"==e.persistentState)d=null;else{d={audioCapabilities:[],videoCapabilities:[],persistentState:"optional",distinctiveIdentifier:"optional",initDataTypes:e.initDataTypes,sessionTypes:["temporary"],label:e.label};var f=!1,g=!1;if(e.audioCapabilities)for(var h=r(e.audioCapabilities),k=h.next();!k.done;k=h.next())k=k.value,k.contentType&&(f=!0,WebKitMediaKeys.isTypeSupported(this.keySystem,
k.contentType.split(";")[0])&&(d.audioCapabilities.push(k),g=!0));if(e.videoCapabilities)for(e=r(e.videoCapabilities),k=e.next();!k.done;k=e.next())h=k.value,h.contentType&&(f=!0,WebKitMediaKeys.isTypeSupported(this.keySystem,h.contentType.split(";")[0])&&(d.videoCapabilities.push(h),g=!0));f||(g=WebKitMediaKeys.isTypeSupported(this.keySystem,"video/mp4"));d=g?d:null}if(d){this.g=d;return}}c=Error("Unsupported keySystem");c.name="NotSupportedError";c.code=DOMException.NOT_SUPPORTED_ERR;throw c;}
Eu.prototype.createMediaKeys=function(){var a=new Du(this.keySystem);return Promise.resolve(a)};Eu.prototype.getConfiguration=function(){return this.g};function Du(a){this.g=new WebKitMediaKeys(a);this.h=new rf}Du.prototype.createSession=function(a){a=a||"temporary";if("temporary"!=a)throw new TypeError("Session type "+a+" is unsupported on this platform.");return new Iu(this.g,a)};Du.prototype.setServerCertificate=function(){return Promise.resolve(!1)};
function Gu(a,b){a.h.Yb();if(!b)return Promise.resolve();a.h.o(b,"webkitneedkey",Hu);try{return Ei(b,HTMLMediaElement.HAVE_METADATA,a.h,function(){b.webkitSetMediaKeys(a.g)}),Promise.resolve()}catch(c){return Promise.reject(c)}}function Iu(a){db.call(this);this.j=null;this.l=a;this.i=this.g=null;this.h=new rf;this.sessionId="";this.expiration=NaN;this.closed=new Wc;this.keyStatuses=new Ju}u(Iu,db);q=Iu.prototype;
q.generateRequest=function(a,b){var c=this;this.g=new Wc;try{var d=this.l.createSession("video/mp4",Oc(b));this.j=d;this.sessionId=d.sessionId||"";this.h.o(this.j,"webkitkeymessage",function(e){c.g&&(c.g.resolve(),c.g=null);e=(new Map).set("messageType",void 0==c.keyStatuses.g?"license-request":"license-renewal").set("message",Pc(e.message));e=new O("message",e);c.dispatchEvent(e)});this.h.o(d,"webkitkeyadded",function(){c.i&&(Ku(c,"usable"),c.i.resolve(),c.i=null)});this.h.o(d,"webkitkeyerror",function(){var e=
Error("EME PatchedMediaKeysApple key error");e.errorCode=c.j.error;if(null!=c.g)c.g.reject(e),c.g=null;else if(null!=c.i)c.i.reject(e),c.i=null;else switch(c.j.error.code){case WebKitMediaKeyError.MEDIA_KEYERR_OUTPUT:case WebKitMediaKeyError.MEDIA_KEYERR_HARDWARECHANGE:Ku(c,"output-not-allowed");break;default:Ku(c,"internal-error")}});Ku(this,"status-pending")}catch(e){this.g.reject(e)}return this.g};q.load=function(){return Promise.reject(Error("MediaKeySession.load not yet supported"))};
q.update=function(a){this.i=new Wc;try{this.j.update(Oc(a))}catch(b){this.i.reject(b)}return this.i};q.close=function(){try{this.j.close(),this.closed.resolve(),this.h.Yb()}catch(a){this.closed.reject(a)}return this.closed};q.remove=function(){return Promise.reject(Error("MediaKeySession.remove is only applicable for persistent licenses, which are not supported on this platform"))};function Ku(a,b){var c=a.keyStatuses;c.size=void 0==b?0:1;c.g=b;c=new O("keystatuseschange");a.dispatchEvent(c)}
function Ju(){this.size=0;this.g=void 0}q=Ju.prototype;q.forEach=function(a){this.g&&a(this.g,mg.value())};q.get=function(a){if(this.has(a))return this.g};q.has=function(a){var b=mg.value();return this.g&&Mc(a,b)?!0:!1};q.entries=function(){};q.keys=function(){};q.values=function(){};Zt(Bu);function Lu(){}function Mu(){!window.HTMLVideoElement||!window.MSMediaKeys||navigator.requestMediaKeySystemAccess&&MediaKeySystemAccess.prototype.getConfiguration||(delete HTMLMediaElement.prototype.mediaKeys,HTMLMediaElement.prototype.mediaKeys=null,window.MediaKeys=Nu,window.MediaKeySystemAccess=Ou,navigator.requestMediaKeySystemAccess=Pu,HTMLMediaElement.prototype.setMediaKeys=Qu)}function Pu(a,b){try{var c=new Ou(a,b);return Promise.resolve(c)}catch(d){return Promise.reject(d)}}
function Ru(a){if(a.initData){var b=new CustomEvent("encrypted");b.initDataType="cenc";b.initData=Pc(mo(a.initData));this.dispatchEvent(b)}}Wt.PatchedMediaKeysMs=Lu;Lu.install=Mu;
function Ou(a,b){this.keySystem=a;for(var c=!1,d=r(b),e=d.next();!e.done;e=d.next()){e=e.value;var f={audioCapabilities:[],videoCapabilities:[],persistentState:"optional",distinctiveIdentifier:"optional",initDataTypes:e.initDataTypes,sessionTypes:["temporary"],label:e.label},g=!1;if(e.audioCapabilities)for(var h=r(e.audioCapabilities),k=h.next();!k.done;k=h.next())k=k.value,k.contentType&&(g=!0,MSMediaKeys.isTypeSupported(this.keySystem,k.contentType.split(";")[0])&&(f.audioCapabilities.push(k),c=
!0));if(e.videoCapabilities)for(h=r(e.videoCapabilities),k=h.next();!k.done;k=h.next())k=k.value,k.contentType&&(g=!0,MSMediaKeys.isTypeSupported(this.keySystem,k.contentType.split(";")[0])&&(f.videoCapabilities.push(k),c=!0));g||(c=MSMediaKeys.isTypeSupported(this.keySystem,"video/mp4"));"required"==e.persistentState&&(c=!1);if(c){this.g=f;return}}c=Error("Unsupported keySystem");c.name="NotSupportedError";c.code=DOMException.NOT_SUPPORTED_ERR;throw c;}
Ou.prototype.createMediaKeys=function(){var a=new Nu(this.keySystem);return Promise.resolve(a)};Ou.prototype.getConfiguration=function(){return this.g};function Qu(a){var b=this.mediaKeys;b&&b!=a&&Su(b,null);delete this.mediaKeys;return(this.mediaKeys=a)?Su(a,this):Promise.resolve()}function Nu(a){this.g=new MSMediaKeys(a);this.h=new rf}
Nu.prototype.createSession=function(a){a=a||"temporary";if("temporary"!=a)throw new TypeError("Session type "+a+" is unsupported on this platform.");return new Tu(this.g,a)};Nu.prototype.setServerCertificate=function(){return Promise.resolve(!1)};function Su(a,b){a.h.Yb();if(!b)return Promise.resolve();a.h.o(b,"msneedkey",Ru);try{return Ei(b,HTMLMediaElement.HAVE_METADATA,a.h,function(){b.msSetMediaKeys(a.g)}),Promise.resolve()}catch(c){return Promise.reject(c)}}
function Tu(a){db.call(this);this.j=null;this.l=a;this.i=this.g=null;this.h=new rf;this.sessionId="";this.expiration=NaN;this.closed=new Wc;this.keyStatuses=new Uu}u(Tu,db);q=Tu.prototype;
q.generateRequest=function(a,b){var c=this;this.g=new Wc;try{this.j=this.l.createSession("video/mp4",Oc(b),null),this.h.o(this.j,"mskeymessage",function(d){c.g&&(c.g.resolve(),c.g=null);d=(new Map).set("messageType",void 0==c.keyStatuses.g?"license-request":"license-renewal").set("message",Pc(d.message));d=new O("message",d);c.dispatchEvent(d)}),this.h.o(this.j,"mskeyadded",function(){c.g?(Vu(c,"usable"),c.g.resolve(),c.g=null):c.i&&(Vu(c,"usable"),c.i.resolve(),c.i=null)}),this.h.o(this.j,"mskeyerror",
function(){var d=Error("EME PatchedMediaKeysMs key error");d.errorCode=c.j.error;if(null!=c.g)c.g.reject(d),c.g=null;else if(null!=c.i)c.i.reject(d),c.i=null;else switch(c.j.error.code){case MSMediaKeyError.MS_MEDIA_KEYERR_OUTPUT:case MSMediaKeyError.MS_MEDIA_KEYERR_HARDWARECHANGE:Vu(c,"output-not-allowed");break;default:Vu(c,"internal-error")}}),Vu(this,"status-pending")}catch(d){this.g.reject(d)}return this.g};q.load=function(){return Promise.reject(Error("MediaKeySession.load not yet supported"))};
q.update=function(a){this.i=new Wc;try{this.j.update(Oc(a))}catch(b){this.i.reject(b)}return this.i};q.close=function(){try{this.j.close(),this.closed.resolve(),this.h.Yb()}catch(a){this.closed.reject(a)}return this.closed};q.remove=function(){return Promise.reject(Error("MediaKeySession.remove is only applicable for persistent licenses, which are not supported on this platform"))};function Vu(a,b){var c=a.keyStatuses;c.size=void 0==b?0:1;c.g=b;c=new O("keystatuseschange");a.dispatchEvent(c)}
function Uu(){this.size=0;this.g=void 0}q=Uu.prototype;q.forEach=function(a){this.g&&a(this.g,mg.value())};q.get=function(a){if(this.has(a))return this.g};q.has=function(a){var b=mg.value();return this.g&&Mc(a,b)?!0:!1};q.entries=function(){};q.keys=function(){};q.values=function(){};Zt(Mu);function Wu(){}function Xu(){!window.HTMLVideoElement||navigator.requestMediaKeySystemAccess&&MediaKeySystemAccess.prototype.getConfiguration||(navigator.requestMediaKeySystemAccess=Yu,delete HTMLMediaElement.prototype.mediaKeys,HTMLMediaElement.prototype.mediaKeys=null,HTMLMediaElement.prototype.setMediaKeys=Zu,window.MediaKeys=$u,window.MediaKeySystemAccess=av)}function Yu(){return Promise.reject(Error("The key system specified is not supported."))}
function Zu(a){return null==a?Promise.resolve():Promise.reject(Error("MediaKeys not supported."))}Wt.PatchedMediaKeysNop=Wu;Wu.install=Xu;function $u(){throw new TypeError("Illegal constructor.");}$u.prototype.createSession=function(){};$u.prototype.setServerCertificate=function(){};function av(){this.keySystem="";throw new TypeError("Illegal constructor.");}av.prototype.getConfiguration=function(){};av.prototype.createMediaKeys=function(){};Zt(Xu,-10);function bv(){}function cv(){if(!(!window.HTMLVideoElement||navigator.requestMediaKeySystemAccess&&MediaKeySystemAccess.prototype.getConfiguration)){if(HTMLMediaElement.prototype.webkitGenerateKeyRequest)dv="webkit";else if(!HTMLMediaElement.prototype.generateKeyRequest)return;navigator.requestMediaKeySystemAccess=ev;delete HTMLMediaElement.prototype.mediaKeys;HTMLMediaElement.prototype.mediaKeys=null;HTMLMediaElement.prototype.setMediaKeys=fv;window.MediaKeys=gv;window.MediaKeySystemAccess=hv}}
function iv(a){var b=dv;return b?b+a.charAt(0).toUpperCase()+a.slice(1):a}function ev(a,b){try{var c=new hv(a,b);return Promise.resolve(c)}catch(d){return Promise.reject(d)}}function fv(a){var b=this.mediaKeys;b&&b!=a&&jv(b,null);delete this.mediaKeys;(this.mediaKeys=a)&&jv(a,this);return Promise.resolve()}Wt.PatchedMediaKeysWebkit=bv;bv.install=cv;
function hv(a,b){this.g=this.keySystem=a;var c=!1;"org.w3.clearkey"==a&&(this.g="webkit-org.w3.clearkey",c=!1);var d=!1;var e=document.getElementsByTagName("video");e=e.length?e[0]:document.createElement("video");for(var f=r(b),g=f.next();!g.done;g=f.next()){g=g.value;var h={audioCapabilities:[],videoCapabilities:[],persistentState:"optional",distinctiveIdentifier:"optional",initDataTypes:g.initDataTypes,sessionTypes:["temporary"],label:g.label},k=!1;if(g.audioCapabilities)for(var l=r(g.audioCapabilities),
m=l.next();!m.done;m=l.next())m=m.value,m.contentType&&(k=!0,e.canPlayType(m.contentType.split(";")[0],this.g)&&(h.audioCapabilities.push(m),d=!0));if(g.videoCapabilities)for(l=r(g.videoCapabilities),m=l.next();!m.done;m=l.next())m=m.value,m.contentType&&(k=!0,e.canPlayType(m.contentType,this.g)&&(h.videoCapabilities.push(m),d=!0));k||(d=e.canPlayType("video/mp4",this.g)||e.canPlayType("video/webm",this.g));"required"==g.persistentState&&(c?(h.persistentState="required",h.sessionTypes=["persistent-license"]):
d=!1);if(d){this.h=h;return}}c="Unsupported keySystem";if("org.w3.clearkey"==a||"com.widevine.alpha"==a)c="None of the requested configurations were supported.";c=Error(c);c.name="NotSupportedError";c.code=DOMException.NOT_SUPPORTED_ERR;throw c;}hv.prototype.createMediaKeys=function(){var a=new gv(this.g);return Promise.resolve(a)};hv.prototype.getConfiguration=function(){return this.h};function gv(a){this.l=a;this.g=null;this.h=new rf;this.i=[];this.j=new Map}
function jv(a,b){a.g=b;a.h.Yb();var c=dv;b&&(a.h.o(b,c+"needkey",function(d){var e=new CustomEvent("encrypted");e.initDataType="cenc";e.initData=Pc(d.initData);a.g.dispatchEvent(e)}),a.h.o(b,c+"keymessage",function(d){var e=kv(a,d.sessionId);e&&(d=(new Map).set("messageType",void 0==e.keyStatuses.g?"licenserequest":"licenserenewal").set("message",d.message),d=new O("message",d),e.h&&(e.h.resolve(),e.h=null),e.dispatchEvent(d))}),a.h.o(b,c+"keyadded",function(d){if(d=kv(a,d.sessionId))lv(d,"usable"),
d.g&&d.g.resolve(),d.g=null}),a.h.o(b,c+"keyerror",function(d){var e=kv(a,d.sessionId);e&&e.handleError(d)}))}gv.prototype.createSession=function(a){a=a||"temporary";if("temporary"!=a&&"persistent-license"!=a)throw new TypeError("Session type "+a+" is unsupported on this platform.");var b=this.g||document.createElement("video");b.src||(b.src="about:blank");a=new mv(b,this.l,a);this.i.push(a);return a};gv.prototype.setServerCertificate=function(){return Promise.resolve(!1)};
function kv(a,b){var c=a.j.get(b);return c?c:(c=a.i.shift())?(c.sessionId=b,a.j.set(b,c),c):null}function mv(a,b,c){db.call(this);this.j=a;this.s=!1;this.g=this.h=null;this.i=b;this.l=c;this.sessionId="";this.expiration=NaN;this.closed=new Wc;this.keyStatuses=new nv}u(mv,db);q=mv.prototype;
q.handleError=function(a){var b=Error("EME v0.1b key error"),c=a.errorCode;c.systemCode=a.systemCode;b.errorCode=c;!a.sessionId&&this.h?(45==a.systemCode&&(b.message="Unsupported session type."),this.h.reject(b),this.h=null):a.sessionId&&this.g?(this.g.reject(b),this.g=null):(b=a.systemCode,a.errorCode.code==MediaKeyError.MEDIA_KEYERR_OUTPUT?lv(this,"output-restricted"):1==b?lv(this,"expired"):lv(this,"internal-error"))};
function ov(a,b,c){if(a.s)return Promise.reject(Error("The session is already initialized."));a.s=!0;try{if("persistent-license"==a.l)if(c)var d=Oc(cd("LOAD_SESSION|"+c));else{var e=cd("PERSISTENT|");d=kd(e,b)}else d=Oc(b)}catch(g){return Promise.reject(g)}a.h=new Wc;var f=iv("generateKeyRequest");try{a.j[f](a.i,d)}catch(g){if("InvalidStateError"!=g.name)return a.h=null,Promise.reject(g);(new Q(function(){try{a.j[f](a.i,d)}catch(h){a.h.reject(h),a.h=null}})).U(.01)}return a.h}
function pv(a,b,c){if(a.g)a.g.then(function(){return pv(a,b,c)})["catch"](function(){return pv(a,b,c)});else{a.g=b;if("webkit-org.w3.clearkey"==a.i){var d=Zc(c);var e=JSON.parse(d);"oct"!=e.keys[0].kty&&(a.g.reject(Error("Response is not a valid JSON Web Key Set.")),a.g=null);d=hd(e.keys[0].k);e=hd(e.keys[0].kid)}else d=Oc(c),e=null;var f=iv("addKey");try{a.j[f](a.i,d,e,a.sessionId)}catch(g){a.g.reject(g),a.g=null}}}
function lv(a,b){var c=a.keyStatuses;c.size=void 0==b?0:1;c.g=b;c=new O("keystatuseschange");a.dispatchEvent(c)}q.generateRequest=function(a,b){return ov(this,b,null)};q.load=function(a){return"persistent-license"==this.l?ov(this,null,a):Promise.reject(Error("Not a persistent session."))};q.update=function(a){var b=new Wc;pv(this,b,a);return b};
q.close=function(){if("persistent-license"!=this.l){if(!this.sessionId)return this.closed.reject(Error("The session is not callable.")),this.closed;var a=iv("cancelKeyRequest");try{this.j[a](this.i,this.sessionId)}catch(b){}}this.closed.resolve();return this.closed};q.remove=function(){return"persistent-license"!=this.l?Promise.reject(Error("Not a persistent session.")):this.close()};function nv(){this.size=0;this.g=void 0}q=nv.prototype;q.forEach=function(a){this.g&&a(this.g,mg.value())};q.get=function(a){if(this.has(a))return this.g};
q.has=function(a){var b=mg.value();return this.g&&Mc(a,b)?!0:!1};q.entries=function(){};q.keys=function(){};q.values=function(){};var dv="";Zt(cv);function qv(){}function rv(){if(window.HTMLVideoElement){var a=HTMLVideoElement.prototype;a.requestPictureInPicture&&document.exitPictureInPicture||!a.webkitSupportsPresentationMode||(document.pictureInPictureEnabled=!0,document.pictureInPictureElement=null,a.requestPictureInPicture=sv,Object.defineProperty(a,"disablePictureInPicture",{get:tv,set:uv,enumerable:!0,configurable:!0}),document.exitPictureInPicture=vv,document.addEventListener("webkitpresentationmodechanged",wv,!0))}}
function wv(a){a=a.target;if("picture-in-picture"==a.webkitPresentationMode){document.pictureInPictureElement=a;var b=new Event("enterpictureinpicture");a.dispatchEvent(b)}else document.pictureInPictureElement==a&&(document.pictureInPictureElement=null),b=new Event("leavepictureinpicture"),a.dispatchEvent(b)}
function sv(){return this.webkitSupportsPresentationMode("picture-in-picture")?(this.webkitSetPresentationMode("picture-in-picture"),document.pictureInPictureElement=this,Promise.resolve()):Promise.reject(Error("PiP not allowed by video element"))}function vv(){var a=document.pictureInPictureElement;return a?(a.webkitSetPresentationMode("inline"),document.pictureInPictureElement=null,Promise.resolve()):Promise.reject(Error("No picture in picture element found"))}
function tv(){return this.hasAttribute("disablePictureInPicture")?!0:!this.webkitSupportsPresentationMode("picture-in-picture")}function uv(a){a?this.setAttribute("disablePictureInPicture",""):this.removeAttribute("disablePictureInPicture")}Wt.PiPWebkit=qv;qv.install=rv;Zt(rv);function xv(){}function yv(){window.crypto&&("randomUUID"in window.crypto||(window.crypto.randomUUID=zv))}function zv(){var a=URL.createObjectURL(new Blob),b=a.toString();URL.revokeObjectURL(a);return b.substr(b.lastIndexOf("/")+1)}Wt.RandomUUID=xv;xv.install=yv;Zt(yv);function Av(){}function Bv(){navigator.storage&&navigator.storage.estimate||!navigator.webkitTemporaryStorage||!navigator.webkitTemporaryStorage.queryUsageAndQuota||("storage"in navigator||(navigator.storage={}),navigator.storage.estimate=Cv)}function Cv(){return new Promise(function(a,b){navigator.webkitTemporaryStorage.queryUsageAndQuota(function(c,d){a({usage:c,quota:d})},b)})}Wt.StorageEstimate=Av;Av.install=Bv;Zt(Bv);function Dv(){}function Ev(){if(window.HTMLMediaElement){var a=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){var b=a.apply(this);b&&b["catch"](function(){});return b}}}Wt.VideoPlayPromise=Dv;Dv.install=Ev;Zt(Ev);function Fv(){}function Gv(){if(window.HTMLVideoElement){var a=HTMLVideoElement.prototype;!a.getVideoPlaybackQuality&&"webkitDroppedFrameCount"in a&&(a.getVideoPlaybackQuality=Hv)}}function Hv(){return{droppedVideoFrames:this.webkitDroppedFrameCount,totalVideoFrames:this.webkitDecodedFrameCount,corruptedVideoFrames:0,creationTime:NaN,totalFrameDelay:0}}Wt.VideoPlaybackQuality=Fv;Fv.install=Gv;Zt(Gv);function Iv(){}function Jv(){if(!window.VTTCue&&window.TextTrackCue){var a=null,b=TextTrackCue.length;if(3==b)a=Kv;else if(6==b)a=Lv;else{try{var c=!!Kv(1,2,"")}catch(d){c=!1}c&&(a=Kv)}a&&(window.VTTCue=function(d,e,f){return a(d,e,f)})}}function Kv(a,b,c){return new window.TextTrackCue(a,b,c)}function Lv(a,b,c){return new window.TextTrackCue(a+"-"+b+"-"+c,a,b,c)}Wt.VTTCue=Iv;Iv.install=Jv;Zt(Jv);function Mv(){}Mv.prototype.parseInit=function(){};Mv.prototype.parseMedia=function(a,b){var c=null,d=[],e=Zc(a).split(/\r?\n/);e=r(e);for(var f=e.next();!f.done;f=e.next())if((f=f.value)&&!/^\s+$/.test(f)&&(f=Nv.exec(f))){var g=Ov.exec(f[1]);g=60*parseInt(g[1],10)+parseFloat(g[2].replace(",","."));f=new rc(g,b.segmentEnd?b.segmentEnd:g+2,f[2]);c&&(c.endTime=g,d.push(c));c=f}c&&d.push(c);return d};N("shaka.text.LrcTextParser",Mv);Mv.prototype.parseMedia=Mv.prototype.parseMedia;
Mv.prototype.parseInit=Mv.prototype.parseInit;var Nv=/^\[(\d{1,2}:\d{1,2}(?:[.,]\d{1,3})?)\](.*)/,Ov=/^(\d+):(\d{1,2}(?:[.,]\d{1,3})?)$/;wd["application/x-subtitle-lrc"]=function(){return new Mv};function Pv(){}Pv.prototype.parseInit=function(){};
Pv.prototype.parseMedia=function(a,b){var c=Zc(a),d=[],e=new DOMParser,f=null;if(""==c)return d;try{f=e.parseFromString(c,"text/xml")}catch(C){throw new P(2,2,2005,"Failed to parse TTML.");}if(f){if(c=f.getElementsByTagName("parsererror")[0])throw new P(2,2,2005,c.textContent);var g=f.getElementsByTagName("tt")[0];if(!g)throw new P(2,2,2005,"TTML does not contain <tt> tag.");f=g.getElementsByTagName("body")[0];if(!f)return[];var h=to(g,Qv,"frameRate"),k=to(g,Qv,"subFrameRate"),l=to(g,Qv,"frameRateMultiplier"),
m=to(g,Qv,"tickRate"),n=to(g,Qv,"cellResolution");c=g.getAttribute("xml:space")||"default";e=to(g,Rv,"extent");if("default"!=c&&"preserve"!=c)throw new P(2,2,2005,"Invalid xml:space value: "+c);c="default"==c;h=new Sv(h,k,l,m);n=n?(n=/^(\d+) (\d+)$/.exec(n))?{columns:parseInt(n[1],10),rows:parseInt(n[2],10)}:null:null;k=(k=g.getElementsByTagName("metadata")[0])?ro(k):[];l=Array.from(g.getElementsByTagName("style"));g=Array.from(g.getElementsByTagName("region"));m=[];for(var p=r(g),t=p.next();!t.done;t=
p.next()){var v=t.value;t=new tc;var w=v.getAttribute("xml:id");if(w){t.id=w;var y=null;e&&(y=Tv.exec(e)||Uv.exec(e));w=y?Number(y[1]):null;y=y?Number(y[2]):null;var x,D;if(x=Vv(v,l,"extent"))x=(D=Tv.exec(x))||Uv.exec(x),null!=x&&(t.width=Number(x[1]),t.height=Number(x[2]),D||(null!=w&&(t.width=100*t.width/w),null!=y&&(t.height=100*t.height/y)),t.widthUnits=D||null!=w?Jc:0,t.heightUnits=D||null!=y?Jc:0);if(v=Vv(v,l,"origin"))x=(D=Tv.exec(v))||Uv.exec(v),null!=x&&(t.viewportAnchorX=Number(x[1]),t.viewportAnchorY=
Number(x[2]),D||(null!=y&&(t.viewportAnchorY=100*t.viewportAnchorY/y),null!=w&&(t.viewportAnchorX=100*t.viewportAnchorX/w)),t.viewportAnchorUnits=D||null!=w?Jc:0)}else t=null;t&&m.push(t)}if(oo(f,"p").length)throw new P(2,2,2001,"<p> can only be inside <div> in TTML");e=r(oo(f,"div"));for(p=e.next();!p.done;p=e.next())if(oo(p.value,"span").length)throw new P(2,2,2001,"<span> can only be inside <p> in TTML");(f=Wv(f,b.periodStart,h,k,l,g,m,c,n,null,!1))&&d.push(f)}return d};
function Wv(a,b,c,d,e,f,g,h,k,l,m){var n=a.parentNode;if(a.nodeType==Node.COMMENT_NODE)return null;if(a.nodeType==Node.TEXT_NODE){if(!m)return null;var p=document.createElement("span");p.textContent=a.textContent}else p=a;for(var t=null,v=r(Xv),w=v.next();!w.done&&!(t=Yv(p,"backgroundImage",d,"#",w.value)[0]);w=v.next());v=m;if("p"==a.nodeName||t)m=!0;h="default"==(p.getAttribute("xml:space")||(h?"default":"preserve"));w=Array.from(p.childNodes).every(function(B){return B.nodeType==Node.TEXT_NODE});
a=[];if(!w)for(var y=r(p.childNodes),x=y.next();!x.done;x=y.next())(x=Wv(x.value,b,c,d,e,f,g,h,k,p,m))&&a.push(x);d=null!=l;y=/\S/.test(p.textContent);var D=p.hasAttribute("begin")||p.hasAttribute("end")||p.hasAttribute("dur");if(!(D||y||"br"==p.tagName||0!=a.length||d&&!h))return null;x=Zv(p,c);y=x.start;for(x=x.end;n&&n.nodeType==Node.ELEMENT_NODE&&"tt"!=n.tagName;)x=$v(n,c,y,x),y=x.start,x=x.end,n=n.parentNode;null==y&&(y=0);y+=b;x=null==x?Infinity:x+b;if(!D&&0<a.length)for(y=Infinity,x=0,b=r(a),
c=b.next();!c.done;c=b.next())c=c.value,y=Math.min(y,c.startTime),x=Math.max(x,c.endTime);if("br"==p.tagName)return e=new rc(y,x,""),e.lineBreak=!0,e;b="";w&&(b=p.textContent,h&&(b=b.trim(),b=b.replace(/\s+/g," ")));b=new rc(y,x,b);b.nestedCues=a;m||(b.isContainer=!0);k&&(b.cellResolution=k);k=Yv(p,"region",f,"")[0];if(p.hasAttribute("region")&&k&&k.getAttribute("xml:id")){var C=k.getAttribute("xml:id");b.region=g.filter(function(B){return B.id==C})[0]}g=k;l&&d&&!p.getAttribute("region")&&!p.getAttribute("style")&&
(g=Yv(l,"region",f,"")[0]);aw(b,p,g,t,e,v,0==a.length);return b}
function aw(a,b,c,d,e,f,g){f=f||g;"rtl"==bw(b,c,e,"direction",f)&&(a.direction="rtl");g=bw(b,c,e,"writingMode",f);"tb"==g||"tblr"==g?a.writingMode="vertical-lr":"tbrl"==g?a.writingMode="vertical-rl":"rltb"==g||"rl"==g?a.direction="rtl":g&&(a.direction=sc);(g=bw(b,c,e,"textAlign",!0))?(a.positionAlign=cw[g],a.lineAlign=dw[g],a.textAlign=Dc[g.toUpperCase()]):a.textAlign="start";if(g=bw(b,c,e,"displayAlign",!0))a.displayAlign=Ec[g.toUpperCase()];if(g=bw(b,c,e,"color",f))a.color=g;if(g=bw(b,c,e,"backgroundColor",
f))a.backgroundColor=g;if(g=bw(b,c,e,"border",f))a.border=g;if(g=bw(b,c,e,"fontFamily",f))a.fontFamily=g;(g=bw(b,c,e,"fontWeight",f))&&"bold"==g&&(a.fontWeight=700);g=bw(b,c,e,"wrapOption",f);a.wrapLine=g&&"noWrap"==g?!1:!0;(g=bw(b,c,e,"lineHeight",f))&&g.match(ew)&&(a.lineHeight=g);(g=bw(b,c,e,"fontSize",f))&&(g.match(ew)||g.match(fw))&&(a.fontSize=g);if(g=bw(b,c,e,"fontStyle",f))a.fontStyle=Ic[g.toUpperCase()];if(d){g=d.getAttribute("imageType")||d.getAttribute("imagetype");var h=d.getAttribute("encoding");
d=d.textContent.trim();"PNG"==g&&"Base64"==h&&d&&(a.backgroundImage="data:image/png;base64,"+d)}if(d=bw(b,c,e,"textOutline",f))d=d.split(" "),d[0].match(ew)?a.textStrokeColor=a.color:(a.textStrokeColor=d[0],d.shift()),d[0]&&d[0].match(ew)?a.textStrokeWidth=d[0]:a.textStrokeColor="";(d=bw(b,c,e,"letterSpacing",f))&&d.match(ew)&&(a.letterSpacing=d);(d=bw(b,c,e,"linePadding",f))&&d.match(ew)&&(a.linePadding=d);if(f=bw(b,c,e,"opacity",f))a.opacity=parseFloat(f);(c=Vv(c,e,"textDecoration"))&&gw(a,c);(b=
hw(b,e,"textDecoration"))&&gw(a,b)}
function gw(a,b){for(var c=r(b.split(" ")),d=c.next();!d.done;d=c.next())switch(d.value){case "underline":a.textDecoration.includes("underline")||a.textDecoration.push("underline");break;case "noUnderline":a.textDecoration.includes("underline")&&oc(a.textDecoration,"underline");break;case "lineThrough":a.textDecoration.includes("lineThrough")||a.textDecoration.push("lineThrough");break;case "noLineThrough":a.textDecoration.includes("lineThrough")&&oc(a.textDecoration,"lineThrough");break;case "overline":a.textDecoration.includes("overline")||
a.textDecoration.push("overline");break;case "noOverline":a.textDecoration.includes("overline")&&oc(a.textDecoration,"overline")}}function bw(a,b,c,d,e){e=void 0===e?!0:e;return(a=hw(a,c,d))?a:e?Vv(b,c,d):null}function Vv(a,b,c){if(!a)return null;var d=to(a,Rv,c);return d?d:iw(a,b,c)}function hw(a,b,c){var d=to(a,Rv,c);return d?d:iw(a,b,c)}
function iw(a,b,c){a=Yv(a,"style",b,"");for(var d=null,e=0;e<a.length;e++){var f=so(a[e],"urn:ebu:tt:style",c);f||(f=to(a[e],Rv,c));f||(f=hw(a[e],b,c));f&&(d=f)}return d}
function Yv(a,b,c,d,e){var f=[];if(!a||1>c.length)return f;var g=a;for(a=null;g&&!(a=e?so(g,e,b):g.getAttribute(b))&&(g=g.parentNode,g instanceof Element););if(b=a)for(b=r(b.split(" ")),e=b.next();!e.done;e=b.next())for(e=e.value,a=r(c),g=a.next();!g.done;g=a.next())if(g=g.value,d+g.getAttribute("xml:id")==e){f.push(g);break}return f}function $v(a,b,c,d){a=Zv(a,b);null==c?c=a.start:null!=a.start&&(c+=a.start);null==d?d=a.end:null!=a.start&&(d+=a.start);return{start:c,end:d}}
function Zv(a,b){var c=jw(a.getAttribute("begin"),b),d=jw(a.getAttribute("end"),b),e=jw(a.getAttribute("dur"),b);null==d&&null!=e&&(d=c+e);return{start:c,end:d}}
function jw(a,b){var c=null;if(kw.test(a)){c=kw.exec(a);var d=Number(c[1]),e=Number(c[2]),f=Number(c[3]),g=Number(c[4]);g+=(Number(c[5])||0)/b.h;f+=g/b.frameRate;c=f+60*e+3600*d}else if(lw.test(a))c=mw(lw,a);else if(nw.test(a))c=mw(nw,a);else if(ow.test(a))c=ow.exec(a),c=Number(c[1])/b.frameRate;else if(pw.test(a))c=pw.exec(a),c=Number(c[1])/b.g;else if(qw.test(a))c=mw(qw,a);else if(a)throw new P(2,2,2001,"Could not parse cue time range in TTML");return c}
function mw(a,b){var c=a.exec(b);return null==c||""==c[0]?null:(Number(c[4])||0)/1E3+(Number(c[3])||0)+60*(Number(c[2])||0)+3600*(Number(c[1])||0)}N("shaka.text.TtmlTextParser",Pv);Pv.prototype.parseMedia=Pv.prototype.parseMedia;Pv.prototype.parseInit=Pv.prototype.parseInit;function Sv(a,b,c,d){this.frameRate=Number(a)||30;this.h=Number(b)||1;this.g=Number(d);0==this.g&&(this.g=a?this.frameRate*this.h:1);c&&(a=/^(\d+) (\d+)$/g.exec(c))&&(this.frameRate*=Number(a[1])/Number(a[2]))}
var Tv=/^(\d{1,2}(?:\.\d+)?|100(?:\.0+)?)% (\d{1,2}(?:\.\d+)?|100(?:\.0+)?)%$/,fw=/^(\d{1,2}(?:\.\d+)?|100)%$/,ew=/^(\d+px|\d+em|\d*\.?\d+c)$/,Uv=/^(\d+)px (\d+)px$/,kw=/^(\d{2,}):(\d{2}):(\d{2}):(\d{2})\.?(\d+)?$/,lw=/^(?:(\d{2,}):)?(\d{2}):(\d{2})$/,nw=/^(?:(\d{2,}):)?(\d{2}):(\d{2}\.\d{2,})$/,ow=/^(\d*(?:\.\d*)?)f$/,pw=/^(\d*(?:\.\d*)?)t$/,qw=/^(?:(\d*(?:\.\d*)?)h)?(?:(\d*(?:\.\d*)?)m)?(?:(\d*(?:\.\d*)?)s)?(?:(\d*(?:\.\d*)?)ms)?$/,dw={left:yc,center:"center",right:"end",start:yc,end:"end"},cw=
{left:"line-left",center:"center",right:"line-right"},Qv=["http://www.w3.org/ns/ttml#parameter","http://www.w3.org/2006/10/ttaf1#parameter"],Rv=["http://www.w3.org/ns/ttml#styling","http://www.w3.org/2006/10/ttaf1#styling"],Xv=["http://www.smpte-ra.org/schemas/2052-1/2010/smpte-tt","http://www.smpte-ra.org/schemas/2052-1/2013/smpte-tt"];wd["application/ttml+xml"]=function(){return new Pv};function rw(){this.C=new Pv}rw.prototype.parseInit=function(a){var b=!1;(new wg).box("moov",Ag).box("trak",Ag).box("mdia",Ag).box("minf",Ag).box("stbl",Ag).Z("stsd",Cg).box("stpp",function(c){b=!0;c.parser.stop()}).parse(a);if(!b)throw new P(2,2,2007);};rw.prototype.parseMedia=function(a,b){var c=this,d=!1,e=[];(new wg).box("mdat",Dg(function(f){d=!0;e=e.concat(c.C.parseMedia(f,b))})).parse(a,!1);if(!d)throw new P(2,2,2007);return e};N("shaka.text.Mp4TtmlParser",rw);rw.prototype.parseMedia=rw.prototype.parseMedia;
rw.prototype.parseInit=rw.prototype.parseInit;wd['application/mp4; codecs="stpp"']=function(){return new rw};wd['application/mp4; codecs="stpp.ttml"']=function(){return new rw};wd['application/mp4; codecs="stpp.ttml.im1t"']=function(){return new rw};wd['application/mp4; codecs="stpp.TTML.im1t"']=function(){return new rw};function sw(){}sw.prototype.parseInit=function(){};
sw.prototype.parseMedia=function(a,b){var c=Zc(a);c=c.replace(/\r\n|\r(?=[^\n]|$)/gm,"\n");var d=c.split(/\n{2,}/m);if(!/^WEBVTT($|[ \t\n])/m.test(d[0]))throw new P(2,2,2E3);c=b.periodStart;if(d[0].includes("X-TIMESTAMP-MAP")){var e=d[0].match(/LOCAL:((?:(\d{1,}):)?(\d{2}):(\d{2})\.(\d{3}))/m),f=d[0].match(/MPEGTS:(\d+)/m);if(e&&f){c=tw(new Oq(e[1]));if(null==c)throw new P(2,2,2E3);f=Number(f[1]);for(e=b.segmentStart;95443.7176888889<=e;)e-=95443.7176888889,f+=8589934592;c=b.periodStart+f/9E4-c}}f=
[];e=r(d[0].split("\n"));for(var g=e.next();!g.done;g=e.next())if(g=g.value,/^Region:/.test(g)){g=new Oq(g);var h=new tc;Rq(g);Pq(g);for(var k=Rq(g);k;){var l=h,m=k;(k=/^id=(.*)$/.exec(m))?l.id=k[1]:(k=/^width=(\d{1,2}|100)%$/.exec(m))?l.width=Number(k[1]):(k=/^lines=(\d+)$/.exec(m))?(l.height=Number(k[1]),l.heightUnits=2):(k=/^regionanchor=(\d{1,2}|100)%,(\d{1,2}|100)%$/.exec(m))?(l.regionAnchorX=Number(k[1]),l.regionAnchorY=Number(k[2])):(k=/^viewportanchor=(\d{1,2}|100)%,(\d{1,2}|100)%$/.exec(m))?
(l.viewportAnchorX=Number(k[1]),l.viewportAnchorY=Number(k[2])):/^scroll=up$/.exec(m)&&(l.scroll="up");Pq(g);k=Rq(g)}f.push(h)}e=new Map;uw(e);g=[];d=r(d.slice(1));for(h=d.next();!h.done;h=d.next()){h=h.value.split("\n");if((1!=h.length||h[0])&&!/^NOTE($|[ \t])/.test(h[0])&&"STYLE"==h[0]&&h[1].includes("::cue")){l="global";(k=h[1].match(/\((.*)\)/))&&(l=k.pop());k=h.slice(2,-1);h[1].includes("}")&&(m=/\{(.*?)\}/.exec(h[1]))&&(k=m[1].split(";"));m=new rc(0,0,"");for(var n=!1,p=0;p<k.length;p++){var t=
/^\s*([^:]+):\s*(.*)/.exec(k[p]);if(t){var v=t[2].trim().replace(";","");switch(t[1].trim()){case "background-color":n=!0;m.backgroundColor=v;break;case "color":n=!0;m.color=v;break;case "font-family":n=!0;m.fontFamily=v;break;case "font-size":n=!0;m.fontSize=v;break;case "font-weight":700<=parseInt(v,10)&&(n=!0,m.fontWeight=700);break;case "font-style":switch(v){case "normal":n=!0;m.fontStyle=Bc;break;case "italic":n=!0;m.fontStyle="italic";break;case "oblique":n=!0,m.fontStyle="oblique"}break;case "opacity":n=
!0;m.opacity=parseFloat(v);break;case "white-space":n=!0,m.wrapLine="noWrap"!=v}}}n&&e.set(l,m)}p=c;if(1==h.length&&!h[0]||/^NOTE($|[ \t])/.test(h[0])||"STYLE"==h[0])h=null;else{l=null;h[0].includes("--\x3e")||(l=h[0],h.splice(0,1));k=new Oq(h[0]);m=tw(k);t=Qq(k,/[ \t]+--\x3e[ \t]+/g);n=tw(k);if(null==m||null==t||null==n)throw new P(2,2,2001,"Could not parse cue time range in WebVTT");m+=p;n+=p;p=h.slice(1).join("\n").trim();e.has("global")?(h=e.get("global").clone(),h.startTime=m,h.endTime=n,h.payload=
""):h=new rc(m,n,"");vw(p,h,e);Pq(k);for(m=Rq(k);m;)ww(h,m,f),Pq(k),m=Rq(k);null!=l&&(h.id=l)}h&&g.push(h)}return g};function uw(a){for(var b=r(Object.entries(Gc)),c=b.next();!c.done;c=b.next()){var d=r(c.value);c=d.next().value;d=d.next().value;var e=new rc(0,0,"");e.color=d;a.set(c,e)}b=r(Object.entries(Hc));for(c=b.next();!c.done;c=b.next())d=r(c.value),c=d.next().value,d=d.next().value,e=new rc(0,0,""),e.backgroundColor=d,a.set(c,e)}
function vw(a,b,c){0===c.size&&uw(c);a=xw(a);var d=Fo("<span>"+a+"</span>","span");if(d){var e=[];d=d.childNodes;if(1==d.length){var f=d[0];if(f.nodeType==Node.TEXT_NODE||f.nodeType==Node.CDATA_SECTION_NODE){b.payload=a;return}}a=r(d);for(d=a.next();!d.done;d=a.next())yw(d.value,b,e,c);b.nestedCues=e}else b.payload=a}
function xw(a){for(var b=[],c=-1,d="",e=0;e<a.length;e++)if("/"===a[e]){var f=a.indexOf(">",e);if(f<=e)return a;f=a.substring(e+1,f);var g=b.pop();if(f&&g){if(g===f)d+="/"+f+">";else{if(!g.startsWith("c.")||"c"!==f)return a;d+="/"+g+">"}e+=f.length+1}else return a}else"<"===a[e]?c=e+1:">"===a[e]&&0<c&&(b.push(a.substr(c,e-c)),c=-1),d+=a[e];return d}function zw(a,b){return a&&0<a.length?a:b}
function yw(a,b,c,d){var e=b.clone();if(a.nodeType===Node.ELEMENT_NODE&&a.nodeName)for(var f=r(a.nodeName.split(/[ .]+/)),g=f.next();!g.done;g=f.next()){g=g.value;if(d.has(g)){var h=d.get(g);h&&(e.backgroundColor=zw(h.backgroundColor,e.backgroundColor),e.color=zw(h.color,e.color),e.fontFamily=zw(h.fontFamily,e.fontFamily),e.fontSize=zw(h.fontSize,e.fontSize),e.fontWeight=h.fontWeight,e.fontStyle=h.fontStyle,e.opacity=h.opacity,e.wrapLine=h.wrapLine)}switch(g){case "b":e.fontWeight=700;break;case "i":e.fontStyle=
"italic";break;case "u":e.textDecoration.push("underline")}}if(vo(a))for(f=!0,d=r(a.textContent.split("\n")),a=d.next();!a.done;a=d.next())a=a.value,f||(f=b.clone(),f.lineBreak=!0,c.push(f)),0<a.length&&(f=e.clone(),f.payload=a,c.push(f)),f=!1;else for(b=r(a.childNodes),a=b.next();!a.done;a=b.next())yw(a.value,e,c,d)}
function ww(a,b,c){var d;if(d=/^align:(start|middle|center|end|left|right)$/.exec(b))b=d[1],"middle"==b?a.textAlign=vc:a.textAlign=Dc[b.toUpperCase()];else if(d=/^vertical:(lr|rl)$/.exec(b))a.writingMode="lr"==d[1]?"vertical-lr":"vertical-rl";else if(d=/^size:([\d.]+)%$/.exec(b))a.size=Number(d[1]);else if(d=/^position:([\d.]+)%(?:,(line-left|line-right|center|start|end))?$/.exec(b))a.position=Number(d[1]),d[2]&&(b=d[2],a.positionAlign="line-left"==b||"start"==b?"line-left":"line-right"==b||"end"==
b?"line-right":"center");else if(d=/^region:(.*)$/.exec(b)){if(b=Aw(c,d[1]))a.region=b}else if(c=/^line:([\d.]+)%(?:,(start|end|center))?$/.exec(b))a.lineInterpretation=1,a.line=Number(c[1]),c[2]&&(a.lineAlign=Fc[c[2].toUpperCase()]);else if(c=/^line:(-?\d+)(?:,(start|end|center))?$/.exec(b))a.lineInterpretation=xc,a.line=Number(c[1]),c[2]&&(a.lineAlign=Fc[c[2].toUpperCase()])}function Aw(a,b){var c=a.filter(function(d){return d.id==b});return c.length?c[0]:null}
function tw(a){a=Qq(a,/(?:(\d{1,}):)?(\d{2}):(\d{2})\.(\d{2,3})/g);if(null==a)return null;var b=Number(a[2]),c=Number(a[3]);return 59<b||59<c?null:Number(a[4])/1E3+c+60*b+3600*(Number(a[1])||0)}N("shaka.text.VttTextParser",sw);sw.prototype.parseMedia=sw.prototype.parseMedia;sw.prototype.parseInit=sw.prototype.parseInit;wd["text/vtt"]=function(){return new sw};wd['text/vtt; codecs="vtt"']=function(){return new sw};wd['text/vtt; codecs="wvtt"']=function(){return new sw};function Bw(){this.g=null}Bw.prototype.parseInit=function(a){var b=this,c=!1;(new wg).box("moov",Ag).box("trak",Ag).box("mdia",Ag).Z("mdhd",function(d){d=Rh(d.reader,d.version);b.g=d.timescale}).box("minf",Ag).box("stbl",Ag).Z("stsd",Cg).box("wvtt",function(){c=!0}).parse(a);if(!this.g)throw new P(2,2,2008);if(!c)throw new P(2,2,2008);};
Bw.prototype.parseMedia=function(a,b){if(!this.g)throw new P(2,2,2008);var c=0,d=[],e,f=[],g=!1,h=!1,k=!1,l=null;(new wg).box("moof",Ag).box("traf",Ag).Z("tfdt",function(B){g=!0;c=Qh(B.reader,B.version).Xd}).Z("tfhd",function(B){l=Ph(B.reader,B.flags).cf}).Z("trun",function(B){h=!0;d=Sh(B.reader,B.version,B.flags).zf}).box("mdat",Dg(function(B){k=!0;e=B})).parse(a,!1);if(!k&&!g&&!h)throw new P(2,2,2008);for(var m=c,n=new tg(e,0),p=r(d),t=p.next();!t.done;t=p.next()){t=t.value;var v=t.ye||l,w=t.Cd?
c+t.Cd:m;m=w+(v||0);var y=0;do{var x=n.T();y+=x;var D=n.T(),C=null;"vttc"==Eg(D)?8<x&&(C=n.Lb(x-8)):n.skip(x-8);v&&C&&(x=Cw(C,b.periodStart+w/this.g,b.periodStart+m/this.g),f.push(x))}while(t.sampleSize&&y<t.sampleSize)}return f.filter(Lb)};function Cw(a,b,c){var d,e,f;(new wg).box("payl",Dg(function(g){d=Zc(g)})).box("iden",Dg(function(g){e=Zc(g)})).box("sttg",Dg(function(g){f=Zc(g)})).parse(a);return d?Dw(d,e,f,b,c):null}
function Dw(a,b,c,d,e){d=new rc(d,e,"");vw(a,d,new Map);b&&(d.id=b);if(c)for(a=new Oq(c),b=Rq(a);b;)ww(d,b,[]),Pq(a),b=Rq(a);return d}N("shaka.text.Mp4VttParser",Bw);Bw.prototype.parseMedia=Bw.prototype.parseMedia;Bw.prototype.parseInit=Bw.prototype.parseInit;wd['application/mp4; codecs="wvtt"']=function(){return new Bw};function Ew(){}Ew.prototype.parseInit=function(){};Ew.prototype.parseMedia=function(a){var b=Zc(a).replace(/\r+/g,"");b=b.trim();a=[];if(""==b)return a;b=r(b.split("\n\n"));for(var c=b.next();!c.done;c=b.next()){c=c.value.split("\n");var d=new Oq(c[0]),e=Fw(d),f=Qq(d,/,/g);d=Fw(d);if(null==e||null==f||null==d)throw new P(2,2,2001,"Could not parse cue time range in SubViewer");a.push(new rc(e,d,c.slice(1).join("\n").trim()))}return a};
function Fw(a){a=Qq(a,/(?:(\d{1,}):)?(\d{2}):(\d{2})\.(\d{2,3})/g);if(null==a)return null;var b=Number(a[2]),c=Number(a[3]);return 59<b||59<c?null:Number(a[4])/1E3+c+60*b+3600*(Number(a[1])||0)}N("shaka.text.SbvTextParser",Ew);Ew.prototype.parseMedia=Ew.prototype.parseMedia;Ew.prototype.parseInit=Ew.prototype.parseInit;wd["text/x-subviewer"]=function(){return new Ew};function Gw(){this.C=new sw}Gw.prototype.parseInit=function(){};Gw.prototype.parseMedia=function(a,b){var c=Zc(a);c=Hw(c);c=Oc(cd(c));return this.C.parseMedia(c,b)};function Hw(a){var b="WEBVTT\n\n";if(""==a)return b;a=a.replace(/\r+/g,"");a=a.trim();a=r(a.split("\n\n"));for(var c=a.next();!c.done;c=a.next())c=c.value.split(/\n/),c[0].match(/\d+/)&&c.shift(),c[0]=c[0].replace(/,/g,"."),b+=c.join("\n")+"\n\n";return b}N("shaka.text.SrtTextParser",Gw);Gw.srt2webvtt=Hw;Gw.prototype.parseMedia=Gw.prototype.parseMedia;
Gw.prototype.parseInit=Gw.prototype.parseInit;wd["text/srt"]=function(){return new Gw};function Iw(){}Iw.prototype.parseInit=function(){};
Iw.prototype.parseMedia=function(a){var b="",c="";a=Zc(a).split(/\r?\n\s*\r?\n/);a=r(a);for(var d=a.next();!d.done;d=a.next()){var e=Jw.exec(d.value);e&&(d=e[1],e=e[2],"V4 Styles"==d||"V4+ Styles"==d?b=e:"Events"==d&&(c=e))}a=[];d=null;b=r(b.split(/\r?\n/));for(var f=b.next();!f.done;f=b.next())if(e=f.value,!/^\s*;/.test(e)&&(f=Kw.exec(e)))if(e=f[1].trim(),f=f[2].trim(),"Format"==e)d=f.split(Lw);else if("Style"==e){e=f.split(Lw);f={};for(var g=0;g<d.length&&g<e.length;g++)f[d[g]]=e[g];a.push(f)}d=
[];b=null;e={};c=r(c.split(/\r?\n/));for(f=c.next();!f.done;e={Ud:e.Ud},f=c.next())if(f=f.value,!/^\s*;/.test(f)&&(g=Kw.exec(f)))if(f=g[1].trim(),g=g[2].trim(),"Format"==f)b=g.split(Lw);else if("Dialogue"==f){g=g.split(Lw);f={};for(var h=0;h<b.length&&h<g.length;h++)f[b[h]]=g[h];h=Mw(f.Start);var k=Mw(f.End);g=new rc(h,k,g.slice(b.length-1).join(",").replace(/\\N/g,"\n").replace(/\{[^}]+\}/g,""));e.Ud=f.Style;(f=a.find(function(l){return function(m){return m.Name==l.Ud}}(e)))&&Nw(g,f);d.push(g)}return d};
function Nw(a,b){var c=b.Fontname;c&&(a.fontFamily=c);if(c=b.Fontsize)a.fontSize=c+"px";if(c=b.PrimaryColour)if(c=Ow(c))a.color=c;if(c=b.BackColour)if(c=Ow(c))a.backgroundColor=c;b.Bold&&(a.fontWeight=700);b.Italic&&(a.fontStyle="italic");b.Underline&&a.textDecoration.push("underline");if(c=b.Spacing)a.letterSpacing=c+"px";if(c=b.Alignment)switch(parseInt(c,10)){case 1:a.displayAlign=zc;a.textAlign="start";break;case 2:a.displayAlign=zc;a.textAlign=vc;break;case 3:a.displayAlign=zc;a.textAlign="end";
break;case 5:a.displayAlign="before";a.textAlign="start";break;case 6:a.displayAlign="before";a.textAlign=vc;break;case 7:a.displayAlign="before";a.textAlign="end";break;case 9:a.displayAlign="center";a.textAlign="start";break;case 10:a.displayAlign="center";a.textAlign=vc;break;case 11:a.displayAlign="center",a.textAlign="end"}if(c=b.AlphaLevel)a.opacity=parseFloat(c)}
function Ow(a){a=parseInt(a.replace("&H",""),16);return 0<=a?"rgba("+(a&255)+","+(a>>8&255)+","+(a>>16&255)+","+(a>>24&255^255)/255+")":null}function Mw(a){a=Pw.exec(a);return 3600*(a[1]?parseInt(a[1].replace(":",""),10):0)+60*parseInt(a[2],10)+parseFloat(a[3])}N("shaka.text.SsaTextParser",Iw);Iw.prototype.parseMedia=Iw.prototype.parseMedia;Iw.prototype.parseInit=Iw.prototype.parseInit;var Jw=/^\s*\[([^\]]+)\]\r?\n([\s\S]*)/,Kw=/^\s*([^:]+):\s*(.*)/,Lw=/\s*,\s*/,Pw=/^(\d+:)?(\d{1,2}):(\d{1,2}(?:[.]\d{1,3})?)?$/;
wd["text/x-ssa"]=function(){return new Iw};/*
 @license
 EME Encryption Scheme Polyfill
 Copyright 2019 Google LLC
 SPDX-License-Identifier: Apache-2.0
*/
function Qw(){}var Rw;function Sw(){Rw?console.debug("EmeEncryptionSchemePolyfill: Already installed."):navigator.requestMediaKeySystemAccess&&MediaKeySystemAccess.prototype.getConfiguration?(Rw=navigator.requestMediaKeySystemAccess,console.debug("EmeEncryptionSchemePolyfill: Waiting to detect encryptionScheme support."),navigator.requestMediaKeySystemAccess=Tw):console.debug("EmeEncryptionSchemePolyfill: EME not found")}
function Tw(a,b){var c=this,d;return L(function(e){if(1==e.g)return console.assert(c==navigator,'bad "this" for requestMediaKeySystemAccess'),z(e,Rw.call(c,a,b),2);d=e.h;if(Uw(d))return console.debug("EmeEncryptionSchemePolyfill: Native encryptionScheme support found."),navigator.requestMediaKeySystemAccess=Rw,e["return"](d);console.debug("EmeEncryptionSchemePolyfill: No native encryptionScheme support found. Patching encryptionScheme support.");navigator.requestMediaKeySystemAccess=Vw;return e["return"](Vw.call(c,
a,b))})}
function Vw(a,b){var c=this,d,e,f,g,h,k,l,m,n,p;return L(function(t){if(1==t.g){console.assert(c==navigator,'bad "this" for requestMediaKeySystemAccess');d=Ww(a);e=[];f=r(b);for(g=f.next();!g.done;g=f.next())h=g.value,k=Xw(h.videoCapabilities,d),l=Xw(h.audioCapabilities,d),h.videoCapabilities&&h.videoCapabilities.length&&!k.length||h.audioCapabilities&&h.audioCapabilities.length&&!l.length||(m=Object.assign({},h),m.videoCapabilities=k,m.audioCapabilities=l,e.push(m));if(!e.length)throw n=Error("Unsupported keySystem or supportedConfigurations."),
n.name="NotSupportedError",n.code=DOMException.NOT_SUPPORTED_ERR,n;return z(t,Rw.call(c,a,e),2)}p=t.h;return t["return"](new Yw(p,d))})}function Xw(a,b){return a?a.filter(function(c){return!c.encryptionScheme||c.encryptionScheme==b}):a}N("EmeEncryptionSchemePolyfill",Qw);Qw.install=Sw;function Zw(){}var $w;
function ax(){$w?console.debug("McEncryptionSchemePolyfill: Already installed."):navigator.mediaCapabilities?($w=navigator.mediaCapabilities.decodingInfo,console.debug("McEncryptionSchemePolyfill: Waiting to detect encryptionScheme support."),navigator.mediaCapabilities.decodingInfo=bx):console.debug("McEncryptionSchemePolyfill: MediaCapabilities not found")}
function bx(a){var b=this,c,d;return L(function(e){if(1==e.g)return console.assert(b==navigator.mediaCapabilities,'bad "this" for decodingInfo'),z(e,$w.call(b,a),2);c=e.h;if(!a.keySystemConfiguration)return e["return"](c);if((d=c.keySystemAccess)&&Uw(d))return console.debug("McEncryptionSchemePolyfill: Native encryptionScheme support found."),navigator.mediaCapabilities.decodingInfo=$w,e["return"](c);console.debug("McEncryptionSchemePolyfill: No native encryptionScheme support found. Patching encryptionScheme support.");
navigator.mediaCapabilities.decodingInfo=cx;return e["return"](cx.call(b,a))})}
function cx(a){var b=this,c,d,e,f,g,h,k,l,m;return L(function(n){switch(n.g){case 1:return console.assert(b==navigator.mediaCapabilities,'bad "this" for decodingInfo'),c=null,a.keySystemConfiguration&&(d=a.keySystemConfiguration,e=d.keySystem,f=d.audio&&d.audio.encryptionScheme,g=d.video&&d.video.encryptionScheme,c=Ww(e),h={powerEfficient:!1,smooth:!1,supported:!1,keySystemAccess:null,configuration:a},f&&f!=c||g&&g!=c)?n["return"](h):z(n,$w.call(b,a),2);case 2:k=n.h;if(k.keySystemAccess){k.keySystemAccess=
new Yw(k.keySystemAccess,c);n.D(3);break}if(!a.keySystemConfiguration){n.D(3);break}var p=a.keySystemConfiguration,t=[],v=[];p.audio&&t.push({robustness:p.audio.robustness||"",contentType:a.audio.contentType});p.video&&v.push({robustness:p.video.robustness||"",contentType:a.video.contentType});p={initDataTypes:p.initDataType?[p.initDataType]:[],distinctiveIdentifier:p.distinctiveIdentifier,persistentState:p.persistentState,sessionTypes:p.sessionTypes};t.length&&(p.audioCapabilities=t);v.length&&(p.videoCapabilities=
v);l=p;m=k;return z(n,navigator.requestMediaKeySystemAccess(a.keySystemConfiguration.keySystem,[l]),5);case 5:m.keySystemAccess=n.h;case 3:return n["return"](k)}})}N("McEncryptionSchemePolyfill",Zw);Zw.install=ax;function Yw(a,b){this.h=a;this.g=b;this.keySystem=a.keySystem}
Yw.prototype.getConfiguration=function(){var a=this.h.getConfiguration();if(a.videoCapabilities)for(var b=r(a.videoCapabilities),c=b.next();!c.done;c=b.next())c.value.encryptionScheme=this.g;if(a.audioCapabilities)for(b=r(a.audioCapabilities),c=b.next();!c.done;c=b.next())c.value.encryptionScheme=this.g;return a};Yw.prototype.createMediaKeys=function(){return this.h.createMediaKeys()};
function Ww(a){if(a.startsWith("com.widevine")||a.startsWith("com.microsoft")||a.startsWith("com.adobe")||a.startsWith("org.w3"))return"cenc";if(a.startsWith("com.apple"))return"cbcs-1-9";console.warn("EmeEncryptionSchemePolyfill: Unknown key system:",a,"Please contribute!");return null}function Uw(a){a=a.getConfiguration();var b=a.audioCapabilities&&a.audioCapabilities[0];return(a=a.videoCapabilities&&a.videoCapabilities[0]||b)&&void 0!==a.encryptionScheme?!0:!1}function dx(){}
function eu(){Sw();ax()}N("EncryptionSchemePolyfills",dx);dx.install=eu;"undefined"!==typeof module&&module.exports&&(module.exports=dx);/*
 @license
 Copyright 2013 Ali Al Dallal

 Licensed under the MIT license.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
*/
for(var ex={ach:{u:"Lwo",A:"Acholi"},ady:{u:"\u0410\u0434\u044b\u0433\u044d\u0431\u0437\u044d",A:"Adyghe"},af:{u:"Afrikaans",A:"Afrikaans"},"af-NA":{u:"Afrikaans (Namibia)",A:"Afrikaans (Namibia)"},"af-ZA":{u:"Afrikaans (South Africa)",A:"Afrikaans (South Africa)"},ak:{u:"T\u0255\u0265i",A:"Akan"},ar:{u:"\u0627\u0644\u0639\u0631\u0628\u064a\u0629",A:"Arabic"},"ar-AR":{u:"\u0627\u0644\u0639\u0631\u0628\u064a\u0629",A:"Arabic"},"ar-MA":{u:"\u0627\u0644\u0639\u0631\u0628\u064a\u0629",A:"Arabic (Morocco)"},
"ar-SA":{u:"\u0627\u0644\u0639\u0631\u0628\u064a\u0629 (\u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629)",A:"Arabic (Saudi Arabia)"},"ay-BO":{u:"Aymar aru",A:"Aymara"},az:{u:"Az\u0259rbaycan dili",A:"Azerbaijani"},"az-AZ":{u:"Az\u0259rbaycan dili",A:"Azerbaijani"},"be-BY":{u:"\u0411\u0435\u043b\u0430\u0440\u0443\u0441\u043a\u0430\u044f",A:"Belarusian"},bg:{u:"\u0411\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438",A:"Bulgarian"},"bg-BG":{u:"\u0411\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438",
A:"Bulgarian"},bn:{u:"\u09ac\u09be\u0982\u09b2\u09be",A:"Bengali"},"bn-IN":{u:"\u09ac\u09be\u0982\u09b2\u09be (\u09ad\u09be\u09b0\u09a4)",A:"Bengali (India)"},"bn-BD":{u:"\u09ac\u09be\u0982\u09b2\u09be(\u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6)",A:"Bengali (Bangladesh)"},"bs-BA":{u:"Bosanski",A:"Bosnian"},ca:{u:"Catal\u00e0",A:"Catalan"},"ca-ES":{u:"Catal\u00e0",A:"Catalan"},cak:{u:"Maya Kaqchikel",A:"Kaqchikel"},"ck-US":{u:"\u13e3\u13b3\u13a9 (tsalagi)",A:"Cherokee"},cs:{u:"\u010ce\u0161tina",
A:"Czech"},"cs-CZ":{u:"\u010ce\u0161tina",A:"Czech"},cy:{u:"Cymraeg",A:"Welsh"},"cy-GB":{u:"Cymraeg",A:"Welsh"},da:{u:"Dansk",A:"Danish"},"da-DK":{u:"Dansk",A:"Danish"},de:{u:"Deutsch",A:"German"},"de-AT":{u:"Deutsch (\u00d6sterreich)",A:"German (Austria)"},"de-DE":{u:"Deutsch (Deutschland)",A:"German (Germany)"},"de-CH":{u:"Deutsch (Schweiz)",A:"German (Switzerland)"},dsb:{u:"Dolnoserb\u0161\u0107ina",A:"Lower Sorbian"},el:{u:"\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac",A:"Greek"},"el-GR":{u:"\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac",
A:"Greek (Greece)"},en:{u:"English",A:"English"},"en-GB":{u:"English (UK)",A:"English (UK)"},"en-AU":{u:"English (Australia)",A:"English (Australia)"},"en-CA":{u:"English (Canada)",A:"English (Canada)"},"en-IE":{u:"English (Ireland)",A:"English (Ireland)"},"en-IN":{u:"English (India)",A:"English (India)"},"en-PI":{u:"English (Pirate)",A:"English (Pirate)"},"en-UD":{u:"English (Upside Down)",A:"English (Upside Down)"},"en-US":{u:"English (US)",A:"English (US)"},"en-ZA":{u:"English (South Africa)",
A:"English (South Africa)"},"en@pirate":{u:"English (Pirate)",A:"English (Pirate)"},eo:{u:"Esperanto",A:"Esperanto"},"eo-EO":{u:"Esperanto",A:"Esperanto"},es:{u:"Espa\u00f1ol",A:"Spanish"},"es-AR":{u:"Espa\u00f1ol (Argentine)",A:"Spanish (Argentina)"},"es-419":{u:"Espa\u00f1ol (Latinoam\u00e9rica)",A:"Spanish (Latin America)"},"es-CL":{u:"Espa\u00f1ol (Chile)",A:"Spanish (Chile)"},"es-CO":{u:"Espa\u00f1ol (Colombia)",A:"Spanish (Colombia)"},"es-EC":{u:"Espa\u00f1ol (Ecuador)",A:"Spanish (Ecuador)"},
"es-ES":{u:"Espa\u00f1ol (Espa\u00f1a)",A:"Spanish (Spain)"},"es-LA":{u:"Espa\u00f1ol (Latinoam\u00e9rica)",A:"Spanish (Latin America)"},"es-NI":{u:"Espa\u00f1ol (Nicaragua)",A:"Spanish (Nicaragua)"},"es-MX":{u:"Espa\u00f1ol (M\u00e9xico)",A:"Spanish (Mexico)"},"es-US":{u:"Espa\u00f1ol (Estados Unidos)",A:"Spanish (United States)"},"es-VE":{u:"Espa\u00f1ol (Venezuela)",A:"Spanish (Venezuela)"},et:{u:"eesti keel",A:"Estonian"},"et-EE":{u:"Eesti (Estonia)",A:"Estonian (Estonia)"},eu:{u:"Euskara",A:"Basque"},
"eu-ES":{u:"Euskara",A:"Basque"},fa:{u:"\u0641\u0627\u0631\u0633\u06cc",A:"Persian"},"fa-IR":{u:"\u0641\u0627\u0631\u0633\u06cc",A:"Persian"},"fb-LT":{u:"Leet Speak",A:"Leet"},ff:{u:"Fulah",A:"Fulah"},fi:{u:"Suomi",A:"Finnish"},"fi-FI":{u:"Suomi",A:"Finnish"},"fo-FO":{u:"F\u00f8royskt",A:"Faroese"},fr:{u:"Fran\u00e7ais",A:"French"},"fr-CA":{u:"Fran\u00e7ais (Canada)",A:"French (Canada)"},"fr-FR":{u:"Fran\u00e7ais (France)",A:"French (France)"},"fr-BE":{u:"Fran\u00e7ais (Belgique)",A:"French (Belgium)"},
"fr-CH":{u:"Fran\u00e7ais (Suisse)",A:"French (Switzerland)"},"fy-NL":{u:"Frysk",A:"Frisian (West)"},ga:{u:"Gaeilge",A:"Irish"},"ga-IE":{u:"Gaeilge (Gaelic)",A:"Irish (Gaelic)"},gl:{u:"Galego",A:"Galician"},"gl-ES":{u:"Galego",A:"Galician"},"gn-PY":{u:"Ava\u00f1e'\u1ebd",A:"Guarani"},"gu-IN":{u:"\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0",A:"Gujarati"},"gx-GR":{u:"\u1f19\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ae \u1f00\u03c1\u03c7\u03b1\u03af\u03b1",A:"Classical Greek"},he:{u:"\u05e2\u05d1\u05e8\u05d9\u05ea\u200f",
A:"Hebrew"},"he-IL":{u:"\u05e2\u05d1\u05e8\u05d9\u05ea\u200f",A:"Hebrew"},hi:{u:"\u0939\u093f\u0928\u094d\u0926\u0940",A:"Hindi"},"hi-IN":{u:"\u0939\u093f\u0928\u094d\u0926\u0940",A:"Hindi"},hr:{u:"Hrvatski",A:"Croatian"},"hr-HR":{u:"Hrvatski",A:"Croatian"},hsb:{u:"Hornjoserb\u0161\u0107ina",A:"Upper Sorbian"},ht:{u:"Krey\u00f2l",A:"Haitian Creole"},hu:{u:"Magyar",A:"Hungarian"},"hu-HU":{u:"Magyar",A:"Hungarian"},"hy-AM":{u:"\u0540\u0561\u0575\u0565\u0580\u0565\u0576",A:"Armenian"},id:{u:"Bahasa Indonesia",
A:"Indonesian"},"id-ID":{u:"Bahasa Indonesia",A:"Indonesian"},is:{u:"\u00cdslenska",A:"Icelandic"},"is-IS":{u:"\u00cdslenska (Iceland)",A:"Icelandic (Iceland)"},it:{u:"Italiano",A:"Italian"},"it-IT":{u:"Italiano",A:"Italian"},ja:{u:"\u65e5\u672c\u8a9e",A:"Japanese"},"ja-JP":{u:"\u65e5\u672c\u8a9e",A:"Japanese"},"jv-ID":{u:"Basa Jawa",A:"Javanese"},"ka-GE":{u:"\u10e5\u10d0\u10e0\u10d7\u10e3\u10da\u10d8",A:"Georgian"},"kk-KZ":{u:"\u049a\u0430\u0437\u0430\u049b\u0448\u0430",A:"Kazakh"},km:{u:"\u1797\u17b6\u179f\u17b6\u1781\u17d2\u1798\u17c2\u179a",
A:"Khmer"},"km-KH":{u:"\u1797\u17b6\u179f\u17b6\u1781\u17d2\u1798\u17c2\u179a",A:"Khmer"},kab:{u:"Taqbaylit",A:"Kabyle"},kn:{u:"\u0c95\u0ca8\u0ccd\u0ca8\u0ca1",A:"Kannada"},"kn-IN":{u:"\u0c95\u0ca8\u0ccd\u0ca8\u0ca1 (India)",A:"Kannada (India)"},ko:{u:"\ud55c\uad6d\uc5b4",A:"Korean"},"ko-KR":{u:"\ud55c\uad6d\uc5b4 (\u97e9\u56fd)",A:"Korean (Korea)"},ku:{u:"Kurd\u00ee",A:"Kurdish"},"ku-TR":{u:"Kurd\u00ee",A:"Kurdish"},la:{u:"Latin",A:"Latin"},"la-VA":{u:"Latin",A:"Latin"},lb:{u:"L\u00ebtzebuergesch",
A:"Luxembourgish"},"li-NL":{u:"L\u00e8mb\u00f6rgs",A:"Limburgish"},lt:{u:"Lietuvi\u0173",A:"Lithuanian"},"lt-LT":{u:"Lietuvi\u0173",A:"Lithuanian"},lv:{u:"Latvie\u0161u",A:"Latvian"},"lv-LV":{u:"Latvie\u0161u",A:"Latvian"},mai:{u:"\u092e\u0948\u0925\u093f\u0932\u0940, \u09ae\u09c8\u09a5\u09bf\u09b2\u09c0",A:"Maithili"},"mg-MG":{u:"Malagasy",A:"Malagasy"},mk:{u:"\u041c\u0430\u043a\u0435\u0434\u043e\u043d\u0441\u043a\u0438",A:"Macedonian"},"mk-MK":{u:"\u041c\u0430\u043a\u0435\u0434\u043e\u043d\u0441\u043a\u0438 (\u041c\u0430\u043a\u0435\u0434\u043e\u043d\u0441\u043a\u0438)",
A:"Macedonian (Macedonian)"},ml:{u:"\u0d2e\u0d32\u0d2f\u0d3e\u0d33\u0d02",A:"Malayalam"},"ml-IN":{u:"\u0d2e\u0d32\u0d2f\u0d3e\u0d33\u0d02",A:"Malayalam"},"mn-MN":{u:"\u041c\u043e\u043d\u0433\u043e\u043b",A:"Mongolian"},mr:{u:"\u092e\u0930\u093e\u0920\u0940",A:"Marathi"},"mr-IN":{u:"\u092e\u0930\u093e\u0920\u0940",A:"Marathi"},ms:{u:"Bahasa Melayu",A:"Malay"},"ms-MY":{u:"Bahasa Melayu",A:"Malay"},mt:{u:"Malti",A:"Maltese"},"mt-MT":{u:"Malti",A:"Maltese"},my:{u:"\u1017\u1019\u102c\u1005\u1000\u102c",
A:"Burmese"},nb:{u:"Norsk (bokm\u00e5l)",A:"Norwegian (bokmal)"},"nb-NO":{u:"Norsk (bokm\u00e5l)",A:"Norwegian (bokmal)"},ne:{u:"\u0928\u0947\u092a\u093e\u0932\u0940",A:"Nepali"},"ne-NP":{u:"\u0928\u0947\u092a\u093e\u0932\u0940",A:"Nepali"},nl:{u:"Nederlands",A:"Dutch"},"nl-BE":{u:"Nederlands (Belgi\u00eb)",A:"Dutch (Belgium)"},"nl-NL":{u:"Nederlands (Nederland)",A:"Dutch (Netherlands)"},"nn-NO":{u:"Norsk (nynorsk)",A:"Norwegian (nynorsk)"},no:{u:"Norsk",A:"Norwegian"},oc:{u:"Occitan",A:"Occitan"},
"or-IN":{u:"\u0b13\u0b21\u0b3c\u0b3f\u0b06",A:"Oriya"},pa:{u:"\u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40",A:"Punjabi"},"pa-IN":{u:"\u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40 (\u0a2d\u0a3e\u0a30\u0a24 \u0a28\u0a42\u0a70)",A:"Punjabi (India)"},pl:{u:"Polski",A:"Polish"},"pl-PL":{u:"Polski",A:"Polish"},"ps-AF":{u:"\u067e\u069a\u062a\u0648",A:"Pashto"},pt:{u:"Portugu\u00eas",A:"Portuguese"},"pt-BR":{u:"Portugu\u00eas (Brasil)",A:"Portuguese (Brazil)"},"pt-PT":{u:"Portugu\u00eas (Portugal)",A:"Portuguese (Portugal)"},
"qu-PE":{u:"Qhichwa",A:"Quechua"},"rm-CH":{u:"Rumantsch",A:"Romansh"},ro:{u:"Rom\u00e2n\u0103",A:"Romanian"},"ro-RO":{u:"Rom\u00e2n\u0103",A:"Romanian"},ru:{u:"\u0420\u0443\u0441\u0441\u043a\u0438\u0439",A:"Russian"},"ru-RU":{u:"\u0420\u0443\u0441\u0441\u043a\u0438\u0439",A:"Russian"},"sa-IN":{u:"\u0938\u0902\u0938\u094d\u0915\u0943\u0924\u092e\u094d",A:"Sanskrit"},"se-NO":{u:"Davvis\u00e1megiella",A:"Northern S\u00e1mi"},"si-LK":{u:"\u0db4\u0dc5\u0dcf\u0dad",A:"Sinhala (Sri Lanka)"},sk:{u:"Sloven\u010dina",
A:"Slovak"},"sk-SK":{u:"Sloven\u010dina (Slovakia)",A:"Slovak (Slovakia)"},sl:{u:"Sloven\u0161\u010dina",A:"Slovenian"},"sl-SI":{u:"Sloven\u0161\u010dina",A:"Slovenian"},"so-SO":{u:"Soomaaliga",A:"Somali"},sq:{u:"Shqip",A:"Albanian"},"sq-AL":{u:"Shqip",A:"Albanian"},sr:{u:"\u0421\u0440\u043f\u0441\u043a\u0438",A:"Serbian"},"sr-RS":{u:"\u0421\u0440\u043f\u0441\u043a\u0438 (Serbia)",A:"Serbian (Serbia)"},su:{u:"Basa Sunda",A:"Sundanese"},sv:{u:"Svenska",A:"Swedish"},"sv-SE":{u:"Svenska",A:"Swedish"},
sw:{u:"Kiswahili",A:"Swahili"},"sw-KE":{u:"Kiswahili",A:"Swahili (Kenya)"},ta:{u:"\u0ba4\u0bae\u0bbf\u0bb4\u0bcd",A:"Tamil"},"ta-IN":{u:"\u0ba4\u0bae\u0bbf\u0bb4\u0bcd",A:"Tamil"},te:{u:"\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41",A:"Telugu"},"te-IN":{u:"\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41",A:"Telugu"},tg:{u:"\u0437\u0430\u0431\u043e\u0301\u043d\u0438 \u0442\u043e\u04b7\u0438\u043a\u04e3\u0301",A:"Tajik"},"tg-TJ":{u:"\u0442\u043e\u04b7\u0438\u043a\u04e3",A:"Tajik"},th:{u:"\u0e20\u0e32\u0e29\u0e32\u0e44\u0e17\u0e22",
A:"Thai"},"th-TH":{u:"\u0e20\u0e32\u0e29\u0e32\u0e44\u0e17\u0e22 (\u0e1b\u0e23\u0e30\u0e40\u0e17\u0e28\u0e44\u0e17\u0e22)",A:"Thai (Thailand)"},tl:{u:"Filipino",A:"Filipino"},"tl-PH":{u:"Filipino",A:"Filipino"},tlh:{u:"tlhIngan-Hol",A:"Klingon"},tr:{u:"T\u00fcrk\u00e7e",A:"Turkish"},"tr-TR":{u:"T\u00fcrk\u00e7e",A:"Turkish"},"tt-RU":{u:"\u0442\u0430\u0442\u0430\u0440\u0447\u0430",A:"Tatar"},uk:{u:"\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430",A:"Ukrainian"},"uk-UA":{u:"\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430",
A:"Ukrainian"},ur:{u:"\u0627\u0631\u062f\u0648",A:"Urdu"},"ur-PK":{u:"\u0627\u0631\u062f\u0648",A:"Urdu"},uz:{u:"O'zbek",A:"Uzbek"},"uz-UZ":{u:"O'zbek",A:"Uzbek"},vi:{u:"Ti\u1ebfng Vi\u1ec7t",A:"Vietnamese"},"vi-VN":{u:"Ti\u1ebfng Vi\u1ec7t",A:"Vietnamese"},"xh-ZA":{u:"isiXhosa",A:"Xhosa"},yi:{u:"\u05d9\u05d9\u05b4\u05d3\u05d9\u05e9",A:"Yiddish"},"yi-DE":{u:"\u05d9\u05d9\u05b4\u05d3\u05d9\u05e9 (German)",A:"Yiddish (German)"},zh:{u:"\u4e2d\u6587",A:"Chinese"},"zh-HANS":{u:"\u4e2d\u6587\u7b80\u4f53",
A:"Chinese Simplified"},"zh-HANT":{u:"\u4e2d\u6587\u7e41\u9ad4",A:"Chinese Traditional"},"zh-CN":{u:"\u4e2d\u6587\uff08\u4e2d\u56fd\uff09",A:"Chinese Simplified (China)"},"zh-HK":{u:"\u4e2d\u6587\uff08\u9999\u6e2f\uff09",A:"Chinese Traditional (Hong Kong)"},"zh-SG":{u:"\u4e2d\u6587\uff08\u65b0\u52a0\u5761\uff09",A:"Chinese Simplified (Singapore)"},"zh-TW":{u:"\u4e2d\u6587\uff08\u53f0\u7063\uff09",A:"Chinese Traditional (Taiwan)"},"zu-ZA":{u:"isiZulu",A:"Zulu"}},fx=r(Object.keys(ex)),gx=fx.next();!gx.done;gx=
fx.next()){var hx=gx.value;ex[hx.toLowerCase()]=ex[hx]};function W(a,b){var c=this;this.parent=a;this.controls=b;this.eventManager=new rf;this.localization=this.controls.bb;this.player=this.controls.lc();this.video=this.controls.Kb();this.adManager=this.player.od();this.ad=b.getAd();this.eventManager.o(this.adManager,"ad-started",function(d){c.ad=d.ad});this.eventManager.o(this.adManager,"ad-stopped",function(){c.ad=null})}
W.prototype.release=function(){this.eventManager.release();this.ad=this.adManager=this.video=this.player=this.localization=this.eventManager=this.controls=this.parent=null};N("shaka.ui.Element",W);W.prototype.release=W.prototype.release;function ix(a){return jx(a,"shaka-back-to-overflow-button")}function jx(a,b){var c=a.getElementsByClassName(b);return c.length?c[0]:null}function kx(a){a&&(a=jx(a,"shaka-chosen-item"))&&a.parentElement.focus()}function lx(){var a=S("i");a.classList.add("material-icons-round");a.classList.add("shaka-chosen-item");a.textContent="done";a.ariaHidden="true";return a}function X(a,b){a&&(b?a.classList.remove("shaka-hidden"):a.classList.add("shaka-hidden"))}
function mx(a,b){var c=Math.floor(a/3600),d=Math.floor(a/60%60),e=Math.floor(a%60);10>e&&(e="0"+e);e=d+":"+e;b&&(10>d&&(e="0"+e),e=c+":"+e);return e};function nx(a,b){W.call(this,a,b);var c=this;this.i=S("div");this.i.classList.add("shaka-ad-counter");this.parent.appendChild(this.i);this.h=S("span");this.h.classList.add("shaka-ad-counter-span");this.i.appendChild(this.h);this.g=new Q(function(){var d=Math.round(c.ad.getRemainingTime()),e=c.ad.getDuration();-1!=d&&-1!=e&&(0<d?(d=mx(e-d,!1)+" / "+mx(e,!1),1<c.ad.getSequenceLength()?c.h.textContent=d:(e=c.localization.resolve("AD_TIME"),c.h.textContent=e.replace("[AD_TIME]",d))):(c.g.stop(),c.h.textContent=
""))});this.eventManager.o(this.localization,"locale-updated",function(){});this.eventManager.o(this.localization,"locale-changed",function(){});this.eventManager.o(this.adManager,"ad-started",function(){c.g.Ga();c.g.na(.5)});this.eventManager.o(this.adManager,"ad-stopped",function(){c.g.stop();c.h.textContent=""});this.ad&&(this.g.Ga(),this.g.na(.5))}u(nx,W);nx.prototype.release=function(){this.g.stop();this.g=null;W.prototype.release.call(this)};N("shaka.ui.AdCounter",nx);function ox(a,b){W.call(this,a,b);var c=this;this.g=S("div");this.g.classList.add("shaka-ad-position");X(this.g,!1);this.parent.appendChild(this.g);this.h=S("span");this.h.classList.add("shaka-ad-position-span");this.g.appendChild(this.h);this.eventManager.o(this.localization,"locale-updated",function(){c.ad&&px(c)});this.eventManager.o(this.localization,"locale-changed",function(){c.ad&&px(c)});this.eventManager.o(this.adManager,"ad-started",function(){px(c)});this.eventManager.o(this.adManager,
"ad-stopped",function(){c.h.textContent="";X(c.g,!1)});this.ad&&px(this)}u(ox,W);function px(a){var b=a.ad.getSequenceLength();if(1<b){var c=a.ad.getPositionInSequence();a.h.textContent=a.localization.resolve("AD_PROGRESS").replace("[AD_ON]",String(c)).replace("[NUM_ADS]",String(b));X(a.g,!0)}}N("shaka.ui.AdPosition",ox);function qx(a,b){W.call(this,a,b);var c=this;this.button=bk();this.parent.appendChild(this.button);this.eventManager.o(this.localization,"locale-updated",function(){c.g()});this.eventManager.o(this.localization,"locale-changed",function(){c.g()});this.eventManager.o(this.video,"play",function(){c.g();c.h()});this.eventManager.o(this.video,"pause",function(){c.g();c.h()});this.eventManager.o(this.video,"seeking",function(){c.g();c.h()});this.eventManager.o(this.adManager,"ad-paused",function(){c.g();
c.h()});this.eventManager.o(this.adManager,"ad-resumed",function(){c.g();c.h()});this.eventManager.o(this.adManager,"ad-started",function(){c.g();c.h()});this.eventManager.o(this.button,"click",function(){c.ad&&c.ad.isLinear()?rx(c.controls):sx(c.controls)});this.ad&&(this.g(),this.h())}u(qx,W);qx.prototype.isPaused=function(){if(this.ad&&this.ad.isLinear())var a=this.ad.isPaused();else a=this.controls,a=a.g.paused&&!a.ka;return a};qx.prototype.g=function(){};qx.prototype.h=function(){};
N("shaka.ui.PlayButton",qx);function tx(a,b){qx.call(this,a,b);this.button.classList.add("shaka-play-button");this.button.classList.add("shaka-no-propagation");this.h();this.g()}u(tx,qx);tx.prototype.h=function(){this.isPaused()?this.button.setAttribute("icon","play"):this.button.setAttribute("icon","pause")};tx.prototype.g=function(){var a=this.isPaused()?"PLAY":"PAUSE";this.button.ariaLabel=this.localization.resolve(a)};N("shaka.ui.BigPlayButton",tx);function ux(a,b){W.call(this,a,b);var c=this;this.m=this.controls.m;this.h=this.controls.i;this.i=[];this.g=S("div");this.g.classList.add("shaka-no-propagation");this.g.classList.add("shaka-context-menu");this.g.classList.add("shaka-hidden");this.h.appendChild(this.g);this.eventManager.o(this.h,"contextmenu",function(d){if(c.g.classList.contains("shaka-hidden")){d.preventDefault();var e=c.h.getBoundingClientRect();c.g.style.left=d.clientX-e.left+"px";c.g.style.top=d.clientY-e.top+"px";X(c.g,!0)}else X(c.g,
!1)});this.eventManager.o(window,"click",function(){X(c.g,!1)});vx(this)}u(ux,W);ux.prototype.release=function(){this.h=null;for(var a=r(this.i),b=a.next();!b.done;b=a.next())b.value.release();this.i=[];W.prototype.release.call(this)};function wx(a,b){xx.set(a,b)}function vx(a){for(var b=r(a.m.contextMenuElements),c=b.next();!c.done;c=b.next()){c=c.value;var d=xx.get(c);d?a.i.push(d.create(a.g,a.controls)):Ta("Unrecognized context menu element:",c)}}N("shaka.ui.ContextMenu",ux);
ux.registerElement=wx;var xx=new Map;function yx(a,b,c,d){W.call(this,a,b);var e=this;this.container=S("div");this.container.classList.add("shaka-range-container");this.container.classList.add.apply(this.container.classList,ja(c));this.g=!1;this.bar=document.createElement("input");this.l=new Q(function(){e.onChangeEnd();e.g=!1});this.bar.classList.add("shaka-range-element");this.bar.classList.add.apply(this.bar.classList,ja(d));this.bar.type="range";this.bar.step="any";this.bar.min="0";this.bar.max="1";this.bar.value="0";this.container.appendChild(this.bar);
this.parent.appendChild(this.container);this.eventManager.o(this.bar,"mousedown",function(){e.controls.Ub()&&(e.g=!0,e.onChangeStart())});this.eventManager.o(this.bar,"touchstart",function(f){e.controls.Ub()&&(e.g=!0,zx(e,f),e.onChangeStart())});this.eventManager.o(this.bar,"input",function(){e.onChange()});this.eventManager.o(this.bar,"touchmove",function(f){e.g&&(zx(e,f),e.onChange())});this.eventManager.o(this.bar,"touchend",function(f){e.g&&(e.g=!1,zx(e,f),e.onChangeEnd())});this.eventManager.o(this.bar,
"mouseup",function(){e.g&&(e.g=!1,e.onChangeEnd())})}u(yx,W);q=yx.prototype;q.release=function(){this.l&&(this.l.stop(),this.l=null);W.prototype.release.call(this)};q.setRange=function(a,b){this.bar.min=a;this.bar.max=b};q.onChangeStart=function(){};q.onChange=function(){};q.onChangeEnd=function(){};q.changeTo=function(a){this.g||(this.g=!0,this.onChangeStart());var b=parseFloat(this.bar.min),c=parseFloat(this.bar.max);this.bar.value=a>c?c:a<b?b:a;this.onChange();this.l.U(.5)};q.getValue=function(){return parseFloat(this.bar.value)};
q.setValue=function(a){this.g||(this.bar.value=a)};function zx(a,b){b.preventDefault();var c=b.changedTouches[0],d=a.bar.getBoundingClientRect(),e=parseFloat(a.bar.min),f=parseFloat(a.bar.max);c=e+(f-e)/d.width*(c.clientX-d.left);c<e?c=e:c>f&&(c=f);a.bar.value=c}N("shaka.ui.RangeElement",yx);yx.prototype.setValue=yx.prototype.setValue;yx.prototype.getValue=yx.prototype.getValue;yx.prototype.changeTo=yx.prototype.changeTo;yx.prototype.onChangeEnd=yx.prototype.onChangeEnd;yx.prototype.onChange=yx.prototype.onChange;
yx.prototype.onChangeStart=yx.prototype.onChangeStart;yx.prototype.setRange=yx.prototype.setRange;function Ax(a,b){yx.call(this,a,b,["shaka-seek-bar-container"],["shaka-seek-bar","shaka-no-propagation","shaka-show-controls-on-mouse-over"]);var c=this;this.j=S("div");this.j.classList.add("shaka-ad-markers");this.container.insertBefore(this.j,this.container.childNodes[0]);this.m=this.controls.m;this.h=new Q(function(){c.video.currentTime=c.getValue()});this.s=new Q(function(){Bx(c)});this.B=!1;this.i=[];this.eventManager.o(this.localization,"locale-updated",function(){return Cx(c)});this.eventManager.o(this.localization,
"locale-changed",function(){return Cx(c)});this.eventManager.o(this.adManager,"ad-started",function(){Dx(c)||X(c.container,!1)});this.eventManager.o(this.adManager,"ad-stopped",function(){Dx(c)&&X(c.container,!0)});this.eventManager.o(this.adManager,"ad-cue-points-changed",function(d){c.i=d.cuepoints;Ex(c)});this.eventManager.o(this.player,"unloading",function(){c.i=[];Ex(c)});this.setValue(this.video.currentTime);this.update();Cx(this);this.ad&&X(this.container,!1)}u(Ax,yx);q=Ax.prototype;
q.release=function(){this.h&&(this.h.stop(),this.h=null,this.s.stop(),this.s=null);yx.prototype.release.call(this)};q.onChangeStart=function(){this.B=!this.video.paused;this.controls.He(!0);this.video.pause()};q.onChange=function(){this.video.duration&&(this.update(),this.h.U(.125))};q.onChangeEnd=function(){this.h.Ga();this.controls.He(!1);this.B&&this.video.play()};q.isShowing=function(){return!this.container.classList.contains("shaka-hidden")};
q.update=function(){var a=this.m.seekBarColors,b=this.getValue(),c=this.video.buffered.length,d=c?this.video.buffered.start(0):0,e=c?this.video.buffered.end(c-1):0,f=this.player.Na(),g=f.end-f.start;this.setRange(f.start,f.end);Dx(this)?(X(this.container,!0),0==c?this.container.style.background=a.base:(c=(Math.max(d,f.start)-f.start)/g||0,e=(Math.min(e,f.end)-f.start)/g||0,b=(Math.min(Math.max(b,f.start),f.end)-f.start)/g||0,this.container.style.background="linear-gradient("+["to right",(this.m.showUnbufferedStart?
a.base:a.played)+" "+100*c+"%",a.played+" "+100*c+"%",a.played+" "+100*b+"%",a.buffered+" "+100*b+"%",a.buffered+" "+100*e+"%",a.base+" "+100*e+"%"].join()+")")):X(this.container,!1)};
function Bx(a){if(a.i.length){for(var b=a.player.Na(),c=b.end-b.start,d=["to right"],e=[],f=a.m.seekBarColors.adBreaks,g=!1,h=r(a.i),k=h.next();!k.done;k=h.next())if(k=k.value,-1!=k.start||k.end||(g=!0),k.start>=b.start&&k.start<b.end&&!(k.end&&k.end>b.end)){var l=(k.start-b.start)/c||0,m=l+.01;k.end&&(m=(k.end-b.start)/c||0);e.push({start:l,end:m})}b=r(e);for(k=b.next();!k.done;k=b.next())c=k.value,d.push("transparent "+100*c.start+"%"),d.push(f+" "+100*c.start+"%"),d.push(f+" "+100*c.end+"%"),d.push("transparent "+
100*c.end+"%");g&&(d.push("transparent 99%"),d.push(f+" 99%"));a.j.style.background="linear-gradient("+d.join(",")+")"}else a.j.style.background="transparent"}function Ex(a){Bx(a);var b=a.player.Na();b=b.end-b.start;a.player.W()&&5<b&&a.s.na(1)}function Dx(a){var b=a.player.Na();b=b.end-b.start;return a.player.W()&&5>b?!1:null==a.ad||!a.ad.isLinear()}function Cx(a){a.bar.ariaLabel=a.localization.resolve("SEEK")}N("shaka.ui.SeekBar",Ax);function Fx(){}
Fx.prototype.create=function(a,b){return new Ax(a,b)};Ax.Factory=Fx;function Z(a,b,c,d){db.call(this);var e=this;this.ha=!0;this.m=d;this.B=new Fn(c,a,this.m.castReceiverAppId);this.Db=!0;this.g=this.B.Kb();this.C=c;this.G=this.B.lc();this.Ua=a;this.j=b;this.ob=this.G.od();this.s=this.l=null;this.ka=!1;this.I=[];this.nc=[];this.Gb=!1;this.sa=new Q(function(){e.j.style.cursor="none";e.Gb=!1;Gx(e)});this.Ba=new Q(function(){e.i.removeAttribute("shown");e.L.U(2)});this.L=new Q(function(){for(var f=r(e.I),g=f.next();!g.done;g=f.next())X(g.value,!1)});this.cb=new Q(function(){e.Ub()&&
Hx(e)});this.M=null;this.J=[];this.bb=Ix();this.h=new rf;this.configure(this.m);Jx(this);this.Ca=new Set;Kx(this);this.cb.na(.125);this.h.o(this.bb,"locale-changed",function(f){e.ob.setLocale(f.locales[0])})}u(Z,db);q=Z.prototype;
q.destroy=function(){var a=this;return L(function(b){switch(b.g){case 1:if(document.pictureInPictureElement!=a.C){b.D(2);break}return z(b,document.exitPictureInPicture(),2);case 2:a.h&&(a.h.release(),a.h=null);a.sa&&(a.sa.stop(),a.sa=null);a.Ba&&(a.Ba.stop(),a.Ba=null);a.L&&(a.L.stop(),a.L=null);a.cb&&(a.cb.stop(),a.cb=null);Lx(a);a.i&&(a.j.removeChild(a.i),a.i=null);if(!a.B){b.D(4);break}return z(b,a.B.destroy(),5);case 5:a.B=null;case 4:if(!a.Ua){b.D(6);break}return z(b,a.Ua.destroy(),7);case 7:a.Ua=
null;case 6:a.G=null,a.C=null,a.g=null,a.bb=null,a.Ca.clear(),db.prototype.release.call(a),A(b)}})};function Lx(a){for(var b=r(a.J),c=b.next();!c.done;c=b.next())c.value.release();a.J=[]}function Mx(a,b){Nx.set(a,b)}q.Sf=function(a){this.Db=a;Kx(this)};q.Og=function(){Gx(this)};
q.configure=function(a){this.m=a;this.B.Xe(a.castReceiverAppId);this.s&&(this.s=null);this.Eb&&(this.Eb=null);this.pb&&(this.pb=null);this.i?(ck(this.i),Lx(this)):(Ox(this),Px(this));this.j.classList.add("shaka-video-container");this.C.classList.add("shaka-video");Qx(this);this.m.addBigPlayButton&&Rx(this);this.m.customContextMenu&&(this.pb=new ux(this.ia,this),this.J.push(this.pb));this.Aa||Sx(this);this.zb=S("div");this.zb.classList.add("shaka-server-side-ad-container");this.i.appendChild(this.zb);
Tx(this);this.I=Array.from(this.j.getElementsByClassName("shaka-settings-menu"));this.I.push.apply(this.I,ja(Array.from(this.j.getElementsByClassName("shaka-overflow-menu"))));Ux(this);this.nc=Array.from(this.j.getElementsByClassName("shaka-show-controls-on-mouse-over"));Gx(this);a=r(this.j.getElementsByClassName("shaka-no-propagation"));for(var b=a.next();!b.done;b=a.next()){b=b.value;var c=function(d){return d.stopPropagation()};this.h.o(b,"click",c);this.h.o(b,"dblclick",c)}};
q.De=function(a){(this.ha=a)?(this.j.setAttribute("shaka-controls","true"),this.C.tabIndex=-1,this.C.controls=!1):this.j.removeAttribute("shaka-controls");Gx(this)};q.Df=function(a){this.C.controls=a;this.C.tabIndex=a?0:-1;a&&this.De(!1)};q.getAd=function(){return this.l};q.eg=function(){return this.B};q.rg=function(){return this.bb};q.Ig=function(){return this.j};q.Kb=function(){return this.g};q.qg=function(){return this.C};q.lc=function(){return this.G};q.pg=function(){return this.Ua};q.jg=function(){return this.i};
q.Ag=function(){return this.zb};q.gg=function(){return this.$};q.hg=function(){return this.m};q.Ng=function(){return this.ka};q.He=function(a){this.ka=a};q.Lg=function(){return this.Db};q.jf=function(){return this.s?this.s.getValue():this.g.currentTime};q.Ef=function(a){this.M=a};q.jd=function(){return this.I.some(function(a){return!a.classList.contains("shaka-hidden")})};q.pc=function(){this.L.Ga()};
q.Ne=function(){var a=this,b;return L(function(c){switch(c.g){case 1:if(document.fullscreenElement)return screen.orientation&&screen.orientation.unlock(),z(c,document.exitFullscreen(),0);E(c,4);if(!document.pictureInPictureElement){c.D(6);break}return z(c,document.exitPictureInPicture(),6);case 6:return z(c,a.j.requestFullscreen({navigationUI:"hide"}),8);case 8:if(!a.m.forceLandscapeOnFullscreen||!screen.orientation){c.D(9);break}E(c,10);return z(c,screen.orientation.lock("landscape"),12);case 12:wa(c,
9,4);break;case 10:H(c,4);case 9:wa(c,0);break;case 4:b=H(c),a.dispatchEvent(new O("error",(new Map).set("detail",b))),c.D(0)}})};q.Gf=function(){X(this.P,!0);X(this.$,!0);this.i.setAttribute("ad-active","true")};q.mf=function(){X(this.P,!1);X(this.$,!1);this.i.removeAttribute("ad-active")};function sx(a){a.ha&&a.g.duration&&(a.G.Ue(),a.g.paused&&!a.ka?a.g.play():a.g.pause())}function rx(a){a.l&&a.l.isPaused()?a.l.play():a.l&&a.l.pause()}
function Ox(a){a.i=S("div");a.i.classList.add("shaka-controls-container");a.j.appendChild(a.i);a.j.setAttribute("shaka-controls","true");a.h.o(a.i,"touchstart",function(b){a.g.duration&&(a.Ub()?a.M=Date.now():(Vx(a,b),b.preventDefault()))},{passive:!1});a.h.o(a.i,"click",function(){Wx(a)});a.h.o(a.i,"dblclick",function(){a.m.doubleClickForFullscreen&&document.fullscreenEnabled&&a.Ne()})}
function Rx(a){var b=S("div");b.classList.add("shaka-play-button-container");a.i.appendChild(b);a.Eb=new tx(b,a);a.J.push(a.Eb)}function Qx(a){var b=S("div");b.classList.add("shaka-scrim-container");a.i.appendChild(b)}function Xx(a){a.P=S("div");a.P.classList.add("shaka-ad-controls");var b=null!=a.l&&a.l.isLinear();X(a.P,b);a.S.appendChild(a.P);b=new ox(a.P,a);a.J.push(b);b=new nx(a.P,a);a.J.push(b)}
function Sx(a){a.Aa=S("div");a.Aa.classList.add("shaka-spinner-container");a.j.appendChild(a.Aa);var b=S("div");b.classList.add("shaka-spinner");a.Aa.appendChild(b);a=document.createElementNS("http://www.w3.org/2000/svg","svg");a.classList.add("shaka-spinner-svg");a.setAttribute("viewBox","0 0 30 30");b.appendChild(a);b=document.createElementNS("http://www.w3.org/2000/svg","circle");b.classList.add("shaka-spinner-path");b.setAttribute("cx","15");b.setAttribute("cy","15");b.setAttribute("r","14.5");
b.setAttribute("fill","none");b.setAttribute("stroke-width","1");b.setAttribute("stroke-miterlimit","10");a.appendChild(b)}
function Tx(a){a.S=S("div");a.S.classList.add("shaka-bottom-controls");a.S.classList.add("shaka-no-propagation");a.i.appendChild(a.S);a.h.o(a.S,"click",function(e){e.target.closest(".shaka-overflow-button")||a.pc()});Xx(a);a.ia=S("div");a.ia.classList.add("shaka-controls-button-panel");a.ia.classList.add("shaka-show-controls-on-mouse-over");a.m.enableTooltips&&a.ia.classList.add("shaka-tooltips-on");a.S.appendChild(a.ia);for(var b={},c=r(a.m.controlPanelElements),d=c.next();!d.done;b={Bc:b.Bc},d=
c.next())d=d.value,Nx.get(d)?(d=Nx.get(d).create(a.ia,a),"function"!=typeof d.release&&(Fb("shaka.extern.IUIElement","Please update UI elements to have a release() method."),b.Bc=d,b.Bc.release=function(e){return function(){e.Bc.destroy&&e.Bc.destroy()}}(b)),a.J.push(d)):Ta("Unrecognized control panel element requested:",d)}function Ux(a){if(a.m.addSeekBar)a.s=Yx.create(a.S,a),a.J.push(a.s);else{a=r(a.I);for(var b=a.next();!b.done;b=a.next())b.value.classList.add("shaka-low-position")}}
function Px(a){a.$=S("div");a.$.classList.add("shaka-client-side-ad-container");X(a.$,!1);a.h.o(a.$,"click",function(){Wx(a)});a.j.appendChild(a.$)}
function Jx(a){a.h.o(a.G,"buffering",function(){a.ha&&X(a.Aa,a.G.Rc())});a.ha&&X(a.Aa,a.G.Rc());a.h.o(window,"keydown",function(b){Zx(a,b)});a.h.o(window,"click",function(){return a.pc()});a.h.o(a,"submenuopen",function(){a.pc()});a.h.o(a.g,"play",function(){Gx(a)});a.h.o(a.g,"pause",function(){Gx(a)});a.h.o(a.j,"mousemove",function(b){Vx(a,b)});a.h.o(a.j,"touchmove",function(b){Vx(a,b)},{passive:!0});a.h.o(a.j,"touchend",function(b){Vx(a,b)},{passive:!0});a.h.o(a.j,"mouseleave",function(){a.M||a.sa.Ga()});
a.h.o(a.B,"caststatuschanged",function(){Kx(a)});a.h.o(a.j,"keydown",function(b){var c=document.activeElement,d=c&&c.classList?c.classList.contains("shaka-volume-bar"):!1,e=c&&c.classList&&c.classList.contains("shaka-seek-bar");a.i.contains(c)&&Vx(a,b);if(a.m.enableKeyboardPlaybackControls)switch(b.key){case "ArrowLeft":a.s&&!d&&(b.preventDefault(),$x(a,a.s.getValue()-5));break;case "ArrowRight":a.s&&!d&&(b.preventDefault(),$x(a,a.s.getValue()+5));break;case "Home":a.s&&$x(a,a.G.Na().start);break;
case "End":a.s&&$x(a,a.G.Na().end);break;case " ":e&&ay(a)}});a.h.o(a.j,"keyup",function(b){a.Ca["delete"](b.key)});a.h.o(a.ob,"ad-started",function(b){a.l=b.ad;a.Gf()});a.h.o(a.ob,"ad-stopped",function(){a.l=null;a.mf()});screen.orientation&&a.h.o(screen.orientation,"change",function(){return L(function(b){return z(b,by(a),0)})});a.h.o(document,"fullscreenchange",function(){a.l&&a.l.resize(a.C.offsetWidth,a.C.offsetHeight)})}
function by(a){return L(function(b){return a.g&&0!=a.g.readyState&&!a.B.xa()&&a.m.enableFullscreenOnRotation?screen.orientation.type.includes("landscape")&&!document.fullscreenElement?z(b,a.j.requestFullscreen({navigationUI:"hide"}),0):screen.orientation.type.includes("portrait")&&document.fullscreenElement?z(b,document.exitFullscreen(),0):b.D(0):b["return"]()})}
function Vx(a,b){"mousemove"==b.type&&(a.i.classList.remove("shaka-keyboard-navigation"),Gx(a));"touchstart"==b.type||"touchmove"==b.type||"touchend"==b.type||"keyup"==b.type?a.M=Date.now():a.M+1E3<Date.now()&&(a.M=null);a.M&&"mousemove"==b.type||(a.j.style.cursor="",a.Gb=!0,a.L.stop(),a.Ub()||(Hx(a),Gx(a)),a.sa.stop(),"touchend"!=b.type&&"keyup"!=b.type&&a.M||a.sa.U(3))}function cy(a){return window.matchMedia("hover: hover").matches?a.nc.some(function(b){return b.matches(":hover")}):!1}
function Gx(a){var b=a.l?a.l.isPaused():!1,c=a.g.paused&&!a.ka,d=a.i.classList.contains("shaka-keyboard-navigation");b||(!a.l||!a.l.isLinear())&&c||a.Gb||d||cy(a)?(Hx(a),a.i.setAttribute("shown","true"),a.Ba.stop()):a.Ba.U(a.m.fadeDelay)}function Wx(a){a.ha&&(a.jd()?a.L.Ga():a.m.singleClickForPlayAndPause&&ay(a))}function ay(a){a.l&&a.l.isLinear()?rx(a):sx(a)}
function Kx(a){var b=a.B.xa();a.dispatchEvent(new O("caststatuschanged",(new Map).set("newStatus",b)));b?a.i.setAttribute("casting","true"):a.i.removeAttribute("casting")}q.Ub=function(){return this.ha?null!=this.i.getAttribute("shown")||null!=this.i.getAttribute("casting"):!1};function $x(a,b){a.s.changeTo(b);a.Ub()&&Hx(a)}
function Hx(a){if(a.s)if(a.s.setValue(a.g.currentTime),a.s.update(),a.s.isShowing())for(var b=r(a.I),c=b.next();!c.done;c=b.next())c.value.classList.remove("shaka-low-position");else for(b=r(a.I),c=b.next();!c.done;c=b.next())c.value.classList.add("shaka-low-position");a.dispatchEvent(new O("timeandseekrangeupdated"))}
function Zx(a,b){a.Ca.add(b.key);var c=a.jd();"Tab"==b.key&&(a.i.classList.add("shaka-keyboard-navigation"),Gx(a),a.h.o(window,"mousedown",function(){a.h.Ta(window,"mousedown")}));"Escape"==b.key&&a.L.Ga();c&&a.Ca.has("Tab")&&dy(a,b)}
function dy(a,b){var c=a.I.filter(function(f){return!f.classList.contains("shaka-hidden")});if(c.length){var d=c[0];if(d.childNodes.length){for(c=d.firstElementChild;c&&c.classList.contains("shaka-hidden");)c=c.nextElementSibling;for(d=d.lastElementChild;d&&d.classList.contains("shaka-hidden");)d=d.previousElementSibling;var e=document.activeElement;a.Ca.has("Shift")?e==c&&(b.preventDefault(),d.focus()):e==d&&(b.preventDefault(),c.focus())}}}
function Ix(){var a=new ec("en");a.ma("ar",new Map([["AD_DURATION","\u0645\u062f\u0629 \u0627\u0644\u0625\u0639\u0644\u0627\u0646"],["AD_PROGRESS","\u0627\u0644\u0625\u0639\u0644\u0627\u0646 [AD_ON] \u0645\u0646 [NUM_ADS]"],["AD_TIME","\u0627\u0644\u0625\u0639\u0644\u0627\u0646: [AD_TIME]"],["AUTO_QUALITY","\u062a\u0644\u0642\u0627\u0626\u064a"],["BACK","\u0631\u062c\u0648\u0639"],["CAPTIONS","\u0627\u0644\u062a\u0631\u062c\u0645\u0629 \u0648\u0627\u0644\u0634\u0631\u062d"],["CAST","\u0625\u0631\u0633\u0627\u0644..."],
["ENTER_LOOP_MODE","\u062a\u0643\u0631\u0627\u0631 \u0627\u0644\u0641\u064a\u062f\u064a\u0648 \u0627\u0644\u062d\u0627\u0644\u064a"],["ENTER_PICTURE_IN_PICTURE",'\u0627\u0644\u062f\u062e\u0648\u0644 \u0641\u064a \u0648\u0636\u0639 "\u0646\u0627\u0641\u0630\u0629 \u0636\u0645\u0646 \u0646\u0627\u0641\u0630\u0629"'],["EXIT_FULL_SCREEN","\u0625\u0646\u0647\u0627\u0621 \u0648\u0636\u0639 \u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629"],["EXIT_LOOP_MODE","\u0625\u064a\u0642\u0627\u0641 \u062a\u0643\u0631\u0627\u0631 \u0627\u0644\u0641\u064a\u062f\u064a\u0648 \u0627\u0644\u062d\u0627\u0644\u064a"],
["EXIT_PICTURE_IN_PICTURE",'\u0627\u0644\u062e\u0631\u0648\u062c \u0645\u0646 \u0648\u0636\u0639 "\u0646\u0627\u0641\u0630\u0629 \u0636\u0645\u0646 \u0646\u0627\u0641\u0630\u0629"'],["FAST_FORWARD","\u062a\u0642\u062f\u064a\u0645 \u0633\u0631\u064a\u0639"],["FULL_SCREEN","\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629"],["LANGUAGE","\u0627\u0644\u0644\u063a\u0629"],["LIVE","\u0645\u0628\u0627\u0634\u0631"],["LOOP","\u062a\u0643\u0631\u0627\u0631"],["MORE_SETTINGS","\u0645\u0632\u064a\u062f \u0645\u0646 \u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a"],
["MULTIPLE_LANGUAGES","\u0644\u063a\u0627\u062a \u0645\u062a\u0639\u062f\u062f\u0629"],["MUTE","\u0643\u062a\u0645 \u0627\u0644\u0635\u0648\u062a"],["NOT_APPLICABLE","\u063a\u064a\u0631 \u0633\u0627\u0631\u064d"],["OFF","\u0625\u064a\u0642\u0627\u0641"],["ON","\u062a\u0634\u063a\u064a\u0644"],["PAUSE","\u0625\u064a\u0642\u0627\u0641 \u0645\u0624\u0642\u062a"],["PICTURE_IN_PICTURE","\u0646\u0627\u0641\u0630\u0629 \u0636\u0645\u0646 \u0627\u0644\u0646\u0627\u0641\u0630\u0629"],["PLAY","\u0627\u0644\u062a\u0634\u063a\u064a\u0644"],
["PLAYBACK_RATE","\u0633\u0631\u0639\u0629 \u0627\u0644\u062a\u0634\u063a\u064a\u0644"],["RESOLUTION","\u062f\u0631\u062c\u0629 \u0627\u0644\u062f\u0642\u0629"],["REWIND","\u062a\u0631\u062c\u064a\u0639"],["SEEK","\u0627\u0644\u0628\u062d\u062b \u0628\u0627\u0644\u062a\u0645\u0631\u064a\u0631"],["SKIP_AD","\u062a\u062e\u0637\u0651\u064a \u0627\u0644\u0625\u0639\u0644\u0627\u0646"],["SKIP_TO_LIVE","\u0627\u0644\u0627\u0646\u062a\u0642\u0627\u0644 \u0625\u0644\u0649 \u0628\u062b \u0645\u0628\u0627\u0634\u0631"],
["UNDETERMINED_LANGUAGE","\u063a\u064a\u0631 \u0645\u062d\u062f\u062f"],["UNMUTE","\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0635\u0648\u062a"],["UNRECOGNIZED_LANGUAGE","\u063a\u064a\u0631 \u0645\u0639\u0631\u0648\u0641"],["VOLUME","\u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0635\u0648\u062a"]]));a.ma("de",new Map([["AD_DURATION","Dauer der Werbeanzeige"],["AD_PROGRESS","Werbung\u00a0[AD_ON] von\u00a0[NUM_ADS]"],["AD_TIME","Werbeanzeige: [AD_TIME]"],["AUTO_QUALITY","Automatisch"],["BACK","Zur\u00fcck"],
["CAPTIONS","Untertitel"],["CAST","Streamen..."],["ENTER_LOOP_MODE","In Endlosschleife spielen"],["ENTER_PICTURE_IN_PICTURE","Bild-im-Bild-Modus aktivieren"],["EXIT_FULL_SCREEN","Vollbildmodus beenden"],["EXIT_LOOP_MODE","Endlosschleife stoppen"],["EXIT_PICTURE_IN_PICTURE","Bild-im-Bild-Modus beenden"],["FAST_FORWARD","Vorspulen"],["FULL_SCREEN","Vollbildmodus"],["LANGUAGE","Sprache"],["LIVE","Live"],["LOOP","Schleife"],["MORE_SETTINGS","Weitere Einstellungen"],["MULTIPLE_LANGUAGES","Mehrere Sprachen"],
["MUTE","Stummschalten"],["NOT_APPLICABLE","Nicht zutreffend"],["OFF","Aus"],["ON","Ein"],["PAUSE","Pause"],["PICTURE_IN_PICTURE","Bild im Bild"],["PLAY","Wiedergabe"],["PLAYBACK_RATE","Geschwindigkeit"],["RESOLUTION","Aufl\u00f6sung"],["REWIND","Zur\u00fcckspulen"],["SEEK","Suche"],["SKIP_AD","\u00dcberspringen"],["SKIP_TO_LIVE","Zum Live-Videostream wechseln"],["UNDETERMINED_LANGUAGE","Unbestimmt"],["UNMUTE","Stummschaltung aufheben"],["UNRECOGNIZED_LANGUAGE","Unbekannt"],["VOLUME","Lautst\u00e4rke"]]));
a.ma("en",new Map([["AD_DURATION","Ad duration"],["AD_PROGRESS","Ad [AD_ON] of [NUM_ADS]"],["AD_TIME","Ad: [AD_TIME]"],["AIRPLAY","AirPlay"],["AUTO_QUALITY","Auto"],["BACK","Back"],["CAPTIONS","Captions"],["CAST","Cast..."],["ENTER_LOOP_MODE","Loop the current video"],["ENTER_PICTURE_IN_PICTURE","Enter Picture-in-Picture"],["EXIT_FULL_SCREEN","Exit full screen"],["EXIT_LOOP_MODE","Stop looping the current video"],["EXIT_PICTURE_IN_PICTURE","Exit Picture-in-Picture"],["FAST_FORWARD","Fast-forward"],
["FULL_SCREEN","Full screen"],["LANGUAGE","Language"],["LIVE","Live"],["LOOP","Loop"],["MORE_SETTINGS","More settings"],["MULTIPLE_LANGUAGES","Multiple languages"],["MUTE","Mute"],["NOT_APPLICABLE","Not applicable"],["OFF","Off"],["ON","On"],["PAUSE","Pause"],["PICTURE_IN_PICTURE","Picture-in-Picture"],["PLAY","Play"],["PLAYBACK_RATE","Playback speed"],["REPLAY","Replay"],["RESOLUTION","Resolution"],["REWIND","Rewind"],["SEEK","Seek"],["SKIP_AD","Skip Ad"],["SKIP_TO_LIVE","Skip ahead to live"],["STATISTICS",
"Statistics"],["SUBTITLE_FORCED","Forced"],["UNDETERMINED_LANGUAGE","Undetermined"],["UNMUTE","Unmute"],["UNRECOGNIZED_LANGUAGE","Unrecognized"],["VOLUME","Volume"]]));a.ma("en-GB",new Map([["AD_DURATION","Ad duration"],["AD_PROGRESS","Ad [AD_ON] of [NUM_ADS]"],["AD_TIME","Ad: [AD_TIME]"],["AUTO_QUALITY","Auto"],["BACK","Back"],["CAPTIONS","Captions"],["CAST","Cast..."],["ENTER_LOOP_MODE","Loop the current video"],["ENTER_PICTURE_IN_PICTURE","Enter picture-in-picture"],["EXIT_FULL_SCREEN","Exit full screen"],
["EXIT_LOOP_MODE","Stop looping the current video"],["EXIT_PICTURE_IN_PICTURE","Exit picture-in-picture"],["FAST_FORWARD","Fast-forward"],["FULL_SCREEN","Full screen"],["LANGUAGE","Language"],["LIVE","Live"],["LOOP","Loop"],["MORE_SETTINGS","More settings"],["MULTIPLE_LANGUAGES","Multiple languages"],["MUTE","Mute"],["NOT_APPLICABLE","Not applicable"],["OFF","Off"],["ON","On"],["PAUSE","Pause"],["PICTURE_IN_PICTURE","Picture-in-picture"],["PLAY","Play"],["PLAYBACK_RATE","Playback speed"],["RESOLUTION",
"Resolution"],["REWIND","Rewind"],["SEEK","Seek"],["SKIP_AD","Skip ad"],["SKIP_TO_LIVE","Skip ahead to live"],["UNDETERMINED_LANGUAGE","Undetermined"],["UNMUTE","Unmute"],["UNRECOGNIZED_LANGUAGE","Unrecognised"],["VOLUME","volume"]]));a.ma("es",new Map([["AD_DURATION","Duraci\u00f3n del anuncio"],["AD_PROGRESS","Anuncio [AD_ON] de [NUM_ADS]"],["AD_TIME","Anuncio: [AD_TIME]"],["AUTO_QUALITY","Autom\u00e1tico"],["BACK","Atr\u00e1s"],["CAPTIONS","Subt\u00edtulos"],["CAST","Enviar..."],["ENTER_LOOP_MODE",
"Reproducir en bucle el v\u00eddeo actual"],["ENTER_PICTURE_IN_PICTURE","Activar el modo imagen en imagen"],["EXIT_FULL_SCREEN","Salir del modo de pantalla completa"],["EXIT_LOOP_MODE","Dejar de reproducir en bucle el v\u00eddeo actual"],["EXIT_PICTURE_IN_PICTURE","Salir del modo imagen en imagen"],["FAST_FORWARD","Avanzar r\u00e1pidamente"],["FULL_SCREEN","Pantalla completa"],["LANGUAGE","Idioma"],["LIVE","En directo"],["LOOP","Reproducir en bucle"],["MORE_SETTINGS","M\u00e1s ajustes"],["MULTIPLE_LANGUAGES",
"Varios idiomas"],["MUTE","Silenciar"],["NOT_APPLICABLE","No aplicable"],["OFF","Desactivado"],["ON","Activado"],["PAUSE","Pausar"],["PICTURE_IN_PICTURE","Imagen en imagen"],["PLAY","Reproducir"],["PLAYBACK_RATE","Velocidad de reproducci\u00f3n"],["RESOLUTION","Resoluci\u00f3n"],["REWIND","Rebobinar"],["SEEK","Buscar"],["SKIP_AD","Saltar anuncio"],["SKIP_TO_LIVE","Ir al v\u00eddeo en directo"],["SUBTITLE_FORCED","Forzado"],["UNDETERMINED_LANGUAGE","Sin especificar"],["UNMUTE","Activar sonido"],["UNRECOGNIZED_LANGUAGE",
"No reconocida"],["VOLUME","Volumen"]]));a.ma("es-419",new Map([["AD_DURATION","Duraci\u00f3n del anuncio"],["AD_PROGRESS","Anuncio [AD_ON] de [NUM_ADS]"],["AD_TIME","Anuncio: [AD_TIME]"],["AUTO_QUALITY","Autom\u00e1tico"],["BACK","Atr\u00e1s"],["CAPTIONS","Subt\u00edtulos"],["CAST","Transmitir..."],["ENTER_LOOP_MODE","Repetir indefinidamente el video actual"],["ENTER_PICTURE_IN_PICTURE","Ingresar al modo de pantalla en pantalla"],["EXIT_FULL_SCREEN","Salir de pantalla completa"],["EXIT_LOOP_MODE",
"Detener la repetici\u00f3n indefinida del video actual"],["EXIT_PICTURE_IN_PICTURE","Salir del modo de pantalla en pantalla"],["FAST_FORWARD","Avanzar"],["FULL_SCREEN","Pantalla completa"],["LANGUAGE","Idioma"],["LIVE","En directo"],["LOOP","Repetir indefinidamente"],["MORE_SETTINGS","M\u00e1s opciones de configuraci\u00f3n"],["MULTIPLE_LANGUAGES","Varios idiomas"],["MUTE","Silenciar"],["NOT_APPLICABLE","No aplicable"],["OFF","Desactivado"],["ON","Activado"],["PAUSE","Detener"],["PICTURE_IN_PICTURE",
"Pantalla en pantalla"],["PLAY","Reproducir"],["PLAYBACK_RATE","Velocidad de reproducci\u00f3n"],["RESOLUTION","Resoluci\u00f3n"],["REWIND","Retroceder"],["SEEK","Buscar"],["SKIP_AD","Omitir anuncio"],["SKIP_TO_LIVE","Adelantar hasta la transmisi\u00f3n en vivo"],["SUBTITLE_FORCED","Forzado"],["UNDETERMINED_LANGUAGE","Sin especificar"],["UNMUTE","Dejar de silenciar"],["UNRECOGNIZED_LANGUAGE","No reconocida"],["VOLUME","Volumen"]]));a.ma("fr",new Map([["AD_DURATION","Dur\u00e9e de l'annonce"],["AD_PROGRESS",
"Annonce\u00a0[AD_ON] sur\u00a0[NUM_ADS]"],["AD_TIME","Annonce\u00a0: [AD_TIME]"],["AUTO_QUALITY","Automatique"],["BACK","Retour"],["CAPTIONS","Sous-titres"],["CAST","Caster\u2026"],["ENTER_LOOP_MODE","Lire en boucle la vid\u00e9o en cours"],["ENTER_PICTURE_IN_PICTURE","Utiliser le mode Picture-in-Picture"],["EXIT_FULL_SCREEN","Quitter le mode plein \u00e9cran"],["EXIT_LOOP_MODE","Arr\u00eater la lecture en boucle de la vid\u00e9o en cours"],["EXIT_PICTURE_IN_PICTURE","Quitter le mode\u00a0PIP (Picture-in-picture)"],
["FAST_FORWARD","Avance rapide"],["FULL_SCREEN","Plein \u00e9cran"],["LANGUAGE","Langue"],["LIVE","En direct"],["LOOP","R\u00e9p\u00e9ter"],["MORE_SETTINGS","Plus de param\u00e8tres"],["MULTIPLE_LANGUAGES","Plusieurs langues"],["MUTE","Couper le son"],["NOT_APPLICABLE","Non applicable"],["OFF","D\u00e9sactiv\u00e9e"],["ON","Activ\u00e9e"],["PAUSE","Pause"],["PICTURE_IN_PICTURE","Picture-in-Picture"],["PLAY","Visionner"],["PLAYBACK_RATE","Vitesse de lecture"],["RESOLUTION","R\u00e9solution"],["REWIND",
"Retour arri\u00e8re"],["SEEK","Chercher"],["SKIP_AD","Passer l'annonce"],["SKIP_TO_LIVE","Acc\u00e9der \u00e0 la partie la plus r\u00e9cente du direct"],["UNDETERMINED_LANGUAGE","Langue ind\u00e9termin\u00e9e"],["UNMUTE","R\u00e9activer le son"],["UNRECOGNIZED_LANGUAGE","Non reconnu"],["VOLUME","Volume"]]));a.ma("it",new Map([["AD_DURATION","Durata dell'annuncio"],["AD_PROGRESS","Annuncio [AD_ON] di [NUM_ADS]"],["AD_TIME","Annuncio: [AD_TIME]"],["AUTO_QUALITY","Automatica"],["BACK","Indietro"],["CAPTIONS",
"Sottotitoli"],["CAST","Trasmetti..."],["ENTER_LOOP_MODE","Riproduci in loop il video corrente"],["ENTER_PICTURE_IN_PICTURE","Attiva Picture in picture"],["EXIT_FULL_SCREEN","Esci da schermo intero"],["EXIT_LOOP_MODE","Interrompi riproduzione in loop del video corrente"],["EXIT_PICTURE_IN_PICTURE","Esci da Picture in picture"],["FAST_FORWARD","Avanti veloce"],["FULL_SCREEN","Schermo intero"],["LANGUAGE","Lingua"],["LIVE","Dal vivo"],["LOOP","Riproduci in loop"],["MORE_SETTINGS","Altre impostazioni"],
["MULTIPLE_LANGUAGES","Pi\u00f9 lingue"],["MUTE","Disattiva audio"],["NOT_APPLICABLE","Non applicabile"],["OFF","Disattivo"],["ON","Attivo"],["PAUSE","Metti in pausa"],["PICTURE_IN_PICTURE","Picture in picture"],["PLAY","Riproduci"],["PLAYBACK_RATE","Velocit\u00e0 di riproduzione"],["RESOLUTION","Risoluzione"],["REWIND","Riavvolgi"],["SEEK","Cerca"],["SKIP_AD","Salta annuncio"],["SKIP_TO_LIVE","Passa alla trasmissione dal vivo"],["UNDETERMINED_LANGUAGE","Indeterminata"],["UNMUTE","Riattiva audio"],
["UNRECOGNIZED_LANGUAGE","Non riconosciuto"],["VOLUME","Volume"]]));a.ma("ja",new Map([["AD_DURATION","\u5e83\u544a\u518d\u751f\u6642\u9593"],["AD_PROGRESS","[AD_ON] \u756a\u76ee\u306e\u5e83\u544a\uff08\u5168 [NUM_ADS] \u500b\uff09"],["AD_TIME","\u5e83\u544a: [AD_TIME]"],["AUTO_QUALITY","\u81ea\u52d5"],["BACK","\u623b\u308b"],["CAPTIONS","\u5b57\u5e55"],["CAST","\u30ad\u30e3\u30b9\u30c8..."],["ENTER_LOOP_MODE","\u73fe\u5728\u306e\u52d5\u753b\u3092\u30eb\u30fc\u30d7\u518d\u751f"],["ENTER_PICTURE_IN_PICTURE",
"\u30d4\u30af\u30c1\u30e3\u30fc \u30a4\u30f3 \u30d4\u30af\u30c1\u30e3\u30fc\u3092\u958b\u59cb"],["EXIT_FULL_SCREEN","\u5168\u753b\u9762\u8868\u793a\u3092\u7d42\u4e86"],["EXIT_LOOP_MODE","\u73fe\u5728\u306e\u52d5\u753b\u306e\u30eb\u30fc\u30d7\u518d\u751f\u3092\u505c\u6b62"],["EXIT_PICTURE_IN_PICTURE","\u30d4\u30af\u30c1\u30e3\u30fc \u30a4\u30f3 \u30d4\u30af\u30c1\u30e3\u30fc\u3092\u7d42\u4e86"],["FAST_FORWARD","\u65e9\u9001\u308a"],["FULL_SCREEN","\u5168\u753b\u9762\u8868\u793a"],["LANGUAGE","\u8a00\u8a9e"],
["LIVE","\u30e9\u30a4\u30d6"],["LOOP","\u30eb\u30fc\u30d7"],["MORE_SETTINGS","\u8a73\u7d30\u8a2d\u5b9a"],["MULTIPLE_LANGUAGES","\u591a\u8a00\u8a9e"],["MUTE","\u30df\u30e5\u30fc\u30c8"],["NOT_APPLICABLE","\u8a72\u5f53\u306a\u3057"],["OFF","\u30aa\u30d5"],["ON","\u30aa\u30f3"],["PAUSE","\u4e00\u6642\u505c\u6b62"],["PICTURE_IN_PICTURE","\u30d4\u30af\u30c1\u30e3\u30fc \u30a4\u30f3 \u30d4\u30af\u30c1\u30e3\u30fc"],["PLAY","\u518d\u751f"],["PLAYBACK_RATE","\u518d\u751f\u901f\u5ea6"],["RESOLUTION","\u89e3\u50cf\u5ea6"],
["REWIND","\u5dfb\u304d\u623b\u3057"],["SEEK","\u30b7\u30fc\u30af\u518d\u751f"],["SKIP_AD","\u5e83\u544a\u3092\u30b9\u30ad\u30c3\u30d7"],["SKIP_TO_LIVE","\u30e9\u30a4\u30d6\u914d\u4fe1\u307e\u3067\u30b9\u30ad\u30c3\u30d7"],["UNDETERMINED_LANGUAGE","\u4e0d\u660e"],["UNMUTE","\u30df\u30e5\u30fc\u30c8\u3092\u89e3\u9664"],["UNRECOGNIZED_LANGUAGE","\u4e0d\u660e"],["VOLUME","\u97f3\u91cf"]]));a.ma("ko",new Map([["AD_DURATION","\uad11\uace0 \uae30\uac04"],["AD_PROGRESS","\uad11\uace0 [AD_ON]/[NUM_ADS]"],
["AD_TIME","\uad11\uace0: [AD_TIME]"],["AUTO_QUALITY","\uc790\ub3d9"],["BACK","\ub4a4\ub85c"],["CAPTIONS","\uc790\ub9c9"],["CAST","\uc804\uc1a1..."],["ENTER_LOOP_MODE","\ud604\uc7ac \ub3d9\uc601\uc0c1 \ubc18\ubcf5 \uc7ac\uc0dd"],["ENTER_PICTURE_IN_PICTURE","PIP \ubaa8\ub4dc \uc2dc\uc791"],["EXIT_FULL_SCREEN","\uc804\uccb4\ud654\uba74 \ub2eb\uae30"],["EXIT_LOOP_MODE","\ud604\uc7ac \ub3d9\uc601\uc0c1 \ubc18\ubcf5 \uc7ac\uc0dd \uc911\uc9c0"],["EXIT_PICTURE_IN_PICTURE","PIP \ubaa8\ub4dc \uc885\ub8cc"],
["FAST_FORWARD","\ube68\ub9ac \uac10\uae30"],["FULL_SCREEN","\uc804\uccb4\ud654\uba74"],["LANGUAGE","\uc5b8\uc5b4"],["LIVE","\uc2e4\uc2dc\uac04"],["LOOP","\ubc18\ubcf5 \uc7ac\uc0dd"],["MORE_SETTINGS","\uc124\uc815 \ub354\ubcf4\uae30"],["MULTIPLE_LANGUAGES","\uc5ec\ub7ec \uc5b8\uc5b4"],["MUTE","\uc74c\uc18c\uac70"],["NOT_APPLICABLE","\ud574\ub2f9 \uc0ac\ud56d \uc5c6\uc74c"],["OFF","\uc0ac\uc6a9 \uc548\ud568"],["ON","\uc0ac\uc6a9"],["PAUSE","\uc77c\uc2dc\uc911\uc9c0"],["PICTURE_IN_PICTURE","PIP \ubaa8\ub4dc"],
["PLAY","\uc7ac\uc0dd"],["PLAYBACK_RATE","\uc7ac\uc0dd \uc18d\ub3c4"],["RESOLUTION","\ud574\uc0c1\ub3c4"],["REWIND","\ub418\uac10\uae30"],["SEEK","\ucc3e\uae30"],["SKIP_AD","\uad11\uace0 \uac74\ub108\ub6f0\uae30"],["SKIP_TO_LIVE","\ub77c\uc774\ube0c \ub3d9\uc601\uc0c1\uc73c\ub85c \uac74\ub108\ub6f0\uae30"],["UNDETERMINED_LANGUAGE","\ubbf8\uc815"],["UNMUTE","\uc74c\uc18c\uac70 \ud574\uc81c"],["UNRECOGNIZED_LANGUAGE","\uc54c \uc218 \uc5c6\uc74c"],["VOLUME","\ubcfc\ub968"]]));a.ma("nl",new Map([["AD_DURATION",
"Advertentieduur"],["AD_PROGRESS","Advertentie [AD_ON] van [NUM_ADS]"],["AD_TIME","Advertentie: [AD_TIME]"],["AUTO_QUALITY","Automatisch"],["BACK","Terug"],["CAPTIONS","Ondertiteling"],["CAST","Casten..."],["ENTER_LOOP_MODE","De huidige video lussen"],["ENTER_PICTURE_IN_PICTURE","Scherm-in-scherm openen"],["EXIT_FULL_SCREEN","Volledig scherm sluiten"],["EXIT_LOOP_MODE","De huidige video niet meer lussen"],["EXIT_PICTURE_IN_PICTURE","Scherm-in-scherm afsluiten"],["FAST_FORWARD","Vooruitspoelen"],["FULL_SCREEN",
"Volledig scherm"],["LANGUAGE","Taal"],["LIVE","Live"],["LOOP","Lussen"],["MORE_SETTINGS","Meer instellingen"],["MULTIPLE_LANGUAGES","Meerdere talen"],["MUTE","Dempen"],["NOT_APPLICABLE","Niet van toepassing"],["OFF","Uit"],["ON","Aan"],["PAUSE","Onderbreken"],["PICTURE_IN_PICTURE","Scherm-in-scherm"],["PLAY","Afspelen"],["PLAYBACK_RATE","Afspeelsnelheid"],["RESOLUTION","Resolutie"],["REWIND","Terugspoelen"],["SEEK","Zoeken"],["SKIP_AD","Advertentie overslaan"],["SKIP_TO_LIVE","Doorgaan naar live"],
["UNDETERMINED_LANGUAGE","Onbepaald"],["UNMUTE","Dempen opheffen"],["UNRECOGNIZED_LANGUAGE","Onbekend"],["VOLUME","Volume"]]));a.ma("pl",new Map([["AD_DURATION","Czas trwania reklamy"],["AD_PROGRESS","Reklama\u00a0[AD_ON] z\u00a0[NUM_ADS]"],["AD_TIME","Reklama: [AD_TIME]"],["AUTO_QUALITY","Automatycznie"],["BACK","Wstecz"],["CAPTIONS","Napisy"],["CAST","Przesy\u0142aj..."],["ENTER_LOOP_MODE","Odtwarzaj bie\u017c\u0105cy film w\u00a0p\u0119tli"],["ENTER_PICTURE_IN_PICTURE","W\u0142\u0105cz tryb obrazu w\u00a0obrazie"],
["EXIT_FULL_SCREEN","Zamknij pe\u0142ny ekran"],["EXIT_LOOP_MODE","Wy\u0142\u0105cz odtwarzanie bie\u017c\u0105cego filmu w\u00a0p\u0119tli"],["EXIT_PICTURE_IN_PICTURE","Wy\u0142\u0105cz tryb obrazu w\u00a0obrazie"],["FAST_FORWARD","Przewi\u0144 do przodu"],["FULL_SCREEN","Pe\u0142ny ekran"],["LANGUAGE","J\u0119zyk"],["LIVE","Na \u017cywo"],["LOOP","Odtwarzaj w\u00a0p\u0119tli"],["MORE_SETTINGS","Wi\u0119cej ustawie\u0144"],["MULTIPLE_LANGUAGES","Wiele j\u0119zyk\u00f3w"],["MUTE","Wycisz"],["NOT_APPLICABLE",
"Nie dotyczy"],["OFF","Wy\u0142\u0105czone"],["ON","W\u0142\u0105czone"],["PAUSE","Wstrzymaj"],["PICTURE_IN_PICTURE","Obraz w\u00a0obrazie"],["PLAY","Odtw\u00f3rz"],["PLAYBACK_RATE","Szybko\u015b\u0107 odtwarzania"],["RESOLUTION","Rozdzielczo\u015b\u0107"],["REWIND","Przewi\u0144 do ty\u0142u"],["SEEK","Szukaj"],["SKIP_AD","Pomi\u0144 reklam\u0119"],["SKIP_TO_LIVE","Przejd\u017a do transmisji na \u017cywo"],["UNDETERMINED_LANGUAGE","Nie okre\u015blono"],["UNMUTE","Wy\u0142\u0105cz wyciszenie"],["UNRECOGNIZED_LANGUAGE",
"Nierozpoznany"],["VOLUME","G\u0142o\u015bno\u015b\u0107"]]));a.ma("pt-BR",new Map([["AD_DURATION","Dura\u00e7\u00e3o do an\u00fancio"],["AD_PROGRESS","An\u00fancio [AD_ON] de [NUM_ADS]"],["AD_TIME","An\u00fancio: [AD_TIME]"],["AUTO_QUALITY","Autom\u00e1tica"],["BACK","Voltar"],["CAPTIONS","Legendas"],["CAST","Transmitir..."],["ENTER_LOOP_MODE","Repetir o v\u00eddeo atual"],["ENTER_PICTURE_IN_PICTURE","Entrar no modo picture-in-picture"],["EXIT_FULL_SCREEN","Sair do modo tela cheia"],["EXIT_LOOP_MODE",
"Parar repeti\u00e7\u00e3o do v\u00eddeo atual"],["EXIT_PICTURE_IN_PICTURE","Sair de picture-in-picture"],["FAST_FORWARD","Avan\u00e7ar"],["FULL_SCREEN","Tela cheia"],["LANGUAGE","Idioma"],["LIVE","Ao vivo"],["LOOP","Repetir"],["MORE_SETTINGS","Mais defini\u00e7\u00f5es"],["MULTIPLE_LANGUAGES","V\u00e1rios idiomas"],["MUTE","Desativar som"],["NOT_APPLICABLE","N\u00e3o relevante"],["OFF","Desativado"],["ON","Ativado"],["PAUSE","Pausar"],["PICTURE_IN_PICTURE","Picture-in-picture"],["PLAY","Reproduzir"],
["PLAYBACK_RATE","Velocidade da reprodu\u00e7\u00e3o"],["RESOLUTION","Resolu\u00e7\u00e3o"],["REWIND","Retroceder"],["SEEK","Procurar"],["SKIP_AD","Pular an\u00fancio"],["SKIP_TO_LIVE","Pular para transmiss\u00e3o ao vivo"],["UNDETERMINED_LANGUAGE","Indeterminado"],["UNMUTE","Ativar som"],["UNRECOGNIZED_LANGUAGE","N\u00e3o reconhecido"],["VOLUME","Volume"]]));a.ma("ru",new Map([["AD_DURATION","\u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u044c \u0440\u0435\u043a\u043b\u0430\u043c\u044b"],
["AD_PROGRESS","\u0420\u0435\u043a\u043b\u0430\u043c\u0430 [AD_ON] \u0438\u0437 [NUM_ADS]"],["AD_TIME","\u0420\u0435\u043a\u043b\u0430\u043c\u0430: [AD_TIME]"],["AUTO_QUALITY","\u0410\u0432\u0442\u043e"],["BACK","\u041d\u0430\u0437\u0430\u0434"],["CAPTIONS","\u0421\u0443\u0431\u0442\u0438\u0442\u0440\u044b"],["CAST","\u0422\u0440\u0430\u043d\u0441\u043b\u0438\u0440\u043e\u0432\u0430\u0442\u044c..."],["ENTER_LOOP_MODE","\u0417\u0430\u0446\u0438\u043a\u043b\u0438\u0442\u044c \u0442\u0435\u043a\u0443\u0449\u0435\u0435 \u0432\u0438\u0434\u0435\u043e"],
["ENTER_PICTURE_IN_PICTURE",'\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u0440\u0435\u0436\u0438\u043c "\u041a\u0430\u0440\u0442\u0438\u043d\u043a\u0430 \u0432 \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0435"'],["EXIT_FULL_SCREEN","\u041e\u0431\u044b\u0447\u043d\u044b\u0439 \u0440\u0435\u0436\u0438\u043c"],["EXIT_LOOP_MODE","\u041e\u0442\u043c\u0435\u043d\u0438\u0442\u044c \u0437\u0430\u0446\u0438\u043a\u043b\u0438\u0432\u0430\u043d\u0438\u0435 \u0442\u0435\u043a\u0443\u0449\u0435\u0433\u043e \u0432\u0438\u0434\u0435\u043e"],
["EXIT_PICTURE_IN_PICTURE",'\u0412\u044b\u0439\u0442\u0438 \u0438\u0437 \u0440\u0435\u0436\u0438\u043c\u0430 "\u041a\u0430\u0440\u0442\u0438\u043d\u043a\u0430 \u0432 \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0435"'],["FAST_FORWARD","\u041f\u0435\u0440\u0435\u043c\u043e\u0442\u043a\u0430 \u0432\u043f\u0435\u0440\u0435\u0434"],["FULL_SCREEN","\u041f\u043e\u043b\u043d\u043e\u044d\u043a\u0440\u0430\u043d\u043d\u044b\u0439 \u0440\u0435\u0436\u0438\u043c"],["LANGUAGE","\u042f\u0437\u044b\u043a"],["LIVE",
"\u041f\u0440\u044f\u043c\u043e\u0439 \u044d\u0444\u0438\u0440"],["LOOP","\u0417\u0430\u0446\u0438\u043a\u043b\u0438\u0442\u044c"],["MORE_SETTINGS","\u0414\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438"],["MULTIPLE_LANGUAGES","\u041d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e \u044f\u0437\u044b\u043a\u043e\u0432"],["MUTE","\u041e\u0442\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0437\u0432\u0443\u043a"],["NOT_APPLICABLE",
"\u041d\u0435\u043f\u0440\u0438\u043c\u0435\u043d\u0438\u043c\u043e"],["OFF","\u0412\u044b\u043a\u043b."],["ON","\u0412\u043a\u043b."],["PAUSE","\u041f\u0430\u0443\u0437\u0430"],["PICTURE_IN_PICTURE","\u041a\u0430\u0440\u0442\u0438\u043d\u043a\u0430 \u0432 \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0435"],["PLAY","\u0412\u043e\u0441\u043f\u0440\u043e\u0438\u0437\u0432\u0435\u0441\u0442\u0438"],["PLAYBACK_RATE","\u0421\u043a\u043e\u0440\u043e\u0441\u0442\u044c \u0432\u043e\u0441\u043f\u0440\u043e\u0438\u0437\u0432\u0435\u0434\u0435\u043d\u0438\u044f"],
["RESOLUTION","\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u0438\u0435"],["REWIND","\u041f\u0435\u0440\u0435\u043c\u043e\u0442\u0430\u0442\u044c \u043d\u0430\u0437\u0430\u0434"],["SEEK","\u041f\u0435\u0440\u0435\u043c\u043e\u0442\u043a\u0430"],["SKIP_AD","\u041f\u0440\u043e\u043f\u0443\u0441\u0442\u0438\u0442\u044c"],["SKIP_TO_LIVE","\u041f\u0440\u043e\u043f\u0443\u0441\u0442\u0438\u0442\u044c \u0438 \u043f\u0435\u0440\u0435\u0439\u0442\u0438 \u043a \u043f\u0440\u044f\u043c\u043e\u0439 \u0442\u0440\u0430\u043d\u0441\u043b\u044f\u0446\u0438\u0438"],
["UNDETERMINED_LANGUAGE","\u041d\u0435 \u0443\u043a\u0430\u0437\u0430\u043d\u043e"],["UNMUTE","\u0412\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0437\u0432\u0443\u043a"],["UNRECOGNIZED_LANGUAGE","\u041d\u0435 \u0440\u0430\u0441\u043f\u043e\u0437\u043d\u0430\u043d\u043e"],["VOLUME","\u0413\u0440\u043e\u043c\u043a\u043e\u0441\u0442\u044c"]]));a.ma("th",new Map([["AD_DURATION","\u0e23\u0e30\u0e22\u0e30\u0e40\u0e27\u0e25\u0e32\u0e42\u0e06\u0e29\u0e13\u0e32"],["AD_PROGRESS","\u0e42\u0e06\u0e29\u0e13\u0e32 [AD_ON] \u0e08\u0e32\u0e01 [NUM_ADS] \u0e23\u0e32\u0e22\u0e01\u0e32\u0e23"],
["AD_TIME","\u0e42\u0e06\u0e29\u0e13\u0e32: [AD_TIME]"],["AUTO_QUALITY","\u0e2d\u0e31\u0e15\u0e42\u0e19\u0e21\u0e31\u0e15\u0e34"],["BACK","\u0e01\u0e25\u0e31\u0e1a"],["CAPTIONS","\u0e04\u0e33\u0e1a\u0e23\u0e23\u0e22\u0e32\u0e22"],["CAST","\u0e41\u0e04\u0e2a\u0e15\u0e4c..."],["ENTER_LOOP_MODE","\u0e27\u0e19\u0e0b\u0e49\u0e33\u0e27\u0e34\u0e14\u0e35\u0e42\u0e2d\u0e1b\u0e31\u0e08\u0e08\u0e38\u0e1a\u0e31\u0e19"],["ENTER_PICTURE_IN_PICTURE","\u0e40\u0e02\u0e49\u0e32\u0e2a\u0e39\u0e48\u0e01\u0e32\u0e23\u0e41\u0e2a\u0e14\u0e07\u0e20\u0e32\u0e1e\u0e0b\u0e49\u0e2d\u0e19\u0e20\u0e32\u0e1e"],
["EXIT_FULL_SCREEN","\u0e2d\u0e2d\u0e01\u0e08\u0e32\u0e01\u0e01\u0e32\u0e23\u0e41\u0e2a\u0e14\u0e07\u0e41\u0e1a\u0e1a\u0e40\u0e15\u0e47\u0e21\u0e2b\u0e19\u0e49\u0e32\u0e08\u0e2d"],["EXIT_LOOP_MODE","\u0e2b\u0e22\u0e38\u0e14\u0e27\u0e19\u0e0b\u0e49\u0e33\u0e27\u0e34\u0e14\u0e35\u0e42\u0e2d\u0e1b\u0e31\u0e08\u0e08\u0e38\u0e1a\u0e31\u0e19"],["EXIT_PICTURE_IN_PICTURE","\u0e2d\u0e2d\u0e01\u0e08\u0e32\u0e01\u0e01\u0e32\u0e23\u0e41\u0e2a\u0e14\u0e07\u0e20\u0e32\u0e1e\u0e0b\u0e49\u0e2d\u0e19\u0e20\u0e32\u0e1e"],
["FAST_FORWARD","\u0e01\u0e23\u0e2d\u0e44\u0e1b\u0e02\u0e49\u0e32\u0e07\u0e2b\u0e19\u0e49\u0e32"],["FULL_SCREEN","\u0e40\u0e15\u0e47\u0e21\u0e2b\u0e19\u0e49\u0e32\u0e08\u0e2d"],["LANGUAGE","\u0e20\u0e32\u0e29\u0e32"],["LIVE","\u0e2a\u0e14"],["LOOP","\u0e25\u0e39\u0e1b"],["MORE_SETTINGS","\u0e01\u0e32\u0e23\u0e15\u0e31\u0e49\u0e07\u0e04\u0e48\u0e32\u0e40\u0e1e\u0e34\u0e48\u0e21\u0e40\u0e15\u0e34\u0e21"],["MULTIPLE_LANGUAGES","\u0e2b\u0e25\u0e32\u0e22\u0e20\u0e32\u0e29\u0e32"],["MUTE","\u0e1b\u0e34\u0e14\u0e40\u0e2a\u0e35\u0e22\u0e07"],
["NOT_APPLICABLE","\u0e44\u0e21\u0e48\u0e40\u0e01\u0e35\u0e48\u0e22\u0e27\u0e02\u0e49\u0e2d\u0e07"],["OFF","\u0e1b\u0e34\u0e14"],["ON","\u0e40\u0e1b\u0e34\u0e14"],["PAUSE","\u0e2b\u0e22\u0e38\u0e14\u0e0a\u0e31\u0e48\u0e27\u0e04\u0e23\u0e32\u0e27"],["PICTURE_IN_PICTURE","\u0e01\u0e32\u0e23\u0e41\u0e2a\u0e14\u0e07\u0e20\u0e32\u0e1e\u0e0b\u0e49\u0e2d\u0e19\u0e20\u0e32\u0e1e"],["PLAY","\u0e40\u0e25\u0e48\u0e19"],["PLAYBACK_RATE","\u0e04\u0e27\u0e32\u0e21\u0e40\u0e23\u0e47\u0e27\u0e43\u0e19\u0e01\u0e32\u0e23\u0e40\u0e25\u0e48\u0e19"],
["RESOLUTION","\u0e04\u0e27\u0e32\u0e21\u0e25\u0e30\u0e40\u0e2d\u0e35\u0e22\u0e14"],["REWIND","\u0e01\u0e23\u0e2d\u0e01\u0e25\u0e31\u0e1a"],["SEEK","\u0e04\u0e49\u0e19\u0e2b\u0e32"],["SKIP_AD","\u0e02\u0e49\u0e32\u0e21\u0e42\u0e06\u0e29\u0e13\u0e32"],["SKIP_TO_LIVE","\u0e02\u0e49\u0e32\u0e21\u0e44\u0e1b\u0e17\u0e35\u0e48\u0e01\u0e32\u0e23\u0e16\u0e48\u0e32\u0e22\u0e17\u0e2d\u0e14\u0e2a\u0e14"],["UNDETERMINED_LANGUAGE","\u0e44\u0e21\u0e48\u0e01\u0e33\u0e2b\u0e19\u0e14"],["UNMUTE","\u0e40\u0e1b\u0e34\u0e14\u0e40\u0e2a\u0e35\u0e22\u0e07"],
["UNRECOGNIZED_LANGUAGE","\u0e17\u0e35\u0e48\u0e44\u0e21\u0e48\u0e23\u0e39\u0e49\u0e08\u0e31\u0e01"],["VOLUME","\u0e23\u0e30\u0e14\u0e31\u0e1a\u0e40\u0e2a\u0e35\u0e22\u0e07"]]));a.ma("tr",new Map([["AD_DURATION","Reklam s\u00fcresi"],["AD_PROGRESS","[AD_ON]/[NUM_ADS] reklam"],["AD_TIME","Reklam: [AD_TIME]"],["AUTO_QUALITY","Otomatik"],["BACK","Geri"],["CAPTIONS","Altyaz\u0131lar"],["CAST","Yay\u0131nla..."],["ENTER_LOOP_MODE","Mevcut videoyu d\u00f6ng\u00fcye al"],["ENTER_PICTURE_IN_PICTURE","Pencere i\u00e7inde Pencere moduna gir"],
["EXIT_FULL_SCREEN","Tam ekrandan \u00e7\u0131k"],["EXIT_LOOP_MODE","Mevcut videonun d\u00f6ng\u00fcs\u00fcn\u00fc durdur"],["EXIT_PICTURE_IN_PICTURE","Pencere \u0130\u00e7inde Pencereden \u00c7\u0131k"],["FAST_FORWARD","\u0130leri sar"],["FULL_SCREEN","Tam ekran"],["LANGUAGE","Dil"],["LIVE","Canl\u0131"],["LOOP","D\u00f6ng\u00fc"],["MORE_SETTINGS","Daha fazla ayar"],["MULTIPLE_LANGUAGES","Birden \u00e7ok dil"],["MUTE","Sesi kapat"],["NOT_APPLICABLE","Ge\u00e7erli de\u011fil"],["OFF","Kapal\u0131"],
["ON","A\u00e7\u0131k"],["PAUSE","Duraklat"],["PICTURE_IN_PICTURE","Pencere \u0130\u00e7inde Pencere"],["PLAY","Oynat"],["PLAYBACK_RATE","\u00c7alma h\u0131z\u0131"],["RESOLUTION","\u00c7\u00f6z\u00fcn\u00fcrl\u00fck"],["REWIND","Geri sar"],["SEEK","Ara"],["SKIP_AD","Reklam\u0131 Atla"],["SKIP_TO_LIVE","Canl\u0131 yay\u0131na atla"],["UNDETERMINED_LANGUAGE","Belirsiz"],["UNMUTE","Sesi a\u00e7"],["UNRECOGNIZED_LANGUAGE","Tan\u0131nmayan"],["VOLUME","Ses"]]));a.ma("zh",new Map([["AD_DURATION","\u5e7f\u544a\u6301\u7eed\u65f6\u95f4"],
["AD_PROGRESS","\u5e7f\u544a [AD_ON]/[NUM_ADS]"],["AD_TIME","\u5e7f\u544a\uff1a[AD_TIME]"],["AUTO_QUALITY","\u81ea\u52a8"],["BACK","\u8fd4\u56de"],["CAPTIONS","\u5b57\u5e55"],["CAST","\u6295\u5c04\u2026"],["ENTER_LOOP_MODE","\u5faa\u73af\u64ad\u653e\u5f53\u524d\u89c6\u9891"],["ENTER_PICTURE_IN_PICTURE","\u8fdb\u5165\u201c\u753b\u4e2d\u753b\u201d\u6a21\u5f0f"],["EXIT_FULL_SCREEN","\u9000\u51fa\u5168\u5c4f\u6a21\u5f0f"],["EXIT_LOOP_MODE","\u505c\u6b62\u5faa\u73af\u64ad\u653e\u5f53\u524d\u89c6\u9891"],
["EXIT_PICTURE_IN_PICTURE","\u9000\u51fa\u201c\u753b\u4e2d\u753b\u201d\u6a21\u5f0f"],["FAST_FORWARD","\u5feb\u8fdb"],["FULL_SCREEN","\u5168\u5c4f"],["LANGUAGE","\u8bed\u8a00"],["LIVE","\u76f4\u64ad"],["LOOP","\u5faa\u73af\u64ad\u653e"],["MORE_SETTINGS","\u66f4\u591a\u8bbe\u7f6e"],["MULTIPLE_LANGUAGES","\u591a\u79cd\u8bed\u8a00"],["MUTE","\u9759\u97f3"],["NOT_APPLICABLE","\u4e0d\u9002\u7528"],["OFF","\u5173\u95ed"],["ON","\u5f00\u542f"],["PAUSE","\u6682\u505c"],["PICTURE_IN_PICTURE","\u753b\u4e2d\u753b"],
["PLAY","\u64ad\u653e"],["PLAYBACK_RATE","\u64ad\u653e\u901f\u5ea6"],["RESOLUTION","\u5206\u8fa8\u7387"],["REWIND","\u5feb\u9000"],["SEEK","\u8fdb\u5ea6"],["SKIP_AD","\u8df3\u8fc7\u5e7f\u544a"],["SKIP_TO_LIVE","\u8df3\u81f3\u5f53\u524d\u76f4\u64ad"],["UNDETERMINED_LANGUAGE","\u672a\u786e\u5b9a"],["UNMUTE","\u53d6\u6d88\u9759\u97f3"],["UNRECOGNIZED_LANGUAGE","\u65e0\u6cd5\u8bc6\u522b"],["VOLUME","\u97f3\u91cf"]]));a.ma("zh-TW",new Map([["AD_DURATION","\u5ee3\u544a\u9577\u5ea6"],["AD_PROGRESS","\u5ee3\u544a [AD_ON]/[NUM_ADS]"],
["AD_TIME","\u5ee3\u544a\uff1a[AD_TIME]"],["AUTO_QUALITY","\u81ea\u52d5"],["BACK","\u8fd4\u56de"],["CAPTIONS","\u5b57\u5e55"],["CAST","\u6295\u653e..."],["ENTER_LOOP_MODE","\u5faa\u74b0\u64ad\u653e\u76ee\u524d\u7684\u5f71\u7247"],["ENTER_PICTURE_IN_PICTURE","\u9032\u5165\u5b50\u6bcd\u756b\u9762"],["EXIT_FULL_SCREEN","\u9000\u51fa\u5168\u87a2\u5e55\u6a21\u5f0f"],["EXIT_LOOP_MODE","\u505c\u6b62\u5faa\u74b0\u64ad\u653e\u76ee\u524d\u7684\u5f71\u7247"],["EXIT_PICTURE_IN_PICTURE","\u96e2\u958b\u5b50\u6bcd\u756b\u9762"],
["FAST_FORWARD","\u5feb\u8f49"],["FULL_SCREEN","\u5168\u87a2\u5e55"],["LANGUAGE","\u8a9e\u8a00"],["LIVE","\u76f4\u64ad"],["LOOP","\u5faa\u74b0\u64ad\u653e"],["MORE_SETTINGS","\u986f\u793a\u66f4\u591a\u8a2d\u5b9a"],["MULTIPLE_LANGUAGES","\u591a\u7a2e\u8a9e\u8a00"],["MUTE","\u975c\u97f3"],["NOT_APPLICABLE","\u4e0d\u9069\u7528"],["OFF","\u95dc\u9589"],["ON","\u958b\u555f"],["PAUSE","\u66ab\u505c"],["PICTURE_IN_PICTURE","\u5b50\u6bcd\u756b\u9762"],["PLAY","\u64ad\u653e"],["PLAYBACK_RATE","\u64ad\u653e\u901f\u5ea6"],
["RESOLUTION","\u89e3\u6790\u5ea6"],["REWIND","\u5012\u8f49"],["SEEK","\u641c\u5c0b"],["SKIP_AD","\u7565\u904e\u5ee3\u544a"],["SKIP_TO_LIVE","\u8df3\u81f3\u5f53\u524d\u76f4\u64ad"],["UNDETERMINED_LANGUAGE","\u4e0d\u660e"],["UNMUTE","\u53d6\u6d88\u975c\u97f3"],["UNRECOGNIZED_LANGUAGE","\u7121\u6cd5\u8fa8\u8b58"],["VOLUME","\u97f3\u91cf"]]));a.We(navigator.languages||[]);return a}N("shaka.ui.Controls",Z);Z.prototype.isOpaque=Z.prototype.Ub;Z.prototype.hideAdUI=Z.prototype.mf;Z.prototype.showAdUI=Z.prototype.Gf;
Z.prototype.toggleFullScreen=Z.prototype.Ne;Z.prototype.hideSettingsMenus=Z.prototype.pc;Z.prototype.anySettingsMenusAreOpen=Z.prototype.jd;Z.prototype.setLastTouchEventTime=Z.prototype.Ef;Z.prototype.getDisplayTime=Z.prototype.jf;Z.prototype.isCastAllowed=Z.prototype.Lg;Z.prototype.setSeeking=Z.prototype.He;Z.prototype.isSeeking=Z.prototype.Ng;Z.prototype.getConfig=Z.prototype.hg;Z.prototype.getClientSideAdContainer=Z.prototype.gg;Z.prototype.getServerSideAdContainer=Z.prototype.Ag;
Z.prototype.getControlsContainer=Z.prototype.jg;Z.prototype.getLocalPlayer=Z.prototype.pg;Z.prototype.getPlayer=Z.prototype.lc;Z.prototype.getLocalVideo=Z.prototype.qg;Z.prototype.getVideo=Z.prototype.Kb;Z.prototype.getVideoContainer=Z.prototype.Ig;Z.prototype.getLocalization=Z.prototype.rg;Z.prototype.getCastProxy=Z.prototype.eg;Z.prototype.getAd=Z.prototype.getAd;Z.prototype.setEnabledNativeControls=Z.prototype.Df;Z.prototype.setEnabledShakaControls=Z.prototype.De;Z.prototype.configure=Z.prototype.configure;
Z.prototype.loadComplete=Z.prototype.Og;Z.prototype.allowCast=Z.prototype.Sf;Z.registerSeekBar=function(a){Yx=a};Z.registerElement=Mx;Z.prototype.destroy=Z.prototype.destroy;var Nx=new Map,Yx=new Fx;function ey(a,b){W.call(this,a,b);var c=this;this.m=this.controls.m;this.j=this.controls.i;this.i=[];this.g=bk();this.g.classList.add("shaka-overflow-menu-button");this.g.classList.add("shaka-no-propagation");this.g.classList.add("material-icons-round");this.g.classList.add("shaka-tooltip");this.g.textContent="more_vert";this.parent.appendChild(this.g);this.h=S("div");this.h.classList.add("shaka-overflow-menu");this.h.classList.add("shaka-no-propagation");this.h.classList.add("shaka-show-controls-on-mouse-over");
this.h.classList.add("shaka-hidden");this.j.appendChild(this.h);fy(this);this.eventManager.o(this.localization,"locale-updated",function(){gy(c)});this.eventManager.o(this.localization,"locale-changed",function(){gy(c)});this.eventManager.o(this.adManager,"ad-started",function(){c.ad&&c.ad.isLinear()&&X(c.g,!1)});this.eventManager.o(this.adManager,"ad-stopped",function(){X(c.g,!0)});this.eventManager.o(this.controls,"submenuopen",function(){X(c.h,!1)});this.eventManager.o(this.h,"touchstart",function(d){c.controls.Ef(Date.now());
d.stopPropagation()});this.eventManager.o(this.g,"click",function(){hy(c)});gy(this);this.ad&&this.ad.isLinear()&&X(this.g,!1)}u(ey,W);ey.prototype.release=function(){this.j=null;for(var a=r(this.i),b=a.next();!b.done;b=a.next())b.value.release();this.i=[];W.prototype.release.call(this)};function iy(a,b){jy.set(a,b)}
function fy(a){for(var b=r(a.m.overflowMenuButtons),c=b.next();!c.done;c=b.next())c=c.value,jy.get(c)?(c=jy.get(c),a.i.push(c.create(a.h,a.controls))):Ta("Unrecognized overflow menu element requested:",c)}function hy(a){if(a.controls.jd())a.controls.pc();else{X(a.h,!0);Gx(a.controls);var b=function(c){return 0==c.classList.contains("shaka-hidden")};hb(a.h.childNodes,b)&&jb(a.h.childNodes,b)[0].focus()}}function gy(a){a.g.ariaLabel=a.localization.resolve("MORE_SETTINGS")}
N("shaka.ui.OverflowMenu",ey);ey.registerElement=iy;function ky(){}ky.prototype.create=function(a,b){return new ey(a,b)};Mx("overflow_menu",new ky);var jy=new Map;function ly(a,b){W.call(this,a,b);var c=this;this.g=bk();this.g.classList.add("shaka-airplay-button");this.g.classList.add("shaka-tooltip");this.g.ariaPressed="false";this.h=S("i");this.h.classList.add("material-icons-round");this.h.textContent="airplay";this.g.appendChild(this.h);window.WebKitPlaybackTargetAvailabilityEvent||this.g.classList.add("shaka-hidden");var d=S("label");d.classList.add("shaka-overflow-button-label");d.classList.add("shaka-overflow-menu-only");this.j=S("span");d.appendChild(this.j);
this.i=S("span");this.i.classList.add("shaka-current-selection-span");d.appendChild(this.i);this.g.appendChild(d);this.parent.appendChild(this.g);my(this);ny(this);this.eventManager.o(this.localization,"locale-updated",function(){my(c)});this.eventManager.o(this.localization,"locale-changed",function(){my(c)});this.eventManager.o(this.g,"click",function(){c.controls.Kb().webkitShowPlaybackTargetPicker()});d=this.controls.Kb();this.eventManager.o(d,"webkitplaybacktargetavailabilitychanged",function(e){var f=
c.player.kf()==dm;X(c.g,"available"==e.availability&&f)});this.eventManager.o(d,"webkitcurrentplaybacktargetiswirelesschanged",function(){ny(c)})}u(ly,W);function ny(a){var b=a.controls.Kb();a.g.ariaPressed=b&&b.webkitCurrentPlaybackTargetIsWireless?"true":"false"}function my(a){a.g.ariaLabel=a.localization.resolve("AIRPLAY");a.j.textContent=a.localization.resolve("AIRPLAY")}N("shaka.ui.AirPlayButton",ly);function oy(){}oy.prototype.create=function(a,b){return new ly(a,b)};iy("airplay",new oy);
Mx("airplay",new oy);function py(a,b,c){this.h=a;this.m=qy(this);b.dataset.shakaPlayerContainer="";b.ui=this;this.$d()&&b.classList.add("shaka-mobile");this.g=new Z(a,b,c,this.m);this.configure({});c.controls||a.Ke(b);b.ui=this;c.ui=this}q=py.prototype;q.destroy=function(){var a=this;return L(function(b){if(1==b.g)return a.g?z(b,a.g.destroy(),2):b.D(2);if(4!=b.g)return a.g=null,a.h?z(b,a.h.destroy(),4):b.D(4);a.h=null;A(b)})};q.$d=function(){return/(?:iPhone|iPad|iPod|Android)/.test(navigator.userAgent)?!0:Kd()&&1<navigator.maxTouchPoints};
q.getConfiguration=function(){var a=qy(this);Hk(a,this.m,qy(this),{},"");return a};q.configure=function(a,b){2==arguments.length&&"string"==typeof a&&(a=Ik(a,b));Hk(this.m,a,qy(this),{},"");this.m.castReceiverAppId&&!this.m.overflowMenuButtons.includes("cast")&&this.m.overflowMenuButtons.push("cast");this.g.configure(this.m);this.g.dispatchEvent(new O("uiupdated"))};q.ig=function(){return this.g};q.oh=function(a){this.g.De(a)};
function qy(a){var b={controlPanelElements:"play_pause time_and_duration spacer mute volume fullscreen overflow_menu".split(" "),overflowMenuButtons:"captions quality language picture_in_picture cast playback_rate".split(" "),statisticsList:"width height corruptedFrames decodedFrames droppedFrames drmTimeSeconds licenseTime liveLatency loadLatency bufferingTime manifestTimeSeconds estimatedBandwidth streamBandwidth maxSegmentDuration pauseTime playTime completionPercent".split(" "),contextMenuElements:["loop",
"picture_in_picture","statistics"],playbackRates:[.5,.75,1,1.25,1.5,1.75,2],fastForwardRates:[2,4,8,1],rewindRates:[-1,-2,-4,-8],addSeekBar:!0,addBigPlayButton:!1,customContextMenu:!1,castReceiverAppId:"",clearBufferOnQualityChange:!0,showUnbufferedStart:!1,seekBarColors:{base:"rgba(255, 255, 255, 0.3)",buffered:"rgba(255, 255, 255, 0.54)",played:"rgb(255, 255, 255)",adBreaks:"rgb(255, 204, 0)"},volumeBarColors:{base:"rgba(255, 255, 255, 0.54)",level:"rgb(255, 255, 255)"},trackLabelFormat:ry,fadeDelay:0,
doubleClickForFullscreen:!0,singleClickForPlayAndPause:!0,enableKeyboardPlaybackControls:!0,enableFullscreenOnRotation:!0,forceLandscapeOnFullscreen:!0,enableTooltips:!1};window.WebKitPlaybackTargetAvailabilityEvent&&b.overflowMenuButtons.push("airplay");a.$d()&&(b.addBigPlayButton=!0,b.controlPanelElements=b.controlPanelElements.filter(function(c){return"play_pause"!=c&&"volume"!=c}));return b}
function sy(){var a,b,c,d,e,f,g,h,k,l,m,n,p;return L(function(t){switch(t.g){case 1:Xt();if(!ll())return ty("shaka-ui-load-failed",uy),t["return"]();a=document.querySelectorAll("[data-shaka-player-container]");b=document.querySelectorAll("[data-shaka-player]");if(!b.length&&!a.length){t.D(2);break}if(b.length&&!a.length){c=r(b);for(d=c.next();!d.done;d=c.next())e=d.value,e.ui||(f=document.createElement("div"),g=e.parentElement,g.replaceChild(f,e),f.appendChild(e),vy(f,e));t.D(2);break}h=r(a);k=h.next();
case 4:if(k.done){t.D(2);break}l=k.value;if(l.ui){t.D(5);break}m=null;n=r(b);for(d=n.next();!d.done;d=n.next())if(p=d.value,p.parentElement==l){m=p;break}m||(m=document.createElement("video"),m.setAttribute("playsinline",""),l.appendChild(m));E(t,7);return z(t,vy(l,m),9);case 9:wa(t,5);break;case 7:return H(t),ty("shaka-ui-load-failed",wy),t["return"]();case 5:k=h.next();t.D(4);break;case 2:ty("shaka-ui-loaded"),A(t)}})}
function ty(a,b){var c=null;void 0!=b&&(c={reasonCode:b});c=new CustomEvent(a,{detail:c});document.dispatchEvent(c)}
function vy(a,b){var c,d,e,f,g,h,k,l;return L(function(m){switch(m.g){case 1:c=new T(b);d=new py(c,a,b);e="";a.dataset&&a.dataset.shakaPlayerCastReceiverId?e=a.dataset.shakaPlayerCastReceiverId:b.dataset&&b.dataset.shakaPlayerCastReceiverId&&(e=b.dataset.shakaPlayerCastReceiverId);e.length&&d.configure({castReceiverAppId:e});b.controls&&d.g.Df(!0);if(f=b.getAttribute("src"))g=document.createElement("source"),g.setAttribute("src",f),b.appendChild(g),b.removeAttribute("src");h=r(b.querySelectorAll("source"));
k=h.next();case 2:if(k.done){m.D(0);break}l=k.value;E(m,5);return z(m,d.g.lc().load(l.getAttribute("src")),7);case 7:m.D(0);break;case 5:H(m);case 3:k=h.next(),m.D(2)}})}N("shaka.ui.Overlay",py);py.prototype.setEnabled=py.prototype.oh;py.prototype.getControls=py.prototype.ig;py.prototype.configure=py.prototype.configure;py.prototype.getConfiguration=py.prototype.getConfiguration;py.prototype.isMobile=py.prototype.$d;py.prototype.destroy=py.prototype.destroy;var ry=0;
py.TrackLabelFormat={LANGUAGE:ry,ROLE:1,LANGUAGE_ROLE:2,LABEL:3};var uy=0,wy=1;py.FailReasonCode={NO_BROWSER_SUPPORT:uy,PLAYER_FAILED_TO_LOAD:wy};"complete"==document.readyState?L(function(a){if(1==a.g)return z(a,Promise.resolve(),2);sy();A(a)}):window.addEventListener("load",sy);function xy(a,b,c,d,e,f,g){function h(C,B){return C+": "+B}function k(C){return"variant"==C.type?C.audioRoles?C.audioRoles.join(", "):void 0:C.roles.join(", ")}var l=a.find(function(C){return 1==C.active}),m=ix(b);ck(b);b.appendChild(m);m=new Map;for(var n=r(a),p=n.next();!p.done;p=n.next())p=p.value,m.has(p.language)||m.set(p.language,new Set),m.get(p.language).add(k(p));m=new Set;l=l?h(l.language,k(l)):"";n={};a=r(a);for(p=a.next();!p.done;n={$a:n.$a},p=a.next()){n.$a=p.value;p=n.$a.language;var t=
n.$a.forced,v=f.resolve(ic.Nf),w=k(n.$a),y=h(p,w);if(!m.has(y)){m.add(y);var x=bk();x.addEventListener("click",function(C){return function(){c(C.$a)}}(n));var D=S("span");x.appendChild(D);D.textContent=yy(p,f);switch(g){case ry:t&&(D.textContent+=" ("+v+")");break;case 1:w?D.textContent=w:(Ta("Track #"+n.$a.id+" does not have a role, but the UI is configured to only show role."),D.textContent="?");t&&(D.textContent+=" ("+v+")");break;case 2:w&&(D.textContent+=": "+w);t&&(D.textContent+=" ("+v+")");
break;case 3:n.$a.label?D.textContent=n.$a.label:(Ta("Track #"+n.$a.id+" does not have a label, but the UI is configured to only show labels."),D.textContent="?")}d&&y==l&&(x.appendChild(lx()),D.classList.add("shaka-chosen-item"),x.ariaSelected="true",e.textContent=D.textContent);b.appendChild(x)}}}
function yy(a,b){if(!a&&!b)return"";switch(a){case "mul":return b.resolve("MULTIPLE_LANGUAGES");case "und":return b.resolve("UNDETERMINED_LANGUAGE");case "zxx":return b.resolve("NOT_APPLICABLE")}var c=ac(a);return a in ex?ex[a].u:c in ex?ex[c].u+" ("+a+")":b.resolve("UNRECOGNIZED_LANGUAGE")+" ("+a+")"};function zy(a,b,c){W.call(this,a,b);var d=this;Ay(this,c);By(this);Cy(this);this.eventManager.o(this.button,"click",function(){d.menu.classList.contains("shaka-hidden")?(d.controls.dispatchEvent(new O("submenuopen")),X(d.menu,!0),kx(d.menu)):X(d.menu,!1)})}u(zy,W);
function Ay(a,b){a.button=bk();a.button.classList.add("shaka-overflow-button");a.icon=S("i");a.icon.classList.add("material-icons-round");a.icon.textContent=b;a.button.appendChild(a.icon);var c=S("label");c.classList.add("shaka-overflow-button-label");c.classList.add("shaka-overflow-menu-only");a.nameSpan=S("span");c.appendChild(a.nameSpan);a.currentSelection=S("span");a.currentSelection.classList.add("shaka-current-selection-span");c.appendChild(a.currentSelection);a.button.appendChild(c);a.parent.appendChild(a.button)}
function By(a){a.menu=S("div");a.menu.classList.add("shaka-no-propagation");a.menu.classList.add("shaka-show-controls-on-mouse-over");a.menu.classList.add("shaka-settings-menu");a.menu.classList.add("shaka-hidden");a.backButton=bk();a.backButton.classList.add("shaka-back-to-overflow-button");a.menu.appendChild(a.backButton);a.eventManager.o(a.backButton,"click",function(){a.controls.pc()});var b=S("i");b.classList.add("material-icons-round");b.textContent="close";a.backButton.appendChild(b);a.backSpan=
S("span");a.backButton.appendChild(a.backSpan);a.controls.i.appendChild(a.menu)}function Cy(a){a.parent.classList.contains("shaka-overflow-menu")&&(a.backButton.firstChild.textContent="arrow_back",a.eventManager.o(a.backButton,"click",function(){X(a.parent,!0);a.parent.childNodes[0].focus();Gx(a.controls)}))}N("shaka.ui.SettingsMenu",zy);function Dy(a,b){zy.call(this,a,b,"language");var c=this;this.button.classList.add("shaka-language-button");this.button.classList.add("shaka-tooltip-status");this.menu.classList.add("shaka-audio-languages");this.eventManager.o(this.localization,"locale-updated",function(){Ey(c)});this.eventManager.o(this.localization,"locale-changed",function(){Ey(c)});this.eventManager.o(this.player,"trackschanged",function(){var d=0<c.player.fb().length;X(c.button,d);Fy(c)});this.eventManager.o(this.player,"variantchanged",
function(){Fy(c)});Ey(this);Fy(this)}u(Dy,zy);function Fy(a){var b=a.player.fb();xy(b,a.menu,function(c){a.player.Dd(c.language,c.roles[0])},!0,a.currentSelection,a.localization,a.controls.m.trackLabelFormat);kx(a.menu);a.controls.dispatchEvent(new O("languageselectionupdated"));a.button.setAttribute("shaka-status",a.currentSelection.innerText)}
function Ey(a){a.backButton.ariaLabel=a.localization.resolve("BACK");a.button.ariaLabel=a.localization.resolve("LANGUAGE");a.nameSpan.textContent=a.localization.resolve("LANGUAGE");a.backSpan.textContent=a.localization.resolve("LANGUAGE")}N("shaka.ui.AudioLanguageSelection",Dy);function Gy(){}Gy.prototype.create=function(a,b){return new Dy(a,b)};iy("language",new Gy);Mx("language",new Gy);function Hy(a,b){W.call(this,a,b);var c=this;this.h=this.controls.B;this.g=bk();this.g.classList.add("shaka-cast-button");this.g.classList.add("shaka-tooltip");this.g.ariaPressed="false";this.i=S("i");this.i.classList.add("material-icons-round");this.i.textContent="cast";this.g.appendChild(this.i);var d=S("label");d.classList.add("shaka-overflow-button-label");d.classList.add("shaka-overflow-menu-only");this.l=S("span");d.appendChild(this.l);this.j=S("span");this.j.classList.add("shaka-current-selection-span");
d.appendChild(this.j);this.g.appendChild(d);this.parent.appendChild(this.g);Iy(this);Jy(this);this.eventManager.o(this.localization,"locale-updated",function(){Iy(c)});this.eventManager.o(this.localization,"locale-changed",function(){Iy(c)});this.eventManager.o(this.g,"click",function(){Ky(c)});this.eventManager.o(this.controls,"caststatuschanged",function(){Jy(c)})}u(Hy,W);
function Ky(a){var b;L(function(c){if(1==c.g){if(a.h.xa())return a.h.Hf(),c.D(0);E(c,3);a.g.disabled=!0;return z(c,a.h.cast(),5)}if(3!=c.g)return a.g.disabled=!1,wa(c,0);b=H(c);a.g.disabled=!1;8004!=b.code&&a.controls.dispatchEvent(new O("error",(new Map).set("detail",b)));A(c)})}function Jy(a){var b=a.h.Te()&&a.controls.Db,c=a.h.xa();X(a.g,b);a.i.textContent=c?"cast_connected":"cast";b&&(a.g.ariaPressed=c?"true":"false");Ly(a)}
function Ly(a){a.j.textContent=a.h.xa()?a.h.Bd():a.localization.resolve("OFF")}function Iy(a){a.g.ariaLabel=a.localization.resolve("CAST");a.l.textContent=a.localization.resolve("CAST");Ly(a)}N("shaka.ui.CastButton",Hy);function My(){}My.prototype.create=function(a,b){return new Hy(a,b)};iy("cast",new My);Mx("cast",new My);function Ny(a,b){W.call(this,a,b);var c=this;this.g=bk();this.g.classList.add("material-icons-round");this.g.classList.add("shaka-fast-forward-button");this.g.classList.add("shaka-tooltip-status");this.g.setAttribute("shaka-status","1x");this.g.textContent="fast_forward";this.parent.appendChild(this.g);Oy(this);this.h=this.controls.m.fastForwardRates;this.eventManager.o(this.localization,"locale-updated",function(){Oy(c)});this.eventManager.o(this.localization,"locale-changed",function(){Oy(c)});
this.eventManager.o(this.g,"click",function(){if(c.video.duration){var d=c.h.indexOf(c.player.Jb())+1;d=d!=c.h.length?c.h[d]:c.h[0];c.player.Pe(d);c.g.setAttribute("shaka-status",d+"x")}})}u(Ny,W);function Oy(a){a.g.ariaLabel=a.localization.resolve("FAST_FORWARD")}N("shaka.ui.FastForwardButton",Ny);function Py(){}Py.prototype.create=function(a,b){return new Ny(a,b)};Mx("fast_forward",new Py);function Qy(a,b){W.call(this,a,b);var c=this;this.g=bk();this.g.classList.add("shaka-fullscreen-button");this.g.classList.add("material-icons-round");this.g.classList.add("shaka-tooltip");document.fullscreenEnabled||this.g.classList.add("shaka-hidden");this.g.textContent="fullscreen";this.parent.appendChild(this.g);Ry(this);this.eventManager.o(this.localization,"locale-updated",function(){Ry(c)});this.eventManager.o(this.localization,"locale-changed",function(){Ry(c)});this.eventManager.o(this.g,
"click",function(){return L(function(d){return z(d,c.controls.Ne(),0)})});this.eventManager.o(document,"fullscreenchange",function(){c.g.textContent=document.fullscreenElement?"fullscreen_exit":"fullscreen";Ry(c)})}u(Qy,W);function Ry(a){a.g.ariaLabel=a.localization.resolve(document.fullscreenElement?"EXIT_FULL_SCREEN":"FULL_SCREEN")}N("shaka.ui.FullscreenButton",Qy);function Sy(){}Sy.prototype.create=function(a,b){return new Qy(a,b)};Mx("fullscreen",new Sy);function Ty(a,b){W.call(this,a,b);var c=this;this.g=bk();this.g.classList.add("shaka-loop-button");this.g.classList.add("shaka-tooltip");this.i=S("i");this.i.classList.add("material-icons-round");this.i.textContent="repeat";this.g.appendChild(this.i);var d=S("label");d.classList.add("shaka-overflow-button-label");d.classList.add("shaka-overflow-menu-only");this.j=S("span");this.j.textContent=this.localization.resolve("LOOP");d.appendChild(this.j);this.l=S("span");this.l.classList.add("shaka-current-selection-span");
d.appendChild(this.l);this.g.appendChild(d);Uy(this);this.parent.appendChild(this.g);this.eventManager.o(this.localization,"locale-updated",function(){Uy(c)});this.eventManager.o(this.localization,"locale-changed",function(){Uy(c)});this.eventManager.o(this.g,"click",function(){c.video.loop=!c.video.loop;c.h.Ga();c.h.na(1)});this.s=this.video.loop;this.h=new Q(function(){c.s!=c.video.loop&&(Uy(c),c.s=c.video.loop)});this.h.na(1)}u(Ty,W);Ty.prototype.release=function(){this.h.stop();this.h=null;W.prototype.release.call(this)};
function Uy(a){a.j.textContent=a.localization.resolve("LOOP");a.l.textContent=a.localization.resolve(a.video.loop?"ON":"OFF");a.i.textContent=a.video.loop?"repeat_on":"repeat";a.g.ariaLabel=a.localization.resolve(a.video.loop?"EXIT_LOOP_MODE":"ENTER_LOOP_MODE")}N("shaka.ui.LoopButton",Ty);function Vy(){}Vy.prototype.create=function(a,b){return new Ty(a,b)};iy("loop",new Vy);Mx("loop",new Vy);wx("loop",new Vy);function Wy(a,b){W.call(this,a,b);var c=this;this.g=bk();this.g.classList.add("shaka-mute-button");this.g.classList.add("material-icons-round");this.g.classList.add("shaka-tooltip");this.parent.appendChild(this.g);Xy(this);Yy(this);this.eventManager.o(this.localization,"locale-updated",function(){Xy(c)});this.eventManager.o(this.localization,"locale-changed",function(){Xy(c)});this.eventManager.o(this.g,"click",function(){c.ad&&c.ad.isLinear()?c.ad.setMuted(!c.ad.isMuted()):c.video.muted=!c.video.muted});
this.eventManager.o(this.video,"volumechange",function(){Xy(c);Yy(c)});this.eventManager.o(this.adManager,"ad-volume-changed",function(){Xy(c);Yy(c)});this.eventManager.o(this.adManager,"ad-muted",function(){Xy(c);Yy(c)});this.eventManager.o(this.adManager,"ad-stopped",function(){c.ad=null;Xy(c);Yy(c)})}u(Wy,W);function Xy(a){var b=a.ad?a.ad.isMuted()?"UNMUTE":"MUTE":a.video.muted?"UNMUTE":"MUTE";a.g.ariaLabel=a.localization.resolve(b)}
function Yy(a){var b=a.ad?a.ad.isMuted()?"volume_off":"volume_up":a.video.muted?"volume_off":"volume_up";a.g.textContent=b}N("shaka.ui.MuteButton",Wy);function Zy(){}Zy.prototype.create=function(a,b){return new Wy(a,b)};Mx("mute",new Zy);function $y(a,b){W.call(this,a,b);var c=this;this.l=this.controls.C;this.g=bk();this.g.classList.add("shaka-pip-button");this.g.classList.add("shaka-tooltip");this.i=S("i");this.i.classList.add("material-icons-round");this.i.textContent="picture_in_picture_alt";this.g.appendChild(this.i);var d=S("label");d.classList.add("shaka-overflow-button-label");d.classList.add("shaka-overflow-menu-only");this.j=S("span");this.j.textContent=this.localization.resolve("PICTURE_IN_PICTURE");d.appendChild(this.j);
this.h=S("span");this.h.classList.add("shaka-current-selection-span");d.appendChild(this.h);this.g.appendChild(d);az(this);this.parent.appendChild(this.g);document.pictureInPictureEnabled&&!this.video.disablePictureInPicture||X(this.g,!1);this.eventManager.o(this.localization,"locale-updated",function(){az(c)});this.eventManager.o(this.localization,"locale-changed",function(){az(c)});this.eventManager.o(this.g,"click",function(){bz(c)});this.eventManager.o(this.l,"enterpictureinpicture",function(){c.i.textContent=
"branding_watermark";c.g.ariaLabel=c.localization.resolve("EXIT_PICTURE_IN_PICTURE");c.h.textContent=c.localization.resolve("ON")});this.eventManager.o(this.l,"leavepictureinpicture",function(){c.i.textContent="picture_in_picture_alt";c.g.ariaLabel=c.localization.resolve("ENTER_PICTURE_IN_PICTURE");c.h.textContent=c.localization.resolve("OFF")});this.eventManager.o(this.controls,"caststatuschanged",function(e){e.newStatus?document.pictureInPictureEnabled&&!c.video.disablePictureInPicture&&X(c.g,!1):
document.pictureInPictureEnabled&&!c.video.disablePictureInPicture&&X(c.g,!0)});this.eventManager.o(this.player,"trackschanged",function(){cz(c)})}u($y,W);function bz(a){var b;L(function(c){if(1==c.g)return E(c,2),document.pictureInPictureElement?z(c,document.exitPictureInPicture(),5):(document.fullscreenElement&&document.exitFullscreen(),z(c,a.video.requestPictureInPicture(),5));if(2!=c.g)return wa(c,0);b=H(c);a.controls.dispatchEvent(new O("error",(new Map).set("detail",b)));A(c)})}
function az(a){a.j.textContent=a.localization.resolve("PICTURE_IN_PICTURE");a.g.ariaLabel=a.localization.resolve(document.pictureInPictureElement?"EXIT_PICTURE_IN_PICTURE":"ENTER_PICTURE_IN_PICTURE");a.h.textContent=a.localization.resolve(document.pictureInPictureElement?"ON":"OFF")}
function cz(a){L(function(b){if(!document.pictureInPictureEnabled||a.video.disablePictureInPicture)return X(a.g,!1),b.D(0);if(!a.player||!a.player.pf())return X(a.g,!0),b.D(0);X(a.g,!1);return document.pictureInPictureElement?z(b,document.exitPictureInPicture(),0):b.D(0)})}N("shaka.ui.PipButton",$y);function dz(){}dz.prototype.create=function(a,b){return new $y(a,b)};iy("picture_in_picture",new dz);Mx("picture_in_picture",new dz);wx("picture_in_picture",new dz);function ez(a,b){zy.call(this,a,b,"slow_motion_video");var c=this;this.button.classList.add("shaka-playbackrate-button");this.menu.classList.add("shaka-playback-rates");this.button.classList.add("shaka-tooltip-status");this.eventManager.o(this.localization,"locale-updated",function(){fz(c)});this.eventManager.o(this.localization,"locale-changed",function(){fz(c)});this.eventManager.o(this.player,"ratechange",function(){gz(c,c.player.Jb())});this.g=new Map(this.controls.m.playbackRates.map(function(d){return[d+
"x",d]}));fz(this);hz(this);gz(this,this.player.Jb())}u(ez,zy);function fz(a){a.backButton.ariaLabel=a.localization.resolve("BACK");a.button.ariaLabel=a.localization.resolve("PLAYBACK_RATE");a.nameSpan.textContent=a.localization.resolve("PLAYBACK_RATE");a.backSpan.textContent=a.localization.resolve("PLAYBACK_RATE")}
function gz(a,b){var c=jx(a.menu,"material-icons-round shaka-chosen-item");if(c){var d=c.parentElement;d.removeAttribute("aria-selected");d.getElementsByTagName("span")[0].classList.remove("shaka-chosen-item");d.removeChild(c)}if(c=Array.from(a.menu.querySelectorAll("span")).find(function(e){return a.g.get(e.textContent)==b}))d=c.parentElement,d.appendChild(lx()),d.ariaSelected="true",c.classList.add("shaka-chosen-item");a.currentSelection.textContent=b+"x";a.button.setAttribute("shaka-status",b+
"x")}function hz(a){for(var b={},c=r(a.g.keys()),d=c.next();!d.done;b={Cc:b.Cc},d=c.next()){b.Cc=d.value;d=bk();var e=S("span");e.textContent=b.Cc;d.appendChild(e);a.eventManager.o(d,"click",function(f){return function(){a.video.playbackRate=a.g.get(f.Cc);a.video.defaultPlaybackRate=a.g.get(f.Cc)}}(b));a.menu.appendChild(d)}kx(a.menu)}N("shaka.ui.PlaybackRateSelection",ez);function iz(){}iz.prototype.create=function(a,b){return new ez(a,b)};iy("playback_rate",new iz);Mx("playback_rate",new iz);function jz(a,b){W.call(this,a,b);var c=this;this.g=bk();this.g.classList.add("shaka-current-time");kz(this,"0:00");this.parent.appendChild(this.g);this.eventManager.o(this.g,"click",function(){c.player.W()&&(c.video.currentTime=c.player.Na().end)});this.eventManager.o(this.controls,"timeandseekrangeupdated",function(){var d=c.controls.ka,e=c.controls.jf(),f=c.video.duration,g=c.player.Na(),h=g.end-g.start;c.player.W()?(e=Math.max(0,Math.floor(g.end-e)),f=3600<=h,1<=e||d?(kz(c,"- "+mx(e,f)),c.g.disabled=
!1):(kz(c,c.localization.resolve("LIVE")),c.g.disabled=!0)):(d=3600<=f,e=mx(e,d),f&&(e+=" / "+mx(f,d)),kz(c,e),c.g.disabled=!0)});this.eventManager.o(this.player,"trackschanged",function(){c.player.W()&&(c.g.ariaLabel=c.localization.resolve("SKIP_TO_LIVE"))})}u(jz,W);function kz(a,b){b!=a.g.textContent&&(a.g.textContent=b)}N("shaka.ui.PresentationTimeTracker",jz);function lz(){}lz.prototype.create=function(a,b){return new jz(a,b)};Mx("time_and_duration",new lz);function mz(a,b){zy.call(this,a,b,"settings");var c=this;this.button.classList.add("shaka-resolution-button");this.button.classList.add("shaka-tooltip-status");this.menu.classList.add("shaka-resolutions");this.eventManager.o(this.localization,"locale-updated",function(){nz(c)});this.eventManager.o(this.localization,"locale-changed",function(){nz(c)});this.eventManager.o(this.player,"variantchanged",function(){oz(c)});this.eventManager.o(this.player,"trackschanged",function(){oz(c)});this.eventManager.o(this.player,
"abrstatuschanged",function(){oz(c)});oz(this);nz(this)}u(mz,zy);
function oz(a){var b=a.player.fb();if(b.length&&!b[0].height)X(a.menu,!1),X(a.button,!1);else{X(a.button,!0);b.sort(function(k,l){return l.height-k.height});var c=b.find(function(k){return k.active});c&&(b=b.filter(function(k){return k.language==c.language&&k.channelsCount==c.channelsCount}));b=b.filter(function(k,l){return b.findIndex(function(m){return m.height==k.height})==l});var d=ix(a.menu);ck(a.menu);a.menu.appendChild(d);d=a.player.getConfiguration().abr.enabled;for(var e={},f=r(b),g=f.next();!g.done;e=
{Fc:e.Fc},g=f.next()){e.Fc=g.value;g=bk();g.classList.add("explicit-resolution");a.eventManager.o(g,"click",function(k){return function(){var l=k.Fc;a.player.configure({abr:{enabled:!1}});a.player.Be(l,a.controls.m.clearBufferOnQualityChange)}}(e));var h=S("span");h.textContent=e.Fc.height+"p";g.appendChild(h);d||e.Fc!=c||(g.ariaSelected="true",g.appendChild(lx()),h.classList.add("shaka-chosen-item"),a.currentSelection.textContent=h.textContent);a.menu.appendChild(g)}e=bk();e.classList.add("shaka-enable-abr-button");
a.eventManager.o(e,"click",function(){a.player.configure({abr:{enabled:!0}});oz(a)});a.g=S("span");a.g.classList.add("shaka-auto-span");a.g.textContent=a.localization.resolve("AUTO_QUALITY");e.appendChild(a.g);d&&(e.ariaSelected="true",e.appendChild(lx()),a.g.classList.add("shaka-chosen-item"),a.currentSelection.textContent=a.localization.resolve("AUTO_QUALITY"));a.button.setAttribute("shaka-status",a.currentSelection.textContent);a.menu.appendChild(e);kx(a.menu);a.controls.dispatchEvent(new O("resolutionselectionupdated"))}}
function nz(a){a.button.ariaLabel=a.localization.resolve("RESOLUTION");a.backButton.ariaLabel=a.localization.resolve("RESOLUTION");a.backSpan.textContent=a.localization.resolve("RESOLUTION");a.nameSpan.textContent=a.localization.resolve("RESOLUTION");a.g.textContent=a.localization.resolve("AUTO_QUALITY");a.player.getConfiguration().abr.enabled&&(a.currentSelection.textContent=a.localization.resolve("AUTO_QUALITY"))}N("shaka.ui.ResolutionSelection",mz);function pz(){}
pz.prototype.create=function(a,b){return new mz(a,b)};iy("quality",new pz);Mx("quality",new pz);function qz(a,b){W.call(this,a,b);var c=this;this.g=bk();this.g.classList.add("material-icons-round");this.g.classList.add("shaka-rewind-button");this.g.classList.add("shaka-tooltip-status");this.g.setAttribute("shaka-status",this.localization.resolve("OFF"));this.g.textContent="fast_rewind";this.parent.appendChild(this.g);rz(this);this.h=this.controls.m.rewindRates;this.eventManager.o(this.localization,"locale-updated",function(){rz(c)});this.eventManager.o(this.localization,"locale-changed",function(){rz(c)});
this.eventManager.o(this.g,"click",function(){if(c.video.duration){var d=c.h.indexOf(c.player.Jb())+1;d=d!=c.h.length?c.h[d]:c.h[0];c.player.Pe(d);c.g.setAttribute("shaka-status",d+"x")}})}u(qz,W);function rz(a){a.g.ariaLabel=a.localization.resolve("REWIND")}N("shaka.ui.RewindButton",qz);function sz(){}sz.prototype.create=function(a,b){return new qz(a,b)};Mx("rewind",new sz);function tz(a,b){W.call(this,a,b);var c=this;this.j=S("div");this.j.classList.add("shaka-skip-ad-container");this.parent.appendChild(this.j);this.h=S("div");this.h.classList.add("shaka-skip-ad-counter");X(this.h,!1);this.j.appendChild(this.h);this.g=bk();this.g.classList.add("shaka-skip-ad-button");this.g.disabled=!0;X(this.g,!1);this.g.classList.add("shaka-no-propagation");this.j.appendChild(this.g);uz(this);this.i=new Q(function(){var d=Math.round(c.ad.getTimeUntilSkippable());0<d?c.h.textContent=
d:(c.i.stop(),X(c.h,!1))});this.eventManager.o(this.localization,"locale-updated",function(){uz(c)});this.eventManager.o(this.localization,"locale-changed",function(){uz(c)});this.eventManager.o(this.adManager,"ad-started",function(){vz(c)});this.eventManager.o(this.adManager,"ad-skip-state-changed",function(){c.ad.canSkipNow()&&(c.g.disabled=!1,c.i.stop(),X(c.h,!1))});this.eventManager.o(this.adManager,"ad-stopped",function(){c.i.stop();c.g.disabled=!0;X(c.g,!1);X(c.h,!1)});this.eventManager.o(this.g,
"click",function(){c.ad.skip()});this.ad&&vz(this)}u(tz,W);tz.prototype.release=function(){this.i.stop();this.i=null;W.prototype.release.call(this)};function uz(a){a.g.textContent=a.localization.resolve("SKIP_AD")}function vz(a){a.ad.isSkippable()&&(X(a.g,!0),X(a.h,!0),a.h.textContent="",a.i.Ga(),a.i.na(.5))}N("shaka.ui.SkipAdButton",tz);function wz(a,b){qx.call(this,a,b);this.button.classList.add("shaka-small-play-button");this.button.classList.add("material-icons-round");this.button.classList.add("shaka-tooltip");this.h();this.g()}u(wz,qx);wz.prototype.h=function(){this.button.textContent=this.video.ended?"replay":this.isPaused()?"play_arrow":"pause"};wz.prototype.g=function(){if(this.video.ended)this.button.ariaLabel=this.localization.resolve("REPLAY");else{var a=this.isPaused()?"PLAY":"PAUSE";this.button.ariaLabel=this.localization.resolve(a)}};
N("shaka.ui.SmallPlayButton",wz);function xz(){}xz.prototype.create=function(a,b){return new wz(a,b)};Mx("play_pause",new xz);function yz(a,b){W.call(this,a,b);var c=S("div");c.classList.add("shaka-spacer");c.ariaHidden="true";this.parent.appendChild(c)}u(yz,W);N("shaka.ui.Spacer",yz);function zz(){}zz.prototype.create=function(a,b){return new yz(a,b)};Mx("spacer",new zz);function Az(a,b){function c(l){return mx(h.h[l],!1)+" (m)"}function d(l){return Math.round(h.h[l]/1E3)+" (kbits/s)"}function e(l){return h.h[l].toFixed(2)+" (s)"}function f(l){return h.h[l]+" (frames)"}function g(l){return h.h[l]+" (px)"}W.call(this,a,b);var h=this;this.i=bk();this.i.classList.add("shaka-statistics-button");this.j=S("i");this.j.classList.add("material-icons-round");this.j.textContent="insert_chart_outlined";this.i.appendChild(this.j);var k=S("label");k.classList.add("shaka-overflow-button-label");
this.B=S("span");k.appendChild(this.B);this.s=S("span");this.s.classList.add("shaka-current-selection-span");k.appendChild(this.s);this.i.appendChild(k);this.parent.appendChild(this.i);this.g=S("div");this.g.classList.add("shaka-no-propagation");this.g.classList.add("shaka-show-controls-on-mouse-over");this.g.classList.add("shaka-statistics-container");this.g.classList.add("shaka-hidden");this.controls.i.appendChild(this.g);this.I=[];this.J=["stateHistory","switchHistory"];this.h=this.player.getStats();
this.C={};this.G={width:g,height:g,completionPercent:function(l){return h.h[l]+" (%)"},bufferingTime:e,drmTimeSeconds:e,licenseTime:e,liveLatency:e,loadLatency:e,manifestTimeSeconds:e,estimatedBandwidth:d,streamBandwidth:d,maxSegmentDuration:c,pauseTime:c,playTime:c,corruptedFrames:f,decodedFrames:f,droppedFrames:f};this.l=new Q(function(){h.h=h.player.getStats();for(var l=r(h.I),m=l.next();!m.done;m=l.next())m=m.value,h.C[m].textContent=h.G[m](m)});Bz(this);Cz(this);this.eventManager.o(this.localization,
"locale-updated",function(){Bz(h)});this.eventManager.o(this.localization,"locale-changed",function(){Bz(h)});this.eventManager.o(this.i,"click",function(){X(h.parent,!1);h.g.classList.contains("shaka-hidden")?(h.j.textContent="insert_chart",h.l.na(.1),X(h.g,!0)):(h.j.textContent="insert_chart_outlined",h.l.stop(),X(h.g,!1));Bz(h)})}u(Az,W);
function Bz(a){a.B.textContent=a.localization.resolve("STATISTICS");a.i.ariaLabel=a.localization.resolve("STATISTICS");a.s.textContent=a.localization.resolve(a.g.classList.contains("shaka-hidden")?"OFF":"ON")}
function Cz(a){for(var b=r(a.controls.m.statisticsList),c=b.next();!c.done;c=b.next())if(c=c.value,c in a.h&&!a.J.includes(c)){var d=a.g,e=d.appendChild,f=a,g=S("div"),h=S("label");h.textContent=c+":";g.appendChild(h);h=S("span");h.textContent=f.G[c](c);g.appendChild(h);f.C[c]=h;e.call(d,g);a.I.push(c)}else Ta("Unrecognized statistic element:",c)}Az.prototype.release=function(){this.l.stop();this.l=null;W.prototype.release.call(this)};N("shaka.ui.StatisticsButton",Az);function Dz(){}
Dz.prototype.create=function(a,b){return new Az(a,b)};iy("statistics",new Dz);wx("statistics",new Dz);function Ez(a,b){zy.call(this,a,b,"closed_caption");var c=this;this.button.classList.add("shaka-caption-button");this.button.classList.add("shaka-tooltip-status");this.menu.classList.add("shaka-text-languages");this.player&&this.player.Vb()?this.button.ariaPressed="true":this.button.ariaPressed="false";Fz(this);this.eventManager.o(this.localization,"locale-updated",function(){Gz(c);Hz(c)});this.eventManager.o(this.localization,"locale-changed",function(){Gz(c);Hz(c)});this.eventManager.o(this.player,
"texttrackvisibility",function(){Iz(c);Hz(c)});this.eventManager.o(this.player,"textchanged",function(){Hz(c)});this.eventManager.o(this.player,"trackschanged",function(){Jz(c)});Iz(this);Gz(this);Hz(this);Jz(this)}u(Ez,zy);function Fz(a){var b=bk();b.ariaSelected="true";a.menu.appendChild(b);b.appendChild(lx());a.g=S("span");a.g.classList.add("shaka-auto-span");b.appendChild(a.g)}
function Iz(a){a.player.Vb()?(a.icon.textContent="closed_caption_disabled",a.button.ariaPressed="true"):(a.icon.textContent="closed_caption",a.button.ariaPressed="false");a.controls.dispatchEvent(new O("captionselectionupdated"))}
function Hz(a){var b=a.player.vb();xy(b,a.menu,function(c){return Kz(a,c)},a.player.Vb(),a.currentSelection,a.localization,a.controls.m.trackLabelFormat);b=bk();b.classList.add("shaka-turn-captions-off-button");a.eventManager.o(b,"click",function(){a.player.Je(!1);Hz(a)});b.appendChild(a.g);a.menu.appendChild(b);a.player.Vb()||(b.ariaSelected="true",b.appendChild(lx()),a.g.classList.add("shaka-chosen-item"),a.currentSelection.textContent=a.localization.resolve("OFF"));a.button.setAttribute("shaka-status",
a.currentSelection.textContent);kx(a.menu);a.controls.dispatchEvent(new O("captionselectionupdated"))}function Kz(a,b){return L(function(c){a.player.Ae(b);return z(c,a.player.Je(!0),0)})}function Gz(a){a.button.ariaLabel=a.localization.resolve("CAPTIONS");a.backButton.ariaLabel=a.localization.resolve("BACK");a.nameSpan.textContent=a.localization.resolve("CAPTIONS");a.backSpan.textContent=a.localization.resolve("CAPTIONS");a.g.textContent=a.localization.resolve("OFF")}
function Jz(a){var b=0<a.player.vb().length;X(a.button,b);Hz(a)}N("shaka.ui.TextSelection",Ez);function Lz(){}Lz.prototype.create=function(a,b){return new Ez(a,b)};iy("captions",new Lz);Mx("captions",new Lz);function Mz(a,b){yx.call(this,a,b,["shaka-volume-bar-container"],["shaka-volume-bar"]);var c=this;this.m=this.controls.m;this.eventManager.o(this.video,"volumechange",function(){return Nz(c)});this.eventManager.o(this.adManager,"ad-volume-changed",function(){return Oz(c)});this.eventManager.o(this.adManager,"ad-muted",function(){return Oz(c)});this.eventManager.o(this.adManager,"ad-stopped",function(){return Nz(c)});this.eventManager.o(this.localization,"locale-updated",function(){return Pz(c)});
this.eventManager.o(this.localization,"locale-changed",function(){return Pz(c)});Nz(this);Pz(this);if(this.ad)this.onChange()}u(Mz,yx);Mz.prototype.onChange=function(){this.ad&&this.ad.isLinear()?this.ad.setVolume(this.getValue()):(this.video.volume=this.getValue(),this.video.muted=0==this.video.volume?!0:!1)};function Nz(a){a.video.muted?a.setValue(0):a.setValue(a.video.volume);Qz(a)}function Oz(a){var b=a.ad.getVolume();a.setValue(b);Qz(a)}
function Qz(a){var b=a.m.volumeBarColors,c=["to right"];c.push(b.level+100*a.getValue()+"%");c.push(b.base+100*a.getValue()+"%");c.push(b.base+"100%");a.container.style.background="linear-gradient("+c.join(",")+")"}function Pz(a){a.bar.ariaLabel=a.localization.resolve("VOLUME")}N("shaka.ui.VolumeBar",Mz);function Rz(){}Rz.prototype.create=function(a,b){return new Mz(a,b)};Mx("volume",new Rz);}).call(exportTo,innerGlobal,innerGlobal,undefined);if(true)for(var k in exportTo.shaka)exports[k]=exportTo.shaka[k];else {}})();

//# sourceMappingURL=shaka-player.ui.map

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__extends": () => (/* binding */ __extends),
/* harmony export */   "__assign": () => (/* binding */ __assign),
/* harmony export */   "__rest": () => (/* binding */ __rest),
/* harmony export */   "__decorate": () => (/* binding */ __decorate),
/* harmony export */   "__param": () => (/* binding */ __param),
/* harmony export */   "__metadata": () => (/* binding */ __metadata),
/* harmony export */   "__awaiter": () => (/* binding */ __awaiter),
/* harmony export */   "__generator": () => (/* binding */ __generator),
/* harmony export */   "__createBinding": () => (/* binding */ __createBinding),
/* harmony export */   "__exportStar": () => (/* binding */ __exportStar),
/* harmony export */   "__values": () => (/* binding */ __values),
/* harmony export */   "__read": () => (/* binding */ __read),
/* harmony export */   "__spread": () => (/* binding */ __spread),
/* harmony export */   "__spreadArrays": () => (/* binding */ __spreadArrays),
/* harmony export */   "__spreadArray": () => (/* binding */ __spreadArray),
/* harmony export */   "__await": () => (/* binding */ __await),
/* harmony export */   "__asyncGenerator": () => (/* binding */ __asyncGenerator),
/* harmony export */   "__asyncDelegator": () => (/* binding */ __asyncDelegator),
/* harmony export */   "__asyncValues": () => (/* binding */ __asyncValues),
/* harmony export */   "__makeTemplateObject": () => (/* binding */ __makeTemplateObject),
/* harmony export */   "__importStar": () => (/* binding */ __importStar),
/* harmony export */   "__importDefault": () => (/* binding */ __importDefault),
/* harmony export */   "__classPrivateFieldGet": () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   "__classPrivateFieldSet": () => (/* binding */ __classPrivateFieldSet)
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}


/***/ })

}]);
//# sourceMappingURL=SxndPlayerVendor.js.map