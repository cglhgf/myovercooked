let ele = document.getElementsByClassName("progress")[0];

        class ProgressBar {
            constructor(ele, style) {
                this.progress = ele;
                this.style = style;
            }
        }

        Object.defineProperty(ProgressBar, 'style', {
            get: function () {
                return this.style.width;
            },
            set: function (val) {
                this.style.width = val;
            }
        });

        let a = 0;
        let bar = new ProgressBar(ele, ele.style);
        let timer
        function starta() {
            bar.style.width = "0";
            timer = setInterval(() => {
                if (a > 120000) {
                    clearInterval(timer);
                }
                bar.style.width = `${a / 1200}%`;
                a += 1000;
            }, 1000);
        }