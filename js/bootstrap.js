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
        b = (function () {
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
                b._jQueryInterface.call(i(n), "toggle");
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
        (i.fn.button = b._jQueryInterface),
        (i.fn.button.Constructor = b),
        (i.fn.button.noConflict = function () {
            return (i.fn.button = d), b._jQueryInterface;
        });
    var y = "carousel",
        E = i.fn[y],
        T = { interval: 5e3, keyboard: !0, slide: !1, pause: "hover", wrap: !0, touch: !0 },
        C = { interval: "(number|boolean)", keyboard: "boolean", slide: "(boolean|string)", pause: "(string|boolean)", wrap: "boolean", touch: "boolean" },
        w = "next",
        S = "prev",
        A = "slid.bs.carousel",
        k = "active",
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
        D = { TOUCH: "touch", PEN: "pen" },
        N = (function () {
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
                    return (e = l({}, T, {}, e)), h.typeCheckConfig(y, e, C), e;
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
                                e._pointerEvent && D[i.originalEvent.pointerType.toUpperCase()] ? (e.touchStartX = i.originalEvent.clientX) : e._pointerEvent || (e.touchStartX = i.originalEvent.touches[0].clientX);
                            },
                            s = function (i) {
                                e._pointerEvent && D[i.originalEvent.pointerType.toUpperCase()] && (e.touchDeltaX = i.originalEvent.clientX - e.touchStartX),
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
                        i([].slice.call(this._indicatorsElement.querySelectorAll(I.ACTIVE))).removeClass(k);
                        var n = this._indicatorsElement.children[this._getItemIndex(e)];
                        n && i(n).addClass(k);
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
                    if ((e === w ? ((s = "carousel-item-left"), (o = "carousel-item-next"), (r = "left")) : ((s = "carousel-item-right"), (o = "carousel-item-prev"), (r = "right")), u && i(u).hasClass(k))) this._isSliding = !1;
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
                                        .addClass(k),
                                        i(l).removeClass(k + " " + o + " " + s),
                                        (a._isSliding = !1),
                                        setTimeout(function () {
                                            return i(a._element).trigger(g);
                                        }, 0);
                                })
                                .emulateTransitionEnd(m);
                        } else i(l).removeClass(k), i(u).addClass(k), (this._isSliding = !1), i(this._element).trigger(g);
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
    i(document).on("click.bs.carousel.data-api", I.DATA_SLIDE, N._dataApiClickHandler),
        i(window).on("load.bs.carousel.data-api", function () {
            for (var e = [].slice.call(document.querySelectorAll(I.DATA_RIDE)), n = 0, s = e.length; n < s; n++) {
                var o = i(e[n]);
                N._jQueryInterface.call(o, o.data());
            }
        }),
        (i.fn[y] = N._jQueryInterface),
        (i.fn[y].Constructor = N),
        (i.fn[y].noConflict = function () {
            return (i.fn[y] = E), N._jQueryInterface;
        });
    var x = "collapse",
        O = i.fn[x],
        _ = { toggle: !0, parent: "" },
        L = { toggle: "boolean", parent: "(string|element)" },
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
                    return ((e = l({}, _, {}, e)).toggle = Boolean(e.toggle)), h.typeCheckConfig(x, e, L), e;
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
                            r = l({}, _, {}, s.data(), {}, "object" == typeof n && n ? n : {});
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
                            return _;
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
        (i.fn[x] = M._jQueryInterface),
        (i.fn[x].Constructor = M),
        (i.fn[x].noConflict = function () {
            return (i.fn[x] = O), M._jQueryInterface;
        });
    var Q = "dropdown",
        H = i.fn[Q],
        B = RegExp("38|40|27"),
        V = "hide.bs.dropdown",
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
                            s = i.Event(V, n),
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
                                    var u = i.Event(V, c);
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
                        (/input|textarea/i.test(n.target.tagName) ? !(32 === n.which || (27 !== n.which && ((40 !== n.which && 38 !== n.which) || i(n.target).closest(J).length))) : B.test(n.which)) &&
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
        tb = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:\/?#]*(?:[\/?#]|$))/gi,
        ty = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
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
                        if (-1 !== i.indexOf(n)) return -1 === tv.indexOf(n) || Boolean(e.nodeValue.match(tb) || e.nodeValue.match(ty));
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
        t$ = ["sanitize", "whiteList", "sanitizeFn"],
        tS = {
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
        tA = { AUTO: "auto", TOP: "top", RIGHT: "right", BOTTOM: "bottom", LEFT: "left" },
        tk = {
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
        tN = "fade",
        tx = "show",
        tO = "hover",
        t_ = "focus",
        tL = (function () {
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
                            if (i(this.getTipElement()).hasClass(tx)) return void this._leave(null, this);
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
                        a.setAttribute("id", l), this.element.setAttribute("aria-describedby", l), this.setContent(), this.config.animation && i(a).addClass(tN);
                        var c = "function" == typeof this.config.placement ? this.config.placement.call(this, a, this.element) : this.config.placement,
                            u = this._getAttachment(c);
                        this.addAttachmentClass(u);
                        var f = this._getContainer();
                        i(a).data(this.constructor.DATA_KEY, this),
                            i.contains(this.element.ownerDocument.documentElement, this.tip) || i(a).appendTo(f),
                            i(this.element).trigger(this.constructor.Event.INSERTED),
                            (this._popper = new n(this.element, a, this._getPopperConfig(u))),
                            i(a).addClass(tx),
                            "ontouchstart" in document.documentElement && i(document.body).children().on("mouseover", null, i.noop);
                        var d = function () {
                            e.config.animation && e._fixTransition();
                            var n = e._hoverState;
                            (e._hoverState = null), i(e.element).trigger(e.constructor.Event.SHOWN), "out" === n && e._leave(null, e);
                        };
                        if (i(this.tip).hasClass(tN)) {
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
                            (i(s).removeClass(tx),
                            "ontouchstart" in document.documentElement && i(document.body).children().off("mouseover", null, i.noop),
                            (this._activeTrigger.click = !1),
                            (this._activeTrigger[t_] = !1),
                            (this._activeTrigger[tO] = !1),
                            i(this.tip).hasClass(tN))
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
                    this.setElementContent(i(e.querySelectorAll(".tooltip-inner")), this.getTitle()), i(e).removeClass(tN + " " + tx);
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
                    return tA[e.toUpperCase()];
                }),
                (s._setListeners = function () {
                    var e = this;
                    this.config.trigger.split(" ").forEach(function (n) {
                        if ("click" === n)
                            i(e.element).on(e.constructor.Event.CLICK, e.config.selector, function (i) {
                                return e.toggle(i);
                            });
                        else if ("manual" !== n) {
                            var s = n === tO ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
                                o = n === tO ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
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
                        e && (n._activeTrigger["focusin" === e.type ? t_ : tO] = !0),
                        i(n.getTipElement()).hasClass(tx) || n._hoverState === tI
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
                        e && (n._activeTrigger["focusout" === e.type ? t_ : tO] = !1),
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
                            -1 !== t$.indexOf(e) && delete n[e];
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
                    null === e.getAttribute("x-placement") && (i(e).removeClass(tN), (this.config.animation = !1), this.hide(), this.show(), (this.config.animation = n));
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
                            return tk;
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
                            return tS;
                        },
                    },
                ]),
                e
            );
        })();
    (i.fn.tooltip = tL._jQueryInterface),
        (i.fn.tooltip.Constructor = tL),
        (i.fn.tooltip.noConflict = function () {
            return (i.fn.tooltip = tC), tL._jQueryInterface;
        });
    var tP = i.fn.popover,
        tj = RegExp("(^|\\s)bs-popover\\S+", "g"),
        tR = l({}, tL.Default, { placement: "right", trigger: "click", content: "", template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>' }),
        tq = l({}, tL.DefaultType, { content: "(string|element|function)" }),
        t3 = {
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
        tF = (function (e) {
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
                            return t3;
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
        })(tL);
    (i.fn.popover = tF._jQueryInterface),
        (i.fn.popover.Constructor = tF),
        (i.fn.popover.noConflict = function () {
            return (i.fn.popover = tP), tF._jQueryInterface;
        });
    var tM = "scrollspy",
        tQ = i.fn[tM],
        t9 = { offset: 10, method: "auto", target: "" },
        tH = { offset: "number", method: "string", target: "(string|element)" },
        t4 = { ACTIVATE: "activate.bs.scrollspy", SCROLL: "scroll.bs.scrollspy", LOAD_DATA_API: "load.bs.scrollspy.data-api" },
        tB = "active",
        tV = {
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
        t1 = "position",
        tU = (function () {
            function e(e, n) {
                var s = this;
                (this._element = e),
                    (this._scrollElement = "BODY" === e.tagName ? window : e),
                    (this._config = this._getConfig(n)),
                    (this._selector = this._config.target + " " + tV.NAV_LINKS + "," + this._config.target + " " + tV.LIST_ITEMS + "," + this._config.target + " " + tV.DROPDOWN_ITEMS),
                    (this._offsets = []),
                    (this._targets = []),
                    (this._activeTarget = null),
                    (this._scrollHeight = 0),
                    i(this._scrollElement).on(t4.SCROLL, function (e) {
                        return s._process(e);
                    }),
                    this.refresh(),
                    this._process();
            }
            var n = e.prototype;
            return (
                (n.refresh = function () {
                    var e = this,
                        n = this._scrollElement === this._scrollElement.window ? "offset" : t1,
                        s = "auto" === this._config.method ? n : this._config.method,
                        o = s === t1 ? this._getScrollTop() : 0;
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
                    if ("string" != typeof (e = l({}, t9, {}, "object" == typeof e && e ? e : {})).target) {
                        var n = i(e.target).attr("id");
                        n || ((n = h.getUID(tM)), i(e.target).attr("id", n)), (e.target = "#" + n);
                    }
                    return h.typeCheckConfig(tM, e, tH), e;
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
                        ? (s.closest(tV.DROPDOWN).find(tV.DROPDOWN_TOGGLE).addClass(tB), s.addClass(tB))
                        : (s.addClass(tB),
                          s
                              .parents(tV.NAV_LIST_GROUP)
                              .prev(tV.NAV_LINKS + ", " + tV.LIST_ITEMS)
                              .addClass(tB),
                          s.parents(tV.NAV_LIST_GROUP).prev(tV.NAV_ITEMS).children(tV.NAV_LINKS).addClass(tB)),
                        i(this._scrollElement).trigger(t4.ACTIVATE, { relatedTarget: e });
                }),
                (n._clear = function () {
                    [].slice
                        .call(document.querySelectorAll(this._selector))
                        .filter(function (e) {
                            return e.classList.contains(tB);
                        })
                        .forEach(function (e) {
                            return e.classList.remove(tB);
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
                            return t9;
                        },
                    },
                ]),
                e
            );
        })();
    i(window).on(t4.LOAD_DATA_API, function () {
        for (var e = [].slice.call(document.querySelectorAll(tV.DATA_SPY)), n = e.length; n--; ) {
            var s = i(e[n]);
            tU._jQueryInterface.call(s, s.data());
        }
    }),
        (i.fn[tM] = tU._jQueryInterface),
        (i.fn[tM].Constructor = tU),
        (i.fn[tM].noConflict = function () {
            return (i.fn[tM] = tQ), tU._jQueryInterface;
        });
    var tW = i.fn.tab,
        t0 = "active",
        tz = ".active",
        tG = "> li > .active",
        tK = (function () {
            function e(e) {
                this._element = e;
            }
            var n = e.prototype;
            return (
                (n.show = function () {
                    var e = this;
                    if (!((this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && i(this._element).hasClass(t0)) || i(this._element).hasClass("disabled"))) {
                        var n,
                            s,
                            o = i(this._element).closest(".nav, .list-group")[0],
                            r = h.getSelectorFromElement(this._element);
                        if (o) {
                            var a = "UL" === o.nodeName || "OL" === o.nodeName ? tG : tz;
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
                        r = (n && ("UL" === n.nodeName || "OL" === n.nodeName) ? i(n).find(tG) : i(n).children(tz))[0],
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
                        i(n).removeClass(t0);
                        var o = i(n.parentNode).find("> .dropdown-menu .active")[0];
                        o && i(o).removeClass(t0), "tab" === n.getAttribute("role") && n.setAttribute("aria-selected", !1);
                    }
                    if (
                        (i(e).addClass(t0),
                        "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0),
                        h.reflow(e),
                        e.classList.contains("fade") && e.classList.add("show"),
                        e.parentNode && i(e.parentNode).hasClass("dropdown-menu"))
                    ) {
                        var r = i(e).closest(".dropdown")[0];
                        r && i([].slice.call(r.querySelectorAll(".dropdown-toggle"))).addClass(t0), e.setAttribute("aria-expanded", !0);
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
        e.preventDefault(), tK._jQueryInterface.call(i(this), "show");
    }),
        (i.fn.tab = tK._jQueryInterface),
        (i.fn.tab.Constructor = tK),
        (i.fn.tab.noConflict = function () {
            return (i.fn.tab = tW), tK._jQueryInterface;
        });
    var tX = i.fn.toast,
        tY = "click.dismiss.bs.toast",
        t2 = "show",
        t7 = "showing",
        t5 = { animation: "boolean", autohide: "boolean", delay: "number" },
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
                            e._element.classList.remove(t7),
                                e._element.classList.add(t2),
                                i(e._element).trigger("shown.bs.toast"),
                                e._config.autohide &&
                                    (e._timeout = setTimeout(function () {
                                        e.hide();
                                    }, e._config.delay));
                        };
                        if ((this._element.classList.remove("hide"), h.reflow(this._element), this._element.classList.add(t7), this._config.animation)) {
                            var o = h.getTransitionDurationFromElement(this._element);
                            i(this._element).one(h.TRANSITION_END, s).emulateTransitionEnd(o);
                        } else s();
                    }
                }),
                (n.hide = function () {
                    if (this._element.classList.contains(t2)) {
                        var e = i.Event("hide.bs.toast");
                        i(this._element).trigger(e), e.isDefaultPrevented() || this._close();
                    }
                }),
                (n.dispose = function () {
                    clearTimeout(this._timeout),
                        (this._timeout = null),
                        this._element.classList.contains(t2) && this._element.classList.remove(t2),
                        i(this._element).off(tY),
                        i.removeData(this._element, "bs.toast"),
                        (this._element = null),
                        (this._config = null);
                }),
                (n._getConfig = function (e) {
                    return (e = l({}, t6, {}, i(this._element).data(), {}, "object" == typeof e && e ? e : {})), h.typeCheckConfig("toast", e, this.constructor.DefaultType), e;
                }),
                (n._setListeners = function () {
                    var e = this;
                    i(this._element).on(tY, '[data-dismiss="toast"]', function () {
                        return e.hide();
                    });
                }),
                (n._close = function () {
                    var e = this,
                        n = function () {
                            e._element.classList.add("hide"), i(e._element).trigger("hidden.bs.toast");
                        };
                    if ((this._element.classList.remove(t2), this._config.animation)) {
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
                            return t5;
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
            return (i.fn.toast = tX), tJ._jQueryInterface;
        }),
        (e.Alert = f),
        (e.Button = b),
        (e.Carousel = N),
        (e.Collapse = M),
        (e.Dropdown = te),
        (e.Modal = t8),
        (e.Popover = tF),
        (e.Scrollspy = tU),
        (e.Tab = tK),
        (e.Toast = tJ),
        (e.Tooltip = tL),
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
        let c = l.replace(/[^0-9\/]/g, "");
        $(l).css({ background: " rgba(2, 104, 212, 0." + c + "0)", "backdrop-filter": "blur(6.3px)", "-webkit-backdrop-filter": "blur(6.3px)", border: "1px solid rgba(50, 55, 66, 0.10)" });
    }
    if ($(".success" + bg_limit[ex])[0]) {
        var l = ".success" + bg_limit[ex];
        let h = l.replace(/[^0-9\/]/g, "");
        $(l).css({ background: " rgba(46, 147, 42, 0." + h + "0)", "backdrop-filter": "blur(6.3px)", "-webkit-backdrop-filter": "blur(6.3px)", border: "1px solid rgba(50, 55, 66, 0.10)" });
    }
    if ($(".danger" + bg_limit[ex])[0]) {
        var l = ".danger" + bg_limit[ex];
        let u = l.replace(/[^0-9\/]/g, "");
        $(l).css({ background: " rgba(220, 53, 69, 0." + u + "0)", "backdrop-filter": "blur(6.3px)", "-webkit-backdrop-filter": "blur(6.3px)", border: "1px solid rgba(50, 55, 66, 0.10)" });
    }
    if ($(".warning" + bg_limit[ex])[0]) {
        var l = ".warning" + bg_limit[ex];
        let f = l.replace(/[^0-9\/]/g, "");
        $(l).css({ background: " rgba(255, 193, 7, 0." + f + "0)", "backdrop-filter": "blur(6.3px)", "-webkit-backdrop-filter": "blur(6.3px)", border: "1px solid rgba(50, 55, 66, 0.10)" });
    }
    if ($(".info" + bg_limit[ex])[0]) {
        var l = ".info" + bg_limit[ex];
        let d = l.replace(/[^0-9\/]/g, "");
        $(l).css({ background: " rgba(23, 162, 184, 0." + d + "0)", "backdrop-filter": "blur(6.3px)", "-webkit-backdrop-filter": "blur(6.3px)", border: "1px solid rgba(50, 55, 66, 0.10)" });
    }
    if ($(".dark" + bg_limit[ex])[0]) {
        var l = ".dark" + bg_limit[ex];
        let g = l.replace(/[^0-9\/]/g, "");
        $(l).css({ background: " rgba(0, 0, 0, 0." + g + "0)", "backdrop-filter": "blur(6.3px)", "-webkit-backdrop-filter": "blur(6.3px)", border: "1px solid rgba(50, 55, 66, 0.10)" });
    }
    if ($(".light" + bg_limit[ex])[0]) {
        var l = ".light" + bg_limit[ex];
        let p = l.replace(/[^0-9\/]/g, "");
        $(l).css({ background: " rgba(255, 255, 255, 0." + p + "0)", "backdrop-filter": "blur(6.3px)", "-webkit-backdrop-filter": "blur(6.3px)", border: "1px solid rgba(50, 55, 66, 0.10)" });
    }
}



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
	

function SmartMenu(e = []) {
    $("img").each(function () {
        ((void 0 !== this.naturalWidth && 0 == this.naturalWidth) || "uninitialized" == this.readyState) && (null == e.brokenImages ? $(this).attr("src", "./app/images/mrvsmk2pl3l8fwocbfhy.gif") : $(this).attr("src", e.brokenImages));
    }),
        !0 == e.ConsoleClear && console.clear(),
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

}
}
}
