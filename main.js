(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEBUG mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});




// HELPERS


function _Debugger_unsafeCoerce(value)
{
	return value;
}



// PROGRAMS


var _Debugger_element = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		A3($elm$browser$Debugger$Main$wrapInit, _Json_wrap(debugMetadata), _Debugger_popout(), impl.init),
		$elm$browser$Debugger$Main$wrapUpdate(impl.update),
		$elm$browser$Debugger$Main$wrapSubs(impl.subscriptions),
		function(sendToApp, initialModel)
		{
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			var currNode = _VirtualDom_virtualize(domNode);
			var currBlocker = $elm$browser$Debugger$Main$toBlockerType(initialModel);
			var currPopout;

			var cornerNode = _VirtualDom_doc.createElement('div');
			domNode.parentNode.insertBefore(cornerNode, domNode.nextSibling);
			var cornerCurr = _VirtualDom_virtualize(cornerNode);

			initialModel.popout.a = sendToApp;

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = A2(_VirtualDom_map, $elm$browser$Debugger$Main$UserMsg, view($elm$browser$Debugger$Main$getUserModel(model)));
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;

				// update blocker

				var nextBlocker = $elm$browser$Debugger$Main$toBlockerType(model);
				_Debugger_updateBlocker(currBlocker, nextBlocker);
				currBlocker = nextBlocker;

				// view corner

				var cornerNext = $elm$browser$Debugger$Main$cornerView(model);
				var cornerPatches = _VirtualDom_diff(cornerCurr, cornerNext);
				cornerNode = _VirtualDom_applyPatches(cornerNode, cornerCurr, cornerPatches, sendToApp);
				cornerCurr = cornerNext;

				if (!model.popout.b)
				{
					currPopout = undefined;
					return;
				}

				// view popout

				_VirtualDom_doc = model.popout.b; // SWITCH TO POPOUT DOC
				currPopout || (currPopout = _VirtualDom_virtualize(model.popout.b));
				var nextPopout = $elm$browser$Debugger$Main$popoutView(model);
				var popoutPatches = _VirtualDom_diff(currPopout, nextPopout);
				_VirtualDom_applyPatches(model.popout.b.body, currPopout, popoutPatches, sendToApp);
				currPopout = nextPopout;
				_VirtualDom_doc = document; // SWITCH BACK TO NORMAL DOC
			});
		}
	);
});


var _Debugger_document = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		A3($elm$browser$Debugger$Main$wrapInit, _Json_wrap(debugMetadata), _Debugger_popout(), impl.init),
		$elm$browser$Debugger$Main$wrapUpdate(impl.update),
		$elm$browser$Debugger$Main$wrapSubs(impl.subscriptions),
		function(sendToApp, initialModel)
		{
			var divertHrefToApp = impl.setup && impl.setup(function(x) { return sendToApp($elm$browser$Debugger$Main$UserMsg(x)); });
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			var currBlocker = $elm$browser$Debugger$Main$toBlockerType(initialModel);
			var currPopout;

			initialModel.popout.a = sendToApp;

			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view($elm$browser$Debugger$Main$getUserModel(model));
				var nextNode = _VirtualDom_node('body')(_List_Nil)(
					_Utils_ap(
						A2($elm$core$List$map, _VirtualDom_map($elm$browser$Debugger$Main$UserMsg), doc.body),
						_List_Cons($elm$browser$Debugger$Main$cornerView(model), _List_Nil)
					)
				);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);

				// update blocker

				var nextBlocker = $elm$browser$Debugger$Main$toBlockerType(model);
				_Debugger_updateBlocker(currBlocker, nextBlocker);
				currBlocker = nextBlocker;

				// view popout

				if (!model.popout.b) { currPopout = undefined; return; }

				_VirtualDom_doc = model.popout.b; // SWITCH TO POPOUT DOC
				currPopout || (currPopout = _VirtualDom_virtualize(model.popout.b));
				var nextPopout = $elm$browser$Debugger$Main$popoutView(model);
				var popoutPatches = _VirtualDom_diff(currPopout, nextPopout);
				_VirtualDom_applyPatches(model.popout.b.body, currPopout, popoutPatches, sendToApp);
				currPopout = nextPopout;
				_VirtualDom_doc = document; // SWITCH BACK TO NORMAL DOC
			});
		}
	);
});


function _Debugger_popout()
{
	return {
		b: undefined,
		a: undefined
	};
}

function _Debugger_isOpen(popout)
{
	return !!popout.b;
}

function _Debugger_open(popout)
{
	return _Scheduler_binding(function(callback)
	{
		_Debugger_openWindow(popout);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}

function _Debugger_openWindow(popout)
{
	var w = $elm$browser$Debugger$Main$initialWindowWidth,
		h = $elm$browser$Debugger$Main$initialWindowHeight,
	 	x = screen.width - w,
		y = screen.height - h;

	var debuggerWindow = window.open('', '', 'width=' + w + ',height=' + h + ',left=' + x + ',top=' + y);
	var doc = debuggerWindow.document;
	doc.title = 'Elm Debugger';

	// handle arrow keys
	doc.addEventListener('keydown', function(event) {
		event.metaKey && event.which === 82 && window.location.reload();
		event.key === 'ArrowUp'   && (popout.a($elm$browser$Debugger$Main$Up  ), event.preventDefault());
		event.key === 'ArrowDown' && (popout.a($elm$browser$Debugger$Main$Down), event.preventDefault());
	});

	// handle window close
	window.addEventListener('unload', close);
	debuggerWindow.addEventListener('unload', function() {
		popout.b = undefined;
		popout.a($elm$browser$Debugger$Main$NoOp);
		window.removeEventListener('unload', close);
	});

	function close() {
		popout.b = undefined;
		popout.a($elm$browser$Debugger$Main$NoOp);
		debuggerWindow.close();
	}

	// register new window
	popout.b = doc;
}



// SCROLL


function _Debugger_scroll(popout)
{
	return _Scheduler_binding(function(callback)
	{
		if (popout.b)
		{
			var msgs = popout.b.getElementById('elm-debugger-sidebar');
			if (msgs && msgs.scrollTop !== 0)
			{
				msgs.scrollTop = 0;
			}
		}
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


var _Debugger_scrollTo = F2(function(id, popout)
{
	return _Scheduler_binding(function(callback)
	{
		if (popout.b)
		{
			var msg = popout.b.getElementById(id);
			if (msg)
			{
				msg.scrollIntoView(false);
			}
		}
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});



// UPLOAD


function _Debugger_upload(popout)
{
	return _Scheduler_binding(function(callback)
	{
		var doc = popout.b || document;
		var element = doc.createElement('input');
		element.setAttribute('type', 'file');
		element.setAttribute('accept', 'text/json');
		element.style.display = 'none';
		element.addEventListener('change', function(event)
		{
			var fileReader = new FileReader();
			fileReader.onload = function(e)
			{
				callback(_Scheduler_succeed(e.target.result));
			};
			fileReader.readAsText(event.target.files[0]);
			doc.body.removeChild(element);
		});
		doc.body.appendChild(element);
		element.click();
	});
}



// DOWNLOAD


var _Debugger_download = F2(function(historyLength, json)
{
	return _Scheduler_binding(function(callback)
	{
		var fileName = 'history-' + historyLength + '.txt';
		var jsonString = JSON.stringify(json);
		var mime = 'text/plain;charset=utf-8';
		var done = _Scheduler_succeed(_Utils_Tuple0);

		// for IE10+
		if (navigator.msSaveBlob)
		{
			navigator.msSaveBlob(new Blob([jsonString], {type: mime}), fileName);
			return callback(done);
		}

		// for HTML5
		var element = document.createElement('a');
		element.setAttribute('href', 'data:' + mime + ',' + encodeURIComponent(jsonString));
		element.setAttribute('download', fileName);
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
		callback(done);
	});
});



// POPOUT CONTENT


function _Debugger_messageToString(value)
{
	if (typeof value === 'boolean')
	{
		return value ? 'True' : 'False';
	}

	if (typeof value === 'number')
	{
		return value + '';
	}

	if (typeof value === 'string')
	{
		return '"' + _Debugger_addSlashes(value, false) + '"';
	}

	if (value instanceof String)
	{
		return "'" + _Debugger_addSlashes(value, true) + "'";
	}

	if (typeof value !== 'object' || value === null || !('$' in value))
	{
		return '…';
	}

	if (typeof value.$ === 'number')
	{
		return '…';
	}

	var code = value.$.charCodeAt(0);
	if (code === 0x23 /* # */ || /* a */ 0x61 <= code && code <= 0x7A /* z */)
	{
		return '…';
	}

	if (['Array_elm_builtin', 'Set_elm_builtin', 'RBNode_elm_builtin', 'RBEmpty_elm_builtin'].indexOf(value.$) >= 0)
	{
		return '…';
	}

	var keys = Object.keys(value);
	switch (keys.length)
	{
		case 1:
			return value.$;
		case 2:
			return value.$ + ' ' + _Debugger_messageToString(value.a);
		default:
			return value.$ + ' … ' + _Debugger_messageToString(value[keys[keys.length - 1]]);
	}
}


function _Debugger_init(value)
{
	if (typeof value === 'boolean')
	{
		return A3($elm$browser$Debugger$Expando$Constructor, $elm$core$Maybe$Just(value ? 'True' : 'False'), true, _List_Nil);
	}

	if (typeof value === 'number')
	{
		return $elm$browser$Debugger$Expando$Primitive(value + '');
	}

	if (typeof value === 'string')
	{
		return $elm$browser$Debugger$Expando$S('"' + _Debugger_addSlashes(value, false) + '"');
	}

	if (value instanceof String)
	{
		return $elm$browser$Debugger$Expando$S("'" + _Debugger_addSlashes(value, true) + "'");
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (tag === '::' || tag === '[]')
		{
			return A3($elm$browser$Debugger$Expando$Sequence, $elm$browser$Debugger$Expando$ListSeq, true,
				A2($elm$core$List$map, _Debugger_init, value)
			);
		}

		if (tag === 'Set_elm_builtin')
		{
			return A3($elm$browser$Debugger$Expando$Sequence, $elm$browser$Debugger$Expando$SetSeq, true,
				A3($elm$core$Set$foldr, _Debugger_initCons, _List_Nil, value)
			);
		}

		if (tag === 'RBNode_elm_builtin' || tag == 'RBEmpty_elm_builtin')
		{
			return A2($elm$browser$Debugger$Expando$Dictionary, true,
				A3($elm$core$Dict$foldr, _Debugger_initKeyValueCons, _List_Nil, value)
			);
		}

		if (tag === 'Array_elm_builtin')
		{
			return A3($elm$browser$Debugger$Expando$Sequence, $elm$browser$Debugger$Expando$ArraySeq, true,
				A3($elm$core$Array$foldr, _Debugger_initCons, _List_Nil, value)
			);
		}

		if (typeof tag === 'number')
		{
			return $elm$browser$Debugger$Expando$Primitive('<internals>');
		}

		var char = tag.charCodeAt(0);
		if (char === 35 || 65 <= char && char <= 90)
		{
			var list = _List_Nil;
			for (var i in value)
			{
				if (i === '$') continue;
				list = _List_Cons(_Debugger_init(value[i]), list);
			}
			return A3($elm$browser$Debugger$Expando$Constructor, char === 35 ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(tag), true, $elm$core$List$reverse(list));
		}

		return $elm$browser$Debugger$Expando$Primitive('<internals>');
	}

	if (typeof value === 'object')
	{
		var dict = $elm$core$Dict$empty;
		for (var i in value)
		{
			dict = A3($elm$core$Dict$insert, i, _Debugger_init(value[i]), dict);
		}
		return A2($elm$browser$Debugger$Expando$Record, true, dict);
	}

	return $elm$browser$Debugger$Expando$Primitive('<internals>');
}

var _Debugger_initCons = F2(function initConsHelp(value, list)
{
	return _List_Cons(_Debugger_init(value), list);
});

var _Debugger_initKeyValueCons = F3(function(key, value, list)
{
	return _List_Cons(
		_Utils_Tuple2(_Debugger_init(key), _Debugger_init(value)),
		list
	);
});

function _Debugger_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');
	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}



// BLOCK EVENTS


function _Debugger_updateBlocker(oldBlocker, newBlocker)
{
	if (oldBlocker === newBlocker) return;

	var oldEvents = _Debugger_blockerToEvents(oldBlocker);
	var newEvents = _Debugger_blockerToEvents(newBlocker);

	// remove old blockers
	for (var i = 0; i < oldEvents.length; i++)
	{
		document.removeEventListener(oldEvents[i], _Debugger_blocker, true);
	}

	// add new blockers
	for (var i = 0; i < newEvents.length; i++)
	{
		document.addEventListener(newEvents[i], _Debugger_blocker, true);
	}
}


function _Debugger_blocker(event)
{
	if (event.type === 'keydown' && event.metaKey && event.which === 82)
	{
		return;
	}

	var isScroll = event.type === 'scroll' || event.type === 'wheel';
	for (var node = event.target; node; node = node.parentNode)
	{
		if (isScroll ? node.id === 'elm-debugger-details' : node.id === 'elm-debugger-overlay')
		{
			return;
		}
	}

	event.stopPropagation();
	event.preventDefault();
}

function _Debugger_blockerToEvents(blocker)
{
	return blocker === $elm$browser$Debugger$Overlay$BlockNone
		? []
		: blocker === $elm$browser$Debugger$Overlay$BlockMost
			? _Debugger_mostEvents
			: _Debugger_allEvents;
}

var _Debugger_mostEvents = [
	'click', 'dblclick', 'mousemove',
	'mouseup', 'mousedown', 'mouseenter', 'mouseleave',
	'touchstart', 'touchend', 'touchcancel', 'touchmove',
	'pointerdown', 'pointerup', 'pointerover', 'pointerout',
	'pointerenter', 'pointerleave', 'pointermove', 'pointercancel',
	'dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop',
	'keyup', 'keydown', 'keypress',
	'input', 'change',
	'focus', 'blur'
];

var _Debugger_allEvents = _Debugger_mostEvents.concat('wheel', 'scroll');




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Debugger$Expando$ArraySeq = {$: 'ArraySeq'};
var $elm$browser$Debugger$Overlay$BlockMost = {$: 'BlockMost'};
var $elm$browser$Debugger$Overlay$BlockNone = {$: 'BlockNone'};
var $elm$browser$Debugger$Expando$Constructor = F3(
	function (a, b, c) {
		return {$: 'Constructor', a: a, b: b, c: c};
	});
var $elm$browser$Debugger$Expando$Dictionary = F2(
	function (a, b) {
		return {$: 'Dictionary', a: a, b: b};
	});
var $elm$browser$Debugger$Main$Down = {$: 'Down'};
var $elm$browser$Debugger$Expando$ListSeq = {$: 'ListSeq'};
var $elm$browser$Debugger$Main$NoOp = {$: 'NoOp'};
var $elm$browser$Debugger$Expando$Primitive = function (a) {
	return {$: 'Primitive', a: a};
};
var $elm$browser$Debugger$Expando$Record = F2(
	function (a, b) {
		return {$: 'Record', a: a, b: b};
	});
var $elm$browser$Debugger$Expando$S = function (a) {
	return {$: 'S', a: a};
};
var $elm$browser$Debugger$Expando$Sequence = F3(
	function (a, b, c) {
		return {$: 'Sequence', a: a, b: b, c: c};
	});
var $elm$browser$Debugger$Expando$SetSeq = {$: 'SetSeq'};
var $elm$browser$Debugger$Main$Up = {$: 'Up'};
var $elm$browser$Debugger$Main$UserMsg = function (a) {
	return {$: 'UserMsg', a: a};
};
var $elm$browser$Debugger$Main$Export = {$: 'Export'};
var $elm$browser$Debugger$Main$Import = {$: 'Import'};
var $elm$browser$Debugger$Main$Open = {$: 'Open'};
var $elm$browser$Debugger$Main$OverlayMsg = function (a) {
	return {$: 'OverlayMsg', a: a};
};
var $elm$browser$Debugger$Main$Resume = {$: 'Resume'};
var $elm$browser$Debugger$Main$isPaused = function (state) {
	if (state.$ === 'Running') {
		return false;
	} else {
		return true;
	}
};
var $elm$browser$Debugger$History$size = function (history) {
	return history.numMessages;
};
var $elm$browser$Debugger$Overlay$Accept = function (a) {
	return {$: 'Accept', a: a};
};
var $elm$browser$Debugger$Overlay$Choose = F2(
	function (a, b) {
		return {$: 'Choose', a: a, b: b};
	});
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$browser$Debugger$Overlay$goodNews1 = '\nThe good news is that having values like this in your message type is not\nso great in the long run. You are better off using simpler data, like\n';
var $elm$browser$Debugger$Overlay$goodNews2 = '\nfunction can pattern match on that data and call whatever functions, JSON\ndecoders, etc. you need. This makes the code much more explicit and easy to\nfollow for other readers (or you in a few months!)\n';
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $elm$html$Html$code = _VirtualDom_node('code');
var $elm$browser$Debugger$Overlay$viewCode = function (name) {
	return A2(
		$elm$html$Html$code,
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$text(name)
			]));
};
var $elm$browser$Debugger$Overlay$addCommas = function (items) {
	if (!items.b) {
		return '';
	} else {
		if (!items.b.b) {
			var item = items.a;
			return item;
		} else {
			if (!items.b.b.b) {
				var item1 = items.a;
				var _v1 = items.b;
				var item2 = _v1.a;
				return item1 + (' and ' + item2);
			} else {
				var lastItem = items.a;
				var otherItems = items.b;
				return A2(
					$elm$core$String$join,
					', ',
					_Utils_ap(
						otherItems,
						_List_fromArray(
							[' and ' + lastItem])));
			}
		}
	}
};
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$browser$Debugger$Overlay$problemToString = function (problem) {
	switch (problem.$) {
		case 'Function':
			return 'functions';
		case 'Decoder':
			return 'JSON decoders';
		case 'Task':
			return 'tasks';
		case 'Process':
			return 'processes';
		case 'Socket':
			return 'web sockets';
		case 'Request':
			return 'HTTP requests';
		case 'Program':
			return 'programs';
		default:
			return 'virtual DOM values';
	}
};
var $elm$browser$Debugger$Overlay$viewProblemType = function (_v0) {
	var name = _v0.name;
	var problems = _v0.problems;
	return A2(
		$elm$html$Html$li,
		_List_Nil,
		_List_fromArray(
			[
				$elm$browser$Debugger$Overlay$viewCode(name),
				$elm$html$Html$text(
				' can contain ' + ($elm$browser$Debugger$Overlay$addCommas(
					A2($elm$core$List$map, $elm$browser$Debugger$Overlay$problemToString, problems)) + '.'))
			]));
};
var $elm$browser$Debugger$Overlay$viewBadMetadata = function (_v0) {
	var message = _v0.message;
	var problems = _v0.problems;
	return _List_fromArray(
		[
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('The '),
					$elm$browser$Debugger$Overlay$viewCode(message),
					$elm$html$Html$text(' type of your program cannot be reliably serialized for history files.')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Functions cannot be serialized, nor can values that contain functions. This is a problem in these places:')
				])),
			A2(
			$elm$html$Html$ul,
			_List_Nil,
			A2($elm$core$List$map, $elm$browser$Debugger$Overlay$viewProblemType, problems)),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text($elm$browser$Debugger$Overlay$goodNews1),
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('https://guide.elm-lang.org/types/custom_types.html')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('custom types')
						])),
					$elm$html$Html$text(', in your messages. From there, your '),
					$elm$browser$Debugger$Overlay$viewCode('update'),
					$elm$html$Html$text($elm$browser$Debugger$Overlay$goodNews2)
				]))
		]);
};
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $elm$browser$Debugger$Overlay$Cancel = {$: 'Cancel'};
var $elm$browser$Debugger$Overlay$Proceed = {$: 'Proceed'};
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$browser$Debugger$Overlay$viewButtons = function (buttons) {
	var btn = F2(
		function (msg, string) {
			return A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'margin-right', '20px'),
						$elm$html$Html$Events$onClick(msg)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(string)
					]));
		});
	var buttonNodes = function () {
		if (buttons.$ === 'Accept') {
			var proceed = buttons.a;
			return _List_fromArray(
				[
					A2(btn, $elm$browser$Debugger$Overlay$Proceed, proceed)
				]);
		} else {
			var cancel = buttons.a;
			var proceed = buttons.b;
			return _List_fromArray(
				[
					A2(btn, $elm$browser$Debugger$Overlay$Cancel, cancel),
					A2(btn, $elm$browser$Debugger$Overlay$Proceed, proceed)
				]);
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'height', '60px'),
				A2($elm$html$Html$Attributes$style, 'line-height', '60px'),
				A2($elm$html$Html$Attributes$style, 'text-align', 'right'),
				A2($elm$html$Html$Attributes$style, 'background-color', 'rgb(50, 50, 50)')
			]),
		buttonNodes);
};
var $elm$browser$Debugger$Overlay$viewMessage = F4(
	function (config, title, details, buttons) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('elm-debugger-overlay'),
					A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
					A2($elm$html$Html$Attributes$style, 'top', '0'),
					A2($elm$html$Html$Attributes$style, 'left', '0'),
					A2($elm$html$Html$Attributes$style, 'width', '100vw'),
					A2($elm$html$Html$Attributes$style, 'height', '100vh'),
					A2($elm$html$Html$Attributes$style, 'color', 'white'),
					A2($elm$html$Html$Attributes$style, 'pointer-events', 'none'),
					A2($elm$html$Html$Attributes$style, 'font-family', '\'Trebuchet MS\', \'Lucida Grande\', \'Bitstream Vera Sans\', \'Helvetica Neue\', sans-serif'),
					A2($elm$html$Html$Attributes$style, 'z-index', '2147483647')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '600px'),
							A2($elm$html$Html$Attributes$style, 'height', '100vh'),
							A2($elm$html$Html$Attributes$style, 'padding-left', 'calc(50% - 300px)'),
							A2($elm$html$Html$Attributes$style, 'padding-right', 'calc(50% - 300px)'),
							A2($elm$html$Html$Attributes$style, 'background-color', 'rgba(200, 200, 200, 0.7)'),
							A2($elm$html$Html$Attributes$style, 'pointer-events', 'auto')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'font-size', '36px'),
									A2($elm$html$Html$Attributes$style, 'height', '80px'),
									A2($elm$html$Html$Attributes$style, 'background-color', 'rgb(50, 50, 50)'),
									A2($elm$html$Html$Attributes$style, 'padding-left', '22px'),
									A2($elm$html$Html$Attributes$style, 'vertical-align', 'middle'),
									A2($elm$html$Html$Attributes$style, 'line-height', '80px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(title)
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$id('elm-debugger-details'),
									A2($elm$html$Html$Attributes$style, 'padding', ' 8px 20px'),
									A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
									A2($elm$html$Html$Attributes$style, 'max-height', 'calc(100vh - 156px)'),
									A2($elm$html$Html$Attributes$style, 'background-color', 'rgb(61, 61, 61)')
								]),
							details),
							A2(
							$elm$html$Html$map,
							config.wrap,
							$elm$browser$Debugger$Overlay$viewButtons(buttons))
						]))
				]));
	});
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$virtual_dom$VirtualDom$nodeNS = function (tag) {
	return _VirtualDom_nodeNS(
		_VirtualDom_noScript(tag));
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$browser$Debugger$Overlay$viewShape = F4(
	function (x, y, angle, coordinates) {
		return A4(
			$elm$virtual_dom$VirtualDom$nodeNS,
			'http://www.w3.org/2000/svg',
			'polygon',
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'points', coordinates),
					A2(
					$elm$virtual_dom$VirtualDom$attribute,
					'transform',
					'translate(' + ($elm$core$String$fromFloat(x) + (' ' + ($elm$core$String$fromFloat(y) + (') rotate(' + ($elm$core$String$fromFloat(-angle) + ')'))))))
				]),
			_List_Nil);
	});
var $elm$browser$Debugger$Overlay$elmLogo = A4(
	$elm$virtual_dom$VirtualDom$nodeNS,
	'http://www.w3.org/2000/svg',
	'svg',
	_List_fromArray(
		[
			A2($elm$virtual_dom$VirtualDom$attribute, 'viewBox', '-300 -300 600 600'),
			A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns', 'http://www.w3.org/2000/svg'),
			A2($elm$virtual_dom$VirtualDom$attribute, 'fill', 'currentColor'),
			A2($elm$virtual_dom$VirtualDom$attribute, 'width', '24px'),
			A2($elm$virtual_dom$VirtualDom$attribute, 'height', '24px')
		]),
	_List_fromArray(
		[
			A4(
			$elm$virtual_dom$VirtualDom$nodeNS,
			'http://www.w3.org/2000/svg',
			'g',
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'transform', 'scale(1 -1)')
				]),
			_List_fromArray(
				[
					A4($elm$browser$Debugger$Overlay$viewShape, 0, -210, 0, '-280,-90 0,190 280,-90'),
					A4($elm$browser$Debugger$Overlay$viewShape, -210, 0, 90, '-280,-90 0,190 280,-90'),
					A4($elm$browser$Debugger$Overlay$viewShape, 207, 207, 45, '-198,-66 0,132 198,-66'),
					A4($elm$browser$Debugger$Overlay$viewShape, 150, 0, 0, '-130,0 0,-130 130,0 0,130'),
					A4($elm$browser$Debugger$Overlay$viewShape, -89, 239, 0, '-191,61 69,61 191,-61 -69,-61'),
					A4($elm$browser$Debugger$Overlay$viewShape, 0, 106, 180, '-130,-44 0,86  130,-44'),
					A4($elm$browser$Debugger$Overlay$viewShape, 256, -150, 270, '-130,-44 0,86  130,-44')
				]))
		]));
var $elm$core$String$length = _String_length;
var $elm$browser$Debugger$Overlay$viewMiniControls = F2(
	function (config, numMsgs) {
		var string = $elm$core$String$fromInt(numMsgs);
		var width = $elm$core$String$fromInt(
			2 + $elm$core$String$length(string));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
					A2($elm$html$Html$Attributes$style, 'bottom', '2em'),
					A2($elm$html$Html$Attributes$style, 'right', '2em'),
					A2($elm$html$Html$Attributes$style, 'width', 'calc(42px + ' + (width + 'ch)')),
					A2($elm$html$Html$Attributes$style, 'height', '36px'),
					A2($elm$html$Html$Attributes$style, 'background-color', '#1293D8'),
					A2($elm$html$Html$Attributes$style, 'color', 'white'),
					A2($elm$html$Html$Attributes$style, 'font-family', 'monospace'),
					A2($elm$html$Html$Attributes$style, 'pointer-events', 'auto'),
					A2($elm$html$Html$Attributes$style, 'z-index', '2147483647'),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
					A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
					$elm$html$Html$Events$onClick(config.open)
				]),
			_List_fromArray(
				[
					$elm$browser$Debugger$Overlay$elmLogo,
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'padding-left', 'calc(1ch + 6px)'),
							A2($elm$html$Html$Attributes$style, 'padding-right', '1ch')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(string)
						]))
				]));
	});
var $elm$browser$Debugger$Overlay$explanationBad = '\nThe messages in this history do not match the messages handled by your\nprogram. I noticed changes in the following types:\n';
var $elm$browser$Debugger$Overlay$explanationRisky = '\nThis history seems old. It will work with this program, but some\nmessages have been added since the history was created:\n';
var $elm$core$List$intersperse = F2(
	function (sep, xs) {
		if (!xs.b) {
			return _List_Nil;
		} else {
			var hd = xs.a;
			var tl = xs.b;
			var step = F2(
				function (x, rest) {
					return A2(
						$elm$core$List$cons,
						sep,
						A2($elm$core$List$cons, x, rest));
				});
			var spersed = A3($elm$core$List$foldr, step, _List_Nil, tl);
			return A2($elm$core$List$cons, hd, spersed);
		}
	});
var $elm$browser$Debugger$Overlay$viewMention = F2(
	function (tags, verbed) {
		var _v0 = A2(
			$elm$core$List$map,
			$elm$browser$Debugger$Overlay$viewCode,
			$elm$core$List$reverse(tags));
		if (!_v0.b) {
			return $elm$html$Html$text('');
		} else {
			if (!_v0.b.b) {
				var tag = _v0.a;
				return A2(
					$elm$html$Html$li,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(verbed),
							tag,
							$elm$html$Html$text('.')
						]));
			} else {
				if (!_v0.b.b.b) {
					var tag2 = _v0.a;
					var _v1 = _v0.b;
					var tag1 = _v1.a;
					return A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(verbed),
								tag1,
								$elm$html$Html$text(' and '),
								tag2,
								$elm$html$Html$text('.')
							]));
				} else {
					var lastTag = _v0.a;
					var otherTags = _v0.b;
					return A2(
						$elm$html$Html$li,
						_List_Nil,
						A2(
							$elm$core$List$cons,
							$elm$html$Html$text(verbed),
							_Utils_ap(
								A2(
									$elm$core$List$intersperse,
									$elm$html$Html$text(', '),
									$elm$core$List$reverse(otherTags)),
								_List_fromArray(
									[
										$elm$html$Html$text(', and '),
										lastTag,
										$elm$html$Html$text('.')
									]))));
				}
			}
		}
	});
var $elm$browser$Debugger$Overlay$viewChange = function (change) {
	return A2(
		$elm$html$Html$li,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'margin', '8px 0')
			]),
		function () {
			if (change.$ === 'AliasChange') {
				var name = change.a;
				return _List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'font-size', '1.5em')
							]),
						_List_fromArray(
							[
								$elm$browser$Debugger$Overlay$viewCode(name)
							]))
					]);
			} else {
				var name = change.a;
				var removed = change.b.removed;
				var changed = change.b.changed;
				var added = change.b.added;
				var argsMatch = change.b.argsMatch;
				return _List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'font-size', '1.5em')
							]),
						_List_fromArray(
							[
								$elm$browser$Debugger$Overlay$viewCode(name)
							])),
						A2(
						$elm$html$Html$ul,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'list-style-type', 'disc'),
								A2($elm$html$Html$Attributes$style, 'padding-left', '2em')
							]),
						_List_fromArray(
							[
								A2($elm$browser$Debugger$Overlay$viewMention, removed, 'Removed '),
								A2($elm$browser$Debugger$Overlay$viewMention, changed, 'Changed '),
								A2($elm$browser$Debugger$Overlay$viewMention, added, 'Added ')
							])),
						argsMatch ? $elm$html$Html$text('') : $elm$html$Html$text('This may be due to the fact that the type variable names changed.')
					]);
			}
		}());
};
var $elm$browser$Debugger$Overlay$viewReport = F2(
	function (isBad, report) {
		switch (report.$) {
			case 'CorruptHistory':
				return _List_fromArray(
					[
						$elm$html$Html$text('Looks like this history file is corrupt. I cannot understand it.')
					]);
			case 'VersionChanged':
				var old = report.a;
				var _new = report.b;
				return _List_fromArray(
					[
						$elm$html$Html$text('This history was created with Elm ' + (old + (', but you are using Elm ' + (_new + ' right now.'))))
					]);
			case 'MessageChanged':
				var old = report.a;
				var _new = report.b;
				return _List_fromArray(
					[
						$elm$html$Html$text('To import some other history, the overall message type must' + ' be the same. The old history has '),
						$elm$browser$Debugger$Overlay$viewCode(old),
						$elm$html$Html$text(' messages, but the new program works with '),
						$elm$browser$Debugger$Overlay$viewCode(_new),
						$elm$html$Html$text(' messages.')
					]);
			default:
				var changes = report.a;
				return _List_fromArray(
					[
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(
								isBad ? $elm$browser$Debugger$Overlay$explanationBad : $elm$browser$Debugger$Overlay$explanationRisky)
							])),
						A2(
						$elm$html$Html$ul,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'list-style-type', 'none'),
								A2($elm$html$Html$Attributes$style, 'padding-left', '20px')
							]),
						A2($elm$core$List$map, $elm$browser$Debugger$Overlay$viewChange, changes))
					]);
		}
	});
var $elm$browser$Debugger$Overlay$view = F5(
	function (config, isPaused, isOpen, numMsgs, state) {
		switch (state.$) {
			case 'None':
				return isOpen ? $elm$html$Html$text('') : (isPaused ? A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$id('elm-debugger-overlay'),
							A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
							A2($elm$html$Html$Attributes$style, 'top', '0'),
							A2($elm$html$Html$Attributes$style, 'left', '0'),
							A2($elm$html$Html$Attributes$style, 'width', '100vw'),
							A2($elm$html$Html$Attributes$style, 'height', '100vh'),
							A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
							A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
							A2($elm$html$Html$Attributes$style, 'pointer-events', 'auto'),
							A2($elm$html$Html$Attributes$style, 'background-color', 'rgba(200, 200, 200, 0.7)'),
							A2($elm$html$Html$Attributes$style, 'color', 'white'),
							A2($elm$html$Html$Attributes$style, 'font-family', '\'Trebuchet MS\', \'Lucida Grande\', \'Bitstream Vera Sans\', \'Helvetica Neue\', sans-serif'),
							A2($elm$html$Html$Attributes$style, 'z-index', '2147483646'),
							$elm$html$Html$Events$onClick(config.resume)
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'font-size', '80px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Click to Resume')
								])),
							A2($elm$browser$Debugger$Overlay$viewMiniControls, config, numMsgs)
						])) : A2($elm$browser$Debugger$Overlay$viewMiniControls, config, numMsgs));
			case 'BadMetadata':
				var badMetadata_ = state.a;
				return A4(
					$elm$browser$Debugger$Overlay$viewMessage,
					config,
					'Cannot use Import or Export',
					$elm$browser$Debugger$Overlay$viewBadMetadata(badMetadata_),
					$elm$browser$Debugger$Overlay$Accept('Ok'));
			case 'BadImport':
				var report = state.a;
				return A4(
					$elm$browser$Debugger$Overlay$viewMessage,
					config,
					'Cannot Import History',
					A2($elm$browser$Debugger$Overlay$viewReport, true, report),
					$elm$browser$Debugger$Overlay$Accept('Ok'));
			default:
				var report = state.a;
				return A4(
					$elm$browser$Debugger$Overlay$viewMessage,
					config,
					'Warning',
					A2($elm$browser$Debugger$Overlay$viewReport, false, report),
					A2($elm$browser$Debugger$Overlay$Choose, 'Cancel', 'Import Anyway'));
		}
	});
var $elm$browser$Debugger$Main$cornerView = function (model) {
	return A5(
		$elm$browser$Debugger$Overlay$view,
		{exportHistory: $elm$browser$Debugger$Main$Export, importHistory: $elm$browser$Debugger$Main$Import, open: $elm$browser$Debugger$Main$Open, resume: $elm$browser$Debugger$Main$Resume, wrap: $elm$browser$Debugger$Main$OverlayMsg},
		$elm$browser$Debugger$Main$isPaused(model.state),
		_Debugger_isOpen(model.popout),
		$elm$browser$Debugger$History$size(model.history),
		model.overlay);
};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Set$foldr = F3(
	function (func, initialState, _v0) {
		var dict = _v0.a;
		return A3(
			$elm$core$Dict$foldr,
			F3(
				function (key, _v1, state) {
					return A2(func, key, state);
				}),
			initialState,
			dict);
	});
var $elm$browser$Debugger$Main$getCurrentModel = function (state) {
	if (state.$ === 'Running') {
		var model = state.a;
		return model;
	} else {
		var model = state.b;
		return model;
	}
};
var $elm$browser$Debugger$Main$getUserModel = function (model) {
	return $elm$browser$Debugger$Main$getCurrentModel(model.state);
};
var $elm$browser$Debugger$Main$initialWindowHeight = 420;
var $elm$browser$Debugger$Main$initialWindowWidth = 900;
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$browser$Debugger$Main$cachedHistory = function (model) {
	var _v0 = model.state;
	if (_v0.$ === 'Running') {
		return model.history;
	} else {
		var history = _v0.e;
		return history;
	}
};
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$node = $elm$virtual_dom$VirtualDom$node;
var $elm$browser$Debugger$Main$DragEnd = {$: 'DragEnd'};
var $elm$browser$Debugger$Main$getDragStatus = function (layout) {
	if (layout.$ === 'Horizontal') {
		var status = layout.a;
		return status;
	} else {
		var status = layout.a;
		return status;
	}
};
var $elm$browser$Debugger$Main$Drag = function (a) {
	return {$: 'Drag', a: a};
};
var $elm$browser$Debugger$Main$DragInfo = F5(
	function (x, y, down, width, height) {
		return {down: down, height: height, width: width, x: x, y: y};
	});
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$browser$Debugger$Main$decodeDimension = function (field) {
	return A2(
		$elm$json$Json$Decode$at,
		_List_fromArray(
			['currentTarget', 'ownerDocument', 'defaultView', field]),
		$elm$json$Json$Decode$float);
};
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$json$Json$Decode$map5 = _Json_map5;
var $elm$browser$Debugger$Main$onMouseMove = A2(
	$elm$html$Html$Events$on,
	'mousemove',
	A2(
		$elm$json$Json$Decode$map,
		$elm$browser$Debugger$Main$Drag,
		A6(
			$elm$json$Json$Decode$map5,
			$elm$browser$Debugger$Main$DragInfo,
			A2($elm$json$Json$Decode$field, 'pageX', $elm$json$Json$Decode$float),
			A2($elm$json$Json$Decode$field, 'pageY', $elm$json$Json$Decode$float),
			A2(
				$elm$json$Json$Decode$field,
				'buttons',
				A2(
					$elm$json$Json$Decode$map,
					function (v) {
						return v === 1;
					},
					$elm$json$Json$Decode$int)),
			$elm$browser$Debugger$Main$decodeDimension('innerWidth'),
			$elm$browser$Debugger$Main$decodeDimension('innerHeight'))));
var $elm$html$Html$Events$onMouseUp = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseup',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$browser$Debugger$Main$toDragListeners = function (layout) {
	var _v0 = $elm$browser$Debugger$Main$getDragStatus(layout);
	if (_v0.$ === 'Static') {
		return _List_Nil;
	} else {
		return _List_fromArray(
			[
				$elm$browser$Debugger$Main$onMouseMove,
				$elm$html$Html$Events$onMouseUp($elm$browser$Debugger$Main$DragEnd)
			]);
	}
};
var $elm$browser$Debugger$Main$toFlexDirection = function (layout) {
	if (layout.$ === 'Horizontal') {
		return 'row';
	} else {
		return 'column-reverse';
	}
};
var $elm$browser$Debugger$Main$DragStart = {$: 'DragStart'};
var $elm$html$Html$Events$onMouseDown = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mousedown',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$browser$Debugger$Main$toPercent = function (fraction) {
	return $elm$core$String$fromFloat(100 * fraction) + '%';
};
var $elm$browser$Debugger$Main$viewDragZone = function (layout) {
	if (layout.$ === 'Horizontal') {
		var x = layout.b;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2($elm$html$Html$Attributes$style, 'top', '0'),
					A2(
					$elm$html$Html$Attributes$style,
					'left',
					$elm$browser$Debugger$Main$toPercent(x)),
					A2($elm$html$Html$Attributes$style, 'margin-left', '-5px'),
					A2($elm$html$Html$Attributes$style, 'width', '10px'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'cursor', 'col-resize'),
					$elm$html$Html$Events$onMouseDown($elm$browser$Debugger$Main$DragStart)
				]),
			_List_Nil);
	} else {
		var y = layout.c;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2(
					$elm$html$Html$Attributes$style,
					'top',
					$elm$browser$Debugger$Main$toPercent(y)),
					A2($elm$html$Html$Attributes$style, 'left', '0'),
					A2($elm$html$Html$Attributes$style, 'margin-top', '-5px'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'height', '10px'),
					A2($elm$html$Html$Attributes$style, 'cursor', 'row-resize'),
					$elm$html$Html$Events$onMouseDown($elm$browser$Debugger$Main$DragStart)
				]),
			_List_Nil);
	}
};
var $elm$browser$Debugger$Main$TweakExpandoModel = function (a) {
	return {$: 'TweakExpandoModel', a: a};
};
var $elm$browser$Debugger$Main$TweakExpandoMsg = function (a) {
	return {$: 'TweakExpandoMsg', a: a};
};
var $elm$browser$Debugger$Main$toExpandoPercents = function (layout) {
	if (layout.$ === 'Horizontal') {
		var x = layout.b;
		return _Utils_Tuple2(
			$elm$browser$Debugger$Main$toPercent(1 - x),
			'100%');
	} else {
		var y = layout.c;
		return _Utils_Tuple2(
			'100%',
			$elm$browser$Debugger$Main$toPercent(y));
	}
};
var $elm$browser$Debugger$Main$toMouseBlocker = function (layout) {
	var _v0 = $elm$browser$Debugger$Main$getDragStatus(layout);
	if (_v0.$ === 'Static') {
		return 'auto';
	} else {
		return 'none';
	}
};
var $elm$browser$Debugger$Expando$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$browser$Debugger$Expando$Index = F3(
	function (a, b, c) {
		return {$: 'Index', a: a, b: b, c: c};
	});
var $elm$browser$Debugger$Expando$Key = {$: 'Key'};
var $elm$browser$Debugger$Expando$None = {$: 'None'};
var $elm$browser$Debugger$Expando$Toggle = {$: 'Toggle'};
var $elm$browser$Debugger$Expando$Value = {$: 'Value'};
var $elm$browser$Debugger$Expando$blue = A2($elm$html$Html$Attributes$style, 'color', 'rgb(28, 0, 207)');
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$browser$Debugger$Expando$leftPad = function (maybeKey) {
	if (maybeKey.$ === 'Nothing') {
		return _List_Nil;
	} else {
		return _List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'padding-left', '4ch')
			]);
	}
};
var $elm$browser$Debugger$Expando$makeArrow = function (arrow) {
	return A2(
		$elm$html$Html$span,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'color', '#777'),
				A2($elm$html$Html$Attributes$style, 'padding-left', '2ch'),
				A2($elm$html$Html$Attributes$style, 'width', '2ch'),
				A2($elm$html$Html$Attributes$style, 'display', 'inline-block')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(arrow)
			]));
};
var $elm$browser$Debugger$Expando$purple = A2($elm$html$Html$Attributes$style, 'color', 'rgb(136, 19, 145)');
var $elm$browser$Debugger$Expando$lineStarter = F3(
	function (maybeKey, maybeIsClosed, description) {
		var arrow = function () {
			if (maybeIsClosed.$ === 'Nothing') {
				return $elm$browser$Debugger$Expando$makeArrow('');
			} else {
				if (maybeIsClosed.a) {
					return $elm$browser$Debugger$Expando$makeArrow('▸');
				} else {
					return $elm$browser$Debugger$Expando$makeArrow('▾');
				}
			}
		}();
		if (maybeKey.$ === 'Nothing') {
			return A2($elm$core$List$cons, arrow, description);
		} else {
			var key = maybeKey.a;
			return A2(
				$elm$core$List$cons,
				arrow,
				A2(
					$elm$core$List$cons,
					A2(
						$elm$html$Html$span,
						_List_fromArray(
							[$elm$browser$Debugger$Expando$purple]),
						_List_fromArray(
							[
								$elm$html$Html$text(key)
							])),
					A2(
						$elm$core$List$cons,
						$elm$html$Html$text(' = '),
						description)));
		}
	});
var $elm$browser$Debugger$Expando$red = A2($elm$html$Html$Attributes$style, 'color', 'rgb(196, 26, 22)');
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$browser$Debugger$Expando$seqTypeToString = F2(
	function (n, seqType) {
		switch (seqType.$) {
			case 'ListSeq':
				return 'List(' + ($elm$core$String$fromInt(n) + ')');
			case 'SetSeq':
				return 'Set(' + ($elm$core$String$fromInt(n) + ')');
			default:
				return 'Array(' + ($elm$core$String$fromInt(n) + ')');
		}
	});
var $elm$core$String$slice = _String_slice;
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			$elm$core$String$slice,
			-n,
			$elm$core$String$length(string),
			string);
	});
var $elm$browser$Debugger$Expando$elideMiddle = function (str) {
	return ($elm$core$String$length(str) <= 18) ? str : (A2($elm$core$String$left, 8, str) + ('...' + A2($elm$core$String$right, 8, str)));
};
var $elm$core$Dict$isEmpty = function (dict) {
	if (dict.$ === 'RBEmpty_elm_builtin') {
		return true;
	} else {
		return false;
	}
};
var $elm$browser$Debugger$Expando$viewExtraTinyRecord = F3(
	function (length, starter, entries) {
		if (!entries.b) {
			return _Utils_Tuple2(
				length + 1,
				_List_fromArray(
					[
						$elm$html$Html$text('}')
					]));
		} else {
			var field = entries.a;
			var rest = entries.b;
			var nextLength = (length + $elm$core$String$length(field)) + 1;
			if (nextLength > 18) {
				return _Utils_Tuple2(
					length + 2,
					_List_fromArray(
						[
							$elm$html$Html$text('…}')
						]));
			} else {
				var _v1 = A3($elm$browser$Debugger$Expando$viewExtraTinyRecord, nextLength, ',', rest);
				var finalLength = _v1.a;
				var otherHtmls = _v1.b;
				return _Utils_Tuple2(
					finalLength,
					A2(
						$elm$core$List$cons,
						$elm$html$Html$text(starter),
						A2(
							$elm$core$List$cons,
							A2(
								$elm$html$Html$span,
								_List_fromArray(
									[$elm$browser$Debugger$Expando$purple]),
								_List_fromArray(
									[
										$elm$html$Html$text(field)
									])),
							otherHtmls)));
			}
		}
	});
var $elm$browser$Debugger$Expando$viewTinyHelp = function (str) {
	return _Utils_Tuple2(
		$elm$core$String$length(str),
		_List_fromArray(
			[
				$elm$html$Html$text(str)
			]));
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $elm$browser$Debugger$Expando$viewExtraTiny = function (value) {
	if (value.$ === 'Record') {
		var record = value.b;
		return A3(
			$elm$browser$Debugger$Expando$viewExtraTinyRecord,
			0,
			'{',
			$elm$core$Dict$keys(record));
	} else {
		return $elm$browser$Debugger$Expando$viewTiny(value);
	}
};
var $elm$browser$Debugger$Expando$viewTiny = function (value) {
	switch (value.$) {
		case 'S':
			var stringRep = value.a;
			var str = $elm$browser$Debugger$Expando$elideMiddle(stringRep);
			return _Utils_Tuple2(
				$elm$core$String$length(str),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[$elm$browser$Debugger$Expando$red]),
						_List_fromArray(
							[
								$elm$html$Html$text(str)
							]))
					]));
		case 'Primitive':
			var stringRep = value.a;
			return _Utils_Tuple2(
				$elm$core$String$length(stringRep),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[$elm$browser$Debugger$Expando$blue]),
						_List_fromArray(
							[
								$elm$html$Html$text(stringRep)
							]))
					]));
		case 'Sequence':
			var seqType = value.a;
			var valueList = value.c;
			return $elm$browser$Debugger$Expando$viewTinyHelp(
				A2(
					$elm$browser$Debugger$Expando$seqTypeToString,
					$elm$core$List$length(valueList),
					seqType));
		case 'Dictionary':
			var keyValuePairs = value.b;
			return $elm$browser$Debugger$Expando$viewTinyHelp(
				'Dict(' + ($elm$core$String$fromInt(
					$elm$core$List$length(keyValuePairs)) + ')'));
		case 'Record':
			var record = value.b;
			return $elm$browser$Debugger$Expando$viewTinyRecord(record);
		default:
			if (!value.c.b) {
				var maybeName = value.a;
				return $elm$browser$Debugger$Expando$viewTinyHelp(
					A2($elm$core$Maybe$withDefault, 'Unit', maybeName));
			} else {
				var maybeName = value.a;
				var valueList = value.c;
				return $elm$browser$Debugger$Expando$viewTinyHelp(
					function () {
						if (maybeName.$ === 'Nothing') {
							return 'Tuple(' + ($elm$core$String$fromInt(
								$elm$core$List$length(valueList)) + ')');
						} else {
							var name = maybeName.a;
							return name + ' …';
						}
					}());
			}
	}
};
var $elm$browser$Debugger$Expando$viewTinyRecord = function (record) {
	return $elm$core$Dict$isEmpty(record) ? _Utils_Tuple2(
		2,
		_List_fromArray(
			[
				$elm$html$Html$text('{}')
			])) : A3(
		$elm$browser$Debugger$Expando$viewTinyRecordHelp,
		0,
		'{ ',
		$elm$core$Dict$toList(record));
};
var $elm$browser$Debugger$Expando$viewTinyRecordHelp = F3(
	function (length, starter, entries) {
		if (!entries.b) {
			return _Utils_Tuple2(
				length + 2,
				_List_fromArray(
					[
						$elm$html$Html$text(' }')
					]));
		} else {
			var _v1 = entries.a;
			var field = _v1.a;
			var value = _v1.b;
			var rest = entries.b;
			var fieldLen = $elm$core$String$length(field);
			var _v2 = $elm$browser$Debugger$Expando$viewExtraTiny(value);
			var valueLen = _v2.a;
			var valueHtmls = _v2.b;
			var newLength = ((length + fieldLen) + valueLen) + 5;
			if (newLength > 60) {
				return _Utils_Tuple2(
					length + 4,
					_List_fromArray(
						[
							$elm$html$Html$text(', … }')
						]));
			} else {
				var _v3 = A3($elm$browser$Debugger$Expando$viewTinyRecordHelp, newLength, ', ', rest);
				var finalLength = _v3.a;
				var otherHtmls = _v3.b;
				return _Utils_Tuple2(
					finalLength,
					A2(
						$elm$core$List$cons,
						$elm$html$Html$text(starter),
						A2(
							$elm$core$List$cons,
							A2(
								$elm$html$Html$span,
								_List_fromArray(
									[$elm$browser$Debugger$Expando$purple]),
								_List_fromArray(
									[
										$elm$html$Html$text(field)
									])),
							A2(
								$elm$core$List$cons,
								$elm$html$Html$text(' = '),
								A2(
									$elm$core$List$cons,
									A2($elm$html$Html$span, _List_Nil, valueHtmls),
									otherHtmls)))));
			}
		}
	});
var $elm$browser$Debugger$Expando$view = F2(
	function (maybeKey, expando) {
		switch (expando.$) {
			case 'S':
				var stringRep = expando.a;
				return A2(
					$elm$html$Html$div,
					$elm$browser$Debugger$Expando$leftPad(maybeKey),
					A3(
						$elm$browser$Debugger$Expando$lineStarter,
						maybeKey,
						$elm$core$Maybe$Nothing,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[$elm$browser$Debugger$Expando$red]),
								_List_fromArray(
									[
										$elm$html$Html$text(stringRep)
									]))
							])));
			case 'Primitive':
				var stringRep = expando.a;
				return A2(
					$elm$html$Html$div,
					$elm$browser$Debugger$Expando$leftPad(maybeKey),
					A3(
						$elm$browser$Debugger$Expando$lineStarter,
						maybeKey,
						$elm$core$Maybe$Nothing,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[$elm$browser$Debugger$Expando$blue]),
								_List_fromArray(
									[
										$elm$html$Html$text(stringRep)
									]))
							])));
			case 'Sequence':
				var seqType = expando.a;
				var isClosed = expando.b;
				var valueList = expando.c;
				return A4($elm$browser$Debugger$Expando$viewSequence, maybeKey, seqType, isClosed, valueList);
			case 'Dictionary':
				var isClosed = expando.a;
				var keyValuePairs = expando.b;
				return A3($elm$browser$Debugger$Expando$viewDictionary, maybeKey, isClosed, keyValuePairs);
			case 'Record':
				var isClosed = expando.a;
				var valueDict = expando.b;
				return A3($elm$browser$Debugger$Expando$viewRecord, maybeKey, isClosed, valueDict);
			default:
				var maybeName = expando.a;
				var isClosed = expando.b;
				var valueList = expando.c;
				return A4($elm$browser$Debugger$Expando$viewConstructor, maybeKey, maybeName, isClosed, valueList);
		}
	});
var $elm$browser$Debugger$Expando$viewConstructor = F4(
	function (maybeKey, maybeName, isClosed, valueList) {
		var tinyArgs = A2(
			$elm$core$List$map,
			A2($elm$core$Basics$composeL, $elm$core$Tuple$second, $elm$browser$Debugger$Expando$viewExtraTiny),
			valueList);
		var description = function () {
			var _v7 = _Utils_Tuple2(maybeName, tinyArgs);
			if (_v7.a.$ === 'Nothing') {
				if (!_v7.b.b) {
					var _v8 = _v7.a;
					return _List_fromArray(
						[
							$elm$html$Html$text('()')
						]);
				} else {
					var _v9 = _v7.a;
					var _v10 = _v7.b;
					var x = _v10.a;
					var xs = _v10.b;
					return A2(
						$elm$core$List$cons,
						$elm$html$Html$text('( '),
						A2(
							$elm$core$List$cons,
							A2($elm$html$Html$span, _List_Nil, x),
							A3(
								$elm$core$List$foldr,
								F2(
									function (args, rest) {
										return A2(
											$elm$core$List$cons,
											$elm$html$Html$text(', '),
											A2(
												$elm$core$List$cons,
												A2($elm$html$Html$span, _List_Nil, args),
												rest));
									}),
								_List_fromArray(
									[
										$elm$html$Html$text(' )')
									]),
								xs)));
				}
			} else {
				if (!_v7.b.b) {
					var name = _v7.a.a;
					return _List_fromArray(
						[
							$elm$html$Html$text(name)
						]);
				} else {
					var name = _v7.a.a;
					var _v11 = _v7.b;
					var x = _v11.a;
					var xs = _v11.b;
					return A2(
						$elm$core$List$cons,
						$elm$html$Html$text(name + ' '),
						A2(
							$elm$core$List$cons,
							A2($elm$html$Html$span, _List_Nil, x),
							A3(
								$elm$core$List$foldr,
								F2(
									function (args, rest) {
										return A2(
											$elm$core$List$cons,
											$elm$html$Html$text(' '),
											A2(
												$elm$core$List$cons,
												A2($elm$html$Html$span, _List_Nil, args),
												rest));
									}),
								_List_Nil,
								xs)));
				}
			}
		}();
		var _v4 = function () {
			if (!valueList.b) {
				return _Utils_Tuple2(
					$elm$core$Maybe$Nothing,
					A2($elm$html$Html$div, _List_Nil, _List_Nil));
			} else {
				if (!valueList.b.b) {
					var entry = valueList.a;
					switch (entry.$) {
						case 'S':
							return _Utils_Tuple2(
								$elm$core$Maybe$Nothing,
								A2($elm$html$Html$div, _List_Nil, _List_Nil));
						case 'Primitive':
							return _Utils_Tuple2(
								$elm$core$Maybe$Nothing,
								A2($elm$html$Html$div, _List_Nil, _List_Nil));
						case 'Sequence':
							var subValueList = entry.c;
							return _Utils_Tuple2(
								$elm$core$Maybe$Just(isClosed),
								isClosed ? A2($elm$html$Html$div, _List_Nil, _List_Nil) : A2(
									$elm$html$Html$map,
									A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$None, 0),
									$elm$browser$Debugger$Expando$viewSequenceOpen(subValueList)));
						case 'Dictionary':
							var keyValuePairs = entry.b;
							return _Utils_Tuple2(
								$elm$core$Maybe$Just(isClosed),
								isClosed ? A2($elm$html$Html$div, _List_Nil, _List_Nil) : A2(
									$elm$html$Html$map,
									A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$None, 0),
									$elm$browser$Debugger$Expando$viewDictionaryOpen(keyValuePairs)));
						case 'Record':
							var record = entry.b;
							return _Utils_Tuple2(
								$elm$core$Maybe$Just(isClosed),
								isClosed ? A2($elm$html$Html$div, _List_Nil, _List_Nil) : A2(
									$elm$html$Html$map,
									A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$None, 0),
									$elm$browser$Debugger$Expando$viewRecordOpen(record)));
						default:
							var subValueList = entry.c;
							return _Utils_Tuple2(
								$elm$core$Maybe$Just(isClosed),
								isClosed ? A2($elm$html$Html$div, _List_Nil, _List_Nil) : A2(
									$elm$html$Html$map,
									A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$None, 0),
									$elm$browser$Debugger$Expando$viewConstructorOpen(subValueList)));
					}
				} else {
					return _Utils_Tuple2(
						$elm$core$Maybe$Just(isClosed),
						isClosed ? A2($elm$html$Html$div, _List_Nil, _List_Nil) : $elm$browser$Debugger$Expando$viewConstructorOpen(valueList));
				}
			}
		}();
		var maybeIsClosed = _v4.a;
		var openHtml = _v4.b;
		return A2(
			$elm$html$Html$div,
			$elm$browser$Debugger$Expando$leftPad(maybeKey),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick($elm$browser$Debugger$Expando$Toggle)
						]),
					A3($elm$browser$Debugger$Expando$lineStarter, maybeKey, maybeIsClosed, description)),
					openHtml
				]));
	});
var $elm$browser$Debugger$Expando$viewConstructorEntry = F2(
	function (index, value) {
		return A2(
			$elm$html$Html$map,
			A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$None, index),
			A2(
				$elm$browser$Debugger$Expando$view,
				$elm$core$Maybe$Just(
					$elm$core$String$fromInt(index)),
				value));
	});
var $elm$browser$Debugger$Expando$viewConstructorOpen = function (valueList) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		A2($elm$core$List$indexedMap, $elm$browser$Debugger$Expando$viewConstructorEntry, valueList));
};
var $elm$browser$Debugger$Expando$viewDictionary = F3(
	function (maybeKey, isClosed, keyValuePairs) {
		var starter = 'Dict(' + ($elm$core$String$fromInt(
			$elm$core$List$length(keyValuePairs)) + ')');
		return A2(
			$elm$html$Html$div,
			$elm$browser$Debugger$Expando$leftPad(maybeKey),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick($elm$browser$Debugger$Expando$Toggle)
						]),
					A3(
						$elm$browser$Debugger$Expando$lineStarter,
						maybeKey,
						$elm$core$Maybe$Just(isClosed),
						_List_fromArray(
							[
								$elm$html$Html$text(starter)
							]))),
					isClosed ? $elm$html$Html$text('') : $elm$browser$Debugger$Expando$viewDictionaryOpen(keyValuePairs)
				]));
	});
var $elm$browser$Debugger$Expando$viewDictionaryEntry = F2(
	function (index, _v2) {
		var key = _v2.a;
		var value = _v2.b;
		switch (key.$) {
			case 'S':
				var stringRep = key.a;
				return A2(
					$elm$html$Html$map,
					A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$Value, index),
					A2(
						$elm$browser$Debugger$Expando$view,
						$elm$core$Maybe$Just(stringRep),
						value));
			case 'Primitive':
				var stringRep = key.a;
				return A2(
					$elm$html$Html$map,
					A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$Value, index),
					A2(
						$elm$browser$Debugger$Expando$view,
						$elm$core$Maybe$Just(stringRep),
						value));
			default:
				return A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$map,
							A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$Key, index),
							A2(
								$elm$browser$Debugger$Expando$view,
								$elm$core$Maybe$Just('key'),
								key)),
							A2(
							$elm$html$Html$map,
							A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$Value, index),
							A2(
								$elm$browser$Debugger$Expando$view,
								$elm$core$Maybe$Just('value'),
								value))
						]));
		}
	});
var $elm$browser$Debugger$Expando$viewDictionaryOpen = function (keyValuePairs) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		A2($elm$core$List$indexedMap, $elm$browser$Debugger$Expando$viewDictionaryEntry, keyValuePairs));
};
var $elm$browser$Debugger$Expando$viewRecord = F3(
	function (maybeKey, isClosed, record) {
		var _v1 = isClosed ? _Utils_Tuple3(
			$elm$browser$Debugger$Expando$viewTinyRecord(record).b,
			$elm$html$Html$text(''),
			$elm$html$Html$text('')) : _Utils_Tuple3(
			_List_fromArray(
				[
					$elm$html$Html$text('{')
				]),
			$elm$browser$Debugger$Expando$viewRecordOpen(record),
			A2(
				$elm$html$Html$div,
				$elm$browser$Debugger$Expando$leftPad(
					$elm$core$Maybe$Just(_Utils_Tuple0)),
				_List_fromArray(
					[
						$elm$html$Html$text('}')
					])));
		var start = _v1.a;
		var middle = _v1.b;
		var end = _v1.c;
		return A2(
			$elm$html$Html$div,
			$elm$browser$Debugger$Expando$leftPad(maybeKey),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick($elm$browser$Debugger$Expando$Toggle)
						]),
					A3(
						$elm$browser$Debugger$Expando$lineStarter,
						maybeKey,
						$elm$core$Maybe$Just(isClosed),
						start)),
					middle,
					end
				]));
	});
var $elm$browser$Debugger$Expando$viewRecordEntry = function (_v0) {
	var field = _v0.a;
	var value = _v0.b;
	return A2(
		$elm$html$Html$map,
		$elm$browser$Debugger$Expando$Field(field),
		A2(
			$elm$browser$Debugger$Expando$view,
			$elm$core$Maybe$Just(field),
			value));
};
var $elm$browser$Debugger$Expando$viewRecordOpen = function (record) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		A2(
			$elm$core$List$map,
			$elm$browser$Debugger$Expando$viewRecordEntry,
			$elm$core$Dict$toList(record)));
};
var $elm$browser$Debugger$Expando$viewSequence = F4(
	function (maybeKey, seqType, isClosed, valueList) {
		var starter = A2(
			$elm$browser$Debugger$Expando$seqTypeToString,
			$elm$core$List$length(valueList),
			seqType);
		return A2(
			$elm$html$Html$div,
			$elm$browser$Debugger$Expando$leftPad(maybeKey),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick($elm$browser$Debugger$Expando$Toggle)
						]),
					A3(
						$elm$browser$Debugger$Expando$lineStarter,
						maybeKey,
						$elm$core$Maybe$Just(isClosed),
						_List_fromArray(
							[
								$elm$html$Html$text(starter)
							]))),
					isClosed ? $elm$html$Html$text('') : $elm$browser$Debugger$Expando$viewSequenceOpen(valueList)
				]));
	});
var $elm$browser$Debugger$Expando$viewSequenceOpen = function (values) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		A2($elm$core$List$indexedMap, $elm$browser$Debugger$Expando$viewConstructorEntry, values));
};
var $elm$browser$Debugger$Main$viewExpando = F3(
	function (expandoMsg, expandoModel, layout) {
		var block = $elm$browser$Debugger$Main$toMouseBlocker(layout);
		var _v0 = $elm$browser$Debugger$Main$toExpandoPercents(layout);
		var w = _v0.a;
		var h = _v0.b;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'block'),
					A2($elm$html$Html$Attributes$style, 'width', 'calc(' + (w + ' - 4em)')),
					A2($elm$html$Html$Attributes$style, 'height', 'calc(' + (h + ' - 4em)')),
					A2($elm$html$Html$Attributes$style, 'padding', '2em'),
					A2($elm$html$Html$Attributes$style, 'margin', '0'),
					A2($elm$html$Html$Attributes$style, 'overflow', 'auto'),
					A2($elm$html$Html$Attributes$style, 'pointer-events', block),
					A2($elm$html$Html$Attributes$style, '-webkit-user-select', block),
					A2($elm$html$Html$Attributes$style, '-moz-user-select', block),
					A2($elm$html$Html$Attributes$style, '-ms-user-select', block),
					A2($elm$html$Html$Attributes$style, 'user-select', block)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'color', '#ccc'),
							A2($elm$html$Html$Attributes$style, 'padding', '0 0 1em 0')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('-- MESSAGE')
						])),
					A2(
					$elm$html$Html$map,
					$elm$browser$Debugger$Main$TweakExpandoMsg,
					A2($elm$browser$Debugger$Expando$view, $elm$core$Maybe$Nothing, expandoMsg)),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'color', '#ccc'),
							A2($elm$html$Html$Attributes$style, 'padding', '1em 0')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('-- MODEL')
						])),
					A2(
					$elm$html$Html$map,
					$elm$browser$Debugger$Main$TweakExpandoModel,
					A2($elm$browser$Debugger$Expando$view, $elm$core$Maybe$Nothing, expandoModel))
				]));
	});
var $elm$browser$Debugger$Main$Jump = function (a) {
	return {$: 'Jump', a: a};
};
var $elm$virtual_dom$VirtualDom$lazy = _VirtualDom_lazy;
var $elm$html$Html$Lazy$lazy = $elm$virtual_dom$VirtualDom$lazy;
var $elm$browser$Debugger$Main$toHistoryPercents = function (layout) {
	if (layout.$ === 'Horizontal') {
		var x = layout.b;
		return _Utils_Tuple2(
			$elm$browser$Debugger$Main$toPercent(x),
			'100%');
	} else {
		var y = layout.c;
		return _Utils_Tuple2(
			'100%',
			$elm$browser$Debugger$Main$toPercent(1 - y));
	}
};
var $elm$virtual_dom$VirtualDom$lazy3 = _VirtualDom_lazy3;
var $elm$html$Html$Lazy$lazy3 = $elm$virtual_dom$VirtualDom$lazy3;
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$browser$Debugger$History$idForMessageIndex = function (index) {
	return 'msg-' + $elm$core$String$fromInt(index);
};
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $elm$browser$Debugger$History$viewMessage = F3(
	function (currentIndex, index, msg) {
		var messageName = _Debugger_messageToString(msg);
		var className = _Utils_eq(currentIndex, index) ? 'elm-debugger-entry elm-debugger-entry-selected' : 'elm-debugger-entry';
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id(
					$elm$browser$Debugger$History$idForMessageIndex(index)),
					$elm$html$Html$Attributes$class(className),
					$elm$html$Html$Events$onClick(index)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$title(messageName),
							$elm$html$Html$Attributes$class('elm-debugger-entry-content')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(messageName)
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('elm-debugger-entry-index')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							$elm$core$String$fromInt(index))
						]))
				]));
	});
var $elm$browser$Debugger$History$consMsg = F3(
	function (currentIndex, msg, _v0) {
		var index = _v0.a;
		var rest = _v0.b;
		return _Utils_Tuple2(
			index + 1,
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					$elm$core$String$fromInt(index),
					A4($elm$html$Html$Lazy$lazy3, $elm$browser$Debugger$History$viewMessage, currentIndex, index, msg)),
				rest));
	});
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$Keyed$node = $elm$virtual_dom$VirtualDom$keyedNode;
var $elm$browser$Debugger$History$maxSnapshotSize = 31;
var $elm$browser$Debugger$History$showMoreButton = function (numMessages) {
	var nextIndex = (numMessages - 1) - ($elm$browser$Debugger$History$maxSnapshotSize * 2);
	var labelText = 'View more messages';
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('elm-debugger-entry'),
				$elm$html$Html$Events$onClick(nextIndex)
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$title(labelText),
						$elm$html$Html$Attributes$class('elm-debugger-entry-content')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(labelText)
					])),
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('elm-debugger-entry-index')
					]),
				_List_Nil)
			]));
};
var $elm$browser$Debugger$History$styles = A3(
	$elm$html$Html$node,
	'style',
	_List_Nil,
	_List_fromArray(
		[
			$elm$html$Html$text('\n\n.elm-debugger-entry {\n  cursor: pointer;\n  width: 100%;\n  box-sizing: border-box;\n  padding: 8px;\n}\n\n.elm-debugger-entry:hover {\n  background-color: rgb(41, 41, 41);\n}\n\n.elm-debugger-entry-selected, .elm-debugger-entry-selected:hover {\n  background-color: rgb(10, 10, 10);\n}\n\n.elm-debugger-entry-content {\n  width: calc(100% - 40px);\n  padding: 0 5px;\n  box-sizing: border-box;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  display: inline-block;\n}\n\n.elm-debugger-entry-index {\n  color: #666;\n  width: 40px;\n  text-align: right;\n  display: block;\n  float: right;\n}\n\n')
		]));
var $elm$core$Basics$ge = _Utils_ge;
var $elm$browser$Debugger$History$viewSnapshot = F3(
	function (selectedIndex, index, _v0) {
		var messages = _v0.messages;
		return A3(
			$elm$html$Html$Keyed$node,
			'div',
			_List_Nil,
			A3(
				$elm$core$Array$foldr,
				$elm$browser$Debugger$History$consMsg(selectedIndex),
				_Utils_Tuple2(index, _List_Nil),
				messages).b);
	});
var $elm$browser$Debugger$History$consSnapshot = F3(
	function (selectedIndex, snapshot, _v0) {
		var index = _v0.a;
		var rest = _v0.b;
		var nextIndex = index + $elm$core$Array$length(snapshot.messages);
		var selectedIndexHelp = ((_Utils_cmp(nextIndex, selectedIndex) > 0) && (_Utils_cmp(selectedIndex, index) > -1)) ? selectedIndex : (-1);
		return _Utils_Tuple2(
			nextIndex,
			A2(
				$elm$core$List$cons,
				A4($elm$html$Html$Lazy$lazy3, $elm$browser$Debugger$History$viewSnapshot, selectedIndexHelp, index, snapshot),
				rest));
	});
var $elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var $elm$core$Array$foldl = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldl, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldl,
			func,
			A3($elm$core$Elm$JsArray$foldl, helper, baseCase, tree),
			tail);
	});
var $elm$browser$Debugger$History$viewAllSnapshots = F3(
	function (selectedIndex, startIndex, snapshots) {
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			A3(
				$elm$core$Array$foldl,
				$elm$browser$Debugger$History$consSnapshot(selectedIndex),
				_Utils_Tuple2(startIndex, _List_Nil),
				snapshots).b);
	});
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $elm$core$Elm$JsArray$appendN = _JsArray_appendN;
var $elm$core$Elm$JsArray$slice = _JsArray_slice;
var $elm$core$Array$appendHelpBuilder = F2(
	function (tail, builder) {
		var tailLen = $elm$core$Elm$JsArray$length(tail);
		var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(builder.tail)) - tailLen;
		var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, builder.tail, tail);
		return (notAppended < 0) ? {
			nodeList: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.nodeList),
			nodeListSize: builder.nodeListSize + 1,
			tail: A3($elm$core$Elm$JsArray$slice, notAppended, tailLen, tail)
		} : ((!notAppended) ? {
			nodeList: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.nodeList),
			nodeListSize: builder.nodeListSize + 1,
			tail: $elm$core$Elm$JsArray$empty
		} : {nodeList: builder.nodeList, nodeListSize: builder.nodeListSize, tail: appended});
	});
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$Array$sliceLeft = F2(
	function (from, array) {
		var len = array.a;
		var tree = array.c;
		var tail = array.d;
		if (!from) {
			return array;
		} else {
			if (_Utils_cmp(
				from,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					len - from,
					$elm$core$Array$shiftStep,
					$elm$core$Elm$JsArray$empty,
					A3(
						$elm$core$Elm$JsArray$slice,
						from - $elm$core$Array$tailIndex(len),
						$elm$core$Elm$JsArray$length(tail),
						tail));
			} else {
				var skipNodes = (from / $elm$core$Array$branchFactor) | 0;
				var helper = F2(
					function (node, acc) {
						if (node.$ === 'SubTree') {
							var subTree = node.a;
							return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
						} else {
							var leaf = node.a;
							return A2($elm$core$List$cons, leaf, acc);
						}
					});
				var leafNodes = A3(
					$elm$core$Elm$JsArray$foldr,
					helper,
					_List_fromArray(
						[tail]),
					tree);
				var nodesToInsert = A2($elm$core$List$drop, skipNodes, leafNodes);
				if (!nodesToInsert.b) {
					return $elm$core$Array$empty;
				} else {
					var head = nodesToInsert.a;
					var rest = nodesToInsert.b;
					var firstSlice = from - (skipNodes * $elm$core$Array$branchFactor);
					var initialBuilder = {
						nodeList: _List_Nil,
						nodeListSize: 0,
						tail: A3(
							$elm$core$Elm$JsArray$slice,
							firstSlice,
							$elm$core$Elm$JsArray$length(head),
							head)
					};
					return A2(
						$elm$core$Array$builderToArray,
						true,
						A3($elm$core$List$foldl, $elm$core$Array$appendHelpBuilder, initialBuilder, rest));
				}
			}
		}
	});
var $elm$core$Array$fetchNewTail = F4(
	function (shift, end, treeEnd, tree) {
		fetchNewTail:
		while (true) {
			var pos = $elm$core$Array$bitMask & (treeEnd >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var sub = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$end = end,
					$temp$treeEnd = treeEnd,
					$temp$tree = sub;
				shift = $temp$shift;
				end = $temp$end;
				treeEnd = $temp$treeEnd;
				tree = $temp$tree;
				continue fetchNewTail;
			} else {
				var values = _v0.a;
				return A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, values);
			}
		}
	});
var $elm$core$Array$hoistTree = F3(
	function (oldShift, newShift, tree) {
		hoistTree:
		while (true) {
			if ((_Utils_cmp(oldShift, newShift) < 1) || (!$elm$core$Elm$JsArray$length(tree))) {
				return tree;
			} else {
				var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, 0, tree);
				if (_v0.$ === 'SubTree') {
					var sub = _v0.a;
					var $temp$oldShift = oldShift - $elm$core$Array$shiftStep,
						$temp$newShift = newShift,
						$temp$tree = sub;
					oldShift = $temp$oldShift;
					newShift = $temp$newShift;
					tree = $temp$tree;
					continue hoistTree;
				} else {
					return tree;
				}
			}
		}
	});
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$sliceTree = F3(
	function (shift, endIdx, tree) {
		var lastPos = $elm$core$Array$bitMask & (endIdx >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, lastPos, tree);
		if (_v0.$ === 'SubTree') {
			var sub = _v0.a;
			var newSub = A3($elm$core$Array$sliceTree, shift - $elm$core$Array$shiftStep, endIdx, sub);
			return (!$elm$core$Elm$JsArray$length(newSub)) ? A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree) : A3(
				$elm$core$Elm$JsArray$unsafeSet,
				lastPos,
				$elm$core$Array$SubTree(newSub),
				A3($elm$core$Elm$JsArray$slice, 0, lastPos + 1, tree));
		} else {
			return A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree);
		}
	});
var $elm$core$Array$sliceRight = F2(
	function (end, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		if (_Utils_eq(end, len)) {
			return array;
		} else {
			if (_Utils_cmp(
				end,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					startShift,
					tree,
					A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, tail));
			} else {
				var endIdx = $elm$core$Array$tailIndex(end);
				var depth = $elm$core$Basics$floor(
					A2(
						$elm$core$Basics$logBase,
						$elm$core$Array$branchFactor,
						A2($elm$core$Basics$max, 1, endIdx - 1)));
				var newShift = A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep);
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					newShift,
					A3(
						$elm$core$Array$hoistTree,
						startShift,
						newShift,
						A3($elm$core$Array$sliceTree, startShift, endIdx, tree)),
					A4($elm$core$Array$fetchNewTail, startShift, end, endIdx, tree));
			}
		}
	});
var $elm$core$Array$translateIndex = F2(
	function (index, _v0) {
		var len = _v0.a;
		var posIndex = (index < 0) ? (len + index) : index;
		return (posIndex < 0) ? 0 : ((_Utils_cmp(posIndex, len) > 0) ? len : posIndex);
	});
var $elm$core$Array$slice = F3(
	function (from, to, array) {
		var correctTo = A2($elm$core$Array$translateIndex, to, array);
		var correctFrom = A2($elm$core$Array$translateIndex, from, array);
		return (_Utils_cmp(correctFrom, correctTo) > 0) ? $elm$core$Array$empty : A2(
			$elm$core$Array$sliceLeft,
			correctFrom,
			A2($elm$core$Array$sliceRight, correctTo, array));
	});
var $elm$browser$Debugger$History$viewRecentSnapshots = F3(
	function (selectedIndex, recentMessagesNum, snapshots) {
		var messagesToFill = $elm$browser$Debugger$History$maxSnapshotSize - recentMessagesNum;
		var arrayLength = $elm$core$Array$length(snapshots);
		var snapshotsToRender = function () {
			var _v0 = _Utils_Tuple2(
				A2($elm$core$Array$get, arrayLength - 2, snapshots),
				A2($elm$core$Array$get, arrayLength - 1, snapshots));
			if ((_v0.a.$ === 'Just') && (_v0.b.$ === 'Just')) {
				var fillerSnapshot = _v0.a.a;
				var recentSnapshot = _v0.b.a;
				return $elm$core$Array$fromList(
					_List_fromArray(
						[
							{
							messages: A3($elm$core$Array$slice, 0, messagesToFill, fillerSnapshot.messages),
							model: fillerSnapshot.model
						},
							recentSnapshot
						]));
			} else {
				return snapshots;
			}
		}();
		var startingIndex = ((arrayLength * $elm$browser$Debugger$History$maxSnapshotSize) - $elm$browser$Debugger$History$maxSnapshotSize) - messagesToFill;
		return A3($elm$browser$Debugger$History$viewAllSnapshots, selectedIndex, startingIndex, snapshotsToRender);
	});
var $elm$browser$Debugger$History$view = F2(
	function (maybeIndex, _v0) {
		var snapshots = _v0.snapshots;
		var recent = _v0.recent;
		var numMessages = _v0.numMessages;
		var recentMessageStartIndex = numMessages - recent.numMessages;
		var index = A2($elm$core$Maybe$withDefault, -1, maybeIndex);
		var newStuff = A3(
			$elm$html$Html$Keyed$node,
			'div',
			_List_Nil,
			A3(
				$elm$core$List$foldr,
				$elm$browser$Debugger$History$consMsg(index),
				_Utils_Tuple2(recentMessageStartIndex, _List_Nil),
				recent.messages).b);
		var onlyRenderRecentMessages = (!_Utils_eq(index, -1)) || ($elm$core$Array$length(snapshots) < 2);
		var oldStuff = onlyRenderRecentMessages ? A4($elm$html$Html$Lazy$lazy3, $elm$browser$Debugger$History$viewAllSnapshots, index, 0, snapshots) : A4($elm$html$Html$Lazy$lazy3, $elm$browser$Debugger$History$viewRecentSnapshots, index, recent.numMessages, snapshots);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('elm-debugger-sidebar'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
					A2($elm$html$Html$Attributes$style, 'height', 'calc(100% - 72px)')
				]),
			A2(
				$elm$core$List$cons,
				$elm$browser$Debugger$History$styles,
				A2(
					$elm$core$List$cons,
					newStuff,
					A2(
						$elm$core$List$cons,
						oldStuff,
						onlyRenderRecentMessages ? _List_Nil : _List_fromArray(
							[
								$elm$browser$Debugger$History$showMoreButton(numMessages)
							])))));
	});
var $elm$browser$Debugger$Main$SwapLayout = {$: 'SwapLayout'};
var $elm$browser$Debugger$Main$toHistoryIcon = function (layout) {
	if (layout.$ === 'Horizontal') {
		return 'M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-10a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3z M13 3h-10a1 1 0 0 0-1 1v5h12v-5a1 1 0 0 0-1-1z M14 10h-12v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1z';
	} else {
		return 'M0 4a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-10a3 3 0 0 1-3-3z M2 4v8a1 1 0 0 0 1 1h2v-10h-2a1 1 0 0 0-1 1z M6 3v10h7a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1z';
	}
};
var $elm$browser$Debugger$Main$icon = function (path) {
	return A4(
		$elm$virtual_dom$VirtualDom$nodeNS,
		'http://www.w3.org/2000/svg',
		'svg',
		_List_fromArray(
			[
				A2($elm$virtual_dom$VirtualDom$attribute, 'viewBox', '0 0 16 16'),
				A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns', 'http://www.w3.org/2000/svg'),
				A2($elm$virtual_dom$VirtualDom$attribute, 'fill', 'currentColor'),
				A2($elm$virtual_dom$VirtualDom$attribute, 'width', '16px'),
				A2($elm$virtual_dom$VirtualDom$attribute, 'height', '16px')
			]),
		_List_fromArray(
			[
				A4(
				$elm$virtual_dom$VirtualDom$nodeNS,
				'http://www.w3.org/2000/svg',
				'path',
				_List_fromArray(
					[
						A2($elm$virtual_dom$VirtualDom$attribute, 'd', path)
					]),
				_List_Nil)
			]));
};
var $elm$browser$Debugger$Main$viewHistoryButton = F3(
	function (label, msg, path) {
		return A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'row'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
					A2($elm$html$Html$Attributes$style, 'background', 'none'),
					A2($elm$html$Html$Attributes$style, 'border', 'none'),
					A2($elm$html$Html$Attributes$style, 'color', 'inherit'),
					A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
					$elm$html$Html$Events$onClick(msg)
				]),
			_List_fromArray(
				[
					$elm$browser$Debugger$Main$icon(path),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'padding-left', '6px')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(label)
						]))
				]));
	});
var $elm$browser$Debugger$Main$viewHistoryOptions = function (layout) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'height', '36px'),
				A2($elm$html$Html$Attributes$style, 'display', 'flex'),
				A2($elm$html$Html$Attributes$style, 'flex-direction', 'row'),
				A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
				A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
				A2($elm$html$Html$Attributes$style, 'background-color', 'rgb(50, 50, 50)')
			]),
		_List_fromArray(
			[
				A3(
				$elm$browser$Debugger$Main$viewHistoryButton,
				'Swap Layout',
				$elm$browser$Debugger$Main$SwapLayout,
				$elm$browser$Debugger$Main$toHistoryIcon(layout)),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'flex-direction', 'row'),
						A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
						A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between')
					]),
				_List_fromArray(
					[
						A3($elm$browser$Debugger$Main$viewHistoryButton, 'Import', $elm$browser$Debugger$Main$Import, 'M5 1a1 1 0 0 1 0 2h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1a1 1 0 0 1 2 0a3 3 0 0 1-3 3h-10a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3z M10 2a1 1 0 0 0 -2 0v6a1 1 0 0 0 1 1h6a1 1 0 0 0 0-2h-3.586l4.293-4.293a1 1 0 0 0-1.414-1.414l-4.293 4.293z'),
						A3($elm$browser$Debugger$Main$viewHistoryButton, 'Export', $elm$browser$Debugger$Main$Export, 'M5 1a1 1 0 0 1 0 2h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1 a1 1 0 0 1 2 0a3 3 0 0 1-3 3h-10a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3z M9 3a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-3.586l-5.293 5.293 a1 1 0 0 1-1.414-1.414l5.293 -5.293z')
					]))
			]));
};
var $elm$browser$Debugger$Main$SliderJump = function (a) {
	return {$: 'SliderJump', a: a};
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$browser$Debugger$Main$isPlaying = function (maybeIndex) {
	if (maybeIndex.$ === 'Nothing') {
		return true;
	} else {
		return false;
	}
};
var $elm$html$Html$Attributes$max = $elm$html$Html$Attributes$stringProperty('max');
var $elm$html$Html$Attributes$min = $elm$html$Html$Attributes$stringProperty('min');
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$core$String$toInt = _String_toInt;
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $elm$browser$Debugger$Main$viewPlayButton = function (playing) {
	return A2(
		$elm$html$Html$button,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'background', '#1293D8'),
				A2($elm$html$Html$Attributes$style, 'border', 'none'),
				A2($elm$html$Html$Attributes$style, 'color', 'white'),
				A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
				A2($elm$html$Html$Attributes$style, 'width', '36px'),
				A2($elm$html$Html$Attributes$style, 'height', '36px'),
				$elm$html$Html$Events$onClick($elm$browser$Debugger$Main$Resume)
			]),
		_List_fromArray(
			[
				playing ? $elm$browser$Debugger$Main$icon('M2 2h4v12h-4v-12z M10 2h4v12h-4v-12z') : $elm$browser$Debugger$Main$icon('M2 2l12 7l-12 7z')
			]));
};
var $elm$browser$Debugger$Main$viewHistorySlider = F2(
	function (history, maybeIndex) {
		var lastIndex = $elm$browser$Debugger$History$size(history) - 1;
		var selectedIndex = A2($elm$core$Maybe$withDefault, lastIndex, maybeIndex);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'row'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'height', '36px'),
					A2($elm$html$Html$Attributes$style, 'background-color', 'rgb(50, 50, 50)')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$Lazy$lazy,
					$elm$browser$Debugger$Main$viewPlayButton,
					$elm$browser$Debugger$Main$isPlaying(maybeIndex)),
					A2(
					$elm$html$Html$input,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$type_('range'),
							A2($elm$html$Html$Attributes$style, 'width', 'calc(100% - 56px)'),
							A2($elm$html$Html$Attributes$style, 'height', '36px'),
							A2($elm$html$Html$Attributes$style, 'margin', '0 10px'),
							$elm$html$Html$Attributes$min('0'),
							$elm$html$Html$Attributes$max(
							$elm$core$String$fromInt(lastIndex)),
							$elm$html$Html$Attributes$value(
							$elm$core$String$fromInt(selectedIndex)),
							$elm$html$Html$Events$onInput(
							A2(
								$elm$core$Basics$composeR,
								$elm$core$String$toInt,
								A2(
									$elm$core$Basics$composeR,
									$elm$core$Maybe$withDefault(lastIndex),
									$elm$browser$Debugger$Main$SliderJump)))
						]),
					_List_Nil)
				]));
	});
var $elm$browser$Debugger$Main$viewHistory = F3(
	function (maybeIndex, history, layout) {
		var block = $elm$browser$Debugger$Main$toMouseBlocker(layout);
		var _v0 = $elm$browser$Debugger$Main$toHistoryPercents(layout);
		var w = _v0.a;
		var h = _v0.b;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'width', w),
					A2($elm$html$Html$Attributes$style, 'height', h),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'color', '#DDDDDD'),
					A2($elm$html$Html$Attributes$style, 'background-color', 'rgb(61, 61, 61)'),
					A2($elm$html$Html$Attributes$style, 'pointer-events', block),
					A2($elm$html$Html$Attributes$style, 'user-select', block)
				]),
			_List_fromArray(
				[
					A2($elm$browser$Debugger$Main$viewHistorySlider, history, maybeIndex),
					A2(
					$elm$html$Html$map,
					$elm$browser$Debugger$Main$Jump,
					A2($elm$browser$Debugger$History$view, maybeIndex, history)),
					A2($elm$html$Html$Lazy$lazy, $elm$browser$Debugger$Main$viewHistoryOptions, layout)
				]));
	});
var $elm$browser$Debugger$Main$popoutView = function (model) {
	var maybeIndex = function () {
		var _v0 = model.state;
		if (_v0.$ === 'Running') {
			return $elm$core$Maybe$Nothing;
		} else {
			var index = _v0.a;
			return $elm$core$Maybe$Just(index);
		}
	}();
	var historyToRender = $elm$browser$Debugger$Main$cachedHistory(model);
	return A3(
		$elm$html$Html$node,
		'body',
		_Utils_ap(
			$elm$browser$Debugger$Main$toDragListeners(model.layout),
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'margin', '0'),
					A2($elm$html$Html$Attributes$style, 'padding', '0'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'font-family', 'monospace'),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2(
					$elm$html$Html$Attributes$style,
					'flex-direction',
					$elm$browser$Debugger$Main$toFlexDirection(model.layout))
				])),
		_List_fromArray(
			[
				A3($elm$browser$Debugger$Main$viewHistory, maybeIndex, historyToRender, model.layout),
				$elm$browser$Debugger$Main$viewDragZone(model.layout),
				A3($elm$browser$Debugger$Main$viewExpando, model.expandoMsg, model.expandoModel, model.layout)
			]));
};
var $elm$browser$Debugger$Overlay$BlockAll = {$: 'BlockAll'};
var $elm$browser$Debugger$Overlay$toBlockerType = F2(
	function (isPaused, state) {
		switch (state.$) {
			case 'None':
				return isPaused ? $elm$browser$Debugger$Overlay$BlockAll : $elm$browser$Debugger$Overlay$BlockNone;
			case 'BadMetadata':
				return $elm$browser$Debugger$Overlay$BlockMost;
			case 'BadImport':
				return $elm$browser$Debugger$Overlay$BlockMost;
			default:
				return $elm$browser$Debugger$Overlay$BlockMost;
		}
	});
var $elm$browser$Debugger$Main$toBlockerType = function (model) {
	return A2(
		$elm$browser$Debugger$Overlay$toBlockerType,
		$elm$browser$Debugger$Main$isPaused(model.state),
		model.overlay);
};
var $elm$browser$Debugger$Main$Horizontal = F3(
	function (a, b, c) {
		return {$: 'Horizontal', a: a, b: b, c: c};
	});
var $elm$browser$Debugger$Main$Running = function (a) {
	return {$: 'Running', a: a};
};
var $elm$browser$Debugger$Main$Static = {$: 'Static'};
var $elm$browser$Debugger$Metadata$Error = F2(
	function (message, problems) {
		return {message: message, problems: problems};
	});
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $elm$browser$Debugger$Metadata$Metadata = F2(
	function (versions, types) {
		return {types: types, versions: versions};
	});
var $elm$browser$Debugger$Metadata$Types = F3(
	function (message, aliases, unions) {
		return {aliases: aliases, message: message, unions: unions};
	});
var $elm$browser$Debugger$Metadata$Alias = F2(
	function (args, tipe) {
		return {args: args, tipe: tipe};
	});
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$browser$Debugger$Metadata$decodeAlias = A3(
	$elm$json$Json$Decode$map2,
	$elm$browser$Debugger$Metadata$Alias,
	A2(
		$elm$json$Json$Decode$field,
		'args',
		$elm$json$Json$Decode$list($elm$json$Json$Decode$string)),
	A2($elm$json$Json$Decode$field, 'type', $elm$json$Json$Decode$string));
var $elm$browser$Debugger$Metadata$Union = F2(
	function (args, tags) {
		return {args: args, tags: tags};
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var $elm$json$Json$Decode$dict = function (decoder) {
	return A2(
		$elm$json$Json$Decode$map,
		$elm$core$Dict$fromList,
		$elm$json$Json$Decode$keyValuePairs(decoder));
};
var $elm$browser$Debugger$Metadata$decodeUnion = A3(
	$elm$json$Json$Decode$map2,
	$elm$browser$Debugger$Metadata$Union,
	A2(
		$elm$json$Json$Decode$field,
		'args',
		$elm$json$Json$Decode$list($elm$json$Json$Decode$string)),
	A2(
		$elm$json$Json$Decode$field,
		'tags',
		$elm$json$Json$Decode$dict(
			$elm$json$Json$Decode$list($elm$json$Json$Decode$string))));
var $elm$json$Json$Decode$map3 = _Json_map3;
var $elm$browser$Debugger$Metadata$decodeTypes = A4(
	$elm$json$Json$Decode$map3,
	$elm$browser$Debugger$Metadata$Types,
	A2($elm$json$Json$Decode$field, 'message', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$field,
		'aliases',
		$elm$json$Json$Decode$dict($elm$browser$Debugger$Metadata$decodeAlias)),
	A2(
		$elm$json$Json$Decode$field,
		'unions',
		$elm$json$Json$Decode$dict($elm$browser$Debugger$Metadata$decodeUnion)));
var $elm$browser$Debugger$Metadata$Versions = function (elm) {
	return {elm: elm};
};
var $elm$browser$Debugger$Metadata$decodeVersions = A2(
	$elm$json$Json$Decode$map,
	$elm$browser$Debugger$Metadata$Versions,
	A2($elm$json$Json$Decode$field, 'elm', $elm$json$Json$Decode$string));
var $elm$browser$Debugger$Metadata$decoder = A3(
	$elm$json$Json$Decode$map2,
	$elm$browser$Debugger$Metadata$Metadata,
	A2($elm$json$Json$Decode$field, 'versions', $elm$browser$Debugger$Metadata$decodeVersions),
	A2($elm$json$Json$Decode$field, 'types', $elm$browser$Debugger$Metadata$decodeTypes));
var $elm$browser$Debugger$Metadata$ProblemType = F2(
	function (name, problems) {
		return {name: name, problems: problems};
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$core$String$contains = _String_contains;
var $elm$browser$Debugger$Metadata$hasProblem = F2(
	function (tipe, _v0) {
		var problem = _v0.a;
		var token = _v0.b;
		return A2($elm$core$String$contains, token, tipe) ? $elm$core$Maybe$Just(problem) : $elm$core$Maybe$Nothing;
	});
var $elm$browser$Debugger$Metadata$Decoder = {$: 'Decoder'};
var $elm$browser$Debugger$Metadata$Function = {$: 'Function'};
var $elm$browser$Debugger$Metadata$Process = {$: 'Process'};
var $elm$browser$Debugger$Metadata$Program = {$: 'Program'};
var $elm$browser$Debugger$Metadata$Request = {$: 'Request'};
var $elm$browser$Debugger$Metadata$Socket = {$: 'Socket'};
var $elm$browser$Debugger$Metadata$Task = {$: 'Task'};
var $elm$browser$Debugger$Metadata$VirtualDom = {$: 'VirtualDom'};
var $elm$browser$Debugger$Metadata$problemTable = _List_fromArray(
	[
		_Utils_Tuple2($elm$browser$Debugger$Metadata$Function, '->'),
		_Utils_Tuple2($elm$browser$Debugger$Metadata$Decoder, 'Json.Decode.Decoder'),
		_Utils_Tuple2($elm$browser$Debugger$Metadata$Task, 'Task.Task'),
		_Utils_Tuple2($elm$browser$Debugger$Metadata$Process, 'Process.Id'),
		_Utils_Tuple2($elm$browser$Debugger$Metadata$Socket, 'WebSocket.LowLevel.WebSocket'),
		_Utils_Tuple2($elm$browser$Debugger$Metadata$Request, 'Http.Request'),
		_Utils_Tuple2($elm$browser$Debugger$Metadata$Program, 'Platform.Program'),
		_Utils_Tuple2($elm$browser$Debugger$Metadata$VirtualDom, 'VirtualDom.Node'),
		_Utils_Tuple2($elm$browser$Debugger$Metadata$VirtualDom, 'VirtualDom.Attribute')
	]);
var $elm$browser$Debugger$Metadata$findProblems = function (tipe) {
	return A2(
		$elm$core$List$filterMap,
		$elm$browser$Debugger$Metadata$hasProblem(tipe),
		$elm$browser$Debugger$Metadata$problemTable);
};
var $elm$browser$Debugger$Metadata$collectBadAliases = F3(
	function (name, _v0, list) {
		var tipe = _v0.tipe;
		var _v1 = $elm$browser$Debugger$Metadata$findProblems(tipe);
		if (!_v1.b) {
			return list;
		} else {
			var problems = _v1;
			return A2(
				$elm$core$List$cons,
				A2($elm$browser$Debugger$Metadata$ProblemType, name, problems),
				list);
		}
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$core$Dict$values = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $elm$browser$Debugger$Metadata$collectBadUnions = F3(
	function (name, _v0, list) {
		var tags = _v0.tags;
		var _v1 = A2(
			$elm$core$List$concatMap,
			$elm$browser$Debugger$Metadata$findProblems,
			$elm$core$List$concat(
				$elm$core$Dict$values(tags)));
		if (!_v1.b) {
			return list;
		} else {
			var problems = _v1;
			return A2(
				$elm$core$List$cons,
				A2($elm$browser$Debugger$Metadata$ProblemType, name, problems),
				list);
		}
	});
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$browser$Debugger$Metadata$isPortable = function (_v0) {
	var types = _v0.types;
	var badAliases = A3($elm$core$Dict$foldl, $elm$browser$Debugger$Metadata$collectBadAliases, _List_Nil, types.aliases);
	var _v1 = A3($elm$core$Dict$foldl, $elm$browser$Debugger$Metadata$collectBadUnions, badAliases, types.unions);
	if (!_v1.b) {
		return $elm$core$Maybe$Nothing;
	} else {
		var problems = _v1;
		return $elm$core$Maybe$Just(
			A2($elm$browser$Debugger$Metadata$Error, types.message, problems));
	}
};
var $elm$browser$Debugger$Metadata$decode = function (value) {
	var _v0 = A2($elm$json$Json$Decode$decodeValue, $elm$browser$Debugger$Metadata$decoder, value);
	if (_v0.$ === 'Err') {
		return $elm$core$Result$Err(
			A2($elm$browser$Debugger$Metadata$Error, 'The compiler is generating bad metadata. This is a compiler bug!', _List_Nil));
	} else {
		var metadata = _v0.a;
		var _v1 = $elm$browser$Debugger$Metadata$isPortable(metadata);
		if (_v1.$ === 'Nothing') {
			return $elm$core$Result$Ok(metadata);
		} else {
			var error = _v1.a;
			return $elm$core$Result$Err(error);
		}
	}
};
var $elm$browser$Debugger$History$History = F3(
	function (snapshots, recent, numMessages) {
		return {numMessages: numMessages, recent: recent, snapshots: snapshots};
	});
var $elm$browser$Debugger$History$RecentHistory = F3(
	function (model, messages, numMessages) {
		return {messages: messages, model: model, numMessages: numMessages};
	});
var $elm$browser$Debugger$History$empty = function (model) {
	return A3(
		$elm$browser$Debugger$History$History,
		$elm$core$Array$empty,
		A3($elm$browser$Debugger$History$RecentHistory, model, _List_Nil, 0),
		0);
};
var $elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				A2(func, key, value),
				A2($elm$core$Dict$map, func, left),
				A2($elm$core$Dict$map, func, right));
		}
	});
var $elm$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var left = dict.d;
				var right = dict.e;
				var $temp$n = A2($elm$core$Dict$sizeHelp, n + 1, right),
					$temp$dict = left;
				n = $temp$n;
				dict = $temp$dict;
				continue sizeHelp;
			}
		}
	});
var $elm$core$Dict$size = function (dict) {
	return A2($elm$core$Dict$sizeHelp, 0, dict);
};
var $elm$browser$Debugger$Expando$initHelp = F2(
	function (isOuter, expando) {
		switch (expando.$) {
			case 'S':
				return expando;
			case 'Primitive':
				return expando;
			case 'Sequence':
				var seqType = expando.a;
				var isClosed = expando.b;
				var items = expando.c;
				return isOuter ? A3(
					$elm$browser$Debugger$Expando$Sequence,
					seqType,
					false,
					A2(
						$elm$core$List$map,
						$elm$browser$Debugger$Expando$initHelp(false),
						items)) : (($elm$core$List$length(items) <= 8) ? A3($elm$browser$Debugger$Expando$Sequence, seqType, false, items) : expando);
			case 'Dictionary':
				var isClosed = expando.a;
				var keyValuePairs = expando.b;
				return isOuter ? A2(
					$elm$browser$Debugger$Expando$Dictionary,
					false,
					A2(
						$elm$core$List$map,
						function (_v1) {
							var k = _v1.a;
							var v = _v1.b;
							return _Utils_Tuple2(
								k,
								A2($elm$browser$Debugger$Expando$initHelp, false, v));
						},
						keyValuePairs)) : (($elm$core$List$length(keyValuePairs) <= 8) ? A2($elm$browser$Debugger$Expando$Dictionary, false, keyValuePairs) : expando);
			case 'Record':
				var isClosed = expando.a;
				var entries = expando.b;
				return isOuter ? A2(
					$elm$browser$Debugger$Expando$Record,
					false,
					A2(
						$elm$core$Dict$map,
						F2(
							function (_v2, v) {
								return A2($elm$browser$Debugger$Expando$initHelp, false, v);
							}),
						entries)) : (($elm$core$Dict$size(entries) <= 4) ? A2($elm$browser$Debugger$Expando$Record, false, entries) : expando);
			default:
				var maybeName = expando.a;
				var isClosed = expando.b;
				var args = expando.c;
				return isOuter ? A3(
					$elm$browser$Debugger$Expando$Constructor,
					maybeName,
					false,
					A2(
						$elm$core$List$map,
						$elm$browser$Debugger$Expando$initHelp(false),
						args)) : (($elm$core$List$length(args) <= 4) ? A3($elm$browser$Debugger$Expando$Constructor, maybeName, false, args) : expando);
		}
	});
var $elm$browser$Debugger$Expando$init = function (value) {
	return A2(
		$elm$browser$Debugger$Expando$initHelp,
		true,
		_Debugger_init(value));
};
var $elm$core$Platform$Cmd$map = _Platform_map;
var $elm$browser$Debugger$Overlay$None = {$: 'None'};
var $elm$browser$Debugger$Overlay$none = $elm$browser$Debugger$Overlay$None;
var $elm$browser$Debugger$Main$wrapInit = F4(
	function (metadata, popout, init, flags) {
		var _v0 = init(flags);
		var userModel = _v0.a;
		var userCommands = _v0.b;
		return _Utils_Tuple2(
			{
				expandoModel: $elm$browser$Debugger$Expando$init(userModel),
				expandoMsg: $elm$browser$Debugger$Expando$init(_Utils_Tuple0),
				history: $elm$browser$Debugger$History$empty(userModel),
				layout: A3($elm$browser$Debugger$Main$Horizontal, $elm$browser$Debugger$Main$Static, 0.3, 0.5),
				metadata: $elm$browser$Debugger$Metadata$decode(metadata),
				overlay: $elm$browser$Debugger$Overlay$none,
				popout: popout,
				state: $elm$browser$Debugger$Main$Running(userModel)
			},
			A2($elm$core$Platform$Cmd$map, $elm$browser$Debugger$Main$UserMsg, userCommands));
	});
var $elm$browser$Debugger$Main$getLatestModel = function (state) {
	if (state.$ === 'Running') {
		var model = state.a;
		return model;
	} else {
		var model = state.c;
		return model;
	}
};
var $elm$core$Platform$Sub$map = _Platform_map;
var $elm$browser$Debugger$Main$wrapSubs = F2(
	function (subscriptions, model) {
		return A2(
			$elm$core$Platform$Sub$map,
			$elm$browser$Debugger$Main$UserMsg,
			subscriptions(
				$elm$browser$Debugger$Main$getLatestModel(model.state)));
	});
var $elm$browser$Debugger$Main$Moving = {$: 'Moving'};
var $elm$browser$Debugger$Main$Paused = F5(
	function (a, b, c, d, e) {
		return {$: 'Paused', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$browser$Debugger$History$Snapshot = F2(
	function (model, messages) {
		return {messages: messages, model: model};
	});
var $elm$browser$Debugger$History$addRecent = F3(
	function (msg, newModel, _v0) {
		var model = _v0.model;
		var messages = _v0.messages;
		var numMessages = _v0.numMessages;
		return _Utils_eq(numMessages, $elm$browser$Debugger$History$maxSnapshotSize) ? _Utils_Tuple2(
			$elm$core$Maybe$Just(
				A2(
					$elm$browser$Debugger$History$Snapshot,
					model,
					$elm$core$Array$fromList(messages))),
			A3(
				$elm$browser$Debugger$History$RecentHistory,
				newModel,
				_List_fromArray(
					[msg]),
				1)) : _Utils_Tuple2(
			$elm$core$Maybe$Nothing,
			A3(
				$elm$browser$Debugger$History$RecentHistory,
				model,
				A2($elm$core$List$cons, msg, messages),
				numMessages + 1));
	});
var $elm$core$Elm$JsArray$push = _JsArray_push;
var $elm$core$Elm$JsArray$singleton = _JsArray_singleton;
var $elm$core$Array$insertTailInTree = F4(
	function (shift, index, tail, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		if (_Utils_cmp(
			pos,
			$elm$core$Elm$JsArray$length(tree)) > -1) {
			if (shift === 5) {
				return A2(
					$elm$core$Elm$JsArray$push,
					$elm$core$Array$Leaf(tail),
					tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, $elm$core$Elm$JsArray$empty));
				return A2($elm$core$Elm$JsArray$push, newSub, tree);
			}
		} else {
			var value = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (value.$ === 'SubTree') {
				var subTree = value.a;
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, subTree));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4(
						$elm$core$Array$insertTailInTree,
						shift - $elm$core$Array$shiftStep,
						index,
						tail,
						$elm$core$Elm$JsArray$singleton(value)));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			}
		}
	});
var $elm$core$Array$unsafeReplaceTail = F2(
	function (newTail, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		var originalTailLen = $elm$core$Elm$JsArray$length(tail);
		var newTailLen = $elm$core$Elm$JsArray$length(newTail);
		var newArrayLen = len + (newTailLen - originalTailLen);
		if (_Utils_eq(newTailLen, $elm$core$Array$branchFactor)) {
			var overflow = _Utils_cmp(newArrayLen >>> $elm$core$Array$shiftStep, 1 << startShift) > 0;
			if (overflow) {
				var newShift = startShift + $elm$core$Array$shiftStep;
				var newTree = A4(
					$elm$core$Array$insertTailInTree,
					newShift,
					len,
					newTail,
					$elm$core$Elm$JsArray$singleton(
						$elm$core$Array$SubTree(tree)));
				return A4($elm$core$Array$Array_elm_builtin, newArrayLen, newShift, newTree, $elm$core$Elm$JsArray$empty);
			} else {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					newArrayLen,
					startShift,
					A4($elm$core$Array$insertTailInTree, startShift, len, newTail, tree),
					$elm$core$Elm$JsArray$empty);
			}
		} else {
			return A4($elm$core$Array$Array_elm_builtin, newArrayLen, startShift, tree, newTail);
		}
	});
var $elm$core$Array$push = F2(
	function (a, array) {
		var tail = array.d;
		return A2(
			$elm$core$Array$unsafeReplaceTail,
			A2($elm$core$Elm$JsArray$push, a, tail),
			array);
	});
var $elm$browser$Debugger$History$add = F3(
	function (msg, model, _v0) {
		var snapshots = _v0.snapshots;
		var recent = _v0.recent;
		var numMessages = _v0.numMessages;
		var _v1 = A3($elm$browser$Debugger$History$addRecent, msg, model, recent);
		if (_v1.a.$ === 'Just') {
			var snapshot = _v1.a.a;
			var newRecent = _v1.b;
			return A3(
				$elm$browser$Debugger$History$History,
				A2($elm$core$Array$push, snapshot, snapshots),
				newRecent,
				numMessages + 1);
		} else {
			var _v2 = _v1.a;
			var newRecent = _v1.b;
			return A3($elm$browser$Debugger$History$History, snapshots, newRecent, numMessages + 1);
		}
	});
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$browser$Debugger$Overlay$BadImport = function (a) {
	return {$: 'BadImport', a: a};
};
var $elm$browser$Debugger$Overlay$RiskyImport = F2(
	function (a, b) {
		return {$: 'RiskyImport', a: a, b: b};
	});
var $elm$browser$Debugger$Report$VersionChanged = F2(
	function (a, b) {
		return {$: 'VersionChanged', a: a, b: b};
	});
var $elm$browser$Debugger$Report$MessageChanged = F2(
	function (a, b) {
		return {$: 'MessageChanged', a: a, b: b};
	});
var $elm$browser$Debugger$Report$SomethingChanged = function (a) {
	return {$: 'SomethingChanged', a: a};
};
var $elm$browser$Debugger$Report$AliasChange = function (a) {
	return {$: 'AliasChange', a: a};
};
var $elm$browser$Debugger$Metadata$checkAlias = F4(
	function (name, old, _new, changes) {
		return (_Utils_eq(old.tipe, _new.tipe) && _Utils_eq(old.args, _new.args)) ? changes : A2(
			$elm$core$List$cons,
			$elm$browser$Debugger$Report$AliasChange(name),
			changes);
	});
var $elm$browser$Debugger$Report$UnionChange = F2(
	function (a, b) {
		return {$: 'UnionChange', a: a, b: b};
	});
var $elm$browser$Debugger$Metadata$addTag = F3(
	function (tag, _v0, changes) {
		return _Utils_update(
			changes,
			{
				added: A2($elm$core$List$cons, tag, changes.added)
			});
	});
var $elm$browser$Debugger$Metadata$checkTag = F4(
	function (tag, old, _new, changes) {
		return _Utils_eq(old, _new) ? changes : _Utils_update(
			changes,
			{
				changed: A2($elm$core$List$cons, tag, changes.changed)
			});
	});
var $elm$browser$Debugger$Report$TagChanges = F4(
	function (removed, changed, added, argsMatch) {
		return {added: added, argsMatch: argsMatch, changed: changed, removed: removed};
	});
var $elm$browser$Debugger$Report$emptyTagChanges = function (argsMatch) {
	return A4($elm$browser$Debugger$Report$TagChanges, _List_Nil, _List_Nil, _List_Nil, argsMatch);
};
var $elm$browser$Debugger$Report$hasTagChanges = function (tagChanges) {
	return _Utils_eq(
		tagChanges,
		A4($elm$browser$Debugger$Report$TagChanges, _List_Nil, _List_Nil, _List_Nil, true));
};
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$browser$Debugger$Metadata$removeTag = F3(
	function (tag, _v0, changes) {
		return _Utils_update(
			changes,
			{
				removed: A2($elm$core$List$cons, tag, changes.removed)
			});
	});
var $elm$browser$Debugger$Metadata$checkUnion = F4(
	function (name, old, _new, changes) {
		var tagChanges = A6(
			$elm$core$Dict$merge,
			$elm$browser$Debugger$Metadata$removeTag,
			$elm$browser$Debugger$Metadata$checkTag,
			$elm$browser$Debugger$Metadata$addTag,
			old.tags,
			_new.tags,
			$elm$browser$Debugger$Report$emptyTagChanges(
				_Utils_eq(old.args, _new.args)));
		return $elm$browser$Debugger$Report$hasTagChanges(tagChanges) ? changes : A2(
			$elm$core$List$cons,
			A2($elm$browser$Debugger$Report$UnionChange, name, tagChanges),
			changes);
	});
var $elm$browser$Debugger$Metadata$ignore = F3(
	function (key, value, report) {
		return report;
	});
var $elm$browser$Debugger$Metadata$checkTypes = F2(
	function (old, _new) {
		return (!_Utils_eq(old.message, _new.message)) ? A2($elm$browser$Debugger$Report$MessageChanged, old.message, _new.message) : $elm$browser$Debugger$Report$SomethingChanged(
			A6(
				$elm$core$Dict$merge,
				$elm$browser$Debugger$Metadata$ignore,
				$elm$browser$Debugger$Metadata$checkUnion,
				$elm$browser$Debugger$Metadata$ignore,
				old.unions,
				_new.unions,
				A6($elm$core$Dict$merge, $elm$browser$Debugger$Metadata$ignore, $elm$browser$Debugger$Metadata$checkAlias, $elm$browser$Debugger$Metadata$ignore, old.aliases, _new.aliases, _List_Nil)));
	});
var $elm$browser$Debugger$Metadata$check = F2(
	function (old, _new) {
		return (!_Utils_eq(old.versions.elm, _new.versions.elm)) ? A2($elm$browser$Debugger$Report$VersionChanged, old.versions.elm, _new.versions.elm) : A2($elm$browser$Debugger$Metadata$checkTypes, old.types, _new.types);
	});
var $elm$browser$Debugger$Report$CorruptHistory = {$: 'CorruptHistory'};
var $elm$browser$Debugger$Overlay$corruptImport = $elm$browser$Debugger$Overlay$BadImport($elm$browser$Debugger$Report$CorruptHistory);
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$browser$Debugger$Report$Fine = {$: 'Fine'};
var $elm$browser$Debugger$Report$Impossible = {$: 'Impossible'};
var $elm$browser$Debugger$Report$Risky = {$: 'Risky'};
var $elm$core$Basics$not = _Basics_not;
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$browser$Debugger$Report$some = function (list) {
	return !$elm$core$List$isEmpty(list);
};
var $elm$browser$Debugger$Report$evaluateChange = function (change) {
	if (change.$ === 'AliasChange') {
		return $elm$browser$Debugger$Report$Impossible;
	} else {
		var removed = change.b.removed;
		var changed = change.b.changed;
		var added = change.b.added;
		var argsMatch = change.b.argsMatch;
		return ((!argsMatch) || ($elm$browser$Debugger$Report$some(changed) || $elm$browser$Debugger$Report$some(removed))) ? $elm$browser$Debugger$Report$Impossible : ($elm$browser$Debugger$Report$some(added) ? $elm$browser$Debugger$Report$Risky : $elm$browser$Debugger$Report$Fine);
	}
};
var $elm$browser$Debugger$Report$worstCase = F2(
	function (status, statusList) {
		worstCase:
		while (true) {
			if (!statusList.b) {
				return status;
			} else {
				switch (statusList.a.$) {
					case 'Impossible':
						var _v1 = statusList.a;
						return $elm$browser$Debugger$Report$Impossible;
					case 'Risky':
						var _v2 = statusList.a;
						var rest = statusList.b;
						var $temp$status = $elm$browser$Debugger$Report$Risky,
							$temp$statusList = rest;
						status = $temp$status;
						statusList = $temp$statusList;
						continue worstCase;
					default:
						var _v3 = statusList.a;
						var rest = statusList.b;
						var $temp$status = status,
							$temp$statusList = rest;
						status = $temp$status;
						statusList = $temp$statusList;
						continue worstCase;
				}
			}
		}
	});
var $elm$browser$Debugger$Report$evaluate = function (report) {
	switch (report.$) {
		case 'CorruptHistory':
			return $elm$browser$Debugger$Report$Impossible;
		case 'VersionChanged':
			return $elm$browser$Debugger$Report$Impossible;
		case 'MessageChanged':
			return $elm$browser$Debugger$Report$Impossible;
		default:
			var changes = report.a;
			return A2(
				$elm$browser$Debugger$Report$worstCase,
				$elm$browser$Debugger$Report$Fine,
				A2($elm$core$List$map, $elm$browser$Debugger$Report$evaluateChange, changes));
	}
};
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $elm$browser$Debugger$Overlay$uploadDecoder = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (x, y) {
			return _Utils_Tuple2(x, y);
		}),
	A2($elm$json$Json$Decode$field, 'metadata', $elm$browser$Debugger$Metadata$decoder),
	A2($elm$json$Json$Decode$field, 'history', $elm$json$Json$Decode$value));
var $elm$browser$Debugger$Overlay$assessImport = F2(
	function (metadata, jsonString) {
		var _v0 = A2($elm$json$Json$Decode$decodeString, $elm$browser$Debugger$Overlay$uploadDecoder, jsonString);
		if (_v0.$ === 'Err') {
			return $elm$core$Result$Err($elm$browser$Debugger$Overlay$corruptImport);
		} else {
			var _v1 = _v0.a;
			var foreignMetadata = _v1.a;
			var rawHistory = _v1.b;
			var report = A2($elm$browser$Debugger$Metadata$check, foreignMetadata, metadata);
			var _v2 = $elm$browser$Debugger$Report$evaluate(report);
			switch (_v2.$) {
				case 'Impossible':
					return $elm$core$Result$Err(
						$elm$browser$Debugger$Overlay$BadImport(report));
				case 'Risky':
					return $elm$core$Result$Err(
						A2($elm$browser$Debugger$Overlay$RiskyImport, report, rawHistory));
				default:
					return $elm$core$Result$Ok(rawHistory);
			}
		}
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$browser$Debugger$Overlay$close = F2(
	function (msg, state) {
		switch (state.$) {
			case 'None':
				return $elm$core$Maybe$Nothing;
			case 'BadMetadata':
				return $elm$core$Maybe$Nothing;
			case 'BadImport':
				return $elm$core$Maybe$Nothing;
			default:
				var rawHistory = state.b;
				if (msg.$ === 'Cancel') {
					return $elm$core$Maybe$Nothing;
				} else {
					return $elm$core$Maybe$Just(rawHistory);
				}
		}
	});
var $elm$browser$Debugger$History$elmToJs = A2($elm$core$Basics$composeR, _Json_wrap, _Debugger_unsafeCoerce);
var $elm$browser$Debugger$History$encodeHelp = F2(
	function (snapshot, allMessages) {
		return A3($elm$core$Array$foldl, $elm$core$List$cons, allMessages, snapshot.messages);
	});
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $elm$browser$Debugger$History$encode = function (_v0) {
	var snapshots = _v0.snapshots;
	var recent = _v0.recent;
	return A2(
		$elm$json$Json$Encode$list,
		$elm$browser$Debugger$History$elmToJs,
		A3(
			$elm$core$Array$foldr,
			$elm$browser$Debugger$History$encodeHelp,
			$elm$core$List$reverse(recent.messages),
			snapshots));
};
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $elm$browser$Debugger$Metadata$encodeAlias = function (_v0) {
	var args = _v0.args;
	var tipe = _v0.tipe;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'args',
				A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, args)),
				_Utils_Tuple2(
				'type',
				$elm$json$Json$Encode$string(tipe))
			]));
};
var $elm$browser$Debugger$Metadata$encodeDict = F2(
	function (f, dict) {
		return $elm$json$Json$Encode$object(
			$elm$core$Dict$toList(
				A2(
					$elm$core$Dict$map,
					F2(
						function (key, value) {
							return f(value);
						}),
					dict)));
	});
var $elm$browser$Debugger$Metadata$encodeUnion = function (_v0) {
	var args = _v0.args;
	var tags = _v0.tags;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'args',
				A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, args)),
				_Utils_Tuple2(
				'tags',
				A2(
					$elm$browser$Debugger$Metadata$encodeDict,
					$elm$json$Json$Encode$list($elm$json$Json$Encode$string),
					tags))
			]));
};
var $elm$browser$Debugger$Metadata$encodeTypes = function (_v0) {
	var message = _v0.message;
	var unions = _v0.unions;
	var aliases = _v0.aliases;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'message',
				$elm$json$Json$Encode$string(message)),
				_Utils_Tuple2(
				'aliases',
				A2($elm$browser$Debugger$Metadata$encodeDict, $elm$browser$Debugger$Metadata$encodeAlias, aliases)),
				_Utils_Tuple2(
				'unions',
				A2($elm$browser$Debugger$Metadata$encodeDict, $elm$browser$Debugger$Metadata$encodeUnion, unions))
			]));
};
var $elm$browser$Debugger$Metadata$encodeVersions = function (_v0) {
	var elm = _v0.elm;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'elm',
				$elm$json$Json$Encode$string(elm))
			]));
};
var $elm$browser$Debugger$Metadata$encode = function (_v0) {
	var versions = _v0.versions;
	var types = _v0.types;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'versions',
				$elm$browser$Debugger$Metadata$encodeVersions(versions)),
				_Utils_Tuple2(
				'types',
				$elm$browser$Debugger$Metadata$encodeTypes(types))
			]));
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Debugger$Main$download = F2(
	function (metadata, history) {
		var historyLength = $elm$browser$Debugger$History$size(history);
		return A2(
			$elm$core$Task$perform,
			function (_v0) {
				return $elm$browser$Debugger$Main$NoOp;
			},
			A2(
				_Debugger_download,
				historyLength,
				_Json_unwrap(
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'metadata',
								$elm$browser$Debugger$Metadata$encode(metadata)),
								_Utils_Tuple2(
								'history',
								$elm$browser$Debugger$History$encode(history))
							])))));
	});
var $elm$browser$Debugger$Main$Vertical = F3(
	function (a, b, c) {
		return {$: 'Vertical', a: a, b: b, c: c};
	});
var $elm$browser$Debugger$Main$drag = F2(
	function (info, layout) {
		if (layout.$ === 'Horizontal') {
			var status = layout.a;
			var y = layout.c;
			return A3($elm$browser$Debugger$Main$Horizontal, status, info.x / info.width, y);
		} else {
			var status = layout.a;
			var x = layout.b;
			return A3($elm$browser$Debugger$Main$Vertical, status, x, info.y / info.height);
		}
	});
var $elm$browser$Debugger$History$Stepping = F2(
	function (a, b) {
		return {$: 'Stepping', a: a, b: b};
	});
var $elm$browser$Debugger$History$Done = F2(
	function (a, b) {
		return {$: 'Done', a: a, b: b};
	});
var $elm$browser$Debugger$History$getHelp = F3(
	function (update, msg, getResult) {
		if (getResult.$ === 'Done') {
			return getResult;
		} else {
			var n = getResult.a;
			var model = getResult.b;
			return (!n) ? A2(
				$elm$browser$Debugger$History$Done,
				msg,
				A2(update, msg, model).a) : A2(
				$elm$browser$Debugger$History$Stepping,
				n - 1,
				A2(update, msg, model).a);
		}
	});
var $elm$browser$Debugger$History$undone = function (getResult) {
	undone:
	while (true) {
		if (getResult.$ === 'Done') {
			var msg = getResult.a;
			var model = getResult.b;
			return _Utils_Tuple2(model, msg);
		} else {
			var $temp$getResult = getResult;
			getResult = $temp$getResult;
			continue undone;
		}
	}
};
var $elm$browser$Debugger$History$get = F3(
	function (update, index, history) {
		get:
		while (true) {
			var recent = history.recent;
			var snapshotMax = history.numMessages - recent.numMessages;
			if (_Utils_cmp(index, snapshotMax) > -1) {
				return $elm$browser$Debugger$History$undone(
					A3(
						$elm$core$List$foldr,
						$elm$browser$Debugger$History$getHelp(update),
						A2($elm$browser$Debugger$History$Stepping, index - snapshotMax, recent.model),
						recent.messages));
			} else {
				var _v0 = A2($elm$core$Array$get, (index / $elm$browser$Debugger$History$maxSnapshotSize) | 0, history.snapshots);
				if (_v0.$ === 'Nothing') {
					var $temp$update = update,
						$temp$index = index,
						$temp$history = history;
					update = $temp$update;
					index = $temp$index;
					history = $temp$history;
					continue get;
				} else {
					var model = _v0.a.model;
					var messages = _v0.a.messages;
					return $elm$browser$Debugger$History$undone(
						A3(
							$elm$core$Array$foldr,
							$elm$browser$Debugger$History$getHelp(update),
							A2($elm$browser$Debugger$History$Stepping, index % $elm$browser$Debugger$History$maxSnapshotSize, model),
							messages));
				}
			}
		}
	});
var $elm$browser$Debugger$History$getRecentMsg = function (history) {
	getRecentMsg:
	while (true) {
		var _v0 = history.recent.messages;
		if (!_v0.b) {
			var $temp$history = history;
			history = $temp$history;
			continue getRecentMsg;
		} else {
			var first = _v0.a;
			return first;
		}
	}
};
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$browser$Debugger$Expando$mergeDictHelp = F3(
	function (oldDict, key, value) {
		var _v12 = A2($elm$core$Dict$get, key, oldDict);
		if (_v12.$ === 'Nothing') {
			return value;
		} else {
			var oldValue = _v12.a;
			return A2($elm$browser$Debugger$Expando$mergeHelp, oldValue, value);
		}
	});
var $elm$browser$Debugger$Expando$mergeHelp = F2(
	function (old, _new) {
		var _v3 = _Utils_Tuple2(old, _new);
		_v3$6:
		while (true) {
			switch (_v3.b.$) {
				case 'S':
					return _new;
				case 'Primitive':
					return _new;
				case 'Sequence':
					if (_v3.a.$ === 'Sequence') {
						var _v4 = _v3.a;
						var isClosed = _v4.b;
						var oldValues = _v4.c;
						var _v5 = _v3.b;
						var seqType = _v5.a;
						var newValues = _v5.c;
						return A3(
							$elm$browser$Debugger$Expando$Sequence,
							seqType,
							isClosed,
							A2($elm$browser$Debugger$Expando$mergeListHelp, oldValues, newValues));
					} else {
						break _v3$6;
					}
				case 'Dictionary':
					if (_v3.a.$ === 'Dictionary') {
						var _v6 = _v3.a;
						var isClosed = _v6.a;
						var _v7 = _v3.b;
						var keyValuePairs = _v7.b;
						return A2($elm$browser$Debugger$Expando$Dictionary, isClosed, keyValuePairs);
					} else {
						break _v3$6;
					}
				case 'Record':
					if (_v3.a.$ === 'Record') {
						var _v8 = _v3.a;
						var isClosed = _v8.a;
						var oldDict = _v8.b;
						var _v9 = _v3.b;
						var newDict = _v9.b;
						return A2(
							$elm$browser$Debugger$Expando$Record,
							isClosed,
							A2(
								$elm$core$Dict$map,
								$elm$browser$Debugger$Expando$mergeDictHelp(oldDict),
								newDict));
					} else {
						break _v3$6;
					}
				default:
					if (_v3.a.$ === 'Constructor') {
						var _v10 = _v3.a;
						var isClosed = _v10.b;
						var oldValues = _v10.c;
						var _v11 = _v3.b;
						var maybeName = _v11.a;
						var newValues = _v11.c;
						return A3(
							$elm$browser$Debugger$Expando$Constructor,
							maybeName,
							isClosed,
							A2($elm$browser$Debugger$Expando$mergeListHelp, oldValues, newValues));
					} else {
						break _v3$6;
					}
			}
		}
		return _new;
	});
var $elm$browser$Debugger$Expando$mergeListHelp = F2(
	function (olds, news) {
		var _v0 = _Utils_Tuple2(olds, news);
		if (!_v0.a.b) {
			return news;
		} else {
			if (!_v0.b.b) {
				return news;
			} else {
				var _v1 = _v0.a;
				var x = _v1.a;
				var xs = _v1.b;
				var _v2 = _v0.b;
				var y = _v2.a;
				var ys = _v2.b;
				return A2(
					$elm$core$List$cons,
					A2($elm$browser$Debugger$Expando$mergeHelp, x, y),
					A2($elm$browser$Debugger$Expando$mergeListHelp, xs, ys));
			}
		}
	});
var $elm$browser$Debugger$Expando$merge = F2(
	function (value, expando) {
		return A2(
			$elm$browser$Debugger$Expando$mergeHelp,
			expando,
			_Debugger_init(value));
	});
var $elm$browser$Debugger$Main$jumpUpdate = F3(
	function (update, index, model) {
		var history = $elm$browser$Debugger$Main$cachedHistory(model);
		var currentMsg = $elm$browser$Debugger$History$getRecentMsg(history);
		var currentModel = $elm$browser$Debugger$Main$getLatestModel(model.state);
		var _v0 = A3($elm$browser$Debugger$History$get, update, index, history);
		var indexModel = _v0.a;
		var indexMsg = _v0.b;
		return _Utils_update(
			model,
			{
				expandoModel: A2($elm$browser$Debugger$Expando$merge, indexModel, model.expandoModel),
				expandoMsg: A2($elm$browser$Debugger$Expando$merge, indexMsg, model.expandoMsg),
				state: A5($elm$browser$Debugger$Main$Paused, index, indexModel, currentModel, currentMsg, history)
			});
	});
var $elm$browser$Debugger$History$jsToElm = A2($elm$core$Basics$composeR, _Json_unwrap, _Debugger_unsafeCoerce);
var $elm$browser$Debugger$History$decoder = F2(
	function (initialModel, update) {
		var addMessage = F2(
			function (rawMsg, _v0) {
				var model = _v0.a;
				var history = _v0.b;
				var msg = $elm$browser$Debugger$History$jsToElm(rawMsg);
				return _Utils_Tuple2(
					A2(update, msg, model),
					A3($elm$browser$Debugger$History$add, msg, model, history));
			});
		var updateModel = function (rawMsgs) {
			return A3(
				$elm$core$List$foldl,
				addMessage,
				_Utils_Tuple2(
					initialModel,
					$elm$browser$Debugger$History$empty(initialModel)),
				rawMsgs);
		};
		return A2(
			$elm$json$Json$Decode$map,
			updateModel,
			$elm$json$Json$Decode$list($elm$json$Json$Decode$value));
	});
var $elm$browser$Debugger$History$getInitialModel = function (_v0) {
	var snapshots = _v0.snapshots;
	var recent = _v0.recent;
	var _v1 = A2($elm$core$Array$get, 0, snapshots);
	if (_v1.$ === 'Just') {
		var model = _v1.a.model;
		return model;
	} else {
		return recent.model;
	}
};
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$browser$Debugger$Main$loadNewHistory = F3(
	function (rawHistory, update, model) {
		var pureUserUpdate = F2(
			function (msg, userModel) {
				return A2(update, msg, userModel).a;
			});
		var initialUserModel = $elm$browser$Debugger$History$getInitialModel(model.history);
		var decoder = A2($elm$browser$Debugger$History$decoder, initialUserModel, pureUserUpdate);
		var _v0 = A2($elm$json$Json$Decode$decodeValue, decoder, rawHistory);
		if (_v0.$ === 'Err') {
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{overlay: $elm$browser$Debugger$Overlay$corruptImport}),
				$elm$core$Platform$Cmd$none);
		} else {
			var _v1 = _v0.a;
			var latestUserModel = _v1.a;
			var newHistory = _v1.b;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						expandoModel: $elm$browser$Debugger$Expando$init(latestUserModel),
						expandoMsg: $elm$browser$Debugger$Expando$init(
							$elm$browser$Debugger$History$getRecentMsg(newHistory)),
						history: newHistory,
						overlay: $elm$browser$Debugger$Overlay$none,
						state: $elm$browser$Debugger$Main$Running(latestUserModel)
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $elm$browser$Debugger$Main$scroll = function (popout) {
	return A2(
		$elm$core$Task$perform,
		$elm$core$Basics$always($elm$browser$Debugger$Main$NoOp),
		_Debugger_scroll(popout));
};
var $elm$browser$Debugger$Main$scrollTo = F2(
	function (id, popout) {
		return A2(
			$elm$core$Task$perform,
			$elm$core$Basics$always($elm$browser$Debugger$Main$NoOp),
			A2(_Debugger_scrollTo, id, popout));
	});
var $elm$browser$Debugger$Main$setDragStatus = F2(
	function (status, layout) {
		if (layout.$ === 'Horizontal') {
			var x = layout.b;
			var y = layout.c;
			return A3($elm$browser$Debugger$Main$Horizontal, status, x, y);
		} else {
			var x = layout.b;
			var y = layout.c;
			return A3($elm$browser$Debugger$Main$Vertical, status, x, y);
		}
	});
var $elm$browser$Debugger$Main$swapLayout = function (layout) {
	if (layout.$ === 'Horizontal') {
		var s = layout.a;
		var x = layout.b;
		var y = layout.c;
		return A3($elm$browser$Debugger$Main$Vertical, s, x, y);
	} else {
		var s = layout.a;
		var x = layout.b;
		var y = layout.c;
		return A3($elm$browser$Debugger$Main$Horizontal, s, x, y);
	}
};
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$browser$Debugger$Expando$updateIndex = F3(
	function (n, func, list) {
		if (!list.b) {
			return _List_Nil;
		} else {
			var x = list.a;
			var xs = list.b;
			return (n <= 0) ? A2(
				$elm$core$List$cons,
				func(x),
				xs) : A2(
				$elm$core$List$cons,
				x,
				A3($elm$browser$Debugger$Expando$updateIndex, n - 1, func, xs));
		}
	});
var $elm$browser$Debugger$Expando$update = F2(
	function (msg, value) {
		switch (value.$) {
			case 'S':
				return value;
			case 'Primitive':
				return value;
			case 'Sequence':
				var seqType = value.a;
				var isClosed = value.b;
				var valueList = value.c;
				switch (msg.$) {
					case 'Toggle':
						return A3($elm$browser$Debugger$Expando$Sequence, seqType, !isClosed, valueList);
					case 'Index':
						if (msg.a.$ === 'None') {
							var _v3 = msg.a;
							var index = msg.b;
							var subMsg = msg.c;
							return A3(
								$elm$browser$Debugger$Expando$Sequence,
								seqType,
								isClosed,
								A3(
									$elm$browser$Debugger$Expando$updateIndex,
									index,
									$elm$browser$Debugger$Expando$update(subMsg),
									valueList));
						} else {
							return value;
						}
					default:
						return value;
				}
			case 'Dictionary':
				var isClosed = value.a;
				var keyValuePairs = value.b;
				switch (msg.$) {
					case 'Toggle':
						return A2($elm$browser$Debugger$Expando$Dictionary, !isClosed, keyValuePairs);
					case 'Index':
						var redirect = msg.a;
						var index = msg.b;
						var subMsg = msg.c;
						switch (redirect.$) {
							case 'None':
								return value;
							case 'Key':
								return A2(
									$elm$browser$Debugger$Expando$Dictionary,
									isClosed,
									A3(
										$elm$browser$Debugger$Expando$updateIndex,
										index,
										function (_v6) {
											var k = _v6.a;
											var v = _v6.b;
											return _Utils_Tuple2(
												A2($elm$browser$Debugger$Expando$update, subMsg, k),
												v);
										},
										keyValuePairs));
							default:
								return A2(
									$elm$browser$Debugger$Expando$Dictionary,
									isClosed,
									A3(
										$elm$browser$Debugger$Expando$updateIndex,
										index,
										function (_v7) {
											var k = _v7.a;
											var v = _v7.b;
											return _Utils_Tuple2(
												k,
												A2($elm$browser$Debugger$Expando$update, subMsg, v));
										},
										keyValuePairs));
						}
					default:
						return value;
				}
			case 'Record':
				var isClosed = value.a;
				var valueDict = value.b;
				switch (msg.$) {
					case 'Toggle':
						return A2($elm$browser$Debugger$Expando$Record, !isClosed, valueDict);
					case 'Index':
						return value;
					default:
						var field = msg.a;
						var subMsg = msg.b;
						return A2(
							$elm$browser$Debugger$Expando$Record,
							isClosed,
							A3(
								$elm$core$Dict$update,
								field,
								$elm$browser$Debugger$Expando$updateField(subMsg),
								valueDict));
				}
			default:
				var maybeName = value.a;
				var isClosed = value.b;
				var valueList = value.c;
				switch (msg.$) {
					case 'Toggle':
						return A3($elm$browser$Debugger$Expando$Constructor, maybeName, !isClosed, valueList);
					case 'Index':
						if (msg.a.$ === 'None') {
							var _v10 = msg.a;
							var index = msg.b;
							var subMsg = msg.c;
							return A3(
								$elm$browser$Debugger$Expando$Constructor,
								maybeName,
								isClosed,
								A3(
									$elm$browser$Debugger$Expando$updateIndex,
									index,
									$elm$browser$Debugger$Expando$update(subMsg),
									valueList));
						} else {
							return value;
						}
					default:
						return value;
				}
		}
	});
var $elm$browser$Debugger$Expando$updateField = F2(
	function (msg, maybeExpando) {
		if (maybeExpando.$ === 'Nothing') {
			return maybeExpando;
		} else {
			var expando = maybeExpando.a;
			return $elm$core$Maybe$Just(
				A2($elm$browser$Debugger$Expando$update, msg, expando));
		}
	});
var $elm$browser$Debugger$Main$Upload = function (a) {
	return {$: 'Upload', a: a};
};
var $elm$browser$Debugger$Main$upload = function (popout) {
	return A2(
		$elm$core$Task$perform,
		$elm$browser$Debugger$Main$Upload,
		_Debugger_upload(popout));
};
var $elm$browser$Debugger$Overlay$BadMetadata = function (a) {
	return {$: 'BadMetadata', a: a};
};
var $elm$browser$Debugger$Overlay$badMetadata = $elm$browser$Debugger$Overlay$BadMetadata;
var $elm$browser$Debugger$Main$withGoodMetadata = F2(
	function (model, func) {
		var _v0 = model.metadata;
		if (_v0.$ === 'Ok') {
			var metadata = _v0.a;
			return func(metadata);
		} else {
			var error = _v0.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						overlay: $elm$browser$Debugger$Overlay$badMetadata(error)
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $elm$browser$Debugger$Main$wrapUpdate = F3(
	function (update, msg, model) {
		wrapUpdate:
		while (true) {
			switch (msg.$) {
				case 'NoOp':
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 'UserMsg':
					var userMsg = msg.a;
					var userModel = $elm$browser$Debugger$Main$getLatestModel(model.state);
					var newHistory = A3($elm$browser$Debugger$History$add, userMsg, userModel, model.history);
					var _v1 = A2(update, userMsg, userModel);
					var newUserModel = _v1.a;
					var userCmds = _v1.b;
					var commands = A2($elm$core$Platform$Cmd$map, $elm$browser$Debugger$Main$UserMsg, userCmds);
					var _v2 = model.state;
					if (_v2.$ === 'Running') {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									expandoModel: A2($elm$browser$Debugger$Expando$merge, newUserModel, model.expandoModel),
									expandoMsg: A2($elm$browser$Debugger$Expando$merge, userMsg, model.expandoMsg),
									history: newHistory,
									state: $elm$browser$Debugger$Main$Running(newUserModel)
								}),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										commands,
										$elm$browser$Debugger$Main$scroll(model.popout)
									])));
					} else {
						var index = _v2.a;
						var indexModel = _v2.b;
						var history = _v2.e;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									history: newHistory,
									state: A5($elm$browser$Debugger$Main$Paused, index, indexModel, newUserModel, userMsg, history)
								}),
							commands);
					}
				case 'TweakExpandoMsg':
					var eMsg = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								expandoMsg: A2($elm$browser$Debugger$Expando$update, eMsg, model.expandoMsg)
							}),
						$elm$core$Platform$Cmd$none);
				case 'TweakExpandoModel':
					var eMsg = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								expandoModel: A2($elm$browser$Debugger$Expando$update, eMsg, model.expandoModel)
							}),
						$elm$core$Platform$Cmd$none);
				case 'Resume':
					var _v3 = model.state;
					if (_v3.$ === 'Running') {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						var userModel = _v3.c;
						var userMsg = _v3.d;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									expandoModel: A2($elm$browser$Debugger$Expando$merge, userModel, model.expandoModel),
									expandoMsg: A2($elm$browser$Debugger$Expando$merge, userMsg, model.expandoMsg),
									state: $elm$browser$Debugger$Main$Running(userModel)
								}),
							$elm$browser$Debugger$Main$scroll(model.popout));
					}
				case 'Jump':
					var index = msg.a;
					return _Utils_Tuple2(
						A3($elm$browser$Debugger$Main$jumpUpdate, update, index, model),
						$elm$core$Platform$Cmd$none);
				case 'SliderJump':
					var index = msg.a;
					return _Utils_Tuple2(
						A3($elm$browser$Debugger$Main$jumpUpdate, update, index, model),
						A2(
							$elm$browser$Debugger$Main$scrollTo,
							$elm$browser$Debugger$History$idForMessageIndex(index),
							model.popout));
				case 'Open':
					return _Utils_Tuple2(
						model,
						A2(
							$elm$core$Task$perform,
							$elm$core$Basics$always($elm$browser$Debugger$Main$NoOp),
							_Debugger_open(model.popout)));
				case 'Up':
					var _v4 = model.state;
					if (_v4.$ === 'Running') {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						var i = _v4.a;
						var history = _v4.e;
						var targetIndex = i + 1;
						if (_Utils_cmp(
							targetIndex,
							$elm$browser$Debugger$History$size(history)) < 0) {
							var $temp$update = update,
								$temp$msg = $elm$browser$Debugger$Main$SliderJump(targetIndex),
								$temp$model = model;
							update = $temp$update;
							msg = $temp$msg;
							model = $temp$model;
							continue wrapUpdate;
						} else {
							var $temp$update = update,
								$temp$msg = $elm$browser$Debugger$Main$Resume,
								$temp$model = model;
							update = $temp$update;
							msg = $temp$msg;
							model = $temp$model;
							continue wrapUpdate;
						}
					}
				case 'Down':
					var _v5 = model.state;
					if (_v5.$ === 'Running') {
						var $temp$update = update,
							$temp$msg = $elm$browser$Debugger$Main$Jump(
							$elm$browser$Debugger$History$size(model.history) - 1),
							$temp$model = model;
						update = $temp$update;
						msg = $temp$msg;
						model = $temp$model;
						continue wrapUpdate;
					} else {
						var index = _v5.a;
						if (index > 0) {
							var $temp$update = update,
								$temp$msg = $elm$browser$Debugger$Main$SliderJump(index - 1),
								$temp$model = model;
							update = $temp$update;
							msg = $temp$msg;
							model = $temp$model;
							continue wrapUpdate;
						} else {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						}
					}
				case 'Import':
					return A2(
						$elm$browser$Debugger$Main$withGoodMetadata,
						model,
						function (_v6) {
							return _Utils_Tuple2(
								model,
								$elm$browser$Debugger$Main$upload(model.popout));
						});
				case 'Export':
					return A2(
						$elm$browser$Debugger$Main$withGoodMetadata,
						model,
						function (metadata) {
							return _Utils_Tuple2(
								model,
								A2($elm$browser$Debugger$Main$download, metadata, model.history));
						});
				case 'Upload':
					var jsonString = msg.a;
					return A2(
						$elm$browser$Debugger$Main$withGoodMetadata,
						model,
						function (metadata) {
							var _v7 = A2($elm$browser$Debugger$Overlay$assessImport, metadata, jsonString);
							if (_v7.$ === 'Err') {
								var newOverlay = _v7.a;
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{overlay: newOverlay}),
									$elm$core$Platform$Cmd$none);
							} else {
								var rawHistory = _v7.a;
								return A3($elm$browser$Debugger$Main$loadNewHistory, rawHistory, update, model);
							}
						});
				case 'OverlayMsg':
					var overlayMsg = msg.a;
					var _v8 = A2($elm$browser$Debugger$Overlay$close, overlayMsg, model.overlay);
					if (_v8.$ === 'Nothing') {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{overlay: $elm$browser$Debugger$Overlay$none}),
							$elm$core$Platform$Cmd$none);
					} else {
						var rawHistory = _v8.a;
						return A3($elm$browser$Debugger$Main$loadNewHistory, rawHistory, update, model);
					}
				case 'SwapLayout':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								layout: $elm$browser$Debugger$Main$swapLayout(model.layout)
							}),
						$elm$core$Platform$Cmd$none);
				case 'DragStart':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								layout: A2($elm$browser$Debugger$Main$setDragStatus, $elm$browser$Debugger$Main$Moving, model.layout)
							}),
						$elm$core$Platform$Cmd$none);
				case 'Drag':
					var info = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								layout: A2($elm$browser$Debugger$Main$drag, info, model.layout)
							}),
						$elm$core$Platform$Cmd$none);
				default:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								layout: A2($elm$browser$Debugger$Main$setDragStatus, $elm$browser$Debugger$Main$Static, model.layout)
							}),
						$elm$core$Platform$Cmd$none);
			}
		}
	});
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Main$Loading = {$: 'Loading'};
var $author$project$Main$NewWord = function (a) {
	return {$: 'NewWord', a: a};
};
var $elm$random$Random$Generate = function (a) {
	return {$: 'Generate', a: a};
};
var $elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 'Seed', a: a, b: b};
	});
var $elm$random$Random$next = function (_v0) {
	var state0 = _v0.a;
	var incr = _v0.b;
	return A2($elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var $elm$random$Random$initialSeed = function (x) {
	var _v0 = $elm$random$Random$next(
		A2($elm$random$Random$Seed, 0, 1013904223));
	var state1 = _v0.a;
	var incr = _v0.b;
	var state2 = (state1 + x) >>> 0;
	return $elm$random$Random$next(
		A2($elm$random$Random$Seed, state2, incr));
};
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $elm$random$Random$init = A2(
	$elm$core$Task$andThen,
	function (time) {
		return $elm$core$Task$succeed(
			$elm$random$Random$initialSeed(
				$elm$time$Time$posixToMillis(time)));
	},
	$elm$time$Time$now);
var $elm$random$Random$step = F2(
	function (_v0, seed) {
		var generator = _v0.a;
		return generator(seed);
	});
var $elm$random$Random$onEffects = F3(
	function (router, commands, seed) {
		if (!commands.b) {
			return $elm$core$Task$succeed(seed);
		} else {
			var generator = commands.a.a;
			var rest = commands.b;
			var _v1 = A2($elm$random$Random$step, generator, seed);
			var value = _v1.a;
			var newSeed = _v1.b;
			return A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$random$Random$onEffects, router, rest, newSeed);
				},
				A2($elm$core$Platform$sendToApp, router, value));
		}
	});
var $elm$random$Random$onSelfMsg = F3(
	function (_v0, _v1, seed) {
		return $elm$core$Task$succeed(seed);
	});
var $elm$random$Random$Generator = function (a) {
	return {$: 'Generator', a: a};
};
var $elm$random$Random$map = F2(
	function (func, _v0) {
		var genA = _v0.a;
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v1 = genA(seed0);
				var a = _v1.a;
				var seed1 = _v1.b;
				return _Utils_Tuple2(
					func(a),
					seed1);
			});
	});
var $elm$random$Random$cmdMap = F2(
	function (func, _v0) {
		var generator = _v0.a;
		return $elm$random$Random$Generate(
			A2($elm$random$Random$map, func, generator));
	});
_Platform_effectManagers['Random'] = _Platform_createManager($elm$random$Random$init, $elm$random$Random$onEffects, $elm$random$Random$onSelfMsg, $elm$random$Random$cmdMap);
var $elm$random$Random$command = _Platform_leaf('Random');
var $elm$random$Random$generate = F2(
	function (tagger, generator) {
		return $elm$random$Random$command(
			$elm$random$Random$Generate(
				A2($elm$random$Random$map, tagger, generator)));
	});
var $author$project$Words$playWords = $elm$core$Array$fromList(
	_List_fromArray(
		['cigar', 'rebut', 'sissy', 'humph', 'awake', 'blush', 'focal', 'evade', 'naval', 'serve', 'heath', 'dwarf', 'model', 'karma', 'stink', 'grade', 'quiet', 'bench', 'abate', 'feign', 'major', 'death', 'fresh', 'crust', 'stool', 'colon', 'abase', 'marry', 'react', 'batty', 'pride', 'floss', 'helix', 'croak', 'staff', 'paper', 'unfed', 'whelp', 'trawl', 'outdo', 'adobe', 'crazy', 'sower', 'repay', 'digit', 'crate', 'cluck', 'spike', 'mimic', 'pound', 'maxim', 'linen', 'unmet', 'flesh', 'booby', 'forth', 'first', 'stand', 'belly', 'ivory', 'seedy', 'print', 'yearn', 'drain', 'bribe', 'stout', 'panel', 'crass', 'flume', 'offal', 'agree', 'error', 'swirl', 'argue', 'bleed', 'delta', 'flick', 'totem', 'wooer', 'front', 'shrub', 'parry', 'biome', 'lapel', 'start', 'greet', 'goner', 'golem', 'lusty', 'loopy', 'round', 'audit', 'lying', 'gamma', 'labor', 'islet', 'civic', 'forge', 'corny', 'moult', 'basic', 'salad', 'agate', 'spicy', 'spray', 'essay', 'fjord', 'spend', 'kebab', 'guild', 'aback', 'motor', 'alone', 'hatch', 'hyper', 'thumb', 'dowry', 'ought', 'belch', 'dutch', 'pilot', 'tweed', 'comet', 'jaunt', 'enema', 'steed', 'abyss', 'growl', 'fling', 'dozen', 'boozy', 'erode', 'world', 'gouge', 'click', 'briar', 'great', 'altar', 'pulpy', 'blurt', 'coast', 'duchy', 'groin', 'fixer', 'group', 'rogue', 'badly', 'smart', 'pithy', 'gaudy', 'chill', 'heron', 'vodka', 'finer', 'surer', 'radio', 'rouge', 'perch', 'retch', 'wrote', 'clock', 'tilde', 'store', 'prove', 'bring', 'solve', 'cheat', 'grime', 'exult', 'usher', 'epoch', 'triad', 'break', 'rhino', 'viral', 'conic', 'masse', 'sonic', 'vital', 'trace', 'using', 'peach', 'champ', 'baton', 'brake', 'pluck', 'craze', 'gripe', 'weary', 'picky', 'acute', 'ferry', 'aside', 'tapir', 'troll', 'unify', 'rebus', 'boost', 'truss', 'siege', 'tiger', 'banal', 'slump', 'crank', 'gorge', 'query', 'drink', 'favor', 'abbey', 'tangy', 'panic', 'solar', 'shire', 'proxy', 'point', 'robot', 'prick', 'wince', 'crimp', 'knoll', 'sugar', 'whack', 'mount', 'perky', 'could', 'wrung', 'light', 'those', 'moist', 'shard', 'pleat', 'aloft', 'skill', 'elder', 'frame', 'humor', 'pause', 'ulcer', 'ultra', 'robin', 'cynic', 'aroma', 'caulk', 'shake', 'dodge', 'swill', 'tacit', 'other', 'thorn', 'trove', 'bloke', 'vivid', 'spill', 'chant', 'choke', 'rupee', 'nasty', 'mourn', 'ahead', 'brine', 'cloth', 'hoard', 'sweet', 'month', 'lapse', 'watch', 'today', 'focus', 'smelt', 'tease', 'cater', 'movie', 'saute', 'allow', 'renew', 'their', 'slosh', 'purge', 'chest', 'depot', 'epoxy', 'nymph', 'found', 'shall', 'stove', 'lowly', 'snout', 'trope', 'fewer', 'shawl', 'natal', 'comma', 'foray', 'scare', 'stair', 'black', 'squad', 'royal', 'chunk', 'mince', 'shame', 'cheek', 'ample', 'flair', 'foyer', 'cargo', 'oxide', 'plant', 'olive', 'inert', 'askew', 'heist', 'shown', 'zesty', 'trash', 'larva', 'forgo', 'story', 'hairy', 'train', 'homer', 'badge', 'midst', 'canny', 'fetus', 'butch', 'farce', 'slung', 'tipsy', 'metal', 'yield', 'delve', 'being', 'scour', 'glass', 'gamer', 'scrap', 'money', 'hinge', 'album', 'vouch', 'asset', 'tiara', 'crept', 'bayou', 'atoll', 'manor', 'creak', 'showy', 'phase', 'froth', 'depth', 'gloom', 'flood', 'trait', 'girth', 'piety', 'goose', 'float', 'donor', 'atone', 'primo', 'apron', 'blown', 'cacao', 'loser', 'input', 'gloat', 'awful', 'brink', 'smite', 'beady', 'rusty', 'retro', 'droll', 'gawky', 'hutch', 'pinto', 'egret', 'lilac', 'sever', 'field', 'fluff', 'flack', 'agape', 'voice', 'stead', 'stalk', 'berth', 'madam', 'night', 'bland', 'liver', 'wedge', 'augur', 'roomy', 'wacky', 'flock', 'angry', 'trite', 'aphid', 'tryst', 'midge', 'power', 'elope', 'cinch', 'motto', 'stomp', 'upset', 'bluff', 'cramp', 'quart', 'coyly', 'youth', 'rhyme', 'buggy', 'alien', 'smear', 'unfit', 'patty', 'cling', 'glean', 'label', 'hunky', 'khaki', 'poker', 'gruel', 'twice', 'twang', 'shrug', 'treat', 'waste', 'merit', 'woven', 'needy', 'clown', 'widow', 'irony', 'ruder', 'gauze', 'chief', 'onset', 'prize', 'fungi', 'charm', 'gully', 'inter', 'whoop', 'taunt', 'leery', 'class', 'theme', 'lofty', 'tibia', 'booze', 'alpha', 'thyme', 'doubt', 'parer', 'chute', 'stick', 'trice', 'alike', 'recap', 'saint', 'glory', 'grate', 'admit', 'brisk', 'soggy', 'usurp', 'scald', 'scorn', 'leave', 'twine', 'sting', 'bough', 'marsh', 'sloth', 'dandy', 'vigor', 'howdy', 'enjoy', 'valid', 'ionic', 'equal', 'floor', 'catch', 'spade', 'stein', 'exist', 'quirk', 'denim', 'grove', 'spiel', 'mummy', 'fault', 'foggy', 'flout', 'carry', 'sneak', 'libel', 'waltz', 'aptly', 'piney', 'inept', 'aloud', 'photo', 'dream', 'stale', 'unite', 'snarl', 'baker', 'there', 'glyph', 'pooch', 'hippy', 'spell', 'folly', 'louse', 'gulch', 'vault', 'godly', 'threw', 'fleet', 'grave', 'inane', 'shock', 'crave', 'spite', 'valve', 'skimp', 'claim', 'rainy', 'musty', 'pique', 'daddy', 'quasi', 'arise', 'aging', 'valet', 'opium', 'avert', 'stuck', 'recut', 'mulch', 'genre', 'plume', 'rifle', 'count', 'incur', 'total', 'wrest', 'mocha', 'deter', 'study', 'lover', 'safer', 'rivet', 'funny', 'smoke', 'mound', 'undue', 'sedan', 'pagan', 'swine', 'guile', 'gusty', 'equip', 'tough', 'canoe', 'chaos', 'covet', 'human', 'udder', 'lunch', 'blast', 'stray', 'manga', 'melee', 'lefty', 'quick', 'paste', 'given', 'octet', 'risen', 'groan', 'leaky', 'grind', 'carve', 'loose', 'sadly', 'spilt', 'apple', 'slack', 'honey', 'final', 'sheen', 'eerie', 'minty', 'slick', 'derby', 'wharf', 'spelt', 'coach', 'erupt', 'singe', 'price', 'spawn', 'fairy', 'jiffy', 'filmy', 'stack', 'chose', 'sleep', 'ardor', 'nanny', 'niece', 'woozy', 'handy', 'grace', 'ditto', 'stank', 'cream', 'usual', 'diode', 'valor', 'angle', 'ninja', 'muddy', 'chase', 'reply', 'prone', 'spoil', 'heart', 'shade', 'diner', 'arson', 'onion', 'sleet', 'dowel', 'couch', 'palsy', 'bowel', 'smile', 'evoke', 'creek', 'lance', 'eagle', 'idiot', 'siren', 'built', 'embed', 'award', 'dross', 'annul', 'goody', 'frown', 'patio', 'laden', 'humid', 'elite', 'lymph', 'edify', 'might', 'reset', 'visit', 'gusto', 'purse', 'vapor', 'crock', 'write', 'sunny', 'loath', 'chaff', 'slide', 'queer', 'venom', 'stamp', 'sorry', 'still', 'acorn', 'aping', 'pushy', 'tamer', 'hater', 'mania', 'awoke', 'brawn', 'swift', 'exile', 'birch', 'lucky', 'freer', 'risky', 'ghost', 'plier', 'lunar', 'winch', 'snare', 'nurse', 'house', 'borax', 'nicer', 'lurch', 'exalt', 'about', 'savvy', 'toxin', 'tunic', 'pried', 'inlay', 'chump', 'lanky', 'cress', 'eater', 'elude', 'cycle', 'kitty', 'boule', 'moron', 'tenet', 'place', 'lobby', 'plush', 'vigil', 'index', 'blink', 'clung', 'qualm', 'croup', 'clink', 'juicy', 'stage', 'decay', 'nerve', 'flier', 'shaft', 'crook', 'clean', 'china', 'ridge', 'vowel', 'gnome', 'snuck', 'icing', 'spiny', 'rigor', 'snail', 'flown', 'rabid', 'prose', 'thank', 'poppy', 'budge', 'fiber', 'moldy', 'dowdy', 'kneel', 'track', 'caddy', 'quell', 'dumpy', 'paler', 'swore', 'rebar', 'scuba', 'splat', 'flyer', 'horny', 'mason', 'doing', 'ozone', 'amply', 'molar', 'ovary', 'beset', 'queue', 'cliff', 'magic', 'truce', 'sport', 'fritz', 'edict', 'twirl', 'verse', 'llama', 'eaten', 'range', 'whisk', 'hovel', 'rehab', 'macaw', 'sigma', 'spout', 'verve', 'sushi', 'dying', 'fetid', 'brain', 'buddy', 'thump', 'scion', 'candy', 'chord', 'basin', 'march', 'crowd', 'arbor', 'gayly', 'musky', 'stain', 'dally', 'bless', 'bravo', 'stung', 'title', 'ruler', 'kiosk', 'blond', 'ennui', 'layer', 'fluid', 'tatty', 'score', 'cutie', 'zebra', 'barge', 'matey', 'bluer', 'aider', 'shook', 'river', 'privy', 'betel', 'frisk', 'bongo', 'begun', 'azure', 'weave', 'genie', 'sound', 'glove', 'braid', 'scope', 'wryly', 'rover', 'assay', 'ocean', 'bloom', 'irate', 'later', 'woken', 'silky', 'wreck', 'dwelt', 'slate', 'smack', 'solid', 'amaze', 'hazel', 'wrist', 'jolly', 'globe', 'flint', 'rouse', 'civil', 'vista', 'relax', 'cover', 'alive', 'beech', 'jetty', 'bliss', 'vocal', 'often', 'dolly', 'eight', 'joker', 'since', 'event', 'ensue', 'shunt', 'diver', 'poser', 'worst', 'sweep', 'alley', 'creed', 'anime', 'leafy', 'bosom', 'dunce', 'stare', 'pudgy', 'waive', 'choir', 'stood', 'spoke', 'outgo', 'delay', 'bilge', 'ideal', 'clasp', 'seize', 'hotly', 'laugh', 'sieve', 'block', 'meant', 'grape', 'noose', 'hardy', 'shied', 'drawl', 'daisy', 'putty', 'strut', 'burnt', 'tulip', 'crick', 'idyll', 'vixen', 'furor', 'geeky', 'cough', 'naive', 'shoal', 'stork', 'bathe', 'aunty', 'check', 'prime', 'brass', 'outer', 'furry', 'razor', 'elect', 'evict', 'imply', 'demur', 'quota', 'haven', 'cavil', 'swear', 'crump', 'dough', 'gavel', 'wagon', 'salon', 'nudge', 'harem', 'pitch', 'sworn', 'pupil', 'excel', 'stony', 'cabin', 'unzip', 'queen', 'trout', 'polyp', 'earth', 'storm', 'until', 'taper', 'enter', 'child', 'adopt', 'minor', 'fatty', 'husky', 'brave', 'filet', 'slime', 'glint', 'tread', 'steal', 'regal', 'guest', 'every', 'murky', 'share', 'spore', 'hoist', 'buxom', 'inner', 'otter', 'dimly', 'level', 'sumac', 'donut', 'stilt', 'arena', 'sheet', 'scrub', 'fancy', 'slimy', 'pearl', 'silly', 'porch', 'dingo', 'sepia', 'amble', 'shady', 'bread', 'friar', 'reign', 'dairy', 'quill', 'cross', 'brood', 'tuber', 'shear', 'posit', 'blank', 'villa', 'shank', 'piggy', 'freak', 'which', 'among', 'fecal', 'shell', 'would', 'algae', 'large', 'rabbi', 'agony', 'amuse', 'bushy', 'copse', 'swoon', 'knife', 'pouch', 'ascot', 'plane', 'crown', 'urban', 'snide', 'relay', 'abide', 'viola', 'rajah', 'straw', 'dilly', 'crash', 'amass', 'third', 'trick', 'tutor', 'woody', 'blurb', 'grief', 'disco', 'where', 'sassy', 'beach', 'sauna', 'comic', 'clued', 'creep', 'caste', 'graze', 'snuff', 'frock', 'gonad', 'drunk', 'prong', 'lurid', 'steel', 'halve', 'buyer', 'vinyl', 'utile', 'smell', 'adage', 'worry', 'tasty', 'local', 'trade', 'finch', 'ashen', 'modal', 'gaunt', 'clove', 'enact', 'adorn', 'roast', 'speck', 'sheik', 'missy', 'grunt', 'snoop', 'party', 'touch', 'mafia', 'emcee', 'array', 'south', 'vapid', 'jelly', 'skulk', 'angst', 'tubal', 'lower', 'crest', 'sweat', 'cyber', 'adore', 'tardy', 'swami', 'notch', 'groom', 'roach', 'hitch', 'young', 'align', 'ready', 'frond', 'strap', 'puree', 'realm', 'venue', 'swarm', 'offer', 'seven', 'dryer', 'diary', 'dryly', 'drank', 'acrid', 'heady', 'theta', 'junto', 'pixie', 'quoth', 'bonus', 'shalt', 'penne', 'amend', 'datum', 'build', 'piano', 'shelf', 'lodge', 'suing', 'rearm', 'coral', 'ramen', 'worth', 'psalm', 'infer', 'overt', 'mayor', 'ovoid', 'glide', 'usage', 'poise', 'randy', 'chuck', 'prank', 'fishy', 'tooth', 'ether', 'drove', 'idler', 'swath', 'stint', 'while', 'begat', 'apply', 'slang', 'tarot', 'radar', 'credo', 'aware', 'canon', 'shift', 'timer', 'bylaw', 'serum', 'three', 'steak', 'iliac', 'shirk', 'blunt', 'puppy', 'penal', 'joist', 'bunny', 'shape', 'beget', 'wheel', 'adept', 'stunt', 'stole', 'topaz', 'chore', 'fluke', 'afoot', 'bloat', 'bully', 'dense', 'caper', 'sneer', 'boxer', 'jumbo', 'lunge', 'space', 'avail', 'short', 'slurp', 'loyal', 'flirt', 'pizza', 'conch', 'tempo', 'droop', 'plate', 'bible', 'plunk', 'afoul', 'savoy', 'steep', 'agile', 'stake', 'dwell', 'knave', 'beard', 'arose', 'motif', 'smash', 'broil', 'glare', 'shove', 'baggy', 'mammy', 'swamp', 'along', 'rugby', 'wager', 'quack', 'squat', 'snaky', 'debit', 'mange', 'skate', 'ninth', 'joust', 'tramp', 'spurn', 'medal', 'micro', 'rebel', 'flank', 'learn', 'nadir', 'maple', 'comfy', 'remit', 'gruff', 'ester', 'least', 'mogul', 'fetch', 'cause', 'oaken', 'aglow', 'meaty', 'gaffe', 'shyly', 'racer', 'prowl', 'thief', 'stern', 'poesy', 'rocky', 'tweet', 'waist', 'spire', 'grope', 'havoc', 'patsy', 'truly', 'forty', 'deity', 'uncle', 'swish', 'giver', 'preen', 'bevel', 'lemur', 'draft', 'slope', 'annoy', 'lingo', 'bleak', 'ditty', 'curly', 'cedar', 'dirge', 'grown', 'horde', 'drool', 'shuck', 'crypt', 'cumin', 'stock', 'gravy', 'locus', 'wider', 'breed', 'quite', 'chafe', 'cache', 'blimp', 'deign', 'fiend', 'logic', 'cheap', 'elide', 'rigid', 'false', 'renal', 'pence', 'rowdy', 'shoot', 'blaze', 'envoy', 'posse', 'brief', 'never', 'abort', 'mouse', 'mucky', 'sulky', 'fiery', 'media', 'trunk', 'yeast', 'clear', 'skunk', 'scalp', 'bitty', 'cider', 'koala', 'duvet', 'segue', 'creme', 'super', 'grill', 'after', 'owner', 'ember', 'reach', 'nobly', 'empty', 'speed', 'gipsy', 'recur', 'smock', 'dread', 'merge', 'burst', 'kappa', 'amity', 'shaky', 'hover', 'carol', 'snort', 'synod', 'faint', 'haunt', 'flour', 'chair', 'detox', 'shrew', 'tense', 'plied', 'quark', 'burly', 'novel', 'waxen', 'stoic', 'jerky', 'blitz', 'beefy', 'lyric', 'hussy', 'towel', 'quilt', 'below', 'bingo', 'wispy', 'brash', 'scone', 'toast', 'easel', 'saucy', 'value', 'spice', 'honor', 'route', 'sharp', 'bawdy', 'radii', 'skull', 'phony', 'issue', 'lager', 'swell', 'urine', 'gassy', 'trial', 'flora', 'upper', 'latch', 'wight', 'brick', 'retry', 'holly', 'decal', 'grass', 'shack', 'dogma', 'mover', 'defer', 'sober', 'optic', 'crier', 'vying', 'nomad', 'flute', 'hippo', 'shark', 'drier', 'obese', 'bugle', 'tawny', 'chalk', 'feast', 'ruddy', 'pedal', 'scarf', 'cruel', 'bleat', 'tidal', 'slush', 'semen', 'windy', 'dusty', 'sally', 'igloo', 'nerdy', 'jewel', 'shone', 'whale', 'hymen', 'abuse', 'fugue', 'elbow', 'crumb', 'pansy', 'welsh', 'syrup', 'terse', 'suave', 'gamut', 'swung', 'drake', 'freed', 'afire', 'shirt', 'grout', 'oddly', 'tithe', 'plaid', 'dummy', 'broom', 'blind', 'torch', 'enemy', 'again', 'tying', 'pesky', 'alter', 'gazer', 'noble', 'ethos', 'bride', 'extol', 'decor', 'hobby', 'beast', 'idiom', 'utter', 'these', 'sixth', 'alarm', 'erase', 'elegy', 'spunk', 'piper', 'scaly', 'scold', 'hefty', 'chick', 'sooty', 'canal', 'whiny', 'slash', 'quake', 'joint', 'swept', 'prude', 'heavy', 'wield', 'femme', 'lasso', 'maize', 'shale', 'screw', 'spree', 'smoky', 'whiff', 'scent', 'glade', 'spent', 'prism', 'stoke', 'riper', 'orbit', 'cocoa', 'guilt', 'humus', 'shush', 'table', 'smirk', 'wrong', 'noisy', 'alert', 'shiny', 'elate', 'resin', 'whole', 'hunch', 'pixel', 'polar', 'hotel', 'sword', 'cleat', 'mango', 'rumba', 'puffy', 'filly', 'billy', 'leash', 'clout', 'dance', 'ovate', 'facet', 'chili', 'paint', 'liner', 'curio', 'salty', 'audio', 'snake', 'fable', 'cloak', 'navel', 'spurt', 'pesto', 'balmy', 'flash', 'unwed', 'early', 'churn', 'weedy', 'stump', 'lease', 'witty', 'wimpy', 'spoof', 'saner', 'blend', 'salsa', 'thick', 'warty', 'manic', 'blare', 'squib', 'spoon', 'probe', 'crepe', 'knack', 'force', 'debut', 'order', 'haste', 'teeth', 'agent', 'widen', 'icily', 'slice', 'ingot', 'clash', 'juror', 'blood', 'abode', 'throw', 'unity', 'pivot', 'slept', 'troop', 'spare', 'sewer', 'parse', 'morph', 'cacti', 'tacky', 'spool', 'demon', 'moody', 'annex', 'begin', 'fuzzy', 'patch', 'water', 'lumpy', 'admin', 'omega', 'limit', 'tabby', 'macho', 'aisle', 'skiff', 'basis', 'plank', 'verge', 'botch', 'crawl', 'lousy', 'slain', 'cubic', 'raise', 'wrack', 'guide', 'foist', 'cameo', 'under', 'actor', 'revue', 'fraud', 'harpy', 'scoop', 'climb', 'refer', 'olden', 'clerk', 'debar', 'tally', 'ethic', 'cairn', 'tulle', 'ghoul', 'hilly', 'crude', 'apart', 'scale', 'older', 'plain', 'sperm', 'briny', 'abbot', 'rerun', 'quest', 'crisp', 'bound', 'befit', 'drawn', 'suite', 'itchy', 'cheer', 'bagel', 'guess', 'broad', 'axiom', 'chard', 'caput', 'leant', 'harsh', 'curse', 'proud', 'swing', 'opine', 'taste', 'lupus', 'gumbo', 'miner', 'green', 'chasm', 'lipid', 'topic', 'armor', 'brush', 'crane', 'mural', 'abled', 'habit', 'bossy', 'maker', 'dusky', 'dizzy', 'lithe', 'brook', 'jazzy', 'fifty', 'sense', 'giant', 'surly', 'legal', 'fatal', 'flunk', 'began', 'prune', 'small', 'slant', 'scoff', 'torus', 'ninny', 'covey', 'viper', 'taken', 'moral', 'vogue', 'owing', 'token', 'entry', 'booth', 'voter', 'chide', 'elfin', 'ebony', 'neigh', 'minim', 'melon', 'kneed', 'decoy', 'voila', 'ankle', 'arrow', 'mushy', 'tribe', 'cease', 'eager', 'birth', 'graph', 'odder', 'terra', 'weird', 'tried', 'clack', 'color', 'rough', 'weigh', 'uncut', 'ladle', 'strip', 'craft', 'minus', 'dicey', 'titan', 'lucid', 'vicar', 'dress', 'ditch', 'gypsy', 'pasta', 'taffy', 'flame', 'swoop', 'aloof', 'sight', 'broke', 'teary', 'chart', 'sixty', 'wordy', 'sheer', 'leper', 'nosey', 'bulge', 'savor', 'clamp', 'funky', 'foamy', 'toxic', 'brand', 'plumb', 'dingy', 'butte', 'drill', 'tripe', 'bicep', 'tenor', 'krill', 'worse', 'drama', 'hyena', 'think', 'ratio', 'cobra', 'basil', 'scrum', 'bused', 'phone', 'court', 'camel', 'proof', 'heard', 'angel', 'petal', 'pouty', 'throb', 'maybe', 'fetal', 'sprig', 'spine', 'shout', 'cadet', 'macro', 'dodgy', 'satyr', 'rarer', 'binge', 'trend', 'nutty', 'leapt', 'amiss', 'split', 'myrrh', 'width', 'sonar', 'tower', 'baron', 'fever', 'waver', 'spark', 'belie', 'sloop', 'expel', 'smote', 'baler', 'above', 'north', 'wafer', 'scant', 'frill', 'awash', 'snack', 'scowl', 'frail', 'drift', 'limbo', 'fence', 'motel', 'ounce', 'wreak', 'revel', 'talon', 'prior', 'knelt', 'cello', 'flake', 'debug', 'anode', 'crime', 'salve', 'scout', 'imbue', 'pinky', 'stave', 'vague', 'chock', 'fight', 'video', 'stone', 'teach', 'cleft', 'frost', 'prawn', 'booty', 'twist', 'apnea', 'stiff', 'plaza', 'ledge', 'tweak', 'board', 'grant', 'medic', 'bacon', 'cable', 'brawl', 'slunk', 'raspy', 'forum', 'drone', 'women', 'mucus', 'boast', 'toddy', 'coven', 'tumor', 'truer', 'wrath', 'stall', 'steam', 'axial', 'purer', 'daily', 'trail', 'niche', 'mealy', 'juice', 'nylon', 'plump', 'merry', 'flail', 'papal', 'wheat', 'berry', 'cower', 'erect', 'brute', 'leggy', 'snipe', 'sinew', 'skier', 'penny', 'jumpy', 'rally', 'umbra', 'scary', 'modem', 'gross', 'avian', 'greed', 'satin', 'tonic', 'parka', 'sniff', 'livid', 'stark', 'trump', 'giddy', 'reuse', 'taboo', 'avoid', 'quote', 'devil', 'liken', 'gloss', 'gayer', 'beret', 'noise', 'gland', 'dealt', 'sling', 'rumor', 'opera', 'thigh', 'tonga', 'flare', 'wound', 'white', 'bulky', 'etude', 'horse', 'circa', 'paddy', 'inbox', 'fizzy', 'grain', 'exert', 'surge', 'gleam', 'belle', 'salvo', 'crush', 'fruit', 'sappy', 'taker', 'tract', 'ovine', 'spiky', 'frank', 'reedy', 'filth', 'spasm', 'heave', 'mambo', 'right', 'clank', 'trust', 'lumen', 'borne', 'spook', 'sauce', 'amber', 'lathe', 'carat', 'corer', 'dirty', 'slyly', 'affix', 'alloy', 'taint', 'sheep', 'kinky', 'wooly', 'mauve', 'flung', 'yacht', 'fried', 'quail', 'brunt', 'grimy', 'curvy', 'cagey', 'rinse', 'deuce', 'state', 'grasp', 'milky', 'bison', 'graft', 'sandy', 'baste', 'flask', 'hedge', 'girly', 'swash', 'boney', 'coupe', 'endow', 'abhor', 'welch', 'blade', 'tight', 'geese', 'miser', 'mirth', 'cloud', 'cabal', 'leech', 'close', 'tenth', 'pecan', 'droit', 'grail', 'clone', 'guise', 'ralph', 'tango', 'biddy', 'smith', 'mower', 'payee', 'serif', 'drape', 'fifth', 'spank', 'glaze', 'allot', 'truck', 'kayak', 'virus', 'testy', 'tepee', 'fully', 'zonal', 'metro', 'curry', 'grand', 'banjo', 'axion', 'bezel', 'occur', 'chain', 'nasal', 'gooey', 'filer', 'brace', 'allay', 'pubic', 'raven', 'plead', 'gnash', 'flaky', 'munch', 'dully', 'eking', 'thing', 'slink', 'hurry', 'theft', 'shorn', 'pygmy', 'ranch', 'wring', 'lemon', 'shore', 'mamma', 'froze', 'newer', 'style', 'moose', 'antic', 'drown', 'vegan', 'chess', 'guppy', 'union', 'lever', 'lorry', 'image', 'cabby', 'druid', 'exact', 'truth', 'dopey', 'spear', 'cried', 'chime', 'crony', 'stunk', 'timid', 'batch', 'gauge', 'rotor', 'crack', 'curve', 'latte', 'witch', 'bunch', 'repel', 'anvil', 'soapy', 'meter', 'broth', 'madly', 'dried', 'scene', 'known', 'magma', 'roost', 'woman', 'thong', 'punch', 'pasty', 'downy', 'knead', 'whirl', 'rapid', 'clang', 'anger', 'drive', 'goofy', 'email', 'music', 'stuff', 'bleep', 'rider', 'mecca', 'folio', 'setup', 'verso', 'quash', 'fauna', 'gummy', 'happy', 'newly', 'fussy', 'relic', 'guava', 'ratty', 'fudge', 'femur', 'chirp', 'forte', 'alibi', 'whine', 'petty', 'golly', 'plait', 'fleck', 'felon', 'gourd', 'brown', 'thrum', 'ficus', 'stash', 'decry', 'wiser', 'junta', 'visor', 'daunt', 'scree', 'impel', 'await', 'press', 'whose', 'turbo', 'stoop', 'speak', 'mangy', 'eying', 'inlet', 'crone', 'pulse', 'mossy', 'staid', 'hence', 'pinch', 'teddy', 'sully', 'snore', 'ripen', 'snowy', 'attic', 'going', 'leach', 'mouth', 'hound', 'clump', 'tonal', 'bigot', 'peril', 'piece', 'blame', 'haute', 'spied', 'undid', 'intro', 'basal', 'shine', 'gecko', 'rodeo', 'guard', 'steer', 'loamy', 'scamp', 'scram', 'manly', 'hello', 'vaunt', 'organ', 'feral', 'knock', 'extra', 'condo', 'adapt', 'willy', 'polka', 'rayon', 'skirt', 'faith', 'torso', 'match', 'mercy', 'tepid', 'sleek', 'riser', 'twixt', 'peace', 'flush', 'catty', 'login', 'eject', 'roger', 'rival', 'untie', 'refit', 'aorta', 'adult', 'judge', 'rower', 'artsy', 'rural', 'shave', 'bobby', 'eclat', 'fella', 'gaily', 'harry', 'hasty', 'hydro', 'liege', 'octal', 'ombre', 'payer', 'sooth', 'unset', 'unlit', 'vomit', 'fanny']));
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $elm$random$Random$peel = function (_v0) {
	var state = _v0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var $elm$random$Random$int = F2(
	function (a, b) {
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
				var lo = _v0.a;
				var hi = _v0.b;
				var range = (hi - lo) + 1;
				if (!((range - 1) & range)) {
					return _Utils_Tuple2(
						(((range - 1) & $elm$random$Random$peel(seed0)) >>> 0) + lo,
						$elm$random$Random$next(seed0));
				} else {
					var threshhold = (((-range) >>> 0) % range) >>> 0;
					var accountForBias = function (seed) {
						accountForBias:
						while (true) {
							var x = $elm$random$Random$peel(seed);
							var seedN = $elm$random$Random$next(seed);
							if (_Utils_cmp(x, threshhold) < 0) {
								var $temp$seed = seedN;
								seed = $temp$seed;
								continue accountForBias;
							} else {
								return _Utils_Tuple2((x % range) + lo, seedN);
							}
						}
					};
					return accountForBias(seed0);
				}
			});
	});
var $author$project$Words$sample = function (arr) {
	var gen = A2(
		$elm$random$Random$int,
		0,
		$elm$core$Array$length(arr) - 1);
	return A2(
		$elm$random$Random$map,
		function (index) {
			return A2($elm$core$Array$get, index, arr);
		},
		gen);
};
var $author$project$Words$random = $author$project$Words$sample($author$project$Words$playWords);
var $author$project$Main$newGame = A2($elm$random$Random$generate, $author$project$Main$NewWord, $author$project$Words$random);
var $author$project$Main$init = function (_v0) {
	return _Utils_Tuple2($author$project$Main$Loading, $author$project$Main$newGame);
};
var $author$project$Main$KeyPressed = function (a) {
	return {$: 'KeyPressed', a: a};
};
var $author$project$Main$decodeKey = A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string);
var $elm$browser$Browser$Events$Document = {$: 'Document'};
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 'MySub', a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {pids: pids, subs: subs};
	});
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (node.$ === 'Document') {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {event: event, key: key};
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (node.$ === 'Document') {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.pids,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.key;
		var event = _v0.event;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.subs);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onKeyDown = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'keydown');
var $author$project$Main$subscriptions = function (_v0) {
	return $elm$browser$Browser$Events$onKeyDown(
		A2($elm$json$Json$Decode$map, $author$project$Main$KeyPressed, $author$project$Main$decodeKey));
};
var $author$project$Main$Guessing = function (a) {
	return {$: 'Guessing', a: a};
};
var $author$project$Main$Lost = function (a) {
	return {$: 'Lost', a: a};
};
var $author$project$Main$Won = function (a) {
	return {$: 'Won', a: a};
};
var $author$project$Main$allowedGuesses = 6;
var $elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3($elm$core$String$slice, 0, -n, string);
	});
var $author$project$Main$isKeyALetter = function (key) {
	var _v0 = $elm$core$String$uncons(key);
	if ((_v0.$ === 'Just') && (_v0.a.b === '')) {
		var _v1 = _v0.a;
		var _char = _v1.a;
		return $elm$core$Char$isAlpha(_char);
	} else {
		return false;
	}
};
var $elm$core$Array$filter = F2(
	function (isGood, array) {
		return $elm$core$Array$fromList(
			A3(
				$elm$core$Array$foldr,
				F2(
					function (x, xs) {
						return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
					}),
				_List_Nil,
				array));
	});
var $author$project$Words$arrayContains = F2(
	function (element, array) {
		return $elm$core$Array$length(
			A2(
				$elm$core$Array$filter,
				function (x) {
					return _Utils_eq(x, element);
				},
				array)) > 0;
	});
var $author$project$Words$validWords = $elm$core$Array$fromList(
	_List_fromArray(
		['aahed', 'aalii', 'aargh', 'aarti', 'abaca', 'abaci', 'abacs', 'abaft', 'abaka', 'abamp', 'aband', 'abash', 'abask', 'abaya', 'abbas', 'abbed', 'abbes', 'abcee', 'abeam', 'abear', 'abele', 'abers', 'abets', 'abies', 'abler', 'ables', 'ablet', 'ablow', 'abmho', 'abohm', 'aboil', 'aboma', 'aboon', 'abord', 'abore', 'abram', 'abray', 'abrim', 'abrin', 'abris', 'absey', 'absit', 'abuna', 'abune', 'abuts', 'abuzz', 'abyes', 'abysm', 'acais', 'acari', 'accas', 'accoy', 'acerb', 'acers', 'aceta', 'achar', 'ached', 'aches', 'achoo', 'acids', 'acidy', 'acing', 'acini', 'ackee', 'acker', 'acmes', 'acmic', 'acned', 'acnes', 'acock', 'acold', 'acred', 'acres', 'acros', 'acted', 'actin', 'acton', 'acyls', 'adaws', 'adays', 'adbot', 'addax', 'added', 'adder', 'addio', 'addle', 'adeem', 'adhan', 'adieu', 'adios', 'adits', 'adman', 'admen', 'admix', 'adobo', 'adown', 'adoze', 'adrad', 'adred', 'adsum', 'aduki', 'adunc', 'adust', 'advew', 'adyta', 'adzed', 'adzes', 'aecia', 'aedes', 'aegis', 'aeons', 'aerie', 'aeros', 'aesir', 'afald', 'afara', 'afars', 'afear', 'aflaj', 'afore', 'afrit', 'afros', 'agama', 'agami', 'agars', 'agast', 'agave', 'agaze', 'agene', 'agers', 'agger', 'aggie', 'aggri', 'aggro', 'aggry', 'aghas', 'agila', 'agios', 'agism', 'agist', 'agita', 'aglee', 'aglet', 'agley', 'agloo', 'aglus', 'agmas', 'agoge', 'agone', 'agons', 'agood', 'agora', 'agria', 'agrin', 'agros', 'agued', 'agues', 'aguna', 'aguti', 'aheap', 'ahent', 'ahigh', 'ahind', 'ahing', 'ahint', 'ahold', 'ahull', 'ahuru', 'aidas', 'aided', 'aides', 'aidoi', 'aidos', 'aiery', 'aigas', 'aight', 'ailed', 'aimed', 'aimer', 'ainee', 'ainga', 'aioli', 'aired', 'airer', 'airns', 'airth', 'airts', 'aitch', 'aitus', 'aiver', 'aiyee', 'aizle', 'ajies', 'ajiva', 'ajuga', 'ajwan', 'akees', 'akela', 'akene', 'aking', 'akita', 'akkas', 'alaap', 'alack', 'alamo', 'aland', 'alane', 'alang', 'alans', 'alant', 'alapa', 'alaps', 'alary', 'alate', 'alays', 'albas', 'albee', 'alcid', 'alcos', 'aldea', 'alder', 'aldol', 'aleck', 'alecs', 'alefs', 'aleft', 'aleph', 'alews', 'aleye', 'alfas', 'algal', 'algas', 'algid', 'algin', 'algor', 'algum', 'alias', 'alifs', 'aline', 'alist', 'aliya', 'alkie', 'alkos', 'alkyd', 'alkyl', 'allee', 'allel', 'allis', 'allod', 'allyl', 'almah', 'almas', 'almeh', 'almes', 'almud', 'almug', 'alods', 'aloed', 'aloes', 'aloha', 'aloin', 'aloos', 'alowe', 'altho', 'altos', 'alula', 'alums', 'alure', 'alvar', 'alway', 'amahs', 'amain', 'amate', 'amaut', 'amban', 'ambit', 'ambos', 'ambry', 'ameba', 'ameer', 'amene', 'amens', 'ament', 'amias', 'amice', 'amici', 'amide', 'amido', 'amids', 'amies', 'amiga', 'amigo', 'amine', 'amino', 'amins', 'amirs', 'amlas', 'amman', 'ammon', 'ammos', 'amnia', 'amnic', 'amnio', 'amoks', 'amole', 'amort', 'amour', 'amove', 'amowt', 'amped', 'ampul', 'amrit', 'amuck', 'amyls', 'anana', 'anata', 'ancho', 'ancle', 'ancon', 'andro', 'anear', 'anele', 'anent', 'angas', 'anglo', 'anigh', 'anile', 'anils', 'anima', 'animi', 'anion', 'anise', 'anker', 'ankhs', 'ankus', 'anlas', 'annal', 'annas', 'annat', 'anoas', 'anole', 'anomy', 'ansae', 'antae', 'antar', 'antas', 'anted', 'antes', 'antis', 'antra', 'antre', 'antsy', 'anura', 'anyon', 'apace', 'apage', 'apaid', 'apayd', 'apays', 'apeak', 'apeek', 'apers', 'apert', 'apery', 'apgar', 'aphis', 'apian', 'apiol', 'apish', 'apism', 'apode', 'apods', 'apoop', 'aport', 'appal', 'appay', 'appel', 'appro', 'appui', 'appuy', 'apres', 'apses', 'apsis', 'apsos', 'apted', 'apter', 'aquae', 'aquas', 'araba', 'araks', 'arame', 'arars', 'arbas', 'arced', 'archi', 'arcos', 'arcus', 'ardeb', 'ardri', 'aread', 'areae', 'areal', 'arear', 'areas', 'areca', 'aredd', 'arede', 'arefy', 'areic', 'arene', 'arepa', 'arere', 'arete', 'arets', 'arett', 'argal', 'argan', 'argil', 'argle', 'argol', 'argon', 'argot', 'argus', 'arhat', 'arias', 'ariel', 'ariki', 'arils', 'ariot', 'arish', 'arked', 'arled', 'arles', 'armed', 'armer', 'armet', 'armil', 'arnas', 'arnut', 'aroba', 'aroha', 'aroid', 'arpas', 'arpen', 'arrah', 'arras', 'arret', 'arris', 'arroz', 'arsed', 'arses', 'arsey', 'arsis', 'artal', 'artel', 'artic', 'artis', 'aruhe', 'arums', 'arval', 'arvee', 'arvos', 'aryls', 'asana', 'ascon', 'ascus', 'asdic', 'ashed', 'ashes', 'ashet', 'asked', 'asker', 'askoi', 'askos', 'aspen', 'asper', 'aspic', 'aspie', 'aspis', 'aspro', 'assai', 'assam', 'asses', 'assez', 'assot', 'aster', 'astir', 'astun', 'asura', 'asway', 'aswim', 'asyla', 'ataps', 'ataxy', 'atigi', 'atilt', 'atimy', 'atlas', 'atman', 'atmas', 'atmos', 'atocs', 'atoke', 'atoks', 'atoms', 'atomy', 'atony', 'atopy', 'atria', 'atrip', 'attap', 'attar', 'atuas', 'audad', 'auger', 'aught', 'aulas', 'aulic', 'auloi', 'aulos', 'aumil', 'aunes', 'aunts', 'aurae', 'aural', 'aurar', 'auras', 'aurei', 'aures', 'auric', 'auris', 'aurum', 'autos', 'auxin', 'avale', 'avant', 'avast', 'avels', 'avens', 'avers', 'avgas', 'avine', 'avion', 'avise', 'aviso', 'avize', 'avows', 'avyze', 'awarn', 'awato', 'awave', 'aways', 'awdls', 'aweel', 'aweto', 'awing', 'awmry', 'awned', 'awner', 'awols', 'awork', 'axels', 'axile', 'axils', 'axing', 'axite', 'axled', 'axles', 'axman', 'axmen', 'axoid', 'axone', 'axons', 'ayahs', 'ayaya', 'ayelp', 'aygre', 'ayins', 'ayont', 'ayres', 'ayrie', 'azans', 'azide', 'azido', 'azine', 'azlon', 'azoic', 'azole', 'azons', 'azote', 'azoth', 'azuki', 'azurn', 'azury', 'azygy', 'azyme', 'azyms', 'baaed', 'baals', 'babas', 'babel', 'babes', 'babka', 'baboo', 'babul', 'babus', 'bacca', 'bacco', 'baccy', 'bacha', 'bachs', 'backs', 'baddy', 'baels', 'baffs', 'baffy', 'bafts', 'baghs', 'bagie', 'bahts', 'bahus', 'bahut', 'bails', 'bairn', 'baisa', 'baith', 'baits', 'baiza', 'baize', 'bajan', 'bajra', 'bajri', 'bajus', 'baked', 'baken', 'bakes', 'bakra', 'balas', 'balds', 'baldy', 'baled', 'bales', 'balks', 'balky', 'balls', 'bally', 'balms', 'baloo', 'balsa', 'balti', 'balun', 'balus', 'bambi', 'banak', 'banco', 'bancs', 'banda', 'bandh', 'bands', 'bandy', 'baned', 'banes', 'bangs', 'bania', 'banks', 'banns', 'bants', 'bantu', 'banty', 'banya', 'bapus', 'barbe', 'barbs', 'barby', 'barca', 'barde', 'bardo', 'bards', 'bardy', 'bared', 'barer', 'bares', 'barfi', 'barfs', 'baric', 'barks', 'barky', 'barms', 'barmy', 'barns', 'barny', 'barps', 'barra', 'barre', 'barro', 'barry', 'barye', 'basan', 'based', 'basen', 'baser', 'bases', 'basho', 'basij', 'basks', 'bason', 'basse', 'bassi', 'basso', 'bassy', 'basta', 'basti', 'basto', 'basts', 'bated', 'bates', 'baths', 'batik', 'batta', 'batts', 'battu', 'bauds', 'bauks', 'baulk', 'baurs', 'bavin', 'bawds', 'bawks', 'bawls', 'bawns', 'bawrs', 'bawty', 'bayed', 'bayer', 'bayes', 'bayle', 'bayts', 'bazar', 'bazoo', 'beads', 'beaks', 'beaky', 'beals', 'beams', 'beamy', 'beano', 'beans', 'beany', 'beare', 'bears', 'beath', 'beats', 'beaty', 'beaus', 'beaut', 'beaux', 'bebop', 'becap', 'becke', 'becks', 'bedad', 'bedel', 'bedes', 'bedew', 'bedim', 'bedye', 'beedi', 'beefs', 'beeps', 'beers', 'beery', 'beets', 'befog', 'begad', 'begar', 'begem', 'begot', 'begum', 'beige', 'beigy', 'beins', 'bekah', 'belah', 'belar', 'belay', 'belee', 'belga', 'bells', 'belon', 'belts', 'bemad', 'bemas', 'bemix', 'bemud', 'bends', 'bendy', 'benes', 'benet', 'benga', 'benis', 'benne', 'benni', 'benny', 'bento', 'bents', 'benty', 'bepat', 'beray', 'beres', 'bergs', 'berko', 'berks', 'berme', 'berms', 'berob', 'beryl', 'besat', 'besaw', 'besee', 'beses', 'besit', 'besom', 'besot', 'besti', 'bests', 'betas', 'beted', 'betes', 'beths', 'betid', 'beton', 'betta', 'betty', 'bever', 'bevor', 'bevue', 'bevvy', 'bewet', 'bewig', 'bezes', 'bezil', 'bezzy', 'bhais', 'bhaji', 'bhang', 'bhats', 'bhels', 'bhoot', 'bhuna', 'bhuts', 'biach', 'biali', 'bialy', 'bibbs', 'bibes', 'biccy', 'bices', 'bided', 'bider', 'bides', 'bidet', 'bidis', 'bidon', 'bield', 'biers', 'biffo', 'biffs', 'biffy', 'bifid', 'bigae', 'biggs', 'biggy', 'bigha', 'bight', 'bigly', 'bigos', 'bijou', 'biked', 'biker', 'bikes', 'bikie', 'bilbo', 'bilby', 'biled', 'biles', 'bilgy', 'bilks', 'bills', 'bimah', 'bimas', 'bimbo', 'binal', 'bindi', 'binds', 'biner', 'bines', 'bings', 'bingy', 'binit', 'binks', 'bints', 'biogs', 'biont', 'biota', 'biped', 'bipod', 'birds', 'birks', 'birle', 'birls', 'biros', 'birrs', 'birse', 'birsy', 'bises', 'bisks', 'bisom', 'bitch', 'biter', 'bites', 'bitos', 'bitou', 'bitsy', 'bitte', 'bitts', 'bivia', 'bivvy', 'bizes', 'bizzo', 'bizzy', 'blabs', 'blads', 'blady', 'blaer', 'blaes', 'blaff', 'blags', 'blahs', 'blain', 'blams', 'blart', 'blase', 'blash', 'blate', 'blats', 'blatt', 'blaud', 'blawn', 'blaws', 'blays', 'blear', 'blebs', 'blech', 'blees', 'blent', 'blert', 'blest', 'blets', 'bleys', 'blimy', 'bling', 'blini', 'blins', 'bliny', 'blips', 'blist', 'blite', 'blits', 'blive', 'blobs', 'blocs', 'blogs', 'blook', 'bloop', 'blore', 'blots', 'blows', 'blowy', 'blubs', 'blude', 'bluds', 'bludy', 'blued', 'blues', 'bluet', 'bluey', 'bluid', 'blume', 'blunk', 'blurs', 'blype', 'boabs', 'boaks', 'boars', 'boart', 'boats', 'bobac', 'bobak', 'bobas', 'bobol', 'bobos', 'bocca', 'bocce', 'bocci', 'boche', 'bocks', 'boded', 'bodes', 'bodge', 'bodhi', 'bodle', 'boeps', 'boets', 'boeuf', 'boffo', 'boffs', 'bogan', 'bogey', 'boggy', 'bogie', 'bogle', 'bogue', 'bogus', 'bohea', 'bohos', 'boils', 'boing', 'boink', 'boite', 'boked', 'bokeh', 'bokes', 'bokos', 'bolar', 'bolas', 'bolds', 'boles', 'bolix', 'bolls', 'bolos', 'bolts', 'bolus', 'bomas', 'bombe', 'bombo', 'bombs', 'bonce', 'bonds', 'boned', 'boner', 'bones', 'bongs', 'bonie', 'bonks', 'bonne', 'bonny', 'bonza', 'bonze', 'booai', 'booay', 'boobs', 'boody', 'booed', 'boofy', 'boogy', 'boohs', 'books', 'booky', 'bools', 'booms', 'boomy', 'boong', 'boons', 'boord', 'boors', 'boose', 'boots', 'boppy', 'borak', 'boral', 'boras', 'borde', 'bords', 'bored', 'boree', 'borel', 'borer', 'bores', 'borgo', 'boric', 'borks', 'borms', 'borna', 'boron', 'borts', 'borty', 'bortz', 'bosie', 'bosks', 'bosky', 'boson', 'bosun', 'botas', 'botel', 'botes', 'bothy', 'botte', 'botts', 'botty', 'bouge', 'bouks', 'boult', 'bouns', 'bourd', 'bourg', 'bourn', 'bouse', 'bousy', 'bouts', 'bovid', 'bowat', 'bowed', 'bower', 'bowes', 'bowet', 'bowie', 'bowls', 'bowne', 'bowrs', 'bowse', 'boxed', 'boxen', 'boxes', 'boxla', 'boxty', 'boyar', 'boyau', 'boyed', 'boyfs', 'boygs', 'boyla', 'boyos', 'boysy', 'bozos', 'braai', 'brach', 'brack', 'bract', 'brads', 'braes', 'brags', 'brail', 'braks', 'braky', 'brame', 'brane', 'brank', 'brans', 'brant', 'brast', 'brats', 'brava', 'bravi', 'braws', 'braxy', 'brays', 'braza', 'braze', 'bream', 'brede', 'breds', 'breem', 'breer', 'brees', 'breid', 'breis', 'breme', 'brens', 'brent', 'brere', 'brers', 'breve', 'brews', 'breys', 'brier', 'bries', 'brigs', 'briki', 'briks', 'brill', 'brims', 'brins', 'brios', 'brise', 'briss', 'brith', 'brits', 'britt', 'brize', 'broch', 'brock', 'brods', 'brogh', 'brogs', 'brome', 'bromo', 'bronc', 'brond', 'brool', 'broos', 'brose', 'brosy', 'brows', 'brugh', 'bruin', 'bruit', 'brule', 'brume', 'brung', 'brusk', 'brust', 'bruts', 'buats', 'buaze', 'bubal', 'bubas', 'bubba', 'bubbe', 'bubby', 'bubus', 'buchu', 'bucko', 'bucks', 'bucku', 'budas', 'budis', 'budos', 'buffa', 'buffe', 'buffi', 'buffo', 'buffs', 'buffy', 'bufos', 'bufty', 'buhls', 'buhrs', 'buiks', 'buist', 'bukes', 'bulbs', 'bulgy', 'bulks', 'bulla', 'bulls', 'bulse', 'bumbo', 'bumfs', 'bumph', 'bumps', 'bumpy', 'bunas', 'bunce', 'bunco', 'bunde', 'bundh', 'bunds', 'bundt', 'bundu', 'bundy', 'bungs', 'bungy', 'bunia', 'bunje', 'bunjy', 'bunko', 'bunks', 'bunns', 'bunts', 'bunty', 'bunya', 'buoys', 'buppy', 'buran', 'buras', 'burbs', 'burds', 'buret', 'burfi', 'burgh', 'burgs', 'burin', 'burka', 'burke', 'burks', 'burls', 'burns', 'buroo', 'burps', 'burqa', 'burro', 'burrs', 'burry', 'bursa', 'burse', 'busby', 'buses', 'busks', 'busky', 'bussu', 'busti', 'busts', 'busty', 'buteo', 'butes', 'butle', 'butoh', 'butts', 'butty', 'butut', 'butyl', 'buzzy', 'bwana', 'bwazi', 'byded', 'bydes', 'byked', 'bykes', 'byres', 'byrls', 'byssi', 'bytes', 'byway', 'caaed', 'cabas', 'caber', 'cabob', 'caboc', 'cabre', 'cacas', 'cacks', 'cacky', 'cadee', 'cades', 'cadge', 'cadgy', 'cadie', 'cadis', 'cadre', 'caeca', 'caese', 'cafes', 'caffs', 'caged', 'cager', 'cages', 'cagot', 'cahow', 'caids', 'cains', 'caird', 'cajon', 'cajun', 'caked', 'cakes', 'cakey', 'calfs', 'calid', 'calif', 'calix', 'calks', 'calla', 'calls', 'calms', 'calmy', 'calos', 'calpa', 'calps', 'calve', 'calyx', 'caman', 'camas', 'cames', 'camis', 'camos', 'campi', 'campo', 'camps', 'campy', 'camus', 'caned', 'caneh', 'caner', 'canes', 'cangs', 'canid', 'canna', 'canns', 'canso', 'canst', 'canto', 'cants', 'canty', 'capas', 'caped', 'capes', 'capex', 'caphs', 'capiz', 'caple', 'capon', 'capos', 'capot', 'capri', 'capul', 'carap', 'carbo', 'carbs', 'carby', 'cardi', 'cards', 'cardy', 'cared', 'carer', 'cares', 'caret', 'carex', 'carks', 'carle', 'carls', 'carns', 'carny', 'carob', 'carom', 'caron', 'carpi', 'carps', 'carrs', 'carse', 'carta', 'carte', 'carts', 'carvy', 'casas', 'casco', 'cased', 'cases', 'casks', 'casky', 'casts', 'casus', 'cates', 'cauda', 'cauks', 'cauld', 'cauls', 'caums', 'caups', 'cauri', 'causa', 'cavas', 'caved', 'cavel', 'caver', 'caves', 'cavie', 'cawed', 'cawks', 'caxon', 'ceaze', 'cebid', 'cecal', 'cecum', 'ceded', 'ceder', 'cedes', 'cedis', 'ceiba', 'ceili', 'ceils', 'celeb', 'cella', 'celli', 'cells', 'celom', 'celts', 'cense', 'cento', 'cents', 'centu', 'ceorl', 'cepes', 'cerci', 'cered', 'ceres', 'cerge', 'ceria', 'ceric', 'cerne', 'ceroc', 'ceros', 'certs', 'certy', 'cesse', 'cesta', 'cesti', 'cetes', 'cetyl', 'cezve', 'chace', 'chack', 'chaco', 'chado', 'chads', 'chaft', 'chais', 'chals', 'chams', 'chana', 'chang', 'chank', 'chape', 'chaps', 'chapt', 'chara', 'chare', 'chark', 'charr', 'chars', 'chary', 'chats', 'chave', 'chavs', 'chawk', 'chaws', 'chaya', 'chays', 'cheep', 'chefs', 'cheka', 'chela', 'chelp', 'chemo', 'chems', 'chere', 'chert', 'cheth', 'chevy', 'chews', 'chewy', 'chiao', 'chias', 'chibs', 'chica', 'chich', 'chico', 'chics', 'chiel', 'chiks', 'chile', 'chimb', 'chimo', 'chimp', 'chine', 'ching', 'chink', 'chino', 'chins', 'chips', 'chirk', 'chirl', 'chirm', 'chiro', 'chirr', 'chirt', 'chiru', 'chits', 'chive', 'chivs', 'chivy', 'chizz', 'choco', 'chocs', 'chode', 'chogs', 'choil', 'choko', 'choky', 'chola', 'choli', 'cholo', 'chomp', 'chons', 'choof', 'chook', 'choom', 'choon', 'chops', 'chota', 'chott', 'chout', 'choux', 'chowk', 'chows', 'chubs', 'chufa', 'chuff', 'chugs', 'chums', 'churl', 'churr', 'chuse', 'chuts', 'chyle', 'chyme', 'chynd', 'cibol', 'cided', 'cides', 'ciels', 'ciggy', 'cilia', 'cills', 'cimar', 'cimex', 'cinct', 'cines', 'cinqs', 'cions', 'cippi', 'circs', 'cires', 'cirls', 'cirri', 'cisco', 'cissy', 'cists', 'cital', 'cited', 'citer', 'cites', 'cives', 'civet', 'civie', 'civvy', 'clach', 'clade', 'clads', 'claes', 'clags', 'clame', 'clams', 'clans', 'claps', 'clapt', 'claro', 'clart', 'clary', 'clast', 'clats', 'claut', 'clave', 'clavi', 'claws', 'clays', 'cleck', 'cleek', 'cleep', 'clefs', 'clegs', 'cleik', 'clems', 'clepe', 'clept', 'cleve', 'clews', 'clied', 'clies', 'clift', 'clime', 'cline', 'clint', 'clipe', 'clips', 'clipt', 'clits', 'cloam', 'clods', 'cloff', 'clogs', 'cloke', 'clomb', 'clomp', 'clonk', 'clons', 'cloop', 'cloot', 'clops', 'clote', 'clots', 'clour', 'clous', 'clows', 'cloye', 'cloys', 'cloze', 'clubs', 'clues', 'cluey', 'clunk', 'clype', 'cnida', 'coact', 'coady', 'coala', 'coals', 'coaly', 'coapt', 'coarb', 'coate', 'coati', 'coats', 'cobbs', 'cobby', 'cobia', 'coble', 'cobza', 'cocas', 'cocci', 'cocco', 'cocks', 'cocky', 'cocos', 'codas', 'codec', 'coded', 'coden', 'coder', 'codes', 'codex', 'codon', 'coeds', 'coffs', 'cogie', 'cogon', 'cogue', 'cohab', 'cohen', 'cohoe', 'cohog', 'cohos', 'coifs', 'coign', 'coils', 'coins', 'coirs', 'coits', 'coked', 'cokes', 'colas', 'colby', 'colds', 'coled', 'coles', 'coley', 'colic', 'colin', 'colls', 'colly', 'colog', 'colts', 'colza', 'comae', 'comal', 'comas', 'combe', 'combi', 'combo', 'combs', 'comby', 'comer', 'comes', 'comix', 'commo', 'comms', 'commy', 'compo', 'comps', 'compt', 'comte', 'comus', 'coned', 'cones', 'coney', 'confs', 'conga', 'conge', 'congo', 'conia', 'conin', 'conks', 'conky', 'conne', 'conns', 'conte', 'conto', 'conus', 'convo', 'cooch', 'cooed', 'cooee', 'cooer', 'cooey', 'coofs', 'cooks', 'cooky', 'cools', 'cooly', 'coomb', 'cooms', 'coomy', 'coons', 'coops', 'coopt', 'coost', 'coots', 'cooze', 'copal', 'copay', 'coped', 'copen', 'coper', 'copes', 'coppy', 'copra', 'copsy', 'coqui', 'coram', 'corbe', 'corby', 'cords', 'cored', 'cores', 'corey', 'corgi', 'coria', 'corks', 'corky', 'corms', 'corni', 'corno', 'corns', 'cornu', 'corps', 'corse', 'corso', 'cosec', 'cosed', 'coses', 'coset', 'cosey', 'cosie', 'costa', 'coste', 'costs', 'cotan', 'coted', 'cotes', 'coths', 'cotta', 'cotts', 'coude', 'coups', 'courb', 'courd', 'coure', 'cours', 'couta', 'couth', 'coved', 'coves', 'covin', 'cowal', 'cowan', 'cowed', 'cowks', 'cowls', 'cowps', 'cowry', 'coxae', 'coxal', 'coxed', 'coxes', 'coxib', 'coyau', 'coyed', 'coyer', 'coypu', 'cozed', 'cozen', 'cozes', 'cozey', 'cozie', 'craal', 'crabs', 'crags', 'craic', 'craig', 'crake', 'crame', 'crams', 'crans', 'crape', 'craps', 'crapy', 'crare', 'craws', 'crays', 'creds', 'creel', 'crees', 'crems', 'crena', 'creps', 'crepy', 'crewe', 'crews', 'crias', 'cribs', 'cries', 'crims', 'crine', 'crios', 'cripe', 'crips', 'crise', 'crith', 'crits', 'croci', 'crocs', 'croft', 'crogs', 'cromb', 'crome', 'cronk', 'crons', 'crool', 'croon', 'crops', 'crore', 'crost', 'crout', 'crows', 'croze', 'cruck', 'crudo', 'cruds', 'crudy', 'crues', 'cruet', 'cruft', 'crunk', 'cruor', 'crura', 'cruse', 'crusy', 'cruve', 'crwth', 'cryer', 'ctene', 'cubby', 'cubeb', 'cubed', 'cuber', 'cubes', 'cubit', 'cuddy', 'cuffo', 'cuffs', 'cuifs', 'cuing', 'cuish', 'cuits', 'cukes', 'culch', 'culet', 'culex', 'culls', 'cully', 'culms', 'culpa', 'culti', 'cults', 'culty', 'cumec', 'cundy', 'cunei', 'cunit', 'cunts', 'cupel', 'cupid', 'cuppa', 'cuppy', 'curat', 'curbs', 'curch', 'curds', 'curdy', 'cured', 'curer', 'cures', 'curet', 'curfs', 'curia', 'curie', 'curli', 'curls', 'curns', 'curny', 'currs', 'cursi', 'curst', 'cusec', 'cushy', 'cusks', 'cusps', 'cuspy', 'cusso', 'cusum', 'cutch', 'cuter', 'cutes', 'cutey', 'cutin', 'cutis', 'cutto', 'cutty', 'cutup', 'cuvee', 'cuzes', 'cwtch', 'cyano', 'cyans', 'cycad', 'cycas', 'cyclo', 'cyder', 'cylix', 'cymae', 'cymar', 'cymas', 'cymes', 'cymol', 'cysts', 'cytes', 'cyton', 'czars', 'daals', 'dabba', 'daces', 'dacha', 'dacks', 'dadah', 'dadas', 'dados', 'daffs', 'daffy', 'dagga', 'daggy', 'dagos', 'dahls', 'daiko', 'daine', 'daint', 'daker', 'daled', 'dales', 'dalis', 'dalle', 'dalts', 'daman', 'damar', 'dames', 'damme', 'damns', 'damps', 'dampy', 'dancy', 'dangs', 'danio', 'danks', 'danny', 'dants', 'daraf', 'darbs', 'darcy', 'dared', 'darer', 'dares', 'darga', 'dargs', 'daric', 'daris', 'darks', 'darky', 'darns', 'darre', 'darts', 'darzi', 'dashi', 'dashy', 'datal', 'dated', 'dater', 'dates', 'datos', 'datto', 'daube', 'daubs', 'dauby', 'dauds', 'dault', 'daurs', 'dauts', 'daven', 'davit', 'dawah', 'dawds', 'dawed', 'dawen', 'dawks', 'dawns', 'dawts', 'dayan', 'daych', 'daynt', 'dazed', 'dazer', 'dazes', 'deads', 'deair', 'deals', 'deans', 'deare', 'dearn', 'dears', 'deary', 'deash', 'deave', 'deaws', 'deawy', 'debag', 'debby', 'debel', 'debes', 'debts', 'debud', 'debur', 'debus', 'debye', 'decad', 'decaf', 'decan', 'decko', 'decks', 'decos', 'dedal', 'deeds', 'deedy', 'deely', 'deems', 'deens', 'deeps', 'deere', 'deers', 'deets', 'deeve', 'deevs', 'defat', 'deffo', 'defis', 'defog', 'degas', 'degum', 'degus', 'deice', 'deids', 'deify', 'deils', 'deism', 'deist', 'deked', 'dekes', 'dekko', 'deled', 'deles', 'delfs', 'delft', 'delis', 'dells', 'delly', 'delos', 'delph', 'delts', 'deman', 'demes', 'demic', 'demit', 'demob', 'demoi', 'demos', 'dempt', 'denar', 'denay', 'dench', 'denes', 'denet', 'denis', 'dents', 'deoxy', 'derat', 'deray', 'dered', 'deres', 'derig', 'derma', 'derms', 'derns', 'derny', 'deros', 'derro', 'derry', 'derth', 'dervs', 'desex', 'deshi', 'desis', 'desks', 'desse', 'devas', 'devel', 'devis', 'devon', 'devos', 'devot', 'dewan', 'dewar', 'dewax', 'dewed', 'dexes', 'dexie', 'dhaba', 'dhaks', 'dhals', 'dhikr', 'dhobi', 'dhole', 'dholl', 'dhols', 'dhoti', 'dhows', 'dhuti', 'diact', 'dials', 'diane', 'diazo', 'dibbs', 'diced', 'dicer', 'dices', 'dicht', 'dicks', 'dicky', 'dicot', 'dicta', 'dicts', 'dicty', 'diddy', 'didie', 'didos', 'didst', 'diebs', 'diels', 'diene', 'diets', 'diffs', 'dight', 'dikas', 'diked', 'diker', 'dikes', 'dikey', 'dildo', 'dilli', 'dills', 'dimbo', 'dimer', 'dimes', 'dimps', 'dinar', 'dined', 'dines', 'dinge', 'dings', 'dinic', 'dinks', 'dinky', 'dinna', 'dinos', 'dints', 'diols', 'diota', 'dippy', 'dipso', 'diram', 'direr', 'dirke', 'dirks', 'dirls', 'dirts', 'disas', 'disci', 'discs', 'dishy', 'disks', 'disme', 'dital', 'ditas', 'dited', 'dites', 'ditsy', 'ditts', 'ditzy', 'divan', 'divas', 'dived', 'dives', 'divis', 'divna', 'divos', 'divot', 'divvy', 'diwan', 'dixie', 'dixit', 'diyas', 'dizen', 'djinn', 'djins', 'doabs', 'doats', 'dobby', 'dobes', 'dobie', 'dobla', 'dobra', 'dobro', 'docht', 'docks', 'docos', 'docus', 'doddy', 'dodos', 'doeks', 'doers', 'doest', 'doeth', 'doffs', 'dogan', 'doges', 'dogey', 'doggo', 'doggy', 'dogie', 'dohyo', 'doilt', 'doily', 'doits', 'dojos', 'dolce', 'dolci', 'doled', 'doles', 'dolia', 'dolls', 'dolma', 'dolor', 'dolos', 'dolts', 'domal', 'domed', 'domes', 'domic', 'donah', 'donas', 'donee', 'doner', 'donga', 'dongs', 'donko', 'donna', 'donne', 'donny', 'donsy', 'doobs', 'dooce', 'doody', 'dooks', 'doole', 'dools', 'dooly', 'dooms', 'doomy', 'doona', 'doorn', 'doors', 'doozy', 'dopas', 'doped', 'doper', 'dopes', 'dorad', 'dorba', 'dorbs', 'doree', 'dores', 'doric', 'doris', 'dorks', 'dorky', 'dorms', 'dormy', 'dorps', 'dorrs', 'dorsa', 'dorse', 'dorts', 'dorty', 'dosai', 'dosas', 'dosed', 'doseh', 'doser', 'doses', 'dosha', 'dotal', 'doted', 'doter', 'dotes', 'dotty', 'douar', 'douce', 'doucs', 'douks', 'doula', 'douma', 'doums', 'doups', 'doura', 'douse', 'douts', 'doved', 'doven', 'dover', 'doves', 'dovie', 'dowar', 'dowds', 'dowed', 'dower', 'dowie', 'dowle', 'dowls', 'dowly', 'downa', 'downs', 'dowps', 'dowse', 'dowts', 'doxed', 'doxes', 'doxie', 'doyen', 'doyly', 'dozed', 'dozer', 'dozes', 'drabs', 'drack', 'draco', 'draff', 'drags', 'drail', 'drams', 'drant', 'draps', 'drats', 'drave', 'draws', 'drays', 'drear', 'dreck', 'dreed', 'dreer', 'drees', 'dregs', 'dreks', 'drent', 'drere', 'drest', 'dreys', 'dribs', 'drice', 'dries', 'drily', 'drips', 'dript', 'droid', 'droil', 'droke', 'drole', 'drome', 'drony', 'droob', 'droog', 'drook', 'drops', 'dropt', 'drouk', 'drows', 'drubs', 'drugs', 'drums', 'drupe', 'druse', 'drusy', 'druxy', 'dryad', 'dryas', 'dsobo', 'dsomo', 'duads', 'duals', 'duans', 'duars', 'dubbo', 'ducal', 'ducat', 'duces', 'ducks', 'ducky', 'ducts', 'duddy', 'duded', 'dudes', 'duels', 'duets', 'duett', 'duffs', 'dufus', 'duing', 'duits', 'dukas', 'duked', 'dukes', 'dukka', 'dulce', 'dules', 'dulia', 'dulls', 'dulse', 'dumas', 'dumbo', 'dumbs', 'dumka', 'dumky', 'dumps', 'dunam', 'dunch', 'dunes', 'dungs', 'dungy', 'dunks', 'dunno', 'dunny', 'dunsh', 'dunts', 'duomi', 'duomo', 'duped', 'duper', 'dupes', 'duple', 'duply', 'duppy', 'dural', 'duras', 'dured', 'dures', 'durgy', 'durns', 'duroc', 'duros', 'duroy', 'durra', 'durrs', 'durry', 'durst', 'durum', 'durzi', 'dusks', 'dusts', 'duxes', 'dwaal', 'dwale', 'dwalm', 'dwams', 'dwang', 'dwaum', 'dweeb', 'dwile', 'dwine', 'dyads', 'dyers', 'dyked', 'dykes', 'dykey', 'dykon', 'dynel', 'dynes', 'dzhos', 'eagre', 'ealed', 'eales', 'eaned', 'eards', 'eared', 'earls', 'earns', 'earnt', 'earst', 'eased', 'easer', 'eases', 'easle', 'easts', 'eathe', 'eaved', 'eaves', 'ebbed', 'ebbet', 'ebons', 'ebook', 'ecads', 'eched', 'eches', 'echos', 'ecrus', 'edema', 'edged', 'edger', 'edges', 'edile', 'edits', 'educe', 'educt', 'eejit', 'eensy', 'eeven', 'eevns', 'effed', 'egads', 'egers', 'egest', 'eggar', 'egged', 'egger', 'egmas', 'ehing', 'eider', 'eidos', 'eigne', 'eiked', 'eikon', 'eilds', 'eisel', 'ejido', 'ekkas', 'elain', 'eland', 'elans', 'elchi', 'eldin', 'elemi', 'elfed', 'eliad', 'elint', 'elmen', 'eloge', 'elogy', 'eloin', 'elops', 'elpee', 'elsin', 'elute', 'elvan', 'elven', 'elver', 'elves', 'emacs', 'embar', 'embay', 'embog', 'embow', 'embox', 'embus', 'emeer', 'emend', 'emerg', 'emery', 'emeus', 'emics', 'emirs', 'emits', 'emmas', 'emmer', 'emmet', 'emmew', 'emmys', 'emoji', 'emong', 'emote', 'emove', 'empts', 'emule', 'emure', 'emyde', 'emyds', 'enarm', 'enate', 'ended', 'ender', 'endew', 'endue', 'enews', 'enfix', 'eniac', 'enlit', 'enmew', 'ennog', 'enoki', 'enols', 'enorm', 'enows', 'enrol', 'ensew', 'ensky', 'entia', 'enure', 'enurn', 'envoi', 'enzym', 'eorls', 'eosin', 'epact', 'epees', 'ephah', 'ephas', 'ephod', 'ephor', 'epics', 'epode', 'epopt', 'epris', 'eques', 'equid', 'erbia', 'erevs', 'ergon', 'ergos', 'ergot', 'erhus', 'erica', 'erick', 'erics', 'ering', 'erned', 'ernes', 'erose', 'erred', 'erses', 'eruct', 'erugo', 'eruvs', 'erven', 'ervil', 'escar', 'escot', 'esile', 'eskar', 'esker', 'esnes', 'esses', 'estoc', 'estop', 'estro', 'etage', 'etape', 'etats', 'etens', 'ethal', 'ethne', 'ethyl', 'etics', 'etnas', 'ettin', 'ettle', 'etuis', 'etwee', 'etyma', 'eughs', 'euked', 'eupad', 'euros', 'eusol', 'evens', 'evert', 'evets', 'evhoe', 'evils', 'evite', 'evohe', 'ewers', 'ewest', 'ewhow', 'ewked', 'exams', 'exeat', 'execs', 'exeem', 'exeme', 'exfil', 'exies', 'exine', 'exing', 'exits', 'exode', 'exome', 'exons', 'expat', 'expos', 'exude', 'exuls', 'exurb', 'eyass', 'eyers', 'eyots', 'eyras', 'eyres', 'eyrie', 'eyrir', 'ezine', 'fabby', 'faced', 'facer', 'faces', 'facia', 'facta', 'facts', 'faddy', 'faded', 'fader', 'fades', 'fadge', 'fados', 'faena', 'faery', 'faffs', 'faffy', 'faggy', 'fagin', 'fagot', 'faiks', 'fails', 'faine', 'fains', 'fairs', 'faked', 'faker', 'fakes', 'fakey', 'fakie', 'fakir', 'falaj', 'falls', 'famed', 'fames', 'fanal', 'fands', 'fanes', 'fanga', 'fango', 'fangs', 'fanks', 'fanon', 'fanos', 'fanum', 'faqir', 'farad', 'farci', 'farcy', 'fards', 'fared', 'farer', 'fares', 'farle', 'farls', 'farms', 'faros', 'farro', 'farse', 'farts', 'fasci', 'fasti', 'fasts', 'fated', 'fates', 'fatly', 'fatso', 'fatwa', 'faugh', 'fauld', 'fauns', 'faurd', 'fauts', 'fauve', 'favas', 'favel', 'faver', 'faves', 'favus', 'fawns', 'fawny', 'faxed', 'faxes', 'fayed', 'fayer', 'fayne', 'fayre', 'fazed', 'fazes', 'feals', 'feare', 'fears', 'feart', 'fease', 'feats', 'feaze', 'feces', 'fecht', 'fecit', 'fecks', 'fedex', 'feebs', 'feeds', 'feels', 'feens', 'feers', 'feese', 'feeze', 'fehme', 'feint', 'feist', 'felch', 'felid', 'fells', 'felly', 'felts', 'felty', 'femal', 'femes', 'femmy', 'fends', 'fendy', 'fenis', 'fenks', 'fenny', 'fents', 'feods', 'feoff', 'ferer', 'feres', 'feria', 'ferly', 'fermi', 'ferms', 'ferns', 'ferny', 'fesse', 'festa', 'fests', 'festy', 'fetas', 'feted', 'fetes', 'fetor', 'fetta', 'fetts', 'fetwa', 'feuar', 'feuds', 'feued', 'feyed', 'feyer', 'feyly', 'fezes', 'fezzy', 'fiars', 'fiats', 'fibre', 'fibro', 'fices', 'fiche', 'fichu', 'ficin', 'ficos', 'fides', 'fidge', 'fidos', 'fiefs', 'fient', 'fiere', 'fiers', 'fiest', 'fifed', 'fifer', 'fifes', 'fifis', 'figgy', 'figos', 'fiked', 'fikes', 'filar', 'filch', 'filed', 'files', 'filii', 'filks', 'fille', 'fillo', 'fills', 'filmi', 'films', 'filos', 'filum', 'finca', 'finds', 'fined', 'fines', 'finis', 'finks', 'finny', 'finos', 'fiord', 'fiqhs', 'fique', 'fired', 'firer', 'fires', 'firie', 'firks', 'firms', 'firns', 'firry', 'firth', 'fiscs', 'fisks', 'fists', 'fisty', 'fitch', 'fitly', 'fitna', 'fitte', 'fitts', 'fiver', 'fives', 'fixed', 'fixes', 'fixit', 'fjeld', 'flabs', 'flaff', 'flags', 'flaks', 'flamm', 'flams', 'flamy', 'flane', 'flans', 'flaps', 'flary', 'flats', 'flava', 'flawn', 'flaws', 'flawy', 'flaxy', 'flays', 'fleam', 'fleas', 'fleek', 'fleer', 'flees', 'flegs', 'fleme', 'fleur', 'flews', 'flexi', 'flexo', 'fleys', 'flics', 'flied', 'flies', 'flimp', 'flims', 'flips', 'flirs', 'flisk', 'flite', 'flits', 'flitt', 'flobs', 'flocs', 'floes', 'flogs', 'flong', 'flops', 'flors', 'flory', 'flosh', 'flota', 'flote', 'flows', 'flubs', 'flued', 'flues', 'fluey', 'fluky', 'flump', 'fluor', 'flurr', 'fluty', 'fluyt', 'flyby', 'flype', 'flyte', 'foals', 'foams', 'foehn', 'fogey', 'fogie', 'fogle', 'fogou', 'fohns', 'foids', 'foils', 'foins', 'folds', 'foley', 'folia', 'folic', 'folie', 'folks', 'folky', 'fomes', 'fonda', 'fonds', 'fondu', 'fones', 'fonly', 'fonts', 'foods', 'foody', 'fools', 'foots', 'footy', 'foram', 'forbs', 'forby', 'fordo', 'fords', 'forel', 'fores', 'forex', 'forks', 'forky', 'forme', 'forms', 'forts', 'forza', 'forze', 'fossa', 'fosse', 'fouat', 'fouds', 'fouer', 'fouet', 'foule', 'fouls', 'fount', 'fours', 'fouth', 'fovea', 'fowls', 'fowth', 'foxed', 'foxes', 'foxie', 'foyle', 'foyne', 'frabs', 'frack', 'fract', 'frags', 'fraim', 'franc', 'frape', 'fraps', 'frass', 'frate', 'frati', 'frats', 'fraus', 'frays', 'frees', 'freet', 'freit', 'fremd', 'frena', 'freon', 'frere', 'frets', 'fribs', 'frier', 'fries', 'frigs', 'frise', 'frist', 'frith', 'frits', 'fritt', 'frize', 'frizz', 'froes', 'frogs', 'frons', 'frore', 'frorn', 'frory', 'frosh', 'frows', 'frowy', 'frugs', 'frump', 'frush', 'frust', 'fryer', 'fubar', 'fubby', 'fubsy', 'fucks', 'fucus', 'fuddy', 'fudgy', 'fuels', 'fuero', 'fuffs', 'fuffy', 'fugal', 'fuggy', 'fugie', 'fugio', 'fugle', 'fugly', 'fugus', 'fujis', 'fulls', 'fumed', 'fumer', 'fumes', 'fumet', 'fundi', 'funds', 'fundy', 'fungo', 'fungs', 'funks', 'fural', 'furan', 'furca', 'furls', 'furol', 'furrs', 'furth', 'furze', 'furzy', 'fused', 'fusee', 'fusel', 'fuses', 'fusil', 'fusks', 'fusts', 'fusty', 'futon', 'fuzed', 'fuzee', 'fuzes', 'fuzil', 'fyces', 'fyked', 'fykes', 'fyles', 'fyrds', 'fytte', 'gabba', 'gabby', 'gable', 'gaddi', 'gades', 'gadge', 'gadid', 'gadis', 'gadje', 'gadjo', 'gadso', 'gaffs', 'gaged', 'gager', 'gages', 'gaids', 'gains', 'gairs', 'gaita', 'gaits', 'gaitt', 'gajos', 'galah', 'galas', 'galax', 'galea', 'galed', 'gales', 'galls', 'gally', 'galop', 'galut', 'galvo', 'gamas', 'gamay', 'gamba', 'gambe', 'gambo', 'gambs', 'gamed', 'games', 'gamey', 'gamic', 'gamin', 'gamme', 'gammy', 'gamps', 'ganch', 'gandy', 'ganef', 'ganev', 'gangs', 'ganja', 'ganof', 'gants', 'gaols', 'gaped', 'gaper', 'gapes', 'gapos', 'gappy', 'garbe', 'garbo', 'garbs', 'garda', 'gares', 'garis', 'garms', 'garni', 'garre', 'garth', 'garum', 'gases', 'gasps', 'gaspy', 'gasts', 'gatch', 'gated', 'gater', 'gates', 'gaths', 'gator', 'gauch', 'gaucy', 'gauds', 'gauje', 'gault', 'gaums', 'gaumy', 'gaups', 'gaurs', 'gauss', 'gauzy', 'gavot', 'gawcy', 'gawds', 'gawks', 'gawps', 'gawsy', 'gayal', 'gazal', 'gazar', 'gazed', 'gazes', 'gazon', 'gazoo', 'geals', 'geans', 'geare', 'gears', 'geats', 'gebur', 'gecks', 'geeks', 'geeps', 'geest', 'geist', 'geits', 'gelds', 'gelee', 'gelid', 'gelly', 'gelts', 'gemel', 'gemma', 'gemmy', 'gemot', 'genal', 'genas', 'genes', 'genet', 'genic', 'genii', 'genip', 'genny', 'genoa', 'genom', 'genro', 'gents', 'genty', 'genua', 'genus', 'geode', 'geoid', 'gerah', 'gerbe', 'geres', 'gerle', 'germs', 'germy', 'gerne', 'gesse', 'gesso', 'geste', 'gests', 'getas', 'getup', 'geums', 'geyan', 'geyer', 'ghast', 'ghats', 'ghaut', 'ghazi', 'ghees', 'ghest', 'ghyll', 'gibed', 'gibel', 'giber', 'gibes', 'gibli', 'gibus', 'gifts', 'gigas', 'gighe', 'gigot', 'gigue', 'gilas', 'gilds', 'gilet', 'gills', 'gilly', 'gilpy', 'gilts', 'gimel', 'gimme', 'gimps', 'gimpy', 'ginch', 'ginge', 'gings', 'ginks', 'ginny', 'ginzo', 'gipon', 'gippo', 'gippy', 'girds', 'girls', 'girns', 'giron', 'giros', 'girrs', 'girsh', 'girts', 'gismo', 'gisms', 'gists', 'gitch', 'gites', 'giust', 'gived', 'gives', 'gizmo', 'glace', 'glads', 'glady', 'glaik', 'glair', 'glams', 'glans', 'glary', 'glaum', 'glaur', 'glazy', 'gleba', 'glebe', 'gleby', 'glede', 'gleds', 'gleed', 'gleek', 'glees', 'gleet', 'gleis', 'glens', 'glent', 'gleys', 'glial', 'glias', 'glibs', 'gliff', 'glift', 'glike', 'glime', 'glims', 'glisk', 'glits', 'glitz', 'gloam', 'globi', 'globs', 'globy', 'glode', 'glogg', 'gloms', 'gloop', 'glops', 'glost', 'glout', 'glows', 'gloze', 'glued', 'gluer', 'glues', 'gluey', 'glugs', 'glume', 'glums', 'gluon', 'glute', 'gluts', 'gnarl', 'gnarr', 'gnars', 'gnats', 'gnawn', 'gnaws', 'gnows', 'goads', 'goafs', 'goals', 'goary', 'goats', 'goaty', 'goban', 'gobar', 'gobbi', 'gobbo', 'gobby', 'gobis', 'gobos', 'godet', 'godso', 'goels', 'goers', 'goest', 'goeth', 'goety', 'gofer', 'goffs', 'gogga', 'gogos', 'goier', 'gojis', 'golds', 'goldy', 'goles', 'golfs', 'golpe', 'golps', 'gombo', 'gomer', 'gompa', 'gonch', 'gonef', 'gongs', 'gonia', 'gonif', 'gonks', 'gonna', 'gonof', 'gonys', 'gonzo', 'gooby', 'goods', 'goofs', 'googs', 'gooks', 'gooky', 'goold', 'gools', 'gooly', 'goons', 'goony', 'goops', 'goopy', 'goors', 'goory', 'goosy', 'gopak', 'gopik', 'goral', 'goras', 'gored', 'gores', 'goris', 'gorms', 'gormy', 'gorps', 'gorse', 'gorsy', 'gosht', 'gosse', 'gotch', 'goths', 'gothy', 'gotta', 'gouch', 'gouks', 'goura', 'gouts', 'gouty', 'gowan', 'gowds', 'gowfs', 'gowks', 'gowls', 'gowns', 'goxes', 'goyim', 'goyle', 'graal', 'grabs', 'grads', 'graff', 'graip', 'grama', 'grame', 'gramp', 'grams', 'grana', 'grans', 'grapy', 'gravs', 'grays', 'grebe', 'grebo', 'grece', 'greek', 'grees', 'grege', 'grego', 'grein', 'grens', 'grese', 'greve', 'grews', 'greys', 'grice', 'gride', 'grids', 'griff', 'grift', 'grigs', 'grike', 'grins', 'griot', 'grips', 'gript', 'gripy', 'grise', 'grist', 'grisy', 'grith', 'grits', 'grize', 'groat', 'grody', 'grogs', 'groks', 'groma', 'grone', 'groof', 'grosz', 'grots', 'grouf', 'grovy', 'grows', 'grrls', 'grrrl', 'grubs', 'grued', 'grues', 'grufe', 'grume', 'grump', 'grund', 'gryce', 'gryde', 'gryke', 'grype', 'grypt', 'guaco', 'guana', 'guano', 'guans', 'guars', 'gucks', 'gucky', 'gudes', 'guffs', 'gugas', 'guids', 'guimp', 'guiro', 'gulag', 'gular', 'gulas', 'gules', 'gulet', 'gulfs', 'gulfy', 'gulls', 'gulph', 'gulps', 'gulpy', 'gumma', 'gummi', 'gumps', 'gundy', 'gunge', 'gungy', 'gunks', 'gunky', 'gunny', 'guqin', 'gurdy', 'gurge', 'gurls', 'gurly', 'gurns', 'gurry', 'gursh', 'gurus', 'gushy', 'gusla', 'gusle', 'gusli', 'gussy', 'gusts', 'gutsy', 'gutta', 'gutty', 'guyed', 'guyle', 'guyot', 'guyse', 'gwine', 'gyals', 'gyans', 'gybed', 'gybes', 'gyeld', 'gymps', 'gynae', 'gynie', 'gynny', 'gynos', 'gyoza', 'gypos', 'gyppo', 'gyppy', 'gyral', 'gyred', 'gyres', 'gyron', 'gyros', 'gyrus', 'gytes', 'gyved', 'gyves', 'haafs', 'haars', 'hable', 'habus', 'hacek', 'hacks', 'hadal', 'haded', 'hades', 'hadji', 'hadst', 'haems', 'haets', 'haffs', 'hafiz', 'hafts', 'haggs', 'hahas', 'haick', 'haika', 'haiks', 'haiku', 'hails', 'haily', 'hains', 'haint', 'hairs', 'haith', 'hajes', 'hajis', 'hajji', 'hakam', 'hakas', 'hakea', 'hakes', 'hakim', 'hakus', 'halal', 'haled', 'haler', 'hales', 'halfa', 'halfs', 'halid', 'hallo', 'halls', 'halma', 'halms', 'halon', 'halos', 'halse', 'halts', 'halva', 'halwa', 'hamal', 'hamba', 'hamed', 'hames', 'hammy', 'hamza', 'hanap', 'hance', 'hanch', 'hands', 'hangi', 'hangs', 'hanks', 'hanky', 'hansa', 'hanse', 'hants', 'haole', 'haoma', 'hapax', 'haply', 'happi', 'hapus', 'haram', 'hards', 'hared', 'hares', 'harim', 'harks', 'harls', 'harms', 'harns', 'haros', 'harps', 'harts', 'hashy', 'hasks', 'hasps', 'hasta', 'hated', 'hates', 'hatha', 'hauds', 'haufs', 'haugh', 'hauld', 'haulm', 'hauls', 'hault', 'hauns', 'hause', 'haver', 'haves', 'hawed', 'hawks', 'hawms', 'hawse', 'hayed', 'hayer', 'hayey', 'hayle', 'hazan', 'hazed', 'hazer', 'hazes', 'heads', 'heald', 'heals', 'heame', 'heaps', 'heapy', 'heare', 'hears', 'heast', 'heats', 'heben', 'hebes', 'hecht', 'hecks', 'heder', 'hedgy', 'heeds', 'heedy', 'heels', 'heeze', 'hefte', 'hefts', 'heids', 'heigh', 'heils', 'heirs', 'hejab', 'hejra', 'heled', 'heles', 'helio', 'hells', 'helms', 'helos', 'helot', 'helps', 'helve', 'hemal', 'hemes', 'hemic', 'hemin', 'hemps', 'hempy', 'hench', 'hends', 'henge', 'henna', 'henny', 'henry', 'hents', 'hepar', 'herbs', 'herby', 'herds', 'heres', 'herls', 'herma', 'herms', 'herns', 'heros', 'herry', 'herse', 'hertz', 'herye', 'hesps', 'hests', 'hetes', 'heths', 'heuch', 'heugh', 'hevea', 'hewed', 'hewer', 'hewgh', 'hexad', 'hexed', 'hexer', 'hexes', 'hexyl', 'heyed', 'hiant', 'hicks', 'hided', 'hider', 'hides', 'hiems', 'highs', 'hight', 'hijab', 'hijra', 'hiked', 'hiker', 'hikes', 'hikoi', 'hilar', 'hilch', 'hillo', 'hills', 'hilts', 'hilum', 'hilus', 'himbo', 'hinau', 'hinds', 'hings', 'hinky', 'hinny', 'hints', 'hiois', 'hiply', 'hired', 'hiree', 'hirer', 'hires', 'hissy', 'hists', 'hithe', 'hived', 'hiver', 'hives', 'hizen', 'hoaed', 'hoagy', 'hoars', 'hoary', 'hoast', 'hobos', 'hocks', 'hocus', 'hodad', 'hodja', 'hoers', 'hogan', 'hogen', 'hoggs', 'hoghs', 'hohed', 'hoick', 'hoied', 'hoiks', 'hoing', 'hoise', 'hokas', 'hoked', 'hokes', 'hokey', 'hokis', 'hokku', 'hokum', 'holds', 'holed', 'holes', 'holey', 'holks', 'holla', 'hollo', 'holme', 'holms', 'holon', 'holos', 'holts', 'homas', 'homed', 'homes', 'homey', 'homie', 'homme', 'homos', 'honan', 'honda', 'honds', 'honed', 'honer', 'hones', 'hongi', 'hongs', 'honks', 'honky', 'hooch', 'hoods', 'hoody', 'hooey', 'hoofs', 'hooka', 'hooks', 'hooky', 'hooly', 'hoons', 'hoops', 'hoord', 'hoors', 'hoosh', 'hoots', 'hooty', 'hoove', 'hopak', 'hoped', 'hoper', 'hopes', 'hoppy', 'horah', 'horal', 'horas', 'horis', 'horks', 'horme', 'horns', 'horst', 'horsy', 'hosed', 'hosel', 'hosen', 'hoser', 'hoses', 'hosey', 'hosta', 'hosts', 'hotch', 'hoten', 'hotty', 'houff', 'houfs', 'hough', 'houri', 'hours', 'houts', 'hovea', 'hoved', 'hoven', 'hoves', 'howbe', 'howes', 'howff', 'howfs', 'howks', 'howls', 'howre', 'howso', 'hoxed', 'hoxes', 'hoyas', 'hoyed', 'hoyle', 'hubby', 'hucks', 'hudna', 'hudud', 'huers', 'huffs', 'huffy', 'huger', 'huggy', 'huhus', 'huias', 'hulas', 'hules', 'hulks', 'hulky', 'hullo', 'hulls', 'hully', 'humas', 'humfs', 'humic', 'humps', 'humpy', 'hunks', 'hunts', 'hurds', 'hurls', 'hurly', 'hurra', 'hurst', 'hurts', 'hushy', 'husks', 'husos', 'hutia', 'huzza', 'huzzy', 'hwyls', 'hydra', 'hyens', 'hygge', 'hying', 'hykes', 'hylas', 'hyleg', 'hyles', 'hylic', 'hymns', 'hynde', 'hyoid', 'hyped', 'hypes', 'hypha', 'hyphy', 'hypos', 'hyrax', 'hyson', 'hythe', 'iambi', 'iambs', 'ibrik', 'icers', 'iched', 'iches', 'ichor', 'icier', 'icker', 'ickle', 'icons', 'ictal', 'ictic', 'ictus', 'idant', 'ideas', 'idees', 'ident', 'idled', 'idles', 'idola', 'idols', 'idyls', 'iftar', 'igapo', 'igged', 'iglus', 'ihram', 'ikans', 'ikats', 'ikons', 'ileac', 'ileal', 'ileum', 'ileus', 'iliad', 'ilial', 'ilium', 'iller', 'illth', 'imago', 'imams', 'imari', 'imaum', 'imbar', 'imbed', 'imide', 'imido', 'imids', 'imine', 'imino', 'immew', 'immit', 'immix', 'imped', 'impis', 'impot', 'impro', 'imshi', 'imshy', 'inapt', 'inarm', 'inbye', 'incel', 'incle', 'incog', 'incus', 'incut', 'indew', 'india', 'indie', 'indol', 'indow', 'indri', 'indue', 'inerm', 'infix', 'infos', 'infra', 'ingan', 'ingle', 'inion', 'inked', 'inker', 'inkle', 'inned', 'innit', 'inorb', 'inrun', 'inset', 'inspo', 'intel', 'intil', 'intis', 'intra', 'inula', 'inure', 'inurn', 'inust', 'invar', 'inwit', 'iodic', 'iodid', 'iodin', 'iotas', 'ippon', 'irade', 'irids', 'iring', 'irked', 'iroko', 'irone', 'irons', 'isbas', 'ishes', 'isled', 'isles', 'isnae', 'issei', 'istle', 'items', 'ither', 'ivied', 'ivies', 'ixias', 'ixnay', 'ixora', 'ixtle', 'izard', 'izars', 'izzat', 'jaaps', 'jabot', 'jacal', 'jacks', 'jacky', 'jaded', 'jades', 'jafas', 'jaffa', 'jagas', 'jager', 'jaggs', 'jaggy', 'jagir', 'jagra', 'jails', 'jaker', 'jakes', 'jakey', 'jalap', 'jalop', 'jambe', 'jambo', 'jambs', 'jambu', 'james', 'jammy', 'jamon', 'janes', 'janns', 'janny', 'janty', 'japan', 'japed', 'japer', 'japes', 'jarks', 'jarls', 'jarps', 'jarta', 'jarul', 'jasey', 'jaspe', 'jasps', 'jatos', 'jauks', 'jaups', 'javas', 'javel', 'jawan', 'jawed', 'jaxie', 'jeans', 'jeats', 'jebel', 'jedis', 'jeels', 'jeely', 'jeeps', 'jeers', 'jeeze', 'jefes', 'jeffs', 'jehad', 'jehus', 'jelab', 'jello', 'jells', 'jembe', 'jemmy', 'jenny', 'jeons', 'jerid', 'jerks', 'jerry', 'jesse', 'jests', 'jesus', 'jetes', 'jeton', 'jeune', 'jewed', 'jewie', 'jhala', 'jiaos', 'jibba', 'jibbs', 'jibed', 'jiber', 'jibes', 'jiffs', 'jiggy', 'jigot', 'jihad', 'jills', 'jilts', 'jimmy', 'jimpy', 'jingo', 'jinks', 'jinne', 'jinni', 'jinns', 'jirds', 'jirga', 'jirre', 'jisms', 'jived', 'jiver', 'jives', 'jivey', 'jnana', 'jobed', 'jobes', 'jocko', 'jocks', 'jocky', 'jocos', 'jodel', 'joeys', 'johns', 'joins', 'joked', 'jokes', 'jokey', 'jokol', 'joled', 'joles', 'jolls', 'jolts', 'jolty', 'jomon', 'jomos', 'jones', 'jongs', 'jonty', 'jooks', 'joram', 'jorum', 'jotas', 'jotty', 'jotun', 'joual', 'jougs', 'jouks', 'joule', 'jours', 'jowar', 'jowed', 'jowls', 'jowly', 'joyed', 'jubas', 'jubes', 'jucos', 'judas', 'judgy', 'judos', 'jugal', 'jugum', 'jujus', 'juked', 'jukes', 'jukus', 'julep', 'jumar', 'jumby', 'jumps', 'junco', 'junks', 'junky', 'jupes', 'jupon', 'jural', 'jurat', 'jurel', 'jures', 'justs', 'jutes', 'jutty', 'juves', 'juvie', 'kaama', 'kabab', 'kabar', 'kabob', 'kacha', 'kacks', 'kadai', 'kades', 'kadis', 'kafir', 'kagos', 'kagus', 'kahal', 'kaiak', 'kaids', 'kaies', 'kaifs', 'kaika', 'kaiks', 'kails', 'kaims', 'kaing', 'kains', 'kakas', 'kakis', 'kalam', 'kales', 'kalif', 'kalis', 'kalpa', 'kamas', 'kames', 'kamik', 'kamis', 'kamme', 'kanae', 'kanas', 'kandy', 'kaneh', 'kanes', 'kanga', 'kangs', 'kanji', 'kants', 'kanzu', 'kaons', 'kapas', 'kaphs', 'kapok', 'kapow', 'kapus', 'kaput', 'karas', 'karat', 'karks', 'karns', 'karoo', 'karos', 'karri', 'karst', 'karsy', 'karts', 'karzy', 'kasha', 'kasme', 'katal', 'katas', 'katis', 'katti', 'kaugh', 'kauri', 'kauru', 'kaury', 'kaval', 'kavas', 'kawas', 'kawau', 'kawed', 'kayle', 'kayos', 'kazis', 'kazoo', 'kbars', 'kebar', 'kebob', 'kecks', 'kedge', 'kedgy', 'keech', 'keefs', 'keeks', 'keels', 'keema', 'keeno', 'keens', 'keeps', 'keets', 'keeve', 'kefir', 'kehua', 'keirs', 'kelep', 'kelim', 'kells', 'kelly', 'kelps', 'kelpy', 'kelts', 'kelty', 'kembo', 'kembs', 'kemps', 'kempt', 'kempy', 'kenaf', 'kench', 'kendo', 'kenos', 'kente', 'kents', 'kepis', 'kerbs', 'kerel', 'kerfs', 'kerky', 'kerma', 'kerne', 'kerns', 'keros', 'kerry', 'kerve', 'kesar', 'kests', 'ketas', 'ketch', 'ketes', 'ketol', 'kevel', 'kevil', 'kexes', 'keyed', 'keyer', 'khadi', 'khafs', 'khans', 'khaph', 'khats', 'khaya', 'khazi', 'kheda', 'kheth', 'khets', 'khoja', 'khors', 'khoum', 'khuds', 'kiaat', 'kiack', 'kiang', 'kibbe', 'kibbi', 'kibei', 'kibes', 'kibla', 'kicks', 'kicky', 'kiddo', 'kiddy', 'kidel', 'kidge', 'kiefs', 'kiers', 'kieve', 'kievs', 'kight', 'kikes', 'kikoi', 'kiley', 'kilim', 'kills', 'kilns', 'kilos', 'kilps', 'kilts', 'kilty', 'kimbo', 'kinas', 'kinda', 'kinds', 'kindy', 'kines', 'kings', 'kinin', 'kinks', 'kinos', 'kiore', 'kipes', 'kippa', 'kipps', 'kirby', 'kirks', 'kirns', 'kirri', 'kisan', 'kissy', 'kists', 'kited', 'kiter', 'kites', 'kithe', 'kiths', 'kitul', 'kivas', 'kiwis', 'klang', 'klaps', 'klett', 'klick', 'klieg', 'kliks', 'klong', 'kloof', 'kluge', 'klutz', 'knags', 'knaps', 'knarl', 'knars', 'knaur', 'knawe', 'knees', 'knell', 'knish', 'knits', 'knive', 'knobs', 'knops', 'knosp', 'knots', 'knout', 'knowe', 'knows', 'knubs', 'knurl', 'knurr', 'knurs', 'knuts', 'koans', 'koaps', 'koban', 'kobos', 'koels', 'koffs', 'kofta', 'kogal', 'kohas', 'kohen', 'kohls', 'koine', 'kojis', 'kokam', 'kokas', 'koker', 'kokra', 'kokum', 'kolas', 'kolos', 'kombu', 'konbu', 'kondo', 'konks', 'kooks', 'kooky', 'koori', 'kopek', 'kophs', 'kopje', 'koppa', 'korai', 'koran', 'koras', 'korat', 'kores', 'korma', 'koros', 'korun', 'korus', 'koses', 'kotch', 'kotos', 'kotow', 'koura', 'kraal', 'krabs', 'kraft', 'krais', 'krait', 'krang', 'krans', 'kranz', 'kraut', 'krays', 'kreep', 'kreng', 'krewe', 'krona', 'krone', 'kroon', 'krubi', 'krunk', 'ksars', 'kubie', 'kudos', 'kudus', 'kudzu', 'kufis', 'kugel', 'kuias', 'kukri', 'kukus', 'kulak', 'kulan', 'kulas', 'kulfi', 'kumis', 'kumys', 'kuris', 'kurre', 'kurta', 'kurus', 'kusso', 'kutas', 'kutch', 'kutis', 'kutus', 'kuzus', 'kvass', 'kvell', 'kwela', 'kyack', 'kyaks', 'kyang', 'kyars', 'kyats', 'kybos', 'kydst', 'kyles', 'kylie', 'kylin', 'kylix', 'kyloe', 'kynde', 'kynds', 'kypes', 'kyrie', 'kytes', 'kythe', 'laari', 'labda', 'labia', 'labis', 'labra', 'laced', 'lacer', 'laces', 'lacet', 'lacey', 'lacks', 'laddy', 'laded', 'lader', 'lades', 'laers', 'laevo', 'lagan', 'lahal', 'lahar', 'laich', 'laics', 'laids', 'laigh', 'laika', 'laiks', 'laird', 'lairs', 'lairy', 'laith', 'laity', 'laked', 'laker', 'lakes', 'lakhs', 'lakin', 'laksa', 'laldy', 'lalls', 'lamas', 'lambs', 'lamby', 'lamed', 'lamer', 'lames', 'lamia', 'lammy', 'lamps', 'lanai', 'lanas', 'lanch', 'lande', 'lands', 'lanes', 'lanks', 'lants', 'lapin', 'lapis', 'lapje', 'larch', 'lards', 'lardy', 'laree', 'lares', 'largo', 'laris', 'larks', 'larky', 'larns', 'larnt', 'larum', 'lased', 'laser', 'lases', 'lassi', 'lassu', 'lassy', 'lasts', 'latah', 'lated', 'laten', 'latex', 'lathi', 'laths', 'lathy', 'latke', 'latus', 'lauan', 'lauch', 'lauds', 'laufs', 'laund', 'laura', 'laval', 'lavas', 'laved', 'laver', 'laves', 'lavra', 'lavvy', 'lawed', 'lawer', 'lawin', 'lawks', 'lawns', 'lawny', 'laxed', 'laxer', 'laxes', 'laxly', 'layed', 'layin', 'layup', 'lazar', 'lazed', 'lazes', 'lazos', 'lazzi', 'lazzo', 'leads', 'leady', 'leafs', 'leaks', 'leams', 'leans', 'leany', 'leaps', 'leare', 'lears', 'leary', 'leats', 'leavy', 'leaze', 'leben', 'leccy', 'ledes', 'ledgy', 'ledum', 'leear', 'leeks', 'leeps', 'leers', 'leese', 'leets', 'leeze', 'lefte', 'lefts', 'leger', 'leges', 'legge', 'leggo', 'legit', 'lehrs', 'lehua', 'leirs', 'leish', 'leman', 'lemed', 'lemel', 'lemes', 'lemma', 'lemme', 'lends', 'lenes', 'lengs', 'lenis', 'lenos', 'lense', 'lenti', 'lento', 'leone', 'lepid', 'lepra', 'lepta', 'lered', 'leres', 'lerps', 'lesbo', 'leses', 'lests', 'letch', 'lethe', 'letup', 'leuch', 'leuco', 'leuds', 'leugh', 'levas', 'levee', 'leves', 'levin', 'levis', 'lewis', 'lexes', 'lexis', 'lezes', 'lezza', 'lezzy', 'liana', 'liane', 'liang', 'liard', 'liars', 'liart', 'liber', 'libra', 'libri', 'lichi', 'licht', 'licit', 'licks', 'lidar', 'lidos', 'liefs', 'liens', 'liers', 'lieus', 'lieve', 'lifer', 'lifes', 'lifts', 'ligan', 'liger', 'ligge', 'ligne', 'liked', 'liker', 'likes', 'likin', 'lills', 'lilos', 'lilts', 'liman', 'limas', 'limax', 'limba', 'limbi', 'limbs', 'limby', 'limed', 'limen', 'limes', 'limey', 'limma', 'limns', 'limos', 'limpa', 'limps', 'linac', 'linch', 'linds', 'lindy', 'lined', 'lines', 'liney', 'linga', 'lings', 'lingy', 'linin', 'links', 'linky', 'linns', 'linny', 'linos', 'lints', 'linty', 'linum', 'linux', 'lions', 'lipas', 'lipes', 'lipin', 'lipos', 'lippy', 'liras', 'lirks', 'lirot', 'lisks', 'lisle', 'lisps', 'lists', 'litai', 'litas', 'lited', 'liter', 'lites', 'litho', 'liths', 'litre', 'lived', 'liven', 'lives', 'livor', 'livre', 'llano', 'loach', 'loads', 'loafs', 'loams', 'loans', 'loast', 'loave', 'lobar', 'lobed', 'lobes', 'lobos', 'lobus', 'loche', 'lochs', 'locie', 'locis', 'locks', 'locos', 'locum', 'loden', 'lodes', 'loess', 'lofts', 'logan', 'loges', 'loggy', 'logia', 'logie', 'logoi', 'logon', 'logos', 'lohan', 'loids', 'loins', 'loipe', 'loirs', 'lokes', 'lolls', 'lolly', 'lolog', 'lomas', 'lomed', 'lomes', 'loner', 'longa', 'longe', 'longs', 'looby', 'looed', 'looey', 'loofa', 'loofs', 'looie', 'looks', 'looky', 'looms', 'loons', 'loony', 'loops', 'loord', 'loots', 'loped', 'loper', 'lopes', 'loppy', 'loral', 'loran', 'lords', 'lordy', 'lorel', 'lores', 'loric', 'loris', 'losed', 'losel', 'losen', 'loses', 'lossy', 'lotah', 'lotas', 'lotes', 'lotic', 'lotos', 'lotsa', 'lotta', 'lotte', 'lotto', 'lotus', 'loued', 'lough', 'louie', 'louis', 'louma', 'lound', 'louns', 'loupe', 'loups', 'loure', 'lours', 'loury', 'louts', 'lovat', 'loved', 'loves', 'lovey', 'lovie', 'lowan', 'lowed', 'lowes', 'lownd', 'lowne', 'lowns', 'lowps', 'lowry', 'lowse', 'lowts', 'loxed', 'loxes', 'lozen', 'luach', 'luaus', 'lubed', 'lubes', 'lubra', 'luces', 'lucks', 'lucre', 'ludes', 'ludic', 'ludos', 'luffa', 'luffs', 'luged', 'luger', 'luges', 'lulls', 'lulus', 'lumas', 'lumbi', 'lumme', 'lummy', 'lumps', 'lunas', 'lunes', 'lunet', 'lungi', 'lungs', 'lunks', 'lunts', 'lupin', 'lured', 'lurer', 'lures', 'lurex', 'lurgi', 'lurgy', 'lurks', 'lurry', 'lurve', 'luser', 'lushy', 'lusks', 'lusts', 'lusus', 'lutea', 'luted', 'luter', 'lutes', 'luvvy', 'luxed', 'luxer', 'luxes', 'lweis', 'lyams', 'lyard', 'lyart', 'lyase', 'lycea', 'lycee', 'lycra', 'lymes', 'lynch', 'lynes', 'lyres', 'lysed', 'lyses', 'lysin', 'lysis', 'lysol', 'lyssa', 'lyted', 'lytes', 'lythe', 'lytic', 'lytta', 'maaed', 'maare', 'maars', 'mabes', 'macas', 'maced', 'macer', 'maces', 'mache', 'machi', 'machs', 'macks', 'macle', 'macon', 'madge', 'madid', 'madre', 'maerl', 'mafic', 'mages', 'maggs', 'magot', 'magus', 'mahoe', 'mahua', 'mahwa', 'maids', 'maiko', 'maiks', 'maile', 'maill', 'mails', 'maims', 'mains', 'maire', 'mairs', 'maise', 'maist', 'makar', 'makes', 'makis', 'makos', 'malam', 'malar', 'malas', 'malax', 'males', 'malic', 'malik', 'malis', 'malls', 'malms', 'malmy', 'malts', 'malty', 'malus', 'malva', 'malwa', 'mamas', 'mamba', 'mamee', 'mamey', 'mamie', 'manas', 'manat', 'mandi', 'maneb', 'maned', 'maneh', 'manes', 'manet', 'mangs', 'manis', 'manky', 'manna', 'manos', 'manse', 'manta', 'manto', 'manty', 'manul', 'manus', 'mapau', 'maqui', 'marae', 'marah', 'maras', 'marcs', 'mardy', 'mares', 'marge', 'margs', 'maria', 'marid', 'marka', 'marks', 'marle', 'marls', 'marly', 'marms', 'maron', 'maror', 'marra', 'marri', 'marse', 'marts', 'marvy', 'masas', 'mased', 'maser', 'mases', 'mashy', 'masks', 'massa', 'massy', 'masts', 'masty', 'masus', 'matai', 'mated', 'mater', 'mates', 'maths', 'matin', 'matlo', 'matte', 'matts', 'matza', 'matzo', 'mauby', 'mauds', 'mauls', 'maund', 'mauri', 'mausy', 'mauts', 'mauzy', 'maven', 'mavie', 'mavin', 'mavis', 'mawed', 'mawks', 'mawky', 'mawns', 'mawrs', 'maxed', 'maxes', 'maxis', 'mayan', 'mayas', 'mayed', 'mayos', 'mayst', 'mazed', 'mazer', 'mazes', 'mazey', 'mazut', 'mbira', 'meads', 'meals', 'meane', 'means', 'meany', 'meare', 'mease', 'meath', 'meats', 'mebos', 'mechs', 'mecks', 'medii', 'medle', 'meeds', 'meers', 'meets', 'meffs', 'meins', 'meint', 'meiny', 'meith', 'mekka', 'melas', 'melba', 'melds', 'melic', 'melik', 'mells', 'melts', 'melty', 'memes', 'memos', 'menad', 'mends', 'mened', 'menes', 'menge', 'mengs', 'mensa', 'mense', 'mensh', 'menta', 'mento', 'menus', 'meous', 'meows', 'merch', 'mercs', 'merde', 'mered', 'merel', 'merer', 'meres', 'meril', 'meris', 'merks', 'merle', 'merls', 'merse', 'mesal', 'mesas', 'mesel', 'meses', 'meshy', 'mesic', 'mesne', 'meson', 'messy', 'mesto', 'meted', 'metes', 'metho', 'meths', 'metic', 'metif', 'metis', 'metol', 'metre', 'meuse', 'meved', 'meves', 'mewed', 'mewls', 'meynt', 'mezes', 'mezze', 'mezzo', 'mhorr', 'miaou', 'miaow', 'miasm', 'miaul', 'micas', 'miche', 'micht', 'micks', 'micky', 'micos', 'micra', 'middy', 'midgy', 'midis', 'miens', 'mieve', 'miffs', 'miffy', 'mifty', 'miggs', 'mihas', 'mihis', 'miked', 'mikes', 'mikra', 'mikva', 'milch', 'milds', 'miler', 'miles', 'milfs', 'milia', 'milko', 'milks', 'mille', 'mills', 'milor', 'milos', 'milpa', 'milts', 'milty', 'miltz', 'mimed', 'mimeo', 'mimer', 'mimes', 'mimsy', 'minae', 'minar', 'minas', 'mincy', 'minds', 'mined', 'mines', 'minge', 'mings', 'mingy', 'minis', 'minke', 'minks', 'minny', 'minos', 'mints', 'mired', 'mires', 'mirex', 'mirid', 'mirin', 'mirks', 'mirky', 'mirly', 'miros', 'mirvs', 'mirza', 'misch', 'misdo', 'mises', 'misgo', 'misos', 'missa', 'mists', 'misty', 'mitch', 'miter', 'mites', 'mitis', 'mitre', 'mitts', 'mixed', 'mixen', 'mixer', 'mixes', 'mixte', 'mixup', 'mizen', 'mizzy', 'mneme', 'moans', 'moats', 'mobby', 'mobes', 'mobey', 'mobie', 'moble', 'mochi', 'mochs', 'mochy', 'mocks', 'moder', 'modes', 'modge', 'modii', 'modus', 'moers', 'mofos', 'moggy', 'mohel', 'mohos', 'mohrs', 'mohua', 'mohur', 'moile', 'moils', 'moira', 'moire', 'moits', 'mojos', 'mokes', 'mokis', 'mokos', 'molal', 'molas', 'molds', 'moled', 'moles', 'molla', 'molls', 'molly', 'molto', 'molts', 'molys', 'momes', 'momma', 'mommy', 'momus', 'monad', 'monal', 'monas', 'monde', 'mondo', 'moner', 'mongo', 'mongs', 'monic', 'monie', 'monks', 'monos', 'monte', 'monty', 'moobs', 'mooch', 'moods', 'mooed', 'mooks', 'moola', 'mooli', 'mools', 'mooly', 'moong', 'moons', 'moony', 'moops', 'moors', 'moory', 'moots', 'moove', 'moped', 'moper', 'mopes', 'mopey', 'moppy', 'mopsy', 'mopus', 'morae', 'moras', 'morat', 'moray', 'morel', 'mores', 'moria', 'morne', 'morns', 'morra', 'morro', 'morse', 'morts', 'mosed', 'moses', 'mosey', 'mosks', 'mosso', 'moste', 'mosts', 'moted', 'moten', 'motes', 'motet', 'motey', 'moths', 'mothy', 'motis', 'motte', 'motts', 'motty', 'motus', 'motza', 'mouch', 'moues', 'mould', 'mouls', 'moups', 'moust', 'mousy', 'moved', 'moves', 'mowas', 'mowed', 'mowra', 'moxas', 'moxie', 'moyas', 'moyle', 'moyls', 'mozed', 'mozes', 'mozos', 'mpret', 'mucho', 'mucic', 'mucid', 'mucin', 'mucks', 'mucor', 'mucro', 'mudge', 'mudir', 'mudra', 'muffs', 'mufti', 'mugga', 'muggs', 'muggy', 'muhly', 'muids', 'muils', 'muirs', 'muist', 'mujik', 'mulct', 'muled', 'mules', 'muley', 'mulga', 'mulie', 'mulla', 'mulls', 'mulse', 'mulsh', 'mumms', 'mumps', 'mumsy', 'mumus', 'munga', 'munge', 'mungo', 'mungs', 'munis', 'munts', 'muntu', 'muons', 'muras', 'mured', 'mures', 'murex', 'murid', 'murks', 'murls', 'murly', 'murra', 'murre', 'murri', 'murrs', 'murry', 'murti', 'murva', 'musar', 'musca', 'mused', 'muser', 'muses', 'muset', 'musha', 'musit', 'musks', 'musos', 'musse', 'mussy', 'musth', 'musts', 'mutch', 'muted', 'muter', 'mutes', 'mutha', 'mutis', 'muton', 'mutts', 'muxed', 'muxes', 'muzak', 'muzzy', 'mvule', 'myall', 'mylar', 'mynah', 'mynas', 'myoid', 'myoma', 'myope', 'myops', 'myopy', 'mysid', 'mythi', 'myths', 'mythy', 'myxos', 'mzees', 'naams', 'naans', 'nabes', 'nabis', 'nabks', 'nabla', 'nabob', 'nache', 'nacho', 'nacre', 'nadas', 'naeve', 'naevi', 'naffs', 'nagas', 'naggy', 'nagor', 'nahal', 'naiad', 'naifs', 'naiks', 'nails', 'naira', 'nairu', 'naked', 'naker', 'nakfa', 'nalas', 'naled', 'nalla', 'named', 'namer', 'names', 'namma', 'namus', 'nanas', 'nance', 'nancy', 'nandu', 'nanna', 'nanos', 'nanua', 'napas', 'naped', 'napes', 'napoo', 'nappa', 'nappe', 'nappy', 'naras', 'narco', 'narcs', 'nards', 'nares', 'naric', 'naris', 'narks', 'narky', 'narre', 'nashi', 'natch', 'nates', 'natis', 'natty', 'nauch', 'naunt', 'navar', 'naves', 'navew', 'navvy', 'nawab', 'nazes', 'nazir', 'nazis', 'nduja', 'neafe', 'neals', 'neaps', 'nears', 'neath', 'neats', 'nebek', 'nebel', 'necks', 'neddy', 'needs', 'neeld', 'neele', 'neemb', 'neems', 'neeps', 'neese', 'neeze', 'negro', 'negus', 'neifs', 'neist', 'neive', 'nelis', 'nelly', 'nemas', 'nemns', 'nempt', 'nenes', 'neons', 'neper', 'nepit', 'neral', 'nerds', 'nerka', 'nerks', 'nerol', 'nerts', 'nertz', 'nervy', 'nests', 'netes', 'netop', 'netts', 'netty', 'neuks', 'neume', 'neums', 'nevel', 'neves', 'nevus', 'newbs', 'newed', 'newel', 'newie', 'newsy', 'newts', 'nexts', 'nexus', 'ngaio', 'ngana', 'ngati', 'ngoma', 'ngwee', 'nicad', 'nicht', 'nicks', 'nicol', 'nidal', 'nided', 'nides', 'nidor', 'nidus', 'niefs', 'nieve', 'nifes', 'niffs', 'niffy', 'nifty', 'niger', 'nighs', 'nihil', 'nikab', 'nikah', 'nikau', 'nills', 'nimbi', 'nimbs', 'nimps', 'niner', 'nines', 'ninon', 'nipas', 'nippy', 'niqab', 'nirls', 'nirly', 'nisei', 'nisse', 'nisus', 'niter', 'nites', 'nitid', 'niton', 'nitre', 'nitro', 'nitry', 'nitty', 'nival', 'nixed', 'nixer', 'nixes', 'nixie', 'nizam', 'nkosi', 'noahs', 'nobby', 'nocks', 'nodal', 'noddy', 'nodes', 'nodus', 'noels', 'noggs', 'nohow', 'noils', 'noily', 'noint', 'noirs', 'noles', 'nolls', 'nolos', 'nomas', 'nomen', 'nomes', 'nomic', 'nomoi', 'nomos', 'nonas', 'nonce', 'nones', 'nonet', 'nongs', 'nonis', 'nonny', 'nonyl', 'noobs', 'nooit', 'nooks', 'nooky', 'noons', 'noops', 'nopal', 'noria', 'noris', 'norks', 'norma', 'norms', 'nosed', 'noser', 'noses', 'notal', 'noted', 'noter', 'notes', 'notum', 'nould', 'noule', 'nouls', 'nouns', 'nouny', 'noups', 'novae', 'novas', 'novum', 'noway', 'nowed', 'nowls', 'nowts', 'nowty', 'noxal', 'noxes', 'noyau', 'noyed', 'noyes', 'nubby', 'nubia', 'nucha', 'nuddy', 'nuder', 'nudes', 'nudie', 'nudzh', 'nuffs', 'nugae', 'nuked', 'nukes', 'nulla', 'nulls', 'numbs', 'numen', 'nummy', 'nunny', 'nurds', 'nurdy', 'nurls', 'nurrs', 'nutso', 'nutsy', 'nyaff', 'nyala', 'nying', 'nyssa', 'oaked', 'oaker', 'oakum', 'oared', 'oases', 'oasis', 'oasts', 'oaten', 'oater', 'oaths', 'oaves', 'obang', 'obeah', 'obeli', 'obeys', 'obias', 'obied', 'obiit', 'obits', 'objet', 'oboes', 'obole', 'oboli', 'obols', 'occam', 'ocher', 'oches', 'ochre', 'ochry', 'ocker', 'ocrea', 'octad', 'octan', 'octas', 'octyl', 'oculi', 'odahs', 'odals', 'odeon', 'odeum', 'odism', 'odist', 'odium', 'odors', 'odour', 'odyle', 'odyls', 'ofays', 'offed', 'offie', 'oflag', 'ofter', 'ogams', 'ogeed', 'ogees', 'oggin', 'ogham', 'ogive', 'ogled', 'ogler', 'ogles', 'ogmic', 'ogres', 'ohias', 'ohing', 'ohmic', 'ohone', 'oidia', 'oiled', 'oiler', 'oinks', 'oints', 'ojime', 'okapi', 'okays', 'okehs', 'okras', 'oktas', 'oldie', 'oleic', 'olein', 'olent', 'oleos', 'oleum', 'olios', 'ollas', 'ollav', 'oller', 'ollie', 'ology', 'olpae', 'olpes', 'omasa', 'omber', 'ombus', 'omens', 'omers', 'omits', 'omlah', 'omovs', 'omrah', 'oncer', 'onces', 'oncet', 'oncus', 'onely', 'oners', 'onery', 'onium', 'onkus', 'onlay', 'onned', 'ontic', 'oobit', 'oohed', 'oomph', 'oonts', 'ooped', 'oorie', 'ooses', 'ootid', 'oozed', 'oozes', 'opahs', 'opals', 'opens', 'opepe', 'oping', 'oppos', 'opsin', 'opted', 'opter', 'orach', 'oracy', 'orals', 'orang', 'orant', 'orate', 'orbed', 'orcas', 'orcin', 'ordos', 'oread', 'orfes', 'orgia', 'orgic', 'orgue', 'oribi', 'oriel', 'orixa', 'orles', 'orlon', 'orlop', 'ormer', 'ornis', 'orpin', 'orris', 'ortho', 'orval', 'orzos', 'oscar', 'oshac', 'osier', 'osmic', 'osmol', 'ossia', 'ostia', 'otaku', 'otary', 'ottar', 'ottos', 'oubit', 'oucht', 'ouens', 'ouija', 'oulks', 'oumas', 'oundy', 'oupas', 'ouped', 'ouphe', 'ouphs', 'ourie', 'ousel', 'ousts', 'outby', 'outed', 'outre', 'outro', 'outta', 'ouzel', 'ouzos', 'ovals', 'ovels', 'ovens', 'overs', 'ovist', 'ovoli', 'ovolo', 'ovule', 'owche', 'owies', 'owled', 'owler', 'owlet', 'owned', 'owres', 'owrie', 'owsen', 'oxbow', 'oxers', 'oxeye', 'oxids', 'oxies', 'oxime', 'oxims', 'oxlip', 'oxter', 'oyers', 'ozeki', 'ozzie', 'paals', 'paans', 'pacas', 'paced', 'pacer', 'paces', 'pacey', 'pacha', 'packs', 'pacos', 'pacta', 'pacts', 'padis', 'padle', 'padma', 'padre', 'padri', 'paean', 'paedo', 'paeon', 'paged', 'pager', 'pages', 'pagle', 'pagod', 'pagri', 'paiks', 'pails', 'pains', 'paire', 'pairs', 'paisa', 'paise', 'pakka', 'palas', 'palay', 'palea', 'paled', 'pales', 'palet', 'palis', 'palki', 'palla', 'palls', 'pally', 'palms', 'palmy', 'palpi', 'palps', 'palsa', 'pampa', 'panax', 'pance', 'panda', 'pands', 'pandy', 'paned', 'panes', 'panga', 'pangs', 'panim', 'panko', 'panne', 'panni', 'panto', 'pants', 'panty', 'paoli', 'paolo', 'papas', 'papaw', 'papes', 'pappi', 'pappy', 'parae', 'paras', 'parch', 'pardi', 'pards', 'pardy', 'pared', 'paren', 'pareo', 'pares', 'pareu', 'parev', 'parge', 'pargo', 'paris', 'parki', 'parks', 'parky', 'parle', 'parly', 'parma', 'parol', 'parps', 'parra', 'parrs', 'parti', 'parts', 'parve', 'parvo', 'paseo', 'pases', 'pasha', 'pashm', 'paska', 'paspy', 'passe', 'pasts', 'pated', 'paten', 'pater', 'pates', 'paths', 'patin', 'patka', 'patly', 'patte', 'patus', 'pauas', 'pauls', 'pavan', 'paved', 'paven', 'paver', 'paves', 'pavid', 'pavin', 'pavis', 'pawas', 'pawaw', 'pawed', 'pawer', 'pawks', 'pawky', 'pawls', 'pawns', 'paxes', 'payed', 'payor', 'paysd', 'peage', 'peags', 'peaks', 'peaky', 'peals', 'peans', 'peare', 'pears', 'peart', 'pease', 'peats', 'peaty', 'peavy', 'peaze', 'pebas', 'pechs', 'pecke', 'pecks', 'pecky', 'pedes', 'pedis', 'pedro', 'peece', 'peeks', 'peels', 'peens', 'peeoy', 'peepe', 'peeps', 'peers', 'peery', 'peeve', 'peggy', 'peghs', 'peins', 'peise', 'peize', 'pekan', 'pekes', 'pekin', 'pekoe', 'pelas', 'pelau', 'peles', 'pelfs', 'pells', 'pelma', 'pelon', 'pelta', 'pelts', 'pends', 'pendu', 'pened', 'penes', 'pengo', 'penie', 'penis', 'penks', 'penna', 'penni', 'pents', 'peons', 'peony', 'pepla', 'pepos', 'peppy', 'pepsi', 'perai', 'perce', 'percs', 'perdu', 'perdy', 'perea', 'peres', 'peris', 'perks', 'perms', 'perns', 'perog', 'perps', 'perry', 'perse', 'perst', 'perts', 'perve', 'pervo', 'pervs', 'pervy', 'pesos', 'pests', 'pesty', 'petar', 'peter', 'petit', 'petre', 'petri', 'petti', 'petto', 'pewee', 'pewit', 'peyse', 'phage', 'phang', 'phare', 'pharm', 'pheer', 'phene', 'pheon', 'phese', 'phial', 'phish', 'phizz', 'phlox', 'phoca', 'phono', 'phons', 'phots', 'phpht', 'phuts', 'phyla', 'phyle', 'piani', 'pians', 'pibal', 'pical', 'picas', 'piccy', 'picks', 'picot', 'picra', 'picul', 'piend', 'piers', 'piert', 'pieta', 'piets', 'piezo', 'pight', 'pigmy', 'piing', 'pikas', 'pikau', 'piked', 'piker', 'pikes', 'pikey', 'pikis', 'pikul', 'pilae', 'pilaf', 'pilao', 'pilar', 'pilau', 'pilaw', 'pilch', 'pilea', 'piled', 'pilei', 'piler', 'piles', 'pilis', 'pills', 'pilow', 'pilum', 'pilus', 'pimas', 'pimps', 'pinas', 'pined', 'pines', 'pingo', 'pings', 'pinko', 'pinks', 'pinna', 'pinny', 'pinon', 'pinot', 'pinta', 'pints', 'pinup', 'pions', 'piony', 'pious', 'pioye', 'pioys', 'pipal', 'pipas', 'piped', 'pipes', 'pipet', 'pipis', 'pipit', 'pippy', 'pipul', 'pirai', 'pirls', 'pirns', 'pirog', 'pisco', 'pises', 'pisky', 'pisos', 'pissy', 'piste', 'pitas', 'piths', 'piton', 'pitot', 'pitta', 'piums', 'pixes', 'pized', 'pizes', 'plaas', 'plack', 'plage', 'plans', 'plaps', 'plash', 'plasm', 'plast', 'plats', 'platt', 'platy', 'playa', 'plays', 'pleas', 'plebe', 'plebs', 'plena', 'pleon', 'plesh', 'plews', 'plica', 'plies', 'plims', 'pling', 'plink', 'ploat', 'plods', 'plong', 'plonk', 'plook', 'plops', 'plots', 'plotz', 'plouk', 'plows', 'ploye', 'ploys', 'plues', 'pluff', 'plugs', 'plums', 'plumy', 'pluot', 'pluto', 'plyer', 'poach', 'poaka', 'poake', 'poboy', 'pocks', 'pocky', 'podal', 'poddy', 'podex', 'podge', 'podgy', 'podia', 'poems', 'poeps', 'poets', 'pogey', 'pogge', 'pogos', 'pohed', 'poilu', 'poind', 'pokal', 'poked', 'pokes', 'pokey', 'pokie', 'poled', 'poler', 'poles', 'poley', 'polio', 'polis', 'polje', 'polks', 'polls', 'polly', 'polos', 'polts', 'polys', 'pombe', 'pomes', 'pommy', 'pomos', 'pomps', 'ponce', 'poncy', 'ponds', 'pones', 'poney', 'ponga', 'pongo', 'pongs', 'pongy', 'ponks', 'ponts', 'ponty', 'ponzu', 'poods', 'pooed', 'poofs', 'poofy', 'poohs', 'pooja', 'pooka', 'pooks', 'pools', 'poons', 'poops', 'poopy', 'poori', 'poort', 'poots', 'poove', 'poovy', 'popes', 'poppa', 'popsy', 'porae', 'poral', 'pored', 'porer', 'pores', 'porge', 'porgy', 'porin', 'porks', 'porky', 'porno', 'porns', 'porny', 'porta', 'ports', 'porty', 'posed', 'poses', 'posey', 'posho', 'posts', 'potae', 'potch', 'poted', 'potes', 'potin', 'potoo', 'potsy', 'potto', 'potts', 'potty', 'pouff', 'poufs', 'pouke', 'pouks', 'poule', 'poulp', 'poult', 'poupe', 'poupt', 'pours', 'pouts', 'powan', 'powin', 'pownd', 'powns', 'powny', 'powre', 'poxed', 'poxes', 'poynt', 'poyou', 'poyse', 'pozzy', 'praam', 'prads', 'prahu', 'prams', 'prana', 'prang', 'praos', 'prase', 'prate', 'prats', 'pratt', 'praty', 'praus', 'prays', 'predy', 'preed', 'prees', 'preif', 'prems', 'premy', 'prent', 'preon', 'preop', 'preps', 'presa', 'prese', 'prest', 'preve', 'prexy', 'preys', 'prial', 'pricy', 'prief', 'prier', 'pries', 'prigs', 'prill', 'prima', 'primi', 'primp', 'prims', 'primy', 'prink', 'prion', 'prise', 'priss', 'proas', 'probs', 'prods', 'proem', 'profs', 'progs', 'proin', 'proke', 'prole', 'proll', 'promo', 'proms', 'pronk', 'props', 'prore', 'proso', 'pross', 'prost', 'prosy', 'proto', 'proul', 'prows', 'proyn', 'prunt', 'pruta', 'pryer', 'pryse', 'pseud', 'pshaw', 'psion', 'psoae', 'psoai', 'psoas', 'psora', 'psych', 'psyop', 'pubco', 'pubes', 'pubis', 'pucan', 'pucer', 'puces', 'pucka', 'pucks', 'puddy', 'pudge', 'pudic', 'pudor', 'pudsy', 'pudus', 'puers', 'puffa', 'puffs', 'puggy', 'pugil', 'puhas', 'pujah', 'pujas', 'pukas', 'puked', 'puker', 'pukes', 'pukey', 'pukka', 'pukus', 'pulao', 'pulas', 'puled', 'puler', 'pules', 'pulik', 'pulis', 'pulka', 'pulks', 'pulli', 'pulls', 'pully', 'pulmo', 'pulps', 'pulus', 'pumas', 'pumie', 'pumps', 'punas', 'punce', 'punga', 'pungs', 'punji', 'punka', 'punks', 'punky', 'punny', 'punto', 'punts', 'punty', 'pupae', 'pupal', 'pupas', 'pupus', 'purda', 'pured', 'pures', 'purin', 'puris', 'purls', 'purpy', 'purrs', 'pursy', 'purty', 'puses', 'pusle', 'pussy', 'putid', 'puton', 'putti', 'putto', 'putts', 'puzel', 'pwned', 'pyats', 'pyets', 'pygal', 'pyins', 'pylon', 'pyned', 'pynes', 'pyoid', 'pyots', 'pyral', 'pyran', 'pyres', 'pyrex', 'pyric', 'pyros', 'pyxed', 'pyxes', 'pyxie', 'pyxis', 'pzazz', 'qadis', 'qaids', 'qajaq', 'qanat', 'qapik', 'qibla', 'qophs', 'qorma', 'quads', 'quaff', 'quags', 'quair', 'quais', 'quaky', 'quale', 'quant', 'quare', 'quass', 'quate', 'quats', 'quayd', 'quays', 'qubit', 'quean', 'queme', 'quena', 'quern', 'queyn', 'queys', 'quich', 'quids', 'quiff', 'quims', 'quina', 'quine', 'quino', 'quins', 'quint', 'quipo', 'quips', 'quipu', 'quire', 'quirt', 'quist', 'quits', 'quoad', 'quods', 'quoif', 'quoin', 'quoit', 'quoll', 'quonk', 'quops', 'quran', 'qursh', 'quyte', 'rabat', 'rabic', 'rabis', 'raced', 'races', 'rache', 'racks', 'racon', 'radge', 'radix', 'radon', 'raffs', 'rafts', 'ragas', 'ragde', 'raged', 'ragee', 'rager', 'rages', 'ragga', 'raggs', 'raggy', 'ragis', 'ragus', 'rahed', 'rahui', 'raias', 'raids', 'raiks', 'raile', 'rails', 'raine', 'rains', 'raird', 'raita', 'raits', 'rajas', 'rajes', 'raked', 'rakee', 'raker', 'rakes', 'rakia', 'rakis', 'rakus', 'rales', 'ramal', 'ramee', 'ramet', 'ramie', 'ramin', 'ramis', 'rammy', 'ramps', 'ramus', 'ranas', 'rance', 'rands', 'ranee', 'ranga', 'rangi', 'rangs', 'rangy', 'ranid', 'ranis', 'ranke', 'ranks', 'rants', 'raped', 'raper', 'rapes', 'raphe', 'rappe', 'rared', 'raree', 'rares', 'rarks', 'rased', 'raser', 'rases', 'rasps', 'rasse', 'rasta', 'ratal', 'ratan', 'ratas', 'ratch', 'rated', 'ratel', 'rater', 'rates', 'ratha', 'rathe', 'raths', 'ratoo', 'ratos', 'ratus', 'rauns', 'raupo', 'raved', 'ravel', 'raver', 'raves', 'ravey', 'ravin', 'rawer', 'rawin', 'rawly', 'rawns', 'raxed', 'raxes', 'rayah', 'rayas', 'rayed', 'rayle', 'rayne', 'razed', 'razee', 'razer', 'razes', 'razoo', 'readd', 'reads', 'reais', 'reaks', 'realo', 'reals', 'reame', 'reams', 'reamy', 'reans', 'reaps', 'rears', 'reast', 'reata', 'reate', 'reave', 'rebbe', 'rebec', 'rebid', 'rebit', 'rebop', 'rebuy', 'recal', 'recce', 'recco', 'reccy', 'recit', 'recks', 'recon', 'recta', 'recti', 'recto', 'redan', 'redds', 'reddy', 'reded', 'redes', 'redia', 'redid', 'redip', 'redly', 'redon', 'redos', 'redox', 'redry', 'redub', 'redux', 'redye', 'reech', 'reede', 'reeds', 'reefs', 'reefy', 'reeks', 'reeky', 'reels', 'reens', 'reest', 'reeve', 'refed', 'refel', 'reffo', 'refis', 'refix', 'refly', 'refry', 'regar', 'reges', 'reggo', 'regie', 'regma', 'regna', 'regos', 'regur', 'rehem', 'reifs', 'reify', 'reiki', 'reiks', 'reink', 'reins', 'reird', 'reist', 'reive', 'rejig', 'rejon', 'reked', 'rekes', 'rekey', 'relet', 'relie', 'relit', 'rello', 'reman', 'remap', 'remen', 'remet', 'remex', 'remix', 'renay', 'rends', 'reney', 'renga', 'renig', 'renin', 'renne', 'renos', 'rente', 'rents', 'reoil', 'reorg', 'repeg', 'repin', 'repla', 'repos', 'repot', 'repps', 'repro', 'reran', 'rerig', 'resat', 'resaw', 'resay', 'resee', 'reses', 'resew', 'resid', 'resit', 'resod', 'resow', 'resto', 'rests', 'resty', 'resus', 'retag', 'retax', 'retem', 'retia', 'retie', 'retox', 'revet', 'revie', 'rewan', 'rewax', 'rewed', 'rewet', 'rewin', 'rewon', 'rewth', 'rexes', 'rezes', 'rheas', 'rheme', 'rheum', 'rhies', 'rhime', 'rhine', 'rhody', 'rhomb', 'rhone', 'rhumb', 'rhyne', 'rhyta', 'riads', 'rials', 'riant', 'riata', 'ribas', 'ribby', 'ribes', 'riced', 'ricer', 'rices', 'ricey', 'richt', 'ricin', 'ricks', 'rides', 'ridgy', 'ridic', 'riels', 'riems', 'rieve', 'rifer', 'riffs', 'rifte', 'rifts', 'rifty', 'riggs', 'rigol', 'riled', 'riles', 'riley', 'rille', 'rills', 'rimae', 'rimed', 'rimer', 'rimes', 'rimus', 'rinds', 'rindy', 'rines', 'rings', 'rinks', 'rioja', 'riots', 'riped', 'ripes', 'ripps', 'rises', 'rishi', 'risks', 'risps', 'risus', 'rites', 'ritts', 'ritzy', 'rivas', 'rived', 'rivel', 'riven', 'rives', 'riyal', 'rizas', 'roads', 'roams', 'roans', 'roars', 'roary', 'roate', 'robed', 'robes', 'roble', 'rocks', 'roded', 'rodes', 'roguy', 'rohes', 'roids', 'roils', 'roily', 'roins', 'roist', 'rojak', 'rojis', 'roked', 'roker', 'rokes', 'rolag', 'roles', 'rolfs', 'rolls', 'romal', 'roman', 'romeo', 'romps', 'ronde', 'rondo', 'roneo', 'rones', 'ronin', 'ronne', 'ronte', 'ronts', 'roods', 'roofs', 'roofy', 'rooks', 'rooky', 'rooms', 'roons', 'roops', 'roopy', 'roosa', 'roose', 'roots', 'rooty', 'roped', 'roper', 'ropes', 'ropey', 'roque', 'roral', 'rores', 'roric', 'rorid', 'rorie', 'rorts', 'rorty', 'rosed', 'roses', 'roset', 'roshi', 'rosin', 'rosit', 'rosti', 'rosts', 'rotal', 'rotan', 'rotas', 'rotch', 'roted', 'rotes', 'rotis', 'rotls', 'roton', 'rotos', 'rotte', 'rouen', 'roues', 'roule', 'rouls', 'roums', 'roups', 'roupy', 'roust', 'routh', 'routs', 'roved', 'roven', 'roves', 'rowan', 'rowed', 'rowel', 'rowen', 'rowie', 'rowme', 'rownd', 'rowth', 'rowts', 'royne', 'royst', 'rozet', 'rozit', 'ruana', 'rubai', 'rubby', 'rubel', 'rubes', 'rubin', 'ruble', 'rubli', 'rubus', 'ruche', 'rucks', 'rudas', 'rudds', 'rudes', 'rudie', 'rudis', 'rueda', 'ruers', 'ruffe', 'ruffs', 'rugae', 'rugal', 'ruggy', 'ruing', 'ruins', 'rukhs', 'ruled', 'rules', 'rumal', 'rumbo', 'rumen', 'rumes', 'rumly', 'rummy', 'rumpo', 'rumps', 'rumpy', 'runch', 'runds', 'runed', 'runes', 'rungs', 'runic', 'runny', 'runts', 'runty', 'rupia', 'rurps', 'rurus', 'rusas', 'ruses', 'rushy', 'rusks', 'rusma', 'russe', 'rusts', 'ruths', 'rutin', 'rutty', 'ryals', 'rybat', 'ryked', 'rykes', 'rymme', 'rynds', 'ryots', 'ryper', 'saags', 'sabal', 'sabed', 'saber', 'sabes', 'sabha', 'sabin', 'sabir', 'sable', 'sabot', 'sabra', 'sabre', 'sacks', 'sacra', 'saddo', 'sades', 'sadhe', 'sadhu', 'sadis', 'sados', 'sadza', 'safed', 'safes', 'sagas', 'sager', 'sages', 'saggy', 'sagos', 'sagum', 'saheb', 'sahib', 'saice', 'saick', 'saics', 'saids', 'saiga', 'sails', 'saims', 'saine', 'sains', 'sairs', 'saist', 'saith', 'sajou', 'sakai', 'saker', 'sakes', 'sakia', 'sakis', 'sakti', 'salal', 'salat', 'salep', 'sales', 'salet', 'salic', 'salix', 'salle', 'salmi', 'salol', 'salop', 'salpa', 'salps', 'salse', 'salto', 'salts', 'salue', 'salut', 'saman', 'samas', 'samba', 'sambo', 'samek', 'samel', 'samen', 'sames', 'samey', 'samfu', 'sammy', 'sampi', 'samps', 'sands', 'saned', 'sanes', 'sanga', 'sangh', 'sango', 'sangs', 'sanko', 'sansa', 'santo', 'sants', 'saola', 'sapan', 'sapid', 'sapor', 'saran', 'sards', 'sared', 'saree', 'sarge', 'sargo', 'sarin', 'saris', 'sarks', 'sarky', 'sarod', 'saros', 'sarus', 'saser', 'sasin', 'sasse', 'satai', 'satay', 'sated', 'satem', 'sates', 'satis', 'sauba', 'sauch', 'saugh', 'sauls', 'sault', 'saunt', 'saury', 'sauts', 'saved', 'saver', 'saves', 'savey', 'savin', 'sawah', 'sawed', 'sawer', 'saxes', 'sayed', 'sayer', 'sayid', 'sayne', 'sayon', 'sayst', 'sazes', 'scabs', 'scads', 'scaff', 'scags', 'scail', 'scala', 'scall', 'scams', 'scand', 'scans', 'scapa', 'scape', 'scapi', 'scarp', 'scars', 'scart', 'scath', 'scats', 'scatt', 'scaud', 'scaup', 'scaur', 'scaws', 'sceat', 'scena', 'scend', 'schav', 'schmo', 'schul', 'schwa', 'sclim', 'scody', 'scogs', 'scoog', 'scoot', 'scopa', 'scops', 'scots', 'scoug', 'scoup', 'scowp', 'scows', 'scrab', 'scrae', 'scrag', 'scran', 'scrat', 'scraw', 'scray', 'scrim', 'scrip', 'scrob', 'scrod', 'scrog', 'scrow', 'scudi', 'scudo', 'scuds', 'scuff', 'scuft', 'scugs', 'sculk', 'scull', 'sculp', 'sculs', 'scums', 'scups', 'scurf', 'scurs', 'scuse', 'scuta', 'scute', 'scuts', 'scuzz', 'scyes', 'sdayn', 'sdein', 'seals', 'seame', 'seams', 'seamy', 'seans', 'seare', 'sears', 'sease', 'seats', 'seaze', 'sebum', 'secco', 'sechs', 'sects', 'seder', 'sedes', 'sedge', 'sedgy', 'sedum', 'seeds', 'seeks', 'seeld', 'seels', 'seely', 'seems', 'seeps', 'seepy', 'seers', 'sefer', 'segar', 'segni', 'segno', 'segol', 'segos', 'sehri', 'seifs', 'seils', 'seine', 'seirs', 'seise', 'seism', 'seity', 'seiza', 'sekos', 'sekts', 'selah', 'seles', 'selfs', 'sella', 'selle', 'sells', 'selva', 'semee', 'semes', 'semie', 'semis', 'senas', 'sends', 'senes', 'sengi', 'senna', 'senor', 'sensa', 'sensi', 'sente', 'senti', 'sents', 'senvy', 'senza', 'sepad', 'sepal', 'sepic', 'sepoy', 'septa', 'septs', 'serac', 'serai', 'seral', 'sered', 'serer', 'seres', 'serfs', 'serge', 'seric', 'serin', 'serks', 'seron', 'serow', 'serra', 'serre', 'serrs', 'serry', 'servo', 'sesey', 'sessa', 'setae', 'setal', 'seton', 'setts', 'sewan', 'sewar', 'sewed', 'sewel', 'sewen', 'sewin', 'sexed', 'sexer', 'sexes', 'sexto', 'sexts', 'seyen', 'shads', 'shags', 'shahs', 'shako', 'shakt', 'shalm', 'shaly', 'shama', 'shams', 'shand', 'shans', 'shaps', 'sharn', 'shash', 'shaul', 'shawm', 'shawn', 'shaws', 'shaya', 'shays', 'shchi', 'sheaf', 'sheal', 'sheas', 'sheds', 'sheel', 'shend', 'shent', 'sheol', 'sherd', 'shere', 'shero', 'shets', 'sheva', 'shewn', 'shews', 'shiai', 'shiel', 'shier', 'shies', 'shill', 'shily', 'shims', 'shins', 'ships', 'shirr', 'shirs', 'shish', 'shiso', 'shist', 'shite', 'shits', 'shiur', 'shiva', 'shive', 'shivs', 'shlep', 'shlub', 'shmek', 'shmoe', 'shoat', 'shoed', 'shoer', 'shoes', 'shogi', 'shogs', 'shoji', 'shojo', 'shola', 'shool', 'shoon', 'shoos', 'shope', 'shops', 'shorl', 'shote', 'shots', 'shott', 'showd', 'shows', 'shoyu', 'shred', 'shris', 'shrow', 'shtik', 'shtum', 'shtup', 'shule', 'shuln', 'shuls', 'shuns', 'shura', 'shute', 'shuts', 'shwas', 'shyer', 'sials', 'sibbs', 'sibyl', 'sices', 'sicht', 'sicko', 'sicks', 'sicky', 'sidas', 'sided', 'sider', 'sides', 'sidha', 'sidhe', 'sidle', 'sield', 'siens', 'sient', 'sieth', 'sieur', 'sifts', 'sighs', 'sigil', 'sigla', 'signa', 'signs', 'sijos', 'sikas', 'siker', 'sikes', 'silds', 'siled', 'silen', 'siler', 'siles', 'silex', 'silks', 'sills', 'silos', 'silts', 'silty', 'silva', 'simar', 'simas', 'simba', 'simis', 'simps', 'simul', 'sinds', 'sined', 'sines', 'sings', 'sinhs', 'sinks', 'sinky', 'sinus', 'siped', 'sipes', 'sippy', 'sired', 'siree', 'sires', 'sirih', 'siris', 'siroc', 'sirra', 'sirup', 'sisal', 'sises', 'sista', 'sists', 'sitar', 'sited', 'sites', 'sithe', 'sitka', 'situp', 'situs', 'siver', 'sixer', 'sixes', 'sixmo', 'sixte', 'sizar', 'sized', 'sizel', 'sizer', 'sizes', 'skags', 'skail', 'skald', 'skank', 'skart', 'skats', 'skatt', 'skaws', 'skean', 'skear', 'skeds', 'skeed', 'skeef', 'skeen', 'skeer', 'skees', 'skeet', 'skegg', 'skegs', 'skein', 'skelf', 'skell', 'skelm', 'skelp', 'skene', 'skens', 'skeos', 'skeps', 'skers', 'skets', 'skews', 'skids', 'skied', 'skies', 'skiey', 'skimo', 'skims', 'skink', 'skins', 'skint', 'skios', 'skips', 'skirl', 'skirr', 'skite', 'skits', 'skive', 'skivy', 'sklim', 'skoal', 'skody', 'skoff', 'skogs', 'skols', 'skool', 'skort', 'skosh', 'skran', 'skrik', 'skuas', 'skugs', 'skyed', 'skyer', 'skyey', 'skyfs', 'skyre', 'skyrs', 'skyte', 'slabs', 'slade', 'slaes', 'slags', 'slaid', 'slake', 'slams', 'slane', 'slank', 'slaps', 'slart', 'slats', 'slaty', 'slave', 'slaws', 'slays', 'slebs', 'sleds', 'sleer', 'slews', 'sleys', 'slier', 'slily', 'slims', 'slipe', 'slips', 'slipt', 'slish', 'slits', 'slive', 'sloan', 'slobs', 'sloes', 'slogs', 'sloid', 'slojd', 'slomo', 'sloom', 'sloot', 'slops', 'slopy', 'slorm', 'slots', 'slove', 'slows', 'sloyd', 'slubb', 'slubs', 'slued', 'slues', 'sluff', 'slugs', 'sluit', 'slums', 'slurb', 'slurs', 'sluse', 'sluts', 'slyer', 'slype', 'smaak', 'smaik', 'smalm', 'smalt', 'smarm', 'smaze', 'smeek', 'smees', 'smeik', 'smeke', 'smerk', 'smews', 'smirr', 'smirs', 'smits', 'smogs', 'smoko', 'smolt', 'smoor', 'smoot', 'smore', 'smorg', 'smout', 'smowt', 'smugs', 'smurs', 'smush', 'smuts', 'snabs', 'snafu', 'snags', 'snaps', 'snarf', 'snark', 'snars', 'snary', 'snash', 'snath', 'snaws', 'snead', 'sneap', 'snebs', 'sneck', 'sneds', 'sneed', 'snees', 'snell', 'snibs', 'snick', 'snies', 'snift', 'snigs', 'snips', 'snipy', 'snirt', 'snits', 'snobs', 'snods', 'snoek', 'snoep', 'snogs', 'snoke', 'snood', 'snook', 'snool', 'snoot', 'snots', 'snowk', 'snows', 'snubs', 'snugs', 'snush', 'snyes', 'soaks', 'soaps', 'soare', 'soars', 'soave', 'sobas', 'socas', 'soces', 'socko', 'socks', 'socle', 'sodas', 'soddy', 'sodic', 'sodom', 'sofar', 'sofas', 'softa', 'softs', 'softy', 'soger', 'sohur', 'soils', 'soily', 'sojas', 'sojus', 'sokah', 'soken', 'sokes', 'sokol', 'solah', 'solan', 'solas', 'solde', 'soldi', 'soldo', 'solds', 'soled', 'solei', 'soler', 'soles', 'solon', 'solos', 'solum', 'solus', 'soman', 'somas', 'sonce', 'sonde', 'sones', 'songs', 'sonly', 'sonne', 'sonny', 'sonse', 'sonsy', 'sooey', 'sooks', 'sooky', 'soole', 'sools', 'sooms', 'soops', 'soote', 'soots', 'sophs', 'sophy', 'sopor', 'soppy', 'sopra', 'soral', 'soras', 'sorbo', 'sorbs', 'sorda', 'sordo', 'sords', 'sored', 'soree', 'sorel', 'sorer', 'sores', 'sorex', 'sorgo', 'sorns', 'sorra', 'sorta', 'sorts', 'sorus', 'soths', 'sotol', 'souce', 'souct', 'sough', 'souks', 'souls', 'soums', 'soups', 'soupy', 'sours', 'souse', 'souts', 'sowar', 'sowce', 'sowed', 'sowff', 'sowfs', 'sowle', 'sowls', 'sowms', 'sownd', 'sowne', 'sowps', 'sowse', 'sowth', 'soyas', 'soyle', 'soyuz', 'sozin', 'spacy', 'spado', 'spaed', 'spaer', 'spaes', 'spags', 'spahi', 'spail', 'spain', 'spait', 'spake', 'spald', 'spale', 'spall', 'spalt', 'spams', 'spane', 'spang', 'spans', 'spard', 'spars', 'spart', 'spate', 'spats', 'spaul', 'spawl', 'spaws', 'spayd', 'spays', 'spaza', 'spazz', 'speal', 'spean', 'speat', 'specs', 'spect', 'speel', 'speer', 'speil', 'speir', 'speks', 'speld', 'spelk', 'speos', 'spets', 'speug', 'spews', 'spewy', 'spial', 'spica', 'spick', 'spics', 'spide', 'spier', 'spies', 'spiff', 'spifs', 'spiks', 'spile', 'spims', 'spina', 'spink', 'spins', 'spirt', 'spiry', 'spits', 'spitz', 'spivs', 'splay', 'splog', 'spode', 'spods', 'spoom', 'spoor', 'spoot', 'spork', 'sposh', 'spots', 'sprad', 'sprag', 'sprat', 'spred', 'sprew', 'sprit', 'sprod', 'sprog', 'sprue', 'sprug', 'spuds', 'spued', 'spuer', 'spues', 'spugs', 'spule', 'spume', 'spumy', 'spurs', 'sputa', 'spyal', 'spyre', 'squab', 'squaw', 'squeg', 'squid', 'squit', 'squiz', 'stabs', 'stade', 'stags', 'stagy', 'staig', 'stane', 'stang', 'staph', 'staps', 'starn', 'starr', 'stars', 'stats', 'staun', 'staws', 'stays', 'stean', 'stear', 'stedd', 'stede', 'steds', 'steek', 'steem', 'steen', 'steil', 'stela', 'stele', 'stell', 'steme', 'stems', 'stend', 'steno', 'stens', 'stent', 'steps', 'stept', 'stere', 'stets', 'stews', 'stewy', 'steys', 'stich', 'stied', 'sties', 'stilb', 'stile', 'stime', 'stims', 'stimy', 'stipa', 'stipe', 'stire', 'stirk', 'stirp', 'stirs', 'stive', 'stivy', 'stoae', 'stoai', 'stoas', 'stoat', 'stobs', 'stoep', 'stogy', 'stoit', 'stoln', 'stoma', 'stond', 'stong', 'stonk', 'stonn', 'stook', 'stoor', 'stope', 'stops', 'stopt', 'stoss', 'stots', 'stott', 'stoun', 'stoup', 'stour', 'stown', 'stowp', 'stows', 'strad', 'strae', 'strag', 'strak', 'strep', 'strew', 'stria', 'strig', 'strim', 'strop', 'strow', 'stroy', 'strum', 'stubs', 'stude', 'studs', 'stull', 'stulm', 'stumm', 'stums', 'stuns', 'stupa', 'stupe', 'sture', 'sturt', 'styed', 'styes', 'styli', 'stylo', 'styme', 'stymy', 'styre', 'styte', 'subah', 'subas', 'subby', 'suber', 'subha', 'succi', 'sucks', 'sucky', 'sucre', 'sudds', 'sudor', 'sudsy', 'suede', 'suent', 'suers', 'suete', 'suets', 'suety', 'sugan', 'sughs', 'sugos', 'suhur', 'suids', 'suint', 'suits', 'sujee', 'sukhs', 'sukuk', 'sulci', 'sulfa', 'sulfo', 'sulks', 'sulph', 'sulus', 'sumis', 'summa', 'sumos', 'sumph', 'sumps', 'sunis', 'sunks', 'sunna', 'sunns', 'sunup', 'supes', 'supra', 'surah', 'sural', 'suras', 'surat', 'surds', 'sured', 'sures', 'surfs', 'surfy', 'surgy', 'surra', 'sused', 'suses', 'susus', 'sutor', 'sutra', 'sutta', 'swabs', 'swack', 'swads', 'swage', 'swags', 'swail', 'swain', 'swale', 'swaly', 'swamy', 'swang', 'swank', 'swans', 'swaps', 'swapt', 'sward', 'sware', 'swarf', 'swart', 'swats', 'swayl', 'sways', 'sweal', 'swede', 'sweed', 'sweel', 'sweer', 'swees', 'sweir', 'swelt', 'swerf', 'sweys', 'swies', 'swigs', 'swile', 'swims', 'swink', 'swipe', 'swire', 'swiss', 'swith', 'swits', 'swive', 'swizz', 'swobs', 'swole', 'swoln', 'swops', 'swopt', 'swots', 'swoun', 'sybbe', 'sybil', 'syboe', 'sybow', 'sycee', 'syces', 'sycon', 'syens', 'syker', 'sykes', 'sylis', 'sylph', 'sylva', 'symar', 'synch', 'syncs', 'synds', 'syned', 'synes', 'synth', 'syped', 'sypes', 'syphs', 'syrah', 'syren', 'sysop', 'sythe', 'syver', 'taals', 'taata', 'taber', 'tabes', 'tabid', 'tabis', 'tabla', 'tabor', 'tabun', 'tabus', 'tacan', 'taces', 'tacet', 'tache', 'tacho', 'tachs', 'tacks', 'tacos', 'tacts', 'taels', 'tafia', 'taggy', 'tagma', 'tahas', 'tahrs', 'taiga', 'taigs', 'taiko', 'tails', 'tains', 'taira', 'taish', 'taits', 'tajes', 'takas', 'takes', 'takhi', 'takin', 'takis', 'takky', 'talak', 'talaq', 'talar', 'talas', 'talcs', 'talcy', 'talea', 'taler', 'tales', 'talks', 'talky', 'talls', 'talma', 'talpa', 'taluk', 'talus', 'tamal', 'tamed', 'tames', 'tamin', 'tamis', 'tammy', 'tamps', 'tanas', 'tanga', 'tangi', 'tangs', 'tanhs', 'tanka', 'tanks', 'tanky', 'tanna', 'tansy', 'tanti', 'tanto', 'tanty', 'tapas', 'taped', 'tapen', 'tapes', 'tapet', 'tapis', 'tappa', 'tapus', 'taras', 'tardo', 'tared', 'tares', 'targa', 'targe', 'tarns', 'taroc', 'tarok', 'taros', 'tarps', 'tarre', 'tarry', 'tarsi', 'tarts', 'tarty', 'tasar', 'tased', 'taser', 'tases', 'tasks', 'tassa', 'tasse', 'tasso', 'tatar', 'tater', 'tates', 'taths', 'tatie', 'tatou', 'tatts', 'tatus', 'taube', 'tauld', 'tauon', 'taupe', 'tauts', 'tavah', 'tavas', 'taver', 'tawai', 'tawas', 'tawed', 'tawer', 'tawie', 'tawse', 'tawts', 'taxed', 'taxer', 'taxes', 'taxis', 'taxol', 'taxon', 'taxor', 'taxus', 'tayra', 'tazza', 'tazze', 'teade', 'teads', 'teaed', 'teaks', 'teals', 'teams', 'tears', 'teats', 'teaze', 'techs', 'techy', 'tecta', 'teels', 'teems', 'teend', 'teene', 'teens', 'teeny', 'teers', 'teffs', 'teggs', 'tegua', 'tegus', 'tehrs', 'teiid', 'teils', 'teind', 'teins', 'telae', 'telco', 'teles', 'telex', 'telia', 'telic', 'tells', 'telly', 'teloi', 'telos', 'temed', 'temes', 'tempi', 'temps', 'tempt', 'temse', 'tench', 'tends', 'tendu', 'tenes', 'tenge', 'tenia', 'tenne', 'tenno', 'tenny', 'tenon', 'tents', 'tenty', 'tenue', 'tepal', 'tepas', 'tepoy', 'terai', 'teras', 'terce', 'terek', 'teres', 'terfe', 'terfs', 'terga', 'terms', 'terne', 'terns', 'terry', 'terts', 'tesla', 'testa', 'teste', 'tests', 'tetes', 'teths', 'tetra', 'tetri', 'teuch', 'teugh', 'tewed', 'tewel', 'tewit', 'texas', 'texes', 'texts', 'thack', 'thagi', 'thaim', 'thale', 'thali', 'thana', 'thane', 'thang', 'thans', 'thanx', 'tharm', 'thars', 'thaws', 'thawy', 'thebe', 'theca', 'theed', 'theek', 'thees', 'thegn', 'theic', 'thein', 'thelf', 'thema', 'thens', 'theow', 'therm', 'thesp', 'thete', 'thews', 'thewy', 'thigs', 'thilk', 'thill', 'thine', 'thins', 'thiol', 'thirl', 'thoft', 'thole', 'tholi', 'thoro', 'thorp', 'thous', 'thowl', 'thrae', 'thraw', 'thrid', 'thrip', 'throe', 'thuds', 'thugs', 'thuja', 'thunk', 'thurl', 'thuya', 'thymi', 'thymy', 'tians', 'tiars', 'tical', 'ticca', 'ticed', 'tices', 'tichy', 'ticks', 'ticky', 'tiddy', 'tided', 'tides', 'tiers', 'tiffs', 'tifos', 'tifts', 'tiges', 'tigon', 'tikas', 'tikes', 'tikis', 'tikka', 'tilak', 'tiled', 'tiler', 'tiles', 'tills', 'tilly', 'tilth', 'tilts', 'timbo', 'timed', 'times', 'timon', 'timps', 'tinas', 'tinct', 'tinds', 'tinea', 'tined', 'tines', 'tinge', 'tings', 'tinks', 'tinny', 'tints', 'tinty', 'tipis', 'tippy', 'tired', 'tires', 'tirls', 'tiros', 'tirrs', 'titch', 'titer', 'titis', 'titre', 'titty', 'titup', 'tiyin', 'tiyns', 'tizes', 'tizzy', 'toads', 'toady', 'toaze', 'tocks', 'tocky', 'tocos', 'todde', 'toeas', 'toffs', 'toffy', 'tofts', 'tofus', 'togae', 'togas', 'toged', 'toges', 'togue', 'tohos', 'toile', 'toils', 'toing', 'toise', 'toits', 'tokay', 'toked', 'toker', 'tokes', 'tokos', 'tolan', 'tolar', 'tolas', 'toled', 'toles', 'tolls', 'tolly', 'tolts', 'tolus', 'tolyl', 'toman', 'tombs', 'tomes', 'tomia', 'tommy', 'tomos', 'tondi', 'tondo', 'toned', 'toner', 'tones', 'toney', 'tongs', 'tonka', 'tonks', 'tonne', 'tonus', 'tools', 'tooms', 'toons', 'toots', 'toped', 'topee', 'topek', 'toper', 'topes', 'tophe', 'tophi', 'tophs', 'topis', 'topoi', 'topos', 'toppy', 'toque', 'torah', 'toran', 'toras', 'torcs', 'tores', 'toric', 'torii', 'toros', 'torot', 'torrs', 'torse', 'torsi', 'torsk', 'torta', 'torte', 'torts', 'tosas', 'tosed', 'toses', 'toshy', 'tossy', 'toted', 'toter', 'totes', 'totty', 'touks', 'touns', 'tours', 'touse', 'tousy', 'touts', 'touze', 'touzy', 'towed', 'towie', 'towns', 'towny', 'towse', 'towsy', 'towts', 'towze', 'towzy', 'toyed', 'toyer', 'toyon', 'toyos', 'tozed', 'tozes', 'tozie', 'trabs', 'trads', 'tragi', 'traik', 'trams', 'trank', 'tranq', 'trans', 'trant', 'trape', 'traps', 'trapt', 'trass', 'trats', 'tratt', 'trave', 'trayf', 'trays', 'treck', 'treed', 'treen', 'trees', 'trefa', 'treif', 'treks', 'trema', 'trems', 'tress', 'trest', 'trets', 'trews', 'treyf', 'treys', 'triac', 'tride', 'trier', 'tries', 'triff', 'trigo', 'trigs', 'trike', 'trild', 'trill', 'trims', 'trine', 'trins', 'triol', 'trior', 'trios', 'trips', 'tripy', 'trist', 'troad', 'troak', 'troat', 'trock', 'trode', 'trods', 'trogs', 'trois', 'troke', 'tromp', 'trona', 'tronc', 'trone', 'tronk', 'trons', 'trooz', 'troth', 'trots', 'trows', 'troys', 'trued', 'trues', 'trugo', 'trugs', 'trull', 'tryer', 'tryke', 'tryma', 'tryps', 'tsade', 'tsadi', 'tsars', 'tsked', 'tsuba', 'tsubo', 'tuans', 'tuart', 'tuath', 'tubae', 'tubar', 'tubas', 'tubby', 'tubed', 'tubes', 'tucks', 'tufas', 'tuffe', 'tuffs', 'tufts', 'tufty', 'tugra', 'tuile', 'tuina', 'tuism', 'tuktu', 'tules', 'tulpa', 'tulsi', 'tumid', 'tummy', 'tumps', 'tumpy', 'tunas', 'tunds', 'tuned', 'tuner', 'tunes', 'tungs', 'tunny', 'tupek', 'tupik', 'tuple', 'tuque', 'turds', 'turfs', 'turfy', 'turks', 'turme', 'turms', 'turns', 'turnt', 'turps', 'turrs', 'tushy', 'tusks', 'tusky', 'tutee', 'tutti', 'tutty', 'tutus', 'tuxes', 'tuyer', 'twaes', 'twain', 'twals', 'twank', 'twats', 'tways', 'tweel', 'tween', 'tweep', 'tweer', 'twerk', 'twerp', 'twier', 'twigs', 'twill', 'twilt', 'twink', 'twins', 'twiny', 'twire', 'twirp', 'twite', 'twits', 'twoer', 'twyer', 'tyees', 'tyers', 'tyiyn', 'tykes', 'tyler', 'tymps', 'tynde', 'tyned', 'tynes', 'typal', 'typed', 'types', 'typey', 'typic', 'typos', 'typps', 'typto', 'tyran', 'tyred', 'tyres', 'tyros', 'tythe', 'tzars', 'udals', 'udons', 'ugali', 'ugged', 'uhlan', 'uhuru', 'ukase', 'ulama', 'ulans', 'ulema', 'ulmin', 'ulnad', 'ulnae', 'ulnar', 'ulnas', 'ulpan', 'ulvas', 'ulyie', 'ulzie', 'umami', 'umbel', 'umber', 'umble', 'umbos', 'umbre', 'umiac', 'umiak', 'umiaq', 'ummah', 'ummas', 'ummed', 'umped', 'umphs', 'umpie', 'umpty', 'umrah', 'umras', 'unais', 'unapt', 'unarm', 'unary', 'unaus', 'unbag', 'unban', 'unbar', 'unbed', 'unbid', 'unbox', 'uncap', 'unces', 'uncia', 'uncos', 'uncoy', 'uncus', 'undam', 'undee', 'undos', 'undug', 'uneth', 'unfix', 'ungag', 'unget', 'ungod', 'ungot', 'ungum', 'unhat', 'unhip', 'unica', 'units', 'unjam', 'unked', 'unket', 'unkid', 'unlaw', 'unlay', 'unled', 'unlet', 'unlid', 'unman', 'unmew', 'unmix', 'unpay', 'unpeg', 'unpen', 'unpin', 'unred', 'unrid', 'unrig', 'unrip', 'unsaw', 'unsay', 'unsee', 'unsew', 'unsex', 'unsod', 'untax', 'untin', 'unwet', 'unwit', 'unwon', 'upbow', 'upbye', 'updos', 'updry', 'upend', 'upjet', 'uplay', 'upled', 'uplit', 'upped', 'upran', 'uprun', 'upsee', 'upsey', 'uptak', 'upter', 'uptie', 'uraei', 'urali', 'uraos', 'urare', 'urari', 'urase', 'urate', 'urbex', 'urbia', 'urdee', 'ureal', 'ureas', 'uredo', 'ureic', 'urena', 'urent', 'urged', 'urger', 'urges', 'urial', 'urite', 'urman', 'urnal', 'urned', 'urped', 'ursae', 'ursid', 'urson', 'urubu', 'urvas', 'users', 'usnea', 'usque', 'usure', 'usury', 'uteri', 'uveal', 'uveas', 'uvula', 'vacua', 'vaded', 'vades', 'vagal', 'vagus', 'vails', 'vaire', 'vairs', 'vairy', 'vakas', 'vakil', 'vales', 'valis', 'valse', 'vamps', 'vampy', 'vanda', 'vaned', 'vanes', 'vangs', 'vants', 'vaped', 'vaper', 'vapes', 'varan', 'varas', 'vardy', 'varec', 'vares', 'varia', 'varix', 'varna', 'varus', 'varve', 'vasal', 'vases', 'vasts', 'vasty', 'vatic', 'vatus', 'vauch', 'vaute', 'vauts', 'vawte', 'vaxes', 'veale', 'veals', 'vealy', 'veena', 'veeps', 'veers', 'veery', 'vegas', 'veges', 'vegie', 'vegos', 'vehme', 'veils', 'veily', 'veins', 'veiny', 'velar', 'velds', 'veldt', 'veles', 'vells', 'velum', 'venae', 'venal', 'vends', 'vendu', 'veney', 'venge', 'venin', 'vents', 'venus', 'verbs', 'verra', 'verry', 'verst', 'verts', 'vertu', 'vespa', 'vesta', 'vests', 'vetch', 'vexed', 'vexer', 'vexes', 'vexil', 'vezir', 'vials', 'viand', 'vibes', 'vibex', 'vibey', 'viced', 'vices', 'vichy', 'viers', 'views', 'viewy', 'vifda', 'viffs', 'vigas', 'vigia', 'vilde', 'viler', 'villi', 'vills', 'vimen', 'vinal', 'vinas', 'vinca', 'vined', 'viner', 'vines', 'vinew', 'vinic', 'vinos', 'vints', 'viold', 'viols', 'vired', 'vireo', 'vires', 'virga', 'virge', 'virid', 'virls', 'virtu', 'visas', 'vised', 'vises', 'visie', 'visne', 'vison', 'visto', 'vitae', 'vitas', 'vitex', 'vitro', 'vitta', 'vivas', 'vivat', 'vivda', 'viver', 'vives', 'vizir', 'vizor', 'vleis', 'vlies', 'vlogs', 'voars', 'vocab', 'voces', 'voddy', 'vodou', 'vodun', 'voema', 'vogie', 'voids', 'voile', 'voips', 'volae', 'volar', 'voled', 'voles', 'volet', 'volks', 'volta', 'volte', 'volti', 'volts', 'volva', 'volve', 'vomer', 'voted', 'votes', 'vouge', 'voulu', 'vowed', 'vower', 'voxel', 'vozhd', 'vraic', 'vrils', 'vroom', 'vrous', 'vrouw', 'vrows', 'vuggs', 'vuggy', 'vughs', 'vughy', 'vulgo', 'vulns', 'vulva', 'vutty', 'waacs', 'wacke', 'wacko', 'wacks', 'wadds', 'waddy', 'waded', 'wader', 'wades', 'wadge', 'wadis', 'wadts', 'waffs', 'wafts', 'waged', 'wages', 'wagga', 'wagyu', 'wahoo', 'waide', 'waifs', 'waift', 'wails', 'wains', 'wairs', 'waite', 'waits', 'wakas', 'waked', 'waken', 'waker', 'wakes', 'wakfs', 'waldo', 'walds', 'waled', 'waler', 'wales', 'walie', 'walis', 'walks', 'walla', 'walls', 'wally', 'walty', 'wamed', 'wames', 'wamus', 'wands', 'waned', 'wanes', 'waney', 'wangs', 'wanks', 'wanky', 'wanle', 'wanly', 'wanna', 'wants', 'wanty', 'wanze', 'waqfs', 'warbs', 'warby', 'wards', 'wared', 'wares', 'warez', 'warks', 'warms', 'warns', 'warps', 'warre', 'warst', 'warts', 'wases', 'washy', 'wasms', 'wasps', 'waspy', 'wasts', 'watap', 'watts', 'wauff', 'waugh', 'wauks', 'waulk', 'wauls', 'waurs', 'waved', 'waves', 'wavey', 'wawas', 'wawes', 'wawls', 'waxed', 'waxer', 'waxes', 'wayed', 'wazir', 'wazoo', 'weald', 'weals', 'weamb', 'weans', 'wears', 'webby', 'weber', 'wecht', 'wedel', 'wedgy', 'weeds', 'weeke', 'weeks', 'weels', 'weems', 'weens', 'weeny', 'weeps', 'weepy', 'weest', 'weete', 'weets', 'wefte', 'wefts', 'weids', 'weils', 'weirs', 'weise', 'weize', 'wekas', 'welds', 'welke', 'welks', 'welkt', 'wells', 'welly', 'welts', 'wembs', 'wench', 'wends', 'wenge', 'wenny', 'wents', 'weros', 'wersh', 'wests', 'wetas', 'wetly', 'wexed', 'wexes', 'whamo', 'whams', 'whang', 'whaps', 'whare', 'whata', 'whats', 'whaup', 'whaur', 'wheal', 'whear', 'wheen', 'wheep', 'wheft', 'whelk', 'whelm', 'whens', 'whets', 'whews', 'wheys', 'whids', 'whift', 'whigs', 'whilk', 'whims', 'whins', 'whios', 'whips', 'whipt', 'whirr', 'whirs', 'whish', 'whiss', 'whist', 'whits', 'whity', 'whizz', 'whomp', 'whoof', 'whoot', 'whops', 'whore', 'whorl', 'whort', 'whoso', 'whows', 'whump', 'whups', 'whyda', 'wicca', 'wicks', 'wicky', 'widdy', 'wides', 'wiels', 'wifed', 'wifes', 'wifey', 'wifie', 'wifty', 'wigan', 'wigga', 'wiggy', 'wikis', 'wilco', 'wilds', 'wiled', 'wiles', 'wilga', 'wilis', 'wilja', 'wills', 'wilts', 'wimps', 'winds', 'wined', 'wines', 'winey', 'winge', 'wings', 'wingy', 'winks', 'winna', 'winns', 'winos', 'winze', 'wiped', 'wiper', 'wipes', 'wired', 'wirer', 'wires', 'wirra', 'wised', 'wises', 'wisha', 'wisht', 'wisps', 'wists', 'witan', 'wited', 'wites', 'withe', 'withs', 'withy', 'wived', 'wiver', 'wives', 'wizen', 'wizes', 'woads', 'woald', 'wocks', 'wodge', 'woful', 'wojus', 'woker', 'wokka', 'wolds', 'wolfs', 'wolly', 'wolve', 'wombs', 'womby', 'womyn', 'wonga', 'wongi', 'wonks', 'wonky', 'wonts', 'woods', 'wooed', 'woofs', 'woofy', 'woold', 'wools', 'woons', 'woops', 'woopy', 'woose', 'woosh', 'wootz', 'words', 'works', 'worms', 'wormy', 'worts', 'wowed', 'wowee', 'woxen', 'wrang', 'wraps', 'wrapt', 'wrast', 'wrate', 'wrawl', 'wrens', 'wrick', 'wried', 'wrier', 'wries', 'writs', 'wroke', 'wroot', 'wroth', 'wryer', 'wuddy', 'wudus', 'wulls', 'wurst', 'wuses', 'wushu', 'wussy', 'wuxia', 'wyled', 'wyles', 'wynds', 'wynns', 'wyted', 'wytes', 'xebec', 'xenia', 'xenic', 'xenon', 'xeric', 'xerox', 'xerus', 'xoana', 'xrays', 'xylan', 'xylem', 'xylic', 'xylol', 'xylyl', 'xysti', 'xysts', 'yaars', 'yabas', 'yabba', 'yabby', 'yacca', 'yacka', 'yacks', 'yaffs', 'yager', 'yages', 'yagis', 'yahoo', 'yaird', 'yakka', 'yakow', 'yales', 'yamen', 'yampy', 'yamun', 'yangs', 'yanks', 'yapok', 'yapon', 'yapps', 'yappy', 'yarak', 'yarco', 'yards', 'yarer', 'yarfa', 'yarks', 'yarns', 'yarrs', 'yarta', 'yarto', 'yates', 'yauds', 'yauld', 'yaups', 'yawed', 'yawey', 'yawls', 'yawns', 'yawny', 'yawps', 'ybore', 'yclad', 'ycled', 'ycond', 'ydrad', 'ydred', 'yeads', 'yeahs', 'yealm', 'yeans', 'yeard', 'years', 'yecch', 'yechs', 'yechy', 'yedes', 'yeeds', 'yeesh', 'yeggs', 'yelks', 'yells', 'yelms', 'yelps', 'yelts', 'yenta', 'yente', 'yerba', 'yerds', 'yerks', 'yeses', 'yesks', 'yests', 'yesty', 'yetis', 'yetts', 'yeuks', 'yeuky', 'yeven', 'yeves', 'yewen', 'yexed', 'yexes', 'yfere', 'yiked', 'yikes', 'yills', 'yince', 'yipes', 'yippy', 'yirds', 'yirks', 'yirrs', 'yirth', 'yites', 'yitie', 'ylems', 'ylike', 'ylkes', 'ymolt', 'ympes', 'yobbo', 'yobby', 'yocks', 'yodel', 'yodhs', 'yodle', 'yogas', 'yogee', 'yoghs', 'yogic', 'yogin', 'yogis', 'yoick', 'yojan', 'yoked', 'yokel', 'yoker', 'yokes', 'yokul', 'yolks', 'yolky', 'yomim', 'yomps', 'yonic', 'yonis', 'yonks', 'yoofs', 'yoops', 'yores', 'yorks', 'yorps', 'youks', 'yourn', 'yours', 'yourt', 'youse', 'yowed', 'yowes', 'yowie', 'yowls', 'yowza', 'yrapt', 'yrent', 'yrivd', 'yrneh', 'ysame', 'ytost', 'yuans', 'yucas', 'yucca', 'yucch', 'yucko', 'yucks', 'yucky', 'yufts', 'yugas', 'yuked', 'yukes', 'yukky', 'yukos', 'yulan', 'yules', 'yummo', 'yummy', 'yumps', 'yupon', 'yuppy', 'yurta', 'yurts', 'yuzus', 'zabra', 'zacks', 'zaida', 'zaidy', 'zaire', 'zakat', 'zaman', 'zambo', 'zamia', 'zanja', 'zante', 'zanza', 'zanze', 'zappy', 'zarfs', 'zaris', 'zatis', 'zaxes', 'zayin', 'zazen', 'zeals', 'zebec', 'zebub', 'zebus', 'zedas', 'zeins', 'zendo', 'zerda', 'zerks', 'zeros', 'zests', 'zetas', 'zexes', 'zezes', 'zhomo', 'zibet', 'ziffs', 'zigan', 'zilas', 'zilch', 'zilla', 'zills', 'zimbi', 'zimbs', 'zinco', 'zincs', 'zincy', 'zineb', 'zines', 'zings', 'zingy', 'zinke', 'zinky', 'zippo', 'zippy', 'ziram', 'zitis', 'zizel', 'zizit', 'zlote', 'zloty', 'zoaea', 'zobos', 'zobus', 'zocco', 'zoeae', 'zoeal', 'zoeas', 'zoism', 'zoist', 'zombi', 'zonae', 'zonda', 'zoned', 'zoner', 'zones', 'zonks', 'zooea', 'zooey', 'zooid', 'zooks', 'zooms', 'zoons', 'zooty', 'zoppa', 'zoppo', 'zoril', 'zoris', 'zorro', 'zouks', 'zowee', 'zowie', 'zulus', 'zupan', 'zupas', 'zuppa', 'zurfs', 'zuzim', 'zygal', 'zygon', 'zymes', 'zymic']));
var $author$project$Words$isValid = function (word) {
	return A2($author$project$Words$arrayContains, word, $author$project$Words$playWords) || A2($author$project$Words$arrayContains, word, $author$project$Words$validWords);
};
var $author$project$Main$wordLength = 5;
var $author$project$Main$update = F2(
	function (msg, model) {
		var _v0 = _Utils_Tuple2(model, msg);
		_v0$7:
		while (true) {
			switch (_v0.b.$) {
				case 'NewGame':
					var _v1 = _v0.b;
					return _Utils_Tuple2(model, $author$project$Main$newGame);
				case 'NewWord':
					if (_v0.b.a.$ === 'Just') {
						var word = _v0.b.a.a;
						return _Utils_Tuple2(
							$author$project$Main$Guessing(
								{goal: word, guesses: _List_Nil, input: '', message: ''}),
							$elm$core$Platform$Cmd$none);
					} else {
						break _v0$7;
					}
				default:
					switch (_v0.a.$) {
						case 'Guessing':
							switch (_v0.b.a) {
								case 'Backspace':
									var data = _v0.a.a;
									var input = data.input;
									return _Utils_Tuple2(
										$author$project$Main$Guessing(
											_Utils_update(
												data,
												{
													input: A2($elm$core$String$dropRight, 1, input),
													message: ''
												})),
										$elm$core$Platform$Cmd$none);
								case 'Enter':
									var data = _v0.a.a;
									var input = data.input;
									var guesses = data.guesses;
									var goal = data.goal;
									var addGuess = _Utils_update(
										data,
										{
											guesses: _Utils_ap(
												guesses,
												_List_fromArray(
													[input])),
											input: '',
											message: ''
										});
									return (_Utils_cmp(
										$elm$core$String$length(input),
										$author$project$Main$wordLength) < 0) ? _Utils_Tuple2(
										$author$project$Main$Guessing(
											_Utils_update(
												data,
												{message: 'That word is not long enough.'})),
										$elm$core$Platform$Cmd$none) : ((!$author$project$Words$isValid(input)) ? _Utils_Tuple2(
										$author$project$Main$Guessing(
											_Utils_update(
												data,
												{message: 'That is not a valid word.'})),
										$elm$core$Platform$Cmd$none) : (_Utils_eq(input, goal) ? _Utils_Tuple2(
										$author$project$Main$Won(addGuess),
										$elm$core$Platform$Cmd$none) : ((_Utils_cmp(
										$elm$core$List$length(guesses),
										$author$project$Main$allowedGuesses - 1) > -1) ? _Utils_Tuple2(
										$author$project$Main$Lost(addGuess),
										$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
										$author$project$Main$Guessing(addGuess),
										$elm$core$Platform$Cmd$none))));
								default:
									var data = _v0.a.a;
									var input = data.input;
									var key = _v0.b.a;
									return ($author$project$Main$isKeyALetter(key) && (_Utils_cmp(
										$elm$core$String$length(input),
										$author$project$Main$wordLength) < 0)) ? _Utils_Tuple2(
										$author$project$Main$Guessing(
											_Utils_update(
												data,
												{
													input: _Utils_ap(input, key),
													message: ''
												})),
										$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
							}
						case 'Won':
							if (_v0.b.a === 'Enter') {
								return _Utils_Tuple2(model, $author$project$Main$newGame);
							} else {
								break _v0$7;
							}
						case 'Lost':
							if (_v0.b.a === 'Enter') {
								return _Utils_Tuple2(model, $author$project$Main$newGame);
							} else {
								break _v0$7;
							}
						default:
							break _v0$7;
					}
			}
		}
		return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	});
var $author$project$Main$classNameForStatus = function (status) {
	switch (status.$) {
		case 'Correct':
			return 'board__tile--correct';
		case 'Present':
			return 'board__tile--present';
		default:
			return 'board__tile--absent';
	}
};
var $author$project$Game$Absent = {$: 'Absent'};
var $author$project$Game$Correct = {$: 'Correct'};
var $author$project$Game$Present = {$: 'Present'};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $elm_community$list_extra$List$Extra$reverseAppend = F2(
	function (list1, list2) {
		return A3($elm$core$List$foldl, $elm$core$List$cons, list2, list1);
	});
var $elm_community$list_extra$List$Extra$removeHelp = F4(
	function (list, x, xs, previousElements) {
		removeHelp:
		while (true) {
			if (!xs.b) {
				return list;
			} else {
				var y = xs.a;
				var ys = xs.b;
				if (_Utils_eq(x, y)) {
					return A2($elm_community$list_extra$List$Extra$reverseAppend, previousElements, ys);
				} else {
					var $temp$list = list,
						$temp$x = x,
						$temp$xs = ys,
						$temp$previousElements = A2($elm$core$List$cons, y, previousElements);
					list = $temp$list;
					x = $temp$x;
					xs = $temp$xs;
					previousElements = $temp$previousElements;
					continue removeHelp;
				}
			}
		}
	});
var $elm_community$list_extra$List$Extra$remove = F2(
	function (x, xs) {
		return A4($elm_community$list_extra$List$Extra$removeHelp, xs, x, xs, _List_Nil);
	});
var $author$project$Game$evaluatePairs = F2(
	function (pairs, lookingFor) {
		if (!pairs.b) {
			return _List_Nil;
		} else {
			var _v1 = pairs.a;
			var expected = _v1.a;
			var actual = _v1.b;
			var rest = pairs.b;
			return _Utils_eq(expected, actual) ? A2(
				$elm$core$List$cons,
				_Utils_Tuple2($author$project$Game$Correct, actual),
				A2($author$project$Game$evaluatePairs, rest, lookingFor)) : (A2($elm$core$List$member, actual, lookingFor) ? A2(
				$elm$core$List$cons,
				_Utils_Tuple2($author$project$Game$Present, actual),
				A2(
					$author$project$Game$evaluatePairs,
					rest,
					A2($elm_community$list_extra$List$Extra$remove, actual, lookingFor))) : A2(
				$elm$core$List$cons,
				_Utils_Tuple2($author$project$Game$Absent, actual),
				A2($author$project$Game$evaluatePairs, rest, lookingFor)));
		}
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $author$project$Game$evaluate = F2(
	function (goal, guess) {
		var letterPairs = A3(
			$elm$core$List$map2,
			$elm$core$Tuple$pair,
			$elm$core$String$toList(goal),
			$elm$core$String$toList(guess));
		var lookingFor = A2(
			$elm$core$List$filterMap,
			function (_v0) {
				var expected = _v0.a;
				var actual = _v0.b;
				return (!_Utils_eq(expected, actual)) ? $elm$core$Maybe$Just(expected) : $elm$core$Maybe$Nothing;
			},
			letterPairs);
		return A2($author$project$Game$evaluatePairs, letterPairs, lookingFor);
	});
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $author$project$Main$board = function (_v0) {
	var goal = _v0.goal;
	var input = _v0.input;
	var guesses = _v0.guesses;
	var tile = function (_v1) {
		var status = _v1.a;
		var _char = _v1.b;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('board__tile'),
					$elm$html$Html$Attributes$class(
					$author$project$Main$classNameForStatus(status))
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					$elm$core$String$fromChar(_char))
				]));
	};
	var row = function (guess) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('board__row')
				]),
			A2(
				$elm$core$List$map,
				tile,
				A2($author$project$Game$evaluate, goal, guess)));
	};
	var inputTile = function (_char) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('board__tile board__tile--input')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					$elm$core$String$fromChar(_char))
				]));
	};
	var inputRow = A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('board__row')
			]),
		_Utils_ap(
			A2(
				$elm$core$List$map,
				inputTile,
				$elm$core$String$toList(input)),
			A2(
				$elm$core$List$repeat,
				$author$project$Main$wordLength - $elm$core$String$length(input),
				inputTile(
					_Utils_chr(' ')))));
	var emptyTile = A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('board__tile board__tile--empty')
			]),
		_List_Nil);
	var emptyRow = A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('board__row')
			]),
		A2($elm$core$List$repeat, $author$project$Main$wordLength, emptyTile));
	var rows = (_Utils_cmp(
		$elm$core$List$length(guesses),
		$author$project$Main$allowedGuesses) < 0) ? _Utils_ap(
		A2($elm$core$List$map, row, guesses),
		A2(
			$elm$core$List$cons,
			inputRow,
			A2(
				$elm$core$List$repeat,
				($author$project$Main$allowedGuesses - $elm$core$List$length(guesses)) - 1,
				emptyRow))) : A2($elm$core$List$map, row, guesses);
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('board')
			]),
		rows);
};
var $author$project$Main$gameOver = function (message) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('message')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(message + ' Press ENTER to start a new game.')
			]));
};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$html$Html$Attributes$classList = function (classes) {
	return $elm$html$Html$Attributes$class(
		A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$elm$core$Tuple$first,
				A2($elm$core$List$filter, $elm$core$Tuple$second, classes))));
};
var $elm_community$html_extra$Html$Attributes$Extra$empty = $elm$html$Html$Attributes$classList(_List_Nil);
var $author$project$Main$keyboard = function (_v0) {
	var goal = _v0.goal;
	var guesses = _v0.guesses;
	var evaluateGuesses = A2(
		$elm$core$List$concatMap,
		function (guess) {
			return A2($author$project$Game$evaluate, goal, guess);
		},
		guesses);
	var statusesForLetter = function (letter) {
		return A2(
			$elm$core$List$filterMap,
			function (_v3) {
				var status = _v3.a;
				var _char = _v3.b;
				return _Utils_eq(_char, letter) ? $elm$core$Maybe$Just(status) : $elm$core$Maybe$Nothing;
			},
			evaluateGuesses);
	};
	var statusForLetter = function (letter) {
		return A2(
			$elm$core$List$any,
			$elm$core$Basics$eq($author$project$Game$Correct),
			statusesForLetter(letter)) ? $elm$core$Maybe$Just($author$project$Game$Correct) : (A2(
			$elm$core$List$any,
			$elm$core$Basics$eq($author$project$Game$Present),
			statusesForLetter(letter)) ? $elm$core$Maybe$Just($author$project$Game$Present) : (A2(
			$elm$core$List$any,
			$elm$core$Basics$eq($author$project$Game$Absent),
			statusesForLetter(letter)) ? $elm$core$Maybe$Just($author$project$Game$Absent) : $elm$core$Maybe$Nothing));
	};
	var key = function (_char) {
		switch (_char.valueOf()) {
			case '+':
				return A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('keyboard__key keyboard__key--one-and-a-half '),
							$elm$html$Html$Events$onClick(
							$author$project$Main$KeyPressed('Enter'))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Enter')
						]));
			case '-':
				return A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('keyboard__key keyboard__key--one-and-a-half '),
							$elm$html$Html$Events$onClick(
							$author$project$Main$KeyPressed('Backspace'))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('⌫')
						]));
			case ' ':
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('keyboard__key keyboard__key--half')
						]),
					_List_Nil);
			default:
				return A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('keyboard__key'),
							function () {
							var _v2 = statusForLetter(_char);
							if (_v2.$ === 'Just') {
								var status = _v2.a;
								return $elm$html$Html$Attributes$class(
									$author$project$Main$classNameForStatus(status));
							} else {
								return $elm_community$html_extra$Html$Attributes$Extra$empty;
							}
						}(),
							$elm$html$Html$Events$onClick(
							$author$project$Main$KeyPressed(
								$elm$core$String$fromChar(_char)))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							$elm$core$String$fromChar(_char))
						]));
		}
	};
	var row = function (string) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('keyboard__row')
				]),
			A2(
				$elm$core$List$map,
				key,
				$elm$core$String$toList(string)));
	};
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('keyboard')
			]),
		A2(
			$elm$core$List$map,
			row,
			_List_fromArray(
				['qwertyuiop', ' asdfghjkl ', '+zxcvbnm-'])));
};
var $author$project$Main$view = function (model) {
	switch (model.$) {
		case 'Loading':
			return $elm$html$Html$text('Loading...');
		case 'Guessing':
			var data = model.a;
			var message = data.message;
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('container')
					]),
				_List_fromArray(
					[
						$author$project$Main$board(data),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('message')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(message)
							])),
						$author$project$Main$keyboard(data)
					]));
		case 'Won':
			var data = model.a;
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('container')
					]),
				_List_fromArray(
					[
						$author$project$Main$board(data),
						$author$project$Main$gameOver('You Won!'),
						$author$project$Main$keyboard(data)
					]));
		default:
			var data = model.a;
			var goal = data.goal;
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('container')
					]),
				_List_fromArray(
					[
						$author$project$Main$board(data),
						$author$project$Main$gameOver('The word was ' + (goal + '.')),
						$author$project$Main$keyboard(data)
					]));
	}
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{init: $author$project$Main$init, subscriptions: $author$project$Main$subscriptions, update: $author$project$Main$update, view: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))({"versions":{"elm":"0.19.1"},"types":{"message":"Main.Msg","aliases":{},"unions":{"Main.Msg":{"args":[],"tags":{"KeyPressed":["String.String"],"NewWord":["Maybe.Maybe String.String"],"NewGame":[]}},"Maybe.Maybe":{"args":["a"],"tags":{"Just":["a"],"Nothing":[]}},"String.String":{"args":[],"tags":{"String":[]}}}}})}});

//////////////////// HMR BEGIN ////////////////////

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Original Author: Flux Xu @fluxxu
*/

/*
    A note about the environment that this code runs in...

    assumed globals:
        - `module` (from Node.js module system and webpack)

    assumed in scope after injection into the Elm IIFE:
        - `scope` (has an 'Elm' property which contains the public Elm API)
        - various functions defined by Elm which we have to hook such as `_Platform_initialize` and `_Scheduler_binding`
 */

if (module.hot) {
    (function () {
        "use strict";

        //polyfill for IE: https://github.com/fluxxu/elm-hot-loader/issues/16
        if (typeof Object.assign != 'function') {
            Object.assign = function (target) {
                'use strict';
                if (target == null) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                target = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    var source = arguments[index];
                    if (source != null) {
                        for (var key in source) {
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }
                }
                return target;
            };
        }

        // Elm 0.19.1 introduced a '$' prefix at the beginning of the symbols it emits,
        // and we check for `Maybe.Just` because we expect it to be present in all Elm programs.
        var elmVersion;
        if (typeof elm$core$Maybe$Just !== 'undefined')
            elmVersion = '0.19.0';
        else if (typeof $elm$core$Maybe$Just !== 'undefined')
            elmVersion = '0.19.1';
        else
            throw new Error("Could not determine Elm version");

        function elmSymbol(symbol) {
            try {
                switch (elmVersion) {
                    case '0.19.0':
                        return eval(symbol);
                    case '0.19.1':
                        return eval('$' + symbol);
                    default:
                        throw new Error('Cannot resolve ' + symbol + '. Elm version unknown!')
                }
            } catch (e) {
                if (e instanceof ReferenceError) {
                    return undefined;
                } else {
                    throw e;
                }
            }
        }

        var instances = module.hot.data
            ? module.hot.data.instances || {}
            : {};
        var uid = module.hot.data
            ? module.hot.data.uid || 0
            : 0;

        if (Object.keys(instances).length === 0) {
            log("[elm-hot] Enabled");
        }

        var cancellers = [];

        // These 2 variables act as dynamically-scoped variables which are set only when the
        // Elm module's hooked init function is called.
        var initializingInstance = null;
        var swappingInstance = null;

        module.hot.accept();
        module.hot.dispose(function (data) {
            data.instances = instances;
            data.uid = uid;

            // Cleanup pending async tasks

            // First, make sure that no new tasks can be started until we finish replacing the code
            _Scheduler_binding = function () {
                return _Scheduler_fail(new Error('[elm-hot] Inactive Elm instance.'))
            };

            // Second, kill pending tasks belonging to the old instance
            if (cancellers.length) {
                log('[elm-hot] Killing ' + cancellers.length + ' running processes...');
                try {
                    cancellers.forEach(function (cancel) {
                        cancel();
                    });
                } catch (e) {
                    console.warn('[elm-hot] Kill process error: ' + e.message);
                }
            }
        });

        function log(message) {
            if (module.hot.verbose) {
                console.log(message)
            }
        }

        function getId() {
            return ++uid;
        }

        function findPublicModules(parent, path) {
            var modules = [];
            for (var key in parent) {
                var child = parent[key];
                var currentPath = path ? path + '.' + key : key;
                if ('init' in child) {
                    modules.push({
                        path: currentPath,
                        module: child
                    });
                } else {
                    modules = modules.concat(findPublicModules(child, currentPath));
                }
            }
            return modules;
        }

        function registerInstance(domNode, flags, path, portSubscribes, portSends) {
            var id = getId();

            var instance = {
                id: id,
                path: path,
                domNode: domNode,
                flags: flags,
                portSubscribes: portSubscribes,
                portSends: portSends,
                lastState: null // last Elm app state (root model)
            };

            return instances[id] = instance
        }

        function isFullscreenApp() {
            // Returns true if the Elm app will take over the entire DOM body.
            return typeof elmSymbol("elm$browser$Browser$application") !== 'undefined'
                || typeof elmSymbol("elm$browser$Browser$document") !== 'undefined';
        }

        function wrapDomNode(node) {
            // When embedding an Elm app into a specific DOM node, Elm will replace the provided
            // DOM node with the Elm app's content. When the Elm app is compiled normally, the
            // original DOM node is reused (its attributes and content changes, but the object
            // in memory remains the same). But when compiled using `--debug`, Elm will completely
            // destroy the original DOM node and instead replace it with 2 brand new nodes: one
            // for your Elm app's content and the other for the Elm debugger UI. In this case,
            // if you held a reference to the DOM node provided for embedding, it would be orphaned
            // after Elm module initialization.
            //
            // So in order to make both cases consistent and isolate us from changes in how Elm
            // does this, we will insert a dummy node to wrap the node for embedding and hold
            // a reference to the dummy node.
            //
            // We will also put a tag on the dummy node so that the Elm developer knows who went
            // behind their back and rudely put stuff in their DOM.
            var dummyNode = document.createElement("div");
            dummyNode.setAttribute("data-elm-hot", "true");
            dummyNode.style.height = "inherit";
            var parentNode = node.parentNode;
            parentNode.replaceChild(dummyNode, node);
            dummyNode.appendChild(node);
            return dummyNode;
        }

        function wrapPublicModule(path, module) {
            var originalInit = module.init;
            if (originalInit) {
                module.init = function (args) {
                    var elm;
                    var portSubscribes = {};
                    var portSends = {};
                    var domNode = null;
                    var flags = null;
                    if (typeof args !== 'undefined') {
                        // normal case
                        domNode = args['node'] && !isFullscreenApp()
                            ? wrapDomNode(args['node'])
                            : document.body;
                        flags = args['flags'];
                    } else {
                        // rare case: Elm allows init to be called without any arguments at all
                        domNode = document.body;
                        flags = undefined
                    }
                    initializingInstance = registerInstance(domNode, flags, path, portSubscribes, portSends);
                    elm = originalInit(args);
                    wrapPorts(elm, portSubscribes, portSends);
                    initializingInstance = null;
                    return elm;
                };
            } else {
                console.error("Could not find a public module to wrap at path " + path)
            }
        }

        function swap(Elm, instance) {
            log('[elm-hot] Hot-swapping module: ' + instance.path);

            swappingInstance = instance;

            // remove from the DOM everything that had been created by the old Elm app
            var containerNode = instance.domNode;
            while (containerNode.lastChild) {
                containerNode.removeChild(containerNode.lastChild);
            }

            var m = getAt(instance.path.split('.'), Elm);
            var elm;
            if (m) {
                // prepare to initialize the new Elm module
                var args = {flags: instance.flags};
                if (containerNode === document.body) {
                    // fullscreen case: no additional args needed
                } else {
                    // embed case: provide a new node for Elm to use
                    var nodeForEmbed = document.createElement("div");
                    containerNode.appendChild(nodeForEmbed);
                    args['node'] = nodeForEmbed;
                }

                elm = m.init(args);

                Object.keys(instance.portSubscribes).forEach(function (portName) {
                    if (portName in elm.ports && 'subscribe' in elm.ports[portName]) {
                        var handlers = instance.portSubscribes[portName];
                        if (!handlers.length) {
                            return;
                        }
                        log('[elm-hot] Reconnect ' + handlers.length + ' handler(s) to port \''
                            + portName + '\' (' + instance.path + ').');
                        handlers.forEach(function (handler) {
                            elm.ports[portName].subscribe(handler);
                        });
                    } else {
                        delete instance.portSubscribes[portName];
                        log('[elm-hot] Port was removed: ' + portName);
                    }
                });

                Object.keys(instance.portSends).forEach(function (portName) {
                    if (portName in elm.ports && 'send' in elm.ports[portName]) {
                        log('[elm-hot] Replace old port send with the new send');
                        instance.portSends[portName] = elm.ports[portName].send;
                    } else {
                        delete instance.portSends[portName];
                        log('[elm-hot] Port was removed: ' + portName);
                    }
                });
            } else {
                log('[elm-hot] Module was removed: ' + instance.path);
            }

            swappingInstance = null;
        }

        function wrapPorts(elm, portSubscribes, portSends) {
            var portNames = Object.keys(elm.ports || {});
            //hook ports
            if (portNames.length) {
                // hook outgoing ports
                portNames
                    .filter(function (name) {
                        return 'subscribe' in elm.ports[name];
                    })
                    .forEach(function (portName) {
                        var port = elm.ports[portName];
                        var subscribe = port.subscribe;
                        var unsubscribe = port.unsubscribe;
                        elm.ports[portName] = Object.assign(port, {
                            subscribe: function (handler) {
                                log('[elm-hot] ports.' + portName + '.subscribe called.');
                                if (!portSubscribes[portName]) {
                                    portSubscribes[portName] = [handler];
                                } else {
                                    //TODO handle subscribing to single handler more than once?
                                    portSubscribes[portName].push(handler);
                                }
                                return subscribe.call(port, handler);
                            },
                            unsubscribe: function (handler) {
                                log('[elm-hot] ports.' + portName + '.unsubscribe called.');
                                var list = portSubscribes[portName];
                                if (list && list.indexOf(handler) !== -1) {
                                    list.splice(list.lastIndexOf(handler), 1);
                                } else {
                                    console.warn('[elm-hot] ports.' + portName + '.unsubscribe: handler not subscribed');
                                }
                                return unsubscribe.call(port, handler);
                            }
                        });
                    });

                // hook incoming ports
                portNames
                    .filter(function (name) {
                        return 'send' in elm.ports[name];
                    })
                    .forEach(function (portName) {
                        var port = elm.ports[portName];
                        portSends[portName] = port.send;
                        elm.ports[portName] = Object.assign(port, {
                            send: function (val) {
                                return portSends[portName].call(port, val);
                            }
                        });
                    });
            }
            return portSubscribes;
        }

        /*
        Breadth-first search for a `Browser.Navigation.Key` in the user's app model.
        Returns the key and keypath or null if not found.
        */
        function findNavKey(rootModel) {
            var queue = [];
            if (isDebuggerModel(rootModel)) {
                /*
                 Extract the user's app model from the Elm Debugger's model. The Elm debugger
                 can hold multiple references to the user's model (e.g. in its "history"). So
                 we must be careful to only search within the "state" part of the Debugger.
                */
                queue.push({value: rootModel['state'], keypath: ['state']});
            } else {
                queue.push({value: rootModel, keypath: []});
            }

            while (queue.length !== 0) {
                var item = queue.shift();

                if (typeof item.value === "undefined" || item.value === null) {
                    continue;
                }

                // The nav key is identified by a runtime tag added by the elm-hot injector.
                if (item.value.hasOwnProperty("elm-hot-nav-key")) {
                    // found it!
                    return item;
                }

                if (typeof item.value !== "object") {
                    continue;
                }

                for (var propName in item.value) {
                    if (!item.value.hasOwnProperty(propName)) continue;
                    var newKeypath = item.keypath.slice();
                    newKeypath.push(propName);
                    queue.push({value: item.value[propName], keypath: newKeypath})
                }
            }

            return null;
        }


        function isDebuggerModel(model) {
            // Up until elm/browser 1.0.2, the Elm debugger could be identified by a
            // property named "expando". But in version 1.0.2 that was renamed to "expandoModel"
            return model
                && (model.hasOwnProperty("expando") || model.hasOwnProperty("expandoModel"))
                && model.hasOwnProperty("state");
        }

        function getAt(keyPath, obj) {
            return keyPath.reduce(function (xs, x) {
                return (xs && xs[x]) ? xs[x] : null
            }, obj)
        }

        function removeNavKeyListeners(navKey) {
            window.removeEventListener('popstate', navKey.value);
            window.navigator.userAgent.indexOf('Trident') < 0 || window.removeEventListener('hashchange', navKey.value);
        }

        // hook program creation
        var initialize = _Platform_initialize;
        _Platform_initialize = function (flagDecoder, args, init, update, subscriptions, stepperBuilder) {
            var instance = initializingInstance || swappingInstance;
            var tryFirstRender = !!swappingInstance;

            var hookedInit = function (args) {
                var initialStateTuple = init(args);
                if (swappingInstance) {
                    var oldModel = swappingInstance.lastState;
                    var newModel = initialStateTuple.a;

                    if (typeof elmSymbol("elm$browser$Browser$application") !== 'undefined') {
                        var oldKeyLoc = findNavKey(oldModel);

                        // attempt to find the Browser.Navigation.Key in the newly-constructed model
                        // and bring it along with the rest of the old data.
                        var newKeyLoc = findNavKey(newModel);
                        var error = null;
                        if (newKeyLoc === null) {
                            error = "could not find Browser.Navigation.Key in the new app model";
                        } else if (oldKeyLoc === null) {
                            error = "could not find Browser.Navigation.Key in the old app model.";
                        } else if (newKeyLoc.keypath.toString() !== oldKeyLoc.keypath.toString()) {
                            error = "the location of the Browser.Navigation.Key in the model has changed.";
                        } else {
                            // remove event listeners attached to the old nav key
                            removeNavKeyListeners(oldKeyLoc.value);

                            // insert the new nav key into the old model in the exact same location
                            var parentKeyPath = oldKeyLoc.keypath.slice(0, -1);
                            var lastSegment = oldKeyLoc.keypath.slice(-1)[0];
                            var oldParent = getAt(parentKeyPath, oldModel);
                            oldParent[lastSegment] = newKeyLoc.value;
                        }

                        if (error !== null) {
                            console.error("[elm-hot] Hot-swapping " + instance.path + " not possible: " + error);
                            oldModel = newModel;
                        }
                    }

                    // the heart of the app state hot-swap
                    initialStateTuple.a = oldModel;

                    // ignore any Cmds returned by the init during hot-swap
                    initialStateTuple.b = elmSymbol("elm$core$Platform$Cmd$none");
                } else {
                    // capture the initial state for later
                    initializingInstance.lastState = initialStateTuple.a;
                }

                return initialStateTuple
            };

            var hookedStepperBuilder = function (sendToApp, model) {
                var result;
                // first render may fail if shape of model changed too much
                if (tryFirstRender) {
                    tryFirstRender = false;
                    try {
                        result = stepperBuilder(sendToApp, model)
                    } catch (e) {
                        throw new Error('[elm-hot] Hot-swapping ' + instance.path +
                            ' is not possible, please reload page. Error: ' + e.message)
                    }
                } else {
                    result = stepperBuilder(sendToApp, model)
                }

                return function (nextModel, isSync) {
                    if (instance) {
                        // capture the state after every step so that later we can restore from it during a hot-swap
                        instance.lastState = nextModel
                    }
                    return result(nextModel, isSync)
                }
            };

            return initialize(flagDecoder, args, hookedInit, update, subscriptions, hookedStepperBuilder)
        };

        // hook process creation
        var originalBinding = _Scheduler_binding;
        _Scheduler_binding = function (originalCallback) {
            return originalBinding(function () {
                // start the scheduled process, which may return a cancellation function.
                var cancel = originalCallback.apply(this, arguments);
                if (cancel) {
                    cancellers.push(cancel);
                    return function () {
                        cancellers.splice(cancellers.indexOf(cancel), 1);
                        return cancel();
                    };
                }
                return cancel;
            });
        };

        scope['_elm_hot_loader_init'] = function (Elm) {
            // swap instances
            var removedInstances = [];
            for (var id in instances) {
                var instance = instances[id];
                if (instance.domNode.parentNode) {
                    swap(Elm, instance);
                } else {
                    removedInstances.push(id);
                }
            }

            removedInstances.forEach(function (id) {
                delete instance[id];
            });

            // wrap all public modules
            var publicModules = findPublicModules(Elm);
            publicModules.forEach(function (m) {
                wrapPublicModule(m.path, m.module);
            });
        }
    })();

    scope['_elm_hot_loader_init'](scope['Elm']);
}
//////////////////// HMR END ////////////////////


}(this));