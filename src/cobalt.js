
(function () {
    'use strict';
    
    var HOST = (location.hostname || '').toLowerCase();
    function isLootDomain(h) {
        return h.indexOf('lootlabs.gg') !== -1
            || h.indexOf('lootdest.org') !== -1
            || h.indexOf('lootdest.com') !== -1
            || h.indexOf('loot-link.com') !== -1
            || h.indexOf('lootlinks.com') !== -1
            || h.indexOf('loot-links.com') !== -1
            || h.indexOf('ultra-links.net') !== -1
            || h.indexOf('lootboost.net') !== -1
            || h.indexOf('fast-links.org') !== -1
            || h.indexOf('loot-reward.com') !== -1;
    }
    var IS_LOOTLABS = isLootDomain(HOST);
    var IS_REKONISE = HOST.indexOf('rekonise.com') !== -1;
    var IS_LOCKR = HOST.indexOf('lockr.') !== -1;
    var IS_SHORTFLY = HOST.indexOf('shrtslug.biz') !== -1 || HOST.indexOf('biovetro.net') !== -1 || HOST.indexOf('technons.com') !== -1 || HOST.indexOf('yrtourguide.com') !== -1 || HOST.indexOf('tournguide.com') !== -1;
    var IS_BSTSHRT = HOST.indexOf('bstshrt.com') !== -1 || HOST.indexOf('bst.gg') !== -1 || HOST.indexOf('booo.st') !== -1 || HOST.indexOf('mboost.me') !== -1;
    var IS_LINKVERTISE = HOST.indexOf('linkvertise.com') !== -1;
    var IS_OUO = HOST.indexOf('ouo.io') !== -1 || HOST.indexOf('ouo.press') !== -1;
    var IS_S4U = HOST.indexOf('sub4unlock') !== -1 || HOST.indexOf('subfinal.com') !== -1 || HOST.indexOf('sub2unlock') !== -1 || HOST.indexOf('ytsubme') !== -1;
    var IS_BOOST = HOST.indexOf('boost.ink') !== -1;
    var IS_WORKINK = HOST.indexOf('work.ink') !== -1;
    var IS_DLINK = HOST.indexOf('clictune.com') !== -1 || HOST.indexOf('dlink') !== -1;
    var IS_ONESHORT = HOST.indexOf('1shortlink.com') !== -1 || HOST.indexOf('1short.io') !== -1 || HOST.indexOf('link1s.com') !== -1;
    if (!IS_LOOTLABS && !IS_REKONISE && !IS_LOCKR && !IS_SHORTFLY && !IS_BSTSHRT && !IS_LINKVERTISE && !IS_OUO && !IS_S4U && !IS_BOOST && !IS_WORKINK && !IS_DLINK && !IS_ONESHORT) return;
    if (window.self !== window.top) {
        if (!isLootDomain(HOST) && HOST.indexOf('rekonise.com') === -1 && HOST.indexOf('lockr.') === -1 && !IS_SHORTFLY && HOST.indexOf('bstshrt.com') === -1 && HOST.indexOf('linkvertise.com') === -1 && !IS_OUO && !IS_S4U && !IS_BOOST && !IS_WORKINK && !IS_DLINK && !IS_ONESHORT) return;
        if (window.innerWidth <= 1 && window.innerHeight <= 1) return;
    }
    if (window.__cobalt_lb_active) return;
    window.__cobalt_lb_active = true;

    (function () {
        function guard(ev) {
            try {
                var root = (ui.root && ui.root.isConnected) ? ui.root : q('az-ui');
                if (!root) return;
                var t = ev.target;
                if (t && t.closest && t.closest('#az-ui')) {
                    ev.stopImmediatePropagation();
                    ev.stopPropagation();
                    if (t.closest('#az-primary')) { ev.preventDefault(); if (typeof primaryAction === 'function') primaryAction(); return; }
                    if (t.closest('#az-refresh')) { ev.preventDefault(); window.location.reload(); return; }
                }
            } catch (e) {}
        }
        function guardPass(ev) {
            try {
                var root = (ui.root && ui.root.isConnected) ? ui.root : q('az-ui');
                if (!root) return;
                var t = ev.target;
                if (t && t.closest && t.closest('#az-ui')) {
                    ev.stopImmediatePropagation();
                    ev.stopPropagation();
                }
            } catch (e) {}
        }
        ['window', 'document'].forEach(function (nodeRef) {
            (nodeRef === 'window' ? window : document).addEventListener('click', guard, true);
        });
        ['mousedown', 'mouseup', 'pointerdown', 'pointerup', 'auxclick', 'contextmenu', 'touchstart', 'touchend'].forEach(function (type) {
            ['window', 'document'].forEach(function (nodeRef) {
                (nodeRef === 'window' ? window : document).addEventListener(type, guardPass, true);
            });
        });
    })();

    function q(id){return document.getElementById(id)}
    function el(tag){return document.createElement(tag)}
    function ts(){return (new Date()).getTime()}

    var state = { url: location.href, hostname: location.hostname, domain: IS_LOCKR ? 'lockr' : (IS_REKONISE ? 'rekonise' : (IS_BSTSHRT ? 'bstshrt' : (IS_LINKVERTISE ? 'linkvertise' : (IS_OUO ? 'ouo' : (IS_S4U ? 'sub4unlock' : (IS_BOOST ? 'boost' : (IS_WORKINK ? 'workink' : (IS_DLINK ? 'dlink' : (IS_ONESHORT ? '1shortlink' : 'lootlabs'))))))))), sessionId: Math.random().toString(36).slice(2, 15), scriptVersion: '1.0.0', startedAt: (new Date()).toISOString() };
    function log(k,v){try{state[k]=v}catch(e){}}

    function lapse(ms){return new Promise(function(res){setTimeout(res,ms)})}

    
    function te() {
        return {
            minimumTimeLootlabs: GM_getValue('minimumTimeLootlabs', 10),
            openNewTab: GM_getValue('openNewTab', true),
            accentColor: GM_getValue('accentColor', '#8b5cf6')
        };
    }
    function parseHex(h) {
        var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(String(h || '').trim());
        if (!m) return [139, 92, 246];
        return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
    }
    function minWait() { return te().minimumTimeLootlabs; }
    function isTop() { return window.self === window.top; }

    
    function purge() {
        var de = document.documentElement;
        de.innerHTML = '';
        de.appendChild(document.createElement('head'));
        de.appendChild(document.createElement('body'));
    }

    
    var timeEl = null, markStart = null, timerId = null;
    function fmtMs(ms) { return (Math.max(0, ms | 0) / 1000).toFixed(1) + 's'; }
    function getTimeEl() {
        if (timeEl && timeEl.isConnected) return timeEl;
        timeEl = q('az-time');
        return timeEl;
    }
    function startTimer() {
        if (timerId) return;
        markStart = ts();
        var t = function () {
            var e = getTimeEl();
            if (e) e.textContent = 'Time Taken: ' + fmtMs(ts() - markStart);
        };
        t();
        timerId = setInterval(t, 100);
    }
    function stopTimer() {
        if (timerId) { clearInterval(timerId); timerId = null; }
        if (markStart != null) {
            var ms = ts() - markStart;
            var e = getTimeEl();
            if (e) e.textContent = 'Time Taken: ' + fmtMs(ms);
            log('elapsedMs', ms);
            return fmtMs(ms);
        }
        return null;
    }

    
    var ui = {}, primaryAction = null, accentColor = '#8b5cf6', lastStatus = null, lastPrimary = null, lastText = null, wdTimer = null;
    function setStatus(msg) {
        lastStatus = msg;
        var st = (ui.status && ui.status.isConnected) ? ui.status : q('az-status');
        if (!st) { buildUI(); st = q('az-status'); if (!st) return; }
        ui.status = st;
        st.textContent = msg || '';
        st.style.display = msg ? 'block' : 'none';
        if (msg === 'Bypass completed!') setSpinner(false);
    }
    function setSpinner(on) {
        var e = (ui.spin && ui.spin.isConnected) ? ui.spin : q('az-spin');
        if (!e) { buildUI(); e = q('az-spin'); }
        if (e) { ui.spin = e; e.style.display = on ? 'block' : 'none'; }
    }
    function setPrimary(label, action) {
        lastPrimary = label ? { label: label, action: action || null } : null;
        var pb = (ui.primary && ui.primary.isConnected) ? ui.primary : q('az-primary');
        if (!pb) { buildUI(); pb = q('az-primary'); if (!pb) return; }
        ui.primary = pb;
        primaryAction = action || null;
        pb.textContent = label || '';
        pb.style.display = label ? 'block' : 'none';
    }
    function setRefresh(on) {
        var e = (ui.refresh && ui.refresh.isConnected) ? ui.refresh : q('az-refresh');
        if (e) { ui.refresh = e; e.style.display = on ? 'block' : 'none'; }
    }
    function ensureUI() {
        return new Promise(function (res) {
            buildUI();
            if (q('az-ui') && q('az-ui').isConnected) return res();
            var iv = setInterval(function () {
                if (q('az-ui') && q('az-ui').isConnected) { clearInterval(iv); res(); }
            }, 40);
        });
    }

    function buildUI() {
        var ex = q('az-ui');
        if (ex) {
            if (ex.isConnected) return;
            ex.remove();
        }
        if (!document.body) {
            var waitBody = setInterval(function () {
                if (document.body) { clearInterval(waitBody); buildUI(); }
            }, 50);
            return;
        }
        var rSt = lastStatus, rPri = lastPrimary, rTb = lastText;
        accentColor = te().accentColor || '#8b5cf6';
        var rgb = parseHex(accentColor);
        var rgbStr = rgb.join(',');

        if (!q('az-font')) {
            var link = el('link');
            link.id = 'az-font';
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
            document.head.appendChild(link);
        }

        var css = el('style');
        css.textContent = [
            '#az-ui,#az-ui *{font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;-webkit-user-select:auto;user-select:auto}',
            '@keyframes az-spin{to{transform:rotate(360deg)}}',
            '#az-ui{position:fixed;top:0;left:0;width:100%;height:100%;z-index:999999;display:flex;align-items:center;justify-content:center;background:#111111;color:#fff;overflow:hidden}',
            '#az-bg{display:none}',
            '#az-box{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:18px;width:100%;max-width:340px;padding:24px;text-align:center;pointer-events:auto}',
            '#az-title{font-size:40px;font-weight:600;letter-spacing:-0.02em;line-height:1.05;color:#ffffff}',
            '#az-spin{width:40px;height:40px;border-radius:50%;border:3px solid rgba(255,255,255,0.10);border-top-color:#ffffff;animation:az-spin .9s linear infinite;box-sizing:border-box}',
            '#az-status{min-height:20px;font-size:14px;color:#8a8a8a;display:none}',
            '#az-actions{display:flex;flex-direction:column;align-items:center;gap:12px;min-height:44px}',
            '.az-btn{appearance:none;border:1px solid #3a3a3a;cursor:pointer;font:inherit;font-size:14px;font-weight:500;letter-spacing:0.01em;color:#ffffff;background:#2b2b2b;padding:10px 22px;border-radius:999px;transition:background .12s ease,border-color .12s ease;display:none}',
            '.az-btn:hover{background:#3a3a3a;border-color:#4d4d4d}',
            '.az-btn:active{transform:scale(.98)}',
            '.az-btn:focus-visible{outline:3px solid ' + accentColor + ';outline-offset:4px}',
            '.az-btn.az-btn-ghost{background:transparent;color:#8a8a8a;border-color:#3a3a3a}',
            '.az-btn.az-btn-ghost:hover{color:#ffffff}',
            '#az-time{font-size:13px;color:#4d4d4d;font-variant-numeric:tabular-nums;letter-spacing:0.04em;pointer-events:none}',
'#az-time-wrap{padding:6px 14px;border-radius:999px;background:rgba(255,255,255,0.04);border:1px solid #222222}',
            '#az-textbox{display:none;width:100%;min-height:110px;max-height:200px;background:#1a1a1a;color:#e6e6e6;border:1px solid #3a3a3a;border-radius:10px;padding:10px;font:inherit;font-size:13px;line-height:1.5;resize:vertical;overflow:auto;text-align:left}',
            '#az-widget{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:9999990;width:420px;height:320px;max-width:calc(100vw - 40px);max-height:calc(100vh - 40px);background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,0.55);pointer-events:auto}',
            '#az-widget iframe{width:100%;height:100%;border:0;display:block}',
            '@media (prefers-reduced-motion:reduce){#az-spin{animation-duration:1.6s}}'
        ].join('\n');
        (document.head || document.documentElement).appendChild(css);

        var root = el('div');
        root.id = 'az-ui';
        var bg = el('div');
        bg.id = 'az-bg';
        var blob1 = el('div'); blob1.className = 'az-blob'; blob1.id = 'az-blob-1';
        var blob2 = el('div'); blob2.className = 'az-blob'; blob2.id = 'az-blob-2';
        var blob3 = el('div'); blob3.className = 'az-blob'; blob3.id = 'az-blob-3';
        bg.appendChild(blob1);
        bg.appendChild(blob2);
        bg.appendChild(blob3);
        var bgPat = el('div');
        bgPat.id = 'az-bg-pattern';
        bg.appendChild(bgPat);
        var box = el('div');
        box.id = 'az-box';

        var title = el('div'); title.id = 'az-title'; title.textContent = 'Cobalt';
        var status = el('div'); status.id = 'az-status';
        var spin = el('div'); spin.id = 'az-spin';
        var tb = el('textarea'); tb.id = 'az-textbox'; tb.readOnly = true;
        var actions = el('div'); actions.id = 'az-actions';
        var primary = el('button'); primary.id = 'az-primary'; primary.type = 'button'; primary.className = 'az-btn';
        var refresh = el('button'); refresh.id = 'az-refresh'; refresh.type = 'button'; refresh.className = 'az-btn az-btn-ghost'; refresh.textContent = 'Refresh';
        actions.appendChild(primary);
        actions.appendChild(refresh);
        var timel = el('div'); timel.id = 'az-time';
        var timeWrap = el('div');
        timeWrap.id = 'az-time-wrap';
        timeWrap.appendChild(timel);

        box.appendChild(title);
        box.appendChild(status);
        box.appendChild(spin);
        box.appendChild(tb);
        box.appendChild(actions);
        box.appendChild(timeWrap);
        root.appendChild(bg);
        root.appendChild(box);
        document.body.appendChild(root);

        ui.root = root; ui.box = box; ui.title = title; ui.status = status;
        ui.spin = spin; ui.tb = tb;
        ui.actions = actions; ui.primary = primary; ui.refresh = refresh; ui.time = timel;

        setStatus(null);
        setSpinner(true);
        setPrimary(null);
        setRefresh(false);

        primary.addEventListener('click', function (ev) {
            ev.stopImmediatePropagation();
            if (typeof primaryAction === 'function') primaryAction();
        }, true);
        refresh.addEventListener('click', function (ev) {
            ev.stopImmediatePropagation();
            window.location.reload();
        }, true);

        startTimer();

        if (rSt !== null) setStatus(rSt);
        if (rPri !== null) setPrimary(rPri.label, rPri.action);
        if (rTb) { var tbx = q('az-textbox'); if (tbx) { tbx.value = rTb; tbx.style.display = 'block'; ui.tb = tbx; } }
        if (!wdTimer) wdTimer = setInterval(function () {
            var r = q('az-ui');
            if (!r || !r.isConnected) buildUI();
        }, 700);
    }

    function failUI(msg) {
        setStatus(msg);
        setSpinner(false);
        setPrimary(null);
        setRefresh(true);
    }

function showText(t) {
        var tb = (ui.tb && ui.tb.isConnected) ? ui.tb : q('az-textbox');
        if (!tb) { buildUI(); tb = q('az-textbox'); }
        lastText = t;
        if (tb) { ui.tb = tb; tb.value = t; tb.style.display = 'block'; }
    }

    function Se(dest) {
        stopTimer();
        setSpinner(false);
        setRefresh(false);
        var isUrl = /^https?:\/\//i.test(dest);
        setStatus(isUrl ? 'Bypass completed!' : 'Content copied to clipboard!');
        if (!isUrl) showText(dest);
        setPrimary(isUrl ? 'Open Destination' : 'Copy Content', function () {
            if (isUrl) {
                if (!isTop()) { try { window.top.postMessage({ azl: true, url: dest }, '*'); } catch (e) {} }
                if (te().openNewTab) window.open(dest, '_blank', 'noopener');
                else window.location.href = dest;
            } else {
                copyLink(dest);
                setPrimary('Copied!', function () {});
            }
        });
    }

    
    var captchaTimer = null;
    function stopCaptchaWatch() {
        if (captchaTimer) { clearInterval(captchaTimer); captchaTimer = null; }
    }
    function isCloudflare(src) { return /cloudflare|cdn-cgi|challenges\.cloudflare|turnstile/i.test(src || ''); }
    function isHcaptcha(src) { return /hcaptcha|h-captcha|recaptcha|google\.com\/recaptcha/i.test(src || ''); }
    function autoConfirmCf(w) {
        if (!w) return false;
        var frames = w.querySelectorAll('iframe');
        for (var i = 0; i < frames.length; i++) {
            try {
                var d = frames[i].contentDocument;
                if (!d || !d.body) continue;
                var boxes = d.querySelectorAll('input[type="checkbox"], iframe[src*="turnstile"], [class*="turnstile"], [id*="turnstile"]');
                for (var j = 0; j < boxes.length; j++) { boxes[j].click(); return true; }
                var btns = d.querySelectorAll('button, input[type="submit"], [role="button"], [role="link"]');
                for (var k = 0; k < btns.length; k++) {
                    var tx = String(btns[k].textContent || btns[k].value || '').toLowerCase();
                    if (/confirm|continue|verify|i am human|not a robot|proceed|submit/i.test(tx)) { btns[k].click(); return true; }
                }
            } catch (e) {}
        }
        return false;
    }
    function startCaptchaWatch() {
        stopCaptchaWatch();
        var started = ts();
        captchaTimer = setInterval(function () {
            var w = document.getElementById('az-widget');
            if (!w) { stopCaptchaWatch(); return; }
            var f = w.querySelector('iframe');
            var src = (f && f.src) || '';
            if (isCloudflare(src)) {
                if (autoConfirmCf(w)) return;
                if (ts() - started > 5000) stopCaptchaWatch();
            } else if (isHcaptcha(src)) {
                stopCaptchaWatch();
            } else {
                if (autoConfirmCf(w)) return;
                stopCaptchaWatch();
            }
        }, 400);
    }

    function widget(url) {
        var old = document.getElementById('az-widget');
        if (old) old.remove();
        var w = el('div');
        w.id = 'az-widget';
        var f = el('iframe');
        f.src = url;
        f.frameBorder = '0';
        w.appendChild(f);
        document.body.appendChild(w);
        startCaptchaWatch();
        return w;
    }

    function atobXor(s, keyLen) {
        keyLen = keyLen || 5;
        var a = atob(s);
        var k = a.substring(0, keyLen);
        var b = a.substring(keyLen);
        var out = '';
        for (var i = 0; i < b.length; i++) out += String.fromCharCode(b.charCodeAt(i) ^ k.charCodeAt(i % k.length));
        return out;
    }


    
    async function run() {
        await new Promise(function (res) {
            var tries = 0;
            var iv = setInterval(function () {
                var s = el('script');
                s.textContent = "document.documentElement.setAttribute('data-ll-p-ready', (typeof p !== 'undefined' && p && p.TID) ? '1' : '0');";
                document.documentElement.appendChild(s);
                s.remove();
                if ('1' === document.documentElement.getAttribute('data-ll-p-ready') || ++tries > 100) { clearInterval(iv); res(); }
            }, 100);
        });

        var rs = el('script');
        rs.textContent = "document.documentElement.setAttribute('data-ll-p', (typeof p !== 'undefined' && p) ? JSON.stringify(p) : 'null');";
        document.documentElement.appendChild(rs);
        rs.remove();
        var raw = document.documentElement.getAttribute('data-ll-p');
        var n = null;
        try { n = raw ? JSON.parse(raw) : null; } catch (e) {}
        if (!n) return;
        log('lootlabs_pData', n);

        await new Promise(function (res) {
            var tries = 0;
            var iv = setInterval(function () {
                var s = el('script');
                s.textContent = "document.documentElement.setAttribute('data-ll-botd-ready', document.botd ? '1' : '0');";
                document.documentElement.appendChild(s);
                s.remove();
                if ('1' === document.documentElement.getAttribute('data-ll-botd-ready') || ++tries > 50) {
                    clearInterval(iv);
                    var d = el('script');
                    d.textContent = "\n document.documentElement.setAttribute('data-ll-botd', JSON.stringify(document.botd || null));\n document.documentElement.setAttribute('data-ll-botds', document.session || '');\n";
                    document.documentElement.appendChild(d);
                    d.remove();
                    res();
                }
            }, 200);
        });

        if (document.documentElement.getAttribute('data-ll-botds')) {
            var sv = el('script');
            sv.textContent = "navigator.sendBeacon && navigator.sendBeacon('/verify', JSON.stringify({ session: document.session }));";
            document.documentElement.appendChild(sv);
            sv.remove();
        }

        purge();
        buildUI();

        setStatus('Waiting 10 seconds before bypass');
        await new Promise(function (res) {
            var left = 10, done = false, tick;
            setPrimary('Skip wait', function () {
                if (done) return;
                done = true;
                clearInterval(tick);
                setPrimary(null);
                res();
            });
            tick = setInterval(function () {
                if (done) return;
                if (--left <= 0) { clearInterval(tick); setPrimary(null); res(); }
            }, 1000);
        });

        
        var resp = await fetch('//' + n.CDN_DOMAIN + '/?tid=' + n.TID + '&params_only=1');
        var listTxt = '[' + (await resp.text()).slice(1, -2) + ']';
        var s = JSON.parse(listTxt);
        log('lootlabs_llJson', s);

        var tcUrl = 'https://' + s[29] + '/tc';
        var d = String(Math.floor(Math.random() * 9 + 1) + Array(16).fill().map(function () { return Math.floor(Math.random() * 10); }).join('') + Math.floor(Math.random() * 10));
        var u = null;
        try { u = localStorage.getItem('ll_cookie_id'); } catch (e) {}
        if (!u) {
            u = String(Math.floor(Math.random() * 9e8) + 1e8);
            try { localStorage.setItem('ll_cookie_id', u); } catch (e) {}
        }

        var taboola = '';
        try {
            var tvRaw = localStorage.getItem('taboola_user_sync');
            if (tvRaw) {
                var tvObj = JSON.parse(tvRaw);
                if (tvObj.expiry && (new Date()).getTime() <= tvObj.expiry) taboola = tvObj.value;
            }
        } catch (e) {}

        var body = {
            tid: n.TID,
            bl: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53],
            session: d,
            max_tasks: 1,
            design_id: 135,
            cur_url: window.location.href,
            doc_ref: document.referrer,
            tier_id: n.TIER_ID,
            num_of_tasks: '1',
            is_loot: true,
            rkey: n.KEY,
            cookie_id: u,
            offer: n.OFFER || '0',
            ver: 'v1',
            test_unlocker_app: -1,
            allow_unlocker: true,
            show_unlocker: false !== n.SHOW_UNLOCKER,
            desktop_design: 0,
            unlocker_only: 0,
            additional_info: {}
        };

        var bd = document.documentElement.getAttribute('data-ll-botd');
        if (bd && 'null' !== bd) body.botd = bd;
        var bds = document.documentElement.getAttribute('data-ll-botds');
        if (bds) body.botds = bds;
        body.taboola_user_sync = taboola;
        var pu = null;
        try { pu = new URLSearchParams(window.location.search).get('puid'); } catch (e) {}
        if (pu) body.puid = pu;

        var postBody = JSON.stringify(body);
        var tcScript = el('script');
        tcScript.textContent = '\n (async () => {\n  try {\n   window.__azTcGate = true;\n   const resp = await fetch(' + JSON.stringify(tcUrl) + ', {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    credentials: "include",\n    mode: "cors",\n    redirect: "follow",\n    body: ' + JSON.stringify(postBody) + '\n   });\n   const text = await resp.text();\n   document.documentElement.setAttribute("data-ll-tc-status", String(resp.status));\n   document.documentElement.setAttribute("data-ll-tc-response", text);\n  } catch(e) {\n   document.documentElement.setAttribute("data-ll-tc-status", "error");\n   document.documentElement.setAttribute("data-ll-tc-response", e.message);\n  }\n })();\n';
        document.documentElement.appendChild(tcScript);
        tcScript.remove();

        var yr = await new Promise(function (res) {
            var iv = setInterval(function () {
                var st = document.documentElement.getAttribute('data-ll-tc-status');
                if (st) { clearInterval(iv); res({ status: st, response: document.documentElement.getAttribute('data-ll-tc-response') }); }
            }, 100);
        });

        async function fail(errMsg, statusCode) {
            try { localStorage.clear(); } catch (e) {}
            try { sessionStorage.clear(); } catch (e) {}
            try {
                document.cookie.split(';').forEach(function (ck) {
                    var part = ck.split('=')[0].trim();
                    document.cookie = part + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
                    document.cookie = part + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + location.hostname;
                    document.cookie = part + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + location.hostname;
                });
            } catch (e) {}
            failUI(errMsg + ', refreshing...');
            await lapse((statusCode === 429 || statusCode === 403 || statusCode >= 500) ? 2500 : 1500);
            window.location.reload();
        }

        if ('200' !== yr.status) return void (await fail('Request failed (' + yr.status + ')', parseInt(yr.status, 10)));
        var k;
        try { k = JSON.parse(yr.response); } catch (e) { return void (await fail('Invalid response')); }
        log('lootlabs_categories', k);
        if (!k || !k.length) return void (await fail('No tasks available'));

        k.filter(function (tk) { return 41 !== tk.task_id && tk.postback_url; }).forEach(function (tk) {
            var pb = tk.postback_url;
            GM_xmlhttpRequest({
                method: 'GET',
                url: pb,
                headers: { Accept: '*/*', 'Accept-Language': 'en-GB,en;q=0.9', Referer: location.origin + '/', Origin: location.origin },
                onload: function (e) { console.log('[NEBULA] Postback sent:', pb, '| status:', e.status); },
                onerror: function (e) { console.log('[NEBULA] Postback failed:', pb, e); }
            });
        });

        k = k.filter(function (tk) { return 41 === tk.task_id; });
        log('lootlabs_categories_filtered', k);
        if (!k.length) return void (await fail('Required task not available'));

        var needAll = function () { return k.length >= 1 && (qsDone.size >= k.length || (Number(k[0].test_choose) === 1 && qsDone.size >= 2)); };
        var urids = k.map(function (tk) { return tk.urid; });
        var cats = k.map(function (tk) { return tk.task_id; });
        var sessionId = String(k[0].urid);
        var C = Number(sessionId.substr(-5)) % 3;
        var server = s[9];
        var base = 'https://' + C + '.' + server;
        var syncer = s[29];
        var I = k[0].session_id || d;

        for (var i1 = 0; i1 < k.length; i1++) {
            var t1 = k[i1];
            try {
                var b1 = el('script');
                b1.textContent = 'navigator.sendBeacon && navigator.sendBeacon(' + JSON.stringify('https://enaightdecipie.com?event=task_clicked&session_id=' + I + '&info=' + (i1 + 1)) + ');';
                document.documentElement.appendChild(b1);
                b1.remove();
            } catch (e) {}
            try {
                var b2 = el('script');
                b2.textContent = 'navigator.sendBeacon && navigator.sendBeacon(' + JSON.stringify(base + '/st?uid=' + t1.urid + '&cat=' + t1.task_id) + ');';
                document.documentElement.appendChild(b2);
                b2.remove();
            } catch (e) {}
            if (41 === t1.task_id && t1.ad_url) widget(t1.ad_url);
        }

        for (var i2 = 0; i2 < k.length; i2++) {
            var t2 = k[i2];
            if (void 0 !== t2.auto_complete_seconds) {
                (function (uid, sec) {
                    setTimeout(function () {
                        try {
                            var b3 = el('script');
                            b3.textContent = 'navigator.sendBeacon && navigator.sendBeacon(' + JSON.stringify(base + '/p?uid=' + uid) + ');';
                            document.documentElement.appendChild(b3);
                            b3.remove();
                        } catch (e) {}
                    }, sec * 1000);
                })(t2.urid, t2.auto_complete_seconds);
            }
        }

        var wsUrl = 'wss://' + C + '.' + server + '/c?uid=' + urids.join(',') + '&cat=' + cats.join(',') + '&key=' + n.KEY + '&session_id=' + I + '&is_loot=1&tid=' + n.TID;

        var wsScript = el('script');
        wsScript.textContent = '\n (function() {\n  var ws = new WebSocket(' + JSON.stringify(wsUrl) + ');\n  ws.onopen = function() {\n   setTimeout(function() {\n    ws.send(\'0\');\n    setInterval(function() { ws.send(\'0\'); }, 10000);\n   }, 10000);\n  };\n  ws.onmessage = function(e) {\n   document.documentElement.setAttribute(\'data-ll-ws-msg\', e.data);\n   document.documentElement.dispatchEvent(new CustomEvent(\'ll-ws-msg\'));\n  };\n  ws.onerror = function() {\n   document.documentElement.setAttribute(\'data-ll-ws-state\', \'closed\');\n   document.documentElement.dispatchEvent(new CustomEvent(\'ll-ws-state\'));\n  };\n  ws.onclose = function() {\n   document.documentElement.setAttribute(\'data-ll-ws-state\', \'closed\');\n   document.documentElement.dispatchEvent(new CustomEvent(\'ll-ws-state\'));\n  };\n })();\n';
        document.documentElement.appendChild(wsScript);
        wsScript.remove();

        var qsDone = new Set();
        var revealed = false;
        var dest = null;
        var lostTimer = null;
        var timeoutTimer = null;

        function finish(url) {
            if (revealed) return;
            revealed = true;
            stopCaptchaWatch();
            if (lostTimer) clearTimeout(lostTimer);
            if (timeoutTimer) clearTimeout(timeoutTimer);
            Se(url);
        }

        document.documentElement.addEventListener('ll-ws-state', function () {
            if ('closed' === document.documentElement.getAttribute('data-ll-ws-state')) {
                if (!lostTimer) lostTimer = setTimeout(function () {
                    if (!revealed) failUI('Connection lost. Please refresh.');
                }, 55000);
            }
        });

        document.documentElement.addEventListener('ll-ws-msg', function () {
            var msg = document.documentElement.getAttribute('data-ll-ws-msg');
            if (!msg) return;
            if (msg.indexOf('r:') === 0) {
                dest = msg.slice(2);
                var decoded = atobXor(dest);
                if (decoded && needAll()) return void finish(decoded);
                return;
            }
            if ('Refresh Page' === msg) return void window.location.reload();
            var parts = msg.split(',');
            if (parts.length >= 2) {
                var uid = parts[0], cat = parts[1], ac = parts[2];
                qsDone.add(uid);
                var w = document.getElementById('az-widget');
                if (w) w.remove();
                try { localStorage.setItem('t_' + cat, JSON.stringify({ value: 1, expiry: null })); } catch (e) {}
                var td = 'https://' + syncer + '/td?ac=' + (ac || 'auto_complete') + '&urid=' + uid + '&&cat=' + cat + '&tid=' + n.TID;
                try {
                    var tdS = el('script');
                    tdS.textContent = 'fetch(' + JSON.stringify(td) + ', { method: "GET", redirect: "follow", credentials: "include", mode: "cors" }).then(function(r){ return r.text(); });';
                    document.documentElement.appendChild(tdS);
                    tdS.remove();
                } catch (e) {}
                if (needAll() && dest) {
                    var dd = atobXor(dest);
                    if (dd) finish(dd);
                }
            }
        });

        timeoutTimer = setTimeout(function () {
            if (!revealed) failUI('Bypass timed out. Please refresh.');
        }, 90000);
    }

    
    function rekoniseMain() {
        var pn = location.pathname;
        if (pn === '/' || pn === '') return;

        function rkFetch(method, url, data) {
            return new Promise(function (res) {
                var key = 'data-az-rk-' + Math.random().toString(36).slice(2, 9);
                var scr = el('script');
                scr.textContent = '(async function(){try{var r=await fetch(' + JSON.stringify(url) + ',{method:' + JSON.stringify(method) + ',credentials:"include",headers:{"Content-Type":"application/json","Accept":"application/json"},body:' + (data ? JSON.stringify(JSON.stringify(data)) : 'void 0') + '});var t=await r.text();document.documentElement.setAttribute(' + JSON.stringify(key + '-s') + ',String(r.status));document.documentElement.setAttribute(' + JSON.stringify(key + '-b') + ',t);}catch(e){document.documentElement.setAttribute(' + JSON.stringify(key + '-s') + ',"error");}})();';
                document.documentElement.appendChild(scr);
                scr.remove();
                var iv = setInterval(function () {
                    var s = document.documentElement.getAttribute(key + '-s');
                    if (s) {
                        clearInterval(iv);
                        res({ status: s, text: document.documentElement.getAttribute(key + '-b') || '' });
                    }
                }, 100);
            });
        }

        function finish(url) {
            try {
                log('rekonise_dest', url);
                stopTimer();
                setStatus('Bypass completed!');
                setSpinner(false);
                setRefresh(false);
                setPrimary('Open Destination', function () {
                    if (!isTop()) { try { window.top.postMessage({ azl: true, url: url }, '*'); } catch (e) {} }
                    if (te().openNewTab) window.open(url, '_blank', 'noopener');
                    else window.location.href = url;
                });
            } catch (e) {}
        }

        function update(msg) {
            try { setStatus(msg); } catch (e) {}
        }

        function pollState() {
            return new Promise(function (resolve) {
                var iv = setInterval(function () {
                    var st = document.getElementById('ng-state');
                    if (st) {
                        clearInterval(iv);
                        resolve(st.textContent);
                    }
                }, 200);
                setTimeout(function () { clearInterval(iv); resolve(null); }, 8000);
            });
        }

        function doUnlock(slug, token, attempt) {
            attempt = attempt || 0;
            var maxAttempts = 10;
            if (attempt >= maxAttempts) {
                update('Unlock failed. Please refresh.');
                return;
            }
            update('Waiting for completion, this can take up to 15 seconds.');
            rkFetch('GET', 'https://api.rekonise.com/social-unlocks/' + encodeURIComponent(slug) + '/unlock?token=' + encodeURIComponent(token)).then(function (resp) {
                try {
                    if (resp.status === '200') {
                        var body = JSON.parse(resp.text);
                        if (body.url) return finish(body.url);
                        if (body.snippet && body.snippet.content) return finish(body.snippet.content);
                        if (body.file) return finish(body.file);
                    }
                } catch (e) {}
                setTimeout(function () { doUnlock(slug, token, attempt + 1); }, 1000);
            });
        }

        (function () {
            buildUI();
            setStatus('Waiting 10 seconds before bypass');
            var startDone = false, startTick;
            setPrimary('Skip wait', function () {
                if (startDone) return;
                startDone = true;
                clearInterval(startTick);
                setPrimary(null);
                bypass();
            });
            var left = 10;
            startTick = setInterval(function () {
                if (startDone) return;
                left--;
                if (left <= 0) { clearInterval(startTick); setPrimary(null); bypass(); }
            }, 1000);

            async function bypass() {
                var stateText = await pollState();
                if (!stateText) {
                    setStatus('Page did not load. Please refresh.');
                    return;
                }

                var state;
                try { state = JSON.parse(stateText); } catch (e) {
                    setStatus('Failed to parse page state. Please refresh.');
                    return;
                }

                var slug = '';
                var unlockToken = '';
                var tasks = [];

                try {
                    for (var blockKey in state) {
                        for (var fieldKey in state[blockKey]) {
                            if (fieldKey === 'b') {
                                var b = state[blockKey][fieldKey];
                                if (b && typeof b === 'object') {
                                    if (typeof b.slug === 'string') slug = b.slug;
                                    if (typeof b.unlock_token === 'string') unlockToken = b.unlock_token;
                                    if (Array.isArray(b.actions)) {
                                        for (var j = 0; j < b.actions.length; j++) {
                                            var a = b.actions[j];
                                            if (a && a.type && a.value !== undefined) {
                                                tasks.push({ type: a.type, value: a.value, id: a.id });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } catch (e) {}

                if (!slug || !unlockToken) {
                    setStatus('Could not read page data. Please refresh.');
                    return;
                }

                log('rekonise_slug', slug);
                log('rekonise_tasks', tasks.length);

                if (tasks.length > 0) {
                    for (var k = 0; k < tasks.length; k++) {
                        var task = tasks[k];
                        try {
                            await rkFetch('POST', 'https://api.rekonise.com/traffic/action-completed', { actionType: task.type, actionValue: task.value, slug: slug });
                        } catch (e) {}
                    }
                }

                setStatus('Waiting for unlock, this can take 10-15 seconds.');
                await lapse(5000);
                doUnlock(slug, unlockToken, 0);
            }
        })();
    }

    
    function lokrMain() {
        var slug = location.pathname.split('/').filter(Boolean)[0];
        if (!slug) return;
        var isNet = location.hostname.toLowerCase().indexOf('lockr.net') !== -1;
        var domain = isNet ? 'lockr.net' : 'lockr.so';

        function finish(url) {
            try {
                log('lockr_dest', url);
                stopTimer();
                setStatus('Bypass completed!');
                setSpinner(false);
                setRefresh(false);
                setPrimary('Open Destination', function () {
                    if (!isTop()) { try { window.top.postMessage({ azl: true, url: url }, '*'); } catch (e) {} }
                    if (te().openNewTab) window.open(url, '_blank', 'noopener');
                    else window.location.href = url;
                });
            } catch (e) {}
        }

        function lkFetch(method, url, data) {
            return new Promise(function (res) {
                var key = 'data-az-lk-' + Math.random().toString(36).slice(2, 9);
                var scr = el('script');
                scr.textContent = '(async function(){try{var r=await fetch(' + JSON.stringify(url) + ',{method:' + JSON.stringify(method) + ',credentials:"include",headers:{"Content-Type":"application/json","Accept":"application/json"},body:' + (data ? JSON.stringify(JSON.stringify(data)) : 'void 0') + '});var t=await r.text();document.documentElement.setAttribute(' + JSON.stringify(key + '-s') + ',String(r.status));document.documentElement.setAttribute(' + JSON.stringify(key + '-b') + ',t);}catch(e){document.documentElement.setAttribute(' + JSON.stringify(key + '-s') + ',"error");}})();';
                document.documentElement.appendChild(scr);
                scr.remove();
                var iv = setInterval(function () {
                    var s = document.documentElement.getAttribute(key + '-s');
                    if (s) {
                        clearInterval(iv);
                        res({ status: s, text: document.documentElement.getAttribute(key + '-b') || '' });
                    }
                }, 100);
            });
        }

        function start() {
            buildUI();
            setStatus('Waiting 10 seconds before bypass');
            var startDone = false, startTick;
            setPrimary('Skip wait', function () {
                if (startDone) return;
                startDone = true;
                clearInterval(startTick);
                setPrimary(null);
                bypass();
            });
            var left = 10;
            startTick = setInterval(function () {
                if (startDone) return;
                left--;
                if (left <= 0) { clearInterval(startTick); setPrimary(null); bypass(); }
            }, 1000);

            async function bypass() {
                var capId = null, sessionId = null;
                try { capId = localStorage.getItem('lockr:capClientId'); } catch (e) {}
                for (var tries = 0; tries < 30 && !sessionId; tries++) {
                    try { sessionId = sessionStorage.getItem('lockr:lockerSession:' + slug); } catch (e) {}
                    if (!sessionId) await lapse(500);
                }
                if (!sessionId) {
                    setStatus('Session not ready. Please refresh.');
                    return;
                }

                var viewUrl = 'https://' + domain + '/api/v1/lockers/' + encodeURIComponent(slug) + '/view?lang=en-GB&cap_client_id=' + encodeURIComponent(capId || '') + '&session_id=' + encodeURIComponent(sessionId);
                var viewResp = await lkFetch('GET', viewUrl);
                var data;
                try {
                    data = JSON.parse(viewResp.text);
                    data = data.data || data;
                } catch (e) {
                    setStatus('Failed to fetch backend response. Please refresh.');
                    return;
                }
                var token = data.token, tasks = data.tasks, userId = data.user_id, sess = data.session_id, setup = data.setup;
                if (!token || !tasks || !tasks.length) {
                    setStatus('No tasks found. Please refresh.');
                    return;
                }

                log('lockr_tasks', tasks.length);
                for (var i = 0; i < tasks.length; i++) {
                    var ta = tasks[i];
                    var body = [{ taskId: ta.id, device: 'DESKTOP', country: 'GB', position: i + 1, network: ta.network, setup: setup, session_id: sess, cap_client_id: capId || null, pageId: slug, publisherId: userId }];
                    try { await lkFetch('POST', 'https://' + domain + '/' + encodeURIComponent(slug), body); } catch (e) {}
                }

                setStatus('Waiting for completion, this can take up to 35 seconds.');
                await new Promise(function (ok) {
                    var iv = setInterval(function () {
                        lkFetch('GET', 'https://' + domain + '/api/v1/lockers/' + encodeURIComponent(slug) + '/task?token=' + encodeURIComponent(token)).then(function (r) {
                            try {
                                var o = JSON.parse(r.text);
                                if (o.data && o.data.success === true) { clearInterval(iv); ok(); }
                            } catch (e) {}
                        });
                    }, 5000);
                    setTimeout(function () { clearInterval(iv); ok(); }, 90000);
                });

                var target = await new Promise(function (ok) {
                    var iv = setInterval(function () {
                        lkFetch('GET', 'https://' + domain + '/api/v1/lockers/' + encodeURIComponent(slug) + '/unlock?token=' + encodeURIComponent(token)).then(function (r) {
                            try {
                                var o = JSON.parse(r.text);
                                if (o.data && o.data.target) { clearInterval(iv); ok(o.data.target); }
                            } catch (e) {}
                        });
                    }, 5000);
                    setTimeout(function () { clearInterval(iv); ok(null); }, 120000);
                });
                if (target) finish(target);
                else setStatus('Failed to get final destination. Please refresh and retry.');
            }
        }

        if (document.readyState === 'complete') start();
        else window.addEventListener('load', start);
    }

    
    function Me(form) {
        if (!form) return;
        var t = form.querySelector('input[name="cf-turnstile-response"]');
        if (t && t.value && t.value.length > 0) return;
        var all = document.querySelectorAll('input[name="cf-turnstile-response"]');
        var o = '';
        for (var i = 0; i < all.length; i++) {
            if (all[i].value && all[i].value.length > 0) { o = all[i].value; break; }
        }
        if (o) {
            if (t) t.value = o;
            else {
                var inp = el('input');
                inp.type = 'hidden'; inp.name = 'cf-turnstile-response'; inp.value = o;
                form.appendChild(inp);
            }
        }
    }

    function surfaceTurnstile() {
        if (q('az-ts-css')) return;
        var s = el('style');
        s.id = 'az-ts-css';
        s.textContent = '.cf-turnstile,[data-turnstile]{position:fixed !important;z-index:10000000 !important;bottom:auto !important;left:50% !important;top:65% !important;right:auto !important;transform:translateX(-50%) !important;visibility:visible !important;opacity:1 !important;pointer-events:auto !important}iframe[src*="challenges.cloudflare.com"]{visibility:visible !important;opacity:1 !important;pointer-events:auto !important}';
        (document.head || document.documentElement).appendChild(s);
    }

    function copyLink(v) {
        try {
            var ta = el('textarea');
            ta.value = v;
            ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            ta.remove();
        } catch (e) {}
    }

    function postForm(action, token) {
        try {
            var f = el('form');
            f.method = 'POST'; f.action = action; f.target = '_self';
            var inp = el('input');
            inp.type = 'hidden'; inp.name = 'speed_token'; inp.value = token;
            f.appendChild(inp);
            document.body.appendChild(f);
            f.submit();
        } catch (e) {}
    }

    function startWait(after) {
        setStatus('Waiting 10 seconds before bypass');
        var done = false, tick;
        setPrimary('Skip wait', function () {
            if (done) return;
            done = true;
            clearInterval(tick);
            setPrimary(null);
            after();
        });
        var left = 10;
        tick = setInterval(function () {
            if (done) return;
            left--;
            if (left <= 0) { clearInterval(tick); setPrimary(null); after(); }
        }, 1000);
    }
        function pageTurnstileReady() {
        if (!document.querySelector('.cf-turnstile,[data-turnstile],.g-recaptcha,iframe[src*="challenges.cloudflare.com"],input[name="cf-turnstile-response"]')) return true;
        var all = document.querySelectorAll('input[name="cf-turnstile-response"]');
        for (var i = 0; i < all.length; i++) if (all[i].value && all[i].value.length) return true;
        return false;
    }

    async function doVerify(form, step, isFirst) {
        try {
            Me(form);
            var action = form.getAttribute('action');
            var fd = new FormData(form);
            var resp = await fetch(action, { method: 'POST', body: fd, credentials: 'include', headers: { 'Accept': 'application/json, text/plain, */*', 'X-Requested-With': 'XMLHttpRequest' } });
            var data = await resp.json();
            if (data.status === 'success') {
                if (data.data.final && data.data.final !== '') {
                    if (data.data.final.toLowerCase().indexOf('http') === 0) shortflyFinish(data.data.final);
                    else { setStatus('Special link copied to clipboard!'); copyLink(data.data.final); }
                    return;
                }
                if (data.data.next_page && data.data.speed_token) {
                    postForm(data.data.next_page, data.data.speed_token);
                    return;
                }
                return;
            }
            setStatus('Error: ' + (data.data || 'Unknown error'));
        } catch (e) {
            setStatus('Request failed. Please refresh.');
        }
    }

    function shortflyFinish(url) {
        try {
            log('shortfly_dest', url);
            stopTimer();
            setStatus('Bypass completed!');
            setSpinner(false);
            setRefresh(false);
            setPrimary('Open Destination', function () {
                if (!isTop()) { try { window.top.postMessage({ azl: true, url: url }, '*'); } catch (e) {} }
                if (te().openNewTab) window.open(url, '_blank', 'noopener');
                else window.location.href = url;
            });
        } catch (e) {}
    }

    async function shortflyMain() {
        var pn = location.pathname;
        if (pn === '/' || pn === '') return;

        var step = HOST.indexOf('shrtslug.biz') !== -1 ? 1
                 : HOST.indexOf('biovetro.net') !== -1 ? 2
                 : HOST.indexOf('technons.com') !== -1 ? 3 : 4;

        await ensureUI();
        surfaceTurnstile();

        function flow() {
            setStatus('Waiting for completion, this can take up to 35 seconds.');

            var iv = setInterval(function () {
                try {
                    var startBtn = document.querySelector('button[id$="_start"]');
                    if (startBtn && !startBtn.getAttribute('data-az-done')) {
                        startBtn.setAttribute('data-az-done', '1');
                        startBtn.click();
                        lapse(500).then(function () {
                            var startArea = document.querySelector('div[id$="_start_area"]');
                            var area = document.querySelector('div[id$="_area"]:not([id$="_start_area"])');
                            if (startArea) startArea.classList.add('hidden');
                            if (area) area.classList.remove('hidden');
                            for (var k in window) {
                                if (k.indexOf('start_countdown_') === 0) { try { window[k](); } catch (e) {} }
                                if (k.indexOf('start_progressbar_') === 0) { try { window[k](); } catch (e) {} }
                            }
                        });
                    }

                    if (step === 3 || step === 4) {
                        var vf = document.querySelector('form[action*="/api-endpoint/verify"]');
                        if (vf && !vf.getAttribute('data-az-done534')) {
                            vf.setAttribute('data-az-done534', '1');
                            clearInterval(iv);
                            lapse(9000).then(function () { doVerify(vf, step, true); });
                            return;
                        }
                        return;
                    }

                    var vf2 = document.querySelector('form[action*="/api-endpoint/verify"]');
                    if (vf2) {
                        if (!pageTurnstileReady()) return;
                        clearInterval(iv);
                        doVerify(vf2, step, false);
                        return;
                    }
                } catch (e) {}
            }, 500);
        }

        startWait(flow);
    }

    
    function bstShrtMain() {
        var pn = location.pathname;
        if (!/^\/u\//.test(pn)) return;

        function readFinal() {
            var scripts = document.querySelectorAll('script');
            for (var i = 0; i < scripts.length; i++) {
                var m = /\\"finalUrl\\":\\"([^\\"]+)\\"/.exec(scripts[i].textContent || '');
                if (m && m[1]) return m[1];
            }
            return null;
        }

        buildUI();
        startTimer();

        function flow() {
            var revealed = false;
            var iv = setInterval(function () {
                var f = readFinal();
                if (f && !revealed) {
                    revealed = true;
                    clearInterval(iv);
                    stopTimer();
                    log('bstshrt_dest', f);
                    Se(f);
                }
            }, 300);
            setTimeout(function () {
                clearInterval(iv);
                if (!revealed) failUI('Could not read destination. Please refresh.');
            }, 8000);
        }
        startWait(flow);
    }

    
    function linkvertiseMain() {
        var pm = /^\/(?:access\/)?(\d{4,})\/([A-Za-z0-9]{5,})$/.exec(location.pathname.replace(/\/+$/, ''));
        if (!pm) return;
        var userId = pm[1], token = pm[2];
        var accessUrl = location.origin + location.pathname;

        function lvCall(query, variables) {
            return new Promise(function (res) {
                var key = 'data-az-lv-' + Math.random().toString(36).slice(2, 9);
                var scr = el('script');
                scr.textContent = '(async function(){try{var r=await fetch("https://publisher.linkvertise.com/graphql",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:' + JSON.stringify(JSON.stringify({ variables: variables, query: query })) + '});var t=await r.text();document.documentElement.setAttribute(' + JSON.stringify(key + '-s') + ',String(r.status));document.documentElement.setAttribute(' + JSON.stringify(key + '-b') + ',t);}catch(e){document.documentElement.setAttribute(' + JSON.stringify(key + '-s') + ',"error");}})();';
                document.documentElement.appendChild(scr);
                scr.remove();
                var iv = setInterval(function () {
                    var s = document.documentElement.getAttribute(key + '-s');
                    if (s) {
                        clearInterval(iv);
                        res({ status: s, text: document.documentElement.getAttribute(key + '-b') || '' });
                    }
                }, 120);
            });
        }

        var gq = 'query getContent($identifier: PublicLinkIdentificationInput!, $task_args: TaskArgument) {\n  getContent(input: $identifier, task_args: $task_args) {\n    __typename\n    ... on ContentAccessTaskSet {\n      __typename\n      tasks {\n        __typename\n        id\n        ... on AdTask { __typename id status adIndex adsTotal }\n        ... on WaitTask { __typename id status remainingWaitingTime adsTotal }\n        ... on PremiumTask { __typename id status }\n      }\n    }\n    ... on DetailPageTargetData { type url paste __typename }\n  }\n}\n';
        var mq = 'mutation completeTask($identifier: PublicLinkIdentificationInput!, $task_id: String!, $task_args: TaskArgument) {\n  completeTask(input: $identifier, task_id: $task_id, task_args: $task_args) {\n    id __typename\n    ... on AdTask { __typename id status }\n    ... on WaitTask { __typename id status remainingWaitingTime adsTotal }\n    ... on PremiumTask { __typename id status }\n  }\n}\n';

        function mkArgs() {
            return {
                request_id: Math.random().toString(16).slice(2, 34),
                additional_data: {
                    taboola: {
                        user_id: 'fallbackUserId',
                        consent_string: '',
                        url: accessUrl,
                        external_referrer: '',
                        session_id: null
                    }
                },
                action_id: 'az-' + Math.random().toString(16).slice(2, 24)
            };
        }

        function finish(r) {
            stopTimer();
            if (r.paste) {
                setSpinner(false);
                setRefresh(false);
                setPrimary('Copy Content', function () { copyLink(r.paste); setPrimary('Copied!', function () {}); });
            } else {
                log('linkvertise_dest', r.url);
                Se(r.url);
            }
        }

        function failFlow(msg) {
            failUI(msg + ' Please refresh.');
        }

        buildUI();
        startTimer();

        async function flow() {
            setStatus('Completing tasks, this can take a few seconds');
            var ident = { userIdAndUrl: { url: token, user_id: userId } };
            for (var guard = 0; guard < 30; guard++) {
                var g = await lvCall(gq, { identifier: ident, task_args: mkArgs() });
                if (g.status === 'error') return void failFlow('Request failed');
                var out = null;
                try { out = JSON.parse(g.text); } catch (e) { return void failFlow('Invalid response'); }
                var r = out && out.data && out.data.getContent;
                if (!r) return void failFlow('API error');
                if (r.__typename !== 'ContentAccessTaskSet') {
                    if (r.url || r.paste) return void finish(r);
                    return void failFlow('No target returned');
                }
                var acted = false;
                var tasks = r.tasks || [];
                for (var i = 0; i < tasks.length; i++) {
                    var t = tasks[i];
                    if ((t.__typename === 'WaitTask' || t.__typename === 'AdTask') && t.status === 'IN_PROGRESS') {
                        acted = true;
                        await lvCall(mq, { identifier: ident, task_id: t.id, task_args: mkArgs() });
                    }
                }
                if (!acted) return void failFlow('No available task');
            }
            failFlow('Timed out');
        }
        startWait(flow);
    }

    
    function ouoMain() {
        var seg = location.pathname.slice(1).split('/').filter(Boolean);
        if (!seg.length) return;
        if (/^(go|fbc)/.test(seg[0])) {
            setTimeout(function () {
                var f = document.querySelector('#form-go, #form-captcha, form');
                if (f) { try { f.submit(); } catch (e) {} }
            }, 300);
            return;
        }
        var navUrl = location.href;
        buildUI();
        startTimer();
        startWait(function () {
            setStatus('Bypassing countdown...');
            setTimeout(function () {
                var f = document.querySelector('form#form-captcha, form');
                if (!f) return void failUI('No form found. Please refresh.');
                try { f.submit(); } catch (e) {}
            }, 400);
            var iv = setInterval(function () {
                if (location.href !== navUrl) { clearInterval(iv); }
            }, 400);
            setTimeout(function () { clearInterval(iv); failUI('Link requires manual captcha. Please refresh.'); }, 9000);
        });
    }

    
    function s4uMain() {
        function capOpen(fn) {
            return new Promise(function (res) {
                var key = 'data-az-s4u-' + Math.random().toString(36).slice(2, 9);
                var scr = el('script');
                scr.textContent = '(function(){try{var u=null;var o=window.open;window.open=function(x){u=x;return null;};if(typeof ' + fn + '==="function"){' + fn + '();}window.open=o;document.documentElement.setAttribute(' + JSON.stringify(key) + ',u||"");}catch(e){document.documentElement.setAttribute(' + JSON.stringify(key) + ',"__err:"+e);}})();';
                document.documentElement.appendChild(scr);
                scr.remove();
                var iv = setInterval(function () {
                    var v = document.documentElement.getAttribute(key);
                    if (v !== null) { clearInterval(iv); res(v); }
                }, 100);
            });
        }
        if (/LPD\.php/.test(location.pathname)) {
            buildUI();
            startTimer();
            startWait(function () {
                setStatus('Unlocking destination...');
                capOpen('fileunlock').then(function (u) {
                    if (u && u.indexOf('http') === 0) { stopTimer(); log('s4u_dest', u); return void Se(u); }
                    failUI('Could not retrieve destination. Please refresh.');
                });
            });
            return;
        }
        buildUI();
        startTimer();
        startWait(function () {
            setStatus('Unlocking steps...');
            var navUrl = location.href;
            var scr = el('script');
            scr.textContent = '(function(){try{for(var i=1;i<=10;i++){if(typeof window["fun"+i]==="function"){window["fun"+i]();}}var b=document.getElementById("file");if(b){b.removeAttribute("disabled");}var u=null;var o=window.open;window.open=function(x){u=x;return null;};if(typeof window.fun_unlock_file==="function"){window.fun_unlock_file();}window.open=o;if(u)document.documentElement.setAttribute("data-az-s4u-nav",u);}catch(e){}}())';
            document.documentElement.appendChild(scr);
            scr.remove();
            var iv = setInterval(function () {
                var u = document.documentElement.getAttribute('data-az-s4u-nav');
                if (u) {
                    clearInterval(iv);
                    stopTimer();
                    setStatus('Bypass completed!');
                    setSpinner(false);
                    setRefresh(false);
                    setPrimary('Open Destination', function () {
                        window.location.href = u;
                    });
                    return;
                }
                if (location.href !== navUrl) { clearInterval(iv); }
            }, 300);
            setTimeout(function () { clearInterval(iv); failUI('Could not unlock. Please refresh.'); }, 10000);
        });
    }

    
    function boostMain() {
        buildUI();
        startTimer();
        startWait(function () {
            setStatus('Reading destination...');
            try {
                fetch(location.href, { credentials: 'same-origin' }).then(function (r) { return r.text(); }).then(function (html) {
                    var p = html.split('bufpsvdhmjybvgfncqfa="')[1];
                    var b64 = p ? p.split('"')[0] : null;
                    if (!b64) return void failUI('Could not read destination. Please refresh.');
                    var dest = atob(b64);
                    stopTimer();
                    log('boost_dest', dest);
                    Se(dest);
                }).catch(function () { failUI('Request failed. Please refresh.'); });
            } catch (e) { failUI('Bypass failed. Please refresh.'); }
        });
    }

    
    function dlinkMain() {
        buildUI();
        startTimer();
        startWait(function () {
            setStatus('Skipping countdown...');
            var scr = el('script');
            scr.textContent = 'seconde=0;if(typeof Compteur==="function"){Compteur();}';
            document.documentElement.appendChild(scr);
            scr.remove();
            var iv = setInterval(function () {
                var a = document.querySelector('#compteur2 a[href], a[href*="url="]');
                if (!a) return;
                var u = a.href;
                try { var p = new URL(u).searchParams.get('url'); if (p) u = p; } catch (e) {}
                if (!u) return;
                clearInterval(iv);
                stopTimer();
                log('dlink_dest', u);
                Se(u);
            }, 300);
            setTimeout(function () { clearInterval(iv); failUI('Could not retrieve destination. Please refresh.'); }, 10000);
        });
    }

    
    function oneShortMain() {
        buildUI();
        startTimer();
        startWait(function () {
            setStatus('Unlocking...');
            var navUrl = location.href;
            var iv = setInterval(function () {
                try {
                    var a = document.querySelector('#redirect-link');
                    if (a && a.href) {
                        clearInterval(iv);
                        stopTimer();
                        log('oneshort_dest', a.href);
                        return void Se(a.href);
                    }
                    var cf = document.querySelector('#countDownForm');
                    if (cf) {
                        clearInterval(iv);
                        setStatus('Submitting unlock...');
                        setTimeout(function () { try { cf.submit(); } catch (e) {} }, 7000);
                    }
                } catch (e) {}
            }, 400);
            var busy = setInterval(function () {
                if (location.href !== navUrl) { clearInterval(busy); clearInterval(iv); }
            }, 500);
            setTimeout(function () { clearInterval(iv); clearInterval(busy); failUI('Could not read destination. Please refresh.'); }, 20000);
        });
    }

    if (IS_REKONISE) return void rekoniseMain();
    if (IS_LOCKR) return void lokrMain();
    if (IS_SHORTFLY) return void shortflyMain();
    if (IS_BSTSHRT) return void bstShrtMain();
    if (IS_LINKVERTISE) return void linkvertiseMain();
    if (IS_OUO) return void ouoMain();
    if (IS_S4U) return void s4uMain();
    if (IS_BOOST) return void boostMain();
    if (IS_DLINK) return void dlinkMain();
    if (IS_ONESHORT) return void oneShortMain();
    if (IS_WORKINK) return void workInkMain();

    /* work.ink (ported from F.E.A.R approach) */
    var WI_RELAY = 'https://work-direct.ink/api/clientSides/workink';
    var WI_TURNSTILE_KEY = '0x4AAAAAAAJoXhmMXwq7jgK9';
    function wiDecodeJwt(t) { try { if (!t || typeof t !== 'string') return null; var p = t.split('.'); if (p.length !== 3) return null; var q = JSON.parse(atob(p[1])); if (!q.exp || typeof q.exp !== 'number') return null; return q; } catch (e) { return null; } }
    function wiTokenOk(t) { var q = wiDecodeJwt(t); return !!(t && q && Math.floor(Date.now() / 1000) < q.exp); }
    function wiStrip(s) { return String(s || '').trim().replace(/^['"`]|['"`]$/g, ''); }
    function wiUSCArg(item, name) { var m = String(item).match(new RegExp('^USC:' + name + '[ao]?\\(([\\s\\S]*)\\)$')); return m ? wiStrip(m[1].trim()) : null; }
    function wiSafeDecode(s) { if (s.indexOf('%0A') !== -1 || s.indexOf('%20') !== -1 || s.indexOf('%3D') !== -1) { try { return decodeURIComponent(s); } catch (e) { return s; } } return s; }
    function wiSleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
    function wiMkCaptchaBox() {
        var wrap = document.createElement('div');
        wrap.id = 'az-captcha';
        wrap.style.cssText = 'display:flex;justify-content:center;align-items:center;min-height:78px;width:100%';
        var box = q('az-box');
        if (box) box.insertBefore(wrap, box.querySelector('#az-actions') || null);
        return wrap;
    }
    function wiLoadScript(src) {
        return new Promise(function (resolve) {
            if (window.hcaptcha && src.indexOf('hcaptcha') !== -1) return resolve();
            var s = el('script'); s.src = src; s.async = true; s.defer = true;
            s.onload = function () { resolve(); }; s.onerror = function () { resolve(); };
            (document.head || document.documentElement).appendChild(s);
        });
    }
    function wiFetch(payload) {
        var qs = new URLSearchParams();
        for (var k in payload) { if (payload[k] !== undefined && payload[k] !== null) qs.set(k, String(payload[k])); }
        return fetch(WI_RELAY + '?' + qs.toString(), { method: 'GET', headers: { Accept: 'text/event-stream' }, cache: 'no-store' });
    }
    function wiReadSSE(resp) {
        if (!resp || !resp.body) return Promise.resolve({ responses: [], messages: [] });
        var reader = resp.body.getReader(), dec = new TextDecoder(), responses = [], messages = [], buffer = '';
        return reader.read().then(function step(r) {
            if (r.done) return { responses: responses, messages: messages };
            buffer += dec.decode(r.value, { stream: true });
            var lines = buffer.split('\n'); buffer = lines.pop();
            for (var i = 0; i < lines.length; i++) {
                if (lines[i].indexOf('data: ') !== 0) continue;
                try {
                    var ev = JSON.parse(lines[i].slice(6));
                    if (ev.type === 'r') responses.push(ev.pyl);
                    else if (ev.type === 'm') messages.push(ev.msg);
                    else if (ev.type === 'error') messages.push('ERROR: ' + ev.msg);
                    else if (ev.type === 'done') return { responses: responses, messages: messages };
                } catch (e) {}
            }
            return reader.read().then(step);
        }).finally(function () { try { reader.releaseLock(); } catch (e) {} });
    }
    function wiEnsureToken() {
        if (localStorage.getItem('customerTokenSource') === 'placeholder-force-monocle') return Promise.resolve();
        var cur = localStorage.getItem('customerToken');
        if (cur && wiTokenOk(cur)) return Promise.resolve();
        return wiFetchRelayGen().then(function (t) {
            if (t && wiTokenOk(t)) { localStorage.setItem('customerToken', t); localStorage.setItem('customerTokenSource', 'server-generated'); return; }
            localStorage.setItem('customerToken', crypto.randomUUID());
            localStorage.setItem('customerTokenSource', 'placeholder-force-monocle');
            location.reload();
        });
    }
    function wiFetchRelayGen() {
        return fetch(WI_RELAY + '/genAccount?cv=' + (crypto.randomUUID ? crypto.randomUUID() : String(Math.random()).slice(2)))
            .then(function (r) { return r.json(); })
            .then(function (j) { return j && j.niggaID ? j.niggaID : null; })
            .catch(function () { return null; });
    }
    function wiCaptureMonocle() {
        return new Promise(function (resolve) {
            var RealWS = window.WebSocket;
            function HookedWS(url, protocols) {
                var ws = protocols !== undefined ? new RealWS(url, protocols) : new RealWS(url);
                if (typeof url === 'string' && url.indexOf('monocleAssessment') !== -1) {
                    var val = '1';
                    try { val = new URL(url).searchParams.get('monocleAssessment') || '1'; }
                    catch (e) { var m = url.match(/[?&]monocleAssessment=([^&#]*)/); val = m ? decodeURIComponent(m[1]) : '1'; }
                    ws.addEventListener('open', function () { ws.close(1000, 'blocked'); });
                    setTimeout(function () { if (ws.readyState < 2) ws.close(1000, 'blocked'); }, 0);
                    return resolve(val);
                }
                return ws;
            }
            HookedWS.prototype = RealWS.prototype;
            window.WebSocket = HookedWS;
        });
    }
    function wiRunLinkPhase() {
        setStatus('Grabbing session...');
        var monocleP = wiCaptureMonocle();
        wiSleep(1000).then(function () {
            if (!localStorage.getItem('customerToken')) { localStorage.setItem('customerToken', crypto.randomUUID()); }
            fetch(location.href).then(function (r) { return r.text(); }).then(function (html) {
                var m = html.match(/f_user_id\s*:\s*["']?(\d+)["']?/);
                setStatus('Session: ' + (m ? m[1] : 'unknown') + ', waiting for monocle...');
                return monocleP.then(function (monocle) {
                    setStatus('Redirecting to safe VM...');
                    location.href = 'https://work.ink/cdn-cgi/trace?a=' + encodeURIComponent(location.href) + '&b=' + (m ? m[1] : '') + '&mncleV=' + encodeURIComponent(monocle);
                });
            }).catch(function () { failUI('Could not read session. Please refresh.'); });
        });
    }
    function wiParseVm() {
        var q = new URLSearchParams(location.search);
        var pageUrl = q.get('a'), userId = q.get('b'), monocle = q.get('mncleV');
        if (!pageUrl || !userId || !monocle) return null;
        var serverOverride = '', custom = '';
        try { serverOverride = new URLSearchParams(new URL(pageUrl).search).get('sr') || ''; custom = new URL(pageUrl).pathname.split('/').filter(Boolean)[1] || ''; } catch (e) {}
        return { pageUrl: pageUrl, userId: userId, monocle: monocle, serverOverride: serverOverride, custom: custom };
    }
    function wiRandomPath() {
        try { history.replaceState(null, null, '/' + (String(1e7 + Math.floor(Math.random() * 9e7)) + '-' + Math.floor(Math.random() * 1e10))); } catch (e) {}
    }
    function wiHsCaptcha(ws, ctx, sessionId) {
        var sent = {};
        wiLoadScript('https://hcaptcha.com/1/api.js');
        window.onHCaptcha = function (token) {
            if (!token || sent['hc' + token]) return; sent['hc' + token] = 1;
            wiFetch({ payl: 'HCTKA:' + token, pal: location.href, sid: sessionId, SST: true }).then(function (resp) {
                wiReadSSE(resp).then(function (out) {
                    for (var i = 0; i < out.responses.length; i++) { var a = wiHandleItem(ws, ctx, out.responses[i]); if (a === 'stop') return; if (a === 'send') ws.send(out.responses[i]); }
                });
            });
        };
        window.loadHCaptcha = function (sitekey) {
            var c = q('az-captcha');
            if (!c || !window.hcaptcha) return;
            try { window.hcaptcha.render(c, { sitekey: sitekey, callback: 'onHCaptcha', 'error-callback': 'onHCaptchaError' }); } catch (e) {}
        };
        window.onTurnstile = function (token) {
            if (!token || sent['tt' + token]) return; sent['tt' + token] = 1;
            wiFetch({ payl: 'TTTKA:' + token, pal: location.href, sid: sessionId, SST: true }).then(function (resp) {
                wiReadSSE(resp).then(function (out) {
                    for (var i = 0; i < out.responses.length; i++) { var a = wiHandleItem(ws, ctx, out.responses[i]); if (a === 'stop') return; if (a === 'send') ws.send(out.responses[i]); }
                });
            });
        };
        window.onHCaptchaError = function () {};
        window.onFearOfferClick = function (url) {
            wiFetch({ payl: 'OFFCLK:' + String(url || ''), pal: location.href, sid: sessionId, SST: true }).then(function (resp) {
                wiReadSSE(resp).then(function (out) { for (var i = 0; i < out.responses.length; i++) { var a = wiHandleItem(ws, ctx, out.responses[i]); if (a === 'send') ws.send(out.responses[i]); } });
            });
        };
    }
    function wiHandleItem(ws, ctx, item) {
        if (typeof item !== 'string') return 'send';
        if (item.indexOf('USC:invalidSession()') === 0) { ctx.onInvalidSession(); return 'stop'; }
        var w = wiUSCArg(item, 'wait');
        if (w !== null && w !== '') { return wiSleep(parseFloat(w) * 1000).then(function () { return 'handled'; }); }
        var setrep = wiUSCArg(item, 'setrep');
        if (setrep !== null) {
            stopTimer();
            setStatus('Bypass completed!');
            setSpinner(false);
            setRefresh(false);
            try { ws.close(); } catch (e) {}
            log('workink_dest', setrep.trim());
            return void Se(setrep.trim());
        }
        var follow = wiUSCArg(item, 'FollowChain');
        if (follow !== null) { stopTimer(); setStatus('Bypass completed!'); setSpinner(false); setRefresh(false); try { ws.close(); } catch (e) {} log('workink_dest', follow); return void Se(follow); }
        if (item.indexOf('USC:startOperaGXSpoofing()') === 0) {
            try { fetch('https://work.ink/_api/v2/callback/operaGX', { method: 'POST', headers: { 'User-Agent': 'Opera Installer/1.0', 'Content-Type': 'application/json' }, body: '{"noteligible":true}' }); } catch (e) {}
            return 'handled';
        }
        if (item.indexOf('USC:eval(') === 0) {
            var m2 = item.match(/^USC:eval\(([\s\S]*)\)$/);
            if (m2 && m2[1]) { try { var js = wiSafeDecode(m2[1]).replace(/\bNone\b/g, 'null').replace(/\bTrue\b/g, 'true').replace(/\bFalse\b/g, 'false'); var r = eval(js); if (r && typeof r.then === 'function') return r; } catch (e) {} }
            return 'handled';
        }
        if (item.indexOf('USC:') === 0) return 'handled';
        return 'send';
    }
    function wiRunVm(params) {
        var sessionId = crypto.randomUUID ? crypto.randomUUID() : String(Math.random()).slice(2);
        var invalidDone = false;
        var ctx = {
            onInvalidSession: function () {
                if (invalidDone) return; invalidDone = true;
                setStatus('Session rejected, grabbing fresh token...');
                try { localStorage.setItem('customerToken', crypto.randomUUID() || String(Math.random()).slice(2)); localStorage.setItem('customerTokenSource', 'placeholder-force-monocle'); } catch (e) {}
                location.href = params.pageUrl;
            }
        };
        var ws;
        try { ws = new WebSocket('wss://work.ink/_api/v2/ws?userId=' + encodeURIComponent(params.userId) + '&custom=' + encodeURIComponent(params.custom) + '&referrer=&toLink=&serverOverride=' + encodeURIComponent(params.serverOverride) + '&customerSessionToken=' + localStorage.getItem('customerToken') + '&monocleAssessment=' + encodeURIComponent(params.monocle)); } catch (e) { failUI('WebSocket failed. Please refresh.'); return; }
        wiHsCaptcha(ws, ctx, sessionId);
        var ready = false, pending = [];
        function route(raw) {
            return wiFetch({ payl: encodeURIComponent(raw), pal: location.href, sid: sessionId, UVA: 'v2.4-cobalt', SST: true }).then(function (resp) {
                if (!resp || !resp.ok) { try { ws.send(raw); } catch (e) {} return null; }
                return wiReadSSE(resp).then(function (out) {
                    var items = out.responses.length > 0 ? out.responses : [raw];
                    return Promise.resolve().then(function () {
                        var chain = Promise.resolve();
                        for (var i = 0; i < items.length; i++) {
                            chain = chain.then(function (it) {
                                return wiHandleItem(ws, ctx, it).then(function (a) { if (a === 'send') { try { ws.send(it); } catch (e) {} } });
                            }.bind(null, items[i]));
                        }
                        return chain;
                    });
                });
            });
        }
        ws.onopen = function () {
            ready = true;
            setStatus('WebSocket connected, unlocking...');
            while (pending.length > 0) route(pending.shift());
            wiFetch({ payl: 'SMNCADV:' + params.monocle, pal: location.href, sid: sessionId, SST: true }).then(function (resp) {
                if (!resp || !resp.ok) return;
                wiReadSSE(resp).then(function (out) {
                    for (var i = 0; i < out.responses.length; i++) { var a = wiHandleItem(ws, ctx, out.responses[i]); if (a === 'stop') return; if (a === 'send') { try { ws.send(out.responses[i]); } catch (e) {} } }
                });
            });
        };
        ws.onmessage = function (ev) {
            if (typeof ev.data !== 'string') return;
            if (!ready) { pending.push(ev.data); return; }
            route(ev.data);
        };
        ws.onclose = function () { setTimeout(function () { failUI('Connection lost. Please refresh.'); }, 2000); };
    }
    function wiLoginUi(monocle, pageUrl) {
        setStatus('Expired session — login required');
        var box = q('az-box');
        var wrap = wiMkCaptchaBox();
        var input = el('input');
        input.type = 'email'; input.value = '';
        input.style.cssText = 'width:100%;max-width:320px;padding:10px 14px;border-radius:8px;border:1px solid #3a3a3a;background:#1a1a1a;color:#fff';
        input.placeholder = 'your@email.com';
        var tsWrap = el('div');
        tsWrap.style.cssText = 'display:flex;justify-content:center;min-height:70px;width:100%';
        var go = el('button');
        go.textContent = 'Send login code';
        go.style.cssText = '.az-btn';
        go.className = 'az-btn';
        box.insertBefore(input, box.querySelector('#az-actions') || null);
        box.insertBefore(tsWrap, box.querySelector('#az-actions') || null);
        box.insertBefore(go, box.querySelector('#az-actions') || null);
        go.addEventListener('click', function () {
            if (!input.value.trim()) return;
            wiLoadScript('https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit').then(function () {
                var ts = window.turnstile;
                if (!ts) { setStatus('Captcha failed to load. Please refresh.'); return; }
                ts.render(tsWrap, {
                    sitekey: WI_TURNSTILE_KEY,
                    action: 'premium_login',
                    callback: function (token) {
                        fetch('https://work.ink/_api/v2/premium/sendLoginCode', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: input.value.trim(), turnstileToken: token }) }).then(function (r) { return r.json(); }).then(function (d) {
                            if (!d.mailSent) { setStatus('Failed to send code.'); return; }
                            var code = prompt('Enter the login code from your email:');
                            if (!code) return;
                            fetch('https://work.ink/_api/v2/premium/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: code, email: input.value.trim() }) }).then(function (r) { return r.json(); }).then(function (d2) {
                                if (!d2.token) { setStatus('Login failed.'); return; }
                                localStorage.setItem('customerToken', d2.token);
                                localStorage.setItem('customerTokenSource', 'user-generated');
                                location.href = pageUrl;
                            });
                        });
                    }
                });
            });
        });
    }
    function workInkMain() {
        if (location.pathname === '/' || location.pathname === '') return;
        buildUI();
        startTimer();
        if (location.pathname.indexOf('cdn-cgi/trace') !== -1) {
            var params = wiParseVm();
            if (!params) { failUI('Bad VM params. Please refresh.'); return; }
            if (localStorage.getItem('customerTokenSource') === 'placeholder-force-monocle') { wiLoginUi(params.monocle, params.pageUrl); return; }
            setStatus('Starting safe VM...');
            wiRunVm(params);
            return;
        }
        startWait(function () {
            setStatus('Starting work.ink bypass...');
            wiEnsureToken().then(function () {
                try { wiRandomPath(); } catch (e) {}
                wiRunLinkPhase();
            }).catch(function () { failUI('Token failed. Please refresh.'); });
        });
    }

    
    var pn = location.pathname;
    if ('/' === pn || '' === pn) return;

    var intr = el('script');
    intr.textContent = [
        '(function(){',
        '  var G = "__azTcGate";',
        '  window[G] = false;',
        '  var OF = window.fetch;',
        '  window.fetch = function(){',
        '    var u = ((typeof arguments[0] === "string") ? arguments[0] : (arguments[0] && arguments[0].url)) || "";',
        '    var m = arguments[1] ? String(arguments[1].method || "GET").toUpperCase() : "GET";',
        '    if (u.indexOf("/tc") !== -1 && m === "POST" && !window[G]) { return new Promise(function(){}); }',
        '    return OF.apply(this, arguments);',
        '  };',
        '  if (window.XMLHttpRequest && window.XMLHttpRequest.prototype) {',
        '    var OX = window.XMLHttpRequest.prototype.open;',
        '    var OS = window.XMLHttpRequest.prototype.send;',
        '    window.XMLHttpRequest.prototype.open = function(m, u){',
        '      this.__azX = String(u || "").indexOf("/tc") !== -1 && String(m || "").toUpperCase() === "POST" && !window[G];',
        '      return OX.apply(this, arguments);',
        '    };',
        '    window.XMLHttpRequest.prototype.send = function(b){ if (this.__azX) return; return OS.apply(this, arguments); };',
        '  }',
        '})();'
    ].join('\n');
    document.documentElement.appendChild(intr);
    intr.remove();

    if ('loading' === document.readyState) document.addEventListener('DOMContentLoaded', run);
    else run();
}());
