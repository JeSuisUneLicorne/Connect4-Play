/*
  MIT License

  Copyright (c) 2021 Daniel Özyurt, Julian Zimmermann

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

// +: V X V -> V, V := K^4
function add(u, v) {
  console.assert(Array.isArray(u));
  console.assert(Array.isArray(v));
  u.forEach(el => console.assert(typeof (el) === 'number'));
  v.forEach(el => console.assert(typeof (el) === 'number'));
  console.assert(u.length === 4);
  console.assert(v.length === 4);
  return u.map((lhs, i) => lhs + v[i], v);
}

// *: K x V -> V, V := K^4
function scale(s, v) {
  console.assert(typeof (s) === 'number');
  console.assert(Array.isArray(v));
  v.forEach(el => console.assert(typeof (el) === 'number'));
  console.assert(v.length === 4);
  return v.map((rhs) => s * rhs, s);
}

// A * x
function combine(a, x) {
  console.assert(Array.isArray(a));
  console.assert(Array.isArray(x));
  console.assert(a.length === 4);
  console.assert(x.length === 4);
  a.forEach(col => console.assert(Array.isArray(col)));
  [...a[0], ...a[1], ...a[2], ...a[3]].forEach(el => console.assert(typeof (el) === 'number'));
  x.forEach(el => console.assert(typeof (el) === 'number'));
  return [a[0][0] * x[0] + a[1][0] * x[1] + a[2][0] * x[2] + a[3][0] * x[3],
  a[0][1] * x[0] + a[1][1] * x[1] + a[2][1] * x[2] + a[3][1] * x[3],
  a[0][2] * x[0] + a[1][2] * x[1] + a[2][2] * x[2] + a[3][2] * x[3],
  a[0][3] * x[0] + a[1][3] * x[1] + a[2][3] * x[2] + a[3][3] * x[3]
  ];
}

// A * B
function compose(a, b) {
  console.assert(Array.isArray(a));
  console.assert(Array.isArray(b));
  console.assert(a.length === 4);
  console.assert(b.length === 4);
  a.forEach(col => console.assert(Array.isArray(col)));
  b.forEach(col => console.assert(Array.isArray(col)));
  return [...a[0], ...a[1], ...a[2], ...a[3]].forEach(el => console.assert(typeof (el) === 'number')),
    [...b[0], ...b[1], ...b[2], ...b[3]].forEach(el => console.assert(typeof (el) === 'number')),
    [combine(a, b[0]), combine(a, b[1]), combine(a, b[2]), combine(a, b[3])];
}

// <u, v>
function dot(u, v) {
  console.assert(Array.isArray(u));
  console.assert(Array.isArray(v));
  u.forEach(el => console.assert(typeof (el) === 'number'));
  v.forEach(el => console.assert(typeof (el) === 'number'));
  console.assert(u.length === 4);
  console.assert(v.length === 4);
  return u.map((el, i) => el * v[i], v).reduce((acc, res) => acc + res);
}

// u x v
function cross(u, v) {
  console.assert(Array.isArray(u));
  console.assert(Array.isArray(v));
  u.forEach(el => console.assert(typeof (el) === 'number'));
  v.forEach(el => console.assert(typeof (el) === 'number'));
  console.assert(u.length === 4);
  console.assert(v.length === 4);
  return [
    u[1] * v[2] - u[2] * v[1],
    u[2] * v[0] - u[0] * v[2],
    u[0] * v[1] - u[1] * v[0],
    0];
}

// ||u|| * ||u||
function norm2(u) {
  console.assert(Array.isArray(u));
  u.forEach(el => console.assert(typeof (el) === 'number'));
  console.assert(u.length === 4);
  return dot(u, u);
}

// ||u||
function norm(u) {
  console.assert(Array.isArray(u));
  u.forEach(el => console.assert(typeof (el) === 'number'));
  console.assert(u.length === 4);
  return Math.sqrt(norm2(u));
}

// perspective projection matrix
function makePerspective(b, c, d) {
  console.assert(typeof (b) === 'number');
  console.assert(typeof (c) === 'number');
  console.assert(typeof (d) === 'number');
  return [[1, 0, 0, 0], [0, 1, 0, 0], [-b / d, -c / d, 0, -1 / d], [0, 0, 0, 1]];
}

// scale matrix
function makeScale(x = 1, y = 1, z = 1) {
  console.assert(typeof (x) === 'number');
  console.assert(typeof (y) === 'number');
  console.assert(typeof (z) === 'number');
  return [[x, 0, 0, 0], [0, y, 0, 0], [0, 0, z, 0], [0, 0, 0, 1]];
}

// x-axis rotation matrix
function makeRotX(angle) {
  console.assert(typeof (angle) === 'number');
  return [[1, 0, 0, 0], [0, Math.cos(angle), Math.sin(angle), 0], [0, -Math.sin(angle), Math.cos(angle), 0], [0, 0, 0, 1]];
};

// y-axis rotation matrix
function makeRotY(angle) {
  console.assert(typeof (angle) === 'number');
  return [[Math.cos(angle), 0, -Math.sin(angle), 0], [0, 1, 0, 0], [Math.sin(angle), 0, Math.cos(angle), 0], [0, 0, 0, 1]];
};

// z-axis rotation matrix
function makeRotZ(angle) {
  console.assert(typeof (angle) === 'number');
  return [[Math.cos(angle), Math.sin(angle), 0, 0], [-Math.sin(angle), Math.cos(angle), 0, 0], [0, 0, 0, 0], [0, 0, 0, 1]];
};

function makeRotationAround(angle, x, y, z) {
  console.assert(typeof (angle) === 'number');
  console.assert(typeof (x) === 'number');
  console.assert(typeof (y) === 'number');
  console.assert(typeof (z) === 'number');
  let res = compose(makeRotZ(angle), makeTranslate(-x, -y, -z));
  res = compose(makeRotY(angle), res);
  res = compose(makeRotX(angle), res);
  res = compose(makeTranslate(x, y, z), res);
  return res;
}

// translation matrix
function makeTranslate(x = 0, y = 0, z = 0) {
  console.assert(typeof (x) === 'number');
  console.assert(typeof (y) === 'number');
  console.assert(typeof (z) === 'number');
  return [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [x, y, z, 1]];
}

// <n, p - va>, n := (va_y - vb_y, vb_x - va_x)^T
function sdf(va, vb, p) {
  console.assert(Array.isArray(va));
  console.assert(Array.isArray(vb));
  console.assert(Array.isArray(p));
  va.forEach(el => console.assert(typeof (el) === 'number'));
  vb.forEach(el => console.assert(typeof (el) === 'number'));
  p.forEach(el => console.assert(typeof (el) === 'number'));
  console.assert(va.length === 4);
  console.assert(vb.length === 4);
  console.assert(p.length === 4);
  return (va[1] - vb[1]) * (p[0] - va[0]) + (vb[0] - va[0]) * (p[1] - va[1]);
}

// p in triangle {v0, v1, v2}
function isPointInTriangle(p, v0, v1, v2) {
  console.assert(Array.isArray(v0));
  console.assert(Array.isArray(v1));
  console.assert(Array.isArray(v2));
  console.assert(Array.isArray(p));
  v0.forEach(el => console.assert(typeof (el) === 'number'));
  v1.forEach(el => console.assert(typeof (el) === 'number'));
  v2.forEach(el => console.assert(typeof (el) === 'number'));
  p.forEach(el => console.assert(typeof (el) === 'number'));
  console.assert(v0.length === 4);
  console.assert(v1.length === 4);
  console.assert(v2.length === 4);
  console.assert(p.length === 4);
  return (sdf(v0, v1, p) >= 0) && (sdf(v1, v2, p) >= 0) && (sdf(v2, v0, p) >= 0);
}

// viewport matrix
function makeViewport(vxmin, vymin, sx, sy, wxmin, wymin) {
  console.assert(typeof (vxmin) === 'number');
  console.assert(typeof (vymin) === 'number');
  console.assert(typeof (sx) === 'number');
  console.assert(typeof (sy) === 'number');
  console.assert(typeof (wxmin) === 'number');
  console.assert(typeof (wymin) === 'number');
  return compose(compose(scale(sx, sy), translate(-wxmin, -wymin)), translate(vxmin, vymin));
}

export {
  add,
  scale,
  combine,
  compose,
  dot,
  cross,
  norm2,
  norm,
  makePerspective,
  makeScale,
  makeRotationAround,
  makeTranslate,
  sdf,
  isPointInTriangle,
  makeViewport,
}
