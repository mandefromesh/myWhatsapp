const NimblePicker = require('emoji-mart/dist/components/picker/nimble-picker').default
const React = require('react')
const { define } = require('remount/es6')

async function main() {
  //const data = await (await fetch('emoji-mart-outside-react-master/node_modules/emoji-mart/data/facebook.json')).json() //all.json
  const data = await (await fetch('/emoji-mart-outside-react/emoji-mart/data/facebook.json')).json() //all.json //../emoji-mart/data/facebook.json
  const Picker = props => (React.createElement(NimblePicker, {
    set: 'facebook', //'apple', 'google', 'twitter', 'facebook'
    sheetSize: 64,
    data,
    native: true,
    onSelect: function (emoji) {
      //console.log('emoji selected', emoji);
      const myField = document.querySelector(".main-msg-textbox");
      const myValue = emoji.native;
      // Check if selector is an array
      if (document.getSelection) {
        //https://stackoverflow.com/a/64736899/8512438
        let sel, range;

        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();

          // Range.createContextualFragment() would be useful here but is
          // non-standard and not supported in all browsers (IE9, for one)
          const el = document.createElement("div");
          el.innerHTML = myValue;//emoji;//html;
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


      } else if (document.selection) {
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
    title: 'Emoji',
    showPreview: true,
    theme: 'dark',
    width: '100%',
    ...props
  }));
  //Picker.width = '100%';
  define({ 'emoji-picker': Picker });

  //const picker = document.createElement('emoji-picker')
  // document.body.appendChild(picker)
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
    closePicker: (e) => {

      e.preventDefault();
      //'smiley-close-btn'
      document.querySelector('.wasap_emoji').style.display = 'none';
      document.querySelector('.smiley-close-btn').style.display = 'none';
      //this.lib('.wasap_emoji').remove();
    },
    showPicker: (e) => {
      e.preventDefault();
      document.querySelector('.wasap_emoji').style.display = 'block';
      document.querySelector('.smiley-close-btn').style.display = 'block';

    },
  }
  const bindEvents = () => {

    this.lib(document.body).on('click', functions.closePicker, '.smiley-close-btn');
    this.lib(document.body).on('click', functions.showPicker, '.emojis-btn');
    //this.lib(document.body).on('click', functions.checkPickerExist);
   // this.lib(document.body).on('click', functions.render, this.trigger);
    // this.lib(document.body).on('input', functions.search, '.fg-emoji-picker-search input');
  };


  (() => {
    window.addEventListener('resize', () => {
      // let { picker } = this.refs
      // picker.forceUpdate()
    })
    // Start styles
    //functions.styles();

    // Event functions
    bindEvents.call(this);

  })()

}

main().catch(err => console.error(err))

