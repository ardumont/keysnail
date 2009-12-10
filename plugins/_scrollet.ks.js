// Most functions in this plugin are borrowed from buffer.js of liberator

/***** BEGIN LICENSE BLOCK ***** {{{
Version: MPL 1.1/GPL 2.0/LGPL 2.1

The contents of this file are subject to the Mozilla Public License Version
1.1 (the "License"); you may not use this file except in compliance with
the License. You may obtain a copy of the License at
http://www.mozilla.org/MPL/

Software distributed under the License is distributed on an "AS IS" basis,
WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
for the specific language governing rights and limitations under the
License.

Copyright (c) 2006-2009 by Martin Stubenschrott <stubenschrott@vimperator.org>

Alternatively, the contents of this file may be used under the terms of
either the GNU General Public License Version 2 or later (the "GPL"), or
the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
in which case the provisions of the GPL or the LGPL are applicable instead
of those above. If you wish to allow use of your version of this file only
under the terms of either the GPL or the LGPL, and not to allow others to
use your version of this file under the terms of the MPL, indicate your
decision by deleting the provisions above and replace them with the notice
and other provisions required by the GPL or the LGPL. If you do not delete
the provisions above, a recipient may use your version of this file under
the terms of any one of the MPL, the GPL or the LGPL.
}}} ***** END LICENSE BLOCK *****/

// PLUGIN_INFO {{ =========================================================== //

var PLUGIN_INFO =
<KeySnailPlugin>
    <name>Scrollet!</name>
    <name lang="ja">スクロレット！</name>
    <description>Provides various scroll commands and mark system</description>
    <description lang="ja">様々なスクロールコマンドとマークシステムを提供します</description>
    <version>0.0.2</version>
    <updateURL>http://github.com/mooz/keysnail/raw/master/plugins/_scrollet.ks.js</updateURL>
    <iconURL>http://github.com/mooz/keysnail/raw/master/plugins/icon/_scrollet.icon.png</iconURL>
    <author mail="stillpedant@gmail.com" homepage="http://d.hatena.ne.jp/mooz/">mooz</author>
    <license>MPL</license>
    <minVersion>1.1.3</minVersion>
    <include>main</include>
    <provides>
        <ext>scrollet-scroll-line-down</ext>
        <ext>scrollet-scroll-line-up</ext>
        <ext>scrollet-scroll-document-down</ext>
        <ext>scrollet-scroll-document-up</ext>
        <ext>scrollet-scroll-document-right</ext>
        <ext>scrollet-scroll-document-left</ext>
        <ext>scrollet-scroll-percent</ext>
        <ext>scrollet-set-mark</ext>
        <ext>scrollet-scroll-to-mark</ext>
    </provides>
    <detail><![CDATA[
=== What's this ===
==== Provides various scroll commands ====

If you want to scroll half a page down by SPC and C-v, paste the code below to the bottom of your .keysnail.js.

>||
key.setViewKey([['SPC'], ['C-v']], function (ev, arg) {
    ext.exec("scrollet-scroll-document-down", arg);
}, 'Scroll document down');

key.setViewKey('M-v', function (ev, arg) {
    ext.exec("scrollet-scroll-document-up", arg);
}, 'Scroll document up');
||<

You can scroll to the {prefix argument} percent of the document by putting the setting belowto your .keysnail.js.

>||
key.setViewKey('%', function (ev, arg) {
    ext.exec("scrollet-scroll-percent", arg);
}, 'Scroll to {prefix argument} percent of the document');
||<

For example, press C-u 75 % and you can scroll to the 75 percent of the current document.

==== Mark system ====

Do you want records the scroll position of document temporarily?

Scrollet provides the mark system which allows you to record the current scroll position to the certain keys.

Paste the code below to the bottom of your .keysnail.js.

>||
key.setViewKey("C-1", function (ev, arg) {
    ext.exec("scrollet-set-mark", arg, ev);
}, "Save current scroll position to the mark", true);

key.setViewKey("C-2", function (ev, arg) {
    ext.exec("scrollet-scroll-to-mark", arg, ev);
}, "Scroll to the saved position", true);
||<

Now you can record the current scroll position by pressing C-1 and C-2. By pressing C-1, the prompt will appear and if you press some key (may be alphabet?), current scroll position will be recorded to that key.

You can recover the scroll position by pressing C-2 and the key which has the scroll position you recorded.

Here is the settings which is similar to register keybindings in Emacs.

>||
key.setGlobalKey(['C-x', 'r', 'SPC'], function (ev, arg) {
    ext.exec("scrollet-set-mark", arg, ev);
}, "Save current scroll position to the mark", true);

key.setGlobalKey(['C-x', 'r', 'j'], function (ev, arg) {
    ext.exec("scrollet-scroll-to-mark", arg, ev);
}, "Scroll to the saved position", true);
||<

==== Methods ====

Besides these exts, this plugin provides a lot of methods which can be used from .keysnail.js and other plugins.

These picked up methods are especially useful.

- plugins.scrollet.scrollPages(pages)
 - Scroll page by {pages}
- plugins.scrollet.scrollByScrollSize(arg, direction)
 - Scroll by {half a page in pixels} * arg
- plugins.scrollet.scrollToPercentiles(x, y)
 - Scroll to x, y in percent of the document
    ]]></detail>
    <detail lang="ja"><![CDATA[
=== 説明 ===
==== 様々なスクロールコマンドを提供 ====

Firefox デフォルトのスクロールコマンドはあまり融通が効きません。そこで、このプラグインの出番というわけです。

例えば半画面スクロール。 SPC と C-v は半画面スクロールが良い！ という方は次のような設定を .keysnail.js の末尾へ張り付けておきましょう。

>||
key.setViewKey([['SPC'], ['C-v']], function (ev, arg) {
    ext.exec("scrollet-scroll-document-down", arg);
}, '半画面スクロールダウン');

key.setViewKey('M-v', function (ev, arg) {
    ext.exec("scrollet-scroll-document-up", arg);
}, '半画面スクロールアップ');
||<

また、今見ているページの「70 パーセント辺りまでスクロールしたいな」というときは次のキーバインドが使えます。

>||
key.setViewKey('%', function (ev, arg) {
    ext.exec("scrollet-scroll-percent", arg);
}, '前置引数で指定した割合までページをスクロール');
||<

これを C-u 75 % のようにして呼べば、ページの 75 パーセントまで一気にスクロールすることができてしまいます。

==== マークシステム ====

一時的にページのスクロール位置を保存しておきたいと思ったことはありませんか？

このプラグインが提供するマークシステムを使えば、ページのスクロール位置を一時的に保存しておき、あとでその場所までスクロールすることが可能となります。

次のような設定を .keysnail.js ファイル末尾へ張り付けてみてください。

>||
key.setViewKey("C-1", function (ev, arg) {
    ext.exec("scrollet-set-mark", arg, ev);
}, "現在のスクロール位置を保存", true);

key.setViewKey("C-2", function (ev, arg) {
    ext.exec("scrollet-scroll-to-mark", arg, ev);
}, "マークに保存された位置へスクロール", true);
||<

この設定により C-1 を押すことで現在のスクロール位置を保存し、 C-2 を押すことで記録されたスクロール位置を復元することが可能となります。

C-1 を押すとプロンプトが現れるので、適当なキー (アルファベット) を入力してください。そのキーへとスクロール位置が保存されます。

保存されたスクロール位置を復元するには C-2 を入力してください。プロンプトが現れるので、先ほどのキーを入力してやれば、その位置へとスクロールが行われます。

どんなキーへ記録したか忘れてしまった場合は TAB を押すことで記録されたキーの一覧を確認することができます。

以下に Emacs のレジスタシステムに似たキーバインド例を示します。長ったらしいですが、何回も打ち込んでいると慣れてくるものです。

>||
key.setGlobalKey(['C-x', 'r', 'SPC'], function (ev, arg) {
    ext.exec("scrollet-set-mark", arg, ev);
}, "現在のスクロール位置を保存", true);

key.setGlobalKey(['C-x', 'r', 'j'], function (ev, arg) {
    ext.exec("scrollet-scroll-to-mark", arg, ev);
}, "マークに保存された位置へスクロール", true);
||<

ややこしい Emacs のキーバインドが覚えられて一石二丁ですね。

==== メソッド ====

このプラグインはエクステだけでなく、初期化ファイルや他のプラグイン中から使用可能なメソッドも提供します。

以下のメソッドが特に便利でしょう。

- plugins.scrollet.scrollPages(pages)
 - pages 画面分スクロール
- plugins.scrollet.scrollByScrollSize(arg, direction)
 - 半画面 * arg 分スクロール
- plugins.scrollet.scrollToPercentiles(x, y)
 - x, y それぞれのスクロール率をパーセンテージ指定
    ]]></detail>
</KeySnailPlugin>;

// }} ======================================================================= //

// ChangeLog {{ ============================================================= //
//
// ==== 0.0.2 (2009 12/10) ====
//
// * Added mark sytem
//
// ==== 0.0.1 (2009 12/09) ====
//
// * First release
//
// }} ======================================================================= //

// Main {{ ================================================================== //

var scrollet =
    (function() {
         // Mark {{ ============================================================== //

         var markHolder = {};

         function getMarks(win) {
             var uri = win.location.href;
             var marks = markHolder[uri];
             if (!marks)
                 marks = markHolder[uri] = {};

             return marks;
         }

         function Mark(scrollX, scrollY) {
             var x    = scrollX;
             var y    = scrollY;
             var date = Date.now();
         }

         Mark.prototype.setWindow = function (win) {
             this.x    =  win.scrollX;
             this.y    =  win.scrollY;
             this.date = Date.now();
         };

         // }} ======================================================================= //

         // Utils {{ ================================================================= //

         function checkScrollYBounds(win, direction)
         {
             return !(direction > 0 && win.scrollY >= win.scrollMaxY || direction < 0 && win.scrollY == 0);
         }

         function findScrollableWindow()
         {
             let win = window.document.commandDispatcher.focusedWindow;
             if (win && (win.scrollMaxX > 0 || win.scrollMaxY > 0))
                 return win;

             win = window.content;
             if (win.scrollMaxX > 0 || win.scrollMaxY > 0)
                 return win;

             for (let frame in win.frames)
                 if (frame.scrollMaxX > 0 || frame.scrollMaxY > 0)
                     return frame;

             return win;
         }

         // }} ======================================================================= //

         // Scroll methods {{ ======================================================== //

         // both values are given in percent, -1 means no change
         function scrollToPercentiles(horizontal, vertical)
         {
             let win = findScrollableWindow();
             let h, v;

             if (horizontal < 0)
                 h = win.scrollX;
             else
                 h = win.scrollMaxX / 100 * horizontal;

             if (vertical < 0)
                 v = win.scrollY;
             else
                 v = win.scrollMaxY / 100 * vertical;

             win.scrollTo(h, v);
         }

         // }} ======================================================================= //

         // Public {{ ================================================================ //

         var self = {
             /**
              * @property {number} The buffer's horizontal scroll percentile.
              */
             get scrollXPercent()
             {
                 return scrollXPercentForWin();
             },

             /**
              * @property {number} The buffer's vertical scroll percentile.
              */
             get scrollYPercent()
             {
                 return self.scrollYPercentForWin();
             },

             get currentWindow()
             {
                 return findScrollableWindow();
             },

             scrollXPercentForWin: function(aWin) {
                 let win = aWin || findScrollableWindow();
                 if (win.scrollMaxX > 0)
                     return Math.round(win.scrollX / win.scrollMaxX * 100);
                 else
                     return 0;
             },

             scrollYPercentForWin: function(aWin, aScrollY) {
                 let win = findScrollableWindow();
                 if (win.scrollMaxY > 0)
                     return Math.round(win.scrollY / win.scrollMaxY * 100);
                 else
                     return 0;
             },

             /**
              * Scrolls to the bottom of the current buffer.
              */
             scrollBottom: function ()
             {
                 scrollToPercentiles(-1, 100);
             },

             /**
              * Scrolls the buffer laterally <b>cols</b> columns.
              *
              * @param {number} cols The number of columns to scroll. A positive
              *     value scrolls right and a negative value left.
              */
             scrollColumns: function (cols)
             {
                 let win = findScrollableWindow();
                 const COL_WIDTH = 20;

                 if (cols > 0 && win.scrollX >= win.scrollMaxX || cols < 0 && win.scrollX == 0)
                     return;

                 win.scrollBy(COL_WIDTH * cols, 0);
             },

             /**
              * Scrolls to the top of the current buffer.
              */
             scrollEnd: function ()
             {
                 scrollToPercentiles(100, -1);
             },

             /**
              * Scrolls the buffer vertically <b>lines</b> rows.
              *
              * @param {number} lines The number of lines to scroll. A positive
              *     value scrolls down and a negative value up.
              */
             scrollLines: function (lines)
             {
                 let win = findScrollableWindow();
                 if (checkScrollYBounds(win, lines))
                     return;
                 win.scrollByLines(lines);
             },

             /**
              * Scrolls the buffer vertically <b>pages</b> pages.
              *
              * @param {number} pages The number of pages to scroll. A positive
              *     value scrolls down and a negative value up.
              */
             scrollPages: function (pages)
             {
                 let win = findScrollableWindow();
                 if (checkScrollYBounds(win, pages))
                     return;
                 win.scrollByPages(pages);
             },

             /**
              * Scrolls the buffer vertically 'scroll' lines.
              *
              * @param {boolean} direction The direction to scroll. If true then
              *     scroll up and if false scroll down.
              */
             scrollByScrollSize: function (arg, direction)
             {
                 direction = direction ? 1 : -1;
                 arg = arg || 1;
                 let win = findScrollableWindow();

                 if (checkScrollYBounds(win, direction))
                     return;
                 win.scrollBy(0, (win.innerHeight / 2 * direction) * arg);
             },

             /**
              * Scrolls the buffer to the specified screen percentiles.
              *
              * @param {number} x The horizontal page percentile.
              * @param {number} y The vertical page percentile.
              */
             scrollToPercentiles: function (x, y)
             {
                 scrollToPercentiles(x, y);
             },

             /**
              * Scrolls the buffer to the specified screen pixels.
              *
              * @param {number} x The horizontal pixel.
              * @param {number} y The vertical pixel.
              */
             scrollTo: function (x, y)
             {
                 content.scrollTo(x, y);
             },

             /**
              * Scrolls the current buffer laterally to its leftmost.
              */
             scrollStart: function ()
             {
                 scrollToPercentiles(0, -1);
             },

             /**
              * Scrolls the current buffer vertically to the top.
              */
             scrollTop: function ()
             {
                 scrollToPercentiles(-1, 0);
             },

             //

             setMark: function (aKey)
             {
                 var win   = findScrollableWindow();
                 var marks = getMarks(win);

                 marks[aKey] = new Mark();
                 marks[aKey].setWindow(win);
             },

             scrollToMark: function (aMark)
             {
                 if (!aMark)
                     return;

                 var win = findScrollableWindow();
                 win.scrollTo(aMark.x, aMark.y);
             },

             getMarksForWin: function (aWin)
             {
                 var win   = aWin || findScrollableWindow();
                 var marks = getMarks(win);

                 return marks;
             }
         };

         // }} ======================================================================= //

         return self;
     })();

// }} ======================================================================= //

// Misc {{ ================================================================== //

function getElapsedTimeString(aMillisec) {
    function format(num, str) {
        return Math.floor(num) + " " + str;
    }

    var sec = aMillisec / 1000;
    if (sec < 1.0)
        return M({ja: "ついさっき", en: "just now"});
    var min = sec / 60;
    if (min < 1.0)
        return format(sec, M({ja: "秒前", en: "seconds ago"}));
    var hour = min / 60;
    if (hour < 1.0)
        return format(min, M({ja: "分前", en: "minutes ago"}));
    var date = hour / 24;
    if (date < 1.0)
        return format(hour, M({ja: "時間前", en: "hours ago"}));
    return format(date, M({ja: "日前", en: "days ago"}));
}

// }} ======================================================================= //

// Add exts {{ ============================================================== //

ext.add("scrollet-scroll-line-down", function (ev, arg) {
            scrollet.scrollLines(Math.max(arg, 1));
        }, M({en: "Scroll line down", ja: "一行スクロールダウン"}));

ext.add("scrollet-scroll-line-up", function (ev, arg) {
            scrollet.scrollLines(-Math.max(arg, 1));
        }, M({en: "Scroll line up", ja: "一行スクロールアップ"}));

ext.add("scrollet-scroll-document-down", function (ev, arg) {
            scrollet.scrollByScrollSize(arg, true);
        }, M({en: "Scroll document down", ja: "半画面スクロールダウン"}));

ext.add("scrollet-scroll-document-up", function (ev, arg) {
            scrollet.scrollByScrollSize(arg, false);
        }, M({en: "Scroll document up", ja: "半画面スクロールアップ"}));

ext.add("scrollet-scroll-document-right", function (ev, arg) {
            scrollet.scrollColumns(Math.max(arg, 1));
        }, M({en: "Scroll document to the right", ja: "右へスクロール"}));

ext.add("scrollet-scroll-document-left", function (ev, arg) {
            scrollet.scrollColumns(-Math.max(arg, 1));
        }, M({en: "Scroll document to the left", ja: "左へスクロール"}));

ext.add("scrollet-scroll-percent", function (ev, arg) {
            if (typeof arg !== 'number')
                return;

            if (arg > 0 && arg <= 100)
                scrollet.scrollToPercentiles(scrollet.scrollXPercent, arg);
        }, M({en: "Scroll document to the left", ja: "前置引数で指定した割合までページをスクロール"}));

ext.add("scrollet-set-mark", function (ev, arg) {
            prompt.reader(
                {
                    message: M({en: "Input the mark", ja: "現在のスクロール位置を保存:"}),
                    onChange: function (arg) {
                        var current = arg.textbox.value;
                        if (current)
                            arg.finish();
                    },
                    collection: null,
                    callback: function (aStr) {
                        if (aStr === null)
                            return;

                        scrollet.setMark(aStr);
                    }
                }
            );
        }, M({en: "Save current scroll position to the mark", ja: "現在のスクロール位置を保存"}));

ext.add("scrollet-scroll-to-mark", function (ev, arg) {
            var win   = scrollet.currentWindow();
            var marks = scrollet.getMarksForWin(win);

            var current = Date.now();
            var collection = [[k,
                               util.format("(%s, %s)", marks[k].x, marks[k].y),
                               getElapsedTimeString(current - marks[k].date)] for (k in marks)].sort(
                                   function (a, b) (a[0] > b[0] ? 1 : a[0] === b[0] ? 0 : -1)
                               );

            function recoverFocus()
            {
                gBrowser.focus();
                _content.focus();
            }

            prompt.reader(
                {
                    message: M({ja: "スクロール先 (TAB で一覧):", en: "Scroll to (Press TAB to see completions):"}),
                    onChange: function (arg) {
                        if (arg.event.keyCode === KeyEvent.DOM_VK_SHIFT ||
                            arg.event.keyCode === KeyEvent.DOM_VK_TAB)
                        {
                            return;
                        }

                        var current = arg.textbox.value;
                        if (current)
                            arg.finish();
                    },
                    collection: collection,
                    header: [
                        M({ja: "マーク", en: "Mark"}), M({ja: "位置", en: "Position"}), M({ja: "記録された時間", en: "Recorded time"})
                    ],
                    style: [
                        "font-weight:bold;text-align:right;margin-right:1em;", "font-weight:bold;", "color:#132fc2;"
                    ],
                    width: [
                        30, 40, 30
                    ],
                    supressRecoverFocus: true,
                    callback: function (aStr) {
                        if (aStr === null || !marks[aStr])
                        {
                            recoverFocus();
                            return;
                        }

                        scrollet.scrollToMark(marks[aStr]);
                        recoverFocus();
                    }
                }
            );
        }, M({en: "Scroll to the saved position", ja: "マークに保存された位置へスクロール"}));

// }} ======================================================================= //

// Export library {{ ======================================================== //

plugins.scrollet = scrollet;

// }} ======================================================================= //
