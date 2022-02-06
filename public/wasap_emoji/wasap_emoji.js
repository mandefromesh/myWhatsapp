const WasapEmojiPicker = function (options) {
    console.log(options)
    this.options = options;
    this.trigger = this.options.trigger.map(item => item.selector);
    this.insertInto = undefined;
    let emojiList = undefined;

    this.lib = function (el = undefined) {

        const isNodeList = (nodes) => {
            var stringRepr = Object.prototype.toString.call(nodes);

            return typeof nodes === 'object' &&
                /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
                (typeof nodes.length === 'number') &&
                (nodes.length === 0 || (typeof nodes[0] === "object" && nodes[0].nodeType > 0));
        }

        return {

            el: () => {
                // Check if is node
                if (!el) {
                    return undefined;
                } else if (el.nodeName) {
                    return [el];
                } else if (isNodeList(el)) {
                    return Array.from(el)
                } else if (typeof (el) === 'string' || typeof (el) === 'STRING') {
                    return Array.from(document.querySelectorAll(el));
                } else {
                    return undefined;
                }
            },

            on(event, callback, classList = undefined) {
                if (!classList) {
                    this.el().forEach(item => {
                        item.addEventListener(event, callback.bind(item))
                    })
                } else {
                    this.el().forEach(item => {
                        item.addEventListener(event, (e) => {
                            if (e.target.closest(classList)) {

                                let attr = undefined;

                                if (Array.isArray(classList)) {
                                    const stringifiedElem = e.target.outerHTML;

                                    const index = classList.findIndex(attr => stringifiedElem.includes(attr.slice(1)));

                                    attr = classList[index];
                                }

                                callback(e, attr)
                            }
                        })
                    })
                }
            },

            css(params) {
                for (const key in params) {
                    if (Object.hasOwnProperty.call(params, key)) {
                        const cssVal = params[key];
                        this.el().forEach(el => el.style[key] = cssVal)
                    }
                }
            },

            attr(param1, param2 = undefined) {

                if (!param2) {
                    return this.el()[0].getAttribute(param1)
                }
                this.el().forEach(el => el.setAttribute(param1, param2))
            },

            removeAttr(param) {
                this.el().forEach(el => el.removeAttribute(param))
            },

            addClass(param) {
                this.el().forEach(el => el.classList.add(param))
            },

            removeClass(param) {
                this.el().forEach(el => el.classList.remove(param))
            },

            slug(str) {
                return str
                    .toLowerCase()
                    .replace(/[^\u00BF-\u1FFF\u2C00-\uD7FF\w]+|[\_]+/ig, '-')
                    .replace(/ +/g, '-')
                    ;
            },

            remove(param) {
                this.el().forEach(el => el.remove())
            },

            val(param = undefined) {
                let val;

                if (param === undefined) {
                    this.el().forEach(el => {
                        val = el.value;
                    })
                } else {
                    this.el().forEach(el => {
                        el.value = param;
                    })
                }

                return val;
            },

            text(msg = undefined) {
                if (msg === undefined) {
                    return el.innerText;
                } else {
                    this.el().forEach(el => {
                        el.innerText = msg;
                    })
                }
            },

            html(data = undefined) {
                if (data === undefined) {
                    return el.innerHTML;
                } else {
                    this.el().forEach(el => {
                        el.innerHTML = data;
                    })
                }
            }
        }
    };


    const functions = {

        // styles: () => {

        //     const styles = `
        //         <style>
        //             /* div.wasap-emoji-area > div.wasap_emoji  */
        //             .wasap_emoji {
        //                 position: absolute;
        //                 bottom: 0;
        //                 box-sizing: border-box;
        //                 width: 100%;
        //             }

        //             html[dir="rtl"] .wasap_emoji {
        //                 right: 0;
        //             }

        //             html[dir="ltr"] .wasap_emoji {
        //                 left: 0;
        //             }

        //             ._3Bc7H {
        //                 position: relative;
        //             }
        //             html[dir] ._1DP8V {
        //                 transform: translateZ(0);
        //                 transform-origin: bottom;
        //             }

        //             ._1DP8V {
        //                 height: 320px;
        //                 overflow: hidden;
        //             }
        //             html[dir="rtl"] ._16kef {
        //                 border-right: 1px solid rgba(0, 0, 0, 0.05);
        //             }

        //             html[dir="ltr"] ._16kef {
        //                 border-left: 1px solid rgba(0, 0, 0, 0.05);
        //             }

        //             html[dir] ._16kef {
        //                 background-color: #f0f0f0;
        //             }

        //             ._16kef {
        //                 position: relative;
        //                 z-index: 300;
        //                 display: flex;
        //                 flex: none;
        //                 align-items: center;
        //                 height: 44px;
        //                 color: rgba(0, 0, 0, 0.35);
        //             }

        //             /* selected tab */
        //             html[dir="rtl"] .NCirl {
        //                 right: 0;
        //             }

        //             html[dir="ltr"] .NCirl {
        //                 left: 0;
        //             }

        //             html[dir] .NCirl {
        //                 background-color: #009688;
        //             }

        //             ._2TG0r {
        //                 transition: transform .3s cubic-bezier(.1, .82, .25, 1), opacity .3s cubic-bezier(.1, .82, .25, 1), height .3s cubic-bezier(.1, .82, .25, 1);
        //             }

        //             .NCirl {
        //                 position: absolute;
        //                 bottom: 0;
        //                 width: 11.1111%;
        //                 height: 4px; 
        //                 opacity: 1;
        //                 transition: height .3s ease;
        //             }

        //             /* last used emojis tab */
        //             html[dir] ._-2oTK {
        //                 padding: 0 4px;
        //             }

        //             ._1v2yz {
        //                 color: rgba(0, 0, 0, 0.6);
        //             }

        //             ._-2oTK {
        //                 box-sizing: border-box;
        //                 flex: 1;
        //                 overflow: hidden;
        //                 font-size: 13px;
        //                 font-weight: 500;
        //                 line-height: 19px;
        //                 color: rgba(0, 0, 0, .32);
        //                 text-transform: uppercase;
        //             }

        //             ._1zlQ1 {
        //                 display: flex;
        //                 flex-direction: column;
        //                 align-items: center;
        //                 justify-content: center;
        //                 height: 44px;
        //             }

        //             html[dir="rtl"] ._2bgh7 {
        //                 border-right: 1px solid rgba(0, 0, 0, 0.05);
        //             }

        //             html[dir="ltr"] ._2bgh7 {
        //                 border-left: 1px solid rgba(0, 0, 0, 0.05);
        //             }

        //             html[dir] ._2bgh7 {
        //                 background-color: #f0f0f0;
        //             }

        //             ._2bgh7 {
        //                 position: relative;
        //             }

        //             ._1Kk5B {
        //                 z-index: 200;
        //                 display: block;
        //             }

        //             ._3Cc11,
        //             ._1Kk5B {
        //                 position: relative;
        //             }

        //             html[dir="rtl"] ._10mnt._3KMMv {
        //                 left: 15px;
        //             }

        //             html[dir="ltr"] ._10mnt._3KMMv {
        //                 right: 15px;
        //             }

        //             html[dir="rtl"] ._10mnt {
        //                 left: 6px;
        //                 right: 0;
        //             }

        //             html[dir="ltr"] ._10mnt {
        //                 right: 6px;
        //                 left: 0;
        //             }

        //             html[dir] ._10mnt {
        //                 padding: 6px 12px;
        //                 background-color: #f0f0f0;
        //             }

        //             ._10mnt {
        //                 position: absolute;
        //                 top: 0;
        //                 z-index: 200;
        //             }

        //             html[dir] ._2VSMU {
        //                 background-color: #e6e6e6;
        //                 border-radius: 5px;
        //             }

        //             ._2VSMU {
        //                 display: block;
        //                 flex-grow: 1;
        //                 overflow-x: hidden;
        //                 overflow-y: auto;
        //             }

        //             html[dir] .M1or0 {
        //                 padding: 10px 12px;
        //             }

        //             .M1or0 {
        //                 display: flex;
        //                 align-items: center;
        //                 transition: height .18s ease-in-out;
        //             }

        //             /* search emoji text input area  */
        //             html[dir="rtl"] ._3K9QW {
        //                 text-align: right;
        //             }

        //             html[dir="ltr"] ._3K9QW {
        //                 text-align: left;
        //             }

        //             html[dir] ._3K9QW {
        //                 padding: 0;
        //                 background: inherit;
        //                 border: none;
        //             }

        //             ._3K9QW {
        //                 z-index: 1;
        //                 width: 100%;
        //                 min-height: 20px;
        //                 font-size: 15px;
        //                 font-weight: 400;
        //                 line-height: 20px;
        //                 color: var(--primary-text);
        //                 outline: none;
        //             }

        //             /* emoji content area */

        //             ._3Cc11 {
        //                 z-index: 100;
        //             }

        //             html[dir] ._1rtUb {
        //                 padding-top: 10px; /*62px; no search*/
        //             }

        //             ._1rtUb {
        //                 position: relative;
        //                 box-sizing: border-box;
        //                 height: 276px;
        //                 overflow-x: hidden;
        //                 overflow-y: scroll;
        //             }

        //             html[dir] .WYyr1 {
        //                 margin-top: -1px;
        //             }

        //             ._3uIPm {
        //                 position: relative;
        //                 overflow: hidden;
        //             }

        //             /* emoji row */
        //             ._3m_Xw {
        //                 position: absolute;
        //                 width: 100%;
        //             }

        //             /* emoji row container */
        //             html[dir="ltr"] ._2Wd6U,
        //             html[dir="rtl"] ._2Wd6U {
        //                 margin-right: 12px;
        //                 margin-left: 12px;
        //             }

        //             /* emoji row container container container */
        //             ._27GWS {
        //                 white-space: nowrap;
        //             }

        //             /* emoji*/
        //             html[dir] ._27GWS .emojik {
        //                 margin: 6px;
        //                 cursor: pointer;
        //                 border-radius: 3px;
        //             }

        //             html[dir] .emojik.wa {
        //                 background-size: 160px 160px;
        //             }

        //             .emoji.wa.b81,
        //             .emojik.wa.b81 {
        //                 background-image: url("img/emoji-81-64_37ebc47.webp");
        //             }

        //             .emoji.wa.b82,
        //             .emojik.wa.b82 {
        //                 background-image: url("img/emoji-82-64_c1eba8a.webp");
        //             }

        //             .emoji.wa.b97,
        //             .emojik.wa.b97 {
        //                 background-image: url("img/emoji-97-64_d321ca5.webp");
        //             }

        //             .emoji.wa.b105,
        //             .emojik.wa.b105 {
        //                 background-image: url("img/emoji-105-64_db6d4e3.webp");
        //             }

        //             .emoji.wa.b3,
        //             .emojik.wa.b3 {
        //                 background-image: url("img/emoji-3-64_0b9fe45.webp");
        //             }

        //             .emoji.wa.b84,
        //             .emojik.wa.b84 {
        //                 background-image: url("img/emoji-84-64_929560c.webp");
        //             }

        //             .emoji.wa.b24,
        //             .emojik.wa.b24 {
        //                 background-image: url("img/emoji-24-64_abf067b.webp");
        //             }

        //             .emoji.wa.b95,
        //             .emojik.wa.b95 {
        //                 background-image: url("img/emoji-95-64_76c46c9.webp");
        //             }

        //             .emoji.wa.b87,
        //             .emojik.wa.b87 {
        //                 background-image: url("img/emoji-87-64_428370e.webp");
        //             }

        //             .emoji.wa.b7,
        //             .emojik.wa.b7 {
        //                 background-image: url("img/emoji-7-64_1dd3846.webp");
        //             }

        //             .emoji.wa.b25,
        //             .emojik.wa.b25 {
        //                 background-image: url("img/emoji-25-64_7d8ffef.webp");
        //             }

        //             .emoji.wa.b26,
        //             .emojik.wa.b26 {
        //                 background-image: url("img/emoji-26-64_c3f1765.webp");
        //             }

        //             .emoji.wa.b38,
        //             .emojik.wa.b38 {
        //                 background-image: url("img/emoji-38-64_8af6206.webp");
        //             }

        //             .emoji.wa.b66,
        //             .emojik.wa.b66 {
        //                 background-image: url("img/emoji-66-64_73011a9.webp");
        //             }

        //             .emoji.wa.b83,
        //             .emojik.wa.b83 {
        //                 background-image: url("img/emoji-83-64_78e2b60.webp");
        //             }

        //             .emoji.wa.b126,
        //             .emojik.wa.b126 {
        //                 background-image: url("img/emoji-126-64_18851e7.webp");
        //             }

        //             .emoji.wa.b6,
        //             .emojik.wa.b6 {
        //                 background-image: url("img/emoji-6-64_72434c2.webp");
        //             }

        //             .emoji.wa.b101,
        //             .emojik.wa.b101 {
        //                 background-image: url("img/emoji-101-64_d5334af.webp");
        //             }

        //             .emoji.wa.b98,
        //             .emojik.wa.b98 {
        //                 background-image: url("img/emoji-98-64_6fb5d64.webp");
        //             }

        //             .emoji.wa.b67,
        //             .emojik.wa.b67 {
        //                 background-image: url("img/emoji-67-64_8830247.webp");
        //             }

        //             .emoji.wa.b112,
        //             .emojik.wa.b112 {
        //                 background-image: url("img/emoji-112-64_d50117f.webp");
        //             }

        //             .emoji.wa.b106,
        //             .emojik.wa.b106 {
        //                 background-image: url("img/emoji-106-64_98dee68.webp");
        //             }

        //             .emoji.wa.b71,
        //             .emojik.wa.b71 {
        //                 background-image: url("img/emoji-71-64_d7e8913.webp");
        //             }

        //             .emoji.wa.b2,
        //             .emojik.wa.b2 {
        //                 background-image: url("img/emoji-2-64_2224eba.webp");
        //             }

        //             .emoji.wa.b49,
        //             .emojik.wa.b49 {
        //                 background-image: url("img/emoji-49-64_7a7637f.webp");
        //             }

        //             .emoji.wa.b50,
        //             .emojik.wa.b50 {
        //                 background-image: url("img/emoji-50-64_bec2fdf.webp");
        //             }

        //             .emoji.wa.b39,
        //             .emojik.wa.b39 {
        //                 background-image: url("img/emoji-39-64_3e4cd80.webp");
        //             }

        //             .emoji.wa.b128,
        //             .emojik.wa.b128 {
        //                 background-image: url("img/emoji-128-64_0276720.webp");
        //             }

        //             .emoji.wa.b99,
        //             .emojik.wa.b99 {
        //                 background-image: url("img/emoji-99-64_6b996dd.webp");
        //             }

        //             .emoji.wa.b86,
        //             .emojik.wa.b86 {
        //                 background-image: url("img/emoji-86-64_4e858e5.webp");
        //             }

        //             .emoji.wa.b37,
        //             .emojik.wa.b37 {
        //                 background-image: url("img/emoji-37-64_87ac96a.webp");
        //             }

        //             .emoji.wa.b96,
        //             .emojik.wa.b96 {
        //                 background-image: url("img/emoji-96-64_05bd55e.webp");
        //             }

        //             .emoji.wa.b36,
        //             .emojik.wa.b36 {
        //                 background-image: url("img/emoji-36-64_1b3d484.webp");
        //             }

        //             .emoji.wa.b80,
        //             .emojik.wa.b80 {
        //                 background-image: url("img/emoji-80-64_c585594.webp");
        //             }

        //             .emoji.wa.b110,
        //             .emojik.wa.b110 {
        //                 background-image: url("img/emoji-110-64_968722c.webp");
        //             }

        //             .emoji.wa.b108,
        //             .emojik.wa.b108 {
        //                 background-image: url("img/emoji-108-64_338835d.webp");
        //             }

        //             .emoji.wa.b68,
        //             .emojik.wa.b68 {
        //                 background-image: url("img/emoji-68-64_4b471be.webp");
        //             }

        //             .emoji.wa.b69,
        //             .emojik.wa.b69 {
        //                 background-image: url("img/emoji-69-64_e607bf5.webp");
        //             }

        //             .emoji.wa.b109,
        //             .emojik.wa.b109 {
        //                 background-image: url("img/emoji-109-64_a6b0372.webp");
        //             }

        //             .emoji.wa.b40,
        //             .emojik.wa.b40 {
        //                 background-image: url("img/emoji-40-64_dea012c.webp");
        //             }

        //             .emoji.wa.b130,
        //             .emojik.wa.b130 {
        //                 background-image: url("img/emoji-130-64_a609d4f.webp");
        //             }

        //             .emoji.wa.b129,
        //             .emojik.wa.b129 {
        //                 background-image: url("img/emoji-129-64_9573645.webp");
        //             }

        //             .emoji.wa.b65,
        //             .emojik.wa.b65 {
        //                 background-image: url("img/emoji-65-64_36f0702.webp");
        //             }

        //             .emoji.wa.b65,
        //             .emojik.wa.b65 {
        //                 background-image: url("img/emoji-65-64_36f0702.webp");
        //             }

        //             .emoji.wa.b121,
        //             .emojik.wa.b121 {
        //                 background-image: url("img/emoji-121-64_16c51db.webp");
        //             }

        //             .emoji.wa.b113,
        //             .emojik.wa.b113 {
        //                 background-image: url("img/emoji-113-64_dba5f1b.webp");
        //             }

        //             .emoji.wa.b51,
        //             .emojik.wa.b51 {
        //                 background-image: url("img/emoji-51-64_5543365.webp");
        //             }

        //             .emoji.wa.b42,
        //             .emojik.wa.b42 {
        //                 background-image: url("img/emoji-42-64_ac92df9.webp");
        //             }

        //             .emoji.wa.b63,
        //             .emojik.wa.b63 {
        //                 background-image: url("img/emoji-63-64_4775444.webp");
        //             }

        //             .emoji.wa.b64,
        //             .emojik.wa.b64 {
        //                 background-image: url("img/emoji-64-64_838a358.webp");
        //             }

        //             .emoji.wa.b122,
        //             .emojik.wa.b122 {
        //                 background-image: url("img/emoji-122-64_67a21f5.webp");
        //             }

        //             .emoji.wa.b79,
        //             .emojik.wa.b79 {
        //                 background-image: url("img/emoji-79-64_1395194.webp");
        //             }

        //             .emoji.wa.b62,
        //             .emojik.wa.b62 {
        //                 background-image: url("img/emoji-62-64_620104d.webp");
        //             }

        //             .emoji.wa.b41,
        //             .emojik.wa.b41 {
        //                 background-image: url("img/emoji-41-64_0bfd00d.webp");
        //             }

        //             .emoji.wa.b100,
        //             .emojik.wa.b100 {
        //                 background-image: url("img/emoji-100-64_1d332e2.webp");
        //             }

        //             .emoji.wa.b124,
        //             .emojik.wa.b124 {
        //                 background-image: url("img/emoji-124-64_f501f99.webp");
        //             }

        //             .emoji.wa.b125,
        //             .emojik.wa.b125 {
        //                 background-image: url("img/emoji-125-64_21b8cd1.webp");
        //             }

        //             .emoji.wa.b85,
        //             .emojik.wa.b85 {
        //                 background-image: url("img/emoji-85-64_fae06f3.webp");
        //             }

        //             .emoji.wa.b78,
        //             .emojik.wa.b78 {
        //                 background-image: url("img/emoji-78-64_5e1660c.webp");
        //             }

        //             .emoji.wa.b114,
        //             .emojik.wa.b114 {
        //                 background-image: url("img/emoji-114-64_e030c5c.webp");
        //             }

        //             .emoji.wa.b91,
        //             .emojik.wa.b91 {
        //                 background-image: url("img/emoji-91-64_52d7641.webp");
        //             }

        //             .emoji.wa.b70,
        //             .emojik.wa.b70 {
        //                 background-image: url("img/emoji-70-64_e4f5f3f.webp");
        //             }

        //             .emoji.wa.b111,
        //             .emojik.wa.b111 {
        //                 background-image: url("img/emoji-111-64_1d7689c.webp");
        //             }

        //             .emoji.wa.b28,
        //             .emojik.wa.b28 {
        //                 background-image: url("img/emoji-28-64_57db7e9.webp");
        //             }

        //             .emoji.wa.b61,
        //             .emojik.wa.b61 {
        //                 background-image: url("img/emoji-61-64_a99489e.webp");
        //             }

        //             .emoji.wa.b127,
        //             .emojik.wa.b127 {
        //                 background-image: url("img/emoji-127-64_77c853f.webp");
        //             }

        //             .emoji.wa.b27,
        //             .emojik.wa.b27 {
        //                 background-image: url("img/emoji-27-64_63c4caa.webp");
        //             }

        //             .emoji.wa.b5,
        //             .emojik.wa.b5 {
        //                 background-image: url("img/emoji-5-64_a55d276.webp");
        //             }

        //             .emoji.wa.b72,
        //             .emojik.wa.b72 {
        //                 background-image: url("img/emoji-72-64_f80d26f.webp");
        //             }

        //             .emoji.wa.b35,
        //             .emojik.wa.b35 {
        //                 background-image: url("img/emoji-35-64_c5081c9.webp");
        //             }

        //             .emoji.wa.b34,
        //             .emojik.wa.b34 {
        //                 background-image: url("img/emoji-34-64_6a75fe0.webp");
        //             }

        //             .emoji.wa.b33,
        //             .emojik.wa.b33 {
        //                 background-image: url("img/emoji-33-64_9674031.webp");
        //             }

        //             .emoji.wa.b107,
        //             .emojik.wa.b107 {
        //                 background-image: url("img/emoji-107-64_03e68f5.webp");
        //             }

        //             .emoji.wa.b77,
        //             .emojik.wa.b77 {
        //                 background-image: url("img/emoji-77-64_33a2551.webp");
        //             }

        //             .emoji.wa.b22,
        //             .emojik.wa.b22 {
        //                 background-image: url("img/emoji-22-64_d0de61a.webp");
        //             }

        //             .emoji.wa.b103,
        //             .emojik.wa.b103 {
        //                 background-image: url("img/emoji-103-64_bef85df.webp");
        //             }

        //             .emoji.wa.b21,
        //             .emojik.wa.b21 {
        //                 background-image: url("img/emoji-21-64_2a928c7.webp");
        //             }

        //             .emoji.wa.b23,
        //             .emojik.wa.b23 {
        //                 background-image: url("img/emoji-23-64_951eaf0.webp");
        //             }

        //             .emoji.wa.b20,
        //             .emojik.wa.b20 {
        //                 background-image: url("img/emoji-20-64_5da7428.webp");
        //             }

        //             .emoji.wa.b8,
        //             .emojik.wa.b8 {
        //                 background-image: url("img/emoji-8-64_270a5f3.webp");
        //             }

        //             .emoji.wa.b4,
        //             .emojik.wa.b4 {
        //                 background-image: url("img/emoji-4-64_17c7395.webp");
        //             }

        //             .emoji.wa.b76,
        //             .emojik.wa.b76 {
        //                 background-image: url("img/emoji-76-64_ad38c5f.webp");
        //             }

        //             .emoji.wa.b104,
        //             .emojik.wa.b104 {
        //                 background-image: url("img/emoji-104-64_87d3d34.webp");
        //             }

        //             .emoji.wa.b29,
        //             .emojik.wa.b29 {
        //                 background-image: url("img/emoji-29-64_a5c7aae.webp");
        //             }

        //             .emoji.wa.b31,
        //             .emojik.wa.b31 {
        //                 background-image: url("img/emoji-31-64_3e451ea.webp");
        //             }

        //             .emoji.wa.b94,
        //             .emojik.wa.b94 {
        //                 background-image: url("img/emoji-94-64_e15b9d8.webp");
        //             }

        //             .emoji.wa.b30,
        //             .emojik.wa.b30 {
        //                 background-image: url("img/emoji-30-64_3f057f6.webp");
        //             }

        //             .emoji.wa.b102,
        //             .emojik.wa.b102 {
        //                 background-image: url("img/emoji-102-64_e41e707.webp");
        //             }

        //             .emoji.wa.b123,
        //             .emojik.wa.b123 {
        //                 background-image: url("img/emoji-123-64_b8dc46e.webp");
        //             }

        //             .emoji.wa.b89,
        //             .emojik.wa.b89 {
        //                 background-image: url("img/emoji-89-64_8189c09.webp");
        //             }

        //             .emoji.wa.b90,
        //             .emojik.wa.b90 {
        //                 background-image: url("img/emoji-90-64_c7cdfc4.webp");
        //             }

        //             .emoji.wa.b32,
        //             .emojik.wa.b32 {
        //                 background-image: url("img/emoji-32-64_8e8748b.webp");
        //             }

        //             .emoji.wa.b88,
        //             .emojik.wa.b88 {
        //                 background-image: url("img/emoji-88-64_21fa232.webp");
        //             }

        //             .emoji.wa.b93,
        //             .emojik.wa.b93 {
        //                 background-image: url("img/emoji-93-64_251748f.webp");
        //             }

        //             .emoji.wa.b1,
        //             .emojik.wa.b1 {
        //                 background-image: url("img/emoji-1-64_2daeeb8.webp");
        //             }

        //             .emoji.wa.b74,
        //             .emojik.wa.b74 {
        //                 background-image: url("img/emoji-74-64_e8a7519.webp");
        //             }

        //             .emoji.wa.b73,
        //             .emojik.wa.b73 {
        //                 background-image: url("img/emoji-73-64_efbc9b8.webp");
        //             }

        //             .emoji.wa.b75,
        //             .emojik.wa.b75 {
        //                 background-image: url("img/emoji-75-64_ec05a92.webp");
        //             }

        //             .emoji.wa.b92,
        //             .emojik.wa.b92 {
        //                 background-image: url("img/emoji-92-64_10d01ec.webp");
        //             }

        //             .emoji.wa.b9,
        //             .emojik.wa.b9 {
        //                 background-image: url("img/emoji-9-64_7a609af.webp");
        //             }

        //             .emoji.wa.b0,
        //             .emojik.wa.b0 {
        //                 background-image: url("img/emoji-0-64_275ab2d.webp");
        //             }

        //             .emoji.wa.b10,
        //             .emojik.wa.b10 {
        //                 background-image: url("img/emoji-10-64_4bc31db.webp");
        //             }

        //             .emoji.wa.b14,
        //             .emojik.wa.b14 {
        //                 background-image: url("img/emoji-14-64_893eec6.webp");
        //             }

        //             .emoji.wa.b11,
        //             .emojik.wa.b11 {
        //                 background-image: url("img/emoji-11-64_a662a91.webp");
        //             }

        //             .emoji.wa.b13,
        //             .emojik.wa.b13 {
        //                 background-image: url("img/emoji-13-64_5d916f5.webp");
        //             }

        //             .emoji.wa.b18,
        //             .emojik.wa.b18 {
        //                 background-image: url("img/emoji-18-64_1e2bb45.webp");
        //             }

        //             .emoji.wa.b16,
        //             .emojik.wa.b16 {
        //                 background-image: url("img/emoji-16-64_d41b50c.webp");
        //             }

        //             .emoji.wa.b12,
        //             .emojik.wa.b12 {
        //                 background-image: url("img/emoji-12-64_1a6e349.webp");
        //             }

        //             .emoji.wa.b19,
        //             .emojik.wa.b19 {
        //                 background-image: url("img/emoji-19-64_6fda0bc.webp");
        //             }

        //             .emoji.wa.b15,
        //             .emojik.wa.b15 {
        //                 background-image: url("img/emoji-15-64_6bd244c.webp");
        //             }

        //             .emoji.wa.b17,
        //             .emojik.wa.b17 {
        //                 background-image: url("img/emoji-17-64_1390219.webp");
        //             }

        //             html[dir] .emoji,
        //             html[dir] .emojik {
        //                 border: 0;
        //             }

        //             .emojik {
        //                 width: 32px;
        //                 height: 32px;
        //                 image-rendering: -webkit-optimize-contrast;
        //             }

        //             .emoji,
        //             .emojik {
        //                 display: inline-block;
        //                 vertical-align: top;
        //                 zoom: 1;
        //             }

        //         </style>
        //     `;

        //     document.head.insertAdjacentHTML('beforeend', styles);

        // },



        render: (e, attr) => {

            emojiList = undefined;

            const index = 0;//this.options.trigger.findIndex(item => item.selector === attr);
            this.insertInto = this.options.trigger[index].insertInto;

            if (document.querySelector('.wasap_emoji')) {
                this.lib('.wasap_emoji').remove();
            }


            const picker = `
            <div class="wasap_emoji">
                <div class="_3Bc7H">
                    <div class="" style="transform: translateY(0px);">
                        <div class="_3Bc7H">
                            <div class="_1DP8V">
                                <div tabindex="-1">
                                    <div class="_16kef">
                                        <div class="NCirl _2TG0r"
                                            style="transform: translateX(0%);">
                                        </div>
                                        <div class="_1zlQ1 _-2oTK _1v2yz" title="אחרונים" tabindex="0">
                                            <span role="button"
                                                data-testid="panel-recent" 
                                                data-icon="panel-recent"class="">
                                                <svg width="24" height="24" viewBox="0 0 24 24" class="">
                                                    <path
                                                        d="M20.538 11.975a8.563 8.563 0 1 0-17.126 0 8.563 8.563 0 0 0 17.126 0Zm1.412 0c0 5.509-4.466 9.975-9.975 9.975C6.465 21.95 2 17.484 2 11.975 2 6.465 6.466 2 11.975 2c5.509 0 9.975 4.466 9.975 9.975Zm-9.832-5.27v5.692l4.386 2.627a.706.706 0 1 1-.725 1.212l-5.073-3.04v-6.49a.706.706 0 1 1 1.412 0Z"
                                                        fill="currentColor">
                                                    </path>
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="_1zlQ1 _-2oTK" title="סמיילי ואנשים" tabindex="0">
                                            <span role="button"
                                                data-testid="panel-emoji-people"
                                                data-icon="panel-emoji-people" class="">
                                                <svg viewBox="0 0 24 24" width="24" height="24"class="">
                                                    <path fill="currentColor"
                                                        d="M12 22.1C6.4 22.1 1.9 17.6 1.9 12S6.4 1.9 12 1.9 22.1 6.4 22.1 12 17.6 22.1 12 22.1zm0-18.6c-4.7 0-8.5 3.8-8.5 8.5s3.8 8.5 8.5 8.5 8.5-3.8 8.5-8.5-3.8-8.5-8.5-8.5z">
                                                    </path>
                                                    <path fill="currentColor"
                                                        d="M8.9 11.6c.7 0 1.3-.7 1.3-1.5s-.6-1.5-1.3-1.5-1.3.7-1.3 1.5.6 1.5 1.3 1.5zM17.1 13.6c-1.1.1-3 .4-5 .4s-4-.3-5-.4c-.4 0-.6.3-.4.7 1.1 2 3.1 3.5 5.5 3.5 2.3 0 4.4-1.5 5.5-3.5.1-.3-.2-.7-.6-.7zM12.3 16c-2.6 0-4.1-1-4.2-1.6 0 0 4.4.9 8 0 0 0-.5 1.6-3.8 1.6zM15.1 11.6c.7 0 1.3-.7 1.3-1.5s-.6-1.5-1.3-1.5-1.3.7-1.3 1.5.6 1.5 1.3 1.5z">
                                                    </path>
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="_1zlQ1 _-2oTK" title="בעלי חיים וטבע" tabindex="0">
                                            <span role="button"
                                                data-testid="panel-emoji-nature"
                                                data-icon="panel-emoji-nature" class="">
                                                <svg viewBox="0 0 24 24" width="24" height="24"class="">
                                                    <path fill="currentColor"
                                                        d="M7.2 12.2c.608 0 1.1.627 1.1 1.4S7.808 15 7.2 15s-1.1-.627-1.1-1.4.492-1.4 1.1-1.4zm9.7 0c.608 0 1.1.627 1.1 1.4s-.492 1.4-1.1 1.4-1.1-.627-1.1-1.4.492-1.4 1.1-1.4zm4.6-1.1-1.2-2.4c.9-.4 1.7-1.3 2-2.2.3-.7.4-2.1-1-3.5-1-.9-2-1.2-2.9-1-1.1.3-1.9 1.2-2.3 1.9-1.4-.7-2.9-.8-4.1-.8-1.5 0-2.8.3-4 .9-.5-.9-1.2-1.8-2.3-2.1-1-.2-2 .1-2.9 1-1 1-1.4 2.2-1 3.4.4 1.1 1.2 1.9 2 2.3-.2.5-.4 1-.6 1.6l-.2.2c-.3.7-.5 1.3-.8 1.9-.4 1-.9 1.9-.9 3.1 0 1.6.8 6.7 10.5 6.7 3.8 0 6.6-.7 8.5-2.2s2.2-3.4 2.2-4.3c.2-2.1-.2-2.9-1-4.5zm-2.7-7.6c.4-.1.9.1 1.5.6.6.6.8 1.2.6 1.8-.2.6-.7 1.1-1.2 1.3-.6-1.2-1.3-2-2.1-2.6.2-.4.6-1 1.2-1.1zM3.3 5.9c-.2-.6 0-1.2.6-1.8.5-.5 1.1-.7 1.5-.6.5.1 1.1.7 1.3 1.2-.9.7-1.6 1.5-2.2 2.6C4 7 3.4 6.5 3.3 5.9zm17.8 9.7c0 .7-.2 2-1.6 3.1-1.5 1.2-4.1 1.8-7.5 1.8-8.3 0-8.9-3.9-8.9-5.1 0-.8.3-1.5.7-2.4.3-.6.6-1.2.8-2.1l.1-.2c.5-1.5 2-6.2 7.3-6.2 1.2 0 2.5.2 3.7.9.1.1.5.3.5.3.9.7 1.7 1.7 2.4 3.2.6 1.3 1 2.2 1.4 2.9.8 1.6 1.1 2.1 1.1 3.8zM14.6 17c-.1.1-.6.4-1.2.3-.4-.1-.7-.3-.9-.8 0-.1-.1-.1-.1-.2.8-.1 1.3-.6 1.3-1.3s-.7 0-1.7 0c-.9 0-1.7-.7-1.7 0 0 .6.6 1.2 1.4 1.3l-.1.1c-.3.4-.5.7-.9.8-.5.1-1.1-.1-1.3-.3-.2-.2-.5-.1-.7.1s-.1.5.1.7c.1.1.8.5 1.6.5.2 0 .4 0 .5-.1.4-.1.8-.3 1.1-.7.4.4.9.6 1.2.7.8.2 1.7-.2 2-.5.2-.2.2-.5 0-.7-.1 0-.4-.1-.6.1z">
                                                    </path>
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="_1zlQ1 _-2oTK" title="מזון ומשקאות" tabindex="0">
                                            <span role="button"
                                                data-testid="panel-emoji-food"
                                                data-icon="panel-emoji-food" class="">
                                                <svg viewBox="0 0 24 24" width="24" height="24"class="">
                                                    <path fill="currentColor"
                                                        d="M7.4 11.4c-.4 0-.8.4-.8.8V14c0 .4.4.8.8.8s.8-.4.6-.8v-1.8c0-.6-.2-.8-.6-.8zM4.6 10.4c-.4 0-.8.4-.8.8V15c0 .4.4.8.8.8s.8-.4.8-.8v-3.8c0-.6-.4-.8-.8-.8z">
                                                    </path>
                                                    <path fill="currentColor"
                                                        d="M23 7.2c-.6-.6-1.6-.8-2.8-.6-.2 0-.4.2-.6.2V4.2c0-.6-.6-1.2-1.2-1.2h-17C.8 3 .2 3.6.2 4.2v7.4c0 5.4 3.2 9.6 8.4 9.6h2.2c4.2 0 7-2.6 8-6h.4c2.2-.4 4-2.6 4.4-4.8.4-1.4.2-2.4-.6-3.2zm-4.8-2.8v3H1.6v-3h16.6zM11 19.8H8.8c-5.2 0-7-4.4-7-8.2V8.8h16.6v2.8c-.2 4-2.4 8.2-7.4 8.2zm8.4-6.2c.2-.6.2-1.4.2-2V8.4c.4-.2.6-.4 1-.4.6-.2 1.2 0 1.4.4.4.4.6 1 .4 1.8-.2 1.4-1.6 3-3 3.4z">
                                                    </path>
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="_1zlQ1 _-2oTK" title="פעילות" tabindex="0">
                                            <span role="button"
                                                data-testid="panel-emoji-activity"
                                                data-icon="panel-emoji-activity" class="">
                                                <svg viewBox="0 0 24 24" width="24" height="24"class="">
                                                    <path fill="currentColor"
                                                        d="m14.8 15.3 1.3-3.8c.1-.2 0-.5-.2-.6l-3.3-2.4c-.2-.1-.5-.1-.6 0l-3.3 2.4c-.2.1-.3.4-.2.6l1.3 3.8c.1.2.3.4.5.4h4c.2 0 .4-.2.5-.4z">
                                                    </path>
                                                    <path fill="currentColor"
                                                        d="M12 1.9C6.4 1.9 1.9 6.4 1.9 12S6.4 22.1 12 22.1 22.1 17.6 22.1 12 17.6 1.9 12 1.9zM9.8 20.3c.1-.2.1-.4 0-.6l-1.4-2.3c-.1-.1-.2-.2-.4-.3l-2.5-.6c-.2-.1-.5.1-.6.2-.9-1.3-1.4-2.9-1.5-4.5.2 0 .4 0 .5-.2l1.7-2c.1 0 .2-.2.2-.3l-.3-2.6c0-.2-.1-.3-.3-.4C6.2 5.4 7.5 4.5 9 4c0 .1.2.3.3.3l2.5 1.1c.1.1.3.1.4 0l2.5-1.1.3-.3c1.5.6 2.7 1.5 3.7 2.7-.1.1-.2.2-.2.4l-.2 2.6c0 .2 0 .3.1.4l1.7 2c.1.1.3.2.4.2 0 1.6-.5 3.1-1.3 4.4-.1-.1-.2-.1-.4-.1l-2.5.6c-.1 0-.3.1-.4.3l-1.4 2.3c-.1.2-.1.3 0 .5-.8.2-1.6.4-2.5.4-.7-.1-1.5-.2-2.2-.4z">
                                                    </path>
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="_1zlQ1 _-2oTK" title="רכבים ותיירות" tabindex="0">
                                            <span role="button"
                                                data-testid="panel-emoji-travel"
                                                data-icon="panel-emoji-travel" class="">
                                                <svg viewBox="0 0 24 24" width="24" height="24"class="">
                                                    <path fill="currentColor"
                                                        d="M21.5 11.5c0-.7-.1-1.4-.3-2l-1.5-4.3C19.2 3.9 18 3 16.6 3H7.3c-1.4 0-2.6.9-3.1 2.2L2.6 9.9c-.1.4-.2.7-.2 1.1v8.6c0 .6.5 1.1 1.1 1.1h1.1c.6 0 1.1-.5 1.1-1.1v-1.1h12.7v1.1c0 .6.5 1.1 1.1 1.1h1.1c.6 0 1.1-.5 1.1-1.1v-7.4l-.2-.7zM4.1 10.4l1.6-4.7c.2-.7.9-1.2 1.7-1.2h9.2c.7 0 1.4.5 1.6 1.2l1.5 4.3c.1.3.2.6.2.8H4c-.1-.1 0-.3.1-.4zm1.4 5.7c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5c-.1.8-.7 1.5-1.5 1.5zm9.4-.6H9.3c-.5 0-1-.4-1-1 0-.5.4-1 1-1h5.6c.5 0 1 .4 1 1-.1.6-.5 1-1 1zm3.7.6c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z">
                                                    </path>
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="_1zlQ1 _-2oTK" title="חפצים" tabindex="0">
                                            <span role="button"
                                                data-testid="panel-emoji-objects"
                                                data-icon="panel-emoji-objects" class="">
                                                <svg viewBox="0 0 24 24" width="24" height="24"class="">
                                                    <path fill="currentColor"
                                                        d="M18.8 6.7c-.9-2.6-3.2-4.6-6-4.9h-1.6c-2.8.3-5.1 2.2-6 4.9-1 3 .1 6.2 2.7 8H8c.2.1.3.4.3.6v2c0 .8.6 1.4 1.4 1.4h4.6c.8 0 1.4-.6 1.4-1.4v-2c0-.2.1-.5.3-.6l.1-.1c2.5-1.8 3.6-5 2.7-7.9zm-3.5 6.9-.1.1c-.5.4-.9 1-.9 1.7v2s0 .1-.1.1H9.8s-.1 0-.1-.1v-2c0-.7-.3-1.3-.9-1.7l-.1-.1c-2-1.4-3-4-2.2-6.5.7-2.1 2.6-3.7 4.9-3.9H12.7c2.2.2 4.2 1.8 4.9 3.9.7 2.4-.2 5-2.3 6.5zM9.2 21.2c0 .6.5 1 1 1h3.7c.6 0 1-.5 1-1v-1H9.2v1z">
                                                    </path>
                                                    <path fill="currentColor"
                                                        d="M13.6 10.5c-.4 0-.8.3-.8.8 0 .1 0 .2.1.3-.2.3-.5.5-.8.5s-.6-.2-.8-.5c0-.1.1-.2.1-.3 0-.4-.3-.8-.8-.8-.4 0-.8.3-.8.8 0 .4.3.7.7.8.3.4.7.7 1.1.8V15c0 .2.2.4.4.4s.4-.2.4-.4v-2.1c.4-.1.8-.4 1.1-.8.4 0 .8-.3.8-.8s-.3-.8-.7-.8z">
                                                    </path>
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="_1zlQ1 _-2oTK" title="סמלים" tabindex="0">
                                            <span role="button"
                                                data-testid="panel-emoji-symbols"
                                                data-icon="panel-emoji-symbols" class="">
                                                <svg viewBox="0 0 24 24" width="24" height="24"class="">
                                                    <path fill="currentColor"
                                                        d="M14.5 12.9V11h2.2l-.2-1.3h-2V7.3H13v2.5h-2V7.4H9.5v2.4H7.2l.2 1.2h2.1v1.9H7.3l.2 1.3h2v2.4H11v-2.4h2v2.4h1.5v-2.4h2.3l-.2-1.3h-2.1zM11 11h2v1.9h-2V11z">
                                                    </path>
                                                    <path fill="currentColor"
                                                        d="M16.1 2.6H7.9C5 2.6 2.6 5 2.6 7.9V16c0 3 2.4 5.3 5.3 5.3H16c3 0 5.3-2.4 5.3-5.3V7.9c.1-2.9-2.3-5.3-5.2-5.3zm3.7 13.5c0 2.1-1.6 3.8-3.7 3.8H7.9c-2.1 0-3.8-1.7-3.8-3.8V7.9c0-2.1 1.7-3.8 3.8-3.8H16c2.1 0 3.8 1.7 3.8 3.8v8.2z">
                                                    </path>
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="_1zlQ1 _-2oTK" title="דגלים" tabindex="0">
                                            <span role="button"
                                                data-testid="panel-emoji-flags"
                                                data-icon="panel-emoji-flags" class="">
                                                <svg viewBox="0 0 24 24" width="24" height="24"class="">
                                                    <path fill="currentColor"
                                                        d="M5.5 3.8v-.2c0-.3-.2-.5-.5-.5h-.5c-.3 0-.5.2-.5.5V21c0 .3.2.5.5.5H5c.3 0 .5-.2.5-.5v-6.2c5 1.8 9.3-2.7 14.5.6V4.1C14.9 1 10.3 5.6 5.5 3.8zm10.3 8.8c-1.4 0-2.8.3-4.1.6-1.2.3-2.4.5-3.5.5-.9 0-1.8-.2-2.6-.5V5.4c.8.2 1.5.3 2.3.3 1.5 0 2.9-.4 4.3-.7 1.3-.3 2.5-.6 3.8-.6.9 0 1.7.2 2.5.5V13c-.9-.2-1.8-.4-2.7-.4z">
                                                    </path>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div tabindex="-1">
                                    <div class="_2bgh7">
                                        <!--
                                        <span class="_1Kk5B">
                                            <div tabindex="-1" data-tab="5" class="_10mnt _3KMMv"
                                                style="transform: translateY(0%);"><label
                                                    class="_2VSMU">
                                                    <div class="M1or0"><input
                                                            class="_3K9QW copyable-text selectable-text"
                                                            type="text" role="searchbox" dir="rtl"
                                                            title="חיפוש אמוג'י"
                                                            placeholder="חיפוש אמוג'י" value="">
                                                    </div>
                                                </label></div>
                                        </span>
                                        -->
                                        <div class="_3Cc11">
                                            <div class="_3Bc7H _1rtUb">
                                                <div class="" style="pointer-events: auto;">
                                                    <div class="_3uIPm WYyr1" style="height: 4299px;">

                                                        <div class="_3m_Xw" id="panel-recent"
                                                            style="z-index: 93; transition: none 0s ease 0s; height: 27px; transform: translateY(0px);">
                                                            <div class="xfDtH">אחרונים</div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 98; transition: none 0s ease 0s; height: 44px; transform: translateY(27px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b97 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b95 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b87 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b7 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b95 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b84 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b25 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b38 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b66 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b66 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 97; transition: none 0s ease 0s; height: 56px; transform: translateY(71px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b126 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b6 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b101 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b84 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b95 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b98 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b67 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b98 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b98 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw" id="panel-emoji-people"
                                                            style="z-index: 96; transition: none 0s ease 0s; height: 27px; transform: translateY(127px);">
                                                            <div class="xfDtH">סמיילי ואנשים</div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 96; transition: none 0s ease 0s; height: 44px; transform: translateY(198px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b98 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b98 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b112 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b95 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b106 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b98 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b84 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b3 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 95; transition: none 0s ease 0s; height: 44px; transform: translateY(154px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b97 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b3 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b84 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b84 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 91; transition: none 0s ease 0s; height: 44px; transform: translateY(242px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b106 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b98 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b98 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b84 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 90; transition: none 0s ease 0s; height: 44px; transform: translateY(286px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b95 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b95 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b98 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b98 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b98 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b84 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b84 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b97 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b83 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="_3m_Xw"
                                                            style="z-index: 91; transition: none 0s ease 0s; height: 44px; transform: translateY(330px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b84 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b95 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b97 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b98 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b98 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b84 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b95 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b95 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b95 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b97 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b82 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b67 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b66 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b66 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b97 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b71 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b66 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b67 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b2 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b66 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 90; transition: none 0s ease 0s; height: 44px; transform: translateY(374px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b67 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b95 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b25 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b84 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b84 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b84 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b84 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b84 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b84 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b84 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b84 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b84 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b99 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b39 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b86 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b38 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b97 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b38 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b38 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b37 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b6 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 89; transition: none 0s ease 0s; height: 44px; transform: translateY(418px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b96 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b96 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b97 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b6 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b97 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b95 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b38 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b95 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b95 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b37 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b37 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b36 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b36 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b2 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b6 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b96 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b80 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b80 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b37 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b96 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b71 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="_3m_Xw"
                                                            style="z-index: 98; transition: none 0s ease 0s; height: 44px; transform: translateY(462px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b110 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b80 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b7 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b87 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b108 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b108 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b110 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b68 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b69 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b36 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b108 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b36 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b36 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b109 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b36 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b40 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b36 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b36 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b129 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b130 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b126 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 96; transition: none 0s ease 0s; height: 44px; transform: translateY(506px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b40 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b40 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b130 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b65 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b40 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b121 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b40 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b49 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b113 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b40 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b51 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b113 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b42 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b51 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b113 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b42 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b63 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b64 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b51 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b113 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 93; transition: none 0s ease 0s; height: 44px; transform: translateY(550px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b42 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b51 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b113 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b42 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b122 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b121 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b65 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b121 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b65 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b64 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b64 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b64 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b122 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b62 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b62 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b65 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b65 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b67 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b67 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b79 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b79 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 97; transition: none 0s ease 0s; height: 44px; transform: translateY(594px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b49 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b113 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b40 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b50 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b113 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b40 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b50 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b113 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b40 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b50 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b113 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b41 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b50 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b113 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b41 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b50 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b113 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b41 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b50 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b113 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b41 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 95; transition: none 0s ease 0s; height: 44px; transform: translateY(638px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b50 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b113 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b41 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b50 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b113 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b41 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b50 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b113 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b41 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b50 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b113 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b41 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b50 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b113 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b41 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b51 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b113 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b42 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b49 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b113 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b40 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 89; transition: none 0s ease 0s; height: 44px; transform: translateY(682px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b50 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b113 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b42 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b49 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b113 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b40 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b63 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b63 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b63 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b100 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b100 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b100 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b66 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b99 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b108 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b108 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b109 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b109 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b100 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b113 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 94; transition: none 0s ease 0s; height: 44px; transform: translateY(726px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b25 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b124 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b124 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b126 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b126 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b125 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b125 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b126 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b126 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b126 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b126 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b125 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b125 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b124 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b124 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b66 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b98 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b99 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b50 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b113 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b41 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 91; transition: none 0s ease 0s; height: 44px; transform: translateY(770px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b85 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b85 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b67 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b67 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b84 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b84 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b85 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b85 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b86 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b86 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b112 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b112 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b112 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b98 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b98 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b101 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b101 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b87 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b87 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b86 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b87 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 90; transition: none 0s ease 0s; height: 44px; transform: translateY(814px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b69 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b69 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b68 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b68 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b122 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b122 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b122 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b68 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b99 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b68 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b79 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b62 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b62 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b78 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b51 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b114 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b42 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b51 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b114 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b42 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b91 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 93; transition: none 0s ease 0s; height: 44px; transform: translateY(858px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b91 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b91 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b51 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b113 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b42 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b111 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b111 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b111 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b28 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b28 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b28 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b110 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b110 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b110 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b61 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b62 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b61 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b49 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b49 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b70 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b40 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 96; transition: none 0s ease 0s; height: 44px; transform: translateY(902px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b50 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b50 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b69 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b40 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b41 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b41 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b41 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b41 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b41 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b50 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b50 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b50 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b50 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b50 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b41 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b41 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b41 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b41 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b41 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b50 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b50 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 98; transition: none 0s ease 0s; height: 44px; transform: translateY(946px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b50 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b50 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b50 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b41 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b41 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b41 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b41 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b41 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b129 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b127 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b127 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b129 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b127 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b106 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b109 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b39 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b39 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b39 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b128 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b128 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b39 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 92; transition: none 0s ease 0s; height: 44px; transform: translateY(990px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b39 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b39 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b128 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b39 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b106 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b128 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b106 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b39 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b40 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b40 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b39 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b39 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b106 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b127 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b126 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b126 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b27 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b126 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b39 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b5 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 95; transition: none 0s ease 0s; height: 56px; transform: translateY(1034px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b128 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b39 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b69 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b39 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b39 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b39 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b72 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b127 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b39 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b79 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b106 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b20 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw" id="panel-emoji-nature"
                                                            style="z-index: 97; transition: none 0s ease 0s; height: 27px; transform: translateY(1090px);">
                                                            <div class="xfDtH">בעלי חיים וטבע</div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 98; transition: none 0s ease 0s; height: 44px; transform: translateY(1293px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b33 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b33 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b33 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b34 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b34 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b34 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b107 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b34 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b106 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b34 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b35 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b108 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b34 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b33 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b33 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b129 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b34 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b106 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b107 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b107 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b107 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 95; transition: none 0s ease 0s; height: 44px; transform: translateY(1205px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b129 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b129 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b129 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b107 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b107 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b79 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b79 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b106 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b34 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b33 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b107 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b107 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b107 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b34 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b107 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b107 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b107 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b106 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b34 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b34 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b34 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 93; transition: none 0s ease 0s; height: 44px; transform: translateY(1117px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b35 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b35 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b35 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b35 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b35 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b106 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b35 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b35 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b35 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b35 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b35 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b106 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b35 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b35 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b35 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b35 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b35 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b86 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b86 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b86 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b34 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 92; transition: none 0s ease 0s; height: 44px; transform: translateY(1161px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b34 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b35 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b34 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b34 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b34 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b34 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b106 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b106 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b106 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b106 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b35 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b34 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b35 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b106 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b34 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b129 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b34 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b106 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b33 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b34 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b34 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 91; transition: none 0s ease 0s; height: 44px; transform: translateY(1249px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b35 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b35 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b33 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b106 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b108 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b33 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b33 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b33 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b107 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b106 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b108 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b107 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b34 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b107 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b107 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b35 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b35 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b107 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b107 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b108 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b33 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 95; transition: none 0s ease 0s; height: 44px; transform: translateY(1337px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b107 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b108 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b77 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b33 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b107 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b108 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b107 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b108 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b107 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b107 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b33 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b33 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b36 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b107 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b35 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b33 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b35 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b22 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b25 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b22 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b22 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 94; transition: none 0s ease 0s; height: 44px; transform: translateY(1381px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b22 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b129 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b22 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b22 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b2 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b22 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b129 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b23 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b23 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b22 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b23 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b34 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b129 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b22 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b70 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b22 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b22 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b103 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b22 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 96; transition: none 0s ease 0s; height: 44px; transform: translateY(1425px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b22 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b22 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b22 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b21 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b21 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b21 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b21 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b21 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b21 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b21 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b21 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b21 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b21 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b21 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b21 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b21 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b21 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b21 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b20 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b21 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b128 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 98; transition: none 0s ease 0s; height: 44px; transform: translateY(1469px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b71 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b8 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b21 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b7 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b4 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b2 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b71 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b76 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b22 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b20 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b2 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b21 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b4 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b21 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b2 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b21 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b21 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b4 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b22 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b21 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b7 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 97; transition: none 0s ease 0s; height: 56px; transform: translateY(1513px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b2 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b4 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b22 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b71 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b71 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b71 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b2 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b2 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b20 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b22 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw" id="panel-emoji-food"
                                                            style="z-index: 91; transition: none 0s ease 0s; height: 27px; transform: translateY(1569px);">
                                                            <div class="xfDtH">מזון ומשקאות</div>
                                                        </div>

                                                        <div class="_3m_Xw"
                                                            style="z-index: 98; transition: none 0s ease 0s; height: 44px; transform: translateY(1640px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b104 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b22 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b130 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b22 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b104 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b130 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b110 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b110 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b104 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b104 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b104 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b110 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b104 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b110 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b104 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 97; transition: none 0s ease 0s; height: 44px; transform: translateY(1728px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b104 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b108 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b23 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b23 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b23 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 95; transition: none 0s ease 0s; height: 44px; transform: translateY(1684px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b110 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b104 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b23 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b23 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b108 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b22 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b23 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b23 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b130 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b104 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b110 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b22 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b22 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b130 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b104 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b104 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b130 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="_3m_Xw"
                                                            style="z-index: 92; transition: none 0s ease 0s; height: 44px; transform: translateY(1596px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b23 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b23 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b23 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b23 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b23 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b23 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b23 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b23 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b23 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b130 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b23 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b23 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b23 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b23 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b104 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b23 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b23 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b104 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 90; transition: none 0s ease 0s; height: 44px; transform: translateY(1772px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b110 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b25 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b25 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b22 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b104 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b24 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b104 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b25 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b130 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b2 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b25 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b110 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b110 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 89; transition: none 0s ease 0s; height: 56px; transform: translateY(1816px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b25 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b25 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b25 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b103 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b25 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b103 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b25 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b25 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b110 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b25 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b110 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b103 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b25 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b25 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b105 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b110 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw" id="panel-emoji-activity"
                                                            style="z-index: 94; transition: none 0s ease 0s; height: 27px; transform: translateY(1872px);">
                                                            <div class="xfDtH">פעילות</div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 98; transition: none 0s ease 0s; height: 44px; transform: translateY(2031px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b102 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b102 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b102 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b89 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b89 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b89 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b123 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b123 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b123 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b91 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b91 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b91 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b90 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b90 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b90 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b29 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b104 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b104 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b104 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b29 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 96; transition: none 0s ease 0s; height: 44px; transform: translateY(1899px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b4 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b28 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b29 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b4 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b104 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b27 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b31 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b29 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b104 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b27 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b128 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b31 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b33 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b31 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b31 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b104 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b31 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b128 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b103 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b5 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b128 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 94; transition: none 0s ease 0s; height: 44px; transform: translateY(1943px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b33 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b103 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b104 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b104 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b27 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b94 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b94 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b94 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b5 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b104 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b28 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b5 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b28 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b128 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b30 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b30 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b102 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b102 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b101 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b101 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 93; transition: none 0s ease 0s; height: 44px; transform: translateY(2075px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b32 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b27 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b27 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b102 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b102 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b27 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b128 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b27 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b27 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b27 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b27 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b27 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b103 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b129 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b27 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b27 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b128 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b27 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 92; transition: none 0s ease 0s; height: 44px; transform: translateY(1987px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b101 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b5 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b5 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b6 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b102 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b103 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b103 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b103 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b31 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b31 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b31 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b29 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b123 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b123 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b123 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b28 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b28 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b28 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b29 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b29 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b29 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw" id="panel-emoji-travel"
                                                            style="z-index: 93; transition: none 0s ease 0s; height: 27px; transform: translateY(2175px);">
                                                            <div class="xfDtH">רכבים ותיירות</div>
                                                        </div>
                                                        
                                                        <div class="_3m_Xw"
                                                            style="z-index: 98; transition: none 0s ease 0s; height: 56px; transform: translateY(2119px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b128 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b27 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b27 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b3 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b27 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b27 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b27 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b27 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b127 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 97; transition: none 0s ease 0s; height: 44px; transform: translateY(2290px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b6 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b94 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b94 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b93 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b72 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b94 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b88 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b94 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b88 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b94 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b5 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b90 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b93 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b94 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b5 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b89 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b4 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b129 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b6 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b90 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b90 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 95; transition: none 0s ease 0s; height: 44px; transform: translateY(2246px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b94 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b90 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b88 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b88 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b89 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b89 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b89 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b89 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b89 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b88 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b88 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b89 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b89 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b88 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b88 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b88 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b88 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b88 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b88 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b88 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b88 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 94; transition: none 0s ease 0s; height: 44px; transform: translateY(2422px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b5 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b77 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b77 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b93 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b77 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b5 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b93 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b93 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b31 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b20 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b20 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b21 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b25 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b25 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b20 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b20 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b31 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b20 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b20 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 92; transition: none 0s ease 0s; height: 56px; transform: translateY(2466px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b20 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b20 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 91; transition: none 0s ease 0s; height: 44px; transform: translateY(2334px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b90 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b88 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b32 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b32 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b31 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b5 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b5 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b31 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b31 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b31 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b20 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b5 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b31 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 91; transition: none 0s ease 0s; height: 44px; transform: translateY(2378px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b31 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b6 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b93 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b31 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b31 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b31 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b31 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b31 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b32 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b31 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b32 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b32 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b32 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b32 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b32 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b32 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b32 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b32 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b32 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b70 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b31 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 89; transition: none 0s ease 0s; height: 44px; transform: translateY(2202px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b89 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b89 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b89 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b88 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b88 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b31 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b88 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b88 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b88 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b88 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b94 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b89 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b89 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b89 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b108 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b110 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b110 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b94 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b90 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b94 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b31 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="_3m_Xw" id="panel-emoji-objects"
                                                            style="z-index: 92; transition: none 0s ease 0s; height: 27px; transform: translateY(2522px);">
                                                            <div class="xfDtH">חפצים</div>
                                                        </div>

                                                        <div class="_3m_Xw"
                                                            style="z-index: 98; transition: none 0s ease 0s; height: 44px; transform: translateY(2549px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b1 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b74 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b74 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b72 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b1 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b80 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b80 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b80 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b80 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b79 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b72 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b72 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b72 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b72 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b74 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b74 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b74 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b74 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b74 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 97; transition: none 0s ease 0s; height: 44px; transform: translateY(2725px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b33 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b76 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b74 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b128 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b69 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b4 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b76 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b76 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b78 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b128 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b128 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b69 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b69 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b128 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b127 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b107 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b127 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b127 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b21 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b127 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b129 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 96; transition: none 0s ease 0s; height: 44px; transform: translateY(2681px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b93 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b4 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b129 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b76 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b4 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b129 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b127 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b5 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b127 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b76 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b71 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b127 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b128 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b76 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b4 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b93 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b90 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b4 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b129 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b4 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 95; transition: none 0s ease 0s; height: 44px; transform: translateY(2945px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b73 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b73 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b73 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b73 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b75 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b127 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b75 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b72 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b79 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b73 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b73 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b127 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b72 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b72 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b6 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b79 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b79 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b7 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b79 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b80 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b73 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 94; transition: none 0s ease 0s; height: 44px; transform: translateY(2901px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b72 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b72 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b72 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b72 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b72 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b72 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b72 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b74 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b73 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b73 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b73 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b73 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b73 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 93; transition: none 0s ease 0s; height: 44px; transform: translateY(2593px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b73 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b2 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b73 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b73 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b74 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b74 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b127 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b1 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b1 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b1 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b78 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b1 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b1 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b73 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b75 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b75 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b70 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 92; transition: none 0s ease 0s; height: 44px; transform: translateY(2857px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b74 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b73 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b69 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b73 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b73 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b73 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b33 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b129 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b74 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b74 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b74 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b74 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b74 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b74 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b73 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b72 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b72 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b73 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b128 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b72 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b72 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 91; transition: none 0s ease 0s; height: 44px; transform: translateY(2813px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b127 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b128 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b80 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b129 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b129 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b93 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b93 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b25 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b25 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b128 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b128 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b32 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b127 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b6 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b74 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 90; transition: none 0s ease 0s; height: 44px; transform: translateY(2769px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b127 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b127 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b92 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b90 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b92 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b92 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b92 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b127 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b129 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b128 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b127 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b129 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b127 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b93 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b75 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b90 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b128 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b93 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b93 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b93 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 89; transition: none 0s ease 0s; height: 44px; transform: translateY(2637px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b76 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b78 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b128 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b127 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b93 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b72 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b71 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b71 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b72 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b72 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b129 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b71 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b71 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b69 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b4 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b129 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b127 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b129 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b76 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b76 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b4 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 95; transition: none 0s ease 0s; height: 56px; transform: translateY(2989px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b7 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b75 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b75 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b75 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b75 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b75 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b75 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="_3m_Xw" id="panel-emoji-symbols"
                                                            style="z-index: 93; transition: none 0s ease 0s; height: 27px; transform: translateY(3045px);">
                                                            <div class="xfDtH">סמלים</div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 91; transition: none 0s ease 0s; height: 44px; transform: translateY(3072px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b7 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b126 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b70 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b70 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b70 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b70 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b80 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b95 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b95 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b70 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b8 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b8 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b7 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b70 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b70 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b70 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b70 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b70 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b70 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b70 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b70 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 91; transition: none 0s ease 0s; height: 44px; transform: translateY(3116px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b2 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b7 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b2 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b77 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b3 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b7 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b76 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b77 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b3 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b2 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b93 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b4 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b3 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b3 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b3 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b3 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b3 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b3 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b3 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b3 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b3 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 91; transition: none 0s ease 0s; height: 44px; transform: translateY(3204px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b20 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b20 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b20 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b20 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b8 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b8 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b9 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b9 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b9 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b9 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b7 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b8 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b93 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b5 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b73 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b90 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b71 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b71 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b3 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b92 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b90 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 94; transition: none 0s ease 0s; height: 44px; transform: translateY(3248px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b90 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b90 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b76 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b74 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b90 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b7 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b7 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b7 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b7 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b0 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b0 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b75 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b75 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b8 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b4 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b92 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b76 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b4 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b76 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b3 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b6 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 96; transition: none 0s ease 0s; height: 44px; transform: translateY(3336px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b92 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b92 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b92 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b4 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b92 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b90 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b27 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b74 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b19 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b76 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b0 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b76 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b76 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b76 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b9 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b9 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b9 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b9 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b9 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b9 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b0 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 89; transition: none 0s ease 0s; height: 44px; transform: translateY(3380px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b0 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b0 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b0 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b0 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b0 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b0 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b0 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b0 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b0 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b76 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b76 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b0 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b0 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b1 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b1 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b1 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b1 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b1 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b1 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b1 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b1 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="_3m_Xw"
                                                            style="z-index: 90; transition: none 0s ease 0s; height: 44px; transform: translateY(3160px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b3 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b3 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b3 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b9 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b4 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b20 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b2 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b2 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b74 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b74 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b20 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b19 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b20 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b20 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b20 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b7 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b9 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b71 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b20 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b8 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b8 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 89; transition: none 0s ease 0s; height: 44px; transform: translateY(3292px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b19 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b72 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b7 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b7 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b7 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b21 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b70 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b1 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b20 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b71 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b32 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b92 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b4 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b9 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b93 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b20 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b19 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b92 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b92 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b93 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b93 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 95; transition: none 0s ease 0s; height: 44px; transform: translateY(3424px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b1 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b1 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b1 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b1 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b1 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b77 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b77 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b8 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b8 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b8 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b8 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b0 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b0 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b0 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b0 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b0 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b0 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b1 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b0 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b8 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b8 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 91; transition: none 0s ease 0s; height: 44px; transform: translateY(3468px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b74 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b74 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b75 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b75 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b75 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b27 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b27 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b8 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b8 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b8 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b7 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b4 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b71 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b71 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b0 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b0 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b0 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b36 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b75 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b75 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b76 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 93; transition: none 0s ease 0s; height: 44px; transform: translateY(3512px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b76 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b76 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b8 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b8 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b8 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b7 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b2 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b75 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b77 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b94 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b94 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b94 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b77 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b94 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b4 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b4 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b94 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b77 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b77 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b77 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b77 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 93; transition: none 0s ease 0s; height: 44px; transform: translateY(3556px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b77 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b77 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b76 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b76 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b1 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b1 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b2 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b2 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b2 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b1 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b94 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b94 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b94 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b94 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b94 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b94 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b8 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b8 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b94 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b75 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b75 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 97; transition: none 0s ease 0s; height: 44px; transform: translateY(3600px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b75 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b75 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b75 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b75 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b73 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b73 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b71 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b71 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b81 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b3 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b3 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b3 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b3 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b8 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b27 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b8 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b77 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b77 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b77 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b77 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b77 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 95; transition: none 0s ease 0s; height: 56px; transform: translateY(3644px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b77 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b77 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b77 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b77 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b78 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b78 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b78 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b78 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b78 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b78 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b78 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b78 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b78 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b78 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b78 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b78 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b78 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b78 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b78 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>



                                                        <div class="_3m_Xw" id="panel-emoji-flags"
                                                            style="z-index: 96; transition: none 0s ease 0s; height: 27px; transform: translateY(3700px);">
                                                            <div class="xfDtH">דגלים</div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 91; transition: none 0s ease 0s; height: 44px; transform: translateY(3727px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b32 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b32 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b32 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b28 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b90 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b32 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b32 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b32 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b19 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b9 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b10 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b9 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b12 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b9 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b9 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b9 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b9 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b9 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b9 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b9 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b9 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 98; transition: none 0s ease 0s; height: 44px; transform: translateY(3771px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b10 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b10 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b10 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b10 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b10 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b10 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b10 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b10 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b10 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b10 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b11 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b10 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b10 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b10 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b10 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b10 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b10 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b10 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b19 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b10 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b10 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 95; transition: none 0s ease 0s; height: 44px; transform: translateY(3815px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b10 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b10 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b14 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b11 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b11 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b13 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b11 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b10 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b14 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b11 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b18 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b13 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b11 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b11 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b11 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b11 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b11 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b14 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b11 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b11 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b11 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 98; transition: none 0s ease 0s; height: 44px; transform: translateY(4211px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b18 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b18 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b18 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b18 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b18 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b18 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b18 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b18 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b18 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b19 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b19 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b18 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b9 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b12 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b32 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b32 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b32 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b19 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b32 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b19 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b19 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 97; transition: none 0s ease 0s; height: 44px; transform: translateY(4035px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b15 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b15 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b15 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b15 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b19 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b16 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b12 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b15 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b15 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b15 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b15 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b15 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b15 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b16 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b15 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b16 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b16 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b16 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b16 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b16 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b16 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 96; transition: none 0s ease 0s; height: 44px; transform: translateY(4255px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b19 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b19 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b19 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b19 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b19 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b12 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b19 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b19 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b19 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 95; transition: none 0s ease 0s; height: 44px; transform: translateY(3903px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b12 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b12 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b12 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b12 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b12 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b16 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b18 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b12 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b13 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b12 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b11 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b12 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b13 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b13 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b13 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b12 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b13 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b13 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b13 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b12 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b13 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 95; transition: none 0s ease 0s; height: 44px; transform: translateY(4123px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b17 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b17 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b17 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b17 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b17 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b17 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b19 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b17 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b18 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b17 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b17 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b17 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b17 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b17 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b17 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b18 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b17 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b17 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b13 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b17 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b17 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 93; transition: none 0s ease 0s; height: 44px; transform: translateY(3859px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b11 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b11 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b13 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b11 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b11 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b11 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b11 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b11 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b11 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b12 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b12 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b12 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b12 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b18 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b13 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b12 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b12 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b18 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b12 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b12 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b12 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 93; transition: none 0s ease 0s; height: 44px; transform: translateY(4079px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b16 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b16 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b16 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b16 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b16 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b14 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b15 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b15 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b16 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b16 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b16 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b17 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b17 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b16 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b16 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b17 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b16 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b16 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b16 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b16 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b17 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 91; transition: none 0s ease 0s; height: 44px; transform: translateY(4167px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b19 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b14 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b18 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b12 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b14 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b10 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b17 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b14 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b14 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b16 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b19 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b17 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b18 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b17 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b11 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b18 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b18 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b18 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b18 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b18 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b18 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 89; transition: none 0s ease 0s; height: 44px; transform: translateY(3947px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b13 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b13 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b13 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b13 emojik wa"
                                                                            style="background-position: -128px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b13 emojik wa"
                                                                            style="background-position: -64px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b13 emojik wa"
                                                                            style="background-position: -64px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b14 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b13 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b13 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b14 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b14 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b13 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b13 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b13 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b14 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b14 emojik wa"
                                                                            style="background-position: 0px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b14 emojik wa"
                                                                            style="background-position: -64px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b26 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b14 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b14 emojik wa"
                                                                            style="background-position: -32px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b14 emojik wa"
                                                                            style="background-position: -96px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_3m_Xw"
                                                            style="z-index: 88; transition: none 0s ease 0s; height: 44px; transform: translateY(3991px);">
                                                            <div class="_2Wd6U">
                                                                <div tabindex="-1">
                                                                    <div class="_27GWS"><span
                                                                            class="b14 emojik wa"
                                                                            style="background-position: -96px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="0"></span><span
                                                                            class="b14 emojik wa"
                                                                            style="background-position: -32px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="1"></span><span
                                                                            class="b19 emojik wa"
                                                                            style="background-position: 0px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="2"></span><span
                                                                            class="b14 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="3"></span><span
                                                                            class="b14 emojik wa"
                                                                            style="background-position: -128px -32px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="4"></span><span
                                                                            class="b14 emojik wa"
                                                                            style="background-position: -128px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="5"></span><span
                                                                            class="b15 emojik wa"
                                                                            style="background-position: -96px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="6"></span><span
                                                                            class="b14 emojik wa"
                                                                            style="background-position: 0px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="7"></span><span
                                                                            class="b15 emojik wa"
                                                                            style="background-position: 0px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="8"></span><span
                                                                            class="b14 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="9"></span><span
                                                                            class="b15 emojik wa"
                                                                            style="background-position: -128px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="10"></span><span
                                                                            class="b14 emojik wa"
                                                                            style="background-position: -64px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="11"></span><span
                                                                            class="b15 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="12"></span><span
                                                                            class="b15 emojik wa"
                                                                            style="background-position: -64px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="13"></span><span
                                                                            class="b15 emojik wa"
                                                                            style="background-position: -32px -96px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="14"></span><span
                                                                            class="b15 emojik wa"
                                                                            style="background-position: 0px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="15"></span><span
                                                                            class="b15 emojik wa"
                                                                            style="background-position: -128px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="16"></span><span
                                                                            class="b16 emojik wa"
                                                                            style="background-position: -32px 0px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="17"></span><span
                                                                            class="b15 emojik wa"
                                                                            style="background-position: -96px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="18"></span><span
                                                                            class="b15 emojik wa"
                                                                            style="background-position: -96px -64px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="19"></span><span
                                                                            class="b15 emojik wa"
                                                                            style="background-position: -32px -128px;"
                                                                            tabindex="-1"
                                                                            data-emoji-index="20"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!-- end emoji rows -->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="display: none;" hidden=""></div><input accept="image/*"
                                type="file" style="display: none;">
                        </div>
                    </div>
                </div>
            </div>
            `;
            
            document.querySelector(options.position).innerHTML = picker

            document.querySelector('.smiley-close-btn').style.display = 'block';

            //document.body.insertAdjacentHTML('beforeend', picker);

            // setTimeout(() => {
            //     document.querySelector('.fg-emoji-picker-search input').focus();
            // }, 500)
        },


        closePicker: (e) => {

            e.preventDefault();
            //'smiley-close-btn'
            document.querySelector('.smiley-close-btn').style.display = 'none';
            this.lib('.wasap_emoji').remove();
        },


        checkPickerExist(e) {

            if (document.querySelector('.wasap_emoji') && !e.target.closest('.wasap_emoji')) {

                functions.closePicker.call(this, e);
            }
        },


        setCaretPosition: (field, caretPos) => {
            var elem = field
            if (elem != null) {
                if (elem.createTextRange) {
                    var range = elem.createTextRange();
                    range.move('character', caretPos);
                    range.select();
                } else {
                    if (elem.selectionStart) {
                        elem.focus();
                        elem.setSelectionRange(caretPos, caretPos);
                    } else {
                        elem.focus();
                    }
                }
            }
        },


        insert: e => {

            e.preventDefault();
            const emoji = e.target.outerHTML;// + "\xAD";//e.target.innerText.trim();
            const myField = document.querySelector(this.insertInto);
            const myValue = '<img crossorigin="anonymous" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="🥰" draggable="false" style="background-position: -20px -60px;" class="b105 emoji wa i0jNr selectable-text copyable-text" data-plain-text="🥰">';//emoji;
            // Check if selector is an array
            if (document.getSelection){
                //https://stackoverflow.com/a/64736899/8512438
                let sel, range;
            
                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    range.deleteContents();

                    // Range.createContextualFragment() would be useful here but is
                    // non-standard and not supported in all browsers (IE9, for one)
                    const el = document.createElement("div");
                    el.innerHTML = emoji;//html;
                    let frag = document.createDocumentFragment(),
                        node,
                        lastNode;
                    while ((node = el.firstChild)) {
                        lastNode = frag.appendChild(node);
                    }
                    range.insertNode(frag);

                    // Preserve the selection
                    if (lastNode) {
                        range = range.cloneRange();
                        range.setStartAfter(lastNode);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }


            }else if (document.selection) {
                myField.focus();
                sel = document.selection.createRange();
                sel.text = myValue;
            } else if (myField.selectionStart || myField.selectionStart == "0") {
                const startPos = myField.selectionStart;
                const endPos = myField.selectionEnd;
                myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);

                functions.setCaretPosition(myField, startPos + 2)

            } else {
                myField.value += myValue;
                myField.focus()
            }
        },


        categoryNav: e => {
            e.preventDefault();

            let link = e.target.closest('span');
            let id = link.getAttribute('data-testid');

            //const emojiBody = document.querySelector('.fg-emoji-list');
            const destination = document.querySelector(`#${id}`);

            //this.lib('.fg-emoji-nav li').removeClass('emoji-picker-nav-active');
            //link.closest('li').classList.add('emoji-picker-nav-active');
            let underlineNode = document.querySelector('.NCirl');
            let htmldir = document.getElementsByTagName("html")[0].getAttribute("dir");
            let prcent = "0";
            switch (id){
                case "panel-recent":
                    prcent = "0";
                    break;
                case "panel-emoji-people":
                    prcent = ((htmldir == "rtl")?"-":"") + "100";
                    break;
                case "panel-emoji-nature":

                    prcent = ((htmldir == "rtl")?"-":"") + "200";
                    break;
                case "panel-emoji-food":
                    prcent = ((htmldir == "rtl")?"-":"") + "300";
                    break;
                case "panel-emoji-activity":
                    prcent = ((htmldir == "rtl")?"-":"") + "400";
                    break;
                case "panel-emoji-travel":
                    prcent = ((htmldir == "rtl")?"-":"") + "500";
                    break;
                case "panel-emoji-objects":
                    prcent = ((htmldir == "rtl")?"-":"") + "600";
                    break;
                case "panel-emoji-symbols":
                    prcent = ((htmldir == "rtl")?"-":"") + "700";
                    break;
                case "panel-emoji-flags":
                    prcent = ((htmldir == "rtl")?"-":"") + "800";
                    break; 
            }
            let new_trs = 'transform: translateX(' + prcent +'%);';
            underlineNode.setAttribute('style', new_trs)

            destination.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
        },


        // search: e => {

        //     const val = e.target.value.trim();

        //     if (!emojiList) {
        //         emojiList = Array.from(document.querySelectorAll('.fg-emoji-picker-category-wrapper li'));
        //     }

        //     emojiList.filter(emoji => {
        //         if (!emoji.getAttribute('data-title').match(val)) {
        //             emoji.style.display = 'none'
        //         } else {
        //             emoji.style.display = ''
        //         }
        //     })
        // },
    };



    const bindEvents = () => {

        this.lib(document.body).on('click', functions.closePicker, '.smiley-close-btn');
        this.lib(document.body).on('click', functions.checkPickerExist);
        this.lib(document.body).on('click', functions.render, this.trigger);
        this.lib(document.body).on('click', functions.insert, '._27GWS span');
        this.lib(document.body).on('click', functions.categoryNav, '._1zlQ1 span');
        // this.lib(document.body).on('input', functions.search, '.fg-emoji-picker-search input');
    };



    (() => {

        // Start styles
        //functions.styles();

        // Event functions
        bindEvents.call(this);

    })()
}