/*!
 * Bootstrap  v5.3.2 (https://github.com/IrfanGhuori/bootstrap-extra-7.8)
 * Copyright 2011-2024 The Bootstrap Authors
 * Licensed under MIT (https://github.com/IrfanGhuori/bootstrap-extra-7.8/blob/master/LICENSE)
 */
var $videoSrc;
!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = e(require("@popperjs/core")))
        : "function" == typeof define && define.amd
        ? define(["@popperjs/core"], e)
        : ((t = "undefined" != typeof globalThis ? globalThis : t || self).bootstrap = e(t.Popper));
})(this, function (t) {
    "use strict";
    function e(t) {
        const e = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
        if (t)
            for (const i in t)
                if ("default" !== i) {
                    const s = Object.getOwnPropertyDescriptor(t, i);
                    Object.defineProperty(e, i, s.get ? s : { enumerable: !0, get: () => t[i] });
                }
        return (e.default = t), Object.freeze(e);
    }
    const i = e(t),
        s = new Map(),
        n = {
            set(t, e, i) {
                s.has(t) || s.set(t, new Map());
                const n = s.get(t);
                n.has(e) || 0 === n.size ? n.set(e, i) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`);
            },
            get: (t, e) => (s.has(t) && s.get(t).get(e)) || null,
            remove(t, e) {
                if (!s.has(t)) return;
                const i = s.get(t);
                i.delete(e), 0 === i.size && s.delete(t);
            },
        },
        o = "transitionend",
        r = (t) => (t && window.CSS && window.CSS.escape && (t = t.replace(/#([^\s"#']+)/g, (t, e) => `#${CSS.escape(e)}`)), t),
        a = (t) => {
            t.dispatchEvent(new Event(o));
        },
        l = (t) => !(!t || "object" != typeof t) && (void 0 !== t.jquery && (t = t[0]), void 0 !== t.nodeType),
        c = (t) => (l(t) ? (t.jquery ? t[0] : t) : "string" == typeof t && t.length > 0 ? document.querySelector(r(t)) : null),
        h = (t) => {
            if (!l(t) || 0 === t.getClientRects().length) return !1;
            const e = "visible" === getComputedStyle(t).getPropertyValue("visibility"),
                i = t.closest("details:not([open])");
            if (!i) return e;
            if (i !== t) {
                const e = t.closest("summary");
                if (e && e.parentNode !== i) return !1;
                if (null === e) return !1;
            }
            return e;
        },
        d = (t) => !t || t.nodeType !== Node.ELEMENT_NODE || !!t.classList.contains("disabled") || (void 0 !== t.disabled ? t.disabled : t.hasAttribute("disabled") && "false" !== t.getAttribute("disabled")),
        u = (t) => {
            if (!document.documentElement.attachShadow) return null;
            if ("function" == typeof t.getRootNode) {
                const e = t.getRootNode();
                return e instanceof ShadowRoot ? e : null;
            }
            return t instanceof ShadowRoot ? t : t.parentNode ? u(t.parentNode) : null;
        },
        g = () => {},
        f = (t) => {
            t.offsetHeight;
        },
        m = () => (window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null),
        p = [],
        _ = () => "rtl" === document.documentElement.dir,
        b = (t) => {
            var e;
            (e = () => {
                const e = m();
                if (e) {
                    const i = t.NAME,
                        s = e.fn[i];
                    (e.fn[i] = t.jQueryInterface), (e.fn[i].Constructor = t), (e.fn[i].noConflict = () => ((e.fn[i] = s), t.jQueryInterface));
                }
            }),
                "loading" === document.readyState
                    ? (p.length ||
                          document.addEventListener("DOMContentLoaded", () => {
                              for (const t of p) t();
                          }),
                      p.push(e))
                    : e();
        },
        v = (t, e = [], i = t) => ("function" == typeof t ? t(...e) : i),
        y = (t, e, i = !0) => {
            if (!i) return void v(t);
            const s =
                ((t) => {
                    if (!t) return 0;
                    let { transitionDuration: e, transitionDelay: i } = window.getComputedStyle(t);
                    const s = Number.parseFloat(e),
                        n = Number.parseFloat(i);
                    return s || n ? ((e = e.split(",")[0]), (i = i.split(",")[0]), 1e3 * (Number.parseFloat(e) + Number.parseFloat(i))) : 0;
                })(e) + 5;
            let n = !1;
            const r = ({ target: i }) => {
                i === e && ((n = !0), e.removeEventListener(o, r), v(t));
            };
            e.addEventListener(o, r),
                setTimeout(() => {
                    n || a(e);
                }, s);
        },
        w = (t, e, i, s) => {
            const n = t.length;
            let o = t.indexOf(e);
            return -1 === o ? (!i && s ? t[n - 1] : t[0]) : ((o += i ? 1 : -1), s && (o = (o + n) % n), t[Math.max(0, Math.min(o, n - 1))]);
        },
        A = /[^.]*(?=\..*)\.|.*/,
        C = /\..*/,
        E = /::\d+$/,
        $ = {};
    let T = 1;
    const k = { mouseenter: "mouseover", mouseleave: "mouseout" },
        S = new Set([
            "click",
            "dblclick",
            "mouseup",
            "mousedown",
            "contextmenu",
            "mousewheel",
            "DOMMouseScroll",
            "mouseover",
            "mouseout",
            "mousemove",
            "selectstart",
            "selectend",
            "keydown",
            "keypress",
            "keyup",
            "orientationchange",
            "touchstart",
            "touchmove",
            "touchend",
            "touchcancel",
            "pointerdown",
            "pointermove",
            "pointerup",
            "pointerleave",
            "pointercancel",
            "gesturestart",
            "gesturechange",
            "gestureend",
            "focus",
            "blur",
            "change",
            "reset",
            "select",
            "submit",
            "focusin",
            "focusout",
            "load",
            "unload",
            "beforeunload",
            "resize",
            "move",
            "DOMContentLoaded",
            "readystatechange",
            "error",
            "abort",
            "scroll",
        ]);
    function I(t, e) {
        return (e && `${e}::${T++}`) || t.uidEvent || T++;
    }
    function L(t) {
        const e = I(t);
        return (t.uidEvent = e), ($[e] = $[e] || {}), $[e];
    }
    function x(t, e, i = null) {
        return Object.values(t).find((t) => t.callable === e && t.delegationSelector === i);
    }
    function O(t, e, i) {
        const s = "string" == typeof e,
            n = s ? i : e || i;
        let o = P(t);
        return S.has(o) || (o = t), [s, n, o];
    }
    function D(t, e, i, s, n) {
        if ("string" != typeof e || !t) return;
        let [o, r, a] = O(e, i, s);
        if (e in k) {
            const t = (t) =>
                function (e) {
                    if (!e.relatedTarget || (e.relatedTarget !== e.delegateTarget && !e.delegateTarget.contains(e.relatedTarget))) return t.call(this, e);
                };
            r = t(r);
        }
        const l = L(t),
            c = l[a] || (l[a] = {}),
            h = x(c, r, o ? i : null);
        if (h) return void (h.oneOff = h.oneOff && n);
        const d = I(r, e.replace(A, "")),
            u = o
                ? (function (t, e, i) {
                      return function s(n) {
                          const o = t.querySelectorAll(e);
                          for (let { target: r } = n; r && r !== this; r = r.parentNode) for (const a of o) if (a === r) return F(n, { delegateTarget: r }), s.oneOff && j.off(t, n.type, e, i), i.apply(r, [n]);
                      };
                  })(t, i, r)
                : (function (t, e) {
                      return function i(s) {
                          return F(s, { delegateTarget: t }), i.oneOff && j.off(t, s.type, e), e.apply(t, [s]);
                      };
                  })(t, r);
        (u.delegationSelector = o ? i : null), (u.callable = r), (u.oneOff = n), (u.uidEvent = d), (c[d] = u), t.addEventListener(a, u, o);
    }
    function N(t, e, i, s, n) {
        const o = x(e[i], s, n);
        o && (t.removeEventListener(i, o, Boolean(n)), delete e[i][o.uidEvent]);
    }
    function M(t, e, i, s) {
        const n = e[i] || {};
        for (const [o, r] of Object.entries(n)) o.includes(s) && N(t, e, i, r.callable, r.delegationSelector);
    }
    function P(t) {
        return (t = t.replace(C, "")), k[t] || t;
    }
    const j = {
        on(t, e, i, s) {
            D(t, e, i, s, !1);
        },
        one(t, e, i, s) {
            D(t, e, i, s, !0);
        },
        off(t, e, i, s) {
            if ("string" != typeof e || !t) return;
            const [n, o, r] = O(e, i, s),
                a = r !== e,
                l = L(t),
                c = l[r] || {},
                h = e.startsWith(".");
            if (void 0 === o) {
                if (h) for (const i of Object.keys(l)) M(t, l, i, e.slice(1));
                for (const [i, s] of Object.entries(c)) {
                    const n = i.replace(E, "");
                    (a && !e.includes(n)) || N(t, l, r, s.callable, s.delegationSelector);
                }
            } else {
                if (!Object.keys(c).length) return;
                N(t, l, r, o, n ? i : null);
            }
        },
        trigger(t, e, i) {
            if ("string" != typeof e || !t) return null;
            const s = m();
            let n = null,
                o = !0,
                r = !0,
                a = !1;
            e !== P(e) && s && ((n = s.Event(e, i)), s(t).trigger(n), (o = !n.isPropagationStopped()), (r = !n.isImmediatePropagationStopped()), (a = n.isDefaultPrevented()));
            const l = F(new Event(e, { bubbles: o, cancelable: !0 }), i);
            return a && l.preventDefault(), r && t.dispatchEvent(l), l.defaultPrevented && n && n.preventDefault(), l;
        },
    };
    function F(t, e = {}) {
        for (const [i, s] of Object.entries(e))
            try {
                t[i] = s;
            } catch (e) {
                Object.defineProperty(t, i, { configurable: !0, get: () => s });
            }
        return t;
    }
    function H(t) {
        if ("true" === t) return !0;
        if ("false" === t) return !1;
        if (t === Number(t).toString()) return Number(t);
        if ("" === t || "null" === t) return null;
        if ("string" != typeof t) return t;
        try {
            return JSON.parse(decodeURIComponent(t));
        } catch (e) {
            return t;
        }
    }
    function z(t) {
        return t.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
    }
    const B = {
        setDataAttribute(t, e, i) {
            t.setAttribute(`data-bs-${z(e)}`, i);
        },
        removeDataAttribute(t, e) {
            t.removeAttribute(`data-bs-${z(e)}`);
        },
        getDataAttributes(t) {
            if (!t) return {};
            const e = {},
                i = Object.keys(t.dataset).filter((t) => t.startsWith("bs") && !t.startsWith("bsConfig"));
            for (const s of i) {
                let i = s.replace(/^bs/, "");
                (i = i.charAt(0).toLowerCase() + i.slice(1, i.length)), (e[i] = H(t.dataset[s]));
            }
            return e;
        },
        getDataAttribute: (t, e) => H(t.getAttribute(`data-bs-${z(e)}`)),
    };
    class q {
        static get Default() {
            return {};
        }
        static get DefaultType() {
            return {};
        }
        static get NAME() {
            throw new Error('You have to implement the static method "NAME", for each component!');
        }
        _getConfig(t) {
            return (t = this._mergeConfigObj(t)), (t = this._configAfterMerge(t)), this._typeCheckConfig(t), t;
        }
        _configAfterMerge(t) {
            return t;
        }
        _mergeConfigObj(t, e) {
            const i = l(e) ? B.getDataAttribute(e, "config") : {};
            return { ...this.constructor.Default, ...("object" == typeof i ? i : {}), ...(l(e) ? B.getDataAttributes(e) : {}), ...("object" == typeof t ? t : {}) };
        }
        _typeCheckConfig(t, e = this.constructor.DefaultType) {
            for (const [s, n] of Object.entries(e)) {
                const e = t[s],
                    o = l(e)
                        ? "element"
                        : null == (i = e)
                        ? `${i}`
                        : Object.prototype.toString
                              .call(i)
                              .match(/\s([a-z]+)/i)[1]
                              .toLowerCase();
                if (!new RegExp(n).test(o)) throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${s}" provided type "${o}" but expected type "${n}".`);
            }
            var i;
        }
    }
    class R extends q {
        constructor(t, e) {
            super(), (t = c(t)) && ((this._element = t), (this._config = this._getConfig(e)), n.set(this._element, this.constructor.DATA_KEY, this));
        }
        dispose() {
            n.remove(this._element, this.constructor.DATA_KEY), j.off(this._element, this.constructor.EVENT_KEY);
            for (const t of Object.getOwnPropertyNames(this)) this[t] = null;
        }
        _queueCallback(t, e, i = !0) {
            y(t, e, i);
        }
        _getConfig(t) {
            return (t = this._mergeConfigObj(t, this._element)), (t = this._configAfterMerge(t)), this._typeCheckConfig(t), t;
        }
        static getInstance(t) {
            return n.get(c(t), this.DATA_KEY);
        }
        static getOrCreateInstance(t, e = {}) {
            return this.getInstance(t) || new this(t, "object" == typeof e ? e : null);
        }
        static get VERSION() {
            return "5.3.2";
        }
        static get DATA_KEY() {
            return `bs.${this.NAME}`;
        }
        static get EVENT_KEY() {
            return `.${this.DATA_KEY}`;
        }
        static eventName(t) {
            return `${t}${this.EVENT_KEY}`;
        }
    }
    const W = (t) => {
            let e = t.getAttribute("data-bs-target");
            if (!e || "#" === e) {
                let i = t.getAttribute("href");
                if (!i || (!i.includes("#") && !i.startsWith("."))) return null;
                i.includes("#") && !i.startsWith("#") && (i = `#${i.split("#")[1]}`), (e = i && "#" !== i ? r(i.trim()) : null);
            }
            return e;
        },
        Q = {
            find: (t, e = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(e, t)),
            findOne: (t, e = document.documentElement) => Element.prototype.querySelector.call(e, t),
            children: (t, e) => [].concat(...t.children).filter((t) => t.matches(e)),
            parents(t, e) {
                const i = [];
                let s = t.parentNode.closest(e);
                for (; s; ) i.push(s), (s = s.parentNode.closest(e));
                return i;
            },
            prev(t, e) {
                let i = t.previousElementSibling;
                for (; i; ) {
                    if (i.matches(e)) return [i];
                    i = i.previousElementSibling;
                }
                return [];
            },
            next(t, e) {
                let i = t.nextElementSibling;
                for (; i; ) {
                    if (i.matches(e)) return [i];
                    i = i.nextElementSibling;
                }
                return [];
            },
            focusableChildren(t) {
                const e = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((t) => `${t}:not([tabindex^="-"])`).join(",");
                return this.find(e, t).filter((t) => !d(t) && h(t));
            },
            getSelectorFromElement(t) {
                const e = W(t);
                return e && Q.findOne(e) ? e : null;
            },
            getElementFromSelector(t) {
                const e = W(t);
                return e ? Q.findOne(e) : null;
            },
            getMultipleElementsFromSelector(t) {
                const e = W(t);
                return e ? Q.find(e) : [];
            },
        },
        K = (t, e = "hide") => {
            const i = `click.dismiss${t.EVENT_KEY}`,
                s = t.NAME;
            j.on(document, i, `[data-bs-dismiss="${s}"]`, function (i) {
                if ((["A", "AREA"].includes(this.tagName) && i.preventDefault(), d(this))) return;
                const n = Q.getElementFromSelector(this) || this.closest(`.${s}`);
                t.getOrCreateInstance(n)[e]();
            });
        },
        V = ".bs.alert",
        X = `close${V}`,
        Y = `closed${V}`;
    class U extends R {
        static get NAME() {
            return "alert";
        }
        close() {
            if (j.trigger(this._element, X).defaultPrevented) return;
            this._element.classList.remove("show");
            const t = this._element.classList.contains("fade");
            this._queueCallback(() => this._destroyElement(), this._element, t);
        }
        _destroyElement() {
            this._element.remove(), j.trigger(this._element, Y), this.dispose();
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = U.getOrCreateInstance(this);
                if ("string" == typeof t) {
                    if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                    e[t](this);
                }
            });
        }
    }
    K(U, "close"), b(U);
    const G = '[data-bs-toggle="button"]';
    class J extends R {
        static get NAME() {
            return "button";
        }
        toggle() {
            this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"));
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = J.getOrCreateInstance(this);
                "toggle" === t && e[t]();
            });
        }
    }
    j.on(document, "click.bs.button.data-api", G, (t) => {
        t.preventDefault();
        const e = t.target.closest(G);
        J.getOrCreateInstance(e).toggle();
    }),
        b(J);
    const Z = ".bs.swipe",
        tt = `touchstart${Z}`,
        et = `touchmove${Z}`,
        it = `touchend${Z}`,
        st = `pointerdown${Z}`,
        nt = `pointerup${Z}`,
        ot = { endCallback: null, leftCallback: null, rightCallback: null },
        rt = { endCallback: "(function|null)", leftCallback: "(function|null)", rightCallback: "(function|null)" };
    class at extends q {
        constructor(t, e) {
            super(), (this._element = t), t && at.isSupported() && ((this._config = this._getConfig(e)), (this._deltaX = 0), (this._supportPointerEvents = Boolean(window.PointerEvent)), this._initEvents());
        }
        static get Default() {
            return ot;
        }
        static get DefaultType() {
            return rt;
        }
        static get NAME() {
            return "swipe";
        }
        dispose() {
            j.off(this._element, Z);
        }
        _start(t) {
            this._supportPointerEvents ? this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX) : (this._deltaX = t.touches[0].clientX);
        }
        _end(t) {
            this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX - this._deltaX), this._handleSwipe(), v(this._config.endCallback);
        }
        _move(t) {
            this._deltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[0].clientX - this._deltaX;
        }
        _handleSwipe() {
            const t = Math.abs(this._deltaX);
            if (t <= 40) return;
            const e = t / this._deltaX;
            (this._deltaX = 0), e && v(e > 0 ? this._config.rightCallback : this._config.leftCallback);
        }
        _initEvents() {
            this._supportPointerEvents
                ? (j.on(this._element, st, (t) => this._start(t)), j.on(this._element, nt, (t) => this._end(t)), this._element.classList.add("pointer-event"))
                : (j.on(this._element, tt, (t) => this._start(t)), j.on(this._element, et, (t) => this._move(t)), j.on(this._element, it, (t) => this._end(t)));
        }
        _eventIsPointerPenTouch(t) {
            return this._supportPointerEvents && ("pen" === t.pointerType || "touch" === t.pointerType);
        }
        static isSupported() {
            return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
        }
    }
    const lt = ".bs.carousel",
        ct = ".data-api",
        ht = "next",
        dt = "prev",
        ut = "left",
        gt = "right",
        ft = `slide${lt}`,
        mt = `slid${lt}`,
        pt = `keydown${lt}`,
        _t = `mouseenter${lt}`,
        bt = `mouseleave${lt}`,
        vt = `dragstart${lt}`,
        yt = `load${lt}${ct}`,
        wt = `click${lt}${ct}`,
        At = "carousel",
        Ct = "active",
        Et = ".active",
        $t = ".carousel-item",
        Tt = Et + $t,
        kt = { ArrowLeft: gt, ArrowRight: ut },
        St = { interval: 5e3, keyboard: !0, pause: "hover", ride: !1, touch: !0, wrap: !0 },
        It = { interval: "(number|boolean)", keyboard: "boolean", pause: "(string|boolean)", ride: "(boolean|string)", touch: "boolean", wrap: "boolean" };
    class Lt extends R {
        constructor(t, e) {
            super(t, e),
                (this._interval = null),
                (this._activeElement = null),
                (this._isSliding = !1),
                (this.touchTimeout = null),
                (this._swipeHelper = null),
                (this._indicatorsElement = Q.findOne(".carousel-indicators", this._element)),
                this._addEventListeners(),
                this._config.ride === At && this.cycle();
        }
        static get Default() {
            return St;
        }
        static get DefaultType() {
            return It;
        }
        static get NAME() {
            return "carousel";
        }
        next() {
            this._slide(ht);
        }
        nextWhenVisible() {
            !document.hidden && h(this._element) && this.next();
        }
        prev() {
            this._slide(dt);
        }
        pause() {
            this._isSliding && a(this._element), this._clearInterval();
        }
        cycle() {
            this._clearInterval(), this._updateInterval(), (this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval));
        }
        _maybeEnableCycle() {
            this._config.ride && (this._isSliding ? j.one(this._element, mt, () => this.cycle()) : this.cycle());
        }
        to(t) {
            const e = this._getItems();
            if (t > e.length - 1 || t < 0) return;
            if (this._isSliding) return void j.one(this._element, mt, () => this.to(t));
            const i = this._getItemIndex(this._getActive());
            if (i === t) return;
            const s = t > i ? ht : dt;
            this._slide(s, e[t]);
        }
        dispose() {
            this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
        }
        _configAfterMerge(t) {
            return (t.defaultInterval = t.interval), t;
        }
        _addEventListeners() {
            this._config.keyboard && j.on(this._element, pt, (t) => this._keydown(t)),
                "hover" === this._config.pause && (j.on(this._element, _t, () => this.pause()), j.on(this._element, bt, () => this._maybeEnableCycle())),
                this._config.touch && at.isSupported() && this._addTouchEventListeners();
        }
        _addTouchEventListeners() {
            for (const t of Q.find(".carousel-item img", this._element)) j.on(t, vt, (t) => t.preventDefault());
            const t = {
                leftCallback: () => this._slide(this._directionToOrder(ut)),
                rightCallback: () => this._slide(this._directionToOrder(gt)),
                endCallback: () => {
                    "hover" === this._config.pause && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), (this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), 500 + this._config.interval)));
                },
            };
            this._swipeHelper = new at(this._element, t);
        }
        _keydown(t) {
            if (/input|textarea/i.test(t.target.tagName)) return;
            const e = kt[t.key];
            e && (t.preventDefault(), this._slide(this._directionToOrder(e)));
        }
        _getItemIndex(t) {
            return this._getItems().indexOf(t);
        }
        _setActiveIndicatorElement(t) {
            if (!this._indicatorsElement) return;
            const e = Q.findOne(Et, this._indicatorsElement);
            e.classList.remove(Ct), e.removeAttribute("aria-current");
            const i = Q.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
            i && (i.classList.add(Ct), i.setAttribute("aria-current", "true"));
        }
        _updateInterval() {
            const t = this._activeElement || this._getActive();
            if (!t) return;
            const e = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
            this._config.interval = e || this._config.defaultInterval;
        }
        _slide(t, e = null) {
            if (this._isSliding) return;
            const i = this._getActive(),
                s = t === ht,
                n = e || w(this._getItems(), i, s, this._config.wrap);
            if (n === i) return;
            const o = this._getItemIndex(n),
                r = (e) => j.trigger(this._element, e, { relatedTarget: n, direction: this._orderToDirection(t), from: this._getItemIndex(i), to: o });
            if (r(ft).defaultPrevented) return;
            if (!i || !n) return;
            const a = Boolean(this._interval);
            this.pause(), (this._isSliding = !0), this._setActiveIndicatorElement(o), (this._activeElement = n);
            const l = s ? "carousel-item-start" : "carousel-item-end",
                c = s ? "carousel-item-next" : "carousel-item-prev";
            n.classList.add(c), f(n), i.classList.add(l), n.classList.add(l);
            this._queueCallback(
                () => {
                    n.classList.remove(l, c), n.classList.add(Ct), i.classList.remove(Ct, c, l), (this._isSliding = !1), r(mt);
                },
                i,
                this._isAnimated()
            ),
                a && this.cycle();
        }
        _isAnimated() {
            return this._element.classList.contains("slide");
        }
        _getActive() {
            return Q.findOne(Tt, this._element);
        }
        _getItems() {
            return Q.find($t, this._element);
        }
        _clearInterval() {
            this._interval && (clearInterval(this._interval), (this._interval = null));
        }
        _directionToOrder(t) {
            return _() ? (t === ut ? dt : ht) : t === ut ? ht : dt;
        }
        _orderToDirection(t) {
            return _() ? (t === dt ? ut : gt) : t === dt ? gt : ut;
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = Lt.getOrCreateInstance(this, t);
                if ("number" != typeof t) {
                    if ("string" == typeof t) {
                        if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                        e[t]();
                    }
                } else e.to(t);
            });
        }
    }
    j.on(document, wt, "[data-bs-slide], [data-bs-slide-to]", function (t) {
        const e = Q.getElementFromSelector(this);
        if (!e || !e.classList.contains(At)) return;
        t.preventDefault();
        const i = Lt.getOrCreateInstance(e),
            s = this.getAttribute("data-bs-slide-to");
        return s ? (i.to(s), void i._maybeEnableCycle()) : "next" === B.getDataAttribute(this, "slide") ? (i.next(), void i._maybeEnableCycle()) : (i.prev(), void i._maybeEnableCycle());
    }),
        j.on(window, yt, () => {
            const t = Q.find('[data-bs-ride="carousel"]');
            for (const e of t) Lt.getOrCreateInstance(e);
        }),
        b(Lt);
    const xt = ".bs.collapse",
        Ot = `show${xt}`,
        Dt = `shown${xt}`,
        Nt = `hide${xt}`,
        Mt = `hidden${xt}`,
        Pt = `click${xt}.data-api`,
        jt = "show",
        Ft = "collapse",
        Ht = "collapsing",
        zt = `:scope .${Ft} .${Ft}`,
        Bt = '[data-bs-toggle="collapse"]',
        qt = { parent: null, toggle: !0 },
        Rt = { parent: "(null|element)", toggle: "boolean" };
    class Wt extends R {
        constructor(t, e) {
            super(t, e), (this._isTransitioning = !1), (this._triggerArray = []);
            const i = Q.find(Bt);
            for (const t of i) {
                const e = Q.getSelectorFromElement(t),
                    i = Q.find(e).filter((t) => t === this._element);
                null !== e && i.length && this._triggerArray.push(t);
            }
            this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
        }
        static get Default() {
            return qt;
        }
        static get DefaultType() {
            return Rt;
        }
        static get NAME() {
            return "collapse";
        }
        toggle() {
            this._isShown() ? this.hide() : this.show();
        }
        show() {
            if (this._isTransitioning || this._isShown()) return;
            let t = [];
            if (
                (this._config.parent &&
                    (t = this._getFirstLevelChildren(".collapse.show, .collapse.collapsing")
                        .filter((t) => t !== this._element)
                        .map((t) => Wt.getOrCreateInstance(t, { toggle: !1 }))),
                t.length && t[0]._isTransitioning)
            )
                return;
            if (j.trigger(this._element, Ot).defaultPrevented) return;
            for (const e of t) e.hide();
            const e = this._getDimension();
            this._element.classList.remove(Ft), this._element.classList.add(Ht), (this._element.style[e] = 0), this._addAriaAndCollapsedClass(this._triggerArray, !0), (this._isTransitioning = !0);
            const i = `scroll${e[0].toUpperCase() + e.slice(1)}`;
            this._queueCallback(
                () => {
                    (this._isTransitioning = !1), this._element.classList.remove(Ht), this._element.classList.add(Ft, jt), (this._element.style[e] = ""), j.trigger(this._element, Dt);
                },
                this._element,
                !0
            ),
                (this._element.style[e] = `${this._element[i]}px`);
        }
        hide() {
            if (this._isTransitioning || !this._isShown()) return;
            if (j.trigger(this._element, Nt).defaultPrevented) return;
            const t = this._getDimension();
            (this._element.style[t] = `${this._element.getBoundingClientRect()[t]}px`), f(this._element), this._element.classList.add(Ht), this._element.classList.remove(Ft, jt);
            for (const t of this._triggerArray) {
                const e = Q.getElementFromSelector(t);
                e && !this._isShown(e) && this._addAriaAndCollapsedClass([t], !1);
            }
            this._isTransitioning = !0;
            (this._element.style[t] = ""),
                this._queueCallback(
                    () => {
                        (this._isTransitioning = !1), this._element.classList.remove(Ht), this._element.classList.add(Ft), j.trigger(this._element, Mt);
                    },
                    this._element,
                    !0
                );
        }
        _isShown(t = this._element) {
            return t.classList.contains(jt);
        }
        _configAfterMerge(t) {
            return (t.toggle = Boolean(t.toggle)), (t.parent = c(t.parent)), t;
        }
        _getDimension() {
            return this._element.classList.contains("collapse-horizontal") ? "width" : "height";
        }
        _initializeChildren() {
            if (!this._config.parent) return;
            const t = this._getFirstLevelChildren(Bt);
            for (const e of t) {
                const t = Q.getElementFromSelector(e);
                t && this._addAriaAndCollapsedClass([e], this._isShown(t));
            }
        }
        _getFirstLevelChildren(t) {
            const e = Q.find(zt, this._config.parent);
            return Q.find(t, this._config.parent).filter((t) => !e.includes(t));
        }
        _addAriaAndCollapsedClass(t, e) {
            if (t.length) for (const i of t) i.classList.toggle("collapsed", !e), i.setAttribute("aria-expanded", e);
        }
        static jQueryInterface(t) {
            const e = {};
            return (
                "string" == typeof t && /show|hide/.test(t) && (e.toggle = !1),
                this.each(function () {
                    const i = Wt.getOrCreateInstance(this, e);
                    if ("string" == typeof t) {
                        if (void 0 === i[t]) throw new TypeError(`No method named "${t}"`);
                        i[t]();
                    }
                })
            );
        }
    }
    j.on(document, Pt, Bt, function (t) {
        ("A" === t.target.tagName || (t.delegateTarget && "A" === t.delegateTarget.tagName)) && t.preventDefault();
        for (const t of Q.getMultipleElementsFromSelector(this)) Wt.getOrCreateInstance(t, { toggle: !1 }).toggle();
    }),
        b(Wt);
    const Qt = "dropdown",
        Kt = ".bs.dropdown",
        Vt = ".data-api",
        Xt = "ArrowUp",
        Yt = "ArrowDown",
        Ut = `hide${Kt}`,
        Gt = `hidden${Kt}`,
        Jt = `show${Kt}`,
        Zt = `shown${Kt}`,
        te = `click${Kt}${Vt}`,
        ee = `keydown${Kt}${Vt}`,
        ie = `keyup${Kt}${Vt}`,
        se = "show",
        ne = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
        oe = `${ne}.${se}`,
        re = ".dropdown-menu",
        ae = _() ? "top-end" : "top-start",
        le = _() ? "top-start" : "top-end",
        ce = _() ? "bottom-end" : "bottom-start",
        he = _() ? "bottom-start" : "bottom-end",
        de = _() ? "left-start" : "right-start",
        ue = _() ? "right-start" : "left-start",
        ge = { autoClose: !0, boundary: "clippingParents", display: "dynamic", offset: [0, 2], popperConfig: null, reference: "toggle" },
        fe = { autoClose: "(boolean|string)", boundary: "(string|element)", display: "string", offset: "(array|string|function)", popperConfig: "(null|object|function)", reference: "(string|element|object)" };
    class me extends R {
        constructor(t, e) {
            super(t, e), (this._popper = null), (this._parent = this._element.parentNode), (this._menu = Q.next(this._element, re)[0] || Q.prev(this._element, re)[0] || Q.findOne(re, this._parent)), (this._inNavbar = this._detectNavbar());
        }
        static get Default() {
            return ge;
        }
        static get DefaultType() {
            return fe;
        }
        static get NAME() {
            return Qt;
        }
        toggle() {
            return this._isShown() ? this.hide() : this.show();
        }
        show() {
            if (d(this._element) || this._isShown()) return;
            const t = { relatedTarget: this._element };
            if (!j.trigger(this._element, Jt, t).defaultPrevented) {
                if ((this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(".navbar-nav"))) for (const t of [].concat(...document.body.children)) j.on(t, "mouseover", g);
                this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(se), this._element.classList.add(se), j.trigger(this._element, Zt, t);
            }
        }
        hide() {
            if (d(this._element) || !this._isShown()) return;
            const t = { relatedTarget: this._element };
            this._completeHide(t);
        }
        dispose() {
            this._popper && this._popper.destroy(), super.dispose();
        }
        update() {
            (this._inNavbar = this._detectNavbar()), this._popper && this._popper.update();
        }
        _completeHide(t) {
            if (!j.trigger(this._element, Ut, t).defaultPrevented) {
                if ("ontouchstart" in document.documentElement) for (const t of [].concat(...document.body.children)) j.off(t, "mouseover", g);
                this._popper && this._popper.destroy(),
                    this._menu.classList.remove(se),
                    this._element.classList.remove(se),
                    this._element.setAttribute("aria-expanded", "false"),
                    B.removeDataAttribute(this._menu, "popper"),
                    j.trigger(this._element, Gt, t);
            }
        }
        _getConfig(t) {
            if ("object" == typeof (t = super._getConfig(t)).reference && !l(t.reference) && "function" != typeof t.reference.getBoundingClientRect)
                throw new TypeError(`${Qt.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
            return t;
        }
        _createPopper() {
            if (void 0 === i) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
            let t = this._element;
            "parent" === this._config.reference ? (t = this._parent) : l(this._config.reference) ? (t = c(this._config.reference)) : "object" == typeof this._config.reference && (t = this._config.reference);
            const e = this._getPopperConfig();
            this._popper = i.createPopper(t, this._menu, e);
        }
        _isShown() {
            return this._menu.classList.contains(se);
        }
        _getPlacement() {
            const t = this._parent;
            if (t.classList.contains("dropend")) return de;
            if (t.classList.contains("dropstart")) return ue;
            if (t.classList.contains("dropup-center")) return "top";
            if (t.classList.contains("dropdown-center")) return "bottom";
            const e = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
            return t.classList.contains("dropup") ? (e ? le : ae) : e ? he : ce;
        }
        _detectNavbar() {
            return null !== this._element.closest(".navbar");
        }
        _getOffset() {
            const { offset: t } = this._config;
            return "string" == typeof t ? t.split(",").map((t) => Number.parseInt(t, 10)) : "function" == typeof t ? (e) => t(e, this._element) : t;
        }
        _getPopperConfig() {
            const t = {
                placement: this._getPlacement(),
                modifiers: [
                    { name: "preventOverflow", options: { boundary: this._config.boundary } },
                    { name: "offset", options: { offset: this._getOffset() } },
                ],
            };
            return (this._inNavbar || "static" === this._config.display) && (B.setDataAttribute(this._menu, "popper", "static"), (t.modifiers = [{ name: "applyStyles", enabled: !1 }])), { ...t, ...v(this._config.popperConfig, [t]) };
        }
        _selectMenuItem({ key: t, target: e }) {
            const i = Q.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter((t) => h(t));
            i.length && w(i, e, t === Yt, !i.includes(e)).focus();
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = me.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]();
                }
            });
        }
        static clearMenus(t) {
            if (2 === t.button || ("keyup" === t.type && "Tab" !== t.key)) return;
            const e = Q.find(oe);
            for (const i of e) {
                const e = me.getInstance(i);
                if (!e || !1 === e._config.autoClose) continue;
                const s = t.composedPath(),
                    n = s.includes(e._menu);
                if (s.includes(e._element) || ("inside" === e._config.autoClose && !n) || ("outside" === e._config.autoClose && n)) continue;
                if (e._menu.contains(t.target) && (("keyup" === t.type && "Tab" === t.key) || /input|select|option|textarea|form/i.test(t.target.tagName))) continue;
                const o = { relatedTarget: e._element };
                "click" === t.type && (o.clickEvent = t), e._completeHide(o);
            }
        }
        static dataApiKeydownHandler(t) {
            const e = /input|textarea/i.test(t.target.tagName),
                i = "Escape" === t.key,
                s = [Xt, Yt].includes(t.key);
            if (!s && !i) return;
            if (e && !i) return;
            t.preventDefault();
            const n = this.matches(ne) ? this : Q.prev(this, ne)[0] || Q.next(this, ne)[0] || Q.findOne(ne, t.delegateTarget.parentNode),
                o = me.getOrCreateInstance(n);
            if (s) return t.stopPropagation(), o.show(), void o._selectMenuItem(t);
            o._isShown() && (t.stopPropagation(), o.hide(), n.focus());
        }
    }
    j.on(document, ee, ne, me.dataApiKeydownHandler),
        j.on(document, ee, re, me.dataApiKeydownHandler),
        j.on(document, te, me.clearMenus),
        j.on(document, ie, me.clearMenus),
        j.on(document, te, ne, function (t) {
            t.preventDefault(), me.getOrCreateInstance(this).toggle();
        }),
        b(me);
    const pe = "backdrop",
        _e = "show",
        be = `mousedown.bs.${pe}`,
        ve = { className: "modal-backdrop", clickCallback: null, isAnimated: !1, isVisible: !0, rootElement: "body" },
        ye = { className: "string", clickCallback: "(function|null)", isAnimated: "boolean", isVisible: "boolean", rootElement: "(element|string)" };
    class we extends q {
        constructor(t) {
            super(), (this._config = this._getConfig(t)), (this._isAppended = !1), (this._element = null);
        }
        static get Default() {
            return ve;
        }
        static get DefaultType() {
            return ye;
        }
        static get NAME() {
            return pe;
        }
        show(t) {
            if (!this._config.isVisible) return void v(t);
            this._append();
            const e = this._getElement();
            this._config.isAnimated && f(e),
                e.classList.add(_e),
                this._emulateAnimation(() => {
                    v(t);
                });
        }
        hide(t) {
            this._config.isVisible
                ? (this._getElement().classList.remove(_e),
                  this._emulateAnimation(() => {
                      this.dispose(), v(t);
                  }))
                : v(t);
        }
        dispose() {
            this._isAppended && (j.off(this._element, be), this._element.remove(), (this._isAppended = !1));
        }
        _getElement() {
            if (!this._element) {
                const t = document.createElement("div");
                (t.className = this._config.className), this._config.isAnimated && t.classList.add("fade"), (this._element = t);
            }
            return this._element;
        }
        _configAfterMerge(t) {
            return (t.rootElement = c(t.rootElement)), t;
        }
        _append() {
            if (this._isAppended) return;
            const t = this._getElement();
            this._config.rootElement.append(t),
                j.on(t, be, () => {
                    v(this._config.clickCallback);
                }),
                (this._isAppended = !0);
        }
        _emulateAnimation(t) {
            y(t, this._getElement(), this._config.isAnimated);
        }
    }
    const Ae = ".bs.focustrap",
        Ce = `focusin${Ae}`,
        Ee = `keydown.tab${Ae}`,
        $e = "backward",
        Te = { autofocus: !0, trapElement: null },
        ke = { autofocus: "boolean", trapElement: "element" };
    class Se extends q {
        constructor(t) {
            super(), (this._config = this._getConfig(t)), (this._isActive = !1), (this._lastTabNavDirection = null);
        }
        static get Default() {
            return Te;
        }
        static get DefaultType() {
            return ke;
        }
        static get NAME() {
            return "focustrap";
        }
        activate() {
            this._isActive || (this._config.autofocus && this._config.trapElement.focus(), j.off(document, Ae), j.on(document, Ce, (t) => this._handleFocusin(t)), j.on(document, Ee, (t) => this._handleKeydown(t)), (this._isActive = !0));
        }
        deactivate() {
            this._isActive && ((this._isActive = !1), j.off(document, Ae));
        }
        _handleFocusin(t) {
            const { trapElement: e } = this._config;
            if (t.target === document || t.target === e || e.contains(t.target)) return;
            const i = Q.focusableChildren(e);
            0 === i.length ? e.focus() : this._lastTabNavDirection === $e ? i[i.length - 1].focus() : i[0].focus();
        }
        _handleKeydown(t) {
            "Tab" === t.key && (this._lastTabNavDirection = t.shiftKey ? $e : "forward");
        }
    }
    const Ie = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        Le = ".sticky-top",
        xe = "padding-right",
        Oe = "margin-right";
    class De {
        constructor() {
            this._element = document.body;
        }
        getWidth() {
            const t = document.documentElement.clientWidth;
            return Math.abs(window.innerWidth - t);
        }
        hide() {
            const t = this.getWidth();
            this._disableOverFlow(), this._setElementAttributes(this._element, xe, (e) => e + t), this._setElementAttributes(Ie, xe, (e) => e + t), this._setElementAttributes(Le, Oe, (e) => e - t);
        }
        reset() {
            this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, xe), this._resetElementAttributes(Ie, xe), this._resetElementAttributes(Le, Oe);
        }
        isOverflowing() {
            return this.getWidth() > 0;
        }
        _disableOverFlow() {
            this._saveInitialAttribute(this._element, "overflow"), (this._element.style.overflow = "hidden");
        }
        _setElementAttributes(t, e, i) {
            const s = this.getWidth();
            this._applyManipulationCallback(t, (t) => {
                if (t !== this._element && window.innerWidth > t.clientWidth + s) return;
                this._saveInitialAttribute(t, e);
                const n = window.getComputedStyle(t).getPropertyValue(e);
                t.style.setProperty(e, `${i(Number.parseFloat(n))}px`);
            });
        }
        _saveInitialAttribute(t, e) {
            const i = t.style.getPropertyValue(e);
            i && B.setDataAttribute(t, e, i);
        }
        _resetElementAttributes(t, e) {
            this._applyManipulationCallback(t, (t) => {
                const i = B.getDataAttribute(t, e);
                null !== i ? (B.removeDataAttribute(t, e), t.style.setProperty(e, i)) : t.style.removeProperty(e);
            });
        }
        _applyManipulationCallback(t, e) {
            if (l(t)) e(t);
            else for (const i of Q.find(t, this._element)) e(i);
        }
    }
    const Ne = ".bs.modal",
        Me = `hide${Ne}`,
        Pe = `hidePrevented${Ne}`,
        je = `hidden${Ne}`,
        Fe = `show${Ne}`,
        He = `shown${Ne}`,
        ze = `resize${Ne}`,
        Be = `click.dismiss${Ne}`,
        qe = `mousedown.dismiss${Ne}`,
        Re = `keydown.dismiss${Ne}`,
        We = `click${Ne}.data-api`,
        Qe = "modal-open",
        Ke = "show",
        Ve = "modal-static",
        Xe = { backdrop: !0, focus: !0, keyboard: !0 },
        Ye = { backdrop: "(boolean|string)", focus: "boolean", keyboard: "boolean" };
    class Ue extends R {
        constructor(t, e) {
            super(t, e),
                (this._dialog = Q.findOne(".modal-dialog", this._element)),
                (this._backdrop = this._initializeBackDrop()),
                (this._focustrap = this._initializeFocusTrap()),
                (this._isShown = !1),
                (this._isTransitioning = !1),
                (this._scrollBar = new De()),
                this._addEventListeners();
        }
        static get Default() {
            return Xe;
        }
        static get DefaultType() {
            return Ye;
        }
        static get NAME() {
            return "modal";
        }
        toggle(t) {
            return this._isShown ? this.hide() : this.show(t);
        }
        show(t) {
            if (this._isShown || this._isTransitioning) return;
            j.trigger(this._element, Fe, { relatedTarget: t }).defaultPrevented ||
                ((this._isShown = !0), (this._isTransitioning = !0), this._scrollBar.hide(), document.body.classList.add(Qe), this._adjustDialog(), this._backdrop.show(() => this._showElement(t)));
        }
        hide() {
            if (!this._isShown || this._isTransitioning) return;
            j.trigger(this._element, Me).defaultPrevented ||
                ((this._isShown = !1), (this._isTransitioning = !0), this._focustrap.deactivate(), this._element.classList.remove(Ke), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()));
        }
        dispose() {
            j.off(window, Ne), j.off(this._dialog, Ne), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
        }
        handleUpdate() {
            this._adjustDialog();
        }
        _initializeBackDrop() {
            return new we({ isVisible: Boolean(this._config.backdrop), isAnimated: this._isAnimated() });
        }
        _initializeFocusTrap() {
            return new Se({ trapElement: this._element });
        }
        _showElement(t) {
            document.body.contains(this._element) || document.body.append(this._element),
                (this._element.style.display = "block"),
                this._element.removeAttribute("aria-hidden"),
                this._element.setAttribute("aria-modal", !0),
                this._element.setAttribute("role", "dialog"),
                (this._element.scrollTop = 0);
            const e = Q.findOne(".modal-body", this._dialog);
            e && (e.scrollTop = 0), f(this._element), this._element.classList.add(Ke);
            this._queueCallback(
                () => {
                    this._config.focus && this._focustrap.activate(), (this._isTransitioning = !1), j.trigger(this._element, He, { relatedTarget: t });
                },
                this._dialog,
                this._isAnimated()
            );
        }
        _addEventListeners() {
            j.on(this._element, Re, (t) => {
                "Escape" === t.key && (this._config.keyboard ? this.hide() : this._triggerBackdropTransition());
            }),
                j.on(window, ze, () => {
                    this._isShown && !this._isTransitioning && this._adjustDialog();
                }),
                j.on(this._element, qe, (t) => {
                    j.one(this._element, Be, (e) => {
                        this._element === t.target && this._element === e.target && ("static" !== this._config.backdrop ? this._config.backdrop && this.hide() : this._triggerBackdropTransition());
                    });
                });
        }
        _hideModal() {
            (this._element.style.display = "none"),
                this._element.setAttribute("aria-hidden", !0),
                this._element.removeAttribute("aria-modal"),
                this._element.removeAttribute("role"),
                (this._isTransitioning = !1),
                this._backdrop.hide(() => {
                    document.body.classList.remove(Qe), this._resetAdjustments(), this._scrollBar.reset(), j.trigger(this._element, je);
                });
        }
        _isAnimated() {
            return this._element.classList.contains("fade");
        }
        _triggerBackdropTransition() {
            if (j.trigger(this._element, Pe).defaultPrevented) return;
            const t = this._element.scrollHeight > document.documentElement.clientHeight,
                e = this._element.style.overflowY;
            "hidden" === e ||
                this._element.classList.contains(Ve) ||
                (t || (this._element.style.overflowY = "hidden"),
                this._element.classList.add(Ve),
                this._queueCallback(() => {
                    this._element.classList.remove(Ve),
                        this._queueCallback(() => {
                            this._element.style.overflowY = e;
                        }, this._dialog);
                }, this._dialog),
                this._element.focus());
        }
        _adjustDialog() {
            const t = this._element.scrollHeight > document.documentElement.clientHeight,
                e = this._scrollBar.getWidth(),
                i = e > 0;
            if (i && !t) {
                const t = _() ? "paddingLeft" : "paddingRight";
                this._element.style[t] = `${e}px`;
            }
            if (!i && t) {
                const t = _() ? "paddingRight" : "paddingLeft";
                this._element.style[t] = `${e}px`;
            }
        }
        _resetAdjustments() {
            (this._element.style.paddingLeft = ""), (this._element.style.paddingRight = "");
        }
        static jQueryInterface(t, e) {
            return this.each(function () {
                const i = Ue.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === i[t]) throw new TypeError(`No method named "${t}"`);
                    i[t](e);
                }
            });
        }
    }
    j.on(document, We, '[data-bs-toggle="modal"]', function (t) {
        const e = Q.getElementFromSelector(this);
        ["A", "AREA"].includes(this.tagName) && t.preventDefault(),
            j.one(e, Fe, (t) => {
                t.defaultPrevented ||
                    j.one(e, je, () => {
                        h(this) && this.focus();
                    });
            });
        const i = Q.findOne(".modal.show");
        i && Ue.getInstance(i).hide();
        Ue.getOrCreateInstance(e).toggle(this);
    }),
        K(Ue),
        b(Ue);
    const Ge = ".bs.offcanvas",
        Je = ".data-api",
        Ze = `load${Ge}${Je}`,
        ti = "show",
        ei = "showing",
        ii = "hiding",
        si = ".offcanvas.show",
        ni = `show${Ge}`,
        oi = `shown${Ge}`,
        ri = `hide${Ge}`,
        ai = `hidePrevented${Ge}`,
        li = `hidden${Ge}`,
        ci = `resize${Ge}`,
        hi = `click${Ge}${Je}`,
        di = `keydown.dismiss${Ge}`,
        ui = { backdrop: !0, keyboard: !0, scroll: !1 },
        gi = { backdrop: "(boolean|string)", keyboard: "boolean", scroll: "boolean" };
    class fi extends R {
        constructor(t, e) {
            super(t, e), (this._isShown = !1), (this._backdrop = this._initializeBackDrop()), (this._focustrap = this._initializeFocusTrap()), this._addEventListeners();
        }
        static get Default() {
            return ui;
        }
        static get DefaultType() {
            return gi;
        }
        static get NAME() {
            return "offcanvas";
        }
        toggle(t) {
            return this._isShown ? this.hide() : this.show(t);
        }
        show(t) {
            if (this._isShown) return;
            if (j.trigger(this._element, ni, { relatedTarget: t }).defaultPrevented) return;
            (this._isShown = !0), this._backdrop.show(), this._config.scroll || new De().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(ei);
            this._queueCallback(
                () => {
                    (this._config.scroll && !this._config.backdrop) || this._focustrap.activate(), this._element.classList.add(ti), this._element.classList.remove(ei), j.trigger(this._element, oi, { relatedTarget: t });
                },
                this._element,
                !0
            );
        }
        hide() {
            if (!this._isShown) return;
            if (j.trigger(this._element, ri).defaultPrevented) return;
            this._focustrap.deactivate(), this._element.blur(), (this._isShown = !1), this._element.classList.add(ii), this._backdrop.hide();
            this._queueCallback(
                () => {
                    this._element.classList.remove(ti, ii), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new De().reset(), j.trigger(this._element, li);
                },
                this._element,
                !0
            );
        }
        dispose() {
            this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
        }
        _initializeBackDrop() {
            const t = Boolean(this._config.backdrop);
            return new we({
                className: "offcanvas-backdrop",
                isVisible: t,
                isAnimated: !0,
                rootElement: this._element.parentNode,
                clickCallback: t
                    ? () => {
                          "static" !== this._config.backdrop ? this.hide() : j.trigger(this._element, ai);
                      }
                    : null,
            });
        }
        _initializeFocusTrap() {
            return new Se({ trapElement: this._element });
        }
        _addEventListeners() {
            j.on(this._element, di, (t) => {
                "Escape" === t.key && (this._config.keyboard ? this.hide() : j.trigger(this._element, ai));
            });
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = fi.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                    e[t](this);
                }
            });
        }
    }
    j.on(document, hi, '[data-bs-toggle="offcanvas"]', function (t) {
        const e = Q.getElementFromSelector(this);
        if ((["A", "AREA"].includes(this.tagName) && t.preventDefault(), d(this))) return;
        j.one(e, li, () => {
            h(this) && this.focus();
        });
        const i = Q.findOne(si);
        i && i !== e && fi.getInstance(i).hide();
        fi.getOrCreateInstance(e).toggle(this);
    }),
        j.on(window, Ze, () => {
            for (const t of Q.find(si)) fi.getOrCreateInstance(t).show();
        }),
        j.on(window, ci, () => {
            for (const t of Q.find("[aria-modal][class*=show][class*=offcanvas-]")) "fixed" !== getComputedStyle(t).position && fi.getOrCreateInstance(t).hide();
        }),
        K(fi),
        b(fi);
    const mi = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "srcset", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: [],
        },
        pi = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]),
        _i = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
        bi = (t, e) => {
            const i = t.nodeName.toLowerCase();
            return e.includes(i) ? !pi.has(i) || Boolean(_i.test(t.nodeValue)) : e.filter((t) => t instanceof RegExp).some((t) => t.test(i));
        };
    const vi = { allowList: mi, content: {}, extraClass: "", html: !1, sanitize: !0, sanitizeFn: null, template: "<div></div>" },
        yi = { allowList: "object", content: "object", extraClass: "(string|function)", html: "boolean", sanitize: "boolean", sanitizeFn: "(null|function)", template: "string" },
        wi = { entry: "(string|element|function|null)", selector: "(string|element)" };
    class Ai extends q {
        constructor(t) {
            super(), (this._config = this._getConfig(t));
        }
        static get Default() {
            return vi;
        }
        static get DefaultType() {
            return yi;
        }
        static get NAME() {
            return "TemplateFactory";
        }
        getContent() {
            return Object.values(this._config.content)
                .map((t) => this._resolvePossibleFunction(t))
                .filter(Boolean);
        }
        hasContent() {
            return this.getContent().length > 0;
        }
        changeContent(t) {
            return this._checkContent(t), (this._config.content = { ...this._config.content, ...t }), this;
        }
        toHtml() {
            const t = document.createElement("div");
            t.innerHTML = this._maybeSanitize(this._config.template);
            for (const [e, i] of Object.entries(this._config.content)) this._setContent(t, i, e);
            const e = t.children[0],
                i = this._resolvePossibleFunction(this._config.extraClass);
            return i && e.classList.add(...i.split(" ")), e;
        }
        _typeCheckConfig(t) {
            super._typeCheckConfig(t), this._checkContent(t.content);
        }
        _checkContent(t) {
            for (const [e, i] of Object.entries(t)) super._typeCheckConfig({ selector: e, entry: i }, wi);
        }
        _setContent(t, e, i) {
            const s = Q.findOne(i, t);
            s && ((e = this._resolvePossibleFunction(e)) ? (l(e) ? this._putElementInTemplate(c(e), s) : this._config.html ? (s.innerHTML = this._maybeSanitize(e)) : (s.textContent = e)) : s.remove());
        }
        _maybeSanitize(t) {
            return this._config.sanitize
                ? (function (t, e, i) {
                      if (!t.length) return t;
                      if (i && "function" == typeof i) return i(t);
                      const s = new window.DOMParser().parseFromString(t, "text/html"),
                          n = [].concat(...s.body.querySelectorAll("*"));
                      for (const t of n) {
                          const i = t.nodeName.toLowerCase();
                          if (!Object.keys(e).includes(i)) {
                              t.remove();
                              continue;
                          }
                          const s = [].concat(...t.attributes),
                              n = [].concat(e["*"] || [], e[i] || []);
                          for (const e of s) bi(e, n) || t.removeAttribute(e.nodeName);
                      }
                      return s.body.innerHTML;
                  })(t, this._config.allowList, this._config.sanitizeFn)
                : t;
        }
        _resolvePossibleFunction(t) {
            return v(t, [this]);
        }
        _putElementInTemplate(t, e) {
            if (this._config.html) return (e.innerHTML = ""), void e.append(t);
            e.textContent = t.textContent;
        }
    }
    const Ci = new Set(["sanitize", "allowList", "sanitizeFn"]),
        Ei = "fade",
        $i = "show",
        Ti = ".modal",
        ki = "hide.bs.modal",
        Si = "hover",
        Ii = "focus",
        Li = { AUTO: "auto", TOP: "top", RIGHT: _() ? "left" : "right", BOTTOM: "bottom", LEFT: _() ? "right" : "left" },
        xi = {
            allowList: mi,
            animation: !0,
            boundary: "clippingParents",
            container: !1,
            customClass: "",
            delay: 0,
            fallbackPlacements: ["top", "right", "bottom", "left"],
            html: !1,
            offset: [0, 6],
            placement: "top",
            popperConfig: null,
            sanitize: !0,
            sanitizeFn: null,
            selector: !1,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            title: "",
            trigger: "hover focus",
        },
        Oi = {
            allowList: "object",
            animation: "boolean",
            boundary: "(string|element)",
            container: "(string|element|boolean)",
            customClass: "(string|function)",
            delay: "(number|object)",
            fallbackPlacements: "array",
            html: "boolean",
            offset: "(array|string|function)",
            placement: "(string|function)",
            popperConfig: "(null|object|function)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            selector: "(string|boolean)",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
        };
    class Di extends R {
        constructor(t, e) {
            if (void 0 === i) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
            super(t, e),
                (this._isEnabled = !0),
                (this._timeout = 0),
                (this._isHovered = null),
                (this._activeTrigger = {}),
                (this._popper = null),
                (this._templateFactory = null),
                (this._newContent = null),
                (this.tip = null),
                this._setListeners(),
                this._config.selector || this._fixTitle();
        }
        static get Default() {
            return xi;
        }
        static get DefaultType() {
            return Oi;
        }
        static get NAME() {
            return "tooltip";
        }
        enable() {
            this._isEnabled = !0;
        }
        disable() {
            this._isEnabled = !1;
        }
        toggleEnabled() {
            this._isEnabled = !this._isEnabled;
        }
        toggle() {
            this._isEnabled && ((this._activeTrigger.click = !this._activeTrigger.click), this._isShown() ? this._leave() : this._enter());
        }
        dispose() {
            clearTimeout(this._timeout),
                j.off(this._element.closest(Ti), ki, this._hideModalHandler),
                this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")),
                this._disposePopper(),
                super.dispose();
        }
        show() {
            if ("none" === this._element.style.display) throw new Error("Please use show on visible elements");
            if (!this._isWithContent() || !this._isEnabled) return;
            const t = j.trigger(this._element, this.constructor.eventName("show")),
                e = (u(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
            if (t.defaultPrevented || !e) return;
            this._disposePopper();
            const i = this._getTipElement();
            this._element.setAttribute("aria-describedby", i.getAttribute("id"));
            const { container: s } = this._config;
            if (
                (this._element.ownerDocument.documentElement.contains(this.tip) || (s.append(i), j.trigger(this._element, this.constructor.eventName("inserted"))),
                (this._popper = this._createPopper(i)),
                i.classList.add($i),
                "ontouchstart" in document.documentElement)
            )
                for (const t of [].concat(...document.body.children)) j.on(t, "mouseover", g);
            this._queueCallback(
                () => {
                    j.trigger(this._element, this.constructor.eventName("shown")), !1 === this._isHovered && this._leave(), (this._isHovered = !1);
                },
                this.tip,
                this._isAnimated()
            );
        }
        hide() {
            if (!this._isShown()) return;
            if (j.trigger(this._element, this.constructor.eventName("hide")).defaultPrevented) return;
            if ((this._getTipElement().classList.remove($i), "ontouchstart" in document.documentElement)) for (const t of [].concat(...document.body.children)) j.off(t, "mouseover", g);
            (this._activeTrigger.click = !1), (this._activeTrigger[Ii] = !1), (this._activeTrigger[Si] = !1), (this._isHovered = null);
            this._queueCallback(
                () => {
                    this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), j.trigger(this._element, this.constructor.eventName("hidden")));
                },
                this.tip,
                this._isAnimated()
            );
        }
        update() {
            this._popper && this._popper.update();
        }
        _isWithContent() {
            return Boolean(this._getTitle());
        }
        _getTipElement() {
            return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip;
        }
        _createTipElement(t) {
            const e = this._getTemplateFactory(t).toHtml();
            if (!e) return null;
            e.classList.remove(Ei, $i), e.classList.add(`bs-${this.constructor.NAME}-auto`);
            const i = ((t) => {
                do {
                    t += Math.floor(1e6 * Math.random());
                } while (document.getElementById(t));
                return t;
            })(this.constructor.NAME).toString();
            return e.setAttribute("id", i), this._isAnimated() && e.classList.add(Ei), e;
        }
        setContent(t) {
            (this._newContent = t), this._isShown() && (this._disposePopper(), this.show());
        }
        _getTemplateFactory(t) {
            return (
                this._templateFactory ? this._templateFactory.changeContent(t) : (this._templateFactory = new Ai({ ...this._config, content: t, extraClass: this._resolvePossibleFunction(this._config.customClass) })), this._templateFactory
            );
        }
        _getContentForTemplate() {
            return { ".tooltip-inner": this._getTitle() };
        }
        _getTitle() {
            return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
        }
        _initializeOnDelegatedTarget(t) {
            return this.constructor.getOrCreateInstance(t.delegateTarget, this._getDelegateConfig());
        }
        _isAnimated() {
            return this._config.animation || (this.tip && this.tip.classList.contains(Ei));
        }
        _isShown() {
            return this.tip && this.tip.classList.contains($i);
        }
        _createPopper(t) {
            const e = v(this._config.placement, [this, t, this._element]),
                s = Li[e.toUpperCase()];
            return i.createPopper(this._element, t, this._getPopperConfig(s));
        }
        _getOffset() {
            const { offset: t } = this._config;
            return "string" == typeof t ? t.split(",").map((t) => Number.parseInt(t, 10)) : "function" == typeof t ? (e) => t(e, this._element) : t;
        }
        _resolvePossibleFunction(t) {
            return v(t, [this._element]);
        }
        _getPopperConfig(t) {
            const e = {
                placement: t,
                modifiers: [
                    { name: "flip", options: { fallbackPlacements: this._config.fallbackPlacements } },
                    { name: "offset", options: { offset: this._getOffset() } },
                    { name: "preventOverflow", options: { boundary: this._config.boundary } },
                    { name: "arrow", options: { element: `.${this.constructor.NAME}-arrow` } },
                    {
                        name: "preSetPlacement",
                        enabled: !0,
                        phase: "beforeMain",
                        fn: (t) => {
                            this._getTipElement().setAttribute("data-popper-placement", t.state.placement);
                        },
                    },
                ],
            };
            return { ...e, ...v(this._config.popperConfig, [e]) };
        }
        _setListeners() {
            const t = this._config.trigger.split(" ");
            for (const e of t)
                if ("click" === e)
                    j.on(this._element, this.constructor.eventName("click"), this._config.selector, (t) => {
                        this._initializeOnDelegatedTarget(t).toggle();
                    });
                else if ("manual" !== e) {
                    const t = e === Si ? this.constructor.eventName("mouseenter") : this.constructor.eventName("focusin"),
                        i = e === Si ? this.constructor.eventName("mouseleave") : this.constructor.eventName("focusout");
                    j.on(this._element, t, this._config.selector, (t) => {
                        const e = this._initializeOnDelegatedTarget(t);
                        (e._activeTrigger["focusin" === t.type ? Ii : Si] = !0), e._enter();
                    }),
                        j.on(this._element, i, this._config.selector, (t) => {
                            const e = this._initializeOnDelegatedTarget(t);
                            (e._activeTrigger["focusout" === t.type ? Ii : Si] = e._element.contains(t.relatedTarget)), e._leave();
                        });
                }
            (this._hideModalHandler = () => {
                this._element && this.hide();
            }),
                j.on(this._element.closest(Ti), ki, this._hideModalHandler);
        }
        _fixTitle() {
            const t = this._element.getAttribute("title");
            t && (this._element.getAttribute("aria-label") || this._element.textContent.trim() || this._element.setAttribute("aria-label", t), this._element.setAttribute("data-bs-original-title", t), this._element.removeAttribute("title"));
        }
        _enter() {
            this._isShown() || this._isHovered
                ? (this._isHovered = !0)
                : ((this._isHovered = !0),
                  this._setTimeout(() => {
                      this._isHovered && this.show();
                  }, this._config.delay.show));
        }
        _leave() {
            this._isWithActiveTrigger() ||
                ((this._isHovered = !1),
                this._setTimeout(() => {
                    this._isHovered || this.hide();
                }, this._config.delay.hide));
        }
        _setTimeout(t, e) {
            clearTimeout(this._timeout), (this._timeout = setTimeout(t, e));
        }
        _isWithActiveTrigger() {
            return Object.values(this._activeTrigger).includes(!0);
        }
        _getConfig(t) {
            const e = B.getDataAttributes(this._element);
            for (const t of Object.keys(e)) Ci.has(t) && delete e[t];
            return (t = { ...e, ...("object" == typeof t && t ? t : {}) }), (t = this._mergeConfigObj(t)), (t = this._configAfterMerge(t)), this._typeCheckConfig(t), t;
        }
        _configAfterMerge(t) {
            return (
                (t.container = !1 === t.container ? document.body : c(t.container)),
                "number" == typeof t.delay && (t.delay = { show: t.delay, hide: t.delay }),
                "number" == typeof t.title && (t.title = t.title.toString()),
                "number" == typeof t.content && (t.content = t.content.toString()),
                t
            );
        }
        _getDelegateConfig() {
            const t = {};
            for (const [e, i] of Object.entries(this._config)) this.constructor.Default[e] !== i && (t[e] = i);
            return (t.selector = !1), (t.trigger = "manual"), t;
        }
        _disposePopper() {
            this._popper && (this._popper.destroy(), (this._popper = null)), this.tip && (this.tip.remove(), (this.tip = null));
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = Di.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]();
                }
            });
        }
    }
    b(Di);
    const Ni = {
            ...Di.Default,
            content: "",
            offset: [0, 8],
            placement: "right",
            template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
            trigger: "click",
        },
        Mi = { ...Di.DefaultType, content: "(null|string|element|function)" };
    class Pi extends Di {
        static get Default() {
            return Ni;
        }
        static get DefaultType() {
            return Mi;
        }
        static get NAME() {
            return "popover";
        }
        _isWithContent() {
            return this._getTitle() || this._getContent();
        }
        _getContentForTemplate() {
            return { ".popover-header": this._getTitle(), ".popover-body": this._getContent() };
        }
        _getContent() {
            return this._resolvePossibleFunction(this._config.content);
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = Pi.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]();
                }
            });
        }
    }
    b(Pi);
    const ji = ".bs.scrollspy",
        Fi = `activate${ji}`,
        Hi = `click${ji}`,
        zi = `load${ji}.data-api`,
        Bi = "active",
        qi = "[href]",
        Ri = ".nav-link",
        Wi = `${Ri}, .nav-item > ${Ri}, .list-group-item`,
        Qi = { offset: null, rootMargin: "0px 0px -25%", smoothScroll: !1, target: null, threshold: [0.1, 0.5, 1] },
        Ki = { offset: "(number|null)", rootMargin: "string", smoothScroll: "boolean", target: "element", threshold: "array" };
    class Vi extends R {
        constructor(t, e) {
            super(t, e),
                (this._targetLinks = new Map()),
                (this._observableSections = new Map()),
                (this._rootElement = "visible" === getComputedStyle(this._element).overflowY ? null : this._element),
                (this._activeTarget = null),
                (this._observer = null),
                (this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }),
                this.refresh();
        }
        static get Default() {
            return Qi;
        }
        static get DefaultType() {
            return Ki;
        }
        static get NAME() {
            return "scrollspy";
        }
        refresh() {
            this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : (this._observer = this._getNewObserver());
            for (const t of this._observableSections.values()) this._observer.observe(t);
        }
        dispose() {
            this._observer.disconnect(), super.dispose();
        }
        _configAfterMerge(t) {
            return (t.target = c(t.target) || document.body), (t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin), "string" == typeof t.threshold && (t.threshold = t.threshold.split(",").map((t) => Number.parseFloat(t))), t;
        }
        _maybeEnableSmoothScroll() {
            this._config.smoothScroll &&
                (j.off(this._config.target, Hi),
                j.on(this._config.target, Hi, qi, (t) => {
                    const e = this._observableSections.get(t.target.hash);
                    if (e) {
                        t.preventDefault();
                        const i = this._rootElement || window,
                            s = e.offsetTop - this._element.offsetTop;
                        if (i.scrollTo) return void i.scrollTo({ top: s, behavior: "smooth" });
                        i.scrollTop = s;
                    }
                }));
        }
        _getNewObserver() {
            const t = { root: this._rootElement, threshold: this._config.threshold, rootMargin: this._config.rootMargin };
            return new IntersectionObserver((t) => this._observerCallback(t), t);
        }
        _observerCallback(t) {
            const e = (t) => this._targetLinks.get(`#${t.target.id}`),
                i = (t) => {
                    (this._previousScrollData.visibleEntryTop = t.target.offsetTop), this._process(e(t));
                },
                s = (this._rootElement || document.documentElement).scrollTop,
                n = s >= this._previousScrollData.parentScrollTop;
            this._previousScrollData.parentScrollTop = s;
            for (const o of t) {
                if (!o.isIntersecting) {
                    (this._activeTarget = null), this._clearActiveClass(e(o));
                    continue;
                }
                const t = o.target.offsetTop >= this._previousScrollData.visibleEntryTop;
                if (n && t) {
                    if ((i(o), !s)) return;
                } else n || t || i(o);
            }
        }
        _initializeTargetsAndObservables() {
            (this._targetLinks = new Map()), (this._observableSections = new Map());
            const t = Q.find(qi, this._config.target);
            for (const e of t) {
                if (!e.hash || d(e)) continue;
                const t = Q.findOne(decodeURI(e.hash), this._element);
                h(t) && (this._targetLinks.set(decodeURI(e.hash), e), this._observableSections.set(e.hash, t));
            }
        }
        _process(t) {
            this._activeTarget !== t && (this._clearActiveClass(this._config.target), (this._activeTarget = t), t.classList.add(Bi), this._activateParents(t), j.trigger(this._element, Fi, { relatedTarget: t }));
        }
        _activateParents(t) {
            if (t.classList.contains("dropdown-item")) Q.findOne(".dropdown-toggle", t.closest(".dropdown")).classList.add(Bi);
            else for (const e of Q.parents(t, ".nav, .list-group")) for (const t of Q.prev(e, Wi)) t.classList.add(Bi);
        }
        _clearActiveClass(t) {
            t.classList.remove(Bi);
            const e = Q.find(`${qi}.${Bi}`, t);
            for (const t of e) t.classList.remove(Bi);
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = Vi.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                    e[t]();
                }
            });
        }
    }
    j.on(window, zi, () => {
        for (const t of Q.find('[data-bs-spy="scroll"]')) Vi.getOrCreateInstance(t);
    }),
        b(Vi);
    const Xi = ".bs.tab",
        Yi = `hide${Xi}`,
        Ui = `hidden${Xi}`,
        Gi = `show${Xi}`,
        Ji = `shown${Xi}`,
        Zi = `click${Xi}`,
        ts = `keydown${Xi}`,
        es = `load${Xi}`,
        is = "ArrowLeft",
        ss = "ArrowRight",
        ns = "ArrowUp",
        os = "ArrowDown",
        rs = "Home",
        as = "End",
        ls = "active",
        cs = "fade",
        hs = "show",
        ds = ".dropdown-toggle",
        us = `:not(${ds})`,
        gs = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
        fs = `${`.nav-link${us}, .list-group-item${us}, [role="tab"]${us}`}, ${gs}`,
        ms = `.${ls}[data-bs-toggle="tab"], .${ls}[data-bs-toggle="pill"], .${ls}[data-bs-toggle="list"]`;
    class ps extends R {
        constructor(t) {
            super(t), (this._parent = this._element.closest('.list-group, .nav, [role="tablist"]')), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), j.on(this._element, ts, (t) => this._keydown(t)));
        }
        static get NAME() {
            return "tab";
        }
        show() {
            const t = this._element;
            if (this._elemIsActive(t)) return;
            const e = this._getActiveElem(),
                i = e ? j.trigger(e, Yi, { relatedTarget: t }) : null;
            j.trigger(t, Gi, { relatedTarget: e }).defaultPrevented || (i && i.defaultPrevented) || (this._deactivate(e, t), this._activate(t, e));
        }
        _activate(t, e) {
            if (!t) return;
            t.classList.add(ls), this._activate(Q.getElementFromSelector(t));
            this._queueCallback(
                () => {
                    "tab" === t.getAttribute("role") ? (t.removeAttribute("tabindex"), t.setAttribute("aria-selected", !0), this._toggleDropDown(t, !0), j.trigger(t, Ji, { relatedTarget: e })) : t.classList.add(hs);
                },
                t,
                t.classList.contains(cs)
            );
        }
        _deactivate(t, e) {
            if (!t) return;
            t.classList.remove(ls), t.blur(), this._deactivate(Q.getElementFromSelector(t));
            this._queueCallback(
                () => {
                    "tab" === t.getAttribute("role") ? (t.setAttribute("aria-selected", !1), t.setAttribute("tabindex", "-1"), this._toggleDropDown(t, !1), j.trigger(t, Ui, { relatedTarget: e })) : t.classList.remove(hs);
                },
                t,
                t.classList.contains(cs)
            );
        }
        _keydown(t) {
            if (![is, ss, ns, os, rs, as].includes(t.key)) return;
            t.stopPropagation(), t.preventDefault();
            const e = this._getChildren().filter((t) => !d(t));
            let i;
            if ([rs, as].includes(t.key)) i = e[t.key === rs ? 0 : e.length - 1];
            else {
                const s = [ss, os].includes(t.key);
                i = w(e, t.target, s, !0);
            }
            i && (i.focus({ preventScroll: !0 }), ps.getOrCreateInstance(i).show());
        }
        _getChildren() {
            return Q.find(fs, this._parent);
        }
        _getActiveElem() {
            return this._getChildren().find((t) => this._elemIsActive(t)) || null;
        }
        _setInitialAttributes(t, e) {
            this._setAttributeIfNotExists(t, "role", "tablist");
            for (const t of e) this._setInitialAttributesOnChild(t);
        }
        _setInitialAttributesOnChild(t) {
            t = this._getInnerElement(t);
            const e = this._elemIsActive(t),
                i = this._getOuterElement(t);
            t.setAttribute("aria-selected", e),
                i !== t && this._setAttributeIfNotExists(i, "role", "presentation"),
                e || t.setAttribute("tabindex", "-1"),
                this._setAttributeIfNotExists(t, "role", "tab"),
                this._setInitialAttributesOnTargetPanel(t);
        }
        _setInitialAttributesOnTargetPanel(t) {
            const e = Q.getElementFromSelector(t);
            e && (this._setAttributeIfNotExists(e, "role", "tabpanel"), t.id && this._setAttributeIfNotExists(e, "aria-labelledby", `${t.id}`));
        }
        _toggleDropDown(t, e) {
            const i = this._getOuterElement(t);
            if (!i.classList.contains("dropdown")) return;
            const s = (t, s) => {
                const n = Q.findOne(t, i);
                n && n.classList.toggle(s, e);
            };
            s(ds, ls), s(".dropdown-menu", hs), i.setAttribute("aria-expanded", e);
        }
        _setAttributeIfNotExists(t, e, i) {
            t.hasAttribute(e) || t.setAttribute(e, i);
        }
        _elemIsActive(t) {
            return t.classList.contains(ls);
        }
        _getInnerElement(t) {
            return t.matches(fs) ? t : Q.findOne(fs, t);
        }
        _getOuterElement(t) {
            return t.closest(".nav-item, .list-group-item") || t;
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = ps.getOrCreateInstance(this);
                if ("string" == typeof t) {
                    if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                    e[t]();
                }
            });
        }
    }
    j.on(document, Zi, gs, function (t) {
        ["A", "AREA"].includes(this.tagName) && t.preventDefault(), d(this) || ps.getOrCreateInstance(this).show();
    }),
        j.on(window, es, () => {
            for (const t of Q.find(ms)) ps.getOrCreateInstance(t);
        }),
        b(ps);
    const _s = ".bs.toast",
        bs = `mouseover${_s}`,
        vs = `mouseout${_s}`,
        ys = `focusin${_s}`,
        ws = `focusout${_s}`,
        As = `hide${_s}`,
        Cs = `hidden${_s}`,
        Es = `show${_s}`,
        $s = `shown${_s}`,
        Ts = "hide",
        ks = "show",
        Ss = "showing",
        Is = { animation: "boolean", autohide: "boolean", delay: "number" },
        Ls = { animation: !0, autohide: !0, delay: 5e3 };
    class xs extends R {
        constructor(t, e) {
            super(t, e), (this._timeout = null), (this._hasMouseInteraction = !1), (this._hasKeyboardInteraction = !1), this._setListeners();
        }
        static get Default() {
            return Ls;
        }
        static get DefaultType() {
            return Is;
        }
        static get NAME() {
            return "toast";
        }
        show() {
            if (j.trigger(this._element, Es).defaultPrevented) return;
            this._clearTimeout(), this._config.animation && this._element.classList.add("fade");
            this._element.classList.remove(Ts),
                f(this._element),
                this._element.classList.add(ks, Ss),
                this._queueCallback(
                    () => {
                        this._element.classList.remove(Ss), j.trigger(this._element, $s), this._maybeScheduleHide();
                    },
                    this._element,
                    this._config.animation
                );
        }
        hide() {
            if (!this.isShown()) return;
            if (j.trigger(this._element, As).defaultPrevented) return;
            this._element.classList.add(Ss),
                this._queueCallback(
                    () => {
                        this._element.classList.add(Ts), this._element.classList.remove(Ss, ks), j.trigger(this._element, Cs);
                    },
                    this._element,
                    this._config.animation
                );
        }
        dispose() {
            this._clearTimeout(), this.isShown() && this._element.classList.remove(ks), super.dispose();
        }
        isShown() {
            return this._element.classList.contains(ks);
        }
        _maybeScheduleHide() {
            this._config.autohide &&
                (this._hasMouseInteraction ||
                    this._hasKeyboardInteraction ||
                    (this._timeout = setTimeout(() => {
                        this.hide();
                    }, this._config.delay)));
        }
        _onInteraction(t, e) {
            switch (t.type) {
                case "mouseover":
                case "mouseout":
                    this._hasMouseInteraction = e;
                    break;
                case "focusin":
                case "focusout":
                    this._hasKeyboardInteraction = e;
            }
            if (e) return void this._clearTimeout();
            const i = t.relatedTarget;
            this._element === i || this._element.contains(i) || this._maybeScheduleHide();
        }
        _setListeners() {
            j.on(this._element, bs, (t) => this._onInteraction(t, !0)),
                j.on(this._element, vs, (t) => this._onInteraction(t, !1)),
                j.on(this._element, ys, (t) => this._onInteraction(t, !0)),
                j.on(this._element, ws, (t) => this._onInteraction(t, !1));
        }
        _clearTimeout() {
            clearTimeout(this._timeout), (this._timeout = null);
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = xs.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t](this);
                }
            });
        }
    }
    K(xs), b(xs);
    return { Alert: U, Button: J, Carousel: Lt, Collapse: Wt, Dropdown: me, Modal: Ue, Offcanvas: fi, Popover: Pi, ScrollSpy: Vi, Tab: ps, Toast: xs, Tooltip: Di };
}),
    (function (t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery);
    })(function (t) {
        function e(e, s, n) {
            var o = { content: { message: "object" == typeof s ? s.message : s, title: s.title ? s.title : "", icon: s.icon ? s.icon : "", url: s.url ? s.url : "#", target: s.target ? s.target : "-" } };
            (n = t.extend(!0, {}, o, n)),
                (this.settings = t.extend(!0, {}, i, n)),
                (this._defaults = i),
                "-" === this.settings.content.target && (this.settings.content.target = this.settings.url_target),
                (this.animations = { start: "webkitAnimationStart oanimationstart MSAnimationStart animationstart", end: "webkitAnimationEnd oanimationend MSAnimationEnd animationend" }),
                "number" == typeof this.settings.offset && (this.settings.offset = { x: this.settings.offset, y: this.settings.offset }),
                (this.settings.allow_duplicates ||
                    (!this.settings.allow_duplicates &&
                        !(function (e) {
                            var i = !1;
                            return (
                                t('[data-alret="container"]').each(function (s, n) {
                                    var o = t(n),
                                        r = o.find('[data-alret="title"]').text().trim(),
                                        a = o.find('[data-alret="message"]').html().trim(),
                                        l =
                                            r ===
                                            t("<div>" + e.settings.content.title + "</div>")
                                                .html()
                                                .trim(),
                                        c =
                                            a ===
                                            t("<div>" + e.settings.content.message + "</div>")
                                                .html()
                                                .trim(),
                                        h = o.hasClass("alert-" + e.settings.type);
                                    return l && c && h && (i = !0), !i;
                                }),
                                i
                            );
                        })(this))) &&
                    this.init();
        }
        var i = {
            element: "body",
            position: null,
            type: "info",
            allow_dismiss: !0,
            allow_duplicates: !0,
            newest_on_top: !1,
            showProgressbar: !1,
            placement: { from: "top", align: "right" },
            offset: 20,
            spacing: 10,
            z_index: 1031,
            delay: 5e3,
            timer: 1e3,
            url_target: "_blank",
            mouse_over: null,
            animate: { enter: "animated fadeInDown", exit: "animated fadeOutUp" },
            onShow: null,
            onShown: null,
            onClose: null,
            onClosed: null,
            icon_type: "class",
            template:
                '<div data-alret="container" class="col-10 col-xs-11 col-sm-4 alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-alret="dismiss">close</button><span data-alret="icon"></span> <span data-alret="title">{1}</span> <span data-alret="message">{2}</span><div class="progress" data-alret="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-alret="url"></a></div>',
        };
        (String.format = function () {
            for (var t = arguments[0], e = 1; e < arguments.length; e++) t = t.replace(RegExp("\\{" + (e - 1) + "\\}", "gm"), arguments[e]);
            return t;
        }),
            t.extend(e.prototype, {
                init: function () {
                    var t = this;
                    this.buildalret(),
                        this.settings.content.icon && this.setIcon(),
                        "#" != this.settings.content.url && this.styleURL(),
                        this.styleDismiss(),
                        this.placement(),
                        this.bind(),
                        (this.alret = {
                            $ele: this.$ele,
                            update: function (e, i) {
                                var s = {};
                                for (var n in ("string" == typeof e ? (s[e] = i) : (s = e), s))
                                    switch (n) {
                                        case "type":
                                            this.$ele.removeClass("alert-" + t.settings.type),
                                                this.$ele.find('[data-alret="progressbar"] > .progress-bar').removeClass("progress-bar-" + t.settings.type),
                                                (t.settings.type = s[n]),
                                                this.$ele
                                                    .addClass("alert-" + s[n])
                                                    .find('[data-alret="progressbar"] > .progress-bar')
                                                    .addClass("progress-bar-" + s[n]);
                                            break;
                                        case "icon":
                                            var o = this.$ele.find('[data-alret="icon"]');
                                            "class" === t.settings.icon_type.toLowerCase() ? o.removeClass(t.settings.content.icon).addClass(s[n]) : (o.is("img") || o.find("img"), o.attr("src", s[n]));
                                            break;
                                        case "progress":
                                            var r = t.settings.delay - t.settings.delay * (s[n] / 100);
                                            this.$ele.data("alret-delay", r),
                                                this.$ele
                                                    .find('[data-alret="progressbar"] > div')
                                                    .attr("aria-valuenow", s[n])
                                                    .css("width", s[n] + "%");
                                            break;
                                        case "url":
                                            this.$ele.find('[data-alret="url"]').attr("href", s[n]);
                                            break;
                                        case "target":
                                            this.$ele.find('[data-alret="url"]').attr("target", s[n]);
                                            break;
                                        default:
                                            this.$ele.find('[data-alret="' + n + '"]').html(s[n]);
                                    }
                                var a = this.$ele.outerHeight() + parseInt(t.settings.spacing) + parseInt(t.settings.offset.y);
                                t.reposition(a);
                            },
                            close: function () {
                                t.close();
                            },
                        });
                },
                buildalret: function () {
                    var e = this.settings.content;
                    (this.$ele = t(String.format(this.settings.template, this.settings.type, e.title, e.message, e.url, e.target))),
                        this.$ele.attr("data-alret-position", this.settings.placement.from + "-" + this.settings.placement.align),
                        this.settings.allow_dismiss || this.$ele.find('[data-alret="dismiss"]').css("display", "none"),
                        ((this.settings.delay <= 0 && !this.settings.showProgressbar) || !this.settings.showProgressbar) && this.$ele.find('[data-alret="progressbar"]').remove();
                },
                setIcon: function () {
                    "class" === this.settings.icon_type.toLowerCase()
                        ? this.$ele.find('[data-alret="icon"]').addClass(this.settings.content.icon)
                        : this.$ele.find('[data-alret="icon"]').is("img")
                        ? this.$ele.find('[data-alret="icon"]').attr("src", this.settings.content.icon)
                        : this.$ele.find('[data-alret="icon"]').append('<img src="' + this.settings.content.icon + '" alt="alret Icon" />');
                },
                styleDismiss: function () {
                    this.$ele.find('[data-alret="dismiss"]').css({ position: "absolute", right: "10px", top: "5px", zIndex: this.settings.z_index + 2 });
                },
                styleURL: function () {
                    this.$ele
                        .find('[data-alret="url"]')
                        .css({
                            backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)",
                            height: "100%",
                            left: 0,
                            position: "absolute",
                            top: 0,
                            width: "100%",
                            zIndex: this.settings.z_index + 1,
                        });
                },
                placement: function () {
                    var e = this,
                        i = this.settings.offset.y,
                        s = {
                            display: "inline-block",
                            margin: "0px auto",
                            paddingLeft: "65px",
                            position: this.settings.position ? this.settings.position : "body" === this.settings.element ? "fixed" : "absolute",
                            transition: "all .5s ease-in-out",
                            zIndex: this.settings.z_index,
                        },
                        n = !1,
                        o = this.settings;
                    switch (
                        (t('[data-alret-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])').each(function () {
                            i = Math.max(i, parseInt(t(this).css(o.placement.from)) + parseInt(t(this).outerHeight()) + parseInt(o.spacing));
                        }),
                        !0 === this.settings.newest_on_top && (i = this.settings.offset.y),
                        (s[this.settings.placement.from] = i + "px"),
                        this.settings.placement.align)
                    ) {
                        case "left":
                        case "right":
                            s[this.settings.placement.align] = this.settings.offset.x + "px";
                            break;
                        case "center":
                            (s.left = 0), (s.right = 0);
                    }
                    this.$ele.css(s).addClass(this.settings.animate.enter),
                        t.each(Array("webkit-", "moz-", "o-", "ms-", ""), function (t, i) {
                            e.$ele[0].style[i + "AnimationIterationCount"] = 1;
                        }),
                        t(this.settings.element).append(this.$ele),
                        !0 === this.settings.newest_on_top && ((i = parseInt(i) + parseInt(this.settings.spacing) + this.$ele.outerHeight()), this.reposition(i)),
                        t.isFunction(e.settings.onShow) && e.settings.onShow.call(this.$ele),
                        this.$ele
                            .one(this.animations.start, function () {
                                n = !0;
                            })
                            .one(this.animations.end, function () {
                                e.$ele.removeClass(e.settings.animate.enter), t.isFunction(e.settings.onShown) && e.settings.onShown.call(this);
                            }),
                        setTimeout(function () {
                            n || (t.isFunction(e.settings.onShown) && e.settings.onShown.call(this));
                        }, 600);
                },
                bind: function () {
                    var e = this;
                    if (
                        (this.$ele.find('[data-alret="dismiss"]').on("click", function () {
                            e.close();
                        }),
                        this.$ele
                            .mouseover(function () {
                                t(this).data("data-hover", "true");
                            })
                            .mouseout(function () {
                                t(this).data("data-hover", "false");
                            }),
                        this.$ele.data("data-hover", "false"),
                        this.settings.delay > 0)
                    ) {
                        e.$ele.data("alret-delay", e.settings.delay);
                        var i = setInterval(function () {
                            var t = parseInt(e.$ele.data("alret-delay")) - e.settings.timer;
                            if (("false" === e.$ele.data("data-hover") && "pause" === e.settings.mouse_over) || "pause" != e.settings.mouse_over) {
                                var s = ((e.settings.delay - t) / e.settings.delay) * 100;
                                e.$ele.data("alret-delay", t),
                                    e.$ele
                                        .find('[data-alret="progressbar"] > div')
                                        .attr("aria-valuenow", s)
                                        .css("width", s + "%");
                            }
                            t <= -e.settings.timer && (clearInterval(i), e.close());
                        }, e.settings.timer);
                    }
                },
                close: function () {
                    var e = this,
                        i = parseInt(this.$ele.css(this.settings.placement.from)),
                        s = !1;
                    this.$ele.attr("data-closing", "true").addClass(this.settings.animate.exit),
                        e.reposition(i),
                        t.isFunction(e.settings.onClose) && e.settings.onClose.call(this.$ele),
                        this.$ele
                            .one(this.animations.start, function () {
                                s = !0;
                            })
                            .one(this.animations.end, function () {
                                t(this).remove(), t.isFunction(e.settings.onClosed) && e.settings.onClosed.call(this);
                            }),
                        setTimeout(function () {
                            s || (e.$ele.remove(), e.settings.onClosed && e.settings.onClosed(e.$ele));
                        }, 600);
                },
                reposition: function (e) {
                    var i = this,
                        s = '[data-alret-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])',
                        n = this.$ele.nextAll(s);
                    !0 === this.settings.newest_on_top && (n = this.$ele.prevAll(s)),
                        n.each(function () {
                            t(this).css(i.settings.placement.from, e), (e = parseInt(e) + parseInt(i.settings.spacing) + t(this).outerHeight());
                        });
                },
            }),
            (t.alret = function (t, i) {
                return new e(this, t, i).alret;
            }),
            (t.alretDefaults = function (e) {
                return (i = t.extend(!0, {}, i, e));
            }),
            (t.alretClose = function (e) {
                "warning" === e && (e = "danger"),
                    void 0 === e || "all" === e
                        ? t("[data-alret]").find('[data-alret="dismiss"]').trigger("click")
                        : "success" === e || "info" === e || "warning" === e || "danger" === e
                        ? t(".alert-" + e + "[data-alret]")
                              .find('[data-alret="dismiss"]')
                              .trigger("click")
                        : e
                        ? t(e + "[data-alret]")
                              .find('[data-alret="dismiss"]')
                              .trigger("click")
                        : t('[data-alret-position="' + e + '"]')
                              .find('[data-alret="dismiss"]')
                              .trigger("click");
            }),
            (t.alretCloseExcept = function (e) {
                "warning" === e && (e = "danger"),
                    "success" === e || "info" === e || "warning" === e || "danger" === e
                        ? t("[data-alret]")
                              .not(".alert-" + e)
                              .find('[data-alret="dismiss"]')
                              .trigger("click")
                        : t("[data-alret]").not(e).find('[data-alret="dismiss"]').trigger("click");
            });
    }),
    $(".video-btn").on("click", function () {
        $videoSrc = $(this).data("src");
    }),
    $(".video-btn").click(function () {
        $videoSrc = $(this).data("src");
    }),
    $("#myModal").on("shown.bs.modal", function (t) {
        $("#video").attr("src", $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    }),
    $("#myModal").on("hide.bs.modal", function (t) {
        $("#video").attr("src", $videoSrc);
    });
const el = document.querySelectorAll(".set-colors");
for (let t = 0; t < el.length; t++) {
    let e = $(el[t]).attr("data-setcolor");
    var em = document.createElement("div");
    (em.style.color = e), document.body.appendChild(em);
    let i = window.getComputedStyle(em).color;
    document.body.removeChild(em);
    let s = i;
    (s = s.replaceAll("rgba(", "")), (s = s.replaceAll(")", ""));
    const n = s.split(",");
    var colorMixer = n[0] + "," + n[1] + "," + n[2] + ",0.4)";
    $('[data-setcolor="' + e + '"]').css({ background: colorMixer });
}
if ($(".img-cover")[0]) {
    const t = $(".img-cover").attr("src");
    $("body").css({ "background-image": "url('" + t + "')", "background-position": "center", "background-repeat": "no-repeat", "background-size": "cover", "background-attachment": "fixed" });
}
if (
    ($("a.scrollLink").on("click", function (t) {
        t.preventDefault(), $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top }, 500);
    }),
    $(window).scroll(function () {
        $(this).scrollTop() >= 50 ? $(".goup").fadeIn(200) : $(".goup").fadeOut(200);
    }),
    $(".goup").on("click", function () {
        $("body,html").animate({ scrollTop: 0 }, 500);
    }),
    $(".navbar-toggler-icon")[0])
) {
    $(".navbar-toggler-icon").wrapInner('<div class="line-menu half start"></div><div class="line-menu"></div><div class="line-menu half end"></div>');
    var wrapperMenu = document.querySelector(".navbar-toggler-icon");
    wrapperMenu.addEventListener("click", function () {
        wrapperMenu.classList.toggle("open");
    });
}
const SetShadow = document.querySelectorAll(".shadow");
for (let t = 0; t < SetShadow.length; t++) {
    const e = SetShadow[t].dataset.shadow;
    $('[data-shadow="' + e + '"]').css({ "box-shadow": " 0 0 8px rgba(0, 0, 0, 0.18), 0 8px 16px rgba(0, 0, 0, 0." + e + ")" });
}
var showChar = 60,
    ellipsestext = "...",
    moretext = "Show more",
    lesstext = "Show less";
/*!
 * Percent-Preloader JS - v1
 * @author JDM Digital - https://jdmdigital.co
 * Copyright (c) 2022
 */
if (
    ($(".text-limit").each(function () {
        var t = $(this).html();
        if (t.length > showChar) {
            var e = t.substring(0, showChar),
                i = t.substring(showChar, t.length - showChar),
                s = e + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + i + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + "</a></span>";
            $(this).html(s);
        }
    }),
    $(".morelink").on("click", function () {
        return $(this).hasClass("less") ? ($(this).removeClass("less"), $(this).html(moretext)) : ($(this).addClass("less"), $(this).html(lesstext)), $(this).parent().prev().toggle(), $(this).prev().toggle(), !1;
    }),
    (function (t) {
        t.extend({
            playSound: function () {
                return t('<audio class="sound-player" autoplay="autoplay" style="display:none;"><source src="' + arguments[0] + '" /><embed src="' + arguments[0] + '" hidden="true" autostart="true" loop="false"/></audio>').appendTo("body");
            },
            stopSound: function () {
                t(".sound-player").remove();
            },
        });
    })(jQuery),
    $(".ripple-effect").on("click", function (e) {
        0 === $(this).find(".ink").length && $(this).prepend("<span class='ink'></span>"),
            (t = $(this).find(".ink")).removeClass("animate"),
            t.height() || t.width() || ((n = Math.max($(this).outerWidth(), $(this).outerHeight())), t.css({ height: n, width: n })),
            (i = e.pageX - $(this).offset().left - t.width() / 2),
            (s = e.pageY - $(this).offset().top - t.height() / 2),
            t.css({ top: s + "px", left: i + "px" }).addClass("animate");
    }),
    $("div").hasClass("preloader"))
)
    var counting = setInterval(function () {
        var t = document.getElementById("percentage"),
            e = parseInt(t.innerHTML),
            i = 99 - e,
            s = document.getElementById("loader-progress");
        (t.innerHTML = ++e),
            e > 89 &&
                ((t.innerHTML = 90),
                window.jQuery &&
                    ((t.innerHTML = 95),
                    "interactive" == document.readyState && (t.innerHTML = 99),
                    "complete" == document.readyState &&
                        (clearInterval(counting),
                        (t.innerHTML = 100),
                        jQuery("body").toggleClass("page-loaded"),
                        setTimeout(function () {
                            jQuery("nav").css("visibility", "visible");
                        }, 880)))),
            (s.style.transition = "0.15s"),
            (s.style.width = i + "%");
    }, 20);
