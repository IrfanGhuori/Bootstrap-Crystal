!(function (e, i) {
    "object" == typeof exports && "undefined" != typeof module
        ? i(exports, require("jquery"), require("popper.js"))
        : "function" == typeof define && define.amd
        ? define(["exports", "jquery", "popper.js"], i)
        : i(((e = e || self).bootstrap = {}), e.jQuery, e.Popper);
})(this, function (e, i, n) {
    "use strict";
    function s(e, i) {
        for (var n = 0; n < i.length; n++) {
            var s = i[n];
            (s.enumerable = s.enumerable || !1), (s.configurable = !0), "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s);
        }
    }
    function o(e, i, n) {
        return i && s(e.prototype, i), n && s(e, n), e;
    }
    function r(e, i, n) {
        return i in e ? Object.defineProperty(e, i, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[i] = n), e;
    }
    function a(e, i) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var s = Object.getOwnPropertySymbols(e);
            i &&
                (s = s.filter(function (i) {
                    return Object.getOwnPropertyDescriptor(e, i).enumerable;
                })),
                n.push.apply(n, s);
        }
        return n;
    }
    function l(e) {
        for (var i = 1; i < arguments.length; i++) {
            var n = null != arguments[i] ? arguments[i] : {};
            i % 2
                ? a(Object(n), !0).forEach(function (i) {
                      r(e, i, n[i]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                : a(Object(n)).forEach(function (i) {
                      Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(n, i));
                  });
        }
        return e;
    }
    (i = i && i.hasOwnProperty("default") ? i.default : i),
        (n = n && n.hasOwnProperty("default") ? n.default : n),
        i(window).on("load", function () {
            i(".loading").fadeOut("slow");
        });
    var c = "transitionend",
        h = {
            TRANSITION_END: "bsTransitionEnd",
            getUID: function (e) {
                do e += ~~(1e6 * Math.random());
                while (document.getElementById(e));
                return e;
            },
            getSelectorFromElement: function (e) {
                var i = e.getAttribute("data-target");
                if (!i || "#" === i) {
                    var n = e.getAttribute("href");
                    i = n && "#" !== n ? n.trim() : "";
                }
                try {
                    return document.querySelector(i) ? i : null;
                } catch (s) {
                    return null;
                }
            },
            getTransitionDurationFromElement: function (e) {
                if (!e) return 0;
                var n = i(e).css("transition-duration"),
                    s = i(e).css("transition-delay"),
                    o = parseFloat(n),
                    r = parseFloat(s);
                return o || r ? ((n = n.split(",")[0]), (s = s.split(",")[0]), 1e3 * (parseFloat(n) + parseFloat(s))) : 0;
            },
            reflow: function (e) {
                return e.offsetHeight;
            },
            triggerTransitionEnd: function (e) {
                i(e).trigger(c);
            },
            supportsTransitionEnd: function () {
                return Boolean(c);
            },
            isElement: function (e) {
                return (e[0] || e).nodeType;
            },
            typeCheckConfig: function (e, i, n) {
                for (var s in n)
                    if (Object.prototype.hasOwnProperty.call(n, s)) {
                        var o,
                            r = n[s],
                            a = i[s],
                            l =
                                a && h.isElement(a)
                                    ? "element"
                                    : ((o = a),
                                      {}.toString
                                          .call(o)
                                          .match(/\s([a-z]+)/i)[1]
                                          .toLowerCase());
                        if (!RegExp(r).test(l)) throw Error(e.toUpperCase() + ': Option "' + s + '" provided type "' + l + '" but expected type "' + r + '".');
                    }
            },
            findShadowRoot: function (e) {
                if (!document.documentElement.attachShadow) return null;
                if ("function" == typeof e.getRootNode) {
                    var i = e.getRootNode();
                    return i instanceof ShadowRoot ? i : null;
                }
                return e instanceof ShadowRoot ? e : e.parentNode ? h.findShadowRoot(e.parentNode) : null;
            },
            jQueryDetection: function () {
                if (void 0 === i) throw TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
                var e = i.fn.jquery.split(" ")[0].split(".");
                if ((e[0] < 2 && e[1] < 9) || (1 === e[0] && 9 === e[1] && e[2] < 1) || e[0] >= 4) throw Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0");
            },
        };
    h.jQueryDetection(),
        (i.fn.emulateTransitionEnd = function (e) {
            var n = this,
                s = !1;
            return (
                i(this).one(h.TRANSITION_END, function () {
                    s = !0;
                }),
                setTimeout(function () {
                    s || h.triggerTransitionEnd(n);
                }, e),
                this
            );
        }),
        (i.event.special[h.TRANSITION_END] = {
            bindType: c,
            delegateType: c,
            handle: function (e) {
                if (i(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
            },
        });
    var u = i.fn.alert,
        f = (function () {
            function e(e) {
                this._element = e;
            }
            var n = e.prototype;
            return (
                (n.close = function (e) {
                    var i = this._element;
                    e && (i = this._getRootElement(e)), this._triggerCloseEvent(i).isDefaultPrevented() || this._removeElement(i);
                }),
                (n.dispose = function () {
                    i.removeData(this._element, "bs.alert"), (this._element = null);
                }),
                (n._getRootElement = function (e) {
                    var n = h.getSelectorFromElement(e),
                        s = !1;
                    return n && (s = document.querySelector(n)), s || (s = i(e).closest(".alert")[0]), s;
                }),
                (n._triggerCloseEvent = function (e) {
                    var n = i.Event("close.bs.alert");
                    return i(e).trigger(n), n;
                }),
                (n._removeElement = function (e) {
                    var n = this;
                    if ((i(e).removeClass("show"), i(e).hasClass("fade"))) {
                        var s = h.getTransitionDurationFromElement(e);
                        i(e)
                            .one(h.TRANSITION_END, function (i) {
                                return n._destroyElement(e, i);
                            })
                            .emulateTransitionEnd(s);
                    } else this._destroyElement(e);
                }),
                (n._destroyElement = function (e) {
                    i(e).detach().trigger("closed.bs.alert").remove();
                }),
                (e._jQueryInterface = function (n) {
                    return this.each(function () {
                        var s = i(this),
                            o = s.data("bs.alert");
                        o || ((o = new e(this)), s.data("bs.alert", o)), "close" === n && o[n](this);
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
    i(document).on("click.bs.alert.data-api", '[data-dismiss="alert"]', f._handleDismiss(new f())),
        (i.fn.alert = f._jQueryInterface),
        (i.fn.alert.Constructor = f),
        (i.fn.alert.noConflict = function () {
            return (i.fn.alert = u), f._jQueryInterface;
        });
    var d = i.fn.button,
        g = "active",
        p = '[data-toggle^="button"]',
        m = 'input:not([type="hidden"])',
        v = ".btn",
        y = (function () {
            function e(e) {
                this._element = e;
            }
            var n = e.prototype;
            return (
                (n.toggle = function () {
                    var e = !0,
                        n = !0,
                        s = i(this._element).closest('[data-toggle="buttons"]')[0];
                    if (s) {
                        var o = this._element.querySelector(m);
                        if (o) {
                            if ("radio" === o.type) {
                                if (o.checked && this._element.classList.contains(g)) e = !1;
                                else {
                                    var r = s.querySelector(".active");
                                    r && i(r).removeClass(g);
                                }
                            } else "checkbox" === o.type ? "LABEL" === this._element.tagName && o.checked === this._element.classList.contains(g) && (e = !1) : (e = !1);
                            e && ((o.checked = !this._element.classList.contains(g)), i(o).trigger("change")), o.focus(), (n = !1);
                        }
                    }
                    this._element.hasAttribute("disabled") || this._element.classList.contains("disabled") || (n && this._element.setAttribute("aria-pressed", !this._element.classList.contains(g)), e && i(this._element).toggleClass(g));
                }),
                (n.dispose = function () {
                    i.removeData(this._element, "bs.button"), (this._element = null);
                }),
                (e._jQueryInterface = function (n) {
                    return this.each(function () {
                        var s = i(this).data("bs.button");
                        s || ((s = new e(this)), i(this).data("bs.button", s)), "toggle" === n && s[n]();
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
        .on("click.bs.button.data-api", p, function (e) {
            var n = e.target;
            if ((i(n).hasClass("btn") || (n = i(n).closest(v)[0]), !n || n.hasAttribute("disabled") || n.classList.contains("disabled"))) e.preventDefault();
            else {
                var s = n.querySelector(m);
                if (s && (s.hasAttribute("disabled") || s.classList.contains("disabled"))) return void e.preventDefault();
                y._jQueryInterface.call(i(n), "toggle");
            }
        })
        .on("focus.bs.button.data-api blur.bs.button.data-api", p, function (e) {
            var n = i(e.target).closest(v)[0];
            i(n).toggleClass("focus", /^focus(in)?$/.test(e.type));
        }),
        i(window).on("load.bs.button.data-api", function () {
            for (var e = [].slice.call(document.querySelectorAll('[data-toggle="buttons"] .btn')), i = 0, n = e.length; i < n; i++) {
                var s = e[i],
                    o = s.querySelector(m);
                o.checked || o.hasAttribute("checked") ? s.classList.add(g) : s.classList.remove(g);
            }
            for (var r = 0, a = (e = [].slice.call(document.querySelectorAll('[data-toggle="button"]'))).length; r < a; r++) {
                var l = e[r];
                "true" === l.getAttribute("aria-pressed") ? l.classList.add(g) : l.classList.remove(g);
            }
        }),
        (i.fn.button = y._jQueryInterface),
        (i.fn.button.Constructor = y),
        (i.fn.button.noConflict = function () {
            return (i.fn.button = d), y._jQueryInterface;
        });
    var b = "carousel",
        E = i.fn[b],
        T = { interval: 5e3, keyboard: !0, slide: !1, pause: "hover", wrap: !0, touch: !0 },
        C = { interval: "(number|boolean)", keyboard: "boolean", slide: "(boolean|string)", pause: "(string|boolean)", wrap: "boolean", touch: "boolean" },
        w = "next",
        S = "prev",
        A = "slid.bs.carousel",
        D = "active",
        I = {
            ACTIVE: ".active",
            ACTIVE_ITEM: ".active.carousel-item",
            ITEM: ".carousel-item",
            ITEM_IMG: ".carousel-item img",
            NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
            INDICATORS: ".carousel-indicators",
            DATA_SLIDE: "[data-slide], [data-slide-to]",
            DATA_RIDE: '[data-ride="carousel"]',
        },
        N = { TOUCH: "touch", PEN: "pen" },
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
                    (this._indicatorsElement = this._element.querySelector(I.INDICATORS)),
                    (this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0),
                    (this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent)),
                    this._addEventListeners();
            }
            var n = e.prototype;
            return (
                (n.next = function () {
                    this._isSliding || this._slide(w);
                }),
                (n.nextWhenVisible = function () {
                    !document.hidden && i(this._element).is(":visible") && "hidden" !== i(this._element).css("visibility") && this.next();
                }),
                (n.prev = function () {
                    this._isSliding || this._slide(S);
                }),
                (n.pause = function (e) {
                    e || (this._isPaused = !0), this._element.querySelector(I.NEXT_PREV) && (h.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), (this._interval = null);
                }),
                (n.cycle = function (e) {
                    e || (this._isPaused = !1),
                        this._interval && (clearInterval(this._interval), (this._interval = null)),
                        this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval));
                }),
                (n.to = function (e) {
                    var n = this;
                    this._activeElement = this._element.querySelector(I.ACTIVE_ITEM);
                    var s = this._getItemIndex(this._activeElement);
                    if (!(e > this._items.length - 1 || e < 0)) {
                        if (this._isSliding)
                            i(this._element).one(A, function () {
                                return n.to(e);
                            });
                        else {
                            if (s === e) return this.pause(), void this.cycle();
                            this._slide(e > s ? w : S, this._items[e]);
                        }
                    }
                }),
                (n.dispose = function () {
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
                (n._getConfig = function (e) {
                    return (e = l({}, T, {}, e)), h.typeCheckConfig(b, e, C), e;
                }),
                (n._handleSwipe = function () {
                    var e = Math.abs(this.touchDeltaX);
                    if (!(e <= 40)) {
                        var i = e / this.touchDeltaX;
                        (this.touchDeltaX = 0), i > 0 && this.prev(), i < 0 && this.next();
                    }
                }),
                (n._addEventListeners = function () {
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
                (n._addTouchEventListeners = function () {
                    var e = this;
                    if (this._touchSupported) {
                        var n = function (i) {
                                e._pointerEvent && N[i.originalEvent.pointerType.toUpperCase()] ? (e.touchStartX = i.originalEvent.clientX) : e._pointerEvent || (e.touchStartX = i.originalEvent.touches[0].clientX);
                            },
                            s = function (i) {
                                e._pointerEvent && N[i.originalEvent.pointerType.toUpperCase()] && (e.touchDeltaX = i.originalEvent.clientX - e.touchStartX),
                                    e._handleSwipe(),
                                    "hover" === e._config.pause &&
                                        (e.pause(),
                                        e.touchTimeout && clearTimeout(e.touchTimeout),
                                        (e.touchTimeout = setTimeout(function (i) {
                                            return e.cycle(i);
                                        }, 500 + e._config.interval)));
                            };
                        i(this._element.querySelectorAll(I.ITEM_IMG)).on("dragstart.bs.carousel", function (e) {
                            return e.preventDefault();
                        }),
                            this._pointerEvent
                                ? (i(this._element).on("pointerdown.bs.carousel", function (e) {
                                      return n(e);
                                  }),
                                  i(this._element).on("pointerup.bs.carousel", function (e) {
                                      return s(e);
                                  }),
                                  this._element.classList.add("pointer-event"))
                                : (i(this._element).on("touchstart.bs.carousel", function (e) {
                                      return n(e);
                                  }),
                                  i(this._element).on("touchmove.bs.carousel", function (i) {
                                      var n;
                                      (n = i).originalEvent.touches && n.originalEvent.touches.length > 1 ? (e.touchDeltaX = 0) : (e.touchDeltaX = n.originalEvent.touches[0].clientX - e.touchStartX);
                                  }),
                                  i(this._element).on("touchend.bs.carousel", function (e) {
                                      return s(e);
                                  }));
                    }
                }),
                (n._keydown = function (e) {
                    if (!/input|textarea/i.test(e.target.tagName))
                        switch (e.which) {
                            case 37:
                                e.preventDefault(), this.prev();
                                break;
                            case 39:
                                e.preventDefault(), this.next();
                        }
                }),
                (n._getItemIndex = function (e) {
                    return (this._items = e && e.parentNode ? [].slice.call(e.parentNode.querySelectorAll(I.ITEM)) : []), this._items.indexOf(e);
                }),
                (n._getItemByDirection = function (e, i) {
                    var n = this._getItemIndex(i),
                        s = this._items.length - 1;
                    if (((e === S && 0 === n) || (e === w && n === s)) && !this._config.wrap) return i;
                    var o = (n + (e === S ? -1 : 1)) % this._items.length;
                    return -1 === o ? this._items[this._items.length - 1] : this._items[o];
                }),
                (n._triggerSlideEvent = function (e, n) {
                    var s = this._getItemIndex(e),
                        o = this._getItemIndex(this._element.querySelector(I.ACTIVE_ITEM)),
                        r = i.Event("slide.bs.carousel", { relatedTarget: e, direction: n, from: o, to: s });
                    return i(this._element).trigger(r), r;
                }),
                (n._setActiveIndicatorElement = function (e) {
                    if (this._indicatorsElement) {
                        i([].slice.call(this._indicatorsElement.querySelectorAll(I.ACTIVE))).removeClass(D);
                        var n = this._indicatorsElement.children[this._getItemIndex(e)];
                        n && i(n).addClass(D);
                    }
                }),
                (n._slide = function (e, n) {
                    var s,
                        o,
                        r,
                        a = this,
                        l = this._element.querySelector(I.ACTIVE_ITEM),
                        c = this._getItemIndex(l),
                        u = n || (l && this._getItemByDirection(e, l)),
                        f = this._getItemIndex(u),
                        d = Boolean(this._interval);
                    if ((e === w ? ((s = "carousel-item-left"), (o = "carousel-item-next"), (r = "left")) : ((s = "carousel-item-right"), (o = "carousel-item-prev"), (r = "right")), u && i(u).hasClass(D))) this._isSliding = !1;
                    else if (!this._triggerSlideEvent(u, r).isDefaultPrevented() && l && u) {
                        (this._isSliding = !0), d && this.pause(), this._setActiveIndicatorElement(u);
                        var g = i.Event(A, { relatedTarget: u, direction: r, from: c, to: f });
                        if (i(this._element).hasClass("slide")) {
                            i(u).addClass(o), h.reflow(u), i(l).addClass(s), i(u).addClass(s);
                            var p = parseInt(u.getAttribute("data-interval"), 10);
                            p ? ((this._config.defaultInterval = this._config.defaultInterval || this._config.interval), (this._config.interval = p)) : (this._config.interval = this._config.defaultInterval || this._config.interval);
                            var m = h.getTransitionDurationFromElement(l);
                            i(l)
                                .one(h.TRANSITION_END, function () {
                                    i(u)
                                        .removeClass(s + " " + o)
                                        .addClass(D),
                                        i(l).removeClass(D + " " + o + " " + s),
                                        (a._isSliding = !1),
                                        setTimeout(function () {
                                            return i(a._element).trigger(g);
                                        }, 0);
                                })
                                .emulateTransitionEnd(m);
                        } else i(l).removeClass(D), i(u).addClass(D), (this._isSliding = !1), i(this._element).trigger(g);
                        d && this.cycle();
                    }
                }),
                (e._jQueryInterface = function (n) {
                    return this.each(function () {
                        var s = i(this).data("bs.carousel"),
                            o = l({}, T, {}, i(this).data());
                        "object" == typeof n && (o = l({}, o, {}, n));
                        var r = "string" == typeof n ? n : o.slide;
                        if ((s || ((s = new e(this, o)), i(this).data("bs.carousel", s)), "number" == typeof n)) s.to(n);
                        else if ("string" == typeof r) {
                            if (void 0 === s[r]) throw TypeError('No method named "' + r + '"');
                            s[r]();
                        } else o.interval && o.ride && (s.pause(), s.cycle());
                    });
                }),
                (e._dataApiClickHandler = function (n) {
                    var s = h.getSelectorFromElement(this);
                    if (s) {
                        var o = i(s)[0];
                        if (o && i(o).hasClass("carousel")) {
                            var r = l({}, i(o).data(), {}, i(this).data()),
                                a = this.getAttribute("data-slide-to");
                            a && (r.interval = !1), e._jQueryInterface.call(i(o), r), a && i(o).data("bs.carousel").to(a), n.preventDefault();
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
                            return T;
                        },
                    },
                ]),
                e
            );
        })();
    i(document).on("click.bs.carousel.data-api", I.DATA_SLIDE, k._dataApiClickHandler),
        i(window).on("load.bs.carousel.data-api", function () {
            for (var e = [].slice.call(document.querySelectorAll(I.DATA_RIDE)), n = 0, s = e.length; n < s; n++) {
                var o = i(e[n]);
                k._jQueryInterface.call(o, o.data());
            }
        }),
        (i.fn[b] = k._jQueryInterface),
        (i.fn[b].Constructor = k),
        (i.fn[b].noConflict = function () {
            return (i.fn[b] = E), k._jQueryInterface;
        });
    var O = "collapse",
        _ = i.fn[O],
        L = { toggle: !0, parent: "" },
        x = { toggle: "boolean", parent: "(string|element)" },
        P = "show",
        j = "collapse",
        R = "collapsing",
        q = "collapsed",
        F = { ACTIVES: ".show, .collapsing", DATA_TOGGLE: '[data-toggle="collapse"]' },
        M = (function () {
            function e(e, i) {
                (this._isTransitioning = !1),
                    (this._element = e),
                    (this._config = this._getConfig(i)),
                    (this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]')));
                for (var n = [].slice.call(document.querySelectorAll(F.DATA_TOGGLE)), s = 0, o = n.length; s < o; s++) {
                    var r = n[s],
                        a = h.getSelectorFromElement(r),
                        l = [].slice.call(document.querySelectorAll(a)).filter(function (i) {
                            return i === e;
                        });
                    null !== a && l.length > 0 && ((this._selector = a), this._triggerArray.push(r));
                }
                (this._parent = this._config.parent ? this._getParent() : null), this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle();
            }
            var n = e.prototype;
            return (
                (n.toggle = function () {
                    i(this._element).hasClass(P) ? this.hide() : this.show();
                }),
                (n.show = function () {
                    var n,
                        s,
                        o = this;
                    if (
                        !(
                            this._isTransitioning ||
                            i(this._element).hasClass(P) ||
                            (this._parent &&
                                0 ===
                                    (n = [].slice.call(this._parent.querySelectorAll(F.ACTIVES)).filter(function (e) {
                                        return "string" == typeof o._config.parent ? e.getAttribute("data-parent") === o._config.parent : e.classList.contains(j);
                                    })).length &&
                                (n = null),
                            n && (s = i(n).not(this._selector).data("bs.collapse")) && s._isTransitioning)
                        )
                    ) {
                        var r = i.Event("show.bs.collapse");
                        if ((i(this._element).trigger(r), !r.isDefaultPrevented())) {
                            n && (e._jQueryInterface.call(i(n).not(this._selector), "hide"), s || i(n).data("bs.collapse", null));
                            var a = this._getDimension();
                            i(this._element).removeClass(j).addClass(R), (this._element.style[a] = 0), this._triggerArray.length && i(this._triggerArray).removeClass(q).attr("aria-expanded", !0), this.setTransitioning(!0);
                            var l = "scroll" + (a[0].toUpperCase() + a.slice(1)),
                                c = h.getTransitionDurationFromElement(this._element);
                            i(this._element)
                                .one(h.TRANSITION_END, function () {
                                    i(o._element).removeClass(R).addClass(j).addClass(P), (o._element.style[a] = ""), o.setTransitioning(!1), i(o._element).trigger("shown.bs.collapse");
                                })
                                .emulateTransitionEnd(c),
                                (this._element.style[a] = this._element[l] + "px");
                        }
                    }
                }),
                (n.hide = function () {
                    var e = this;
                    if (!this._isTransitioning && i(this._element).hasClass(P)) {
                        var n = i.Event("hide.bs.collapse");
                        if ((i(this._element).trigger(n), !n.isDefaultPrevented())) {
                            var s = this._getDimension();
                            (this._element.style[s] = this._element.getBoundingClientRect()[s] + "px"), h.reflow(this._element), i(this._element).addClass(R).removeClass(j).removeClass(P);
                            var o = this._triggerArray.length;
                            if (o > 0)
                                for (var r = 0; r < o; r++) {
                                    var a = this._triggerArray[r],
                                        l = h.getSelectorFromElement(a);
                                    null !== l && (i([].slice.call(document.querySelectorAll(l))).hasClass(P) || i(a).addClass(q).attr("aria-expanded", !1));
                                }
                            this.setTransitioning(!0), (this._element.style[s] = "");
                            var c = h.getTransitionDurationFromElement(this._element);
                            i(this._element)
                                .one(h.TRANSITION_END, function () {
                                    e.setTransitioning(!1), i(e._element).removeClass(R).addClass(j).trigger("hidden.bs.collapse");
                                })
                                .emulateTransitionEnd(c);
                        }
                    }
                }),
                (n.setTransitioning = function (e) {
                    this._isTransitioning = e;
                }),
                (n.dispose = function () {
                    i.removeData(this._element, "bs.collapse"), (this._config = null), (this._parent = null), (this._element = null), (this._triggerArray = null), (this._isTransitioning = null);
                }),
                (n._getConfig = function (e) {
                    return ((e = l({}, L, {}, e)).toggle = Boolean(e.toggle)), h.typeCheckConfig(O, e, x), e;
                }),
                (n._getDimension = function () {
                    return i(this._element).hasClass("width") ? "width" : "height";
                }),
                (n._getParent = function () {
                    var n,
                        s = this;
                    h.isElement(this._config.parent) ? ((n = this._config.parent), void 0 !== this._config.parent.jquery && (n = this._config.parent[0])) : (n = document.querySelector(this._config.parent));
                    var o = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                    return (
                        i([].slice.call(n.querySelectorAll(o))).each(function (i, n) {
                            s._addAriaAndCollapsedClass(e._getTargetFromElement(n), [n]);
                        }),
                        n
                    );
                }),
                (n._addAriaAndCollapsedClass = function (e, n) {
                    var s = i(e).hasClass(P);
                    n.length && i(n).toggleClass(q, !s).attr("aria-expanded", s);
                }),
                (e._getTargetFromElement = function (e) {
                    var i = h.getSelectorFromElement(e);
                    return i ? document.querySelector(i) : null;
                }),
                (e._jQueryInterface = function (n) {
                    return this.each(function () {
                        var s = i(this),
                            o = s.data("bs.collapse"),
                            r = l({}, L, {}, s.data(), {}, "object" == typeof n && n ? n : {});
                        if ((!o && r.toggle && /show|hide/.test(n) && (r.toggle = !1), o || ((o = new e(this, r)), s.data("bs.collapse", o)), "string" == typeof n)) {
                            if (void 0 === o[n]) throw TypeError('No method named "' + n + '"');
                            o[n]();
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
                            return L;
                        },
                    },
                ]),
                e
            );
        })();
    i(document).on("click.bs.collapse.data-api", F.DATA_TOGGLE, function (e) {
        "A" === e.currentTarget.tagName && e.preventDefault();
        var n = i(this),
            s = h.getSelectorFromElement(this);
        i([].slice.call(document.querySelectorAll(s))).each(function () {
            var e = i(this),
                s = e.data("bs.collapse") ? "toggle" : n.data();
            M._jQueryInterface.call(e, s);
        });
    }),
        (i.fn[O] = M._jQueryInterface),
        (i.fn[O].Constructor = M),
        (i.fn[O].noConflict = function () {
            return (i.fn[O] = _), M._jQueryInterface;
        });
    var Q = "dropdown",
        H = i.fn[Q],
        V = RegExp("38|40|27"),
        B = "hide.bs.dropdown",
        U = "hidden.bs.dropdown",
        W = "click.bs.dropdown.data-api",
        z = "keydown.bs.dropdown.data-api",
        G = "disabled",
        K = "show",
        X = "dropdown-menu-right",
        Y = '[data-toggle="dropdown"]',
        J = ".dropdown-menu",
        Z = { offset: 0, flip: !0, boundary: "scrollParent", reference: "toggle", display: "dynamic", popperConfig: null },
        tt = { offset: "(number|string|function)", flip: "boolean", boundary: "(string|element)", reference: "(string|element)", display: "string", popperConfig: "(null|object)" },
        te = (function () {
            function e(e, i) {
                (this._element = e), (this._popper = null), (this._config = this._getConfig(i)), (this._menu = this._getMenuElement()), (this._inNavbar = this._detectNavbar()), this._addEventListeners();
            }
            var s = e.prototype;
            return (
                (s.toggle = function () {
                    if (!this._element.disabled && !i(this._element).hasClass(G)) {
                        var n = i(this._menu).hasClass(K);
                        e._clearMenus(), n || this.show(!0);
                    }
                }),
                (s.show = function (s) {
                    if ((void 0 === s && (s = !1), !(this._element.disabled || i(this._element).hasClass(G) || i(this._menu).hasClass(K)))) {
                        var o = { relatedTarget: this._element },
                            r = i.Event("show.bs.dropdown", o),
                            a = e._getParentFromElement(this._element);
                        if ((i(a).trigger(r), !r.isDefaultPrevented())) {
                            if (!this._inNavbar && s) {
                                if (void 0 === n) throw TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                                var l = this._element;
                                "parent" === this._config.reference ? (l = a) : h.isElement(this._config.reference) && ((l = this._config.reference), void 0 !== this._config.reference.jquery && (l = this._config.reference[0])),
                                    "scrollParent" !== this._config.boundary && i(a).addClass("position-static"),
                                    (this._popper = new n(l, this._menu, this._getPopperConfig()));
                            }
                            "ontouchstart" in document.documentElement && 0 === i(a).closest(".navbar-nav").length && i(document.body).children().on("mouseover", null, i.noop),
                                this._element.focus(),
                                this._element.setAttribute("aria-expanded", !0),
                                i(this._menu).toggleClass(K),
                                i(a).toggleClass(K).trigger(i.Event("shown.bs.dropdown", o));
                        }
                    }
                }),
                (s.hide = function () {
                    if (!this._element.disabled && !i(this._element).hasClass(G) && i(this._menu).hasClass(K)) {
                        var n = { relatedTarget: this._element },
                            s = i.Event(B, n),
                            o = e._getParentFromElement(this._element);
                        i(o).trigger(s), s.isDefaultPrevented() || (this._popper && this._popper.destroy(), i(this._menu).toggleClass(K), i(o).toggleClass(K).trigger(i.Event(U, n)));
                    }
                }),
                (s.dispose = function () {
                    i.removeData(this._element, "bs.dropdown"), i(this._element).off(".bs.dropdown"), (this._element = null), (this._menu = null), null !== this._popper && (this._popper.destroy(), (this._popper = null));
                }),
                (s.update = function () {
                    (this._inNavbar = this._detectNavbar()), null !== this._popper && this._popper.scheduleUpdate();
                }),
                (s._addEventListeners = function () {
                    var e = this;
                    i(this._element).on("click.bs.dropdown", function (i) {
                        i.preventDefault(), i.stopPropagation(), e.toggle();
                    });
                }),
                (s._getConfig = function (e) {
                    return (e = l({}, this.constructor.Default, {}, i(this._element).data(), {}, e)), h.typeCheckConfig(Q, e, this.constructor.DefaultType), e;
                }),
                (s._getMenuElement = function () {
                    if (!this._menu) {
                        var i = e._getParentFromElement(this._element);
                        i && (this._menu = i.querySelector(J));
                    }
                    return this._menu;
                }),
                (s._getPlacement = function () {
                    var e = i(this._element.parentNode),
                        n = "bottom-start";
                    return (
                        e.hasClass("dropup")
                            ? ((n = "top-start"), i(this._menu).hasClass(X) && (n = "top-end"))
                            : e.hasClass("dropright")
                            ? (n = "right-start")
                            : e.hasClass("dropleft")
                            ? (n = "left-start")
                            : i(this._menu).hasClass(X) && (n = "bottom-end"),
                        n
                    );
                }),
                (s._detectNavbar = function () {
                    return i(this._element).closest(".navbar").length > 0;
                }),
                (s._getOffset = function () {
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
                (s._getPopperConfig = function () {
                    var e = { placement: this._getPlacement(), modifiers: { offset: this._getOffset(), flip: { enabled: this._config.flip }, preventOverflow: { boundariesElement: this._config.boundary } } };
                    return "static" === this._config.display && (e.modifiers.applyStyle = { enabled: !1 }), l({}, e, {}, this._config.popperConfig);
                }),
                (e._jQueryInterface = function (n) {
                    return this.each(function () {
                        var s = i(this).data("bs.dropdown");
                        if ((s || ((s = new e(this, "object" == typeof n ? n : null)), i(this).data("bs.dropdown", s)), "string" == typeof n)) {
                            if (void 0 === s[n]) throw TypeError('No method named "' + n + '"');
                            s[n]();
                        }
                    });
                }),
                (e._clearMenus = function (n) {
                    if (!n || (3 !== n.which && ("keyup" !== n.type || 9 === n.which)))
                        for (var s = [].slice.call(document.querySelectorAll(Y)), o = 0, r = s.length; o < r; o++) {
                            var a = e._getParentFromElement(s[o]),
                                l = i(s[o]).data("bs.dropdown"),
                                c = { relatedTarget: s[o] };
                            if ((n && "click" === n.type && (c.clickEvent = n), l)) {
                                var h = l._menu;
                                if (i(a).hasClass(K) && !(n && (("click" === n.type && /input|textarea/i.test(n.target.tagName)) || ("keyup" === n.type && 9 === n.which)) && i.contains(a, n.target))) {
                                    var u = i.Event(B, c);
                                    i(a).trigger(u),
                                        u.isDefaultPrevented() ||
                                            ("ontouchstart" in document.documentElement && i(document.body).children().off("mouseover", null, i.noop),
                                            s[o].setAttribute("aria-expanded", "false"),
                                            l._popper && l._popper.destroy(),
                                            i(h).removeClass(K),
                                            i(a).removeClass(K).trigger(i.Event(U, c)));
                                }
                            }
                        }
                }),
                (e._getParentFromElement = function (e) {
                    var i,
                        n = h.getSelectorFromElement(e);
                    return n && (i = document.querySelector(n)), i || e.parentNode;
                }),
                (e._dataApiKeydownHandler = function (n) {
                    if (
                        (/input|textarea/i.test(n.target.tagName) ? !(32 === n.which || (27 !== n.which && ((40 !== n.which && 38 !== n.which) || i(n.target).closest(J).length))) : V.test(n.which)) &&
                        (n.preventDefault(), n.stopPropagation(), !this.disabled && !i(this).hasClass(G))
                    ) {
                        var s = e._getParentFromElement(this),
                            o = i(s).hasClass(K);
                        if (o || 27 !== n.which) {
                            if (o && (!o || (27 !== n.which && 32 !== n.which))) {
                                var r = [].slice.call(s.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)")).filter(function (e) {
                                    return i(e).is(":visible");
                                });
                                if (0 !== r.length) {
                                    var a = r.indexOf(n.target);
                                    38 === n.which && a > 0 && a--, 40 === n.which && a < r.length - 1 && a++, a < 0 && (a = 0), r[a].focus();
                                }
                            } else {
                                if (27 === n.which) {
                                    var l = s.querySelector(Y);
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
                            return Z;
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
        .on(z, Y, te._dataApiKeydownHandler)
        .on(z, J, te._dataApiKeydownHandler)
        .on(W + " keyup.bs.dropdown.data-api", te._clearMenus)
        .on(W, Y, function (e) {
            e.preventDefault(), e.stopPropagation(), te._jQueryInterface.call(i(this), "toggle");
        })
        .on(W, ".dropdown form", function (e) {
            e.stopPropagation();
        }),
        (i.fn[Q] = te._jQueryInterface),
        (i.fn[Q].Constructor = te),
        (i.fn[Q].noConflict = function () {
            return (i.fn[Q] = H), te._jQueryInterface;
        });
    var ti = i.fn.modal,
        tn = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
        ts = { backdrop: "(boolean|string)", keyboard: "boolean", focus: "boolean", show: "boolean" },
        to = "hidden.bs.modal",
        tr = "show.bs.modal",
        ta = "focusin.bs.modal",
        tl = "resize.bs.modal",
        tc = "click.dismiss.bs.modal",
        th = "keydown.dismiss.bs.modal",
        tu = "mousedown.dismiss.bs.modal",
        tf = "modal-open",
        td = "fade",
        tg = "show",
        tp = "modal-static",
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
            var n = e.prototype;
            return (
                (n.toggle = function (e) {
                    return this._isShown ? this.hide() : this.show(e);
                }),
                (n.show = function (e) {
                    var n = this;
                    if (!this._isShown && !this._isTransitioning) {
                        i(this._element).hasClass(td) && (this._isTransitioning = !0);
                        var s = i.Event(tr, { relatedTarget: e });
                        i(this._element).trigger(s),
                            this._isShown ||
                                s.isDefaultPrevented() ||
                                ((this._isShown = !0),
                                this._checkScrollbar(),
                                this._setScrollbar(),
                                this._adjustDialog(),
                                this._setEscapeEvent(),
                                this._setResizeEvent(),
                                i(this._element).on(tc, tm.DATA_DISMISS, function (e) {
                                    return n.hide(e);
                                }),
                                i(this._dialog).on(tu, function () {
                                    i(n._element).one("mouseup.dismiss.bs.modal", function (e) {
                                        i(e.target).is(n._element) && (n._ignoreBackdropClick = !0);
                                    });
                                }),
                                this._showBackdrop(function () {
                                    return n._showElement(e);
                                }));
                    }
                }),
                (n.hide = function (e) {
                    var n = this;
                    if ((e && e.preventDefault(), this._isShown && !this._isTransitioning)) {
                        var s = i.Event("hide.bs.modal");
                        if ((i(this._element).trigger(s), this._isShown && !s.isDefaultPrevented())) {
                            this._isShown = !1;
                            var o = i(this._element).hasClass(td);
                            if ((o && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), i(document).off(ta), i(this._element).removeClass(tg), i(this._element).off(tc), i(this._dialog).off(tu), o)) {
                                var r = h.getTransitionDurationFromElement(this._element);
                                i(this._element)
                                    .one(h.TRANSITION_END, function (e) {
                                        return n._hideModal(e);
                                    })
                                    .emulateTransitionEnd(r);
                            } else this._hideModal();
                        }
                    }
                }),
                (n.dispose = function () {
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
                (n.handleUpdate = function () {
                    this._adjustDialog();
                }),
                (n._getConfig = function (e) {
                    return (e = l({}, tn, {}, e)), h.typeCheckConfig("modal", e, ts), e;
                }),
                (n._triggerBackdropTransition = function () {
                    var e = this;
                    if ("static" === this._config.backdrop) {
                        var n = i.Event("hidePrevented.bs.modal");
                        if ((i(this._element).trigger(n), n.defaultPrevented)) return;
                        this._element.classList.add(tp);
                        var s = h.getTransitionDurationFromElement(this._element);
                        i(this._element)
                            .one(h.TRANSITION_END, function () {
                                e._element.classList.remove(tp);
                            })
                            .emulateTransitionEnd(s),
                            this._element.focus();
                    } else this.hide();
                }),
                (n._showElement = function (e) {
                    var n = this,
                        s = i(this._element).hasClass(td),
                        o = this._dialog ? this._dialog.querySelector(tm.MODAL_BODY) : null;
                    (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE) || document.body.appendChild(this._element),
                        (this._element.style.display = "block"),
                        this._element.removeAttribute("aria-hidden"),
                        this._element.setAttribute("aria-modal", !0),
                        i(this._dialog).hasClass("modal-dialog-scrollable") && o ? (o.scrollTop = 0) : (this._element.scrollTop = 0),
                        s && h.reflow(this._element),
                        i(this._element).addClass(tg),
                        this._config.focus && this._enforceFocus();
                    var r = i.Event("shown.bs.modal", { relatedTarget: e }),
                        a = function () {
                            n._config.focus && n._element.focus(), (n._isTransitioning = !1), i(n._element).trigger(r);
                        };
                    if (s) {
                        var l = h.getTransitionDurationFromElement(this._dialog);
                        i(this._dialog).one(h.TRANSITION_END, a).emulateTransitionEnd(l);
                    } else a();
                }),
                (n._enforceFocus = function () {
                    var e = this;
                    i(document)
                        .off(ta)
                        .on(ta, function (n) {
                            document !== n.target && e._element !== n.target && 0 === i(e._element).has(n.target).length && e._element.focus();
                        });
                }),
                (n._setEscapeEvent = function () {
                    var e = this;
                    this._isShown && this._config.keyboard
                        ? i(this._element).on(th, function (i) {
                              27 === i.which && e._triggerBackdropTransition();
                          })
                        : this._isShown || i(this._element).off(th);
                }),
                (n._setResizeEvent = function () {
                    var e = this;
                    this._isShown
                        ? i(window).on(tl, function (i) {
                              return e.handleUpdate(i);
                          })
                        : i(window).off(tl);
                }),
                (n._hideModal = function () {
                    var e = this;
                    (this._element.style.display = "none"),
                        this._element.setAttribute("aria-hidden", !0),
                        this._element.removeAttribute("aria-modal"),
                        (this._isTransitioning = !1),
                        this._showBackdrop(function () {
                            i(document.body).removeClass(tf), e._resetAdjustments(), e._resetScrollbar(), i(e._element).trigger(to);
                        });
                }),
                (n._removeBackdrop = function () {
                    this._backdrop && (i(this._backdrop).remove(), (this._backdrop = null));
                }),
                (n._showBackdrop = function (e) {
                    var n = this,
                        s = i(this._element).hasClass(td) ? td : "";
                    if (this._isShown && this._config.backdrop) {
                        if (
                            ((this._backdrop = document.createElement("div")),
                            (this._backdrop.className = "modal-backdrop"),
                            s && this._backdrop.classList.add(s),
                            i(this._backdrop).appendTo(document.body),
                            i(this._element).on(tc, function (e) {
                                n._ignoreBackdropClick ? (n._ignoreBackdropClick = !1) : e.target === e.currentTarget && n._triggerBackdropTransition();
                            }),
                            s && h.reflow(this._backdrop),
                            i(this._backdrop).addClass(tg),
                            !e)
                        )
                            return;
                        if (!s) return void e();
                        var o = h.getTransitionDurationFromElement(this._backdrop);
                        i(this._backdrop).one(h.TRANSITION_END, e).emulateTransitionEnd(o);
                    } else if (!this._isShown && this._backdrop) {
                        i(this._backdrop).removeClass(tg);
                        var r = function () {
                            n._removeBackdrop(), e && e();
                        };
                        if (i(this._element).hasClass(td)) {
                            var a = h.getTransitionDurationFromElement(this._backdrop);
                            i(this._backdrop).one(h.TRANSITION_END, r).emulateTransitionEnd(a);
                        } else r();
                    } else e && e();
                }),
                (n._adjustDialog = function () {
                    var e = this._element.scrollHeight > document.documentElement.clientHeight;
                    !this._isBodyOverflowing && e && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !e && (this._element.style.paddingRight = this._scrollbarWidth + "px");
                }),
                (n._resetAdjustments = function () {
                    (this._element.style.paddingLeft = ""), (this._element.style.paddingRight = "");
                }),
                (n._checkScrollbar = function () {
                    var e = document.body.getBoundingClientRect();
                    (this._isBodyOverflowing = e.left + e.right < window.innerWidth), (this._scrollbarWidth = this._getScrollbarWidth());
                }),
                (n._setScrollbar = function () {
                    var e = this;
                    if (this._isBodyOverflowing) {
                        var n = [].slice.call(document.querySelectorAll(tm.FIXED_CONTENT)),
                            s = [].slice.call(document.querySelectorAll(tm.STICKY_CONTENT));
                        i(n).each(function (n, s) {
                            var o = s.style.paddingRight,
                                r = i(s).css("padding-right");
                            i(s)
                                .data("padding-right", o)
                                .css("padding-right", parseFloat(r) + e._scrollbarWidth + "px");
                        }),
                            i(s).each(function (n, s) {
                                var o = s.style.marginRight,
                                    r = i(s).css("margin-right");
                                i(s)
                                    .data("margin-right", o)
                                    .css("margin-right", parseFloat(r) - e._scrollbarWidth + "px");
                            });
                        var o = document.body.style.paddingRight,
                            r = i(document.body).css("padding-right");
                        i(document.body)
                            .data("padding-right", o)
                            .css("padding-right", parseFloat(r) + this._scrollbarWidth + "px");
                    }
                    i(document.body).addClass(tf);
                }),
                (n._resetScrollbar = function () {
                    i([].slice.call(document.querySelectorAll(tm.FIXED_CONTENT))).each(function (e, n) {
                        var s = i(n).data("padding-right");
                        i(n).removeData("padding-right"), (n.style.paddingRight = s || "");
                    }),
                        i([].slice.call(document.querySelectorAll("" + tm.STICKY_CONTENT))).each(function (e, n) {
                            var s = i(n).data("margin-right");
                            void 0 !== s && i(n).css("margin-right", s).removeData("margin-right");
                        });
                    var e = i(document.body).data("padding-right");
                    i(document.body).removeData("padding-right"), (document.body.style.paddingRight = e || "");
                }),
                (n._getScrollbarWidth = function () {
                    var e = document.createElement("div");
                    (e.className = "modal-scrollbar-measure"), document.body.appendChild(e);
                    var i = e.getBoundingClientRect().width - e.clientWidth;
                    return document.body.removeChild(e), i;
                }),
                (e._jQueryInterface = function (n, s) {
                    return this.each(function () {
                        var o = i(this).data("bs.modal"),
                            r = l({}, tn, {}, i(this).data(), {}, "object" == typeof n && n ? n : {});
                        if ((o || ((o = new e(this, r)), i(this).data("bs.modal", o)), "string" == typeof n)) {
                            if (void 0 === o[n]) throw TypeError('No method named "' + n + '"');
                            o[n](s);
                        } else r.show && o.show(s);
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
                            return tn;
                        },
                    },
                ]),
                e
            );
        })();
    i(document).on("click.bs.modal.data-api", tm.DATA_TOGGLE, function (e) {
        var n,
            s = this,
            o = h.getSelectorFromElement(this);
        o && (n = document.querySelector(o));
        var r = i(n).data("bs.modal") ? "toggle" : l({}, i(n).data(), {}, i(this).data());
        ("A" !== this.tagName && "AREA" !== this.tagName) || e.preventDefault();
        var a = i(n).one(tr, function (e) {
            e.isDefaultPrevented() ||
                a.one(to, function () {
                    i(s).is(":visible") && s.focus();
                });
        });
        t8._jQueryInterface.call(i(n), r, this);
    }),
        (i.fn.modal = t8._jQueryInterface),
        (i.fn.modal.Constructor = t8),
        (i.fn.modal.noConflict = function () {
            return (i.fn.modal = ti), t8._jQueryInterface;
        });
    var tv = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
        ty = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:\/?#]*(?:[\/?#]|$))/gi,
        tb = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
    function tE(e, i, n) {
        if (0 === e.length) return e;
        if (n && "function" == typeof n) return n(e);
        for (var s = new window.DOMParser().parseFromString(e, "text/html"), o = Object.keys(i), r = [].slice.call(s.body.querySelectorAll("*")), a = 0, l = r.length; a < l; a++)
            (function (e, n) {
                var s = r[e],
                    a = s.nodeName.toLowerCase();
                if (-1 === o.indexOf(s.nodeName.toLowerCase())) return s.parentNode.removeChild(s), "continue";
                var l = [].slice.call(s.attributes),
                    c = [].concat(i["*"] || [], i[a] || []);
                l.forEach(function (e) {
                    (function (e, i) {
                        var n = e.nodeName.toLowerCase();
                        if (-1 !== i.indexOf(n)) return -1 === tv.indexOf(n) || Boolean(e.nodeValue.match(ty) || e.nodeValue.match(tb));
                        for (
                            var s = i.filter(function (e) {
                                    return e instanceof RegExp;
                                }),
                                o = 0,
                                r = s.length;
                            o < r;
                            o++
                        )
                            if (n.match(s[o])) return !0;
                        return !1;
                    })(e, c) || s.removeAttribute(e.nodeName);
                });
            })(a);
        return s.body.innerHTML;
    }
    var tT = "tooltip",
        tC = i.fn.tooltip,
        tw = RegExp("(^|\\s)bs-tooltip\\S+", "g"),
        tS = ["sanitize", "whiteList", "sanitizeFn"],
        tA = {
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
        t$ = { AUTO: "auto", TOP: "top", RIGHT: "right", BOTTOM: "bottom", LEFT: "left" },
        tD = {
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
        tI = "show",
        tN = {
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
        tO = "show",
        t_ = "hover",
        tL = "focus",
        tx = (function () {
            function e(e, i) {
                if (void 0 === n) throw TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
                (this._isEnabled = !0), (this._timeout = 0), (this._hoverState = ""), (this._activeTrigger = {}), (this._popper = null), (this.element = e), (this.config = this._getConfig(i)), (this.tip = null), this._setListeners();
            }
            var s = e.prototype;
            return (
                (s.enable = function () {
                    this._isEnabled = !0;
                }),
                (s.disable = function () {
                    this._isEnabled = !1;
                }),
                (s.toggleEnabled = function () {
                    this._isEnabled = !this._isEnabled;
                }),
                (s.toggle = function (e) {
                    if (this._isEnabled) {
                        if (e) {
                            var n = this.constructor.DATA_KEY,
                                s = i(e.currentTarget).data(n);
                            s || ((s = new this.constructor(e.currentTarget, this._getDelegateConfig())), i(e.currentTarget).data(n, s)),
                                (s._activeTrigger.click = !s._activeTrigger.click),
                                s._isWithActiveTrigger() ? s._enter(null, s) : s._leave(null, s);
                        } else {
                            if (i(this.getTipElement()).hasClass(tO)) return void this._leave(null, this);
                            this._enter(null, this);
                        }
                    }
                }),
                (s.dispose = function () {
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
                (s.show = function () {
                    var e = this;
                    if ("none" === i(this.element).css("display")) throw Error("Please use show on visible elements");
                    var s = i.Event(this.constructor.Event.SHOW);
                    if (this.isWithContent() && this._isEnabled) {
                        i(this.element).trigger(s);
                        var o = h.findShadowRoot(this.element),
                            r = i.contains(null !== o ? o : this.element.ownerDocument.documentElement, this.element);
                        if (s.isDefaultPrevented() || !r) return;
                        var a = this.getTipElement(),
                            l = h.getUID(this.constructor.NAME);
                        a.setAttribute("id", l), this.element.setAttribute("aria-describedby", l), this.setContent(), this.config.animation && i(a).addClass(tk);
                        var c = "function" == typeof this.config.placement ? this.config.placement.call(this, a, this.element) : this.config.placement,
                            u = this._getAttachment(c);
                        this.addAttachmentClass(u);
                        var f = this._getContainer();
                        i(a).data(this.constructor.DATA_KEY, this),
                            i.contains(this.element.ownerDocument.documentElement, this.tip) || i(a).appendTo(f),
                            i(this.element).trigger(this.constructor.Event.INSERTED),
                            (this._popper = new n(this.element, a, this._getPopperConfig(u))),
                            i(a).addClass(tO),
                            "ontouchstart" in document.documentElement && i(document.body).children().on("mouseover", null, i.noop);
                        var d = function () {
                            e.config.animation && e._fixTransition();
                            var n = e._hoverState;
                            (e._hoverState = null), i(e.element).trigger(e.constructor.Event.SHOWN), "out" === n && e._leave(null, e);
                        };
                        if (i(this.tip).hasClass(tk)) {
                            var g = h.getTransitionDurationFromElement(this.tip);
                            i(this.tip).one(h.TRANSITION_END, d).emulateTransitionEnd(g);
                        } else d();
                    }
                }),
                (s.hide = function (e) {
                    var n = this,
                        s = this.getTipElement(),
                        o = i.Event(this.constructor.Event.HIDE),
                        r = function () {
                            n._hoverState !== tI && s.parentNode && s.parentNode.removeChild(s),
                                n._cleanTipClass(),
                                n.element.removeAttribute("aria-describedby"),
                                i(n.element).trigger(n.constructor.Event.HIDDEN),
                                null !== n._popper && n._popper.destroy(),
                                e && e();
                        };
                    if ((i(this.element).trigger(o), !o.isDefaultPrevented())) {
                        if (
                            (i(s).removeClass(tO),
                            "ontouchstart" in document.documentElement && i(document.body).children().off("mouseover", null, i.noop),
                            (this._activeTrigger.click = !1),
                            (this._activeTrigger[tL] = !1),
                            (this._activeTrigger[t_] = !1),
                            i(this.tip).hasClass(tk))
                        ) {
                            var a = h.getTransitionDurationFromElement(s);
                            i(s).one(h.TRANSITION_END, r).emulateTransitionEnd(a);
                        } else r();
                        this._hoverState = "";
                    }
                }),
                (s.update = function () {
                    null !== this._popper && this._popper.scheduleUpdate();
                }),
                (s.isWithContent = function () {
                    return Boolean(this.getTitle());
                }),
                (s.addAttachmentClass = function (e) {
                    i(this.getTipElement()).addClass("bs-tooltip-" + e);
                }),
                (s.getTipElement = function () {
                    return (this.tip = this.tip || i(this.config.template)[0]), this.tip;
                }),
                (s.setContent = function () {
                    var e = this.getTipElement();
                    this.setElementContent(i(e.querySelectorAll(".tooltip-inner")), this.getTitle()), i(e).removeClass(tk + " " + tO);
                }),
                (s.setElementContent = function (e, n) {
                    "object" == typeof n && (n.nodeType || n.jquery)
                        ? this.config.html
                            ? i(n).parent().is(e) || e.empty().append(n)
                            : e.text(i(n).text())
                        : this.config.html
                        ? (this.config.sanitize && (n = tE(n, this.config.whiteList, this.config.sanitizeFn)), e.html(n))
                        : e.text(n);
                }),
                (s.getTitle = function () {
                    var e = this.element.getAttribute("data-original-title");
                    return e || (e = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), e;
                }),
                (s._getPopperConfig = function (e) {
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
                (s._getOffset = function () {
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
                (s._getContainer = function () {
                    return !1 === this.config.container ? document.body : h.isElement(this.config.container) ? i(this.config.container) : i(document).find(this.config.container);
                }),
                (s._getAttachment = function (e) {
                    return t$[e.toUpperCase()];
                }),
                (s._setListeners = function () {
                    var e = this;
                    this.config.trigger.split(" ").forEach(function (n) {
                        if ("click" === n)
                            i(e.element).on(e.constructor.Event.CLICK, e.config.selector, function (i) {
                                return e.toggle(i);
                            });
                        else if ("manual" !== n) {
                            var s = n === t_ ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
                                o = n === t_ ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
                            i(e.element)
                                .on(s, e.config.selector, function (i) {
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
                (s._fixTitle = function () {
                    var e = typeof this.element.getAttribute("data-original-title");
                    (this.element.getAttribute("title") || "string" !== e) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""));
                }),
                (s._enter = function (e, n) {
                    var s = this.constructor.DATA_KEY;
                    (n = n || i(e.currentTarget).data(s)) || ((n = new this.constructor(e.currentTarget, this._getDelegateConfig())), i(e.currentTarget).data(s, n)),
                        e && (n._activeTrigger["focusin" === e.type ? tL : t_] = !0),
                        i(n.getTipElement()).hasClass(tO) || n._hoverState === tI
                            ? (n._hoverState = tI)
                            : (clearTimeout(n._timeout),
                              (n._hoverState = tI),
                              n.config.delay && n.config.delay.show
                                  ? (n._timeout = setTimeout(function () {
                                        n._hoverState === tI && n.show();
                                    }, n.config.delay.show))
                                  : n.show());
                }),
                (s._leave = function (e, n) {
                    var s = this.constructor.DATA_KEY;
                    (n = n || i(e.currentTarget).data(s)) || ((n = new this.constructor(e.currentTarget, this._getDelegateConfig())), i(e.currentTarget).data(s, n)),
                        e && (n._activeTrigger["focusout" === e.type ? tL : t_] = !1),
                        n._isWithActiveTrigger() ||
                            (clearTimeout(n._timeout),
                            (n._hoverState = "out"),
                            n.config.delay && n.config.delay.hide
                                ? (n._timeout = setTimeout(function () {
                                      "out" === n._hoverState && n.hide();
                                  }, n.config.delay.hide))
                                : n.hide());
                }),
                (s._isWithActiveTrigger = function () {
                    for (var e in this._activeTrigger) if (this._activeTrigger[e]) return !0;
                    return !1;
                }),
                (s._getConfig = function (e) {
                    var n = i(this.element).data();
                    return (
                        Object.keys(n).forEach(function (e) {
                            -1 !== tS.indexOf(e) && delete n[e];
                        }),
                        "number" == typeof (e = l({}, this.constructor.Default, {}, n, {}, "object" == typeof e && e ? e : {})).delay && (e.delay = { show: e.delay, hide: e.delay }),
                        "number" == typeof e.title && (e.title = e.title.toString()),
                        "number" == typeof e.content && (e.content = e.content.toString()),
                        h.typeCheckConfig(tT, e, this.constructor.DefaultType),
                        e.sanitize && (e.template = tE(e.template, e.whiteList, e.sanitizeFn)),
                        e
                    );
                }),
                (s._getDelegateConfig = function () {
                    var e = {};
                    if (this.config) for (var i in this.config) this.constructor.Default[i] !== this.config[i] && (e[i] = this.config[i]);
                    return e;
                }),
                (s._cleanTipClass = function () {
                    var e = i(this.getTipElement()),
                        n = e.attr("class").match(tw);
                    null !== n && n.length && e.removeClass(n.join(""));
                }),
                (s._handlePopperPlacementChange = function (e) {
                    var i = e.instance;
                    (this.tip = i.popper), this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(e.placement));
                }),
                (s._fixTransition = function () {
                    var e = this.getTipElement(),
                        n = this.config.animation;
                    null === e.getAttribute("x-placement") && (i(e).removeClass(tk), (this.config.animation = !1), this.hide(), this.show(), (this.config.animation = n));
                }),
                (e._jQueryInterface = function (n) {
                    return this.each(function () {
                        var s = i(this).data("bs.tooltip");
                        if ((s || !/dispose|hide/.test(n)) && (s || ((s = new e(this, "object" == typeof n && n)), i(this).data("bs.tooltip", s)), "string" == typeof n)) {
                            if (void 0 === s[n]) throw TypeError('No method named "' + n + '"');
                            s[n]();
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
                            return tD;
                        },
                    },
                    {
                        key: "NAME",
                        get: function () {
                            return tT;
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
                            return tN;
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
                            return tA;
                        },
                    },
                ]),
                e
            );
        })();
    (i.fn.tooltip = tx._jQueryInterface),
        (i.fn.tooltip.Constructor = tx),
        (i.fn.tooltip.noConflict = function () {
            return (i.fn.tooltip = tC), tx._jQueryInterface;
        });
    var tP = i.fn.popover,
        tj = RegExp("(^|\\s)bs-popover\\S+", "g"),
        tR = l({}, tx.Default, { placement: "right", trigger: "click", content: "", template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>' }),
        tq = l({}, tx.DefaultType, { content: "(string|element|function)" }),
        tF = {
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
        tM = (function (e) {
            function n() {
                return e.apply(this, arguments) || this;
            }
            (r = e), ((s = n).prototype = Object.create(r.prototype)), (s.prototype.constructor = s), (s.__proto__ = r);
            var s,
                r,
                a = n.prototype;
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
                    var n = this._getContent();
                    "function" == typeof n && (n = n.call(this.element)), this.setElementContent(e.find(".popover-body"), n), e.removeClass("fade show");
                }),
                (a._getContent = function () {
                    return this.element.getAttribute("data-content") || this.config.content;
                }),
                (a._cleanTipClass = function () {
                    var e = i(this.getTipElement()),
                        n = e.attr("class").match(tj);
                    null !== n && n.length > 0 && e.removeClass(n.join(""));
                }),
                (n._jQueryInterface = function (e) {
                    return this.each(function () {
                        var s = i(this).data("bs.popover");
                        if ((s || !/dispose|hide/.test(e)) && (s || ((s = new n(this, "object" == typeof e ? e : null)), i(this).data("bs.popover", s)), "string" == typeof e)) {
                            if (void 0 === s[e]) throw TypeError('No method named "' + e + '"');
                            s[e]();
                        }
                    });
                }),
                o(n, null, [
                    {
                        key: "VERSION",
                        get: function () {
                            return "5.1";
                        },
                    },
                    {
                        key: "Default",
                        get: function () {
                            return tR;
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
                            return tF;
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
                            return tq;
                        },
                    },
                ]),
                n
            );
        })(tx);
    (i.fn.popover = tM._jQueryInterface),
        (i.fn.popover.Constructor = tM),
        (i.fn.popover.noConflict = function () {
            return (i.fn.popover = tP), tM._jQueryInterface;
        });
    var tQ = "scrollspy",
        t9 = i.fn[tQ],
        tH = { offset: 10, method: "auto", target: "" },
        tV = { offset: "number", method: "string", target: "(string|element)" },
        tB = { ACTIVATE: "activate.bs.scrollspy", SCROLL: "scroll.bs.scrollspy", LOAD_DATA_API: "load.bs.scrollspy.data-api" },
        tU = "active",
        tW = {
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
        tz = "position",
        t3 = (function () {
            function e(e, n) {
                var s = this;
                (this._element = e),
                    (this._scrollElement = "BODY" === e.tagName ? window : e),
                    (this._config = this._getConfig(n)),
                    (this._selector = this._config.target + " " + tW.NAV_LINKS + "," + this._config.target + " " + tW.LIST_ITEMS + "," + this._config.target + " " + tW.DROPDOWN_ITEMS),
                    (this._offsets = []),
                    (this._targets = []),
                    (this._activeTarget = null),
                    (this._scrollHeight = 0),
                    i(this._scrollElement).on(tB.SCROLL, function (e) {
                        return s._process(e);
                    }),
                    this.refresh(),
                    this._process();
            }
            var n = e.prototype;
            return (
                (n.refresh = function () {
                    var e = this,
                        n = this._scrollElement === this._scrollElement.window ? "offset" : tz,
                        s = "auto" === this._config.method ? n : this._config.method,
                        o = s === tz ? this._getScrollTop() : 0;
                    (this._offsets = []),
                        (this._targets = []),
                        (this._scrollHeight = this._getScrollHeight()),
                        [].slice
                            .call(document.querySelectorAll(this._selector))
                            .map(function (e) {
                                var n,
                                    r = h.getSelectorFromElement(e);
                                if ((r && (n = document.querySelector(r)), n)) {
                                    var a = n.getBoundingClientRect();
                                    if (a.width || a.height) return [i(n)[s]().top + o, r];
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
                (n.dispose = function () {
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
                (n._getConfig = function (e) {
                    if ("string" != typeof (e = l({}, tH, {}, "object" == typeof e && e ? e : {})).target) {
                        var n = i(e.target).attr("id");
                        n || ((n = h.getUID(tQ)), i(e.target).attr("id", n)), (e.target = "#" + n);
                    }
                    return h.typeCheckConfig(tQ, e, tV), e;
                }),
                (n._getScrollTop = function () {
                    return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
                }),
                (n._getScrollHeight = function () {
                    return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
                }),
                (n._getOffsetHeight = function () {
                    return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
                }),
                (n._process = function () {
                    var e = this._getScrollTop() + this._config.offset,
                        i = this._getScrollHeight(),
                        n = this._config.offset + i - this._getOffsetHeight();
                    if ((this._scrollHeight !== i && this.refresh(), e >= n)) {
                        var s = this._targets[this._targets.length - 1];
                        this._activeTarget !== s && this._activate(s);
                    } else {
                        if (this._activeTarget && e < this._offsets[0] && this._offsets[0] > 0) return (this._activeTarget = null), void this._clear();
                        for (var o = this._offsets.length; o--; ) this._activeTarget !== this._targets[o] && e >= this._offsets[o] && (void 0 === this._offsets[o + 1] || e < this._offsets[o + 1]) && this._activate(this._targets[o]);
                    }
                }),
                (n._activate = function (e) {
                    (this._activeTarget = e), this._clear();
                    var n = this._selector.split(",").map(function (i) {
                            return i + '[data-target="' + e + '"],' + i + '[href="' + e + '"]';
                        }),
                        s = i([].slice.call(document.querySelectorAll(n.join(","))));
                    s.hasClass("dropdown-item")
                        ? (s.closest(tW.DROPDOWN).find(tW.DROPDOWN_TOGGLE).addClass(tU), s.addClass(tU))
                        : (s.addClass(tU),
                          s
                              .parents(tW.NAV_LIST_GROUP)
                              .prev(tW.NAV_LINKS + ", " + tW.LIST_ITEMS)
                              .addClass(tU),
                          s.parents(tW.NAV_LIST_GROUP).prev(tW.NAV_ITEMS).children(tW.NAV_LINKS).addClass(tU)),
                        i(this._scrollElement).trigger(tB.ACTIVATE, { relatedTarget: e });
                }),
                (n._clear = function () {
                    [].slice
                        .call(document.querySelectorAll(this._selector))
                        .filter(function (e) {
                            return e.classList.contains(tU);
                        })
                        .forEach(function (e) {
                            return e.classList.remove(tU);
                        });
                }),
                (e._jQueryInterface = function (n) {
                    return this.each(function () {
                        var s = i(this).data("bs.scrollspy");
                        if ((s || ((s = new e(this, "object" == typeof n && n)), i(this).data("bs.scrollspy", s)), "string" == typeof n)) {
                            if (void 0 === s[n]) throw TypeError('No method named "' + n + '"');
                            s[n]();
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
                            return tH;
                        },
                    },
                ]),
                e
            );
        })();
    i(window).on(tB.LOAD_DATA_API, function () {
        for (var e = [].slice.call(document.querySelectorAll(tW.DATA_SPY)), n = e.length; n--; ) {
            var s = i(e[n]);
            t3._jQueryInterface.call(s, s.data());
        }
    }),
        (i.fn[tQ] = t3._jQueryInterface),
        (i.fn[tQ].Constructor = t3),
        (i.fn[tQ].noConflict = function () {
            return (i.fn[tQ] = t9), t3._jQueryInterface;
        });
    var tG = i.fn.tab,
        tK = "active",
        tX = ".active",
        tY = "> li > .active",
        t0 = (function () {
            function e(e) {
                this._element = e;
            }
            var n = e.prototype;
            return (
                (n.show = function () {
                    var e = this;
                    if (!((this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && i(this._element).hasClass(tK)) || i(this._element).hasClass("disabled"))) {
                        var n,
                            s,
                            o = i(this._element).closest(".nav, .list-group")[0],
                            r = h.getSelectorFromElement(this._element);
                        if (o) {
                            var a = "UL" === o.nodeName || "OL" === o.nodeName ? tY : tX;
                            s = (s = i.makeArray(i(o).find(a)))[s.length - 1];
                        }
                        var l = i.Event("hide.bs.tab", { relatedTarget: this._element }),
                            c = i.Event("show.bs.tab", { relatedTarget: s });
                        if ((s && i(s).trigger(l), i(this._element).trigger(c), !c.isDefaultPrevented() && !l.isDefaultPrevented())) {
                            r && (n = document.querySelector(r)), this._activate(this._element, o);
                            var u = function () {
                                var n = i.Event("hidden.bs.tab", { relatedTarget: e._element }),
                                    o = i.Event("shown.bs.tab", { relatedTarget: s });
                                i(s).trigger(n), i(e._element).trigger(o);
                            };
                            n ? this._activate(n, n.parentNode, u) : u();
                        }
                    }
                }),
                (n.dispose = function () {
                    i.removeData(this._element, "bs.tab"), (this._element = null);
                }),
                (n._activate = function (e, n, s) {
                    var o = this,
                        r = (n && ("UL" === n.nodeName || "OL" === n.nodeName) ? i(n).find(tY) : i(n).children(tX))[0],
                        a = s && r && i(r).hasClass("fade"),
                        l = function () {
                            return o._transitionComplete(e, r, s);
                        };
                    if (r && a) {
                        var c = h.getTransitionDurationFromElement(r);
                        i(r).removeClass("show").one(h.TRANSITION_END, l).emulateTransitionEnd(c);
                    } else l();
                }),
                (n._transitionComplete = function (e, n, s) {
                    if (n) {
                        i(n).removeClass(tK);
                        var o = i(n.parentNode).find("> .dropdown-menu .active")[0];
                        o && i(o).removeClass(tK), "tab" === n.getAttribute("role") && n.setAttribute("aria-selected", !1);
                    }
                    if (
                        (i(e).addClass(tK),
                        "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0),
                        h.reflow(e),
                        e.classList.contains("fade") && e.classList.add("show"),
                        e.parentNode && i(e.parentNode).hasClass("dropdown-menu"))
                    ) {
                        var r = i(e).closest(".dropdown")[0];
                        r && i([].slice.call(r.querySelectorAll(".dropdown-toggle"))).addClass(tK), e.setAttribute("aria-expanded", !0);
                    }
                    s && s();
                }),
                (e._jQueryInterface = function (n) {
                    return this.each(function () {
                        var s = i(this),
                            o = s.data("bs.tab");
                        if ((o || ((o = new e(this)), s.data("bs.tab", o)), "string" == typeof n)) {
                            if (void 0 === o[n]) throw TypeError('No method named "' + n + '"');
                            o[n]();
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
        e.preventDefault(), t0._jQueryInterface.call(i(this), "show");
    }),
        (i.fn.tab = t0._jQueryInterface),
        (i.fn.tab.Constructor = t0),
        (i.fn.tab.noConflict = function () {
            return (i.fn.tab = tG), t0._jQueryInterface;
        });
    var t1 = i.fn.toast,
        t2 = "click.dismiss.bs.toast",
        t4 = "show",
        t5 = "showing",
        t7 = { animation: "boolean", autohide: "boolean", delay: "number" },
        t6 = { animation: !0, autohide: !0, delay: 500 },
        tJ = (function () {
            function e(e, i) {
                (this._element = e), (this._config = this._getConfig(i)), (this._timeout = null), this._setListeners();
            }
            var n = e.prototype;
            return (
                (n.show = function () {
                    var e = this,
                        n = i.Event("show.bs.toast");
                    if ((i(this._element).trigger(n), !n.isDefaultPrevented())) {
                        this._config.animation && this._element.classList.add("fade");
                        var s = function () {
                            e._element.classList.remove(t5),
                                e._element.classList.add(t4),
                                i(e._element).trigger("shown.bs.toast"),
                                e._config.autohide &&
                                    (e._timeout = setTimeout(function () {
                                        e.hide();
                                    }, e._config.delay));
                        };
                        if ((this._element.classList.remove("hide"), h.reflow(this._element), this._element.classList.add(t5), this._config.animation)) {
                            var o = h.getTransitionDurationFromElement(this._element);
                            i(this._element).one(h.TRANSITION_END, s).emulateTransitionEnd(o);
                        } else s();
                    }
                }),
                (n.hide = function () {
                    if (this._element.classList.contains(t4)) {
                        var e = i.Event("hide.bs.toast");
                        i(this._element).trigger(e), e.isDefaultPrevented() || this._close();
                    }
                }),
                (n.dispose = function () {
                    clearTimeout(this._timeout),
                        (this._timeout = null),
                        this._element.classList.contains(t4) && this._element.classList.remove(t4),
                        i(this._element).off(t2),
                        i.removeData(this._element, "bs.toast"),
                        (this._element = null),
                        (this._config = null);
                }),
                (n._getConfig = function (e) {
                    return (e = l({}, t6, {}, i(this._element).data(), {}, "object" == typeof e && e ? e : {})), h.typeCheckConfig("toast", e, this.constructor.DefaultType), e;
                }),
                (n._setListeners = function () {
                    var e = this;
                    i(this._element).on(t2, '[data-dismiss="toast"]', function () {
                        return e.hide();
                    });
                }),
                (n._close = function () {
                    var e = this,
                        n = function () {
                            e._element.classList.add("hide"), i(e._element).trigger("hidden.bs.toast");
                        };
                    if ((this._element.classList.remove(t4), this._config.animation)) {
                        var s = h.getTransitionDurationFromElement(this._element);
                        i(this._element).one(h.TRANSITION_END, n).emulateTransitionEnd(s);
                    } else n();
                }),
                (e._jQueryInterface = function (n) {
                    return this.each(function () {
                        var s = i(this),
                            o = s.data("bs.toast");
                        if ((o || ((o = new e(this, "object" == typeof n && n)), s.data("bs.toast", o)), "string" == typeof n)) {
                            if (void 0 === o[n]) throw TypeError('No method named "' + n + '"');
                            o[n](this);
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
                            return t7;
                        },
                    },
                    {
                        key: "Default",
                        get: function () {
                            return t6;
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
            var e, n, s, o;
            i(".ripple-effect").click(function (r) {
                0 === i(this).find(".ink").length && i(this).prepend("<span class='ink'></span>"),
                    (e = i(this).find(".ink")).removeClass("animate"),
                    e.height() || e.width() || ((n = Math.max(i(this).outerWidth(), i(this).outerHeight())), e.css({ height: n, width: n })),
                    (s = r.pageX - i(this).offset().left - e.width() / 2),
                    (o = r.pageY - i(this).offset().top - e.height() / 2),
                    e.css({ top: o + "px", left: s + "px" }).addClass("animate");
            });
        }),
        (i.fn.toast = tJ._jQueryInterface),
        (i.fn.toast.Constructor = tJ),
        (i.fn.toast.noConflict = function () {
            return (i.fn.toast = t1), tJ._jQueryInterface;
        }),
        (e.Alert = f),
        (e.Button = y),
        (e.Carousel = k),
        (e.Collapse = M),
        (e.Dropdown = te),
        (e.Modal = t8),
        (e.Popover = tM),
        (e.Scrollspy = t3),
        (e.Tab = t0),
        (e.Toast = tJ),
        (e.Tooltip = tx),
        (e.Util = h),
        Object.defineProperty(e, "__esModule", { value: !0 });
}),
    (function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery);
    })(function (e) {
        function i(i, s, o) {
            var r,
                a,
                l = { content: { message: "object" == typeof s ? s.message : s, title: s.title ? s.title : "", icon: s.icon ? s.icon : "", url: s.url ? s.url : "#", target: s.target ? s.target : "-" } };
            (o = e.extend(!0, {}, l, o)),
                (this.settings = e.extend(!0, {}, n, o)),
                (this._defaults = n),
                "-" === this.settings.content.target && (this.settings.content.target = this.settings.url_target),
                (this.animations = { start: "webkitAnimationStart oanimationstart MSAnimationStart animationstart", end: "webkitAnimationEnd oanimationend MSAnimationEnd animationend" }),
                "number" == typeof this.settings.offset && (this.settings.offset = { x: this.settings.offset, y: this.settings.offset }),
                (!this.settings.allow_duplicates &&
                    (this.settings.allow_duplicates ||
                        ((r = this),
                        (a = !1),
                        e('[data-notify="container"]').each(function (i, n) {
                            var s = e(n),
                                o = s.find('[data-notify="title"]').text().trim(),
                                l = s.find('[data-notify="message"]').html().trim(),
                                c =
                                    o ===
                                    e("<div>" + r.settings.content.title + "</div>")
                                        .html()
                                        .trim(),
                                h =
                                    l ===
                                    e("<div>" + r.settings.content.message + "</div>")
                                        .html()
                                        .trim(),
                                u = s.hasClass("alert-" + r.settings.type);
                            return c && h && u && (a = !0), !a;
                        }),
                        a))) ||
                    this.init();
        }
        var n = {
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
                            update: function (i, n) {
                                var s = {};
                                for (var o in ("string" == typeof i ? (s[i] = n) : (s = i), s))
                                    switch (o) {
                                        case "type":
                                            this.$ele.removeClass("alert-" + e.settings.type),
                                                this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass("progress-bar-" + e.settings.type),
                                                (e.settings.type = s[o]),
                                                this.$ele
                                                    .addClass("alert-" + s[o])
                                                    .find('[data-notify="progressbar"] > .progress-bar')
                                                    .addClass("progress-bar-" + s[o]);
                                            break;
                                        case "icon":
                                            var r = this.$ele.find('[data-notify="icon"]');
                                            "class" === e.settings.icon_type.toLowerCase() ? r.removeClass(e.settings.content.icon).addClass(s[o]) : (r.is("img") || r.find("img"), r.attr("src", s[o]));
                                            break;
                                        case "progress":
                                            var a = e.settings.delay - e.settings.delay * (s[o] / 100);
                                            this.$ele.data("notify-delay", a),
                                                this.$ele
                                                    .find('[data-notify="progressbar"] > div')
                                                    .attr("aria-valuenow", s[o])
                                                    .css("width", s[o] + "%");
                                            break;
                                        case "url":
                                            this.$ele.find('[data-notify="url"]').attr("href", s[o]);
                                            break;
                                        case "target":
                                            this.$ele.find('[data-notify="url"]').attr("target", s[o]);
                                            break;
                                        default:
                                            this.$ele.find('[data-notify="' + o + '"]').html(s[o]);
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
                        n = this.settings.offset.y,
                        s = {
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
                            n = Math.max(n, parseInt(e(this).css(r.placement.from)) + parseInt(e(this).outerHeight()) + parseInt(r.spacing));
                        }),
                        !0 === this.settings.newest_on_top && (n = this.settings.offset.y),
                        (s[this.settings.placement.from] = n + "px"),
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
                        e.each(["webkit-", "moz-", "o-", "ms-", ""], function (e, n) {
                            i.$ele[0].style[n + "AnimationIterationCount"] = 1;
                        }),
                        e(this.settings.element).append(this.$ele),
                        !0 === this.settings.newest_on_top && ((n = parseInt(n) + parseInt(this.settings.spacing) + this.$ele.outerHeight()), this.reposition(n)),
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
                        var n = setInterval(function () {
                            var e = parseInt(i.$ele.data("notify-delay")) - i.settings.timer;
                            if (("false" === i.$ele.data("data-hover") && "pause" === i.settings.mouse_over) || "pause" != i.settings.mouse_over) {
                                var s = ((i.settings.delay - e) / i.settings.delay) * 100;
                                i.$ele.data("notify-delay", e),
                                    i.$ele
                                        .find('[data-notify="progressbar"] > div')
                                        .attr("aria-valuenow", s)
                                        .css("width", s + "%");
                            }
                            e <= -i.settings.timer && (clearInterval(n), i.close());
                        }, i.settings.timer);
                    }
                },
                close: function () {
                    var i = this,
                        n = parseInt(this.$ele.css(this.settings.placement.from)),
                        s = !1;
                    this.$ele.attr("data-closing", "true").addClass(this.settings.animate.exit),
                        i.reposition(n),
                        e.isFunction(i.settings.onClose) && i.settings.onClose.call(this.$ele),
                        this.$ele
                            .one(this.animations.start, function () {
                                s = !0;
                            })
                            .one(this.animations.end, function () {
                                e(this).remove(), e.isFunction(i.settings.onClosed) && i.settings.onClosed.call(this);
                            }),
                        setTimeout(function () {
                            s || (i.$ele.remove(), i.settings.onClosed && i.settings.onClosed(i.$ele));
                        }, 600);
                },
                reposition: function (i) {
                    var n = this,
                        s = '[data-notify-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])',
                        o = this.$ele.nextAll(s);
                    !0 === this.settings.newest_on_top && (o = this.$ele.prevAll(s)),
                        o.each(function () {
                            e(this).css(n.settings.placement.from, i), (i = parseInt(i) + parseInt(n.settings.spacing) + e(this).outerHeight());
                        });
                },
            }),
            (e.notify = function (e, n) {
                return new i(this, e, n).notify;
            }),
            (e.notifyDefaults = function (i) {
                return (n = e.extend(!0, {}, n, i));
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
        n = $(this).data("src");
    }),
    $("#videoModal").on("shown.bs.modal", function (e) {
        $("#video").attr("src", n + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    }),
    $("#videoModal").on("hide.bs.modal", function (e) {
        $("#video").attr("src", n);
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
    var n,
        s = document.querySelector(".navbar-toggler-icon");
    s.addEventListener("click", function () {
        s.classList.toggle("open");
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
            n = e.substr(showChar, e.length - showChar);
        $(this).html(i + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + n + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + "</a></span>");
    }
}),

!function(t,e,i,s){function n(e,i){this.settings=null,this.options=t.extend({},n.Defaults,i),this.$element=t(e),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},t.each(["onResize","onThrottledResize"],t.proxy(function(e,i){this._handlers[i]=t.proxy(this[i],this)},this)),t.each(n.Plugins,t.proxy(function(t,e){this._plugins[t.charAt(0).toLowerCase()+t.slice(1)]=new e(this)},this)),t.each(n.Workers,t.proxy(function(e,i){this._pipe.push({filter:i.filter,run:t.proxy(i.run,this)})},this)),this.setup(),this.initialize()}n.Defaults={items:3,loop:!1,center:!1,rewind:!1,checkVisibility:!0,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:e,fallbackEasing:"swing",slideTransition:"",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"},n.Width={Default:"default",Inner:"inner",Outer:"outer"},n.Type={Event:"event",State:"state"},n.Plugins={},n.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(t){t.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(t){var e=this.settings.margin||"",i=!this.settings.autoWidth,s=this.settings.rtl,n={width:"auto","margin-left":s?e:"","margin-right":s?"":e};i||this.$stage.children().css(n),t.css=n}},{filter:["width","items","settings"],run:function(t){var e=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,i=null,s=this._items.length,n=!this.settings.autoWidth,o=[];for(t.items={merge:!1,width:e};s--;)i=this._mergers[s],i=this.settings.mergeFit&&Math.min(i,this.settings.items)||i,t.items.merge=i>1||t.items.merge,o[s]=n?e*i:this._items[s].width();this._widths=o}},{filter:["items","settings"],run:function(){var e=[],i=this._items,s=this.settings,n=Math.max(2*s.items,4),o=2*Math.ceil(i.length/2),r=s.loop&&i.length?s.rewind?n:Math.max(n,o):0,a="",h="";for(r/=2;r>0;)e.push(this.normalize(e.length/2,!0)),a+=i[e[e.length-1]][0].outerHTML,e.push(this.normalize(i.length-1-(e.length-1)/2,!0)),h=i[e[e.length-1]][0].outerHTML+h,r-=1;this._clones=e,t(a).addClass("cloned").appendTo(this.$stage),t(h).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var t=this.settings.rtl?1:-1,e=this._clones.length+this._items.length,i=-1,s=0,n=0,o=[];++i<e;)s=o[i-1]||0,o.push(s+(n=this._widths[this.relative(i)]+this.settings.margin)*t);this._coordinates=o}},{filter:["width","items","settings"],run:function(){var t=this.settings.stagePadding,e=this._coordinates,i={width:Math.ceil(Math.abs(e[e.length-1]))+2*t,"padding-left":t||"","padding-right":t||""};this.$stage.css(i)}},{filter:["width","items","settings"],run:function(t){var e=this._coordinates.length,i=!this.settings.autoWidth,s=this.$stage.children();if(i&&t.items.merge)for(;e--;)t.css.width=this._widths[this.relative(e)],s.eq(e).css(t.css);else i&&(t.css.width=t.items.width,s.css(t.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(t){t.current=t.current?this.$stage.children().index(t.current):0,t.current=Math.max(this.minimum(),Math.min(this.maximum(),t.current)),this.reset(t.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var t,e,i,s,n=this.settings.rtl?1:-1,o=2*this.settings.stagePadding,r=this.coordinates(this.current())+o,a=r+this.width()*n,h=[];for(i=0,s=this._coordinates.length;i<s;i++)t=this._coordinates[i-1]||0,e=Math.abs(this._coordinates[i])+o*n,(this.op(t,"<=",r)&&this.op(t,">",a)||this.op(e,"<",r)&&this.op(e,">",a))&&h.push(i);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+h.join("), :eq(")+")").addClass("active"),this.$stage.children(".center").removeClass("center"),this.settings.center&&this.$stage.children().eq(this.current()).addClass("center")}}],n.prototype.initializeStage=function(){this.$stage=this.$element.find("."+this.settings.stageClass),!this.$stage.length&&(this.$element.addClass(this.options.loadingClass),this.$stage=t("<"+this.settings.stageElement+">",{class:this.settings.stageClass}).wrap(t("<div/>",{class:this.settings.stageOuterClass})),this.$element.append(this.$stage.parent()))},n.prototype.initializeItems=function(){var e=this.$element.find(".owl-item");if(e.length){this._items=e.get().map(function(e){return t(e)}),this._mergers=this._items.map(function(){return 1}),this.refresh();return}this.replace(this.$element.children().not(this.$stage.parent())),this.isVisible()?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)},n.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var t,e,i;t=this.$element.find("img"),e=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:s,i=this.$element.children(e).width(),t.length&&i<=0&&this.preloadAutoWidthImages(t)}this.initializeStage(),this.initializeItems(),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},n.prototype.isVisible=function(){return!this.settings.checkVisibility||this.$element.is(":visible")},n.prototype.setup=function(){var e=this.viewport(),i=this.options.responsive,s=-1,n=null;i?(t.each(i,function(t){t<=e&&t>s&&(s=Number(t))}),"function"==typeof(n=t.extend({},this.options,i[s])).stagePadding&&(n.stagePadding=n.stagePadding()),delete n.responsive,n.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+s))):n=t.extend({},this.options),this.trigger("change",{property:{name:"settings",value:n}}),this._breakpoint=s,this.settings=n,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}})},n.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},n.prototype.prepare=function(e){var i=this.trigger("prepare",{content:e});return i.data||(i.data=t("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(e)),this.trigger("prepared",{content:i.data}),i.data},n.prototype.update=function(){for(var e=0,i=this._pipe.length,s=t.proxy(function(t){return this[t]},this._invalidated),n={};e<i;)(this._invalidated.all||t.grep(this._pipe[e].filter,s).length>0)&&this._pipe[e].run(n),e++;this._invalidated={},this.is("valid")||this.enter("valid")},n.prototype.width=function(t){switch(t=t||n.Width.Default){case n.Width.Inner:case n.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},n.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},n.prototype.onThrottledResize=function(){e.clearTimeout(this.resizeTimer),this.resizeTimer=e.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},n.prototype.onResize=function(){return!!(this._items.length&&this._width!==this.$element.width()&&this.isVisible())&&((this.enter("resizing"),this.trigger("resize").isDefaultPrevented())?(this.leave("resizing"),!1):void(this.invalidate("width"),this.refresh(),this.leave("resizing"),this.trigger("resized")))},n.prototype.registerEventHandlers=function(){t.support.transition&&this.$stage.on(t.support.transition.end+".owl.core",t.proxy(this.onTransitionEnd,this)),!1!==this.settings.responsive&&this.on(e,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",t.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",t.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",t.proxy(this.onDragEnd,this)))},n.prototype.onDragStart=function(e){var s=null;3!==e.which&&(t.support.transform?s={x:(s=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","))[16===s.length?12:4],y:s[16===s.length?13:5]}:(s=this.$stage.position(),s={x:this.settings.rtl?s.left+this.$stage.width()-this.width()+this.settings.margin:s.left,y:s.top}),this.is("animating")&&(t.support.transform?this.animate(s.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===e.type),this.speed(0),this._drag.time=new Date().getTime(),this._drag.target=t(e.target),this._drag.stage.start=s,this._drag.stage.current=s,this._drag.pointer=this.pointer(e),t(i).on("mouseup.owl.core touchend.owl.core",t.proxy(this.onDragEnd,this)),t(i).one("mousemove.owl.core touchmove.owl.core",t.proxy(function(e){var s=this.difference(this._drag.pointer,this.pointer(e));t(i).on("mousemove.owl.core touchmove.owl.core",t.proxy(this.onDragMove,this)),!(Math.abs(s.x)<Math.abs(s.y)&&this.is("valid"))&&(e.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},n.prototype.onDragMove=function(t){var e=null,i=null,s=null,n=this.difference(this._drag.pointer,this.pointer(t)),o=this.difference(this._drag.stage.start,n);this.is("dragging")&&(t.preventDefault(),this.settings.loop?(e=this.coordinates(this.minimum()),i=this.coordinates(this.maximum()+1)-e,o.x=((o.x-e)%i+i)%i+e):(e=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum()),i=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum()),s=this.settings.pullDrag?-1*n.x/5:0,o.x=Math.max(Math.min(o.x,e+s),i+s)),this._drag.stage.current=o,this.animate(o.x))},n.prototype.onDragEnd=function(e){var s=this.difference(this._drag.pointer,this.pointer(e)),n=this._drag.stage.current,o=s.x>0^this.settings.rtl?"left":"right";t(i).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==s.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(n.x,0!==s.x?o:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=o,(Math.abs(s.x)>3||new Date().getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},n.prototype.closest=function(e,i){var n=-1,o=this.width(),r=this.coordinates();return this.settings.freeDrag||t.each(r,t.proxy(function(t,a){return"left"===i&&e>a-30&&e<a+30?n=t:"right"===i&&e>a-o-30&&e<a-o+30?n=t+1:this.op(e,"<",a)&&this.op(e,">",s!==r[t+1]?r[t+1]:a-o)&&(n="left"===i?t+1:t),-1===n},this)),!this.settings.loop&&(this.op(e,">",r[this.minimum()])?n=e=this.minimum():this.op(e,"<",r[this.maximum()])&&(n=e=this.maximum())),n},n.prototype.animate=function(e){var i=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),i&&(this.enter("animating"),this.trigger("translate")),t.support.transform3d&&t.support.transition?this.$stage.css({transform:"translate3d("+e+"px,0px,0px)",transition:this.speed()/1e3+"s"+(this.settings.slideTransition?" "+this.settings.slideTransition:"")}):i?this.$stage.animate({left:e+"px"},this.speed(),this.settings.fallbackEasing,t.proxy(this.onTransitionEnd,this)):this.$stage.css({left:e+"px"})},n.prototype.is=function(t){return this._states.current[t]&&this._states.current[t]>0},n.prototype.current=function(t){if(t===s)return this._current;if(0!==this._items.length){if(t=this.normalize(t),this._current!==t){var e=this.trigger("change",{property:{name:"position",value:t}});s!==e.data&&(t=this.normalize(e.data)),this._current=t,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current}},n.prototype.invalidate=function(e){return"string"===t.type(e)&&(this._invalidated[e]=!0,this.is("valid")&&this.leave("valid")),t.map(this._invalidated,function(t,e){return e})},n.prototype.reset=function(t){s!==(t=this.normalize(t))&&(this._speed=0,this._current=t,this.suppress(["translate","translated"]),this.animate(this.coordinates(t)),this.release(["translate","translated"]))},n.prototype.normalize=function(t,e){var i=this._items.length,n=e?0:this._clones.length;return!this.isNumeric(t)||i<1?t=s:(t<0||t>=i+n)&&(t=((t-n/2)%i+i)%i+n/2),t},n.prototype.relative=function(t){return t-=this._clones.length/2,this.normalize(t,!0)},n.prototype.maximum=function(t){var e,i,s,n=this.settings,o=this._coordinates.length;if(n.loop)o=this._clones.length/2+this._items.length-1;else if(n.autoWidth||n.merge){if(e=this._items.length)for(i=this._items[--e].width(),s=this.$element.width();e--&&!((i+=this._items[e].width()+this.settings.margin)>s););o=e+1}else o=n.center?this._items.length-1:this._items.length-n.items;return t&&(o-=this._clones.length/2),Math.max(o,0)},n.prototype.minimum=function(t){return t?0:this._clones.length/2},n.prototype.items=function(t){return t===s?this._items.slice():(t=this.normalize(t,!0),this._items[t])},n.prototype.mergers=function(t){return t===s?this._mergers.slice():(t=this.normalize(t,!0),this._mergers[t])},n.prototype.clones=function(e){var i=this._clones.length/2,n=i+this._items.length,o=function(t){return t%2==0?n+t/2:i-(t+1)/2};return e===s?t.map(this._clones,function(t,e){return o(e)}):t.map(this._clones,function(t,i){return t===e?o(i):null})},n.prototype.speed=function(t){return t!==s&&(this._speed=t),this._speed},n.prototype.coordinates=function(e){var i,n=1,o=e-1;return e===s?t.map(this._coordinates,t.proxy(function(t,e){return this.coordinates(e)},this)):(this.settings.center?(this.settings.rtl&&(n=-1,o=e+1),i=this._coordinates[e],i+=(this.width()-i+(this._coordinates[o]||0))/2*n):i=this._coordinates[o]||0,i=Math.ceil(i))},n.prototype.duration=function(t,e,i){return 0===i?0:Math.min(Math.max(Math.abs(e-t),1),6)*Math.abs(i||this.settings.smartSpeed)},n.prototype.to=function(t,e){var i=this.current(),s=null,n=t-this.relative(i),o=(n>0)-(n<0),r=this._items.length,a=this.minimum(),h=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(n)>r/2&&(n+=-1*o*r),(s=(((t=i+n)-a)%r+r)%r+a)!==t&&s-n<=h&&s-n>0&&(i=s-n,t=s,this.reset(i))):this.settings.rewind?(h+=1,t=(t%h+h)%h):t=Math.max(a,Math.min(h,t)),this.speed(this.duration(i,t,e)),this.current(t),this.isVisible()&&this.update()},n.prototype.next=function(t){t=t||!1,this.to(this.relative(this.current())+1,t)},n.prototype.prev=function(t){t=t||!1,this.to(this.relative(this.current())-1,t)},n.prototype.onTransitionEnd=function(t){if(t!==s&&(t.stopPropagation(),(t.target||t.srcElement||t.originalTarget)!==this.$stage.get(0)))return!1;this.leave("animating"),this.trigger("translated")},n.prototype.viewport=function(){var s;return this.options.responsiveBaseElement!==e?s=t(this.options.responsiveBaseElement).width():e.innerWidth?s=e.innerWidth:i.documentElement&&i.documentElement.clientWidth?s=i.documentElement.clientWidth:console.warn("Can not detect viewport width."),s},n.prototype.replace=function(e){this.$stage.empty(),this._items=[],e&&(e=e instanceof jQuery?e:t(e)),this.settings.nestedItemSelector&&(e=e.find("."+this.settings.nestedItemSelector)),e.filter(function(){return 1===this.nodeType}).each(t.proxy(function(t,e){e=this.prepare(e),this.$stage.append(e),this._items.push(e),this._mergers.push(1*e.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)},this)),this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},n.prototype.add=function(e,i){var n=this.relative(this._current);i=i===s?this._items.length:this.normalize(i,!0),e=e instanceof jQuery?e:t(e),this.trigger("add",{content:e,position:i}),e=this.prepare(e),0===this._items.length||i===this._items.length?(0===this._items.length&&this.$stage.append(e),0!==this._items.length&&this._items[i-1].after(e),this._items.push(e),this._mergers.push(1*e.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)):(this._items[i].before(e),this._items.splice(i,0,e),this._mergers.splice(i,0,1*e.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)),this._items[n]&&this.reset(this._items[n].index()),this.invalidate("items"),this.trigger("added",{content:e,position:i})},n.prototype.remove=function(t){s!==(t=this.normalize(t,!0))&&(this.trigger("remove",{content:this._items[t],position:t}),this._items[t].remove(),this._items.splice(t,1),this._mergers.splice(t,1),this.invalidate("items"),this.trigger("removed",{content:null,position:t}))},n.prototype.preloadAutoWidthImages=function(e){e.each(t.proxy(function(e,i){this.enter("pre-loading"),i=t(i),t(new Image).one("load",t.proxy(function(t){i.attr("src",t.target.src),i.css("opacity",1),this.leave("pre-loading"),this.is("pre-loading")||this.is("initializing")||this.refresh()},this)).attr("src",i.attr("src")||i.attr("data-src")||i.attr("data-src-retina"))},this))},n.prototype.destroy=function(){for(var s in this.$element.off(".owl.core"),this.$stage.off(".owl.core"),t(i).off(".owl.core"),!1!==this.settings.responsive&&(e.clearTimeout(this.resizeTimer),this.off(e,"resize",this._handlers.onThrottledResize)),this._plugins)this._plugins[s].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$stage.remove(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},n.prototype.op=function(t,e,i){var s=this.settings.rtl;switch(e){case"<":return s?t>i:t<i;case">":return s?t<i:t>i;case">=":return s?t<=i:t>=i;case"<=":return s?t>=i:t<=i}},n.prototype.on=function(t,e,i,s){t.addEventListener?t.addEventListener(e,i,s):t.attachEvent&&t.attachEvent("on"+e,i)},n.prototype.off=function(t,e,i,s){t.removeEventListener?t.removeEventListener(e,i,s):t.detachEvent&&t.detachEvent("on"+e,i)},n.prototype.trigger=function(e,i,s,o,r){var a={item:{count:this._items.length,index:this.current()}},h=t.camelCase(t.grep(["on",e,s],function(t){return t}).join("-").toLowerCase()),l=t.Event([e,"owl",s||"carousel"].join(".").toLowerCase(),t.extend({relatedTarget:this},a,i));return!this._supress[e]&&(t.each(this._plugins,function(t,e){e.onTrigger&&e.onTrigger(l)}),this.register({type:n.Type.Event,name:e}),this.$element.trigger(l),this.settings&&"function"==typeof this.settings[h]&&this.settings[h].call(this,l)),l},n.prototype.enter=function(e){t.each([e].concat(this._states.tags[e]||[]),t.proxy(function(t,e){s===this._states.current[e]&&(this._states.current[e]=0),this._states.current[e]++},this))},n.prototype.leave=function(e){t.each([e].concat(this._states.tags[e]||[]),t.proxy(function(t,e){this._states.current[e]--},this))},n.prototype.register=function(e){if(e.type===n.Type.Event){if(t.event.special[e.name]||(t.event.special[e.name]={}),!t.event.special[e.name].owl){var i=t.event.special[e.name]._default;t.event.special[e.name]._default=function(t){return i&&i.apply&&(!t.namespace||-1===t.namespace.indexOf("owl"))?i.apply(this,arguments):t.namespace&&t.namespace.indexOf("owl")>-1},t.event.special[e.name].owl=!0}}else e.type===n.Type.State&&(this._states.tags[e.name]?this._states.tags[e.name]=this._states.tags[e.name].concat(e.tags):this._states.tags[e.name]=e.tags,this._states.tags[e.name]=t.grep(this._states.tags[e.name],t.proxy(function(i,s){return t.inArray(i,this._states.tags[e.name])===s},this)))},n.prototype.suppress=function(e){t.each(e,t.proxy(function(t,e){this._supress[e]=!0},this))},n.prototype.release=function(e){t.each(e,t.proxy(function(t,e){delete this._supress[e]},this))},n.prototype.pointer=function(t){var i={x:null,y:null};return(t=(t=t.originalEvent||t||e.event).touches&&t.touches.length?t.touches[0]:t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:t).pageX?(i.x=t.pageX,i.y=t.pageY):(i.x=t.clientX,i.y=t.clientY),i},n.prototype.isNumeric=function(t){return!isNaN(parseFloat(t))},n.prototype.difference=function(t,e){return{x:t.x-e.x,y:t.y-e.y}},t.fn.owlCarousel=function(e){var i=Array.prototype.slice.call(arguments,1);return this.each(function(){var s=t(this),o=s.data("owl.carousel");o||(o=new n(this,"object"==typeof e&&e),s.data("owl.carousel",o),t.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(e,i){o.register({type:n.Type.Event,name:i}),o.$element.on(i+".owl.carousel.core",t.proxy(function(t){t.namespace&&t.relatedTarget!==this&&(this.suppress([i]),o[i].apply(this,[].slice.call(arguments,1)),this.release([i]))},o))})),"string"==typeof e&&"_"!==e.charAt(0)&&o[e].apply(o,i)})},t.fn.owlCarousel.Constructor=n}(window.Zepto||window.jQuery,window,document),function(t,e,i,s){var n=function(e){this._core=e,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":t.proxy(function(t){t.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=t.extend({},n.Defaults,this._core.options),this._core.$element.on(this._handlers)};n.Defaults={autoRefresh:!0,autoRefreshInterval:500},n.prototype.watch=function(){!this._interval&&(this._visible=this._core.isVisible(),this._interval=e.setInterval(t.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},n.prototype.refresh=function(){this._core.isVisible()!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},n.prototype.destroy=function(){var t,i;for(t in e.clearInterval(this._interval),this._handlers)this._core.$element.off(t,this._handlers[t]);for(i in Object.getOwnPropertyNames(this))"function"!=typeof this[i]&&(this[i]=null)},t.fn.owlCarousel.Constructor.Plugins.AutoRefresh=n}(window.Zepto||window.jQuery,window,document),function(t,e,i,s){var n=function(e){this._core=e,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel resized.owl.carousel":t.proxy(function(e){if(e.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(e.property&&"position"==e.property.name||"initialized"==e.type)){var i=this._core.settings,s=i.center&&Math.ceil(i.items/2)||i.items,n=i.center&&-1*s||0,o=(e.property&&void 0!==e.property.value?e.property.value:this._core.current())+n,r=this._core.clones().length,a=t.proxy(function(t,e){this.load(e)},this);for(i.lazyLoadEager>0&&(s+=i.lazyLoadEager,i.loop&&(o-=i.lazyLoadEager,s++));n++<s;)this.load(r/2+this._core.relative(o)),r&&t.each(this._core.clones(this._core.relative(o)),a),o++}},this)},this._core.options=t.extend({},n.Defaults,this._core.options),this._core.$element.on(this._handlers)};n.Defaults={lazyLoad:!1,lazyLoadEager:0},n.prototype.load=function(i){var s=this._core.$stage.children().eq(i),n=s&&s.find(".owl-lazy");!(!n||t.inArray(s.get(0),this._loaded)>-1)&&(n.each(t.proxy(function(i,s){var n,o=t(s),r=e.devicePixelRatio>1&&o.attr("data-src-retina")||o.attr("data-src")||o.attr("data-srcset");this._core.trigger("load",{element:o,url:r},"lazy"),o.is("img")?o.one("load.owl.lazy",t.proxy(function(){o.css("opacity",1),this._core.trigger("loaded",{element:o,url:r},"lazy")},this)).attr("src",r):o.is("source")?o.one("load.owl.lazy",t.proxy(function(){this._core.trigger("loaded",{element:o,url:r},"lazy")},this)).attr("srcset",r):((n=new Image).onload=t.proxy(function(){o.css({"background-image":'url("'+r+'")',opacity:"1"}),this._core.trigger("loaded",{element:o,url:r},"lazy")},this),n.src=r)},this)),this._loaded.push(s.get(0)))},n.prototype.destroy=function(){var t,e;for(t in this.handlers)this._core.$element.off(t,this.handlers[t]);for(e in Object.getOwnPropertyNames(this))"function"!=typeof this[e]&&(this[e]=null)},t.fn.owlCarousel.Constructor.Plugins.Lazy=n}(window.Zepto||window.jQuery,window,document),function(t,e,i,s){var n=function(i){this._core=i,this._previousHeight=null,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":t.proxy(function(t){t.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":t.proxy(function(t){t.namespace&&this._core.settings.autoHeight&&"position"===t.property.name&&this.update()},this),"loaded.owl.lazy":t.proxy(function(t){t.namespace&&this._core.settings.autoHeight&&t.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=t.extend({},n.Defaults,this._core.options),this._core.$element.on(this._handlers),this._intervalId=null;var s=this;t(e).on("load",function(){s._core.settings.autoHeight&&s.update()}),t(e).resize(function(){s._core.settings.autoHeight&&(null!=s._intervalId&&clearTimeout(s._intervalId),s._intervalId=setTimeout(function(){s.update()},250))})};n.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},n.prototype.update=function(){var e=this._core._current,i=e+this._core.settings.items,s=this._core.settings.lazyLoad,n=this._core.$stage.children().toArray().slice(e,i),o=[],r=0;t.each(n,function(e,i){o.push(t(i).height())}),(r=Math.max.apply(null,o))<=1&&s&&this._previousHeight&&(r=this._previousHeight),this._previousHeight=r,this._core.$stage.parent().height(r).addClass(this._core.settings.autoHeightClass)},n.prototype.destroy=function(){var t,e;for(t in this._handlers)this._core.$element.off(t,this._handlers[t]);for(e in Object.getOwnPropertyNames(this))"function"!=typeof this[e]&&(this[e]=null)},t.fn.owlCarousel.Constructor.Plugins.AutoHeight=n}(window.Zepto||window.jQuery,window,document),function(t,e,i,s){var n=function(e){this._core=e,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":t.proxy(function(t){t.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":t.proxy(function(t){t.namespace&&this._core.settings.video&&this.isInFullScreen()&&t.preventDefault()},this),"refreshed.owl.carousel":t.proxy(function(t){t.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .owl-video-frame").remove()},this),"changed.owl.carousel":t.proxy(function(t){t.namespace&&"position"===t.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":t.proxy(function(e){if(e.namespace){var i=t(e.content).find(".owl-video");i.length&&(i.css("display","none"),this.fetch(i,t(e.content)))}},this)},this._core.options=t.extend({},n.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",t.proxy(function(t){this.play(t)},this))};n.Defaults={video:!1,videoHeight:!1,videoWidth:!1},n.prototype.fetch=function(t,e){var i=t.attr("data-vimeo-id")?"vimeo":t.attr("data-vzaar-id")?"vzaar":"youtube",s=t.attr("data-vimeo-id")||t.attr("data-youtube-id")||t.attr("data-vzaar-id"),n=t.attr("data-width")||this._core.settings.videoWidth,o=t.attr("data-height")||this._core.settings.videoHeight,r=t.attr("href");if(r){if((s=r.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/))[3].indexOf("youtu")>-1)i="youtube";else if(s[3].indexOf("vimeo")>-1)i="vimeo";else if(s[3].indexOf("vzaar")>-1)i="vzaar";else throw Error("Video URL not supported.");s=s[6]}else throw Error("Missing video URL.");this._videos[r]={type:i,id:s,width:n,height:o},e.attr("data-video",r),this.thumbnail(t,this._videos[r])},n.prototype.thumbnail=function(e,i){var s,n,o,r=i.width&&i.height?"width:"+i.width+"px;height:"+i.height+"px;":"",a=e.find("img"),h="src",l="",c=this._core.settings,p=function(i){n='<div class="owl-video-play-icon"></div>',s=c.lazyLoad?t("<div/>",{class:"owl-video-tn "+l,srcType:i}):t("<div/>",{class:"owl-video-tn",style:"opacity:1;background-image:url("+i+")"}),e.after(s),e.after(n)};if(e.wrap(t("<div/>",{class:"owl-video-wrapper",style:r})),this._core.settings.lazyLoad&&(h="data-src",l="owl-lazy"),a.length)return p(a.attr(h)),a.remove(),!1;"youtube"===i.type?p(o="//img.youtube.com/vi/"+i.id+"/hqdefault.jpg"):"vimeo"===i.type?t.ajax({type:"GET",url:"//vimeo.com/api/v2/video/"+i.id+".json",jsonp:"callback",dataType:"jsonp",success:function(t){p(o=t[0].thumbnail_large)}}):"vzaar"===i.type&&t.ajax({type:"GET",url:"//vzaar.com/api/videos/"+i.id+".json",jsonp:"callback",dataType:"jsonp",success:function(t){p(o=t.framegrab_url)}})},n.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},n.prototype.play=function(e){var i,s,n=t(e.target).closest("."+this._core.settings.itemClass),o=this._videos[n.attr("data-video")],r=o.width||"100%",a=o.height||this._core.$stage.height();!this._playing&&(this._core.enter("playing"),this._core.trigger("play",null,"video"),n=this._core.items(this._core.relative(n.index())),this._core.reset(n.index()),(i=t('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>')).attr("height",a),i.attr("width",r),"youtube"===o.type?i.attr("src","//www.youtube.com/embed/"+o.id+"?autoplay=1&rel=0&v="+o.id):"vimeo"===o.type?i.attr("src","//player.vimeo.com/video/"+o.id+"?autoplay=1"):"vzaar"===o.type&&i.attr("src","//view.vzaar.com/"+o.id+"/player?autoplay=true"),s=t(i).wrap('<div class="owl-video-frame" />').insertAfter(n.find(".owl-video")),this._playing=n.addClass("owl-video-playing"))},n.prototype.isInFullScreen=function(){var e=i.fullscreenElement||i.mozFullScreenElement||i.webkitFullscreenElement;return e&&t(e).parent().hasClass("owl-video-frame")},n.prototype.destroy=function(){var t,e;for(t in this._core.$element.off("click.owl.video"),this._handlers)this._core.$element.off(t,this._handlers[t]);for(e in Object.getOwnPropertyNames(this))"function"!=typeof this[e]&&(this[e]=null)},t.fn.owlCarousel.Constructor.Plugins.Video=n}(window.Zepto||window.jQuery,window,document),function(t,e,i,s){var n=function(e){this.core=e,this.core.options=t.extend({},n.Defaults,this.core.options),this.swapping=!0,this.previous=s,this.next=s,this.handlers={"change.owl.carousel":t.proxy(function(t){t.namespace&&"position"==t.property.name&&(this.previous=this.core.current(),this.next=t.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":t.proxy(function(t){t.namespace&&(this.swapping="translated"==t.type)},this),"translate.owl.carousel":t.proxy(function(t){t.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};n.Defaults={animateOut:!1,animateIn:!1},n.prototype.swap=function(){if(1===this.core.settings.items&&t.support.animation&&t.support.transition){this.core.speed(0);var e,i=t.proxy(this.clear,this),s=this.core.$stage.children().eq(this.previous),n=this.core.$stage.children().eq(this.next),o=this.core.settings.animateIn,r=this.core.settings.animateOut;this.core.current()!==this.previous&&(r&&(e=this.core.coordinates(this.previous)-this.core.coordinates(this.next),s.one(t.support.animation.end,i).css({left:e+"px"}).addClass("animated owl-animated-out").addClass(r)),o&&n.one(t.support.animation.end,i).addClass("animated owl-animated-in").addClass(o))}},n.prototype.clear=function(e){t(e.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},n.prototype.destroy=function(){var t,e;for(t in this.handlers)this.core.$element.off(t,this.handlers[t]);for(e in Object.getOwnPropertyNames(this))"function"!=typeof this[e]&&(this[e]=null)},t.fn.owlCarousel.Constructor.Plugins.Animate=n}(window.Zepto||window.jQuery,window,document),function(t,e,i,s){var n=function(e){this._core=e,this._call=null,this._time=0,this._timeout=0,this._paused=!0,this._handlers={"changed.owl.carousel":t.proxy(function(t){t.namespace&&"settings"===t.property.name?this._core.settings.autoplay?this.play():this.stop():t.namespace&&"position"===t.property.name&&this._paused&&(this._time=0)},this),"initialized.owl.carousel":t.proxy(function(t){t.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":t.proxy(function(t,e,i){t.namespace&&this.play(e,i)},this),"stop.owl.autoplay":t.proxy(function(t){t.namespace&&this.stop()},this),"mouseover.owl.autoplay":t.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":t.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this),"touchstart.owl.core":t.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"touchend.owl.core":t.proxy(function(){this._core.settings.autoplayHoverPause&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=t.extend({},n.Defaults,this._core.options)};n.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},n.prototype._next=function(s){this._call=e.setTimeout(t.proxy(this._next,this,s),this._timeout*(Math.round(this.read()/this._timeout)+1)-this.read()),!this._core.is("interacting")&&!i.hidden&&this._core.next(s||this._core.settings.autoplaySpeed)},n.prototype.read=function(){return new Date().getTime()-this._time},n.prototype.play=function(i,s){var n;this._core.is("rotating")||this._core.enter("rotating"),i=i||this._core.settings.autoplayTimeout,n=Math.min(this._time%(this._timeout||i),i),this._paused?(this._time=this.read(),this._paused=!1):e.clearTimeout(this._call),this._time+=this.read()%i-n,this._timeout=i,this._call=e.setTimeout(t.proxy(this._next,this,s),i-n)},n.prototype.stop=function(){this._core.is("rotating")&&(this._time=0,this._paused=!0,e.clearTimeout(this._call),this._core.leave("rotating"))},n.prototype.pause=function(){this._core.is("rotating")&&!this._paused&&(this._time=this.read(),this._paused=!0,e.clearTimeout(this._call))},n.prototype.destroy=function(){var t,e;for(t in this.stop(),this._handlers)this._core.$element.off(t,this._handlers[t]);for(e in Object.getOwnPropertyNames(this))"function"!=typeof this[e]&&(this[e]=null)},t.fn.owlCarousel.Constructor.Plugins.autoplay=n}(window.Zepto||window.jQuery,window,document),function(t,e,i,s){"use strict";var n=function(e){this._core=e,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":t.proxy(function(e){e.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+t(e.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":t.proxy(function(t){t.namespace&&this._core.settings.dotsData&&this._templates.splice(t.position,0,this._templates.pop())},this),"remove.owl.carousel":t.proxy(function(t){t.namespace&&this._core.settings.dotsData&&this._templates.splice(t.position,1)},this),"changed.owl.carousel":t.proxy(function(t){t.namespace&&"position"==t.property.name&&this.draw()},this),"initialized.owl.carousel":t.proxy(function(t){t.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":t.proxy(function(t){t.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=t.extend({},n.Defaults,this._core.options),this.$element.on(this._handlers)};n.Defaults={nav:!1,navText:['<span aria-label="Previous">&#x2039;</span>','<span aria-label="Next">&#x203a;</span>'],navSpeed:!1,navElement:'button type="button" role="presentation"',navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},n.prototype.initialize=function(){var e,i=this._core.settings;for(e in this._controls.$relative=(i.navContainer?t(i.navContainer):t("<div>").addClass(i.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=t("<"+i.navElement+">").addClass(i.navClass[0]).html(i.navText[0]).prependTo(this._controls.$relative).on("click",t.proxy(function(t){this.prev(i.navSpeed)},this)),this._controls.$next=t("<"+i.navElement+">").addClass(i.navClass[1]).html(i.navText[1]).appendTo(this._controls.$relative).on("click",t.proxy(function(t){this.next(i.navSpeed)},this)),i.dotsData||(this._templates=[t('<button role="button">').addClass(i.dotClass).append(t("<span>")).prop("outerHTML")]),this._controls.$absolute=(i.dotsContainer?t(i.dotsContainer):t("<div>").addClass(i.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","button",t.proxy(function(e){var s=t(e.target).parent().is(this._controls.$absolute)?t(e.target).index():t(e.target).parent().index();e.preventDefault(),this.to(s,i.dotsSpeed)},this)),this._overrides)this._core[e]=t.proxy(this[e],this)},n.prototype.destroy=function(){var t,e,i,s,n;for(t in n=this._core.settings,this._handlers)this.$element.off(t,this._handlers[t]);for(e in this._controls)"$relative"===e&&n.navContainer?this._controls[e].html(""):this._controls[e].remove();for(s in this.overides)this._core[s]=this._overrides[s];for(i in Object.getOwnPropertyNames(this))"function"!=typeof this[i]&&(this[i]=null)},n.prototype.update=function(){var t,e,i,s=this._core.clones().length/2,n=s+this._core.items().length,o=this._core.maximum(!0),r=this._core.settings,a=r.center||r.autoWidth||r.dotsData?1:r.dotsEach||r.items;if("page"!==r.slideBy&&(r.slideBy=Math.min(r.slideBy,r.items)),r.dots||"page"==r.slideBy)for(this._pages=[],t=s,e=0,i=0;t<n;t++){if(e>=a||0===e){if(this._pages.push({start:Math.min(o,t-s),end:t-s+a-1}),Math.min(o,t-s)===o)break;e=0,++i}e+=this._core.mergers(this._core.relative(t))}},n.prototype.draw=function(){var e,i=this._core.settings,s=this._core.items().length<=i.items,n=this._core.relative(this._core.current()),o=i.loop||i.rewind;this._controls.$relative.toggleClass("disabled",!i.nav||s),i.nav&&(this._controls.$previous.toggleClass("disabled",!o&&n<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!o&&n>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!i.dots||s),i.dots&&(e=this._pages.length-this._controls.$absolute.children().length,i.dotsData&&0!==e?this._controls.$absolute.html(this._templates.join("")):e>0?this._controls.$absolute.append(Array(e+1).join(this._templates[0])):e<0&&this._controls.$absolute.children().slice(e).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(t.inArray(this.current(),this._pages)).addClass("active"))},n.prototype.onTrigger=function(e){var i=this._core.settings;e.page={index:t.inArray(this.current(),this._pages),count:this._pages.length,size:i&&(i.center||i.autoWidth||i.dotsData?1:i.dotsEach||i.items)}},n.prototype.current=function(){var e=this._core.relative(this._core.current());return t.grep(this._pages,t.proxy(function(t,i){return t.start<=e&&t.end>=e},this)).pop()},n.prototype.getPosition=function(e){var i,s,n=this._core.settings;return"page"==n.slideBy?(i=t.inArray(this.current(),this._pages),s=this._pages.length,e?++i:--i,i=this._pages[(i%s+s)%s].start):(i=this._core.relative(this._core.current()),s=this._core.items().length,e?i+=n.slideBy:i-=n.slideBy),i},n.prototype.next=function(e){t.proxy(this._overrides.to,this._core)(this.getPosition(!0),e)},n.prototype.prev=function(e){t.proxy(this._overrides.to,this._core)(this.getPosition(!1),e)},n.prototype.to=function(e,i,s){var n;!s&&this._pages.length?(n=this._pages.length,t.proxy(this._overrides.to,this._core)(this._pages[(e%n+n)%n].start,i)):t.proxy(this._overrides.to,this._core)(e,i)},t.fn.owlCarousel.Constructor.Plugins.Navigation=n}(window.Zepto||window.jQuery,window,document),function(t,e,i,s){"use strict";var n=function(i){this._core=i,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":t.proxy(function(i){i.namespace&&"URLHash"===this._core.settings.startPosition&&t(e).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":t.proxy(function(e){if(e.namespace){var i=t(e.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");i&&(this._hashes[i]=e.content)}},this),"changed.owl.carousel":t.proxy(function(i){if(i.namespace&&"position"===i.property.name){var s=this._core.items(this._core.relative(this._core.current())),n=t.map(this._hashes,function(t,e){return t===s?e:null}).join();n&&e.location.hash.slice(1)!==n&&(e.location.hash=n)}},this)},this._core.options=t.extend({},n.Defaults,this._core.options),this.$element.on(this._handlers),t(e).on("hashchange.owl.navigation",t.proxy(function(t){var i=e.location.hash.substring(1),s=this._core.$stage.children(),n=this._hashes[i]&&s.index(this._hashes[i]);void 0!==n&&n!==this._core.current()&&this._core.to(this._core.relative(n),!1,!0)},this))};n.Defaults={URLhashListener:!1},n.prototype.destroy=function(){var i,s;for(i in t(e).off("hashchange.owl.navigation"),this._handlers)this._core.$element.off(i,this._handlers[i]);for(s in Object.getOwnPropertyNames(this))"function"!=typeof this[s]&&(this[s]=null)},t.fn.owlCarousel.Constructor.Plugins.Hash=n}(window.Zepto||window.jQuery,window,document),function(t,e,i,s){var n=t("<support>").get(0).style,o="Webkit Moz O ms".split(" "),r={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},a={csstransforms:function(){return!!h("transform")},csstransforms3d:function(){return!!h("perspective")},csstransitions:function(){return!!h("transition")},cssanimations:function(){return!!h("animation")}};function h(e,i){var s=!1,r=e.charAt(0).toUpperCase()+e.slice(1);return t.each((e+" "+o.join(r+" ")+r).split(" "),function(t,e){if(void 0!==n[e])return s=!i||e,!1}),s}function l(t){return h(t,!0)}a.csstransitions()&&(t.support.transition=new String(l("transition")),t.support.transition.end=r.transition.end[t.support.transition]),a.cssanimations()&&(t.support.animation=new String(l("animation")),t.support.animation.end=r.animation.end[t.support.animation]),a.csstransforms()&&(t.support.transform=new String(l("transform")),t.support.transform3d=a.csstransforms3d())}(window.Zepto||window.jQuery,window,document);
    $(".morelink").click(function () {
        return $(this).hasClass("less") ? ($(this).removeClass("less"), $(this).html(moretext)) : ($(this).addClass("less"), $(this).html(lesstext)), $(this).parent().prev().toggle(), $(this).prev().toggle(), !1;
    });
    $("img").each(function(){(void 0!==this.naturalWidth&&0==this.naturalWidth||"uninitialized"==this.readyState)&&null==this.brokenImages&&$(this).attr("src","./images/no-image.gif")});