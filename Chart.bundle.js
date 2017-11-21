! function t(e, i, s) {
    function a(n, r) {
        if (!i[n]) {
            if (!e[n]) {
                var l = "function" == typeof require && require;
                if (!r && l) return l(n, !0);
                if (o) return o(n, !0);
                var h = new Error("Cannot find module '" + n + "'");
                throw h.code = "MODULE_NOT_FOUND", h
            }
            var c = i[n] = {
                exports: {}
            };
            e[n][0].call(c.exports, function(t) {
                var i = e[n][1][t];
                return a(i ? i : t)
            }, c, c.exports, t, e, i, s)
        }
        return i[n].exports
    }
    for (var o = "function" == typeof require && require, n = 0; n < s.length; n++) a(s[n]);
    return a
}({
    1: [function(t, e, i) {
        var s = t("color-convert"),
            a = t("color-string"),
            o = function(t) {
                if (t instanceof o) return t;
                if (!(this instanceof o)) return new o(t);
                if (this.values = {
                        rgb: [0, 0, 0],
                        hsl: [0, 0, 0],
                        hsv: [0, 0, 0],
                        hwb: [0, 0, 0],
                        cmyk: [0, 0, 0, 0],
                        alpha: 1
                    }, "string" == typeof t) {
                    var e = a.getRgba(t);
                    if (e) this.setValues("rgb", e);
                    else if (e = a.getHsla(t)) this.setValues("hsl", e);
                    else {
                        if (!(e = a.getHwb(t))) throw new Error('Unable to parse color from string "' + t + '"');
                        this.setValues("hwb", e)
                    }
                } else if ("object" == typeof t) {
                    var e = t;
                    if (void 0 !== e.r || void 0 !== e.red) this.setValues("rgb", e);
                    else if (void 0 !== e.l || void 0 !== e.lightness) this.setValues("hsl", e);
                    else if (void 0 !== e.v || void 0 !== e.value) this.setValues("hsv", e);
                    else if (void 0 !== e.w || void 0 !== e.whiteness) this.setValues("hwb", e);
                    else {
                        if (void 0 === e.c && void 0 === e.cyan) throw new Error("Unable to parse color from object " + JSON.stringify(t));
                        this.setValues("cmyk", e)
                    }
                }
            };
        o.prototype = {
            rgb: function(t) {
                return this.setSpace("rgb", arguments)
            },
            hsl: function(t) {
                return this.setSpace("hsl", arguments)
            },
            hsv: function(t) {
                return this.setSpace("hsv", arguments)
            },
            hwb: function(t) {
                return this.setSpace("hwb", arguments)
            },
            cmyk: function(t) {
                return this.setSpace("cmyk", arguments)
            },
            rgbArray: function() {
                return this.values.rgb
            },
            hslArray: function() {
                return this.values.hsl
            },
            hsvArray: function() {
                return this.values.hsv
            },
            hwbArray: function() {
                return 1 !== this.values.alpha ? this.values.hwb.concat([this.values.alpha]) : this.values.hwb
            },
            cmykArray: function() {
                return this.values.cmyk
            },
            rgbaArray: function() {
                var t = this.values.rgb;
                return t.concat([this.values.alpha])
            },
            hslaArray: function() {
                var t = this.values.hsl;
                return t.concat([this.values.alpha])
            },
            alpha: function(t) {
                return void 0 === t ? this.values.alpha : (this.setValues("alpha", t), this)
            },
            red: function(t) {
                return this.setChannel("rgb", 0, t)
            },
            green: function(t) {
                return this.setChannel("rgb", 1, t)
            },
            blue: function(t) {
                return this.setChannel("rgb", 2, t)
            },
            hue: function(t) {
                return this.setChannel("hsl", 0, t)
            },
            saturation: function(t) {
                return this.setChannel("hsl", 1, t)
            },
            lightness: function(t) {
                return this.setChannel("hsl", 2, t)
            },
            saturationv: function(t) {
                return this.setChannel("hsv", 1, t)
            },
            whiteness: function(t) {
                return this.setChannel("hwb", 1, t)
            },
            blackness: function(t) {
                return this.setChannel("hwb", 2, t)
            },
            value: function(t) {
                return this.setChannel("hsv", 2, t)
            },
            cyan: function(t) {
                return this.setChannel("cmyk", 0, t)
            },
            magenta: function(t) {
                return this.setChannel("cmyk", 1, t)
            },
            yellow: function(t) {
                return this.setChannel("cmyk", 2, t)
            },
            black: function(t) {
                return this.setChannel("cmyk", 3, t)
            },
            hexString: function() {
                return a.hexString(this.values.rgb)
            },
            rgbString: function() {
                return a.rgbString(this.values.rgb, this.values.alpha)
            },
            rgbaString: function() {
                return a.rgbaString(this.values.rgb, this.values.alpha)
            },
            percentString: function() {
                return a.percentString(this.values.rgb, this.values.alpha)
            },
            hslString: function() {
                return a.hslString(this.values.hsl, this.values.alpha)
            },
            hslaString: function() {
                return a.hslaString(this.values.hsl, this.values.alpha)
            },
            hwbString: function() {
                return a.hwbString(this.values.hwb, this.values.alpha)
            },
            keyword: function() {
                return a.keyword(this.values.rgb, this.values.alpha)
            },
            rgbNumber: function() {
                return this.values.rgb[0] << 16 | this.values.rgb[1] << 8 | this.values.rgb[2]
            },
            luminosity: function() {
                for (var t = this.values.rgb, e = [], i = 0; i < t.length; i++) {
                    var s = t[i] / 255;
                    e[i] = .03928 >= s ? s / 12.92 : Math.pow((s + .055) / 1.055, 2.4)
                }
                return .2126 * e[0] + .7152 * e[1] + .0722 * e[2]
            },
            contrast: function(t) {
                var e = this.luminosity(),
                    i = t.luminosity();
                return e > i ? (e + .05) / (i + .05) : (i + .05) / (e + .05)
            },
            level: function(t) {
                var e = this.contrast(t);
                return e >= 7.1 ? "AAA" : e >= 4.5 ? "AA" : ""
            },
            dark: function() {
                var t = this.values.rgb,
                    e = (299 * t[0] + 587 * t[1] + 114 * t[2]) / 1e3;
                return 128 > e
            },
            light: function() {
                return !this.dark()
            },
            negate: function() {
                for (var t = [], e = 0; 3 > e; e++) t[e] = 255 - this.values.rgb[e];
                return this.setValues("rgb", t), this
            },
            lighten: function(t) {
                return this.values.hsl[2] += this.values.hsl[2] * t, this.setValues("hsl", this.values.hsl), this
            },
            darken: function(t) {
                return this.values.hsl[2] -= this.values.hsl[2] * t, this.setValues("hsl", this.values.hsl), this
            },
            saturate: function(t) {
                return this.values.hsl[1] += this.values.hsl[1] * t, this.setValues("hsl", this.values.hsl), this
            },
            desaturate: function(t) {
                return this.values.hsl[1] -= this.values.hsl[1] * t, this.setValues("hsl", this.values.hsl), this
            },
            whiten: function(t) {
                return this.values.hwb[1] += this.values.hwb[1] * t, this.setValues("hwb", this.values.hwb), this
            },
            blacken: function(t) {
                return this.values.hwb[2] += this.values.hwb[2] * t, this.setValues("hwb", this.values.hwb), this
            },
            greyscale: function() {
                var t = this.values.rgb,
                    e = .3 * t[0] + .59 * t[1] + .11 * t[2];
                return this.setValues("rgb", [e, e, e]), this
            },
            clearer: function(t) {
                return this.setValues("alpha", this.values.alpha - this.values.alpha * t), this
            },
            opaquer: function(t) {
                return this.setValues("alpha", this.values.alpha + this.values.alpha * t), this
            },
            rotate: function(t) {
                var e = this.values.hsl[0];
                return e = (e + t) % 360, e = 0 > e ? 360 + e : e, this.values.hsl[0] = e, this.setValues("hsl", this.values.hsl), this
            },
            mix: function(t, e) {
                e = 1 - (null == e ? .5 : e);
                for (var i = 2 * e - 1, s = this.alpha() - t.alpha(), a = ((i * s == -1 ? i : (i + s) / (1 + i * s)) + 1) / 2, o = 1 - a, n = this.rgbArray(), r = t.rgbArray(), l = 0; l < n.length; l++) n[l] = n[l] * a + r[l] * o;
                this.setValues("rgb", n);
                var h = this.alpha() * e + t.alpha() * (1 - e);
                return this.setValues("alpha", h), this
            },
            toJSON: function() {
                return this.rgb()
            },
            clone: function() {
                return new o(this.rgb())
            }
        }, o.prototype.getValues = function(t) {
            for (var e = {}, i = 0; i < t.length; i++) e[t.charAt(i)] = this.values[t][i];
            return 1 != this.values.alpha && (e.a = this.values.alpha), e
        }, o.prototype.setValues = function(t, e) {
            var i = {
                    rgb: ["red", "green", "blue"],
                    hsl: ["hue", "saturation", "lightness"],
                    hsv: ["hue", "saturation", "value"],
                    hwb: ["hue", "whiteness", "blackness"],
                    cmyk: ["cyan", "magenta", "yellow", "black"]
                },
                a = {
                    rgb: [255, 255, 255],
                    hsl: [360, 100, 100],
                    hsv: [360, 100, 100],
                    hwb: [360, 100, 100],
                    cmyk: [100, 100, 100, 100]
                },
                o = 1;
            if ("alpha" == t) o = e;
            else if (e.length) this.values[t] = e.slice(0, t.length), o = e[t.length];
            else if (void 0 !== e[t.charAt(0)]) {
                for (var n = 0; n < t.length; n++) this.values[t][n] = e[t.charAt(n)];
                o = e.a
            } else if (void 0 !== e[i[t][0]]) {
                for (var r = i[t], n = 0; n < t.length; n++) this.values[t][n] = e[r[n]];
                o = e.alpha
            }
            if (this.values.alpha = Math.max(0, Math.min(1, void 0 !== o ? o : this.values.alpha)), "alpha" != t) {
                for (var n = 0; n < t.length; n++) {
                    var l = Math.max(0, Math.min(a[t][n], this.values[t][n]));
                    this.values[t][n] = Math.round(l)
                }
                for (var h in i) {
                    h != t && (this.values[h] = s[t][h](this.values[t]));
                    for (var n = 0; n < h.length; n++) {
                        var l = Math.max(0, Math.min(a[h][n], this.values[h][n]));
                        this.values[h][n] = Math.round(l)
                    }
                }
                return !0
            }
        }, o.prototype.setSpace = function(t, e) {
            var i = e[0];
            return void 0 === i ? this.getValues(t) : ("number" == typeof i && (i = Array.prototype.slice.call(e)), this.setValues(t, i), this)
        }, o.prototype.setChannel = function(t, e, i) {
            return void 0 === i ? this.values[t][e] : (this.values[t][e] = i, this.setValues(t, this.values[t]), this)
        }, window.Color = e.exports = o
    }, {
        "color-convert": 3,
        "color-string": 5
    }],
    2: [function(t, e, i) {
        function s(t) {
            var e, i, s, a = t[0] / 255,
                o = t[1] / 255,
                n = t[2] / 255,
                r = Math.min(a, o, n),
                l = Math.max(a, o, n),
                h = l - r;
            return l == r ? e = 0 : a == l ? e = (o - n) / h : o == l ? e = 2 + (n - a) / h : n == l && (e = 4 + (a - o) / h), e = Math.min(60 * e, 360), 0 > e && (e += 360), s = (r + l) / 2, i = l == r ? 0 : .5 >= s ? h / (l + r) : h / (2 - l - r), [e, 100 * i, 100 * s]
        }

        function a(t) {
            var e, i, s, a = t[0],
                o = t[1],
                n = t[2],
                r = Math.min(a, o, n),
                l = Math.max(a, o, n),
                h = l - r;
            return i = 0 == l ? 0 : h / l * 1e3 / 10, l == r ? e = 0 : a == l ? e = (o - n) / h : o == l ? e = 2 + (n - a) / h : n == l && (e = 4 + (a - o) / h), e = Math.min(60 * e, 360), 0 > e && (e += 360), s = l / 255 * 1e3 / 10, [e, i, s]
        }

        function o(t) {
            var e = t[0],
                i = t[1],
                a = t[2],
                o = s(t)[0],
                n = 1 / 255 * Math.min(e, Math.min(i, a)),
                a = 1 - 1 / 255 * Math.max(e, Math.max(i, a));
            return [o, 100 * n, 100 * a]
        }

        function n(t) {
            var e, i, s, a, o = t[0] / 255,
                n = t[1] / 255,
                r = t[2] / 255;
            return a = Math.min(1 - o, 1 - n, 1 - r), e = (1 - o - a) / (1 - a) || 0, i = (1 - n - a) / (1 - a) || 0, s = (1 - r - a) / (1 - a) || 0, [100 * e, 100 * i, 100 * s, 100 * a]
        }

        function l(t) {
            return X[JSON.stringify(t)]
        }

        function h(t) {
            var e = t[0] / 255,
                i = t[1] / 255,
                s = t[2] / 255;
            e = e > .04045 ? Math.pow((e + .055) / 1.055, 2.4) : e / 12.92, i = i > .04045 ? Math.pow((i + .055) / 1.055, 2.4) : i / 12.92, s = s > .04045 ? Math.pow((s + .055) / 1.055, 2.4) : s / 12.92;
            var a = .4124 * e + .3576 * i + .1805 * s,
                o = .2126 * e + .7152 * i + .0722 * s,
                n = .0193 * e + .1192 * i + .9505 * s;
            return [100 * a, 100 * o, 100 * n]
        }

        function c(t) {
            var e, i, s, a = h(t),
                o = a[0],
                n = a[1],
                r = a[2];
            return o /= 95.047, n /= 100, r /= 108.883, o = o > .008856 ? Math.pow(o, 1 / 3) : 7.787 * o + 16 / 116, n = n > .008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116, r = r > .008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116, e = 116 * n - 16, i = 500 * (o - n), s = 200 * (n - r), [e, i, s]
        }

        function u(t) {
            return z(c(t))
        }

        function d(t) {
            var e, i, s, a, o, n = t[0] / 360,
                r = t[1] / 100,
                l = t[2] / 100;
            if (0 == r) return o = 255 * l, [o, o, o];
            i = .5 > l ? l * (1 + r) : l + r - l * r, e = 2 * l - i, a = [0, 0, 0];
            for (var h = 0; 3 > h; h++) s = n + 1 / 3 * -(h - 1), 0 > s && s++, s > 1 && s--, o = 1 > 6 * s ? e + 6 * (i - e) * s : 1 > 2 * s ? i : 2 > 3 * s ? e + (i - e) * (2 / 3 - s) * 6 : e, a[h] = 255 * o;
            return a
        }

        function f(t) {
            var e, i, s = t[0],
                a = t[1] / 100,
                o = t[2] / 100;
            return 0 === o ? [0, 0, 0] : (o *= 2, a *= 1 >= o ? o : 2 - o, i = (o + a) / 2, e = 2 * a / (o + a), [s, 100 * e, 100 * i])
        }

        function m(t) {
            return o(d(t))
        }

        function p(t) {
            return n(d(t))
        }

        function v(t) {
            return l(d(t))
        }

        function x(t) {
            var e = t[0] / 60,
                i = t[1] / 100,
                s = t[2] / 100,
                a = Math.floor(e) % 6,
                o = e - Math.floor(e),
                n = 255 * s * (1 - i),
                r = 255 * s * (1 - i * o),
                l = 255 * s * (1 - i * (1 - o)),
                s = 255 * s;
            switch (a) {
                case 0:
                    return [s, l, n];
                case 1:
                    return [r, s, n];
                case 2:
                    return [n, s, l];
                case 3:
                    return [n, r, s];
                case 4:
                    return [l, n, s];
                case 5:
                    return [s, n, r]
            }
        }

        function y(t) {
            var e, i, s = t[0],
                a = t[1] / 100,
                o = t[2] / 100;
            return i = (2 - a) * o, e = a * o, e /= 1 >= i ? i : 2 - i, e = e || 0, i /= 2, [s, 100 * e, 100 * i]
        }

        function _(t) {
            return o(x(t))
        }

        function k(t) {
            return n(x(t))
        }

        function D(t) {
            return l(x(t))
        }

        function S(t) {
            var e, i, s, a, o = t[0] / 360,
                n = t[1] / 100,
                l = t[2] / 100,
                h = n + l;
            switch (h > 1 && (n /= h, l /= h), e = Math.floor(6 * o), i = 1 - l, s = 6 * o - e, 0 != (1 & e) && (s = 1 - s), a = n + s * (i - n), e) {
                default:
                    case 6:
                    case 0:
                    r = i,
                g = a,
                b = n;
                break;
                case 1:
                        r = a,
                    g = i,
                    b = n;
                    break;
                case 2:
                        r = n,
                    g = i,
                    b = a;
                    break;
                case 3:
                        r = n,
                    g = a,
                    b = i;
                    break;
                case 4:
                        r = a,
                    g = n,
                    b = i;
                    break;
                case 5:
                        r = i,
                    g = n,
                    b = a
            }
            return [255 * r, 255 * g, 255 * b]
        }

        function w(t) {
            return s(S(t))
        }

        function C(t) {
            return a(S(t))
        }

        function M(t) {
            return n(S(t))
        }

        function A(t) {
            return l(S(t))
        }

        function T(t) {
            var e, i, s, a = t[0] / 100,
                o = t[1] / 100,
                n = t[2] / 100,
                r = t[3] / 100;
            return e = 1 - Math.min(1, a * (1 - r) + r), i = 1 - Math.min(1, o * (1 - r) + r), s = 1 - Math.min(1, n * (1 - r) + r), [255 * e, 255 * i, 255 * s]
        }

        function F(t) {
            return s(T(t))
        }

        function I(t) {
            return a(T(t))
        }

        function P(t) {
            return o(T(t))
        }

        function V(t) {
            return l(T(t))
        }

        function O(t) {
            var e, i, s, a = t[0] / 100,
                o = t[1] / 100,
                n = t[2] / 100;
            return e = 3.2406 * a + -1.5372 * o + n * -.4986, i = a * -.9689 + 1.8758 * o + .0415 * n, s = .0557 * a + o * -.204 + 1.057 * n, e = e > .0031308 ? 1.055 * Math.pow(e, 1 / 2.4) - .055 : e = 12.92 * e, i = i > .0031308 ? 1.055 * Math.pow(i, 1 / 2.4) - .055 : i = 12.92 * i, s = s > .0031308 ? 1.055 * Math.pow(s, 1 / 2.4) - .055 : s = 12.92 * s, e = Math.min(Math.max(0, e), 1), i = Math.min(Math.max(0, i), 1), s = Math.min(Math.max(0, s), 1), [255 * e, 255 * i, 255 * s]
        }

        function W(t) {
            var e, i, s, a = t[0],
                o = t[1],
                n = t[2];
            return a /= 95.047, o /= 100, n /= 108.883, a = a > .008856 ? Math.pow(a, 1 / 3) : 7.787 * a + 16 / 116, o = o > .008856 ? Math.pow(o, 1 / 3) : 7.787 * o + 16 / 116, n = n > .008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116, e = 116 * o - 16, i = 500 * (a - o), s = 200 * (o - n), [e, i, s]
        }

        function R(t) {
            return z(W(t))
        }

        function L(t) {
            var e, i, s, a, o = t[0],
                n = t[1],
                r = t[2];
            return 8 >= o ? (i = 100 * o / 903.3, a = 7.787 * (i / 100) + 16 / 116) : (i = 100 * Math.pow((o + 16) / 116, 3), a = Math.pow(i / 100, 1 / 3)), e = .008856 >= e / 95.047 ? e = 95.047 * (n / 500 + a - 16 / 116) / 7.787 : 95.047 * Math.pow(n / 500 + a, 3), s = .008859 >= s / 108.883 ? s = 108.883 * (a - r / 200 - 16 / 116) / 7.787 : 108.883 * Math.pow(a - r / 200, 3), [e, i, s]
        }

        function z(t) {
            var e, i, s, a = t[0],
                o = t[1],
                n = t[2];
            return e = Math.atan2(n, o), i = 360 * e / 2 / Math.PI, 0 > i && (i += 360), s = Math.sqrt(o * o + n * n), [a, s, i]
        }

        function B(t) {
            return O(L(t))
        }

        function Y(t) {
            var e, i, s, a = t[0],
                o = t[1],
                n = t[2];
            return s = n / 360 * 2 * Math.PI, e = o * Math.cos(s), i = o * Math.sin(s), [a, e, i]
        }

        function N(t) {
            return L(Y(t))
        }

        function H(t) {
            return B(Y(t))
        }

        function E(t) {
            return J[t]
        }

        function U(t) {
            return s(E(t))
        }

        function j(t) {
            return a(E(t))
        }

        function G(t) {
            return o(E(t))
        }

        function q(t) {
            return n(E(t))
        }

        function Z(t) {
            return c(E(t))
        }

        function Q(t) {
            return h(E(t))
        }
        e.exports = {
            rgb2hsl: s,
            rgb2hsv: a,
            rgb2hwb: o,
            rgb2cmyk: n,
            rgb2keyword: l,
            rgb2xyz: h,
            rgb2lab: c,
            rgb2lch: u,
            hsl2rgb: d,
            hsl2hsv: f,
            hsl2hwb: m,
            hsl2cmyk: p,
            hsl2keyword: v,
            hsv2rgb: x,
            hsv2hsl: y,
            hsv2hwb: _,
            hsv2cmyk: k,
            hsv2keyword: D,
            hwb2rgb: S,
            hwb2hsl: w,
            hwb2hsv: C,
            hwb2cmyk: M,
            hwb2keyword: A,
            cmyk2rgb: T,
            cmyk2hsl: F,
            cmyk2hsv: I,
            cmyk2hwb: P,
            cmyk2keyword: V,
            keyword2rgb: E,
            keyword2hsl: U,
            keyword2hsv: j,
            keyword2hwb: G,
            keyword2cmyk: q,
            keyword2lab: Z,
            keyword2xyz: Q,
            xyz2rgb: O,
            xyz2lab: W,
            xyz2lch: R,
            lab2xyz: L,
            lab2rgb: B,
            lab2lch: z,
            lch2lab: Y,
            lch2xyz: N,
            lch2rgb: H
        };
        var J = {
                aliceblue: [240, 248, 255],
                antiquewhite: [250, 235, 215],
                aqua: [0, 255, 255],
                aquamarine: [127, 255, 212],
                azure: [240, 255, 255],
                beige: [245, 245, 220],
                bisque: [255, 228, 196],
                black: [0, 0, 0],
                blanchedalmond: [255, 235, 205],
                blue: [0, 0, 255],
                blueviolet: [138, 43, 226],
                brown: [165, 42, 42],
                burlywood: [222, 184, 135],
                cadetblue: [95, 158, 160],
                chartreuse: [127, 255, 0],
                chocolate: [210, 105, 30],
                coral: [255, 127, 80],
                cornflowerblue: [100, 149, 237],
                cornsilk: [255, 248, 220],
                crimson: [220, 20, 60],
                cyan: [0, 255, 255],
                darkblue: [0, 0, 139],
                darkcyan: [0, 139, 139],
                darkgoldenrod: [184, 134, 11],
                darkgray: [169, 169, 169],
                darkgreen: [0, 100, 0],
                darkgrey: [169, 169, 169],
                darkkhaki: [189, 183, 107],
                darkmagenta: [139, 0, 139],
                darkolivegreen: [85, 107, 47],
                darkorange: [255, 140, 0],
                darkorchid: [153, 50, 204],
                darkred: [139, 0, 0],
                darksalmon: [233, 150, 122],
                darkseagreen: [143, 188, 143],
                darkslateblue: [72, 61, 139],
                darkslategray: [47, 79, 79],
                darkslategrey: [47, 79, 79],
                darkturquoise: [0, 206, 209],
                darkviolet: [148, 0, 211],
                deeppink: [255, 20, 147],
                deepskyblue: [0, 191, 255],
                dimgray: [105, 105, 105],
                dimgrey: [105, 105, 105],
                dodgerblue: [30, 144, 255],
                firebrick: [178, 34, 34],
                floralwhite: [255, 250, 240],
                forestgreen: [34, 139, 34],
                fuchsia: [255, 0, 255],
                gainsboro: [220, 220, 220],
                ghostwhite: [248, 248, 255],
                gold: [255, 215, 0],
                goldenrod: [218, 165, 32],
                gray: [128, 128, 128],
                green: [0, 128, 0],
                greenyellow: [173, 255, 47],
                grey: [128, 128, 128],
                honeydew: [240, 255, 240],
                hotpink: [255, 105, 180],
                indianred: [205, 92, 92],
                indigo: [75, 0, 130],
                ivory: [255, 255, 240],
                khaki: [240, 230, 140],
                lavender: [230, 230, 250],
                lavenderblush: [255, 240, 245],
                lawngreen: [124, 252, 0],
                lemonchiffon: [255, 250, 205],
                lightblue: [173, 216, 230],
                lightcoral: [240, 128, 128],
                lightcyan: [224, 255, 255],
                lightgoldenrodyellow: [250, 250, 210],
                lightgray: [211, 211, 211],
                lightgreen: [144, 238, 144],
                lightgrey: [211, 211, 211],
                lightpink: [255, 182, 193],
                lightsalmon: [255, 160, 122],
                lightseagreen: [32, 178, 170],
                lightskyblue: [135, 206, 250],
                lightslategray: [119, 136, 153],
                lightslategrey: [119, 136, 153],
                lightsteelblue: [176, 196, 222],
                lightyellow: [255, 255, 224],
                lime: [0, 255, 0],
                limegreen: [50, 205, 50],
                linen: [250, 240, 230],
                magenta: [255, 0, 255],
                maroon: [128, 0, 0],
                mediumaquamarine: [102, 205, 170],
                mediumblue: [0, 0, 205],
                mediumorchid: [186, 85, 211],
                mediumpurple: [147, 112, 219],
                mediumseagreen: [60, 179, 113],
                mediumslateblue: [123, 104, 238],
                mediumspringgreen: [0, 250, 154],
                mediumturquoise: [72, 209, 204],
                mediumvioletred: [199, 21, 133],
                midnightblue: [25, 25, 112],
                mintcream: [245, 255, 250],
                mistyrose: [255, 228, 225],
                moccasin: [255, 228, 181],
                navajowhite: [255, 222, 173],
                navy: [0, 0, 128],
                oldlace: [253, 245, 230],
                olive: [128, 128, 0],
                olivedrab: [107, 142, 35],
                orange: [255, 165, 0],
                orangered: [255, 69, 0],
                orchid: [218, 112, 214],
                palegoldenrod: [238, 232, 170],
                palegreen: [152, 251, 152],
                paleturquoise: [175, 238, 238],
                palevioletred: [219, 112, 147],
                papayawhip: [255, 239, 213],
                peachpuff: [255, 218, 185],
                peru: [205, 133, 63],
                pink: [255, 192, 203],
                plum: [221, 160, 221],
                powderblue: [176, 224, 230],
                purple: [128, 0, 128],
                rebeccapurple: [102, 51, 153],
                red: [255, 0, 0],
                rosybrown: [188, 143, 143],
                royalblue: [65, 105, 225],
                saddlebrown: [139, 69, 19],
                salmon: [250, 128, 114],
                sandybrown: [244, 164, 96],
                seagreen: [46, 139, 87],
                seashell: [255, 245, 238],
                sienna: [160, 82, 45],
                silver: [192, 192, 192],
                skyblue: [135, 206, 235],
                slateblue: [106, 90, 205],
                slategray: [112, 128, 144],
                slategrey: [112, 128, 144],
                snow: [255, 250, 250],
                springgreen: [0, 255, 127],
                steelblue: [70, 130, 180],
                tan: [210, 180, 140],
                teal: [0, 128, 128],
                thistle: [216, 191, 216],
                tomato: [255, 99, 71],
                turquoise: [64, 224, 208],
                violet: [238, 130, 238],
                wheat: [245, 222, 179],
                white: [255, 255, 255],
                whitesmoke: [245, 245, 245],
                yellow: [255, 255, 0],
                yellowgreen: [154, 205, 50]
            },
            X = {};
        for (var $ in J) X[JSON.stringify(J[$])] = $
    }, {}],
    3: [function(t, e, i) {
        var s = t("./conversions"),
            a = function() {
                return new h
            };
        for (var o in s) {
            a[o + "Raw"] = function(t) {
                return function(e) {
                    return "number" == typeof e && (e = Array.prototype.slice.call(arguments)), s[t](e)
                }
            }(o);
            var n = /(\w+)2(\w+)/.exec(o),
                r = n[1],
                l = n[2];
            a[r] = a[r] || {}, a[r][l] = a[o] = function(t) {
                return function(e) {
                    "number" == typeof e && (e = Array.prototype.slice.call(arguments));
                    var i = s[t](e);
                    if ("string" == typeof i || void 0 === i) return i;
                    for (var a = 0; a < i.length; a++) i[a] = Math.round(i[a]);
                    return i
                }
            }(o)
        }
        var h = function() {
            this.convs = {}
        };
        h.prototype.routeSpace = function(t, e) {
            var i = e[0];
            return void 0 === i ? this.getValues(t) : ("number" == typeof i && (i = Array.prototype.slice.call(e)), this.setValues(t, i))
        }, h.prototype.setValues = function(t, e) {
            return this.space = t, this.convs = {}, this.convs[t] = e, this
        }, h.prototype.getValues = function(t) {
            var e = this.convs[t];
            if (!e) {
                var i = this.space,
                    s = this.convs[i];
                e = a[i][t](s), this.convs[t] = e
            }
            return e
        }, ["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function(t) {
            h.prototype[t] = function(e) {
                return this.routeSpace(t, arguments)
            }
        }), e.exports = a
    }, {
        "./conversions": 2
    }],
    4: [function(t, e, i) {
        e.exports = {
            aliceblue: [240, 248, 255],
            antiquewhite: [250, 235, 215],
            aqua: [0, 255, 255],
            aquamarine: [127, 255, 212],
            azure: [240, 255, 255],
            beige: [245, 245, 220],
            bisque: [255, 228, 196],
            black: [0, 0, 0],
            blanchedalmond: [255, 235, 205],
            blue: [0, 0, 255],
            blueviolet: [138, 43, 226],
            brown: [165, 42, 42],
            burlywood: [222, 184, 135],
            cadetblue: [95, 158, 160],
            chartreuse: [127, 255, 0],
            chocolate: [210, 105, 30],
            coral: [255, 127, 80],
            cornflowerblue: [100, 149, 237],
            cornsilk: [255, 248, 220],
            crimson: [220, 20, 60],
            cyan: [0, 255, 255],
            darkblue: [0, 0, 139],
            darkcyan: [0, 139, 139],
            darkgoldenrod: [184, 134, 11],
            darkgray: [169, 169, 169],
            darkgreen: [0, 100, 0],
            darkgrey: [169, 169, 169],
            darkkhaki: [189, 183, 107],
            darkmagenta: [139, 0, 139],
            darkolivegreen: [85, 107, 47],
            darkorange: [255, 140, 0],
            darkorchid: [153, 50, 204],
            darkred: [139, 0, 0],
            darksalmon: [233, 150, 122],
            darkseagreen: [143, 188, 143],
            darkslateblue: [72, 61, 139],
            darkslategray: [47, 79, 79],
            darkslategrey: [47, 79, 79],
            darkturquoise: [0, 206, 209],
            darkviolet: [148, 0, 211],
            deeppink: [255, 20, 147],
            deepskyblue: [0, 191, 255],
            dimgray: [105, 105, 105],
            dimgrey: [105, 105, 105],
            dodgerblue: [30, 144, 255],
            firebrick: [178, 34, 34],
            floralwhite: [255, 250, 240],
            forestgreen: [34, 139, 34],
            fuchsia: [255, 0, 255],
            gainsboro: [220, 220, 220],
            ghostwhite: [248, 248, 255],
            gold: [255, 215, 0],
            goldenrod: [218, 165, 32],
            gray: [128, 128, 128],
            green: [0, 128, 0],
            greenyellow: [173, 255, 47],
            grey: [128, 128, 128],
            honeydew: [240, 255, 240],
            hotpink: [255, 105, 180],
            indianred: [205, 92, 92],
            indigo: [75, 0, 130],
            ivory: [255, 255, 240],
            khaki: [240, 230, 140],
            lavender: [230, 230, 250],
            lavenderblush: [255, 240, 245],
            lawngreen: [124, 252, 0],
            lemonchiffon: [255, 250, 205],
            lightblue: [173, 216, 230],
            lightcoral: [240, 128, 128],
            lightcyan: [224, 255, 255],
            lightgoldenrodyellow: [250, 250, 210],
            lightgray: [211, 211, 211],
            lightgreen: [144, 238, 144],
            lightgrey: [211, 211, 211],
            lightpink: [255, 182, 193],
            lightsalmon: [255, 160, 122],
            lightseagreen: [32, 178, 170],
            lightskyblue: [135, 206, 250],
            lightslategray: [119, 136, 153],
            lightslategrey: [119, 136, 153],
            lightsteelblue: [176, 196, 222],
            lightyellow: [255, 255, 224],
            lime: [0, 255, 0],
            limegreen: [50, 205, 50],
            linen: [250, 240, 230],
            magenta: [255, 0, 255],
            maroon: [128, 0, 0],
            mediumaquamarine: [102, 205, 170],
            mediumblue: [0, 0, 205],
            mediumorchid: [186, 85, 211],
            mediumpurple: [147, 112, 219],
            mediumseagreen: [60, 179, 113],
            mediumslateblue: [123, 104, 238],
            mediumspringgreen: [0, 250, 154],
            mediumturquoise: [72, 209, 204],
            mediumvioletred: [199, 21, 133],
            midnightblue: [25, 25, 112],
            mintcream: [245, 255, 250],
            mistyrose: [255, 228, 225],
            moccasin: [255, 228, 181],
            navajowhite: [255, 222, 173],
            navy: [0, 0, 128],
            oldlace: [253, 245, 230],
            olive: [128, 128, 0],
            olivedrab: [107, 142, 35],
            orange: [255, 165, 0],
            orangered: [255, 69, 0],
            orchid: [218, 112, 214],
            palegoldenrod: [238, 232, 170],
            palegreen: [152, 251, 152],
            paleturquoise: [175, 238, 238],
            palevioletred: [219, 112, 147],
            papayawhip: [255, 239, 213],
            peachpuff: [255, 218, 185],
            peru: [205, 133, 63],
            pink: [255, 192, 203],
            plum: [221, 160, 221],
            powderblue: [176, 224, 230],
            purple: [128, 0, 128],
            rebeccapurple: [102, 51, 153],
            red: [255, 0, 0],
            rosybrown: [188, 143, 143],
            royalblue: [65, 105, 225],
            saddlebrown: [139, 69, 19],
            salmon: [250, 128, 114],
            sandybrown: [244, 164, 96],
            seagreen: [46, 139, 87],
            seashell: [255, 245, 238],
            sienna: [160, 82, 45],
            silver: [192, 192, 192],
            skyblue: [135, 206, 235],
            slateblue: [106, 90, 205],
            slategray: [112, 128, 144],
            slategrey: [112, 128, 144],
            snow: [255, 250, 250],
            springgreen: [0, 255, 127],
            steelblue: [70, 130, 180],
            tan: [210, 180, 140],
            teal: [0, 128, 128],
            thistle: [216, 191, 216],
            tomato: [255, 99, 71],
            turquoise: [64, 224, 208],
            violet: [238, 130, 238],
            wheat: [245, 222, 179],
            white: [255, 255, 255],
            whitesmoke: [245, 245, 245],
            yellow: [255, 255, 0],
            yellowgreen: [154, 205, 50]
        }
    }, {}],
    5: [function(t, e, i) {
        function s(t) {
            if (t) {
                var e = /^#([a-fA-F0-9]{3})$/,
                    i = /^#([a-fA-F0-9]{6})$/,
                    s = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
                    a = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
                    o = /(\w+)/,
                    n = [0, 0, 0],
                    r = 1,
                    l = t.match(e);
                if (l) {
                    l = l[1];
                    for (var h = 0; h < n.length; h++) n[h] = parseInt(l[h] + l[h], 16)
                } else if (l = t.match(i)) {
                    l = l[1];
                    for (var h = 0; h < n.length; h++) n[h] = parseInt(l.slice(2 * h, 2 * h + 2), 16)
                } else if (l = t.match(s)) {
                    for (var h = 0; h < n.length; h++) n[h] = parseInt(l[h + 1]);
                    r = parseFloat(l[4])
                } else if (l = t.match(a)) {
                    for (var h = 0; h < n.length; h++) n[h] = Math.round(2.55 * parseFloat(l[h + 1]));
                    r = parseFloat(l[4])
                } else if (l = t.match(o)) {
                    if ("transparent" == l[1]) return [0, 0, 0, 0];
                    if (n = y[l[1]], !n) return
                }
                for (var h = 0; h < n.length; h++) n[h] = v(n[h], 0, 255);
                return r = r || 0 == r ? v(r, 0, 1) : 1, n[3] = r, n
            }
        }

        function a(t) {
            if (t) {
                var e = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,
                    i = t.match(e);
                if (i) {
                    var s = parseFloat(i[4]),
                        a = v(parseInt(i[1]), 0, 360),
                        o = v(parseFloat(i[2]), 0, 100),
                        n = v(parseFloat(i[3]), 0, 100),
                        r = v(isNaN(s) ? 1 : s, 0, 1);
                    return [a, o, n, r]
                }
            }
        }

        function o(t) {
            if (t) {
                var e = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,
                    i = t.match(e);
                if (i) {
                    var s = parseFloat(i[4]),
                        a = v(parseInt(i[1]), 0, 360),
                        o = v(parseFloat(i[2]), 0, 100),
                        n = v(parseFloat(i[3]), 0, 100),
                        r = v(isNaN(s) ? 1 : s, 0, 1);
                    return [a, o, n, r]
                }
            }
        }

        function n(t) {
            var e = s(t);
            return e && e.slice(0, 3)
        }

        function r(t) {
            var e = a(t);
            return e && e.slice(0, 3)
        }

        function l(t) {
            var e = s(t);
            return e ? e[3] : (e = a(t)) ? e[3] : (e = o(t)) ? e[3] : void 0
        }

        function h(t) {
            return "#" + x(t[0]) + x(t[1]) + x(t[2])
        }

        function c(t, e) {
            return 1 > e || t[3] && t[3] < 1 ? u(t, e) : "rgb(" + t[0] + ", " + t[1] + ", " + t[2] + ")"
        }

        function u(t, e) {
            return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "rgba(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + e + ")"
        }

        function d(t, e) {
            if (1 > e || t[3] && t[3] < 1) return f(t, e);
            var i = Math.round(t[0] / 255 * 100),
                s = Math.round(t[1] / 255 * 100),
                a = Math.round(t[2] / 255 * 100);
            return "rgb(" + i + "%, " + s + "%, " + a + "%)"
        }

        function f(t, e) {
            var i = Math.round(t[0] / 255 * 100),
                s = Math.round(t[1] / 255 * 100),
                a = Math.round(t[2] / 255 * 100);
            return "rgba(" + i + "%, " + s + "%, " + a + "%, " + (e || t[3] || 1) + ")"
        }

        function m(t, e) {
            return 1 > e || t[3] && t[3] < 1 ? g(t, e) : "hsl(" + t[0] + ", " + t[1] + "%, " + t[2] + "%)"
        }

        function g(t, e) {
            return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "hsla(" + t[0] + ", " + t[1] + "%, " + t[2] + "%, " + e + ")"
        }

        function p(t, e) {
            return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "hwb(" + t[0] + ", " + t[1] + "%, " + t[2] + "%" + (void 0 !== e && 1 !== e ? ", " + e : "") + ")"
        }

        function b(t) {
            return _[t.slice(0, 3)]
        }

        function v(t, e, i) {
            return Math.min(Math.max(e, t), i)
        }

        function x(t) {
            var e = t.toString(16).toUpperCase();
            return e.length < 2 ? "0" + e : e
        }
        var y = t("color-name");
        e.exports = {
            getRgba: s,
            getHsla: a,
            getRgb: n,
            getHsl: r,
            getHwb: o,
            getAlpha: l,
            hexString: h,
            rgbString: c,
            rgbaString: u,
            percentString: d,
            percentaString: f,
            hslString: m,
            hslaString: g,
            hwbString: p,
            keyword: b
        };
        var _ = {};
        for (var k in y) _[y[k]] = k
    }, {
        "color-name": 4
    }],
    6: [function(t, e, i) {
        ! function(t, s) {
            "object" == typeof i && "undefined" != typeof e ? e.exports = s() : "function" == typeof define && define.amd ? define(s) : t.moment = s()
        }(this, function() {
            "use strict";

            function i() {
                return Zi.apply(null, arguments)
            }

            function s(t) {
                Zi = t
            }

            function a(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            }

            function o(t) {
                return t instanceof Date || "[object Date]" === Object.prototype.toString.call(t)
            }

            function n(t, e) {
                var i, s = [];
                for (i = 0; i < t.length; ++i) s.push(e(t[i], i));
                return s
            }

            function r(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            }

            function l(t, e) {
                for (var i in e) r(e, i) && (t[i] = e[i]);
                return r(e, "toString") && (t.toString = e.toString), r(e, "valueOf") && (t.valueOf = e.valueOf), t
            }

            function h(t, e, i, s) {
                return It(t, e, i, s, !0).utc()
            }

            function c() {
                return {
                    empty: !1,
                    unusedTokens: [],
                    unusedInput: [],
                    overflow: -2,
                    charsLeftOver: 0,
                    nullInput: !1,
                    invalidMonth: null,
                    invalidFormat: !1,
                    userInvalidated: !1,
                    iso: !1
                }
            }

            function u(t) {
                return null == t._pf && (t._pf = c()), t._pf
            }

            function d(t) {
                if (null == t._isValid) {
                    var e = u(t);
                    t._isValid = !(isNaN(t._d.getTime()) || !(e.overflow < 0) || e.empty || e.invalidMonth || e.invalidWeekday || e.nullInput || e.invalidFormat || e.userInvalidated), t._strict && (t._isValid = t._isValid && 0 === e.charsLeftOver && 0 === e.unusedTokens.length && void 0 === e.bigHour)
                }
                return t._isValid
            }

            function f(t) {
                var e = h(NaN);
                return null != t ? l(u(e), t) : u(e).userInvalidated = !0, e
            }

            function m(t) {
                return void 0 === t
            }

            function g(t, e) {
                var i, s, a;
                if (m(e._isAMomentObject) || (t._isAMomentObject = e._isAMomentObject), m(e._i) || (t._i = e._i), m(e._f) || (t._f = e._f), m(e._l) || (t._l = e._l), m(e._strict) || (t._strict = e._strict), m(e._tzm) || (t._tzm = e._tzm), m(e._isUTC) || (t._isUTC = e._isUTC), m(e._offset) || (t._offset = e._offset), m(e._pf) || (t._pf = u(e)), m(e._locale) || (t._locale = e._locale), Ji.length > 0)
                    for (i in Ji) s = Ji[i], a = e[s], m(a) || (t[s] = a);
                return t
            }

            function p(t) {
                g(this, t), this._d = new Date(null != t._d ? t._d.getTime() : NaN), Xi === !1 && (Xi = !0, i.updateOffset(this), Xi = !1)
            }

            function b(t) {
                return t instanceof p || null != t && null != t._isAMomentObject
            }

            function v(t) {
                return 0 > t ? Math.ceil(t) : Math.floor(t)
            }

            function x(t) {
                var e = +t,
                    i = 0;
                return 0 !== e && isFinite(e) && (i = v(e)), i
            }

            function y(t, e, i) {
                var s, a = Math.min(t.length, e.length),
                    o = Math.abs(t.length - e.length),
                    n = 0;
                for (s = 0; a > s; s++)(i && t[s] !== e[s] || !i && x(t[s]) !== x(e[s])) && n++;
                return n + o
            }

            function _() {}

            function k(t) {
                return t ? t.toLowerCase().replace("_", "-") : t
            }

            function D(t) {
                for (var e, i, s, a, o = 0; o < t.length;) {
                    for (a = k(t[o]).split("-"), e = a.length, i = k(t[o + 1]), i = i ? i.split("-") : null; e > 0;) {
                        if (s = S(a.slice(0, e).join("-"))) return s;
                        if (i && i.length >= e && y(a, i, !0) >= e - 1) break;
                        e--
                    }
                    o++
                }
                return null
            }

            function S(i) {
                var s = null;
                if (!$i[i] && "undefined" != typeof e && e && e.exports) try {
                    s = Qi._abbr, t("./locale/" + i), w(s)
                } catch (a) {}
                return $i[i]
            }

            function w(t, e) {
                var i;
                return t && (i = m(e) ? M(t) : C(t, e), i && (Qi = i)), Qi._abbr
            }

            function C(t, e) {
                return null !== e ? (e.abbr = t, $i[t] = $i[t] || new _, $i[t].set(e), w(t), $i[t]) : (delete $i[t], null)
            }

            function M(t) {
                var e;
                if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t) return Qi;
                if (!a(t)) {
                    if (e = S(t)) return e;
                    t = [t]
                }
                return D(t)
            }

            function A(t, e) {
                var i = t.toLowerCase();
                Ki[i] = Ki[i + "s"] = Ki[e] = t
            }

            function T(t) {
                return "string" == typeof t ? Ki[t] || Ki[t.toLowerCase()] : void 0
            }

            function F(t) {
                var e, i, s = {};
                for (i in t) r(t, i) && (e = T(i), e && (s[e] = t[i]));
                return s
            }

            function I(t) {
                return t instanceof Function || "[object Function]" === Object.prototype.toString.call(t)
            }

            function P(t, e) {
                return function(s) {
                    return null != s ? (O(this, t, s), i.updateOffset(this, e), this) : V(this, t)
                }
            }

            function V(t, e) {
                return t.isValid() ? t._d["get" + (t._isUTC ? "UTC" : "") + e]() : NaN
            }

            function O(t, e, i) {
                t.isValid() && t._d["set" + (t._isUTC ? "UTC" : "") + e](i)
            }

            function W(t, e) {
                var i;
                if ("object" == typeof t)
                    for (i in t) this.set(i, t[i]);
                else if (t = T(t), I(this[t])) return this[t](e);
                return this
            }

            function R(t, e, i) {
                var s = "" + Math.abs(t),
                    a = e - s.length,
                    o = t >= 0;
                return (o ? i ? "+" : "" : "-") + Math.pow(10, Math.max(0, a)).toString().substr(1) + s
            }

            function L(t, e, i, s) {
                var a = s;
                "string" == typeof s && (a = function() {
                    return this[s]()
                }), t && (ss[t] = a), e && (ss[e[0]] = function() {
                    return R(a.apply(this, arguments), e[1], e[2])
                }), i && (ss[i] = function() {
                    return this.localeData().ordinal(a.apply(this, arguments), t)
                })
            }

            function z(t) {
                return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "")
            }

            function B(t) {
                var e, i, s = t.match(ts);
                for (e = 0, i = s.length; i > e; e++) ss[s[e]] ? s[e] = ss[s[e]] : s[e] = z(s[e]);
                return function(a) {
                    var o = "";
                    for (e = 0; i > e; e++) o += s[e] instanceof Function ? s[e].call(a, t) : s[e];
                    return o
                }
            }

            function Y(t, e) {
                return t.isValid() ? (e = N(e, t.localeData()), is[e] = is[e] || B(e), is[e](t)) : t.localeData().invalidDate()
            }

            function N(t, e) {
                function i(t) {
                    return e.longDateFormat(t) || t
                }
                var s = 5;
                for (es.lastIndex = 0; s >= 0 && es.test(t);) t = t.replace(es, i), es.lastIndex = 0, s -= 1;
                return t
            }

            function H(t, e, i) {
                _s[t] = I(e) ? e : function(t, s) {
                    return t && i ? i : e
                }
            }

            function E(t, e) {
                return r(_s, t) ? _s[t](e._strict, e._locale) : new RegExp(U(t))
            }

            function U(t) {
                return j(t.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(t, e, i, s, a) {
                    return e || i || s || a
                }))
            }

            function j(t) {
                return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
            }

            function G(t, e) {
                var i, s = e;
                for ("string" == typeof t && (t = [t]), "number" == typeof e && (s = function(t, i) {
                        i[e] = x(t)
                    }), i = 0; i < t.length; i++) ks[t[i]] = s
            }

            function q(t, e) {
                G(t, function(t, i, s, a) {
                    s._w = s._w || {}, e(t, s._w, s, a)
                })
            }

            function Z(t, e, i) {
                null != e && r(ks, t) && ks[t](e, i._a, i, t)
            }

            function Q(t, e) {
                return new Date(Date.UTC(t, e + 1, 0)).getUTCDate()
            }

            function J(t, e) {
                return a(this._months) ? this._months[t.month()] : this._months[Ps.test(e) ? "format" : "standalone"][t.month()]
            }

            function X(t, e) {
                return a(this._monthsShort) ? this._monthsShort[t.month()] : this._monthsShort[Ps.test(e) ? "format" : "standalone"][t.month()]
            }

            function $(t, e, i) {
                var s, a, o;
                for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), s = 0; 12 > s; s++) {
                    if (a = h([2e3, s]), i && !this._longMonthsParse[s] && (this._longMonthsParse[s] = new RegExp("^" + this.months(a, "").replace(".", "") + "$", "i"), this._shortMonthsParse[s] = new RegExp("^" + this.monthsShort(a, "").replace(".", "") + "$", "i")), i || this._monthsParse[s] || (o = "^" + this.months(a, "") + "|^" + this.monthsShort(a, ""), this._monthsParse[s] = new RegExp(o.replace(".", ""), "i")), i && "MMMM" === e && this._longMonthsParse[s].test(t)) return s;
                    if (i && "MMM" === e && this._shortMonthsParse[s].test(t)) return s;
                    if (!i && this._monthsParse[s].test(t)) return s
                }
            }

            function K(t, e) {
                var i;
                return t.isValid() ? "string" == typeof e && (e = t.localeData().monthsParse(e), "number" != typeof e) ? t : (i = Math.min(t.date(), Q(t.year(), e)), t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, i), t) : t
            }

            function tt(t) {
                return null != t ? (K(this, t), i.updateOffset(this, !0), this) : V(this, "Month")
            }

            function et() {
                return Q(this.year(), this.month())
            }

            function it(t) {
                return this._monthsParseExact ? (r(this, "_monthsRegex") || at.call(this), t ? this._monthsShortStrictRegex : this._monthsShortRegex) : this._monthsShortStrictRegex && t ? this._monthsShortStrictRegex : this._monthsShortRegex
            }

            function st(t) {
                return this._monthsParseExact ? (r(this, "_monthsRegex") || at.call(this), t ? this._monthsStrictRegex : this._monthsRegex) : this._monthsStrictRegex && t ? this._monthsStrictRegex : this._monthsRegex
            }

            function at() {
                function t(t, e) {
                    return e.length - t.length
                }
                var e, i, s = [],
                    a = [],
                    o = [];
                for (e = 0; 12 > e; e++) i = h([2e3, e]), s.push(this.monthsShort(i, "")), a.push(this.months(i, "")), o.push(this.months(i, "")), o.push(this.monthsShort(i, ""));
                for (s.sort(t), a.sort(t), o.sort(t), e = 0; 12 > e; e++) s[e] = j(s[e]), a[e] = j(a[e]), o[e] = j(o[e]);
                this._monthsRegex = new RegExp("^(" + o.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + a.join("|") + ")$", "i"), this._monthsShortStrictRegex = new RegExp("^(" + s.join("|") + ")$", "i")
            }

            function ot(t) {
                var e, i = t._a;
                return i && -2 === u(t).overflow && (e = i[Ss] < 0 || i[Ss] > 11 ? Ss : i[ws] < 1 || i[ws] > Q(i[Ds], i[Ss]) ? ws : i[Cs] < 0 || i[Cs] > 24 || 24 === i[Cs] && (0 !== i[Ms] || 0 !== i[As] || 0 !== i[Ts]) ? Cs : i[Ms] < 0 || i[Ms] > 59 ? Ms : i[As] < 0 || i[As] > 59 ? As : i[Ts] < 0 || i[Ts] > 999 ? Ts : -1, u(t)._overflowDayOfYear && (Ds > e || e > ws) && (e = ws), u(t)._overflowWeeks && -1 === e && (e = Fs), u(t)._overflowWeekday && -1 === e && (e = Is), u(t).overflow = e), t
            }

            function nt(t) {
                i.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + t)
            }

            function rt(t, e) {
                var i = !0;
                return l(function() {
                    return i && (nt(t + "\nArguments: " + Array.prototype.slice.call(arguments).join(", ") + "\n" + (new Error).stack), i = !1), e.apply(this, arguments)
                }, e)
            }

            function lt(t, e) {
                Ls[t] || (nt(e), Ls[t] = !0)
            }

            function ht(t) {
                var e, i, s, a, o, n, r = t._i,
                    l = zs.exec(r) || Bs.exec(r);
                if (l) {
                    for (u(t).iso = !0, e = 0, i = Ns.length; i > e; e++)
                        if (Ns[e][1].exec(l[1])) {
                            a = Ns[e][0], s = Ns[e][2] !== !1;
                            break
                        }
                    if (null == a) return void(t._isValid = !1);
                    if (l[3]) {
                        for (e = 0, i = Hs.length; i > e; e++)
                            if (Hs[e][1].exec(l[3])) {
                                o = (l[2] || " ") + Hs[e][0];
                                break
                            }
                        if (null == o) return void(t._isValid = !1)
                    }
                    if (!s && null != o) return void(t._isValid = !1);
                    if (l[4]) {
                        if (!Ys.exec(l[4])) return void(t._isValid = !1);
                        n = "Z"
                    }
                    t._f = a + (o || "") + (n || ""), St(t)
                } else t._isValid = !1
            }

            function ct(t) {
                var e = Es.exec(t._i);
                return null !== e ? void(t._d = new Date(+e[1])) : (ht(t), void(t._isValid === !1 && (delete t._isValid, i.createFromInputFallback(t))))
            }

            function ut(t, e, i, s, a, o, n) {
                var r = new Date(t, e, i, s, a, o, n);
                return 100 > t && t >= 0 && isFinite(r.getFullYear()) && r.setFullYear(t), r
            }

            function dt(t) {
                var e = new Date(Date.UTC.apply(null, arguments));
                return 100 > t && t >= 0 && isFinite(e.getUTCFullYear()) && e.setUTCFullYear(t), e
            }

            function ft(t) {
                return mt(t) ? 366 : 365
            }

            function mt(t) {
                return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
            }

            function gt() {
                return mt(this.year())
            }

            function pt(t, e, i) {
                var s = 7 + e - i,
                    a = (7 + dt(t, 0, s).getUTCDay() - e) % 7;
                return -a + s - 1
            }

            function bt(t, e, i, s, a) {
                var o, n, r = (7 + i - s) % 7,
                    l = pt(t, s, a),
                    h = 1 + 7 * (e - 1) + r + l;
                return 0 >= h ? (o = t - 1, n = ft(o) + h) : h > ft(t) ? (o = t + 1, n = h - ft(t)) : (o = t, n = h), {
                    year: o,
                    dayOfYear: n
                }
            }

            function vt(t, e, i) {
                var s, a, o = pt(t.year(), e, i),
                    n = Math.floor((t.dayOfYear() - o - 1) / 7) + 1;
                return 1 > n ? (a = t.year() - 1, s = n + xt(a, e, i)) : n > xt(t.year(), e, i) ? (s = n - xt(t.year(), e, i), a = t.year() + 1) : (a = t.year(), s = n), {
                    week: s,
                    year: a
                }
            }

            function xt(t, e, i) {
                var s = pt(t, e, i),
                    a = pt(t + 1, e, i);
                return (ft(t) - s + a) / 7
            }

            function yt(t, e, i) {
                return null != t ? t : null != e ? e : i
            }

            function _t(t) {
                var e = new Date(i.now());
                return t._useUTC ? [e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()] : [e.getFullYear(), e.getMonth(), e.getDate()]
            }

            function kt(t) {
                var e, i, s, a, o = [];
                if (!t._d) {
                    for (s = _t(t), t._w && null == t._a[ws] && null == t._a[Ss] && Dt(t), t._dayOfYear && (a = yt(t._a[Ds], s[Ds]), t._dayOfYear > ft(a) && (u(t)._overflowDayOfYear = !0), i = dt(a, 0, t._dayOfYear), t._a[Ss] = i.getUTCMonth(), t._a[ws] = i.getUTCDate()), e = 0; 3 > e && null == t._a[e]; ++e) t._a[e] = o[e] = s[e];
                    for (; 7 > e; e++) t._a[e] = o[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
                    24 === t._a[Cs] && 0 === t._a[Ms] && 0 === t._a[As] && 0 === t._a[Ts] && (t._nextDay = !0, t._a[Cs] = 0), t._d = (t._useUTC ? dt : ut).apply(null, o), null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), t._nextDay && (t._a[Cs] = 24)
                }
            }

            function Dt(t) {
                var e, i, s, a, o, n, r, l;
                e = t._w, null != e.GG || null != e.W || null != e.E ? (o = 1, n = 4, i = yt(e.GG, t._a[Ds], vt(Pt(), 1, 4).year), s = yt(e.W, 1), a = yt(e.E, 1), (1 > a || a > 7) && (l = !0)) : (o = t._locale._week.dow, n = t._locale._week.doy, i = yt(e.gg, t._a[Ds], vt(Pt(), o, n).year), s = yt(e.w, 1), null != e.d ? (a = e.d, (0 > a || a > 6) && (l = !0)) : null != e.e ? (a = e.e + o, (e.e < 0 || e.e > 6) && (l = !0)) : a = o), 1 > s || s > xt(i, o, n) ? u(t)._overflowWeeks = !0 : null != l ? u(t)._overflowWeekday = !0 : (r = bt(i, s, a, o, n), t._a[Ds] = r.year, t._dayOfYear = r.dayOfYear)
            }

            function St(t) {
                if (t._f === i.ISO_8601) return void ht(t);
                t._a = [], u(t).empty = !0;
                var e, s, a, o, n, r = "" + t._i,
                    l = r.length,
                    h = 0;
                for (a = N(t._f, t._locale).match(ts) || [], e = 0; e < a.length; e++) o = a[e], s = (r.match(E(o, t)) || [])[0], s && (n = r.substr(0, r.indexOf(s)), n.length > 0 && u(t).unusedInput.push(n), r = r.slice(r.indexOf(s) + s.length), h += s.length), ss[o] ? (s ? u(t).empty = !1 : u(t).unusedTokens.push(o), Z(o, s, t)) : t._strict && !s && u(t).unusedTokens.push(o);
                u(t).charsLeftOver = l - h, r.length > 0 && u(t).unusedInput.push(r), u(t).bigHour === !0 && t._a[Cs] <= 12 && t._a[Cs] > 0 && (u(t).bigHour = void 0), t._a[Cs] = wt(t._locale, t._a[Cs], t._meridiem), kt(t), ot(t)
            }

            function wt(t, e, i) {
                var s;
                return null == i ? e : null != t.meridiemHour ? t.meridiemHour(e, i) : null != t.isPM ? (s = t.isPM(i), s && 12 > e && (e += 12), s || 12 !== e || (e = 0), e) : e
            }

            function Ct(t) {
                var e, i, s, a, o;
                if (0 === t._f.length) return u(t).invalidFormat = !0, void(t._d = new Date(NaN));
                for (a = 0; a < t._f.length; a++) o = 0, e = g({}, t), null != t._useUTC && (e._useUTC = t._useUTC), e._f = t._f[a], St(e), d(e) && (o += u(e).charsLeftOver, o += 10 * u(e).unusedTokens.length, u(e).score = o, (null == s || s > o) && (s = o, i = e));
                l(t, i || e)
            }

            function Mt(t) {
                if (!t._d) {
                    var e = F(t._i);
                    t._a = n([e.year, e.month, e.day || e.date, e.hour, e.minute, e.second, e.millisecond], function(t) {
                        return t && parseInt(t, 10)
                    }), kt(t)
                }
            }

            function At(t) {
                var e = new p(ot(Tt(t)));
                return e._nextDay && (e.add(1, "d"), e._nextDay = void 0), e
            }

            function Tt(t) {
                var e = t._i,
                    i = t._f;
                return t._locale = t._locale || M(t._l), null === e || void 0 === i && "" === e ? f({
                    nullInput: !0
                }) : ("string" == typeof e && (t._i = e = t._locale.preparse(e)), b(e) ? new p(ot(e)) : (a(i) ? Ct(t) : i ? St(t) : o(e) ? t._d = e : Ft(t), d(t) || (t._d = null), t))
            }

            function Ft(t) {
                var e = t._i;
                void 0 === e ? t._d = new Date(i.now()) : o(e) ? t._d = new Date(+e) : "string" == typeof e ? ct(t) : a(e) ? (t._a = n(e.slice(0), function(t) {
                    return parseInt(t, 10)
                }), kt(t)) : "object" == typeof e ? Mt(t) : "number" == typeof e ? t._d = new Date(e) : i.createFromInputFallback(t)
            }

            function It(t, e, i, s, a) {
                var o = {};
                return "boolean" == typeof i && (s = i, i = void 0), o._isAMomentObject = !0, o._useUTC = o._isUTC = a, o._l = i, o._i = t, o._f = e, o._strict = s, At(o)
            }

            function Pt(t, e, i, s) {
                return It(t, e, i, s, !1)
            }

            function Vt(t, e) {
                var i, s;
                if (1 === e.length && a(e[0]) && (e = e[0]), !e.length) return Pt();
                for (i = e[0], s = 1; s < e.length; ++s)(!e[s].isValid() || e[s][t](i)) && (i = e[s]);
                return i
            }

            function Ot() {
                var t = [].slice.call(arguments, 0);
                return Vt("isBefore", t)
            }

            function Wt() {
                var t = [].slice.call(arguments, 0);
                return Vt("isAfter", t)
            }

            function Rt(t) {
                var e = F(t),
                    i = e.year || 0,
                    s = e.quarter || 0,
                    a = e.month || 0,
                    o = e.week || 0,
                    n = e.day || 0,
                    r = e.hour || 0,
                    l = e.minute || 0,
                    h = e.second || 0,
                    c = e.millisecond || 0;
                this._milliseconds = +c + 1e3 * h + 6e4 * l + 36e5 * r, this._days = +n + 7 * o, this._months = +a + 3 * s + 12 * i, this._data = {}, this._locale = M(), this._bubble()
            }

            function Lt(t) {
                return t instanceof Rt
            }

            function zt(t, e) {
                L(t, 0, 0, function() {
                    var t = this.utcOffset(),
                        i = "+";
                    return 0 > t && (t = -t, i = "-"), i + R(~~(t / 60), 2) + e + R(~~t % 60, 2)
                })
            }

            function Bt(t, e) {
                var i = (e || "").match(t) || [],
                    s = i[i.length - 1] || [],
                    a = (s + "").match(Zs) || ["-", 0, 0],
                    o = +(60 * a[1]) + x(a[2]);
                return "+" === a[0] ? o : -o
            }

            function Yt(t, e) {
                var s, a;
                return e._isUTC ? (s = e.clone(), a = (b(t) || o(t) ? +t : +Pt(t)) - +s, s._d.setTime(+s._d + a), i.updateOffset(s, !1), s) : Pt(t).local()
            }

            function Nt(t) {
                return 15 * -Math.round(t._d.getTimezoneOffset() / 15)
            }

            function Ht(t, e) {
                var s, a = this._offset || 0;
                return this.isValid() ? null != t ? ("string" == typeof t ? t = Bt(vs, t) : Math.abs(t) < 16 && (t = 60 * t), !this._isUTC && e && (s = Nt(this)), this._offset = t, this._isUTC = !0, null != s && this.add(s, "m"), a !== t && (!e || this._changeInProgress ? ae(this, Kt(t - a, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, i.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? a : Nt(this) : null != t ? this : NaN
            }

            function Et(t, e) {
                return null != t ? ("string" != typeof t && (t = -t), this.utcOffset(t, e), this) : -this.utcOffset()
            }

            function Ut(t) {
                return this.utcOffset(0, t)
            }

            function jt(t) {
                return this._isUTC && (this.utcOffset(0, t), this._isUTC = !1, t && this.subtract(Nt(this), "m")), this
            }

            function Gt() {
                return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(Bt(bs, this._i)), this
            }

            function qt(t) {
                return this.isValid() ? (t = t ? Pt(t).utcOffset() : 0, (this.utcOffset() - t) % 60 === 0) : !1
            }

            function Zt() {
                return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
            }

            function Qt() {
                if (!m(this._isDSTShifted)) return this._isDSTShifted;
                var t = {};
                if (g(t, this), t = Tt(t), t._a) {
                    var e = t._isUTC ? h(t._a) : Pt(t._a);
                    this._isDSTShifted = this.isValid() && y(t._a, e.toArray()) > 0
                } else this._isDSTShifted = !1;
                return this._isDSTShifted
            }

            function Jt() {
                return this.isValid() ? !this._isUTC : !1
            }

            function Xt() {
                return this.isValid() ? this._isUTC : !1
            }

            function $t() {
                return this.isValid() ? this._isUTC && 0 === this._offset : !1
            }

            function Kt(t, e) {
                var i, s, a, o = t,
                    n = null;
                return Lt(t) ? o = {
                    ms: t._milliseconds,
                    d: t._days,
                    M: t._months
                } : "number" == typeof t ? (o = {}, e ? o[e] = t : o.milliseconds = t) : (n = Qs.exec(t)) ? (i = "-" === n[1] ? -1 : 1, o = {
                    y: 0,
                    d: x(n[ws]) * i,
                    h: x(n[Cs]) * i,
                    m: x(n[Ms]) * i,
                    s: x(n[As]) * i,
                    ms: x(n[Ts]) * i
                }) : (n = Js.exec(t)) ? (i = "-" === n[1] ? -1 : 1, o = {
                    y: te(n[2], i),
                    M: te(n[3], i),
                    d: te(n[4], i),
                    h: te(n[5], i),
                    m: te(n[6], i),
                    s: te(n[7], i),
                    w: te(n[8], i)
                }) : null == o ? o = {} : "object" == typeof o && ("from" in o || "to" in o) && (a = ie(Pt(o.from), Pt(o.to)), o = {}, o.ms = a.milliseconds, o.M = a.months), s = new Rt(o), Lt(t) && r(t, "_locale") && (s._locale = t._locale), s
            }

            function te(t, e) {
                var i = t && parseFloat(t.replace(",", "."));
                return (isNaN(i) ? 0 : i) * e
            }

            function ee(t, e) {
                var i = {
                    milliseconds: 0,
                    months: 0
                };
                return i.months = e.month() - t.month() + 12 * (e.year() - t.year()), t.clone().add(i.months, "M").isAfter(e) && --i.months, i.milliseconds = +e - +t.clone().add(i.months, "M"), i
            }

            function ie(t, e) {
                var i;
                return t.isValid() && e.isValid() ? (e = Yt(e, t), t.isBefore(e) ? i = ee(t, e) : (i = ee(e, t), i.milliseconds = -i.milliseconds, i.months = -i.months), i) : {
                    milliseconds: 0,
                    months: 0
                }
            }

            function se(t, e) {
                return function(i, s) {
                    var a, o;
                    return null === s || isNaN(+s) || (lt(e, "moment()." + e + "(period, number) is deprecated. Please use moment()." + e + "(number, period)."), o = i, i = s, s = o), i = "string" == typeof i ? +i : i, a = Kt(i, s), ae(this, a, t), this
                }
            }

            function ae(t, e, s, a) {
                var o = e._milliseconds,
                    n = e._days,
                    r = e._months;
                t.isValid() && (a = null == a ? !0 : a, o && t._d.setTime(+t._d + o * s), n && O(t, "Date", V(t, "Date") + n * s), r && K(t, V(t, "Month") + r * s), a && i.updateOffset(t, n || r))
            }

            function oe(t, e) {
                var i = t || Pt(),
                    s = Yt(i, this).startOf("day"),
                    a = this.diff(s, "days", !0),
                    o = -6 > a ? "sameElse" : -1 > a ? "lastWeek" : 0 > a ? "lastDay" : 1 > a ? "sameDay" : 2 > a ? "nextDay" : 7 > a ? "nextWeek" : "sameElse",
                    n = e && (I(e[o]) ? e[o]() : e[o]);
                return this.format(n || this.localeData().calendar(o, this, Pt(i)))
            }

            function ne() {
                return new p(this)
            }

            function re(t, e) {
                var i = b(t) ? t : Pt(t);
                return this.isValid() && i.isValid() ? (e = T(m(e) ? "millisecond" : e), "millisecond" === e ? +this > +i : +i < +this.clone().startOf(e)) : !1
            }

            function le(t, e) {
                var i = b(t) ? t : Pt(t);
                return this.isValid() && i.isValid() ? (e = T(m(e) ? "millisecond" : e), "millisecond" === e ? +i > +this : +this.clone().endOf(e) < +i) : !1
            }

            function he(t, e, i) {
                return this.isAfter(t, i) && this.isBefore(e, i)
            }

            function ce(t, e) {
                var i, s = b(t) ? t : Pt(t);
                return this.isValid() && s.isValid() ? (e = T(e || "millisecond"), "millisecond" === e ? +this === +s : (i = +s, +this.clone().startOf(e) <= i && i <= +this.clone().endOf(e))) : !1
            }

            function ue(t, e) {
                return this.isSame(t, e) || this.isAfter(t, e)
            }

            function de(t, e) {
                return this.isSame(t, e) || this.isBefore(t, e)
            }

            function fe(t, e, i) {
                var s, a, o, n;
                return this.isValid() ? (s = Yt(t, this), s.isValid() ? (a = 6e4 * (s.utcOffset() - this.utcOffset()), e = T(e), "year" === e || "month" === e || "quarter" === e ? (n = me(this, s), "quarter" === e ? n /= 3 : "year" === e && (n /= 12)) : (o = this - s, n = "second" === e ? o / 1e3 : "minute" === e ? o / 6e4 : "hour" === e ? o / 36e5 : "day" === e ? (o - a) / 864e5 : "week" === e ? (o - a) / 6048e5 : o), i ? n : v(n)) : NaN) : NaN
            }

            function me(t, e) {
                var i, s, a = 12 * (e.year() - t.year()) + (e.month() - t.month()),
                    o = t.clone().add(a, "months");
                return 0 > e - o ? (i = t.clone().add(a - 1, "months"), s = (e - o) / (o - i)) : (i = t.clone().add(a + 1, "months"), s = (e - o) / (i - o)), -(a + s)
            }

            function ge() {
                return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
            }

            function pe() {
                var t = this.clone().utc();
                return 0 < t.year() && t.year() <= 9999 ? I(Date.prototype.toISOString) ? this.toDate().toISOString() : Y(t, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : Y(t, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
            }

            function be(t) {
                var e = Y(this, t || i.defaultFormat);
                return this.localeData().postformat(e)
            }

            function ve(t, e) {
                return this.isValid() && (b(t) && t.isValid() || Pt(t).isValid()) ? Kt({
                    to: this,
                    from: t
                }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
            }

            function xe(t) {
                return this.from(Pt(), t)
            }

            function ye(t, e) {
                return this.isValid() && (b(t) && t.isValid() || Pt(t).isValid()) ? Kt({
                    from: this,
                    to: t
                }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
            }

            function _e(t) {
                return this.to(Pt(), t)
            }

            function ke(t) {
                var e;
                return void 0 === t ? this._locale._abbr : (e = M(t), null != e && (this._locale = e), this)
            }

            function De() {
                return this._locale
            }

            function Se(t) {
                switch (t = T(t)) {
                    case "year":
                        this.month(0);
                    case "quarter":
                    case "month":
                        this.date(1);
                    case "week":
                    case "isoWeek":
                    case "day":
                        this.hours(0);
                    case "hour":
                        this.minutes(0);
                    case "minute":
                        this.seconds(0);
                    case "second":
                        this.milliseconds(0)
                }
                return "week" === t && this.weekday(0), "isoWeek" === t && this.isoWeekday(1), "quarter" === t && this.month(3 * Math.floor(this.month() / 3)), this
            }

            function we(t) {
                return t = T(t), void 0 === t || "millisecond" === t ? this : this.startOf(t).add(1, "isoWeek" === t ? "week" : t).subtract(1, "ms")
            }

            function Ce() {
                return +this._d - 6e4 * (this._offset || 0)
            }

            function Me() {
                return Math.floor(+this / 1e3)
            }

            function Ae() {
                return this._offset ? new Date(+this) : this._d
            }

            function Te() {
                var t = this;
                return [t.year(), t.month(), t.date(), t.hour(), t.minute(), t.second(), t.millisecond()]
            }

            function Fe() {
                var t = this;
                return {
                    years: t.year(),
                    months: t.month(),
                    date: t.date(),
                    hours: t.hours(),
                    minutes: t.minutes(),
                    seconds: t.seconds(),
                    milliseconds: t.milliseconds()
                }
            }

            function Ie() {
                return this.isValid() ? this.toISOString() : "null"
            }

            function Pe() {
                return d(this)
            }

            function Ve() {
                return l({}, u(this))
            }

            function Oe() {
                return u(this).overflow
            }

            function We() {
                return {
                    input: this._i,
                    format: this._f,
                    locale: this._locale,
                    isUTC: this._isUTC,
                    strict: this._strict
                }
            }

            function Re(t, e) {
                L(0, [t, t.length], 0, e)
            }

            function Le(t) {
                return Ne.call(this, t, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
            }

            function ze(t) {
                return Ne.call(this, t, this.isoWeek(), this.isoWeekday(), 1, 4)
            }

            function Be() {
                return xt(this.year(), 1, 4)
            }

            function Ye() {
                var t = this.localeData()._week;
                return xt(this.year(), t.dow, t.doy)
            }

            function Ne(t, e, i, s, a) {
                var o;
                return null == t ? vt(this, s, a).year : (o = xt(t, s, a), e > o && (e = o), He.call(this, t, e, i, s, a))
            }

            function He(t, e, i, s, a) {
                var o = bt(t, e, i, s, a),
                    n = dt(o.year, 0, o.dayOfYear);
                return this.year(n.getUTCFullYear()), this.month(n.getUTCMonth()), this.date(n.getUTCDate()), this
            }

            function Ee(t) {
                return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + this.month() % 3)
            }

            function Ue(t) {
                return vt(t, this._week.dow, this._week.doy).week
            }

            function je() {
                return this._week.dow
            }

            function Ge() {
                return this._week.doy
            }

            function qe(t) {
                var e = this.localeData().week(this);
                return null == t ? e : this.add(7 * (t - e), "d")
            }

            function Ze(t) {
                var e = vt(this, 1, 4).week;
                return null == t ? e : this.add(7 * (t - e), "d")
            }

            function Qe(t, e) {
                return "string" != typeof t ? t : isNaN(t) ? (t = e.weekdaysParse(t), "number" == typeof t ? t : null) : parseInt(t, 10)
            }

            function Je(t, e) {
                return a(this._weekdays) ? this._weekdays[t.day()] : this._weekdays[this._weekdays.isFormat.test(e) ? "format" : "standalone"][t.day()]
            }

            function Xe(t) {
                return this._weekdaysShort[t.day()]
            }

            function $e(t) {
                return this._weekdaysMin[t.day()]
            }

            function Ke(t, e, i) {
                var s, a, o;
                for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), s = 0; 7 > s; s++) {
                    if (a = Pt([2e3, 1]).day(s), i && !this._fullWeekdaysParse[s] && (this._fullWeekdaysParse[s] = new RegExp("^" + this.weekdays(a, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[s] = new RegExp("^" + this.weekdaysShort(a, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[s] = new RegExp("^" + this.weekdaysMin(a, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[s] || (o = "^" + this.weekdays(a, "") + "|^" + this.weekdaysShort(a, "") + "|^" + this.weekdaysMin(a, ""), this._weekdaysParse[s] = new RegExp(o.replace(".", ""), "i")), i && "dddd" === e && this._fullWeekdaysParse[s].test(t)) return s;
                    if (i && "ddd" === e && this._shortWeekdaysParse[s].test(t)) return s;
                    if (i && "dd" === e && this._minWeekdaysParse[s].test(t)) return s;
                    if (!i && this._weekdaysParse[s].test(t)) return s
                }
            }

            function ti(t) {
                if (!this.isValid()) return null != t ? this : NaN;
                var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
                return null != t ? (t = Qe(t, this.localeData()), this.add(t - e, "d")) : e
            }

            function ei(t) {
                if (!this.isValid()) return null != t ? this : NaN;
                var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
                return null == t ? e : this.add(t - e, "d")
            }

            function ii(t) {
                return this.isValid() ? null == t ? this.day() || 7 : this.day(this.day() % 7 ? t : t - 7) : null != t ? this : NaN
            }

            function si(t) {
                var e = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
                return null == t ? e : this.add(t - e, "d")
            }

            function ai() {
                return this.hours() % 12 || 12
            }

            function oi(t, e) {
                L(t, 0, 0, function() {
                    return this.localeData().meridiem(this.hours(), this.minutes(), e)
                })
            }

            function ni(t, e) {
                return e._meridiemParse
            }

            function ri(t) {
                return "p" === (t + "").toLowerCase().charAt(0)
            }

            function li(t, e, i) {
                return t > 11 ? i ? "pm" : "PM" : i ? "am" : "AM"
            }

            function hi(t, e) {
                e[Ts] = x(1e3 * ("0." + t))
            }

            function ci() {
                return this._isUTC ? "UTC" : ""
            }

            function ui() {
                return this._isUTC ? "Coordinated Universal Time" : ""
            }

            function di(t) {
                return Pt(1e3 * t)
            }

            function fi() {
                return Pt.apply(null, arguments).parseZone()
            }

            function mi(t, e, i) {
                var s = this._calendar[t];
                return I(s) ? s.call(e, i) : s
            }

            function gi(t) {
                var e = this._longDateFormat[t],
                    i = this._longDateFormat[t.toUpperCase()];
                return e || !i ? e : (this._longDateFormat[t] = i.replace(/MMMM|MM|DD|dddd/g, function(t) {
                    return t.slice(1)
                }), this._longDateFormat[t])
            }

            function pi() {
                return this._invalidDate
            }

            function bi(t) {
                return this._ordinal.replace("%d", t)
            }

            function vi(t) {
                return t
            }

            function xi(t, e, i, s) {
                var a = this._relativeTime[i];
                return I(a) ? a(t, e, i, s) : a.replace(/%d/i, t)
            }

            function yi(t, e) {
                var i = this._relativeTime[t > 0 ? "future" : "past"];
                return I(i) ? i(e) : i.replace(/%s/i, e)
            }

            function _i(t) {
                var e, i;
                for (i in t) e = t[i], I(e) ? this[i] = e : this["_" + i] = e;
                this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
            }

            function ki(t, e, i, s) {
                var a = M(),
                    o = h().set(s, e);
                return a[i](o, t)
            }

            function Di(t, e, i, s, a) {
                if ("number" == typeof t && (e = t, t = void 0), t = t || "", null != e) return ki(t, e, i, a);
                var o, n = [];
                for (o = 0; s > o; o++) n[o] = ki(t, o, i, a);
                return n
            }

            function Si(t, e) {
                return Di(t, e, "months", 12, "month")
            }

            function wi(t, e) {
                return Di(t, e, "monthsShort", 12, "month")
            }

            function Ci(t, e) {
                return Di(t, e, "weekdays", 7, "day")
            }

            function Mi(t, e) {
                return Di(t, e, "weekdaysShort", 7, "day")
            }

            function Ai(t, e) {
                return Di(t, e, "weekdaysMin", 7, "day")
            }

            function Ti() {
                var t = this._data;
                return this._milliseconds = ya(this._milliseconds), this._days = ya(this._days), this._months = ya(this._months), t.milliseconds = ya(t.milliseconds), t.seconds = ya(t.seconds), t.minutes = ya(t.minutes), t.hours = ya(t.hours), t.months = ya(t.months), t.years = ya(t.years), this
            }

            function Fi(t, e, i, s) {
                var a = Kt(e, i);
                return t._milliseconds += s * a._milliseconds, t._days += s * a._days, t._months += s * a._months, t._bubble()
            }

            function Ii(t, e) {
                return Fi(this, t, e, 1)
            }

            function Pi(t, e) {
                return Fi(this, t, e, -1)
            }

            function Vi(t) {
                return 0 > t ? Math.floor(t) : Math.ceil(t)
            }

            function Oi() {
                var t, e, i, s, a, o = this._milliseconds,
                    n = this._days,
                    r = this._months,
                    l = this._data;
                return o >= 0 && n >= 0 && r >= 0 || 0 >= o && 0 >= n && 0 >= r || (o += 864e5 * Vi(Ri(r) + n), n = 0, r = 0), l.milliseconds = o % 1e3, t = v(o / 1e3), l.seconds = t % 60, e = v(t / 60), l.minutes = e % 60, i = v(e / 60), l.hours = i % 24, n += v(i / 24), a = v(Wi(n)), r += a, n -= Vi(Ri(a)), s = v(r / 12), r %= 12, l.days = n, l.months = r, l.years = s, this
            }

            function Wi(t) {
                return 4800 * t / 146097
            }

            function Ri(t) {
                return 146097 * t / 4800
            }

            function Li(t) {
                var e, i, s = this._milliseconds;
                if (t = T(t), "month" === t || "year" === t) return e = this._days + s / 864e5, i = this._months + Wi(e), "month" === t ? i : i / 12;
                switch (e = this._days + Math.round(Ri(this._months)), t) {
                    case "week":
                        return e / 7 + s / 6048e5;
                    case "day":
                        return e + s / 864e5;
                    case "hour":
                        return 24 * e + s / 36e5;
                    case "minute":
                        return 1440 * e + s / 6e4;
                    case "second":
                        return 86400 * e + s / 1e3;
                    case "millisecond":
                        return Math.floor(864e5 * e) + s;
                    default:
                        throw new Error("Unknown unit " + t)
                }
            }

            function zi() {
                return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * x(this._months / 12)
            }

            function Bi(t) {
                return function() {
                    return this.as(t)
                }
            }

            function Yi(t) {
                return t = T(t), this[t + "s"]()
            }

            function Ni(t) {
                return function() {
                    return this._data[t]
                }
            }

            function Hi() {
                return v(this.days() / 7)
            }

            function Ei(t, e, i, s, a) {
                return a.relativeTime(e || 1, !!i, t, s)
            }

            function Ui(t, e, i) {
                var s = Kt(t).abs(),
                    a = Ra(s.as("s")),
                    o = Ra(s.as("m")),
                    n = Ra(s.as("h")),
                    r = Ra(s.as("d")),
                    l = Ra(s.as("M")),
                    h = Ra(s.as("y")),
                    c = a < La.s && ["s", a] || 1 >= o && ["m"] || o < La.m && ["mm", o] || 1 >= n && ["h"] || n < La.h && ["hh", n] || 1 >= r && ["d"] || r < La.d && ["dd", r] || 1 >= l && ["M"] || l < La.M && ["MM", l] || 1 >= h && ["y"] || ["yy", h];
                return c[2] = e, c[3] = +t > 0, c[4] = i, Ei.apply(null, c)
            }

            function ji(t, e) {
                return void 0 === La[t] ? !1 : void 0 === e ? La[t] : (La[t] = e, !0)
            }

            function Gi(t) {
                var e = this.localeData(),
                    i = Ui(this, !t, e);
                return t && (i = e.pastFuture(+this, i)), e.postformat(i)
            }

            function qi() {
                var t, e, i, s = za(this._milliseconds) / 1e3,
                    a = za(this._days),
                    o = za(this._months);
                t = v(s / 60), e = v(t / 60), s %= 60, t %= 60, i = v(o / 12), o %= 12;
                var n = i,
                    r = o,
                    l = a,
                    h = e,
                    c = t,
                    u = s,
                    d = this.asSeconds();
                return d ? (0 > d ? "-" : "") + "P" + (n ? n + "Y" : "") + (r ? r + "M" : "") + (l ? l + "D" : "") + (h || c || u ? "T" : "") + (h ? h + "H" : "") + (c ? c + "M" : "") + (u ? u + "S" : "") : "P0D"
            }
            var Zi, Qi, Ji = i.momentProperties = [],
                Xi = !1,
                $i = {},
                Ki = {},
                ts = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
                es = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
                is = {},
                ss = {},
                as = /\d/,
                os = /\d\d/,
                ns = /\d{3}/,
                rs = /\d{4}/,
                ls = /[+-]?\d{6}/,
                hs = /\d\d?/,
                cs = /\d\d\d\d?/,
                us = /\d\d\d\d\d\d?/,
                ds = /\d{1,3}/,
                fs = /\d{1,4}/,
                ms = /[+-]?\d{1,6}/,
                gs = /\d+/,
                ps = /[+-]?\d+/,
                bs = /Z|[+-]\d\d:?\d\d/gi,
                vs = /Z|[+-]\d\d(?::?\d\d)?/gi,
                xs = /[+-]?\d+(\.\d{1,3})?/,
                ys = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
                _s = {},
                ks = {},
                Ds = 0,
                Ss = 1,
                ws = 2,
                Cs = 3,
                Ms = 4,
                As = 5,
                Ts = 6,
                Fs = 7,
                Is = 8;
            L("M", ["MM", 2], "Mo", function() {
                return this.month() + 1
            }), L("MMM", 0, 0, function(t) {
                return this.localeData().monthsShort(this, t)
            }), L("MMMM", 0, 0, function(t) {
                return this.localeData().months(this, t)
            }), A("month", "M"), H("M", hs), H("MM", hs, os), H("MMM", function(t, e) {
                return e.monthsShortRegex(t)
            }), H("MMMM", function(t, e) {
                return e.monthsRegex(t)
            }), G(["M", "MM"], function(t, e) {
                e[Ss] = x(t) - 1
            }), G(["MMM", "MMMM"], function(t, e, i, s) {
                var a = i._locale.monthsParse(t, s, i._strict);
                null != a ? e[Ss] = a : u(i).invalidMonth = t
            });
            var Ps = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,
                Vs = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
                Os = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
                Ws = ys,
                Rs = ys,
                Ls = {};
            i.suppressDeprecationWarnings = !1;
            var zs = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
                Bs = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
                Ys = /Z|[+-]\d\d(?::?\d\d)?/,
                Ns = [
                    ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
                    ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
                    ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
                    ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
                    ["YYYY-DDD", /\d{4}-\d{3}/],
                    ["YYYY-MM", /\d{4}-\d\d/, !1],
                    ["YYYYYYMMDD", /[+-]\d{10}/],
                    ["YYYYMMDD", /\d{8}/],
                    ["GGGG[W]WWE", /\d{4}W\d{3}/],
                    ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
                    ["YYYYDDD", /\d{7}/]
                ],
                Hs = [
                    ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
                    ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
                    ["HH:mm:ss", /\d\d:\d\d:\d\d/],
                    ["HH:mm", /\d\d:\d\d/],
                    ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
                    ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
                    ["HHmmss", /\d\d\d\d\d\d/],
                    ["HHmm", /\d\d\d\d/],
                    ["HH", /\d\d/]
                ],
                Es = /^\/?Date\((\-?\d+)/i;
            i.createFromInputFallback = rt("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(t) {
                t._d = new Date(t._i + (t._useUTC ? " UTC" : ""))
            }), L("Y", 0, 0, function() {
                var t = this.year();
                return 9999 >= t ? "" + t : "+" + t
            }), L(0, ["YY", 2], 0, function() {
                return this.year() % 100
            }), L(0, ["YYYY", 4], 0, "year"), L(0, ["YYYYY", 5], 0, "year"), L(0, ["YYYYYY", 6, !0], 0, "year"), A("year", "y"), H("Y", ps), H("YY", hs, os), H("YYYY", fs, rs), H("YYYYY", ms, ls), H("YYYYYY", ms, ls), G(["YYYYY", "YYYYYY"], Ds), G("YYYY", function(t, e) {
                e[Ds] = 2 === t.length ? i.parseTwoDigitYear(t) : x(t)
            }), G("YY", function(t, e) {
                e[Ds] = i.parseTwoDigitYear(t)
            }), G("Y", function(t, e) {
                e[Ds] = parseInt(t, 10)
            }), i.parseTwoDigitYear = function(t) {
                return x(t) + (x(t) > 68 ? 1900 : 2e3)
            };
            var Us = P("FullYear", !1);
            i.ISO_8601 = function() {};
            var js = rt("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function() {
                    var t = Pt.apply(null, arguments);
                    return this.isValid() && t.isValid() ? this > t ? this : t : f()
                }),
                Gs = rt("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function() {
                    var t = Pt.apply(null, arguments);
                    return this.isValid() && t.isValid() ? t > this ? this : t : f()
                }),
                qs = function() {
                    return Date.now ? Date.now() : +new Date
                };
            zt("Z", ":"), zt("ZZ", ""), H("Z", vs), H("ZZ", vs), G(["Z", "ZZ"], function(t, e, i) {
                i._useUTC = !0, i._tzm = Bt(vs, t)
            });
            var Zs = /([\+\-]|\d\d)/gi;
            i.updateOffset = function() {};
            var Qs = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/,
                Js = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
            Kt.fn = Rt.prototype;
            var Xs = se(1, "add"),
                $s = se(-1, "subtract");
            i.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
            var Ks = rt("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(t) {
                return void 0 === t ? this.localeData() : this.locale(t)
            });
            L(0, ["gg", 2], 0, function() {
                return this.weekYear() % 100
            }), L(0, ["GG", 2], 0, function() {
                return this.isoWeekYear() % 100
            }), Re("gggg", "weekYear"), Re("ggggg", "weekYear"), Re("GGGG", "isoWeekYear"), Re("GGGGG", "isoWeekYear"), A("weekYear", "gg"), A("isoWeekYear", "GG"), H("G", ps), H("g", ps), H("GG", hs, os), H("gg", hs, os), H("GGGG", fs, rs), H("gggg", fs, rs), H("GGGGG", ms, ls), H("ggggg", ms, ls), q(["gggg", "ggggg", "GGGG", "GGGGG"], function(t, e, i, s) {
                e[s.substr(0, 2)] = x(t)
            }), q(["gg", "GG"], function(t, e, s, a) {
                e[a] = i.parseTwoDigitYear(t)
            }), L("Q", 0, "Qo", "quarter"), A("quarter", "Q"), H("Q", as), G("Q", function(t, e) {
                e[Ss] = 3 * (x(t) - 1)
            }), L("w", ["ww", 2], "wo", "week"), L("W", ["WW", 2], "Wo", "isoWeek"), A("week", "w"), A("isoWeek", "W"), H("w", hs), H("ww", hs, os), H("W", hs), H("WW", hs, os), q(["w", "ww", "W", "WW"], function(t, e, i, s) {
                e[s.substr(0, 1)] = x(t)
            });
            var ta = {
                dow: 0,
                doy: 6
            };
            L("D", ["DD", 2], "Do", "date"), A("date", "D"), H("D", hs), H("DD", hs, os), H("Do", function(t, e) {
                return t ? e._ordinalParse : e._ordinalParseLenient
            }), G(["D", "DD"], ws), G("Do", function(t, e) {
                e[ws] = x(t.match(hs)[0], 10)
            });
            var ea = P("Date", !0);
            L("d", 0, "do", "day"), L("dd", 0, 0, function(t) {
                return this.localeData().weekdaysMin(this, t)
            }), L("ddd", 0, 0, function(t) {
                return this.localeData().weekdaysShort(this, t)
            }), L("dddd", 0, 0, function(t) {
                return this.localeData().weekdays(this, t)
            }), L("e", 0, 0, "weekday"), L("E", 0, 0, "isoWeekday"), A("day", "d"), A("weekday", "e"), A("isoWeekday", "E"), H("d", hs), H("e", hs), H("E", hs), H("dd", ys), H("ddd", ys), H("dddd", ys), q(["dd", "ddd", "dddd"], function(t, e, i, s) {
                var a = i._locale.weekdaysParse(t, s, i._strict);
                null != a ? e.d = a : u(i).invalidWeekday = t
            }), q(["d", "e", "E"], function(t, e, i, s) {
                e[s] = x(t)
            });
            var ia = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
                sa = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
                aa = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
            L("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), A("dayOfYear", "DDD"), H("DDD", ds), H("DDDD", ns), G(["DDD", "DDDD"], function(t, e, i) {
                i._dayOfYear = x(t)
            }), L("H", ["HH", 2], 0, "hour"), L("h", ["hh", 2], 0, ai), L("hmm", 0, 0, function() {
                return "" + ai.apply(this) + R(this.minutes(), 2)
            }), L("hmmss", 0, 0, function() {
                return "" + ai.apply(this) + R(this.minutes(), 2) + R(this.seconds(), 2)
            }), L("Hmm", 0, 0, function() {
                return "" + this.hours() + R(this.minutes(), 2)
            }), L("Hmmss", 0, 0, function() {
                return "" + this.hours() + R(this.minutes(), 2) + R(this.seconds(), 2)
            }), oi("a", !0), oi("A", !1), A("hour", "h"), H("a", ni), H("A", ni), H("H", hs), H("h", hs), H("HH", hs, os), H("hh", hs, os), H("hmm", cs), H("hmmss", us), H("Hmm", cs), H("Hmmss", us), G(["H", "HH"], Cs), G(["a", "A"], function(t, e, i) {
                i._isPm = i._locale.isPM(t), i._meridiem = t
            }), G(["h", "hh"], function(t, e, i) {
                e[Cs] = x(t), u(i).bigHour = !0
            }), G("hmm", function(t, e, i) {
                var s = t.length - 2;
                e[Cs] = x(t.substr(0, s)), e[Ms] = x(t.substr(s)), u(i).bigHour = !0
            }), G("hmmss", function(t, e, i) {
                var s = t.length - 4,
                    a = t.length - 2;
                e[Cs] = x(t.substr(0, s)), e[Ms] = x(t.substr(s, 2)), e[As] = x(t.substr(a)), u(i).bigHour = !0
            }), G("Hmm", function(t, e, i) {
                var s = t.length - 2;
                e[Cs] = x(t.substr(0, s)), e[Ms] = x(t.substr(s))
            }), G("Hmmss", function(t, e, i) {
                var s = t.length - 4,
                    a = t.length - 2;
                e[Cs] = x(t.substr(0, s)), e[Ms] = x(t.substr(s, 2)), e[As] = x(t.substr(a))
            });
            var oa = /[ap]\.?m?\.?/i,
                na = P("Hours", !0);
            L("m", ["mm", 2], 0, "minute"), A("minute", "m"), H("m", hs), H("mm", hs, os), G(["m", "mm"], Ms);
            var ra = P("Minutes", !1);
            L("s", ["ss", 2], 0, "second"), A("second", "s"), H("s", hs), H("ss", hs, os), G(["s", "ss"], As);
            var la = P("Seconds", !1);
            L("S", 0, 0, function() {
                return ~~(this.millisecond() / 100)
            }), L(0, ["SS", 2], 0, function() {
                return ~~(this.millisecond() / 10)
            }), L(0, ["SSS", 3], 0, "millisecond"), L(0, ["SSSS", 4], 0, function() {
                return 10 * this.millisecond()
            }), L(0, ["SSSSS", 5], 0, function() {
                return 100 * this.millisecond()
            }), L(0, ["SSSSSS", 6], 0, function() {
                return 1e3 * this.millisecond()
            }), L(0, ["SSSSSSS", 7], 0, function() {
                return 1e4 * this.millisecond()
            }), L(0, ["SSSSSSSS", 8], 0, function() {
                return 1e5 * this.millisecond()
            }), L(0, ["SSSSSSSSS", 9], 0, function() {
                return 1e6 * this.millisecond()
            }), A("millisecond", "ms"), H("S", ds, as), H("SS", ds, os), H("SSS", ds, ns);
            var ha;
            for (ha = "SSSS"; ha.length <= 9; ha += "S") H(ha, gs);
            for (ha = "S"; ha.length <= 9; ha += "S") G(ha, hi);
            var ca = P("Milliseconds", !1);
            L("z", 0, 0, "zoneAbbr"), L("zz", 0, 0, "zoneName");
            var ua = p.prototype;
            ua.add = Xs, ua.calendar = oe, ua.clone = ne, ua.diff = fe, ua.endOf = we, ua.format = be, ua.from = ve, ua.fromNow = xe, ua.to = ye, ua.toNow = _e, ua.get = W, ua.invalidAt = Oe, ua.isAfter = re, ua.isBefore = le, ua.isBetween = he, ua.isSame = ce, ua.isSameOrAfter = ue, ua.isSameOrBefore = de, ua.isValid = Pe, ua.lang = Ks, ua.locale = ke, ua.localeData = De, ua.max = Gs, ua.min = js, ua.parsingFlags = Ve, ua.set = W, ua.startOf = Se, ua.subtract = $s, ua.toArray = Te, ua.toObject = Fe, ua.toDate = Ae, ua.toISOString = pe, ua.toJSON = Ie, ua.toString = ge, ua.unix = Me, ua.valueOf = Ce, ua.creationData = We, ua.year = Us, ua.isLeapYear = gt, ua.weekYear = Le, ua.isoWeekYear = ze, ua.quarter = ua.quarters = Ee, ua.month = tt, ua.daysInMonth = et, ua.week = ua.weeks = qe, ua.isoWeek = ua.isoWeeks = Ze, ua.weeksInYear = Ye, ua.isoWeeksInYear = Be, ua.date = ea, ua.day = ua.days = ti, ua.weekday = ei, ua.isoWeekday = ii, ua.dayOfYear = si, ua.hour = ua.hours = na, ua.minute = ua.minutes = ra, ua.second = ua.seconds = la, ua.millisecond = ua.milliseconds = ca, ua.utcOffset = Ht, ua.utc = Ut, ua.local = jt, ua.parseZone = Gt, ua.hasAlignedHourOffset = qt, ua.isDST = Zt, ua.isDSTShifted = Qt, ua.isLocal = Jt, ua.isUtcOffset = Xt, ua.isUtc = $t, ua.isUTC = $t, ua.zoneAbbr = ci, ua.zoneName = ui, ua.dates = rt("dates accessor is deprecated. Use date instead.", ea), ua.months = rt("months accessor is deprecated. Use month instead", tt), ua.years = rt("years accessor is deprecated. Use year instead", Us), ua.zone = rt("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", Et);
            var da = ua,
                fa = {
                    sameDay: "[Today at] LT",
                    nextDay: "[Tomorrow at] LT",
                    nextWeek: "dddd [at] LT",
                    lastDay: "[Yesterday at] LT",
                    lastWeek: "[Last] dddd [at] LT",
                    sameElse: "L"
                },
                ma = {
                    LTS: "h:mm:ss A",
                    LT: "h:mm A",
                    L: "MM/DD/YYYY",
                    LL: "MMMM D, YYYY",
                    LLL: "MMMM D, YYYY h:mm A",
                    LLLL: "dddd, MMMM D, YYYY h:mm A"
                },
                ga = "Invalid date",
                pa = "%d",
                ba = /\d{1,2}/,
                va = {
                    future: "in %s",
                    past: "%s ago",
                    s: "a few seconds",
                    m: "a minute",
                    mm: "%d minutes",
                    h: "an hour",
                    hh: "%d hours",
                    d: "a day",
                    dd: "%d days",
                    M: "a month",
                    MM: "%d months",
                    y: "a year",
                    yy: "%d years"
                },
                xa = _.prototype;
            xa._calendar = fa, xa.calendar = mi, xa._longDateFormat = ma, xa.longDateFormat = gi, xa._invalidDate = ga, xa.invalidDate = pi, xa._ordinal = pa, xa.ordinal = bi, xa._ordinalParse = ba, xa.preparse = vi, xa.postformat = vi, xa._relativeTime = va, xa.relativeTime = xi, xa.pastFuture = yi, xa.set = _i, xa.months = J, xa._months = Vs, xa.monthsShort = X, xa._monthsShort = Os, xa.monthsParse = $, xa._monthsRegex = Rs, xa.monthsRegex = st, xa._monthsShortRegex = Ws, xa.monthsShortRegex = it, xa.week = Ue, xa._week = ta, xa.firstDayOfYear = Ge, xa.firstDayOfWeek = je, xa.weekdays = Je, xa._weekdays = ia, xa.weekdaysMin = $e, xa._weekdaysMin = aa, xa.weekdaysShort = Xe, xa._weekdaysShort = sa, xa.weekdaysParse = Ke, xa.isPM = ri, xa._meridiemParse = oa, xa.meridiem = li, w("en", {
                ordinalParse: /\d{1,2}(th|st|nd|rd)/,
                ordinal: function(t) {
                    var e = t % 10,
                        i = 1 === x(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th";
                    return t + i
                }
            }), i.lang = rt("moment.lang is deprecated. Use moment.locale instead.", w), i.langData = rt("moment.langData is deprecated. Use moment.localeData instead.", M);
            var ya = Math.abs,
                _a = Bi("ms"),
                ka = Bi("s"),
                Da = Bi("m"),
                Sa = Bi("h"),
                wa = Bi("d"),
                Ca = Bi("w"),
                Ma = Bi("M"),
                Aa = Bi("y"),
                Ta = Ni("milliseconds"),
                Fa = Ni("seconds"),
                Ia = Ni("minutes"),
                Pa = Ni("hours"),
                Va = Ni("days"),
                Oa = Ni("months"),
                Wa = Ni("years"),
                Ra = Math.round,
                La = {
                    s: 45,
                    m: 45,
                    h: 22,
                    d: 26,
                    M: 11
                },
                za = Math.abs,
                Ba = Rt.prototype;
            Ba.abs = Ti, Ba.add = Ii, Ba.subtract = Pi, Ba.as = Li, Ba.asMilliseconds = _a, Ba.asSeconds = ka, Ba.asMinutes = Da, Ba.asHours = Sa, Ba.asDays = wa, Ba.asWeeks = Ca, Ba.asMonths = Ma, Ba.asYears = Aa, Ba.valueOf = zi, Ba._bubble = Oi, Ba.get = Yi, Ba.milliseconds = Ta, Ba.seconds = Fa, Ba.minutes = Ia, Ba.hours = Pa, Ba.days = Va, Ba.weeks = Hi, Ba.months = Oa, Ba.years = Wa, Ba.humanize = Gi, Ba.toISOString = qi, Ba.toString = qi, Ba.toJSON = qi, Ba.locale = ke, Ba.localeData = De, Ba.toIsoString = rt("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", qi), Ba.lang = Ks, L("X", 0, 0, "unix"), L("x", 0, 0, "valueOf"), H("x", ps), H("X", xs), G("X", function(t, e, i) {
                i._d = new Date(1e3 * parseFloat(t, 10))
            }), G("x", function(t, e, i) {
                i._d = new Date(x(t))
            }), i.version = "2.11.2", s(Pt), i.fn = da, i.min = Ot, i.max = Wt, i.now = qs, i.utc = h, i.unix = di, i.months = Si, i.isDate = o, i.locale = w, i.invalid = f, i.duration = Kt, i.isMoment = b, i.weekdays = Ci, i.parseZone = fi, i.localeData = M, i.isDuration = Lt, i.monthsShort = wi, i.weekdaysMin = Ai, i.defineLocale = C, i.weekdaysShort = Mi, i.normalizeUnits = T, i.relativeTimeThreshold = ji, i.prototype = da;
            var Ya = i;
            return Ya
        })
    }, {}],
    7: [function(t, e, i) {
        /*!
         * Chart.js
         * http://chartjs.org/
         * Version: 2.0.0-beta2
         *
         * Copyright 2015 Nick Downie
         * Released under the MIT license
         * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
         */
        var s = t("./core/core.js")();
        t("./core/core.helpers")(s), t("./core/core.element")(s), t("./core/core.animation")(s), t("./core/core.controller")(s), t("./core/core.datasetController")(s), t("./core/core.layoutService")(s), t("./core/core.legend")(s), t("./core/core.scale")(s), t("./core/core.scaleService")(s), t("./core/core.title")(s), t("./core/core.tooltip")(s), t("./controllers/controller.bar")(s), t("./controllers/controller.bubble")(s), t("./controllers/controller.doughnut")(s), t("./controllers/controller.line")(s), t("./controllers/controller.polarArea")(s), t("./controllers/controller.radar")(s), t("./scales/scale.category")(s), t("./scales/scale.linear")(s), t("./scales/scale.logarithmic")(s), t("./scales/scale.radialLinear")(s), t("./scales/scale.time")(s), t("./elements/element.arc")(s), t("./elements/element.line")(s), t("./elements/element.point")(s), t("./elements/element.rectangle")(s), t("./charts/Chart.Bar")(s), t("./charts/Chart.Bubble")(s), t("./charts/Chart.Doughnut")(s), t("./charts/Chart.Line")(s), t("./charts/Chart.PolarArea")(s), t("./charts/Chart.Radar")(s), t("./charts/Chart.Scatter")(s), window.Chart = e.exports = s
    }, {
        "./charts/Chart.Bar": 8,
        "./charts/Chart.Bubble": 9,
        "./charts/Chart.Doughnut": 10,
        "./charts/Chart.Line": 11,
        "./charts/Chart.PolarArea": 12,
        "./charts/Chart.Radar": 13,
        "./charts/Chart.Scatter": 14,
        "./controllers/controller.bar": 15,
        "./controllers/controller.bubble": 16,
        "./controllers/controller.doughnut": 17,
        "./controllers/controller.line": 18,
        "./controllers/controller.polarArea": 19,
        "./controllers/controller.radar": 20,
        "./core/core.animation": 21,
        "./core/core.controller": 22,
        "./core/core.datasetController": 23,
        "./core/core.element": 24,
        "./core/core.helpers": 25,
        "./core/core.js": 26,
        "./core/core.layoutService": 27,
        "./core/core.legend": 28,
        "./core/core.scale": 29,
        "./core/core.scaleService": 30,
        "./core/core.title": 31,
        "./core/core.tooltip": 32,
        "./elements/element.arc": 33,
        "./elements/element.line": 34,
        "./elements/element.point": 35,
        "./elements/element.rectangle": 36,
        "./scales/scale.category": 37,
        "./scales/scale.linear": 38,
        "./scales/scale.logarithmic": 39,
        "./scales/scale.radialLinear": 40,
        "./scales/scale.time": 41
    }],
    8: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            t.Bar = function(e, i) {
                return i.type = "bar", new t(e, i)
            }
        }
    }, {}],
    9: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            t.Bubble = function(e, i) {
                return i.type = "bubble", new t(e, i)
            }
        }
    }, {}],
    10: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            t.Doughnut = function(e, i) {
                return i.type = "doughnut", new t(e, i)
            }
        }
    }, {}],
    11: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            t.Line = function(e, i) {
                return i.type = "line", new t(e, i)
            }
        }
    }, {}],
    12: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            t.PolarArea = function(e, i) {
                return i.type = "polarArea", new t(e, i)
            }
        }
    }, {}],
    13: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = t.helpers,
                i = {
                    aspectRatio: 1
                };
            t.Radar = function(s, a) {
                return a.options = e.configMerge(i, a.options), a.type = "radar", new t(s, a)
            }
        }
    }, {}],
    14: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = {
                hover: {
                    mode: "single"
                },
                scales: {
                    xAxes: [{
                        type: "linear",
                        position: "bottom",
                        id: "x-axis-1"
                    }],
                    yAxes: [{
                        type: "linear",
                        position: "left",
                        id: "y-axis-1"
                    }]
                },
                tooltips: {
                    callbacks: {
                        title: function(t, e) {
                            return ""
                        },
                        label: function(t, e) {
                            return "(" + t.xLabel + ", " + t.yLabel + ")"
                        }
                    }
                }
            };
            t.defaults.scatter = e, t.controllers.scatter = t.controllers.line, t.Scatter = function(e, i) {
                return i.type = "scatter", new t(e, i)
            }
        }
    }, {}],
    15: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = t.helpers;
            t.defaults.bar = {
                hover: {
                    mode: "label"
                },
                scales: {
                    xAxes: [{
                        type: "category",
                        categoryPercentage: .8,
                        barPercentage: .9,
                        gridLines: {
                            offsetGridLines: !0
                        }
                    }],
                    yAxes: [{
                        type: "linear"
                    }]
                }
            }, t.controllers.bar = t.DatasetController.extend({
                initialize: function(e, i) {
                    t.DatasetController.prototype.initialize.call(this, e, i), this.getDataset().bar = !0
                },
                getBarCount: function() {
                    var t = 0;
                    return e.each(this.chart.data.datasets, function(i) {
                        e.isDatasetVisible(i) && i.bar && ++t
                    }), t
                },
                addElements: function() {
                    this.getDataset().metaData = this.getDataset().metaData || [], e.each(this.getDataset().data, function(e, i) {
                        this.getDataset().metaData[i] = this.getDataset().metaData[i] || new t.elements.Rectangle({
                            _chart: this.chart.chart,
                            _datasetIndex: this.index,
                            _index: i
                        })
                    }, this)
                },
                addElementAndReset: function(e) {
                    this.getDataset().metaData = this.getDataset().metaData || [];
                    var i = new t.elements.Rectangle({
                            _chart: this.chart.chart,
                            _datasetIndex: this.index,
                            _index: e
                        }),
                        s = this.getBarCount();
                    this.updateElement(i, e, !0, s), this.getDataset().metaData.splice(e, 0, i)
                },
                update: function(t) {
                    var i = this.getBarCount();
                    e.each(this.getDataset().metaData, function(e, s) {
                        this.updateElement(e, s, t, i)
                    }, this)
                },
                updateElement: function(t, i, s, a) {
                    var o, n = this.getScaleForId(this.getDataset().xAxisID),
                        r = this.getScaleForId(this.getDataset().yAxisID);
                    o = r.min < 0 && r.max < 0 ? r.getPixelForValue(r.max) : r.min > 0 && r.max > 0 ? r.getPixelForValue(r.min) : r.getPixelForValue(0), e.extend(t, {
                        _chart: this.chart.chart,
                        _xScale: n,
                        _yScale: r,
                        _datasetIndex: this.index,
                        _index: i,
                        _model: {
                            x: this.calculateBarX(i, this.index),
                            y: s ? o : this.calculateBarY(i, this.index),
                            label: this.chart.data.labels[i],
                            datasetLabel: this.getDataset().label,
                            base: s ? o : this.calculateBarBase(this.index, i),
                            width: this.calculateBarWidth(a),
                            backgroundColor: t.custom && t.custom.backgroundColor ? t.custom.backgroundColor : e.getValueAtIndexOrDefault(this.getDataset().backgroundColor, i, this.chart.options.elements.rectangle.backgroundColor),
                            borderColor: t.custom && t.custom.borderColor ? t.custom.borderColor : e.getValueAtIndexOrDefault(this.getDataset().borderColor, i, this.chart.options.elements.rectangle.borderColor),
                            borderWidth: t.custom && t.custom.borderWidth ? t.custom.borderWidth : e.getValueAtIndexOrDefault(this.getDataset().borderWidth, i, this.chart.options.elements.rectangle.borderWidth)
                        }
                    }), t.pivot()
                },
                calculateBarBase: function(t, i) {
                    var s = (this.getScaleForId(this.getDataset().xAxisID), this.getScaleForId(this.getDataset().yAxisID)),
                        a = 0;
                    if (s.options.stacked) {
                        var o = this.chart.data.datasets[t].data[i];
                        if (0 > o)
                            for (var n = 0; t > n; n++) {
                                var r = this.chart.data.datasets[n];
                                e.isDatasetVisible(r) && r.yAxisID === s.id && r.bar && (a += r.data[i] < 0 ? r.data[i] : 0)
                            } else
                                for (var l = 0; t > l; l++) {
                                    var h = this.chart.data.datasets[l];
                                    e.isDatasetVisible(h) && h.yAxisID === s.id && h.bar && (a += h.data[i] > 0 ? h.data[i] : 0)
                                }
                        return s.getPixelForValue(a)
                    }
                    return a = s.getPixelForValue(s.min), s.beginAtZero || s.min <= 0 && s.max >= 0 || s.min >= 0 && s.max <= 0 ? a = s.getPixelForValue(0, 0) : s.min < 0 && s.max < 0 && (a = s.getPixelForValue(s.max)), a
                },
                getRuler: function() {
                    var t = this.getScaleForId(this.getDataset().xAxisID),
                        e = (this.getScaleForId(this.getDataset().yAxisID), this.getBarCount()),
                        i = function() {
                            for (var e = t.getPixelForTick(1) - t.getPixelForTick(0), i = 2; i < this.getDataset().data.length; i++) e = Math.min(t.getPixelForTick(i) - t.getPixelForTick(i - 1), e);
                            return e
                        }.call(this),
                        s = i * t.options.categoryPercentage,
                        a = (i - i * t.options.categoryPercentage) / 2,
                        o = s / e,
                        n = o * t.options.barPercentage,
                        r = o - o * t.options.barPercentage;
                    return {
                        datasetCount: e,
                        tickWidth: i,
                        categoryWidth: s,
                        categorySpacing: a,
                        fullBarWidth: o,
                        barWidth: n,
                        barSpacing: r
                    }
                },
                calculateBarWidth: function() {
                    var t = this.getScaleForId(this.getDataset().xAxisID),
                        e = this.getRuler();
                    return t.options.stacked ? e.categoryWidth : e.barWidth
                },
                getBarIndex: function(t) {
                    for (var i = 0, s = 0; t > s; ++s) e.isDatasetVisible(this.chart.data.datasets[s]) && this.chart.data.datasets[s].bar && ++i;
                    return i
                },
                calculateBarX: function(t, e) {
                    var i = (this.getScaleForId(this.getDataset().yAxisID), this.getScaleForId(this.getDataset().xAxisID)),
                        s = this.getBarIndex(e),
                        a = this.getRuler(),
                        o = i.getPixelForValue(null, t, e, this.chart.isCombo);
                    return o -= this.chart.isCombo ? a.tickWidth / 2 : 0, i.options.stacked ? o + a.categoryWidth / 2 + a.categorySpacing : o + a.barWidth / 2 + a.categorySpacing + a.barWidth * s + a.barSpacing / 2 + a.barSpacing * s
                },
                calculateBarY: function(t, i) {
                    var s = (this.getScaleForId(this.getDataset().xAxisID), this.getScaleForId(this.getDataset().yAxisID)),
                        a = this.getDataset().data[t];
                    if (s.options.stacked) {
                        for (var o = 0, n = 0, r = 0; i > r; r++) {
                            var l = this.chart.data.datasets[r];
                            e.isDatasetVisible(l) && l.bar && l.yAxisID === s.id && (l.data[t] < 0 ? n += l.data[t] || 0 : o += l.data[t] || 0)
                        }
                        return 0 > a ? s.getPixelForValue(n + a) : s.getPixelForValue(o + a)
                    }
                    return s.getPixelForValue(a)
                },
                draw: function(t) {
                    var i = t || 1;
                    e.each(this.getDataset().metaData, function(t, e) {
                        var s = this.getDataset().data[e];
                        null === s || void 0 === s || isNaN(s) || t.transition(i).draw()
                    }, this)
                },
                setHoverStyle: function(t) {
                    var i = this.chart.data.datasets[t._datasetIndex],
                        s = t._index;
                    t._model.backgroundColor = t.custom && t.custom.hoverBackgroundColor ? t.custom.hoverBackgroundColor : e.getValueAtIndexOrDefault(i.hoverBackgroundColor, s, e.color(t._model.backgroundColor).saturate(.5).darken(.1).rgbString()), t._model.borderColor = t.custom && t.custom.hoverBorderColor ? t.custom.hoverBorderColor : e.getValueAtIndexOrDefault(i.hoverBorderColor, s, e.color(t._model.borderColor).saturate(.5).darken(.1).rgbString()), t._model.borderWidth = t.custom && t.custom.hoverBorderWidth ? t.custom.hoverBorderWidth : e.getValueAtIndexOrDefault(i.hoverBorderWidth, s, t._model.borderWidth)
                },
                removeHoverStyle: function(t) {
                    var i = (this.chart.data.datasets[t._datasetIndex], t._index);
                    t._model.backgroundColor = t.custom && t.custom.backgroundColor ? t.custom.backgroundColor : e.getValueAtIndexOrDefault(this.getDataset().backgroundColor, i, this.chart.options.elements.rectangle.backgroundColor), t._model.borderColor = t.custom && t.custom.borderColor ? t.custom.borderColor : e.getValueAtIndexOrDefault(this.getDataset().borderColor, i, this.chart.options.elements.rectangle.borderColor), t._model.borderWidth = t.custom && t.custom.borderWidth ? t.custom.borderWidth : e.getValueAtIndexOrDefault(this.getDataset().borderWidth, i, this.chart.options.elements.rectangle.borderWidth)
                }
            })
        }
    }, {}],
    16: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = t.helpers;
            t.defaults.bubble = {
                hover: {
                    mode: "single"
                },
                scales: {
                    xAxes: [{
                        type: "linear",
                        position: "bottom",
                        id: "x-axis-0"
                    }],
                    yAxes: [{
                        type: "linear",
                        position: "left",
                        id: "y-axis-0"
                    }]
                },
                tooltips: {
                    callbacks: {
                        title: function(t, e) {
                            return ""
                        },
                        label: function(t, e) {
                            var i = e.datasets[t.datasetIndex].label || "",
                                s = e.datasets[t.datasetIndex].data[t.index];
                            return i + ": (" + s.x + ", " + s.y + ", " + s.r + ")"
                        }
                    }
                }
            }, t.controllers.bubble = t.DatasetController.extend({
                addElements: function() {
                    this.getDataset().metaData = this.getDataset().metaData || [], e.each(this.getDataset().data, function(e, i) {
                        this.getDataset().metaData[i] = this.getDataset().metaData[i] || new t.elements.Point({
                            _chart: this.chart.chart,
                            _datasetIndex: this.index,
                            _index: i
                        })
                    }, this)
                },
                addElementAndReset: function(e) {
                    this.getDataset().metaData = this.getDataset().metaData || [];
                    var i = new t.elements.Point({
                        _chart: this.chart.chart,
                        _datasetIndex: this.index,
                        _index: e
                    });
                    this.updateElement(i, e, !0), this.getDataset().metaData.splice(e, 0, i)
                },
                update: function(t) {
                    var i, s = this.getDataset().metaData,
                        a = this.getScaleForId(this.getDataset().yAxisID);
                    this.getScaleForId(this.getDataset().xAxisID);
                    i = a.min < 0 && a.max < 0 ? a.getPixelForValue(a.max) : a.min > 0 && a.max > 0 ? a.getPixelForValue(a.min) : a.getPixelForValue(0), e.each(s, function(e, i) {
                        this.updateElement(e, i, t)
                    }, this)
                },
                updateElement: function(t, i, s) {
                    var a, o = this.getScaleForId(this.getDataset().yAxisID),
                        n = this.getScaleForId(this.getDataset().xAxisID);
                    a = o.min < 0 && o.max < 0 ? o.getPixelForValue(o.max) : o.min > 0 && o.max > 0 ? o.getPixelForValue(o.min) : o.getPixelForValue(0), e.extend(t, {
                        _chart: this.chart.chart,
                        _xScale: n,
                        _yScale: o,
                        _datasetIndex: this.index,
                        _index: i,
                        _model: {
                            x: s ? n.getPixelForDecimal(.5) : n.getPixelForValue(this.getDataset().data[i], i, this.index, this.chart.isCombo),
                            y: s ? a : o.getPixelForValue(this.getDataset().data[i], i, this.index),
                            radius: s ? 0 : t.custom && t.custom.radius ? t.custom.radius : this.getRadius(this.getDataset().data[i]),
                            backgroundColor: t.custom && t.custom.backgroundColor ? t.custom.backgroundColor : e.getValueAtIndexOrDefault(this.getDataset().backgroundColor, i, this.chart.options.elements.point.backgroundColor),
                            borderColor: t.custom && t.custom.borderColor ? t.custom.borderColor : e.getValueAtIndexOrDefault(this.getDataset().borderColor, i, this.chart.options.elements.point.borderColor),
                            borderWidth: t.custom && t.custom.borderWidth ? t.custom.borderWidth : e.getValueAtIndexOrDefault(this.getDataset().borderWidth, i, this.chart.options.elements.point.borderWidth),
                            hitRadius: t.custom && t.custom.hitRadius ? t.custom.hitRadius : e.getValueAtIndexOrDefault(this.getDataset().hitRadius, i, this.chart.options.elements.point.hitRadius)
                        }
                    }), t._model.skip = t.custom && t.custom.skip ? t.custom.skip : isNaN(t._model.x) || isNaN(t._model.y), t.pivot()
                },
                getRadius: function(t) {
                    return t.r || this.chart.options.elements.point.radius
                },
                draw: function(t) {
                    var i = t || 1;
                    e.each(this.getDataset().metaData, function(t, e) {
                        t.transition(i), t.draw()
                    })
                },
                setHoverStyle: function(t) {
                    var i = this.chart.data.datasets[t._datasetIndex],
                        s = t._index;
                    t._model.radius = t.custom && t.custom.hoverRadius ? t.custom.hoverRadius : e.getValueAtIndexOrDefault(i.hoverRadius, s, this.chart.options.elements.point.hoverRadius) + this.getRadius(this.getDataset().data[t._index]), t._model.backgroundColor = t.custom && t.custom.hoverBackgroundColor ? t.custom.hoverBackgroundColor : e.getValueAtIndexOrDefault(i.hoverBackgroundColor, s, e.color(t._model.backgroundColor).saturate(.5).darken(.1).rgbString()), t._model.borderColor = t.custom && t.custom.hoverBorderColor ? t.custom.hoverBorderColor : e.getValueAtIndexOrDefault(i.hoverBorderColor, s, e.color(t._model.borderColor).saturate(.5).darken(.1).rgbString()), t._model.borderWidth = t.custom && t.custom.hoverBorderWidth ? t.custom.hoverBorderWidth : e.getValueAtIndexOrDefault(i.hoverBorderWidth, s, t._model.borderWidth)
                },
                removeHoverStyle: function(t) {
                    var i = (this.chart.data.datasets[t._datasetIndex], t._index);
                    t._model.radius = t.custom && t.custom.radius ? t.custom.radius : this.getRadius(this.getDataset().data[t._index]), t._model.backgroundColor = t.custom && t.custom.backgroundColor ? t.custom.backgroundColor : e.getValueAtIndexOrDefault(this.getDataset().backgroundColor, i, this.chart.options.elements.point.backgroundColor), t._model.borderColor = t.custom && t.custom.borderColor ? t.custom.borderColor : e.getValueAtIndexOrDefault(this.getDataset().borderColor, i, this.chart.options.elements.point.borderColor), t._model.borderWidth = t.custom && t.custom.borderWidth ? t.custom.borderWidth : e.getValueAtIndexOrDefault(this.getDataset().borderWidth, i, this.chart.options.elements.point.borderWidth)
                }
            })
        }
    }, {}],
    17: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = t.helpers;
            t.defaults.doughnut = {
                animation: {
                    animateRotate: !0,
                    animateScale: !1
                },
                aspectRatio: 1,
                hover: {
                    mode: "single"
                },
                legendCallback: function(t) {
                    var e = [];
                    if (e.push('<ul class="' + t.id + '-legend">'), t.data.datasets.length)
                        for (var i = 0; i < t.data.datasets[0].data.length; ++i) e.push('<li><span style="background-color:' + t.data.datasets[0].backgroundColor[i] + '">'), t.data.labels[i] && e.push(t.data.labels[i]), e.push("</span></li>");
                    return e.push("</ul>"), e.join("")
                },
                legend: {
                    labels: {
                        generateLabels: function(t) {
                            return t.labels.length && t.datasets.length ? t.labels.map(function(e, i) {
                                return {
                                    text: e,
                                    fillStyle: t.datasets[0].backgroundColor[i],
                                    hidden: isNaN(t.datasets[0].data[i]),
                                    index: i
                                }
                            }) : []
                        }
                    },
                    onClick: function(t, i) {
                        e.each(this.chart.data.datasets, function(t) {
                            t.metaHiddenData = t.metaHiddenData || [];
                            var e = i.index;
                            isNaN(t.data[e]) ? isNaN(t.metaHiddenData[e]) || (t.data[e] = t.metaHiddenData[e]) : (t.metaHiddenData[e] = t.data[e], t.data[e] = NaN)
                        }), this.chart.update()
                    }
                },
                cutoutPercentage: 50,
                tooltips: {
                    callbacks: {
                        title: function() {
                            return ""
                        },
                        label: function(t, e) {
                            return e.labels[t.index] + ": " + e.datasets[t.datasetIndex].data[t.index]
                        }
                    }
                }
            }, t.defaults.pie = e.clone(t.defaults.doughnut), e.extend(t.defaults.pie, {
                cutoutPercentage: 0
            }), t.controllers.doughnut = t.controllers.pie = t.DatasetController.extend({
                linkScales: function() {},
                addElements: function() {
                    this.getDataset().metaData = this.getDataset().metaData || [], e.each(this.getDataset().data, function(e, i) {
                        this.getDataset().metaData[i] = this.getDataset().metaData[i] || new t.elements.Arc({
                            _chart: this.chart.chart,
                            _datasetIndex: this.index,
                            _index: i
                        })
                    }, this)
                },
                addElementAndReset: function(i, s) {
                    this.getDataset().metaData = this.getDataset().metaData || [];
                    var a = new t.elements.Arc({
                        _chart: this.chart.chart,
                        _datasetIndex: this.index,
                        _index: i
                    });
                    s && e.isArray(this.getDataset().backgroundColor) && this.getDataset().backgroundColor.splice(i, 0, s), this.updateElement(a, i, !0), this.getDataset().metaData.splice(i, 0, a)
                },
                getVisibleDatasetCount: function() {
                    return e.where(this.chart.data.datasets, function(t) {
                        return e.isDatasetVisible(t)
                    }).length
                },
                getRingIndex: function(t) {
                    for (var i = 0, s = 0; t > s; ++s) e.isDatasetVisible(this.chart.data.datasets[s]) && ++i;
                    return i
                },
                update: function(t) {
                    var i = Math.min(this.chart.chartArea.right - this.chart.chartArea.left, this.chart.chartArea.bottom - this.chart.chartArea.top);
                    this.chart.outerRadius = Math.max(i / 2 - this.chart.options.elements.arc.borderWidth / 2, 0), this.chart.innerRadius = Math.max(this.chart.options.cutoutPercentage ? this.chart.outerRadius / 100 * this.chart.options.cutoutPercentage : 1, 0), this.chart.radiusLength = (this.chart.outerRadius - this.chart.innerRadius) / this.getVisibleDatasetCount(), this.getDataset().total = 0, e.each(this.getDataset().data, function(t) {
                        isNaN(t) || (this.getDataset().total += Math.abs(t))
                    }, this), this.outerRadius = this.chart.outerRadius - this.chart.radiusLength * this.getRingIndex(this.index), this.innerRadius = this.outerRadius - this.chart.radiusLength, e.each(this.getDataset().metaData, function(e, i) {
                        this.updateElement(e, i, t)
                    }, this)
                },
                updateElement: function(t, i, s) {
                    var a = (this.chart.chartArea.left + this.chart.chartArea.right) / 2,
                        o = (this.chart.chartArea.top + this.chart.chartArea.bottom) / 2,
                        n = Math.PI * -.5,
                        r = Math.PI * -.5,
                        l = s && this.chart.options.animation.animateRotate ? 0 : this.calculateCircumference(this.getDataset().data[i]),
                        h = s && this.chart.options.animation.animateScale ? 0 : this.innerRadius,
                        c = s && this.chart.options.animation.animateScale ? 0 : this.outerRadius;
                    e.extend(t, {
                        _chart: this.chart.chart,
                        _datasetIndex: this.index,
                        _index: i,
                        _model: {
                            x: a,
                            y: o,
                            startAngle: n,
                            endAngle: r,
                            circumference: l,
                            outerRadius: c,
                            innerRadius: h,
                            backgroundColor: t.custom && t.custom.backgroundColor ? t.custom.backgroundColor : e.getValueAtIndexOrDefault(this.getDataset().backgroundColor, i, this.chart.options.elements.arc.backgroundColor),
                            hoverBackgroundColor: t.custom && t.custom.hoverBackgroundColor ? t.custom.hoverBackgroundColor : e.getValueAtIndexOrDefault(this.getDataset().hoverBackgroundColor, i, this.chart.options.elements.arc.hoverBackgroundColor),
                            borderWidth: t.custom && t.custom.borderWidth ? t.custom.borderWidth : e.getValueAtIndexOrDefault(this.getDataset().borderWidth, i, this.chart.options.elements.arc.borderWidth),
                            borderColor: t.custom && t.custom.borderColor ? t.custom.borderColor : e.getValueAtIndexOrDefault(this.getDataset().borderColor, i, this.chart.options.elements.arc.borderColor),
                            label: e.getValueAtIndexOrDefault(this.getDataset().label, i, this.chart.data.labels[i])
                        }
                    }), s || (0 === i ? t._model.startAngle = Math.PI * -.5 : t._model.startAngle = this.getDataset().metaData[i - 1]._model.endAngle, t._model.endAngle = t._model.startAngle + t._model.circumference), t.pivot()
                },
                draw: function(t) {
                    var i = t || 1;
                    e.each(this.getDataset().metaData, function(t, e) {
                        t.transition(i).draw()
                    })
                },
                setHoverStyle: function(t) {
                    var i = this.chart.data.datasets[t._datasetIndex],
                        s = t._index;
                    t._model.backgroundColor = t.custom && t.custom.hoverBackgroundColor ? t.custom.hoverBackgroundColor : e.getValueAtIndexOrDefault(i.hoverBackgroundColor, s, e.color(t._model.backgroundColor).saturate(.5).darken(.1).rgbString()), t._model.borderColor = t.custom && t.custom.hoverBorderColor ? t.custom.hoverBorderColor : e.getValueAtIndexOrDefault(i.hoverBorderColor, s, e.color(t._model.borderColor).saturate(.5).darken(.1).rgbString()), t._model.borderWidth = t.custom && t.custom.hoverBorderWidth ? t.custom.hoverBorderWidth : e.getValueAtIndexOrDefault(i.hoverBorderWidth, s, t._model.borderWidth)
                },
                removeHoverStyle: function(t) {
                    var i = (this.chart.data.datasets[t._datasetIndex], t._index);
                    t._model.backgroundColor = t.custom && t.custom.backgroundColor ? t.custom.backgroundColor : e.getValueAtIndexOrDefault(this.getDataset().backgroundColor, i, this.chart.options.elements.arc.backgroundColor), t._model.borderColor = t.custom && t.custom.borderColor ? t.custom.borderColor : e.getValueAtIndexOrDefault(this.getDataset().borderColor, i, this.chart.options.elements.arc.borderColor), t._model.borderWidth = t.custom && t.custom.borderWidth ? t.custom.borderWidth : e.getValueAtIndexOrDefault(this.getDataset().borderWidth, i, this.chart.options.elements.arc.borderWidth)
                },
                calculateCircumference: function(t) {
                    return this.getDataset().total > 0 && !isNaN(t) ? 1.999999 * Math.PI * (t / this.getDataset().total) : 0
                }
            })
        }
    }, {}],
    18: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = t.helpers;
            t.defaults.line = {
                showLines: !0,
                hover: {
                    mode: "label"
                },
                scales: {
                    xAxes: [{
                        type: "category",
                        id: "x-axis-0"
                    }],
                    yAxes: [{
                        type: "linear",
                        id: "y-axis-0"
                    }]
                }
            }, t.controllers.line = t.DatasetController.extend({
                addElements: function() {
                    this.getDataset().metaData = this.getDataset().metaData || [], this.getDataset().metaDataset = this.getDataset().metaDataset || new t.elements.Line({
                        _chart: this.chart.chart,
                        _datasetIndex: this.index,
                        _points: this.getDataset().metaData
                    }), e.each(this.getDataset().data, function(e, i) {
                        this.getDataset().metaData[i] = this.getDataset().metaData[i] || new t.elements.Point({
                            _chart: this.chart.chart,
                            _datasetIndex: this.index,
                            _index: i
                        })
                    }, this)
                },
                addElementAndReset: function(e) {
                    this.getDataset().metaData = this.getDataset().metaData || [];
                    var i = new t.elements.Point({
                        _chart: this.chart.chart,
                        _datasetIndex: this.index,
                        _index: e
                    });
                    this.updateElement(i, e, !0), this.getDataset().metaData.splice(e, 0, i), this.chart.options.showLines && 0 !== this.chart.options.elements.line.tension && this.updateBezierControlPoints()
                },
                update: function(t) {
                    var i, s = this.getDataset().metaDataset,
                        a = this.getDataset().metaData,
                        o = this.getScaleForId(this.getDataset().yAxisID);
                    this.getScaleForId(this.getDataset().xAxisID);
                    i = o.min < 0 && o.max < 0 ? o.getPixelForValue(o.max) : o.min > 0 && o.max > 0 ? o.getPixelForValue(o.min) : o.getPixelForValue(0), this.chart.options.showLines && (s._scale = o, s._datasetIndex = this.index, s._children = a, s._model = {
                        tension: s.custom && s.custom.tension ? s.custom.tension : e.getValueOrDefault(this.getDataset().tension, this.chart.options.elements.line.tension),
                        backgroundColor: s.custom && s.custom.backgroundColor ? s.custom.backgroundColor : this.getDataset().backgroundColor || this.chart.options.elements.line.backgroundColor,
                        borderWidth: s.custom && s.custom.borderWidth ? s.custom.borderWidth : this.getDataset().borderWidth || this.chart.options.elements.line.borderWidth,
                        borderColor: s.custom && s.custom.borderColor ? s.custom.borderColor : this.getDataset().borderColor || this.chart.options.elements.line.borderColor,
                        borderCapStyle: s.custom && s.custom.borderCapStyle ? s.custom.borderCapStyle : this.getDataset().borderCapStyle || this.chart.options.elements.line.borderCapStyle,
                        borderDash: s.custom && s.custom.borderDash ? s.custom.borderDash : this.getDataset().borderDash || this.chart.options.elements.line.borderDash,
                        borderDashOffset: s.custom && s.custom.borderDashOffset ? s.custom.borderDashOffset : this.getDataset().borderDashOffset || this.chart.options.elements.line.borderDashOffset,
                        borderJoinStyle: s.custom && s.custom.borderJoinStyle ? s.custom.borderJoinStyle : this.getDataset().borderJoinStyle || this.chart.options.elements.line.borderJoinStyle,
                        fill: s.custom && s.custom.fill ? s.custom.fill : void 0 !== this.getDataset().fill ? this.getDataset().fill : this.chart.options.elements.line.fill,
                        scaleTop: o.top,
                        scaleBottom: o.bottom,
                        scaleZero: i
                    }, s.pivot()), e.each(a, function(e, i) {
                        this.updateElement(e, i, t)
                    }, this), this.chart.options.showLines && 0 !== this.chart.options.elements.line.tension && this.updateBezierControlPoints()
                },
                getPointBackgroundColor: function(t, i) {
                    var s = this.chart.options.elements.point.backgroundColor,
                        a = this.getDataset();
                    return t.custom && t.custom.backgroundColor ? s = t.custom.backgroundColor : a.pointBackgroundColor ? s = e.getValueAtIndexOrDefault(a.pointBackgroundColor, i, s) : a.backgroundColor && (s = a.backgroundColor), s
                },
                getPointBorderColor: function(t, i) {
                    var s = this.chart.options.elements.point.borderColor,
                        a = this.getDataset();
                    return t.custom && t.custom.borderColor ? s = t.custom.borderColor : a.pointBorderColor ? s = e.getValueAtIndexOrDefault(this.getDataset().pointBorderColor, i, s) : a.borderColor && (s = a.borderColor), s
                },
                getPointBorderWidth: function(t, i) {
                    var s = this.chart.options.elements.point.borderWidth,
                        a = this.getDataset();
                    return t.custom && void 0 !== t.custom.borderWidth ? s = t.custom.borderWidth : void 0 !== a.pointBorderWidth ? s = e.getValueAtIndexOrDefault(a.pointBorderWidth, i, s) : void 0 !== a.borderWidth && (s = a.borderWidth), s
                },
                updateElement: function(t, i, s) {
                    var a, o = this.getScaleForId(this.getDataset().yAxisID),
                        n = this.getScaleForId(this.getDataset().xAxisID);
                    a = o.min < 0 && o.max < 0 ? o.getPixelForValue(o.max) : o.min > 0 && o.max > 0 ? o.getPixelForValue(o.min) : o.getPixelForValue(0), t._chart = this.chart.chart, t._xScale = n, t._yScale = o, t._datasetIndex = this.index, t._index = i, t._model = {
                        x: n.getPixelForValue(this.getDataset().data[i], i, this.index, this.chart.isCombo),
                        y: s ? a : this.calculatePointY(this.getDataset().data[i], i, this.index, this.chart.isCombo),
                        tension: t.custom && t.custom.tension ? t.custom.tension : e.getValueOrDefault(this.getDataset().tension, this.chart.options.elements.line.tension),
                        radius: t.custom && t.custom.radius ? t.custom.radius : e.getValueAtIndexOrDefault(this.getDataset().radius, i, this.chart.options.elements.point.radius),
                        pointStyle: t.custom && t.custom.pointStyle ? t.custom.pointStyle : e.getValueAtIndexOrDefault(this.getDataset().pointStyle, i, this.chart.options.elements.point.pointStyle),
                        backgroundColor: this.getPointBackgroundColor(t, i),
                        borderColor: this.getPointBorderColor(t, i),
                        borderWidth: this.getPointBorderWidth(t, i),
                        hitRadius: t.custom && t.custom.hitRadius ? t.custom.hitRadius : e.getValueAtIndexOrDefault(this.getDataset().hitRadius, i, this.chart.options.elements.point.hitRadius)
                    }, t._model.skip = t.custom && t.custom.skip ? t.custom.skip : isNaN(t._model.x) || isNaN(t._model.y)
                },
                calculatePointY: function(t, i, s, a) {
                    var o = (this.getScaleForId(this.getDataset().xAxisID), this.getScaleForId(this.getDataset().yAxisID));
                    if (o.options.stacked) {
                        for (var n = 0, r = 0, l = 0; s > l; l++) {
                            var h = this.chart.data.datasets[l];
                            "line" === h.type && e.isDatasetVisible(h) && (h.data[i] < 0 ? r += h.data[i] || 0 : n += h.data[i] || 0)
                        }
                        return 0 > t ? o.getPixelForValue(r + t) : o.getPixelForValue(n + t)
                    }
                    return o.getPixelForValue(t)
                },
                updateBezierControlPoints: function() {
                    e.each(this.getDataset().metaData, function(t, i) {
                        var s = e.splineCurve(e.previousItem(this.getDataset().metaData, i)._model, t._model, e.nextItem(this.getDataset().metaData, i)._model, t._model.tension);
                        t._model.controlPointPreviousX = Math.max(Math.min(s.previous.x, this.chart.chartArea.right), this.chart.chartArea.left), t._model.controlPointPreviousY = Math.max(Math.min(s.previous.y, this.chart.chartArea.bottom), this.chart.chartArea.top), t._model.controlPointNextX = Math.max(Math.min(s.next.x, this.chart.chartArea.right), this.chart.chartArea.left), t._model.controlPointNextY = Math.max(Math.min(s.next.y, this.chart.chartArea.bottom), this.chart.chartArea.top), t.pivot()
                    }, this)
                },
                draw: function(t) {
                    var i = t || 1;
                    e.each(this.getDataset().metaData, function(t) {
                        t.transition(i)
                    }), this.chart.options.showLines && this.getDataset().metaDataset.transition(i).draw(), e.each(this.getDataset().metaData, function(t) {
                        t.draw()
                    })
                },
                setHoverStyle: function(t) {
                    var i = this.chart.data.datasets[t._datasetIndex],
                        s = t._index;
                    t._model.radius = t.custom && t.custom.hoverRadius ? t.custom.hoverRadius : e.getValueAtIndexOrDefault(i.pointHoverRadius, s, this.chart.options.elements.point.hoverRadius), t._model.backgroundColor = t.custom && t.custom.hoverBackgroundColor ? t.custom.hoverBackgroundColor : e.getValueAtIndexOrDefault(i.pointHoverBackgroundColor, s, e.color(t._model.backgroundColor).saturate(.5).darken(.1).rgbString()), t._model.borderColor = t.custom && t.custom.hoverBorderColor ? t.custom.hoverBorderColor : e.getValueAtIndexOrDefault(i.pointHoverBorderColor, s, e.color(t._model.borderColor).saturate(.5).darken(.1).rgbString()), t._model.borderWidth = t.custom && t.custom.hoverBorderWidth ? t.custom.hoverBorderWidth : e.getValueAtIndexOrDefault(i.pointHoverBorderWidth, s, t._model.borderWidth)
                },
                removeHoverStyle: function(t) {
                    var i = (this.chart.data.datasets[t._datasetIndex], t._index);
                    t._model.radius = t.custom && t.custom.radius ? t.custom.radius : e.getValueAtIndexOrDefault(this.getDataset().radius, i, this.chart.options.elements.point.radius), t._model.backgroundColor = this.getPointBackgroundColor(t, i), t._model.borderColor = this.getPointBorderColor(t, i), t._model.borderWidth = this.getPointBorderWidth(t, i)
                }
            })
        }
    }, {}],
    19: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = t.helpers;
            t.defaults.polarArea = {
                scale: {
                    type: "radialLinear",
                    lineArc: !0
                },
                animateRotate: !0,
                animateScale: !0,
                aspectRatio: 1,
                legendCallback: function(t) {
                    var e = [];
                    if (e.push('<ul class="' + t.id + '-legend">'), t.data.datasets.length)
                        for (var i = 0; i < t.data.datasets[0].data.length; ++i) e.push('<li><span style="background-color:' + t.data.datasets[0].backgroundColor[i] + '">'), t.data.labels[i] && e.push(t.data.labels[i]), e.push("</span></li>");
                    return e.push("</ul>"), e.join("")
                },
                legend: {
                    labels: {
                        generateLabels: function(t) {
                            return t.labels.length && t.datasets.length ? t.labels.map(function(e, i) {
                                return {
                                    text: e,
                                    fillStyle: t.datasets[0].backgroundColor[i],
                                    hidden: isNaN(t.datasets[0].data[i]),
                                    index: i
                                }
                            }) : []
                        }
                    },
                    onClick: function(t, i) {
                        e.each(this.chart.data.datasets, function(t) {
                            t.metaHiddenData = t.metaHiddenData || [];
                            var e = i.index;
                            isNaN(t.data[e]) ? isNaN(t.metaHiddenData[e]) || (t.data[e] = t.metaHiddenData[e]) : (t.metaHiddenData[e] = t.data[e], t.data[e] = NaN)
                        }), this.chart.update()
                    }
                },
                tooltips: {
                    callbacks: {
                        title: function() {
                            return ""
                        },
                        label: function(t, e) {
                            return e.labels[t.index] + ": " + t.yLabel
                        }
                    }
                }
            }, t.controllers.polarArea = t.DatasetController.extend({
                linkScales: function() {},
                addElements: function() {
                    this.getDataset().metaData = this.getDataset().metaData || [], e.each(this.getDataset().data, function(e, i) {
                        this.getDataset().metaData[i] = this.getDataset().metaData[i] || new t.elements.Arc({
                            _chart: this.chart.chart,
                            _datasetIndex: this.index,
                            _index: i
                        })
                    }, this)
                },
                addElementAndReset: function(e) {
                    this.getDataset().metaData = this.getDataset().metaData || [];
                    var i = new t.elements.Arc({
                        _chart: this.chart.chart,
                        _datasetIndex: this.index,
                        _index: e
                    });
                    this.updateElement(i, e, !0), this.getDataset().metaData.splice(e, 0, i)
                },
                getVisibleDatasetCount: function() {
                    return e.where(this.chart.data.datasets, function(t) {
                        return e.isDatasetVisible(t)
                    }).length
                },
                update: function(t) {
                    var i = Math.min(this.chart.chartArea.right - this.chart.chartArea.left, this.chart.chartArea.bottom - this.chart.chartArea.top);
                    this.chart.outerRadius = Math.max((i - this.chart.options.elements.arc.borderWidth / 2) / 2, 0), this.chart.innerRadius = Math.max(this.chart.options.cutoutPercentage ? this.chart.outerRadius / 100 * this.chart.options.cutoutPercentage : 1, 0), this.chart.radiusLength = (this.chart.outerRadius - this.chart.innerRadius) / this.getVisibleDatasetCount(), this.getDataset().total = 0, e.each(this.getDataset().data, function(t) {
                        this.getDataset().total += Math.abs(t)
                    }, this), this.outerRadius = this.chart.outerRadius - this.chart.radiusLength * this.index, this.innerRadius = this.outerRadius - this.chart.radiusLength, e.each(this.getDataset().metaData, function(e, i) {
                        this.updateElement(e, i, t)
                    }, this)
                },
                updateElement: function(t, i, s) {
                    for (var a = this.calculateCircumference(this.getDataset().data[i]), o = (this.chart.chartArea.left + this.chart.chartArea.right) / 2, n = (this.chart.chartArea.top + this.chart.chartArea.bottom) / 2, r = 0, l = 0; i > l; ++l) isNaN(this.getDataset().data[l]) || ++r;
                    var h = -.5 * Math.PI + a * r,
                        c = h + a,
                        u = {
                            x: o,
                            y: n,
                            innerRadius: 0,
                            outerRadius: this.chart.options.animateScale ? 0 : this.chart.scale.getDistanceFromCenterForValue(this.getDataset().data[i]),
                            startAngle: this.chart.options.animateRotate ? Math.PI * -.5 : h,
                            endAngle: this.chart.options.animateRotate ? Math.PI * -.5 : c,
                            backgroundColor: t.custom && t.custom.backgroundColor ? t.custom.backgroundColor : e.getValueAtIndexOrDefault(this.getDataset().backgroundColor, i, this.chart.options.elements.arc.backgroundColor),
                            borderWidth: t.custom && t.custom.borderWidth ? t.custom.borderWidth : e.getValueAtIndexOrDefault(this.getDataset().borderWidth, i, this.chart.options.elements.arc.borderWidth),
                            borderColor: t.custom && t.custom.borderColor ? t.custom.borderColor : e.getValueAtIndexOrDefault(this.getDataset().borderColor, i, this.chart.options.elements.arc.borderColor),
                            label: e.getValueAtIndexOrDefault(this.chart.data.labels, i, this.chart.data.labels[i])
                        };
                    e.extend(t, {
                        _chart: this.chart.chart,
                        _datasetIndex: this.index,
                        _index: i,
                        _scale: this.chart.scale,
                        _model: s ? u : {
                            x: o,
                            y: n,
                            innerRadius: 0,
                            outerRadius: this.chart.scale.getDistanceFromCenterForValue(this.getDataset().data[i]),
                            startAngle: h,
                            endAngle: c,
                            backgroundColor: t.custom && t.custom.backgroundColor ? t.custom.backgroundColor : e.getValueAtIndexOrDefault(this.getDataset().backgroundColor, i, this.chart.options.elements.arc.backgroundColor),
                            borderWidth: t.custom && t.custom.borderWidth ? t.custom.borderWidth : e.getValueAtIndexOrDefault(this.getDataset().borderWidth, i, this.chart.options.elements.arc.borderWidth),
                            borderColor: t.custom && t.custom.borderColor ? t.custom.borderColor : e.getValueAtIndexOrDefault(this.getDataset().borderColor, i, this.chart.options.elements.arc.borderColor),
                            label: e.getValueAtIndexOrDefault(this.chart.data.labels, i, this.chart.data.labels[i])
                        }
                    }), t.pivot()
                },
                draw: function(t) {
                    var i = t || 1;
                    e.each(this.getDataset().metaData, function(t, e) {
                        t.transition(i).draw()
                    })
                },
                setHoverStyle: function(t) {
                    var i = this.chart.data.datasets[t._datasetIndex],
                        s = t._index;
                    t._model.backgroundColor = t.custom && t.custom.hoverBackgroundColor ? t.custom.hoverBackgroundColor : e.getValueAtIndexOrDefault(i.hoverBackgroundColor, s, e.color(t._model.backgroundColor).saturate(.5).darken(.1).rgbString()), t._model.borderColor = t.custom && t.custom.hoverBorderColor ? t.custom.hoverBorderColor : e.getValueAtIndexOrDefault(i.hoverBorderColor, s, e.color(t._model.borderColor).saturate(.5).darken(.1).rgbString()), t._model.borderWidth = t.custom && t.custom.hoverBorderWidth ? t.custom.hoverBorderWidth : e.getValueAtIndexOrDefault(i.hoverBorderWidth, s, t._model.borderWidth)
                },
                removeHoverStyle: function(t) {
                    var i = (this.chart.data.datasets[t._datasetIndex], t._index);
                    t._model.backgroundColor = t.custom && t.custom.backgroundColor ? t.custom.backgroundColor : e.getValueAtIndexOrDefault(this.getDataset().backgroundColor, i, this.chart.options.elements.arc.backgroundColor), t._model.borderColor = t.custom && t.custom.borderColor ? t.custom.borderColor : e.getValueAtIndexOrDefault(this.getDataset().borderColor, i, this.chart.options.elements.arc.borderColor), t._model.borderWidth = t.custom && t.custom.borderWidth ? t.custom.borderWidth : e.getValueAtIndexOrDefault(this.getDataset().borderWidth, i, this.chart.options.elements.arc.borderWidth)
                },
                calculateCircumference: function(t) {
                    if (isNaN(t)) return 0;
                    var i = e.where(this.getDataset().data, function(t) {
                        return isNaN(t)
                    }).length;
                    return 2 * Math.PI / (this.getDataset().data.length - i)
                }
            })
        }
    }, {}],
    20: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = t.helpers;
            t.defaults.radar = {
                scale: {
                    type: "radialLinear"
                },
                elements: {
                    line: {
                        tension: 0
                    }
                }
            }, t.controllers.radar = t.DatasetController.extend({
                linkScales: function() {},
                addElements: function() {
                    this.getDataset().metaData = this.getDataset().metaData || [], this.getDataset().metaDataset = this.getDataset().metaDataset || new t.elements.Line({
                        _chart: this.chart.chart,
                        _datasetIndex: this.index,
                        _points: this.getDataset().metaData,
                        _loop: !0
                    }), e.each(this.getDataset().data, function(e, i) {
                        this.getDataset().metaData[i] = this.getDataset().metaData[i] || new t.elements.Point({
                            _chart: this.chart.chart,
                            _datasetIndex: this.index,
                            _index: i,
                            _model: {
                                x: 0,
                                y: 0
                            }
                        })
                    }, this)
                },
                addElementAndReset: function(e) {
                    this.getDataset().metaData = this.getDataset().metaData || [];
                    var i = new t.elements.Point({
                        _chart: this.chart.chart,
                        _datasetIndex: this.index,
                        _index: e
                    });
                    this.updateElement(i, e, !0), this.getDataset().metaData.splice(e, 0, i), this.updateBezierControlPoints()
                },
                update: function(t) {
                    var i, s = this.getDataset().metaDataset,
                        a = this.getDataset().metaData,
                        o = this.chart.scale;
                    i = o.min < 0 && o.max < 0 ? o.getPointPositionForValue(0, o.max) : o.min > 0 && o.max > 0 ? o.getPointPositionForValue(0, o.min) : o.getPointPositionForValue(0, 0), e.extend(this.getDataset().metaDataset, {
                        _datasetIndex: this.index,
                        _children: this.getDataset().metaData,
                        _model: {
                            tension: s.custom && s.custom.tension ? s.custom.tension : e.getValueOrDefault(this.getDataset().tension, this.chart.options.elements.line.tension),
                            backgroundColor: s.custom && s.custom.backgroundColor ? s.custom.backgroundColor : this.getDataset().backgroundColor || this.chart.options.elements.line.backgroundColor,
                            borderWidth: s.custom && s.custom.borderWidth ? s.custom.borderWidth : this.getDataset().borderWidth || this.chart.options.elements.line.borderWidth,
                            borderColor: s.custom && s.custom.borderColor ? s.custom.borderColor : this.getDataset().borderColor || this.chart.options.elements.line.borderColor,
                            fill: s.custom && s.custom.fill ? s.custom.fill : void 0 !== this.getDataset().fill ? this.getDataset().fill : this.chart.options.elements.line.fill,
                            borderCapStyle: s.custom && s.custom.borderCapStyle ? s.custom.borderCapStyle : this.getDataset().borderCapStyle || this.chart.options.elements.line.borderCapStyle,
                            borderDash: s.custom && s.custom.borderDash ? s.custom.borderDash : this.getDataset().borderDash || this.chart.options.elements.line.borderDash,
                            borderDashOffset: s.custom && s.custom.borderDashOffset ? s.custom.borderDashOffset : this.getDataset().borderDashOffset || this.chart.options.elements.line.borderDashOffset,
                            borderJoinStyle: s.custom && s.custom.borderJoinStyle ? s.custom.borderJoinStyle : this.getDataset().borderJoinStyle || this.chart.options.elements.line.borderJoinStyle,
                            scaleTop: o.top,
                            scaleBottom: o.bottom,
                            scaleZero: i
                        }
                    }), this.getDataset().metaDataset.pivot(), e.each(a, function(e, i) {
                        this.updateElement(e, i, t)
                    }, this), this.updateBezierControlPoints()
                },
                updateElement: function(t, i, s) {
                    var a = this.chart.scale.getPointPositionForValue(i, this.getDataset().data[i]);
                    e.extend(t, {
                        _datasetIndex: this.index,
                        _index: i,
                        _scale: this.chart.scale,
                        _model: {
                            x: s ? this.chart.scale.xCenter : a.x,
                            y: s ? this.chart.scale.yCenter : a.y,
                            tension: t.custom && t.custom.tension ? t.custom.tension : e.getValueOrDefault(this.getDataset().tension, this.chart.options.elements.line.tension),
                            radius: t.custom && t.custom.radius ? t.custom.radius : e.getValueAtIndexOrDefault(this.getDataset().pointRadius, i, this.chart.options.elements.point.radius),
                            backgroundColor: t.custom && t.custom.backgroundColor ? t.custom.backgroundColor : e.getValueAtIndexOrDefault(this.getDataset().pointBackgroundColor, i, this.chart.options.elements.point.backgroundColor),
                            borderColor: t.custom && t.custom.borderColor ? t.custom.borderColor : e.getValueAtIndexOrDefault(this.getDataset().pointBorderColor, i, this.chart.options.elements.point.borderColor),
                            borderWidth: t.custom && t.custom.borderWidth ? t.custom.borderWidth : e.getValueAtIndexOrDefault(this.getDataset().pointBorderWidth, i, this.chart.options.elements.point.borderWidth),
                            pointStyle: t.custom && t.custom.pointStyle ? t.custom.pointStyle : e.getValueAtIndexOrDefault(this.getDataset().pointStyle, i, this.chart.options.elements.point.pointStyle),
                            hitRadius: t.custom && t.custom.hitRadius ? t.custom.hitRadius : e.getValueAtIndexOrDefault(this.getDataset().hitRadius, i, this.chart.options.elements.point.hitRadius)
                        }
                    }), t._model.skip = t.custom && t.custom.skip ? t.custom.skip : isNaN(t._model.x) || isNaN(t._model.y)
                },
                updateBezierControlPoints: function() {
                    e.each(this.getDataset().metaData, function(t, i) {
                        var s = e.splineCurve(e.previousItem(this.getDataset().metaData, i, !0)._model, t._model, e.nextItem(this.getDataset().metaData, i, !0)._model, t._model.tension);
                        t._model.controlPointPreviousX = Math.max(Math.min(s.previous.x, this.chart.chartArea.right), this.chart.chartArea.left), t._model.controlPointPreviousY = Math.max(Math.min(s.previous.y, this.chart.chartArea.bottom), this.chart.chartArea.top), t._model.controlPointNextX = Math.max(Math.min(s.next.x, this.chart.chartArea.right), this.chart.chartArea.left), t._model.controlPointNextY = Math.max(Math.min(s.next.y, this.chart.chartArea.bottom), this.chart.chartArea.top), t.pivot()
                    }, this)
                },
                draw: function(t) {
                    var i = t || 1;
                    e.each(this.getDataset().metaData, function(t, e) {
                        t.transition(i)
                    }), this.getDataset().metaDataset.transition(i).draw(), e.each(this.getDataset().metaData, function(t) {
                        t.draw()
                    })
                },
                setHoverStyle: function(t) {
                    var i = this.chart.data.datasets[t._datasetIndex],
                        s = t._index;
                    t._model.radius = t.custom && t.custom.hoverRadius ? t.custom.hoverRadius : e.getValueAtIndexOrDefault(i.pointHoverRadius, s, this.chart.options.elements.point.hoverRadius), t._model.backgroundColor = t.custom && t.custom.hoverBackgroundColor ? t.custom.hoverBackgroundColor : e.getValueAtIndexOrDefault(i.pointHoverBackgroundColor, s, e.color(t._model.backgroundColor).saturate(.5).darken(.1).rgbString()), t._model.borderColor = t.custom && t.custom.hoverBorderColor ? t.custom.hoverBorderColor : e.getValueAtIndexOrDefault(i.pointHoverBorderColor, s, e.color(t._model.borderColor).saturate(.5).darken(.1).rgbString()), t._model.borderWidth = t.custom && t.custom.hoverBorderWidth ? t.custom.hoverBorderWidth : e.getValueAtIndexOrDefault(i.pointHoverBorderWidth, s, t._model.borderWidth)
                },
                removeHoverStyle: function(t) {
                    var i = (this.chart.data.datasets[t._datasetIndex], t._index);
                    t._model.radius = t.custom && t.custom.radius ? t.custom.radius : e.getValueAtIndexOrDefault(this.getDataset().radius, i, this.chart.options.elements.point.radius), t._model.backgroundColor = t.custom && t.custom.backgroundColor ? t.custom.backgroundColor : e.getValueAtIndexOrDefault(this.getDataset().pointBackgroundColor, i, this.chart.options.elements.point.backgroundColor), t._model.borderColor = t.custom && t.custom.borderColor ? t.custom.borderColor : e.getValueAtIndexOrDefault(this.getDataset().pointBorderColor, i, this.chart.options.elements.point.borderColor), t._model.borderWidth = t.custom && t.custom.borderWidth ? t.custom.borderWidth : e.getValueAtIndexOrDefault(this.getDataset().pointBorderWidth, i, this.chart.options.elements.point.borderWidth)
                }
            })
        }
    }, {}],
    21: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = t.helpers;
            t.defaults.global.animation = {
                duration: 1e3,
                easing: "easeOutQuart",
                onProgress: e.noop,
                onComplete: e.noop
            }, t.Animation = t.Element.extend({
                currentStep: null,
                numSteps: 60,
                easing: "",
                render: null,
                onAnimationProgress: null,
                onAnimationComplete: null
            }), t.animationService = {
                frameDuration: 17,
                animations: [],
                dropFrames: 0,
                addAnimation: function(t, i, s, a) {
                    a || (t.animating = !0);
                    for (var o = 0; o < this.animations.length; ++o)
                        if (this.animations[o].chartInstance === t) return void(this.animations[o].animationObject = i);
                    this.animations.push({
                        chartInstance: t,
                        animationObject: i
                    }), 1 === this.animations.length && e.requestAnimFrame.call(window, this.digestWrapper)
                },
                cancelAnimation: function(t) {
                    var i = e.findNextWhere(this.animations, function(e) {
                        return e.chartInstance === t
                    });
                    i && (this.animations.splice(i, 1), t.animating = !1)
                },
                digestWrapper: function() {
                    t.animationService.startDigest.call(t.animationService)
                },
                startDigest: function() {
                    var t = Date.now(),
                        i = 0;
                    this.dropFrames > 1 && (i = Math.floor(this.dropFrames), this.dropFrames = this.dropFrames % 1);
                    for (var s = 0; s < this.animations.length; s++) null === this.animations[s].animationObject.currentStep && (this.animations[s].animationObject.currentStep = 0), this.animations[s].animationObject.currentStep += 1 + i, this.animations[s].animationObject.currentStep > this.animations[s].animationObject.numSteps && (this.animations[s].animationObject.currentStep = this.animations[s].animationObject.numSteps), this.animations[s].animationObject.render(this.animations[s].chartInstance, this.animations[s].animationObject), this.animations[s].animationObject.onAnimationProgress && this.animations[s].animationObject.onAnimationProgress.call && this.animations[s].animationObject.onAnimationProgress.call(this.animations[s].chartInstance, this.animations[s]), this.animations[s].animationObject.currentStep === this.animations[s].animationObject.numSteps && (this.animations[s].animationObject.onAnimationComplete && this.animations[s].animationObject.onAnimationComplete.call && this.animations[s].animationObject.onAnimationComplete.call(this.animations[s].chartInstance, this.animations[s]), this.animations[s].chartInstance.animating = !1, this.animations.splice(s, 1), s--);
                    var a = Date.now(),
                        o = (a - t) / this.frameDuration;
                    this.dropFrames += o, this.animations.length > 0 && e.requestAnimFrame.call(window, this.digestWrapper)
                }
            }
        }
    }, {}],
    22: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = t.helpers;
            t.types = {}, t.instances = {}, t.controllers = {}, t.Controller = function(i) {
                return this.chart = i, this.config = i.config, this.options = this.config.options = e.configMerge(t.defaults.global, t.defaults[this.config.type], this.config.options || {}), this.id = e.uid(), Object.defineProperty(this, "data", {
                    get: function() {
                        return this.config.data
                    }
                }), t.instances[this.id] = this, this.options.responsive && this.resize(!0), this.initialize(), this
            }, e.extend(t.Controller.prototype, {
                initialize: function() {
                    return this.bindEvents(), this.ensureScalesHaveIDs(), this.buildOrUpdateControllers(), this.buildScales(), this.buildSurroundingItems(), this.updateLayout(), this.resetElements(), this.initToolTip(), this.update(), this
                },
                clear: function() {
                    return e.clear(this.chart), this
                },
                stop: function() {
                    return t.animationService.cancelAnimation(this), this
                },
                resize: function(t) {
                    var i = this.chart.canvas,
                        s = e.getMaximumWidth(this.chart.canvas),
                        a = this.options.maintainAspectRatio && isNaN(this.chart.aspectRatio) === !1 && isFinite(this.chart.aspectRatio) && 0 !== this.chart.aspectRatio ? s / this.chart.aspectRatio : e.getMaximumHeight(this.chart.canvas),
                        o = this.chart.width !== s || this.chart.height !== a;
                    return o ? (i.width = this.chart.width = s, i.height = this.chart.height = a, e.retinaScale(this.chart), t || (this.stop(), this.update(this.options.responsiveAnimationDuration)), this) : this
                },
                ensureScalesHaveIDs: function() {
                    var t = "x-axis-",
                        i = "y-axis-";
                    this.options.scales && (this.options.scales.xAxes && this.options.scales.xAxes.length && e.each(this.options.scales.xAxes, function(e, i) {
                        e.id = e.id || t + i
                    }), this.options.scales.yAxes && this.options.scales.yAxes.length && e.each(this.options.scales.yAxes, function(t, e) {
                        t.id = t.id || i + e
                    }))
                },
                buildScales: function() {
                    if (this.scales = {}, this.options.scales && (this.options.scales.xAxes && this.options.scales.xAxes.length && e.each(this.options.scales.xAxes, function(e, i) {
                            var s = t.scaleService.getScaleConstructor(e.type);
                            if (s) {
                                var a = new s({
                                    ctx: this.chart.ctx,
                                    options: e,
                                    chart: this,
                                    id: e.id
                                });
                                this.scales[a.id] = a
                            }
                        }, this), this.options.scales.yAxes && this.options.scales.yAxes.length && e.each(this.options.scales.yAxes, function(e, i) {
                            var s = t.scaleService.getScaleConstructor(e.type);
                            if (s) {
                                var a = new s({
                                    ctx: this.chart.ctx,
                                    options: e,
                                    chart: this,
                                    id: e.id
                                });
                                this.scales[a.id] = a
                            }
                        }, this)), this.options.scale) {
                        var i = t.scaleService.getScaleConstructor(this.options.scale.type);
                        if (i) {
                            var s = new i({
                                ctx: this.chart.ctx,
                                options: this.options.scale,
                                chart: this
                            });
                            this.scale = s, this.scales.radialScale = s
                        }
                    }
                    t.scaleService.addScalesToLayout(this)
                },
                buildSurroundingItems: function() {
                    this.options.title && (this.titleBlock = new t.Title({
                        ctx: this.chart.ctx,
                        options: this.options.title,
                        chart: this
                    }), t.layoutService.addBox(this, this.titleBlock)), this.options.legend && (this.legend = new t.Legend({
                        ctx: this.chart.ctx,
                        options: this.options.legend,
                        chart: this
                    }), t.layoutService.addBox(this, this.legend))
                },
                updateLayout: function() {
                    t.layoutService.update(this, this.chart.width, this.chart.height)
                },
                buildOrUpdateControllers: function() {
                    var i = [],
                        s = [];
                    if (e.each(this.data.datasets, function(e, a) {
                            e.type || (e.type = this.config.type);
                            var o = e.type;
                            i.push(o), e.controller ? e.controller.updateIndex(a) : (e.controller = new t.controllers[o](this, a), s.push(e.controller))
                        }, this), i.length > 1)
                        for (var a = 1; a < i.length; a++)
                            if (i[a] !== i[a - 1]) {
                                this.isCombo = !0;
                                break
                            }
                    return s
                },
                resetElements: function() {
                    e.each(this.data.datasets, function(t, e) {
                        t.controller.reset()
                    })
                },
                update: function(i, s) {
                    this.tooltip._data = this.data;
                    var a = this.buildOrUpdateControllers();
                    t.layoutService.update(this, this.chart.width, this.chart.height), e.each(a, function(t) {
                        t.reset()
                    }), e.each(this.data.datasets, function(t, e) {
                        t.controller.buildOrUpdateElements()
                    }), e.each(this.data.datasets, function(t, e) {
                        t.controller.update()
                    }), this.render(i, s)
                },
                render: function(i, s) {
                    if (this.options.animation && ("undefined" != typeof i && 0 !== i || "undefined" == typeof i && 0 !== this.options.animation.duration)) {
                        var a = new t.Animation;
                        a.numSteps = (i || this.options.animation.duration) / 16.66, a.easing = this.options.animation.easing, a.render = function(t, i) {
                            var s = e.easingEffects[i.easing],
                                a = i.currentStep / i.numSteps,
                                o = s(a);
                            t.draw(o, a, i.currentStep)
                        }, a.onAnimationProgress = this.options.animation.onProgress, a.onAnimationComplete = this.options.animation.onComplete, t.animationService.addAnimation(this, a, i, s)
                    } else this.draw(), this.options.animation && this.options.animation.onComplete && this.options.animation.onComplete.call && this.options.animation.onComplete.call(this);
                    return this
                },
                draw: function(t) {
                    var i = t || 1;
                    this.clear(), e.each(this.boxes, function(t) {
                        t.draw(this.chartArea)
                    }, this), this.scale && this.scale.draw(), e.each(this.data.datasets, function(i, s) {
                        e.isDatasetVisible(i) && i.controller.draw(t)
                    }, null, !0), this.tooltip.transition(i).draw()
                },
                getElementAtEvent: function(t) {
                    var i = e.getRelativePosition(t, this.chart),
                        s = [];
                    return e.each(this.data.datasets, function(t, a) {
                        e.isDatasetVisible(t) && e.each(t.metaData, function(t, e) {
                            return t.inRange(i.x, i.y) ? (s.push(t), s) : void 0
                        })
                    }), s
                },
                getElementsAtEvent: function(t) {
                    var i = e.getRelativePosition(t, this.chart),
                        s = [],
                        a = function() {
                            for (var t = 0; t < this.data.datasets.length; t++)
                                if (e.isDatasetVisible(this.data.datasets[t]))
                                    for (var s = 0; s < this.data.datasets[t].metaData.length; s++)
                                        if (this.data.datasets[t].metaData[s].inRange(i.x, i.y)) return this.data.datasets[t].metaData[s]
                        }.call(this);
                    return a ? (e.each(this.data.datasets, function(t, i) {
                        e.isDatasetVisible(t) && s.push(t.metaData[a._index])
                    }), s) : s
                },
                getDatasetAtEvent: function(t) {
                    var e = this.getElementAtEvent(t);
                    return e.length > 0 && (e = this.data.datasets[e[0]._datasetIndex].metaData), e
                },
                generateLegend: function() {
                    return this.options.legendCallback(this)
                },
                destroy: function() {
                    this.clear(), e.unbindEvents(this, this.events), e.removeResizeListener(this.chart.canvas.parentNode);
                    var i = this.chart.canvas;
                    i.width = this.chart.width, i.height = this.chart.height, void 0 !== this.chart.originalDevicePixelRatio && this.chart.ctx.scale(1 / this.chart.originalDevicePixelRatio, 1 / this.chart.originalDevicePixelRatio), i.style.width = this.chart.originalCanvasStyleWidth, i.style.height = this.chart.originalCanvasStyleHeight, delete t.instances[this.id]
                },
                toBase64Image: function() {
                    return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments)
                },
                initToolTip: function() {
                    this.tooltip = new t.Tooltip({
                        _chart: this.chart,
                        _chartInstance: this,
                        _data: this.data,
                        _options: this.options
                    }, this)
                },
                bindEvents: function() {
                    e.bindEvents(this, this.options.events, function(t) {
                        this.eventHandler(t)
                    })
                },
                eventHandler: function(t) {
                    if (this.lastActive = this.lastActive || [], this.lastTooltipActive = this.lastTooltipActive || [], "mouseout" === t.type) this.active = [], this.tooltipActive = [];
                    else {
                        var i = this,
                            s = function(e) {
                                switch (e) {
                                    case "single":
                                        return i.getElementAtEvent(t);
                                    case "label":
                                        return i.getElementsAtEvent(t);
                                    case "dataset":
                                        return i.getDatasetAtEvent(t);
                                    default:
                                        return t
                                }
                            };
                        this.active = s(this.options.hover.mode), this.tooltipActive = s(this.options.tooltips.mode)
                    }
                    this.options.hover.onHover && this.options.hover.onHover.call(this, this.active), ("mouseup" === t.type || "click" === t.type) && (this.options.onClick && this.options.onClick.call(this, t, this.active), this.legend && this.legend.handleEvent && this.legend.handleEvent(t));
                    if (this.lastActive.length) switch (this.options.hover.mode) {
                        case "single":
                            this.data.datasets[this.lastActive[0]._datasetIndex].controller.removeHoverStyle(this.lastActive[0], this.lastActive[0]._datasetIndex, this.lastActive[0]._index);
                            break;
                        case "label":
                        case "dataset":
                            for (var a = 0; a < this.lastActive.length; a++) this.lastActive[a] && this.data.datasets[this.lastActive[a]._datasetIndex].controller.removeHoverStyle(this.lastActive[a], this.lastActive[a]._datasetIndex, this.lastActive[a]._index)
                    }
                    if (this.active.length && this.options.hover.mode) switch (this.options.hover.mode) {
                        case "single":
                            this.data.datasets[this.active[0]._datasetIndex].controller.setHoverStyle(this.active[0]);
                            break;
                        case "label":
                        case "dataset":
                            for (var o = 0; o < this.active.length; o++) this.active[o] && this.data.datasets[this.active[o]._datasetIndex].controller.setHoverStyle(this.active[o])
                    }
                    if ((this.options.tooltips.enabled || this.options.tooltips.custom) && (this.tooltip.initialize(), this.tooltip._active = this.tooltipActive, this.tooltip.update()), this.tooltip.pivot(), !this.animating) {
                        var n;
                        e.each(this.active, function(t, e) {
                            t !== this.lastActive[e] && (n = !0)
                        }, this), e.each(this.tooltipActive, function(t, e) {
                            t !== this.lastTooltipActive[e] && (n = !0)
                        }, this), (this.lastActive.length !== this.active.length || this.lastTooltipActive.length !== this.tooltipActive.length || n) && (this.stop(), (this.options.tooltips.enabled || this.options.tooltips.custom) && this.tooltip.update(!0), this.render(this.options.hover.animationDuration, !0))
                    }
                    return this.lastActive = this.active, this.lastTooltipActive = this.tooltipActive, this
                }
            })
        }
    }, {}],
    23: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = t.helpers;
            t.DatasetController = function(t, e) {
                this.initialize.call(this, t, e)
            }, e.extend(t.DatasetController.prototype, {
                initialize: function(t, e) {
                    this.chart = t, this.index = e, this.linkScales(), this.addElements()
                },
                updateIndex: function(t) {
                    this.index = t
                },
                linkScales: function() {
                    this.getDataset().xAxisID || (this.getDataset().xAxisID = this.chart.options.scales.xAxes[0].id), this.getDataset().yAxisID || (this.getDataset().yAxisID = this.chart.options.scales.yAxes[0].id)
                },
                getDataset: function() {
                    return this.chart.data.datasets[this.index]
                },
                getScaleForId: function(t) {
                    return this.chart.scales[t]
                },
                reset: function() {
                    this.update(!0)
                },
                buildOrUpdateElements: function() {
                    var t = this.getDataset().data.length,
                        e = this.getDataset().metaData.length;
                    if (e > t) this.getDataset().metaData.splice(t, e - t);
                    else if (t > e)
                        for (var i = e; t > i; ++i) this.addElementAndReset(i)
                },
                addElements: e.noop,
                addElementAndReset: e.noop,
                draw: e.noop,
                removeHoverStyle: e.noop,
                setHoverStyle: e.noop,
                update: e.noop
            }), t.DatasetController.extend = e.inherits
        }
    }, {}],
    24: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = t.helpers;
            t.elements = {}, t.Element = function(t) {
                e.extend(this, t), this.initialize.apply(this, arguments)
            }, e.extend(t.Element.prototype, {
                initialize: function() {},
                pivot: function() {
                    return this._view || (this._view = e.clone(this._model)), this._start = e.clone(this._view), this
                },
                transition: function(t) {
                    return this._view || (this._view = e.clone(this._model)), 1 === t ? (this._view = this._model, this._start = null, this) : (this._start || this.pivot(), e.each(this._model, function(i, s) {
                        if ("_" !== s[0] && this._model.hasOwnProperty(s))
                            if (this._view.hasOwnProperty(s))
                                if (i === this._view[s]);
                                else if ("string" == typeof i) try {
                            var a = e.color(this._start[s]).mix(e.color(this._model[s]), t);
                            this._view[s] = a.rgbString()
                        } catch (o) {
                            this._view[s] = i
                        } else if ("number" == typeof i) {
                            var n = void 0 !== this._start[s] && isNaN(this._start[s]) === !1 ? this._start[s] : 0;
                            this._view[s] = (this._model[s] - n) * t + n
                        } else this._view[s] = i;
                        else "number" != typeof i || isNaN(this._view[s]) ? this._view[s] = i : this._view[s] = i * t;
                        else;
                    }, this), this)
                },
                tooltipPosition: function() {
                    return {
                        x: this._model.x,
                        y: this._model.y
                    }
                },
                hasValue: function() {
                    return e.isNumber(this._model.x) && e.isNumber(this._model.y)
                }
            }), t.Element.extend = e.inherits
        }
    }, {}],
    25: [function(t, e, i) {
        "use strict";
        var s = t("chartjs-color");
        e.exports = function(t) {
            var e = t.helpers = {};
            e.each = function(t, i, s, a) {
                var o, n;
                if (e.isArray(t))
                    if (n = t.length, a)
                        for (o = n - 1; o >= 0; o--) i.call(s, t[o], o);
                    else
                        for (o = 0; n > o; o++) i.call(s, t[o], o);
                else if ("object" == typeof t) {
                    var r = Object.keys(t);
                    for (n = r.length, o = 0; n > o; o++) i.call(s, t[r[o]], r[o])
                }
            }, e.clone = function(t) {
                var i = {};
                return e.each(t, function(s, a) {
                    t.hasOwnProperty(a) && (e.isArray(s) ? i[a] = s.slice(0) : "object" == typeof s && null !== s ? i[a] = e.clone(s) : i[a] = s)
                }), i
            }, e.extend = function(t) {
                for (var i = arguments.length, s = [], a = 1; i > a; a++) s.push(arguments[a]);
                return e.each(s, function(i) {
                    e.each(i, function(e, s) {
                        i.hasOwnProperty(s) && (t[s] = e)
                    })
                }), t
            }, e.configMerge = function(i) {
                var s = e.clone(i);
                return e.each(Array.prototype.slice.call(arguments, 1), function(i) {
                    e.each(i, function(a, o) {
                        if (i.hasOwnProperty(o))
                            if ("scales" === o) s[o] = e.scaleMerge(s.hasOwnProperty(o) ? s[o] : {}, a);
                            else if ("scale" === o) s[o] = e.configMerge(s.hasOwnProperty(o) ? s[o] : {}, t.scaleService.getScaleDefaults(a.type), a);
                        else if (s.hasOwnProperty(o) && e.isArray(s[o]) && e.isArray(a)) {
                            var n = s[o];
                            e.each(a, function(t, i) {
                                i < n.length ? "object" == typeof n[i] && null !== n[i] && "object" == typeof t && null !== t ? n[i] = e.configMerge(n[i], t) : n[i] = t : n.push(t)
                            })
                        } else s.hasOwnProperty(o) && "object" == typeof s[o] && null !== s[o] && "object" == typeof a ? s[o] = e.configMerge(s[o], a) : s[o] = a
                    })
                }), s
            }, e.extendDeep = function(t) {
                function i(t) {
                    return e.each(arguments, function(s) {
                        s !== t && e.each(s, function(e, s) {
                            t[s] && t[s].constructor && t[s].constructor === Object ? i(t[s], e) : t[s] = e
                        })
                    }), t
                }
                return i.apply(this, arguments)
            }, e.scaleMerge = function(i, s) {
                var a = e.clone(i);
                return e.each(s, function(i, o) {
                    s.hasOwnProperty(o) && ("xAxes" === o || "yAxes" === o ? a.hasOwnProperty(o) ? e.each(i, function(i, s) {
                        s >= a[o].length || !a[o][s].type ? a[o].push(e.configMerge(i.type ? t.scaleService.getScaleDefaults(i.type) : {}, i)) : i.type !== a[o][s].type ? a[o][s] = e.configMerge(a[o][s], i.type ? t.scaleService.getScaleDefaults(i.type) : {}, i) : a[o][s] = e.configMerge(a[o][s], i)
                    }) : (a[o] = [], e.each(i, function(i) {
                        a[o].push(e.configMerge(i.type ? t.scaleService.getScaleDefaults(i.type) : {}, i))
                    })) : a.hasOwnProperty(o) && "object" == typeof a[o] && null !== a[o] && "object" == typeof i ? a[o] = e.configMerge(a[o], i) : a[o] = i)
                }), a
            }, e.getValueAtIndexOrDefault = function(t, i, s) {
                return void 0 === t || null === t ? s : e.isArray(t) ? i < t.length ? t[i] : s : t
            }, e.getValueOrDefault = function(t, e) {
                return void 0 === t ? e : t
            }, e.indexOf = function(t, e) {
                if (Array.prototype.indexOf) return t.indexOf(e);
                for (var i = 0; i < t.length; i++)
                    if (t[i] === e) return i;
                return -1
            }, e.where = function(t, i) {
                var s = [];
                return e.each(t, function(t) {
                    i(t) && s.push(t)
                }), s
            }, e.findNextWhere = function(t, e, i) {
                (void 0 === i || null === i) && (i = -1);
                for (var s = i + 1; s < t.length; s++) {
                    var a = t[s];
                    if (e(a)) return a
                }
            }, e.findPreviousWhere = function(t, e, i) {
                (void 0 === i || null === i) && (i = t.length);
                for (var s = i - 1; s >= 0; s--) {
                    var a = t[s];
                    if (e(a)) return a
                }
            }, e.inherits = function(t) {
                var i = this,
                    s = t && t.hasOwnProperty("constructor") ? t.constructor : function() {
                        return i.apply(this, arguments)
                    },
                    a = function() {
                        this.constructor = s
                    };
                return a.prototype = i.prototype, s.prototype = new a, s.extend = e.inherits, t && e.extend(s.prototype, t), s.__super__ = i.prototype, s
            }, e.noop = function() {}, e.uid = function() {
                var t = 0;
                return function() {
                    return "chart-" + t++
                }
            }(), e.warn = function(t) {
                console && "function" == typeof console.warn && console.warn(t)
            }, e.isNumber = function(t) {
                return !isNaN(parseFloat(t)) && isFinite(t)
            }, e.almostEquals = function(t, e, i) {
                return Math.abs(t - e) < i
            }, e.max = function(t) {
                return t.reduce(function(t, e) {
                    return isNaN(e) ? t : Math.max(t, e)
                }, Number.NEGATIVE_INFINITY)
            }, e.min = function(t) {
                return t.reduce(function(t, e) {
                    return isNaN(e) ? t : Math.min(t, e)
                }, Number.POSITIVE_INFINITY)
            }, e.sign = function(t) {
                return Math.sign ? Math.sign(t) : (t = +t, 0 === t || isNaN(t) ? t : t > 0 ? 1 : -1)
            }, e.log10 = function(t) {
                return Math.log10 ? Math.log10(t) : Math.log(t) / Math.LN10
            }, e.toRadians = function(t) {
                return t * (Math.PI / 180)
            }, e.toDegrees = function(t) {
                return t * (180 / Math.PI)
            }, e.getAngleFromPoint = function(t, e) {
                var i = e.x - t.x,
                    s = e.y - t.y,
                    a = Math.sqrt(i * i + s * s),
                    o = Math.atan2(s, i);
                return o < -.5 * Math.PI && (o += 2 * Math.PI), {
                    angle: o,
                    distance: a
                }
            }, e.aliasPixel = function(t) {
                return t % 2 === 0 ? 0 : .5
            }, e.splineCurve = function(t, e, i, s) {
                var a = t.skip ? e : t,
                    o = e,
                    n = i.skip ? e : i,
                    r = Math.sqrt(Math.pow(o.x - a.x, 2) + Math.pow(o.y - a.y, 2)),
                    l = Math.sqrt(Math.pow(n.x - o.x, 2) + Math.pow(n.y - o.y, 2)),
                    h = r / (r + l),
                    c = l / (r + l);
                h = isNaN(h) ? 0 : h, c = isNaN(c) ? 0 : c;
                var u = s * h,
                    d = s * c;
                return {
                    previous: {
                        x: o.x - u * (n.x - a.x),
                        y: o.y - u * (n.y - a.y)
                    },
                    next: {
                        x: o.x + d * (n.x - a.x),
                        y: o.y + d * (n.y - a.y)
                    }
                }
            }, e.nextItem = function(t, e, i) {
                return i ? e >= t.length - 1 ? t[0] : t[e + 1] : e >= t.length - 1 ? t[t.length - 1] : t[e + 1]
            }, e.previousItem = function(t, e, i) {
                return i ? 0 >= e ? t[t.length - 1] : t[e - 1] : 0 >= e ? t[0] : t[e - 1]
            }, e.niceNum = function(t, i) {
                var s, a = Math.floor(e.log10(t)),
                    o = t / Math.pow(10, a);
                return s = i ? 1.5 > o ? 1 : 3 > o ? 2 : 7 > o ? 5 : 10 : 1 >= o ? 1 : 2 >= o ? 2 : 5 >= o ? 5 : 10, s * Math.pow(10, a)
            };
            var i = e.easingEffects = {
                linear: function(t) {
                    return t
                },
                easeInQuad: function(t) {
                    return t * t
                },
                easeOutQuad: function(t) {
                    return -1 * t * (t - 2)
                },
                easeInOutQuad: function(t) {
                    return (t /= .5) < 1 ? .5 * t * t : -0.5 * (--t * (t - 2) - 1)
                },
                easeInCubic: function(t) {
                    return t * t * t
                },
                easeOutCubic: function(t) {
                    return 1 * ((t = t / 1 - 1) * t * t + 1)
                },
                easeInOutCubic: function(t) {
                    return (t /= .5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
                },
                easeInQuart: function(t) {
                    return t * t * t * t
                },
                easeOutQuart: function(t) {
                    return -1 * ((t = t / 1 - 1) * t * t * t - 1)
                },
                easeInOutQuart: function(t) {
                    return (t /= .5) < 1 ? .5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2)
                },
                easeInQuint: function(t) {
                    return 1 * (t /= 1) * t * t * t * t
                },
                easeOutQuint: function(t) {
                    return 1 * ((t = t / 1 - 1) * t * t * t * t + 1)
                },
                easeInOutQuint: function(t) {
                    return (t /= .5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
                },
                easeInSine: function(t) {
                    return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1
                },
                easeOutSine: function(t) {
                    return 1 * Math.sin(t / 1 * (Math.PI / 2))
                },
                easeInOutSine: function(t) {
                    return -0.5 * (Math.cos(Math.PI * t / 1) - 1)
                },
                easeInExpo: function(t) {
                    return 0 === t ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1))
                },
                easeOutExpo: function(t) {
                    return 1 === t ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1)
                },
                easeInOutExpo: function(t) {
                    return 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (-Math.pow(2, -10 * --t) + 2)
                },
                easeInCirc: function(t) {
                    return t >= 1 ? t : -1 * (Math.sqrt(1 - (t /= 1) * t) - 1)
                },
                easeOutCirc: function(t) {
                    return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t)
                },
                easeInOutCirc: function(t) {
                    return (t /= .5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                },
                easeInElastic: function(t) {
                    var e = 1.70158,
                        i = 0,
                        s = 1;
                    return 0 === t ? 0 : 1 === (t /= 1) ? 1 : (i || (i = .3), s < Math.abs(1) ? (s = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / s), -(s * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / i)))
                },
                easeOutElastic: function(t) {
                    var e = 1.70158,
                        i = 0,
                        s = 1;
                    return 0 === t ? 0 : 1 === (t /= 1) ? 1 : (i || (i = .3), s < Math.abs(1) ? (s = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / s), s * Math.pow(2, -10 * t) * Math.sin((1 * t - e) * (2 * Math.PI) / i) + 1)
                },
                easeInOutElastic: function(t) {
                    var e = 1.70158,
                        i = 0,
                        s = 1;
                    return 0 === t ? 0 : 2 === (t /= .5) ? 1 : (i || (i = 1 * (.3 * 1.5)), s < Math.abs(1) ? (s = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / s), 1 > t ? -.5 * (s * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / i)) : s * Math.pow(2, -10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / i) * .5 + 1)
                },
                easeInBack: function(t) {
                    var e = 1.70158;
                    return 1 * (t /= 1) * t * ((e + 1) * t - e)
                },
                easeOutBack: function(t) {
                    var e = 1.70158;
                    return 1 * ((t = t / 1 - 1) * t * ((e + 1) * t + e) + 1)
                },
                easeInOutBack: function(t) {
                    var e = 1.70158;
                    return (t /= .5) < 1 ? .5 * (t * t * (((e *= 1.525) + 1) * t - e)) : .5 * ((t -= 2) * t * (((e *= 1.525) + 1) * t + e) + 2)
                },
                easeInBounce: function(t) {
                    return 1 - i.easeOutBounce(1 - t)
                },
                easeOutBounce: function(t) {
                    return (t /= 1) < 1 / 2.75 ? 1 * (7.5625 * t * t) : 2 / 2.75 > t ? 1 * (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 * (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
                },
                easeInOutBounce: function(t) {
                    return .5 > t ? .5 * i.easeInBounce(2 * t) : .5 * i.easeOutBounce(2 * t - 1) + .5
                }
            };
            e.requestAnimFrame = function() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
                    return window.setTimeout(t, 1e3 / 60)
                }
            }(), e.cancelAnimFrame = function() {
                return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function(t) {
                    return window.clearTimeout(t, 1e3 / 60)
                }
            }(), e.getRelativePosition = function(t, i) {
                var s, a, o = t.originalEvent || t,
                    n = t.currentTarget || t.srcElement,
                    r = n.getBoundingClientRect();
                o.touches && o.touches.length > 0 ? (s = o.touches[0].clientX, a = o.touches[0].clientY) : (s = o.clientX, a = o.clientY);
                var l = parseFloat(e.getStyle(n, "padding-left")),
                    h = parseFloat(e.getStyle(n, "padding-top")),
                    c = parseFloat(e.getStyle(n, "padding-right")),
                    u = parseFloat(e.getStyle(n, "padding-bottom")),
                    d = r.right - r.left - l - c,
                    f = r.bottom - r.top - h - u;
                return s = Math.round((s - r.left - l) / d * n.width / i.currentDevicePixelRatio), a = Math.round((a - r.top - h) / f * n.height / i.currentDevicePixelRatio), {
                    x: s,
                    y: a
                }
            }, e.addEvent = function(t, e, i) {
                t.addEventListener ? t.addEventListener(e, i) : t.attachEvent ? t.attachEvent("on" + e, i) : t["on" + e] = i
            }, e.removeEvent = function(t, i, s) {
                t.removeEventListener ? t.removeEventListener(i, s, !1) : t.detachEvent ? t.detachEvent("on" + i, s) : t["on" + i] = e.noop
            }, e.bindEvents = function(t, i, s) {
                t.events || (t.events = {}), e.each(i, function(i) {
                    t.events[i] = function() {
                        s.apply(t, arguments)
                    }, e.addEvent(t.chart.canvas, i, t.events[i])
                })
            }, e.unbindEvents = function(t, i) {
                e.each(i, function(i, s) {
                    e.removeEvent(t.chart.canvas, s, i)
                })
            }, e.getConstraintWidth = function(t) {
                var e, i = document.defaultView.getComputedStyle(t)["max-width"],
                    s = document.defaultView.getComputedStyle(t.parentNode)["max-width"],
                    a = null !== i && "none" !== i,
                    o = null !== s && "none" !== s;
                return (a || o) && (e = Math.min(a ? parseInt(i, 10) : Number.POSITIVE_INFINITY, o ? parseInt(s, 10) : Number.POSITIVE_INFINITY)), e
            }, e.getConstraintHeight = function(t) {
                var e, i = document.defaultView.getComputedStyle(t)["max-height"],
                    s = document.defaultView.getComputedStyle(t.parentNode)["max-height"],
                    a = null !== i && "none" !== i,
                    o = null !== s && "none" !== s;
                return (i || s) && (e = Math.min(a ? parseInt(i, 10) : Number.POSITIVE_INFINITY, o ? parseInt(s, 10) : Number.POSITIVE_INFINITY)), e
            }, e.getMaximumWidth = function(t) {
                var i = t.parentNode,
                    s = parseInt(e.getStyle(i, "padding-left")) + parseInt(e.getStyle(i, "padding-right")),
                    a = i.clientWidth - s,
                    o = e.getConstraintWidth(t);
                return void 0 !== o && (a = Math.min(a, o)), a
            }, e.getMaximumHeight = function(t) {
                var i = t.parentNode,
                    s = parseInt(e.getStyle(i, "padding-top")) + parseInt(e.getStyle(i, "padding-bottom")),
                    a = i.clientHeight - s,
                    o = e.getConstraintHeight(t);
                return void 0 !== o && (a = Math.min(a, o)), a
            }, e.getStyle = function(t, e) {
                return t.currentStyle ? t.currentStyle[e] : document.defaultView.getComputedStyle(t, null).getPropertyValue(e)
            }, e.retinaScale = function(t) {
                var e = t.ctx,
                    i = t.canvas.width,
                    s = t.canvas.height,
                    a = t.currentDevicePixelRatio = window.devicePixelRatio || 1;
                1 !== a && (e.canvas.height = s * a, e.canvas.width = i * a, e.scale(a, a), e.canvas.style.width = i + "px", e.canvas.style.height = s + "px", t.originalDevicePixelRatio = t.originalDevicePixelRatio || a)
            }, e.clear = function(t) {
                t.ctx.clearRect(0, 0, t.width, t.height)
            }, e.fontString = function(t, e, i) {
                return e + " " + t + "px " + i
            }, e.longestText = function(t, i, s, a) {
                a = a || {}, a.data = a.data || {}, a.garbageCollect = a.garbageCollect || [], a.font !== i && (a.data = {}, a.garbageCollect = [], a.font = i), t.font = i;
                var o = 0;
                e.each(s, function(e) {
                    var i = a.data[e];
                    i || (i = a.data[e] = t.measureText(e).width, a.garbageCollect.push(e)), i > o && (o = i)
                });
                var n = a.garbageCollect.length / 2;
                if (n > s.length) {
                    for (var r = 0; n > r; r++) delete a.data[a.garbageCollect[r]];
                    a.garbageCollect.splice(0, n)
                }
                return o
            }, e.drawRoundedRectangle = function(t, e, i, s, a, o) {
                t.beginPath(), t.moveTo(e + o, i), t.lineTo(e + s - o, i), t.quadraticCurveTo(e + s, i, e + s, i + o), t.lineTo(e + s, i + a - o), t.quadraticCurveTo(e + s, i + a, e + s - o, i + a), t.lineTo(e + o, i + a), t.quadraticCurveTo(e, i + a, e, i + a - o), t.lineTo(e, i + o), t.quadraticCurveTo(e, i, e + o, i), t.closePath()
            }, e.color = function(t) {
                return s ? s(t) : (console.log("Color.js not found!"), t)
            }, e.addResizeListener = function(t, e) {
                var i = document.createElement("iframe"),
                    s = "chartjs-hidden-iframe";
                i.classlist ? i.classlist.add(s) : i.setAttribute("class", s), i.style.width = "100%", i.style.display = "block", i.style.border = 0, i.style.height = 0, i.style.margin = 0, i.style.position = "absolute", i.style.left = 0, i.style.right = 0, i.style.top = 0, i.style.bottom = 0, t.insertBefore(i, t.firstChild), (i.contentWindow || i).onresize = function() {
                    e && e()
                }
            }, e.removeResizeListener = function(t) {
                var e = t.querySelector(".chartjs-hidden-iframe");
                e && e.parentNode.removeChild(e)
            }, e.isArray = function(t) {
                return Array.isArray ? Array.isArray(t) : "[object Array]" === Object.prototype.toString.call(t)
            }, e.pushAllIfDefined = function(t, i) {
                "undefined" != typeof t && (e.isArray(t) ? i.push.apply(i, t) : i.push(t))
            }, e.isDatasetVisible = function(t) {
                return !t.hidden
            }, e.callCallback = function(t, e, i) {
                t && "function" == typeof t.call && t.apply(i, e)
            }
        }
    }, {
        "chartjs-color": 1
    }],
    26: [function(t, e, i) {
        "use strict";
        e.exports = function() {
            var t = function(e, i) {
                this.config = i, e.length && e[0].getContext && (e = e[0]), e.getContext && (e = e.getContext("2d")), this.ctx = e, this.canvas = e.canvas, this.width = e.canvas.width || parseInt(t.helpers.getStyle(e.canvas, "width")) || t.helpers.getMaximumWidth(e.canvas), this.height = e.canvas.height || parseInt(t.helpers.getStyle(e.canvas, "height")) || t.helpers.getMaximumHeight(e.canvas), this.aspectRatio = this.width / this.height, (isNaN(this.aspectRatio) || isFinite(this.aspectRatio) === !1) && (this.aspectRatio = void 0 !== i.aspectRatio ? i.aspectRatio : 2), this.originalCanvasStyleWidth = e.canvas.style.width, this.originalCanvasStyleHeight = e.canvas.style.height, t.helpers.retinaScale(this), i && (this.controller = new t.Controller(this));
                var s = this;
                return t.helpers.addResizeListener(e.canvas.parentNode, function() {
                    s.controller && s.controller.config.options.responsive && s.controller.resize()
                }), this.controller ? this.controller : this
            };
            return t.defaults = {
                global: {
                    responsive: !0,
                    responsiveAnimationDuration: 0,
                    maintainAspectRatio: !0,
                    events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
                    hover: {
                        onHover: null,
                        mode: "single",
                        animationDuration: 400
                    },
                    onClick: null,
                    defaultColor: "rgba(0,0,0,0.1)",
                    defaultFontColor: "#666",
                    defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                    defaultFontSize: 12,
                    defaultFontStyle: "normal",
                    showLines: !0,
                    elements: {},
                    legendCallback: function(t) {
                        var e = [];
                        e.push('<ul class="' + t.id + '-legend">');
                        for (var i = 0; i < t.data.datasets.length; i++) e.push('<li><span style="background-color:' + t.data.datasets[i].backgroundColor + '">'), t.data.datasets[i].label && e.push(t.data.datasets[i].label), e.push("</span></li>");
                        return e.push("</ul>"), e.join("")
                    }
                }
            }, t
        }
    }, {}],
    27: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = t.helpers;
            t.layoutService = {
                defaults: {},
                addBox: function(t, e) {
                    t.boxes || (t.boxes = []), t.boxes.push(e)
                },
                removeBox: function(t, e) {
                    t.boxes && t.boxes.splice(t.boxes.indexOf(e), 1)
                },
                update: function(t, i, s) {
                    function a(t) {
                        var e, i = t.isHorizontal();
                        i ? (e = t.update(t.options.fullWidth ? g : _, y), k -= e.height) : (e = t.update(x, v), _ -= e.width), D.push({
                            horizontal: i,
                            minSize: e,
                            box: t
                        })
                    }

                    function o(t) {
                        var i = e.findNextWhere(D, function(e) {
                            return e.box === t
                        });
                        if (i)
                            if (t.isHorizontal()) {
                                var s = {
                                    left: S,
                                    right: w,
                                    top: 0,
                                    bottom: 0
                                };
                                t.update(t.options.fullWidth ? g : _, p / 2, s)
                            } else t.update(i.minSize.width, k)
                    }

                    function n(t) {
                        var i = e.findNextWhere(D, function(e) {
                                return e.box === t
                            }),
                            s = {
                                left: 0,
                                right: 0,
                                top: C,
                                bottom: M
                            };
                        i && t.update(i.minSize.width, k, s)
                    }

                    function r(t) {
                        t.isHorizontal() ? (t.left = t.options.fullWidth ? l : S, t.right = t.options.fullWidth ? i - l : S + _, t.top = I, t.bottom = I + t.height, I = t.bottom) : (t.left = F, t.right = F + t.width, t.top = C, t.bottom = C + k, F = t.right)
                    }
                    if (t) {
                        var l = i > 30 ? 5 : 2,
                            h = s > 30 ? 5 : 2,
                            c = e.where(t.boxes, function(t) {
                                return "left" === t.options.position
                            }),
                            u = e.where(t.boxes, function(t) {
                                return "right" === t.options.position
                            }),
                            d = e.where(t.boxes, function(t) {
                                return "top" === t.options.position
                            }),
                            f = e.where(t.boxes, function(t) {
                                return "bottom" === t.options.position
                            }),
                            m = e.where(t.boxes, function(t) {
                                return "chartArea" === t.options.position
                            });
                        d.sort(function(t, e) {
                            return (e.options.fullWidth ? 1 : 0) - (t.options.fullWidth ? 1 : 0)
                        }), f.sort(function(t, e) {
                            return (t.options.fullWidth ? 1 : 0) - (e.options.fullWidth ? 1 : 0)
                        });
                        var g = i - 2 * l,
                            p = s - 2 * h,
                            b = g / 2,
                            v = p / 2,
                            x = (i - b) / (c.length + u.length),
                            y = (s - v) / (d.length + f.length),
                            _ = g,
                            k = p,
                            D = [];
                        e.each(c.concat(u, d, f), a);
                        var S = l,
                            w = l,
                            C = h,
                            M = h;
                        e.each(c.concat(u), o), e.each(c, function(t) {
                            S += t.width
                        }), e.each(u, function(t) {
                            w += t.width
                        }), e.each(d.concat(f), o), e.each(d, function(t) {
                            C += t.height
                        }), e.each(f, function(t) {
                            M += t.height
                        }), e.each(c.concat(u), n), S = l, w = l, C = h, M = h, e.each(c, function(t) {
                            S += t.width
                        }), e.each(u, function(t) {
                            w += t.width
                        }), e.each(d, function(t) {
                            C += t.height
                        }), e.each(f, function(t) {
                            M += t.height
                        });
                        var A = s - C - M,
                            T = i - S - w;
                        (T !== _ || A !== k) && (e.each(c, function(t) {
                            t.height = A
                        }), e.each(u, function(t) {
                            t.height = A
                        }), e.each(d, function(t) {
                            t.width = T
                        }), e.each(f, function(t) {
                            t.width = T
                        }), k = A, _ = T);
                        var F = l,
                            I = h;
                        e.each(c.concat(d), r), F += _, I += k, e.each(u, r), e.each(f, r), t.chartArea = {
                            left: S,
                            top: C,
                            right: S + _,
                            bottom: C + k
                        }, e.each(m, function(e) {
                            e.left = t.chartArea.left, e.top = t.chartArea.top, e.right = t.chartArea.right, e.bottom = t.chartArea.bottom, e.update(_, k)
                        })
                    }
                }
            }
        }
    }, {}],
    28: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = t.helpers;
            t.defaults.global.legend = {
                display: !0,
                position: "top",
                fullWidth: !0,
                reverse: !1,
                onClick: function(t, e) {
                    var i = this.chart.data.datasets[e.datasetIndex];
                    i.hidden = !i.hidden, this.chart.update()
                },
                labels: {
                    boxWidth: 40,
                    padding: 10,
                    generateLabels: function(t) {
                        return t.datasets.map(function(t, e) {
                            return {
                                text: t.label,
                                fillStyle: t.backgroundColor,
                                hidden: t.hidden,
                                lineCap: t.borderCapStyle,
                                lineDash: t.borderDash,
                                lineDashOffset: t.borderDashOffset,
                                lineJoin: t.borderJoinStyle,
                                lineWidth: t.borderWidth,
                                strokeStyle: t.borderColor,
                                datasetIndex: e
                            }
                        }, this)
                    }
                }
            }, t.Legend = t.Element.extend({
                initialize: function(t) {
                    e.extend(this, t), this.legendHitBoxes = [], this.doughnutMode = !1
                },
                beforeUpdate: e.noop,
                update: function(t, e, i) {
                    return this.beforeUpdate(), this.maxWidth = t, this.maxHeight = e, this.margins = i, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this.beforeBuildLabels(), this.buildLabels(), this.afterBuildLabels(), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate(), this.minSize
                },
                afterUpdate: e.noop,
                beforeSetDimensions: e.noop,
                setDimensions: function() {
                    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0, this.minSize = {
                        width: 0,
                        height: 0
                    }
                },
                afterSetDimensions: e.noop,
                beforeBuildLabels: e.noop,
                buildLabels: function() {
                    this.legendItems = this.options.labels.generateLabels.call(this, this.chart.data), this.options.reverse && this.legendItems.reverse()
                },
                afterBuildLabels: e.noop,
                beforeFit: e.noop,
                fit: function() {
                    var i = this.ctx,
                        s = e.getValueOrDefault(this.options.labels.fontSize, t.defaults.global.defaultFontSize),
                        a = e.getValueOrDefault(this.options.labels.fontStyle, t.defaults.global.defaultFontStyle),
                        o = e.getValueOrDefault(this.options.labels.fontFamily, t.defaults.global.defaultFontFamily),
                        n = e.fontString(s, a, o);
                    if (this.legendHitBoxes = [], this.isHorizontal() ? this.minSize.width = this.maxWidth : this.minSize.width = this.options.display ? 10 : 0, this.isHorizontal() ? this.minSize.height = this.options.display ? 10 : 0 : this.minSize.height = this.maxHeight, this.options.display && this.isHorizontal()) {
                        this.lineWidths = [0];
                        var r = this.legendItems.length ? s + this.options.labels.padding : 0;
                        i.textAlign = "left", i.textBaseline = "top", i.font = n, e.each(this.legendItems, function(t, e) {
                            var a = this.options.labels.boxWidth + s / 2 + i.measureText(t.text).width;
                            this.lineWidths[this.lineWidths.length - 1] + a + this.options.labels.padding >= this.width && (r += s + this.options.labels.padding, this.lineWidths[this.lineWidths.length] = this.left), this.legendHitBoxes[e] = {
                                left: 0,
                                top: 0,
                                width: a,
                                height: s
                            }, this.lineWidths[this.lineWidths.length - 1] += a + this.options.labels.padding
                        }, this), this.minSize.height += r
                    }
                    this.width = this.minSize.width, this.height = this.minSize.height
                },
                afterFit: e.noop,
                isHorizontal: function() {
                    return "top" === this.options.position || "bottom" === this.options.position
                },
                draw: function() {
                    if (this.options.display) {
                        var i = this.ctx,
                            s = {
                                x: this.left + (this.width - this.lineWidths[0]) / 2,
                                y: this.top + this.options.labels.padding,
                                line: 0
                            },
                            a = e.getValueOrDefault(this.options.labels.fontColor, t.defaults.global.defaultFontColor),
                            o = e.getValueOrDefault(this.options.labels.fontSize, t.defaults.global.defaultFontSize),
                            n = e.getValueOrDefault(this.options.labels.fontStyle, t.defaults.global.defaultFontStyle),
                            r = e.getValueOrDefault(this.options.labels.fontFamily, t.defaults.global.defaultFontFamily),
                            l = e.fontString(o, n, r);
                        this.isHorizontal() && (i.textAlign = "left", i.textBaseline = "top", i.lineWidth = .5, i.strokeStyle = a, i.fillStyle = a, i.font = l, e.each(this.legendItems, function(e, a) {
                            var n = i.measureText(e.text).width,
                                r = this.options.labels.boxWidth + o / 2 + n;
                            s.x + r >= this.width && (s.y += o + this.options.labels.padding, s.line++, s.x = this.left + (this.width - this.lineWidths[s.line]) / 2), i.save();
                            var l = function(t, e) {
                                return void 0 !== t ? t : e
                            };
                            i.fillStyle = l(e.fillStyle, t.defaults.global.defaultColor), i.lineCap = l(e.lineCap, t.defaults.global.elements.line.borderCapStyle), i.lineDashOffset = l(e.lineDashOffset, t.defaults.global.elements.line.borderDashOffset), i.lineJoin = l(e.lineJoin, t.defaults.global.elements.line.borderJoinStyle), i.lineWidth = l(e.lineWidth, t.defaults.global.elements.line.borderWidth), i.strokeStyle = l(e.strokeStyle, t.defaults.global.defaultColor), i.setLineDash && i.setLineDash(l(e.lineDash, t.defaults.global.elements.line.borderDash)), i.strokeRect(s.x, s.y, this.options.labels.boxWidth, o), i.fillRect(s.x, s.y, this.options.labels.boxWidth, o), i.restore(), this.legendHitBoxes[a].left = s.x, this.legendHitBoxes[a].top = s.y, i.fillText(e.text, this.options.labels.boxWidth + o / 2 + s.x, s.y), e.hidden && (i.beginPath(), i.lineWidth = 2, i.moveTo(this.options.labels.boxWidth + o / 2 + s.x, s.y + o / 2), i.lineTo(this.options.labels.boxWidth + o / 2 + s.x + n, s.y + o / 2), i.stroke()), s.x += r + this.options.labels.padding
                        }, this))
                    }
                },
                handleEvent: function(t) {
                    var i = e.getRelativePosition(t, this.chart.chart);
                    if (i.x >= this.left && i.x <= this.right && i.y >= this.top && i.y <= this.bottom)
                        for (var s = 0; s < this.legendHitBoxes.length; ++s) {
                            var a = this.legendHitBoxes[s];
                            if (i.x >= a.left && i.x <= a.left + a.width && i.y >= a.top && i.y <= a.top + a.height) {
                                this.options.onClick && this.options.onClick.call(this, t, this.legendItems[s]);
                                break
                            }
                        }
                }
            })
        }
    }, {}],
    29: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = t.helpers;
            t.defaults.scale = {
                display: !0,
                gridLines: {
                    display: !0,
                    color: "rgba(0, 0, 0, 0.1)",
                    lineWidth: 1,
                    drawOnChartArea: !0,
                    drawTicks: !0,
                    zeroLineWidth: 1,
                    zeroLineColor: "rgba(0,0,0,0.25)",
                    offsetGridLines: !1
                },
                scaleLabel: {
                    labelString: "",
                    display: !1
                },
                ticks: {
                    beginAtZero: !1,
                    maxRotation: 90,
                    mirror: !1,
                    padding: 10,
                    reverse: !1,
                    display: !0,
                    autoSkip: !0,
                    autoSkipPadding: 20,
                    callback: function(t) {
                        return "" + t
                    }
                }
            }, t.Scale = t.Element.extend({
                beforeUpdate: function() {
                    e.callCallback(this.options.beforeUpdate, [this])
                },
                update: function(t, i, s) {
                    return this.beforeUpdate(), this.maxWidth = t, this.maxHeight = i, this.margins = e.extend({
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }, s), this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this.beforeBuildTicks(), this.buildTicks(), this.afterBuildTicks(), this.beforeTickToLabelConversion(), this.convertTicksToLabels(), this.afterTickToLabelConversion(), this.beforeCalculateTickRotation(), this.calculateTickRotation(), this.afterCalculateTickRotation(), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate(), this.minSize
                },
                afterUpdate: function() {
                    e.callCallback(this.options.afterUpdate, [this])
                },
                beforeSetDimensions: function() {
                    e.callCallback(this.options.beforeSetDimensions, [this])
                },
                setDimensions: function() {
                    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0
                },
                afterSetDimensions: function() {
                    e.callCallback(this.options.afterSetDimensions, [this])
                },
                beforeDataLimits: function() {
                    e.callCallback(this.options.beforeDataLimits, [this])
                },
                determineDataLimits: e.noop,
                afterDataLimits: function() {
                    e.callCallback(this.options.afterDataLimits, [this])
                },
                beforeBuildTicks: function() {
                    e.callCallback(this.options.beforeBuildTicks, [this])
                },
                buildTicks: e.noop,
                afterBuildTicks: function() {
                    e.callCallback(this.options.afterBuildTicks, [this])
                },
                beforeTickToLabelConversion: function() {
                    e.callCallback(this.options.beforeTickToLabelConversion, [this])
                },
                convertTicksToLabels: function() {
                    this.ticks = this.ticks.map(function(t, e, i) {
                        return this.options.ticks.userCallback ? this.options.ticks.userCallback(t, e, i) : this.options.ticks.callback(t, e, i)
                    }, this)
                },
                afterTickToLabelConversion: function() {
                    e.callCallback(this.options.afterTickToLabelConversion, [this])
                },
                beforeCalculateTickRotation: function() {
                    e.callCallback(this.options.beforeCalculateTickRotation, [this])
                },
                calculateTickRotation: function() {
                    var i = e.getValueOrDefault(this.options.ticks.fontSize, t.defaults.global.defaultFontSize),
                        s = e.getValueOrDefault(this.options.ticks.fontStyle, t.defaults.global.defaultFontStyle),
                        a = e.getValueOrDefault(this.options.ticks.fontFamily, t.defaults.global.defaultFontFamily),
                        o = e.fontString(i, s, a);
                    this.ctx.font = o;
                    var n, r = this.ctx.measureText(this.ticks[0]).width,
                        l = this.ctx.measureText(this.ticks[this.ticks.length - 1]).width;
                    if (this.labelRotation = 0, this.paddingRight = 0, this.paddingLeft = 0, this.options.display && this.isHorizontal()) {
                        this.paddingRight = l / 2 + 3, this.paddingLeft = r / 2 + 3, this.longestTextCache || (this.longestTextCache = {});
                        for (var h, c, u = e.longestText(this.ctx, o, this.ticks, this.longestTextCache), d = u, f = this.getPixelForTick(1) - this.getPixelForTick(0) - 6; d > f && this.labelRotation < this.options.ticks.maxRotation;) {
                            if (h = Math.cos(e.toRadians(this.labelRotation)), c = Math.sin(e.toRadians(this.labelRotation)), n = h * r, n + i / 2 > this.yLabelWidth && (this.paddingLeft = n + i / 2), this.paddingRight = i / 2, c * u > this.maxHeight) {
                                this.labelRotation--;
                                break
                            }
                            this.labelRotation++, d = h * u
                        }
                    }
                    this.margins && (this.paddingLeft = Math.max(this.paddingLeft - this.margins.left, 0), this.paddingRight = Math.max(this.paddingRight - this.margins.right, 0))
                },
                afterCalculateTickRotation: function() {
                    e.callCallback(this.options.afterCalculateTickRotation, [this])
                },
                beforeFit: function() {
                    e.callCallback(this.options.beforeFit, [this])
                },
                fit: function() {
                    this.minSize = {
                        width: 0,
                        height: 0
                    };
                    var i = e.getValueOrDefault(this.options.ticks.fontSize, t.defaults.global.defaultFontSize),
                        s = e.getValueOrDefault(this.options.ticks.fontStyle, t.defaults.global.defaultFontStyle),
                        a = e.getValueOrDefault(this.options.ticks.fontFamily, t.defaults.global.defaultFontFamily),
                        o = e.fontString(i, s, a),
                        n = e.getValueOrDefault(this.options.scaleLabel.fontSize, t.defaults.global.defaultFontSize),
                        r = e.getValueOrDefault(this.options.scaleLabel.fontStyle, t.defaults.global.defaultFontStyle),
                        l = e.getValueOrDefault(this.options.scaleLabel.fontFamily, t.defaults.global.defaultFontFamily);
                    e.fontString(n, r, l);
                    if (this.isHorizontal() ? this.minSize.width = this.isFullWidth() ? this.maxWidth - this.margins.left - this.margins.right : this.maxWidth : this.minSize.width = this.options.gridLines.display && this.options.display ? 10 : 0, this.isHorizontal() ? this.minSize.height = this.options.gridLines.display && this.options.display ? 10 : 0 : this.minSize.height = this.maxHeight, this.options.scaleLabel.display && (this.isHorizontal() ? this.minSize.height += 1.5 * n : this.minSize.width += 1.5 * n), this.options.ticks.display && this.options.display) {
                        this.longestTextCache || (this.longestTextCache = {});
                        var h = e.longestText(this.ctx, o, this.ticks, this.longestTextCache);
                        if (this.isHorizontal()) {
                            this.longestLabelWidth = h;
                            var c = Math.sin(e.toRadians(this.labelRotation)) * this.longestLabelWidth + 1.5 * i;
                            this.minSize.height = Math.min(this.maxHeight, this.minSize.height + c), this.ctx.font = o;
                            var u = this.ctx.measureText(this.ticks[0]).width,
                                d = this.ctx.measureText(this.ticks[this.ticks.length - 1]).width,
                                f = Math.cos(e.toRadians(this.labelRotation)),
                                m = Math.sin(e.toRadians(this.labelRotation));
                            this.paddingLeft = 0 !== this.labelRotation ? f * u + 3 : u / 2 + 3, this.paddingRight = 0 !== this.labelRotation ? m * (i / 2) + 3 : d / 2 + 3
                        } else {
                            var g = this.maxWidth - this.minSize.width;
                            this.options.ticks.mirror || (h += this.options.ticks.padding), g > h ? this.minSize.width += h : this.minSize.width = this.maxWidth, this.paddingTop = i / 2, this.paddingBottom = i / 2
                        }
                    }
                    this.margins && (this.paddingLeft = Math.max(this.paddingLeft - this.margins.left, 0), this.paddingTop = Math.max(this.paddingTop - this.margins.top, 0), this.paddingRight = Math.max(this.paddingRight - this.margins.right, 0), this.paddingBottom = Math.max(this.paddingBottom - this.margins.bottom, 0)), this.width = this.minSize.width, this.height = this.minSize.height
                },
                afterFit: function() {
                    e.callCallback(this.options.afterFit, [this])
                },
                isHorizontal: function() {
                    return "top" === this.options.position || "bottom" === this.options.position
                },
                isFullWidth: function() {
                    return this.options.fullWidth
                },
                getRightValue: function i(t) {
                    return null === t || "undefined" == typeof t ? NaN : "number" == typeof t && isNaN(t) ? NaN : "object" == typeof t ? t instanceof Date ? t : i(this.isHorizontal() ? t.x : t.y) : t
                },
                getLabelForIndex: e.noop,
                getPixelForValue: e.noop,
                getPixelForTick: function(t, e) {
                    if (this.isHorizontal()) {
                        var i = this.width - (this.paddingLeft + this.paddingRight),
                            s = i / Math.max(this.ticks.length - (this.options.gridLines.offsetGridLines ? 0 : 1), 1),
                            a = s * t + this.paddingLeft;
                        e && (a += s / 2);
                        var o = this.left + Math.round(a);
                        return o += this.isFullWidth() ? this.margins.left : 0
                    }
                    var n = this.height - (this.paddingTop + this.paddingBottom);
                    return this.top + t * (n / (this.ticks.length - 1))
                },
                getPixelForDecimal: function(t) {
                    if (this.isHorizontal()) {
                        var e = this.width - (this.paddingLeft + this.paddingRight),
                            i = e * t + this.paddingLeft,
                            s = this.left + Math.round(i);
                        return s += this.isFullWidth() ? this.margins.left : 0
                    }
                    return this.top + t * this.height
                },
                draw: function(i) {
                    if (this.options.display) {
                        var s, a, o, n, r, l = 0 !== this.labelRotation,
                            h = this.options.ticks.autoSkip;
                        this.options.ticks.maxTicksLimit && (r = this.options.ticks.maxTicksLimit);
                        var c = e.getValueOrDefault(this.options.ticks.fontColor, t.defaults.global.defaultFontColor),
                            u = e.getValueOrDefault(this.options.ticks.fontSize, t.defaults.global.defaultFontSize),
                            d = e.getValueOrDefault(this.options.ticks.fontStyle, t.defaults.global.defaultFontStyle),
                            f = e.getValueOrDefault(this.options.ticks.fontFamily, t.defaults.global.defaultFontFamily),
                            m = e.fontString(u, d, f),
                            g = e.getValueOrDefault(this.options.scaleLabel.fontColor, t.defaults.global.defaultFontColor),
                            p = e.getValueOrDefault(this.options.scaleLabel.fontSize, t.defaults.global.defaultFontSize),
                            b = e.getValueOrDefault(this.options.scaleLabel.fontStyle, t.defaults.global.defaultFontStyle),
                            v = e.getValueOrDefault(this.options.scaleLabel.fontFamily, t.defaults.global.defaultFontFamily),
                            x = e.fontString(p, b, v),
                            y = Math.cos(e.toRadians(this.labelRotation)),
                            _ = (Math.sin(e.toRadians(this.labelRotation)), this.longestLabelWidth * y);
                        if (this.ctx.fillStyle = c, this.isHorizontal()) {
                            s = !0;
                            var k = "bottom" === this.options.position ? this.top : this.bottom - 10,
                                D = "bottom" === this.options.position ? this.top + 10 : this.bottom;
                            if (a = !1, (_ / 2 + this.options.ticks.autoSkipPadding) * this.ticks.length > this.width - (this.paddingLeft + this.paddingRight) && (a = 1 + Math.floor((_ / 2 + this.options.ticks.autoSkipPadding) * this.ticks.length / (this.width - (this.paddingLeft + this.paddingRight)))), r && this.ticks.length > r)
                                for (; !a || this.ticks.length / (a || 1) > r;) a || (a = 1), a += 1;
                            h || (a = !1), e.each(this.ticks, function(t, o) {
                                var n = this.ticks.length === o + 1,
                                    r = a > 1 && o % a > 0 || o % a === 0 && o + a > this.ticks.length;
                                if ((!r || n) && void 0 !== t && null !== t) {
                                    var h = this.getPixelForTick(o),
                                        c = this.getPixelForTick(o, this.options.gridLines.offsetGridLines);
                                    this.options.gridLines.display && (o === ("undefined" != typeof this.zeroLineIndex ? this.zeroLineIndex : 0) ? (this.ctx.lineWidth = this.options.gridLines.zeroLineWidth, this.ctx.strokeStyle = this.options.gridLines.zeroLineColor, s = !0) : s && (this.ctx.lineWidth = this.options.gridLines.lineWidth, this.ctx.strokeStyle = this.options.gridLines.color, s = !1), h += e.aliasPixel(this.ctx.lineWidth), this.ctx.beginPath(), this.options.gridLines.drawTicks && (this.ctx.moveTo(h, k), this.ctx.lineTo(h, D)), this.options.gridLines.drawOnChartArea && (this.ctx.moveTo(h, i.top), this.ctx.lineTo(h, i.bottom)), this.ctx.stroke()), this.options.ticks.display && (this.ctx.save(), this.ctx.translate(c, l ? this.top + 12 : "top" === this.options.position ? this.bottom - 10 : this.top + 10), this.ctx.rotate(-1 * e.toRadians(this.labelRotation)), this.ctx.font = m, this.ctx.textAlign = l ? "right" : "center", this.ctx.textBaseline = l ? "middle" : "top" === this.options.position ? "bottom" : "top", this.ctx.fillText(t, 0, 0), this.ctx.restore())
                                }
                            }, this), this.options.scaleLabel.display && (this.ctx.textAlign = "center", this.ctx.textBaseline = "middle", this.ctx.fillStyle = g, this.ctx.font = x, o = this.left + (this.right - this.left) / 2, n = "bottom" === this.options.position ? this.bottom - p / 2 : this.top + p / 2, this.ctx.fillText(this.options.scaleLabel.labelString, o, n))
                        } else {
                            s = !0;
                            var S = "right" === this.options.position ? this.left : this.right - 5,
                                w = "right" === this.options.position ? this.left + 5 : this.right;
                            if (e.each(this.ticks, function(t, a) {
                                    if (void 0 !== t && null !== t) {
                                        var o = this.getPixelForTick(a);
                                        if (this.options.gridLines.display && (a === ("undefined" != typeof this.zeroLineIndex ? this.zeroLineIndex : 0) ? (this.ctx.lineWidth = this.options.gridLines.zeroLineWidth, this.ctx.strokeStyle = this.options.gridLines.zeroLineColor, s = !0) : s && (this.ctx.lineWidth = this.options.gridLines.lineWidth, this.ctx.strokeStyle = this.options.gridLines.color, s = !1), o += e.aliasPixel(this.ctx.lineWidth), this.ctx.beginPath(), this.options.gridLines.drawTicks && (this.ctx.moveTo(S, o), this.ctx.lineTo(w, o)), this.options.gridLines.drawOnChartArea && (this.ctx.moveTo(i.left, o), this.ctx.lineTo(i.right, o)), this.ctx.stroke()), this.options.ticks.display) {
                                            var n, r = this.getPixelForTick(a, this.options.gridLines.offsetGridLines);
                                            this.ctx.save(), "left" === this.options.position ? this.options.ticks.mirror ? (n = this.right + this.options.ticks.padding, this.ctx.textAlign = "left") : (n = this.right - this.options.ticks.padding, this.ctx.textAlign = "right") : this.options.ticks.mirror ? (n = this.left - this.options.ticks.padding, this.ctx.textAlign = "right") : (n = this.left + this.options.ticks.padding, this.ctx.textAlign = "left"), this.ctx.translate(n, r), this.ctx.rotate(-1 * e.toRadians(this.labelRotation)), this.ctx.font = m, this.ctx.textBaseline = "middle", this.ctx.fillText(t, 0, 0), this.ctx.restore()
                                        }
                                    }
                                }, this), this.options.scaleLabel.display) {
                                o = "left" === this.options.position ? this.left + p / 2 : this.right - p / 2, n = this.top + (this.bottom - this.top) / 2;
                                var C = "left" === this.options.position ? -.5 * Math.PI : .5 * Math.PI;
                                this.ctx.save(), this.ctx.translate(o, n), this.ctx.rotate(C), this.ctx.textAlign = "center", this.ctx.fillStyle = g, this.ctx.font = x, this.ctx.textBaseline = "middle", this.ctx.fillText(this.options.scaleLabel.labelString, 0, 0), this.ctx.restore()
                            }
                        }
                        this.ctx.lineWidth = this.options.gridLines.lineWidth, this.ctx.strokeStyle = this.options.gridLines.color;
                        var M = this.left,
                            A = this.right,
                            T = this.top,
                            F = this.bottom;
                        this.isHorizontal() ? (T = F = "top" === this.options.position ? this.bottom : this.top, T += e.aliasPixel(this.ctx.lineWidth), F += e.aliasPixel(this.ctx.lineWidth)) : (M = A = "left" === this.options.position ? this.right : this.left, M += e.aliasPixel(this.ctx.lineWidth), A += e.aliasPixel(this.ctx.lineWidth)), this.ctx.beginPath(), this.ctx.moveTo(M, T), this.ctx.lineTo(A, F), this.ctx.stroke()
                    }
                }
            })
        }
    }, {}],
    30: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = t.helpers;
            t.scaleService = {
                constructors: {},
                defaults: {},
                registerScaleType: function(t, i, s) {
                    this.constructors[t] = i, this.defaults[t] = e.clone(s)
                },
                getScaleConstructor: function(t) {
                    return this.constructors.hasOwnProperty(t) ? this.constructors[t] : void 0
                },
                getScaleDefaults: function(i) {
                    return this.defaults.hasOwnProperty(i) ? e.scaleMerge(t.defaults.scale, this.defaults[i]) : {}
                },
                addScalesToLayout: function(i) {
                    e.each(i.scales, function(e) {
                        t.layoutService.addBox(i, e)
                    })
                }
            }
        }
    }, {}],
    31: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = t.helpers;
            t.defaults.global.title = {
                display: !1,
                position: "top",
                fullWidth: !0,
                fontStyle: "bold",
                padding: 10,
                text: ""
            }, t.Title = t.Element.extend({
                initialize: function(i) {
                    e.extend(this, i), this.options = e.configMerge(t.defaults.global.title, i.options), this.legendHitBoxes = []
                },
                beforeUpdate: e.noop,
                update: function(t, e, i) {
                    return this.beforeUpdate(), this.maxWidth = t, this.maxHeight = e, this.margins = i, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this.beforeBuildLabels(), this.buildLabels(), this.afterBuildLabels(), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate(), this.minSize
                },
                afterUpdate: e.noop,
                beforeSetDimensions: e.noop,
                setDimensions: function() {
                    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0, this.minSize = {
                        width: 0,
                        height: 0
                    }
                },
                afterSetDimensions: e.noop,
                beforeBuildLabels: e.noop,
                buildLabels: e.noop,
                afterBuildLabels: e.noop,
                beforeFit: e.noop,
                fit: function() {
                    var i = (this.ctx, e.getValueOrDefault(this.options.fontSize, t.defaults.global.defaultFontSize)),
                        s = e.getValueOrDefault(this.options.fontStyle, t.defaults.global.defaultFontStyle),
                        a = e.getValueOrDefault(this.options.fontFamily, t.defaults.global.defaultFontFamily);
                    e.fontString(i, s, a);
                    this.isHorizontal() ? this.minSize.width = this.maxWidth : this.minSize.width = 0, this.isHorizontal() ? this.minSize.height = 0 : this.minSize.height = this.maxHeight, this.isHorizontal() ? this.options.display && (this.minSize.height += i + 2 * this.options.padding) : this.options.display && (this.minSize.width += i + 2 * this.options.padding), this.width = this.minSize.width, this.height = this.minSize.height
                },
                afterFit: e.noop,
                isHorizontal: function() {
                    return "top" === this.options.position || "bottom" === this.options.position
                },
                draw: function() {
                    if (this.options.display) {
                        var i, s, a = this.ctx,
                            o = e.getValueOrDefault(this.options.fontColor, t.defaults.global.defaultFontColor),
                            n = e.getValueOrDefault(this.options.fontSize, t.defaults.global.defaultFontSize),
                            r = e.getValueOrDefault(this.options.fontStyle, t.defaults.global.defaultFontStyle),
                            l = e.getValueOrDefault(this.options.fontFamily, t.defaults.global.defaultFontFamily),
                            h = e.fontString(n, r, l);
                        if (a.fillStyle = o, a.font = h, this.isHorizontal()) a.textAlign = "center", a.textBaseline = "middle", i = this.left + (this.right - this.left) / 2, s = this.top + (this.bottom - this.top) / 2, a.fillText(this.options.text, i, s);
                        else {
                            i = "left" === this.options.position ? this.left + n / 2 : this.right - n / 2, s = this.top + (this.bottom - this.top) / 2;
                            var c = "left" === this.options.position ? -.5 * Math.PI : .5 * Math.PI;
                            a.save(), a.translate(i, s), a.rotate(c), a.textAlign = "center", a.textBaseline = "middle", a.fillText(this.options.text, 0, 0), a.restore()
                        }
                    }
                }
            })
        }
    }, {}],
    32: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            function e(t, e) {
                return e && (i.isArray(e) ? t = t.concat(e) : t.push(e)), t
            }
            var i = t.helpers;
            t.defaults.global.tooltips = {
                enabled: !0,
                custom: null,
                mode: "single",
                backgroundColor: "rgba(0,0,0,0.8)",
                titleFontStyle: "bold",
                titleSpacing: 2,
                titleMarginBottom: 6,
                titleColor: "#fff",
                titleAlign: "left",
                bodySpacing: 2,
                bodyColor: "#fff",
                bodyAlign: "left",
                footerFontStyle: "bold",
                footerSpacing: 2,
                footerMarginTop: 6,
                footerColor: "#fff",
                footerAlign: "left",
                yPadding: 6,
                xPadding: 6,
                caretSize: 5,
                cornerRadius: 6,
                multiKeyBackground: "#fff",
                callbacks: {
                    beforeTitle: i.noop,
                    title: function(t, e) {
                        var i = "";
                        return t.length > 0 && (t[0].xLabel ? i = t[0].xLabel : e.labels.length > 0 && t[0].index < e.labels.length && (i = e.labels[t[0].index])), i
                    },
                    afterTitle: i.noop,
                    beforeBody: i.noop,
                    beforeLabel: i.noop,
                    label: function(t, e) {
                        var i = e.datasets[t.datasetIndex].label || "";
                        return i + ": " + t.yLabel
                    },
                    afterLabel: i.noop,
                    afterBody: i.noop,
                    beforeFooter: i.noop,
                    footer: i.noop,
                    afterFooter: i.noop
                }
            }, t.Tooltip = t.Element.extend({
                initialize: function() {
                    var e = this._options;
                    i.extend(this, {
                        _model: {
                            xPadding: e.tooltips.xPadding,
                            yPadding: e.tooltips.yPadding,
                            bodyColor: e.tooltips.bodyColor,
                            _bodyFontFamily: i.getValueOrDefault(e.tooltips.bodyFontFamily, t.defaults.global.defaultFontFamily),
                            _bodyFontStyle: i.getValueOrDefault(e.tooltips.bodyFontStyle, t.defaults.global.defaultFontStyle),
                            _bodyAlign: e.tooltips.bodyAlign,
                            bodyFontSize: i.getValueOrDefault(e.tooltips.bodyFontSize, t.defaults.global.defaultFontSize),
                            bodySpacing: e.tooltips.bodySpacing,
                            titleColor: e.tooltips.titleColor,
                            _titleFontFamily: i.getValueOrDefault(e.tooltips.titleFontFamily, t.defaults.global.defaultFontFamily),
                            _titleFontStyle: i.getValueOrDefault(e.tooltips.titleFontStyle, t.defaults.global.defaultFontStyle),
                            titleFontSize: i.getValueOrDefault(e.tooltips.titleFontSize, t.defaults.global.defaultFontSize),
                            _titleAlign: e.tooltips.titleAlign,
                            titleSpacing: e.tooltips.titleSpacing,
                            titleMarginBottom: e.tooltips.titleMarginBottom,
                            footerColor: e.tooltips.footerColor,
                            _footerFontFamily: i.getValueOrDefault(e.tooltips.footerFontFamily, t.defaults.global.defaultFontFamily),
                            _footerFontStyle: i.getValueOrDefault(e.tooltips.footerFontStyle, t.defaults.global.defaultFontStyle),
                            footerFontSize: i.getValueOrDefault(e.tooltips.footerFontSize, t.defaults.global.defaultFontSize),
                            _footerAlign: e.tooltips.footerAlign,
                            footerSpacing: e.tooltips.footerSpacing,
                            footerMarginTop: e.tooltips.footerMarginTop,
                            caretSize: e.tooltips.caretSize,
                            cornerRadius: e.tooltips.cornerRadius,
                            backgroundColor: e.tooltips.backgroundColor,
                            opacity: 0,
                            legendColorBackground: e.tooltips.multiKeyBackground
                        }
                    })
                },
                getTitle: function() {
                    var t = this._options.tooltips.callbacks.beforeTitle.apply(this, arguments),
                        i = this._options.tooltips.callbacks.title.apply(this, arguments),
                        s = this._options.tooltips.callbacks.afterTitle.apply(this, arguments),
                        a = [];
                    return a = e(a, t), a = e(a, i), a = e(a, s)
                },
                getBeforeBody: function() {
                    var t = this._options.tooltips.callbacks.beforeBody.apply(this, arguments);
                    return i.isArray(t) ? t : void 0 !== t ? [t] : []
                },
                getBody: function(t, e) {
                    var s = [];
                    return i.each(t, function(t) {
                        i.pushAllIfDefined(this._options.tooltips.callbacks.beforeLabel.call(this, t, e), s), i.pushAllIfDefined(this._options.tooltips.callbacks.label.call(this, t, e), s), i.pushAllIfDefined(this._options.tooltips.callbacks.afterLabel.call(this, t, e), s)
                    }, this), s
                },
                getAfterBody: function() {
                    var t = this._options.tooltips.callbacks.afterBody.apply(this, arguments);
                    return i.isArray(t) ? t : void 0 !== t ? [t] : []
                },
                getFooter: function() {
                    var t = this._options.tooltips.callbacks.beforeFooter.apply(this, arguments),
                        i = this._options.tooltips.callbacks.footer.apply(this, arguments),
                        s = this._options.tooltips.callbacks.afterFooter.apply(this, arguments),
                        a = [];
                    return a = e(a, t), a = e(a, i), a = e(a, s)
                },
                getAveragePosition: function(t) {
                    if (!t.length) return !1;
                    var e = [],
                        s = [];
                    i.each(t, function(t) {
                        if (t) {
                            var i = t.tooltipPosition();
                            e.push(i.x), s.push(i.y)
                        }
                    });
                    for (var a = 0, o = 0, n = 0; n < e.length; n++) a += e[n], o += s[n];
                    return {
                        x: Math.round(a / e.length),
                        y: Math.round(o / e.length)
                    }
                },
                update: function(t) {
                    if (this._active.length) {
                        this._model.opacity = 1;
                        var e, s = this._active[0],
                            a = [],
                            o = [];
                        if ("single" === this._options.tooltips.mode) {
                            var n = s._yScale || s._scale;
                            o.push({
                                xLabel: s._xScale ? s._xScale.getLabelForIndex(s._index, s._datasetIndex) : "",
                                yLabel: n ? n.getLabelForIndex(s._index, s._datasetIndex) : "",
                                index: s._index,
                                datasetIndex: s._datasetIndex
                            }), e = this.getAveragePosition(this._active)
                        } else i.each(this._data.datasets, function(t, e) {
                            if (i.isDatasetVisible(t)) {
                                var a = t.metaData[s._index];
                                if (a) {
                                    var n = s._yScale || s._scale;
                                    o.push({
                                        xLabel: a._xScale ? a._xScale.getLabelForIndex(a._index, a._datasetIndex) : "",
                                        yLabel: n ? n.getLabelForIndex(a._index, a._datasetIndex) : "",
                                        index: s._index,
                                        datasetIndex: e
                                    })
                                }
                            }
                        }, null, s._yScale.options.stacked), i.each(this._active, function(t) {
                            t && a.push({
                                borderColor: t._view.borderColor,
                                backgroundColor: t._view.backgroundColor
                            })
                        }, null, s._yScale.options.stacked), e = this.getAveragePosition(this._active), e.y = this._active[0]._yScale.getPixelForDecimal(.5);
                        i.extend(this._model, {
                            title: this.getTitle(o, this._data),
                            beforeBody: this.getBeforeBody(o, this._data),
                            body: this.getBody(o, this._data),
                            afterBody: this.getAfterBody(o, this._data),
                            footer: this.getFooter(o, this._data)
                        }), i.extend(this._model, {
                            x: Math.round(e.x),
                            y: Math.round(e.y),
                            caretPadding: i.getValueOrDefault(e.padding, 2),
                            labelColors: a
                        });
                        var r = this.getTooltipSize(this._model);
                        this.determineAlignment(r), i.extend(this._model, this.getBackgroundPoint(this._model, r))
                    } else this._model.opacity = 0;
                    return t && this._options.tooltips.custom && this._options.tooltips.custom.call(this, this._model), this
                },
                getTooltipSize: function(t) {
                    var e = this._chart.ctx,
                        s = {
                            height: 2 * t.yPadding,
                            width: 0
                        },
                        a = t.body.length + t.beforeBody.length + t.afterBody.length;
                    return s.height += t.title.length * t.titleFontSize, s.height += (t.title.length - 1) * t.titleSpacing, s.height += t.title.length ? t.titleMarginBottom : 0, s.height += a * t.bodyFontSize, s.height += a ? (a - 1) * t.bodySpacing : 0, s.height += t.footer.length ? t.footerMarginTop : 0, s.height += t.footer.length * t.footerFontSize, s.height += t.footer.length ? (t.footer.length - 1) * t.footerSpacing : 0, e.font = i.fontString(t.titleFontSize, t._titleFontStyle, t._titleFontFamily), i.each(t.title, function(t) {
                        s.width = Math.max(s.width, e.measureText(t).width)
                    }), e.font = i.fontString(t.bodyFontSize, t._bodyFontStyle, t._bodyFontFamily), i.each(t.beforeBody.concat(t.afterBody), function(t) {
                        s.width = Math.max(s.width, e.measureText(t).width)
                    }), i.each(t.body, function(i) {
                        s.width = Math.max(s.width, e.measureText(i).width + ("single" !== this._options.tooltips.mode ? t.bodyFontSize + 2 : 0))
                    }, this), e.font = i.fontString(t.footerFontSize, t._footerFontStyle, t._footerFontFamily), i.each(t.footer, function(t) {
                        s.width = Math.max(s.width, e.measureText(t).width)
                    }), s.width += 2 * t.xPadding, s
                },
                determineAlignment: function(t) {
                    this._model.xAlign = this._model.yAlign = "center", this._model.y < t.height ? this._model.yAlign = "top" : this._model.y > this._chart.height - t.height && (this._model.yAlign = "bottom");
                    var e, i, s, a, o, n = this,
                        r = (this._chartInstance.chartArea.left + this._chartInstance.chartArea.right) / 2,
                        l = (this._chartInstance.chartArea.top + this._chartInstance.chartArea.bottom) / 2;
                    "center" === this._model.yAlign ? (e = function(t) {
                        return r >= t
                    }, i = function(t) {
                        return t > r
                    }) : (e = function(e) {
                        return e <= t.width / 2
                    }, i = function(e) {
                        return e >= n._chart.width - t.width / 2
                    }), s = function(e) {
                        return e + t.width > n._chart.width
                    }, a = function(e) {
                        return e - t.width < 0
                    }, o = function(t) {
                        return l >= t ? "top" : "bottom"
                    }, e(this._model.x) ? (this._model.xAlign = "left", s(this._model.x) && (this._model.xAlign = "center", this._model.yAlign = o(this._model.y))) : i(this._model.x) && (this._model.xAlign = "right", a(this._model.x) && (this._model.xAlign = "center", this._model.yAlign = o(this._model.y)))
                },
                getBackgroundPoint: function(t, e) {
                    var i = {
                        x: t.x,
                        y: t.y
                    };
                    return "right" === t.xAlign ? i.x -= e.width : "center" === t.xAlign && (i.x -= e.width / 2), "top" === t.yAlign ? i.y += t.caretPadding + t.caretSize : "bottom" === t.yAlign ? i.y -= e.height + t.caretPadding + t.caretSize : i.y -= e.height / 2, "center" === t.yAlign ? "left" === t.xAlign ? i.x += t.caretPadding + t.caretSize : "right" === t.xAlign && (i.x -= t.caretPadding + t.caretSize) : "left" === t.xAlign ? i.x -= t.cornerRadius + t.caretPadding : "right" === t.xAlign && (i.x += t.cornerRadius + t.caretPadding), i
                },
                drawCaret: function(t, e, s, a) {
                    var o, n, r, l, h, c, u = this._view,
                        d = this._chart.ctx;
                    "center" === u.yAlign ? ("left" === u.xAlign ? (o = t.x, n = o - u.caretSize, r = o) : (o = t.x + e.width, n = o + u.caretSize, r = o), h = t.y + e.height / 2, l = h - u.caretSize, c = h + u.caretSize) : ("left" === u.xAlign ? (o = t.x + u.cornerRadius, n = o + u.caretSize, r = n + u.caretSize) : "right" === u.xAlign ? (o = t.x + e.width - u.cornerRadius, n = o - u.caretSize, r = n - u.caretSize) : (n = t.x + e.width / 2, o = n - u.caretSize, r = n + u.caretSize), "top" === u.yAlign ? (l = t.y, h = l - u.caretSize, c = l) : (l = t.y + e.height, h = l + u.caretSize, c = l));
                    var f = i.color(u.backgroundColor);
                    d.fillStyle = f.alpha(s * f.alpha()).rgbString(), d.beginPath(), d.moveTo(o, l), d.lineTo(n, h), d.lineTo(r, c), d.closePath(), d.fill()
                },
                drawTitle: function(t, e, s, a) {
                    if (e.title.length) {
                        s.textAlign = e._titleAlign, s.textBaseline = "top";
                        var o = i.color(e.titleColor);
                        s.fillStyle = o.alpha(a * o.alpha()).rgbString(), s.font = i.fontString(e.titleFontSize, e._titleFontStyle, e._titleFontFamily), i.each(e.title, function(i, a) {
                            s.fillText(i, t.x, t.y), t.y += e.titleFontSize + e.titleSpacing, a + 1 === e.title.length && (t.y += e.titleMarginBottom - e.titleSpacing)
                        })
                    }
                },
                drawBody: function(t, e, s, a) {
                    s.textAlign = e._bodyAlign, s.textBaseline = "top";
                    var o = i.color(e.bodyColor);
                    s.fillStyle = o.alpha(a * o.alpha()).rgbString(), s.font = i.fontString(e.bodyFontSize, e._bodyFontStyle, e._bodyFontFamily), i.each(e.beforeBody, function(i) {
                        s.fillText(i, t.x, t.y), t.y += e.bodyFontSize + e.bodySpacing
                    }), i.each(e.body, function(o, n) {
                        "single" !== this._options.tooltips.mode && (s.fillStyle = i.color(e.legendColorBackground).alpha(a).rgbaString(), s.fillRect(t.x, t.y, e.bodyFontSize, e.bodyFontSize), s.strokeStyle = i.color(e.labelColors[n].borderColor).alpha(a).rgbaString(), s.strokeRect(t.x, t.y, e.bodyFontSize, e.bodyFontSize), s.fillStyle = i.color(e.labelColors[n].backgroundColor).alpha(a).rgbaString(), s.fillRect(t.x + 1, t.y + 1, e.bodyFontSize - 2, e.bodyFontSize - 2), s.fillStyle = i.color(e.bodyColor).alpha(a).rgbaString()), s.fillText(o, t.x + ("single" !== this._options.tooltips.mode ? e.bodyFontSize + 2 : 0), t.y), t.y += e.bodyFontSize + e.bodySpacing
                    }, this), i.each(e.afterBody, function(i) {
                        s.fillText(i, t.x, t.y), t.y += e.bodyFontSize
                    }), t.y -= e.bodySpacing
                },
                drawFooter: function(t, e, s, a) {
                    if (e.footer.length) {
                        t.y += e.footerMarginTop, s.textAlign = e._footerAlign, s.textBaseline = "top";
                        var o = i.color(e.footerColor);
                        s.fillStyle = o.alpha(a * o.alpha()).rgbString(), s.font = i.fontString(e.footerFontSize, e._footerFontStyle, e._footerFontFamily), i.each(e.footer, function(i) {
                            s.fillText(i, t.x, t.y), t.y += e.footerFontSize + e.footerSpacing
                        })
                    }
                },
                draw: function() {
                    var t = this._chart.ctx,
                        e = this._view;
                    if (0 !== e.opacity) {
                        var s = e.caretPadding,
                            a = this.getTooltipSize(e),
                            o = {
                                x: e.x,
                                y: e.y
                            },
                            n = Math.abs(e.opacity < .001) ? 0 : e.opacity;
                        if (this._options.tooltips.enabled) {
                            var r = i.color(e.backgroundColor);
                            t.fillStyle = r.alpha(n * r.alpha()).rgbString(), i.drawRoundedRectangle(t, o.x, o.y, a.width, a.height, e.cornerRadius), t.fill(), this.drawCaret(o, a, n, s), o.x += e.xPadding, o.y += e.yPadding, this.drawTitle(o, e, t, n), this.drawBody(o, e, t, n), this.drawFooter(o, e, t, n)
                        }
                    }
                }
            })
        }
    }, {}],
    33: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e) {
            var i = t.helpers;
            t.defaults.global.elements.arc = {
                backgroundColor: t.defaults.global.defaultColor,
                borderColor: "#fff",
                borderWidth: 2
            }, t.elements.Arc = t.Element.extend({
                inLabelRange: function(t) {
                    var e = this._view;
                    return e ? Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hoverRadius, 2) : !1
                },
                inRange: function(t, e) {
                    var s = this._view;
                    if (s) {
                        var a = i.getAngleFromPoint(s, {
                                x: t,
                                y: e
                            }),
                            o = s.startAngle < -.5 * Math.PI ? s.startAngle + 2 * Math.PI : s.startAngle > 1.5 * Math.PI ? s.startAngle - 2 * Math.PI : s.startAngle,
                            n = s.endAngle < -.5 * Math.PI ? s.endAngle + 2 * Math.PI : s.endAngle > 1.5 * Math.PI ? s.endAngle - 2 * Math.PI : s.endAngle,
                            r = a.angle >= o && a.angle <= n,
                            l = a.distance >= s.innerRadius && a.distance <= s.outerRadius;
                        return r && l
                    }
                    return !1
                },
                tooltipPosition: function() {
                    var t = this._view,
                        e = t.startAngle + (t.endAngle - t.startAngle) / 2,
                        i = (t.outerRadius - t.innerRadius) / 2 + t.innerRadius;
                    return {
                        x: t.x + Math.cos(e) * i,
                        y: t.y + Math.sin(e) * i
                    }
                },
                draw: function() {
                    var t = this._chart.ctx,
                        e = this._view;
                    t.beginPath(), t.arc(e.x, e.y, e.outerRadius, e.startAngle, e.endAngle), t.arc(e.x, e.y, e.innerRadius, e.endAngle, e.startAngle, !0), t.closePath(), t.strokeStyle = e.borderColor, t.lineWidth = e.borderWidth, t.fillStyle = e.backgroundColor, t.fill(), t.lineJoin = "bevel", e.borderWidth && t.stroke()
                }
            })
        }
    }, {}],
    34: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = t.helpers;
            t.defaults.global.elements.line = {
                tension: .4,
                backgroundColor: t.defaults.global.defaultColor,
                borderWidth: 3,
                borderColor: t.defaults.global.defaultColor,
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0,
                borderJoinStyle: "miter",
                fill: !0
            }, t.elements.Line = t.Element.extend({
                lineToNextPoint: function(t, e, i, s, a) {
                    var o = this._chart.ctx;
                    e._view.skip ? s.call(this, t, e, i) : t._view.skip ? a.call(this, t, e, i) : 0 === e._view.tension ? o.lineTo(e._view.x, e._view.y) : o.bezierCurveTo(t._view.controlPointNextX, t._view.controlPointNextY, e._view.controlPointPreviousX, e._view.controlPointPreviousY, e._view.x, e._view.y)
                },
                draw: function() {
                    function i(t) {
                        n._view.skip || r._view.skip ? t && o.lineTo(s._view.scaleZero.x, s._view.scaleZero.y) : o.bezierCurveTo(r._view.controlPointNextX, r._view.controlPointNextY, n._view.controlPointPreviousX, n._view.controlPointPreviousY, n._view.x, n._view.y)
                    }
                    var s = this,
                        a = this._view,
                        o = this._chart.ctx,
                        n = this._children[0],
                        r = this._children[this._children.length - 1];
                    o.save(), this._children.length > 0 && a.fill && (o.beginPath(), e.each(this._children, function(t, i) {
                        var s = e.previousItem(this._children, i),
                            n = e.nextItem(this._children, i);
                        0 === i ? (this._loop ? o.moveTo(a.scaleZero.x, a.scaleZero.y) : o.moveTo(t._view.x, a.scaleZero), t._view.skip ? this._loop || o.moveTo(n._view.x, this._view.scaleZero) : o.lineTo(t._view.x, t._view.y)) : this.lineToNextPoint(s, t, n, function(t, e, i) {
                            this._loop ? o.lineTo(this._view.scaleZero.x, this._view.scaleZero.y) : (o.lineTo(t._view.x, this._view.scaleZero), o.moveTo(i._view.x, this._view.scaleZero))
                        }, function(t, e) {
                            o.lineTo(e._view.x, e._view.y)
                        })
                    }, this), this._loop ? i(!0) : (o.lineTo(this._children[this._children.length - 1]._view.x, a.scaleZero), o.lineTo(this._children[0]._view.x, a.scaleZero)), o.fillStyle = a.backgroundColor || t.defaults.global.defaultColor, o.closePath(), o.fill()), o.lineCap = a.borderCapStyle || t.defaults.global.elements.line.borderCapStyle, o.setLineDash && o.setLineDash(a.borderDash || t.defaults.global.elements.line.borderDash), o.lineDashOffset = a.borderDashOffset || t.defaults.global.elements.line.borderDashOffset, o.lineJoin = a.borderJoinStyle || t.defaults.global.elements.line.borderJoinStyle, o.lineWidth = a.borderWidth || t.defaults.global.elements.line.borderWidth, o.strokeStyle = a.borderColor || t.defaults.global.defaultColor, o.beginPath(), e.each(this._children, function(t, i) {
                        var s = e.previousItem(this._children, i),
                            a = e.nextItem(this._children, i);
                        0 === i ? o.moveTo(t._view.x, t._view.y) : this.lineToNextPoint(s, t, a, function(t, e, i) {
                            o.moveTo(i._view.x, i._view.y)
                        }, function(t, e) {
                            o.moveTo(e._view.x, e._view.y)
                        })
                    }, this), this._loop && this._children.length > 0 && i(), o.stroke(), o.restore()
                }
            })
        }
    }, {}],
    35: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = t.helpers;
            t.defaults.global.elements.point = {
                radius: 3,
                pointStyle: "circle",
                backgroundColor: t.defaults.global.defaultColor,
                borderWidth: 1,
                borderColor: t.defaults.global.defaultColor,
                hitRadius: 1,
                hoverRadius: 4,
                hoverBorderWidth: 1
            }, t.elements.Point = t.Element.extend({
                inRange: function(t, e) {
                    var i = this._view;
                    if (i) {
                        var s = i.hitRadius + i.radius;
                        return Math.pow(t - i.x, 2) + Math.pow(e - i.y, 2) < Math.pow(s, 2)
                    }
                    return !1
                },
                inLabelRange: function(t) {
                    var e = this._view;
                    return e ? Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hitRadius, 2) : !1
                },
                tooltipPosition: function() {
                    var t = this._view;
                    return {
                        x: t.x,
                        y: t.y,
                        padding: t.radius + t.borderWidth
                    }
                },
                draw: function() {
                    var i = this._view,
                        s = this._chart.ctx;
                    if (!i.skip) {
                        if ("object" == typeof i.pointStyle && ("[object HTMLImageElement]" === i.pointStyle.toString() || "[object HTMLCanvasElement]" === i.pointStyle.toString())) return void s.drawImage(i.pointStyle, i.x - i.pointStyle.width / 2, i.y - i.pointStyle.height / 2);
                        if (!isNaN(i.radius) && i.radius > 0) {
                            s.strokeStyle = i.borderColor || t.defaults.global.defaultColor, s.lineWidth = e.getValueOrDefault(i.borderWidth, t.defaults.global.elements.point.borderWidth), s.fillStyle = i.backgroundColor || t.defaults.global.defaultColor;
                            var a, o, n = i.radius;
                            switch (i.pointStyle) {
                                default: s.beginPath(),
                                s.arc(i.x, i.y, n, 0, 2 * Math.PI),
                                s.closePath(),
                                s.fill();
                                break;
                                case "triangle":
                                        s.beginPath();
                                    var r = 3 * n / Math.sqrt(3),
                                        l = r * Math.sqrt(3) / 2;s.moveTo(i.x - r / 2, i.y + l / 3),
                                    s.lineTo(i.x + r / 2, i.y + l / 3),
                                    s.lineTo(i.x, i.y - 2 * l / 3),
                                    s.closePath(),
                                    s.fill();
                                    break;
                                case "rect":
                                        s.fillRect(i.x - 1 / Math.SQRT2 * n, i.y - 1 / Math.SQRT2 * n, 2 / Math.SQRT2 * n, 2 / Math.SQRT2 * n),
                                    s.strokeRect(i.x - 1 / Math.SQRT2 * n, i.y - 1 / Math.SQRT2 * n, 2 / Math.SQRT2 * n, 2 / Math.SQRT2 * n);
                                    break;
                                case "rectRot":
                                        s.translate(i.x, i.y),
                                    s.rotate(Math.PI / 4),
                                    s.fillRect(-1 / Math.SQRT2 * n, -1 / Math.SQRT2 * n, 2 / Math.SQRT2 * n, 2 / Math.SQRT2 * n),
                                    s.strokeRect(-1 / Math.SQRT2 * n, -1 / Math.SQRT2 * n, 2 / Math.SQRT2 * n, 2 / Math.SQRT2 * n),
                                    s.setTransform(1, 0, 0, 1, 0, 0);
                                    break;
                                case "cross":
                                        s.beginPath(),
                                    s.moveTo(i.x, i.y + n),
                                    s.lineTo(i.x, i.y - n),
                                    s.moveTo(i.x - n, i.y),
                                    s.lineTo(i.x + n, i.y),
                                    s.closePath();
                                    break;
                                case "crossRot":
                                        s.beginPath(),
                                    a = Math.cos(Math.PI / 4) * n,
                                    o = Math.sin(Math.PI / 4) * n,
                                    s.moveTo(i.x - a, i.y - o),
                                    s.lineTo(i.x + a, i.y + o),
                                    s.moveTo(i.x - a, i.y + o),
                                    s.lineTo(i.x + a, i.y - o),
                                    s.closePath();
                                    break;
                                case "star":
                                        s.beginPath(),
                                    s.moveTo(i.x, i.y + n),
                                    s.lineTo(i.x, i.y - n),
                                    s.moveTo(i.x - n, i.y),
                                    s.lineTo(i.x + n, i.y),
                                    a = Math.cos(Math.PI / 4) * n,
                                    o = Math.sin(Math.PI / 4) * n,
                                    s.moveTo(i.x - a, i.y - o),
                                    s.lineTo(i.x + a, i.y + o),
                                    s.moveTo(i.x - a, i.y + o),
                                    s.lineTo(i.x + a, i.y - o),
                                    s.closePath();
                                    break;
                                case "line":
                                        s.beginPath(),
                                    s.moveTo(i.x - n, i.y),
                                    s.lineTo(i.x + n, i.y),
                                    s.closePath();
                                    break;
                                case "dash":
                                        s.beginPath(),
                                    s.moveTo(i.x, i.y),
                                    s.lineTo(i.x + n, i.y),
                                    s.closePath()
                            }
                            s.stroke()
                        }
                    }
                }
            })
        }
    }, {}],
    36: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            t.helpers;
            t.defaults.global.elements.rectangle = {
                backgroundColor: t.defaults.global.defaultColor,
                borderWidth: 0,
                borderColor: t.defaults.global.defaultColor
            }, t.elements.Rectangle = t.Element.extend({
                draw: function() {
                    var t = this._chart.ctx,
                        e = this._view,
                        i = e.width / 2,
                        s = e.x - i,
                        a = e.x + i,
                        o = e.base - (e.base - e.y),
                        n = e.borderWidth / 2;
                    e.borderWidth && (s += n, a -= n, o += n), t.beginPath(), t.fillStyle = e.backgroundColor, t.strokeStyle = e.borderColor, t.lineWidth = e.borderWidth, t.moveTo(s, e.base), t.lineTo(s, o), t.lineTo(a, o), t.lineTo(a, e.base), t.fill(), e.borderWidth && t.stroke()
                },
                height: function() {
                    var t = this._view;
                    return t.base - t.y
                },
                inRange: function(t, e) {
                    var i = this._view,
                        s = !1;
                    return i && (s = i.y < i.base ? t >= i.x - i.width / 2 && t <= i.x + i.width / 2 && e >= i.y && e <= i.base : t >= i.x - i.width / 2 && t <= i.x + i.width / 2 && e >= i.base && e <= i.y), s
                },
                inLabelRange: function(t) {
                    var e = this._view;
                    return e ? t >= e.x - e.width / 2 && t <= e.x + e.width / 2 : !1
                },
                tooltipPosition: function() {
                    var t = this._view;
                    return {
                        x: t.x,
                        y: t.y
                    }
                }
            })
        }
    }, {}],
    37: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = (t.helpers, {
                    position: "bottom"
                }),
                i = t.Scale.extend({
                    buildTicks: function(t) {
                        this.ticks = this.chart.data.labels
                    },
                    getLabelForIndex: function(t, e) {
                        return this.ticks[t]
                    },
                    getPixelForValue: function(t, e, i, s) {
                        if (this.isHorizontal()) {
                            var a = this.width - (this.paddingLeft + this.paddingRight),
                                o = a / Math.max(this.chart.data.labels.length - (this.options.gridLines.offsetGridLines ? 0 : 1), 1),
                                n = o * e + this.paddingLeft;
                            return this.options.gridLines.offsetGridLines && s && (n += o / 2), this.left + Math.round(n)
                        }
                        var r = this.height - (this.paddingTop + this.paddingBottom),
                            l = r / Math.max(this.chart.data.labels.length - (this.options.gridLines.offsetGridLines ? 0 : 1), 1),
                            h = l * e + this.paddingTop;
                        return this.options.gridLines.offsetGridLines && s && (h += l / 2), this.top + Math.round(h)
                    }
                });
            t.scaleService.registerScaleType("category", i, e)
        }
    }, {}],
    38: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = t.helpers,
                i = {
                    position: "left",
                    ticks: {
                        callback: function(t, i, s) {
                            var a = s[1] - s[0];
                            Math.abs(a) > 1 && t !== Math.floor(t) && (a = t - Math.floor(t));
                            var o = e.log10(Math.abs(a)),
                                n = "";
                            if (0 !== t) {
                                var r = -1 * Math.floor(o);
                                r = Math.max(Math.min(r, 20), 0), n = t.toFixed(r)
                            } else n = "0";
                            return n
                        }
                    }
                },
                s = t.Scale.extend({
                    determineDataLimits: function() {
                        if (this.min = null, this.max = null, this.options.stacked) {
                            var t = {},
                                i = !1,
                                s = !1;
                            e.each(this.chart.data.datasets, function(a) {
                                void 0 === t[a.type] && (t[a.type] = {
                                    positiveValues: [],
                                    negativeValues: []
                                });
                                var o = t[a.type].positiveValues,
                                    n = t[a.type].negativeValues;
                                e.isDatasetVisible(a) && (this.isHorizontal() ? a.xAxisID === this.id : a.yAxisID === this.id) && e.each(a.data, function(t, e) {
                                    var a = +this.getRightValue(t);
                                    isNaN(a) || (o[e] = o[e] || 0, n[e] = n[e] || 0, this.options.relativePoints ? o[e] = 100 : 0 > a ? (s = !0, n[e] += a) : (i = !0, o[e] += a))
                                }, this)
                            }, this), e.each(t, function(t) {
                                var i = t.positiveValues.concat(t.negativeValues),
                                    s = e.min(i),
                                    a = e.max(i);
                                this.min = null === this.min ? s : Math.min(this.min, s), this.max = null === this.max ? a : Math.max(this.max, a)
                            }, this)
                        } else e.each(this.chart.data.datasets, function(t) {
                            e.isDatasetVisible(t) && (this.isHorizontal() ? t.xAxisID === this.id : t.yAxisID === this.id) && e.each(t.data, function(t, e) {
                                var i = +this.getRightValue(t);
                                isNaN(i) || (null === this.min ? this.min = i : i < this.min && (this.min = i), null === this.max ? this.max = i : i > this.max && (this.max = i))
                            }, this)
                        }, this);
                        if (this.options.ticks.beginAtZero) {
                            var a = e.sign(this.min),
                                o = e.sign(this.max);
                            0 > a && 0 > o ? this.max = 0 : a > 0 && o > 0 && (this.min = 0)
                        }
                        void 0 !== this.options.ticks.min ? this.min = this.options.ticks.min : void 0 !== this.options.ticks.suggestedMin && (this.min = Math.min(this.min, this.options.ticks.suggestedMin)), void 0 !== this.options.ticks.max ? this.max = this.options.ticks.max : void 0 !== this.options.ticks.suggestedMax && (this.max = Math.max(this.max, this.options.ticks.suggestedMax)), this.min === this.max && (this.min--, this.max++)
                    },
                    buildTicks: function() {
                        this.ticks = [];
                        var i;
                        if (this.isHorizontal()) i = Math.min(this.options.ticks.maxTicksLimit ? this.options.ticks.maxTicksLimit : 11, Math.ceil(this.width / 50));
                        else {
                            var s = e.getValueOrDefault(this.options.ticks.fontSize, t.defaults.global.defaultFontSize);
                            i = Math.min(this.options.ticks.maxTicksLimit ? this.options.ticks.maxTicksLimit : 11, Math.ceil(this.height / (2 * s)))
                        }
                        i = Math.max(2, i);
                        var a, o = this.options.ticks.fixedStepSize && this.options.ticks.fixedStepSize > 0 || this.options.ticks.stepSize && this.options.ticks.stepSize > 0;
                        if (o) a = e.getValueOrDefault(this.options.ticks.fixedStepSize, this.options.ticks.stepSize);
                        else {
                            var n = e.niceNum(this.max - this.min, !1);
                            a = e.niceNum(n / (i - 1), !0)
                        }
                        var r = Math.floor(this.min / a) * a,
                            l = Math.ceil(this.max / a) * a,
                            h = (l - r) / a;
                        h = e.almostEquals(h, Math.round(h), a / 1e3) ? Math.round(h) : Math.ceil(h), this.ticks.push(void 0 !== this.options.ticks.min ? this.options.ticks.min : r);
                        for (var c = 1; h > c; ++c) this.ticks.push(r + c * a);
                        this.ticks.push(void 0 !== this.options.ticks.max ? this.options.ticks.max : l), ("left" === this.options.position || "right" === this.options.position) && this.ticks.reverse(), this.max = e.max(this.ticks), this.min = e.min(this.ticks), this.options.ticks.reverse ? (this.ticks.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), this.ticksAsNumbers = this.ticks.slice(), this.zeroLineIndex = this.ticks.indexOf(0)
                    },
                    getLabelForIndex: function(t, e) {
                        return +this.getRightValue(this.chart.data.datasets[e].data[t])
                    },
                    getPixelForValue: function(t, e, i, s) {
                        var a, o = +this.getRightValue(t),
                            n = this.end - this.start;
                        if (this.isHorizontal()) {
                            var r = this.width - (this.paddingLeft + this.paddingRight);
                            return a = this.left + r / n * (o - this.start), Math.round(a + this.paddingLeft)
                        }
                        var l = this.height - (this.paddingTop + this.paddingBottom);
                        return a = this.bottom - this.paddingBottom - l / n * (o - this.start), Math.round(a)
                    },
                    getPixelForTick: function(t, e) {
                        return this.getPixelForValue(this.ticksAsNumbers[t], null, null, e)
                    }
                });
            t.scaleService.registerScaleType("linear", s, i)
        }
    }, {}],
    39: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = t.helpers,
                i = {
                    position: "left",
                    ticks: {
                        callback: function(e, i, s) {
                            var a = e / Math.pow(10, Math.floor(t.helpers.log10(e)));
                            return 1 === a || 2 === a || 5 === a || 0 === i || i === s.length - 1 ? e.toExponential() : ""
                        }
                    }
                },
                s = t.Scale.extend({
                    determineDataLimits: function() {
                        if (this.min = null, this.max = null, this.options.stacked) {
                            var t = {};
                            e.each(this.chart.data.datasets, function(i) {
                                e.isDatasetVisible(i) && (this.isHorizontal() ? i.xAxisID === this.id : i.yAxisID === this.id) && (void 0 === t[i.type] && (t[i.type] = []), e.each(i.data, function(e, s) {
                                    var a = t[i.type],
                                        o = +this.getRightValue(e);
                                    isNaN(o) || (a[s] = a[s] || 0, this.options.relativePoints ? a[s] = 100 : a[s] += o)
                                }, this))
                            }, this), e.each(t, function(t) {
                                var i = e.min(t),
                                    s = e.max(t);
                                this.min = null === this.min ? i : Math.min(this.min, i), this.max = null === this.max ? s : Math.max(this.max, s)
                            }, this)
                        } else e.each(this.chart.data.datasets, function(t) {
                            e.isDatasetVisible(t) && (this.isHorizontal() ? t.xAxisID === this.id : t.yAxisID === this.id) && e.each(t.data, function(t, e) {
                                var i = +this.getRightValue(t);
                                isNaN(i) || (null === this.min ? this.min = i : i < this.min && (this.min = i), null === this.max ? this.max = i : i > this.max && (this.max = i))
                            }, this)
                        }, this);
                        this.min = void 0 !== this.options.ticks.min ? this.options.ticks.min : this.min, this.max = void 0 !== this.options.ticks.max ? this.options.ticks.max : this.max, this.min === this.max && (0 !== this.min && null !== this.min ? (this.min = Math.pow(10, Math.floor(e.log10(this.min)) - 1), this.max = Math.pow(10, Math.floor(e.log10(this.max)) + 1)) : (this.min = 1, this.max = 10))
                    },
                    buildTicks: function() {
                        this.tickValues = [];
                        for (var t = void 0 !== this.options.ticks.min ? this.options.ticks.min : Math.pow(10, Math.floor(e.log10(this.min))); t < this.max;) {
                            this.tickValues.push(t);
                            var i = Math.floor(e.log10(t)),
                                s = Math.floor(t / Math.pow(10, i)) + 1;
                            10 === s && (s = 1, ++i), t = s * Math.pow(10, i)
                        }
                        var a = void 0 !== this.options.ticks.max ? this.options.ticks.max : t;
                        this.tickValues.push(a), ("left" === this.options.position || "right" === this.options.position) && this.tickValues.reverse(), this.max = e.max(this.tickValues), this.min = e.min(this.tickValues), this.options.ticks.reverse ? (this.tickValues.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), this.ticks = this.tickValues.slice()
                    },
                    getLabelForIndex: function(t, e) {
                        return +this.getRightValue(this.chart.data.datasets[e].data[t])
                    },
                    getPixelForTick: function(t, e) {
                        return this.getPixelForValue(this.tickValues[t], null, null, e)
                    },
                    getPixelForValue: function(t, i, s, a) {
                        var o, n = +this.getRightValue(t),
                            r = e.log10(this.end) - e.log10(this.start);
                        if (this.isHorizontal())
                            if (0 === n) o = this.left + this.paddingLeft;
                            else {
                                var l = this.width - (this.paddingLeft + this.paddingRight);
                                o = this.left + l / r * (e.log10(n) - e.log10(this.start)), o += this.paddingLeft
                            } else if (0 === n) o = this.top + this.paddingTop;
                        else {
                            var h = this.height - (this.paddingTop + this.paddingBottom);
                            o = this.bottom - this.paddingBottom - h / r * (e.log10(n) - e.log10(this.start))
                        }
                        return o
                    }
                });
            t.scaleService.registerScaleType("logarithmic", s, i)
        }
    }, {}],
    40: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = t.helpers,
                i = {
                    display: !0,
                    animate: !0,
                    lineArc: !1,
                    position: "chartArea",
                    angleLines: {
                        display: !0,
                        color: "rgba(0, 0, 0, 0.1)",
                        lineWidth: 1
                    },
                    ticks: {
                        showLabelBackdrop: !0,
                        backdropColor: "rgba(255,255,255,0.75)",
                        backdropPaddingY: 2,
                        backdropPaddingX: 2
                    },
                    pointLabels: {
                        fontSize: 10,
                        callback: function(t) {
                            return t
                        }
                    }
                },
                s = t.Scale.extend({
                    getValueCount: function() {
                        return this.chart.data.labels.length
                    },
                    setDimensions: function() {
                        this.width = this.maxWidth, this.height = this.maxHeight, this.xCenter = Math.round(this.width / 2), this.yCenter = Math.round(this.height / 2);
                        var i = e.min([this.height, this.width]),
                            s = e.getValueOrDefault(this.options.ticks.fontSize, t.defaults.global.defaultFontSize);
                        this.drawingArea = this.options.display ? i / 2 - (s / 2 + this.options.ticks.backdropPaddingY) : i / 2
                    },
                    determineDataLimits: function() {
                        if (this.min = null, this.max = null, e.each(this.chart.data.datasets, function(t) {
                                e.isDatasetVisible(t) && e.each(t.data, function(t, e) {
                                    var i = +this.getRightValue(t);
                                    isNaN(i) || (null === this.min ? this.min = i : i < this.min && (this.min = i), null === this.max ? this.max = i : i > this.max && (this.max = i))
                                }, this)
                            }, this), this.options.ticks.beginAtZero) {
                            var t = e.sign(this.min),
                                i = e.sign(this.max);
                            0 > t && 0 > i ? this.max = 0 : t > 0 && i > 0 && (this.min = 0)
                        }
                        void 0 !== this.options.ticks.min ? this.min = this.options.ticks.min : void 0 !== this.options.ticks.suggestedMin && (this.min = Math.min(this.min, this.options.ticks.suggestedMin)), void 0 !== this.options.ticks.max ? this.max = this.options.ticks.max : void 0 !== this.options.ticks.suggestedMax && (this.max = Math.max(this.max, this.options.ticks.suggestedMax)), this.min === this.max && (this.min--, this.max++)
                    },
                    buildTicks: function() {
                        this.ticks = [];
                        var i = e.getValueOrDefault(this.options.ticks.fontSize, t.defaults.global.defaultFontSize),
                            s = Math.min(this.options.ticks.maxTicksLimit ? this.options.ticks.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * i)));
                        s = Math.max(2, s);
                        var a = e.niceNum(this.max - this.min, !1),
                            o = e.niceNum(a / (s - 1), !0),
                            n = Math.floor(this.min / o) * o,
                            r = Math.ceil(this.max / o) * o,
                            l = Math.ceil((r - n) / o);
                        this.ticks.push(void 0 !== this.options.ticks.min ? this.options.ticks.min : n);
                        for (var h = 1; l > h; ++h) this.ticks.push(n + h * o);
                        this.ticks.push(void 0 !== this.options.ticks.max ? this.options.ticks.max : r), this.max = e.max(this.ticks), this.min = e.min(this.ticks), this.options.ticks.reverse ? (this.ticks.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), this.zeroLineIndex = this.ticks.indexOf(0)
                    },
                    convertTicksToLabels: function() {
                        t.Scale.prototype.convertTicksToLabels.call(this), this.pointLabels = this.chart.data.labels.map(this.options.pointLabels.callback, this)
                    },
                    getLabelForIndex: function(t, e) {
                        return +this.getRightValue(this.chart.data.datasets[e].data[t])
                    },
                    fit: function() {
                        var i, s, a, o, n, r, l, h, c, u, d, f, m = e.getValueOrDefault(this.options.pointLabels.fontSize, t.defaults.global.defaultFontSize),
                            g = e.getValueOrDefault(this.options.pointLabels.fontStyle, t.defaults.global.defaultFontStyle),
                            p = e.getValueOrDefault(this.options.pointLabels.fontFamily, t.defaults.global.defaultFontFamily),
                            b = e.fontString(m, g, p),
                            v = e.min([this.height / 2 - m - 5, this.width / 2]),
                            x = this.width,
                            y = 0;
                        for (this.ctx.font = b, s = 0; s < this.getValueCount(); s++) i = this.getPointPosition(s, v), a = this.ctx.measureText(this.pointLabels[s] ? this.pointLabels[s] : "").width + 5, 0 === s || s === this.getValueCount() / 2 ? (o = a / 2, i.x + o > x && (x = i.x + o, n = s), i.x - o < y && (y = i.x - o, l = s)) : s < this.getValueCount() / 2 ? i.x + a > x && (x = i.x + a, n = s) : s > this.getValueCount() / 2 && i.x - a < y && (y = i.x - a, l = s);
                        c = y, u = Math.ceil(x - this.width), r = this.getIndexAngle(n), h = this.getIndexAngle(l), d = u / Math.sin(r + Math.PI / 2), f = c / Math.sin(h + Math.PI / 2), d = e.isNumber(d) ? d : 0, f = e.isNumber(f) ? f : 0, this.drawingArea = Math.round(v - (f + d) / 2), this.setCenterPoint(f, d)
                    },
                    setCenterPoint: function(t, e) {
                        var i = this.width - e - this.drawingArea,
                            s = t + this.drawingArea;
                        this.xCenter = Math.round((s + i) / 2 + this.left), this.yCenter = Math.round(this.height / 2 + this.top)
                    },
                    getIndexAngle: function(t) {
                        var e = 2 * Math.PI / this.getValueCount();
                        return t * e - Math.PI / 2
                    },
                    getDistanceFromCenterForValue: function(t) {
                        if (null === t) return 0;
                        var e = this.drawingArea / (this.max - this.min);
                        return this.options.reverse ? (this.max - t) * e : (t - this.min) * e
                    },
                    getPointPosition: function(t, e) {
                        var i = this.getIndexAngle(t);
                        return {
                            x: Math.round(Math.cos(i) * e) + this.xCenter,
                            y: Math.round(Math.sin(i) * e) + this.yCenter
                        }
                    },
                    getPointPositionForValue: function(t, e) {
                        return this.getPointPosition(t, this.getDistanceFromCenterForValue(e))
                    },
                    draw: function() {
                        if (this.options.display) {
                            var i = this.ctx;
                            if (e.each(this.ticks, function(s, a) {
                                    if (a > 0 || this.options.reverse) {
                                        var o = this.getDistanceFromCenterForValue(this.ticks[a]),
                                            n = this.yCenter - o;
                                        if (this.options.gridLines.display)
                                            if (i.strokeStyle = this.options.gridLines.color, i.lineWidth = this.options.gridLines.lineWidth, this.options.lineArc) i.beginPath(), i.arc(this.xCenter, this.yCenter, o, 0, 2 * Math.PI), i.closePath(), i.stroke();
                                            else {
                                                i.beginPath();
                                                for (var r = 0; r < this.getValueCount(); r++) {
                                                    var l = this.getPointPosition(r, this.getDistanceFromCenterForValue(this.ticks[a]));
                                                    0 === r ? i.moveTo(l.x, l.y) : i.lineTo(l.x, l.y)
                                                }
                                                i.closePath(), i.stroke()
                                            }
                                        if (this.options.ticks.display) {
                                            var h = e.getValueOrDefault(this.options.ticks.fontColor, t.defaults.global.defaultFontColor),
                                                c = e.getValueOrDefault(this.options.ticks.fontSize, t.defaults.global.defaultFontSize),
                                                u = e.getValueOrDefault(this.options.ticks.fontStyle, t.defaults.global.defaultFontStyle),
                                                d = e.getValueOrDefault(this.options.ticks.fontFamily, t.defaults.global.defaultFontFamily),
                                                f = e.fontString(c, u, d);
                                            if (i.font = f, this.options.ticks.showLabelBackdrop) {
                                                var m = i.measureText(s).width;
                                                i.fillStyle = this.options.ticks.backdropColor, i.fillRect(this.xCenter - m / 2 - this.options.ticks.backdropPaddingX, n - c / 2 - this.options.ticks.backdropPaddingY, m + 2 * this.options.ticks.backdropPaddingX, c + 2 * this.options.ticks.backdropPaddingY)
                                            }
                                            i.textAlign = "center", i.textBaseline = "middle", i.fillStyle = h, i.fillText(s, this.xCenter, n)
                                        }
                                    }
                                }, this), !this.options.lineArc) {
                                i.lineWidth = this.options.angleLines.lineWidth, i.strokeStyle = this.options.angleLines.color;
                                for (var s = this.getValueCount() - 1; s >= 0; s--) {
                                    if (this.options.angleLines.display) {
                                        var a = this.getPointPosition(s, this.getDistanceFromCenterForValue(this.options.reverse ? this.min : this.max));
                                        i.beginPath(), i.moveTo(this.xCenter, this.yCenter), i.lineTo(a.x, a.y), i.stroke(), i.closePath()
                                    }
                                    var o = this.getPointPosition(s, this.getDistanceFromCenterForValue(this.options.reverse ? this.min : this.max) + 5),
                                        n = e.getValueOrDefault(this.options.pointLabels.fontColor, t.defaults.global.defaultFontColor),
                                        r = e.getValueOrDefault(this.options.pointLabels.fontSize, t.defaults.global.defaultFontSize),
                                        l = e.getValueOrDefault(this.options.pointLabels.fontStyle, t.defaults.global.defaultFontStyle),
                                        h = e.getValueOrDefault(this.options.pointLabels.fontFamily, t.defaults.global.defaultFontFamily),
                                        c = e.fontString(r, l, h);
                                    i.font = c, i.fillStyle = n;
                                    var u = this.pointLabels.length,
                                        d = this.pointLabels.length / 2,
                                        f = d / 2,
                                        m = f > s || s > u - f,
                                        g = s === f || s === u - f;
                                    0 === s ? i.textAlign = "center" : s === d ? i.textAlign = "center" : d > s ? i.textAlign = "left" : i.textAlign = "right", g ? i.textBaseline = "middle" : m ? i.textBaseline = "bottom" : i.textBaseline = "top", i.fillText(this.pointLabels[s] ? this.pointLabels[s] : "", o.x, o.y)
                                }
                            }
                        }
                    }
                });
            t.scaleService.registerScaleType("radialLinear", s, i)
        }
    }, {}],
    41: [function(t, e, i) {
        "use strict";
        var s = t("moment");
        s = "function" == typeof s ? s : window.moment, e.exports = function(t) {
            var e = t.helpers;
            if (!s) return void console.warn("Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at http://momentjs.com/");
            var i = {
                    units: [{
                        name: "millisecond",
                        steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
                    }, {
                        name: "second",
                        steps: [1, 2, 5, 10, 30]
                    }, {
                        name: "minute",
                        steps: [1, 2, 5, 10, 30]
                    }, {
                        name: "hour",
                        steps: [1, 2, 3, 6, 12]
                    }, {
                        name: "day",
                        steps: [1, 2, 5]
                    }, {
                        name: "week",
                        maxStep: 4
                    }, {
                        name: "month",
                        maxStep: 3
                    }, {
                        name: "quarter",
                        maxStep: 4
                    }, {
                        name: "year",
                        maxStep: !1
                    }]
                },
                a = {
                    position: "bottom",
                    time: {
                        parser: !1,
                        format: !1,
                        unit: !1,
                        round: !1,
                        displayFormat: !1,
                        displayFormats: {
                            millisecond: "h:mm:ss.SSS a",
                            second: "h:mm:ss a",
                            minute: "h:mm:ss a",
                            hour: "MMM D, hA",
                            day: "ll",
                            week: "ll",
                            month: "MMM YYYY",
                            quarter: "[Q]Q - YYYY",
                            year: "YYYY"
                        }
                    },
                    ticks: {
                        autoSkip: !1
                    }
                },
                o = t.Scale.extend({
                    getLabelMoment: function(t, e) {
                        return this.labelMoments[t][e]
                    },
                    determineDataLimits: function() {
                        this.labelMoments = [];
                        var t = [];
                        this.chart.data.labels && this.chart.data.labels.length > 0 ? (e.each(this.chart.data.labels, function(e, i) {
                            var s = this.parseTime(e);
                            this.options.time.round && s.startOf(this.options.time.round), t.push(s)
                        }, this), this.firstTick = s.min.call(this, t), this.lastTick = s.max.call(this, t)) : (this.firstTick = null, this.lastTick = null), e.each(this.chart.data.datasets, function(i, a) {
                            var o = [];
                            "object" == typeof i.data[0] ? e.each(i.data, function(t, e) {
                                var i = this.parseTime(this.getRightValue(t));
                                this.options.time.round && i.startOf(this.options.time.round), o.push(i), this.firstTick = null !== this.firstTick ? s.min(this.firstTick, i) : i, this.lastTick = null !== this.lastTick ? s.max(this.lastTick, i) : i
                            }, this) : o = t, this.labelMoments.push(o)
                        }, this), this.options.time.min && (this.firstTick = this.parseTime(this.options.time.min)), this.options.time.max && (this.lastTick = this.parseTime(this.options.time.max)), this.firstTick = (this.firstTick || s()).clone(), this.lastTick = (this.lastTick || s()).clone()
                    },
                    buildTicks: function(s) {
                        if (this.ticks = [], this.unitScale = 1, this.scaleSizeInUnits = 0, this.options.time.unit) this.tickUnit = this.options.time.unit || "day", this.displayFormat = this.options.time.displayFormats[this.tickUnit], this.scaleSizeInUnits = this.lastTick.diff(this.firstTick, this.tickUnit, !0), this.unitScale = e.getValueOrDefault(this.options.time.unitStepSize, 1);
                        else {
                            var a = e.getValueOrDefault(this.options.ticks.fontSize, t.defaults.global.defaultFontSize),
                                o = this.isHorizontal() ? this.width - (this.paddingLeft + this.paddingRight) : this.height - (this.paddingTop + this.paddingBottom),
                                n = this.tickFormatFunction(this.firstTick, 0, []),
                                r = n.length * a,
                                l = Math.cos(e.toRadians(this.options.ticks.maxRotation)),
                                h = Math.sin(e.toRadians(this.options.ticks.maxRotation));
                            r = r * l + a * h;
                            var c = o / (r + 10);
                            this.tickUnit = "millisecond", this.scaleSizeInUnits = this.lastTick.diff(this.firstTick, this.tickUnit, !0), this.displayFormat = this.options.time.displayFormats[this.tickUnit];
                            for (var u = 0, d = i.units[u]; u < i.units.length;) {
                                if (this.unitScale = 1, e.isArray(d.steps) && Math.ceil(this.scaleSizeInUnits / c) < e.max(d.steps)) {
                                    for (var f = 0; f < d.steps.length; ++f)
                                        if (d.steps[f] > Math.ceil(this.scaleSizeInUnits / c)) {
                                            this.unitScale = e.getValueOrDefault(this.options.time.unitStepSize, d.steps[f]);
                                            break
                                        }
                                    break
                                }
                                if (d.maxStep === !1 || Math.ceil(this.scaleSizeInUnits / c) < d.maxStep) {
                                    this.unitScale = e.getValueOrDefault(this.options.time.unitStepSize, Math.ceil(this.scaleSizeInUnits / c));
                                    break
                                }++u, d = i.units[u], this.tickUnit = d.name, this.scaleSizeInUnits = this.lastTick.diff(this.firstTick, this.tickUnit, !0), this.displayFormat = this.options.time.displayFormats[d.name]
                            }
                        }
                        var m;
                        this.options.time.min ? m = this.firstTick.clone().startOf(this.tickUnit) : (this.firstTick.startOf(this.tickUnit), m = this.firstTick), this.options.time.max || this.lastTick.endOf(this.tickUnit), this.smallestLabelSeparation = this.width, e.each(this.chart.data.datasets, function(t, e) {
                            for (var i = 1; i < this.labelMoments[e].length; i++) this.smallestLabelSeparation = Math.min(this.smallestLabelSeparation, this.labelMoments[e][i].diff(this.labelMoments[e][i - 1], this.tickUnit, !0))
                        }, this), this.options.time.displayFormat && (this.displayFormat = this.options.time.displayFormat), this.ticks.push(this.firstTick.clone());
                        for (var g = 1; g < this.scaleSizeInUnits; ++g) {
                            var p = m.clone().add(g, this.tickUnit);
                            if (this.options.time.max && p.diff(this.lastTick, this.tickUnit, !0) >= 0) break;
                            g % this.unitScale === 0 && this.ticks.push(p)
                        }(0 !== this.ticks[this.ticks.length - 1].diff(this.lastTick, this.tickUnit) || 0 === this.scaleSizeInUnits) && (this.options.time.max ? (this.ticks.push(this.lastTick.clone()), this.scaleSizeInUnits = this.lastTick.diff(this.ticks[0], this.tickUnit, !0)) : (this.scaleSizeInUnits = Math.ceil(this.scaleSizeInUnits / this.unitScale) * this.unitScale, this.ticks.push(this.firstTick.clone().add(this.scaleSizeInUnits, this.tickUnit)), this.lastTick = this.ticks[this.ticks.length - 1].clone()))
                    },
                    getLabelForIndex: function(t, e) {
                        var i = this.chart.data.labels && t < this.chart.data.labels.length ? this.chart.data.labels[t] : "";
                        return "object" == typeof this.chart.data.datasets[e].data[0] && (i = this.getRightValue(this.chart.data.datasets[e].data[t])), this.options.time.tooltipFormat && (i = this.parseTime(i).format(this.options.time.tooltipFormat)), i
                    },
                    tickFormatFunction: function(t, e, i) {
                        var s = t.format(this.displayFormat);
                        return this.options.ticks.userCallback ? this.options.ticks.userCallback(s, e, i) : s
                    },
                    convertTicksToLabels: function() {
                        this.ticks = this.ticks.map(this.tickFormatFunction, this)
                    },
                    getPixelForValue: function(t, e, i, s) {
                        var a = this.getLabelMoment(i, e);
                        if (a) {
                            var o = a.diff(this.firstTick, this.tickUnit, !0),
                                n = o / this.scaleSizeInUnits;
                            if (this.isHorizontal()) {
                                var r = this.width - (this.paddingLeft + this.paddingRight),
                                    l = (r / Math.max(this.ticks.length - 1, 1), r * n + this.paddingLeft);
                                return this.left + Math.round(l)
                            }
                            var h = this.height - (this.paddingTop + this.paddingBottom),
                                c = (h / Math.max(this.ticks.length - 1, 1), h * n + this.paddingTop);
                            return this.top + Math.round(c)
                        }
                    },
                    parseTime: function(t) {
                        return "string" == typeof this.options.time.parser ? s(t, this.options.time.parser) : "function" == typeof this.options.time.parser ? this.options.time.parser(t) : "function" == typeof t.getMonth || "number" == typeof t ? s(t) : t.isValid && t.isValid() ? t : "string" != typeof this.options.time.format && this.options.time.format.call ? (console.warn("options.time.format is deprecated and replaced by options.time.parser. See http://nnnick.github.io/Chart.js/docs-v2/#scales-time-scale"), this.options.time.format(t)) : s(t, this.options.time.format)
                    }
                });
            t.scaleService.registerScaleType("time", o, a)
        }
    }, {
        moment: 6
    }]
}, {}, [7]);