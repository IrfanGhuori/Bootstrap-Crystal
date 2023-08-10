!(function (e, i) {
    "object" == typeof exports && "undefined" != typeof module
        ? i(exports, require("jquery"), require("popper.js"))
        : "function" == typeof define && define.amd
        ? define(["exports", "jquery", "popper.js"], i)
        : i(((e = e || self).bootstrap = {}), e.jQuery, e.Popper);
})(this, function (e, i, s) {
    "use strict";
    function n(e, i) {
        for (var s = 0; s < i.length; s++) {
            var n = i[s];
            (n.enumerable = n.enumerable || !1), (n.configurable = !0), "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
    }
    function o(e, i, s) {
        return i && n(e.prototype, i), s && n(e, s), e;
    }
    function r(e, i, s) {
        return i in e ? Object.defineProperty(e, i, { value: s, enumerable: !0, configurable: !0, writable: !0 }) : (e[i] = s), e;
    }
    function a(e, i) {
        var s = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            i &&
                (n = n.filter(function (i) {
                    return Object.getOwnPropertyDescriptor(e, i).enumerable;
                })),
                s.push.apply(s, n);
        }
        return s;
    }
    function l(e) {
        for (var i = 1; i < arguments.length; i++) {
            var s = null != arguments[i] ? arguments[i] : {};
            i % 2
                ? a(Object(s), !0).forEach(function (i) {
                      r(e, i, s[i]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(s))
                : a(Object(s)).forEach(function (i) {
                      Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(s, i));
                  });
        }
        return e;
    }
    (i = i && i.hasOwnProperty("default") ? i.default : i),
        (s = s && s.hasOwnProperty("default") ? s.default : s),
        i(window).on("load", function () {
            i(".loading").fadeOut("slow");
        });
    var h = "transitionend",
        c = {
            TRANSITION_END: "bsTransitionEnd",
            getUID: function (e) {
                do e += ~~(1e6 * Math.random());
                while (document.getElementById(e));
                return e;
            },
            getSelectorFromElement: function (e) {
                var i = e.getAttribute("data-target");
                if (!i || "#" === i) {
                    var s = e.getAttribute("href");
                    i = s && "#" !== s ? s.trim() : "";
                }
                try {
                    return document.querySelector(i) ? i : null;
                } catch (n) {
                    return null;
                }
            },
            getTransitionDurationFromElement: function (e) {
                if (!e) return 0;
                var s = i(e).css("transition-duration"),
                    n = i(e).css("transition-delay"),
                    o = parseFloat(s),
                    r = parseFloat(n);
                return o || r ? ((s = s.split(",")[0]), (n = n.split(",")[0]), 1e3 * (parseFloat(s) + parseFloat(n))) : 0;
            },
            reflow: function (e) {
                return e.offsetHeight;
            },
            triggerTransitionEnd: function (e) {
                i(e).trigger(h);
            },
            supportsTransitionEnd: function () {
                return Boolean(h);
            },
            isElement: function (e) {
                return (e[0] || e).nodeType;
            },
            typeCheckConfig: function (e, i, s) {
                for (var n in s)
                    if (Object.prototype.hasOwnProperty.call(s, n)) {
                        var o,
                            r = s[n],
                            a = i[n],
                            l =
                                a && c.isElement(a)
                                    ? "element"
                                    : ((o = a),
                                      {}.toString
                                          .call(o)
                                          .match(/\s([a-z]+)/i)[1]
                                          .toLowerCase());
                        if (!RegExp(r).test(l)) throw Error(e.toUpperCase() + ': Option "' + n + '" provided type "' + l + '" but expected type "' + r + '".');
                    }
            },
            findShadowRoot: function (e) {
                if (!document.documentElement.attachShadow) return null;
                if ("function" == typeof e.getRootNode) {
                    var i = e.getRootNode();
                    return i instanceof ShadowRoot ? i : null;
                }
                return e instanceof ShadowRoot ? e : e.parentNode ? c.findShadowRoot(e.parentNode) : null;
            },
            jQueryDetection: function () {
                if (void 0 === i) throw TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
                var e = i.fn.jquery.split(" ")[0].split(".");
                if ((e[0] < 2 && e[1] < 9) || (1 === e[0] && 9 === e[1] && e[2] < 1) || e[0] >= 4) throw Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0");
            },
        };
    c.jQueryDetection(),
        (i.fn.emulateTransitionEnd = function (e) {
            var s = this,
                n = !1;
            return (
                i(this).one(c.TRANSITION_END, function () {
                    n = !0;
                }),
                setTimeout(function () {
                    n || c.triggerTransitionEnd(s);
                }, e),
                this
            );
        }),
        (i.event.special[c.TRANSITION_END] = {
            bindType: h,
            delegateType: h,
            handle: function (e) {
                if (i(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
            },
        });
    var u = i.fn.alert,
        d = (function () {
            function e(e) {
                this._element = e;
            }
            var s = e.prototype;
            return (
                (s.close = function (e) {
                    var i = this._element;
                    e && (i = this._getRootElement(e)), this._triggerCloseEvent(i).isDefaultPrevented() || this._removeElement(i);
                }),
                (s.dispose = function () {
                    i.removeData(this._element, "bs.alert"), (this._element = null);
                }),
                (s._getRootElement = function (e) {
                    var s = c.getSelectorFromElement(e),
                        n = !1;
                    return s && (n = document.querySelector(s)), n || (n = i(e).closest(".alert")[0]), n;
                }),
                (s._triggerCloseEvent = function (e) {
                    var s = i.Event("close.bs.alert");
                    return i(e).trigger(s), s;
                }),
                (s._removeElement = function (e) {
                    var s = this;
                    if ((i(e).removeClass("show"), i(e).hasClass("fade"))) {
                        var n = c.getTransitionDurationFromElement(e);
                        i(e)
                            .one(c.TRANSITION_END, function (i) {
                                return s._destroyElement(e, i);
                            })
                            .emulateTransitionEnd(n);
                    } else this._destroyElement(e);
                }),
                (s._destroyElement = function (e) {
                    i(e).detach().trigger("closed.bs.alert").remove();
                }),
                (e._jQueryInterface = function (s) {
                    return this.each(function () {
                        var n = i(this),
                            o = n.data("bs.alert");
                        o || ((o = new e(this)), n.data("bs.alert", o)), "close" === s && o[s](this);
                    });
                }),
                (e._handleDismiss = function (e) {
                    return function (i) {
                        i && i.preventDefault(), e.close(this);
                    };
                }),
                o(e, null, [
                    {
                        key: "VERSION",
                        get: function () {
                            return "5.1";
                        },
                    },
                ]),
                e
            );
        })();
    i(document).on("click.bs.alert.data-api", '[data-dismiss="alert"]', d._handleDismiss(new d())),
        (i.fn.alert = d._jQueryInterface),
        (i.fn.alert.Constructor = d),
        (i.fn.alert.noConflict = function () {
            return (i.fn.alert = u), d._jQueryInterface;
        });
    var g = i.fn.button,
        p = "active",
        f = '[data-toggle^="button"]',
        m = 'input:not([type="hidden"])',
        v = ".btn",
        y = (function () {
            function e(e) {
                this._element = e;
            }
            var s = e.prototype;
            return (
                (s.toggle = function () {
                    var e = !0,
                        s = !0,
                        n = i(this._element).closest('[data-toggle="buttons"]')[0];
                    if (n) {
                        var o = this._element.querySelector(m);
                        if (o) {
                            if ("radio" === o.type) {
                                if (o.checked && this._element.classList.contains(p)) e = !1;
                                else {
                                    var r = n.querySelector(".active");
                                    r && i(r).removeClass(p);
                                }
                            } else "checkbox" === o.type ? "LABEL" === this._element.tagName && o.checked === this._element.classList.contains(p) && (e = !1) : (e = !1);
                            e && ((o.checked = !this._element.classList.contains(p)), i(o).trigger("change")), o.focus(), (s = !1);
                        }
                    }
                    this._element.hasAttribute("disabled") || this._element.classList.contains("disabled") || (s && this._element.setAttribute("aria-pressed", !this._element.classList.contains(p)), e && i(this._element).toggleClass(p));
                }),
                (s.dispose = function () {
                    i.removeData(this._element, "bs.button"), (this._element = null);
                }),
                (e._jQueryInterface = function (s) {
                    return this.each(function () {
                        var n = i(this).data("bs.button");
                        n || ((n = new e(this)), i(this).data("bs.button", n)), "toggle" === s && n[s]();
                    });
                }),
                o(e, null, [
                    {
                        key: "VERSION",
                        get: function () {
                            return "5.1";
                        },
                    },
                ]),
                e
            );
        })();
    i(document)
        .on("click.bs.button.data-api", f, function (e) {
            var s = e.target;
            if ((i(s).hasClass("btn") || (s = i(s).closest(v)[0]), !s || s.hasAttribute("disabled") || s.classList.contains("disabled"))) e.preventDefault();
            else {
                var n = s.querySelector(m);
                if (n && (n.hasAttribute("disabled") || n.classList.contains("disabled"))) return void e.preventDefault();
                y._jQueryInterface.call(i(s), "toggle");
            }
        })
        .on("focus.bs.button.data-api blur.bs.button.data-api", f, function (e) {
            var s = i(e.target).closest(v)[0];
            i(s).toggleClass("focus", /^focus(in)?$/.test(e.type));
        }),
        i(window).on("load.bs.button.data-api", function () {
            for (var e = [].slice.call(document.querySelectorAll('[data-toggle="buttons"] .btn')), i = 0, s = e.length; i < s; i++) {
                var n = e[i],
                    o = n.querySelector(m);
                o.checked || o.hasAttribute("checked") ? n.classList.add(p) : n.classList.remove(p);
            }
            for (var r = 0, a = (e = [].slice.call(document.querySelectorAll('[data-toggle="button"]'))).length; r < a; r++) {
                var l = e[r];
                "true" === l.getAttribute("aria-pressed") ? l.classList.add(p) : l.classList.remove(p);
            }
        }),
        (i.fn.button = y._jQueryInterface),
        (i.fn.button.Constructor = y),
        (i.fn.button.noConflict = function () {
            return (i.fn.button = g), y._jQueryInterface;
        });
    var b = "carousel",
        w = i.fn[b],
        C = { interval: 5e3, keyboard: !0, slide: !1, pause: "hover", wrap: !0, touch: !0 },
        E = { interval: "(number|boolean)", keyboard: "boolean", slide: "(boolean|string)", pause: "(string|boolean)", wrap: "boolean", touch: "boolean" },
        T = "next",
        x = "prev",
        S = "slid.bs.carousel",
        _ = "active",
        A = {
            ACTIVE: ".active",
            ACTIVE_ITEM: ".active.carousel-item",
            ITEM: ".carousel-item",
            ITEM_IMG: ".carousel-item img",
            NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
            INDICATORS: ".carousel-indicators",
            DATA_SLIDE: "[data-slide], [data-slide-to]",
            DATA_RIDE: '[data-ride="carousel"]',
        },
        D = { TOUCH: "touch", PEN: "pen" },
        k = (function () {
            function e(e, i) {
                (this._items = null),
                    (this._interval = null),
                    (this._activeElement = null),
                    (this._isPaused = !1),
                    (this._isSliding = !1),
                    (this.touchTimeout = null),
                    (this.touchStartX = 0),
                    (this.touchDeltaX = 0),
                    (this._config = this._getConfig(i)),
                    (this._element = e),
                    (this._indicatorsElement = this._element.querySelector(A.INDICATORS)),
                    (this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0),
                    (this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent)),
                    this._addEventListeners();
            }
            var s = e.prototype;
            return (
                (s.next = function () {
                    this._isSliding || this._slide(T);
                }),
                (s.nextWhenVisible = function () {
                    !document.hidden && i(this._element).is(":visible") && "hidden" !== i(this._element).css("visibility") && this.next();
                }),
                (s.prev = function () {
                    this._isSliding || this._slide(x);
                }),
                (s.pause = function (e) {
                    e || (this._isPaused = !0), this._element.querySelector(A.NEXT_PREV) && (c.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), (this._interval = null);
                }),
                (s.cycle = function (e) {
                    e || (this._isPaused = !1),
                        this._interval && (clearInterval(this._interval), (this._interval = null)),
                        this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval));
                }),
                (s.to = function (e) {
                    var s = this;
                    this._activeElement = this._element.querySelector(A.ACTIVE_ITEM);
                    var n = this._getItemIndex(this._activeElement);
                    if (!(e > this._items.length - 1 || e < 0)) {
                        if (this._isSliding)
                            i(this._element).one(S, function () {
                                return s.to(e);
                            });
                        else {
                            if (n === e) return this.pause(), void this.cycle();
                            this._slide(e > n ? T : x, this._items[e]);
                        }
                    }
                }),
                (s.dispose = function () {
                    i(this._element).off(".bs.carousel"),
                        i.removeData(this._element, "bs.carousel"),
                        (this._items = null),
                        (this._config = null),
                        (this._element = null),
                        (this._interval = null),
                        (this._isPaused = null),
                        (this._isSliding = null),
                        (this._activeElement = null),
                        (this._indicatorsElement = null);
                }),
                (s._getConfig = function (e) {
                    return (e = l({}, C, {}, e)), c.typeCheckConfig(b, e, E), e;
                }),
                (s._handleSwipe = function () {
                    var e = Math.abs(this.touchDeltaX);
                    if (!(e <= 40)) {
                        var i = e / this.touchDeltaX;
                        (this.touchDeltaX = 0), i > 0 && this.prev(), i < 0 && this.next();
                    }
                }),
                (s._addEventListeners = function () {
                    var e = this;
                    this._config.keyboard &&
                        i(this._element).on("keydown.bs.carousel", function (i) {
                            return e._keydown(i);
                        }),
                        "hover" === this._config.pause &&
                            i(this._element)
                                .on("mouseenter.bs.carousel", function (i) {
                                    return e.pause(i);
                                })
                                .on("mouseleave.bs.carousel", function (i) {
                                    return e.cycle(i);
                                }),
                        this._config.touch && this._addTouchEventListeners();
                }),
                (s._addTouchEventListeners = function () {
                    var e = this;
                    if (this._touchSupported) {
                        var s = function (i) {
                                e._pointerEvent && D[i.originalEvent.pointerType.toUpperCase()] ? (e.touchStartX = i.originalEvent.clientX) : e._pointerEvent || (e.touchStartX = i.originalEvent.touches[0].clientX);
                            },
                            n = function (i) {
                                e._pointerEvent && D[i.originalEvent.pointerType.toUpperCase()] && (e.touchDeltaX = i.originalEvent.clientX - e.touchStartX),
                                    e._handleSwipe(),
                                    "hover" === e._config.pause &&
                                        (e.pause(),
                                        e.touchTimeout && clearTimeout(e.touchTimeout),
                                        (e.touchTimeout = setTimeout(function (i) {
                                            return e.cycle(i);
                                        }, 500 + e._config.interval)));
                            };
                        i(this._element.querySelectorAll(A.ITEM_IMG)).on("dragstart.bs.carousel", function (e) {
                            return e.preventDefault();
                        }),
                            this._pointerEvent
                                ? (i(this._element).on("pointerdown.bs.carousel", function (e) {
                                      return s(e);
                                  }),
                                  i(this._element).on("pointerup.bs.carousel", function (e) {
                                      return n(e);
                                  }),
                                  this._element.classList.add("pointer-event"))
                                : (i(this._element).on("touchstart.bs.carousel", function (e) {
                                      return s(e);
                                  }),
                                  i(this._element).on("touchmove.bs.carousel", function (i) {
                                      var s;
                                      (s = i).originalEvent.touches && s.originalEvent.touches.length > 1 ? (e.touchDeltaX = 0) : (e.touchDeltaX = s.originalEvent.touches[0].clientX - e.touchStartX);
                                  }),
                                  i(this._element).on("touchend.bs.carousel", function (e) {
                                      return n(e);
                                  }));
                    }
                }),
                (s._keydown = function (e) {
                    if (!/input|textarea/i.test(e.target.tagName))
                        switch (e.which) {
                            case 37:
                                e.preventDefault(), this.prev();
                                break;
                            case 39:
                                e.preventDefault(), this.next();
                        }
                }),
                (s._getItemIndex = function (e) {
                    return (this._items = e && e.parentNode ? [].slice.call(e.parentNode.querySelectorAll(A.ITEM)) : []), this._items.indexOf(e);
                }),
                (s._getItemByDirection = function (e, i) {
                    var s = this._getItemIndex(i),
                        n = this._items.length - 1;
                    if (((e === x && 0 === s) || (e === T && s === n)) && !this._config.wrap) return i;
                    var o = (s + (e === x ? -1 : 1)) % this._items.length;
                    return -1 === o ? this._items[this._items.length - 1] : this._items[o];
                }),
                (s._triggerSlideEvent = function (e, s) {
                    var n = this._getItemIndex(e),
                        o = this._getItemIndex(this._element.querySelector(A.ACTIVE_ITEM)),
                        r = i.Event("slide.bs.carousel", { relatedTarget: e, direction: s, from: o, to: n });
                    return i(this._element).trigger(r), r;
                }),
                (s._setActiveIndicatorElement = function (e) {
                    if (this._indicatorsElement) {
                        i([].slice.call(this._indicatorsElement.querySelectorAll(A.ACTIVE))).removeClass(_);
                        var s = this._indicatorsElement.children[this._getItemIndex(e)];
                        s && i(s).addClass(_);
                    }
                }),
                (s._slide = function (e, s) {
                    var n,
                        o,
                        r,
                        a = this,
                        l = this._element.querySelector(A.ACTIVE_ITEM),
                        h = this._getItemIndex(l),
                        u = s || (l && this._getItemByDirection(e, l)),
                        d = this._getItemIndex(u),
                        g = Boolean(this._interval);
                    if ((e === T ? ((n = "carousel-item-left"), (o = "carousel-item-next"), (r = "left")) : ((n = "carousel-item-right"), (o = "carousel-item-prev"), (r = "right")), u && i(u).hasClass(_))) this._isSliding = !1;
                    else if (!this._triggerSlideEvent(u, r).isDefaultPrevented() && l && u) {
                        (this._isSliding = !0), g && this.pause(), this._setActiveIndicatorElement(u);
                        var p = i.Event(S, { relatedTarget: u, direction: r, from: h, to: d });
                        if (i(this._element).hasClass("slide")) {
                            i(u).addClass(o), c.reflow(u), i(l).addClass(n), i(u).addClass(n);
                            var f = parseInt(u.getAttribute("data-interval"), 10);
                            f ? ((this._config.defaultInterval = this._config.defaultInterval || this._config.interval), (this._config.interval = f)) : (this._config.interval = this._config.defaultInterval || this._config.interval);
                            var m = c.getTransitionDurationFromElement(l);
                            i(l)
                                .one(c.TRANSITION_END, function () {
                                    i(u)
                                        .removeClass(n + " " + o)
                                        .addClass(_),
                                        i(l).removeClass(_ + " " + o + " " + n),
                                        (a._isSliding = !1),
                                        setTimeout(function () {
                                            return i(a._element).trigger(p);
                                        }, 0);
                                })
                                .emulateTransitionEnd(m);
                        } else i(l).removeClass(_), i(u).addClass(_), (this._isSliding = !1), i(this._element).trigger(p);
                        g && this.cycle();
                    }
                }),
                (e._jQueryInterface = function (s) {
                    return this.each(function () {
                        var n = i(this).data("bs.carousel"),
                            o = l({}, C, {}, i(this).data());
                        "object" == typeof s && (o = l({}, o, {}, s));
                        var r = "string" == typeof s ? s : o.slide;
                        if ((n || ((n = new e(this, o)), i(this).data("bs.carousel", n)), "number" == typeof s)) n.to(s);
                        else if ("string" == typeof r) {
                            if (void 0 === n[r]) throw TypeError('No method named "' + r + '"');
                            n[r]();
                        } else o.interval && o.ride && (n.pause(), n.cycle());
                    });
                }),
                (e._dataApiClickHandler = function (s) {
                    var n = c.getSelectorFromElement(this);
                    if (n) {
                        var o = i(n)[0];
                        if (o && i(o).hasClass("carousel")) {
                            var r = l({}, i(o).data(), {}, i(this).data()),
                                a = this.getAttribute("data-slide-to");
                            a && (r.interval = !1), e._jQueryInterface.call(i(o), r), a && i(o).data("bs.carousel").to(a), s.preventDefault();
                        }
                    }
                }),
                o(e, null, [
                    {
                        key: "VERSION",
                        get: function () {
                            return "5.1";
                        },
                    },
                    {
                        key: "Default",
                        get: function () {
                            return C;
                        },
                    },
                ]),
                e
            );
        })();
    i(document).on("click.bs.carousel.data-api", A.DATA_SLIDE, k._dataApiClickHandler),
        i(window).on("load.bs.carousel.data-api", function () {
            for (var e = [].slice.call(document.querySelectorAll(A.DATA_RIDE)), s = 0, n = e.length; s < n; s++) {
                var o = i(e[s]);
                k._jQueryInterface.call(o, o.data());
            }
        }),
        (i.fn[b] = k._jQueryInterface),
        (i.fn[b].Constructor = k),
        (i.fn[b].noConflict = function () {
            return (i.fn[b] = w), k._jQueryInterface;
        });
    var I = "collapse",
        N = i.fn[I],
        O = { toggle: !0, parent: "" },
        P = { toggle: "boolean", parent: "(string|element)" },
        L = "show",
        z = "collapse",
        j = "collapsing",
        R = "collapsed",
        H = { ACTIVES: ".show, .collapsing", DATA_TOGGLE: '[data-toggle="collapse"]' },
        q = (function () {
            function e(e, i) {
                (this._isTransitioning = !1),
                    (this._element = e),
                    (this._config = this._getConfig(i)),
                    (this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]')));
                for (var s = [].slice.call(document.querySelectorAll(H.DATA_TOGGLE)), n = 0, o = s.length; n < o; n++) {
                    var r = s[n],
                        a = c.getSelectorFromElement(r),
                        l = [].slice.call(document.querySelectorAll(a)).filter(function (i) {
                            return i === e;
                        });
                    null !== a && l.length > 0 && ((this._selector = a), this._triggerArray.push(r));
                }
                (this._parent = this._config.parent ? this._getParent() : null), this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle();
            }
            var s = e.prototype;
            return (
                (s.toggle = function () {
                    i(this._element).hasClass(L) ? this.hide() : this.show();
                }),
                (s.show = function () {
                    var s,
                        n,
                        o = this;
                    if (
                        !(
                            this._isTransitioning ||
                            i(this._element).hasClass(L) ||
                            (this._parent &&
                                0 ===
                                    (s = [].slice.call(this._parent.querySelectorAll(H.ACTIVES)).filter(function (e) {
                                        return "string" == typeof o._config.parent ? e.getAttribute("data-parent") === o._config.parent : e.classList.contains(z);
                                    })).length &&
                                (s = null),
                            s && (n = i(s).not(this._selector).data("bs.collapse")) && n._isTransitioning)
                        )
                    ) {
                        var r = i.Event("show.bs.collapse");
                        if ((i(this._element).trigger(r), !r.isDefaultPrevented())) {
                            s && (e._jQueryInterface.call(i(s).not(this._selector), "hide"), n || i(s).data("bs.collapse", null));
                            var a = this._getDimension();
                            i(this._element).removeClass(z).addClass(j), (this._element.style[a] = 0), this._triggerArray.length && i(this._triggerArray).removeClass(R).attr("aria-expanded", !0), this.setTransitioning(!0);
                            var l = "scroll" + (a[0].toUpperCase() + a.slice(1)),
                                h = c.getTransitionDurationFromElement(this._element);
                            i(this._element)
                                .one(c.TRANSITION_END, function () {
                                    i(o._element).removeClass(j).addClass(z).addClass(L), (o._element.style[a] = ""), o.setTransitioning(!1), i(o._element).trigger("shown.bs.collapse");
                                })
                                .emulateTransitionEnd(h),
                                (this._element.style[a] = this._element[l] + "px");
                        }
                    }
                }),
                (s.hide = function () {
                    var e = this;
                    if (!this._isTransitioning && i(this._element).hasClass(L)) {
                        var s = i.Event("hide.bs.collapse");
                        if ((i(this._element).trigger(s), !s.isDefaultPrevented())) {
                            var n = this._getDimension();
                            (this._element.style[n] = this._element.getBoundingClientRect()[n] + "px"), c.reflow(this._element), i(this._element).addClass(j).removeClass(z).removeClass(L);
                            var o = this._triggerArray.length;
                            if (o > 0)
                                for (var r = 0; r < o; r++) {
                                    var a = this._triggerArray[r],
                                        l = c.getSelectorFromElement(a);
                                    null !== l && (i([].slice.call(document.querySelectorAll(l))).hasClass(L) || i(a).addClass(R).attr("aria-expanded", !1));
                                }
                            this.setTransitioning(!0), (this._element.style[n] = "");
                            var h = c.getTransitionDurationFromElement(this._element);
                            i(this._element)
                                .one(c.TRANSITION_END, function () {
                                    e.setTransitioning(!1), i(e._element).removeClass(j).addClass(z).trigger("hidden.bs.collapse");
                                })
                                .emulateTransitionEnd(h);
                        }
                    }
                }),
                (s.setTransitioning = function (e) {
                    this._isTransitioning = e;
                }),
                (s.dispose = function () {
                    i.removeData(this._element, "bs.collapse"), (this._config = null), (this._parent = null), (this._element = null), (this._triggerArray = null), (this._isTransitioning = null);
                }),
                (s._getConfig = function (e) {
                    return ((e = l({}, O, {}, e)).toggle = Boolean(e.toggle)), c.typeCheckConfig(I, e, P), e;
                }),
                (s._getDimension = function () {
                    return i(this._element).hasClass("width") ? "width" : "height";
                }),
                (s._getParent = function () {
                    var s,
                        n = this;
                    c.isElement(this._config.parent) ? ((s = this._config.parent), void 0 !== this._config.parent.jquery && (s = this._config.parent[0])) : (s = document.querySelector(this._config.parent));
                    var o = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                    return (
                        i([].slice.call(s.querySelectorAll(o))).each(function (i, s) {
                            n._addAriaAndCollapsedClass(e._getTargetFromElement(s), [s]);
                        }),
                        s
                    );
                }),
                (s._addAriaAndCollapsedClass = function (e, s) {
                    var n = i(e).hasClass(L);
                    s.length && i(s).toggleClass(R, !n).attr("aria-expanded", n);
                }),
                (e._getTargetFromElement = function (e) {
                    var i = c.getSelectorFromElement(e);
                    return i ? document.querySelector(i) : null;
                }),
                (e._jQueryInterface = function (s) {
                    return this.each(function () {
                        var n = i(this),
                            o = n.data("bs.collapse"),
                            r = l({}, O, {}, n.data(), {}, "object" == typeof s && s ? s : {});
                        if ((!o && r.toggle && /show|hide/.test(s) && (r.toggle = !1), o || ((o = new e(this, r)), n.data("bs.collapse", o)), "string" == typeof s)) {
                            if (void 0 === o[s]) throw TypeError('No method named "' + s + '"');
                            o[s]();
                        }
                    });
                }),
                o(e, null, [
                    {
                        key: "VERSION",
                        get: function () {
                            return "5.1";
                        },
                    },
                    {
                        key: "Default",
                        get: function () {
                            return O;
                        },
                    },
                ]),
                e
            );
        })();
    i(document).on("click.bs.collapse.data-api", H.DATA_TOGGLE, function (e) {
        "A" === e.currentTarget.tagName && e.preventDefault();
        var s = i(this),
            n = c.getSelectorFromElement(this);
        i([].slice.call(document.querySelectorAll(n))).each(function () {
            var e = i(this),
                n = e.data("bs.collapse") ? "toggle" : s.data();
            q._jQueryInterface.call(e, n);
        });
    }),
        (i.fn[I] = q._jQueryInterface),
        (i.fn[I].Constructor = q),
        (i.fn[I].noConflict = function () {
            return (i.fn[I] = N), q._jQueryInterface;
        });
    var M = "dropdown",
        F = i.fn[M],
        W = RegExp("38|40|27"),
        B = "hide.bs.dropdown",
        Q = "hidden.bs.dropdown",
        V = "click.bs.dropdown.data-api",
        U = "keydown.bs.dropdown.data-api",
        G = "disabled",
        X = "show",
        K = "dropdown-menu-right",
        Y = '[data-toggle="dropdown"]',
        Z = ".dropdown-menu",
        J = { offset: 0, flip: !0, boundary: "scrollParent", reference: "toggle", display: "dynamic", popperConfig: null },
        tt = { offset: "(number|string|function)", flip: "boolean", boundary: "(string|element)", reference: "(string|element)", display: "string", popperConfig: "(null|object)" },
        te = (function () {
            function e(e, i) {
                (this._element = e), (this._popper = null), (this._config = this._getConfig(i)), (this._menu = this._getMenuElement()), (this._inNavbar = this._detectNavbar()), this._addEventListeners();
            }
            var n = e.prototype;
            return (
                (n.toggle = function () {
                    if (!this._element.disabled && !i(this._element).hasClass(G)) {
                        var s = i(this._menu).hasClass(X);
                        e._clearMenus(), s || this.show(!0);
                    }
                }),
                (n.show = function (n) {
                    if ((void 0 === n && (n = !1), !(this._element.disabled || i(this._element).hasClass(G) || i(this._menu).hasClass(X)))) {
                        var o = { relatedTarget: this._element },
                            r = i.Event("show.bs.dropdown", o),
                            a = e._getParentFromElement(this._element);
                        if ((i(a).trigger(r), !r.isDefaultPrevented())) {
                            if (!this._inNavbar && n) {
                                if (void 0 === s) throw TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                                var l = this._element;
                                "parent" === this._config.reference ? (l = a) : c.isElement(this._config.reference) && ((l = this._config.reference), void 0 !== this._config.reference.jquery && (l = this._config.reference[0])),
                                    "scrollParent" !== this._config.boundary && i(a).addClass("position-static"),
                                    (this._popper = new s(l, this._menu, this._getPopperConfig()));
                            }
                            "ontouchstart" in document.documentElement && 0 === i(a).closest(".navbar-nav").length && i(document.body).children().on("mouseover", null, i.noop),
                                this._element.focus(),
                                this._element.setAttribute("aria-expanded", !0),
                                i(this._menu).toggleClass(X),
                                i(a).toggleClass(X).trigger(i.Event("shown.bs.dropdown", o));
                        }
                    }
                }),
                (n.hide = function () {
                    if (!this._element.disabled && !i(this._element).hasClass(G) && i(this._menu).hasClass(X)) {
                        var s = { relatedTarget: this._element },
                            n = i.Event(B, s),
                            o = e._getParentFromElement(this._element);
                        i(o).trigger(n), n.isDefaultPrevented() || (this._popper && this._popper.destroy(), i(this._menu).toggleClass(X), i(o).toggleClass(X).trigger(i.Event(Q, s)));
                    }
                }),
                (n.dispose = function () {
                    i.removeData(this._element, "bs.dropdown"), i(this._element).off(".bs.dropdown"), (this._element = null), (this._menu = null), null !== this._popper && (this._popper.destroy(), (this._popper = null));
                }),
                (n.update = function () {
                    (this._inNavbar = this._detectNavbar()), null !== this._popper && this._popper.scheduleUpdate();
                }),
                (n._addEventListeners = function () {
                    var e = this;
                    i(this._element).on("click.bs.dropdown", function (i) {
                        i.preventDefault(), i.stopPropagation(), e.toggle();
                    });
                }),
                (n._getConfig = function (e) {
                    return (e = l({}, this.constructor.Default, {}, i(this._element).data(), {}, e)), c.typeCheckConfig(M, e, this.constructor.DefaultType), e;
                }),
                (n._getMenuElement = function () {
                    if (!this._menu) {
                        var i = e._getParentFromElement(this._element);
                        i && (this._menu = i.querySelector(Z));
                    }
                    return this._menu;
                }),
                (n._getPlacement = function () {
                    var e = i(this._element.parentNode),
                        s = "bottom-start";
                    return (
                        e.hasClass("dropup")
                            ? ((s = "top-start"), i(this._menu).hasClass(K) && (s = "top-end"))
                            : e.hasClass("dropright")
                            ? (s = "right-start")
                            : e.hasClass("dropleft")
                            ? (s = "left-start")
                            : i(this._menu).hasClass(K) && (s = "bottom-end"),
                        s
                    );
                }),
                (n._detectNavbar = function () {
                    return i(this._element).closest(".navbar").length > 0;
                }),
                (n._getOffset = function () {
                    var e = this,
                        i = {};
                    return (
                        "function" == typeof this._config.offset
                            ? (i.fn = function (i) {
                                  return (i.offsets = l({}, i.offsets, {}, e._config.offset(i.offsets, e._element) || {})), i;
                              })
                            : (i.offset = this._config.offset),
                        i
                    );
                }),
                (n._getPopperConfig = function () {
                    var e = { placement: this._getPlacement(), modifiers: { offset: this._getOffset(), flip: { enabled: this._config.flip }, preventOverflow: { boundariesElement: this._config.boundary } } };
                    return "static" === this._config.display && (e.modifiers.applyStyle = { enabled: !1 }), l({}, e, {}, this._config.popperConfig);
                }),
                (e._jQueryInterface = function (s) {
                    return this.each(function () {
                        var n = i(this).data("bs.dropdown");
                        if ((n || ((n = new e(this, "object" == typeof s ? s : null)), i(this).data("bs.dropdown", n)), "string" == typeof s)) {
                            if (void 0 === n[s]) throw TypeError('No method named "' + s + '"');
                            n[s]();
                        }
                    });
                }),
                (e._clearMenus = function (s) {
                    if (!s || (3 !== s.which && ("keyup" !== s.type || 9 === s.which)))
                        for (var n = [].slice.call(document.querySelectorAll(Y)), o = 0, r = n.length; o < r; o++) {
                            var a = e._getParentFromElement(n[o]),
                                l = i(n[o]).data("bs.dropdown"),
                                h = { relatedTarget: n[o] };
                            if ((s && "click" === s.type && (h.clickEvent = s), l)) {
                                var c = l._menu;
                                if (i(a).hasClass(X) && !(s && (("click" === s.type && /input|textarea/i.test(s.target.tagName)) || ("keyup" === s.type && 9 === s.which)) && i.contains(a, s.target))) {
                                    var u = i.Event(B, h);
                                    i(a).trigger(u),
                                        u.isDefaultPrevented() ||
                                            ("ontouchstart" in document.documentElement && i(document.body).children().off("mouseover", null, i.noop),
                                            n[o].setAttribute("aria-expanded", "false"),
                                            l._popper && l._popper.destroy(),
                                            i(c).removeClass(X),
                                            i(a).removeClass(X).trigger(i.Event(Q, h)));
                                }
                            }
                        }
                }),
                (e._getParentFromElement = function (e) {
                    var i,
                        s = c.getSelectorFromElement(e);
                    return s && (i = document.querySelector(s)), i || e.parentNode;
                }),
                (e._dataApiKeydownHandler = function (s) {
                    if (
                        (/input|textarea/i.test(s.target.tagName) ? !(32 === s.which || (27 !== s.which && ((40 !== s.which && 38 !== s.which) || i(s.target).closest(Z).length))) : W.test(s.which)) &&
                        (s.preventDefault(), s.stopPropagation(), !this.disabled && !i(this).hasClass(G))
                    ) {
                        var n = e._getParentFromElement(this),
                            o = i(n).hasClass(X);
                        if (o || 27 !== s.which) {
                            if (o && (!o || (27 !== s.which && 32 !== s.which))) {
                                var r = [].slice.call(n.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)")).filter(function (e) {
                                    return i(e).is(":visible");
                                });
                                if (0 !== r.length) {
                                    var a = r.indexOf(s.target);
                                    38 === s.which && a > 0 && a--, 40 === s.which && a < r.length - 1 && a++, a < 0 && (a = 0), r[a].focus();
                                }
                            } else {
                                if (27 === s.which) {
                                    var l = n.querySelector(Y);
                                    i(l).trigger("focus");
                                }
                                i(this).trigger("click");
                            }
                        }
                    }
                }),
                o(e, null, [
                    {
                        key: "VERSION",
                        get: function () {
                            return "5.1";
                        },
                    },
                    {
                        key: "Default",
                        get: function () {
                            return J;
                        },
                    },
                    {
                        key: "DefaultType",
                        get: function () {
                            return tt;
                        },
                    },
                ]),
                e
            );
        })();
    i(document)
        .on(U, Y, te._dataApiKeydownHandler)
        .on(U, Z, te._dataApiKeydownHandler)
        .on(V + " keyup.bs.dropdown.data-api", te._clearMenus)
        .on(V, Y, function (e) {
            e.preventDefault(), e.stopPropagation(), te._jQueryInterface.call(i(this), "toggle");
        })
        .on(V, ".dropdown form", function (e) {
            e.stopPropagation();
        }),
        (i.fn[M] = te._jQueryInterface),
        (i.fn[M].Constructor = te),
        (i.fn[M].noConflict = function () {
            return (i.fn[M] = F), te._jQueryInterface;
        });
    var ti = i.fn.modal,
        ts = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
        tn = { backdrop: "(boolean|string)", keyboard: "boolean", focus: "boolean", show: "boolean" },
        to = "hidden.bs.modal",
        tr = "show.bs.modal",
        ta = "focusin.bs.modal",
        tl = "resize.bs.modal",
        th = "click.dismiss.bs.modal",
        tc = "keydown.dismiss.bs.modal",
        tu = "mousedown.dismiss.bs.modal",
        td = "modal-open",
        tg = "fade",
        tp = "show",
        tf = "modal-static",
        tm = {
            DIALOG: ".modal-dialog",
            MODAL_BODY: ".modal-body",
            DATA_TOGGLE: '[data-toggle="modal"]',
            DATA_DISMISS: '[data-dismiss="modal"]',
            FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
            STICKY_CONTENT: ".sticky-top",
        },
        t8 = (function () {
            function e(e, i) {
                (this._config = this._getConfig(i)),
                    (this._element = e),
                    (this._dialog = e.querySelector(tm.DIALOG)),
                    (this._backdrop = null),
                    (this._isShown = !1),
                    (this._isBodyOverflowing = !1),
                    (this._ignoreBackdropClick = !1),
                    (this._isTransitioning = !1),
                    (this._scrollbarWidth = 0);
            }
            var s = e.prototype;
            return (
                (s.toggle = function (e) {
                    return this._isShown ? this.hide() : this.show(e);
                }),
                (s.show = function (e) {
                    var s = this;
                    if (!this._isShown && !this._isTransitioning) {
                        i(this._element).hasClass(tg) && (this._isTransitioning = !0);
                        var n = i.Event(tr, { relatedTarget: e });
                        i(this._element).trigger(n),
                            this._isShown ||
                                n.isDefaultPrevented() ||
                                ((this._isShown = !0),
                                this._checkScrollbar(),
                                this._setScrollbar(),
                                this._adjustDialog(),
                                this._setEscapeEvent(),
                                this._setResizeEvent(),
                                i(this._element).on(th, tm.DATA_DISMISS, function (e) {
                                    return s.hide(e);
                                }),
                                i(this._dialog).on(tu, function () {
                                    i(s._element).one("mouseup.dismiss.bs.modal", function (e) {
                                        i(e.target).is(s._element) && (s._ignoreBackdropClick = !0);
                                    });
                                }),
                                this._showBackdrop(function () {
                                    return s._showElement(e);
                                }));
                    }
                }),
                (s.hide = function (e) {
                    var s = this;
                    if ((e && e.preventDefault(), this._isShown && !this._isTransitioning)) {
                        var n = i.Event("hide.bs.modal");
                        if ((i(this._element).trigger(n), this._isShown && !n.isDefaultPrevented())) {
                            this._isShown = !1;
                            var o = i(this._element).hasClass(tg);
                            if ((o && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), i(document).off(ta), i(this._element).removeClass(tp), i(this._element).off(th), i(this._dialog).off(tu), o)) {
                                var r = c.getTransitionDurationFromElement(this._element);
                                i(this._element)
                                    .one(c.TRANSITION_END, function (e) {
                                        return s._hideModal(e);
                                    })
                                    .emulateTransitionEnd(r);
                            } else this._hideModal();
                        }
                    }
                }),
                (s.dispose = function () {
                    [window, this._element, this._dialog].forEach(function (e) {
                        return i(e).off(".bs.modal");
                    }),
                        i(document).off(ta),
                        i.removeData(this._element, "bs.modal"),
                        (this._config = null),
                        (this._element = null),
                        (this._dialog = null),
                        (this._backdrop = null),
                        (this._isShown = null),
                        (this._isBodyOverflowing = null),
                        (this._ignoreBackdropClick = null),
                        (this._isTransitioning = null),
                        (this._scrollbarWidth = null);
                }),
                (s.handleUpdate = function () {
                    this._adjustDialog();
                }),
                (s._getConfig = function (e) {
                    return (e = l({}, ts, {}, e)), c.typeCheckConfig("modal", e, tn), e;
                }),
                (s._triggerBackdropTransition = function () {
                    var e = this;
                    if ("static" === this._config.backdrop) {
                        var s = i.Event("hidePrevented.bs.modal");
                        if ((i(this._element).trigger(s), s.defaultPrevented)) return;
                        this._element.classList.add(tf);
                        var n = c.getTransitionDurationFromElement(this._element);
                        i(this._element)
                            .one(c.TRANSITION_END, function () {
                                e._element.classList.remove(tf);
                            })
                            .emulateTransitionEnd(n),
                            this._element.focus();
                    } else this.hide();
                }),
                (s._showElement = function (e) {
                    var s = this,
                        n = i(this._element).hasClass(tg),
                        o = this._dialog ? this._dialog.querySelector(tm.MODAL_BODY) : null;
                    (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE) || document.body.appendChild(this._element),
                        (this._element.style.display = "block"),
                        this._element.removeAttribute("aria-hidden"),
                        this._element.setAttribute("aria-modal", !0),
                        i(this._dialog).hasClass("modal-dialog-scrollable") && o ? (o.scrollTop = 0) : (this._element.scrollTop = 0),
                        n && c.reflow(this._element),
                        i(this._element).addClass(tp),
                        this._config.focus && this._enforceFocus();
                    var r = i.Event("shown.bs.modal", { relatedTarget: e }),
                        a = function () {
                            s._config.focus && s._element.focus(), (s._isTransitioning = !1), i(s._element).trigger(r);
                        };
                    if (n) {
                        var l = c.getTransitionDurationFromElement(this._dialog);
                        i(this._dialog).one(c.TRANSITION_END, a).emulateTransitionEnd(l);
                    } else a();
                }),
                (s._enforceFocus = function () {
                    var e = this;
                    i(document)
                        .off(ta)
                        .on(ta, function (s) {
                            document !== s.target && e._element !== s.target && 0 === i(e._element).has(s.target).length && e._element.focus();
                        });
                }),
                (s._setEscapeEvent = function () {
                    var e = this;
                    this._isShown && this._config.keyboard
                        ? i(this._element).on(tc, function (i) {
                              27 === i.which && e._triggerBackdropTransition();
                          })
                        : this._isShown || i(this._element).off(tc);
                }),
                (s._setResizeEvent = function () {
                    var e = this;
                    this._isShown
                        ? i(window).on(tl, function (i) {
                              return e.handleUpdate(i);
                          })
                        : i(window).off(tl);
                }),
                (s._hideModal = function () {
                    var e = this;
                    (this._element.style.display = "none"),
                        this._element.setAttribute("aria-hidden", !0),
                        this._element.removeAttribute("aria-modal"),
                        (this._isTransitioning = !1),
                        this._showBackdrop(function () {
                            i(document.body).removeClass(td), e._resetAdjustments(), e._resetScrollbar(), i(e._element).trigger(to);
                        });
                }),
                (s._removeBackdrop = function () {
                    this._backdrop && (i(this._backdrop).remove(), (this._backdrop = null));
                }),
                (s._showBackdrop = function (e) {
                    var s = this,
                        n = i(this._element).hasClass(tg) ? tg : "";
                    if (this._isShown && this._config.backdrop) {
                        if (
                            ((this._backdrop = document.createElement("div")),
                            (this._backdrop.className = "modal-backdrop"),
                            n && this._backdrop.classList.add(n),
                            i(this._backdrop).appendTo(document.body),
                            i(this._element).on(th, function (e) {
                                s._ignoreBackdropClick ? (s._ignoreBackdropClick = !1) : e.target === e.currentTarget && s._triggerBackdropTransition();
                            }),
                            n && c.reflow(this._backdrop),
                            i(this._backdrop).addClass(tp),
                            !e)
                        )
                            return;
                        if (!n) return void e();
                        var o = c.getTransitionDurationFromElement(this._backdrop);
                        i(this._backdrop).one(c.TRANSITION_END, e).emulateTransitionEnd(o);
                    } else if (!this._isShown && this._backdrop) {
                        i(this._backdrop).removeClass(tp);
                        var r = function () {
                            s._removeBackdrop(), e && e();
                        };
                        if (i(this._element).hasClass(tg)) {
                            var a = c.getTransitionDurationFromElement(this._backdrop);
                            i(this._backdrop).one(c.TRANSITION_END, r).emulateTransitionEnd(a);
                        } else r();
                    } else e && e();
                }),
                (s._adjustDialog = function () {
                    var e = this._element.scrollHeight > document.documentElement.clientHeight;
                    !this._isBodyOverflowing && e && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !e && (this._element.style.paddingRight = this._scrollbarWidth + "px");
                }),
                (s._resetAdjustments = function () {
                    (this._element.style.paddingLeft = ""), (this._element.style.paddingRight = "");
                }),
                (s._checkScrollbar = function () {
                    var e = document.body.getBoundingClientRect();
                    (this._isBodyOverflowing = e.left + e.right < window.innerWidth), (this._scrollbarWidth = this._getScrollbarWidth());
                }),
                (s._setScrollbar = function () {
                    var e = this;
                    if (this._isBodyOverflowing) {
                        var s = [].slice.call(document.querySelectorAll(tm.FIXED_CONTENT)),
                            n = [].slice.call(document.querySelectorAll(tm.STICKY_CONTENT));
                        i(s).each(function (s, n) {
                            var o = n.style.paddingRight,
                                r = i(n).css("padding-right");
                            i(n)
                                .data("padding-right", o)
                                .css("padding-right", parseFloat(r) + e._scrollbarWidth + "px");
                        }),
                            i(n).each(function (s, n) {
                                var o = n.style.marginRight,
                                    r = i(n).css("margin-right");
                                i(n)
                                    .data("margin-right", o)
                                    .css("margin-right", parseFloat(r) - e._scrollbarWidth + "px");
                            });
                        var o = document.body.style.paddingRight,
                            r = i(document.body).css("padding-right");
                        i(document.body)
                            .data("padding-right", o)
                            .css("padding-right", parseFloat(r) + this._scrollbarWidth + "px");
                    }
                    i(document.body).addClass(td);
                }),
                (s._resetScrollbar = function () {
                    i([].slice.call(document.querySelectorAll(tm.FIXED_CONTENT))).each(function (e, s) {
                        var n = i(s).data("padding-right");
                        i(s).removeData("padding-right"), (s.style.paddingRight = n || "");
                    }),
                        i([].slice.call(document.querySelectorAll("" + tm.STICKY_CONTENT))).each(function (e, s) {
                            var n = i(s).data("margin-right");
                            void 0 !== n && i(s).css("margin-right", n).removeData("margin-right");
                        });
                    var e = i(document.body).data("padding-right");
                    i(document.body).removeData("padding-right"), (document.body.style.paddingRight = e || "");
                }),
                (s._getScrollbarWidth = function () {
                    var e = document.createElement("div");
                    (e.className = "modal-scrollbar-measure"), document.body.appendChild(e);
                    var i = e.getBoundingClientRect().width - e.clientWidth;
                    return document.body.removeChild(e), i;
                }),
                (e._jQueryInterface = function (s, n) {
                    return this.each(function () {
                        var o = i(this).data("bs.modal"),
                            r = l({}, ts, {}, i(this).data(), {}, "object" == typeof s && s ? s : {});
                        if ((o || ((o = new e(this, r)), i(this).data("bs.modal", o)), "string" == typeof s)) {
                            if (void 0 === o[s]) throw TypeError('No method named "' + s + '"');
                            o[s](n);
                        } else r.show && o.show(n);
                    });
                }),
                o(e, null, [
                    {
                        key: "VERSION",
                        get: function () {
                            return "5.1";
                        },
                    },
                    {
                        key: "Default",
                        get: function () {
                            return ts;
                        },
                    },
                ]),
                e
            );
        })();
    i(document).on("click.bs.modal.data-api", tm.DATA_TOGGLE, function (e) {
        var s,
            n = this,
            o = c.getSelectorFromElement(this);
        o && (s = document.querySelector(o));
        var r = i(s).data("bs.modal") ? "toggle" : l({}, i(s).data(), {}, i(this).data());
        ("A" !== this.tagName && "AREA" !== this.tagName) || e.preventDefault();
        var a = i(s).one(tr, function (e) {
            e.isDefaultPrevented() ||
                a.one(to, function () {
                    i(n).is(":visible") && n.focus();
                });
        });
        t8._jQueryInterface.call(i(s), r, this);
    }),
        (i.fn.modal = t8._jQueryInterface),
        (i.fn.modal.Constructor = t8),
        (i.fn.modal.noConflict = function () {
            return (i.fn.modal = ti), t8._jQueryInterface;
        });
    var tv = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
        ty = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:\/?#]*(?:[\/?#]|$))/gi,
        tb = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
    function tw(e, i, s) {
        if (0 === e.length) return e;
        if (s && "function" == typeof s) return s(e);
        for (var n = new window.DOMParser().parseFromString(e, "text/html"), o = Object.keys(i), r = [].slice.call(n.body.querySelectorAll("*")), a = 0, l = r.length; a < l; a++)
            (function (e, s) {
                var n = r[e],
                    a = n.nodeName.toLowerCase();
                if (-1 === o.indexOf(n.nodeName.toLowerCase())) return n.parentNode.removeChild(n), "continue";
                var l = [].slice.call(n.attributes),
                    h = [].concat(i["*"] || [], i[a] || []);
                l.forEach(function (e) {
                    (function (e, i) {
                        var s = e.nodeName.toLowerCase();
                        if (-1 !== i.indexOf(s)) return -1 === tv.indexOf(s) || Boolean(e.nodeValue.match(ty) || e.nodeValue.match(tb));
                        for (
                            var n = i.filter(function (e) {
                                    return e instanceof RegExp;
                                }),
                                o = 0,
                                r = n.length;
                            o < r;
                            o++
                        )
                            if (s.match(n[o])) return !0;
                        return !1;
                    })(e, h) || n.removeAttribute(e.nodeName);
                });
            })(a);
        return n.body.innerHTML;
    }
    var tC = "tooltip",
        t$ = i.fn.tooltip,
        tE = RegExp("(^|\\s)bs-tooltip\\S+", "g"),
        tT = ["sanitize", "whiteList", "sanitizeFn"],
        tx = {
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
            popperConfig: "(null|object)",
        },
        tS = { AUTO: "auto", TOP: "top", RIGHT: "right", BOTTOM: "bottom", LEFT: "left" },
        t_ = {
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
                ul: [],
            },
            popperConfig: null,
        },
        tA = "show",
        tD = {
            HIDE: "hide.bs.tooltip",
            HIDDEN: "hidden.bs.tooltip",
            SHOW: "show.bs.tooltip",
            SHOWN: "shown.bs.tooltip",
            INSERTED: "inserted.bs.tooltip",
            CLICK: "click.bs.tooltip",
            FOCUSIN: "focusin.bs.tooltip",
            FOCUSOUT: "focusout.bs.tooltip",
            MOUSEENTER: "mouseenter.bs.tooltip",
            MOUSELEAVE: "mouseleave.bs.tooltip",
        },
        tk = "fade",
        tI = "show",
        tN = "hover",
        t9 = "focus",
        tO = (function () {
            function e(e, i) {
                if (void 0 === s) throw TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
                (this._isEnabled = !0), (this._timeout = 0), (this._hoverState = ""), (this._activeTrigger = {}), (this._popper = null), (this.element = e), (this.config = this._getConfig(i)), (this.tip = null), this._setListeners();
            }
            var n = e.prototype;
            return (
                (n.enable = function () {
                    this._isEnabled = !0;
                }),
                (n.disable = function () {
                    this._isEnabled = !1;
                }),
                (n.toggleEnabled = function () {
                    this._isEnabled = !this._isEnabled;
                }),
                (n.toggle = function (e) {
                    if (this._isEnabled) {
                        if (e) {
                            var s = this.constructor.DATA_KEY,
                                n = i(e.currentTarget).data(s);
                            n || ((n = new this.constructor(e.currentTarget, this._getDelegateConfig())), i(e.currentTarget).data(s, n)),
                                (n._activeTrigger.click = !n._activeTrigger.click),
                                n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n);
                        } else {
                            if (i(this.getTipElement()).hasClass(tI)) return void this._leave(null, this);
                            this._enter(null, this);
                        }
                    }
                }),
                (n.dispose = function () {
                    clearTimeout(this._timeout),
                        i.removeData(this.element, this.constructor.DATA_KEY),
                        i(this.element).off(this.constructor.EVENT_KEY),
                        i(this.element).closest(".modal").off("hide.bs.modal", this._hideModalHandler),
                        this.tip && i(this.tip).remove(),
                        (this._isEnabled = null),
                        (this._timeout = null),
                        (this._hoverState = null),
                        (this._activeTrigger = null),
                        this._popper && this._popper.destroy(),
                        (this._popper = null),
                        (this.element = null),
                        (this.config = null),
                        (this.tip = null);
                }),
                (n.show = function () {
                    var e = this;
                    if ("none" === i(this.element).css("display")) throw Error("Please use show on visible elements");
                    var n = i.Event(this.constructor.Event.SHOW);
                    if (this.isWithContent() && this._isEnabled) {
                        i(this.element).trigger(n);
                        var o = c.findShadowRoot(this.element),
                            r = i.contains(null !== o ? o : this.element.ownerDocument.documentElement, this.element);
                        if (n.isDefaultPrevented() || !r) return;
                        var a = this.getTipElement(),
                            l = c.getUID(this.constructor.NAME);
                        a.setAttribute("id", l), this.element.setAttribute("aria-describedby", l), this.setContent(), this.config.animation && i(a).addClass(tk);
                        var h = "function" == typeof this.config.placement ? this.config.placement.call(this, a, this.element) : this.config.placement,
                            u = this._getAttachment(h);
                        this.addAttachmentClass(u);
                        var d = this._getContainer();
                        i(a).data(this.constructor.DATA_KEY, this),
                            i.contains(this.element.ownerDocument.documentElement, this.tip) || i(a).appendTo(d),
                            i(this.element).trigger(this.constructor.Event.INSERTED),
                            (this._popper = new s(this.element, a, this._getPopperConfig(u))),
                            i(a).addClass(tI),
                            "ontouchstart" in document.documentElement && i(document.body).children().on("mouseover", null, i.noop);
                        var g = function () {
                            e.config.animation && e._fixTransition();
                            var s = e._hoverState;
                            (e._hoverState = null), i(e.element).trigger(e.constructor.Event.SHOWN), "out" === s && e._leave(null, e);
                        };
                        if (i(this.tip).hasClass(tk)) {
                            var p = c.getTransitionDurationFromElement(this.tip);
                            i(this.tip).one(c.TRANSITION_END, g).emulateTransitionEnd(p);
                        } else g();
                    }
                }),
                (n.hide = function (e) {
                    var s = this,
                        n = this.getTipElement(),
                        o = i.Event(this.constructor.Event.HIDE),
                        r = function () {
                            s._hoverState !== tA && n.parentNode && n.parentNode.removeChild(n),
                                s._cleanTipClass(),
                                s.element.removeAttribute("aria-describedby"),
                                i(s.element).trigger(s.constructor.Event.HIDDEN),
                                null !== s._popper && s._popper.destroy(),
                                e && e();
                        };
                    if ((i(this.element).trigger(o), !o.isDefaultPrevented())) {
                        if (
                            (i(n).removeClass(tI),
                            "ontouchstart" in document.documentElement && i(document.body).children().off("mouseover", null, i.noop),
                            (this._activeTrigger.click = !1),
                            (this._activeTrigger[t9] = !1),
                            (this._activeTrigger[tN] = !1),
                            i(this.tip).hasClass(tk))
                        ) {
                            var a = c.getTransitionDurationFromElement(n);
                            i(n).one(c.TRANSITION_END, r).emulateTransitionEnd(a);
                        } else r();
                        this._hoverState = "";
                    }
                }),
                (n.update = function () {
                    null !== this._popper && this._popper.scheduleUpdate();
                }),
                (n.isWithContent = function () {
                    return Boolean(this.getTitle());
                }),
                (n.addAttachmentClass = function (e) {
                    i(this.getTipElement()).addClass("bs-tooltip-" + e);
                }),
                (n.getTipElement = function () {
                    return (this.tip = this.tip || i(this.config.template)[0]), this.tip;
                }),
                (n.setContent = function () {
                    var e = this.getTipElement();
                    this.setElementContent(i(e.querySelectorAll(".tooltip-inner")), this.getTitle()), i(e).removeClass(tk + " " + tI);
                }),
                (n.setElementContent = function (e, s) {
                    "object" == typeof s && (s.nodeType || s.jquery)
                        ? this.config.html
                            ? i(s).parent().is(e) || e.empty().append(s)
                            : e.text(i(s).text())
                        : this.config.html
                        ? (this.config.sanitize && (s = tw(s, this.config.whiteList, this.config.sanitizeFn)), e.html(s))
                        : e.text(s);
                }),
                (n.getTitle = function () {
                    var e = this.element.getAttribute("data-original-title");
                    return e || (e = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), e;
                }),
                (n._getPopperConfig = function (e) {
                    var i = this;
                    return l(
                        {},
                        {
                            placement: e,
                            modifiers: { offset: this._getOffset(), flip: { behavior: this.config.fallbackPlacement }, arrow: { element: ".arrow" }, preventOverflow: { boundariesElement: this.config.boundary } },
                            onCreate: function (e) {
                                e.originalPlacement !== e.placement && i._handlePopperPlacementChange(e);
                            },
                            onUpdate: function (e) {
                                return i._handlePopperPlacementChange(e);
                            },
                        },
                        {},
                        this.config.popperConfig
                    );
                }),
                (n._getOffset = function () {
                    var e = this,
                        i = {};
                    return (
                        "function" == typeof this.config.offset
                            ? (i.fn = function (i) {
                                  return (i.offsets = l({}, i.offsets, {}, e.config.offset(i.offsets, e.element) || {})), i;
                              })
                            : (i.offset = this.config.offset),
                        i
                    );
                }),
                (n._getContainer = function () {
                    return !1 === this.config.container ? document.body : c.isElement(this.config.container) ? i(this.config.container) : i(document).find(this.config.container);
                }),
                (n._getAttachment = function (e) {
                    return tS[e.toUpperCase()];
                }),
                (n._setListeners = function () {
                    var e = this;
                    this.config.trigger.split(" ").forEach(function (s) {
                        if ("click" === s)
                            i(e.element).on(e.constructor.Event.CLICK, e.config.selector, function (i) {
                                return e.toggle(i);
                            });
                        else if ("manual" !== s) {
                            var n = s === tN ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
                                o = s === tN ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
                            i(e.element)
                                .on(n, e.config.selector, function (i) {
                                    return e._enter(i);
                                })
                                .on(o, e.config.selector, function (i) {
                                    return e._leave(i);
                                });
                        }
                    }),
                        (this._hideModalHandler = function () {
                            e.element && e.hide();
                        }),
                        i(this.element).closest(".modal").on("hide.bs.modal", this._hideModalHandler),
                        this.config.selector ? (this.config = l({}, this.config, { trigger: "manual", selector: "" })) : this._fixTitle();
                }),
                (n._fixTitle = function () {
                    var e = typeof this.element.getAttribute("data-original-title");
                    (this.element.getAttribute("title") || "string" !== e) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""));
                }),
                (n._enter = function (e, s) {
                    var n = this.constructor.DATA_KEY;
                    (s = s || i(e.currentTarget).data(n)) || ((s = new this.constructor(e.currentTarget, this._getDelegateConfig())), i(e.currentTarget).data(n, s)),
                        e && (s._activeTrigger["focusin" === e.type ? t9 : tN] = !0),
                        i(s.getTipElement()).hasClass(tI) || s._hoverState === tA
                            ? (s._hoverState = tA)
                            : (clearTimeout(s._timeout),
                              (s._hoverState = tA),
                              s.config.delay && s.config.delay.show
                                  ? (s._timeout = setTimeout(function () {
                                        s._hoverState === tA && s.show();
                                    }, s.config.delay.show))
                                  : s.show());
                }),
                (n._leave = function (e, s) {
                    var n = this.constructor.DATA_KEY;
                    (s = s || i(e.currentTarget).data(n)) || ((s = new this.constructor(e.currentTarget, this._getDelegateConfig())), i(e.currentTarget).data(n, s)),
                        e && (s._activeTrigger["focusout" === e.type ? t9 : tN] = !1),
                        s._isWithActiveTrigger() ||
                            (clearTimeout(s._timeout),
                            (s._hoverState = "out"),
                            s.config.delay && s.config.delay.hide
                                ? (s._timeout = setTimeout(function () {
                                      "out" === s._hoverState && s.hide();
                                  }, s.config.delay.hide))
                                : s.hide());
                }),
                (n._isWithActiveTrigger = function () {
                    for (var e in this._activeTrigger) if (this._activeTrigger[e]) return !0;
                    return !1;
                }),
                (n._getConfig = function (e) {
                    var s = i(this.element).data();
                    return (
                        Object.keys(s).forEach(function (e) {
                            -1 !== tT.indexOf(e) && delete s[e];
                        }),
                        "number" == typeof (e = l({}, this.constructor.Default, {}, s, {}, "object" == typeof e && e ? e : {})).delay && (e.delay = { show: e.delay, hide: e.delay }),
                        "number" == typeof e.title && (e.title = e.title.toString()),
                        "number" == typeof e.content && (e.content = e.content.toString()),
                        c.typeCheckConfig(tC, e, this.constructor.DefaultType),
                        e.sanitize && (e.template = tw(e.template, e.whiteList, e.sanitizeFn)),
                        e
                    );
                }),
                (n._getDelegateConfig = function () {
                    var e = {};
                    if (this.config) for (var i in this.config) this.constructor.Default[i] !== this.config[i] && (e[i] = this.config[i]);
                    return e;
                }),
                (n._cleanTipClass = function () {
                    var e = i(this.getTipElement()),
                        s = e.attr("class").match(tE);
                    null !== s && s.length && e.removeClass(s.join(""));
                }),
                (n._handlePopperPlacementChange = function (e) {
                    var i = e.instance;
                    (this.tip = i.popper), this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(e.placement));
                }),
                (n._fixTransition = function () {
                    var e = this.getTipElement(),
                        s = this.config.animation;
                    null === e.getAttribute("x-placement") && (i(e).removeClass(tk), (this.config.animation = !1), this.hide(), this.show(), (this.config.animation = s));
                }),
                (e._jQueryInterface = function (s) {
                    return this.each(function () {
                        var n = i(this).data("bs.tooltip");
                        if ((n || !/dispose|hide/.test(s)) && (n || ((n = new e(this, "object" == typeof s && s)), i(this).data("bs.tooltip", n)), "string" == typeof s)) {
                            if (void 0 === n[s]) throw TypeError('No method named "' + s + '"');
                            n[s]();
                        }
                    });
                }),
                o(e, null, [
                    {
                        key: "VERSION",
                        get: function () {
                            return "5.1";
                        },
                    },
                    {
                        key: "Default",
                        get: function () {
                            return t_;
                        },
                    },
                    {
                        key: "NAME",
                        get: function () {
                            return tC;
                        },
                    },
                    {
                        key: "DATA_KEY",
                        get: function () {
                            return "bs.tooltip";
                        },
                    },
                    {
                        key: "Event",
                        get: function () {
                            return tD;
                        },
                    },
                    {
                        key: "EVENT_KEY",
                        get: function () {
                            return ".bs.tooltip";
                        },
                    },
                    {
                        key: "DefaultType",
                        get: function () {
                            return tx;
                        },
                    },
                ]),
                e
            );
        })();
    (i.fn.tooltip = tO._jQueryInterface),
        (i.fn.tooltip.Constructor = tO),
        (i.fn.tooltip.noConflict = function () {
            return (i.fn.tooltip = t$), tO._jQueryInterface;
        });
    var tP = i.fn.popover,
        tL = RegExp("(^|\\s)bs-popover\\S+", "g"),
        tz = l({}, tO.Default, { placement: "right", trigger: "click", content: "", template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>' }),
        tj = l({}, tO.DefaultType, { content: "(string|element|function)" }),
        tR = {
            HIDE: "hide.bs.popover",
            HIDDEN: "hidden.bs.popover",
            SHOW: "show.bs.popover",
            SHOWN: "shown.bs.popover",
            INSERTED: "inserted.bs.popover",
            CLICK: "click.bs.popover",
            FOCUSIN: "focusin.bs.popover",
            FOCUSOUT: "focusout.bs.popover",
            MOUSEENTER: "mouseenter.bs.popover",
            MOUSELEAVE: "mouseleave.bs.popover",
        },
        tH = (function (e) {
            function s() {
                return e.apply(this, arguments) || this;
            }
            (r = e), ((n = s).prototype = Object.create(r.prototype)), (n.prototype.constructor = n), (n.__proto__ = r);
            var n,
                r,
                a = s.prototype;
            return (
                (a.isWithContent = function () {
                    return this.getTitle() || this._getContent();
                }),
                (a.addAttachmentClass = function (e) {
                    i(this.getTipElement()).addClass("bs-popover-" + e);
                }),
                (a.getTipElement = function () {
                    return (this.tip = this.tip || i(this.config.template)[0]), this.tip;
                }),
                (a.setContent = function () {
                    var e = i(this.getTipElement());
                    this.setElementContent(e.find(".popover-header"), this.getTitle());
                    var s = this._getContent();
                    "function" == typeof s && (s = s.call(this.element)), this.setElementContent(e.find(".popover-body"), s), e.removeClass("fade show");
                }),
                (a._getContent = function () {
                    return this.element.getAttribute("data-content") || this.config.content;
                }),
                (a._cleanTipClass = function () {
                    var e = i(this.getTipElement()),
                        s = e.attr("class").match(tL);
                    null !== s && s.length > 0 && e.removeClass(s.join(""));
                }),
                (s._jQueryInterface = function (e) {
                    return this.each(function () {
                        var n = i(this).data("bs.popover");
                        if ((n || !/dispose|hide/.test(e)) && (n || ((n = new s(this, "object" == typeof e ? e : null)), i(this).data("bs.popover", n)), "string" == typeof e)) {
                            if (void 0 === n[e]) throw TypeError('No method named "' + e + '"');
                            n[e]();
                        }
                    });
                }),
                o(s, null, [
                    {
                        key: "VERSION",
                        get: function () {
                            return "5.1";
                        },
                    },
                    {
                        key: "Default",
                        get: function () {
                            return tz;
                        },
                    },
                    {
                        key: "NAME",
                        get: function () {
                            return "popover";
                        },
                    },
                    {
                        key: "DATA_KEY",
                        get: function () {
                            return "bs.popover";
                        },
                    },
                    {
                        key: "Event",
                        get: function () {
                            return tR;
                        },
                    },
                    {
                        key: "EVENT_KEY",
                        get: function () {
                            return ".bs.popover";
                        },
                    },
                    {
                        key: "DefaultType",
                        get: function () {
                            return tj;
                        },
                    },
                ]),
                s
            );
        })(tO);
    (i.fn.popover = tH._jQueryInterface),
        (i.fn.popover.Constructor = tH),
        (i.fn.popover.noConflict = function () {
            return (i.fn.popover = tP), tH._jQueryInterface;
        });
    var tq = "scrollspy",
        tM = i.fn[tq],
        t0 = { offset: 10, method: "auto", target: "" },
        tF = { offset: "number", method: "string", target: "(string|element)" },
        t3 = { ACTIVATE: "activate.bs.scrollspy", SCROLL: "scroll.bs.scrollspy", LOAD_DATA_API: "load.bs.scrollspy.data-api" },
        tW = "active",
        t1 = {
            DATA_SPY: '[data-spy="scroll"]',
            ACTIVE: ".active",
            NAV_LIST_GROUP: ".nav, .list-group",
            NAV_LINKS: ".nav-link",
            NAV_ITEMS: ".nav-item",
            LIST_ITEMS: ".list-group-item",
            DROPDOWN: ".dropdown",
            DROPDOWN_ITEMS: ".dropdown-item",
            DROPDOWN_TOGGLE: ".dropdown-toggle",
        },
        tB = "position",
        tQ = (function () {
            function e(e, s) {
                var n = this;
                (this._element = e),
                    (this._scrollElement = "BODY" === e.tagName ? window : e),
                    (this._config = this._getConfig(s)),
                    (this._selector = this._config.target + " " + t1.NAV_LINKS + "," + this._config.target + " " + t1.LIST_ITEMS + "," + this._config.target + " " + t1.DROPDOWN_ITEMS),
                    (this._offsets = []),
                    (this._targets = []),
                    (this._activeTarget = null),
                    (this._scrollHeight = 0),
                    i(this._scrollElement).on(t3.SCROLL, function (e) {
                        return n._process(e);
                    }),
                    this.refresh(),
                    this._process();
            }
            var s = e.prototype;
            return (
                (s.refresh = function () {
                    var e = this,
                        s = this._scrollElement === this._scrollElement.window ? "offset" : tB,
                        n = "auto" === this._config.method ? s : this._config.method,
                        o = n === tB ? this._getScrollTop() : 0;
                    (this._offsets = []),
                        (this._targets = []),
                        (this._scrollHeight = this._getScrollHeight()),
                        [].slice
                            .call(document.querySelectorAll(this._selector))
                            .map(function (e) {
                                var s,
                                    r = c.getSelectorFromElement(e);
                                if ((r && (s = document.querySelector(r)), s)) {
                                    var a = s.getBoundingClientRect();
                                    if (a.width || a.height) return [i(s)[n]().top + o, r];
                                }
                                return null;
                            })
                            .filter(function (e) {
                                return e;
                            })
                            .sort(function (e, i) {
                                return e[0] - i[0];
                            })
                            .forEach(function (i) {
                                e._offsets.push(i[0]), e._targets.push(i[1]);
                            });
                }),
                (s.dispose = function () {
                    i.removeData(this._element, "bs.scrollspy"),
                        i(this._scrollElement).off(".bs.scrollspy"),
                        (this._element = null),
                        (this._scrollElement = null),
                        (this._config = null),
                        (this._selector = null),
                        (this._offsets = null),
                        (this._targets = null),
                        (this._activeTarget = null),
                        (this._scrollHeight = null);
                }),
                (s._getConfig = function (e) {
                    if ("string" != typeof (e = l({}, t0, {}, "object" == typeof e && e ? e : {})).target) {
                        var s = i(e.target).attr("id");
                        s || ((s = c.getUID(tq)), i(e.target).attr("id", s)), (e.target = "#" + s);
                    }
                    return c.typeCheckConfig(tq, e, tF), e;
                }),
                (s._getScrollTop = function () {
                    return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
                }),
                (s._getScrollHeight = function () {
                    return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
                }),
                (s._getOffsetHeight = function () {
                    return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
                }),
                (s._process = function () {
                    var e = this._getScrollTop() + this._config.offset,
                        i = this._getScrollHeight(),
                        s = this._config.offset + i - this._getOffsetHeight();
                    if ((this._scrollHeight !== i && this.refresh(), e >= s)) {
                        var n = this._targets[this._targets.length - 1];
                        this._activeTarget !== n && this._activate(n);
                    } else {
                        if (this._activeTarget && e < this._offsets[0] && this._offsets[0] > 0) return (this._activeTarget = null), void this._clear();
                        for (var o = this._offsets.length; o--; ) this._activeTarget !== this._targets[o] && e >= this._offsets[o] && (void 0 === this._offsets[o + 1] || e < this._offsets[o + 1]) && this._activate(this._targets[o]);
                    }
                }),
                (s._activate = function (e) {
                    (this._activeTarget = e), this._clear();
                    var s = this._selector.split(",").map(function (i) {
                            return i + '[data-target="' + e + '"],' + i + '[href="' + e + '"]';
                        }),
                        n = i([].slice.call(document.querySelectorAll(s.join(","))));
                    n.hasClass("dropdown-item")
                        ? (n.closest(t1.DROPDOWN).find(t1.DROPDOWN_TOGGLE).addClass(tW), n.addClass(tW))
                        : (n.addClass(tW),
                          n
                              .parents(t1.NAV_LIST_GROUP)
                              .prev(t1.NAV_LINKS + ", " + t1.LIST_ITEMS)
                              .addClass(tW),
                          n.parents(t1.NAV_LIST_GROUP).prev(t1.NAV_ITEMS).children(t1.NAV_LINKS).addClass(tW)),
                        i(this._scrollElement).trigger(t3.ACTIVATE, { relatedTarget: e });
                }),
                (s._clear = function () {
                    [].slice
                        .call(document.querySelectorAll(this._selector))
                        .filter(function (e) {
                            return e.classList.contains(tW);
                        })
                        .forEach(function (e) {
                            return e.classList.remove(tW);
                        });
                }),
                (e._jQueryInterface = function (s) {
                    return this.each(function () {
                        var n = i(this).data("bs.scrollspy");
                        if ((n || ((n = new e(this, "object" == typeof s && s)), i(this).data("bs.scrollspy", n)), "string" == typeof s)) {
                            if (void 0 === n[s]) throw TypeError('No method named "' + s + '"');
                            n[s]();
                        }
                    });
                }),
                o(e, null, [
                    {
                        key: "VERSION",
                        get: function () {
                            return "5.1";
                        },
                    },
                    {
                        key: "Default",
                        get: function () {
                            return t0;
                        },
                    },
                ]),
                e
            );
        })();
    i(window).on(t3.LOAD_DATA_API, function () {
        for (var e = [].slice.call(document.querySelectorAll(t1.DATA_SPY)), s = e.length; s--; ) {
            var n = i(e[s]);
            tQ._jQueryInterface.call(n, n.data());
        }
    }),
        (i.fn[tq] = tQ._jQueryInterface),
        (i.fn[tq].Constructor = tQ),
        (i.fn[tq].noConflict = function () {
            return (i.fn[tq] = tM), tQ._jQueryInterface;
        });
    var tV = i.fn.tab,
        t4 = "active",
        tU = ".active",
        tG = "> li > .active",
        tX = (function () {
            function e(e) {
                this._element = e;
            }
            var s = e.prototype;
            return (
                (s.show = function () {
                    var e = this;
                    if (!((this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && i(this._element).hasClass(t4)) || i(this._element).hasClass("disabled"))) {
                        var s,
                            n,
                            o = i(this._element).closest(".nav, .list-group")[0],
                            r = c.getSelectorFromElement(this._element);
                        if (o) {
                            var a = "UL" === o.nodeName || "OL" === o.nodeName ? tG : tU;
                            n = (n = i.makeArray(i(o).find(a)))[n.length - 1];
                        }
                        var l = i.Event("hide.bs.tab", { relatedTarget: this._element }),
                            h = i.Event("show.bs.tab", { relatedTarget: n });
                        if ((n && i(n).trigger(l), i(this._element).trigger(h), !h.isDefaultPrevented() && !l.isDefaultPrevented())) {
                            r && (s = document.querySelector(r)), this._activate(this._element, o);
                            var u = function () {
                                var s = i.Event("hidden.bs.tab", { relatedTarget: e._element }),
                                    o = i.Event("shown.bs.tab", { relatedTarget: n });
                                i(n).trigger(s), i(e._element).trigger(o);
                            };
                            s ? this._activate(s, s.parentNode, u) : u();
                        }
                    }
                }),
                (s.dispose = function () {
                    i.removeData(this._element, "bs.tab"), (this._element = null);
                }),
                (s._activate = function (e, s, n) {
                    var o = this,
                        r = (s && ("UL" === s.nodeName || "OL" === s.nodeName) ? i(s).find(tG) : i(s).children(tU))[0],
                        a = n && r && i(r).hasClass("fade"),
                        l = function () {
                            return o._transitionComplete(e, r, n);
                        };
                    if (r && a) {
                        var h = c.getTransitionDurationFromElement(r);
                        i(r).removeClass("show").one(c.TRANSITION_END, l).emulateTransitionEnd(h);
                    } else l();
                }),
                (s._transitionComplete = function (e, s, n) {
                    if (s) {
                        i(s).removeClass(t4);
                        var o = i(s.parentNode).find("> .dropdown-menu .active")[0];
                        o && i(o).removeClass(t4), "tab" === s.getAttribute("role") && s.setAttribute("aria-selected", !1);
                    }
                    if (
                        (i(e).addClass(t4),
                        "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0),
                        c.reflow(e),
                        e.classList.contains("fade") && e.classList.add("show"),
                        e.parentNode && i(e.parentNode).hasClass("dropdown-menu"))
                    ) {
                        var r = i(e).closest(".dropdown")[0];
                        r && i([].slice.call(r.querySelectorAll(".dropdown-toggle"))).addClass(t4), e.setAttribute("aria-expanded", !0);
                    }
                    n && n();
                }),
                (e._jQueryInterface = function (s) {
                    return this.each(function () {
                        var n = i(this),
                            o = n.data("bs.tab");
                        if ((o || ((o = new e(this)), n.data("bs.tab", o)), "string" == typeof s)) {
                            if (void 0 === o[s]) throw TypeError('No method named "' + s + '"');
                            o[s]();
                        }
                    });
                }),
                o(e, null, [
                    {
                        key: "VERSION",
                        get: function () {
                            return "5.1";
                        },
                    },
                ]),
                e
            );
        })();
    i(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function (e) {
        e.preventDefault(), tX._jQueryInterface.call(i(this), "show");
    }),
        (i.fn.tab = tX._jQueryInterface),
        (i.fn.tab.Constructor = tX),
        (i.fn.tab.noConflict = function () {
            return (i.fn.tab = tV), tX._jQueryInterface;
        });
    var tK = i.fn.toast,
        tY = "click.dismiss.bs.toast",
        t2 = "show",
        t7 = "showing",
        t5 = { animation: "boolean", autohide: "boolean", delay: "number" },
        tZ = { animation: !0, autohide: !0, delay: 500 },
        t6 = (function () {
            function e(e, i) {
                (this._element = e), (this._config = this._getConfig(i)), (this._timeout = null), this._setListeners();
            }
            var s = e.prototype;
            return (
                (s.show = function () {
                    var e = this,
                        s = i.Event("show.bs.toast");
                    if ((i(this._element).trigger(s), !s.isDefaultPrevented())) {
                        this._config.animation && this._element.classList.add("fade");
                        var n = function () {
                            e._element.classList.remove(t7),
                                e._element.classList.add(t2),
                                i(e._element).trigger("shown.bs.toast"),
                                e._config.autohide &&
                                    (e._timeout = setTimeout(function () {
                                        e.hide();
                                    }, e._config.delay));
                        };
                        if ((this._element.classList.remove("hide"), c.reflow(this._element), this._element.classList.add(t7), this._config.animation)) {
                            var o = c.getTransitionDurationFromElement(this._element);
                            i(this._element).one(c.TRANSITION_END, n).emulateTransitionEnd(o);
                        } else n();
                    }
                }),
                (s.hide = function () {
                    if (this._element.classList.contains(t2)) {
                        var e = i.Event("hide.bs.toast");
                        i(this._element).trigger(e), e.isDefaultPrevented() || this._close();
                    }
                }),
                (s.dispose = function () {
                    clearTimeout(this._timeout),
                        (this._timeout = null),
                        this._element.classList.contains(t2) && this._element.classList.remove(t2),
                        i(this._element).off(tY),
                        i.removeData(this._element, "bs.toast"),
                        (this._element = null),
                        (this._config = null);
                }),
                (s._getConfig = function (e) {
                    return (e = l({}, tZ, {}, i(this._element).data(), {}, "object" == typeof e && e ? e : {})), c.typeCheckConfig("toast", e, this.constructor.DefaultType), e;
                }),
                (s._setListeners = function () {
                    var e = this;
                    i(this._element).on(tY, '[data-dismiss="toast"]', function () {
                        return e.hide();
                    });
                }),
                (s._close = function () {
                    var e = this,
                        s = function () {
                            e._element.classList.add("hide"), i(e._element).trigger("hidden.bs.toast");
                        };
                    if ((this._element.classList.remove(t2), this._config.animation)) {
                        var n = c.getTransitionDurationFromElement(this._element);
                        i(this._element).one(c.TRANSITION_END, s).emulateTransitionEnd(n);
                    } else s();
                }),
                (e._jQueryInterface = function (s) {
                    return this.each(function () {
                        var n = i(this),
                            o = n.data("bs.toast");
                        if ((o || ((o = new e(this, "object" == typeof s && s)), n.data("bs.toast", o)), "string" == typeof s)) {
                            if (void 0 === o[s]) throw TypeError('No method named "' + s + '"');
                            o[s](this);
                        }
                    });
                }),
                o(e, null, [
                    {
                        key: "VERSION",
                        get: function () {
                            return "5.1";
                        },
                    },
                    {
                        key: "DefaultType",
                        get: function () {
                            return t5;
                        },
                    },
                    {
                        key: "Default",
                        get: function () {
                            return tZ;
                        },
                    },
                ]),
                e
            );
        })();
    (function (e) {
        e.extend({
            playSound: function () {
                return e('<audio class="sound-player" autoplay="autoplay" style="display:none;"><source src="' + arguments[0] + '" /><embed src="' + arguments[0] + '" hidden="true" autostart="true" loop="false"/></audio>').appendTo("body");
            },
            stopSound: function () {
                e(".sound-player").remove();
            },
        });
    })(jQuery),
        i(".modal").on("show.bs.modal", function (e) {
            i(".modal .modal-dialog").attr("class", "modal-dialog  fadeInDown  animated");
        }),
        i(function () {
            var e, s, n, o;
            i(".ripple-effect").click(function (r) {
                0 === i(this).find(".ink").length && i(this).prepend("<span class='ink'></span>"),
                    (e = i(this).find(".ink")).removeClass("animate"),
                    e.height() || e.width() || ((s = Math.max(i(this).outerWidth(), i(this).outerHeight())), e.css({ height: s, width: s })),
                    (n = r.pageX - i(this).offset().left - e.width() / 2),
                    (o = r.pageY - i(this).offset().top - e.height() / 2),
                    e.css({ top: o + "px", left: n + "px" }).addClass("animate");
            });
        }),
        (i.fn.toast = t6._jQueryInterface),
        (i.fn.toast.Constructor = t6),
        (i.fn.toast.noConflict = function () {
            return (i.fn.toast = tK), t6._jQueryInterface;
        }),
        (e.Alert = d),
        (e.Button = y),
        (e.Carousel = k),
        (e.Collapse = q),
        (e.Dropdown = te),
        (e.Modal = t8),
        (e.Popover = tH),
        (e.Scrollspy = tQ),
        (e.Tab = tX),
        (e.Toast = t6),
        (e.Tooltip = tO),
        (e.Util = c),
        Object.defineProperty(e, "__esModule", { value: !0 });
}),
    (function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery);
    })(function (e) {
        function i(i, n, o) {
            var r,
                a,
                l = { content: { message: "object" == typeof n ? n.message : n, title: n.title ? n.title : "", icon: n.icon ? n.icon : "", url: n.url ? n.url : "#", target: n.target ? n.target : "-" } };
            (o = e.extend(!0, {}, l, o)),
                (this.settings = e.extend(!0, {}, s, o)),
                (this._defaults = s),
                "-" === this.settings.content.target && (this.settings.content.target = this.settings.url_target),
                (this.animations = { start: "webkitAnimationStart oanimationstart MSAnimationStart animationstart", end: "webkitAnimationEnd oanimationend MSAnimationEnd animationend" }),
                "number" == typeof this.settings.offset && (this.settings.offset = { x: this.settings.offset, y: this.settings.offset }),
                (!this.settings.allow_duplicates &&
                    (this.settings.allow_duplicates ||
                        ((r = this),
                        (a = !1),
                        e('[data-notify="container"]').each(function (i, s) {
                            var n = e(s),
                                o = n.find('[data-notify="title"]').text().trim(),
                                l = n.find('[data-notify="message"]').html().trim(),
                                h =
                                    o ===
                                    e("<div>" + r.settings.content.title + "</div>")
                                        .html()
                                        .trim(),
                                c =
                                    l ===
                                    e("<div>" + r.settings.content.message + "</div>")
                                        .html()
                                        .trim(),
                                u = n.hasClass("alert-" + r.settings.type);
                            return h && c && u && (a = !0), !a;
                        }),
                        a))) ||
                    this.init();
        }
        var s = {
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
                '<div data-notify="container" class="col-10 col-xs-11 col-sm-4 alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss">&times;</button><span data-notify="icon"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>',
        };
        (String.format = function () {
            for (var e = arguments[0], i = 1; i < arguments.length; i++) e = e.replace(RegExp("\\{" + (i - 1) + "\\}", "gm"), arguments[i]);
            return e;
        }),
            e.extend(i.prototype, {
                init: function () {
                    var e = this;
                    this.buildNotify(),
                        this.settings.content.icon && this.setIcon(),
                        "#" != this.settings.content.url && this.styleURL(),
                        this.styleDismiss(),
                        this.placement(),
                        this.bind(),
                        (this.notify = {
                            $ele: this.$ele,
                            update: function (i, s) {
                                var n = {};
                                for (var o in ("string" == typeof i ? (n[i] = s) : (n = i), n))
                                    switch (o) {
                                        case "type":
                                            this.$ele.removeClass("alert-" + e.settings.type),
                                                this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass("progress-bar-" + e.settings.type),
                                                (e.settings.type = n[o]),
                                                this.$ele
                                                    .addClass("alert-" + n[o])
                                                    .find('[data-notify="progressbar"] > .progress-bar')
                                                    .addClass("progress-bar-" + n[o]);
                                            break;
                                        case "icon":
                                            var r = this.$ele.find('[data-notify="icon"]');
                                            "class" === e.settings.icon_type.toLowerCase() ? r.removeClass(e.settings.content.icon).addClass(n[o]) : (r.is("img") || r.find("img"), r.attr("src", n[o]));
                                            break;
                                        case "progress":
                                            var a = e.settings.delay - e.settings.delay * (n[o] / 100);
                                            this.$ele.data("notify-delay", a),
                                                this.$ele
                                                    .find('[data-notify="progressbar"] > div')
                                                    .attr("aria-valuenow", n[o])
                                                    .css("width", n[o] + "%");
                                            break;
                                        case "url":
                                            this.$ele.find('[data-notify="url"]').attr("href", n[o]);
                                            break;
                                        case "target":
                                            this.$ele.find('[data-notify="url"]').attr("target", n[o]);
                                            break;
                                        default:
                                            this.$ele.find('[data-notify="' + o + '"]').html(n[o]);
                                    }
                                var l = this.$ele.outerHeight() + parseInt(e.settings.spacing) + parseInt(e.settings.offset.y);
                                e.reposition(l);
                            },
                            close: function () {
                                e.close();
                            },
                        });
                },
                buildNotify: function () {
                    var i = this.settings.content;
                    (this.$ele = e(String.format(this.settings.template, this.settings.type, i.title, i.message, i.url, i.target))),
                        this.$ele.attr("data-notify-position", this.settings.placement.from + "-" + this.settings.placement.align),
                        this.settings.allow_dismiss || this.$ele.find('[data-notify="dismiss"]').css("display", "none"),
                        ((!(this.settings.delay <= 0) || this.settings.showProgressbar) && this.settings.showProgressbar) || this.$ele.find('[data-notify="progressbar"]').remove();
                },
                setIcon: function () {
                    "class" === this.settings.icon_type.toLowerCase()
                        ? this.$ele.find('[data-notify="icon"]').addClass(this.settings.content.icon)
                        : this.$ele.find('[data-notify="icon"]').is("img")
                        ? this.$ele.find('[data-notify="icon"]').attr("src", this.settings.content.icon)
                        : this.$ele.find('[data-notify="icon"]').append('<img src="' + this.settings.content.icon + '" alt="Notify Icon" />');
                },
                styleDismiss: function () {
                    this.$ele.find('[data-notify="dismiss"]').css({ position: "absolute", right: "10px", top: "5px", zIndex: this.settings.z_index + 2 });
                },
                styleURL: function () {
                    this.$ele
                        .find('[data-notify="url"]')
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
                    var i = this,
                        s = this.settings.offset.y,
                        n = {
                            display: "inline-block",
                            margin: "0px auto",
                            paddingLeft: "65px",
                            position: this.settings.position ? this.settings.position : "body" === this.settings.element ? "fixed" : "absolute",
                            transition: "all .5s ease-in-out",
                            zIndex: this.settings.z_index,
                        },
                        o = !1,
                        r = this.settings;
                    switch (
                        (e('[data-notify-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])').each(function () {
                            s = Math.max(s, parseInt(e(this).css(r.placement.from)) + parseInt(e(this).outerHeight()) + parseInt(r.spacing));
                        }),
                        !0 === this.settings.newest_on_top && (s = this.settings.offset.y),
                        (n[this.settings.placement.from] = s + "px"),
                        this.settings.placement.align)
                    ) {
                        case "left":
                        case "right":
                            n[this.settings.placement.align] = this.settings.offset.x + "px";
                            break;
                        case "center":
                            (n.left = 0), (n.right = 0);
                    }
                    this.$ele.css(n).addClass(this.settings.animate.enter),
                        e.each(["webkit-", "moz-", "o-", "ms-", ""], function (e, s) {
                            i.$ele[0].style[s + "AnimationIterationCount"] = 1;
                        }),
                        e(this.settings.element).append(this.$ele),
                        !0 === this.settings.newest_on_top && ((s = parseInt(s) + parseInt(this.settings.spacing) + this.$ele.outerHeight()), this.reposition(s)),
                        e.isFunction(i.settings.onShow) && i.settings.onShow.call(this.$ele),
                        this.$ele
                            .one(this.animations.start, function () {
                                o = !0;
                            })
                            .one(this.animations.end, function () {
                                i.$ele.removeClass(i.settings.animate.enter), e.isFunction(i.settings.onShown) && i.settings.onShown.call(this);
                            }),
                        setTimeout(function () {
                            o || (e.isFunction(i.settings.onShown) && i.settings.onShown.call(this));
                        }, 600);
                },
                bind: function () {
                    var i = this;
                    if (
                        (this.$ele.find('[data-notify="dismiss"]').on("click", function () {
                            i.close();
                        }),
                        this.$ele
                            .mouseover(function () {
                                e(this).data("data-hover", "true");
                            })
                            .mouseout(function () {
                                e(this).data("data-hover", "false");
                            }),
                        this.$ele.data("data-hover", "false"),
                        this.settings.delay > 0)
                    ) {
                        i.$ele.data("notify-delay", i.settings.delay);
                        var s = setInterval(function () {
                            var e = parseInt(i.$ele.data("notify-delay")) - i.settings.timer;
                            if (("false" === i.$ele.data("data-hover") && "pause" === i.settings.mouse_over) || "pause" != i.settings.mouse_over) {
                                var n = ((i.settings.delay - e) / i.settings.delay) * 100;
                                i.$ele.data("notify-delay", e),
                                    i.$ele
                                        .find('[data-notify="progressbar"] > div')
                                        .attr("aria-valuenow", n)
                                        .css("width", n + "%");
                            }
                            e <= -i.settings.timer && (clearInterval(s), i.close());
                        }, i.settings.timer);
                    }
                },
                close: function () {
                    var i = this,
                        s = parseInt(this.$ele.css(this.settings.placement.from)),
                        n = !1;
                    this.$ele.attr("data-closing", "true").addClass(this.settings.animate.exit),
                        i.reposition(s),
                        e.isFunction(i.settings.onClose) && i.settings.onClose.call(this.$ele),
                        this.$ele
                            .one(this.animations.start, function () {
                                n = !0;
                            })
                            .one(this.animations.end, function () {
                                e(this).remove(), e.isFunction(i.settings.onClosed) && i.settings.onClosed.call(this);
                            }),
                        setTimeout(function () {
                            n || (i.$ele.remove(), i.settings.onClosed && i.settings.onClosed(i.$ele));
                        }, 600);
                },
                reposition: function (i) {
                    var s = this,
                        n = '[data-notify-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])',
                        o = this.$ele.nextAll(n);
                    !0 === this.settings.newest_on_top && (o = this.$ele.prevAll(n)),
                        o.each(function () {
                            e(this).css(s.settings.placement.from, i), (i = parseInt(i) + parseInt(s.settings.spacing) + e(this).outerHeight());
                        });
                },
            }),
            (e.notify = function (e, s) {
                return new i(this, e, s).notify;
            }),
            (e.notifyDefaults = function (i) {
                return (s = e.extend(!0, {}, s, i));
            }),
            (e.notifyClose = function (i) {
                "warning" === i && (i = "danger"),
                    void 0 === i || "all" === i
                        ? e("[data-notify]").find('[data-notify="dismiss"]').trigger("click")
                        : "success" === i || "info" === i || "warning" === i || "danger" === i
                        ? e(".alert-" + i + "[data-notify]")
                              .find('[data-notify="dismiss"]')
                              .trigger("click")
                        : i
                        ? e(i + "[data-notify]")
                              .find('[data-notify="dismiss"]')
                              .trigger("click")
                        : e('[data-notify-position="' + i + '"]')
                              .find('[data-notify="dismiss"]')
                              .trigger("click");
            }),
            (e.notifyCloseExcept = function (i) {
                "warning" === i && (i = "danger"),
                    "success" === i || "info" === i || "warning" === i || "danger" === i
                        ? e("[data-notify]")
                              .not(".alert-" + i)
                              .find('[data-notify="dismiss"]')
                              .trigger("click")
                        : e("[data-notify]").not(i).find('[data-notify="dismiss"]').trigger("click");
            });
    }),
    $(".video-btn").click(function () {
        s = $(this).data("src");
    }),
    $("#videoModal").on("shown.bs.modal", function (e) {
        $("#video").attr("src", s + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    }),
    $("#videoModal").on("hide.bs.modal", function (e) {
        $("#video").attr("src", s);
    });
const el = document.querySelectorAll(".set-colors");
for (let t = 0; t < el.length; t++) {
    let e = el[t].dataset.setcolor;
    $('[data-setcolor="' + e + '"]').css({ background: e });
}
if ($(".img-cover")[0]) {
    let i = $(".img-cover").attr("src");
    $("body").css({ "background-image": "url('" + i + "')", "background-position": "center", "background-repeat": "no-repeat", "background-size": "cover", "background-attachment": "fixed" });
}
if (
    ($("a.scrollLink").click(function (e) {
        e.preventDefault(), $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top }, 500);
    }),
    $(window).scroll(function () {
        $(this).scrollTop() >= 50 ? $(".goup").fadeIn(200) : $(".goup").fadeOut(200);
    }),
    $(".goup").click(function () {
        $("body,html").animate({ scrollTop: 0 }, 500);
    }),
    $(".navbar-toggler-icon")[0])
) {
    $(".navbar-toggler-icon").wrapInner('<div class="line-menu half start"></div><div class="line-menu"></div><div class="line-menu half end"></div>');
    var s,
        n = document.querySelector(".navbar-toggler-icon");
    n.addEventListener("click", function () {
        n.classList.toggle("open");
    });
}
const SetShadow = document.querySelectorAll(".shadow");
for (let t = 0; t < SetShadow.length; t++) {
    let o = SetShadow[t].dataset.shadow;
    $('[data-shadow="' + o + '"]').css({ "box-shadow": " 0 0 8px rgba(0, 0, 0, 0.18), 0 8px 16px rgba(0, 0, 0, 0." + o + ")" });
}
var showChar = 50,
    ellipsestext = "...",
    moretext = "Show more",
    lesstext = "Show less";
$(".text-limit").each(function () {
    var e = $(this).html();
    if (e.length > showChar) {
        var i = e.substr(0, showChar),
            s = e.substr(showChar, e.length - showChar);
        $(this).html(i + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + s + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + "</a></span>");
    }
}),
    $(".morelink").click(function () {
        return $(this).hasClass("less") ? ($(this).removeClass("less"), $(this).html(moretext)) : ($(this).addClass("less"), $(this).html(lesstext)), $(this).parent().prev().toggle(), $(this).prev().toggle(), !1;
    });
const bg_glass = ["x1", "x2", "x3", "x4", "x5", "x6", "x7"];
for (let bg = 0; bg < bg_glass.length; bg++) {
    let r = ".bg-glass-" + bg_glass[bg];
    if ($(r)[0]) {
        var a = r.replace(".bg-glass-x", "");
        $(r).css({ background: "rgba(0, 0, 0, 0." + a + "0)", "backdrop-filter": "blur(6.3px)", "-webkit-backdrop-filter": "blur(6.3px)", border: "1px solid rgba(50, 55, 66, 0.10)" });
    }
}
const bg_limit = ["-glass-x1", "-glass-x2", "-glass-x3", "-glass-x4", "-glass-x5", "-glass-x6", "-glass-x7"],
    bg_class = [".primary", ".success", ".danger", ".warning", ".info", ".dark", ".light"];
for (let ex = 0; ex < bg_class.length; ex++) {
    if ($(".primary" + bg_limit[ex])[0]) {
        var l = ".primary" + bg_limit[ex];
        let h = l.replace(/[^0-9\/]/g, "");
        $(l).css({ background: " rgba(2, 104, 212, 0." + h + "0)", "backdrop-filter": "blur(6.3px)", "-webkit-backdrop-filter": "blur(6.3px)", border: "1px solid rgba(50, 55, 66, 0.10)" });
    }
    if ($(".success" + bg_limit[ex])[0]) {
        var l = ".success" + bg_limit[ex];
        let c = l.replace(/[^0-9\/]/g, "");
        $(l).css({ background: " rgba(46, 147, 42, 0." + c + "0)", "backdrop-filter": "blur(6.3px)", "-webkit-backdrop-filter": "blur(6.3px)", border: "1px solid rgba(50, 55, 66, 0.10)" });
    }
    if ($(".danger" + bg_limit[ex])[0]) {
        var l = ".danger" + bg_limit[ex];
        let u = l.replace(/[^0-9\/]/g, "");
        $(l).css({ background: " rgba(220, 53, 69, 0." + u + "0)", "backdrop-filter": "blur(6.3px)", "-webkit-backdrop-filter": "blur(6.3px)", border: "1px solid rgba(50, 55, 66, 0.10)" });
    }
    if ($(".warning" + bg_limit[ex])[0]) {
        var l = ".warning" + bg_limit[ex];
        let d = l.replace(/[^0-9\/]/g, "");
        $(l).css({ background: " rgba(255, 193, 7, 0." + d + "0)", "backdrop-filter": "blur(6.3px)", "-webkit-backdrop-filter": "blur(6.3px)", border: "1px solid rgba(50, 55, 66, 0.10)" });
    }
    if ($(".info" + bg_limit[ex])[0]) {
        var l = ".info" + bg_limit[ex];
        let g = l.replace(/[^0-9\/]/g, "");
        $(l).css({ background: " rgba(23, 162, 184, 0." + g + "0)", "backdrop-filter": "blur(6.3px)", "-webkit-backdrop-filter": "blur(6.3px)", border: "1px solid rgba(50, 55, 66, 0.10)" });
    }
    if ($(".dark" + bg_limit[ex])[0]) {
        var l = ".dark" + bg_limit[ex];
        let p = l.replace(/[^0-9\/]/g, "");
        $(l).css({ background: " rgba(0, 0, 0, 0." + p + "0)", "backdrop-filter": "blur(6.3px)", "-webkit-backdrop-filter": "blur(6.3px)", border: "1px solid rgba(50, 55, 66, 0.10)" });
    }
    if ($(".light" + bg_limit[ex])[0]) {
        var l = ".light" + bg_limit[ex];
        let f = l.replace(/[^0-9\/]/g, "");
        $(l).css({ background: " rgba(255, 255, 255, 0." + f + "0)", "backdrop-filter": "blur(6.3px)", "-webkit-backdrop-filter": "blur(6.3px)", border: "1px solid rgba(50, 55, 66, 0.10)" });
    }
}
function SmartMenu(e = []) {
    function i(e = []) {
        $("img").each(function () {
            ((void 0 !== this.naturalWidth && 0 == this.naturalWidth) || "uninitialized" == this.readyState) && (null == e.brokenImages ? $(this).attr("src", "./app/images/mrvsmk2pl3l8fwocbfhy.gif") : $(this).attr("src", e.brokenImages));
        }),
            !0 == e.ConsoleClear && console.clear(),
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    $("img").each(function () {
        ((void 0 !== this.naturalWidth && 0 == this.naturalWidth) || "uninitialized" == this.readyState) && (null == e.brokenImages ? $(this).attr("src", "./app/images/mrvsmk2pl3l8fwocbfhy.gif") : $(this).attr("src", e.brokenImages));
    }),
        !0 == e.ConsoleClear && console.clear(),
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
!(function (e, i, s, n) {
    function o(i, s) {
        (this.settings = null),
            (this.options = e.extend({}, o.Defaults, s)),
            (this.$element = e(i)),
            (this._handlers = {}),
            (this._plugins = {}),
            (this._supress = {}),
            (this._current = null),
            (this._speed = null),
            (this._coordinates = []),
            (this._breakpoint = null),
            (this._width = null),
            (this._items = []),
            (this._clones = []),
            (this._mergers = []),
            (this._widths = []),
            (this._invalidated = {}),
            (this._pipe = []),
            (this._drag = { time: null, target: null, pointer: null, stage: { start: null, current: null }, direction: null }),
            (this._states = { current: {}, tags: { initializing: ["busy"], animating: ["busy"], dragging: ["interacting"] } }),
            e.each(
                ["onResize", "onThrottledResize"],
                e.proxy(function (i, s) {
                    this._handlers[s] = e.proxy(this[s], this);
                }, this)
            ),
            e.each(
                o.Plugins,
                e.proxy(function (e, i) {
                    this._plugins[e.charAt(0).toLowerCase() + e.slice(1)] = new i(this);
                }, this)
            ),
            e.each(
                o.Workers,
                e.proxy(function (i, s) {
                    this._pipe.push({ filter: s.filter, run: e.proxy(s.run, this) });
                }, this)
            ),
            this.setup(),
            this.initialize();
    }
    (o.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        checkVisibility: !0,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: i,
        fallbackEasing: "swing",
        slideTransition: "",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab",
    }),
        (o.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
        (o.Type = { Event: "event", State: "state" }),
        (o.Plugins = {}),
        (o.Workers = [
            {
                filter: ["width", "settings"],
                run: function () {
                    this._width = this.$element.width();
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function (e) {
                    e.current = this._items && this._items[this.relative(this._current)];
                },
            },
            {
                filter: ["items", "settings"],
                run: function () {
                    this.$stage.children(".cloned").remove();
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function (e) {
                    var i = this.settings.margin || "",
                        s = !this.settings.autoWidth,
                        n = this.settings.rtl,
                        o = { width: "auto", "margin-left": n ? i : "", "margin-right": n ? "" : i };
                    s || this.$stage.children().css(o), (e.css = o);
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function (e) {
                    var i = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                        s = null,
                        n = this._items.length,
                        o = !this.settings.autoWidth,
                        r = [];
                    for (e.items = { merge: !1, width: i }; n--; )
                        (s = this._mergers[n]), (s = (this.settings.mergeFit && Math.min(s, this.settings.items)) || s), (e.items.merge = s > 1 || e.items.merge), (r[n] = o ? i * s : this._items[n].width());
                    this._widths = r;
                },
            },
            {
                filter: ["items", "settings"],
                run: function () {
                    var i = [],
                        s = this._items,
                        n = this.settings,
                        o = Math.max(2 * n.items, 4),
                        r = 2 * Math.ceil(s.length / 2),
                        a = n.loop && s.length ? (n.rewind ? o : Math.max(o, r)) : 0,
                        l = "",
                        h = "";
                    for (a /= 2; a > 0; ) i.push(this.normalize(i.length / 2, !0)), (l += s[i[i.length - 1]][0].outerHTML), i.push(this.normalize(s.length - 1 - (i.length - 1) / 2, !0)), (h = s[i[i.length - 1]][0].outerHTML + h), (a -= 1);
                    (this._clones = i), e(l).addClass("cloned").appendTo(this.$stage), e(h).addClass("cloned").prependTo(this.$stage);
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function () {
                    for (var e = this.settings.rtl ? 1 : -1, i = this._clones.length + this._items.length, s = -1, n = 0, o = 0, r = []; ++s < i; )
                        r.push((n = r[s - 1] || 0) + (o = this._widths[this.relative(s)] + this.settings.margin) * e);
                    this._coordinates = r;
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function () {
                    var e = this.settings.stagePadding,
                        i = this._coordinates,
                        s = { width: Math.ceil(Math.abs(i[i.length - 1])) + 2 * e, "padding-left": e || "", "padding-right": e || "" };
                    this.$stage.css(s);
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function (e) {
                    var i = this._coordinates.length,
                        s = !this.settings.autoWidth,
                        n = this.$stage.children();
                    if (s && e.items.merge) for (; i--; ) (e.css.width = this._widths[this.relative(i)]), n.eq(i).css(e.css);
                    else s && ((e.css.width = e.items.width), n.css(e.css));
                },
            },
            {
                filter: ["items"],
                run: function () {
                    this._coordinates.length < 1 && this.$stage.removeAttr("style");
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function (e) {
                    (e.current = e.current ? this.$stage.children().index(e.current) : 0), (e.current = Math.max(this.minimum(), Math.min(this.maximum(), e.current))), this.reset(e.current);
                },
            },
            {
                filter: ["position"],
                run: function () {
                    this.animate(this.coordinates(this._current));
                },
            },
            {
                filter: ["width", "position", "items", "settings"],
                run: function () {
                    var e,
                        i,
                        s,
                        n,
                        o = this.settings.rtl ? 1 : -1,
                        r = 2 * this.settings.stagePadding,
                        a = this.coordinates(this.current()) + r,
                        l = a + this.width() * o,
                        h = [];
                    for (s = 0, n = this._coordinates.length; s < n; s++)
                        (e = this._coordinates[s - 1] || 0), (i = Math.abs(this._coordinates[s]) + r * o), ((this.op(e, "<=", a) && this.op(e, ">", l)) || (this.op(i, "<", a) && this.op(i, ">", l))) && h.push(s);
                    this.$stage.children(".active").removeClass("active"),
                        this.$stage.children(":eq(" + h.join("), :eq(") + ")").addClass("active"),
                        this.$stage.children(".center").removeClass("center"),
                        this.settings.center && this.$stage.children().eq(this.current()).addClass("center");
                },
            },
        ]),
        (o.prototype.initializeStage = function () {
            (this.$stage = this.$element.find("." + this.settings.stageClass)),
                this.$stage.length ||
                    (this.$element.addClass(this.options.loadingClass),
                    (this.$stage = e("<" + this.settings.stageElement + ">", { class: this.settings.stageClass }).wrap(e("<div/>", { class: this.settings.stageOuterClass }))),
                    this.$element.append(this.$stage.parent()));
        }),
        (o.prototype.initializeItems = function () {
            var i = this.$element.find(".owl-item");
            if (i.length)
                return (
                    (this._items = i.get().map(function (i) {
                        return e(i);
                    })),
                    (this._mergers = this._items.map(function () {
                        return 1;
                    })),
                    void this.refresh()
                );
            this.replace(this.$element.children().not(this.$stage.parent())), this.isVisible() ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass);
        }),
        (o.prototype.initialize = function () {
            if ((this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading"))) {
                var e, i, s;
                (e = this.$element.find("img")), (i = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : n), (s = this.$element.children(i).width()), e.length && s <= 0 && this.preloadAutoWidthImages(e);
            }
            this.initializeStage(), this.initializeItems(), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized");
        }),
        (o.prototype.isVisible = function () {
            return !this.settings.checkVisibility || this.$element.is(":visible");
        }),
        (o.prototype.setup = function () {
            var i = this.viewport(),
                s = this.options.responsive,
                n = -1,
                o = null;
            s
                ? (e.each(s, function (e) {
                      e <= i && e > n && (n = Number(e));
                  }),
                  "function" == typeof (o = e.extend({}, this.options, s[n])).stagePadding && (o.stagePadding = o.stagePadding()),
                  delete o.responsive,
                  o.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + n)))
                : (o = e.extend({}, this.options)),
                this.trigger("change", { property: { name: "settings", value: o } }),
                (this._breakpoint = n),
                (this.settings = o),
                this.invalidate("settings"),
                this.trigger("changed", { property: { name: "settings", value: this.settings } });
        }),
        (o.prototype.optionsLogic = function () {
            this.settings.autoWidth && ((this.settings.stagePadding = !1), (this.settings.merge = !1));
        }),
        (o.prototype.prepare = function (i) {
            var s = this.trigger("prepare", { content: i });
            return (
                s.data ||
                    (s.data = e("<" + this.settings.itemElement + "/>")
                        .addClass(this.options.itemClass)
                        .append(i)),
                this.trigger("prepared", { content: s.data }),
                s.data
            );
        }),
        (o.prototype.update = function () {
            for (
                var i = 0,
                    s = this._pipe.length,
                    n = e.proxy(function (e) {
                        return this[e];
                    }, this._invalidated),
                    o = {};
                i < s;

            )
                (this._invalidated.all || e.grep(this._pipe[i].filter, n).length > 0) && this._pipe[i].run(o), i++;
            (this._invalidated = {}), this.is("valid") || this.enter("valid");
        }),
        (o.prototype.width = function (e) {
            switch ((e = e || o.Width.Default)) {
                case o.Width.Inner:
                case o.Width.Outer:
                    return this._width;
                default:
                    return this._width - 2 * this.settings.stagePadding + this.settings.margin;
            }
        }),
        (o.prototype.refresh = function () {
            this.enter("refreshing"),
                this.trigger("refresh"),
                this.setup(),
                this.optionsLogic(),
                this.$element.addClass(this.options.refreshClass),
                this.update(),
                this.$element.removeClass(this.options.refreshClass),
                this.leave("refreshing"),
                this.trigger("refreshed");
        }),
        (o.prototype.onThrottledResize = function () {
            i.clearTimeout(this.resizeTimer), (this.resizeTimer = i.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate));
        }),
        (o.prototype.onResize = function () {
            return (
                !!this._items.length &&
                this._width !== this.$element.width() &&
                !!this.isVisible() &&
                (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))
            );
        }),
        (o.prototype.registerEventHandlers = function () {
            e.support.transition && this.$stage.on(e.support.transition.end + ".owl.core", e.proxy(this.onTransitionEnd, this)),
                !1 !== this.settings.responsive && this.on(i, "resize", this._handlers.onThrottledResize),
                this.settings.mouseDrag &&
                    (this.$element.addClass(this.options.dragClass),
                    this.$stage.on("mousedown.owl.core", e.proxy(this.onDragStart, this)),
                    this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
                        return !1;
                    })),
                this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", e.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", e.proxy(this.onDragEnd, this)));
        }),
        (o.prototype.onDragStart = function (i) {
            var n = null;
            3 !== i.which &&
                (e.support.transform
                    ? (n = {
                          x: (n = this.$stage
                              .css("transform")
                              .replace(/.*\(|\)| /g, "")
                              .split(","))[16 === n.length ? 12 : 4],
                          y: n[16 === n.length ? 13 : 5],
                      })
                    : ((n = this.$stage.position()), (n = { x: this.settings.rtl ? n.left + this.$stage.width() - this.width() + this.settings.margin : n.left, y: n.top })),
                this.is("animating") && (e.support.transform ? this.animate(n.x) : this.$stage.stop(), this.invalidate("position")),
                this.$element.toggleClass(this.options.grabClass, "mousedown" === i.type),
                this.speed(0),
                (this._drag.time = new Date().getTime()),
                (this._drag.target = e(i.target)),
                (this._drag.stage.start = n),
                (this._drag.stage.current = n),
                (this._drag.pointer = this.pointer(i)),
                e(s).on("mouseup.owl.core touchend.owl.core", e.proxy(this.onDragEnd, this)),
                e(s).one(
                    "mousemove.owl.core touchmove.owl.core",
                    e.proxy(function (i) {
                        var n = this.difference(this._drag.pointer, this.pointer(i));
                        e(s).on("mousemove.owl.core touchmove.owl.core", e.proxy(this.onDragMove, this)), (Math.abs(n.x) < Math.abs(n.y) && this.is("valid")) || (i.preventDefault(), this.enter("dragging"), this.trigger("drag"));
                    }, this)
                ));
        }),
        (o.prototype.onDragMove = function (e) {
            var i = null,
                s = null,
                n = null,
                o = this.difference(this._drag.pointer, this.pointer(e)),
                r = this.difference(this._drag.stage.start, o);
            this.is("dragging") &&
                (e.preventDefault(),
                this.settings.loop
                    ? ((i = this.coordinates(this.minimum())), (s = this.coordinates(this.maximum() + 1) - i), (r.x = ((((r.x - i) % s) + s) % s) + i))
                    : ((i = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum())),
                      (s = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum())),
                      (n = this.settings.pullDrag ? (-1 * o.x) / 5 : 0),
                      (r.x = Math.max(Math.min(r.x, i + n), s + n))),
                (this._drag.stage.current = r),
                this.animate(r.x));
        }),
        (o.prototype.onDragEnd = function (i) {
            var n = this.difference(this._drag.pointer, this.pointer(i)),
                o = this._drag.stage.current,
                r = (n.x > 0) ^ this.settings.rtl ? "left" : "right";
            e(s).off(".owl.core"),
                this.$element.removeClass(this.options.grabClass),
                ((0 !== n.x && this.is("dragging")) || !this.is("valid")) &&
                    (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
                    this.current(this.closest(o.x, 0 !== n.x ? r : this._drag.direction)),
                    this.invalidate("position"),
                    this.update(),
                    (this._drag.direction = r),
                    (Math.abs(n.x) > 3 || new Date().getTime() - this._drag.time > 300) &&
                        this._drag.target.one("click.owl.core", function () {
                            return !1;
                        })),
                this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"));
        }),
        (o.prototype.closest = function (i, s) {
            var o = -1,
                r = this.width(),
                a = this.coordinates();
            return (
                this.settings.freeDrag ||
                    e.each(
                        a,
                        e.proxy(function (e, l) {
                            return (
                                "left" === s && i > l - 30 && i < l + 30
                                    ? (o = e)
                                    : "right" === s && i > l - r - 30 && i < l - r + 30
                                    ? (o = e + 1)
                                    : this.op(i, "<", l) && this.op(i, ">", a[e + 1] !== n ? a[e + 1] : l - r) && (o = "left" === s ? e + 1 : e),
                                -1 === o
                            );
                        }, this)
                    ),
                this.settings.loop || (this.op(i, ">", a[this.minimum()]) ? (o = i = this.minimum()) : this.op(i, "<", a[this.maximum()]) && (o = i = this.maximum())),
                o
            );
        }),
        (o.prototype.animate = function (i) {
            var s = this.speed() > 0;
            this.is("animating") && this.onTransitionEnd(),
                s && (this.enter("animating"), this.trigger("translate")),
                e.support.transform3d && e.support.transition
                    ? this.$stage.css({ transform: "translate3d(" + i + "px,0px,0px)", transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "") })
                    : s
                    ? this.$stage.animate({ left: i + "px" }, this.speed(), this.settings.fallbackEasing, e.proxy(this.onTransitionEnd, this))
                    : this.$stage.css({ left: i + "px" });
        }),
        (o.prototype.is = function (e) {
            return this._states.current[e] && this._states.current[e] > 0;
        }),
        (o.prototype.current = function (e) {
            if (e === n) return this._current;
            if (0 === this._items.length) return n;
            if (((e = this.normalize(e)), this._current !== e)) {
                var i = this.trigger("change", { property: { name: "position", value: e } });
                i.data !== n && (e = this.normalize(i.data)), (this._current = e), this.invalidate("position"), this.trigger("changed", { property: { name: "position", value: this._current } });
            }
            return this._current;
        }),
        (o.prototype.invalidate = function (i) {
            return (
                "string" === e.type(i) && ((this._invalidated[i] = !0), this.is("valid") && this.leave("valid")),
                e.map(this._invalidated, function (e, i) {
                    return i;
                })
            );
        }),
        (o.prototype.reset = function (e) {
            (e = this.normalize(e)) !== n && ((this._speed = 0), (this._current = e), this.suppress(["translate", "translated"]), this.animate(this.coordinates(e)), this.release(["translate", "translated"]));
        }),
        (o.prototype.normalize = function (e, i) {
            var s = this._items.length,
                o = i ? 0 : this._clones.length;
            return !this.isNumeric(e) || s < 1 ? (e = n) : (e < 0 || e >= s + o) && (e = ((((e - o / 2) % s) + s) % s) + o / 2), e;
        }),
        (o.prototype.relative = function (e) {
            return (e -= this._clones.length / 2), this.normalize(e, !0);
        }),
        (o.prototype.maximum = function (e) {
            var i,
                s,
                n,
                o = this.settings,
                r = this._coordinates.length;
            if (o.loop) r = this._clones.length / 2 + this._items.length - 1;
            else if (o.autoWidth || o.merge) {
                if ((i = this._items.length)) for (s = this._items[--i].width(), n = this.$element.width(); i-- && !((s += this._items[i].width() + this.settings.margin) > n); );
                r = i + 1;
            } else r = o.center ? this._items.length - 1 : this._items.length - o.items;
            return e && (r -= this._clones.length / 2), Math.max(r, 0);
        }),
        (o.prototype.minimum = function (e) {
            return e ? 0 : this._clones.length / 2;
        }),
        (o.prototype.items = function (e) {
            return e === n ? this._items.slice() : ((e = this.normalize(e, !0)), this._items[e]);
        }),
        (o.prototype.mergers = function (e) {
            return e === n ? this._mergers.slice() : ((e = this.normalize(e, !0)), this._mergers[e]);
        }),
        (o.prototype.clones = function (i) {
            var s = this._clones.length / 2,
                o = s + this._items.length,
                r = function (e) {
                    return e % 2 == 0 ? o + e / 2 : s - (e + 1) / 2;
                };
            return i === n
                ? e.map(this._clones, function (e, i) {
                      return r(i);
                  })
                : e.map(this._clones, function (e, s) {
                      return e === i ? r(s) : null;
                  });
        }),
        (o.prototype.speed = function (e) {
            return e !== n && (this._speed = e), this._speed;
        }),
        (o.prototype.coordinates = function (i) {
            var s,
                o = 1,
                r = i - 1;
            return i === n
                ? e.map(
                      this._coordinates,
                      e.proxy(function (e, i) {
                          return this.coordinates(i);
                      }, this)
                  )
                : (this.settings.center ? (this.settings.rtl && ((o = -1), (r = i + 1)), (s = this._coordinates[i]), (s += ((this.width() - s + (this._coordinates[r] || 0)) / 2) * o)) : (s = this._coordinates[r] || 0), (s = Math.ceil(s)));
        }),
        (o.prototype.duration = function (e, i, s) {
            return 0 === s ? 0 : Math.min(Math.max(Math.abs(i - e), 1), 6) * Math.abs(s || this.settings.smartSpeed);
        }),
        (o.prototype.to = function (e, i) {
            var s = this.current(),
                n = null,
                o = e - this.relative(s),
                r = (o > 0) - (o < 0),
                a = this._items.length,
                l = this.minimum(),
                h = this.maximum();
            this.settings.loop
                ? (!this.settings.rewind && Math.abs(o) > a / 2 && (o += -1 * r * a), (n = (((((e = s + o) - l) % a) + a) % a) + l) !== e && n - o <= h && n - o > 0 && ((s = n - o), (e = n), this.reset(s)))
                : this.settings.rewind
                ? ((h += 1), (e = ((e % h) + h) % h))
                : (e = Math.max(l, Math.min(h, e))),
                this.speed(this.duration(s, e, i)),
                this.current(e),
                this.isVisible() && this.update();
        }),
        (o.prototype.next = function (e) {
            (e = e || !1), this.to(this.relative(this.current()) + 1, e);
        }),
        (o.prototype.prev = function (e) {
            (e = e || !1), this.to(this.relative(this.current()) - 1, e);
        }),
        (o.prototype.onTransitionEnd = function (e) {
            if (e !== n && (e.stopPropagation(), (e.target || e.srcElement || e.originalTarget) !== this.$stage.get(0))) return !1;
            this.leave("animating"), this.trigger("translated");
        }),
        (o.prototype.viewport = function () {
            var n;
            return (
                this.options.responsiveBaseElement !== i
                    ? (n = e(this.options.responsiveBaseElement).width())
                    : i.innerWidth
                    ? (n = i.innerWidth)
                    : s.documentElement && s.documentElement.clientWidth
                    ? (n = s.documentElement.clientWidth)
                    : console.warn("Can not detect viewport width."),
                n
            );
        }),
        (o.prototype.replace = function (i) {
            this.$stage.empty(),
                (this._items = []),
                i && (i = i instanceof jQuery ? i : e(i)),
                this.settings.nestedItemSelector && (i = i.find("." + this.settings.nestedItemSelector)),
                i
                    .filter(function () {
                        return 1 === this.nodeType;
                    })
                    .each(
                        e.proxy(function (e, i) {
                            (i = this.prepare(i)), this.$stage.append(i), this._items.push(i), this._mergers.push(1 * i.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1);
                        }, this)
                    ),
                this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0),
                this.invalidate("items");
        }),
        (o.prototype.add = function (i, s) {
            var o = this.relative(this._current);
            (s = s === n ? this._items.length : this.normalize(s, !0)),
                (i = i instanceof jQuery ? i : e(i)),
                this.trigger("add", { content: i, position: s }),
                (i = this.prepare(i)),
                0 === this._items.length || s === this._items.length
                    ? (0 === this._items.length && this.$stage.append(i),
                      0 !== this._items.length && this._items[s - 1].after(i),
                      this._items.push(i),
                      this._mergers.push(1 * i.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1))
                    : (this._items[s].before(i), this._items.splice(s, 0, i), this._mergers.splice(s, 0, 1 * i.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)),
                this._items[o] && this.reset(this._items[o].index()),
                this.invalidate("items"),
                this.trigger("added", { content: i, position: s });
        }),
        (o.prototype.remove = function (e) {
            (e = this.normalize(e, !0)) !== n &&
                (this.trigger("remove", { content: this._items[e], position: e }),
                this._items[e].remove(),
                this._items.splice(e, 1),
                this._mergers.splice(e, 1),
                this.invalidate("items"),
                this.trigger("removed", { content: null, position: e }));
        }),
        (o.prototype.preloadAutoWidthImages = function (i) {
            i.each(
                e.proxy(function (i, s) {
                    this.enter("pre-loading"),
                        (s = e(s)),
                        e(new Image())
                            .one(
                                "load",
                                e.proxy(function (e) {
                                    s.attr("src", e.target.src), s.css("opacity", 1), this.leave("pre-loading"), this.is("pre-loading") || this.is("initializing") || this.refresh();
                                }, this)
                            )
                            .attr("src", s.attr("src") || s.attr("data-src") || s.attr("data-src-retina"));
                }, this)
            );
        }),
        (o.prototype.destroy = function () {
            for (var n in (this.$element.off(".owl.core"),
            this.$stage.off(".owl.core"),
            e(s).off(".owl.core"),
            !1 !== this.settings.responsive && (i.clearTimeout(this.resizeTimer), this.off(i, "resize", this._handlers.onThrottledResize)),
            this._plugins))
                this._plugins[n].destroy();
            this.$stage.children(".cloned").remove(),
                this.$stage.unwrap(),
                this.$stage.children().contents().unwrap(),
                this.$stage.children().unwrap(),
                this.$stage.remove(),
                this.$element
                    .removeClass(this.options.refreshClass)
                    .removeClass(this.options.loadingClass)
                    .removeClass(this.options.loadedClass)
                    .removeClass(this.options.rtlClass)
                    .removeClass(this.options.dragClass)
                    .removeClass(this.options.grabClass)
                    .attr("class", this.$element.attr("class").replace(RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), ""))
                    .removeData("owl.carousel");
        }),
        (o.prototype.op = function (e, i, s) {
            var n = this.settings.rtl;
            switch (i) {
                case "<":
                    return n ? e > s : e < s;
                case ">":
                    return n ? e < s : e > s;
                case ">=":
                    return n ? e <= s : e >= s;
                case "<=":
                    return n ? e >= s : e <= s;
            }
        }),
        (o.prototype.on = function (e, i, s, n) {
            e.addEventListener ? e.addEventListener(i, s, n) : e.attachEvent && e.attachEvent("on" + i, s);
        }),
        (o.prototype.off = function (e, i, s, n) {
            e.removeEventListener ? e.removeEventListener(i, s, n) : e.detachEvent && e.detachEvent("on" + i, s);
        }),
        (o.prototype.trigger = function (i, s, n, r, a) {
            var l = { item: { count: this._items.length, index: this.current() } },
                h = e.camelCase(
                    e
                        .grep(["on", i, n], function (e) {
                            return e;
                        })
                        .join("-")
                        .toLowerCase()
                ),
                c = e.Event([i, "owl", n || "carousel"].join(".").toLowerCase(), e.extend({ relatedTarget: this }, l, s));
            return (
                this._supress[i] ||
                    (e.each(this._plugins, function (e, i) {
                        i.onTrigger && i.onTrigger(c);
                    }),
                    this.register({ type: o.Type.Event, name: i }),
                    this.$element.trigger(c),
                    this.settings && "function" == typeof this.settings[h] && this.settings[h].call(this, c)),
                c
            );
        }),
        (o.prototype.enter = function (i) {
            e.each(
                [i].concat(this._states.tags[i] || []),
                e.proxy(function (e, i) {
                    this._states.current[i] === n && (this._states.current[i] = 0), this._states.current[i]++;
                }, this)
            );
        }),
        (o.prototype.leave = function (i) {
            e.each(
                [i].concat(this._states.tags[i] || []),
                e.proxy(function (e, i) {
                    this._states.current[i]--;
                }, this)
            );
        }),
        (o.prototype.register = function (i) {
            if (i.type === o.Type.Event) {
                if ((e.event.special[i.name] || (e.event.special[i.name] = {}), !e.event.special[i.name].owl)) {
                    var s = e.event.special[i.name]._default;
                    (e.event.special[i.name]._default = function (e) {
                        return s && s.apply && (!e.namespace || -1 === e.namespace.indexOf("owl")) ? s.apply(this, arguments) : e.namespace && e.namespace.indexOf("owl") > -1;
                    }),
                        (e.event.special[i.name].owl = !0);
                }
            } else
                i.type === o.Type.State &&
                    (this._states.tags[i.name] ? (this._states.tags[i.name] = this._states.tags[i.name].concat(i.tags)) : (this._states.tags[i.name] = i.tags),
                    (this._states.tags[i.name] = e.grep(
                        this._states.tags[i.name],
                        e.proxy(function (s, n) {
                            return e.inArray(s, this._states.tags[i.name]) === n;
                        }, this)
                    )));
        }),
        (o.prototype.suppress = function (i) {
            e.each(
                i,
                e.proxy(function (e, i) {
                    this._supress[i] = !0;
                }, this)
            );
        }),
        (o.prototype.release = function (i) {
            e.each(
                i,
                e.proxy(function (e, i) {
                    delete this._supress[i];
                }, this)
            );
        }),
        (o.prototype.pointer = function (e) {
            var s = { x: null, y: null };
            return (
                (e = (e = e.originalEvent || e || i.event).touches && e.touches.length ? e.touches[0] : e.changedTouches && e.changedTouches.length ? e.changedTouches[0] : e).pageX
                    ? ((s.x = e.pageX), (s.y = e.pageY))
                    : ((s.x = e.clientX), (s.y = e.clientY)),
                s
            );
        }),
        (o.prototype.isNumeric = function (e) {
            return !isNaN(parseFloat(e));
        }),
        (o.prototype.difference = function (e, i) {
            return { x: e.x - i.x, y: e.y - i.y };
        }),
        (e.fn.owlCarousel = function (i) {
            var s = Array.prototype.slice.call(arguments, 1);
            return this.each(function () {
                var n = e(this),
                    r = n.data("owl.carousel");
                r ||
                    ((r = new o(this, "object" == typeof i && i)),
                    n.data("owl.carousel", r),
                    e.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (i, s) {
                        r.register({ type: o.Type.Event, name: s }),
                            r.$element.on(
                                s + ".owl.carousel.core",
                                e.proxy(function (e) {
                                    e.namespace && e.relatedTarget !== this && (this.suppress([s]), r[s].apply(this, [].slice.call(arguments, 1)), this.release([s]));
                                }, r)
                            );
                    })),
                    "string" == typeof i && "_" !== i.charAt(0) && r[i].apply(r, s);
            });
        }),
        (e.fn.owlCarousel.Constructor = o);
})(window.Zepto || window.jQuery, window, document),
    (function (e, i, s, n) {
        var o = function (i) {
            (this._core = i),
                (this._interval = null),
                (this._visible = null),
                (this._handlers = {
                    "initialized.owl.carousel": e.proxy(function (e) {
                        e.namespace && this._core.settings.autoRefresh && this.watch();
                    }, this),
                }),
                (this._core.options = e.extend({}, o.Defaults, this._core.options)),
                this._core.$element.on(this._handlers);
        };
        (o.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }),
            (o.prototype.watch = function () {
                this._interval || ((this._visible = this._core.isVisible()), (this._interval = i.setInterval(e.proxy(this.refresh, this), this._core.settings.autoRefreshInterval)));
            }),
            (o.prototype.refresh = function () {
                this._core.isVisible() !== this._visible && ((this._visible = !this._visible), this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh());
            }),
            (o.prototype.destroy = function () {
                var e, s;
                for (e in (i.clearInterval(this._interval), this._handlers)) this._core.$element.off(e, this._handlers[e]);
                for (s in Object.getOwnPropertyNames(this)) "function" != typeof this[s] && (this[s] = null);
            }),
            (e.fn.owlCarousel.Constructor.Plugins.AutoRefresh = o);
    })(window.Zepto || window.jQuery, window, document),
    (function (e, i, s, n) {
        var o = function (i) {
            (this._core = i),
                (this._loaded = []),
                (this._handlers = {
                    "initialized.owl.carousel change.owl.carousel resized.owl.carousel": e.proxy(function (i) {
                        if (i.namespace && this._core.settings && this._core.settings.lazyLoad && ((i.property && "position" == i.property.name) || "initialized" == i.type)) {
                            var s = this._core.settings,
                                n = (s.center && Math.ceil(s.items / 2)) || s.items,
                                o = (s.center && -1 * n) || 0,
                                r = (i.property && void 0 !== i.property.value ? i.property.value : this._core.current()) + o,
                                a = this._core.clones().length,
                                l = e.proxy(function (e, i) {
                                    this.load(i);
                                }, this);
                            for (s.lazyLoadEager > 0 && ((n += s.lazyLoadEager), s.loop && ((r -= s.lazyLoadEager), n++)); o++ < n; ) this.load(a / 2 + this._core.relative(r)), a && e.each(this._core.clones(this._core.relative(r)), l), r++;
                        }
                    }, this),
                }),
                (this._core.options = e.extend({}, o.Defaults, this._core.options)),
                this._core.$element.on(this._handlers);
        };
        (o.Defaults = { lazyLoad: !1, lazyLoadEager: 0 }),
            (o.prototype.load = function (s) {
                var n = this._core.$stage.children().eq(s),
                    o = n && n.find(".owl-lazy");
                !o ||
                    e.inArray(n.get(0), this._loaded) > -1 ||
                    (o.each(
                        e.proxy(function (s, n) {
                            var o,
                                r = e(n),
                                a = (i.devicePixelRatio > 1 && r.attr("data-src-retina")) || r.attr("data-src") || r.attr("data-srcset");
                            this._core.trigger("load", { element: r, url: a }, "lazy"),
                                r.is("img")
                                    ? r
                                          .one(
                                              "load.owl.lazy",
                                              e.proxy(function () {
                                                  r.css("opacity", 1), this._core.trigger("loaded", { element: r, url: a }, "lazy");
                                              }, this)
                                          )
                                          .attr("src", a)
                                    : r.is("source")
                                    ? r
                                          .one(
                                              "load.owl.lazy",
                                              e.proxy(function () {
                                                  this._core.trigger("loaded", { element: r, url: a }, "lazy");
                                              }, this)
                                          )
                                          .attr("srcset", a)
                                    : (((o = new Image()).onload = e.proxy(function () {
                                          r.css({ "background-image": 'url("' + a + '")', opacity: "1" }), this._core.trigger("loaded", { element: r, url: a }, "lazy");
                                      }, this)),
                                      (o.src = a));
                        }, this)
                    ),
                    this._loaded.push(n.get(0)));
            }),
            (o.prototype.destroy = function () {
                var e, i;
                for (e in this.handlers) this._core.$element.off(e, this.handlers[e]);
                for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null);
            }),
            (e.fn.owlCarousel.Constructor.Plugins.Lazy = o);
    })(window.Zepto || window.jQuery, window, document),
    (function (e, i, s, n) {
        var o = function (s) {
            (this._core = s),
                (this._previousHeight = null),
                (this._handlers = {
                    "initialized.owl.carousel refreshed.owl.carousel": e.proxy(function (e) {
                        e.namespace && this._core.settings.autoHeight && this.update();
                    }, this),
                    "changed.owl.carousel": e.proxy(function (e) {
                        e.namespace && this._core.settings.autoHeight && "position" === e.property.name && this.update();
                    }, this),
                    "loaded.owl.lazy": e.proxy(function (e) {
                        e.namespace && this._core.settings.autoHeight && e.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update();
                    }, this),
                }),
                (this._core.options = e.extend({}, o.Defaults, this._core.options)),
                this._core.$element.on(this._handlers),
                (this._intervalId = null);
            var n = this;
            e(i).on("load", function () {
                n._core.settings.autoHeight && n.update();
            }),
                e(i).resize(function () {
                    n._core.settings.autoHeight &&
                        (null != n._intervalId && clearTimeout(n._intervalId),
                        (n._intervalId = setTimeout(function () {
                            n.update();
                        }, 250)));
                });
        };
        (o.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
            (o.prototype.update = function () {
                var i = this._core._current,
                    s = i + this._core.settings.items,
                    n = this._core.settings.lazyLoad,
                    o = this._core.$stage.children().toArray().slice(i, s),
                    r = [],
                    a = 0;
                e.each(o, function (i, s) {
                    r.push(e(s).height());
                }),
                    (a = Math.max.apply(null, r)) <= 1 && n && this._previousHeight && (a = this._previousHeight),
                    (this._previousHeight = a),
                    this._core.$stage.parent().height(a).addClass(this._core.settings.autoHeightClass);
            }),
            (o.prototype.destroy = function () {
                var e, i;
                for (e in this._handlers) this._core.$element.off(e, this._handlers[e]);
                for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null);
            }),
            (e.fn.owlCarousel.Constructor.Plugins.AutoHeight = o);
    })(window.Zepto || window.jQuery, window, document),
    (function (e, i, s, n) {
        var o = function (i) {
            (this._core = i),
                (this._videos = {}),
                (this._playing = null),
                (this._handlers = {
                    "initialized.owl.carousel": e.proxy(function (e) {
                        e.namespace && this._core.register({ type: "state", name: "playing", tags: ["interacting"] });
                    }, this),
                    "resize.owl.carousel": e.proxy(function (e) {
                        e.namespace && this._core.settings.video && this.isInFullScreen() && e.preventDefault();
                    }, this),
                    "refreshed.owl.carousel": e.proxy(function (e) {
                        e.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove();
                    }, this),
                    "changed.owl.carousel": e.proxy(function (e) {
                        e.namespace && "position" === e.property.name && this._playing && this.stop();
                    }, this),
                    "prepared.owl.carousel": e.proxy(function (i) {
                        if (i.namespace) {
                            var s = e(i.content).find(".owl-video");
                            s.length && (s.css("display", "none"), this.fetch(s, e(i.content)));
                        }
                    }, this),
                }),
                (this._core.options = e.extend({}, o.Defaults, this._core.options)),
                this._core.$element.on(this._handlers),
                this._core.$element.on(
                    "click.owl.video",
                    ".owl-video-play-icon",
                    e.proxy(function (e) {
                        this.play(e);
                    }, this)
                );
        };
        (o.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
            (o.prototype.fetch = function (e, i) {
                var s = e.attr("data-vimeo-id") ? "vimeo" : e.attr("data-vzaar-id") ? "vzaar" : "youtube",
                    n = e.attr("data-vimeo-id") || e.attr("data-youtube-id") || e.attr("data-vzaar-id"),
                    o = e.attr("data-width") || this._core.settings.videoWidth,
                    r = e.attr("data-height") || this._core.settings.videoHeight,
                    a = e.attr("href");
                if (!a) throw Error("Missing video URL.");
                if (
                    (n = a.match(
                        /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
                    ))[3].indexOf("youtu") > -1
                )
                    s = "youtube";
                else if (n[3].indexOf("vimeo") > -1) s = "vimeo";
                else {
                    if (!(n[3].indexOf("vzaar") > -1)) throw Error("Video URL not supported.");
                    s = "vzaar";
                }
                (n = n[6]), (this._videos[a] = { type: s, id: n, width: o, height: r }), i.attr("data-video", a), this.thumbnail(e, this._videos[a]);
            }),
            (o.prototype.thumbnail = function (i, s) {
                var n,
                    o,
                    r,
                    a = s.width && s.height ? "width:" + s.width + "px;height:" + s.height + "px;" : "",
                    l = i.find("img"),
                    h = "src",
                    c = "",
                    u = this._core.settings,
                    d = function (s) {
                        (o = '<div class="owl-video-play-icon"></div>'),
                            (n = u.lazyLoad ? e("<div/>", { class: "owl-video-tn " + c, srcType: s }) : e("<div/>", { class: "owl-video-tn", style: "opacity:1;background-image:url(" + s + ")" })),
                            i.after(n),
                            i.after(o);
                    };
                if ((i.wrap(e("<div/>", { class: "owl-video-wrapper", style: a })), this._core.settings.lazyLoad && ((h = "data-src"), (c = "owl-lazy")), l.length)) return d(l.attr(h)), l.remove(), !1;
                "youtube" === s.type
                    ? d((r = "//img.youtube.com/vi/" + s.id + "/hqdefault.jpg"))
                    : "vimeo" === s.type
                    ? e.ajax({
                          type: "GET",
                          url: "//vimeo.com/api/v2/video/" + s.id + ".json",
                          jsonp: "callback",
                          dataType: "jsonp",
                          success: function (e) {
                              d((r = e[0].thumbnail_large));
                          },
                      })
                    : "vzaar" === s.type &&
                      e.ajax({
                          type: "GET",
                          url: "//vzaar.com/api/videos/" + s.id + ".json",
                          jsonp: "callback",
                          dataType: "jsonp",
                          success: function (e) {
                              d((r = e.framegrab_url));
                          },
                      });
            }),
            (o.prototype.stop = function () {
                this._core.trigger("stop", null, "video"),
                    this._playing.find(".owl-video-frame").remove(),
                    this._playing.removeClass("owl-video-playing"),
                    (this._playing = null),
                    this._core.leave("playing"),
                    this._core.trigger("stopped", null, "video");
            }),
            (o.prototype.play = function (i) {
                var s,
                    n = e(i.target).closest("." + this._core.settings.itemClass),
                    o = this._videos[n.attr("data-video")],
                    r = o.width || "100%",
                    a = o.height || this._core.$stage.height();
                this._playing ||
                    (this._core.enter("playing"),
                    this._core.trigger("play", null, "video"),
                    (n = this._core.items(this._core.relative(n.index()))),
                    this._core.reset(n.index()),
                    (s = e('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>')).attr("height", a),
                    s.attr("width", r),
                    "youtube" === o.type
                        ? s.attr("src", "//www.youtube.com/embed/" + o.id + "?autoplay=1&rel=0&v=" + o.id)
                        : "vimeo" === o.type
                        ? s.attr("src", "//player.vimeo.com/video/" + o.id + "?autoplay=1")
                        : "vzaar" === o.type && s.attr("src", "//view.vzaar.com/" + o.id + "/player?autoplay=true"),
                    e(s).wrap('<div class="owl-video-frame" />').insertAfter(n.find(".owl-video")),
                    (this._playing = n.addClass("owl-video-playing")));
            }),
            (o.prototype.isInFullScreen = function () {
                var i = s.fullscreenElement || s.mozFullScreenElement || s.webkitFullscreenElement;
                return i && e(i).parent().hasClass("owl-video-frame");
            }),
            (o.prototype.destroy = function () {
                var e, i;
                for (e in (this._core.$element.off("click.owl.video"), this._handlers)) this._core.$element.off(e, this._handlers[e]);
                for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null);
            }),
            (e.fn.owlCarousel.Constructor.Plugins.Video = o);
    })(window.Zepto || window.jQuery, window, document),
    (function (e, i, s, n) {
        var o = function (i) {
            (this.core = i),
                (this.core.options = e.extend({}, o.Defaults, this.core.options)),
                (this.swapping = !0),
                (this.previous = n),
                (this.next = n),
                (this.handlers = {
                    "change.owl.carousel": e.proxy(function (e) {
                        e.namespace && "position" == e.property.name && ((this.previous = this.core.current()), (this.next = e.property.value));
                    }, this),
                    "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": e.proxy(function (e) {
                        e.namespace && (this.swapping = "translated" == e.type);
                    }, this),
                    "translate.owl.carousel": e.proxy(function (e) {
                        e.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap();
                    }, this),
                }),
                this.core.$element.on(this.handlers);
        };
        (o.Defaults = { animateOut: !1, animateIn: !1 }),
            (o.prototype.swap = function () {
                if (1 === this.core.settings.items && e.support.animation && e.support.transition) {
                    this.core.speed(0);
                    var i,
                        s = e.proxy(this.clear, this),
                        n = this.core.$stage.children().eq(this.previous),
                        o = this.core.$stage.children().eq(this.next),
                        r = this.core.settings.animateIn,
                        a = this.core.settings.animateOut;
                    this.core.current() !== this.previous &&
                        (a &&
                            ((i = this.core.coordinates(this.previous) - this.core.coordinates(this.next)),
                            n
                                .one(e.support.animation.end, s)
                                .css({ left: i + "px" })
                                .addClass("animated owl-animated-out")
                                .addClass(a)),
                        r && o.one(e.support.animation.end, s).addClass("animated owl-animated-in").addClass(r));
                }
            }),
            (o.prototype.clear = function (i) {
                e(i.target).css({ left: "" }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd();
            }),
            (o.prototype.destroy = function () {
                var e, i;
                for (e in this.handlers) this.core.$element.off(e, this.handlers[e]);
                for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null);
            }),
            (e.fn.owlCarousel.Constructor.Plugins.Animate = o);
    })(window.Zepto || window.jQuery, window, document),
    (function (e, i, s, n) {
        var o = function (i) {
            (this._core = i),
                (this._call = null),
                (this._time = 0),
                (this._timeout = 0),
                (this._paused = !0),
                (this._handlers = {
                    "changed.owl.carousel": e.proxy(function (e) {
                        e.namespace && "settings" === e.property.name ? (this._core.settings.autoplay ? this.play() : this.stop()) : e.namespace && "position" === e.property.name && this._paused && (this._time = 0);
                    }, this),
                    "initialized.owl.carousel": e.proxy(function (e) {
                        e.namespace && this._core.settings.autoplay && this.play();
                    }, this),
                    "play.owl.autoplay": e.proxy(function (e, i, s) {
                        e.namespace && this.play(i, s);
                    }, this),
                    "stop.owl.autoplay": e.proxy(function (e) {
                        e.namespace && this.stop();
                    }, this),
                    "mouseover.owl.autoplay": e.proxy(function () {
                        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
                    }, this),
                    "mouseleave.owl.autoplay": e.proxy(function () {
                        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play();
                    }, this),
                    "touchstart.owl.core": e.proxy(function () {
                        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
                    }, this),
                    "touchend.owl.core": e.proxy(function () {
                        this._core.settings.autoplayHoverPause && this.play();
                    }, this),
                }),
                this._core.$element.on(this._handlers),
                (this._core.options = e.extend({}, o.Defaults, this._core.options));
        };
        (o.Defaults = { autoplay: !1, autoplayTimeout: 5e3, autoplayHoverPause: !1, autoplaySpeed: !1 }),
            (o.prototype._next = function (n) {
                (this._call = i.setTimeout(e.proxy(this._next, this, n), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read())),
                    this._core.is("interacting") || s.hidden || this._core.next(n || this._core.settings.autoplaySpeed);
            }),
            (o.prototype.read = function () {
                return new Date().getTime() - this._time;
            }),
            (o.prototype.play = function (s, n) {
                var o;
                this._core.is("rotating") || this._core.enter("rotating"),
                    (s = s || this._core.settings.autoplayTimeout),
                    (o = Math.min(this._time % (this._timeout || s), s)),
                    this._paused ? ((this._time = this.read()), (this._paused = !1)) : i.clearTimeout(this._call),
                    (this._time += (this.read() % s) - o),
                    (this._timeout = s),
                    (this._call = i.setTimeout(e.proxy(this._next, this, n), s - o));
            }),
            (o.prototype.stop = function () {
                this._core.is("rotating") && ((this._time = 0), (this._paused = !0), i.clearTimeout(this._call), this._core.leave("rotating"));
            }),
            (o.prototype.pause = function () {
                this._core.is("rotating") && !this._paused && ((this._time = this.read()), (this._paused = !0), i.clearTimeout(this._call));
            }),
            (o.prototype.destroy = function () {
                var e, i;
                for (e in (this.stop(), this._handlers)) this._core.$element.off(e, this._handlers[e]);
                for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null);
            }),
            (e.fn.owlCarousel.Constructor.Plugins.autoplay = o);
    })(window.Zepto || window.jQuery, window, document),
    (function (e, i, s, n) {
        "use strict";
        var o = function (i) {
            (this._core = i),
                (this._initialized = !1),
                (this._pages = []),
                (this._controls = {}),
                (this._templates = []),
                (this.$element = this._core.$element),
                (this._overrides = { next: this._core.next, prev: this._core.prev, to: this._core.to }),
                (this._handlers = {
                    "prepared.owl.carousel": e.proxy(function (i) {
                        i.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + e(i.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>");
                    }, this),
                    "added.owl.carousel": e.proxy(function (e) {
                        e.namespace && this._core.settings.dotsData && this._templates.splice(e.position, 0, this._templates.pop());
                    }, this),
                    "remove.owl.carousel": e.proxy(function (e) {
                        e.namespace && this._core.settings.dotsData && this._templates.splice(e.position, 1);
                    }, this),
                    "changed.owl.carousel": e.proxy(function (e) {
                        e.namespace && "position" == e.property.name && this.draw();
                    }, this),
                    "initialized.owl.carousel": e.proxy(function (e) {
                        e.namespace &&
                            !this._initialized &&
                            (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), (this._initialized = !0), this._core.trigger("initialized", null, "navigation"));
                    }, this),
                    "refreshed.owl.carousel": e.proxy(function (e) {
                        e.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"));
                    }, this),
                }),
                (this._core.options = e.extend({}, o.Defaults, this._core.options)),
                this.$element.on(this._handlers);
        };
        (o.Defaults = {
            nav: !1,
            navText: ['<span aria-label="Previous">&#x2039;</span>', '<span aria-label="Next">&#x203a;</span>'],
            navSpeed: !1,
            navElement: 'button type="button" role="presentation"',
            navContainer: !1,
            navContainerClass: "owl-nav",
            navClass: ["owl-prev", "owl-next"],
            slideBy: 1,
            dotClass: "owl-dot",
            dotsClass: "owl-dots",
            dots: !0,
            dotsEach: !1,
            dotsData: !1,
            dotsSpeed: !1,
            dotsContainer: !1,
        }),
            (o.prototype.initialize = function () {
                var i,
                    s = this._core.settings;
                for (i in ((this._controls.$relative = (s.navContainer ? e(s.navContainer) : e("<div>").addClass(s.navContainerClass).appendTo(this.$element)).addClass("disabled")),
                (this._controls.$previous = e("<" + s.navElement + ">")
                    .addClass(s.navClass[0])
                    .html(s.navText[0])
                    .prependTo(this._controls.$relative)
                    .on(
                        "click",
                        e.proxy(function (e) {
                            this.prev(s.navSpeed);
                        }, this)
                    )),
                (this._controls.$next = e("<" + s.navElement + ">")
                    .addClass(s.navClass[1])
                    .html(s.navText[1])
                    .appendTo(this._controls.$relative)
                    .on(
                        "click",
                        e.proxy(function (e) {
                            this.next(s.navSpeed);
                        }, this)
                    )),
                s.dotsData || (this._templates = [e('<button role="button">').addClass(s.dotClass).append(e("<span>")).prop("outerHTML")]),
                (this._controls.$absolute = (s.dotsContainer ? e(s.dotsContainer) : e("<div>").addClass(s.dotsClass).appendTo(this.$element)).addClass("disabled")),
                this._controls.$absolute.on(
                    "click",
                    "button",
                    e.proxy(function (i) {
                        var n = e(i.target).parent().is(this._controls.$absolute) ? e(i.target).index() : e(i.target).parent().index();
                        i.preventDefault(), this.to(n, s.dotsSpeed);
                    }, this)
                ),
                this._overrides))
                    this._core[i] = e.proxy(this[i], this);
            }),
            (o.prototype.destroy = function () {
                var e, i, s, n, o;
                for (e in ((o = this._core.settings), this._handlers)) this.$element.off(e, this._handlers[e]);
                for (i in this._controls) "$relative" === i && o.navContainer ? this._controls[i].html("") : this._controls[i].remove();
                for (n in this.overides) this._core[n] = this._overrides[n];
                for (s in Object.getOwnPropertyNames(this)) "function" != typeof this[s] && (this[s] = null);
            }),
            (o.prototype.update = function () {
                var e,
                    i,
                    s,
                    n = this._core.clones().length / 2,
                    o = n + this._core.items().length,
                    r = this._core.maximum(!0),
                    a = this._core.settings,
                    l = a.center || a.autoWidth || a.dotsData ? 1 : a.dotsEach || a.items;
                if (("page" !== a.slideBy && (a.slideBy = Math.min(a.slideBy, a.items)), a.dots || "page" == a.slideBy))
                    for (this._pages = [], e = n, i = 0, s = 0; e < o; e++) {
                        if (i >= l || 0 === i) {
                            if ((this._pages.push({ start: Math.min(r, e - n), end: e - n + l - 1 }), Math.min(r, e - n) === r)) break;
                            (i = 0), ++s;
                        }
                        i += this._core.mergers(this._core.relative(e));
                    }
            }),
            (o.prototype.draw = function () {
                var i,
                    s = this._core.settings,
                    n = this._core.items().length <= s.items,
                    o = this._core.relative(this._core.current()),
                    r = s.loop || s.rewind;
                this._controls.$relative.toggleClass("disabled", !s.nav || n),
                    s.nav && (this._controls.$previous.toggleClass("disabled", !r && o <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !r && o >= this._core.maximum(!0))),
                    this._controls.$absolute.toggleClass("disabled", !s.dots || n),
                    s.dots &&
                        ((i = this._pages.length - this._controls.$absolute.children().length),
                        s.dotsData && 0 !== i
                            ? this._controls.$absolute.html(this._templates.join(""))
                            : i > 0
                            ? this._controls.$absolute.append(Array(i + 1).join(this._templates[0]))
                            : i < 0 && this._controls.$absolute.children().slice(i).remove(),
                        this._controls.$absolute.find(".active").removeClass("active"),
                        this._controls.$absolute.children().eq(e.inArray(this.current(), this._pages)).addClass("active"));
            }),
            (o.prototype.onTrigger = function (i) {
                var s = this._core.settings;
                i.page = { index: e.inArray(this.current(), this._pages), count: this._pages.length, size: s && (s.center || s.autoWidth || s.dotsData ? 1 : s.dotsEach || s.items) };
            }),
            (o.prototype.current = function () {
                var i = this._core.relative(this._core.current());
                return e
                    .grep(
                        this._pages,
                        e.proxy(function (e, s) {
                            return e.start <= i && e.end >= i;
                        }, this)
                    )
                    .pop();
            }),
            (o.prototype.getPosition = function (i) {
                var s,
                    n,
                    o = this._core.settings;
                return (
                    "page" == o.slideBy
                        ? ((s = e.inArray(this.current(), this._pages)), (n = this._pages.length), i ? ++s : --s, (s = this._pages[((s % n) + n) % n].start))
                        : ((s = this._core.relative(this._core.current())), (n = this._core.items().length), i ? (s += o.slideBy) : (s -= o.slideBy)),
                    s
                );
            }),
            (o.prototype.next = function (i) {
                e.proxy(this._overrides.to, this._core)(this.getPosition(!0), i);
            }),
            (o.prototype.prev = function (i) {
                e.proxy(this._overrides.to, this._core)(this.getPosition(!1), i);
            }),
            (o.prototype.to = function (i, s, n) {
                var o;
                !n && this._pages.length ? ((o = this._pages.length), e.proxy(this._overrides.to, this._core)(this._pages[((i % o) + o) % o].start, s)) : e.proxy(this._overrides.to, this._core)(i, s);
            }),
            (e.fn.owlCarousel.Constructor.Plugins.Navigation = o);
    })(window.Zepto || window.jQuery, window, document),
    (function (e, i, s, n) {
        "use strict";
        var o = function (s) {
            (this._core = s),
                (this._hashes = {}),
                (this.$element = this._core.$element),
                (this._handlers = {
                    "initialized.owl.carousel": e.proxy(function (s) {
                        s.namespace && "URLHash" === this._core.settings.startPosition && e(i).trigger("hashchange.owl.navigation");
                    }, this),
                    "prepared.owl.carousel": e.proxy(function (i) {
                        if (i.namespace) {
                            var s = e(i.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                            s && (this._hashes[s] = i.content);
                        }
                    }, this),
                    "changed.owl.carousel": e.proxy(function (s) {
                        if (s.namespace && "position" === s.property.name) {
                            var n = this._core.items(this._core.relative(this._core.current())),
                                o = e
                                    .map(this._hashes, function (e, i) {
                                        return e === n ? i : null;
                                    })
                                    .join();
                            o && i.location.hash.slice(1) !== o && (i.location.hash = o);
                        }
                    }, this),
                }),
                (this._core.options = e.extend({}, o.Defaults, this._core.options)),
                this.$element.on(this._handlers),
                e(i).on(
                    "hashchange.owl.navigation",
                    e.proxy(function (e) {
                        var s = i.location.hash.substring(1),
                            n = this._core.$stage.children(),
                            o = this._hashes[s] && n.index(this._hashes[s]);
                        void 0 !== o && o !== this._core.current() && this._core.to(this._core.relative(o), !1, !0);
                    }, this)
                );
        };
        (o.Defaults = { URLhashListener: !1 }),
            (o.prototype.destroy = function () {
                var s, n;
                for (s in (e(i).off("hashchange.owl.navigation"), this._handlers)) this._core.$element.off(s, this._handlers[s]);
                for (n in Object.getOwnPropertyNames(this)) "function" != typeof this[n] && (this[n] = null);
            }),
            (e.fn.owlCarousel.Constructor.Plugins.Hash = o);
    })(window.Zepto || window.jQuery, window, document),
    (function (e, i, s, n) {
        function o(i, s) {
            var n = !1,
                o = i.charAt(0).toUpperCase() + i.slice(1);
            return (
                e.each((i + " " + l.join(o + " ") + o).split(" "), function (e, i) {
                    if (void 0 !== a[i]) return (n = !s || i), !1;
                }),
                n
            );
        }
        function r(e) {
            return o(e, !0);
        }
        var a = e("<support>").get(0).style,
            l = "Webkit Moz O ms".split(" "),
            h = {
                transition: { end: { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd", transition: "transitionend" } },
                animation: { end: { WebkitAnimation: "webkitAnimationEnd", MozAnimation: "animationend", OAnimation: "oAnimationEnd", animation: "animationend" } },
            },
            c = {
                csstransforms: function () {
                    return !!o("transform");
                },
                csstransforms3d: function () {
                    return !!o("perspective");
                },
                csstransitions: function () {
                    return !!o("transition");
                },
                cssanimations: function () {
                    return !!o("animation");
                },
            };
        c.csstransitions() && ((e.support.transition = new String(r("transition"))), (e.support.transition.end = h.transition.end[e.support.transition])),
            c.cssanimations() && ((e.support.animation = new String(r("animation"))), (e.support.animation.end = h.animation.end[e.support.animation])),
            c.csstransforms() && ((e.support.transform = new String(r("transform"))), (e.support.transform3d = c.csstransforms3d()));
    })(window.Zepto || window.jQuery, window, document);
