console.debug("[DEBUG] load extension");

let checkCount = 0;
function main(event) {
    console.debug("[DEBUG]] main() called");
    console.debug("[DEBUG] event:");
    console.dir(event);

    const jsInitCheckTimer = setInterval(jsLoaded, 100);

    function jsLoaded() {
        console.debug("[DEBUG] jsLoaded() called("+checkCount+"回目)");

        if(checkCount>= 10){
            // 課題詳細画面以外の場合は見つからないのでキャンセルする
            clearInterval(jsInitCheckTimer);
        }
        if (document.querySelector("#copyKey-help")) {
            console.debug("[DEBUG] document.querySelector('#copyKey-help') found");
            clearInterval(jsInitCheckTimer);

            // 課題キーコピーのヘルプエリアを取得
            let copyKeyHelpArea = document.querySelector("#copyKey-help");
            htmlAndPlain(copyKeyHelpArea);
            onlyHTML(copyKeyHelpArea);
        }
        checkCount++;
        console.debug("[DEBUG] jsLoaded() ended");
    }
}

/**
 * チケットのキーとタイトルをコピーするボタンを追加する(text/htmlのみ)
 * @param {*} existingButton ボタン表示エリア
 */
function onlyHTML(existingButton) {
    // ボタン要素を作成
    let newButton = document.createElement('button');
    newButton.classList.add('icon-button', 'icon-button--default','simptip-position-right', 'simptip-movable', 'simptip-smooth','simptip-multiline', '-copy-button-multiline');
    newButton.insertAdjacentHTML('afterbegin','<span class="copy-trigger"><svg role="image" class="icon -medium"><use xlink:href="/images/svg/sprite.symbol.svg#icon_copy"></use></svg></span>');
    newButton.dataset.tooltip = "スプレッドシート等一部システムでHTMLタグがそのまま出力されてしまう場合用コピー";

    // ボタンを追加
    existingButton.appendChild(newButton);

    // ボタンが押された時の処理
    newButton.addEventListener('click', function() {
        let currentUrl = window.location.href;
        let ticket_id = document.querySelector(".ticket__key-number").innerText;
        let subject = document.querySelector(".markdown-body").innerText;

        let htmlLink = '<p><a href="' + currentUrl + '">' + ticket_id + '</a> ' + subject + '</p>';
        const blob = new Blob([htmlLink], { type:'text/html' });
        let data = [new ClipboardItem({ [blob.type]: blob })];

        copyToClipboard(data);
    });
};

/**
 * チケットのキーとタイトルをコピーするボタンを追加する(text/html, text/plain)
 * @param {*} existingButton ボタン表示エリア
 */
function htmlAndPlain(existingButton) {
    // ボタン要素を作成
    let newButton = document.createElement('button');
    newButton.classList.add('icon-button', 'icon-button--default','simptip-position-right', 'simptip-movable', 'simptip-smooth','simptip-multiline', '-copy-button-multiline');
    newButton.insertAdjacentHTML('afterbegin','<span class="copy-trigger"><svg role="image" class="icon -medium"><use xlink:href="/images/svg/sprite.symbol.svg#icon_copy"></use></svg></span>');
    newButton.dataset.tooltip = "基本的なリンク付きコピー";

    // ボタンを追加
    existingButton.appendChild(newButton);

    // ボタンが押された時の処理
    newButton.addEventListener('click', function() {
        let currentUrl = window.location.href;
        let ticket_id = document.querySelector(".ticket__key-number").innerText;
        let subject = document.querySelector(".markdown-body").innerText;

        let htmlLink = '<a href="' + currentUrl + '">' + ticket_id + '</a> ' + subject;
        const blob = new Blob([htmlLink], { type:'text/html' });
        const blobPlain = new Blob([htmlLink],{type:'text/plain'})
        const data = [new ClipboardItem({ [blob.type]: blob, [blobPlain.type]: blobPlain })];

        copyToClipboard(data);
        copySuccess();
    });
};