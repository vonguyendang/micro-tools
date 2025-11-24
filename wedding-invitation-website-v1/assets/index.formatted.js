(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) i(a);
  new MutationObserver((a) => {
    for (const s of a)
      if (s.type === "childList")
        for (const l of s.addedNodes)
          l.tagName === "LINK" && l.rel === "modulepreload" && i(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(a) {
    const s = {};
    return (
      a.integrity && (s.integrity = a.integrity),
      a.referrerPolicy && (s.referrerPolicy = a.referrerPolicy),
      a.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : a.crossOrigin === "anonymous"
          ? (s.credentials = "omit")
          : (s.credentials = "same-origin"),
      s
    );
  }
  function i(a) {
    if (a.ep) return;
    a.ep = !0;
    const s = n(a);
    fetch(a.href, s);
  }
})();
var v1 =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof self < "u"
          ? self
          : {};
function lp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var rp = { exports: {} },
  Sr = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var y1 = Symbol.for("react.transitional.element"),
  x1 = Symbol.for("react.fragment");
function op(e, t, n) {
  var i = null;
  if (
    (n !== void 0 && (i = "" + n),
    t.key !== void 0 && (i = "" + t.key),
    "key" in t)
  ) {
    n = {};
    for (var a in t) a !== "key" && (n[a] = t[a]);
  } else n = t;
  return (
    (t = n.ref),
    { $$typeof: y1, type: e, key: i, ref: t !== void 0 ? t : null, props: n }
  );
}
Sr.Fragment = x1;
Sr.jsx = op;
Sr.jsxs = op;
rp.exports = Sr;
var g = rp.exports,
  up = { exports: {} },
  X = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var bc = Symbol.for("react.transitional.element"),
  b1 = Symbol.for("react.portal"),
  S1 = Symbol.for("react.fragment"),
  T1 = Symbol.for("react.strict_mode"),
  w1 = Symbol.for("react.profiler"),
  E1 = Symbol.for("react.consumer"),
  M1 = Symbol.for("react.context"),
  A1 = Symbol.for("react.forward_ref"),
  C1 = Symbol.for("react.suspense"),
  j1 = Symbol.for("react.memo"),
  cp = Symbol.for("react.lazy"),
  N1 = Symbol.for("react.activity"),
  rd = Symbol.iterator;
function O1(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (rd && e[rd]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var fp = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  dp = Object.assign,
  hp = {};
function ga(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = hp),
    (this.updater = n || fp));
}
ga.prototype.isReactComponent = {};
ga.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
ga.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function mp() {}
mp.prototype = ga.prototype;
function Sc(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = hp),
    (this.updater = n || fp));
}
var Tc = (Sc.prototype = new mp());
Tc.constructor = Sc;
dp(Tc, ga.prototype);
Tc.isPureReactComponent = !0;
var od = Array.isArray;
function Wo() {}
var re = { H: null, A: null, T: null, S: null },
  pp = Object.prototype.hasOwnProperty;
function wc(e, t, n) {
  var i = n.ref;
  return {
    $$typeof: bc,
    type: e,
    key: t,
    ref: i !== void 0 ? i : null,
    props: n,
  };
}
function D1(e, t) {
  return wc(e.type, t, e.props);
}
function Ec(e) {
  return typeof e == "object" && e !== null && e.$$typeof === bc;
}
function z1(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var ud = /\/+/g;
function Kr(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? z1("" + e.key)
    : t.toString(36);
}
function L1(e) {
  switch (e.status) {
    case "fulfilled":
      return e.value;
    case "rejected":
      throw e.reason;
    default:
      switch (
        (typeof e.status == "string"
          ? e.then(Wo, Wo)
          : ((e.status = "pending"),
            e.then(
              function (t) {
                e.status === "pending" &&
                  ((e.status = "fulfilled"), (e.value = t));
              },
              function (t) {
                e.status === "pending" &&
                  ((e.status = "rejected"), (e.reason = t));
              },
            )),
        e.status)
      ) {
        case "fulfilled":
          return e.value;
        case "rejected":
          throw e.reason;
      }
  }
  throw e;
}
function Ci(e, t, n, i, a) {
  var s = typeof e;
  (s === "undefined" || s === "boolean") && (e = null);
  var l = !1;
  if (e === null) l = !0;
  else
    switch (s) {
      case "bigint":
      case "string":
      case "number":
        l = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case bc:
          case b1:
            l = !0;
            break;
          case cp:
            return ((l = e._init), Ci(l(e._payload), t, n, i, a));
        }
    }
  if (l)
    return (
      (a = a(e)),
      (l = i === "" ? "." + Kr(e, 0) : i),
      od(a)
        ? ((n = ""),
          l != null && (n = l.replace(ud, "$&/") + "/"),
          Ci(a, t, n, "", function (u) {
            return u;
          }))
        : a != null &&
          (Ec(a) &&
            (a = D1(
              a,
              n +
                (a.key == null || (e && e.key === a.key)
                  ? ""
                  : ("" + a.key).replace(ud, "$&/") + "/") +
                l,
            )),
          t.push(a)),
      1
    );
  l = 0;
  var r = i === "" ? "." : i + ":";
  if (od(e))
    for (var o = 0; o < e.length; o++)
      ((i = e[o]), (s = r + Kr(i, o)), (l += Ci(i, t, n, s, a)));
  else if (((o = O1(e)), typeof o == "function"))
    for (e = o.call(e), o = 0; !(i = e.next()).done; )
      ((i = i.value), (s = r + Kr(i, o++)), (l += Ci(i, t, n, s, a)));
  else if (s === "object") {
    if (typeof e.then == "function") return Ci(L1(e), t, n, i, a);
    throw (
      (t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead.",
      )
    );
  }
  return l;
}
function Qs(e, t, n) {
  if (e == null) return e;
  var i = [],
    a = 0;
  return (
    Ci(e, i, "", "", function (s) {
      return t.call(n, s, a++);
    }),
    i
  );
}
function V1(e) {
  if (e._status === -1) {
    var t = e._result;
    ((t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t)));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var cd =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var t = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof e == "object" &&
                e !== null &&
                typeof e.message == "string"
                  ? String(e.message)
                  : String(e),
              error: e,
            });
            if (!window.dispatchEvent(t)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", e);
            return;
          }
          console.error(e);
        },
  _1 = {
    map: Qs,
    forEach: function (e, t, n) {
      Qs(
        e,
        function () {
          t.apply(this, arguments);
        },
        n,
      );
    },
    count: function (e) {
      var t = 0;
      return (
        Qs(e, function () {
          t++;
        }),
        t
      );
    },
    toArray: function (e) {
      return (
        Qs(e, function (t) {
          return t;
        }) || []
      );
    },
    only: function (e) {
      if (!Ec(e))
        throw Error(
          "React.Children.only expected to receive a single React element child.",
        );
      return e;
    },
  };
X.Activity = N1;
X.Children = _1;
X.Component = ga;
X.Fragment = S1;
X.Profiler = w1;
X.PureComponent = Sc;
X.StrictMode = T1;
X.Suspense = C1;
X.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = re;
X.__COMPILER_RUNTIME = {
  __proto__: null,
  c: function (e) {
    return re.H.useMemoCache(e);
  },
};
X.cache = function (e) {
  return function () {
    return e.apply(null, arguments);
  };
};
X.cacheSignal = function () {
  return null;
};
X.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "The argument must be a React element, but you passed " + e + ".",
    );
  var i = dp({}, e.props),
    a = e.key;
  if (t != null)
    for (s in (t.key !== void 0 && (a = "" + t.key), t))
      !pp.call(t, s) ||
        s === "key" ||
        s === "__self" ||
        s === "__source" ||
        (s === "ref" && t.ref === void 0) ||
        (i[s] = t[s]);
  var s = arguments.length - 2;
  if (s === 1) i.children = n;
  else if (1 < s) {
    for (var l = Array(s), r = 0; r < s; r++) l[r] = arguments[r + 2];
    i.children = l;
  }
  return wc(e.type, a, i);
};
X.createContext = function (e) {
  return (
    (e = {
      $$typeof: M1,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
    }),
    (e.Provider = e),
    (e.Consumer = { $$typeof: E1, _context: e }),
    e
  );
};
X.createElement = function (e, t, n) {
  var i,
    a = {},
    s = null;
  if (t != null)
    for (i in (t.key !== void 0 && (s = "" + t.key), t))
      pp.call(t, i) &&
        i !== "key" &&
        i !== "__self" &&
        i !== "__source" &&
        (a[i] = t[i]);
  var l = arguments.length - 2;
  if (l === 1) a.children = n;
  else if (1 < l) {
    for (var r = Array(l), o = 0; o < l; o++) r[o] = arguments[o + 2];
    a.children = r;
  }
  if (e && e.defaultProps)
    for (i in ((l = e.defaultProps), l)) a[i] === void 0 && (a[i] = l[i]);
  return wc(e, s, a);
};
X.createRef = function () {
  return { current: null };
};
X.forwardRef = function (e) {
  return { $$typeof: A1, render: e };
};
X.isValidElement = Ec;
X.lazy = function (e) {
  return { $$typeof: cp, _payload: { _status: -1, _result: e }, _init: V1 };
};
X.memo = function (e, t) {
  return { $$typeof: j1, type: e, compare: t === void 0 ? null : t };
};
X.startTransition = function (e) {
  var t = re.T,
    n = {};
  re.T = n;
  try {
    var i = e(),
      a = re.S;
    (a !== null && a(n, i),
      typeof i == "object" &&
        i !== null &&
        typeof i.then == "function" &&
        i.then(Wo, cd));
  } catch (s) {
    cd(s);
  } finally {
    (t !== null && n.types !== null && (t.types = n.types), (re.T = t));
  }
};
X.unstable_useCacheRefresh = function () {
  return re.H.useCacheRefresh();
};
X.use = function (e) {
  return re.H.use(e);
};
X.useActionState = function (e, t, n) {
  return re.H.useActionState(e, t, n);
};
X.useCallback = function (e, t) {
  return re.H.useCallback(e, t);
};
X.useContext = function (e) {
  return re.H.useContext(e);
};
X.useDebugValue = function () {};
X.useDeferredValue = function (e, t) {
  return re.H.useDeferredValue(e, t);
};
X.useEffect = function (e, t) {
  return re.H.useEffect(e, t);
};
X.useEffectEvent = function (e) {
  return re.H.useEffectEvent(e);
};
X.useId = function () {
  return re.H.useId();
};
X.useImperativeHandle = function (e, t, n) {
  return re.H.useImperativeHandle(e, t, n);
};
X.useInsertionEffect = function (e, t) {
  return re.H.useInsertionEffect(e, t);
};
X.useLayoutEffect = function (e, t) {
  return re.H.useLayoutEffect(e, t);
};
X.useMemo = function (e, t) {
  return re.H.useMemo(e, t);
};
X.useOptimistic = function (e, t) {
  return re.H.useOptimistic(e, t);
};
X.useReducer = function (e, t, n) {
  return re.H.useReducer(e, t, n);
};
X.useRef = function (e) {
  return re.H.useRef(e);
};
X.useState = function (e) {
  return re.H.useState(e);
};
X.useSyncExternalStore = function (e, t, n) {
  return re.H.useSyncExternalStore(e, t, n);
};
X.useTransition = function () {
  return re.H.useTransition();
};
X.version = "19.2.0";
up.exports = X;
var L = up.exports;
const ie = lp(L);
var gp = { exports: {} },
  Tr = {},
  vp = { exports: {} },
  yp = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(V, z) {
    var N = V.length;
    V.push(z);
    e: for (; 0 < N; ) {
      var B = (N - 1) >>> 1,
        U = V[B];
      if (0 < a(U, z)) ((V[B] = z), (V[N] = U), (N = B));
      else break e;
    }
  }
  function n(V) {
    return V.length === 0 ? null : V[0];
  }
  function i(V) {
    if (V.length === 0) return null;
    var z = V[0],
      N = V.pop();
    if (N !== z) {
      V[0] = N;
      e: for (var B = 0, U = V.length, he = U >>> 1; B < he; ) {
        var gt = 2 * (B + 1) - 1,
          Ke = V[gt],
          be = gt + 1,
          qe = V[be];
        if (0 > a(Ke, N))
          be < U && 0 > a(qe, Ke)
            ? ((V[B] = qe), (V[be] = N), (B = be))
            : ((V[B] = Ke), (V[gt] = N), (B = gt));
        else if (be < U && 0 > a(qe, N)) ((V[B] = qe), (V[be] = N), (B = be));
        else break e;
      }
    }
    return z;
  }
  function a(V, z) {
    var N = V.sortIndex - z.sortIndex;
    return N !== 0 ? N : V.id - z.id;
  }
  if (
    ((e.unstable_now = void 0),
    typeof performance == "object" && typeof performance.now == "function")
  ) {
    var s = performance;
    e.unstable_now = function () {
      return s.now();
    };
  } else {
    var l = Date,
      r = l.now();
    e.unstable_now = function () {
      return l.now() - r;
    };
  }
  var o = [],
    u = [],
    c = 1,
    f = null,
    h = 3,
    d = !1,
    y = !1,
    x = !1,
    T = !1,
    m = typeof setTimeout == "function" ? setTimeout : null,
    p = typeof clearTimeout == "function" ? clearTimeout : null,
    v = typeof setImmediate < "u" ? setImmediate : null;
  function b(V) {
    for (var z = n(u); z !== null; ) {
      if (z.callback === null) i(u);
      else if (z.startTime <= V)
        (i(u), (z.sortIndex = z.expirationTime), t(o, z));
      else break;
      z = n(u);
    }
  }
  function w(V) {
    if (((x = !1), b(V), !y))
      if (n(o) !== null) ((y = !0), M || ((M = !0), j()));
      else {
        var z = n(u);
        z !== null && Y(w, z.startTime - V);
      }
  }
  var M = !1,
    E = -1,
    S = 5,
    O = -1;
  function C() {
    return T ? !0 : !(e.unstable_now() - O < S);
  }
  function A() {
    if (((T = !1), M)) {
      var V = e.unstable_now();
      O = V;
      var z = !0;
      try {
        e: {
          ((y = !1), x && ((x = !1), p(E), (E = -1)), (d = !0));
          var N = h;
          try {
            t: {
              for (
                b(V), f = n(o);
                f !== null && !(f.expirationTime > V && C());

              ) {
                var B = f.callback;
                if (typeof B == "function") {
                  ((f.callback = null), (h = f.priorityLevel));
                  var U = B(f.expirationTime <= V);
                  if (((V = e.unstable_now()), typeof U == "function")) {
                    ((f.callback = U), b(V), (z = !0));
                    break t;
                  }
                  (f === n(o) && i(o), b(V));
                } else i(o);
                f = n(o);
              }
              if (f !== null) z = !0;
              else {
                var he = n(u);
                (he !== null && Y(w, he.startTime - V), (z = !1));
              }
            }
            break e;
          } finally {
            ((f = null), (h = N), (d = !1));
          }
          z = void 0;
        }
      } finally {
        z ? j() : (M = !1);
      }
    }
  }
  var j;
  if (typeof v == "function")
    j = function () {
      v(A);
    };
  else if (typeof MessageChannel < "u") {
    var _ = new MessageChannel(),
      R = _.port2;
    ((_.port1.onmessage = A),
      (j = function () {
        R.postMessage(null);
      }));
  } else
    j = function () {
      m(A, 0);
    };
  function Y(V, z) {
    E = m(function () {
      V(e.unstable_now());
    }, z);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (V) {
      V.callback = null;
    }),
    (e.unstable_forceFrameRate = function (V) {
      0 > V || 125 < V
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (S = 0 < V ? Math.floor(1e3 / V) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return h;
    }),
    (e.unstable_next = function (V) {
      switch (h) {
        case 1:
        case 2:
        case 3:
          var z = 3;
          break;
        default:
          z = h;
      }
      var N = h;
      h = z;
      try {
        return V();
      } finally {
        h = N;
      }
    }),
    (e.unstable_requestPaint = function () {
      T = !0;
    }),
    (e.unstable_runWithPriority = function (V, z) {
      switch (V) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          V = 3;
      }
      var N = h;
      h = V;
      try {
        return z();
      } finally {
        h = N;
      }
    }),
    (e.unstable_scheduleCallback = function (V, z, N) {
      var B = e.unstable_now();
      switch (
        (typeof N == "object" && N !== null
          ? ((N = N.delay), (N = typeof N == "number" && 0 < N ? B + N : B))
          : (N = B),
        V)
      ) {
        case 1:
          var U = -1;
          break;
        case 2:
          U = 250;
          break;
        case 5:
          U = 1073741823;
          break;
        case 4:
          U = 1e4;
          break;
        default:
          U = 5e3;
      }
      return (
        (U = N + U),
        (V = {
          id: c++,
          callback: z,
          priorityLevel: V,
          startTime: N,
          expirationTime: U,
          sortIndex: -1,
        }),
        N > B
          ? ((V.sortIndex = N),
            t(u, V),
            n(o) === null &&
              V === n(u) &&
              (x ? (p(E), (E = -1)) : (x = !0), Y(w, N - B)))
          : ((V.sortIndex = U),
            t(o, V),
            y || d || ((y = !0), M || ((M = !0), j()))),
        V
      );
    }),
    (e.unstable_shouldYield = C),
    (e.unstable_wrapCallback = function (V) {
      var z = h;
      return function () {
        var N = h;
        h = z;
        try {
          return V.apply(this, arguments);
        } finally {
          h = N;
        }
      };
    }));
})(yp);
vp.exports = yp;
var R1 = vp.exports,
  xp = { exports: {} },
  Pe = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var B1 = L;
function bp(e) {
  var t = "https://react.dev/errors/" + e;
  if (1 < arguments.length) {
    t += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var n = 2; n < arguments.length; n++)
      t += "&args[]=" + encodeURIComponent(arguments[n]);
  }
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
function xn() {}
var Xe = {
    d: {
      f: xn,
      r: function () {
        throw Error(bp(522));
      },
      D: xn,
      C: xn,
      L: xn,
      m: xn,
      X: xn,
      S: xn,
      M: xn,
    },
    p: 0,
    findDOMNode: null,
  },
  H1 = Symbol.for("react.portal");
function U1(e, t, n) {
  var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: H1,
    key: i == null ? null : "" + i,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
var Ya = B1.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
function wr(e, t) {
  if (e === "font") return "";
  if (typeof t == "string") return t === "use-credentials" ? t : "";
}
Pe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Xe;
Pe.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11))
    throw Error(bp(299));
  return U1(e, t, null, n);
};
Pe.flushSync = function (e) {
  var t = Ya.T,
    n = Xe.p;
  try {
    if (((Ya.T = null), (Xe.p = 2), e)) return e();
  } finally {
    ((Ya.T = t), (Xe.p = n), Xe.d.f());
  }
};
Pe.preconnect = function (e, t) {
  typeof e == "string" &&
    (t
      ? ((t = t.crossOrigin),
        (t =
          typeof t == "string" ? (t === "use-credentials" ? t : "") : void 0))
      : (t = null),
    Xe.d.C(e, t));
};
Pe.prefetchDNS = function (e) {
  typeof e == "string" && Xe.d.D(e);
};
Pe.preinit = function (e, t) {
  if (typeof e == "string" && t && typeof t.as == "string") {
    var n = t.as,
      i = wr(n, t.crossOrigin),
      a = typeof t.integrity == "string" ? t.integrity : void 0,
      s = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
    n === "style"
      ? Xe.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
          crossOrigin: i,
          integrity: a,
          fetchPriority: s,
        })
      : n === "script" &&
        Xe.d.X(e, {
          crossOrigin: i,
          integrity: a,
          fetchPriority: s,
          nonce: typeof t.nonce == "string" ? t.nonce : void 0,
        });
  }
};
Pe.preinitModule = function (e, t) {
  if (typeof e == "string")
    if (typeof t == "object" && t !== null) {
      if (t.as == null || t.as === "script") {
        var n = wr(t.as, t.crossOrigin);
        Xe.d.M(e, {
          crossOrigin: n,
          integrity: typeof t.integrity == "string" ? t.integrity : void 0,
          nonce: typeof t.nonce == "string" ? t.nonce : void 0,
        });
      }
    } else t == null && Xe.d.M(e);
};
Pe.preload = function (e, t) {
  if (
    typeof e == "string" &&
    typeof t == "object" &&
    t !== null &&
    typeof t.as == "string"
  ) {
    var n = t.as,
      i = wr(n, t.crossOrigin);
    Xe.d.L(e, n, {
      crossOrigin: i,
      integrity: typeof t.integrity == "string" ? t.integrity : void 0,
      nonce: typeof t.nonce == "string" ? t.nonce : void 0,
      type: typeof t.type == "string" ? t.type : void 0,
      fetchPriority:
        typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
      referrerPolicy:
        typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
      imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
      imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
      media: typeof t.media == "string" ? t.media : void 0,
    });
  }
};
Pe.preloadModule = function (e, t) {
  if (typeof e == "string")
    if (t) {
      var n = wr(t.as, t.crossOrigin);
      Xe.d.m(e, {
        as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
        crossOrigin: n,
        integrity: typeof t.integrity == "string" ? t.integrity : void 0,
      });
    } else Xe.d.m(e);
};
Pe.requestFormReset = function (e) {
  Xe.d.r(e);
};
Pe.unstable_batchedUpdates = function (e, t) {
  return e(t);
};
Pe.useFormState = function (e, t, n) {
  return Ya.H.useFormState(e, t, n);
};
Pe.useFormStatus = function () {
  return Ya.H.useHostTransitionStatus();
};
Pe.version = "19.2.0";
function Sp() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Sp);
    } catch (e) {
      console.error(e);
    }
}
(Sp(), (xp.exports = Pe));
var G1 = xp.exports;
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var je = R1,
  Tp = L,
  q1 = G1;
function D(e) {
  var t = "https://react.dev/errors/" + e;
  if (1 < arguments.length) {
    t += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var n = 2; n < arguments.length; n++)
      t += "&args[]=" + encodeURIComponent(arguments[n]);
  }
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
function wp(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Os(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return));
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Ep(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Mp(e) {
  if (e.tag === 31) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function fd(e) {
  if (Os(e) !== e) throw Error(D(188));
}
function Y1(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Os(e)), t === null)) throw Error(D(188));
    return t !== e ? null : e;
  }
  for (var n = e, i = t; ; ) {
    var a = n.return;
    if (a === null) break;
    var s = a.alternate;
    if (s === null) {
      if (((i = a.return), i !== null)) {
        n = i;
        continue;
      }
      break;
    }
    if (a.child === s.child) {
      for (s = a.child; s; ) {
        if (s === n) return (fd(a), e);
        if (s === i) return (fd(a), t);
        s = s.sibling;
      }
      throw Error(D(188));
    }
    if (n.return !== i.return) ((n = a), (i = s));
    else {
      for (var l = !1, r = a.child; r; ) {
        if (r === n) {
          ((l = !0), (n = a), (i = s));
          break;
        }
        if (r === i) {
          ((l = !0), (i = a), (n = s));
          break;
        }
        r = r.sibling;
      }
      if (!l) {
        for (r = s.child; r; ) {
          if (r === n) {
            ((l = !0), (n = s), (i = a));
            break;
          }
          if (r === i) {
            ((l = !0), (i = s), (n = a));
            break;
          }
          r = r.sibling;
        }
        if (!l) throw Error(D(189));
      }
    }
    if (n.alternate !== i) throw Error(D(190));
  }
  if (n.tag !== 3) throw Error(D(188));
  return n.stateNode.current === n ? e : t;
}
function Ap(e) {
  var t = e.tag;
  if (t === 5 || t === 26 || t === 27 || t === 6) return e;
  for (e = e.child; e !== null; ) {
    if (((t = Ap(e)), t !== null)) return t;
    e = e.sibling;
  }
  return null;
}
var oe = Object.assign,
  X1 = Symbol.for("react.element"),
  Ks = Symbol.for("react.transitional.element"),
  Ra = Symbol.for("react.portal"),
  Oi = Symbol.for("react.fragment"),
  Cp = Symbol.for("react.strict_mode"),
  eu = Symbol.for("react.profiler"),
  jp = Symbol.for("react.consumer"),
  tn = Symbol.for("react.context"),
  Mc = Symbol.for("react.forward_ref"),
  tu = Symbol.for("react.suspense"),
  nu = Symbol.for("react.suspense_list"),
  Ac = Symbol.for("react.memo"),
  Sn = Symbol.for("react.lazy"),
  iu = Symbol.for("react.activity"),
  k1 = Symbol.for("react.memo_cache_sentinel"),
  dd = Symbol.iterator;
function Ca(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (dd && e[dd]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var P1 = Symbol.for("react.client.reference");
function au(e) {
  if (e == null) return null;
  if (typeof e == "function")
    return e.$$typeof === P1 ? null : e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Oi:
      return "Fragment";
    case eu:
      return "Profiler";
    case Cp:
      return "StrictMode";
    case tu:
      return "Suspense";
    case nu:
      return "SuspenseList";
    case iu:
      return "Activity";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Ra:
        return "Portal";
      case tn:
        return e.displayName || "Context";
      case jp:
        return (e._context.displayName || "Context") + ".Consumer";
      case Mc:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Ac:
        return (
          (t = e.displayName || null),
          t !== null ? t : au(e.type) || "Memo"
        );
      case Sn:
        ((t = e._payload), (e = e._init));
        try {
          return au(e(t));
        } catch {}
    }
  return null;
}
var Ba = Array.isArray,
  q = Tp.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
  $ = q1.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
  li = { pending: !1, data: null, method: null, action: null },
  su = [],
  Di = -1;
function kt(e) {
  return { current: e };
}
function ze(e) {
  0 > Di || ((e.current = su[Di]), (su[Di] = null), Di--);
}
function ae(e, t) {
  (Di++, (su[Di] = e.current), (e.current = t));
}
var Gt = kt(null),
  os = kt(null),
  Ln = kt(null),
  Vl = kt(null);
function _l(e, t) {
  switch ((ae(Ln, t), ae(os, e), ae(Gt, null), t.nodeType)) {
    case 9:
    case 11:
      e = (e = t.documentElement) && (e = e.namespaceURI) ? yh(e) : 0;
      break;
    default:
      if (((e = t.tagName), (t = t.namespaceURI)))
        ((t = yh(t)), (e = Z0(t, e)));
      else
        switch (e) {
          case "svg":
            e = 1;
            break;
          case "math":
            e = 2;
            break;
          default:
            e = 0;
        }
  }
  (ze(Gt), ae(Gt, e));
}
function na() {
  (ze(Gt), ze(os), ze(Ln));
}
function lu(e) {
  e.memoizedState !== null && ae(Vl, e);
  var t = Gt.current,
    n = Z0(t, e.type);
  t !== n && (ae(os, e), ae(Gt, n));
}
function Rl(e) {
  (os.current === e && (ze(Gt), ze(os)),
    Vl.current === e && (ze(Vl), (xs._currentValue = li)));
}
var Zr, hd;
function Wn(e) {
  if (Zr === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      ((Zr = (t && t[1]) || ""),
        (hd =
          -1 <
          n.stack.indexOf(`
    at`)
            ? " (<anonymous>)"
            : -1 < n.stack.indexOf("@")
              ? "@unknown:0:0"
              : ""));
    }
  return (
    `
` +
    Zr +
    e +
    hd
  );
}
var Fr = !1;
function $r(e, t) {
  if (!e || Fr) return "";
  Fr = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var i = {
      DetermineComponentFrameRoot: function () {
        try {
          if (t) {
            var f = function () {
              throw Error();
            };
            if (
              (Object.defineProperty(f.prototype, "props", {
                set: function () {
                  throw Error();
                },
              }),
              typeof Reflect == "object" && Reflect.construct)
            ) {
              try {
                Reflect.construct(f, []);
              } catch (d) {
                var h = d;
              }
              Reflect.construct(e, [], f);
            } else {
              try {
                f.call();
              } catch (d) {
                h = d;
              }
              e.call(f.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (d) {
              h = d;
            }
            (f = e()) &&
              typeof f.catch == "function" &&
              f.catch(function () {});
          }
        } catch (d) {
          if (d && h && typeof d.stack == "string") return [d.stack, h.stack];
        }
        return [null, null];
      },
    };
    i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var a = Object.getOwnPropertyDescriptor(
      i.DetermineComponentFrameRoot,
      "name",
    );
    a &&
      a.configurable &&
      Object.defineProperty(i.DetermineComponentFrameRoot, "name", {
        value: "DetermineComponentFrameRoot",
      });
    var s = i.DetermineComponentFrameRoot(),
      l = s[0],
      r = s[1];
    if (l && r) {
      var o = l.split(`
`),
        u = r.split(`
`);
      for (
        a = i = 0;
        i < o.length && !o[i].includes("DetermineComponentFrameRoot");

      )
        i++;
      for (; a < u.length && !u[a].includes("DetermineComponentFrameRoot"); )
        a++;
      if (i === o.length || a === u.length)
        for (
          i = o.length - 1, a = u.length - 1;
          1 <= i && 0 <= a && o[i] !== u[a];

        )
          a--;
      for (; 1 <= i && 0 <= a; i--, a--)
        if (o[i] !== u[a]) {
          if (i !== 1 || a !== 1)
            do
              if ((i--, a--, 0 > a || o[i] !== u[a])) {
                var c =
                  `
` + o[i].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    c.includes("<anonymous>") &&
                    (c = c.replace("<anonymous>", e.displayName)),
                  c
                );
              }
            while (1 <= i && 0 <= a);
          break;
        }
    }
  } finally {
    ((Fr = !1), (Error.prepareStackTrace = n));
  }
  return (n = e ? e.displayName || e.name : "") ? Wn(n) : "";
}
function Q1(e, t) {
  switch (e.tag) {
    case 26:
    case 27:
    case 5:
      return Wn(e.type);
    case 16:
      return Wn("Lazy");
    case 13:
      return e.child !== t && t !== null
        ? Wn("Suspense Fallback")
        : Wn("Suspense");
    case 19:
      return Wn("SuspenseList");
    case 0:
    case 15:
      return $r(e.type, !1);
    case 11:
      return $r(e.type.render, !1);
    case 1:
      return $r(e.type, !0);
    case 31:
      return Wn("Activity");
    default:
      return "";
  }
}
function md(e) {
  try {
    var t = "",
      n = null;
    do ((t += Q1(e, n)), (n = e), (e = e.return));
    while (e);
    return t;
  } catch (i) {
    return (
      `
Error generating stack: ` +
      i.message +
      `
` +
      i.stack
    );
  }
}
var ru = Object.prototype.hasOwnProperty,
  Cc = je.unstable_scheduleCallback,
  Ir = je.unstable_cancelCallback,
  K1 = je.unstable_shouldYield,
  Z1 = je.unstable_requestPaint,
  ct = je.unstable_now,
  F1 = je.unstable_getCurrentPriorityLevel,
  Np = je.unstable_ImmediatePriority,
  Op = je.unstable_UserBlockingPriority,
  Bl = je.unstable_NormalPriority,
  $1 = je.unstable_LowPriority,
  Dp = je.unstable_IdlePriority,
  I1 = je.log,
  J1 = je.unstable_setDisableYieldValue,
  Ds = null,
  ft = null;
function Cn(e) {
  if (
    (typeof I1 == "function" && J1(e),
    ft && typeof ft.setStrictMode == "function")
  )
    try {
      ft.setStrictMode(Ds, e);
    } catch {}
}
var dt = Math.clz32 ? Math.clz32 : tx,
  W1 = Math.log,
  ex = Math.LN2;
function tx(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((W1(e) / ex) | 0)) | 0);
}
var Zs = 256,
  Fs = 262144,
  $s = 4194304;
function ei(e) {
  var t = e & 42;
  if (t !== 0) return t;
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
      return 64;
    case 128:
      return 128;
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
      return e & 261888;
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 3932160;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return e & 62914560;
    case 67108864:
      return 67108864;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 0;
    default:
      return e;
  }
}
function Er(e, t, n) {
  var i = e.pendingLanes;
  if (i === 0) return 0;
  var a = 0,
    s = e.suspendedLanes,
    l = e.pingedLanes;
  e = e.warmLanes;
  var r = i & 134217727;
  return (
    r !== 0
      ? ((i = r & ~s),
        i !== 0
          ? (a = ei(i))
          : ((l &= r),
            l !== 0
              ? (a = ei(l))
              : n || ((n = r & ~e), n !== 0 && (a = ei(n)))))
      : ((r = i & ~s),
        r !== 0
          ? (a = ei(r))
          : l !== 0
            ? (a = ei(l))
            : n || ((n = i & ~e), n !== 0 && (a = ei(n)))),
    a === 0
      ? 0
      : t !== 0 &&
          t !== a &&
          !(t & s) &&
          ((s = a & -a),
          (n = t & -t),
          s >= n || (s === 32 && (n & 4194048) !== 0))
        ? t
        : a
  );
}
function zs(e, t) {
  return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
}
function nx(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
    case 8:
    case 64:
      return t + 250;
    case 16:
    case 32:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return -1;
    case 67108864:
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function zp() {
  var e = $s;
  return (($s <<= 1), !($s & 62914560) && ($s = 4194304), e);
}
function Jr(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Ls(e, t) {
  ((e.pendingLanes |= t),
    t !== 268435456 &&
      ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
}
function ix(e, t, n, i, a, s) {
  var l = e.pendingLanes;
  ((e.pendingLanes = n),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.warmLanes = 0),
    (e.expiredLanes &= n),
    (e.entangledLanes &= n),
    (e.errorRecoveryDisabledLanes &= n),
    (e.shellSuspendCounter = 0));
  var r = e.entanglements,
    o = e.expirationTimes,
    u = e.hiddenUpdates;
  for (n = l & ~n; 0 < n; ) {
    var c = 31 - dt(n),
      f = 1 << c;
    ((r[c] = 0), (o[c] = -1));
    var h = u[c];
    if (h !== null)
      for (u[c] = null, c = 0; c < h.length; c++) {
        var d = h[c];
        d !== null && (d.lane &= -536870913);
      }
    n &= ~f;
  }
  (i !== 0 && Lp(e, i, 0),
    s !== 0 && a === 0 && e.tag !== 0 && (e.suspendedLanes |= s & ~(l & ~t)));
}
function Lp(e, t, n) {
  ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
  var i = 31 - dt(t);
  ((e.entangledLanes |= t),
    (e.entanglements[i] = e.entanglements[i] | 1073741824 | (n & 261930)));
}
function Vp(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var i = 31 - dt(n),
      a = 1 << i;
    ((a & t) | (e[i] & t) && (e[i] |= t), (n &= ~a));
  }
}
function _p(e, t) {
  var n = t & -t;
  return ((n = n & 42 ? 1 : jc(n)), n & (e.suspendedLanes | t) ? 0 : n);
}
function jc(e) {
  switch (e) {
    case 2:
      e = 1;
      break;
    case 8:
      e = 4;
      break;
    case 32:
      e = 16;
      break;
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      e = 128;
      break;
    case 268435456:
      e = 134217728;
      break;
    default:
      e = 0;
  }
  return e;
}
function Nc(e) {
  return (
    (e &= -e),
    2 < e ? (8 < e ? (e & 134217727 ? 32 : 268435456) : 8) : 2
  );
}
function Rp() {
  var e = $.p;
  return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : sv(e.type));
}
function pd(e, t) {
  var n = $.p;
  try {
    return (($.p = e), t());
  } finally {
    $.p = n;
  }
}
var Zn = Math.random().toString(36).slice(2),
  Re = "__reactFiber$" + Zn,
  tt = "__reactProps$" + Zn,
  va = "__reactContainer$" + Zn,
  ou = "__reactEvents$" + Zn,
  ax = "__reactListeners$" + Zn,
  sx = "__reactHandles$" + Zn,
  gd = "__reactResources$" + Zn,
  Vs = "__reactMarker$" + Zn;
function Oc(e) {
  (delete e[Re], delete e[tt], delete e[ou], delete e[ax], delete e[sx]);
}
function zi(e) {
  var t = e[Re];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[va] || n[Re])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = wh(e); e !== null; ) {
          if ((n = e[Re])) return n;
          e = wh(e);
        }
      return t;
    }
    ((e = n), (n = e.parentNode));
  }
  return null;
}
function ya(e) {
  if ((e = e[Re] || e[va])) {
    var t = e.tag;
    if (
      t === 5 ||
      t === 6 ||
      t === 13 ||
      t === 31 ||
      t === 26 ||
      t === 27 ||
      t === 3
    )
      return e;
  }
  return null;
}
function Ha(e) {
  var t = e.tag;
  if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
  throw Error(D(33));
}
function Ki(e) {
  var t = e[gd];
  return (
    t ||
      (t = e[gd] = { hoistableStyles: new Map(), hoistableScripts: new Map() }),
    t
  );
}
function De(e) {
  e[Vs] = !0;
}
var Bp = new Set(),
  Hp = {};
function bi(e, t) {
  (ia(e, t), ia(e + "Capture", t));
}
function ia(e, t) {
  for (Hp[e] = t, e = 0; e < t.length; e++) Bp.add(t[e]);
}
var lx = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
  ),
  vd = {},
  yd = {};
function rx(e) {
  return ru.call(yd, e)
    ? !0
    : ru.call(vd, e)
      ? !1
      : lx.test(e)
        ? (yd[e] = !0)
        : ((vd[e] = !0), !1);
}
function ml(e, t, n) {
  if (rx(t))
    if (n === null) e.removeAttribute(t);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
          e.removeAttribute(t);
          return;
        case "boolean":
          var i = t.toLowerCase().slice(0, 5);
          if (i !== "data-" && i !== "aria-") {
            e.removeAttribute(t);
            return;
          }
      }
      e.setAttribute(t, "" + n);
    }
}
function Is(e, t, n) {
  if (n === null) e.removeAttribute(t);
  else {
    switch (typeof n) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        e.removeAttribute(t);
        return;
    }
    e.setAttribute(t, "" + n);
  }
}
function Kt(e, t, n, i) {
  if (i === null) e.removeAttribute(n);
  else {
    switch (typeof i) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        e.removeAttribute(n);
        return;
    }
    e.setAttributeNS(t, n, "" + i);
  }
}
function bt(e) {
  switch (typeof e) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Up(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function ox(e, t, n) {
  var i = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
  if (
    !e.hasOwnProperty(t) &&
    typeof i < "u" &&
    typeof i.get == "function" &&
    typeof i.set == "function"
  ) {
    var a = i.get,
      s = i.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return a.call(this);
        },
        set: function (l) {
          ((n = "" + l), s.call(this, l));
        },
      }),
      Object.defineProperty(e, t, { enumerable: i.enumerable }),
      {
        getValue: function () {
          return n;
        },
        setValue: function (l) {
          n = "" + l;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function uu(e) {
  if (!e._valueTracker) {
    var t = Up(e) ? "checked" : "value";
    e._valueTracker = ox(e, t, "" + e[t]);
  }
}
function Gp(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    i = "";
  return (
    e && (i = Up(e) ? (e.checked ? "true" : "false") : e.value),
    (e = i),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Hl(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
var ux = /[\n"\\]/g;
function wt(e) {
  return e.replace(ux, function (t) {
    return "\\" + t.charCodeAt(0).toString(16) + " ";
  });
}
function cu(e, t, n, i, a, s, l, r) {
  ((e.name = ""),
    l != null &&
    typeof l != "function" &&
    typeof l != "symbol" &&
    typeof l != "boolean"
      ? (e.type = l)
      : e.removeAttribute("type"),
    t != null
      ? l === "number"
        ? ((t === 0 && e.value === "") || e.value != t) &&
          (e.value = "" + bt(t))
        : e.value !== "" + bt(t) && (e.value = "" + bt(t))
      : (l !== "submit" && l !== "reset") || e.removeAttribute("value"),
    t != null
      ? fu(e, l, bt(t))
      : n != null
        ? fu(e, l, bt(n))
        : i != null && e.removeAttribute("value"),
    a == null && s != null && (e.defaultChecked = !!s),
    a != null &&
      (e.checked = a && typeof a != "function" && typeof a != "symbol"),
    r != null &&
    typeof r != "function" &&
    typeof r != "symbol" &&
    typeof r != "boolean"
      ? (e.name = "" + bt(r))
      : e.removeAttribute("name"));
}
function qp(e, t, n, i, a, s, l, r) {
  if (
    (s != null &&
      typeof s != "function" &&
      typeof s != "symbol" &&
      typeof s != "boolean" &&
      (e.type = s),
    t != null || n != null)
  ) {
    if (!((s !== "submit" && s !== "reset") || t != null)) {
      uu(e);
      return;
    }
    ((n = n != null ? "" + bt(n) : ""),
      (t = t != null ? "" + bt(t) : n),
      r || t === e.value || (e.value = t),
      (e.defaultValue = t));
  }
  ((i = i ?? a),
    (i = typeof i != "function" && typeof i != "symbol" && !!i),
    (e.checked = r ? e.checked : !!i),
    (e.defaultChecked = !!i),
    l != null &&
      typeof l != "function" &&
      typeof l != "symbol" &&
      typeof l != "boolean" &&
      (e.name = l),
    uu(e));
}
function fu(e, t, n) {
  (t === "number" && Hl(e.ownerDocument) === e) ||
    e.defaultValue === "" + n ||
    (e.defaultValue = "" + n);
}
function Zi(e, t, n, i) {
  if (((e = e.options), t)) {
    t = {};
    for (var a = 0; a < n.length; a++) t["$" + n[a]] = !0;
    for (n = 0; n < e.length; n++)
      ((a = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== a && (e[n].selected = a),
        a && i && (e[n].defaultSelected = !0));
  } else {
    for (n = "" + bt(n), t = null, a = 0; a < e.length; a++) {
      if (e[a].value === n) {
        ((e[a].selected = !0), i && (e[a].defaultSelected = !0));
        return;
      }
      t !== null || e[a].disabled || (t = e[a]);
    }
    t !== null && (t.selected = !0);
  }
}
function Yp(e, t, n) {
  if (
    t != null &&
    ((t = "" + bt(t)), t !== e.value && (e.value = t), n == null)
  ) {
    e.defaultValue !== t && (e.defaultValue = t);
    return;
  }
  e.defaultValue = n != null ? "" + bt(n) : "";
}
function Xp(e, t, n, i) {
  if (t == null) {
    if (i != null) {
      if (n != null) throw Error(D(92));
      if (Ba(i)) {
        if (1 < i.length) throw Error(D(93));
        i = i[0];
      }
      n = i;
    }
    (n == null && (n = ""), (t = n));
  }
  ((n = bt(t)),
    (e.defaultValue = n),
    (i = e.textContent),
    i === n && i !== "" && i !== null && (e.value = i),
    uu(e));
}
function aa(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var cx = new Set(
  "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
    " ",
  ),
);
function xd(e, t, n) {
  var i = t.indexOf("--") === 0;
  n == null || typeof n == "boolean" || n === ""
    ? i
      ? e.setProperty(t, "")
      : t === "float"
        ? (e.cssFloat = "")
        : (e[t] = "")
    : i
      ? e.setProperty(t, n)
      : typeof n != "number" || n === 0 || cx.has(t)
        ? t === "float"
          ? (e.cssFloat = n)
          : (e[t] = ("" + n).trim())
        : (e[t] = n + "px");
}
function kp(e, t, n) {
  if (t != null && typeof t != "object") throw Error(D(62));
  if (((e = e.style), n != null)) {
    for (var i in n)
      !n.hasOwnProperty(i) ||
        (t != null && t.hasOwnProperty(i)) ||
        (i.indexOf("--") === 0
          ? e.setProperty(i, "")
          : i === "float"
            ? (e.cssFloat = "")
            : (e[i] = ""));
    for (var a in t)
      ((i = t[a]), t.hasOwnProperty(a) && n[a] !== i && xd(e, a, i));
  } else for (var s in t) t.hasOwnProperty(s) && xd(e, s, t[s]);
}
function Dc(e) {
  if (e.indexOf("-") === -1) return !1;
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var fx = new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"],
  ]),
  dx =
    /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function pl(e) {
  return dx.test("" + e)
    ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
    : e;
}
function nn() {}
var du = null;
function zc(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Li = null,
  Fi = null;
function bd(e) {
  var t = ya(e);
  if (t && (e = t.stateNode)) {
    var n = e[tt] || null;
    e: switch (((e = t.stateNode), t.type)) {
      case "input":
        if (
          (cu(
            e,
            n.value,
            n.defaultValue,
            n.defaultValue,
            n.checked,
            n.defaultChecked,
            n.type,
            n.name,
          ),
          (t = n.name),
          n.type === "radio" && t != null)
        ) {
          for (n = e; n.parentNode; ) n = n.parentNode;
          for (
            n = n.querySelectorAll(
              'input[name="' + wt("" + t) + '"][type="radio"]',
            ),
              t = 0;
            t < n.length;
            t++
          ) {
            var i = n[t];
            if (i !== e && i.form === e.form) {
              var a = i[tt] || null;
              if (!a) throw Error(D(90));
              cu(
                i,
                a.value,
                a.defaultValue,
                a.defaultValue,
                a.checked,
                a.defaultChecked,
                a.type,
                a.name,
              );
            }
          }
          for (t = 0; t < n.length; t++)
            ((i = n[t]), i.form === e.form && Gp(i));
        }
        break e;
      case "textarea":
        Yp(e, n.value, n.defaultValue);
        break e;
      case "select":
        ((t = n.value), t != null && Zi(e, !!n.multiple, t, !1));
    }
  }
}
var Wr = !1;
function Pp(e, t, n) {
  if (Wr) return e(t, n);
  Wr = !0;
  try {
    var i = e(t);
    return i;
  } finally {
    if (
      ((Wr = !1),
      (Li !== null || Fi !== null) &&
        (Rr(), Li && ((t = Li), (e = Fi), (Fi = Li = null), bd(t), e)))
    )
      for (t = 0; t < e.length; t++) bd(e[t]);
  }
}
function us(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var i = n[tt] || null;
  if (i === null) return null;
  n = i[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      ((i = !i.disabled) ||
        ((e = e.type),
        (i = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !i));
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(D(231, t, typeof n));
  return n;
}
var on = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  hu = !1;
if (on)
  try {
    var ja = {};
    (Object.defineProperty(ja, "passive", {
      get: function () {
        hu = !0;
      },
    }),
      window.addEventListener("test", ja, ja),
      window.removeEventListener("test", ja, ja));
  } catch {
    hu = !1;
  }
var jn = null,
  Lc = null,
  gl = null;
function Qp() {
  if (gl) return gl;
  var e,
    t = Lc,
    n = t.length,
    i,
    a = "value" in jn ? jn.value : jn.textContent,
    s = a.length;
  for (e = 0; e < n && t[e] === a[e]; e++);
  var l = n - e;
  for (i = 1; i <= l && t[n - i] === a[s - i]; i++);
  return (gl = a.slice(e, 1 < i ? 1 - i : void 0));
}
function vl(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Js() {
  return !0;
}
function Sd() {
  return !1;
}
function nt(e) {
  function t(n, i, a, s, l) {
    ((this._reactName = n),
      (this._targetInst = a),
      (this.type = i),
      (this.nativeEvent = s),
      (this.target = l),
      (this.currentTarget = null));
    for (var r in e)
      e.hasOwnProperty(r) && ((n = e[r]), (this[r] = n ? n(s) : s[r]));
    return (
      (this.isDefaultPrevented = (
        s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1
      )
        ? Js
        : Sd),
      (this.isPropagationStopped = Sd),
      this
    );
  }
  return (
    oe(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Js));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Js));
      },
      persist: function () {},
      isPersistent: Js,
    }),
    t
  );
}
var Si = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Mr = nt(Si),
  _s = oe({}, Si, { view: 0, detail: 0 }),
  hx = nt(_s),
  eo,
  to,
  Na,
  Ar = oe({}, _s, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Vc,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== Na &&
            (Na && e.type === "mousemove"
              ? ((eo = e.screenX - Na.screenX), (to = e.screenY - Na.screenY))
              : (to = eo = 0),
            (Na = e)),
          eo);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : to;
    },
  }),
  Td = nt(Ar),
  mx = oe({}, Ar, { dataTransfer: 0 }),
  px = nt(mx),
  gx = oe({}, _s, { relatedTarget: 0 }),
  no = nt(gx),
  vx = oe({}, Si, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  yx = nt(vx),
  xx = oe({}, Si, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  bx = nt(xx),
  Sx = oe({}, Si, { data: 0 }),
  wd = nt(Sx),
  Tx = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  wx = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Ex = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Mx(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Ex[e]) ? !!t[e] : !1;
}
function Vc() {
  return Mx;
}
var Ax = oe({}, _s, {
    key: function (e) {
      if (e.key) {
        var t = Tx[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = vl(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? wx[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Vc,
    charCode: function (e) {
      return e.type === "keypress" ? vl(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? vl(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  Cx = nt(Ax),
  jx = oe({}, Ar, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Ed = nt(jx),
  Nx = oe({}, _s, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Vc,
  }),
  Ox = nt(Nx),
  Dx = oe({}, Si, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  zx = nt(Dx),
  Lx = oe({}, Ar, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Vx = nt(Lx),
  _x = oe({}, Si, { newState: 0, oldState: 0 }),
  Rx = nt(_x),
  Bx = [9, 13, 27, 32],
  _c = on && "CompositionEvent" in window,
  Xa = null;
on && "documentMode" in document && (Xa = document.documentMode);
var Hx = on && "TextEvent" in window && !Xa,
  Kp = on && (!_c || (Xa && 8 < Xa && 11 >= Xa)),
  Md = " ",
  Ad = !1;
function Zp(e, t) {
  switch (e) {
    case "keyup":
      return Bx.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Fp(e) {
  return ((e = e.detail), typeof e == "object" && "data" in e ? e.data : null);
}
var Vi = !1;
function Ux(e, t) {
  switch (e) {
    case "compositionend":
      return Fp(t);
    case "keypress":
      return t.which !== 32 ? null : ((Ad = !0), Md);
    case "textInput":
      return ((e = t.data), e === Md && Ad ? null : e);
    default:
      return null;
  }
}
function Gx(e, t) {
  if (Vi)
    return e === "compositionend" || (!_c && Zp(e, t))
      ? ((e = Qp()), (gl = Lc = jn = null), (Vi = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Kp && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var qx = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Cd(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!qx[e.type] : t === "textarea";
}
function $p(e, t, n, i) {
  (Li ? (Fi ? Fi.push(i) : (Fi = [i])) : (Li = i),
    (t = nr(t, "onChange")),
    0 < t.length &&
      ((n = new Mr("onChange", "change", null, n, i)),
      e.push({ event: n, listeners: t })));
}
var ka = null,
  cs = null;
function Yx(e) {
  P0(e, 0);
}
function Cr(e) {
  var t = Ha(e);
  if (Gp(t)) return e;
}
function jd(e, t) {
  if (e === "change") return t;
}
var Ip = !1;
if (on) {
  var io;
  if (on) {
    var ao = "oninput" in document;
    if (!ao) {
      var Nd = document.createElement("div");
      (Nd.setAttribute("oninput", "return;"),
        (ao = typeof Nd.oninput == "function"));
    }
    io = ao;
  } else io = !1;
  Ip = io && (!document.documentMode || 9 < document.documentMode);
}
function Od() {
  ka && (ka.detachEvent("onpropertychange", Jp), (cs = ka = null));
}
function Jp(e) {
  if (e.propertyName === "value" && Cr(cs)) {
    var t = [];
    ($p(t, cs, e, zc(e)), Pp(Yx, t));
  }
}
function Xx(e, t, n) {
  e === "focusin"
    ? (Od(), (ka = t), (cs = n), ka.attachEvent("onpropertychange", Jp))
    : e === "focusout" && Od();
}
function kx(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Cr(cs);
}
function Px(e, t) {
  if (e === "click") return Cr(t);
}
function Qx(e, t) {
  if (e === "input" || e === "change") return Cr(t);
}
function Kx(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var mt = typeof Object.is == "function" ? Object.is : Kx;
function fs(e, t) {
  if (mt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    i = Object.keys(t);
  if (n.length !== i.length) return !1;
  for (i = 0; i < n.length; i++) {
    var a = n[i];
    if (!ru.call(t, a) || !mt(e[a], t[a])) return !1;
  }
  return !0;
}
function Dd(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function zd(e, t) {
  var n = Dd(e);
  e = 0;
  for (var i; n; ) {
    if (n.nodeType === 3) {
      if (((i = e + n.textContent.length), e <= t && i >= t))
        return { node: n, offset: t - e };
      e = i;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Dd(n);
  }
}
function Wp(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? Wp(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function eg(e) {
  e =
    e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
      ? e.ownerDocument.defaultView
      : window;
  for (var t = Hl(e.document); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Hl(e.document);
  }
  return t;
}
function Rc(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
var Zx = on && "documentMode" in document && 11 >= document.documentMode,
  _i = null,
  mu = null,
  Pa = null,
  pu = !1;
function Ld(e, t, n) {
  var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  pu ||
    _i == null ||
    _i !== Hl(i) ||
    ((i = _i),
    "selectionStart" in i && Rc(i)
      ? (i = { start: i.selectionStart, end: i.selectionEnd })
      : ((i = (
          (i.ownerDocument && i.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (i = {
          anchorNode: i.anchorNode,
          anchorOffset: i.anchorOffset,
          focusNode: i.focusNode,
          focusOffset: i.focusOffset,
        })),
    (Pa && fs(Pa, i)) ||
      ((Pa = i),
      (i = nr(mu, "onSelect")),
      0 < i.length &&
        ((t = new Mr("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: i }),
        (t.target = _i))));
}
function In(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Ri = {
    animationend: In("Animation", "AnimationEnd"),
    animationiteration: In("Animation", "AnimationIteration"),
    animationstart: In("Animation", "AnimationStart"),
    transitionrun: In("Transition", "TransitionRun"),
    transitionstart: In("Transition", "TransitionStart"),
    transitioncancel: In("Transition", "TransitionCancel"),
    transitionend: In("Transition", "TransitionEnd"),
  },
  so = {},
  tg = {};
on &&
  ((tg = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Ri.animationend.animation,
    delete Ri.animationiteration.animation,
    delete Ri.animationstart.animation),
  "TransitionEvent" in window || delete Ri.transitionend.transition);
function Ti(e) {
  if (so[e]) return so[e];
  if (!Ri[e]) return e;
  var t = Ri[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in tg) return (so[e] = t[n]);
  return e;
}
var ng = Ti("animationend"),
  ig = Ti("animationiteration"),
  ag = Ti("animationstart"),
  Fx = Ti("transitionrun"),
  $x = Ti("transitionstart"),
  Ix = Ti("transitioncancel"),
  sg = Ti("transitionend"),
  lg = new Map(),
  gu =
    "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
gu.push("scrollEnd");
function Vt(e, t) {
  (lg.set(e, t), bi(t, [e]));
}
var Ul =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var t = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof e == "object" &&
                e !== null &&
                typeof e.message == "string"
                  ? String(e.message)
                  : String(e),
              error: e,
            });
            if (!window.dispatchEvent(t)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", e);
            return;
          }
          console.error(e);
        },
  xt = [],
  Bi = 0,
  Bc = 0;
function jr() {
  for (var e = Bi, t = (Bc = Bi = 0); t < e; ) {
    var n = xt[t];
    xt[t++] = null;
    var i = xt[t];
    xt[t++] = null;
    var a = xt[t];
    xt[t++] = null;
    var s = xt[t];
    if (((xt[t++] = null), i !== null && a !== null)) {
      var l = i.pending;
      (l === null ? (a.next = a) : ((a.next = l.next), (l.next = a)),
        (i.pending = a));
    }
    s !== 0 && rg(n, a, s);
  }
}
function Nr(e, t, n, i) {
  ((xt[Bi++] = e),
    (xt[Bi++] = t),
    (xt[Bi++] = n),
    (xt[Bi++] = i),
    (Bc |= i),
    (e.lanes |= i),
    (e = e.alternate),
    e !== null && (e.lanes |= i));
}
function Hc(e, t, n, i) {
  return (Nr(e, t, n, i), Gl(e));
}
function wi(e, t) {
  return (Nr(e, null, null, t), Gl(e));
}
function rg(e, t, n) {
  e.lanes |= n;
  var i = e.alternate;
  i !== null && (i.lanes |= n);
  for (var a = !1, s = e.return; s !== null; )
    ((s.childLanes |= n),
      (i = s.alternate),
      i !== null && (i.childLanes |= n),
      s.tag === 22 &&
        ((e = s.stateNode), e === null || e._visibility & 1 || (a = !0)),
      (e = s),
      (s = s.return));
  return e.tag === 3
    ? ((s = e.stateNode),
      a &&
        t !== null &&
        ((a = 31 - dt(n)),
        (e = s.hiddenUpdates),
        (i = e[a]),
        i === null ? (e[a] = [t]) : i.push(t),
        (t.lane = n | 536870912)),
      s)
    : null;
}
function Gl(e) {
  if (50 < es) throw ((es = 0), (Bu = null), Error(D(185)));
  for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
  return e.tag === 3 ? e.stateNode : null;
}
var Hi = {};
function Jx(e, t, n, i) {
  ((this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.refCleanup = this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = i),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function ot(e, t, n, i) {
  return new Jx(e, t, n, i);
}
function Uc(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function sn(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = ot(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 65011712),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    (n.refCleanup = e.refCleanup),
    n
  );
}
function og(e, t) {
  e.flags &= 65011714;
  var n = e.alternate;
  return (
    n === null
      ? ((e.childLanes = 0),
        (e.lanes = t),
        (e.child = null),
        (e.subtreeFlags = 0),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.updateQueue = null),
        (e.dependencies = null),
        (e.stateNode = null))
      : ((e.childLanes = n.childLanes),
        (e.lanes = n.lanes),
        (e.child = n.child),
        (e.subtreeFlags = 0),
        (e.deletions = null),
        (e.memoizedProps = n.memoizedProps),
        (e.memoizedState = n.memoizedState),
        (e.updateQueue = n.updateQueue),
        (e.type = n.type),
        (t = n.dependencies),
        (e.dependencies =
          t === null
            ? null
            : { lanes: t.lanes, firstContext: t.firstContext })),
    e
  );
}
function yl(e, t, n, i, a, s) {
  var l = 0;
  if (((i = e), typeof e == "function")) Uc(e) && (l = 1);
  else if (typeof e == "string")
    l = i2(e, n, Gt.current)
      ? 26
      : e === "html" || e === "head" || e === "body"
        ? 27
        : 5;
  else
    e: switch (e) {
      case iu:
        return ((e = ot(31, n, t, a)), (e.elementType = iu), (e.lanes = s), e);
      case Oi:
        return ri(n.children, a, s, t);
      case Cp:
        ((l = 8), (a |= 24));
        break;
      case eu:
        return (
          (e = ot(12, n, t, a | 2)),
          (e.elementType = eu),
          (e.lanes = s),
          e
        );
      case tu:
        return ((e = ot(13, n, t, a)), (e.elementType = tu), (e.lanes = s), e);
      case nu:
        return ((e = ot(19, n, t, a)), (e.elementType = nu), (e.lanes = s), e);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case tn:
              l = 10;
              break e;
            case jp:
              l = 9;
              break e;
            case Mc:
              l = 11;
              break e;
            case Ac:
              l = 14;
              break e;
            case Sn:
              ((l = 16), (i = null));
              break e;
          }
        ((l = 29),
          (n = Error(D(130, e === null ? "null" : typeof e, ""))),
          (i = null));
    }
  return (
    (t = ot(l, n, t, a)),
    (t.elementType = e),
    (t.type = i),
    (t.lanes = s),
    t
  );
}
function ri(e, t, n, i) {
  return ((e = ot(7, e, i, t)), (e.lanes = n), e);
}
function lo(e, t, n) {
  return ((e = ot(6, e, null, t)), (e.lanes = n), e);
}
function ug(e) {
  var t = ot(18, null, null, 0);
  return ((t.stateNode = e), t);
}
function ro(e, t, n) {
  return (
    (t = ot(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
var Vd = new WeakMap();
function Et(e, t) {
  if (typeof e == "object" && e !== null) {
    var n = Vd.get(e);
    return n !== void 0
      ? n
      : ((t = { value: e, source: t, stack: md(t) }), Vd.set(e, t), t);
  }
  return { value: e, source: t, stack: md(t) };
}
var Ui = [],
  Gi = 0,
  ql = null,
  ds = 0,
  St = [],
  Tt = 0,
  Yn = null,
  Rt = 1,
  Bt = "";
function Wt(e, t) {
  ((Ui[Gi++] = ds), (Ui[Gi++] = ql), (ql = e), (ds = t));
}
function cg(e, t, n) {
  ((St[Tt++] = Rt), (St[Tt++] = Bt), (St[Tt++] = Yn), (Yn = e));
  var i = Rt;
  e = Bt;
  var a = 32 - dt(i) - 1;
  ((i &= ~(1 << a)), (n += 1));
  var s = 32 - dt(t) + a;
  if (30 < s) {
    var l = a - (a % 5);
    ((s = (i & ((1 << l) - 1)).toString(32)),
      (i >>= l),
      (a -= l),
      (Rt = (1 << (32 - dt(t) + a)) | (n << a) | i),
      (Bt = s + e));
  } else ((Rt = (1 << s) | (n << a) | i), (Bt = e));
}
function Gc(e) {
  e.return !== null && (Wt(e, 1), cg(e, 1, 0));
}
function qc(e) {
  for (; e === ql; )
    ((ql = Ui[--Gi]), (Ui[Gi] = null), (ds = Ui[--Gi]), (Ui[Gi] = null));
  for (; e === Yn; )
    ((Yn = St[--Tt]),
      (St[Tt] = null),
      (Bt = St[--Tt]),
      (St[Tt] = null),
      (Rt = St[--Tt]),
      (St[Tt] = null));
}
function fg(e, t) {
  ((St[Tt++] = Rt),
    (St[Tt++] = Bt),
    (St[Tt++] = Yn),
    (Rt = t.id),
    (Bt = t.overflow),
    (Yn = e));
}
var Be = null,
  le = null,
  Z = !1,
  Vn = null,
  Mt = !1,
  vu = Error(D(519));
function Xn(e) {
  var t = Error(
    D(
      418,
      1 < arguments.length && arguments[1] !== void 0 && arguments[1]
        ? "text"
        : "HTML",
      "",
    ),
  );
  throw (hs(Et(t, e)), vu);
}
function _d(e) {
  var t = e.stateNode,
    n = e.type,
    i = e.memoizedProps;
  switch (((t[Re] = e), (t[tt] = i), n)) {
    case "dialog":
      (P("cancel", t), P("close", t));
      break;
    case "iframe":
    case "object":
    case "embed":
      P("load", t);
      break;
    case "video":
    case "audio":
      for (n = 0; n < vs.length; n++) P(vs[n], t);
      break;
    case "source":
      P("error", t);
      break;
    case "img":
    case "image":
    case "link":
      (P("error", t), P("load", t));
      break;
    case "details":
      P("toggle", t);
      break;
    case "input":
      (P("invalid", t),
        qp(
          t,
          i.value,
          i.defaultValue,
          i.checked,
          i.defaultChecked,
          i.type,
          i.name,
          !0,
        ));
      break;
    case "select":
      P("invalid", t);
      break;
    case "textarea":
      (P("invalid", t), Xp(t, i.value, i.defaultValue, i.children));
  }
  ((n = i.children),
    (typeof n != "string" && typeof n != "number" && typeof n != "bigint") ||
    t.textContent === "" + n ||
    i.suppressHydrationWarning === !0 ||
    K0(t.textContent, n)
      ? (i.popover != null && (P("beforetoggle", t), P("toggle", t)),
        i.onScroll != null && P("scroll", t),
        i.onScrollEnd != null && P("scrollend", t),
        i.onClick != null && (t.onclick = nn),
        (t = !0))
      : (t = !1),
    t || Xn(e, !0));
}
function Rd(e) {
  for (Be = e.return; Be; )
    switch (Be.tag) {
      case 5:
      case 31:
      case 13:
        Mt = !1;
        return;
      case 27:
      case 3:
        Mt = !0;
        return;
      default:
        Be = Be.return;
    }
}
function Mi(e) {
  if (e !== Be) return !1;
  if (!Z) return (Rd(e), (Z = !0), !1);
  var t = e.tag,
    n;
  if (
    ((n = t !== 3 && t !== 27) &&
      ((n = t === 5) &&
        ((n = e.type),
        (n = !(n !== "form" && n !== "button") || Yu(e.type, e.memoizedProps))),
      (n = !n)),
    n && le && Xn(e),
    Rd(e),
    t === 13)
  ) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(D(317));
    le = Th(e);
  } else if (t === 31) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(D(317));
    le = Th(e);
  } else
    t === 27
      ? ((t = le), Fn(e.type) ? ((e = Qu), (Qu = null), (le = e)) : (le = t))
      : (le = Be ? jt(e.stateNode.nextSibling) : null);
  return !0;
}
function mi() {
  ((le = Be = null), (Z = !1));
}
function oo() {
  var e = Vn;
  return (
    e !== null && (Je === null ? (Je = e) : Je.push.apply(Je, e), (Vn = null)),
    e
  );
}
function hs(e) {
  Vn === null ? (Vn = [e]) : Vn.push(e);
}
var yu = kt(null),
  Ei = null,
  an = null;
function wn(e, t, n) {
  (ae(yu, t._currentValue), (t._currentValue = n));
}
function ln(e) {
  ((e._currentValue = yu.current), ze(yu));
}
function xu(e, t, n) {
  for (; e !== null; ) {
    var i = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), i !== null && (i.childLanes |= t))
        : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function bu(e, t, n, i) {
  var a = e.child;
  for (a !== null && (a.return = e); a !== null; ) {
    var s = a.dependencies;
    if (s !== null) {
      var l = a.child;
      s = s.firstContext;
      e: for (; s !== null; ) {
        var r = s;
        s = a;
        for (var o = 0; o < t.length; o++)
          if (r.context === t[o]) {
            ((s.lanes |= n),
              (r = s.alternate),
              r !== null && (r.lanes |= n),
              xu(s.return, n, e),
              i || (l = null));
            break e;
          }
        s = r.next;
      }
    } else if (a.tag === 18) {
      if (((l = a.return), l === null)) throw Error(D(341));
      ((l.lanes |= n),
        (s = l.alternate),
        s !== null && (s.lanes |= n),
        xu(l, n, e),
        (l = null));
    } else l = a.child;
    if (l !== null) l.return = a;
    else
      for (l = a; l !== null; ) {
        if (l === e) {
          l = null;
          break;
        }
        if (((a = l.sibling), a !== null)) {
          ((a.return = l.return), (l = a));
          break;
        }
        l = l.return;
      }
    a = l;
  }
}
function xa(e, t, n, i) {
  e = null;
  for (var a = t, s = !1; a !== null; ) {
    if (!s) {
      if (a.flags & 524288) s = !0;
      else if (a.flags & 262144) break;
    }
    if (a.tag === 10) {
      var l = a.alternate;
      if (l === null) throw Error(D(387));
      if (((l = l.memoizedProps), l !== null)) {
        var r = a.type;
        mt(a.pendingProps.value, l.value) ||
          (e !== null ? e.push(r) : (e = [r]));
      }
    } else if (a === Vl.current) {
      if (((l = a.alternate), l === null)) throw Error(D(387));
      l.memoizedState.memoizedState !== a.memoizedState.memoizedState &&
        (e !== null ? e.push(xs) : (e = [xs]));
    }
    a = a.return;
  }
  (e !== null && bu(t, e, n, i), (t.flags |= 262144));
}
function Yl(e) {
  for (e = e.firstContext; e !== null; ) {
    if (!mt(e.context._currentValue, e.memoizedValue)) return !0;
    e = e.next;
  }
  return !1;
}
function pi(e) {
  ((Ei = e),
    (an = null),
    (e = e.dependencies),
    e !== null && (e.firstContext = null));
}
function He(e) {
  return dg(Ei, e);
}
function Ws(e, t) {
  return (Ei === null && pi(e), dg(e, t));
}
function dg(e, t) {
  var n = t._currentValue;
  if (((t = { context: t, memoizedValue: n, next: null }), an === null)) {
    if (e === null) throw Error(D(308));
    ((an = t),
      (e.dependencies = { lanes: 0, firstContext: t }),
      (e.flags |= 524288));
  } else an = an.next = t;
  return n;
}
var Wx =
    typeof AbortController < "u"
      ? AbortController
      : function () {
          var e = [],
            t = (this.signal = {
              aborted: !1,
              addEventListener: function (n, i) {
                e.push(i);
              },
            });
          this.abort = function () {
            ((t.aborted = !0),
              e.forEach(function (n) {
                return n();
              }));
          };
        },
  eb = je.unstable_scheduleCallback,
  tb = je.unstable_NormalPriority,
  Ee = {
    $$typeof: tn,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0,
  };
function Yc() {
  return { controller: new Wx(), data: new Map(), refCount: 0 };
}
function Rs(e) {
  (e.refCount--,
    e.refCount === 0 &&
      eb(tb, function () {
        e.controller.abort();
      }));
}
var Qa = null,
  Su = 0,
  sa = 0,
  $i = null;
function nb(e, t) {
  if (Qa === null) {
    var n = (Qa = []);
    ((Su = 0),
      (sa = mf()),
      ($i = {
        status: "pending",
        value: void 0,
        then: function (i) {
          n.push(i);
        },
      }));
  }
  return (Su++, t.then(Bd, Bd), t);
}
function Bd() {
  if (--Su === 0 && Qa !== null) {
    $i !== null && ($i.status = "fulfilled");
    var e = Qa;
    ((Qa = null), (sa = 0), ($i = null));
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
}
function ib(e, t) {
  var n = [],
    i = {
      status: "pending",
      value: null,
      reason: null,
      then: function (a) {
        n.push(a);
      },
    };
  return (
    e.then(
      function () {
        ((i.status = "fulfilled"), (i.value = t));
        for (var a = 0; a < n.length; a++) (0, n[a])(t);
      },
      function (a) {
        for (i.status = "rejected", i.reason = a, a = 0; a < n.length; a++)
          (0, n[a])(void 0);
      },
    ),
    i
  );
}
var Hd = q.S;
q.S = function (e, t) {
  ((A0 = ct()),
    typeof t == "object" &&
      t !== null &&
      typeof t.then == "function" &&
      nb(e, t),
    Hd !== null && Hd(e, t));
};
var oi = kt(null);
function Xc() {
  var e = oi.current;
  return e !== null ? e : ne.pooledCache;
}
function xl(e, t) {
  t === null ? ae(oi, oi.current) : ae(oi, t.pool);
}
function hg() {
  var e = Xc();
  return e === null ? null : { parent: Ee._currentValue, pool: e };
}
var ba = Error(D(460)),
  kc = Error(D(474)),
  Or = Error(D(542)),
  Xl = { then: function () {} };
function Ud(e) {
  return ((e = e.status), e === "fulfilled" || e === "rejected");
}
function mg(e, t, n) {
  switch (
    ((n = e[n]),
    n === void 0 ? e.push(t) : n !== t && (t.then(nn, nn), (t = n)),
    t.status)
  ) {
    case "fulfilled":
      return t.value;
    case "rejected":
      throw ((e = t.reason), qd(e), e);
    default:
      if (typeof t.status == "string") t.then(nn, nn);
      else {
        if (((e = ne), e !== null && 100 < e.shellSuspendCounter))
          throw Error(D(482));
        ((e = t),
          (e.status = "pending"),
          e.then(
            function (i) {
              if (t.status === "pending") {
                var a = t;
                ((a.status = "fulfilled"), (a.value = i));
              }
            },
            function (i) {
              if (t.status === "pending") {
                var a = t;
                ((a.status = "rejected"), (a.reason = i));
              }
            },
          ));
      }
      switch (t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw ((e = t.reason), qd(e), e);
      }
      throw ((ui = t), ba);
  }
}
function ti(e) {
  try {
    var t = e._init;
    return t(e._payload);
  } catch (n) {
    throw n !== null && typeof n == "object" && typeof n.then == "function"
      ? ((ui = n), ba)
      : n;
  }
}
var ui = null;
function Gd() {
  if (ui === null) throw Error(D(459));
  var e = ui;
  return ((ui = null), e);
}
function qd(e) {
  if (e === ba || e === Or) throw Error(D(483));
}
var Ii = null,
  ms = 0;
function el(e) {
  var t = ms;
  return ((ms += 1), Ii === null && (Ii = []), mg(Ii, e, t));
}
function Oa(e, t) {
  ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
}
function tl(e, t) {
  throw t.$$typeof === X1
    ? Error(D(525))
    : ((e = Object.prototype.toString.call(t)),
      Error(
        D(
          31,
          e === "[object Object]"
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : e,
        ),
      ));
}
function pg(e) {
  function t(m, p) {
    if (e) {
      var v = m.deletions;
      v === null ? ((m.deletions = [p]), (m.flags |= 16)) : v.push(p);
    }
  }
  function n(m, p) {
    if (!e) return null;
    for (; p !== null; ) (t(m, p), (p = p.sibling));
    return null;
  }
  function i(m) {
    for (var p = new Map(); m !== null; )
      (m.key !== null ? p.set(m.key, m) : p.set(m.index, m), (m = m.sibling));
    return p;
  }
  function a(m, p) {
    return ((m = sn(m, p)), (m.index = 0), (m.sibling = null), m);
  }
  function s(m, p, v) {
    return (
      (m.index = v),
      e
        ? ((v = m.alternate),
          v !== null
            ? ((v = v.index), v < p ? ((m.flags |= 67108866), p) : v)
            : ((m.flags |= 67108866), p))
        : ((m.flags |= 1048576), p)
    );
  }
  function l(m) {
    return (e && m.alternate === null && (m.flags |= 67108866), m);
  }
  function r(m, p, v, b) {
    return p === null || p.tag !== 6
      ? ((p = lo(v, m.mode, b)), (p.return = m), p)
      : ((p = a(p, v)), (p.return = m), p);
  }
  function o(m, p, v, b) {
    var w = v.type;
    return w === Oi
      ? c(m, p, v.props.children, b, v.key)
      : p !== null &&
          (p.elementType === w ||
            (typeof w == "object" &&
              w !== null &&
              w.$$typeof === Sn &&
              ti(w) === p.type))
        ? ((p = a(p, v.props)), Oa(p, v), (p.return = m), p)
        : ((p = yl(v.type, v.key, v.props, null, m.mode, b)),
          Oa(p, v),
          (p.return = m),
          p);
  }
  function u(m, p, v, b) {
    return p === null ||
      p.tag !== 4 ||
      p.stateNode.containerInfo !== v.containerInfo ||
      p.stateNode.implementation !== v.implementation
      ? ((p = ro(v, m.mode, b)), (p.return = m), p)
      : ((p = a(p, v.children || [])), (p.return = m), p);
  }
  function c(m, p, v, b, w) {
    return p === null || p.tag !== 7
      ? ((p = ri(v, m.mode, b, w)), (p.return = m), p)
      : ((p = a(p, v)), (p.return = m), p);
  }
  function f(m, p, v) {
    if (
      (typeof p == "string" && p !== "") ||
      typeof p == "number" ||
      typeof p == "bigint"
    )
      return ((p = lo("" + p, m.mode, v)), (p.return = m), p);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case Ks:
          return (
            (v = yl(p.type, p.key, p.props, null, m.mode, v)),
            Oa(v, p),
            (v.return = m),
            v
          );
        case Ra:
          return ((p = ro(p, m.mode, v)), (p.return = m), p);
        case Sn:
          return ((p = ti(p)), f(m, p, v));
      }
      if (Ba(p) || Ca(p))
        return ((p = ri(p, m.mode, v, null)), (p.return = m), p);
      if (typeof p.then == "function") return f(m, el(p), v);
      if (p.$$typeof === tn) return f(m, Ws(m, p), v);
      tl(m, p);
    }
    return null;
  }
  function h(m, p, v, b) {
    var w = p !== null ? p.key : null;
    if (
      (typeof v == "string" && v !== "") ||
      typeof v == "number" ||
      typeof v == "bigint"
    )
      return w !== null ? null : r(m, p, "" + v, b);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case Ks:
          return v.key === w ? o(m, p, v, b) : null;
        case Ra:
          return v.key === w ? u(m, p, v, b) : null;
        case Sn:
          return ((v = ti(v)), h(m, p, v, b));
      }
      if (Ba(v) || Ca(v)) return w !== null ? null : c(m, p, v, b, null);
      if (typeof v.then == "function") return h(m, p, el(v), b);
      if (v.$$typeof === tn) return h(m, p, Ws(m, v), b);
      tl(m, v);
    }
    return null;
  }
  function d(m, p, v, b, w) {
    if (
      (typeof b == "string" && b !== "") ||
      typeof b == "number" ||
      typeof b == "bigint"
    )
      return ((m = m.get(v) || null), r(p, m, "" + b, w));
    if (typeof b == "object" && b !== null) {
      switch (b.$$typeof) {
        case Ks:
          return (
            (m = m.get(b.key === null ? v : b.key) || null),
            o(p, m, b, w)
          );
        case Ra:
          return (
            (m = m.get(b.key === null ? v : b.key) || null),
            u(p, m, b, w)
          );
        case Sn:
          return ((b = ti(b)), d(m, p, v, b, w));
      }
      if (Ba(b) || Ca(b)) return ((m = m.get(v) || null), c(p, m, b, w, null));
      if (typeof b.then == "function") return d(m, p, v, el(b), w);
      if (b.$$typeof === tn) return d(m, p, v, Ws(p, b), w);
      tl(p, b);
    }
    return null;
  }
  function y(m, p, v, b) {
    for (
      var w = null, M = null, E = p, S = (p = 0), O = null;
      E !== null && S < v.length;
      S++
    ) {
      E.index > S ? ((O = E), (E = null)) : (O = E.sibling);
      var C = h(m, E, v[S], b);
      if (C === null) {
        E === null && (E = O);
        break;
      }
      (e && E && C.alternate === null && t(m, E),
        (p = s(C, p, S)),
        M === null ? (w = C) : (M.sibling = C),
        (M = C),
        (E = O));
    }
    if (S === v.length) return (n(m, E), Z && Wt(m, S), w);
    if (E === null) {
      for (; S < v.length; S++)
        ((E = f(m, v[S], b)),
          E !== null &&
            ((p = s(E, p, S)),
            M === null ? (w = E) : (M.sibling = E),
            (M = E)));
      return (Z && Wt(m, S), w);
    }
    for (E = i(E); S < v.length; S++)
      ((O = d(E, m, S, v[S], b)),
        O !== null &&
          (e && O.alternate !== null && E.delete(O.key === null ? S : O.key),
          (p = s(O, p, S)),
          M === null ? (w = O) : (M.sibling = O),
          (M = O)));
    return (
      e &&
        E.forEach(function (A) {
          return t(m, A);
        }),
      Z && Wt(m, S),
      w
    );
  }
  function x(m, p, v, b) {
    if (v == null) throw Error(D(151));
    for (
      var w = null, M = null, E = p, S = (p = 0), O = null, C = v.next();
      E !== null && !C.done;
      S++, C = v.next()
    ) {
      E.index > S ? ((O = E), (E = null)) : (O = E.sibling);
      var A = h(m, E, C.value, b);
      if (A === null) {
        E === null && (E = O);
        break;
      }
      (e && E && A.alternate === null && t(m, E),
        (p = s(A, p, S)),
        M === null ? (w = A) : (M.sibling = A),
        (M = A),
        (E = O));
    }
    if (C.done) return (n(m, E), Z && Wt(m, S), w);
    if (E === null) {
      for (; !C.done; S++, C = v.next())
        ((C = f(m, C.value, b)),
          C !== null &&
            ((p = s(C, p, S)),
            M === null ? (w = C) : (M.sibling = C),
            (M = C)));
      return (Z && Wt(m, S), w);
    }
    for (E = i(E); !C.done; S++, C = v.next())
      ((C = d(E, m, S, C.value, b)),
        C !== null &&
          (e && C.alternate !== null && E.delete(C.key === null ? S : C.key),
          (p = s(C, p, S)),
          M === null ? (w = C) : (M.sibling = C),
          (M = C)));
    return (
      e &&
        E.forEach(function (j) {
          return t(m, j);
        }),
      Z && Wt(m, S),
      w
    );
  }
  function T(m, p, v, b) {
    if (
      (typeof v == "object" &&
        v !== null &&
        v.type === Oi &&
        v.key === null &&
        (v = v.props.children),
      typeof v == "object" && v !== null)
    ) {
      switch (v.$$typeof) {
        case Ks:
          e: {
            for (var w = v.key; p !== null; ) {
              if (p.key === w) {
                if (((w = v.type), w === Oi)) {
                  if (p.tag === 7) {
                    (n(m, p.sibling),
                      (b = a(p, v.props.children)),
                      (b.return = m),
                      (m = b));
                    break e;
                  }
                } else if (
                  p.elementType === w ||
                  (typeof w == "object" &&
                    w !== null &&
                    w.$$typeof === Sn &&
                    ti(w) === p.type)
                ) {
                  (n(m, p.sibling),
                    (b = a(p, v.props)),
                    Oa(b, v),
                    (b.return = m),
                    (m = b));
                  break e;
                }
                n(m, p);
                break;
              } else t(m, p);
              p = p.sibling;
            }
            v.type === Oi
              ? ((b = ri(v.props.children, m.mode, b, v.key)),
                (b.return = m),
                (m = b))
              : ((b = yl(v.type, v.key, v.props, null, m.mode, b)),
                Oa(b, v),
                (b.return = m),
                (m = b));
          }
          return l(m);
        case Ra:
          e: {
            for (w = v.key; p !== null; ) {
              if (p.key === w)
                if (
                  p.tag === 4 &&
                  p.stateNode.containerInfo === v.containerInfo &&
                  p.stateNode.implementation === v.implementation
                ) {
                  (n(m, p.sibling),
                    (b = a(p, v.children || [])),
                    (b.return = m),
                    (m = b));
                  break e;
                } else {
                  n(m, p);
                  break;
                }
              else t(m, p);
              p = p.sibling;
            }
            ((b = ro(v, m.mode, b)), (b.return = m), (m = b));
          }
          return l(m);
        case Sn:
          return ((v = ti(v)), T(m, p, v, b));
      }
      if (Ba(v)) return y(m, p, v, b);
      if (Ca(v)) {
        if (((w = Ca(v)), typeof w != "function")) throw Error(D(150));
        return ((v = w.call(v)), x(m, p, v, b));
      }
      if (typeof v.then == "function") return T(m, p, el(v), b);
      if (v.$$typeof === tn) return T(m, p, Ws(m, v), b);
      tl(m, v);
    }
    return (typeof v == "string" && v !== "") ||
      typeof v == "number" ||
      typeof v == "bigint"
      ? ((v = "" + v),
        p !== null && p.tag === 6
          ? (n(m, p.sibling), (b = a(p, v)), (b.return = m), (m = b))
          : (n(m, p), (b = lo(v, m.mode, b)), (b.return = m), (m = b)),
        l(m))
      : n(m, p);
  }
  return function (m, p, v, b) {
    try {
      ms = 0;
      var w = T(m, p, v, b);
      return ((Ii = null), w);
    } catch (E) {
      if (E === ba || E === Or) throw E;
      var M = ot(29, E, null, m.mode);
      return ((M.lanes = b), (M.return = m), M);
    } finally {
    }
  };
}
var gi = pg(!0),
  gg = pg(!1),
  Tn = !1;
function Pc(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, lanes: 0, hiddenCallbacks: null },
    callbacks: null,
  };
}
function Tu(e, t) {
  ((e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        callbacks: null,
      }));
}
function _n(e) {
  return { lane: e, tag: 0, payload: null, callback: null, next: null };
}
function Rn(e, t, n) {
  var i = e.updateQueue;
  if (i === null) return null;
  if (((i = i.shared), F & 2)) {
    var a = i.pending;
    return (
      a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)),
      (i.pending = t),
      (t = Gl(e)),
      rg(e, null, n),
      t
    );
  }
  return (Nr(e, i, t, n), Gl(e));
}
function Ka(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194048) !== 0))
  ) {
    var i = t.lanes;
    ((i &= e.pendingLanes), (n |= i), (t.lanes = n), Vp(e, n));
  }
}
function uo(e, t) {
  var n = e.updateQueue,
    i = e.alternate;
  if (i !== null && ((i = i.updateQueue), n === i)) {
    var a = null,
      s = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var l = {
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: null,
          next: null,
        };
        (s === null ? (a = s = l) : (s = s.next = l), (n = n.next));
      } while (n !== null);
      s === null ? (a = s = t) : (s = s.next = t);
    } else a = s = t;
    ((n = {
      baseState: i.baseState,
      firstBaseUpdate: a,
      lastBaseUpdate: s,
      shared: i.shared,
      callbacks: i.callbacks,
    }),
      (e.updateQueue = n));
    return;
  }
  ((e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t));
}
var wu = !1;
function Za() {
  if (wu) {
    var e = $i;
    if (e !== null) throw e;
  }
}
function Fa(e, t, n, i) {
  wu = !1;
  var a = e.updateQueue;
  Tn = !1;
  var s = a.firstBaseUpdate,
    l = a.lastBaseUpdate,
    r = a.shared.pending;
  if (r !== null) {
    a.shared.pending = null;
    var o = r,
      u = o.next;
    ((o.next = null), l === null ? (s = u) : (l.next = u), (l = o));
    var c = e.alternate;
    c !== null &&
      ((c = c.updateQueue),
      (r = c.lastBaseUpdate),
      r !== l &&
        (r === null ? (c.firstBaseUpdate = u) : (r.next = u),
        (c.lastBaseUpdate = o)));
  }
  if (s !== null) {
    var f = a.baseState;
    ((l = 0), (c = u = o = null), (r = s));
    do {
      var h = r.lane & -536870913,
        d = h !== r.lane;
      if (d ? (K & h) === h : (i & h) === h) {
        (h !== 0 && h === sa && (wu = !0),
          c !== null &&
            (c = c.next =
              {
                lane: 0,
                tag: r.tag,
                payload: r.payload,
                callback: null,
                next: null,
              }));
        e: {
          var y = e,
            x = r;
          h = t;
          var T = n;
          switch (x.tag) {
            case 1:
              if (((y = x.payload), typeof y == "function")) {
                f = y.call(T, f, h);
                break e;
              }
              f = y;
              break e;
            case 3:
              y.flags = (y.flags & -65537) | 128;
            case 0:
              if (
                ((y = x.payload),
                (h = typeof y == "function" ? y.call(T, f, h) : y),
                h == null)
              )
                break e;
              f = oe({}, f, h);
              break e;
            case 2:
              Tn = !0;
          }
        }
        ((h = r.callback),
          h !== null &&
            ((e.flags |= 64),
            d && (e.flags |= 8192),
            (d = a.callbacks),
            d === null ? (a.callbacks = [h]) : d.push(h)));
      } else
        ((d = {
          lane: h,
          tag: r.tag,
          payload: r.payload,
          callback: r.callback,
          next: null,
        }),
          c === null ? ((u = c = d), (o = f)) : (c = c.next = d),
          (l |= h));
      if (((r = r.next), r === null)) {
        if (((r = a.shared.pending), r === null)) break;
        ((d = r),
          (r = d.next),
          (d.next = null),
          (a.lastBaseUpdate = d),
          (a.shared.pending = null));
      }
    } while (!0);
    (c === null && (o = f),
      (a.baseState = o),
      (a.firstBaseUpdate = u),
      (a.lastBaseUpdate = c),
      s === null && (a.shared.lanes = 0),
      (Pn |= l),
      (e.lanes = l),
      (e.memoizedState = f));
  }
}
function vg(e, t) {
  if (typeof e != "function") throw Error(D(191, e));
  e.call(t);
}
function yg(e, t) {
  var n = e.callbacks;
  if (n !== null)
    for (e.callbacks = null, e = 0; e < n.length; e++) vg(n[e], t);
}
var la = kt(null),
  kl = kt(0);
function Yd(e, t) {
  ((e = dn), ae(kl, e), ae(la, t), (dn = e | t.baseLanes));
}
function Eu() {
  (ae(kl, dn), ae(la, la.current));
}
function Qc() {
  ((dn = kl.current), ze(la), ze(kl));
}
var pt = kt(null),
  Ct = null;
function En(e) {
  var t = e.alternate;
  (ae(ye, ye.current & 1),
    ae(pt, e),
    Ct === null &&
      (t === null || la.current !== null || t.memoizedState !== null) &&
      (Ct = e));
}
function Mu(e) {
  (ae(ye, ye.current), ae(pt, e), Ct === null && (Ct = e));
}
function xg(e) {
  e.tag === 22
    ? (ae(ye, ye.current), ae(pt, e), Ct === null && (Ct = e))
    : Mn();
}
function Mn() {
  (ae(ye, ye.current), ae(pt, pt.current));
}
function rt(e) {
  (ze(pt), Ct === e && (Ct = null), ze(ye));
}
var ye = kt(0);
function Pl(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && ((n = n.dehydrated), n === null || ku(n) || Pu(n)))
        return t;
    } else if (
      t.tag === 19 &&
      (t.memoizedProps.revealOrder === "forwards" ||
        t.memoizedProps.revealOrder === "backwards" ||
        t.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
        t.memoizedProps.revealOrder === "together")
    ) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      ((t.child.return = t), (t = t.child));
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    ((t.sibling.return = t.return), (t = t.sibling));
  }
  return null;
}
var un = 0,
  k = null,
  te = null,
  Te = null,
  Ql = !1,
  Ji = !1,
  vi = !1,
  Kl = 0,
  ps = 0,
  Wi = null,
  ab = 0;
function me() {
  throw Error(D(321));
}
function Kc(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!mt(e[n], t[n])) return !1;
  return !0;
}
function Zc(e, t, n, i, a, s) {
  return (
    (un = s),
    (k = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (q.H = e === null || e.memoizedState === null ? $g : lf),
    (vi = !1),
    (s = n(i, a)),
    (vi = !1),
    Ji && (s = Sg(t, n, i, a)),
    bg(e),
    s
  );
}
function bg(e) {
  q.H = gs;
  var t = te !== null && te.next !== null;
  if (((un = 0), (Te = te = k = null), (Ql = !1), (ps = 0), (Wi = null), t))
    throw Error(D(300));
  e === null || Me || ((e = e.dependencies), e !== null && Yl(e) && (Me = !0));
}
function Sg(e, t, n, i) {
  k = e;
  var a = 0;
  do {
    if ((Ji && (Wi = null), (ps = 0), (Ji = !1), 25 <= a)) throw Error(D(301));
    if (((a += 1), (Te = te = null), e.updateQueue != null)) {
      var s = e.updateQueue;
      ((s.lastEffect = null),
        (s.events = null),
        (s.stores = null),
        s.memoCache != null && (s.memoCache.index = 0));
    }
    ((q.H = Ig), (s = t(n, i)));
  } while (Ji);
  return s;
}
function sb() {
  var e = q.H,
    t = e.useState()[0];
  return (
    (t = typeof t.then == "function" ? Bs(t) : t),
    (e = e.useState()[0]),
    (te !== null ? te.memoizedState : null) !== e && (k.flags |= 1024),
    t
  );
}
function Fc() {
  var e = Kl !== 0;
  return ((Kl = 0), e);
}
function $c(e, t, n) {
  ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~n));
}
function Ic(e) {
  if (Ql) {
    for (e = e.memoizedState; e !== null; ) {
      var t = e.queue;
      (t !== null && (t.pending = null), (e = e.next));
    }
    Ql = !1;
  }
  ((un = 0), (Te = te = k = null), (Ji = !1), (ps = Kl = 0), (Wi = null));
}
function Ye() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (Te === null ? (k.memoizedState = Te = e) : (Te = Te.next = e), Te);
}
function xe() {
  if (te === null) {
    var e = k.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = te.next;
  var t = Te === null ? k.memoizedState : Te.next;
  if (t !== null) ((Te = t), (te = e));
  else {
    if (e === null) throw k.alternate === null ? Error(D(467)) : Error(D(310));
    ((te = e),
      (e = {
        memoizedState: te.memoizedState,
        baseState: te.baseState,
        baseQueue: te.baseQueue,
        queue: te.queue,
        next: null,
      }),
      Te === null ? (k.memoizedState = Te = e) : (Te = Te.next = e));
  }
  return Te;
}
function Dr() {
  return { lastEffect: null, events: null, stores: null, memoCache: null };
}
function Bs(e) {
  var t = ps;
  return (
    (ps += 1),
    Wi === null && (Wi = []),
    (e = mg(Wi, e, t)),
    (t = k),
    (Te === null ? t.memoizedState : Te.next) === null &&
      ((t = t.alternate),
      (q.H = t === null || t.memoizedState === null ? $g : lf)),
    e
  );
}
function zr(e) {
  if (e !== null && typeof e == "object") {
    if (typeof e.then == "function") return Bs(e);
    if (e.$$typeof === tn) return He(e);
  }
  throw Error(D(438, String(e)));
}
function Jc(e) {
  var t = null,
    n = k.updateQueue;
  if ((n !== null && (t = n.memoCache), t == null)) {
    var i = k.alternate;
    i !== null &&
      ((i = i.updateQueue),
      i !== null &&
        ((i = i.memoCache),
        i != null &&
          (t = {
            data: i.data.map(function (a) {
              return a.slice();
            }),
            index: 0,
          })));
  }
  if (
    (t == null && (t = { data: [], index: 0 }),
    n === null && ((n = Dr()), (k.updateQueue = n)),
    (n.memoCache = t),
    (n = t.data[t.index]),
    n === void 0)
  )
    for (n = t.data[t.index] = Array(e), i = 0; i < e; i++) n[i] = k1;
  return (t.index++, n);
}
function cn(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function bl(e) {
  var t = xe();
  return Wc(t, te, e);
}
function Wc(e, t, n) {
  var i = e.queue;
  if (i === null) throw Error(D(311));
  i.lastRenderedReducer = n;
  var a = e.baseQueue,
    s = i.pending;
  if (s !== null) {
    if (a !== null) {
      var l = a.next;
      ((a.next = s.next), (s.next = l));
    }
    ((t.baseQueue = a = s), (i.pending = null));
  }
  if (((s = e.baseState), a === null)) e.memoizedState = s;
  else {
    t = a.next;
    var r = (l = null),
      o = null,
      u = t,
      c = !1;
    do {
      var f = u.lane & -536870913;
      if (f !== u.lane ? (K & f) === f : (un & f) === f) {
        var h = u.revertLane;
        if (h === 0)
          (o !== null &&
            (o = o.next =
              {
                lane: 0,
                revertLane: 0,
                gesture: null,
                action: u.action,
                hasEagerState: u.hasEagerState,
                eagerState: u.eagerState,
                next: null,
              }),
            f === sa && (c = !0));
        else if ((un & h) === h) {
          ((u = u.next), h === sa && (c = !0));
          continue;
        } else
          ((f = {
            lane: 0,
            revertLane: u.revertLane,
            gesture: null,
            action: u.action,
            hasEagerState: u.hasEagerState,
            eagerState: u.eagerState,
            next: null,
          }),
            o === null ? ((r = o = f), (l = s)) : (o = o.next = f),
            (k.lanes |= h),
            (Pn |= h));
        ((f = u.action),
          vi && n(s, f),
          (s = u.hasEagerState ? u.eagerState : n(s, f)));
      } else
        ((h = {
          lane: f,
          revertLane: u.revertLane,
          gesture: u.gesture,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        }),
          o === null ? ((r = o = h), (l = s)) : (o = o.next = h),
          (k.lanes |= f),
          (Pn |= f));
      u = u.next;
    } while (u !== null && u !== t);
    if (
      (o === null ? (l = s) : (o.next = r),
      !mt(s, e.memoizedState) && ((Me = !0), c && ((n = $i), n !== null)))
    )
      throw n;
    ((e.memoizedState = s),
      (e.baseState = l),
      (e.baseQueue = o),
      (i.lastRenderedState = s));
  }
  return (a === null && (i.lanes = 0), [e.memoizedState, i.dispatch]);
}
function co(e) {
  var t = xe(),
    n = t.queue;
  if (n === null) throw Error(D(311));
  n.lastRenderedReducer = e;
  var i = n.dispatch,
    a = n.pending,
    s = t.memoizedState;
  if (a !== null) {
    n.pending = null;
    var l = (a = a.next);
    do ((s = e(s, l.action)), (l = l.next));
    while (l !== a);
    (mt(s, t.memoizedState) || (Me = !0),
      (t.memoizedState = s),
      t.baseQueue === null && (t.baseState = s),
      (n.lastRenderedState = s));
  }
  return [s, i];
}
function Tg(e, t, n) {
  var i = k,
    a = xe(),
    s = Z;
  if (s) {
    if (n === void 0) throw Error(D(407));
    n = n();
  } else n = t();
  var l = !mt((te || a).memoizedState, n);
  if (
    (l && ((a.memoizedState = n), (Me = !0)),
    (a = a.queue),
    ef(Mg.bind(null, i, a, e), [e]),
    a.getSnapshot !== t || l || (Te !== null && Te.memoizedState.tag & 1))
  ) {
    if (
      ((i.flags |= 2048),
      ra(9, { destroy: void 0 }, Eg.bind(null, i, a, n, t), null),
      ne === null)
    )
      throw Error(D(349));
    s || un & 127 || wg(i, t, n);
  }
  return n;
}
function wg(e, t, n) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = k.updateQueue),
    t === null
      ? ((t = Dr()), (k.updateQueue = t), (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
}
function Eg(e, t, n, i) {
  ((t.value = n), (t.getSnapshot = i), Ag(t) && Cg(e));
}
function Mg(e, t, n) {
  return n(function () {
    Ag(t) && Cg(e);
  });
}
function Ag(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !mt(e, n);
  } catch {
    return !0;
  }
}
function Cg(e) {
  var t = wi(e, 2);
  t !== null && et(t, e, 2);
}
function Au(e) {
  var t = Ye();
  if (typeof e == "function") {
    var n = e;
    if (((e = n()), vi)) {
      Cn(!0);
      try {
        n();
      } finally {
        Cn(!1);
      }
    }
  }
  return (
    (t.memoizedState = t.baseState = e),
    (t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: cn,
      lastRenderedState: e,
    }),
    t
  );
}
function jg(e, t, n, i) {
  return ((e.baseState = n), Wc(e, te, typeof i == "function" ? i : cn));
}
function lb(e, t, n, i, a) {
  if (Vr(e)) throw Error(D(485));
  if (((e = t.action), e !== null)) {
    var s = {
      payload: a,
      action: e,
      next: null,
      isTransition: !0,
      status: "pending",
      value: null,
      reason: null,
      listeners: [],
      then: function (l) {
        s.listeners.push(l);
      },
    };
    (q.T !== null ? n(!0) : (s.isTransition = !1),
      i(s),
      (n = t.pending),
      n === null
        ? ((s.next = t.pending = s), Ng(t, s))
        : ((s.next = n.next), (t.pending = n.next = s)));
  }
}
function Ng(e, t) {
  var n = t.action,
    i = t.payload,
    a = e.state;
  if (t.isTransition) {
    var s = q.T,
      l = {};
    q.T = l;
    try {
      var r = n(a, i),
        o = q.S;
      (o !== null && o(l, r), Xd(e, t, r));
    } catch (u) {
      Cu(e, t, u);
    } finally {
      (s !== null && l.types !== null && (s.types = l.types), (q.T = s));
    }
  } else
    try {
      ((s = n(a, i)), Xd(e, t, s));
    } catch (u) {
      Cu(e, t, u);
    }
}
function Xd(e, t, n) {
  n !== null && typeof n == "object" && typeof n.then == "function"
    ? n.then(
        function (i) {
          kd(e, t, i);
        },
        function (i) {
          return Cu(e, t, i);
        },
      )
    : kd(e, t, n);
}
function kd(e, t, n) {
  ((t.status = "fulfilled"),
    (t.value = n),
    Og(t),
    (e.state = n),
    (t = e.pending),
    t !== null &&
      ((n = t.next),
      n === t ? (e.pending = null) : ((n = n.next), (t.next = n), Ng(e, n))));
}
function Cu(e, t, n) {
  var i = e.pending;
  if (((e.pending = null), i !== null)) {
    i = i.next;
    do ((t.status = "rejected"), (t.reason = n), Og(t), (t = t.next));
    while (t !== i);
  }
  e.action = null;
}
function Og(e) {
  e = e.listeners;
  for (var t = 0; t < e.length; t++) (0, e[t])();
}
function Dg(e, t) {
  return t;
}
function Pd(e, t) {
  if (Z) {
    var n = ne.formState;
    if (n !== null) {
      e: {
        var i = k;
        if (Z) {
          if (le) {
            t: {
              for (var a = le, s = Mt; a.nodeType !== 8; ) {
                if (!s) {
                  a = null;
                  break t;
                }
                if (((a = jt(a.nextSibling)), a === null)) {
                  a = null;
                  break t;
                }
              }
              ((s = a.data), (a = s === "F!" || s === "F" ? a : null));
            }
            if (a) {
              ((le = jt(a.nextSibling)), (i = a.data === "F!"));
              break e;
            }
          }
          Xn(i);
        }
        i = !1;
      }
      i && (t = n[0]);
    }
  }
  return (
    (n = Ye()),
    (n.memoizedState = n.baseState = t),
    (i = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Dg,
      lastRenderedState: t,
    }),
    (n.queue = i),
    (n = Kg.bind(null, k, i)),
    (i.dispatch = n),
    (i = Au(!1)),
    (s = sf.bind(null, k, !1, i.queue)),
    (i = Ye()),
    (a = { state: t, dispatch: null, action: e, pending: null }),
    (i.queue = a),
    (n = lb.bind(null, k, a, s, n)),
    (a.dispatch = n),
    (i.memoizedState = e),
    [t, n, !1]
  );
}
function Qd(e) {
  var t = xe();
  return zg(t, te, e);
}
function zg(e, t, n) {
  if (
    ((t = Wc(e, t, Dg)[0]),
    (e = bl(cn)[0]),
    typeof t == "object" && t !== null && typeof t.then == "function")
  )
    try {
      var i = Bs(t);
    } catch (l) {
      throw l === ba ? Or : l;
    }
  else i = t;
  t = xe();
  var a = t.queue,
    s = a.dispatch;
  return (
    n !== t.memoizedState &&
      ((k.flags |= 2048),
      ra(9, { destroy: void 0 }, rb.bind(null, a, n), null)),
    [i, s, e]
  );
}
function rb(e, t) {
  e.action = t;
}
function Kd(e) {
  var t = xe(),
    n = te;
  if (n !== null) return zg(t, n, e);
  (xe(), (t = t.memoizedState), (n = xe()));
  var i = n.queue.dispatch;
  return ((n.memoizedState = e), [t, i, !1]);
}
function ra(e, t, n, i) {
  return (
    (e = { tag: e, create: n, deps: i, inst: t, next: null }),
    (t = k.updateQueue),
    t === null && ((t = Dr()), (k.updateQueue = t)),
    (n = t.lastEffect),
    n === null
      ? (t.lastEffect = e.next = e)
      : ((i = n.next), (n.next = e), (e.next = i), (t.lastEffect = e)),
    e
  );
}
function Lg() {
  return xe().memoizedState;
}
function Sl(e, t, n, i) {
  var a = Ye();
  ((k.flags |= e),
    (a.memoizedState = ra(
      1 | t,
      { destroy: void 0 },
      n,
      i === void 0 ? null : i,
    )));
}
function Lr(e, t, n, i) {
  var a = xe();
  i = i === void 0 ? null : i;
  var s = a.memoizedState.inst;
  te !== null && i !== null && Kc(i, te.memoizedState.deps)
    ? (a.memoizedState = ra(t, s, n, i))
    : ((k.flags |= e), (a.memoizedState = ra(1 | t, s, n, i)));
}
function Zd(e, t) {
  Sl(8390656, 8, e, t);
}
function ef(e, t) {
  Lr(2048, 8, e, t);
}
function ob(e) {
  k.flags |= 4;
  var t = k.updateQueue;
  if (t === null) ((t = Dr()), (k.updateQueue = t), (t.events = [e]));
  else {
    var n = t.events;
    n === null ? (t.events = [e]) : n.push(e);
  }
}
function Vg(e) {
  var t = xe().memoizedState;
  return (
    ob({ ref: t, nextImpl: e }),
    function () {
      if (F & 2) throw Error(D(440));
      return t.impl.apply(void 0, arguments);
    }
  );
}
function _g(e, t) {
  return Lr(4, 2, e, t);
}
function Rg(e, t) {
  return Lr(4, 4, e, t);
}
function Bg(e, t) {
  if (typeof t == "function") {
    e = e();
    var n = t(e);
    return function () {
      typeof n == "function" ? n() : t(null);
    };
  }
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Hg(e, t, n) {
  ((n = n != null ? n.concat([e]) : null), Lr(4, 4, Bg.bind(null, t, e), n));
}
function tf() {}
function Ug(e, t) {
  var n = xe();
  t = t === void 0 ? null : t;
  var i = n.memoizedState;
  return t !== null && Kc(t, i[1]) ? i[0] : ((n.memoizedState = [e, t]), e);
}
function Gg(e, t) {
  var n = xe();
  t = t === void 0 ? null : t;
  var i = n.memoizedState;
  if (t !== null && Kc(t, i[1])) return i[0];
  if (((i = e()), vi)) {
    Cn(!0);
    try {
      e();
    } finally {
      Cn(!1);
    }
  }
  return ((n.memoizedState = [i, t]), i);
}
function nf(e, t, n) {
  return n === void 0 || (un & 1073741824 && !(K & 261930))
    ? (e.memoizedState = t)
    : ((e.memoizedState = n), (e = j0()), (k.lanes |= e), (Pn |= e), n);
}
function qg(e, t, n, i) {
  return mt(n, t)
    ? n
    : la.current !== null
      ? ((e = nf(e, n, i)), mt(e, t) || (Me = !0), e)
      : !(un & 42) || (un & 1073741824 && !(K & 261930))
        ? ((Me = !0), (e.memoizedState = n))
        : ((e = j0()), (k.lanes |= e), (Pn |= e), t);
}
function Yg(e, t, n, i, a) {
  var s = $.p;
  $.p = s !== 0 && 8 > s ? s : 8;
  var l = q.T,
    r = {};
  ((q.T = r), sf(e, !1, t, n));
  try {
    var o = a(),
      u = q.S;
    if (
      (u !== null && u(r, o),
      o !== null && typeof o == "object" && typeof o.then == "function")
    ) {
      var c = ib(o, i);
      $a(e, t, c, ht(e));
    } else $a(e, t, i, ht(e));
  } catch (f) {
    $a(e, t, { then: function () {}, status: "rejected", reason: f }, ht());
  } finally {
    (($.p = s),
      l !== null && r.types !== null && (l.types = r.types),
      (q.T = l));
  }
}
function ub() {}
function ju(e, t, n, i) {
  if (e.tag !== 5) throw Error(D(476));
  var a = Xg(e).queue;
  Yg(
    e,
    a,
    t,
    li,
    n === null
      ? ub
      : function () {
          return (kg(e), n(i));
        },
  );
}
function Xg(e) {
  var t = e.memoizedState;
  if (t !== null) return t;
  t = {
    memoizedState: li,
    baseState: li,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: cn,
      lastRenderedState: li,
    },
    next: null,
  };
  var n = {};
  return (
    (t.next = {
      memoizedState: n,
      baseState: n,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: cn,
        lastRenderedState: n,
      },
      next: null,
    }),
    (e.memoizedState = t),
    (e = e.alternate),
    e !== null && (e.memoizedState = t),
    t
  );
}
function kg(e) {
  var t = Xg(e);
  (t.next === null && (t = e.alternate.memoizedState),
    $a(e, t.next.queue, {}, ht()));
}
function af() {
  return He(xs);
}
function Pg() {
  return xe().memoizedState;
}
function Qg() {
  return xe().memoizedState;
}
function cb(e) {
  for (var t = e.return; t !== null; ) {
    switch (t.tag) {
      case 24:
      case 3:
        var n = ht();
        e = _n(n);
        var i = Rn(t, e, n);
        (i !== null && (et(i, t, n), Ka(i, t, n)),
          (t = { cache: Yc() }),
          (e.payload = t));
        return;
    }
    t = t.return;
  }
}
function fb(e, t, n) {
  var i = ht();
  ((n = {
    lane: i,
    revertLane: 0,
    gesture: null,
    action: n,
    hasEagerState: !1,
    eagerState: null,
    next: null,
  }),
    Vr(e)
      ? Zg(t, n)
      : ((n = Hc(e, t, n, i)), n !== null && (et(n, e, i), Fg(n, t, i))));
}
function Kg(e, t, n) {
  var i = ht();
  $a(e, t, n, i);
}
function $a(e, t, n, i) {
  var a = {
    lane: i,
    revertLane: 0,
    gesture: null,
    action: n,
    hasEagerState: !1,
    eagerState: null,
    next: null,
  };
  if (Vr(e)) Zg(t, a);
  else {
    var s = e.alternate;
    if (
      e.lanes === 0 &&
      (s === null || s.lanes === 0) &&
      ((s = t.lastRenderedReducer), s !== null)
    )
      try {
        var l = t.lastRenderedState,
          r = s(l, n);
        if (((a.hasEagerState = !0), (a.eagerState = r), mt(r, l)))
          return (Nr(e, t, a, 0), ne === null && jr(), !1);
      } catch {
      } finally {
      }
    if (((n = Hc(e, t, a, i)), n !== null))
      return (et(n, e, i), Fg(n, t, i), !0);
  }
  return !1;
}
function sf(e, t, n, i) {
  if (
    ((i = {
      lane: 2,
      revertLane: mf(),
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Vr(e))
  ) {
    if (t) throw Error(D(479));
  } else ((t = Hc(e, n, i, 2)), t !== null && et(t, e, 2));
}
function Vr(e) {
  var t = e.alternate;
  return e === k || (t !== null && t === k);
}
function Zg(e, t) {
  Ji = Ql = !0;
  var n = e.pending;
  (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t));
}
function Fg(e, t, n) {
  if (n & 4194048) {
    var i = t.lanes;
    ((i &= e.pendingLanes), (n |= i), (t.lanes = n), Vp(e, n));
  }
}
var gs = {
  readContext: He,
  use: zr,
  useCallback: me,
  useContext: me,
  useEffect: me,
  useImperativeHandle: me,
  useLayoutEffect: me,
  useInsertionEffect: me,
  useMemo: me,
  useReducer: me,
  useRef: me,
  useState: me,
  useDebugValue: me,
  useDeferredValue: me,
  useTransition: me,
  useSyncExternalStore: me,
  useId: me,
  useHostTransitionStatus: me,
  useFormState: me,
  useActionState: me,
  useOptimistic: me,
  useMemoCache: me,
  useCacheRefresh: me,
};
gs.useEffectEvent = me;
var $g = {
    readContext: He,
    use: zr,
    useCallback: function (e, t) {
      return ((Ye().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: He,
    useEffect: Zd,
    useImperativeHandle: function (e, t, n) {
      ((n = n != null ? n.concat([e]) : null),
        Sl(4194308, 4, Bg.bind(null, t, e), n));
    },
    useLayoutEffect: function (e, t) {
      return Sl(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      Sl(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Ye();
      t = t === void 0 ? null : t;
      var i = e();
      if (vi) {
        Cn(!0);
        try {
          e();
        } finally {
          Cn(!1);
        }
      }
      return ((n.memoizedState = [i, t]), i);
    },
    useReducer: function (e, t, n) {
      var i = Ye();
      if (n !== void 0) {
        var a = n(t);
        if (vi) {
          Cn(!0);
          try {
            n(t);
          } finally {
            Cn(!1);
          }
        }
      } else a = t;
      return (
        (i.memoizedState = i.baseState = a),
        (e = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: a,
        }),
        (i.queue = e),
        (e = e.dispatch = fb.bind(null, k, e)),
        [i.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Ye();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: function (e) {
      e = Au(e);
      var t = e.queue,
        n = Kg.bind(null, k, t);
      return ((t.dispatch = n), [e.memoizedState, n]);
    },
    useDebugValue: tf,
    useDeferredValue: function (e, t) {
      var n = Ye();
      return nf(n, e, t);
    },
    useTransition: function () {
      var e = Au(!1);
      return (
        (e = Yg.bind(null, k, e.queue, !0, !1)),
        (Ye().memoizedState = e),
        [!1, e]
      );
    },
    useSyncExternalStore: function (e, t, n) {
      var i = k,
        a = Ye();
      if (Z) {
        if (n === void 0) throw Error(D(407));
        n = n();
      } else {
        if (((n = t()), ne === null)) throw Error(D(349));
        K & 127 || wg(i, t, n);
      }
      a.memoizedState = n;
      var s = { value: n, getSnapshot: t };
      return (
        (a.queue = s),
        Zd(Mg.bind(null, i, s, e), [e]),
        (i.flags |= 2048),
        ra(9, { destroy: void 0 }, Eg.bind(null, i, s, n, t), null),
        n
      );
    },
    useId: function () {
      var e = Ye(),
        t = ne.identifierPrefix;
      if (Z) {
        var n = Bt,
          i = Rt;
        ((n = (i & ~(1 << (32 - dt(i) - 1))).toString(32) + n),
          (t = "_" + t + "R_" + n),
          (n = Kl++),
          0 < n && (t += "H" + n.toString(32)),
          (t += "_"));
      } else ((n = ab++), (t = "_" + t + "r_" + n.toString(32) + "_"));
      return (e.memoizedState = t);
    },
    useHostTransitionStatus: af,
    useFormState: Pd,
    useActionState: Pd,
    useOptimistic: function (e) {
      var t = Ye();
      t.memoizedState = t.baseState = e;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null,
      };
      return (
        (t.queue = n),
        (t = sf.bind(null, k, !0, n)),
        (n.dispatch = t),
        [e, t]
      );
    },
    useMemoCache: Jc,
    useCacheRefresh: function () {
      return (Ye().memoizedState = cb.bind(null, k));
    },
    useEffectEvent: function (e) {
      var t = Ye(),
        n = { impl: e };
      return (
        (t.memoizedState = n),
        function () {
          if (F & 2) throw Error(D(440));
          return n.impl.apply(void 0, arguments);
        }
      );
    },
  },
  lf = {
    readContext: He,
    use: zr,
    useCallback: Ug,
    useContext: He,
    useEffect: ef,
    useImperativeHandle: Hg,
    useInsertionEffect: _g,
    useLayoutEffect: Rg,
    useMemo: Gg,
    useReducer: bl,
    useRef: Lg,
    useState: function () {
      return bl(cn);
    },
    useDebugValue: tf,
    useDeferredValue: function (e, t) {
      var n = xe();
      return qg(n, te.memoizedState, e, t);
    },
    useTransition: function () {
      var e = bl(cn)[0],
        t = xe().memoizedState;
      return [typeof e == "boolean" ? e : Bs(e), t];
    },
    useSyncExternalStore: Tg,
    useId: Pg,
    useHostTransitionStatus: af,
    useFormState: Qd,
    useActionState: Qd,
    useOptimistic: function (e, t) {
      var n = xe();
      return jg(n, te, e, t);
    },
    useMemoCache: Jc,
    useCacheRefresh: Qg,
  };
lf.useEffectEvent = Vg;
var Ig = {
  readContext: He,
  use: zr,
  useCallback: Ug,
  useContext: He,
  useEffect: ef,
  useImperativeHandle: Hg,
  useInsertionEffect: _g,
  useLayoutEffect: Rg,
  useMemo: Gg,
  useReducer: co,
  useRef: Lg,
  useState: function () {
    return co(cn);
  },
  useDebugValue: tf,
  useDeferredValue: function (e, t) {
    var n = xe();
    return te === null ? nf(n, e, t) : qg(n, te.memoizedState, e, t);
  },
  useTransition: function () {
    var e = co(cn)[0],
      t = xe().memoizedState;
    return [typeof e == "boolean" ? e : Bs(e), t];
  },
  useSyncExternalStore: Tg,
  useId: Pg,
  useHostTransitionStatus: af,
  useFormState: Kd,
  useActionState: Kd,
  useOptimistic: function (e, t) {
    var n = xe();
    return te !== null
      ? jg(n, te, e, t)
      : ((n.baseState = e), [e, n.queue.dispatch]);
  },
  useMemoCache: Jc,
  useCacheRefresh: Qg,
};
Ig.useEffectEvent = Vg;
function fo(e, t, n, i) {
  ((t = e.memoizedState),
    (n = n(i, t)),
    (n = n == null ? t : oe({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n));
}
var Nu = {
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var i = ht(),
      a = _n(i);
    ((a.payload = t),
      n != null && (a.callback = n),
      (t = Rn(e, a, i)),
      t !== null && (et(t, e, i), Ka(t, e, i)));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var i = ht(),
      a = _n(i);
    ((a.tag = 1),
      (a.payload = t),
      n != null && (a.callback = n),
      (t = Rn(e, a, i)),
      t !== null && (et(t, e, i), Ka(t, e, i)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = ht(),
      i = _n(n);
    ((i.tag = 2),
      t != null && (i.callback = t),
      (t = Rn(e, i, n)),
      t !== null && (et(t, e, n), Ka(t, e, n)));
  },
};
function Fd(e, t, n, i, a, s, l) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(i, s, l)
      : t.prototype && t.prototype.isPureReactComponent
        ? !fs(n, i) || !fs(a, s)
        : !0
  );
}
function $d(e, t, n, i) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, i),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, i),
    t.state !== e && Nu.enqueueReplaceState(t, t.state, null));
}
function yi(e, t) {
  var n = t;
  if ("ref" in t) {
    n = {};
    for (var i in t) i !== "ref" && (n[i] = t[i]);
  }
  if ((e = e.defaultProps)) {
    n === t && (n = oe({}, n));
    for (var a in e) n[a] === void 0 && (n[a] = e[a]);
  }
  return n;
}
function Jg(e) {
  Ul(e);
}
function Wg(e) {
  console.error(e);
}
function e0(e) {
  Ul(e);
}
function Zl(e, t) {
  try {
    var n = e.onUncaughtError;
    n(t.value, { componentStack: t.stack });
  } catch (i) {
    setTimeout(function () {
      throw i;
    });
  }
}
function Id(e, t, n) {
  try {
    var i = e.onCaughtError;
    i(n.value, {
      componentStack: n.stack,
      errorBoundary: t.tag === 1 ? t.stateNode : null,
    });
  } catch (a) {
    setTimeout(function () {
      throw a;
    });
  }
}
function Ou(e, t, n) {
  return (
    (n = _n(n)),
    (n.tag = 3),
    (n.payload = { element: null }),
    (n.callback = function () {
      Zl(e, t);
    }),
    n
  );
}
function t0(e) {
  return ((e = _n(e)), (e.tag = 3), e);
}
function n0(e, t, n, i) {
  var a = n.type.getDerivedStateFromError;
  if (typeof a == "function") {
    var s = i.value;
    ((e.payload = function () {
      return a(s);
    }),
      (e.callback = function () {
        Id(t, n, i);
      }));
  }
  var l = n.stateNode;
  l !== null &&
    typeof l.componentDidCatch == "function" &&
    (e.callback = function () {
      (Id(t, n, i),
        typeof a != "function" &&
          (Bn === null ? (Bn = new Set([this])) : Bn.add(this)));
      var r = i.stack;
      this.componentDidCatch(i.value, { componentStack: r !== null ? r : "" });
    });
}
function db(e, t, n, i, a) {
  if (
    ((n.flags |= 32768),
    i !== null && typeof i == "object" && typeof i.then == "function")
  ) {
    if (
      ((t = n.alternate),
      t !== null && xa(t, n, a, !0),
      (n = pt.current),
      n !== null)
    ) {
      switch (n.tag) {
        case 31:
        case 13:
          return (
            Ct === null ? Wl() : n.alternate === null && ge === 0 && (ge = 3),
            (n.flags &= -257),
            (n.flags |= 65536),
            (n.lanes = a),
            i === Xl
              ? (n.flags |= 16384)
              : ((t = n.updateQueue),
                t === null ? (n.updateQueue = new Set([i])) : t.add(i),
                wo(e, i, a)),
            !1
          );
        case 22:
          return (
            (n.flags |= 65536),
            i === Xl
              ? (n.flags |= 16384)
              : ((t = n.updateQueue),
                t === null
                  ? ((t = {
                      transitions: null,
                      markerInstances: null,
                      retryQueue: new Set([i]),
                    }),
                    (n.updateQueue = t))
                  : ((n = t.retryQueue),
                    n === null ? (t.retryQueue = new Set([i])) : n.add(i)),
                wo(e, i, a)),
            !1
          );
      }
      throw Error(D(435, n.tag));
    }
    return (wo(e, i, a), Wl(), !1);
  }
  if (Z)
    return (
      (t = pt.current),
      t !== null
        ? (!(t.flags & 65536) && (t.flags |= 256),
          (t.flags |= 65536),
          (t.lanes = a),
          i !== vu && ((e = Error(D(422), { cause: i })), hs(Et(e, n))))
        : (i !== vu && ((t = Error(D(423), { cause: i })), hs(Et(t, n))),
          (e = e.current.alternate),
          (e.flags |= 65536),
          (a &= -a),
          (e.lanes |= a),
          (i = Et(i, n)),
          (a = Ou(e.stateNode, i, a)),
          uo(e, a),
          ge !== 4 && (ge = 2)),
      !1
    );
  var s = Error(D(520), { cause: i });
  if (
    ((s = Et(s, n)),
    Wa === null ? (Wa = [s]) : Wa.push(s),
    ge !== 4 && (ge = 2),
    t === null)
  )
    return !0;
  ((i = Et(i, n)), (n = t));
  do {
    switch (n.tag) {
      case 3:
        return (
          (n.flags |= 65536),
          (e = a & -a),
          (n.lanes |= e),
          (e = Ou(n.stateNode, i, e)),
          uo(n, e),
          !1
        );
      case 1:
        if (
          ((t = n.type),
          (s = n.stateNode),
          (n.flags & 128) === 0 &&
            (typeof t.getDerivedStateFromError == "function" ||
              (s !== null &&
                typeof s.componentDidCatch == "function" &&
                (Bn === null || !Bn.has(s)))))
        )
          return (
            (n.flags |= 65536),
            (a &= -a),
            (n.lanes |= a),
            (a = t0(a)),
            n0(a, e, n, i),
            uo(n, a),
            !1
          );
    }
    n = n.return;
  } while (n !== null);
  return !1;
}
var rf = Error(D(461)),
  Me = !1;
function _e(e, t, n, i) {
  t.child = e === null ? gg(t, null, n, i) : gi(t, e.child, n, i);
}
function Jd(e, t, n, i, a) {
  n = n.render;
  var s = t.ref;
  if ("ref" in i) {
    var l = {};
    for (var r in i) r !== "ref" && (l[r] = i[r]);
  } else l = i;
  return (
    pi(t),
    (i = Zc(e, t, n, l, s, a)),
    (r = Fc()),
    e !== null && !Me
      ? ($c(e, t, a), fn(e, t, a))
      : (Z && r && Gc(t), (t.flags |= 1), _e(e, t, i, a), t.child)
  );
}
function Wd(e, t, n, i, a) {
  if (e === null) {
    var s = n.type;
    return typeof s == "function" &&
      !Uc(s) &&
      s.defaultProps === void 0 &&
      n.compare === null
      ? ((t.tag = 15), (t.type = s), i0(e, t, s, i, a))
      : ((e = yl(n.type, null, i, t, t.mode, a)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((s = e.child), !of(e, a))) {
    var l = s.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : fs), n(l, i) && e.ref === t.ref)
    )
      return fn(e, t, a);
  }
  return (
    (t.flags |= 1),
    (e = sn(s, i)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function i0(e, t, n, i, a) {
  if (e !== null) {
    var s = e.memoizedProps;
    if (fs(s, i) && e.ref === t.ref)
      if (((Me = !1), (t.pendingProps = i = s), of(e, a)))
        e.flags & 131072 && (Me = !0);
      else return ((t.lanes = e.lanes), fn(e, t, a));
  }
  return Du(e, t, n, i, a);
}
function a0(e, t, n, i) {
  var a = i.children,
    s = e !== null ? e.memoizedState : null;
  if (
    (e === null &&
      t.stateNode === null &&
      (t.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
    i.mode === "hidden")
  ) {
    if (t.flags & 128) {
      if (((s = s !== null ? s.baseLanes | n : n), e !== null)) {
        for (i = t.child = e.child, a = 0; i !== null; )
          ((a = a | i.lanes | i.childLanes), (i = i.sibling));
        i = a & ~s;
      } else ((i = 0), (t.child = null));
      return eh(e, t, s, n, i);
    }
    if (n & 536870912)
      ((t.memoizedState = { baseLanes: 0, cachePool: null }),
        e !== null && xl(t, s !== null ? s.cachePool : null),
        s !== null ? Yd(t, s) : Eu(),
        xg(t));
    else
      return (
        (i = t.lanes = 536870912),
        eh(e, t, s !== null ? s.baseLanes | n : n, n, i)
      );
  } else
    s !== null
      ? (xl(t, s.cachePool), Yd(t, s), Mn(), (t.memoizedState = null))
      : (e !== null && xl(t, null), Eu(), Mn());
  return (_e(e, t, a, n), t.child);
}
function Ua(e, t) {
  return (
    (e !== null && e.tag === 22) ||
      t.stateNode !== null ||
      (t.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
    t.sibling
  );
}
function eh(e, t, n, i, a) {
  var s = Xc();
  return (
    (s = s === null ? null : { parent: Ee._currentValue, pool: s }),
    (t.memoizedState = { baseLanes: n, cachePool: s }),
    e !== null && xl(t, null),
    Eu(),
    xg(t),
    e !== null && xa(e, t, i, !0),
    (t.childLanes = a),
    null
  );
}
function Tl(e, t) {
  return (
    (t = Fl({ mode: t.mode, children: t.children }, e.mode)),
    (t.ref = e.ref),
    (e.child = t),
    (t.return = e),
    t
  );
}
function th(e, t, n) {
  return (
    gi(t, e.child, null, n),
    (e = Tl(t, t.pendingProps)),
    (e.flags |= 2),
    rt(t),
    (t.memoizedState = null),
    e
  );
}
function hb(e, t, n) {
  var i = t.pendingProps,
    a = (t.flags & 128) !== 0;
  if (((t.flags &= -129), e === null)) {
    if (Z) {
      if (i.mode === "hidden")
        return ((e = Tl(t, i)), (t.lanes = 536870912), Ua(null, e));
      if (
        (Mu(t),
        (e = le)
          ? ((e = $0(e, Mt)),
            (e = e !== null && e.data === "&" ? e : null),
            e !== null &&
              ((t.memoizedState = {
                dehydrated: e,
                treeContext: Yn !== null ? { id: Rt, overflow: Bt } : null,
                retryLane: 536870912,
                hydrationErrors: null,
              }),
              (n = ug(e)),
              (n.return = t),
              (t.child = n),
              (Be = t),
              (le = null)))
          : (e = null),
        e === null)
      )
        throw Xn(t);
      return ((t.lanes = 536870912), null);
    }
    return Tl(t, i);
  }
  var s = e.memoizedState;
  if (s !== null) {
    var l = s.dehydrated;
    if ((Mu(t), a))
      if (t.flags & 256) ((t.flags &= -257), (t = th(e, t, n)));
      else if (t.memoizedState !== null)
        ((t.child = e.child), (t.flags |= 128), (t = null));
      else throw Error(D(558));
    else if ((Me || xa(e, t, n, !1), (a = (n & e.childLanes) !== 0), Me || a)) {
      if (
        ((i = ne), i !== null && ((l = _p(i, n)), l !== 0 && l !== s.retryLane))
      )
        throw ((s.retryLane = l), wi(e, l), et(i, e, l), rf);
      (Wl(), (t = th(e, t, n)));
    } else
      ((e = s.treeContext),
        (le = jt(l.nextSibling)),
        (Be = t),
        (Z = !0),
        (Vn = null),
        (Mt = !1),
        e !== null && fg(t, e),
        (t = Tl(t, i)),
        (t.flags |= 4096));
    return t;
  }
  return (
    (e = sn(e.child, { mode: i.mode, children: i.children })),
    (e.ref = t.ref),
    (t.child = e),
    (e.return = t),
    e
  );
}
function wl(e, t) {
  var n = t.ref;
  if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
  else {
    if (typeof n != "function" && typeof n != "object") throw Error(D(284));
    (e === null || e.ref !== n) && (t.flags |= 4194816);
  }
}
function Du(e, t, n, i, a) {
  return (
    pi(t),
    (n = Zc(e, t, n, i, void 0, a)),
    (i = Fc()),
    e !== null && !Me
      ? ($c(e, t, a), fn(e, t, a))
      : (Z && i && Gc(t), (t.flags |= 1), _e(e, t, n, a), t.child)
  );
}
function nh(e, t, n, i, a, s) {
  return (
    pi(t),
    (t.updateQueue = null),
    (n = Sg(t, i, n, a)),
    bg(e),
    (i = Fc()),
    e !== null && !Me
      ? ($c(e, t, s), fn(e, t, s))
      : (Z && i && Gc(t), (t.flags |= 1), _e(e, t, n, s), t.child)
  );
}
function ih(e, t, n, i, a) {
  if ((pi(t), t.stateNode === null)) {
    var s = Hi,
      l = n.contextType;
    (typeof l == "object" && l !== null && (s = He(l)),
      (s = new n(i, s)),
      (t.memoizedState =
        s.state !== null && s.state !== void 0 ? s.state : null),
      (s.updater = Nu),
      (t.stateNode = s),
      (s._reactInternals = t),
      (s = t.stateNode),
      (s.props = i),
      (s.state = t.memoizedState),
      (s.refs = {}),
      Pc(t),
      (l = n.contextType),
      (s.context = typeof l == "object" && l !== null ? He(l) : Hi),
      (s.state = t.memoizedState),
      (l = n.getDerivedStateFromProps),
      typeof l == "function" && (fo(t, n, l, i), (s.state = t.memoizedState)),
      typeof n.getDerivedStateFromProps == "function" ||
        typeof s.getSnapshotBeforeUpdate == "function" ||
        (typeof s.UNSAFE_componentWillMount != "function" &&
          typeof s.componentWillMount != "function") ||
        ((l = s.state),
        typeof s.componentWillMount == "function" && s.componentWillMount(),
        typeof s.UNSAFE_componentWillMount == "function" &&
          s.UNSAFE_componentWillMount(),
        l !== s.state && Nu.enqueueReplaceState(s, s.state, null),
        Fa(t, i, s, a),
        Za(),
        (s.state = t.memoizedState)),
      typeof s.componentDidMount == "function" && (t.flags |= 4194308),
      (i = !0));
  } else if (e === null) {
    s = t.stateNode;
    var r = t.memoizedProps,
      o = yi(n, r);
    s.props = o;
    var u = s.context,
      c = n.contextType;
    ((l = Hi), typeof c == "object" && c !== null && (l = He(c)));
    var f = n.getDerivedStateFromProps;
    ((c =
      typeof f == "function" || typeof s.getSnapshotBeforeUpdate == "function"),
      (r = t.pendingProps !== r),
      c ||
        (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
          typeof s.componentWillReceiveProps != "function") ||
        ((r || u !== l) && $d(t, s, i, l)),
      (Tn = !1));
    var h = t.memoizedState;
    ((s.state = h),
      Fa(t, i, s, a),
      Za(),
      (u = t.memoizedState),
      r || h !== u || Tn
        ? (typeof f == "function" && (fo(t, n, f, i), (u = t.memoizedState)),
          (o = Tn || Fd(t, n, o, i, h, u, l))
            ? (c ||
                (typeof s.UNSAFE_componentWillMount != "function" &&
                  typeof s.componentWillMount != "function") ||
                (typeof s.componentWillMount == "function" &&
                  s.componentWillMount(),
                typeof s.UNSAFE_componentWillMount == "function" &&
                  s.UNSAFE_componentWillMount()),
              typeof s.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = i),
              (t.memoizedState = u)),
          (s.props = i),
          (s.state = u),
          (s.context = l),
          (i = o))
        : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
          (i = !1)));
  } else {
    ((s = t.stateNode),
      Tu(e, t),
      (l = t.memoizedProps),
      (c = yi(n, l)),
      (s.props = c),
      (f = t.pendingProps),
      (h = s.context),
      (u = n.contextType),
      (o = Hi),
      typeof u == "object" && u !== null && (o = He(u)),
      (r = n.getDerivedStateFromProps),
      (u =
        typeof r == "function" ||
        typeof s.getSnapshotBeforeUpdate == "function") ||
        (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
          typeof s.componentWillReceiveProps != "function") ||
        ((l !== f || h !== o) && $d(t, s, i, o)),
      (Tn = !1),
      (h = t.memoizedState),
      (s.state = h),
      Fa(t, i, s, a),
      Za());
    var d = t.memoizedState;
    l !== f ||
    h !== d ||
    Tn ||
    (e !== null && e.dependencies !== null && Yl(e.dependencies))
      ? (typeof r == "function" && (fo(t, n, r, i), (d = t.memoizedState)),
        (c =
          Tn ||
          Fd(t, n, c, i, h, d, o) ||
          (e !== null && e.dependencies !== null && Yl(e.dependencies)))
          ? (u ||
              (typeof s.UNSAFE_componentWillUpdate != "function" &&
                typeof s.componentWillUpdate != "function") ||
              (typeof s.componentWillUpdate == "function" &&
                s.componentWillUpdate(i, d, o),
              typeof s.UNSAFE_componentWillUpdate == "function" &&
                s.UNSAFE_componentWillUpdate(i, d, o)),
            typeof s.componentDidUpdate == "function" && (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof s.componentDidUpdate != "function" ||
              (l === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate != "function" ||
              (l === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = i),
            (t.memoizedState = d)),
        (s.props = i),
        (s.state = d),
        (s.context = o),
        (i = c))
      : (typeof s.componentDidUpdate != "function" ||
          (l === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 4),
        typeof s.getSnapshotBeforeUpdate != "function" ||
          (l === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 1024),
        (i = !1));
  }
  return (
    (s = i),
    wl(e, t),
    (i = (t.flags & 128) !== 0),
    s || i
      ? ((s = t.stateNode),
        (n =
          i && typeof n.getDerivedStateFromError != "function"
            ? null
            : s.render()),
        (t.flags |= 1),
        e !== null && i
          ? ((t.child = gi(t, e.child, null, a)), (t.child = gi(t, null, n, a)))
          : _e(e, t, n, a),
        (t.memoizedState = s.state),
        (e = t.child))
      : (e = fn(e, t, a)),
    e
  );
}
function ah(e, t, n, i) {
  return (mi(), (t.flags |= 256), _e(e, t, n, i), t.child);
}
var ho = {
  dehydrated: null,
  treeContext: null,
  retryLane: 0,
  hydrationErrors: null,
};
function mo(e) {
  return { baseLanes: e, cachePool: hg() };
}
function po(e, t, n) {
  return ((e = e !== null ? e.childLanes & ~n : 0), t && (e |= ut), e);
}
function s0(e, t, n) {
  var i = t.pendingProps,
    a = !1,
    s = (t.flags & 128) !== 0,
    l;
  if (
    ((l = s) ||
      (l =
        e !== null && e.memoizedState === null ? !1 : (ye.current & 2) !== 0),
    l && ((a = !0), (t.flags &= -129)),
    (l = (t.flags & 32) !== 0),
    (t.flags &= -33),
    e === null)
  ) {
    if (Z) {
      if (
        (a ? En(t) : Mn(),
        (e = le)
          ? ((e = $0(e, Mt)),
            (e = e !== null && e.data !== "&" ? e : null),
            e !== null &&
              ((t.memoizedState = {
                dehydrated: e,
                treeContext: Yn !== null ? { id: Rt, overflow: Bt } : null,
                retryLane: 536870912,
                hydrationErrors: null,
              }),
              (n = ug(e)),
              (n.return = t),
              (t.child = n),
              (Be = t),
              (le = null)))
          : (e = null),
        e === null)
      )
        throw Xn(t);
      return (Pu(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
    }
    var r = i.children;
    return (
      (i = i.fallback),
      a
        ? (Mn(),
          (a = t.mode),
          (r = Fl({ mode: "hidden", children: r }, a)),
          (i = ri(i, a, n, null)),
          (r.return = t),
          (i.return = t),
          (r.sibling = i),
          (t.child = r),
          (i = t.child),
          (i.memoizedState = mo(n)),
          (i.childLanes = po(e, l, n)),
          (t.memoizedState = ho),
          Ua(null, i))
        : (En(t), zu(t, r))
    );
  }
  var o = e.memoizedState;
  if (o !== null && ((r = o.dehydrated), r !== null)) {
    if (s)
      t.flags & 256
        ? (En(t), (t.flags &= -257), (t = go(e, t, n)))
        : t.memoizedState !== null
          ? (Mn(), (t.child = e.child), (t.flags |= 128), (t = null))
          : (Mn(),
            (r = i.fallback),
            (a = t.mode),
            (i = Fl({ mode: "visible", children: i.children }, a)),
            (r = ri(r, a, n, null)),
            (r.flags |= 2),
            (i.return = t),
            (r.return = t),
            (i.sibling = r),
            (t.child = i),
            gi(t, e.child, null, n),
            (i = t.child),
            (i.memoizedState = mo(n)),
            (i.childLanes = po(e, l, n)),
            (t.memoizedState = ho),
            (t = Ua(null, i)));
    else if ((En(t), Pu(r))) {
      if (((l = r.nextSibling && r.nextSibling.dataset), l)) var u = l.dgst;
      ((l = u),
        (i = Error(D(419))),
        (i.stack = ""),
        (i.digest = l),
        hs({ value: i, source: null, stack: null }),
        (t = go(e, t, n)));
    } else if (
      (Me || xa(e, t, n, !1), (l = (n & e.childLanes) !== 0), Me || l)
    ) {
      if (
        ((l = ne), l !== null && ((i = _p(l, n)), i !== 0 && i !== o.retryLane))
      )
        throw ((o.retryLane = i), wi(e, i), et(l, e, i), rf);
      (ku(r) || Wl(), (t = go(e, t, n)));
    } else
      ku(r)
        ? ((t.flags |= 192), (t.child = e.child), (t = null))
        : ((e = o.treeContext),
          (le = jt(r.nextSibling)),
          (Be = t),
          (Z = !0),
          (Vn = null),
          (Mt = !1),
          e !== null && fg(t, e),
          (t = zu(t, i.children)),
          (t.flags |= 4096));
    return t;
  }
  return a
    ? (Mn(),
      (r = i.fallback),
      (a = t.mode),
      (o = e.child),
      (u = o.sibling),
      (i = sn(o, { mode: "hidden", children: i.children })),
      (i.subtreeFlags = o.subtreeFlags & 65011712),
      u !== null ? (r = sn(u, r)) : ((r = ri(r, a, n, null)), (r.flags |= 2)),
      (r.return = t),
      (i.return = t),
      (i.sibling = r),
      (t.child = i),
      Ua(null, i),
      (i = t.child),
      (r = e.child.memoizedState),
      r === null
        ? (r = mo(n))
        : ((a = r.cachePool),
          a !== null
            ? ((o = Ee._currentValue),
              (a = a.parent !== o ? { parent: o, pool: o } : a))
            : (a = hg()),
          (r = { baseLanes: r.baseLanes | n, cachePool: a })),
      (i.memoizedState = r),
      (i.childLanes = po(e, l, n)),
      (t.memoizedState = ho),
      Ua(e.child, i))
    : (En(t),
      (n = e.child),
      (e = n.sibling),
      (n = sn(n, { mode: "visible", children: i.children })),
      (n.return = t),
      (n.sibling = null),
      e !== null &&
        ((l = t.deletions),
        l === null ? ((t.deletions = [e]), (t.flags |= 16)) : l.push(e)),
      (t.child = n),
      (t.memoizedState = null),
      n);
}
function zu(e, t) {
  return (
    (t = Fl({ mode: "visible", children: t }, e.mode)),
    (t.return = e),
    (e.child = t)
  );
}
function Fl(e, t) {
  return ((e = ot(22, e, null, t)), (e.lanes = 0), e);
}
function go(e, t, n) {
  return (
    gi(t, e.child, null, n),
    (e = zu(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function sh(e, t, n) {
  e.lanes |= t;
  var i = e.alternate;
  (i !== null && (i.lanes |= t), xu(e.return, t, n));
}
function vo(e, t, n, i, a, s) {
  var l = e.memoizedState;
  l === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: n,
        tailMode: a,
        treeForkCount: s,
      })
    : ((l.isBackwards = t),
      (l.rendering = null),
      (l.renderingStartTime = 0),
      (l.last = i),
      (l.tail = n),
      (l.tailMode = a),
      (l.treeForkCount = s));
}
function l0(e, t, n) {
  var i = t.pendingProps,
    a = i.revealOrder,
    s = i.tail;
  i = i.children;
  var l = ye.current,
    r = (l & 2) !== 0;
  if (
    (r ? ((l = (l & 1) | 2), (t.flags |= 128)) : (l &= 1),
    ae(ye, l),
    _e(e, t, i, n),
    (i = Z ? ds : 0),
    !r && e !== null && e.flags & 128)
  )
    e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && sh(e, n, t);
      else if (e.tag === 19) sh(e, n, t);
      else if (e.child !== null) {
        ((e.child.return = e), (e = e.child));
        continue;
      }
      if (e === t) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) break e;
        e = e.return;
      }
      ((e.sibling.return = e.return), (e = e.sibling));
    }
  switch (a) {
    case "forwards":
      for (n = t.child, a = null; n !== null; )
        ((e = n.alternate),
          e !== null && Pl(e) === null && (a = n),
          (n = n.sibling));
      ((n = a),
        n === null
          ? ((a = t.child), (t.child = null))
          : ((a = n.sibling), (n.sibling = null)),
        vo(t, !1, a, n, s, i));
      break;
    case "backwards":
    case "unstable_legacy-backwards":
      for (n = null, a = t.child, t.child = null; a !== null; ) {
        if (((e = a.alternate), e !== null && Pl(e) === null)) {
          t.child = a;
          break;
        }
        ((e = a.sibling), (a.sibling = n), (n = a), (a = e));
      }
      vo(t, !0, n, null, s, i);
      break;
    case "together":
      vo(t, !1, null, null, void 0, i);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function fn(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Pn |= t.lanes),
    !(n & t.childLanes))
  )
    if (e !== null) {
      if ((xa(e, t, n, !1), (n & t.childLanes) === 0)) return null;
    } else return null;
  if (e !== null && t.child !== e.child) throw Error(D(153));
  if (t.child !== null) {
    for (
      e = t.child, n = sn(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      ((e = e.sibling),
        (n = n.sibling = sn(e, e.pendingProps)),
        (n.return = t));
    n.sibling = null;
  }
  return t.child;
}
function of(e, t) {
  return e.lanes & t ? !0 : ((e = e.dependencies), !!(e !== null && Yl(e)));
}
function mb(e, t, n) {
  switch (t.tag) {
    case 3:
      (_l(t, t.stateNode.containerInfo),
        wn(t, Ee, e.memoizedState.cache),
        mi());
      break;
    case 27:
    case 5:
      lu(t);
      break;
    case 4:
      _l(t, t.stateNode.containerInfo);
      break;
    case 10:
      wn(t, t.type, t.memoizedProps.value);
      break;
    case 31:
      if (t.memoizedState !== null) return ((t.flags |= 128), Mu(t), null);
      break;
    case 13:
      var i = t.memoizedState;
      if (i !== null)
        return i.dehydrated !== null
          ? (En(t), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? s0(e, t, n)
            : (En(t), (e = fn(e, t, n)), e !== null ? e.sibling : null);
      En(t);
      break;
    case 19:
      var a = (e.flags & 128) !== 0;
      if (
        ((i = (n & t.childLanes) !== 0),
        i || (xa(e, t, n, !1), (i = (n & t.childLanes) !== 0)),
        a)
      ) {
        if (i) return l0(e, t, n);
        t.flags |= 128;
      }
      if (
        ((a = t.memoizedState),
        a !== null &&
          ((a.rendering = null), (a.tail = null), (a.lastEffect = null)),
        ae(ye, ye.current),
        i)
      )
        break;
      return null;
    case 22:
      return ((t.lanes = 0), a0(e, t, n, t.pendingProps));
    case 24:
      wn(t, Ee, e.memoizedState.cache);
  }
  return fn(e, t, n);
}
function r0(e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps) Me = !0;
    else {
      if (!of(e, n) && !(t.flags & 128)) return ((Me = !1), mb(e, t, n));
      Me = !!(e.flags & 131072);
    }
  else ((Me = !1), Z && t.flags & 1048576 && cg(t, ds, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 16:
      e: {
        var i = t.pendingProps;
        if (((e = ti(t.elementType)), (t.type = e), typeof e == "function"))
          Uc(e)
            ? ((i = yi(e, i)), (t.tag = 1), (t = ih(null, t, e, i, n)))
            : ((t.tag = 0), (t = Du(null, t, e, i, n)));
        else {
          if (e != null) {
            var a = e.$$typeof;
            if (a === Mc) {
              ((t.tag = 11), (t = Jd(null, t, e, i, n)));
              break e;
            } else if (a === Ac) {
              ((t.tag = 14), (t = Wd(null, t, e, i, n)));
              break e;
            }
          }
          throw ((t = au(e) || e), Error(D(306, t, "")));
        }
      }
      return t;
    case 0:
      return Du(e, t, t.type, t.pendingProps, n);
    case 1:
      return ((i = t.type), (a = yi(i, t.pendingProps)), ih(e, t, i, a, n));
    case 3:
      e: {
        if ((_l(t, t.stateNode.containerInfo), e === null)) throw Error(D(387));
        i = t.pendingProps;
        var s = t.memoizedState;
        ((a = s.element), Tu(e, t), Fa(t, i, null, n));
        var l = t.memoizedState;
        if (
          ((i = l.cache),
          wn(t, Ee, i),
          i !== s.cache && bu(t, [Ee], n, !0),
          Za(),
          (i = l.element),
          s.isDehydrated)
        )
          if (
            ((s = { element: i, isDehydrated: !1, cache: l.cache }),
            (t.updateQueue.baseState = s),
            (t.memoizedState = s),
            t.flags & 256)
          ) {
            t = ah(e, t, i, n);
            break e;
          } else if (i !== a) {
            ((a = Et(Error(D(424)), t)), hs(a), (t = ah(e, t, i, n)));
            break e;
          } else {
            switch (((e = t.stateNode.containerInfo), e.nodeType)) {
              case 9:
                e = e.body;
                break;
              default:
                e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
            }
            for (
              le = jt(e.firstChild),
                Be = t,
                Z = !0,
                Vn = null,
                Mt = !0,
                n = gg(t, null, i, n),
                t.child = n;
              n;

            )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
          }
        else {
          if ((mi(), i === a)) {
            t = fn(e, t, n);
            break e;
          }
          _e(e, t, i, n);
        }
        t = t.child;
      }
      return t;
    case 26:
      return (
        wl(e, t),
        e === null
          ? (n = Mh(t.type, null, t.pendingProps, null))
            ? (t.memoizedState = n)
            : Z ||
              ((n = t.type),
              (e = t.pendingProps),
              (i = ir(Ln.current).createElement(n)),
              (i[Re] = t),
              (i[tt] = e),
              Ue(i, n, e),
              De(i),
              (t.stateNode = i))
          : (t.memoizedState = Mh(
              t.type,
              e.memoizedProps,
              t.pendingProps,
              e.memoizedState,
            )),
        null
      );
    case 27:
      return (
        lu(t),
        e === null &&
          Z &&
          ((i = t.stateNode = I0(t.type, t.pendingProps, Ln.current)),
          (Be = t),
          (Mt = !0),
          (a = le),
          Fn(t.type) ? ((Qu = a), (le = jt(i.firstChild))) : (le = a)),
        _e(e, t, t.pendingProps.children, n),
        wl(e, t),
        e === null && (t.flags |= 4194304),
        t.child
      );
    case 5:
      return (
        e === null &&
          Z &&
          ((a = i = le) &&
            ((i = kb(i, t.type, t.pendingProps, Mt)),
            i !== null
              ? ((t.stateNode = i),
                (Be = t),
                (le = jt(i.firstChild)),
                (Mt = !1),
                (a = !0))
              : (a = !1)),
          a || Xn(t)),
        lu(t),
        (a = t.type),
        (s = t.pendingProps),
        (l = e !== null ? e.memoizedProps : null),
        (i = s.children),
        Yu(a, s) ? (i = null) : l !== null && Yu(a, l) && (t.flags |= 32),
        t.memoizedState !== null &&
          ((a = Zc(e, t, sb, null, null, n)), (xs._currentValue = a)),
        wl(e, t),
        _e(e, t, i, n),
        t.child
      );
    case 6:
      return (
        e === null &&
          Z &&
          ((e = n = le) &&
            ((n = Pb(n, t.pendingProps, Mt)),
            n !== null
              ? ((t.stateNode = n), (Be = t), (le = null), (e = !0))
              : (e = !1)),
          e || Xn(t)),
        null
      );
    case 13:
      return s0(e, t, n);
    case 4:
      return (
        _l(t, t.stateNode.containerInfo),
        (i = t.pendingProps),
        e === null ? (t.child = gi(t, null, i, n)) : _e(e, t, i, n),
        t.child
      );
    case 11:
      return Jd(e, t, t.type, t.pendingProps, n);
    case 7:
      return (_e(e, t, t.pendingProps, n), t.child);
    case 8:
      return (_e(e, t, t.pendingProps.children, n), t.child);
    case 12:
      return (_e(e, t, t.pendingProps.children, n), t.child);
    case 10:
      return (
        (i = t.pendingProps),
        wn(t, t.type, i.value),
        _e(e, t, i.children, n),
        t.child
      );
    case 9:
      return (
        (a = t.type._context),
        (i = t.pendingProps.children),
        pi(t),
        (a = He(a)),
        (i = i(a)),
        (t.flags |= 1),
        _e(e, t, i, n),
        t.child
      );
    case 14:
      return Wd(e, t, t.type, t.pendingProps, n);
    case 15:
      return i0(e, t, t.type, t.pendingProps, n);
    case 19:
      return l0(e, t, n);
    case 31:
      return hb(e, t, n);
    case 22:
      return a0(e, t, n, t.pendingProps);
    case 24:
      return (
        pi(t),
        (i = He(Ee)),
        e === null
          ? ((a = Xc()),
            a === null &&
              ((a = ne),
              (s = Yc()),
              (a.pooledCache = s),
              s.refCount++,
              s !== null && (a.pooledCacheLanes |= n),
              (a = s)),
            (t.memoizedState = { parent: i, cache: a }),
            Pc(t),
            wn(t, Ee, a))
          : (e.lanes & n && (Tu(e, t), Fa(t, null, null, n), Za()),
            (a = e.memoizedState),
            (s = t.memoizedState),
            a.parent !== i
              ? ((a = { parent: i, cache: i }),
                (t.memoizedState = a),
                t.lanes === 0 &&
                  (t.memoizedState = t.updateQueue.baseState = a),
                wn(t, Ee, i))
              : ((i = s.cache),
                wn(t, Ee, i),
                i !== a.cache && bu(t, [Ee], n, !0))),
        _e(e, t, t.pendingProps.children, n),
        t.child
      );
    case 29:
      throw t.pendingProps;
  }
  throw Error(D(156, t.tag));
}
function Zt(e) {
  e.flags |= 4;
}
function yo(e, t, n, i, a) {
  if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
    if (((e.flags |= 16777216), (a & 335544128) === a))
      if (e.stateNode.complete) e.flags |= 8192;
      else if (D0()) e.flags |= 8192;
      else throw ((ui = Xl), kc);
  } else e.flags &= -16777217;
}
function lh(e, t) {
  if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
  else if (((e.flags |= 16777216), !ev(t)))
    if (D0()) e.flags |= 8192;
    else throw ((ui = Xl), kc);
}
function nl(e, t) {
  (t !== null && (e.flags |= 4),
    e.flags & 16384 &&
      ((t = e.tag !== 22 ? zp() : 536870912), (e.lanes |= t), (oa |= t)));
}
function Da(e, t) {
  if (!Z)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          (t.alternate !== null && (n = t), (t = t.sibling));
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var i = null; n !== null; )
          (n.alternate !== null && (i = n), (n = n.sibling));
        i === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (i.sibling = null);
    }
}
function se(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    i = 0;
  if (t)
    for (var a = e.child; a !== null; )
      ((n |= a.lanes | a.childLanes),
        (i |= a.subtreeFlags & 65011712),
        (i |= a.flags & 65011712),
        (a.return = e),
        (a = a.sibling));
  else
    for (a = e.child; a !== null; )
      ((n |= a.lanes | a.childLanes),
        (i |= a.subtreeFlags),
        (i |= a.flags),
        (a.return = e),
        (a = a.sibling));
  return ((e.subtreeFlags |= i), (e.childLanes = n), t);
}
function pb(e, t, n) {
  var i = t.pendingProps;
  switch ((qc(t), t.tag)) {
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (se(t), null);
    case 1:
      return (se(t), null);
    case 3:
      return (
        (n = t.stateNode),
        (i = null),
        e !== null && (i = e.memoizedState.cache),
        t.memoizedState.cache !== i && (t.flags |= 2048),
        ln(Ee),
        na(),
        n.pendingContext &&
          ((n.context = n.pendingContext), (n.pendingContext = null)),
        (e === null || e.child === null) &&
          (Mi(t)
            ? Zt(t)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), oo())),
        se(t),
        null
      );
    case 26:
      var a = t.type,
        s = t.memoizedState;
      return (
        e === null
          ? (Zt(t),
            s !== null ? (se(t), lh(t, s)) : (se(t), yo(t, a, null, i, n)))
          : s
            ? s !== e.memoizedState
              ? (Zt(t), se(t), lh(t, s))
              : (se(t), (t.flags &= -16777217))
            : ((e = e.memoizedProps),
              e !== i && Zt(t),
              se(t),
              yo(t, a, e, i, n)),
        null
      );
    case 27:
      if (
        (Rl(t),
        (n = Ln.current),
        (a = t.type),
        e !== null && t.stateNode != null)
      )
        e.memoizedProps !== i && Zt(t);
      else {
        if (!i) {
          if (t.stateNode === null) throw Error(D(166));
          return (se(t), null);
        }
        ((e = Gt.current),
          Mi(t) ? _d(t) : ((e = I0(a, i, n)), (t.stateNode = e), Zt(t)));
      }
      return (se(t), null);
    case 5:
      if ((Rl(t), (a = t.type), e !== null && t.stateNode != null))
        e.memoizedProps !== i && Zt(t);
      else {
        if (!i) {
          if (t.stateNode === null) throw Error(D(166));
          return (se(t), null);
        }
        if (((s = Gt.current), Mi(t))) _d(t);
        else {
          var l = ir(Ln.current);
          switch (s) {
            case 1:
              s = l.createElementNS("http://www.w3.org/2000/svg", a);
              break;
            case 2:
              s = l.createElementNS("http://www.w3.org/1998/Math/MathML", a);
              break;
            default:
              switch (a) {
                case "svg":
                  s = l.createElementNS("http://www.w3.org/2000/svg", a);
                  break;
                case "math":
                  s = l.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    a,
                  );
                  break;
                case "script":
                  ((s = l.createElement("div")),
                    (s.innerHTML = "<script><\/script>"),
                    (s = s.removeChild(s.firstChild)));
                  break;
                case "select":
                  ((s =
                    typeof i.is == "string"
                      ? l.createElement("select", { is: i.is })
                      : l.createElement("select")),
                    i.multiple
                      ? (s.multiple = !0)
                      : i.size && (s.size = i.size));
                  break;
                default:
                  s =
                    typeof i.is == "string"
                      ? l.createElement(a, { is: i.is })
                      : l.createElement(a);
              }
          }
          ((s[Re] = t), (s[tt] = i));
          e: for (l = t.child; l !== null; ) {
            if (l.tag === 5 || l.tag === 6) s.appendChild(l.stateNode);
            else if (l.tag !== 4 && l.tag !== 27 && l.child !== null) {
              ((l.child.return = l), (l = l.child));
              continue;
            }
            if (l === t) break e;
            for (; l.sibling === null; ) {
              if (l.return === null || l.return === t) break e;
              l = l.return;
            }
            ((l.sibling.return = l.return), (l = l.sibling));
          }
          t.stateNode = s;
          e: switch ((Ue(s, a, i), a)) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              i = !!i.autoFocus;
              break e;
            case "img":
              i = !0;
              break e;
            default:
              i = !1;
          }
          i && Zt(t);
        }
      }
      return (
        se(t),
        yo(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n),
        null
      );
    case 6:
      if (e && t.stateNode != null) e.memoizedProps !== i && Zt(t);
      else {
        if (typeof i != "string" && t.stateNode === null) throw Error(D(166));
        if (((e = Ln.current), Mi(t))) {
          if (
            ((e = t.stateNode),
            (n = t.memoizedProps),
            (i = null),
            (a = Be),
            a !== null)
          )
            switch (a.tag) {
              case 27:
              case 5:
                i = a.memoizedProps;
            }
          ((e[Re] = t),
            (e = !!(
              e.nodeValue === n ||
              (i !== null && i.suppressHydrationWarning === !0) ||
              K0(e.nodeValue, n)
            )),
            e || Xn(t, !0));
        } else ((e = ir(e).createTextNode(i)), (e[Re] = t), (t.stateNode = e));
      }
      return (se(t), null);
    case 31:
      if (((n = t.memoizedState), e === null || e.memoizedState !== null)) {
        if (((i = Mi(t)), n !== null)) {
          if (e === null) {
            if (!i) throw Error(D(318));
            if (
              ((e = t.memoizedState),
              (e = e !== null ? e.dehydrated : null),
              !e)
            )
              throw Error(D(557));
            e[Re] = t;
          } else
            (mi(),
              !(t.flags & 128) && (t.memoizedState = null),
              (t.flags |= 4));
          (se(t), (e = !1));
        } else
          ((n = oo()),
            e !== null &&
              e.memoizedState !== null &&
              (e.memoizedState.hydrationErrors = n),
            (e = !0));
        if (!e) return t.flags & 256 ? (rt(t), t) : (rt(t), null);
        if (t.flags & 128) throw Error(D(558));
      }
      return (se(t), null);
    case 13:
      if (
        ((i = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (((a = Mi(t)), i !== null && i.dehydrated !== null)) {
          if (e === null) {
            if (!a) throw Error(D(318));
            if (
              ((a = t.memoizedState),
              (a = a !== null ? a.dehydrated : null),
              !a)
            )
              throw Error(D(317));
            a[Re] = t;
          } else
            (mi(),
              !(t.flags & 128) && (t.memoizedState = null),
              (t.flags |= 4));
          (se(t), (a = !1));
        } else
          ((a = oo()),
            e !== null &&
              e.memoizedState !== null &&
              (e.memoizedState.hydrationErrors = a),
            (a = !0));
        if (!a) return t.flags & 256 ? (rt(t), t) : (rt(t), null);
      }
      return (
        rt(t),
        t.flags & 128
          ? ((t.lanes = n), t)
          : ((n = i !== null),
            (e = e !== null && e.memoizedState !== null),
            n &&
              ((i = t.child),
              (a = null),
              i.alternate !== null &&
                i.alternate.memoizedState !== null &&
                i.alternate.memoizedState.cachePool !== null &&
                (a = i.alternate.memoizedState.cachePool.pool),
              (s = null),
              i.memoizedState !== null &&
                i.memoizedState.cachePool !== null &&
                (s = i.memoizedState.cachePool.pool),
              s !== a && (i.flags |= 2048)),
            n !== e && n && (t.child.flags |= 8192),
            nl(t, t.updateQueue),
            se(t),
            null)
      );
    case 4:
      return (na(), e === null && pf(t.stateNode.containerInfo), se(t), null);
    case 10:
      return (ln(t.type), se(t), null);
    case 19:
      if ((ze(ye), (i = t.memoizedState), i === null)) return (se(t), null);
      if (((a = (t.flags & 128) !== 0), (s = i.rendering), s === null))
        if (a) Da(i, !1);
        else {
          if (ge !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((s = Pl(e)), s !== null)) {
                for (
                  t.flags |= 128,
                    Da(i, !1),
                    e = s.updateQueue,
                    t.updateQueue = e,
                    nl(t, e),
                    t.subtreeFlags = 0,
                    e = n,
                    n = t.child;
                  n !== null;

                )
                  (og(n, e), (n = n.sibling));
                return (
                  ae(ye, (ye.current & 1) | 2),
                  Z && Wt(t, i.treeForkCount),
                  t.child
                );
              }
              e = e.sibling;
            }
          i.tail !== null &&
            ct() > Il &&
            ((t.flags |= 128), (a = !0), Da(i, !1), (t.lanes = 4194304));
        }
      else {
        if (!a)
          if (((e = Pl(s)), e !== null)) {
            if (
              ((t.flags |= 128),
              (a = !0),
              (e = e.updateQueue),
              (t.updateQueue = e),
              nl(t, e),
              Da(i, !0),
              i.tail === null && i.tailMode === "hidden" && !s.alternate && !Z)
            )
              return (se(t), null);
          } else
            2 * ct() - i.renderingStartTime > Il &&
              n !== 536870912 &&
              ((t.flags |= 128), (a = !0), Da(i, !1), (t.lanes = 4194304));
        i.isBackwards
          ? ((s.sibling = t.child), (t.child = s))
          : ((e = i.last),
            e !== null ? (e.sibling = s) : (t.child = s),
            (i.last = s));
      }
      return i.tail !== null
        ? ((e = i.tail),
          (i.rendering = e),
          (i.tail = e.sibling),
          (i.renderingStartTime = ct()),
          (e.sibling = null),
          (n = ye.current),
          ae(ye, a ? (n & 1) | 2 : n & 1),
          Z && Wt(t, i.treeForkCount),
          e)
        : (se(t), null);
    case 22:
    case 23:
      return (
        rt(t),
        Qc(),
        (i = t.memoizedState !== null),
        e !== null
          ? (e.memoizedState !== null) !== i && (t.flags |= 8192)
          : i && (t.flags |= 8192),
        i
          ? n & 536870912 &&
            !(t.flags & 128) &&
            (se(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : se(t),
        (n = t.updateQueue),
        n !== null && nl(t, n.retryQueue),
        (n = null),
        e !== null &&
          e.memoizedState !== null &&
          e.memoizedState.cachePool !== null &&
          (n = e.memoizedState.cachePool.pool),
        (i = null),
        t.memoizedState !== null &&
          t.memoizedState.cachePool !== null &&
          (i = t.memoizedState.cachePool.pool),
        i !== n && (t.flags |= 2048),
        e !== null && ze(oi),
        null
      );
    case 24:
      return (
        (n = null),
        e !== null && (n = e.memoizedState.cache),
        t.memoizedState.cache !== n && (t.flags |= 2048),
        ln(Ee),
        se(t),
        null
      );
    case 25:
      return null;
    case 30:
      return null;
  }
  throw Error(D(156, t.tag));
}
function gb(e, t) {
  switch ((qc(t), t.tag)) {
    case 1:
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        ln(Ee),
        na(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 26:
    case 27:
    case 5:
      return (Rl(t), null);
    case 31:
      if (t.memoizedState !== null) {
        if ((rt(t), t.alternate === null)) throw Error(D(340));
        mi();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 13:
      if ((rt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(D(340));
        mi();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return (ze(ye), null);
    case 4:
      return (na(), null);
    case 10:
      return (ln(t.type), null);
    case 22:
    case 23:
      return (
        rt(t),
        Qc(),
        e !== null && ze(oi),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 24:
      return (ln(Ee), null);
    case 25:
      return null;
    default:
      return null;
  }
}
function o0(e, t) {
  switch ((qc(t), t.tag)) {
    case 3:
      (ln(Ee), na());
      break;
    case 26:
    case 27:
    case 5:
      Rl(t);
      break;
    case 4:
      na();
      break;
    case 31:
      t.memoizedState !== null && rt(t);
      break;
    case 13:
      rt(t);
      break;
    case 19:
      ze(ye);
      break;
    case 10:
      ln(t.type);
      break;
    case 22:
    case 23:
      (rt(t), Qc(), e !== null && ze(oi));
      break;
    case 24:
      ln(Ee);
  }
}
function Hs(e, t) {
  try {
    var n = t.updateQueue,
      i = n !== null ? n.lastEffect : null;
    if (i !== null) {
      var a = i.next;
      n = a;
      do {
        if ((n.tag & e) === e) {
          i = void 0;
          var s = n.create,
            l = n.inst;
          ((i = s()), (l.destroy = i));
        }
        n = n.next;
      } while (n !== a);
    }
  } catch (r) {
    J(t, t.return, r);
  }
}
function kn(e, t, n) {
  try {
    var i = t.updateQueue,
      a = i !== null ? i.lastEffect : null;
    if (a !== null) {
      var s = a.next;
      i = s;
      do {
        if ((i.tag & e) === e) {
          var l = i.inst,
            r = l.destroy;
          if (r !== void 0) {
            ((l.destroy = void 0), (a = t));
            var o = n,
              u = r;
            try {
              u();
            } catch (c) {
              J(a, o, c);
            }
          }
        }
        i = i.next;
      } while (i !== s);
    }
  } catch (c) {
    J(t, t.return, c);
  }
}
function u0(e) {
  var t = e.updateQueue;
  if (t !== null) {
    var n = e.stateNode;
    try {
      yg(t, n);
    } catch (i) {
      J(e, e.return, i);
    }
  }
}
function c0(e, t, n) {
  ((n.props = yi(e.type, e.memoizedProps)), (n.state = e.memoizedState));
  try {
    n.componentWillUnmount();
  } catch (i) {
    J(e, t, i);
  }
}
function Ia(e, t) {
  try {
    var n = e.ref;
    if (n !== null) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          var i = e.stateNode;
          break;
        case 30:
          i = e.stateNode;
          break;
        default:
          i = e.stateNode;
      }
      typeof n == "function" ? (e.refCleanup = n(i)) : (n.current = i);
    }
  } catch (a) {
    J(e, t, a);
  }
}
function Ht(e, t) {
  var n = e.ref,
    i = e.refCleanup;
  if (n !== null)
    if (typeof i == "function")
      try {
        i();
      } catch (a) {
        J(e, t, a);
      } finally {
        ((e.refCleanup = null),
          (e = e.alternate),
          e != null && (e.refCleanup = null));
      }
    else if (typeof n == "function")
      try {
        n(null);
      } catch (a) {
        J(e, t, a);
      }
    else n.current = null;
}
function f0(e) {
  var t = e.type,
    n = e.memoizedProps,
    i = e.stateNode;
  try {
    e: switch (t) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        n.autoFocus && i.focus();
        break e;
      case "img":
        n.src ? (i.src = n.src) : n.srcSet && (i.srcset = n.srcSet);
    }
  } catch (a) {
    J(e, e.return, a);
  }
}
function xo(e, t, n) {
  try {
    var i = e.stateNode;
    (Hb(i, e.type, n, t), (i[tt] = t));
  } catch (a) {
    J(e, e.return, a);
  }
}
function d0(e) {
  return (
    e.tag === 5 ||
    e.tag === 3 ||
    e.tag === 26 ||
    (e.tag === 27 && Fn(e.type)) ||
    e.tag === 4
  );
}
function bo(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || d0(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (
        (e.tag === 27 && Fn(e.type)) ||
        e.flags & 2 ||
        e.child === null ||
        e.tag === 4
      )
        continue e;
      ((e.child.return = e), (e = e.child));
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Lu(e, t, n) {
  var i = e.tag;
  if (i === 5 || i === 6)
    ((e = e.stateNode),
      t
        ? (n.nodeType === 9
            ? n.body
            : n.nodeName === "HTML"
              ? n.ownerDocument.body
              : n
          ).insertBefore(e, t)
        : ((t =
            n.nodeType === 9
              ? n.body
              : n.nodeName === "HTML"
                ? n.ownerDocument.body
                : n),
          t.appendChild(e),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = nn)));
  else if (
    i !== 4 &&
    (i === 27 && Fn(e.type) && ((n = e.stateNode), (t = null)),
    (e = e.child),
    e !== null)
  )
    for (Lu(e, t, n), e = e.sibling; e !== null; )
      (Lu(e, t, n), (e = e.sibling));
}
function $l(e, t, n) {
  var i = e.tag;
  if (i === 5 || i === 6)
    ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
  else if (
    i !== 4 &&
    (i === 27 && Fn(e.type) && (n = e.stateNode), (e = e.child), e !== null)
  )
    for ($l(e, t, n), e = e.sibling; e !== null; )
      ($l(e, t, n), (e = e.sibling));
}
function h0(e) {
  var t = e.stateNode,
    n = e.memoizedProps;
  try {
    for (var i = e.type, a = t.attributes; a.length; )
      t.removeAttributeNode(a[0]);
    (Ue(t, i, n), (t[Re] = e), (t[tt] = n));
  } catch (s) {
    J(e, e.return, s);
  }
}
var en = !1,
  we = !1,
  So = !1,
  rh = typeof WeakSet == "function" ? WeakSet : Set,
  Oe = null;
function vb(e, t) {
  if (((e = e.containerInfo), (Gu = rr), (e = eg(e)), Rc(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var i = n.getSelection && n.getSelection();
        if (i && i.rangeCount !== 0) {
          n = i.anchorNode;
          var a = i.anchorOffset,
            s = i.focusNode;
          i = i.focusOffset;
          try {
            (n.nodeType, s.nodeType);
          } catch {
            n = null;
            break e;
          }
          var l = 0,
            r = -1,
            o = -1,
            u = 0,
            c = 0,
            f = e,
            h = null;
          t: for (;;) {
            for (
              var d;
              f !== n || (a !== 0 && f.nodeType !== 3) || (r = l + a),
                f !== s || (i !== 0 && f.nodeType !== 3) || (o = l + i),
                f.nodeType === 3 && (l += f.nodeValue.length),
                (d = f.firstChild) !== null;

            )
              ((h = f), (f = d));
            for (;;) {
              if (f === e) break t;
              if (
                (h === n && ++u === a && (r = l),
                h === s && ++c === i && (o = l),
                (d = f.nextSibling) !== null)
              )
                break;
              ((f = h), (h = f.parentNode));
            }
            f = d;
          }
          n = r === -1 || o === -1 ? null : { start: r, end: o };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (
    qu = { focusedElem: e, selectionRange: n }, rr = !1, Oe = t;
    Oe !== null;

  )
    if (((t = Oe), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      ((e.return = t), (Oe = e));
    else
      for (; Oe !== null; ) {
        switch (((t = Oe), (s = t.alternate), (e = t.flags), t.tag)) {
          case 0:
            if (
              e & 4 &&
              ((e = t.updateQueue),
              (e = e !== null ? e.events : null),
              e !== null)
            )
              for (n = 0; n < e.length; n++)
                ((a = e[n]), (a.ref.impl = a.nextImpl));
            break;
          case 11:
          case 15:
            break;
          case 1:
            if (e & 1024 && s !== null) {
              ((e = void 0),
                (n = t),
                (a = s.memoizedProps),
                (s = s.memoizedState),
                (i = n.stateNode));
              try {
                var y = yi(n.type, a);
                ((e = i.getSnapshotBeforeUpdate(y, s)),
                  (i.__reactInternalSnapshotBeforeUpdate = e));
              } catch (x) {
                J(n, n.return, x);
              }
            }
            break;
          case 3:
            if (e & 1024) {
              if (((e = t.stateNode.containerInfo), (n = e.nodeType), n === 9))
                Xu(e);
              else if (n === 1)
                switch (e.nodeName) {
                  case "HEAD":
                  case "HTML":
                  case "BODY":
                    Xu(e);
                    break;
                  default:
                    e.textContent = "";
                }
            }
            break;
          case 5:
          case 26:
          case 27:
          case 6:
          case 4:
          case 17:
            break;
          default:
            if (e & 1024) throw Error(D(163));
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (Oe = e));
          break;
        }
        Oe = t.return;
      }
}
function m0(e, t, n) {
  var i = n.flags;
  switch (n.tag) {
    case 0:
    case 11:
    case 15:
      ($t(e, n), i & 4 && Hs(5, n));
      break;
    case 1:
      if (($t(e, n), i & 4))
        if (((e = n.stateNode), t === null))
          try {
            e.componentDidMount();
          } catch (l) {
            J(n, n.return, l);
          }
        else {
          var a = yi(n.type, t.memoizedProps);
          t = t.memoizedState;
          try {
            e.componentDidUpdate(a, t, e.__reactInternalSnapshotBeforeUpdate);
          } catch (l) {
            J(n, n.return, l);
          }
        }
      (i & 64 && u0(n), i & 512 && Ia(n, n.return));
      break;
    case 3:
      if (($t(e, n), i & 64 && ((e = n.updateQueue), e !== null))) {
        if (((t = null), n.child !== null))
          switch (n.child.tag) {
            case 27:
            case 5:
              t = n.child.stateNode;
              break;
            case 1:
              t = n.child.stateNode;
          }
        try {
          yg(e, t);
        } catch (l) {
          J(n, n.return, l);
        }
      }
      break;
    case 27:
      t === null && i & 4 && h0(n);
    case 26:
    case 5:
      ($t(e, n), t === null && i & 4 && f0(n), i & 512 && Ia(n, n.return));
      break;
    case 12:
      $t(e, n);
      break;
    case 31:
      ($t(e, n), i & 4 && v0(e, n));
      break;
    case 13:
      ($t(e, n),
        i & 4 && y0(e, n),
        i & 64 &&
          ((e = n.memoizedState),
          e !== null &&
            ((e = e.dehydrated),
            e !== null && ((n = Ab.bind(null, n)), Qb(e, n)))));
      break;
    case 22:
      if (((i = n.memoizedState !== null || en), !i)) {
        ((t = (t !== null && t.memoizedState !== null) || we), (a = en));
        var s = we;
        ((en = i),
          (we = t) && !s ? It(e, n, (n.subtreeFlags & 8772) !== 0) : $t(e, n),
          (en = a),
          (we = s));
      }
      break;
    case 30:
      break;
    default:
      $t(e, n);
  }
}
function p0(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), p0(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 && ((t = e.stateNode), t !== null && Oc(t)),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
var ue = null,
  Ie = !1;
function Ft(e, t, n) {
  for (n = n.child; n !== null; ) (g0(e, t, n), (n = n.sibling));
}
function g0(e, t, n) {
  if (ft && typeof ft.onCommitFiberUnmount == "function")
    try {
      ft.onCommitFiberUnmount(Ds, n);
    } catch {}
  switch (n.tag) {
    case 26:
      (we || Ht(n, t),
        Ft(e, t, n),
        n.memoizedState
          ? n.memoizedState.count--
          : n.stateNode && ((n = n.stateNode), n.parentNode.removeChild(n)));
      break;
    case 27:
      we || Ht(n, t);
      var i = ue,
        a = Ie;
      (Fn(n.type) && ((ue = n.stateNode), (Ie = !1)),
        Ft(e, t, n),
        ts(n.stateNode),
        (ue = i),
        (Ie = a));
      break;
    case 5:
      we || Ht(n, t);
    case 6:
      if (
        ((i = ue),
        (a = Ie),
        (ue = null),
        Ft(e, t, n),
        (ue = i),
        (Ie = a),
        ue !== null)
      )
        if (Ie)
          try {
            (ue.nodeType === 9
              ? ue.body
              : ue.nodeName === "HTML"
                ? ue.ownerDocument.body
                : ue
            ).removeChild(n.stateNode);
          } catch (s) {
            J(n, t, s);
          }
        else
          try {
            ue.removeChild(n.stateNode);
          } catch (s) {
            J(n, t, s);
          }
      break;
    case 18:
      ue !== null &&
        (Ie
          ? ((e = ue),
            bh(
              e.nodeType === 9
                ? e.body
                : e.nodeName === "HTML"
                  ? e.ownerDocument.body
                  : e,
              n.stateNode,
            ),
            da(e))
          : bh(ue, n.stateNode));
      break;
    case 4:
      ((i = ue),
        (a = Ie),
        (ue = n.stateNode.containerInfo),
        (Ie = !0),
        Ft(e, t, n),
        (ue = i),
        (Ie = a));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      (kn(2, n, t), we || kn(4, n, t), Ft(e, t, n));
      break;
    case 1:
      (we ||
        (Ht(n, t),
        (i = n.stateNode),
        typeof i.componentWillUnmount == "function" && c0(n, t, i)),
        Ft(e, t, n));
      break;
    case 21:
      Ft(e, t, n);
      break;
    case 22:
      ((we = (i = we) || n.memoizedState !== null), Ft(e, t, n), (we = i));
      break;
    default:
      Ft(e, t, n);
  }
}
function v0(e, t) {
  if (
    t.memoizedState === null &&
    ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
  ) {
    e = e.dehydrated;
    try {
      da(e);
    } catch (n) {
      J(t, t.return, n);
    }
  }
}
function y0(e, t) {
  if (
    t.memoizedState === null &&
    ((e = t.alternate),
    e !== null &&
      ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
  )
    try {
      da(e);
    } catch (n) {
      J(t, t.return, n);
    }
}
function yb(e) {
  switch (e.tag) {
    case 31:
    case 13:
    case 19:
      var t = e.stateNode;
      return (t === null && (t = e.stateNode = new rh()), t);
    case 22:
      return (
        (e = e.stateNode),
        (t = e._retryCache),
        t === null && (t = e._retryCache = new rh()),
        t
      );
    default:
      throw Error(D(435, e.tag));
  }
}
function il(e, t) {
  var n = yb(e);
  t.forEach(function (i) {
    if (!n.has(i)) {
      n.add(i);
      var a = Cb.bind(null, e, i);
      i.then(a, a);
    }
  });
}
function Fe(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var i = 0; i < n.length; i++) {
      var a = n[i],
        s = e,
        l = t,
        r = l;
      e: for (; r !== null; ) {
        switch (r.tag) {
          case 27:
            if (Fn(r.type)) {
              ((ue = r.stateNode), (Ie = !1));
              break e;
            }
            break;
          case 5:
            ((ue = r.stateNode), (Ie = !1));
            break e;
          case 3:
          case 4:
            ((ue = r.stateNode.containerInfo), (Ie = !0));
            break e;
        }
        r = r.return;
      }
      if (ue === null) throw Error(D(160));
      (g0(s, l, a),
        (ue = null),
        (Ie = !1),
        (s = a.alternate),
        s !== null && (s.return = null),
        (a.return = null));
    }
  if (t.subtreeFlags & 13886)
    for (t = t.child; t !== null; ) (x0(t, e), (t = t.sibling));
}
var Lt = null;
function x0(e, t) {
  var n = e.alternate,
    i = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      (Fe(t, e),
        $e(e),
        i & 4 && (kn(3, e, e.return), Hs(3, e), kn(5, e, e.return)));
      break;
    case 1:
      (Fe(t, e),
        $e(e),
        i & 512 && (we || n === null || Ht(n, n.return)),
        i & 64 &&
          en &&
          ((e = e.updateQueue),
          e !== null &&
            ((i = e.callbacks),
            i !== null &&
              ((n = e.shared.hiddenCallbacks),
              (e.shared.hiddenCallbacks = n === null ? i : n.concat(i))))));
      break;
    case 26:
      var a = Lt;
      if (
        (Fe(t, e),
        $e(e),
        i & 512 && (we || n === null || Ht(n, n.return)),
        i & 4)
      ) {
        var s = n !== null ? n.memoizedState : null;
        if (((i = e.memoizedState), n === null))
          if (i === null)
            if (e.stateNode === null) {
              e: {
                ((i = e.type),
                  (n = e.memoizedProps),
                  (a = a.ownerDocument || a));
                t: switch (i) {
                  case "title":
                    ((s = a.getElementsByTagName("title")[0]),
                      (!s ||
                        s[Vs] ||
                        s[Re] ||
                        s.namespaceURI === "http://www.w3.org/2000/svg" ||
                        s.hasAttribute("itemprop")) &&
                        ((s = a.createElement(i)),
                        a.head.insertBefore(
                          s,
                          a.querySelector("head > title"),
                        )),
                      Ue(s, i, n),
                      (s[Re] = e),
                      De(s),
                      (i = s));
                    break e;
                  case "link":
                    var l = Ch("link", "href", a).get(i + (n.href || ""));
                    if (l) {
                      for (var r = 0; r < l.length; r++)
                        if (
                          ((s = l[r]),
                          s.getAttribute("href") ===
                            (n.href == null || n.href === "" ? null : n.href) &&
                            s.getAttribute("rel") ===
                              (n.rel == null ? null : n.rel) &&
                            s.getAttribute("title") ===
                              (n.title == null ? null : n.title) &&
                            s.getAttribute("crossorigin") ===
                              (n.crossOrigin == null ? null : n.crossOrigin))
                        ) {
                          l.splice(r, 1);
                          break t;
                        }
                    }
                    ((s = a.createElement(i)),
                      Ue(s, i, n),
                      a.head.appendChild(s));
                    break;
                  case "meta":
                    if (
                      (l = Ch("meta", "content", a).get(i + (n.content || "")))
                    ) {
                      for (r = 0; r < l.length; r++)
                        if (
                          ((s = l[r]),
                          s.getAttribute("content") ===
                            (n.content == null ? null : "" + n.content) &&
                            s.getAttribute("name") ===
                              (n.name == null ? null : n.name) &&
                            s.getAttribute("property") ===
                              (n.property == null ? null : n.property) &&
                            s.getAttribute("http-equiv") ===
                              (n.httpEquiv == null ? null : n.httpEquiv) &&
                            s.getAttribute("charset") ===
                              (n.charSet == null ? null : n.charSet))
                        ) {
                          l.splice(r, 1);
                          break t;
                        }
                    }
                    ((s = a.createElement(i)),
                      Ue(s, i, n),
                      a.head.appendChild(s));
                    break;
                  default:
                    throw Error(D(468, i));
                }
                ((s[Re] = e), De(s), (i = s));
              }
              e.stateNode = i;
            } else jh(a, e.type, e.stateNode);
          else e.stateNode = Ah(a, i, e.memoizedProps);
        else
          s !== i
            ? (s === null
                ? n.stateNode !== null &&
                  ((n = n.stateNode), n.parentNode.removeChild(n))
                : s.count--,
              i === null
                ? jh(a, e.type, e.stateNode)
                : Ah(a, i, e.memoizedProps))
            : i === null &&
              e.stateNode !== null &&
              xo(e, e.memoizedProps, n.memoizedProps);
      }
      break;
    case 27:
      (Fe(t, e),
        $e(e),
        i & 512 && (we || n === null || Ht(n, n.return)),
        n !== null && i & 4 && xo(e, e.memoizedProps, n.memoizedProps));
      break;
    case 5:
      if (
        (Fe(t, e),
        $e(e),
        i & 512 && (we || n === null || Ht(n, n.return)),
        e.flags & 32)
      ) {
        a = e.stateNode;
        try {
          aa(a, "");
        } catch (y) {
          J(e, e.return, y);
        }
      }
      (i & 4 &&
        e.stateNode != null &&
        ((a = e.memoizedProps), xo(e, a, n !== null ? n.memoizedProps : a)),
        i & 1024 && (So = !0));
      break;
    case 6:
      if ((Fe(t, e), $e(e), i & 4)) {
        if (e.stateNode === null) throw Error(D(162));
        ((i = e.memoizedProps), (n = e.stateNode));
        try {
          n.nodeValue = i;
        } catch (y) {
          J(e, e.return, y);
        }
      }
      break;
    case 3:
      if (
        ((Al = null),
        (a = Lt),
        (Lt = ar(t.containerInfo)),
        Fe(t, e),
        (Lt = a),
        $e(e),
        i & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          da(t.containerInfo);
        } catch (y) {
          J(e, e.return, y);
        }
      So && ((So = !1), b0(e));
      break;
    case 4:
      ((i = Lt),
        (Lt = ar(e.stateNode.containerInfo)),
        Fe(t, e),
        $e(e),
        (Lt = i));
      break;
    case 12:
      (Fe(t, e), $e(e));
      break;
    case 31:
      (Fe(t, e),
        $e(e),
        i & 4 &&
          ((i = e.updateQueue),
          i !== null && ((e.updateQueue = null), il(e, i))));
      break;
    case 13:
      (Fe(t, e),
        $e(e),
        e.child.flags & 8192 &&
          (e.memoizedState !== null) !=
            (n !== null && n.memoizedState !== null) &&
          (_r = ct()),
        i & 4 &&
          ((i = e.updateQueue),
          i !== null && ((e.updateQueue = null), il(e, i))));
      break;
    case 22:
      a = e.memoizedState !== null;
      var o = n !== null && n.memoizedState !== null,
        u = en,
        c = we;
      if (
        ((en = u || a),
        (we = c || o),
        Fe(t, e),
        (we = c),
        (en = u),
        $e(e),
        i & 8192)
      )
        e: for (
          t = e.stateNode,
            t._visibility = a ? t._visibility & -2 : t._visibility | 1,
            a && (n === null || o || en || we || ni(e)),
            n = null,
            t = e;
          ;

        ) {
          if (t.tag === 5 || t.tag === 26) {
            if (n === null) {
              o = n = t;
              try {
                if (((s = o.stateNode), a))
                  ((l = s.style),
                    typeof l.setProperty == "function"
                      ? l.setProperty("display", "none", "important")
                      : (l.display = "none"));
                else {
                  r = o.stateNode;
                  var f = o.memoizedProps.style,
                    h =
                      f != null && f.hasOwnProperty("display")
                        ? f.display
                        : null;
                  r.style.display =
                    h == null || typeof h == "boolean" ? "" : ("" + h).trim();
                }
              } catch (y) {
                J(o, o.return, y);
              }
            }
          } else if (t.tag === 6) {
            if (n === null) {
              o = t;
              try {
                o.stateNode.nodeValue = a ? "" : o.memoizedProps;
              } catch (y) {
                J(o, o.return, y);
              }
            }
          } else if (t.tag === 18) {
            if (n === null) {
              o = t;
              try {
                var d = o.stateNode;
                a ? Sh(d, !0) : Sh(o.stateNode, !1);
              } catch (y) {
                J(o, o.return, y);
              }
            }
          } else if (
            ((t.tag !== 22 && t.tag !== 23) ||
              t.memoizedState === null ||
              t === e) &&
            t.child !== null
          ) {
            ((t.child.return = t), (t = t.child));
            continue;
          }
          if (t === e) break e;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) break e;
            (n === t && (n = null), (t = t.return));
          }
          (n === t && (n = null),
            (t.sibling.return = t.return),
            (t = t.sibling));
        }
      i & 4 &&
        ((i = e.updateQueue),
        i !== null &&
          ((n = i.retryQueue),
          n !== null && ((i.retryQueue = null), il(e, n))));
      break;
    case 19:
      (Fe(t, e),
        $e(e),
        i & 4 &&
          ((i = e.updateQueue),
          i !== null && ((e.updateQueue = null), il(e, i))));
      break;
    case 30:
      break;
    case 21:
      break;
    default:
      (Fe(t, e), $e(e));
  }
}
function $e(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      for (var n, i = e.return; i !== null; ) {
        if (d0(i)) {
          n = i;
          break;
        }
        i = i.return;
      }
      if (n == null) throw Error(D(160));
      switch (n.tag) {
        case 27:
          var a = n.stateNode,
            s = bo(e);
          $l(e, s, a);
          break;
        case 5:
          var l = n.stateNode;
          n.flags & 32 && (aa(l, ""), (n.flags &= -33));
          var r = bo(e);
          $l(e, r, l);
          break;
        case 3:
        case 4:
          var o = n.stateNode.containerInfo,
            u = bo(e);
          Lu(e, u, o);
          break;
        default:
          throw Error(D(161));
      }
    } catch (c) {
      J(e, e.return, c);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function b0(e) {
  if (e.subtreeFlags & 1024)
    for (e = e.child; e !== null; ) {
      var t = e;
      (b0(t),
        t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
        (e = e.sibling));
    }
}
function $t(e, t) {
  if (t.subtreeFlags & 8772)
    for (t = t.child; t !== null; ) (m0(e, t.alternate, t), (t = t.sibling));
}
function ni(e) {
  for (e = e.child; e !== null; ) {
    var t = e;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (kn(4, t, t.return), ni(t));
        break;
      case 1:
        Ht(t, t.return);
        var n = t.stateNode;
        (typeof n.componentWillUnmount == "function" && c0(t, t.return, n),
          ni(t));
        break;
      case 27:
        ts(t.stateNode);
      case 26:
      case 5:
        (Ht(t, t.return), ni(t));
        break;
      case 22:
        t.memoizedState === null && ni(t);
        break;
      case 30:
        ni(t);
        break;
      default:
        ni(t);
    }
    e = e.sibling;
  }
}
function It(e, t, n) {
  for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
    var i = t.alternate,
      a = e,
      s = t,
      l = s.flags;
    switch (s.tag) {
      case 0:
      case 11:
      case 15:
        (It(a, s, n), Hs(4, s));
        break;
      case 1:
        if (
          (It(a, s, n),
          (i = s),
          (a = i.stateNode),
          typeof a.componentDidMount == "function")
        )
          try {
            a.componentDidMount();
          } catch (u) {
            J(i, i.return, u);
          }
        if (((i = s), (a = i.updateQueue), a !== null)) {
          var r = i.stateNode;
          try {
            var o = a.shared.hiddenCallbacks;
            if (o !== null)
              for (a.shared.hiddenCallbacks = null, a = 0; a < o.length; a++)
                vg(o[a], r);
          } catch (u) {
            J(i, i.return, u);
          }
        }
        (n && l & 64 && u0(s), Ia(s, s.return));
        break;
      case 27:
        h0(s);
      case 26:
      case 5:
        (It(a, s, n), n && i === null && l & 4 && f0(s), Ia(s, s.return));
        break;
      case 12:
        It(a, s, n);
        break;
      case 31:
        (It(a, s, n), n && l & 4 && v0(a, s));
        break;
      case 13:
        (It(a, s, n), n && l & 4 && y0(a, s));
        break;
      case 22:
        (s.memoizedState === null && It(a, s, n), Ia(s, s.return));
        break;
      case 30:
        break;
      default:
        It(a, s, n);
    }
    t = t.sibling;
  }
}
function uf(e, t) {
  var n = null;
  (e !== null &&
    e.memoizedState !== null &&
    e.memoizedState.cachePool !== null &&
    (n = e.memoizedState.cachePool.pool),
    (e = null),
    t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (e = t.memoizedState.cachePool.pool),
    e !== n && (e != null && e.refCount++, n != null && Rs(n)));
}
function cf(e, t) {
  ((e = null),
    t.alternate !== null && (e = t.alternate.memoizedState.cache),
    (t = t.memoizedState.cache),
    t !== e && (t.refCount++, e != null && Rs(e)));
}
function Dt(e, t, n, i) {
  if (t.subtreeFlags & 10256)
    for (t = t.child; t !== null; ) (S0(e, t, n, i), (t = t.sibling));
}
function S0(e, t, n, i) {
  var a = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 15:
      (Dt(e, t, n, i), a & 2048 && Hs(9, t));
      break;
    case 1:
      Dt(e, t, n, i);
      break;
    case 3:
      (Dt(e, t, n, i),
        a & 2048 &&
          ((e = null),
          t.alternate !== null && (e = t.alternate.memoizedState.cache),
          (t = t.memoizedState.cache),
          t !== e && (t.refCount++, e != null && Rs(e))));
      break;
    case 12:
      if (a & 2048) {
        (Dt(e, t, n, i), (e = t.stateNode));
        try {
          var s = t.memoizedProps,
            l = s.id,
            r = s.onPostCommit;
          typeof r == "function" &&
            r(
              l,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0,
            );
        } catch (o) {
          J(t, t.return, o);
        }
      } else Dt(e, t, n, i);
      break;
    case 31:
      Dt(e, t, n, i);
      break;
    case 13:
      Dt(e, t, n, i);
      break;
    case 23:
      break;
    case 22:
      ((s = t.stateNode),
        (l = t.alternate),
        t.memoizedState !== null
          ? s._visibility & 2
            ? Dt(e, t, n, i)
            : Ja(e, t)
          : s._visibility & 2
            ? Dt(e, t, n, i)
            : ((s._visibility |= 2),
              ji(e, t, n, i, (t.subtreeFlags & 10256) !== 0 || !1)),
        a & 2048 && uf(l, t));
      break;
    case 24:
      (Dt(e, t, n, i), a & 2048 && cf(t.alternate, t));
      break;
    default:
      Dt(e, t, n, i);
  }
}
function ji(e, t, n, i, a) {
  for (
    a = a && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child;
    t !== null;

  ) {
    var s = e,
      l = t,
      r = n,
      o = i,
      u = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (ji(s, l, r, o, a), Hs(8, l));
        break;
      case 23:
        break;
      case 22:
        var c = l.stateNode;
        (l.memoizedState !== null
          ? c._visibility & 2
            ? ji(s, l, r, o, a)
            : Ja(s, l)
          : ((c._visibility |= 2), ji(s, l, r, o, a)),
          a && u & 2048 && uf(l.alternate, l));
        break;
      case 24:
        (ji(s, l, r, o, a), a && u & 2048 && cf(l.alternate, l));
        break;
      default:
        ji(s, l, r, o, a);
    }
    t = t.sibling;
  }
}
function Ja(e, t) {
  if (t.subtreeFlags & 10256)
    for (t = t.child; t !== null; ) {
      var n = e,
        i = t,
        a = i.flags;
      switch (i.tag) {
        case 22:
          (Ja(n, i), a & 2048 && uf(i.alternate, i));
          break;
        case 24:
          (Ja(n, i), a & 2048 && cf(i.alternate, i));
          break;
        default:
          Ja(n, i);
      }
      t = t.sibling;
    }
}
var Ga = 8192;
function Ai(e, t, n) {
  if (e.subtreeFlags & Ga)
    for (e = e.child; e !== null; ) (T0(e, t, n), (e = e.sibling));
}
function T0(e, t, n) {
  switch (e.tag) {
    case 26:
      (Ai(e, t, n),
        e.flags & Ga &&
          e.memoizedState !== null &&
          a2(n, Lt, e.memoizedState, e.memoizedProps));
      break;
    case 5:
      Ai(e, t, n);
      break;
    case 3:
    case 4:
      var i = Lt;
      ((Lt = ar(e.stateNode.containerInfo)), Ai(e, t, n), (Lt = i));
      break;
    case 22:
      e.memoizedState === null &&
        ((i = e.alternate),
        i !== null && i.memoizedState !== null
          ? ((i = Ga), (Ga = 16777216), Ai(e, t, n), (Ga = i))
          : Ai(e, t, n));
      break;
    default:
      Ai(e, t, n);
  }
}
function w0(e) {
  var t = e.alternate;
  if (t !== null && ((e = t.child), e !== null)) {
    t.child = null;
    do ((t = e.sibling), (e.sibling = null), (e = t));
    while (e !== null);
  }
}
function za(e) {
  var t = e.deletions;
  if (e.flags & 16) {
    if (t !== null)
      for (var n = 0; n < t.length; n++) {
        var i = t[n];
        ((Oe = i), M0(i, e));
      }
    w0(e);
  }
  if (e.subtreeFlags & 10256)
    for (e = e.child; e !== null; ) (E0(e), (e = e.sibling));
}
function E0(e) {
  switch (e.tag) {
    case 0:
    case 11:
    case 15:
      (za(e), e.flags & 2048 && kn(9, e, e.return));
      break;
    case 3:
      za(e);
      break;
    case 12:
      za(e);
      break;
    case 22:
      var t = e.stateNode;
      e.memoizedState !== null &&
      t._visibility & 2 &&
      (e.return === null || e.return.tag !== 13)
        ? ((t._visibility &= -3), El(e))
        : za(e);
      break;
    default:
      za(e);
  }
}
function El(e) {
  var t = e.deletions;
  if (e.flags & 16) {
    if (t !== null)
      for (var n = 0; n < t.length; n++) {
        var i = t[n];
        ((Oe = i), M0(i, e));
      }
    w0(e);
  }
  for (e = e.child; e !== null; ) {
    switch (((t = e), t.tag)) {
      case 0:
      case 11:
      case 15:
        (kn(8, t, t.return), El(t));
        break;
      case 22:
        ((n = t.stateNode),
          n._visibility & 2 && ((n._visibility &= -3), El(t)));
        break;
      default:
        El(t);
    }
    e = e.sibling;
  }
}
function M0(e, t) {
  for (; Oe !== null; ) {
    var n = Oe;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        kn(8, n, t);
        break;
      case 23:
      case 22:
        if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
          var i = n.memoizedState.cachePool.pool;
          i != null && i.refCount++;
        }
        break;
      case 24:
        Rs(n.memoizedState.cache);
    }
    if (((i = n.child), i !== null)) ((i.return = n), (Oe = i));
    else
      e: for (n = e; Oe !== null; ) {
        i = Oe;
        var a = i.sibling,
          s = i.return;
        if ((p0(i), i === n)) {
          Oe = null;
          break e;
        }
        if (a !== null) {
          ((a.return = s), (Oe = a));
          break e;
        }
        Oe = s;
      }
  }
}
var xb = {
    getCacheForType: function (e) {
      var t = He(Ee),
        n = t.data.get(e);
      return (n === void 0 && ((n = e()), t.data.set(e, n)), n);
    },
    cacheSignal: function () {
      return He(Ee).controller.signal;
    },
  },
  bb = typeof WeakMap == "function" ? WeakMap : Map,
  F = 0,
  ne = null,
  Q = null,
  K = 0,
  I = 0,
  st = null,
  Nn = !1,
  Sa = !1,
  ff = !1,
  dn = 0,
  ge = 0,
  Pn = 0,
  ci = 0,
  df = 0,
  ut = 0,
  oa = 0,
  Wa = null,
  Je = null,
  Vu = !1,
  _r = 0,
  A0 = 0,
  Il = 1 / 0,
  Jl = null,
  Bn = null,
  Ce = 0,
  Hn = null,
  ua = null,
  rn = 0,
  _u = 0,
  Ru = null,
  C0 = null,
  es = 0,
  Bu = null;
function ht() {
  return F & 2 && K !== 0 ? K & -K : q.T !== null ? mf() : Rp();
}
function j0() {
  if (ut === 0)
    if (!(K & 536870912) || Z) {
      var e = Fs;
      ((Fs <<= 1), !(Fs & 3932160) && (Fs = 262144), (ut = e));
    } else ut = 536870912;
  return ((e = pt.current), e !== null && (e.flags |= 32), ut);
}
function et(e, t, n) {
  (((e === ne && (I === 2 || I === 9)) || e.cancelPendingCommit !== null) &&
    (ca(e, 0), On(e, K, ut, !1)),
    Ls(e, n),
    (!(F & 2) || e !== ne) &&
      (e === ne && (!(F & 2) && (ci |= n), ge === 4 && On(e, K, ut, !1)),
      Pt(e)));
}
function N0(e, t, n) {
  if (F & 6) throw Error(D(327));
  var i = (!n && (t & 127) === 0 && (t & e.expiredLanes) === 0) || zs(e, t),
    a = i ? wb(e, t) : To(e, t, !0),
    s = i;
  do {
    if (a === 0) {
      Sa && !i && On(e, t, 0, !1);
      break;
    } else {
      if (((n = e.current.alternate), s && !Sb(n))) {
        ((a = To(e, t, !1)), (s = !1));
        continue;
      }
      if (a === 2) {
        if (((s = t), e.errorRecoveryDisabledLanes & s)) var l = 0;
        else
          ((l = e.pendingLanes & -536870913),
            (l = l !== 0 ? l : l & 536870912 ? 536870912 : 0));
        if (l !== 0) {
          t = l;
          e: {
            var r = e;
            a = Wa;
            var o = r.current.memoizedState.isDehydrated;
            if ((o && (ca(r, l).flags |= 256), (l = To(r, l, !1)), l !== 2)) {
              if (ff && !o) {
                ((r.errorRecoveryDisabledLanes |= s), (ci |= s), (a = 4));
                break e;
              }
              ((s = Je),
                (Je = a),
                s !== null && (Je === null ? (Je = s) : Je.push.apply(Je, s)));
            }
            a = l;
          }
          if (((s = !1), a !== 2)) continue;
        }
      }
      if (a === 1) {
        (ca(e, 0), On(e, t, 0, !0));
        break;
      }
      e: {
        switch (((i = e), (s = a), s)) {
          case 0:
          case 1:
            throw Error(D(345));
          case 4:
            if ((t & 4194048) !== t) break;
          case 6:
            On(i, t, ut, !Nn);
            break e;
          case 2:
            Je = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(D(329));
        }
        if ((t & 62914560) === t && ((a = _r + 300 - ct()), 10 < a)) {
          if ((On(i, t, ut, !Nn), Er(i, 0, !0) !== 0)) break e;
          ((rn = t),
            (i.timeoutHandle = F0(
              oh.bind(
                null,
                i,
                n,
                Je,
                Jl,
                Vu,
                t,
                ut,
                ci,
                oa,
                Nn,
                s,
                "Throttled",
                -0,
                0,
              ),
              a,
            )));
          break e;
        }
        oh(i, n, Je, Jl, Vu, t, ut, ci, oa, Nn, s, null, -0, 0);
      }
    }
    break;
  } while (!0);
  Pt(e);
}
function oh(e, t, n, i, a, s, l, r, o, u, c, f, h, d) {
  if (
    ((e.timeoutHandle = -1),
    (f = t.subtreeFlags),
    f & 8192 || (f & 16785408) === 16785408)
  ) {
    ((f = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: nn,
    }),
      T0(t, s, f));
    var y =
      (s & 62914560) === s ? _r - ct() : (s & 4194048) === s ? A0 - ct() : 0;
    if (((y = s2(f, y)), y !== null)) {
      ((rn = s),
        (e.cancelPendingCommit = y(
          ch.bind(null, e, t, s, n, i, a, l, r, o, c, f, null, h, d),
        )),
        On(e, s, l, !u));
      return;
    }
  }
  ch(e, t, s, n, i, a, l, r, o);
}
function Sb(e) {
  for (var t = e; ; ) {
    var n = t.tag;
    if (
      (n === 0 || n === 11 || n === 15) &&
      t.flags & 16384 &&
      ((n = t.updateQueue), n !== null && ((n = n.stores), n !== null))
    )
      for (var i = 0; i < n.length; i++) {
        var a = n[i],
          s = a.getSnapshot;
        a = a.value;
        try {
          if (!mt(s(), a)) return !1;
        } catch {
          return !1;
        }
      }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      ((n.return = t), (t = n));
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
  }
  return !0;
}
function On(e, t, n, i) {
  ((t &= ~df),
    (t &= ~ci),
    (e.suspendedLanes |= t),
    (e.pingedLanes &= ~t),
    i && (e.warmLanes |= t),
    (i = e.expirationTimes));
  for (var a = t; 0 < a; ) {
    var s = 31 - dt(a),
      l = 1 << s;
    ((i[s] = -1), (a &= ~l));
  }
  n !== 0 && Lp(e, n, t);
}
function Rr() {
  return F & 6 ? !0 : (Us(0), !1);
}
function hf() {
  if (Q !== null) {
    if (I === 0) var e = Q.return;
    else ((e = Q), (an = Ei = null), Ic(e), (Ii = null), (ms = 0), (e = Q));
    for (; e !== null; ) (o0(e.alternate, e), (e = e.return));
    Q = null;
  }
}
function ca(e, t) {
  var n = e.timeoutHandle;
  (n !== -1 && ((e.timeoutHandle = -1), qb(n)),
    (n = e.cancelPendingCommit),
    n !== null && ((e.cancelPendingCommit = null), n()),
    (rn = 0),
    hf(),
    (ne = e),
    (Q = n = sn(e.current, null)),
    (K = t),
    (I = 0),
    (st = null),
    (Nn = !1),
    (Sa = zs(e, t)),
    (ff = !1),
    (oa = ut = df = ci = Pn = ge = 0),
    (Je = Wa = null),
    (Vu = !1),
    t & 8 && (t |= t & 32));
  var i = e.entangledLanes;
  if (i !== 0)
    for (e = e.entanglements, i &= t; 0 < i; ) {
      var a = 31 - dt(i),
        s = 1 << a;
      ((t |= e[a]), (i &= ~s));
    }
  return ((dn = t), jr(), n);
}
function O0(e, t) {
  ((k = null),
    (q.H = gs),
    t === ba || t === Or
      ? ((t = Gd()), (I = 3))
      : t === kc
        ? ((t = Gd()), (I = 4))
        : (I =
            t === rf
              ? 8
              : t !== null &&
                  typeof t == "object" &&
                  typeof t.then == "function"
                ? 6
                : 1),
    (st = t),
    Q === null && ((ge = 1), Zl(e, Et(t, e.current))));
}
function D0() {
  var e = pt.current;
  return e === null
    ? !0
    : (K & 4194048) === K
      ? Ct === null
      : (K & 62914560) === K || K & 536870912
        ? e === Ct
        : !1;
}
function z0() {
  var e = q.H;
  return ((q.H = gs), e === null ? gs : e);
}
function L0() {
  var e = q.A;
  return ((q.A = xb), e);
}
function Wl() {
  ((ge = 4),
    Nn || ((K & 4194048) !== K && pt.current !== null) || (Sa = !0),
    (!(Pn & 134217727) && !(ci & 134217727)) ||
      ne === null ||
      On(ne, K, ut, !1));
}
function To(e, t, n) {
  var i = F;
  F |= 2;
  var a = z0(),
    s = L0();
  ((ne !== e || K !== t) && ((Jl = null), ca(e, t)), (t = !1));
  var l = ge;
  e: do
    try {
      if (I !== 0 && Q !== null) {
        var r = Q,
          o = st;
        switch (I) {
          case 8:
            (hf(), (l = 6));
            break e;
          case 3:
          case 2:
          case 9:
          case 6:
            pt.current === null && (t = !0);
            var u = I;
            if (((I = 0), (st = null), qi(e, r, o, u), n && Sa)) {
              l = 0;
              break e;
            }
            break;
          default:
            ((u = I), (I = 0), (st = null), qi(e, r, o, u));
        }
      }
      (Tb(), (l = ge));
      break;
    } catch (c) {
      O0(e, c);
    }
  while (!0);
  return (
    t && e.shellSuspendCounter++,
    (an = Ei = null),
    (F = i),
    (q.H = a),
    (q.A = s),
    Q === null && ((ne = null), (K = 0), jr()),
    l
  );
}
function Tb() {
  for (; Q !== null; ) V0(Q);
}
function wb(e, t) {
  var n = F;
  F |= 2;
  var i = z0(),
    a = L0();
  ne !== e || K !== t
    ? ((Jl = null), (Il = ct() + 500), ca(e, t))
    : (Sa = zs(e, t));
  e: do
    try {
      if (I !== 0 && Q !== null) {
        t = Q;
        var s = st;
        t: switch (I) {
          case 1:
            ((I = 0), (st = null), qi(e, t, s, 1));
            break;
          case 2:
          case 9:
            if (Ud(s)) {
              ((I = 0), (st = null), uh(t));
              break;
            }
            ((t = function () {
              ((I !== 2 && I !== 9) || ne !== e || (I = 7), Pt(e));
            }),
              s.then(t, t));
            break e;
          case 3:
            I = 7;
            break e;
          case 4:
            I = 5;
            break e;
          case 7:
            Ud(s)
              ? ((I = 0), (st = null), uh(t))
              : ((I = 0), (st = null), qi(e, t, s, 7));
            break;
          case 5:
            var l = null;
            switch (Q.tag) {
              case 26:
                l = Q.memoizedState;
              case 5:
              case 27:
                var r = Q;
                if (l ? ev(l) : r.stateNode.complete) {
                  ((I = 0), (st = null));
                  var o = r.sibling;
                  if (o !== null) Q = o;
                  else {
                    var u = r.return;
                    u !== null ? ((Q = u), Br(u)) : (Q = null);
                  }
                  break t;
                }
            }
            ((I = 0), (st = null), qi(e, t, s, 5));
            break;
          case 6:
            ((I = 0), (st = null), qi(e, t, s, 6));
            break;
          case 8:
            (hf(), (ge = 6));
            break e;
          default:
            throw Error(D(462));
        }
      }
      Eb();
      break;
    } catch (c) {
      O0(e, c);
    }
  while (!0);
  return (
    (an = Ei = null),
    (q.H = i),
    (q.A = a),
    (F = n),
    Q !== null ? 0 : ((ne = null), (K = 0), jr(), ge)
  );
}
function Eb() {
  for (; Q !== null && !K1(); ) V0(Q);
}
function V0(e) {
  var t = r0(e.alternate, e, dn);
  ((e.memoizedProps = e.pendingProps), t === null ? Br(e) : (Q = t));
}
function uh(e) {
  var t = e,
    n = t.alternate;
  switch (t.tag) {
    case 15:
    case 0:
      t = nh(n, t, t.pendingProps, t.type, void 0, K);
      break;
    case 11:
      t = nh(n, t, t.pendingProps, t.type.render, t.ref, K);
      break;
    case 5:
      Ic(t);
    default:
      (o0(n, t), (t = Q = og(t, dn)), (t = r0(n, t, dn)));
  }
  ((e.memoizedProps = e.pendingProps), t === null ? Br(e) : (Q = t));
}
function qi(e, t, n, i) {
  ((an = Ei = null), Ic(t), (Ii = null), (ms = 0));
  var a = t.return;
  try {
    if (db(e, a, t, n, K)) {
      ((ge = 1), Zl(e, Et(n, e.current)), (Q = null));
      return;
    }
  } catch (s) {
    if (a !== null) throw ((Q = a), s);
    ((ge = 1), Zl(e, Et(n, e.current)), (Q = null));
    return;
  }
  t.flags & 32768
    ? (Z || i === 1
        ? (e = !0)
        : Sa || K & 536870912
          ? (e = !1)
          : ((Nn = e = !0),
            (i === 2 || i === 9 || i === 3 || i === 6) &&
              ((i = pt.current),
              i !== null && i.tag === 13 && (i.flags |= 16384))),
      _0(t, e))
    : Br(t);
}
function Br(e) {
  var t = e;
  do {
    if (t.flags & 32768) {
      _0(t, Nn);
      return;
    }
    e = t.return;
    var n = pb(t.alternate, t, dn);
    if (n !== null) {
      Q = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      Q = t;
      return;
    }
    Q = t = e;
  } while (t !== null);
  ge === 0 && (ge = 5);
}
function _0(e, t) {
  do {
    var n = gb(e.alternate, e);
    if (n !== null) {
      ((n.flags &= 32767), (Q = n));
      return;
    }
    if (
      ((n = e.return),
      n !== null &&
        ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
      !t && ((e = e.sibling), e !== null))
    ) {
      Q = e;
      return;
    }
    Q = e = n;
  } while (e !== null);
  ((ge = 6), (Q = null));
}
function ch(e, t, n, i, a, s, l, r, o) {
  e.cancelPendingCommit = null;
  do Hr();
  while (Ce !== 0);
  if (F & 6) throw Error(D(327));
  if (t !== null) {
    if (t === e.current) throw Error(D(177));
    if (
      ((s = t.lanes | t.childLanes),
      (s |= Bc),
      ix(e, n, s, l, r, o),
      e === ne && ((Q = ne = null), (K = 0)),
      (ua = t),
      (Hn = e),
      (rn = n),
      (_u = s),
      (Ru = a),
      (C0 = i),
      t.subtreeFlags & 10256 || t.flags & 10256
        ? ((e.callbackNode = null),
          (e.callbackPriority = 0),
          jb(Bl, function () {
            return (G0(), null);
          }))
        : ((e.callbackNode = null), (e.callbackPriority = 0)),
      (i = (t.flags & 13878) !== 0),
      t.subtreeFlags & 13878 || i)
    ) {
      ((i = q.T), (q.T = null), (a = $.p), ($.p = 2), (l = F), (F |= 4));
      try {
        vb(e, t, n);
      } finally {
        ((F = l), ($.p = a), (q.T = i));
      }
    }
    ((Ce = 1), R0(), B0(), H0());
  }
}
function R0() {
  if (Ce === 1) {
    Ce = 0;
    var e = Hn,
      t = ua,
      n = (t.flags & 13878) !== 0;
    if (t.subtreeFlags & 13878 || n) {
      ((n = q.T), (q.T = null));
      var i = $.p;
      $.p = 2;
      var a = F;
      F |= 4;
      try {
        x0(t, e);
        var s = qu,
          l = eg(e.containerInfo),
          r = s.focusedElem,
          o = s.selectionRange;
        if (
          l !== r &&
          r &&
          r.ownerDocument &&
          Wp(r.ownerDocument.documentElement, r)
        ) {
          if (o !== null && Rc(r)) {
            var u = o.start,
              c = o.end;
            if ((c === void 0 && (c = u), "selectionStart" in r))
              ((r.selectionStart = u),
                (r.selectionEnd = Math.min(c, r.value.length)));
            else {
              var f = r.ownerDocument || document,
                h = (f && f.defaultView) || window;
              if (h.getSelection) {
                var d = h.getSelection(),
                  y = r.textContent.length,
                  x = Math.min(o.start, y),
                  T = o.end === void 0 ? x : Math.min(o.end, y);
                !d.extend && x > T && ((l = T), (T = x), (x = l));
                var m = zd(r, x),
                  p = zd(r, T);
                if (
                  m &&
                  p &&
                  (d.rangeCount !== 1 ||
                    d.anchorNode !== m.node ||
                    d.anchorOffset !== m.offset ||
                    d.focusNode !== p.node ||
                    d.focusOffset !== p.offset)
                ) {
                  var v = f.createRange();
                  (v.setStart(m.node, m.offset),
                    d.removeAllRanges(),
                    x > T
                      ? (d.addRange(v), d.extend(p.node, p.offset))
                      : (v.setEnd(p.node, p.offset), d.addRange(v)));
                }
              }
            }
          }
          for (f = [], d = r; (d = d.parentNode); )
            d.nodeType === 1 &&
              f.push({ element: d, left: d.scrollLeft, top: d.scrollTop });
          for (
            typeof r.focus == "function" && r.focus(), r = 0;
            r < f.length;
            r++
          ) {
            var b = f[r];
            ((b.element.scrollLeft = b.left), (b.element.scrollTop = b.top));
          }
        }
        ((rr = !!Gu), (qu = Gu = null));
      } finally {
        ((F = a), ($.p = i), (q.T = n));
      }
    }
    ((e.current = t), (Ce = 2));
  }
}
function B0() {
  if (Ce === 2) {
    Ce = 0;
    var e = Hn,
      t = ua,
      n = (t.flags & 8772) !== 0;
    if (t.subtreeFlags & 8772 || n) {
      ((n = q.T), (q.T = null));
      var i = $.p;
      $.p = 2;
      var a = F;
      F |= 4;
      try {
        m0(e, t.alternate, t);
      } finally {
        ((F = a), ($.p = i), (q.T = n));
      }
    }
    Ce = 3;
  }
}
function H0() {
  if (Ce === 4 || Ce === 3) {
    ((Ce = 0), Z1());
    var e = Hn,
      t = ua,
      n = rn,
      i = C0;
    t.subtreeFlags & 10256 || t.flags & 10256
      ? (Ce = 5)
      : ((Ce = 0), (ua = Hn = null), U0(e, e.pendingLanes));
    var a = e.pendingLanes;
    if (
      (a === 0 && (Bn = null),
      Nc(n),
      (t = t.stateNode),
      ft && typeof ft.onCommitFiberRoot == "function")
    )
      try {
        ft.onCommitFiberRoot(Ds, t, void 0, (t.current.flags & 128) === 128);
      } catch {}
    if (i !== null) {
      ((t = q.T), (a = $.p), ($.p = 2), (q.T = null));
      try {
        for (var s = e.onRecoverableError, l = 0; l < i.length; l++) {
          var r = i[l];
          s(r.value, { componentStack: r.stack });
        }
      } finally {
        ((q.T = t), ($.p = a));
      }
    }
    (rn & 3 && Hr(),
      Pt(e),
      (a = e.pendingLanes),
      n & 261930 && a & 42
        ? e === Bu
          ? es++
          : ((es = 0), (Bu = e))
        : (es = 0),
      Us(0));
  }
}
function U0(e, t) {
  (e.pooledCacheLanes &= t) === 0 &&
    ((t = e.pooledCache), t != null && ((e.pooledCache = null), Rs(t)));
}
function Hr() {
  return (R0(), B0(), H0(), G0());
}
function G0() {
  if (Ce !== 5) return !1;
  var e = Hn,
    t = _u;
  _u = 0;
  var n = Nc(rn),
    i = q.T,
    a = $.p;
  try {
    (($.p = 32 > n ? 32 : n), (q.T = null), (n = Ru), (Ru = null));
    var s = Hn,
      l = rn;
    if (((Ce = 0), (ua = Hn = null), (rn = 0), F & 6)) throw Error(D(331));
    var r = F;
    if (
      ((F |= 4),
      E0(s.current),
      S0(s, s.current, l, n),
      (F = r),
      Us(0, !1),
      ft && typeof ft.onPostCommitFiberRoot == "function")
    )
      try {
        ft.onPostCommitFiberRoot(Ds, s);
      } catch {}
    return !0;
  } finally {
    (($.p = a), (q.T = i), U0(e, t));
  }
}
function fh(e, t, n) {
  ((t = Et(n, t)),
    (t = Ou(e.stateNode, t, 2)),
    (e = Rn(e, t, 2)),
    e !== null && (Ls(e, 2), Pt(e)));
}
function J(e, t, n) {
  if (e.tag === 3) fh(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        fh(t, e, n);
        break;
      } else if (t.tag === 1) {
        var i = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof i.componentDidCatch == "function" &&
            (Bn === null || !Bn.has(i)))
        ) {
          ((e = Et(n, e)),
            (n = t0(2)),
            (i = Rn(t, n, 2)),
            i !== null && (n0(n, i, t, e), Ls(i, 2), Pt(i)));
          break;
        }
      }
      t = t.return;
    }
}
function wo(e, t, n) {
  var i = e.pingCache;
  if (i === null) {
    i = e.pingCache = new bb();
    var a = new Set();
    i.set(t, a);
  } else ((a = i.get(t)), a === void 0 && ((a = new Set()), i.set(t, a)));
  a.has(n) || ((ff = !0), a.add(n), (e = Mb.bind(null, e, t, n)), t.then(e, e));
}
function Mb(e, t, n) {
  var i = e.pingCache;
  (i !== null && i.delete(t),
    (e.pingedLanes |= e.suspendedLanes & n),
    (e.warmLanes &= ~n),
    ne === e &&
      (K & n) === n &&
      (ge === 4 || (ge === 3 && (K & 62914560) === K && 300 > ct() - _r)
        ? !(F & 2) && ca(e, 0)
        : (df |= n),
      oa === K && (oa = 0)),
    Pt(e));
}
function q0(e, t) {
  (t === 0 && (t = zp()), (e = wi(e, t)), e !== null && (Ls(e, t), Pt(e)));
}
function Ab(e) {
  var t = e.memoizedState,
    n = 0;
  (t !== null && (n = t.retryLane), q0(e, n));
}
function Cb(e, t) {
  var n = 0;
  switch (e.tag) {
    case 31:
    case 13:
      var i = e.stateNode,
        a = e.memoizedState;
      a !== null && (n = a.retryLane);
      break;
    case 19:
      i = e.stateNode;
      break;
    case 22:
      i = e.stateNode._retryCache;
      break;
    default:
      throw Error(D(314));
  }
  (i !== null && i.delete(t), q0(e, n));
}
function jb(e, t) {
  return Cc(e, t);
}
var er = null,
  Ni = null,
  Hu = !1,
  tr = !1,
  Eo = !1,
  Dn = 0;
function Pt(e) {
  (e !== Ni &&
    e.next === null &&
    (Ni === null ? (er = Ni = e) : (Ni = Ni.next = e)),
    (tr = !0),
    Hu || ((Hu = !0), Ob()));
}
function Us(e, t) {
  if (!Eo && tr) {
    Eo = !0;
    do
      for (var n = !1, i = er; i !== null; ) {
        if (e !== 0) {
          var a = i.pendingLanes;
          if (a === 0) var s = 0;
          else {
            var l = i.suspendedLanes,
              r = i.pingedLanes;
            ((s = (1 << (31 - dt(42 | e) + 1)) - 1),
              (s &= a & ~(l & ~r)),
              (s = s & 201326741 ? (s & 201326741) | 1 : s ? s | 2 : 0));
          }
          s !== 0 && ((n = !0), dh(i, s));
        } else
          ((s = K),
            (s = Er(
              i,
              i === ne ? s : 0,
              i.cancelPendingCommit !== null || i.timeoutHandle !== -1,
            )),
            !(s & 3) || zs(i, s) || ((n = !0), dh(i, s)));
        i = i.next;
      }
    while (n);
    Eo = !1;
  }
}
function Nb() {
  Y0();
}
function Y0() {
  tr = Hu = !1;
  var e = 0;
  Dn !== 0 && Gb() && (e = Dn);
  for (var t = ct(), n = null, i = er; i !== null; ) {
    var a = i.next,
      s = X0(i, t);
    (s === 0
      ? ((i.next = null),
        n === null ? (er = a) : (n.next = a),
        a === null && (Ni = n))
      : ((n = i), (e !== 0 || s & 3) && (tr = !0)),
      (i = a));
  }
  ((Ce !== 0 && Ce !== 5) || Us(e), Dn !== 0 && (Dn = 0));
}
function X0(e, t) {
  for (
    var n = e.suspendedLanes,
      i = e.pingedLanes,
      a = e.expirationTimes,
      s = e.pendingLanes & -62914561;
    0 < s;

  ) {
    var l = 31 - dt(s),
      r = 1 << l,
      o = a[l];
    (o === -1
      ? (!(r & n) || r & i) && (a[l] = nx(r, t))
      : o <= t && (e.expiredLanes |= r),
      (s &= ~r));
  }
  if (
    ((t = ne),
    (n = K),
    (n = Er(
      e,
      e === t ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
    )),
    (i = e.callbackNode),
    n === 0 ||
      (e === t && (I === 2 || I === 9)) ||
      e.cancelPendingCommit !== null)
  )
    return (
      i !== null && i !== null && Ir(i),
      (e.callbackNode = null),
      (e.callbackPriority = 0)
    );
  if (!(n & 3) || zs(e, n)) {
    if (((t = n & -n), t === e.callbackPriority)) return t;
    switch ((i !== null && Ir(i), Nc(n))) {
      case 2:
      case 8:
        n = Op;
        break;
      case 32:
        n = Bl;
        break;
      case 268435456:
        n = Dp;
        break;
      default:
        n = Bl;
    }
    return (
      (i = k0.bind(null, e)),
      (n = Cc(n, i)),
      (e.callbackPriority = t),
      (e.callbackNode = n),
      t
    );
  }
  return (
    i !== null && i !== null && Ir(i),
    (e.callbackPriority = 2),
    (e.callbackNode = null),
    2
  );
}
function k0(e, t) {
  if (Ce !== 0 && Ce !== 5)
    return ((e.callbackNode = null), (e.callbackPriority = 0), null);
  var n = e.callbackNode;
  if (Hr() && e.callbackNode !== n) return null;
  var i = K;
  return (
    (i = Er(
      e,
      e === ne ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
    )),
    i === 0
      ? null
      : (N0(e, i, t),
        X0(e, ct()),
        e.callbackNode != null && e.callbackNode === n
          ? k0.bind(null, e)
          : null)
  );
}
function dh(e, t) {
  if (Hr()) return null;
  N0(e, t, !0);
}
function Ob() {
  Yb(function () {
    F & 6 ? Cc(Np, Nb) : Y0();
  });
}
function mf() {
  if (Dn === 0) {
    var e = sa;
    (e === 0 && ((e = Zs), (Zs <<= 1), !(Zs & 261888) && (Zs = 256)), (Dn = e));
  }
  return Dn;
}
function hh(e) {
  return e == null || typeof e == "symbol" || typeof e == "boolean"
    ? null
    : typeof e == "function"
      ? e
      : pl("" + e);
}
function mh(e, t) {
  var n = t.ownerDocument.createElement("input");
  return (
    (n.name = t.name),
    (n.value = t.value),
    e.id && n.setAttribute("form", e.id),
    t.parentNode.insertBefore(n, t),
    (e = new FormData(e)),
    n.parentNode.removeChild(n),
    e
  );
}
function Db(e, t, n, i, a) {
  if (t === "submit" && n && n.stateNode === a) {
    var s = hh((a[tt] || null).action),
      l = i.submitter;
    l &&
      ((t = (t = l[tt] || null)
        ? hh(t.formAction)
        : l.getAttribute("formAction")),
      t !== null && ((s = t), (l = null)));
    var r = new Mr("action", "action", null, i, a);
    e.push({
      event: r,
      listeners: [
        {
          instance: null,
          listener: function () {
            if (i.defaultPrevented) {
              if (Dn !== 0) {
                var o = l ? mh(a, l) : new FormData(a);
                ju(
                  n,
                  { pending: !0, data: o, method: a.method, action: s },
                  null,
                  o,
                );
              }
            } else
              typeof s == "function" &&
                (r.preventDefault(),
                (o = l ? mh(a, l) : new FormData(a)),
                ju(
                  n,
                  { pending: !0, data: o, method: a.method, action: s },
                  s,
                  o,
                ));
          },
          currentTarget: a,
        },
      ],
    });
  }
}
for (var Mo = 0; Mo < gu.length; Mo++) {
  var Ao = gu[Mo],
    zb = Ao.toLowerCase(),
    Lb = Ao[0].toUpperCase() + Ao.slice(1);
  Vt(zb, "on" + Lb);
}
Vt(ng, "onAnimationEnd");
Vt(ig, "onAnimationIteration");
Vt(ag, "onAnimationStart");
Vt("dblclick", "onDoubleClick");
Vt("focusin", "onFocus");
Vt("focusout", "onBlur");
Vt(Fx, "onTransitionRun");
Vt($x, "onTransitionStart");
Vt(Ix, "onTransitionCancel");
Vt(sg, "onTransitionEnd");
ia("onMouseEnter", ["mouseout", "mouseover"]);
ia("onMouseLeave", ["mouseout", "mouseover"]);
ia("onPointerEnter", ["pointerout", "pointerover"]);
ia("onPointerLeave", ["pointerout", "pointerover"]);
bi(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(
    " ",
  ),
);
bi(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " ",
  ),
);
bi("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
bi(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
bi(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
bi(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var vs =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  Vb = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle"
      .split(" ")
      .concat(vs),
  );
function P0(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var i = e[n],
      a = i.event;
    i = i.listeners;
    e: {
      var s = void 0;
      if (t)
        for (var l = i.length - 1; 0 <= l; l--) {
          var r = i[l],
            o = r.instance,
            u = r.currentTarget;
          if (((r = r.listener), o !== s && a.isPropagationStopped())) break e;
          ((s = r), (a.currentTarget = u));
          try {
            s(a);
          } catch (c) {
            Ul(c);
          }
          ((a.currentTarget = null), (s = o));
        }
      else
        for (l = 0; l < i.length; l++) {
          if (
            ((r = i[l]),
            (o = r.instance),
            (u = r.currentTarget),
            (r = r.listener),
            o !== s && a.isPropagationStopped())
          )
            break e;
          ((s = r), (a.currentTarget = u));
          try {
            s(a);
          } catch (c) {
            Ul(c);
          }
          ((a.currentTarget = null), (s = o));
        }
    }
  }
}
function P(e, t) {
  var n = t[ou];
  n === void 0 && (n = t[ou] = new Set());
  var i = e + "__bubble";
  n.has(i) || (Q0(t, e, 2, !1), n.add(i));
}
function Co(e, t, n) {
  var i = 0;
  (t && (i |= 4), Q0(n, e, i, t));
}
var al = "_reactListening" + Math.random().toString(36).slice(2);
function pf(e) {
  if (!e[al]) {
    ((e[al] = !0),
      Bp.forEach(function (n) {
        n !== "selectionchange" && (Vb.has(n) || Co(n, !1, e), Co(n, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[al] || ((t[al] = !0), Co("selectionchange", !1, t));
  }
}
function Q0(e, t, n, i) {
  switch (sv(t)) {
    case 2:
      var a = o2;
      break;
    case 8:
      a = u2;
      break;
    default:
      a = xf;
  }
  ((n = a.bind(null, t, n, e)),
    (a = void 0),
    !hu ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (a = !0),
    i
      ? a !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: a })
        : e.addEventListener(t, n, !0)
      : a !== void 0
        ? e.addEventListener(t, n, { passive: a })
        : e.addEventListener(t, n, !1));
}
function jo(e, t, n, i, a) {
  var s = i;
  if (!(t & 1) && !(t & 2) && i !== null)
    e: for (;;) {
      if (i === null) return;
      var l = i.tag;
      if (l === 3 || l === 4) {
        var r = i.stateNode.containerInfo;
        if (r === a) break;
        if (l === 4)
          for (l = i.return; l !== null; ) {
            var o = l.tag;
            if ((o === 3 || o === 4) && l.stateNode.containerInfo === a) return;
            l = l.return;
          }
        for (; r !== null; ) {
          if (((l = zi(r)), l === null)) return;
          if (((o = l.tag), o === 5 || o === 6 || o === 26 || o === 27)) {
            i = s = l;
            continue e;
          }
          r = r.parentNode;
        }
      }
      i = i.return;
    }
  Pp(function () {
    var u = s,
      c = zc(n),
      f = [];
    e: {
      var h = lg.get(e);
      if (h !== void 0) {
        var d = Mr,
          y = e;
        switch (e) {
          case "keypress":
            if (vl(n) === 0) break e;
          case "keydown":
          case "keyup":
            d = Cx;
            break;
          case "focusin":
            ((y = "focus"), (d = no));
            break;
          case "focusout":
            ((y = "blur"), (d = no));
            break;
          case "beforeblur":
          case "afterblur":
            d = no;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            d = Td;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            d = px;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            d = Ox;
            break;
          case ng:
          case ig:
          case ag:
            d = yx;
            break;
          case sg:
            d = zx;
            break;
          case "scroll":
          case "scrollend":
            d = hx;
            break;
          case "wheel":
            d = Vx;
            break;
          case "copy":
          case "cut":
          case "paste":
            d = bx;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            d = Ed;
            break;
          case "toggle":
          case "beforetoggle":
            d = Rx;
        }
        var x = (t & 4) !== 0,
          T = !x && (e === "scroll" || e === "scrollend"),
          m = x ? (h !== null ? h + "Capture" : null) : h;
        x = [];
        for (var p = u, v; p !== null; ) {
          var b = p;
          if (
            ((v = b.stateNode),
            (b = b.tag),
            (b !== 5 && b !== 26 && b !== 27) ||
              v === null ||
              m === null ||
              ((b = us(p, m)), b != null && x.push(ys(p, b, v))),
            T)
          )
            break;
          p = p.return;
        }
        0 < x.length &&
          ((h = new d(h, y, null, n, c)), f.push({ event: h, listeners: x }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((h = e === "mouseover" || e === "pointerover"),
          (d = e === "mouseout" || e === "pointerout"),
          h &&
            n !== du &&
            (y = n.relatedTarget || n.fromElement) &&
            (zi(y) || y[va]))
        )
          break e;
        if (
          (d || h) &&
          ((h =
            c.window === c
              ? c
              : (h = c.ownerDocument)
                ? h.defaultView || h.parentWindow
                : window),
          d
            ? ((y = n.relatedTarget || n.toElement),
              (d = u),
              (y = y ? zi(y) : null),
              y !== null &&
                ((T = Os(y)),
                (x = y.tag),
                y !== T || (x !== 5 && x !== 27 && x !== 6)) &&
                (y = null))
            : ((d = null), (y = u)),
          d !== y)
        ) {
          if (
            ((x = Td),
            (b = "onMouseLeave"),
            (m = "onMouseEnter"),
            (p = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((x = Ed),
              (b = "onPointerLeave"),
              (m = "onPointerEnter"),
              (p = "pointer")),
            (T = d == null ? h : Ha(d)),
            (v = y == null ? h : Ha(y)),
            (h = new x(b, p + "leave", d, n, c)),
            (h.target = T),
            (h.relatedTarget = v),
            (b = null),
            zi(c) === u &&
              ((x = new x(m, p + "enter", y, n, c)),
              (x.target = v),
              (x.relatedTarget = T),
              (b = x)),
            (T = b),
            d && y)
          )
            t: {
              for (x = _b, m = d, p = y, v = 0, b = m; b; b = x(b)) v++;
              b = 0;
              for (var w = p; w; w = x(w)) b++;
              for (; 0 < v - b; ) ((m = x(m)), v--);
              for (; 0 < b - v; ) ((p = x(p)), b--);
              for (; v--; ) {
                if (m === p || (p !== null && m === p.alternate)) {
                  x = m;
                  break t;
                }
                ((m = x(m)), (p = x(p)));
              }
              x = null;
            }
          else x = null;
          (d !== null && ph(f, h, d, x, !1),
            y !== null && T !== null && ph(f, T, y, x, !0));
        }
      }
      e: {
        if (
          ((h = u ? Ha(u) : window),
          (d = h.nodeName && h.nodeName.toLowerCase()),
          d === "select" || (d === "input" && h.type === "file"))
        )
          var M = jd;
        else if (Cd(h))
          if (Ip) M = Qx;
          else {
            M = kx;
            var E = Xx;
          }
        else
          ((d = h.nodeName),
            !d ||
            d.toLowerCase() !== "input" ||
            (h.type !== "checkbox" && h.type !== "radio")
              ? u && Dc(u.elementType) && (M = jd)
              : (M = Px));
        if (M && (M = M(e, u))) {
          $p(f, M, n, c);
          break e;
        }
        (E && E(e, h, u),
          e === "focusout" &&
            u &&
            h.type === "number" &&
            u.memoizedProps.value != null &&
            fu(h, "number", h.value));
      }
      switch (((E = u ? Ha(u) : window), e)) {
        case "focusin":
          (Cd(E) || E.contentEditable === "true") &&
            ((_i = E), (mu = u), (Pa = null));
          break;
        case "focusout":
          Pa = mu = _i = null;
          break;
        case "mousedown":
          pu = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((pu = !1), Ld(f, n, c));
          break;
        case "selectionchange":
          if (Zx) break;
        case "keydown":
        case "keyup":
          Ld(f, n, c);
      }
      var S;
      if (_c)
        e: {
          switch (e) {
            case "compositionstart":
              var O = "onCompositionStart";
              break e;
            case "compositionend":
              O = "onCompositionEnd";
              break e;
            case "compositionupdate":
              O = "onCompositionUpdate";
              break e;
          }
          O = void 0;
        }
      else
        Vi
          ? Zp(e, n) && (O = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (O = "onCompositionStart");
      (O &&
        (Kp &&
          n.locale !== "ko" &&
          (Vi || O !== "onCompositionStart"
            ? O === "onCompositionEnd" && Vi && (S = Qp())
            : ((jn = c),
              (Lc = "value" in jn ? jn.value : jn.textContent),
              (Vi = !0))),
        (E = nr(u, O)),
        0 < E.length &&
          ((O = new wd(O, e, null, n, c)),
          f.push({ event: O, listeners: E }),
          S ? (O.data = S) : ((S = Fp(n)), S !== null && (O.data = S)))),
        (S = Hx ? Ux(e, n) : Gx(e, n)) &&
          ((O = nr(u, "onBeforeInput")),
          0 < O.length &&
            ((E = new wd("onBeforeInput", "beforeinput", null, n, c)),
            f.push({ event: E, listeners: O }),
            (E.data = S))),
        Db(f, e, u, n, c));
    }
    P0(f, t);
  });
}
function ys(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function nr(e, t) {
  for (var n = t + "Capture", i = []; e !== null; ) {
    var a = e,
      s = a.stateNode;
    if (
      ((a = a.tag),
      (a !== 5 && a !== 26 && a !== 27) ||
        s === null ||
        ((a = us(e, n)),
        a != null && i.unshift(ys(e, a, s)),
        (a = us(e, t)),
        a != null && i.push(ys(e, a, s))),
      e.tag === 3)
    )
      return i;
    e = e.return;
  }
  return [];
}
function _b(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5 && e.tag !== 27);
  return e || null;
}
function ph(e, t, n, i, a) {
  for (var s = t._reactName, l = []; n !== null && n !== i; ) {
    var r = n,
      o = r.alternate,
      u = r.stateNode;
    if (((r = r.tag), o !== null && o === i)) break;
    ((r !== 5 && r !== 26 && r !== 27) ||
      u === null ||
      ((o = u),
      a
        ? ((u = us(n, s)), u != null && l.unshift(ys(n, u, o)))
        : a || ((u = us(n, s)), u != null && l.push(ys(n, u, o)))),
      (n = n.return));
  }
  l.length !== 0 && e.push({ event: t, listeners: l });
}
var Rb = /\r\n?/g,
  Bb = /\u0000|\uFFFD/g;
function gh(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      Rb,
      `
`,
    )
    .replace(Bb, "");
}
function K0(e, t) {
  return ((t = gh(t)), gh(e) === t);
}
function ee(e, t, n, i, a, s) {
  switch (n) {
    case "children":
      typeof i == "string"
        ? t === "body" || (t === "textarea" && i === "") || aa(e, i)
        : (typeof i == "number" || typeof i == "bigint") &&
          t !== "body" &&
          aa(e, "" + i);
      break;
    case "className":
      Is(e, "class", i);
      break;
    case "tabIndex":
      Is(e, "tabindex", i);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      Is(e, n, i);
      break;
    case "style":
      kp(e, i, s);
      break;
    case "data":
      if (t !== "object") {
        Is(e, "data", i);
        break;
      }
    case "src":
    case "href":
      if (i === "" && (t !== "a" || n !== "href")) {
        e.removeAttribute(n);
        break;
      }
      if (
        i == null ||
        typeof i == "function" ||
        typeof i == "symbol" ||
        typeof i == "boolean"
      ) {
        e.removeAttribute(n);
        break;
      }
      ((i = pl("" + i)), e.setAttribute(n, i));
      break;
    case "action":
    case "formAction":
      if (typeof i == "function") {
        e.setAttribute(
          n,
          "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
        );
        break;
      } else
        typeof s == "function" &&
          (n === "formAction"
            ? (t !== "input" && ee(e, t, "name", a.name, a, null),
              ee(e, t, "formEncType", a.formEncType, a, null),
              ee(e, t, "formMethod", a.formMethod, a, null),
              ee(e, t, "formTarget", a.formTarget, a, null))
            : (ee(e, t, "encType", a.encType, a, null),
              ee(e, t, "method", a.method, a, null),
              ee(e, t, "target", a.target, a, null)));
      if (i == null || typeof i == "symbol" || typeof i == "boolean") {
        e.removeAttribute(n);
        break;
      }
      ((i = pl("" + i)), e.setAttribute(n, i));
      break;
    case "onClick":
      i != null && (e.onclick = nn);
      break;
    case "onScroll":
      i != null && P("scroll", e);
      break;
    case "onScrollEnd":
      i != null && P("scrollend", e);
      break;
    case "dangerouslySetInnerHTML":
      if (i != null) {
        if (typeof i != "object" || !("__html" in i)) throw Error(D(61));
        if (((n = i.__html), n != null)) {
          if (a.children != null) throw Error(D(60));
          e.innerHTML = n;
        }
      }
      break;
    case "multiple":
      e.multiple = i && typeof i != "function" && typeof i != "symbol";
      break;
    case "muted":
      e.muted = i && typeof i != "function" && typeof i != "symbol";
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "ref":
      break;
    case "autoFocus":
      break;
    case "xlinkHref":
      if (
        i == null ||
        typeof i == "function" ||
        typeof i == "boolean" ||
        typeof i == "symbol"
      ) {
        e.removeAttribute("xlink:href");
        break;
      }
      ((n = pl("" + i)),
        e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n));
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      i != null && typeof i != "function" && typeof i != "symbol"
        ? e.setAttribute(n, "" + i)
        : e.removeAttribute(n);
      break;
    case "inert":
    case "allowFullScreen":
    case "async":
    case "autoPlay":
    case "controls":
    case "default":
    case "defer":
    case "disabled":
    case "disablePictureInPicture":
    case "disableRemotePlayback":
    case "formNoValidate":
    case "hidden":
    case "loop":
    case "noModule":
    case "noValidate":
    case "open":
    case "playsInline":
    case "readOnly":
    case "required":
    case "reversed":
    case "scoped":
    case "seamless":
    case "itemScope":
      i && typeof i != "function" && typeof i != "symbol"
        ? e.setAttribute(n, "")
        : e.removeAttribute(n);
      break;
    case "capture":
    case "download":
      i === !0
        ? e.setAttribute(n, "")
        : i !== !1 &&
            i != null &&
            typeof i != "function" &&
            typeof i != "symbol"
          ? e.setAttribute(n, i)
          : e.removeAttribute(n);
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      i != null &&
      typeof i != "function" &&
      typeof i != "symbol" &&
      !isNaN(i) &&
      1 <= i
        ? e.setAttribute(n, i)
        : e.removeAttribute(n);
      break;
    case "rowSpan":
    case "start":
      i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i)
        ? e.removeAttribute(n)
        : e.setAttribute(n, i);
      break;
    case "popover":
      (P("beforetoggle", e), P("toggle", e), ml(e, "popover", i));
      break;
    case "xlinkActuate":
      Kt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", i);
      break;
    case "xlinkArcrole":
      Kt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", i);
      break;
    case "xlinkRole":
      Kt(e, "http://www.w3.org/1999/xlink", "xlink:role", i);
      break;
    case "xlinkShow":
      Kt(e, "http://www.w3.org/1999/xlink", "xlink:show", i);
      break;
    case "xlinkTitle":
      Kt(e, "http://www.w3.org/1999/xlink", "xlink:title", i);
      break;
    case "xlinkType":
      Kt(e, "http://www.w3.org/1999/xlink", "xlink:type", i);
      break;
    case "xmlBase":
      Kt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", i);
      break;
    case "xmlLang":
      Kt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", i);
      break;
    case "xmlSpace":
      Kt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", i);
      break;
    case "is":
      ml(e, "is", i);
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      (!(2 < n.length) ||
        (n[0] !== "o" && n[0] !== "O") ||
        (n[1] !== "n" && n[1] !== "N")) &&
        ((n = fx.get(n) || n), ml(e, n, i));
  }
}
function Uu(e, t, n, i, a, s) {
  switch (n) {
    case "style":
      kp(e, i, s);
      break;
    case "dangerouslySetInnerHTML":
      if (i != null) {
        if (typeof i != "object" || !("__html" in i)) throw Error(D(61));
        if (((n = i.__html), n != null)) {
          if (a.children != null) throw Error(D(60));
          e.innerHTML = n;
        }
      }
      break;
    case "children":
      typeof i == "string"
        ? aa(e, i)
        : (typeof i == "number" || typeof i == "bigint") && aa(e, "" + i);
      break;
    case "onScroll":
      i != null && P("scroll", e);
      break;
    case "onScrollEnd":
      i != null && P("scrollend", e);
      break;
    case "onClick":
      i != null && (e.onclick = nn);
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "innerHTML":
    case "ref":
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      if (!Hp.hasOwnProperty(n))
        e: {
          if (
            n[0] === "o" &&
            n[1] === "n" &&
            ((a = n.endsWith("Capture")),
            (t = n.slice(2, a ? n.length - 7 : void 0)),
            (s = e[tt] || null),
            (s = s != null ? s[n] : null),
            typeof s == "function" && e.removeEventListener(t, s, a),
            typeof i == "function")
          ) {
            (typeof s != "function" &&
              s !== null &&
              (n in e
                ? (e[n] = null)
                : e.hasAttribute(n) && e.removeAttribute(n)),
              e.addEventListener(t, i, a));
            break e;
          }
          n in e ? (e[n] = i) : i === !0 ? e.setAttribute(n, "") : ml(e, n, i);
        }
  }
}
function Ue(e, t, n) {
  switch (t) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "img":
      (P("error", e), P("load", e));
      var i = !1,
        a = !1,
        s;
      for (s in n)
        if (n.hasOwnProperty(s)) {
          var l = n[s];
          if (l != null)
            switch (s) {
              case "src":
                i = !0;
                break;
              case "srcSet":
                a = !0;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(D(137, t));
              default:
                ee(e, t, s, l, n, null);
            }
        }
      (a && ee(e, t, "srcSet", n.srcSet, n, null),
        i && ee(e, t, "src", n.src, n, null));
      return;
    case "input":
      P("invalid", e);
      var r = (s = l = a = null),
        o = null,
        u = null;
      for (i in n)
        if (n.hasOwnProperty(i)) {
          var c = n[i];
          if (c != null)
            switch (i) {
              case "name":
                a = c;
                break;
              case "type":
                l = c;
                break;
              case "checked":
                o = c;
                break;
              case "defaultChecked":
                u = c;
                break;
              case "value":
                s = c;
                break;
              case "defaultValue":
                r = c;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(D(137, t));
                break;
              default:
                ee(e, t, i, c, n, null);
            }
        }
      qp(e, s, r, o, u, l, a, !1);
      return;
    case "select":
      (P("invalid", e), (i = l = s = null));
      for (a in n)
        if (n.hasOwnProperty(a) && ((r = n[a]), r != null))
          switch (a) {
            case "value":
              s = r;
              break;
            case "defaultValue":
              l = r;
              break;
            case "multiple":
              i = r;
            default:
              ee(e, t, a, r, n, null);
          }
      ((t = s),
        (n = l),
        (e.multiple = !!i),
        t != null ? Zi(e, !!i, t, !1) : n != null && Zi(e, !!i, n, !0));
      return;
    case "textarea":
      (P("invalid", e), (s = a = i = null));
      for (l in n)
        if (n.hasOwnProperty(l) && ((r = n[l]), r != null))
          switch (l) {
            case "value":
              i = r;
              break;
            case "defaultValue":
              a = r;
              break;
            case "children":
              s = r;
              break;
            case "dangerouslySetInnerHTML":
              if (r != null) throw Error(D(91));
              break;
            default:
              ee(e, t, l, r, n, null);
          }
      Xp(e, i, a, s);
      return;
    case "option":
      for (o in n)
        if (n.hasOwnProperty(o) && ((i = n[o]), i != null))
          switch (o) {
            case "selected":
              e.selected = i && typeof i != "function" && typeof i != "symbol";
              break;
            default:
              ee(e, t, o, i, n, null);
          }
      return;
    case "dialog":
      (P("beforetoggle", e), P("toggle", e), P("cancel", e), P("close", e));
      break;
    case "iframe":
    case "object":
      P("load", e);
      break;
    case "video":
    case "audio":
      for (i = 0; i < vs.length; i++) P(vs[i], e);
      break;
    case "image":
      (P("error", e), P("load", e));
      break;
    case "details":
      P("toggle", e);
      break;
    case "embed":
    case "source":
    case "link":
      (P("error", e), P("load", e));
    case "area":
    case "base":
    case "br":
    case "col":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "track":
    case "wbr":
    case "menuitem":
      for (u in n)
        if (n.hasOwnProperty(u) && ((i = n[u]), i != null))
          switch (u) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(D(137, t));
            default:
              ee(e, t, u, i, n, null);
          }
      return;
    default:
      if (Dc(t)) {
        for (c in n)
          n.hasOwnProperty(c) &&
            ((i = n[c]), i !== void 0 && Uu(e, t, c, i, n, void 0));
        return;
      }
  }
  for (r in n)
    n.hasOwnProperty(r) && ((i = n[r]), i != null && ee(e, t, r, i, n, null));
}
function Hb(e, t, n, i) {
  switch (t) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "input":
      var a = null,
        s = null,
        l = null,
        r = null,
        o = null,
        u = null,
        c = null;
      for (d in n) {
        var f = n[d];
        if (n.hasOwnProperty(d) && f != null)
          switch (d) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              o = f;
            default:
              i.hasOwnProperty(d) || ee(e, t, d, null, i, f);
          }
      }
      for (var h in i) {
        var d = i[h];
        if (((f = n[h]), i.hasOwnProperty(h) && (d != null || f != null)))
          switch (h) {
            case "type":
              s = d;
              break;
            case "name":
              a = d;
              break;
            case "checked":
              u = d;
              break;
            case "defaultChecked":
              c = d;
              break;
            case "value":
              l = d;
              break;
            case "defaultValue":
              r = d;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (d != null) throw Error(D(137, t));
              break;
            default:
              d !== f && ee(e, t, h, d, i, f);
          }
      }
      cu(e, l, r, o, u, c, s, a);
      return;
    case "select":
      d = l = r = h = null;
      for (s in n)
        if (((o = n[s]), n.hasOwnProperty(s) && o != null))
          switch (s) {
            case "value":
              break;
            case "multiple":
              d = o;
            default:
              i.hasOwnProperty(s) || ee(e, t, s, null, i, o);
          }
      for (a in i)
        if (
          ((s = i[a]),
          (o = n[a]),
          i.hasOwnProperty(a) && (s != null || o != null))
        )
          switch (a) {
            case "value":
              h = s;
              break;
            case "defaultValue":
              r = s;
              break;
            case "multiple":
              l = s;
            default:
              s !== o && ee(e, t, a, s, i, o);
          }
      ((t = r),
        (n = l),
        (i = d),
        h != null
          ? Zi(e, !!n, h, !1)
          : !!i != !!n &&
            (t != null ? Zi(e, !!n, t, !0) : Zi(e, !!n, n ? [] : "", !1)));
      return;
    case "textarea":
      d = h = null;
      for (r in n)
        if (
          ((a = n[r]), n.hasOwnProperty(r) && a != null && !i.hasOwnProperty(r))
        )
          switch (r) {
            case "value":
              break;
            case "children":
              break;
            default:
              ee(e, t, r, null, i, a);
          }
      for (l in i)
        if (
          ((a = i[l]),
          (s = n[l]),
          i.hasOwnProperty(l) && (a != null || s != null))
        )
          switch (l) {
            case "value":
              h = a;
              break;
            case "defaultValue":
              d = a;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (a != null) throw Error(D(91));
              break;
            default:
              a !== s && ee(e, t, l, a, i, s);
          }
      Yp(e, h, d);
      return;
    case "option":
      for (var y in n)
        if (
          ((h = n[y]), n.hasOwnProperty(y) && h != null && !i.hasOwnProperty(y))
        )
          switch (y) {
            case "selected":
              e.selected = !1;
              break;
            default:
              ee(e, t, y, null, i, h);
          }
      for (o in i)
        if (
          ((h = i[o]),
          (d = n[o]),
          i.hasOwnProperty(o) && h !== d && (h != null || d != null))
        )
          switch (o) {
            case "selected":
              e.selected = h && typeof h != "function" && typeof h != "symbol";
              break;
            default:
              ee(e, t, o, h, i, d);
          }
      return;
    case "img":
    case "link":
    case "area":
    case "base":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
    case "menuitem":
      for (var x in n)
        ((h = n[x]),
          n.hasOwnProperty(x) &&
            h != null &&
            !i.hasOwnProperty(x) &&
            ee(e, t, x, null, i, h));
      for (u in i)
        if (
          ((h = i[u]),
          (d = n[u]),
          i.hasOwnProperty(u) && h !== d && (h != null || d != null))
        )
          switch (u) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (h != null) throw Error(D(137, t));
              break;
            default:
              ee(e, t, u, h, i, d);
          }
      return;
    default:
      if (Dc(t)) {
        for (var T in n)
          ((h = n[T]),
            n.hasOwnProperty(T) &&
              h !== void 0 &&
              !i.hasOwnProperty(T) &&
              Uu(e, t, T, void 0, i, h));
        for (c in i)
          ((h = i[c]),
            (d = n[c]),
            !i.hasOwnProperty(c) ||
              h === d ||
              (h === void 0 && d === void 0) ||
              Uu(e, t, c, h, i, d));
        return;
      }
  }
  for (var m in n)
    ((h = n[m]),
      n.hasOwnProperty(m) &&
        h != null &&
        !i.hasOwnProperty(m) &&
        ee(e, t, m, null, i, h));
  for (f in i)
    ((h = i[f]),
      (d = n[f]),
      !i.hasOwnProperty(f) ||
        h === d ||
        (h == null && d == null) ||
        ee(e, t, f, h, i, d));
}
function vh(e) {
  switch (e) {
    case "css":
    case "script":
    case "font":
    case "img":
    case "image":
    case "input":
    case "link":
      return !0;
    default:
      return !1;
  }
}
function Ub() {
  if (typeof performance.getEntriesByType == "function") {
    for (
      var e = 0, t = 0, n = performance.getEntriesByType("resource"), i = 0;
      i < n.length;
      i++
    ) {
      var a = n[i],
        s = a.transferSize,
        l = a.initiatorType,
        r = a.duration;
      if (s && r && vh(l)) {
        for (l = 0, r = a.responseEnd, i += 1; i < n.length; i++) {
          var o = n[i],
            u = o.startTime;
          if (u > r) break;
          var c = o.transferSize,
            f = o.initiatorType;
          c &&
            vh(f) &&
            ((o = o.responseEnd), (l += c * (o < r ? 1 : (r - u) / (o - u))));
        }
        if ((--i, (t += (8 * (s + l)) / (a.duration / 1e3)), e++, 10 < e))
          break;
      }
    }
    if (0 < e) return t / e / 1e6;
  }
  return navigator.connection &&
    ((e = navigator.connection.downlink), typeof e == "number")
    ? e
    : 5;
}
var Gu = null,
  qu = null;
function ir(e) {
  return e.nodeType === 9 ? e : e.ownerDocument;
}
function yh(e) {
  switch (e) {
    case "http://www.w3.org/2000/svg":
      return 1;
    case "http://www.w3.org/1998/Math/MathML":
      return 2;
    default:
      return 0;
  }
}
function Z0(e, t) {
  if (e === 0)
    switch (t) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
  return e === 1 && t === "foreignObject" ? 0 : e;
}
function Yu(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    typeof t.children == "bigint" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var No = null;
function Gb() {
  var e = window.event;
  return e && e.type === "popstate"
    ? e === No
      ? !1
      : ((No = e), !0)
    : ((No = null), !1);
}
var F0 = typeof setTimeout == "function" ? setTimeout : void 0,
  qb = typeof clearTimeout == "function" ? clearTimeout : void 0,
  xh = typeof Promise == "function" ? Promise : void 0,
  Yb =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof xh < "u"
        ? function (e) {
            return xh.resolve(null).then(e).catch(Xb);
          }
        : F0;
function Xb(e) {
  setTimeout(function () {
    throw e;
  });
}
function Fn(e) {
  return e === "head";
}
function bh(e, t) {
  var n = t,
    i = 0;
  do {
    var a = n.nextSibling;
    if ((e.removeChild(n), a && a.nodeType === 8))
      if (((n = a.data), n === "/$" || n === "/&")) {
        if (i === 0) {
          (e.removeChild(a), da(t));
          return;
        }
        i--;
      } else if (
        n === "$" ||
        n === "$?" ||
        n === "$~" ||
        n === "$!" ||
        n === "&"
      )
        i++;
      else if (n === "html") ts(e.ownerDocument.documentElement);
      else if (n === "head") {
        ((n = e.ownerDocument.head), ts(n));
        for (var s = n.firstChild; s; ) {
          var l = s.nextSibling,
            r = s.nodeName;
          (s[Vs] ||
            r === "SCRIPT" ||
            r === "STYLE" ||
            (r === "LINK" && s.rel.toLowerCase() === "stylesheet") ||
            n.removeChild(s),
            (s = l));
        }
      } else n === "body" && ts(e.ownerDocument.body);
    n = a;
  } while (n);
  da(t);
}
function Sh(e, t) {
  var n = e;
  e = 0;
  do {
    var i = n.nextSibling;
    if (
      (n.nodeType === 1
        ? t
          ? ((n._stashedDisplay = n.style.display), (n.style.display = "none"))
          : ((n.style.display = n._stashedDisplay || ""),
            n.getAttribute("style") === "" && n.removeAttribute("style"))
        : n.nodeType === 3 &&
          (t
            ? ((n._stashedText = n.nodeValue), (n.nodeValue = ""))
            : (n.nodeValue = n._stashedText || "")),
      i && i.nodeType === 8)
    )
      if (((n = i.data), n === "/$")) {
        if (e === 0) break;
        e--;
      } else (n !== "$" && n !== "$?" && n !== "$~" && n !== "$!") || e++;
    n = i;
  } while (n);
}
function Xu(e) {
  var t = e.firstChild;
  for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
    var n = t;
    switch (((t = t.nextSibling), n.nodeName)) {
      case "HTML":
      case "HEAD":
      case "BODY":
        (Xu(n), Oc(n));
        continue;
      case "SCRIPT":
      case "STYLE":
        continue;
      case "LINK":
        if (n.rel.toLowerCase() === "stylesheet") continue;
    }
    e.removeChild(n);
  }
}
function kb(e, t, n, i) {
  for (; e.nodeType === 1; ) {
    var a = n;
    if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
      if (!i && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
    } else if (i) {
      if (!e[Vs])
        switch (t) {
          case "meta":
            if (!e.hasAttribute("itemprop")) break;
            return e;
          case "link":
            if (
              ((s = e.getAttribute("rel")),
              s === "stylesheet" && e.hasAttribute("data-precedence"))
            )
              break;
            if (
              s !== a.rel ||
              e.getAttribute("href") !==
                (a.href == null || a.href === "" ? null : a.href) ||
              e.getAttribute("crossorigin") !==
                (a.crossOrigin == null ? null : a.crossOrigin) ||
              e.getAttribute("title") !== (a.title == null ? null : a.title)
            )
              break;
            return e;
          case "style":
            if (e.hasAttribute("data-precedence")) break;
            return e;
          case "script":
            if (
              ((s = e.getAttribute("src")),
              (s !== (a.src == null ? null : a.src) ||
                e.getAttribute("type") !== (a.type == null ? null : a.type) ||
                e.getAttribute("crossorigin") !==
                  (a.crossOrigin == null ? null : a.crossOrigin)) &&
                s &&
                e.hasAttribute("async") &&
                !e.hasAttribute("itemprop"))
            )
              break;
            return e;
          default:
            return e;
        }
    } else if (t === "input" && e.type === "hidden") {
      var s = a.name == null ? null : "" + a.name;
      if (a.type === "hidden" && e.getAttribute("name") === s) return e;
    } else return e;
    if (((e = jt(e.nextSibling)), e === null)) break;
  }
  return null;
}
function Pb(e, t, n) {
  if (t === "") return null;
  for (; e.nodeType !== 3; )
    if (
      ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
        !n) ||
      ((e = jt(e.nextSibling)), e === null)
    )
      return null;
  return e;
}
function $0(e, t) {
  for (; e.nodeType !== 8; )
    if (
      ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
        !t) ||
      ((e = jt(e.nextSibling)), e === null)
    )
      return null;
  return e;
}
function ku(e) {
  return e.data === "$?" || e.data === "$~";
}
function Pu(e) {
  return (
    e.data === "$!" ||
    (e.data === "$?" && e.ownerDocument.readyState !== "loading")
  );
}
function Qb(e, t) {
  var n = e.ownerDocument;
  if (e.data === "$~") e._reactRetry = t;
  else if (e.data !== "$?" || n.readyState !== "loading") t();
  else {
    var i = function () {
      (t(), n.removeEventListener("DOMContentLoaded", i));
    };
    (n.addEventListener("DOMContentLoaded", i), (e._reactRetry = i));
  }
}
function jt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (
        ((t = e.data),
        t === "$" ||
          t === "$!" ||
          t === "$?" ||
          t === "$~" ||
          t === "&" ||
          t === "F!" ||
          t === "F")
      )
        break;
      if (t === "/$" || t === "/&") return null;
    }
  }
  return e;
}
var Qu = null;
function Th(e) {
  e = e.nextSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "/$" || n === "/&") {
        if (t === 0) return jt(e.nextSibling);
        t--;
      } else
        (n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&") ||
          t++;
    }
    e = e.nextSibling;
  }
  return null;
}
function wh(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
        if (t === 0) return e;
        t--;
      } else (n !== "/$" && n !== "/&") || t++;
    }
    e = e.previousSibling;
  }
  return null;
}
function I0(e, t, n) {
  switch (((t = ir(n)), e)) {
    case "html":
      if (((e = t.documentElement), !e)) throw Error(D(452));
      return e;
    case "head":
      if (((e = t.head), !e)) throw Error(D(453));
      return e;
    case "body":
      if (((e = t.body), !e)) throw Error(D(454));
      return e;
    default:
      throw Error(D(451));
  }
}
function ts(e) {
  for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
  Oc(e);
}
var Ot = new Map(),
  Eh = new Set();
function ar(e) {
  return typeof e.getRootNode == "function"
    ? e.getRootNode()
    : e.nodeType === 9
      ? e
      : e.ownerDocument;
}
var pn = $.d;
$.d = { f: Kb, r: Zb, D: Fb, C: $b, L: Ib, m: Jb, X: e2, S: Wb, M: t2 };
function Kb() {
  var e = pn.f(),
    t = Rr();
  return e || t;
}
function Zb(e) {
  var t = ya(e);
  t !== null && t.tag === 5 && t.type === "form" ? kg(t) : pn.r(e);
}
var Ta = typeof document > "u" ? null : document;
function J0(e, t, n) {
  var i = Ta;
  if (i && typeof t == "string" && t) {
    var a = wt(t);
    ((a = 'link[rel="' + e + '"][href="' + a + '"]'),
      typeof n == "string" && (a += '[crossorigin="' + n + '"]'),
      Eh.has(a) ||
        (Eh.add(a),
        (e = { rel: e, crossOrigin: n, href: t }),
        i.querySelector(a) === null &&
          ((t = i.createElement("link")),
          Ue(t, "link", e),
          De(t),
          i.head.appendChild(t))));
  }
}
function Fb(e) {
  (pn.D(e), J0("dns-prefetch", e, null));
}
function $b(e, t) {
  (pn.C(e, t), J0("preconnect", e, t));
}
function Ib(e, t, n) {
  pn.L(e, t, n);
  var i = Ta;
  if (i && e && t) {
    var a = 'link[rel="preload"][as="' + wt(t) + '"]';
    t === "image" && n && n.imageSrcSet
      ? ((a += '[imagesrcset="' + wt(n.imageSrcSet) + '"]'),
        typeof n.imageSizes == "string" &&
          (a += '[imagesizes="' + wt(n.imageSizes) + '"]'))
      : (a += '[href="' + wt(e) + '"]');
    var s = a;
    switch (t) {
      case "style":
        s = fa(e);
        break;
      case "script":
        s = wa(e);
    }
    Ot.has(s) ||
      ((e = oe(
        {
          rel: "preload",
          href: t === "image" && n && n.imageSrcSet ? void 0 : e,
          as: t,
        },
        n,
      )),
      Ot.set(s, e),
      i.querySelector(a) !== null ||
        (t === "style" && i.querySelector(Gs(s))) ||
        (t === "script" && i.querySelector(qs(s))) ||
        ((t = i.createElement("link")),
        Ue(t, "link", e),
        De(t),
        i.head.appendChild(t)));
  }
}
function Jb(e, t) {
  pn.m(e, t);
  var n = Ta;
  if (n && e) {
    var i = t && typeof t.as == "string" ? t.as : "script",
      a = 'link[rel="modulepreload"][as="' + wt(i) + '"][href="' + wt(e) + '"]',
      s = a;
    switch (i) {
      case "audioworklet":
      case "paintworklet":
      case "serviceworker":
      case "sharedworker":
      case "worker":
      case "script":
        s = wa(e);
    }
    if (
      !Ot.has(s) &&
      ((e = oe({ rel: "modulepreload", href: e }, t)),
      Ot.set(s, e),
      n.querySelector(a) === null)
    ) {
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          if (n.querySelector(qs(s))) return;
      }
      ((i = n.createElement("link")),
        Ue(i, "link", e),
        De(i),
        n.head.appendChild(i));
    }
  }
}
function Wb(e, t, n) {
  pn.S(e, t, n);
  var i = Ta;
  if (i && e) {
    var a = Ki(i).hoistableStyles,
      s = fa(e);
    t = t || "default";
    var l = a.get(s);
    if (!l) {
      var r = { loading: 0, preload: null };
      if ((l = i.querySelector(Gs(s)))) r.loading = 5;
      else {
        ((e = oe({ rel: "stylesheet", href: e, "data-precedence": t }, n)),
          (n = Ot.get(s)) && gf(e, n));
        var o = (l = i.createElement("link"));
        (De(o),
          Ue(o, "link", e),
          (o._p = new Promise(function (u, c) {
            ((o.onload = u), (o.onerror = c));
          })),
          o.addEventListener("load", function () {
            r.loading |= 1;
          }),
          o.addEventListener("error", function () {
            r.loading |= 2;
          }),
          (r.loading |= 4),
          Ml(l, t, i));
      }
      ((l = { type: "stylesheet", instance: l, count: 1, state: r }),
        a.set(s, l));
    }
  }
}
function e2(e, t) {
  pn.X(e, t);
  var n = Ta;
  if (n && e) {
    var i = Ki(n).hoistableScripts,
      a = wa(e),
      s = i.get(a);
    s ||
      ((s = n.querySelector(qs(a))),
      s ||
        ((e = oe({ src: e, async: !0 }, t)),
        (t = Ot.get(a)) && vf(e, t),
        (s = n.createElement("script")),
        De(s),
        Ue(s, "link", e),
        n.head.appendChild(s)),
      (s = { type: "script", instance: s, count: 1, state: null }),
      i.set(a, s));
  }
}
function t2(e, t) {
  pn.M(e, t);
  var n = Ta;
  if (n && e) {
    var i = Ki(n).hoistableScripts,
      a = wa(e),
      s = i.get(a);
    s ||
      ((s = n.querySelector(qs(a))),
      s ||
        ((e = oe({ src: e, async: !0, type: "module" }, t)),
        (t = Ot.get(a)) && vf(e, t),
        (s = n.createElement("script")),
        De(s),
        Ue(s, "link", e),
        n.head.appendChild(s)),
      (s = { type: "script", instance: s, count: 1, state: null }),
      i.set(a, s));
  }
}
function Mh(e, t, n, i) {
  var a = (a = Ln.current) ? ar(a) : null;
  if (!a) throw Error(D(446));
  switch (e) {
    case "meta":
    case "title":
      return null;
    case "style":
      return typeof n.precedence == "string" && typeof n.href == "string"
        ? ((t = fa(n.href)),
          (n = Ki(a).hoistableStyles),
          (i = n.get(t)),
          i ||
            ((i = { type: "style", instance: null, count: 0, state: null }),
            n.set(t, i)),
          i)
        : { type: "void", instance: null, count: 0, state: null };
    case "link":
      if (
        n.rel === "stylesheet" &&
        typeof n.href == "string" &&
        typeof n.precedence == "string"
      ) {
        e = fa(n.href);
        var s = Ki(a).hoistableStyles,
          l = s.get(e);
        if (
          (l ||
            ((a = a.ownerDocument || a),
            (l = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: { loading: 0, preload: null },
            }),
            s.set(e, l),
            (s = a.querySelector(Gs(e))) &&
              !s._p &&
              ((l.instance = s), (l.state.loading = 5)),
            Ot.has(e) ||
              ((n = {
                rel: "preload",
                as: "style",
                href: n.href,
                crossOrigin: n.crossOrigin,
                integrity: n.integrity,
                media: n.media,
                hrefLang: n.hrefLang,
                referrerPolicy: n.referrerPolicy,
              }),
              Ot.set(e, n),
              s || n2(a, e, n, l.state))),
          t && i === null)
        )
          throw Error(D(528, ""));
        return l;
      }
      if (t && i !== null) throw Error(D(529, ""));
      return null;
    case "script":
      return (
        (t = n.async),
        (n = n.src),
        typeof n == "string" &&
        t &&
        typeof t != "function" &&
        typeof t != "symbol"
          ? ((t = wa(n)),
            (n = Ki(a).hoistableScripts),
            (i = n.get(t)),
            i ||
              ((i = { type: "script", instance: null, count: 0, state: null }),
              n.set(t, i)),
            i)
          : { type: "void", instance: null, count: 0, state: null }
      );
    default:
      throw Error(D(444, e));
  }
}
function fa(e) {
  return 'href="' + wt(e) + '"';
}
function Gs(e) {
  return 'link[rel="stylesheet"][' + e + "]";
}
function W0(e) {
  return oe({}, e, { "data-precedence": e.precedence, precedence: null });
}
function n2(e, t, n, i) {
  e.querySelector('link[rel="preload"][as="style"][' + t + "]")
    ? (i.loading = 1)
    : ((t = e.createElement("link")),
      (i.preload = t),
      t.addEventListener("load", function () {
        return (i.loading |= 1);
      }),
      t.addEventListener("error", function () {
        return (i.loading |= 2);
      }),
      Ue(t, "link", n),
      De(t),
      e.head.appendChild(t));
}
function wa(e) {
  return '[src="' + wt(e) + '"]';
}
function qs(e) {
  return "script[async]" + e;
}
function Ah(e, t, n) {
  if ((t.count++, t.instance === null))
    switch (t.type) {
      case "style":
        var i = e.querySelector('style[data-href~="' + wt(n.href) + '"]');
        if (i) return ((t.instance = i), De(i), i);
        var a = oe({}, n, {
          "data-href": n.href,
          "data-precedence": n.precedence,
          href: null,
          precedence: null,
        });
        return (
          (i = (e.ownerDocument || e).createElement("style")),
          De(i),
          Ue(i, "style", a),
          Ml(i, n.precedence, e),
          (t.instance = i)
        );
      case "stylesheet":
        a = fa(n.href);
        var s = e.querySelector(Gs(a));
        if (s) return ((t.state.loading |= 4), (t.instance = s), De(s), s);
        ((i = W0(n)),
          (a = Ot.get(a)) && gf(i, a),
          (s = (e.ownerDocument || e).createElement("link")),
          De(s));
        var l = s;
        return (
          (l._p = new Promise(function (r, o) {
            ((l.onload = r), (l.onerror = o));
          })),
          Ue(s, "link", i),
          (t.state.loading |= 4),
          Ml(s, n.precedence, e),
          (t.instance = s)
        );
      case "script":
        return (
          (s = wa(n.src)),
          (a = e.querySelector(qs(s)))
            ? ((t.instance = a), De(a), a)
            : ((i = n),
              (a = Ot.get(s)) && ((i = oe({}, n)), vf(i, a)),
              (e = e.ownerDocument || e),
              (a = e.createElement("script")),
              De(a),
              Ue(a, "link", i),
              e.head.appendChild(a),
              (t.instance = a))
        );
      case "void":
        return null;
      default:
        throw Error(D(443, t.type));
    }
  else
    t.type === "stylesheet" &&
      !(t.state.loading & 4) &&
      ((i = t.instance), (t.state.loading |= 4), Ml(i, n.precedence, e));
  return t.instance;
}
function Ml(e, t, n) {
  for (
    var i = n.querySelectorAll(
        'link[rel="stylesheet"][data-precedence],style[data-precedence]',
      ),
      a = i.length ? i[i.length - 1] : null,
      s = a,
      l = 0;
    l < i.length;
    l++
  ) {
    var r = i[l];
    if (r.dataset.precedence === t) s = r;
    else if (s !== a) break;
  }
  s
    ? s.parentNode.insertBefore(e, s.nextSibling)
    : ((t = n.nodeType === 9 ? n.head : n), t.insertBefore(e, t.firstChild));
}
function gf(e, t) {
  (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
    e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
    e.title == null && (e.title = t.title));
}
function vf(e, t) {
  (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
    e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
    e.integrity == null && (e.integrity = t.integrity));
}
var Al = null;
function Ch(e, t, n) {
  if (Al === null) {
    var i = new Map(),
      a = (Al = new Map());
    a.set(n, i);
  } else ((a = Al), (i = a.get(n)), i || ((i = new Map()), a.set(n, i)));
  if (i.has(e)) return i;
  for (
    i.set(e, null), n = n.getElementsByTagName(e), a = 0;
    a < n.length;
    a++
  ) {
    var s = n[a];
    if (
      !(
        s[Vs] ||
        s[Re] ||
        (e === "link" && s.getAttribute("rel") === "stylesheet")
      ) &&
      s.namespaceURI !== "http://www.w3.org/2000/svg"
    ) {
      var l = s.getAttribute(t) || "";
      l = e + l;
      var r = i.get(l);
      r ? r.push(s) : i.set(l, [s]);
    }
  }
  return i;
}
function jh(e, t, n) {
  ((e = e.ownerDocument || e),
    e.head.insertBefore(
      n,
      t === "title" ? e.querySelector("head > title") : null,
    ));
}
function i2(e, t, n) {
  if (n === 1 || t.itemProp != null) return !1;
  switch (e) {
    case "meta":
    case "title":
      return !0;
    case "style":
      if (
        typeof t.precedence != "string" ||
        typeof t.href != "string" ||
        t.href === ""
      )
        break;
      return !0;
    case "link":
      if (
        typeof t.rel != "string" ||
        typeof t.href != "string" ||
        t.href === "" ||
        t.onLoad ||
        t.onError
      )
        break;
      switch (t.rel) {
        case "stylesheet":
          return (
            (e = t.disabled),
            typeof t.precedence == "string" && e == null
          );
        default:
          return !0;
      }
    case "script":
      if (
        t.async &&
        typeof t.async != "function" &&
        typeof t.async != "symbol" &&
        !t.onLoad &&
        !t.onError &&
        t.src &&
        typeof t.src == "string"
      )
        return !0;
  }
  return !1;
}
function ev(e) {
  return !(e.type === "stylesheet" && !(e.state.loading & 3));
}
function a2(e, t, n, i) {
  if (
    n.type === "stylesheet" &&
    (typeof i.media != "string" || matchMedia(i.media).matches !== !1) &&
    !(n.state.loading & 4)
  ) {
    if (n.instance === null) {
      var a = fa(i.href),
        s = t.querySelector(Gs(a));
      if (s) {
        ((t = s._p),
          t !== null &&
            typeof t == "object" &&
            typeof t.then == "function" &&
            (e.count++, (e = sr.bind(e)), t.then(e, e)),
          (n.state.loading |= 4),
          (n.instance = s),
          De(s));
        return;
      }
      ((s = t.ownerDocument || t),
        (i = W0(i)),
        (a = Ot.get(a)) && gf(i, a),
        (s = s.createElement("link")),
        De(s));
      var l = s;
      ((l._p = new Promise(function (r, o) {
        ((l.onload = r), (l.onerror = o));
      })),
        Ue(s, "link", i),
        (n.instance = s));
    }
    (e.stylesheets === null && (e.stylesheets = new Map()),
      e.stylesheets.set(n, t),
      (t = n.state.preload) &&
        !(n.state.loading & 3) &&
        (e.count++,
        (n = sr.bind(e)),
        t.addEventListener("load", n),
        t.addEventListener("error", n)));
  }
}
var Oo = 0;
function s2(e, t) {
  return (
    e.stylesheets && e.count === 0 && Cl(e, e.stylesheets),
    0 < e.count || 0 < e.imgCount
      ? function (n) {
          var i = setTimeout(function () {
            if ((e.stylesheets && Cl(e, e.stylesheets), e.unsuspend)) {
              var s = e.unsuspend;
              ((e.unsuspend = null), s());
            }
          }, 6e4 + t);
          0 < e.imgBytes && Oo === 0 && (Oo = 62500 * Ub());
          var a = setTimeout(
            function () {
              if (
                ((e.waitingForImages = !1),
                e.count === 0 &&
                  (e.stylesheets && Cl(e, e.stylesheets), e.unsuspend))
              ) {
                var s = e.unsuspend;
                ((e.unsuspend = null), s());
              }
            },
            (e.imgBytes > Oo ? 50 : 800) + t,
          );
          return (
            (e.unsuspend = n),
            function () {
              ((e.unsuspend = null), clearTimeout(i), clearTimeout(a));
            }
          );
        }
      : null
  );
}
function sr() {
  if (
    (this.count--,
    this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
  ) {
    if (this.stylesheets) Cl(this, this.stylesheets);
    else if (this.unsuspend) {
      var e = this.unsuspend;
      ((this.unsuspend = null), e());
    }
  }
}
var lr = null;
function Cl(e, t) {
  ((e.stylesheets = null),
    e.unsuspend !== null &&
      (e.count++, (lr = new Map()), t.forEach(l2, e), (lr = null), sr.call(e)));
}
function l2(e, t) {
  if (!(t.state.loading & 4)) {
    var n = lr.get(e);
    if (n) var i = n.get(null);
    else {
      ((n = new Map()), lr.set(e, n));
      for (
        var a = e.querySelectorAll(
            "link[data-precedence],style[data-precedence]",
          ),
          s = 0;
        s < a.length;
        s++
      ) {
        var l = a[s];
        (l.nodeName === "LINK" || l.getAttribute("media") !== "not all") &&
          (n.set(l.dataset.precedence, l), (i = l));
      }
      i && n.set(null, i);
    }
    ((a = t.instance),
      (l = a.getAttribute("data-precedence")),
      (s = n.get(l) || i),
      s === i && n.set(null, a),
      n.set(l, a),
      this.count++,
      (i = sr.bind(this)),
      a.addEventListener("load", i),
      a.addEventListener("error", i),
      s
        ? s.parentNode.insertBefore(a, s.nextSibling)
        : ((e = e.nodeType === 9 ? e.head : e),
          e.insertBefore(a, e.firstChild)),
      (t.state.loading |= 4));
  }
}
var xs = {
  $$typeof: tn,
  Provider: null,
  Consumer: null,
  _currentValue: li,
  _currentValue2: li,
  _threadCount: 0,
};
function r2(e, t, n, i, a, s, l, r, o) {
  ((this.tag = 1),
    (this.containerInfo = e),
    (this.pingCache = this.current = this.pendingChildren = null),
    (this.timeoutHandle = -1),
    (this.callbackNode =
      this.next =
      this.pendingContext =
      this.context =
      this.cancelPendingCommit =
        null),
    (this.callbackPriority = 0),
    (this.expirationTimes = Jr(-1)),
    (this.entangledLanes =
      this.shellSuspendCounter =
      this.errorRecoveryDisabledLanes =
      this.expiredLanes =
      this.warmLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Jr(0)),
    (this.hiddenUpdates = Jr(null)),
    (this.identifierPrefix = i),
    (this.onUncaughtError = a),
    (this.onCaughtError = s),
    (this.onRecoverableError = l),
    (this.pooledCache = null),
    (this.pooledCacheLanes = 0),
    (this.formState = o),
    (this.incompleteTransitions = new Map()));
}
function tv(e, t, n, i, a, s, l, r, o, u, c, f) {
  return (
    (e = new r2(e, t, n, l, o, u, c, f, r)),
    (t = 1),
    s === !0 && (t |= 24),
    (s = ot(3, null, null, t)),
    (e.current = s),
    (s.stateNode = e),
    (t = Yc()),
    t.refCount++,
    (e.pooledCache = t),
    t.refCount++,
    (s.memoizedState = { element: i, isDehydrated: n, cache: t }),
    Pc(s),
    e
  );
}
function nv(e) {
  return e ? ((e = Hi), e) : Hi;
}
function iv(e, t, n, i, a, s) {
  ((a = nv(a)),
    i.context === null ? (i.context = a) : (i.pendingContext = a),
    (i = _n(t)),
    (i.payload = { element: n }),
    (s = s === void 0 ? null : s),
    s !== null && (i.callback = s),
    (n = Rn(e, i, t)),
    n !== null && (et(n, e, t), Ka(n, e, t)));
}
function Nh(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function yf(e, t) {
  (Nh(e, t), (e = e.alternate) && Nh(e, t));
}
function av(e) {
  if (e.tag === 13 || e.tag === 31) {
    var t = wi(e, 67108864);
    (t !== null && et(t, e, 67108864), yf(e, 67108864));
  }
}
function Oh(e) {
  if (e.tag === 13 || e.tag === 31) {
    var t = ht();
    t = jc(t);
    var n = wi(e, t);
    (n !== null && et(n, e, t), yf(e, t));
  }
}
var rr = !0;
function o2(e, t, n, i) {
  var a = q.T;
  q.T = null;
  var s = $.p;
  try {
    (($.p = 2), xf(e, t, n, i));
  } finally {
    (($.p = s), (q.T = a));
  }
}
function u2(e, t, n, i) {
  var a = q.T;
  q.T = null;
  var s = $.p;
  try {
    (($.p = 8), xf(e, t, n, i));
  } finally {
    (($.p = s), (q.T = a));
  }
}
function xf(e, t, n, i) {
  if (rr) {
    var a = Ku(i);
    if (a === null) (jo(e, t, i, or, n), Dh(e, i));
    else if (f2(a, e, t, n, i)) i.stopPropagation();
    else if ((Dh(e, i), t & 4 && -1 < c2.indexOf(e))) {
      for (; a !== null; ) {
        var s = ya(a);
        if (s !== null)
          switch (s.tag) {
            case 3:
              if (((s = s.stateNode), s.current.memoizedState.isDehydrated)) {
                var l = ei(s.pendingLanes);
                if (l !== 0) {
                  var r = s;
                  for (r.pendingLanes |= 2, r.entangledLanes |= 2; l; ) {
                    var o = 1 << (31 - dt(l));
                    ((r.entanglements[1] |= o), (l &= ~o));
                  }
                  (Pt(s), !(F & 6) && ((Il = ct() + 500), Us(0)));
                }
              }
              break;
            case 31:
            case 13:
              ((r = wi(s, 2)), r !== null && et(r, s, 2), Rr(), yf(s, 2));
          }
        if (((s = Ku(i)), s === null && jo(e, t, i, or, n), s === a)) break;
        a = s;
      }
      a !== null && i.stopPropagation();
    } else jo(e, t, i, null, n);
  }
}
function Ku(e) {
  return ((e = zc(e)), bf(e));
}
var or = null;
function bf(e) {
  if (((or = null), (e = zi(e)), e !== null)) {
    var t = Os(e);
    if (t === null) e = null;
    else {
      var n = t.tag;
      if (n === 13) {
        if (((e = Ep(t)), e !== null)) return e;
        e = null;
      } else if (n === 31) {
        if (((e = Mp(t)), e !== null)) return e;
        e = null;
      } else if (n === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
    }
  }
  return ((or = e), null);
}
function sv(e) {
  switch (e) {
    case "beforetoggle":
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "toggle":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 2;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 8;
    case "message":
      switch (F1()) {
        case Np:
          return 2;
        case Op:
          return 8;
        case Bl:
        case $1:
          return 32;
        case Dp:
          return 268435456;
        default:
          return 32;
      }
    default:
      return 32;
  }
}
var Zu = !1,
  Un = null,
  Gn = null,
  qn = null,
  bs = new Map(),
  Ss = new Map(),
  An = [],
  c2 =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
      " ",
    );
function Dh(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Un = null;
      break;
    case "dragenter":
    case "dragleave":
      Gn = null;
      break;
    case "mouseover":
    case "mouseout":
      qn = null;
      break;
    case "pointerover":
    case "pointerout":
      bs.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Ss.delete(t.pointerId);
  }
}
function La(e, t, n, i, a, s) {
  return e === null || e.nativeEvent !== s
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: i,
        nativeEvent: s,
        targetContainers: [a],
      }),
      t !== null && ((t = ya(t)), t !== null && av(t)),
      e)
    : ((e.eventSystemFlags |= i),
      (t = e.targetContainers),
      a !== null && t.indexOf(a) === -1 && t.push(a),
      e);
}
function f2(e, t, n, i, a) {
  switch (t) {
    case "focusin":
      return ((Un = La(Un, e, t, n, i, a)), !0);
    case "dragenter":
      return ((Gn = La(Gn, e, t, n, i, a)), !0);
    case "mouseover":
      return ((qn = La(qn, e, t, n, i, a)), !0);
    case "pointerover":
      var s = a.pointerId;
      return (bs.set(s, La(bs.get(s) || null, e, t, n, i, a)), !0);
    case "gotpointercapture":
      return (
        (s = a.pointerId),
        Ss.set(s, La(Ss.get(s) || null, e, t, n, i, a)),
        !0
      );
  }
  return !1;
}
function lv(e) {
  var t = zi(e.target);
  if (t !== null) {
    var n = Os(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Ep(n)), t !== null)) {
          ((e.blockedOn = t),
            pd(e.priority, function () {
              Oh(n);
            }));
          return;
        }
      } else if (t === 31) {
        if (((t = Mp(n)), t !== null)) {
          ((e.blockedOn = t),
            pd(e.priority, function () {
              Oh(n);
            }));
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function jl(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Ku(e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var i = new n.constructor(n.type, n);
      ((du = i), n.target.dispatchEvent(i), (du = null));
    } else return ((t = ya(n)), t !== null && av(t), (e.blockedOn = n), !1);
    t.shift();
  }
  return !0;
}
function zh(e, t, n) {
  jl(e) && n.delete(t);
}
function d2() {
  ((Zu = !1),
    Un !== null && jl(Un) && (Un = null),
    Gn !== null && jl(Gn) && (Gn = null),
    qn !== null && jl(qn) && (qn = null),
    bs.forEach(zh),
    Ss.forEach(zh));
}
function sl(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Zu ||
      ((Zu = !0),
      je.unstable_scheduleCallback(je.unstable_NormalPriority, d2)));
}
var ll = null;
function Lh(e) {
  ll !== e &&
    ((ll = e),
    je.unstable_scheduleCallback(je.unstable_NormalPriority, function () {
      ll === e && (ll = null);
      for (var t = 0; t < e.length; t += 3) {
        var n = e[t],
          i = e[t + 1],
          a = e[t + 2];
        if (typeof i != "function") {
          if (bf(i || n) === null) continue;
          break;
        }
        var s = ya(n);
        s !== null &&
          (e.splice(t, 3),
          (t -= 3),
          ju(s, { pending: !0, data: a, method: n.method, action: i }, i, a));
      }
    }));
}
function da(e) {
  function t(o) {
    return sl(o, e);
  }
  (Un !== null && sl(Un, e),
    Gn !== null && sl(Gn, e),
    qn !== null && sl(qn, e),
    bs.forEach(t),
    Ss.forEach(t));
  for (var n = 0; n < An.length; n++) {
    var i = An[n];
    i.blockedOn === e && (i.blockedOn = null);
  }
  for (; 0 < An.length && ((n = An[0]), n.blockedOn === null); )
    (lv(n), n.blockedOn === null && An.shift());
  if (((n = (e.ownerDocument || e).$$reactFormReplay), n != null))
    for (i = 0; i < n.length; i += 3) {
      var a = n[i],
        s = n[i + 1],
        l = a[tt] || null;
      if (typeof s == "function") l || Lh(n);
      else if (l) {
        var r = null;
        if (s && s.hasAttribute("formAction")) {
          if (((a = s), (l = s[tt] || null))) r = l.formAction;
          else if (bf(a) !== null) continue;
        } else r = l.action;
        (typeof r == "function" ? (n[i + 1] = r) : (n.splice(i, 3), (i -= 3)),
          Lh(n));
      }
    }
}
function rv() {
  function e(s) {
    s.canIntercept &&
      s.info === "react-transition" &&
      s.intercept({
        handler: function () {
          return new Promise(function (l) {
            return (a = l);
          });
        },
        focusReset: "manual",
        scroll: "manual",
      });
  }
  function t() {
    (a !== null && (a(), (a = null)), i || setTimeout(n, 20));
  }
  function n() {
    if (!i && !navigation.transition) {
      var s = navigation.currentEntry;
      s &&
        s.url != null &&
        navigation.navigate(s.url, {
          state: s.getState(),
          info: "react-transition",
          history: "replace",
        });
    }
  }
  if (typeof navigation == "object") {
    var i = !1,
      a = null;
    return (
      navigation.addEventListener("navigate", e),
      navigation.addEventListener("navigatesuccess", t),
      navigation.addEventListener("navigateerror", t),
      setTimeout(n, 100),
      function () {
        ((i = !0),
          navigation.removeEventListener("navigate", e),
          navigation.removeEventListener("navigatesuccess", t),
          navigation.removeEventListener("navigateerror", t),
          a !== null && (a(), (a = null)));
      }
    );
  }
}
function Sf(e) {
  this._internalRoot = e;
}
Ur.prototype.render = Sf.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(D(409));
  var n = t.current,
    i = ht();
  iv(n, i, e, t, null, null);
};
Ur.prototype.unmount = Sf.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (iv(e.current, 2, null, e, null, null), Rr(), (t[va] = null));
  }
};
function Ur(e) {
  this._internalRoot = e;
}
Ur.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Rp();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < An.length && t !== 0 && t < An[n].priority; n++);
    (An.splice(n, 0, e), n === 0 && lv(e));
  }
};
var Vh = Tp.version;
if (Vh !== "19.2.0") throw Error(D(527, Vh, "19.2.0"));
$.findDOMNode = function (e) {
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(D(188))
      : ((e = Object.keys(e).join(",")), Error(D(268, e)));
  return (
    (e = Y1(t)),
    (e = e !== null ? Ap(e) : null),
    (e = e === null ? null : e.stateNode),
    e
  );
};
var h2 = {
  bundleType: 0,
  version: "19.2.0",
  rendererPackageName: "react-dom",
  currentDispatcherRef: q,
  reconcilerVersion: "19.2.0",
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var rl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!rl.isDisabled && rl.supportsFiber)
    try {
      ((Ds = rl.inject(h2)), (ft = rl));
    } catch {}
}
Tr.createRoot = function (e, t) {
  if (!wp(e)) throw Error(D(299));
  var n = !1,
    i = "",
    a = Jg,
    s = Wg,
    l = e0;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (i = t.identifierPrefix),
      t.onUncaughtError !== void 0 && (a = t.onUncaughtError),
      t.onCaughtError !== void 0 && (s = t.onCaughtError),
      t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    (t = tv(e, 1, !1, null, null, n, i, null, a, s, l, rv)),
    (e[va] = t.current),
    pf(e),
    new Sf(t)
  );
};
Tr.hydrateRoot = function (e, t, n) {
  if (!wp(e)) throw Error(D(299));
  var i = !1,
    a = "",
    s = Jg,
    l = Wg,
    r = e0,
    o = null;
  return (
    n != null &&
      (n.unstable_strictMode === !0 && (i = !0),
      n.identifierPrefix !== void 0 && (a = n.identifierPrefix),
      n.onUncaughtError !== void 0 && (s = n.onUncaughtError),
      n.onCaughtError !== void 0 && (l = n.onCaughtError),
      n.onRecoverableError !== void 0 && (r = n.onRecoverableError),
      n.formState !== void 0 && (o = n.formState)),
    (t = tv(e, 1, !0, t, n ?? null, i, a, o, s, l, r, rv)),
    (t.context = nv(null)),
    (n = t.current),
    (i = ht()),
    (i = jc(i)),
    (a = _n(i)),
    (a.callback = null),
    Rn(n, a, i),
    (n = i),
    (t.current.lanes = n),
    Ls(t, n),
    Pt(t),
    (e[va] = t.current),
    pf(e),
    new Ur(t)
  );
};
Tr.version = "19.2.0";
function ov() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ov);
    } catch (e) {
      console.error(e);
    }
}
(ov(), (gp.exports = Tr));
var m2 = gp.exports,
  uv = { exports: {} };
(function (e, t) {
  (function (n, i) {
    e.exports = i();
  })(v1, function () {
    return (function (n) {
      function i(s) {
        if (a[s]) return a[s].exports;
        var l = (a[s] = { exports: {}, id: s, loaded: !1 });
        return (
          n[s].call(l.exports, l, l.exports, i),
          (l.loaded = !0),
          l.exports
        );
      }
      var a = {};
      return ((i.m = n), (i.c = a), (i.p = "dist/"), i(0));
    })([
      function (n, i, a) {
        function s(R) {
          return R && R.__esModule ? R : { default: R };
        }
        var l =
            Object.assign ||
            function (R) {
              for (var Y = 1; Y < arguments.length; Y++) {
                var V = arguments[Y];
                for (var z in V)
                  Object.prototype.hasOwnProperty.call(V, z) && (R[z] = V[z]);
              }
              return R;
            },
          r = a(1),
          o = (s(r), a(6)),
          u = s(o),
          c = a(7),
          f = s(c),
          h = a(8),
          d = s(h),
          y = a(9),
          x = s(y),
          T = a(10),
          m = s(T),
          p = a(11),
          v = s(p),
          b = a(14),
          w = s(b),
          M = [],
          E = !1,
          S = {
            offset: 120,
            delay: 0,
            easing: "ease",
            duration: 400,
            disable: !1,
            once: !1,
            startEvent: "DOMContentLoaded",
            throttleDelay: 99,
            debounceDelay: 50,
            disableMutationObserver: !1,
          },
          O = function () {
            var R =
              arguments.length > 0 && arguments[0] !== void 0 && arguments[0];
            if ((R && (E = !0), E))
              return ((M = (0, v.default)(M, S)), (0, m.default)(M, S.once), M);
          },
          C = function () {
            ((M = (0, w.default)()), O());
          },
          A = function () {
            M.forEach(function (R, Y) {
              (R.node.removeAttribute("data-aos"),
                R.node.removeAttribute("data-aos-easing"),
                R.node.removeAttribute("data-aos-duration"),
                R.node.removeAttribute("data-aos-delay"));
            });
          },
          j = function (R) {
            return (
              R === !0 ||
              (R === "mobile" && x.default.mobile()) ||
              (R === "phone" && x.default.phone()) ||
              (R === "tablet" && x.default.tablet()) ||
              (typeof R == "function" && R() === !0)
            );
          },
          _ = function (R) {
            ((S = l(S, R)), (M = (0, w.default)()));
            var Y = document.all && !window.atob;
            return j(S.disable) || Y
              ? A()
              : (S.disableMutationObserver ||
                  d.default.isSupported() ||
                  (console.info(`
      aos: MutationObserver is not supported on this browser,
      code mutations observing has been disabled.
      You may have to call "refreshHard()" by yourself.
    `),
                  (S.disableMutationObserver = !0)),
                document
                  .querySelector("body")
                  .setAttribute("data-aos-easing", S.easing),
                document
                  .querySelector("body")
                  .setAttribute("data-aos-duration", S.duration),
                document
                  .querySelector("body")
                  .setAttribute("data-aos-delay", S.delay),
                S.startEvent === "DOMContentLoaded" &&
                ["complete", "interactive"].indexOf(document.readyState) > -1
                  ? O(!0)
                  : S.startEvent === "load"
                    ? window.addEventListener(S.startEvent, function () {
                        O(!0);
                      })
                    : document.addEventListener(S.startEvent, function () {
                        O(!0);
                      }),
                window.addEventListener(
                  "resize",
                  (0, f.default)(O, S.debounceDelay, !0),
                ),
                window.addEventListener(
                  "orientationchange",
                  (0, f.default)(O, S.debounceDelay, !0),
                ),
                window.addEventListener(
                  "scroll",
                  (0, u.default)(function () {
                    (0, m.default)(M, S.once);
                  }, S.throttleDelay),
                ),
                S.disableMutationObserver || d.default.ready("[data-aos]", C),
                M);
          };
        n.exports = { init: _, refresh: O, refreshHard: C };
      },
      function (n, i) {},
      ,
      ,
      ,
      ,
      function (n, i) {
        (function (a) {
          function s(j, _, R) {
            function Y(W) {
              var Ze = be,
                yn = qe;
              return ((be = qe = void 0), (gn = W), (Le = j.apply(yn, Ze)));
            }
            function V(W) {
              return ((gn = W), (Ae = setTimeout(B, _)), vn ? Y(W) : Le);
            }
            function z(W) {
              var Ze = W - at,
                yn = W - gn,
                ld = _ - Ze;
              return Qt ? C(ld, _t - yn) : ld;
            }
            function N(W) {
              var Ze = W - at,
                yn = W - gn;
              return at === void 0 || Ze >= _ || Ze < 0 || (Qt && yn >= _t);
            }
            function B() {
              var W = A();
              return N(W) ? U(W) : void (Ae = setTimeout(B, z(W)));
            }
            function U(W) {
              return (
                (Ae = void 0),
                fe && be ? Y(W) : ((be = qe = void 0), Le)
              );
            }
            function he() {
              (Ae !== void 0 && clearTimeout(Ae),
                (gn = 0),
                (be = at = qe = Ae = void 0));
            }
            function gt() {
              return Ae === void 0 ? Le : U(A());
            }
            function Ke() {
              var W = A(),
                Ze = N(W);
              if (((be = arguments), (qe = this), (at = W), Ze)) {
                if (Ae === void 0) return V(at);
                if (Qt) return ((Ae = setTimeout(B, _)), Y(at));
              }
              return (Ae === void 0 && (Ae = setTimeout(B, _)), Le);
            }
            var be,
              qe,
              _t,
              Le,
              Ae,
              at,
              gn = 0,
              vn = !1,
              Qt = !1,
              fe = !0;
            if (typeof j != "function") throw new TypeError(h);
            return (
              (_ = c(_) || 0),
              r(R) &&
                ((vn = !!R.leading),
                (Qt = "maxWait" in R),
                (_t = Qt ? O(c(R.maxWait) || 0, _) : _t),
                (fe = "trailing" in R ? !!R.trailing : fe)),
              (Ke.cancel = he),
              (Ke.flush = gt),
              Ke
            );
          }
          function l(j, _, R) {
            var Y = !0,
              V = !0;
            if (typeof j != "function") throw new TypeError(h);
            return (
              r(R) &&
                ((Y = "leading" in R ? !!R.leading : Y),
                (V = "trailing" in R ? !!R.trailing : V)),
              s(j, _, { leading: Y, maxWait: _, trailing: V })
            );
          }
          function r(j) {
            var _ = typeof j > "u" ? "undefined" : f(j);
            return !!j && (_ == "object" || _ == "function");
          }
          function o(j) {
            return !!j && (typeof j > "u" ? "undefined" : f(j)) == "object";
          }
          function u(j) {
            return (
              (typeof j > "u" ? "undefined" : f(j)) == "symbol" ||
              (o(j) && S.call(j) == y)
            );
          }
          function c(j) {
            if (typeof j == "number") return j;
            if (u(j)) return d;
            if (r(j)) {
              var _ = typeof j.valueOf == "function" ? j.valueOf() : j;
              j = r(_) ? _ + "" : _;
            }
            if (typeof j != "string") return j === 0 ? j : +j;
            j = j.replace(x, "");
            var R = m.test(j);
            return R || p.test(j)
              ? v(j.slice(2), R ? 2 : 8)
              : T.test(j)
                ? d
                : +j;
          }
          var f =
              typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
                ? function (j) {
                    return typeof j;
                  }
                : function (j) {
                    return j &&
                      typeof Symbol == "function" &&
                      j.constructor === Symbol &&
                      j !== Symbol.prototype
                      ? "symbol"
                      : typeof j;
                  },
            h = "Expected a function",
            d = NaN,
            y = "[object Symbol]",
            x = /^\s+|\s+$/g,
            T = /^[-+]0x[0-9a-f]+$/i,
            m = /^0b[01]+$/i,
            p = /^0o[0-7]+$/i,
            v = parseInt,
            b =
              (typeof a > "u" ? "undefined" : f(a)) == "object" &&
              a &&
              a.Object === Object &&
              a,
            w =
              (typeof self > "u" ? "undefined" : f(self)) == "object" &&
              self &&
              self.Object === Object &&
              self,
            M = b || w || Function("return this")(),
            E = Object.prototype,
            S = E.toString,
            O = Math.max,
            C = Math.min,
            A = function () {
              return M.Date.now();
            };
          n.exports = l;
        }).call(
          i,
          (function () {
            return this;
          })(),
        );
      },
      function (n, i) {
        (function (a) {
          function s(A, j, _) {
            function R(fe) {
              var W = Ke,
                Ze = be;
              return ((Ke = be = void 0), (at = fe), (_t = A.apply(Ze, W)));
            }
            function Y(fe) {
              return ((at = fe), (Le = setTimeout(N, j)), gn ? R(fe) : _t);
            }
            function V(fe) {
              var W = fe - Ae,
                Ze = fe - at,
                yn = j - W;
              return vn ? O(yn, qe - Ze) : yn;
            }
            function z(fe) {
              var W = fe - Ae,
                Ze = fe - at;
              return Ae === void 0 || W >= j || W < 0 || (vn && Ze >= qe);
            }
            function N() {
              var fe = C();
              return z(fe) ? B(fe) : void (Le = setTimeout(N, V(fe)));
            }
            function B(fe) {
              return (
                (Le = void 0),
                Qt && Ke ? R(fe) : ((Ke = be = void 0), _t)
              );
            }
            function U() {
              (Le !== void 0 && clearTimeout(Le),
                (at = 0),
                (Ke = Ae = be = Le = void 0));
            }
            function he() {
              return Le === void 0 ? _t : B(C());
            }
            function gt() {
              var fe = C(),
                W = z(fe);
              if (((Ke = arguments), (be = this), (Ae = fe), W)) {
                if (Le === void 0) return Y(Ae);
                if (vn) return ((Le = setTimeout(N, j)), R(Ae));
              }
              return (Le === void 0 && (Le = setTimeout(N, j)), _t);
            }
            var Ke,
              be,
              qe,
              _t,
              Le,
              Ae,
              at = 0,
              gn = !1,
              vn = !1,
              Qt = !0;
            if (typeof A != "function") throw new TypeError(f);
            return (
              (j = u(j) || 0),
              l(_) &&
                ((gn = !!_.leading),
                (vn = "maxWait" in _),
                (qe = vn ? S(u(_.maxWait) || 0, j) : qe),
                (Qt = "trailing" in _ ? !!_.trailing : Qt)),
              (gt.cancel = U),
              (gt.flush = he),
              gt
            );
          }
          function l(A) {
            var j = typeof A > "u" ? "undefined" : c(A);
            return !!A && (j == "object" || j == "function");
          }
          function r(A) {
            return !!A && (typeof A > "u" ? "undefined" : c(A)) == "object";
          }
          function o(A) {
            return (
              (typeof A > "u" ? "undefined" : c(A)) == "symbol" ||
              (r(A) && E.call(A) == d)
            );
          }
          function u(A) {
            if (typeof A == "number") return A;
            if (o(A)) return h;
            if (l(A)) {
              var j = typeof A.valueOf == "function" ? A.valueOf() : A;
              A = l(j) ? j + "" : j;
            }
            if (typeof A != "string") return A === 0 ? A : +A;
            A = A.replace(y, "");
            var _ = T.test(A);
            return _ || m.test(A)
              ? p(A.slice(2), _ ? 2 : 8)
              : x.test(A)
                ? h
                : +A;
          }
          var c =
              typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
                ? function (A) {
                    return typeof A;
                  }
                : function (A) {
                    return A &&
                      typeof Symbol == "function" &&
                      A.constructor === Symbol &&
                      A !== Symbol.prototype
                      ? "symbol"
                      : typeof A;
                  },
            f = "Expected a function",
            h = NaN,
            d = "[object Symbol]",
            y = /^\s+|\s+$/g,
            x = /^[-+]0x[0-9a-f]+$/i,
            T = /^0b[01]+$/i,
            m = /^0o[0-7]+$/i,
            p = parseInt,
            v =
              (typeof a > "u" ? "undefined" : c(a)) == "object" &&
              a &&
              a.Object === Object &&
              a,
            b =
              (typeof self > "u" ? "undefined" : c(self)) == "object" &&
              self &&
              self.Object === Object &&
              self,
            w = v || b || Function("return this")(),
            M = Object.prototype,
            E = M.toString,
            S = Math.max,
            O = Math.min,
            C = function () {
              return w.Date.now();
            };
          n.exports = s;
        }).call(
          i,
          (function () {
            return this;
          })(),
        );
      },
      function (n, i) {
        function a(c) {
          var f = void 0,
            h = void 0;
          for (f = 0; f < c.length; f += 1)
            if (
              ((h = c[f]),
              (h.dataset && h.dataset.aos) || (h.children && a(h.children)))
            )
              return !0;
          return !1;
        }
        function s() {
          return (
            window.MutationObserver ||
            window.WebKitMutationObserver ||
            window.MozMutationObserver
          );
        }
        function l() {
          return !!s();
        }
        function r(c, f) {
          var h = window.document,
            d = s(),
            y = new d(o);
          ((u = f),
            y.observe(h.documentElement, {
              childList: !0,
              subtree: !0,
              removedNodes: !0,
            }));
        }
        function o(c) {
          c &&
            c.forEach(function (f) {
              var h = Array.prototype.slice.call(f.addedNodes),
                d = Array.prototype.slice.call(f.removedNodes),
                y = h.concat(d);
              if (a(y)) return u();
            });
        }
        Object.defineProperty(i, "__esModule", { value: !0 });
        var u = function () {};
        i.default = { isSupported: l, ready: r };
      },
      function (n, i) {
        function a(h, d) {
          if (!(h instanceof d))
            throw new TypeError("Cannot call a class as a function");
        }
        function s() {
          return navigator.userAgent || navigator.vendor || window.opera || "";
        }
        Object.defineProperty(i, "__esModule", { value: !0 });
        var l = (function () {
            function h(d, y) {
              for (var x = 0; x < y.length; x++) {
                var T = y[x];
                ((T.enumerable = T.enumerable || !1),
                  (T.configurable = !0),
                  "value" in T && (T.writable = !0),
                  Object.defineProperty(d, T.key, T));
              }
            }
            return function (d, y, x) {
              return (y && h(d.prototype, y), x && h(d, x), d);
            };
          })(),
          r =
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
          o =
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
          u =
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
          c =
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
          f = (function () {
            function h() {
              a(this, h);
            }
            return (
              l(h, [
                {
                  key: "phone",
                  value: function () {
                    var d = s();
                    return !(!r.test(d) && !o.test(d.substr(0, 4)));
                  },
                },
                {
                  key: "mobile",
                  value: function () {
                    var d = s();
                    return !(!u.test(d) && !c.test(d.substr(0, 4)));
                  },
                },
                {
                  key: "tablet",
                  value: function () {
                    return this.mobile() && !this.phone();
                  },
                },
              ]),
              h
            );
          })();
        i.default = new f();
      },
      function (n, i) {
        Object.defineProperty(i, "__esModule", { value: !0 });
        var a = function (l, r, o) {
            var u = l.node.getAttribute("data-aos-once");
            r > l.position
              ? l.node.classList.add("aos-animate")
              : typeof u < "u" &&
                (u === "false" || (!o && u !== "true")) &&
                l.node.classList.remove("aos-animate");
          },
          s = function (l, r) {
            var o = window.pageYOffset,
              u = window.innerHeight;
            l.forEach(function (c, f) {
              a(c, u + o, r);
            });
          };
        i.default = s;
      },
      function (n, i, a) {
        function s(u) {
          return u && u.__esModule ? u : { default: u };
        }
        Object.defineProperty(i, "__esModule", { value: !0 });
        var l = a(12),
          r = s(l),
          o = function (u, c) {
            return (
              u.forEach(function (f, h) {
                (f.node.classList.add("aos-init"),
                  (f.position = (0, r.default)(f.node, c.offset)));
              }),
              u
            );
          };
        i.default = o;
      },
      function (n, i, a) {
        function s(u) {
          return u && u.__esModule ? u : { default: u };
        }
        Object.defineProperty(i, "__esModule", { value: !0 });
        var l = a(13),
          r = s(l),
          o = function (u, c) {
            var f = 0,
              h = 0,
              d = window.innerHeight,
              y = {
                offset: u.getAttribute("data-aos-offset"),
                anchor: u.getAttribute("data-aos-anchor"),
                anchorPlacement: u.getAttribute("data-aos-anchor-placement"),
              };
            switch (
              (y.offset && !isNaN(y.offset) && (h = parseInt(y.offset)),
              y.anchor &&
                document.querySelectorAll(y.anchor) &&
                (u = document.querySelectorAll(y.anchor)[0]),
              (f = (0, r.default)(u).top),
              y.anchorPlacement)
            ) {
              case "top-bottom":
                break;
              case "center-bottom":
                f += u.offsetHeight / 2;
                break;
              case "bottom-bottom":
                f += u.offsetHeight;
                break;
              case "top-center":
                f += d / 2;
                break;
              case "bottom-center":
                f += d / 2 + u.offsetHeight;
                break;
              case "center-center":
                f += d / 2 + u.offsetHeight / 2;
                break;
              case "top-top":
                f += d;
                break;
              case "bottom-top":
                f += u.offsetHeight + d;
                break;
              case "center-top":
                f += u.offsetHeight / 2 + d;
            }
            return (
              y.anchorPlacement || y.offset || isNaN(c) || (h = c),
              f + h
            );
          };
        i.default = o;
      },
      function (n, i) {
        Object.defineProperty(i, "__esModule", { value: !0 });
        var a = function (s) {
          for (
            var l = 0, r = 0;
            s && !isNaN(s.offsetLeft) && !isNaN(s.offsetTop);

          )
            ((l += s.offsetLeft - (s.tagName != "BODY" ? s.scrollLeft : 0)),
              (r += s.offsetTop - (s.tagName != "BODY" ? s.scrollTop : 0)),
              (s = s.offsetParent));
          return { top: r, left: l };
        };
        i.default = a;
      },
      function (n, i) {
        Object.defineProperty(i, "__esModule", { value: !0 });
        var a = function (s) {
          return (
            (s = s || document.querySelectorAll("[data-aos]")),
            Array.prototype.map.call(s, function (l) {
              return { node: l };
            })
          );
        };
        i.default = a;
      },
    ]);
  });
})(uv);
var p2 = uv.exports;
const g2 = lp(p2),
  Tf = L.createContext({});
function wf(e) {
  const t = L.useRef(null);
  return (t.current === null && (t.current = e()), t.current);
}
const Ef = typeof window < "u",
  cv = Ef ? L.useLayoutEffect : L.useEffect,
  Gr = L.createContext(null);
function Mf(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function Af(e, t) {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
const hn = (e, t, n) => (n > t ? t : n < e ? e : n);
let Cf = () => {};
const mn = {},
  fv = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e);
function dv(e) {
  return typeof e == "object" && e !== null;
}
const hv = (e) => /^0[^.\s]+$/u.test(e);
function jf(e) {
  let t;
  return () => (t === void 0 && (t = e()), t);
}
const Nt = (e) => e,
  v2 = (e, t) => (n) => t(e(n)),
  Ys = (...e) => e.reduce(v2),
  Ts = (e, t, n) => {
    const i = t - e;
    return i === 0 ? 1 : (n - e) / i;
  };
class Nf {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return (Mf(this.subscriptions, t), () => Af(this.subscriptions, t));
  }
  notify(t, n, i) {
    const a = this.subscriptions.length;
    if (a)
      if (a === 1) this.subscriptions[0](t, n, i);
      else
        for (let s = 0; s < a; s++) {
          const l = this.subscriptions[s];
          l && l(t, n, i);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const qt = (e) => e * 1e3,
  At = (e) => e / 1e3;
function mv(e, t) {
  return t ? e * (1e3 / t) : 0;
}
const pv = (e, t, n) =>
    (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e,
  y2 = 1e-7,
  x2 = 12;
function b2(e, t, n, i, a) {
  let s,
    l,
    r = 0;
  do ((l = t + (n - t) / 2), (s = pv(l, i, a) - e), s > 0 ? (n = l) : (t = l));
  while (Math.abs(s) > y2 && ++r < x2);
  return l;
}
function Xs(e, t, n, i) {
  if (e === t && n === i) return Nt;
  const a = (s) => b2(s, 0, 1, e, n);
  return (s) => (s === 0 || s === 1 ? s : pv(a(s), t, i));
}
const gv = (e) => (t) => (t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2),
  vv = (e) => (t) => 1 - e(1 - t),
  yv = Xs(0.33, 1.53, 0.69, 0.99),
  Of = vv(yv),
  xv = gv(Of),
  bv = (e) =>
    (e *= 2) < 1 ? 0.5 * Of(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))),
  Df = (e) => 1 - Math.sin(Math.acos(e)),
  Sv = vv(Df),
  Tv = gv(Df),
  S2 = Xs(0.42, 0, 1, 1),
  T2 = Xs(0, 0, 0.58, 1),
  wv = Xs(0.42, 0, 0.58, 1),
  w2 = (e) => Array.isArray(e) && typeof e[0] != "number",
  Ev = (e) => Array.isArray(e) && typeof e[0] == "number",
  E2 = {
    linear: Nt,
    easeIn: S2,
    easeInOut: wv,
    easeOut: T2,
    circIn: Df,
    circInOut: Tv,
    circOut: Sv,
    backIn: Of,
    backInOut: xv,
    backOut: yv,
    anticipate: bv,
  },
  M2 = (e) => typeof e == "string",
  _h = (e) => {
    if (Ev(e)) {
      Cf(e.length === 4);
      const [t, n, i, a] = e;
      return Xs(t, n, i, a);
    } else if (M2(e)) return E2[e];
    return e;
  },
  ol = [
    "setup",
    "read",
    "resolveKeyframes",
    "preUpdate",
    "update",
    "preRender",
    "render",
    "postRender",
  ];
function A2(e, t) {
  let n = new Set(),
    i = new Set(),
    a = !1,
    s = !1;
  const l = new WeakSet();
  let r = { delta: 0, timestamp: 0, isProcessing: !1 };
  function o(c) {
    (l.has(c) && (u.schedule(c), e()), c(r));
  }
  const u = {
    schedule: (c, f = !1, h = !1) => {
      const y = h && a ? n : i;
      return (f && l.add(c), y.has(c) || y.add(c), c);
    },
    cancel: (c) => {
      (i.delete(c), l.delete(c));
    },
    process: (c) => {
      if (((r = c), a)) {
        s = !0;
        return;
      }
      ((a = !0),
        ([n, i] = [i, n]),
        n.forEach(o),
        n.clear(),
        (a = !1),
        s && ((s = !1), u.process(c)));
    },
  };
  return u;
}
const C2 = 40;
function Mv(e, t) {
  let n = !1,
    i = !0;
  const a = { delta: 0, timestamp: 0, isProcessing: !1 },
    s = () => (n = !0),
    l = ol.reduce((v, b) => ((v[b] = A2(s)), v), {}),
    {
      setup: r,
      read: o,
      resolveKeyframes: u,
      preUpdate: c,
      update: f,
      preRender: h,
      render: d,
      postRender: y,
    } = l,
    x = () => {
      const v = mn.useManualTiming ? a.timestamp : performance.now();
      ((n = !1),
        mn.useManualTiming ||
          (a.delta = i ? 1e3 / 60 : Math.max(Math.min(v - a.timestamp, C2), 1)),
        (a.timestamp = v),
        (a.isProcessing = !0),
        r.process(a),
        o.process(a),
        u.process(a),
        c.process(a),
        f.process(a),
        h.process(a),
        d.process(a),
        y.process(a),
        (a.isProcessing = !1),
        n && t && ((i = !1), e(x)));
    },
    T = () => {
      ((n = !0), (i = !0), a.isProcessing || e(x));
    };
  return {
    schedule: ol.reduce((v, b) => {
      const w = l[b];
      return (
        (v[b] = (M, E = !1, S = !1) => (n || T(), w.schedule(M, E, S))),
        v
      );
    }, {}),
    cancel: (v) => {
      for (let b = 0; b < ol.length; b++) l[ol[b]].cancel(v);
    },
    state: a,
    steps: l,
  };
}
const {
  schedule: ce,
  cancel: Qn,
  state: Ve,
  steps: Do,
} = Mv(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Nt, !0);
let Nl;
function j2() {
  Nl = void 0;
}
const We = {
    now: () => (
      Nl === void 0 &&
        We.set(
          Ve.isProcessing || mn.useManualTiming
            ? Ve.timestamp
            : performance.now(),
        ),
      Nl
    ),
    set: (e) => {
      ((Nl = e), queueMicrotask(j2));
    },
  },
  Av = (e) => (t) => typeof t == "string" && t.startsWith(e),
  zf = Av("--"),
  N2 = Av("var(--"),
  Lf = (e) => (N2(e) ? O2.test(e.split("/*")[0].trim()) : !1),
  O2 =
    /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
  Ea = {
    test: (e) => typeof e == "number",
    parse: parseFloat,
    transform: (e) => e,
  },
  ws = { ...Ea, transform: (e) => hn(0, 1, e) },
  ul = { ...Ea, default: 1 },
  ns = (e) => Math.round(e * 1e5) / 1e5,
  Vf = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function D2(e) {
  return e == null;
}
const z2 =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  _f = (e, t) => (n) =>
    !!(
      (typeof n == "string" && z2.test(n) && n.startsWith(e)) ||
      (t && !D2(n) && Object.prototype.hasOwnProperty.call(n, t))
    ),
  Cv = (e, t, n) => (i) => {
    if (typeof i != "string") return i;
    const [a, s, l, r] = i.match(Vf);
    return {
      [e]: parseFloat(a),
      [t]: parseFloat(s),
      [n]: parseFloat(l),
      alpha: r !== void 0 ? parseFloat(r) : 1,
    };
  },
  L2 = (e) => hn(0, 255, e),
  zo = { ...Ea, transform: (e) => Math.round(L2(e)) },
  ai = {
    test: _f("rgb", "red"),
    parse: Cv("red", "green", "blue"),
    transform: ({ red: e, green: t, blue: n, alpha: i = 1 }) =>
      "rgba(" +
      zo.transform(e) +
      ", " +
      zo.transform(t) +
      ", " +
      zo.transform(n) +
      ", " +
      ns(ws.transform(i)) +
      ")",
  };
function V2(e) {
  let t = "",
    n = "",
    i = "",
    a = "";
  return (
    e.length > 5
      ? ((t = e.substring(1, 3)),
        (n = e.substring(3, 5)),
        (i = e.substring(5, 7)),
        (a = e.substring(7, 9)))
      : ((t = e.substring(1, 2)),
        (n = e.substring(2, 3)),
        (i = e.substring(3, 4)),
        (a = e.substring(4, 5)),
        (t += t),
        (n += n),
        (i += i),
        (a += a)),
    {
      red: parseInt(t, 16),
      green: parseInt(n, 16),
      blue: parseInt(i, 16),
      alpha: a ? parseInt(a, 16) / 255 : 1,
    }
  );
}
const Fu = { test: _f("#"), parse: V2, transform: ai.transform },
  ks = (e) => ({
    test: (t) =>
      typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
    parse: parseFloat,
    transform: (t) => `${t}${e}`,
  }),
  bn = ks("deg"),
  Yt = ks("%"),
  G = ks("px"),
  _2 = ks("vh"),
  R2 = ks("vw"),
  Rh = {
    ...Yt,
    parse: (e) => Yt.parse(e) / 100,
    transform: (e) => Yt.transform(e * 100),
  },
  Yi = {
    test: _f("hsl", "hue"),
    parse: Cv("hue", "saturation", "lightness"),
    transform: ({ hue: e, saturation: t, lightness: n, alpha: i = 1 }) =>
      "hsla(" +
      Math.round(e) +
      ", " +
      Yt.transform(ns(t)) +
      ", " +
      Yt.transform(ns(n)) +
      ", " +
      ns(ws.transform(i)) +
      ")",
  },
  Se = {
    test: (e) => ai.test(e) || Fu.test(e) || Yi.test(e),
    parse: (e) =>
      ai.test(e) ? ai.parse(e) : Yi.test(e) ? Yi.parse(e) : Fu.parse(e),
    transform: (e) =>
      typeof e == "string"
        ? e
        : e.hasOwnProperty("red")
          ? ai.transform(e)
          : Yi.transform(e),
    getAnimatableNone: (e) => {
      const t = Se.parse(e);
      return ((t.alpha = 0), Se.transform(t));
    },
  },
  B2 =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function H2(e) {
  var t, n;
  return (
    isNaN(e) &&
    typeof e == "string" &&
    (((t = e.match(Vf)) == null ? void 0 : t.length) || 0) +
      (((n = e.match(B2)) == null ? void 0 : n.length) || 0) >
      0
  );
}
const jv = "number",
  Nv = "color",
  U2 = "var",
  G2 = "var(",
  Bh = "${}",
  q2 =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Es(e) {
  const t = e.toString(),
    n = [],
    i = { color: [], number: [], var: [] },
    a = [];
  let s = 0;
  const r = t
    .replace(
      q2,
      (o) => (
        Se.test(o)
          ? (i.color.push(s), a.push(Nv), n.push(Se.parse(o)))
          : o.startsWith(G2)
            ? (i.var.push(s), a.push(U2), n.push(o))
            : (i.number.push(s), a.push(jv), n.push(parseFloat(o))),
        ++s,
        Bh
      ),
    )
    .split(Bh);
  return { values: n, split: r, indexes: i, types: a };
}
function Ov(e) {
  return Es(e).values;
}
function Dv(e) {
  const { split: t, types: n } = Es(e),
    i = t.length;
  return (a) => {
    let s = "";
    for (let l = 0; l < i; l++)
      if (((s += t[l]), a[l] !== void 0)) {
        const r = n[l];
        r === jv
          ? (s += ns(a[l]))
          : r === Nv
            ? (s += Se.transform(a[l]))
            : (s += a[l]);
      }
    return s;
  };
}
const Y2 = (e) =>
  typeof e == "number" ? 0 : Se.test(e) ? Se.getAnimatableNone(e) : e;
function X2(e) {
  const t = Ov(e);
  return Dv(e)(t.map(Y2));
}
const Kn = {
  test: H2,
  parse: Ov,
  createTransformer: Dv,
  getAnimatableNone: X2,
};
function Lo(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6
      ? e + (t - e) * 6 * n
      : n < 1 / 2
        ? t
        : n < 2 / 3
          ? e + (t - e) * (2 / 3 - n) * 6
          : e
  );
}
function k2({ hue: e, saturation: t, lightness: n, alpha: i }) {
  ((e /= 360), (t /= 100), (n /= 100));
  let a = 0,
    s = 0,
    l = 0;
  if (!t) a = s = l = n;
  else {
    const r = n < 0.5 ? n * (1 + t) : n + t - n * t,
      o = 2 * n - r;
    ((a = Lo(o, r, e + 1 / 3)), (s = Lo(o, r, e)), (l = Lo(o, r, e - 1 / 3)));
  }
  return {
    red: Math.round(a * 255),
    green: Math.round(s * 255),
    blue: Math.round(l * 255),
    alpha: i,
  };
}
function ur(e, t) {
  return (n) => (n > 0 ? t : e);
}
const de = (e, t, n) => e + (t - e) * n,
  Vo = (e, t, n) => {
    const i = e * e,
      a = n * (t * t - i) + i;
    return a < 0 ? 0 : Math.sqrt(a);
  },
  P2 = [Fu, ai, Yi],
  Q2 = (e) => P2.find((t) => t.test(e));
function Hh(e) {
  const t = Q2(e);
  if (!t) return !1;
  let n = t.parse(e);
  return (t === Yi && (n = k2(n)), n);
}
const Uh = (e, t) => {
    const n = Hh(e),
      i = Hh(t);
    if (!n || !i) return ur(e, t);
    const a = { ...n };
    return (s) => (
      (a.red = Vo(n.red, i.red, s)),
      (a.green = Vo(n.green, i.green, s)),
      (a.blue = Vo(n.blue, i.blue, s)),
      (a.alpha = de(n.alpha, i.alpha, s)),
      ai.transform(a)
    );
  },
  $u = new Set(["none", "hidden"]);
function K2(e, t) {
  return $u.has(e) ? (n) => (n <= 0 ? e : t) : (n) => (n >= 1 ? t : e);
}
function Z2(e, t) {
  return (n) => de(e, t, n);
}
function Rf(e) {
  return typeof e == "number"
    ? Z2
    : typeof e == "string"
      ? Lf(e)
        ? ur
        : Se.test(e)
          ? Uh
          : I2
      : Array.isArray(e)
        ? zv
        : typeof e == "object"
          ? Se.test(e)
            ? Uh
            : F2
          : ur;
}
function zv(e, t) {
  const n = [...e],
    i = n.length,
    a = e.map((s, l) => Rf(s)(s, t[l]));
  return (s) => {
    for (let l = 0; l < i; l++) n[l] = a[l](s);
    return n;
  };
}
function F2(e, t) {
  const n = { ...e, ...t },
    i = {};
  for (const a in n)
    e[a] !== void 0 && t[a] !== void 0 && (i[a] = Rf(e[a])(e[a], t[a]));
  return (a) => {
    for (const s in i) n[s] = i[s](a);
    return n;
  };
}
function $2(e, t) {
  const n = [],
    i = { color: 0, var: 0, number: 0 };
  for (let a = 0; a < t.values.length; a++) {
    const s = t.types[a],
      l = e.indexes[s][i[s]],
      r = e.values[l] ?? 0;
    ((n[a] = r), i[s]++);
  }
  return n;
}
const I2 = (e, t) => {
  const n = Kn.createTransformer(t),
    i = Es(e),
    a = Es(t);
  return i.indexes.var.length === a.indexes.var.length &&
    i.indexes.color.length === a.indexes.color.length &&
    i.indexes.number.length >= a.indexes.number.length
    ? ($u.has(e) && !a.values.length) || ($u.has(t) && !i.values.length)
      ? K2(e, t)
      : Ys(zv($2(i, a), a.values), n)
    : ur(e, t);
};
function Lv(e, t, n) {
  return typeof e == "number" && typeof t == "number" && typeof n == "number"
    ? de(e, t, n)
    : Rf(e)(e, t);
}
const J2 = (e) => {
    const t = ({ timestamp: n }) => e(n);
    return {
      start: (n = !0) => ce.update(t, n),
      stop: () => Qn(t),
      now: () => (Ve.isProcessing ? Ve.timestamp : We.now()),
    };
  },
  Vv = (e, t, n = 10) => {
    let i = "";
    const a = Math.max(Math.round(t / n), 2);
    for (let s = 0; s < a; s++)
      i += Math.round(e(s / (a - 1)) * 1e4) / 1e4 + ", ";
    return `linear(${i.substring(0, i.length - 2)})`;
  },
  cr = 2e4;
function Bf(e) {
  let t = 0;
  const n = 50;
  let i = e.next(t);
  for (; !i.done && t < cr; ) ((t += n), (i = e.next(t)));
  return t >= cr ? 1 / 0 : t;
}
function W2(e, t = 100, n) {
  const i = n({ ...e, keyframes: [0, t] }),
    a = Math.min(Bf(i), cr);
  return {
    type: "keyframes",
    ease: (s) => i.next(a * s).value / t,
    duration: At(a),
  };
}
const eS = 5;
function _v(e, t, n) {
  const i = Math.max(t - eS, 0);
  return mv(n - e(i), t - i);
}
const pe = {
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    duration: 800,
    bounce: 0.3,
    visualDuration: 0.3,
    restSpeed: { granular: 0.01, default: 2 },
    restDelta: { granular: 0.005, default: 0.5 },
    minDuration: 0.01,
    maxDuration: 10,
    minDamping: 0.05,
    maxDamping: 1,
  },
  _o = 0.001;
function tS({
  duration: e = pe.duration,
  bounce: t = pe.bounce,
  velocity: n = pe.velocity,
  mass: i = pe.mass,
}) {
  let a,
    s,
    l = 1 - t;
  ((l = hn(pe.minDamping, pe.maxDamping, l)),
    (e = hn(pe.minDuration, pe.maxDuration, At(e))),
    l < 1
      ? ((a = (u) => {
          const c = u * l,
            f = c * e,
            h = c - n,
            d = Iu(u, l),
            y = Math.exp(-f);
          return _o - (h / d) * y;
        }),
        (s = (u) => {
          const f = u * l * e,
            h = f * n + n,
            d = Math.pow(l, 2) * Math.pow(u, 2) * e,
            y = Math.exp(-f),
            x = Iu(Math.pow(u, 2), l);
          return ((-a(u) + _o > 0 ? -1 : 1) * ((h - d) * y)) / x;
        }))
      : ((a = (u) => {
          const c = Math.exp(-u * e),
            f = (u - n) * e + 1;
          return -_o + c * f;
        }),
        (s = (u) => {
          const c = Math.exp(-u * e),
            f = (n - u) * (e * e);
          return c * f;
        })));
  const r = 5 / e,
    o = iS(a, s, r);
  if (((e = qt(e)), isNaN(o)))
    return { stiffness: pe.stiffness, damping: pe.damping, duration: e };
  {
    const u = Math.pow(o, 2) * i;
    return { stiffness: u, damping: l * 2 * Math.sqrt(i * u), duration: e };
  }
}
const nS = 12;
function iS(e, t, n) {
  let i = n;
  for (let a = 1; a < nS; a++) i = i - e(i) / t(i);
  return i;
}
function Iu(e, t) {
  return e * Math.sqrt(1 - t * t);
}
const aS = ["duration", "bounce"],
  sS = ["stiffness", "damping", "mass"];
function Gh(e, t) {
  return t.some((n) => e[n] !== void 0);
}
function lS(e) {
  let t = {
    velocity: pe.velocity,
    stiffness: pe.stiffness,
    damping: pe.damping,
    mass: pe.mass,
    isResolvedFromDuration: !1,
    ...e,
  };
  if (!Gh(e, sS) && Gh(e, aS))
    if (e.visualDuration) {
      const n = e.visualDuration,
        i = (2 * Math.PI) / (n * 1.2),
        a = i * i,
        s = 2 * hn(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(a);
      t = { ...t, mass: pe.mass, stiffness: a, damping: s };
    } else {
      const n = tS(e);
      ((t = { ...t, ...n, mass: pe.mass }), (t.isResolvedFromDuration = !0));
    }
  return t;
}
function fr(e = pe.visualDuration, t = pe.bounce) {
  const n =
    typeof e != "object"
      ? { visualDuration: e, keyframes: [0, 1], bounce: t }
      : e;
  let { restSpeed: i, restDelta: a } = n;
  const s = n.keyframes[0],
    l = n.keyframes[n.keyframes.length - 1],
    r = { done: !1, value: s },
    {
      stiffness: o,
      damping: u,
      mass: c,
      duration: f,
      velocity: h,
      isResolvedFromDuration: d,
    } = lS({ ...n, velocity: -At(n.velocity || 0) }),
    y = h || 0,
    x = u / (2 * Math.sqrt(o * c)),
    T = l - s,
    m = At(Math.sqrt(o / c)),
    p = Math.abs(T) < 5;
  (i || (i = p ? pe.restSpeed.granular : pe.restSpeed.default),
    a || (a = p ? pe.restDelta.granular : pe.restDelta.default));
  let v;
  if (x < 1) {
    const w = Iu(m, x);
    v = (M) => {
      const E = Math.exp(-x * m * M);
      return (
        l - E * (((y + x * m * T) / w) * Math.sin(w * M) + T * Math.cos(w * M))
      );
    };
  } else if (x === 1) v = (w) => l - Math.exp(-m * w) * (T + (y + m * T) * w);
  else {
    const w = m * Math.sqrt(x * x - 1);
    v = (M) => {
      const E = Math.exp(-x * m * M),
        S = Math.min(w * M, 300);
      return (
        l - (E * ((y + x * m * T) * Math.sinh(S) + w * T * Math.cosh(S))) / w
      );
    };
  }
  const b = {
    calculatedDuration: (d && f) || null,
    next: (w) => {
      const M = v(w);
      if (d) r.done = w >= f;
      else {
        let E = w === 0 ? y : 0;
        x < 1 && (E = w === 0 ? qt(y) : _v(v, w, M));
        const S = Math.abs(E) <= i,
          O = Math.abs(l - M) <= a;
        r.done = S && O;
      }
      return ((r.value = r.done ? l : M), r);
    },
    toString: () => {
      const w = Math.min(Bf(b), cr),
        M = Vv((E) => b.next(w * E).value, w, 30);
      return w + "ms " + M;
    },
    toTransition: () => {},
  };
  return b;
}
fr.applyToOptions = (e) => {
  const t = W2(e, 100, fr);
  return (
    (e.ease = t.ease),
    (e.duration = qt(t.duration)),
    (e.type = "keyframes"),
    e
  );
};
function Ju({
  keyframes: e,
  velocity: t = 0,
  power: n = 0.8,
  timeConstant: i = 325,
  bounceDamping: a = 10,
  bounceStiffness: s = 500,
  modifyTarget: l,
  min: r,
  max: o,
  restDelta: u = 0.5,
  restSpeed: c,
}) {
  const f = e[0],
    h = { done: !1, value: f },
    d = (S) => (r !== void 0 && S < r) || (o !== void 0 && S > o),
    y = (S) =>
      r === void 0
        ? o
        : o === void 0 || Math.abs(r - S) < Math.abs(o - S)
          ? r
          : o;
  let x = n * t;
  const T = f + x,
    m = l === void 0 ? T : l(T);
  m !== T && (x = m - f);
  const p = (S) => -x * Math.exp(-S / i),
    v = (S) => m + p(S),
    b = (S) => {
      const O = p(S),
        C = v(S);
      ((h.done = Math.abs(O) <= u), (h.value = h.done ? m : C));
    };
  let w, M;
  const E = (S) => {
    d(h.value) &&
      ((w = S),
      (M = fr({
        keyframes: [h.value, y(h.value)],
        velocity: _v(v, S, h.value),
        damping: a,
        stiffness: s,
        restDelta: u,
        restSpeed: c,
      })));
  };
  return (
    E(0),
    {
      calculatedDuration: null,
      next: (S) => {
        let O = !1;
        return (
          !M && w === void 0 && ((O = !0), b(S), E(S)),
          w !== void 0 && S >= w ? M.next(S - w) : (!O && b(S), h)
        );
      },
    }
  );
}
function rS(e, t, n) {
  const i = [],
    a = n || mn.mix || Lv,
    s = e.length - 1;
  for (let l = 0; l < s; l++) {
    let r = a(e[l], e[l + 1]);
    if (t) {
      const o = Array.isArray(t) ? t[l] || Nt : t;
      r = Ys(o, r);
    }
    i.push(r);
  }
  return i;
}
function oS(e, t, { clamp: n = !0, ease: i, mixer: a } = {}) {
  const s = e.length;
  if ((Cf(s === t.length), s === 1)) return () => t[0];
  if (s === 2 && t[0] === t[1]) return () => t[1];
  const l = e[0] === e[1];
  e[0] > e[s - 1] && ((e = [...e].reverse()), (t = [...t].reverse()));
  const r = rS(t, i, a),
    o = r.length,
    u = (c) => {
      if (l && c < e[0]) return t[0];
      let f = 0;
      if (o > 1) for (; f < e.length - 2 && !(c < e[f + 1]); f++);
      const h = Ts(e[f], e[f + 1], c);
      return r[f](h);
    };
  return n ? (c) => u(hn(e[0], e[s - 1], c)) : u;
}
function uS(e, t) {
  const n = e[e.length - 1];
  for (let i = 1; i <= t; i++) {
    const a = Ts(0, t, i);
    e.push(de(n, 1, a));
  }
}
function cS(e) {
  const t = [0];
  return (uS(t, e.length - 1), t);
}
function fS(e, t) {
  return e.map((n) => n * t);
}
function dS(e, t) {
  return e.map(() => t || wv).splice(0, e.length - 1);
}
function is({
  duration: e = 300,
  keyframes: t,
  times: n,
  ease: i = "easeInOut",
}) {
  const a = w2(i) ? i.map(_h) : _h(i),
    s = { done: !1, value: t[0] },
    l = fS(n && n.length === t.length ? n : cS(t), e),
    r = oS(l, t, { ease: Array.isArray(a) ? a : dS(t, a) });
  return {
    calculatedDuration: e,
    next: (o) => ((s.value = r(o)), (s.done = o >= e), s),
  };
}
const hS = (e) => e !== null;
function Hf(e, { repeat: t, repeatType: n = "loop" }, i, a = 1) {
  const s = e.filter(hS),
    r = a < 0 || (t && n !== "loop" && t % 2 === 1) ? 0 : s.length - 1;
  return !r || i === void 0 ? s[r] : i;
}
const mS = { decay: Ju, inertia: Ju, tween: is, keyframes: is, spring: fr };
function Rv(e) {
  typeof e.type == "string" && (e.type = mS[e.type]);
}
class Uf {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((t) => {
      this.resolve = t;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  then(t, n) {
    return this.finished.then(t, n);
  }
}
const pS = (e) => e / 100;
class Gf extends Uf {
  constructor(t) {
    (super(),
      (this.state = "idle"),
      (this.startTime = null),
      (this.isStopped = !1),
      (this.currentTime = 0),
      (this.holdTime = null),
      (this.playbackSpeed = 1),
      (this.stop = () => {
        var i, a;
        const { motionValue: n } = this.options;
        (n && n.updatedAt !== We.now() && this.tick(We.now()),
          (this.isStopped = !0),
          this.state !== "idle" &&
            (this.teardown(),
            (a = (i = this.options).onStop) == null || a.call(i)));
      }),
      (this.options = t),
      this.initAnimation(),
      this.play(),
      t.autoplay === !1 && this.pause());
  }
  initAnimation() {
    const { options: t } = this;
    Rv(t);
    const {
      type: n = is,
      repeat: i = 0,
      repeatDelay: a = 0,
      repeatType: s,
      velocity: l = 0,
    } = t;
    let { keyframes: r } = t;
    const o = n || is;
    o !== is &&
      typeof r[0] != "number" &&
      ((this.mixKeyframes = Ys(pS, Lv(r[0], r[1]))), (r = [0, 100]));
    const u = o({ ...t, keyframes: r });
    (s === "mirror" &&
      (this.mirroredGenerator = o({
        ...t,
        keyframes: [...r].reverse(),
        velocity: -l,
      })),
      u.calculatedDuration === null && (u.calculatedDuration = Bf(u)));
    const { calculatedDuration: c } = u;
    ((this.calculatedDuration = c),
      (this.resolvedDuration = c + a),
      (this.totalDuration = this.resolvedDuration * (i + 1) - a),
      (this.generator = u));
  }
  updateTime(t) {
    const n = Math.round(t - this.startTime) * this.playbackSpeed;
    this.holdTime !== null
      ? (this.currentTime = this.holdTime)
      : (this.currentTime = n);
  }
  tick(t, n = !1) {
    const {
      generator: i,
      totalDuration: a,
      mixKeyframes: s,
      mirroredGenerator: l,
      resolvedDuration: r,
      calculatedDuration: o,
    } = this;
    if (this.startTime === null) return i.next(0);
    const {
      delay: u = 0,
      keyframes: c,
      repeat: f,
      repeatType: h,
      repeatDelay: d,
      type: y,
      onUpdate: x,
      finalKeyframe: T,
    } = this.options;
    (this.speed > 0
      ? (this.startTime = Math.min(this.startTime, t))
      : this.speed < 0 &&
        (this.startTime = Math.min(t - a / this.speed, this.startTime)),
      n ? (this.currentTime = t) : this.updateTime(t));
    const m = this.currentTime - u * (this.playbackSpeed >= 0 ? 1 : -1),
      p = this.playbackSpeed >= 0 ? m < 0 : m > a;
    ((this.currentTime = Math.max(m, 0)),
      this.state === "finished" &&
        this.holdTime === null &&
        (this.currentTime = a));
    let v = this.currentTime,
      b = i;
    if (f) {
      const S = Math.min(this.currentTime, a) / r;
      let O = Math.floor(S),
        C = S % 1;
      (!C && S >= 1 && (C = 1),
        C === 1 && O--,
        (O = Math.min(O, f + 1)),
        !!(O % 2) &&
          (h === "reverse"
            ? ((C = 1 - C), d && (C -= d / r))
            : h === "mirror" && (b = l)),
        (v = hn(0, 1, C) * r));
    }
    const w = p ? { done: !1, value: c[0] } : b.next(v);
    s && (w.value = s(w.value));
    let { done: M } = w;
    !p &&
      o !== null &&
      (M =
        this.playbackSpeed >= 0
          ? this.currentTime >= a
          : this.currentTime <= 0);
    const E =
      this.holdTime === null &&
      (this.state === "finished" || (this.state === "running" && M));
    return (
      E && y !== Ju && (w.value = Hf(c, this.options, T, this.speed)),
      x && x(w.value),
      E && this.finish(),
      w
    );
  }
  then(t, n) {
    return this.finished.then(t, n);
  }
  get duration() {
    return At(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + At(t);
  }
  get time() {
    return At(this.currentTime);
  }
  set time(t) {
    var n;
    ((t = qt(t)),
      (this.currentTime = t),
      this.startTime === null ||
      this.holdTime !== null ||
      this.playbackSpeed === 0
        ? (this.holdTime = t)
        : this.driver &&
          (this.startTime = this.driver.now() - t / this.playbackSpeed),
      (n = this.driver) == null || n.start(!1));
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    this.updateTime(We.now());
    const n = this.playbackSpeed !== t;
    ((this.playbackSpeed = t), n && (this.time = At(this.currentTime)));
  }
  play() {
    var a, s;
    if (this.isStopped) return;
    const { driver: t = J2, startTime: n } = this.options;
    (this.driver || (this.driver = t((l) => this.tick(l))),
      (s = (a = this.options).onPlay) == null || s.call(a));
    const i = this.driver.now();
    (this.state === "finished"
      ? (this.updateFinished(), (this.startTime = i))
      : this.holdTime !== null
        ? (this.startTime = i - this.holdTime)
        : this.startTime || (this.startTime = n ?? i),
      this.state === "finished" &&
        this.speed < 0 &&
        (this.startTime += this.calculatedDuration),
      (this.holdTime = null),
      (this.state = "running"),
      this.driver.start());
  }
  pause() {
    ((this.state = "paused"),
      this.updateTime(We.now()),
      (this.holdTime = this.currentTime));
  }
  complete() {
    (this.state !== "running" && this.play(),
      (this.state = "finished"),
      (this.holdTime = null));
  }
  finish() {
    var t, n;
    (this.notifyFinished(),
      this.teardown(),
      (this.state = "finished"),
      (n = (t = this.options).onComplete) == null || n.call(t));
  }
  cancel() {
    var t, n;
    ((this.holdTime = null),
      (this.startTime = 0),
      this.tick(0),
      this.teardown(),
      (n = (t = this.options).onCancel) == null || n.call(t));
  }
  teardown() {
    ((this.state = "idle"),
      this.stopDriver(),
      (this.startTime = this.holdTime = null));
  }
  stopDriver() {
    this.driver && (this.driver.stop(), (this.driver = void 0));
  }
  sample(t) {
    return ((this.startTime = 0), this.tick(t, !0));
  }
  attachTimeline(t) {
    var n;
    return (
      this.options.allowFlatten &&
        ((this.options.type = "keyframes"),
        (this.options.ease = "linear"),
        this.initAnimation()),
      (n = this.driver) == null || n.stop(),
      t.observe(this)
    );
  }
}
function gS(e) {
  for (let t = 1; t < e.length; t++) e[t] ?? (e[t] = e[t - 1]);
}
const si = (e) => (e * 180) / Math.PI,
  Wu = (e) => {
    const t = si(Math.atan2(e[1], e[0]));
    return ec(t);
  },
  vS = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
    rotate: Wu,
    rotateZ: Wu,
    skewX: (e) => si(Math.atan(e[1])),
    skewY: (e) => si(Math.atan(e[2])),
    skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2,
  },
  ec = (e) => ((e = e % 360), e < 0 && (e += 360), e),
  qh = Wu,
  Yh = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]),
  Xh = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]),
  yS = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX: Yh,
    scaleY: Xh,
    scale: (e) => (Yh(e) + Xh(e)) / 2,
    rotateX: (e) => ec(si(Math.atan2(e[6], e[5]))),
    rotateY: (e) => ec(si(Math.atan2(-e[2], e[0]))),
    rotateZ: qh,
    rotate: qh,
    skewX: (e) => si(Math.atan(e[4])),
    skewY: (e) => si(Math.atan(e[1])),
    skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2,
  };
function tc(e) {
  return e.includes("scale") ? 1 : 0;
}
function nc(e, t) {
  if (!e || e === "none") return tc(t);
  const n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let i, a;
  if (n) ((i = yS), (a = n));
  else {
    const r = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    ((i = vS), (a = r));
  }
  if (!a) return tc(t);
  const s = i[t],
    l = a[1].split(",").map(bS);
  return typeof s == "function" ? s(l) : l[s];
}
const xS = (e, t) => {
  const { transform: n = "none" } = getComputedStyle(e);
  return nc(n, t);
};
function bS(e) {
  return parseFloat(e.trim());
}
const Ma = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
  ],
  Aa = new Set(Ma),
  kh = (e) => e === Ea || e === G,
  SS = new Set(["x", "y", "z"]),
  TS = Ma.filter((e) => !SS.has(e));
function wS(e) {
  const t = [];
  return (
    TS.forEach((n) => {
      const i = e.getValue(n);
      i !== void 0 &&
        (t.push([n, i.get()]), i.set(n.startsWith("scale") ? 1 : 0));
    }),
    t
  );
}
const fi = {
  width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0" }) =>
    e.max - e.min - parseFloat(t) - parseFloat(n),
  height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0" }) =>
    e.max - e.min - parseFloat(t) - parseFloat(n),
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  x: (e, { transform: t }) => nc(t, "x"),
  y: (e, { transform: t }) => nc(t, "y"),
};
fi.translateX = fi.x;
fi.translateY = fi.y;
const di = new Set();
let ic = !1,
  ac = !1,
  sc = !1;
function Bv() {
  if (ac) {
    const e = Array.from(di).filter((i) => i.needsMeasurement),
      t = new Set(e.map((i) => i.element)),
      n = new Map();
    (t.forEach((i) => {
      const a = wS(i);
      a.length && (n.set(i, a), i.render());
    }),
      e.forEach((i) => i.measureInitialState()),
      t.forEach((i) => {
        i.render();
        const a = n.get(i);
        a &&
          a.forEach(([s, l]) => {
            var r;
            (r = i.getValue(s)) == null || r.set(l);
          });
      }),
      e.forEach((i) => i.measureEndState()),
      e.forEach((i) => {
        i.suspendedScrollY !== void 0 && window.scrollTo(0, i.suspendedScrollY);
      }));
  }
  ((ac = !1), (ic = !1), di.forEach((e) => e.complete(sc)), di.clear());
}
function Hv() {
  di.forEach((e) => {
    (e.readKeyframes(), e.needsMeasurement && (ac = !0));
  });
}
function ES() {
  ((sc = !0), Hv(), Bv(), (sc = !1));
}
class qf {
  constructor(t, n, i, a, s, l = !1) {
    ((this.state = "pending"),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.unresolvedKeyframes = [...t]),
      (this.onComplete = n),
      (this.name = i),
      (this.motionValue = a),
      (this.element = s),
      (this.isAsync = l));
  }
  scheduleResolve() {
    ((this.state = "scheduled"),
      this.isAsync
        ? (di.add(this),
          ic || ((ic = !0), ce.read(Hv), ce.resolveKeyframes(Bv)))
        : (this.readKeyframes(), this.complete()));
  }
  readKeyframes() {
    const {
      unresolvedKeyframes: t,
      name: n,
      element: i,
      motionValue: a,
    } = this;
    if (t[0] === null) {
      const s = a == null ? void 0 : a.get(),
        l = t[t.length - 1];
      if (s !== void 0) t[0] = s;
      else if (i && n) {
        const r = i.readValue(n, l);
        r != null && (t[0] = r);
      }
      (t[0] === void 0 && (t[0] = l), a && s === void 0 && a.set(t[0]));
    }
    gS(t);
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete(t = !1) {
    ((this.state = "complete"),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t),
      di.delete(this));
  }
  cancel() {
    this.state === "scheduled" && (di.delete(this), (this.state = "pending"));
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const MS = (e) => e.startsWith("--");
function AS(e, t, n) {
  MS(t) ? e.style.setProperty(t, n) : (e.style[t] = n);
}
const CS = jf(() => window.ScrollTimeline !== void 0),
  jS = {};
function NS(e, t) {
  const n = jf(e);
  return () => jS[t] ?? n();
}
const Uv = NS(() => {
    try {
      document
        .createElement("div")
        .animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch {
      return !1;
    }
    return !0;
  }, "linearEasing"),
  qa = ([e, t, n, i]) => `cubic-bezier(${e}, ${t}, ${n}, ${i})`,
  Ph = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: qa([0, 0.65, 0.55, 1]),
    circOut: qa([0.55, 0, 1, 0.45]),
    backIn: qa([0.31, 0.01, 0.66, -0.59]),
    backOut: qa([0.33, 1.53, 0.69, 0.99]),
  };
function Gv(e, t) {
  if (e)
    return typeof e == "function"
      ? Uv()
        ? Vv(e, t)
        : "ease-out"
      : Ev(e)
        ? qa(e)
        : Array.isArray(e)
          ? e.map((n) => Gv(n, t) || Ph.easeOut)
          : Ph[e];
}
function OS(
  e,
  t,
  n,
  {
    delay: i = 0,
    duration: a = 300,
    repeat: s = 0,
    repeatType: l = "loop",
    ease: r = "easeOut",
    times: o,
  } = {},
  u = void 0,
) {
  const c = { [t]: n };
  o && (c.offset = o);
  const f = Gv(r, a);
  Array.isArray(f) && (c.easing = f);
  const h = {
    delay: i,
    duration: a,
    easing: Array.isArray(f) ? "linear" : f,
    fill: "both",
    iterations: s + 1,
    direction: l === "reverse" ? "alternate" : "normal",
  };
  return (u && (h.pseudoElement = u), e.animate(c, h));
}
function qv(e) {
  return typeof e == "function" && "applyToOptions" in e;
}
function DS({ type: e, ...t }) {
  return qv(e) && Uv()
    ? e.applyToOptions(t)
    : (t.duration ?? (t.duration = 300), t.ease ?? (t.ease = "easeOut"), t);
}
class zS extends Uf {
  constructor(t) {
    if ((super(), (this.finishedTime = null), (this.isStopped = !1), !t))
      return;
    const {
      element: n,
      name: i,
      keyframes: a,
      pseudoElement: s,
      allowFlatten: l = !1,
      finalKeyframe: r,
      onComplete: o,
    } = t;
    ((this.isPseudoElement = !!s),
      (this.allowFlatten = l),
      (this.options = t),
      Cf(typeof t.type != "string"));
    const u = DS(t);
    ((this.animation = OS(n, i, a, u, s)),
      u.autoplay === !1 && this.animation.pause(),
      (this.animation.onfinish = () => {
        if (((this.finishedTime = this.time), !s)) {
          const c = Hf(a, this.options, r, this.speed);
          (this.updateMotionValue ? this.updateMotionValue(c) : AS(n, i, c),
            this.animation.cancel());
        }
        (o == null || o(), this.notifyFinished());
      }));
  }
  play() {
    this.isStopped ||
      (this.animation.play(),
      this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    var t, n;
    (n = (t = this.animation).finish) == null || n.call(t);
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {}
  }
  stop() {
    if (this.isStopped) return;
    this.isStopped = !0;
    const { state: t } = this;
    t === "idle" ||
      t === "finished" ||
      (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(),
      this.isPseudoElement || this.cancel());
  }
  commitStyles() {
    var t, n;
    this.isPseudoElement ||
      (n = (t = this.animation).commitStyles) == null ||
      n.call(t);
  }
  get duration() {
    var n, i;
    const t =
      ((i =
        (n = this.animation.effect) == null ? void 0 : n.getComputedTiming) ==
      null
        ? void 0
        : i.call(n).duration) || 0;
    return At(Number(t));
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + At(t);
  }
  get time() {
    return At(Number(this.animation.currentTime) || 0);
  }
  set time(t) {
    ((this.finishedTime = null), (this.animation.currentTime = qt(t)));
  }
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(t) {
    (t < 0 && (this.finishedTime = null), (this.animation.playbackRate = t));
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return Number(this.animation.startTime);
  }
  set startTime(t) {
    this.animation.startTime = t;
  }
  attachTimeline({ timeline: t, observe: n }) {
    var i;
    return (
      this.allowFlatten &&
        ((i = this.animation.effect) == null ||
          i.updateTiming({ easing: "linear" })),
      (this.animation.onfinish = null),
      t && CS() ? ((this.animation.timeline = t), Nt) : n(this)
    );
  }
}
const Yv = { anticipate: bv, backInOut: xv, circInOut: Tv };
function LS(e) {
  return e in Yv;
}
function VS(e) {
  typeof e.ease == "string" && LS(e.ease) && (e.ease = Yv[e.ease]);
}
const Qh = 10;
class _S extends zS {
  constructor(t) {
    (VS(t),
      Rv(t),
      super(t),
      t.startTime && (this.startTime = t.startTime),
      (this.options = t));
  }
  updateMotionValue(t) {
    const {
      motionValue: n,
      onUpdate: i,
      onComplete: a,
      element: s,
      ...l
    } = this.options;
    if (!n) return;
    if (t !== void 0) {
      n.set(t);
      return;
    }
    const r = new Gf({ ...l, autoplay: !1 }),
      o = qt(this.finishedTime ?? this.time);
    (n.setWithVelocity(r.sample(o - Qh).value, r.sample(o).value, Qh),
      r.stop());
  }
}
const Kh = (e, t) =>
  t === "zIndex"
    ? !1
    : !!(
        typeof e == "number" ||
        Array.isArray(e) ||
        (typeof e == "string" &&
          (Kn.test(e) || e === "0") &&
          !e.startsWith("url("))
      );
function RS(e) {
  const t = e[0];
  if (e.length === 1) return !0;
  for (let n = 0; n < e.length; n++) if (e[n] !== t) return !0;
}
function BS(e, t, n, i) {
  const a = e[0];
  if (a === null) return !1;
  if (t === "display" || t === "visibility") return !0;
  const s = e[e.length - 1],
    l = Kh(a, t),
    r = Kh(s, t);
  return !l || !r ? !1 : RS(e) || ((n === "spring" || qv(n)) && i);
}
function lc(e) {
  ((e.duration = 0), (e.type = "keyframes"));
}
const HS = new Set(["opacity", "clipPath", "filter", "transform"]),
  US = jf(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function GS(e) {
  var c;
  const {
    motionValue: t,
    name: n,
    repeatDelay: i,
    repeatType: a,
    damping: s,
    type: l,
  } = e;
  if (
    !(
      ((c = t == null ? void 0 : t.owner) == null
        ? void 0
        : c.current) instanceof HTMLElement
    )
  )
    return !1;
  const { onUpdate: o, transformTemplate: u } = t.owner.getProps();
  return (
    US() &&
    n &&
    HS.has(n) &&
    (n !== "transform" || !u) &&
    !o &&
    !i &&
    a !== "mirror" &&
    s !== 0 &&
    l !== "inertia"
  );
}
const qS = 40;
class YS extends Uf {
  constructor({
    autoplay: t = !0,
    delay: n = 0,
    type: i = "keyframes",
    repeat: a = 0,
    repeatDelay: s = 0,
    repeatType: l = "loop",
    keyframes: r,
    name: o,
    motionValue: u,
    element: c,
    ...f
  }) {
    var y;
    (super(),
      (this.stop = () => {
        var x, T;
        (this._animation &&
          (this._animation.stop(),
          (x = this.stopTimeline) == null || x.call(this)),
          (T = this.keyframeResolver) == null || T.cancel());
      }),
      (this.createdAt = We.now()));
    const h = {
        autoplay: t,
        delay: n,
        type: i,
        repeat: a,
        repeatDelay: s,
        repeatType: l,
        name: o,
        motionValue: u,
        element: c,
        ...f,
      },
      d = (c == null ? void 0 : c.KeyframeResolver) || qf;
    ((this.keyframeResolver = new d(
      r,
      (x, T, m) => this.onKeyframesResolved(x, T, h, !m),
      o,
      u,
      c,
    )),
      (y = this.keyframeResolver) == null || y.scheduleResolve());
  }
  onKeyframesResolved(t, n, i, a) {
    this.keyframeResolver = void 0;
    const {
      name: s,
      type: l,
      velocity: r,
      delay: o,
      isHandoff: u,
      onUpdate: c,
    } = i;
    ((this.resolvedAt = We.now()),
      BS(t, s, l, r) ||
        ((mn.instantAnimations || !o) && (c == null || c(Hf(t, i, n))),
        (t[0] = t[t.length - 1]),
        lc(i),
        (i.repeat = 0)));
    const h = {
        startTime: a
          ? this.resolvedAt
            ? this.resolvedAt - this.createdAt > qS
              ? this.resolvedAt
              : this.createdAt
            : this.createdAt
          : void 0,
        finalKeyframe: n,
        ...i,
        keyframes: t,
      },
      d =
        !u && GS(h)
          ? new _S({ ...h, element: h.motionValue.owner.current })
          : new Gf(h);
    (d.finished.then(() => this.notifyFinished()).catch(Nt),
      this.pendingTimeline &&
        ((this.stopTimeline = d.attachTimeline(this.pendingTimeline)),
        (this.pendingTimeline = void 0)),
      (this._animation = d));
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(t, n) {
    return this.finished.finally(t).then(() => {});
  }
  get animation() {
    var t;
    return (
      this._animation ||
        ((t = this.keyframeResolver) == null || t.resume(), ES()),
      this._animation
    );
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(t) {
    this.animation.time = t;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(t) {
    this.animation.speed = t;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(t) {
    return (
      this._animation
        ? (this.stopTimeline = this.animation.attachTimeline(t))
        : (this.pendingTimeline = t),
      () => this.stop()
    );
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    var t;
    (this._animation && this.animation.cancel(),
      (t = this.keyframeResolver) == null || t.cancel());
  }
}
const XS = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function kS(e) {
  const t = XS.exec(e);
  if (!t) return [,];
  const [, n, i, a] = t;
  return [`--${n ?? i}`, a];
}
function Xv(e, t, n = 1) {
  const [i, a] = kS(e);
  if (!i) return;
  const s = window.getComputedStyle(t).getPropertyValue(i);
  if (s) {
    const l = s.trim();
    return fv(l) ? parseFloat(l) : l;
  }
  return Lf(a) ? Xv(a, t, n + 1) : a;
}
function Yf(e, t) {
  return (e == null ? void 0 : e[t]) ?? (e == null ? void 0 : e.default) ?? e;
}
const kv = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    ...Ma,
  ]),
  PS = { test: (e) => e === "auto", parse: (e) => e },
  Pv = (e) => (t) => t.test(e),
  Qv = [Ea, G, Yt, bn, R2, _2, PS],
  Zh = (e) => Qv.find(Pv(e));
function QS(e) {
  return typeof e == "number"
    ? e === 0
    : e !== null
      ? e === "none" || e === "0" || hv(e)
      : !0;
}
const KS = new Set(["brightness", "contrast", "saturate", "opacity"]);
function ZS(e) {
  const [t, n] = e.slice(0, -1).split("(");
  if (t === "drop-shadow") return e;
  const [i] = n.match(Vf) || [];
  if (!i) return e;
  const a = n.replace(i, "");
  let s = KS.has(t) ? 1 : 0;
  return (i !== n && (s *= 100), t + "(" + s + a + ")");
}
const FS = /\b([a-z-]*)\(.*?\)/gu,
  rc = {
    ...Kn,
    getAnimatableNone: (e) => {
      const t = e.match(FS);
      return t ? t.map(ZS).join(" ") : e;
    },
  },
  Fh = { ...Ea, transform: Math.round },
  $S = {
    rotate: bn,
    rotateX: bn,
    rotateY: bn,
    rotateZ: bn,
    scale: ul,
    scaleX: ul,
    scaleY: ul,
    scaleZ: ul,
    skew: bn,
    skewX: bn,
    skewY: bn,
    distance: G,
    translateX: G,
    translateY: G,
    translateZ: G,
    x: G,
    y: G,
    z: G,
    perspective: G,
    transformPerspective: G,
    opacity: ws,
    originX: Rh,
    originY: Rh,
    originZ: G,
  },
  Xf = {
    borderWidth: G,
    borderTopWidth: G,
    borderRightWidth: G,
    borderBottomWidth: G,
    borderLeftWidth: G,
    borderRadius: G,
    radius: G,
    borderTopLeftRadius: G,
    borderTopRightRadius: G,
    borderBottomRightRadius: G,
    borderBottomLeftRadius: G,
    width: G,
    maxWidth: G,
    height: G,
    maxHeight: G,
    top: G,
    right: G,
    bottom: G,
    left: G,
    padding: G,
    paddingTop: G,
    paddingRight: G,
    paddingBottom: G,
    paddingLeft: G,
    margin: G,
    marginTop: G,
    marginRight: G,
    marginBottom: G,
    marginLeft: G,
    backgroundPositionX: G,
    backgroundPositionY: G,
    ...$S,
    zIndex: Fh,
    fillOpacity: ws,
    strokeOpacity: ws,
    numOctaves: Fh,
  },
  IS = {
    ...Xf,
    color: Se,
    backgroundColor: Se,
    outlineColor: Se,
    fill: Se,
    stroke: Se,
    borderColor: Se,
    borderTopColor: Se,
    borderRightColor: Se,
    borderBottomColor: Se,
    borderLeftColor: Se,
    filter: rc,
    WebkitFilter: rc,
  },
  Kv = (e) => IS[e];
function Zv(e, t) {
  let n = Kv(e);
  return (
    n !== rc && (n = Kn),
    n.getAnimatableNone ? n.getAnimatableNone(t) : void 0
  );
}
const JS = new Set(["auto", "none", "0"]);
function WS(e, t, n) {
  let i = 0,
    a;
  for (; i < e.length && !a; ) {
    const s = e[i];
    (typeof s == "string" && !JS.has(s) && Es(s).values.length && (a = e[i]),
      i++);
  }
  if (a && n) for (const s of t) e[s] = Zv(n, a);
}
class eT extends qf {
  constructor(t, n, i, a, s) {
    super(t, n, i, a, s, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: n, name: i } = this;
    if (!n || !n.current) return;
    super.readKeyframes();
    for (let o = 0; o < t.length; o++) {
      let u = t[o];
      if (typeof u == "string" && ((u = u.trim()), Lf(u))) {
        const c = Xv(u, n.current);
        (c !== void 0 && (t[o] = c),
          o === t.length - 1 && (this.finalKeyframe = u));
      }
    }
    if ((this.resolveNoneKeyframes(), !kv.has(i) || t.length !== 2)) return;
    const [a, s] = t,
      l = Zh(a),
      r = Zh(s);
    if (l !== r)
      if (kh(l) && kh(r))
        for (let o = 0; o < t.length; o++) {
          const u = t[o];
          typeof u == "string" && (t[o] = parseFloat(u));
        }
      else fi[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: n } = this,
      i = [];
    for (let a = 0; a < t.length; a++) (t[a] === null || QS(t[a])) && i.push(a);
    i.length && WS(t, i, n);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: n, name: i } = this;
    if (!t || !t.current) return;
    (i === "height" && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = fi[i](
        t.measureViewportBox(),
        window.getComputedStyle(t.current),
      )),
      (n[0] = this.measuredOrigin));
    const a = n[n.length - 1];
    a !== void 0 && t.getValue(i, a).jump(a, !1);
  }
  measureEndState() {
    var r;
    const { element: t, name: n, unresolvedKeyframes: i } = this;
    if (!t || !t.current) return;
    const a = t.getValue(n);
    a && a.jump(this.measuredOrigin, !1);
    const s = i.length - 1,
      l = i[s];
    ((i[s] = fi[n](t.measureViewportBox(), window.getComputedStyle(t.current))),
      l !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = l),
      (r = this.removedTransforms) != null &&
        r.length &&
        this.removedTransforms.forEach(([o, u]) => {
          t.getValue(o).set(u);
        }),
      this.resolveNoneKeyframes());
  }
}
function tT(e, t, n) {
  if (e instanceof EventTarget) return [e];
  if (typeof e == "string") {
    let i = document;
    const a = (n == null ? void 0 : n[e]) ?? i.querySelectorAll(e);
    return a ? Array.from(a) : [];
  }
  return Array.from(e);
}
const Fv = (e, t) => (t && typeof e == "number" ? t.transform(e) : e);
function $v(e) {
  return dv(e) && "offsetHeight" in e;
}
const $h = 30,
  nT = (e) => !isNaN(parseFloat(e));
class iT {
  constructor(t, n = {}) {
    ((this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (i) => {
        var s;
        const a = We.now();
        if (
          (this.updatedAt !== a && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(i),
          this.current !== this.prev &&
            ((s = this.events.change) == null || s.notify(this.current),
            this.dependents))
        )
          for (const l of this.dependents) l.dirty();
      }),
      (this.hasAnimated = !1),
      this.setCurrent(t),
      (this.owner = n.owner));
  }
  setCurrent(t) {
    ((this.current = t),
      (this.updatedAt = We.now()),
      this.canTrackVelocity === null &&
        t !== void 0 &&
        (this.canTrackVelocity = nT(this.current)));
  }
  setPrevFrameValue(t = this.current) {
    ((this.prevFrameValue = t), (this.prevUpdatedAt = this.updatedAt));
  }
  onChange(t) {
    return this.on("change", t);
  }
  on(t, n) {
    this.events[t] || (this.events[t] = new Nf());
    const i = this.events[t].add(n);
    return t === "change"
      ? () => {
          (i(),
            ce.read(() => {
              this.events.change.getSize() || this.stop();
            }));
        }
      : i;
  }
  clearListeners() {
    for (const t in this.events) this.events[t].clear();
  }
  attach(t, n) {
    ((this.passiveEffect = t), (this.stopPassiveEffect = n));
  }
  set(t) {
    this.passiveEffect
      ? this.passiveEffect(t, this.updateAndNotify)
      : this.updateAndNotify(t);
  }
  setWithVelocity(t, n, i) {
    (this.set(n),
      (this.prev = void 0),
      (this.prevFrameValue = t),
      (this.prevUpdatedAt = this.updatedAt - i));
  }
  jump(t, n = !0) {
    (this.updateAndNotify(t),
      (this.prev = t),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      n && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect());
  }
  dirty() {
    var t;
    (t = this.events.change) == null || t.notify(this.current);
  }
  addDependent(t) {
    (this.dependents || (this.dependents = new Set()), this.dependents.add(t));
  }
  removeDependent(t) {
    this.dependents && this.dependents.delete(t);
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    const t = We.now();
    if (
      !this.canTrackVelocity ||
      this.prevFrameValue === void 0 ||
      t - this.updatedAt > $h
    )
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, $h);
    return mv(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  start(t) {
    return (
      this.stop(),
      new Promise((n) => {
        ((this.hasAnimated = !0),
          (this.animation = t(n)),
          this.events.animationStart && this.events.animationStart.notify());
      }).then(() => {
        (this.events.animationComplete &&
          this.events.animationComplete.notify(),
          this.clearAnimation());
      })
    );
  }
  stop() {
    (this.animation &&
      (this.animation.stop(),
      this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation());
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    var t, n;
    ((t = this.dependents) == null || t.clear(),
      (n = this.events.destroy) == null || n.notify(),
      this.clearListeners(),
      this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect());
  }
}
function ha(e, t) {
  return new iT(e, t);
}
const { schedule: kf } = Mv(queueMicrotask, !1),
  zt = { x: !1, y: !1 };
function Iv() {
  return zt.x || zt.y;
}
function aT(e) {
  return e === "x" || e === "y"
    ? zt[e]
      ? null
      : ((zt[e] = !0),
        () => {
          zt[e] = !1;
        })
    : zt.x || zt.y
      ? null
      : ((zt.x = zt.y = !0),
        () => {
          zt.x = zt.y = !1;
        });
}
function Jv(e, t) {
  const n = tT(e),
    i = new AbortController(),
    a = { passive: !0, ...t, signal: i.signal };
  return [n, a, () => i.abort()];
}
function Ih(e) {
  return !(e.pointerType === "touch" || Iv());
}
function sT(e, t, n = {}) {
  const [i, a, s] = Jv(e, n),
    l = (r) => {
      if (!Ih(r)) return;
      const { target: o } = r,
        u = t(o, r);
      if (typeof u != "function" || !o) return;
      const c = (f) => {
        Ih(f) && (u(f), o.removeEventListener("pointerleave", c));
      };
      o.addEventListener("pointerleave", c, a);
    };
  return (
    i.forEach((r) => {
      r.addEventListener("pointerenter", l, a);
    }),
    s
  );
}
const Wv = (e, t) => (t ? (e === t ? !0 : Wv(e, t.parentElement)) : !1),
  Pf = (e) =>
    e.pointerType === "mouse"
      ? typeof e.button != "number" || e.button <= 0
      : e.isPrimary !== !1,
  lT = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);
function rT(e) {
  return lT.has(e.tagName) || e.tabIndex !== -1;
}
const Ol = new WeakSet();
function Jh(e) {
  return (t) => {
    t.key === "Enter" && e(t);
  };
}
function Ro(e, t) {
  e.dispatchEvent(
    new PointerEvent("pointer" + t, { isPrimary: !0, bubbles: !0 }),
  );
}
const oT = (e, t) => {
  const n = e.currentTarget;
  if (!n) return;
  const i = Jh(() => {
    if (Ol.has(n)) return;
    Ro(n, "down");
    const a = Jh(() => {
        Ro(n, "up");
      }),
      s = () => Ro(n, "cancel");
    (n.addEventListener("keyup", a, t), n.addEventListener("blur", s, t));
  });
  (n.addEventListener("keydown", i, t),
    n.addEventListener("blur", () => n.removeEventListener("keydown", i), t));
};
function Wh(e) {
  return Pf(e) && !Iv();
}
function uT(e, t, n = {}) {
  const [i, a, s] = Jv(e, n),
    l = (r) => {
      const o = r.currentTarget;
      if (!Wh(r)) return;
      Ol.add(o);
      const u = t(o, r),
        c = (d, y) => {
          (window.removeEventListener("pointerup", f),
            window.removeEventListener("pointercancel", h),
            Ol.has(o) && Ol.delete(o),
            Wh(d) && typeof u == "function" && u(d, { success: y }));
        },
        f = (d) => {
          c(
            d,
            o === window ||
              o === document ||
              n.useGlobalTarget ||
              Wv(o, d.target),
          );
        },
        h = (d) => {
          c(d, !1);
        };
      (window.addEventListener("pointerup", f, a),
        window.addEventListener("pointercancel", h, a));
    };
  return (
    i.forEach((r) => {
      ((n.useGlobalTarget ? window : r).addEventListener("pointerdown", l, a),
        $v(r) &&
          (r.addEventListener("focus", (u) => oT(u, a)),
          !rT(r) && !r.hasAttribute("tabindex") && (r.tabIndex = 0)));
    }),
    s
  );
}
function ey(e) {
  return dv(e) && "ownerSVGElement" in e;
}
function cT(e) {
  return ey(e) && e.tagName === "svg";
}
const Ge = (e) => !!(e && e.getVelocity),
  fT = [...Qv, Se, Kn],
  dT = (e) => fT.find(Pv(e)),
  Qf = L.createContext({
    transformPagePoint: (e) => e,
    isStatic: !1,
    reducedMotion: "never",
  });
function em(e, t) {
  if (typeof e == "function") return e(t);
  e != null && (e.current = t);
}
function hT(...e) {
  return (t) => {
    let n = !1;
    const i = e.map((a) => {
      const s = em(a, t);
      return (!n && typeof s == "function" && (n = !0), s);
    });
    if (n)
      return () => {
        for (let a = 0; a < i.length; a++) {
          const s = i[a];
          typeof s == "function" ? s() : em(e[a], null);
        }
      };
  };
}
function mT(...e) {
  return L.useCallback(hT(...e), e);
}
class pT extends L.Component {
  getSnapshotBeforeUpdate(t) {
    const n = this.props.childRef.current;
    if (n && t.isPresent && !this.props.isPresent) {
      const i = n.offsetParent,
        a = ($v(i) && i.offsetWidth) || 0,
        s = this.props.sizeRef.current;
      ((s.height = n.offsetHeight || 0),
        (s.width = n.offsetWidth || 0),
        (s.top = n.offsetTop),
        (s.left = n.offsetLeft),
        (s.right = a - s.width - s.left));
    }
    return null;
  }
  componentDidUpdate() {}
  render() {
    return this.props.children;
  }
}
function gT({ children: e, isPresent: t, anchorX: n, root: i }) {
  const a = L.useId(),
    s = L.useRef(null),
    l = L.useRef({ width: 0, height: 0, top: 0, left: 0, right: 0 }),
    { nonce: r } = L.useContext(Qf),
    o = mT(s, e == null ? void 0 : e.ref);
  return (
    L.useInsertionEffect(() => {
      const { width: u, height: c, top: f, left: h, right: d } = l.current;
      if (t || !s.current || !u || !c) return;
      const y = n === "left" ? `left: ${h}` : `right: ${d}`;
      s.current.dataset.motionPopId = a;
      const x = document.createElement("style");
      r && (x.nonce = r);
      const T = i ?? document.head;
      return (
        T.appendChild(x),
        x.sheet &&
          x.sheet.insertRule(`
          [data-motion-pop-id="${a}"] {
            position: absolute !important;
            width: ${u}px !important;
            height: ${c}px !important;
            ${y}px !important;
            top: ${f}px !important;
          }
        `),
        () => {
          T.contains(x) && T.removeChild(x);
        }
      );
    }, [t]),
    g.jsx(pT, {
      isPresent: t,
      childRef: s,
      sizeRef: l,
      children: L.cloneElement(e, { ref: o }),
    })
  );
}
const vT = ({
  children: e,
  initial: t,
  isPresent: n,
  onExitComplete: i,
  custom: a,
  presenceAffectsLayout: s,
  mode: l,
  anchorX: r,
  root: o,
}) => {
  const u = wf(yT),
    c = L.useId();
  let f = !0,
    h = L.useMemo(
      () => (
        (f = !1),
        {
          id: c,
          initial: t,
          isPresent: n,
          custom: a,
          onExitComplete: (d) => {
            u.set(d, !0);
            for (const y of u.values()) if (!y) return;
            i && i();
          },
          register: (d) => (u.set(d, !1), () => u.delete(d)),
        }
      ),
      [n, u, i],
    );
  return (
    s && f && (h = { ...h }),
    L.useMemo(() => {
      u.forEach((d, y) => u.set(y, !1));
    }, [n]),
    L.useEffect(() => {
      !n && !u.size && i && i();
    }, [n]),
    l === "popLayout" &&
      (e = g.jsx(gT, { isPresent: n, anchorX: r, root: o, children: e })),
    g.jsx(Gr.Provider, { value: h, children: e })
  );
};
function yT() {
  return new Map();
}
function ty(e = !0) {
  const t = L.useContext(Gr);
  if (t === null) return [!0, null];
  const { isPresent: n, onExitComplete: i, register: a } = t,
    s = L.useId();
  L.useEffect(() => {
    if (e) return a(s);
  }, [e]);
  const l = L.useCallback(() => e && i && i(s), [s, i, e]);
  return !n && i ? [!1, l] : [!0];
}
const cl = (e) => e.key || "";
function tm(e) {
  const t = [];
  return (
    L.Children.forEach(e, (n) => {
      L.isValidElement(n) && t.push(n);
    }),
    t
  );
}
const ny = ({
    children: e,
    custom: t,
    initial: n = !0,
    onExitComplete: i,
    presenceAffectsLayout: a = !0,
    mode: s = "sync",
    propagate: l = !1,
    anchorX: r = "left",
    root: o,
  }) => {
    const [u, c] = ty(l),
      f = L.useMemo(() => tm(e), [e]),
      h = l && !u ? [] : f.map(cl),
      d = L.useRef(!0),
      y = L.useRef(f),
      x = wf(() => new Map()),
      [T, m] = L.useState(f),
      [p, v] = L.useState(f);
    cv(() => {
      ((d.current = !1), (y.current = f));
      for (let M = 0; M < p.length; M++) {
        const E = cl(p[M]);
        h.includes(E) ? x.delete(E) : x.get(E) !== !0 && x.set(E, !1);
      }
    }, [p, h.length, h.join("-")]);
    const b = [];
    if (f !== T) {
      let M = [...f];
      for (let E = 0; E < p.length; E++) {
        const S = p[E],
          O = cl(S);
        h.includes(O) || (M.splice(E, 0, S), b.push(S));
      }
      return (s === "wait" && b.length && (M = b), v(tm(M)), m(f), null);
    }
    const { forceRender: w } = L.useContext(Tf);
    return g.jsx(g.Fragment, {
      children: p.map((M) => {
        const E = cl(M),
          S = l && !u ? !1 : f === p || h.includes(E),
          O = () => {
            if (x.has(E)) x.set(E, !0);
            else return;
            let C = !0;
            (x.forEach((A) => {
              A || (C = !1);
            }),
              C &&
                (w == null || w(),
                v(y.current),
                l && (c == null || c()),
                i && i()));
          };
        return g.jsx(
          vT,
          {
            isPresent: S,
            initial: !d.current || n ? void 0 : !1,
            custom: t,
            presenceAffectsLayout: a,
            mode: s,
            root: o,
            onExitComplete: S ? void 0 : O,
            anchorX: r,
            children: M,
          },
          E,
        );
      }),
    });
  },
  iy = L.createContext({ strict: !1 }),
  nm = {
    animation: [
      "animate",
      "variants",
      "whileHover",
      "whileTap",
      "exit",
      "whileInView",
      "whileFocus",
      "whileDrag",
    ],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"],
  },
  ma = {};
for (const e in nm) ma[e] = { isEnabled: (t) => nm[e].some((n) => !!t[n]) };
function xT(e) {
  for (const t in e) ma[t] = { ...ma[t], ...e[t] };
}
const bT = new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport",
]);
function dr(e) {
  return (
    e.startsWith("while") ||
    (e.startsWith("drag") && e !== "draggable") ||
    e.startsWith("layout") ||
    e.startsWith("onTap") ||
    e.startsWith("onPan") ||
    e.startsWith("onLayout") ||
    bT.has(e)
  );
}
let ay = (e) => !dr(e);
function ST(e) {
  typeof e == "function" && (ay = (t) => (t.startsWith("on") ? !dr(t) : e(t)));
}
try {
  ST(require("@emotion/is-prop-valid").default);
} catch {}
function TT(e, t, n) {
  const i = {};
  for (const a in e)
    (a === "values" && typeof e.values == "object") ||
      ((ay(a) ||
        (n === !0 && dr(a)) ||
        (!t && !dr(a)) ||
        (e.draggable && a.startsWith("onDrag"))) &&
        (i[a] = e[a]));
  return i;
}
const qr = L.createContext({});
function Yr(e) {
  return e !== null && typeof e == "object" && typeof e.start == "function";
}
function Ms(e) {
  return typeof e == "string" || Array.isArray(e);
}
const Kf = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit",
  ],
  Zf = ["initial", ...Kf];
function Xr(e) {
  return Yr(e.animate) || Zf.some((t) => Ms(e[t]));
}
function sy(e) {
  return !!(Xr(e) || e.variants);
}
function wT(e, t) {
  if (Xr(e)) {
    const { initial: n, animate: i } = e;
    return {
      initial: n === !1 || Ms(n) ? n : void 0,
      animate: Ms(i) ? i : void 0,
    };
  }
  return e.inherit !== !1 ? t : {};
}
function ET(e) {
  const { initial: t, animate: n } = wT(e, L.useContext(qr));
  return L.useMemo(() => ({ initial: t, animate: n }), [im(t), im(n)]);
}
function im(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
const As = {};
function MT(e) {
  for (const t in e) ((As[t] = e[t]), zf(t) && (As[t].isCSSVariable = !0));
}
function ly(e, { layout: t, layoutId: n }) {
  return (
    Aa.has(e) ||
    e.startsWith("origin") ||
    ((t || n !== void 0) && (!!As[e] || e === "opacity"))
  );
}
const AT = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
  },
  CT = Ma.length;
function jT(e, t, n) {
  let i = "",
    a = !0;
  for (let s = 0; s < CT; s++) {
    const l = Ma[s],
      r = e[l];
    if (r === void 0) continue;
    let o = !0;
    if (
      (typeof r == "number"
        ? (o = r === (l.startsWith("scale") ? 1 : 0))
        : (o = parseFloat(r) === 0),
      !o || n)
    ) {
      const u = Fv(r, Xf[l]);
      if (!o) {
        a = !1;
        const c = AT[l] || l;
        i += `${c}(${u}) `;
      }
      n && (t[l] = u);
    }
  }
  return ((i = i.trim()), n ? (i = n(t, a ? "" : i)) : a && (i = "none"), i);
}
function Ff(e, t, n) {
  const { style: i, vars: a, transformOrigin: s } = e;
  let l = !1,
    r = !1;
  for (const o in t) {
    const u = t[o];
    if (Aa.has(o)) {
      l = !0;
      continue;
    } else if (zf(o)) {
      a[o] = u;
      continue;
    } else {
      const c = Fv(u, Xf[o]);
      o.startsWith("origin") ? ((r = !0), (s[o] = c)) : (i[o] = c);
    }
  }
  if (
    (t.transform ||
      (l || n
        ? (i.transform = jT(t, e.transform, n))
        : i.transform && (i.transform = "none")),
    r)
  ) {
    const { originX: o = "50%", originY: u = "50%", originZ: c = 0 } = s;
    i.transformOrigin = `${o} ${u} ${c}`;
  }
}
const $f = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
function ry(e, t, n) {
  for (const i in t) !Ge(t[i]) && !ly(i, n) && (e[i] = t[i]);
}
function NT({ transformTemplate: e }, t) {
  return L.useMemo(() => {
    const n = $f();
    return (Ff(n, t, e), Object.assign({}, n.vars, n.style));
  }, [t]);
}
function OT(e, t) {
  const n = e.style || {},
    i = {};
  return (ry(i, n, e), Object.assign(i, NT(e, t)), i);
}
function DT(e, t) {
  const n = {},
    i = OT(e, t);
  return (
    e.drag &&
      e.dragListener !== !1 &&
      ((n.draggable = !1),
      (i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none"),
      (i.touchAction =
        e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`)),
    e.tabIndex === void 0 &&
      (e.onTap || e.onTapStart || e.whileTap) &&
      (n.tabIndex = 0),
    (n.style = i),
    n
  );
}
const zT = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
  LT = { offset: "strokeDashoffset", array: "strokeDasharray" };
function VT(e, t, n = 1, i = 0, a = !0) {
  e.pathLength = 1;
  const s = a ? zT : LT;
  e[s.offset] = G.transform(-i);
  const l = G.transform(t),
    r = G.transform(n);
  e[s.array] = `${l} ${r}`;
}
function oy(
  e,
  {
    attrX: t,
    attrY: n,
    attrScale: i,
    pathLength: a,
    pathSpacing: s = 1,
    pathOffset: l = 0,
    ...r
  },
  o,
  u,
  c,
) {
  if ((Ff(e, r, u), o)) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  ((e.attrs = e.style), (e.style = {}));
  const { attrs: f, style: h } = e;
  (f.transform && ((h.transform = f.transform), delete f.transform),
    (h.transform || f.transformOrigin) &&
      ((h.transformOrigin = f.transformOrigin ?? "50% 50%"),
      delete f.transformOrigin),
    h.transform &&
      ((h.transformBox = (c == null ? void 0 : c.transformBox) ?? "fill-box"),
      delete f.transformBox),
    t !== void 0 && (f.x = t),
    n !== void 0 && (f.y = n),
    i !== void 0 && (f.scale = i),
    a !== void 0 && VT(f, a, s, l, !1));
}
const uy = () => ({ ...$f(), attrs: {} }),
  cy = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function _T(e, t, n, i) {
  const a = L.useMemo(() => {
    const s = uy();
    return (
      oy(s, t, cy(i), e.transformTemplate, e.style),
      { ...s.attrs, style: { ...s.style } }
    );
  }, [t]);
  if (e.style) {
    const s = {};
    (ry(s, e.style, e), (a.style = { ...s, ...a.style }));
  }
  return a;
}
const RT = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view",
];
function If(e) {
  return typeof e != "string" || e.includes("-")
    ? !1
    : !!(RT.indexOf(e) > -1 || /[A-Z]/u.test(e));
}
function BT(e, t, n, { latestValues: i }, a, s = !1) {
  const r = (If(e) ? _T : DT)(t, i, a, e),
    o = TT(t, typeof e == "string", s),
    u = e !== L.Fragment ? { ...o, ...r, ref: n } : {},
    { children: c } = t,
    f = L.useMemo(() => (Ge(c) ? c.get() : c), [c]);
  return L.createElement(e, { ...u, children: f });
}
function am(e) {
  const t = [{}, {}];
  return (
    e == null ||
      e.values.forEach((n, i) => {
        ((t[0][i] = n.get()), (t[1][i] = n.getVelocity()));
      }),
    t
  );
}
function Jf(e, t, n, i) {
  if (typeof t == "function") {
    const [a, s] = am(i);
    t = t(n !== void 0 ? n : e.custom, a, s);
  }
  if (
    (typeof t == "string" && (t = e.variants && e.variants[t]),
    typeof t == "function")
  ) {
    const [a, s] = am(i);
    t = t(n !== void 0 ? n : e.custom, a, s);
  }
  return t;
}
function Dl(e) {
  return Ge(e) ? e.get() : e;
}
function HT({ scrapeMotionValuesFromProps: e, createRenderState: t }, n, i, a) {
  return { latestValues: UT(n, i, a, e), renderState: t() };
}
function UT(e, t, n, i) {
  const a = {},
    s = i(e, {});
  for (const h in s) a[h] = Dl(s[h]);
  let { initial: l, animate: r } = e;
  const o = Xr(e),
    u = sy(e);
  t &&
    u &&
    !o &&
    e.inherit !== !1 &&
    (l === void 0 && (l = t.initial), r === void 0 && (r = t.animate));
  let c = n ? n.initial === !1 : !1;
  c = c || l === !1;
  const f = c ? r : l;
  if (f && typeof f != "boolean" && !Yr(f)) {
    const h = Array.isArray(f) ? f : [f];
    for (let d = 0; d < h.length; d++) {
      const y = Jf(e, h[d]);
      if (y) {
        const { transitionEnd: x, transition: T, ...m } = y;
        for (const p in m) {
          let v = m[p];
          if (Array.isArray(v)) {
            const b = c ? v.length - 1 : 0;
            v = v[b];
          }
          v !== null && (a[p] = v);
        }
        for (const p in x) a[p] = x[p];
      }
    }
  }
  return a;
}
const fy = (e) => (t, n) => {
  const i = L.useContext(qr),
    a = L.useContext(Gr),
    s = () => HT(e, t, i, a);
  return n ? s() : wf(s);
};
function Wf(e, t, n) {
  var s;
  const { style: i } = e,
    a = {};
  for (const l in i)
    (Ge(i[l]) ||
      (t.style && Ge(t.style[l])) ||
      ly(l, e) ||
      ((s = n == null ? void 0 : n.getValue(l)) == null
        ? void 0
        : s.liveStyle) !== void 0) &&
      (a[l] = i[l]);
  return a;
}
const GT = fy({ scrapeMotionValuesFromProps: Wf, createRenderState: $f });
function dy(e, t, n) {
  const i = Wf(e, t, n);
  for (const a in e)
    if (Ge(e[a]) || Ge(t[a])) {
      const s =
        Ma.indexOf(a) !== -1
          ? "attr" + a.charAt(0).toUpperCase() + a.substring(1)
          : a;
      i[s] = e[a];
    }
  return i;
}
const qT = fy({ scrapeMotionValuesFromProps: dy, createRenderState: uy }),
  YT = Symbol.for("motionComponentSymbol");
function Xi(e) {
  return (
    e &&
    typeof e == "object" &&
    Object.prototype.hasOwnProperty.call(e, "current")
  );
}
function XT(e, t, n) {
  return L.useCallback(
    (i) => {
      (i && e.onMount && e.onMount(i),
        t && (i ? t.mount(i) : t.unmount()),
        n && (typeof n == "function" ? n(i) : Xi(n) && (n.current = i)));
    },
    [t],
  );
}
const ed = (e) => e.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(),
  kT = "framerAppearId",
  hy = "data-" + ed(kT),
  my = L.createContext({});
function PT(e, t, n, i, a) {
  var x, T;
  const { visualElement: s } = L.useContext(qr),
    l = L.useContext(iy),
    r = L.useContext(Gr),
    o = L.useContext(Qf).reducedMotion,
    u = L.useRef(null);
  ((i = i || l.renderer),
    !u.current &&
      i &&
      (u.current = i(e, {
        visualState: t,
        parent: s,
        props: n,
        presenceContext: r,
        blockInitialAnimation: r ? r.initial === !1 : !1,
        reducedMotionConfig: o,
      })));
  const c = u.current,
    f = L.useContext(my);
  c &&
    !c.projection &&
    a &&
    (c.type === "html" || c.type === "svg") &&
    QT(u.current, n, a, f);
  const h = L.useRef(!1);
  L.useInsertionEffect(() => {
    c && h.current && c.update(n, r);
  });
  const d = n[hy],
    y = L.useRef(
      !!d &&
        !((x = window.MotionHandoffIsComplete) != null && x.call(window, d)) &&
        ((T = window.MotionHasOptimisedAnimation) == null
          ? void 0
          : T.call(window, d)),
    );
  return (
    cv(() => {
      c &&
        ((h.current = !0),
        (window.MotionIsMounted = !0),
        c.updateFeatures(),
        c.scheduleRenderMicrotask(),
        y.current && c.animationState && c.animationState.animateChanges());
    }),
    L.useEffect(() => {
      c &&
        (!y.current && c.animationState && c.animationState.animateChanges(),
        y.current &&
          (queueMicrotask(() => {
            var m;
            (m = window.MotionHandoffMarkAsComplete) == null ||
              m.call(window, d);
          }),
          (y.current = !1)),
        (c.enteringChildren = void 0));
    }),
    c
  );
}
function QT(e, t, n, i) {
  const {
    layoutId: a,
    layout: s,
    drag: l,
    dragConstraints: r,
    layoutScroll: o,
    layoutRoot: u,
    layoutCrossfade: c,
  } = t;
  ((e.projection = new n(
    e.latestValues,
    t["data-framer-portal-id"] ? void 0 : py(e.parent),
  )),
    e.projection.setOptions({
      layoutId: a,
      layout: s,
      alwaysMeasureLayout: !!l || (r && Xi(r)),
      visualElement: e,
      animationType: typeof s == "string" ? s : "both",
      initialPromotionConfig: i,
      crossfade: c,
      layoutScroll: o,
      layoutRoot: u,
    }));
}
function py(e) {
  if (e) return e.options.allowProjection !== !1 ? e.projection : py(e.parent);
}
function Bo(e, { forwardMotionProps: t = !1 } = {}, n, i) {
  n && xT(n);
  const a = If(e) ? qT : GT;
  function s(r, o) {
    let u;
    const c = { ...L.useContext(Qf), ...r, layoutId: KT(r) },
      { isStatic: f } = c,
      h = ET(r),
      d = a(r, f);
    if (!f && Ef) {
      ZT();
      const y = FT(c);
      ((u = y.MeasureLayout),
        (h.visualElement = PT(e, d, c, i, y.ProjectionNode)));
    }
    return g.jsxs(qr.Provider, {
      value: h,
      children: [
        u && h.visualElement
          ? g.jsx(u, { visualElement: h.visualElement, ...c })
          : null,
        BT(e, r, XT(d, h.visualElement, o), d, f, t),
      ],
    });
  }
  s.displayName = `motion.${typeof e == "string" ? e : `create(${e.displayName ?? e.name ?? ""})`}`;
  const l = L.forwardRef(s);
  return ((l[YT] = e), l);
}
function KT({ layoutId: e }) {
  const t = L.useContext(Tf).id;
  return t && e !== void 0 ? t + "-" + e : e;
}
function ZT(e, t) {
  L.useContext(iy).strict;
}
function FT(e) {
  const { drag: t, layout: n } = ma;
  if (!t && !n) return {};
  const i = { ...t, ...n };
  return {
    MeasureLayout:
      (t != null && t.isEnabled(e)) || (n != null && n.isEnabled(e))
        ? i.MeasureLayout
        : void 0,
    ProjectionNode: i.ProjectionNode,
  };
}
function $T(e, t) {
  if (typeof Proxy > "u") return Bo;
  const n = new Map(),
    i = (s, l) => Bo(s, l, e, t),
    a = (s, l) => i(s, l);
  return new Proxy(a, {
    get: (s, l) =>
      l === "create"
        ? i
        : (n.has(l) || n.set(l, Bo(l, void 0, e, t)), n.get(l)),
  });
}
function gy({ top: e, left: t, right: n, bottom: i }) {
  return { x: { min: t, max: n }, y: { min: e, max: i } };
}
function IT({ x: e, y: t }) {
  return { top: t.min, right: e.max, bottom: t.max, left: e.min };
}
function JT(e, t) {
  if (!t) return e;
  const n = t({ x: e.left, y: e.top }),
    i = t({ x: e.right, y: e.bottom });
  return { top: n.y, left: n.x, bottom: i.y, right: i.x };
}
function Ho(e) {
  return e === void 0 || e === 1;
}
function oc({ scale: e, scaleX: t, scaleY: n }) {
  return !Ho(e) || !Ho(t) || !Ho(n);
}
function ii(e) {
  return (
    oc(e) ||
    vy(e) ||
    e.z ||
    e.rotate ||
    e.rotateX ||
    e.rotateY ||
    e.skewX ||
    e.skewY
  );
}
function vy(e) {
  return sm(e.x) || sm(e.y);
}
function sm(e) {
  return e && e !== "0%";
}
function hr(e, t, n) {
  const i = e - n,
    a = t * i;
  return n + a;
}
function lm(e, t, n, i, a) {
  return (a !== void 0 && (e = hr(e, a, i)), hr(e, n, i) + t);
}
function uc(e, t = 0, n = 1, i, a) {
  ((e.min = lm(e.min, t, n, i, a)), (e.max = lm(e.max, t, n, i, a)));
}
function yy(e, { x: t, y: n }) {
  (uc(e.x, t.translate, t.scale, t.originPoint),
    uc(e.y, n.translate, n.scale, n.originPoint));
}
const rm = 0.999999999999,
  om = 1.0000000000001;
function WT(e, t, n, i = !1) {
  const a = n.length;
  if (!a) return;
  t.x = t.y = 1;
  let s, l;
  for (let r = 0; r < a; r++) {
    ((s = n[r]), (l = s.projectionDelta));
    const { visualElement: o } = s.options;
    (o && o.props.style && o.props.style.display === "contents") ||
      (i &&
        s.options.layoutScroll &&
        s.scroll &&
        s !== s.root &&
        Pi(e, { x: -s.scroll.offset.x, y: -s.scroll.offset.y }),
      l && ((t.x *= l.x.scale), (t.y *= l.y.scale), yy(e, l)),
      i && ii(s.latestValues) && Pi(e, s.latestValues));
  }
  (t.x < om && t.x > rm && (t.x = 1), t.y < om && t.y > rm && (t.y = 1));
}
function ki(e, t) {
  ((e.min = e.min + t), (e.max = e.max + t));
}
function um(e, t, n, i, a = 0.5) {
  const s = de(e.min, e.max, a);
  uc(e, t, n, s, i);
}
function Pi(e, t) {
  (um(e.x, t.x, t.scaleX, t.scale, t.originX),
    um(e.y, t.y, t.scaleY, t.scale, t.originY));
}
function xy(e, t) {
  return gy(JT(e.getBoundingClientRect(), t));
}
function ew(e, t, n) {
  const i = xy(e, n),
    { scroll: a } = t;
  return (a && (ki(i.x, a.offset.x), ki(i.y, a.offset.y)), i);
}
const cm = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  Qi = () => ({ x: cm(), y: cm() }),
  fm = () => ({ min: 0, max: 0 }),
  ve = () => ({ x: fm(), y: fm() }),
  cc = { current: null },
  by = { current: !1 };
function tw() {
  if (((by.current = !0), !!Ef))
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-reduced-motion)"),
        t = () => (cc.current = e.matches);
      (e.addEventListener("change", t), t());
    } else cc.current = !1;
}
const nw = new WeakMap();
function iw(e, t, n) {
  for (const i in t) {
    const a = t[i],
      s = n[i];
    if (Ge(a)) e.addValue(i, a);
    else if (Ge(s)) e.addValue(i, ha(a, { owner: e }));
    else if (s !== a)
      if (e.hasValue(i)) {
        const l = e.getValue(i);
        l.liveStyle === !0 ? l.jump(a) : l.hasAnimated || l.set(a);
      } else {
        const l = e.getStaticValue(i);
        e.addValue(i, ha(l !== void 0 ? l : a, { owner: e }));
      }
  }
  for (const i in n) t[i] === void 0 && e.removeValue(i);
  return t;
}
const dm = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete",
];
class aw {
  scrapeMotionValuesFromProps(t, n, i) {
    return {};
  }
  constructor(
    {
      parent: t,
      props: n,
      presenceContext: i,
      reducedMotionConfig: a,
      blockInitialAnimation: s,
      visualState: l,
    },
    r = {},
  ) {
    ((this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.KeyframeResolver = qf),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(),
          this.renderInstance(
            this.current,
            this.renderState,
            this.props.style,
            this.projection,
          ));
      }),
      (this.renderScheduledAt = 0),
      (this.scheduleRender = () => {
        const h = We.now();
        this.renderScheduledAt < h &&
          ((this.renderScheduledAt = h), ce.render(this.render, !1, !0));
      }));
    const { latestValues: o, renderState: u } = l;
    ((this.latestValues = o),
      (this.baseTarget = { ...o }),
      (this.initialValues = n.initial ? { ...o } : {}),
      (this.renderState = u),
      (this.parent = t),
      (this.props = n),
      (this.presenceContext = i),
      (this.depth = t ? t.depth + 1 : 0),
      (this.reducedMotionConfig = a),
      (this.options = r),
      (this.blockInitialAnimation = !!s),
      (this.isControllingVariants = Xr(n)),
      (this.isVariantNode = sy(n)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(t && t.current)));
    const { willChange: c, ...f } = this.scrapeMotionValuesFromProps(
      n,
      {},
      this,
    );
    for (const h in f) {
      const d = f[h];
      o[h] !== void 0 && Ge(d) && d.set(o[h]);
    }
  }
  mount(t) {
    var n;
    ((this.current = t),
      nw.set(t, this),
      this.projection && !this.projection.instance && this.projection.mount(t),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((i, a) => this.bindToMotionValue(a, i)),
      by.current || tw(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === "never"
          ? !1
          : this.reducedMotionConfig === "always"
            ? !0
            : cc.current),
      (n = this.parent) == null || n.addChild(this),
      this.update(this.props, this.presenceContext));
  }
  unmount() {
    var t;
    (this.projection && this.projection.unmount(),
      Qn(this.notifyUpdate),
      Qn(this.render),
      this.valueSubscriptions.forEach((n) => n()),
      this.valueSubscriptions.clear(),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      (t = this.parent) == null || t.removeChild(this));
    for (const n in this.events) this.events[n].clear();
    for (const n in this.features) {
      const i = this.features[n];
      i && (i.unmount(), (i.isMounted = !1));
    }
    this.current = null;
  }
  addChild(t) {
    (this.children.add(t),
      this.enteringChildren ?? (this.enteringChildren = new Set()),
      this.enteringChildren.add(t));
  }
  removeChild(t) {
    (this.children.delete(t),
      this.enteringChildren && this.enteringChildren.delete(t));
  }
  bindToMotionValue(t, n) {
    this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)();
    const i = Aa.has(t);
    i && this.onBindTransform && this.onBindTransform();
    const a = n.on("change", (l) => {
      ((this.latestValues[t] = l),
        this.props.onUpdate && ce.preRender(this.notifyUpdate),
        i && this.projection && (this.projection.isTransformDirty = !0),
        this.scheduleRender());
    });
    let s;
    (window.MotionCheckAppearSync &&
      (s = window.MotionCheckAppearSync(this, t, n)),
      this.valueSubscriptions.set(t, () => {
        (a(), s && s(), n.owner && n.stop());
      }));
  }
  sortNodePosition(t) {
    return !this.current ||
      !this.sortInstanceNodePosition ||
      this.type !== t.type
      ? 0
      : this.sortInstanceNodePosition(this.current, t.current);
  }
  updateFeatures() {
    let t = "animation";
    for (t in ma) {
      const n = ma[t];
      if (!n) continue;
      const { isEnabled: i, Feature: a } = n;
      if (
        (!this.features[t] &&
          a &&
          i(this.props) &&
          (this.features[t] = new a(this)),
        this.features[t])
      ) {
        const s = this.features[t];
        s.isMounted ? s.update() : (s.mount(), (s.isMounted = !0));
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  measureViewportBox() {
    return this.current
      ? this.measureInstanceViewportBox(this.current, this.props)
      : ve();
  }
  getStaticValue(t) {
    return this.latestValues[t];
  }
  setStaticValue(t, n) {
    this.latestValues[t] = n;
  }
  update(t, n) {
    ((t.transformTemplate || this.props.transformTemplate) &&
      this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = t),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = n));
    for (let i = 0; i < dm.length; i++) {
      const a = dm[i];
      this.propEventSubscriptions[a] &&
        (this.propEventSubscriptions[a](),
        delete this.propEventSubscriptions[a]);
      const s = "on" + a,
        l = t[s];
      l && (this.propEventSubscriptions[a] = this.on(a, l));
    }
    ((this.prevMotionValues = iw(
      this,
      this.scrapeMotionValuesFromProps(t, this.prevProps, this),
      this.prevMotionValues,
    )),
      this.handleChildMotionValue && this.handleChildMotionValue());
  }
  getProps() {
    return this.props;
  }
  getVariant(t) {
    return this.props.variants ? this.props.variants[t] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode
      ? this
      : this.parent
        ? this.parent.getClosestVariantNode()
        : void 0;
  }
  addVariantChild(t) {
    const n = this.getClosestVariantNode();
    if (n)
      return (
        n.variantChildren && n.variantChildren.add(t),
        () => n.variantChildren.delete(t)
      );
  }
  addValue(t, n) {
    const i = this.values.get(t);
    n !== i &&
      (i && this.removeValue(t),
      this.bindToMotionValue(t, n),
      this.values.set(t, n),
      (this.latestValues[t] = n.get()));
  }
  removeValue(t) {
    this.values.delete(t);
    const n = this.valueSubscriptions.get(t);
    (n && (n(), this.valueSubscriptions.delete(t)),
      delete this.latestValues[t],
      this.removeValueFromRenderState(t, this.renderState));
  }
  hasValue(t) {
    return this.values.has(t);
  }
  getValue(t, n) {
    if (this.props.values && this.props.values[t]) return this.props.values[t];
    let i = this.values.get(t);
    return (
      i === void 0 &&
        n !== void 0 &&
        ((i = ha(n === null ? void 0 : n, { owner: this })),
        this.addValue(t, i)),
      i
    );
  }
  readValue(t, n) {
    let i =
      this.latestValues[t] !== void 0 || !this.current
        ? this.latestValues[t]
        : (this.getBaseTargetFromProps(this.props, t) ??
          this.readValueFromInstance(this.current, t, this.options));
    return (
      i != null &&
        (typeof i == "string" && (fv(i) || hv(i))
          ? (i = parseFloat(i))
          : !dT(i) && Kn.test(n) && (i = Zv(t, n)),
        this.setBaseTarget(t, Ge(i) ? i.get() : i)),
      Ge(i) ? i.get() : i
    );
  }
  setBaseTarget(t, n) {
    this.baseTarget[t] = n;
  }
  getBaseTarget(t) {
    var s;
    const { initial: n } = this.props;
    let i;
    if (typeof n == "string" || typeof n == "object") {
      const l = Jf(
        this.props,
        n,
        (s = this.presenceContext) == null ? void 0 : s.custom,
      );
      l && (i = l[t]);
    }
    if (n && i !== void 0) return i;
    const a = this.getBaseTargetFromProps(this.props, t);
    return a !== void 0 && !Ge(a)
      ? a
      : this.initialValues[t] !== void 0 && i === void 0
        ? void 0
        : this.baseTarget[t];
  }
  on(t, n) {
    return (
      this.events[t] || (this.events[t] = new Nf()),
      this.events[t].add(n)
    );
  }
  notify(t, ...n) {
    this.events[t] && this.events[t].notify(...n);
  }
  scheduleRenderMicrotask() {
    kf.render(this.render);
  }
}
class Sy extends aw {
  constructor() {
    (super(...arguments), (this.KeyframeResolver = eT));
  }
  sortInstanceNodePosition(t, n) {
    return t.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(t, n) {
    return t.style ? t.style[n] : void 0;
  }
  removeValueFromRenderState(t, { vars: n, style: i }) {
    (delete n[t], delete i[t]);
  }
  handleChildMotionValue() {
    this.childSubscription &&
      (this.childSubscription(), delete this.childSubscription);
    const { children: t } = this.props;
    Ge(t) &&
      (this.childSubscription = t.on("change", (n) => {
        this.current && (this.current.textContent = `${n}`);
      }));
  }
}
function Ty(e, { style: t, vars: n }, i, a) {
  const s = e.style;
  let l;
  for (l in t) s[l] = t[l];
  a == null || a.applyProjectionStyles(s, i);
  for (l in n) s.setProperty(l, n[l]);
}
function sw(e) {
  return window.getComputedStyle(e);
}
class lw extends Sy {
  constructor() {
    (super(...arguments), (this.type = "html"), (this.renderInstance = Ty));
  }
  readValueFromInstance(t, n) {
    var i;
    if (Aa.has(n))
      return (i = this.projection) != null && i.isProjecting ? tc(n) : xS(t, n);
    {
      const a = sw(t),
        s = (zf(n) ? a.getPropertyValue(n) : a[n]) || 0;
      return typeof s == "string" ? s.trim() : s;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: n }) {
    return xy(t, n);
  }
  build(t, n, i) {
    Ff(t, n, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, n, i) {
    return Wf(t, n, i);
  }
}
const wy = new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust",
]);
function rw(e, t, n, i) {
  Ty(e, t, void 0, i);
  for (const a in t.attrs) e.setAttribute(wy.has(a) ? a : ed(a), t.attrs[a]);
}
class ow extends Sy {
  constructor() {
    (super(...arguments),
      (this.type = "svg"),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = ve));
  }
  getBaseTargetFromProps(t, n) {
    return t[n];
  }
  readValueFromInstance(t, n) {
    if (Aa.has(n)) {
      const i = Kv(n);
      return (i && i.default) || 0;
    }
    return ((n = wy.has(n) ? n : ed(n)), t.getAttribute(n));
  }
  scrapeMotionValuesFromProps(t, n, i) {
    return dy(t, n, i);
  }
  build(t, n, i) {
    oy(t, n, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(t, n, i, a) {
    rw(t, n, i, a);
  }
  mount(t) {
    ((this.isSVGTag = cy(t.tagName)), super.mount(t));
  }
}
const uw = (e, t) =>
  If(e) ? new ow(t) : new lw(t, { allowProjection: e !== L.Fragment });
function ea(e, t, n) {
  const i = e.getProps();
  return Jf(i, t, n !== void 0 ? n : i.custom, e);
}
const fc = (e) => Array.isArray(e);
function cw(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, ha(n));
}
function fw(e) {
  return fc(e) ? e[e.length - 1] || 0 : e;
}
function dw(e, t) {
  const n = ea(e, t);
  let { transitionEnd: i = {}, transition: a = {}, ...s } = n || {};
  s = { ...s, ...i };
  for (const l in s) {
    const r = fw(s[l]);
    cw(e, l, r);
  }
}
function hw(e) {
  return !!(Ge(e) && e.add);
}
function dc(e, t) {
  const n = e.getValue("willChange");
  if (hw(n)) return n.add(t);
  if (!n && mn.WillChange) {
    const i = new mn.WillChange("auto");
    (e.addValue("willChange", i), i.add(t));
  }
}
function Ey(e) {
  return e.props[hy];
}
const mw = (e) => e !== null;
function pw(e, { repeat: t, repeatType: n = "loop" }, i) {
  const a = e.filter(mw),
    s = t && n !== "loop" && t % 2 === 1 ? 0 : a.length - 1;
  return a[s];
}
const gw = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
  vw = (e) => ({
    type: "spring",
    stiffness: 550,
    damping: e === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  yw = { type: "keyframes", duration: 0.8 },
  xw = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  bw = (e, { keyframes: t }) =>
    t.length > 2
      ? yw
      : Aa.has(e)
        ? e.startsWith("scale")
          ? vw(t[1])
          : gw
        : xw;
function Sw({
  when: e,
  delay: t,
  delayChildren: n,
  staggerChildren: i,
  staggerDirection: a,
  repeat: s,
  repeatType: l,
  repeatDelay: r,
  from: o,
  elapsed: u,
  ...c
}) {
  return !!Object.keys(c).length;
}
const td =
  (e, t, n, i = {}, a, s) =>
  (l) => {
    const r = Yf(i, e) || {},
      o = r.delay || i.delay || 0;
    let { elapsed: u = 0 } = i;
    u = u - qt(o);
    const c = {
      keyframes: Array.isArray(n) ? n : [null, n],
      ease: "easeOut",
      velocity: t.getVelocity(),
      ...r,
      delay: -u,
      onUpdate: (h) => {
        (t.set(h), r.onUpdate && r.onUpdate(h));
      },
      onComplete: () => {
        (l(), r.onComplete && r.onComplete());
      },
      name: e,
      motionValue: t,
      element: s ? void 0 : a,
    };
    (Sw(r) || Object.assign(c, bw(e, c)),
      c.duration && (c.duration = qt(c.duration)),
      c.repeatDelay && (c.repeatDelay = qt(c.repeatDelay)),
      c.from !== void 0 && (c.keyframes[0] = c.from));
    let f = !1;
    if (
      ((c.type === !1 || (c.duration === 0 && !c.repeatDelay)) &&
        (lc(c), c.delay === 0 && (f = !0)),
      (mn.instantAnimations || mn.skipAnimations) &&
        ((f = !0), lc(c), (c.delay = 0)),
      (c.allowFlatten = !r.type && !r.ease),
      f && !s && t.get() !== void 0)
    ) {
      const h = pw(c.keyframes, r);
      if (h !== void 0) {
        ce.update(() => {
          (c.onUpdate(h), c.onComplete());
        });
        return;
      }
    }
    return r.isSync ? new Gf(c) : new YS(c);
  };
function Tw({ protectedKeys: e, needsAnimating: t }, n) {
  const i = e.hasOwnProperty(n) && t[n] !== !0;
  return ((t[n] = !1), i);
}
function My(e, t, { delay: n = 0, transitionOverride: i, type: a } = {}) {
  let { transition: s = e.getDefaultTransition(), transitionEnd: l, ...r } = t;
  i && (s = i);
  const o = [],
    u = a && e.animationState && e.animationState.getState()[a];
  for (const c in r) {
    const f = e.getValue(c, e.latestValues[c] ?? null),
      h = r[c];
    if (h === void 0 || (u && Tw(u, c))) continue;
    const d = { delay: n, ...Yf(s || {}, c) },
      y = f.get();
    if (
      y !== void 0 &&
      !f.isAnimating &&
      !Array.isArray(h) &&
      h === y &&
      !d.velocity
    )
      continue;
    let x = !1;
    if (window.MotionHandoffAnimation) {
      const m = Ey(e);
      if (m) {
        const p = window.MotionHandoffAnimation(m, c, ce);
        p !== null && ((d.startTime = p), (x = !0));
      }
    }
    (dc(e, c),
      f.start(
        td(c, f, h, e.shouldReduceMotion && kv.has(c) ? { type: !1 } : d, e, x),
      ));
    const T = f.animation;
    T && o.push(T);
  }
  return (
    l &&
      Promise.all(o).then(() => {
        ce.update(() => {
          l && dw(e, l);
        });
      }),
    o
  );
}
function Ay(e, t, n, i = 0, a = 1) {
  const s = Array.from(e)
      .sort((u, c) => u.sortNodePosition(c))
      .indexOf(t),
    l = e.size,
    r = (l - 1) * i;
  return typeof n == "function" ? n(s, l) : a === 1 ? s * i : r - s * i;
}
function hc(e, t, n = {}) {
  var o;
  const i = ea(
    e,
    t,
    n.type === "exit"
      ? (o = e.presenceContext) == null
        ? void 0
        : o.custom
      : void 0,
  );
  let { transition: a = e.getDefaultTransition() || {} } = i || {};
  n.transitionOverride && (a = n.transitionOverride);
  const s = i ? () => Promise.all(My(e, i, n)) : () => Promise.resolve(),
    l =
      e.variantChildren && e.variantChildren.size
        ? (u = 0) => {
            const {
              delayChildren: c = 0,
              staggerChildren: f,
              staggerDirection: h,
            } = a;
            return ww(e, t, u, c, f, h, n);
          }
        : () => Promise.resolve(),
    { when: r } = a;
  if (r) {
    const [u, c] = r === "beforeChildren" ? [s, l] : [l, s];
    return u().then(() => c());
  } else return Promise.all([s(), l(n.delay)]);
}
function ww(e, t, n = 0, i = 0, a = 0, s = 1, l) {
  const r = [];
  for (const o of e.variantChildren)
    (o.notify("AnimationStart", t),
      r.push(
        hc(o, t, {
          ...l,
          delay:
            n +
            (typeof i == "function" ? 0 : i) +
            Ay(e.variantChildren, o, i, a, s),
        }).then(() => o.notify("AnimationComplete", t)),
      ));
  return Promise.all(r);
}
function Ew(e, t, n = {}) {
  e.notify("AnimationStart", t);
  let i;
  if (Array.isArray(t)) {
    const a = t.map((s) => hc(e, s, n));
    i = Promise.all(a);
  } else if (typeof t == "string") i = hc(e, t, n);
  else {
    const a = typeof t == "function" ? ea(e, t, n.custom) : t;
    i = Promise.all(My(e, a, n));
  }
  return i.then(() => {
    e.notify("AnimationComplete", t);
  });
}
function Cy(e, t) {
  if (!Array.isArray(t)) return !1;
  const n = t.length;
  if (n !== e.length) return !1;
  for (let i = 0; i < n; i++) if (t[i] !== e[i]) return !1;
  return !0;
}
const Mw = Zf.length;
function jy(e) {
  if (!e) return;
  if (!e.isControllingVariants) {
    const n = e.parent ? jy(e.parent) || {} : {};
    return (e.props.initial !== void 0 && (n.initial = e.props.initial), n);
  }
  const t = {};
  for (let n = 0; n < Mw; n++) {
    const i = Zf[n],
      a = e.props[i];
    (Ms(a) || a === !1) && (t[i] = a);
  }
  return t;
}
const Aw = [...Kf].reverse(),
  Cw = Kf.length;
function jw(e) {
  return (t) =>
    Promise.all(t.map(({ animation: n, options: i }) => Ew(e, n, i)));
}
function Nw(e) {
  let t = jw(e),
    n = hm(),
    i = !0;
  const a = (o) => (u, c) => {
    var h;
    const f = ea(
      e,
      c,
      o === "exit"
        ? (h = e.presenceContext) == null
          ? void 0
          : h.custom
        : void 0,
    );
    if (f) {
      const { transition: d, transitionEnd: y, ...x } = f;
      u = { ...u, ...x, ...y };
    }
    return u;
  };
  function s(o) {
    t = o(e);
  }
  function l(o) {
    const { props: u } = e,
      c = jy(e.parent) || {},
      f = [],
      h = new Set();
    let d = {},
      y = 1 / 0;
    for (let T = 0; T < Cw; T++) {
      const m = Aw[T],
        p = n[m],
        v = u[m] !== void 0 ? u[m] : c[m],
        b = Ms(v),
        w = m === o ? p.isActive : null;
      w === !1 && (y = T);
      let M = v === c[m] && v !== u[m] && b;
      if (
        (M && i && e.manuallyAnimateOnMount && (M = !1),
        (p.protectedKeys = { ...d }),
        (!p.isActive && w === null) ||
          (!v && !p.prevProp) ||
          Yr(v) ||
          typeof v == "boolean")
      )
        continue;
      const E = Ow(p.prevProp, v);
      let S = E || (m === o && p.isActive && !M && b) || (T > y && b),
        O = !1;
      const C = Array.isArray(v) ? v : [v];
      let A = C.reduce(a(m), {});
      w === !1 && (A = {});
      const { prevResolvedValues: j = {} } = p,
        _ = { ...j, ...A },
        R = (z) => {
          ((S = !0),
            h.has(z) && ((O = !0), h.delete(z)),
            (p.needsAnimating[z] = !0));
          const N = e.getValue(z);
          N && (N.liveStyle = !1);
        };
      for (const z in _) {
        const N = A[z],
          B = j[z];
        if (d.hasOwnProperty(z)) continue;
        let U = !1;
        (fc(N) && fc(B) ? (U = !Cy(N, B)) : (U = N !== B),
          U
            ? N != null
              ? R(z)
              : h.add(z)
            : N !== void 0 && h.has(z)
              ? R(z)
              : (p.protectedKeys[z] = !0));
      }
      ((p.prevProp = v),
        (p.prevResolvedValues = A),
        p.isActive && (d = { ...d, ...A }),
        i && e.blockInitialAnimation && (S = !1));
      const Y = M && E;
      S &&
        (!Y || O) &&
        f.push(
          ...C.map((z) => {
            const N = { type: m };
            if (
              typeof z == "string" &&
              i &&
              !Y &&
              e.manuallyAnimateOnMount &&
              e.parent
            ) {
              const { parent: B } = e,
                U = ea(B, z);
              if (B.enteringChildren && U) {
                const { delayChildren: he } = U.transition || {};
                N.delay = Ay(B.enteringChildren, e, he);
              }
            }
            return { animation: z, options: N };
          }),
        );
    }
    if (h.size) {
      const T = {};
      if (typeof u.initial != "boolean") {
        const m = ea(e, Array.isArray(u.initial) ? u.initial[0] : u.initial);
        m && m.transition && (T.transition = m.transition);
      }
      (h.forEach((m) => {
        const p = e.getBaseTarget(m),
          v = e.getValue(m);
        (v && (v.liveStyle = !0), (T[m] = p ?? null));
      }),
        f.push({ animation: T }));
    }
    let x = !!f.length;
    return (
      i &&
        (u.initial === !1 || u.initial === u.animate) &&
        !e.manuallyAnimateOnMount &&
        (x = !1),
      (i = !1),
      x ? t(f) : Promise.resolve()
    );
  }
  function r(o, u) {
    var f;
    if (n[o].isActive === u) return Promise.resolve();
    ((f = e.variantChildren) == null ||
      f.forEach((h) => {
        var d;
        return (d = h.animationState) == null ? void 0 : d.setActive(o, u);
      }),
      (n[o].isActive = u));
    const c = l(o);
    for (const h in n) n[h].protectedKeys = {};
    return c;
  }
  return {
    animateChanges: l,
    setActive: r,
    setAnimateFunction: s,
    getState: () => n,
    reset: () => {
      n = hm();
    },
  };
}
function Ow(e, t) {
  return typeof t == "string" ? t !== e : Array.isArray(t) ? !Cy(t, e) : !1;
}
function Jn(e = !1) {
  return {
    isActive: e,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {},
  };
}
function hm() {
  return {
    animate: Jn(!0),
    whileInView: Jn(),
    whileHover: Jn(),
    whileTap: Jn(),
    whileDrag: Jn(),
    whileFocus: Jn(),
    exit: Jn(),
  };
}
class $n {
  constructor(t) {
    ((this.isMounted = !1), (this.node = t));
  }
  update() {}
}
class Dw extends $n {
  constructor(t) {
    (super(t), t.animationState || (t.animationState = Nw(t)));
  }
  updateAnimationControlsSubscription() {
    const { animate: t } = this.node.getProps();
    Yr(t) && (this.unmountControls = t.subscribe(this.node));
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: t } = this.node.getProps(),
      { animate: n } = this.node.prevProps || {};
    t !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
    var t;
    (this.node.animationState.reset(),
      (t = this.unmountControls) == null || t.call(this));
  }
}
let zw = 0;
class Lw extends $n {
  constructor() {
    (super(...arguments), (this.id = zw++));
  }
  update() {
    if (!this.node.presenceContext) return;
    const { isPresent: t, onExitComplete: n } = this.node.presenceContext,
      { isPresent: i } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || t === i) return;
    const a = this.node.animationState.setActive("exit", !t);
    n &&
      !t &&
      a.then(() => {
        n(this.id);
      });
  }
  mount() {
    const { register: t, onExitComplete: n } = this.node.presenceContext || {};
    (n && n(this.id), t && (this.unmount = t(this.id)));
  }
  unmount() {}
}
const Vw = { animation: { Feature: Dw }, exit: { Feature: Lw } };
function Cs(e, t, n, i = { passive: !0 }) {
  return (e.addEventListener(t, n, i), () => e.removeEventListener(t, n));
}
function Ps(e) {
  return { point: { x: e.pageX, y: e.pageY } };
}
const _w = (e) => (t) => Pf(t) && e(t, Ps(t));
function as(e, t, n, i) {
  return Cs(e, t, _w(n), i);
}
const Ny = 1e-4,
  Rw = 1 - Ny,
  Bw = 1 + Ny,
  Oy = 0.01,
  Hw = 0 - Oy,
  Uw = 0 + Oy;
function ke(e) {
  return e.max - e.min;
}
function Gw(e, t, n) {
  return Math.abs(e - t) <= n;
}
function mm(e, t, n, i = 0.5) {
  ((e.origin = i),
    (e.originPoint = de(t.min, t.max, e.origin)),
    (e.scale = ke(n) / ke(t)),
    (e.translate = de(n.min, n.max, e.origin) - e.originPoint),
    ((e.scale >= Rw && e.scale <= Bw) || isNaN(e.scale)) && (e.scale = 1),
    ((e.translate >= Hw && e.translate <= Uw) || isNaN(e.translate)) &&
      (e.translate = 0));
}
function ss(e, t, n, i) {
  (mm(e.x, t.x, n.x, i ? i.originX : void 0),
    mm(e.y, t.y, n.y, i ? i.originY : void 0));
}
function pm(e, t, n) {
  ((e.min = n.min + t.min), (e.max = e.min + ke(t)));
}
function qw(e, t, n) {
  (pm(e.x, t.x, n.x), pm(e.y, t.y, n.y));
}
function gm(e, t, n) {
  ((e.min = t.min - n.min), (e.max = e.min + ke(t)));
}
function ls(e, t, n) {
  (gm(e.x, t.x, n.x), gm(e.y, t.y, n.y));
}
function yt(e) {
  return [e("x"), e("y")];
}
const Dy = ({ current: e }) => (e ? e.ownerDocument.defaultView : null),
  vm = (e, t) => Math.abs(e - t);
function Yw(e, t) {
  const n = vm(e.x, t.x),
    i = vm(e.y, t.y);
  return Math.sqrt(n ** 2 + i ** 2);
}
class zy {
  constructor(
    t,
    n,
    {
      transformPagePoint: i,
      contextWindow: a = window,
      dragSnapToOrigin: s = !1,
      distanceThreshold: l = 3,
    } = {},
  ) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        const h = Go(this.lastMoveEventInfo, this.history),
          d = this.startEvent !== null,
          y = Yw(h.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
        if (!d && !y) return;
        const { point: x } = h,
          { timestamp: T } = Ve;
        this.history.push({ ...x, timestamp: T });
        const { onStart: m, onMove: p } = this.handlers;
        (d ||
          (m && m(this.lastMoveEvent, h),
          (this.startEvent = this.lastMoveEvent)),
          p && p(this.lastMoveEvent, h));
      }),
      (this.handlePointerMove = (h, d) => {
        ((this.lastMoveEvent = h),
          (this.lastMoveEventInfo = Uo(d, this.transformPagePoint)),
          ce.update(this.updatePoint, !0));
      }),
      (this.handlePointerUp = (h, d) => {
        this.end();
        const { onEnd: y, onSessionEnd: x, resumeAnimation: T } = this.handlers;
        if (
          (this.dragSnapToOrigin && T && T(),
          !(this.lastMoveEvent && this.lastMoveEventInfo))
        )
          return;
        const m = Go(
          h.type === "pointercancel"
            ? this.lastMoveEventInfo
            : Uo(d, this.transformPagePoint),
          this.history,
        );
        (this.startEvent && y && y(h, m), x && x(h, m));
      }),
      !Pf(t))
    )
      return;
    ((this.dragSnapToOrigin = s),
      (this.handlers = n),
      (this.transformPagePoint = i),
      (this.distanceThreshold = l),
      (this.contextWindow = a || window));
    const r = Ps(t),
      o = Uo(r, this.transformPagePoint),
      { point: u } = o,
      { timestamp: c } = Ve;
    this.history = [{ ...u, timestamp: c }];
    const { onSessionStart: f } = n;
    (f && f(t, Go(o, this.history)),
      (this.removeListeners = Ys(
        as(this.contextWindow, "pointermove", this.handlePointerMove),
        as(this.contextWindow, "pointerup", this.handlePointerUp),
        as(this.contextWindow, "pointercancel", this.handlePointerUp),
      )));
  }
  updateHandlers(t) {
    this.handlers = t;
  }
  end() {
    (this.removeListeners && this.removeListeners(), Qn(this.updatePoint));
  }
}
function Uo(e, t) {
  return t ? { point: t(e.point) } : e;
}
function ym(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function Go({ point: e }, t) {
  return {
    point: e,
    delta: ym(e, Ly(t)),
    offset: ym(e, Xw(t)),
    velocity: kw(t, 0.1),
  };
}
function Xw(e) {
  return e[0];
}
function Ly(e) {
  return e[e.length - 1];
}
function kw(e, t) {
  if (e.length < 2) return { x: 0, y: 0 };
  let n = e.length - 1,
    i = null;
  const a = Ly(e);
  for (; n >= 0 && ((i = e[n]), !(a.timestamp - i.timestamp > qt(t))); ) n--;
  if (!i) return { x: 0, y: 0 };
  const s = At(a.timestamp - i.timestamp);
  if (s === 0) return { x: 0, y: 0 };
  const l = { x: (a.x - i.x) / s, y: (a.y - i.y) / s };
  return (l.x === 1 / 0 && (l.x = 0), l.y === 1 / 0 && (l.y = 0), l);
}
function Pw(e, { min: t, max: n }, i) {
  return (
    t !== void 0 && e < t
      ? (e = i ? de(t, e, i.min) : Math.max(e, t))
      : n !== void 0 && e > n && (e = i ? de(n, e, i.max) : Math.min(e, n)),
    e
  );
}
function xm(e, t, n) {
  return {
    min: t !== void 0 ? e.min + t : void 0,
    max: n !== void 0 ? e.max + n - (e.max - e.min) : void 0,
  };
}
function Qw(e, { top: t, left: n, bottom: i, right: a }) {
  return { x: xm(e.x, n, a), y: xm(e.y, t, i) };
}
function bm(e, t) {
  let n = t.min - e.min,
    i = t.max - e.max;
  return (
    t.max - t.min < e.max - e.min && ([n, i] = [i, n]),
    { min: n, max: i }
  );
}
function Kw(e, t) {
  return { x: bm(e.x, t.x), y: bm(e.y, t.y) };
}
function Zw(e, t) {
  let n = 0.5;
  const i = ke(e),
    a = ke(t);
  return (
    a > i
      ? (n = Ts(t.min, t.max - i, e.min))
      : i > a && (n = Ts(e.min, e.max - a, t.min)),
    hn(0, 1, n)
  );
}
function Fw(e, t) {
  const n = {};
  return (
    t.min !== void 0 && (n.min = t.min - e.min),
    t.max !== void 0 && (n.max = t.max - e.min),
    n
  );
}
const mc = 0.35;
function $w(e = mc) {
  return (
    e === !1 ? (e = 0) : e === !0 && (e = mc),
    { x: Sm(e, "left", "right"), y: Sm(e, "top", "bottom") }
  );
}
function Sm(e, t, n) {
  return { min: Tm(e, t), max: Tm(e, n) };
}
function Tm(e, t) {
  return typeof e == "number" ? e : e[t] || 0;
}
const Iw = new WeakMap();
class Jw {
  constructor(t) {
    ((this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = ve()),
      (this.latestPointerEvent = null),
      (this.latestPanInfo = null),
      (this.visualElement = t));
  }
  start(t, { snapToCursor: n = !1, distanceThreshold: i } = {}) {
    const { presenceContext: a } = this.visualElement;
    if (a && a.isPresent === !1) return;
    const s = (f) => {
        const { dragSnapToOrigin: h } = this.getProps();
        (h ? this.pauseAnimation() : this.stopAnimation(),
          n && this.snapToCursor(Ps(f).point));
      },
      l = (f, h) => {
        const { drag: d, dragPropagation: y, onDragStart: x } = this.getProps();
        if (
          d &&
          !y &&
          (this.openDragLock && this.openDragLock(),
          (this.openDragLock = aT(d)),
          !this.openDragLock)
        )
          return;
        ((this.latestPointerEvent = f),
          (this.latestPanInfo = h),
          (this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          yt((m) => {
            let p = this.getAxisMotionValue(m).get() || 0;
            if (Yt.test(p)) {
              const { projection: v } = this.visualElement;
              if (v && v.layout) {
                const b = v.layout.layoutBox[m];
                b && (p = ke(b) * (parseFloat(p) / 100));
              }
            }
            this.originPoint[m] = p;
          }),
          x && ce.postRender(() => x(f, h)),
          dc(this.visualElement, "transform"));
        const { animationState: T } = this.visualElement;
        T && T.setActive("whileDrag", !0);
      },
      r = (f, h) => {
        ((this.latestPointerEvent = f), (this.latestPanInfo = h));
        const {
          dragPropagation: d,
          dragDirectionLock: y,
          onDirectionLock: x,
          onDrag: T,
        } = this.getProps();
        if (!d && !this.openDragLock) return;
        const { offset: m } = h;
        if (y && this.currentDirection === null) {
          ((this.currentDirection = Ww(m)),
            this.currentDirection !== null && x && x(this.currentDirection));
          return;
        }
        (this.updateAxis("x", h.point, m),
          this.updateAxis("y", h.point, m),
          this.visualElement.render(),
          T && T(f, h));
      },
      o = (f, h) => {
        ((this.latestPointerEvent = f),
          (this.latestPanInfo = h),
          this.stop(f, h),
          (this.latestPointerEvent = null),
          (this.latestPanInfo = null));
      },
      u = () =>
        yt((f) => {
          var h;
          return (
            this.getAnimationState(f) === "paused" &&
            ((h = this.getAxisMotionValue(f).animation) == null
              ? void 0
              : h.play())
          );
        }),
      { dragSnapToOrigin: c } = this.getProps();
    this.panSession = new zy(
      t,
      {
        onSessionStart: s,
        onStart: l,
        onMove: r,
        onSessionEnd: o,
        resumeAnimation: u,
      },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: c,
        distanceThreshold: i,
        contextWindow: Dy(this.visualElement),
      },
    );
  }
  stop(t, n) {
    const i = t || this.latestPointerEvent,
      a = n || this.latestPanInfo,
      s = this.isDragging;
    if ((this.cancel(), !s || !a || !i)) return;
    const { velocity: l } = a;
    this.startAnimation(l);
    const { onDragEnd: r } = this.getProps();
    r && ce.postRender(() => r(i, a));
  }
  cancel() {
    this.isDragging = !1;
    const { projection: t, animationState: n } = this.visualElement;
    (t && (t.isAnimationBlocked = !1),
      this.panSession && this.panSession.end(),
      (this.panSession = void 0));
    const { dragPropagation: i } = this.getProps();
    (!i &&
      this.openDragLock &&
      (this.openDragLock(), (this.openDragLock = null)),
      n && n.setActive("whileDrag", !1));
  }
  updateAxis(t, n, i) {
    const { drag: a } = this.getProps();
    if (!i || !fl(t, a, this.currentDirection)) return;
    const s = this.getAxisMotionValue(t);
    let l = this.originPoint[t] + i[t];
    (this.constraints &&
      this.constraints[t] &&
      (l = Pw(l, this.constraints[t], this.elastic[t])),
      s.set(l));
  }
  resolveConstraints() {
    var s;
    const { dragConstraints: t, dragElastic: n } = this.getProps(),
      i =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : (s = this.visualElement.projection) == null
            ? void 0
            : s.layout,
      a = this.constraints;
    (t && Xi(t)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : t && i
        ? (this.constraints = Qw(i.layoutBox, t))
        : (this.constraints = !1),
      (this.elastic = $w(n)),
      a !== this.constraints &&
        i &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        yt((l) => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(l) &&
            (this.constraints[l] = Fw(i.layoutBox[l], this.constraints[l]));
        }));
  }
  resolveRefConstraints() {
    const { dragConstraints: t, onMeasureDragConstraints: n } = this.getProps();
    if (!t || !Xi(t)) return !1;
    const i = t.current,
      { projection: a } = this.visualElement;
    if (!a || !a.layout) return !1;
    const s = ew(i, a.root, this.visualElement.getTransformPagePoint());
    let l = Kw(a.layout.layoutBox, s);
    if (n) {
      const r = n(IT(l));
      ((this.hasMutatedConstraints = !!r), r && (l = gy(r)));
    }
    return l;
  }
  startAnimation(t) {
    const {
        drag: n,
        dragMomentum: i,
        dragElastic: a,
        dragTransition: s,
        dragSnapToOrigin: l,
        onDragTransitionEnd: r,
      } = this.getProps(),
      o = this.constraints || {},
      u = yt((c) => {
        if (!fl(c, n, this.currentDirection)) return;
        let f = (o && o[c]) || {};
        l && (f = { min: 0, max: 0 });
        const h = a ? 200 : 1e6,
          d = a ? 40 : 1e7,
          y = {
            type: "inertia",
            velocity: i ? t[c] : 0,
            bounceStiffness: h,
            bounceDamping: d,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...s,
            ...f,
          };
        return this.startAxisValueAnimation(c, y);
      });
    return Promise.all(u).then(r);
  }
  startAxisValueAnimation(t, n) {
    const i = this.getAxisMotionValue(t);
    return (
      dc(this.visualElement, t),
      i.start(td(t, i, 0, n, this.visualElement, !1))
    );
  }
  stopAnimation() {
    yt((t) => this.getAxisMotionValue(t).stop());
  }
  pauseAnimation() {
    yt((t) => {
      var n;
      return (n = this.getAxisMotionValue(t).animation) == null
        ? void 0
        : n.pause();
    });
  }
  getAnimationState(t) {
    var n;
    return (n = this.getAxisMotionValue(t).animation) == null
      ? void 0
      : n.state;
  }
  getAxisMotionValue(t) {
    const n = `_drag${t.toUpperCase()}`,
      i = this.visualElement.getProps(),
      a = i[n];
    return (
      a ||
      this.visualElement.getValue(t, (i.initial ? i.initial[t] : void 0) || 0)
    );
  }
  snapToCursor(t) {
    yt((n) => {
      const { drag: i } = this.getProps();
      if (!fl(n, i, this.currentDirection)) return;
      const { projection: a } = this.visualElement,
        s = this.getAxisMotionValue(n);
      if (a && a.layout) {
        const { min: l, max: r } = a.layout.layoutBox[n];
        s.set(t[n] - de(l, r, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const { drag: t, dragConstraints: n } = this.getProps(),
      { projection: i } = this.visualElement;
    if (!Xi(n) || !i || !this.constraints) return;
    this.stopAnimation();
    const a = { x: 0, y: 0 };
    yt((l) => {
      const r = this.getAxisMotionValue(l);
      if (r && this.constraints !== !1) {
        const o = r.get();
        a[l] = Zw({ min: o, max: o }, this.constraints[l]);
      }
    });
    const { transformTemplate: s } = this.visualElement.getProps();
    ((this.visualElement.current.style.transform = s ? s({}, "") : "none"),
      i.root && i.root.updateScroll(),
      i.updateLayout(),
      this.resolveConstraints(),
      yt((l) => {
        if (!fl(l, t, null)) return;
        const r = this.getAxisMotionValue(l),
          { min: o, max: u } = this.constraints[l];
        r.set(de(o, u, a[l]));
      }));
  }
  addListeners() {
    if (!this.visualElement.current) return;
    Iw.set(this.visualElement, this);
    const t = this.visualElement.current,
      n = as(t, "pointerdown", (o) => {
        const { drag: u, dragListener: c = !0 } = this.getProps();
        u && c && this.start(o);
      }),
      i = () => {
        const { dragConstraints: o } = this.getProps();
        Xi(o) && o.current && (this.constraints = this.resolveRefConstraints());
      },
      { projection: a } = this.visualElement,
      s = a.addEventListener("measure", i);
    (a && !a.layout && (a.root && a.root.updateScroll(), a.updateLayout()),
      ce.read(i));
    const l = Cs(window, "resize", () => this.scalePositionWithinConstraints()),
      r = a.addEventListener(
        "didUpdate",
        ({ delta: o, hasLayoutChanged: u }) => {
          this.isDragging &&
            u &&
            (yt((c) => {
              const f = this.getAxisMotionValue(c);
              f &&
                ((this.originPoint[c] += o[c].translate),
                f.set(f.get() + o[c].translate));
            }),
            this.visualElement.render());
        },
      );
    return () => {
      (l(), n(), s(), r && r());
    };
  }
  getProps() {
    const t = this.visualElement.getProps(),
      {
        drag: n = !1,
        dragDirectionLock: i = !1,
        dragPropagation: a = !1,
        dragConstraints: s = !1,
        dragElastic: l = mc,
        dragMomentum: r = !0,
      } = t;
    return {
      ...t,
      drag: n,
      dragDirectionLock: i,
      dragPropagation: a,
      dragConstraints: s,
      dragElastic: l,
      dragMomentum: r,
    };
  }
}
function fl(e, t, n) {
  return (t === !0 || t === e) && (n === null || n === e);
}
function Ww(e, t = 10) {
  let n = null;
  return (Math.abs(e.y) > t ? (n = "y") : Math.abs(e.x) > t && (n = "x"), n);
}
class e3 extends $n {
  constructor(t) {
    (super(t),
      (this.removeGroupControls = Nt),
      (this.removeListeners = Nt),
      (this.controls = new Jw(t)));
  }
  mount() {
    const { dragControls: t } = this.node.getProps();
    (t && (this.removeGroupControls = t.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || Nt));
  }
  unmount() {
    (this.removeGroupControls(), this.removeListeners());
  }
}
const wm = (e) => (t, n) => {
  e && ce.postRender(() => e(t, n));
};
class t3 extends $n {
  constructor() {
    (super(...arguments), (this.removePointerDownListener = Nt));
  }
  onPointerDown(t) {
    this.session = new zy(t, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Dy(this.node),
    });
  }
  createPanHandlers() {
    const {
      onPanSessionStart: t,
      onPanStart: n,
      onPan: i,
      onPanEnd: a,
    } = this.node.getProps();
    return {
      onSessionStart: wm(t),
      onStart: wm(n),
      onMove: i,
      onEnd: (s, l) => {
        (delete this.session, a && ce.postRender(() => a(s, l)));
      },
    };
  }
  mount() {
    this.removePointerDownListener = as(this.node.current, "pointerdown", (t) =>
      this.onPointerDown(t),
    );
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    (this.removePointerDownListener(), this.session && this.session.end());
  }
}
const zl = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
function Em(e, t) {
  return t.max === t.min ? 0 : (e / (t.max - t.min)) * 100;
}
const Va = {
    correct: (e, t) => {
      if (!t.target) return e;
      if (typeof e == "string")
        if (G.test(e)) e = parseFloat(e);
        else return e;
      const n = Em(e, t.target.x),
        i = Em(e, t.target.y);
      return `${n}% ${i}%`;
    },
  },
  n3 = {
    correct: (e, { treeScale: t, projectionDelta: n }) => {
      const i = e,
        a = Kn.parse(e);
      if (a.length > 5) return i;
      const s = Kn.createTransformer(e),
        l = typeof a[0] != "number" ? 1 : 0,
        r = n.x.scale * t.x,
        o = n.y.scale * t.y;
      ((a[0 + l] /= r), (a[1 + l] /= o));
      const u = de(r, o, 0.5);
      return (
        typeof a[2 + l] == "number" && (a[2 + l] /= u),
        typeof a[3 + l] == "number" && (a[3 + l] /= u),
        s(a)
      );
    },
  };
let qo = !1;
class i3 extends L.Component {
  componentDidMount() {
    const {
        visualElement: t,
        layoutGroup: n,
        switchLayoutGroup: i,
        layoutId: a,
      } = this.props,
      { projection: s } = t;
    (MT(a3),
      s &&
        (n.group && n.group.add(s),
        i && i.register && a && i.register(s),
        qo && s.root.didUpdate(),
        s.addEventListener("animationComplete", () => {
          this.safeToRemove();
        }),
        s.setOptions({
          ...s.options,
          onExitComplete: () => this.safeToRemove(),
        })),
      (zl.hasEverUpdated = !0));
  }
  getSnapshotBeforeUpdate(t) {
    const {
        layoutDependency: n,
        visualElement: i,
        drag: a,
        isPresent: s,
      } = this.props,
      { projection: l } = i;
    return (
      l &&
        ((l.isPresent = s),
        (qo = !0),
        a || t.layoutDependency !== n || n === void 0 || t.isPresent !== s
          ? l.willUpdate()
          : this.safeToRemove(),
        t.isPresent !== s &&
          (s
            ? l.promote()
            : l.relegate() ||
              ce.postRender(() => {
                const r = l.getStack();
                (!r || !r.members.length) && this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    const { projection: t } = this.props.visualElement;
    t &&
      (t.root.didUpdate(),
      kf.postRender(() => {
        !t.currentAnimation && t.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    const {
        visualElement: t,
        layoutGroup: n,
        switchLayoutGroup: i,
      } = this.props,
      { projection: a } = t;
    ((qo = !0),
      a &&
        (a.scheduleCheckAfterUnmount(),
        n && n.group && n.group.remove(a),
        i && i.deregister && i.deregister(a)));
  }
  safeToRemove() {
    const { safeToRemove: t } = this.props;
    t && t();
  }
  render() {
    return null;
  }
}
function Vy(e) {
  const [t, n] = ty(),
    i = L.useContext(Tf);
  return g.jsx(i3, {
    ...e,
    layoutGroup: i,
    switchLayoutGroup: L.useContext(my),
    isPresent: t,
    safeToRemove: n,
  });
}
const a3 = {
  borderRadius: {
    ...Va,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius",
    ],
  },
  borderTopLeftRadius: Va,
  borderTopRightRadius: Va,
  borderBottomLeftRadius: Va,
  borderBottomRightRadius: Va,
  boxShadow: n3,
};
function s3(e, t, n) {
  const i = Ge(e) ? e : ha(e);
  return (i.start(td("", i, t, n)), i.animation);
}
const l3 = (e, t) => e.depth - t.depth;
class r3 {
  constructor() {
    ((this.children = []), (this.isDirty = !1));
  }
  add(t) {
    (Mf(this.children, t), (this.isDirty = !0));
  }
  remove(t) {
    (Af(this.children, t), (this.isDirty = !0));
  }
  forEach(t) {
    (this.isDirty && this.children.sort(l3),
      (this.isDirty = !1),
      this.children.forEach(t));
  }
}
function o3(e, t) {
  const n = We.now(),
    i = ({ timestamp: a }) => {
      const s = a - n;
      s >= t && (Qn(i), e(s - t));
    };
  return (ce.setup(i, !0), () => Qn(i));
}
const _y = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
  u3 = _y.length,
  Mm = (e) => (typeof e == "string" ? parseFloat(e) : e),
  Am = (e) => typeof e == "number" || G.test(e);
function c3(e, t, n, i, a, s) {
  a
    ? ((e.opacity = de(0, n.opacity ?? 1, f3(i))),
      (e.opacityExit = de(t.opacity ?? 1, 0, d3(i))))
    : s && (e.opacity = de(t.opacity ?? 1, n.opacity ?? 1, i));
  for (let l = 0; l < u3; l++) {
    const r = `border${_y[l]}Radius`;
    let o = Cm(t, r),
      u = Cm(n, r);
    if (o === void 0 && u === void 0) continue;
    (o || (o = 0),
      u || (u = 0),
      o === 0 || u === 0 || Am(o) === Am(u)
        ? ((e[r] = Math.max(de(Mm(o), Mm(u), i), 0)),
          (Yt.test(u) || Yt.test(o)) && (e[r] += "%"))
        : (e[r] = u));
  }
  (t.rotate || n.rotate) && (e.rotate = de(t.rotate || 0, n.rotate || 0, i));
}
function Cm(e, t) {
  return e[t] !== void 0 ? e[t] : e.borderRadius;
}
const f3 = Ry(0, 0.5, Sv),
  d3 = Ry(0.5, 0.95, Nt);
function Ry(e, t, n) {
  return (i) => (i < e ? 0 : i > t ? 1 : n(Ts(e, t, i)));
}
function jm(e, t) {
  ((e.min = t.min), (e.max = t.max));
}
function vt(e, t) {
  (jm(e.x, t.x), jm(e.y, t.y));
}
function Nm(e, t) {
  ((e.translate = t.translate),
    (e.scale = t.scale),
    (e.originPoint = t.originPoint),
    (e.origin = t.origin));
}
function Om(e, t, n, i, a) {
  return (
    (e -= t),
    (e = hr(e, 1 / n, i)),
    a !== void 0 && (e = hr(e, 1 / a, i)),
    e
  );
}
function h3(e, t = 0, n = 1, i = 0.5, a, s = e, l = e) {
  if (
    (Yt.test(t) &&
      ((t = parseFloat(t)), (t = de(l.min, l.max, t / 100) - l.min)),
    typeof t != "number")
  )
    return;
  let r = de(s.min, s.max, i);
  (e === s && (r -= t),
    (e.min = Om(e.min, t, n, r, a)),
    (e.max = Om(e.max, t, n, r, a)));
}
function Dm(e, t, [n, i, a], s, l) {
  h3(e, t[n], t[i], t[a], t.scale, s, l);
}
const m3 = ["x", "scaleX", "originX"],
  p3 = ["y", "scaleY", "originY"];
function zm(e, t, n, i) {
  (Dm(e.x, t, m3, n ? n.x : void 0, i ? i.x : void 0),
    Dm(e.y, t, p3, n ? n.y : void 0, i ? i.y : void 0));
}
function Lm(e) {
  return e.translate === 0 && e.scale === 1;
}
function By(e) {
  return Lm(e.x) && Lm(e.y);
}
function Vm(e, t) {
  return e.min === t.min && e.max === t.max;
}
function g3(e, t) {
  return Vm(e.x, t.x) && Vm(e.y, t.y);
}
function _m(e, t) {
  return (
    Math.round(e.min) === Math.round(t.min) &&
    Math.round(e.max) === Math.round(t.max)
  );
}
function Hy(e, t) {
  return _m(e.x, t.x) && _m(e.y, t.y);
}
function Rm(e) {
  return ke(e.x) / ke(e.y);
}
function Bm(e, t) {
  return (
    e.translate === t.translate &&
    e.scale === t.scale &&
    e.originPoint === t.originPoint
  );
}
class v3 {
  constructor() {
    this.members = [];
  }
  add(t) {
    (Mf(this.members, t), t.scheduleRender());
  }
  remove(t) {
    if (
      (Af(this.members, t),
      t === this.prevLead && (this.prevLead = void 0),
      t === this.lead)
    ) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(t) {
    const n = this.members.findIndex((a) => t === a);
    if (n === 0) return !1;
    let i;
    for (let a = n; a >= 0; a--) {
      const s = this.members[a];
      if (s.isPresent !== !1) {
        i = s;
        break;
      }
    }
    return i ? (this.promote(i), !0) : !1;
  }
  promote(t, n) {
    const i = this.lead;
    if (t !== i && ((this.prevLead = i), (this.lead = t), t.show(), i)) {
      (i.instance && i.scheduleRender(),
        t.scheduleRender(),
        (t.resumeFrom = i),
        n && (t.resumeFrom.preserveOpacity = !0),
        i.snapshot &&
          ((t.snapshot = i.snapshot),
          (t.snapshot.latestValues = i.animationValues || i.latestValues)),
        t.root && t.root.isUpdating && (t.isLayoutDirty = !0));
      const { crossfade: a } = t.options;
      a === !1 && i.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((t) => {
      const { options: n, resumingFrom: i } = t;
      (n.onExitComplete && n.onExitComplete(),
        i && i.options.onExitComplete && i.options.onExitComplete());
    });
  }
  scheduleRender() {
    this.members.forEach((t) => {
      t.instance && t.scheduleRender(!1);
    });
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function y3(e, t, n) {
  let i = "";
  const a = e.x.translate / t.x,
    s = e.y.translate / t.y,
    l = (n == null ? void 0 : n.z) || 0;
  if (
    ((a || s || l) && (i = `translate3d(${a}px, ${s}px, ${l}px) `),
    (t.x !== 1 || t.y !== 1) && (i += `scale(${1 / t.x}, ${1 / t.y}) `),
    n)
  ) {
    const {
      transformPerspective: u,
      rotate: c,
      rotateX: f,
      rotateY: h,
      skewX: d,
      skewY: y,
    } = n;
    (u && (i = `perspective(${u}px) ${i}`),
      c && (i += `rotate(${c}deg) `),
      f && (i += `rotateX(${f}deg) `),
      h && (i += `rotateY(${h}deg) `),
      d && (i += `skewX(${d}deg) `),
      y && (i += `skewY(${y}deg) `));
  }
  const r = e.x.scale * t.x,
    o = e.y.scale * t.y;
  return ((r !== 1 || o !== 1) && (i += `scale(${r}, ${o})`), i || "none");
}
const Yo = ["", "X", "Y", "Z"],
  x3 = 1e3;
let b3 = 0;
function Xo(e, t, n, i) {
  const { latestValues: a } = t;
  a[e] && ((n[e] = a[e]), t.setStaticValue(e, 0), i && (i[e] = 0));
}
function Uy(e) {
  if (((e.hasCheckedOptimisedAppear = !0), e.root === e)) return;
  const { visualElement: t } = e.options;
  if (!t) return;
  const n = Ey(t);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: a, layoutId: s } = e.options;
    window.MotionCancelOptimisedAnimation(n, "transform", ce, !(a || s));
  }
  const { parent: i } = e;
  i && !i.hasCheckedOptimisedAppear && Uy(i);
}
function Gy({
  attachResizeListener: e,
  defaultParent: t,
  measureScroll: n,
  checkIsScrollRoot: i,
  resetTransform: a,
}) {
  return class {
    constructor(l = {}, r = t == null ? void 0 : t()) {
      ((this.id = b3++),
        (this.animationId = 0),
        (this.animationCommitId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          ((this.projectionUpdateScheduled = !1),
            this.nodes.forEach(w3),
            this.nodes.forEach(C3),
            this.nodes.forEach(j3),
            this.nodes.forEach(E3));
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = l),
        (this.root = r ? r.root || r : this),
        (this.path = r ? [...r.path, r] : []),
        (this.parent = r),
        (this.depth = r ? r.depth + 1 : 0));
      for (let o = 0; o < this.path.length; o++)
        this.path[o].shouldResetTransform = !0;
      this.root === this && (this.nodes = new r3());
    }
    addEventListener(l, r) {
      return (
        this.eventHandlers.has(l) || this.eventHandlers.set(l, new Nf()),
        this.eventHandlers.get(l).add(r)
      );
    }
    notifyListeners(l, ...r) {
      const o = this.eventHandlers.get(l);
      o && o.notify(...r);
    }
    hasListeners(l) {
      return this.eventHandlers.has(l);
    }
    mount(l) {
      if (this.instance) return;
      ((this.isSVG = ey(l) && !cT(l)), (this.instance = l));
      const { layoutId: r, layout: o, visualElement: u } = this.options;
      if (
        (u && !u.current && u.mount(l),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        this.root.hasTreeAnimated && (o || r) && (this.isLayoutDirty = !0),
        e)
      ) {
        let c,
          f = 0;
        const h = () => (this.root.updateBlockedByResize = !1);
        (ce.read(() => {
          f = window.innerWidth;
        }),
          e(l, () => {
            const d = window.innerWidth;
            d !== f &&
              ((f = d),
              (this.root.updateBlockedByResize = !0),
              c && c(),
              (c = o3(h, 250)),
              zl.hasAnimatedSinceResize &&
                ((zl.hasAnimatedSinceResize = !1), this.nodes.forEach(Gm)));
          }));
      }
      (r && this.root.registerSharedNode(r, this),
        this.options.animate !== !1 &&
          u &&
          (r || o) &&
          this.addEventListener(
            "didUpdate",
            ({
              delta: c,
              hasLayoutChanged: f,
              hasRelativeLayoutChanged: h,
              layout: d,
            }) => {
              if (this.isTreeAnimationBlocked()) {
                ((this.target = void 0), (this.relativeTarget = void 0));
                return;
              }
              const y =
                  this.options.transition || u.getDefaultTransition() || L3,
                { onLayoutAnimationStart: x, onLayoutAnimationComplete: T } =
                  u.getProps(),
                m = !this.targetLayout || !Hy(this.targetLayout, d),
                p = !f && h;
              if (
                this.options.layoutRoot ||
                this.resumeFrom ||
                p ||
                (f && (m || !this.currentAnimation))
              ) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0));
                const v = { ...Yf(y, "layout"), onPlay: x, onComplete: T };
                ((u.shouldReduceMotion || this.options.layoutRoot) &&
                  ((v.delay = 0), (v.type = !1)),
                  this.startAnimation(v),
                  this.setAnimationOrigin(c, p));
              } else
                (f || Gm(this),
                  this.isLead() &&
                    this.options.onExitComplete &&
                    this.options.onExitComplete());
              this.targetLayout = d;
            },
          ));
    }
    unmount() {
      (this.options.layoutId && this.willUpdate(),
        this.root.nodes.remove(this));
      const l = this.getStack();
      (l && l.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        this.eventHandlers.clear(),
        Qn(this.updateProjection));
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return (
        this.isAnimationBlocked ||
        (this.parent && this.parent.isTreeAnimationBlocked()) ||
        !1
      );
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0),
        this.nodes && this.nodes.forEach(N3),
        this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: l } = this.options;
      return l && l.getProps().transformTemplate;
    }
    willUpdate(l = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        (window.MotionCancelOptimisedAnimation &&
          !this.hasCheckedOptimisedAppear &&
          Uy(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let c = 0; c < this.path.length; c++) {
        const f = this.path[c];
        ((f.shouldResetTransform = !0),
          f.updateScroll("snapshot"),
          f.options.layoutRoot && f.willUpdate(!1));
      }
      const { layoutId: r, layout: o } = this.options;
      if (r === void 0 && !o) return;
      const u = this.getTransformTemplate();
      ((this.prevTransformTemplateValue = u
        ? u(this.latestValues, "")
        : void 0),
        this.updateSnapshot(),
        l && this.notifyListeners("willUpdate"));
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        (this.unblockUpdate(),
          this.clearAllSnapshots(),
          this.nodes.forEach(Hm));
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Um);
        return;
      }
      ((this.animationCommitId = this.animationId),
        this.isUpdating
          ? ((this.isUpdating = !1),
            this.nodes.forEach(A3),
            this.nodes.forEach(S3),
            this.nodes.forEach(T3))
          : this.nodes.forEach(Um),
        this.clearAllSnapshots());
      const r = We.now();
      ((Ve.delta = hn(0, 1e3 / 60, r - Ve.timestamp)),
        (Ve.timestamp = r),
        (Ve.isProcessing = !0),
        Do.update.process(Ve),
        Do.preRender.process(Ve),
        Do.render.process(Ve),
        (Ve.isProcessing = !1));
    }
    didUpdate() {
      this.updateScheduled ||
        ((this.updateScheduled = !0), kf.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      (this.nodes.forEach(M3), this.sharedNodes.forEach(O3));
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0),
        ce.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      ce.postRender(() => {
        this.isLayoutDirty
          ? this.root.didUpdate()
          : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot ||
        !this.instance ||
        ((this.snapshot = this.measure()),
        this.snapshot &&
          !ke(this.snapshot.measuredBox.x) &&
          !ke(this.snapshot.measuredBox.y) &&
          (this.snapshot = void 0));
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) &&
          !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let o = 0; o < this.path.length; o++) this.path[o].updateScroll();
      const l = this.layout;
      ((this.layout = this.measure(!1)),
        (this.layoutCorrected = ve()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners("measure", this.layout.layoutBox));
      const { visualElement: r } = this.options;
      r &&
        r.notify(
          "LayoutMeasure",
          this.layout.layoutBox,
          l ? l.layoutBox : void 0,
        );
    }
    updateScroll(l = "measure") {
      let r = !!(this.options.layoutScroll && this.instance);
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === l &&
          (r = !1),
        r && this.instance)
      ) {
        const o = i(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: l,
          isRoot: o,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : o,
        };
      }
    }
    resetTransform() {
      if (!a) return;
      const l =
          this.isLayoutDirty ||
          this.shouldResetTransform ||
          this.options.alwaysMeasureLayout,
        r = this.projectionDelta && !By(this.projectionDelta),
        o = this.getTransformTemplate(),
        u = o ? o(this.latestValues, "") : void 0,
        c = u !== this.prevTransformTemplateValue;
      l &&
        this.instance &&
        (r || ii(this.latestValues) || c) &&
        (a(this.instance, u),
        (this.shouldResetTransform = !1),
        this.scheduleRender());
    }
    measure(l = !0) {
      const r = this.measurePageBox();
      let o = this.removeElementScroll(r);
      return (
        l && (o = this.removeTransform(o)),
        V3(o),
        {
          animationId: this.root.animationId,
          measuredBox: r,
          layoutBox: o,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      var u;
      const { visualElement: l } = this.options;
      if (!l) return ve();
      const r = l.measureViewportBox();
      if (
        !(
          ((u = this.scroll) == null ? void 0 : u.wasRoot) || this.path.some(_3)
        )
      ) {
        const { scroll: c } = this.root;
        c && (ki(r.x, c.offset.x), ki(r.y, c.offset.y));
      }
      return r;
    }
    removeElementScroll(l) {
      var o;
      const r = ve();
      if ((vt(r, l), (o = this.scroll) != null && o.wasRoot)) return r;
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u],
          { scroll: f, options: h } = c;
        c !== this.root &&
          f &&
          h.layoutScroll &&
          (f.wasRoot && vt(r, l), ki(r.x, f.offset.x), ki(r.y, f.offset.y));
      }
      return r;
    }
    applyTransform(l, r = !1) {
      const o = ve();
      vt(o, l);
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u];
        (!r &&
          c.options.layoutScroll &&
          c.scroll &&
          c !== c.root &&
          Pi(o, { x: -c.scroll.offset.x, y: -c.scroll.offset.y }),
          ii(c.latestValues) && Pi(o, c.latestValues));
      }
      return (ii(this.latestValues) && Pi(o, this.latestValues), o);
    }
    removeTransform(l) {
      const r = ve();
      vt(r, l);
      for (let o = 0; o < this.path.length; o++) {
        const u = this.path[o];
        if (!u.instance || !ii(u.latestValues)) continue;
        oc(u.latestValues) && u.updateSnapshot();
        const c = ve(),
          f = u.measurePageBox();
        (vt(c, f),
          zm(r, u.latestValues, u.snapshot ? u.snapshot.layoutBox : void 0, c));
      }
      return (ii(this.latestValues) && zm(r, this.latestValues), r);
    }
    setTargetDelta(l) {
      ((this.targetDelta = l),
        this.root.scheduleUpdateProjection(),
        (this.isProjectionDirty = !0));
    }
    setOptions(l) {
      this.options = {
        ...this.options,
        ...l,
        crossfade: l.crossfade !== void 0 ? l.crossfade : !0,
      };
    }
    clearMeasurements() {
      ((this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1));
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== Ve.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(l = !1) {
      var h;
      const r = this.getLead();
      (this.isProjectionDirty || (this.isProjectionDirty = r.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = r.isTransformDirty),
        this.isSharedProjectionDirty ||
          (this.isSharedProjectionDirty = r.isSharedProjectionDirty));
      const o = !!this.resumingFrom || this !== r;
      if (
        !(
          l ||
          (o && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          ((h = this.parent) != null && h.isProjectionDirty) ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      )
        return;
      const { layout: c, layoutId: f } = this.options;
      if (!(!this.layout || !(c || f))) {
        if (
          ((this.resolvedRelativeTargetAt = Ve.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          const d = this.getClosestProjectingParent();
          d && d.layout && this.animationProgress !== 1
            ? ((this.relativeParent = d),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = ve()),
              (this.relativeTargetOrigin = ve()),
              ls(
                this.relativeTargetOrigin,
                this.layout.layoutBox,
                d.layout.layoutBox,
              ),
              vt(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
        if (
          !(!this.relativeTarget && !this.targetDelta) &&
          (this.target ||
            ((this.target = ve()), (this.targetWithTransforms = ve())),
          this.relativeTarget &&
          this.relativeTargetOrigin &&
          this.relativeParent &&
          this.relativeParent.target
            ? (this.forceRelativeParentToResolveTarget(),
              qw(this.target, this.relativeTarget, this.relativeParent.target))
            : this.targetDelta
              ? (this.resumingFrom
                  ? (this.target = this.applyTransform(this.layout.layoutBox))
                  : vt(this.target, this.layout.layoutBox),
                yy(this.target, this.targetDelta))
              : vt(this.target, this.layout.layoutBox),
          this.attemptToResolveRelativeTarget)
        ) {
          this.attemptToResolveRelativeTarget = !1;
          const d = this.getClosestProjectingParent();
          d &&
          !!d.resumingFrom == !!this.resumingFrom &&
          !d.options.layoutScroll &&
          d.target &&
          this.animationProgress !== 1
            ? ((this.relativeParent = d),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = ve()),
              (this.relativeTargetOrigin = ve()),
              ls(this.relativeTargetOrigin, this.target, d.target),
              vt(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
      }
    }
    getClosestProjectingParent() {
      if (
        !(
          !this.parent ||
          oc(this.parent.latestValues) ||
          vy(this.parent.latestValues)
        )
      )
        return this.parent.isProjecting()
          ? this.parent
          : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
        this.layout
      );
    }
    calcProjection() {
      var y;
      const l = this.getLead(),
        r = !!this.resumingFrom || this !== l;
      let o = !0;
      if (
        ((this.isProjectionDirty ||
          ((y = this.parent) != null && y.isProjectionDirty)) &&
          (o = !1),
        r &&
          (this.isSharedProjectionDirty || this.isTransformDirty) &&
          (o = !1),
        this.resolvedRelativeTargetAt === Ve.timestamp && (o = !1),
        o)
      )
        return;
      const { layout: u, layoutId: c } = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating ||
          (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(u || c))
      )
        return;
      vt(this.layoutCorrected, this.layout.layoutBox);
      const f = this.treeScale.x,
        h = this.treeScale.y;
      (WT(this.layoutCorrected, this.treeScale, this.path, r),
        l.layout &&
          !l.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((l.target = l.layout.layoutBox), (l.targetWithTransforms = ve())));
      const { target: d } = l;
      if (!d) {
        this.prevProjectionDelta &&
          (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      (!this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (Nm(this.prevProjectionDelta.x, this.projectionDelta.x),
          Nm(this.prevProjectionDelta.y, this.projectionDelta.y)),
        ss(this.projectionDelta, this.layoutCorrected, d, this.latestValues),
        (this.treeScale.x !== f ||
          this.treeScale.y !== h ||
          !Bm(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !Bm(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners("projectionUpdate", d)));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(l = !0) {
      var r;
      if (((r = this.options.visualElement) == null || r.scheduleRender(), l)) {
        const o = this.getStack();
        o && o.scheduleRender();
      }
      this.resumingFrom &&
        !this.resumingFrom.instance &&
        (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      ((this.prevProjectionDelta = Qi()),
        (this.projectionDelta = Qi()),
        (this.projectionDeltaWithTransform = Qi()));
    }
    setAnimationOrigin(l, r = !1) {
      const o = this.snapshot,
        u = o ? o.latestValues : {},
        c = { ...this.latestValues },
        f = Qi();
      ((!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !r));
      const h = ve(),
        d = o ? o.source : void 0,
        y = this.layout ? this.layout.source : void 0,
        x = d !== y,
        T = this.getStack(),
        m = !T || T.members.length <= 1,
        p = !!(x && !m && this.options.crossfade === !0 && !this.path.some(z3));
      this.animationProgress = 0;
      let v;
      ((this.mixTargetDelta = (b) => {
        const w = b / 1e3;
        (qm(f.x, l.x, w),
          qm(f.y, l.y, w),
          this.setTargetDelta(f),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (ls(h, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            D3(this.relativeTarget, this.relativeTargetOrigin, h, w),
            v && g3(this.relativeTarget, v) && (this.isProjectionDirty = !1),
            v || (v = ve()),
            vt(v, this.relativeTarget)),
          x &&
            ((this.animationValues = c), c3(c, u, this.latestValues, w, p, m)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = w));
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0));
    }
    startAnimation(l) {
      var r, o, u;
      (this.notifyListeners("animationStart"),
        (r = this.currentAnimation) == null || r.stop(),
        (u = (o = this.resumingFrom) == null ? void 0 : o.currentAnimation) ==
          null || u.stop(),
        this.pendingAnimation &&
          (Qn(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = ce.update(() => {
          ((zl.hasAnimatedSinceResize = !0),
            this.motionValue || (this.motionValue = ha(0)),
            (this.currentAnimation = s3(this.motionValue, [0, 1e3], {
              ...l,
              velocity: 0,
              isSync: !0,
              onUpdate: (c) => {
                (this.mixTargetDelta(c), l.onUpdate && l.onUpdate(c));
              },
              onStop: () => {},
              onComplete: () => {
                (l.onComplete && l.onComplete(), this.completeAnimation());
              },
            })),
            this.resumingFrom &&
              (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0));
        })));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      const l = this.getStack();
      (l && l.exitAnimationComplete(),
        (this.resumingFrom =
          this.currentAnimation =
          this.animationValues =
            void 0),
        this.notifyListeners("animationComplete"));
    }
    finishAnimation() {
      (this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(x3),
        this.currentAnimation.stop()),
        this.completeAnimation());
    }
    applyTransformsToTarget() {
      const l = this.getLead();
      let {
        targetWithTransforms: r,
        target: o,
        layout: u,
        latestValues: c,
      } = l;
      if (!(!r || !o || !u)) {
        if (
          this !== l &&
          this.layout &&
          u &&
          qy(this.options.animationType, this.layout.layoutBox, u.layoutBox)
        ) {
          o = this.target || ve();
          const f = ke(this.layout.layoutBox.x);
          ((o.x.min = l.target.x.min), (o.x.max = o.x.min + f));
          const h = ke(this.layout.layoutBox.y);
          ((o.y.min = l.target.y.min), (o.y.max = o.y.min + h));
        }
        (vt(r, o),
          Pi(r, c),
          ss(this.projectionDeltaWithTransform, this.layoutCorrected, r, c));
      }
    }
    registerSharedNode(l, r) {
      (this.sharedNodes.has(l) || this.sharedNodes.set(l, new v3()),
        this.sharedNodes.get(l).add(r));
      const u = r.options.initialPromotionConfig;
      r.promote({
        transition: u ? u.transition : void 0,
        preserveFollowOpacity:
          u && u.shouldPreserveFollowOpacity
            ? u.shouldPreserveFollowOpacity(r)
            : void 0,
      });
    }
    isLead() {
      const l = this.getStack();
      return l ? l.lead === this : !0;
    }
    getLead() {
      var r;
      const { layoutId: l } = this.options;
      return l
        ? ((r = this.getStack()) == null ? void 0 : r.lead) || this
        : this;
    }
    getPrevLead() {
      var r;
      const { layoutId: l } = this.options;
      return l ? ((r = this.getStack()) == null ? void 0 : r.prevLead) : void 0;
    }
    getStack() {
      const { layoutId: l } = this.options;
      if (l) return this.root.sharedNodes.get(l);
    }
    promote({ needsReset: l, transition: r, preserveFollowOpacity: o } = {}) {
      const u = this.getStack();
      (u && u.promote(this, o),
        l && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        r && this.setOptions({ transition: r }));
    }
    relegate() {
      const l = this.getStack();
      return l ? l.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: l } = this.options;
      if (!l) return;
      let r = !1;
      const { latestValues: o } = l;
      if (
        ((o.z ||
          o.rotate ||
          o.rotateX ||
          o.rotateY ||
          o.rotateZ ||
          o.skewX ||
          o.skewY) &&
          (r = !0),
        !r)
      )
        return;
      const u = {};
      o.z && Xo("z", l, u, this.animationValues);
      for (let c = 0; c < Yo.length; c++)
        (Xo(`rotate${Yo[c]}`, l, u, this.animationValues),
          Xo(`skew${Yo[c]}`, l, u, this.animationValues));
      l.render();
      for (const c in u)
        (l.setStaticValue(c, u[c]),
          this.animationValues && (this.animationValues[c] = u[c]));
      l.scheduleRender();
    }
    applyProjectionStyles(l, r) {
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) {
        l.visibility = "hidden";
        return;
      }
      const o = this.getTransformTemplate();
      if (this.needsReset) {
        ((this.needsReset = !1),
          (l.visibility = ""),
          (l.opacity = ""),
          (l.pointerEvents = Dl(r == null ? void 0 : r.pointerEvents) || ""),
          (l.transform = o ? o(this.latestValues, "") : "none"));
        return;
      }
      const u = this.getLead();
      if (!this.projectionDelta || !this.layout || !u.target) {
        (this.options.layoutId &&
          ((l.opacity =
            this.latestValues.opacity !== void 0
              ? this.latestValues.opacity
              : 1),
          (l.pointerEvents = Dl(r == null ? void 0 : r.pointerEvents) || "")),
          this.hasProjected &&
            !ii(this.latestValues) &&
            ((l.transform = o ? o({}, "") : "none"), (this.hasProjected = !1)));
        return;
      }
      l.visibility = "";
      const c = u.animationValues || u.latestValues;
      this.applyTransformsToTarget();
      let f = y3(this.projectionDeltaWithTransform, this.treeScale, c);
      (o && (f = o(c, f)), (l.transform = f));
      const { x: h, y: d } = this.projectionDelta;
      ((l.transformOrigin = `${h.origin * 100}% ${d.origin * 100}% 0`),
        u.animationValues
          ? (l.opacity =
              u === this
                ? (c.opacity ?? this.latestValues.opacity ?? 1)
                : this.preserveOpacity
                  ? this.latestValues.opacity
                  : c.opacityExit)
          : (l.opacity =
              u === this
                ? c.opacity !== void 0
                  ? c.opacity
                  : ""
                : c.opacityExit !== void 0
                  ? c.opacityExit
                  : 0));
      for (const y in As) {
        if (c[y] === void 0) continue;
        const { correct: x, applyTo: T, isCSSVariable: m } = As[y],
          p = f === "none" ? c[y] : x(c[y], u);
        if (T) {
          const v = T.length;
          for (let b = 0; b < v; b++) l[T[b]] = p;
        } else
          m ? (this.options.visualElement.renderState.vars[y] = p) : (l[y] = p);
      }
      this.options.layoutId &&
        (l.pointerEvents =
          u === this ? Dl(r == null ? void 0 : r.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      (this.root.nodes.forEach((l) => {
        var r;
        return (r = l.currentAnimation) == null ? void 0 : r.stop();
      }),
        this.root.nodes.forEach(Hm),
        this.root.sharedNodes.clear());
    }
  };
}
function S3(e) {
  e.updateLayout();
}
function T3(e) {
  var n;
  const t = ((n = e.resumeFrom) == null ? void 0 : n.snapshot) || e.snapshot;
  if (e.isLead() && e.layout && t && e.hasListeners("didUpdate")) {
    const { layoutBox: i, measuredBox: a } = e.layout,
      { animationType: s } = e.options,
      l = t.source !== e.layout.source;
    s === "size"
      ? yt((f) => {
          const h = l ? t.measuredBox[f] : t.layoutBox[f],
            d = ke(h);
          ((h.min = i[f].min), (h.max = h.min + d));
        })
      : qy(s, t.layoutBox, i) &&
        yt((f) => {
          const h = l ? t.measuredBox[f] : t.layoutBox[f],
            d = ke(i[f]);
          ((h.max = h.min + d),
            e.relativeTarget &&
              !e.currentAnimation &&
              ((e.isProjectionDirty = !0),
              (e.relativeTarget[f].max = e.relativeTarget[f].min + d)));
        });
    const r = Qi();
    ss(r, i, t.layoutBox);
    const o = Qi();
    l ? ss(o, e.applyTransform(a, !0), t.measuredBox) : ss(o, i, t.layoutBox);
    const u = !By(r);
    let c = !1;
    if (!e.resumeFrom) {
      const f = e.getClosestProjectingParent();
      if (f && !f.resumeFrom) {
        const { snapshot: h, layout: d } = f;
        if (h && d) {
          const y = ve();
          ls(y, t.layoutBox, h.layoutBox);
          const x = ve();
          (ls(x, i, d.layoutBox),
            Hy(y, x) || (c = !0),
            f.options.layoutRoot &&
              ((e.relativeTarget = x),
              (e.relativeTargetOrigin = y),
              (e.relativeParent = f)));
        }
      }
    }
    e.notifyListeners("didUpdate", {
      layout: i,
      snapshot: t,
      delta: o,
      layoutDelta: r,
      hasLayoutChanged: u,
      hasRelativeLayoutChanged: c,
    });
  } else if (e.isLead()) {
    const { onExitComplete: i } = e.options;
    i && i();
  }
  e.options.transition = void 0;
}
function w3(e) {
  e.parent &&
    (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty),
    e.isSharedProjectionDirty ||
      (e.isSharedProjectionDirty = !!(
        e.isProjectionDirty ||
        e.parent.isProjectionDirty ||
        e.parent.isSharedProjectionDirty
      )),
    e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty));
}
function E3(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function M3(e) {
  e.clearSnapshot();
}
function Hm(e) {
  e.clearMeasurements();
}
function Um(e) {
  e.isLayoutDirty = !1;
}
function A3(e) {
  const { visualElement: t } = e.options;
  (t && t.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"),
    e.resetTransform());
}
function Gm(e) {
  (e.finishAnimation(),
    (e.targetDelta = e.relativeTarget = e.target = void 0),
    (e.isProjectionDirty = !0));
}
function C3(e) {
  e.resolveTargetDelta();
}
function j3(e) {
  e.calcProjection();
}
function N3(e) {
  e.resetSkewAndRotation();
}
function O3(e) {
  e.removeLeadSnapshot();
}
function qm(e, t, n) {
  ((e.translate = de(t.translate, 0, n)),
    (e.scale = de(t.scale, 1, n)),
    (e.origin = t.origin),
    (e.originPoint = t.originPoint));
}
function Ym(e, t, n, i) {
  ((e.min = de(t.min, n.min, i)), (e.max = de(t.max, n.max, i)));
}
function D3(e, t, n, i) {
  (Ym(e.x, t.x, n.x, i), Ym(e.y, t.y, n.y, i));
}
function z3(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
const L3 = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  Xm = (e) =>
    typeof navigator < "u" &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().includes(e),
  km = Xm("applewebkit/") && !Xm("chrome/") ? Math.round : Nt;
function Pm(e) {
  ((e.min = km(e.min)), (e.max = km(e.max)));
}
function V3(e) {
  (Pm(e.x), Pm(e.y));
}
function qy(e, t, n) {
  return (
    e === "position" || (e === "preserve-aspect" && !Gw(Rm(t), Rm(n), 0.2))
  );
}
function _3(e) {
  var t;
  return e !== e.root && ((t = e.scroll) == null ? void 0 : t.wasRoot);
}
const R3 = Gy({
    attachResizeListener: (e, t) => Cs(e, "resize", t),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  ko = { current: void 0 },
  Yy = Gy({
    measureScroll: (e) => ({ x: e.scrollLeft, y: e.scrollTop }),
    defaultParent: () => {
      if (!ko.current) {
        const e = new R3({});
        (e.mount(window), e.setOptions({ layoutScroll: !0 }), (ko.current = e));
      }
      return ko.current;
    },
    resetTransform: (e, t) => {
      e.style.transform = t !== void 0 ? t : "none";
    },
    checkIsScrollRoot: (e) => window.getComputedStyle(e).position === "fixed",
  }),
  B3 = {
    pan: { Feature: t3 },
    drag: { Feature: e3, ProjectionNode: Yy, MeasureLayout: Vy },
  };
function Qm(e, t, n) {
  const { props: i } = e;
  e.animationState &&
    i.whileHover &&
    e.animationState.setActive("whileHover", n === "Start");
  const a = "onHover" + n,
    s = i[a];
  s && ce.postRender(() => s(t, Ps(t)));
}
class H3 extends $n {
  mount() {
    const { current: t } = this.node;
    t &&
      (this.unmount = sT(
        t,
        (n, i) => (Qm(this.node, i, "Start"), (a) => Qm(this.node, a, "End")),
      ));
  }
  unmount() {}
}
class U3 extends $n {
  constructor() {
    (super(...arguments), (this.isActive = !1));
  }
  onFocus() {
    let t = !1;
    try {
      t = this.node.current.matches(":focus-visible");
    } catch {
      t = !0;
    }
    !t ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !0),
      (this.isActive = !0));
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !1),
      (this.isActive = !1));
  }
  mount() {
    this.unmount = Ys(
      Cs(this.node.current, "focus", () => this.onFocus()),
      Cs(this.node.current, "blur", () => this.onBlur()),
    );
  }
  unmount() {}
}
function Km(e, t, n) {
  const { props: i } = e;
  if (e.current instanceof HTMLButtonElement && e.current.disabled) return;
  e.animationState &&
    i.whileTap &&
    e.animationState.setActive("whileTap", n === "Start");
  const a = "onTap" + (n === "End" ? "" : n),
    s = i[a];
  s && ce.postRender(() => s(t, Ps(t)));
}
class G3 extends $n {
  mount() {
    const { current: t } = this.node;
    t &&
      (this.unmount = uT(
        t,
        (n, i) => (
          Km(this.node, i, "Start"),
          (a, { success: s }) => Km(this.node, a, s ? "End" : "Cancel")
        ),
        { useGlobalTarget: this.node.props.globalTapTarget },
      ));
  }
  unmount() {}
}
const pc = new WeakMap(),
  Po = new WeakMap(),
  q3 = (e) => {
    const t = pc.get(e.target);
    t && t(e);
  },
  Y3 = (e) => {
    e.forEach(q3);
  };
function X3({ root: e, ...t }) {
  const n = e || document;
  Po.has(n) || Po.set(n, {});
  const i = Po.get(n),
    a = JSON.stringify(t);
  return (
    i[a] || (i[a] = new IntersectionObserver(Y3, { root: e, ...t })),
    i[a]
  );
}
function k3(e, t, n) {
  const i = X3(t);
  return (
    pc.set(e, n),
    i.observe(e),
    () => {
      (pc.delete(e), i.unobserve(e));
    }
  );
}
const P3 = { some: 0, all: 1 };
class Q3 extends $n {
  constructor() {
    (super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1));
  }
  startObserver() {
    this.unmount();
    const { viewport: t = {} } = this.node.getProps(),
      { root: n, margin: i, amount: a = "some", once: s } = t,
      l = {
        root: n ? n.current : void 0,
        rootMargin: i,
        threshold: typeof a == "number" ? a : P3[a],
      },
      r = (o) => {
        const { isIntersecting: u } = o;
        if (
          this.isInView === u ||
          ((this.isInView = u), s && !u && this.hasEnteredView)
        )
          return;
        (u && (this.hasEnteredView = !0),
          this.node.animationState &&
            this.node.animationState.setActive("whileInView", u));
        const { onViewportEnter: c, onViewportLeave: f } = this.node.getProps(),
          h = u ? c : f;
        h && h(o);
      };
    return k3(this.node.current, l, r);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u") return;
    const { props: t, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(K3(t, n)) && this.startObserver();
  }
  unmount() {}
}
function K3({ viewport: e = {} }, { viewport: t = {} } = {}) {
  return (n) => e[n] !== t[n];
}
const Z3 = {
    inView: { Feature: Q3 },
    tap: { Feature: G3 },
    focus: { Feature: U3 },
    hover: { Feature: H3 },
  },
  F3 = { layout: { ProjectionNode: Yy, MeasureLayout: Vy } },
  $3 = { ...Vw, ...Z3, ...B3, ...F3 },
  H = $T($3, uw);
var Xy = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0,
  },
  Zm = ie.createContext && ie.createContext(Xy),
  I3 = ["attr", "size", "title"];
function J3(e, t) {
  if (e == null) return {};
  var n = W3(e, t),
    i,
    a;
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (a = 0; a < s.length; a++)
      ((i = s[a]),
        !(t.indexOf(i) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, i) &&
          (n[i] = e[i]));
  }
  return n;
}
function W3(e, t) {
  if (e == null) return {};
  var n = {};
  for (var i in e)
    if (Object.prototype.hasOwnProperty.call(e, i)) {
      if (t.indexOf(i) >= 0) continue;
      n[i] = e[i];
    }
  return n;
}
function mr() {
  return (
    (mr = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var i in n)
              Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
          }
          return e;
        }),
    mr.apply(this, arguments)
  );
}
function Fm(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    (t &&
      (i = i.filter(function (a) {
        return Object.getOwnPropertyDescriptor(e, a).enumerable;
      })),
      n.push.apply(n, i));
  }
  return n;
}
function pr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Fm(Object(n), !0).forEach(function (i) {
          eE(e, i, n[i]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Fm(Object(n)).forEach(function (i) {
            Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(n, i));
          });
  }
  return e;
}
function eE(e, t, n) {
  return (
    (t = tE(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function tE(e) {
  var t = nE(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function nE(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(e, t);
    if (typeof i != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ky(e) {
  return (
    e &&
    e.map((t, n) =>
      ie.createElement(t.tag, pr({ key: n }, t.attr), ky(t.child)),
    )
  );
}
function it(e) {
  return (t) =>
    ie.createElement(iE, mr({ attr: pr({}, e.attr) }, t), ky(e.child));
}
function iE(e) {
  var t = (n) => {
    var { attr: i, size: a, title: s } = e,
      l = J3(e, I3),
      r = a || n.size || "1em",
      o;
    return (
      n.className && (o = n.className),
      e.className && (o = (o ? o + " " : "") + e.className),
      ie.createElement(
        "svg",
        mr(
          { stroke: "currentColor", fill: "currentColor", strokeWidth: "0" },
          n.attr,
          i,
          l,
          {
            className: o,
            style: pr(pr({ color: e.color || n.color }, n.style), e.style),
            height: r,
            width: r,
            xmlns: "http://www.w3.org/2000/svg",
          },
        ),
        s && ie.createElement("title", null, s),
        e.children,
      )
    );
  };
  return Zm !== void 0
    ? ie.createElement(Zm.Consumer, null, (n) => t(n))
    : t(Xy);
}
function aE(e) {
  return it({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z",
        },
        child: [],
      },
    ],
  })(e);
}
function sE(e) {
  return it({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z",
        },
        child: [],
      },
    ],
  })(e);
}
function lE(e) {
  return it({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z",
        },
        child: [],
      },
    ],
  })(e);
}
function $m(e) {
  return it({
    attr: { viewBox: "0 0 320 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z",
        },
        child: [],
      },
    ],
  })(e);
}
function Im(e) {
  return it({
    attr: { viewBox: "0 0 320 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z",
        },
        child: [],
      },
    ],
  })(e);
}
function Jm(e) {
  return it({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z",
        },
        child: [],
      },
    ],
  })(e);
}
function Py(e) {
  return it({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M502.61 233.32L278.68 9.39c-12.52-12.52-32.83-12.52-45.36 0L9.39 233.32c-12.52 12.53-12.52 32.83 0 45.36l223.93 223.93c12.52 12.53 32.83 12.53 45.36 0l223.93-223.93c12.52-12.53 12.52-32.83 0-45.36zm-100.98 12.56l-84.21 77.73c-5.12 4.73-13.43 1.1-13.43-5.88V264h-96v64c0 4.42-3.58 8-8 8h-32c-4.42 0-8-3.58-8-8v-80c0-17.67 14.33-32 32-32h112v-53.73c0-6.97 8.3-10.61 13.43-5.88l84.21 77.73c3.43 3.17 3.43 8.59 0 11.76z",
        },
        child: [],
      },
    ],
  })(e);
}
function rE(e) {
  return it({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm256 32h160c17.7 0 32-14.3 32-32V320H288v160zm192-320h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40z",
        },
        child: [],
      },
    ],
  })(e);
}
function hi(e) {
  return it({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z",
        },
        child: [],
      },
    ],
  })(e);
}
function oE(e) {
  return it({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z",
        },
        child: [],
      },
    ],
  })(e);
}
function Qy(e) {
  return it({
    attr: { viewBox: "0 0 384 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z",
        },
        child: [],
      },
    ],
  })(e);
}
function uE(e) {
  return it({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z",
        },
        child: [],
      },
    ],
  })(e);
}
function cE(e) {
  return it({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z",
        },
        child: [],
      },
    ],
  })(e);
}
function Ky(e) {
  return it({
    attr: { viewBox: "0 0 352 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z",
        },
        child: [],
      },
    ],
  })(e);
}
const fE = "/assets/welcome_wedding-CBIL9njb.jpg",
  dE = () => {
    const e = () => {
      const t = document.getElementById("hero-section");
      t && t.scrollIntoView({ behavior: "smooth" });
    };
    return g.jsxs("section", {
      className:
        "relative min-h-screen flex items-center justify-center overflow-hidden",
      children: [
        g.jsx(H.div, {
          initial: { scale: 1.1 },
          animate: { scale: 1 },
          transition: { duration: 2 },
          className: "absolute inset-0 bg-cover bg-center",
          style: { backgroundImage: `url(${fE})` },
          children: g.jsx("div", {
            className:
              "absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70",
          }),
        }),
        g.jsxs("div", {
          className: "relative z-10 text-center px-4 max-w-4xl mx-auto",
          children: [
            g.jsx(H.div, {
              initial: { width: 0 },
              animate: { width: "100%" },
              transition: { duration: 1.5, delay: 0.3 },
              className:
                "h-px bg-gradient-to-r from-transparent via-wedding-gold to-transparent mb-8",
            }),
            g.jsx(H.div, {
              initial: { y: -30, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              transition: { duration: 1, delay: 0.5 },
              children: g.jsx("h1", {
                className:
                  "font-elegant text-xl md:text-2xl text-wedding-gold tracking-[0.3em] mb-6 uppercase",
                children: "Welcome To Our",
              }),
            }),
            g.jsx(H.div, {
              initial: { scale: 0.5, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { duration: 1, delay: 0.8 },
              children: g.jsx("h2", {
                className:
                  "font-script text-7xl md:text-8xl lg:text-9xl text-white mb-6 drop-shadow-2xl",
                children: "Wedding",
              }),
            }),
            g.jsxs(H.div, {
              initial: { y: 30, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              transition: { duration: 1, delay: 1.1 },
              children: [
                g.jsxs("p", {
                  className:
                    "font-serif text-2xl md:text-3xl lg:text-4xl text-white mb-4",
                  children: [
                    "Mai Anh ",
                    g.jsx("span", {
                      className: "text-wedding-gold mx-2 md:mx-4",
                      children: "&",
                    }),
                    " Minh Quân",
                  ],
                }),
                g.jsx("p", {
                  className:
                    "font-sans text-base md:text-lg text-gray-300 mt-4 tracking-widest",
                  children: "12 . 10 . 2025",
                }),
              ],
            }),
            g.jsx(H.div, {
              initial: { width: 0 },
              animate: { width: "100%" },
              transition: { duration: 1.5, delay: 1.4 },
              className:
                "h-px bg-gradient-to-r from-transparent via-wedding-gold to-transparent mt-8",
            }),
            g.jsx(H.button, {
              initial: { opacity: 0 },
              animate: { opacity: 1, y: [0, 10, 0] },
              transition: {
                opacity: { delay: 2 },
                y: { duration: 2, repeat: 1 / 0, ease: "easeInOut" },
              },
              onClick: e,
              className:
                "mt-16 text-white flex flex-col items-center gap-2 mx-auto cursor-pointer group",
              children: g.jsx(lE, {
                className:
                  "text-2xl group-hover:text-wedding-gold transition-colors",
              }),
            }),
          ],
        }),
        g.jsx(H.div, {
          initial: { opacity: 0 },
          animate: { opacity: 0.2 },
          transition: { duration: 2, delay: 1 },
          className:
            "absolute top-10 left-10 w-24 h-24 md:w-32 md:h-32 border border-wedding-gold rounded-full",
        }),
        g.jsx(H.div, {
          initial: { opacity: 0 },
          animate: { opacity: 0.2 },
          transition: { duration: 2, delay: 1.2 },
          className:
            "absolute bottom-20 right-10 w-20 h-20 md:w-24 md:h-24 border border-wedding-gold rounded-full",
        }),
      ],
    });
  },
  gr = "/assets/02-1-BHMUzJu_.jpg",
  pa = "/assets/02-4-RoWlsgB1.jpg",
  hE = "/assets/hero-DXhmrLm6.jpg",
  mE = () =>
    g.jsxs("section", {
      id: "hero-section",
      className:
        "relative min-h-screen flex items-center justify-center bg-gradient-to-b from-wedding-cream via-wedding-secondary to-wedding-cream overflow-hidden py-16 px-4",
      children: [
        g.jsxs("div", {
          className: "absolute inset-0 opacity-10",
          children: [
            g.jsx("div", {
              className:
                "absolute top-10 left-10 w-32 h-32 border-2 border-wedding-gold rounded-full animate-float",
            }),
            g.jsx("div", {
              className:
                "absolute bottom-20 right-10 w-40 h-40 border-2 border-wedding-gold rounded-full animate-float",
              style: { animationDelay: "1s" },
            }),
          ],
        }),
        g.jsxs("div", {
          className: "container mx-auto max-w-6xl relative z-10",
          children: [
            g.jsxs("div", {
              className: "grid lg:grid-cols-2 gap-8 lg:gap-12 items-start",
              children: [
                g.jsxs(H.div, {
                  initial: { opacity: 0, x: -50 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: !0 },
                  transition: { duration: 1 },
                  className: "relative group order-2 lg:order-1",
                  children: [
                    g.jsxs("div", {
                      className:
                        "relative overflow-hidden rounded-3xl shadow-2xl",
                      children: [
                        g.jsx("img", {
                          src: hE,
                          alt: "Wedding",
                          className:
                            "w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-700",
                        }),
                        g.jsx("div", {
                          className:
                            "absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent",
                        }),
                        g.jsx("div", {
                          className:
                            "absolute bottom-8 left-0 right-0 text-center px-6",
                          children: g.jsxs("p", {
                            className:
                              "text-white text-sm md:text-base font-serif italic drop-shadow-lg",
                            children: [
                              "I love three things in this world.",
                              g.jsx("br", {}),
                              "Sun, moon and you.",
                            ],
                          }),
                        }),
                      ],
                    }),
                    g.jsx("div", {
                      className:
                        "absolute -top-3 -left-3 w-16 h-16 border-t-4 border-l-4 border-wedding-gold",
                    }),
                    g.jsx("div", {
                      className:
                        "absolute -bottom-3 -right-3 w-16 h-16 border-b-4 border-r-4 border-wedding-gold",
                    }),
                  ],
                }),
                g.jsxs("div", {
                  className: "order-1 lg:order-2",
                  children: [
                    g.jsxs(H.div, {
                      initial: { opacity: 0, y: -20 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: !0 },
                      transition: { duration: 1 },
                      className: "text-center mb-8",
                      children: [
                        g.jsx("h1", {
                          className:
                            "font-script text-4xl md:text-5xl text-wedding-gold mb-2",
                          children: "Wedding Invitation",
                        }),
                        g.jsx("p", {
                          className: "text-gray-600 text-sm",
                          children: "Save The Date",
                        }),
                      ],
                    }),
                    g.jsxs("div", {
                      className: "md:hidden px-2 mb-8",
                      children: [
                        g.jsxs(H.div, {
                          initial: { opacity: 0, x: -30 },
                          whileInView: { opacity: 1, x: 0 },
                          viewport: { once: !0 },
                          transition: { duration: 1 },
                          className: "flex items-center gap-4 mb-6",
                          children: [
                            g.jsxs("div", {
                              className: "relative group flex-shrink-0",
                              children: [
                                g.jsx("div", {
                                  className:
                                    "absolute -inset-2 bg-gradient-to-br from-wedding-gold to-wedding-primary rounded-full opacity-20",
                                }),
                                g.jsxs("div", {
                                  className:
                                    "relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl ring-2 ring-wedding-gold/30",
                                  children: [
                                    g.jsx("img", {
                                      src: gr,
                                      alt: "Mai Anh",
                                      className: "w-full h-full object-cover",
                                    }),
                                    g.jsx("div", {
                                      className:
                                        "absolute inset-0 bg-gradient-to-t from-black/10 to-transparent",
                                    }),
                                  ],
                                }),
                                g.jsx("div", {
                                  className:
                                    "absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-wedding-gold",
                                }),
                                g.jsx("div", {
                                  className:
                                    "absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-wedding-gold",
                                }),
                              ],
                            }),
                            g.jsxs("div", {
                              className: "flex-1 text-left",
                              children: [
                                g.jsx("h2", {
                                  className:
                                    "font-script text-4xl text-wedding-gold mb-1 drop-shadow-lg",
                                  children: "Mai Anh",
                                }),
                                g.jsxs("div", {
                                  className: "flex items-center gap-2 mb-1",
                                  children: [
                                    g.jsx("div", {
                                      className: "w-8 h-px bg-wedding-gold",
                                    }),
                                    g.jsx("p", {
                                      className:
                                        "text-xs font-serif italic text-gray-600",
                                      children: "The Bride",
                                    }),
                                  ],
                                }),
                                g.jsx("p", {
                                  className: "text-xs text-gray-500",
                                  children: "Nguyễn Mai Anh",
                                }),
                              ],
                            }),
                          ],
                        }),
                        g.jsxs(H.div, {
                          initial: { scale: 0 },
                          whileInView: { scale: 1 },
                          viewport: { once: !0 },
                          className: "flex justify-center my-8 relative",
                          children: [
                            g.jsx("div", {
                              className:
                                "absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-wedding-gold/30 to-transparent",
                            }),
                            g.jsx(H.div, {
                              animate: { scale: [1, 1.2, 1] },
                              transition: {
                                duration: 2,
                                repeat: 1 / 0,
                                repeatDelay: 1,
                              },
                              className:
                                "bg-gradient-to-br from-wedding-gold to-wedding-primary p-4 rounded-full shadow-2xl ring-4 ring-white/80 relative z-10",
                              children: g.jsx(hi, {
                                className: "text-white text-3xl",
                              }),
                            }),
                          ],
                        }),
                        g.jsxs(H.div, {
                          initial: { opacity: 0, x: 30 },
                          whileInView: { opacity: 1, x: 0 },
                          viewport: { once: !0 },
                          transition: { duration: 1 },
                          className: "flex items-center gap-4 flex-row-reverse",
                          children: [
                            g.jsxs("div", {
                              className: "relative group flex-shrink-0",
                              children: [
                                g.jsx("div", {
                                  className:
                                    "absolute -inset-2 bg-gradient-to-br from-wedding-gold to-wedding-primary rounded-full opacity-20",
                                }),
                                g.jsxs("div", {
                                  className:
                                    "relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl ring-2 ring-wedding-gold/30",
                                  children: [
                                    g.jsx("img", {
                                      src: pa,
                                      alt: "Minh Quân",
                                      className: "w-full h-full object-cover",
                                    }),
                                    g.jsx("div", {
                                      className:
                                        "absolute inset-0 bg-gradient-to-t from-black/10 to-transparent",
                                    }),
                                  ],
                                }),
                                g.jsx("div", {
                                  className:
                                    "absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-wedding-gold",
                                }),
                                g.jsx("div", {
                                  className:
                                    "absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-wedding-gold",
                                }),
                              ],
                            }),
                            g.jsxs("div", {
                              className: "flex-1 text-right",
                              children: [
                                g.jsx("h2", {
                                  className:
                                    "font-script text-4xl text-wedding-gold mb-1 drop-shadow-lg",
                                  children: "Minh Quân",
                                }),
                                g.jsxs("div", {
                                  className:
                                    "flex items-center gap-2 justify-end mb-1",
                                  children: [
                                    g.jsx("p", {
                                      className:
                                        "text-xs font-serif italic text-gray-600",
                                      children: "The Groom",
                                    }),
                                    g.jsx("div", {
                                      className: "w-8 h-px bg-wedding-gold",
                                    }),
                                  ],
                                }),
                                g.jsx("p", {
                                  className: "text-xs text-gray-500",
                                  children: "Lê Minh Quân",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    g.jsxs("div", {
                      className:
                        "hidden md:grid md:grid-cols-3 gap-4 items-center mb-8",
                      children: [
                        g.jsxs(H.div, {
                          initial: { opacity: 0, x: -30 },
                          whileInView: { opacity: 1, x: 0 },
                          viewport: { once: !0 },
                          transition: { duration: 1 },
                          className: "flex flex-col items-center",
                          children: [
                            g.jsxs("div", {
                              className: "relative group mb-4",
                              children: [
                                g.jsx("div", {
                                  className:
                                    "absolute -inset-3 bg-gradient-to-br from-wedding-gold to-wedding-primary rounded-full opacity-20 group-hover:opacity-30 transition-opacity",
                                }),
                                g.jsx("div", {
                                  className:
                                    "relative w-40 h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-white shadow-xl",
                                  children: g.jsx("img", {
                                    src: gr,
                                    alt: "Mai Anh",
                                    className:
                                      "w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500",
                                  }),
                                }),
                                g.jsx("div", {
                                  className:
                                    "absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-wedding-gold",
                                }),
                                g.jsx("div", {
                                  className:
                                    "absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-wedding-gold",
                                }),
                              ],
                            }),
                            g.jsx("h2", {
                              className:
                                "font-script text-3xl lg:text-4xl text-wedding-gold mb-1",
                              children: "Mai Anh",
                            }),
                            g.jsx("p", {
                              className: "text-xs lg:text-sm text-gray-500",
                              children: "Nguyễn Mai Anh",
                            }),
                          ],
                        }),
                        g.jsxs(H.div, {
                          initial: { scale: 0 },
                          whileInView: { scale: 1 },
                          viewport: { once: !0 },
                          transition: { duration: 1, delay: 0.3 },
                          className: "flex flex-col items-center",
                          children: [
                            g.jsx(H.div, {
                              animate: { scale: [1, 1.2, 1] },
                              transition: {
                                duration: 2,
                                repeat: 1 / 0,
                                repeatDelay: 1,
                              },
                              className:
                                "bg-gradient-to-br from-wedding-gold to-wedding-primary p-4 lg:p-5 rounded-full shadow-2xl",
                              children: g.jsx(hi, {
                                className: "text-white text-3xl lg:text-4xl",
                              }),
                            }),
                            g.jsx("p", {
                              className:
                                "text-wedding-gold font-script text-2xl lg:text-3xl mt-3",
                              children: "&",
                            }),
                          ],
                        }),
                        g.jsxs(H.div, {
                          initial: { opacity: 0, x: 30 },
                          whileInView: { opacity: 1, x: 0 },
                          viewport: { once: !0 },
                          transition: { duration: 1 },
                          className: "flex flex-col items-center",
                          children: [
                            g.jsxs("div", {
                              className: "relative group mb-4",
                              children: [
                                g.jsx("div", {
                                  className:
                                    "absolute -inset-3 bg-gradient-to-br from-wedding-gold to-wedding-primary rounded-full opacity-20 group-hover:opacity-30 transition-opacity",
                                }),
                                g.jsx("div", {
                                  className:
                                    "relative w-40 h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-white shadow-xl",
                                  children: g.jsx("img", {
                                    src: pa,
                                    alt: "Minh Quân",
                                    className:
                                      "w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500",
                                  }),
                                }),
                                g.jsx("div", {
                                  className:
                                    "absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-wedding-gold",
                                }),
                                g.jsx("div", {
                                  className:
                                    "absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-wedding-gold",
                                }),
                              ],
                            }),
                            g.jsx("h2", {
                              className:
                                "font-script text-3xl lg:text-4xl text-wedding-gold mb-1",
                              children: "Minh Quân",
                            }),
                            g.jsx("p", {
                              className: "text-xs lg:text-sm text-gray-500",
                              children: "Lê Minh Quân",
                            }),
                          ],
                        }),
                      ],
                    }),
                    g.jsx(H.div, {
                      initial: { opacity: 0, y: 30 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: !0 },
                      transition: { duration: 1, delay: 0.6 },
                      className:
                        "bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-2xl p-6 md:p-8 border-2 border-wedding-gold/20",
                      children: g.jsxs("div", {
                        className: "text-center",
                        children: [
                          g.jsx("div", {
                            className:
                              "font-script text-5xl md:text-6xl font-bold text-wedding-gold mb-2",
                            children: "12",
                          }),
                          g.jsx("div", {
                            className:
                              "text-base md:text-lg font-serif text-gray-700 mb-2",
                            children: "Chủ Nhật",
                          }),
                          g.jsxs("div", {
                            className:
                              "  flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base text-gray-600 mb-3",
                            children: [
                              g.jsx("span", { children: "12:00 PM" }),
                              g.jsx("div", {
                                className:
                                  "w-1 h-1 bg-wedding-gold rounded-full ",
                              }),
                              g.jsx("span", { children: "Trưa" }),
                            ],
                          }),
                          g.jsx("div", {
                            className:
                              "text-lg md:text-xl font-script text-gray-700 mb-2",
                            children: "Tháng 10 Năm 2025",
                          }),
                          g.jsx("div", {
                            className:
                              "text-xs md:text-sm text-gray-500 italic font-serif mb-4",
                            children: "(Tức ngày 19 tháng 09 năm Ất Tỵ)",
                          }),
                          g.jsxs("div", {
                            className: "pt-4 border-t border-wedding-gold/30",
                            children: [
                              g.jsxs("div", {
                                className:
                                  "flex items-center justify-center gap-2 text-gray-500 mb-2",
                                children: [
                                  g.jsx(Qy, {
                                    className:
                                      "text-wedding-gold text-sm md:text-base",
                                  }),
                                  g.jsx("span", {
                                    className:
                                      "text-base md:text-lg font-serif text-gray-700 ",
                                    children: "Địa điểm",
                                  }),
                                ],
                              }),
                              g.jsx("p", {
                                className:
                                  "text-xl md:text-1xl font-serif text-gray-700 mb-2",
                                children: "Nhà hàng tiệc cưới VHC Devstack",
                              }),
                              g.jsx("p", {
                                className:
                                  "text-xs md:text-sm text-gray-500 leading-relaxed font-sans mb-4",
                                children:
                                  "Địa chỉ: 808 Đường Lê Văn Việt, Phường Tân Định, Quận 1, TP.HCM",
                              }),
                              g.jsxs("div", {
                                className: "relative inline-block",
                                children: [
                                  g.jsx(H.div, {
                                    className:
                                      "absolute inset-0 bg-wedding-gold rounded-full opacity-30",
                                    animate: {
                                      scale: [1, 1.3, 1],
                                      opacity: [0.3, 0, 0.3],
                                    },
                                    transition: {
                                      duration: 2,
                                      repeat: 1 / 0,
                                      ease: "easeInOut",
                                    },
                                  }),
                                  g.jsxs(H.a, {
                                    href: "https://www.google.com/maps/search/?api=1&query=808+Đường+Lê+Văn+Việt,+Phường+Tân+Định,+Quận+1,+TP.HCM",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className:
                                      "relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-wedding-gold to-wedding-primary text-white font-sans text-sm md:text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
                                    whileHover: { scale: 1.08 },
                                    whileTap: { scale: 0.95 },
                                    animate: { y: [0, -8, 0] },
                                    transition: {
                                      y: {
                                        duration: 1.5,
                                        repeat: 1 / 0,
                                        ease: "easeInOut",
                                      },
                                    },
                                    children: [
                                      g.jsx(Py, { className: "text-lg" }),
                                      g.jsx("span", { children: "Chỉ đường" }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              ],
            }),
            g.jsxs(H.div, {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: !0 },
              transition: { duration: 1, delay: 0.9 },
              className: "mt-8 md:mt-12 text-center max-w-2xl mx-auto px-4",
              children: [
                g.jsx("p", {
                  className:
                    "text-sm md:text-base lg:text-lg font-serif text-gray-700 leading-relaxed mb-2",
                  children: "Mời bạn tới dự lễ thành hôn của chúng mình",
                }),
                g.jsx("p", {
                  className: "text-xs md:text-sm lg:text-base text-gray-600",
                  children: "Để cùng chứng kiến khoảnh khắc thiêng liêng nhất",
                }),
              ],
            }),
          ],
        }),
      ],
    });
function Wm(e) {
  return (
    e !== null &&
    typeof e == "object" &&
    "constructor" in e &&
    e.constructor === Object
  );
}
function nd(e = {}, t = {}) {
  const n = ["__proto__", "constructor", "prototype"];
  Object.keys(t)
    .filter((i) => n.indexOf(i) < 0)
    .forEach((i) => {
      typeof e[i] > "u"
        ? (e[i] = t[i])
        : Wm(t[i]) &&
          Wm(e[i]) &&
          Object.keys(t[i]).length > 0 &&
          nd(e[i], t[i]);
    });
}
const Zy = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: { blur() {}, nodeName: "" },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return { initEvent() {} };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return [];
      },
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
};
function Xt() {
  const e = typeof document < "u" ? document : {};
  return (nd(e, Zy), e);
}
const pE = {
  document: Zy,
  navigator: { userAgent: "" },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
  history: { replaceState() {}, pushState() {}, go() {}, back() {} },
  CustomEvent: function () {
    return this;
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      },
    };
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {};
  },
  requestAnimationFrame(e) {
    return typeof setTimeout > "u" ? (e(), null) : setTimeout(e, 0);
  },
  cancelAnimationFrame(e) {
    typeof setTimeout > "u" || clearTimeout(e);
  },
};
function Qe() {
  const e = typeof window < "u" ? window : {};
  return (nd(e, pE), e);
}
function gE(e = "") {
  return e
    .trim()
    .split(" ")
    .filter((t) => !!t.trim());
}
function vE(e) {
  const t = e;
  Object.keys(t).forEach((n) => {
    try {
      t[n] = null;
    } catch {}
    try {
      delete t[n];
    } catch {}
  });
}
function Fy(e, t = 0) {
  return setTimeout(e, t);
}
function vr() {
  return Date.now();
}
function yE(e) {
  const t = Qe();
  let n;
  return (
    t.getComputedStyle && (n = t.getComputedStyle(e, null)),
    !n && e.currentStyle && (n = e.currentStyle),
    n || (n = e.style),
    n
  );
}
function xE(e, t = "x") {
  const n = Qe();
  let i, a, s;
  const l = yE(e);
  return (
    n.WebKitCSSMatrix
      ? ((a = l.transform || l.webkitTransform),
        a.split(",").length > 6 &&
          (a = a
            .split(", ")
            .map((r) => r.replace(",", "."))
            .join(", ")),
        (s = new n.WebKitCSSMatrix(a === "none" ? "" : a)))
      : ((s =
          l.MozTransform ||
          l.OTransform ||
          l.MsTransform ||
          l.msTransform ||
          l.transform ||
          l
            .getPropertyValue("transform")
            .replace("translate(", "matrix(1, 0, 0, 1,")),
        (i = s.toString().split(","))),
    t === "x" &&
      (n.WebKitCSSMatrix
        ? (a = s.m41)
        : i.length === 16
          ? (a = parseFloat(i[12]))
          : (a = parseFloat(i[4]))),
    t === "y" &&
      (n.WebKitCSSMatrix
        ? (a = s.m42)
        : i.length === 16
          ? (a = parseFloat(i[13]))
          : (a = parseFloat(i[5]))),
    a || 0
  );
}
function dl(e) {
  return (
    typeof e == "object" &&
    e !== null &&
    e.constructor &&
    Object.prototype.toString.call(e).slice(8, -1) === "Object"
  );
}
function bE(e) {
  return typeof window < "u" && typeof window.HTMLElement < "u"
    ? e instanceof HTMLElement
    : e && (e.nodeType === 1 || e.nodeType === 11);
}
function lt(...e) {
  const t = Object(e[0]),
    n = ["__proto__", "constructor", "prototype"];
  for (let i = 1; i < e.length; i += 1) {
    const a = e[i];
    if (a != null && !bE(a)) {
      const s = Object.keys(Object(a)).filter((l) => n.indexOf(l) < 0);
      for (let l = 0, r = s.length; l < r; l += 1) {
        const o = s[l],
          u = Object.getOwnPropertyDescriptor(a, o);
        u !== void 0 &&
          u.enumerable &&
          (dl(t[o]) && dl(a[o])
            ? a[o].__swiper__
              ? (t[o] = a[o])
              : lt(t[o], a[o])
            : !dl(t[o]) && dl(a[o])
              ? ((t[o] = {}), a[o].__swiper__ ? (t[o] = a[o]) : lt(t[o], a[o]))
              : (t[o] = a[o]));
      }
    }
  }
  return t;
}
function hl(e, t, n) {
  e.style.setProperty(t, n);
}
function $y({ swiper: e, targetPosition: t, side: n }) {
  const i = Qe(),
    a = -e.translate;
  let s = null,
    l;
  const r = e.params.speed;
  ((e.wrapperEl.style.scrollSnapType = "none"),
    i.cancelAnimationFrame(e.cssModeFrameID));
  const o = t > a ? "next" : "prev",
    u = (f, h) => (o === "next" && f >= h) || (o === "prev" && f <= h),
    c = () => {
      ((l = new Date().getTime()), s === null && (s = l));
      const f = Math.max(Math.min((l - s) / r, 1), 0),
        h = 0.5 - Math.cos(f * Math.PI) / 2;
      let d = a + h * (t - a);
      if ((u(d, t) && (d = t), e.wrapperEl.scrollTo({ [n]: d }), u(d, t))) {
        ((e.wrapperEl.style.overflow = "hidden"),
          (e.wrapperEl.style.scrollSnapType = ""),
          setTimeout(() => {
            ((e.wrapperEl.style.overflow = ""),
              e.wrapperEl.scrollTo({ [n]: d }));
          }),
          i.cancelAnimationFrame(e.cssModeFrameID));
        return;
      }
      e.cssModeFrameID = i.requestAnimationFrame(c);
    };
  c();
}
function kr(e) {
  return (
    e.querySelector(".swiper-slide-transform") ||
    (e.shadowRoot && e.shadowRoot.querySelector(".swiper-slide-transform")) ||
    e
  );
}
function Ut(e, t = "") {
  const n = Qe(),
    i = [...e.children];
  return (
    n.HTMLSlotElement &&
      e instanceof HTMLSlotElement &&
      i.push(...e.assignedElements()),
    t ? i.filter((a) => a.matches(t)) : i
  );
}
function SE(e, t) {
  const n = [t];
  for (; n.length > 0; ) {
    const i = n.shift();
    if (e === i) return !0;
    n.push(
      ...i.children,
      ...(i.shadowRoot ? i.shadowRoot.children : []),
      ...(i.assignedElements ? i.assignedElements() : []),
    );
  }
}
function TE(e, t) {
  const n = Qe();
  let i = t.contains(e);
  return (
    !i &&
      n.HTMLSlotElement &&
      t instanceof HTMLSlotElement &&
      ((i = [...t.assignedElements()].includes(e)), i || (i = SE(e, t))),
    i
  );
}
function yr(e) {
  try {
    console.warn(e);
    return;
  } catch {}
}
function js(e, t = []) {
  const n = document.createElement(e);
  return (n.classList.add(...(Array.isArray(t) ? t : gE(t))), n);
}
function wE(e, t) {
  const n = [];
  for (; e.previousElementSibling; ) {
    const i = e.previousElementSibling;
    (t ? i.matches(t) && n.push(i) : n.push(i), (e = i));
  }
  return n;
}
function EE(e, t) {
  const n = [];
  for (; e.nextElementSibling; ) {
    const i = e.nextElementSibling;
    (t ? i.matches(t) && n.push(i) : n.push(i), (e = i));
  }
  return n;
}
function zn(e, t) {
  return Qe().getComputedStyle(e, null).getPropertyValue(t);
}
function xr(e) {
  let t = e,
    n;
  if (t) {
    for (n = 0; (t = t.previousSibling) !== null; )
      t.nodeType === 1 && (n += 1);
    return n;
  }
}
function Iy(e, t) {
  const n = [];
  let i = e.parentElement;
  for (; i; )
    (t ? i.matches(t) && n.push(i) : n.push(i), (i = i.parentElement));
  return n;
}
function ME(e, t) {
  function n(i) {
    i.target === e && (t.call(e, i), e.removeEventListener("transitionend", n));
  }
  t && e.addEventListener("transitionend", n);
}
function gc(e, t, n) {
  const i = Qe();
  return (
    e[t === "width" ? "offsetWidth" : "offsetHeight"] +
    parseFloat(
      i
        .getComputedStyle(e, null)
        .getPropertyValue(t === "width" ? "margin-right" : "margin-top"),
    ) +
    parseFloat(
      i
        .getComputedStyle(e, null)
        .getPropertyValue(t === "width" ? "margin-left" : "margin-bottom"),
    )
  );
}
function Ne(e) {
  return (Array.isArray(e) ? e : [e]).filter((t) => !!t);
}
function AE(e) {
  return (t) =>
    Math.abs(t) > 0 &&
    e.browser &&
    e.browser.need3dFix &&
    Math.abs(t) % 90 === 0
      ? t + 0.001
      : t;
}
function Ns(e, t = "") {
  typeof trustedTypes < "u"
    ? (e.innerHTML = trustedTypes
        .createPolicy("html", { createHTML: (n) => n })
        .createHTML(t))
    : (e.innerHTML = t);
}
let Qo;
function CE() {
  const e = Qe(),
    t = Xt();
  return {
    smoothScroll:
      t.documentElement &&
      t.documentElement.style &&
      "scrollBehavior" in t.documentElement.style,
    touch: !!(
      "ontouchstart" in e ||
      (e.DocumentTouch && t instanceof e.DocumentTouch)
    ),
  };
}
function Jy() {
  return (Qo || (Qo = CE()), Qo);
}
let Ko;
function jE({ userAgent: e } = {}) {
  const t = Jy(),
    n = Qe(),
    i = n.navigator.platform,
    a = e || n.navigator.userAgent,
    s = { ios: !1, android: !1 },
    l = n.screen.width,
    r = n.screen.height,
    o = a.match(/(Android);?[\s\/]+([\d.]+)?/);
  let u = a.match(/(iPad)(?!\1).*OS\s([\d_]+)/);
  const c = a.match(/(iPod)(.*OS\s([\d_]+))?/),
    f = !u && a.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    h = i === "Win32";
  let d = i === "MacIntel";
  const y = [
    "1024x1366",
    "1366x1024",
    "834x1194",
    "1194x834",
    "834x1112",
    "1112x834",
    "768x1024",
    "1024x768",
    "820x1180",
    "1180x820",
    "810x1080",
    "1080x810",
  ];
  return (
    !u &&
      d &&
      t.touch &&
      y.indexOf(`${l}x${r}`) >= 0 &&
      ((u = a.match(/(Version)\/([\d.]+)/)),
      u || (u = [0, 1, "13_0_0"]),
      (d = !1)),
    o && !h && ((s.os = "android"), (s.android = !0)),
    (u || f || c) && ((s.os = "ios"), (s.ios = !0)),
    s
  );
}
function Wy(e = {}) {
  return (Ko || (Ko = jE(e)), Ko);
}
let Zo;
function NE() {
  const e = Qe(),
    t = Wy();
  let n = !1;
  function i() {
    const r = e.navigator.userAgent.toLowerCase();
    return (
      r.indexOf("safari") >= 0 &&
      r.indexOf("chrome") < 0 &&
      r.indexOf("android") < 0
    );
  }
  if (i()) {
    const r = String(e.navigator.userAgent);
    if (r.includes("Version/")) {
      const [o, u] = r
        .split("Version/")[1]
        .split(" ")[0]
        .split(".")
        .map((c) => Number(c));
      n = o < 16 || (o === 16 && u < 2);
    }
  }
  const a = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      e.navigator.userAgent,
    ),
    s = i(),
    l = s || (a && t.ios);
  return {
    isSafari: n || s,
    needPerspectiveFix: n,
    need3dFix: l,
    isWebView: a,
  };
}
function e1() {
  return (Zo || (Zo = NE()), Zo);
}
function OE({ swiper: e, on: t, emit: n }) {
  const i = Qe();
  let a = null,
    s = null;
  const l = () => {
      !e || e.destroyed || !e.initialized || (n("beforeResize"), n("resize"));
    },
    r = () => {
      !e ||
        e.destroyed ||
        !e.initialized ||
        ((a = new ResizeObserver((c) => {
          s = i.requestAnimationFrame(() => {
            const { width: f, height: h } = e;
            let d = f,
              y = h;
            (c.forEach(({ contentBoxSize: x, contentRect: T, target: m }) => {
              (m && m !== e.el) ||
                ((d = T ? T.width : (x[0] || x).inlineSize),
                (y = T ? T.height : (x[0] || x).blockSize));
            }),
              (d !== f || y !== h) && l());
          });
        })),
        a.observe(e.el));
    },
    o = () => {
      (s && i.cancelAnimationFrame(s),
        a && a.unobserve && e.el && (a.unobserve(e.el), (a = null)));
    },
    u = () => {
      !e || e.destroyed || !e.initialized || n("orientationchange");
    };
  (t("init", () => {
    if (e.params.resizeObserver && typeof i.ResizeObserver < "u") {
      r();
      return;
    }
    (i.addEventListener("resize", l),
      i.addEventListener("orientationchange", u));
  }),
    t("destroy", () => {
      (o(),
        i.removeEventListener("resize", l),
        i.removeEventListener("orientationchange", u));
    }));
}
function DE({ swiper: e, extendParams: t, on: n, emit: i }) {
  const a = [],
    s = Qe(),
    l = (u, c = {}) => {
      const f = s.MutationObserver || s.WebkitMutationObserver,
        h = new f((d) => {
          if (e.__preventObserver__) return;
          if (d.length === 1) {
            i("observerUpdate", d[0]);
            return;
          }
          const y = function () {
            i("observerUpdate", d[0]);
          };
          s.requestAnimationFrame
            ? s.requestAnimationFrame(y)
            : s.setTimeout(y, 0);
        });
      (h.observe(u, {
        attributes: typeof c.attributes > "u" ? !0 : c.attributes,
        childList: e.isElement || (typeof c.childList > "u" ? !0 : c).childList,
        characterData: typeof c.characterData > "u" ? !0 : c.characterData,
      }),
        a.push(h));
    },
    r = () => {
      if (e.params.observer) {
        if (e.params.observeParents) {
          const u = Iy(e.hostEl);
          for (let c = 0; c < u.length; c += 1) l(u[c]);
        }
        (l(e.hostEl, { childList: e.params.observeSlideChildren }),
          l(e.wrapperEl, { attributes: !1 }));
      }
    },
    o = () => {
      (a.forEach((u) => {
        u.disconnect();
      }),
        a.splice(0, a.length));
    };
  (t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
    n("init", r),
    n("destroy", o));
}
var zE = {
  on(e, t, n) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof t != "function") return i;
    const a = n ? "unshift" : "push";
    return (
      e.split(" ").forEach((s) => {
        (i.eventsListeners[s] || (i.eventsListeners[s] = []),
          i.eventsListeners[s][a](t));
      }),
      i
    );
  },
  once(e, t, n) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof t != "function") return i;
    function a(...s) {
      (i.off(e, a), a.__emitterProxy && delete a.__emitterProxy, t.apply(i, s));
    }
    return ((a.__emitterProxy = t), i.on(e, a, n));
  },
  onAny(e, t) {
    const n = this;
    if (!n.eventsListeners || n.destroyed || typeof e != "function") return n;
    const i = t ? "unshift" : "push";
    return (
      n.eventsAnyListeners.indexOf(e) < 0 && n.eventsAnyListeners[i](e),
      n
    );
  },
  offAny(e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || !t.eventsAnyListeners) return t;
    const n = t.eventsAnyListeners.indexOf(e);
    return (n >= 0 && t.eventsAnyListeners.splice(n, 1), t);
  },
  off(e, t) {
    const n = this;
    return (
      !n.eventsListeners ||
        n.destroyed ||
        !n.eventsListeners ||
        e.split(" ").forEach((i) => {
          typeof t > "u"
            ? (n.eventsListeners[i] = [])
            : n.eventsListeners[i] &&
              n.eventsListeners[i].forEach((a, s) => {
                (a === t || (a.__emitterProxy && a.__emitterProxy === t)) &&
                  n.eventsListeners[i].splice(s, 1);
              });
        }),
      n
    );
  },
  emit(...e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || !t.eventsListeners) return t;
    let n, i, a;
    return (
      typeof e[0] == "string" || Array.isArray(e[0])
        ? ((n = e[0]), (i = e.slice(1, e.length)), (a = t))
        : ((n = e[0].events), (i = e[0].data), (a = e[0].context || t)),
      i.unshift(a),
      (Array.isArray(n) ? n : n.split(" ")).forEach((l) => {
        (t.eventsAnyListeners &&
          t.eventsAnyListeners.length &&
          t.eventsAnyListeners.forEach((r) => {
            r.apply(a, [l, ...i]);
          }),
          t.eventsListeners &&
            t.eventsListeners[l] &&
            t.eventsListeners[l].forEach((r) => {
              r.apply(a, i);
            }));
      }),
      t
    );
  },
};
function LE() {
  const e = this;
  let t, n;
  const i = e.el;
  (typeof e.params.width < "u" && e.params.width !== null
    ? (t = e.params.width)
    : (t = i.clientWidth),
    typeof e.params.height < "u" && e.params.height !== null
      ? (n = e.params.height)
      : (n = i.clientHeight),
    !((t === 0 && e.isHorizontal()) || (n === 0 && e.isVertical())) &&
      ((t =
        t -
        parseInt(zn(i, "padding-left") || 0, 10) -
        parseInt(zn(i, "padding-right") || 0, 10)),
      (n =
        n -
        parseInt(zn(i, "padding-top") || 0, 10) -
        parseInt(zn(i, "padding-bottom") || 0, 10)),
      Number.isNaN(t) && (t = 0),
      Number.isNaN(n) && (n = 0),
      Object.assign(e, {
        width: t,
        height: n,
        size: e.isHorizontal() ? t : n,
      })));
}
function VE() {
  const e = this;
  function t(C, A) {
    return parseFloat(C.getPropertyValue(e.getDirectionLabel(A)) || 0);
  }
  const n = e.params,
    { wrapperEl: i, slidesEl: a, rtlTranslate: s, wrongRTL: l } = e,
    r = e.virtual && n.virtual.enabled,
    o = r ? e.virtual.slides.length : e.slides.length,
    u = Ut(a, `.${e.params.slideClass}, swiper-slide`),
    c = r ? e.virtual.slides.length : u.length;
  let f = [];
  const h = [],
    d = [];
  let y = n.slidesOffsetBefore;
  typeof y == "function" && (y = n.slidesOffsetBefore.call(e));
  let x = n.slidesOffsetAfter;
  typeof x == "function" && (x = n.slidesOffsetAfter.call(e));
  const T = e.snapGrid.length,
    m = e.slidesGrid.length,
    p = e.size - y - x;
  let v = n.spaceBetween,
    b = -y,
    w = 0,
    M = 0;
  if (typeof p > "u") return;
  (typeof v == "string" && v.indexOf("%") >= 0
    ? (v = (parseFloat(v.replace("%", "")) / 100) * p)
    : typeof v == "string" && (v = parseFloat(v)),
    (e.virtualSize = -v - y - x),
    u.forEach((C) => {
      (s ? (C.style.marginLeft = "") : (C.style.marginRight = ""),
        (C.style.marginBottom = ""),
        (C.style.marginTop = ""));
    }),
    n.centeredSlides &&
      n.cssMode &&
      (hl(i, "--swiper-centered-offset-before", ""),
      hl(i, "--swiper-centered-offset-after", "")));
  const E = n.grid && n.grid.rows > 1 && e.grid;
  E ? e.grid.initSlides(u) : e.grid && e.grid.unsetSlides();
  let S;
  const O =
    n.slidesPerView === "auto" &&
    n.breakpoints &&
    Object.keys(n.breakpoints).filter(
      (C) => typeof n.breakpoints[C].slidesPerView < "u",
    ).length > 0;
  for (let C = 0; C < c; C += 1) {
    S = 0;
    const A = u[C];
    if (
      !(A && (E && e.grid.updateSlide(C, A, u), zn(A, "display") === "none"))
    ) {
      if (r && n.slidesPerView === "auto")
        (n.virtual.slidesPerViewAutoSlideSize &&
          (S = n.virtual.slidesPerViewAutoSlideSize),
          S &&
            A &&
            (n.roundLengths && (S = Math.floor(S)),
            (A.style[e.getDirectionLabel("width")] = `${S}px`)));
      else if (n.slidesPerView === "auto") {
        O && (A.style[e.getDirectionLabel("width")] = "");
        const j = getComputedStyle(A),
          _ = A.style.transform,
          R = A.style.webkitTransform;
        if (
          (_ && (A.style.transform = "none"),
          R && (A.style.webkitTransform = "none"),
          n.roundLengths)
        )
          S = e.isHorizontal() ? gc(A, "width") : gc(A, "height");
        else {
          const Y = t(j, "width"),
            V = t(j, "padding-left"),
            z = t(j, "padding-right"),
            N = t(j, "margin-left"),
            B = t(j, "margin-right"),
            U = j.getPropertyValue("box-sizing");
          if (U && U === "border-box") S = Y + N + B;
          else {
            const { clientWidth: he, offsetWidth: gt } = A;
            S = Y + V + z + N + B + (gt - he);
          }
        }
        (_ && (A.style.transform = _),
          R && (A.style.webkitTransform = R),
          n.roundLengths && (S = Math.floor(S)));
      } else
        ((S = (p - (n.slidesPerView - 1) * v) / n.slidesPerView),
          n.roundLengths && (S = Math.floor(S)),
          A && (A.style[e.getDirectionLabel("width")] = `${S}px`));
      (A && (A.swiperSlideSize = S),
        d.push(S),
        n.centeredSlides
          ? ((b = b + S / 2 + w / 2 + v),
            w === 0 && C !== 0 && (b = b - p / 2 - v),
            C === 0 && (b = b - p / 2 - v),
            Math.abs(b) < 1 / 1e3 && (b = 0),
            n.roundLengths && (b = Math.floor(b)),
            M % n.slidesPerGroup === 0 && f.push(b),
            h.push(b))
          : (n.roundLengths && (b = Math.floor(b)),
            (M - Math.min(e.params.slidesPerGroupSkip, M)) %
              e.params.slidesPerGroup ===
              0 && f.push(b),
            h.push(b),
            (b = b + S + v)),
        (e.virtualSize += S + v),
        (w = S),
        (M += 1));
    }
  }
  if (
    ((e.virtualSize = Math.max(e.virtualSize, p) + x),
    s &&
      l &&
      (n.effect === "slide" || n.effect === "coverflow") &&
      (i.style.width = `${e.virtualSize + v}px`),
    n.setWrapperSize &&
      (i.style[e.getDirectionLabel("width")] = `${e.virtualSize + v}px`),
    E && e.grid.updateWrapperSize(S, f),
    !n.centeredSlides)
  ) {
    const C = [];
    for (let A = 0; A < f.length; A += 1) {
      let j = f[A];
      (n.roundLengths && (j = Math.floor(j)),
        f[A] <= e.virtualSize - p && C.push(j));
    }
    ((f = C),
      Math.floor(e.virtualSize - p) - Math.floor(f[f.length - 1]) > 1 &&
        f.push(e.virtualSize - p));
  }
  if (r && n.loop) {
    const C = d[0] + v;
    if (n.slidesPerGroup > 1) {
      const A = Math.ceil(
          (e.virtual.slidesBefore + e.virtual.slidesAfter) / n.slidesPerGroup,
        ),
        j = C * n.slidesPerGroup;
      for (let _ = 0; _ < A; _ += 1) f.push(f[f.length - 1] + j);
    }
    for (let A = 0; A < e.virtual.slidesBefore + e.virtual.slidesAfter; A += 1)
      (n.slidesPerGroup === 1 && f.push(f[f.length - 1] + C),
        h.push(h[h.length - 1] + C),
        (e.virtualSize += C));
  }
  if ((f.length === 0 && (f = [0]), v !== 0)) {
    const C =
      e.isHorizontal() && s ? "marginLeft" : e.getDirectionLabel("marginRight");
    u.filter((A, j) =>
      !n.cssMode || n.loop ? !0 : j !== u.length - 1,
    ).forEach((A) => {
      A.style[C] = `${v}px`;
    });
  }
  if (n.centeredSlides && n.centeredSlidesBounds) {
    let C = 0;
    (d.forEach((j) => {
      C += j + (v || 0);
    }),
      (C -= v));
    const A = C > p ? C - p : 0;
    f = f.map((j) => (j <= 0 ? -y : j > A ? A + x : j));
  }
  if (n.centerInsufficientSlides) {
    let C = 0;
    (d.forEach((j) => {
      C += j + (v || 0);
    }),
      (C -= v));
    const A = (y || 0) + (x || 0);
    if (C + A < p) {
      const j = (p - C - A) / 2;
      (f.forEach((_, R) => {
        f[R] = _ - j;
      }),
        h.forEach((_, R) => {
          h[R] = _ + j;
        }));
    }
  }
  if (
    (Object.assign(e, {
      slides: u,
      snapGrid: f,
      slidesGrid: h,
      slidesSizesGrid: d,
    }),
    n.centeredSlides && n.cssMode && !n.centeredSlidesBounds)
  ) {
    (hl(i, "--swiper-centered-offset-before", `${-f[0]}px`),
      hl(
        i,
        "--swiper-centered-offset-after",
        `${e.size / 2 - d[d.length - 1] / 2}px`,
      ));
    const C = -e.snapGrid[0],
      A = -e.slidesGrid[0];
    ((e.snapGrid = e.snapGrid.map((j) => j + C)),
      (e.slidesGrid = e.slidesGrid.map((j) => j + A)));
  }
  if (
    (c !== o && e.emit("slidesLengthChange"),
    f.length !== T &&
      (e.params.watchOverflow && e.checkOverflow(),
      e.emit("snapGridLengthChange")),
    h.length !== m && e.emit("slidesGridLengthChange"),
    n.watchSlidesProgress && e.updateSlidesOffset(),
    e.emit("slidesUpdated"),
    !r && !n.cssMode && (n.effect === "slide" || n.effect === "fade"))
  ) {
    const C = `${n.containerModifierClass}backface-hidden`,
      A = e.el.classList.contains(C);
    c <= n.maxBackfaceHiddenSlides
      ? A || e.el.classList.add(C)
      : A && e.el.classList.remove(C);
  }
}
function _E(e) {
  const t = this,
    n = [],
    i = t.virtual && t.params.virtual.enabled;
  let a = 0,
    s;
  typeof e == "number"
    ? t.setTransition(e)
    : e === !0 && t.setTransition(t.params.speed);
  const l = (r) => (i ? t.slides[t.getSlideIndexByData(r)] : t.slides[r]);
  if (t.params.slidesPerView !== "auto" && t.params.slidesPerView > 1)
    if (t.params.centeredSlides)
      (t.visibleSlides || []).forEach((r) => {
        n.push(r);
      });
    else
      for (s = 0; s < Math.ceil(t.params.slidesPerView); s += 1) {
        const r = t.activeIndex + s;
        if (r > t.slides.length && !i) break;
        n.push(l(r));
      }
  else n.push(l(t.activeIndex));
  for (s = 0; s < n.length; s += 1)
    if (typeof n[s] < "u") {
      const r = n[s].offsetHeight;
      a = r > a ? r : a;
    }
  (a || a === 0) && (t.wrapperEl.style.height = `${a}px`);
}
function RE() {
  const e = this,
    t = e.slides,
    n = e.isElement
      ? e.isHorizontal()
        ? e.wrapperEl.offsetLeft
        : e.wrapperEl.offsetTop
      : 0;
  for (let i = 0; i < t.length; i += 1)
    t[i].swiperSlideOffset =
      (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) -
      n -
      e.cssOverflowAdjustment();
}
const ep = (e, t, n) => {
  t && !e.classList.contains(n)
    ? e.classList.add(n)
    : !t && e.classList.contains(n) && e.classList.remove(n);
};
function BE(e = (this && this.translate) || 0) {
  const t = this,
    n = t.params,
    { slides: i, rtlTranslate: a, snapGrid: s } = t;
  if (i.length === 0) return;
  typeof i[0].swiperSlideOffset > "u" && t.updateSlidesOffset();
  let l = -e;
  (a && (l = e), (t.visibleSlidesIndexes = []), (t.visibleSlides = []));
  let r = n.spaceBetween;
  typeof r == "string" && r.indexOf("%") >= 0
    ? (r = (parseFloat(r.replace("%", "")) / 100) * t.size)
    : typeof r == "string" && (r = parseFloat(r));
  for (let o = 0; o < i.length; o += 1) {
    const u = i[o];
    let c = u.swiperSlideOffset;
    n.cssMode && n.centeredSlides && (c -= i[0].swiperSlideOffset);
    const f =
        (l + (n.centeredSlides ? t.minTranslate() : 0) - c) /
        (u.swiperSlideSize + r),
      h =
        (l - s[0] + (n.centeredSlides ? t.minTranslate() : 0) - c) /
        (u.swiperSlideSize + r),
      d = -(l - c),
      y = d + t.slidesSizesGrid[o],
      x = d >= 0 && d <= t.size - t.slidesSizesGrid[o],
      T =
        (d >= 0 && d < t.size - 1) ||
        (y > 1 && y <= t.size) ||
        (d <= 0 && y >= t.size);
    (T && (t.visibleSlides.push(u), t.visibleSlidesIndexes.push(o)),
      ep(u, T, n.slideVisibleClass),
      ep(u, x, n.slideFullyVisibleClass),
      (u.progress = a ? -f : f),
      (u.originalProgress = a ? -h : h));
  }
}
function HE(e) {
  const t = this;
  if (typeof e > "u") {
    const c = t.rtlTranslate ? -1 : 1;
    e = (t && t.translate && t.translate * c) || 0;
  }
  const n = t.params,
    i = t.maxTranslate() - t.minTranslate();
  let { progress: a, isBeginning: s, isEnd: l, progressLoop: r } = t;
  const o = s,
    u = l;
  if (i === 0) ((a = 0), (s = !0), (l = !0));
  else {
    a = (e - t.minTranslate()) / i;
    const c = Math.abs(e - t.minTranslate()) < 1,
      f = Math.abs(e - t.maxTranslate()) < 1;
    ((s = c || a <= 0), (l = f || a >= 1), c && (a = 0), f && (a = 1));
  }
  if (n.loop) {
    const c = t.getSlideIndexByData(0),
      f = t.getSlideIndexByData(t.slides.length - 1),
      h = t.slidesGrid[c],
      d = t.slidesGrid[f],
      y = t.slidesGrid[t.slidesGrid.length - 1],
      x = Math.abs(e);
    (x >= h ? (r = (x - h) / y) : (r = (x + y - d) / y), r > 1 && (r -= 1));
  }
  (Object.assign(t, { progress: a, progressLoop: r, isBeginning: s, isEnd: l }),
    (n.watchSlidesProgress || (n.centeredSlides && n.autoHeight)) &&
      t.updateSlidesProgress(e),
    s && !o && t.emit("reachBeginning toEdge"),
    l && !u && t.emit("reachEnd toEdge"),
    ((o && !s) || (u && !l)) && t.emit("fromEdge"),
    t.emit("progress", a));
}
const Fo = (e, t, n) => {
  t && !e.classList.contains(n)
    ? e.classList.add(n)
    : !t && e.classList.contains(n) && e.classList.remove(n);
};
function UE() {
  const e = this,
    { slides: t, params: n, slidesEl: i, activeIndex: a } = e,
    s = e.virtual && n.virtual.enabled,
    l = e.grid && n.grid && n.grid.rows > 1,
    r = (f) => Ut(i, `.${n.slideClass}${f}, swiper-slide${f}`)[0];
  let o, u, c;
  if (s)
    if (n.loop) {
      let f = a - e.virtual.slidesBefore;
      (f < 0 && (f = e.virtual.slides.length + f),
        f >= e.virtual.slides.length && (f -= e.virtual.slides.length),
        (o = r(`[data-swiper-slide-index="${f}"]`)));
    } else o = r(`[data-swiper-slide-index="${a}"]`);
  else
    l
      ? ((o = t.find((f) => f.column === a)),
        (c = t.find((f) => f.column === a + 1)),
        (u = t.find((f) => f.column === a - 1)))
      : (o = t[a]);
  (o &&
    (l ||
      ((c = EE(o, `.${n.slideClass}, swiper-slide`)[0]),
      n.loop && !c && (c = t[0]),
      (u = wE(o, `.${n.slideClass}, swiper-slide`)[0]),
      n.loop && !u === 0 && (u = t[t.length - 1]))),
    t.forEach((f) => {
      (Fo(f, f === o, n.slideActiveClass),
        Fo(f, f === c, n.slideNextClass),
        Fo(f, f === u, n.slidePrevClass));
    }),
    e.emitSlidesClasses());
}
const Ll = (e, t) => {
    if (!e || e.destroyed || !e.params) return;
    const n = () => (e.isElement ? "swiper-slide" : `.${e.params.slideClass}`),
      i = t.closest(n());
    if (i) {
      let a = i.querySelector(`.${e.params.lazyPreloaderClass}`);
      (!a &&
        e.isElement &&
        (i.shadowRoot
          ? (a = i.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`))
          : requestAnimationFrame(() => {
              i.shadowRoot &&
                ((a = i.shadowRoot.querySelector(
                  `.${e.params.lazyPreloaderClass}`,
                )),
                a && a.remove());
            })),
        a && a.remove());
    }
  },
  $o = (e, t) => {
    if (!e.slides[t]) return;
    const n = e.slides[t].querySelector('[loading="lazy"]');
    n && n.removeAttribute("loading");
  },
  vc = (e) => {
    if (!e || e.destroyed || !e.params) return;
    let t = e.params.lazyPreloadPrevNext;
    const n = e.slides.length;
    if (!n || !t || t < 0) return;
    t = Math.min(t, n);
    const i =
        e.params.slidesPerView === "auto"
          ? e.slidesPerViewDynamic()
          : Math.ceil(e.params.slidesPerView),
      a = e.activeIndex;
    if (e.params.grid && e.params.grid.rows > 1) {
      const l = a,
        r = [l - t];
      (r.push(...Array.from({ length: t }).map((o, u) => l + i + u)),
        e.slides.forEach((o, u) => {
          r.includes(o.column) && $o(e, u);
        }));
      return;
    }
    const s = a + i - 1;
    if (e.params.rewind || e.params.loop)
      for (let l = a - t; l <= s + t; l += 1) {
        const r = ((l % n) + n) % n;
        (r < a || r > s) && $o(e, r);
      }
    else
      for (let l = Math.max(a - t, 0); l <= Math.min(s + t, n - 1); l += 1)
        l !== a && (l > s || l < a) && $o(e, l);
  };
function GE(e) {
  const { slidesGrid: t, params: n } = e,
    i = e.rtlTranslate ? e.translate : -e.translate;
  let a;
  for (let s = 0; s < t.length; s += 1)
    typeof t[s + 1] < "u"
      ? i >= t[s] && i < t[s + 1] - (t[s + 1] - t[s]) / 2
        ? (a = s)
        : i >= t[s] && i < t[s + 1] && (a = s + 1)
      : i >= t[s] && (a = s);
  return (n.normalizeSlideIndex && (a < 0 || typeof a > "u") && (a = 0), a);
}
function qE(e) {
  const t = this,
    n = t.rtlTranslate ? t.translate : -t.translate,
    { snapGrid: i, params: a, activeIndex: s, realIndex: l, snapIndex: r } = t;
  let o = e,
    u;
  const c = (d) => {
    let y = d - t.virtual.slidesBefore;
    return (
      y < 0 && (y = t.virtual.slides.length + y),
      y >= t.virtual.slides.length && (y -= t.virtual.slides.length),
      y
    );
  };
  if ((typeof o > "u" && (o = GE(t)), i.indexOf(n) >= 0)) u = i.indexOf(n);
  else {
    const d = Math.min(a.slidesPerGroupSkip, o);
    u = d + Math.floor((o - d) / a.slidesPerGroup);
  }
  if ((u >= i.length && (u = i.length - 1), o === s && !t.params.loop)) {
    u !== r && ((t.snapIndex = u), t.emit("snapIndexChange"));
    return;
  }
  if (o === s && t.params.loop && t.virtual && t.params.virtual.enabled) {
    t.realIndex = c(o);
    return;
  }
  const f = t.grid && a.grid && a.grid.rows > 1;
  let h;
  if (t.virtual && a.virtual.enabled && a.loop) h = c(o);
  else if (f) {
    const d = t.slides.find((x) => x.column === o);
    let y = parseInt(d.getAttribute("data-swiper-slide-index"), 10);
    (Number.isNaN(y) && (y = Math.max(t.slides.indexOf(d), 0)),
      (h = Math.floor(y / a.grid.rows)));
  } else if (t.slides[o]) {
    const d = t.slides[o].getAttribute("data-swiper-slide-index");
    d ? (h = parseInt(d, 10)) : (h = o);
  } else h = o;
  (Object.assign(t, {
    previousSnapIndex: r,
    snapIndex: u,
    previousRealIndex: l,
    realIndex: h,
    previousIndex: s,
    activeIndex: o,
  }),
    t.initialized && vc(t),
    t.emit("activeIndexChange"),
    t.emit("snapIndexChange"),
    (t.initialized || t.params.runCallbacksOnInit) &&
      (l !== h && t.emit("realIndexChange"), t.emit("slideChange")));
}
function YE(e, t) {
  const n = this,
    i = n.params;
  let a = e.closest(`.${i.slideClass}, swiper-slide`);
  !a &&
    n.isElement &&
    t &&
    t.length > 1 &&
    t.includes(e) &&
    [...t.slice(t.indexOf(e) + 1, t.length)].forEach((r) => {
      !a && r.matches && r.matches(`.${i.slideClass}, swiper-slide`) && (a = r);
    });
  let s = !1,
    l;
  if (a) {
    for (let r = 0; r < n.slides.length; r += 1)
      if (n.slides[r] === a) {
        ((s = !0), (l = r));
        break;
      }
  }
  if (a && s)
    ((n.clickedSlide = a),
      n.virtual && n.params.virtual.enabled
        ? (n.clickedIndex = parseInt(
            a.getAttribute("data-swiper-slide-index"),
            10,
          ))
        : (n.clickedIndex = l));
  else {
    ((n.clickedSlide = void 0), (n.clickedIndex = void 0));
    return;
  }
  i.slideToClickedSlide &&
    n.clickedIndex !== void 0 &&
    n.clickedIndex !== n.activeIndex &&
    n.slideToClickedSlide();
}
var XE = {
  updateSize: LE,
  updateSlides: VE,
  updateAutoHeight: _E,
  updateSlidesOffset: RE,
  updateSlidesProgress: BE,
  updateProgress: HE,
  updateSlidesClasses: UE,
  updateActiveIndex: qE,
  updateClickedSlide: YE,
};
function kE(e = this.isHorizontal() ? "x" : "y") {
  const t = this,
    { params: n, rtlTranslate: i, translate: a, wrapperEl: s } = t;
  if (n.virtualTranslate) return i ? -a : a;
  if (n.cssMode) return a;
  let l = xE(s, e);
  return ((l += t.cssOverflowAdjustment()), i && (l = -l), l || 0);
}
function PE(e, t) {
  const n = this,
    { rtlTranslate: i, params: a, wrapperEl: s, progress: l } = n;
  let r = 0,
    o = 0;
  const u = 0;
  (n.isHorizontal() ? (r = i ? -e : e) : (o = e),
    a.roundLengths && ((r = Math.floor(r)), (o = Math.floor(o))),
    (n.previousTranslate = n.translate),
    (n.translate = n.isHorizontal() ? r : o),
    a.cssMode
      ? (s[n.isHorizontal() ? "scrollLeft" : "scrollTop"] = n.isHorizontal()
          ? -r
          : -o)
      : a.virtualTranslate ||
        (n.isHorizontal()
          ? (r -= n.cssOverflowAdjustment())
          : (o -= n.cssOverflowAdjustment()),
        (s.style.transform = `translate3d(${r}px, ${o}px, ${u}px)`)));
  let c;
  const f = n.maxTranslate() - n.minTranslate();
  (f === 0 ? (c = 0) : (c = (e - n.minTranslate()) / f),
    c !== l && n.updateProgress(e),
    n.emit("setTranslate", n.translate, t));
}
function QE() {
  return -this.snapGrid[0];
}
function KE() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function ZE(e = 0, t = this.params.speed, n = !0, i = !0, a) {
  const s = this,
    { params: l, wrapperEl: r } = s;
  if (s.animating && l.preventInteractionOnTransition) return !1;
  const o = s.minTranslate(),
    u = s.maxTranslate();
  let c;
  if (
    (i && e > o ? (c = o) : i && e < u ? (c = u) : (c = e),
    s.updateProgress(c),
    l.cssMode)
  ) {
    const f = s.isHorizontal();
    if (t === 0) r[f ? "scrollLeft" : "scrollTop"] = -c;
    else {
      if (!s.support.smoothScroll)
        return (
          $y({ swiper: s, targetPosition: -c, side: f ? "left" : "top" }),
          !0
        );
      r.scrollTo({ [f ? "left" : "top"]: -c, behavior: "smooth" });
    }
    return !0;
  }
  return (
    t === 0
      ? (s.setTransition(0),
        s.setTranslate(c),
        n && (s.emit("beforeTransitionStart", t, a), s.emit("transitionEnd")))
      : (s.setTransition(t),
        s.setTranslate(c),
        n && (s.emit("beforeTransitionStart", t, a), s.emit("transitionStart")),
        s.animating ||
          ((s.animating = !0),
          s.onTranslateToWrapperTransitionEnd ||
            (s.onTranslateToWrapperTransitionEnd = function (h) {
              !s ||
                s.destroyed ||
                (h.target === this &&
                  (s.wrapperEl.removeEventListener(
                    "transitionend",
                    s.onTranslateToWrapperTransitionEnd,
                  ),
                  (s.onTranslateToWrapperTransitionEnd = null),
                  delete s.onTranslateToWrapperTransitionEnd,
                  (s.animating = !1),
                  n && s.emit("transitionEnd")));
            }),
          s.wrapperEl.addEventListener(
            "transitionend",
            s.onTranslateToWrapperTransitionEnd,
          ))),
    !0
  );
}
var FE = {
  getTranslate: kE,
  setTranslate: PE,
  minTranslate: QE,
  maxTranslate: KE,
  translateTo: ZE,
};
function $E(e, t) {
  const n = this;
  (n.params.cssMode ||
    ((n.wrapperEl.style.transitionDuration = `${e}ms`),
    (n.wrapperEl.style.transitionDelay = e === 0 ? "0ms" : "")),
    n.emit("setTransition", e, t));
}
function t1({ swiper: e, runCallbacks: t, direction: n, step: i }) {
  const { activeIndex: a, previousIndex: s } = e;
  let l = n;
  (l || (a > s ? (l = "next") : a < s ? (l = "prev") : (l = "reset")),
    e.emit(`transition${i}`),
    t && l === "reset"
      ? e.emit(`slideResetTransition${i}`)
      : t &&
        a !== s &&
        (e.emit(`slideChangeTransition${i}`),
        l === "next"
          ? e.emit(`slideNextTransition${i}`)
          : e.emit(`slidePrevTransition${i}`)));
}
function IE(e = !0, t) {
  const n = this,
    { params: i } = n;
  i.cssMode ||
    (i.autoHeight && n.updateAutoHeight(),
    t1({ swiper: n, runCallbacks: e, direction: t, step: "Start" }));
}
function JE(e = !0, t) {
  const n = this,
    { params: i } = n;
  ((n.animating = !1),
    !i.cssMode &&
      (n.setTransition(0),
      t1({ swiper: n, runCallbacks: e, direction: t, step: "End" })));
}
var WE = { setTransition: $E, transitionStart: IE, transitionEnd: JE };
function e4(e = 0, t, n = !0, i, a) {
  typeof e == "string" && (e = parseInt(e, 10));
  const s = this;
  let l = e;
  l < 0 && (l = 0);
  const {
    params: r,
    snapGrid: o,
    slidesGrid: u,
    previousIndex: c,
    activeIndex: f,
    rtlTranslate: h,
    wrapperEl: d,
    enabled: y,
  } = s;
  if (
    (!y && !i && !a) ||
    s.destroyed ||
    (s.animating && r.preventInteractionOnTransition)
  )
    return !1;
  typeof t > "u" && (t = s.params.speed);
  const x = Math.min(s.params.slidesPerGroupSkip, l);
  let T = x + Math.floor((l - x) / s.params.slidesPerGroup);
  T >= o.length && (T = o.length - 1);
  const m = -o[T];
  if (r.normalizeSlideIndex)
    for (let E = 0; E < u.length; E += 1) {
      const S = -Math.floor(m * 100),
        O = Math.floor(u[E] * 100),
        C = Math.floor(u[E + 1] * 100);
      typeof u[E + 1] < "u"
        ? S >= O && S < C - (C - O) / 2
          ? (l = E)
          : S >= O && S < C && (l = E + 1)
        : S >= O && (l = E);
    }
  if (
    s.initialized &&
    l !== f &&
    ((!s.allowSlideNext &&
      (h
        ? m > s.translate && m > s.minTranslate()
        : m < s.translate && m < s.minTranslate())) ||
      (!s.allowSlidePrev &&
        m > s.translate &&
        m > s.maxTranslate() &&
        (f || 0) !== l))
  )
    return !1;
  (l !== (c || 0) && n && s.emit("beforeSlideChangeStart"),
    s.updateProgress(m));
  let p;
  l > f ? (p = "next") : l < f ? (p = "prev") : (p = "reset");
  const v = s.virtual && s.params.virtual.enabled;
  if (!(v && a) && ((h && -m === s.translate) || (!h && m === s.translate)))
    return (
      s.updateActiveIndex(l),
      r.autoHeight && s.updateAutoHeight(),
      s.updateSlidesClasses(),
      r.effect !== "slide" && s.setTranslate(m),
      p !== "reset" && (s.transitionStart(n, p), s.transitionEnd(n, p)),
      !1
    );
  if (r.cssMode) {
    const E = s.isHorizontal(),
      S = h ? m : -m;
    if (t === 0)
      (v &&
        ((s.wrapperEl.style.scrollSnapType = "none"),
        (s._immediateVirtual = !0)),
        v && !s._cssModeVirtualInitialSet && s.params.initialSlide > 0
          ? ((s._cssModeVirtualInitialSet = !0),
            requestAnimationFrame(() => {
              d[E ? "scrollLeft" : "scrollTop"] = S;
            }))
          : (d[E ? "scrollLeft" : "scrollTop"] = S),
        v &&
          requestAnimationFrame(() => {
            ((s.wrapperEl.style.scrollSnapType = ""),
              (s._immediateVirtual = !1));
          }));
    else {
      if (!s.support.smoothScroll)
        return (
          $y({ swiper: s, targetPosition: S, side: E ? "left" : "top" }),
          !0
        );
      d.scrollTo({ [E ? "left" : "top"]: S, behavior: "smooth" });
    }
    return !0;
  }
  const M = e1().isSafari;
  return (
    v && !a && M && s.isElement && s.virtual.update(!1, !1, l),
    s.setTransition(t),
    s.setTranslate(m),
    s.updateActiveIndex(l),
    s.updateSlidesClasses(),
    s.emit("beforeTransitionStart", t, i),
    s.transitionStart(n, p),
    t === 0
      ? s.transitionEnd(n, p)
      : s.animating ||
        ((s.animating = !0),
        s.onSlideToWrapperTransitionEnd ||
          (s.onSlideToWrapperTransitionEnd = function (S) {
            !s ||
              s.destroyed ||
              (S.target === this &&
                (s.wrapperEl.removeEventListener(
                  "transitionend",
                  s.onSlideToWrapperTransitionEnd,
                ),
                (s.onSlideToWrapperTransitionEnd = null),
                delete s.onSlideToWrapperTransitionEnd,
                s.transitionEnd(n, p)));
          }),
        s.wrapperEl.addEventListener(
          "transitionend",
          s.onSlideToWrapperTransitionEnd,
        )),
    !0
  );
}
function t4(e = 0, t, n = !0, i) {
  typeof e == "string" && (e = parseInt(e, 10));
  const a = this;
  if (a.destroyed) return;
  typeof t > "u" && (t = a.params.speed);
  const s = a.grid && a.params.grid && a.params.grid.rows > 1;
  let l = e;
  if (a.params.loop)
    if (a.virtual && a.params.virtual.enabled) l = l + a.virtual.slidesBefore;
    else {
      let r;
      if (s) {
        const x = l * a.params.grid.rows;
        r = a.slides.find(
          (T) => T.getAttribute("data-swiper-slide-index") * 1 === x,
        ).column;
      } else r = a.getSlideIndexByData(l);
      const o = s
          ? Math.ceil(a.slides.length / a.params.grid.rows)
          : a.slides.length,
        {
          centeredSlides: u,
          slidesOffsetBefore: c,
          slidesOffsetAfter: f,
        } = a.params,
        h = u || !!c || !!f;
      let d = a.params.slidesPerView;
      d === "auto"
        ? (d = a.slidesPerViewDynamic())
        : ((d = Math.ceil(parseFloat(a.params.slidesPerView, 10))),
          h && d % 2 === 0 && (d = d + 1));
      let y = o - r < d;
      if (
        (h && (y = y || r < Math.ceil(d / 2)),
        i && h && a.params.slidesPerView !== "auto" && !s && (y = !1),
        y)
      ) {
        const x = h
          ? r < a.activeIndex
            ? "prev"
            : "next"
          : r - a.activeIndex - 1 < a.params.slidesPerView
            ? "next"
            : "prev";
        a.loopFix({
          direction: x,
          slideTo: !0,
          activeSlideIndex: x === "next" ? r + 1 : r - o + 1,
          slideRealIndex: x === "next" ? a.realIndex : void 0,
        });
      }
      if (s) {
        const x = l * a.params.grid.rows;
        l = a.slides.find(
          (T) => T.getAttribute("data-swiper-slide-index") * 1 === x,
        ).column;
      } else l = a.getSlideIndexByData(l);
    }
  return (
    requestAnimationFrame(() => {
      a.slideTo(l, t, n, i);
    }),
    a
  );
}
function n4(e, t = !0, n) {
  const i = this,
    { enabled: a, params: s, animating: l } = i;
  if (!a || i.destroyed) return i;
  typeof e > "u" && (e = i.params.speed);
  let r = s.slidesPerGroup;
  s.slidesPerView === "auto" &&
    s.slidesPerGroup === 1 &&
    s.slidesPerGroupAuto &&
    (r = Math.max(i.slidesPerViewDynamic("current", !0), 1));
  const o = i.activeIndex < s.slidesPerGroupSkip ? 1 : r,
    u = i.virtual && s.virtual.enabled;
  if (s.loop) {
    if (l && !u && s.loopPreventsSliding) return !1;
    if (
      (i.loopFix({ direction: "next" }),
      (i._clientLeft = i.wrapperEl.clientLeft),
      i.activeIndex === i.slides.length - 1 && s.cssMode)
    )
      return (
        requestAnimationFrame(() => {
          i.slideTo(i.activeIndex + o, e, t, n);
        }),
        !0
      );
  }
  return s.rewind && i.isEnd
    ? i.slideTo(0, e, t, n)
    : i.slideTo(i.activeIndex + o, e, t, n);
}
function i4(e, t = !0, n) {
  const i = this,
    {
      params: a,
      snapGrid: s,
      slidesGrid: l,
      rtlTranslate: r,
      enabled: o,
      animating: u,
    } = i;
  if (!o || i.destroyed) return i;
  typeof e > "u" && (e = i.params.speed);
  const c = i.virtual && a.virtual.enabled;
  if (a.loop) {
    if (u && !c && a.loopPreventsSliding) return !1;
    (i.loopFix({ direction: "prev" }),
      (i._clientLeft = i.wrapperEl.clientLeft));
  }
  const f = r ? i.translate : -i.translate;
  function h(p) {
    return p < 0 ? -Math.floor(Math.abs(p)) : Math.floor(p);
  }
  const d = h(f),
    y = s.map((p) => h(p)),
    x = a.freeMode && a.freeMode.enabled;
  let T = s[y.indexOf(d) - 1];
  if (typeof T > "u" && (a.cssMode || x)) {
    let p;
    (s.forEach((v, b) => {
      d >= v && (p = b);
    }),
      typeof p < "u" && (T = x ? s[p] : s[p > 0 ? p - 1 : p]));
  }
  let m = 0;
  if (
    (typeof T < "u" &&
      ((m = l.indexOf(T)),
      m < 0 && (m = i.activeIndex - 1),
      a.slidesPerView === "auto" &&
        a.slidesPerGroup === 1 &&
        a.slidesPerGroupAuto &&
        ((m = m - i.slidesPerViewDynamic("previous", !0) + 1),
        (m = Math.max(m, 0)))),
    a.rewind && i.isBeginning)
  ) {
    const p =
      i.params.virtual && i.params.virtual.enabled && i.virtual
        ? i.virtual.slides.length - 1
        : i.slides.length - 1;
    return i.slideTo(p, e, t, n);
  } else if (a.loop && i.activeIndex === 0 && a.cssMode)
    return (
      requestAnimationFrame(() => {
        i.slideTo(m, e, t, n);
      }),
      !0
    );
  return i.slideTo(m, e, t, n);
}
function a4(e, t = !0, n) {
  const i = this;
  if (!i.destroyed)
    return (
      typeof e > "u" && (e = i.params.speed),
      i.slideTo(i.activeIndex, e, t, n)
    );
}
function s4(e, t = !0, n, i = 0.5) {
  const a = this;
  if (a.destroyed) return;
  typeof e > "u" && (e = a.params.speed);
  let s = a.activeIndex;
  const l = Math.min(a.params.slidesPerGroupSkip, s),
    r = l + Math.floor((s - l) / a.params.slidesPerGroup),
    o = a.rtlTranslate ? a.translate : -a.translate;
  if (o >= a.snapGrid[r]) {
    const u = a.snapGrid[r],
      c = a.snapGrid[r + 1];
    o - u > (c - u) * i && (s += a.params.slidesPerGroup);
  } else {
    const u = a.snapGrid[r - 1],
      c = a.snapGrid[r];
    o - u <= (c - u) * i && (s -= a.params.slidesPerGroup);
  }
  return (
    (s = Math.max(s, 0)),
    (s = Math.min(s, a.slidesGrid.length - 1)),
    a.slideTo(s, e, t, n)
  );
}
function l4() {
  const e = this;
  if (e.destroyed) return;
  const { params: t, slidesEl: n } = e,
    i = t.slidesPerView === "auto" ? e.slidesPerViewDynamic() : t.slidesPerView;
  let a = e.getSlideIndexWhenGrid(e.clickedIndex),
    s;
  const l = e.isElement ? "swiper-slide" : `.${t.slideClass}`,
    r = e.grid && e.params.grid && e.params.grid.rows > 1;
  if (t.loop) {
    if (e.animating) return;
    ((s = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10)),
      t.centeredSlides
        ? e.slideToLoop(s)
        : a >
            (r
              ? (e.slides.length - i) / 2 - (e.params.grid.rows - 1)
              : e.slides.length - i)
          ? (e.loopFix(),
            (a = e.getSlideIndex(
              Ut(n, `${l}[data-swiper-slide-index="${s}"]`)[0],
            )),
            Fy(() => {
              e.slideTo(a);
            }))
          : e.slideTo(a));
  } else e.slideTo(a);
}
var r4 = {
  slideTo: e4,
  slideToLoop: t4,
  slideNext: n4,
  slidePrev: i4,
  slideReset: a4,
  slideToClosest: s4,
  slideToClickedSlide: l4,
};
function o4(e, t) {
  const n = this,
    { params: i, slidesEl: a } = n;
  if (!i.loop || (n.virtual && n.params.virtual.enabled)) return;
  const s = () => {
      Ut(a, `.${i.slideClass}, swiper-slide`).forEach((y, x) => {
        y.setAttribute("data-swiper-slide-index", x);
      });
    },
    l = () => {
      const d = Ut(a, `.${i.slideBlankClass}`);
      (d.forEach((y) => {
        y.remove();
      }),
        d.length > 0 && (n.recalcSlides(), n.updateSlides()));
    },
    r = n.grid && i.grid && i.grid.rows > 1;
  i.loopAddBlankSlides && (i.slidesPerGroup > 1 || r) && l();
  const o = i.slidesPerGroup * (r ? i.grid.rows : 1),
    u = n.slides.length % o !== 0,
    c = r && n.slides.length % i.grid.rows !== 0,
    f = (d) => {
      for (let y = 0; y < d; y += 1) {
        const x = n.isElement
          ? js("swiper-slide", [i.slideBlankClass])
          : js("div", [i.slideClass, i.slideBlankClass]);
        n.slidesEl.append(x);
      }
    };
  if (u) {
    if (i.loopAddBlankSlides) {
      const d = o - (n.slides.length % o);
      (f(d), n.recalcSlides(), n.updateSlides());
    } else
      yr(
        "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
      );
    s();
  } else if (c) {
    if (i.loopAddBlankSlides) {
      const d = i.grid.rows - (n.slides.length % i.grid.rows);
      (f(d), n.recalcSlides(), n.updateSlides());
    } else
      yr(
        "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
      );
    s();
  } else s();
  const h = i.centeredSlides || !!i.slidesOffsetBefore || !!i.slidesOffsetAfter;
  n.loopFix({ slideRealIndex: e, direction: h ? void 0 : "next", initial: t });
}
function u4({
  slideRealIndex: e,
  slideTo: t = !0,
  direction: n,
  setTranslate: i,
  activeSlideIndex: a,
  initial: s,
  byController: l,
  byMousewheel: r,
} = {}) {
  const o = this;
  if (!o.params.loop) return;
  o.emit("beforeLoopFix");
  const {
      slides: u,
      allowSlidePrev: c,
      allowSlideNext: f,
      slidesEl: h,
      params: d,
    } = o,
    {
      centeredSlides: y,
      slidesOffsetBefore: x,
      slidesOffsetAfter: T,
      initialSlide: m,
    } = d,
    p = y || !!x || !!T;
  if (
    ((o.allowSlidePrev = !0),
    (o.allowSlideNext = !0),
    o.virtual && d.virtual.enabled)
  ) {
    (t &&
      (!p && o.snapIndex === 0
        ? o.slideTo(o.virtual.slides.length, 0, !1, !0)
        : p && o.snapIndex < d.slidesPerView
          ? o.slideTo(o.virtual.slides.length + o.snapIndex, 0, !1, !0)
          : o.snapIndex === o.snapGrid.length - 1 &&
            o.slideTo(o.virtual.slidesBefore, 0, !1, !0)),
      (o.allowSlidePrev = c),
      (o.allowSlideNext = f),
      o.emit("loopFix"));
    return;
  }
  let v = d.slidesPerView;
  v === "auto"
    ? (v = o.slidesPerViewDynamic())
    : ((v = Math.ceil(parseFloat(d.slidesPerView, 10))),
      p && v % 2 === 0 && (v = v + 1));
  const b = d.slidesPerGroupAuto ? v : d.slidesPerGroup;
  let w = p ? Math.max(b, Math.ceil(v / 2)) : b;
  (w % b !== 0 && (w += b - (w % b)),
    (w += d.loopAdditionalSlides),
    (o.loopedSlides = w));
  const M = o.grid && d.grid && d.grid.rows > 1;
  u.length < v + w || (o.params.effect === "cards" && u.length < v + w * 2)
    ? yr(
        "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters",
      )
    : M &&
      d.grid.fill === "row" &&
      yr(
        "Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`",
      );
  const E = [],
    S = [],
    O = M ? Math.ceil(u.length / d.grid.rows) : u.length,
    C = s && O - m < v && !p;
  let A = C ? m : o.activeIndex;
  typeof a > "u"
    ? (a = o.getSlideIndex(
        u.find((N) => N.classList.contains(d.slideActiveClass)),
      ))
    : (A = a);
  const j = n === "next" || !n,
    _ = n === "prev" || !n;
  let R = 0,
    Y = 0;
  const z = (M ? u[a].column : a) + (p && typeof i > "u" ? -v / 2 + 0.5 : 0);
  if (z < w) {
    R = Math.max(w - z, b);
    for (let N = 0; N < w - z; N += 1) {
      const B = N - Math.floor(N / O) * O;
      if (M) {
        const U = O - B - 1;
        for (let he = u.length - 1; he >= 0; he -= 1)
          u[he].column === U && E.push(he);
      } else E.push(O - B - 1);
    }
  } else if (z + v > O - w) {
    ((Y = Math.max(z - (O - w * 2), b)), C && (Y = Math.max(Y, v - O + m + 1)));
    for (let N = 0; N < Y; N += 1) {
      const B = N - Math.floor(N / O) * O;
      M
        ? u.forEach((U, he) => {
            U.column === B && S.push(he);
          })
        : S.push(B);
    }
  }
  if (
    ((o.__preventObserver__ = !0),
    requestAnimationFrame(() => {
      o.__preventObserver__ = !1;
    }),
    o.params.effect === "cards" &&
      u.length < v + w * 2 &&
      (S.includes(a) && S.splice(S.indexOf(a), 1),
      E.includes(a) && E.splice(E.indexOf(a), 1)),
    _ &&
      E.forEach((N) => {
        ((u[N].swiperLoopMoveDOM = !0),
          h.prepend(u[N]),
          (u[N].swiperLoopMoveDOM = !1));
      }),
    j &&
      S.forEach((N) => {
        ((u[N].swiperLoopMoveDOM = !0),
          h.append(u[N]),
          (u[N].swiperLoopMoveDOM = !1));
      }),
    o.recalcSlides(),
    d.slidesPerView === "auto"
      ? o.updateSlides()
      : M &&
        ((E.length > 0 && _) || (S.length > 0 && j)) &&
        o.slides.forEach((N, B) => {
          o.grid.updateSlide(B, N, o.slides);
        }),
    d.watchSlidesProgress && o.updateSlidesOffset(),
    t)
  ) {
    if (E.length > 0 && _) {
      if (typeof e > "u") {
        const N = o.slidesGrid[A],
          U = o.slidesGrid[A + R] - N;
        r
          ? o.setTranslate(o.translate - U)
          : (o.slideTo(A + Math.ceil(R), 0, !1, !0),
            i &&
              ((o.touchEventsData.startTranslate =
                o.touchEventsData.startTranslate - U),
              (o.touchEventsData.currentTranslate =
                o.touchEventsData.currentTranslate - U)));
      } else if (i) {
        const N = M ? E.length / d.grid.rows : E.length;
        (o.slideTo(o.activeIndex + N, 0, !1, !0),
          (o.touchEventsData.currentTranslate = o.translate));
      }
    } else if (S.length > 0 && j)
      if (typeof e > "u") {
        const N = o.slidesGrid[A],
          U = o.slidesGrid[A - Y] - N;
        r
          ? o.setTranslate(o.translate - U)
          : (o.slideTo(A - Y, 0, !1, !0),
            i &&
              ((o.touchEventsData.startTranslate =
                o.touchEventsData.startTranslate - U),
              (o.touchEventsData.currentTranslate =
                o.touchEventsData.currentTranslate - U)));
      } else {
        const N = M ? S.length / d.grid.rows : S.length;
        o.slideTo(o.activeIndex - N, 0, !1, !0);
      }
  }
  if (
    ((o.allowSlidePrev = c),
    (o.allowSlideNext = f),
    o.controller && o.controller.control && !l)
  ) {
    const N = {
      slideRealIndex: e,
      direction: n,
      setTranslate: i,
      activeSlideIndex: a,
      byController: !0,
    };
    Array.isArray(o.controller.control)
      ? o.controller.control.forEach((B) => {
          !B.destroyed &&
            B.params.loop &&
            B.loopFix({
              ...N,
              slideTo: B.params.slidesPerView === d.slidesPerView ? t : !1,
            });
        })
      : o.controller.control instanceof o.constructor &&
        o.controller.control.params.loop &&
        o.controller.control.loopFix({
          ...N,
          slideTo:
            o.controller.control.params.slidesPerView === d.slidesPerView
              ? t
              : !1,
        });
  }
  o.emit("loopFix");
}
function c4() {
  const e = this,
    { params: t, slidesEl: n } = e;
  if (!t.loop || !n || (e.virtual && e.params.virtual.enabled)) return;
  e.recalcSlides();
  const i = [];
  (e.slides.forEach((a) => {
    const s =
      typeof a.swiperSlideIndex > "u"
        ? a.getAttribute("data-swiper-slide-index") * 1
        : a.swiperSlideIndex;
    i[s] = a;
  }),
    e.slides.forEach((a) => {
      a.removeAttribute("data-swiper-slide-index");
    }),
    i.forEach((a) => {
      n.append(a);
    }),
    e.recalcSlides(),
    e.slideTo(e.realIndex, 0));
}
var f4 = { loopCreate: o4, loopFix: u4, loopDestroy: c4 };
function d4(e) {
  const t = this;
  if (
    !t.params.simulateTouch ||
    (t.params.watchOverflow && t.isLocked) ||
    t.params.cssMode
  )
    return;
  const n = t.params.touchEventsTarget === "container" ? t.el : t.wrapperEl;
  (t.isElement && (t.__preventObserver__ = !0),
    (n.style.cursor = "move"),
    (n.style.cursor = e ? "grabbing" : "grab"),
    t.isElement &&
      requestAnimationFrame(() => {
        t.__preventObserver__ = !1;
      }));
}
function h4() {
  const e = this;
  (e.params.watchOverflow && e.isLocked) ||
    e.params.cssMode ||
    (e.isElement && (e.__preventObserver__ = !0),
    (e[
      e.params.touchEventsTarget === "container" ? "el" : "wrapperEl"
    ].style.cursor = ""),
    e.isElement &&
      requestAnimationFrame(() => {
        e.__preventObserver__ = !1;
      }));
}
var m4 = { setGrabCursor: d4, unsetGrabCursor: h4 };
function p4(e, t = this) {
  function n(i) {
    if (!i || i === Xt() || i === Qe()) return null;
    i.assignedSlot && (i = i.assignedSlot);
    const a = i.closest(e);
    return !a && !i.getRootNode ? null : a || n(i.getRootNode().host);
  }
  return n(t);
}
function tp(e, t, n) {
  const i = Qe(),
    { params: a } = e,
    s = a.edgeSwipeDetection,
    l = a.edgeSwipeThreshold;
  return s && (n <= l || n >= i.innerWidth - l)
    ? s === "prevent"
      ? (t.preventDefault(), !0)
      : !1
    : !0;
}
function g4(e) {
  const t = this,
    n = Xt();
  let i = e;
  i.originalEvent && (i = i.originalEvent);
  const a = t.touchEventsData;
  if (i.type === "pointerdown") {
    if (a.pointerId !== null && a.pointerId !== i.pointerId) return;
    a.pointerId = i.pointerId;
  } else
    i.type === "touchstart" &&
      i.targetTouches.length === 1 &&
      (a.touchId = i.targetTouches[0].identifier);
  if (i.type === "touchstart") {
    tp(t, i, i.targetTouches[0].pageX);
    return;
  }
  const { params: s, touches: l, enabled: r } = t;
  if (
    !r ||
    (!s.simulateTouch && i.pointerType === "mouse") ||
    (t.animating && s.preventInteractionOnTransition)
  )
    return;
  !t.animating && s.cssMode && s.loop && t.loopFix();
  let o = i.target;
  if (
    (s.touchEventsTarget === "wrapper" && !TE(o, t.wrapperEl)) ||
    ("which" in i && i.which === 3) ||
    ("button" in i && i.button > 0) ||
    (a.isTouched && a.isMoved)
  )
    return;
  const u = !!s.noSwipingClass && s.noSwipingClass !== "",
    c = i.composedPath ? i.composedPath() : i.path;
  u && i.target && i.target.shadowRoot && c && (o = c[0]);
  const f = s.noSwipingSelector ? s.noSwipingSelector : `.${s.noSwipingClass}`,
    h = !!(i.target && i.target.shadowRoot);
  if (s.noSwiping && (h ? p4(f, o) : o.closest(f))) {
    t.allowClick = !0;
    return;
  }
  if (s.swipeHandler && !o.closest(s.swipeHandler)) return;
  ((l.currentX = i.pageX), (l.currentY = i.pageY));
  const d = l.currentX,
    y = l.currentY;
  if (!tp(t, i, d)) return;
  (Object.assign(a, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0,
  }),
    (l.startX = d),
    (l.startY = y),
    (a.touchStartTime = vr()),
    (t.allowClick = !0),
    t.updateSize(),
    (t.swipeDirection = void 0),
    s.threshold > 0 && (a.allowThresholdMove = !1));
  let x = !0;
  (o.matches(a.focusableElements) &&
    ((x = !1), o.nodeName === "SELECT" && (a.isTouched = !1)),
    n.activeElement &&
      n.activeElement.matches(a.focusableElements) &&
      n.activeElement !== o &&
      (i.pointerType === "mouse" ||
        (i.pointerType !== "mouse" && !o.matches(a.focusableElements))) &&
      n.activeElement.blur());
  const T = x && t.allowTouchMove && s.touchStartPreventDefault;
  ((s.touchStartForcePreventDefault || T) &&
    !o.isContentEditable &&
    i.preventDefault(),
    s.freeMode &&
      s.freeMode.enabled &&
      t.freeMode &&
      t.animating &&
      !s.cssMode &&
      t.freeMode.onTouchStart(),
    t.emit("touchStart", i));
}
function v4(e) {
  const t = Xt(),
    n = this,
    i = n.touchEventsData,
    { params: a, touches: s, rtlTranslate: l, enabled: r } = n;
  if (!r || (!a.simulateTouch && e.pointerType === "mouse")) return;
  let o = e;
  if (
    (o.originalEvent && (o = o.originalEvent),
    o.type === "pointermove" &&
      (i.touchId !== null || o.pointerId !== i.pointerId))
  )
    return;
  let u;
  if (o.type === "touchmove") {
    if (
      ((u = [...o.changedTouches].find((w) => w.identifier === i.touchId)),
      !u || u.identifier !== i.touchId)
    )
      return;
  } else u = o;
  if (!i.isTouched) {
    i.startMoving && i.isScrolling && n.emit("touchMoveOpposite", o);
    return;
  }
  const c = u.pageX,
    f = u.pageY;
  if (o.preventedByNestedSwiper) {
    ((s.startX = c), (s.startY = f));
    return;
  }
  if (!n.allowTouchMove) {
    (o.target.matches(i.focusableElements) || (n.allowClick = !1),
      i.isTouched &&
        (Object.assign(s, { startX: c, startY: f, currentX: c, currentY: f }),
        (i.touchStartTime = vr())));
    return;
  }
  if (a.touchReleaseOnEdges && !a.loop)
    if (n.isVertical()) {
      if (
        (f < s.startY && n.translate <= n.maxTranslate()) ||
        (f > s.startY && n.translate >= n.minTranslate())
      ) {
        ((i.isTouched = !1), (i.isMoved = !1));
        return;
      }
    } else {
      if (
        l &&
        ((c > s.startX && -n.translate <= n.maxTranslate()) ||
          (c < s.startX && -n.translate >= n.minTranslate()))
      )
        return;
      if (
        !l &&
        ((c < s.startX && n.translate <= n.maxTranslate()) ||
          (c > s.startX && n.translate >= n.minTranslate()))
      )
        return;
    }
  if (
    (t.activeElement &&
      t.activeElement.matches(i.focusableElements) &&
      t.activeElement !== o.target &&
      o.pointerType !== "mouse" &&
      t.activeElement.blur(),
    t.activeElement &&
      o.target === t.activeElement &&
      o.target.matches(i.focusableElements))
  ) {
    ((i.isMoved = !0), (n.allowClick = !1));
    return;
  }
  (i.allowTouchCallbacks && n.emit("touchMove", o),
    (s.previousX = s.currentX),
    (s.previousY = s.currentY),
    (s.currentX = c),
    (s.currentY = f));
  const h = s.currentX - s.startX,
    d = s.currentY - s.startY;
  if (n.params.threshold && Math.sqrt(h ** 2 + d ** 2) < n.params.threshold)
    return;
  if (typeof i.isScrolling > "u") {
    let w;
    (n.isHorizontal() && s.currentY === s.startY) ||
    (n.isVertical() && s.currentX === s.startX)
      ? (i.isScrolling = !1)
      : h * h + d * d >= 25 &&
        ((w = (Math.atan2(Math.abs(d), Math.abs(h)) * 180) / Math.PI),
        (i.isScrolling = n.isHorizontal()
          ? w > a.touchAngle
          : 90 - w > a.touchAngle));
  }
  if (
    (i.isScrolling && n.emit("touchMoveOpposite", o),
    typeof i.startMoving > "u" &&
      (s.currentX !== s.startX || s.currentY !== s.startY) &&
      (i.startMoving = !0),
    i.isScrolling ||
      (o.type === "touchmove" && i.preventTouchMoveFromPointerMove))
  ) {
    i.isTouched = !1;
    return;
  }
  if (!i.startMoving) return;
  ((n.allowClick = !1),
    !a.cssMode && o.cancelable && o.preventDefault(),
    a.touchMoveStopPropagation && !a.nested && o.stopPropagation());
  let y = n.isHorizontal() ? h : d,
    x = n.isHorizontal() ? s.currentX - s.previousX : s.currentY - s.previousY;
  (a.oneWayMovement &&
    ((y = Math.abs(y) * (l ? 1 : -1)), (x = Math.abs(x) * (l ? 1 : -1))),
    (s.diff = y),
    (y *= a.touchRatio),
    l && ((y = -y), (x = -x)));
  const T = n.touchesDirection;
  ((n.swipeDirection = y > 0 ? "prev" : "next"),
    (n.touchesDirection = x > 0 ? "prev" : "next"));
  const m = n.params.loop && !a.cssMode,
    p =
      (n.touchesDirection === "next" && n.allowSlideNext) ||
      (n.touchesDirection === "prev" && n.allowSlidePrev);
  if (!i.isMoved) {
    if (
      (m && p && n.loopFix({ direction: n.swipeDirection }),
      (i.startTranslate = n.getTranslate()),
      n.setTransition(0),
      n.animating)
    ) {
      const w = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0,
        detail: { bySwiperTouchMove: !0 },
      });
      n.wrapperEl.dispatchEvent(w);
    }
    ((i.allowMomentumBounce = !1),
      a.grabCursor &&
        (n.allowSlideNext === !0 || n.allowSlidePrev === !0) &&
        n.setGrabCursor(!0),
      n.emit("sliderFirstMove", o));
  }
  if (
    (new Date().getTime(),
    a._loopSwapReset !== !1 &&
      i.isMoved &&
      i.allowThresholdMove &&
      T !== n.touchesDirection &&
      m &&
      p &&
      Math.abs(y) >= 1)
  ) {
    (Object.assign(s, {
      startX: c,
      startY: f,
      currentX: c,
      currentY: f,
      startTranslate: i.currentTranslate,
    }),
      (i.loopSwapReset = !0),
      (i.startTranslate = i.currentTranslate));
    return;
  }
  (n.emit("sliderMove", o),
    (i.isMoved = !0),
    (i.currentTranslate = y + i.startTranslate));
  let v = !0,
    b = a.resistanceRatio;
  if (
    (a.touchReleaseOnEdges && (b = 0),
    y > 0
      ? (m &&
          p &&
          i.allowThresholdMove &&
          i.currentTranslate >
            (a.centeredSlides
              ? n.minTranslate() -
                n.slidesSizesGrid[n.activeIndex + 1] -
                (a.slidesPerView !== "auto" &&
                n.slides.length - a.slidesPerView >= 2
                  ? n.slidesSizesGrid[n.activeIndex + 1] + n.params.spaceBetween
                  : 0) -
                n.params.spaceBetween
              : n.minTranslate()) &&
          n.loopFix({
            direction: "prev",
            setTranslate: !0,
            activeSlideIndex: 0,
          }),
        i.currentTranslate > n.minTranslate() &&
          ((v = !1),
          a.resistance &&
            (i.currentTranslate =
              n.minTranslate() -
              1 +
              (-n.minTranslate() + i.startTranslate + y) ** b)))
      : y < 0 &&
        (m &&
          p &&
          i.allowThresholdMove &&
          i.currentTranslate <
            (a.centeredSlides
              ? n.maxTranslate() +
                n.slidesSizesGrid[n.slidesSizesGrid.length - 1] +
                n.params.spaceBetween +
                (a.slidesPerView !== "auto" &&
                n.slides.length - a.slidesPerView >= 2
                  ? n.slidesSizesGrid[n.slidesSizesGrid.length - 1] +
                    n.params.spaceBetween
                  : 0)
              : n.maxTranslate()) &&
          n.loopFix({
            direction: "next",
            setTranslate: !0,
            activeSlideIndex:
              n.slides.length -
              (a.slidesPerView === "auto"
                ? n.slidesPerViewDynamic()
                : Math.ceil(parseFloat(a.slidesPerView, 10))),
          }),
        i.currentTranslate < n.maxTranslate() &&
          ((v = !1),
          a.resistance &&
            (i.currentTranslate =
              n.maxTranslate() +
              1 -
              (n.maxTranslate() - i.startTranslate - y) ** b))),
    v && (o.preventedByNestedSwiper = !0),
    !n.allowSlideNext &&
      n.swipeDirection === "next" &&
      i.currentTranslate < i.startTranslate &&
      (i.currentTranslate = i.startTranslate),
    !n.allowSlidePrev &&
      n.swipeDirection === "prev" &&
      i.currentTranslate > i.startTranslate &&
      (i.currentTranslate = i.startTranslate),
    !n.allowSlidePrev &&
      !n.allowSlideNext &&
      (i.currentTranslate = i.startTranslate),
    a.threshold > 0)
  )
    if (Math.abs(y) > a.threshold || i.allowThresholdMove) {
      if (!i.allowThresholdMove) {
        ((i.allowThresholdMove = !0),
          (s.startX = s.currentX),
          (s.startY = s.currentY),
          (i.currentTranslate = i.startTranslate),
          (s.diff = n.isHorizontal()
            ? s.currentX - s.startX
            : s.currentY - s.startY));
        return;
      }
    } else {
      i.currentTranslate = i.startTranslate;
      return;
    }
  !a.followFinger ||
    a.cssMode ||
    (((a.freeMode && a.freeMode.enabled && n.freeMode) ||
      a.watchSlidesProgress) &&
      (n.updateActiveIndex(), n.updateSlidesClasses()),
    a.freeMode && a.freeMode.enabled && n.freeMode && n.freeMode.onTouchMove(),
    n.updateProgress(i.currentTranslate),
    n.setTranslate(i.currentTranslate));
}
function y4(e) {
  const t = this,
    n = t.touchEventsData;
  let i = e;
  i.originalEvent && (i = i.originalEvent);
  let a;
  if (i.type === "touchend" || i.type === "touchcancel") {
    if (
      ((a = [...i.changedTouches].find((w) => w.identifier === n.touchId)),
      !a || a.identifier !== n.touchId)
    )
      return;
  } else {
    if (n.touchId !== null || i.pointerId !== n.pointerId) return;
    a = i;
  }
  if (
    ["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(
      i.type,
    ) &&
    !(
      ["pointercancel", "contextmenu"].includes(i.type) &&
      (t.browser.isSafari || t.browser.isWebView)
    )
  )
    return;
  ((n.pointerId = null), (n.touchId = null));
  const {
    params: l,
    touches: r,
    rtlTranslate: o,
    slidesGrid: u,
    enabled: c,
  } = t;
  if (!c || (!l.simulateTouch && i.pointerType === "mouse")) return;
  if (
    (n.allowTouchCallbacks && t.emit("touchEnd", i),
    (n.allowTouchCallbacks = !1),
    !n.isTouched)
  ) {
    (n.isMoved && l.grabCursor && t.setGrabCursor(!1),
      (n.isMoved = !1),
      (n.startMoving = !1));
    return;
  }
  l.grabCursor &&
    n.isMoved &&
    n.isTouched &&
    (t.allowSlideNext === !0 || t.allowSlidePrev === !0) &&
    t.setGrabCursor(!1);
  const f = vr(),
    h = f - n.touchStartTime;
  if (t.allowClick) {
    const w = i.path || (i.composedPath && i.composedPath());
    (t.updateClickedSlide((w && w[0]) || i.target, w),
      t.emit("tap click", i),
      h < 300 &&
        f - n.lastClickTime < 300 &&
        t.emit("doubleTap doubleClick", i));
  }
  if (
    ((n.lastClickTime = vr()),
    Fy(() => {
      t.destroyed || (t.allowClick = !0);
    }),
    !n.isTouched ||
      !n.isMoved ||
      !t.swipeDirection ||
      (r.diff === 0 && !n.loopSwapReset) ||
      (n.currentTranslate === n.startTranslate && !n.loopSwapReset))
  ) {
    ((n.isTouched = !1), (n.isMoved = !1), (n.startMoving = !1));
    return;
  }
  ((n.isTouched = !1), (n.isMoved = !1), (n.startMoving = !1));
  let d;
  if (
    (l.followFinger
      ? (d = o ? t.translate : -t.translate)
      : (d = -n.currentTranslate),
    l.cssMode)
  )
    return;
  if (l.freeMode && l.freeMode.enabled) {
    t.freeMode.onTouchEnd({ currentPos: d });
    return;
  }
  const y = d >= -t.maxTranslate() && !t.params.loop;
  let x = 0,
    T = t.slidesSizesGrid[0];
  for (
    let w = 0;
    w < u.length;
    w += w < l.slidesPerGroupSkip ? 1 : l.slidesPerGroup
  ) {
    const M = w < l.slidesPerGroupSkip - 1 ? 1 : l.slidesPerGroup;
    typeof u[w + M] < "u"
      ? (y || (d >= u[w] && d < u[w + M])) && ((x = w), (T = u[w + M] - u[w]))
      : (y || d >= u[w]) && ((x = w), (T = u[u.length - 1] - u[u.length - 2]));
  }
  let m = null,
    p = null;
  l.rewind &&
    (t.isBeginning
      ? (p =
          l.virtual && l.virtual.enabled && t.virtual
            ? t.virtual.slides.length - 1
            : t.slides.length - 1)
      : t.isEnd && (m = 0));
  const v = (d - u[x]) / T,
    b = x < l.slidesPerGroupSkip - 1 ? 1 : l.slidesPerGroup;
  if (h > l.longSwipesMs) {
    if (!l.longSwipes) {
      t.slideTo(t.activeIndex);
      return;
    }
    (t.swipeDirection === "next" &&
      (v >= l.longSwipesRatio
        ? t.slideTo(l.rewind && t.isEnd ? m : x + b)
        : t.slideTo(x)),
      t.swipeDirection === "prev" &&
        (v > 1 - l.longSwipesRatio
          ? t.slideTo(x + b)
          : p !== null && v < 0 && Math.abs(v) > l.longSwipesRatio
            ? t.slideTo(p)
            : t.slideTo(x)));
  } else {
    if (!l.shortSwipes) {
      t.slideTo(t.activeIndex);
      return;
    }
    t.navigation &&
    (i.target === t.navigation.nextEl || i.target === t.navigation.prevEl)
      ? i.target === t.navigation.nextEl
        ? t.slideTo(x + b)
        : t.slideTo(x)
      : (t.swipeDirection === "next" && t.slideTo(m !== null ? m : x + b),
        t.swipeDirection === "prev" && t.slideTo(p !== null ? p : x));
  }
}
function np() {
  const e = this,
    { params: t, el: n } = e;
  if (n && n.offsetWidth === 0) return;
  t.breakpoints && e.setBreakpoint();
  const { allowSlideNext: i, allowSlidePrev: a, snapGrid: s } = e,
    l = e.virtual && e.params.virtual.enabled;
  ((e.allowSlideNext = !0),
    (e.allowSlidePrev = !0),
    e.updateSize(),
    e.updateSlides(),
    e.updateSlidesClasses());
  const r = l && t.loop;
  ((t.slidesPerView === "auto" || t.slidesPerView > 1) &&
  e.isEnd &&
  !e.isBeginning &&
  !e.params.centeredSlides &&
  !r
    ? e.slideTo(e.slides.length - 1, 0, !1, !0)
    : e.params.loop && !l
      ? e.slideToLoop(e.realIndex, 0, !1, !0)
      : e.slideTo(e.activeIndex, 0, !1, !0),
    e.autoplay &&
      e.autoplay.running &&
      e.autoplay.paused &&
      (clearTimeout(e.autoplay.resizeTimeout),
      (e.autoplay.resizeTimeout = setTimeout(() => {
        e.autoplay &&
          e.autoplay.running &&
          e.autoplay.paused &&
          e.autoplay.resume();
      }, 500))),
    (e.allowSlidePrev = a),
    (e.allowSlideNext = i),
    e.params.watchOverflow && s !== e.snapGrid && e.checkOverflow());
}
function x4(e) {
  const t = this;
  t.enabled &&
    (t.allowClick ||
      (t.params.preventClicks && e.preventDefault(),
      t.params.preventClicksPropagation &&
        t.animating &&
        (e.stopPropagation(), e.stopImmediatePropagation())));
}
function b4() {
  const e = this,
    { wrapperEl: t, rtlTranslate: n, enabled: i } = e;
  if (!i) return;
  ((e.previousTranslate = e.translate),
    e.isHorizontal()
      ? (e.translate = -t.scrollLeft)
      : (e.translate = -t.scrollTop),
    e.translate === 0 && (e.translate = 0),
    e.updateActiveIndex(),
    e.updateSlidesClasses());
  let a;
  const s = e.maxTranslate() - e.minTranslate();
  (s === 0 ? (a = 0) : (a = (e.translate - e.minTranslate()) / s),
    a !== e.progress && e.updateProgress(n ? -e.translate : e.translate),
    e.emit("setTranslate", e.translate, !1));
}
function S4(e) {
  const t = this;
  (Ll(t, e.target),
    !(
      t.params.cssMode ||
      (t.params.slidesPerView !== "auto" && !t.params.autoHeight)
    ) && t.update());
}
function T4() {
  const e = this;
  e.documentTouchHandlerProceeded ||
    ((e.documentTouchHandlerProceeded = !0),
    e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
}
const n1 = (e, t) => {
  const n = Xt(),
    { params: i, el: a, wrapperEl: s, device: l } = e,
    r = !!i.nested,
    o = t === "on" ? "addEventListener" : "removeEventListener",
    u = t;
  !a ||
    typeof a == "string" ||
    (n[o]("touchstart", e.onDocumentTouchStart, { passive: !1, capture: r }),
    a[o]("touchstart", e.onTouchStart, { passive: !1 }),
    a[o]("pointerdown", e.onTouchStart, { passive: !1 }),
    n[o]("touchmove", e.onTouchMove, { passive: !1, capture: r }),
    n[o]("pointermove", e.onTouchMove, { passive: !1, capture: r }),
    n[o]("touchend", e.onTouchEnd, { passive: !0 }),
    n[o]("pointerup", e.onTouchEnd, { passive: !0 }),
    n[o]("pointercancel", e.onTouchEnd, { passive: !0 }),
    n[o]("touchcancel", e.onTouchEnd, { passive: !0 }),
    n[o]("pointerout", e.onTouchEnd, { passive: !0 }),
    n[o]("pointerleave", e.onTouchEnd, { passive: !0 }),
    n[o]("contextmenu", e.onTouchEnd, { passive: !0 }),
    (i.preventClicks || i.preventClicksPropagation) &&
      a[o]("click", e.onClick, !0),
    i.cssMode && s[o]("scroll", e.onScroll),
    i.updateOnWindowResize
      ? e[u](
          l.ios || l.android
            ? "resize orientationchange observerUpdate"
            : "resize observerUpdate",
          np,
          !0,
        )
      : e[u]("observerUpdate", np, !0),
    a[o]("load", e.onLoad, { capture: !0 }));
};
function w4() {
  const e = this,
    { params: t } = e;
  ((e.onTouchStart = g4.bind(e)),
    (e.onTouchMove = v4.bind(e)),
    (e.onTouchEnd = y4.bind(e)),
    (e.onDocumentTouchStart = T4.bind(e)),
    t.cssMode && (e.onScroll = b4.bind(e)),
    (e.onClick = x4.bind(e)),
    (e.onLoad = S4.bind(e)),
    n1(e, "on"));
}
function E4() {
  n1(this, "off");
}
var M4 = { attachEvents: w4, detachEvents: E4 };
const ip = (e, t) => e.grid && t.grid && t.grid.rows > 1;
function A4() {
  const e = this,
    { realIndex: t, initialized: n, params: i, el: a } = e,
    s = i.breakpoints;
  if (!s || (s && Object.keys(s).length === 0)) return;
  const l = Xt(),
    r =
      i.breakpointsBase === "window" || !i.breakpointsBase
        ? i.breakpointsBase
        : "container",
    o =
      ["window", "container"].includes(i.breakpointsBase) || !i.breakpointsBase
        ? e.el
        : l.querySelector(i.breakpointsBase),
    u = e.getBreakpoint(s, r, o);
  if (!u || e.currentBreakpoint === u) return;
  const f = (u in s ? s[u] : void 0) || e.originalParams,
    h = ip(e, i),
    d = ip(e, f),
    y = e.params.grabCursor,
    x = f.grabCursor,
    T = i.enabled;
  (h && !d
    ? (a.classList.remove(
        `${i.containerModifierClass}grid`,
        `${i.containerModifierClass}grid-column`,
      ),
      e.emitContainerClasses())
    : !h &&
      d &&
      (a.classList.add(`${i.containerModifierClass}grid`),
      ((f.grid.fill && f.grid.fill === "column") ||
        (!f.grid.fill && i.grid.fill === "column")) &&
        a.classList.add(`${i.containerModifierClass}grid-column`),
      e.emitContainerClasses()),
    y && !x ? e.unsetGrabCursor() : !y && x && e.setGrabCursor(),
    ["navigation", "pagination", "scrollbar"].forEach((M) => {
      if (typeof f[M] > "u") return;
      const E = i[M] && i[M].enabled,
        S = f[M] && f[M].enabled;
      (E && !S && e[M].disable(), !E && S && e[M].enable());
    }));
  const m = f.direction && f.direction !== i.direction,
    p = i.loop && (f.slidesPerView !== i.slidesPerView || m),
    v = i.loop;
  (m && n && e.changeDirection(), lt(e.params, f));
  const b = e.params.enabled,
    w = e.params.loop;
  (Object.assign(e, {
    allowTouchMove: e.params.allowTouchMove,
    allowSlideNext: e.params.allowSlideNext,
    allowSlidePrev: e.params.allowSlidePrev,
  }),
    T && !b ? e.disable() : !T && b && e.enable(),
    (e.currentBreakpoint = u),
    e.emit("_beforeBreakpoint", f),
    n &&
      (p
        ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
        : !v && w
          ? (e.loopCreate(t), e.updateSlides())
          : v && !w && e.loopDestroy()),
    e.emit("breakpoint", f));
}
function C4(e, t = "window", n) {
  if (!e || (t === "container" && !n)) return;
  let i = !1;
  const a = Qe(),
    s = t === "window" ? a.innerHeight : n.clientHeight,
    l = Object.keys(e).map((r) => {
      if (typeof r == "string" && r.indexOf("@") === 0) {
        const o = parseFloat(r.substr(1));
        return { value: s * o, point: r };
      }
      return { value: r, point: r };
    });
  l.sort((r, o) => parseInt(r.value, 10) - parseInt(o.value, 10));
  for (let r = 0; r < l.length; r += 1) {
    const { point: o, value: u } = l[r];
    t === "window"
      ? a.matchMedia(`(min-width: ${u}px)`).matches && (i = o)
      : u <= n.clientWidth && (i = o);
  }
  return i || "max";
}
var j4 = { setBreakpoint: A4, getBreakpoint: C4 };
function N4(e, t) {
  const n = [];
  return (
    e.forEach((i) => {
      typeof i == "object"
        ? Object.keys(i).forEach((a) => {
            i[a] && n.push(t + a);
          })
        : typeof i == "string" && n.push(t + i);
    }),
    n
  );
}
function O4() {
  const e = this,
    { classNames: t, params: n, rtl: i, el: a, device: s } = e,
    l = N4(
      [
        "initialized",
        n.direction,
        { "free-mode": e.params.freeMode && n.freeMode.enabled },
        { autoheight: n.autoHeight },
        { rtl: i },
        { grid: n.grid && n.grid.rows > 1 },
        {
          "grid-column": n.grid && n.grid.rows > 1 && n.grid.fill === "column",
        },
        { android: s.android },
        { ios: s.ios },
        { "css-mode": n.cssMode },
        { centered: n.cssMode && n.centeredSlides },
        { "watch-progress": n.watchSlidesProgress },
      ],
      n.containerModifierClass,
    );
  (t.push(...l), a.classList.add(...t), e.emitContainerClasses());
}
function D4() {
  const e = this,
    { el: t, classNames: n } = e;
  !t ||
    typeof t == "string" ||
    (t.classList.remove(...n), e.emitContainerClasses());
}
var z4 = { addClasses: O4, removeClasses: D4 };
function L4() {
  const e = this,
    { isLocked: t, params: n } = e,
    { slidesOffsetBefore: i } = n;
  if (i) {
    const a = e.slides.length - 1,
      s = e.slidesGrid[a] + e.slidesSizesGrid[a] + i * 2;
    e.isLocked = e.size > s;
  } else e.isLocked = e.snapGrid.length === 1;
  (n.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked),
    n.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked),
    t && t !== e.isLocked && (e.isEnd = !1),
    t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"));
}
var V4 = { checkOverflow: L4 },
  yc = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    swiperElementNodeName: "SWIPER-CONTAINER",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: "swiper",
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
function _4(e, t) {
  return function (i = {}) {
    const a = Object.keys(i)[0],
      s = i[a];
    if (typeof s != "object" || s === null) {
      lt(t, i);
      return;
    }
    if (
      (e[a] === !0 && (e[a] = { enabled: !0 }),
      a === "navigation" &&
        e[a] &&
        e[a].enabled &&
        !e[a].prevEl &&
        !e[a].nextEl &&
        (e[a].auto = !0),
      ["pagination", "scrollbar"].indexOf(a) >= 0 &&
        e[a] &&
        e[a].enabled &&
        !e[a].el &&
        (e[a].auto = !0),
      !(a in e && "enabled" in s))
    ) {
      lt(t, i);
      return;
    }
    (typeof e[a] == "object" && !("enabled" in e[a]) && (e[a].enabled = !0),
      e[a] || (e[a] = { enabled: !1 }),
      lt(t, i));
  };
}
const Io = {
    eventsEmitter: zE,
    update: XE,
    translate: FE,
    transition: WE,
    slide: r4,
    loop: f4,
    grabCursor: m4,
    events: M4,
    breakpoints: j4,
    checkOverflow: V4,
    classes: z4,
  },
  Jo = {};
let id = class Jt {
  constructor(...t) {
    let n, i;
    (t.length === 1 &&
    t[0].constructor &&
    Object.prototype.toString.call(t[0]).slice(8, -1) === "Object"
      ? (i = t[0])
      : ([n, i] = t),
      i || (i = {}),
      (i = lt({}, i)),
      n && !i.el && (i.el = n));
    const a = Xt();
    if (
      i.el &&
      typeof i.el == "string" &&
      a.querySelectorAll(i.el).length > 1
    ) {
      const o = [];
      return (
        a.querySelectorAll(i.el).forEach((u) => {
          const c = lt({}, i, { el: u });
          o.push(new Jt(c));
        }),
        o
      );
    }
    const s = this;
    ((s.__swiper__ = !0),
      (s.support = Jy()),
      (s.device = Wy({ userAgent: i.userAgent })),
      (s.browser = e1()),
      (s.eventsListeners = {}),
      (s.eventsAnyListeners = []),
      (s.modules = [...s.__modules__]),
      i.modules && Array.isArray(i.modules) && s.modules.push(...i.modules));
    const l = {};
    s.modules.forEach((o) => {
      o({
        params: i,
        swiper: s,
        extendParams: _4(i, l),
        on: s.on.bind(s),
        once: s.once.bind(s),
        off: s.off.bind(s),
        emit: s.emit.bind(s),
      });
    });
    const r = lt({}, yc, l);
    return (
      (s.params = lt({}, r, Jo, i)),
      (s.originalParams = lt({}, s.params)),
      (s.passedParams = lt({}, i)),
      s.params &&
        s.params.on &&
        Object.keys(s.params.on).forEach((o) => {
          s.on(o, s.params.on[o]);
        }),
      s.params && s.params.onAny && s.onAny(s.params.onAny),
      Object.assign(s, {
        enabled: s.params.enabled,
        el: n,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal() {
          return s.params.direction === "horizontal";
        },
        isVertical() {
          return s.params.direction === "vertical";
        },
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        cssOverflowAdjustment() {
          return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
        },
        allowSlideNext: s.params.allowSlideNext,
        allowSlidePrev: s.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: s.params.focusableElements,
          lastClickTime: 0,
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          pointerId: null,
          touchId: null,
        },
        allowClick: !0,
        allowTouchMove: s.params.allowTouchMove,
        touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
        imagesToLoad: [],
        imagesLoaded: 0,
      }),
      s.emit("_swiper"),
      s.params.init && s.init(),
      s
    );
  }
  getDirectionLabel(t) {
    return this.isHorizontal()
      ? t
      : {
          width: "height",
          "margin-top": "margin-left",
          "margin-bottom ": "margin-right",
          "margin-left": "margin-top",
          "margin-right": "margin-bottom",
          "padding-left": "padding-top",
          "padding-right": "padding-bottom",
          marginRight: "marginBottom",
        }[t];
  }
  getSlideIndex(t) {
    const { slidesEl: n, params: i } = this,
      a = Ut(n, `.${i.slideClass}, swiper-slide`),
      s = xr(a[0]);
    return xr(t) - s;
  }
  getSlideIndexByData(t) {
    return this.getSlideIndex(
      this.slides.find(
        (n) => n.getAttribute("data-swiper-slide-index") * 1 === t,
      ),
    );
  }
  getSlideIndexWhenGrid(t) {
    return (
      this.grid &&
        this.params.grid &&
        this.params.grid.rows > 1 &&
        (this.params.grid.fill === "column"
          ? (t = Math.floor(t / this.params.grid.rows))
          : this.params.grid.fill === "row" &&
            (t = t % Math.ceil(this.slides.length / this.params.grid.rows))),
      t
    );
  }
  recalcSlides() {
    const t = this,
      { slidesEl: n, params: i } = t;
    t.slides = Ut(n, `.${i.slideClass}, swiper-slide`);
  }
  enable() {
    const t = this;
    t.enabled ||
      ((t.enabled = !0),
      t.params.grabCursor && t.setGrabCursor(),
      t.emit("enable"));
  }
  disable() {
    const t = this;
    t.enabled &&
      ((t.enabled = !1),
      t.params.grabCursor && t.unsetGrabCursor(),
      t.emit("disable"));
  }
  setProgress(t, n) {
    const i = this;
    t = Math.min(Math.max(t, 0), 1);
    const a = i.minTranslate(),
      l = (i.maxTranslate() - a) * t + a;
    (i.translateTo(l, typeof n > "u" ? 0 : n),
      i.updateActiveIndex(),
      i.updateSlidesClasses());
  }
  emitContainerClasses() {
    const t = this;
    if (!t.params._emitClasses || !t.el) return;
    const n = t.el.className
      .split(" ")
      .filter(
        (i) =>
          i.indexOf("swiper") === 0 ||
          i.indexOf(t.params.containerModifierClass) === 0,
      );
    t.emit("_containerClasses", n.join(" "));
  }
  getSlideClasses(t) {
    const n = this;
    return n.destroyed
      ? ""
      : t.className
          .split(" ")
          .filter(
            (i) =>
              i.indexOf("swiper-slide") === 0 ||
              i.indexOf(n.params.slideClass) === 0,
          )
          .join(" ");
  }
  emitSlidesClasses() {
    const t = this;
    if (!t.params._emitClasses || !t.el) return;
    const n = [];
    (t.slides.forEach((i) => {
      const a = t.getSlideClasses(i);
      (n.push({ slideEl: i, classNames: a }), t.emit("_slideClass", i, a));
    }),
      t.emit("_slideClasses", n));
  }
  slidesPerViewDynamic(t = "current", n = !1) {
    const i = this,
      {
        params: a,
        slides: s,
        slidesGrid: l,
        slidesSizesGrid: r,
        size: o,
        activeIndex: u,
      } = i;
    let c = 1;
    if (typeof a.slidesPerView == "number") return a.slidesPerView;
    if (a.centeredSlides) {
      let f = s[u] ? Math.ceil(s[u].swiperSlideSize) : 0,
        h;
      for (let d = u + 1; d < s.length; d += 1)
        s[d] &&
          !h &&
          ((f += Math.ceil(s[d].swiperSlideSize)), (c += 1), f > o && (h = !0));
      for (let d = u - 1; d >= 0; d -= 1)
        s[d] &&
          !h &&
          ((f += s[d].swiperSlideSize), (c += 1), f > o && (h = !0));
    } else if (t === "current")
      for (let f = u + 1; f < s.length; f += 1)
        (n ? l[f] + r[f] - l[u] < o : l[f] - l[u] < o) && (c += 1);
    else for (let f = u - 1; f >= 0; f -= 1) l[u] - l[f] < o && (c += 1);
    return c;
  }
  update() {
    const t = this;
    if (!t || t.destroyed) return;
    const { snapGrid: n, params: i } = t;
    (i.breakpoints && t.setBreakpoint(),
      [...t.el.querySelectorAll('[loading="lazy"]')].forEach((l) => {
        l.complete && Ll(t, l);
      }),
      t.updateSize(),
      t.updateSlides(),
      t.updateProgress(),
      t.updateSlidesClasses());
    function a() {
      const l = t.rtlTranslate ? t.translate * -1 : t.translate,
        r = Math.min(Math.max(l, t.maxTranslate()), t.minTranslate());
      (t.setTranslate(r), t.updateActiveIndex(), t.updateSlidesClasses());
    }
    let s;
    if (i.freeMode && i.freeMode.enabled && !i.cssMode)
      (a(), i.autoHeight && t.updateAutoHeight());
    else {
      if (
        (i.slidesPerView === "auto" || i.slidesPerView > 1) &&
        t.isEnd &&
        !i.centeredSlides
      ) {
        const l = t.virtual && i.virtual.enabled ? t.virtual.slides : t.slides;
        s = t.slideTo(l.length - 1, 0, !1, !0);
      } else s = t.slideTo(t.activeIndex, 0, !1, !0);
      s || a();
    }
    (i.watchOverflow && n !== t.snapGrid && t.checkOverflow(),
      t.emit("update"));
  }
  changeDirection(t, n = !0) {
    const i = this,
      a = i.params.direction;
    return (
      t || (t = a === "horizontal" ? "vertical" : "horizontal"),
      t === a ||
        (t !== "horizontal" && t !== "vertical") ||
        (i.el.classList.remove(`${i.params.containerModifierClass}${a}`),
        i.el.classList.add(`${i.params.containerModifierClass}${t}`),
        i.emitContainerClasses(),
        (i.params.direction = t),
        i.slides.forEach((s) => {
          t === "vertical" ? (s.style.width = "") : (s.style.height = "");
        }),
        i.emit("changeDirection"),
        n && i.update()),
      i
    );
  }
  changeLanguageDirection(t) {
    const n = this;
    (n.rtl && t === "rtl") ||
      (!n.rtl && t === "ltr") ||
      ((n.rtl = t === "rtl"),
      (n.rtlTranslate = n.params.direction === "horizontal" && n.rtl),
      n.rtl
        ? (n.el.classList.add(`${n.params.containerModifierClass}rtl`),
          (n.el.dir = "rtl"))
        : (n.el.classList.remove(`${n.params.containerModifierClass}rtl`),
          (n.el.dir = "ltr")),
      n.update());
  }
  mount(t) {
    const n = this;
    if (n.mounted) return !0;
    let i = t || n.params.el;
    if ((typeof i == "string" && (i = document.querySelector(i)), !i))
      return !1;
    ((i.swiper = n),
      i.parentNode &&
        i.parentNode.host &&
        i.parentNode.host.nodeName ===
          n.params.swiperElementNodeName.toUpperCase() &&
        (n.isElement = !0));
    const a = () =>
      `.${(n.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let l =
      i && i.shadowRoot && i.shadowRoot.querySelector
        ? i.shadowRoot.querySelector(a())
        : Ut(i, a())[0];
    return (
      !l &&
        n.params.createElements &&
        ((l = js("div", n.params.wrapperClass)),
        i.append(l),
        Ut(i, `.${n.params.slideClass}`).forEach((r) => {
          l.append(r);
        })),
      Object.assign(n, {
        el: i,
        wrapperEl: l,
        slidesEl:
          n.isElement && !i.parentNode.host.slideSlots ? i.parentNode.host : l,
        hostEl: n.isElement ? i.parentNode.host : i,
        mounted: !0,
        rtl: i.dir.toLowerCase() === "rtl" || zn(i, "direction") === "rtl",
        rtlTranslate:
          n.params.direction === "horizontal" &&
          (i.dir.toLowerCase() === "rtl" || zn(i, "direction") === "rtl"),
        wrongRTL: zn(l, "display") === "-webkit-box",
      }),
      !0
    );
  }
  init(t) {
    const n = this;
    if (n.initialized || n.mount(t) === !1) return n;
    (n.emit("beforeInit"),
      n.params.breakpoints && n.setBreakpoint(),
      n.addClasses(),
      n.updateSize(),
      n.updateSlides(),
      n.params.watchOverflow && n.checkOverflow(),
      n.params.grabCursor && n.enabled && n.setGrabCursor(),
      n.params.loop && n.virtual && n.params.virtual.enabled
        ? n.slideTo(
            n.params.initialSlide + n.virtual.slidesBefore,
            0,
            n.params.runCallbacksOnInit,
            !1,
            !0,
          )
        : n.slideTo(
            n.params.initialSlide,
            0,
            n.params.runCallbacksOnInit,
            !1,
            !0,
          ),
      n.params.loop && n.loopCreate(void 0, !0),
      n.attachEvents());
    const a = [...n.el.querySelectorAll('[loading="lazy"]')];
    return (
      n.isElement && a.push(...n.hostEl.querySelectorAll('[loading="lazy"]')),
      a.forEach((s) => {
        s.complete
          ? Ll(n, s)
          : s.addEventListener("load", (l) => {
              Ll(n, l.target);
            });
      }),
      vc(n),
      (n.initialized = !0),
      vc(n),
      n.emit("init"),
      n.emit("afterInit"),
      n
    );
  }
  destroy(t = !0, n = !0) {
    const i = this,
      { params: a, el: s, wrapperEl: l, slides: r } = i;
    return (
      typeof i.params > "u" ||
        i.destroyed ||
        (i.emit("beforeDestroy"),
        (i.initialized = !1),
        i.detachEvents(),
        a.loop && i.loopDestroy(),
        n &&
          (i.removeClasses(),
          s && typeof s != "string" && s.removeAttribute("style"),
          l && l.removeAttribute("style"),
          r &&
            r.length &&
            r.forEach((o) => {
              (o.classList.remove(
                a.slideVisibleClass,
                a.slideFullyVisibleClass,
                a.slideActiveClass,
                a.slideNextClass,
                a.slidePrevClass,
              ),
                o.removeAttribute("style"),
                o.removeAttribute("data-swiper-slide-index"));
            })),
        i.emit("destroy"),
        Object.keys(i.eventsListeners).forEach((o) => {
          i.off(o);
        }),
        t !== !1 &&
          (i.el && typeof i.el != "string" && (i.el.swiper = null), vE(i)),
        (i.destroyed = !0)),
      null
    );
  }
  static extendDefaults(t) {
    lt(Jo, t);
  }
  static get extendedDefaults() {
    return Jo;
  }
  static get defaults() {
    return yc;
  }
  static installModule(t) {
    Jt.prototype.__modules__ || (Jt.prototype.__modules__ = []);
    const n = Jt.prototype.__modules__;
    typeof t == "function" && n.indexOf(t) < 0 && n.push(t);
  }
  static use(t) {
    return Array.isArray(t)
      ? (t.forEach((n) => Jt.installModule(n)), Jt)
      : (Jt.installModule(t), Jt);
  }
};
Object.keys(Io).forEach((e) => {
  Object.keys(Io[e]).forEach((t) => {
    id.prototype[t] = Io[e][t];
  });
});
id.use([OE, DE]);
const i1 = [
  "eventsPrefix",
  "injectStyles",
  "injectStylesUrls",
  "modules",
  "init",
  "_direction",
  "oneWayMovement",
  "swiperElementNodeName",
  "touchEventsTarget",
  "initialSlide",
  "_speed",
  "cssMode",
  "updateOnWindowResize",
  "resizeObserver",
  "nested",
  "focusableElements",
  "_enabled",
  "_width",
  "_height",
  "preventInteractionOnTransition",
  "userAgent",
  "url",
  "_edgeSwipeDetection",
  "_edgeSwipeThreshold",
  "_freeMode",
  "_autoHeight",
  "setWrapperSize",
  "virtualTranslate",
  "_effect",
  "breakpoints",
  "breakpointsBase",
  "_spaceBetween",
  "_slidesPerView",
  "maxBackfaceHiddenSlides",
  "_grid",
  "_slidesPerGroup",
  "_slidesPerGroupSkip",
  "_slidesPerGroupAuto",
  "_centeredSlides",
  "_centeredSlidesBounds",
  "_slidesOffsetBefore",
  "_slidesOffsetAfter",
  "normalizeSlideIndex",
  "_centerInsufficientSlides",
  "_watchOverflow",
  "roundLengths",
  "touchRatio",
  "touchAngle",
  "simulateTouch",
  "_shortSwipes",
  "_longSwipes",
  "longSwipesRatio",
  "longSwipesMs",
  "_followFinger",
  "allowTouchMove",
  "_threshold",
  "touchMoveStopPropagation",
  "touchStartPreventDefault",
  "touchStartForcePreventDefault",
  "touchReleaseOnEdges",
  "uniqueNavElements",
  "_resistance",
  "_resistanceRatio",
  "_watchSlidesProgress",
  "_grabCursor",
  "preventClicks",
  "preventClicksPropagation",
  "_slideToClickedSlide",
  "_loop",
  "loopAdditionalSlides",
  "loopAddBlankSlides",
  "loopPreventsSliding",
  "_rewind",
  "_allowSlidePrev",
  "_allowSlideNext",
  "_swipeHandler",
  "_noSwiping",
  "noSwipingClass",
  "noSwipingSelector",
  "passiveListeners",
  "containerModifierClass",
  "slideClass",
  "slideActiveClass",
  "slideVisibleClass",
  "slideFullyVisibleClass",
  "slideNextClass",
  "slidePrevClass",
  "slideBlankClass",
  "wrapperClass",
  "lazyPreloaderClass",
  "lazyPreloadPrevNext",
  "runCallbacksOnInit",
  "observer",
  "observeParents",
  "observeSlideChildren",
  "a11y",
  "_autoplay",
  "_controller",
  "coverflowEffect",
  "cubeEffect",
  "fadeEffect",
  "flipEffect",
  "creativeEffect",
  "cardsEffect",
  "hashNavigation",
  "history",
  "keyboard",
  "mousewheel",
  "_navigation",
  "_pagination",
  "parallax",
  "_scrollbar",
  "_thumbs",
  "virtual",
  "zoom",
  "control",
];
function xi(e) {
  return (
    typeof e == "object" &&
    e !== null &&
    e.constructor &&
    Object.prototype.toString.call(e).slice(8, -1) === "Object" &&
    !e.__swiper__
  );
}
function ta(e, t) {
  const n = ["__proto__", "constructor", "prototype"];
  Object.keys(t)
    .filter((i) => n.indexOf(i) < 0)
    .forEach((i) => {
      typeof e[i] > "u"
        ? (e[i] = t[i])
        : xi(t[i]) && xi(e[i]) && Object.keys(t[i]).length > 0
          ? t[i].__swiper__
            ? (e[i] = t[i])
            : ta(e[i], t[i])
          : (e[i] = t[i]);
    });
}
function a1(e = {}) {
  return (
    e.navigation &&
    typeof e.navigation.nextEl > "u" &&
    typeof e.navigation.prevEl > "u"
  );
}
function s1(e = {}) {
  return e.pagination && typeof e.pagination.el > "u";
}
function l1(e = {}) {
  return e.scrollbar && typeof e.scrollbar.el > "u";
}
function r1(e = "") {
  const t = e
      .split(" ")
      .map((i) => i.trim())
      .filter((i) => !!i),
    n = [];
  return (
    t.forEach((i) => {
      n.indexOf(i) < 0 && n.push(i);
    }),
    n.join(" ")
  );
}
function R4(e = "") {
  return e
    ? e.includes("swiper-wrapper")
      ? e
      : `swiper-wrapper ${e}`
    : "swiper-wrapper";
}
function B4({
  swiper: e,
  slides: t,
  passedParams: n,
  changedParams: i,
  nextEl: a,
  prevEl: s,
  scrollbarEl: l,
  paginationEl: r,
}) {
  const o = i.filter(
      (S) => S !== "children" && S !== "direction" && S !== "wrapperClass",
    ),
    {
      params: u,
      pagination: c,
      navigation: f,
      scrollbar: h,
      virtual: d,
      thumbs: y,
    } = e;
  let x, T, m, p, v, b, w, M;
  (i.includes("thumbs") &&
    n.thumbs &&
    n.thumbs.swiper &&
    !n.thumbs.swiper.destroyed &&
    u.thumbs &&
    (!u.thumbs.swiper || u.thumbs.swiper.destroyed) &&
    (x = !0),
    i.includes("controller") &&
      n.controller &&
      n.controller.control &&
      u.controller &&
      !u.controller.control &&
      (T = !0),
    i.includes("pagination") &&
      n.pagination &&
      (n.pagination.el || r) &&
      (u.pagination || u.pagination === !1) &&
      c &&
      !c.el &&
      (m = !0),
    i.includes("scrollbar") &&
      n.scrollbar &&
      (n.scrollbar.el || l) &&
      (u.scrollbar || u.scrollbar === !1) &&
      h &&
      !h.el &&
      (p = !0),
    i.includes("navigation") &&
      n.navigation &&
      (n.navigation.prevEl || s) &&
      (n.navigation.nextEl || a) &&
      (u.navigation || u.navigation === !1) &&
      f &&
      !f.prevEl &&
      !f.nextEl &&
      (v = !0));
  const E = (S) => {
    e[S] &&
      (e[S].destroy(),
      S === "navigation"
        ? (e.isElement && (e[S].prevEl.remove(), e[S].nextEl.remove()),
          (u[S].prevEl = void 0),
          (u[S].nextEl = void 0),
          (e[S].prevEl = void 0),
          (e[S].nextEl = void 0))
        : (e.isElement && e[S].el.remove(),
          (u[S].el = void 0),
          (e[S].el = void 0)));
  };
  (i.includes("loop") &&
    e.isElement &&
    (u.loop && !n.loop ? (b = !0) : !u.loop && n.loop ? (w = !0) : (M = !0)),
    o.forEach((S) => {
      if (xi(u[S]) && xi(n[S]))
        (Object.assign(u[S], n[S]),
          (S === "navigation" || S === "pagination" || S === "scrollbar") &&
            "enabled" in n[S] &&
            !n[S].enabled &&
            E(S));
      else {
        const O = n[S];
        (O === !0 || O === !1) &&
        (S === "navigation" || S === "pagination" || S === "scrollbar")
          ? O === !1 && E(S)
          : (u[S] = n[S]);
      }
    }),
    o.includes("controller") &&
      !T &&
      e.controller &&
      e.controller.control &&
      u.controller &&
      u.controller.control &&
      (e.controller.control = u.controller.control),
    i.includes("children") && t && d && u.virtual.enabled
      ? ((d.slides = t), d.update(!0))
      : i.includes("virtual") &&
        d &&
        u.virtual.enabled &&
        (t && (d.slides = t), d.update(!0)),
    i.includes("children") && t && u.loop && (M = !0),
    x && y.init() && y.update(!0),
    T && (e.controller.control = u.controller.control),
    m &&
      (e.isElement &&
        (!r || typeof r == "string") &&
        ((r = document.createElement("div")),
        r.classList.add("swiper-pagination"),
        r.part.add("pagination"),
        e.el.appendChild(r)),
      r && (u.pagination.el = r),
      c.init(),
      c.render(),
      c.update()),
    p &&
      (e.isElement &&
        (!l || typeof l == "string") &&
        ((l = document.createElement("div")),
        l.classList.add("swiper-scrollbar"),
        l.part.add("scrollbar"),
        e.el.appendChild(l)),
      l && (u.scrollbar.el = l),
      h.init(),
      h.updateSize(),
      h.setTranslate()),
    v &&
      (e.isElement &&
        ((!a || typeof a == "string") &&
          ((a = document.createElement("div")),
          a.classList.add("swiper-button-next"),
          Ns(a, e.navigation.arrowSvg),
          a.part.add("button-next"),
          e.el.appendChild(a)),
        (!s || typeof s == "string") &&
          ((s = document.createElement("div")),
          s.classList.add("swiper-button-prev"),
          Ns(s, e.navigation.arrowSvg),
          s.part.add("button-prev"),
          e.el.appendChild(s))),
      a && (u.navigation.nextEl = a),
      s && (u.navigation.prevEl = s),
      f.init(),
      f.update()),
    i.includes("allowSlideNext") && (e.allowSlideNext = n.allowSlideNext),
    i.includes("allowSlidePrev") && (e.allowSlidePrev = n.allowSlidePrev),
    i.includes("direction") && e.changeDirection(n.direction, !1),
    (b || M) && e.loopDestroy(),
    (w || M) && e.loopCreate(),
    e.update());
}
function H4(e = {}, t = !0) {
  const n = { on: {} },
    i = {},
    a = {};
  (ta(n, yc), (n._emitClasses = !0), (n.init = !1));
  const s = {},
    l = i1.map((o) => o.replace(/_/, "")),
    r = Object.assign({}, e);
  return (
    Object.keys(r).forEach((o) => {
      typeof e[o] > "u" ||
        (l.indexOf(o) >= 0
          ? xi(e[o])
            ? ((n[o] = {}), (a[o] = {}), ta(n[o], e[o]), ta(a[o], e[o]))
            : ((n[o] = e[o]), (a[o] = e[o]))
          : o.search(/on[A-Z]/) === 0 && typeof e[o] == "function"
            ? t
              ? (i[`${o[2].toLowerCase()}${o.substr(3)}`] = e[o])
              : (n.on[`${o[2].toLowerCase()}${o.substr(3)}`] = e[o])
            : (s[o] = e[o]));
    }),
    ["navigation", "pagination", "scrollbar"].forEach((o) => {
      (n[o] === !0 && (n[o] = {}), n[o] === !1 && delete n[o]);
    }),
    { params: n, passedParams: a, rest: s, events: i }
  );
}
function U4(
  { el: e, nextEl: t, prevEl: n, paginationEl: i, scrollbarEl: a, swiper: s },
  l,
) {
  (a1(l) &&
    t &&
    n &&
    ((s.params.navigation.nextEl = t),
    (s.originalParams.navigation.nextEl = t),
    (s.params.navigation.prevEl = n),
    (s.originalParams.navigation.prevEl = n)),
    s1(l) &&
      i &&
      ((s.params.pagination.el = i), (s.originalParams.pagination.el = i)),
    l1(l) &&
      a &&
      ((s.params.scrollbar.el = a), (s.originalParams.scrollbar.el = a)),
    s.init(e));
}
function G4(e, t, n, i, a) {
  const s = [];
  if (!t) return s;
  const l = (o) => {
    s.indexOf(o) < 0 && s.push(o);
  };
  if (n && i) {
    const o = i.map(a),
      u = n.map(a);
    (o.join("") !== u.join("") && l("children"),
      i.length !== n.length && l("children"));
  }
  return (
    i1
      .filter((o) => o[0] === "_")
      .map((o) => o.replace(/_/, ""))
      .forEach((o) => {
        if (o in e && o in t)
          if (xi(e[o]) && xi(t[o])) {
            const u = Object.keys(e[o]),
              c = Object.keys(t[o]);
            u.length !== c.length
              ? l(o)
              : (u.forEach((f) => {
                  e[o][f] !== t[o][f] && l(o);
                }),
                c.forEach((f) => {
                  e[o][f] !== t[o][f] && l(o);
                }));
          } else e[o] !== t[o] && l(o);
      }),
    s
  );
}
const q4 = (e) => {
  !e ||
    e.destroyed ||
    !e.params.virtual ||
    (e.params.virtual && !e.params.virtual.enabled) ||
    (e.updateSlides(),
    e.updateProgress(),
    e.updateSlidesClasses(),
    e.emit("_virtualUpdated"),
    e.parallax &&
      e.params.parallax &&
      e.params.parallax.enabled &&
      e.parallax.setTranslate());
};
function br() {
  return (
    (br = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var i in n)
              Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
          }
          return e;
        }),
    br.apply(this, arguments)
  );
}
function o1(e) {
  return (
    e.type && e.type.displayName && e.type.displayName.includes("SwiperSlide")
  );
}
function u1(e) {
  const t = [];
  return (
    ie.Children.toArray(e).forEach((n) => {
      o1(n)
        ? t.push(n)
        : n.props &&
          n.props.children &&
          u1(n.props.children).forEach((i) => t.push(i));
    }),
    t
  );
}
function Y4(e) {
  const t = [],
    n = {
      "container-start": [],
      "container-end": [],
      "wrapper-start": [],
      "wrapper-end": [],
    };
  return (
    ie.Children.toArray(e).forEach((i) => {
      if (o1(i)) t.push(i);
      else if (i.props && i.props.slot && n[i.props.slot])
        n[i.props.slot].push(i);
      else if (i.props && i.props.children) {
        const a = u1(i.props.children);
        a.length > 0 ? a.forEach((s) => t.push(s)) : n["container-end"].push(i);
      } else n["container-end"].push(i);
    }),
    { slides: t, slots: n }
  );
}
function X4(e, t, n) {
  if (!n) return null;
  const i = (c) => {
      let f = c;
      return (
        c < 0 ? (f = t.length + c) : f >= t.length && (f = f - t.length),
        f
      );
    },
    a = e.isHorizontal()
      ? { [e.rtlTranslate ? "right" : "left"]: `${n.offset}px` }
      : { top: `${n.offset}px` },
    { from: s, to: l } = n,
    r = e.params.loop ? -t.length : 0,
    o = e.params.loop ? t.length * 2 : t.length,
    u = [];
  for (let c = r; c < o; c += 1) c >= s && c <= l && u.push(t[i(c)]);
  return u.map((c, f) =>
    ie.cloneElement(c, {
      swiper: e,
      style: a,
      key: c.props.virtualIndex || c.key || `slide-${f}`,
    }),
  );
}
function rs(e, t) {
  return typeof window > "u" ? L.useEffect(e, t) : L.useLayoutEffect(e, t);
}
const ap = L.createContext(null),
  k4 = L.createContext(null),
  Pr = L.forwardRef(
    (
      {
        className: e,
        tag: t = "div",
        wrapperTag: n = "div",
        children: i,
        onSwiper: a,
        ...s
      } = {},
      l,
    ) => {
      let r = !1;
      const [o, u] = L.useState("swiper"),
        [c, f] = L.useState(null),
        [h, d] = L.useState(!1),
        y = L.useRef(!1),
        x = L.useRef(null),
        T = L.useRef(null),
        m = L.useRef(null),
        p = L.useRef(null),
        v = L.useRef(null),
        b = L.useRef(null),
        w = L.useRef(null),
        M = L.useRef(null),
        { params: E, passedParams: S, rest: O, events: C } = H4(s),
        { slides: A, slots: j } = Y4(i),
        _ = () => {
          d(!h);
        };
      Object.assign(E.on, {
        _containerClasses(N, B) {
          u(B);
        },
      });
      const R = () => {
        (Object.assign(E.on, C), (r = !0));
        const N = { ...E };
        if (
          (delete N.wrapperClass,
          (T.current = new id(N)),
          T.current.virtual && T.current.params.virtual.enabled)
        ) {
          T.current.virtual.slides = A;
          const B = {
            cache: !1,
            slides: A,
            renderExternal: f,
            renderExternalUpdate: !1,
          };
          (ta(T.current.params.virtual, B),
            ta(T.current.originalParams.virtual, B));
        }
      };
      (x.current || R(), T.current && T.current.on("_beforeBreakpoint", _));
      const Y = () => {
          r ||
            !C ||
            !T.current ||
            Object.keys(C).forEach((N) => {
              T.current.on(N, C[N]);
            });
        },
        V = () => {
          !C ||
            !T.current ||
            Object.keys(C).forEach((N) => {
              T.current.off(N, C[N]);
            });
        };
      (L.useEffect(() => () => {
        T.current && T.current.off("_beforeBreakpoint", _);
      }),
        L.useEffect(() => {
          !y.current &&
            T.current &&
            (T.current.emitSlidesClasses(), (y.current = !0));
        }),
        rs(() => {
          if ((l && (l.current = x.current), !!x.current))
            return (
              T.current.destroyed && R(),
              U4(
                {
                  el: x.current,
                  nextEl: v.current,
                  prevEl: b.current,
                  paginationEl: w.current,
                  scrollbarEl: M.current,
                  swiper: T.current,
                },
                E,
              ),
              a && !T.current.destroyed && a(T.current),
              () => {
                T.current && !T.current.destroyed && T.current.destroy(!0, !1);
              }
            );
        }, []),
        rs(() => {
          Y();
          const N = G4(S, m.current, A, p.current, (B) => B.key);
          return (
            (m.current = S),
            (p.current = A),
            N.length &&
              T.current &&
              !T.current.destroyed &&
              B4({
                swiper: T.current,
                slides: A,
                passedParams: S,
                changedParams: N,
                nextEl: v.current,
                prevEl: b.current,
                scrollbarEl: M.current,
                paginationEl: w.current,
              }),
            () => {
              V();
            }
          );
        }),
        rs(() => {
          q4(T.current);
        }, [c]));
      function z() {
        return E.virtual
          ? X4(T.current, A, c)
          : A.map((N, B) =>
              ie.cloneElement(N, { swiper: T.current, swiperSlideIndex: B }),
            );
      }
      return ie.createElement(
        t,
        br({ ref: x, className: r1(`${o}${e ? ` ${e}` : ""}`) }, O),
        ie.createElement(
          k4.Provider,
          { value: T.current },
          j["container-start"],
          ie.createElement(
            n,
            { className: R4(E.wrapperClass) },
            j["wrapper-start"],
            z(),
            j["wrapper-end"],
          ),
          a1(E) &&
            ie.createElement(
              ie.Fragment,
              null,
              ie.createElement("div", {
                ref: b,
                className: "swiper-button-prev",
              }),
              ie.createElement("div", {
                ref: v,
                className: "swiper-button-next",
              }),
            ),
          l1(E) &&
            ie.createElement("div", { ref: M, className: "swiper-scrollbar" }),
          s1(E) &&
            ie.createElement("div", { ref: w, className: "swiper-pagination" }),
          j["container-end"],
        ),
      );
    },
  );
Pr.displayName = "Swiper";
const Qr = L.forwardRef(
  (
    {
      tag: e = "div",
      children: t,
      className: n = "",
      swiper: i,
      zoom: a,
      lazy: s,
      virtualIndex: l,
      swiperSlideIndex: r,
      ...o
    } = {},
    u,
  ) => {
    const c = L.useRef(null),
      [f, h] = L.useState("swiper-slide"),
      [d, y] = L.useState(!1);
    function x(v, b, w) {
      b === c.current && h(w);
    }
    (rs(() => {
      if (
        (typeof r < "u" && (c.current.swiperSlideIndex = r),
        u && (u.current = c.current),
        !(!c.current || !i))
      ) {
        if (i.destroyed) {
          f !== "swiper-slide" && h("swiper-slide");
          return;
        }
        return (
          i.on("_slideClass", x),
          () => {
            i && i.off("_slideClass", x);
          }
        );
      }
    }),
      rs(() => {
        i && c.current && !i.destroyed && h(i.getSlideClasses(c.current));
      }, [i]));
    const T = {
        isActive: f.indexOf("swiper-slide-active") >= 0,
        isVisible: f.indexOf("swiper-slide-visible") >= 0,
        isPrev: f.indexOf("swiper-slide-prev") >= 0,
        isNext: f.indexOf("swiper-slide-next") >= 0,
      },
      m = () => (typeof t == "function" ? t(T) : t),
      p = () => {
        y(!0);
      };
    return ie.createElement(
      e,
      br(
        {
          ref: c,
          className: r1(`${f}${n ? ` ${n}` : ""}`),
          "data-swiper-slide-index": l,
          onLoad: p,
        },
        o,
      ),
      a &&
        ie.createElement(
          ap.Provider,
          { value: T },
          ie.createElement(
            "div",
            {
              className: "swiper-zoom-container",
              "data-swiper-zoom": typeof a == "number" ? a : void 0,
            },
            m(),
            s &&
              !d &&
              ie.createElement("div", { className: "swiper-lazy-preloader" }),
          ),
        ),
      !a &&
        ie.createElement(
          ap.Provider,
          { value: T },
          m(),
          s &&
            !d &&
            ie.createElement("div", { className: "swiper-lazy-preloader" }),
        ),
    );
  },
);
Qr.displayName = "SwiperSlide";
function c1(e, t, n, i) {
  return (
    e.params.createElements &&
      Object.keys(i).forEach((a) => {
        if (!n[a] && n.auto === !0) {
          let s = Ut(e.el, `.${i[a]}`)[0];
          (s || ((s = js("div", i[a])), (s.className = i[a]), e.el.append(s)),
            (n[a] = s),
            (t[a] = s));
        }
      }),
    n
  );
}
const sp =
  '<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>';
function P4({ swiper: e, extendParams: t, on: n, emit: i }) {
  (t({
    navigation: {
      nextEl: null,
      prevEl: null,
      addIcons: !0,
      hideOnClick: !1,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled",
    },
  }),
    (e.navigation = { nextEl: null, prevEl: null, arrowSvg: sp }));
  function a(d) {
    let y;
    return d &&
      typeof d == "string" &&
      e.isElement &&
      ((y = e.el.querySelector(d) || e.hostEl.querySelector(d)), y)
      ? y
      : (d &&
          (typeof d == "string" && (y = [...document.querySelectorAll(d)]),
          e.params.uniqueNavElements &&
          typeof d == "string" &&
          y &&
          y.length > 1 &&
          e.el.querySelectorAll(d).length === 1
            ? (y = e.el.querySelector(d))
            : y && y.length === 1 && (y = y[0])),
        d && !y ? d : y);
  }
  function s(d, y) {
    const x = e.params.navigation;
    ((d = Ne(d)),
      d.forEach((T) => {
        T &&
          (T.classList[y ? "add" : "remove"](...x.disabledClass.split(" ")),
          T.tagName === "BUTTON" && (T.disabled = y),
          e.params.watchOverflow &&
            e.enabled &&
            T.classList[e.isLocked ? "add" : "remove"](x.lockClass));
      }));
  }
  function l() {
    const { nextEl: d, prevEl: y } = e.navigation;
    if (e.params.loop) {
      (s(y, !1), s(d, !1));
      return;
    }
    (s(y, e.isBeginning && !e.params.rewind),
      s(d, e.isEnd && !e.params.rewind));
  }
  function r(d) {
    (d.preventDefault(),
      !(e.isBeginning && !e.params.loop && !e.params.rewind) &&
        (e.slidePrev(), i("navigationPrev")));
  }
  function o(d) {
    (d.preventDefault(),
      !(e.isEnd && !e.params.loop && !e.params.rewind) &&
        (e.slideNext(), i("navigationNext")));
  }
  function u() {
    const d = e.params.navigation;
    if (
      ((e.params.navigation = c1(
        e,
        e.originalParams.navigation,
        e.params.navigation,
        { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" },
      )),
      !(d.nextEl || d.prevEl))
    )
      return;
    let y = a(d.nextEl),
      x = a(d.prevEl);
    (Object.assign(e.navigation, { nextEl: y, prevEl: x }),
      (y = Ne(y)),
      (x = Ne(x)));
    const T = (m, p) => {
      if (m) {
        if (
          d.addIcons &&
          m.matches(".swiper-button-next,.swiper-button-prev") &&
          !m.querySelector("svg")
        ) {
          const v = document.createElement("div");
          (Ns(v, sp), m.appendChild(v.querySelector("svg")), v.remove());
        }
        m.addEventListener("click", p === "next" ? o : r);
      }
      !e.enabled && m && m.classList.add(...d.lockClass.split(" "));
    };
    (y.forEach((m) => T(m, "next")), x.forEach((m) => T(m, "prev")));
  }
  function c() {
    let { nextEl: d, prevEl: y } = e.navigation;
    ((d = Ne(d)), (y = Ne(y)));
    const x = (T, m) => {
      (T.removeEventListener("click", m === "next" ? o : r),
        T.classList.remove(...e.params.navigation.disabledClass.split(" ")));
    };
    (d.forEach((T) => x(T, "next")), y.forEach((T) => x(T, "prev")));
  }
  (n("init", () => {
    e.params.navigation.enabled === !1 ? h() : (u(), l());
  }),
    n("toEdge fromEdge lock unlock", () => {
      l();
    }),
    n("destroy", () => {
      c();
    }),
    n("enable disable", () => {
      let { nextEl: d, prevEl: y } = e.navigation;
      if (((d = Ne(d)), (y = Ne(y)), e.enabled)) {
        l();
        return;
      }
      [...d, ...y]
        .filter((x) => !!x)
        .forEach((x) => x.classList.add(e.params.navigation.lockClass));
    }),
    n("click", (d, y) => {
      let { nextEl: x, prevEl: T } = e.navigation;
      ((x = Ne(x)), (T = Ne(T)));
      const m = y.target;
      let p = T.includes(m) || x.includes(m);
      if (e.isElement && !p) {
        const v = y.path || (y.composedPath && y.composedPath());
        v && (p = v.find((b) => x.includes(b) || T.includes(b)));
      }
      if (e.params.navigation.hideOnClick && !p) {
        if (
          e.pagination &&
          e.params.pagination &&
          e.params.pagination.clickable &&
          (e.pagination.el === m || e.pagination.el.contains(m))
        )
          return;
        let v;
        (x.length
          ? (v = x[0].classList.contains(e.params.navigation.hiddenClass))
          : T.length &&
            (v = T[0].classList.contains(e.params.navigation.hiddenClass)),
          i(v === !0 ? "navigationShow" : "navigationHide"),
          [...x, ...T]
            .filter((b) => !!b)
            .forEach((b) =>
              b.classList.toggle(e.params.navigation.hiddenClass),
            ));
      }
    }));
  const f = () => {
      (e.el.classList.remove(
        ...e.params.navigation.navigationDisabledClass.split(" "),
      ),
        u(),
        l());
    },
    h = () => {
      (e.el.classList.add(
        ...e.params.navigation.navigationDisabledClass.split(" "),
      ),
        c());
    };
  Object.assign(e.navigation, {
    enable: f,
    disable: h,
    update: l,
    init: u,
    destroy: c,
  });
}
function _a(e = "") {
  return `.${e
    .trim()
    .replace(/([\.:!+\/()[\]])/g, "\\$1")
    .replace(/ /g, ".")}`;
}
function ad({ swiper: e, extendParams: t, on: n, emit: i }) {
  const a = "swiper-pagination";
  (t({
    pagination: {
      el: null,
      bulletElement: "span",
      clickable: !1,
      hideOnClick: !1,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: !1,
      type: "bullets",
      dynamicBullets: !1,
      dynamicMainBullets: 1,
      formatFractionCurrent: (m) => m,
      formatFractionTotal: (m) => m,
      bulletClass: `${a}-bullet`,
      bulletActiveClass: `${a}-bullet-active`,
      modifierClass: `${a}-`,
      currentClass: `${a}-current`,
      totalClass: `${a}-total`,
      hiddenClass: `${a}-hidden`,
      progressbarFillClass: `${a}-progressbar-fill`,
      progressbarOppositeClass: `${a}-progressbar-opposite`,
      clickableClass: `${a}-clickable`,
      lockClass: `${a}-lock`,
      horizontalClass: `${a}-horizontal`,
      verticalClass: `${a}-vertical`,
      paginationDisabledClass: `${a}-disabled`,
    },
  }),
    (e.pagination = { el: null, bullets: [] }));
  let s,
    l = 0;
  function r() {
    return (
      !e.params.pagination.el ||
      !e.pagination.el ||
      (Array.isArray(e.pagination.el) && e.pagination.el.length === 0)
    );
  }
  function o(m, p) {
    const { bulletActiveClass: v } = e.params.pagination;
    m &&
      ((m = m[`${p === "prev" ? "previous" : "next"}ElementSibling`]),
      m &&
        (m.classList.add(`${v}-${p}`),
        (m = m[`${p === "prev" ? "previous" : "next"}ElementSibling`]),
        m && m.classList.add(`${v}-${p}-${p}`)));
  }
  function u(m, p, v) {
    if (((m = m % v), (p = p % v), p === m + 1)) return "next";
    if (p === m - 1) return "previous";
  }
  function c(m) {
    const p = m.target.closest(_a(e.params.pagination.bulletClass));
    if (!p) return;
    m.preventDefault();
    const v = xr(p) * e.params.slidesPerGroup;
    if (e.params.loop) {
      if (e.realIndex === v) return;
      const b = u(e.realIndex, v, e.slides.length);
      b === "next"
        ? e.slideNext()
        : b === "previous"
          ? e.slidePrev()
          : e.slideToLoop(v);
    } else e.slideTo(v);
  }
  function f() {
    const m = e.rtl,
      p = e.params.pagination;
    if (r()) return;
    let v = e.pagination.el;
    v = Ne(v);
    let b, w;
    const M =
        e.virtual && e.params.virtual.enabled
          ? e.virtual.slides.length
          : e.slides.length,
      E = e.params.loop
        ? Math.ceil(M / e.params.slidesPerGroup)
        : e.snapGrid.length;
    if (
      (e.params.loop
        ? ((w = e.previousRealIndex || 0),
          (b =
            e.params.slidesPerGroup > 1
              ? Math.floor(e.realIndex / e.params.slidesPerGroup)
              : e.realIndex))
        : typeof e.snapIndex < "u"
          ? ((b = e.snapIndex), (w = e.previousSnapIndex))
          : ((w = e.previousIndex || 0), (b = e.activeIndex || 0)),
      p.type === "bullets" &&
        e.pagination.bullets &&
        e.pagination.bullets.length > 0)
    ) {
      const S = e.pagination.bullets;
      let O, C, A;
      if (
        (p.dynamicBullets &&
          ((s = gc(S[0], e.isHorizontal() ? "width" : "height")),
          v.forEach((j) => {
            j.style[e.isHorizontal() ? "width" : "height"] =
              `${s * (p.dynamicMainBullets + 4)}px`;
          }),
          p.dynamicMainBullets > 1 &&
            w !== void 0 &&
            ((l += b - (w || 0)),
            l > p.dynamicMainBullets - 1
              ? (l = p.dynamicMainBullets - 1)
              : l < 0 && (l = 0)),
          (O = Math.max(b - l, 0)),
          (C = O + (Math.min(S.length, p.dynamicMainBullets) - 1)),
          (A = (C + O) / 2)),
        S.forEach((j) => {
          const _ = [
            ...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(
              (R) => `${p.bulletActiveClass}${R}`,
            ),
          ]
            .map((R) =>
              typeof R == "string" && R.includes(" ") ? R.split(" ") : R,
            )
            .flat();
          j.classList.remove(..._);
        }),
        v.length > 1)
      )
        S.forEach((j) => {
          const _ = xr(j);
          (_ === b
            ? j.classList.add(...p.bulletActiveClass.split(" "))
            : e.isElement && j.setAttribute("part", "bullet"),
            p.dynamicBullets &&
              (_ >= O &&
                _ <= C &&
                j.classList.add(...`${p.bulletActiveClass}-main`.split(" ")),
              _ === O && o(j, "prev"),
              _ === C && o(j, "next")));
        });
      else {
        const j = S[b];
        if (
          (j && j.classList.add(...p.bulletActiveClass.split(" ")),
          e.isElement &&
            S.forEach((_, R) => {
              _.setAttribute("part", R === b ? "bullet-active" : "bullet");
            }),
          p.dynamicBullets)
        ) {
          const _ = S[O],
            R = S[C];
          for (let Y = O; Y <= C; Y += 1)
            S[Y] &&
              S[Y].classList.add(...`${p.bulletActiveClass}-main`.split(" "));
          (o(_, "prev"), o(R, "next"));
        }
      }
      if (p.dynamicBullets) {
        const j = Math.min(S.length, p.dynamicMainBullets + 4),
          _ = (s * j - s) / 2 - A * s,
          R = m ? "right" : "left";
        S.forEach((Y) => {
          Y.style[e.isHorizontal() ? R : "top"] = `${_}px`;
        });
      }
    }
    v.forEach((S, O) => {
      if (
        (p.type === "fraction" &&
          (S.querySelectorAll(_a(p.currentClass)).forEach((C) => {
            C.textContent = p.formatFractionCurrent(b + 1);
          }),
          S.querySelectorAll(_a(p.totalClass)).forEach((C) => {
            C.textContent = p.formatFractionTotal(E);
          })),
        p.type === "progressbar")
      ) {
        let C;
        p.progressbarOpposite
          ? (C = e.isHorizontal() ? "vertical" : "horizontal")
          : (C = e.isHorizontal() ? "horizontal" : "vertical");
        const A = (b + 1) / E;
        let j = 1,
          _ = 1;
        (C === "horizontal" ? (j = A) : (_ = A),
          S.querySelectorAll(_a(p.progressbarFillClass)).forEach((R) => {
            ((R.style.transform = `translate3d(0,0,0) scaleX(${j}) scaleY(${_})`),
              (R.style.transitionDuration = `${e.params.speed}ms`));
          }));
      }
      (p.type === "custom" && p.renderCustom
        ? (Ns(S, p.renderCustom(e, b + 1, E)),
          O === 0 && i("paginationRender", S))
        : (O === 0 && i("paginationRender", S), i("paginationUpdate", S)),
        e.params.watchOverflow &&
          e.enabled &&
          S.classList[e.isLocked ? "add" : "remove"](p.lockClass));
    });
  }
  function h() {
    const m = e.params.pagination;
    if (r()) return;
    const p =
      e.virtual && e.params.virtual.enabled
        ? e.virtual.slides.length
        : e.grid && e.params.grid.rows > 1
          ? e.slides.length / Math.ceil(e.params.grid.rows)
          : e.slides.length;
    let v = e.pagination.el;
    v = Ne(v);
    let b = "";
    if (m.type === "bullets") {
      let w = e.params.loop
        ? Math.ceil(p / e.params.slidesPerGroup)
        : e.snapGrid.length;
      e.params.freeMode && e.params.freeMode.enabled && w > p && (w = p);
      for (let M = 0; M < w; M += 1)
        m.renderBullet
          ? (b += m.renderBullet.call(e, M, m.bulletClass))
          : (b += `<${m.bulletElement} ${e.isElement ? 'part="bullet"' : ""} class="${m.bulletClass}"></${m.bulletElement}>`);
    }
    (m.type === "fraction" &&
      (m.renderFraction
        ? (b = m.renderFraction.call(e, m.currentClass, m.totalClass))
        : (b = `<span class="${m.currentClass}"></span> / <span class="${m.totalClass}"></span>`)),
      m.type === "progressbar" &&
        (m.renderProgressbar
          ? (b = m.renderProgressbar.call(e, m.progressbarFillClass))
          : (b = `<span class="${m.progressbarFillClass}"></span>`)),
      (e.pagination.bullets = []),
      v.forEach((w) => {
        (m.type !== "custom" && Ns(w, b || ""),
          m.type === "bullets" &&
            e.pagination.bullets.push(
              ...w.querySelectorAll(_a(m.bulletClass)),
            ));
      }),
      m.type !== "custom" && i("paginationRender", v[0]));
  }
  function d() {
    e.params.pagination = c1(
      e,
      e.originalParams.pagination,
      e.params.pagination,
      { el: "swiper-pagination" },
    );
    const m = e.params.pagination;
    if (!m.el) return;
    let p;
    (typeof m.el == "string" && e.isElement && (p = e.el.querySelector(m.el)),
      !p &&
        typeof m.el == "string" &&
        (p = [...document.querySelectorAll(m.el)]),
      p || (p = m.el),
      !(!p || p.length === 0) &&
        (e.params.uniqueNavElements &&
          typeof m.el == "string" &&
          Array.isArray(p) &&
          p.length > 1 &&
          ((p = [...e.el.querySelectorAll(m.el)]),
          p.length > 1 && (p = p.find((v) => Iy(v, ".swiper")[0] === e.el))),
        Array.isArray(p) && p.length === 1 && (p = p[0]),
        Object.assign(e.pagination, { el: p }),
        (p = Ne(p)),
        p.forEach((v) => {
          (m.type === "bullets" &&
            m.clickable &&
            v.classList.add(...(m.clickableClass || "").split(" ")),
            v.classList.add(m.modifierClass + m.type),
            v.classList.add(
              e.isHorizontal() ? m.horizontalClass : m.verticalClass,
            ),
            m.type === "bullets" &&
              m.dynamicBullets &&
              (v.classList.add(`${m.modifierClass}${m.type}-dynamic`),
              (l = 0),
              m.dynamicMainBullets < 1 && (m.dynamicMainBullets = 1)),
            m.type === "progressbar" &&
              m.progressbarOpposite &&
              v.classList.add(m.progressbarOppositeClass),
            m.clickable && v.addEventListener("click", c),
            e.enabled || v.classList.add(m.lockClass));
        })));
  }
  function y() {
    const m = e.params.pagination;
    if (r()) return;
    let p = e.pagination.el;
    (p &&
      ((p = Ne(p)),
      p.forEach((v) => {
        (v.classList.remove(m.hiddenClass),
          v.classList.remove(m.modifierClass + m.type),
          v.classList.remove(
            e.isHorizontal() ? m.horizontalClass : m.verticalClass,
          ),
          m.clickable &&
            (v.classList.remove(...(m.clickableClass || "").split(" ")),
            v.removeEventListener("click", c)));
      })),
      e.pagination.bullets &&
        e.pagination.bullets.forEach((v) =>
          v.classList.remove(...m.bulletActiveClass.split(" ")),
        ));
  }
  (n("changeDirection", () => {
    if (!e.pagination || !e.pagination.el) return;
    const m = e.params.pagination;
    let { el: p } = e.pagination;
    ((p = Ne(p)),
      p.forEach((v) => {
        (v.classList.remove(m.horizontalClass, m.verticalClass),
          v.classList.add(
            e.isHorizontal() ? m.horizontalClass : m.verticalClass,
          ));
      }));
  }),
    n("init", () => {
      e.params.pagination.enabled === !1 ? T() : (d(), h(), f());
    }),
    n("activeIndexChange", () => {
      typeof e.snapIndex > "u" && f();
    }),
    n("snapIndexChange", () => {
      f();
    }),
    n("snapGridLengthChange", () => {
      (h(), f());
    }),
    n("destroy", () => {
      y();
    }),
    n("enable disable", () => {
      let { el: m } = e.pagination;
      m &&
        ((m = Ne(m)),
        m.forEach((p) =>
          p.classList[e.enabled ? "remove" : "add"](
            e.params.pagination.lockClass,
          ),
        ));
    }),
    n("lock unlock", () => {
      f();
    }),
    n("click", (m, p) => {
      const v = p.target,
        b = Ne(e.pagination.el);
      if (
        e.params.pagination.el &&
        e.params.pagination.hideOnClick &&
        b &&
        b.length > 0 &&
        !v.classList.contains(e.params.pagination.bulletClass)
      ) {
        if (
          e.navigation &&
          ((e.navigation.nextEl && v === e.navigation.nextEl) ||
            (e.navigation.prevEl && v === e.navigation.prevEl))
        )
          return;
        const w = b[0].classList.contains(e.params.pagination.hiddenClass);
        (i(w === !0 ? "paginationShow" : "paginationHide"),
          b.forEach((M) =>
            M.classList.toggle(e.params.pagination.hiddenClass),
          ));
      }
    }));
  const x = () => {
      e.el.classList.remove(e.params.pagination.paginationDisabledClass);
      let { el: m } = e.pagination;
      (m &&
        ((m = Ne(m)),
        m.forEach((p) =>
          p.classList.remove(e.params.pagination.paginationDisabledClass),
        )),
        d(),
        h(),
        f());
    },
    T = () => {
      e.el.classList.add(e.params.pagination.paginationDisabledClass);
      let { el: m } = e.pagination;
      (m &&
        ((m = Ne(m)),
        m.forEach((p) =>
          p.classList.add(e.params.pagination.paginationDisabledClass),
        )),
        y());
    };
  Object.assign(e.pagination, {
    enable: x,
    disable: T,
    render: h,
    update: f,
    init: d,
    destroy: y,
  });
}
function sd({ swiper: e, extendParams: t, on: n, emit: i, params: a }) {
  ((e.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
    t({
      autoplay: {
        enabled: !1,
        delay: 3e3,
        waitForTransition: !0,
        disableOnInteraction: !1,
        stopOnLastSlide: !1,
        reverseDirection: !1,
        pauseOnMouseEnter: !1,
      },
    }));
  let s,
    l,
    r = a && a.autoplay ? a.autoplay.delay : 3e3,
    o = a && a.autoplay ? a.autoplay.delay : 3e3,
    u,
    c = new Date().getTime(),
    f,
    h,
    d,
    y,
    x,
    T,
    m;
  function p(z) {
    !e ||
      e.destroyed ||
      !e.wrapperEl ||
      (z.target === e.wrapperEl &&
        (e.wrapperEl.removeEventListener("transitionend", p),
        !(m || (z.detail && z.detail.bySwiperTouchMove)) && O()));
  }
  const v = () => {
      if (e.destroyed || !e.autoplay.running) return;
      e.autoplay.paused ? (f = !0) : f && ((o = u), (f = !1));
      const z = e.autoplay.paused ? u : c + o - new Date().getTime();
      ((e.autoplay.timeLeft = z),
        i("autoplayTimeLeft", z, z / r),
        (l = requestAnimationFrame(() => {
          v();
        })));
    },
    b = () => {
      let z;
      return (
        e.virtual && e.params.virtual.enabled
          ? (z = e.slides.find((B) =>
              B.classList.contains("swiper-slide-active"),
            ))
          : (z = e.slides[e.activeIndex]),
        z ? parseInt(z.getAttribute("data-swiper-autoplay"), 10) : void 0
      );
    },
    w = (z) => {
      if (e.destroyed || !e.autoplay.running) return;
      (cancelAnimationFrame(l), v());
      let N = typeof z > "u" ? e.params.autoplay.delay : z;
      ((r = e.params.autoplay.delay), (o = e.params.autoplay.delay));
      const B = b();
      (!Number.isNaN(B) &&
        B > 0 &&
        typeof z > "u" &&
        ((N = B), (r = B), (o = B)),
        (u = N));
      const U = e.params.speed,
        he = () => {
          !e ||
            e.destroyed ||
            (e.params.autoplay.reverseDirection
              ? !e.isBeginning || e.params.loop || e.params.rewind
                ? (e.slidePrev(U, !0, !0), i("autoplay"))
                : e.params.autoplay.stopOnLastSlide ||
                  (e.slideTo(e.slides.length - 1, U, !0, !0), i("autoplay"))
              : !e.isEnd || e.params.loop || e.params.rewind
                ? (e.slideNext(U, !0, !0), i("autoplay"))
                : e.params.autoplay.stopOnLastSlide ||
                  (e.slideTo(0, U, !0, !0), i("autoplay")),
            e.params.cssMode &&
              ((c = new Date().getTime()),
              requestAnimationFrame(() => {
                w();
              })));
        };
      return (
        N > 0
          ? (clearTimeout(s),
            (s = setTimeout(() => {
              he();
            }, N)))
          : requestAnimationFrame(() => {
              he();
            }),
        N
      );
    },
    M = () => {
      ((c = new Date().getTime()),
        (e.autoplay.running = !0),
        w(),
        i("autoplayStart"));
    },
    E = () => {
      ((e.autoplay.running = !1),
        clearTimeout(s),
        cancelAnimationFrame(l),
        i("autoplayStop"));
    },
    S = (z, N) => {
      if (e.destroyed || !e.autoplay.running) return;
      (clearTimeout(s), z || (T = !0));
      const B = () => {
        (i("autoplayPause"),
          e.params.autoplay.waitForTransition
            ? e.wrapperEl.addEventListener("transitionend", p)
            : O());
      };
      if (((e.autoplay.paused = !0), N)) {
        (x && (u = e.params.autoplay.delay), (x = !1), B());
        return;
      }
      ((u = (u || e.params.autoplay.delay) - (new Date().getTime() - c)),
        !(e.isEnd && u < 0 && !e.params.loop) && (u < 0 && (u = 0), B()));
    },
    O = () => {
      (e.isEnd && u < 0 && !e.params.loop) ||
        e.destroyed ||
        !e.autoplay.running ||
        ((c = new Date().getTime()),
        T ? ((T = !1), w(u)) : w(),
        (e.autoplay.paused = !1),
        i("autoplayResume"));
    },
    C = () => {
      if (e.destroyed || !e.autoplay.running) return;
      const z = Xt();
      (z.visibilityState === "hidden" && ((T = !0), S(!0)),
        z.visibilityState === "visible" && O());
    },
    A = (z) => {
      z.pointerType === "mouse" &&
        ((T = !0), (m = !0), !(e.animating || e.autoplay.paused) && S(!0));
    },
    j = (z) => {
      z.pointerType === "mouse" && ((m = !1), e.autoplay.paused && O());
    },
    _ = () => {
      e.params.autoplay.pauseOnMouseEnter &&
        (e.el.addEventListener("pointerenter", A),
        e.el.addEventListener("pointerleave", j));
    },
    R = () => {
      e.el &&
        typeof e.el != "string" &&
        (e.el.removeEventListener("pointerenter", A),
        e.el.removeEventListener("pointerleave", j));
    },
    Y = () => {
      Xt().addEventListener("visibilitychange", C);
    },
    V = () => {
      Xt().removeEventListener("visibilitychange", C);
    };
  (n("init", () => {
    e.params.autoplay.enabled && (_(), Y(), M());
  }),
    n("destroy", () => {
      (R(), V(), e.autoplay.running && E());
    }),
    n("_freeModeStaticRelease", () => {
      (d || T) && O();
    }),
    n("_freeModeNoMomentumRelease", () => {
      e.params.autoplay.disableOnInteraction ? E() : S(!0, !0);
    }),
    n("beforeTransitionStart", (z, N, B) => {
      e.destroyed ||
        !e.autoplay.running ||
        (B || !e.params.autoplay.disableOnInteraction ? S(!0, !0) : E());
    }),
    n("sliderFirstMove", () => {
      if (!(e.destroyed || !e.autoplay.running)) {
        if (e.params.autoplay.disableOnInteraction) {
          E();
          return;
        }
        ((h = !0),
          (d = !1),
          (T = !1),
          (y = setTimeout(() => {
            ((T = !0), (d = !0), S(!0));
          }, 200)));
      }
    }),
    n("touchEnd", () => {
      if (!(e.destroyed || !e.autoplay.running || !h)) {
        if (
          (clearTimeout(y),
          clearTimeout(s),
          e.params.autoplay.disableOnInteraction)
        ) {
          ((d = !1), (h = !1));
          return;
        }
        (d && e.params.cssMode && O(), (d = !1), (h = !1));
      }
    }),
    n("slideChange", () => {
      e.destroyed || !e.autoplay.running || (x = !0);
    }),
    Object.assign(e.autoplay, { start: M, stop: E, pause: S, resume: O }));
}
function f1(e) {
  const {
    effect: t,
    swiper: n,
    on: i,
    setTranslate: a,
    setTransition: s,
    overwriteParams: l,
    perspective: r,
    recreateShadows: o,
    getEffectParams: u,
  } = e;
  (i("beforeInit", () => {
    if (n.params.effect !== t) return;
    (n.classNames.push(`${n.params.containerModifierClass}${t}`),
      r && r() && n.classNames.push(`${n.params.containerModifierClass}3d`));
    const f = l ? l() : {};
    (Object.assign(n.params, f), Object.assign(n.originalParams, f));
  }),
    i("setTranslate _virtualUpdated", () => {
      n.params.effect === t && a();
    }),
    i("setTransition", (f, h) => {
      n.params.effect === t && s(h);
    }),
    i("transitionEnd", () => {
      if (n.params.effect === t && o) {
        if (!u || !u().slideShadows) return;
        (n.slides.forEach((f) => {
          f.querySelectorAll(
            ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left",
          ).forEach((h) => h.remove());
        }),
          o());
      }
    }));
  let c;
  i("virtualUpdate", () => {
    n.params.effect === t &&
      (n.slides.length || (c = !0),
      requestAnimationFrame(() => {
        c && n.slides && n.slides.length && (a(), (c = !1));
      }));
  });
}
function d1(e, t) {
  const n = kr(t);
  return (
    n !== t &&
      ((n.style.backfaceVisibility = "hidden"),
      (n.style["-webkit-backface-visibility"] = "hidden")),
    n
  );
}
function Q4({ swiper: e, duration: t, transformElements: n, allSlides: i }) {
  const { activeIndex: a } = e,
    s = (l) =>
      l.parentElement
        ? l.parentElement
        : e.slides.find((o) => o.shadowRoot && o.shadowRoot === l.parentNode);
  if (e.params.virtualTranslate && t !== 0) {
    let l = !1,
      r;
    (i
      ? (r = n)
      : (r = n.filter((o) => {
          const u = o.classList.contains("swiper-slide-transform") ? s(o) : o;
          return e.getSlideIndex(u) === a;
        })),
      r.forEach((o) => {
        ME(o, () => {
          if (l || !e || e.destroyed) return;
          ((l = !0), (e.animating = !1));
          const u = new window.CustomEvent("transitionend", {
            bubbles: !0,
            cancelable: !0,
          });
          e.wrapperEl.dispatchEvent(u);
        });
      }));
  }
}
function xc(e, t, n) {
  const i = `swiper-slide-shadow${n ? `-${n}` : ""}${e ? ` swiper-slide-shadow-${e}` : ""}`,
    a = kr(t);
  let s = a.querySelector(`.${i.split(" ").join(".")}`);
  return (s || ((s = js("div", i.split(" "))), a.append(s)), s);
}
function K4({ swiper: e, extendParams: t, on: n }) {
  (t({
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      scale: 1,
      modifier: 1,
      slideShadows: !0,
    },
  }),
    f1({
      effect: "coverflow",
      swiper: e,
      on: n,
      setTranslate: () => {
        const { width: s, height: l, slides: r, slidesSizesGrid: o } = e,
          u = e.params.coverflowEffect,
          c = e.isHorizontal(),
          f = e.translate,
          h = c ? -f + s / 2 : -f + l / 2,
          d = c ? u.rotate : -u.rotate,
          y = u.depth,
          x = AE(e);
        for (let T = 0, m = r.length; T < m; T += 1) {
          const p = r[T],
            v = o[T],
            b = p.swiperSlideOffset,
            w = (h - b - v / 2) / v,
            M =
              typeof u.modifier == "function" ? u.modifier(w) : w * u.modifier;
          let E = c ? d * M : 0,
            S = c ? 0 : d * M,
            O = -y * Math.abs(M),
            C = u.stretch;
          typeof C == "string" &&
            C.indexOf("%") !== -1 &&
            (C = (parseFloat(u.stretch) / 100) * v);
          let A = c ? 0 : C * M,
            j = c ? C * M : 0,
            _ = 1 - (1 - u.scale) * Math.abs(M);
          (Math.abs(j) < 0.001 && (j = 0),
            Math.abs(A) < 0.001 && (A = 0),
            Math.abs(O) < 0.001 && (O = 0),
            Math.abs(E) < 0.001 && (E = 0),
            Math.abs(S) < 0.001 && (S = 0),
            Math.abs(_) < 0.001 && (_ = 0));
          const R = `translate3d(${j}px,${A}px,${O}px)  rotateX(${x(S)}deg) rotateY(${x(E)}deg) scale(${_})`,
            Y = d1(u, p);
          if (
            ((Y.style.transform = R),
            (p.style.zIndex = -Math.abs(Math.round(M)) + 1),
            u.slideShadows)
          ) {
            let V = c
                ? p.querySelector(".swiper-slide-shadow-left")
                : p.querySelector(".swiper-slide-shadow-top"),
              z = c
                ? p.querySelector(".swiper-slide-shadow-right")
                : p.querySelector(".swiper-slide-shadow-bottom");
            (V || (V = xc("coverflow", p, c ? "left" : "top")),
              z || (z = xc("coverflow", p, c ? "right" : "bottom")),
              V && (V.style.opacity = M > 0 ? M : 0),
              z && (z.style.opacity = -M > 0 ? -M : 0));
          }
        }
      },
      setTransition: (s) => {
        e.slides
          .map((r) => kr(r))
          .forEach((r) => {
            ((r.style.transitionDuration = `${s}ms`),
              r
                .querySelectorAll(
                  ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left",
                )
                .forEach((o) => {
                  o.style.transitionDuration = `${s}ms`;
                }));
          });
      },
      perspective: () => !0,
      overwriteParams: () => ({ watchSlidesProgress: !0 }),
    }));
}
function Z4({ swiper: e, extendParams: t, on: n }) {
  (t({
    cardsEffect: {
      slideShadows: !0,
      rotate: !0,
      perSlideRotate: 2,
      perSlideOffset: 8,
    },
  }),
    f1({
      effect: "cards",
      swiper: e,
      on: n,
      setTranslate: () => {
        const { slides: s, activeIndex: l, rtlTranslate: r } = e,
          o = e.params.cardsEffect,
          { startTranslate: u, isTouched: c } = e.touchEventsData,
          f = r ? -e.translate : e.translate;
        for (let h = 0; h < s.length; h += 1) {
          const d = s[h],
            y = d.progress,
            x = Math.min(Math.max(y, -4), 4);
          let T = d.swiperSlideOffset;
          (e.params.centeredSlides &&
            !e.params.cssMode &&
            (e.wrapperEl.style.transform = `translateX(${e.minTranslate()}px)`),
            e.params.centeredSlides &&
              e.params.cssMode &&
              (T -= s[0].swiperSlideOffset));
          let m = e.params.cssMode ? -T - e.translate : -T,
            p = 0;
          const v = -100 * Math.abs(x);
          let b = 1,
            w = -o.perSlideRotate * x,
            M = o.perSlideOffset - Math.abs(x) * 0.75;
          const E =
              e.virtual && e.params.virtual.enabled ? e.virtual.from + h : h,
            S =
              (E === l || E === l - 1) &&
              x > 0 &&
              x < 1 &&
              (c || e.params.cssMode) &&
              f < u,
            O =
              (E === l || E === l + 1) &&
              x < 0 &&
              x > -1 &&
              (c || e.params.cssMode) &&
              f > u;
          if (S || O) {
            const _ = (1 - Math.abs((Math.abs(x) - 0.5) / 0.5)) ** 0.5;
            ((w += -28 * x * _),
              (b += -0.5 * _),
              (M += 96 * _),
              (p = `${(o.rotate || e.isHorizontal() ? -25 : 0) * _ * Math.abs(x)}%`));
          }
          if (
            (x < 0
              ? (m = `calc(${m}px ${r ? "-" : "+"} (${M * Math.abs(x)}%))`)
              : x > 0
                ? (m = `calc(${m}px ${r ? "-" : "+"} (-${M * Math.abs(x)}%))`)
                : (m = `${m}px`),
            !e.isHorizontal())
          ) {
            const _ = p;
            ((p = m), (m = _));
          }
          const C = x < 0 ? `${1 + (1 - b) * x}` : `${1 - (1 - b) * x}`,
            A = `
        translate3d(${m}, ${p}, ${v}px)
        rotateZ(${o.rotate ? (r ? -w : w) : 0}deg)
        scale(${C})
      `;
          if (o.slideShadows) {
            let _ = d.querySelector(".swiper-slide-shadow");
            (_ || (_ = xc("cards", d)),
              _ &&
                (_.style.opacity = Math.min(
                  Math.max((Math.abs(x) - 0.5) / 0.5, 0),
                  1,
                )));
          }
          d.style.zIndex = -Math.abs(Math.round(y)) + s.length;
          const j = d1(o, d);
          j.style.transform = A;
        }
      },
      setTransition: (s) => {
        const l = e.slides.map((r) => kr(r));
        (l.forEach((r) => {
          ((r.style.transitionDuration = `${s}ms`),
            r.querySelectorAll(".swiper-slide-shadow").forEach((o) => {
              o.style.transitionDuration = `${s}ms`;
            }));
        }),
          Q4({ swiper: e, duration: s, transformElements: l }));
      },
      perspective: () => !0,
      overwriteParams: () => ({
        _loopSwapReset: !1,
        watchSlidesProgress: !0,
        loopAdditionalSlides: e.params.cardsEffect.rotate ? 3 : 2,
        centeredSlides: !0,
        virtualTranslate: !e.params.cssMode,
      }),
    }));
}
const F4 = ({ poems: e }) =>
    g.jsx("div", {
      className: "max-w-md mx-auto",
      children: g.jsx(Pr, {
        effect: "cards",
        grabCursor: !0,
        autoplay: { delay: 4e3, disableOnInteraction: !1 },
        pagination: { clickable: !0, dynamicBullets: !0 },
        modules: [sd, Z4, ad],
        className: "poem-swiper",
        cardsEffect: { perSlideOffset: 8, perSlideRotate: 2, slideShadows: !0 },
        children: e.map((t, n) =>
          g.jsx(
            Qr,
            {
              children: g.jsxs(H.div, {
                initial: { opacity: 0, scale: 0.9 },
                whileInView: { opacity: 1, scale: 1 },
                viewport: { once: !0 },
                transition: { duration: 0.5, delay: n * 0.1 },
                className:
                  "relative bg-gradient-to-br from-amber-50 via-white to-amber-50 rounded-2xl shadow-2xl p-8 md:p-10 h-[400px] md:h-[450px] flex flex-col justify-center border-2 border-wedding-gold/30",
                children: [
                  g.jsx("div", {
                    className: "absolute inset-0 opacity-5 rounded-2xl",
                    style: {
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E")`,
                    },
                  }),
                  g.jsx("div", {
                    className:
                      "absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-wedding-gold/40",
                  }),
                  g.jsx("div", {
                    className:
                      "absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-wedding-gold/40",
                  }),
                  g.jsx("div", {
                    className:
                      "absolute top-6 left-6 text-6xl text-wedding-gold/20 font-script leading-none",
                    children: '"',
                  }),
                  g.jsx("div", {
                    className:
                      "absolute bottom-6 right-6 text-6xl text-wedding-gold/20 font-script leading-none",
                    children: '"',
                  }),
                  g.jsx("div", {
                    className: "relative z-10 px-4",
                    children: g.jsx("p", {
                      className:
                        "font-serif text-base md:text-lg text-gray-800 leading-relaxed whitespace-pre-line text-center",
                      children: t.text,
                    }),
                  }),
                  g.jsx("div", {
                    className:
                      "absolute bottom-6 left-1/2 transform -translate-x-1/2",
                    children: g.jsx("div", {
                      className:
                        "bg-wedding-gold/80 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg",
                      children: n + 1,
                    }),
                  }),
                  g.jsx("div", {
                    className:
                      "absolute top-1/2 left-4 right-4 h-px bg-gradient-to-r from-transparent via-wedding-gold/20 to-transparent",
                  }),
                ],
              }),
            },
            n,
          ),
        ),
      }),
    }),
  h1 = "/assets/outstory-DyxQts8r.jpg",
  m1 = "/assets/02-5-CYNIexz0.jpg",
  p1 = "/assets/abc-BWBnChjw.jpg",
  $4 = () => {
    const e = [
      {
        text: `Đời dài muôn mảnh bình yên
Em mang lãng mạn dịu hiền bước qua.

Sáng ngời dáng ngọc ngọc ngà
Cùng anh sánh bước chan hòa trọn đời.`,
      },
      {
        text: `Đường đời muôn dặm thênh thang
Bao nhiêu phong cảnh rỡ ràng trước sau.

Quan trọng vẫn mãi bền lâu
Là người sánh bước, cùng nhau vui buồn.`,
      },
      {
        text: `Gặp anh nắng rót vàng tơ
Mây trôi cũng hóa nên thơ dịu hiền.

Chiều về gió thoảng êm đềm
Hình như cũng ngọt như men rượu hồng.`,
      },
      {
        text: `Đời này quý giá vô ngần
Có anh chung bước, muôn phần đẹp tươi.

Yêu anh như gió mùa xuân
Nhẹ nhàng thoảng đến, chan chứa niềm vui.`,
      },
    ];
    return g.jsxs("section", {
      className: "py-16 md:py-20 px-4 bg-white relative overflow-hidden",
      children: [
        g.jsxs("div", {
          className: "absolute inset-0 opacity-5",
          children: [
            g.jsx("div", {
              className: "absolute top-0 left-0 w-1/3 h-1/2 bg-cover bg-center",
              style: { backgroundImage: `url(${m1})`, filter: "blur(3px)" },
            }),
            g.jsx("div", {
              className:
                "absolute bottom-0 right-0 w-1/3 h-1/2 bg-cover bg-center",
              style: { backgroundImage: `url(${p1})`, filter: "blur(3px)" },
            }),
          ],
        }),
        g.jsxs("div", {
          className: "container mx-auto max-w-6xl relative z-10",
          children: [
            g.jsxs(H.div, {
              "data-aos": "fade-up",
              className: "text-center mb-12 md:mb-16",
              children: [
                g.jsx("h2", {
                  className:
                    "font-script text-4xl md:text-5xl lg:text-6xl text-wedding-gold mb-4",
                  children: "Our Love Story",
                }),
                g.jsx("div", {
                  className: "w-24 h-1 bg-wedding-primary mx-auto mb-4 md:mb-6",
                }),
                g.jsx("p", {
                  className:
                    "text-gray-600 font-serif text-base md:text-lg px-4",
                  children: "Câu chuyện tình yêu của chúng mình",
                }),
              ],
            }),
            g.jsxs("div", {
              className:
                "grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-20",
              children: [
                g.jsxs(H.div, {
                  "data-aos": "fade-right",
                  className: "relative group order-2 md:order-1",
                  children: [
                    g.jsx("div", {
                      className:
                        "absolute inset-0 bg-gradient-to-br from-wedding-gold to-wedding-primary rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300",
                    }),
                    g.jsxs("div", {
                      className:
                        "relative overflow-hidden rounded-2xl shadow-2xl",
                      children: [
                        g.jsx("img", {
                          src: h1,
                          alt: "Our Story",
                          className:
                            "w-full h-[400px] md:h-[500px] object-cover transform group-hover:scale-110 transition-transform duration-500",
                        }),
                        g.jsx("div", {
                          className:
                            "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent",
                        }),
                      ],
                    }),
                    g.jsx("div", {
                      className:
                        "absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-white",
                    }),
                    g.jsx("div", {
                      className:
                        "absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-white",
                    }),
                  ],
                }),
                g.jsxs(H.div, {
                  "data-aos": "fade-left",
                  className: "space-y-6 md:space-y-8 order-1 md:order-2",
                  children: [
                    g.jsxs("div", {
                      className:
                        "bg-gradient-to-br from-wedding-secondary to-white p-6 md:p-8 rounded-2xl shadow-lg",
                      children: [
                        g.jsxs("div", {
                          className: "flex items-center space-x-4 mb-4",
                          children: [
                            g.jsx("div", {
                              className:
                                "w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-wedding-gold to-wedding-primary flex items-center justify-center shadow-lg",
                              children: g.jsx("span", {
                                className:
                                  "font-script text-2xl md:text-3xl text-white",
                                children: "MA",
                              }),
                            }),
                            g.jsxs("div", {
                              children: [
                                g.jsx("h3", {
                                  className:
                                    "font-elegant text-xl md:text-2xl text-gray-800",
                                  children: "Mai Anh",
                                }),
                                g.jsx("p", {
                                  className:
                                    "text-gray-600 text-xs md:text-sm italic font-serif",
                                  children: "The Bride",
                                }),
                              ],
                            }),
                          ],
                        }),
                        g.jsx("p", {
                          className:
                            "text-gray-700 font-serif leading-relaxed text-sm md:text-base",
                          children:
                            '"Tình yêu không chỉ là tìm được người hoàn hảo, mà là học cách yêu thương một người không hoàn hảo một cách hoàn hảo."',
                        }),
                      ],
                    }),
                    g.jsxs("div", {
                      className:
                        "bg-gradient-to-br from-wedding-secondary to-white p-6 md:p-8 rounded-2xl shadow-lg",
                      children: [
                        g.jsxs("div", {
                          className: "flex items-center space-x-4 mb-4",
                          children: [
                            g.jsx("div", {
                              className:
                                "w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-wedding-gold to-wedding-primary flex items-center justify-center shadow-lg",
                              children: g.jsx("span", {
                                className:
                                  "font-script text-2xl md:text-3xl text-white",
                                children: "MQ",
                              }),
                            }),
                            g.jsxs("div", {
                              children: [
                                g.jsx("h3", {
                                  className:
                                    "font-elegant text-xl md:text-2xl text-gray-800",
                                  children: "Minh Quân",
                                }),
                                g.jsx("p", {
                                  className:
                                    "text-gray-600 text-xs md:text-sm italic font-serif",
                                  children: "The Groom",
                                }),
                              ],
                            }),
                          ],
                        }),
                        g.jsx("p", {
                          className:
                            "text-gray-700 font-serif leading-relaxed text-sm md:text-base",
                          children:
                            '"Hạnh phúc là được ở bên em mỗi ngày, cùng nhau vượt qua mọi thử thách và chia sẻ mọi niềm vui."',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            g.jsx("div", {
              className: "space-y-12 md:space-y-16",
              children: g.jsxs(H.div, {
                "data-aos": "fade-up",
                className: "py-8",
                children: [
                  g.jsxs("div", {
                    className: "text-center mb-8",
                    children: [
                      g.jsx("h3", {
                        className:
                          "font-serif text-2xl md:text-3xl text-gray-800 mb-3",
                        children: "Những vần thơ tình yêu",
                      }),
                      g.jsx("p", {
                        className: "text-gray-600 text-sm md:text-base",
                        children: "Vuốt để xem tiếp",
                      }),
                    ],
                  }),
                  g.jsx(F4, { poems: e }),
                ],
              }),
            }),
          ],
        }),
      ],
    });
  },
  I4 = "/assets/abc-BWBnChjw.jpg",
  J4 = () => {
    const e = new Date("2025-10-12T12:00:00").getTime(),
      t = () => {
        const s = new Date().getTime(),
          l = e - s;
        return l > 0
          ? {
              days: Math.floor(l / (1e3 * 60 * 60 * 24)),
              hours: Math.floor((l % (1e3 * 60 * 60 * 24)) / (1e3 * 60 * 60)),
              minutes: Math.floor((l % (1e3 * 60 * 60)) / (1e3 * 60)),
              seconds: Math.floor((l % (1e3 * 60)) / 1e3),
            }
          : { days: 12, hours: 2, minutes: 30, seconds: 60 };
      },
      [n, i] = L.useState(t());
    L.useEffect(() => {
      const s = setInterval(() => {
        i(t());
      }, 1e3);
      return () => clearInterval(s);
    }, []);
    const a = [
      { label: "ngày", value: n.days },
      { label: "giờ", value: n.hours },
      { label: "phút", value: n.minutes },
      { label: "giây", value: n.seconds },
    ];
    return g.jsxs("section", {
      className:
        "relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden",
      children: [
        g.jsxs("div", {
          className: "absolute inset-0",
          children: [
            g.jsx("img", {
              src: I4,
              alt: "Countdown Background",
              className: "w-full h-full object-cover",
            }),
            g.jsx("div", {
              className:
                "absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50",
            }),
          ],
        }),
        g.jsxs("div", {
          className:
            "container mx-auto max-w-6xl relative z-10 px-4 py-16 md:py-20",
          children: [
            g.jsxs(H.div, {
              "data-aos": "fade-up",
              className: "text-center mb-12",
              children: [
                g.jsx("h2", {
                  className:
                    "font-script text-5xl md:text-6xl text-white mb-4 drop-shadow-2xl",
                  children: "Đếm ngược đến ngày vui",
                }),
                g.jsx("div", {
                  className: "w-24 h-1 bg-wedding-gold mx-auto mb-4",
                }),
                g.jsx("p", {
                  className: "text-white font-serif text-lg drop-shadow-lg",
                  children:
                    "Mỗi giây trôi qua đều đếm ngược đến khoảnh khắc đặc biệt",
                }),
              ],
            }),
            g.jsx("div", {
              className: "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6",
              children: a.map((s, l) =>
                g.jsxs(
                  H.div,
                  {
                    "data-aos": "zoom-in",
                    "data-aos-delay": l * 100,
                    className:
                      "md:bg-white/90 md:backdrop-blur-sm md:rounded-xl md:shadow-2xl p-3 md:p-8 text-center transform hover:scale-105 transition-transform md:border-t-4 md:border-wedding-gold",
                    children: [
                      g.jsx(
                        H.div,
                        {
                          initial: { scale: 1.2, opacity: 0 },
                          animate: { scale: 1, opacity: 1 },
                          className:
                            "text-4xl md:text-5xl lg:text-6xl font-bold text-white md:text-wedding-gold mb-1 md:mb-2 drop-shadow-2xl",
                          children: s.value,
                        },
                        s.value,
                      ),
                      g.jsx("div", {
                        className:
                          "text-sm md:text-sm lg:text-base text-white md:text-gray-700 font-serif uppercase tracking-wider drop-shadow-lg",
                        children: s.label,
                      }),
                    ],
                  },
                  s.label,
                ),
              ),
            }),
          ],
        }),
      ],
    });
  },
  W4 = () => {
    const i = new Date(2025, 9, 1).getDay(),
      a = new Date(2025, 10, 0).getDate(),
      s = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      l = [];
    for (let r = 0; r < i; r++) l.push(null);
    for (let r = 1; r <= a; r++) l.push(r);
    return g.jsx("section", {
      className: "py-20 px-4 bg-white",
      children: g.jsxs("div", {
        className: "container mx-auto max-w-4xl",
        children: [
          g.jsxs(H.div, {
            "data-aos": "fade-up",
            className: "text-center mb-12",
            children: [
              g.jsx("h2", {
                className:
                  "font-script text-4xl md:text-5xl text-wedding-gold mb-4",
                children: "Save The Date",
              }),
              g.jsx("div", {
                className: "w-24 h-1 bg-wedding-primary mx-auto",
              }),
            ],
          }),
          g.jsxs(H.div, {
            "data-aos": "zoom-in",
            className:
              "bg-gradient-to-br from-wedding-secondary to-white rounded-2xl shadow-2xl p-6 md:p-10 max-w-md mx-auto",
            children: [
              g.jsxs("div", {
                className: "text-center mb-6",
                children: [
                  g.jsx("h3", {
                    className:
                      "text-3xl md:text-4xl font-bold text-wedding-gold mb-1",
                    children: 10,
                  }),
                  g.jsx("p", {
                    className: "text-xl text-gray-700 font-serif",
                    children: 2025,
                  }),
                ],
              }),
              g.jsx("div", {
                className: "grid grid-cols-7 gap-2 mb-4",
                children: s.map((r) =>
                  g.jsx(
                    "div",
                    {
                      className:
                        "text-center text-xs font-semibold text-gray-500",
                      children: r,
                    },
                    r,
                  ),
                ),
              }),
              g.jsx("div", {
                className: "grid grid-cols-7 gap-2",
                children: l.map((r, o) =>
                  g.jsx(
                    "div",
                    {
                      className: `
                  aspect-square flex items-center justify-center text-sm md:text-base
                  ${r === 12 ? "bg-wedding-gold text-white font-bold rounded-full shadow-lg relative" : r ? "text-gray-700 hover:bg-wedding-secondary rounded-full transition-colors" : ""}
                `,
                      children:
                        r === 12
                          ? g.jsxs("div", {
                              className: "relative",
                              children: [
                                g.jsx("span", {
                                  className: "text-lg",
                                  children: r,
                                }),
                                g.jsx(hi, {
                                  className:
                                    "absolute -top-1 -right-1 text-red-500 text-xs animate-heart-beat",
                                }),
                              ],
                            })
                          : r,
                    },
                    o,
                  ),
                ),
              }),
              g.jsx("div", {
                className: "mt-8 text-center border-t border-wedding-gold pt-6",
                children: g.jsx("p", {
                  className:
                    "text-sm md:text-base lg:text-lg font-serif text-gray-700 leading-relaxed mb-2",
                  children: "Mời bạn tới dự lễ thành hôn của chúng mình",
                }),
              }),
            ],
          }),
        ],
      }),
    });
  },
  g1 = "/assets/02-9-BqDmw9kL.jpg",
  eM = () => {
    const [e, t] = L.useState(null),
      [n, i] = L.useState(0),
      a = [
        { id: 1, src: gr, title: "Khoảnh khắc hạnh phúc" },
        { id: 2, src: pa, title: "Tình yêu ngọt ngào" },
        { id: 3, src: m1, title: "Cùng nhau trọn đời" },
        { id: 4, src: p1, title: "Nụ cười rạng rỡ" },
        { id: 5, src: g1, title: "Mãi yêu thương" },
        { id: 6, src: h1, title: "Câu chuyện của chúng mình" },
        { id: 7, src: gr, title: "Khoảnh khắc hạnh phúc" },
        { id: 8, src: pa, title: "Tình yêu ngọt ngào" },
      ],
      l = ((f, h) => {
        const d = [];
        for (let y = 0; y < f.length; y += h) d.push(f.slice(y, y + h));
        return d;
      })(a, 4),
      r = (f) => {
        (i(f), t(a[f]));
      },
      o = () => {
        t(null);
      },
      u = () => {
        const f = (n + 1) % a.length;
        (i(f), t(a[f]));
      },
      c = () => {
        const f = (n - 1 + a.length) % a.length;
        (i(f), t(a[f]));
      };
    return g.jsx("section", {
      className:
        "py-20 px-4 bg-gradient-to-b from-white via-wedding-secondary to-white",
      children: g.jsxs("div", {
        className: "container mx-auto max-w-7xl",
        children: [
          g.jsxs(H.div, {
            "data-aos": "fade-up",
            className: "text-center mb-16",
            children: [
              g.jsx("h2", {
                className:
                  "font-script text-5xl md:text-6xl text-wedding-gold mb-4",
                children: "Our Memories",
              }),
              g.jsx("div", {
                className: "w-24 h-1 bg-wedding-primary mx-auto mb-6",
              }),
              g.jsx("p", {
                className: "text-gray-600 font-serif text-lg",
                children: "Những khoảnh khắc đẹp nhất của chúng mình",
              }),
            ],
          }),
          g.jsxs("div", {
            className: "relative",
            "data-aos": "fade-up",
            children: [
              g.jsx(Pr, {
                modules: [P4, ad, sd],
                spaceBetween: 30,
                slidesPerView: 1,
                navigation: {
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                },
                pagination: { clickable: !0, dynamicBullets: !0 },
                autoplay: { delay: 4e3, disableOnInteraction: !1 },
                loop: !0,
                className: "photo-gallery-swiper pb-12",
                children: l.map((f, h) =>
                  g.jsx(
                    Qr,
                    {
                      children: g.jsx("div", {
                        className:
                          "grid grid-cols-2 gap-4 md:gap-6 px-2 md:px-4",
                        children: f.map((d, y) => {
                          const x = h * 4 + y;
                          return g.jsxs(
                            H.div,
                            {
                              initial: { opacity: 0, scale: 0.9 },
                              whileInView: { opacity: 1, scale: 1 },
                              viewport: { once: !0 },
                              transition: { delay: y * 0.1 },
                              className:
                                "relative group cursor-pointer overflow-hidden rounded-lg shadow-lg aspect-[3/4]",
                              onClick: () => r(x),
                              whileHover: { scale: 1.02 },
                              children: [
                                g.jsx("img", {
                                  src: d.src,
                                  alt: d.title,
                                  className:
                                    "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
                                }),
                                g.jsx("div", {
                                  className:
                                    "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4 md:p-6",
                                  children: g.jsxs("div", {
                                    className: "text-center",
                                    children: [
                                      g.jsx(hi, {
                                        className:
                                          "text-white text-xl md:text-2xl mx-auto mb-2 animate-heart-beat",
                                      }),
                                      g.jsx("p", {
                                        className:
                                          "text-white font-serif text-sm md:text-lg",
                                        children: d.title,
                                      }),
                                    ],
                                  }),
                                }),
                                g.jsx("div", {
                                  className:
                                    "absolute top-0 left-0 w-8 md:w-12 h-8 md:h-12 border-t-2 border-l-2 border-wedding-gold opacity-0 group-hover:opacity-100 transition-opacity",
                                }),
                                g.jsx("div", {
                                  className:
                                    "absolute bottom-0 right-0 w-8 md:w-12 h-8 md:h-12 border-b-2 border-r-2 border-wedding-gold opacity-0 group-hover:opacity-100 transition-opacity",
                                }),
                              ],
                            },
                            d.id,
                          );
                        }),
                      }),
                    },
                    h,
                  ),
                ),
              }),
              g.jsx("button", {
                className:
                  "swiper-button-prev-custom absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 z-10 bg-wedding-gold text-white p-3 md:p-4 rounded-full shadow-xl hover:bg-wedding-primary transition-all duration-300 hover:scale-110",
                children: g.jsx($m, { className: "text-lg md:text-2xl" }),
              }),
              g.jsx("button", {
                className:
                  "swiper-button-next-custom absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 z-10 bg-wedding-gold text-white p-3 md:p-4 rounded-full shadow-xl hover:bg-wedding-primary transition-all duration-300 hover:scale-110",
                children: g.jsx(Im, { className: "text-lg md:text-2xl" }),
              }),
            ],
          }),
          g.jsx(ny, {
            children:
              e &&
              g.jsxs(H.div, {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                className:
                  "fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4",
                onClick: o,
                children: [
                  g.jsx(H.button, {
                    initial: { scale: 0 },
                    animate: { scale: 1 },
                    whileHover: { scale: 1.1, rotate: 90 },
                    onClick: o,
                    className:
                      "absolute top-4 right-4 text-white text-3xl z-10 bg-wedding-gold/20 p-3 rounded-full hover:bg-wedding-gold/40 transition-colors",
                    children: g.jsx(Ky, {}),
                  }),
                  g.jsx(H.button, {
                    initial: { x: -50, opacity: 0 },
                    animate: { x: 0, opacity: 1 },
                    whileHover: { scale: 1.2 },
                    onClick: (f) => {
                      (f.stopPropagation(), c());
                    },
                    className:
                      "absolute left-4 text-white text-4xl z-10 bg-wedding-gold/20 p-4 rounded-full hover:bg-wedding-gold/40 transition-colors",
                    children: g.jsx($m, {}),
                  }),
                  g.jsx(H.button, {
                    initial: { x: 50, opacity: 0 },
                    animate: { x: 0, opacity: 1 },
                    whileHover: { scale: 1.2 },
                    onClick: (f) => {
                      (f.stopPropagation(), u());
                    },
                    className:
                      "absolute right-4 text-white text-4xl z-10 bg-wedding-gold/20 p-4 rounded-full hover:bg-wedding-gold/40 transition-colors",
                    children: g.jsx(Im, {}),
                  }),
                  g.jsxs(H.div, {
                    initial: { scale: 0.8, opacity: 0 },
                    animate: { scale: 1, opacity: 1 },
                    exit: { scale: 0.8, opacity: 0 },
                    onClick: (f) => f.stopPropagation(),
                    className: "max-w-6xl max-h-[90vh]",
                    children: [
                      g.jsx("img", {
                        src: e.src,
                        alt: e.title,
                        className:
                          "max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl",
                      }),
                      g.jsx("p", {
                        className:
                          "text-white font-script text-2xl text-center mt-6",
                        children: e.title,
                      }),
                    ],
                  }),
                  g.jsxs("div", {
                    className:
                      "absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white font-sans text-lg",
                    children: [n + 1, " / ", a.length],
                  }),
                ],
              }),
          }),
        ],
      }),
    });
  },
  tM = () => {
    const e = [
      "Bạn có thể xác nhận trước với chúng mình số lượng người tham dự để tiện sắp xếp chỗ ngồi bằng cách điền vào phần phản hồi trong thiệp mời nhé~.",
      "Nếu có việc bận đột xuất không thể đến được, thì cứ nói  với chúng tớ nhé !",
      "Bạn nào cần chỗ nghỉ, cóa thẻ liên hệ trước để mình sắp xếp hihi ~",
      "Nếu bạn không có thời gian hoặc đã có kế hoạch khác nên không thể tham dự, cũng cứ nói thẳng với chúng mình nhé, đừng ngại gì cả. Chúng ta còn nhiều dịp để gặp nhau mà~",
      "Ngày vui chủ yếu là ăn uống vui vẻ, hôm đó có thể bận rộn không kịp chăm sóc chu đáo hết mọi người, mong được thông cảm.",
    ];
    return g.jsxs("section", {
      className:
        "py-16 md:py-20 px-4 bg-gradient-to-b from-white to-wedding-secondary relative overflow-hidden",
      children: [
        g.jsxs("div", {
          className: "absolute inset-0 opacity-5",
          children: [
            g.jsx("div", {
              className:
                "absolute top-0 right-0 w-64 h-64 bg-wedding-gold rounded-full blur-3xl",
            }),
            g.jsx("div", {
              className:
                "absolute bottom-0 left-0 w-64 h-64 bg-wedding-primary rounded-full blur-3xl",
            }),
          ],
        }),
        g.jsxs("div", {
          className: "container mx-auto max-w-4xl relative z-10",
          children: [
            g.jsxs(H.div, {
              "data-aos": "fade-up",
              className: "text-center mb-10 md:mb-12",
              children: [
                g.jsx("h2", {
                  className:
                    "font-script text-4xl md:text-5xl lg:text-6xl text-wedding-gold mb-4",
                  children: "Thông tin sự kiện",
                }),
                g.jsx("div", {
                  className: "w-24 h-1 bg-wedding-primary mx-auto mb-4",
                }),
                g.jsx("p", {
                  className:
                    "text-gray-600 font-serif text-sm md:text-base px-4",
                  children: "Chi tiết về buổi lễ",
                }),
              ],
            }),
            g.jsxs("div", {
              className: "grid md:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-12",
              children: [
                g.jsxs(H.div, {
                  "data-aos": "fade-right",
                  className:
                    "relative bg-gradient-to-br from-white to-wedding-cream rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden border-2 border-wedding-gold/20",
                  children: [
                    g.jsx("div", {
                      className:
                        "absolute top-0 right-0 w-32 h-32 bg-wedding-gold/5 rounded-full -translate-y-16 translate-x-16",
                    }),
                    g.jsx("div", {
                      className:
                        "absolute bottom-0 left-0 w-24 h-24 bg-wedding-primary/5 rounded-full translate-y-12 -translate-x-12",
                    }),
                    g.jsxs("div", {
                      className: "relative z-10",
                      children: [
                        g.jsxs("div", {
                          className: "flex items-center gap-3 mb-4",
                          children: [
                            g.jsx("div", {
                              className: "",
                              children: g.jsx(Qy, {
                                className: "text-2xl text-wedding-gold ",
                              }),
                            }),
                            g.jsx("h3", {
                              className:
                                "font-script text-3xl text-wedding-gold",
                              children: "Địa điểm",
                            }),
                          ],
                        }),
                        g.jsx("p", {
                          className: "font-serif text-xl text-gray-800 mb-2",
                          children: "Nhà hàng tiệc cưới VHC Devstack",
                        }),
                        g.jsx("p", {
                          className:
                            "text-sm text-gray-600 mb-4 leading-relaxed",
                          children:
                            "808 Đường Lê Văn Việt, Phường Tân Định, Quận 1, TP.HCM",
                        }),
                        g.jsxs(H.a, {
                          href: "https://www.google.com/maps/search/?api=1&query=808+Đường+Lê+Văn+Việt,+Phường+Tân+Định,+Quận+1,+TP.HCM",
                          target: "_blank",
                          rel: "noopener noreferrer",
                          className:
                            "inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-wedding-gold to-wedding-primary text-white font-sans text-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
                          whileHover: { scale: 1.05 },
                          whileTap: { scale: 0.95 },
                          children: [
                            g.jsx(Py, { className: "text-base" }),
                            g.jsx("span", { children: "Chỉ đường" }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                g.jsxs(H.div, {
                  "data-aos": "fade-left",
                  className:
                    "relative bg-gradient-to-br from-white to-wedding-cream rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden border-2 border-wedding-gold/20",
                  children: [
                    g.jsx("div", {
                      className:
                        "absolute top-0 right-0 w-32 h-32 bg-wedding-primary/5 rounded-full -translate-y-16 translate-x-16",
                    }),
                    g.jsx("div", {
                      className:
                        "absolute bottom-0 left-0 w-24 h-24 bg-wedding-gold/5 rounded-full translate-y-12 -translate-x-12",
                    }),
                    g.jsxs("div", {
                      className: "relative z-10",
                      children: [
                        g.jsxs("div", {
                          className: "flex items-center gap-3 mb-4",
                          children: [
                            g.jsx("div", {
                              className: "",
                              children: g.jsx(Jm, {
                                className: "text-2xl text-wedding-gold ",
                              }),
                            }),
                            g.jsx("h3", {
                              className:
                                "font-script text-3xl text-wedding-gold",
                              children: "Thời gian",
                            }),
                          ],
                        }),
                        g.jsxs("div", {
                          className: "space-y-3",
                          children: [
                            g.jsxs("div", {
                              className: "flex items-start gap-3",
                              children: [
                                g.jsx(aE, {
                                  className:
                                    "text-wedding-primary text-lg mt-1 flex-shrink-0",
                                }),
                                g.jsxs("div", {
                                  children: [
                                    g.jsx("p", {
                                      className:
                                        "font-serif text-lg text-gray-800",
                                      children:
                                        "Chủ Nhật, 12 tháng 10 năm 2025",
                                    }),
                                    g.jsx("p", {
                                      className: "text-sm text-gray-500 italic",
                                      children:
                                        "(Tức ngày 19 tháng 09 năm Ất Tỵ)",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            g.jsxs("div", {
                              className: "flex items-start gap-3",
                              children: [
                                g.jsx(Jm, {
                                  className:
                                    "text-wedding-primary text-lg mt-1 flex-shrink-0",
                                }),
                                g.jsxs("div", {
                                  children: [
                                    g.jsx("p", {
                                      className:
                                        "font-serif text-lg text-gray-800",
                                      children: "12:00 (Trưa)",
                                    }),
                                    g.jsx("p", {
                                      className: "text-sm text-gray-500",
                                      children: "Lễ thành hôn bắt đầu",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            g.jsxs(H.div, {
              "data-aos": "fade-up",
              className: "bg-white rounded-lg shadow-lg p-6 md:p-8",
              children: [
                g.jsxs("div", {
                  className: "flex items-center space-x-3 mb-6",
                  children: [
                    g.jsx(oE, { className: "text-2xl text-wedding-primary" }),
                    g.jsx("h3", {
                      className: "font-serif text-2xl text-gray-800",
                      children: "Cảm ơn bạn đã đọc :",
                    }),
                  ],
                }),
                g.jsx("div", {
                  className: "space-y-4",
                  children: e.map((t, n) =>
                    g.jsxs(
                      H.div,
                      {
                        "data-aos": "fade-up",
                        "data-aos-delay": n * 100,
                        className: "flex items-start space-x-3",
                        children: [
                          g.jsx("div", {
                            className:
                              "bg-wedding-gold text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-sm font-semibold",
                            children: n + 1,
                          }),
                          g.jsx("p", {
                            className: "text-gray-700 leading-relaxed",
                            children: t,
                          }),
                        ],
                      },
                      n,
                    ),
                  ),
                }),
                g.jsx("div", {
                  className: "mt-8 text-center",
                  children: g.jsx("p", {
                    className: "font-script text-2xl text-wedding-gold",
                    children: "Hẹn gặp bạn tại đám cưới nhé~",
                  }),
                }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  nM = () => {
    const [e, t] = L.useState(""),
      [n, i] = L.useState([
        {
          name: "Nguyễn Mai Anh",
          text: "Non sông một chặng đường dài, ba sinh hữu hạnh, duyên này thành đôi. Tiệc vui ngắn ngủi mà thôi, nếu điều sơ suất, mong người lượng thương.",
          time: "2 giờ trước",
          avatar: "MA",
        },
        {
          name: "Hoàng Văn Nam",
          text: "Chúc hai bạn trăm năm hạnh phúc, yêu thương và hòa hợp. Cầu mong tổ ấm luôn tràn ngập tiếng cười.",
          time: "5 giờ trước",
          avatar: "HN",
        },
        {
          name: "Trần Thu Hà",
          text: "Ước chúc đôi bạn trẻ sẽ luôn giữ được tình yêu trong sáng như ngày đầu. Hạnh phúc mãi mãi!",
          time: "1 ngày trước",
          avatar: "TH",
        },
        {
          name: "Lê Minh Tuấn",
          text: "Chúc mừng đám cưới! Mong hai bạn luôn yêu thương và thấu hiểu nhau trên con đường phía trước.",
          time: "1 ngày trước",
          avatar: "LT",
        },
        {
          name: "Phạm Thị Lan",
          text: "Hạnh phúc là khi tìm được người đồng hành trọn đời. Chúc mừng hai bạn đã tìm thấy nhau!",
          time: "2 ngày trước",
          avatar: "PL",
        },
        {
          name: "Đỗ Quang Huy",
          text: "Chúc cô dâu chú rể trăm năm hạnh phúc, bên nhau mãi mãi. Tình yêu của hai người thật đẹp!",
          time: "2 ngày trước",
          avatar: "DH",
        },
      ]),
      [a, s] = L.useState(""),
      l = (r) => {
        if ((r.preventDefault(), e.trim() && a.trim())) {
          const o = {
            name: a,
            text: e,
            time: "Vừa xong",
            avatar:
              a.split(" ").slice(-1)[0].charAt(0).toUpperCase() +
              a.split(" ")[0].charAt(0).toUpperCase(),
          };
          (i([o, ...n]), t(""), s(""));
        }
      };
    return g.jsx("section", {
      className:
        "py-20 px-4 bg-gradient-to-b from-wedding-secondary to-white overflow-hidden",
      children: g.jsxs("div", {
        className: "container mx-auto max-w-6xl",
        children: [
          g.jsxs(H.div, {
            "data-aos": "fade-up",
            className: "text-center mb-16",
            children: [
              g.jsx("h2", {
                className:
                  "font-script text-5xl md:text-6xl text-wedding-gold mb-4",
                children: "Tùy bút",
              }),
              g.jsx("div", {
                className: "w-24 h-1 bg-wedding-primary mx-auto mb-6",
              }),
              g.jsx("p", {
                className: "text-gray-600 font-serif text-lg",
                children: "Gửi lời chúc đến cô dâu và chú rể",
              }),
            ],
          }),
          g.jsx(H.div, {
            "data-aos": "zoom-in",
            className:
              "bg-white rounded-xl shadow-xl p-4 md:p-6 mb-12 max-w-2xl mx-auto border border-wedding-gold/20",
            children: g.jsxs("form", {
              onSubmit: l,
              className: "space-y-3 md:space-y-4",
              children: [
                g.jsx("div", {
                  children: g.jsx("input", {
                    type: "text",
                    value: a,
                    onChange: (r) => s(r.target.value),
                    placeholder: "Tên của bạn...",
                    className:
                      "w-full px-4 py-2.5 md:px-5 md:py-3 border border-wedding-secondary rounded-lg focus:outline-none focus:border-wedding-gold transition-all text-sm md:text-base",
                    required: !0,
                  }),
                }),
                g.jsx("div", {
                  children: g.jsx("textarea", {
                    value: e,
                    onChange: (r) => t(r.target.value),
                    placeholder: "Gửi lời chúc...",
                    rows: "3",
                    className:
                      "w-full px-4 py-2.5 md:px-5 md:py-3 border border-wedding-secondary rounded-lg focus:outline-none focus:border-wedding-gold transition-all resize-none text-sm md:text-base",
                    required: !0,
                  }),
                }),
                g.jsxs("div", {
                  className: "flex justify-between items-center pt-2",
                  children: [
                    g.jsx(H.button, {
                      type: "button",
                      whileTap: { scale: 1.2 },
                      className:
                        "text-wedding-primary hover:text-red-500 transition-colors",
                      title: "Bắn tim",
                      children: g.jsx(hi, {
                        className: "text-2xl md:text-3xl",
                      }),
                    }),
                    g.jsxs(H.button, {
                      type: "submit",
                      whileHover: { scale: 1.05 },
                      whileTap: { scale: 0.95 },
                      className:
                        "bg-gradient-to-r from-wedding-gold to-wedding-primary text-white px-6 py-2.5 md:px-8 md:py-3 rounded-full font-serif text-sm md:text-base flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all",
                      children: [
                        g.jsx("span", { children: "Gửi lời chúc" }),
                        g.jsx(cE, { className: "text-sm md:text-base" }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
          g.jsx("div", {
            className: "relative",
            children: g.jsx(H.div, {
              initial: { opacity: 0, y: 50 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: !0 },
              transition: { duration: 0.8 },
              children: g.jsx(Pr, {
                effect: "coverflow",
                grabCursor: !0,
                centeredSlides: !0,
                slidesPerView: "auto",
                coverflowEffect: {
                  rotate: 15,
                  stretch: 0,
                  depth: 200,
                  modifier: 1.5,
                  slideShadows: !0,
                },
                autoplay: { delay: 3e3, disableOnInteraction: !1 },
                pagination: { clickable: !0, dynamicBullets: !0 },
                breakpoints: {
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                },
                modules: [sd, K4, ad],
                className: "mySwiper pb-16",
                children: n.map((r, o) =>
                  g.jsx(
                    Qr,
                    {
                      className: "!w-[90%] md:!w-[350px]",
                      children: g.jsxs(H.div, {
                        initial: { scale: 0.8, opacity: 0 },
                        whileInView: { scale: 1, opacity: 1 },
                        viewport: { once: !0 },
                        transition: { duration: 0.5, delay: o * 0.1 },
                        className:
                          "bg-gradient-to-br from-white to-wedding-secondary rounded-2xl shadow-xl p-8 h-full hover:shadow-2xl transition-all duration-300 border border-wedding-gold/20",
                        children: [
                          g.jsxs("div", {
                            className: "flex items-start space-x-4 mb-4",
                            children: [
                              g.jsx(H.div, {
                                whileHover: { rotate: 360 },
                                transition: { duration: 0.6 },
                                className:
                                  "w-14 h-14 bg-gradient-to-br from-wedding-gold to-wedding-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-lg",
                                children: g.jsx("span", {
                                  className: "text-white font-bold text-lg",
                                  children: r.avatar,
                                }),
                              }),
                              g.jsxs("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                  g.jsx("h4", {
                                    className:
                                      "font-serif text-xl text-gray-800 font-semibold truncate",
                                    children: r.name,
                                  }),
                                  g.jsx("span", {
                                    className:
                                      "text-xs text-gray-500 font-sans",
                                    children: r.time,
                                  }),
                                ],
                              }),
                            ],
                          }),
                          g.jsxs("div", {
                            className: "relative",
                            children: [
                              g.jsx(hi, {
                                className:
                                  "absolute -top-2 -left-2 text-wedding-primary opacity-20 text-3xl",
                              }),
                              g.jsxs("p", {
                                className:
                                  "text-gray-700 leading-relaxed font-serif text-base relative z-10 line-clamp-6",
                                children: ['"', r.text, '"'],
                              }),
                            ],
                          }),
                          g.jsx("div", {
                            className: "absolute bottom-4 right-4",
                            children: g.jsx(hi, {
                              className:
                                "text-wedding-gold opacity-30 text-2xl",
                            }),
                          }),
                        ],
                      }),
                    },
                    o,
                  ),
                ),
              }),
            }),
          }),
          g.jsx(H.div, {
            initial: { scale: 0 },
            whileInView: { scale: 1, rotate: 360 },
            viewport: { once: !0 },
            transition: { duration: 1, delay: 0.5 },
            className:
              "absolute top-20 left-10 w-20 h-20 border-2 border-wedding-gold rounded-full opacity-20",
          }),
          g.jsx(H.div, {
            initial: { scale: 0 },
            whileInView: { scale: 1, rotate: -360 },
            viewport: { once: !0 },
            transition: { duration: 1, delay: 0.7 },
            className:
              "absolute bottom-20 right-10 w-16 h-16 border-2 border-wedding-gold rounded-full opacity-20",
          }),
        ],
      }),
    });
  },
  iM = "/assets/ck-BUE7Y6-7.png",
  aM = () => {
    const [e, t] = L.useState({ name: "", attendance: "", companion: "" }),
      [n, i] = L.useState(!1),
      [a, s] = L.useState(!1),
      l = (o) => {
        (o.preventDefault(),
          console.log("RSVP Submitted:", e),
          i(!0),
          setTimeout(() => {
            (i(!1), t({ name: "", attendance: "", companion: "" }));
          }, 3e3));
      },
      r = (o) => {
        t({ ...e, [o.target.name]: o.target.value });
      };
    return g.jsxs("section", {
      className:
        "py-16 md:py-20 px-4 relative overflow-hidden min-h-screen flex items-center",
      children: [
        g.jsxs("div", {
          className: "absolute inset-0",
          children: [
            g.jsx("img", {
              src: pa,
              alt: "RSVP Background",
              className: "w-full h-full object-cover",
            }),
            g.jsx("div", {
              className:
                "absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60",
            }),
          ],
        }),
        g.jsxs("div", {
          className: "container mx-auto max-w-2xl relative z-10",
          children: [
            g.jsxs(H.div, {
              "data-aos": "fade-up",
              className: "text-center mb-10 md:mb-12",
              children: [
                g.jsx("h2", {
                  className:
                    "font-script text-4xl md:text-5xl lg:text-6xl text-white mb-4 drop-shadow-2xl",
                  children: "Xác nhận tham dự",
                }),
                g.jsx("div", {
                  className: "w-24 h-1 bg-wedding-gold mx-auto mb-4 md:mb-6",
                }),
                g.jsx("p", {
                  className:
                    "text-white text-sm md:text-base px-4 drop-shadow-lg",
                  children:
                    "Rất vui được đón tiếp bạn tại lễ cưới của chúng mình",
                }),
              ],
            }),
            g.jsx(H.div, {
              "data-aos": "zoom-in",
              className:
                "bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-2xl p-5 md:p-8 lg:p-10 border-2 border-wedding-gold/30",
              children: n
                ? g.jsxs(H.div, {
                    initial: { scale: 0 },
                    animate: { scale: 1 },
                    className: "text-center py-12",
                    children: [
                      g.jsx(sE, {
                        className: "text-6xl text-green-500 mx-auto mb-4",
                      }),
                      g.jsx("h3", {
                        className: "text-2xl font-serif text-gray-800 mb-2",
                        children: "Cảm ơn bạn!",
                      }),
                      g.jsx("p", {
                        className: "text-gray-600",
                        children: "Chúng mình đã nhận được phản hồi của bạn.",
                      }),
                    ],
                  })
                : g.jsxs("form", {
                    onSubmit: l,
                    className: "space-y-4 md:space-y-6",
                    children: [
                      g.jsxs("div", {
                        children: [
                          g.jsxs("label", {
                            htmlFor: "name",
                            className: "block text-gray-700 font-serif mb-2",
                            children: [
                              "Họ và tên ",
                              g.jsx("span", {
                                className: "text-red-500",
                                children: "*",
                              }),
                            ],
                          }),
                          g.jsx("input", {
                            type: "text",
                            id: "name",
                            name: "name",
                            value: e.name,
                            onChange: r,
                            required: !0,
                            className:
                              "w-full px-4 py-2.5 md:py-3 border-2 border-wedding-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-primary transition-all text-sm md:text-base",
                            placeholder: "Nhập họ và tên của bạn",
                          }),
                        ],
                      }),
                      g.jsxs("div", {
                        children: [
                          g.jsxs("label", {
                            htmlFor: "attendance",
                            className: "block text-gray-700 font-serif mb-2",
                            children: [
                              "Bạn sẽ tham dự chứ? ",
                              g.jsx("span", {
                                className: "text-red-500",
                                children: "*",
                              }),
                            ],
                          }),
                          g.jsxs("select", {
                            id: "attendance",
                            name: "attendance",
                            value: e.attendance,
                            onChange: r,
                            required: !0,
                            className:
                              "w-full px-4 py-2.5 md:py-3 border-2 border-wedding-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-primary transition-all text-sm md:text-base bg-white",
                            children: [
                              g.jsx("option", {
                                value: "",
                                children: "Chọn một lựa chọn...",
                              }),
                              g.jsx("option", {
                                value: "yes",
                                children: "Có, tôi sẽ tham dự",
                              }),
                              g.jsx("option", {
                                value: "no",
                                children: "Tôi bận, rất tiếc không thể tham dự",
                              }),
                            ],
                          }),
                        ],
                      }),
                      g.jsxs("div", {
                        children: [
                          g.jsx("label", {
                            htmlFor: "companion",
                            className: "block text-gray-700 font-serif mb-2",
                            children: "Bạn sẽ tham dự với ai nè?",
                          }),
                          g.jsx("input", {
                            type: "text",
                            id: "companion",
                            name: "companion",
                            value: e.companion,
                            onChange: r,
                            className:
                              "w-full px-4 py-2.5 md:py-3 border-2 border-wedding-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-primary transition-all text-sm md:text-base",
                            placeholder:
                              "Ví dụ: Gia đình, bạn bè, người yêu...",
                          }),
                        ],
                      }),
                      g.jsx(H.button, {
                        type: "submit",
                        whileHover: { scale: 1.05 },
                        whileTap: { scale: 0.95 },
                        className:
                          "w-full bg-gradient-to-r from-wedding-gold to-wedding-primary text-white py-3 md:py-4 rounded-lg font-serif text-base md:text-lg shadow-lg hover:shadow-xl transition-all",
                        children: "Gửi xác nhận",
                      }),
                    ],
                  }),
            }),
            g.jsx(H.div, {
              "data-aos": "fade-up",
              "data-aos-delay": "200",
              className: "mt-6 text-center",
              children: g.jsxs("div", {
                className: "relative inline-block",
                children: [
                  g.jsx(H.div, {
                    className: "absolute inset-0 bg-wedding-gold/30 rounded-lg",
                    animate: { scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] },
                    transition: {
                      duration: 2,
                      repeat: 1 / 0,
                      ease: "easeInOut",
                    },
                  }),
                  g.jsx(H.div, {
                    className: "absolute inset-0 bg-wedding-gold/20 rounded-lg",
                    animate: { scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] },
                    transition: {
                      duration: 2,
                      repeat: 1 / 0,
                      ease: "easeInOut",
                      delay: 0.5,
                    },
                  }),
                  g.jsxs(H.button, {
                    onClick: () => s(!0),
                    whileHover: { scale: 1.05 },
                    whileTap: { scale: 0.95 },
                    className:
                      "relative inline-flex items-center gap-3 px-8 py-3 md:py-4 bg-white/95 backdrop-blur-sm text-wedding-gold border-2 border-wedding-gold/50 font-serif text-base md:text-lg rounded-lg shadow-xl hover:shadow-2xl hover:bg-wedding-gold hover:text-white transition-all duration-300",
                    children: [
                      g.jsx(rE, { className: "text-xl md:text-2xl" }),
                      g.jsx("span", { children: "Gửi quà mừng" }),
                    ],
                  }),
                ],
              }),
            }),
            g.jsx(ny, {
              children:
                a &&
                g.jsx(H.div, {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  className:
                    "fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4",
                  onClick: () => s(!1),
                  children: g.jsxs(H.div, {
                    initial: { scale: 0.8, opacity: 0 },
                    animate: { scale: 1, opacity: 1 },
                    exit: { scale: 0.8, opacity: 0 },
                    onClick: (o) => o.stopPropagation(),
                    className:
                      "relative bg-white rounded-2xl shadow-2xl max-w-md w-full",
                    children: [
                      g.jsx("button", {
                        onClick: () => s(!1),
                        className:
                          "absolute top-3 right-3 z-10 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg",
                        children: g.jsx(Ky, { className: "text-lg" }),
                      }),
                      g.jsxs("div", {
                        className:
                          "relative h-32 rounded-t-2xl overflow-hidden",
                        children: [
                          g.jsx("img", {
                            src: pa,
                            alt: "Gift Header",
                            className: "w-full h-full object-cover",
                          }),
                          g.jsx("div", {
                            className:
                              "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-3",
                            children: g.jsx("h3", {
                              className:
                                "font-script text-2xl text-white drop-shadow-2xl",
                              children: "Gửi quà mừng",
                            }),
                          }),
                        ],
                      }),
                      g.jsxs("div", {
                        className: "p-6",
                        children: [
                          g.jsx("p", {
                            className: "text-center text-gray-700 text-sm mb-4",
                            children:
                              "Sự hiện diện của bạn là món quà lớn nhất!",
                          }),
                          g.jsx("p", {
                            className:
                              "text-gray-600 text-sm md:text-base leading-relaxed text-center",
                            children:
                              "Tuy nhiên, nếu bạn muốn gửi lời chúc mừng bằng một món quà nhỏ, chúng mình xin trân trọng nhận qua thông tin bên dưới:",
                          }),
                          g.jsxs("div", {
                            className:
                              "flex flex-col items-center bg-wedding-cream/30 rounded-xl p-4",
                            children: [
                              g.jsx("div", {
                                className:
                                  "bg-white p-3 rounded-lg shadow-md mb-3",
                                children: g.jsx("img", {
                                  src: iM,
                                  alt: "QR Code",
                                  className: "w-40 h-40 object-contain",
                                }),
                              }),
                              g.jsx("p", {
                                className:
                                  "text-gray-700 font-serif text-sm font-semibold mb-2",
                                children: "Quét mã QR để chuyển khoản",
                              }),
                              g.jsxs("div", {
                                className:
                                  "text-gray-600 text-xs text-center space-y-0.5",
                                children: [
                                  g.jsx("p", {
                                    children: g.jsx("span", {
                                      className: "font-semibold",
                                      children: "Vietcombank",
                                    }),
                                  }),
                                  g.jsx("p", {
                                    children: g.jsx("span", {
                                      className: "font-semibold",
                                      children: "1024780734",
                                    }),
                                  }),
                                  g.jsx("p", {
                                    children: g.jsx("span", {
                                      className: "font-semibold",
                                      children: "Nguyễn Mai Anh",
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          g.jsx("p", {
                            className:
                              "mt-4 text-center font-script text-xl text-wedding-gold",
                            children: "Cảm ơn bạn!",
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
            }),
          ],
        }),
      ],
    });
  },
  sM = () => {
    const [e, t] = L.useState(!1),
      n = L.useRef(null),
      i = L.useRef(!1);
    L.useEffect(() => {
      const s = n.current;
      if (!s) return;
      const l = () => t(!0),
        r = () => t(!1);
      (s.addEventListener("play", l), s.addEventListener("pause", r));
      const u = setTimeout(() => {
        i.current ||
          ((i.current = !0),
          s.play().catch(() => {
            const c = () => {
              s.play().catch((f) => console.log("Play failed:", f));
            };
            (document.addEventListener("click", c, { once: !0 }),
              document.addEventListener("touchstart", c, { once: !0 }));
          }));
      }, 500);
      return () => {
        (clearTimeout(u),
          s.removeEventListener("play", l),
          s.removeEventListener("pause", r));
      };
    }, []);
    const a = () => {
      n.current && (e ? n.current.pause() : n.current.play(), t(!e));
    };
    return g.jsxs(g.Fragment, {
      children: [
        g.jsx("audio", { ref: n, loop: !0, src: "/wedding-music.mp3" }),
        g.jsx(H.button, {
          onClick: a,
          whileHover: { scale: 1.1 },
          whileTap: { scale: 0.9 },
          className:
            "fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-wedding-gold to-wedding-primary rounded-full flex items-center justify-center text-white shadow-2xl",
          initial: { scale: 0, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { delay: 0.5 },
          children: g.jsx(H.div, {
            animate: e ? { rotate: 360 } : { rotate: 0 },
            transition: { duration: 3, repeat: e ? 1 / 0 : 0, ease: "linear" },
            children: g.jsx(uE, { className: "text-2xl md:text-3xl" }),
          }),
        }),
      ],
    });
  };
function lM() {
  return (
    L.useEffect(() => {
      g2.init({ duration: 1e3, once: !0, offset: 100 });
    }, []),
    g.jsxs("div", {
      className: "min-h-screen bg-wedding-cream",
      children: [
        g.jsx(sM, {}),
        g.jsx(dE, {}),
        g.jsx(mE, {}),
        g.jsx($4, {}),
        g.jsx(J4, {}),
        g.jsx(W4, {}),
        g.jsx(eM, {}),
        g.jsx(tM, {}),
        g.jsx(aM, {}),
        g.jsx(nM, {}),
        g.jsxs("footer", {
          className: "relative py-16 md:py-20 text-white overflow-hidden",
          children: [
            g.jsxs("div", {
              className: "absolute inset-0",
              children: [
                g.jsx("img", {
                  src: g1,
                  alt: "Footer Background",
                  className: "w-full h-full object-cover",
                }),
                g.jsx("div", {
                  className:
                    "absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/70",
                }),
              ],
            }),
            g.jsxs("div", {
              className:
                "relative z-10 container mx-auto max-w-4xl px-4 text-center",
              children: [
                g.jsxs("div", {
                  className: "mb-8",
                  children: [
                    g.jsx("h3", {
                      className:
                        "font-script text-4xl md:text-5xl lg:text-6xl text-wedding-gold mb-4 drop-shadow-2xl",
                      children: "Thank You",
                    }),
                    g.jsx("div", {
                      className: "w-24 h-1 bg-wedding-gold mx-auto mb-6",
                    }),
                    g.jsx("p", {
                      className:
                        "font-serif text-lg md:text-xl text-white/90 leading-relaxed mb-4",
                      children:
                        "Cảm ơn bạn đã dành thời gian xem thiệp mời của chúng mình",
                    }),
                    g.jsx("p", {
                      className:
                        "font-serif text-base md:text-lg text-white/80 leading-relaxed",
                      children:
                        "Sự hiện diện của bạn sẽ là niềm vui và hạnh phúc lớn nhất trong ngày trọng đại của chúng mình",
                    }),
                  ],
                }),
                g.jsx("div", {
                  className: "mb-8",
                  children: g.jsx("p", {
                    className:
                      "font-script text-3xl md:text-4xl text-white drop-shadow-lg",
                    children: "Mai Anh & Minh Quân",
                  }),
                }),
                g.jsxs("div", {
                  className: "flex items-center justify-center gap-4 mb-8",
                  children: [
                    g.jsx("div", { className: "w-16 h-px bg-wedding-gold/50" }),
                    g.jsx("span", {
                      className: "text-wedding-gold text-2xl",
                      children: "❤",
                    }),
                    g.jsx("div", { className: "w-16 h-px bg-wedding-gold/50" }),
                  ],
                }),
                g.jsx("div", {
                  className: "mb-8",
                  children: g.jsx("p", {
                    className: "text-white/80 text-sm md:text-base",
                    children: "12.10.2025 • Trung tâm tiệc cưới VHC Devstack",
                  }),
                }),
                g.jsxs("div", {
                  className: "border-t border-white/20 pt-6",
                  children: [
                    g.jsx("p", {
                      className:
                        "text-xs md:text-sm text-white/60 font-sans tracking-wider mb-2",
                      children:
                        "© 2025 Mai Anh & Minh Quân Wedding Invitation",
                    }),
                    g.jsx("p", {
                      className: "text-xs text-white/50",
                      children: "Made with Love • Designed for our special day",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    })
  );
}
m2.createRoot(document.getElementById("root")).render(
  g.jsx(L.StrictMode, { children: g.jsx(lM, {}) }),
);
