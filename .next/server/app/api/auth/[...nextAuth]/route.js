/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextAuth]/route";
exports.ids = ["app/api/auth/[...nextAuth]/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/[...nextAuth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextAuth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../auth */ \"(rsc)/./auth.ts\");\n\nconst { GET, POST } = _auth__WEBPACK_IMPORTED_MODULE_0__.handlers;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRBdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBNEM7QUFFckMsTUFBTSxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRSxHQUFHRiwyQ0FBUUEsQ0FBQyIsInNvdXJjZXMiOlsiL1VzZXJzL2FudGhvbnluZ3V5ZW4vRG9jdW1lbnRzL0dpdEh1Yi9wYXRpZW50am91cm5hbC1waHlzaWNpYW4tcG9ydGFsL2FwcC9hcGkvYXV0aC9bLi4ubmV4dEF1dGhdL3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhhbmRsZXJzIH0gZnJvbSAnLi4vLi4vLi4vLi4vYXV0aCc7XG5cbmV4cG9ydCBjb25zdCB7IEdFVCwgUE9TVCB9ID0gaGFuZGxlcnM7XG4iXSwibmFtZXMiOlsiaGFuZGxlcnMiLCJHRVQiLCJQT1NUIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextAuth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./auth.ts":
/*!*****************!*\
  !*** ./auth.ts ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   auth: () => (/* binding */ auth),\n/* harmony export */   handlers: () => (/* binding */ handlers),\n/* harmony export */   providerMap: () => (/* binding */ providerMap),\n/* harmony export */   signIn: () => (/* binding */ signIn),\n/* harmony export */   signOut: () => (/* binding */ signOut)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var next_auth_providers_keycloak__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/keycloak */ \"(rsc)/./node_modules/next-auth/providers/keycloak.js\");\n/* harmony import */ var next_auth_providers_okta__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-auth/providers/okta */ \"(rsc)/./node_modules/next-auth/providers/okta.js\");\n\n\n\n\nconst providers = [\n    (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n        clientId: process.env.GOOGLE_CLIENT_ID,\n        clientSecret: process.env.GOOGLE_CLIENT_SECRET\n    }),\n    (0,next_auth_providers_keycloak__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n        clientId: process.env.KEYCLOAK_CLIENT_ID,\n        clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,\n        issuer: process.env.KEYCLOAK_ISSUER\n    }),\n    (0,next_auth_providers_okta__WEBPACK_IMPORTED_MODULE_3__[\"default\"])({\n        clientId: process.env.OKTA_CLIENT_ID,\n        clientSecret: process.env.OKTA_CLIENT_SECRET,\n        issuer: process.env.OKTA_ISSUER\n    })\n];\nif (!process.env.GOOGLE_CLIENT_ID) {\n    console.warn('Missing environment variable \"GOOGLE_CLIENT_ID\"');\n}\nif (!process.env.GOOGLE_CLIENT_SECRET) {\n    console.warn('Missing environment variable \"GOOGLE_CLIENT_SECRET\"');\n}\nif (!process.env.KEYCLOAK_CLIENT_ID) {\n    console.warn('Missing environment variable \"KEYCLOAK_CLIENT_ID\"');\n}\nif (!process.env.KEYCLOAK_CLIENT_SECRET) {\n    console.warn('Missing environment variable \"KEYCLOAK_CLIENT_SECRET\"');\n}\nif (!process.env.KEYCLOAK_ISSUER) {\n    console.warn('Missing environment variable \"KEYCLOAK_ISSUER\"');\n}\nif (!process.env.OKTA_CLIENT_ID) {\n    console.warn('Missing environment variable \"OKTA_CLIENT_ID\"');\n}\nif (!process.env.OKTA_CLIENT_SECRET) {\n    console.warn('Missing environment variable \"OKTA_CLIENT_SECRET\"');\n}\nif (!process.env.OKTA_ISSUER) {\n    console.warn('Missing environment variable \"OKTA_ISSUER\"');\n}\nconst providerMap = providers.map((provider)=>{\n    if (typeof provider === 'function') {\n        const providerData = provider();\n        return {\n            id: providerData.id,\n            name: providerData.name\n        };\n    }\n    return {\n        id: provider.id,\n        name: provider.name\n    };\n});\nconst { handlers, auth, signIn, signOut } = (0,next_auth__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n    providers,\n    secret: process.env.AUTH_SECRET,\n    pages: {\n        signIn: '/auth/signin'\n    },\n    callbacks: {\n        authorized ({ auth: session, request: { nextUrl } }) {\n            const isLoggedIn = !!session?.user;\n            const isPublicPage = nextUrl.pathname.startsWith('/public');\n            if (isPublicPage || isLoggedIn) {\n                return true;\n            }\n            return false; // Redirect unauthenticated users to login page\n        }\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hdXRoLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFpQztBQUNlO0FBQ0k7QUFDUjtBQUk1QyxNQUFNSSxZQUF3QjtJQUM1Qkgsc0VBQU1BLENBQUM7UUFDTEksVUFBVUMsUUFBUUMsR0FBRyxDQUFDQyxnQkFBZ0I7UUFDdENDLGNBQWNILFFBQVFDLEdBQUcsQ0FBQ0csb0JBQW9CO0lBQ2hEO0lBRUFSLHdFQUFRQSxDQUFDO1FBQ1BHLFVBQVVDLFFBQVFDLEdBQUcsQ0FBQ0ksa0JBQWtCO1FBQ3hDRixjQUFjSCxRQUFRQyxHQUFHLENBQUNLLHNCQUFzQjtRQUNsREMsUUFBUVAsUUFBUUMsR0FBRyxDQUFDTyxlQUFlO0lBQ25DO0lBRUFYLG9FQUFJQSxDQUFDO1FBQ0hFLFVBQVVDLFFBQVFDLEdBQUcsQ0FBQ1EsY0FBYztRQUNwQ04sY0FBY0gsUUFBUUMsR0FBRyxDQUFDUyxrQkFBa0I7UUFDOUNILFFBQVFQLFFBQVFDLEdBQUcsQ0FBQ1UsV0FBVztJQUMvQjtDQUNEO0FBRUQsSUFBRyxDQUFDWCxRQUFRQyxHQUFHLENBQUNDLGdCQUFnQixFQUFFO0lBQ2hDVSxRQUFRQyxJQUFJLENBQUM7QUFDZjtBQUNBLElBQUcsQ0FBQ2IsUUFBUUMsR0FBRyxDQUFDRyxvQkFBb0IsRUFBRTtJQUNwQ1EsUUFBUUMsSUFBSSxDQUFDO0FBQ2Y7QUFDQSxJQUFHLENBQUNiLFFBQVFDLEdBQUcsQ0FBQ0ksa0JBQWtCLEVBQUU7SUFDbENPLFFBQVFDLElBQUksQ0FBQztBQUNmO0FBQ0EsSUFBRyxDQUFDYixRQUFRQyxHQUFHLENBQUNLLHNCQUFzQixFQUFFO0lBQ3RDTSxRQUFRQyxJQUFJLENBQUM7QUFDZjtBQUNBLElBQUcsQ0FBQ2IsUUFBUUMsR0FBRyxDQUFDTyxlQUFlLEVBQUU7SUFDL0JJLFFBQVFDLElBQUksQ0FBQztBQUNmO0FBQ0EsSUFBRyxDQUFDYixRQUFRQyxHQUFHLENBQUNRLGNBQWMsRUFBRTtJQUM5QkcsUUFBUUMsSUFBSSxDQUFDO0FBQ2Y7QUFDQSxJQUFHLENBQUNiLFFBQVFDLEdBQUcsQ0FBQ1Msa0JBQWtCLEVBQUU7SUFDbENFLFFBQVFDLElBQUksQ0FBQztBQUNmO0FBQ0EsSUFBRyxDQUFDYixRQUFRQyxHQUFHLENBQUNVLFdBQVcsRUFBRTtJQUMzQkMsUUFBUUMsSUFBSSxDQUFDO0FBQ2Y7QUFHTyxNQUFNQyxjQUFjaEIsVUFBVWlCLEdBQUcsQ0FBQyxDQUFDQztJQUN4QyxJQUFJLE9BQU9BLGFBQWEsWUFBWTtRQUNsQyxNQUFNQyxlQUFlRDtRQUNuQixPQUFPO1lBQUVFLElBQUlELGFBQWFDLEVBQUU7WUFBRUMsTUFBTUYsYUFBYUUsSUFBSTtRQUFDO0lBQzFEO0lBQ0EsT0FBTztRQUFFRCxJQUFJRixTQUFTRSxFQUFFO1FBQUVDLE1BQU1ILFNBQVNHLElBQUk7SUFBQztBQUNoRCxHQUFHO0FBRUksTUFBTSxFQUFFQyxRQUFRLEVBQUVDLElBQUksRUFBRUMsTUFBTSxFQUFFQyxPQUFPLEVBQUUsR0FBRzdCLHFEQUFRQSxDQUFDO0lBQzFESTtJQUlBMEIsUUFBUXhCLFFBQVFDLEdBQUcsQ0FBQ3dCLFdBQVc7SUFDL0JDLE9BQU87UUFDTEosUUFBUTtJQUNWO0lBQ0FLLFdBQVc7UUFDVEMsWUFBVyxFQUFFUCxNQUFNUSxPQUFPLEVBQUVDLFNBQVMsRUFBRUMsT0FBTyxFQUFFLEVBQUU7WUFDaEQsTUFBTUMsYUFBYSxDQUFDLENBQUNILFNBQVNJO1lBQzlCLE1BQU1DLGVBQWVILFFBQVFJLFFBQVEsQ0FBQ0MsVUFBVSxDQUFDO1lBRWpELElBQUlGLGdCQUFnQkYsWUFBWTtnQkFDOUIsT0FBTztZQUNUO1lBRUEsT0FBTyxPQUFPLCtDQUErQztRQUMvRDtJQUNGO0FBQ0YsR0FBRyIsInNvdXJjZXMiOlsiL1VzZXJzL2FudGhvbnluZ3V5ZW4vRG9jdW1lbnRzL0dpdEh1Yi9wYXRpZW50am91cm5hbC1waHlzaWNpYW4tcG9ydGFsL2F1dGgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gJ25leHQtYXV0aCc7XG5pbXBvcnQgR29vZ2xlIGZyb20gJ25leHQtYXV0aC9wcm92aWRlcnMvZ29vZ2xlJztcbmltcG9ydCBLZXljbG9hayBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2tleWNsb2FrJztcbmltcG9ydCBPa3RhIGZyb20gJ25leHQtYXV0aC9wcm92aWRlcnMvb2t0YSc7XG5pbXBvcnQgdHlwZSB7IFByb3ZpZGVyIH0gZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycyc7XG5cblxuY29uc3QgcHJvdmlkZXJzOiBQcm92aWRlcltdID0gW1xuICBHb29nbGUoe1xuICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX0lELFxuICAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9TRUNSRVQsXG4gIH0pLFxuXG4gIEtleWNsb2FrKHtcbiAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuS0VZQ0xPQUtfQ0xJRU5UX0lELFxuICAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuS0VZQ0xPQUtfQ0xJRU5UX1NFQ1JFVCxcblx0XHRpc3N1ZXI6IHByb2Nlc3MuZW52LktFWUNMT0FLX0lTU1VFUixcbiAgfSksXG5cbiAgT2t0YSh7XG4gICAgY2xpZW50SWQ6IHByb2Nlc3MuZW52Lk9LVEFfQ0xJRU5UX0lELFxuICAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuT0tUQV9DTElFTlRfU0VDUkVULFxuXHRcdGlzc3VlcjogcHJvY2Vzcy5lbnYuT0tUQV9JU1NVRVIsXG4gIH0pLFxuXTtcblxuaWYoIXByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfSUQpIHsgXG4gIGNvbnNvbGUud2FybignTWlzc2luZyBlbnZpcm9ubWVudCB2YXJpYWJsZSBcIkdPT0dMRV9DTElFTlRfSURcIicpO1xufVxuaWYoIXByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfU0VDUkVUKSB7XG4gIGNvbnNvbGUud2FybignTWlzc2luZyBlbnZpcm9ubWVudCB2YXJpYWJsZSBcIkdPT0dMRV9DTElFTlRfU0VDUkVUXCInKTtcbn1cbmlmKCFwcm9jZXNzLmVudi5LRVlDTE9BS19DTElFTlRfSUQpIHsgXG4gIGNvbnNvbGUud2FybignTWlzc2luZyBlbnZpcm9ubWVudCB2YXJpYWJsZSBcIktFWUNMT0FLX0NMSUVOVF9JRFwiJyk7XG59XG5pZighcHJvY2Vzcy5lbnYuS0VZQ0xPQUtfQ0xJRU5UX1NFQ1JFVCkge1xuICBjb25zb2xlLndhcm4oJ01pc3NpbmcgZW52aXJvbm1lbnQgdmFyaWFibGUgXCJLRVlDTE9BS19DTElFTlRfU0VDUkVUXCInKTtcbn1cbmlmKCFwcm9jZXNzLmVudi5LRVlDTE9BS19JU1NVRVIpIHtcbiAgY29uc29sZS53YXJuKCdNaXNzaW5nIGVudmlyb25tZW50IHZhcmlhYmxlIFwiS0VZQ0xPQUtfSVNTVUVSXCInKTtcbn1cbmlmKCFwcm9jZXNzLmVudi5PS1RBX0NMSUVOVF9JRCkgeyBcbiAgY29uc29sZS53YXJuKCdNaXNzaW5nIGVudmlyb25tZW50IHZhcmlhYmxlIFwiT0tUQV9DTElFTlRfSURcIicpO1xufVxuaWYoIXByb2Nlc3MuZW52Lk9LVEFfQ0xJRU5UX1NFQ1JFVCkge1xuICBjb25zb2xlLndhcm4oJ01pc3NpbmcgZW52aXJvbm1lbnQgdmFyaWFibGUgXCJPS1RBX0NMSUVOVF9TRUNSRVRcIicpO1xufVxuaWYoIXByb2Nlc3MuZW52Lk9LVEFfSVNTVUVSKSB7XG4gIGNvbnNvbGUud2FybignTWlzc2luZyBlbnZpcm9ubWVudCB2YXJpYWJsZSBcIk9LVEFfSVNTVUVSXCInKTtcbn1cblxuXG5leHBvcnQgY29uc3QgcHJvdmlkZXJNYXAgPSBwcm92aWRlcnMubWFwKChwcm92aWRlcikgPT4ge1xuICBpZiAodHlwZW9mIHByb3ZpZGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3QgcHJvdmlkZXJEYXRhID0gcHJvdmlkZXIoKTtcbiAgICAgIHJldHVybiB7IGlkOiBwcm92aWRlckRhdGEuaWQsIG5hbWU6IHByb3ZpZGVyRGF0YS5uYW1lIH07XG4gIH1cbiAgcmV0dXJuIHsgaWQ6IHByb3ZpZGVyLmlkLCBuYW1lOiBwcm92aWRlci5uYW1lIH07XG59KTtcblxuZXhwb3J0IGNvbnN0IHsgaGFuZGxlcnMsIGF1dGgsIHNpZ25Jbiwgc2lnbk91dCB9ID0gTmV4dEF1dGgoe1xuICBwcm92aWRlcnMsXG4gIFxuICBcbiAgICAgIFxuICBzZWNyZXQ6IHByb2Nlc3MuZW52LkFVVEhfU0VDUkVULFxuICBwYWdlczoge1xuICAgIHNpZ25JbjogJy9hdXRoL3NpZ25pbicsXG4gIH0sXG4gIGNhbGxiYWNrczoge1xuICAgIGF1dGhvcml6ZWQoeyBhdXRoOiBzZXNzaW9uLCByZXF1ZXN0OiB7IG5leHRVcmwgfSB9KSB7XG4gICAgICBjb25zdCBpc0xvZ2dlZEluID0gISFzZXNzaW9uPy51c2VyO1xuICAgICAgY29uc3QgaXNQdWJsaWNQYWdlID0gbmV4dFVybC5wYXRobmFtZS5zdGFydHNXaXRoKCcvcHVibGljJyk7XG5cbiAgICAgIGlmIChpc1B1YmxpY1BhZ2UgfHwgaXNMb2dnZWRJbikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlOyAvLyBSZWRpcmVjdCB1bmF1dGhlbnRpY2F0ZWQgdXNlcnMgdG8gbG9naW4gcGFnZVxuICAgIH0sXG4gIH0sXG59KTtcbiAgIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiR29vZ2xlIiwiS2V5Y2xvYWsiLCJPa3RhIiwicHJvdmlkZXJzIiwiY2xpZW50SWQiLCJwcm9jZXNzIiwiZW52IiwiR09PR0xFX0NMSUVOVF9JRCIsImNsaWVudFNlY3JldCIsIkdPT0dMRV9DTElFTlRfU0VDUkVUIiwiS0VZQ0xPQUtfQ0xJRU5UX0lEIiwiS0VZQ0xPQUtfQ0xJRU5UX1NFQ1JFVCIsImlzc3VlciIsIktFWUNMT0FLX0lTU1VFUiIsIk9LVEFfQ0xJRU5UX0lEIiwiT0tUQV9DTElFTlRfU0VDUkVUIiwiT0tUQV9JU1NVRVIiLCJjb25zb2xlIiwid2FybiIsInByb3ZpZGVyTWFwIiwibWFwIiwicHJvdmlkZXIiLCJwcm92aWRlckRhdGEiLCJpZCIsIm5hbWUiLCJoYW5kbGVycyIsImF1dGgiLCJzaWduSW4iLCJzaWduT3V0Iiwic2VjcmV0IiwiQVVUSF9TRUNSRVQiLCJwYWdlcyIsImNhbGxiYWNrcyIsImF1dGhvcml6ZWQiLCJzZXNzaW9uIiwicmVxdWVzdCIsIm5leHRVcmwiLCJpc0xvZ2dlZEluIiwidXNlciIsImlzUHVibGljUGFnZSIsInBhdGhuYW1lIiwic3RhcnRzV2l0aCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./auth.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextAuth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextAuth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextAuth%5D%2Froute.ts&appDir=%2FUsers%2Fanthonynguyen%2FDocuments%2FGitHub%2Fpatientjournal-physician-portal%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fanthonynguyen%2FDocuments%2FGitHub%2Fpatientjournal-physician-portal&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextAuth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextAuth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextAuth%5D%2Froute.ts&appDir=%2FUsers%2Fanthonynguyen%2FDocuments%2FGitHub%2Fpatientjournal-physician-portal%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fanthonynguyen%2FDocuments%2FGitHub%2Fpatientjournal-physician-portal&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_anthonynguyen_Documents_GitHub_patientjournal_physician_portal_app_api_auth_nextAuth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextAuth]/route.ts */ \"(rsc)/./app/api/auth/[...nextAuth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextAuth]/route\",\n        pathname: \"/api/auth/[...nextAuth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextAuth]/route\"\n    },\n    resolvedPagePath: \"/Users/anthonynguyen/Documents/GitHub/patientjournal-physician-portal/app/api/auth/[...nextAuth]/route.ts\",\n    nextConfigOutput,\n    userland: _Users_anthonynguyen_Documents_GitHub_patientjournal_physician_portal_app_api_auth_nextAuth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dEF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0QXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0QXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmFudGhvbnluZ3V5ZW4lMkZEb2N1bWVudHMlMkZHaXRIdWIlMkZwYXRpZW50am91cm5hbC1waHlzaWNpYW4tcG9ydGFsJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmFudGhvbnluZ3V5ZW4lMkZEb2N1bWVudHMlMkZHaXRIdWIlMkZwYXRpZW50am91cm5hbC1waHlzaWNpYW4tcG9ydGFsJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUN5RDtBQUN0STtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2FudGhvbnluZ3V5ZW4vRG9jdW1lbnRzL0dpdEh1Yi9wYXRpZW50am91cm5hbC1waHlzaWNpYW4tcG9ydGFsL2FwcC9hcGkvYXV0aC9bLi4ubmV4dEF1dGhdL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL1suLi5uZXh0QXV0aF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL1suLi5uZXh0QXV0aF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvWy4uLm5leHRBdXRoXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9hbnRob255bmd1eWVuL0RvY3VtZW50cy9HaXRIdWIvcGF0aWVudGpvdXJuYWwtcGh5c2ljaWFuLXBvcnRhbC9hcHAvYXBpL2F1dGgvWy4uLm5leHRBdXRoXS9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextAuth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextAuth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextAuth%5D%2Froute.ts&appDir=%2FUsers%2Fanthonynguyen%2FDocuments%2FGitHub%2Fpatientjournal-physician-portal%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fanthonynguyen%2FDocuments%2FGitHub%2Fpatientjournal-physician-portal&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/server/app-render/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:buffer":
/*!******************************!*\
  !*** external "node:buffer" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@auth","vendor-chunks/oauth4webapi","vendor-chunks/jose","vendor-chunks/next-auth","vendor-chunks/preact","vendor-chunks/cookie","vendor-chunks/preact-render-to-string","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextAuth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextAuth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextAuth%5D%2Froute.ts&appDir=%2FUsers%2Fanthonynguyen%2FDocuments%2FGitHub%2Fpatientjournal-physician-portal%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fanthonynguyen%2FDocuments%2FGitHub%2Fpatientjournal-physician-portal&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();