//! momento.js

; (función (global, fábrica) {
    typeof exports === 'object' && typeof module! == 'undefined'? module.exports = factory ():
    typeof define === 'function' && define.amd? definir (fábrica):
    global.moment = fábrica ()
} (esto, (función () {'uso estricto';

    var hookCallback;

    función de ganchos () {
        return hookCallback.apply (nulo, argumentos);
    }

    // Esto se hace para registrar el método llamado con moment ()
    // sin crear dependencias circulares.
    función setHookCallback (callback) {
        hookCallback = devolución de llamada;
    }

    función isArray (entrada) {
        return input instanceof Array || Object.prototype.toString.call (input) === '[object Array]';
    }

    función isObject (entrada) {
        // IE8 tratará el objeto indefinido y nulo como si no fuera por
        // input! = null
        return input! = null && Object.prototype.toString.call (input) === '[object Object]';
    }

    función isObjectEmpty (obj) {
        if (Object.getOwnPropertyNames) {
            return (Object.getOwnPropertyNames (obj) .length === 0);
        } else {
            var k;
            para (k en obj) {
                if (obj.hasOwnProperty (k)) {
                    falso retorno;
                }
            }
            devuelve verdadero
        }
    }

    función no definida (entrada) {
        entrada de retorno === void 0;
    }

    función isNumber (entrada) {
        devuelve typeof input === 'número' || Object.prototype.toString.call (input) === '[Número de objeto]';
    }

    función isDate (entrada) {
        return input instanceof Fecha || Object.prototype.toString.call (input) === '[fecha del objeto]';
    }

    mapa de funciones (arr, fn) {
        var res = [], i;
        para (i = 0; i <arr.length; ++ i) {
            res.push (fn (arr [i], i));
        }
        volver res;
    }

    función hasOwnProp (a, b) {
        devuelve Object.prototype.hasOwnProperty.call (a, b);
    }

    función de extensión (a, b) {
        para (var i en b) {
            if (hasOwnProp (b, i)) {
                a [i] = b [i];
            }
        }

        if (hasOwnProp (b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp (b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        devuelve un
    }

    función createUTC (entrada, formato, configuración regional, estricto) {
        devuelve createLocalOrUTC (input, format, locale, strict, true) .utc ();
    }

    función defaultParsingFlags () {
        // Necesitamos clonar en profundidad este objeto.
        regreso {
            vacío: falso,
            unusedTokens: [],
            no utilizadoInput: [],
            desbordamiento: -2,
            caracteresLeftOver: 0,
            nullInput: falso,
            inválidoMonth: nulo,
            invalidFormat: false,
            userInvalidated: false,
            iso: falso,
            parsedDateParts: [],
            meridiem: nulo,
            rfc2822: falso,
            día de semana no coincidencia: falso
        };
    }

    función getParsingFlags (m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags ();
        }
        return m._pf;
    }

    var algunos;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Objeto (este);
            var len = t.length >>> 0;

            para (var i = 0; i <len; i ++) {
                if (i in t && fun.call (this, t [i], i, t)) {
                    devuelve verdadero
                }
            }

            falso retorno;
        };
    }

    la función es válida (m) {
        if (m._isValid == null) {
            var flags = getParsingFlags (m);
            var parsedParts = some.call (flags.parsedDateParts, function (i) {
                return i! = null;
            });
            var isNowValid =! isNaN (m._d.getTime ()) &&
                flags.overflow <0 &&
                ! flags.empty &&
                ! flags.invalidMonth &&
                ! flags.invalidWeekday &&
                ! flags.weekdayMismatch &&
                ! flags.nullInput &&
                ! flags.invalidFormat &&
                ! flags.userInvalidated &&
                (! flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid = isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null ||! Object.isFrozen (m)) {
                m._isValid = isNowValid;
            }
            else {
                return isNowValid;
            }
        }
        devuelve m._isValid;
    }

    función createInvalid (flags) {
        var m = createUTC (NaN);
        if (flags! = null) {
            extend (getParsingFlags (m), flags);
        }
        else {
            getParsingFlags (m) .userInvalidated = true;
        }

        volver m;
    }

    // Los complementos que agregan propiedades también deben agregar la clave aquí (valor nulo),
    // para que podamos clonarnos adecuadamente.
    var momentProperties = hooks.momentProperties = [];

    función copyConfig (to, from) {
        var i, prop, val;

        if (! isUndefined (from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        si (! isUndefined (from._i)) {
            to._i = from._i;
        }
        si (! isUndefined (from._f)) {
            to._f = from._f;
        }
        si (! isUndefined (from._l)) {
            to._l = from._l;
        }
        si (! isUndefined (from._strict)) {
            to._strict = from._strict;
        }
        if (! isUndefined (from._tzm)) {
            to._tzm = from._tzm;
        }
        si (! isUndefined (from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (! isUndefined (from._offset)) {
            to._offset = from._offset;
        }
        si (! isUndefined (from._pf)) {
            to._pf = getParsingFlags (from);
        }
        if (! isUndefined (from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length> 0) {
            para (i = 0; i <momentProperties.length; i ++) {
                prop = momentProperties [i];
                val = de [prop];
                si (! isUndefined (val)) {
                    a [prop] = val;
                }
            }
        }

        volver a;
    }

    var updateInProgress = falso;

    // objeto prototipo de momento
    función Momento (config) {
        copyConfig (esto, config);
        this._d = new Date (config._d! = null? config._d.getTime (): NaN);
        if (! this.isValid ()) {
            this._d = nueva fecha (NaN);
        }
        // Prevenir bucle infinito en caso de que updateOffset cree un nuevo momento
        // objetos.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset (esto);
            updateInProgress = falso;
        }
    }

    función isMoment (obj) {
        volver obj instanceof Momento || (obj! = nulo && obj._isAMomentObject! = null);
    }

    función absFloor (número) {
        si (número <0) {
            // -0 -> 0
            volver Math.ceil (número) || 0;
        } else {
            volver Math.floor (número);
        }
    }

    función toInt (argumentForCoercion) {
        var coercedNumber = + argumentForCoercion,
            valor = 0;

        if (coercedNumber! == 0 && isFinite (coercedNumber)) {
            valor = absFloor (coercedNumber);
        }

        valor de retorno;
    }

    // compara dos matrices, devuelve el número de diferencias
    función compareArrays (array1, array2, dontConvert) {
        var len = Math.min (array1.length, array2.length),
            lengthDiff = Math.abs (array1.length - array2.length),
            diffs = 0,
            yo;
        para (i = 0; i <len; i ++) {
            if ((dontConvert && array1 [i]! == array2 [i]) ||
                (! dontConvert && toInt (array1 [i])! == toInt (array2 [i]))) {
                diffs ++;
            }
        }
        return diffs + lengthDiff;
    }

    función advertir (msg) {
        if (hooks.suppressDeprecationWarnings === false &&
                (typeof console! == 'undefined') && console.warn) {
            console.warn ('Advertencia de desaprobación:' + msg);
        }
    }

    función obsoleta (msg, fn) {
        var firstTime = true;

        return extend (function () {
            if (hooks.deprecationHandler! = null) {
                hooks.deprecationHandler (null, msg);
            }
            if (firstTime) {
                var args = [];
                var arg;
                para (var i = 0; i <argumentos.longitud; i ++) {
                    arg = '';
                    si (tipo de argumentos [i] === 'objeto') {
                        arg + = '\ n [' + i + ']';
                        para (clave var en los argumentos [0]) {
                            arg + = clave + ':' + argumentos [0] [clave] + ',';
                        }
                        arg = arg.slice (0, -2); // Eliminar la coma y el espacio al final
                    } else {
                        arg = argumentos [i];
                    }
                    args.push (arg);
                }
                advertir (msg + '\ nArgumentos:' + Array.prototype.slice.call (args) .join ('') + '\ n' + (nuevo Error ()). stack);
                firstTime = falso;
            }
            devuelve fn.apply (esto, argumentos);
        }, fn);
    }

    var deprecations = {};

    función deprecateSimple (nombre, msg) {
        if (hooks.deprecationHandler! = null) {
            hooks.deprecationHandler (nombre, msg);
        }
        if (! deprecations [nombre]) {
            advertir (msg);
            desaprobaciones [nombre] = verdadero;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    función isFunction (entrada) {
        return input instanceof Función || Object.prototype.toString.call (input) === '[object Function]';
    }

    conjunto de funciones (config) {
        var prop, i;
        para (i en config) {
            prop = config [i];
            if (isFunction (prop)) {
                este [i] = prop;
            } else {
                este ['_' + i] = prop;
            }
        }
        this._config = config;
        // El análisis ordinal de Lenient acepta solo un número además de
        // número + (posiblemente) cosas que vienen de _dayOfMonthOrdinalParse.
        // TODO: Elimina el retroceso "ordinalParse" en la próxima versión principal.
        this._dayOfMonthOrdinalParseLenient = new RegExp (
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' + (/\d{1,2}/).source);
    }

    función mergeConfigs (parentConfig, childConfig) {
        var res = extend ({}, parentConfig), prop;
        para (prop en childConfig) {
            if (hasOwnProp (childConfig, prop)) {
                if (isObject (parentConfig [prop]) && isObject (childConfig [prop])) {
                    res [prop] = {};
                    extend (res [prop], parentConfig [prop]);
                    extend (res [prop], childConfig [prop]);
                } else if si (childConfig [prop]! = null) {
                    res [prop] = childConfig [prop];
                } else {
                    eliminar res [prop];
                }
            }
        }
        para (prop en parentConfig) {
            if (hasOwnProp (parentConfig, prop) &&
                    ! hasOwnProp (childConfig, prop) &&
                    isObject (parentConfig [prop])) {
                // asegúrese de que los cambios en las propiedades no modifiquen la configuración principal
                res [prop] = extender ({}, res [prop]);
            }
        }
        volver res;
    }

    función Local (config) {
        if (config! = null) {
            this.set (config);
        }
    }

    teclas var;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        teclas = función (obj) {
            var i, res = [];
            para (i en obj) {
                if (hasOwnProp (obj, i)) {
                    res.push (i);
                }
            }
            volver res;
        };
    }

    var defaultCalendar = {
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        nextWeek: 'dddd [at] LT',
        lastDay: '[Ayer en] LT',
        lastWeek: '[Last] dddd [at] LT',
        sameElse: 'L'
    };

    calendario de funciones (clave, mamá, ahora) {
        var output = this._calendar [key] || this._calendar ['sameElse'];
        devuelve isFunction (salida)? output.call (mamá, ahora): salida;
    }

    var defaultLongDateFormat = {
        LTS: 'h: mm: ss A',
        LT: 'h: mm A',
        L: 'MM / DD / YYYY',
        LL: 'MMMM D, YYYY',
        LLL: 'MMMM D, YYYY h: mm A',
        LLLL: 'dddd, MMMM D, YYYY h: mm A'
    };

    función longDateFormat (clave) {
        var format = this._longDateFormat [clave],
            formatUpper = this._longDateFormat [key.toUpperCase ()];

        if (formato ||! formatUpper) {
            formato de retorno;
        }

        this._longDateFormat [clave] = formatUpper.replace (/ MMMM | MM | DD | dddd / g, función (val) {
            devolver val.slice (1);
        });

        devuelve this._longDateFormat [clave];
    }

    var defaultInvalidDate = 'Fecha no válida';

    function invalidDate () {
        devuelve this._invalidDate;
    }

    var defaultOrdinal = '% d';
    var defaultDayOfMonthOrdinalParse = / \ d {1,2} /;

    función ordinal (número) {
        devuelve this._ordinal.replace ('% d', número);
    }

    var defaultRelativeTime = {
        futuro: 'en% s',
        pasado: '% s hace',
        s: 'unos segundos',
        ss: '% d segundos',
        m: 'un minuto',
        mm: '% d minutos',
        h: 'una hora',
        hh: '% d horas',
        d: 'un día',
        dd: '% d días',
        M: 'un mes',
        MM: '% d meses',
        y: 'un año',
        yy: '% d años'
    };

    function relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime [cadena];
        retorno (isFunction (salida))?
            salida (número, sin Suffix, cadena, isFuture):
            output.replace (/% d / i, número);
    }

    función pastFuture (dif, output) {
        var format = this._relativeTime [diff> 0? 'futuro pasado'];
        volver isFunction (formato)? formato (salida): format.replace (/% s / i, salida);
    }

    alias de var = {};

    función addUnitAlias ??(unidad, taquigrafía) {
        var lowerCase = unit.toLowerCase ();
        alias [lowerCase] ??= alias [lowerCase + 's'] = aliases [taquigrafía] = unidad;
    }

    función normalizeUnits (unidades) {
        devuelve typeof units === 'string'? alias [unidades] || alias [units.toLowerCase ()]: undefined;
    }

    función normalizeObjectUnits (inputObject) {
        var normalizedInput = {},
            normalizadoProp,
            apuntalar;

        para (prop en inputObject) {
            if (hasOwnProp (inputObject, prop)) {
                normalizedProp = normalizeUnits (prop);
                if (normalizedProp) {
                    normalizedInput [normalizedProp] = inputObject [prop];
                }
            }
        }

        return normalizedInput;
    }

    prioridades de var = {};

    función addUnitPriority (unidad, prioridad) {
        prioridades [unidad] = prioridad;
    }

    función getPrioritizedUnits (unitsObj) {
        unidades var = [];
        para (var u en unitsObj) {
            units.push ({unidad: u, prioridad: prioridades [u]});
        }
        units.sort (función (a, b) {
            return a.priority - b.priority;
        });
        unidades de retorno;
    }

    función zeroFill (número, targetLength, forceSign) {
        var absNumber = '' + Math.abs (número),
            zerosToFill = targetLength - absNumber.length,
            signo = número> = 0;
        return (sign? (forceSign? '+': ''): '-') +
            Math.pow (10, Math.max (0, zerosToFill)). ToString (). Substr (1) + absNumber;
    }

    var formattingTokens = / (\ [[^ \ [] * \]) | (\\)? ([Hh] mm (ss)? | Mo | MM? M? M? | Do | DDDo | DD? D? D ? | ddd? d? | do? | w [o | w]? | W [o | W]? | Qo? | YYYYYY | YYYYY | YYYY | YY | gg (ggg?)? | GG (GGG?)? | e | E | a | A | hh? | HH? | kk? | mm? | ss? | S {1,9} | x | X | zz? | ZZ? |.)) / g;

    var localFormattingTokens = / (\ [[^ \ [] * \]) | (\\)? (LTS | LT | LL? L? L? | l {1,4}) / g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token: 'M'
    // rellenado: ['MM', 2]
    // ordinal: 'Mo'
    // devolución de llamada: function () {this.month () + 1}
    función addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                devuelve este [callback] ();
            };
        }
        if (token) {
            formatTokenFunctions [token] = func;
        }
        if (rellenado) {
            formatTokenFunctions [padded [0]] = function () {
                devuelve zeroFill (func.apply (this, argumentos), padded [1], padded [2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions [ordinal] = function () {
                devuelve this.localeData (). ordinal (func.apply (this, argumentos), token);
            };
        }
    }

    función removeFormattingTokens (entrada) {
        if (input.match (/ \ [[\ s \ S] /)) {
            devolver input.replace (/ ^ \ [| \] $ / g, '');
        }
        devuelve input.replace (/ \\ / g, '');
    }

    función makeFormatFunction (formato) {
        var array = format.match (formattingTokens), i, length;

        para (i = 0, longitud = array.length; i <longitud; i ++) {
            if (formatTokenFunctions [array [i]]) {
                array [i] = formatTokenFunctions [array [i]];
            } else {
                array [i] = removeFormattingTokens (array [i]);
            }
        }

        función de retorno (mamá) {
            var output = '', i;
            para (i = 0; i <longitud; i ++) {
                salida + = isFunction (array [i])? array [i] .call (mom, format): array [i];
            }
            retorno de salida;
        };
    }

    // formato de fecha usando el objeto de fecha nativo
    función formatMoment (m, format) {
        si (! m.isValid ()) {
            devuelve m.localeData (). invalidDate ();
        }

        format = expandFormat (format, m.localeData ());
        formatFunctions [format] = formatFunctions [format] || makeFormatFunction (formato);

        formato de retornoFunciones [formato] (m);
    }

    función expandFormat (formato, configuración regional) {
        var i = 5;

        función replaceLongDateFormatTokens (entrada) {
            return locale.longDateFormat (input) || entrada;
        }

        localFormattingTokens.lastIndex = 0;
        while (i> = 0 && localFormattingTokens.test (formato)) {
            format = format.replace (localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i - = 1;
        }

        formato de retorno;
    }

    var match1 = / \ d /; // 0 - 9
    var match2 = / \ d \ d /; // 00 - 99
    var match3 = / \ d {3} /; // 000 - 999
    var match4 = / \ d {4} /; // 0000 - 9999
    var match6 = / [+ -]? \ d {6} /; // -999999 - 999999
    var match1to2 = / \ d \ d? /; // 0 - 99
    var match3to4 = / \ d \ d \ d \ d? /; // 999 - 9999
    var match5to6 = / \ d \ d \ d \ d \ d \ d? /; // 99999 - 999999
    var match1to3 = / \ d {1,3} /; // 0 - 999
    var match1to4 = / \ d {1,4} /; // 0 - 9999
    var match1to6 = / [+ -]? \ d {1,6} /; // -999999 - 999999

    var matchUnsigned = / \ d + /; // 0 - inf
    var matchSigned = / [+ -]? \ d + /; // -inf - inf

    var matchOffset = / Z | [+ -] \ d \ d:? \ d \ d / gi; // +00: 00 -00: 00 +0000 -0000 o Z
    var matchShortOffset = / Z | [+ -] \ d \ d (? ::? \ d \ d)? / gi; // +00 -00 +00: 00 -00: 00 +0000 -0000 o Z

    var matchTimestamp = /[+-??\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // cualquier palabra (o dos) caracteres o números, incluyendo dos / tres palabras al mes en árabe.
    // Incluye escocés gaélico de dos palabras y meses con guiones.
    var matchWord = / [0-9] {0,256} ['az \ u00A0- \ u05FF \ u0700- \ uD7FF \ uF900- \ uFDCF \ uFDF0- \ uFF07 \ uFF10- \ uFFEF] {1,256} | [\ u0600- \ u06FF \ /] {1,256} (\ s *? [\ u0600- \ u06FF] {1,256}) {1,2} / i;

    var regexes = {};

    función addRegexToken (token, regex, strictRegex) {
        regexes [token] = isFunction (regex)? regex: function (isStrict, localeData) {
            devolución (isStrict && strictRegex)? strictRegex: regex;
        };
    }

    función getParseRegexForToken (token, config) {
        if (! hasOwnProp (regexes, token)) {
            devolver nuevo RegExp (unescapeFormat (token));
        }

        devuelve regexes [token] (config._strict, config._locale);
    }

    // Código de http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    función unescapeFormat (s) {
        devolver regexEscape (s.replace ('\\', '') .replace (/ \\ (\ [) | \\ (\]) | \ [([^ \] \ [] *) \] | \\ (.) / g, función (emparejado, p1, p2, p3, p4) {
            volver p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape (s) {
        devuelva s.replace (/ [- \ / \\ ^ $ * + ?. () | [\] {}] / g, '\\ $ &');
    }

    var tokens = {};

    función addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (esNúmero (devolución de llamada)) {
            func = function (input, array) {
                array [callback] = toInt (entrada);
            };
        }
        para (i = 0; i <token.length; i ++) {
            fichas [ficha [i]] = func;
        }
    }

    función addWeekParseToken (token, callback) {
        addParseToken (token, función (entrada, matriz, configuración, token) {
            config._w = config._w || {};
            devolución de llamada (entrada, config._w, config, token);
        });
    }

    función addTimeToArrayFromToken (token, input, config) {
        if (input! = null && hasOwnProp (tokens, token)) {
            tokens [token] (input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MES = 1;
    var FECHA = 2;
    var HORA = 3;
    var MINUTO = 4;
    var SEGUNDO = 5;
    var MILLISECOND = 6;
    var SEMANA = 7;
    var WEEKDAY = 8;

    // FORMATEANDO

    addFormatToken ('Y', 0, 0, function () {
        var y = this.year ();
        devuelve y <= 9999? '' + y: '+' + y;
    });

    addFormatToken (0, ['YY', 2], 0, function () {
        devuelve this.year ()% 100;
    });

    addFormatToken (0, ['YYYY', 4], 0, 'year');
    addFormatToken (0, ['YYYYY', 5], 0, 'year');
    addFormatToken (0, ['YYYYYY', 6, true], 0, 'year');

    // ALIAS

    addUnitAlias ??('year', 'y');

    // PRIORIDADES

    addUnitPriority ('año', 1);

    // PARSING

    addRegexToken ('Y', matchSigned);
    addRegexToken ('YY', match1to2, match2);
    addRegexToken ('YYYY', match1to4, match4);
    addRegexToken ('YYYYY', match1to6, match6);
    addRegexToken ('YYYYYY', match1to6, match6);

    addParseToken (['YYYYY', 'YYYYYY'], YEAR);
    addParseToken ('YYYY', función (entrada, matriz) {
        array [YEAR] = input.length === 2? hooks.parseTwoDigitYear (entrada): toInt (entrada);
    });
    addParseToken ('YY', función (entrada, matriz) {
        array [YEAR] = hooks.parseTwoDigitYear (entrada);
    });
    addParseToken ('Y', función (entrada, matriz) {
        array [YEAR] = parseInt (entrada, 10);
    });

    // ayudantes

    función daysInYear (año) {
        volver ispare año (año)? 366: 365;
    }

    función iseapper (año) {
        retorno (año% 4 === 0 && año% 100! == 0) || año% 400 === 0;
    }

    // GANCHOS

    hooks.parseTwoDigitYear = function (input) {
        regresar a Entrada (entrada) + (a Entrada (entrada)> 68? 1900: 2000);
    };

    // MOMENTOS

    var getSetYear = makeGetSet ('FullYear', true);

    función getIsLeapYear () {
        return isLeapYear (this.year ());
    }

    función makeGetSet (unit, keepTime) {
        función de retorno (valor) {
            si (valor! = nulo) {
                establecer $ 1 (esto, unidad, valor);
                hooks.updateOffset (this, keepTime);
                devuelve esto
            } else {
                retorno obtener (esto, unidad);
            }
        };
    }

    función obtener (mamá, unidad) {
        regresa mom.isValid ()?
            mom._d ['get' + (mom._isUTC? 'UTC': '') + unit] (): NaN;
    }

    conjunto de funciones $ 1 (mamá, unidad, valor) {
        if (mom.isValid () &&! isNaN (value)) {
            if (unit === 'FullYear' && isLeapYear (mom.year ()) && mom.month () === 1 && mom.date () === 29) {
                mom._d ['set' + (mom._isUTC? 'UTC': '') + unit] (value, mom.month (), daysInMonth (value, mom.month ()));
            }
            else {
                mom._d ['set' + (mom._isUTC? 'UTC': '') + unit] (value);
            }
        }
    }

    // MOMENTOS

    función stringGet (unidades) {
        unidades = unidades normalizadas (unidades);
        if (isFunction (this [units])) {
            devuelve este [unidades] ();
        }
        devuelve esto
    }


    función stringSet (unidades, valor) {
        si (tipo de unidades === 'objeto') {
            units = normalizeObjectUnits (units);
            var dio prioridad = getPrioritizedUnits (unidades);
            para (var i = 0; i <Prioridad.longitud; i ++) {
                esta [prioridad [i] .unit] (unidades [prioridad [i] .unit]);
            }
        } else {
            unidades = unidades normalizadas (unidades);
            if (isFunction (this [units])) {
                devuelve este [unidades] (valor);
            }
        }
        devuelve esto
    }

    función mod (n, x) {
        retorno ((n% x) + x)% x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = función (o) {
            // Lo sé
            var i;
            para (i = 0; i <this.length; ++ i) {
                si (esto [i] === o) {
                    regreso i;
                }
            }
            devuelve -1;
        };
    }

    función daysInMonth (año, mes) {
        si (esNaN (año) || esNaN (mes)) {
            devuelve NaN;
        }
        var modMonth = mod (mes, 12);
        año + = (mes - modMonth) / 12;
        devuelve modMonth === 1? (isLeapYear (year)? 29: 28): (31 - modMonth% 7% 2);
    }

    // FORMATEANDO

    addFormatToken ('M', ['MM', 2], 'Mo', function () {
        devuelve this.month () + 1;
    });

    addFormatToken ('MMM', 0, 0, función (formato) {
        devuelve this.localeData (). monthsShort (this, format);
    });

    addFormatToken ('MMMM', 0, 0, función (formato) {
        devuelve this.localeData (). months (this, format);
    });

    // ALIAS

    addUnitAlias ??('month', 'M');

    // PRIORIDAD

    addUnitPriority ('month', 8);

    // PARSING

    addRegexToken ('M', match1to2);
    addRegexToken ('MM', match1to2, match2);
    addRegexToken ('MMM', función (isStrict, locale) {
        return locale.monthsShortRegex (isStrict);
    });
    addRegexToken ('MMMM', función (isStrict, locale) {
        return locale.monthsRegex (isStrict);
    });

    addParseToken (['M', 'MM'], función (entrada, matriz) {
        array [MONTH] = toInt (entrada) - 1;
    });

    addParseToken (['MMM', 'MMMM'], función (entrada, matriz, configuración, token) {
        var month = config._locale.monthsParse (input, token, config._strict);
        // Si no encontramos un nombre de mes, marque la fecha como no válida.
        si (mes! = nulo) {
            array [MES] = mes;
        } else {
            getParsingFlags (config) .invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = / D [oD]? (\ [[^ \ [\]] * \] | \ s) + MMMM? /;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split (' _ ');
    función localeMonths (m, formato) {
        si (! m) {
            devuelve isArray (this._months)? esto._months:
                this._months ['standalone'];
        }
        devuelve isArray (this._months)? this._months [m.month ()]:
            this._months [(this._months.isFormat || MONTHS_IN_FORMAT) .test (formato)? 'formato': 'independiente'] [m.month ()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Aug_Sep_Oct_Nov_Dec'.split (' _ ');
    función localeMonthsShort (m, formato) {
        si (! m) {
            devuelve isArray (this._monthsShort)? this._monthsShort:
                this._monthsShort ['standalone'];
        }
        devuelve isArray (this._monthsShort)? this._monthsShort [m.month ()]:
            this._monthsShort [MONTHS_IN_FORMAT.test (formato)? 'formato': 'independiente'] [m.month ()];
    }

    function handleStrictParse (monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase ();
        if (! this._monthsParse) {
            // esto no se usa
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            para (i = 0; i <12; ++ i) {
                mom = createUTC ([2000, i]);
                this._shortMonthsParse [i] = this.monthsShort (mom, '') .toLocaleLowerCase ();
                this._longMonthsParse [i] = this.months (mom, '') .toLocaleLowerCase ();
            }
        }

        si (estricto) {
            si (formato === 'MMM') {
                ii = indexOf.call (this._shortMonthsParse, llc);
                devuelve ii! == -1? ii: nulo;
            } else {
                ii = indexOf.call (this._longMonthsParse, llc);
                devuelve ii! == -1? ii: nulo;
            }
        } else {
            si (formato === 'MMM') {
                ii = indexOf.call (this._shortMonthsParse, llc);
                si (ii! == -1) {
                    retorno ii;
                }
                ii = indexOf.call (this._longMonthsParse, llc);
                devuelve ii! == -1? ii: nulo;
            } else {
                ii = indexOf.call (this._longMonthsParse, llc);
                si (ii! == -1) {
                    retorno ii;
                }
                ii = indexOf.call (this._shortMonthsParse, llc);
                devuelve ii! == -1? ii: nulo;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call (this, monthName, format, strict);
        }

        if (! this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: agregar clasificación
        // La clasificación se asegura de que un mes (o abbr) sea el prefijo de otro
        // ver clasificación en computeMonthsParse
        para (i = 0; i <12; i ++) {
            // haz la expresión regular si no la tenemos ya
            mom = createUTC ([2000, i]);
            if (strict &&! this._longMonthsParse [i]) {
                this._longMonthsParse [i] = new RegExp ('^' + this.months (mom, '') .replace ('.', '') + '$', 'i');
                this._shortMonthsParse [i] = new RegExp ('^' + this.monthsShort (mom, '') .replace ('.', '') + '$', 'i');
            }
            if (! strict &&! this._monthsParse [i]) {
                regex = '^' + this.months (mom, '') + '| ^' + this.monthsShort (mom, '');
                this._monthsParse [i] = new RegExp (regex.replace ('.', ''), 'i');
            }
            // prueba la expresión regular
            if (estricto && formato === 'MMMM' && this._longMonthsParse [i] .test (monthName)) {
                regreso i;
            } else if (estricto && formato === 'MMM' && this._shortMonthsParse [i] .test (monthName)) {
                regreso i;
            } else if (! strict && this._monthsParse [i] .test (monthName)) {
                regreso i;
            }
        }
    }

    // MOMENTOS

    función setMonth (mamá, valor) {
        var dayOfMonth;

        if (! mom.isValid ()) {
            // No op
            regresa mamá
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt (value);
            } else {
                value = mom.localeData (). monthsParse (value);
                // TODO: ¿Otro fallo silencioso?
                if (! isNumber (valor)) {
                    regresa mamá
                }
            }
        }

        dayOfMonth = Math.min (mom.date (), daysInMonth (mom.year (), value));
        mom._d ['set' + (mom._isUTC? 'UTC': '') + 'Month'] (value, dayOfMonth);
        regresa mamá
    }

    función getSetMonth (valor) {
        si (valor! = nulo) {
            setMonth (este, valor);
            hooks.updateOffset (this, true);
            devuelve esto
        } else {
            retorno obtener (esto, 'Mes');
        }
    }

    función getDaysInMonth () {
        devuelve daysInMonth (this.year (), this.month ());
    }

    var defaultMonthsShortRegex = matchWord;
    función monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (! hasOwnProp (this, '_monthsRegex')) {
                computeMonthsParse.call (this);
            }
            if (isStrict) {
                devuelve this._monthsShortStrictRegex;
            } else {
                devuelve this._monthsShortRegex;
            }
        } else {
            if (! hasOwnProp (this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            devuelve this._monthsShortStrictRegex && isStrict?
                this._monthsShortStrictRegex: this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    función monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (! hasOwnProp (this, '_monthsRegex')) {
                computeMonthsParse.call (this);
            }
            if (isStrict) {
                devuelve this._monthsStrictRegex;
            } else {
                devuelve this._monthsRegex;
            }
        } else {
            if (! hasOwnProp (this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            devuelve this._monthsStrictRegex && isStrict?
                this._monthsStrictRegex: this._monthsRegex;
        }
    }

    función computeMonthsParse () {
        función cmpLenRev (a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            soy madre;
        para (i = 0; i <12; i ++) {
            // haz la expresión regular si no la tenemos ya
            mom = createUTC ([2000, i]);
            shortPieces.push (this.monthsShort (mom, ''));
            longPieces.push (this.months (mamá, ''));
            mixedPieces.push (this.months (mamá, ''));
            mixedPieces.push (this.monthsShort (mom, ''));
        }
        // La clasificación se asegura de que si un mes (o abbr) es un prefijo de otro es
        // coincidirá con la pieza más larga.
        shortPieces.sort (cmpLenRev);
        longPieces.sort (cmpLenRev);
        mixedPieces.sort (cmpLenRev);
        para (i = 0; i <12; i ++) {
            shortPieces [i] = regexEscape (shortPieces [i]);
            LongPieces [i] = regexEscape (longPieces [i]);
        }
        para (i = 0; i <24; i ++) {
            Piezas mezcladas [i] = regexEscape (Piezas mezcladas [i]);
        }

        this._monthsRegex = new RegExp ('^ (' + mixedPieces.join ('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp ('^ (' + longPieces.join ('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp ('^ (' + shortPieces.join ('|') + ')', 'i');
    }

    función createDate (y, m, d, h, M, s, ms) {
        // no puedo simplemente aplicar () para crear una fecha:
        // https://stackoverflow.com/q/181348
        fecha de var
        // el constructor de fecha remapsea los años 0-99 a 1900-1999
        si (y <100 && y> = 0) {
            // preservar los años bisiestos utilizando un ciclo completo de 400 años, luego reiniciar
            fecha = nueva Fecha (y + 400, m, d, h, M, s, ms);
            if (isFinite (date.getFullYear ())) {
                date.setFullYear (y);
            }
        } else {
            fecha = nueva Fecha (y, m, d, h, M, s, ms);
        }

        Fecha de regreso;
    }

    función createUTCDate (y) {
        fecha de var
        // la función Date.UTC remapsea los años 0-99 a 1900-1999
        si (y <100 && y> = 0) {
            var args = Array.prototype.slice.call (argumentos);
            // preservar los años bisiestos utilizando un ciclo completo de 400 años, luego reiniciar
            args [0] = y + 400;
            date = new Date (Date.UTC.apply (null, args));
            if (isFinite (date.getUTCFullYear ())) {
                date.setUTCFullYear (y);
            }
        } else {
            date = new Date (Date.UTC.apply (null, argumentos));
        }

        Fecha de regreso;
    }

    // inicio de la primera semana - inicio del año
    function firstWeekOffset (year, dow, doy) {
        var // día de la primera semana, que enero siempre está en la primera semana (4 para iso, 1 para otro)
            fwd = 7 + dow - doy,
            // día laborable local del primer día de la semana - el día laborable local es fwd
            fwdlw = (7 + createUTCDate (año, 0, fwd) .getUTCDay () - dow)% 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    función dayOfYearFromWeeks (año, semana, día de la semana, dow, doy) {
        var localWeekday = (7 + día de la semana - dow)% 7,
            weekOffset = firstWeekOffset (year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            año = año - 1;
            resDayOfYear = daysInYear (resYear) + dayOfYear;
        } else if (dayOfYear> daysInYear (año)) {
            año = año + 1;
            resDayOfYear = dayOfYear - daysInYear (año);
        } else {
            año = año;
            resDayOfYear = dayOfYear;
        }

        regreso {
            año: año,
            dayOfYear: resDayOfYear
        };
    }

    función weekOfYear (mamá, dow, doy) {
        var weekOffset = firstWeekOffset (mom.year (), dow, doy),
            week = Math.floor ((mom.dayOfYear () - weekOffset - 1) / 7) + 1,
            ResWeek, resYear;

        si (semana <1) {
            resYear = mom.year () - 1;
            resWeek = week + weeksInYear (resYear, dow, doy);
        } else if (week> weeksInYear (mom.year (), dow, doy)) {
            resWeek = week - weeksInYear (mom.year (), dow, doy);
            resYear = mom.year () + 1;
        } else {
            resYear = mom.year ();
            resWeek = semana;
        }

        regreso {
            semana: semana de la semana,
            año: resYear
        };
    }

    función weeksInYear (año, dow, doy) {
        var weekOffset = firstWeekOffset (year, dow, doy),
            weekOffsetNext = firstWeekOffset (year + 1, dow, doy);
        return (daysInYear (year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATEANDO

    addFormatToken ('w', ['ww', 2], 'wo', 'week');
    addFormatToken ('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIAS

    addUnitAlias ??('week', 'w');
    addUnitAlias ??('isoWeek', 'W');

    // PRIORIDADES

    addUnitPriority ('semana', 5);
    addUnitPriority ('isoWeek', 5);

    // PARSING

    addRegexToken ('w', match1to2);
    addRegexToken ('ww', match1to2, match2);
    addRegexToken ('W', match1to2);
    addRegexToken ('WW', match1to2, match2);

    addWeekParseToken (['w', 'ww', 'W', 'WW'], función (entrada, semana, config, token) {
        semana [token.substr (0, 1)] = toInt (entrada);
    });

    // ayudantes

    // LOCALES

    función localeWeek (mamá) {
        return weekOfYear (mom, this._week.dow, this._week.doy) .week;
    }

    var defaultLocaleWeek = {
        dow: 0, // el domingo es el primer día de la semana.
        doy: 6 // La semana que contiene el 6 de enero es la primera semana del año.
    };

    función localeFirstDayOfWeek () {
        devuelve this._week.dow;
    }

    function localeFirstDayOfYear () {
        devuelve this._week.doy;
    }

    // MOMENTOS

    función getSetWeek (entrada) {
        var week = this.localeData (). week (this);
        retorno de entrada == nulo? semana: this.add ((input - week) * 7, 'd');
    }

    función getSetISOWeek (entrada) {
        var week = weekOfYear (this, 1, 4) .week;
        retorno de entrada == nulo? semana: this.add ((input - week) * 7, 'd');
    }

    // FORMATEANDO

    addFormatToken ('d', 0, 'do', 'día');

    addFormatToken ('dd', 0, 0, función (formato) {
        devuelve this.localeData (). weekdaysMin (this, format);
    });

    addFormatToken ('ddd', 0, 0, función (formato) {
        devuelve this.localeData (). weekdaysShort (this, format);
    });

    addFormatToken ('dddd', 0, 0, función (formato) {
        devuelve this.localeData (). weekdays (this, format);
    });

    addFormatToken ('e', 0, 0, 'laborable');
    addFormatToken ('E', 0, 0, 'isoWeekday');

    // ALIAS

    addUnitAlias ??('day', 'd');
    addUnitAlias ??('laborable', 'e');
    addUnitAlias ??('isoWeekday', 'E');

    // PRIORIDAD
    addUnitPriority ('day', 11);
    addUnitPriority ('día de la semana', 11);
    addUnitPriority ('isoWeekday', 11);

    // PARSING

    addRegexToken ('d', match1to2);
    addRegexToken ('e', match1to2);
    addRegexToken ('E', match1to2);
    addRegexToken ('dd', function (isStrict, locale) {
        return locale.weekdaysMinRegex (isStrict);
    });
    addRegexToken ('ddd', function (isStrict, locale) {
        return locale.weekdaysShortRegex (isStrict);
    });
    addRegexToken ('dddd', function (isStrict, locale) {
        return locale.weekdaysRegex (isStrict);
    });

    addWeekParseToken (['dd', 'ddd', 'dddd'], función (entrada, semana, config, token) {
        var weekend = config._locale.weekdaysParse (input, token, config._strict);
        // si no obtuvimos un nombre de día de la semana, marque la fecha como no válida
        if (día de la semana! = nulo) {
            semana.d = día laborable;
        } else {
            getParsingFlags (config) .invalidWeekday = input;
        }
    });

    addWeekParseToken (['d', 'e', ??'E'], función (entrada, semana, configuración, token) {
        semana [token] = toInt (entrada);
    });

    // ayudantes

    función pareWeekday (entrada, configuración regional) {
        if (typeof input! == 'string') {
            entrada de retorno;
        }

        si (! isNaN (entrada)) {
            devuelve parseInt (entrada, 10);
        }

        input = locale.weekdaysParse (input);
        si (tipo de entrada === 'número') {
            entrada de retorno;
        }

        retorno nulo
    }

    función parseIsoWeekday (entrada, configuración regional) {
        if (typeof input === 'string') {
            return locale.weekdaysParse (entrada)% 7 || 7;
        }
        devuelve isNaN (entrada)? nulo: entrada;
    }

    // LOCALES
    función shiftWeekdays (ws, n) {
        devuelva ws.slice (n, 7) .concat (ws.slice (0, n));
    }

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split (' _ ');
    función localeWeekdays (m, formato) {
        var weekdays = isArray (this._weekdays)? esto._weekdays:
            this._weekdays [(m && m! == true && this._weekdays.isFormat.test (formato))? 'formato': 'independiente'];
        retorno (m === verdadero)? ShiftWeekdays (weekdays, this._week.dow)
            : (m)? días de la semana [m.day ()]: weekdays;
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split (' _ ');
    función localeWeekdaysShort (m) {
        retorno (m === verdadero)? ShiftWeekdays (this._weekdaysShort, this._week.dow)
            : (m)? this._weekdaysShort [m.day ()]: this._weekdaysShort;
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split (' _ ');
    función localeWeekdaysMin (m) {
        retorno (m === verdadero)? ShiftWeekdays (this._weekdaysMin, this._week.dow)
            : (m)? this._weekdaysMin [m.day ()]: this._weekdaysMin;
    }

    function handleStrictParse $ 1 (día laborable, formato, estricto) {
        var i, ii, mom, llc = weekendName.toLocaleLowerCase ();
        if (! this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            para (i = 0; i <7; ++ i) {
                mom = createUTC ([2000, 1]). day (i);
                this._minWeekdaysParse [i] = this.weekdaysMin (mom, '') .toLocaleLowerCase ();
                this._shortWeekdaysParse [i] = this.weekdaysShort (mom, '') .toLocaleLowerCase ();
                this._weekdaysParse [i] = this.weekdays (mamá, '') .toLocaleLowerCase ();
            }
        }

        si (estricto) {
            si (formato === 'dddd') {
                ii = indexOf.call (this._weekdaysParse, llc);
                devuelve ii! == -1? ii: nulo;
            } else if (formato === 'ddd') {
                ii = indexOf.call (this._shortWeekdaysParse, llc);
                devuelve ii! == -1? ii: nulo;
            } else {
                ii = indexOf.call (this._minWeekdaysParse, llc);
                devuelve ii! == -1? ii: nulo;
            }
        } else {
            si (formato === 'dddd') {
                ii = indexOf.call (this._weekdaysParse, llc);
                si (ii! == -1) {
                    retorno ii;
                }
                ii = indexOf.call (this._shortWeekdaysParse, llc);
                si (ii! == -1) {
                    retorno ii;
                }
                ii = indexOf.call (this._minWeekdaysParse, llc);
                devuelve ii! == -1? ii: nulo;
            } else if (formato === 'ddd') {
                ii = indexOf.call (this._shortWeekdaysParse, llc);
                si (ii! == -1) {
                    retorno ii;
                }
                ii = indexOf.call (this._weekdaysParse, llc);
                si (ii! == -1) {
                    retorno ii;
                }
                ii = indexOf.call (this._minWeekdaysParse, llc);
                devuelve ii! == -1? ii: nulo;
            } else {
                ii = indexOf.call (this._minWeekdaysParse, llc);
                si (ii! == -1) {
                    retorno ii;
                }
                ii = indexOf.call (this._weekdaysParse, llc);
                si (ii! == -1) {
                    retorno ii;
                }
                ii = indexOf.call (this._shortWeekdaysParse, llc);
                devuelve ii! == -1? ii: nulo;
            }
        }
    }

    function localeWeekdaysParse (día laborable, formato, estricto) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse $ 1.call (este, día de la semana, formato, estricto);
        }

        if (! this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        para (i = 0; i <7; i ++) {
            // haz la expresión regular si no la tenemos ya

            mom = createUTC ([2000, 1]). day (i);
            if (strict &&! this._fullWeekdaysParse [i]) {
                this._fullWeekdaysParse [i] = new RegExp ('^' + this.weekdays (mamá, '') .replace ('.', '\\.?') + '$', 'i');
                this._shortWeekdaysParse [i] = new RegExp ('^' + this.weekdaysShort (mom, '') .replace ('.', '\\.?)) +' $ ',' i ');
                this._minWeekdaysParse [i] = new RegExp ('^' + this.weekdaysMin (mamá, '') .replace ('.', '\\.?') + '$', 'i');
            }
            if (! this._weekdaysParse [i]) {
                regex = '^' + this.weekdays (mamá, '') + '| ^' + this.weekdaysShort (mamá, '') + '| ^' + this.weekdaysMin (mamá, '');
                this._weekdaysParse [i] = new RegExp (regex.replace ('.', ''), 'i');
            }
            // prueba la expresión regular
            if (estricto && formato === 'dddd' && this._fullWeekdaysParse [i] .test (weekendName)) {
                regreso i;
            } else if (estricto && formato === 'ddd' && this._shortWeekdaysParse [i] .test (weekendName)) {
                regreso i;
            } else if (estricto && formato === 'dd' && this._minWeekdaysParse [i] .test (weekendName)) {
                regreso i;
            } else if (! strict && this._weekdaysParse [i] .test (weekendName)) {
                regreso i;
            }
        }
    }

    // MOMENTOS

    función getSetDayOfWeek (entrada) {
        if (! this.isValid ()) {
            entrada de retorno! = null? esto: NaN;
        }
        var day = this._isUTC? this._d.getUTCDay (): this._d.getDay ();
        if (input! = null) {
            input = parseWeekday (input, this.localeData ());
            devuelve this.add (input - day, 'd');
        } else {
            dia de regreso
        }
    }

    función getSetLocaleDayOfWeek (entrada) {
        if (! this.isValid ()) {
            entrada de retorno! = null? esto: NaN;
        }
        var weekend = (this.day () + 7 - this.localeData () ._ week.dow)% 7;
        retorno de entrada == nulo? día de la semana: this.add (entrada - día de la semana, 'd');
    }

    función getSetISODayOfWeek (entrada) {
        if (! this.isValid ()) {
            entrada de retorno! = null? esto: NaN;
        }

        // se comporta igual que el momento # día excepto
        // como captador, devuelve 7 en lugar de 0 (rango 1-7 en lugar de 0-6)
        // como definidor, el domingo debe pertenecer a la semana anterior.

        if (input! = null) {
            var weekend = parseIsoWeekday (input, this.localeData ());
            devuelva this.day (this.day ()% 7? laborable: día laborable - 7);
        } else {
            devuelve this.day () || 7;
        }
    }

    var defaultWeekdaysRegex = matchWord;
    función weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (! hasOwnProp (this, '_weekdaysRegex')) {
                computeWeekdaysParse.call (this);
            }
            if (isStrict) {
                devuelve this._weekdaysStrictRegex;
            } else {
                devuelve this._weekdaysRegex;
            }
        } else {
            if (! hasOwnProp (this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            devuelve this._weekdaysStrictRegex && isStrict?
                this._weekdaysStrictRegex: this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    función weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (! hasOwnProp (this, '_weekdaysRegex')) {
                computeWeekdaysParse.call (this);
            }
            if (isStrict) {
                devuelve this._weekdaysShortStrictRegex;
            } else {
                devuelve this._weekdaysShortRegex;
            }
        } else {
            if (! hasOwnProp (this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            devuelve esto._semanalesShortStrictRegex && isStrict?
                this._weekdaysShortStrictRegex: this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    función weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (! hasOwnProp (this, '_weekdaysRegex')) {
                computeWeekdaysParse.call (this);
            }
            if (isStrict) {
                devuelve this._weekdaysMinStrictRegex;
            } else {
                devuelve this._weekdaysMinRegex;
            }
        } else {
            if (! hasOwnProp (this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            devuelve this._weekdaysMinStrictRegex && isStrict?
                this._weekdaysMinStrictRegex: this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        función cmpLenRev (a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            yo, mamá, minp, shortp, longp;
        para (i = 0; i <7; i ++) {
            // haz la expresión regular si no la tenemos ya
            mom = createUTC ([2000, 1]). day (i);
            minp = this.weekdaysMin (mamá, '');
            shortp = this.weekdaysShort (mamá, '');
            longp = this.weekdays (mamá, '');
            minPieces.push (minp);
            shortPieces.push (shortp);
            longPieces.push (longp);
            Mixed Pieces.push (minp);
            mixedPieces.push (shortp);
            mixedPieces.push (longp);
        }
        // La clasificación se asegura de que si un día de la semana (o abbr) es un prefijo de otro es
        // coincidirá con la pieza más larga.
        minPieces.sort (cmpLenRev);
        shortPieces.sort (cmpLenRev);
        longPieces.sort (cmpLenRev);
        mixedPieces.sort (cmpLenRev);
        para (i = 0; i <7; i ++) {
            shortPieces [i] = regexEscape (shortPieces [i]);
            LongPieces [i] = regexEscape (longPieces [i]);
            Piezas mezcladas [i] = regexEscape (Piezas mezcladas [i]);
        }

        this._weekdaysRegex = new RegExp ('^ (' + mixedPieces.join ('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp ('^ (' + longPieces.join ('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp ('^ (' + shortPieces.join ('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp ('^ (' + minPieces.join ('|') + ')', 'i');
    }

    // FORMATEANDO

    función hFormat () {
        devuelve esto.horas ()% 12 || 12;
    }

    función kFormat () {
        devuelve esto.horas () || 24;
    }

    addFormatToken ('H', ['HH', 2], 0, 'hora');
    addFormatToken ('h', ['hh', 2], 0, hFormat);
    addFormatToken ('k', ['kk', 2], 0, kFormat);

    addFormatToken ('hmm', 0, 0, function () {
        devuelve '' + hFormat.apply (this) + zeroFill (this.minutes (), 2);
    });

    addFormatToken ('hmmss', 0, 0, function () {
        devuelve '' + hFormat.apply (this) + zeroFill (this.minutes (), 2) +
            zeroFill (this.seconds (), 2);
    });

    addFormatToken ('Hmm', 0, 0, función () {
        devuelve '' + this.hours () + zeroFill (this.minutes (), 2);
    });

    addFormatToken ('Hmmss', 0, 0, function () {
        devuelve '' + this.hours () + zeroFill (this.minutes (), 2) +
            zeroFill (this.seconds (), 2);
    });

    función meridiem (token, minúsculas) {
        addFormatToken (token, 0, 0, function () {
            devuelve this.localeData (). meridiem (this.hours (), this.minutes (), en minúsculas);
        });
    }

    meridiem ('a', verdadero);
    meridiem ('A', falso);

    // ALIAS

    addUnitAlias ??('hour', 'h');

    // PRIORIDAD
    addUnitPriority ('hora', 13);

    // PARSING

    función matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken ('a', matchMeridiem);
    addRegexToken ('A', matchMeridiem);
    addRegexToken ('H', match1to2);
    addRegexToken ('h', match1to2);
    addRegexToken ('k', match1to2);
    addRegexToken ('HH', match1to2, match2);
    addRegexToken ('hh', match1to2, match2);
    addRegexToken ('kk', match1to2, match2);

    addRegexToken ('hmm', match3to4);
    addRegexToken ('hmmss', match5to6);
    addRegexToken ('Hmm', match3to4);
    addRegexToken ('Hmmss', match5to6);

    addParseToken (['H', 'HH'], HOUR);
    addParseToken (['k', 'kk'], función (entrada, matriz, configuración) {
        var kInput = toInt (entrada);
        array [HOUR] = kInput === 24? 0: kInput;
    });
    addParseToken (['a', 'A'], función (entrada, matriz, configuración) {
        config._isPm = config._locale.isPM (entrada);
        config._meridiem = entrada;
    });
    addParseToken (['h', 'hh'], función (entrada, matriz, configuración) {
        array [HOUR] = toInt (entrada);
        getParsingFlags (config) .bigHour = true;
    });
    addParseToken ('hmm', función (entrada, matriz, configuración) {
        var pos = input.length - 2;
        array [HOUR] = toInt (input.substr (0, pos));
        array [MINUTE] = toInt (input.substr (pos));
        getParsingFlags (config) .bigHour = true;
    });
    addParseToken ('hmmss', función (entrada, matriz, configuración) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array [HOUR] = toInt (input.substr (0, pos1));
        array [MINUTE] = toInt (input.substr (pos1, 2));
        array [SECOND] = toInt (input.substr (pos2));
        getParsingFlags (config) .bigHour = true;
    });
    addParseToken ('Hmm', función (entrada, matriz, configuración) {
        var pos = input.length - 2;
        array [HOUR] = toInt (input.substr (0, pos));
        array [MINUTE] = toInt (input.substr (pos));
    });
    addParseToken ('Hmmss', función (entrada, matriz, configuración) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array [HOUR] = toInt (input.substr (0, pos1));
        array [MINUTE] = toInt (input.substr (pos1, 2));
        array [SECOND] = toInt (input.substr (pos2));
    });

    // LOCALES

    función localeIsPM (entrada) {
        // IE8 Quirks Mode y IE7 Standards Mode no permiten acceder a cadenas como matrices
        // Usar charAt debería ser más compatible.
        return ((input + '') .toLowerCase (). charAt (0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap?\.?m?\.?/i;
    función localeMeridiem (horas, minutos, isLower) {
        si (horas> 11) {
            volver isLower? 'pm': 'PM';
        } else {
            volver isLower? 'am': 'AM';
        }
    }


    // MOMENTOS

    // La configuración de la hora debe mantener la hora, porque el usuario explícitamente
    // especifica que hora quieren. Así que tratando de mantener la misma hora (en
    // una nueva zona horaria) tiene sentido. Sumar / restar horas no sigue
    // Esta regla.
    var getSetHour = makeGetSet ('Hours', true);

    var baseConfig = {
        calendario: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        meses: defaultLocaleMonths,
        mesesAcceso: por defectoLocaleMonthsShort,

        semana: defaultLocaleWeek,

        días de la semana: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        WeekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse
    };

    // almacenamiento interno para los archivos de configuración del entorno local
    var locales = {};
    var localeFamilies = {};
    var globalLocale;

    función normalizeLocale (clave) {
        volver clave? key.toLowerCase (). replace ('_', '-'): key;
    }

    // elige la configuración regional de la matriz
    // prueba ['en-au', 'en-gb'] como 'en-au', 'en-gb', 'en', como en moverse por la lista probando cada uno
    // subcadena de la más específica a la menos, pero muévase al siguiente elemento de la matriz si es una variante más específica que la raíz actual
    función pickLocale (nombres) {
        var i = 0, j, siguiente, locale, split;

        while (i <names.length) {
            split = normalizeLocale (names [i]). split ('-');
            j = split.length;
            siguiente = normalizeLocale (nombres [i + 1]);
            siguiente = siguiente? next.split ('-'): null;
            mientras (j> 0) {
                locale = loadLocale (split.slice (0, j) .join ('-'));
                if (locale) {
                    configuración regional de retorno
                }
                if (next && next.length> = j && compareArrays (split, next, true)> = j - 1) {
                    // el siguiente elemento de la matriz es mejor que una subcadena menos profunda de esta
                    descanso;
                }
                j--;
            }
            i ++;
        }
        return globalLocale;
    }

    función loadLocale (nombre) {
        var oldLocale = null;
        // TODO: encontrar una mejor manera de registrar y cargar todas las configuraciones regionales en el nodo
        if (! locales [name] && (typeof module! == 'undefined') &&
                módulo && módulo.exportaciones) {
            tratar {
                oldLocale = globalLocale._abbr;
                var aliasedRequire = require;
                aliasedRequire ('./ locale /' + nombre);
                getSetGlobalLocale (oldLocale);
            } atrapar (e) {}
        }
        devolver los locales [nombre];
    }

    // Esta función cargará la configuración regional y luego establecerá la configuración regional global. Si
    // no se pasan argumentos, simplemente devolverá el global actual
    // clave de locale.
    función getSetGlobalLocale (clave, valores) {
        datos var
        if (clave) {
            if (isUndefined (valores)) {
                datos = getLocale (clave);
            }
            else {
                datos = defineLocale (clave, valores);
            }

            si (datos) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = datos;
            }
            else {
                if ((typeof console! == 'undefined') && console.warn) {
                    // advertir al usuario si se pasan los argumentos pero no se pudo establecer la configuración regional
                    console.warn ('Locale' + key + 'not found. ¿Olvidó cargarlo?');
                }
            }
        }

        devolver globalLocale._abbr;
    }

    función defineLocale (nombre, configuración) {
        if (config! == null) {
            var locale, parentConfig = baseConfig;
            config.abbr = nombre;
            if (locales [nombre]! = nulo) {
                deprecateSimple ('defineLocaleOverride',
                        'use moment.updateLocale (localeName, config) para cambiar' +
                        'un local existente. moment.defineLocale (localeName, '+
                        'config) solo debe usarse para crear una nueva configuración regional' +
                        'Vea http://momentjs.com/guides/#/warnings/define-locale/ para más información.');
                parentConfig = locales [nombre] ._ config;
            } else if (config.parentLocale! = null) {
                if (locales [config.parentLocale]! = null) {
                    parentConfig = locales [config.parentLocale] ._ config;
                } else {
                    locale = loadLocale (config.parentLocale);
                    if (locale! = null) {
                        parentConfig = locale._config;
                    } else {
                        if (! localeFamilies [config.parentLocale]) {
                            localeFamilies [config.parentLocale] = [];
                        }
                        localeFamilies [config.parentLocale] .push ({
                            nombre nombre,
                            config: config
                        });
                        retorno nulo
                    }
                }
            }
            locales [nombre] = nueva configuración regional (mergeConfigs (parentConfig, config));

            if (localeFamilies [nombre]) {
                localeFamilies [name] .forEach (function (x) {
                    defineLocale (x.name, x.config);
                });
            }

            // al revés compat por ahora: también establece la configuración regional
            // asegúrese de establecer la configuración regional DESPUÉS de que todas las configuraciones regionales secundarias hayan sido
            // creado, por lo que no vamos a terminar con el conjunto de configuración regional hijo.
            getSetGlobalLocale (nombre);


            devolver los locales [nombre];
        } else {
            // útil para la prueba
            eliminar locales [nombre];
            retorno nulo
        }
    }

    función updateLocale (nombre, configuración) {
        if (config! = null) {
            var locale, tmpLocale, parentConfig = baseConfig;
            // MERGE
            tmpLocale = loadLocale (nombre);
            if (tmpLocale! = null) {
                parentConfig = tmpLocale._config;
            }
            config = mergeConfigs (parentConfig, config);
            locale = new Locale (config);
            locale.parentLocale = locales [nombre];
            locales [nombre] = locale;

            // al revés compat por ahora: también establece la configuración regional
            getSetGlobalLocale (nombre);
        } else {
            // pasar nulo para la configuración a la no actualización, útil para las pruebas
            if (locales [nombre]! = nulo) {
                if (locales [name] .parentLocale! = null) {
                    locales [nombre] = locales [nombre] .parentLocale;
                } else if (locales [nombre]! = nulo) {
                    eliminar locales [nombre];
                }
            }
        }
        devolver los locales [nombre];
    }

    // devuelve datos locales
    función getLocale (clave) {
        locale var

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (! key) {
            return globalLocale;
        }

        if (! isArray (key)) {
            // cortocircuita todo lo demás
            locale = loadLocale (key);
            if (locale) {
                configuración regional de retorno
            }
            clave = [clave];
        }

        return pickLocale (clave);
    }

    función listLocales () {
        teclas de retorno (locales);
    }

    función checkOverflow (m) {
        desbordamiento var
        var a = m._a;

        if (a && getParsingFlags (m) .overflow === -2) {
            desbordamiento =
                a [MES] <0 || a [MES]> 11? MES:
                a [FECHA] <1 || a [DATE]> daysInMonth (a [YEAR], a [MONTH])? FECHA :
                a [HORA] <0 || a [HORA]> 24 || (a [HOUR] === 24 && (a [MINUTE]! == 0 || a [SECOND]! == 0 || a [MILLISECOND]! == 0))? HORA:
                a [MINUTO] <0 || a [MINUTO]> 59? MINUTO:
                a [SEGUNDO] <0 || a [SEGUNDO]> 59? SEGUNDO :
                a [MILLISECOND] <0 || a [MILLISECOND]> 999? MILLISECOND:
                -1;

            if (getParsingFlags (m) ._ overflowDayOfYear && (overflow <YEAR || overflow> DATE)) {
                desbordamiento = FECHA;
            }
            if (getParsingFlags (m) ._ overflowWeeks && overflow === -1) {
                desbordamiento = SEMANA;
            }
            if (getParsingFlags (m) ._ overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags (m) .overflow = overflow;
        }

        volver m;
    }

    // Pic k el primero definido de dos o tres argumentos.
    funciones predeterminadas (a, b, c) {
        si (a! = nulo) {
            devuelve un
        }
        si (b! = nulo) {
            volver b;
        }
        volver c;
    }

    función currentDateArray (config) {
        // ganchos es en realidad el objeto de momento exportado
        var nowValue = new Date (hooks.now ());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear (), nowValue.getUTCMonth (), nowValue.getUTCDate ()];
        }
        return [nowValue.getFullYear (), nowValue.getMonth (), nowValue.getDate ()];
    }

    // convertir una matriz en una fecha.
    // la matriz debería reflejar los parámetros a continuación
    // nota: todos los valores pasados ??el año son opcionales y se predeterminarán al valor más bajo posible.
    // [año, mes, día, hora, minuto, segundo, milisegundo]
    función configFromArray (config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;

        if (config._d) {
            regreso;
        }

        currentDate = currentDateArray (config);

        // calcular el día del año entre semanas y días laborables
        if (config._w && config._a [DATE] == null && config._a [MONTH] == null) {
            dayOfYearFromWeekInfo (config);
        }

        // si se establece el día del año, averigua qué es
        if (config._dayOfYear! = null) {
            yearToUse = defaults (config._a [YEAR], currentDate [YEAR]);

            if (config._dayOfYear> daysInYear (yearToUse) || config._dayOfYear === 0) {
                getParsingFlags (config) ._ overflowDayOfYear = true;
            }

            date = createUTCDate (yearToUse, 0, config._dayOfYear);
            config._a [MONTH] = date.getUTCMonth ();
            config._a [DATE] = date.getUTCDate ();
        }

        // Predeterminado a la fecha actual.
        // * si no se da ningún año, mes, día del mes, el valor predeterminado es hoy
        // * si se da el día del mes, mes y año por defecto
        // * si se da el mes, por defecto solo año
        // * si se da el año, no omitir nada
        para (i = 0; i <3 && config._a [i] == null; ++ i) {
            config._a [i] = input [i] = currentDate [i];
        }

        // Cero fuera lo que no estaba predeterminado, incluyendo el tiempo
        para (; i <7; i ++) {
            config._a [i] = input [i] = (config._a [i] == null)? (i === 2? 1: 0): config._a [i];
        }

        // Verificar 24: 00: 00.000
        if (config._a [HOUR] === 24 &&
                config._a [MINUTO] === 0 &&
                config._a [SEGUNDO] === 0 &&
                config._a [MILLISECOND] === 0) {
            config._nextDay = true;
            config._a [HORA] = 0;
        }

        config._d = (config._useUTC? createUTCDate: createDate) .apply (null, input);
        expectedWeekday = config._useUTC? config._d.getUTCDay (): config._d.getDay ();

        // Aplicar el desplazamiento de zona horaria desde la entrada. El utcOffset real puede ser cambiado
        // con parseZone.
        if (config._tzm! = null) {
            config._d.setUTCMinutes (config._d.getUTCMinutes () - config._tzm);
        }

        if (config._nextDay) {
            config._a [HORA] = 24;
        }

        // comprobar si el día de la semana no coincide
        if (config._w && typeof config._w.d! == 'undefined' && config._w.d! == expectedWeekday) {
            getParsingFlags (config) .weekdayMismatch = true;
        }
    }

    función dayOfYearFromWeekInfo (config) {
        var w, weekyear, week, weekend, dow, doy, temp, weekendOverflow;

        w = config._w;
        if (w.GG! = null || wW! = null || wE! = null) {
            dow = 1;
            doy = 4;

            // TODO: Necesitamos tomar el año de isoWeek actual, pero eso depende de
            // Cómo interpretamos ahora (local, utc, offset fijo). Entonces crea
            // una versión actual de la configuración actual (tomar banderas locales / utc / offset, y
            // crea ahora).
            weekYear = valores predeterminados (w.GG, config._a [YEAR], weekOfYear (createLocal (), 1, 4) .year);
            semana = valores por defecto (wW, 1);
            día de la semana = por defecto (wE, 1);
            if (día de la semana <1 || día de la semana> 7) {
                weekendOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            var curWeek = weekOfYear (createLocal (), dow, doy);

            weekYear = defaults (w.gg, config._a [YEAR], curWeek.year);

            // Predeterminado a la semana actual.
            semana = valores predeterminados (ww, curWeek.week);

            if (wd! = null) {
                // día de la semana - los números de días bajos se consideran la próxima semana
                día de la semana = wd;
                if (día de la semana <0 || día de la semana> 6) {
                    weekendOverflow = true;
                }
            } else if (we! = null) {
                // día de la semana local - el conteo comienza desde el principio de la semana
                día de la semana = we + dow;
                si (nosotros <0 || nosotros> 6) {
                    weekendOverflow = true;
                }
            } else {
                // por defecto al comienzo de la semana
                día de la semana = dow;
            }
        }
        if (week <1 || week> weeksInYear (weekYear, dow, doy)) {
            getParsingFlags (config) ._ overflowWeeks = true;
        } else if si (día de la semana excedente = nulo) {
            getParsingFlags (config) ._ overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks (weekYear, week, weekend, dow, doy);
            config._a [YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 o 0000-W00-0 + T + 00 o 00:00 o 00:00:00 o 00: 00: 00.000 + +00: 00 o +0000 o +00)
    var extendedIsoRegex = / ^ \ s * ((?: [+ -] \ d {6} | \ d {4}) - (?: \ d \ d- \ d \ d | W \ d \ d- \ d | W \ d \ d | \ d \ d \ d | \ d \ d)) (? :( T |) (\ d \ d (? :: \ d \ d (? :: \ d \ d (? : [.,] \ d +)?)?)?) ([\ + \ -] \ d \ d (? ::? \ d \ d)? | \ s * Z)?)? $ /;
    var basicIsoRegex = / ^ \ s * ((?: [+ -] \ d {6} | \ d {4}) (?: \ d \ d \ d \ d | W \ d \ d \ d | W \ d \ d | \ d \ d \ d | \ d \ d)) (? :( T |) (\ d \ d (?: \ d \ d (?: \ d \ d (?: [.,] \ d +)?)?)?) ([\ + \ -] \ d \ d (? ::? \ d \ d)? | \ s * Z)?)? $ /;

    var tzRegex = / Z | [+ -] \ d \ d (? ::? \ d \ d)? /;

    var isoDates = [
        ['YYYYYY-MM-DD', / [+ -] \ d {6} - \ d \ d- \ d \ d /],
        ['YYYY-MM-DD', / \ d {4} - \ d \ d- \ d \ d /],
        ['GGGG- [W] WW-E', / \ d {4} -W \ d \ d- \ d /],
        ['GGGG- [W] WW', / \ d {4} -W \ d \ d /, falso],
        ['YYYY-DDD', / \ d {4} - \ d {3} /],
        ['YYYY-MM', / \ d {4} - \ d \ d /, falso],
        ['YYYYYYYMMDD', / [+ -] \ d {10} /],
        ['YYYYMMDD', / \ d {8} /],
        // YYYYMM no está permitido por el estándar
        ['GGGG [W] WWE', / \ d {4} W \ d {3} /],
        ['GGGG [W] WW', / \ d {4} W \ d {2} /, falso],
        ['YYYYDDD', / \ d {7} /]
    ];

    // iso time format y regexes
    var isoTimes = [
        ['HH: mm: ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH: mm: ss, SSSS', / \ d \ d: \ d \ d: \ d \ d, \ d + /],
        ['HH: mm: ss', / \ d \ d: \ d \ d: \ d \ d /],
        ['HH: mm', / \ d \ d: \ d \ d /],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss, SSSS', / \ d \ d \ d \ d \ d \ d, \ d + /],
        ['HHmmss', / \ d \ d \ d \ d \ d \ d /],
        ['HHmm', / \ d \ d \ d \ d /],
        ['HH', / \ d \ d /]
    ];

    var aspNetJsonRegex = / ^ \ /? Date \ ((\ -? \ d +) / i;

    // fecha del formato iso
    función configFromISO (config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec (cadena) || basicIsoRegex.exec (cadena),
            allowTime, dateFormat, timeFormat, tzFormat;

        si (emparejar) {
            getParsingFlags (config) .iso = true;

            para (i = 0, l = isoDates.length; i <l; i ++) {
                if (isoDates [i] [1] .exec (match [1])) {
                    dateFormat = isoDates [i] [0];
                    allowTime = isoDates [i] [2]! == false;
                    descanso;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                regreso;
            }
            si (coinciden [3]) {
                para (i = 0, l = isoTimes.length; i <l; i ++) {
                    if (isoTimes [i] [1] .exec (match [3])) {
                        // match [2] debe ser 'T' o espacio
                        timeFormat = (match [2] || '') + isoTimes [i] [0];
                        descanso;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    regreso;
                }
            }
            if (! allowTime && timeFormat! = null) {
                config._isValid = false;
                regreso;
            }
            si (coinciden [4]) {
                if (tzRegex.exec (match [4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    regreso;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat (config);
        } else {
            config._isValid = false;
        }
    }

    // expresión regular RFC 2822: para obtener más información, consulte https://tools.ietf.org/html/rfc2822#section-3.3
    var rfc2822 = / ^ (? :( Mon | Tue | Wed | Thu | Fri | Sat | Sun),? \ s)? (\ d {1,2}) \ s (Ene | Feb | Mar | Abr | Mayo | Jun | Jul | Ago | Sep | Sep | Oct | Dic) \ s (\ d {2,4}) \ s (\ d \ d): (\ d \ d) (? :: (\ d \ d ))? \ s (? :( UT | GMT | [ECMP] [SD] T) | ([Zz]) | ([+ -] \ d {4})) $ /;

    function extractFromRFC2822Strings (yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var resultado = [
            untruncateyear (yearStr),
            defaultLocaleMonthsShort.indexOf (monthStr),
            parseInt (dayStr, 10),
            parseInt (hourStr, 10),
            parseInt (minuteStr, 10)
        ];

        if (secondStr) {
            result.push (parseInt (secondStr, 10));
        }

        resultado de retorno
    }

    función untruncateYear (yearStr) {
        var año = parseInt (yearStr, 10);
        si (año <= 49) {
            retorno 2000 + año;
        } else if (año <= 999) {
            regreso 1900 + año;
        }
        año de regreso
    }

    función preprocessRFC2822 (s) {
        // Eliminar comentarios y plegar espacios en blanco y reemplazar espacios múltiples con un solo espacio
        devuelve s.replace (/ \ ([^)] * \) | [\ n \ t] / g, '') .replace (/ (\ s \ s +) / g, '') .replace (/ ^ \ s \ s * /, '') .replace (/ \ s \ s * $ /, '');
    }

    función checkWeekday (weekendStr, parsedInput, config) {
        if (weekendStr) {
            // TODO: Reemplace el objeto Vanilla JS Date con un cheque independiente del día de la semana.
            var weekendProvided = defaultLocaleWeekdaysShort.indexOf (weekendStr),
                weekendActual = new Date (parsedInput [0], parsedInput [1], parsedInput [2]). getDay ();
            si (día de la semana provisto! == día de la semanaActual) {
                getParsingFlags (config) .weekdayMismatch = true;
                config._isValid = false;
                falso retorno;
            }
        }
        devuelve verdadero
    }

    var obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60
    };

    función calculaOffset (obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets [obsOffset];
        } else if (militaryOffset) {
            // el único militar permitido es Z
            devuelve 0;
        } else {
            var hm = parseInt (numOffset, 10);
            var m = hm% 100, h = (hm - m) / 100;
            devuelva h * 60 + m;
        }
    }

    // fecha y hora del formato ref 2822
    función configFromRFC2822 (config) {
        var match = rfc2822.exec (preprocessRFC2822 (config._i));
        si (emparejar) {
            var parsedArray = extractFromRFC2822Strings (match [4], match [3], match [2], match [5], match [6], match [7]);
            if (! checkWeekday (match [1], parsedArray, config)) {
                regreso;
            }

            config._a = parsedArray;
            config._tzm = calculaformación (coincidencia [8], coincidencia [9], coincidencia [10]);

            config._d = createUTCDate.apply (null, config._a);
            config._d.setUTCMinutes (config._d.getUTCMinutes () - config._tzm);

            getParsingFlags (config) .rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // fecha del formato iso o reserva
    función configFromString (config) {
        var matched = aspNetJsonRegex.exec (config._i);

        if (matched! == null) {
            config._d = nueva Fecha (+ coincidente [1]);
            regreso;
        }

        configFromISO (config);
        if (config._isValid === false) {
            eliminar config._isValid;
        } else {
            regreso;
        }

        configFromRFC2822 (config);
        if (config._isValid === false) {
            eliminar config._isValid;
        } else {
            regreso;
        }

        // intento final, usa Input Fallback
        hooks.createFromInputFallback (config);
    }

    hooks.createFromInputFallback = deprecate (
        El valor proporcionado no está en un formato RFC2822 o ISO reconocido. momento en que la construcción recae en js Date (), '+
        'que no es confiable en todos los navegadores y versiones. Los formatos de fecha no RFC2822 / ISO son '+
        'desalentado y será eliminado en un próximo lanzamiento importante. Consulte '+
        'http://momentjs.com/guides/#/warnings/js-date/ para obtener más información.',
        función (config) {
            config._d = new Date (config._i + (config._useUTC? 'UTC': ''));
        }
    );

    // constante que se refiere a la norma ISO
    hooks.ISO_8601 = function () {};

    // constante que se refiere al formulario RFC 2822
    hooks.RFC_2822 = function () {};

    // fecha de la cadena y cadena de formato
    función configFromStringAndFormat (config) {
        // TODO: Mueve esto a otra parte del flujo de creación para evitar deps circulares
        if (config._f === hooks.ISO_8601) {
            configFromISO (config);
            regreso;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822 (config);
            regreso;
        }
        config._a = [];
        getParsingFlags (config) .empty = true;

        // Esta matriz se usa para hacer una Fecha, ya sea con `new Date` o` Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat (config._f, config._locale) .match (formattingTokens) || [];

        para (i = 0; i <tokens.length; i ++) {
            ficha = fichas [i];
            parsedInput = (string.match (getParseRegexForToken (token, config)) || []) [0];
            // console.log ('token', token, 'parsedInput', parsedInput,
            // 'regex', getParseRegexForToken (token, config));
            if (parsedInput) {
                skipped = string.substr (0, string.indexOf (parsedInput));
                if (skipped.length> 0) {
                    getParsingFlags (config) .unusedInput.push (skipped);
                }
                string = string.slice (string.indexOf (parsedInput) + parsedInput.length);
                totalParsedInputLength + = parsedInput.length;
            }
            // no analizar si no es un token conocido
            if (formatTokenFunctions [token]) {
                if (parsedInput) {
                    getParsingFlags (config) .empty = false;
                }
                else {
                    getParsingFlags (config) .unusedTokens.push (token);
                }
                addTimeToArrayFromToken (token, parsedInput, config);
            }
            else if (config._strict &&! parsedInput) {
                getParsingFlags (config) .unusedTokens.push (token);
            }
        }

        // agregar la longitud de entrada sin analizar restante a la cadena
        getParsingFlags (config) .charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length> 0) {
            getParsingFlags (config) .unusedInput.push (string);
        }

        // borrar la marca _12h si la hora es <= 12
        if (config._a [HOUR] <= 12 &&
            getParsingFlags (config) .bigHour === true &&
            config._a [HORA]> 0) {
            getParsingFlags (config) .bigHour = undefined;
        }

        getParsingFlags (config) .parsedDateParts = config._a.slice (0);
        getParsingFlags (config) .meridiem = config._meridiem;
        // manejar meridiem
        config._a [HOUR] = meridiemFixWrap (config._locale, config._a [HOUR], config._meridiem);

        configFromArray (config);
        checkOverflow (config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // Nada que hacer
            hora de regreso
        }
        if (locale.meridiemHour! = null) {
            return locale.meridiemHour (hour, meridiem);
        } else if (locale.isPM! = null) {
            // Retroceder
            isPm = locale.isPM (meridiem);
            if (isPm && hour <12) {
                hora + = 12;
            }
            if (! isPm && hour === 12) {
                hora = 0;
            }
            hora de regreso
        } else {
            // esto no se supone que suceda
            hora de regreso
        }
    }

    // fecha de la cadena y matriz de cadenas de formato
    función configFromStringAndArray (config) {
        var tempConfig,
            mejor momento,

            scoreToBeat,
            yo,
            puntuación actual;

        if (config._f.length === 0) {
            getParsingFlags (config) .invalidFormat = true;
            config._d = nueva fecha (NaN);
            regreso;
        }

        para (i = 0; i <config._f.length; i ++) {
            currentScore = 0;
            tempConfig = copyConfig ({}, config);
            if (config._useUTC! = null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f [i];
            configFromStringAndFormat (tempConfig);

            if (! isValid (tempConfig)) {
                continuar;
            }

            // si hay alguna entrada que no se haya analizado, agregue una penalización para ese formato
            currentScore + = getParsingFlags (tempConfig) .charsLeftOver;

            // o tokens
            currentScore + = getParsingFlags (tempConfig) .unusedTokens.length * 10;

            getParsingFlags (tempConfig) .score = currentScore;

            if (scoreToBeat == null || currentScore <scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend (config, bestMoment || tempConfig);
    }

    función configFromObject (config) {
        if (config._d) {
            regreso;
        }

        var i = normalizeObjectUnits (config._i);
        config._a = map ([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            devolver obj && parseInt (obj, 10);
        });

        configFromArray (config);
    }

    función createFromConfig (config) {
        var res = new Moment (checkOverflow (prepareConfig (config)));
        if (res._nextDay) {
            // Agregar es lo suficientemente inteligente alrededor de DST
            res.add (1, 'd');
            res._nextDay = indefinido;
        }

        volver res;
    }

    función prepareConfig (config) {
        var input = config._i,
            formato = config._f;

        config._locale = config._locale || getLocale (config._l);

        if (input === null || (formato === undefined && input === '')) {
            devuelve createInvalid ({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse (input);
        }

        if (isMoment (input)) {
            devolver nuevo momento (checkOverflow (entrada));
        } else if (isDate (input)) {
            config._d = entrada;
        } else if (es Array (formato)) {
            configFromStringAndArray (config);
        } else if (formato) {
            configFromStringAndFormat (config);
        } else {
            configFromInput (config);
        }

        si (! isValid (config)) {
            config._d = null;
        }

        volver config;
    }

    función configFromInput (config) {
        var input = config._i;
        si (no está definido (entrada)) {
            config._d = nueva Fecha (hooks.now ());
        } else if (isDate (input)) {
            config._d = nueva Fecha (input.valueOf ());
        } else if ((typeof input === 'string') {
            configFromString (config);
        } else if (isArray (entrada)) {
            config._a = map (input.slice (0), function (obj) {
                volver parseInt (obj, 10);
            });
            configFromArray (config);
        } else if (esObject (entrada)) {
            configFromObject (config);
        } else if (esNúmero (entrada)) {
            // de milisegundos
            config._d = nueva fecha (entrada);
        } else {
            hooks.createFromInputFallback (config);
        }
    }

    función createLocalOrUTC (entrada, formato, configuración regional, estricto, isUTC) {
        var c = {};

        if (locale === true || locale === false) {
            estricto = locale;
            locale = undefined;
        }

        if ((isObject (input) && isObjectEmpty (input)) ||
                (isArray (input) && input.length === 0)) {
            entrada = indefinido;
        }
        // La construcción del objeto debe hacerse de esta manera.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = entrada;
        c._f = formato;
        c._strict = estricto;

        devuelve createFromConfig (c);
    }

    Función createLocal (entrada, formato, configuración regional, estricto) {
        devuelve createLocalOrUTC (entrada, formato, configuración regional, estricto, falso);
    }

    var prototypeMin = deprecate (
        'moment (). min está en desuso, use moment.max en su lugar. http://momentjs.com/guides/#/warnings/min-max/ ',
        función () {
            var other = createLocal.apply (null, argumentos);
            if (this.isValid () && other.isValid ()) {
                devuelve otro <esto? esto: otro;
            } else {
                devuelve createInvalid ();
            }
        }
    );

    var prototypeMax = deprecate (
        'moment (). max está en desuso, use moment.min en su lugar. http://momentjs.com/guides/#/warnings/min-max/ ',
        función () {
            var other = createLocal.apply (null, argumentos);
            if (this.isValid () && other.isValid ()) {
                devuelve otro> esto? esto: otro;
            } else {
                devuelve createInvalid ();
            }
        }
    );

    // Elija un momento m de momentos para que m [fn] (otro) sea verdadero para todos
    // otro. Esto se basa en la función fn para ser transitiva.
    //
    // los momentos deben ser una matriz de objetos de momento o una matriz, cuyos
    // El primer elemento es una matriz de objetos de momento.
    función pickBy (fn, momentos) {
        var res, i;
        if (moments.length === 1 && isArray (momentos [0])) {
            momentos = momentos [0];
        }
        si (! momentos.longitud) {
            return createLocal ();
        }
        res = momentos [0];
        para (i = 1; i <moments.length; ++ i) {
            if (! momentos [i] .isValid () || momentos [i] [fn] (res)) {
                res = momentos [i];
            }
        }
        volver res;
    }

    // TODO: ¿Usar [] .sort en su lugar?
    función min () {
        var args = [] .slice.call (argumentos, 0);

        return pickBy ('isBefore', args);
    }

    función max () {
        var args = [] .slice.call (argumentos, 0);

        return pickBy ('isAfter', args);
    }

    var ahora = función () {
        volver Date.now? Date.now (): + (new Date ());
    };

    orden var = ['año', 'trimestre', 'mes', 'semana', 'día', 'hora', 'minuto', 'segundo', 'milisegundo'];

    función isDurationValid (m) {
        para (clave var en m) {
            if (! (indexOf.call (orden, clave)! == -1 && (m [clave] == null ||! isNaN (m [clave])))) {
                falso retorno;
            }
        }

        var unitHasDecimal = false;
        para (var i = 0; i <ordering.length; ++ i) {
            si (m [ordenando [i]]) {
                if (unitHasDecimal) {
                    falso retorno; // solo se permiten los no enteros para la unidad más pequeña
                }
                if (parseFloat (m [ordenando [i]])! == toInt (m [ordenando [i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        devuelve verdadero
    }

    la función es valida $ 1 () {
        devuelve this._isValid;
    }

    funcion createInvalid $ 1 () {
        devuelve createDuration (NaN);
    }

    función Duración (duración) {
        var normalizedInput = normalizeObjectUnits (duration),
            años = normalizadoInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            meses = normalizadoInput.month || 0,
            semanas = normalizedInput.week || normalizedInput.isoWeek || 0,
            días = normalizadoInput.day || 0,
            horas = entrada normalizada.hora || 0,
            minutos = normalizedInput.minute || 0,
            segundos = normalizedInput.second || 0,
            milisegundos = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid (normalizedInput);

        // representación para dateAddRemove
        this._milliseconds = + milisegundos +
            segundos * 1e3 + // 1000
            minutos * 6e4 + // 1000 * 60
            horas * 1000 * 60 * 60; // usando 1000 * 60 * 60 en lugar de 36e5 para evitar errores de redondeo de punto flotante https://github.com/moment/moment/issues/2978
        // Debido a dateAddRemove, trata las 24 horas como diferentes de un
        // día cuando trabajamos alrededor de DST, necesitamos almacenarlos por separado
        this._days = + days +
            semanas * 7;
        // Es imposible traducir meses en días sin saber.
        // de qué meses están hablando, así que tenemos que almacenar
        // por separado.
        this._months = + months +
            cuartos * 3 +
            años * 12;

        esto._data = {};

        this._locale = getLocale ();

        this._bubble ();
    }

    función isDuration (obj) {
        retorno obj instancia de Duración;
    }

    función absRound (número) {
        si (número <0) {
            devuelve Math.round (-1 * número) * -1;
        } else {
            return Math.round (número);
        }
    }

    // FORMATEANDO

    función offset (token, separador) {
        addFormatToken (token, 0, 0, function () {
            var offset = this.utcOffset ();
            signo var = '+';
            if (offset <0) {
                offset = -offset;
                signo = '-';
            }
            signo de retorno + zeroFill (~~ (offset / 60), 2) + separator + zeroFill (~~ (offset)% 60, 2);
        });
    }

    desplazamiento ('Z', ':');
    desplazamiento ('ZZ', '');

    // PARSING

    addRegexToken ('Z', matchShortOffset);
    addRegexToken ('ZZ', matchShortOffset);
    addParseToken (['Z', 'ZZ'], función (entrada, matriz, configuración) {
        config._useUTC = true;
        config._tzm = offsetFromString (matchShortOffset, input);
    });

    // ayudantes

    // zona horaria
    // '+10: 00'> ['10', '00']
    // '-1530'> ['-15', '30']
    var chunkOffset = / ([\ + \ -] | \ d \ d) / gi;

    función offsetFromString (matcher, string) {
        var matches = (string || '') .match (matcher);

        si (coincide con === nulo) {
            retorno nulo
        }

        var chunk = match [matches.length - 1] || [];
        var parts = (chunk + '') .match (chunkOffset) || ['-', 0, 0];
        var minutos = + (partes [1] * 60) + toInt (partes [2]);

        minutos de retorno === 0?
          0:
          partes [0] === '+'? minutos: -minutos;
    }

    // Devuelve un momento de la entrada, que es local / utc / zone equivalente al modelo.
    Función cloneWithOffset (entrada, modelo) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone ();
            diff = (isMoment (input) || isDate (input)? input.valueOf (): createLocal (input) .valueOf ()) - res.valueOf ();
            // Usa una api de bajo nivel, porque esta fn es una api de bajo nivel.
            res._d.setTime (res._d.valueOf () + diff);
            hooks.updateOffset (res, false);
            volver res;
        } else {
            devuelve createLocal (input) .local ();
        }
    }

    función getDateOffset (m) {
        // En Firefox.24 Date # getTimezoneOffset devuelve un punto flotante.
        // https://github.com/moment/moment/pull/1871
        return -Math.round (m._d.getTimezoneOffset () / 15) * 15;
    }

    // GANCHOS

    // Se llamará a esta función cada vez que se mute un momento.
    // Se pretende mantener el desplazamiento sincronizado con la zona horaria.
    hooks.updateOffset = function () {};

    // MOMENTOS

    // keepLocalTime = true significa solo cambiar la zona horaria, sin
    // afectando a la hora local. Entonces 5:31:26 +0300 - [utcOffset (2, true)] ->
    // 5:31:26 +0200 Es posible que 5:31:26 no exista con offset
    // +0200, así que ajustamos el tiempo según sea necesario, para que sea válido.
    //
    // Mantener el tiempo realmente suma / resta (una hora)
    // del tiempo representado real. Por eso llamamos a updateOffset.
    // por segunda vez. En caso de que nos quiera cambiar de nuevo la compensación.
    // _changeInProgress == caso verdadero, entonces tenemos que ajustar, porque
    // No hay tal hora en la zona horaria dada.
    función getSetOffset (input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (! this.isValid ()) {
            entrada de retorno! = null? esto: NaN;
        }
        if (input! = null) {
            if (typeof input === 'string') {
                input = offsetFromString (matchShortOffset, input);
                if (input === null) {
                    devuelve esto
                }
            } else if (Math.abs (entrada) <16 &&! keepMinutes) {
                entrada = entrada * 60;
            }
            if (! this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset (this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust! = null) {
                this.add (localAdjust, 'm');
            }
            if (offset! == entrada) {
                if (! keepLocalTime || this._changeInProgress) {
                    addSubtract (this, createDuration (input - offset, 'm'), 1, false);
                } else if (! this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset (this, true);
                    this._changeInProgress = null;
                }
            }
            devuelve esto
        } else {
            devuelve esto._isUTC? offset: getDateOffset (this);
        }
    }

    función getSetZone (input, keepLocalTime) {
        if (input! = null) {
            if (typeof input! == 'string') {
                input = -input;
            }

            this.utcOffset (input, keepLocalTime);

            devuelve esto
        } else {
            return -this.utcOffset ();
        }
    }

    función setOffsetToUTC (keepLocalTime) {
        devuelve this.utcOffset (0, keepLocalTime);
    }

    función setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset (0, keepLocalTime);
            esto._isUTC = falso;

            if (keepLocalTime) {
                this.subtract (getDateOffset (this), 'm');
            }
        }
        devuelve esto
    }

    función setOffsetToParsedOffset () {
        if (this._tzm! = null) {
            this.utcOffset (this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString (matchOffset, this._i);
            if (tZone! = null) {
                this.utcOffset (tZone);
            }
            else {
                this.utcOffset (0, true);
            }
        }
        devuelve esto
    }

    función hasAlignedHourOffset (entrada) {
        if (! this.isValid ()) {
            falso retorno;
        }
        entrada = entrada? createLocal (input) .utcOffset (): 0;

        return (this.utcOffset () - entrada)% 60 === 0;
    }

    función isDaylightSavingTime () {
        regreso (
            this.utcOffset ()> this.clone (). month (0) .utcOffset () ||
            this.utcOffset ()> this.clone (). month (5) .utcOffset ()
        );
    }

    la función esDaylightSavingTimeShifted () {
        if (! isUndefined (this._isDSTShifted)) {
            devuelve this._isDSTShifted;
        }

        var c = {};

        copyConfig (c, este);
        c = prepareConfig (c);

        si (c._a) {
            var otro = c._isUTC? createUTC (c._a): createLocal (c._a);
            this._isDSTShifted = this.isValid () &&
                compareArrays (c._a, other.toArray ())> 0;
        } else {
            this._isDSTShifted = false;
        }

        devuelve this._isDSTShifted;
    }

    función isLocal () {
        devuelve this.isValid ()? ! esto._isUTC: falso;
    }

    función isUtcOffset () {
        devuelve this.isValid ()? this._isUTC: false;
    }

    función isUtc () {
        devuelve this.isValid ()? this._isUTC && this._offset === 0: false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = / ^ (\ - | \ +)? (?: (\ d *) [.])? (\ d +) \: (\ d +) (?: \: (\ d +) (\. \ d PS

    // de http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // un poco más en línea con 4.4.3.2 2004 espec., pero permite decimal en cualquier lugar
    // y se modifica aún más para permitir cadenas que contienen tanto semana como día
    var isoRegex = /^(-|\+)?P(?:( [...]] []:] []: *) M)? (?: ([- +]? [0-9,.] *) W)? (?: ([- +]? [0-9,.] *) D)? (?: T (?: ([- +]? [0-9,.] *) H)? (?: ([- +]? [0-9,.] *) M)? (?: ([- + ]? [0-9,.] *) S)?)? $ /;

    función createDuration (entrada, tecla) {
        duración de var = entrada,
            // la comparación con la expresión regular es costosa, hazlo a pedido
            match = nulo
            firmar,
            jubilado,
            diffRes;

        if (isDuration (entrada)) {
            duración = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
            };
        } else if (esNúmero (entrada)) {
            duración = {};
            if (clave) {
                duración [clave] = entrada;
            } else {
                duration.milliseconds = input;
            }
        } else if (! (match = aspNetRegex.exec (input))) {
            signo = (emparejar [1] === '-')? -1: 1;
            duración = {
                y: 0,
                d: toInt (coincidencia [FECHA]) * signo,
                h: toInt (coincidencia [HORA]) * signo,
                m: toInt (coinciden con [MINUTO]) * signo,
                s: toInt (coinciden con [SEGUNDO]) * signo,
                ms: toInt (absRound (match [MILLISECOND] * 1000)) * signo // el punto decimal en milisegundos se incluye en el match
            };
        } else if (! (match = isoRegex.exec (input))) {
            signo = (emparejar [1] === '-')? -1: 1;
            duración = {
                y: parseIso (coincidencia [2], signo),
                M: parseIso (match [3], signo),
                w: parseIso (coincidencia [4], signo),
                d: parseIso (coincidencia [5], signo),
                h: parseIso (coincidencia [6], signo),
                m: parseIso (match [7], signo),
                s: parseIso (match [8], signo)
            };
        } else if (duration == null) {// comprueba si es nulo o no definido
            duración = {};
        } else if (typeof duration === 'object' && ('from' en duration || 'a' en duración)) {
            diffRes = momentsDifference (createLocal (duration.from), createLocal (duration.to));

            duración = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = nueva Duración (duración);

        if (esDuration (entrada) && hasOwnProp (entrada, '_locale')) {
            ret._locale = input._locale;
        }

        volver ret
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid $ 1;

    función parseIso (inp, sign) {
        // Normalmente usaríamos ~~ inp para esto, pero desafortunadamente también
        // convierte flotadores a ints.
        // inp puede estar indefinido, por lo que llamar con cuidado reemplazarlo.
        var res = inp && parseFloat (inp.replace (',', '.'));
        // aplicar signo mientras estamos en ello
        return (isNaN (res)? 0: res) * signo;
    }

    function positiveMomentsDifference (base, otros) {
        var res = {};

        res.months = other.month () - base.month () +
            (other.year () - base.year ()) * 12;
        if (base.clone (). add (res.months, 'M'). isAfter (other)) {
            --res.months;
        }

        res.milliseconds = + otro - + (base.clone (). add (res.months, 'M'));

        volver res;
    }

    momentos de funciónDiferencia (base, otra) {
        var res;
        if (! (base.isValid () && other.isValid ())) {
            devuelve {milisegundos: 0, meses: 0};
        }

        other = cloneWithOffset (other, base);
        if (base.isBefore (otro)) {
            res = positiveMomentsDifference (base, otros);
        } else {
            res = positiveMomentsDifference (other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        volver res;
    }

    // TODO: eliminar 'nombre' arg después de eliminar la desaprobación
    función createAdder (dirección, nombre) {
        función de retorno (val, periodo) {
            var dur, tmp;
            // invierte los argumentos, pero se quejan de ello
            if (period! == null &&! isNaN (+ period)) {
                deprecateSimple (nombre, 'momento ().' + nombre + '(período, número) está en desuso. Por favor use momento ().' + nombre + '(número, período).' +
                'Vea http://momentjs.com/guides/#/warnings/add-inverted-param/ para más información.');
                tmp = val; val = periodo; periodo = tmp;
            }

            val = typeof val === 'string'? + val: val;
            dur = createDuration (val, period);
            addSubtract (this, dur, direction);
            devuelve esto
        };
    }

    función addSubtract (mom, duration, isAdding, updateOffset) {
        var milisegundos = duration._milliseconds,
            días = absRound (duration._days),
            meses = absRound (duration._months);

        if (! mom.isValid ()) {
            // No op
            regreso;
        }

        updateOffset = updateOffset == null? true: updateOffset;

        si (meses) {
            setMonth (mamá, obtener (mamá, 'Mes') + meses * isAdding);
        }
        si (días) {
            establecer $ 1 (mamá, 'Fecha', obtener (mamá, 'Fecha') + días * isAdding);
        }
        si (milisegundos) {
            mom._d.setTime (mom._d.valueOf () + milisegundos * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset (mamá, días || meses);
        }
    }

    var add = createAdder (1, 'add');
    var restar = createAdder (-1, 'restar');

    función getCalendarFormat (myMoment, ahora) {
        var diff = myMoment.diff (ahora, 'días', verdadero);
        volver dif <-6? 'sameElse':
                diff <-1? 'la semana pasada' :
                dif <0? 'último día' :
                dif <1? 'mismo día' :
                dif <2? 'Día siguiente' :
                dif <7? 'nextWeek': 'sameElse';
    }

    calendario de funciones $ 1 (hora, formatos) {
        // Queremos comparar el comienzo de hoy, vs esto.
        // Obtener el comienzo del día depende de si somos locales / utc / offset o no.
        var ahora = tiempo || createLocal (),
            sod = cloneWithOffset (ahora, esto) .startOf ('día'),
            format = hooks.calendarFormat (this, sod) || 'sameElse';

        var salida = formatos && (isFunction (formatos [formato]) formatos [formato]. llamada (esto, ahora): formatos [formato]);

        devuelve this.format (salida || this.localeData (). calendar (format, this, createLocal (now)));
    }

    función de clonación () {
        volver nuevo momento (este);
    }

    función isAfter (entrada, unidades) {
        var localInput = isMoment (input)? entrada: createLocal (entrada);
        if (! (this.isValid () && localInput.isValid ())) {
            falso retorno;
        }
        unidades = normalizarUnidades (unidades) || 'milisegundo';
        si (unidades === 'milisegundos') {
            devuelve this.valueOf ()> localInput.valueOf ();
        } else {
            devuelve localInput.valueOf () <this.clone (). startOf (units) .valueOf ();
        }
    }

    la función es anterior (entrada, unidades) {
        var localInput = isMoment (input)? entrada: createLocal (entrada);
        if (! (this.isValid () && localInput.isValid ())) {
            falso retorno;
        }
        unidades = normalizarUnidades (unidades) || 'milisegundo';
        si (unidades === 'milisegundos') {
            devuelve this.valueOf () <localInput.valueOf ();
        } else {
            devuelve this.clone (). endOf (units) .valueOf () <localInput.valueOf ();
        }
    }

    la función está entre (de, a, unidades, inclusividad) {
        var localFrom = isMoment (from)? desde: createLocal (desde),
            localTo = isMoment (to)? to: createLocal (to);
        if (! (this.isValid () && localFrom.isValid () && localTo.isValid ())) {
            falso retorno;
        }
        inclusividad = inclusividad || '()';
        return (inclusivity [0] === '('? this.isAfter (localFrom, units):! this.isBefore (localFrom, units)) &&
            (inclusividad [1] === ')'? this.isBefore (localTo, units):! this.isAfter (localTo, units));
    }

    función es igual (entrada, unidades) {
        var localInput = isMoment (input)? entrada: createLocal (entrada),
            inputMs;
        if (! (this.isValid () && localInput.isValid ())) {
            falso retorno;
        }
        unidades = normalizarUnidades (unidades) || 'milisegundo';
        si (unidades === 'milisegundos') {
            devuelve this.valueOf () === localInput.valueOf ();
        } else {
            inputMs = localInput.valueOf ();
            return this.clone (). startOf (units) .valueOf () <= inputMs && inputMs <= this.clone (). endOf (units) .valueOf ();
        }
    }

    función isSameOrAfter (entrada, unidades) {
        devuelve this.isSame (entrada, unidades) || this.isAfter (entrada, unidades);
    }

    función esSameOrBefore (entrada, unidades) {
        devuelve this.isSame (entrada, unidades) || this.isBefore (entrada, unidades);
    }

    Función diff (entrada, unidades, asFloat) {
        var eso
            zoneDelta,
            salida;

        if (! this.isValid ()) {
            devuelve NaN;
        }

        that = cloneWithOffset (entrada, esto);

        if (! that.isValid ()) {
            devuelve NaN;
        }

        zoneDelta = (that.utcOffset () - this.utcOffset ()) * 6e4;

        unidades = unidades normalizadas (unidades);

        interruptor (unidades) {
            caso 'año': salida = monthDiff (this, that) / 12; descanso;
            case 'month': output = monthDiff (this, that); descanso;
            case 'quarter': output = monthDiff (this, that) / 3; descanso;
            caso 'segundo': salida = (esto - eso) / 1e3; descanso; // 1000
            caso 'minuto': salida = (esto - eso) / 6e4; descanso; // 1000 * 60
            caso 'hora': salida = (esto - eso) / 36e5; descanso; // 1000 * 60 * 60
            caso 'day': output = (this - that - zoneDelta) / 864e5; descanso; // 1000 * 60 * 60 * 24, negar dst
            case 'week': output = (this - that - zoneDelta) / 6048e5; descanso; // 1000 * 60 * 60 * 24 * 7, negate dst
            por defecto: output = this - that;
        }

        volver como flote? salida: absFloor (salida);
    }

    función monthDiff (a, b) {
        // diferencia en meses
        var wholeMonthDiff = ((b.year () - a.year ()) * 12) + (b.month () - a.month ()),
            // b está en (ancla - 1 mes, ancla + 1 mes)
            anchor = a.clone (). add (wholeMonthDiff, 'months'),
            ancla2, ajustar;

        si (b - ancla <0) {
            anchor2 = a.clone (). add (wholeMonthDiff - 1, 'months');
            // lineal en todo el mes
            ajustar = (b - ancla) / (ancla - ancla2);
        } else {
            anchor2 = a.clone (). add (wholeMonthDiff + 1, 'months');
            // lineal en todo el mes
            ajustar = (b - ancla) / (ancla2 - ancla);
        }

        // comprueba el cero negativo, devuelve cero si el negativo es cero
        return - (wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH: mm: ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH: mm: ss [Z]';

    función toString () {
        devuelva this.clone (). locale ('en'). format ('ddd MMM DD YYYY HH: mm: ss [GMT] ZZ');
    }

    función toISOString (keepOffset) {
        if (! this.isValid ()) {
            retorno nulo
        }
        var utc = keepOffset! == true;
        var m = utc? this.clone (). utc (): this;
        if (m.year () <0 || m.year ()> 9999) {
            devuelva formatMoment (m, utc? 'YYYYYY-MM-DD [T] HH: mm: ss.SSS [Z]': 'YYYYYY-MM-DD [T] HH: mm: ss.SSSZ');
        }
        if (isFunction (Date.prototype.toISOString)) {
            // la implementación nativa es ~ 50x más rápida, úsala cuando podamos
            if (utc) {
                devuelve this.toDate (). toISOString ();
            } else {
                devolver la nueva fecha (this.valueOf () + this.utcOffset () * 60 * 1000) .toISOString (). replace ('Z', formatMoment (m, 'Z'));
            }
        }
        devuelva formatMoment (m, utc? 'YYYY-MM-DD [T] HH: mm: ss.SSS [Z]': 'YYYY-MM-DD [T] HH: mm: ss.SSSZ');
    }

    / **
     * Devuelve una representación humana legible de un momento que puede
     * También se evaluará para obtener un nuevo momento que sea el mismo.
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     * /
    función inspeccionar () {
        if (! this.isValid ()) {
            devuelve 'moment.invalid (/ *' + this._i + '* /)';
        }
        var func = 'momento';
        var zone = '';
        if (! this.isLocal ()) {
            func = this.utcOffset () === 0? 'moment.utc': 'moment.parseZone';
            zona = 'Z';
        }
        prefijo var = '[' + func + '("]';
        var año = (0 <= this.year () && this.year () <= 9999)? 'YYYY': 'YYYYYY';
        var datetime = '-MM-DD [T] HH: mm: ss.SSS';
        var sufijo = zona + '[")]';

        devuelva this.format (prefijo + año + datetime + sufijo);
    }

    formato de función (inputString) {
        if (! inputString) {
            inputString = this.isUtc ()? hooks.defaultFormatUtc: hooks.defaultFormat;
        }
        var output = formatMoment (this, inputString);
        devuelve this.localeData (). postformat (salida);
    }

    función desde (tiempo, sin Suffix) {
        if (this.isValid () &&
                ((isMoment (time) && time.isValid ()) ||
                 createLocal (time) .isValid ())) {
            devuelve createDuration ({a: this, from: time}). locale (this.locale ()). humanize (! withoutSuffix);
        } else {
            devuelve this.localeData (). invalidDate ();
        }
    }

    función fromNow (withoutSuffix) {
        devuelve this.from (createLocal (), withoutSuffix);
    }

    función a (tiempo, sin Suffix) {
        if (this.isValid () &&
                ((isMoment (time) && time.isValid ()) ||
                 createLocal (time) .isValid ())) {
            devuelva createDuration ({from: this, to: time}). locale (this.locale ()). humanize (! withoutSuffix);
        } else {
            devuelve this.localeData (). invalidDate ();
        }
    }

    funcion toNow (withoutSuffix) {
        devuelve this.to (createLocal (), withoutSuffix);
    }

    // Si se pasa una clave de configuración regional, establecerá la configuración regional para esto
    // instancia. De lo contrario, devolverá la configuración regional.
    // variables para esta instancia.
    función local (clave) {
        var newLocaleData;

        if (clave === indefinido) {
            devuelve this._locale._abbr;
        } else {
            newLocaleData = getLocale (clave);
            if (newLocaleData! = null) {
                this._locale = newLocaleData;
            }
            devuelve esto
        }
    }

    var lang = deprecate (
        'moment (). lang () está en desuso. En su lugar, use moment (). LocaleData () para obtener la configuración del idioma. Use moment (). Locale () para cambiar los idiomas. ',
        tecla de función) {
            if (clave === indefinido) {
                devuelve this.localeData ();
            } else {
                devuelve this.locale (clave);
            }
        }
    );

    función localeData () {
        devuelve this._locale;
    }

    var MS_PER_SECOND = 1000;
    var MS_PER_MINUTE = 60 * MS_PER_SECOND;
    var MS_PER_HOUR = 60 * MS_PER_MINUTE;
    var MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

    // módulo real - maneja números negativos (para fechas anteriores a 1970):
    función mod $ 1 (dividendo, divisor) {
        retorno (dividendo% divisor + divisor)% divisor;
    }

    función localStartOfDate (y, m, d) {
        // el constructor de fecha remapsea los años 0-99 a 1900-1999
        si (y <100 && y> = 0) {
            // preservar los años bisiestos utilizando un ciclo completo de 400 años, luego reiniciar
            devolver nueva fecha (y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            devolver nueva fecha (y, m, d) .valueOf ();
        }
    }

    función utcStartOfDate (y, m, d) {
        // Date.UTC remapsea los años 0-99 a 1900-1999
        si (y <100 && y> = 0) {
            // preservar los años bisiestos utilizando un ciclo completo de 400 años, luego reiniciar
            devuelva Date.UTC (y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            fecha de retorno.UTC (y, m, d);
        }
    }

    función startOf (unidades) {
        tiempo var
        unidades = unidades normalizadas (unidades);
        if (units === undefined || units === 'milisegundos' ||! this.isValid ()) {
            devuelve esto
        }

        var startOfDate = this._isUTC? utcStartOfDate: localStartOfDate;

        interruptor (unidades) {
            caso 'año':
                time = startOfDate (this.year (), 0, 1);
                descanso;
            caso 'trimestre':
                time = startOfDate (this.year (), this.month () - this.month ()% 3, 1);
                descanso;
            caso 'mes':
                time = startOfDate (this.year (), this.month (), 1);
                descanso;
            caso 'semana':
                time = startOfDate (this.year (), this.month (), this.date () - this.weekday ());
                descanso;
            caso 'isoWeek':
                time = startOfDate (this.year (), this.month (), this.date () - (this.isoWeekday () - 1));
                descanso;
            caso 'día':
            caso 'fecha':
                time = startOfDate (this.year (), this.month (), this.date ());
                descanso;
            caso 'hora':
                time = this._d.valueOf ();
                tiempo - = mod $ 1 (tiempo + (this._isUTC? 0: this.utcOffset () * MS_PER_MINUTE), MS_PER_HOUR);
                descanso;
            caso 'minuto':
                time = this._d.valueOf ();
                tiempo - = mod $ 1 (tiempo, MS_PER_MINUTE);
                descanso;
            caso 'segundo':
                time = this._d.valueOf ();
                tiempo - = mod $ 1 (tiempo, MS_PER_SECOND);
                descanso;
        }

        this._d.setTime (tiempo);
        hooks.updateOffset (this, true);
        devuelve esto
    }

    función endOf (unidades) {
        tiempo var
        unidades = unidades normalizadas (unidades);
        if (units === undefined || units === 'milisegundos' ||! this.isValid ()) {
            devuelve esto
        }

        var startOfDate = this._isUTC? utcStartOfDate: localStartOfDate;

        interruptor (unidades) {
            caso 'año':
                time = startOfDate (this.year () + 1, 0, 1) - 1;
                descanso;
            caso 'trimestre':
                time = startOfDate (this.year (), this.month () - this.month ()% 3 + 3, 1) - 1;
                descanso;
            caso 'mes':
                time = startOfDate (this.year (), this.month () + 1, 1) - 1;
                descanso;
            caso 'semana':
                time = startOfDate (this.year (), this.month (), this.date () - this.weekday () + 7) - 1;
                descanso;
            caso 'isoWeek':
                time = startOfDate (this.year (), this.month (), this.date () - (this.isoWeekday () - 1) + 7) - 1;
                descanso;
            caso 'día':
            caso 'fecha':
                time = startOfDate (this.year (), this.month (), this.date () + 1) - 1;
                descanso;
            caso 'hora':
                time = this._d.valueOf ();
                tiempo + = MS_PER_HOUR - mod $ 1 (tiempo + (this._isUTC? 0: this.utcOffset () * MS_PER_MINUTE), MS_PER_HOUR) - 1;
                descanso;
            caso 'minuto':
                time = this._d.valueOf ();
                tiempo + = MS_PER_MINUTE - mod $ 1 (tiempo, MS_PER_MINUTE) - 1;
                descanso;
            caso 'segundo':
                time = this._d.valueOf ();
                tiempo + = MS_PER_SECOND - mod $ 1 (tiempo, MS_PER_SECOND) - 1;
                descanso;
        }

        this._d.setTime (tiempo);
        hooks.updateOffset (this, true);
        devuelve esto
    }

    función valueOf () {
        devuelve this._d.valueOf () - ((this._offset || 0) * 60000);
    }

    función unix () {
        devuelve Math.floor (this.valueOf () / 1000);
    }

    función toDate () {
        devolver nueva fecha (this.valueOf ());
    }

    función toArray () {
        var m = esto;
        return [m.year (), m.month (), m.date (), m.hour (), m.minute (), m.second (), m.millisecond ()];
    }

    función toObject () {
        var m = esto;
        regreso {
            años: m.year (),
            meses: m.month (),
            fecha: m.date (),
            horas: m. horas (),
            minutos: m.minutos (),
            segundos: m.seconds (),
            milisegundos: m.millisegundos ()
        };
    }

    función toJSON () {
        // nueva fecha (NaN) .toJSON () === null
        devuelve this.isValid ()? this.toISOString (): null;
    }

    la función es valida $ 2 () {
        devuelve isValid (this);
    }

    función parsingFlags () {
        return extend ({}, getParsingFlags (this));
    }

    función invalidAt () {
        devuelve getParsingFlags (this) .overflow;
    }

    función creationData () {
        regreso {
            entrada: esto._i,
            formato: esto._f,
            locale: this._locale,
            isUTC: this._isUTC,
            estricto: this._strict
        };
    }

    // FORMATEANDO

    addFormatToken (0, ['gg', 2], 0, function () {
        devuelve this.weekYear ()% 100;
    });

    addFormatToken (0, ['GG', 2], 0, function () {
        devuelve this.isoWeekYear ()% 100;
    });

    función addWeekYearFormatToken (token, getter) {
        addFormatToken (0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken ('gggg', 'weekYear');
    addWeekYearFormatToken ('ggggg', 'weekYear');
    addWeekYearFormatToken ('GGGG', 'isoWeekYear');
    addWeekYearFormatToken ('GGGGG', 'isoWeekYear');

    // ALIAS

    addUnitAlias ??('weekYear', 'gg');
    addUnitAlias ??('isoWeekYear', 'GG');

    // PRIORIDAD

    addUnitPriority ('weekYear', 1);
    addUnitPriority ('isoWeekYear', 1);


    // PARSING

    addRegexToken ('G', matchSigned);
    addRegexToken ('g', matchSigned);
    addRegexToken ('GG', match1to2, match2);
    addRegexToken ('gg', match1to2, match2);
    addRegexToken ('GGGG', match1to4, match4);
    addRegexToken ('gggg', match1to4, match4);
    addRegexToken ('GGGGG', match1to6, match6);
    addRegexToken ('ggggg', match1to6, match6);

    addWeekParseToken (['gggg', 'ggggg', 'GGGG', 'GGGGG'], función (entrada, semana, config, token) {
        semana [token.substr (0, 2)] = toInt (entrada);
    });

    addWeekParseToken (['gg', 'GG'], función (entrada, semana, configuración, token) {
        semana [token] = hooks.parseTwoDigitYear (entrada);
    });

    // MOMENTOS

    función getSetWeekYear (entrada) {
        devuelve getSetWeekYearHelper.call (esto,
                entrada,
                esta semana(),
                este.weekday (),
                this.localeData () ._ week.dow,
                this.localeData () ._ week.doy);
    }

    función getSetISOWeekYear (entrada) {
        devuelve getSetWeekYearHelper.call (esto,
                entrada, this.isoWeek (), this.isoWeekday (), 1, 4);
    }

    función getISOWeeksInYear () {
        return weeksInYear (this.year (), 1, 4);
    }

    función getWeeksInYear () {
        var weekInfo = this.localeData () ._ week;
        return weeksInYear (this.year (), weekInfo.dow, weekInfo.doy);
    }

    función getSetWeekYearHelper (entrada, semana, día de la semana, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear (this, dow, doy) .year;
        } else {
            weeksTarget = weeksInYear (input, dow, doy);
            if (week> weeksTarget) {
                semana = weekTarget;
            }
            devuelve setWeekAll.call (esto, entrada, semana, día de la semana, dow, doy);
        }
    }

    función setWeekAll (weekYear, week, week, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks (weekYear, week, week, dow, doy),
            date = createUTCDate (dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year (date.getUTCFullYear ());
        this.month (date.getUTCMonth ());
        this.date (date.getUTCDate ());
        devuelve esto
    }

    // FORMATEANDO

    addFormatToken ('Q', 0, 'Qo', 'quarter');

    // ALIAS

    addUnitAlias ??('quarter', 'Q');

    // PRIORIDAD

    addUnitPriority ('quarter', 7);

    // PARSING

    addRegexToken ('Q', match1);
    addParseToken ('Q', función (entrada, matriz) {
        array [MES] = (toInt (entrada) - 1) * 3;
    });

    // MOMENTOS

    función getSetQuarter (entrada) {
        retorno de entrada == nulo? Math.ceil ((this.month () + 1) / 3): this.month ((input - 1) * 3 + this.month ()% 3);
    }

    // FORMATEANDO

    addFormatToken ('D', ['DD', 2], 'Do', 'fecha');

    // ALIAS

    addUnitAlias ??('date', 'D');

    // PRIORIDAD
    addUnitPriority ('date', 9);

    // PARSING

    addRegexToken ('D', match1to2);
    addRegexToken ('DD', match1to2, match2);
    addRegexToken ('Hacer', función (isStrict, locale) {
        // TODO: Elimina el retroceso "ordinalParse" en la próxima versión principal.
        volver isStrict?
          (locale._dayOfMonthOrdinalParse || locale._ordinalParse):
          locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken (['D', 'DD'], DATE);
    addParseToken ('Hacer', función (entrada, matriz) {
        array [DATE] = toInt (input.match (match1to2) [0]);
    });

    // MOMENTOS

    var getSetDayOfMonth = makeGetSet ('Date', true);

    // FORMATEANDO

    addFormatToken ('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIAS

    addUnitAlias ??('dayOfYear', 'DDD');

    // PRIORIDAD
    addUnitPriority ('dayOfYear', 4);

    // PARSING

    addRegexToken ('DDD', match1to3);
    addRegexToken ('DDDD', match3);
    addParseToken (['DDD', 'DDDD'], función (entrada, matriz, configuración) {
        config._dayOfYear = toInt (entrada);
    });

    // ayudantes

    // MOMENTOS

    función getSetDayOfYear (entrada) {
        var dayOfYear = Math.round ((this.clone (). startOf ('day') - this.clone (). startOf ('year')) / 864e5) + 1;
        retorno de entrada == nulo? dayOfYear: this.add ((input - dayOfYear), 'd');
    }

    // FORMATEANDO

    addFormatToken ('m', ['mm', 2], 0, 'minuto');

    // ALIAS

    addUnitAlias ??('minuto', 'm');

    // PRIORIDAD

    addUnitPriority ('minuto', 14);

    // PARSING

    addRegexToken ('m', match1to2);
    addRegexToken ('mm', match1to2, match2);
    addParseToken (['m', 'mm'], MINUTE);

    // MOMENTOS

    var getSetMinute = makeGetSet ('Minutes', false);

    // FORMATEANDO

    addFormatToken ('s', ['ss', 2], 0, 'second');

    // ALIAS

    addUnitAlias ??('second', 's');

    // PRIORIDAD

    addUnitPriority ('segundo', 15);

    // PARSING

    addRegexToken ('s', match1to2);
    addRegexToken ('ss', match1to2, match2);
    addParseToken (['s', 'ss'], SECOND);

    // MOMENTOS

    var getSetSecond = makeGetSet ('Segundos', falso);

    // FORMATEANDO

    addFormatToken ('S', 0, 0, function () {
        devuelve ~~ (this.millisecond () / 100);
    });

    addFormatToken (0, ['SS', 2], 0, function () {
        devuelve ~~ (this.millisecond () / 10);
    });

    addFormatToken (0, ['SSS', 3], 0, 'milisegundos');
    addFormatToken (0, ['SSSS', 4], 0, function () {
        devuelve this.millisecond () * 10;
    });
    addFormatToken (0, ['SSSSS', 5], 0, function () {
        devuelve this.millisecond () * 100;
    });
    addFormatToken (0, ['SSSSSS', 6], 0, function () {
        devuelve this.millisecond () * 1000;
    });
    addFormatToken (0, ['SSSSSSS', 7], 0, function () {
        devuelve this.millisecond () * 10000;
    });
    addFormatToken (0, ['SSSSSSSS', 8], 0, function () {
        devuelve this.millisecond () * 100000;
    });
    addFormatToken (0, ['SSSSSSSSS', 9], 0, function () {
        devuelve this.millisecond () * 1000000;
    });


    // ALIAS

    addUnitAlias ??('milisegundos', 'ms');

    // PRIORIDAD

    addUnitPriority ('milisegundos', 16);

    // PARSING

    addRegexToken ('S', match1to3, match1);
    addRegexToken ('SS', match1to3, match2);
    addRegexToken ('SSS', match1to3, match3);

    token var
    para (token = 'SSSS'; token.length <= 9; token + = 'S') {
        addRegexToken (token, matchUnsigned);
    }

    función parseMs (entrada, matriz) {
        array [MILLISECOND] = toInt (('0.' + input) * 1000);
    }

    para (token = 'S'; token.length <= 9; token + = 'S') {
        addParseToken (token, parseMs);
    }
    // MOMENTOS

    var getSetMillisecond = makeGetSet ('Milliseconds', false);

    // FORMATEANDO

    addFormatToken ('z', 0, 0, 'zoneAbbr');
    addFormatToken ('zz', 0, 0, 'zoneName');

    // MOMENTOS

    función getZoneAbbr () {
        devuelve esto._isUTC? 'UTC' : '';
    }

    función getZoneName () {
        devuelve esto._isUTC? 'Tiempo Universal Coordinado': '';
    }

    var proto = Momento.prototipo;

    proto.add = agregar;
    proto.calendar = calendario $ 1;
    proto.clone = clon;
    proto.diff = diff;
    proto.endOf = endOf;
    proto.format = formato;
    proto.from = from;
    proto.fromNow = fromNow;
    proto.to = a;
    proto.toNow = toNow;
    proto.get = stringGet;
    proto.invalidAt = invalidAt;
    proto.isAfter = isAfter;
    proto.isBefore = isBefore;
    proto.isBetween = isBetween;
    proto.isSame = isSame;
    proto.isSameOrAfter = isSameOrAfter;
    proto.isSameOrBefore = isSameOrBefore;
    proto.isValid = isValid $ 2;
    proto.lang = lang;
    proto.locale = locale;
    proto.localeData = localeData;
    proto.max = prototypeMax;
    proto.min = prototypeMin;
    proto.parsingFlags = parsingFlags;
    proto.set = stringSet;
    proto.startOf = startOf;
    proto.subtract = restar;
    proto.toArray = toArray;
    proto.toObject = toObject;
    proto.toDate = toDate;
    proto.toISOString = toISOString;
    proto.inspect = inspeccionar;
    proto.toJSON = toJSON;
    proto.toString = toString;
    proto.unix = unix;
    proto.valueOf = valueOf;
    proto.creationData = creationData;
    proto.year = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week = proto.weeks = getSetWeek;
    proto.isoWeek = proto.isoWeeks = getSetISOWeek;
    proto.weeksInYear = getWeeksInYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.date = getSetDayOfMonth;
    proto.day = proto.days = getSetDayOfWeek;
    proto.weekday = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset = getSetOffset;
    proto.utc = setOffsetToUTC;
    proto.local = setOffsetToLocal;
    proto.parseZone = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST = isDaylightSavingTime;
    proto.isLocal = isLocal;
    proto.isUtcOffset = isUtcOffset;
    proto.isUtc = isUtc;
    proto.isUTC = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates = desprecate ('las fechas en que se desactiva el acceso. Use date en su lugar.', getSetDayOfMonth);
    proto.months = desprecate ('mes accesor está en desuso. Use month en su lugar', getSetMonth);
    proto.years = deprecate ('year accessor está en desuso. Use year en su lugar', getSetYear);
    proto.zone = deprecate ('moment (). zone está en desuso, use moment (). utcOffset en su lugar. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
    proto.isDSTShifted = deprecate ('isDSTShifted está en desuso. Consulte http://momentjs.com/guides/#/warnings/dst-shifted/ para obtener más información', isDaylightSavingTimeShifted);

    función createUnix (entrada) {
        return createLocal (input * 1000);
    }

    función createInZone () {
        devuelve createLocal.apply (null, argumentos) .parseZone ();
    }

    función preParsePostFormat (cadena) {
        cadena de retorno
    }

    var proto $ 1 = Locale.prototype;

    proto $ 1.calendar = calendario;
    proto $ 1.longDateFormat = longDateFormat;
    proto $ 1.invalidDate = invalidD ate;
    proto $ 1.ordinal = ordinal;
    proto $ 1.preparse = preParsePostFormat;
    proto $ 1.postformat = preParsePostFormat;
    proto $ 1.relativeTime = relativeTime;
    proto $ 1.pastFuture = pastFuture;
    proto $ 1.set = set;

    proto $ 1.months = localeMonths;
    proto $ 1.monthsShort = localeMonthsShort;
    proto $ 1.monthsParse = localeMonthsParse;
    proto $ 1.monthsRegex = monthsRegex;
    proto $ 1.monthsShortRegex = monthsShortRegex;
    proto $ 1. semana = localeWeek;
    proto $ 1.firstDayOfYear = localeFirstDayOfYear;
    proto $ 1.firstDayOfWeek = localeFirstDayOfWeek;

    proto $ 1.weekdays = localeWeekdays;
    proto $ 1.weekdaysMin = localeWeekdaysMin;
    proto $ 1.weekdaysShort = localeWeekdaysShort;
    proto $ 1.weekdaysParse = localeWeekdaysParse;

    proto $ 1.weekdaysRegex = weekdaysRegex;
    proto $ 1.weekdaysShortRegex = weekdaysShortRegex;
    proto $ 1.weekdaysMinRegex = weekdaysMinRegex;

    proto $ 1.isPM = localeIsPM;
    proto $ 1.meridiem = localeMeridiem;

    función obtener $ 1 (formato, índice, campo, configurador) {
        var locale = getLocale ();
        var utc = createUTC (). set (setter, index);
        configuración regional de retorno [campo] (utc, formato);
    }

    función listMonthsImpl (formato, índice, campo) {
        if (esNúmero (formato)) {
            índice = formato;
            formato = indefinido;
        }

        formato = formato || '';

        if (index! = null) {
            devuelva obtener $ 1 (formato, índice, campo, 'mes');
        }

        var i;
        var out = [];
        para (i = 0; i <12; i ++) {
            out [i] = obtener $ 1 (formato, i, campo, 'mes');
        }
        volver fuera
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (cierto)
    // (verdadero, 5)
    // (verdadero, fmt, 5)
    // (verdadero, fmt)
    función listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (esNúmero (formato)) {
                índice = formato;
                formato = indefinido;
            }

            formato = formato || '';
        } else {
            formato = localeSorted;
            índice = formato;
            localeSorted = false;

            if (esNúmero (formato)) {
                índice = formato;
                formato = indefinido;
            }

            formato = formato || '';
        }

        var locale = getLocale (),
            shift = localeSorted? locale._week.dow: 0;

        if (index! = null) {
            retorno obtenga $ 1 (formato, (índice + turno)% 7, campo, 'día');
        }

        var i;
        var out = [];
        para (i = 0; i <7; i ++) {
            out [i] = obtiene $ 1 (formato, (i + shift)% 7, campo, 'día');
        }
        volver fuera
    }

    función listMonths (formato, índice) {
        return listMonthsImpl (formato, índice, 'meses');
    }

    función listMonthsShort (formato, índice) {
        return listMonthsImpl (formato, índice, 'monthsShort');
    }

    función listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl (localeSorted, format, index, 'weekdays');
    }

    función listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl (localeSorted, format, index, 'weekdaysShort');
    }

    función listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl (localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale ('en', {
        dayOfMonthOrdinalParse: / \ d {1,2} (th | st | nd | rd) /,
        ordinal: función (número) {
            var b = número% 10,
                salida = (toInt (número% 100/10) === 1)? 'th':
                (b === 1)? 'S t' :
                (b === 2)? 'nd':
                (b === 3)? 'rd': 'th';
            número de retorno + salida;
        }
    });

    // Importaciones de efectos secundarios

    hooks.lang = deprecate ('moment.lang está en desuso. Use moment.locale en su lugar.', getSetGlobalLocale);
    hooks.langData = deprecate ('moment.langData está en desuso. Use moment.localeData en su lugar.', getLocale);

    var mathAbs = Math.abs;

    función abs () {
        var data = this._data;

        this._milliseconds = mathAbs (this._milliseconds);
        this._days = mathAbs (this._days);
        this._months = mathAbs (this._months);

        data.milliseconds = mathAbs (data.milliseconds);
        data.seconds = mathAbs (data.seconds);
        data.minutes = mathAbs (data.minutes);
        data.hours = mathAbs (data.hours);
        data.months = mathAbs (data.months);
        data.years = mathAbs (data.years);

        devuelve esto
    }

    función addSubtract $ 1 (duración, entrada, valor, dirección) {
        var other = createDuration (entrada, valor);

        duration._milliseconds + = direction * other._milliseconds;
        duration._days + = direction * other._days;
        duration._months + = direction * other._months;

        duration duration._bubble ();
    }

    // admite solo agregar estilo 2.0 (1, 's') o agregar (duración)
    función agregar $ 1 (entrada, valor) {
        devuelve addSubtract $ 1 (esto, entrada, valor, 1);
    }

    // admite solo restar de estilo 2.0 (1, 's') o restar (duración)
    función restar $ 1 (entrada, valor) {
        devuelve addSubtract $ 1 (esto, entrada, valor, -1);
    }

    función absCeil (número) {
        si (número <0) {
            volver Math.floor (número);
        } else {
            volver Math.ceil (número);
        }
    }

    burbuja de función () {
        var milisegundos = this._milliseconds;
        var días = esto._days;
        meses var = esto._months;
        var data = this._data;
        var segundos, minutos, horas, años, meses a partir de los días;

        // si tenemos una mezcla de valores positivos y negativos, primero reduzca la burbuja
        // consultar: https://github.com/moment/moment/issues/2166
        if (! ((milisegundos> = 0 y & días> = 0 y & meses> = 0) ||
                (milisegundos <= 0 && días <= 0 && meses <= 0))) {
            milisegundos + = absCeil (monthsToDays (months) + days) * 864e5;
            días = 0;
            meses = 0;
        }

        // El siguiente código aumenta los valores, vea las pruebas para
        // ejemplos de lo que eso significa.
        data.milliseconds = milisegundos% 1000;

        segundos = absFloor (milisegundos / 1000);
        data.seconds = segundos% 60;

        minutos = absFloor (segundos / 60);
        data.minutes = minutes% 60;

        horas = absFloor (minutos / 60);
        data.hours = horas% 24;

        días + = absFloor (horas / 24);

        // convertir días a meses
        monthsFromDays = absFloor (daysToMonths (days));
        meses + = mesesDe dias;
        días - = absCeil (monthsToDays (monthsFromDays));

        // 12 meses -> 1 año
        años = absFloor (meses / 12);
        meses% = 12;

        data.days = días;
        data.months = meses;
        data.years = años;

        devuelve esto
    }

    función daysToMonths (days) {
        // 400 años tienen 146097 días (teniendo en cuenta las reglas del año bisiesto)
        // 400 años tienen 12 meses === 4800
        días de regreso * 4800/146097;
    }

    función monthsToDays (months) {
        // el reverso de daysToMonths
        meses de retorno * 146097/4800;
    }

    funcionar como (unidades) {
        if (! this.isValid ()) {
            devuelve NaN;
        }
        días var;
        meses var
        var milisegundos = this._milliseconds;

        unidades = unidades normalizadas (unidades);

        if (unidades === 'mes' || unidades === 'trimestre' || unidades === 'año') {
            days = this._days + milisegundos / 864e5;
            meses = this._months + daysToMonths (days);
            interruptor (unidades) {
                caso 'mes': retorno meses;
                caso 'trimestre': retorno meses / 3;
                caso 'año': retorno meses / 12;
            }
        } else {
            // manejan los milisegundos por separado debido a errores matemáticos de punto flotante (número de problema 1867)
            days = this._days + Math.round (monthsToDays (this._months));
            interruptor (unidades) {
                caso 'semana': días de retorno / 7 + milisegundos / 6048e5;
                caso 'día': días de retorno + milisegundos / 864e5;
                caso 'hora': días de retorno * 24 + milisegundos / 36e5;
                caso 'minuto': días de retorno * 1440 + milisegundos / 6e4;
                caso 'segundo': días de retorno * 86400 + milisegundos / 1000;
                // Math.floor evita errores matemáticos de punto flotante aquí
                caso 'milisegundo': devolver Math.floor (días * 864e5) + milisegundos;
                por defecto: lanzar un nuevo error ('Unidad desconocida' + unidades);
            }
        }
    }

    // TODO: Use this.as ('ms')?
    función valueOf $ 1 () {
        if (! this.isValid ()) {
            devuelve NaN;
        }
        regreso (
            esto._millisegundos +
            esto._days * 864e5 +
            (this._months% 12) * 2592e6 +
            toInt (this._months / 12) * 31536e6
        );
    }

    función makeAs (alias) {
        función de retorno () {
            devuelve this.as (alias);
        };
    }

    var asMillisegundos = makeAs ('ms');
    var asSeconds = makeAs ('s');
    var asMinutes = makeAs ('m');
    var asHours = makeAs ('h');
    var asDays = makeAs ('d');
    var asWeeks = makeAs ('w');
    var asMonths = makeAs ('M');
    var asQuarters = makeAs ('Q');
    var asYears = makeAs ('y');

    función de clonación $ 1 () {
        devuelve createDuration (this);
    }

    función obtener $ 2 (unidades) {
        unidades = unidades normalizadas (unidades);
        devuelve this.isValid ()? este [unidades + 's'] (): NaN;
    }

    función makeGetter (nombre) {
        función de retorno () {
            devuelve this.isValid ()? this._data [nombre]: NaN;
        };
    }

    var milisegundos = makeGetter ('milisegundos');
    var segundos = makeGetter ('segundos');
    var minutes = makeGetter ('minutos');
    var horas = makeGetter ('horas');
    var días = makeGetter ('días');
    var meses = makeGetter ('meses');
    var years = makeGetter ('years');

    función semanas () {
        devuelve absFloor (this.days () / 7);
    }

    var round = Math.round;
    umbrales var = {
        ss: 44, // unos segundos a segundos
        s: 45, // segundos a minuto
        m: 45, // minutos a la hora
        h: 22, // horas al día
        d: 26, // dias a mes
        M: 11 // meses a año
    };

    // función auxiliar para moment.fn.from, moment.fn.fromNow y moment.duration.fn.humanize
    function replacementTimeAgo (cadena, número, sinSuffix, isFuture, locale) {
        return locale.relativeTime (número || 1, !! withoutSuffix, string, isFuture);
    }

    function relativeTime $ 1 (posNegDuration, withoutSuffix, locale) {
        var duration = createDuration (posNegDuration) .abs ();
        var segundos = round (duration.as ('s'));
        minutos var = round (duration.as ('m'));
        var horas = round (duration.as ('h'));
        días var = round (duration.as ('d'));
        var meses = ronda (duration.as ('M'));
        var years = round (duration.as ('y'));

        var a = segundos <= thresholds.ss && ['s', segundos] ||
                segundos <thresholds.s && ['ss', segundos] ||
                minutos <= 1 && ['m'] ||
                minutos <thresholds.m && ['mm', minutos] ||
                horas <= 1 && ['h'] ||
                horas <thresholds.h && ['hh', horas] ||
                días <= 1 && ['d'] ||
                días <thresholds.d && ['dd', días] ||
                meses <= 1 && ['M'] ||
                meses <umbrales.M && ['MM', meses] ||
                años <= 1 && ['y'] || ['yy', años];

        a [2] = sin Suffix;
        a [3] = + posNegDuration> 0;
        a [4] = locale;
        return replaceTimeAgo.apply (null, a);
    }

    // Esta función le permite configurar la función de redondeo para cadenas de tiempo relativas
    función getSetRelativeTimeRounding (roundingFunction) {
        if (roundingFunction === undefined) {
            vuelta redonda
        }
        if (typeof (roundingFunction) === 'function') {
            round = roundingFunction;
            devuelve verdadero
        }
        falso retorno;
    }

    // Esta función le permite establecer un umbral para cadenas de tiempo relativas
    función getSetRelativeTimeThreshold (umbral, límite) {
        si (umbrales [umbral] === indefinido) {
            falso retorno;
        }
        if (límite === indefinido) {
            umbrales de retorno [umbral];
        }
        umbrales [umbral] = límite;
        si (umbral === 's') {
            umbral.ss = límite - 1;
        }
        devuelve verdadero
    }

    función humanizar (con sufijo) {
        if (! this.isValid ()) {
            devuelve this.localeData (). invalidDate ();
        }

        var locale = this.localeData ();
        var output = relativeTime $ 1 (esto,! withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture (+ this, output);
        }

        return locale.postformat (salida);
    }

    var abs $ 1 = Math.abs;

    signo de función (x) {
        retorno ((x> 0) - (x <0)) || + x;
    }

    función toISOString $ 1 () {
        // para las cadenas ISO no usamos las reglas normales de propagación:
        // * milisegundos burbujean hasta que se convierten en horas
        // * los días no burbujean en absoluto
        // * los meses suben hasta que se convierten en años
        // Esto se debe a que no hay una conversión libre de contexto entre horas y días
        // (piensa en los cambios de reloj)
        // y tampoco entre días y meses (28-31 días por mes)
        if (! this.isValid ()) {
            devuelve this.localeData (). invalidDate ();
        }

        var seconds = abs $ 1 (this._milliseconds) / 1000;
        var días = abs $ 1 (this._days);
        meses var = abs $ 1 (this._months);
        var minutos, horas, años;

        // 3600 segundos -> 60 minutos -> 1 hora
        minutos = absFloor (segundos / 60);
        horas = absFloor (minutos / 60);
        segundos% = 60;
        minutos% = 60;

        // 12 meses -> 1 año
        años = absFloor (meses / 12);
        meses% = 12;


        // inspirado en https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = años;
        var M = meses;
        var D = días;
        var h = horas;
        var m = minutos;
        var s = segundos? seconds.toFixed (3) .replace (/ \.? 0 + $ /, ''): '';
        var total = this.asSegundos ();

        si (! total) {
            // esto es lo mismo que C # 's (Noda) y python (isodate) ...
            // pero no otro JS (goog.date)
            devuelve 'P0D';
        }

        var totalSign = total <0? '-': '';
        var ymSign = sign (this._months)! == sign (total)? '-': '';
        var daysSign = sign (this._days)! == sign (total)? '-': '';
        var hmsSign = sign (this._milliseconds)! ??== sign (total)? '-': '';

        devolver totalSign + 'P' +
            (Y? YmSign + Y + 'Y': '') +
            (M? YmSign + M + 'M': '') +
            (D? DaysSign + D + 'D': '') +
            ((h || m || s)? 'T': '') +
            (h? hmsSign + h + 'H': '') +
            (m? hmsSign + m + 'M': '') +
            (s? hmsSign + s + 'S': '');
    }

    var proto $ 2 = Duration.prototype;

    proto $ 2.isValid = isValid $ 1;
    proto $ 2.abs = abs;
    proto $ 2.add = agregar $ 1;
    proto $ 2.subtract = restar $ 1;
    proto $ 2.as = as;
    proto $ 2.asMilliseconds = asMilliseconds;
    proto $ 2.asSeconds = asSeconds;
    proto $ 2.asMinutes = asMinutes;
    proto $ 2.asHours = asHours;
    proto $ 2.asDays = asDays;
    proto $ 2.asWeeks = asWeeks;
    proto $ 2.asMonths = asMonths;
    proto $ 2.asQuarters = asQuarters;
    proto $ 2.asYears = asYears;
    proto $ 2.valueOf = valueOf $ 1;
    proto $ 2._bubble = burbuja;
    proto $ 2.clone = clone $ 1;
    proto $ 2.get = obtener $ 2;
    proto $ 2.milisegundos = milisegundos;
    proto $ 2.segundos = segundos;
    proto $ 2.minutos = minutos;
    proto $ 2.horas = horas;
    proto $ 2.days = days;
    proto $ 2.weeks = semanas;
    proto $ 2.meses = meses;
    proto $ 2.años = años;
    proto $ 2.humanizar = humanizar;
    proto $ 2.toISOString = toISOString $ 1;
    proto $ 2.toString = toISOString $ 1;
    proto $ 2.toJSON = toISOString $ 1;
    proto $ 2.locale = locale;
    proto $ 2.localeData = localeData;

    proto $ 2.toIsoString = deprecate ('toIsoString () está en desuso. Por favor, use toISOString () en su lugar (tenga en cuenta los capitales)', toISOString $ 1);
    proto $ 2.lang = lang;

    // Importaciones de efectos secundarios

    // FORMATEANDO

    addFormatToken ('X', 0, 0, 'unix');
    addFormatToken ('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken ('x', matchSigned);
    addRegexToken ('X', matchTimestamp);
    addParseToken ('X', función (entrada, matriz, configuración) {
        config._d = nueva Fecha (parseFloat (entrada, 10) * 1000);
    });
    addParseToken ('x', función (entrada, matriz, configuración) {
        config._d = nueva Fecha (toInt (entrada));
    });

    // Importaciones de efectos secundarios


    hooks.version = '2.24.0';

    setHookCallback (createLocal);

    hooks.fn = proto;
    hooks.min = min;
    hooks.max = max;
    hooks.now = ahora;
    hooks.utc = createUTC;
    hooks.unix = createUnix;
    hooks.months = listMonths;
    hooks.isDate = isDate;
    hooks.locale = getSetGlobalLocale;
    hooks.invalid = createInvalid;
    hooks.duration = createDuration;
    hooks.isMoment = isMoment;
    hooks.weekdays = listWeekdays;
    hooks.parseZone = createInZone;
    hooks.localeData = getLocale;
    hooks.isDuration = isDuration;
    hooks.monthsShort = listMonthsShort;
    hooks.weekdaysMin = listWeekdaysMin;
    hooks.defineLocale = defineLocale;
    hooks.updateLocale = updateLocale;
    hooks.locales = listLocales;
    hooks.weekdaysShort = listWeekdaysShort;
    hooks.normalizeUnits = normalizeUnits;
    hooks.relativeTimeRounding = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat = getCalendarFormat;
    hooks.prototype = proto;

    // actualmente el tipo de entrada HTML5 solo admite formatos de 24 horas
    ganchos.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH: mm', // <input type = "datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH: mm: ss', // <tipo de entrada = "datetime-local" paso = "1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH: mm: ss.SSS', // <input type = "datetime-local" step = "0.001" />
        FECHA: 'AAAA-MM-DD', // <tipo de entrada = "fecha" />
        TIME: 'HH: mm', // <input type = "time" />
        TIME_SECONDS: 'HH: mm: ss', // <input type = "time" step = "1" />
        TIME_MS: 'HH: mm: ss.SSS', // <input type = "time" step = "0.001" />
        SEMANA: 'GGGG- [W] WW', // <input type = "week" />
        MES: 'AAAA-MM' // <tipo de entrada = "mes" />
    };

    ganchos de retorno;

})));