var $videoSrc;
! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e((t = t || self).bootstrap = {}, t.jQuery, t.Popper)
}(this, function (t, e, n) {
    "use strict";

    function i(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }

    function s(t, e, n) {
        return e && i(t.prototype, e), n && i(t, n), t
    }

    function o(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function r(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(t);
            e && (i = i.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })), n.push.apply(n, i)
        }
        return n
    }

    function a(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2 ? r(Object(n), !0).forEach(function (e) {
                o(t, e, n[e])
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : r(Object(n)).forEach(function (e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
            })
        }
        return t
    }
    e = e && e.hasOwnProperty("default") ? e.default : e, n = n && n.hasOwnProperty("default") ? n.default : n, e(window).on("load", function () {
        e(".loading").fadeOut("slow")
    });
    var l = "transitionend";
    var c = {
        TRANSITION_END: "bsTransitionEnd",
        getUID: function (t) {
            do {
                t += ~~(1e6 * Math.random())
            } while (document.getElementById(t));
            return t
        },
        getSelectorFromElement: function (t) {
            var e = t.getAttribute("data-target");
            if (!e || "#" === e) {
                var n = t.getAttribute("href");
                e = n && "#" !== n ? n.trim() : ""
            }
            try {
                return document.querySelector(e) ? e : null
            } catch (t) {
                return null
            }
        },
        getTransitionDurationFromElement: function (t) {
            if (!t) return 0;
            var n = e(t).css("transition-duration"),
                i = e(t).css("transition-delay"),
                s = parseFloat(n),
                o = parseFloat(i);
            return s || o ? (n = n.split(",")[0], i = i.split(",")[0], 1e3 * (parseFloat(n) + parseFloat(i))) : 0
        },
        reflow: function (t) {
            return t.offsetHeight
        },
        triggerTransitionEnd: function (t) {
            e(t).trigger(l)
        },
        supportsTransitionEnd: function () {
            return Boolean(l)
        },
        isElement: function (t) {
            return (t[0] || t).nodeType
        },
        typeCheckConfig: function (t, e, n) {
            for (var i in n)
                if (Object.prototype.hasOwnProperty.call(n, i)) {
                    var s = n[i],
                        o = e[i],
                        r = o && c.isElement(o) ? "element" : (a = o, {}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());
                    if (!new RegExp(s).test(r)) throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + r + '" but expected type "' + s + '".')
                }
            var a
        },
        findShadowRoot: function (t) {
            if (!document.documentElement.attachShadow) return null;
            if ("function" == typeof t.getRootNode) {
                var e = t.getRootNode();
                return e instanceof ShadowRoot ? e : null
            }
            return t instanceof ShadowRoot ? t : t.parentNode ? c.findShadowRoot(t.parentNode) : null
        },
        jQueryDetection: function () {
            if (void 0 === e) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
            var t = e.fn.jquery.split(" ")[0].split(".");
            if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || t[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
        }
    };
    c.jQueryDetection(), e.fn.emulateTransitionEnd = function (t) {
        var n = this,
            i = !1;
        return e(this).one(c.TRANSITION_END, function () {
            i = !0
        }), setTimeout(function () {
            i || c.triggerTransitionEnd(n)
        }, t), this
    }, e.event.special[c.TRANSITION_END] = {
        bindType: l,
        delegateType: l,
        handle: function (t) {
            if (e(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
        }
    };
    var h = e.fn.alert,
        u = "close.bs.alert",
        d = "closed.bs.alert",
        f = "click.bs.alert.data-api",
        g = function () {
            function t(t) {
                this._element = t
            }
            var n = t.prototype;
            return n.close = function (t) {
                var e = this._element;
                t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
            }, n.dispose = function () {
                e.removeData(this._element, "bs.alert"), this._element = null
            }, n._getRootElement = function (t) {
                var n = c.getSelectorFromElement(t),
                    i = !1;
                return n && (i = document.querySelector(n)), i || (i = e(t).closest(".alert")[0]), i
            }, n._triggerCloseEvent = function (t) {
                var n = e.Event(u);
                return e(t).trigger(n), n
            }, n._removeElement = function (t) {
                var n = this;
                if (e(t).removeClass("show"), e(t).hasClass("fade")) {
                    var i = c.getTransitionDurationFromElement(t);
                    e(t).one(c.TRANSITION_END, function (e) {
                        return n._destroyElement(t, e)
                    }).emulateTransitionEnd(i)
                } else this._destroyElement(t)
            }, n._destroyElement = function (t) {
                e(t).detach().trigger(d).remove()
            }, t._jQueryInterface = function (n) {
                return this.each(function () {
                    var i = e(this),
                        s = i.data("bs.alert");
                    s || (s = new t(this), i.data("bs.alert", s)), "close" === n && s[n](this)
                })
            }, t._handleDismiss = function (t) {
                return function (e) {
                    e && e.preventDefault(), t.close(this)
                }
            }, s(t, null, [{
                key: "VERSION",
                get: function () {
                    return "5.1"
                }
            }]), t
        }();
    e(document).on(f, '[data-dismiss="alert"]', g._handleDismiss(new g)), e.fn.alert = g._jQueryInterface, e.fn.alert.Constructor = g, e.fn.alert.noConflict = function () {
        return e.fn.alert = h, g._jQueryInterface
    };
    var m = e.fn.button,
        p = "active",
        _ = '[data-toggle^="button"]',
        v = 'input:not([type="hidden"])',
        y = ".btn",
        b = "click.bs.button.data-api",
        E = "focus.bs.button.data-api blur.bs.button.data-api",
        w = "load.bs.button.data-api",
        T = function () {
            function t(t) {
                this._element = t
            }
            var n = t.prototype;
            return n.toggle = function () {
                var t = !0,
                    n = !0,
                    i = e(this._element).closest('[data-toggle="buttons"]')[0];
                if (i) {
                    var s = this._element.querySelector(v);
                    if (s) {
                        if ("radio" === s.type)
                            if (s.checked && this._element.classList.contains(p)) t = !1;
                            else {
                                var o = i.querySelector(".active");
                                o && e(o).removeClass(p)
                            }
                        else "checkbox" === s.type ? "LABEL" === this._element.tagName && s.checked === this._element.classList.contains(p) && (t = !1) : t = !1;
                        t && (s.checked = !this._element.classList.contains(p), e(s).trigger("change")), s.focus(), n = !1
                    }
                }
                this._element.hasAttribute("disabled") || this._element.classList.contains("disabled") || (n && this._element.setAttribute("aria-pressed", !this._element.classList.contains(p)), t && e(this._element).toggleClass(p))
            }, n.dispose = function () {
                e.removeData(this._element, "bs.button"), this._element = null
            }, t._jQueryInterface = function (n) {
                return this.each(function () {
                    var i = e(this).data("bs.button");
                    i || (i = new t(this), e(this).data("bs.button", i)), "toggle" === n && i[n]()
                })
            }, s(t, null, [{
                key: "VERSION",
                get: function () {
                    return "5.1"
                }
            }]), t
        }();
    e(document).on(b, _, function (t) {
        var n = t.target;
        if (e(n).hasClass("btn") || (n = e(n).closest(y)[0]), !n || n.hasAttribute("disabled") || n.classList.contains("disabled")) t.preventDefault();
        else {
            var i = n.querySelector(v);
            if (i && (i.hasAttribute("disabled") || i.classList.contains("disabled"))) return void t.preventDefault();
            T._jQueryInterface.call(e(n), "toggle")
        }
    }).on(E, _, function (t) {
        var n = e(t.target).closest(y)[0];
        e(n).toggleClass("focus", /^focus(in)?$/.test(t.type))
    }), e(window).on(w, function () {
        for (var t = [].slice.call(document.querySelectorAll('[data-toggle="buttons"] .btn')), e = 0, n = t.length; e < n; e++) {
            var i = t[e],
                s = i.querySelector(v);
            s.checked || s.hasAttribute("checked") ? i.classList.add(p) : i.classList.remove(p)
        }
        for (var o = 0, r = (t = [].slice.call(document.querySelectorAll('[data-toggle="button"]'))).length; o < r; o++) {
            var a = t[o];
            "true" === a.getAttribute("aria-pressed") ? a.classList.add(p) : a.classList.remove(p)
        }
    }), e.fn.button = T._jQueryInterface, e.fn.button.Constructor = T, e.fn.button.noConflict = function () {
        return e.fn.button = m, T._jQueryInterface
    };
    var C = "carousel",
        S = e.fn[C],
        A = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
            touch: !0
        },
        I = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean"
        },
        D = "next",
        k = "prev",
        N = "slide.bs.carousel",
        O = "slid.bs.carousel",
        j = "keydown.bs.carousel",
        x = "mouseenter.bs.carousel",
        L = "mouseleave.bs.carousel",
        P = "touchstart.bs.carousel",
        R = "touchmove.bs.carousel",
        $ = "touchend.bs.carousel",
        q = "pointerdown.bs.carousel",
        F = "pointerup.bs.carousel",
        M = "dragstart.bs.carousel",
        Q = "load.bs.carousel.data-api",
        B = "click.bs.carousel.data-api",
        H = "active",
        V = {
            ACTIVE: ".active",
            ACTIVE_ITEM: ".active.carousel-item",
            ITEM: ".carousel-item",
            ITEM_IMG: ".carousel-item img",
            NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
            INDICATORS: ".carousel-indicators",
            DATA_SLIDE: "[data-slide], [data-slide-to]",
            DATA_RIDE: '[data-ride="carousel"]'
        },
        U = {
            TOUCH: "touch",
            PEN: "pen"
        },
        W = function () {
            function t(t, e) {
                this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = this._element.querySelector(V.INDICATORS), this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners()
            }
            var n = t.prototype;
            return n.next = function () {
                this._isSliding || this._slide(D)
            }, n.nextWhenVisible = function () {
                !document.hidden && e(this._element).is(":visible") && "hidden" !== e(this._element).css("visibility") && this.next()
            }, n.prev = function () {
                this._isSliding || this._slide(k)
            }, n.pause = function (t) {
                t || (this._isPaused = !0), this._element.querySelector(V.NEXT_PREV) && (c.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
            }, n.cycle = function (t) {
                t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
            }, n.to = function (t) {
                var n = this;
                this._activeElement = this._element.querySelector(V.ACTIVE_ITEM);
                var i = this._getItemIndex(this._activeElement);
                if (!(t > this._items.length - 1 || t < 0))
                    if (this._isSliding) e(this._element).one(O, function () {
                        return n.to(t)
                    });
                    else {
                        if (i === t) return this.pause(), void this.cycle();
                        var s = t > i ? D : k;
                        this._slide(s, this._items[t])
                    }
            }, n.dispose = function () {
                e(this._element).off(".bs.carousel"), e.removeData(this._element, "bs.carousel"), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
            }, n._getConfig = function (t) {
                return t = a({}, A, {}, t), c.typeCheckConfig(C, t, I), t
            }, n._handleSwipe = function () {
                var t = Math.abs(this.touchDeltaX);
                if (!(t <= 40)) {
                    var e = t / this.touchDeltaX;
                    this.touchDeltaX = 0, e > 0 && this.prev(), e < 0 && this.next()
                }
            }, n._addEventListeners = function () {
                var t = this;
                this._config.keyboard && e(this._element).on(j, function (e) {
                    return t._keydown(e)
                }), "hover" === this._config.pause && e(this._element).on(x, function (e) {
                    return t.pause(e)
                }).on(L, function (e) {
                    return t.cycle(e)
                }), this._config.touch && this._addTouchEventListeners()
            }, n._addTouchEventListeners = function () {
                var t = this;
                if (this._touchSupported) {
                    var n = function (e) {
                        t._pointerEvent && U[e.originalEvent.pointerType.toUpperCase()] ? t.touchStartX = e.originalEvent.clientX : t._pointerEvent || (t.touchStartX = e.originalEvent.touches[0].clientX)
                    },
                        i = function (e) {
                            t._pointerEvent && U[e.originalEvent.pointerType.toUpperCase()] && (t.touchDeltaX = e.originalEvent.clientX - t.touchStartX), t._handleSwipe(), "hover" === t._config.pause && (t.pause(), t.touchTimeout && clearTimeout(t.touchTimeout), t.touchTimeout = setTimeout(function (e) {
                                return t.cycle(e)
                            }, 500 + t._config.interval))
                        };
                    e(this._element.querySelectorAll(V.ITEM_IMG)).on(M, function (t) {
                        return t.preventDefault()
                    }), this._pointerEvent ? (e(this._element).on(q, function (t) {
                        return n(t)
                    }), e(this._element).on(F, function (t) {
                        return i(t)
                    }), this._element.classList.add("pointer-event")) : (e(this._element).on(P, function (t) {
                        return n(t)
                    }), e(this._element).on(R, function (e) {
                        return function (e) {
                            e.originalEvent.touches && e.originalEvent.touches.length > 1 ? t.touchDeltaX = 0 : t.touchDeltaX = e.originalEvent.touches[0].clientX - t.touchStartX
                        }(e)
                    }), e(this._element).on($, function (t) {
                        return i(t)
                    }))
                }
            }, n._keydown = function (t) {
                if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                    case 37:
                        t.preventDefault(), this.prev();
                        break;
                    case 39:
                        t.preventDefault(), this.next()
                }
            }, n._getItemIndex = function (t) {
                return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(V.ITEM)) : [], this._items.indexOf(t)
            }, n._getItemByDirection = function (t, e) {
                var n = t === D,
                    i = t === k,
                    s = this._getItemIndex(e),
                    o = this._items.length - 1;
                if ((i && 0 === s || n && s === o) && !this._config.wrap) return e;
                var r = (s + (t === k ? -1 : 1)) % this._items.length;
                return -1 === r ? this._items[this._items.length - 1] : this._items[r]
            }, n._triggerSlideEvent = function (t, n) {
                var i = this._getItemIndex(t),
                    s = this._getItemIndex(this._element.querySelector(V.ACTIVE_ITEM)),
                    o = e.Event(N, {
                        relatedTarget: t,
                        direction: n,
                        from: s,
                        to: i
                    });
                return e(this._element).trigger(o), o
            }, n._setActiveIndicatorElement = function (t) {
                if (this._indicatorsElement) {
                    var n = [].slice.call(this._indicatorsElement.querySelectorAll(V.ACTIVE));
                    e(n).removeClass(H);
                    var i = this._indicatorsElement.children[this._getItemIndex(t)];
                    i && e(i).addClass(H)
                }
            }, n._slide = function (t, n) {
                var i, s, o, r = this,
                    a = this._element.querySelector(V.ACTIVE_ITEM),
                    l = this._getItemIndex(a),
                    h = n || a && this._getItemByDirection(t, a),
                    u = this._getItemIndex(h),
                    d = Boolean(this._interval);
                if (t === D ? (i = "carousel-item-left", s = "carousel-item-next", o = "left") : (i = "carousel-item-right", s = "carousel-item-prev", o = "right"), h && e(h).hasClass(H)) this._isSliding = !1;
                else if (!this._triggerSlideEvent(h, o).isDefaultPrevented() && a && h) {
                    this._isSliding = !0, d && this.pause(), this._setActiveIndicatorElement(h);
                    var f = e.Event(O, {
                        relatedTarget: h,
                        direction: o,
                        from: l,
                        to: u
                    });
                    if (e(this._element).hasClass("slide")) {
                        e(h).addClass(s), c.reflow(h), e(a).addClass(i), e(h).addClass(i);
                        var g = parseInt(h.getAttribute("data-interval"), 10);
                        g ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = g) : this._config.interval = this._config.defaultInterval || this._config.interval;
                        var m = c.getTransitionDurationFromElement(a);
                        e(a).one(c.TRANSITION_END, function () {
                            e(h).removeClass(i + " " + s).addClass(H), e(a).removeClass(H + " " + s + " " + i), r._isSliding = !1, setTimeout(function () {
                                return e(r._element).trigger(f)
                            }, 0)
                        }).emulateTransitionEnd(m)
                    } else e(a).removeClass(H), e(h).addClass(H), this._isSliding = !1, e(this._element).trigger(f);
                    d && this.cycle()
                }
            }, t._jQueryInterface = function (n) {
                return this.each(function () {
                    var i = e(this).data("bs.carousel"),
                        s = a({}, A, {}, e(this).data());
                    "object" == typeof n && (s = a({}, s, {}, n));
                    var o = "string" == typeof n ? n : s.slide;
                    if (i || (i = new t(this, s), e(this).data("bs.carousel", i)), "number" == typeof n) i.to(n);
                    else if ("string" == typeof o) {
                        if (void 0 === i[o]) throw new TypeError('No method named "' + o + '"');
                        i[o]()
                    } else s.interval && s.ride && (i.pause(), i.cycle())
                })
            }, t._dataApiClickHandler = function (n) {
                var i = c.getSelectorFromElement(this);
                if (i) {
                    var s = e(i)[0];
                    if (s && e(s).hasClass("carousel")) {
                        var o = a({}, e(s).data(), {}, e(this).data()),
                            r = this.getAttribute("data-slide-to");
                        r && (o.interval = !1), t._jQueryInterface.call(e(s), o), r && e(s).data("bs.carousel").to(r), n.preventDefault()
                    }
                }
            }, s(t, null, [{
                key: "VERSION",
                get: function () {
                    return "5.1"
                }
            }, {
                key: "Default",
                get: function () {
                    return A
                }
            }]), t
        }();
    e(document).on(B, V.DATA_SLIDE, W._dataApiClickHandler), e(window).on(Q, function () {
        for (var t = [].slice.call(document.querySelectorAll(V.DATA_RIDE)), n = 0, i = t.length; n < i; n++) {
            var s = e(t[n]);
            W._jQueryInterface.call(s, s.data())
        }
    }), e.fn[C] = W._jQueryInterface, e.fn[C].Constructor = W, e.fn[C].noConflict = function () {
        return e.fn[C] = S, W._jQueryInterface
    };
    var z = "collapse",
        G = e.fn[z],
        K = {
            toggle: !0,
            parent: ""
        },
        X = {
            toggle: "boolean",
            parent: "(string|element)"
        },
        Y = "show.bs.collapse",
        J = "shown.bs.collapse",
        Z = "hide.bs.collapse",
        tt = "hidden.bs.collapse",
        et = "click.bs.collapse.data-api",
        nt = "show",
        it = "collapse",
        st = "collapsing",
        ot = "collapsed",
        rt = {
            ACTIVES: ".show, .collapsing",
            DATA_TOGGLE: '[data-toggle="collapse"]'
        },
        at = function () {
            function t(t, e) {
                this._isTransitioning = !1, this._element = t, this._config = this._getConfig(e), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'));
                for (var n = [].slice.call(document.querySelectorAll(rt.DATA_TOGGLE)), i = 0, s = n.length; i < s; i++) {
                    var o = n[i],
                        r = c.getSelectorFromElement(o),
                        a = [].slice.call(document.querySelectorAll(r)).filter(function (e) {
                            return e === t
                        });
                    null !== r && a.length > 0 && (this._selector = r, this._triggerArray.push(o))
                }
                this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
            }
            var n = t.prototype;
            return n.toggle = function () {
                e(this._element).hasClass(nt) ? this.hide() : this.show()
            }, n.show = function () {
                var n, i, s = this;
                if (!(this._isTransitioning || e(this._element).hasClass(nt) || (this._parent && 0 === (n = [].slice.call(this._parent.querySelectorAll(rt.ACTIVES)).filter(function (t) {
                    return "string" == typeof s._config.parent ? t.getAttribute("data-parent") === s._config.parent : t.classList.contains(it)
                })).length && (n = null), n && (i = e(n).not(this._selector).data("bs.collapse")) && i._isTransitioning))) {
                    var o = e.Event(Y);
                    if (e(this._element).trigger(o), !o.isDefaultPrevented()) {
                        n && (t._jQueryInterface.call(e(n).not(this._selector), "hide"), i || e(n).data("bs.collapse", null));
                        var r = this._getDimension();
                        e(this._element).removeClass(it).addClass(st), this._element.style[r] = 0, this._triggerArray.length && e(this._triggerArray).removeClass(ot).attr("aria-expanded", !0), this.setTransitioning(!0);
                        var a = "scroll" + (r[0].toUpperCase() + r.slice(1)),
                            l = c.getTransitionDurationFromElement(this._element);
                        e(this._element).one(c.TRANSITION_END, function () {
                            e(s._element).removeClass(st).addClass(it).addClass(nt), s._element.style[r] = "", s.setTransitioning(!1), e(s._element).trigger(J)
                        }).emulateTransitionEnd(l), this._element.style[r] = this._element[a] + "px"
                    }
                }
            }, n.hide = function () {
                var t = this;
                if (!this._isTransitioning && e(this._element).hasClass(nt)) {
                    var n = e.Event(Z);
                    if (e(this._element).trigger(n), !n.isDefaultPrevented()) {
                        var i = this._getDimension();
                        this._element.style[i] = this._element.getBoundingClientRect()[i] + "px", c.reflow(this._element), e(this._element).addClass(st).removeClass(it).removeClass(nt);
                        var s = this._triggerArray.length;
                        if (s > 0)
                            for (var o = 0; o < s; o++) {
                                var r = this._triggerArray[o],
                                    a = c.getSelectorFromElement(r);
                                null !== a && (e([].slice.call(document.querySelectorAll(a))).hasClass(nt) || e(r).addClass(ot).attr("aria-expanded", !1))
                            }
                        this.setTransitioning(!0), this._element.style[i] = "";
                        var l = c.getTransitionDurationFromElement(this._element);
                        e(this._element).one(c.TRANSITION_END, function () {
                            t.setTransitioning(!1), e(t._element).removeClass(st).addClass(it).trigger(tt)
                        }).emulateTransitionEnd(l)
                    }
                }
            }, n.setTransitioning = function (t) {
                this._isTransitioning = t
            }, n.dispose = function () {
                e.removeData(this._element, "bs.collapse"), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
            }, n._getConfig = function (t) {
                return (t = a({}, K, {}, t)).toggle = Boolean(t.toggle), c.typeCheckConfig(z, t, X), t
            }, n._getDimension = function () {
                return e(this._element).hasClass("width") ? "width" : "height"
            }, n._getParent = function () {
                var n, i = this;
                c.isElement(this._config.parent) ? (n = this._config.parent, void 0 !== this._config.parent.jquery && (n = this._config.parent[0])) : n = document.querySelector(this._config.parent);
                var s = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
                    o = [].slice.call(n.querySelectorAll(s));
                return e(o).each(function (e, n) {
                    i._addAriaAndCollapsedClass(t._getTargetFromElement(n), [n])
                }), n
            }, n._addAriaAndCollapsedClass = function (t, n) {
                var i = e(t).hasClass(nt);
                n.length && e(n).toggleClass(ot, !i).attr("aria-expanded", i)
            }, t._getTargetFromElement = function (t) {
                var e = c.getSelectorFromElement(t);
                return e ? document.querySelector(e) : null
            }, t._jQueryInterface = function (n) {
                return this.each(function () {
                    var i = e(this),
                        s = i.data("bs.collapse"),
                        o = a({}, K, {}, i.data(), {}, "object" == typeof n && n ? n : {});
                    if (!s && o.toggle && /show|hide/.test(n) && (o.toggle = !1), s || (s = new t(this, o), i.data("bs.collapse", s)), "string" == typeof n) {
                        if (void 0 === s[n]) throw new TypeError('No method named "' + n + '"');
                        s[n]()
                    }
                })
            }, s(t, null, [{
                key: "VERSION",
                get: function () {
                    return "5.1"
                }
            }, {
                key: "Default",
                get: function () {
                    return K
                }
            }]), t
        }();
    e(document).on(et, rt.DATA_TOGGLE, function (t) {
        "A" === t.currentTarget.tagName && t.preventDefault();
        var n = e(this),
            i = c.getSelectorFromElement(this),
            s = [].slice.call(document.querySelectorAll(i));
        e(s).each(function () {
            var t = e(this),
                i = t.data("bs.collapse") ? "toggle" : n.data();
            at._jQueryInterface.call(t, i)
        })
    }), e.fn[z] = at._jQueryInterface, e.fn[z].Constructor = at, e.fn[z].noConflict = function () {
        return e.fn[z] = G, at._jQueryInterface
    };
    var lt = "dropdown",
        ct = e.fn[lt],
        ht = new RegExp("38|40|27"),
        ut = "hide.bs.dropdown",
        dt = "hidden.bs.dropdown",
        ft = "show.bs.dropdown",
        gt = "shown.bs.dropdown",
        mt = "click.bs.dropdown",
        pt = "click.bs.dropdown.data-api",
        _t = "keydown.bs.dropdown.data-api",
        vt = "keyup.bs.dropdown.data-api",
        yt = "disabled",
        bt = "show",
        Et = "dropdown-menu-right",
        wt = '[data-toggle="dropdown"]',
        Tt = ".dropdown-menu",
        Ct = {
            offset: 0,
            flip: !0,
            boundary: "scrollParent",
            reference: "toggle",
            display: "dynamic",
            popperConfig: null
        },
        St = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string",
            popperConfig: "(null|object)"
        },
        At = function () {
            function t(t, e) {
                this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
            }
            var i = t.prototype;
            return i.toggle = function () {
                if (!this._element.disabled && !e(this._element).hasClass(yt)) {
                    var n = e(this._menu).hasClass(bt);
                    t._clearMenus(), n || this.show(!0)
                }
            }, i.show = function (i) {
                if (void 0 === i && (i = !1), !(this._element.disabled || e(this._element).hasClass(yt) || e(this._menu).hasClass(bt))) {
                    var s = {
                        relatedTarget: this._element
                    },
                        o = e.Event(ft, s),
                        r = t._getParentFromElement(this._element);
                    if (e(r).trigger(o), !o.isDefaultPrevented()) {
                        if (!this._inNavbar && i) {
                            if (void 0 === n) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                            var a = this._element;
                            "parent" === this._config.reference ? a = r : c.isElement(this._config.reference) && (a = this._config.reference, void 0 !== this._config.reference.jquery && (a = this._config.reference[0])), "scrollParent" !== this._config.boundary && e(r).addClass("position-static"), this._popper = new n(a, this._menu, this._getPopperConfig())
                        }
                        "ontouchstart" in document.documentElement && 0 === e(r).closest(".navbar-nav").length && e(document.body).children().on("mouseover", null, e.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), e(this._menu).toggleClass(bt), e(r).toggleClass(bt).trigger(e.Event(gt, s))
                    }
                }
            }, i.hide = function () {
                if (!this._element.disabled && !e(this._element).hasClass(yt) && e(this._menu).hasClass(bt)) {
                    var n = {
                        relatedTarget: this._element
                    },
                        i = e.Event(ut, n),
                        s = t._getParentFromElement(this._element);
                    e(s).trigger(i), i.isDefaultPrevented() || (this._popper && this._popper.destroy(), e(this._menu).toggleClass(bt), e(s).toggleClass(bt).trigger(e.Event(dt, n)))
                }
            }, i.dispose = function () {
                e.removeData(this._element, "bs.dropdown"), e(this._element).off(".bs.dropdown"), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null)
            }, i.update = function () {
                this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
            }, i._addEventListeners = function () {
                var t = this;
                e(this._element).on(mt, function (e) {
                    e.preventDefault(), e.stopPropagation(), t.toggle()
                })
            }, i._getConfig = function (t) {
                return t = a({}, this.constructor.Default, {}, e(this._element).data(), {}, t), c.typeCheckConfig(lt, t, this.constructor.DefaultType), t
            }, i._getMenuElement = function () {
                if (!this._menu) {
                    var e = t._getParentFromElement(this._element);
                    e && (this._menu = e.querySelector(Tt))
                }
                return this._menu
            }, i._getPlacement = function () {
                var t = e(this._element.parentNode),
                    n = "bottom-start";
                return t.hasClass("dropup") ? (n = "top-start", e(this._menu).hasClass(Et) && (n = "top-end")) : t.hasClass("dropright") ? n = "right-start" : t.hasClass("dropleft") ? n = "left-start" : e(this._menu).hasClass(Et) && (n = "bottom-end"), n
            }, i._detectNavbar = function () {
                return e(this._element).closest(".navbar").length > 0
            }, i._getOffset = function () {
                var t = this,
                    e = {};
                return "function" == typeof this._config.offset ? e.fn = function (e) {
                    return e.offsets = a({}, e.offsets, {}, t._config.offset(e.offsets, t._element) || {}), e
                } : e.offset = this._config.offset, e
            }, i._getPopperConfig = function () {
                var t = {
                    placement: this._getPlacement(),
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {
                            enabled: this._config.flip
                        },
                        preventOverflow: {
                            boundariesElement: this._config.boundary
                        }
                    }
                };
                return "static" === this._config.display && (t.modifiers.applyStyle = {
                    enabled: !1
                }), a({}, t, {}, this._config.popperConfig)
            }, t._jQueryInterface = function (n) {
                return this.each(function () {
                    var i = e(this).data("bs.dropdown");
                    if (i || (i = new t(this, "object" == typeof n ? n : null), e(this).data("bs.dropdown", i)), "string" == typeof n) {
                        if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
                        i[n]()
                    }
                })
            }, t._clearMenus = function (n) {
                if (!n || 3 !== n.which && ("keyup" !== n.type || 9 === n.which))
                    for (var i = [].slice.call(document.querySelectorAll(wt)), s = 0, o = i.length; s < o; s++) {
                        var r = t._getParentFromElement(i[s]),
                            a = e(i[s]).data("bs.dropdown"),
                            l = {
                                relatedTarget: i[s]
                            };
                        if (n && "click" === n.type && (l.clickEvent = n), a) {
                            var c = a._menu;
                            if (e(r).hasClass(bt) && !(n && ("click" === n.type && /input|textarea/i.test(n.target.tagName) || "keyup" === n.type && 9 === n.which) && e.contains(r, n.target))) {
                                var h = e.Event(ut, l);
                                e(r).trigger(h), h.isDefaultPrevented() || ("ontouchstart" in document.documentElement && e(document.body).children().off("mouseover", null, e.noop), i[s].setAttribute("aria-expanded", "false"), a._popper && a._popper.destroy(), e(c).removeClass(bt), e(r).removeClass(bt).trigger(e.Event(dt, l)))
                            }
                        }
                    }
            }, t._getParentFromElement = function (t) {
                var e, n = c.getSelectorFromElement(t);
                return n && (e = document.querySelector(n)), e || t.parentNode
            }, t._dataApiKeydownHandler = function (n) {
                if ((/input|textarea/i.test(n.target.tagName) ? !(32 === n.which || 27 !== n.which && (40 !== n.which && 38 !== n.which || e(n.target).closest(Tt).length)) : ht.test(n.which)) && (n.preventDefault(), n.stopPropagation(), !this.disabled && !e(this).hasClass(yt))) {
                    var i = t._getParentFromElement(this),
                        s = e(i).hasClass(bt);
                    if (s || 27 !== n.which)
                        if (s && (!s || 27 !== n.which && 32 !== n.which)) {
                            var o = [].slice.call(i.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)")).filter(function (t) {
                                return e(t).is(":visible")
                            });
                            if (0 !== o.length) {
                                var r = o.indexOf(n.target);
                                38 === n.which && r > 0 && r--, 40 === n.which && r < o.length - 1 && r++, r < 0 && (r = 0), o[r].focus()
                            }
                        } else {
                            if (27 === n.which) {
                                var a = i.querySelector(wt);
                                e(a).trigger("focus")
                            }
                            e(this).trigger("click")
                        }
                }
            }, s(t, null, [{
                key: "VERSION",
                get: function () {
                    return "5.1"
                }
            }, {
                key: "Default",
                get: function () {
                    return Ct
                }
            }, {
                key: "DefaultType",
                get: function () {
                    return St
                }
            }]), t
        }();
    e(document).on(_t, wt, At._dataApiKeydownHandler).on(_t, Tt, At._dataApiKeydownHandler).on(pt + " " + vt, At._clearMenus).on(pt, wt, function (t) {
        t.preventDefault(), t.stopPropagation(), At._jQueryInterface.call(e(this), "toggle")
    }).on(pt, ".dropdown form", function (t) {
        t.stopPropagation()
    }), e.fn[lt] = At._jQueryInterface, e.fn[lt].Constructor = At, e.fn[lt].noConflict = function () {
        return e.fn[lt] = ct, At._jQueryInterface
    };
    var It = e.fn.modal,
        Dt = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        },
        kt = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        },
        Nt = "hide.bs.modal",
        Ot = "hidePrevented.bs.modal",
        jt = "hidden.bs.modal",
        xt = "show.bs.modal",
        Lt = "shown.bs.modal",
        Pt = "focusin.bs.modal",
        Rt = "resize.bs.modal",
        $t = "click.dismiss.bs.modal",
        qt = "keydown.dismiss.bs.modal",
        Ft = "mouseup.dismiss.bs.modal",
        Mt = "mousedown.dismiss.bs.modal",
        Qt = "click.bs.modal.data-api",
        Bt = "modal-open",
        Ht = "fade",
        Vt = "show",
        Ut = "modal-static",
        Wt = {
            DIALOG: ".modal-dialog",
            MODAL_BODY: ".modal-body",
            DATA_TOGGLE: '[data-toggle="modal"]',
            DATA_DISMISS: '[data-dismiss="modal"]',
            FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
            STICKY_CONTENT: ".sticky-top"
        },
        zt = function () {
            function t(t, e) {
                this._config = this._getConfig(e), this._element = t, this._dialog = t.querySelector(Wt.DIALOG), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0
            }
            var n = t.prototype;
            return n.toggle = function (t) {
                return this._isShown ? this.hide() : this.show(t)
            }, n.show = function (t) {
                var n = this;
                if (!this._isShown && !this._isTransitioning) {
                    e(this._element).hasClass(Ht) && (this._isTransitioning = !0);
                    var i = e.Event(xt, {
                        relatedTarget: t
                    });
                    e(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), e(this._element).on($t, Wt.DATA_DISMISS, function (t) {
                        return n.hide(t)
                    }), e(this._dialog).on(Mt, function () {
                        e(n._element).one(Ft, function (t) {
                            e(t.target).is(n._element) && (n._ignoreBackdropClick = !0)
                        })
                    }), this._showBackdrop(function () {
                        return n._showElement(t)
                    }))
                }
            }, n.hide = function (t) {
                var n = this;
                if (t && t.preventDefault(), this._isShown && !this._isTransitioning) {
                    var i = e.Event(Nt);
                    if (e(this._element).trigger(i), this._isShown && !i.isDefaultPrevented()) {
                        this._isShown = !1;
                        var s = e(this._element).hasClass(Ht);
                        if (s && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), e(document).off(Pt), e(this._element).removeClass(Vt), e(this._element).off($t), e(this._dialog).off(Mt), s) {
                            var o = c.getTransitionDurationFromElement(this._element);
                            e(this._element).one(c.TRANSITION_END, function (t) {
                                return n._hideModal(t)
                            }).emulateTransitionEnd(o)
                        } else this._hideModal()
                    }
                }
            }, n.dispose = function () {
                [window, this._element, this._dialog].forEach(function (t) {
                    return e(t).off(".bs.modal")
                }), e(document).off(Pt), e.removeData(this._element, "bs.modal"), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
            }, n.handleUpdate = function () {
                this._adjustDialog()
            }, n._getConfig = function (t) {
                return t = a({}, Dt, {}, t), c.typeCheckConfig("modal", t, kt), t
            }, n._triggerBackdropTransition = function () {
                var t = this;
                if ("static" === this._config.backdrop) {
                    var n = e.Event(Ot);
                    if (e(this._element).trigger(n), n.defaultPrevented) return;
                    this._element.classList.add(Ut);
                    var i = c.getTransitionDurationFromElement(this._element);
                    e(this._element).one(c.TRANSITION_END, function () {
                        t._element.classList.remove(Ut)
                    }).emulateTransitionEnd(i), this._element.focus()
                } else this.hide()
            }, n._showElement = function (t) {
                var n = this,
                    i = e(this._element).hasClass(Ht),
                    s = this._dialog ? this._dialog.querySelector(Wt.MODAL_BODY) : null;
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), e(this._dialog).hasClass("modal-dialog-scrollable") && s ? s.scrollTop = 0 : this._element.scrollTop = 0, i && c.reflow(this._element), e(this._element).addClass(Vt), this._config.focus && this._enforceFocus();
                var o = e.Event(Lt, {
                    relatedTarget: t
                }),
                    r = function () {
                        n._config.focus && n._element.focus(), n._isTransitioning = !1, e(n._element).trigger(o)
                    };
                if (i) {
                    var a = c.getTransitionDurationFromElement(this._dialog);
                    e(this._dialog).one(c.TRANSITION_END, r).emulateTransitionEnd(a)
                } else r()
            }, n._enforceFocus = function () {
                var t = this;
                e(document).off(Pt).on(Pt, function (n) {
                    document !== n.target && t._element !== n.target && 0 === e(t._element).has(n.target).length && t._element.focus()
                })
            }, n._setEscapeEvent = function () {
                var t = this;
                this._isShown && this._config.keyboard ? e(this._element).on(qt, function (e) {
                    27 === e.which && t._triggerBackdropTransition()
                }) : this._isShown || e(this._element).off(qt)
            }, n._setResizeEvent = function () {
                var t = this;
                this._isShown ? e(window).on(Rt, function (e) {
                    return t.handleUpdate(e)
                }) : e(window).off(Rt)
            }, n._hideModal = function () {
                var t = this;
                this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._isTransitioning = !1, this._showBackdrop(function () {
                    e(document.body).removeClass(Bt), t._resetAdjustments(), t._resetScrollbar(), e(t._element).trigger(jt)
                })
            }, n._removeBackdrop = function () {
                this._backdrop && (e(this._backdrop).remove(), this._backdrop = null)
            }, n._showBackdrop = function (t) {
                var n = this,
                    i = e(this._element).hasClass(Ht) ? Ht : "";
                if (this._isShown && this._config.backdrop) {
                    if (this._backdrop = document.createElement("div"), this._backdrop.className = "modal-backdrop", i && this._backdrop.classList.add(i), e(this._backdrop).appendTo(document.body), e(this._element).on($t, function (t) {
                        n._ignoreBackdropClick ? n._ignoreBackdropClick = !1 : t.target === t.currentTarget && n._triggerBackdropTransition()
                    }), i && c.reflow(this._backdrop), e(this._backdrop).addClass(Vt), !t) return;
                    if (!i) return void t();
                    var s = c.getTransitionDurationFromElement(this._backdrop);
                    e(this._backdrop).one(c.TRANSITION_END, t).emulateTransitionEnd(s)
                } else if (!this._isShown && this._backdrop) {
                    e(this._backdrop).removeClass(Vt);
                    var o = function () {
                        n._removeBackdrop(), t && t()
                    };
                    if (e(this._element).hasClass(Ht)) {
                        var r = c.getTransitionDurationFromElement(this._backdrop);
                        e(this._backdrop).one(c.TRANSITION_END, o).emulateTransitionEnd(r)
                    } else o()
                } else t && t()
            }, n._adjustDialog = function () {
                var t = this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
            }, n._resetAdjustments = function () {
                this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
            }, n._checkScrollbar = function () {
                var t = document.body.getBoundingClientRect();
                this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
            }, n._setScrollbar = function () {
                var t = this;
                if (this._isBodyOverflowing) {
                    var n = [].slice.call(document.querySelectorAll(Wt.FIXED_CONTENT)),
                        i = [].slice.call(document.querySelectorAll(Wt.STICKY_CONTENT));
                    e(n).each(function (n, i) {
                        var s = i.style.paddingRight,
                            o = e(i).css("padding-right");
                        e(i).data("padding-right", s).css("padding-right", parseFloat(o) + t._scrollbarWidth + "px")
                    }), e(i).each(function (n, i) {
                        var s = i.style.marginRight,
                            o = e(i).css("margin-right");
                        e(i).data("margin-right", s).css("margin-right", parseFloat(o) - t._scrollbarWidth + "px")
                    });
                    var s = document.body.style.paddingRight,
                        o = e(document.body).css("padding-right");
                    e(document.body).data("padding-right", s).css("padding-right", parseFloat(o) + this._scrollbarWidth + "px")
                }
                e(document.body).addClass(Bt)
            }, n._resetScrollbar = function () {
                var t = [].slice.call(document.querySelectorAll(Wt.FIXED_CONTENT));
                e(t).each(function (t, n) {
                    var i = e(n).data("padding-right");
                    e(n).removeData("padding-right"), n.style.paddingRight = i || ""
                });
                var n = [].slice.call(document.querySelectorAll("" + Wt.STICKY_CONTENT));
                e(n).each(function (t, n) {
                    var i = e(n).data("margin-right");
                    void 0 !== i && e(n).css("margin-right", i).removeData("margin-right")
                });
                var i = e(document.body).data("padding-right");
                e(document.body).removeData("padding-right"), document.body.style.paddingRight = i || ""
            }, n._getScrollbarWidth = function () {
                var t = document.createElement("div");
                t.className = "modal-scrollbar-measure", document.body.appendChild(t);
                var e = t.getBoundingClientRect().width - t.clientWidth;
                return document.body.removeChild(t), e
            }, t._jQueryInterface = function (n, i) {
                return this.each(function () {
                    var s = e(this).data("bs.modal"),
                        o = a({}, Dt, {}, e(this).data(), {}, "object" == typeof n && n ? n : {});
                    if (s || (s = new t(this, o), e(this).data("bs.modal", s)), "string" == typeof n) {
                        if (void 0 === s[n]) throw new TypeError('No method named "' + n + '"');
                        s[n](i)
                    } else o.show && s.show(i)
                })
            }, s(t, null, [{
                key: "VERSION",
                get: function () {
                    return "5.1"
                }
            }, {
                key: "Default",
                get: function () {
                    return Dt
                }
            }]), t
        }();
    e(document).on(Qt, Wt.DATA_TOGGLE, function (t) {
        var n, i = this,
            s = c.getSelectorFromElement(this);
        s && (n = document.querySelector(s));
        var o = e(n).data("bs.modal") ? "toggle" : a({}, e(n).data(), {}, e(this).data());
        "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
        var r = e(n).one(xt, function (t) {
            t.isDefaultPrevented() || r.one(jt, function () {
                e(i).is(":visible") && i.focus()
            })
        });
        zt._jQueryInterface.call(e(n), o, this)
    }), e.fn.modal = zt._jQueryInterface, e.fn.modal.Constructor = zt, e.fn.modal.noConflict = function () {
        return e.fn.modal = It, zt._jQueryInterface
    };
    var Gt = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
        Kt = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:\/?#]*(?:[\/?#]|$))/gi,
        Xt = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;

    function Yt(t, e, n) {
        if (0 === t.length) return t;
        if (n && "function" == typeof n) return n(t);
        for (var i = (new window.DOMParser).parseFromString(t, "text/html"), s = Object.keys(e), o = [].slice.call(i.body.querySelectorAll("*")), r = function (t, n) {
            var i = o[t],
                r = i.nodeName.toLowerCase();
            if (-1 === s.indexOf(i.nodeName.toLowerCase())) return i.parentNode.removeChild(i), "continue";
            var a = [].slice.call(i.attributes),
                l = [].concat(e["*"] || [], e[r] || []);
            a.forEach(function (t) {
                (function (t, e) {
                    var n = t.nodeName.toLowerCase();
                    if (-1 !== e.indexOf(n)) return -1 === Gt.indexOf(n) || Boolean(t.nodeValue.match(Kt) || t.nodeValue.match(Xt));
                    for (var i = e.filter(function (t) {
                        return t instanceof RegExp
                    }), s = 0, o = i.length; s < o; s++)
                        if (n.match(i[s])) return !0;
                    return !1
                })(t, l) || i.removeAttribute(t.nodeName)
            })
        }, a = 0, l = o.length; a < l; a++) r(a);
        return i.body.innerHTML
    }
    var Jt = "tooltip",
        Zt = e.fn.tooltip,
        te = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
        ee = ["sanitize", "whiteList", "sanitizeFn"],
        ne = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)",
            boundary: "(string|element)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            whiteList: "object",
            popperConfig: "(null|object)"
        },
        ie = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: "right",
            BOTTOM: "bottom",
            LEFT: "left"
        },
        se = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent",
            sanitize: !0,
            sanitizeFn: null,
            whiteList: {
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
                img: ["src", "alt", "title", "width", "height"],
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
                ul: []
            },
            popperConfig: null
        },
        oe = "show",
        re = {
            HIDE: "hide.bs.tooltip",
            HIDDEN: "hidden.bs.tooltip",
            SHOW: "show.bs.tooltip",
            SHOWN: "shown.bs.tooltip",
            INSERTED: "inserted.bs.tooltip",
            CLICK: "click.bs.tooltip",
            FOCUSIN: "focusin.bs.tooltip",
            FOCUSOUT: "focusout.bs.tooltip",
            MOUSEENTER: "mouseenter.bs.tooltip",
            MOUSELEAVE: "mouseleave.bs.tooltip"
        },
        ae = "fade",
        le = "show",
        ce = "hover",
        he = "focus",
        ue = function () {
            function t(t, e) {
                if (void 0 === n) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
                this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
            }
            var i = t.prototype;
            return i.enable = function () {
                this._isEnabled = !0
            }, i.disable = function () {
                this._isEnabled = !1
            }, i.toggleEnabled = function () {
                this._isEnabled = !this._isEnabled
            }, i.toggle = function (t) {
                if (this._isEnabled)
                    if (t) {
                        var n = this.constructor.DATA_KEY,
                            i = e(t.currentTarget).data(n);
                        i || (i = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
                    } else {
                        if (e(this.getTipElement()).hasClass(le)) return void this._leave(null, this);
                        this._enter(null, this)
                    }
            }, i.dispose = function () {
                clearTimeout(this._timeout), e.removeData(this.element, this.constructor.DATA_KEY), e(this.element).off(this.constructor.EVENT_KEY), e(this.element).closest(".modal").off("hide.bs.modal", this._hideModalHandler), this.tip && e(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
            }, i.show = function () {
                var t = this;
                if ("none" === e(this.element).css("display")) throw new Error("Please use show on visible elements");
                var i = e.Event(this.constructor.Event.SHOW);
                if (this.isWithContent() && this._isEnabled) {
                    e(this.element).trigger(i);
                    var s = c.findShadowRoot(this.element),
                        o = e.contains(null !== s ? s : this.element.ownerDocument.documentElement, this.element);
                    if (i.isDefaultPrevented() || !o) return;
                    var r = this.getTipElement(),
                        a = c.getUID(this.constructor.NAME);
                    r.setAttribute("id", a), this.element.setAttribute("aria-describedby", a), this.setContent(), this.config.animation && e(r).addClass(ae);
                    var l = "function" == typeof this.config.placement ? this.config.placement.call(this, r, this.element) : this.config.placement,
                        h = this._getAttachment(l);
                    this.addAttachmentClass(h);
                    var u = this._getContainer();
                    e(r).data(this.constructor.DATA_KEY, this), e.contains(this.element.ownerDocument.documentElement, this.tip) || e(r).appendTo(u), e(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new n(this.element, r, this._getPopperConfig(h)), e(r).addClass(le), "ontouchstart" in document.documentElement && e(document.body).children().on("mouseover", null, e.noop);
                    var d = function () {
                        t.config.animation && t._fixTransition();
                        var n = t._hoverState;
                        t._hoverState = null, e(t.element).trigger(t.constructor.Event.SHOWN), "out" === n && t._leave(null, t)
                    };
                    if (e(this.tip).hasClass(ae)) {
                        var f = c.getTransitionDurationFromElement(this.tip);
                        e(this.tip).one(c.TRANSITION_END, d).emulateTransitionEnd(f)
                    } else d()
                }
            }, i.hide = function (t) {
                var n = this,
                    i = this.getTipElement(),
                    s = e.Event(this.constructor.Event.HIDE),
                    o = function () {
                        n._hoverState !== oe && i.parentNode && i.parentNode.removeChild(i), n._cleanTipClass(), n.element.removeAttribute("aria-describedby"), e(n.element).trigger(n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), t && t()
                    };
                if (e(this.element).trigger(s), !s.isDefaultPrevented()) {
                    if (e(i).removeClass(le), "ontouchstart" in document.documentElement && e(document.body).children().off("mouseover", null, e.noop), this._activeTrigger.click = !1, this._activeTrigger[he] = !1, this._activeTrigger[ce] = !1, e(this.tip).hasClass(ae)) {
                        var r = c.getTransitionDurationFromElement(i);
                        e(i).one(c.TRANSITION_END, o).emulateTransitionEnd(r)
                    } else o();
                    this._hoverState = ""
                }
            }, i.update = function () {
                null !== this._popper && this._popper.scheduleUpdate()
            }, i.isWithContent = function () {
                return Boolean(this.getTitle())
            }, i.addAttachmentClass = function (t) {
                e(this.getTipElement()).addClass("bs-tooltip-" + t)
            }, i.getTipElement = function () {
                return this.tip = this.tip || e(this.config.template)[0], this.tip
            }, i.setContent = function () {
                var t = this.getTipElement();
                this.setElementContent(e(t.querySelectorAll(".tooltip-inner")), this.getTitle()), e(t).removeClass(ae + " " + le)
            }, i.setElementContent = function (t, n) {
                "object" != typeof n || !n.nodeType && !n.jquery ? this.config.html ? (this.config.sanitize && (n = Yt(n, this.config.whiteList, this.config.sanitizeFn)), t.html(n)) : t.text(n) : this.config.html ? e(n).parent().is(t) || t.empty().append(n) : t.text(e(n).text())
            }, i.getTitle = function () {
                var t = this.element.getAttribute("data-original-title");
                return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
            }, i._getPopperConfig = function (t) {
                var e = this;
                return a({}, {
                    placement: t,
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {
                            behavior: this.config.fallbackPlacement
                        },
                        arrow: {
                            element: ".arrow"
                        },
                        preventOverflow: {
                            boundariesElement: this.config.boundary
                        }
                    },
                    onCreate: function (t) {
                        t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                    },
                    onUpdate: function (t) {
                        return e._handlePopperPlacementChange(t)
                    }
                }, {}, this.config.popperConfig)
            }, i._getOffset = function () {
                var t = this,
                    e = {};
                return "function" == typeof this.config.offset ? e.fn = function (e) {
                    return e.offsets = a({}, e.offsets, {}, t.config.offset(e.offsets, t.element) || {}), e
                } : e.offset = this.config.offset, e
            }, i._getContainer = function () {
                return !1 === this.config.container ? document.body : c.isElement(this.config.container) ? e(this.config.container) : e(document).find(this.config.container)
            }, i._getAttachment = function (t) {
                return ie[t.toUpperCase()]
            }, i._setListeners = function () {
                var t = this;
                this.config.trigger.split(" ").forEach(function (n) {
                    if ("click" === n) e(t.element).on(t.constructor.Event.CLICK, t.config.selector, function (e) {
                        return t.toggle(e)
                    });
                    else if ("manual" !== n) {
                        var i = n === ce ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN,
                            s = n === ce ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT;
                        e(t.element).on(i, t.config.selector, function (e) {
                            return t._enter(e)
                        }).on(s, t.config.selector, function (e) {
                            return t._leave(e)
                        })
                    }
                }), this._hideModalHandler = function () {
                    t.element && t.hide()
                }, e(this.element).closest(".modal").on("hide.bs.modal", this._hideModalHandler), this.config.selector ? this.config = a({}, this.config, {
                    trigger: "manual",
                    selector: ""
                }) : this._fixTitle()
            }, i._fixTitle = function () {
                var t = typeof this.element.getAttribute("data-original-title");
                (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
            }, i._enter = function (t, n) {
                var i = this.constructor.DATA_KEY;
                (n = n || e(t.currentTarget).data(i)) || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(i, n)), t && (n._activeTrigger["focusin" === t.type ? he : ce] = !0), e(n.getTipElement()).hasClass(le) || n._hoverState === oe ? n._hoverState = oe : (clearTimeout(n._timeout), n._hoverState = oe, n.config.delay && n.config.delay.show ? n._timeout = setTimeout(function () {
                    n._hoverState === oe && n.show()
                }, n.config.delay.show) : n.show())
            }, i._leave = function (t, n) {
                var i = this.constructor.DATA_KEY;
                (n = n || e(t.currentTarget).data(i)) || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(i, n)), t && (n._activeTrigger["focusout" === t.type ? he : ce] = !1), n._isWithActiveTrigger() || (clearTimeout(n._timeout), n._hoverState = "out", n.config.delay && n.config.delay.hide ? n._timeout = setTimeout(function () {
                    "out" === n._hoverState && n.hide()
                }, n.config.delay.hide) : n.hide())
            }, i._isWithActiveTrigger = function () {
                for (var t in this._activeTrigger)
                    if (this._activeTrigger[t]) return !0;
                return !1
            }, i._getConfig = function (t) {
                var n = e(this.element).data();
                return Object.keys(n).forEach(function (t) {
                    -1 !== ee.indexOf(t) && delete n[t]
                }), "number" == typeof (t = a({}, this.constructor.Default, {}, n, {}, "object" == typeof t && t ? t : {})).delay && (t.delay = {
                    show: t.delay,
                    hide: t.delay
                }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), c.typeCheckConfig(Jt, t, this.constructor.DefaultType), t.sanitize && (t.template = Yt(t.template, t.whiteList, t.sanitizeFn)), t
            }, i._getDelegateConfig = function () {
                var t = {};
                if (this.config)
                    for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                return t
            }, i._cleanTipClass = function () {
                var t = e(this.getTipElement()),
                    n = t.attr("class").match(te);
                null !== n && n.length && t.removeClass(n.join(""))
            }, i._handlePopperPlacementChange = function (t) {
                var e = t.instance;
                this.tip = e.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
            }, i._fixTransition = function () {
                var t = this.getTipElement(),
                    n = this.config.animation;
                null === t.getAttribute("x-placement") && (e(t).removeClass(ae), this.config.animation = !1, this.hide(), this.show(), this.config.animation = n)
            }, t._jQueryInterface = function (n) {
                return this.each(function () {
                    var i = e(this).data("bs.tooltip"),
                        s = "object" == typeof n && n;
                    if ((i || !/dispose|hide/.test(n)) && (i || (i = new t(this, s), e(this).data("bs.tooltip", i)), "string" == typeof n)) {
                        if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
                        i[n]()
                    }
                })
            }, s(t, null, [{
                key: "VERSION",
                get: function () {
                    return "5.1"
                }
            }, {
                key: "Default",
                get: function () {
                    return se
                }
            }, {
                key: "NAME",
                get: function () {
                    return Jt
                }
            }, {
                key: "DATA_KEY",
                get: function () {
                    return "bs.tooltip"
                }
            }, {
                key: "Event",
                get: function () {
                    return re
                }
            }, {
                key: "EVENT_KEY",
                get: function () {
                    return ".bs.tooltip"
                }
            }, {
                key: "DefaultType",
                get: function () {
                    return ne
                }
            }]), t
        }();
    e.fn.tooltip = ue._jQueryInterface, e.fn.tooltip.Constructor = ue, e.fn.tooltip.noConflict = function () {
        return e.fn.tooltip = Zt, ue._jQueryInterface
    };
    var de = e.fn.popover,
        fe = new RegExp("(^|\\s)bs-popover\\S+", "g"),
        ge = a({}, ue.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }),
        me = a({}, ue.DefaultType, {
            content: "(string|element|function)"
        }),
        pe = {
            HIDE: "hide.bs.popover",
            HIDDEN: "hidden.bs.popover",
            SHOW: "show.bs.popover",
            SHOWN: "shown.bs.popover",
            INSERTED: "inserted.bs.popover",
            CLICK: "click.bs.popover",
            FOCUSIN: "focusin.bs.popover",
            FOCUSOUT: "focusout.bs.popover",
            MOUSEENTER: "mouseenter.bs.popover",
            MOUSELEAVE: "mouseleave.bs.popover"
        },
        _e = function (t) {
            var n, i;

            function o() {
                return t.apply(this, arguments) || this
            }
            i = t, (n = o).prototype = Object.create(i.prototype), n.prototype.constructor = n, n.__proto__ = i;
            var r = o.prototype;
            return r.isWithContent = function () {
                return this.getTitle() || this._getContent()
            }, r.addAttachmentClass = function (t) {
                e(this.getTipElement()).addClass("bs-popover-" + t)
            }, r.getTipElement = function () {
                return this.tip = this.tip || e(this.config.template)[0], this.tip
            }, r.setContent = function () {
                var t = e(this.getTipElement());
                this.setElementContent(t.find(".popover-header"), this.getTitle());
                var n = this._getContent();
                "function" == typeof n && (n = n.call(this.element)), this.setElementContent(t.find(".popover-body"), n), t.removeClass("fade show")
            }, r._getContent = function () {
                return this.element.getAttribute("data-content") || this.config.content
            }, r._cleanTipClass = function () {
                var t = e(this.getTipElement()),
                    n = t.attr("class").match(fe);
                null !== n && n.length > 0 && t.removeClass(n.join(""))
            }, o._jQueryInterface = function (t) {
                return this.each(function () {
                    var n = e(this).data("bs.popover"),
                        i = "object" == typeof t ? t : null;
                    if ((n || !/dispose|hide/.test(t)) && (n || (n = new o(this, i), e(this).data("bs.popover", n)), "string" == typeof t)) {
                        if (void 0 === n[t]) throw new TypeError('No method named "' + t + '"');
                        n[t]()
                    }
                })
            }, s(o, null, [{
                key: "VERSION",
                get: function () {
                    return "5.1"
                }
            }, {
                key: "Default",
                get: function () {
                    return ge
                }
            }, {
                key: "NAME",
                get: function () {
                    return "popover"
                }
            }, {
                key: "DATA_KEY",
                get: function () {
                    return "bs.popover"
                }
            }, {
                key: "Event",
                get: function () {
                    return pe
                }
            }, {
                key: "EVENT_KEY",
                get: function () {
                    return ".bs.popover"
                }
            }, {
                key: "DefaultType",
                get: function () {
                    return me
                }
            }]), o
        }(ue);
    e.fn.popover = _e._jQueryInterface, e.fn.popover.Constructor = _e, e.fn.popover.noConflict = function () {
        return e.fn.popover = de, _e._jQueryInterface
    };
    var ve = "scrollspy",
        ye = e.fn[ve],
        be = {
            offset: 10,
            method: "auto",
            target: ""
        },
        Ee = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        },
        we = {
            ACTIVATE: "activate.bs.scrollspy",
            SCROLL: "scroll.bs.scrollspy",
            LOAD_DATA_API: "load.bs.scrollspy.data-api"
        },
        Te = "active",
        Ce = {
            DATA_SPY: '[data-spy="scroll"]',
            ACTIVE: ".active",
            NAV_LIST_GROUP: ".nav, .list-group",
            NAV_LINKS: ".nav-link",
            NAV_ITEMS: ".nav-item",
            LIST_ITEMS: ".list-group-item",
            DROPDOWN: ".dropdown",
            DROPDOWN_ITEMS: ".dropdown-item",
            DROPDOWN_TOGGLE: ".dropdown-toggle"
        },
        Se = "position",
        Ae = function () {
            function t(t, n) {
                var i = this;
                this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(n), this._selector = this._config.target + " " + Ce.NAV_LINKS + "," + this._config.target + " " + Ce.LIST_ITEMS + "," + this._config.target + " " + Ce.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, e(this._scrollElement).on(we.SCROLL, function (t) {
                    return i._process(t)
                }), this.refresh(), this._process()
            }
            var n = t.prototype;
            return n.refresh = function () {
                var t = this,
                    n = this._scrollElement === this._scrollElement.window ? "offset" : Se,
                    i = "auto" === this._config.method ? n : this._config.method,
                    s = i === Se ? this._getScrollTop() : 0;
                this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function (t) {
                    var n, o = c.getSelectorFromElement(t);
                    if (o && (n = document.querySelector(o)), n) {
                        var r = n.getBoundingClientRect();
                        if (r.width || r.height) return [e(n)[i]().top + s, o]
                    }
                    return null
                }).filter(function (t) {
                    return t
                }).sort(function (t, e) {
                    return t[0] - e[0]
                }).forEach(function (e) {
                    t._offsets.push(e[0]), t._targets.push(e[1])
                })
            }, n.dispose = function () {
                e.removeData(this._element, "bs.scrollspy"), e(this._scrollElement).off(".bs.scrollspy"), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
            }, n._getConfig = function (t) {
                if ("string" != typeof (t = a({}, be, {}, "object" == typeof t && t ? t : {})).target) {
                    var n = e(t.target).attr("id");
                    n || (n = c.getUID(ve), e(t.target).attr("id", n)), t.target = "#" + n
                }
                return c.typeCheckConfig(ve, t, Ee), t
            }, n._getScrollTop = function () {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
            }, n._getScrollHeight = function () {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }, n._getOffsetHeight = function () {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
            }, n._process = function () {
                var t = this._getScrollTop() + this._config.offset,
                    e = this._getScrollHeight(),
                    n = this._config.offset + e - this._getOffsetHeight();
                if (this._scrollHeight !== e && this.refresh(), t >= n) {
                    var i = this._targets[this._targets.length - 1];
                    this._activeTarget !== i && this._activate(i)
                } else {
                    if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
                    for (var s = this._offsets.length; s--;) this._activeTarget !== this._targets[s] && t >= this._offsets[s] && (void 0 === this._offsets[s + 1] || t < this._offsets[s + 1]) && this._activate(this._targets[s])
                }
            }, n._activate = function (t) {
                this._activeTarget = t, this._clear();
                var n = this._selector.split(",").map(function (e) {
                    return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
                }),
                    i = e([].slice.call(document.querySelectorAll(n.join(","))));
                i.hasClass("dropdown-item") ? (i.closest(Ce.DROPDOWN).find(Ce.DROPDOWN_TOGGLE).addClass(Te), i.addClass(Te)) : (i.addClass(Te), i.parents(Ce.NAV_LIST_GROUP).prev(Ce.NAV_LINKS + ", " + Ce.LIST_ITEMS).addClass(Te), i.parents(Ce.NAV_LIST_GROUP).prev(Ce.NAV_ITEMS).children(Ce.NAV_LINKS).addClass(Te)), e(this._scrollElement).trigger(we.ACTIVATE, {
                    relatedTarget: t
                })
            }, n._clear = function () {
                [].slice.call(document.querySelectorAll(this._selector)).filter(function (t) {
                    return t.classList.contains(Te)
                }).forEach(function (t) {
                    return t.classList.remove(Te)
                })
            }, t._jQueryInterface = function (n) {
                return this.each(function () {
                    var i = e(this).data("bs.scrollspy");
                    if (i || (i = new t(this, "object" == typeof n && n), e(this).data("bs.scrollspy", i)), "string" == typeof n) {
                        if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
                        i[n]()
                    }
                })
            }, s(t, null, [{
                key: "VERSION",
                get: function () {
                    return "5.1"
                }
            }, {
                key: "Default",
                get: function () {
                    return be
                }
            }]), t
        }();
    e(window).on(we.LOAD_DATA_API, function () {
        for (var t = [].slice.call(document.querySelectorAll(Ce.DATA_SPY)), n = t.length; n--;) {
            var i = e(t[n]);
            Ae._jQueryInterface.call(i, i.data())
        }
    }), e.fn[ve] = Ae._jQueryInterface, e.fn[ve].Constructor = Ae, e.fn[ve].noConflict = function () {
        return e.fn[ve] = ye, Ae._jQueryInterface
    };
    var Ie = e.fn.tab,
        De = "hide.bs.tab",
        ke = "hidden.bs.tab",
        Ne = "show.bs.tab",
        Oe = "shown.bs.tab",
        je = "click.bs.tab.data-api",
        xe = "active",
        Le = ".active",
        Pe = "> li > .active",
        Re = function () {
            function t(t) {
                this._element = t
            }
            var n = t.prototype;
            return n.show = function () {
                var t = this;
                if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && e(this._element).hasClass(xe) || e(this._element).hasClass("disabled"))) {
                    var n, i, s = e(this._element).closest(".nav, .list-group")[0],
                        o = c.getSelectorFromElement(this._element);
                    if (s) {
                        var r = "UL" === s.nodeName || "OL" === s.nodeName ? Pe : Le;
                        i = (i = e.makeArray(e(s).find(r)))[i.length - 1]
                    }
                    var a = e.Event(De, {
                        relatedTarget: this._element
                    }),
                        l = e.Event(Ne, {
                            relatedTarget: i
                        });
                    if (i && e(i).trigger(a), e(this._element).trigger(l), !l.isDefaultPrevented() && !a.isDefaultPrevented()) {
                        o && (n = document.querySelector(o)), this._activate(this._element, s);
                        var h = function () {
                            var n = e.Event(ke, {
                                relatedTarget: t._element
                            }),
                                s = e.Event(Oe, {
                                    relatedTarget: i
                                });
                            e(i).trigger(n), e(t._element).trigger(s)
                        };
                        n ? this._activate(n, n.parentNode, h) : h()
                    }
                }
            }, n.dispose = function () {
                e.removeData(this._element, "bs.tab"), this._element = null
            }, n._activate = function (t, n, i) {
                var s = this,
                    o = (!n || "UL" !== n.nodeName && "OL" !== n.nodeName ? e(n).children(Le) : e(n).find(Pe))[0],
                    r = i && o && e(o).hasClass("fade"),
                    a = function () {
                        return s._transitionComplete(t, o, i)
                    };
                if (o && r) {
                    var l = c.getTransitionDurationFromElement(o);
                    e(o).removeClass("show").one(c.TRANSITION_END, a).emulateTransitionEnd(l)
                } else a()
            }, n._transitionComplete = function (t, n, i) {
                if (n) {
                    e(n).removeClass(xe);
                    var s = e(n.parentNode).find("> .dropdown-menu .active")[0];
                    s && e(s).removeClass(xe), "tab" === n.getAttribute("role") && n.setAttribute("aria-selected", !1)
                }
                if (e(t).addClass(xe), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), c.reflow(t), t.classList.contains("fade") && t.classList.add("show"), t.parentNode && e(t.parentNode).hasClass("dropdown-menu")) {
                    var o = e(t).closest(".dropdown")[0];
                    if (o) {
                        var r = [].slice.call(o.querySelectorAll(".dropdown-toggle"));
                        e(r).addClass(xe)
                    }
                    t.setAttribute("aria-expanded", !0)
                }
                i && i()
            }, t._jQueryInterface = function (n) {
                return this.each(function () {
                    var i = e(this),
                        s = i.data("bs.tab");
                    if (s || (s = new t(this), i.data("bs.tab", s)), "string" == typeof n) {
                        if (void 0 === s[n]) throw new TypeError('No method named "' + n + '"');
                        s[n]()
                    }
                })
            }, s(t, null, [{
                key: "VERSION",
                get: function () {
                    return "5.1"
                }
            }]), t
        }();
    e(document).on(je, '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function (t) {
        t.preventDefault(), Re._jQueryInterface.call(e(this), "show")
    }), e.fn.tab = Re._jQueryInterface, e.fn.tab.Constructor = Re, e.fn.tab.noConflict = function () {
        return e.fn.tab = Ie, Re._jQueryInterface
    };
    var $e = e.fn.toast,
        qe = "click.dismiss.bs.toast",
        Fe = "hide.bs.toast",
        Me = "hidden.bs.toast",
        Qe = "show.bs.toast",
        Be = "shown.bs.toast",
        He = "show",
        Ve = "showing",
        Ue = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        },
        We = {
            animation: !0,
            autohide: !0,
            delay: 500
        },
        ze = function () {
            function t(t, e) {
                this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners()
            }
            var n = t.prototype;
            return n.show = function () {
                var t = this,
                    n = e.Event(Qe);
                if (e(this._element).trigger(n), !n.isDefaultPrevented()) {
                    this._config.animation && this._element.classList.add("fade");
                    var i = function () {
                        t._element.classList.remove(Ve), t._element.classList.add(He), e(t._element).trigger(Be), t._config.autohide && (t._timeout = setTimeout(function () {
                            t.hide()
                        }, t._config.delay))
                    };
                    if (this._element.classList.remove("hide"), c.reflow(this._element), this._element.classList.add(Ve), this._config.animation) {
                        var s = c.getTransitionDurationFromElement(this._element);
                        e(this._element).one(c.TRANSITION_END, i).emulateTransitionEnd(s)
                    } else i()
                }
            }, n.hide = function () {
                if (this._element.classList.contains(He)) {
                    var t = e.Event(Fe);
                    e(this._element).trigger(t), t.isDefaultPrevented() || this._close()
                }
            }, n.dispose = function () {
                clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(He) && this._element.classList.remove(He), e(this._element).off(qe), e.removeData(this._element, "bs.toast"), this._element = null, this._config = null
            }, n._getConfig = function (t) {
                return t = a({}, We, {}, e(this._element).data(), {}, "object" == typeof t && t ? t : {}), c.typeCheckConfig("toast", t, this.constructor.DefaultType), t
            }, n._setListeners = function () {
                var t = this;
                e(this._element).on(qe, '[data-dismiss="toast"]', function () {
                    return t.hide()
                })
            }, n._close = function () {
                var t = this,
                    n = function () {
                        t._element.classList.add("hide"), e(t._element).trigger(Me)
                    };
                if (this._element.classList.remove(He), this._config.animation) {
                    var i = c.getTransitionDurationFromElement(this._element);
                    e(this._element).one(c.TRANSITION_END, n).emulateTransitionEnd(i)
                } else n()
            }, t._jQueryInterface = function (n) {
                return this.each(function () {
                    var i = e(this),
                        s = i.data("bs.toast");
                    if (s || (s = new t(this, "object" == typeof n && n), i.data("bs.toast", s)), "string" == typeof n) {
                        if (void 0 === s[n]) throw new TypeError('No method named "' + n + '"');
                        s[n](this)
                    }
                })
            }, s(t, null, [{
                key: "VERSION",
                get: function () {
                    return "5.1"
                }
            }, {
                key: "DefaultType",
                get: function () {
                    return Ue
                }
            }, {
                key: "Default",
                get: function () {
                    return We
                }
            }]), t
        }();
    ! function (t) {
        t.extend({
            playSound: function () {
                return t('<audio class="sound-player" autoplay="autoplay" style="display:none;"><source src="' + arguments[0] + '" /><embed src="' + arguments[0] + '" hidden="true" autostart="true" loop="false"/></audio>').appendTo("body")
            },
            stopSound: function () {
                t(".sound-player").remove()
            }
        })
    }(jQuery), e(".modal").on("show.bs.modal", function (t) {
        e(".modal .modal-dialog").attr("class", "modal-dialog  fadeInDown  animated")
    }), e(function () {
        var t, n, i, s;
        e(".ripple-effect").click(function (o) {
            0 === e(this).find(".ink").length && e(this).prepend("<span class='ink'></span>"), (t = e(this).find(".ink")).removeClass("animate"), t.height() || t.width() || (n = Math.max(e(this).outerWidth(), e(this).outerHeight()), t.css({
                height: n,
                width: n
            })), i = o.pageX - e(this).offset().left - t.width() / 2, s = o.pageY - e(this).offset().top - t.height() / 2, t.css({
                top: s + "px",
                left: i + "px"
            }).addClass("animate")
        })
    }), e.fn.toast = ze._jQueryInterface, e.fn.toast.Constructor = ze, e.fn.toast.noConflict = function () {
        return e.fn.toast = $e, ze._jQueryInterface
    }, t.Alert = g, t.Button = T, t.Carousel = W, t.Collapse = at, t.Dropdown = At, t.Modal = zt, t.Popover = _e, t.Scrollspy = Ae, t.Tab = Re, t.Toast = ze, t.Tooltip = ue, t.Util = c, Object.defineProperty(t, "__esModule", {
        value: !0
    })
}),
    function (t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
    }(function (t) {
        function e(e, i, s) {
            var o = {
                content: {
                    message: "object" == typeof i ? i.message : i,
                    title: i.title ? i.title : "",
                    icon: i.icon ? i.icon : "",
                    url: i.url ? i.url : "#",
                    target: i.target ? i.target : "-"
                }
            };
            s = t.extend(!0, {}, o, s), this.settings = t.extend(!0, {}, n, s), this._defaults = n, "-" === this.settings.content.target && (this.settings.content.target = this.settings.url_target), this.animations = {
                start: "webkitAnimationStart oanimationstart MSAnimationStart animationstart",
                end: "webkitAnimationEnd oanimationend MSAnimationEnd animationend"
            }, "number" == typeof this.settings.offset && (this.settings.offset = {
                x: this.settings.offset,
                y: this.settings.offset
            }), (this.settings.allow_duplicates || !this.settings.allow_duplicates && ! function (e) {
                var n = !1;
                return t('[data-notify="container"]').each(function (i, s) {
                    var o = t(s),
                        r = o.find('[data-notify="title"]').text().trim(),
                        a = o.find('[data-notify="message"]').html().trim(),
                        l = r === t("<div>" + e.settings.content.title + "</div>").html().trim(),
                        c = a === t("<div>" + e.settings.content.message + "</div>").html().trim(),
                        h = o.hasClass("alert-" + e.settings.type);
                    return l && c && h && (n = !0), !n
                }), n
            }(this)) && this.init()
        }
        var n = {
            element: "body",
            position: null,
            type: "info",
            allow_dismiss: !0,
            allow_duplicates: !0,
            newest_on_top: !1,
            showProgressbar: !1,
            placement: {
                from: "top",
                align: "right"
            },
            offset: 20,
            spacing: 10,
            z_index: 1031,
            delay: 5e3,
            timer: 1e3,
            url_target: "_blank",
            mouse_over: null,
            animate: {
                enter: "animated fadeInDown",
                exit: "animated fadeOutUp"
            },
            onShow: null,
            onShown: null,
            onClose: null,
            onClosed: null,
            icon_type: "class",
            template: '<div data-notify="container" class="col-10 col-xs-11 col-sm-4 alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss">&times;</button><span data-notify="icon"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
        };
        String.format = function () {
            for (var t = arguments[0], e = 1; e < arguments.length; e++) t = t.replace(RegExp("\\{" + (e - 1) + "\\}", "gm"), arguments[e]);
            return t
        }, t.extend(e.prototype, {
            init: function () {
                var t = this;
                this.buildNotify(), this.settings.content.icon && this.setIcon(), "#" != this.settings.content.url && this.styleURL(), this.styleDismiss(), this.placement(), this.bind(), this.notify = {
                    $ele: this.$ele,
                    update: function (e, n) {
                        var i = {};
                        for (var s in "string" == typeof e ? i[e] = n : i = e, i) switch (s) {
                            case "type":
                                this.$ele.removeClass("alert-" + t.settings.type), this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass("progress-bar-" + t.settings.type), t.settings.type = i[s], this.$ele.addClass("alert-" + i[s]).find('[data-notify="progressbar"] > .progress-bar').addClass("progress-bar-" + i[s]);
                                break;
                            case "icon":
                                var o = this.$ele.find('[data-notify="icon"]');
                                "class" === t.settings.icon_type.toLowerCase() ? o.removeClass(t.settings.content.icon).addClass(i[s]) : (o.is("img") || o.find("img"), o.attr("src", i[s]));
                                break;
                            case "progress":
                                var r = t.settings.delay - t.settings.delay * (i[s] / 100);
                                this.$ele.data("notify-delay", r), this.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow", i[s]).css("width", i[s] + "%");
                                break;
                            case "url":
                                this.$ele.find('[data-notify="url"]').attr("href", i[s]);
                                break;
                            case "target":
                                this.$ele.find('[data-notify="url"]').attr("target", i[s]);
                                break;
                            default:
                                this.$ele.find('[data-notify="' + s + '"]').html(i[s])
                        }
                        var a = this.$ele.outerHeight() + parseInt(t.settings.spacing) + parseInt(t.settings.offset.y);
                        t.reposition(a)
                    },
                    close: function () {
                        t.close()
                    }
                }
            },
            buildNotify: function () {
                var e = this.settings.content;
                this.$ele = t(String.format(this.settings.template, this.settings.type, e.title, e.message, e.url, e.target)), this.$ele.attr("data-notify-position", this.settings.placement.from + "-" + this.settings.placement.align), this.settings.allow_dismiss || this.$ele.find('[data-notify="dismiss"]').css("display", "none"), (this.settings.delay <= 0 && !this.settings.showProgressbar || !this.settings.showProgressbar) && this.$ele.find('[data-notify="progressbar"]').remove()
            },
            setIcon: function () {
                "class" === this.settings.icon_type.toLowerCase() ? this.$ele.find('[data-notify="icon"]').addClass(this.settings.content.icon) : this.$ele.find('[data-notify="icon"]').is("img") ? this.$ele.find('[data-notify="icon"]').attr("src", this.settings.content.icon) : this.$ele.find('[data-notify="icon"]').append('<img src="' + this.settings.content.icon + '" alt="Notify Icon" />')
            },
            styleDismiss: function () {
                this.$ele.find('[data-notify="dismiss"]').css({
                    position: "absolute",
                    right: "10px",
                    top: "5px",
                    zIndex: this.settings.z_index + 2
                })
            },
            styleURL: function () {
                this.$ele.find('[data-notify="url"]').css({
                    backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)",
                    height: "100%",
                    left: 0,
                    position: "absolute",
                    top: 0,
                    width: "100%",
                    zIndex: this.settings.z_index + 1
                })
            },
            placement: function () {
                var e = this,
                    n = this.settings.offset.y,
                    i = {
                        display: "inline-block",
                        margin: "0px auto",
                        paddingLeft: "65px",
                        position: this.settings.position ? this.settings.position : "body" === this.settings.element ? "fixed" : "absolute",
                        transition: "all .5s ease-in-out",
                        zIndex: this.settings.z_index
                    },
                    s = !1,
                    o = this.settings;
                switch (t('[data-notify-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])').each(function () {
                    n = Math.max(n, parseInt(t(this).css(o.placement.from)) + parseInt(t(this).outerHeight()) + parseInt(o.spacing))
                }), !0 === this.settings.newest_on_top && (n = this.settings.offset.y), i[this.settings.placement.from] = n + "px", this.settings.placement.align) {
                    case "left":
                    case "right":
                        i[this.settings.placement.align] = this.settings.offset.x + "px";
                        break;
                    case "center":
                        i.left = 0, i.right = 0
                }
                this.$ele.css(i).addClass(this.settings.animate.enter), t.each(Array("webkit-", "moz-", "o-", "ms-", ""), function (t, n) {
                    e.$ele[0].style[n + "AnimationIterationCount"] = 1
                }), t(this.settings.element).append(this.$ele), !0 === this.settings.newest_on_top && (n = parseInt(n) + parseInt(this.settings.spacing) + this.$ele.outerHeight(), this.reposition(n)), t.isFunction(e.settings.onShow) && e.settings.onShow.call(this.$ele), this.$ele.one(this.animations.start, function () {
                    s = !0
                }).one(this.animations.end, function () {
                    e.$ele.removeClass(e.settings.animate.enter), t.isFunction(e.settings.onShown) && e.settings.onShown.call(this)
                }), setTimeout(function () {
                    s || t.isFunction(e.settings.onShown) && e.settings.onShown.call(this)
                }, 600)
            },
            bind: function () {
                var e = this;
                if (this.$ele.find('[data-notify="dismiss"]').on("click", function () {
                    e.close()
                }), this.$ele.mouseover(function () {
                    t(this).data("data-hover", "true")
                }).mouseout(function () {
                    t(this).data("data-hover", "false")
                }), this.$ele.data("data-hover", "false"), this.settings.delay > 0) {
                    e.$ele.data("notify-delay", e.settings.delay);
                    var n = setInterval(function () {
                        var t = parseInt(e.$ele.data("notify-delay")) - e.settings.timer;
                        if ("false" === e.$ele.data("data-hover") && "pause" === e.settings.mouse_over || "pause" != e.settings.mouse_over) {
                            var i = (e.settings.delay - t) / e.settings.delay * 100;
                            e.$ele.data("notify-delay", t), e.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow", i).css("width", i + "%")
                        }
                        t <= -e.settings.timer && (clearInterval(n), e.close())
                    }, e.settings.timer)
                }
            },
            close: function () {
                var e = this,
                    n = parseInt(this.$ele.css(this.settings.placement.from)),
                    i = !1;
                this.$ele.attr("data-closing", "true").addClass(this.settings.animate.exit), e.reposition(n), t.isFunction(e.settings.onClose) && e.settings.onClose.call(this.$ele), this.$ele.one(this.animations.start, function () {
                    i = !0
                }).one(this.animations.end, function () {
                    t(this).remove(), t.isFunction(e.settings.onClosed) && e.settings.onClosed.call(this)
                }), setTimeout(function () {
                    i || (e.$ele.remove(), e.settings.onClosed && e.settings.onClosed(e.$ele))
                }, 600)
            },
            reposition: function (e) {
                var n = this,
                    i = '[data-notify-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])',
                    s = this.$ele.nextAll(i);
                !0 === this.settings.newest_on_top && (s = this.$ele.prevAll(i)), s.each(function () {
                    t(this).css(n.settings.placement.from, e), e = parseInt(e) + parseInt(n.settings.spacing) + t(this).outerHeight()
                })
            }
        }), t.notify = function (t, n) {
            return new e(this, t, n).notify
        }, t.notifyDefaults = function (e) {
            return n = t.extend(!0, {}, n, e)
        }, t.notifyClose = function (e) {
            "warning" === e && (e = "danger"), void 0 === e || "all" === e ? t("[data-notify]").find('[data-notify="dismiss"]').trigger("click") : "success" === e || "info" === e || "warning" === e || "danger" === e ? t(".alert-" + e + "[data-notify]").find('[data-notify="dismiss"]').trigger("click") : e ? t(e + "[data-notify]").find('[data-notify="dismiss"]').trigger("click") : t('[data-notify-position="' + e + '"]').find('[data-notify="dismiss"]').trigger("click")
        }, t.notifyCloseExcept = function (e) {
            "warning" === e && (e = "danger"), "success" === e || "info" === e || "warning" === e || "danger" === e ? t("[data-notify]").not(".alert-" + e).find('[data-notify="dismiss"]').trigger("click") : t("[data-notify]").not(e).find('[data-notify="dismiss"]').trigger("click")
        }
    }), $(".video-btn").click(function () {
        $videoSrc = $(this).data("src")
    }), $("#videoModal").on("shown.bs.modal", function (t) {
        $("#video").attr("src", $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0")
    }), $("#videoModal").on("hide.bs.modal", function (t) {
        $("#video").attr("src", $videoSrc)
    });
const el = document.querySelectorAll(".set-colors");
for (let t = 0; t < el.length; t++) {
    const e = el[t].dataset.setcolor;
     $('[data-setcolor="' + e + '"]').css({
        background: e
    })
}
if ($(".img-cover")[0]) {
    const t = $(".img-cover").attr("src");
    $("body").css({
        "background-image": "url('" + t + "')",
        "background-position": "center",
        "background-repeat": "no-repeat",
        "background-size": "cover",
        "background-attachment": "fixed"
    })
}
if ($("a.scrollLink").click(function (t) {
    t.preventDefault(), $("html, body").animate({
        scrollTop: $($(this).attr("href")).offset().top
    }, 500)
}), $(window).scroll(function () {
    $(this).scrollTop() >= 50 ? $(".goup").fadeIn(200) : $(".goup").fadeOut(200)
}), $(".goup").click(function () {
    $("body,html").animate({
        scrollTop: 0
    }, 500)
}), $(".navbar-toggler-icon")[0]) {
    $(".navbar-toggler-icon").wrapInner('<div class="line-menu half start"></div><div class="line-menu"></div><div class="line-menu half end"></div>');
    var wrapperMenu = document.querySelector(".navbar-toggler-icon");
    wrapperMenu.addEventListener("click", function () {
        wrapperMenu.classList.toggle("open")
    })
}
const SetShadow = document.querySelectorAll(".shadow");
for (let t = 0; t < SetShadow.length; t++) {
    const e = SetShadow[t].dataset.shadow;
    $('[data-shadow="' + e + '"]').css({
        "box-shadow": " 0 0 8px rgba(0, 0, 0, 0.18), 0 8px 16px rgba(0, 0, 0, 0." + e + ")"
    })
}
var showChar = 50,
    ellipsestext = "...",
    moretext = "Show more",
    lesstext = "Show less";
$(".text-limit").each(function () {
    var t = $(this).html();
    if (t.length > showChar) {
        var e = t.substr(0, showChar),
            n = t.substr(showChar, t.length - showChar),
            i = e + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + n + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + "</a></span>";
        $(this).html(i)
    }
}), $(".morelink").click(function () {
    return $(this).hasClass("less") ? ($(this).removeClass("less"), $(this).html(moretext)) : ($(this).addClass("less"), $(this).html(lesstext)), $(this).parent().prev().toggle(), $(this).prev().toggle(), !1

});
const bg_glass = ["x1", "x2", "x3", "x4", "x5", "x6", "x7"];
for (let bg = 0; bg < bg_glass.length; bg++) {
    const element = ".bg-glass-" + bg_glass[bg];
    if ($(element)[0]) {
        var SetGlass = element.replace('.bg-glass-x', '');
        $(element).css({ "background": "rgba(0, 0, 0, 0." + SetGlass + "0)",
         "backdrop-filter" :  "blur(6.3px)",
        "-webkit-backdrop-filter" : "blur(6.3px)",
        "border" : "1px solid rgba(50, 55, 66, 0.10)"});
        // console.log("exists class -> " + element);
    } else {
        // console.log("Not exists -> "+element);
    }
}


const bg_limit = ["-glass-x1", "-glass-x2", "-glass-x3",
 "-glass-x4", "-glass-x5", "-glass-x6", "-glass-x7"];

const bg_class = [".primary", ".success", ".danger",
 ".warning", ".info", ".dark", ".light"];



for (let ex = 0; ex < bg_class.length; ex++) {
    /** Primary Class */
    if($(".primary"+bg_limit[ex])[0])
    {  
        var primaryClass = ".primary"+bg_limit[ex];  
        const GlassVal = primaryClass.replace(/[^0-9\/]/g,'');
        $(primaryClass).css({ "background": " rgba(2, 104, 212, 0."+GlassVal+"0)",
        "backdrop-filter" :  "blur(6.3px)",
       "-webkit-backdrop-filter" : "blur(6.3px)",
       "border" : "1px solid rgba(50, 55, 66, 0.10)"});
       
    }

     /** success Class */
     if($(".success"+bg_limit[ex])[0])
     {  
         var primaryClass = ".success"+bg_limit[ex];  
         const GlassVal = primaryClass.replace(/[^0-9\/]/g,'');
         $(primaryClass).css({ "background": " rgba(46, 147, 42, 0."+GlassVal+"0)",
         "backdrop-filter" :  "blur(6.3px)",
        "-webkit-backdrop-filter" : "blur(6.3px)",
        "border" : "1px solid rgba(50, 55, 66, 0.10)"});
        
     }
      /** success Class */
      if($(".danger"+bg_limit[ex])[0])
      {  
          var primaryClass = ".danger"+bg_limit[ex];  
          const GlassVal = primaryClass.replace(/[^0-9\/]/g,'');
          $(primaryClass).css({ "background": " rgba(220, 53, 69, 0."+GlassVal+"0)",
          "backdrop-filter" :  "blur(6.3px)",
         "-webkit-backdrop-filter" : "blur(6.3px)",
         "border" : "1px solid rgba(50, 55, 66, 0.10)"});
         
      }

       /** warning Class */
       if($(".warning"+bg_limit[ex])[0])
       {  
           var primaryClass = ".warning"+bg_limit[ex];  
           const GlassVal = primaryClass.replace(/[^0-9\/]/g,'');
           $(primaryClass).css({ "background": " rgba(255, 193, 7, 0."+GlassVal+"0)",
           "backdrop-filter" :  "blur(6.3px)",
          "-webkit-backdrop-filter" : "blur(6.3px)",
          "border" : "1px solid rgba(50, 55, 66, 0.10)"});
          
       }
        /** info Class */
        if($(".info"+bg_limit[ex])[0])
        {  
            var primaryClass = ".info"+bg_limit[ex];  
            const GlassVal = primaryClass.replace(/[^0-9\/]/g,'');
            $(primaryClass).css({ "background": " rgba(23, 162, 184, 0."+GlassVal+"0)",
            "backdrop-filter" :  "blur(6.3px)",
           "-webkit-backdrop-filter" : "blur(6.3px)",
           "border" : "1px solid rgba(50, 55, 66, 0.10)"});
           
        }
         /** dark Class */
         if($(".dark"+bg_limit[ex])[0])
         {  
             var primaryClass = ".dark"+bg_limit[ex];  
             const GlassVal = primaryClass.replace(/[^0-9\/]/g,'');
             $(primaryClass).css({ "background": " rgba(0, 0, 0, 0."+GlassVal+"0)",
             "backdrop-filter" :  "blur(6.3px)",
            "-webkit-backdrop-filter" : "blur(6.3px)",
            "border" : "1px solid rgba(50, 55, 66, 0.10)"});
            
         }
          /** light Class */
          if($(".light"+bg_limit[ex])[0])
          {  
              var primaryClass = ".light"+bg_limit[ex];  
              const GlassVal = primaryClass.replace(/[^0-9\/]/g,'');
              $(primaryClass).css({ "background": " rgba(255, 255, 255, 0."+GlassVal+"0)",
              "backdrop-filter" :  "blur(6.3px)",              
             "-webkit-backdrop-filter" : "blur(6.3px)",
             "border" : "1px solid rgba(50, 55, 66, 0.10)"});
             
          }
 
}

/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},a.each(["onResize","onThrottledResize"],a.proxy(function(b,c){this._handlers[c]=a.proxy(this[c],this)},this)),a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a.charAt(0).toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Workers,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}e.Defaults={items:3,loop:!1,center:!1,rewind:!1,checkVisibility:!0,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,fallbackEasing:"swing",slideTransition:"",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Type={Event:"event",State:"state"},e.Plugins={},e.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(a){var b=this.settings.margin||"",c=!this.settings.autoWidth,d=this.settings.rtl,e={width:"auto","margin-left":d?b:"","margin-right":d?"":b};!c&&this.$stage.children().css(e),a.css=e}},{filter:["width","items","settings"],run:function(a){var b=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,c=null,d=this._items.length,e=!this.settings.autoWidth,f=[];for(a.items={merge:!1,width:b};d--;)c=this._mergers[d],c=this.settings.mergeFit&&Math.min(c,this.settings.items)||c,a.items.merge=c>1||a.items.merge,f[d]=e?b*c:this._items[d].width();this._widths=f}},{filter:["items","settings"],run:function(){var b=[],c=this._items,d=this.settings,e=Math.max(2*d.items,4),f=2*Math.ceil(c.length/2),g=d.loop&&c.length?d.rewind?e:Math.max(e,f):0,h="",i="";for(g/=2;g>0;)b.push(this.normalize(b.length/2,!0)),h+=c[b[b.length-1]][0].outerHTML,b.push(this.normalize(c.length-1-(b.length-1)/2,!0)),i=c[b[b.length-1]][0].outerHTML+i,g-=1;this._clones=b,a(h).addClass("cloned").appendTo(this.$stage),a(i).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var a=this.settings.rtl?1:-1,b=this._clones.length+this._items.length,c=-1,d=0,e=0,f=[];++c<b;)d=f[c-1]||0,e=this._widths[this.relative(c)]+this.settings.margin,f.push(d+e*a);this._coordinates=f}},{filter:["width","items","settings"],run:function(){var a=this.settings.stagePadding,b=this._coordinates,c={width:Math.ceil(Math.abs(b[b.length-1]))+2*a,"padding-left":a||"","padding-right":a||""};this.$stage.css(c)}},{filter:["width","items","settings"],run:function(a){var b=this._coordinates.length,c=!this.settings.autoWidth,d=this.$stage.children();if(c&&a.items.merge)for(;b--;)a.css.width=this._widths[this.relative(b)],d.eq(b).css(a.css);else c&&(a.css.width=a.items.width,d.css(a.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(a){a.current=a.current?this.$stage.children().index(a.current):0,a.current=Math.max(this.minimum(),Math.min(this.maximum(),a.current)),this.reset(a.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;c<d;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass("active"),this.$stage.children(".center").removeClass("center"),this.settings.center&&this.$stage.children().eq(this.current()).addClass("center")}}],e.prototype.initializeStage=function(){this.$stage=this.$element.find("."+this.settings.stageClass),this.$stage.length||(this.$element.addClass(this.options.loadingClass),this.$stage=a("<"+this.settings.stageElement+">",{class:this.settings.stageClass}).wrap(a("<div/>",{class:this.settings.stageOuterClass})),this.$element.append(this.$stage.parent()))},e.prototype.initializeItems=function(){var b=this.$element.find(".owl-item");if(b.length)return this._items=b.get().map(function(b){return a(b)}),this._mergers=this._items.map(function(){return 1}),void this.refresh();this.replace(this.$element.children().not(this.$stage.parent())),this.isVisible()?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)},e.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var a,b,c;a=this.$element.find("img"),b=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,c=this.$element.children(b).width(),a.length&&c<=0&&this.preloadAutoWidthImages(a)}this.initializeStage(),this.initializeItems(),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},e.prototype.isVisible=function(){return!this.settings.checkVisibility||this.$element.is(":visible")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){a<=b&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),"function"==typeof e.stagePadding&&(e.stagePadding=e.stagePadding()),delete e.responsive,e.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+d))):e=a.extend({},this.options),this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}})},e.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};b<c;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={},!this.is("valid")&&this.enter("valid")},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return!!this._items.length&&(this._width!==this.$element.width()&&(!!this.isVisible()&&(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized")))))},e.prototype.registerEventHandlers=function(){a.support.transition&&this.$stage.on(a.support.transition.end+".owl.core",a.proxy(this.onTransitionEnd,this)),!1!==this.settings.responsive&&this.on(b,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",a.proxy(this.onDragEnd,this)))},e.prototype.onDragStart=function(b){var d=null;3!==b.which&&(a.support.transform?(d=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),d={x:d[16===d.length?12:4],y:d[16===d.length?13:5]}):(d=this.$stage.position(),d={x:this.settings.rtl?d.left+this.$stage.width()-this.width()+this.settings.margin:d.left,y:d.top}),this.is("animating")&&(a.support.transform?this.animate(d.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===b.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=a(b.target),this._drag.stage.start=d,this._drag.stage.current=d,this._drag.pointer=this.pointer(b),a(c).on("mouseup.owl.core touchend.owl.core",a.proxy(this.onDragEnd,this)),a(c).one("mousemove.owl.core touchmove.owl.core",a.proxy(function(b){var d=this.difference(this._drag.pointer,this.pointer(b));a(c).on("mousemove.owl.core touchmove.owl.core",a.proxy(this.onDragMove,this)),Math.abs(d.x)<Math.abs(d.y)&&this.is("valid")||(b.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},e.prototype.onDragMove=function(a){var b=null,c=null,d=null,e=this.difference(this._drag.pointer,this.pointer(a)),f=this.difference(this._drag.stage.start,e);this.is("dragging")&&(a.preventDefault(),this.settings.loop?(b=this.coordinates(this.minimum()),c=this.coordinates(this.maximum()+1)-b,f.x=((f.x-b)%c+c)%c+b):(b=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum()),c=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum()),d=this.settings.pullDrag?-1*e.x/5:0,f.x=Math.max(Math.min(f.x,b+d),c+d)),this._drag.stage.current=f,this.animate(f.x))},e.prototype.onDragEnd=function(b){var d=this.difference(this._drag.pointer,this.pointer(b)),e=this._drag.stage.current,f=d.x>0^this.settings.rtl?"left":"right";a(c).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==d.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(e.x,0!==d.x?f:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=f,(Math.abs(d.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},e.prototype.closest=function(b,c){var e=-1,f=30,g=this.width(),h=this.coordinates();return this.settings.freeDrag||a.each(h,a.proxy(function(a,i){return"left"===c&&b>i-f&&b<i+f?e=a:"right"===c&&b>i-g-f&&b<i-g+f?e=a+1:this.op(b,"<",i)&&this.op(b,">",h[a+1]!==d?h[a+1]:i-g)&&(e="left"===c?a+1:a),-1===e},this)),this.settings.loop||(this.op(b,">",h[this.minimum()])?e=b=this.minimum():this.op(b,"<",h[this.maximum()])&&(e=b=this.maximum())),e},e.prototype.animate=function(b){var c=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),c&&(this.enter("animating"),this.trigger("translate")),a.support.transform3d&&a.support.transition?this.$stage.css({transform:"translate3d("+b+"px,0px,0px)",transition:this.speed()/1e3+"s"+(this.settings.slideTransition?" "+this.settings.slideTransition:"")}):c?this.$stage.animate({left:b+"px"},this.speed(),this.settings.fallbackEasing,a.proxy(this.onTransitionEnd,this)):this.$stage.css({left:b+"px"})},e.prototype.is=function(a){return this._states.current[a]&&this._states.current[a]>0},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(b){return"string"===a.type(b)&&(this._invalidated[b]=!0,this.is("valid")&&this.leave("valid")),a.map(this._invalidated,function(a,b){return b})},e.prototype.reset=function(a){(a=this.normalize(a))!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(a,b){var c=this._items.length,e=b?0:this._clones.length;return!this.isNumeric(a)||c<1?a=d:(a<0||a>=c+e)&&(a=((a-e/2)%c+c)%c+e/2),a},e.prototype.relative=function(a){return a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=this.settings,f=this._coordinates.length;if(e.loop)f=this._clones.length/2+this._items.length-1;else if(e.autoWidth||e.merge){if(b=this._items.length)for(c=this._items[--b].width(),d=this.$element.width();b--&&!((c+=this._items[b].width()+this.settings.margin)>d););f=b+1}else f=e.center?this._items.length-1:this._items.length-e.items;return a&&(f-=this._clones.length/2),Math.max(f,0)},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2==0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c,e=1,f=b-1;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(this.settings.rtl&&(e=-1,f=b+1),c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[f]||0))/2*e):c=this._coordinates[f]||0,c=Math.ceil(c))},e.prototype.duration=function(a,b,c){return 0===c?0:Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(a,b){var c=this.current(),d=null,e=a-this.relative(c),f=(e>0)-(e<0),g=this._items.length,h=this.minimum(),i=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(e)>g/2&&(e+=-1*f*g),a=c+e,(d=((a-h)%g+g)%g+h)!==a&&d-e<=i&&d-e>0&&(c=d-e,a=d,this.reset(c))):this.settings.rewind?(i+=1,a=(a%i+i)%i):a=Math.max(h,Math.min(i,a)),this.speed(this.duration(c,a,b)),this.current(a),this.isVisible()&&this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.onTransitionEnd=function(a){if(a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0)))return!1;this.leave("animating"),this.trigger("translated")},e.prototype.viewport=function(){var d;return this.options.responsiveBaseElement!==b?d=a(this.options.responsiveBaseElement).width():b.innerWidth?d=b.innerWidth:c.documentElement&&c.documentElement.clientWidth?d=c.documentElement.clientWidth:console.warn("Can not detect viewport width."),d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)},this)),this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(b,c){var e=this.relative(this._current);c=c===d?this._items.length:this.normalize(c,!0),b=b instanceof jQuery?b:a(b),this.trigger("add",{content:b,position:c}),b=this.prepare(b),0===this._items.length||c===this._items.length?(0===this._items.length&&this.$stage.append(b),0!==this._items.length&&this._items[c-1].after(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)):(this._items[c].before(b),this._items.splice(c,0,b),this._mergers.splice(c,0,1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)),this._items[e]&&this.reset(this._items[e].index()),this.invalidate("items"),this.trigger("added",{content:b,position:c})},e.prototype.remove=function(a){(a=this.normalize(a,!0))!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.preloadAutoWidthImages=function(b){b.each(a.proxy(function(b,c){this.enter("pre-loading"),c=a(c),a(new Image).one("load",a.proxy(function(a){c.attr("src",a.target.src),c.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",c.attr("src")||c.attr("data-src")||c.attr("data-src-retina"))},this))},e.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),a(c).off(".owl.core"),!1!==this.settings.responsive&&(b.clearTimeout(this.resizeTimer),this.off(b,"resize",this._handlers.onThrottledResize));for(var d in this._plugins)this._plugins[d].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$stage.remove(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:a<c;case">":return d?a<c:a>c;case">=":return d?a<=c:a>=c;case"<=":return d?a>=c:a<=c}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d,f,g){var h={item:{count:this._items.length,index:this.current()}},i=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),j=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},h,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(j)}),this.register({type:e.Type.Event,name:b}),this.$element.trigger(j),this.settings&&"function"==typeof this.settings[i]&&this.settings[i].call(this,j)),j},e.prototype.enter=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]===d&&(this._states.current[b]=0),this._states.current[b]++},this))},e.prototype.leave=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]--},this))},e.prototype.register=function(b){if(b.type===e.Type.Event){if(a.event.special[b.name]||(a.event.special[b.name]={}),!a.event.special[b.name].owl){var c=a.event.special[b.name]._default;a.event.special[b.name]._default=function(a){return!c||!c.apply||a.namespace&&-1!==a.namespace.indexOf("owl")?a.namespace&&a.namespace.indexOf("owl")>-1:c.apply(this,arguments)},a.event.special[b.name].owl=!0}}else b.type===e.Type.State&&(this._states.tags[b.name]?this._states.tags[b.name]=this._states.tags[b.name].concat(b.tags):this._states.tags[b.name]=b.tags,this._states.tags[b.name]=a.grep(this._states.tags[b.name],a.proxy(function(c,d){return a.inArray(c,this._states.tags[b.name])===d},this)))},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.pointer=function(a){var c={x:null,y:null};return a=a.originalEvent||a||b.event,a=a.touches&&a.touches.length?a.touches[0]:a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:a,a.pageX?(c.x=a.pageX,c.y=a.pageY):(c.x=a.clientX,c.y=a.clientY),c},e.prototype.isNumeric=function(a){return!isNaN(parseFloat(a))},e.prototype.difference=function(a,b){return{x:a.x-b.x,y:a.y-b.y}},a.fn.owlCarousel=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),f=d.data("owl.carousel");f||(f=new e(this,"object"==typeof b&&b),d.data("owl.carousel",f),a.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(b,c){f.register({type:e.Type.Event,name:c}),f.$element.on(c+".owl.carousel.core",a.proxy(function(a){a.namespace&&a.relatedTarget!==this&&(this.suppress([c]),f[c].apply(this,[].slice.call(arguments,1)),this.release([c]))},f))})),"string"==typeof b&&"_"!==b.charAt(0)&&f[b].apply(f,c)})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoRefresh:!0,autoRefreshInterval:500},e.prototype.watch=function(){this._interval||(this._visible=this._core.isVisible(),this._interval=b.setInterval(a.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},e.prototype.refresh=function(){this._core.isVisible()!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},e.prototype.destroy=function(){var a,c;b.clearInterval(this._interval);for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoRefresh=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel resized.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type)){var c=this._core.settings,e=c.center&&Math.ceil(c.items/2)||c.items,f=c.center&&-1*e||0,g=(b.property&&b.property.value!==d?b.property.value:this._core.current())+f,h=this._core.clones().length,i=a.proxy(function(a,b){this.load(b)},this);for(c.lazyLoadEager>0&&(e+=c.lazyLoadEager,c.loop&&(g-=c.lazyLoadEager,e++));f++<e;)this.load(h/2+this._core.relative(g)),h&&a.each(this._core.clones(this._core.relative(g)),i),g++}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={lazyLoad:!1,lazyLoadEager:0},e.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src")||f.attr("data-srcset");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):f.is("source")?f.one("load.owl.lazy",a.proxy(function(){this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("srcset",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":'url("'+g+'")',opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(c){this._core=c,this._previousHeight=null,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&"position"===a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._intervalId=null;var d=this;a(b).on("load",function(){d._core.settings.autoHeight&&d.update()}),a(b).resize(function(){d._core.settings.autoHeight&&(null!=d._intervalId&&clearTimeout(d._intervalId),d._intervalId=setTimeout(function(){d.update()},250))})};e.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},e.prototype.update=function(){var b=this._core._current,c=b+this._core.settings.items,d=this._core.settings.lazyLoad,e=this._core.$stage.children().toArray().slice(b,c),f=[],g=0;a.each(e,function(b,c){f.push(a(c).height())}),g=Math.max.apply(null,f),g<=1&&d&&this._previousHeight&&(g=this._previousHeight),this._previousHeight=g,this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass)},e.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.video&&this.isInFullScreen()&&a.preventDefault()},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .owl-video-frame").remove()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"===a.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};e.Defaults={video:!1,videoHeight:!1,videoWidth:!1},e.prototype.fetch=function(a,b){var c=function(){return a.attr("data-vimeo-id")?"vimeo":a.attr("data-vzaar-id")?"vzaar":"youtube"}(),d=a.attr("data-vimeo-id")||a.attr("data-youtube-id")||a.attr("data-vzaar-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else if(d[3].indexOf("vimeo")>-1)c="vimeo";else{if(!(d[3].indexOf("vzaar")>-1))throw new Error("Video URL not supported.");c="vzaar"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},e.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?"width:"+c.width+"px;height:"+c.height+"px;":"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(c){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?a("<div/>",{class:"owl-video-tn "+j,srcType:c}):a("<div/>",{class:"owl-video-tn",style:"opacity:1;background-image:url("+c+")"}),b.after(d),b.after(e)};if(b.wrap(a("<div/>",{class:"owl-video-wrapper",style:g})),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length)return l(h.attr(i)),h.remove(),!1;"youtube"===c.type?(f="//img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type?a.ajax({type:"GET",url:"//vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}):"vzaar"===c.type&&a.ajax({type:"GET",url:"//vzaar.com/api/videos/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a.framegrab_url,l(f)}})},e.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},e.prototype.play=function(b){var c,d=a(b.target),e=d.closest("."+this._core.settings.itemClass),f=this._videos[e.attr("data-video")],g=f.width||"100%",h=f.height||this._core.$stage.height();this._playing||(this._core.enter("playing"),this._core.trigger("play",null,"video"),e=this._core.items(this._core.relative(e.index())),this._core.reset(e.index()),c=a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'),c.attr("height",h),c.attr("width",g),"youtube"===f.type?c.attr("src","//www.youtube.com/embed/"+f.id+"?autoplay=1&rel=0&v="+f.id):"vimeo"===f.type?c.attr("src","//player.vimeo.com/video/"+f.id+"?autoplay=1"):"vzaar"===f.type&&c.attr("src","//view.vzaar.com/"+f.id+"/player?autoplay=true"),a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")),this._playing=e.addClass("owl-video-playing"))},e.prototype.isInFullScreen=function(){var b=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return b&&a(b).parent().hasClass("owl-video-frame")},e.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){a.namespace&&(this.swapping="translated"==a.type)},this),"translate.owl.carousel":a.proxy(function(a){a.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,
animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&a.support.animation&&a.support.transition){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.one(a.support.animation.end,c).css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g)),f&&e.one(a.support.animation.end,c).addClass("animated owl-animated-in").addClass(f))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._call=null,this._time=0,this._timeout=0,this._paused=!0,this._handlers={"changed.owl.carousel":a.proxy(function(a){a.namespace&&"settings"===a.property.name?this._core.settings.autoplay?this.play():this.stop():a.namespace&&"position"===a.property.name&&this._paused&&(this._time=0)},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":a.proxy(function(a,b,c){a.namespace&&this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(a){a.namespace&&this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this),"touchstart.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"touchend.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=a.extend({},e.Defaults,this._core.options)};e.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},e.prototype._next=function(d){this._call=b.setTimeout(a.proxy(this._next,this,d),this._timeout*(Math.round(this.read()/this._timeout)+1)-this.read()),this._core.is("interacting")||c.hidden||this._core.next(d||this._core.settings.autoplaySpeed)},e.prototype.read=function(){return(new Date).getTime()-this._time},e.prototype.play=function(c,d){var e;this._core.is("rotating")||this._core.enter("rotating"),c=c||this._core.settings.autoplayTimeout,e=Math.min(this._time%(this._timeout||c),c),this._paused?(this._time=this.read(),this._paused=!1):b.clearTimeout(this._call),this._time+=this.read()%c-e,this._timeout=c,this._call=b.setTimeout(a.proxy(this._next,this,d),c-e)},e.prototype.stop=function(){this._core.is("rotating")&&(this._time=0,this._paused=!0,b.clearTimeout(this._call),this._core.leave("rotating"))},e.prototype.pause=function(){this._core.is("rotating")&&!this._paused&&(this._time=this.read(),this._paused=!0,b.clearTimeout(this._call))},e.prototype.destroy=function(){var a,b;this.stop();for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(b){this._core=b,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){b.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,0,this._templates.pop())},this),"remove.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&this.draw()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers)};e.Defaults={nav:!1,navText:['<span aria-label="Previous">&#x2039;</span>','<span aria-label="Next">&#x203a;</span>'],navSpeed:!1,navElement:'button type="button" role="presentation"',navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},e.prototype.initialize=function(){var b,c=this._core.settings;this._controls.$relative=(c.navContainer?a(c.navContainer):a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=a("<"+c.navElement+">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click",a.proxy(function(a){this.prev(c.navSpeed)},this)),this._controls.$next=a("<"+c.navElement+">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click",a.proxy(function(a){this.next(c.navSpeed)},this)),c.dotsData||(this._templates=[a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),this._controls.$absolute=(c.dotsContainer?a(c.dotsContainer):a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","button",a.proxy(function(b){var d=a(b.target).parent().is(this._controls.$absolute)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(d,c.dotsSpeed)},this));for(b in this._overrides)this._core[b]=a.proxy(this[b],this)},e.prototype.destroy=function(){var a,b,c,d,e;e=this._core.settings;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)"$relative"===b&&e.navContainer?this._controls[b].html(""):this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},e.prototype.update=function(){var a,b,c,d=this._core.clones().length/2,e=d+this._core.items().length,f=this._core.maximum(!0),g=this._core.settings,h=g.center||g.autoWidth||g.dotsData?1:g.dotsEach||g.items;if("page"!==g.slideBy&&(g.slideBy=Math.min(g.slideBy,g.items)),g.dots||"page"==g.slideBy)for(this._pages=[],a=d,b=0,c=0;a<e;a++){if(b>=h||0===b){if(this._pages.push({start:Math.min(f,a-d),end:a-d+h-1}),Math.min(f,a-d)===f)break;b=0,++c}b+=this._core.mergers(this._core.relative(a))}},e.prototype.draw=function(){var b,c=this._core.settings,d=this._core.items().length<=c.items,e=this._core.relative(this._core.current()),f=c.loop||c.rewind;this._controls.$relative.toggleClass("disabled",!c.nav||d),c.nav&&(this._controls.$previous.toggleClass("disabled",!f&&e<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!f&&e>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!c.dots||d),c.dots&&(b=this._pages.length-this._controls.$absolute.children().length,c.dotsData&&0!==b?this._controls.$absolute.html(this._templates.join("")):b>0?this._controls.$absolute.append(new Array(b+1).join(this._templates[0])):b<0&&this._controls.$absolute.children().slice(b).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(a.inArray(this.current(),this._pages)).addClass("active"))},e.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotsData?1:c.dotsEach||c.items)}},e.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,a.proxy(function(a,c){return a.start<=b&&a.end>=b},this)).pop()},e.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},e.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},e.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},e.prototype.to=function(b,c,d){var e;!d&&this._pages.length?(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c)):a.proxy(this._overrides.to,this._core)(b,c)},a.fn.owlCarousel.Constructor.Plugins.Navigation=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(c){this._core=c,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(c){c.namespace&&"URLHash"===this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");if(!c)return;this._hashes[c]=b.content}},this),"changed.owl.carousel":a.proxy(function(c){if(c.namespace&&"position"===c.property.name){var d=this._core.items(this._core.relative(this._core.current())),e=a.map(this._hashes,function(a,b){return a===d?b:null}).join();if(!e||b.location.hash.slice(1)===e)return;b.location.hash=e}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(a){var c=b.location.hash.substring(1),e=this._core.$stage.children(),f=this._hashes[c]&&e.index(this._hashes[c]);f!==d&&f!==this._core.current()&&this._core.to(this._core.relative(f),!1,!0)},this))};e.Defaults={URLhashListener:!1},e.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){function e(b,c){var e=!1,f=b.charAt(0).toUpperCase()+b.slice(1);return a.each((b+" "+h.join(f+" ")+f).split(" "),function(a,b){if(g[b]!==d)return e=!c||b,!1}),e}function f(a){return e(a,!0)}var g=a("<support>").get(0).style,h="Webkit Moz O ms".split(" "),i={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},j={csstransforms:function(){return!!e("transform")},csstransforms3d:function(){return!!e("perspective")},csstransitions:function(){return!!e("transition")},cssanimations:function(){return!!e("animation")}};j.csstransitions()&&(a.support.transition=new String(f("transition")),a.support.transition.end=i.transition.end[a.support.transition]),j.cssanimations()&&(a.support.animation=new String(f("animation")),a.support.animation.end=i.animation.end[a.support.animation]),j.csstransforms()&&(a.support.transform=new String(f("transform")),a.support.transform3d=j.csstransforms3d())}(window.Zepto||window.jQuery,window,document);



function SmartMenu(seo = []) {

	// Broken images 
	$("img").each(function () {
		if ((typeof this.naturalWidth != "undefined" && this.naturalWidth == 0) || this.readyState == "uninitialized") {
			if (seo.brokenImages == null) {
				$(this).attr("src", "./app/images/mrvsmk2pl3l8fwocbfhy.gif");
			}else{
				$(this).attr("src", seo.brokenImages);
			}
		}
	});

//console clean
if(seo[ 'ConsoleClear' ] == true) {  console.clear(); }

    // Mobile handling 
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	
}

}





